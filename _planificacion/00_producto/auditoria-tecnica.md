# Auditoría técnica

Registro acumulativo de auditorías. Las auditorías se agregan al final; no se borran. Un hallazgo se marca como resuelto indicando la iteración o la RDA que lo cerró (por ejemplo, `Resuelto en 01-03` o `Resuelto en RDA-004`).

**Severidad:** Alta (bloquea publicación o afecta al visitante), Media (afecta calidad, rendimiento o mantenibilidad), Baja (mejora).

---

## Auditoría 01 · Prototipo actual

- **Fecha:** 2026-10-09
- **Auditor:** Claude (asistente de planificación)
- **Alcance:** el repositorio `ffelipecuevasc/pulso-devs` en el commit `265c7c2` (`index.html`, `assets/css/styles.css`, `assets/js/config.js`, `assets/js/theme.js`, `assets/js/ui.js`, `assets/img/`, `.gitignore`), contrastado con el brief del proyecto y con las respuestas del desarrollador del 2026-10-09.
- **Método:** revisión estática del código y búsqueda en todo el historial de Git. **No se ejecutó Lighthouse, no se midió contraste ni se probó el sitio en un navegador;** esos hallazgos se verifican en las épicas 04 y 05.

### Resumen

El prototipo tiene una identidad visual sólida (tokens `orient`, modo claro/oscuro diseñado por separado, el trazo de pulso, `prefers-reduced-motion` respetado y HTML semántico) y ya refleja las decisiones de producto: sin formulario, fundador solo en el pie, talleres como «próximamente». Lo que le falta es de **infraestructura y limpieza**: no hay proceso de compilación, depende de Google Fonts, tiene enlaces de navegación rotos, restos de secciones eliminadas, una cabecera SEO incompleta y un enlace de WhatsApp escrito en duro.

**Corrección de una premisa:** el hito «migrar de Tailwind CDN a compilación local» no describe el estado real. **Ningún commit del historial carga Tailwind** (búsqueda de `cdn.`, `@tailwindcss` y `<script src="https` en los cuatro commits: sin resultados). Hay clases de Tailwind escritas a mano en `index.html` que no hacen nada (AUD-01-009). El hito pasa a ser «incorporar Tailwind 4 con compilación local» (RDA-002).

### A. Contenido

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-001 | Media | El pie dice «Comunidad de desarrolladores web en Chile y Latam»; el resto del sitio y la visión hablan de desarrolladores junior de **toda Latinoamérica**. | Alinear la frase con el mensaje principal. | Abierto (03-01) |
| AUD-01-002 | Media | Los nombres de temáticas no coinciden con lo definido: «Ingeniería de Datos + Tecnología Cloud» mezcla dos temas y omite Machine Learning; «Desarrollo Web + Tecnología Cloud» omite AWS; «Desarrollo Web + IA» omite Claude Code. | Confirmar con el desarrollador los nombres definitivos. | Resuelto por decisión del desarrollador (2026-10-09): los nombres se mantienen tal como están por ahora |
| AUD-01-003 | Media | Las temáticas de los talleres usan íconos genéricos sin relación con el tema (`forum` para Web + IA, `arrow_outward` para Cloud, `library_books` para Datos) mientras los 9 logotipos oficiales (AWS, Claude, Django, Express, Java, JavaScript, Node.js, Python, Spring) están definidos en el HTML y no se usan. El brief pide logotipos oficiales para tecnologías, no íconos genéricos. | Usar los logotipos oficiales: decisión del desarrollador (2026-10-09), que entrega los SVG en `src/icons/` con el prefijo `tec-`. | Resuelto por decisión del desarrollador (2026-10-10): los logotipos no van en las temáticas; él eligió íconos Material Symbols Light. Los 29 SVG entregados migran en 01-03 |
| AUD-01-004 | Media | La línea de tiempo dice «**Hoy**: … un taller en vivo cada mes», y «Talleres gratuitos en vivo / Un taller al mes» está en presente, pero no consta que los talleres ya ocurran; el desarrollador indicó que todo queda como «próximamente». Contradice la regla de no presentar lo futuro como disponible. | Hubo un primer taller, el único hasta ahora (confirmado el 2026-10-09): reformular «Hoy» y la frecuencia para que no sugieran talleres mensuales en marcha, usando los datos del PDF del primer taller autorizados en RDA-014. | Abierto (03-01) |

