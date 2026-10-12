# DESIGN.md · Comunidad Pulso Devs

Sistema de diseño del sitio. Describe lo que **existe hoy** en el sitio y cómo se declara en Tailwind CSS 4 con `@theme`. Es la referencia obligatoria para cualquier cambio de interfaz.

> Solo se modifica con aprobación explícita del desarrollador. Si el código y este documento discrepan, se detiene el trabajo y se pregunta.

---

## 1. Principio de diseño

**«Estamos construyendo algo nuevo juntos.»** Una comunidad tecnológica que empieza a crecer, no una empresa que intenta parecer grande.

| Sí | No |
| :-- | :-- |
| Composición editorial, tipografía grande, espacio negativo | Plantilla SaaS, rejillas de tarjetas idénticas |
| Líneas, bloques de color y un único recurso gráfico propio: **el pulso** | Gradientes por todas partes, glassmorphism, sombras pesadas |
| Microinteracciones sutiles con propósito | Animaciones exageradas o en bucle que distraen |
| El logotipo como centro de la identidad | Íconos genéricos o emojis como decoración |
| Modo oscuro diseñado aparte, premium y profundo | Inversión automática de colores o negro puro `#000` |

**Motivo gráfico central:** un trazo de electrocardiograma (el «pulso») que recorre el hero y termina en el logotipo, más un punto que late (`.beat`). Es el único elemento decorativo recurrente; no se agregan otros sin aprobación.

## 2. Color

### 2.1 Paleta de marca (fija)

| Token | Hex | Token | Hex |
| :-- | :-- | :-- | :-- |
| `orient-50` | `#E4F3FF` | `orient-600` | `#00678A` |
| `orient-100` | `#B9E2FF` | `orient-700` | `#005471` |
| `orient-200` | `#5DC9FF` | `orient-800` | `#003B51` |
| `orient-300` | `#00B0E8` | `orient-900` | `#00212F` |
| `orient-400` | `#0096C7` | `orient-950` | `#00131D` |
| `orient-500` | `#007EA7` | | |
| `gold` | `#F8CD46` | `gold-deep` | `#7A5C00` |
| `badge-light` | `#ECF0FF` | | |

Semánticos de marca: `primary` = `orient-500`, fondo claro `#FFFFFF`, fondo oscuro `orient-950`.

El dorado es un **acento escaso**: estados de error, avisos y detalles puntuales. Nunca como color de fondo amplio.

### 2.2 Tokens semánticos por modo

Los componentes **solo** usan tokens semánticos, nunca la escala directa.

| Token | Modo claro | Modo oscuro | Uso |
| :-- | :-- | :-- | :-- |
| `--bg` | `#FFFFFF` | `orient-950` | Fondo de página |
| `--surface` | `orient-50` | mezcla 65 % `orient-900` + `orient-950` | Secciones suaves |
| `--ink` | `orient-950` | `orient-50` | Texto principal |
| `--ink-2` | `orient-800` | `orient-100` | Texto secundario |
| `--muted` | `orient-700` | mezcla 74 % `orient-100` + `orient-950` | Texto de apoyo |
| `--primary` | `orient-500` | `orient-200` | Enlaces, énfasis |
| `--accent` | `orient-300` | `orient-300` | Pulso, punto, halos |
| `--line` | `rgba(0,84,113,.16)` | `rgba(93,201,255,.14)` | Divisores |
| `--line-strong` | `rgba(0,84,113,.34)` | `rgba(93,201,255,.32)` | Bordes de botón secundario |
| `--btn-bg` / `--btn-bg-hover` | `orient-500` / `orient-600` | `orient-300` / `orient-200` | Botón principal |
| `--btn-ink` | `#FFFFFF` | `orient-950` | Texto del botón principal |
| `--focus` | `orient-400` | `orient-200` | Anillo de foco |
| `--chip-bg` | `badge-light` | `orient-900` | Etiquetas |
| `--danger` / `--danger-bg` | `gold-deep` / dorado 16 % sobre blanco | `gold` / `rgba(248,205,70,.1)` | Error |
| `--gold-ink` | `gold-deep` | `gold` | Íconos y detalles dorados |
| `--trace` | `orient-300` | `orient-300` | Trazo del pulso |
| `--glow` | `orient-50` | `rgba(0,126,167,.38)` | Halo del logotipo |

### 2.3 Bandas

