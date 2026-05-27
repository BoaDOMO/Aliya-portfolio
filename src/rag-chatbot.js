const STORAGE_KEY = 'rag_chatbot_state';

const DEFAULT_DATA = {
  persona: {
    company: "Nova Finance",
    role: "Nova Finance AI Assistant",
    instructions: "You are a helpful AI customer service assistant for Nova Finance, a digital-first microfinance institution in Cambodia. Answer questions based ONLY on the knowledge base provided. Be concise, friendly, and accurate. Do not make up information."
  },
  kb: {
    about: "Nova Finance is a digital-first microfinance institution founded in 2020, headquartered in Phnom Penh, Cambodia. Licensed by the National Bank of Cambodia, we serve over 50,000 customers across 25 provinces. Our mission is to make financial services accessible, fast, and fair for every Cambodian. We operate fully digitally — no physical branches required.",
    products: "Personal Loan: $200–$10,000 | 3–36 months | From 1.2% per month (flat rate) | Disbursed within 24 hours after approval.\n\nBusiness Loan: $1,000–$50,000 | 6–60 months | From 1.0% per month (flat rate) | Disbursed in 1–3 business days.\n\nNova Savings Account: 5.5% annual interest | Minimum deposit $50 | No monthly fees | Free ATM withdrawals up to 5 times per month.\n\nNova Digital Wallet: Free instant transfers between Nova accounts | 0.5% cashback on all purchases | QR code payments accepted at over 10,000 merchants.",
    faq: "Q: How do I apply for a loan?\nA: Apply online at novafinance.com.kh or through the Nova Finance mobile app (available on iOS and Android).\n\nQ: What documents do I need?\nA: Valid Cambodian National ID or Passport, last 3 months of bank statements or salary slips, and proof of address.\n\nQ: How long does approval take?\nA: Our team reviews applications within 4 business hours. You will receive an SMS and email notification upon decision.\n\nQ: Can I repay my loan early?\nA: Yes. Nova Finance charges no early repayment penalties. You can settle your loan at any time.\n\nQ: What happens if I miss a payment?\nA: A late fee of 0.5% of the outstanding balance applies per day after the due date. Contact our support team before your due date if you need assistance.\n\nQ: Can I have two loans at the same time?\nA: Yes, if your first loan is in good standing and your total outstanding balance does not exceed your approved credit limit.\n\nQ: How do I contact customer support?\nA: Hotline: 023 456 789 (8am–8pm daily) | Email: support@novafinance.com.kh | In-app live chat.",
    policies: "Eligibility: Applicants must be aged 18–65, hold a valid Cambodian National ID or valid work permit, have a minimum monthly income of $250, and have no active loan defaults at any financial institution.\n\nData Privacy: Customer data is processed in compliance with Cambodian Law on Data Privacy. Data is used solely for loan assessment, account management, and regulatory reporting. We do not sell customer data to third parties.\n\nSecurity: All data is encrypted using AES-256 encryption. Servers are located in Cambodia and undergo quarterly security audits."
  },
  chatHistory: [],
  activeTab: 'preview',
  activeFile: 'persona'
};

let data = JSON.parse(JSON.stringify(DEFAULT_DATA));
let activeFile = 'persona';
let isLoading = false;
const sessionId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

const KB_SECTIONS = [
  { key: 'about', label: 'About', question: 'What does {company} do?' },
  { key: 'products', label: 'Products', question: 'What products does {company} offer?' },
  { key: 'faq', label: 'FAQ', question: 'What are common questions about {company}?' },
  { key: 'policies', label: 'Policies', question: 'What are {company}\'s policies?' },
];

function getInitials(name) {
  if (!name) return 'AI';
  return name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      data = { ...DEFAULT_DATA, ...parsed };
      if (parsed.persona) data.persona = { ...DEFAULT_DATA.persona, ...parsed.persona };
      if (parsed.kb) data.kb = { ...DEFAULT_DATA.kb, ...parsed.kb };
    } catch (e) {}
  }

  activeFile = data.activeFile || 'persona';
  loadEditors();
  initLeftPanel();
  updateChatBotName();
  restoreChat();
  updateWelcomeMessage();

  if (data.activeTab === 'code') {
    switchTab('code');
  }

  selectFile(activeFile);
}