### B. Estructura y navegación

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-005 | Alta | **Tres enlaces rotos:** `#oportunidades` aparece en el menú de escritorio, el menú móvil y el pie, pero no existe ninguna sección con ese `id` (las secciones son `inicio`, `comunidad`, `encontraras`, `talleres`, `vision` y `unete`). El clic no hace nada y esa entrada nunca se marca como activa. Es resto de la sección «Oportunidades» eliminada. | Retirar el enlace del header, del menú móvil y del pie (decisión del desarrollador, 2026-10-09). | Resuelto en 01-04 (sin `#oportunidades` en header, menú móvil ni pie; las 26 anclas de `index.html` apuntan a un `id` existente) |
| AUD-01-006 | Baja | La sección `#encontraras` («Lo que encontrarás en Pulso Devs») no tiene entrada en ninguna navegación. | Ninguna: el menú queda con Comunidad, Talleres y Visión, y `#encontraras` sigue sin entrada de menú. | Resuelto por decisión del desarrollador (2026-10-09) |
| AUD-01-007 | Media | El enlace «Felipe Cuevas» del pie tiene `href="#"` y lo completa JavaScript (`data-founder-website`); sin JavaScript lleva a `#`. Además abre pestaña nueva sin avisarlo. | Escribir el `href` real en el HTML desde `comunidad.js` e indicar la apertura en pestaña nueva. | Corregido en el prototipo (`d60c55e`: `href` real y aviso en `aria-label`); Resuelto en 01-04: el `href` real sale de `comunidad.js` y está en el HTML compilado, con `rel="noopener noreferrer"` y aviso de pestaña nueva |
| AUD-01-008 | Media | El enlace del grupo de WhatsApp está escrito en duro en `index.html` (una sola aparición) y no existe en `config.js`; el sitio y los datos de la comunidad no tienen fuente única. | `src/data/comunidad.js` (RDA-007). | Resuelto en 01-02 |
| AUD-01-009 | Media | La tarjeta de bienvenida y el enlace del fundador llevan clases de Tailwind (`flex`, `bg-white dark:bg-slate-900`, `text-gray-*`, `rounded-3xl`, `hover:text-blue-500`, `bg-green-50`…) que no tienen efecto porque Tailwind no se carga. Usan colores fuera de la paleta (`gray`, `slate`, `green`, `blue`) y un `dark:` que no funcionaría con `data-theme`. | Reemplazar por los tokens y componentes de `DESIGN.md` (RDA-002). | Resuelto en 01-05: la tarjeta (`.joincard`) y el chip del fundador usan solo tokens del sistema; no queda ninguna clase de color de Tailwind ajena a la paleta en `src/` |
| AUD-01-010 | Baja | Código muerto de secciones eliminadas: 30 selectores de `styles.css` sin uso en el HTML ni en JS (formulario: `form`, `field`, `select`, `spinner`…; fundador: `founder__*`; oportunidades: `opp-wall`, `opportunities__*`; `welcome__kicker`, `welcome__note`, `welcome__title`; uno es la utilidad `.sr-only`, que conviene conservar). En `ui.js`, `initConfigDriven` aún maneja foto, LinkedIn y web del fundador que ya no existen; `config.js` conserva `FOUNDER.photoUrl` y `FOUNDER.linkedin`. | No migrar el código muerto; portar solo lo que se usa. | Resuelto en 01-05: no se portó el código muerto (formulario, fundador antiguo, oportunidades, `welcome__*`, `.tech`, `.fineprint`, `.sprites`); `.sr-only` lo cubre la utilidad de Tailwind; de las 128 clases de `global.css` solo `.link-arrow` no se usa hoy, y se conserva a propósito (DESIGN §6; la usaba `ui.js` para las redes futuras, 03-02) |
| AUD-01-011 | Baja | `.gitignore` obsoleto: habla de `scripts/stage-site.mjs`, de Cloudflare Pages y de `_site/`, que no existen; faltan `dist/`, `.astro/`, `.wrangler/`, `.env*` y `.dev.vars`. | Actualizarlo en el andamiaje. | Resuelto en 01-01 |

