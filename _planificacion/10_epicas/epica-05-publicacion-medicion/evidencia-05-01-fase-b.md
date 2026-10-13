# Evidencia 05-01 · Fase B (desarrollador)

- **Iteración:** 05-01 · Medición: Cloudflare Web Analytics y Search Console
- **Responsable:** desarrollador (solo él opera Search Console y el DNS de Cloudflare; el agente no toca ninguno de los dos)
- **Estado:** Pendiente (preparada en la fase A, 2026-10-13, con el método ajustado)
- **Fecha de los resultados:** _(completar)_

**Qué cambió respecto de la primera versión de este archivo.** El 2026-10-13 el desarrollador decidió **mantener Cloudflare Web Analytics activo**: no se desactiva la inyección en el panel de Cloudflare y no se mide la producción sin el script. Por eso esta fase B ya no incluye los pasos de desactivar y reactivar Web Analytics. Quedan Search Console y el cierre de RDA-010.

**Cómo usar este archivo.** Sigue los pasos en orden y anota en cada recuadro lo que realmente ves, con fecha y hora. Esta guía **no supone cómo se ven las pantallas**: los nombres de menús y botones salen de la documentación de Google y de Cloudflare (consultada el 2026-10-13) y pueden haber cambiado. Si una pantalla no coincide con lo que dice este archivo, **detente, anota qué ves (o toma una captura) y avisa al agente**; no improvises.

**Reglas de esta fase.**

- El agente no toca Cloudflare ni Search Console. Solo lee el sitio público y, si se lo pides, hace consultas de solo lectura (por ejemplo, para confirmar que el registro TXT es público).
- No pegues en este archivo ni en ningún archivo del repositorio el valor del registro TXT de Search Console: es un dato de tu cuenta.
- No hagas push ni redespliegues «para ayudar» a que Google indexe: el sitio no necesita cambios para esta fase.

---

## Parte 1 · Google Search Console

### Lo que se verificó antes de escribir esto

- **Páginas del sitio.** El sitemap del build (`dist/sitemap-0.xml`, generado con `pnpm build` el 2026-10-13) y el de producción son iguales y contienen **una sola URL: `https://comunidadpulso.dev/`**. El sitio es de una sola página y las secciones (`#comunidad`, `#talleres`, etc.) son anclas, no URL aparte. La página 404 lleva `noindex` y no está en el sitemap. Por eso la única «página principal» que se solicita es **la portada**.
- `https://comunidadpulso.dev/sitemap-index.xml` apunta a `https://comunidadpulso.dev/sitemap-0.xml`, y `robots.txt` lo declara.
- `https://www.comunidadpulso.dev/` responde `301` hacia `https://comunidadpulso.dev/`.
- El dominio **no tiene hoy ningún registro TXT** (consulta DNS del 2026-10-13), así que no hay una verificación anterior.
- Fuentes de Google (consultadas el 2026-10-13): verificación del dominio por DNS (`https://support.google.com/webmasters/answer/9008080`), envío del sitemap (`https://support.google.com/webmasters/answer/7451001`), herramienta de inspección de URL (`https://support.google.com/webmasters/answer/9012289`) y plazos de rastreo (`https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl`).
- Fuente de Cloudflare para el registro DNS (consultada el 2026-10-13): `https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/` (Records → Add record → tipo → Save). Esa página **no confirma** cómo se escribe el nombre del registro raíz (vacío o `@`) ni qué campos pide un TXT; se anota lo que muestre la pantalla.

### Paso 1.1 · Verificar la propiedad por DNS

Según Google, la verificación por DNS corresponde a una propiedad de tipo **Dominio** (`comunidadpulso.dev`, sin `https://`). Una propiedad de dominio cubre `http`, `https` y los subdominios como `www`.

1. En Search Console, agrega una propiedad nueva y elige el tipo **Dominio**. Escribe `comunidadpulso.dev`.
2. Search Console muestra un valor TXT único. Según Google, empieza con `google-site-verification=`. **Cópialo completo, sin modificarlo.**
3. Si Search Console ofrece conectarse con tu proveedor de DNS (Cloudflare), puedes usar esa opción; Google dice que así la verificación debería ser inmediata. Si no, sigue con el paso 4.
4. En el panel de Cloudflare, abre el DNS del dominio → **Records** → **Add record**. Tipo **TXT**. Para el nombre, Google indica dejar el campo vacío o escribir `@` según el proveedor: usa el que acepte el panel y anota cuál fue. En el contenido, pega el valor de Search Console. Guarda.
5. Vuelve a Search Console y pulsa **Verificar**.
6. Si falla, Google dice que el registro puede tardar en propagarse (hasta dos o tres días en el peor caso). Espera y reintenta; no borres ni cambies el registro mientras tanto.
7. **No elimines el registro TXT después de verificar.** Google advierte que, si lo quitas, puedes perder la verificación.

