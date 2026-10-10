# Registro de trabajo (registro-log)

**Fuente única de verdad del trabajo pendiente.** Si discrepa con `_planificacion/README.md` o con cualquier otro documento de planificación, prevalece este archivo.

- **Última actualización:** 2026-10-10
- **Iteración activa:** 01-03 (Tailwind local, fuentes e íconos), en revisión desde 2026-10-10. 01-02 quedó entregada y con commit `17ed29e`.
- **Prototipo de referencia:** commit `d60c55e`. La transición de cambio de tema **no** existe en el prototipo: se implementa directamente en Astro en 02-03.
- **Próximo hito:** hitos 1 y 2: sitio migrado a Astro 7 y Tailwind 4 compilado localmente, desplegado por primera vez en `https://comunidadpulso.dev` con Workers Builds (iteración 01-06).
- **Alcance del sitio:** una sola página (One Page) con secciones ancladas (RDA-011).
- **Hitos del desarrollador:** (1) Astro, (2) Tailwind local, (3) ajustes estéticos y visuales; (4) la navegación multipágina se evalúa después del despliegue (Épica 06, en evaluación).
- **Flujo de trabajo vigente (RDA-015):** sin ramas; todo se implementa y se registra directamente en `main`. Claude Code no hace commit ni push: lo hace el desarrollador, uno por iteración. Desde 01-06, cada push a `main` publica en producción.
- **Agente:** solo Claude Code, desde WebStorm, que implementa **todas** las iteraciones, incluida la 01-01.

---

## 1. Estado de épicas e iteraciones

| Iteración | Nombre                                                       | Épica | Estado    | Depende de | Bitácora |
| :-------- | :----------------------------------------------------------- | :---- | :-------- | :--------- | :------- |
| 01-01     | Andamiaje del proyecto                                       | 01    | Terminada | —          | [bitacora-01-01-2026-10-10](../99_bitacora/bitacora-01-01-2026-10-10.md) |
| 01-02     | Arquitectura base, layout y datos de la comunidad            | 01    | Terminada | 01-01      | [bitacora-01-02-2026-10-10](../99_bitacora/bitacora-01-02-2026-10-10.md) |
| 01-03     | Tailwind local, fuentes autoalojadas e íconos                | 01    | En revisión | 01-02    | [bitacora-01-03-2026-10-10](../99_bitacora/bitacora-01-03-2026-10-10.md) |
| 01-04     | Header, tema, hero y pie de página                           | 01    | Pendiente | 01-03      | — |
| 01-05     | Secciones de contenido                                       | 01    | Pendiente | 01-04      | — |
| 01-06     | Despliegue en Cloudflare Workers y retiro del prototipo      | 01    | Pendiente | 01-05      | — |
| 02-01     | Fuente de lectura definitiva (Figtree)                       | 02    | Pendiente | 01-06      | — |
| 02-02     | Ajustes estéticos y visuales                                 | 02    | Pendiente | 02-01 y la lista de ajustes | — |
| 02-03     | Transición de cambio de tema                                 | 02    | Pendiente | 01-06      | — |
| 03-01     | Revisión de contenido y coherencia                           | 03    | Pendiente | 01-06 | — |
| 03-02     | Otras redes de la comunidad (LinkedIn ya migra en 01-04)     | 03    | Pendiente | 03-01 y la definición de otras redes | — |
| 04-01     | SEO técnico y datos estructurados                            | 04    | Pendiente | 03-01      | — |
| 04-02     | Rendimiento e imágenes                                       | 04    | Pendiente | 04-01      | — |
| 04-03     | Accesibilidad y verificación cruzada                         | 04    | Pendiente | 04-02      | — |
| 05-01     | Medición: Cloudflare Web Analytics y Search Console          | 05    | Pendiente | 04-03      | — |
| 05-02     | Verificación final en producción                             | 05    | Pendiente | 05-01      | — |

Claude Code implementa todas las iteraciones, incluida la 01-01, directamente en `main` (RDA-015).

**Épica en evaluación:** la Épica 06 (navegación multipágina) no tiene iteraciones ni está comprometida; el desarrollador decide después de que el sitio esté desplegado y funcionando (`definicion-epica-06.md`).

## 2. Datos y decisiones pendientes del desarrollador

