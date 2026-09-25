// Bildvorlagen für lange YouTube-Videos im Querformat (1920×1080).
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CountUp, FadeUp, Kicker, useIn} from '../components';
import {useShake} from '../effects';
import {C} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const P = {
  afd: '#009ee0',
  cdu: '#3a3a42',
  spd: '#e3000f',
  gruene: '#46962b',
  linke: '#be3075',
  bsw: '#8a2b5a',
  fdp: '#ffed00',
};

export const Page: React.FC<{children: React.ReactNode; center?: boolean; style?: React.CSSProperties}> = ({
  children,
  center,
  style,
}) => (
  <AbsoluteFill
    style={{
      padding: '110px 170px 230px',
      justifyContent: 'center',
      alignItems: center ? 'center' : undefined,
      textAlign: center ? 'center' : undefined,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const H: React.FC<{children: React.ReactNode; size?: number; color?: string; delay?: number}> = ({
  children,
  size = 88,
  color = C.text,
  delay = 6,
}) => (
  <FadeUp delay={delay}>
    <div style={{fontSize: size, fontWeight: 900, lineHeight: 1.08, color, marginTop: 22}}>{children}</div>
  </FadeUp>
);

export const Sub: React.FC<{children: React.ReactNode; delay?: number; size?: number}> = ({children, delay = 20, size = 40}) => (
  <FadeUp delay={delay}>
    <div style={{fontSize: size, color: C.muted, marginTop: 24, lineHeight: 1.35}}>{children}</div>
  </FadeUp>
);

export const Slam: React.FC<{delay: number; children: React.ReactNode; size?: number; color?: string}> = ({
  delay,
  children,
  size = 120,
  color = C.text,
}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  const s = interpolate(f, [0, 5, 10], [2.2, 0.94, 1], clamp);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 900,
        lineHeight: 1.05,
        color,
        opacity: f < 0 ? 0 : 1,
        transform: `scale(${s})`,
        textTransform: 'uppercase',
        letterSpacing: -2,
      }}
    >
      {children}
    </div>
  );
};

// Großer Kennwert mit Beschriftung.
export const BigNumber: React.FC<{
  kicker: string;
  kickerColor?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color?: string;
  note?: string;
}> = ({kicker, kickerColor = C.linke, value, decimals = 0, suffix = '', prefix = '', label, color = C.accent, note}) => {
  const frame = useCurrentFrame();
  const punch = interpolate(frame, [8, 30, 38], [0.7, 1.06, 1], clamp);
  return (
    <Page>
      <FadeUp>
        <Kicker color={kickerColor}>{kicker}</Kicker>
      </FadeUp>
      <div style={{fontSize: 260, fontWeight: 900, color, lineHeight: 1, marginTop: 20, transform: `scale(${punch})`, transformOrigin: 'left center', textShadow: `0 0 60px ${color}55`}}>
        {prefix}
        <CountUp to={value} delay={8} decimals={decimals} suffix={suffix} />
      </div>
      <H size={64} delay={20}>
        {label}
      </H>
      {note ? <Sub delay={40}>{note}</Sub> : null}
    </Page>
  );
};

export type BarRow = {name: string; value: number; color: string; note?: string};

export const Bars: React.FC<{kicker: string; rows: BarRow[]; max?: number; source?: string; highlight?: string}> = ({
  kicker,
  rows,
  max = 50,
  source,
  highlight,
}) => (
  <Page>
    <FadeUp>
      <Kicker>{kicker}</Kicker>
    </FadeUp>
    <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 36}}>
      {rows.map((r, i) => (
        <BarLine key={r.name} {...r} max={max} delay={8 + i * 7} dim={highlight !== undefined && highlight !== r.name} />
      ))}
    </div>
    {source ? <Sub delay={60} size={28}>Quelle: {source}</Sub> : null}
  </Page>
);

