# Registro de trabajo (registro-log)

**Fuente única de verdad del trabajo pendiente.** Si discrepa con `_planificacion/README.md` o con cualquier otro documento de planificación, prevalece este archivo.

- **Última actualización:** 2026-10-09
- **Iteración activa:** ninguna. La primera es 01-01 (andamiaje), que ejecuta el desarrollador de forma manual en WebStorm.
- **Próximo hito:** hitos 1 y 2: sitio migrado a Astro 7 y Tailwind 4 compilado localmente, desplegado por primera vez en `https://comunidadpulso.dev` con Workers Builds (iteración 01-06).
- **Alcance del sitio:** una sola página (One Page) con secciones ancladas (RDA-011).
- **Hitos del desarrollador:** (1) Astro, (2) Tailwind local, (3) ajustes estéticos y visuales; (4) la navegación multipágina se evalúa después del despliegue (Épica 06, en evaluación).
- **Flujo de ramas vigente:** ramas `iteracion/XX-YY-…` desde el inicio; `main` publica en producción cuando Workers Builds esté conectado.
- **Agente:** solo Claude Code, desde WebStorm.

---

## 1. Estado de épicas e iteraciones

| Iteración | Nombre                                                       | Épica | Estado    | Depende de | Bitácora |
| :-------- | :----------------------------------------------------------- | :---- | :-------- | :--------- | :------- |
| 01-01     | Andamiaje del proyecto                                       | 01    | Pendiente | —          | — |
| 01-02     | Arquitectura base, layout y datos de la comunidad            | 01    | Pendiente | 01-01      | — |
| 01-03     | Tailwind local, fuentes autoalojadas e íconos                | 01    | Pendiente | 01-02      | — |
| 01-04     | Header, tema, hero y pie de página                           | 01    | Pendiente | 01-03      | — |
| 01-05     | Secciones de contenido                                       | 01    | Pendiente | 01-04      | — |
| 01-06     | Despliegue en Cloudflare Workers y retiro del prototipo      | 01    | Pendiente | 01-05      | — |
| 02-01     | Fuente de lectura definitiva (Figtree)                       | 02    | Pendiente | 01-06      | — |
| 02-02     | Ajustes estéticos y visuales                                 | 02    | Pendiente | 02-01, la lista de ajustes y los SVG de tecnologías | — |
| 03-01     | Revisión de contenido y coherencia                           | 03    | Pendiente | 01-06 | — |
| 03-02     | LinkedIn y redes de la comunidad                             | 03    | Pendiente | 03-01 y el enlace de LinkedIn | — |
| 04-01     | SEO técnico y datos estructurados                            | 04    | Pendiente | 03-01      | — |
| 04-02     | Rendimiento e imágenes                                       | 04    | Pendiente | 04-01      | — |
| 04-03     | Accesibilidad y verificación cruzada                         | 04    | Pendiente | 04-02      | — |
| 05-01     | Medición: Cloudflare Web Analytics y Search Console          | 05    | Pendiente | 04-03      | — |
| 05-02     | Verificación final en producción                             | 05    | Pendiente | 05-01      | — |

La iteración 01-01 la ejecuta el desarrollador de forma manual en WebStorm. Su bitácora puede redactarla el agente a partir del resumen del desarrollador.

**Épica en evaluación:** la Épica 06 (navegación multipágina) no tiene iteraciones ni está comprometida; el desarrollador decide después de que el sitio esté desplegado y funcionando (`definicion-epica-06.md`).

## 2. Datos y decisiones pendientes del desarrollador

Bloquean contenido o diseño. Mientras falten, se usa `PENDIENTE_DATO` en `src/data/comunidad.js`.