function saveToStorage() {
  data.activeFile = activeFile;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const responseTimes = [];
const sessionStart = Date.now();

function updateSessionInfo() {
  const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
  const mins = Math.floor(elapsed / 60);
  const exchanges = Math.floor(data.chatHistory.filter(m => m.role === 'user').length);

  let timeStr;
  if (mins < 1) timeStr = 'Just now';
  else if (mins < 60) timeStr = mins + 'm ago';
  else timeStr = Math.floor(mins / 60) + 'h ago';

  document.getElementById('sessionStartTime').textContent = timeStr + ' · ' + exchanges + ' exchange' + (exchanges !== 1 ? 's' : '');
}

function updateStatus(status) {
  const dot = document.getElementById('statusDot');
  const label = document.getElementById('statusLabel');
  const map = {
    ready: { cls: '', text: 'Ready' },
    retrieving: { cls: 'retrieving', text: 'Retrieving\u2026' },
    generating: { cls: 'generating', text: 'Generating\u2026' },
    offline: { cls: 'offline', text: 'Offline' }
  };
  const s = map[status] || map.ready;
  dot.className = 'status-dot ' + s.cls;
  label.textContent = s.text;
}

function updatePipeline(stage) {
  const nodes = ['query', 'retriever', 'llm', 'response'];
  const lines = ['line-1', 'line-2', 'line-3'];
  nodes.forEach((n, i) => {
    const el = document.getElementById('node-' + n);
    el.classList.remove('active', 'done');
    if (i < stage) el.classList.add('done');
    if (i === stage) el.classList.add('active');
  });
  lines.forEach((l, i) => {
    document.getElementById(l).classList.toggle('active', i < stage);
  });
}

function resetPipeline() {
  updatePipeline(-1);
}

function updateStats() {
  const msgCount = Math.floor(data.chatHistory.filter(m => m.role === 'user').length);
  document.getElementById('statMessages').textContent = msgCount;
  const avg = responseTimes.length
    ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length / 1000).toFixed(1) + 's'
    : '\u2014';
  document.getElementById('statTime').textContent = avg;
  const lastTime = responseTimes.length
    ? (responseTimes[responseTimes.length - 1] / 1000).toFixed(1) + 's'
    : '\u2014';
  document.getElementById('miniLogText').textContent = responseTimes.length
    ? 'Last: ' + lastTime + ' \u00b7 ' + msgCount + ' total'
    : 'No queries yet';
  updateSessionInfo();
}

function updateDashboard() {
  const company = data.persona.company || 'Nova Finance';
  const role = data.persona.role || company + ' AI Assistant';
  document.getElementById('botName').textContent = role;
  document.getElementById('botRole').textContent = company;
  updateSessionInfo();
  updateStats();
}

function updateWelcomeMessage() {
  var el = document.getElementById('welcomeMessage');
  if (!el) return;
  var name = data.persona.company || 'Nova Finance';
  el.innerHTML = 'Hi! I\'m the <strong>' + name + '</strong> AI assistant. I can answer questions about our products, services, eligibility, and policies \u2014 but only based on what\'s in the knowledge base.';
}

