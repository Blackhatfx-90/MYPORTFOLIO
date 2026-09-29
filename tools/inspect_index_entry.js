const fs = require('fs');

const idx = JSON.parse(fs.readFileSync('searchIndex.json', 'utf8'));
console.log('--- Home index entry ---');
console.log(JSON.stringify(idx['/'], null, 2));

console.log('--- About entry ---');
console.log(JSON.stringify(idx['/about'], null, 2));
