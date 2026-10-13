# Registro de Decisiones Arquitectónicas (RDA)

Consolidado de las decisiones técnicas del proyecto. Formato y reglas en `_planificacion/README.md`.

| RDA     | Título                                                          | Estado    |
| :------ | :-------------------------------------------------------------- | :-------- |
| RDA-001 | Astro 7 en modo estático (SSG) sin adaptador                    | Aceptada  |
| RDA-002 | Tailwind CSS 4 compilado localmente, con tokens en `@theme`     | Aceptada  |
| RDA-003 | Sin React ni otro framework de UI                               | Aceptada  |
| RDA-004 | Fuentes autoalojadas: Lexend y Figtree                          | Aceptada  |
| RDA-005 | Íconos con `astro-icon` y Material Symbols Light                | Aceptada  |
| RDA-006 | Entrada solo por el enlace directo a WhatsApp, sin formulario   | Aceptada  |
| RDA-007 | Fuente única de datos de la comunidad en `src/data/comunidad.js` | Aceptada |
| RDA-008 | Despliegue con Workers Builds desde GitHub en `comunidadpulso.dev` | Aceptada |
| RDA-009 | El fundador aparece solo en el pie de página                    | Aceptada  |
| RDA-010 | Medición con Cloudflare Web Analytics y Search Console          | Aceptada  |
| RDA-011 | Sitio de una sola página (One Page) por ahora                   | Aceptada  |
| RDA-012 | Licencia MIT para el código, con reserva de marca               | Aceptada  |
| RDA-013 | El prototipo se conserva en `_prototipo/` hasta lograr paridad  | Aceptada  |
| RDA-014 | Datos publicables del primer taller                              | Aceptada (enmendada 2026-10-11) |
| RDA-015 | Trabajo directo en `main`, sin ramas                            | Aceptada  |
| RDA-016 | Transición de cambio de tema de 1 s (excepción a `DESIGN.md` §8) | Aceptada  |

---

## RDA-001 · Astro 7 en modo estático (SSG) sin adaptador

- **Fecha:** 2026-10-09
- **Estado:** Aceptada

**Contexto:** El sitio es presentacional, sin datos dinámicos, y no tendrá formulario ni backend (RDA-006). Muchos visitantes llegarán desde el celular.
**Decisión:** Astro 7 con salida estática (`output` por defecto), sin `@astrojs/cloudflare`. El directorio `dist/` se publica como recursos estáticos de un Worker (Workers Static Assets).
**Alternativas consideradas:** SSR en Cloudflare Workers (innecesario sin lógica de servidor); mantener HTML plano (sin componentes ni optimización de imágenes).
**Consecuencias:** HTML precompilado servido desde el borde de Cloudflare. Cualquier necesidad de servidor futura (un endpoint, un formulario) requiere una RDA nueva y probablemente el adaptador.

## RDA-002 · Tailwind CSS 4 compilado localmente, con tokens en `@theme`

- **Fecha:** 2026-10-09
- **Estado:** Aceptada

**Contexto:** El prototipo usa su propia hoja `assets/css/styles.css` (1.343 líneas, tokens como variables CSS y modo oscuro con `data-theme`). Algunas clases de Tailwind escritas en `index.html` no tienen efecto porque Tailwind nunca se carga (AUD-01-009). El desarrollador espera usar Tailwind compilado localmente con Node.js y PNPM.
**Decisión:** Tailwind 4 con `@tailwindcss/vite`. Los tokens de `DESIGN.md` se declaran en `src/styles/global.css` dentro de `@theme`; el modo oscuro se activa con `@custom-variant dark` sobre `[data-theme="dark"]`, no con la preferencia del sistema. No se crea `tailwind.config.js` y **no se usa el CDN de Tailwind**. El escaneo de clases se limita a `src/`.
**Alternativas consideradas:** Tailwind 3 con `@astrojs/tailwind` (integración obsoleta); mantener solo el CSS del prototipo (no cumple el hito de incorporar Tailwind); Tailwind por CDN (prohibido).
**Consecuencias:** CSS generado solo con las clases usadas. Los componentes propios del prototipo (`.btn`, `.section`, `.band`…) pueden mantenerse como capas de componentes en `global.css`; las clases utilitarias huérfanas se reemplazan por tokens.