### C. Rendimiento

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-012 | Alta | Lexend e IBM Plex Sans se cargan desde Google Fonts (`preconnect` a dos dominios y hoja de estilos externa que bloquea el renderizado). Contradice AGENTS §7.3. | Fuentes autoalojadas (RDA-004). | Resuelto en 01-03 |
| AUD-01-013 | Media | `index.html` pesa 68,3 KB, de los cuales 41,9 KB son un sprite de 35 símbolos SVG; 24,7 KB corresponden a 13 símbolos que no se usan (4 íconos y 9 logotipos). | `astro-icon`: solo los usados (RDA-005). | Resuelto en 01-03 |
| AUD-01-014 | Media | Las imágenes son PNG sin formato moderno ni `srcset`: el logotipo del hero (480 × 463 px, 89,7 KB) se muestra a un máximo de 200 px de ancho; `pulsodevs-original.png` (784 × 756 px, 157 KB) es la imagen de Open Graph. | `<Picture />` con AVIF/WebP; imagen de vista previa propia y liviana. | Parcial: en 01-04 los logotipos se sirven en AVIF y WebP con dimensiones explícitas (hero de 89.692 B a 4.729 B en AVIF y 13.048 B en WebP para 200 px); la imagen de vista previa propia sigue en 04-02 |

### D. Accesibilidad

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-015 | Media | El contraste de color, el tamaño de los objetivos táctiles (44 × 44 px), el foco visible en todas las combinaciones y el comportamiento con lector de pantalla **no se midieron** (revisión estática). El código sí muestra buenas bases: enlace «Saltar al contenido», `aria-label` en navegación, interruptor de tema con `role="switch"`, foco atrapado en el menú móvil con cierre por Esc y `prefers-reduced-motion`. | Medir con herramientas y con un teléfono real. | Abierto (04-03) |

### E. SEO y metadatos

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-016 | Alta | `og:url` vale `[SITE_URL]` (marcador sin reemplazar) y `og:image` usa una ruta relativa (`assets/img/pulsodevs-original.png`); Open Graph exige URL absolutas, así que las vistas previas en WhatsApp y LinkedIn fallarán. | `site` en `astro.config.mjs` y URLs absolutas generadas en compilación. | Resuelto en 01-02 (la imagen de vista previa propia sigue en AUD-01-014, 04-02) |
| AUD-01-017 | Media | Faltan `canonical`, datos estructurados (JSON-LD de `Organization`), `robots.txt`, sitemap y `og:image:alt`; `twitter:card` es `summary` sin imagen propia. | `CabeceraSEO`, `@astrojs/sitemap` y JSON-LD. | Parcial: sitemap (01-01), `canonical`, `og:image:alt` y `CabeceraSEO` (01-02); faltan JSON-LD, `robots.txt` y `twitter:card` con imagen propia (04-01) |
| AUD-01-018 | Baja | El favicon es solo un PNG de 128 px (`pulsodevs-small.png`); sin `apple-touch-icon` ni tamaños 32 y 192. | Conjunto de íconos derivado del logotipo oficial, sin deformarlo. | Abierto (04-01) |

### F. Repositorio y documentación

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-019 | Media | El repositorio no tiene `package.json`, lockfile, `LICENSE`, `.claude/settings.json`, `_planificacion/` ni `wrangler.jsonc`. | Andamiaje de la Épica 01 y documentación entregada. | Parcial: `LICENSE`, `.claude/settings.json` y `_planificacion/` ya están (`d60c55e`); `package.json` y `pnpm-lock.yaml` creados en 01-01; falta `wrangler.jsonc` (01-06) |
| AUD-01-020 | Baja | `pulsodevs.png` y `pulsodevs-small.png` se usan con `alt=""` en el header y el pie (correcto, el enlace tiene `aria-label`), pero el logotipo del hero tiene `alt="Logotipo de Pulso Devs"` junto a un `h1` que ya dice «Pulso Devs»: el lector de pantalla repite el nombre. | Evaluar `alt=""` en el hero si el nombre ya está en el `h1`. | Abierto (04-03) |

### Hallazgos abiertos por iteración

