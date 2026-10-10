# Iteración 02-03 · Transición de cambio de tema

- **Épica:** 02 · Sistema de diseño y ajustes estéticos
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 01-06 (el control de tema ya está migrado y el sitio, desplegado)
- **RDA relacionadas:** RDA-003, RDA-016
- **Hallazgos que cierra:** —
- **Hallazgos que abre:** AUD-02-006 (compatibilidad)

## Objetivo

Al pulsar el interruptor de tema, el tema nuevo se revela como un círculo que crece desde el interruptor, en **1 segundo** (excepción aprobada a `DESIGN.md` §8, RDA-016). El efecto usa solo la View Transitions API nativa, sin dependencias.

## Origen del efecto

Idea del desarrollador (versión original, con máscara SVG de círculo y `mask-size` hasta `200vmax`, 1 s, creciendo desde el centro de la pantalla). Esta iteración la adapta al sitio: el círculo nace en el interruptor, respeta el movimiento reducido y convive con la clave `pulsodevs-theme`.

## Tareas

1. En el script del `ControlTema` (el `<script>` de Astro, no el del `<head>`), reemplazar el cambio directo por `aplicarTemaConTransicion(tema, origen)`:
   - Sin `document.startViewTransition` o con `matchMedia('(prefers-reduced-motion: reduce)').matches`, aplicar el tema de inmediato (como hoy).
   - Si hay soporte: calcular el centro del interruptor (`getBoundingClientRect`) y el radio hasta la esquina más lejana de la pantalla (`Math.hypot`), guardarlos como `--vt-x`, `--vt-y` y `--vt-r` en `<html>`, añadir la clase `is-theme-switching` y llamar a `document.startViewTransition(() => aplicarTema(tema))`. Al terminar (`transition.finished.finally`), quitar la clase.
   - Guardar la preferencia en `localStorage` (`pulsodevs-theme`) **antes** de iniciar la transición, para que un clic doble o una recarga no la pierdan.
   - El cambio causado por la preferencia del sistema (`prefers-color-scheme`) no se anima.
   - `aria-checked` y `theme-color` se actualizan dentro del callback de la transición, igual que el tema.
2. En `src/styles/global.css`:
   - `.is-theme-switching` y sus descendientes (y `::before`/`::after`) con `transition: none !important`, para que la vista nueva no se vea a medio cambiar de color.
   - `::view-transition-old(root)` y `::view-transition-new(root)` con `animation: none` y `mix-blend-mode: normal`; la vieja debajo (`z-index: 0`) y la nueva encima (`z-index: 1`).
   - `::view-transition-new(root)` con `animation: theme-reveal 1s var(--ease-out) both`, y `@keyframes theme-reveal` de `clip-path: circle(0 at var(--vt-x) var(--vt-y))` a `circle(var(--vt-r) at var(--vt-x) var(--vt-y))` (con valores de respaldo 50 % y `150vmax`).
   - Dentro de `@media (prefers-reduced-motion: reduce)`: `::view-transition-new(root) { animation: none; }`.
3. No usar `<ClientRouter />` ni `@astrojs/*` nuevos: Astro no interfiere con `startViewTransition` si no se activan sus transiciones de vista. Comprobar que el efecto funciona con el sitio compilado (`pnpm build` y `pnpm preview`), no solo con `pnpm dev`.
4. Actualizar `DESIGN.md` §6 (Control de tema) y §8 (Movimiento) para que describan lo implementado, con la duración de 1 s como excepción (la excepción ya fue aprobada y escrita antes de implementar).

## Criterios de aceptación

- [ ] A 360 y 1280 px, en ambos sentidos (claro a oscuro y oscuro a claro), una captura a ~300 ms muestra el círculo creciendo desde el interruptor, y a 1,2 s el tema nuevo está completo.
- [ ] La transición dura 1 s (medido con `getAnimations()` o con la grabación de Playwright).
- [ ] Con `prefers-reduced-motion: reduce` el cambio es inmediato y `startViewTransition` no se llama.
- [ ] Con `startViewTransition` eliminado (prueba sin soporte), el cambio es inmediato y sin errores en la consola.
- [ ] Un doble clic rápido deja un estado consistente (`data-theme`, `aria-checked`, `localStorage` y `theme-color` coinciden) y sin errores.
- [ ] Al terminar, `<html>` no conserva la clase `is-theme-switching`.
- [ ] Sin parpadeo inicial: la recarga mantiene el tema guardado.
- [ ] Sin desbordes horizontales durante la transición ni al terminar.
- [ ] El INP del clic en el interruptor es menor que 200 ms (medido) y el CLS no cambia.
- [ ] `DESIGN.md` §6 y §8 coinciden con lo implementado.
- [ ] Bitácora 02-03 creada. Safari, Firefox y teléfono real quedan anotados como no verificados hasta que el desarrollador los pruebe (AUD-02-006).

## Fuera de alcance

- Animar el cambio causado por la preferencia del sistema.
- Otras animaciones o cambios del interruptor.
- Cambiar la duración de 1 s (requiere una RDA nueva).

## Datos requeridos del desarrollador

- Ninguno.
