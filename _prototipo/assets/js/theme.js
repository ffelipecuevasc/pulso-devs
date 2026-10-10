/**
 * Comunidad Pulso Devs — Estado de apariencia (claro / oscuro)
 * Persiste la elección del usuario. Sin elección guardada, sigue al sistema.
 */
(function () {
  'use strict';

  var cfg = window.PulsoDevs.config;
  var root = document.documentElement;
  var META_COLORS = { light: '#FFFFFF', dark: '#00131D' };
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function readStored() {
    try {
      var value = localStorage.getItem(cfg.THEME_STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) {
      return null;
    }
  }

  function store(theme) {
    try { localStorage.setItem(cfg.THEME_STORAGE_KEY, theme); } catch (e) { /* almacenamiento no disponible */ }
  }

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', META_COLORS[theme]);
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-checked', String(theme === 'dark'));
    });
  }

  function init() {
    apply(readStored() || (media && media.matches ? 'dark' : 'light'));

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = current() === 'dark' ? 'light' : 'dark';
        apply(next);
        store(next);
      });
    });

    if (media && media.addEventListener) {
      media.addEventListener('change', function (event) {
        if (!readStored()) apply(event.matches ? 'dark' : 'light');
      });
    }
  }

  window.PulsoDevs.theme = { init: init, apply: apply, current: current };
  init();
})();
