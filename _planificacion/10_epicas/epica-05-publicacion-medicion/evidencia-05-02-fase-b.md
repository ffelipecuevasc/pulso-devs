# Evidencia 05-02 · Fase B (desarrollador, con el agente midiendo)

- **Iteración:** 05-02 · Política Content-Security-Policy
- **Responsable:** desarrollador (aprueba los textos, hace los commits y los push a `main`); el agente prepara los cambios, mide y lee la consola. El agente **nunca** ejecuta `git commit`, `git push`, `git revert` ni `wrangler`.
- **Estado:** Completada
- **Fecha de los resultados:** 2026-10-13

**Cómo usar este archivo.** Sigue las partes en orden. Cada recuadro se completa con lo que realmente se ve, con fecha y hora. Lo que dice «Esperado» viene de la fase A (bitácora `99_bitacora/bitacora-05-02-2026-10-13.md`), medido en un Chrome local contra el build y no en producción: **en producción puede salir distinto**, y para eso es esta fase. Si algo no coincide, detente, anota qué ves y avisa; no improvises.

**Reglas de esta fase.**

- La política se prueba **primero en modo solo informe** y recién después se aplica (decisión del desarrollador, 2026-10-11). No se salta el primer despliegue.
- Un push a `main` publica en producción. Antes de cada push el agente deja `pnpm format`, `pnpm check` y `pnpm build` sin errores.
- El agente solo hace peticiones de solo lectura a producción (`GET` y `HEAD`). No envía `POST` a `/cdn-cgi/rum`.
- `'unsafe-inline'` no entra en `script-src` en ningún texto. Si algo lo exigiera, se detiene el trabajo y se consulta.
- **Método aprobado (declarado por el desarrollador, 2026-10-13): método C.** Hashes fijos en `public/_headers` más una integración propia que hace fallar `pnpm build` si no coinciden con `dist/`. Los textos (a) y (b) no cambiaron tras revisar las directivas heredadas de `default-src 'none'` (ver `bitacora-05-02-ajuste-2026-10-13.md`); el método y los textos (a) y (b) quedaron aprobados el 2026-10-13 (ver las partes 1 y 3).
- Los hashes y el texto exacto de la política están en la bitácora, sección «Texto propuesto». Si el HTML cambia antes del despliegue, los hashes se recalculan y el texto se vuelve a aprobar.

---

## Frases de aprobación y avisos

| Cuándo | Qué dices | Qué hace el agente después |
| :----- | :-------- | :------------------------- |
| Apruebas el diseño final de la integración `verificarCsp` y su adición a `astro.config.mjs` (archivo de configuración: exige tu consulta previa). El **método C** ya quedó aprobado el 2026-10-13 (declarado por el desarrollador); esta frase aprueba el código concreto, tal como se muestra en `bitacora-05-02-ajuste-2026-10-13.md` | «Aprobado el método (CSP)» | Crea `src/integraciones/verificarCsp.js` y agrega su línea a `astro.config.mjs` |
| Apruebas el texto del primer despliegue (solo informe) | «Aprobado el texto (CSP informe)» | Agrega la línea `Content-Security-Policy-Report-Only` a `public/_headers`, deja `format`, `check` y `build` en verde y te entrega el resumen y el mensaje de commit |
| Después de tu push del despliegue 1 | «Publicado el despliegue 1 (CSP informe)» (con la hora del push) | Confirma las cabeceras con `curl` y corre la parte 2 |
| Apruebas el texto de la política aplicada | «Aprobado el texto (CSP aplicada)» | Cambia `public/_headers` (la política completa pasa a `Content-Security-Policy` y se quita la línea de solo informe), verifica y te entrega el resumen |
| Después de tu push del despliegue 2 | «Publicado el despliegue 2 (CSP aplicada)» (con la hora del push) | Confirma las cabeceras y repite las pruebas (parte 3) |
| Si algo se rompe | «Revertido el despliegue N» (con la hora del push de la reversa) | Confirma con `curl` que volvió la cabecera anterior y anota qué falló |

---

## Parte 1 · Despliegue 1: política en modo solo informe

