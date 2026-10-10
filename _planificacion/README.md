# _planificacion · Guía de la documentación del proyecto

Esta carpeta contiene todo lo que un agente de IA (o una persona) necesita para saber **qué construir, por qué, en qué orden y qué se hizo**. No contiene código ni se publica en el sitio.

> Si este archivo discrepa con `00_producto/registro-log.md`, prevalece el registro.

---

## 1. Estructura

```text
_planificacion/
├── README.md                     Esta guía y las plantillas
├── 00_producto/
│   ├── vision-producto.md        Qué es el sitio, para quién y qué no es
│   ├── registro-log.md           Fuente única de verdad del trabajo pendiente
│   ├── decisiones.md             Registro de Decisiones Arquitectónicas (RDA)
│   └── auditoria-tecnica.md      Auditorías acumulativas y sus hallazgos
├── 10_epicas/
│   └── epica-XX-nombre/
│       ├── definicion-epica-XX.md
│       └── iteracion-XX-YY-nombre.md
└── 99_bitacora/
    └── bitacora-XX-YY-AAAA-MM-DD.md
```

## 2. Contenido de cada carpeta

### 2.1 `00_producto/`

Documentos vivos que describen el producto completo.

1. **`vision-producto.md`:** propósito, público, alcance y exclusiones. Cambia poco; se consulta ante dudas de alcance.
2. **`registro-log.md`:** estado de todas las épicas e iteraciones, datos y decisiones pendientes del desarrollador y propuestas fuera de alcance. Es lo primero que se lee y lo último que se actualiza en cada iteración.
3. **`decisiones.md`:** cada decisión técnica relevante como RDA numerada (`RDA-001`, `RDA-002`…). Una RDA aceptada no se contradice; se reemplaza con una nueva RDA que la declare "Reemplazada por RDA-XXX".
4. **`auditoria-tecnica.md`:** auditorías acumulativas (se agregan, nunca se borran). Cada hallazgo tiene un identificador (`AUD-01-003`) y se marca como resuelto indicando la iteración o la RDA que lo cerró.

### 2.2 `10_epicas/`

Una subcarpeta por épica. Cada una contiene:

1. **`definicion-epica-XX.md`:** objetivo, alcance, iteraciones previstas y criterio de término.
2. **`iteracion-XX-YY-nombre.md`:** una unidad de trabajo acotada (idealmente de una sesión) con tareas y criterios de aceptación verificables. El nombre resume el objetivo final de la iteración.

Cuando una iteración incluye tareas que solo puede hacer el desarrollador (configurar Cloudflare, Search Console, probar en un teléfono), se divide en **fase A** (el agente) y **fase B** (el desarrollador). La evidencia de la fase B se guarda en la misma carpeta como `evidencia-XX-YY-fase-b.md`.

### 2.3 `99_bitacora/`

Un archivo por iteración ejecutada, **escrito por el agente al terminar la iteración**. Registra qué se hizo, cómo se verificó, qué quedó pendiente y qué commit se sugiere. Las bitácoras no se editan después de entregadas; las correcciones van en una bitácora nueva. La carpeta parte vacía (solo con `.gitkeep`).

## 3. Convenciones

- **Numeración:** épicas `01`–`99`; iteraciones `XX-YY`, donde `XX` es la épica y `YY` el correlativo.
- **Estados:** `Pendiente`, `En curso`, `Bloqueada`, `En revisión`, `Terminada`, `Descartada`.
- **Fechas:** formato ISO `AAAA-MM-DD`.
- **Idioma:** español de Chile en toda la documentación.
- **Ramas:** no se usan. Todo el trabajo va directo en `main` (RDA-015).
- **Commits:** `Épica N - Iteración NN-NN: descripción`, en una línea de máximo 200 caracteres. Los hace el desarrollador.

## 4. Ciclo de una iteración

1. El desarrollador pide al agente la iteración; el agente la marca como `En curso` en `registro-log.md`.
2. El agente lee `AGENTS.md`, el registro, la iteración y las RDA relacionadas.
3. El agente implementa, verifica y escribe la bitácora.
4. El agente deja la iteración en `En revisión` y propone el mensaje de commit.
5. El desarrollador revisa, hace commit y push a `main`, y marca la iteración como `Terminada`.

## 5. Plantillas

### 5.1 Iteración

```markdown
# Iteración XX-YY · Nombre

- **Épica:** XX · Nombre
- **Estado:** Pendiente
- **Rama:** `main` (RDA-015)
- **Depende de:** XX-YY
- **RDA relacionadas:** RDA-XXX
- **Hallazgos que cierra:** AUD-XX-XXX

## Objetivo
Una o dos frases.

## Tareas
1. …

## Criterios de aceptación
- [ ] …

## Fuera de alcance
- …

## Datos requeridos del desarrollador
- …
```

### 5.2 Bitácora

```markdown
# Bitácora XX-YY · Nombre de la iteración

- **Fecha:** AAAA-MM-DD
- **Agente:** Claude Code (modelo)
- **Rama:** main
- **Estado final:** En revisión | Bloqueada

## Resumen
Qué se hizo en tres a cinco líneas.

## Archivos creados o modificados
| Archivo | Cambio |
| :------ | :----- |

## Verificación
- `pnpm format:check`: OK / detalle
- `pnpm check`: OK / detalle
- `pnpm build`: OK / detalle
- Revisión móvil 360 px y escritorio, en modo claro y oscuro: …
- Lighthouse (si aplica): Rendimiento / Accesibilidad / Buenas prácticas / SEO

## Criterios de aceptación
- [x] …

## Decisiones tomadas
- … (si es estructural, enlazar RDA nueva)

## Pendientes y riesgos
- …

## Commit sugerido
`Épica N - Iteración NN-NN: descripción`
```

### 5.3 RDA

```markdown
## RDA-XXX · Título

- **Fecha:** AAAA-MM-DD
- **Estado:** Propuesta | Aceptada | Reemplazada por RDA-XXX | Descartada

**Contexto:** qué problema o fuerza obliga a decidir.
**Decisión:** qué se hace.
**Alternativas consideradas:** qué se descartó y por qué.
**Consecuencias:** qué se gana, qué se pierde, qué hay que vigilar.
```

### 5.4 Hallazgo de auditoría

```markdown
| ID | Severidad | Hallazgo | Acción recomendada | Estado |
| AUD-XX-NNN | Alta / Media / Baja | … | … | Abierto / Resuelto en XX-YY o RDA-XXX |
```
