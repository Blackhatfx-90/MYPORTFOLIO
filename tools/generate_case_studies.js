const fs = require('fs');
const path = require('path');

const projects = [
  {
    slug: 'travel-easy',
    title: 'Travel Easy',
    category: 'App Design',
    year: '2021',
    client: 'Wardou',
    role: 'Product Designer',
    lead: 'Traditional travel websites focused on mainstream attractions, ignoring niche communities and hidden gems. Travel Easy recognized the demand for storytelling-driven content that highlighted diverse voices, local traditions, and off-the-beaten-path recommendations, catering to curious travelers who wanted deeper connections with their destinations.',
    challenge: 'Travelers often relied on generic, impersonal guides that lacked local insights, leaving them disconnected from authentic cultural experiences. The market needed a platform that could bridge the gap between tourists and the true essence of destinations, offering more than just sightseeing checklists.',
    objective: 'The goal was to build a digital hub combining journalism, user-generated content, and expert curation to deliver immersive travel experiences. By prioritizing cultural narratives over commercial tourism, the platform aimed to inspire and educate travelers while supporting local creators.',
    results: 'Travel Easy became a trusted resource, amassing millions of readers and later expanding into bookable experiences. Its unique approach attracted partnerships with local writers and filmmakers, setting it apart from conventional travel agencies and establishing a loyal, culturally engaged audience.',
    heroImage: '../assets/images/JAuzg1K8J6MK83hAIIrvRYRaf8.webp',
    gallery: [
      '../assets/images/xGRYycdwlW5h939lgDKhSUWvQ.webp',
      '../assets/images/kjvpqYpzKvdJSXtFreVieyc1I.webp',
      '../assets/images/OiycQfUThB8UTI5Bef2fzpB4.webp',
      '../assets/images/S1qtYIs0dQ6Khor8ygFagQ7nQ.webp',
      '../assets/images/2fVg7UegdrwQrbFJWOgW8o3Flk.webp',
      '../assets/images/L0xOTBZtwmOQzTW3sRX9u5MxQio.webp'
    ],
    prev: null,
    next: { slug: 'gamma', title: 'Gamma' }
  },
  {
    slug: 'gamma',
    title: 'Gamma',
    category: 'UX/UI Design',
    year: '2022',
    client: 'David B.',
    role: 'UX Designer',
    lead: 'Gamma is an AI-powered platform that helps users create professional presentations, documents, and web pages effortlessly. As the product designer leading the website redesign, my goal was to enhance usability, improve conversion rates, and better communicate Gamma’s unique value proposition.',
    challenge: 'The project faced multiple hurdles that impacted user engagement and conversions. First, the website had a high bounce rate, with many visitors leaving without exploring key features or signing up. Second, the messaging failed to immediately convey Gamma’s AI-powered advantages, leaving users unsure of its benefits.',
    objective: 'The primary objective was to create a website that clearly communicated Gamma’s value, improved user engagement, and increased conversions.',
    results: 'The redesign delivered strong outcomes, validating the strategic improvements. Sign-up conversions increased by 30%, thanks to clearer value propositions and strategically placed CTAs. The bounce rate dropped by 25% as users engaged more with interactive demos and streamlined content.',
    heroImage: '../assets/images/93E7FcdSSqHVNH5lLB9gLOZd20.webp',
    gallery: [
      '../assets/images/vgSaCQh5i7EIFr9BVRj7b0kg8sE.webp',
      '../assets/images/mGMSmPqJpTuar8BTXn82QMMUw.webp',
      '../assets/images/og2Bzo2xKUwTONLdhlBTPTAE.webp',
      '../assets/images/K7TOK58lFcmt2ledRk8p19BHzfw.webp',
      '../assets/images/5LN2CWGN6A2IPBSwvfzQIohR8c.webp',
      '../assets/images/2hnYIN8k3MxIgmayYcdBjCPmneU.webp'
    ],
    prev: { slug: 'travel-easy', title: 'Travel Easy' },
    next: { slug: 'stream-ai', title: 'Stream AI' }
  },
  {
    slug: 'stream-ai',
    title: 'Stream AI',
    category: 'Product Design',
    year: '2023',
    client: 'Robert L.',
    role: 'UI Designer',
    lead: 'Before Stream AI, post-production workflows were fragmented, with no centralized platform for real-time collaboration. Editors, directors, and clients struggled to sync feedback, leading to costly revisions and project bottlenecks, especially in high-stakes industries like film and advertising.',
    challenge: 'Video production teams faced inefficiencies in feedback loops, relying on emails, scattered notes, and multiple file versions. This disjointed process caused delays, miscommunication, and version control issues, particularly for remote collaborators working on tight deadlines.',
    objective: 'Stream AI set out to revolutionize video collaboration by creating a unified workspace where teams could review, annotate, and approve footage in real time. The platform aimed to streamline communication, reduce errors, and accelerate project timelines with seamless integrations into popular editing software.',
    results: 'Adopted by major studios in the whole industry, Stream AI became an industry standard, cutting review cycles by up to 50%. Its intuitive interface and robust features transformed remote collaboration, making it indispensable for creatives worldwide.',
    heroImage: '../assets/images/eO0GqBm897hz4DedM2o4BNk0Og.webp',
    gallery: [
      '../assets/images/Te79dkTp7HS0DCLKtZZdepOmvM.webp',
      '../assets/images/XP7iyAUM2vqIcPQgfEVeNeuNw.webp',
      '../assets/images/ixjAuPBAjfElxZd8FzDcvSK5MO8.webp',
      '../assets/images/yZS6ReNgqnNH5l36cD8mt2oEeY.webp',
      '../assets/images/gp3EWvQV9htZLs9WqlUe3VsTKlQ.webp',
      '../assets/images/QDKhGivuHXLTwJ5gTfoU3lhJaA.webp'
    ],
    prev: { slug: 'gamma', title: 'Gamma' },
    next: { slug: 'foome', title: 'Foome' }
  },
  {
    slug: 'foome',
    title: 'Foome',
    category: 'Web Design',
    year: '2024',
    client: 'Carles P.',
    role: 'Product Designer',
    lead: 'Recipe platforms were often static, requiring users to juggle multiple tabs or scroll endlessly. Foome recognized the need for a hands-free, guided cooking experience that adapted to different skill levels and kitchen setups.',
    challenge: 'Many home cooks abandoned recipes mid-preparation due to unclear instructions, lack of timing guidance, or overwhelming ingredient lists. Existing apps failed to provide real-time, interactive support, leading to frustration and wasted meals.',
    objective: 'The app was designed to offer step-by-step voice commands, built-in timers, and adjustable portion sizes. By integrating smart kitchen tech, Foome aimed to reduce user errors and boost confidence in amateur chefs.',
    results: 'With over 1 million monthly recipe completions, Foome improved cooking success rates and user retention. Its interactive approach made meal prep more approachable, earning features in top culinary publications.',
    heroImage: '../assets/images/suNAtAxC3jc1slGxH2TAGQ4rtp0.webp',
    gallery: [
      '../assets/images/P1sQTtvTLxL0DzyVFNgK5MNTIvg.webp',
      '../assets/images/5dyvJtvS8xzvryK7VT2ZAHHq6Y.webp',
      '../assets/images/lRnkfOVczkAMOiaAs6VyYzA2xbQ.webp',
      '../assets/images/R8n5nYWo6EsXMhDfdmiVFPZ9Rc.webp',
      '../assets/images/qjLV5NRoQUJhXuXvAI5PAMWJ0.webp',
      '../assets/images/EtqudsophlBRIABEi4CxMsa4.webp'
    ],
    prev: { slug: 'stream-ai', title: 'Stream AI' },
    next: { slug: 'edbost', title: 'Edbost' }
  },
  {
    slug: 'edbost',
    title: 'Edbost',
    category: 'Visual Design',
    year: '2025',
    client: 'Alex T.',
    role: 'UX Designer',
    lead: 'High-end VFX and editing tools required steep learning curves and costly subscriptions, putting them out of reach for small studios and solo creators. Edbost identified the need for democratized AI-powered creative tools that simplified advanced workflows.',
    challenge: 'Independent filmmakers and digital artists lacked access to affordable, user-friendly AI tools, forcing them to rely on expensive, complex software or outsource effects work—limiting creative control and scalability.',
    objective: 'The mission was to build an accessible, cloud-based platform offering AI-driven video editing, green screen removal, and text-to-video generation. By integrating machine learning into an intuitive interface, Edbost aimed to empower creators without technical expertise.',
    results: 'Edbost became a game-changer for indie artists, enabling professional-grade results at a fraction of the cost. Its tools have been used in award-winning projects, proving that AI could level the playing field in creative industries.',
    heroImage: '../assets/images/WWkZxpeT2EaVFcbABkjOiVgjd9U.webp',
    gallery: [
      '../assets/images/XlUcranWAKacMI37gtUV2YQNQ.webp',
      '../assets/images/bJ5YWD45IIgDmwA6qioKsFI36Y.webp',
      '../assets/images/IqAh9MqffVn0kQaEPuaNUlbihvw.webp',
      '../assets/images/jdrPw7GoxXN8o9QCUhoNLV7jo.webp',
      '../assets/images/HFVbeUSPceWVJlqRulppu1gung.webp',
      '../assets/images/crPRqo2r4AvfXfdM7VKcrHk.webp'
    ],
    prev: { slug: 'foome', title: 'Foome' },
    next: null
  }
];

