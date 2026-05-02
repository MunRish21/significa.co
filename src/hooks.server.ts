import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import * as Sentry from '@sentry/sveltekit';
import { PUBLIC_SENTRY_DNS, PUBLIC_SENTRY_ENVIRONMENT } from '$env/static/public';
import imageManifest from '$lib/data/image-manifest.json';

if (!dev) {
  Sentry.init({
    environment: PUBLIC_SENTRY_ENVIRONMENT || 'unknown-environment',
    dsn: PUBLIC_SENTRY_DNS,
    tracesSampleRate: 0.0
  });
}

const validateDraftMode: Handle = async ({ event, resolve }) => {
  event.locals.version = event.cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';

  const response = await resolve(event);
  return response;
};

type ManifestEntry = {
  srcset: { webp: string[]; avif: string[]; original: string[] };
  width: number;
  height: number;
};
const manifest = imageManifest as Record<string, ManifestEntry>;

// Rewrite <img src="/assets/..."> to <picture> with srcset for responsive optimized images
const optimizeImageTags: Handle = async ({ event, resolve }) => {
  return resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace(
        /<img\b([^>]*?)\ssrc=["'](\/assets\/[^"']+\.(?:png|jpg|jpeg))["']([^>]*?)\/?>/gi,
        (match, before, src, after) => {
          const meta = manifest[src];
          if (!meta) return match;

          const attrs = (before + ' ' + after).trim();
          const hasSizes = /\bsizes=/i.test(attrs);
          const sizesAttr = hasSizes ? '' : ' sizes="(max-width: 768px) 100vw, 50vw"';
          const fallback = meta.srcset.original[meta.srcset.original.length - 1].split(' ')[0];

          return `<picture><source type="image/avif" srcset="${meta.srcset.avif.join(', ')}"${sizesAttr ? ' sizes="(max-width: 768px) 100vw, 50vw"' : ''}><source type="image/webp" srcset="${meta.srcset.webp.join(', ')}"${sizesAttr ? ' sizes="(max-width: 768px) 100vw, 50vw"' : ''}><img ${attrs} src="${fallback}" srcset="${meta.srcset.original.join(', ')}"${sizesAttr}></picture>`;
        }
      );
    }
  });
};

export const handle = sequence(validateDraftMode, optimizeImageTags, Sentry.sentryHandle());

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const sentryHandler = Sentry.handleErrorWithSentry();
export const handleError = ({ error, event, status, message }) => {
  try {
    const logPath = path.join(os.tmpdir(), 'server_error.log');
    fs.writeFileSync(logPath, error?.stack || String(error));
  } catch(e) {
    console.error("Failed to write log", e);
  }
  // @ts-ignore
  return sentryHandler({ error, event, status, message });
};