**Qué se publica.** Una sola línea nueva en `public/_headers`, debajo de la actual. La cabecera `Content-Security-Policy: frame-ancestors 'none'` **se mantiene igual** y sigue aplicada; la política completa viaja aparte, en `Content-Security-Policy-Report-Only`, sin endpoint de reportes (los navegadores solo la anotan en la consola y no bloquean nada).

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Content-Security-Policy: frame-ancestors 'none'
  Content-Security-Policy-Report-Only: <política completa, ver la bitácora>
```

**Pasos.**

1. Lees el texto propuesto en la bitácora y dices «Aprobado el método (CSP)» y «Aprobado el texto (CSP informe)».
2. El agente hace los cambios y entrega el resumen con los archivos y el mensaje de commit.
3. Tú haces el commit y el push a `main`. Anota la hora exacta del push.
4. Dices «Publicado el despliegue 1 (CSP informe)». El agente espera a que producción responda con la cabecera nueva y anota cuánto tardó.

| Campo | Anotación |
| :---- | :-------- |
| Frase de aprobación del método y fecha | «Aprobado el método (CSP)» · 2026-10-13 (declarado por el desarrollador) |
| Frase de aprobación del texto y fecha | «Aprobado el texto (CSP informe)» · 2026-10-13 (declarado por el desarrollador) |
| Fecha y hora del push | 2026-10-13, 16:40 (declarado por el desarrollador) |
| Hash del commit | `956cd7f` (leído de `git log` local; coincide con el mensaje del commit que muestra Workers Builds, ver la fila del build) |
| Hora en que `curl -I` ya muestra `content-security-policy-report-only` | 16:42 del 2026-10-13 (reloj de esta máquina: 16:42:13). Ya estaba visible en la **primera** consulta del agente; no se consultó antes, así que la hora exacta de aparición se desconoce |
| Minutos entre el push y esa hora (mide el tiempo de publicación de Workers Builds) | 2 como máximo (cota superior, no medición exacta) |
| `content-security-policy` sigue siendo `frame-ancestors 'none'` | Sí |
| El build de Cloudflare terminó sin errores | Sí (declarado por el desarrollador, 2026-10-13, con captura del panel de Workers Builds): el commit «Épica 05 - Iteración 05-02: CSP en modo solo informe con hashes fijos y verificación…» figura «Ready» en 36 s, desde `main`, y es el despliegue activo (versión `d5837bb1`, 100 % del tráfico). `d5837bb1` es el ID de versión de Cloudflare, no un hash de Git. La captura no se guarda en el repositorio |

### Comprobación de cabeceras en producción (agente, solo lectura)

Se piden con `Accept: text/html`, que es como Cloudflare inyecta su script.

| Recurso | `content-security-policy` esperado | `content-security-policy-report-only` esperado | Resultado |
| :------ | :--------------------------------- | :--------------------------------------------- | :-------- |
| `https://comunidadpulso.dev/` | `frame-ancestors 'none'` | La política completa | `200`; coincide (2026-10-13 16:42): `content-security-policy: frame-ancestors 'none'` y la política completa, **idéntica carácter por carácter** a la de `public/_headers` (524 caracteres) |
| Una ruta inexistente (404) | `frame-ancestors 'none'` | La política completa | `404` en `/ruta-que-no-existe`; coincide |
| `/_astro/LayoutBase.<hash>.css` | `frame-ancestors 'none'` | La política completa (llega por la regla `/*`) | `200` en `/_astro/LayoutBase.CqvnoCML.css`; coincide |
| `/_astro/fonts/<archivo>.woff2` | `frame-ancestors 'none'` | La política completa | `200` en `/_astro/fonts/bb1f54b37830a56c.woff2`; coincide |
| `Cache-Control` de `/` y de `/_astro/*` | `max-age=0, must-revalidate` y `max-age=31536000, immutable`, sin cambios | | Sin cambios: `/` y la 404 con `public, max-age=0, must-revalidate`; CSS y fuente con `public, max-age=31536000, immutable`. Las otras tres cabeceras (`x-content-type-options`, `referrer-policy`, `x-frame-options`) también siguen |

---

## Parte 2 · Pruebas en producción con el despliegue 1 (solo informe)

El agente usa Chrome lanzado por protocolo (un Chrome limpio por prueba, caché desactivada) y lee la consola con `Log.entryAdded` y los eventos `securitypolicyviolation`. En el Chrome local de la fase A, una violación de solo informe aparece en la consola como `security/info` y una violación aplicada, como `security/error`. **A confirmar en producción.** El mensaje «Failed to load resource … 404» de la página 404 es el estado de la propia página y no cuenta como violación.

