const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const FILES = [
  'index.html',
  'about.html',
  'portfolio.html',
  'contact.html',
  '404.html',
  'portfolio/travel-easy.html',
  'portfolio/gamma.html',
  'portfolio/stream-ai.html',
  'portfolio/foome.html',
  'portfolio/edbost.html'
];

for (const relFile of FILES) {
  const filePath = path.join(rootDir, relFile);
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove the Framer "Get this template" button
  html = html.replace(/<a class="framer-v5c18z[^"]*"[^>]*>[\s\S]*?Get this template[\s\S]*?<\/a><!--\/\$-->/g, '');
  html = html.replace(/<a class="framer-v5c18z[^"]*"[^>]*>[\s\S]*?Get this template[\s\S]*?<\/a>/g, '');

  // 2. Change script URLs to local assets/scripts/
  const isSubdir = relFile.startsWith('portfolio/');
  const scriptPrefix = isSubdir ? '../assets/scripts/' : 'assets/scripts/';
  html = html.replace(/https:\/\/framerusercontent\.com\/sites\/48EiW83Fk1ILEWzxTLUdop\//g, scriptPrefix);

  // 3. Update navbar Logo text to "AI Engineer"
  // Look for the Logo container text
  html = html.replace(/(<div class="framer-snsv5m" data-framer-name="Logo">[\s\S]*?<p[^>]*>)Priyanshu Shukla(<\/p>)/g, '$1AI Engineer$2');
  html = html.replace(/(<div class="framer-snsv5m" data-framer-name="Logo">[\s\S]*?<p[^>]*>)Soren Weil(<\/p>)/g, '$1AI Engineer$2');

  // 4. In index.html, ensure Hero Title is Priyanshu Shukla
  if (relFile === 'index.html') {
    // Ensure the non-kinetic title elements have Priyanshu Shukla
    html = html.replace(/(data-framer-name="Name \(Mouse Leave\)"[^>]*><h1[^>]*>).*?(<\/h1>)/g, '$1Priyanshu Shukla$2');
    html = html.replace(/(data-framer-name="Name"[^>]*><h1[^>]*>).*?(<\/h1>)/g, (match, p1, p2) => {
      if (match.includes('white-space:nowrap')) {
        return match; // keep kinetic letter spans
      }
      return `${p1}Priyanshu Shukla${p2}`;
    });
  }

  // 5. Ensure CSS and JS paths are correct
  const cssHref = isSubdir ? '../css/site_custom.css' : 'css/site_custom.css';
  const jsSrc = isSubdir ? '../js/site_custom.js' : 'js/site_custom.js';

  html = html.replace(/href="\/css\/site_custom\.css"/g, `href="${cssHref}"`);
  html = html.replace(/src="\/js\/site_custom\.js"/g, `src="${jsSrc}"`);

  if (!html.includes('site_custom.css')) {
    html = html.replace('</head>', `  <link rel="stylesheet" href="${cssHref}">\n</head>`);
  }
  if (!html.includes('site_custom.js')) {
    html = html.replace('</body>', `  <script src="${jsSrc}"></script>\n</body>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated -> ${relFile}`);
}

console.log('\nAll HTML files successfully updated!');
