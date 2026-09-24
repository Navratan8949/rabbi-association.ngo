const fs = require('fs');

const files = [
  'frontend/app/robots.js',
  'frontend/app/(volunteer-portal)/volunteer-portal/id-card/page.jsx',
  'frontend/app/(admin)/admin/members/page.jsx',
  'backend/src/controllers/member.controller.js',
  'backend/src/controllers/volunteer.controller.js',
  'backend/src/utils/generatePDF.js',
  'frontend/app/sitemap.js',
  'frontend/app/(member)/member/id-card/page.jsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/rabbiassociation\.org/g, 'rabbi.co.in');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
