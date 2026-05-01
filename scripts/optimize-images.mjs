/**
 * Image Optimization Script — EventPartner
 * Converts all JPG/JPEG to WebP with resize to max 1920px width.
 * Run with: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGE_DIR = path.resolve('public/Images');
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg'].includes(ext)) return null;

  const outputPath = filePath.replace(/\.(jpg|jpeg)$/i, '.webp');
  
  try {
    const metadata = await sharp(filePath).metadata();
    const originalSize = fs.statSync(filePath).size;

    await sharp(filePath)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✅ ${path.basename(filePath)} → ${path.basename(outputPath)} (${(originalSize/1024/1024).toFixed(1)}MB → ${(newSize/1024/1024).toFixed(1)}MB, -${savings}%)`);
    return { original: originalSize, optimized: newSize };
  } catch (err) {
    console.error(`❌ ${path.basename(filePath)}: ${err.message}`);
    return null;
  }
}

async function walkDir(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log(`\n🖼️  EventPartner Image Optimizer\n   Dir: ${IMAGE_DIR}\n   Max width: ${MAX_WIDTH}px | WebP quality: ${WEBP_QUALITY}\n${'─'.repeat(60)}\n`);

  const allFiles = await walkDir(IMAGE_DIR);
  const jpgFiles = allFiles.filter(f => /\.(jpg|jpeg)$/i.test(f));

  console.log(`Found ${jpgFiles.length} JPG/JPEG files to convert\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let converted = 0;

  for (const file of jpgFiles) {
    const result = await convertFile(file);
    if (result) {
      totalOriginal += result.original;
      totalOptimized += result.optimized;
      converted++;
    }
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`📊 Results: ${converted}/${jpgFiles.length} files converted`);
  console.log(`   Before: ${(totalOriginal/1024/1024).toFixed(1)} MB`);
  console.log(`   After:  ${(totalOptimized/1024/1024).toFixed(1)} MB`);
  console.log(`   Saved:  ${((totalOriginal - totalOptimized)/1024/1024).toFixed(1)} MB (${((1 - totalOptimized/totalOriginal) * 100).toFixed(1)}%)`);
  console.log(`\n⚠️  Next step: Update all src references from .jpg → .webp`);
}

main().catch(console.error);