`.band` es una sección siempre oscura, también en modo claro (talleres y «Únete»). Usa los tokens oscuros y un degradado lineal a 165°: en modo claro de `orient-900` a `orient-800`; en modo oscuro, invertido (de `orient-800` a `orient-900`) y con un borde interno de 1 px arriba y abajo (`--line`) para distinguirla. Es el **único** degradado de fondo de sección permitido; los demás degradados son recursos del pulso (el halo del logotipo y las líneas del trazo) y los marcadores de flecha de «Áreas» y del lema de «Visión».

### 2.4 Contraste

Todo texto cumple WCAG 2.2 AA (4,5:1; 3:1 para texto grande y componentes). Combinaciones aprobadas: `--ink` sobre `--bg` y `--surface` en ambos modos; `--btn-ink` sobre `--btn-bg`. Antes de introducir una combinación nueva se mide y se registra.

## 3. Tipografía

| Rol | Familia | Pesos | Uso |
| :-- | :-- | :-- | :-- |
| Display | **Lexend** | Variable (100–900). En uso: 300, 400, 500, 600 y 700 | Títulos, hero, navegación, botones, estadísticas, marca |
| Lectura | **Figtree** | Variable (300–900). En uso: 400 y 600 | Párrafos, descripciones, texto secundario (RDA-004) |

Respaldo: `"Segoe UI", system-ui, -apple-system, sans-serif`. Las dos son **fuentes variables**: un solo archivo `.woff2` latino por familia, sin cursivas (el sitio no usa cursiva). Los archivos y su licencia (OFL 1.1) están en el repositorio (`src/assets/fonts/`) y se sirven desde el propio dominio con el proveedor local de la Fonts API de Astro y `font-display: swap`. No se cargan desde Google Fonts ni se descargan al compilar.

### 3.1 Escala

| Elemento | Tamaño | Interlineado | Espaciado | Peso |
| :-- | :-- | :-- | :-- | :-- |
| Wordmark del hero («Pulso Devs») | `min(13.6vw, 10rem)` | `.95` | `-.045em` | 600 |
| Antetítulo del hero («Comunidad») | `clamp(1rem, 1.6vw, 1.25rem)` | — | `.01em` | 400, color `--primary` |
| Título de sección (`.section-title`) | `clamp(2rem, 4.6vw, 3.5rem)` | `1.06` | `-.028em` | 600, máx. `18ch`, `text-wrap: balance` |
| Bajada de sección (`.section-lead`) | `clamp(1.0625rem, 1.4vw, 1.1875rem)` | 1.6 | — | 400, color `--ink-2`, máx. `58ch` |
| Cuerpo | `1.0625rem` (17 px) | `1.6` | — | 400 |
| Botón | `1rem` (`.9375rem` en `--sm`) | `1.1` | — | 500 |

## 4. Espacio, forma y profundidad

| Token | Valor | Uso |
| :-- | :-- | :-- |
| `--container` | `75rem` (1200 px) | Ancho máximo del contenido |
| `--gutter` | `clamp(1.25rem, 4vw, 3rem)` | Margen lateral (respeta `safe-area`) |
| `--section-y` | `clamp(4.5rem, 10vw, 8rem)` | Relleno vertical de sección |
| `--header-h` | `4.5rem` | Alto del header: `4.5rem` de contenido más 1 px de borde inferior |
| `--radius-panel` | `20px` | Paneles y tarjetas |
| Píldora | `999px` | Botones, chips, enlace de salto |
| Círculo | `50%` | Avatares, punto de pulso |
| Radio del panel de «Únete» | `24px` | Panel de «Únete» (`.join__panel`) |
| Radio de la marca de la tarjeta | `18px` | Marca de la tarjeta de «Únete» (`.joincard__mark`) |
| Líneas del pulso | `2px` | Extremos de las líneas del trazo del pulso |

**Profundidad:** sin sombras de elevación en tarjetas. La profundidad se logra con bloques de color (`--surface`, `.band`) y líneas de 1 px. Los halos (`box-shadow` de 4–5 px con `--accent` al 22–26 %) se reservan para hover de botón.

**Curva de movimiento:** `--ease-out: cubic-bezier(.22, .8, .24, 1)`.

## 5. Puntos de quiebre

Mobile-first, en `em`:

