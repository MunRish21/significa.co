#!/usr/bin/env python3
import os
import json
from pathlib import Path
from PIL import Image

# Define paths
ASSETS_DIR = Path(__file__).parent.parent / 'static' / 'assets' / 'storyblok'
OUTPUT_FILE = Path(__file__).parent.parent / 'src' / 'lib' / 'data' / 'images.json'

# Create output directory if it doesn't exist
OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

images_data = {}

def get_image_dimensions(file_path):
    """Get image dimensions using PIL"""
    try:
        img = Image.open(file_path)
        width, height = img.size
        return width, height
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None, None

def get_file_size(file_path):
    """Get file size in KB"""
    try:
        size_bytes = os.path.getsize(file_path)
        size_kb = size_bytes / 1024
        return round(size_kb, 2)
    except Exception as e:
        print(f"Error getting size for {file_path}: {e}")
        return 0

# Scan all images in the assets directory
if ASSETS_DIR.exists():
    for image_file in sorted(ASSETS_DIR.iterdir()):
        if image_file.is_file():
            filename = image_file.name
            width, height = get_image_dimensions(image_file)
            file_size = get_file_size(image_file)
            
            images_data[filename] = {
                "path": f"/assets/storyblok/{filename}",
                "width": width,
                "height": height,
                "size_kb": file_size,
                "format": image_file.suffix.lower()
            }
            
            print(f"✓ {filename}: {width}x{height} ({file_size}KB)")
else:
    print(f"Assets directory not found: {ASSETS_DIR}")

# Write to JSON file
with open(OUTPUT_FILE, 'w') as f:
    json.dump(images_data, f, indent=2)

print(f"\n✅ Generated {len(images_data)} image metadata entries")
print(f"📁 Saved to: {OUTPUT_FILE}")