const BarLine: React.FC<BarRow & {max: number; delay: number; dim: boolean}> = ({name, value, color, note, max, delay, dim}) => {
  const p = useIn(delay);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 28, opacity: dim ? 0.35 : 1}}>
      <div style={{width: 200, fontSize: 46, fontWeight: 800, color: C.text}}>{name}</div>
      <div style={{flex: 1, height: 64, background: C.panel, borderRadius: 8}}>
        <div style={{height: '100%', width: `${(value / max) * 100 * p}%`, background: color, borderRadius: 8, border: color === P.cdu ? '2px solid #71717a' : undefined}} />
      </div>
      <div style={{width: 210, fontSize: 50, fontWeight: 900, color: C.text, textAlign: 'right'}}>
        <CountUp to={value} delay={delay} decimals={1} suffix=" %" />
      </div>
      {note ? <div style={{width: 260, fontSize: 28, color: C.muted}}>{note}</div> : null}
    </div>
  );
};

// Halbkreis-Sitzverteilung. Reihenfolge links → rechts.
export type SeatGroup = {name: string; seats: number; color: string};

export const Hemicycle: React.FC<{
  groups: SeatGroup[];
  highlight?: string[];
  kicker?: string;
  title?: string;
  majority?: number;
  side?: React.ReactNode;
}> = ({groups, highlight, kicker, title, majority, side}) => {
  const frame = useCurrentFrame();
  const total = groups.reduce((a, g) => a + g.seats, 0);
  const rows = 6;
  const r0 = 180;
  const r1 = 420;
  const radii = Array.from({length: rows}, (_, i) => r0 + ((r1 - r0) * i) / (rows - 1));
  const sumR = radii.reduce((a, b) => a + b, 0);
  let assigned = 0;
  const perRow = radii.map((r, i) => {
    const n = i === rows - 1 ? total - assigned : Math.round((total * r) / sumR);
    assigned += n;
    return n;
  });
  const seats: {x: number; y: number; a: number}[] = [];
  radii.forEach((r, i) => {
    const n = perRow[i];
    for (let k = 0; k < n; k++) {
      const a = Math.PI - (Math.PI * (k + 0.5)) / n;
      seats.push({x: 460 + r * Math.cos(a), y: 460 - r * Math.sin(a), a});
    }
  });
  seats.sort((p, q) => q.a - p.a);
  const colors: {color: string; name: string}[] = [];
  groups.forEach((g) => {
    for (let k = 0; k < g.seats; k++) colors.push({color: g.color, name: g.name});
  });
  const shown = Math.floor(interpolate(frame, [4, 40], [0, total], clamp));
  return (
    <Page>
      <div style={{display: 'flex', alignItems: 'center', gap: 60}}>
        <div style={{flex: '0 0 auto'}}>
          {kicker ? (
            <FadeUp>
              <Kicker>{kicker}</Kicker>
            </FadeUp>
          ) : null}
          <svg width={920} height={550} viewBox="0 0 920 550" style={{marginTop: 20}}>
            {seats.map((s, i) => {
              const c = colors[i];
              const dim = highlight && !highlight.includes(c.name);
              return <circle key={i} cx={s.x} cy={s.y} r={19} fill={c.color} opacity={i < shown ? (dim ? 0.18 : 1) : 0} stroke={c.color === P.cdu ? '#8a8a94' : 'none'} strokeWidth={2} />;
            })}
            {majority ? (
              <text x={460} y={535} textAnchor="middle" fill={C.text} fontSize={56} fontWeight={900}>
                {total} Sitze · Mehrheit {majority}
              </text>
            ) : null}
          </svg>
          {title ? <H size={54}>{title}</H> : null}
        </div>
        <div style={{flex: 1}}>
          {side ?? (
            <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
              {groups.map((g, i) => (
                <FadeUp key={g.name} delay={20 + i * 5}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 42, fontWeight: 800, color: C.text, opacity: highlight && !highlight.includes(g.name) ? 0.35 : 1}}>
                    <div style={{width: 30, height: 30, borderRadius: 15, background: g.color, border: g.color === P.cdu ? '2px solid #8a8a94' : undefined}} />
                    <span style={{width: 160}}>{g.name}</span>
                    <span>{g.seats}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export const Quote: React.FC<{who: string; role: string; text: string; color?: string; indirekt?: boolean; source?: string}> = ({
  who,
  role,
  text,
  color = C.accent,
  indirekt,
  source,
}) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(interpolate(frame, [8, 8 + text.length * 0.9], [0, text.length], clamp));
  return (
    <Page>
      <FadeUp>
        {indirekt ? (
          <div style={{fontSize: 34, letterSpacing: 6, color, fontWeight: 800, marginBottom: 20}}>SINNGEMÄSS</div>
        ) : (
          <div style={{fontSize: 220, lineHeight: 0.55, color, fontWeight: 900}}>“</div>
        )}
      </FadeUp>
      <div style={{fontSize: 76, fontWeight: 800, color: C.text, lineHeight: 1.15, maxWidth: 1500, minHeight: 180}}>
        {text.slice(0, chars)}
        <span style={{opacity: frame % 16 < 8 ? 1 : 0, color}}>|</span>
      </div>
      <FadeUp delay={14}>
        <div style={{marginTop: 36, display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{width: 12, height: 80, background: color}} />
          <div>
            <div style={{fontSize: 46, fontWeight: 800, color: C.text}}>{who}</div>
            <div style={{fontSize: 32, color: C.muted}}>
              {role}
              {source ? ` · ${source}` : ''}
            </div>
          </div>
        </div>
      </FadeUp>
    </Page>
  );
};

export type Item = {icon: string; text: string; color?: string};

export const Bullets: React.FC<{kicker: string; kickerColor?: string; title?: string; items: Item[]; step?: number}> = ({
  kicker,
  kickerColor = C.linke,
  title,
  items,
  step = 30,
}) => (
  <Page>
    <FadeUp>
      <Kicker color={kickerColor}>{kicker}</Kicker>
    </FadeUp>
    {title ? <H size={80}>{title}</H> : null}
    <div style={{display: 'flex', flexDirection: 'column', gap: 26, marginTop: 40}}>
      {items.map((it, i) => (
        <FadeUp key={it.text} delay={14 + i * step}>
          <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <div
              style={{
                width: 96,
                height: 96,
                flexShrink: 0,
                borderRadius: 18,
                background: it.color ?? C.panel,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 56,
                fontWeight: 900,
                color: '#fff',
              }}
            >
              {it.icon}
            </div>
            <div style={{fontSize: 56, fontWeight: 800, color: C.text, lineHeight: 1.15}}>{it.text}</div>
          </div>
        </FadeUp>
      ))}
    </div>
  </Page>
);

export const Stamp: React.FC<{top?: string; text: string; color: string; note?: string}> = ({top, text, color, note}) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [14, 20, 24], [3, 0.9, 1], clamp);
  const shake = useShake(20, 10, 10);
  return (
    <Page center>
      {top ? (
        <FadeUp>
          <div style={{fontSize: 46, color: C.muted}}>{top}</div>
        </FadeUp>
      ) : null}
      <div style={{transform: shake}}>
        <div
          style={{
            marginTop: 40,
            fontSize: 110,
            fontWeight: 900,
            color,
            border: `14px solid ${color}`,
            padding: '16px 60px',
            transform: `rotate(-4deg) scale(${s})`,
            opacity: frame < 14 ? 0 : 1,
            textTransform: 'uppercase',
          }}
        >
          {text}
        </div>
      </div>
      {note ? <Sub delay={36}>{note}</Sub> : null}
    </Page>
  );
};

export const Compare: React.FC<{kicker: string; left: {label: string; rows: BarRow[]}; right: {label: string; rows: BarRow[]}; max?: number}> = ({
  kicker,
  left,
  right,
  max = 50,
}) => {
  const col = (side: {label: string; rows: BarRow[]}, delay: number) => (
    <div style={{flex: 1}}>
      <FadeUp delay={delay}>
        <div style={{fontSize: 64, fontWeight: 900, color: C.text, marginBottom: 20}}>{side.label}</div>
      </FadeUp>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 40, height: 460}}>
        {side.rows.map((r, i) => (
          <Column key={r.name} {...r} max={max} delay={delay + 8 + i * 6} />
        ))}
      </div>
    </div>
  );
  return (
    <Page>
      <FadeUp>
        <Kicker>{kicker}</Kicker>
      </FadeUp>
      <div style={{display: 'flex', gap: 120, marginTop: 30}}>
        {col(left, 4)}
        {col(right, 40)}
      </div>
    </Page>
  );
};

const Column: React.FC<BarRow & {max: number; delay: number}> = ({name, value, color, max, delay}) => {
  const p = useIn(delay);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 180}}>
      <div style={{fontSize: 46, fontWeight: 900, color: C.text, opacity: p}}>{value.toLocaleString('de-DE', {minimumFractionDigits: 1})} %</div>
      <div style={{width: 150, height: (value / max) * 340 * p, background: color, borderRadius: '10px 10px 0 0', border: color === P.cdu ? '2px solid #71717a' : undefined}} />
      <div style={{fontSize: 40, fontWeight: 800, color: C.text, marginTop: 10}}>{name}</div>
    </div>
  );
};

