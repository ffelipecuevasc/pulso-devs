/**
 * Pulso del logotipo del hero: emite el anillo otra vez al pasar el cursor.
 * Con `prefers-reduced-motion: reduce` no hace nada.
 */
const logo = document.querySelector('[data-hero-logo]');

if (logo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  logo.addEventListener('pointerenter', () => {
    logo.classList.remove('is-pulsing');
    void logo.offsetWidth; // reinicia la animación
    logo.classList.add('is-pulsing');
  });
}
