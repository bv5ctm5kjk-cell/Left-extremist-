import {interpolate, useCurrentFrame} from 'remotion';
import {CountUp, FadeUp, Kicker, useIn} from '../components';
import {useShake} from '../effects';
import {Big, Page, PartyBlock, Quote, Slam, Tag} from '../teil2/shots';
import {C} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const IntroShot: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useIn(20);
  const houses = 12;
  return (
    <Page center>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 18, width: 640, justifyContent: 'center'}}>
        {Array.from({length: houses}).map((_, i) => (
          <div
            key={i}
            style={{
              fontSize: 90,
              opacity: frame > i * 4 ? 1 : 0,
              transform: `translateY(${interpolate(frame - i * 4, [0, 6], [-80, 0], clamp)}px)`,
            }}
          >
            🏢
          </div>
        ))}
      </div>
      <div style={{fontSize: 150, fontWeight: 900, color: C.text, marginTop: 40, opacity: p, transform: `scale(${0.6 + 0.4 * p})`}}>
        ENTEIGNEN?
      </div>
    </Page>
  );
};

export const Hook1: React.FC = () => (
  <Page>
    <Slam delay={0} size={104}>240.000 Wohnungen.</Slam>
    <Slam delay={30} size={104} color={C.accent}>
      Milliarden Euro.
    </Slam>
    <Slam delay={62} size={92} color={C.linke}>
      Eine Idee, die Berlin spaltet.
    </Slam>
  </Page>
);

export const Hook2: React.FC = () => {
  const frame = useCurrentFrame();
  const stamp = interpolate(frame, [10, 16, 20], [3, 0.9, 1], clamp);
  return (
    <Page center>
      <Big size={130} delay={0}>ENTEIGNUNG</Big>
      <div
        style={{
          marginTop: 30,
          background: C.linke,
          color: '#fff',
          fontSize: 64,
          fontWeight: 900,
          padding: '8px 36px',
          transform: `rotate(-4deg) scale(${stamp})`,
          opacity: frame < 10 ? 0 : 1,
        }}
      >
        KURZ ERKLÄRT
      </div>
    </Page>
  );
};

export const Volksentscheid: React.FC = () => {
  const ja = useIn(20);
  return (
    <Page>
      <FadeUp>
        <Kicker>Volksentscheid · 26.09.2021</Kicker>
      </FadeUp>
      <div style={{fontSize: 180, fontWeight: 900, color: C.text, marginTop: 30, lineHeight: 1}}>
        <CountUp to={59.1} delay={20} decimals={1} suffix=" %" />
      </div>
      <div style={{fontSize: 60, fontWeight: 800, color: C.gruene}}>JA</div>
      <div style={{display: 'flex', height: 60, marginTop: 36, borderRadius: 10, overflow: 'hidden', background: C.panel}}>
        <div style={{width: `${59.1 * ja}%`, background: C.gruene}} />
        <div style={{width: `${40.9 * ja}%`, background: '#52525b'}} />
      </div>
      <FadeUp delay={50}>
        <div style={{fontSize: 36, color: C.muted, marginTop: 20}}>Rund 1 Million Ja-Stimmen · rechtlich nicht bindend</div>
      </FadeUp>
    </Page>
  );
};

export const Wer: React.FC = () => (
  <Page center>
    <FadeUp>
      <div style={{fontSize: 44, color: C.muted}}>Betroffen: Unternehmen mit</div>
    </FadeUp>
    <div style={{fontSize: 170, fontWeight: 900, color: C.accent, lineHeight: 1.05}}>
      &gt; <CountUp to={3000} delay={8} />
    </div>
    <Big size={70} delay={20}>Wohnungen in Berlin</Big>
  </Page>
);

export const Wieviel: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.floor(interpolate(frame, [0, 60], [0, 48], clamp));
  return (
    <Page center>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 12, marginBottom: 40}}>
        {Array.from({length: 48}).map((_, i) => (
          <div key={i} style={{width: 90, height: 60, borderRadius: 6, background: i < n ? C.linke : C.panel}} />
        ))}
      </div>
      <div style={{fontSize: 100, fontWeight: 900, color: C.text}}>210.000 – 240.000</div>
      <div style={{fontSize: 50, color: C.muted}}>Wohnungen</div>
    </Page>
  );
};