const outDir = path.join(__dirname, 'portfolio');
fs.mkdirSync(outDir, { recursive: true });

for (const p of projects) {
  const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title} – Case Study</title>
  <meta name="description" content="${p.title} - ${p.category} case study by Soren Weil.">
  
  <link rel="icon" href="../assets/images/H53zwtvCVdtLq91Rj8fb9VaNv5A.png" media="(prefers-color-scheme: light)">
  <link rel="icon" href="../assets/images/0Jx5IAKnaB5WDUmqxmJCAy7bDg.png" media="(prefers-color-scheme: dark)">

  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div class="page-wrapper">
    
    <!-- Site Header -->
    <header class="site-header">
      <div class="brand-wrapper">
        <a href="../portfolio.html" class="nav-back-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Portfolio</span>
        </a>
      </div>

      <div class="nav-status">
        <span>AI Design Engineer</span>
      </div>

      <div class="nav-actions">
        <div class="live-time-wrapper">
          <span class="status-dot" aria-hidden="true"></span>
          <span id="live-clock">Cairo • 12:50 PM</span>
        </div>
        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle theme">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Case Study Hero -->
    <article class="case-study-hero">
      <span class="case-category-badge">${p.category}</span>
      <h1 class="case-title">${p.title}</h1>
      <p class="case-lead">${p.lead}</p>

      <!-- Metadata Bar -->
      <div class="case-metadata-grid">
        <div class="meta-item">
          <div class="meta-item-label">Client</div>
          <div class="meta-item-value">${p.client}</div>
        </div>
        <div class="meta-item">
          <div class="meta-item-label">Role</div>
          <div class="meta-item-value">${p.role}</div>
        </div>
        <div class="meta-item">
          <div class="meta-item-label">Year</div>
          <div class="meta-item-value">${p.year}</div>
        </div>
      </div>

      <!-- Hero Banner Image -->
      <div class="case-hero-banner">
        <img src="${p.heroImage}" alt="${p.title} Main Visual" loading="eager">
      </div>

      <!-- Case Study Story -->
      <section class="case-story-section">
        <div>
          <h2 class="story-heading">Explore the full story –</h2>
        </div>
        <div class="story-content">
          <div class="story-block">
            <h4>Challenge</h4>
            <p>${p.challenge}</p>
          </div>
          <div class="story-block">
            <h4>Objective</h4>
            <p>${p.objective}</p>
          </div>
          <div class="story-block">
            <h4>Results</h4>
            <p>${p.results}</p>
          </div>
        </div>
      </section>

      <!-- Showcase Image Gallery -->
      <section class="case-gallery-grid">
        ${p.gallery.map((img, i) => `
        <div class="gallery-item ${i === 0 || i === 3 ? 'full-width' : ''}">
          <img src="${img}" alt="${p.title} Detail ${i + 1}" loading="lazy">
        </div>`).join('')}
      </section>

      <!-- Prev / Next Navigation -->
      <nav class="project-pagination" aria-label="Projects pagination">
        ${p.prev ? `
        <a href="${p.prev.slug}.html" class="pagination-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>Prev: ${p.prev.title}</span>
        </a>` : '<div></div>'}

        ${p.next ? `
        <a href="${p.next.slug}.html" class="pagination-btn">
          <span>Next: ${p.next.title}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>` : '<div></div>'}
      </nav>

    </article>

    <!-- Site Footer -->
    <footer class="site-footer">
      <div class="social-links">
        <a href="mailto:hello@soren.com" class="social-link">Email</a>
        <a href="tel:+201151234567" class="social-link">Phone</a>
        <a href="https://x.com/soren.weil" target="_blank" rel="noopener noreferrer" class="social-link">X (Twitter)</a>
        <a href="https://instagram.com/its-soren" target="_blank" rel="noopener noreferrer" class="social-link">Instagram</a>
        <a href="https://linkedin.com/in/weil.soren" target="_blank" rel="noopener noreferrer" class="social-link">LinkedIn</a>
      </div>
      <div class="footer-copy">
        <p>&copy; 2026 Soren Weil. All rights reserved.</p>
      </div>
    </footer>

  </div>

  <script src="../js/main.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${p.slug}.html`), html);
}

console.log('Successfully generated all 5 case studies!');
