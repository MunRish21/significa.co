// See https://kit.svelte.dev/docs/types#app

import type { RecognitionEntryStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import type { Tenant } from '$lib/tenant.server';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      version: 'published' | 'draft';
      tenant: Tenant | null;
      hostname: string;
    }
    interface PageData {
      awards: ISbStoryData<RecognitionEntryStoryblok>[];
    }
    // interface Platform {}
  }
}

export {};
