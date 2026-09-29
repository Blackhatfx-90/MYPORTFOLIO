const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const FILES = [
  'index.html',
  'about.html',
  'portfolio.html',
  'contact.html',
  '404.html',
  'portfolio/travel-easy.html',
  'portfolio/gamma.html',
  'portfolio/stream-ai.html',
  'portfolio/foome.html',
  'portfolio/edbost.html'
];

function makeLetterSpans(word, isMobile) {
  const transform = isMobile 
    ? 'transform:translateX(0px) translateY(20px) scale(1) rotate(0deg) skewX(0deg) skewY(2deg)'
    : 'transform:translateX(0px) translateY(40px) scale(1) rotate(0deg) skewX(0deg) skewY(4deg)';
  
  return word.split('').map(char => 
    `<span style="display:inline-block;opacity:0.001;${transform}">${char}</span>`
  ).join('');
}

const priyanshuDesktop = `<span style="white-space:nowrap">${makeLetterSpans('Priyanshu', false)}</span> <span style="white-space:nowrap">${makeLetterSpans('Shukla', false)}</span>`;
const priyanshuMobile = `<span style="white-space:nowrap">${makeLetterSpans('Priyanshu', true)}</span> <span style="white-space:nowrap">${makeLetterSpans('Shukla', true)}</span>`;

const sorenDesktopRegex = /<span style="white-space:nowrap"><span style="display:inline-block;opacity:0\.001;transform:translateX\(0px\) translateY\(40px\)[^>]*>S<\/span>[\s\S]*?<\/span> <span style="white-space:nowrap"><span style="display:inline-block;opacity:0\.001;transform:translateX\(0px\) translateY\(40px\)[^>]*>W<\/span>[\s\S]*?<\/span>/g;
const sorenMobileRegex = /<span style="white-space:nowrap"><span style="display:inline-block;opacity:0\.001;transform:translateX\(0px\) translateY\(20px\)[^>]*>S<\/span>[\s\S]*?<\/span> <span style="white-space:nowrap"><span style="display:inline-block;opacity:0\.001;transform:translateX\(0px\) translateY\(20px\)[^>]*>W<\/span>[\s\S]*?<\/span>/g;

const WHATSAPP_BUTTON_HTML = `
<!-- Floating Talk Now WhatsApp Button -->
<a id="floating-whatsapp-talk-now" class="floating-whatsapp-btn" href="https://wa.me/919068839558" target="_blank" rel="noopener noreferrer" aria-label="Talk Now on WhatsApp">
  <span class="whatsapp-icon-wrap">
    <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.055-1.002-.055-.572-.172-1.309-.499-2.222-1.396-.913-.896-1.554-1.924-1.745-2.253-.191-.328-.02-.505.124-.649.129-.129.288-.335.433-.502.144-.168.192-.284.288-.476.096-.192.048-.362-.024-.506-.072-.144-.649-1.564-.889-2.141-.234-.562-.472-.486-.649-.495-.168-.008-.361-.01-.553-.01-.192 0-.505.072-.769.36-.264.288-1.009.986-1.009 2.404 0 1.418 1.033 2.788 1.177 2.98.144.192 2.037 3.111 4.935 4.362.689.298 1.227.476 1.646.609.692.22 1.322.189 1.819.115.554-.083 1.706-.697 1.947-1.37.24-.673.24-1.25.168-1.37-.072-.12-.264-.192-.408-.264z"/>
    </svg>
  </span>
  <span class="status-ping">
    <span class="ping-circle"></span>
    <span class="ping-dot"></span>
  </span>
  <span>Talk Now</span>
</a>
`;

