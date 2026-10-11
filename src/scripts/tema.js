/**
 * Tema claro / oscuro: persiste la elección y, sin elección guardada, sigue al sistema.
 * El tema inicial lo aplica el script en línea de LayoutBase antes de pintar; este módulo
 * sincroniza el interruptor y el color de la barra del navegador, y atiende los clics.
 * Al pulsar el interruptor, el tema nuevo se revela como un círculo que crece desde él
 * (View Transitions API nativa, 1 s, RDA-016). Sin la API, con movimiento reducido o por un
 * cambio de la preferencia del sistema, el cambio es inmediato.
 */
const botones = document.querySelectorAll('[data-theme-toggle]');
const base = botones[0]?.dataset;

if (base) {
  const { claveTema, colorClaro, colorOscuro } = base;
  const raiz = document.documentElement;
  const sistema = window.matchMedia('(prefers-color-scheme: dark)');
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

  const guardado = () => {
    try {
      const valor = localStorage.getItem(claveTema);
      return valor === 'light' || valor === 'dark' ? valor : null;
    } catch {
      return null;
    }
  };

  const guardar = (tema) => {
    try {
      localStorage.setItem(claveTema, tema);
    } catch {
      // almacenamiento no disponible: el cambio vale solo para esta visita
    }
  };

  /** Aplica el tema al documento, al color de la barra del navegador y a los interruptores. */
  const aplicar = (tema) => {
    raiz.setAttribute('data-theme', tema);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', tema === 'dark' ? colorOscuro : colorClaro);
    botones.forEach((boton) => boton.setAttribute('aria-checked', String(tema === 'dark')));
  };

  // Tema vigente (el último pedido): se actualiza al instante, aunque la transición aún no haya
  // aplicado el cambio al documento, para que un doble clic rápido alterne bien.
  let vigente = guardado() ?? (sistema.matches ? 'dark' : 'light');
  let ultimaTransicion = null;

  /**
   * Cambia el tema con un círculo que crece desde `origen` (el interruptor). Sin
   * `document.startViewTransition` o con movimiento reducido, lo aplica de inmediato.
   * @param {'light' | 'dark'} tema Tema que se aplica.
   * @param {Element} origen Elemento desde cuyo centro nace el círculo.
   */
  const aplicarTemaConTransicion = (tema, origen) => {
    if (!document.startViewTransition || sinMovimiento.matches) {
      aplicar(tema);
      return;
    }
    const caja = origen.getBoundingClientRect();
    const x = caja.left + caja.width / 2;
    const y = caja.top + caja.height / 2;
    const radio = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    raiz.style.setProperty('--vt-x', `${x}px`);
    raiz.style.setProperty('--vt-y', `${y}px`);
    raiz.style.setProperty('--vt-r', `${radio}px`);
    raiz.classList.add('is-theme-switching');
    const transicion = document.startViewTransition(() => aplicar(tema));
    ultimaTransicion = transicion;
    // Una transición omitida por otra más reciente rechaza estas promesas: no es un error.
    transicion.ready.catch(() => {});
    transicion.updateCallbackDone.catch(() => {});
    // Solo la transición más reciente retira la clase (una anterior puede terminar al ser omitida).
    transicion.finished
      .catch(() => {})
      .then(() => {
        if (ultimaTransicion === transicion) raiz.classList.remove('is-theme-switching');
      });
  };

  aplicar(vigente);

  botones.forEach((boton) =>
    boton.addEventListener('click', () => {
      vigente = vigente === 'dark' ? 'light' : 'dark';
      guardar(vigente);
      aplicarTemaConTransicion(vigente, boton);
    }),
  );

  sistema.addEventListener('change', (evento) => {
    if (!guardado()) {
      vigente = evento.matches ? 'dark' : 'light';
      aplicar(vigente);
    }
  });
}
