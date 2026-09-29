const fs = require('fs');

const html = fs.readFileSync('raw_pages/index.html', 'utf8');

// Find the main container layout
const desktopMatch = html.match(/data-framer-name="Desktop"[\s\S]*?data-framer-name="Tablet"/);
if (desktopMatch) {
  const snippet = desktopMatch[0];
  console.log('Snippet length:', snippet.length);
  // Extract all cards with data-framer-name
  const matches = [...snippet.matchAll(/data-framer-name="([^"]+)"/g)].map(m => m[1]);
  console.log('Desktop elements hierarchy:\n', matches);
}
