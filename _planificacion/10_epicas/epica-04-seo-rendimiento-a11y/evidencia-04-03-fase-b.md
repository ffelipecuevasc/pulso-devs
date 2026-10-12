# Evidencia 04-03 · Fase B (desarrollador)

- **Iteración:** 04-03 · Accesibilidad y verificación cruzada
- **Responsable:** desarrollador (el agente no tiene lector de pantalla, Firefox, Safari ni teléfono)
- **Estado:** Pendiente (esperando los resultados del desarrollador)
- **Fecha de los resultados:** —
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

Equipo y versión de TalkBack: ______________________

1. Activa TalkBack (Ajustes → Accesibilidad → TalkBack).
2. Abre Chrome y entra a `https://comunidadpulso.dev/`.
3. Haz cada comprobación de la tabla.

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| A1 | Desliza a la derecha, de a un elemento, por toda la portada | Orden lógico (de arriba abajo); nada se salta ni se repite | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A2 | Al llegar al logotipo del hero, escucha lo que lee | Lee «Logotipo de Pulso Devs» **una sola vez** | AUD-01-020 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A3 | Usa la navegación por encabezados (menú de lectura de TalkBack → Encabezados) y recórrelos | Empieza en «Comunidad Pulso Devs» y sigue el orden de la página, sin saltos raros | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A4 | Ve al interruptor «Modo oscuro» y escucha cómo se anuncia | Se anuncia como interruptor, con su estado (activado o desactivado) | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A5 | Actívalo con doble toque | El tema cambia y el nuevo estado se anuncia | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A6 | Ve a «Abrir menú» y actívalo | Se anuncia como botón; al abrir queda como expandido y el foco queda dentro del menú | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A7 | Dentro del menú, recorre los enlaces y luego activa «Cerrar menú» | Los enlaces se leen con su texto; el menú se cierra y el foco vuelve al botón | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A8 | Ve a los botones «Únete a la comunidad» y «Conoce Pulso Devs» | Se leen como enlaces, con ese texto | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A9 | En el pie, ve al chip del fundador | Dice «Fundador: Felipe Cuevas, sitio web (se abre en una pestaña nueva)» | AUD-02-011 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A10 | En el pie, ve al enlace de LinkedIn | Dice «Síguenos en LinkedIn: perfil de Comunidad Pulso Devs (se abre en una pestaña nueva)» | AUD-02-011 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| A11 | Abre la página 404 y repite A1, A4 y A6 | Mismo comportamiento que en la portada | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |

---

## Bloque B · NVDA o Narrador en el computador (Windows, Chrome)

Lector usado (NVDA o Narrador) y versión: ______________________

1. Abre `https://comunidadpulso.dev/` en Chrome con el lector activo (NVDA, o Narrador con Win + Ctrl + Intro).
2. En los pasos con letras (H, D), usa el modo de exploración: en NVDA ya viene activo; en Narrador actívalo con Bloq Mayús + Espacio.
3. Haz cada comprobación de la tabla.

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| B1 | Pulsa Tab una vez al cargar la página | Primera parada: «Saltar al contenido» | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B2 | Con ese enlace enfocado, pulsa Intro y luego Tab | El foco salta al contenido principal (no queda en el header) | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B3 | Pulsa H varias veces para recorrer los encabezados | Empieza en «Comunidad Pulso Devs» y sigue el orden de la página, sin saltos raros | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B4 | Pulsa D varias veces para recorrer los puntos de referencia | Cabecera, navegación principal, contenido principal, navegación del pie y pie | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B5 | Recorre toda la página solo con Tab | El orden coincide con lo que se ve y el foco siempre se ve | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B6 | Ve al logotipo del hero | Lee «Logotipo de Pulso Devs» una sola vez | AUD-01-020 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B7 | Ve al interruptor «Modo oscuro» y pulsa Espacio | Se anuncia como interruptor con su estado y el tema cambia | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B8 | Achica la ventana a menos de 1100 px, ve a «Abrir menú» y pulsa Intro | Se abre; el foco se queda dentro del menú al pulsar Tab | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B9 | Con el menú abierto, pulsa Esc | El menú se cierra y el foco vuelve a «Abrir menú» | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| B10 | En el pie, ve al chip del fundador y al enlace de LinkedIn | Leen «Fundador: Felipe Cuevas, sitio web (se abre en una pestaña nueva)» y «Síguenos en LinkedIn: perfil de Comunidad Pulso Devs (se abre en una pestaña nueva)» | AUD-02-011 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |

---

## Bloque C · Firefox y Safari en el computador

### C1 · Firefox

Versión y sistema: ______________________

