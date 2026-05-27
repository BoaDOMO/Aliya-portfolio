(function () {
  const MINI_KB = `## About
Nova Finance is a digital-first microfinance institution founded in 2020, headquartered in Phnom Penh, Cambodia. Licensed by the National Bank of Cambodia, we serve over 50,000 customers across 25 provinces. Our mission is to make financial services accessible, fast, and fair for every Cambodian. We operate fully digitally — no physical branches required.

## Products & Services
Personal Loan: $200–$10,000 | 3–36 months | From 1.2% per month (flat rate) | Disbursed within 24 hours after approval.

Business Loan: $1,000–$50,000 | 6–60 months | From 1.0% per month (flat rate) | Disbursed in 1–3 business days.

Nova Savings Account: 5.5% annual interest | Minimum deposit $50 | No monthly fees | Free ATM withdrawals up to 5 times per month.

Nova Digital Wallet: Free instant transfers between Nova accounts | 0.5% cashback on all purchases | QR code payments accepted at over 10,000 merchants.

## FAQ
Q: How do I apply for a loan?
A: Apply online at novafinance.com.kh or through the Nova Finance mobile app (available on iOS and Android).

Q: What documents do I need?
A: Valid Cambodian National ID or Passport, last 3 months of bank statements or salary slips, and proof of address.

Q: How long does approval take?
A: Our team reviews applications within 4 business hours. You will receive an SMS and email notification upon decision.

Q: Can I repay my loan early?
A: Yes. Nova Finance charges no early repayment penalties. You can settle your loan at any time.

Q: What happens if I miss a payment?
A: A late fee of 0.5% of the outstanding balance applies per day after the due date. Contact our support team before your due date if you need assistance.

Q: Can I have two loans at the same time?
A: Yes, if your first loan is in good standing and your total outstanding balance does not exceed your approved credit limit.

Q: How do I contact customer support?
A: Hotline: 023 456 789 (8am–8pm daily) | Email: support@novafinance.com.kh | In-app live chat.

## Policies
Eligibility: Applicants must be aged 18–65, hold a valid Cambodian National ID or valid work permit, have a minimum monthly income of $250, and have no active loan defaults at any financial institution.

Data Privacy: Customer data is processed in compliance with Cambodian Law on Data Privacy. Data is used solely for loan assessment, account management, and regulatory reporting. We do not sell customer data to third parties.

Security: All data is encrypted using AES-256 encryption. Servers are located in Cambodia and undergo quarterly security audits.`;

  let miniHistory = [];
  let miniLoading = false;
  let miniBotResponseCount = 0;
  const miniSessionId = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

  function miniEscapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function miniUseSuggestion(chip) {
    const input = document.getElementById('miniChatInput');
    input.value = chip.textContent;
    input.focus();
    miniSendMessage();
  }

  function miniMaybeShowCTA() {
    if (miniBotResponseCount >= 3) {
      const existing = document.querySelector('.mini-cta');
      if (existing) return;
      const container = document.getElementById('miniChatMessages');
      const cta = document.createElement('div');
      cta.className = 'mini-cta mini-msg-new';
      cta.innerHTML = '<a href="./rag-chatbot.html">Try the full demo <i class="fa-solid fa-arrow-right mini-cta-arrow"></i></a>';
      container.appendChild(cta);
      container.scrollTop = container.scrollHeight;
    }
  }

  function miniSendMessage() {
    if (miniLoading) return;
    const input = document.getElementById('miniChatInput');
    const question = input.value.trim();
    if (!question) return;

    input.value = '';
    miniAddMessage('user', question);
    miniHistory.push({ role: 'user', content: question });

    const typingId = miniShowTyping();
    miniLoading = true;
    document.getElementById('miniChatSend').disabled = true;

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        knowledgeBase: MINI_KB,
        history: miniHistory.slice(-8),
        sessionId: miniSessionId,
        companyName: 'Nova Finance',
      }),
    })
      .then(res => res.json())
      .then(data => {
        miniRemoveTyping(typingId);
        const answer = data.answer || data.error || 'Something went wrong.';
        miniAddMessage('bot', answer);
        miniHistory.push({ role: 'assistant', content: answer });
        miniBotResponseCount++;
        miniMaybeShowCTA();
      })
      .catch(() => {
        miniRemoveTyping(typingId);
        miniAddMessage('bot', 'Could not reach the server. Try again.');
      })
      .finally(() => {
        miniLoading = false;
        document.getElementById('miniChatSend').disabled = false;
      });
  }

  function miniAddMessage(role, text) {
    const container = document.getElementById('miniChatMessages');
    const el = document.createElement('div');
    el.className = `mini-msg ${role} mini-msg-new`;
    if (role === 'bot') {
      const icon = '<span class="mini-msg-icon"><i class="fa-solid fa-robot"></i></span>';
      el.innerHTML = icon + miniEscapeHtml(text);
    } else {
      el.textContent = text;
    }
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }

  function miniShowTyping() {
    const container = document.getElementById('miniChatMessages');
    const id = 'mini-typing-' + Date.now();
    const el = document.createElement('div');
    el.id = id;
    el.className = 'mini-msg bot mini-msg-new';
    el.innerHTML = `<div class="mini-typing">
      <div class="mini-typing-dot"></div>
      <div class="mini-typing-dot"></div>
      <div class="mini-typing-dot"></div>
    </div>`;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return id;
  }

  function miniRemoveTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var chips = document.querySelectorAll('.mini-suggestion-chip');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        miniUseSuggestion(this);
      });
    });

    var sendBtn = document.getElementById('miniChatSend');
    if (sendBtn) {
      sendBtn.addEventListener('click', miniSendMessage);
    }

    var input = document.getElementById('miniChatInput');
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          miniSendMessage();
        }
      });
    }
  });
})();
