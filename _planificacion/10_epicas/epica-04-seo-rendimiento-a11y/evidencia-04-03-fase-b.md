# Evidencia 04-03 · Fase B (desarrollador)

- **Iteración:** 04-03 · Accesibilidad y verificación cruzada
- **Responsable:** desarrollador (el agente no tiene lector de pantalla, Firefox, Safari ni teléfono)
- **Estado:** Completado
- **Fecha de los resultados:** 12 de octubre de 2026 (2026-10-12)
- **Sitio a probar:** `https://comunidadpulso.dev/` (la fase A ya está publicada). Página 404: `https://comunidadpulso.dev/no-existe`.

**Cómo usar este archivo.**

1. Haz cada paso en el orden indicado. Los pasos son cortos: marca una sola casilla por fila.
2. En cada fila, marca **Pasa**, **Falla** o **No probado** y escribe lo que viste en **Observación** (si falla, anota qué pasó y en qué dispositivo).
3. Puedes editar este archivo o pegarme los resultados en el chat, por ejemplo «A3: Falla, lee el nombre dos veces».
4. Todo lo que entregues se anota tal cual como **declarado por el desarrollador**, con la fecha. El agente no completa ni marca nada de esta fase.

**Qué debería pasar:** cada fila dice «Esperado». Si lo que ves es distinto, es **Falla**, aunque te parezca menor.

**Columna «Hallazgo».** Indica qué registro de `auditoria-tecnica.md` actualiza esa fila: AUD-01-015 (lector de pantalla), AUD-01-020 (alt del logotipo), AUD-02-005 (transición de tema), AUD-02-008 (clics durante el efecto), AUD-02-009 (bordes), AUD-02-010 (objetivos táctiles) y AUD-02-011 (nombres de los enlaces del pie). Las filas de AUD-02-009, 010 y 011 son verificaciones cruzadas: esos hallazgos ya se midieron en la fase A.

Casillas: `[ ] Pasa` `[ ] Falla` `[ ] No probado`. Una fila sin casilla marcada sigue pendiente.

---

## Bloque A · TalkBack en Android (Galaxy A52+, Chrome)

Equipo y versión de TalkBack: Samsung Galaxy A52 (Android 14 / One UI 6, TalkBack 16 / Android Accessibility Suite, Chrome 154). Android: declarado sin cambios

1. Activa TalkBack (Ajustes → Accesibilidad → TalkBack).
2. Abre Chrome y entra a `https://comunidadpulso.dev/`.
3. Haz cada comprobación de la tabla.

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| A1 | Desliza a la derecha, de a un elemento, por toda la portada | Orden lógico (de arriba abajo); nada se salta ni se repite | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Orden lógico y secuencial en toda la página; sin saltos ni elementos repetidos. |
| A2 | Al llegar al logotipo del hero, escucha lo que lee | Lee «Logotipo de Pulso Devs» **una sola vez** | AUD-01-020 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Verbaliza «Logotipo de Pulso Devs» una única vez. |
| A3 | Usa la navegación por encabezados (menú de lectura de TalkBack → Encabezados) y recórrelos | Empieza en «Comunidad Pulso Devs» y sigue el orden de la página, sin saltos raros | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Inicia correctamente en H1 «Comunidad Pulso Devs» y mantiene la jerarquía sin saltos incoherentes. |
| A4 | Ve al interruptor «Modo oscuro» y escucha cómo se anuncia | Se anuncia como interruptor, con su estado (activado o desactivado) | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Se anuncia como conmutador indicando claramente su estado actual. |
| A5 | Actívalo con doble toque | El tema cambia y el nuevo estado se anuncia | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | El tema conmuta de inmediato y anuncia el estado actualizado. |
| A6 | Ve a «Abrir menú» y actívalo | Se anuncia como botón; al abrir queda como expandido y el foco queda dentro del menú | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Anunciado como botón expandido; el foco entra directamente al menú móvil. |
| A7 | Dentro del menú, recorre los enlaces y luego activa «Cerrar menú» | Los enlaces se leen con su texto; el menú se cierra y el foco vuelve al botón | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Lectura fiel del texto de los enlaces; al cerrar, el foco vuelve al botón del menú. |
| A8 | Ve a los botones «Únete a la comunidad» y «Conoce Pulso Devs» | Se leen como enlaces, con ese texto | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Se anuncian correctamente como enlaces con sus etiquetas correspondientes. |
| A9 | En el pie, ve al chip del fundador | Dice «Fundador: Felipe Cuevas, sitio web (se abre en una pestaña nueva)» | AUD-02-011 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Lectura exacta del texto accesible y aviso de pestaña nueva. |
| A10 | En el pie, ve al enlace de LinkedIn | Dice «Síguenos en LinkedIn: perfil de Comunidad Pulso Devs (se abre en una pestaña nueva)» | AUD-02-011 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Lectura exacta conforme a lo esperado. |
| A11 | Abre la página 404 y repite A1, A4 y A6 | Mismo comportamiento que en la portada | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Comportamiento consistente y verificado en `/no-existe`. |

