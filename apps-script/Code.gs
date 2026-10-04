/**
 * Comunidad Pulso Devs — Registro de miembros
 * Google Apps Script Web App → hoja existente
 * "Comunidad Pulso Devs - Registro de Miembros"
 *
 * Estructura que se respeta (NO se agregan columnas):
 *   A: Fecha de registro  (la genera este script)
 *   B: Nombre
 *   C: Apellido
 *   D: País
 *   E: LinkedIn
 *
 * Implementación: ver README.md del proyecto.
 */

const SETTINGS = {
  // Opción recomendada: crear este script desde la propia hoja
  // (Extensiones → Apps Script). En ese caso puedes dejar el placeholder.
  // Si el script es independiente, reemplaza por el ID de la hoja.
  SPREADSHEET_ID: '[GOOGLE_SHEET_ID]',

  // Nombre exacto de la pestaña de registro. Si queda como placeholder,
  // se usa la primera pestaña del archivo.
  SHEET_NAME: '[NOMBRE_DE_LA_PESTAÑA]',

  // Verifica que la fila 1 tenga exactamente estos encabezados antes de escribir.
  EXPECTED_HEADERS: ['Fecha de registro', 'Nombre', 'Apellido', 'País', 'LinkedIn'],
  VERIFY_HEADERS: true,

  // Debe coincidir con COUNTRIES en assets/js/config.js
  COUNTRIES: [
    'Argentina', 'Belice', 'Bolivia', 'Brasil', 'Chile', 'Colombia',
    'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Guyana',
    'Haití', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú',
    'Puerto Rico', 'República Dominicana', 'Surinam', 'Uruguay', 'Venezuela',
    'Otro país'
  ]
};

const PLACEHOLDER = /^\[[^\]]+\]$/;
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;

/** Registro de un miembro (POST desde la landing). */
function doPost(e) {
  try {
    const data = parseBody_(e);
    const member = validate_(data);
    appendMember_(member);
    return json_({ ok: true });
  } catch (err) {
    const code = err && err.code ? err.code : 'SERVER_ERROR';
    console.error('Registro rechazado:', code, err && err.message);
    return json_({ ok: false, error: code });
  }
}

/** Verificación rápida de que la Web App está activa. */
function doGet() {
  return json_({ ok: true, service: 'pulso-devs-registro' });
}

/* ---------------- Internos ---------------- */

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) throw fail_('EMPTY_BODY');
  if (e.postData.contents.length > 4000) throw fail_('BODY_TOO_LARGE');
  try {
    return JSON.parse(e.postData.contents);
  } catch (_) {
    throw fail_('INVALID_JSON');
  }
}

function validate_(data) {
  const nombre = cleanText_(data.nombre);
  const apellido = cleanText_(data.apellido);
  const pais = cleanText_(data.pais);
  const linkedin = cleanText_(data.linkedin);

  [nombre, apellido].forEach(function (v) {
    if (v.length < 2 || v.length > 60 || !NAME_PATTERN.test(v)) throw fail_('INVALID_NAME');
  });
  if (SETTINGS.COUNTRIES.indexOf(pais) === -1) throw fail_('INVALID_COUNTRY');
  if (linkedin.length > 200 ||
      !/^https:\/\/([a-z0-9-]+\.)*linkedin\.com\/(in|pub)\/[^\s/?#]+(\/[^\s?#]*)?$/i.test(linkedin)) {
    throw fail_('INVALID_LINKEDIN');
  }

  return { nombre: nombre, apellido: apellido, pais: pais, linkedin: linkedin };
}

function appendMember_(member) {
  const sheet = getSheet_();

  if (SETTINGS.VERIFY_HEADERS) {
    const headers = sheet.getRange(1, 1, 1, SETTINGS.EXPECTED_HEADERS.length).getDisplayValues()[0];
    const matches = SETTINGS.EXPECTED_HEADERS.every(function (h, i) {
      return String(headers[i]).trim() === h;
    });
    if (!matches) throw fail_('SHEET_STRUCTURE');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet.appendRow([
      new Date(),                 // A: Fecha de registro
      safeCell_(member.nombre),   // B: Nombre
      safeCell_(member.apellido), // C: Apellido
      safeCell_(member.pais),     // D: País
      safeCell_(member.linkedin)  // E: LinkedIn
    ]);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = PLACEHOLDER.test(SETTINGS.SPREADSHEET_ID)
    ? SpreadsheetApp.getActiveSpreadsheet()
    : SpreadsheetApp.openById(SETTINGS.SPREADSHEET_ID);
  if (!ss) throw fail_('SPREADSHEET_NOT_FOUND');

  const sheet = PLACEHOLDER.test(SETTINGS.SHEET_NAME)
    ? ss.getSheets()[0]
    : ss.getSheetByName(SETTINGS.SHEET_NAME);
  if (!sheet) throw fail_('SHEET_NOT_FOUND');
  return sheet;
}

function cleanText_(value) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
}

/** Evita que un valor se interprete como fórmula (inyección CSV/fórmulas). */
function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function fail_(code) {
  const err = new Error(code);
  err.code = code;
  return err;
}

function json_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
