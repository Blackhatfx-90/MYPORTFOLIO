const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Default domain - user's verified custom live domain
const DEFAULT_DOMAIN = 'https://aiwebify.site';

// All pages to index in sitemap
const SITEMAP_PAGES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'about', priority: '0.9', changefreq: 'monthly' },
  { path: 'portfolio', priority: '0.9', changefreq: 'weekly' },
  { path: 'contact', priority: '0.8', changefreq: 'monthly' },
  { path: 'portfolio/travel-easy', priority: '0.7', changefreq: 'monthly' },
  { path: 'portfolio/gamma', priority: '0.7', changefreq: 'monthly' },
  { path: 'portfolio/stream-ai', priority: '0.7', changefreq: 'monthly' },
  { path: 'portfolio/foome', priority: '0.7', changefreq: 'monthly' },
  { path: 'portfolio/edbost', priority: '0.7', changefreq: 'monthly' },
];

const TODAY = new Date().toISOString().split('T')[0];

// 1. Generate sitemap.xml
function generateSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${SITEMAP_PAGES.map(p => `  <url>
    <loc>${DEFAULT_DOMAIN}/${p.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const sitemapPath = path.join(rootDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml.trim() + '\n', 'utf8');
  console.log('Created sitemap.xml successfully');
}

// 2. Generate robots.txt
function generateRobotsTxt() {
  const txt = `# Robots.txt for Priyanshu Shukla (Blackhatfx) Portfolio
User-agent: *
Allow: /
Disallow: /raw_pages/
Disallow: /tools/
Disallow: /framer_offline/

# XML Sitemap
Sitemap: ${DEFAULT_DOMAIN}/sitemap.xml
`;
  const robotsPath = path.join(rootDir, 'robots.txt');
  fs.writeFileSync(robotsPath, txt.trim() + '\n', 'utf8');
  console.log('Created robots.txt successfully');
}

// 3. Schema.org JSON-LD definitions
const SCHEMA_JSON_LD = `
    <!-- Schema.org JSON-LD Structured Data for Google Knowledge Graph & Ranking -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "${DEFAULT_DOMAIN}/#person",
          "name": "Priyanshu Shukla",
          "alternateName": [
            "Blackhatfx",
            "black.hat.fx",
            "blak hat fx",
            "Priyanshu Hsukla",
            "Priyanshu Shukla Bareilly",
            "Priyanshu Shukla Pilibhit",
            "Priyanshu Invertis",
            "Priyanshu Shukla Invertis"
          ],
          "jobTitle": "AI Engineer & Full Stack Developer",
          "description": "Priyanshu Shukla (Blackhatfx) is an AI Engineer, Full Stack Developer, and B.Tech CSE student at Invertis University Bareilly, originally from Pilibhit, Uttar Pradesh. Creator of AI Websify, Bharat Dev AI, and Veterian FX.",
          "url": "${DEFAULT_DOMAIN}/",
          "image": "${DEFAULT_DOMAIN}/assets/images/user_photo_bw.png",
          "email": "godfathersid3@gmail.com",
          "telephone": "+919068839558",
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Invertis University",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bareilly",
              "addressRegion": "Uttar Pradesh",
              "addressCountry": "India"
            }
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bareilly",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "India"
          },
          "homeLocation": {
            "@type": "Place",
            "name": "Pilibhit, Uttar Pradesh, India",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pilibhit",
              "addressRegion": "Uttar Pradesh",
              "addressCountry": "India"
            }
          },
          "sameAs": [
            "https://github.com/Blackhatfx-90",
            "https://www.linkedin.com/in/priyanshu-shukla-35630b332",
            "https://wa.me/919068839558"
          ],
          "knowsAbout": [
            "Artificial Intelligence",
            "AI Engineering",
            "Websify",
            "AI Websify",
            "Full Stack Development",
            "Invertis University B.Tech CSE",
            "Bareilly Technology",
            "Pilibhit Technology",
            "Algorithmic Trading",
            "Pine Script & EA Bots",
            "React & Next.js",
            "Python & Machine Learning"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "${DEFAULT_DOMAIN}/#website",
          "url": "${DEFAULT_DOMAIN}/",
          "name": "Priyanshu Shukla Portfolio | Blackhatfx",
          "alternateName": [
            "Priyanshu Shukla Bareilly Portfolio",
            "Priyanshu Shukla Pilibhit",
            "Priyanshu Invertis Portfolio",
            "Blackhatfx Official Portfolio",
            "AI Websify Portfolio Priyanshu"
          ],
          "description": "Official Portfolio of Priyanshu Shukla (Blackhatfx) - AI Engineer, Full Stack Developer, Invertis University Bareilly & Pilibhit.",
          "publisher": {
            "@id": "${DEFAULT_DOMAIN}/#person"
          },
          "inLanguage": "en-US"
        }
      ]
    }
    </script>
