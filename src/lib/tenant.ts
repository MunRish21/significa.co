// Shared (server + client) types and helpers for tenant + section data.
// Keep this file free of `$env/static/private` imports so it can be imported
// from .svelte components. The actual data-fetching lives in tenant.server.ts.

export type SectionsMap = Record<
  string,
  { enabled: boolean; position: number; section_type: string; props: Record<string, unknown> }
>;

export type PageMeta = {
  title: string | null;
  description: string | null;
  meta: Record<string, unknown>;
};

/**
 * Returns true when the section should render. A missing entry in the map
 * defaults to enabled, so adding a new section in code without a DB row does
 * not silently hide it.
 */
export function isSectionEnabled(sections: SectionsMap, key: string): boolean {
  const s = sections[key];
  return s ? s.enabled : true;
}
