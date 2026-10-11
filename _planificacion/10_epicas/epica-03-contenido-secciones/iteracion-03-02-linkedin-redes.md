# Iteración 03-02 · Otras redes de la comunidad

- **Épica:** 03 · Contenido y secciones
- **Estado:** Descartada (2026-10-11): el desarrollador confirmó que no hay otras redes de la comunidad
- **Rama:** `main` (RDA-015)
- **Depende de:** 03-01 y la definición de otras redes
- **RDA relacionadas:** RDA-007
- **Hallazgos que cierra:** —

## Objetivo

El LinkedIn de la comunidad ya está en el pie desde 01-04 (`https://www.linkedin.com/company/comunidad-pulso-devs/home/`). Esta iteración es solo para **otras redes** de la comunidad, si el desarrollador las define.

## Decisión de entrada

Al cerrar 03-01, pregunta al desarrollador con `AskUserQuestion` si hay otras redes que agregar.

- Si no hay ninguna, la iteración se marca `Descartada` en `registro-log.md` y en este archivo, y la Épica 03 se cierra sin ella.
- Si hay alguna, continúa con las tareas. No se agrega ninguna red sin la URL entregada por escrito por el desarrollador, ni se inventa un perfil.

## Tareas

1. Agregar cada red nueva en `redes` de `src/data/comunidad.js`.
2. Mostrarla en el pie igual que LinkedIn: abre en pestaña nueva con `rel="noopener noreferrer"` y aviso accesible, con su logotipo oficial si está en `src/icons/tec-*.svg`. Si el logotipo no está, pídelo al desarrollador; no lo inventes ni lo reemplaces por un ícono genérico.
3. Dejar las URL disponibles para el JSON-LD (`sameAs`, en 04-01).

## Criterios de aceptación

- [ ] _(No aplica: no hay redes nuevas.)_ Si hay redes nuevas: cada enlace del pie abre en pestaña nueva con `rel="noopener noreferrer"` y aviso accesible, y su `href` coincide con la URL entregada por el desarrollador (medido en el HTML compilado).
- [ ] _(No aplica: no hay redes nuevas.)_ Si hay redes nuevas: sin desbordes horizontales a 320, 360 y 1280 px, en claro y oscuro.
- [x] Si no hay redes nuevas: la iteración queda `Descartada` y no se agrega ninguna lista vacía al pie. Medido en `dist/index.html`: el pie tiene un solo enlace de red (`social-link`, LinkedIn) y los únicos `href` externos del sitio son WhatsApp, felipecuevas.dev y LinkedIn; `src/` no cambió en esta iteración.
- [x] Bitácora 03-02 creada ([bitacora-03-02-2026-10-11](../../99_bitacora/bitacora-03-02-2026-10-11.md)) (también si queda `Descartada`, con el motivo y la decisión del desarrollador).

## Fuera de alcance

- Crear o mantener los perfiles de las redes.
- Cambios de diseño del pie.

## Datos requeridos del desarrollador

- URL de cada red adicional, si las hay (LinkedIn ya está).