---

## Bloque B · NVDA o Narrador en el computador (Windows, Chrome)

Lector usado (NVDA o Narrador) y versión: NVDA 2026.2 / 2026.3 en Windows 11 / Google Chrome 154

1. Abre `https://comunidadpulso.dev/` en Chrome con el lector activo (NVDA, o Narrador con Win + Ctrl + Intro).
2. En los pasos con letras (H, D), usa el modo de exploración: en NVDA ya viene activo; en Narrador actívalo con Bloq Mayús + Espacio.
3. Haz cada comprobación de la tabla.

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| B1 | Pulsa Tab una vez al cargar la página | Primera parada: «Saltar al contenido» | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Primera pulsación enfoca visiblemente el enlace de salto «Saltar al contenido». |
| B2 | Con ese enlace enfocado, pulsa Intro y luego Tab | El foco salta al contenido principal (no queda en el header) | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | El foco navega directamente al contenedor principal sin quedarse atrapado en el header. |
| B3 | Pulsa H varias veces para recorrer los encabezados | Empieza en «Comunidad Pulso Devs» y sigue el orden de la página, sin saltos raros | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Recorrido coherente por H1, H2 y H3 en orden estructural. |
| B4 | Pulsa D varias veces para recorrer los puntos de referencia | Cabecera, navegación principal, contenido principal, navegación del pie y pie | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Navegación precisa entre header, nav, main, footer nav y contentinfo. |
| B5 | Recorre toda la página solo con Tab | El orden coincide con lo que se ve y el foco siempre se ve | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Indicador de foco visible en todo momento; secuencia de tabulación idéntica a la visual. |
| B6 | Ve al logotipo del hero | Lee «Logotipo de Pulso Devs» una sola vez | AUD-01-020 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | NVDA lee «Logotipo de Pulso Devs» una sola vez. |
| B7 | Ve al interruptor «Modo oscuro» y pulsa Espacio | Se anuncia como interruptor con su estado y el tema cambia | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Reconocido como interruptor; al pulsar Espacio conmuta el tema y verbaliza el cambio. |
| B8 | Achica la ventana a menos de 1100 px, ve a «Abrir menú» y pulsa Intro | Se abre; el foco se queda dentro del menú al pulsar Tab | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Menú desplegado correctamente y foco confinado dentro de la vista móvil. |
| B9 | Con el menú abierto, pulsa Esc | El menú se cierra y el foco vuelve a «Abrir menú» | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Tecla Esc cierra el menú y devuelve el foco al botón de apertura. |
| B10 | En el pie, ve al chip del fundador y al enlace de LinkedIn | Leen «Fundador: Felipe Cuevas, sitio web (se abre en una pestaña nueva)» y «Síguenos en LinkedIn: perfil de Comunidad Pulso Devs (se abre en una pestaña nueva)» | AUD-02-011 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Textos leídos exactamente como se esperaba. |

---

## Bloque C · Firefox y Safari en el computador

### C1 · Firefox

Versión y sistema: Mozilla Firefox 155 en Windows 11

