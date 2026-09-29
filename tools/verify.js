const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/about.html',
  'http://localhost:3000/portfolio.html',
  'http://localhost:3000/contact.html',
  'http://localhost:3000/portfolio/travel-easy.html',
  'http://localhost:3000/portfolio/gamma.html',
  'http://localhost:3000/portfolio/stream-ai.html',
  'http://localhost:3000/portfolio/foome.html',
  'http://localhost:3000/portfolio/edbost.html',
  'http://localhost:3000/404.html',
  'http://localhost:3000/css/style.css',
  'http://localhost:3000/js/main.js',
  'http://localhost:3000/assets/images/WsnVxaSk0dKenAYdMT2G7bpCDAQ.png'
];

async function checkAll() {
  for (const u of urls) {
    await new Promise(resolve => {
      http.get(u, (res) => {
        console.log(`[${res.statusCode}] ${u}`);
        resolve();
      }).on('error', (err) => {
        console.error(`[ERR] ${u}: ${err.message}`);
        resolve();
      });
    });
  }
}

checkAll();
