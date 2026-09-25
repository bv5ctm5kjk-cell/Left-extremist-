import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CountUp, FadeUp, Headline, Kicker, Source, useIn} from './components';
import {C} from './theme';

const Page: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{padding: '220px 80px 520px', justifyContent: 'center'}}>
    {children}
  </AbsoluteFill>
);

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = interpolate(frame, [0, 40], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <Page>
      <FadeUp>
        <Kicker>Berlin-Wahl 2026</Kicker>
      </FadeUp>
      <FadeUp delay={8}>
        <Headline size={120}>
          Die Linke
          <br />
          vorn.
        </Headline>
      </FadeUp>
      <div
        style={{
          height: 14,
          width: `${bar * 100}%`,
          background: C.linke,
          marginTop: 40,
        }}
      />
      <FadeUp delay={20}>
        <div style={{fontSize: 48, color: C.muted, marginTop: 40}}>
          Pläne, Clankriminalität und der Fall Koçak – in 60 Sekunden.
        </div>
      </FadeUp>
    </Page>
  );
};

const RESULTS = [
  {name: 'Linke', value: 25.7, color: C.linke},
  {name: 'CDU', value: 18.8, color: C.cdu},
  {name: 'AfD', value: 16.3, color: C.afd},
  {name: 'Grüne', value: 14.3, color: C.gruene},
  {name: 'SPD', value: 12.1, color: C.spd},
];

export const Wahl: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker>Ergebnis · 20. September 2026</Kicker>
    </FadeUp>
    <div style={{marginTop: 50, display: 'flex', flexDirection: 'column', gap: 30}}>
      {RESULTS.map((r, i) => (
        <Bar key={r.name} {...r} delay={10 + i * 8} />
      ))}
    </div>
    <FadeUp delay={60}>
      <div style={{fontSize: 34, color: C.muted, marginTop: 30}}>
        BSW 4,7 % – nicht im Parlament
      </div>
    </FadeUp>
    <Source>Landeswahlleitung Berlin, vorläufiges Endergebnis</Source>
  </Page>
);

const Bar: React.FC<{
  name: string;
  value: number;
  color: string;
  delay: number;
}> = ({name, value, color, delay}) => {
  const p = useIn(delay);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <div style={{width: 170, fontSize: 44, fontWeight: 700, color: C.text}}>
        {name}
      </div>
      <div style={{flex: 1, height: 70, background: C.panel, borderRadius: 8}}>
        <div
          style={{
            height: '100%',
            width: `${(value / 30) * 100 * p}%`,
            background: color,
            borderRadius: 8,
            border: color === C.cdu ? '2px solid #71717a' : undefined,
          }}
        />
      </div>
      <div style={{width: 170, fontSize: 48, fontWeight: 800, color: C.text, textAlign: 'right'}}>
        <CountUp to={value} delay={delay} decimals={1} suffix=" %" />
      </div>
    </div>
  );
};

const PLANS = [
  ['🏠', 'Volksentscheid „Deutsche Wohnen & Co enteignen“ umsetzen'],
  ['🔑', 'Große Wohnungsbestände vergesellschaften'],
  ['❄️', '1 Jahr Mietenstopp bei landeseigenen Wohnungen'],
];

export const Vorhaben: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker>Das hat die Linke vor</Kicker>
    </FadeUp>
    <div style={{marginTop: 50, display: 'flex', flexDirection: 'column', gap: 34}}>
      {PLANS.map(([icon, text], i) => (
        <FadeUp key={text} delay={12 + i * 40}>
          <div
            style={{
              display: 'flex',
              gap: 30,
              alignItems: 'center',
              background: C.panel,
              borderLeft: `10px solid ${C.linke}`,
              padding: '34px 36px',
              borderRadius: 10,
            }}
          >
            <div style={{fontSize: 70}}>{icon}</div>
            <div style={{fontSize: 48, fontWeight: 700, color: C.text, lineHeight: 1.2}}>
              {text}
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
    <Source>Wahlprogramm Die Linke Berlin 2026</Source>
  </Page>
);

export const Lagebild: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color={C.accent}>
        <span style={{color: '#111'}}>Lagebild Clankriminalität</span>
      </Kicker>
    </FadeUp>
    <Stat delay={10} big={<CountUp to={685} delay={10} />} label="Personen dem Milieu zugerechnet" />
    <Stat delay={60} big={<>+<CountUp to={11} delay={60} /> %</>} label="mehr als im Vorjahr" />
    <Stat delay={130} big={<CountUp to={952} delay={130} />} label="erfasste Straftaten 2025" />
    <Source>Senatsverwaltung für Inneres / Polizei Berlin, Lagebild 2025</Source>
  </Page>
);

const Stat: React.FC<{big: React.ReactNode; label: string; delay: number}> = ({
  big,
  label,
  delay,
}) => (
  <FadeUp delay={delay} style={{marginTop: 50}}>
    <div style={{fontSize: 150, fontWeight: 900, color: C.accent, lineHeight: 1}}>
      {big}
    </div>
    <div style={{fontSize: 46, color: C.text, marginTop: 8}}>{label}</div>
  </FadeUp>
);

export const Begriff: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker>Position der Linken</Kicker>
    </FadeUp>
    <FadeUp delay={10}>
      <Headline size={96}>
        <span style={{textDecoration: `line-through ${C.linke} 10px`}}>
          „Clankriminalität“
        </span>
      </Headline>
    </FadeUp>
    <FadeUp delay={30}>
      <div style={{fontSize: 52, color: C.text, marginTop: 40, lineHeight: 1.25}}>
        Der Begriff stelle ganze Familien unter Generalverdacht – so die Kritik der Partei.
      </div>
    </FadeUp>
  </Page>
);

export const Kocak: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker>Der Fall Koçak</Kicker>
    </FadeUp>
    <FadeUp delay={10}>
      <div
        style={{
          marginTop: 40,
          background: C.panel,
          borderRadius: 24,
          padding: '36px 40px',
          fontSize: 52,
          color: C.text,
          fontStyle: 'italic',
        }}
      >
        Chat mit Firas Remmo, Sohn von Clanchef Issa Remmo:
        <div style={{color: C.accent, fontWeight: 800, fontStyle: 'normal', marginTop: 16}}>
          „Grüße mit Respekt“
        </div>
      </div>
    </FadeUp>
    <FadeUp delay={120}>
      <div style={{fontSize: 40, color: C.muted, marginTop: 36, lineHeight: 1.3}}>
        Issa Remmo war zuvor ungeladen auf der Wahlparty der Linken aufgetaucht und
        wurde hinausbegleitet.
      </div>
    </FadeUp>
    <FadeUp delay={230}>
      <div style={{fontSize: 46, color: C.text, marginTop: 36, lineHeight: 1.3}}>
        Koçak: Solche Kontakte seien „durch nichts zu rechtfertigen“. Er entschuldigt
        sich und zieht sich vorerst zurück.
      </div>
    </FadeUp>
  </Page>
);

export const Outro: React.FC = () => (
  <Page>
    <FadeUp>
      <Headline size={84}>
        Wie geht die neue Regierung mit Clankriminalität um?
      </Headline>
    </FadeUp>
    <FadeUp delay={40}>
      <div style={{fontSize: 30, color: C.muted, marginTop: 60, lineHeight: 1.5}}>
        Quellen: Landeswahlleitung Berlin · Lagebild Clankriminalität Berlin 2025 ·
        Wahlprogramm Die Linke Berlin 2026 · ZDFheute, Tagesspiegel, taz, t-online
        (Sept. 2026)
      </div>
    </FadeUp>
  </Page>
);