## RDA-003 · Sin React ni otro framework de UI

- **Fecha:** 2026-10-09
- **Estado:** Aceptada

**Contexto:** La interactividad actual es mínima: menú móvil, interruptor de tema, sección activa en la navegación y el pulso del logotipo, hoy en unas 160 líneas de JavaScript.
**Decisión:** No se instala `@astrojs/react` ni otro framework. La interactividad se resuelve con HTML nativo y `<script>` de Astro. El único script en línea permitido es el que aplica el tema antes de pintar.
**Alternativas consideradas:** Islas de React (peso y costo de hidratación sin necesidad real).
**Consecuencias:** Cero JavaScript de framework en el cliente. Si una función futura lo justifica, se acepta con una RDA.

## RDA-004 · Fuentes autoalojadas: Lexend y Figtree

- **Fecha:** 2026-10-09
- **Estado:** Aceptada
- **Actualizada:** 2026-10-10 (iteración 02-01)

**Contexto:** El prototipo carga Lexend e IBM Plex Sans desde Google Fonts (AUD-01-013), una dependencia de terceros que bloquea el renderizado. Lexend es la tipografía principal obligatoria de la marca. El desarrollador pidió recomendaciones de una fuente de lectura elegante y minimalista en lugar de IBM Plex Sans y eligió **Figtree** el 2026-10-09 (entre Figtree, Instrument Sans, DM Sans y Public Sans).
**Decisión:** Lexend y Figtree se guardan en el repositorio como archivos variables `.woff2` latinos (`src/assets/fonts/`, con el archivo de licencia de cada una) y se sirven con el proveedor local de la Fonts API de Astro (`fontProviders.local()`), con `font-display: swap` y precarga de los dos archivos. Así `pnpm build` no necesita internet. Lexend se mantiene para titulares, navegación, botones y marca. **La fuente de lectura es Figtree**, que reemplaza a IBM Plex Sans (se retira y no se guarda). Sin cursivas: el sitio no las usa. Actualiza `DESIGN.md` §3.
**Alternativas consideradas:** Google Fonts remotas (descartado por AGENTS §7.3); el proveedor de Google de la Fonts API, usado en 01-03 a 01-06 (descarga en cada build y exige red); `@fontsource-variable` como dependencia permanente (descartado: solo se instalan de paso para copiar los archivos y luego se desinstalan).
**Consecuencias:** Sin peticiones a terceros ni red en el build. Licencia de redistribución de cada fuente comprobada y anotada (nombre y copyright en la bitácora 02-01); el archivo de licencia viaja junto a los `.woff2`. Actualizar una fuente es un paso manual.

## RDA-005 · Íconos con `astro-icon` y Material Symbols Light

- **Fecha:** 2026-10-09
- **Estado:** Aceptada

**Contexto:** El prototipo incrusta en `index.html` un sprite de 35 símbolos (41,9 KB), de los cuales 13 (24,7 KB) no se usan (AUD-01-015).
**Decisión:** Renderizar los íconos como SVG en línea durante la compilación con `astro-icon` y `@iconify-json/material-symbols-light`. Los nombres de ícono viven en un único componente `src/components/Icono.astro`, que marca los íconos decorativos con `aria-hidden="true"`. Los logotipos de tecnologías son SVG oficiales entregados por el desarrollador; no se inventan ni se reemplazan por íconos genéricos.
**Alternativas consideradas:** Copiar SVG a mano (válido, más tedioso); fuente de íconos (descartada).
**Consecuencias:** Solo se incluyen los íconos usados, sin JavaScript. Verificar la compatibilidad de `astro-icon` con Astro 7 al instalar. Los logotipos oficiales de tecnologías los entrega el desarrollador y se guardan en `src/icons/` con el prefijo `tec-` (por ejemplo `tec-aws.svg`); hay que comprobar que `astro-icon` conserve sus colores y degradados.

## RDA-006 · Entrada solo por el enlace directo a WhatsApp, sin formulario

- **Fecha:** 2026-10-09 (decisión del desarrollador; refleja el commit `265c7c2` del prototipo)
- **Estado:** Aceptada

