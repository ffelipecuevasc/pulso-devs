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
| AUD-01-001 | Media | El pie dice «Comunidad de desarrolladores web en Chile y Latam»; el resto del sitio y la visión hablan de desarrolladores junior de **toda Latinoamérica**. | Alinear la frase con el mensaje principal. | Resuelto en 03-01 (2026-10-11): el pie compilado dice «Comunidad latinoamericana de desarrolladores junior»; «Chile» da 0 en `src/`, `public/` y `dist/`, y «Latam» solo aparece en la clase CSS `footer__latam` (ver bitácora 03-01) |
| AUD-01-002 | Media | Los nombres de temáticas no coinciden con lo definido: «Ingeniería de Datos + Tecnología Cloud» mezcla dos temas y omite Machine Learning; «Desarrollo Web + Tecnología Cloud» omite AWS; «Desarrollo Web + IA» omite Claude Code. | Confirmar con el desarrollador los nombres definitivos. | Resuelto por decisión del desarrollador (2026-10-09): los nombres se mantienen tal como están por ahora |
| AUD-01-003 | Media | Las temáticas de los talleres usan íconos genéricos sin relación con el tema (`forum` para Web + IA, `arrow_outward` para Cloud, `library_books` para Datos) mientras los 9 logotipos oficiales (AWS, Claude, Django, Express, Java, JavaScript, Node.js, Python, Spring) están definidos en el HTML y no se usan. El brief pide logotipos oficiales para tecnologías, no íconos genéricos. | Usar los logotipos oficiales: decisión del desarrollador (2026-10-09), que entrega los SVG en `src/icons/` con el prefijo `tec-`. | Resuelto por decisión del desarrollador (2026-10-10): los logotipos no van en las temáticas; él eligió íconos Material Symbols Light. Los 29 SVG entregados migran en 01-03 |
| AUD-01-004 | Media | La línea de tiempo dice «**Hoy**: … un taller en vivo cada mes», y «Talleres gratuitos en vivo / Un taller al mes» está en presente, pero no consta que los talleres ya ocurran; el desarrollador indicó que todo queda como «próximamente». Contradice la regla de no presentar lo futuro como disponible. | Hubo un primer taller, el único hasta ahora (confirmado el 2026-10-09): reformular «Hoy» y la frecuencia para que no sugieran talleres mensuales en marcha, diciendo solo que hubo un primer taller en octubre de 2026; los datos de RDA-014 se publican en la página de eventos (Épica 06; enmienda a RDA-014). | Resuelto en 03-01 (2026-10-11): «Hoy» de Visión y la bajada de Talleres sin ritmo mensual en marcha, y la nota de Talleres con el primer taller (octubre de 2026); sin datos de RDA-014 en `dist/` (8 búsquedas en 0). «Frecuencia» y «Más adelante» se mantienen por decisión del desarrollador (bitácora 03-01) |

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
| AUD-01-014 | Media | Las imágenes son PNG sin formato moderno ni `srcset`: el logotipo del hero (480 × 463 px, 89,7 KB) se muestra a un máximo de 200 px de ancho; `pulsodevs-original.png` (784 × 756 px, 157 KB) es la imagen de Open Graph. | `<Picture />` con AVIF/WebP; imagen de vista previa propia y liviana. | Parcial: en 01-04 los logotipos se sirven en AVIF y WebP con dimensiones explícitas (hero de 89.692 B a 4.729 B en AVIF y 13.048 B en WebP para 200 px); la imagen de vista previa propia se hace en **04-01** (decisión del desarrollador, 2026-10-11). **Resuelto en 04-01 (2026-10-12).** Medición local: imagen de vista previa propia `pulsodevs-vista-previa.png`, medida en `dist/`: 1200 × 630 px, PNG de 25.676 B (antes 784 × 756 px y 157.036 B), aprobada por el desarrollador. **Producción (declarado por el desarrollador, 2026-10-12, con capturas):** la imagen nueva aparece en la vista previa de WhatsApp (tarjeta grande) y en la del compositor de LinkedIn (tarjeta compacta) |

### D. Accesibilidad

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-015 | Media | El contraste de color, el tamaño de los objetivos táctiles (44 × 44 px), el foco visible en todas las combinaciones y el comportamiento con lector de pantalla **no se midieron** (revisión estática). El código sí muestra buenas bases: enlace «Saltar al contenido», `aria-label` en navegación, interruptor de tema con `role="switch"`, foco atrapado en el menú móvil con cierre por Esc y `prefers-reduced-motion`. | Medir con herramientas y con un teléfono real. | Abierto (04-03) |