Versión de Chrome usada: **155.0.8059.40** (headless, perfil limpio por prueba, caché desactivada; medido el 2026-10-13 después de las 16:42, hora de esta máquina). En 04-02 y 05-01 se usó la 154.0.8037.98; en la fase A de 05-02 estaba instalada la 155.0.8059.40.

**Cómo leer cada tabla.** «Resultado» = OK (sin violaciones) o Violación. Si hay violación, anota la directiva, el origen bloqueado y el archivo o línea.

### 2.1 Portada y 404, tema claro y oscuro

| # | Prueba | Esperado | Resultado | Violaciones (directiva · origen bloqueado · archivo) | Notas |
| :- | :----- | :------- | :-------- | :--------------------------------------------------- | :---- |
| P1 | Portada, escritorio 1280 px, tema claro (`prefers-color-scheme: light`, sin tema guardado), primera carga | Sin violaciones; `data-theme="light"` | OK | 0 | `data-theme="light"` ya en el primer `<body>`; 0 px de desborde; consola vacía |
| P2 | Portada, escritorio 1280 px, tema oscuro (`prefers-color-scheme: dark`, sin tema guardado), primera carga | Sin violaciones; `data-theme="dark"` aplicado antes de pintar | OK | 0 | `data-theme="dark"` ya en el primer `<body>` (aplicado antes de pintar); consola vacía |
| P3 | Portada, móvil 360 px, tema claro | Sin violaciones | OK | 0 | `data-theme="light"`; 0 px de desborde a 360 px; consola vacía |
| P4 | Portada, móvil 360 px, tema oscuro | Sin violaciones | OK | 0 | `data-theme="dark"`; 0 px de desborde a 360 px; consola vacía |
| P5 | Portada: pasar el cursor por el logotipo del hero (script `pulso-logo`) y desplazarse hasta el final (estado del encabezado y enlace activo del menú) | Sin violaciones; el anillo se emite y `aria-current` cambia | OK | 0 | El anillo (`is-pulsing`) pasó de `false` a `true` al pasar el cursor. `aria-current` por sección: Comunidad → `#comunidad`, Talleres → `#talleres`, Visión → `#vision`; sin enlace activo en Inicio, «Lo que encontrarás» ni «Únete» (el menú solo tiene esos tres enlaces) ni al final de la página |
| N1 | 404, escritorio 1280 px, claro | Sin violaciones (aparte del aviso 404 de la página) | OK | 0 | Solo el aviso de red «Failed to load resource … 404» de la propia página (no cuenta). `data-theme="light"` |
| N2 | 404, escritorio 1280 px, oscuro | Ídem | OK | 0 | Ídem; `data-theme="dark"` |
| N3 | 404, móvil 360 px, claro y oscuro | Ídem | OK | 0 | Medido en 360 px, claro y oscuro por separado (dos cargas). Solo el aviso 404; 0 px de desborde |

### 2.2 Menú móvil, cambio de tema y recarga

