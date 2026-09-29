const fs = require('fs');
const path = require('path');

const map = JSON.parse(fs.readFileSync('asset_local_map.json', 'utf8'));
const projects = ['travel-easy', 'gamma', 'stream-ai', 'foome', 'edbost'];

for (const p of projects) {
  const filePath = path.join(__dirname, 'raw_pages', `portfolio_${p}.html`);
  const html = fs.readFileSync(filePath, 'utf8');

  const imgs = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg)/g)].map(m => m[0]);
  const unique = Array.from(new Set(imgs));
  console.log(`=== ${p} images ===`);
  unique.forEach(u => {
    console.log(u, '->', map[u] || 'not mapped');
  });
}