| Ancho | Equivalente | Cambio principal |
| :-- | :-- | :-- |
| base | < 480 px | Una columna; menú móvil |
| `26em` | 416 px | Hasta este ancho (`max-width`), los botones del hero ocupan el ancho completo |
| `30em` | 480 px | Datos clave de talleres en 2 columnas |
| `35em` | 560 px | Ajustes del header |
| `48em` | 768 px | Visión y bloques en dos columnas |
| `56.25em` / `60em` | 900 / 960 px | Grillas de contenido completas |
| `64em` | 1024 px | El pulso del hero sube a la línea base del wordmark |
| `68.75em` | 1100 px | Navegación centrada visible; desaparece el menú móvil |

Sin anchos rígidos que generen desplazamiento horizontal desde 320 px (`overflow-x: clip` en `body` como red de seguridad, no como solución).

## 6. Componentes

| Componente | Descripción y reglas |
| :-- | :-- |
| **Header** | `sticky`, fondo `--bg`, borde inferior `--line` solo al desplazarse (`data-scrolled`). Composición en tres zonas: **izquierda** logotipo + «Pulso Devs»; **centro** navegación de tres enlaces: Comunidad, Talleres y Visión (desde 1100 px); **derecha** control de tema, botón «Únete» y botón de menú (bajo 1100 px). El menú móvil es un panel con animación `menu-in` de .25 s, atrapa el foco, se cierra con Esc y bloquea el desplazamiento (`body.is-locked`). |
| **Control de tema** | Interruptor (`role="switch"`, `aria-checked`) con pista, íconos `light_mode` / `dark_mode` y perilla. Alterna `data-theme` en `<html>`, actualiza `theme-color` y persiste en `localStorage` (`pulsodevs-theme`); sin preferencia guardada sigue al sistema. Al pulsarlo, el tema nuevo se revela como un círculo que crece desde el interruptor (View Transitions API nativa, 1 s, ver §8). Sin la API, con `prefers-reduced-motion: reduce` o por un cambio de la preferencia del sistema, el cambio es inmediato. Mientras dura el efecto la página no recibe clics del mouse (limitación de la API); con teclado se puede volver a activar el interruptor. El dibujo mide 56 × 32 px con borde de 1 px y se define con un solo juego de medidas: la perilla (24 px) deja el mismo margen (3 px) en los cuatro lados y cada ícono queda centrado sobre el punto donde se detiene la perilla. El botón suma relleno transparente hasta 44 px de alto (área táctil) sin cambiar el dibujo, y el anillo de foco rodea el dibujo, no el área invisible. |
| **Hero** | `h1` compuesto por antetítulo «Comunidad» con punto que late + wordmark «Pulso Devs». Debajo, el trazo de pulso que se dibuja (`trace-wipe`, 1,5 s) y termina en el logotipo, que aparece (`logo-in`) y emite un anillo (`ring`). Mensaje para desarrolladores junior de Latinoamérica, botón principal para unirse, botón secundario `--ghost` «Conoce Pulso Devs» (lleva a la sección Comunidad) y, al lado, la tarjeta de invitación «Latinoamérica está invitada» (`.invite`, fondo `--chip-bg`, radio de 20 px). |
| **Botón** (`.btn`) | Píldora, alto mínimo 50 px (40 px en `--sm`, solo en contextos no táctiles principales), Lexend 500. Variantes: `--primary` (relleno + halo en hover), `--ghost` (borde `--line-strong`, en hover borde y texto `--primary`), `--block` (ancho completo). Desplazamiento de 1 px al presionar. Deshabilitado: opacidad .55. |
| **Enlace con flecha** (`.link-arrow`) | Lexend 500, color `--primary`, subrayado de 1,5 px al hover; el ícono se desplaza 2 px en diagonal. Sin uso hoy; reservado para las redes de la comunidad (03-02). |
| **Sección** (`.section`) | Relleno `--section-y`; variante `--surface` y variante `.band` (oscura). `.band--dots` agrega un patrón de puntos de fondo y lo llevan las dos bandas: Talleres y «Únete». Cabecera con `.section-title` + `.section-lead`. |
| **Talleres** | Banda oscura con patrón de puntos (`.band--dots`). Datos clave (`.facts`: frecuencia, costo, instructores y «Más adelante») y lista de temáticas, cada una con su nombre a la izquierda y, a la derecha y centrado en vertical, un ícono Material Symbols Light elegido por el desarrollador (sin logotipos de tecnologías, ver §7). El ícono nunca baja a otra línea: si el nombre no cabe, se parte en dos. Sin fechas ni calendario: la nota dice que hubo un primer taller en octubre de 2026 y que las próximas fechas se anunciarán pronto. |
| **Áreas** (`.areas`) | Lista editorial «Lo que nos reúne»: Frontend, Backend, Fullstack e Inteligencia Artificial, con una línea de descripción cada una. |
| **Pilares** (`.pillar`, `.feature`) | «Lo que encontrarás»: tres pilares (construir, aprender, crecer) con ícono Material Symbols Light por ítem, sobre `--surface`. |
| **Visión** | Sección editorial «Esto recién comienza.», con una línea de tiempo de dos tramos, «Hoy» y «Lo que viene» (iniciativas futuras, sin fechas). El nodo de la línea de tiempo lleva un anillo de 5 px con el color de fondo (`box-shadow: 0 0 0 5px var(--bg)`) que recorta el punto del trazo; no es una sombra de elevación. |
| **Únete** | Banda oscura con patrón de puntos (`.band--dots`), tres pasos numerados (`.steps`) y una tarjeta (`.joincard`) con el logotipo oficial de WhatsApp (`tec-whatsapp-icon.svg`), un texto breve y el botón al grupo de WhatsApp. La tarjeta es clara en modo claro (tokens del modo claro dentro de la banda oscura) y oscura en modo oscuro (tokens del modo oscuro). Es la única entrada a la comunidad: no hay formulario. |
| **Footer** | Logotipo, «Pulso Devs», descripción breve, **crédito del fundador** (`.founder-chip`: «Fundador: Felipe Cuevas», con enlace a felipecuevas.dev; es la única mención del fundador en el sitio), navegación, **LinkedIn de la comunidad** (con el logotipo oficial `tec-linkedin.svg`; otras redes, cuando existan), botón para unirse, copyright con año calculado e indicador «Hecha en comunidad, abierta a toda Latinoamérica». Sin sobrecarga. |
| **Enlace de salto** | «Saltar al contenido», píldora con colores del botón principal, aparece al recibir foco. |
| **Página 404** (`.pagina-404`) | Misma estructura que una sección: `.section` con `.contenedor`, `h1` con `.section-title`, `.section-lead`, botón principal «Volver al inicio» y botón `--ghost` con el ícono `arrow_outward` al grupo de WhatsApp (pestaña nueva), más una nota de apoyo en `--muted` (0,875 rem). Sin elementos decorativos. El contenido se alinea a la izquierda dentro del contenedor y, si es corto, el pie queda al final de la ventana (`body:has(> .pagina-404)` es una columna flex de alto mínimo `100dvh`). Bajo 26 em los botones ocupan el ancho completo y el de WhatsApp reduce su relleno lateral a 1,25 rem para que su texto quede en una línea desde 360 px; a 320 px puede partirse en dos. La página lleva `noindex`. |

