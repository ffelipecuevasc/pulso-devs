# Evidencia 05-01 · Fase B (desarrollador)

- **Iteración:** 05-01 · Medición: Cloudflare Web Analytics y Search Console
- **Responsable:** desarrollador (solo él opera Cloudflare y Search Console; el agente mide la producción cuando él avisa)
- **Estado:** Pendiente (preparada en la fase A, 2026-10-13)
- **Fecha de los resultados:** _(completar)_

**Cómo usar este archivo.** Sigue los pasos en orden y anota en cada recuadro lo que realmente ves, con fecha y hora. Esta guía **no supone cómo se ven las pantallas**: los nombres de menús y botones salen de la documentación de Cloudflare y de Google (fuentes al final de cada bloque) y pueden haber cambiado. Si una pantalla no coincide con lo que dice este archivo, **detente, anota qué ves (o toma una captura) y avísale al agente**; no improvises.

**Reglas de esta fase.**

- El agente no toca Cloudflare ni Search Console. Solo mide la producción cuando tú avisas.
- Registra la **hora exacta** (con zona horaria) de cada cambio. El agente la usa para saber desde cuándo medir.
- No hagas push ni redespliegues para «ayudar» al cambio: si el script no desaparece o no vuelve, avisa antes de tocar nada más.

---

## Parte 1 · Web Analytics: desactivar y, si corresponde, reactivar

### Lo que se verificó en la documentación (fase A, 2026-10-13)

- La documentación de Web Analytics para sitios que pasan por el proxy de Cloudflare dice que la configuración automática está activa por defecto y que, en **Manage Site**, hay tres opciones: «Enable, excluding visitor data in the EU», «Enable with JS Snippet installation» y «Disable» (con «Disable» el snippet no se inyecta).
- Esa documentación **no menciona Workers con recursos estáticos** ni indica **cuánto demora** el cambio. Para Cloudflare Pages dice que el snippet se agrega «en el próximo despliegue»; para un Worker no hay dato oficial.
- Hay mensajes de la comunidad de Cloudflare que describen que, cuando el sitio se administra desde Pages o Workers, el botón de Web Analytics puede venir bloqueado y el interruptor estar en la **configuración del proyecto** (Workers & Pages → proyecto → Settings). **No pude abrir esos mensajes (error 403), así que es solo una pista, no una fuente verificada.**
- Consecuencia: **no sé cuál de las dos pantallas controla la inyección en tu caso.** El primer paso es averiguarlo mirando, sin cambiar nada.

### Paso 1.1 · Mirar sin cambiar nada

1. Entra al panel de Cloudflare y abre **Web Analytics**.
2. Busca `comunidadpulso.dev` en la lista de sitios.
3. Abre **Manage site** (o el nombre equivalente) y lee las opciones sin tocar nada.
4. Anota abajo qué opciones ves, cuál está seleccionada y si hay algún aviso del tipo «administra este sitio desde Workers & Pages» o un botón bloqueado.
5. Si Web Analytics no muestra el sitio, mira en **Workers & Pages → tu proyecto → Settings** (o **Metrics**) si hay una sección de Web Analytics, y anota lo que ves.

| Campo | Anotación |
| :---- | :-------- |
| Fecha y hora | |
| Dónde encontraste el control de Web Analytics (Web Analytics → Manage site, o el proyecto en Workers & Pages) | |
| Opciones visibles y cuál está seleccionada | |
| Avisos o botones bloqueados | |
| Captura (nombre del archivo, sin datos privados) | |

> Si no encuentras ningún control o el único botón está bloqueado, **detente y avisa al agente.** No se puede cumplir el método de «con y sin script» sin ese control.

### Paso 1.2 · Desactivar la inyección y avisar

1. Antes de cambiar nada, **avisa al agente** («voy a desactivar») para que confirme que la producción sigue mostrando el script. El agente lo comprueba con `curl` y te responde.
2. Con el control que encontraste en 1.1, elige **Disable** (o la opción equivalente que el panel muestre para dejar de inyectar el script) y guarda.
3. Anota la hora exacta en que guardaste.
4. **Avisa al agente: «desactivado a las HH:MM».**