const TEMPLATES = [
  { icon: '\u{1F3E6}', company: 'Nova Finance', tag: 'Finance', role: 'Nova Finance AI Assistant', instructions: 'You are a helpful AI customer service assistant for Nova Finance, a digital-first microfinance institution in Cambodia. Answer questions based ONLY on the knowledge base provided. Be concise, friendly, and accurate. Do not make up information.', about: 'Nova Finance is a digital-first microfinance institution founded in 2020, headquartered in Phnom Penh, Cambodia. Licensed by the National Bank of Cambodia, we serve over 50,000 customers across 25 provinces.', products: 'Personal Loan: $200\u2013$10,000 | 3\u201336 months | From 1.2% per month\n\nBusiness Loan: $1,000\u2013$50,000 | 6\u201360 months | From 1.0% per month\n\nNova Savings Account: 5.5% annual interest | Minimum deposit $50\n\nNova Digital Wallet: Free instant transfers | 0.5% cashback on purchases', faq: 'Q: How do I apply for a loan?\nA: Apply online at novafinance.com.kh or through the Nova Finance mobile app.\n\nQ: What documents do I need?\nA: Valid Cambodian National ID or Passport and last 3 months of bank statements.\n\nQ: How long does approval take?\nA: Within 4 business hours.\n\nQ: Can I repay my loan early?\nA: Yes, with no early repayment penalties.\n\nQ: How do I contact support?\nA: Hotline 023 456 789 or email support@novafinance.com.kh.', policies: 'Eligibility: Applicants must be aged 18\u201365 with a minimum monthly income of $250.\n\nData Privacy: Compliant with Cambodian Law on Data Privacy.\n\nSecurity: AES-256 encryption with quarterly security audits.' },
  { icon: '\u{1F33F}', company: 'GreenLeaf Organics', tag: 'E-commerce', role: 'GreenLeaf Organics AI Assistant', instructions: 'You are a helpful AI assistant for GreenLeaf Organics, an online organic grocery store. Answer questions based ONLY on the knowledge base provided. Be concise, friendly, and accurate.', about: 'GreenLeaf Organics is an online marketplace for organic and sustainably sourced groceries, founded in 2021. We deliver fresh produce, pantry staples, and eco-friendly household products across major cities.', products: 'Organic Produce Box: $35/week | Seasonal fruits and vegetables | Free delivery\n\nPantry Starter Pack: $60 | Grains, spices, oils, and legumes\n\nMeal Kit Subscription: $45/week | 3 recipes with pre-portioned ingredients\n\nEco-Home Bundle: $25 | Bamboo utensils, beeswax wraps, compostable bags', faq: 'Q: Where do you deliver?\nA: We deliver to all major metropolitan areas. Check your zip code on our website.\n\nQ: What is your return policy?\nA: We guarantee freshness. Report any issues within 24 hours for a full refund.\n\nQ: How often do subscriptions renew?\nA: Weekly subscriptions auto-renew every Monday. Skip or cancel anytime.\n\nQ: Do you offer wholesale?\nA: Yes, for restaurants and cafes ordering $200+.', policies: 'Eligibility: Delivery available within city limits. Minimum order $20.\n\nReturns: Perishable items must be reported within 24 hours. Non-perishables within 7 days.\n\nPrivacy: We never share customer data with third parties.' },
  { icon: '\u{1F3E8}', company: 'Skyline Hotels', tag: 'Hospitality', role: 'Skyline Hotels AI Assistant', instructions: 'You are a helpful concierge AI for Skyline Hotels, a luxury hotel chain. Answer questions based ONLY on the knowledge base provided. Be polite, professional, and accurate.', about: 'Skyline Hotels is a luxury hotel chain with 12 properties across Southeast Asia, established in 2015. We specialize in boutique accommodations with rooftop infinity pools, fine dining, and curated local experiences.', products: 'Skyline Suite: $350/night | City view | King bed | 24h butler service\n\nDeluxe Room: $180/night | Partial skyline view | Premium amenities\n\nSpa Package: $120 | 60-min massage + sauna access + herbal tea\n\nAirport Transfer: $40 | Luxury sedan | Complimentary Wi-Fi', faq: 'Q: What time is check-in/check-out?\nA: Check-in from 3 PM, check-out by 11 AM.\n\nQ: Do you allow pets?\nA: Yes, small pets under 10kg are welcome with a $50 cleaning fee.\n\nQ: Is breakfast included?\nA: Yes, complimentary buffet breakfast from 6:30 to 10:30 AM daily.\n\nQ: Can I cancel my booking?\nA: Free cancellation up to 48 hours before check-in.', policies: 'Check-in: 3 PM. Early check-in subject to availability.\n\nCancellation: Free up to 48 hours. 50% charge within 24 hours.\n\nSmoking: Strictly non-smoking in rooms. Designated areas on level 3.' },
  { icon: '\u{1F916}', company: 'Acme Robotics', tag: 'Technology', role: 'Acme Robotics AI Assistant', instructions: 'You are a helpful AI assistant for Acme Robotics, a robotics manufacturing company. Answer questions based ONLY on the knowledge base provided. Be precise and technical where appropriate.', about: 'Acme Robotics designs and manufactures industrial and consumer robotics solutions. Founded in 2018, we serve over 200 manufacturing facilities globally with automation systems and home companion robots.', products: 'PickBot 3000: $12,000 | Industrial arm robot | 50kg payload | 6-axis movement\n\nHomeMate: $899 | Home companion robot | Voice-controlled | Navigation mapping\n\nWarehouse Drone System: $25,000 | Inventory scanning | Autonomous fleet\n\nRobot Kit: $149 | DIY educational kit | 20 programmable modules', faq: 'Q: What is the warranty period?\nA: 2 years for industrial robots, 1 year for consumer products.\n\nQ: Do you provide training?\nA: Yes, free online training for all industrial robot purchases.\n\nQ: Can HomeMate integrate with smart home systems?\nA: Yes, compatible with Alexa, Google Home, and Apple HomeKit.\n\nQ: What is the lead time?\nA: Consumer products ship within 5 days. Industrial robots within 30 days.', policies: 'Warranty: 2 years industrial, 1 year consumer. Extended warranty available.\n\nReturns: Unopened products returned within 30 days for full refund.\n\nCompliance: All products meet ISO 10218 safety standards.' },
  { icon: '\u{1F4AA}', company: 'Pulse Fitness', tag: 'Fitness', role: 'Pulse Fitness AI Assistant', instructions: 'You are a helpful AI assistant for Pulse Fitness, a modern gym and wellness chain. Answer questions based ONLY on the knowledge base provided. Be motivating and concise.', about: 'Pulse Fitness is a modern fitness chain with 25 locations across the country, founded in 2019. We offer state-of-the-art equipment, group classes, personal training, and nutritional counseling.', products: 'Premium Membership: $79/month | Unlimited classes | Gym access | Sauna\n\nBasic Plan: $39/month | Gym access during staffed hours | Locker included\n\nPersonal Training: $60/session | 1-on-1 coaching | Customized workout plan\n\nNutrition Plan: $49/month | Weekly meal plans | Dietitian consultation', faq: 'Q: What are your hours?\nA: Most locations are open 5 AM to 11 PM, 7 days a week.\n\nQ: Is there a joining fee?\nA: Currently waived \u2014 sign up online for $0 enrollment.\n\nQ: Can I freeze my membership?\nA: Yes, freeze for up to 3 months at $10/month.\n\nQ: Do you have a student discount?\nA: Yes, 20% off with valid student ID.', policies: 'Membership: Month-to-month or annual. 30-day cancellation notice.\n\nGuest Policy: Members may bring one guest per visit. $10 guest fee.\n\nCode of Conduct: Respectful behavior required. Violation may result in membership termination.' },
  { icon: '\u2615', company: 'Brew & Bean', tag: 'Food & Beverage', role: 'Brew & Bean AI Assistant', instructions: 'You are a helpful AI assistant for Brew & Bean, a specialty coffee roastery and cafe chain. Answer questions based ONLY on the knowledge base provided. Be warm and friendly.', about: 'Brew & Bean is a specialty coffee company founded in 2017, with 15 cafes and an online bean subscription service. We source single-origin beans directly from farmers and roast them in small batches.', products: 'Coffee Subscription: $24/month | 12oz single-origin | Free shipping | Roasted weekly\n\nEspresso Blend: $16/bag | Medium-dark roast | Chocolate & caramel notes\n\nCafe Gift Card: $25-$100 | Redeemable at all locations | Never expires\n\nBrew Kit: $45 | Pour-over set + 4oz sampler + grinder', faq: 'Q: Where do you source your beans?\nA: Direct trade from Ethiopia, Colombia, Guatemala, and Vietnam.\n\nQ: How fresh is the coffee?\nA: Roasted within 48 hours of shipping. Best within 30 days.\n\nQ: Do you have dairy-free options?\nA: Yes, oat, almond, and soy milk available at all cafes.\n\nQ: Can I cancel my subscription?\nA: Yes, cancel or pause anytime before the 1st of the month.', policies: 'Shipping: Free on orders over $30. Delivered within 3-5 business days.\n\nReturns: Not satisfied? 100% satisfaction guarantee within 14 days.\n\nCafe Policy: Laptop-friendly until 4 PM. Free Wi-Fi with purchase.' },
  { icon: '\u2601\uFE0F', company: 'CloudHive', tag: 'SaaS', role: 'CloudHive AI Assistant', instructions: 'You are a helpful AI assistant for CloudHive, a cloud infrastructure and DevOps platform. Answer questions based ONLY on the knowledge base provided. Be technical and precise.', about: 'CloudHive provides cloud infrastructure, DevOps tools, and managed hosting solutions for startups and mid-size businesses. Founded in 2020, we serve over 5,000 businesses across 40 countries.', products: 'Hive Starter: $29/month | 2 vCPUs | 4GB RAM | 50GB SSD | 1TB transfer\n\nHive Pro: $99/month | 4 vCPUs | 16GB RAM | 200GB SSD | 5TB transfer\n\nManaged Kubernetes: $199/month | 3-node cluster | Auto-scaling | Monitoring\n\nDevOps Pipeline: $49/month | CI/CD | Git integration | Deploy previews', faq: 'Q: What is your uptime SLA?\nA: 99.95% uptime guarantee across all paid plans.\n\nQ: Do you offer a free tier?\nA: Yes, Hive Free plan includes 1 vCPU, 1GB RAM, 10GB SSD.\n\nQ: Can I migrate from AWS/GCP?\nA: Yes, we offer free migration assistance for Pro plans and above.\n\nQ: What support options are available?\nA: 24/7 live chat, email support, and phone support for Enterprise.', policies: 'SLA: 99.95% uptime. Credits issued for downtime exceeding monthly threshold.\n\nSecurity: SOC 2 Type II certified. Data encrypted at rest and in transit.\n\nCancellation: Cancel anytime. Data exported within 30 days.' },
  { icon: '\u{1F3A8}', company: 'Artisan Studio', tag: 'Creative', role: 'Artisan Studio AI Assistant', instructions: 'You are a helpful AI assistant for Artisan Studio, a creative agency offering design, branding, and digital marketing services. Answer questions based ONLY on the knowledge base provided. Be creative and professional.', about: 'Artisan Studio is a full-service creative agency founded in 2016. We specialize in branding, web design, illustration, and social media strategy for startups and established businesses.', products: 'Brand Identity Package: $3,500 | Logo + color palette + typography + brand guidelines\n\nWebsite Design: $5,000+ | Custom design | 5 pages | Responsive | CMS integration\n\nSocial Media Kit: $1,200/month | 12 posts | 4 stories | Analytics report\n\nIllustration Pack: $800 | 10 custom illustrations | Commercial license', faq: 'Q: How long does a brand identity project take?\nA: Typically 3-4 weeks including research, concepting, and revisions.\n\nQ: Do you offer revisions?\nA: Yes, each package includes 2 rounds of revisions at no extra cost.\n\nQ: What file formats do you deliver?\nA: AI, EPS, PDF, PNG, SVG \u2014 all source files included.\n\nQ: Can you work within a specific brand style?\nA: Absolutely. We adapt to your existing brand or build from scratch.', policies: 'Pricing: 50% deposit to start, 50% upon delivery.\n\nRevisions: 2 rounds included per project. Additional rounds at $100/hr.\n\nLicensing: Full commercial rights upon final payment. Portfolio showcase reserved.' },
  { icon: '\u{1F697}', company: 'EcoRide', tag: 'Transportation', role: 'EcoRide AI Assistant', instructions: 'You are a helpful AI assistant for EcoRide, an electric scooter and bike sharing service. Answer questions based ONLY on the knowledge base provided. Be friendly and helpful.', about: 'EcoRide is a micro-mobility company offering electric scooter and bike sharing services in 30+ cities. Founded in 2022, we provide affordable, eco-friendly last-mile transportation with a fleet of 50,000+ vehicles.', products: 'Pay-Per-Ride: $1 unlock + $0.30/min | No commitment | Park anywhere in zone\n\nDay Pass: $15 | Unlimited 30-min rides for 24 hours | Best for tourists\n\nMonthly Commuter: $49 | 120 minutes daily | Priority parking | Discounted unlocks\n\nStudent Plan: $29/month | 60 minutes daily | Valid student email required', faq: 'Q: How do I unlock a scooter?\nA: Download the EcoRide app, scan the QR code on the vehicle.\n\nQ: Where can I park?\nA: Park in designated zones marked in the app. Never block sidewalks.\n\nQ: What happens if I park outside a zone?\nA: A $5 out-of-zone fee applies. Repeated violations may result in a ban.\n\nQ: Are helmets provided?\nA: Helmet locks are available on select scooters. We recommend bringing your own.', policies: 'Age Requirement: Minimum 18 years old with valid ID.\n\nRiding Rules: Follow traffic laws. No riding on sidewalks. Max speed 20 km/h.\n\nDamage Policy: Report damage immediately. Users responsible for negligence.' },
  { icon: '\u{1F3E5}', company: 'MedFlow', tag: 'Healthcare', role: 'MedFlow AI Assistant', instructions: 'You are a helpful AI assistant for MedFlow, a telemedicine and healthcare platform. Answer questions based ONLY on the knowledge base provided. Be professional, empathetic, and accurate.', about: 'MedFlow is a digital healthcare platform connecting patients with licensed physicians via video consultation. Founded in 2020, we have facilitated over 500,000 consultations with a network of 2,000+ doctors across 15 specialties.', products: 'General Consultation: $49 | 15-min video call | Prescription if needed\n\nSpecialist Visit: $89 | 20-min video call | Cardiology, dermatology, etc.\n\nMental Health Session: $65 | 30-min therapy | Licensed psychologist\n\nAnnual Checkup Plan: $199 | 2 general + 1 specialist visit | Lab test coordination', faq: 'Q: How quickly can I see a doctor?\nA: Average wait time is under 10 minutes for general consultations.\n\nQ: Do you accept insurance?\nA: Yes, we accept most major insurance plans. Check your coverage in the app.\n\nQ: Can I get a prescription?\nA: Yes, doctors can prescribe medication electronically to your pharmacy.\n\nQ: What if I need a follow-up?\nA: Follow-up consultations are 20% off within 30 days of your first visit.', policies: 'Privacy: HIPAA compliant. All consultations are encrypted and confidential.\n\nCancellation: Free cancellation up to 2 hours before appointment.\n\nRefund: Full refund if doctor is unable to address your concern.' },
  { icon: '\u{1F4DA}', company: 'LearnPath', tag: 'Education', role: 'LearnPath AI Assistant', instructions: 'You are a helpful AI assistant for LearnPath, an online learning platform. Answer questions based ONLY on the knowledge base provided. Be encouraging, clear, and accurate.', about: 'LearnPath is an online education platform founded in 2019, offering 500+ courses in tech, design, and business. We serve over 200,000 students worldwide with self-paced learning, live workshops, and career coaching.', products: 'Individual Plan: $29/month | Unlimited access to all courses | Certificates\n\nTeam Plan: $99/month per seat | Team dashboard | Progress tracking\n\nBootcamp: $1,499 | 12-week intensive | Mentor-led | Career support\n\nWorkshop Pass: $199 | Access to 10 live workshops | Recording included', faq: 'Q: Can I learn at my own pace?\nA: Yes, all courses are self-paced with lifetime access.\n\nQ: Do you offer refunds?\nA: Full refund within 14 days if you\'re not satisfied.\n\nQ: Are courses accredited?\nA: Our certificates are recognized by over 1,000 partner companies.\n\nQ: Can I switch plans?\nA: Yes, upgrade or downgrade anytime. Changes apply next billing cycle.', policies: 'Refund: Full refund within 14 days of purchase.\n\nAccess: Lifetime access to purchased courses. Plan access continues while subscribed.\n\nPrivacy: Student data is never shared with third parties.' },
  { icon: '\u{1F4E1}', company: 'WaveConnect', tag: 'Telecom', role: 'WaveConnect AI Assistant', instructions: 'You are a helpful AI assistant for WaveConnect, a telecommunications provider. Answer questions based ONLY on the knowledge base provided. Be friendly, clear, and accurate.', about: 'WaveConnect is a telecommunications provider offering mobile, fiber internet, and TV services across 15 countries. Founded in 2010, we serve over 10 million customers with 5G coverage in 200+ cities.', products: 'Mobile Plan: $25/month | Unlimited calls | 50GB 5G data | Roaming included\n\nFiber Internet: $45/month | 500Mbps | Unlimited data | Free installation\n\nTV Bundle: $60/month | 120 channels | Netflix included | 2 set-top boxes\n\nFamily Combo: $75/month | Mobile + Fiber + TV | Save $55/month', faq: 'Q: What is your 5G coverage area?\nA: Check our coverage map at waveconnect.com/coverage.\n\nQ: Is there a contract?\nA: No, all plans are month-to-month with no lock-in contract.\n\nQ: How do I pay my bill?\nA: Pay via the WaveConnect app, website, or auto-pay.\n\nQ: What happens if I exceed my data limit?\nA: Speeds are throttled to 1Mbps. You can purchase top-up data anytime.', policies: 'Cancellation: No fees. Cancel anytime with 30 days notice.\n\nEquipment: Return routers and set-top boxes within 14 days of cancellation.\n\nFair Usage: Unlimited plans subject to fair usage policy \u2014 500GB/month for home internet.' },
];

