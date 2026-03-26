import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import * as Sentry from '@sentry/sveltekit';
import { PUBLIC_SENTRY_DNS, PUBLIC_SENTRY_ENVIRONMENT } from '$env/static/public';

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
  // Note: https://www.storyblok.com/docs/guide/essentials/visual-editor#visual-editor-preview
  if (event.locals.version === 'draft') {
    response.headers.set('X-Frame-Options', 'ALLOW-FROM storyblok.com');
  }

  return response;
};

export const handle = sequence(validateDraftMode, Sentry.sentryHandle());

import * as fs from 'fs';
const sentryHandler = Sentry.handleErrorWithSentry();
export const handleError = ({ error, event, status, message }) => {
  try {
    fs.writeFileSync('c:/work/techyor/server_error.log', error?.stack || String(error));
  } catch(e) {
    console.error("Failed to write log", e);
  }
  // @ts-ignore
  return sentryHandler({ error, event, status, message });
};
