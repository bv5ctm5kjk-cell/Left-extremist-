import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FadeUp, Kicker, useIn} from '../components';
import {useShake} from '../effects';
import {C} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const Page: React.FC<{children: React.ReactNode; center?: boolean}> = ({children, center}) => (
  <AbsoluteFill
    style={{
      padding: '200px 80px 560px',
      justifyContent: 'center',
      alignItems: center ? 'center' : undefined,
      textAlign: center ? 'center' : undefined,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Slam: React.FC<{delay: number; children: React.ReactNode; size?: number; color?: string}> = ({
  delay,
  children,
  size = 120,
  color = C.text,
}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  const s = interpolate(f, [0, 5, 10], [2.4, 0.92, 1], clamp);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 900,
        lineHeight: 1.02,
        color,
        opacity: f < 0 ? 0 : 1,
        transform: `scale(${s})`,
        transformOrigin: 'left center',
        textTransform: 'uppercase',
        letterSpacing: -2,
      }}
    >
      {children}
    </div>
  );
};

export const Big: React.FC<{children: React.ReactNode; size?: number; color?: string; delay?: number}> = ({
  children,
  size = 96,
  color = C.text,
  delay = 6,
}) => (
  <FadeUp delay={delay}>
    <div style={{fontSize: size, fontWeight: 900, lineHeight: 1.05, color, marginTop: 28}}>{children}</div>
  </FadeUp>
);

export const Quote: React.FC<{who: string; role: string; text: string; color?: string; indirekt?: boolean}> = ({
  who,
  role,
  text,
  color = C.linke,
  indirekt = false,
}) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(interpolate(frame, [8, 8 + text.length * 1.2], [0, text.length], clamp));
  return (
    <Page>
      <FadeUp>
        {indirekt ? (
          <div style={{fontSize: 34, letterSpacing: 6, color, fontWeight: 800, marginBottom: 20}}>SINNGEMÄSS</div>
        ) : (
          <div style={{fontSize: 200, lineHeight: 0.6, color, fontWeight: 900}}>“</div>
        )}
      </FadeUp>
      <div style={{fontSize: 84, fontWeight: 800, color: C.text, lineHeight: 1.12, minHeight: 200}}>
        {text.slice(0, chars)}
        <span style={{opacity: frame % 16 < 8 ? 1 : 0, color}}>|</span>
      </div>
      <FadeUp delay={14}>
        <div style={{marginTop: 40, display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{width: 12, height: 80, background: color}} />
          <div>
            <div style={{fontSize: 48, fontWeight: 800, color: C.text}}>{who}</div>
            <div style={{fontSize: 34, color: C.muted}}>{role}</div>
          </div>
        </div>
      </FadeUp>
    </Page>
  );
};

export const IntroShot: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - 30, fps, config: {damping: 12}});
  const flicker = frame > 70 ? 1 : frame % 6 < 3 ? 0.4 : 1;
  return (
    <Page center>
      <div style={{fontSize: 44, letterSpacing: 16, color: C.muted, opacity: flicker}}>DER FALL</div>
      <div style={{fontSize: 190, fontWeight: 900, color: C.text, transform: `scale(${0.6 + 0.4 * p})`, opacity: p}}>
        KOÇAK
      </div>
      <div
        style={{
          marginTop: 20,
          background: C.linke,
          color: '#fff',
          fontSize: 60,
          fontWeight: 900,
          padding: '8px 36px',
          transform: `rotate(-4deg) scale(${interpolate(frame, [60, 68, 74], [0, 1.3, 1], clamp)})`,
        }}
      >
        TEIL 2
      </div>
    </Page>
  );
};

export const Hook1: React.FC = () => (
  <Page>
    <Slam delay={0} size={104}>Ein Chat.</Slam>
    <Slam delay={15} size={104}>Ein Clan-Chef.</Slam>
    <Slam delay={33} size={104} color={C.linke}>
      Eine Partei unter Druck.
    </Slam>
  </Page>
);

export const Hook2: React.FC = () => (
  <Page center>
    <Big size={110}>Was ist seitdem passiert?</Big>
    <FadeUp delay={20}>
      <div style={{fontSize: 140, marginTop: 30}}>⏱️</div>
    </FadeUp>
  </Page>
);