## 7. Iconografía y logotipos

- **Íconos de interfaz:** solo **Material Symbols Light** (peso 300, licencia Apache-2.0), como SVG en línea con `fill: currentColor`, tamaño base 24 px (20 px en botones, 18 px en enlaces y entre 16 y 32 px en usos puntuales: interruptor de tema, nota de talleres, chip del fundador, pilares, LinkedIn y tarjeta de invitación) y `aria-hidden="true"`. El trazo es algo más fino que el del sprite original, del que parte se exportó con peso 400: diferencia aceptada por el desarrollador. Los nombres de uso viven en `src/data/iconos.js` (nombre de uso → nombre en el set `@iconify-json/material-symbols-light`): `light_mode` → `light-mode-outline`, `dark_mode` → `dark-mode-outline`, `menu`, `close`, `public`, `language`, `groups` → `groups-outline`, `person` → `person-outline`, `school` → `school-outline`, `work` → `work-outline`, `badge` → `badge-outline`, `campaign` → `campaign-outline`, `calendar_month` → `calendar-month-outline`, `schedule` → `schedule-outline`, `volunteer_activism` → `volunteer-activism-outline`, `workspace_premium` → `workspace-premium-outline`, `cast_for_education` → `cast-for-education-outline`, `library_books` → `library-books-outline`, `deployed_code` → `deployed-code-outline`, `diversity_3`, `arrow_outward`; y los de las temáticas de talleres: `web`, `code_blocks` → `code-blocks`, `wand_stars` → `wand-stars`, `cloud_sync` → `cloud-sync`, `rocket_launch` → `rocket-launch` y `robot_2` → `robot-2`. En ese set el nombre sin sufijo es la variante rellena, por eso se usa `-outline` donde corresponde.
- **Logotipos de tecnologías:** SVG oficiales entregados por el desarrollador (colección SVG Logos, de Gil Barbara): 29 archivos en `src/icons/` con el prefijo `tec-` (por ejemplo `tec-aws.svg`), copiados sin modificar. **No se usan en las temáticas de talleres**: esas llevan íconos Material Symbols Light (decisión del desarrollador, 2026-10-10). Hoy solo se usan dos: `tec-linkedin.svg` (pie de página) y `tec-whatsapp-icon.svg` (tarjeta de «Únete»); los demás quedan disponibles. Se muestran **con sus colores originales**. Si falta uno, se pide; no se inventa ni se reemplaza por un ícono genérico.
- **Logotipo de Pulso Devs:** `pulsodevs.png` (480 px, fondo transparente) y `pulsodevs-small.png` (128 px: header y footer). De `pulsodevs.png` derivan la imagen de vista previa al compartir (`pulsodevs-vista-previa.png`, 1200 × 630 px, sobre `orient-950` con el nombre en Lexend) y los íconos de `public/` (`favicon.ico`, `icono-32.png`, `icono-192.png` y `apple-touch-icon.png`, este último sobre blanco). `pulsodevs-original.png` queda sin uso. No se redibuja, recorta, recolorea ni deforma.
- **Sin emojis** como íconos de interfaz.

