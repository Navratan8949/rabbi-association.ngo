const fs = require('fs');
const path = require('path');

const aboutPreviewPath = 'components/sections/about-preview.jsx';
let aboutPreview = fs.readFileSync(aboutPreviewPath, 'utf8');

// Center Mission and Vision blocks
aboutPreview = aboutPreview.replace(
  /<div className="pl-0 sm:pl-5 border-l-0 sm:border-l-4 border-accent">/g,
  '<div className="pl-0 sm:pl-5 border-l-0 sm:border-l-4 border-accent text-center flex flex-col items-center">'
);

// Center the flex headings inside
aboutPreview = aboutPreview.replace(
  /<div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-3">/g,
  '<div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-lg mb-3">'
);

fs.writeFileSync(aboutPreviewPath, aboutPreview);

// Add global CSS rule for headings
const cssPath = 'app/globals.css';
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('/* Global Heading Centering */')) {
    css += `\n\n/* Global Heading Centering based on client request */\nh1, h2, h3, h4, h5, h6 {\n  text-align: center !important;\n}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log("Done fixing about-preview and globals.css");
