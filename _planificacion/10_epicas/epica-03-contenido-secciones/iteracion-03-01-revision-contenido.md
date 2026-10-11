# Iteración 03-01 · Revisión de contenido y coherencia

- **Épica:** 03 · Contenido y secciones
- **Estado:** En revisión
- **Rama:** `main` (RDA-015)
- **Depende de:** 01-06 y la Épica 02 terminada
- **RDA relacionadas:** RDA-007, RDA-009, RDA-011, RDA-014
- **Hallazgos que cierra:** AUD-01-001, AUD-01-004
- **Relacionada:** diferencia de Talleres entre `DESIGN.md` §6 y el sitio (`registro-log.md` §4)

## Objetivo

Alinear los textos del sitio con la visión del producto y con lo que realmente existe. Del primer taller ya realizado, el sitio dice solo que ocurrió, con mes y año. Todo lo demás sobre eventos va en la página de eventos de la Épica 06.

## Decisiones del desarrollador (2026-10-11)

1. **Solo textos, sin bloques nuevos.** Se reescriben los textos que ya existen. No se agregan secciones, bloques ni componentes.
2. **Primer taller:** solo que hubo un primer evento y cuándo (octubre de 2026). Sin nombre, fecha exacta, hora, plataforma, asistentes, sorteo, despliegue ni temario. Los datos de RDA-014 se conservan para la futura página de eventos y no se publican aquí.
3. **«Instructores: Desarrolladores Web Senior»** se mantiene tal cual. No se vuelve a plantear en esta iteración.
4. **Los nombres de las temáticas no se tocan** (2026-10-09; AUD-01-002).
5. **El PDF del primer taller no está en el repositorio** (es público) y esta iteración no lo necesita: el dato publicable (octubre de 2026) ya está confirmado.

## Tareas

1. **AUD-01-001 (pie).** Según la copia del repo del 2026-10-11, el pie ya dice «Comunidad latinoamericana de desarrolladores junior» y no «Chile y Latam». Verifícalo en el sitio compilado, busca que ningún texto presente a Chile como ámbito de la comunidad y cierra el hallazgo con esa evidencia. Si queda algún texto con ese problema, propón la corrección.
2. **Primer taller.** Incorpora únicamente que hubo un primer taller en octubre de 2026, dentro de los textos existentes (por ejemplo, el «Hoy» de Visión o la nota de Talleres). Sin bloque nuevo. Lo que se puede y no se puede decir está en «Texto permitido sobre el primer taller».
3. **AUD-01-004.** Reformula el «Hoy» de Visión, la frecuencia, la bajada de Talleres y el «Más adelante», de modo que hubo un primer taller; el ritmo mensual y los siguientes talleres son un propósito, y las fechas, «próximamente». «Instructores» no cambia.
4. **Nombres de las temáticas:** no se tocan.
5. **Inventario de textos.** Revisa todos los textos visibles (`src/data/comunidad.js`, pie, encabezado, hero, página 404 y metadatos SEO) contra `AGENTS.md` §6: tono cercano, trato de tú, sin cifras ni alianzas sin confirmar, sin presentar lo futuro como disponible. Registra el resultado en una tabla de la bitácora. Candidatos detectados en la revisión del 2026-10-11 (sobre la copia sincronizada del repo; verifícalos contra el sitio actual, no son cambios aprobados):
    - Visión, «Hoy»: «un taller en vivo cada mes».
    - Talleres: la bajada («Aproximadamente una vez al mes nos juntamos en vivo…»), «Frecuencia» y «Más adelante».
    - Comunidad: «comunidad tecnológica de desarrolladores web» y «cualquier desarrollador web de Latinoamérica», más estrecho que la visión (frontend, backend, fullstack, IA, cloud, datos).
    - «Lo que encontrarás», pilar «Crecer» (becas, certificaciones, oportunidades laborales, prácticas y pasantías, noticias): redactados como ya disponibles.
    - Metadatos SEO (`seo.descripcion`): menciona «Talleres gratuitos en vivo».
    - Tarjeta de «Únete»: «entérate de próximos talleres y oportunidades».