export const Chat: React.FC = () => {
  const bubble = (delay: number, mine: boolean, text: string) => {
    const p = useIn(delay);
    return (
      <div
        style={{
          alignSelf: mine ? 'flex-end' : 'flex-start',
          background: mine ? '#1f6f4a' : '#2a2d35',
          color: '#fff',
          fontSize: 50,
          padding: '26px 34px',
          borderRadius: 30,
          maxWidth: '82%',
          opacity: p,
          transform: `scale(${0.8 + 0.2 * p})`,
          transformOrigin: mine ? 'right bottom' : 'left bottom',
        }}
      >
        {text}
      </div>
    );
  };
  return (
    <Page>
      <FadeUp>
        <Kicker>Rückblick</Kicker>
      </FadeUp>
      <div style={{display: 'flex', flexDirection: 'column', gap: 26, marginTop: 40}}>
        {bubble(10, false, 'Chat mit Firas Remmo, Sohn von Issa Remmo')}
        {bubble(45, true, '… Grüße mit Respekt an den Vater …')}
      </div>
      <FadeUp delay={70}>
        <div style={{fontSize: 28, color: C.muted, marginTop: 30}}>Nachgestellte Darstellung, kein Original-Screenshot</div>
      </FadeUp>
    </Page>
  );
};

export const Party: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker>📍 Wahlparty · Neukölln</Kicker>
    </FadeUp>
    <Big size={100}>Issa Remmo taucht auf.</Big>
    <FadeUp delay={30}>
      <div style={{display: 'flex', gap: 20, marginTop: 40}}>
        <Tag color={C.accent}>ungeladen</Tag>
        <Tag color="#71717a">hinausbegleitet</Tag>
      </div>
    </FadeUp>
  </Page>
);

export const Tag: React.FC<{color: string; children: React.ReactNode}> = ({color, children}) => (
  <div style={{border: `4px solid ${color}`, color, fontSize: 44, fontWeight: 800, padding: '10px 26px', borderRadius: 60}}>
    {children}
  </div>
);

export const Fehler: React.FC = () => {
  const frame = useCurrentFrame();
  const stamp = interpolate(frame, [20, 26, 30], [3, 0.9, 1], clamp);
  return (
    <Page center>
      <FadeUp>
        <div style={{fontSize: 48, color: C.muted}}>Koçak über den Kontakt:</div>
      </FadeUp>
      <div
        style={{
          marginTop: 40,
          fontSize: 150,
          fontWeight: 900,
          color: C.linke,
          border: `12px solid ${C.linke}`,
          padding: '10px 50px',
          transform: `rotate(-6deg) scale(${stamp})`,
          opacity: frame < 20 ? 0 : 1,
        }}
      >
        „FEHLER“
      </div>
      <FadeUp delay={45}>
        <div style={{fontSize: 44, color: C.text, marginTop: 60}}>Er habe nicht gewusst, mit wem er schreibt.</div>
      </FadeUp>
    </Page>
  );
};

const Check: React.FC<{delay: number; children: React.ReactNode}> = ({delay, children}) => (
  <FadeUp delay={delay}>
    <div style={{display: 'flex', alignItems: 'center', gap: 30, fontSize: 60, fontWeight: 800, color: C.text, marginTop: 30}}>
      <div style={{width: 80, height: 80, borderRadius: 12, background: C.linke, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 54}}>
        ⏸
      </div>
      {children}
    </div>
  </FadeUp>
);

export const Ruhen: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color="#52525b">Konsequenz</Kicker>
    </FadeUp>
    <Check delay={8}>Ämter ruhen</Check>
    <Check delay={40}>Kein Innenausschuss</Check>
  </Page>
);

export const Gespalten: React.FC = () => {
  const frame = useCurrentFrame();
  const split = interpolate(frame, [4, 16], [0, 40], clamp);
  return (
    <Page center>
      <div style={{position: 'relative', fontSize: 170, fontWeight: 900, color: C.text}}>
        <div style={{clipPath: 'inset(0 0 50% 0)', transform: `translateX(${-split}px)`}}>LINKE</div>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, clipPath: 'inset(50% 0 0 0)', transform: `translateX(${split}px)`, color: C.linke}}>
          LINKE
        </div>
      </div>
      <Big size={70} delay={14}>gespalten</Big>
    </Page>
  );
};

export const Pellmann: React.FC = () => (
  <Quote who="Sören Pellmann" role="Fraktionschef Die Linke" text="Koçak verspricht volle Transparenz." indirekt />
);
export const Reichinnek: React.FC = () => (
  <Quote who="Heidi Reichinnek" role="Fraktionschefin Die Linke" text="Ich vertraue meinen Abgeordneten." />
);
export const Pau: React.FC = () => (
  <Quote who="Petra Pau" role="Die Linke, ehem. Bundestagsvizepräsidentin" text="Mir reicht es langsam." color={C.accent} />
);

const Demand: React.FC<{party: string; color: string; text: string; textColor?: string}> = ({
  party,
  color,
  text,
  textColor = '#fff',
}) => {
  const shake = useShake(10, 10, 12);
  return (
    <Page>
      <FadeUp>
        <div style={{display: 'inline-block', background: color, color: textColor, fontSize: 70, fontWeight: 900, padding: '10px 36px', borderRadius: 10}}>
          {party}
        </div>
      </FadeUp>
      <div style={{fontSize: 40, color: C.muted, marginTop: 40}}>fordert:</div>
      <div style={{transform: shake}}>
        <Big size={104} delay={8}>{text}</Big>
      </div>
    </Page>
  );
};

