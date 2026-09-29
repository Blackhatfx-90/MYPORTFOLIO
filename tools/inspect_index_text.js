const fs = require('fs');

const html = fs.readFileSync('raw_pages/index.html', 'utf8');

// Find all text inside tags or attributes
const lines = [];
const regex = />([^<]+)</g;
let m;
while ((m = regex.exec(html)) !== null) {
  const t = m[1].trim();
  if (t && !t.startsWith('{') && !t.includes('__framer') && t.length > 1) {
    lines.push(t);
  }
}

console.log('Total text nodes in index.html:', lines.length);
console.log('Sample text nodes:\n', Array.from(new Set(lines)).join('\n'));
