# Iteración 05-03 · Verificación final en producción

- **Épica:** 05 · Publicación y medición
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** 05-02
- **RDA relacionadas:** RDA-008
- **Hallazgos que cierra:** los que sigan abiertos en `auditoria-tecnica.md`, ya sea resueltos o como «riesgo aceptado»

## Objetivo

Comprobar que el sitio publicado cumple todo lo planificado y cerrar el ciclo inicial del proyecto.

## Riesgo aceptado (decisión del desarrollador, 2026-10-12)

No hay equipo Apple. Estos puntos no se verifican y se cierran como «no verificado, riesgo aceptado por el desarrollador», con fecha:

- AUD-02-005 y AUD-02-008 (transición de tema y clics durante el efecto) en Safari y en iPhone.
- Lector de pantalla VoiceOver y Narrador de Windows (en 04-03 se probaron TalkBack y NVDA).
- Ícono táctil de iPhone (`apple-touch-icon`).

Verificados en Chrome y Firefox. Si más adelante hay acceso a un equipo Apple, se reabre como hallazgo nuevo.

## Tareas

1. Revisar en producción (por el desarrollador, con ayuda del agente para el análisis): `200` en la portada, redirección de `www`, página 404, cabeceras (incluida la CSP de 05-02) y HTTPS. Si `www` no está configurado, el agente lo informa y el desarrollador decide; no se asume.
2. Lighthouse móvil y escritorio, mediana de cinco corridas alternadas, en la portada publicada, más LCP, CLS e INP por protocolo.
3. Validar el JSON-LD y la vista previa al compartir en WhatsApp y LinkedIn (la caché de LinkedIn puede mostrar la versión anterior; se anota).
4. Registrar el estado de indexación en Search Console, con fecha. No se exige que esté indexada.
5. Revisar una última vez en un teléfono real Android, en claro y oscuro, incluido el ícono de 192 px.
6. Clasificar cada hallazgo abierto de `auditoria-tecnica.md` como resuelto o «riesgo aceptado» (con los puntos de arriba), y cerrar la auditoría 01.
7. Actualizar `README.md` y `registro-log.md` (con aprobación). Antes de cerrar, confirmar en `registro-log.md` que la Épica 06 («en evaluación») existe y, si no, preguntar al desarrollador. Dejar abierta solo esa épica.

## Criterios de aceptación

- [ ] El sitio cumple los criterios de la Épica 04 en producción (Lighthouse 95 o más en Rendimiento, 100 en las otras tres, LCP < 2,5 s, CLS < 0,05, INP < 200 ms).
- [ ] Sin hallazgos abiertos de severidad Alta.
- [ ] Todo hallazgo abierto queda clasificado: resuelto o «riesgo aceptado» con fecha.
- [ ] Estado de indexación registrado con fecha.
- [ ] Evidencia del desarrollador registrada en `evidencia-05-03-fase-b.md`.
- [ ] Bitácora 05-03 creada.

## Fuera de alcance

- Nuevas funciones: entran como épicas o iteraciones nuevas.
- Pruebas en equipos Apple (riesgo aceptado).

## Datos requeridos del desarrollador

- Resultados de las pruebas en producción y en el teléfono.
- Decisión sobre `www` si no está configurado.