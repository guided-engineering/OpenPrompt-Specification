// Release preflight: CHANGELOG.md must have a section, with at least one
// entry, for the version that package.json names.
import { readFileSync } from 'node:fs';

const read = (name) => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const { version } = JSON.parse(read('package.json'));
const lines = read('CHANGELOG.md').split(/\r?\n/);

const isHeading = (line) => line.startsWith('## ');
const fail = (message) => {
  console.error(`preflight: FAILED - ${message}`);
  process.exit(1);
};

const start = lines.findIndex((line) => isHeading(line) && line.slice(3).trim().split(/\s+/)[0] === version);
if (start === -1) fail(`CHANGELOG.md has no section for ${version}`);

let entries = 0;
for (const line of lines.slice(start + 1)) {
  if (isHeading(line)) break;
  if (/^\s*[-*]\s+\S/.test(line)) entries += 1;
}
if (entries === 0) fail(`the ${version} section of CHANGELOG.md has no entry`);

console.log(`preflight: ok - CHANGELOG.md describes ${version}`);