| Iteración | Hallazgos |
| :-------- | :-------- |
| 01-01 | AUD-01-011, AUD-01-019 |
| 01-02 | AUD-01-008, AUD-01-016 y AUD-01-017 (parte). Cerrados en 01-02 (AUD-01-017 parcial) |
| 01-03 | AUD-01-009 y AUD-01-010 (parte), AUD-01-012, AUD-01-013 |
| 01-04 | AUD-01-005, AUD-01-007, AUD-01-014 (parte) |
| 01-05 | AUD-01-009 y AUD-01-010 (parte) |
| 03-01 | AUD-01-001, AUD-01-004 |
| 04-01 | AUD-01-016 y AUD-01-017 (parte), AUD-01-018 |
| 04-02 | AUD-01-014 (parte) |
| 04-03 | AUD-01-015, AUD-01-020 |

---

## Auditoría 02 · Prototipo en `d60c55e` y transición de tema

- **Fecha:** 2026-10-10
- **Auditor:** Claude (asistente de planificación)
- **Alcance:** cambios del prototipo desde la Auditoría 01 (commit `d60c55e`: `.band--dots`, `.joincard`, `.founder-chip`, LinkedIn de la comunidad, íconos de temáticas, `assets/icons/`).
- **Método:** revisión estática y conteo de símbolos con un script. No se ejecutó Lighthouse ni se probó en un teléfono real.

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-02-001 | Baja | El logotipo de LinkedIn del pie (símbolo `logo-linkedin` del sprite) y el de WhatsApp de `.joincard` (SVG en línea) duplican los oficiales entregados en `assets/icons/` (`LogosLinkedIn.svg`, `LogosWhatsappIcon.svg`). | Usar `tec-linkedin.svg` y `tec-whatsapp-icon.svg` en la migración. | Resuelto en 01-05: LinkedIn del pie (`tec-linkedin.svg`, 01-04) y WhatsApp de `.joincard` (`tec-whatsapp-icon.svg`) usan los logotipos oficiales |
| AUD-02-002 | Media | El sprite define 37 símbolos y 15 no se usan (6 íconos: `check_circle`, `error`, `forum`, `keyboard_arrow_down`, `progress_activity`, `smart_toy`; 9 logotipos). `index.html` pesa 74.193 B. Reemplaza el conteo de AUD-01-013. | `astro-icon`, solo los usados. | Resuelto en 01-03 |
| AUD-02-003 | Media | Los 6 íconos de las temáticas de talleres, elegidos por el desarrollador, están como SVG en línea sin nombre; para `astro-icon` hace falta su nombre en Material Symbols Light. | Identificarlos comparando el `path` con `@iconify-json/material-symbols-light`; preguntar si alguno no coincide. | Resuelto en 01-03 (los 6 coinciden exactamente: `web`, `code-blocks`, `wand-stars`, `cloud-sync`, `rocket-launch`, `robot-2`) |
| AUD-02-004 | Baja | Varios logotipos entregados traen `id` internos (Google 19, Gemini 8, y uno en Astro, JetBrains, Node.js, Python, Tailwind CSS y WhatsApp); si dos se inyectan en la misma página pueden chocar. | Comprobar en 01-03 cómo los trata `astro-icon`. | Resuelto en 01-03 (`astro-icon` renombra los `id` internos; sin duplicados en una página con todos los logotipos) |
| AUD-02-005 | Baja | La transición de cambio de tema (iteración 02-03) usará la View Transitions API, no disponible en todos los navegadores. | Cambio inmediato sin la API y con `prefers-reduced-motion`; probar en Safari, Firefox y un teléfono real. | Abierto (02-03, 04-03 y 05-02) |
| AUD-02-006 | Media | `.claude/settings.json` niega `git checkout` y `git switch`, y `AGENTS.md` trataba la creación de ramas como «consulta previa». | Se trabaja solo en `main`: no hacen falta ramas. | Resuelto en RDA-015 |
| AUD-02-007 | Baja | Los enlaces a `#oportunidades` siguen en el menú de escritorio y el móvil (ya no en el pie). | Sin cambios a AUD-01-005: se retiran en 01-04. | Resuelto en 01-04 (ver AUD-01-005) |

### Hallazgos abiertos por iteración (Auditoría 02)

| Iteración | Hallazgos |
| :-------- | :-------- |
| 01-03 | AUD-02-002, AUD-02-003, AUD-02-004 |
| 01-04 | AUD-02-001 (parte), AUD-02-007 |
| 01-05 | AUD-02-001 (parte) |
| 02-03, 04-03 y 05-02 | AUD-02-005 |
