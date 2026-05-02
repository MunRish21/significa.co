import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const validateDraftMode: Handle = async ({ event, resolve }) => {
  event.locals.version = event.cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';

  const response = await resolve(event);
  return response;
};

export const handle = sequence(validateDraftMode);

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export const handleError = ({ error }) => {
  try {
    const logPath = path.join(os.tmpdir(), 'server_error.log');
    fs.writeFileSync(logPath, error?.stack || String(error));
  } catch (e) {
    console.error('Failed to write log', e);
  }
};
