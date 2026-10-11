# Épica 02 · Sistema de diseño y ajustes estéticos

- **Estado:** Terminada (2026-10-11)
- **Hito del desarrollador:** 3 (modificar algunos detalles estéticos y visuales)
- **Objetivo:** evolucionar la identidad visual ya migrada: una fuente de lectura elegante y minimalista, y los ajustes estéticos que pida el desarrollador, manteniendo `DESIGN.md` como fuente de verdad.

## Alcance

1. Incorporar Figtree como fuente de lectura definitiva, en reemplazo de IBM Plex Sans (RDA-004).
2. Aplicar los ajustes estéticos y visuales definidos por el desarrollador.
3. ~~Resolver el uso de logotipos oficiales o íconos en las temáticas de talleres (AUD-01-003)~~: resuelto por decisión del desarrollador (2026-10-10): las temáticas usan los íconos Material Symbols Light que él eligió, sin logotipos.
4. Transición de cambio de tema con un círculo que crece desde el interruptor, de 1 s (RDA-016, iteración 02-03).
5. Mantener `DESIGN.md` alineado con lo implementado, con aprobación del desarrollador.
6. Quitar la sombra de elevación de la tarjeta de «Únete», que contradecía `DESIGN.md` §4 (iteración 02-05, agregada el 2026-10-11 a partir de la auditoría de `DESIGN.md`).

## Iteraciones y orden de ejecución

El orden de ejecución lo decidió el desarrollador el 2026-10-10: primero la fuente (cambia las medidas de todo el sitio), luego la transición de tema y al final los ajustes estéticos. El número de cada iteración no cambia.

| Orden | Iteración | Nombre                       | Depende de                          |
| :---- | :-------- | :--------------------------- | :---------------------------------- |
| 1     | 02-01     | Fuente de lectura definitiva | 01-06                               |
| 2     | 02-03     | Transición de cambio de tema | 01-06 (recomendado: después de 02-01) |
| 3     | 02-02     | Ajustes estéticos y visuales | 02-01, 02-03 y la lista de ajustes  |
| 4     | 02-05     | Quitar la sombra de la tarjeta de «Únete» | 02-02 y la auditoría de `DESIGN.md` (D2) |

## Fuera de alcance

- Cambios de texto (Épica 03) y páginas nuevas (Épica 06, en evaluación).
- Cualquier rediseño que contradiga el principio de `DESIGN.md` §1 o reemplace el logotipo.

## Criterio de término

- La fuente de lectura definitiva está autoalojada y `DESIGN.md` §3 la describe.
- Cada ajuste estético aprobado está implementado y medido en 360 px y escritorio, en modo claro y oscuro, con contraste AA.
- El cambio de tema se anima como indica la iteración 02-03, con su excepción de 1 s registrada en `DESIGN.md` §8.
- `DESIGN.md` coincide con el sitio compilado (tokens, escalas, componentes, íconos y movimiento), medido o leído en el código según indica la auditoría 02-04, salvo las diferencias registradas y asignadas: D1 (objetivos táctiles, AUD-02-010, iteración 04-03) y los datos clave de Talleres (tres frente a cuatro, iteración 03-01). _Criterio reformulado por decisión del desarrollador (2026-10-11); el texto original era «`DESIGN.md` coincide con el sitio»._
