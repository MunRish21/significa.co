import type { AssetStoryblok, MultiassetStoryblok, MultilinkStoryblok } from '$types/bloks';
import { sanitizeSlug } from './paths';
import imagesData from '$lib/data/images.json';

export function getAnchorFromCmsLink(link: MultilinkStoryblok | undefined) {
  const attributes: {
    href?: string;
    rel?: string;
    target?: '_blank';
    custom?: Record<string, string>;
  } = {};

  switch (link?.linktype) {
    case 'story': {
      if ('story' in link && link.story?.full_slug) {
        attributes.href = sanitizeSlug(link.story.full_slug);
      } else if (link.cached_url) {
        attributes.href = sanitizeSlug(link.cached_url);
      }
      break;
    }
    case 'email': {
      attributes.href = `mailto:${link.email}`;
      break;
    }
    default: {
      const href = link?.url || link?.cached_url || undefined;
      attributes.href = href;

      if (href && href.startsWith('http')) {
        attributes.target = '_blank';
        attributes.rel = 'noopener noreferrer';
      }

      break;
    }
  }

  return attributes;
}

export interface ImageAttributesOptions {
  size: number[];
  fitIn: boolean;
  fill: string | 'transparent';
  format: 'webp' | 'jpeg' | 'png';
  quality: number;
  smart: boolean;
  focal: Record<'left' | 'top' | 'right' | 'bottom', string>;
  grayscale: boolean;
  blur: number;
  rotate: 90 | 180 | 270;
  flip: 'horizontal' | 'vertical' | 'both';
  brightness: number;
  roundCorner: {
    radius: number;
    rgb?: number[];
    transparency?: number;
  };
}

export type ImageAttributes = {
  alt: string;
  title?: string;
  src: string;
  width: string;
  height: string;
};

export function getImageAttributes(
  image: AssetStoryblok | MultiassetStoryblok[number],
  options?: Partial<ImageAttributesOptions>
): ImageAttributes {
  let src = image.filename;
  const filename = src.split('/').pop() || '';
  
  const imageData = imagesData[filename as keyof typeof imagesData];
  const width = imageData?.width ? String(imageData.width) : '0';
  const height = imageData?.height ? String(imageData.height) : '0';
  
  const alt = image.alt || image.name || '';
  const title = image.title;

  return {
    alt,
    title: title || undefined,
    src,
    width,
    height
  };
}
