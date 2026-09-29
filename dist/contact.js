// Public contact details supplied by the portfolio owner.
const portfolioContact = {email:'mc.thilanga@gmail.com', github:'https://github.com/dilshansec', linkedin:'https://www.linkedin.com/in/dilshansec/'};
const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-form-status');
const submitContact = contactForm.querySelector('button[type="submit"]');
if(portfolioContact.email) {
  submitContact.textContent = 'Open email draft ↗';
  document.querySelector('#contact-delivery-note').textContent = 'Review your message in your email app before sending it.';
}
for(const service of ['github','linkedin']) {
  const card = document.querySelector(`[data-contact-service="${service}"]`);
  if(portfolioContact[service]) {
    const link = document.createElement('a'); link.className = card.className; link.href = portfolioContact[service]; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.innerHTML = card.innerHTML; link.querySelector('small').textContent = 'Visit profile ↗'; card.replaceWith(link);
  }
}
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const message = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
  if(portfolioContact.email) {
    window.location.href = `mailto:${encodeURIComponent(portfolioContact.email)}?subject=${encodeURIComponent('Portfolio inquiry from ' + data.get('name'))}&body=${encodeURIComponent(message)}`;
    contactStatus.textContent = 'Check your email app to review and send your draft.';
    return;
  }
  try {await navigator.clipboard.writeText(message); contactStatus.textContent = 'Message copied. Nothing was sent because contact details are not available yet.';}
  catch {contactStatus.textContent = 'Automatic copying is unavailable in this browser. Select and copy your message manually. Nothing was sent.';}
});
