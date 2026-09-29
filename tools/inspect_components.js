const fs = require('fs');

const mainHtml = fs.readFileSync('main_div.html', 'utf8');

// Match sections or main containers
const chunks = mainHtml.split(/data-framer-name=/);
console.log('Framer named components:', chunks.length);
for (let i = 1; i < chunks.length; i++) {
  const name = chunks[i].split(/[\s>]/)[0];
  console.log(`- Component ${i}: ${name}`);
}
