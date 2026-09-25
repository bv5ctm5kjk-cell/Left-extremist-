// Erzeugt SKRIPT-SACHSEN-ANHALT.md aus src/sachsen/script.ts.
import fs from 'fs';
import {CHAPTERS, SHOTS} from '../src/sachsen/script';

let words = 0;
let secs = 0;
let out = '# Skript: „Sachsen-Anhalt nach der Wahl“ (YouTube, 16:9)\n\n';
const body: string[] = [];
for (const ch of CHAPTERS) {
  const shots = SHOTS.filter((s) => s.chapter === ch.id && s.text);
  const t = SHOTS.filter((s) => s.chapter === ch.id).reduce((a, s) => a + s.seconds, 0);
  secs += t;
  words += shots.reduce((a, s) => a + s.text.split(/\s+/).length, 0);
  body.push(`## 🎙️ Aufnahme ${ch.nr + 1} – ${ch.nr === 0 ? '' : `Kapitel ${ch.nr}: `}${ch.title}\n\n` + shots.map((s) => s.text).join('\n\n'));
}
out += `Ca. ${Math.round(secs / 60 * 10) / 10} Minuten, ${words} Wörter. Eine Aufnahme pro Kapitel.\n\n`;
out += body.join('\n\n') + '\n';
fs.writeFileSync('SKRIPT-SACHSEN-ANHALT.md', out);
console.log(`${words} Wörter, ${secs.toFixed(0)} s`);
