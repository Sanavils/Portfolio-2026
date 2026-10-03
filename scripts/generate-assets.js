import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const publicDir = path.resolve('public');

// 1. Create public/favicon.svg
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#0E0E10" />
  <g transform="translate(14.5, 4.5)">
    <!-- Monogram Hassen Arkab in signature violet -->
    <rect x="17" y="13.5" width="14" height="31.5" fill="#EEB8F9" />
    <rect x="58" y="13.5" width="13" height="71.5" fill="#EEB8F9" />
    <path d="M 17 58.5 H 58 V 71.5 H 31 V 85 H 17 Z" fill="#EEB8F9" />
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg.trim());
console.log('✓ Generated favicon.svg');

// 2. Create apple-touch-icon.svg (180x180 base)
const appleTouchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#0E0E10" />
  <g transform="translate(26, 8) scale(1.8)">
    <rect x="17" y="13.5" width="14" height="31.5" fill="#EEB8F9" />
    <rect x="58" y="13.5" width="13" height="71.5" fill="#EEB8F9" />
    <path d="M 17 58.5 H 58 V 71.5 H 31 V 85 H 17 Z" fill="#EEB8F9" />
  </g>
</svg>`;

const appleTouchSvgPath = path.join(publicDir, 'apple-touch-icon.svg');
fs.writeFileSync(appleTouchSvgPath, appleTouchSvg.trim());

// Convert to apple-touch-icon.png using sips
try {
  execSync(`sips -s format png "${appleTouchSvgPath}" --out "${path.join(publicDir, 'apple-touch-icon.png')}"`);
  execSync(`sips -z 180 180 "${path.join(publicDir, 'apple-touch-icon.png')}"`);
  console.log('✓ Generated apple-touch-icon.png');
} catch (e) {
  console.error('Failed sips for apple-touch-icon:', e);
}

// Convert to favicon.ico (32x32 standard)
try {
  const icoPng = path.join(publicDir, 'favicon-temp.png');
  execSync(`sips -s format png "${appleTouchSvgPath}" --out "${icoPng}"`);
  execSync(`sips -z 32 32 "${icoPng}"`);
  // Copy to favicon.ico (browsers accept PNG-encoded favicon.ico or renamed PNG)
  fs.copyFileSync(icoPng, path.join(publicDir, 'favicon.ico'));
  fs.unlinkSync(icoPng);
  console.log('✓ Generated favicon.ico');
} catch (e) {
  console.error('Failed favicon.ico generation:', e);
}

// 3. Create site.webmanifest
const webManifest = {
  name: 'Hassen Arkab Portfolio',
  short_name: 'Hassen Arkab',
  description: 'UX/UI Designer portfolio — Interfaces, visual systems & interactive design.',
  start_url: '/',
  display: 'standalone',
  background_color: '#FAFAF7',
  theme_color: '#EEB8F9',
  icons: [
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png'
    },
    {
      src: '/favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml'
    }
  ]
};

fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(webManifest, null, 2));
console.log('✓ Generated site.webmanifest');

// 4. Create public/og-image.svg (1200x630)
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="purpleGlow" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#EEB8F9" stop-opacity="0.22" />
      <stop offset="60%" stop-color="#863BFF" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#0A0A0C" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="cornerGlow" cx="85%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#EEB8F9" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#0A0A0C" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-width="0.75" stroke-opacity="0.04" />
    </pattern>
  </defs>

  <!-- Deep Dark Studio Background -->
  <rect width="1200" height="630" fill="#0C0C0F" />
  
  <!-- Atmosphere glows -->
  <rect width="1200" height="630" fill="url(#purpleGlow)" />
  <rect width="1200" height="630" fill="url(#cornerGlow)" />

  <!-- Geometric Grid Texture -->
  <rect width="1200" height="630" fill="url(#grid)" />

  <!-- Outer frame border -->
  <rect x="30" y="30" width="1140" height="570" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />
  
  <!-- Frame corners -->
  <path d="M 24 45 L 24 24 L 45 24" fill="none" stroke="#EEB8F9" stroke-width="2" />
  <path d="M 1176 45 L 1176 24 L 1155 24" fill="none" stroke="#EEB8F9" stroke-width="2" />
  <path d="M 24 585 L 24 606 L 45 606" fill="none" stroke="#EEB8F9" stroke-width="2" />
  <path d="M 1176 585 L 1176 606 L 1155 606" fill="none" stroke="#EEB8F9" stroke-width="2" />

  <!-- Top bar metadata -->
  <text x="70" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="4" fill="#EEB8F9">
    / PORTFOLIO 2026 // UX • UI • CREATIVE DIRECTION
  </text>
  <text x="1130" y="80" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="#A0A0A5">
    PARIS, FR
  </text>
  <line x1="70" y1="105" x2="1130" y2="105" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

  <!-- Main Monogram Icon -->
  <g transform="translate(70, 160) scale(1.3)">
    <rect x="0" y="0" width="75" height="90" rx="14" fill="#18181D" stroke="#EEB8F9" stroke-opacity="0.3" stroke-width="1" />
    <g transform="translate(-1, 0)">
      <rect x="17" y="13.5" width="14" height="31.5" fill="#EEB8F9" />
      <rect x="58" y="13.5" width="13" height="71.5" fill="#EEB8F9" />
      <path d="M 17 58.5 H 58 V 71.5 H 31 V 85 H 17 Z" fill="#EEB8F9" />
    </g>
  </g>

  <!-- Big Typography: HASSEN ARKAB -->
  <text x="200" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Syne', sans-serif" font-size="64" font-weight="900" letter-spacing="-1.5" fill="#FFFFFF">
    HASSEN ARKAB
  </text>
  <text x="200" y="255" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700" letter-spacing="6" fill="#EEB8F9">
    UX/UI DESIGNER
  </text>

  <!-- Editorial Statement Divider -->
  <line x1="70" y1="320" x2="1130" y2="320" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

  <!-- Editorial quote motto -->
  <g transform="translate(70, 375)">
    <rect x="0" y="-30" width="4" height="60" fill="#EEB8F9" />
    <text x="24" y="-2" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#F4F4F0">
      “Everything starts with a line.”
    </text>
    <text x="24" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="300" fill="#95959E">
      Designing clear interfaces, solid visual systems and meaningful digital experiences.
    </text>
  </g>

  <!-- Visual Card Stack on Right side -->
  <g transform="translate(820, 360)">
    <rect x="0" y="0" width="310" height="170" rx="8" fill="#141419" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
    <rect x="15" y="15" width="280" height="2" fill="#EEB8F9" />
    <text x="20" y="45" font-family="monospace" font-size="11" letter-spacing="2" fill="#EEB8F9" font-weight="bold">
      SELECTED WORKS
    </text>
    <text x="20" y="75" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#EAEAEA" font-weight="600">
      • Groupe ADP — Corporate Interfaces
    </text>
    <text x="20" y="100" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#EAEAEA" font-weight="600">
      • Abercrombie &amp; Fitch — Rebrand
    </text>
    <text x="20" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#EAEAEA" font-weight="600">
      • Civic Vote • Okane • MUSE • Serinity
    </text>
    <text x="20" y="150" font-family="monospace" font-size="10" fill="#888892">
      + PLAYGROUND &amp; INTERESTS RADAR
    </text>
  </g>

  <!-- Bottom URL Bar -->
  <line x1="70" y1="550" x2="1130" y2="550" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />
  <text x="70" y="580" font-family="monospace" font-size="13" font-weight="700" letter-spacing="3" fill="#EEB8F9">
    HTTPS://WWW.HASSENARKAB.COM
  </text>
  <text x="1130" y="580" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#787882">
    © 2026 HASSEN ARKAB • ALL RIGHTS RESERVED
  </text>
</svg>`;

const ogSvgPath = path.join(publicDir, 'og-image.svg');
fs.writeFileSync(ogSvgPath, ogSvg.trim());

// Convert to public/og-image.jpg using sips
try {
  execSync(`sips -s format jpeg "${ogSvgPath}" --out "${path.join(publicDir, 'og-image.jpg')}"`);
  console.log('✓ Generated public/og-image.jpg (1200x630)');
} catch (e) {
  console.error('Failed sips for og-image.jpg:', e);
}
