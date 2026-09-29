const fs = require('fs');

const html = fs.readFileSync('raw_pages/index.html', 'utf8');

// Find framer-1nw48ne
const pos = html.indexOf('framer-1nw48ne');
if (pos !== -1) {
  const snippet = html.substring(pos, pos + 10000);
  console.log('Snippet from framer-1nw48ne:');
  console.log(snippet.slice(0, 4000));
}
