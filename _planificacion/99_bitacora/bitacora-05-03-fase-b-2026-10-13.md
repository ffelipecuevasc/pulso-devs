# Bitácora 05-03 (fase B) · Cierre de la verificación final en producción y de la Épica 05

- **Fecha:** 2026-10-13
- **Agente:** Claude Code (Sonnet 5.5)
- **Rama:** main
- **Estado final:** Terminada (2026-10-13; fase A medida por el agente, fase B declarada por el desarrollador, con las mediciones del agente sobre Always Use HTTPS)

> **Por qué este archivo se llama distinto.** Ya existe `bitacora-05-03-fase-a-2026-10-13.md`, entregada y commiteada, y las bitácoras no se editan después de entregadas (`_planificacion/README.md` §2.3). Este archivo **cierra** la iteración con la fase B y solo repite lo ya registrado en `evidencia-05-03-fase-b.md` y en la bitácora de la fase A; no trae mediciones nuevas.

## Resumen

Solo documentación. El desarrollador completó `evidencia-05-03-fase-b.md` (partes 1 a 6) y aprobó, el 2026-10-13, la clasificación de hallazgos y los textos de `README.md` y `registro-log.md`. Se aplicó lo aprobado en `auditoria-tecnica.md`, `README.md` y `registro-log.md`; las iteraciones y la definición de la épica pasan a `Terminada`. Con eso **la Épica 05 y el ciclo inicial del proyecto quedan terminados**; solo sigue abierta la Épica 06 (navegación multipágina), en evaluación y sin cambios. Todo lo de la fase B es **declarado por el desarrollador**, salvo lo que se indica como medido por el agente.

## Resultados de la fase B (declarados por el desarrollador, 2026-10-13)

| Punto | Resultado |
| :---- | :-------- |
| JSON-LD, `validator.schema.org` (20:58 hrs) | Un elemento `Organization`, 0 errores y 0 advertencias, con `name`, `url`, `logo`, `description` y `sameAs` |
| JSON-LD, prueba de resultados enriquecidos de Google (20:59:46 hrs) | Rastreada correctamente, sin errores; «No se ha detectado ningún elemento» (comportamiento esperado para `Organization`, igual que en 04-01) |
| Vista previa en WhatsApp (21:04 hrs) | Tarjeta grande con la imagen actual; título «Comunidad Pulso Devs» completo; dominio `comunidadpulso.dev` |
| Vista previa en LinkedIn (21:05 hrs) | Versión actual, sin problemas de caché; tarjeta horizontal compacta con miniatura; título «Comunidad Pulso Devs» completo; dominio `comunidadpulso.dev` |
| Search Console (21:10 hrs), propiedad `comunidadpulso.dev` | Portada «La URL está en Google» («La página está indexada»; «La página se sirve a través de HTTPS»); sitemap `sitemap-index.xml` «Correcto», enviado y leído el 13 oct 2026, 1 página descubierta y 0 vídeos; ningún error ni advertencia |
| Teléfono Android (21:15 hrs) | Samsung Galaxy A55+, Android 16, Google Chrome y Mozilla Firefox. Seis comprobaciones (portada sin desplazamiento horizontal, menú, interruptor de tema con persistencia, botón «Únete», 404 y ícono de 192 px) en «OK» en claro y oscuro; el ícono se ve nítido y sin deformar |

## Always Use HTTPS (declarado por el desarrollador, con mediciones del agente)

**Declarado:** el desarrollador activó *Always Use HTTPS* en Cloudflare a las 20:04 del 2026-10-13 (con captura del panel; no se copió al repositorio). **Medido por el agente** (solo `HEAD`, ningún `POST`; detalle en la parte 5 de `evidencia-05-03-fase-b.md`):

