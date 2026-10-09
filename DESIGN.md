# DESIGN.md · Comunidad Pulso Devs

Sistema de diseño del sitio. Describe lo que **existe hoy** en el prototipo (`assets/css/styles.css`, 1.343 líneas) y cómo se traslada a Tailwind CSS 4 con `@theme` en la migración a Astro. Es la referencia obligatoria para cualquier cambio de interfaz.

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

Semánticos de marca: `primary` = `orient-500`, `primary-vibrant` = `orient-300`, fondo claro `#FFFFFF`, fondo oscuro `orient-950`.

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
| `--field-bg` | `#FFFFFF` | `orient-900` | Campos |
| `--field-border` | `rgba(0,84,113,.38)` | `rgba(93,201,255,.34)` | Borde de campos |
| `--focus` | `orient-400` | `orient-200` | Anillo de foco |
| `--chip-bg` | `badge-light` | `orient-900` | Etiquetas |
| `--danger` / `--danger-bg` | `gold-deep` / dorado 16 % sobre blanco | `gold` / `rgba(248,205,70,.1)` | Error |

### 2.3 Bandas

`.band` es una sección siempre oscura, también en modo claro (talleres y «Únete»). Usa los tokens oscuros y un degradado lineal a 165° entre `orient-900` y `orient-800`. Es el **único** degradado de fondo permitido. En modo oscuro se distingue con un borde interno de 1 px arriba y abajo (`--line`).

### 2.4 Contraste

Todo texto cumple WCAG 2.2 AA (4,5:1; 3:1 para texto grande y componentes). Combinaciones aprobadas: `--ink` sobre `--bg` y `--surface` en ambos modos; `--btn-ink` sobre `--btn-bg`. Antes de introducir una combinación nueva se mide y se registra.

## 3. Tipografía

| Rol | Familia | Pesos | Uso |
| :-- | :-- | :-- | :-- |
| Display | **Lexend** | 300, 400, 500, 600, 700 | Títulos, hero, navegación, botones, estadísticas, marca |
| Lectura | **IBM Plex Sans** | 400, 500, 600, 400 itálica | Párrafos, descripciones, formularios, texto secundario |

Respaldo: `"Segoe UI", system-ui, -apple-system, sans-serif`. En el prototipo se cargan desde Google Fonts; tras la migración se **autoalojan** (Fonts API de Astro) con `font-display: swap`.

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
| `--header-h` | `4.5rem` | Alto del header |
| `--radius-field` | `10px` | Campos |
| `--radius-panel` | `20px` | Paneles y tarjetas |
| Píldora | `999px` | Botones, chips, enlace de salto |
| Círculo | `50%` | Avatares, punto de pulso |

**Profundidad:** sin sombras de elevación en tarjetas. La profundidad se logra con bloques de color (`--surface`, `.band`) y líneas de 1 px. Los halos (`box-shadow` de 4–5 px con `--accent` al 22–26 %) se reservan para hover de botón y foco de campos.

**Curva de movimiento:** `--ease-out: cubic-bezier(.22, .8, .24, 1)`.

## 5. Puntos de quiebre

Mobile-first, en `em`:

| Ancho | Equivalente | Cambio principal |
| :-- | :-- | :-- |
| base | < 480 px | Una columna; menú móvil |
| `30em` | 480 px | Grillas de 2 columnas en talleres y formulario |
| `35em` | 560 px | Ajustes del header |
| `48em` | 768 px | Visión y bloques en dos columnas |
| `56.25em` / `60em` | 900 / 960 px | Grillas de contenido completas |
| `64em` | 1024 px | El pulso del hero sube a la línea base del wordmark |
| `68.75em` | 1100 px | Navegación centrada visible; desaparece el menú móvil |

Sin anchos rígidos que generen desplazamiento horizontal desde 320 px (`overflow-x: clip` en `body` como red de seguridad, no como solución).

## 6. Componentes

