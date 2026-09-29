const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('raw_pages/index.html', 'utf8');

// 1. Extract CSS rules
const styleMatches = [...indexHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
console.log('Total style tags:', styleMatches.length);

// Extract all class definitions and their properties
fs.writeFileSync('all_styles.css', styleMatches.join('\n\n'));
console.log('Saved all_styles.css');

// Let's inspect the main layout of index.html
// Search for key classes or structure
const bodyBg = indexHtml.match(/background:\s*([^;]+);/i);
console.log('Body bg match:', bodyBg ? bodyBg[1] : 'not found');

// Inspect Desktop layout cards
console.log('\n--- Desktop Card Classes ---');
const cardMatches = [...indexHtml.matchAll(/data-framer-name="([^"]+)"[^>]*class="([^"]+)"/g)];
const uniqueCards = new Set();
for (const m of cardMatches) {
  if (['About', 'Portfolio', 'Contact', 'Stack', 'Resume', 'Avatar', 'Hey'].includes(m[1])) {
    console.log(`Card: ${m[1]}, Class: ${m[2]}`);
  }
}
