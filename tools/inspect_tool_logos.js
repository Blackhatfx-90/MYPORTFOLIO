const fs = require('fs');
const html = fs.readFileSync('raw_pages/index.html', 'utf8');

const tools = ['Claude', 'Framer', 'Figma', 'Lovable', 'Notion', 'Arc', 'Linear', 'Screen'];
for (const tool of tools) {
  const pos = html.indexOf(`data-framer-name="${tool}"`);
  if (pos !== -1) {
    const chunk = html.substring(pos, pos + 1000);
    const srcMatch = chunk.match(/src="([^"]+)"/);
    console.log(tool, '->', srcMatch ? srcMatch[1] : 'not found');
  }
}
