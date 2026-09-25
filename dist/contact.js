// Set these values when the owner supplies real public contact details.
const portfolioContact = {email:'', github:'', linkedin:'', location:''};
const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-form-status');
const submitContact = contactForm.querySelector('button[type="submit"]');
if(portfolioContact.email) {
  submitContact.textContent = 'Open email draft ↗';
  document.querySelector('#contact-delivery-note').textContent = 'Your message opens in your email app for review before sending.';
}
for(const service of ['github','linkedin']) {
  const card = document.querySelector(`[data-contact-service="${service}"]`);
  if(portfolioContact[service]) {
    const link = document.createElement('a'); link.className = card.className; link.href = portfolioContact[service]; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.innerHTML = card.innerHTML; link.querySelector('small').textContent = 'Visit profile ↗'; card.replaceWith(link);
  }
}
if(portfolioContact.location) document.querySelector('#contact-location').textContent = portfolioContact.location;
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const message = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
  if(portfolioContact.email) {
    window.location.href = `mailto:${encodeURIComponent(portfolioContact.email)}?subject=${encodeURIComponent('Portfolio inquiry from ' + data.get('name'))}&body=${encodeURIComponent(message)}`;
    contactStatus.textContent = 'Email draft requested. Review and send it in your email app.';
    return;
  }
  try {await navigator.clipboard.writeText(message); contactStatus.textContent = 'Message copied. Nothing was sent—contact details are not available yet.';}
  catch {contactStatus.textContent = 'Copy is unavailable in this browser. Select and copy your message manually. Nothing was sent.';}
});