1. Abre `https://comunidadpulso.dev/` en Firefox.
2. Haz cada comprobación de la tabla.

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| C1.1 | Pulsa el interruptor de tema una vez y mira | En Chrome el tema nuevo se revela como un círculo que crece durante 1 s. Anota qué hace Firefox (círculo, cambio inmediato u otra cosa); sin parpadeos ni errores | AUD-02-005 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Transición limpia, sin parpadeos visuales ni descuadres. Lo que vi es el círculo que crece, igual que en Chrome. |
| C1.2 | Pulsa el interruptor 3 veces seguidas y recarga la página | Termina en un tema coherente y la recarga mantiene el tema elegido | AUD-02-005 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Persistencia correcta en almacenamiento local tras recargar (F5). |
| C1.3 | Pulsa el interruptor y, dentro del segundo siguiente, haz clic en «Talleres» del menú | Anota si el clic llega o se pierde (en Chrome de escritorio se pierde durante ~1 s) | AUD-02-008 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | El evento de clic se registra y salta a la sección «Talleres». |
| C1.4 | Achica la ventana a menos de 1100 px, abre el menú con el mouse, recórrelo con Tab y ciérralo con Esc | Abre, el foco no sale del menú y Esc lo cierra | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Apertura fluida, navegación contenida por Tab y cierre inmediato con Esc. |
| C1.5 | Pulsa «Unirme al grupo de WhatsApp», «Síguenos en LinkedIn» y el chip del fundador | Cada uno abre una pestaña nueva | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Los tres enlaces abren nueva pestaña con atributos de seguridad correctos. |
| C1.6 | Mira el botón «Conoce Pulso Devs», el chip del fundador y el interruptor, en claro y en oscuro | El borde se ve definido (azul acero), sin verse débil ni desaparecer | AUD-02-009 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Bordes azul acero nítidos y con contraste visible en tema claro y oscuro. |
| C1.7 | Recorre la página con Tab | El foco siempre se ve (contorno azul de 3 px) y nunca queda tapado por el header | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Indicador de foco azul de 3px visible y con scroll-padding respetado respecto al header. |

### C2 · Safari (solo si tengo equipo Apple)

Marca **No probado** en todas las filas si no tienes un Mac o un iPhone a mano.

Versión y equipo: No probado (sin dispositivo macOS/iOS disponible)

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| C2.1 | Pulsa el interruptor de tema una vez y mira | Anota qué hace Safari (círculo, cambio inmediato u otra cosa); sin parpadeos ni errores | AUD-02-005 | `[ ] Pasa` `[ ] Falla` `[X] No probado` | No probado por falta de hardware Apple. |
| C2.2 | Pulsa el interruptor 3 veces seguidas y recarga la página | Termina en un tema coherente y la recarga mantiene el tema elegido | AUD-02-005 | `[ ] Pasa` `[ ] Falla` `[X] No probado` | No probado por falta de hardware Apple. |
| C2.3 | Pulsa el interruptor y, dentro del segundo siguiente, haz clic en «Talleres» | Anota si el clic llega o se pierde | AUD-02-008 | `[ ] Pasa` `[ ] Falla` `[X] No probado` | No probado por falta de hardware Apple. |
| C2.4 | Achica la ventana a menos de 1100 px, abre el menú, recórrelo con Tab y ciérralo con Esc | Abre, el foco no sale del menú y Esc lo cierra | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[X] No probado` | No probado por falta de hardware Apple. |
| C2.5 | Pulsa los tres enlaces externos (WhatsApp, LinkedIn y el fundador) | Cada uno abre una pestaña nueva | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[X] No probado` | No probado por falta de hardware Apple. |
| C2.6 | Mira el botón «Conoce Pulso Devs», el chip del fundador y el interruptor, en claro y en oscuro | El borde se ve definido (azul acero) | AUD-02-009 | `[ ] Pasa` `[ ] Falla` `[X] No probado` | No probado por falta de hardware Apple. |

---

## Bloque D · Teléfono real (Galaxy A52+, Chrome)

Equipo y versión de Chrome: Samsung Galaxy A52 / Chrome 154. Android: declarado sin cambios

