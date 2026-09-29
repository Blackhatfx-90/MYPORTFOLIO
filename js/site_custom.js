/**
 * Custom site runtime enhancements for Priyanshu Shukla's portfolio:
 * - Dynamic text updates:
 *   - Top header logo: "AI Engineer"
 *   - Main hero typography above Portfolio & About: "Priyanshu Shukla"
 *   - Completely replaces any "Soren Weil" or "Soren" with "Priyanshu Shukla" / "Priyanshu"
 * - Removes Framer overlay / Get Template button
 * - Portfolio links mapping to live deployed projects
 * - Floating Talk Now WhatsApp button integration
 */

(function () {
  const HERO_NAME = 'Priyanshu Shukla';
  const FIRST_NAME = 'Priyanshu';
  const NAV_TITLE = 'AI Engineer';
  const EMAIL = 'godfathersid3@gmail.com';
  const PHONE = '+91 9068839558';
  const WHATSAPP_URL = 'https://wa.me/919068839558';
  const RESUME_URL = 'https://drive.google.com/file/d/1zNmpFoW4msuZVnZGkRDq8nEgqqqsyhbe/view?usp=sharing';
  const GITHUB_URL = 'https://github.com/Blackhatfx-90';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/priyanshu-shukla-35630b332';

  const PROJECT_MAP = {
    'travel-easy': {
      title: 'Veterian FX',
      url: 'https://veterian-fx.vercel.app',
      category: 'Fintech / Trading',
      image: 'images/projects/veterian-fx.png'
    },
    'gamma': {
      title: 'Bharat Dev AI',
      url: 'https://bharat-dev-ai.vercel.app',
      category: 'AI Platform / Dev',
      image: 'images/projects/bharat-dev-ai.png'
    },
    'stream-ai': {
      title: 'Premium Verse',
      url: 'https://premium-verse.vercel.app',
      category: 'Web3 & Creative Tech',
      image: 'images/projects/premium-verse.png'
    },
    'foome': {
      title: 'Med Mart',
      url: 'https://med-mart.in',
      category: 'E-Commerce / Health',
      image: 'images/projects/med-mart.png'
    },
    'edbost': {
      title: 'RaaMed',
      url: 'https://raamed.online',
      category: 'Healthcare Solutions',
      image: 'images/projects/raamed.png'
    },
    'vridhi-ai': {
      title: 'Vridhi AI',
      url: 'https://vridhi-ai.onrender.com',
      category: 'AI Intelligence App'
    }
  };

  function removeFramerBadges() {
    try {
      const selectors = [
        '#__framer-badge-container',
        '.framer-v5c18z',
        '[data-framer-name="Get Template Button"]',
        '[data-framer-badge]'
      ];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          el.remove();
        });
      });
    } catch (e) {}
  }

  function updateHeroAndNav(root) {
    if (!root) return;

    // 1. Top Navbar: ensure Logo is "AI Engineer"
    const logos = root.querySelectorAll ? root.querySelectorAll('[data-framer-name="Logo"] p') : [];
    logos.forEach(p => {
      if (p.textContent !== NAV_TITLE) {
        p.textContent = NAV_TITLE;
      }
    });

    // 2. Hero kinetic title & Mouse Leave titles (directly above About & Portfolio): ensure "Priyanshu Shukla"
    const heroTitles = root.querySelectorAll ? root.querySelectorAll(
      '[data-framer-name="Name"] h1, [data-framer-name="Name (Mouse Leave)"] h1, .framer-ttdtt7 h1, .framer-1z0v65l h1'
    ) : [];
    heroTitles.forEach(h1 => {
      const text = h1.textContent.trim();
      if (text.includes('Soren') || text.includes('Weil')) {
        h1.textContent = HERO_NAME;
      }
    });
  }

  const RESUME_BIO = "I'm Priyanshu Shukla (known online as Blackhatfx / black.hat.fx) – an AI Engineer, Full Stack Developer, and B.Tech CSE student at Invertis University, Bareilly, originally from Pilibhit, Uttar Pradesh. I craft modern AI Websify platforms, intelligent automation, fintech systems, and algorithmic trading bots. With a sharp focus on UI/UX excellence, machine learning, and clean engineering, I build high-performance products that deliver real value.";

  function updateTexts(root) {
    if (!root) return;

    removeFramerBadges();
    updateHeroAndNav(root);

    // Ensure hero About bio container is updated to resume bio
    const bioContainers = root.querySelectorAll ? root.querySelectorAll('.framer-12v651i-container, .framer-13x5u62') : [];
    bioContainers.forEach(container => {
      if (container.textContent && (container.textContent.includes('intersection of clarity and craft') || container.textContent.includes('designer who believes'))) {
        const p = container.querySelector('p');
        if (p) {
          p.textContent = RESUME_BIO;
        } else {
          container.textContent = RESUME_BIO;
        }
      }
    });

    // Walk text nodes
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      let val = node.nodeValue;
      if (!val) continue;

      if (val.includes('Soren Weil')) {
        node.nodeValue = val.replace(/Soren Weil/g, HERO_NAME);
      } else if (val.includes('Soren') && !val.includes('Priyanshu')) {
        node.nodeValue = val.replace(/Soren/g, FIRST_NAME);
      }

      if (val.includes('hello@soren.com')) {
        node.nodeValue = val.replace(/hello@soren\.com/g, EMAIL);
      }

      if (val.includes('115 123-4567')) {
        node.nodeValue = val.replace(/\(\+20\)\s*115\s*123-4567/g, PHONE);
      }

      if (val.includes('Fenwick Studio')) {
        node.nodeValue = val.replace(/Fenwick Studio/g, 'Apex Quant Labs');
      }
      if (val.includes('Marcus Holm')) {
        node.nodeValue = val.replace(/Marcus Holm/g, 'Vikram Malhotra');
      }
      if (val.includes('Dayloom')) {
        node.nodeValue = val.replace(/Dayloom/g, 'Synthetix AI');
      }
      if (val.includes('Layla Thornton')) {
        node.nodeValue = val.replace(/Layla Thornton/g, 'Ananya Roy');
      }
    }

    // Update document title if needed
    if (document.title && (document.title.includes('Soren Weil') || document.title.includes('Vexoo'))) {
      document.title = `${HERO_NAME} – ${NAV_TITLE}`;
    }

    // Update mailto, tel, resume, linkedin, github, and portfolio links
    const links = (root.querySelectorAll ? root.querySelectorAll('a') : []);
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;

      if (href.includes('mailto:hello@soren.com')) {
        a.setAttribute('href', `mailto:${EMAIL}`);
      }
      if (href.includes('tel:')) {
        a.setAttribute('href', `tel:+919068839558`);
      }
      if (href.includes('drive.google.com') || a.textContent.includes('Resume')) {
        a.setAttribute('href', RESUME_URL);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
      if (href.includes('linkedin.com')) {
        a.setAttribute('href', LINKEDIN_URL);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
      if (href.includes('x.com') || href.includes('github.com')) {
        a.setAttribute('href', GITHUB_URL);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        const textNode = a.querySelector('p');
        if (textNode && (textNode.textContent.includes('priyanshu') || textNode.textContent.includes('@'))) {
          textNode.textContent = '@Blackhatfx-90';
        }
      }

      // Check project links and update preview images
      for (const [slug, proj] of Object.entries(PROJECT_MAP)) {
        if (href.includes(slug) || (proj.url && href === proj.url)) {
          a.setAttribute('href', proj.url);
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');

          if (proj.image) {
            const cardImgs = a.querySelectorAll('img');
            cardImgs.forEach(img => {
              if (img.getAttribute('src') !== proj.image) {
                img.setAttribute('src', proj.image);
                img.setAttribute('srcset', proj.image);
                img.style.objectPosition = 'top';
                img.style.objectFit = 'cover';
              }
            });
          }
        }
      }
    });
  }

  // Intercept click on portfolio project cards to open live site
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    if (href.includes('drive.google.com') || (anchor.textContent && anchor.textContent.trim().endsWith('Resume'))) {
      e.preventDefault();
      e.stopPropagation();
      window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    if (href.includes('linkedin.com')) {
      e.preventDefault();
      e.stopPropagation();
      window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    if (href.includes('github.com') || href === 'https://x.com' || href === 'https://x.com/') {
      e.preventDefault();
      e.stopPropagation();
      window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    for (const [slug, proj] of Object.entries(PROJECT_MAP)) {
      if (href.includes(slug) || href === proj.url) {
        e.preventDefault();
        e.stopPropagation();
        window.open(proj.url, '_blank', 'noopener,noreferrer');
        return;
      }
    }
  }, true);

  function ensureWhatsAppButton() {
    if (document.getElementById('floating-whatsapp-talk-now')) return;

    const btn = document.createElement('a');
    btn.id = 'floating-whatsapp-talk-now';
    btn.className = 'floating-whatsapp-btn';
    btn.href = WHATSAPP_URL;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Talk Now on WhatsApp');
    btn.innerHTML = `
      <span class="whatsapp-icon-wrap">
        <svg viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.055-1.002-.055-.572-.172-1.309-.499-2.222-1.396-.913-.896-1.554-1.924-1.745-2.253-.191-.328-.02-.505.124-.649.129-.129.288-.335.433-.502.144-.168.192-.284.288-.476.096-.192.048-.362-.024-.506-.072-.144-.649-1.564-.889-2.141-.234-.562-.472-.486-.649-.495-.168-.008-.361-.01-.553-.01-.192 0-.505.072-.769.36-.264.288-1.009.986-1.009 2.404 0 1.418 1.033 2.788 1.177 2.98.144.192 2.037 3.111 4.935 4.362.689.298 1.227.476 1.646.609.692.22 1.322.189 1.819.115.554-.083 1.706-.697 1.947-1.37.24-.673.24-1.25.168-1.37-.072-.12-.264-.192-.408-.264z"/>
        </svg>
      </span>
      <span class="status-ping">
        <span class="ping-circle"></span>
        <span class="ping-dot"></span>
      </span>
      <span>Talk Now</span>
    `;

    document.body.appendChild(btn);
  }

  // ==========================================
  // CONTACT FORM HANDLER (Web3Forms / Email to godfathersid3@gmail.com)
  // ==========================================
  const CONTACT_CONFIG = {
    web3forms_key: '813253a6-4e12-40d1-ae4c-17c97a4204d3',
    formspree_url: '',
    recipient_email: EMAIL,
    whatsapp_phone: '919068839558'
  };

  function injectContactFormStyles() {
    if (document.getElementById('contact-form-styles')) return;
    const style = document.createElement('style');
    style.id = 'contact-form-styles';
    style.textContent = `
      @keyframes customBtnSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .form-spin-indicator {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.25);
        border-top-color: #ccf500;
        border-radius: 50%;
        animation: customBtnSpin 0.75s linear infinite;
        vertical-align: middle;
        margin-right: 8px;
      }
      #contact-status-card {
        margin: 18px 0;
        padding: 16px 20px;
        border-radius: 12px;
        font-family: 'Open Sauce Sans', Inter, -apple-system, sans-serif;
        font-size: 13px;
        line-height: 1.5;
        transition: all 0.3s ease;
      }
      #contact-status-card.status-success {
        background: rgba(204, 245, 0, 0.08);
        border: 1px solid rgba(204, 245, 0, 0.35);
        color: #ffffff;
      }
      #contact-status-card.status-error {
        background: rgba(255, 75, 75, 0.08);
        border: 1px solid rgba(255, 75, 75, 0.35);
        color: #ffffff;
      }
      #contact-status-card.status-info {
        background: rgba(0, 153, 255, 0.08);
        border: 1px solid rgba(0, 153, 255, 0.35);
        color: #ffffff;
      }
    `;
    document.head.appendChild(style);
  }

  function showContactStatus(form, messageHtml, type) {
    let card = document.getElementById('contact-status-card');
    if (!card) {
      card = document.createElement('div');
      card.id = 'contact-status-card';
      const availabilityEl = form.querySelector('[data-framer-name="Availability"]') || form.querySelector('button[type="submit"]')?.closest('.ssr-variant');
      if (availabilityEl && availabilityEl.parentNode) {
        availabilityEl.parentNode.insertBefore(card, availabilityEl.nextSibling);
      } else {
        form.appendChild(card);
      }
    }
    card.className = `status-${type}`;
    card.innerHTML = messageHtml;
    try {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {}
  }

  async function handleContactSubmit(form) {
    if (!form || form.__isSubmitting) return;

    injectContactFormStyles();

    const nameInput = form.querySelector('input[name="Name"]');
    const emailInput = form.querySelector('input[name="Email"]');
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const details = form.querySelector('textarea[name="Details"]')?.value?.trim() || '';
    const honeypot = form.querySelector('input[name="website"]')?.value || '';

    // Validation
    if (!name) {
      showContactStatus(form, '<strong style="color:#ff6b6b;">⚠️ Please enter your Full Name.</strong>', 'error');
      nameInput && nameInput.focus();
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showContactStatus(form, '<strong style="color:#ff6b6b;">⚠️ Please enter a valid Email address.</strong>', 'error');
      emailInput && emailInput.focus();
      return;
    }

    // Bot protection
    if (honeypot) {
      showContactStatus(form, '<strong style="color:#ccf500;">✓ Inquiry received! Thank you.</strong>', 'success');
      form.reset();
      return;
    }

    // Collect Project Type checkboxes
    const projectTypes = [];
    form.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      const label = cb.closest('label')?.querySelector('p')?.textContent?.trim() || cb.name;
      if (label && !projectTypes.includes(label)) projectTypes.push(label);
    });

    // Collect Project Budget radio
    const checkedRadio = form.querySelector('input[name="Radio"]:checked');
    const budget = checkedRadio ? (checkedRadio.closest('label')?.querySelector('p')?.textContent?.trim() || checkedRadio.value) : 'Not specified';

    // Submit buttons & loading state
    const submitButtons = form.querySelectorAll('button[type="submit"]');
    const originalBtnStates = [];
    submitButtons.forEach(btn => {
      originalBtnStates.push({
        btn,
        html: btn.innerHTML,
        disabled: btn.disabled
      });
      btn.disabled = true;
      btn.style.opacity = '0.75';
      btn.style.pointerEvents = 'none';
      const p = btn.querySelector('p');
      if (p) {
        p.innerHTML = '<span class="form-spin-indicator"></span>Sending...';
      }
    });

    const resetButtons = () => {
      originalBtnStates.forEach(item => {
        item.btn.disabled = item.disabled;
        item.btn.style.opacity = '1';
        item.btn.style.pointerEvents = 'auto';
        item.btn.innerHTML = item.html;
      });
    };

    const waText = encodeURIComponent(
      `*New Project Inquiry (aiwebify.site)*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `🎯 *Project Type:* ${projectTypes.join(', ') || 'Not specified'}\n` +
      `💰 *Budget:* ${budget}\n` +
      `📝 *Details:* ${details || 'None'}`
    );
    const waUrl = `https://wa.me/${CONTACT_CONFIG.whatsapp_phone}?text=${waText}`;

    // Read access key
    const hiddenKey = form.querySelector('input[name="access_key"]')?.value;
    const activeKey = (hiddenKey && hiddenKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') ? hiddenKey : CONTACT_CONFIG.web3forms_key;
    const isKeyConfigured = activeKey && activeKey !== 'YOUR_WEB3FORMS_ACCESS_KEY';
    const isFormspree = !!CONTACT_CONFIG.formspree_url;

    if (!isKeyConfigured && !isFormspree) {
      resetButtons();
      showContactStatus(form, `
        <div style="margin-bottom:8px;">
          <strong style="color:#ccf500;font-size:14px;">Setup Required to Receive Direct Emails:</strong>
        </div>
        <p style="margin:0 0 10px 0;color:rgba(255,255,255,0.85);font-size:13px;line-height:1.5;">
          To receive inquiries directly at <strong>${CONTACT_CONFIG.recipient_email}</strong>, visit <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" style="color:#ccf500;text-decoration:underline;font-weight:600;">web3forms.com</a>, enter <code>${CONTACT_CONFIG.recipient_email}</code> to get your free access key, and paste it into <code>js/site_custom.js</code>.
        </p>
        <div style="padding-top:10px;border-top:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <span style="color:rgba(255,255,255,0.6);font-size:12px;">Instant Delivery Option:</span>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="background:#25D366;color:#000000;font-weight:700;font-size:12px;padding:8px 16px;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
            💬 Send Inquiry to Priyanshu on WhatsApp &rarr;
          </a>
        </div>
      `, 'info');
      return;
    }

    form.__isSubmitting = true;

    try {
      const targetUrl = isFormspree ? CONTACT_CONFIG.formspree_url : 'https://api.web3forms.com/submit';
      const payload = isFormspree ? {
        name,
        email,
        _replyto: email,
        message: details,
        project_types: projectTypes.join(', '),
        budget
      } : {
        access_key: activeKey,
        subject: `🚀 New Project Inquiry from ${name} (${budget}) - aiwebify.site`,
        from_name: `${name} (aiwebify.site)`,
        name: name,
        email: email,
        "Full Name": name,
        "Client Email": email,
        "What's Your Project About?": projectTypes.join(', ') || 'Not specified',
        "Project Budget": budget,
        "Share More Details": details || 'No additional details provided'
      };

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      resetButtons();

      if (res.ok && (data.success || data.ok)) {
        form.reset();
        showContactStatus(form, `
          <div style="margin-bottom:6px;">
            <strong style="color:#ccf500;font-size:15px;">✓ Inquiry Sent Successfully!</strong>
          </div>
          <p style="margin:0 0 10px 0;color:rgba(255,255,255,0.85);font-size:13px;line-height:1.5;">
            Thank you, <strong>${name}</strong>. Your project inquiry has been emailed directly to <strong>${CONTACT_CONFIG.recipient_email}</strong>. Priyanshu will get back to you shortly at <strong>${email}</strong>.
          </p>
          <div style="padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <span style="color:rgba(255,255,255,0.5);font-size:12px;">Need an instant response?</span>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="background:#25D366;color:#000000;font-weight:700;font-size:12px;padding:6px 14px;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
              💬 Ping on WhatsApp &rarr;
            </a>
          </div>
        `, 'success');
      } else {
        showContactStatus(form, `
          <strong style="color:#ff6b6b;">⚠️ Submission error:</strong> ${data.message || 'Unable to deliver inquiry via email right now.'}
          <div style="margin-top:10px;">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="background:#25D366;color:#000000;font-weight:700;font-size:12px;padding:6px 14px;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
              💬 Send this inquiry via WhatsApp instead &rarr;
            </a>
          </div>
        `, 'error');
      }
    } catch (err) {
      resetButtons();
      showContactStatus(form, `
        <strong style="color:#ff6b6b;">⚠️ Network error:</strong> Could not connect to mail service.
        <div style="margin-top:10px;">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="background:#25D366;color:#000000;font-weight:700;font-size:12px;padding:6px 14px;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
            💬 Send this inquiry via WhatsApp &rarr;
          </a>
        </div>
      `, 'error');
    } finally {
      form.__isSubmitting = false;
    }
  }

  // Intercept submit event synchronously with capture phase
  document.addEventListener('submit', function (e) {
    const form = e.target.closest ? (e.target.closest('form') || (e.target.tagName === 'FORM' ? e.target : null)) : e.target;
    if (!form || !form.querySelector('input[name="Name"]')) return;

    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();

    handleContactSubmit(form);
  }, true);

  // Also intercept submit button clicks synchronously to stop native navigation before it starts
  document.addEventListener('click', function (e) {
    const btn = e.target.closest ? e.target.closest('button[type="submit"]') : null;
    if (!btn) return;
    const form = btn.closest('form') || document.getElementById('portfolio-contact-form');
    if (!form || !form.querySelector('input[name="Name"]')) return;

    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();

    handleContactSubmit(form);
  }, true);

  // Run on start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      removeFramerBadges();
      updateTexts(document.body);
      ensureWhatsAppButton();
    });
  } else {
    removeFramerBadges();
    updateTexts(document.body);
    ensureWhatsAppButton();
  }

  // Observe ongoing DOM changes / React hydration
  const observer = new MutationObserver(mutations => {
    removeFramerBadges();
    for (const m of mutations) {
      if (m.type === 'characterData') {
        updateTexts(m.target.parentNode);
      } else if (m.type === 'childList') {
        m.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            updateTexts(node);
          } else if (node.nodeType === Node.TEXT_NODE) {
            updateTexts(node.parentNode);
          }
        });
      }
    }
    ensureWhatsAppButton();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // Re-check periodically during first 8 seconds to catch any delayed Framer rendering / mouse leave
  let count = 0;
  const interval = setInterval(() => {
    removeFramerBadges();
    updateTexts(document.body);
    ensureWhatsAppButton();
    count++;
    if (count > 30) clearInterval(interval);
  }, 200);
})();
