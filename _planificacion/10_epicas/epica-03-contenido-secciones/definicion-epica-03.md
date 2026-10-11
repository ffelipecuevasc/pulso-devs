# Épica 03 · Contenido y secciones

- **Estado:** Pendiente
- **Objetivo:** que todo el texto del sitio sea coherente con la visión (comunidad abierta a toda Latinoamérica, que está empezando a crecer) y no afirme nada que no exista.
- **Última revisión:** 2026-10-11, con las decisiones del desarrollador al cerrar la Épica 02

## Decisiones del desarrollador (2026-10-11)

1. **Los eventos van en una página propia (Épica 06).** Todo lo relacionado con eventos (talleres, sesiones y reuniones presenciales, pasados y futuros) irá en una página nueva del sitio de varias páginas. Esta épica no agrega bloques, secciones ni páginas para eventos.
2. **Del primer evento solo se dice que ya hubo uno, con mes y año** (octubre de 2026). Sin nombre, fecha exacta, hora, plataforma, asistentes, sorteo ni otros detalles. Los datos que RDA-014 autoriza (80 asistentes, sorteo de licencias de JetBrains y despliegue en vivo con GitHub Pages) se conservan para esa página; no se publican en esta épica.
3. **«Instructores: Desarrolladores Web Senior»** (sección Talleres) se mantiene tal como está.
4. **Los nombres de las temáticas de talleres no se tocan** (decisión del 2026-10-09; AUD-01-002).
5. **El PDF del primer taller no se guarda en el repositorio**, que es público.

## Alcance

1. Revisar y corregir los textos de la portada y del pie (AUD-01-001 y AUD-01-004), con la única mención del primer taller que fija la decisión 2.
2. Presentar los talleres con honestidad: hubo un primer taller (el único hasta ahora) y lo demás es «próximamente», sin calendario ni cifras inventadas.
3. Alinear `DESIGN.md` §6 (Talleres) con el sitio: el documento habla de tres datos clave y el sitio muestra cuatro (`registro-log.md` §4).
4. Definir e incorporar otras redes de la comunidad si el desarrollador las entrega (LinkedIn ya está en el pie desde 01-04).

## Iteraciones

| Iteración | Nombre                             | Estado    | Depende de                           |
| :-------- | :--------------------------------- | :-------- | :----------------------------------- |
| 03-01     | Revisión de contenido y coherencia | Pendiente | 01-06 y Épica 02 terminada           |
| 03-02     | Otras redes de la comunidad        | Pendiente | 03-01 y la definición de otras redes |

**Orden de ejecución:** 03-01 y después 03-02. Si al cerrar 03-01 el desarrollador no tiene otras redes que agregar, 03-02 se marca `Descartada`.

## Fuera de alcance

- Páginas nuevas y la página de eventos (Épica 06, en evaluación).
- Bloques, secciones o componentes nuevos y cualquier otro cambio de diseño.
- Cambiar los nombres de las temáticas de talleres.
- Publicar detalles de eventos, pasados o futuros.

## Relación con la Épica 06

La Épica 06 (en evaluación) deberá incluir la página de eventos que recibirá los detalles del primer taller y de los siguientes. `definicion-epica-06.md` se actualiza por separado; esta épica no la edita.

## Criterio de término

- AUD-01-001 y AUD-01-004 cerrados con evidencia.
- Los textos cambiados fueron aprobados por el desarrollador y siguen las reglas de contenido de `AGENTS.md` §6.
- Del primer evento, el sitio solo dice que ocurrió, con mes y año.
- `DESIGN.md` §6 coincide con el sitio en Talleres, o la diferencia queda registrada con la decisión del desarrollador.
- 03-02 queda `Terminada` o `Descartada`.
- No queda `PENDIENTE_DATO` publicado.