| Componente | Descripción y reglas |
| :-- | :-- |
| **Header** | `sticky`, fondo `--bg`, borde inferior `--line` solo al desplazarse (`data-scrolled`). Composición en tres zonas: **izquierda** control de tema; **centro** navegación; **derecha** acciones (unirse). Logotipo + «Pulso Devs» como marca. Bajo 1100 px, botón de menú (`menu`) que abre un panel con animación `menu-in` de .25 s y bloquea el desplazamiento (`body.is-locked`). |
| **Control de tema** | Botón con ícono `light_mode` / `dark_mode`, `aria-label` descriptivo, alterna `data-theme` en `<html>` y persiste en `localStorage` (`pulsodevs-theme`). |
| **Hero** | `h1` compuesto por antetítulo «Comunidad» con punto que late + wordmark «Pulso Devs». Debajo, el trazo de pulso que se dibuja (`trace-wipe`, 1,5 s) y termina en el logotipo, que aparece (`logo-in`) y emite un anillo (`ring`). Mensaje para desarrolladores junior de Latinoamérica y botón principal para unirse. |
| **Botón** (`.btn`) | Píldora, alto mínimo 50 px (40 px en `--sm`, solo en contextos no táctiles principales), Lexend 500. Variantes: `--primary` (relleno + halo en hover), `--ghost` (borde `--line-strong`, en hover borde y texto `--primary`), `--block` (ancho completo). Desplazamiento de 1 px al presionar. Deshabilitado: opacidad .55. |
| **Enlace con flecha** (`.link-arrow`) | Lexend 500, color `--primary`, subrayado de 1,5 px al hover; el ícono se desplaza 2 px en diagonal. |
| **Sección** (`.section`) | Relleno `--section-y`; variante `--surface` y variante `.band` (oscura). Cabecera con `.section-title` + `.section-lead`. |
| **Talleres** | Banda oscura. Lista de temáticas con su logotipo oficial; sin fechas ni calendario mientras no existan. |
| **Visión** | Sección editorial «Esto recién comienza.», con línea de tiempo de iniciativas marcadas como «próximamente». |
| **Fundador** | Panel `--radius-panel`; foto oficial o, si falta, monograma. Enlaces a LinkedIn y sitio personal. Solo datos respaldados por el perfil PDF. |
| **Únete** | Banda oscura con pasos numerados (`.steps`) y panel de bienvenida con botón al grupo de WhatsApp. El anillo de pulso (`welcome__pulse`) se oculta con movimiento reducido. |
| **Formulario** (cuando se reincorpore) | `label` visible por campo, borde `--field-border`, radio `--radius-field`, halo de foco `--accent` 26 %, error en `--danger` con fondo `--danger-bg` y halo dorado. Estados en `data-state`: inicial, `submitting` (spinner), éxito y error. |
| **Footer** | Logotipo, «Pulso Devs», descripción breve, navegación, redes (cuando existan), botón para unirse, copyright e indicador «Comunidad latinoamericana». Sin sobrecarga. |
| **Enlace de salto** | «Saltar al contenido», píldora con colores del botón principal, aparece al recibir foco. |

## 7. Iconografía y logotipos

- **Íconos de interfaz:** solo **Material Symbols Light** (peso 300, licencia Apache-2.0), como SVG en línea con `fill: currentColor`, tamaño base 24 px (20 px en botones, 18 px en enlaces) y `aria-hidden="true"`. Íconos en uso: `light_mode`, `dark_mode`, `menu`, `close`, `person`, `diversity_3`, `deployed_code`, `progress_activity`, `error`, entre otros.
- **Logotipos de tecnologías:** SVG oficiales entregados en `logos.txt` (colección SVG Logos, de Gil Barbara): Python, Java, JavaScript, Node.js, Spring, Express, AWS, Claude y otros. Se usan **con sus colores originales**, sin modificar. Si falta uno, se pide; no se inventa ni se reemplaza por un ícono genérico.
- **Logotipo de Pulso Devs:** `pulsodevs.png` (480 px, fondo transparente), `pulsodevs-small.png` (128 px: header, footer y favicon) y `pulsodevs-original.png` (vista previa al compartir). No se redibuja, recorta, recolorea ni deforma.
- **Sin emojis** como íconos de interfaz.

## 8. Movimiento

| Animación | Duración | Dónde |
| :-- | :-- | :-- |
| `beat` (punto que late) | 2,4 s, en bucle | Antetítulo del hero |
| `trace-wipe` (pulso que se dibuja) | 1,5 s, una vez | Hero |
| `logo-in` + `ring` | .7 s + 1,6 s, una vez | Logotipo del hero |
| `menu-in` | .25 s | Menú móvil |
| `spin` | .9 s, en bucle | Estado «enviando» |
| Transiciones de color | .2–.35 s | Cambio de tema, hover |

Con `prefers-reduced-motion: reduce` todas las animaciones y transiciones se reducen a .001 ms, se desactiva el desplazamiento suave y se ocultan los anillos y el latido.

## 9. Accesibilidad visual

- Foco visible: contorno de 3 px `--focus`, separación de 3 px, en todos los elementos interactivos.
- Objetivos táctiles de al menos 44 × 44 px.
- `scroll-padding-top` igual al alto del header + 1 rem, para que el foco y las anclas no queden bajo el header fijo.
- Selección de texto: fondo `orient-200`, texto `orient-950`.
- El tema se aplica en `<head>` antes de pintar, para evitar el destello del modo equivocado.

## 10. Traslado a Tailwind CSS 4

En la migración, la paleta y las escalas de este documento se declaran en `src/styles/global.css` dentro de `@theme` (por ejemplo `--color-orient-500`, `--font-display`, `--radius-panel`), y los tokens semánticos de la §2.2 como variables CSS que cambian según `[data-theme]`. Tailwind se configura con una variante `dark` basada en `[data-theme="dark"]` (`@custom-variant`), no en la preferencia del sistema. El prototipo actual mezcla algunas clases de Tailwind sin cargarlo (tarjeta de bienvenida, con grises `gray-*` y `slate-*` fuera de la paleta): esas clases se reemplazan por tokens de este documento.