var selectedTemplateIndex = -1;

function showTemplatePicker() {
  selectedTemplateIndex = -1;
  var overlay = document.getElementById('companyPickerOverlay');
  var grid = document.getElementById('companyGrid');
  var confirmBtn = document.getElementById('pickerConfirm');
  confirmBtn.classList.remove('visible');
  grid.innerHTML = '';
  TEMPLATES.forEach(function(t, i) {
    var card = document.createElement('div');
    card.className = 'company-card';
    card.innerHTML = '<div class="company-card-icon">' + t.icon + '</div><div class="company-card-name">' + t.company + '</div><div class="company-card-tag">' + t.tag + '</div>';
    card.onclick = function() { selectTemplate(i); };
    grid.appendChild(card);
  });
  overlay.classList.add('open');
}

function selectTemplate(index) {
  selectedTemplateIndex = index;
  var cards = document.querySelectorAll('.company-card');
  cards.forEach(function(c, i) {
    c.classList.toggle('selected', i === index);
  });
  document.getElementById('pickerConfirm').classList.add('visible');
}

function closeTemplatePicker(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('companyPickerOverlay').classList.remove('open');
  document.getElementById('pickerConfirm').classList.remove('visible');
  selectedTemplateIndex = -1;
}

function confirmTemplate() {
  if (selectedTemplateIndex < 0) return;
  loadTemplate(selectedTemplateIndex);
}