**Contexto:** El prototipo original tenía un formulario de registro (nombre, apellido, país y LinkedIn) hacia Google Sheets mediante Apps Script. Fue eliminado del prototipo y no volverá.
**Decisión:** La única forma de unirse es el enlace directo al grupo de WhatsApp. El sitio no recoge datos personales, no tiene formularios, endpoints ni backend, y no usa Google Sheets ni Apps Script.
**Alternativas consideradas:** Reincorporar el formulario con Apps Script o con un Worker (descartado por el desarrollador).
**Consecuencias:** Sin tratamiento de datos personales. No se sabrá cuántos entran por clic (la medición de clics se evaluaría en el futuro, ver RDA-010). La experiencia de «confirmación posterior al registro» del brief original deja de existir.

## RDA-007 · Fuente única de datos de la comunidad en `src/data/comunidad.js`

- **Fecha:** 2026-10-09
- **Estado:** Aceptada

**Contexto:** En el prototipo, la configuración está repartida: el enlace de WhatsApp está escrito en duro en `index.html`, y `config.js` guarda solo el fundador y las redes (AUD-01-008).
**Decisión:** Un módulo `src/data/comunidad.js` exporta nombre, eslogan, URL del sitio, enlace del grupo de WhatsApp, enlace del fundador, redes sociales, temáticas de talleres, áreas y clave de tema. Componentes, metadatos y JSON-LD lo consumen. Los datos no confirmados llevan el valor `PENDIENTE_DATO`. La compilación de producción debe fallar si queda alguno publicado.
**Alternativas consideradas:** Colección de contenido de Astro (excesivo para un solo registro); variables de entorno (no aptas para datos públicos).
**Consecuencias:** Un solo punto de cambio. LinkedIn de la comunidad se agrega cuando el desarrollador entregue el enlace.

## RDA-008 · Despliegue con Workers Builds desde GitHub en `comunidadpulso.dev`

- **Fecha:** 2026-10-09
- **Estado:** Aceptada

**Contexto:** El dominio `comunidadpulso.dev` ya está en la cuenta de Cloudflare del desarrollador. El desarrollador quiere desplegar por Git y GitHub, y redirigir `www` al dominio principal.
**Decisión:** Cloudflare Workers con recursos estáticos, conectado al repositorio mediante Workers Builds. `main` publica en `https://comunidadpulso.dev`; las ramas `iteracion/XX-YY-…` generan vistas previas cuando están habilitadas. `www.comunidadpulso.dev` redirige a `comunidadpulso.dev`. La configuración del proyecto vive en `wrangler.jsonc`. Los comandos de compilación y despliegue deben usar PNPM (por ejemplo `pnpm build` y `pnpm exec wrangler deploy`), nunca `npx`.
**Alternativas consideradas:** Despliegue manual con Wrangler (sin vistas previas ni trazabilidad); Cloudflare Pages (el desarrollador eligió Workers).
**Consecuencias:** `comunidadpulso.dev` no tiene ningún despliegue previo (confirmado el 2026-10-09): la iteración 01-06 es el primer despliegue. El desarrollador configura Cloudflare (AGENTS §5); el agente solo prepara `wrangler.jsonc` y los scripts. Verificar en la documentación vigente cómo Workers Builds respeta la versión de PNPM y registrarlo en la bitácora. Si se agrega `wrangler` como dependencia de desarrollo, requiere aprobación previa. **Enmendada por RDA-015:** no hay ramas ni vistas previas por rama; solo `main` publica.

## RDA-009 · El fundador aparece solo en el pie de página

- **Fecha:** 2026-10-09 (decisión del desarrollador)
- **Estado:** Aceptada

**Contexto:** La primera versión del proyecto contemplaba una sección del fundador con biografía basada en un perfil PDF. El prototipo ya la eliminó (commits `5b00806` y `265c7c2`).
**Decisión:** Felipe Cuevas se menciona únicamente en el pie de página, como «Fundador: Felipe Cuevas», con un enlace a https://felipecuevas.dev. No hay sección, foto ni biografía.
**Alternativas consideradas:** Sección del fundador con foto y biografía (descartada por el desarrollador).
**Consecuencias:** Esto reemplaza lo que el brief original del proyecto dice sobre presentar al fundador. El enlace debe estar escrito en el HTML compilado (hoy lo completa JavaScript, AUD-01-007).

