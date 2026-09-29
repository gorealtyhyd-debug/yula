// Turns Next.js static export (out/) into a Hostinger-ready dist/:
//   dist/index.html, dist/404.html, dist/assets/**, dist/.htaccess, sitemap.xml, robots.txt, llms.txt
import { existsSync, rmSync, renameSync, readdirSync, statSync, readFileSync, writeFileSync, copyFileSync, cpSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
const DIST = 'dist';

if (!existsSync(OUT)) {
  console.error('✗ out/ not found — did `next build` run with output: "export"?');
  process.exit(1);
}

rmSync(DIST, { recursive: true, force: true });
renameSync(OUT, DIST);

// Move Next's /_next/* bundle into /assets/* (merges with /assets/images)
const nextDir = join(DIST, '_next');
if (existsSync(nextDir)) {
  cpSync(nextDir, join(DIST, 'assets'), { recursive: true });
  rmSync(nextDir, { recursive: true, force: true });
}

// Rewrite every reference from /_next/ to /assets/
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const TEXT = ['.html', '.js', '.css', '.txt', '.json', '.webmanifest', '.xml'];
let rewritten = 0;
for (const file of walk(DIST)) {
  if (!TEXT.some((e) => file.endsWith(e))) continue;
  const src = readFileSync(file, 'utf8');
  if (src.includes('/_next/')) {
    writeFileSync(file, src.split('/_next/').join('/assets/'));
    rewritten++;
  }
}

copyFileSync('.htaccess', join(DIST, '.htaccess'));

console.log(`✓ dist/ ready (${rewritten} files rewritten). Upload the CONTENTS of dist/ to public_html on Hostinger.`);
