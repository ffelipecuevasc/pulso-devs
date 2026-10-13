# Bitácora 05-02 (fase B) · Cierre de la política Content-Security-Policy

- **Fecha:** 2026-10-13
- **Agente:** Claude Code (Sonnet 5.5)
- **Rama:** main
- **Estado final:** Terminada (2026-10-13; fase A medida por el agente, fase B medida por el agente con confirmaciones declaradas por el desarrollador)

> **Por qué este archivo se llama distinto.** Ya existen `bitacora-05-02-2026-10-13.md` y `bitacora-05-02-ajuste-2026-10-13.md`, entregadas y commiteadas, y las bitácoras no se editan después de entregadas (`_planificacion/README.md` §2.3). Este archivo **cierra** la iteración con la fase B y solo repite lo ya registrado en `evidencia-05-02-fase-b.md` y en esas dos bitácoras; no trae mediciones nuevas.

## Resumen

La política `Content-Security-Policy` completa está **aplicada en producción** desde el 2026-10-13 (despliegue 2), sin violaciones en las pruebas medidas por el agente y con el control positivo bloqueado. Se llegó en dos despliegues: primero en modo solo informe y después aplicada. El método fue el **método C** (hashes fijos en `public/_headers` más una integración propia que hace fallar `pnpm build` si no coinciden con `dist/`). El Rendimiento móvil de Lighthouse quedó en 95 (línea base de 05-01: 99); el desarrollador lo aceptó porque cumple el umbral. Solo se tocó el repositorio con lo aprobado por el desarrollador; en esta tarea de cierre solo se editó documentación.

## Método C implementado

- **Integración `verificarCsp`** (`src/integraciones/verificarCsp.js`, 137 líneas, solo lee `dist/`; sin dependencias nuevas): compara en las dos direcciones los hashes SHA-256 de los scripts y estilos en línea de todas las páginas de `dist/` con los de la política de `public/_headers`; rechaza `'unsafe-inline'` y `'unsafe-eval'`; exige que exista una política con `script-src`. Si algo no coincide, el build falla con un mensaje que lista los hashes esperados y los encontrados. Con todo en orden informa `[verificar-csp] OK: 4 scripts y 2 estilos en línea de 2 páginas coinciden con public/_headers`.
- **Cambio en `astro.config.mjs`:** solo la importación de `verificarCsp` y su línea en la lista de integraciones, después de `bloquearPendientes()`.
- **Comprobación independiente de hashes** (script aparte, sobre `dist/index.html` y `dist/404.html`): portada con 4 scripts y 2 estilos, 404 con 3 scripts y 2 estilos, todos presentes en la política; no sobra ni falta ningún hash; el hash del script del tema coincide.
- **La política** tiene 524 caracteres y 9 directivas: `default-src 'none'`, `base-uri 'none'`, `form-action 'none'`, `frame-ancestors 'none'`, `script-src` (4 hashes y `https://static.cloudflareinsights.com`), `style-src` (`'self'` y 2 hashes), `img-src 'self'`, `font-src 'self'` y `connect-src 'self'`. Sin `'unsafe-inline'` ni `'unsafe-eval'`.
- **No existen manifest ni Workers** en el sitio (ni Service Workers ni Web Workers); por eso no se agregan `manifest-src` ni `worker-src`: lo heredado de `default-src 'none'` no afecta nada (verificación de `bitacora-05-02-ajuste-2026-10-13.md`).
- **`connect-src 'self'` bastó:** el `POST` del beacon va a `https://comunidadpulso.dev/cdn-cgi/rum?` (mismo origen, `204`); no hubo violaciones hacia `cloudflareinsights.com`.

## Despliegue 1 · solo informe

- **Push:** 2026-10-13, 16:40 (declarado por el desarrollador); commit `956cd7f`.
- **Publicación:** la cabecera `content-security-policy-report-only` ya estaba en la primera consulta del agente (16:42:13, reloj de esta máquina): **2 minutos como máximo** (cota superior, no medición exacta; el reloj de la máquina se comparó con el de Cloudflare después, ver el despliegue 2).
- **Cabeceras:** `/`, una ruta 404, el CSS y la fuente traían la política completa, idéntica carácter por carácter a la de `public/_headers`; `content-security-policy` seguía en `frame-ancestors 'none'`; `Cache-Control` y las otras tres cabeceras sin cambios.
- **Pruebas con Chrome 155.0.8059.40 por protocolo:** 0 violaciones y consola sin mensajes (salvo el aviso de red 404 de la propia página 404) en portada y 404, claro y oscuro, 1280 y 360 px, menú móvil, cambio de tema, doble clic, `reduced-motion`, tema guardado con recarga y Web Analytics. **Control positivo:** un `<script>` en línea sin hash y una imagen de `example.com` generaron 2 violaciones con disposición `report` (`security`/`info`), así que el detector las ve.
- **Declarado por el desarrollador (2026-10-13):** el build del despliegue 1 figuró «Ready» en 36 s, desde `main`, como despliegue activo (versión `d5837bb1`, 100 % del tráfico; es el ID de versión de Cloudflare, no un hash de Git); abrió el sitio en Firefox con la consola abierta y no apareció ningún error; la animación del cambio de tema funcionaba sin cambios visibles.

