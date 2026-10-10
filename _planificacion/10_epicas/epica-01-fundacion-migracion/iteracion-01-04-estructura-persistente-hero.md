# Iteración 01-04 · Header, tema, hero y pie de página

- **Épica:** 01 · Fundación y migración a Astro
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 01-03
- **RDA relacionadas:** RDA-003, RDA-009
- **Hallazgos que cierra:** AUD-01-005, AUD-01-007, AUD-01-014 (parte)

## Objetivo

Migrar la estructura persistente (header, control de tema, menú móvil, pie) y el hero, con el mismo aspecto y comportamiento que el prototipo.

## Tareas

1. Mover los logotipos a `src/assets/` y servirlos con `<Image />` o `<Picture />` (AVIF/WebP, dimensiones explícitas; el del hero con prioridad de carga). Si `pnpm build` falla con `MissingSharp`, agregar `sharp` como dependencia directa (requiere aprobación; PNPM estricto no lo expone).
2. Crear `Marca.astro`, `Header.astro`, `ControlTema.astro` (interruptor con `role="switch"`), `MenuMovil.astro` y `Footer.astro`, integrados en `LayoutBase`. Los ítems del menú salen de `comunidad.js` y son tres: Comunidad, Talleres y Visión, más el botón «Únete».
3. Migrar a `<script>` de Astro: persistencia del tema, menú móvil con foco atrapado y cierre por Esc, borde del header al desplazarse, sección activa en el menú y pulso del logotipo. Sin dependencia de `window.PulsoDevs`.
4. Retirar el enlace «Oportunidades» (`#oportunidades`) del header, del menú móvil y del pie, por decisión del desarrollador (AUD-01-005). La sección `#encontraras` se mantiene sin entrada de menú. Ningún enlace de ancla debe apuntar a un `id` inexistente.
5. El pie lleva «Fundador: Felipe Cuevas» con `href` real escrito en el HTML desde `comunidad.js` (RDA-009), `rel="noopener noreferrer"` y aviso de apertura en pestaña nueva. Redes: LinkedIn de la comunidad con el logotipo oficial `tec-linkedin.svg`, igual que el prototipo; el resto de la lista se oculta si está vacía.
6. Crear `Hero.astro` con el trazo de pulso, el punto que late, el logotipo, el mensaje, los botones y la nota «Latinoamérica está invitada».

## Criterios de aceptación

- [ ] Header, menú móvil y pie son equivalentes al prototipo en 360, 768, 1280 y 1536 px, en modo claro y oscuro (revisión lado a lado).
- [ ] El tema se aplica antes de pintar, sin parpadeo, y persiste al recargar.
- [ ] Todos los enlaces de ancla apuntan a un `id` existente (comprobado sobre `dist/index.html`).
- [ ] El enlace del fundador tiene su `href` en el HTML compilado.
- [ ] El JavaScript de cliente se mide y se registra; no supera el del prototipo (8.332 B sin comprimir).
- [ ] Teclado: el menú móvil se opera completo y el foco nunca queda oculto bajo el header fijo.
- [ ] Bitácora 01-04 creada.

## Fuera de alcance

- Cambios de aspecto o de texto (épicas 02 y 03).

## Datos requeridos del desarrollador

- Ninguno: la decisión sobre «Oportunidades» está tomada (se retira).