export const Art15: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color={C.afd}>Grundgesetz</Kicker>
    </FadeUp>
    <Big size={150} delay={4}>Art. 15</Big>
    <FadeUp delay={30}>
      <div
        style={{
          marginTop: 30,
          borderLeft: `10px solid ${C.afd}`,
          paddingLeft: 30,
          fontSize: 44,
          color: C.text,
          lineHeight: 1.35,
          fontStyle: 'italic',
        }}
      >
        „Grund und Boden, Naturschätze und Produktionsmittel können zum Zwecke der Vergesellschaftung durch ein Gesetz, das Art
        und Ausmaß der <b style={{color: C.accent}}>Entschädigung</b> regelt, in Gemeineigentum … überführt werden.“
      </div>
    </FadeUp>
  </Page>
);

export const Kommission: React.FC = () => {
  const frame = useCurrentFrame();
  const stamp = interpolate(frame, [18, 24, 28], [3, 0.9, 1], clamp);
  return (
    <Page center>
      <FadeUp>
        <div style={{fontSize: 46, color: C.muted}}>Expertenkommission des Senats, 2023</div>
      </FadeUp>
      <div
        style={{
          marginTop: 40,
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1.1,
          color: C.gruene,
          border: `10px solid ${C.gruene}`,
          padding: '14px 30px',
          transform: `rotate(-5deg) scale(${stamp})`,
          opacity: frame < 18 ? 0 : 1,
        }}
      >
        <div style={{fontSize: 90}}>✓</div>
        VERFASSUNGSGEMÄSS
      </div>
      <FadeUp delay={40}>
        <div style={{fontSize: 34, color: C.muted, marginTop: 40}}>Mehrheitsvotum – drei Mitglieder sahen es anders</div>
      </FadeUp>
    </Page>
  );
};

export const Nichts: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [0, 30], [0, 100], clamp);
  return (
    <Page>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 64, fontWeight: 900, color: C.text}}>
        <span>2021</span>
        <span>2026</span>
      </div>
      <div style={{height: 10, background: C.panel, marginTop: 20}}>
        <div style={{height: '100%', width: `${line}%`, background: C.muted}} />
      </div>
      <Big size={120} delay={20} color={C.linke}>
        Umgesetzt: 0
      </Big>
    </Page>
  );
};

const FlowBox: React.FC<{delay: number; children: React.ReactNode; color?: string}> = ({delay, children, color = C.panel}) => {
  const p = useIn(delay);
  return (
    <div
      style={{
        background: color,
        borderRadius: 18,
        padding: '26px 30px',
        fontSize: 50,
        fontWeight: 800,
        color: C.text,
        textAlign: 'center',
        opacity: p,
        transform: `scale(${0.8 + 0.2 * p})`,
      }}
    >
      {children}
    </div>
  );
};

const Arrow: React.FC<{delay: number}> = ({delay}) => {
  const p = useIn(delay);
  return <div style={{fontSize: 70, color: C.accent, textAlign: 'center', opacity: p}}>↓</div>;
};

export const Plan: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker>Plan der Linken</Kicker>
    </FadeUp>
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30}}>
      <FlowBox delay={20}>💶 Kredite</FlowBox>
      <Arrow delay={40} />
      <FlowBox delay={55} color={C.linke}>
        Anstalt öffentlichen Rechts
      </FlowBox>
      <Arrow delay={75} />
      <FlowBox delay={90}>🏢 Wohnungen</FlowBox>
    </div>
  </Page>
);

export const Kosten: React.FC = () => {
  const a = useIn(60);
  const b = useIn(150);
  const shake = useShake(150, 10, 12);
  return (
    <Page>
      <FadeUp>
        <Kicker color={C.accent}>
          <span style={{color: '#111'}}>Was kostet das?</span>
        </Kicker>
      </FadeUp>
      <div style={{marginTop: 50}}>
        <div style={{fontSize: 40, color: C.muted}}>Neue Studie</div>
        <div style={{height: 90, width: `${(13.5 / 37.7) * 100 * a}%`, background: C.gruene, borderRadius: 10, marginTop: 10}} />
        <div style={{fontSize: 80, fontWeight: 900, color: C.text}}>
          <CountUp to={13.5} delay={60} decimals={1} suffix=" Mrd. €" />
        </div>
      </div>
      <div style={{marginTop: 40, transform: shake}}>
        <div style={{fontSize: 40, color: C.muted}}>Nach Marktwert</div>
        <div style={{position: 'relative', height: 90, marginTop: 10}}>
          <div style={{position: 'absolute', height: '100%', width: `${100 * b}%`, background: C.linke, borderRadius: 10, opacity: 0.45}} />
          <div style={{position: 'absolute', height: '100%', width: `${(23.1 / 37.7) * 100 * b}%`, background: C.linke, borderRadius: 10}} />
        </div>
        <div style={{fontSize: 80, fontWeight: 900, color: C.text, opacity: b}}>23 – 38 Mrd. €</div>
      </div>
    </Page>
  );
};

