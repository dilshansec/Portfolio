document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); navigation.hidden = true; }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); navigation.hidden = !open; });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !navigation.hidden) { closeMenu(); toggle.focus(); } });
const contact = document.querySelector('#contact-dialog');
document.querySelectorAll('[data-open-contact]').forEach(button => button.addEventListener('click', () => contact.showModal()));
document.querySelector('.close-dialog').addEventListener('click', () => contact.close());
contact.addEventListener('click', event => { if (event.target === contact) { const rect = contact.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) contact.close(); } });
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), {threshold: .05});
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) document.querySelectorAll('.navigation a').forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); }); }), {threshold: .4});
document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
