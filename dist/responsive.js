// Move the existing About image, rather than duplicating content or downloads.
(() => {
  const mobile = matchMedia('(max-width: 767px)');
  const portrait = document.querySelector('.about-profile');
  const originalPosition = document.createComment('About portrait desktop position');
  portrait.before(originalPosition);
  function adaptLayout() {
    if (mobile.matches) document.querySelector('.about-mindset').before(portrait);
    else originalPosition.after(portrait);
    if (!mobile.matches) closeMenu();
  }
  mobile.addEventListener('change', adaptLayout);
  adaptLayout();
})();
