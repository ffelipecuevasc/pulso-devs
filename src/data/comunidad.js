/**
 * Fuente única de datos de la comunidad (RDA-007).
 *
 * Aquí viven los valores configurables: enlaces, redes, URL del sitio, clave de tema
 * y los textos que consumen componentes, metadatos y datos estructurados.
 * Ningún componente escribe estos valores en duro (AGENTS.md §6.5).
 *
 * Si falta un dato, se escribe el marcador `PENDIENTE_DATO` y se registra en
 * `_planificacion/00_producto/registro-log.md`. La compilación de producción falla
 * mientras quede el marcador en algún archivo publicado (src/integraciones/).
 *
 * Los textos son idénticos a los del sitio original (commit d60c55e del historial de Git).
 */

export const comunidad = {
  nombre: 'Comunidad Pulso Devs',
  nombreCorto: 'Pulso Devs',
  eslogan: 'Desarrollando sitios web a puro pulso en comunidad.',
  idioma: 'es',
  localeOg: 'es_LA',

  /** URL del sitio, sin barra final. También alimenta `site` en astro.config.mjs. */
  url: 'https://comunidadpulso.dev',

  /** Textos de la cabecera SEO de la portada. */
  seo: {
    titulo: 'Comunidad Pulso Devs · Desarrolladores junior de Latinoamérica',
    descripcion:
      'Pulso Devs es una comunidad latinoamericana para desarrolladores junior de frontend, backend, fullstack e ingeniería de IA. Talleres gratuitos en vivo, apoyo para tus proyectos y oportunidades para crecer.',
    descripcionOg:
      'Una comunidad para desarrolladores junior que quieren aprender, construir y crecer juntos. Abierta a toda Latinoamérica.',
    textoAltImagen: 'Logotipo de Pulso Devs',
    colorTema: '#FFFFFF',
    colorTemaOscuro: '#00131D',
  },

  /** Única forma de unirse a la comunidad (RDA-006). */
  whatsapp: 'https://chat.whatsapp.com/JejECSvdP4fDCAMh43Ohzs',

  /** El fundador aparece solo en el pie de página (RDA-009). */
  fundador: {
    nombre: 'Felipe Cuevas',
    sitioWeb: 'https://felipecuevas.dev',
  },

  /** Redes de la comunidad. Otras redes: pendientes de definir (iteración 03-02). */
  redes: {
    linkedin: 'https://www.linkedin.com/company/comunidad-pulso-devs/home/',
  },

  /** Clave de `localStorage` con la preferencia de tema. */
  claveTema: 'pulsodevs-theme',

  /** Navegación principal. `#oportunidades` se retira (AUD-01-005, RDA-011). */
  navegacion: [
    { texto: 'Comunidad', href: '#comunidad' },
    { texto: 'Talleres', href: '#talleres' },
    { texto: 'Visión', href: '#vision' },
  ],

  /** Áreas que reúnen a la comunidad (sección #comunidad). */
  areas: [
    {
      nombre: 'Frontend',
      descripcion: 'Interfaces, accesibilidad y la web que la gente usa.',
    },
    {
      nombre: 'Backend',
      descripcion: 'APIs, bases de datos y la lógica que corre en el servidor.',
    },
    {
      nombre: 'Fullstack',
      descripcion: 'Del navegador a la base de datos, de punta a punta.',
    },
    {
      nombre: 'Inteligencia Artificial',
      descripcion: 'Modelos, agentes y aplicaciones que integran inteligencia artificial.',
    },
  ],

  /**
   * Temáticas de los talleres (sección #talleres), en el orden del sitio original.
   * `icono` es un nombre de src/data/iconos.js (los elegió el desarrollador; AUD-02-003).
   */
  tematicas: [
    { nombre: 'Desarrollo Web', icono: 'web' },
    { nombre: 'Desarrollo Fullstack', icono: 'code_blocks' },
    { nombre: 'Desarrollo Web + IA', icono: 'wand_stars' },
    { nombre: 'Ingeniería de Datos + Tecnología Cloud', icono: 'cloud_sync' },
    { nombre: 'Desarrollo Web + Tecnología Cloud', icono: 'rocket_launch' },
    { nombre: 'Aplicaciones con Agentes de IA', icono: 'robot_2' },
  ],

  /**
   * Textos de las secciones de la portada, idénticos a los del sitio original (los ajustes de texto
   * van en la iteración 03-01). `fuerte` es el fragmento que se destaca con <strong>; `resto`
   * sigue a continuación. Los `icono` son nombres de src/data/iconos.js.
   */
  secciones: {
    comunidad: {
      titulo: 'Un lugar para no aprender en solitario.',
      declaracion: {
        fuerte: 'Pulso Devs',
        resto:
          ' es una comunidad tecnológica de desarrolladores web: personas que están dando sus primeros pasos en la industria y que les gusta avanzar en compañía.',
      },
      apertura: {
        fuerte: 'No somos un grupo cerrado.',
        resto:
          ' La puerta está abierta para cualquier desarrollador web de Latinoamérica que quiera aprender, colaborar y crecer con otros.',
      },
      tituloAreas: 'Lo que nos reúne',
    },

    encontraras: {
      titulo: 'Lo que encontrarás en Pulso Devs',
      bajada:
        'Tres cosas que se refuerzan entre sí: construir proyectos reales, aprender con otros y estar cerca de las oportunidades.',
      pilares: [
        {
          titulo: 'Construir',
          items: [
            {
              icono: 'deployed_code',
              titulo: 'Apoyo para tus proyectos web',
              texto:
                'Comparte lo que estás construyendo, pide retroalimentación y destraba lo que te tiene detenido.',
            },
            {
              icono: 'diversity_3',
              titulo: 'Comunidad',
              texto:
                'Devs en la misma etapa que tú, con quienes compartir dudas, avances y experiencias.',
            },
          ],
        },
        {
          titulo: 'Aprender',
          items: [
            {
              icono: 'cast_for_education',
              titulo: 'Talleres gratuitos en vivo',
              texto:
                'Sesiones prácticas sobre desarrollo web, datos, cloud e inteligencia artificial.',
            },
            {
              icono: 'library_books',
              titulo: 'Recursos de aprendizaje',
              texto: 'Material seleccionado para seguir avanzando entre un taller y otro.',
            },
          ],
        },
        {
          titulo: 'Crecer',
          compacto: true,
          items: [
            {
              icono: 'school',
              titulo: 'Becas',
              texto: 'Programas de estudio a los que puedes postular.',
            },
            {
              icono: 'workspace_premium',
              titulo: 'Certificaciones',
              texto: 'Opciones oficiales, gratuitas o con descuento.',
            },
            {
              icono: 'work',
              titulo: 'Oportunidades laborales',
              texto: 'Ofertas pensadas para perfiles junior.',
            },
            {
              icono: 'badge',
              titulo: 'Prácticas y pasantías',
              texto: 'Tu primera experiencia en un equipo real.',
            },
            {
              icono: 'campaign',
              titulo: 'Noticias tecnológicas',
              texto: 'Lo que pasa en la industria, sin tener que buscarlo solo.',
            },
          ],
        },
      ],
    },

    talleres: {
      titulo: 'Talleres gratuitos en vivo',
      bajada:
        'Queremos juntarnos en vivo aproximadamente una vez al mes para aprender haciendo, con espacio para preguntas y sin costo.',
      datos: [
        {
          icono: 'calendar_month',
          etiqueta: 'Frecuencia',
          valor: 'Un taller al mes, aproximadamente',
        },
        { icono: 'volunteer_activism', etiqueta: 'Costo', valor: 'Gratuito' },
        { icono: 'person', etiqueta: 'Instructores', valor: 'Desarrolladores Web Senior' },
        { icono: 'groups', etiqueta: 'Más adelante', valor: 'Nuevos instructores de IA y más' },
      ],
      tituloTematicas: 'Temáticas',
      nota: {
        icono: 'schedule',
        texto:
          'En octubre de 2026 hicimos nuestro primer taller en vivo. Las próximas fechas se anunciarán pronto dentro de la comunidad.',
      },
    },

    vision: {
      titulo: 'Esto recién comienza.',
      bajada:
        'Pulso Devs es una comunidad nueva y no queremos parecer más grande de lo que es. Queremos crecer bien, junto a quienes se sumen desde el principio.',
      hoy: {
        etiqueta: 'Hoy',
        texto: 'Una comunidad en marcha y un grupo donde compartir dudas, avances y oportunidades.',
      },
      proximo: {
        etiqueta: 'Lo que viene',
        items: [
          'Más talleres',
          'Más instructores',
          'Más recursos',
          'Más oportunidades',
          'Más miembros',
          'Más colaboración',
          'Más conexiones profesionales',
        ],
      },
      lema: 'Construimos nuestro futuro tecnológico juntos.',
    },

    unete: {
      titulo: '¿Quieres formar parte?',
      bajada:
        'Pulso Devs está abierta a desarrolladores junior de toda Latinoamérica. Puedes unirte directamente a nuestro grupo de WhatsApp sin necesidad de registros previos.',
      pasos: [
        'Haz clic en el enlace de invitación.',
        'Únete de forma totalmente gratuita.',
        'Sin necesidad de entregar datos personales.',
      ],
      tarjeta: {
        antetitulo: 'Grupo oficial de WhatsApp',
        titulo: 'Acceso directo a la comunidad',
        texto:
          'Conecta, aprende y colabora con otros desarrolladores. Entra a nuestro grupo oficial y entérate de próximos talleres y oportunidades.',
        boton: 'Unirme al grupo de WhatsApp',
        nota: 'Se abrirá WhatsApp en una pestaña nueva.',
      },
    },
  },
};

/** Año del pie de página, calculado al compilar (no en el navegador). */
export const anioActual = new Date().getFullYear();
