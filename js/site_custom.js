/**
 * Custom site runtime enhancements for Priyanshu Shukla's portfolio:
 * - Dynamic text updates (Priyanshu Shukla, email, phone)
 * - Portfolio links mapping to live deployed projects
 * - Floating Talk Now WhatsApp button integration
 */

(function () {
  const NAME = 'Priyanshu Shukla';
  const FIRST_NAME = 'Priyanshu';
  const EMAIL = 'godfathersid3@gmail.com';
  const PHONE = '+91 9068839558';
  const WHATSAPP_URL = 'https://wa.me/919068839558';

  const PROJECT_MAP = {
    'travel-easy': {
      title: 'Veterian FX',
      url: 'https://veterian-fx.vercel.app',
      category: 'Fintech / Trading'
    },
    'gamma': {
      title: 'Bharat Dev AI',
      url: 'https://bharat-dev-ai.vercel.app',
      category: 'AI Platform / Dev'
    },
    'stream-ai': {
      title: 'Premium Verse',
      url: 'https://premium-verse.vercel.app',
      category: 'Web3 & Creative Tech'
    },
    'foome': {
      title: 'Med Mart',
      url: 'https://med-mart.in',
      category: 'E-Commerce / Health'
    },
    'edbost': {
      title: 'RaaMed',
      url: 'https://raamed.online',
      category: 'Healthcare Solutions'
    },
    'vridhi-ai': {
      title: 'Vridhi AI',
      url: 'https://vridhi-ai.onrender.com',
      category: 'AI Intelligence App'
    }
  };

  function updateTexts(root) {
    if (!root) return;

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
        node.nodeValue = val.replace(/Soren Weil/g, NAME);
      } else if (val.includes('Soren') && !val.includes('Priyanshu')) {
        node.nodeValue = val.replace(/Soren/g, FIRST_NAME);
      }

      if (val.includes('hello@soren.com')) {
        node.nodeValue = val.replace(/hello@soren\.com/g, EMAIL);
      }

      if (val.includes('115 123-4567')) {
        node.nodeValue = val.replace(/\(\+20\)\s*115\s*123-4567/g, PHONE);
      }
    }

    // Update document title if needed
    if (document.title && document.title.includes('Soren Weil')) {
      document.title = document.title.replace(/Soren Weil/g, NAME);
    }

    // Update mailto and tel links
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

      // Check project links
      for (const [slug, proj] of Object.entries(PROJECT_MAP)) {
        if (href.includes(slug)) {
          a.setAttribute('href', proj.url);
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        }
      }
    });
  }

  // Intercept click on portfolio project cards to open live site
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
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

  // Run on start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateTexts(document.body);
      ensureWhatsAppButton();
    });
  } else {
    updateTexts(document.body);
    ensureWhatsAppButton();
  }

  // Observe ongoing DOM changes / React hydration
  const observer = new MutationObserver(mutations => {
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

  // Re-check periodically during first 5 seconds to catch any delayed Framer rendering
  let count = 0;
  const interval = setInterval(() => {
    updateTexts(document.body);
    ensureWhatsAppButton();
    count++;
    if (count > 20) clearInterval(interval);
  }, 250);
})();
