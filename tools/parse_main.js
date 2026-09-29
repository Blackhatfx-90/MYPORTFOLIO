const fs = require('fs');

const mainHtml = fs.readFileSync('main_div.html', 'utf8');

// Find all hrefs
const hrefs = [...mainHtml.matchAll(/href=[\"']([^\"']+)[\"']/g)].map(m => m[1]);
console.log('Hrefs in main:', Array.from(new Set(hrefs)));

// Find all images in main
const imgs = [...mainHtml.matchAll(/src=[\"']([^\"']+)[\"']/g)].map(m => m[1]);
console.log('Images in main:', Array.from(new Set(imgs)));

// Find all background images
const bgImgs = [...mainHtml.matchAll(/url\((?:&quot;|['\"])?([^)'\"]+)(?:&quot;|['\"])?\)/g)].map(m => m[1]);
console.log('Bg images:', Array.from(new Set(bgImgs)));

// Find all text blocks
const texts = [...mainHtml.matchAll(/>([^<]{2,})</g)].map(m => m[1].trim()).filter(t => t && !t.startsWith('{'));
console.log('Text count:', texts.length);
console.log('Sample texts:', Array.from(new Set(texts)).slice(0, 30));
