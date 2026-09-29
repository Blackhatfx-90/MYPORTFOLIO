const fs = require('fs');
const path = require('path');

const map = JSON.parse(fs.readFileSync('asset_local_map.json', 'utf8'));

// Sort keys by descending length so longer URLs are replaced first
const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);

const rawDir = path.join(__dirname, 'raw_pages');
const outDir = path.join(__dirname, 'framer_offline');
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(rawDir);

for (const file of files) {
  let content = fs.readFileSync(path.join(rawDir, file), 'utf8');

  // Replace all mapped URLs with local relative paths
  for (const remoteUrl of sortedKeys) {
    const local = map[remoteUrl];
    // In framer_offline, relative path to assets is ../assets/ or ./assets/
    content = content.split(remoteUrl).join(local);
  }

  // Also replace framer badge if any
  content = content.replace(/#__framer-badge-container\{[^}]*\}/g, '#__framer-badge-container{display:none!important}');

  fs.writeFileSync(path.join(outDir, file), content);
}

console.log('Saved localized framer pages in framer_offline/');
