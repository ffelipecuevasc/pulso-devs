# Comunidad Pulso Devs

Sitio web oficial de **Pulso Devs**, una comunidad latinoamericana para desarrolladores junior que quieren aprender, construir proyectos y crecer juntos.

Abierta a toda Latinoamérica · [comunidadpulso.dev](https://comunidadpulso.dev)

---

## ¿Qué es este proyecto?

Es una **landing page**: una sola página que presenta la comunidad, explica qué ofrece (talleres gratuitos en vivo, apoyo, oportunidades de becas, certificaciones y empleo) y te invita a unirte al grupo de WhatsApp. No tiene formularios, cuentas ni base de datos.

Si estás aprendiendo desarrollo web, este repositorio te sirve para ver cómo se construye un sitio real, de principio a fin, con herramientas modernas.

## Tecnologías

| Herramienta | Para qué se usa |
| :-- | :-- |
| [Astro](https://astro.build) | Framework que arma el sitio y genera páginas HTML rápidas, con muy poco JavaScript. |
| [Tailwind CSS](https://tailwindcss.com) | Estilos mediante clases utilitarias, compilado localmente (sin CDN). |
| [Node.js](https://nodejs.org) | Entorno que ejecuta las herramientas de desarrollo. |
| [PNPM](https://pnpm.io) | Gestor de paquetes (instala las dependencias). |
| [Cloudflare Workers](https://workers.cloudflare.com) | Publica el sitio en internet, conectado a este repositorio de GitHub. |

## Cómo ejecutarlo en tu computador

**Requisitos:** Node.js 24 y PNPM 12.

```bash
git clone https://github.com/ffelipecuevasc/pulso-devs.git
cd pulso-devs
pnpm install
pnpm dev
```

Abre `http://localhost:4321` en tu navegador.

| Comando | Qué hace |
| :-- | :-- |
| `pnpm dev` | Inicia el sitio en modo desarrollo |
| `pnpm build` | Genera la versión final en la carpeta `dist/` |
| `pnpm preview` | Muestra localmente la versión final |

## Cómo se publica

Astro no necesita un servidor para funcionar: al compilar el proyecto genera el sitio como **archivos estáticos** (HTML, CSS y un poco de JavaScript) dentro de la carpeta `dist/`. Esos archivos, y no el código fuente, son los que ve el público.

**Cloudflare Workers** los sirve desde su red global de servidores, de modo que cada visitante los recibe desde un punto cercano a su ubicación. La publicación la realiza Wrangler, la herramienta de Cloudflare para esa tarea.

Todo el proceso está conectado a este repositorio de GitHub: cada cambio que llega a la rama `main` se compila y se publica solo, sin pasos manuales. Por eso `main` siempre refleja la versión que está en línea.

## Estructura

```text
pulso-devs/
├── src/              Código del sitio (páginas, componentes, estilos y datos)
├── public/           Archivos que se publican tal cual (hoy, solo `_headers`)
├── _planificacion/   Documentación del proyecto: épicas, decisiones y bitácoras
├── AGENTS.md         Reglas para los agentes de IA que colaboran en el código
└── DESIGN.md         Sistema de diseño: colores, tipografías y componentes
```

## Un proyecto hecho con ayuda de IA

Este sitio se desarrolla junto al agente de IA Claude Code. Para que trabajen de forma ordenada, el repositorio incluye `AGENTS.md`, con sus reglas, y la carpeta `_planificacion/`, donde cada cambio queda registrado. Puedes revisarlos para aprender cómo se organiza un proyecto de este tipo.

## Autor

Creado por **Felipe Cuevas**, fundador de la comunidad · [felipecuevas.dev](https://felipecuevas.dev)

## Licencia

El código se publica con licencia [MIT](LICENSE). El nombre, el logotipo y la identidad visual de Pulso Devs son marca de la comunidad y no están cubiertos por esa licencia: no se pueden reutilizar sin permiso.