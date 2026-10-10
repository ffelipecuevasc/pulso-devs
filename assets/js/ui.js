/**
 * Comunidad Pulso Devs — Interfaz
 * Header, navegación móvil, sección activa, interacción del hero
 * y elementos que dependen de config.js.
 */
(function () {
  'use strict';

  var cfg = window.PulsoDevs.config;
  var DESKTOP = window.matchMedia('(min-width: 68.75em)');

  /* ---------- Header con borde al hacer scroll ---------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var update = function () {
      header.setAttribute('data-scrolled', String(window.scrollY > 8));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;

    function setOpen(open, returnFocus) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('is-locked', open);
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });

    // Mantiene el foco dentro del menú abierto (toggle + enlaces)
    menu.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      var items = [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll('a')));
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === menu.querySelector('a')) {
        event.preventDefault();
        first.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    DESKTOP.addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ---------- Sección activa en la navegación ---------- */
  function initActiveSection() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav__list a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        var active = byId[entry.target.id];
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Pulso del logotipo del hero (al pasar el cursor) ---------- */
  function initHeroPulse() {
    var logo = document.querySelector('[data-hero-logo]');
    if (!logo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var pulse = function () {
      logo.classList.remove('is-pulsing');
      void logo.offsetWidth; // reinicia la animación
      logo.classList.add('is-pulsing');
    };
    logo.addEventListener('pointerenter', pulse);
  }

  /* ---------- Elementos que dependen de la configuración ---------- */
  function initConfigDriven() {
    // Fundador: fotografía opcional
    var portrait = document.querySelector('[data-founder-portrait]');
    if (portrait && !cfg.isPlaceholder(cfg.FOUNDER.photoUrl)) {
      var img = document.createElement('img');
      img.className = 'founder__photo';
      img.src = cfg.FOUNDER.photoUrl;
      img.alt = 'Fotografía de ' + cfg.FOUNDER.name + ', fundador de Pulso Devs';
      img.loading = 'lazy';
      var mono = portrait.querySelector('.founder__monogram');
      if (mono) mono.remove();
      portrait.insertBefore(img, portrait.firstChild);
    }

    // Enlaces del fundador
    var li = document.querySelector('[data-founder-linkedin]');
    if (li) li.href = cfg.FOUNDER.linkedin;
    var web = document.querySelector('[data-founder-website]');
    if (web) web.href = cfg.FOUNDER.website;

    var inCom = document.querySelector('[data-community-linkedin]');
    if (inCom && cfg.COMMUNITY && !cfg.isPlaceholder(cfg.COMMUNITY.linkedin)) inCom.href = cfg.COMMUNITY.linkedin;

    // Redes sociales de la comunidad
    var social = document.querySelector('[data-social-list]');
    var links = (cfg.SOCIAL_LINKS || []).filter(function (s) { return s && !cfg.isPlaceholder(s.url); });
    if (social && links.length) {
      links.forEach(function (s) {
        var item = document.createElement('li');
        var a = document.createElement('a');
        a.className = 'link-arrow';
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = s.label;
        item.appendChild(a);
        social.appendChild(item);
      });
      social.hidden = false;
    }

    // Año del copyright
    var year = document.querySelector('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  initHeader();
  initMobileMenu();
  initActiveSection();
  initHeroPulse();
  initConfigDriven();
})();
