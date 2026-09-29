const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://vexoo.framer.website';

const PAGES = [
  { urlPath: '/', dest: 'index.html' },
  { urlPath: '/about', dest: 'about.html' },
  { urlPath: '/portfolio', dest: 'portfolio.html' },
  { urlPath: '/contact', dest: 'contact.html' },
  { urlPath: '/404', dest: '404.html' },
  { urlPath: '/portfolio/travel-easy', dest: 'portfolio/travel-easy.html' },
  { urlPath: '/portfolio/gamma', dest: 'portfolio/gamma.html' },
  { urlPath: '/portfolio/stream-ai', dest: 'portfolio/stream-ai.html' },
  { urlPath: '/portfolio/foome', dest: 'portfolio/foome.html' },
  { urlPath: '/portfolio/edbost', dest: 'portfolio/edbost.html' },
];

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    const fullUrl = BASE_URL + urlPath;
    console.log(`Fetching ${fullUrl}...`);
    https.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`Received ${data.length} bytes for ${urlPath} (Status: ${res.statusCode})`);
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  fs.mkdirSync(path.join(rootDir, 'portfolio'), { recursive: true });

  for (const page of PAGES) {
    const html = await fetchPage(page.urlPath);
    if (!html || html.length < 500) {
      console.error(`Warning: Page ${page.urlPath} seems empty or too small!`);
      continue;
    }
    const destPath = path.join(rootDir, page.dest);
    fs.writeFileSync(destPath, html, 'utf8');
    console.log(`Saved -> ${destPath} (${html.length} bytes)`);
  }

  console.log('\nAll exact Framer pages downloaded and saved successfully!');
}

run().catch(err => {
  console.error('Error fetching live pages:', err);
  process.exit(1);
});
