#!/bin/bash
# Capture website screenshot with 80% zoom - HIGH QUALITY
# Usage: ./scripts/capture_homepage.sh [URL] [OUTPUT_NAME]
#
# Examples:
#   ./scripts/capture_homepage.sh https://example.com
#   ./scripts/capture_homepage.sh http://localhost:5173
#   ./scripts/capture_homepage.sh https://example.com my-screenshot

URL="${1:-http://localhost:5173}"
OUTPUT_NAME="${2:-homepage}"
OUTPUT_DIR="static/assets/screenshots"
mkdir -p "$OUTPUT_DIR"

echo "📸 Capturing high-quality screenshot..."
echo "🌐 URL: $URL"
echo "📐 Viewport: 1280x720 (80% zoom)"
echo "⏱️  Wait: 2 seconds after page load"
echo "🎨 Quality: High (Retina 2x)"

# Capture with:
# --retina: Device scale factor of 2 (high quality)
# --wait 2000: Wait 2 seconds after page load
# --timeout 60000: 60 second timeout
# --javascript: Apply 80% zoom
shot-scraper "$URL" \
  --output "$OUTPUT_DIR/${OUTPUT_NAME}.png" \
  --width 1280 \
  --height 720 \
  --retina \
  --wait 2000 \
  --timeout 60000 \
  --javascript "document.body.style.zoom = '0.8'"

if [ -f "$OUTPUT_DIR/${OUTPUT_NAME}.png" ]; then
  SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}.png" | cut -f1)
  DIMS=$(identify -format "%wx%h" "$OUTPUT_DIR/${OUTPUT_NAME}.png" 2>/dev/null || echo "N/A")
  echo "✅ Screenshot saved to $OUTPUT_DIR/${OUTPUT_NAME}.png"
  echo "   Size: $SIZE | Dimensions: $DIMS"
else
  echo "❌ Screenshot failed"
  exit 1
fi