| Dato o decisión | Hallazgo | Necesario para | Estado |
| :-------------- | :------- | :------------- | :----- |
| Enlace al grupo de WhatsApp | AUD-01-008 | 01-02 | Confirmado (2026-10-09; se carga en 01-02) |
| Enlace del fundador (https://felipecuevas.dev) | AUD-01-007 | 01-02 y 01-04 | Confirmado |
| Fuente de lectura definitiva | RDA-004 | 02-01 | Confirmado: Figtree (2026-10-09) |
| Estado del sitio en producción | RDA-008 | 01-06 | Confirmado: `comunidadpulso.dev` no tiene despliegue previo; 01-06 es el primer despliegue |
| Enlace «Oportunidades» del menú | AUD-01-005 | 01-04 | Confirmado: se retira (el menú queda con Comunidad, Talleres y Visión) |
| Nombres de las temáticas de talleres | AUD-01-002 | — | Confirmado: se dejan tal como están por ahora |
| Logotipos de tecnologías | AUD-01-003 | 02-02 | Confirmado: se usan los oficiales |
| SVG oficiales de las tecnologías | AUD-01-003 | 02-02 | Pendiente: los entrega el desarrollador en `src/icons/` con el prefijo `tec-` (por ejemplo `tec-aws.svg`) |
| PDF con la información del primer taller (el único hasta ahora) | AUD-01-004 | 03-01 | Recibido el 2026-10-10 (Luma: «Del Vibe Coding a la Ingeniería Web», 3 de octubre de 2026). Datos publicables aprobados el 2026-10-10 (RDA-014) |
| Enlace del perfil de LinkedIn de la comunidad | — | 03-02 | Pendiente: lo entrega el desarrollador cuando termine de construir el perfil |
| Lista de ajustes estéticos y visuales (hito 3) | — | 02-02 | Pendiente |
| Redes sociales de la comunidad distintas de LinkedIn | — | 03-02 | Sin definir |

## 3. Decisiones por tomar

| Tema | RDA | Responsable |
| :--- | :-- | :---------- |
| Aceptar la medición con Cloudflare Web Analytics tras medir su efecto | RDA-010 | Desarrollador |
| Si se hace la navegación multipágina (Épica 06), después del despliegue | RDA-011 | Desarrollador |

## 4. Propuestas fuera de alcance

Ideas detectadas durante el trabajo que no forman parte de lo planificado.

| Propuesta | Origen | Fecha |
| :-------- | :----- | :---- |
| Medir clics en el botón del grupo de WhatsApp (el desarrollador lo evaluará «quizás en el futuro») | Respuesta del desarrollador | 2026-10-09 |
| Navegación multipágina (Épica 06, en evaluación) | Respuesta del desarrollador | 2026-10-09 |

## 5. Historial de cambios del registro

| Fecha | Cambio |
| :---- | :----- |
| 2026-10-09 | Creación del registro. Auditoría 01 del prototipo (AUD-01-001 a AUD-01-020) y RDA-001 a RDA-013. Decisiones del desarrollador: sin formulario ni backend, entrada solo por WhatsApp, fundador solo en el pie, Workers Builds desde GitHub, `www` redirige, solo Claude Code, licencia MIT con reserva de marca. |
| 2026-10-09 | Segunda ronda de respuestas: fuente de lectura Figtree; sin despliegue previo en el dominio; se retira «Oportunidades» del menú; logotipos oficiales de tecnologías (los entrega el desarrollador en `src/icons/` con prefijo `tec-`); hubo un primer taller; nombres de temáticas sin cambios. **El sitio será One Page:** se elimina la épica de navegación multipágina (RDA-011 ahora «Sitio de una sola página»); SEO pasa a Épica 04, Publicación y medición a Épica 05 y la multipágina queda como Épica 06 en evaluación. Quedan 5 épicas planificadas y 15 iteraciones. |
| 2026-10-10 | Llega el PDF del primer taller (el único hasta ahora). Se registra en 03-01 con los datos verificables y tres puntos que el desarrollador debe aprobar antes de publicar: cifra de asistentes, público objetivo y sorteo de licencias. |
| 2026-10-10 | El desarrollador aprueba publicar los 80 asistentes, el sorteo de 20 licencias de JetBrains y el despliegue en vivo con GitHub Pages; no se menciona el bootcamp (RDA-014). 03-01 queda sin datos pendientes. |
