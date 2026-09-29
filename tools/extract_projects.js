const fs = require('fs');
const path = require('path');

const projects = ['travel-easy', 'gamma', 'stream-ai', 'foome', 'edbost'];
const projectData = [];

for (const slug of projects) {
  const filePath = path.join(__dirname, 'raw_pages', `portfolio_${slug}.html`);
  if (!fs.existsSync(filePath)) {
    console.log('Missing:', filePath);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract meta title & description
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || slug;
  
  // Find images in this page
  const imgMatches = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg)/g)].map(m => m[0]);
  const uniqueImages = Array.from(new Set(imgMatches));

  // Extract texts
  const pMatches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);

  projectData.push({
    slug,
    title,
    images: uniqueImages,
    sampleParagraphs: pMatches.slice(0, 15)
  });
}

fs.writeFileSync('extracted_projects.json', JSON.stringify(projectData, null, 2));
console.log('Extracted', projectData.length, 'projects.');