**El agente, al recibir el aviso, hace lo siguiente (no lo hagas tú):**

- Pide la portada con `Accept: text/html` cada pocos minutos hasta que la etiqueta `<script … cloudflareinsights …>` deje de aparecer, y anota cuántos minutos tardó (la documentación no da un plazo).
- Si pasan **30 minutos** y el script sigue apareciendo, **se detiene y te lo informa**, sin pedir un redespliegue. Tú decides el paso siguiente.
- Cuando el script ya no aparece, mide **cinco corridas alternadas** de Lighthouse (móvil y escritorio), INP por protocolo, peso y peticiones, con el mismo método de la fase A, y llena la columna «Sin script» de la tabla de abajo.

| Campo | Anotación |
| :---- | :-------- |
| Hora en que guardaste el cambio (con zona horaria) | |
| Hora en que avisaste al agente | |
| Qué botón u opción elegiste (texto exacto que viste) | |
| ¿El panel mostró algún mensaje (por ejemplo, «puede demorar»)? | |
| Resultado del agente: minutos hasta que el script dejó de aparecer | |
| Observaciones | |

### Paso 1.3 · Decidir RDA-010 con la tabla

Con la tabla completa, decide:

- **Mantener:** pasa al paso 1.4 (reactivar y volver a medir).
- **Descartar:** el script queda desactivado. El agente propone el texto de `AGENTS.md` §7.3 que deja la regla coherente (propuesta B de la bitácora) y se actualizan RDA-010 y `registro-log.md` §4.

| Campo | Anotación |
| :---- | :-------- |
| Fecha de la decisión | |
| Decisión (mantener o descartar) | |
| Motivo (con los datos de la tabla) | |

### Paso 1.4 · Reactivar la inyección (solo si decidiste mantener) y avisar

1. Con el mismo control del paso 1.1, vuelve a la opción que usabas antes (por defecto estaba «Enable» de la configuración automática) y guarda.
2. Anota la hora exacta.
3. **Avisa al agente: «reactivado a las HH:MM».**
4. El agente espera a que el script vuelva a aparecer con `Accept: text/html`, repite las mediciones y llena la columna «Reactivado».

| Campo | Anotación |
| :---- | :-------- |
| Opción que dejaste seleccionada (texto exacto) | |
| Hora en que guardaste el cambio (con zona horaria) | |
| Hora en que avisaste al agente | |
| Resultado del agente: minutos hasta que el script volvió a aparecer | |
| Observaciones | |

### Tabla comparativa (la llena el agente en la fase B)

La columna «Con script (fase A)» ya trae la línea base medida el 2026-10-13 (mediana de cinco corridas alternadas; detalle en la bitácora 05-01 y en `evidencia-05-01-fase-a-datos.json`). Las demás columnas se llenan con el mismo método y el mismo formato.

| Medición | Con script (fase A) | Sin script | Diferencia | Reactivado (si aplica) |
| :------- | :------------------ | :--------- | :--------- | :--------------------- |
| Rendimiento móvil | 99 | | | |
| Accesibilidad móvil | 100 | | | |
| Prácticas recomendadas móvil | 100 | | | |
| SEO móvil | 100 | | | |
| Rendimiento escritorio | 100 | | | |
| Accesibilidad escritorio | 100 | | | |
| Prácticas recomendadas escritorio | 100 | | | |
| SEO escritorio | 100 | | | |
| FCP móvil / escritorio | 1.717 / 491 ms | | | |
| LCP móvil / escritorio (Lighthouse) | 1.799 / 511 ms | | | |
| CLS móvil / escritorio | 0 / 0 | | | |
| TBT móvil / escritorio | 36 / 0 ms | | | |
| Speed Index móvil / escritorio | 2.444 / 1.033 ms | | | |
| INP por protocolo (móvil 412 px, sin estrangular) | 32 a 48 ms | | | |
| INP por protocolo (móvil, CPU 4×) | 80 a 128 ms | | | |
| Peso de la primera vista, móvil (Lighthouse) | 106.595 B | | | |
| Peso de la primera vista, escritorio (Lighthouse) | 106.024 B | | | |
| Peticiones (móvil / escritorio) | 9 / 9 | | | |
| Peticiones a terceros | 1 (`static.cloudflareinsights.com`) | | | |
| JavaScript propio (en línea en el HTML) | 3.716 B en 4 scripts, 0 archivos | | | |
| JavaScript de Cloudflare (`beacon.min.js`, transferido) | 10.438 B | | | |
| Petición de Cloudflare `/cdn-cgi/rum` | 428 a 501 B | | | |
| HTML con `Accept: text/html` (sin comprimir) | 47.994 B | | | |
| El script aparece con `Accept: text/html` | Sí | | | |
| El script aparece sin esa cabecera | No | | | |