export const Pro: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color={C.gruene}>Befürworter</Kicker>
    </FadeUp>
    <Big size={110} delay={8}>
      ✓ Mieten dauerhaft bezahlbar
    </Big>
  </Page>
);

const Minus: React.FC<{delay: number; children: React.ReactNode}> = ({delay, children}) => (
  <FadeUp delay={delay}>
    <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 40}}>
      <div
        style={{
          width: 100,
          height: 100,
          flexShrink: 0,
          borderRadius: 16,
          background: C.linke,
          color: '#fff',
          fontSize: 70,
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </div>
      <div style={{fontSize: 62, fontWeight: 800, color: C.text, lineHeight: 1.15}}>{children}</div>
    </div>
  </FadeUp>
);

export const Contra: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color="#52525b">Kritiker</Kicker>
    </FadeUp>
    <Minus delay={30}>0 neue Wohnungen</Minus>
    <Minus delay={150}>Land bürgt – Risiko beim Steuerzahler</Minus>
  </Page>
);

export const Battis: React.FC = () => (
  <Quote who="Ulrich Battis" role="Staatsrechtler, emer. Professor HU Berlin" text="Vor Gericht würde das scheitern." color={C.accent} indirekt />
);

export const Merz: React.FC = () => {
  const frame = useCurrentFrame();
  const slam = interpolate(frame, [30, 36, 40], [-60, 8, 0], clamp);
  return (
    <Page>
      <FadeUp>
        <Kicker color="#111">Kanzler Friedrich Merz</Kicker>
      </FadeUp>
      <Big size={96} delay={6}>
        Plan: Verbot per Bundesgesetz
      </Big>
      <div style={{fontSize: 150, marginTop: 30, transform: `rotate(${slam}deg)`, transformOrigin: 'bottom right', opacity: frame < 30 ? 0 : 1}}>
        🔨
      </div>
    </Page>
  );
};

export const Verfassung: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = Math.sin(frame / 8) * 8;
  return (
    <Page center>
      <div style={{fontSize: 180, transform: `rotate(${tilt}deg)`}}>⚖️</div>
      <Big size={80} delay={10}>
        Verbot verfassungswidrig?
      </Big>
      <FadeUp delay={30}>
        <div style={{display: 'flex', gap: 20, marginTop: 30, justifyContent: 'center'}}>
          <Tag color={C.accent}>umstritten</Tag>
        </div>
      </FadeUp>
    </Page>
  );
};

export const Partner: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker>Koalition</Kicker>
    </FadeUp>
    <Big size={86}>Linke braucht Partner</Big>
    <div style={{display: 'flex', gap: 20, marginTop: 50}}>
      <PartyBlock delay={20} color={C.linke} name="Linke" value="✓" />
      <PartyBlock delay={40} color={C.spd} name="SPD" value="?" />
      <PartyBlock delay={60} color={C.gruene} name="Grüne" value="?" />
    </div>
  </Page>
);

export const Frage: React.FC = () => (
  <Page center>
    <Slam delay={0} size={120} color={C.gruene}>
      Lösung
    </Slam>
    <div style={{fontSize: 60, color: C.muted, margin: '10px 0'}}>oder</div>
    <Slam delay={20} size={120} color={C.linke}>
      Risiko?
    </Slam>
  </Page>
);

export const Outro: React.FC = () => (
  <Page center>
    <FadeUp>
      <div style={{fontSize: 130}}>💬</div>
    </FadeUp>
    <Big size={90}>Deine Meinung?</Big>
    <FadeUp delay={20}>
      <div style={{fontSize: 50, color: C.muted, marginTop: 20}}>Ab in die Kommentare</div>
    </FadeUp>
    <FadeUp delay={45}>
      <div style={{fontSize: 26, color: C.muted, marginTop: 60, lineHeight: 1.5}}>
        Quellen: Landeswahlleiterin Berlin, Art. 15 GG, Expertenkommission 2023, Handelsblatt, t-online, ZDFheute, LTO, Rheinische
        Post (Sept. 2026)
      </div>
    </FadeUp>
  </Page>
);
