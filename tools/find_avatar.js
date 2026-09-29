const fs = require('fs');

['index.html', 'about.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const matches = [...c.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  const imgMatches = matches.filter(s => s.match(/\.(png|jpg|jpeg|webp)/i));
  console.log(`\n=== Images in ${f} ===`);
  console.log([...new Set(imgMatches)]);
});

// Also search for "Avatar" in index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
const avatarIdx = indexHtml.indexOf('data-framer-name="Avatar"');
if (avatarIdx !== -1) {
  console.log('\n--- Avatar section in index.html ---');
  console.log(indexHtml.substring(avatarIdx, avatarIdx + 600));
}
