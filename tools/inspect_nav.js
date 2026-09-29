const fs = require('fs');

const c = fs.readFileSync('framer_offline/index.html', 'utf8');
const matches = [...c.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
console.log('src attributes in framer_offline/index.html:');
console.log(matches.filter(s => s.includes('script') || s.endsWith('.mjs') || s.endsWith('.js')));

const preloads = [...c.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
console.log('\npreloads in framer_offline/index.html:');
console.log(preloads.filter(s => s.endsWith('.mjs')));