| # | Prueba | Esperado | Resultado | Violaciones | Notas |
| :- | :----- | :------- | :-------- | :---------- | :---- |
| M1 | Portada, 360 px: abrir el menú (clic real), comprobar `aria-expanded="true"`, hacer clic en un enlace del menú y volver a abrir y cerrar | Sin violaciones; el menú abre, cierra y navega al ancla | OK | 0 | `aria-expanded` `false` → `true` al abrir; el clic en «Comunidad» llevó a `#comunidad` y cerró el menú; reabrió (`true`) y cerró con el botón (`false`) |
| M2 | 404, 360 px: abrir y cerrar el menú | Sin violaciones | OK | 0 | `aria-expanded` `false` → `true` → `false`; solo el aviso 404 |
| T1 | Portada, 1280 px: clic real en el interruptor de tema, claro a oscuro, esperando 1,7 s (transición de 1 s, RDA-016) | Sin violaciones; `data-theme="dark"`; `localStorage['pulsodevs-theme']="dark"`; la transición se ve | OK | 0 | `data-theme` `light` → `dark`; `localStorage['pulsodevs-theme']` = `dark`. A los 150 ms existen 2 animaciones de transición de vista: `::view-transition-group(root)` de 250 ms y `::view-transition-new(root)` de **1000 ms**; `--vt-x` quedó en `1086.5px` (la escritura con `style.setProperty` no violó `style-src`). **Que la animación se vea bien solo lo confirma el desarrollador** (sin pantalla) |
| T2 | Lo mismo, oscuro a claro | Sin violaciones; `data-theme="light"`; transición | OK | 0 | `data-theme` `dark` → `light`; guardado `light`; mismas 2 animaciones (250 ms y 1000 ms); `--vt-x` = `1086.5px` |
| T3 | Dos clics seguidos en el interruptor (interrumpir la transición) | Sin violaciones ni errores en consola | OK | 0 | Dos clics a 250 ms: sin errores ni violaciones. Quedó `dark` y guardado `dark` (el segundo clic no llegó a la página: cayó dentro de la transición, la limitación conocida de AUD-02-008; el estado es consistente) |
| T4 | Con el tema oscuro guardado, recargar la portada | Sin violaciones; `data-theme="dark"` desde la primera pintura (sin parpadeo claro) | OK | 0 | Con `dark` guardado y el sistema en claro, tras recargar: `data-theme="dark"` ya en el primer `<body>` (sin parpadeo claro) |
| T5 | Con el tema claro guardado, recargar la portada y la 404 | Ídem con `light` | OK | 0 | Con `light` guardado y el sistema en oscuro, tras recargar la portada y la 404 (dos cargas): `data-theme="light"` ya en el primer `<body>`; la 404 solo con su aviso 404 |
| T6 | Cambio de tema con `prefers-reduced-motion: reduce` | Sin violaciones; el cambio es inmediato | OK | 0 | Con `prefers-reduced-motion: reduce`: a los 120 ms ya estaba `dark` y guardado `dark`; 0 animaciones de transición de vista |

La transición usa `element.style.setProperty` (propiedades `--vt-x`, `--vt-y`, `--vt-r`), que escribe por el modelo de objetos de CSS. No consulté en esta fase el texto de la especificación para confirmar que eso queda fuera de `style-src`: lo que sí se midió es que en el Chrome local el clic cambió el tema y no hubo violaciones. Ahí no se vio la animación (sin pantalla); **la transición visual solo se confirma aquí.**

### 2.3 Web Analytics (la parte más incierta)

| # | Prueba | Esperado | Resultado | Violaciones | Notas |
| :- | :----- | :------- | :-------- | :---------- | :---- |
| W1 | Portada: la etiqueta `<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/…">` se carga | La petición sale con `200`; sin violaciones en `script-src` | OK | 0 | Etiqueta presente: `<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/v4bc70e…">` con `integrity`; respuesta `200` |
| W2 | Ocultar la página (navegar a `about:blank` o cambiar de pestaña) y mirar las peticiones | Una petición `POST` a `https://comunidadpulso.dev/cdn-cgi/rum` (mismo origen); sin violaciones en `connect-src` | OK (con una diferencia) | 0 | El `POST` a `https://comunidadpulso.dev/cdn-cgi/rum?` (mismo origen, `204`) salió **durante la carga**, no al ocultar la página; al navegar a `about:blank` no hubo otra petición. Coincide con la petición `/cdn-cgi/rum` de 05-01. Sin violaciones de `connect-src` |
| W3 | Origen real del envío del beacon | Mismo origen (`/cdn-cgi/rum`), como indica la FAQ de Cloudflare y se midió en producción en 05-01. **Si aparece una violación hacia `cloudflareinsights.com`, anota el origen exacto:** resuelve la duda de `connect-src` | OK | 0 | Mismo origen (`/cdn-cgi/rum`); ninguna violación hacia `cloudflareinsights.com`. **`connect-src 'self'` basta**, como indica la FAQ de Cloudflare |
| W4 | Otras peticiones de Cloudflare que no estén en el inventario (cualquier origen fuera de `static.cloudflareinsights.com` y del propio dominio) | Ninguna | OK | 0 | Orígenes vistos en 9 peticiones: `comunidadpulso.dev` y `static.cloudflareinsights.com`; ninguno más; 0 peticiones fallidas ni bloqueadas |

El agente **no** envía ningún `POST` a producción: el envío del beacon lo hace el propio navegador en la prueba y solo se observa.

