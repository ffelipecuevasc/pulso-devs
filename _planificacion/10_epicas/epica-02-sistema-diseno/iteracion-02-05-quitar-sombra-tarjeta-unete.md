# Iteración 02-05 · Quitar la sombra de la tarjeta de «Únete»

- **Épica:** 02 · Sistema de diseño y ajustes estéticos
- **Orden de ejecución:** 4.º de la épica (agregada por el desarrollador el 2026-10-11, tras la auditoría de `DESIGN.md`)
- **Estado:** En revisión (implementada y medida el 2026-10-11; pendiente el commit del desarrollador)
- **Rama:** `main` (RDA-015)
- **Depende de:** 02-02 y la auditoría de `DESIGN.md` (bitácora 02-04, diferencia D2)
- **RDA relacionadas:** —
- **Hallazgos que cierra:** D2 de la auditoría 02-04 (contradicción entre `DESIGN.md` §4 y el CSS)
- **Hallazgos que abre:** —

## Objetivo

Eliminar la sombra de elevación de la tarjeta de «Únete», que contradice `DESIGN.md` §4 («sin sombras de elevación en tarjetas»). Decisión del desarrollador, 2026-10-11. El resto del sitio no cambia.

## Tareas

1. Buscar la sombra con una búsqueda anclada (`box-shadow` en `src/`) y comprobar que la regla no se comparte con otros elementos ni con los halos de hover de los botones (`DESIGN.md` §4 los permite). Si se comparte, detenerse y preguntar.
2. Eliminar la declaración `box-shadow` de la tarjeta, nada más.
3. Medir antes y después, en claro y oscuro, a 360 y 1280 px, sobre `pnpm build`.

**Nombre real del elemento.** El encargo habla de `.joincard`; la sombra estaba en `.join__panel` (el contenedor de la tarjeta, `src/styles/global.css`), y `.joincard` (el contenido de adentro) no tiene sombra propia. No es una regla compartida: se eliminó la del contenedor.

## Criterios de aceptación

- [x] a) El `box-shadow` calculado de la tarjeta es `none`. _Valor anterior: `rgba(0, 19, 29, 0.75) 0px 28px 60px -28px`; ahora `none` en los 4 casos (360 y 1280 px, claro y oscuro)._
- [x] b) El ancho, el alto y la posición de la tarjeta no cambian. _Idénticos antes y después: 320 × 542,91 px en x = 20, y = 6.508,75 (360 px); 598,38 × 513,36 px en x = 618,63, y = 4.255,31 (1280 px); la tarjeta interior (`.joincard`) también._
- [x] c) El alto de la página no cambia y no hay desbordes horizontales. _7.986 px (360) y 5.291 px (1280), iguales; `scrollWidth` = `clientWidth` (360/360 y 1265/1265)._
- [x] d) Ningún otro elemento cambia su `box-shadow` calculado. _Lista de elementos con sombra idéntica antes y después, salvo la tarjeta: el anillo del nodo de la línea de tiempo en ambos modos y, en oscuro, el borde interno de las dos bandas; hover del botón principal del hero, del botón de la tarjeta, del botón del pie y del «Únete» del header: sin cambios (`0 0 0 5px`, `--accent` al 22 %)._
- [x] e) Los contrastes de texto de la tarjeta no cambian. _5 textos, idénticos: mínimo 4,62:1 en claro y 7,54:1 en oscuro._
- [x] f) Capturas de la tarjeta revisadas en ambos modos y tamaños (360 y 1280 px; antes y después).

## Fuera de alcance

- Cualquier otro cambio visual de la tarjeta o de la sección.
- Cambiar los halos de hover de los botones.

## Datos requeridos del desarrollador

- Ninguno.
