export interface OptimizedImage {
  webp: string;
  avif: string;
  original: string;
}

export function getOptimizedImage(imagePath: string): OptimizedImage {
  const basePath = imagePath.replace(/\.[^/.]+$/, ''); // Remove extension

  return {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
    original: imagePath
  };
}

export function getImageSrcSet(imagePath: string): string {
  const optimized = getOptimizedImage(imagePath);
  return `${optimized.avif} 1x`;
}
