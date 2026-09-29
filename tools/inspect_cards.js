const fs = require('fs');

const html = fs.readFileSync('raw_pages/index.html', 'utf8');

// Search for the cards: About, Portfolio, Contact, Stack, Resume, Hey
const cards = ['About', 'Portfolio', 'Contact', 'Stack', 'Resume', 'Hey'];
for (const card of cards) {
  let idx = 0;
  console.log(`\n================ Card: ${card} ================`);
  while ((idx = html.indexOf(`name="${card}"`, idx)) !== -1) {
    const chunk = html.substring(idx, idx + 800);
    // Find text inside
    const texts = [...chunk.matchAll(/>([^<]+)</g)].map(m => m[1].trim()).filter(Boolean);
    const hrefs = [...chunk.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    console.log(`Found at index ${idx}:`);
    console.log('Texts:', texts.slice(0, 5));
    console.log('Hrefs:', hrefs);
    idx += card.length;
    break;
  }
}
