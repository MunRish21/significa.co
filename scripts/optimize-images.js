import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Source directories to scan
const SOURCE_DIRS = [
  { dir: path.join(projectRoot, 'static', 'assets'), urlPrefix: '/assets' },
  { dir: path.join(projectRoot, 'src', 'assets'), urlPrefix: '/src/assets' }
];

const outputBase = path.join(projectRoot, 'static', '_optimized');
const manifestPath = path.join(projectRoot, 'src', 'lib', 'data', 'image-manifest.json');

// Responsive widths
const RESPONSIVE_SIZES = [320, 480, 640, 768, 1024, 1280, 1600, 1920];

// Quality settings
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 65;
const JPG_QUALITY = 82;

const imageManifest = {};
const stats = {
  processed: 0,
  skipped: 0,
  failed: 0,
  originalSize: 0,
  optimizedSize: 0
};

// Load existing manifest so we can reuse entries for unchanged images
let existingManifest = {};
if (fs.existsSync(manifestPath)) {
  try {
    existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch {
    existingManifest = {};
  }
}

// Ensure output directory exists
if (!fs.existsSync(outputBase)) {
  fs.mkdirSync(outputBase, { recursive: true });
}

const imageExtensions = ['.jpg', '.jpeg', '.png'];

function walkDir(dir, allFiles = []) {
  if (!fs.existsSync(dir)) return allFiles;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Skip output dir to prevent recursion
      if (filePath === outputBase) return;
      walkDir(filePath, allFiles);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        allFiles.push(filePath);
      }
    }
  });
  return allFiles;
}

async function processImage(imagePath, sourceDir, urlPrefix) {
  const relativePath = path.relative(sourceDir, imagePath);
  const fileName = path.parse(imagePath).name;
  const ext = path.extname(imagePath);
  const dirName = path.dirname(relativePath);
  const outputSubDir = path.join(outputBase, urlPrefix.replace(/^\//, ''), dirName);

  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }

  try {
    const userUrl = `${urlPrefix}/${relativePath}`.replace(/\\/g, '/').replace(/\/+/g, '/');
    const sourceMtime = fs.statSync(imagePath).mtimeMs;
    const cachedEntry = existingManifest[userUrl];

    // Fast-path: if we have a manifest entry and all expected output files exist
    // and are newer than the source, skip re-encoding entirely.
    if (cachedEntry && cachedEntry.sizes && cachedEntry.width) {
      const expectedFiles = [];
      for (const width of cachedEntry.sizes) {
        const sizedName = `${fileName}-w${width}`;
        expectedFiles.push(
          path.join(outputSubDir, `${sizedName}.webp`),
          path.join(outputSubDir, `${sizedName}.avif`),
          path.join(outputSubDir, `${sizedName}${ext}`)
        );
      }

      const allFresh = expectedFiles.every((p) => {
        if (!fs.existsSync(p)) return false;
        return fs.statSync(p).mtimeMs >= sourceMtime;
      });

      if (allFresh) {
        imageManifest[userUrl] = cachedEntry;
        stats.skipped++;
        return;
      }
    }

    const inputBuffer = fs.readFileSync(imagePath);
    const originalSize = inputBuffer.length;
    stats.originalSize += originalSize;

    const image = sharp(inputBuffer);
    const metadata = await image.metadata();
    const originalWidth = metadata.width || 1600;
    const originalHeight = metadata.height || 1200;
    const aspectRatio = originalHeight / originalWidth;

    const srcset = { webp: [], avif: [], original: [] };
    let totalOptimized = 0;

    // Filter sizes to only those at or below original width
    const targetSizes = RESPONSIVE_SIZES.filter((w) => w <= originalWidth);
    if (targetSizes.length === 0) targetSizes.push(originalWidth);

    const urlBase = `/_optimized${urlPrefix}/${dirName === '.' ? '' : dirName + '/'}`;

    for (const width of targetSizes) {
      const height = Math.round(width * aspectRatio);
      const sizedName = `${fileName}-w${width}`;

      // WebP
      const webpPath = path.join(outputSubDir, `${sizedName}.webp`);
      await sharp(inputBuffer)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(webpPath);
      totalOptimized += fs.statSync(webpPath).size;

      // AVIF
      const avifPath = path.join(outputSubDir, `${sizedName}.avif`);
      await sharp(inputBuffer)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .avif({ quality: AVIF_QUALITY, effort: 4 })
        .toFile(avifPath);
      totalOptimized += fs.statSync(avifPath).size;

      // Original format (compressed)
      const originalPath = path.join(outputSubDir, `${sizedName}${ext}`);
      const sharpInstance = sharp(inputBuffer).resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });

      if (ext === '.png') {
        await sharpInstance.png({ quality: 85, compressionLevel: 9 }).toFile(originalPath);
      } else {
        await sharpInstance.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(originalPath);
      }
      totalOptimized += fs.statSync(originalPath).size;

      const cleanUrlBase = urlBase.replace(/\/+/g, '/');
      srcset.webp.push(`${cleanUrlBase}${sizedName}.webp ${width}w`);
      srcset.avif.push(`${cleanUrlBase}${sizedName}.avif ${width}w`);
      srcset.original.push(`${cleanUrlBase}${sizedName}${ext} ${width}w`);
    }

    stats.optimizedSize += totalOptimized;
    stats.processed++;

    imageManifest[userUrl] = {
      srcset,
      width: originalWidth,
      height: originalHeight,
      sizes: targetSizes
    };

    const savedPercent = Math.round((1 - totalOptimized / (originalSize * 3)) * 100);
    console.log(
      `✓ ${userUrl} → ${targetSizes.length} sizes (${formatBytes(originalSize)} → ${formatBytes(totalOptimized / 3)} avg/format, ~${savedPercent}% smaller)`
    );
  } catch (error) {
    stats.failed++;
    console.error(`✗ Failed: ${imagePath} - ${error.message}`);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  const startTime = Date.now();

  // Collect all images
  const allImages = [];
  for (const { dir, urlPrefix } of SOURCE_DIRS) {
    const files = walkDir(dir);
    files.forEach((f) => allImages.push({ path: f, sourceDir: dir, urlPrefix }));
  }

  console.log(`Found ${allImages.length} images to process\n`);

  // Process in batches of 5 to avoid overwhelming the system
  const BATCH_SIZE = 5;
  for (let i = 0; i < allImages.length; i += BATCH_SIZE) {
    const batch = allImages.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((img) => processImage(img.path, img.sourceDir, img.urlPrefix)));
  }

  // Save manifest
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(imageManifest, null, 2));

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n📊 Optimization Summary');
  console.log('─'.repeat(50));
  console.log(`✓ Processed:     ${stats.processed} images`);
  console.log(`⏭  Skipped:       ${stats.skipped} images (cached)`);
  console.log(`✗ Failed:        ${stats.failed} images`);
  console.log(`📦 Original size: ${formatBytes(stats.originalSize)}`);
  console.log(`📦 Optimized:     ${formatBytes(stats.optimizedSize)} (3 formats × ${RESPONSIVE_SIZES.length} sizes)`);
  console.log(`⏱️  Time:          ${elapsed}s`);
  console.log(`📋 Manifest:      src/lib/data/image-manifest.json`);
}

main().catch(console.error);