## RDA-010 · Medición con Cloudflare Web Analytics y Search Console

- **Fecha:** 2026-10-13 (decisión del desarrollador; propuesta el 2026-10-09)
- **Estado:** Aceptada

**Contexto:** El desarrollador quiere medir visitas con Cloudflare Web Analytics y Google Search Console, y quizá más adelante los clics al grupo de WhatsApp. Web Analytics carga un script de Cloudflare en tiempo de ejecución, lo que choca con AGENTS §7.3 (sin recursos de terceros).
**Decisión propuesta:** Activar Cloudflare Web Analytics y medir su efecto en Lighthouse y en el JavaScript propio antes de aceptarlo. Search Console no agrega código al sitio (verificación por DNS). No se mide el clic en WhatsApp hasta que exista una RDA nueva. Si la medición lo permite, la excepción de AGENTS §7.3 se escribe al aceptar esta RDA.
**Alternativas consideradas:** No medir visitas (se pierde información); Google Analytics o Tag Manager (más peso y consentimiento; no pedidos).
**Consecuencias:** Verificar en la documentación vigente de Cloudflare si en un Worker con recursos estáticos Web Analytics se activa desde el panel o requiere pegar el script con su token en el layout (en ese caso el token es público, pero la decisión de dónde guardarlo va en `comunidad.js`).

## RDA-011 · Sitio de una sola página (One Page) por ahora

- **Fecha:** 2026-10-09 (decisión del desarrollador)
- **Estado:** Aceptada

**Contexto:** La portada tiene secciones ancladas. El desarrollador consideró crear más páginas con navegación entre ellas, pero prefiere hacerlo solo cuando el sitio ya esté desplegado y funcionando.
**Decisión:** El sitio es una sola página (`/`) con secciones ancladas (`#inicio`, `#comunidad`, `#encontraras`, `#talleres`, `#vision`, `#unete`), más la página 404. El menú tiene tres entradas (Comunidad, Talleres y Visión) y el botón «Únete»; el enlace «Oportunidades» se retira. La navegación multipágina queda como **Épica 06, en evaluación**: se decidirá después del despliegue y puede no llegar a hacerse. Si se acepta, una RDA nueva reemplazará a esta.
**Alternativas consideradas:** Multipágina desde ahora (aplazada por decisión del desarrollador).
**Consecuencias:** Menos HTML que mantener y un sitemap mínimo. Conviene no renombrar las anclas existentes (`/#talleres`, etc.), porque pueden estar compartidas en enlaces.

## RDA-012 · Licencia MIT para el código, con reserva de marca

- **Fecha:** 2026-10-09
- **Estado:** Aceptada

**Contexto:** El repositorio es público y con fines de estudio, pero el nombre, el logotipo y la identidad visual son de la comunidad.
**Decisión:** Archivo `LICENSE` con licencia MIT sobre el código y una nota que excluye el nombre «Pulso Devs», su logotipo y su identidad visual. El `README.md` lo explica.
**Alternativas consideradas:** Sin licencia (nadie podría reutilizar el código legalmente); licencia restrictiva (contraria al fin de estudio).
**Consecuencias:** El código puede reutilizarse libremente; la marca no. Si se agrega `license` en `package.json`, usar `MIT`.

## RDA-013 · El prototipo se conserva en `_prototipo/` hasta lograr paridad

- **Fecha:** 2026-10-09
- **Estado:** Aceptada

**Contexto:** El sitio actual (`index.html` y `assets/`) es la referencia visual y de contenido de la migración. Si se deja en la raíz, se confunde con el proyecto Astro.
**Decisión:** En la iteración 01-01 el desarrollador mueve `index.html` y `assets/` a `_prototipo/`. La carpeta se excluye de Prettier, de `astro check` y del escaneo de Tailwind. Se elimina en la iteración 01-06, cuando el sitio migrado está desplegado y verificado.
**Alternativas consideradas:** Borrarlo de inmediato (se pierde la referencia); dejarlo en la raíz (ruido y riesgo de edición equivocada).
**Consecuencias:** Convivencia temporal de dos versiones. `_prototipo/` no se publica.