| Campo | Anotación |
| :---- | :-------- |
| Fecha y hora | 2026-10-13 |
| Tipo de propiedad elegido | Dominio (`comunidadpulso.dev`) |
| ¿Usaste la conexión automática con Cloudflare o el registro TXT manual? | Conexión automática directa con Cloudflare |
| Nombre del registro TXT (vacío o `@`, según lo que aceptó el panel) | Configurado automáticamente por la integración de Cloudflare |
| Resultado de «Verificar» (texto exacto) | Se ha verificado la propiedad |
| Si falló: mensaje y fecha del reintento | N/A (verificación inmediata) |

Si quieres, pídele al agente que confirme con una consulta DNS de solo lectura que existe un TXT con el prefijo `google-site-verification=` (no necesita el valor).

### Paso 1.2 · Enviar el sitemap

1. En Search Console, abre el informe **Sitemaps** de la propiedad.
2. Escribe la URL completa `https://comunidadpulso.dev/sitemap-index.xml` en el cuadro de agregar sitemap y envíalo.
3. Anota **la fecha del envío**: desde ese día cuentan los 14 días de la regla de la parte 2.
4. Mira el estado que muestra el informe. Google describe tres: «Success» (se leyó sin errores), «Has errors» y «Couldn't fetch». En español pueden tener otro nombre: **anota el texto exacto que veas.** La iteración exige el estado «Correcto» (o su equivalente en tu idioma).

| Campo | Anotación |
| :---- | :-------- |
| Fecha y hora del envío | 13 oct 2026 |
| URL enviada | `https://comunidadpulso.dev/sitemap-index.xml` |
| Estado mostrado (texto exacto) | No se ha podido obtener (aviso inicial en modal: «Se ha enviado el sitemap correctamente (Google lo procesará de forma periódica para saber si se ha modificado. Si detectamos algún problema, recibirás una notificación.)») |
| Páginas descubiertas (si el informe lo muestra) | 0 (Tipo: Desconocido) |
| Si hay errores: texto del error | «No se ha podido obtener» (pendiente de primer procesamiento por parte de Google) |

### Paso 1.3 · Inspeccionar la portada y solicitar la indexación

Solo hay una URL en el sitemap, así que solo se inspecciona una. No solicites la 404 ni las anclas.

1. En la barra de inspección de URL de Search Console, escribe `https://comunidadpulso.dev/` (la URL debe pertenecer a la propiedad abierta).
2. Anota el estado que informa la herramienta. Google usa estos: «URL is on Google», «URL is on Google, but has issues» y «URL is not on Google». **Anota el texto tal como aparezca.**
3. Si dice que no está en Google, pulsa **Solicitar indexación**. Google advierte que la solicitud no garantiza que la página aparezca ni da un plazo (habla de «un día o algo más» y, en otra página, de «de unos días a unas semanas»), y que repetir la solicitud para la misma URL no la acelera. **Pídela una sola vez.**
4. Anota si apareció algún aviso (por ejemplo, un límite diario de solicitudes).

| Campo | Anotación |
| :---- | :-------- |
| Fecha y hora | 2026-10-13 |
| URL inspeccionada | `https://comunidadpulso.dev/` |
| Estado de indexación (texto exacto) | La URL está en Google (Indexación de páginas: «La página está indexada»; HTTPS: «La página se sirve a través de HTTPS») |
| ¿Solicitaste indexación? | No requerida (la URL ya figura indexada en el índice de Google; se muestra la opción «¿Ha cambiado la página? SOLICITAR INDEXACIÓN») |
| Avisos de la herramienta | «Siempre que no esté sujeta a una solicitud de eliminación o a una acción manual, puede aparecer con todas las mejoras relevantes en los resultados de la Búsqueda de Google.» |
| Captura (nombre del archivo, sin datos privados) | `image_c25d1a.png` |

---

## Parte 2 · Estado de indexación y regla de los 14 días

La indexación **se registra con fecha** y no se exige para cerrar la épica (decisión del 2026-10-12). Si pasan **14 días corridos desde el envío del sitemap** y la portada sigue sin indexarse, se abre un seguimiento aparte (una fila en `registro-log.md` §4, no una iteración nueva).

