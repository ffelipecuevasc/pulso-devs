/**
 * Header: borde inferior al desplazarse y sección activa en la navegación de escritorio.
 */
const encabezado = document.querySelector('[data-header]');

if (encabezado) {
  const actualizar = () => encabezado.setAttribute('data-scrolled', String(window.scrollY > 8));
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
}

const enlaces = [...document.querySelectorAll('.site-nav__list a[href*="#"]')];

if (enlaces.length && 'IntersectionObserver' in window) {
  const porId = Object.fromEntries(enlaces.map((enlace) => [enlace.hash.slice(1), enlace]));

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        enlaces.forEach((enlace) => enlace.removeAttribute('aria-current'));
        porId[entrada.target.id]?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  document.querySelectorAll('main section[id]').forEach((seccion) => observador.observe(seccion));
}