| URL | Cadena | Bucle |
| :-- | :----- | :---- |
| `http://comunidadpulso.dev/` | `301` a `https://comunidadpulso.dev/` → `200` | No |
| `http://comunidadpulso.dev/ruta-inexistente?x=1` | `301` a `https://comunidadpulso.dev/ruta-inexistente?x=1` (ruta y consulta intactas) → `404` | No |
| `http://www.comunidadpulso.dev/` | `301` a `https://www…` → `301` a `https://comunidadpulso.dev/` → `200` | No |
| `https://www.comunidadpulso.dev/` | `301` a `https://comunidadpulso.dev/` → `200` | No |

Antes del cambio, `http://comunidadpulso.dev/` respondía `200` sin redirigir y `http://www` daba `522`; ya no. La portada no cambió (CSP idéntica a `public/_headers`, sin `report-only`, mismas tres cabeceras y mismo `Cache-Control`). **No medido:** la hora exacta del cambio (ya estaba activo en la primera consulta, 20:05:58 según el `Date` de Cloudflare), la configuración de Cloudflare y si `http://www/ruta?x=1` conserva ruta y consulta.

## HSTS

`strict-transport-security` no está presente (medido: 0 coincidencias en la portada, las redirecciones, `https://www` y la 404). Decisión del desarrollador (2026-10-13): **riesgo aceptado, sin abrir hallazgo nuevo**. Registrado en `registro-log.md` §4.

## Clasificación de hallazgos aplicada (aprobada por el desarrollador, 2026-10-13)

Ningún hallazgo de severidad Alta sigue abierto (AUD-01-005, 012 y 016 resueltos). En `auditoria-tecnica.md`:

| Hallazgo | Estado aplicado |
| :------- | :-------------- |
| AUD-02-005 | **Riesgo aceptado** (Safari e iPhone no verificados; verificado en Chrome y Firefox) |
| AUD-02-008 | **Riesgo aceptado** (Safari e iPhone no verificados); la limitación conocida de Chrome de escritorio (RDA-016) no cambia |
| AUD-01-019 | **Resuelto en 01-06** (la etiqueta «Parcial» estaba atrasada) |
| AUD-02-010 | **Resuelto en 04-00 y 04-03** (etiqueta corregida) |
| AUD-01-015 | **Resuelto en 04-03**, con VoiceOver y Narrador de Windows como riesgo aceptado |
| AUD-01-018 | **Resuelto en 04-01**, con `apple-touch-icon` en iPhone como riesgo aceptado; ícono de 192 px confirmado en Android (declarado) |
| AUD-02-009 | **Resuelto en 04-03**, con la verificación en Safari como riesgo aceptado |

Se agregó el texto de cierre de la Auditoría 01 («los 20 hallazgos están resueltos») y una fila de 05-03 en cada tabla de «Hallazgos abiertos por iteración». La ausencia de HSTS **no** abrió hallazgo (no hay Auditoría 03).

## Textos aplicados y omitidos

- **`README.md`:** R1, R2, R3 y R4 aplicados sin cambios.
- **`registro-log.md`:** L1, L2, L3, L4, L6, L7, L9, L10 y L11 aplicados; **L5 omitido** por decisión del desarrollador (la nota de la Épica 06 queda como estaba); **L8 reemplazado** por el texto aprobado sobre Always Use HTTPS, en una fila nueva de §4. Los marcadores `AAAA-MM-DD` se llenaron con 2026-10-13 y los `[…]` de L7 y L9, con lo registrado en la parte 3 de la evidencia.
- **Ajustes de forma, sin cambiar el sentido:** el enlace de L4 apunta a `bitacora-05-03-fase-b-2026-10-13` (el nombre real de este archivo); en L6 se cerró el paréntesis de la frase reemplazada; en L2 se quitó «sigue 05-03 (ver arriba)» de la mitad de la línea (no del final).
- La descripción de WhatsApp que se corta antes de «toda Latinoamérica» **no se registra** en ningún archivo, por decisión del desarrollador.

## Cierre de la Épica 05

