const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const TARGETS = [
  {
    name: 'veterian-fx',
    url: 'https://veterian-fx.vercel.app',
    output: path.join(__dirname, '../images/projects/veterian-fx.png'),
    waitExtraMs: 6000
  },
  {
    name: 'bharat-dev-ai',
    url: 'https://bharat-dev-ai.vercel.app',
    output: path.join(__dirname, '../images/projects/bharat-dev-ai.png'),
    waitExtraMs: 8000,
    checkLoaded: async (page) => {
      // Wait until 'Loading Bharat.Dev AI' disappears or main UI appears
      try {
        await page.waitForFunction(() => {
          const body = document.body ? document.body.innerText : '';
          return !body.includes('Loading Bharat.Dev AI');
        }, { timeout: 15000 });
      } catch (e) {
        console.log('Timeout waiting for Loading Bharat.Dev AI to disappear, continuing...');
      }
    }
  },
  {
    name: 'premium-verse',
    url: 'https://premium-verse.vercel.app',
    output: path.join(__dirname, '../images/projects/premium-verse.png'),
    waitExtraMs: 6000
  },
  {
    name: 'med-mart',
    url: 'https://med-mart.in',
    output: path.join(__dirname, '../images/projects/med-mart.png'),
    waitExtraMs: 6000
  },
  {
    name: 'raamed',
    url: 'https://raamed.online',
    output: path.join(__dirname, '../images/projects/raamed.png'),
    waitExtraMs: 6000
  },
  {
    name: 'vridhi-ai',
    url: 'https://vridhi-ai.onrender.com',
    output: path.join(__dirname, '../images/projects/vridhi-ai.png'),
    waitExtraMs: 8000
  }
];

async function run() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--window-size=1440,900'
    ]
  });

  for (const target of TARGETS) {
    console.log(`\n=== Capturing ${target.name} (${target.url}) ===`);
    let page;
    try {
      page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      
      console.log(`Navigating to ${target.url}...`);
      try {
        await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 45000 });
      } catch (err) {
        console.warn(`Initial goto networkidle2 warning: ${err.message}. Trying load event...`);
        try {
          await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        } catch (e2) {
          console.warn(`domcontentloaded also timed out: ${e2.message}`);
        }
      }

      if (target.checkLoaded) {
        console.log('Running custom checkLoaded...');
        await target.checkLoaded(page);
      }

      console.log(`Waiting extra ${target.waitExtraMs}ms for full animation/hydration...`);
      await new Promise(r => setTimeout(r, target.waitExtraMs));

      const title = await page.title();
      console.log(`Page title: "${title}"`);

      await page.screenshot({ path: target.output, type: 'png' });
      console.log(`Successfully saved screenshot to: ${target.output}`);
    } catch (e) {
      console.error(`Error capturing ${target.name}:`, e.message);
    } finally {
      if (page) await page.close();
    }
  }

  await browser.close();
  console.log('\nAll done!');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
