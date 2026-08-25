const fs = require('fs');
const path = require('path');

const flagsDir = path.join(__dirname, 'public', 'images', 'flags');
if (!fs.existsSync(flagsDir)) {
  fs.mkdirSync(flagsDir, { recursive: true });
}

const flags = {
  'uk.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="100%" height="100%">
<clipPath id="s"><path d="M0 0v30h60V0z"/></clipPath>
<clipPath id="t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>
<g clip-path="url(#s)">
<path d="M0 0v30h60V0z" fill="#012169"/>
<path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/>
<path d="M0 0l60 30m0-30L0 30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/>
<path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/>
<path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/>
</g>
</svg>`,

  'usa.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" width="100%" height="100%">
<rect width="7410" height="3900" fill="#b22234"/>
<path d="M0,450H7410M0,1050H7410M0,1650H7410M0,2250H7410M0,2850H7410M0,3450H7410" stroke="#fff" stroke-width="300"/>
<rect width="2964" height="2100" fill="#3c3b6e"/>
<g fill="#fff">
<g id="s1"><g id="s2"><g id="s3"><g id="s4"><path id="s" d="M247,90 319,314 129,176H365L175,314z"/><use href="#s" x="494"/></g><use href="#s" x="988"/></g><use href="#s" x="1482"/><use href="#s" x="1976"/></g><use href="#s" x="2470"/></g>
<use href="#s1" y="210"/>
<use href="#s2" y="420"/>
<use href="#s1" y="630"/>
<use href="#s2" y="840"/>
<use href="#s1" y="1050"/>
<use href="#s2" y="1260"/>
<use href="#s1" y="1470"/>
<use href="#s2" y="1680"/>
<use href="#s1" y="1890"/>
</g>
</svg>`,

  'australia.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640" width="100%" height="100%">
<rect width="1280" height="640" fill="#00008b"/>
<g fill="#fff">
<path d="M0 0h640v320H0z" fill="#00247d"/>
<path d="M0 0l640 320m0-320L0 320" stroke="#fff" stroke-width="60"/>
<path d="M0 0l640 320m0-320L0 320" stroke="#cc142b" stroke-width="40"/>
<path d="M320 0v320M0 160h640" stroke="#fff" stroke-width="100"/>
<path d="M320 0v320M0 160h640" stroke="#cc142b" stroke-width="60"/>
</g>
<!-- Commonwealth Star -->
<circle cx="320" cy="460" r="60" fill="#fff"/>
<!-- Southern Cross Stars -->
<circle cx="960" cy="120" r="24" fill="#fff"/>
<circle cx="1080" cy="240" r="24" fill="#fff"/>
<circle cx="960" cy="480" r="28" fill="#fff"/>
<circle cx="840" cy="280" r="24" fill="#fff"/>
<circle cx="1000" cy="340" r="14" fill="#fff"/>
</svg>`,

  'canada.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" width="100%" height="100%">
<rect width="1000" height="500" fill="#ff0000"/>
<rect x="250" width="500" height="500" fill="#ffffff"/>
<path d="M500,75 L525,180 L575,150 L560,225 L640,240 L590,285 L610,360 L525,325 L510,425 L490,425 L475,325 L390,360 L410,285 L360,240 L440,225 L425,150 L475,180 Z" fill="#ff0000"/>
</svg>`,

  'new-zealand.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="100%" height="100%">
<rect width="1200" height="600" fill="#00247d"/>
<g>
<path d="M0 0h600v300H0z" fill="#00247d"/>
<path d="M0 0l600 300m0-300L0 300" stroke="#fff" stroke-width="60"/>
<path d="M0 0l600 300m0-300L0 300" stroke="#cc142b" stroke-width="40"/>
<path d="M300 0v300M0 150h600" stroke="#fff" stroke-width="100"/>
<path d="M300 0v300M0 150h600" stroke="#cc142b" stroke-width="60"/>
</g>
<!-- Southern Cross (Red with White border) -->
<circle cx="900" cy="120" r="22" fill="#fff"/><circle cx="900" cy="120" r="15" fill="#cc142b"/>
<circle cx="1020" cy="240" r="22" fill="#fff"/><circle cx="1020" cy="240" r="15" fill="#cc142b"/>
<circle cx="900" cy="460" r="25" fill="#fff"/><circle cx="900" cy="460" r="18" fill="#cc142b"/>
<circle cx="780" cy="260" r="20" fill="#fff"/><circle cx="780" cy="260" r="13" fill="#cc142b"/>
</svg>`,

  'germany.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="100%" height="100%">
<rect width="5" height="1" y="0" fill="#000000"/>
<rect width="5" height="1" y="1" fill="#dd0000"/>
<rect width="5" height="1" y="2" fill="#ffce00"/>
</svg>`,

  'denmark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 280" width="100%" height="100%">
<rect width="370" height="280" fill="#c8102e"/>
<rect x="120" width="40" height="280" fill="#ffffff"/>
<rect y="120" width="370" height="40" fill="#ffffff"/>
</svg>`,

  'finland.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1100" width="100%" height="100%">
<rect width="1800" height="1100" fill="#ffffff"/>
<rect x="500" width="300" height="1100" fill="#003580"/>
<rect y="400" width="1800" height="300" fill="#003580"/>
</svg>`,

  'japan.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
<rect width="900" height="600" fill="#ffffff"/>
<circle cx="450" cy="300" r="180" fill="#bc002d"/>
</svg>`,

  'south-korea.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
<rect width="900" height="600" fill="#ffffff"/>
<!-- Taegeuk -->
<circle cx="450" cy="300" r="150" fill="#cd2e3a"/>
<path d="M300,300 A75,75 0 0,0 450,300 A75,75 0 0,1 600,300 A150,150 0 0,1 300,300 Z" fill="#0047a0"/>
<circle cx="375" cy="300" r="75" fill="#cd2e3a"/>
<!-- Trigrams in corners -->
<rect x="180" y="120" width="15" height="90" fill="#000" transform="rotate(33.7 180 120)"/>
<rect x="205" y="120" width="15" height="90" fill="#000" transform="rotate(33.7 205 120)"/>
<rect x="230" y="120" width="15" height="90" fill="#000" transform="rotate(33.7 230 120)"/>
<rect x="680" y="390" width="15" height="90" fill="#000" transform="rotate(33.7 680 390)"/>
<rect x="705" y="390" width="15" height="90" fill="#000" transform="rotate(33.7 705 390)"/>
<rect x="730" y="390" width="15" height="90" fill="#000" transform="rotate(33.7 730 390)"/>
</svg>`,

  'lithuania.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="100%" height="100%">
<rect width="5" height="1" y="0" fill="#fdb913"/>
<rect width="5" height="1" y="1" fill="#006a44"/>
<rect width="5" height="1" y="2" fill="#c1272d"/>
</svg>`,

  'malta.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
<rect width="450" height="600" fill="#ffffff"/>
<rect x="450" width="450" height="600" fill="#cf142b"/>
<path d="M50,50 h40 v40 h-40 z" fill="#cccccc" stroke="#777" stroke-width="2"/>
</svg>`,

  'uae.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
<rect width="600" height="100" y="0" fill="#00732f"/>
<rect width="600" height="100" y="100" fill="#ffffff"/>
<rect width="600" height="100" y="200" fill="#000000"/>
<rect width="150" height="300" x="0" y="0" fill="#ff0000"/>
</svg>`,

  'india.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%">
<rect width="900" height="200" y="0" fill="#ff9933"/>
<rect width="900" height="200" y="200" fill="#ffffff"/>
<rect width="900" height="200" y="400" fill="#138808"/>
<circle cx="450" cy="300" r="70" fill="none" stroke="#000080" stroke-width="6"/>
<circle cx="450" cy="300" r="14" fill="#000080"/>
</svg>`,

  'nepal.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 550" width="100%" height="100%">
<path d="M0,0 L350,260 L140,260 L380,500 L0,500 Z" fill="#DC143C" stroke="#003893" stroke-width="24"/>
<circle cx="100" cy="180" r="40" fill="#ffffff"/>
<circle cx="100" cy="400" r="50" fill="#ffffff"/>
</svg>`
};

for (const [filename, content] of Object.entries(flags)) {
  const filePath = path.join(flagsDir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log('Created flag:', filename);
}
