const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const files = [
  'index.html', 'about.html', 'portfolio.html', 'contact.html', '404.html',
  'portfolio/travel-easy.html', 'portfolio/gamma.html', 'portfolio/stream-ai.html',
  'portfolio/foome.html', 'portfolio/edbost.html'
];

for (const file of files) {
  const p = path.join(rootDir, file);
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');

  // 1. Remove Get Template Button (matches href="https://framer.link/8yundsi")
  c = c.replace(/<!--\$--><a [^>]*href="https:\/\/framer\.link\/8yundsi"[^>]*>[\s\S]*?<\/a><!--\/\$-->/g, '');
  c = c.replace(/<a [^>]*href="https:\/\/framer\.link\/8yundsi"[^>]*>[\s\S]*?<\/a>/g, '');

  // 2. In all pages, update navbar Logo text to "AI Engineer"
  // The logo text is inside data-framer-name="Logo"
  c = c.replace(/(data-framer-name="Logo"[\s\S]*?<p[^>]*>).*?(<\/p>)/g, '$1AI Engineer$2');

  // 3. Make sure script paths point to local scripts
  const isSub = file.startsWith('portfolio/');
  const prefix = isSub ? '../assets/scripts/' : 'assets/scripts/';
  c = c.replace(/https:\/\/framerusercontent\.com\/sites\/48EiW83Fk1ILEWzxTLUdop\//g, prefix);

  fs.writeFileSync(p, c, 'utf8');
  console.log(`Cleaned -> ${file}`);
}

console.log('\nAll pages cleaned!');
