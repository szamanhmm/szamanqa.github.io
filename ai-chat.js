// Saifuz Zaman AI Chat & QA Recommendation Engine
(function() {
  'use strict';

  const SAIFUZ_KNOWLEDGE = {
    name: 'Saifuz Zaman (Saifuzzaman)',
    role: 'Top-Rated SQA Engineer & CEO at C4U Tech',
    experience: '3+ Years of Professional QA Experience',
    testedApps: '83+ Mobile & Web Applications across Global Clients',
    upworkProfile: 'https://www.upwork.com/freelancers/~017c08c6bfe9705ad6',
    email: 'contact.szaman@gmail.com',
    c4uTech: 'https://c4utech.com'
  };

  const QA_RECOMMENDATIONS = {
    fintech: {
      title: 'Fintech & Payment Applications QA Strategy',
      points: [
        'Security & Compliance: Verify end-to-end TLS encryption, tokenization, session expiry, and zero sensitive data in logs.',
        'Transaction Integrity: Test concurrency, race conditions, edge cases on micro-deposits, currency conversions, and refund rollbacks.',
        'API & Webhook Reliability: Mock gateway timeouts, simulate network packet drops using Postman & Charles Proxy to verify idempotent retries.',
        'Recommended Automation: Cypress for web payment workflows, Appium for biometric/touch authentication on iOS/Android.',
        'Boundary Testing: Exhaustive edge testing on amounts (negative numbers, extreme limits, decimal rounding, zero values).'
      ]
    },
    ai_chatbot: {
      title: 'AI Chatbots, LLMs & Conversational Agents QA Strategy',
      points: [
        'Guardrails & Safety: Run adversarial prompt injections, jailbreak attempts, and off-topic prompts to verify safety guardrails.',
        'Latency & Stream Stress Testing: Measure Time To First Token (TTFT) and socket connection stability during concurrent user spikes.',
        'Context & Memory: Validate 10+ turn dialogues ensuring system persona and conversation memory remain accurate.',
        'Structured Output Validation: Ensure strict JSON schema compliance for function calling and tool execution workflows.',
        'Graceful Degradation: Test fallback states when LLM API returns 429 rate limit or 503 service unavailable.'
      ]
    },
    ecommerce: {
      title: 'E-Commerce & Retail Apps QA Strategy',
      points: [
        'Checkout Funnel: Test coupon codes, dynamic shipping calculations, tax by postal code, and out-of-stock race conditions.',
        'Cross-Device & Viewport: Test across mobile Safari, Android Chrome, and desktop viewports to eliminate layout shift.',
        'Performance & CWV: Audit Core Web Vitals (LCP < 2.5s, INP < 200ms) to ensure maximum conversion rates.',
        'Automated Smoke Suite: Run Cypress tests on every build covering Search -> Cart -> Payment -> Confirmation.'
      ]
    },
    mobile_apps: {
      title: 'iOS & Android Mobile Apps QA Strategy',
      points: [
        'Google Play 14-day / 20-tester Closed Testing: Full compliance with Google Play developer verification and crash-free sessions.',
        'Device Fragmentation: Test across real Android devices (Samsung, Pixel, Xiaomi with diverse OS versions) and iOS devices.',
        'Offline Mode & Sync: Verify local SQLite/Realm data caching and recovery when connectivity resumes.',
        'Permissions & Hardware: Test camera, push notifications, background location permissions, and user denial handling.'
      ]
    },
    saas_web: {
      title: 'SaaS Web Platform QA Strategy',
      points: [
        'Multi-Tenancy & RBAC: Validate strict workspace isolation between Admin, Editor, and Viewer roles.',
        'API Contracts & Regression: Postman collection tests integrated into CI/CD for contract validation.',
        'Cross-Browser Consistency: Verify Chrome, Firefox, Safari, and Edge rendering identical styling and DOM interactions.',
        'Data Export / Import: Stress test CSV/Excel imports with 50,000+ rows and malformed files.'
      ]
    }
  };

  function getInstantAnswer(userText) {
    const text = userText.toLowerCase();

    if (text.includes('exp') || text.includes('year') || text.includes('background') || text.includes('who are you') || text.includes('about')) {
      return 'Saifuz Zaman is a Top-Rated SQA Engineer on Upwork and CEO at C4U Tech with **3+ years of professional quality assurance experience**. He has tested over 83+ web and mobile applications globally, specializing in manual testing, Cypress test automation, API validation, and AI project testing.';
    }

    if (text.includes('83') || text.includes('app') || text.includes('project') || text.includes('client') || text.includes('portfolio')) {
      return 'Saifuz has rigorously tested **83+ mobile and web applications** across Fintech, Health, E-Commerce, Social, AI, and Logistics. Notable client projects include: Waada Care, Green Step Trading, Blackbook (BBK), VBAPPS, Dr.fit, Finbotica, Robowork, and Closetfestive.';
    }

    if (text.includes('tool') || text.includes('skill') || text.includes('automation') || text.includes('cypress') || text.includes('selenium')) {
      return 'Saifuz QA toolkit includes:\n- **Automation**: Cypress, Selenium WebDriver, PyCharm, JavaScript, Python\n- **API Testing**: Postman, Charles Proxy, Swagger, REST & GraphQL APIs\n- **Mobile QA**: iOS (TestFlight), Android (Google Play Closed Testing), Charles Proxy SSL sniffing\n- **Bug Tracking**: Jira, Trello, ClickUp, GitHub Issues, comprehensive defect reports with repro steps & screen recordings.';
    }

    if (text.includes('hire') || text.includes('contact') || text.includes('email') || text.includes('upwork') || text.includes('rate') || text.includes('price')) {
      return 'You can hire Saifuz directly on Upwork or get in touch via email:\n- **Upwork**: [View Saifuz Zaman on Upwork](' + SAIFUZ_KNOWLEDGE.upworkProfile + ') (Top-Rated with 100% Job Success)\n- **Email**: [' + SAIFUZ_KNOWLEDGE.email + '](mailto:' + SAIFUZ_KNOWLEDGE.email + ')\n- **Company**: [C4U Tech](' + SAIFUZ_KNOWLEDGE.c4uTech + ')\nHe offers manual testing sprints, automation test setup, API audit, and Google Play closed testing services.';
    }

    if (text.includes('ai') || text.includes('chatgpt') || text.includes('gemini') || text.includes('llm') || text.includes('dispatching')) {
      return 'Saifuz has hands-on QA expertise in **AI Systems and LLM applications**:\n- Testing customer support conversational chatbots and AI dispatching algorithms.\n- Stress testing prompt injection, context retrieval, hallucination boundaries, and latency.\n- Verifying function calling accuracy and JSON payload structure under high loads.';
    }

    if (text.includes('recommend') || text.includes('strategy') || text.includes('plan') || text.includes('audit')) {
      return 'To get a customized QA strategy for your application, click on the **QA Recommender** tab at the top of this widget! Select your app category (Fintech, AI Chatbot, Mobile, E-Commerce, or SaaS) and generate an instant tailored testing roadmap.';
    }

    return 'Hello! I am Saifuz Zaman AI Assistant. How can I assist you today?\n\nYou can ask me about:\n1. **3+ Years QA Experience & Skills**\n2. **83+ Tested Apps & Case Studies**\n3. **Cypress Automation & API Validation**\n4. **Recommended QA Strategy for your project**\n5. **How to hire Saifuz on Upwork**';
  }

  async function callGeminiApi(prompt, apiKey) {
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(apiKey);
    const systemPrompt = 'You are the AI assistant for Saifuz Zaman (also known as Saifuzzaman), Top-Rated SQA Engineer on Upwork, QA Lead and CEO at C4U Tech with 3+ years experience. Answer professionally, concisely, highlighting his testing skills, 83+ apps tested, Cypress automation, API testing, and direct contact options (contact.szaman@gmail.com, Upwork).';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\nUser question: ' + prompt }] }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error ? err.error.message : 'Gemini API Error');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  async function callOpenAiApi(prompt, apiKey) {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are the AI assistant for Saifuz Zaman, Top-Rated SQA Engineer on Upwork and CEO at C4U Tech with 3+ years experience. Speak concisely and accurately about his QA experience.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error ? err.error.message : 'OpenAI API Error');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  function initWidget() {
    const launcher = document.createElement('button');
    launcher.className = 'ai-chat-launcher';
    launcher.setAttribute('aria-label', 'Open AI Assistant');
    launcher.innerHTML = [
      '<span class="ai-icon-badge">',
      '  <i class="fas fa-robot"></i>',
      '  <span class="ai-online-ping"></span>',
      '</span>',
      '<span class="ai-label">Ask Saifuz AI</span>'
    ].join('');

    const chatWindow = document.createElement('div');
    chatWindow.className = 'ai-chat-window';
    chatWindow.setAttribute('role', 'dialog');
    chatWindow.setAttribute('aria-label', 'AI Assistant Chat Window');
    chatWindow.innerHTML = [
      '<div class="ai-chat-header">',
      '  <div class="ai-header-info">',
      '    <img src="AVATAR.webp" alt="Saifuz Zaman" class="ai-avatar" width="36" height="36" loading="lazy">',
      '    <div class="ai-header-text">',
      '      <h4>Saifuz Zaman AI</h4>',
      '      <span><span class="ai-status-indicator"></span> SQA Expert ? 3+ Years Exp</span>',
      '    </div>',
      '  </div>',
      '  <div class="ai-header-controls">',
      '    <button class="ai-icon-btn" id="aiMinimizeBtn" title="Close Chat" aria-label="Close Chat">',
      '      <i class="fas fa-times"></i>',
      '    </button>',
      '  </div>',
      '</div>',
      '<div class="ai-chat-tabs">',
      '  <button class="ai-tab-btn active" data-tab="chat">',
      '    <i class="fas fa-comments"></i> Chat',
      '  </button>',
      '  <button class="ai-tab-btn" data-tab="rec">',
      '    <i class="fas fa-bullseye"></i> Recommender',
      '  </button>',
      '  <button class="ai-tab-btn" data-tab="settings">',
      '    <i class="fas fa-cog"></i> API Key',
      '  </button>',
      '</div>',
      '<div class="ai-chat-body">',
      '  <div class="ai-tab-content active" id="tab-chat">',
      '    <div class="ai-messages-list" id="aiMsgList">',
      '      <div class="ai-msg bot">',
      '        <p>?? Hi! I am <strong>Saifuz Zaman AI Assistant</strong>.</p>',
      '        <p>Ask me anything about his 3+ years SQA experience, 83+ tested applications, or generate a custom QA recommendation for your app!</p>',
      '      </div>',
      '    </div>',
      '    <div class="ai-quick-chips" id="aiQuickChips">',
      '      <button class="ai-chip" data-q="Summarize Saifuz Zaman 3+ years QA experience">?? 3+ Years Exp</button>',
      '      <button class="ai-chip" data-q="What 83+ apps and niches has he tested?">?? 83+ Apps Tested</button>',
      '      <button class="ai-chip" data-q="Tell me about his Cypress and API testing stack">? Cypress & API Stack</button>',
      '      <button class="ai-chip" data-q="How can I hire Saifuz on Upwork?">?? Hire on Upwork</button>',
      '    </div>',
      '    <form class="ai-chat-input-bar" id="aiChatForm">',
      '      <input type="text" class="ai-input" id="aiChatInput" placeholder="Ask about QA experience, tools..." autocomplete="off">',
      '      <button type="submit" class="ai-send-btn" aria-label="Send Message">',
      '        <i class="fas fa-paper-plane"></i>',
      '      </button>',
      '    </form>',
      '  </div>',
      '  <div class="ai-tab-content" id="tab-rec">',
      '    <div class="ai-rec-box">',
      '      <label for="aiAppType"><i class="fas fa-layer-group"></i> Application Type:</label>',
      '      <select id="aiAppType" class="ai-rec-select">',
      '        <option value="fintech">Fintech & Payments</option>',
      '        <option value="ai_chatbot">AI Chatbot & LLM App</option>',
      '        <option value="ecommerce">E-Commerce & Retail</option>',
      '        <option value="mobile_apps">iOS / Android Mobile App</option>',
      '        <option value="saas_web">SaaS Web Platform</option>',
      '      </select>',
      '      <button type="button" class="ai-generate-btn" id="aiGenRecBtn">',
      '        <i class="fas fa-magic"></i> Generate QA Strategy',
      '      </button>',
      '    </div>',
      '    <div id="aiRecResult" class="ai-rec-result" style="display:none;"></div>',
      '  </div>',
      '  <div class="ai-tab-content" id="tab-settings">',
      '    <p class="ai-settings-desc">',
      '      Default mode uses Saifuz built-in intelligent portfolio knowledge base. Optionally enter your own Gemini or ChatGPT API key for open-ended generative chat. Keys are stored locally in your browser.',
      '    </p>',
      '    <div class="ai-field-group">',
      '      <label for="aiProviderSelect">AI Engine Provider:</label>',
      '      <select id="aiProviderSelect" class="ai-rec-select">',
      '        <option value="offline">Smart Built-in QA Model (Free / Instant)</option>',
      '        <option value="gemini">Google Gemini Flash (API Key)</option>',
      '        <option value="openai">OpenAI ChatGPT (API Key)</option>',
      '      </select>',
      '    </div>',
      '    <div class="ai-field-group" id="apiKeyFieldGroup" style="display:none;">',
      '      <label for="aiCustomApiKey">API Key:</label>',
      '      <input type="password" id="aiCustomApiKey" placeholder="Enter API key...">',
      '    </div>',
      '    <button type="button" class="ai-save-settings-btn" id="aiSaveSettingsBtn">Save Preference</button>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(launcher);
    document.body.appendChild(chatWindow);

    setupEvents(launcher, chatWindow);
  }

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong></strong>')
      .replace(/\*(.*?)\*/g, '<em></em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="" target="_blank" rel="noopener noreferrer"></a>')
      .replace(/\n/g, '<br>');
  }

  function setupEvents(launcher, chatWindow) {
    const minBtn = document.getElementById('aiMinimizeBtn');
    const tabs = chatWindow.querySelectorAll('.ai-tab-btn');
    const tabContents = chatWindow.querySelectorAll('.ai-tab-content');
    const chatForm = document.getElementById('aiChatForm');
    const chatInput = document.getElementById('aiChatInput');
    const msgList = document.getElementById('aiMsgList');
    const chips = chatWindow.querySelectorAll('.ai-chip');
    const genRecBtn = document.getElementById('aiGenRecBtn');
    const recResult = document.getElementById('aiRecResult');
    const providerSelect = document.getElementById('aiProviderSelect');
    const apiKeyGroup = document.getElementById('apiKeyFieldGroup');
    const apiKeyInput = document.getElementById('aiCustomApiKey');
    const saveSettingsBtn = document.getElementById('aiSaveSettingsBtn');

    launcher.addEventListener('click', () => {
      chatWindow.classList.toggle('active');
      if (chatWindow.classList.contains('active')) {
        chatInput.focus();
      }
    });

    minBtn.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const targetId = 'tab-' + tab.getAttribute('data-tab');
        const content = document.getElementById(targetId);
        if (content) content.classList.add('active');
      });
    });

    genRecBtn.addEventListener('click', () => {
      const type = document.getElementById('aiAppType').value;
      const rec = QA_RECOMMENDATIONS[type];
      if (rec) {
        recResult.style.display = 'block';
        let html = '<h4>' + rec.title + '</h4><ul>';
        rec.points.forEach(p => {
          html += '<li>' + p + '</li>';
        });
        html += '</ul><p style="margin-top:10px; font-weight:600;">?? Need this executed? <a href="' + SAIFUZ_KNOWLEDGE.upworkProfile + '" target="_blank">Hire Saifuz on Upwork</a> or email <a href="mailto:' + SAIFUZ_KNOWLEDGE.email + '">' + SAIFUZ_KNOWLEDGE.email + '</a>.</p>';
        recResult.innerHTML = html;
      }
    });

    const savedProvider = localStorage.getItem('sz_ai_provider') || 'offline';
    const savedKey = localStorage.getItem('sz_ai_key') || '';
    providerSelect.value = savedProvider;
    apiKeyInput.value = savedKey;
    if (savedProvider !== 'offline') apiKeyGroup.style.display = 'block';

    providerSelect.addEventListener('change', () => {
      apiKeyGroup.style.display = providerSelect.value === 'offline' ? 'none' : 'block';
    });

    saveSettingsBtn.addEventListener('click', () => {
      localStorage.setItem('sz_ai_provider', providerSelect.value);
      localStorage.setItem('sz_ai_key', apiKeyInput.value.trim());
      saveSettingsBtn.textContent = 'Saved!';
      setTimeout(() => { saveSettingsBtn.textContent = 'Save Preference'; }, 1500);
    });

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-q');
        handleSendMessage(query);
      });
    });

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      handleSendMessage(val);
      chatInput.value = '';
    });

    async function handleSendMessage(text) {
      const userBubble = document.createElement('div');
      userBubble.className = 'ai-msg user';
      userBubble.textContent = text;
      msgList.appendChild(userBubble);
      msgList.scrollTop = msgList.scrollHeight;

      const typing = document.createElement('div');
      typing.className = 'ai-typing-indicator';
      typing.innerHTML = '<span class="ai-typing-dot"></span><span class="ai-typing-dot"></span><span class="ai-typing-dot"></span>';
      msgList.appendChild(typing);
      msgList.scrollTop = msgList.scrollHeight;

      const provider = localStorage.getItem('sz_ai_provider') || 'offline';
      const apiKey = localStorage.getItem('sz_ai_key') || '';

      try {
        let botReply = '';
        if (provider === 'gemini' && apiKey) {
          botReply = await callGeminiApi(text, apiKey);
        } else if (provider === 'openai' && apiKey) {
          botReply = await callOpenAiApi(text, apiKey);
        } else {
          await new Promise(r => setTimeout(r, 350));
          botReply = getInstantAnswer(text);
        }

        typing.remove();

        const botBubble = document.createElement('div');
        botBubble.className = 'ai-msg bot';
        botBubble.innerHTML = formatMarkdown(botReply);
        msgList.appendChild(botBubble);
      } catch (err) {
        typing.remove();
        const errBubble = document.createElement('div');
        errBubble.className = 'ai-msg bot';
        errBubble.innerHTML = '<span style="color:#ef4444;">Error: ' + err.message + '. Falling back to offline assistant:</span><br>' + formatMarkdown(getInstantAnswer(text));
        msgList.appendChild(errBubble);
      }

      msgList.scrollTop = msgList.scrollHeight;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
