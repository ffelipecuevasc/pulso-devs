# Bitácora 05-01 (fase B) · Cierre de la medición: Search Console y RDA-010

- **Fecha:** 2026-10-13
- **Agente:** Claude Code (Sonnet 5.5)
- **Rama:** main
- **Estado final:** Terminada (2026-10-13; fase A medida por el agente y fase B declarada por el desarrollador, ambas incorporadas)

> **Por qué este archivo se llama distinto.** Ya existen `bitacora-05-01-2026-10-13.md` y `bitacora-05-01-ajuste-2026-10-13.md`, entregadas y commiteadas, y las bitácoras no se editan después de entregadas (`_planificacion/README.md` §2.3). Este archivo **cierra** la iteración con la fase B; no repite lo medido en la fase A, que sigue como está en esas dos bitácoras y en `evidencia-05-01-fase-a-datos.json`.

## Resumen

Solo documentación. El desarrollador completó `evidencia-05-01-fase-b.md` y declaró el resultado de Search Console (2026-10-13, con captura del informe «Sitemaps»): la propiedad de dominio `comunidadpulso.dev` está verificada, el sitemap está en «Correcto» con 1 página descubierta y la portada figura indexada. Con eso se marcan los tres criterios que faltaban y 05-01 pasa a `Terminada`. Todo lo de la fase B es **declarado por el desarrollador**; el agente no operó Search Console ni Cloudflare. No se copió la captura de pantalla al repositorio.

## Resultado de Search Console (declarado por el desarrollador, 2026-10-13)

| Punto | Resultado |
| :-- | :-- |
| Propiedad | Tipo «Dominio» (`comunidadpulso.dev`), verificada con la conexión automática de Search Console con Cloudflare. Resultado de «Verificar»: «Se ha verificado la propiedad» (2026-10-13; verificación inmediata, sin reintentos) |
| Sitemap enviado | `https://comunidadpulso.dev/sitemap-index.xml`, el 13 oct 2026 |
| Estado inicial del sitemap | «No se ha podido obtener», con 0 páginas descubiertas (Tipo: Desconocido), pendiente del primer procesamiento de Google |
| Estado del sitemap, actualización 2026-10-13 | **«Correcto»**: tipo «Índice de sitemaps», última lectura el 13 oct 2026, **1 página descubierta** y 0 vídeos descubiertos; sin errores |
| Portada `https://comunidadpulso.dev/` | «La URL está en Google» (Indexación de páginas: «La página está indexada»; HTTPS: «La página se sirve a través de HTTPS»), el 2026-10-13, antes del envío del sitemap. No se solicitó indexación (la herramienta ofrece «Solicitar indexación» para páginas que cambiaron) |

## Cierre de RDA-010

RDA-010 está **Aceptada (2026-10-13)** y ya quedó registrada en `decisiones.md`, `AGENTS.md` §7.3 y `registro-log.md` §4. En esta tarea no se modificó ninguno de esos archivos. El desarrollador anotó en la evidencia la fecha de confirmación de los umbrales (2026-10-13, fecha de aceptación de RDA-010) y la aceptación del +2 B de JavaScript propio (3.714 B a 3.716 B), no atribuible a Web Analytics y de causa no investigada.

## Regla de los 14 días y estado de indexación

- La regla de los 14 días (envío del sitemap + 14 días = 2026-10-27) **queda sin efecto**: la portada ya figuraba indexada el día del envío, así que no se abre ningún seguimiento aparte.
- La revisión «a los 3 a 7 días» de la evidencia ya no es necesaria: el sitemap pasó a «Correcto» el 2026-10-13. La fila del 2026-10-27 no se cambió.
- El estado de indexación se vuelve a registrar con fecha en 05-03 (tarea 4 de `iteracion-05-03-verificacion-final.md`).

## Nota sobre una petición enviada al medir

En la bitácora de ajuste (`bitacora-05-01-ajuste-2026-10-13.md`, «Verificación») ya consta que, al comprobar que la producción no había cambiado, se envió un `POST` vacío a `https://comunidadpulso.dev/cdn-cgi/rum`. No modifica nada del sitio; solo pudo registrarse como una señal vacía en Web Analytics. No hay nada nuevo que agregar.

## Archivos creados o modificados en esta tarea

| Archivo | Cambio |
| :-- | :-- |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/evidencia-05-01-fase-b.md` | Estado «Completada» (2026-10-13), actualización del sitemap («Correcto», 1 página, sin errores), fila de revisión a los 3 a 7 días, fecha de confirmación de umbrales y dos criterios marcados |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/iteracion-05-01-medicion.md` | Estado «Terminada (2026-10-13)» y tres criterios marcados |
| `_planificacion/00_producto/registro-log.md` | Cabecera, §1, §4 y una fila nueva en §6 (2026-10-13) |
| `_planificacion/99_bitacora/bitacora-05-01-fase-b-2026-10-13.md` | **Nueva.** Esta bitácora |

## Verificación

- Sin cambios en `src/`, `public/`, `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `DESIGN.md`, `AGENTS.md`, `README.md`, `.claude/`, `decisiones.md` ni Cloudflare. No se ejecutó `wrangler` ni ningún comando de Git que modifique algo.
- No se hicieron mediciones nuevas: el resultado de Search Console es una declaración del desarrollador con captura que el agente no tiene en el repositorio.

## Criterios de aceptación (iteración 05-01)

- [x] Mediciones de la producción con el script, en cinco corridas alternadas, móvil y escritorio, con INP (fase A).
- [x] Umbrales con Web Analytics activo (fase A).
- [x] El JavaScript propio no aumenta (declarado por el desarrollador, 2026-10-13).
- [x] RDA-010 «Aceptada» y `AGENTS.md` §7.3 y `registro-log.md` §4 coherentes con la decisión.
- [x] Search Console con la propiedad verificada y el sitemap en estado «Correcto» (declarado por el desarrollador, 2026-10-13).
- [x] Estado de indexación de la portada registrado con fecha (declarado por el desarrollador, 2026-10-13).
- [x] `evidencia-05-01-fase-b.md` completada por el desarrollador.
- [x] Bitácora 05-01 creada.

## Commit sugerido

`Épica 05 - Iteración 05-01: sitemap en «Correcto» con 1 página descubierta, propiedad verificada, portada indexada y RDA-010 aceptada; 05-01 Terminada, solo documentación.`
