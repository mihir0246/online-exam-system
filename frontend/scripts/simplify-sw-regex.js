const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '..', 'build', 'service-worker.js');

if (fs.existsSync(swPath)) {
  let content = fs.readFileSync(swPath, 'utf8');
  
  // Replace [^\/] with [^/] for simplification
  // The original regex is typically /^[^\/]+\.[^\/]+$/
  // We want to change it to /^[^/]+\.[^/]+$/
  
  const originalRegex = /\[\^\\\/\]\+/g;
  const simplifiedRegex = '[^/]+';
  
  const newContent = content.replace(originalRegex, simplifiedRegex);
  
  if (content !== newContent) {
    fs.writeFileSync(swPath, newContent, 'utf8');
    console.log('Successfully simplified service-worker regex.');
  } else {
    console.log('Service-worker regex already simplified or not found.');
  }
} else {
  console.log('Build/service-worker.js not found. Skipping simplification.');
}