`;

// Page SEO Metadata Dictionary
const PAGE_SEO = {
  'index.html': {
    title: 'Priyanshu Shukla | AI Engineer & Full Stack Developer Portfolio | Bareilly & Pilibhit - Blackhatfx',
    path: '',
    description: 'Official portfolio of Priyanshu Shukla (Blackhatfx / black.hat.fx). AI Engineer, Full Stack Developer, and B.Tech CSE student at Invertis University Bareilly (originally from Pilibhit, UP). Specializing in AI Websify, machine learning, trading bots, and modern web applications.',
    keywords: 'Priyanshu Shukla, Priyanshu Shukla portfolio, Priyanshu Shukla bareilly, Priyanshu Shukla pilibhit, Priyanshu hsukla pilibhit, black.hat.fx, blackhatfx, blak hat fx, Invertis University Priyanshu Shukla, Invertis BTech Priyanshu, AI Websify portfolio Priyanshu, Priyanshu Shukla AI Engineer, AI Engineer Bareilly, Invertis University BTech CSE, Veterian FX, Bharat Dev AI, Premium Verse, Med Mart, RaaMed, Vridhi AI, Full Stack Developer UP'
  },
  'about.html': {
    title: 'About Priyanshu Shukla (Blackhatfx) | AI Engineer, Invertis BTech CSE | Bareilly & Pilibhit',
    path: 'about',
    description: 'Discover the journey of Priyanshu Shukla (known online as Blackhatfx / black.hat.fx). AI Engineer & Full Stack Developer from Pilibhit studying B.Tech at Invertis University Bareilly. Building AI Websify, fintech tools, and intelligent software.',
    keywords: 'About Priyanshu Shukla, Priyanshu Shukla Invertis University, Invertis BTech Priyanshu, Priyanshu Shukla Bareilly, Priyanshu Hsukla Pilibhit, Blackhatfx, black.hat.fx, blak hat fx, AI Websify portfolio Priyanshu, AI Engineer Bareilly, Full Stack Developer UP'
  },
  'portfolio.html': {
    title: 'Projects & Portfolio | Priyanshu Shukla (Blackhatfx) - AI Websify, Veterian FX, Bharat Dev AI',
    path: 'portfolio',
    description: 'Explore live software and engineering projects by Priyanshu Shukla (Blackhatfx) - including AI Websify, Veterian FX (Fintech Trading Platform), Bharat Dev AI, Premium Verse, Med Mart, and RaaMed. AI Engineer from Invertis University Bareilly.',
    keywords: 'Priyanshu Shukla projects, AI Websify portfolio Priyanshu, Veterian FX, Bharat Dev AI, Premium Verse, Med Mart, RaaMed, Vridhi AI, Invertis BTech Priyanshu, Priyanshu Shukla Bareilly, Blackhatfx portfolio'
  },
  'contact.html': {
    title: 'Contact Priyanshu Shukla | AI Engineer & Developer - Bareilly & Pilibhit | Blackhatfx',
    path: 'contact',
    description: 'Connect with Priyanshu Shukla (Blackhatfx). Available for freelance work, AI engineering contracts, and full stack web development. WhatsApp: +91 9068839558 | Email: godfathersid3@gmail.com | Invertis University Bareilly & Pilibhit.',
    keywords: 'Contact Priyanshu Shukla, Hire AI Engineer Bareilly, Priyanshu Shukla Pilibhit contact, Invertis University Priyanshu Shukla, Blackhatfx contact, WhatsApp Priyanshu Shukla, AI Websify contact'
  },
  '404.html': {
    title: '404 - Page Not Found | Priyanshu Shukla Portfolio',
    path: '404',
    description: 'Page not found - return to Priyanshu Shukla (Blackhatfx) official portfolio.',
    keywords: 'Priyanshu Shukla, Blackhatfx'
  },
  'portfolio/travel-easy.html': {
    title: 'Veterian FX | Fintech Trading Platform by Priyanshu Shukla (Blackhatfx)',
    path: 'portfolio/travel-easy',
    description: 'Veterian FX is an advanced fintech and algorithmic trading platform designed and developed by Priyanshu Shukla (Blackhatfx), B.Tech CSE student at Invertis University Bareilly.',
    keywords: 'Veterian FX, Priyanshu Shukla trading, Blackhatfx, Fintech, Pine Script bot, Algorithmic trading, Invertis University Priyanshu'
  },
  'portfolio/gamma.html': {
    title: 'Bharat Dev AI | AI Development Platform by Priyanshu Shukla (Blackhatfx)',
    path: 'portfolio/gamma',
    description: 'Bharat Dev AI is an AI development ecosystem built by Priyanshu Shukla (Blackhatfx), AI Engineer from Invertis University Bareilly & Pilibhit.',
    keywords: 'Bharat Dev AI, Priyanshu Shukla AI, Blackhatfx AI, AI Websify, Bareilly AI Developer, Invertis University Priyanshu'
  },
  'portfolio/stream-ai.html': {
    title: 'Premium Verse | Web3 & Creative Tech by Priyanshu Shukla (Blackhatfx)',
    path: 'portfolio/stream-ai',
    description: 'Premium Verse case study highlighting creative technology, frontend engineering, and digital art direction by Priyanshu Shukla (Blackhatfx).',
    keywords: 'Premium Verse, Priyanshu Shukla, Blackhatfx, Creative Tech, Web3, Invertis University'
  },
  'portfolio/foome.html': {
    title: 'Med Mart | Healthcare E-Commerce by Priyanshu Shukla (Blackhatfx)',
    path: 'portfolio/foome',
    description: 'Med Mart is an integrated healthcare e-commerce platform designed and built by Priyanshu Shukla (Blackhatfx).',
    keywords: 'Med Mart, Priyanshu Shukla, Blackhatfx, Healthcare web, E-Commerce, Bareilly'
  },
  'portfolio/edbost.html': {
    title: 'RaaMed | Healthcare Tech Platform by Priyanshu Shukla (Blackhatfx)',
    path: 'portfolio/edbost',
    description: 'RaaMed healthcare platform case study by Priyanshu Shukla (Blackhatfx), AI Engineer from Invertis University Bareilly & Pilibhit.',
    keywords: 'RaaMed, Priyanshu Shukla, Blackhatfx, Healthcare Tech, Invertis University'
  }
};

function patchFileSEO(relPath) {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${relPath}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  const seo = PAGE_SEO[relPath];
  if (!seo) return;

  const canonicalUrl = `${DEFAULT_DOMAIN}/${seo.path}`;

  // 1. Replace Title
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${seo.title}</title>`);

  // 2. Replace Canonical Link
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*">/i, `<link rel="canonical" href="${canonicalUrl}">`);

  // 3. Replace og:url
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*">/i, `<meta property="og:url" content="${canonicalUrl}">`);

  // 4. Replace description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*">/i, `<meta name="description" content="${seo.description}">`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*">/i, `<meta property="og:description" content="${seo.description}">`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*">/i, `<meta name="twitter:description" content="${seo.description}">`);

  // 5. Replace og:title & twitter:title
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*">/i, `<meta property="og:title" content="${seo.title}">`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*">/i, `<meta name="twitter:title" content="${seo.title}">`);

  // 6. Replace og:image & twitter:image
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*">/i, `<meta property="og:image" content="${DEFAULT_DOMAIN}/assets/images/user_photo_bw.png">`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*">/i, `<meta name="twitter:image" content="${DEFAULT_DOMAIN}/assets/images/user_photo_bw.png">`);

  // 7. Inject Keywords, Author, Robots, and Schema if not already present
  if (!html.includes('<meta name="keywords"')) {
    const extraMeta = `
    <meta name="keywords" content="${seo.keywords}">
    <meta name="author" content="Priyanshu Shukla (Blackhatfx)">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta property="og:site_name" content="Priyanshu Shukla Portfolio">
    <meta property="og:locale" content="en_US">
    `;
    html = html.replace(/<meta charset="utf-8">/i, `<meta charset="utf-8">${extraMeta}`);
  }

  // 8. Inject Schema JSON-LD if not present
  if (!html.includes('application/ld+json')) {
    html = html.replace(/<\/head>/i, `${SCHEMA_JSON_LD}\n</head>`);
  }

  // 9. Strip any legacy seo-author-badge if present
  html = html.replace(/\s*<!--\s*Semantic SEO Location & Bio Details for Search Engine Crawlers\s*-->\s*<div id="seo-author-badge"[\s\S]*?<\/div>\s*/gi, '\n\n  ');

  // 10. Clean any leftover vexoo or vercel references in the page
  html = html.replace(/https:\/\/vexoo\.framer\.website/g, DEFAULT_DOMAIN);
  html = html.replace(/https:\/\/myportfolio-blackhatfx-90\.vercel\.app/g, DEFAULT_DOMAIN);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated SEO metadata in: ${relPath}`);
}

// Run all updates
generateSitemap();
generateRobotsTxt();

Object.keys(PAGE_SEO).forEach(relFile => {
  patchFileSEO(relFile);
});

console.log('\nAll SEO meta tags, sitemap.xml, and robots.txt successfully generated and patched!');
