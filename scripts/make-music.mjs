// Erzeugt einen lizenzfreien Spannungs-Track (120 BPM, a-Moll) als WAV.
// Aufruf: node scripts/make-music.mjs <sekunden> <ausgabe.wav>
// Aufbau: Riser + Snare-Wirbel bis INTRO, dann Drop mit Beat, Bass und Flächen.
import fs from 'fs';

const SR = 44100;
const LEN = Number(process.argv[2] ?? 96);
const OUT = process.argv[3] ?? 'music.wav';
const INTRO = 3; // Sekunden bis zum Drop
const BEAT = 0.5; // 120 BPM
const buf = new Float32Array(Math.ceil(LEN * SR));

let seed = 1;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (t, i, v) => {
  const n = Math.floor(t * SR) + i;
  if (n >= 0 && n < buf.length) buf[n] += v;
};
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);

const kick = (t, g = 1) => {
  let ph = 0;
  for (let i = 0; i < SR * 0.35; i++) {
    const x = i / SR;
    const f = 45 + 95 * Math.exp(-x * 30);
    ph += (2 * Math.PI * f) / SR;
    add(t, i, Math.sin(ph) * Math.exp(-x * 9) * 0.9 * g);
  }
};
const noiseHit = (t, dur, decay, g, hp = 0.6) => {
  let prev = 0;
  for (let i = 0; i < SR * dur; i++) {
    const n = rnd();
    const h = n - prev * hp; // einfacher Hochpass
    prev = n;
    add(t, i, h * Math.exp((-i / SR) * decay) * g);
  }
};
const clap = (t, g = 1) => {
  for (const o of [0, 0.012, 0.024]) noiseHit(t + o, 0.18, 22, 0.35 * g, 0.3);
};
const hat = (t, g = 1) => noiseHit(t, 0.05, 80, 0.12 * g, 0.95);

const saw = (t, dur, freq, g, cutoff, attack = 0.01, release = 0.1) => {
  let y = 0;
  const a = 1 - Math.exp((-2 * Math.PI * cutoff) / SR);
  for (let i = 0; i < SR * dur; i++) {
    const x = i / SR;
    let s = 0;
    for (const d of [-0.07, 0, 0.07]) s += ((x * freq * Math.pow(2, d / 12)) % 1) * 2 - 1;
    y += a * (s / 3 - y);
    const env = Math.min(1, x / attack) * Math.min(1, (dur - x) / release);
    add(t, i, y * env * g);
  }
};

// Akkorde: Am | F | Dm | E  (je 2 Takte = 8 Schläge)
const CHORDS = [
  [57, 60, 64],
  [53, 57, 60],
  [50, 53, 57],
  [52, 56, 59],
];
const ROOTS = [33, 29, 26, 28];

// Intro: Riser + Snare-Wirbel, der schneller wird
for (let i = 0; i < SR * INTRO; i++) {
  const x = i / SR;
  const p = x / INTRO;
  add(0, i, rnd() * 0.12 * p * p);
  add(0, i, Math.sin(2 * Math.PI * (200 + 1400 * p * p) * x) * 0.05 * p);
}
for (let t = 0; t < INTRO; ) {
  const p = t / INTRO;
  noiseHit(t, 0.08, 40, 0.1 + 0.25 * p, 0.3);
  t += 0.25 - 0.19 * p;
}

// Drop-Impact
kick(INTRO, 1.4);
noiseHit(INTRO, 1.2, 3, 0.25, 0.1);

const end = LEN - 2;
for (let b = 0; INTRO + b * BEAT < end; b++) {
  const t = INTRO + b * BEAT;
  const bar = Math.floor(b / 4);
  const chord = Math.floor(bar / 2) % 4;
  kick(t, b % 4 === 0 ? 1 : 0.75);
  if (b % 2 === 1) clap(t);
  hat(t + BEAT / 2);
  hat(t + BEAT / 4, 0.5);
  hat(t + (3 * BEAT) / 4, 0.5);
  // Bass in Achteln
  for (const o of [0, BEAT / 2]) saw(t + o, BEAT / 2 - 0.02, midi(ROOTS[chord]), 0.22, 380, 0.005, 0.05);
  // Fläche einmal pro zwei Takte
  if (b % 8 === 0) for (const n of CHORDS[chord]) saw(t, BEAT * 8, midi(n), 0.05, 1400, 0.4, 0.6);
}
kick(end, 1.2);
noiseHit(end, 2, 2.5, 0.2, 0.1);

// Normalisieren + weicher Limiter
let peak = 0;
for (const v of buf) peak = Math.max(peak, Math.abs(v));
const pcm = Buffer.alloc(buf.length * 2);
for (let i = 0; i < buf.length; i++) {
  const v = Math.tanh((buf[i] / peak) * 1.3) * 0.9;
  pcm.writeInt16LE(Math.round(v * 32767), i * 2);
}
const h = Buffer.alloc(44);
h.write('RIFF', 0);
h.writeUInt32LE(36 + pcm.length, 4);
h.write('WAVEfmt ', 8);
h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20);
h.writeUInt16LE(1, 22);
h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 2, 28);
h.writeUInt16LE(2, 32);
h.writeUInt16LE(16, 34);
h.write('data', 36);
h.writeUInt32LE(pcm.length, 40);
fs.writeFileSync(OUT, Buffer.concat([h, pcm]));
console.log(`geschrieben: ${OUT} (${LEN}s)`);