### E. SEO y metadatos

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-016 | Alta | `og:url` vale `[SITE_URL]` (marcador sin reemplazar) y `og:image` usa una ruta relativa (`assets/img/pulsodevs-original.png`); Open Graph exige URL absolutas, así que las vistas previas en WhatsApp y LinkedIn fallarán. | `site` en `astro.config.mjs` y URLs absolutas generadas en compilación. | Resuelto en 01-02 (la imagen de vista previa propia sigue en AUD-01-014, 04-01). **Resuelto en 04-01 (2026-10-12).** Medición local: medido en `dist/index.html`: `og:url` `https://comunidadpulso.dev/`, `og:image` con URL absoluta a la imagen nueva, `og:image:width` 1200 y `og:image:height` 630 (coinciden con el archivo). **Producción (declarado por el desarrollador, 2026-10-12, con capturas):** las vistas previas de WhatsApp y del compositor de LinkedIn muestran la imagen, el título «Comunidad Pulso Devs» y el dominio `comunidadpulso.dev` |
| AUD-01-017 | Media | Faltan `canonical`, datos estructurados (JSON-LD de `Organization`), `robots.txt`, sitemap y `og:image:alt`; `twitter:card` es `summary` sin imagen propia. | `CabeceraSEO`, `@astrojs/sitemap` y JSON-LD. | Parcial: sitemap (01-01), `canonical`, `og:image:alt` y `CabeceraSEO` (01-02); faltaban JSON-LD, `robots.txt` y `twitter:card` con imagen propia. **Resuelto en 04-01 (2026-10-12).** Medición local: medido en `dist/`: un JSON-LD de `Organization` en la portada (parseable con `JSON.parse`; ninguno en la 404), `robots.txt` con la URL de `sitemap-index.xml`, `twitter:card` `summary_large_image` con la imagen nueva y el sitemap solo con la portada; Lighthouse SEO 100 (mediana de tres, móvil). **Producción (declarado por el desarrollador, 2026-10-12, con capturas):** `robots.txt` y `sitemap-index.xml` responden con el contenido esperado; `validator.schema.org` muestra un elemento `Organization` con 0 errores y 0 advertencias; la prueba de resultados enriquecidos de Google rastrea la página sin errores y no detecta elementos, porque `Organization` no es un tipo que esa herramienta muestre (no es una validación de Google del JSON-LD) |
| AUD-01-018 | Baja | El favicon es solo un PNG de 128 px (`pulsodevs-small.png`); sin `apple-touch-icon` ni tamaños 32 y 192. | Conjunto de íconos derivado del logotipo oficial, sin deformarlo. | **Resuelto en 04-01 (2026-10-12).** Medición local: medido en `dist/` y enlazados en `<head>`: `favicon.ico` (32 × 32 px), `icono-32.png`, `icono-192.png` y `apple-touch-icon.png` (180 × 180 px), derivados de `pulsodevs.png` centrado en un lienzo cuadrado; los cuatro responden `200` y se decodifican en `pnpm preview`. **Producción (declarado por el desarrollador, 2026-10-12):** la pestaña del navegador muestra el logotipo nuevo, observado en una captura; el `apple-touch-icon` no se probó en un iPhone ni el ícono de 192 px en un teléfono |

### F. Repositorio y documentación

