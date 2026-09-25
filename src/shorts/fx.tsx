import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import type {Bg} from './types';
import {FPS, INTRO_SECONDS} from './types';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const BEAT_FRAMES = FPS / 2; // 120 BPM

// Pulsiert im Takt der Musik (ab dem Drop).
export const useBeat = (globalFrame: number) => {
  const f = globalFrame - INTRO_SECONDS * FPS;
  if (f < 0) return 0;
  return Math.exp(-(f % BEAT_FRAMES) / 4);
};

const PALETTE: Record<Bg, {a: string; b: string; base: string}> = {
  rot: {a: 'rgba(224,36,58,0.45)', b: 'rgba(120,10,30,0.35)', base: '#140a0d'},
  blau: {a: 'rgba(4,137,219,0.40)', b: 'rgba(20,40,120,0.40)', base: '#070d18'},
  nacht: {a: 'rgba(255,255,255,0.08)', b: 'rgba(224,36,58,0.12)', base: '#0b0c10'},
  alarm: {a: 'rgba(224,36,58,0.55)', b: 'rgba(245,197,24,0.18)', base: '#120608'},
  spot: {a: 'rgba(255,240,220,0.22)', b: 'rgba(224,36,58,0.15)', base: '#09090b'},
  gruen: {a: 'rgba(70,150,43,0.45)', b: 'rgba(20,80,40,0.35)', base: '#08120a'},
  grau: {a: 'rgba(180,180,190,0.22)', b: 'rgba(60,60,70,0.35)', base: '#0e0f12'},
};

export const Backdrop: React.FC<{bg: Bg; globalFrame: number}> = ({bg, globalFrame}) => {
  const frame = useCurrentFrame();
  const p = PALETTE[bg];
  const t = globalFrame / FPS;
  const beat = useBeat(globalFrame);
  const x1 = 30 + Math.sin(t * 0.6) * 30;
  const y1 = 30 + Math.cos(t * 0.45) * 20;
  const x2 = 70 + Math.cos(t * 0.5) * 30;
  const y2 = 70 + Math.sin(t * 0.4) * 20;
  return (
    <AbsoluteFill style={{background: p.base}}>
      {bg === 'spot' ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 45% 70% at ${50 + Math.sin(t) * 8}% 0%, ${p.a}, transparent 70%)`,
          }}
        />
      ) : (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at ${x1}% ${y1}%, ${p.a}, transparent 50%), radial-gradient(circle at ${x2}% ${y2}%, ${p.b}, transparent 50%)`,
          }}
        />
      )}
      {bg === 'alarm' ? (
        <AbsoluteFill
          style={{
            opacity: 0.12 + beat * 0.1,
            backgroundImage:
              'repeating-linear-gradient(135deg, #e0243a 0 40px, transparent 40px 110px)',
            backgroundPosition: `${frame * 4}px 0`,
          }}
        />
      ) : (
        <AbsoluteFill
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
            backgroundPosition: `0 ${(globalFrame * 0.8) % 90}px`,
          }}
        />
      )}
      <AbsoluteFill style={{background: '#fff', opacity: beat * 0.035}} />
      <AbsoluteFill
        style={{background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)'}}
      />
    </AbsoluteFill>
  );
};

export type TransitionKind = 'zoom' | 'slideLeft' | 'slideUp' | 'glitch' | 'punch';
export const KINDS: TransitionKind[] = ['zoom', 'slideLeft', 'glitch', 'slideUp', 'punch'];

// Ein- und Ausstieg jeder Einstellung, je nach Übergangsart.
export const ShotFx: React.FC<{
  kind: TransitionKind;
  duration: number;
  children: React.ReactNode;
}> = ({kind, duration, children}) => {
  const frame = useCurrentFrame();
  const e = interpolate(frame, [0, 9], [0, 1], {...clamp, easing: (x) => 1 - Math.pow(1 - x, 3)});
  const x = interpolate(frame, [duration - 5, duration], [0, 1], clamp);
  const drift = interpolate(frame, [0, duration], [1, 1.04]);
  let transform = `scale(${drift})`;
  let filter: string | undefined;
  let opacity = Math.min(1, e * 1.5) * (1 - x * 0.7);
  switch (kind) {
    case 'zoom':
      transform = `scale(${drift * interpolate(e, [0, 1], [1.25, 1]) * (1 + x * 0.1)})`;
      filter = `blur(${(1 - e) * 16 + x * 10}px)`;
      break;
    case 'slideLeft':
      transform = `translateX(${(1 - e) * 1080 - x * 200}px) scale(${drift})`;
      break;
    case 'slideUp':
      transform = `translateY(${(1 - e) * 700 - x * 150}px) scale(${drift})`;
      break;
    case 'punch':
      transform = `scale(${drift * interpolate(e, [0, 0.6, 1], [0.6, 1.08, 1])})`;
      opacity = Math.min(1, e * 3) * (1 - x * 0.7);
      break;
    case 'glitch': {
      const g = frame < 8 ? 1 - frame / 8 : x;
      const dx = (random(`gx${frame}`) - 0.5) * 60 * g;
      transform = `translateX(${dx}px) scale(${drift})`;
      filter = g > 0.05 ? `drop-shadow(${12 * g}px 0 0 rgba(255,0,60,0.8)) drop-shadow(${-12 * g}px 0 0 rgba(0,200,255,0.8))` : undefined;
      opacity = frame < 8 && random(`go${frame}`) < 0.25 ? 0.3 : 1 - x * 0.7;
      break;
    }
  }
  return <AbsoluteFill style={{transform, filter, opacity}}>{children}</AbsoluteFill>;
};

export const Flash: React.FC<{color: string}> = ({color}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 2, 8], [0.5, 0.3, 0], clamp);
  return <AbsoluteFill style={{background: color, opacity: o, mixBlendMode: 'screen'}} />;
};
