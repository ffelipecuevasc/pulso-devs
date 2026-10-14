# Iteración 05-03 · Verificación final en producción

- **Épica:** 05 · Publicación y medición
- **Estado:** Terminada (2026-10-13)
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

- [x] El sitio cumple los criterios de la Épica 04 en producción (Lighthouse 95 o más en Rendimiento, 100 en las otras tres, LCP < 2,5 s, CLS < 0,05, INP < 200 ms). _Medido por el agente (2026-10-13, mediana de cinco alternadas): móvil 98 / 100 / 100 / 100, escritorio 100 / 100 / 100 / 100, LCP 1.839 ms, CLS 0, INP 32 a 48 ms (`bitacora-05-03-fase-a-2026-10-13.md`); confirmado por el desarrollador._
- [x] Sin hallazgos abiertos de severidad Alta. _Leído en `auditoria-tecnica.md`: AUD-01-005, 012 y 016 resueltos; confirmado por el desarrollador (2026-10-13)._
- [x] Todo hallazgo abierto queda clasificado: resuelto o «riesgo aceptado» con fecha. _Clasificación aprobada por el desarrollador y aplicada en `auditoria-tecnica.md` (2026-10-13); Safari, iPhone, VoiceOver, Narrador de Windows y `apple-touch-icon`: riesgo aceptado (declaración del 2026-10-12)._
- [x] Estado de indexación registrado con fecha. _Declarado por el desarrollador, 2026-10-13, 21:10 hrs (parte 3 de la evidencia): «La URL está en Google»; sitemap «Correcto», 1 página descubierta._
- [x] Evidencia del desarrollador registrada en `evidencia-05-03-fase-b.md`. _Partes 1 a 6 completadas el 2026-10-13._
- [x] Bitácora 05-03 creada. _`bitacora-05-03-fase-a-2026-10-13.md` y `bitacora-05-03-fase-b-2026-10-13.md`._

## Fuera de alcance

- Nuevas funciones: entran como épicas o iteraciones nuevas.
- Pruebas en equipos Apple (riesgo aceptado).

## Datos requeridos del desarrollador

- Resultados de las pruebas en producción y en el teléfono.
- Decisión sobre `www` si no está configurado.