**Cómo se midió la parte 2 (agente, 2026-10-13).** Script propio sobre el protocolo de Chrome (sin biblioteca), un Chrome limpio por prueba, tamaños 1280 y 360 px, `prefers-color-scheme` y `prefers-reduced-motion` emulados, clics reales (`Input.dispatchMouseEvent`). Las violaciones se leen con un escucha de `securitypolicyviolation` (instalado antes de cargar la página) y con la consola (`Log.entryAdded`, excepciones y `console.error`). **Control positivo:** insertar un `<script>` en línea sin hash y cargar una imagen de `example.com` produjo 2 violaciones (`script-src-elem` e `img-src`, disposición `report`) y 2 mensajes `security`/`info` en la consola, así que el detector sí ve las violaciones; en solo informe aparecen como `info`, no como `error`. Las visitas de prueba a producción quedan registradas en Web Analytics como tráfico de Chrome headless. El script de medición vive en la carpeta temporal de la sesión, no en el repositorio.

**Resultado de la parte 2:** 0 violaciones en todas las cargas medidas (P1 a P5, N1 a N3 en dos temas, M1, M2, T1 a T6 y W) y consola sin mensajes, salvo el aviso de red 404 de la propia página 404. El texto (b) quedó aprobado el 2026-10-13 (ver la parte 3).

**Confirmaciones del desarrollador con el despliegue 1 (declaradas, 2026-10-13; no son mediciones del agente).** Firefox: abrió el sitio con la consola abierta y no apareció ningún error. Cambio de tema: la animación funciona sin cambios visibles. La revisión visual del cambio de tema **después del despliegue 2** quedó declarada el 2026-10-13 (ver la parte 3).

---

## Parte 3 · Despliegue 2: política aplicada

Solo se pasa a esta parte si la parte 2 no tiene violaciones, o si las violaciones se resolvieron con un texto nuevo que **vuelves a aprobar** (y se repite la parte 2).

**Qué se publica.** `public/_headers` reemplaza `Content-Security-Policy: frame-ancestors 'none'` por la política completa (que ya incluye `frame-ancestors 'none'`) y se quita la línea de solo informe.

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Content-Security-Policy: <política completa, ver la bitácora>
```

| Campo | Anotación |
| :---- | :-------- |
| Frase de aprobación y fecha | «Aprobado el texto (CSP aplicada)» · 2026-10-13 (declarado por el desarrollador) |
| Fecha y hora del push | 2026-10-13, 17:10 (declarado por el desarrollador) |
| Hash del commit | `e5995fc` (leído de `git log` local) |
| Minutos entre el push y la cabecera visible | 3,8 como máximo (cota superior, no medición exacta): la primera consulta fue a las 17:13:48 (reloj de esta máquina) y la política aplicada ya estaba. El reloj de esta máquina va **64,5 s adelantado** respecto del `Date` de Cloudflare (medido en 4 respuestas: −64,2 a −64,8 s), así que según la hora del servidor la consulta fue a las 17:12:44 (2,7 min). No se conoce la desviación del reloj del desarrollador |
| `content-security-policy` ya trae la política completa y no existe `content-security-policy-report-only` | Sí. En `/`, la 404, el CSS y la fuente: `content-security-policy` idéntica carácter por carácter a la de `public/_headers` (524 caracteres), sin `content-security-policy-report-only`; `Cache-Control` y las otras tres cabeceras sin cambios |
| El build de Cloudflare terminó sin errores | Sí (declarado por el desarrollador, 2026-10-13): el build del último despliegue figura «Ready» en Workers Builds |

Se repiten **todas** las pruebas de la parte 2 con la política aplicada. Ahora una violación es un recurso bloqueado de verdad (`security/error`).

| Bloque | Resultado | Violaciones | Notas |
| :----- | :-------- | :---------- | :---- |
| P1 a P5 (portada) | OK | 0 | Chrome 155.0.8059.40. Sin violaciones ni mensajes en consola. Tema aplicado en el primer `<body>`; 0 px de desborde (1280 y 360 px, claro y oscuro); el anillo del logotipo se emite (`false` → `true`); `aria-current` cambia en `#comunidad`, `#talleres` y `#vision` |
| N1 a N3 (404) | OK | 0 | Solo el aviso de red 404 de la propia página (1280 y 360 px, claro y oscuro) |
| M1 y M2 (menú) | OK | 0 | `aria-expanded` `false` → `true` → `false`; el enlace «Comunidad» lleva a `#comunidad` y cierra el menú; igual en la 404 |
| T1 a T6 (tema, transición y recarga) | OK | 0 | Claro ↔ oscuro y guardado en `localStorage`; la transición existe (2 animaciones de vista, 250 ms y 1000 ms) y `style.setProperty` (`--vt-x` = `1086.5px`) **no queda bloqueado**; doble clic sin errores (el segundo clic cae dentro de la transición, AUD-02-008); tema guardado se mantiene tras recargar portada y 404, sin parpadeo; con `reduced-motion` el cambio es inmediato. **Revisión visual (declarado por el desarrollador, 2026-10-13):** con el despliegue 2 en producción, el cambio de tema en claro y oscuro y su animación funcionan; sin errores en la consola de Chrome ni de Firefox |
| W1 a W4 (Web Analytics) | OK | 0 | El script de Cloudflare carga (`200`, con `integrity`). El `POST` a `https://comunidadpulso.dev/cdn-cgi/rum?` (mismo origen) responde `204` y sale durante la carga; sin otra petición al ocultar la página. **`connect-src 'self'` basta.** Solo hay dos orígenes en las 9 peticiones: `comunidadpulso.dev` y `static.cloudflareinsights.com`; 0 peticiones fallidas ni bloqueadas |
| Cabeceras de `/`, 404, CSS y fuente | OK | — | Ver la tabla de campos de arriba |

