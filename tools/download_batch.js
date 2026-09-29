const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const items = JSON.parse(fs.readFileSync('clean_assets_manifest.json', 'utf8'));

function downloadOne(item) {
  return new Promise((resolve) => {
    let folder = item.type;
    if (!['images', 'fonts', 'scripts', 'css'].includes(folder)) folder = 'misc';
    const destDir = path.join(__dirname, 'assets', folder);
    fs.mkdirSync(destDir, { recursive: true });

    let filename = item.filename;
    if (!filename || filename.length < 2) filename = 'asset_' + Date.now();
    // Add extension if missing
    if (!path.extname(filename)) {
      if (item.type === 'images') filename += '.webp';
      else if (item.type === 'fonts') filename += '.woff2';
      else if (item.type === 'scripts') filename += '.js';
    }

    const destPath = path.join(destDir, filename);
    const relPath = `assets/${folder}/${filename}`;

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      item.localPath = relPath;
      return resolve({ success: true, item });
    }

    const client = item.url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);

    const req = client.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try { fs.unlinkSync(destPath); } catch(e){}
        item.url = res.headers.location;
        return resolve(downloadOne(item));
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(destPath); } catch(e){}
        return resolve({ success: false, url: item.url, code: res.statusCode });
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          item.localPath = relPath;
          resolve({ success: true, item });
        });
      });
    });

    req.on('error', (err) => {
      file.close();
      try { fs.unlinkSync(destPath); } catch(e){}
      resolve({ success: false, url: item.url, err: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      file.close();
      try { fs.unlinkSync(destPath); } catch(e){}
      resolve({ success: false, url: item.url, err: 'timeout' });
    });
  });
}

async function batchDownload(items, concurrency = 8) {
  let index = 0;
  let successCount = 0;
  let failCount = 0;

  async function worker() {
    while (index < items.length) {
      const current = items[index++];
      const result = await downloadOne(current);
      if (result.success) {
        successCount++;
        process.stdout.write(`\rDownloaded ${successCount}/${items.length} assets...`);
      } else {
        failCount++;
        console.log(`\nFailed (${result.code || result.err}): ${result.url}`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  console.log(`\nDone! Succeeded: ${successCount}, Failed: ${failCount}`);

  // Create mapping table
  const mapping = {};
  for (const it of items) {
    if (it.localPath) {
      mapping[it.url] = it.localPath;
      if (it.variants) {
        for (const v of it.variants) {
          mapping[v] = it.localPath;
        }
      }
    }
  }
  fs.writeFileSync('asset_local_map.json', JSON.stringify(mapping, null, 2));
  fs.writeFileSync('clean_assets_manifest_with_paths.json', JSON.stringify(items, null, 2));
}

batchDownload(items);
