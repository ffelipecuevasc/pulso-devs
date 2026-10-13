import { readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const CABECERAS = ['content-security-policy', 'content-security-policy-report-only'];
const PROHIBIDOS = ["'unsafe-inline'", "'unsafe-eval'"];

/** Hash `'sha256-…'` (base64) del contenido exacto de un bloque en línea. */
const hash = (contenido) =>
  `'sha256-${createHash('sha256').update(contenido, 'utf8').digest('base64')}'`;

/** Resumen de un bloque para el mensaje de error: tamaño y primeros caracteres. */
const resumen = (contenido) =>
  `${Buffer.byteLength(contenido, 'utf8')} B, empieza con «${contenido.trim().slice(0, 40).replace(/\s+/g, ' ')}»`;

/** Registra en `mapa` el hash de un bloque y en qué páginas aparece. */
function anotar(mapa, contenido, pagina) {
  const clave = hash(contenido);
  const previo = mapa.get(clave) ?? { paginas: new Set(), descripcion: resumen(contenido) };
  previo.paginas.add(pagina);
  mapa.set(clave, previo);
}

/** Scripts y estilos en línea de un HTML. El JSON-LD no se ejecuta y no cuenta. */
function bloquesEnLinea(html) {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(
      ([, atributos]) => !/\bsrc=/i.test(atributos) && !/application\/ld\+json/i.test(atributos),
    )
    .map(([, , contenido]) => contenido);
  const estilos = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(([, c]) => c);
  return { scripts, estilos };
}

/** Valores `'sha256-…'` y presencia de `'unsafe-*'` de una directiva de la política. */
function leerDirectiva(politica, nombre) {
  const parte =
    politica
      .split(';')
      .map((d) => d.trim())
      .find((d) => d.startsWith(`${nombre} `)) ?? '';
  return {
    hashes: parte.match(/'sha256-[^']+'/g) ?? [],
    prohibidos: PROHIBIDOS.filter((p) => parte.includes(p)),
  };
}

/**
 * Integración de Astro que hace fallar `pnpm build` si la política `Content-Security-Policy`
 * de `public/_headers` no coincide con los scripts y estilos en línea de `dist/` (RDA-010, 05-02).
 * Compara hashes en las dos direcciones, así que un hash desactualizado o un bloque nuevo sin
 * aprobar se notan antes de desplegar. Solo lee `dist/`; no escribe nada.
 *
 * @returns {import('astro').AstroIntegration}
 */
export default function verificarCsp() {
  return {
    name: 'verificar-csp',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const carpeta = fileURLToPath(dir);

        // 1. Políticas con script-src declaradas en dist/_headers (la copia de public/_headers).
        const encabezados = await readFile(path.join(carpeta, '_headers'), 'utf8');
        const politicas = encabezados
          .split(/\r?\n/)
          .map((linea) => linea.trim())
          .filter((linea) => CABECERAS.some((c) => linea.toLowerCase().startsWith(`${c}:`)))
          .map((linea) => ({
            cabecera: linea.slice(0, linea.indexOf(':')),
            texto: linea.slice(linea.indexOf(':') + 1),
          }))
          .filter(({ texto }) => texto.includes('script-src'));
        if (politicas.length === 0) {
          throw new Error(
            'No hay ninguna política Content-Security-Policy con script-src en public/_headers.\n' +
              'La integración verificar-csp la exige: agrega la política aprobada o quita la integración de astro.config.mjs.',
          );
        }

        // 2. Bloques en línea reales de todas las páginas de dist/.
        const reales = { 'script-src': new Map(), 'style-src': new Map() };
        const paginas = (await readdir(carpeta, { recursive: true })).filter((r) =>
          r.endsWith('.html'),
        );
        for (const pagina of paginas) {
          const html = await readFile(path.join(carpeta, pagina), 'utf8');
          const { scripts, estilos } = bloquesEnLinea(html);
          scripts.forEach((c) => anotar(reales['script-src'], c, pagina.replaceAll('\\', '/')));
          estilos.forEach((c) => anotar(reales['style-src'], c, pagina.replaceAll('\\', '/')));
        }

        // 3. Comparación en las dos direcciones.
        const problemas = [];
        for (const { cabecera, texto } of politicas) {
          for (const directiva of ['script-src', 'style-src']) {
            const { hashes, prohibidos } = leerDirectiva(texto, directiva);
            const esperados = reales[directiva];
            const lineas = [];
            prohibidos.forEach((p) => lineas.push(`  - NO permitido: ${p} en ${directiva}`));
            for (const [h, info] of esperados)
              if (!hashes.includes(h))
                lineas.push(
                  `  - falta en la política: ${h}\n      bloque en dist/ (${[...info.paginas].join(', ')}): ${info.descripcion}`,
                );
            for (const h of hashes)
              if (!esperados.has(h))
                lineas.push(
                  `  - sobra en la política: ${h}\n      ningún bloque de dist/ tiene este hash`,
                );
            if (lineas.length > 0) {
              problemas.push(
                `${cabecera} · ${directiva}\n` +
                  `  esperados en dist/ (${esperados.size}):    ${[...esperados.keys()].join(' ') || '(ninguno)'}\n` +
                  `  encontrados en public/_headers (${hashes.length}): ${hashes.join(' ') || '(ninguno)'}\n` +
                  lineas.join('\n'),
              );
            }
          }
        }
        if (problemas.length > 0) {
          throw new Error(
            'La política Content-Security-Policy de public/_headers no coincide con los scripts y estilos en línea de dist/.\n\n' +
              problemas.join('\n\n') +
              '\n\nQué hacer: si el cambio de un script o de un estilo en línea es intencional, pide la aprobación del texto ' +
              'nuevo, pega los hashes en public/_headers y vuelve a compilar. Si no lo es, revierte el cambio. ' +
              "'unsafe-inline' y 'unsafe-eval' no se aceptan nunca.",
          );
        }
        console.log(
          `[verificar-csp] OK: ${reales['script-src'].size} scripts y ${reales['style-src'].size} estilos en línea de ${paginas.length} páginas coinciden con public/_headers.`,
        );
      },
    },
  };
}