**Control positivo con la política aplicada** (en la página de prueba, sin tocar el sitio): un `<script>` insertado en línea sin hash **no se ejecutó** (`window.__x` quedó sin definir) y una imagen de `example.com` **no cargó**. Ambos quedaron **bloqueados**: eventos `securitypolicyviolation` con disposición `enforce` (`script-src-elem` e `img-src`), mensajes `security`/`error` en la consola («The action has been blocked») y fallos de red con `blockedReason: csp`. Así que el detector ve las violaciones reales y el 0 de las pruebas no es un falso negativo.

---

## Parte 4 · Lighthouse

Mediana de **cinco corridas alternadas** (móvil 1, escritorio 1, móvil 2…), Lighthouse 13.5.0 con `pnpm dlx` fuera del proyecto, la misma herramienta y el mismo método de 04-02 y 05-01. Se anota la versión de Chrome usada.

**Línea base de 05-01 (producción con Web Analytics, 2026-10-13):**

| | Móvil | Escritorio |
| :-- | :-- | :-- |
| Rendimiento / Accesibilidad / Prácticas recomendadas / SEO | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| LCP (mediana) | 1.799 ms | 511 ms |
| CLS | 0 | 0 |
| TBT | 36 ms | 0 ms |
| Peticiones y peso | 9 y 106.595 B | 9 y 106.024 B |

**Criterio:** Rendimiento 95 o más, Accesibilidad 100, Prácticas recomendadas 100 y SEO 100, móvil y escritorio, sin regresión frente a la línea base.

| Medición | Rendimiento | Accesibilidad | Prácticas | SEO | LCP | CLS | TBT | Peticiones |
| :------- | :---------- | :------------ | :-------- | :-- | :-- | :-- | :-- | :--------- |
| Despliegue 1, móvil (cinco corridas y mediana) | no medido | — | — | — | — | — | — | — |
| Despliegue 1, escritorio | no medido | — | — | — | — | — | — | — |
| Despliegue 2, móvil (mediana de cinco) | 95 | 100 | 100 | 100 | 1.933 ms | 0 | 73 ms | 9 (107.419 B) |
| Despliegue 2, escritorio (mediana de cinco) | 100 | 100 | 100 | 100 | 543 ms | 0 | 0 ms | 9 (106.836 B) |