## 8. Movimiento

| Animación | Duración | Dónde |
| :-- | :-- | :-- |
| `beat` (punto que late) | 2,4 s, en bucle | Antetítulo del hero |
| `trace-wipe` (pulso que se dibuja) | 1,5 s, una vez | Hero |
| `logo-in` + `ring` | .7 s + 1,6 s, una vez | Logotipo del hero |
| `menu-in` | .25 s | Menú móvil |
| `welcome-in` | .5 s, una vez | Tarjeta de «Únete», al cargar la página |
| `ring-again` | 1,4 s, una vez por pasada | Anillo del logotipo del hero al pasar el cursor |
| Transiciones de color | .2–.35 s | Cambio de tema, hover |
| Presión del botón | .12 s | `transform` al presionar (`.btn:active`) |
| `theme-reveal` (círculo que crece desde el interruptor, **excepción RDA-016**) | **1 s**, una vez por clic | Cambio de tema por el interruptor: `clip-path` circular desde el centro del interruptor hasta la esquina más lejana, con `--ease-out`. |

Con `prefers-reduced-motion: reduce` todas las animaciones y transiciones se reducen a .001 ms, se desactiva el desplazamiento suave y se ocultan los anillos y el latido.

**Excepción aprobada (RDA-016):** la transición de cambio de tema dura **1 s**, más que las transiciones de color de esta tabla. Es la única excepción: cualquier otra animación sigue las duraciones de arriba. Usa la View Transitions API nativa; sin soporte o con `prefers-reduced-motion: reduce` el cambio es inmediato. Mientras dura el efecto, las transiciones de color se desactivan (`.is-theme-switching`) para que el tema nuevo no se vea a medio cambiar.

## 9. Accesibilidad visual

- Foco visible: contorno de 3 px `--focus`, separación de 3 px, en todos los elementos interactivos.
- Objetivos táctiles de al menos 44 × 44 px.
- `scroll-padding-top` igual al alto del header + 1 rem, para que el foco y las anclas no queden bajo el header fijo.
- Selección de texto: fondo `orient-200`, texto `orient-950`.
- El tema se aplica en `<head>` antes de pintar, para evitar el destello del modo equivocado.

## 10. Traslado a Tailwind CSS 4

La paleta y las escalas de este documento se declaran en `src/styles/global.css` dentro de `@theme` (por ejemplo `--color-orient-500`, `--font-display`, `--radius-panel`), y los tokens semánticos de la §2.2 como variables CSS que cambian según `[data-theme]`. Tailwind se configura con una variante `dark` basada en `[data-theme="dark"]` (`@custom-variant`), no en la preferencia del sistema. El diseño original mezclaba algunas clases de Tailwind sin cargarlo (tarjeta de bienvenida y enlace del fundador, con `gray-*`, `slate-*`, `green-*` y `blue-*` fuera de la paleta): no tenían efecto porque Tailwind no se cargaba, y se reemplazaron por tokens de este documento (AUD-01-009).