---

## Parte 2 · Google Search Console

### Lo que se verificó antes de escribir esto

- **Páginas del sitio.** El sitemap del build (`dist/sitemap-0.xml`, generado el 2026-10-13) y el de producción son iguales y contienen **una sola URL: `https://comunidadpulso.dev/`**. El sitio es de una sola página y las secciones (`#comunidad`, `#talleres`, etc.) son anclas, no URL aparte. La página 404 lleva `noindex` y no está en el sitemap. Por eso la única «página principal» que se solicita es **la portada**.
- `https://comunidadpulso.dev/sitemap-index.xml` apunta a `https://comunidadpulso.dev/sitemap-0.xml`, y `robots.txt` lo declara.
- `https://www.comunidadpulso.dev/` responde `301` hacia `https://comunidadpulso.dev/`.
- El dominio **no tiene hoy ningún registro TXT** (consulta DNS del 2026-10-13), así que no hay una verificación anterior.
- Fuentes de Google (consultadas el 2026-10-13): verificación del dominio por DNS (`support.google.com/webmasters/answer/9008080`), envío del sitemap (`support.google.com/webmasters/answer/7451001`), herramienta de inspección de URL (`support.google.com/webmasters/answer/9012289`) y plazos de rastreo (`developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl`).

### Paso 2.1 · Verificar la propiedad por DNS

Según Google, la verificación por DNS es la que corresponde a una propiedad de tipo **Dominio** (`comunidadpulso.dev`, sin `https://`). Una propiedad de dominio cubre `http`, `https` y los subdominios como `www`.

1. En Search Console, agrega una propiedad nueva y elige el tipo **Dominio**. Escribe `comunidadpulso.dev`.
2. Search Console muestra un valor TXT único. Según Google, empieza con `google-site-verification=`. **Cópialo completo, sin modificarlo.** No lo pegues en este archivo ni en ningún archivo del repositorio: es un dato de tu cuenta.
3. Si Search Console ofrece conectarse con tu proveedor de DNS (Cloudflare), puedes usar esa opción; Google dice que así la verificación debería ser inmediata. Si no, sigue con el paso 4.
4. En el panel de Cloudflare, abre el DNS del dominio → **Records** → **Add record**. Tipo **TXT**. En el nombre, Google indica dejar el campo vacío o escribir `@` según el proveedor; **la documentación de Cloudflare que revisé no confirma cuál de los dos usa su pantalla**, así que usa el que acepte el panel y anota cuál fue. En el contenido, pega el valor de Search Console. Guarda.
5. Vuelve a Search Console y pulsa **Verificar**.
6. Si falla, Google dice que el registro puede tardar en propagarse (hasta dos o tres días en el peor caso). Espera y reintenta; no borres ni cambies el registro mientras tanto.
7. **No elimines el registro TXT después de verificar.** Google advierte que, si lo quitas, puedes perder la verificación.

| Campo | Anotación |
| :---- | :-------- |
| Fecha y hora | |
| Tipo de propiedad elegido | |
| ¿Usaste la conexión automática con Cloudflare o el registro TXT manual? | |
| Nombre del registro TXT (vacío o `@`, según lo que aceptó el panel) | |
| Resultado de «Verificar» (texto exacto) | |
| Si falló: mensaje y fecha del reintento | |

El agente puede comprobar que el registro TXT es público con una consulta DNS de solo lectura si se lo pides (no necesita el valor; solo confirma que existe un TXT con el prefijo `google-site-verification=`).

### Paso 2.2 · Enviar el sitemap

