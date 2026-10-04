/**
 * Comunidad Pulso Devs — Formulario de registro
 * Validación, estados (idle → submitting → success | error) y bienvenida.
 */
(function () {
  'use strict';

  var cfg = window.PulsoDevs.config;
  var api = window.PulsoDevs.api;

  var form = document.querySelector('[data-registration-form]');
  if (!form) return;

  var welcome = document.querySelector('[data-welcome]');
  var alertBox = form.querySelector('[data-form-alert]');
  var submitBtn = form.querySelector('[data-submit]');
  var submitLabel = form.querySelector('[data-submit-label]');
  var status = form.querySelector('[data-form-status]');
  var countrySelect = form.querySelector('[data-country-select]');

  var LABELS = {
    idle: 'Unirme a Pulso Devs',
    submitting: 'Enviando registro…',
    retry: 'Intentar de nuevo'
  };

  /* ---------- Países ---------- */
  cfg.COUNTRIES.forEach(function (country) {
    var option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });

  /* ---------- Reglas de validación ---------- */
  var NAME_PATTERN = (function () {
    try { return new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M}' .-]*$", 'u'); }
    catch (e) { return /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ' .-]*$/; }
  })();

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function validateName(value, label) {
    var v = cleanText(value);
    if (!v) return { error: 'Ingresa tu ' + label + '.' };
    if (v.length < 2) return { error: 'Tu ' + label + ' debe tener al menos 2 caracteres.' };
    if (v.length > 60) return { error: 'Tu ' + label + ' puede tener hasta 60 caracteres.' };
    if (!NAME_PATTERN.test(v)) return { error: 'Usa solo letras, espacios, apóstrofos o guiones.' };
    return { value: v };
  }

  function validateCountry(value) {
    var v = cleanText(value);
    if (!v || cfg.COUNTRIES.indexOf(v) === -1) return { error: 'Selecciona tu país.' };
    return { value: v };
  }

  function validateLinkedIn(value) {
    var raw = cleanText(value);
    if (!raw) return { error: 'Ingresa la URL de tu perfil de LinkedIn.' };
    var candidate = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw;
    var url;
    try { url = new URL(candidate); } catch (e) { url = null; }
    var host = url ? url.hostname.toLowerCase() : '';
    var validHost = host === 'linkedin.com' || /\.linkedin\.com$/.test(host);
    var validPath = url ? /^\/(in|pub)\/[^/\s]+\/?/i.test(url.pathname) : false;
    if (!url || !validHost || !validPath) {
      return { error: 'Revisa la URL. Debe verse como https://www.linkedin.com/in/tu-perfil' };
    }
    return { value: 'https://' + host + url.pathname.replace(/\/+$/, '') };
  }

  var RULES = {
    nombre: function (v) { return validateName(v, 'nombre'); },
    apellido: function (v) { return validateName(v, 'apellido'); },
    pais: validateCountry,
    linkedin: validateLinkedIn
  };

  /* ---------- Errores por campo ---------- */
  function fieldWrap(name) { return form.querySelector('[data-field="' + name + '"]'); }

  function showFieldError(name, message) {
    var wrap = fieldWrap(name);
    var input = form.elements[name];
    var error = wrap.querySelector('.field__error');
    wrap.classList.toggle('is-invalid', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message || '';
  }

  function checkField(name) {
    var result = RULES[name](form.elements[name].value);
    showFieldError(name, result.error);
    return result;
  }

  Object.keys(RULES).forEach(function (name) {
    var input = form.elements[name];
    input.addEventListener('blur', function () {
      if (input.value.trim() !== '' || input.dataset.touched) checkField(name);
      input.dataset.touched = 'true';
    });
    input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', function () {
      if (fieldWrap(name).classList.contains('is-invalid')) checkField(name);
    });
  });

  /* ---------- Estados ---------- */
  function setState(state) {
    form.setAttribute('data-state', state);
    var busy = state === 'submitting';
    form.setAttribute('aria-busy', String(busy));
    submitBtn.disabled = busy;
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && el !== submitBtn) el.readOnly = busy;
      if (el.tagName === 'SELECT') el.disabled = busy;
    });
    alertBox.hidden = state !== 'error';
    submitLabel.textContent = busy ? LABELS.submitting : state === 'error' ? LABELS.retry : LABELS.idle;
    status.textContent = busy ? 'Enviando tu registro.' : state === 'error' ? 'No pudimos completar tu registro.' : '';
  }

  function showWelcome(member, result) {
    var nameSlot = welcome.querySelector('[data-welcome-name]');
    nameSlot.textContent = ', ' + member.nombre.split(' ')[0];

    var wa = welcome.querySelector('[data-whatsapp-link]');
    var waPending = welcome.querySelector('[data-whatsapp-pending]');
    if (cfg.isPlaceholder(cfg.WHATSAPP_COMMUNITY_URL)) {
      wa.removeAttribute('href');
      wa.setAttribute('aria-disabled', 'true');
      waPending.hidden = false;
    } else {
      wa.href = cfg.WHATSAPP_COMMUNITY_URL;
      wa.removeAttribute('aria-disabled');
      waPending.hidden = true;
    }

    welcome.querySelector('[data-demo-note]').hidden = !(result && result.demo);

    form.hidden = true;
    welcome.hidden = false;
    welcome.classList.add('is-visible');
    welcome.focus({ preventScroll: true });
    var panel = document.querySelector('[data-join-panel]');
    if (panel && panel.getBoundingClientRect().top < 0) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ---------- Envío ---------- */
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (form.getAttribute('data-state') === 'submitting') return;

    var member = {};
    var firstInvalid = null;
    Object.keys(RULES).forEach(function (name) {
      var result = checkField(name);
      form.elements[name].dataset.touched = 'true';
      if (result.error && !firstInvalid) firstInvalid = form.elements[name];
      member[name] = result.value;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    setState('submitting');
    api.submitRegistration(member)
      .then(function (result) {
        setState('idle');
        showWelcome(member, result);
      })
      .catch(function (error) {
        console.error('[Pulso Devs] Registro fallido:', error && error.code);
        setState('error');
        submitBtn.focus();
      });
  });
})();
