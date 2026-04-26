import { exec } from 'child_process';
import fs from 'fs';

type Config = {
  outputDir: string;
  type: string;
  fetcher: () => Promise<{ data: string; keys: string[] }>;
};

const entries: Config[] = [];

async function main() {
  for (const entry of entries) {
    const { data, keys } = await entry.fetcher();

    let types = `export const ${entry.type}s = [${keys
      .map((key) => `'${key}'`)
      .join(' , ')}] as const\n`;

    types += `
      export type ${entry.type} = typeof ${entry.type}s[number]
      export function is${entry.type}(
        key: string | ${entry.type}
      ): key is ${entry.type} {
        return ${entry.type}s.includes(key as ${entry.type})
      }
    `;

    fs.writeFileSync(`${entry.outputDir}/data.json`, data);
    fs.writeFileSync(`${entry.outputDir}/types.ts`, types);
    exec(`npx prettier --plugin-search-dir . --write ${entry.outputDir}`);
  }
}

main().catch(console.error);