export const Gruene: React.FC = () => <Demand party="GRÜNE" color={C.gruene} text="Ausschluss aus der Fraktion" />;
export const Cdu: React.FC = () => <Demand party="CDU" color="#111" text="Mandat niederlegen" />;

export const Bundestag: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color={C.afd}>Bundestag</Kicker>
    </FadeUp>
    <Big size={110}>Aktuelle Stunde</Big>
    <FadeUp delay={24}>
      <div style={{fontSize: 48, color: C.text, marginTop: 30}}>
        auf Antrag der <span style={{color: C.afd, fontWeight: 900}}>AfD</span> – hitzige Debatte
      </div>
    </FadeUp>
  </Page>
);

export const PartyBlock: React.FC<{delay: number; color: string; name: string; value?: string}> = ({delay, color, name, value}) => {
  const p = useIn(delay);
  return (
    <div
      style={{
        flex: 1,
        background: color,
        borderRadius: 16,
        padding: '30px 10px',
        textAlign: 'center',
        transform: `translateY(${(1 - p) * 300}px)`,
        opacity: p,
      }}
    >
      <div style={{fontSize: 52, fontWeight: 900, color: '#fff'}}>{name}</div>
      {value ? <div style={{fontSize: 40, color: '#fff'}}>{value}</div> : null}
    </div>
  );
};

export const Wahlsieg: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker>Berlin</Kicker>
    </FadeUp>
    <Big size={90}>Wahlsieger will regieren</Big>
    <div style={{display: 'flex', gap: 20, marginTop: 50}}>
      <PartyBlock delay={20} color={C.linke} name="Linke" value="25,7 %" />
      <PartyBlock delay={30} color={C.gruene} name="Grüne" value="14,3 %" />
      <PartyBlock delay={40} color={C.spd} name="SPD" value="12,1 %" />
    </div>
  </Page>
);

export const Bedingung: React.FC = () => {
  const item = (delay: number, text: string) => (
    <FadeUp delay={delay}>
      <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 30}}>
        <div style={{width: 84, height: 84, border: `6px solid ${C.accent}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, fontWeight: 900, color: C.accent}}>
          ?
        </div>
        <div style={{fontSize: 60, fontWeight: 800, color: C.text}}>{text}</div>
      </div>
    </FadeUp>
  );
  return (
    <Page>
      <FadeUp>
        <Kicker color={C.accent}>
          <span style={{color: '#111'}}>SPD & Grüne verlangen</span>
        </Kicker>
      </FadeUp>
      <Big size={80} delay={8}>Klare Haltung zu:</Big>
      {item(50, 'Antisemitismus')}
      {item(110, 'Organisierter Kriminalität')}
    </Page>
  );
};

export const Kloeckner: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color="#111">Julia Klöckner · Bundestagspräsidentin</Kicker>
    </FadeUp>
    <Big size={96}>Rät SPD und Grünen:</Big>
    <FadeUp delay={30}>
      <div style={{fontSize: 90, fontWeight: 900, color: C.linke, marginTop: 20, textDecoration: 'underline', textDecorationThickness: 10}}>
        Keine Koalition mit der Linken
      </div>
    </FadeUp>
  </Page>
);

export const Eralp: React.FC = () => (
  <Quote who="Elif Eralp" role="Spitzenkandidatin Die Linke Berlin" text="Die richtigen Entscheidungen sind getroffen." indirekt />
);

export const Frage: React.FC = () => (
  <Page center>
    <Slam delay={0} size={140}>Reicht</Slam>
    <Slam delay={10} size={140} color={C.accent}>das?</Slam>
  </Page>
);

export const R2g: React.FC = () => {
  const frame = useCurrentFrame();
  const crack = interpolate(frame, [30, 40], [0, 1], clamp);
  return (
    <Page center>
      <div style={{display: 'flex', gap: 14, transform: `rotate(${crack * -4}deg)`}}>
        {[C.spd, C.gruene, C.linke].map((c, i) => (
          <div
            key={c}
            style={{
              width: 200,
              height: 200,
              background: c,
              borderRadius: 20,
              transform: `translateY(${crack * (i - 1) * 80}px) rotate(${crack * (i - 1) * 12}deg)`,
            }}
          />
        ))}
      </div>
      <Big size={96} delay={6}>Rot-Grün-Rot vor dem Aus?</Big>
    </Page>
  );
};

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
        Quellen: Tagesspiegel/dpa, taz, ZDFheute, Jüdische Allgemeine, t-online (22.–25.09.2026)
      </div>
    </FadeUp>
  </Page>
);