function loadTemplate(index) {
  var t = TEMPLATES[index];
  if (!t) return;
  closeTemplatePicker();

  updateStatus('retrieving');
  updatePipeline(0);

  setTimeout(function() {
    updatePipeline(1);

    data.persona.company = t.company;
    data.persona.role = t.role;
    data.persona.instructions = t.instructions;
    data.kb.about = t.about;
    data.kb.products = t.products;
    data.kb.faq = t.faq;
    data.kb.policies = t.policies;
    data.chatHistory = [];
    updateWelcomeMessage();
    document.getElementById('chatMessages').innerHTML = '';
    addMessage('bot', 'Switched to ' + t.company + '. Your chat has been reset for the new company.', false);
    addMessage('bot', "Hi! I'm the " + t.company + " AI assistant. I can answer questions about our products, services, eligibility, and policies \u2014 but only based on what's in the knowledge base.", false);

    setTimeout(function() {
      updateStatus('generating');
      updatePipeline(2);

      setTimeout(function() {
        updatePipeline(3);

        saveToStorage();
        loadEditors();
        initLeftPanel();
        updateChatBotName();
        selectFile(activeFile);
        switchTab('preview');

        setTimeout(function() {
          updateStatus('ready');
          resetPipeline();
        }, 400);
      }, 200);
    }, 200);
  }, 200);
}

