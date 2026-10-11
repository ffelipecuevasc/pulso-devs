# Iteración 02-02 · Ajustes estéticos y visuales

- **Épica:** 02 · Sistema de diseño y ajustes estéticos
- **Orden de ejecución:** 3.º de la épica (decisión del desarrollador, 2026-10-10)
- **Estado:** En revisión (implementada y medida el 2026-10-11; pendiente el commit del desarrollador)
- **Rama:** `main` (RDA-015)
- **Depende de:** 02-01, 02-03 y la lista de ajustes
- **RDA relacionadas:** —
- **Hallazgos que cierra:** —

## Objetivo

Aplicar los detalles estéticos y visuales que el desarrollador quiere cambiar, sin salirse del sistema de diseño.

## Tareas

1. ~~Antes de empezar, el desarrollador entrega la lista de ajustes (incluidas sus observaciones de diseño móvil); el agente la copia a esta iteración, numerada y con criterios medibles.~~ Hecho el 2026-10-11: la lista está más abajo («Lista de ajustes»), con dos ajustes, y espera el OK del desarrollador antes de implementar.
2. ~~Logotipos en las temáticas de talleres~~: descartado por el desarrollador el 2026-10-10 (AUD-01-003). Si un ajuste usa un logotipo de tecnología, se toma de `src/icons/tec-*.svg` con sus colores originales; si falta uno, se pide.
3. Implementar cada ajuste con los tokens de `DESIGN.md`; si un ajuste exige un token nuevo, proponer su valor y esperar aprobación.
4. Actualizar `DESIGN.md` con lo que cambie (requiere aprobación).

## Lista de ajustes

Entregada por el desarrollador el 2026-10-11. **Está completa: son solo estos dos ajustes.** El desarrollador no tiene más observaciones de diseño móvil y no se le piden. Los criterios se miden con Chrome por protocolo, sobre `pnpm build` y `pnpm preview`, en claro y oscuro.

### Ajuste 1 · Temáticas de talleres en móvil (decidido: quitar el wrap)

- **Qué pasa hoy:** en las temáticas de nombre largo («Ingeniería de Datos + Tecnología Cloud», «Desarrollo Web + Tecnología Cloud») el ícono baja a una segunda línea porque `.topic` tiene `flex-wrap: wrap`.
- **Cambio:** en `src/styles/global.css`, sección Talleres: `.topic` con `flex-wrap: nowrap`; `.topic__name` con `flex: 1 1 auto` y `min-width: 0` (el nombre puede partirse en dos líneas); `.topic__tech` con `flex: none`. Íconos centrados en vertical. Mismo tamaño de letra. Antes de editar, buscar colisiones de nombres de clase y reglas que se pisen con estas.
- **Criterios:**
  - [x] a) A 320, 360 y 1280 px, en las 6 temáticas, el borde derecho del ícono tiene la misma coordenada x (tolerancia 1 px). _Medido: x = 300, 340 y 1217; diferencia 0 px, claro y oscuro._
  - [x] b) El ícono queda centrado en vertical respecto de su fila (tolerancia 1 px) y nunca debajo del nombre. _Medido: desfase 0,00 px en las 6 filas y las 6 combinaciones._
  - [x] c) Sin desplazamiento horizontal (`scrollWidth` ≤ `clientWidth`), también con el hover del nombre (`translateX` de 4 px). _Medido con el hover de cada una de las 6 filas: 320/320, 360/360 y 1265/1265._
  - [x] d) A 1280 px el alto de cada fila no cambia respecto de antes (se mide antes y después). _Antes y después: 65,78 ×5 y 66,78 px (la última), claro y oscuro._
  - [x] e) Los nombres no se cortan ni se superponen con el ícono a 320 px. _Medido: sin cortes; con hover, el nombre termina en 256 px y el ícono empieza en 276 px._

### Ajuste 2 · Botón de WhatsApp de la 404 a 360 px (decidido: se corrige)

- **Qué pasa hoy:** bajo 26 em, `.pagina-404__acciones .btn` tiene `width: 100%` y `white-space: normal`, y el texto del botón se parte en dos líneas a 360 px.
- **Cambio:** la corrección mínima para que el texto quede en una sola línea a 360 px. Primero se mide el ancho disponible y el que ocupa el contenido (texto, ícono, hueco y relleno), y se propone al desarrollador la causa y la corrección más pequeña antes de escribirla. Si exige un token nuevo o cambiar un valor de `DESIGN.md`, se muestra el valor y se espera su OK.
- **Criterios:**
  - [x] a) A 360 px el texto del botón de WhatsApp está en una sola línea (misma altura de línea medida en el texto) y el ícono no se separa del texto. _Medido: 1 línea, alto de texto 20 px (antes 37,6 px), hueco 8,8 px; también con pantalla 2× y 3×._
  - [x] b) A 320 px no hay desbordes ni el contenido se sale del botón; se acepta que el texto se parta en dos líneas solo ahí, si no cabe. _Medido: 320/320, contenido dentro del botón; ahí el texto se parte en dos líneas (aceptado)._
  - [x] c) El botón conserva el alto mínimo táctil de 44 px y el foco visible de 3 px. _Medido: alto 50 px; con Tab, contorno de 3 px en ambos botones._
  - [x] d) El botón «Volver al inicio» no cambia de aspecto. _Medido: mismo relleno, alto y ancho que antes._
  - [x] e) Sin desbordes horizontales a 320, 360 y 1280 px. _Medido en la 404: 320/320, 360/360 y 1265/1265._

### `DESIGN.md`

- §6, fila «Talleres» (posición del ícono) y fila «Página 404» (botones): el agente propone el texto exacto de cada cambio y espera el OK del desarrollador antes de escribirlo; si ninguno hace falta, lo dice.
- **No se incluye** la frase de los datos clave de Talleres (tres frente a cuatro): ya está propuesta para 03-01 (`registro-log.md` §4).

## Criterios de aceptación

- [x] Cada ajuste de la lista (1 y 2) está implementado y cada uno de sus criterios, marcado con su medición.
- [x] Contraste AA medido en las combinaciones nuevas, en ambos modos. _No hay combinaciones nuevas (no cambió ningún color); se midió lo que los ajustes tocan: textos de 10,64:1 a 18,9:1 y 4,62:1 (claro) y 7,54:1 (oscuro) en «Volver al inicio». El borde del botón de WhatsApp (1,82:1 y 2,08:1) es un token existente y queda para 04-03._
- [x] Sin desbordes a 320 px y movimiento reducido respetado. _Medido: 320/320 en ambos ajustes; con movimiento reducido la transición del nombre pasa de 0,2 s y 0,3 s a 1e-06 s. No se agregó movimiento._
- [x] `DESIGN.md` coincide con lo implementado. _Las dos frases aprobadas de §6 («Talleres» y «Página 404»), sin cambios de valor. No incluye la frase de los datos clave de Talleres (tres frente a cuatro), propuesta para 03-01._
- [x] Bitácora 02-02 creada ([bitacora-02-02-2026-10-11](../../99_bitacora/bitacora-02-02-2026-10-11.md)).

## Fuera de alcance

- Páginas nuevas y cambios de contenido.

## Datos requeridos del desarrollador

- Ninguno: la lista de ajustes quedó entregada (dos ajustes) y el desarrollador no tiene más observaciones de diseño móvil.
