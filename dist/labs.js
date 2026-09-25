// Portfolio lab topics and concise learning workflows.
const labProjects = [
  {
    "title": "The Phishing Investigation Lab",
    "category": "EMAIL SECURITY",
    "glyph": "@",
    "code": "EMAIL → HEADERS → INDICATORS\nAssess the evidence\nDocument the verdict",
    "description": "Investigate a suspicious email to identify phishing indicators and explain the risk.",
    "technologies": [
      "Email headers",
      "URLs",
      "Indicators"
    ],
    "objectives": [
      "Review sample email headers, sender details, and message content.",
      "Examine links and attachment metadata without opening suspicious content.",
      "Record indicators and summarize the findings."
    ]
  },
  {
    "title": "The Malicious Packet Capture (PCAP) Analysis",
    "category": "NETWORK TRAFFIC ANALYSIS",
    "glyph": "⌁",
    "code": "PCAP → FILTER → FOLLOW STREAM\nIdentify suspicious connections\nBuild a traffic timeline",
    "description": "Analyze a sample packet capture to find suspicious connections and reconstruct network activity.",
    "technologies": [
      "Wireshark",
      "PCAP",
      "DNS"
    ],
    "objectives": [
      "Open a sample PCAP in Wireshark and filter relevant protocols.",
      "Review DNS requests, endpoints, and conversations for unusual patterns.",
      "Document the evidence and a short activity timeline."
    ]
  },
  {
    "title": "The Nmap Scan & Firewall Log Analysis",
    "category": "NETWORK DEFENSE",
    "glyph": "⌘",
    "code": "SCAN → FIREWALL → LOGS\nMatch source, port, and time\nExplain allowed / blocked traffic",
    "description": "Compare an authorized Nmap scan with firewall logs to understand how scanning activity appears to defenders.",
    "technologies": [
      "Nmap",
      "Firewall",
      "Log analysis"
    ],
    "objectives": [
      "Scan a local lab host within the defined scope.",
      "Compare scan times, source addresses, and destination ports with firewall events.",
      "Explain which connections were allowed or blocked."
    ]
  },
  {
    "title": "The Local SIEM & Windows Event Monitoring Lab",
    "category": "SECURITY MONITORING",
    "glyph": "[!]",
    "code": "WINDOWS EVENTS → LOCAL SIEM\nSearch and correlate events\nReview the alert",
    "description": "Monitor Windows events in a local SIEM and practice investigating security-relevant activity.",
    "technologies": [
      "SIEM",
      "Windows Event Logs",
      "Event Viewer"
    ],
    "objectives": [
      "Collect Windows events from a lab machine into a local SIEM.",
      "Generate test activity such as failed logins, then search and correlate the events.",
      "Review alerts and document an investigation summary."
    ]
  }
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
