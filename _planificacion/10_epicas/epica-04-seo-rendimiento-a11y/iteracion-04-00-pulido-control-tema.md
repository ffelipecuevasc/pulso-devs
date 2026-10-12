# Iteración 04-00 · Pulido del interruptor de tema

- **Épica:** 04 · SEO, rendimiento y accesibilidad
- **Estado:** Terminada (2026-10-12)
- **Rama:** `main` (RDA-015)
- **Depende de:** Épica 03 terminada
- **RDA relacionadas:** RDA-016 (la transición de 1 s no cambia)
- **Hallazgos que cierra:** AUD-02-010 (parte: solo el interruptor de tema)

## Objetivo

Que el interruptor de tema se vea centrado al píxel en escritorio y tenga un área táctil de al menos 44 × 44 px, sin cambiar su forma de píldora ni su aspecto.

## Contexto (diagnóstico del 2026-10-11, corregido con las cifras medidas)

El desarrollador observó en su computador (1 píxel físico por píxel CSS) que la perilla y los íconos no están alineados; en su teléfono (Galaxy A52+, unos 2,6 píxeles físicos por píxel CSS) el defecto casi no se nota. Causa en `src/styles/global.css` (`.theme-toggle__*`), con las cifras **medidas** al empezar la iteración (el diagnóstico original, leído en el código, está en la bitácora 04-00):

- La pista mide 56 × 32 px con un borde que la hoja declara de 1,5 px y que Chrome calcula en **1 px**: el interior queda en 54 × 30 px.
- La perilla (24 px) está a `top: 2px` y `left: 2px`: queda a 2 px arriba y **4 px** abajo y, en modo oscuro (`translateX(1.5rem)`), a **4 px** de la derecha frente a 2 px de la izquierda.
- Los íconos se ubican con `padding: 0 .3rem` y `justify-content: space-between`, no según la perilla: el centro del sol queda **1,2 px** corrido a la izquierda y el de la luna **3,2 px** corrido a la derecha, y ambos **1 px** más abajo que el centro de la perilla.
- El interruptor mide 56 × 32 px, bajo los 44 × 44 px de `DESIGN.md` §9 (AUD-02-010).

Estas cifras se midieron al empezar (tarea 1) y reemplazan a las del diagnóstico original, que salían del código.

## Decisiones del desarrollador (2026-10-11)

1. **Se mantiene la píldora** (pista y perilla redondas). No se pasa a un diseño cuadrado.
2. **Área táctil invisible:** el dibujo sigue de 56 × 32 px y el `<button>` gana relleno transparente hasta 44 px de alto como mínimo (el ancho ya es 56 px).
3. Se hace en una iteración propia, antes de 04-01. El resto de AUD-02-010 (marca, «Únete» `--sm` y enlaces del menú) sigue en 04-03.

## Tareas

1. **Medir el estado actual** (línea base) a 1×, 2× y 3× de densidad, claro y oscuro, a 360 y 1280 px: márgenes de la perilla en los cuatro lados en ambas posiciones, distancia entre el centro de cada ícono y el centro de la perilla en su posición, tamaño del `<button>` y alto del header.
2. **Corregir la geometría:** un solo tamaño interior del que dependen la perilla y los íconos; borde de grosor entero; la perilla con el mismo margen en los cuatro lados en ambas posiciones (centrada en vertical sin depender de un `top` fijo); el desplazamiento de la perilla igual al ancho interior menos su tamaño menos los dos márgenes; cada ícono centrado exactamente en la posición donde se detiene la perilla. Sin valores mágicos sueltos: tamaños en custom properties del componente.
3. **Área táctil:** relleno transparente en `.theme-toggle` para llegar a 44 px de alto como mínimo, sin cambiar el tamaño ni la posición visual de la pista. Si el alto del header cambia, se mide, se informa y se para a preguntar antes de compensarlo.
4. Conservar sin cambios: colores y tokens (el contraste del borde `--line-strong` es AUD-02-009, en 04-03), íconos, `role="switch"`, `aria-checked`, `aria-label`, foco visible, la transición de la perilla y el efecto de cambio de tema de 1 s (RDA-016, centro del círculo en el centro del interruptor).
5. **`DESIGN.md` §6 (fila «Control de tema»):** proponer con `AskUserQuestion` el texto exacto que agrega la regla de centrado y el área táctil de 44 px; se edita solo con esa aprobación.
6. Actualizar AUD-02-010 en `auditoria-tecnica.md` (Parcial: interruptor resuelto, con la medición) y `registro-log.md`.

## Criterios de aceptación

- [x] La perilla tiene el mismo margen (±0,5 px) en los cuatro lados, en modo claro y oscuro, medido a 1×, 2× y 3×.
- [x] El centro de cada ícono coincide con el centro de la perilla en su posición (±0,5 px), medido igual.
- [x] El `<button>` mide al menos 44 × 44 px a 360 y 1280 px; la pista sigue en 56 × 32 px.
- [x] El alto del header no cambia, o el cambio quedó medido y aprobado por el desarrollador.
- [x] El centro del efecto de cambio de tema sigue en el centro visual del interruptor (medido con `--vt-x` y `--vt-y`).
- [x] Sin desbordes horizontales a 320, 360 y 1280 px, en claro y oscuro.
- [x] Capturas de antes y después a 1× (1280 px) y 360 px, en claro y oscuro, revisadas.
- [x] Revisión visual en el computador del desarrollador (declarado por el desarrollador, 2026-10-12; no es una medición).
- [x] `pnpm format:check`, `pnpm check` y `pnpm build` sin errores; `package.json` y `pnpm-lock.yaml` sin cambios.
- [x] Bitácora 04-00 creada.

## Fuera de alcance

- Cambiar la forma, los colores, los íconos o el token `--line-strong` (AUD-02-009, 04-03).
- Los demás objetivos táctiles de AUD-02-010 (04-03).
- La duración o el mecanismo del efecto de cambio de tema (RDA-016, AUD-02-008).

## Datos requeridos del desarrollador

- Revisión visual en su computador después del cambio.
