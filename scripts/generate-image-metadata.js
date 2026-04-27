#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ASSETS_DIR = path.join(__dirname, '..', 'static', 'assets', 'storyblok');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'lib', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'images.json');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imagesData = {};

function getImageDimensions(filePath) {
  try {
    const result = execSync(`identify -format "%wx%h" "${filePath}" 2>/dev/null`, {
      encoding: 'utf-8'
    }).trim();
    
    if (result) {
      const [width, height] = result.split('x').map(Number);
      return { width, height };
    }
  } catch (e) {
    // identify command failed
  }
  return { width: 0, height: 0 };
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return Math.round(stats.size / 1024 * 100) / 100;
  } catch (e) {
    return 0;
  }
}

// Scan all images
if (fs.existsSync(ASSETS_DIR)) {
  const files = fs.readdirSync(ASSETS_DIR).sort();
  
  files.forEach(filename => {
    const filePath = path.join(ASSETS_DIR, filename);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      const { width, height } = getImageDimensions(filePath);
      const fileSize = getFileSize(filePath);
      const ext = path.extname(filename).toLowerCase();
      
      imagesData[filename] = {
        path: `/assets/storyblok/${filename}`,
        width,
        height,
        size_kb: fileSize,
        format: ext
      };
      
      console.log(`✓ ${filename}: ${width}x${height} (${fileSize}KB)`);
    }
  });
} else {
  console.error(`Assets directory not found: ${ASSETS_DIR}`);
  process.exit(1);
}

// Write JSON file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(imagesData, null, 2));

console.log(`\n✅ Generated ${Object.keys(imagesData).length} image metadata entries`);
console.log(`📁 Saved to: ${OUTPUT_FILE}`);