for (const relFile of FILES) {
  const filePath = path.join(rootDir, relFile);
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');

  // Replace Soren Weil with Priyanshu Shukla
  html = html.replace(/Soren Weil/g, 'Priyanshu Shukla');
  // Replace remaining Soren with Priyanshu
  html = html.replace(/Soren/g, 'Priyanshu');

  // Replace Email
  html = html.replace(/hello@soren\.com/g, 'godfathersid3@gmail.com');

  // Replace Phone
  html = html.replace(/\(\+20\)\s*115\s*123-4567/g, '+91 9068839558');
  html = html.replace(/tel:\(\+20\)\s*115\s*123-4567/g, 'tel:+919068839558');

  // Kinetic Spans (in index.html)
  if (relFile === 'index.html') {
    html = html.replace(sorenDesktopRegex, priyanshuDesktop);
    html = html.replace(sorenMobileRegex, priyanshuMobile);
  }

  // Update Portfolio Cards in portfolio.html
  if (relFile === 'portfolio.html') {
    // 1. Travel Easy -> Veterian FX (https://veterian-fx.vercel.app)
    html = html.replace(/href="\.\/portfolio\/travel-easy"/g, 'href="https://veterian-fx.vercel.app" target="_blank" rel="noopener noreferrer"');
    html = html.replace(/>Travel Easy</g, '>Veterian FX<');
    html = html.replace(/>App Design</g, '>Fintech / Trading<');

    // 2. Gamma -> Bharat Dev AI (https://bharat-dev-ai.vercel.app)
    html = html.replace(/href="\.\/portfolio\/gamma"/g, 'href="https://bharat-dev-ai.vercel.app" target="_blank" rel="noopener noreferrer"');
    html = html.replace(/>Gamma</g, '>Bharat Dev AI<');
    html = html.replace(/>UX\/UI Design</g, '>AI Platform / Dev<');

    // 3. Stream AI -> Premium Verse (https://premium-verse.vercel.app)
    html = html.replace(/href="\.\/portfolio\/stream-ai"/g, 'href="https://premium-verse.vercel.app" target="_blank" rel="noopener noreferrer"');
    html = html.replace(/>Stream AI</g, '>Premium Verse<');
    html = html.replace(/>Product Design</g, '>Web3 & Creative Tech<');

    // 4. Foome -> Med Mart (https://med-mart.in)
    html = html.replace(/href="\.\/portfolio\/foome"/g, 'href="https://med-mart.in" target="_blank" rel="noopener noreferrer"');
    html = html.replace(/>Foome</g, '>Med Mart<');
    html = html.replace(/>Web Design</g, '>E-Commerce / Health<');

    // 5. Edbost -> RaaMed (https://raamed.online)
    html = html.replace(/href="\.\/portfolio\/edbost"/g, 'href="https://raamed.online" target="_blank" rel="noopener noreferrer"');
    html = html.replace(/>Edbost</g, '>RaaMed<');
    html = html.replace(/>Visual Design</g, '>Healthcare Solutions<');

    // Check if card 5 can be duplicated for 6th project: Vridhi AI (https://vridhi-ai.onrender.com)
    const edbostCardRegex = /<a class="framer-12j17ct framer-12f2hes" href="https:\/\/raamed\.online" target="_blank" rel="noopener noreferrer">[\s\S]*?<\/a><!--\/\$-->/g;
    const cardMatch = html.match(edbostCardRegex);
    if (cardMatch && cardMatch[0]) {
      let card6 = cardMatch[0]
        .replace(/https:\/\/raamed\.online/g, 'https://vridhi-ai.onrender.com')
        .replace(/>RaaMed</g, '>Vridhi AI<')
        .replace(/>Healthcare Solutions</g, '>AI Intelligence App<');
      
      html = html.replace(cardMatch[0], cardMatch[0] + '<!--$-->' + card6);
      console.log('Added 6th project card for Vridhi AI to portfolio.html');
    }
  }

  // Update case studies to link to the corresponding live project
  if (relFile === 'portfolio/travel-easy.html') {
    html = html.replace(/>Travel Easy</g, '>Veterian FX<');
  } else if (relFile === 'portfolio/gamma.html') {
    html = html.replace(/>Gamma</g, '>Bharat Dev AI<');
  } else if (relFile === 'portfolio/stream-ai.html') {
    html = html.replace(/>Stream AI</g, '>Premium Verse<');
  } else if (relFile === 'portfolio/foome.html') {
    html = html.replace(/>Foome</g, '>Med Mart<');
  } else if (relFile === 'portfolio/edbost.html') {
    html = html.replace(/>Edbost</g, '>RaaMed<');
  }

  // Inject CSS in head
  const cssTag = '<link rel="stylesheet" href="/css/site_custom.css">';
  if (!html.includes('site_custom.css')) {
    html = html.replace('</head>', `  ${cssTag}\n</head>`);
  }

  // Inject WhatsApp Button before </body>
  if (!html.includes('floating-whatsapp-talk-now')) {
    html = html.replace('</body>', `${WHATSAPP_BUTTON_HTML}\n</body>`);
  }

  // Inject custom JS before </body>
  const jsTag = '<script src="/js/site_custom.js"></script>';
  if (!html.includes('site_custom.js')) {
    html = html.replace('</body>', `  ${jsTag}\n</body>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated -> ${relFile}`);
}

console.log('\nAll user customizations successfully applied!');
