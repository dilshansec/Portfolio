// Only update lighting in response to a fine pointer, at most once per frame.
(() => {
  const lighting = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  document.querySelectorAll('.lab-card, .contact-device, .contact-note').forEach(card => {
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    card.addEventListener('pointermove', event => {
      if (!lighting.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = card.getBoundingClientRect();
        card.style.setProperty('--glow-x', `${pointerX - bounds.left}px`);
        card.style.setProperty('--glow-y', `${pointerY - bounds.top}px`);
      });
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      frame = 0;
    });
  });
})();
