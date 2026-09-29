const fs = require('fs');
const path = require('path');

const list = JSON.parse(fs.readFileSync('assets_list.json', 'utf8'));

const images = [];
const fonts = [];
const scripts = [];
const other = [];

for (const url of list) {
  // clean url trailing punctuation if any
  const cleanUrl = url.replace(/[",;]+$/, '');
  if (/\.(png|jpe?g|webp|svg|gif|avif)(\?|$)/i.test(cleanUrl) || cleanUrl.includes('/images/')) {
    images.push(cleanUrl);
  } else if (/\.(woff2?|ttf|otf|eot)(\?|$)/i.test(cleanUrl) || cleanUrl.includes('/assets/')) {
    fonts.push(cleanUrl);
  } else if (/\.(js|mjs)(\?|$)/i.test(cleanUrl)) {
    scripts.push(cleanUrl);
  } else {
    other.push(cleanUrl);
  }
}

console.log(`Images: ${images.length}`);
console.log(`Fonts: ${fonts.length}`);
console.log(`Scripts: ${scripts.length}`);
console.log(`Other: ${other.length}`);

fs.writeFileSync('categorized_assets.json', JSON.stringify({ images, fonts, scripts, other }, null, 2));