export const Person: React.FC<{name: string; initials: string; color: string; facts: string[]; kicker: string}> = ({
  name,
  initials,
  color,
  facts,
  kicker,
}) => {
  const p = useIn(4);
  return (
    <Page>
      <div style={{display: 'flex', alignItems: 'center', gap: 90}}>
        <div
          style={{
            width: 420,
            height: 420,
            borderRadius: 210,
            background: `radial-gradient(circle at 35% 30%, ${color}, #0b0c10 85%)`,
            border: `10px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 170,
            fontWeight: 900,
            color: '#fff',
            transform: `scale(${0.7 + 0.3 * p})`,
            opacity: p,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <FadeUp>
            <Kicker color={color}>{kicker}</Kicker>
          </FadeUp>
          <H size={100}>{name}</H>
          {facts.map((f, i) => (
            <FadeUp key={f} delay={24 + i * 20}>
              <div style={{fontSize: 46, color: C.text, marginTop: 18}}>• {f}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Page>
  );
};

export type Step = {title: string; text: string; color?: string};

export const Steps: React.FC<{kicker: string; steps: Step[]; active?: number; stepDelay?: number}> = ({kicker, steps, active, stepDelay = 25}) => (
  <Page>
    <FadeUp>
      <Kicker>{kicker}</Kicker>
    </FadeUp>
    <div style={{display: 'flex', gap: 40, marginTop: 50}}>
      {steps.map((st, i) => (
        <StepCard key={st.title} {...st} delay={10 + i * stepDelay} dim={active !== undefined && active !== i} />
      ))}
    </div>
  </Page>
);

const StepCard: React.FC<Step & {delay: number; dim: boolean}> = ({title, text, color = C.panel, delay, dim}) => {
  const p = useIn(delay);
  return (
    <div
      style={{
        flex: 1,
        background: color,
        borderRadius: 24,
        padding: '40px 36px',
        opacity: p * (dim ? 0.3 : 1),
        transform: `translateY(${(1 - p) * 80}px) scale(${dim ? 0.95 : 1})`,
        minHeight: 360,
      }}
    >
      <div style={{fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 20}}>{title}</div>
      <div style={{fontSize: 44, color: '#fff', lineHeight: 1.3}}>{text}</div>
    </div>
  );
};

export const Timeline: React.FC<{kicker: string; items: {date: string; text: string; color?: string}[]}> = ({kicker, items}) => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [4, 40], [0, 100], clamp);
  return (
    <Page>
      <FadeUp>
        <Kicker>{kicker}</Kicker>
      </FadeUp>
      <div style={{position: 'relative', marginTop: 120}}>
        <div style={{height: 8, background: C.panel}}>
          <div style={{height: '100%', width: `${line}%`, background: C.accent}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: -26}}>
          {items.map((it, i) => (
            <FadeUp key={it.date} delay={10 + i * 14} style={{width: `${100 / items.length}%`, textAlign: 'center'}}>
              <div style={{width: 44, height: 44, borderRadius: 22, background: it.color ?? C.accent, margin: '0 auto'}} />
              <div style={{fontSize: 42, fontWeight: 900, color: C.text, marginTop: 20}}>{it.date}</div>
              <div style={{fontSize: 34, color: C.muted, marginTop: 8, padding: '0 20px'}}>{it.text}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Page>
  );
};

export const SlamLines: React.FC<{lines: {text: string; color?: string; delay: number}[]; size?: number; center?: boolean}> = ({lines, size = 120, center = true}) => (
  <Page center={center}>
    {lines.map((l) => (
      <Slam key={l.text} delay={l.delay} size={size} color={l.color}>
        {l.text}
      </Slam>
    ))}
  </Page>
);
