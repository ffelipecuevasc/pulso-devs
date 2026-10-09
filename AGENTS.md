# AGENTS.md · Comunidad Pulso Devs

Instrucciones de trabajo para cualquier agente de IA (Claude Code, Antigravity u otro) que colabore en este repositorio. Este archivo es la entrada principal; no existe `CLAUDE.md`.

> Este archivo, `DESIGN.md` y `README.md` solo se modifican con aprobación explícita del desarrollador.

---

## 1. Contexto en 30 segundos

- **Proyecto:** sitio oficial de **Comunidad Pulso Devs**, comunidad latinoamericana de desarrolladores junior (frontend, backend, fullstack, ingeniería de IA, web + IA, cloud, datos y machine learning, aplicaciones con agentes de IA).
- **Fundador y desarrollador responsable:** Felipe Cuevas (https://felipecuevas.dev).
- **Dominio:** `comunidadpulso.dev`.
- **Repositorio:** `ffelipecuevasc/pulso-devs` (público).
- **Objetivo:** presentar la comunidad, transmitir confianza y llevar a nuevos desarrolladores junior a unirse (hoy, mediante el grupo de WhatsApp).
- **Principio rector:** «Pulso Devs debe sentirse como una comunidad tecnológica que está comenzando a crecer, no como una empresa que intenta parecer grande.»
- **Abierta a toda Latinoamérica.** Nació con exalumnos del fundador, pero **nunca** se presenta como exclusiva para ellos.

## 2. Orden de lectura obligatorio antes de trabajar

1. `_planificacion/00_producto/registro-log.md`: qué está pendiente y cuál es la iteración activa. Es la fuente única de verdad del trabajo.
2. El archivo de la iteración activa en `_planificacion/10_epicas/<epica>/`.
3. `_planificacion/00_producto/decisiones.md`: RDA vigentes. No contradigas una RDA aceptada.
4. `DESIGN.md` si la tarea toca interfaz.
5. `_planificacion/00_producto/vision-producto.md` si hay dudas de alcance o tono.

Si algo de lo anterior está en conflicto, detente y pregunta.

## 3. Stack y versiones

- **Astro 7** con salida estática (SSG). El contenido se genera en `dist/`.
- **Node.js 24 LTS** (mínimo 22.12).
- **PNPM 12** (12.8.1), fijado en `devEngines.packageManager` de `package.json` (`onFail: download`). Sin Corepack ni campo `packageManager`. Los scripts de instalación permitidos se declaran en `pnpm-workspace.yaml` (`allowBuilds`). **PNPM es obligatorio y no transable:** nunca `npm` ni `yarn`, tampoco `npx` (usa `pnpm dlx` o `pnpm exec`).
- **Tailwind CSS 4** compilado localmente con `@tailwindcss/vite`. Los tokens viven en `src/styles/global.css` dentro de `@theme`. No existe `tailwind.config.js` y no debe crearse. **Prohibido** el CDN de Tailwind.
- **JavaScript** (ES2022+). Sin TypeScript en el código de la aplicación; `tsconfig.json` existe solo para el editor y `astro check` (TypeScript 6; no actualizar a 7 mientras `astro check` no lo soporte).
- **Hosting:** Cloudflare Workers con recursos estáticos (Workers Static Assets), dominio `comunidadpulso.dev`. La configuración vive en `wrangler.jsonc`. Cualquier lógica de servidor (por ejemplo, un endpoint de registro) requiere una RDA.

> El sitio actual (HTML, CSS y JS sin compilación) es el **prototipo de referencia**. La Épica 01 lo migra a este stack; mientras tanto, prevalece el código existente como referencia visual y de contenido.

## 4. Comandos

```bash
pnpm install        # instala dependencias
pnpm dev            # servidor de desarrollo (http://localhost:4321)
pnpm build          # compilación de producción en dist/
pnpm preview        # sirve dist/ localmente
pnpm check          # astro check
pnpm format         # prettier --write
pnpm format:check   # prettier --check
```

Astro 7 detecta agentes de IA e inicia `astro dev` en segundo plano. Usa `pnpm astro dev status`, `pnpm astro dev logs` y `pnpm astro dev stop`; no dejes servidores huérfanos al terminar.

## 5. Límites de actuación

**Prohibido (lo hace solo el desarrollador):**

- `git commit`, `git push`, `git merge`, `git pull`, `git rebase`, `git reset`, `git tag` y cualquier operación que reescriba o publique historial.
- Desplegar (`wrangler deploy`, `pnpm exec wrangler`, `pnpm dlx wrangler`) o modificar la configuración de Cloudflare, DNS, Google Workspace, Google Sheets o WhatsApp.
- Editar `.claude/`, `.git/`, `.dev.vars` o archivos `.env`.
- Escribir credenciales, tokens, API keys, IDs privados o claves de servicio en cualquier archivo versionado.

**Requiere consulta previa:**

- Crear o cambiar de rama. Formato: `iteracion/XX-YY-descripcion-corta` (por ejemplo `iteracion/01-02-migracion-astro`).
- Editar `AGENTS.md`, `DESIGN.md`, `README.md`, `package.json`, `astro.config.mjs`, `wrangler.jsonc` u otros archivos de configuración de la raíz.
- Instalar, actualizar o eliminar dependencias. Cada dependencia nueva requiere justificar peso, alternativa sin dependencia y, si es estructural, una RDA.
- Eliminar o mover archivos.

**Permitido sin consulta:** editar `src/`, `public/` y `_planificacion/`; ejecutar los comandos de la sección 4; leer el repositorio.

## 6. Reglas de contenido

1. Texto visible en **español neutro latinoamericano**, trato de **tú**, cercano y simple, sin lenguaje corporativo frío ni anglicismos innecesarios (los nombres de tecnologías se escriben como en su marca oficial). `lang="es"` en el HTML.
2. **No inventes datos.** Cargos, certificaciones, empresas, años, cifras, logros o biografía del fundador salen solo de `Profile - Felipe Cuevas.pdf` o de lo que el desarrollador entregue por escrito.
3. **No presentes lo futuro como disponible.** Usa «próximamente», «estamos creciendo» o «nuevas iniciativas en camino». No afirmes que existe un calendario de talleres, cifras de miembros ni alianzas con empresas (Oracle, Google u otras) sin confirmación.
4. Si falta un dato, usa un marcador explícito `PENDIENTE_DATO` en `src/data/comunidad.js` y regístralo en `registro-log.md`. Nunca publiques un enlace o cifra de relleno que parezca real.
5. Los valores configurables (enlace de WhatsApp, redes, endpoint de registro, URL del sitio) viven **solo** en `src/data/`. Ningún componente los escribe en duro.
6. Las mayúsculas del diseño se aplican con CSS, no escribiendo el texto en mayúsculas.

## 7. Reglas técnicas

1. **HTML semántico:** `header`, `nav`, `main`, `section` con `aria-labelledby`, `article`, `footer`. Un solo `h1` por página. Jerarquía de encabezados sin saltos.
2. **Cero JavaScript por defecto.** Primero HTML y CSS; luego `<script>` nativo de Astro. El único script en línea permitido en `<head>` es el que aplica el tema antes de pintar (evita el parpadeo). React u otro framework solo con una RDA aprobada.
3. **Sin recursos de terceros en tiempo de ejecución:** nada de Tailwind CDN, Google Fonts remotas ni fuentes de íconos. Fuentes autoalojadas; íconos y logotipos como SVG en línea; imágenes locales en `src/assets/` procesadas con `<Image />` o `<Picture />`. Cualquier excepción exige una RDA.
4. **Íconos:** exclusivamente **Material Symbols Light** como SVG. Logotipos de tecnologías: solo los SVG oficiales ya entregados al proyecto (`logos.txt`, colección SVG Logos). Si falta uno, **pide el SVG**; no lo inventes ni lo sustituyas por un ícono genérico. Sin emojis como íconos.
5. **Logotipo:** usa siempre el archivo oficial `pulsodevs.png` y sus derivados. No lo redibujes, recortes, recolorees ni deformes.
6. **Modo claro y oscuro:** ambos obligatorios, diseñados por separado (no una inversión). Preferencia persistida en `localStorage` con la clave `pulsodevs-theme`, con respaldo en `prefers-color-scheme`.
7. **Seguridad del registro:** los datos de formularios viajan a un endpoint seguro (Apps Script o Worker); nunca se exponen secretos en el navegador. Si hace falta un ID o credencial no entregada, usa un marcador y detente.
8. **Accesibilidad:** WCAG 2.2 AA, foco visible de 3 px, objetivos táctiles de al menos 44 × 44 px, navegación completa con teclado, `prefers-reduced-motion` respetado, textos alternativos descriptivos, `label` real en cada campo.
9. **Responsive mobile-first:** sin desplazamiento horizontal desde 320 px. Revisar header, hero, menú, formularios y footer en 360, 768, 1280 y 1536 px.
10. **Rendimiento:** meta de 95–100 en Lighthouse móvil en las cuatro categorías; LCP < 2,5 s, CLS < 0,05, INP < 200 ms.
11. **Componentes:** un componente por archivo en `src/components/`, nombres en PascalCase y en español (`BotonUnirse.astro`, `TarjetaTaller.astro`). Props documentadas con JSDoc.
12. **Astro 7 compila con Rust y es estricto:** HTML válido, etiquetas cerradas, anidación correcta; usa `{' '}` para espacios explícitos entre elementos en línea.
13. **Formato:** `pnpm format` y `pnpm check` antes de cerrar una iteración. `pnpm build` sin errores ni advertencias nuevas.

## 8. Flujo de trabajo por iteración

1. Lee el registro y la iteración activa (sección 2).
2. Si la iteración requiere una rama, propón el nombre y espera aprobación.
3. Implementa solo lo descrito en los criterios de aceptación. Lo que esté fuera de alcance va como propuesta en `registro-log.md`.
4. Verifica: `pnpm format`, `pnpm check`, `pnpm build` y revisión en 360 px y escritorio, en modo claro **y** oscuro. Marca un criterio solo si lo mediste; nunca citando el código fuente como evidencia.
5. Escribe la bitácora en `_planificacion/99_bitacora/` con la plantilla de `_planificacion/README.md`.
6. Actualiza `registro-log.md` y, si corresponde, `decisiones.md` y `auditoria-tecnica.md`.
7. Entrega un resumen con los archivos modificados y un mensaje de commit con el formato `Épica N - Iteración NN-NN: descripción`, en una línea de máximo 200 caracteres. El commit lo hace el desarrollador.

## 9. Cuándo detenerse y preguntar

- Falta un dato (enlace, SVG, foto, biografía, credencial, endpoint) que bloquea la tarea.
- La tarea contradice una RDA, `DESIGN.md` o la visión del producto.
- Hay que agregar una dependencia, cambiar configuración, desplegar o crear una rama.
- Un cambio empeoraría Lighthouse, la accesibilidad o la seguridad.