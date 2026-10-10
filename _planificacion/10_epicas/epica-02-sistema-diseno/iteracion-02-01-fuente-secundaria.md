# Iteración 02-01 · Fuente de lectura definitiva

- **Épica:** 02 · Sistema de diseño y ajustes estéticos
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 01-06
- **RDA relacionadas:** RDA-004
- **Hallazgos que cierra:** —

## Objetivo

Reemplazar IBM Plex Sans por **Figtree** (elegida por el desarrollador el 2026-10-09) como fuente de lectura, acompañando a Lexend.

## Tareas

1. Configurar Figtree en la Fonts API de Astro (subconjunto latino, solo los pesos necesarios, `font-display: swap`, precarga de los críticos).
2. Actualizar los tokens de `@theme` y `DESIGN.md` §3 (requiere aprobación) con familia, pesos y respaldo.
3. Revisar interlineado, tamaño y ancho de línea de párrafos, listas y datos clave con la nueva fuente.
4. Medir el peso de las fuentes y el CLS al cargar.
5. Registrar la decisión como actualización de RDA-004.
6. Guardar Lexend y Figtree en el repo y servirlas con el proveedor local de la Fonts API de Astro, para que `pnpm build` no necesite internet; verificar la sintaxis vigente en la documentación de Astro, comprobar la licencia de redistribución de cada fuente y medir que el build funcione sin red. Solo Lexend y Figtree: IBM Plex Sans se retira en esta iteración y no se guarda en el repo (decisión del desarrollador, 2026-10-10).

## Criterios de aceptación

- [ ] La fuente se sirve desde el propio dominio y no queda ninguna referencia a IBM Plex Sans.
- [ ] Solo se descargan los pesos usados.
- [ ] Sin desplazamiento de diseño visible al cargar (CLS medido).
- [ ] Legibilidad revisada en 360 px y escritorio, en modo claro y oscuro.
- [ ] Lexend y Figtree están guardadas dentro del repo (con la licencia de redistribución comprobada y anotada en la bitácora), se sirven con el proveedor local de la Fonts API y `pnpm build` termina sin errores ni advertencias **sin acceso a internet** (medido, por ejemplo con la red desconectada y sin caché de fuentes).
- [ ] `DESIGN.md` §3 y RDA-004 actualizados.
- [ ] Bitácora 02-01 creada.

## Fuera de alcance

- Cambiar Lexend, que es la tipografía principal obligatoria.

## Datos requeridos del desarrollador

- Ninguno: la fuente está elegida (Figtree).
