const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'about.html', 'portfolio.html', 'contact.html', 'portfolio_travel-easy.html'];

for (const p of pages) {
  const file = path.join(__dirname, 'raw_pages', p);
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');

  console.log(`\n================== ${p} ==================`);
  
  // Extract title
  const title = content.match(/<title>([^<]+)<\/title>/)?.[1] || '';
  console.log('Title:', title);

  // Extract navigation or header texts
  // Let's strip scripts and styles to see readable text
  const clean = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  console.log('Text preview (first 1000 chars):');
  console.log(clean.slice(0, 1000));
}