6. **Textos fuera de `comunidad.js`.** Lista los textos visibles escritos dentro de componentes (por ejemplo, el pie). Moverlos a `src/data/comunidad.js` es un cambio de código sin efecto visual: propónlo y hazlo solo con aprobación del desarrollador; si no se aprueba, anótalo como excepción en la bitácora.
7. **`DESIGN.md` §6 (Talleres).** El documento habla de tres datos clave (frecuencia, costo, instructores) y el sitio muestra cuatro (con «Más adelante»). Pregunta al desarrollador en qué dirección se resuelve: alinear el documento al sitio o el sitio al documento. Cualquier cambio en `DESIGN.md` se hace solo con la aprobación del texto exacto. Si se edita `DESIGN.md` y cambian las etiquetas «Hoy» y «Lo que viene» de Visión, actualiza también esa descripción. Si se edita el documento, aprovecha para agregar el anillo de 5 px del nodo de la línea de tiempo (propuesta de `registro-log.md` §4, aprobada para la próxima edición).
8. **Decisiones.** Propón y registra en `decisiones.md`, con aprobación del desarrollador, que los datos de RDA-014 se conservan pero su publicación se traslada a la página de eventos de la Épica 06 (enmienda a RDA-014 o RDA nueva, según lo que proponga y apruebe).

## Texto permitido sobre el primer taller

- **Permitido:** que hubo un primer taller en vivo y que fue en octubre de 2026. Ejemplo orientativo, no aprobado: «En octubre de 2026 hicimos nuestro primer taller en vivo».
- **No permitido:** nombre del taller, día u hora, plataforma o enlaces (Meet, Luma), número de asistentes, sorteo de licencias, menciones a JetBrains o GitHub Pages, temario, bootcamp o público de egresados, y cualquier cifra.
- Tampoco se presenta como total de miembros ni se promete un calendario: las fechas siguientes son «próximamente».

## Criterios de aceptación

- [x] AUD-01-001 cerrado con evidencia: ningún texto del sitio presenta a Chile como ámbito de la comunidad (búsqueda en `src/` y en `dist/`).
- [x] La bitácora trae la tabla del inventario de textos: cada texto visible revisado, la regla de `AGENTS.md` §6 aplicada y la decisión (sin cambio, o antes y después).
- [x] Todo lo dicho sobre el primer taller se limita a «hubo uno, en octubre de 2026». Una búsqueda en el texto visible de `dist/` no encuentra «Vibe Coding», «asistentes», «JetBrains», «GitHub Pages», «Luma», «Meet», «Talento Digital» ni «WebStorm».
- [x] Ningún texto afirma alianzas, cifras de miembros ni calendario, y del primer taller solo se dice que ocurrió en octubre de 2026. Los textos en presente sobre talleres y oportunidades («Un taller al mes», «Talleres gratuitos en vivo», pilar «Crecer») se mantienen por decisión del desarrollador (2026-10-11) y quedan registrados en la bitácora. _(Criterio reformulado por el desarrollador el 2026-10-11; la redacción original está en la bitácora 03-01. Comprobado con la tabla del inventario y con búsquedas en `dist/`.)_
- [x] Los textos cambiados figuran en la bitácora (antes y después) y el desarrollador los aprobó.
- [x] Sin desbordes horizontales a 320, 360 y 1280 px, en claro y oscuro, tras los cambios de texto (medido sobre `pnpm build`).
- [x] `DESIGN.md` §6 coincide con el sitio en Talleres, o la diferencia queda registrada con la decisión del desarrollador.
- [x] No queda `PENDIENTE_DATO` publicado (el build lo comprueba y se busca en `dist/`).
- [x] La decisión sobre RDA-014 está registrada en `decisiones.md` con aprobación.
- [x] Bitácora 03-01 creada ([bitacora-03-01-2026-10-11](../../99_bitacora/bitacora-03-01-2026-10-11.md)).

## Fuera de alcance

- Cambiar los nombres de las temáticas.
- Bloques, secciones o componentes nuevos y cualquier otro cambio de diseño.
- Publicar detalles de eventos, pasados o futuros (página de eventos de la Épica 06).
- Cambiar «Instructores: Desarrolladores Web Senior».

## Datos requeridos del desarrollador

- Ninguno pendiente. El mes y el año del primer taller (octubre de 2026) están confirmados. El PDF se conserva fuera del repositorio.

## Reglas de aprobación

- Ningún texto visible nuevo se escribe sin la aprobación expresa del desarrollador. Las propuestas de redacción se presentan con `AskUserQuestion` (opción recomendada primero, explicadas en términos claros).
- Si falta un dato, se usa `PENDIENTE_DATO` y se detiene el trabajo para preguntar (`AGENTS.md` §9).
- Los cambios en `DESIGN.md`, `AGENTS.md` y `README.md` requieren la aprobación del texto exacto.