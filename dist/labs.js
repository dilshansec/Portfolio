// Sample topics: replace copy, objectives, and optional image/repository URLs with real projects.
const labProjects = [
  {title:'Linux fundamentals',category:'SYSTEMS LAB',glyph:'>_',accent:'#ddb681',code:'$ whoami\nstudent\n$ ls -la /var/log',description:'Explore permissions, processes, and the command line in a local Linux environment.',technologies:['Linux','Bash'],objectives:['Navigate the filesystem and understand file permissions.','Inspect running processes and read system logs.','Document useful commands and what they do.']},
  {title:'Network discovery',category:'NETWORKING LAB',glyph:'⌘',accent:'#ee936b',code:'HOST → PORT → SERVICE\n192.168.1.0/24\nScope: local lab',description:'Map devices and services inside an isolated practice network.',technologies:['Nmap','Networking'],objectives:['Define the authorized lab scope.','Identify hosts and exposed services.','Document the network topology and findings.']},
  {title:'Web security',category:'APPLICATION SECURITY',glyph:'{ }',accent:'#d0ac90',code:'REQUEST → RESPONSE\nGET /lab HTTP/1.1\nInspect. Understand.',description:'Understand requests, responses, and common security weaknesses in a purpose-built practice app.',technologies:['Burp Suite','HTTP','OWASP'],objectives:['Observe HTTP traffic in a local test application.','Study input validation and session handling.','Record findings alongside possible fixes.']},
  {title:'Packet analysis',category:'FEATURED NETWORKING LAB',glyph:'⌁',accent:'#ed8955',code:'01  DNS   query\n02  TCP   handshake\n03  TLS   application',description:'Follow the story inside network traffic, from a DNS lookup to an encrypted connection.',technologies:['Wireshark','TCP/IP','DNS'],objectives:['Capture traffic from your own lab environment.','Filter DNS queries and follow TCP connections.','Explain the sequence of events in a short packet analysis.']},
  {title:'Cloud foundations',category:'CLOUD LAB',glyph:'☁',accent:'#d8c6a2',code:'IDENTITY → ACCESS\nleast privilege\nlogs: enabled',description:'Explore access controls and the building blocks of a secure cloud environment.',technologies:['Cloud','IAM'],objectives:['Understand users, roles, and access policies.','Compare broad permissions with least privilege.','Identify useful security logging settings.']},
  {title:'Secure web development',category:'DEVELOPMENT PROJECT',glyph:'</>',accent:'#c49778',code:'design → build → test\nvalidate(input)\nescape(output)',description:'Connect accessible interface design with secure development habits.',technologies:['HTML','CSS','JavaScript'],objectives:['Build a responsive and accessible interface.','Practice safe handling of user input.','Review dependencies and document design decisions.']},
  {title:'Log investigation',category:'DEFENSIVE SECURITY',glyph:'[!]',accent:'#dfaa62',code:'09:41  auth event\n09:42  review source\n09:43  correlate',description:'Practice finding patterns and assembling a timeline from sample system logs.',technologies:['Linux','Logs','Analysis'],objectives:['Collect sample logs in a controlled environment.','Filter events and correlate timestamps.','Write a concise investigation timeline.']}
];
const labSlots = [0,1,2,3,4,5,6];
const labCards = [...document.querySelectorAll('[data-slot]')];
function renderLabCard(card, project, featured) {
  card.replaceChildren();
  const inner = document.createElement('span'); inner.className = 'lab-card-inner';
  inner.style.setProperty('--card-accent', project.accent);
  if (project.image) { const image = document.createElement('img'); image.src = project.image; image.alt = ''; image.className = 'lab-card-image'; inner.append(image); }
  const windowBar = document.createElement('span'); windowBar.className = 'lab-window'; windowBar.setAttribute('aria-hidden','true');
  for(let i=0;i<3;i++) windowBar.append(document.createElement('i'));
  const windowLabel = document.createElement('span'); windowLabel.textContent = 'sandbox / isolated'; windowBar.append(windowLabel);
  inner.append(windowBar);
  for (const [className, text] of [['lab-glyph',project.glyph],['lab-code',project.code],['lab-card-label',project.title],['lab-card-index','LEARNING IN PRACTICE']]) {
    const element = document.createElement('span'); element.className = className; element.textContent = text;
    if (className === 'lab-glyph' || className === 'lab-code') element.setAttribute('aria-hidden','true'); inner.append(element);
  }
  if (featured) {
    const telemetry = document.createElement('span'); telemetry.className = 'lab-telemetry';
    telemetry.setAttribute('aria-hidden', 'true');
    for (const text of ['LOCAL ENV', 'SAMPLE TRACE', 'READ / ANALYZE']) {
      const item = document.createElement('span'); item.textContent = text; telemetry.append(item);
    }
    inner.append(telemetry);
  }
  card.append(inner); card.setAttribute('aria-label', (featured ? 'Featured lab: ' : 'Feature ') + project.title);
}
function renderLabs() {
  labCards.forEach((card, slot) => renderLabCard(card, labProjects[labSlots[slot]], slot === 3));
  const selected = labProjects[labSlots[3]];
  document.querySelector('#lab-category').textContent = selected.category.replace('FEATURED ', '');
  document.querySelector('#lab-name').textContent = selected.title;
  document.querySelector('#lab-description').textContent = selected.description;
  const tags = document.querySelector('#lab-technologies'); tags.replaceChildren();
  selected.technologies.forEach(technology => {const tag = document.createElement('li'); tag.textContent = technology; tags.append(tag);});
}
labCards.forEach((card, slot) => { if(slot === 3) return;
  card.addEventListener('click', () => {
    [labSlots[3], labSlots[slot]] = [labSlots[slot], labSlots[3]];
    renderLabs();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      [card,labCards[3]].forEach(element => {element.getAnimations().forEach(animation => animation.cancel()); element.animate([{opacity:.45,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{duration:320,easing:'ease-out'});});
    }
  });
});
const labDialog = document.querySelector('#lab-dialog');
labDialog.querySelector('.close-dialog').addEventListener('click', () => labDialog.close());
labDialog.addEventListener('click', event => {if(event.target !== labDialog) return; const rect = labDialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) labDialog.close();});
// Register the new section with the existing navigation if not already present.
if (typeof navigation !== 'undefined' && navigation && !navigation.querySelector('a[href="#labs"]')) {
  const labsNavLink = document.createElement('a'); labsNavLink.href = '#labs'; labsNavLink.className = 'nav-link'; labsNavLink.textContent = 'Labs';
  navigation.querySelector('a[href="#about"]')?.after(labsNavLink);
  labsNavLink.addEventListener('click', closeMenu);
}
renderLabs();
