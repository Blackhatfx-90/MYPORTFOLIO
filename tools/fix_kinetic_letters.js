const fs = require('fs');

let c = fs.readFileSync('index.html', 'utf8');

// Match any trailing i and l spans that got appended in mobile variant
const badMobileSnippet = /<\/span><span style="display:inline-block;opacity:0\.001;transform:translateX\(0px\) translateY\(20px\)[^>]*>i<\/span><span style="display:inline-block;opacity:0\.001;transform:translateX\(0px\) translateY\(20px\)[^>]*>l<\/span><\/span><\/h1>/g;

c = c.replace(badMobileSnippet, '</span></span></h1>');

fs.writeFileSync('index.html', c, 'utf8');
console.log('Fixed trailing i and l in mobile index.html!');
