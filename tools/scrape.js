const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const urlModule = require('url');

const BASE_URL = 'https://vexoo.framer.website';
const PAGES = [
  '/',
  '/about',
  '/portfolio',
  '/contact',
  '/404',
  '/portfolio/travel-easy',
  '/portfolio/gamma',
  '/portfolio/stream-ai',
  '/portfolio/foome',
  '/portfolio/edbost'
];

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    const client = targetUrl.startsWith('https') ? https : http;
    client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirect = res.headers.location;
        if (!redirect.startsWith('http')) {
          redirect = urlModule.resolve(targetUrl, redirect);
        }
        return resolve(fetchUrl(redirect));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${targetUrl}`));
      }
      const isBinary = res.headers['content-type'] && (
        res.headers['content-type'].includes('image') ||
        res.headers['content-type'].includes('font') ||
        res.headers['content-type'].includes('octet-stream')
      );
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(isBinary ? buffer : buffer.toString('utf8'));
      });
    }).on('error', reject);
  });
}

async function scrapeAll() {
  const pageContents = {};
  for (const p of PAGES) {
    const fullUrl = BASE_URL + p;
    console.log('Fetching', fullUrl);
    try {
      const content = await fetchUrl(fullUrl);
      pageContents[p] = content;
      const safeName = p === '/' ? 'index' : p.replace(/^\//, '').replace(/\//g, '_');
      fs.mkdirSync(path.join(__dirname, 'raw_pages'), { recursive: true });
      fs.writeFileSync(path.join(__dirname, 'raw_pages', `${safeName}.html`), content);
    } catch(err) {
      console.error('Failed to fetch', fullUrl, err.message);
    }
  }

  // Find all assets across all pages
  const assetUrls = new Set();
  const regex = /https:\/\/(?:framerusercontent\.com|events\.framer\.com)[^"'()\s<>]+/g;
  for (const p in pageContents) {
    const html = pageContents[p];
    let match;
    while ((match = regex.exec(html)) !== null) {
      assetUrls.add(match[0]);
    }
  }

  console.log(`Found ${assetUrls.size} unique framer assets across all pages.`);
  fs.writeFileSync('assets_list.json', JSON.stringify(Array.from(assetUrls), null, 2));
}

scrapeAll();
