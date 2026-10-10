/**
 * Menú móvil: se abre y cierra con el botón, se cierra con Esc o al elegir un enlace,
 * mantiene el foco dentro mientras está abierto y bloquea el desplazamiento de la página.
 */
const boton = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-mobile-menu]');

if (boton && menu) {
  const escritorio = window.matchMedia('(min-width: 68.75em)');
  const enlaces = () => [...menu.querySelectorAll('a')];

  const abrir = (abierto, devolverFoco = false) => {
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('is-open', abierto);
    document.body.classList.toggle('is-locked', abierto);
    if (abierto) enlaces()[0]?.focus();
    else if (devolverFoco) boton.focus();
  };

  boton.addEventListener('click', () => abrir(boton.getAttribute('aria-expanded') !== 'true'));

  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) abrir(false);
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true')
      abrir(false, true);
  });

  // Foco atrapado entre el botón y los enlaces del menú abierto.
  menu.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Tab') return;
    const items = [boton, ...enlaces()];
    if (evento.shiftKey && document.activeElement === enlaces()[0]) {
      evento.preventDefault();
      items[0].focus();
    } else if (!evento.shiftKey && document.activeElement === items.at(-1)) {
      evento.preventDefault();
      items[0].focus();
    }
  });

  escritorio.addEventListener('change', (evento) => {
    if (evento.matches) abrir(false);
  });
}
