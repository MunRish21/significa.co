import type { HttpError } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const isStatusError = (err: unknown): err is { status: number } => {
  return (
    typeof err === 'object' && err !== null && 'status' in err && typeof err.status === 'number'
  );
};

export const handleStoryblokError = <T>(err: T): T | HttpError => {
  console.error('[Content Error]', err);
  if (isStatusError(err) && err.status === 404) {
    return error(404, 'Content not found');
  }
  return err;
};
