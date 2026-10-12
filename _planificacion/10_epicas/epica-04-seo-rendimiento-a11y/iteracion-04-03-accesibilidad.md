# Iteración 04-03 · Accesibilidad y verificación cruzada

- **Épica:** 04 · SEO, rendimiento y accesibilidad
- **Estado:** Terminada (2026-10-12)
- **Rama:** `main` (RDA-015)
- **Depende de:** 04-02
- **RDA relacionadas:** RDA-016
- **Hallazgos que cierra:** AUD-01-015, AUD-01-020, AUD-02-009, AUD-02-010 (el resto, tras 04-00), AUD-02-011. Actualiza AUD-02-005 y AUD-02-008 (siguen abiertos hasta 05-03 si falta algún navegador; riesgo aceptado por el desarrollador, 2026-10-12).

## Objetivo

Verificar con mediciones y dispositivos reales lo que hasta ahora solo se revisó en el código, y corregir los defectos de accesibilidad ya registrados.

## Fase A · Agente

1. **Contraste de texto:** medir cada combinación de texto y fondo, en claro y oscuro (incluidas las bandas oscuras y los estados de foco y hover), y registrar la tabla.
2. **AUD-02-009 (borde `--line-strong`):** medir juntas todas las combinaciones donde se usa el token (`.btn--ghost`, `.founder-chip`, `.theme-toggle__track`, `.menu-toggle`, `.timeline__next`, `.timeline__arrow`, `.next-list li` y `.joincard__text`) frente a 3:1. Proponer con `AskUserQuestion` el valor nuevo, con su contraste en ambos modos y capturas; cambia un token de `DESIGN.md` §2.2, que se edita solo con el texto exacto aprobado.
3. **AUD-02-010 (objetivos táctiles de 44 × 44 px):** medir todos los objetivos interactivos y corregir la marca del header y el pie, el botón «Únete» `--sm` y los enlaces del menú de escritorio (el interruptor de tema ya se resolvió en 04-00; volver a medirlo). Cada cambio visible se propone con `AskUserQuestion` antes de aplicarlo. Si cambia el tamaño del botón `--sm`, proponer también el ajuste de la frase de `DESIGN.md` §6 («40 px en `--sm`…»).
4. **Foco y teclado:** foco visible en todos los elementos y sin quedar bajo el header fijo, navegación completa con teclado (incluido el menú móvil), zoom al 200 % y al 400 % y ancho de 320 px.
5. **AUD-01-020:** proponer `alt=""` en el logotipo del hero si el `h1` ya dice «Pulso Devs»; revisar los demás `alt` y `aria-label`.
6. Preparar `evidencia-04-03-fase-b.md` con la lista de pruebas de la fase B y una tabla vacía para los resultados.

## Fase B · Desarrollador

1. Lector de pantalla en un teléfono real (TalkBack en el Galaxy A52+) y en el computador (NVDA o Narrador).
2. Safari (si tiene un equipo Apple disponible) y Firefox en el computador: cambio de tema, menú móvil y enlaces externos.
3. AUD-02-005 y AUD-02-008: probar el cambio de tema en esos navegadores y tocar la pantalla del teléfono durante el efecto de 1 s.
4. Registrar los resultados en `evidencia-04-03-fase-b.md`. Lo declarado se anota como «declarado por el desarrollador».

## Criterios de aceptación

- [x] Todo texto cumple WCAG 2.2 AA (4,5:1 o 3:1 según el tamaño), medido en ambos modos contra el color de fondo real de cada sección y de cada banda (los extremos de su degradado). El patrón de puntos decorativo de las bandas no se cuenta; su efecto medido sobre el texto de Talleres queda en la bitácora 04-03. *(Criterio reformulado con el texto aprobado por el desarrollador el 2026-10-12; la redacción original y la medición están en la bitácora 04-03. Medido: 0 de 532 mediciones en reposo y 0 de 116 en hover bajo AA.)*
- [x] Los bordes de componentes con `--line-strong` cumplen 3:1 en ambos modos, con el valor aprobado (claro `.65`, oscuro `.50`) y `DESIGN.md` §2.2 actualizado (AUD-02-009). Medido: mínimo 3,32:1 en los dos modos.
- [x] Todos los objetivos interactivos miden al menos 44 × 44 px a 360 y 1280 px (AUD-02-010). Medido a 320, 360, 560, 768, 1100 y 1280 px, claro y oscuro, portada y 404, y con el menú móvil abierto.
- [x] Sin desplazamiento horizontal a 320 px ni pérdida de contenido al 400 % de zoom. Medido: 0 px de desborde a 320, 360, 640 y 1280 px; ningún elemento se extiende fuera del viewport; el recorrido por teclado a 320 × 225 px (400 %) no deja el foco bajo el header.
- [x] El sitio se recorre completo con teclado (**medido** en la fase A: 8 combinaciones, menú móvil, 200 % y 400 %) y con lector de pantalla (fase B, **declarado por el desarrollador**, 2026-10-12): TalkBack 16 en el Galaxy A52 (A1 a A8 y A11) y NVDA 2026.2 / 2026.3 (B1 a B5 y B7 a B9), todas «Pasa»; teclado y menú móvil en Firefox 155 (C1.4 y C1.7) también «Pasa».
- [x] AUD-01-020 resuelto con la decisión del desarrollador (se mantiene el alt «Logotipo de Pulso Devs» en el hero, con un campo propio de `comunidad.js`). Verificado con lector de pantalla, **declarado por el desarrollador** (2026-10-12): TalkBack (A2) y NVDA (B6) lo leen una sola vez.
- [x] AUD-02-005 y AUD-02-008 actualizados con los resultados de la fase B (**declarados por el desarrollador**, 2026-10-12): verificados en Chrome y Firefox 155 y en el Galaxy A52 con Chrome 154; en AUD-02-008, en Firefox el clic dentro del segundo siguiente sí llega (C1.3) y en Chrome de escritorio se pierde ~1 s. Siguen **Parciales** (falta Safari) y se trasladan a 05-03, riesgo aceptado por el desarrollador (2026-10-12).
- [ ] Safari y VoiceOver (C2.1 a C2.6 y D8, AUD-02-005 y AUD-02-008): **pendiente, 05-03, riesgo aceptado por el desarrollador (2026-10-12).** No está entre los criterios de aceptación de 04-03; queda sin marcar por decisión del desarrollador, que cierra 04-03 sin Safari.
- [x] Accesibilidad 100 en Lighthouse (mediana de tres, móvil). Medido: 100 en las tres corridas móviles y en las tres de escritorio, portada y 404, claro y oscuro (24 de 24 corridas, ninguna auditoría fallida). El modo oscuro de Lighthouse se forzó con una bandera de Chrome y no se verificó dentro de la herramienta.
- [x] `evidencia-04-03-fase-b.md` completa y bitácora 04-03 creada. La evidencia tiene todas las filas resueltas por el desarrollador (2026-10-12): 35 «Pasa» y 7 «No probado» (Safari C2.1 a C2.6 y iPhone D8, por falta de equipo Apple).

## Fuera de alcance

- Cambios de diseño no relacionados con un defecto de accesibilidad registrado (AUD-01-015, AUD-01-020, AUD-02-009 o AUD-02-010).
- La duración o el mecanismo del efecto de cambio de tema (RDA-016).

## Datos requeridos del desarrollador

- Aprobación del valor nuevo de `--line-strong` y de cada cambio de tamaño visible.
- Resultados de las pruebas de la fase B.