1. Abre `https://comunidadpulso.dev/` en Firefox.
2. Haz cada comprobación de la tabla.

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| C1.1 | Pulsa el interruptor de tema una vez y mira | En Chrome el tema nuevo se revela como un círculo que crece durante 1 s. Anota qué hace Firefox (círculo, cambio inmediato u otra cosa); sin parpadeos ni errores | AUD-02-005 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C1.2 | Pulsa el interruptor 3 veces seguidas y recarga la página | Termina en un tema coherente y la recarga mantiene el tema elegido | AUD-02-005 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C1.3 | Pulsa el interruptor y, dentro del segundo siguiente, haz clic en «Talleres» del menú | Anota si el clic llega o se pierde (en Chrome de escritorio se pierde durante ~1 s) | AUD-02-008 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C1.4 | Achica la ventana a menos de 1100 px, abre el menú con el mouse, recórrelo con Tab y ciérralo con Esc | Abre, el foco no sale del menú y Esc lo cierra | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C1.5 | Pulsa «Unirme al grupo de WhatsApp», «Síguenos en LinkedIn» y el chip del fundador | Cada uno abre una pestaña nueva | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C1.6 | Mira el botón «Conoce Pulso Devs», el chip del fundador y el interruptor, en claro y en oscuro | El borde se ve definido (azul acero), sin verse débil ni desaparecer | AUD-02-009 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C1.7 | Recorre la página con Tab | El foco siempre se ve (contorno azul de 3 px) y nunca queda tapado por el header | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |

### C2 · Safari (solo si tengo equipo Apple)

Marca **No probado** en todas las filas si no tienes un Mac o un iPhone a mano.

Versión y equipo: ______________________

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| C2.1 | Pulsa el interruptor de tema una vez y mira | Anota qué hace Safari (círculo, cambio inmediato u otra cosa); sin parpadeos ni errores | AUD-02-005 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C2.2 | Pulsa el interruptor 3 veces seguidas y recarga la página | Termina en un tema coherente y la recarga mantiene el tema elegido | AUD-02-005 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C2.3 | Pulsa el interruptor y, dentro del segundo siguiente, haz clic en «Talleres» | Anota si el clic llega o se pierde | AUD-02-008 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C2.4 | Achica la ventana a menos de 1100 px, abre el menú, recórrelo con Tab y ciérralo con Esc | Abre, el foco no sale del menú y Esc lo cierra | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C2.5 | Pulsa los tres enlaces externos (WhatsApp, LinkedIn y el fundador) | Cada uno abre una pestaña nueva | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| C2.6 | Mira el botón «Conoce Pulso Devs», el chip del fundador y el interruptor, en claro y en oscuro | El borde se ve definido (azul acero) | AUD-02-009 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |

---

## Bloque D · Teléfono real (Galaxy A52+, Chrome)

Equipo y versión de Chrome: ______________________

1. Abre `https://comunidadpulso.dev/` en Chrome, sin lector de pantalla.
2. Haz cada comprobación de la tabla. Para la fila D4 gira el teléfono a horizontal (así el ancho pasa de 560 px).

| N.º | Qué hacer | Esperado | Hallazgo | Resultado | Observación |
| :-- | :-------- | :------- | :------- | :-------- | :---------- |
| D1 | Toca el interruptor de tema una vez | Anota si ves el círculo que crece (1 s) o un cambio inmediato; el tema cambia sin errores | AUD-02-005 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| D2 | Toca el interruptor y, dentro del segundo siguiente, toca «Abrir menú» | Anota si el toque llega o se pierde | AUD-02-008 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| D3 | Toca con el pulgar la marca del header, «Abrir menú» y el interruptor | Se aciertan a la primera, sin tocar otra cosa por error | AUD-02-010 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| D4 | Con el teléfono en horizontal, toca el botón «Únete» del header | Se acierta a la primera; el header se ve igual de alto que antes | AUD-02-010 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| D5 | En el pie, toca «Comunidad», «Talleres», «Visión», «Síguenos en LinkedIn» y la marca | Se aciertan a la primera, sin tocar otra cosa por error | AUD-02-010 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| D6 | Mira el header, el botón «Conoce Pulso Devs», la línea de tiempo («Esto recién comienza»), el pie y la tarjeta de «Únete», en claro y en oscuro | Los bordes se ven más definidos que antes y no molestan | AUD-02-009 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| D7 | Sube el tamaño de letra del teléfono al máximo (Ajustes → Pantalla) y recorre la portada | No hay texto cortado ni desplazamiento horizontal | AUD-01-015 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |
| D8 | iPhone, solo si tienes uno: repite D1 y D2 en Safari | Anota qué hace; sin errores | AUD-02-005 y AUD-02-008 | `[ ] Pasa` `[ ] Falla` `[ ] No probado` | |

---

## Cierre

1. Escribe en **Fecha de los resultados** (arriba) el día en que hiciste las pruebas.
2. Entrégame los resultados editando este archivo o pegándolos en el chat.
3. Con ellos, el agente: incorpora tus resultados tal cual a este archivo como «declarado por el desarrollador»; actualiza AUD-01-015, AUD-02-005 y AUD-02-008 según lo que declares; y propone el cierre de 04-03. Las filas **No probado** dejan el hallazgo correspondiente abierto.

## Qué cierra cada resultado

- **Bloques A y B** (AUD-01-015, AUD-01-020, AUD-02-011): completan el criterio de lector de pantalla de 04-03. Si todo pasa, AUD-01-015 deja de ser parcial.
- **C1, C2, D1, D2 y D8** (AUD-02-005 y AUD-02-008): actualizan el estado de esos dos hallazgos. Siguen abiertos hasta 05-02 si falta algún navegador (por ejemplo Safari).
- **C1.6, C2.6, D3 a D6** (AUD-02-009 y AUD-02-010): revisión visual y táctil de los cambios de la fase A; no son criterios de aceptación.

## Resultados declarados por el desarrollador

_(vacío: se completa con lo que entregue el desarrollador)_
