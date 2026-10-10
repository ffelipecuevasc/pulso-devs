# Iteración 03-01 · Revisión de contenido y coherencia

- **Épica:** 03 · Contenido y secciones
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 01-06
- **RDA relacionadas:** RDA-007, RDA-014
- **Hallazgos que cierra:** AUD-01-001, AUD-01-004

## Objetivo

Alinear los textos del sitio con la visión del producto y con lo que realmente existe, incluido el primer taller ya realizado.

## Tareas

1. Corregir la descripción del pie para que hable de desarrolladores junior de toda Latinoamérica (AUD-01-001).
2. Con el PDF que entregue el desarrollador como única fuente, incorporar el primer taller realizado (el único hasta ahora). Solo los datos que respalda el PDF y que RDA-014 autoriza (incluye los 80 asistentes, el sorteo de licencias de JetBrains y el despliegue en vivo con GitHub Pages).
3. Reformular «Hoy», la frecuencia y «Más adelante» en la visión y en talleres (AUD-01-004): hubo un primer taller; el ritmo mensual y los siguientes talleres son un propósito, y las fechas, «próximamente».
4. Los nombres de las temáticas de talleres **no se tocan** (decisión del desarrollador del 2026-10-09; AUD-01-002).
5. Repasar todo el texto contra `AGENTS.md` §6: tono cercano, trato de tú, sin cifras ni alianzas sin confirmar, sin presentar lo futuro como disponible.
6. Todos los textos editables viven en `src/data/comunidad.js`.

## Criterios de aceptación

- [ ] Ninguna afirmación del sitio contradice la visión del producto.
- [ ] Todo lo dicho sobre el primer taller está respaldado por el PDF.
- [ ] Los textos cambiados figuran en la bitácora (antes y después) y el desarrollador los aprobó.
- [ ] No queda `PENDIENTE_DATO` publicado.
- [ ] Bitácora 03-01 creada.

## Fuera de alcance

- Cambiar los nombres de las temáticas y cualquier cambio de diseño.

## Datos requeridos del desarrollador

- Ninguno pendiente: el PDF llegó el 2026-10-10 y los datos publicables quedaron definidos en RDA-014.

### Datos que respalda el PDF (primer taller)

- Nombre: «Del Vibe Coding a la Ingeniería Web: Desarrolla tu web con Claude».
- Fecha y hora: 3 de octubre de 2026, 20:00 a 21:00 (GMT-3), en vivo por Google Meet, gratuito, con registro en Luma.
- Objetivos y temario: los que figuran en el PDF (se copian solo desde ahí).

### Decisiones del desarrollador sobre qué publicar (RDA-014, 2026-10-10)

1. **80 asistentes:** se publica, como dato del primer taller (no como total de miembros).
2. **Público objetivo:** no se menciona el bootcamp Talento Digital; se mantiene «abierta a toda Latinoamérica».
3. **Sorteo:** se publica el sorteo de 20 licencias de JetBrains; cada una daba acceso al conjunto completo de IDEs de JetBrains (no se escribe «WebStorm PRO»).
4. **GitHub Pages:** se publica que en el taller se hizo un despliegue en vivo con GitHub Pages.

Los textos exactos se redactan en la iteración y el desarrollador los aprueba antes del cierre. Si aparece otro dato del PDF que no esté en esta lista, se pregunta.