| Campo | Anotación |
| :---- | :-------- |
| Versión de Chrome y de Lighthouse | Chrome 155.0.8059.40 y Lighthouse 13.5.0 (`pnpm dlx`, fuera del proyecto). La línea base de 05-01 se midió con Chrome 154.0.8037.98 |
| ¿Cambió la auditoría de CSP de Lighthouse entre ambos despliegues? (anotar el texto exacto; la fase A no la midió) | Con el despliegue 2, la auditoría «Ensure CSP is effective against XSS attacks» (`csp-xss`, informativa) sale con puntaje 1 (pasa), sin valor mostrado, en móvil y escritorio; «Mitigate clickjacking with XFO or CSP» sale «no aplicable». Si cambió respecto del despliegue 1: **no medido** (no se corrió Lighthouse con el despliegue 1) |
| ¿Hubo regresión frente a la línea base? | **Sin determinar** (decide el desarrollador). El Rendimiento móvil bajó de 99 a 95 (−4): cumple el umbral numérico (95 o más) y las otras tres categorías y el escritorio no cambian, pero no se puede afirmar «sin regresión». Ver la nota de abajo. **Aceptado por el desarrollador (2026-10-13):** el umbral se cumple; la baja de 4 puntos no se atribuyó a la CSP ni se descartó; 95 está en el umbral |

**Notas de la medición del despliegue 2 (agente, 2026-10-13, después de las 17:13, hora de esta máquina).**

- **Lighthouse móvil, cinco corridas alternadas con las de escritorio:** Rendimiento 95, 95, 95, 95, 95; LCP 1.994, 1.975, 1.933, 1.875, 1.930 ms; FCP mediana 1.851 ms; TBT 73, 83, 0, 0, 132 ms; **Speed Index 4.531, 4.546, 4.570, 4.547, 4.476 ms** (mediana 4.546 ms); CLS 0 en las cinco; 9 peticiones. Escritorio: 100 en las cinco; LCP 558, 541, 560, 530, 543 ms; CLS 0, 0, 0,0001, 0, 0,0001. Sin advertencias de ejecución. Accesibilidad, Mejores prácticas y SEO en 100 en las diez corridas.
- **Línea base de 05-01 (Chrome 154), móvil:** 99 / 100 / 100 / 100; LCP mediana 1.799 ms; FCP 1.717 ms; TBT 36 ms; **Speed Index mediana 2.444 ms**; 106.595 B. La baja del Rendimiento viene del Speed Index (4,5 s frente a 2,4 s), con LCP, FCP y TBT algo más altos. El peso transferido subió 824 B (107.419 B frente a 106.595 B); no se midió qué parte corresponde a la cabecera nueva.
- **Control local (misma máquina, Chrome 155, mismo Lighthouse):** el mismo build servido con `pnpm preview` (sin cabecera de CSP ni script de Cloudflare), tres corridas móviles: Rendimiento 97, 98 y 96; Speed Index 4.068, 3.926 y 4.353 ms; LCP 1.676, 1.673 y 1.598 ms. En 04-02 el Speed Index del mismo build ya salía en dos modos (≈ 1,2 s y ≈ 4,1 s). Así que el Speed Index lento aparece también sin CSP, pero **esto no demuestra la causa**: no hay una medición de producción anterior al despliegue 2 con Chrome 155, y la producción incluye además el script de Cloudflare.
- **LCP, CLS e INP por protocolo en producción (tres cargas por condición, dos clics reales cada una; INP en ms por evento):** móvil 412 px, LCP 988, 596 y 640 ms (`p.hero__sub`), CLS 0, INP máximo 56; escritorio 1280 px, LCP 564, 468 y 544 ms (`span.hero__wordmark`), CLS 0,0016, 0 y 0, INP máximo 64. **Con CPU 4× (estrés, no es el criterio):** LCP 1.512, 1.116 y 3.484 ms, INP máximo por carga 304, 160 y 280 ms; en una repetición de la misma condición, LCP 1.916, 3.368 y 3.036 ms e INP máximo 328, 184 y 112 ms. En 05-01 esa condición dio INP de 80 a 128 ms y LCP de 1.136 a 1.596 ms. **Control local con CPU 4×:** LCP 912, 824 y 1.212 ms e INP máximo 120, 160 y 312 ms, así que los INP de ~300 ms con CPU 4× también ocurren sin CSP en esta máquina. En las condiciones sin estrés, INP < 200 ms, LCP < 2,5 s y CLS < 0,05 se cumplen.

---

## Parte 5 · Procedimiento de reversa

**Cuándo revertir.** Cualquiera de estas señales después del despliegue 2 (o del 1, si el sitio se ve distinto):

