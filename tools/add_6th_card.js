const fs = require('fs');

let html = fs.readFileSync('portfolio.html', 'utf8');

const searchStr = '<a class="framer-1lyzl73 framer-12f2hes" href="https://raamed.online" target="_blank" rel="noopener noreferrer">';
const startIdx = html.indexOf(searchStr);

if (startIdx !== -1) {
  const endIdx = html.indexOf('</a>', startIdx) + 4;
  const raamedCard = html.substring(startIdx, endIdx);

  const vridhiCard = raamedCard
    .replace('https://raamed.online', 'https://vridhi-ai.onrender.com')
    .replace(/>RaaMed</g, '>Vridhi AI<')
    .replace(/>Healthcare Solutions</g, '>AI Intelligence App<');

  // Insert right after the closing comment of raamedCard
  const nextComment = html.indexOf('<!--/$-->', endIdx);
  if (nextComment !== -1) {
    const insertPos = nextComment + 9;
    html = html.substring(0, insertPos) + '<!--$-->' + vridhiCard + '<!--/$-->' + html.substring(insertPos);
    fs.writeFileSync('portfolio.html', html, 'utf8');
    console.log('Successfully added 6th project card for Vridhi AI!');
  } else {
    console.log('Could not find <!--/$--> after card');
  }
} else {
  console.log('Could not find searchStr for raamedCard');
}
