# Evidencia 04-03 · Fase B (desarrollador)

- **Iteración:** 04-03 · Accesibilidad y verificación cruzada
- **Responsable:** desarrollador (el agente no tiene Safari, Firefox, un teléfono ni un lector de pantalla)
- **Estado:** Pendiente
- **Fecha de los resultados:** —

**Cómo leer la tabla.** Cada resultado que entregue el desarrollador se anota como «declarado por el desarrollador», con la fecha y la evidencia que aporte. El agente no marca ningún criterio por una prueba que no hizo. Mientras una fila esté vacía, su prueba sigue pendiente.

## Antes de empezar

1. Hacer el commit y el push de la fase A a `main` y esperar a que Workers Builds termine de publicar.
2. Probar sobre `https://comunidadpulso.dev/` (la versión publicada), no sobre un servidor local.

## Pasos

### A. Lector de pantalla en el teléfono (TalkBack, Galaxy A52+)

1. Activar TalkBack (Ajustes → Accesibilidad → TalkBack) y abrir `https://comunidadpulso.dev/` en Chrome.
2. Recorrer la portada de principio a fin deslizando a la derecha. Anotar si algo se lee mal, se repite o se salta.
3. Comprobar el logotipo del hero: debe leerse «Logotipo de Pulso Devs» una vez, junto al título «Comunidad Pulso Devs».
4. Abrir el menú (botón «Abrir menú»): debe anunciarse como botón expandido, y el foco debe quedar dentro del menú. Cerrarlo con «Cerrar menú».
5. Activar el interruptor «Modo oscuro»: debe anunciarse como interruptor, con su estado (activado o desactivado), y el tema debe cambiar.
6. En el pie, comprobar cómo se anuncian el enlace del fundador y el de LinkedIn: deben decir el texto visible («Fundador: Felipe Cuevas…» y «Síguenos en LinkedIn…») y avisar que se abren en una pestaña nueva.
7. Repetir pasos 2 a 6 en la página 404 (`https://comunidadpulso.dev/no-existe`).

### B. Lector de pantalla en el computador (NVDA, o Narrador de Windows)

1. Abrir `https://comunidadpulso.dev/` en Chrome con NVDA (o Narrador: Win + Ctrl + Intro).
2. Pasar por los encabezados (tecla `H` en NVDA): deben seguir el orden «Comunidad Pulso Devs», «Un lugar para no aprender en solitario.», etc., sin saltos raros.
3. Pasar por los puntos de referencia (tecla `D`): cabecera, navegación principal, contenido principal, pie, navegación del pie.
4. Con Tab, comprobar el enlace «Saltar al contenido» (primera parada) y que lleva al contenido principal.
5. Repetir los pasos 5 y 6 del bloque A (interruptor y enlaces del pie).

### C. Safari (solo si hay un equipo Apple) y Firefox en el computador

1. Abrir `https://comunidadpulso.dev/` en cada navegador.
2. **Cambio de tema (AUD-02-005):** pulsar el interruptor. En Chrome el tema nuevo se revela como un círculo que crece durante 1 s. Anotar qué hace cada navegador (círculo, cambio inmediato u otra cosa) y si hay parpadeos o errores. Repetir tres veces seguidas y recargar la página: el tema debe mantenerse.
3. **Clics durante el efecto (AUD-02-008):** pulsar el interruptor y, dentro del segundo siguiente, hacer clic en cualquier otro enlace o botón. Anotar si el clic llega o se pierde.
4. **Menú móvil:** achicar la ventana a menos de 1100 px de ancho. Abrir el menú con el mouse y con Intro, recorrerlo con Tab (el foco no debe salir del menú) y cerrarlo con Esc.
5. **Enlaces externos:** pulsar «Unirme al grupo de WhatsApp», «Síguenos en LinkedIn» y el enlace del fundador: deben abrirse en una pestaña nueva.
6. **Bordes y botones:** mirar el botón «Conoce Pulso Devs», el chip del fundador y el interruptor: el borde debe verse definido (azul acero) en claro y en oscuro.

### D. Teléfono real (Android y, si hay, iPhone)

1. **Cambio de tema (AUD-02-005):** pulsar el interruptor. Anotar si se ve el efecto de círculo o un cambio inmediato.
2. **Toques durante el efecto (AUD-02-008):** pulsar el interruptor y tocar otro botón dentro del segundo siguiente. Anotar si el toque llega o se pierde (en el mouse de Chrome de escritorio se pierde durante ~1 s).
3. **Objetivos táctiles:** tocar con el pulgar la marca del header, el botón «Únete» del header (en una tableta o con el teléfono en horizontal, a partir de 560 px) y los enlaces del pie. Anotar si alguno cuesta acertarlo.
4. **Revisión visual:** mirar el header, el pie, la sección «Esto recién comienza» y la tarjeta de «Únete» en claro y en oscuro, y confirmar que el borde más definido no molesta.

### E. Cierre

1. Anotar los resultados en la tabla de abajo, con la fecha y la evidencia (capturas, si las hay).
2. Entregarlos al agente para actualizar AUD-02-005, AUD-02-008 y los criterios de 04-03.

## Resultados

| N.º | Comprobación | Dispositivo y navegador | Resultado | Evidencia | Fecha |
| :-- | :----------- | :---------------------- | :-------- | :-------- | :---- |
| A1 | Recorrido de la portada con TalkBack | | | | |
| A2 | Logotipo del hero («Logotipo de Pulso Devs», una sola vez) | | | | |
| A3 | Menú móvil con TalkBack | | | | |
| A4 | Interruptor de tema con TalkBack | | | | |
| A5 | Enlaces del pie con TalkBack | | | | |
| A6 | Página 404 con TalkBack | | | | |
| B1 | Encabezados y puntos de referencia con NVDA o Narrador | | | | |
| B2 | Enlace «Saltar al contenido» | | | | |
| B3 | Interruptor y enlaces del pie con NVDA o Narrador | | | | |
| C1 | Cambio de tema en Firefox (AUD-02-005) | | | | |
| C2 | Cambio de tema en Safari (AUD-02-005) | | | | |
| C3 | Clics durante el efecto en Firefox (AUD-02-008) | | | | |
| C4 | Clics durante el efecto en Safari (AUD-02-008) | | | | |
| C5 | Menú móvil en Firefox y Safari | | | | |
| C6 | Enlaces externos en Firefox y Safari | | | | |
| C7 | Bordes y botones en Firefox y Safari | | | | |
| D1 | Cambio de tema en el teléfono (AUD-02-005) | | | | |
| D2 | Toques durante el efecto en el teléfono (AUD-02-008) | | | | |
| D3 | Objetivos táctiles con el pulgar | | | | |
| D4 | Revisión visual de los bordes en el teléfono | | | | |

## Qué cierra cada resultado

- **A y B** completan el criterio «el sitio se recorre con lector de pantalla» y AUD-01-015.
- **C1 a C4 y D1 a D2** actualizan AUD-02-005 y AUD-02-008, que siguen abiertos hasta 05-02 si falta algún navegador.
- **C5 a C7, D3 y D4** son verificaciones cruzadas de los cambios de AUD-02-009, AUD-02-010 y AUD-02-011; no son criterios de aceptación.