Bloquean contenido o diseño. Mientras falten, se usa `PENDIENTE_DATO` en `src/data/comunidad.js`.

| Dato o decisión | Hallazgo | Necesario para | Estado |
| :-------------- | :------- | :------------- | :----- |
| Enlace al grupo de WhatsApp | AUD-01-008 | 01-02 | Confirmado (2026-10-09); cargado en `src/data/comunidad.js` en 01-02 |
| Enlace del fundador (https://felipecuevas.dev) | AUD-01-007 | 01-02 y 01-04 | Confirmado |
| Fuente de lectura definitiva | RDA-004 | 02-01 | Confirmado: Figtree (2026-10-09) |
| Estado del sitio en producción | RDA-008 | 01-06 | Confirmado: `comunidadpulso.dev` no tiene despliegue previo; 01-06 es el primer despliegue |
| Enlace «Oportunidades» del menú | AUD-01-005 | 01-04 | Confirmado: se retira (el menú queda con Comunidad, Talleres y Visión) |
| Nombres de las temáticas de talleres | AUD-01-002 | — | Confirmado: se dejan tal como están por ahora |
| Logotipos de tecnologías en las temáticas de talleres | AUD-01-003 | — | Confirmado (2026-10-10): **no** se usan; las temáticas llevan los íconos Material Symbols Light que eligió el desarrollador |
| SVG oficiales de las tecnologías | AUD-01-003 | 01-03 | Recibidos: 29 archivos `Logos*.svg`; copiados sin modificar a `src/icons/tec-*.svg` en 01-03 |
| Nombres de los 6 íconos de temáticas de talleres | AUD-02-003 | 01-03 | Confirmados en 01-03: coinciden exactamente con `web`, `code-blocks`, `wand-stars`, `cloud-sync`, `rocket-launch` y `robot-2` |
| PDF con la información del primer taller (el único hasta ahora) | AUD-01-004 | 03-01 | Recibido el 2026-10-10 (Luma: «Del Vibe Coding a la Ingeniería Web», 3 de octubre de 2026). Datos publicables aprobados el 2026-10-10 (RDA-014) |
| Enlace del perfil de LinkedIn de la comunidad | — | 01-02 y 01-04 | Recibido: `https://www.linkedin.com/company/comunidad-pulso-devs/home/` (en `config.js` del prototipo) |
| Lista de ajustes estéticos y visuales (hito 3) | — | 02-02 | Pendiente |
| Redes sociales de la comunidad distintas de LinkedIn | — | 03-02 | Sin definir |

## 3. Decisiones por tomar

| Tema | RDA | Responsable |
| :--- | :-- | :---------- |
| Aceptar la medición con Cloudflare Web Analytics tras medir su efecto | RDA-010 | Desarrollador |
| Si se hace la navegación multipágina (Épica 06), después del despliegue | RDA-011 | Desarrollador |
| Grosor de los íconos de interfaz: el prototipo trae 20 de 21 con trazo de peso 400 (~20 % más de tinta y ~5 % más grandes) y `DESIGN.md` §7 dice peso 300 (Light). 01-03 usa Material Symbols Light (300); mantener el trazo del prototipo exige otro set (por ejemplo `@iconify-json/material-symbols`, dependencia nueva) | — | Desarrollador |

## 4. Propuestas fuera de alcance

Ideas detectadas durante el trabajo que no forman parte de lo planificado.

| Propuesta | Origen | Fecha |
| :-------- | :----- | :---- |
| Medir clics en el botón del grupo de WhatsApp (el desarrollador lo evaluará «quizás en el futuro») | Respuesta del desarrollador | 2026-10-09 |
| Navegación multipágina (Épica 06, en evaluación) | Respuesta del desarrollador | 2026-10-09 |
| Corregir `DESIGN.md` §7: nombre de los íconos como están en `src/data/iconos.js` (variante `-outline` del set) y aclarar el peso real de los íconos (ver §3) | Bitácora 01-03 | 2026-10-10 |
| Sumar a `DESIGN.md` `.joincard`, `.band--dots`, `.founder-chip`, LinkedIn en el pie y la lista real de íconos y logotipos (requiere aprobación) | Auditoría 02 | 2026-10-10 |

## 5. Historial de cambios del registro

| Fecha | Cambio |
| :---- | :----- |
| 2026-10-09 | Creación del registro. Auditoría 01 del prototipo (AUD-01-001 a AUD-01-020) y RDA-001 a RDA-013. Decisiones del desarrollador: sin formulario ni backend, entrada solo por WhatsApp, fundador solo en el pie, Workers Builds desde GitHub, `www` redirige, solo Claude Code, licencia MIT con reserva de marca. |
| 2026-10-09 | Segunda ronda de respuestas: fuente de lectura Figtree; sin despliegue previo en el dominio; se retira «Oportunidades» del menú; logotipos oficiales de tecnologías (los entrega el desarrollador en `src/icons/` con prefijo `tec-`); hubo un primer taller; nombres de temáticas sin cambios. **El sitio será One Page:** se elimina la épica de navegación multipágina (RDA-011 ahora «Sitio de una sola página»); SEO pasa a Épica 04, Publicación y medición a Épica 05 y la multipágina queda como Épica 06 en evaluación. Quedan 5 épicas planificadas y 15 iteraciones. |
| 2026-10-10 | Llega el PDF del primer taller (el único hasta ahora). Se registra en 03-01 con los datos verificables y tres puntos que el desarrollador debe aprobar antes de publicar: cifra de asistentes, público objetivo y sorteo de licencias. |
| 2026-10-10 | Auditoría 02 del prototipo en `d60c55e`. Logotipos: 29 SVG recibidos, no van en talleres (AUD-01-003 resuelto); LinkedIn de la comunidad recibido. Épica 01 revisada: paridad incluye `.joincard`, `.band--dots`, `.founder-chip` y LinkedIn; 02-02 y 03-02 ajustadas. |
| 2026-10-10 | Decisiones del desarrollador: (1) todo el trabajo va en `main`, sin ramas (RDA-015); (2) Claude Code implementa todas las iteraciones, incluida la 01-01; (3) la transición de cambio de tema se implementa en Astro como iteración 02-03, con duración de 1 s como única excepción a `DESIGN.md` §8 (RDA-016). Se quitan de la Épica 01 las referencias a ramas y a la transición. |
| 2026-10-10 | Iteración 01-01 implementada por Claude Code en `main` y dejada `En revisión`: proyecto Astro 7 con Tailwind 4, PNPM 12.8.1, Prettier y TypeScript 6; prototipo movido a `_prototipo/`; `.gitignore` actualizado. Pendiente del desarrollador: revisar, hacer commit y push. |
| 2026-10-10 | El desarrollador aprueba publicar los 80 asistentes, el sorteo de 20 licencias de JetBrains y el despliegue en vivo con GitHub Pages; no se menciona el bootcamp (RDA-014). 03-01 queda sin datos pendientes. |
| 2026-10-10 | Iteración 01-01 con commit `10fc2c8` (Terminada). Decisiones del desarrollador sobre sus pendientes: PNPM se mantiene en 12.8.1; `.prettierignore` conserva `AGENTS.md`, `DESIGN.md`, `README.md` y `LICENSE`; estilo de Prettier aceptado; los 37 renombrados quedan en el índice. Se corrigen tres errores de documentación (doble punto en 01-01 y numeración de la Auditoría 02, que pasa a AUD-02-001 a AUD-02-007). |
| 2026-10-10 | Iteración 01-02 implementada por Claude Code en `main` y dejada `En revisión`: `src/data/comunidad.js`, `LayoutBase`, `CabeceraSEO`, `404`, portada con secciones ancladas, año del pie calculado al compilar e integración que falla ante `PENDIENTE_DATO`. Pendiente del desarrollador: revisar, hacer commit y push. |
| 2026-10-10 | Iteración 01-02 con commit `17ed29e` (Terminada). Iteración 01-03 implementada por Claude Code en `main` y dejada `En revisión`: tokens y componentes comunes en Tailwind 4, fuentes autoalojadas (Lexend e IBM Plex Sans) con la Fonts API de Astro, `Icono.astro` con `astro-icon` y 29 logotipos `tec-*.svg` idénticos a los originales. Los 6 íconos de temáticas coinciden exactamente con Material Symbols Light. Queda por decidir el grosor de los íconos del sprite (§3). |
