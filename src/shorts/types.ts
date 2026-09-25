// Gemeinsame Bausteine für die Kurzvideos im Stil von Teil 2.
export const FPS = 30;

// Musik-Intro vor dem ersten gesprochenen Wort.
export const INTRO_SECONDS = 3;

export type Bg = 'rot' | 'blau' | 'nacht' | 'alarm' | 'spot' | 'gruen' | 'grau';

export type Shot = {
  id: string;
  bg: Bg;
  seconds: number;
  text: string;
};

// Eine Sprachaufnahme startet mit der genannten Einstellung.
export type VoicePart = {file: string; firstShot: string};

export const shotFrames = (seconds: number) => Math.round(seconds * FPS);
export const totalFrames = (shots: Shot[]) => shots.reduce((sum, s) => sum + shotFrames(s.seconds), 0);