function initLeftPanel() {
  updateDashboard();
  const company = data.persona.company || 'Nova Finance';
  const chipContainer = document.getElementById('leftChips');
  chipContainer.innerHTML = '';

  const fallbackChips = [
    'What are your loan interest rates?',
    'How do I apply?',
  ];

  const questions = [];
  KB_SECTIONS.forEach(section => {
    const hasContent = data.kb[section.key] && data.kb[section.key].trim().length > 0;
    if (hasContent) {
      questions.push(section.question.replace('{company}', company));
    }
  });

  while (questions.length < 4 && fallbackChips.length) {
    questions.push(fallbackChips.shift());
  }

  questions.slice(0, 4).forEach(text => {
    const chip = document.createElement('button');
    chip.className = 'suggestion-chip';
    chip.type = 'button';
    chip.textContent = text;
    chip.addEventListener('click', () => {
      const input = document.getElementById('chatInput');
      input.value = text;
      if (document.getElementById('tab-preview').classList.contains('active')) {
        sendMessage();
      } else {
        switchTab('preview');
        setTimeout(sendMessage, 100);
      }
    });
    chipContainer.appendChild(chip);
  });
}

function switchTab(tabName) {
  data.activeTab = tabName;
  saveToStorage();

  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-content').forEach(c => {
    c.classList.toggle('active', c.id === 'tab-' + tabName);
  });
}

