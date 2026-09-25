// Rendert Kontroll-Standbilder: node scripts/stills.mjs <Komposition> <ausgabe-ordner> <name:frame ...>
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';

const [id, outDir, ...specs] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_BROWSER;
const composition = await selectComposition({serveUrl, id, browserExecutable});
for (const spec of specs) {
  const [name, frame] = spec.split(':');
  await renderStill({composition, serveUrl, frame: Number(frame), output: path.join(outDir, `${name}.jpg`), imageFormat: 'jpeg', scale: 0.3, browserExecutable});
}
console.log(`${specs.length} Standbilder`);