Las tres iteraciones (05-01, 05-02 y 05-03) están `Terminada` y `definicion-epica-05.md` pasa a `Terminada (2026-10-13)`. Criterios de término (detalle en `definicion-epica-05.md` y `registro-log.md` §5): RDA-010 Aceptada; Search Console con propiedad verificada, sitemap «Correcto» e indexación con fecha; CSP aplicada sin violaciones y Lighthouse móvil 98 (base 99, Rendimiento 95 aceptado en 05-02); el sitio cumple los criterios de la Épica 04 (móvil 98 / 100 / 100 / 100, escritorio 100 / 100 / 100 / 100, LCP 1.839 ms, CLS 0, INP 32 a 48 ms); sin hallazgos Alta abiertos y lo no verificado como riesgo aceptado.

**No verificado, riesgo aceptado por el desarrollador (declaración del 2026-10-12, sin equipo Apple; clasificado el 2026-10-13):** Safari, iPhone, VoiceOver, Narrador de Windows y `apple-touch-icon`. Si más adelante hay acceso a un equipo Apple, se reabre como hallazgo nuevo.

La Épica 06 (navegación multipágina) sigue **en evaluación**, sin iteraciones y sin cambios.

## Archivos creados o modificados

| Archivo | Cambio |
| :------ | :----- |
| `_planificacion/00_producto/auditoria-tecnica.md` | Siete estados aplicados, cierre de la Auditoría 01 y filas de 05-03 |
| `README.md` | R1, R2, R3 y R4 |
| `_planificacion/00_producto/registro-log.md` | Cabecera, §1, §4 (fila de Search Console, fila nueva de Always Use HTTPS y fila de clics), §5 (Épica 05 y nota de la Épica 04) y §6 |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/iteracion-05-03-verificacion-final.md` | Estado `Terminada (2026-10-13)` y criterios marcados |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/definicion-epica-05.md` | Estado `Terminada (2026-10-13)` y criterios de término marcados |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/evidencia-05-03-fase-b.md` | Solo el estado: `Completada` |
| `_planificacion/99_bitacora/bitacora-05-03-fase-b-2026-10-13.md` | Creado (esta bitácora) |

No se tocó `src/`, `public/`, `astro.config.mjs`, `wrangler.jsonc`, `package.json`, `pnpm-lock.yaml`, `DESIGN.md`, `AGENTS.md`, `.claude/`, `decisiones.md`, la Épica 06 ni las filas históricas de §6.

## Verificación

- `pnpm format:check`: OK (`All matched files use Prettier code style!`). `README.md` y `_planificacion/` están en `.prettierignore`, así que la comprobación no revisa esos archivos.
- `pnpm check` y `pnpm build`: no se ejecutaron (no se tocó código).

## Criterios de aceptación

- [x] El sitio cumple los criterios de la Épica 04 en producción (fase A, medido).
- [x] Sin hallazgos abiertos de severidad Alta.
- [x] Todo hallazgo abierto queda clasificado, con fecha (aprobado el 2026-10-13).
- [x] Estado de indexación registrado con fecha (parte 3 de la evidencia, 2026-10-13, 21:10 hrs).
- [x] Evidencia del desarrollador registrada en `evidencia-05-03-fase-b.md`.
- [x] Bitácora 05-03 creada (esta y la de la fase A).

## Pendientes y riesgos

- Ninguno bloquea el cierre. Riesgo aceptado: Safari, iPhone, VoiceOver, Narrador de Windows, `apple-touch-icon` y la ausencia de HSTS.
- No medido: causa de la baja a 95 de 05-02 (no se atribuyó a la CSP ni se descartó; en 05-03 dio 98), configuración de Cloudflare y la hora exacta de la activación de Always Use HTTPS.

## Commit sugerido

`Épica 05 - Iteración 05-03: cierre, hallazgos clasificados y riesgo aceptado, Always Use HTTPS y HSTS registrados, README y registro-log actualizados; 05-03 y la Épica 05 Terminadas, solo documentación.`
