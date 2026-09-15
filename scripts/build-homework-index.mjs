import fs from 'node:fs';
import { assertPublicPackagePrivacy } from './lib/public-package-privacy.mjs';

const base = 'public/homeworks';
fs.mkdirSync(base, { recursive: true });
const lessons = fs.readdirSync(base, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const homework = JSON.parse(fs.readFileSync(`${base}/${entry.name}/homework.json`, 'utf8'));
    if (homework.id !== entry.name) throw new Error('Folder / package identity mismatch');
    const item = { id: homework.id, date: homework.date, title: homework.title, subtitle: homework.subtitle, path: `homeworks/${homework.id}/homework.json` };
    assertPublicPackagePrivacy(item, `index entry ${homework.id}`);
    return item;
  })
  .sort((left, right) => right.date.localeCompare(left.date) || right.id.localeCompare(left.id));
const index = { lessons };
assertPublicPackagePrivacy(index, 'public homework index');
fs.writeFileSync(`${base}/index.json`, JSON.stringify(index, null, 2) + '\n');
console.log(`Indexed ${lessons.length} dated lesson(s).`);
