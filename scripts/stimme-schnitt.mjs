// Setzt die Stimme eines langen Videos nach Schnittliste (edl.json) zusammen.
// Aufruf: node scripts/stimme-schnitt.mjs <edl.json> <aufnahmen-ordner> <ausgabe-ordner> <timing.json>
// Pro Kapitel entsteht <ausgabe>/stimme-<kapitel>.mp3; timing.json enthält die Dauer
// jeder Einstellung in Sekunden (nach Tempo-Anpassung, inklusive Pause danach).
import {execFileSync} from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const [edlPath, inDir, outDir, timingPath] = process.argv.slice(2);
const FF = process.env.FFMPEG ?? 'ffmpeg';
const TEMPO = 1.06;
const GAP = 0.22; // Pause nach jedem Stück (vor Tempo)
const TAIL = 0.35; // zusätzliche Pause am Kapitelende

const edl = JSON.parse(fs.readFileSync(edlPath, 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'schnitt-'));
const timing = {};
fs.mkdirSync(outDir, {recursive: true});

for (const [chapter, shots] of Object.entries(edl)) {
  if (chapter.startsWith('_')) continue;
  const inputs = [];
  const filters = [];
  let n = 0;
  const entries = Object.entries(shots);
  entries.forEach(([shot, pieces], si) => {
    let raw = 0;
    for (const [file, s, e] of pieces) {
      inputs.push('-ss', String(s), '-to', String(e), '-i', path.join(inDir, `aufnahme-${file}.m4a`));
      filters.push(`[${n}:a]aresample=44100,aformat=channel_layouts=mono,afade=t=in:d=0.02,afade=t=out:st=${(e - s - 0.04).toFixed(3)}:d=0.04,apad=pad_dur=${GAP}[p${n}]`);
      raw += e - s + GAP;
      n++;
    }
    if (si === entries.length - 1) raw += TAIL;
    timing[shot] = Math.round((raw / TEMPO) * 100) / 100;
  });
  const last = n - 1;
  filters[last] = filters[last].replace(`pad_dur=${GAP}`, `pad_dur=${GAP + TAIL}`);
  const chain = [
    'highpass=f=85',
    `atempo=${TEMPO}`,
    'equalizer=f=200:t=q:w=1:g=-2',
    'equalizer=f=3200:t=q:w=1.2:g=4',
    'equalizer=f=9000:t=h:w=0.7:g=2',
    'acompressor=threshold=-22dB:ratio=4:attack=5:release=80:makeup=6',
    'loudnorm=I=-14:TP=-1:LRA=7',
    'alimiter=limit=0.95',
  ].join(',');
  const concat = `${Array.from({length: n}, (_, i) => `[p${i}]`).join('')}concat=n=${n}:v=0:a=1,${chain}[out]`;
  const out = path.join(outDir, `stimme-${chapter}.mp3`);
  execFileSync(FF, ['-hide_banner', '-loglevel', 'error', '-y', ...inputs, '-filter_complex', [...filters, concat].join(';'), '-map', '[out]', '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '192k', out]);
  console.log(`${chapter}: ${n} Stücke → ${out}`);
}
fs.writeFileSync(timingPath, JSON.stringify(timing, null, 1));
fs.rmSync(tmp, {recursive: true, force: true});
