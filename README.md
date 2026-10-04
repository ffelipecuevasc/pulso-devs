# Comunidad Pulso Devs — Landing page v1

Sitio estático (HTML + CSS + JS sin dependencias) con registro de miembros en Google Sheets mediante Google Apps Script.

## Estructura

```
pulso-devs/
├── index.html                 Página completa (incluye sprites SVG de iconos y logos)
├── assets/
│   ├── css/styles.css         Tokens de marca, modo claro/oscuro y componentes
│   ├── js/config.js           ⚙️  Configuración central (endpoint, WhatsApp, países, redes)
│   ├── js/theme.js            Estado de apariencia claro/oscuro (persistente)
│   ├── js/ui.js               Header, menú móvil, sección activa, enlaces configurables
│   ├── js/api.js              Integración con la Web App de Apps Script
│   ├── js/form.js             Validación, estados del formulario y bienvenida
│   └── img/
│       ├── pulsodevs.png          Logotipo con fondo transparente (480 px)
│       ├── pulsodevs-small.png    Logotipo para header, footer y favicon (128 px)
│       └── pulsodevs-original.png Archivo original entregado (usado en Open Graph)
└── apps-script/Code.gs        Backend: inserta filas en la hoja existente
```

## Valores pendientes (placeholders)

| Placeholder | Archivo | Qué es |
|---|---|---|
| `[GOOGLE_APPS_SCRIPT_WEB_APP_URL]` | `assets/js/config.js` | URL `/exec` de la Web App |
| `[WHATSAPP_COMMUNITY_URL]` | `assets/js/config.js` | Invitación al grupo de WhatsApp |
| `SOCIAL_LINKS` (vacío) | `assets/js/config.js` | Redes de la comunidad para el footer |
| `FOUNDER.photoUrl` (vacío) | `assets/js/config.js` | Foto oficial de Felipe (opcional) |
| `[GOOGLE_SHEET_ID]` | `apps-script/Code.gs` | Solo si el script NO está vinculado a la hoja |
| `[NOMBRE_DE_LA_PESTAÑA]` | `apps-script/Code.gs` | Pestaña de registro (si no, usa la primera) |
| `[SITE_URL]` | `index.html` | Dominio final, para Open Graph |

Mientras `REGISTRATION_ENDPOINT` sea un placeholder, el formulario funciona en **modo demostración**: simula el envío, muestra un aviso visible y **no guarda nada**.

## Conectar Google Sheets (5 minutos)

1. Abre la hoja **"Comunidad Pulso Devs - Registro de Miembros"**.
2. Verifica que la fila 1 de la pestaña de registro diga exactamente:
   `Fecha de registro | Nombre | Apellido | País | LinkedIn`
   (el script se niega a escribir si los encabezados no coinciden).
3. Menú **Extensiones → Apps Script**. Reemplaza el contenido de `Code.gs` por `apps-script/Code.gs`.
4. En `SETTINGS.SHEET_NAME` escribe el nombre exacto de la pestaña.
5. **Implementar → Nueva implementación → Tipo: Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
6. Autoriza los permisos y copia la URL que termina en `/exec`.
7. Pégala en `REGISTRATION_ENDPOINT` dentro de `assets/js/config.js`.
8. Prueba: abre la URL `/exec` en el navegador; debe responder `{"ok":true,...}`.

> Cada vez que modifiques `Code.gs`, crea una **nueva versión** de la implementación existente (Implementar → Gestionar implementaciones → Editar) para conservar la misma URL.

### Seguridad

- El navegador solo conoce la URL pública de la Web App. No hay credenciales, tokens ni claves en el frontend.
- El script corre con la cuenta propietaria de la hoja y valida todo en el servidor: formato de nombres, país permitido, URL de LinkedIn y tamaño del cuerpo.
- Los valores que empiezan con `= + - @` se escapan para evitar inyección de fórmulas.
- `LockService` evita colisiones entre registros simultáneos.
- La fecha de registro la genera el servidor (`new Date()`), nunca el usuario.
- Recomendado a futuro: protección antispam (por ejemplo, Cloudflare Turnstile) si el formulario recibe abuso.

### ¿Por qué `text/plain`?

Apps Script no responde las solicitudes *preflight* de CORS. Enviar el JSON con `Content-Type: text/plain` lo convierte en una solicitud simple; el script lo procesa igual con `JSON.parse`.

## Publicar

Es un sitio estático: sirve la carpeta en GitHub Pages, Netlify, Vercel, Cloudflare Pages o cualquier hosting. No requiere compilación.

Para editar iconos: se usan símbolos SVG de **Material Symbols Light (weight 300)** incluidos en `index.html` como `<symbol id="i-nombre">`. Los logos de tecnologías son los SVG oficiales entregados en `logos.txt`, como `<symbol id="logo-nombre">`.

## Checklist antes de lanzar

- [ ] Endpoint de Apps Script configurado y probado con un registro real
- [ ] Enlace de WhatsApp configurado
- [ ] Texto de privacidad / uso de datos agregado junto al formulario
- [ ] `[SITE_URL]` reemplazado en Open Graph
- [ ] Biografía y frase de motivación del fundador validadas por Felipe
- [ ] Redes sociales de la comunidad (opcional)