## Despliegue 2 · política aplicada

- **Push:** 2026-10-13, 17:10 (declarado por el desarrollador); commit `e5995fc`. `public/_headers`: la línea `Content-Security-Policy: frame-ancestors 'none'` pasó a la política completa y se quitó la de solo informe (la política es la misma que ya se había probado).
- **Publicación:** la política aplicada ya estaba en la primera consulta del agente (17:13:48, reloj de esta máquina): **3,8 minutos como máximo** (cota superior). **Diferencia de reloj medida:** el reloj de esta máquina va **64,5 s adelantado** respecto del `Date` de Cloudflare (4 respuestas, de −64,2 a −64,8 s); con la hora del servidor la consulta fue a las 17:12:44 (2,7 minutos). No se conoce la desviación del reloj del desarrollador.
- **Cabeceras:** en `/`, la 404, el CSS y la fuente, `content-security-policy` es idéntica carácter por carácter a la de `public/_headers`; `content-security-policy-report-only` ya no existe; `Cache-Control` y las otras tres cabeceras sin cambios.
- **Pruebas por protocolo (Chrome 155.0.8059.40):** 0 violaciones en todas las pruebas, con la política aplicada (ahora una violación sería un recurso bloqueado de verdad). La transición del cambio de tema existe (2 animaciones de vista de 250 y 1000 ms) y `style.setProperty` (`--vt-x`) no queda bloqueado; el tema guardado se mantiene tras recargar portada y 404 sin parpadeo; con `reduced-motion` el cambio es inmediato; el doble clic no da errores (el segundo clic cae dentro de la transición: limitación conocida AUD-02-008).
- **Control positivo con la política aplicada:** un `<script>` en línea sin hash **no se ejecutó** y una imagen de `example.com` **no cargó**: ambos quedaron bloqueados (disposición `enforce`, `security`/`error`, `blockedReason: csp`).
- **Web Analytics:** el script de Cloudflare carga (`200`, con `integrity`); el `POST` a `/cdn-cgi/rum?` responde `204`; solo hay dos orígenes en las 9 peticiones (`comunidadpulso.dev` y `static.cloudflareinsights.com`); 0 peticiones fallidas ni bloqueadas.

## Lighthouse (despliegue 2, cinco corridas alternadas, Lighthouse 13.5.0 y Chrome 155.0.8059.40)

| | Medido (mediana) | Línea base de 05-01 (Chrome 154.0.8037.98) | Umbral | Veredicto |
| :-- | :-- | :-- | :-- | :-- |
| Móvil, Rendimiento | **95** (95 en las cinco) | 99 | 95 o más | Cumple; **−4 frente a la línea base; está justo en el umbral** |
| Móvil, Accesibilidad / Prácticas / SEO | 100 / 100 / 100 | 100 / 100 / 100 | 100 | Cumple |
| Móvil, LCP / CLS | 1.933 ms / 0 | 1.799 ms / 0 | < 2,5 s / < 0,05 | Cumple |
| Móvil, Speed Index / TBT | 4.546 ms / 73 ms | 2.444 ms / 36 ms | — | Más altos |
| Escritorio, las cuatro categorías | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | — | Sin cambio |
| Escritorio, LCP / CLS | 543 ms / 0 | 511 ms / 0 | — | Cumple |

- **Auditoría de CSP de Lighthouse:** `csp-xss` (informativa) sale con puntaje 1 (pasa); «Mitigate clickjacking» sale «no aplicable». Con el despliegue 1 no se corrió Lighthouse, así que no se midió si cambió.
- **Decisión del desarrollador (2026-10-13):** acepta el Rendimiento móvil de 95 porque cumple el umbral de 95 o más. La baja de 4 puntos **no se atribuyó a la CSP ni se descartó**: el control local (mismo build con `pnpm preview`, sin CSP ni script de Cloudflare, misma máquina y Chrome 155) dio 96 a 98 con Speed Index de 3,9 a 4,4 s, pero la línea base se midió con Chrome 154. **Riesgo:** el 95 está justo en el umbral; **05-03 vuelve a medir.**
- **LCP, CLS e INP por protocolo en producción, sin estrés:** móvil 412 px, LCP 988, 596 y 640 ms, CLS 0, INP máximo 56 ms; escritorio 1280 px, LCP 564, 468 y 544 ms, CLS 0,0016, 0 y 0, INP máximo 64 ms. Cumplen LCP < 2,5 s, CLS < 0,05 e INP < 200 ms.
- **INP con CPU 4× (estrés; no es el criterio):** máximos por carga de 304, 160 y 280 ms, y en una repetición 328, 184 y 112 ms (en 05-01 esa condición había dado de 80 a 128 ms). **El control local con CPU 4× también lo superó** (máximos de 120, 160 y 312 ms), así que no es específico de la CSP.
- El peso transferido subió 824 B (107.419 B frente a 106.595 B); no se midió qué parte corresponde a la cabecera nueva.

