# Iteración 03-02 · LinkedIn y redes de la comunidad

- **Épica:** 03 · Contenido y secciones
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 03-01 y la definición de otras redes
- **RDA relacionadas:** RDA-007
- **Hallazgos que cierra:** —

## Objetivo

El LinkedIn de la comunidad ya está en el prototipo y llega al sitio migrado en 01-04 por paridad. Esta iteración queda para **otras redes** de la comunidad, si el desarrollador las define; si no hay ninguna al cerrar la Épica 03, se marca como `Descartada`.

## Tareas

1. Agregar cada red nueva en `redes` de `src/data/comunidad.js`.
2. Mostrarla en el pie igual que LinkedIn, abriendo en pestaña nueva con `rel="noopener noreferrer"` y aviso accesible, con su logotipo oficial si está en `src/icons/tec-*.svg`; si no está, pedirlo.
3. Dejar las URL disponibles para el JSON-LD (`sameAs`, en 04-01).

## Criterios de aceptación

- [ ] El pie muestra el enlace y abre el perfil correcto.
- [ ] Si no hay redes, la lista no se muestra.
- [ ] Bitácora 03-02 creada.

## Fuera de alcance

- Crear o mantener el perfil de LinkedIn.

## Datos requeridos del desarrollador

- URL de cada red adicional (LinkedIn ya está: `https://www.linkedin.com/company/comunidad-pulso-devs/home/`).
