import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {C} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Ein-/Ausblendung pro Szene: Zoom + Unschärfe rein, kurzer Push raus,
// dazu eine langsame Kamerafahrt über die ganze Szene.
export const SceneFx: React.FC<{duration: number; children: React.ReactNode}> = ({
  duration,
  children,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 10], [0, 1], clamp);
  const exit = interpolate(frame, [duration - 6, duration], [0, 1], clamp);
  const drift = interpolate(frame, [0, duration], [1, 1.035]);
  const scale = drift * interpolate(enter, [0, 1], [1.12, 1]) * (1 + exit * 0.06);
  const blur = (1 - enter) * 14 + exit * 10;
  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(enter * 1.4, 1 - exit * 0.8),
        transform: `scale(${scale})`,
        filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Blitz bei jedem Schnitt.
export const CutFlash: React.FC<{color?: string}> = ({color = '#ffffff'}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 2, 9], [0.55, 0.35, 0], clamp);
  return <AbsoluteFill style={{background: color, opacity: o, mixBlendMode: 'screen'}} />;
};

// Animierter Hintergrund: wandernde Farbflächen, Raster, Vignette, Filmkorn.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const x1 = 30 + Math.sin(t * 0.35) * 25;
  const y1 = 25 + Math.cos(t * 0.27) * 15;
  const x2 = 70 + Math.cos(t * 0.31) * 25;
  const y2 = 75 + Math.sin(t * 0.22) * 15;
  const gridShift = (frame * 0.6) % 90;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${x1}% ${y1}%, rgba(224,36,58,0.28), transparent 45%),
            radial-gradient(circle at ${x2}% ${y2}%, rgba(4,137,219,0.16), transparent 45%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
          backgroundPosition: `0 ${gridShift}px`,
        }}
      />
      <AbsoluteFill
        style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)'}}
      />
    </AbsoluteFill>
  );
};

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(random(`grain-${Math.floor(frame / 2)}`) * 1000);
  return (
    <AbsoluteFill style={{opacity: 0.09, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'rgba(255,255,255,0.1)'}}>
      <div style={{height: '100%', width: `${(frame / durationInFrames) * 100}%`, background: C.linke}} />
    </div>
  );
};

// Leichtes Wackeln für den Moment mit dem Impact-Sound.
export const useShake = (start: number, length = 12, strength = 14) => {
  const frame = useCurrentFrame();
  const f = frame - start;
  if (f < 0 || f > length) return 'none';
  const decay = 1 - f / length;
  const dx = (random(`sx${f}`) - 0.5) * 2 * strength * decay;
  const dy = (random(`sy${f}`) - 0.5) * 2 * strength * decay;
  return `translate(${dx}px, ${dy}px)`;
};
