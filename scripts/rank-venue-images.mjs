/**
 * Rank venue images by quality (file size as proxy for resolution)
 * and create a best-5 mapping per country.
 * 
 * Creates venue-best-1.jpg through venue-best-5.jpg as copies
 * of the 5 highest-quality images per country.
 */

import fs from 'fs';
import path from 'path';

const VENUES_DIR = path.resolve('public/Images/venues');

function processCountry(countryDir) {
  const slug = path.basename(countryDir);
  
  // Get all venue images
  const files = fs.readdirSync(countryDir)
    .filter(f => f.startsWith('venue-') && !f.startsWith('venue-best-') && /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map(f => ({
      name: f,
      path: path.join(countryDir, f),
      size: fs.statSync(path.join(countryDir, f)).size,
    }))
    .sort((a, b) => b.size - a.size); // Sort by file size descending (best quality first)

  if (files.length === 0) return null;

  // Pick top 5 (or fewer if not enough)
  const best = files.slice(0, 5);

  // Copy as venue-best-N.jpg
  best.forEach((file, i) => {
    const dest = path.join(countryDir, `venue-best-${i + 1}.jpg`);
    fs.copyFileSync(file.path, dest);
  });

  return { slug, count: best.length, sizes: best.map(f => `${Math.round(f.size/1024)}KB`) };
}

// Main
const dirs = fs.readdirSync(VENUES_DIR)
  .filter(d => {
    const full = path.join(VENUES_DIR, d);
    return fs.statSync(full).isDirectory() && !d.startsWith('_') && !d.startsWith('175');
  });

console.log(`📸 Processing ${dirs.length} countries...\n`);

let processed = 0;
for (const dir of dirs) {
  const result = processCountry(path.join(VENUES_DIR, dir));
  if (result) {
    processed++;
    console.log(`✅ ${result.slug} — ${result.count} best images (${result.sizes.join(', ')})`);
  }
}

console.log(`\n✨ Done! ${processed} countries processed with best-quality images.`);
