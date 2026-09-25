(() => {
  const loader = document.getElementById('site-loader');
  if (!loader) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const started = performance.now();
  let finished = false;
  let exitTimer;
  loader.hidden = false;
  const coveredElements = [...document.body.children].filter(element => element !== loader && !element.inert);
  coveredElements.forEach(element => { element.inert = true; });
  function removeLoader() {
    loader.remove();
    coveredElements.forEach(element => { element.inert = false; });
  }
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(deadline);
    exitTimer = setTimeout(() => {
      loader.classList.add('is-leaving');
      setTimeout(removeLoader, reducedMotion ? 0 : 680);
    }, Math.max(0, (reducedMotion ? 0 : 2400) - (performance.now() - started)));
  }
  // A slow external asset must never trap the visitor behind the intro.
  const deadline = setTimeout(finish, 4500);
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      finished = true;
      clearTimeout(deadline);
      clearTimeout(exitTimer);
      removeLoader();
    }
  });
})();
