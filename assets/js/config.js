/**
 * Comunidad Pulso Devs — Configuración central
 */
(function () {
  'use strict';

  var PLACEHOLDER = /^\[[^\]]+\]$/;

  var config = {
    /** Clave de preferencia de tema. */
    THEME_STORAGE_KEY: 'pulsodevs-theme',

    FOUNDER: {
      name: 'Felipe Cuevas',
      linkedin: 'https://www.linkedin.com/in/ffelipecuevasc',
      website: 'https://felipecuevas.dev',
      photoUrl: '' // Vacío = monograma
    },

    /** Redes sociales de la comunidad */
    SOCIAL_LINKS: []
  };

  /** true si el valor sigue siendo un placeholder del tipo [NOMBRE]. */
  config.isPlaceholder = function (value) {
    return typeof value !== 'string' || value.trim() === '' || PLACEHOLDER.test(value.trim());
  };

  window.PulsoDevs = window.PulsoDevs || {};
  window.PulsoDevs.config = Object.freeze(config);
})();