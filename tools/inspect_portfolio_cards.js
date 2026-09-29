const fs = require('fs');

const html = fs.readFileSync('portfolio.html', 'utf8');

// Find where travel-easy card starts and ends
const start = html.indexOf('<a class="framer-12j17ct framer-12f2hes" href="./portfolio/travel-easy">');
const nextCard = html.indexOf('<a class="framer-12j17ct framer-12f2hes" href="./portfolio/gamma">');

console.log('Travel Easy card HTML snippet:');
console.log(html.substring(start, nextCard));