function selectFile(fileName) {
  activeFile = fileName;
  data.activeFile = fileName;

  document.querySelectorAll('.code-file-item').forEach(item => {
    item.classList.toggle('active', item.dataset.file === fileName);
  });

  const labels = {
    persona: 'Persona',
    about: 'About',
    products: 'Products',
    faq: 'FAQ',
    policies: 'Policies'
  };

  const body = document.getElementById('editorBody');
  if (fileName === 'persona') {
    body.innerHTML = `
      <div class="field-group">
        <label class="field-label">Company Name</label>
        <input class="field-input" id="personaCompany" maxlength="100" value="${escapeHtml(data.persona.company)}" placeholder="e.g. Nova Finance" />
      </div>
      <div class="field-group">
        <label class="field-label">AI Role / Title</label>
        <input class="field-input" id="personaRole" maxlength="150" value="${escapeHtml(data.persona.role)}" placeholder="e.g. Customer Service Assistant" />
      </div>
      <div class="field-group">
        <label class="field-label">System Instructions</label>
        <textarea class="field-textarea" id="personaInstructions" rows="12" maxlength="5000" placeholder="Define how the AI should behave...">${escapeHtml(data.persona.instructions)}</textarea>
      </div>
    `;
  } else {
    const rows = fileName === 'faq' ? 18 : (fileName === 'products' ? 14 : 12);
    body.innerHTML = `
      <textarea class="field-textarea" id="kb-${fileName}" rows="${rows}" maxlength="5000" placeholder="Enter ${labels[fileName].toLowerCase()} content...">${escapeHtml(data.kb[fileName])}</textarea>
    `;
  }
}

function saveData() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    data.persona.company = document.getElementById('mobilePersonaCompany').value.trim().slice(0, 100);
    data.persona.role = document.getElementById('mobilePersonaRole').value.trim().slice(0, 150);
    data.persona.instructions = document.getElementById('mobilePersonaInstructions').value.trim();
    data.kb.about = document.getElementById('mobileKbAbout').value.trim();
    data.kb.products = document.getElementById('mobileKbProducts').value.trim();
    data.kb.faq = document.getElementById('mobileKbFaq').value.trim();
    data.kb.policies = document.getElementById('mobileKbPolicies').value.trim();
  } else {
    if (activeFile === 'persona') {
      data.persona.company = document.getElementById('personaCompany').value.trim().slice(0, 100);
      data.persona.role = document.getElementById('personaRole').value.trim().slice(0, 150);
      data.persona.instructions = document.getElementById('personaInstructions').value.trim();
    } else {
      const textarea = document.getElementById('kb-' + activeFile);
      if (textarea) data.kb[activeFile] = textarea.value.trim();
    }
  }

  saveToStorage();
  updateChatBotName();
  initLeftPanel();
  showSaveStatus();
}

function showSaveStatus() {
  const id = window.innerWidth <= 768 ? 'mobileSaveStatus' : 'saveStatus';
  const el = document.getElementById(id);
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2000);
}

function updateChatBotName() {
  const name = data.persona.company || 'Nova Finance';
  document.getElementById('chatBotName').textContent = name + ' AI';
}

function toggleAccordion(header) {
  const item = header.parentElement;
  item.classList.toggle('open');
}

function loadEditors() {
  document.getElementById('mobilePersonaCompany').value = data.persona.company;
  document.getElementById('mobilePersonaRole').value = data.persona.role;
  document.getElementById('mobilePersonaInstructions').value = data.persona.instructions;
  document.getElementById('mobileKbAbout').value = data.kb.about;
  document.getElementById('mobileKbProducts').value = data.kb.products;
  document.getElementById('mobileKbFaq').value = data.kb.faq;
  document.getElementById('mobileKbPolicies').value = data.kb.policies;
}

