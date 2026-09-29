const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const assets = JSON.parse(fs.readFileSync('categorized_assets.json', 'utf8'));

const urlMap = {};

function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve(true);
    }
    const dir = path.dirname(destPath);
    fs.mkdirSync(dir, { recursive: true });

    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);

    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try { fs.unlinkSync(destPath); } catch(e){}
        return resolve(downloadFile(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(destPath); } catch(e){}
        console.warn(`Failed ${res.statusCode}: ${url}`);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    });

    req.on('error', (err) => {
      file.close();
      try { fs.unlinkSync(destPath); } catch(e){}
      console.warn(`Error on ${url}: ${err.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      file.close();
      try { fs.unlinkSync(destPath); } catch(e){}
      console.warn(`Timeout on ${url}`);
      resolve(false);
    });
  });
}

function getSafeFilename(url, type) {
  try {
    const parsed = new URL(url);
    const basename = path.basename(parsed.pathname);
    if (basename && basename.includes('.')) {
      return basename;
    }
    // Hash fallback
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 10);
    const ext = type === 'images' ? '.webp' : type === 'fonts' ? '.woff2' : type === 'scripts' ? '.js' : '';
    return `${basename || 'asset'}_${hash}${ext}`;
  } catch(e) {
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 10);
    return `asset_${hash}`;
  }
}

async function run() {
  console.log('Downloading images...');
  for (const url of assets.images) {
    const fname = getSafeFilename(url, 'images');
    const localRel = `assets/images/${fname}`;
    const dest = path.join(__dirname, localRel);
    const ok = await downloadFile(url, dest);
    if (ok) urlMap[url] = localRel;
  }

  console.log('Downloading fonts...');
  for (const url of assets.fonts) {
    const fname = getSafeFilename(url, 'fonts');
    const localRel = `assets/fonts/${fname}`;
    const dest = path.join(__dirname, localRel);
    const ok = await downloadFile(url, dest);
    if (ok) urlMap[url] = localRel;
  }

  console.log('Downloading scripts...');
  for (const url of assets.scripts) {
    const fname = getSafeFilename(url, 'scripts');
    const localRel = `assets/scripts/${fname}`;
    const dest = path.join(__dirname, localRel);
    const ok = await downloadFile(url, dest);
    if (ok) urlMap[url] = localRel;
  }

  fs.writeFileSync('url_mapping.json', JSON.stringify(urlMap, null, 2));
  console.log(`Finished downloading. Total mapped: ${Object.keys(urlMap).length}`);
}

run();
