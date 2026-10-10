/**
 * Tema claro / oscuro: persiste la elección y, sin elección guardada, sigue al sistema.
 * El tema inicial lo aplica el script en línea de LayoutBase antes de pintar; este módulo
 * sincroniza el interruptor y el color de la barra del navegador, y atiende los clics.
 * El cambio es inmediato (la transición llega en la iteración 02-03).
 */
const botones = document.querySelectorAll('[data-theme-toggle]');
const base = botones[0]?.dataset;

if (base) {
  const { claveTema, colorClaro, colorOscuro } = base;
  const raiz = document.documentElement;
  const sistema = window.matchMedia('(prefers-color-scheme: dark)');

  const guardado = () => {
    try {
      const valor = localStorage.getItem(claveTema);
      return valor === 'light' || valor === 'dark' ? valor : null;
    } catch {
      return null;
    }
  };

  const aplicar = (tema) => {
    raiz.setAttribute('data-theme', tema);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', tema === 'dark' ? colorOscuro : colorClaro);
    botones.forEach((boton) => boton.setAttribute('aria-checked', String(tema === 'dark')));
  };

  aplicar(guardado() ?? (sistema.matches ? 'dark' : 'light'));

  botones.forEach((boton) =>
    boton.addEventListener('click', () => {
      const siguiente = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      aplicar(siguiente);
      try {
        localStorage.setItem(claveTema, siguiente);
      } catch {
        // almacenamiento no disponible: el cambio vale solo para esta visita
      }
    }),
  );

  sistema.addEventListener('change', (evento) => {
    if (!guardado()) aplicar(evento.matches ? 'dark' : 'light');
  });
}