| ID         | Severidad | Hallazgo | Acción recomendada | Estado |
| :--------- | :-------- | :------- | :----------------- | :----- |
| AUD-01-019 | Media | El repositorio no tiene `package.json`, lockfile, `LICENSE`, `.claude/settings.json`, `_planificacion/` ni `wrangler.jsonc`. | Andamiaje de la Épica 01 y documentación entregada. | Parcial: `LICENSE`, `.claude/settings.json` y `_planificacion/` ya están (`d60c55e`); `package.json` y `pnpm-lock.yaml` creados en 01-01; `wrangler.jsonc` creado en 01-06 (fase A; pendiente de comprobar en producción, fase B) |
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
| 04-01 | AUD-01-014 (parte: imagen de vista previa), AUD-01-016 y AUD-01-017 (parte), AUD-01-018 |
| 04-02 | — (AUD-01-014 se cierra en 04-01; aquí se mide su efecto) |
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
| AUD-02-005 | Baja | La transición de cambio de tema (iteración 02-03) usará la View Transitions API, no disponible en todos los navegadores. | Cambio inmediato sin la API y con `prefers-reduced-motion`; probar en Safari, Firefox y un teléfono real. | **Parcial** (abierto en 04-03 y 05-02). En 02-03 se midió solo en Chrome 154 (headless, Windows): con la API, sin la API eliminada y con movimiento reducido. **Teléfono real: declarado por el desarrollador, 2026-10-11, Samsung Galaxy A52+, Chrome y Firefox** (no es una medición; probó la transición de cambio de tema y dijo que todo funciona perfectamente, sin detallar qué navegador usó en cada prueba). **Siguen pendientes Safari y Firefox** (decisión del desarrollador) en 04-03 y 05-02 |
| AUD-02-006 | Media | `.claude/settings.json` niega `git checkout` y `git switch`, y `AGENTS.md` trataba la creación de ramas como «consulta previa». | Se trabaja solo en `main`: no hacen falta ramas. | Resuelto en RDA-015 |
| AUD-02-007 | Baja | Los enlaces a `#oportunidades` siguen en el menú de escritorio y el móvil (ya no en el pie). | Sin cambios a AUD-01-005: se retiran en 01-04. | Resuelto en 01-04 (ver AUD-01-005) |
| AUD-02-008 | Media | Durante ~1,05 s de la transición de cambio de tema (02-03) el clic del mouse no llega a la página: Chrome entrega los eventos del mouse al `<html>` (`document.elementFromPoint` devuelve `HTML.is-theme-switching` sobre el interruptor y sobre el botón «Únete») y `pointer-events: none` en `::view-transition` no lo cambia. El estado queda coherente (un doble clic cuenta una vez); el teclado y `.click()` sí llegan. Choca con la consecuencia de RDA-016 («no puede bloquear la interacción»). Medido solo con el mouse en Chrome 154 (headless, Windows); táctil (teléfono), Safari y Firefox: **no verificados**. | Que el desarrollador lo pruebe en un teléfono real, Safari y Firefox. Mientras tanto se acepta como limitación conocida (decisión del desarrollador, 2026-10-10), ya descrita en `DESIGN.md` §6; sin cambios en RDA-016 ni en la duración de 1 s. | **Parcial** (abierto en 04-03 y 05-02, junto con AUD-02-005). **Teléfono real: declarado por el desarrollador, 2026-10-11, Samsung Galaxy A52+, Chrome y Firefox** (no es una medición): probó la transición de cambio de tema y dijo que todo funciona perfectamente; **no dijo** si tocó la pantalla durante el efecto, así que el bloqueo de toques sigue sin verificar. **Siguen pendientes Safari y Firefox** en 04-03 y 05-02 |
| AUD-02-009 | Media | El borde de los botones secundarios (`--line-strong`, usado en `.btn--ghost`: «Conoce Pulso Devs» del hero y «Unirme al grupo de WhatsApp» de la 404) mide **1,82:1 en modo claro y 2,08:1 en modo oscuro** (medido en 02-02 sobre la 404, a 360 px), frente a los **3:1** que `DESIGN.md` §2.4 exige para componentes. El **texto** del botón sí cumple (18,9:1 y 16,7:1). No lo introdujo 02-02: el token y el botón vienen del sitio original. El mismo token se usa también en otros bordes (`.founder-chip`, `.theme-toggle__track`, `.menu-toggle`, `.timeline__next`, `.timeline__arrow`, `.next-list li` y `.joincard__text`), que no se midieron. | Corregirlo en 04-03 midiendo **juntas todas las combinaciones** donde se usa `--line-strong`, y con aprobación del desarrollador del valor nuevo (cambia un token de `DESIGN.md` §2.2). **No se cambió el token.** | Abierto (04-03) |
| AUD-02-010 | Media | Objetivos táctiles menores de 44 × 44 px, contra `DESIGN.md` §9 y `AGENTS.md` §7.8. Medido en la auditoría de `DESIGN.md` (bitácora 02-04, D1) a 360 px, claro y oscuro: la marca `.brand` mide 135 × 31 px en el header y 164 × 38 px en el pie, y el interruptor de tema 56 × 32 px. Desde 560 px, el botón «Únete» del header (`.btn--sm`) mide 83 × 40 px (aparece también en tabletas táctiles) y, desde 1100 px, los enlaces del menú miden 110 × 40, 80 × 40 y 70 × 40 px. | Corregir el sitio en 04-03 midiendo todos los objetivos interactivos; `DESIGN.md` §9 no cambia (decisión del desarrollador, 2026-10-11). Si 04-03 cambia el tamaño del botón `--sm`, se ajusta también la frase de §6 («40 px en `--sm`, solo en contextos no táctiles principales»). El interruptor de tema se corrige antes, en la iteración **04-00**, con un área táctil invisible de 44 px y sin cambiar su dibujo (decisión del desarrollador, 2026-10-11); el resto, en 04-03. | **Parcial** (abierto en 04-03). **Interruptor de tema resuelto en 04-00 (2026-10-11), medido:** `<button>` de 56 × 44 px (pista de 56 × 32 px), perilla con 3 px de margen en los cuatro lados e íconos centrados sobre la perilla (0,00 px), a 360 y 1280 px, 1×, 2× y 3×, claro y oscuro; alto del header sin cambio (73 px). **Siguen abiertos en 04-03:** la marca, el botón «Únete» `--sm` y los enlaces del menú de escritorio |

### Hallazgos abiertos por iteración (Auditoría 02)

| Iteración | Hallazgos |
| :-------- | :-------- |
| 01-03 | AUD-02-002, AUD-02-003, AUD-02-004 |
| 01-04 | AUD-02-001 (parte), AUD-02-007 |
| 01-05 | AUD-02-001 (parte) |
| 02-03, 04-03 y 05-02 | AUD-02-005 (parcial), AUD-02-008 (parcial) |
| 04-00 | AUD-02-010 (parte: interruptor de tema) |
| 04-03 | AUD-02-009, AUD-02-010 (el resto, tras 04-00) |
