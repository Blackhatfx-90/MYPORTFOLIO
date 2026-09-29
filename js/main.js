/* ==========================================================================
   VEXOO PORTFOLIO - MAIN INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initThemeToggle();
  initKineticTypography();
  initProjectFilters();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. LIVE CAIRO / LOCAL CLOCK
   -------------------------------------------------------------------------- */
function initClock() {
  const clockElement = document.getElementById('live-clock');
  if (!clockElement) return;

  function updateTime() {
    try {
      // Cairo Timezone (UTC+2 / UTC+3 depending on DST)
      const options = {
        timeZone: 'Africa/Cairo',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      const cairoTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
      clockElement.textContent = `Cairo • ${cairoTime}`;
    } catch (e) {
      // Fallback
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      clockElement.textContent = `Cairo • ${hours}:${minutes} ${ampm}`;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* --------------------------------------------------------------------------
   2. THEME TOGGLE (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Retrieve saved theme or prefer dark
  const savedTheme = localStorage.getItem('vexoo_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('vexoo_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      // Show Moon icon for light mode
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      `;
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      // Show Sun icon for dark mode
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      `;
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    }
  }
}

/* --------------------------------------------------------------------------
   3. KINETIC TYPOGRAPHY (HOME PAGE)
   -------------------------------------------------------------------------- */
function initKineticTypography() {
  const kineticTitle = document.getElementById('kinetic-title');
  if (!kineticTitle) return;

  const defaultTitle = kineticTitle.getAttribute('data-default') || 'Soren Weil';
  const interactiveCards = document.querySelectorAll('[data-kinetic-label]');

  interactiveCards.forEach(card => {
    const label = card.getAttribute('data-kinetic-label');

    card.addEventListener('mouseenter', () => {
      kineticTitle.style.opacity = '0';
      kineticTitle.style.transform = 'translateY(10px) skewY(-2deg)';
      setTimeout(() => {
        kineticTitle.textContent = label;
        kineticTitle.style.opacity = '1';
        kineticTitle.style.transform = 'translateY(0) skewY(-2deg)';
      }, 120);
    });

    card.addEventListener('mouseleave', () => {
      kineticTitle.style.opacity = '0';
      kineticTitle.style.transform = 'translateY(-10px) skewY(-2deg)';
      setTimeout(() => {
        kineticTitle.textContent = defaultTitle;
        kineticTitle.style.opacity = '1';
        kineticTitle.style.transform = 'translateY(0) skewY(-2deg)';
      }, 120);
    });
  });
}

/* --------------------------------------------------------------------------
   4. PORTFOLIO CATEGORY FILTER TABS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM INTERACTION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (!contactForm || !statusMsg) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    // Simulate submission
    setTimeout(() => {
      submitBtn.textContent = 'Sent Successfully!';
      statusMsg.className = 'form-status success';
      statusMsg.textContent = 'Thank you! Your message has been sent. I will get back to you shortly.';
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 1000);
  });
}