**Cálculo.** Fecha de envío del sitemap (paso 1.2) + 14 días = fecha de revisión. Ejemplo: enviado el 2026-10-13 → revisar el 2026-10-27.

| Fecha de revisión | Estado de `https://comunidadpulso.dev/` (texto exacto) | Estado del sitemap | Observaciones                                                                                                          |
| :---------------- | :----------------------------------------------------- | :----------------- |:-----------------------------------------------------------------------------------------------------------------------|
| 2026-10-13 *(día del envío)* | La URL está en Google (La página está indexada) | No se ha podido obtener | La portada ya figuraba indexada en Google antes del envío. El sitemap quedó enviado en cola para primer procesamiento. |
| *(a los 3 a 7 días)* | *(pendiente: revisar entre el 2026-10-16 y el 2026-10-20)* | *(pendiente de verificar si pasó a «Correcto»)* | Sin observaciones                                                                                                                       |
| 2026-10-27 *(a los 14 días)* | *(pendiente de confirmación final)* | *(pendiente)* | Sin observaciones                                                                                                                       |

| Campo | Anotación |
| :---- | :-------- |
| Fecha de envío del sitemap | 2026-10-13 |
| Fecha límite (envío + 14 días) | 2026-10-27 |
| ¿Indexada a la fecha límite? | Sí (ya confirmada como indexada desde el día del envío, 2026-10-13) |
| Si no: ¿se abrió seguimiento aparte? (fila de `registro-log.md` §4) | No aplica (la portada ya está indexada) |

---

## Parte 3 · Cierre de RDA-010

RDA-010 quedó «Aceptada» en `decisiones.md` el 2026-10-13. El desarrollador decidió mantener Web Analytics activo (**declarado por el desarrollador**) y la medición de la producción **con** el script cumple los umbrales de la iteración. La medición está en la bitácora 05-01 (`bitacora-05-01-ajuste-2026-10-13.md`) y en `evidencia-05-01-fase-a-datos.json`.

Umbrales y lo medido por el agente (2026-10-13, producción con el script, mediana de cinco corridas alternadas):

| Umbral | Medido | Cumple |
| :----- | :----- | :----- |
| Lighthouse móvil 95 o más en las cuatro categorías | 99 / 100 / 100 / 100 | Sí |
| LCP < 2,5 s | 1.799 ms | Sí |
| CLS < 0,05 | 0 | Sí |
| INP < 200 ms | 32 a 48 ms (máximo 128 ms con CPU 4×) | Sí |
| El JavaScript propio no aumenta | 3.716 B (3.714 B en 04-02: +2 B) | Sí, por declaración del desarrollador (2026-10-13; ver la anotación de abajo): el build local de hoy da los mismos 3.716 B y los cuatro scripts son idénticos con y sin el de Cloudflare, así que el aumento no viene de Web Analytics. La causa no se investigó |

| Campo                                                                           | Anotación                                                                                                                                                                                                                                               |
|:--------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Fecha en que confirmas los umbrales                                             |                                                                                                                                                                                                                                                         |
| ¿Aceptas el aumento de 2 B de JavaScript propio, que no viene de Web Analytics? | Declarado por el desarrollador (2026-10-13): la diferencia de +2 B en el script del tema (3.714 B a 3.716 B) se considera menor y no es atribuible a Web Analytics (el build local da 3.716 B con y sin el script de Cloudflare). Causa no investigada. |
| Estado de RDA-010 que se registra                                               | Aceptada (2026-10-13)                                                                                                                                                                                                                                   |
| Quién actualiza `decisiones.md`, `registro-log.md` §4 y `AGENTS.md` §7.3        | El agente de IA, con mi aprobación del texto propuesto en la bitácora                                                                                                                                                                                   |
| Observaciones                                                                   | Sin observaciones                                                                                                                                                                                                                                       |

---

## Resumen de avisos al agente

| Cuándo | Qué decir |
| :----- | :-------- |
| Si algo no coincide con esta guía | Describe lo que ves y detente |
| Al terminar la parte 1 | Las fechas y estados anotados arriba |
| Si quieres que el agente confirme el TXT | «Confirma el TXT de verificación» |
| Cuando apruebes el texto de `AGENTS.md` §7.3 | «Aprobado el texto (a)» |

## Criterios de aceptación que cubre esta evidencia

- [x] RDA-010 «Aceptada» y `AGENTS.md` §7.3 y `registro-log.md` §4 coherentes con la decisión.
- [ ] Search Console con la propiedad verificada y el sitemap en estado «Correcto».
- [ ] Estado de indexación de la portada registrado con fecha.
