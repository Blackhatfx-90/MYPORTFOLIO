const fs = require('fs');

const html = fs.readFileSync('raw_pages/index.html', 'utf8');

// Find all SVGs
const svgs = [...html.matchAll(/<svg[\s\S]*?<\/svg>/gi)].map(m => m[0]);
console.log('Total SVGs in index.html:', svgs.length);
fs.writeFileSync('extracted_svgs.json', JSON.stringify(Array.from(new Set(svgs)), null, 2));

// Find ticker icons in index.html
const tickerItems = ['Claude', 'Framer', 'Figma', 'Lovable', 'Notion', 'Arc', 'Linear', 'Screen Studio'];
for (const item of tickerItems) {
  const pos = html.indexOf(item);
  console.log(`Found ${item}: ${pos !== -1}`);
}
