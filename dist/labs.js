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
const labMenu = document.querySelector('.lab-menu');
const labButtons = labProjects.map((project, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'lab-choice';
  button.setAttribute('aria-controls', 'lab-panel');
  const icon = document.createElement('span');
  icon.className = 'lab-choice-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = project.glyph;
  const label = document.createElement('span');
  label.textContent = project.title;
  const arrow = document.createElement('span');
  arrow.className = 'lab-choice-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  button.append(icon, label, arrow);
  button.addEventListener('click', () => selectLab(index));
  labMenu.append(button);
  return button;
});
function selectLab(index) {
  const project = labProjects[index];
  labButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  document.querySelector('#lab-category').textContent = project.category.replace('FEATURED ', '');
  document.querySelector('#lab-counter').textContent = String(index + 1).padStart(2, '0') + ' / ' + String(labProjects.length).padStart(2, '0');
  document.querySelector('#lab-name').textContent = project.title;
  document.querySelector('#lab-description').textContent = project.description;
  document.querySelector('#lab-method').textContent = project.objectives.join(' ');
  document.querySelector('#lab-flow').textContent = project.code;
  const tags = document.querySelector('#lab-technologies');
  tags.replaceChildren(...project.technologies.map(technology => {
    const tag = document.createElement('li');
    tag.textContent = technology;
    return tag;
  }));
}
selectLab(0);
