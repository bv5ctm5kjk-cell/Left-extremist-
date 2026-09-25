import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {C} from './theme';

export const useIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 200}});
};

export const FadeUp: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({delay = 0, children, style}) => {
  const p = useIn(delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Kicker: React.FC<{children: React.ReactNode; color?: string}> = ({
  children,
  color = C.linke,
}) => {
  const p = useIn(2);
  return (
  <div
    style={{
      clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
      display: 'inline-block',
      background: color,
      color: '#fff',
      fontSize: 34,
      fontWeight: 800,
      letterSpacing: 3,
      textTransform: 'uppercase',
      padding: '10px 22px',
      borderRadius: 6,
    }}
  >
    {children}
  </div>
  );
};

export const Headline: React.FC<{children: React.ReactNode; size?: number}> = ({
  children,
  size = 88,
}) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 900,
      lineHeight: 1.05,
      color: C.text,
      marginTop: 28,
    }}
  >
    {children}
  </div>
);

export const Source: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{fontSize: 26, color: C.muted, marginTop: 36}}>
    Quelle: {children}
  </div>
);

export const CountUp: React.FC<{
  to: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
}> = ({to, delay = 0, decimals = 0, suffix = ''}) => {
  const p = useIn(delay);
  const value = (to * p).toLocaleString('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <>
      {value}
      {suffix}
    </>
  );
};