function collectKB() {
  const parts = [
    { label: "About", key: "about" },
    { label: "Products & Services", key: "products" },
    { label: "FAQ", key: "faq" },
    { label: "Policies", key: "policies" },
  ];
  return parts
    .map(p => {
      const val = data.kb[p.key].trim();
      return val ? `## ${p.label}\n${val}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

function getPersona() {
  return data.persona.instructions.trim();
}

async function sendMessage() {
  if (isLoading) return;
  const input = document.getElementById("chatInput");
  const question = input.value.trim();
  if (!question) return;

  input.value = "";
  input.style.height = "auto";

  addMessage("user", question);
  data.chatHistory.push({ role: "user", content: question });
  saveToStorage();
  updateStats();

  const typingId = showTyping();
  isLoading = true;
  document.getElementById("sendBtn").disabled = true;

  updateStatus('retrieving');
  updatePipeline(0);

  const startTime = performance.now();

  try {
    updatePipeline(1);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        knowledgeBase: collectKB(),
        persona: getPersona(),
        history: data.chatHistory.slice(-10),
        sessionId,
        companyName: data.persona.company,
      }),
    });

    updateStatus('generating');
    updatePipeline(2);

    const responseData = await res.json();
    removeTyping(typingId);

    updatePipeline(3);

    if (res.ok) {
      addMessage("bot", responseData.answer);
      data.chatHistory.push({ role: "assistant", content: responseData.answer });
      responseTimes.push(performance.now() - startTime);
      if (responseTimes.length > 10) responseTimes.shift();
    } else {
      addMessage("bot", responseData.error || "Something went wrong. Please try again.");
    }
    saveToStorage();
    updateStats();

    setTimeout(() => {
      updateStatus('ready');
      resetPipeline();
    }, 800);
  } catch {
    removeTyping(typingId);
    addMessage("bot", "Could not reach the server. Please check your connection and try again.");
    updateStatus('offline');
    resetPipeline();
  }

  isLoading = false;
  document.getElementById("sendBtn").disabled = false;
}

function addMessage(role, content, animate = true) {
  const container = document.getElementById("chatMessages");
  const el = document.createElement("div");
  el.className = `message ${role}${animate ? " message-new" : ""}`;

  if (role === "bot") {
    el.innerHTML = `
      <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="message-bubble">${escapeHtml(content)}</div>
    `;
  } else if (role === "user") {
    el.innerHTML = `<div class="message-bubble">${escapeHtml(content)}</div>`;
  } else {
    el.innerHTML = `<div class="message-bubble">${content}</div>`;
  }

  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById("chatMessages");
  const id = "typing-" + Date.now();
  const el = document.createElement("div");
  el.id = id;
  el.className = "message bot message-new";
  el.innerHTML = `
    <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="message-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function clearChat() {
  data.chatHistory = [];
  saveToStorage();
  const container = document.getElementById("chatMessages");
  container.innerHTML = "";
  const company = data.persona.company || "Nova Finance";
  addMessage("bot", `Chat cleared. I'm the ${company} AI assistant \u2014 ask me anything about our products and services.`);
  updateStats();
}

function copyLog() {
  const text = data.chatHistory.map(m =>
    (m.role === 'user' ? 'You: ' : 'Bot: ') + m.content
  ).join('\n\n');
  if (!text) return;

  const btn = document.querySelector('.action-btn:last-child');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fa-regular fa-check-circle"></i> Copied!';

  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  });

  setTimeout(function() { btn.innerHTML = orig; }, 1500);
}

function restoreChat() {
  const container = document.getElementById("chatMessages");
  if (data.chatHistory.length === 0) return;

  container.innerHTML = "";
  var company = data.persona.company || 'Nova Finance';
  addMessage('bot', "Hi! I'm the " + company + " AI assistant. I can answer questions about our products, services, eligibility, and policies \u2014 but only based on what's in the knowledge base.", false);
  data.chatHistory.forEach(msg => {
    if (msg.role === 'user') addMessage('user', msg.content, false);
    else if (msg.role === 'assistant') addMessage('bot', msg.content, false);
  });
}

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 120) + "px";
}

function useSuggestion(chip) {
  const input = document.getElementById("chatInput");
  input.value = chip.textContent;
  input.focus();
  if (document.getElementById('tab-preview').classList.contains('active')) {
    sendMessage();
  } else {
    switchTab('preview');
    setTimeout(sendMessage, 100);
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Event Listener Wiring ──
(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // Reset button
    var resetBtn = document.getElementById('btnReset');
    if (resetBtn) resetBtn.addEventListener('click', clearChat);

    // Copy log button
    var copyBtn = document.getElementById('btnCopyLog');
    if (copyBtn) copyBtn.addEventListener('click', copyLog);

    // Company picker buttons
    var companyBtns = document.querySelectorAll('#btnCompanyPicker, #tabCompanyPicker');
    companyBtns.forEach(function (el) {
      el.addEventListener('click', showTemplatePicker);
    });

    // Tab buttons
    document.querySelectorAll('.tab-btn[data-tab]').forEach(function (el) {
      el.addEventListener('click', function () {
        switchTab(el.dataset.tab);
      });
    });

    // Clear chat header button
    var clearHeader = document.getElementById('btnClearChatHeader');
    if (clearHeader) clearHeader.addEventListener('click', clearChat);

    // Suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        useSuggestion(chip);
      });
    });

    // Chat textarea
    var chatInput = document.getElementById('chatInput');
    if (chatInput) {
      chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
      chatInput.addEventListener('input', function () {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
      });
    }

    // Send button
    var sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);

    // File list items
    document.querySelectorAll('.code-file-item').forEach(function (el) {
      el.addEventListener('click', function () {
        selectFile(el.dataset.file);
      });
    });

    // Save button (desktop)
    var saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveData);

    // Accordion headers
    document.querySelectorAll('.accordion-header').forEach(function (header) {
      header.addEventListener('click', function () {
        toggleAccordion(header);
      });
    });

    // Mobile save button
    var mobileSave = document.getElementById('btnMobileSave');
    if (mobileSave) mobileSave.addEventListener('click', saveData);

    // Company picker overlay
    var overlay = document.getElementById('companyPickerOverlay');
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target !== e.currentTarget) return;
        closeTemplatePicker(e);
      });
    }

    // Company picker modal — stop propagation
    var modal = document.querySelector('.company-picker-modal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }

    // Pickercancel/confirm
    var cancelBtn = document.getElementById('btnPickerCancel');
    if (cancelBtn) cancelBtn.addEventListener('click', closeTemplatePicker);

    var confirmBtn = document.getElementById('pickerConfirm');
    if (confirmBtn) confirmBtn.addEventListener('click', confirmTemplate);
  });
})();

init();