1. En Search Console, abre el informe **Sitemaps** de la propiedad.
2. Escribe la URL completa `https://comunidadpulso.dev/sitemap-index.xml` en el cuadro de agregar sitemap y envíalo.
3. Anota **la fecha del envío**: desde ese día cuentan los 14 días de la regla de la parte 3.
4. Mira el estado que muestra el informe. Google describe tres: «Success» (se leyó sin errores), «Has errors» y «Couldn't fetch». En español pueden tener otro nombre: **anota el texto exacto que veas.** La iteración exige el estado «Correcto» (o su equivalente en tu idioma).

| Campo | Anotación |
| :---- | :-------- |
| Fecha y hora del envío | |
| URL enviada | |
| Estado mostrado (texto exacto) | |
| Páginas descubiertas (si el informe lo muestra) | |
| Si hay errores: texto del error | |

### Paso 2.3 · Inspeccionar la portada y solicitar la indexación

Solo hay una URL en el sitemap, así que solo se inspecciona una. No solicites la 404 ni las anclas.

1. En la barra de inspección de URL de Search Console, escribe `https://comunidadpulso.dev/` (la URL debe pertenecer a la propiedad abierta).
2. Anota el estado que informa la herramienta. Google usa estos: «URL is on Google», «URL is on Google, but has issues» y «URL is not on Google». **Anota el texto tal como aparezca.**
3. Si dice que no está en Google, pulsa **Solicitar indexación**. Google advierte que la solicitud no garantiza que la página aparezca ni da un plazo (habla de «un día o algo más» y, en otra página, de «de unos días a unas semanas»), y que repetir la solicitud para la misma URL no la acelera. **Pídela una sola vez.**
4. Anota si apareció algún aviso (por ejemplo, un límite diario de solicitudes).

| Campo | Anotación |
| :---- | :-------- |
| Fecha y hora | |
| URL inspeccionada | `https://comunidadpulso.dev/` |
| Estado de indexación (texto exacto) | |
| ¿Solicitaste indexación? | |
| Avisos de la herramienta | |
| Captura (nombre del archivo, sin datos privados) | |

---

## Parte 3 · Estado de indexación y regla de los 14 días

La indexación **se registra con fecha** y no se exige para cerrar la épica (decisión del 2026-10-12). Si pasan **14 días corridos desde el envío del sitemap** y la portada sigue sin indexarse, se abre un seguimiento aparte (una fila en `registro-log.md` §4, no una iteración nueva).

**Cálculo.** Fecha de envío del sitemap (paso 2.2) + 14 días = fecha de revisión. Ejemplo: enviado el 2026-10-15 → revisar el 2026-10-29.

| Fecha de revisión | Estado de `https://comunidadpulso.dev/` (texto exacto) | Estado del sitemap | Observaciones |
| :---------------- | :----------------------------------------------------- | :----------------- | :------------ |
| _(el día del envío)_ | | | |
| _(a los 3 a 7 días)_ | | | |
| _(a los 14 días)_ | | | |

| Campo | Anotación |
| :---- | :-------- |
| Fecha de envío del sitemap | |
| Fecha límite (envío + 14 días) | |
| ¿Indexada a la fecha límite? | |
| Si no: ¿se abrió seguimiento aparte? (fila de `registro-log.md` §4) | |

---

## Resumen de avisos al agente

| Cuándo | Qué decir |
| :----- | :-------- |
| Antes de desactivar la inyección | «Voy a desactivar Web Analytics» |
| Justo después de guardar | «Desactivado a las HH:MM» |
| Si decides mantener y reactivas | «Reactivado a las HH:MM» |
| Si algo no coincide con esta guía | Describe lo que ves y detente |
| Cuando termines la parte 2 | Las fechas y estados anotados arriba |

## Criterios de aceptación que cubre esta evidencia

- [ ] Mediciones de la producción con y sin el script, en cinco corridas alternadas (tabla comparativa, columna «Sin script»).
- [ ] RDA-010 decidida («Aceptada» o «Descartada») con la tabla.
- [ ] Search Console con la propiedad verificada y el sitemap en estado «Correcto».
- [ ] Estado de indexación de la portada registrado con fecha.
