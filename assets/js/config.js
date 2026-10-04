/**
 * Comunidad Pulso Devs — Configuración central
 * ---------------------------------------------------------------
 * Todo valor configurable del sitio vive aquí.
 * Este archivo es PÚBLICO (se descarga en el navegador):
 * no pongas credenciales, API keys, tokens ni IDs privados.
 *
 * Los valores entre corchetes [ASÍ] son placeholders pendientes.
 */
(function () {
  'use strict';

  var PLACEHOLDER = /^\[[^\]]+\]$/;

  var config = {
    /**
     * URL pública de la Web App de Google Apps Script (termina en /exec).
     * Se obtiene al implementar apps-script/Code.gs como "Aplicación web".
     * Mientras sea un placeholder, el formulario funciona en modo demostración
     * y NO guarda datos.
     */
    REGISTRATION_ENDPOINT: '[GOOGLE_APPS_SCRIPT_WEB_APP_URL]',

    /** Enlace de invitación al grupo/comunidad de WhatsApp. */
    WHATSAPP_COMMUNITY_URL: '[WHATSAPP_COMMUNITY_URL]',

    /** Tiempo máximo de espera de la solicitud de registro (ms). */
    REQUEST_TIMEOUT_MS: 15000,

    /** Clave de preferencia de tema. Debe coincidir con el script inline de index.html. */
    THEME_STORAGE_KEY: 'pulsodevs-theme',

    FOUNDER: {
      name: 'Felipe Cuevas',
      linkedin: 'https://www.linkedin.com/in/ffelipecuevasc',
      website: 'https://felipecuevas.dev',
      /** URL o ruta de una fotografía oficial (opcional). Vacío = monograma. */
      photoUrl: ''
    },

    /**
     * Redes sociales de la comunidad (aún no entregadas).
     * Ejemplo: { label: 'LinkedIn', url: 'https://www.linkedin.com/company/...' }
     * Si la lista está vacía, el bloque no se muestra en el footer.
     */
    SOCIAL_LINKS: [],

    /** Países disponibles en el formulario. */
    COUNTRIES: [
      'Argentina', 'Belice', 'Bolivia', 'Brasil', 'Chile', 'Colombia',
      'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Guyana',
      'Haití', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú',
      'Puerto Rico', 'República Dominicana', 'Surinam', 'Uruguay', 'Venezuela',
      'Otro país'
    ]
  };

  /** true si el valor sigue siendo un placeholder del tipo [NOMBRE]. */
  config.isPlaceholder = function (value) {
    return typeof value !== 'string' || value.trim() === '' || PLACEHOLDER.test(value.trim());
  };

  window.PulsoDevs = window.PulsoDevs || {};
  window.PulsoDevs.config = Object.freeze(config);
})();
