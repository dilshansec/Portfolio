document.documentElement.classList.add('js');

// Navigation elements
const siteHeader = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileNav = document.querySelector('#mobile-nav');
const progressBar = document.querySelector('#navProgressBar');
const sections = [...document.querySelectorAll('main > section[id]')];
const navLinks = document.querySelectorAll('.site-header a[href^="#"]');
let navClearance = 88;

function measureNavigation() {
  navClearance = Math.ceil(siteHeader?.getBoundingClientRect().bottom || 76) + 12;
  document.documentElement.style.setProperty('--nav-clearance', `${navClearance}px`);
  updateScroll();
}
if (siteHeader) new ResizeObserver(measureNavigation).observe(siteHeader);
window.addEventListener('resize', measureNavigation);

function closeMenu() {
  if (!toggle) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  if (mobileNav) mobileNav.hidden = true;
}

function openMenu() {
  if (!toggle) return;
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close navigation');
  if (mobileNav) mobileNav.hidden = false;
}

if (toggle && mobileNav) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileNav.hidden) {
      closeMenu();
      toggle.focus();
    }
  });
}

// Close mobile navigation on any nav link click
document.querySelectorAll('.site-header a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Laser Scroll Progress & Header Scrolled State
function updateScroll() {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
  }

  if (siteHeader) {
    if (winScroll > 24) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }

  // Use the section's leading edge, so tall mobile sections remain active too.
  let activeSection = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= navClearance + 24) activeSection = section;
  }
  navLinks.forEach(link => {
    if (link.hash === '#' + activeSection?.id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

// Contact Action Triggers
const contact = document.querySelector('#contact-dialog');
let contactReturnFocus;
document.querySelectorAll('[data-open-contact]').forEach(button => {
  if (button.closest('.site-header')) {
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'contact-dialog');
  }
  button.addEventListener('click', (event) => {
    const isNavbarAction = Boolean(button.closest('.site-header'));
    contactReturnFocus = button.closest('#mobile-nav') ? toggle : button;
    closeMenu();
    if (isNavbarAction && contact) {
      event.preventDefault();
      contact.showModal();
      return;
    }
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    } else {
      window.location.hash = 'contact';
    }
  });
});

document.querySelectorAll('#contact-dialog .close-dialog').forEach(button => {
  button.addEventListener('click', () => contact?.close());
});

if (contact) {
  contact.addEventListener('close', () => contactReturnFocus?.focus({ preventScroll: true }));
  contact.addEventListener('click', event => {
    if (event.target === contact) {
      const rect = contact.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        contact.close();
      }
    }
  });
}

// Replay reveals whenever content returns to the viewport.
document.querySelector('.labs-inner')?.classList.remove('reveal');
document.querySelectorAll('.interests-between, .labs-inner > *, .footer-left, .footer-center, .footer-right').forEach(element => {
  if (element.tagName !== 'NOSCRIPT') element.classList.add('reveal');
});
const revealElements = [...document.querySelectorAll('.reveal')];
const reducedRevealMotion = matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
function showReveal(element) {
  element.classList.add('visible');
}
function configureReveals() {
  revealObserver?.disconnect();
  if (reducedRevealMotion.matches || !('IntersectionObserver' in window)) {
    revealElements.forEach(showReveal);
    return;
  }
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) showReveal(entry.target);
      else if (!entry.target.contains(document.activeElement)) {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(element => revealObserver.observe(element));
}
configureReveals();
// Keyboard navigation must never land on visually hidden content.
document.addEventListener('focusin', event => {
  const element = event.target.closest('.reveal');
  if (element) showReveal(element);
});
reducedRevealMotion.addEventListener('change', configureReveals);

// Measure after fonts/images settle before aligning a direct section URL.
window.addEventListener('load', () => {
  if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Keep restoration manual: switching back during load restores the old position.
    measureNavigation();
    return;
  }
  measureNavigation();
  const destination = sections.find(section => '#' + section.id === window.location.hash);
  destination?.scrollIntoView({ behavior: 'instant', block: 'start' });
});

// Smooth back-to-top handler
document.querySelector('.footer-back-top, .footer-back-to-top')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
