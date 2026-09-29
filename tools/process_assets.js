const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Load raw_pages
const rawDir = path.join(__dirname, 'raw_pages');
const files = fs.readdirSync(rawDir);

const rawAssets = new Set();

for (const file of files) {
  const content = fs.readFileSync(path.join(rawDir, file), 'utf8');
  // Match framerusercontent URLs
  const matches = content.match(/https:\/\/(?:framerusercontent\.com|events\.framer\.com)[^"'()\s<>]+/g) || [];
  for (let m of matches) {
    // decode &amp;
    m = m.replace(/&amp;/g, '&');
    // trim quotes or slashes
    m = m.replace(/[",;)>]+$/, '');
    rawAssets.add(m);
  }
}

// Clean and categorize unique resources
const assetMap = new Map(); // cleanUrl -> { base, ext, type, originalUrls: [] }

for (const fullUrl of rawAssets) {
  let cleanUrl = fullUrl;
  try {
    const u = new URL(fullUrl);
    // For images, we can strip query parameters to get high-res original!
    if (u.pathname.includes('/images/')) {
      cleanUrl = `${u.origin}${u.pathname}`;
    } else if (u.pathname.includes('/assets/')) {
      cleanUrl = `${u.origin}${u.pathname}`;
    }
  } catch(e) {}

  if (!assetMap.has(cleanUrl)) {
    let type = 'other';
    const ext = path.extname(new URL(cleanUrl).pathname).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif', '.ico'].includes(ext) || cleanUrl.includes('/images/')) {
      type = 'images';
    } else if (['.woff2', '.woff', '.ttf', '.otf'].includes(ext) || cleanUrl.includes('/assets/')) {
      type = 'fonts';
    } else if (['.js', '.mjs'].includes(ext)) {
      type = 'scripts';
    } else if (['.css'].includes(ext)) {
      type = 'css';
    }
    assetMap.set(cleanUrl, {
      url: cleanUrl,
      type,
      filename: path.basename(new URL(cleanUrl).pathname),
      variants: [fullUrl]
    });
  } else {
    assetMap.get(cleanUrl).variants.push(fullUrl);
  }
}

console.log(`Total unique clean assets: ${assetMap.size}`);
const counts = {};
for (const item of assetMap.values()) {
  counts[item.type] = (counts[item.type] || 0) + 1;
}
console.log('Breakdown:', counts);

fs.writeFileSync('clean_assets_manifest.json', JSON.stringify(Array.from(assetMap.values()), null, 2));