## Declaraciones del desarrollador (2026-10-13)

1. **Revisión visual con el despliegue 2 en producción:** el cambio de tema en claro y oscuro y su animación funcionan; sin errores en la consola de Chrome ni de Firefox; el build del último despliegue figura «Ready» en Workers Builds.
2. **Lighthouse:** acepta el Rendimiento móvil de 95 porque cumple el umbral (línea base 99); la baja de 4 puntos no se atribuyó a la CSP ni se descartó; 05-03 vuelve a medir (detalle arriba).
3. **Criterios con respaldo existente:** el del hash desactualizado se probó en una copia del proyecto fuera del repositorio (6 casos de falla, `bitacora-05-02-ajuste-2026-10-13.md`) y el de la reversa tiene su procedimiento documentado en la evidencia. Ninguno se probó en producción.
4. **Observabilidad de Workers:** el desarrollador la activó en el panel y después la encontró desactivada sin haber hecho nada. Es probable que un despliegue la apagara por usar `wrangler.jsonc` como fuente de verdad (**no verificado**). Decisión: no se adopta; `wrangler.jsonc` queda sin cambios.

## Qué no se verificó

- **Safari:** no verificado (sin equipo Apple; riesgo aceptado por el desarrollador, 2026-10-12; se retoma en 05-03).
- **Firefox por protocolo:** no se midió; solo la declaración del desarrollador (consola sin errores con el despliegue 1 y con el 2). Las pruebas por protocolo son de Chrome 155.
- **Workers Builds en producción:** más allá de lo declarado por el desarrollador («Ready», versión `d5837bb1` del despliegue 1 y el último despliegue), el agente no ve el panel.
- **El hash desactualizado y la reversa en producción:** no se probaron (respaldo: copia fuera del repositorio y procedimiento documentado).
- **Lighthouse con el despliegue 1** y la causa de la baja de 4 puntos de Rendimiento móvil (ni atribuida ni descartada).
- **Observabilidad de Workers:** el efecto de `wrangler.jsonc` sobre lo activado en el panel (no verificado).

## Archivos creados o modificados en el cierre

| Archivo | Cambio |
| :-- | :-- |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/evidencia-05-02-fase-b.md` | Estado «Completada», declaraciones del desarrollador y criterios del pie |
| `_planificacion/10_epicas/epica-05-publicacion-medicion/iteracion-05-02-csp.md` | Estado «Terminada (2026-10-13)» y criterios marcados |
| `_planificacion/00_producto/registro-log.md` | Cabecera, §1, §4 y dos filas nuevas en §6 |
| `_planificacion/99_bitacora/bitacora-05-02-fase-b-2026-10-13.md` | **Nueva.** Esta bitácora |

## Criterios de aceptación (iteración 05-02)

- [x] Política completa aplicada en `public/_headers`, sin `'unsafe-inline'` en `script-src` (cabeceras de producción, medido por el agente).
- [x] Sin violaciones en la consola, en portada y 404, claro y oscuro, menú móvil y cambio de tema (medido por el agente por protocolo; consola de Chrome y Firefox declarada por el desarrollador).
- [x] El tema guardado se mantiene tras recargar y la transición de tema funciona (medido por el agente por protocolo; apariencia visual declarada por el desarrollador).
- [x] Lighthouse móvil y escritorio sin regresión: Rendimiento 95 o más y las otras categorías en 100 (aceptado por el desarrollador, 2026-10-13: Rendimiento móvil 95, línea base 99; 05-03 vuelve a medir).
- [x] Un cambio en el script del tema no puede dejar un hash desactualizado sin que se note antes del despliegue (probado en una copia fuera del repositorio; no probado en producción).
- [x] Procedimiento de reversa probado o documentado (documentado; no probado en producción).
- [x] `evidencia-05-02-fase-b.md` completada y bitácora 05-02 creada.

## Commit sugerido

`Épica 05 - Iteración 05-02: CSP aplicada en producción sin violaciones, Rendimiento móvil 95 aceptado (base 99), observabilidad de Workers no adoptada; 05-02 Terminada, solo documentación.`
