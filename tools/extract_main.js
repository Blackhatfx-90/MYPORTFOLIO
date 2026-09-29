const fs = require('fs');

const html = fs.readFileSync('raw_pages/index.html', 'utf8');

// Match <div id="main"> ... </div>
const mainMatch = html.match(/<div id="main"[^>]*>([\s\S]*?)<\/div>\s*<script/);
if (mainMatch) {
  console.log('Found main div, length:', mainMatch[1].length);
  fs.writeFileSync('main_div.html', mainMatch[0]);
} else {
  console.log('Could not find main div with simple regex, trying substring');
  const start = html.indexOf('<div id="main"');
  if (start !== -1) {
    const snippet = html.substring(start, start + 10000);
    console.log(snippet.slice(0, 2000));
  }
}