## RDA-014 · Datos publicables del primer taller

- **Fecha:** 2026-10-10 (decisión del desarrollador, por escrito)
- **Estado:** Aceptada

**Contexto:** El PDF del primer taller («Del Vibe Coding a la Ingeniería Web: Desarrolla tu web con Claude», 3 de octubre de 2026) contiene datos que `AGENTS.md` §6 manda confirmar antes de publicar.
**Decisión:** Se pueden publicar: la cifra de **80 asistentes** (confirmada por el desarrollador como real); el **sorteo de 20 licencias de JetBrains** (cada licencia daba acceso al conjunto completo de IDEs de JetBrains; no se llama «WebStorm PRO»); y que el taller incluyó un **despliegue en vivo con GitHub Pages**. **No** se menciona el bootcamp Talento Digital ni al público de egresados: el sitio sigue presentando la comunidad como abierta a toda Latinoamérica.
**Alternativas consideradas:** No publicar la cifra ni el sorteo (descartado por el desarrollador).
**Consecuencias:** Los datos se redactan como hechos pasados («Participaron 80 personas»), sin proyectar cifras futuras. La cifra no debe presentarse como total de miembros de la comunidad. Los textos concretos pasan por la aprobación del desarrollador en 03-01. Cualquier otro dato del PDF requiere confirmación nueva.

> **Enmienda (2026-10-11, decisión del desarrollador):** los datos autorizados se conservan, pero su publicación se traslada a la página de eventos de la Épica 06. En la Épica 03 el sitio solo dice que hubo un primer taller en octubre de 2026. La frase «Los textos concretos pasan por la aprobación del desarrollador en 03-01» queda reemplazada por esta enmienda.

## RDA-015 · Trabajo directo en `main`, sin ramas

- **Fecha:** 2026-10-10 (decisión del desarrollador)
- **Estado:** Aceptada

**Contexto:** La documentación inicial preveía una rama por iteración (`iteracion/XX-YY-…`) con vistas previas en Cloudflare. El desarrollador es la única persona del proyecto y todas las iteraciones las implementa Claude Code. `.claude/settings.json` niega además `git checkout` y `git switch` al agente.
**Decisión:** Todo el trabajo, en todas las épicas, se hace directamente sobre `main`. No se crean ramas ni subramas. Claude Code no hace commit ni push (`AGENTS.md` §5): el desarrollador revisa y hace un commit por iteración, con el formato `Épica N - Iteración NN-NN: descripción`. Enmienda en este punto a RDA-008 (sin vistas previas por rama).
**Alternativas consideradas:** Una rama por iteración (descartada por el desarrollador: sin colaboradores, el costo supera el beneficio).
**Consecuencias:** El historial de `main` es lineal. Desde 01-06, con Workers Builds conectado, **cada push a `main` publica en producción**: ninguna iteración se entrega con `pnpm build` fallando, y el commit se revisa antes del push. Se pierde la vista previa antes de publicar; si se echa de menos, se aprueba una RDA nueva.

## RDA-016 · Transición de cambio de tema de 1 s (excepción a `DESIGN.md` §8)

- **Fecha:** 2026-10-10 (decisión del desarrollador)
- **Estado:** Aceptada

**Contexto:** El desarrollador quiere un efecto en que el tema nuevo se revele como un círculo que crece desde el interruptor, con la duración de su versión original (1 s). `DESIGN.md` §8 mantiene animaciones breves (0,2 a 0,35 s las transiciones).
**Decisión:** Se implementa con la View Transitions API nativa (`document.startViewTransition`), sin dependencias y sin `<ClientRouter />`. Duración **1 s**, única excepción a `DESIGN.md` §8; el resto del sistema no cambia. Sin la API o con `prefers-reduced-motion: reduce` el cambio es inmediato. Se implementa en la iteración 02-03.
**Alternativas consideradas:** Cambio inmediato (sin efecto); duración de 0,6 s (descartada por el desarrollador).
**Consecuencias:** 1 s es un efecto largo: debe ser interrumpible sin errores y no puede bloquear la interacción ni degradar el INP. La API no existe en todos los navegadores (AUD-02-005).

