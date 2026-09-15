import { readdir, readFile } from 'node:fs/promises';
import { assertAysenurArchitectureV1Package } from './lib/architecture-v1-package.mjs';
import { assertPublicPackagePrivacy } from './lib/public-package-privacy.mjs';

const root = 'public/homeworks';
const index = JSON.parse(await readFile(`${root}/index.json`, 'utf8'));
if (!Array.isArray(index.lessons)) throw new Error('Public homework index must contain a lessons array');
assertPublicPackagePrivacy(index, 'public homework index');
const directories = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory());
if (directories.length !== index.lessons.length) throw new Error('Public homework index must include every package directory');
for (const entry of index.lessons) {
  const pkg = JSON.parse(await readFile(`${root}/${entry.id}/homework.json`, 'utf8'));
  assertPublicPackagePrivacy(pkg, `public package ${entry.id}`);
  assertAysenurArchitectureV1Package(pkg, `public package ${entry.id}`);
}
console.log(`Validated public privacy boundary and ${index.lessons.length} Ayşenur package(s).`);
