const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = [
  'index.html', 'about.html', 'portfolio.html', 'contact.html', '404.html',
  'portfolio/travel-easy.html', 'portfolio/gamma.html', 'portfolio/stream-ai.html',
  'portfolio/foome.html', 'portfolio/edbost.html'
];

files.forEach(f => {
  const p = path.join(rootDir, f);
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/@soren\.weil/g, '@priyanshu.shukla');
  c = c.replace(/@its-soren/g, '@priyanshushukla');
  c = c.replace(/@weil\.soren/g, '@priyanshushukla');
  c = c.replace(/soren\.weil/gi, 'priyanshu.shukla');
  c = c.replace(/its-soren/gi, 'priyanshushukla');
  c = c.replace(/weil\.soren/gi, 'priyanshushukla');
  fs.writeFileSync(p, c, 'utf8');
  const rem = (c.match(/soren/gi) || []);
  console.log(f, 'remaining soren:', rem.length);
});