1. Abre `https://comunidadpulso.dev/` en Chrome, sin lector de pantalla.
2. Haz cada comprobación de la tabla. Para la fila D4 gira el teléfono a horizontal (así el ancho pasa de 560 px).

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| D1 | Toca el interruptor de tema una vez | Anota si ves el círculo que crece (1 s) o un cambio inmediato; el tema cambia sin errores | AUD-02-005 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Transición circular fluida (~1 s), sin saltos bruscos. |
| D2 | Toca el interruptor y, dentro del segundo siguiente, toca «Abrir menú» | Anota si el toque llega o se pierde | AUD-02-008 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | El toque responde al instante abriendo el menú. |
| D3 | Toca con el pulgar la marca del header, «Abrir menú» y el interruptor | Se aciertan a la primera, sin tocar otra cosa por error | AUD-02-010 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Blancos táctiles amplios (≥44px); se aciertan sin toques accidentales. |
| D4 | Con el teléfono en horizontal, toca el botón «Únete» del header | Se acierta a la primera; el header se ve igual de alto que antes | AUD-02-010 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Botón accesible con facilidad y altura del header consistente en horizontal. |
| D5 | En el pie, toca «Comunidad», «Talleres», «Visión», «Síguenos en LinkedIn» y la marca | Se aciertan a la primera, sin tocar otra cosa por error | AUD-02-010 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Separación y dimensiones táctiles cómodas en la zona del pie. |
| D6 | Mira el header, el botón «Conoce Pulso Devs», la línea de tiempo («Esto recién comienza»), el pie y la tarjeta de «Únete», en claro y en oscuro | Los bordes se ven más definidos que antes y no molestan | AUD-02-009 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | Definición de bordes clara y buen contraste en ambos temas. |
| D7 | Sube el tamaño de letra del teléfono al máximo (Ajustes → Pantalla) y recorre la portada | No hay texto cortado ni desplazamiento horizontal | AUD-01-015 | `[X] Pasa` `[ ] Falla` `[ ] No probado` | La interfaz escala limpiamente sin romper el ancho de pantalla ni cortar textos. |
| D8 | iPhone, solo si tienes uno: repite D1 y D2 en Safari | Anota qué hace; sin errores | AUD-02-005 y AUD-02-008 | `[ ] Pasa` `[ ] Falla` `[X] No probado` | No probado por falta de iPhone. |

---

## Cierre

1. Escribe en **Fecha de los resultados** (arriba) el día en que hiciste las pruebas.
2. Entrégame los resultados editando este archivo o pegándolos en el chat.
3. Con ellos, el agente: incorpora tus resultados tal cual a este archivo como «declarado por el desarrollador»; actualiza AUD-01-015, AUD-02-005 y AUD-02-008 según lo que declares; y propone el cierre de 04-03. Las filas **No probado** dejan el hallazgo correspondiente abierto.

## Qué cierra cada resultado

- **Bloques A y B** (AUD-01-015, AUD-01-020, AUD-02-011): completan el criterio de lector de pantalla de 04-03. Si todo pasa, AUD-01-015 deja de ser parcial.
- **C1, C2, D1, D2 y D8** (AUD-02-005 y AUD-02-008): actualizan el estado de esos dos hallazgos. Siguen abiertos hasta 05-03 (riesgo aceptado por el desarrollador, 2026-10-12) si falta algún navegador (por ejemplo Safari).
- **C1.6, C2.6, D3 a D6** (AUD-02-009 y AUD-02-010): revisión visual y táctil de los cambios de la fase A; no son criterios de aceptación.

## Resultados declarados por el desarrollador

- **Fecha de ejecución:** 12 de octubre de 2026.
- **Entornos verificados:**
    - Android (Galaxy A52) con TalkBack 16 y Google Chrome 154 (Android: declarado sin cambios).
    - Windows 11 con lector de pantalla NVDA 2026.2 / 2026.3 y Google Chrome 154.
    - Computador con Mozilla Firefox 155 en Windows 11.
    - Chrome 154 vale para Chrome de escritorio y de teléfono.
- **Conclusión de la verificación:**
    - Las pruebas de accesibilidad asistida (TalkBack y NVDA) validan el orden secuencial del DOM, los roles ARIA interactivos (interruptores, menús modales) y los textos alternativos de marca y enlaces externos.
    - La verificación táctil y la respuesta a tipografía máxima en móvil cumplen con los criterios de accesibilidad sin desbordamientos de pantalla.
    - Las comprobaciones dependientes de Safari/WebKit en entorno Apple (C2 y D8) quedan declaradas como `No probado` para su seguimiento posterior.

**Nota del agente (2026-10-12).** Los resultados de las tablas y esta sección son los que entregó el desarrollador, incorporados tal cual como **declarados por el desarrollador** el 2026-10-12; el agente no repitió ninguna de estas pruebas. Correcciones del desarrollador aplicadas después de entregarlos: las versiones de los encabezados de los bloques A, B, C1 y D (Chrome 154, Firefox 155, NVDA 2026.2 / 2026.3 y TalkBack 16; Windows 11, Galaxy A52 y Android 14 sin corregir, «Android: declarado sin cambios») y la observación de C1.1 (el cambio de tema en Firefox es el círculo que crece, igual que en Chrome). Safari (C2.1 a C2.6) y iPhone (D8) quedan **No probado**, por falta de equipo Apple; se trasladan a 05-03, riesgo aceptado por el desarrollador (2026-10-12). Decisión de cierre del desarrollador: cerrar 04-03 y dejar Safari para 05-03, riesgo aceptado por el desarrollador (2026-10-12).
