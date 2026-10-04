/**
 * Comunidad Pulso Devs — Integración con el backend de registro
 * Frontend → Google Apps Script Web App → Google Sheets
 *
 * - El navegador solo conoce la URL pública de la Web App.
 * - Ninguna credencial de Google vive en el frontend: el script se ejecuta
 *   con la cuenta propietaria de la hoja.
 * - Se envía como text/plain para que sea una "simple request" (sin preflight
 *   CORS, que Apps Script no responde). El cuerpo sigue siendo JSON.
 */
(function () {
  'use strict';

  var cfg = window.PulsoDevs.config;

  function RegistrationError(code) {
    this.name = 'RegistrationError';
    this.code = code || 'UNKNOWN';
    this.message = 'Registro no completado (' + this.code + ')';
  }
  RegistrationError.prototype = Object.create(Error.prototype);

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /**
   * Envía un registro. Resuelve { ok: true, demo?: true } o rechaza con RegistrationError.
   * @param {{nombre:string, apellido:string, pais:string, linkedin:string}} member
   */
  function submitRegistration(member) {
    var payload = {
      nombre: member.nombre,
      apellido: member.apellido,
      pais: member.pais,
      linkedin: member.linkedin
      // La fecha de registro la genera el backend.
    };

    // Modo demostración: el endpoint aún no se configuró. No se guarda nada.
    if (cfg.isPlaceholder(cfg.REGISTRATION_ENDPOINT)) {
      console.warn('[Pulso Devs] REGISTRATION_ENDPOINT no configurado: registro simulado, no se guardó en Google Sheets.');
      return wait(1100).then(function () { return { ok: true, demo: true }; });
    }

    var controller = 'AbortController' in window ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, cfg.REQUEST_TIMEOUT_MS) : null;

    return fetch(cfg.REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller ? controller.signal : undefined
    })
      .then(function (response) {
        if (!response.ok) throw new RegistrationError('HTTP_' + response.status);
        return response.json().catch(function () { throw new RegistrationError('BAD_RESPONSE'); });
      })
      .then(function (data) {
        if (!data || data.ok !== true) throw new RegistrationError((data && data.error) || 'REJECTED');
        return { ok: true };
      })
      .catch(function (error) {
        if (error instanceof RegistrationError) throw error;
        throw new RegistrationError(error && error.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK');
      })
      .finally(function () {
        if (timer) clearTimeout(timer);
      });
  }

  window.PulsoDevs.api = { submitRegistration: submitRegistration, RegistrationError: RegistrationError };
})();
