import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { resolveTenant } from '$lib/tenant.server';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const validateDraftMode: Handle = async ({ event, resolve }) => {
  event.locals.version = event.cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';

  const response = await resolve(event);
  return response;
};

const attachTenant: Handle = async ({ event, resolve }) => {
  const hostname = event.url.hostname;
  event.locals.hostname = hostname;
  try {
    event.locals.tenant = await resolveTenant(hostname);
  } catch (err) {
    console.error('[tenant] failed to resolve tenant', err);
    event.locals.tenant = null;
  }
  return resolve(event);
};

export const handle = sequence(validateDraftMode, attachTenant);

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
