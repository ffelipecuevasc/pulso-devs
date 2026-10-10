import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const MARCADOR = 'PENDIENTE_DATO';
const EXTENSIONES = new Set([
  '.html',
  '.xml',
  '.txt',
  '.js',
  '.mjs',
  '.css',
  '.json',
  '.webmanifest',
  '.svg',
  '.map',
]);

/** Devuelve todas las rutas de archivo bajo `carpeta`, recursivamente. */
async function listarArchivos(carpeta) {
  const entradas = await readdir(carpeta, { withFileTypes: true });
  const rutas = await Promise.all(
    entradas.map((entrada) => {
      const ruta = path.join(carpeta, entrada.name);
      return entrada.isDirectory() ? listarArchivos(ruta) : [ruta];
    }),
  );
  return rutas.flat();
}

/**
 * Integración de Astro que hace fallar `pnpm build` si algún archivo publicado en `dist/`
 * contiene el marcador `PENDIENTE_DATO` (RDA-007, AGENTS.md §6.4).
 *
 * @returns {import('astro').AstroIntegration}
 */
export default function bloquearPendientes() {
  return {
    name: 'bloquear-pendientes',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const carpeta = fileURLToPath(dir);
        const archivos = (await listarArchivos(carpeta)).filter((ruta) =>
          EXTENSIONES.has(path.extname(ruta).toLowerCase()),
        );

        const hallazgos = [];
        for (const ruta of archivos) {
          const contenido = await readFile(ruta, 'utf8');
          const cantidad = contenido.split(MARCADOR).length - 1;
          if (cantidad > 0) {
            hallazgos.push(`${path.relative(carpeta, ruta).replaceAll('\\', '/')} (${cantidad})`);
          }
        }

        if (hallazgos.length > 0) {
          throw new Error(
            `Quedan datos sin confirmar (${MARCADOR}) en los archivos publicados:\n` +
              hallazgos.map((hallazgo) => `  - dist/${hallazgo}`).join('\n') +
              `\nCompleta el valor en src/data/comunidad.js o deja de mostrarlo antes de publicar.`,
          );
        }
      },
    },
  };
}