- Una violación `security/error` en un flujo normal (carga, menú, cambio de tema, recarga).
- El tema no se aplica antes de pintar (parpadeo) o la transición no funciona.
- El menú móvil no abre.
- Web Analytics deja de enviar (violación en `script-src` o `connect-src`): no rompe el sitio, pero es una regresión de RDA-010 y se decide con el desarrollador si se corrige hacia adelante o se revierte.

**Antes de revertir, anota** (así no se repite el error): hora y commit del despliegue, página, tema y ancho, directiva violada, origen bloqueado, archivo o línea, y el resultado de `curl -I` de `/`. Una captura de la consola sirve; no debe incluir datos privados.

**Cómo volver atrás.**

1. Decides revertir y avisas al agente.
2. **Tú** ejecutas la operación de Git: `git revert <hash del commit del despliegue>` crea un commit nuevo que deshace el cambio sin reescribir el historial (la alternativa, `git reset`, está fuera de lo que el agente puede hacer y reescribe historial). Haces `push` a `main`. El agente no ejecuta ninguna operación de Git que modifique el repositorio.
3. Workers Builds recompila y publica solo lo que hay en `main`. Dices «Revertido el despliegue N» con la hora del push.
4. El agente comprueba con `curl -I` que `/` vuelve a responder con la cabecera anterior y anota cuánto tardó.
   - Revertir el despliegue 2 deja la política en modo solo informe más `frame-ancestors 'none'` aplicado (estado del despliegue 1).
   - Revertir también el despliegue 1 deja solo `frame-ancestors 'none'`, como estaba antes de 05-02.
5. **Antes de volver a intentarlo,** el agente escribe qué falló en la bitácora de 05-02 (con lo anotado arriba), se ajusta el texto y **se vuelve a aprobar** con la frase correspondiente.

**Tiempo de publicación.** Cloudflare documenta que un push a la rama de producción crea una versión y la promueve a despliegue activo, pero **no da un plazo** (consultado el 2026-10-13). Tampoco hay una medición propia previa: en 04-02 la cabecera nueva se vio en producción después del push, pero no se anotó cuánto tardó. En esta fase se mide con las filas «Minutos entre el push y la cabecera visible» de las partes 1 y 3; la reversa debería tardar parecido, pero se anota su tiempo aparte.

| Campo | Anotación |
| :---- | :-------- |
| ¿Fue necesario revertir? | Sí / No |
| Si fue necesario: fecha, hora, commit revertido y qué falló | |
| Minutos entre el push de la reversa y la cabecera anterior visible | |

---

## Criterios de aceptación que cubre esta evidencia

- [x] Política completa aplicada en `public/_headers`, sin `'unsafe-inline'` en `script-src`.
- [x] Sin violaciones en la consola, en portada y 404, claro y oscuro, menú móvil y cambio de tema.
- [x] El tema guardado se mantiene tras recargar y la transición de tema funciona. _Tema guardado y transición medidos por el agente por protocolo; apariencia visual declarada por el desarrollador, 2026-10-13._
- [x] Lighthouse móvil y escritorio (mediana de cinco corridas alternadas) sin regresión: Rendimiento 95 o más, Accesibilidad 100, Mejores prácticas 100, SEO 100. _Aceptado por el desarrollador (2026-10-13): Rendimiento móvil 95 (mediana de cinco), justo en el umbral; línea base de 05-01: 99; la baja de 4 puntos no se atribuyó a la CSP ni se descartó; 05-03 vuelve a medir. Escritorio 100 / 100 / 100 / 100 y las otras tres categorías móviles en 100, medido por el agente._
- [x] Un cambio en el script del tema no puede dejar un hash desactualizado sin que se note antes del despliegue. _Respaldo: prueba en una copia del proyecto fuera del repositorio, 6 casos de falla (`bitacora-05-02-ajuste-2026-10-13.md`); no se probó en producción. Declarado por el desarrollador (2026-10-13)._
- [x] Procedimiento de reversa probado o documentado. _Documentado (parte 5 de `evidencia-05-02-fase-b.md`); no probado en producción._
- [x] `evidencia-05-02-fase-b.md` completada y bitácora 05-02 creada (la bitácora de la fase A ya existe; el cierre está en `bitacora-05-02-fase-b-2026-10-13.md`).
