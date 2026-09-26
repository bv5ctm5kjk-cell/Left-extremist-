import {interpolate, useCurrentFrame} from 'remotion';
import {CountUp, FadeUp, Kicker, useIn} from '../components';
import {
  BarRow,
  BigNumber,
  Bars,
  Bullets,
  Compare,
  H,
  Hemicycle,
  P,
  Page,
  Person,
  Quote,
  SeatGroup,
  SlamLines,
  Stamp,
  Steps,
  Sub,
  Timeline,
} from '../long/templates';
import {C} from '../theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const SEATS: SeatGroup[] = [
  {name: 'Linke', seats: 8, color: P.linke},
  {name: 'Grüne', seats: 8, color: P.gruene},
  {name: 'SPD', seats: 8, color: P.spd},
  {name: 'BSW', seats: 5, color: P.bsw},
  {name: 'CDU', seats: 15, color: P.cdu},
  {name: 'AfD', seats: 39, color: P.afd},
];

const RESULT: BarRow[] = [
  {name: 'AfD', value: 43.8, color: P.afd},
  {name: 'CDU', value: 17.2, color: P.cdu},
  {name: 'SPD', value: 9.3, color: P.spd},
  {name: 'Grüne', value: 8.9, color: P.gruene},
  {name: 'Linke', value: 8.6, color: P.linke},
  {name: 'BSW', value: 5.3, color: P.bsw},
];

const SeatSide: React.FC<{title: string; lines: {text: string; color?: string}[]}> = ({title, lines}) => (
  <div>
    <H size={64} delay={20}>
      {title}
    </H>
    {lines.map((l, i) => (
      <FadeUp key={l.text} delay={40 + i * 20}>
        <div style={{fontSize: 44, fontWeight: 800, color: l.color ?? C.text, marginTop: 20}}>{l.text}</div>
      </FadeUp>
    ))}
  </div>
);

// ---------- Intro ----------
const Musik: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useIn(40);
  const flicker = frame > 80 ? 1 : frame % 6 < 3 ? 0.4 : 1;
  return (
    <Page center>
      <div style={{fontSize: 50, letterSpacing: 20, color: C.muted, opacity: flicker}}>SACHSEN-ANHALT</div>
      <div style={{fontSize: 200, fontWeight: 900, color: C.text, transform: `scale(${0.6 + 0.4 * p})`, opacity: p, lineHeight: 1}}>
        NACH DER WAHL
      </div>
      <div style={{marginTop: 30, background: C.linke, color: '#fff', fontSize: 56, fontWeight: 900, padding: '8px 40px', transform: `rotate(-3deg) scale(${interpolate(frame, [80, 88, 94], [0, 1.3, 1], clamp)})`}}>
        WER REGIERT JETZT?
      </div>
    </Page>
  );
};

const IZahl: React.FC = () => (
  <Page center>
    <div style={{fontSize: 330, fontWeight: 900, color: P.afd, lineHeight: 1, textShadow: `0 0 80px ${P.afd}66`}}>
      <CountUp to={43.8} delay={0} decimals={1} suffix=" %" />
    </div>
    <H size={70} delay={30}>
      So stark war die AfD noch nie.
    </H>
  </Page>
);

const INeuland: React.FC = () => (
  <SlamLines
    lines={[
      {text: '6. September 2026', delay: 0},
      {text: 'Politisches Neuland', delay: 30, color: C.accent},
    ]}
  />
);

const ILage: React.FC = () => (
  <Page>
    <div style={{display: 'flex', gap: 60}}>
      <FadeUp delay={4} style={{flex: 1}}>
        <div style={{background: P.afd, borderRadius: 24, padding: 50, minHeight: 360}}>
          <div style={{fontSize: 60, fontWeight: 900, color: '#fff'}}>AfD</div>
          <div style={{fontSize: 52, color: '#fff', marginTop: 20}}>Wahlsieger – aber keine eigene Mehrheit</div>
        </div>
      </FadeUp>
      <FadeUp delay={90} style={{flex: 1}}>
        <div style={{background: P.cdu, border: '3px solid #71717a', borderRadius: 24, padding: 50, minHeight: 360}}>
          <div style={{fontSize: 60, fontWeight: 900, color: '#fff'}}>CDU</div>
          <div style={{fontSize: 52, color: '#fff', marginTop: 20}}>Abgestürzt – geht in die Opposition</div>
        </div>
      </FadeUp>
    </div>
  </Page>
);

const IFrage: React.FC = () => (
  <SlamLines
    lines={[
      {text: 'Wer regiert', delay: 0},
      {text: 'das Land?', delay: 14, color: C.accent},
    ]}
    size={160}
  />
);

const IAgenda: React.FC = () => (
  <Bullets
    kicker="In diesem Video"
    step={45}
    items={[
      {icon: '📊', text: 'Wie es zu diesem Ergebnis kam'},
      {icon: '👤', text: 'Wer Ulrich Siegmund ist'},
      {icon: '🏛️', text: 'Was eine AfD-Regierung ändern könnte'},
      {icon: '🧭', text: 'Wege zur Regierung – und die Folgen für Deutschland'},
    ]}
  />
);

// ---------- 1 Ergebnis ----------
const EAfd: React.FC = () => (
  <BigNumber kicker="AfD" kickerColor={P.afd} value={43.8} decimals={1} suffix=" %" color={P.afd} label="Bestes AfD-Ergebnis bei einer Landtagswahl" note="Höchster Wert einer Partei in Sachsen-Anhalt seit der Wiedervereinigung" />
);
const EBalken: React.FC = () => <Bars kicker="Landtagswahl Sachsen-Anhalt · 6.9.2026" rows={RESULT} source="Landeswahlleiterin Sachsen-Anhalt" />;
const EBsw: React.FC = () => (
  <Page>
    <div style={{display: 'flex', gap: 60}}>
      <FadeUp delay={4} style={{flex: 1}}>
        <div style={{border: `8px solid ${P.bsw}`, borderRadius: 24, padding: 50}}>
          <div style={{fontSize: 50, color: C.muted}}>Neu im Landtag</div>
          <div style={{fontSize: 110, fontWeight: 900, color: C.text}}>BSW 5,3 %</div>
        </div>
      </FadeUp>
      <FadeUp delay={50} style={{flex: 1}}>
        <div style={{border: `8px solid ${P.fdp}`, borderRadius: 24, padding: 50, opacity: 0.8}}>
          <div style={{fontSize: 50, color: C.muted}}>Raus</div>
          <div style={{fontSize: 110, fontWeight: 900, color: C.text, textDecoration: `line-through ${C.linke} 10px`}}>FDP</div>
        </div>
      </FadeUp>
    </div>
  </Page>
);
const EBeteiligung: React.FC = () => <BigNumber kicker="Wahlbeteiligung" kickerColor="#52525b" value={77.8} decimals={1} suffix=" %" color={C.accent} label="Rekord in Sachsen-Anhalt" />;
const ESitze: React.FC = () => <Hemicycle kicker="Sitzverteilung" groups={SEATS} majority={42} />;

// ---------- 2 Vorher ----------
const H2021: React.FC = () => (
  <Compare
    kicker="CDU und AfD im Vergleich"
    left={{label: '2021', rows: [{name: 'CDU', value: 37.1, color: P.cdu}, {name: 'AfD', value: 20.8, color: P.afd}]}}
    right={{label: '2026', rows: [{name: 'CDU', value: 17.2, color: P.cdu}, {name: 'AfD', value: 43.8, color: P.afd}]}}
  />
);
const HWechsel: React.FC = () => (
  <Timeline
    kicker="Machtwechsel in der CDU"
    items={[
      {date: '2011', text: 'Haseloff wird Ministerpräsident'},
      {date: 'Jan. 2026', text: 'Haseloff tritt zurück'},
      {date: '28.1.2026', text: 'Schulze gewählt – 58 Stimmen'},
      {date: '6.9.2026', text: 'Landtagswahl', color: C.linke},
    ]}
  />
);
const HAbsturz: React.FC = () => (
  <Page>
    <Bullets
      kicker="In gut sieben Monaten"
      step={60}
      items={[
        {icon: '↓', text: 'CDU: mehr als die Hälfte des Stimmenanteils weg', color: P.cdu},
        {icon: '×2', text: 'AfD: Ergebnis mehr als verdoppelt', color: P.afd},
      ]}
    />
  </Page>
);

// ---------- 3 Warum ----------
const WFrage: React.FC = () => (
  <SlamLines
    lines={[
      {text: 'Fast jeder Zweite', delay: 0},
      {text: 'wählt AfD. Warum?', delay: 24, color: C.accent},
    ]}
  />
);
const WArbeiter: React.FC = () => (
  <Bars
    kicker="Wahlverhalten von Arbeitern"
    max={70}
    rows={[
      {name: 'AfD', value: 59, color: P.afd},
      {name: 'CDU', value: 9, color: P.cdu},
    ]}
    source="Wahlanalyse Konrad-Adenauer-Stiftung / Infratest dimap"
  />
);
const WLage: React.FC = () => (
  <BigNumber kicker="Eigene wirtschaftliche Lage: schlecht" kickerColor="#52525b" value={65} suffix=" %" color={P.afd} label="davon wählten AfD" />
);
const WOsten: React.FC = () => (
  <BigNumber kicker="AfD-Wähler" kickerColor={P.afd} value={83} suffix=" %" color={C.accent} label="„Ostdeutsche sind in vielem noch Bürger zweiter Klasse“" note="Zustimmung unter AfD-Wählern" />
);
const WWanderung: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = 24;
  return (
    <Page>
      <FadeUp>
        <Kicker color="#52525b">Wählerwanderung · Infratest dimap</Kicker>
      </FadeUp>
      <div style={{display: 'flex', alignItems: 'center', gap: 60, marginTop: 60}}>
        <div style={{fontSize: 90, fontWeight: 900, color: C.text, background: P.cdu, padding: '20px 40px', borderRadius: 18}}>CDU</div>
        <div style={{flex: 1, position: 'relative', height: 80}}>
          {Array.from({length: dots}).map((_, i) => {
            const t = ((frame + i * 6) % 60) / 60;
            return <div key={i} style={{position: 'absolute', left: `${t * 100}%`, top: 30 + ((i * 17) % 30) - 15, width: 18, height: 18, borderRadius: 9, background: P.afd, opacity: 1 - t * 0.5}} />;
          })}
        </div>
        <div style={{fontSize: 90, fontWeight: 900, color: '#fff', background: P.afd, padding: '20px 40px', borderRadius: 18}}>AfD</div>
      </div>
      <H size={110} delay={20} color={C.accent}>
        ≈ 82.000 Wähler
      </H>
    </Page>
  );
};
const WBund: React.FC = () => (
  <BigNumber kicker="Vorwurf an die CDU" kickerColor={P.cdu} value={86} suffix=" %" color={C.linke} label="„Wahlversprechen nicht gehalten“" note="Unzufriedenheit mit der Bundesregierung" />
);

// ---------- 4 Siegmund ----------
const SPerson: React.FC = () => (
  <Person kicker="AfD-Spitzenkandidat" name="Ulrich Siegmund" initials="US" color={P.afd} facts={['35 Jahre', 'aus Tangermünde', 'Groß- und Außenhandelskaufmann']} />
);
const SRekord: React.FC = () => (
  <Bullets
    kicker="Wenn er gewählt würde"
    kickerColor={P.afd}
    step={70}
    items={[
      {icon: '1', text: 'Jüngster Ministerpräsident der Bundesrepublik', color: P.afd},
      {icon: '1', text: 'Erster Ministerpräsident der AfD', color: P.afd},
    ]}
  />
);
const SSocial: React.FC = () => (
  <Page>
    <div style={{display: 'flex', gap: 60}}>
      <FadeUp delay={4} style={{flex: 1}}>
        <div style={{background: '#111', border: '4px solid #25f4ee', borderRadius: 30, padding: 50, textAlign: 'center'}}>
          <div style={{fontSize: 60, color: '#fff', fontWeight: 900}}>TikTok</div>
          <div style={{fontSize: 120, fontWeight: 900, color: '#25f4ee'}}>
            &gt; <CountUp to={820000} delay={8} />
          </div>
          <div style={{fontSize: 44, color: C.muted}}>Follower</div>
        </div>
      </FadeUp>
      <FadeUp delay={60} style={{flex: 1}}>
        <div style={{background: '#111', border: '4px solid #e1306c', borderRadius: 30, padding: 50, textAlign: 'center'}}>
          <div style={{fontSize: 60, color: '#fff', fontWeight: 900}}>Instagram</div>
          <div style={{fontSize: 120, fontWeight: 900, color: '#e1306c'}}>
            &gt; <CountUp to={600000} delay={64} />
          </div>
          <div style={{fontSize: 44, color: C.muted}}>Follower</div>
        </div>
      </FadeUp>
    </div>
  </Page>
);
const SAuftritt: React.FC = () => (
  <Page center>
    <div style={{fontSize: 200}}>🙂</div>
    <H size={90}>Freundlich im Ton</H>
    <Sub delay={40}>wirkt gemäßigter als viele in seinem Landesverband</Sub>
  </Page>
);
const SProgramm: React.FC = () => (
  <Bullets
    kicker="AfD-Wahlprogramm"
    kickerColor={P.afd}
    step={60}
    items={[
      {icon: '✕', text: 'Grundrecht auf Asyl abschaffen', color: C.linke},
      {icon: '🏢', text: 'Eigenes Amt für „Remigration“', color: C.linke},
    ]}
  />
);
const SUkraine: React.FC = () => (
  <Bullets
    kicker="AfD-Wahlprogramm"
    kickerColor={P.afd}
    step={80}
    items={[
      {icon: '🇺🇦', text: 'Ukrainer nicht mehr als Kriegsflüchtlinge anerkennen', color: C.panel},
      {icon: '📚', text: 'Geschichtsunterricht: mehr Kaiserreich', color: C.panel},
    ]}
  />
);

// ---------- 5 Verfassungsschutz ----------
const VEinstufung: React.FC = () => (
  <Stamp top="Verfassungsschutz Sachsen-Anhalt, seit 2023" text="gesichert rechtsextremistisch" color={C.linke} note="Einstufung des AfD-Landesverbands" />
);
const VGruende: React.FC = () => (
  <Bullets
    kicker="Begründung (Auszug)"
    kickerColor="#52525b"
    step={60}
    items={[
      {icon: '1', text: 'Ethnischer Volksbegriff im Programm'},
      {icon: '2', text: 'Abwertung von Migranten und Muslimen'},
    ]}
  />
);
const VAfd: React.FC = () => (
  <Steps
    kicker="Position der AfD"
    stepDelay={60}
    steps={[
      {title: 'AfD', text: 'Hält die Einstufung für rechtswidrig', color: P.afd},
      {title: 'Gericht', text: 'Verfahren ruht, bis über die Bundespartei entschieden ist', color: '#3f3f46'},
    ]}
  />
);

// ---------- 6 Ändern ----------
const AIntro: React.FC = () => (
  <SlamLines
    lines={[
      {text: 'Was könnte eine', delay: 0, color: C.text},
      {text: 'AfD-Regierung', delay: 14, color: P.afd},
      {text: 'entscheiden?', delay: 28, color: C.text},
    ]}
    size={110}
  />
);
const ARundfunk: React.FC = () => (
  <Timeline
    kicker="Rundfunk"
    items={[
      {date: 'Tag 1', text: 'Rundfunkstaatsverträge kündigen', color: P.afd},
      {date: 'Fristen', text: 'Kündigungsfristen laufen'},
      {date: 'Ende 2028', text: 'Möglicher Ausstieg aus dem MDR', color: C.linke},
    ]}
  />
);
const AVs: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color={C.linke}>Pikant</Kicker>
    </FadeUp>
    <div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 40}}>
      {[
        {t: 'Landesregierung', c: P.afd},
        {t: 'Innenministerium', c: '#3f3f46'},
        {t: 'Verfassungsschutz', c: '#3f3f46'},
      ].map((b, i) => (
        <FadeUp key={b.t} delay={10 + i * 25} style={{display: 'flex', alignItems: 'center', gap: 40}}>
          {i > 0 ? <div style={{fontSize: 70, color: C.accent}}>→</div> : null}
          <div style={{background: b.c, color: '#fff', fontSize: 46, fontWeight: 800, padding: '30px 36px', borderRadius: 18}}>{b.t}</div>
        </FadeUp>
      ))}
    </div>
    <Sub delay={100} size={46}>
      Laut Programm künftig nur noch: Spionage- und Terrorabwehr
    </Sub>
  </Page>
);
const ASchule: React.FC = () => (
  <Bullets
    kicker="Schule"
    kickerColor="#52525b"
    step={60}
    items={[
      {icon: '🏠', text: 'Schulpflicht lockern – Unterricht zu Hause erlaubt'},
      {icon: '📝', text: 'Mit regelmäßigen Prüfungen'},
    ]}
  />
);
const ABundesrat: React.FC = () => (
  <BigNumber kicker="Bundesrat" kickerColor={P.afd} value={4} color={P.afd} label="Stimmen für Sachsen-Anhalt" note="Erstmals würde eine AfD-Regierung dort mitentscheiden" />
);
const AGrenzen: React.FC = () => (
  <Page center>
    <div style={{fontSize: 200}}>⚖️</div>
    <H size={84}>Grenze: das Grundgesetz</H>
    <Sub delay={30}>Verstöße können vor dem Verfassungsgericht landen</Sub>
  </Page>
);

// ---------- 7 Regeln ----------
const RFrage: React.FC = () => (
  <Page center>
    <Kicker color="#52525b">Landesverfassung</Kicker>
    <div style={{fontSize: 240, fontWeight: 900, color: C.text, lineHeight: 1}}>Art. 65</div>
    <Sub delay={20}>Wahl des Ministerpräsidenten</Sub>
  </Page>
);
const RUNDEN = [
  {title: '1. Wahlgang', text: 'Absolute Mehrheit: 42 Stimmen', color: '#1e3a5f'},
  {title: '2. Wahlgang', text: 'Absolute Mehrheit: 42 Stimmen', color: '#1e3a5f'},
  {title: '3. Wahlgang', text: 'Mehrheit der abgegebenen Stimmen – Enthaltungen zählen nicht', color: C.linke},
];
const RRunde12: React.FC = () => <Steps kicker="So wird gewählt" steps={RUNDEN} stepDelay={40} />;
const RRunde3: React.FC = () => <Steps kicker="So wird gewählt" steps={RUNDEN} active={2} stepDelay={0} />;
const RFolge: React.FC = () => (
  <Hemicycle
    groups={SEATS}
    highlight={['AfD']}
    side={
      <SeatSide
        title="3. Wahlgang"
        lines={[
          {text: 'AfD: 39 Stimmen', color: P.afd},
          {text: 'Genug Enthaltungen →', color: C.text},
          {text: 'Siegmund könnte gewinnen', color: C.accent},
        ]}
      />
    }
  />
);
const RFrist: React.FC = () => (
  <Stamp top="Frist für die Wahl des Ministerpräsidenten?" text="Keine" color={C.accent} note="Die Verfassung schreibt keinen Termin vor" />
);
const RSchulze: React.FC = () => (
  <Steps
    kicker="Solange niemand gewählt ist"
    stepDelay={70}
    steps={[
      {title: 'Sven Schulze (CDU)', text: 'bleibt geschäftsführend im Amt', color: P.cdu},
      {title: 'Neuwahl?', text: 'Nur mit Zwei-Drittel-Mehrheit zur Selbstauflösung', color: '#3f3f46'},
    ]}
  />
);

// ---------- 8 Parteien ----------
const PCdu: React.FC = () => (
  <Stamp top="CDU Sachsen-Anhalt" text="Opposition" color="#a1a1aa" note="Einladung der SPD zu Gesprächen abgelehnt" />
);
const PTullner: React.FC = () => (
  <Quote who="Marco Tullner" role="stellv. CDU-Landesvorsitzender" text="Der Ball liegt im Spielfeld der AfD." indirekt color="#a1a1aa" />
);
const PRechnung: React.FC = () => (
  <Hemicycle
    groups={SEATS}
    highlight={['Linke', 'Grüne', 'SPD', 'BSW', 'CDU']}
    side={<SeatSide title="Bündnis ohne AfD" lines={[{text: 'CDU + SPD + Grüne + Linke + BSW'}, {text: '= 44 Sitze', color: C.accent}]} />}
  />
);
const PBeschluss: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color={P.cdu}>CDU-Parteitagsbeschluss</Kicker>
    </FadeUp>
    <div style={{display: 'flex', gap: 60, marginTop: 50}}>
      {[
        {t: 'AfD', c: P.afd},
        {t: 'Linke', c: P.linke},
      ].map((b, i) => (
        <FadeUp key={b.t} delay={14 + i * 30} style={{flex: 1}}>
          <div style={{position: 'relative', background: b.c, borderRadius: 24, padding: 60, textAlign: 'center', fontSize: 110, fontWeight: 900, color: '#fff'}}>
            {b.t}
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 260, color: '#fff', opacity: 0.85}}>✕</div>
          </div>
        </FadeUp>
      ))}
    </div>
    <Sub delay={70}>Keine Koalition – mit keiner der beiden Parteien</Sub>
  </Page>
);
const PBsw: React.FC = () => (
  <Quote who="Thomas Schulze" role="BSW-Fraktionschef" text="Die Gespräche mit der AfD sind konstruktiv." color={P.bsw} indirekt />
);
const PBedingung: React.FC = () => (
  <Bullets
    kicker="Position des BSW"
    kickerColor={P.bsw}
    step={45}
    items={[
      {icon: '✕', text: 'Keine Koalition mit der AfD', color: C.linke},
      {icon: '✕', text: 'Bisher kein Ministerpräsident Siegmund', color: C.linke},
      {icon: '?', text: 'Wunsch: parteiloser Kandidat', color: P.bsw},
    ]}
  />
);
const PTolerierung: React.FC = () => (
  <Hemicycle
    groups={SEATS}
    highlight={['AfD', 'BSW']}
    side={<SeatSide title="AfD-Minderheitsregierung" lines={[{text: 'toleriert vom BSW', color: P.bsw}, {text: '39 + 5 = 44 Sitze', color: C.accent}]} />}
  />
);

// ---------- 9 Bund ----------
const BMerz: React.FC = () => (
  <Person kicker="Kanzler & CDU-Chef" name="Friedrich Merz" initials="FM" color="#52525b" facts={['Hält an der Brandmauer fest', 'Keine Zusammenarbeit mit der AfD']} />
);
const BSoeder: React.FC = () => (
  <Quote who="Markus Söder" role="CSU-Chef" text="Eine Antiwahl – die größte Ablehnung der letzten 50 Jahre." indirekt color="#0080c8" />
);
const BDebatte: React.FC = () => {
  const frame = useCurrentFrame();
  const crack = interpolate(frame, [40, 60], [0, 1], clamp);
  return (
    <Page center>
      <div style={{display: 'flex', gap: 10, transform: `rotate(${crack * -2}deg)`}}>
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} style={{width: 120, height: 70, background: '#7c2d12', border: '4px solid #431407', transform: `translateY(${crack * ((i % 3) - 1) * 30}px) rotate(${crack * ((i % 4) - 1.5) * 6}deg)`}} />
        ))}
      </div>
      <H size={90} delay={10}>
        Wie lange hält die Brandmauer?
      </H>
    </Page>
  );
};

// ---------- 10 Szenarien ----------
const ZTermin: React.FC = () => (
  <Timeline
    kicker="Zeitplan"
    items={[
      {date: '6.9.', text: 'Landtagswahl'},
      {date: '6.10.', text: 'Erste Sitzung – eröffnet von Eva von Angern (Linke)', color: P.linke},
      {date: 'Nov./Dez.', text: 'Wahl des Ministerpräsidenten erwartet', color: C.linke},
    ]}
  />
);
const ZSpaeter: React.FC = () => (
  <Page center>
    <div style={{fontSize: 180}}>⏳</div>
    <H size={96}>Wahl eher im November oder Dezember</H>
  </Page>
);
const SZEN = [
  {title: 'Szenario 1', text: 'Siegmund im 3. Wahlgang – mit Enthaltungen oder BSW-Stimmen', color: P.afd},
  {title: 'Szenario 2', text: 'AfD-Minderheitsregierung, toleriert vom BSW', color: P.bsw},
  {title: 'Szenario 3', text: 'Hängepartie – Schulze bleibt geschäftsführend', color: P.cdu},
];
const Z1: React.FC = () => <Steps kicker="Drei Szenarien" steps={SZEN} active={0} stepDelay={10} />;
const Z2: React.FC = () => <Steps kicker="Drei Szenarien" steps={SZEN} active={1} stepDelay={0} />;
const Z3: React.FC = () => <Steps kicker="Drei Szenarien" steps={SZEN} active={2} stepDelay={0} />;

// ---------- 11 Fazit ----------
const FErstmals: React.FC = () => (
  <SlamLines
    lines={[
      {text: 'Zum ersten Mal', delay: 0},
      {text: 'könnte die AfD', delay: 16, color: P.afd},
      {text: 'ein Land regieren', delay: 32},
    ]}
    size={120}
  />
);
const FWenige: React.FC = () => (
  <Hemicycle groups={SEATS} highlight={['BSW']} side={<SeatSide title="Es kommt auf wenige an" lines={[{text: 'z. B. 5 BSW-Abgeordnete', color: P.bsw}]} />} />
);
const FFrage: React.FC = () => (
  <Page>
    <div style={{display: 'flex', gap: 60}}>
      <FadeUp delay={4} style={{flex: 1}}>
        <div style={{background: P.afd, borderRadius: 24, padding: 50, minHeight: 320}}>
          <div style={{fontSize: 56, fontWeight: 900, color: '#fff'}}>A</div>
          <div style={{fontSize: 52, color: '#fff', marginTop: 16}}>AfD regieren lassen – sie hat klar gewonnen</div>
        </div>
      </FadeUp>
      <FadeUp delay={70} style={{flex: 1}}>
        <div style={{background: '#3f3f46', borderRadius: 24, padding: 50, minHeight: 320}}>
          <div style={{fontSize: 56, fontWeight: 900, color: '#fff'}}>B</div>
          <div style={{fontSize: 52, color: '#fff', marginTop: 16}}>Die anderen Parteien müssen es verhindern</div>
        </div>
      </FadeUp>
    </div>
    <Sub delay={100} size={46}>
      Was meint ihr?
    </Sub>
  </Page>
);
const FAbo: React.FC = () => (
  <Page center>
    <FadeUp>
      <div style={{fontSize: 140}}>💬</div>
    </FadeUp>
    <H size={96}>Schreibt es in die Kommentare</H>
    <FadeUp delay={30}>
      <div style={{marginTop: 30, background: C.linke, color: '#fff', fontSize: 60, fontWeight: 900, padding: '14px 50px', borderRadius: 14, display: 'inline-block'}}>🔔 Abonnieren</div>
    </FadeUp>
    <Sub delay={60} size={24}>
      Quellen: Landeswahlleiterin Sachsen-Anhalt, bpb, KAS-Wahlanalyse, Infratest dimap, Landesverfassung Sachsen-Anhalt, Verfassungsschutz Sachsen-Anhalt, ZDFheute, Tagesspiegel/dpa, t-online, LTO, beck-aktuell, CORRECTIV (Sept. 2026)
    </Sub>
  </Page>
);


// ---------- Aufstieg der AfD ----------
const VERLAUF: BarRow[] = [
  {name: '2016', value: 24.3, color: P.afd},
  {name: '2021', value: 20.8, color: P.afd},
  {name: '2026', value: 43.8, color: P.afd},
];
const AFD_VERLAUF = (year: string) => <Bars kicker="AfD bei Landtagswahlen in Sachsen-Anhalt" rows={VERLAUF} highlight={year} source="Landeswahlleiterin Sachsen-Anhalt" />;
const G2016: React.FC = () => AFD_VERLAUF('2016');
const G2021: React.FC = () => AFD_VERLAUF('2021');
const G2026: React.FC = () => AFD_VERLAUF('2026');

// ---------- Schulze ----------
const SchPerson: React.FC = () => (
  <Person kicker="Ministerpräsident (CDU), geschäftsführend" name="Sven Schulze" initials="SS" color="#52525b" facts={['47 Jahre', 'aus Quedlinburg', 'studierter Ingenieur']} />
);
const SchKarriere: React.FC = () => (
  <Timeline
    kicker="Karriere"
    items={[
      {date: '2014–2021', text: 'Europaparlament'},
      {date: '2021', text: 'Wirtschaftsminister & CDU-Landeschef'},
      {date: 'Jan. 2026', text: 'Ministerpräsident'},
      {date: 'Sept. 2026', text: 'Wahlniederlage', color: C.linke},
    ]}
  />
);
const SchLage: React.FC = () => <Stamp top="Sven Schulze" text="Auf Abruf" color="#a1a1aa" note="Ministerpräsident, bis ein Nachfolger gewählt ist" />;

// ---------- Wirtschaft ----------
const XWarnung: React.FC = () => (
  <Page center>
    <div style={{fontSize: 180}}>⚠️</div>
    <H size={90}>Wirtschaft warnt</H>
    <Sub delay={30}>Das wichtigste Thema: Fachkräfte</Sub>
  </Page>
);
const XProgramm: React.FC = () => (
  <Bullets kicker="AfD-Wahlprogramm" kickerColor={P.afd} step={40} items={[{icon: '✕', text: 'Keine „kulturfremden“ Fachkräfte mehr anwerben', color: C.linke}]} />
);
const XHandel: React.FC = () => (
  <Quote who="Alexander von Preen" role="Präsident Handelsverband Deutschland" text="Abschottung und Ausgrenzung führen in die Irre." indirekt color={C.accent} />
);
const XDemografie: React.FC = () => (
  <BigNumber kicker="VDMA · Arbeitsmarkt in 9 Jahren" kickerColor="#52525b" value={12} prefix="−" suffix=" %" color={C.linke} label="weniger Erwerbspersonen" note="Sachsen-Anhalt hat die älteste Bevölkerung Deutschlands" />
);
const XArbeitslos: React.FC = () => (
  <Bars
    kicker="Arbeitslosenquote · August 2026"
    max={10}
    rows={[
      {name: 'Sachsen-Anhalt', value: 8.2, color: C.linke},
      {name: 'Bund', value: 6.5, color: '#52525b'},
    ]}
  />
);

// ---------- Minderheitsregierung ----------
const MDef: React.FC = () => (
  <Page center>
    <Kicker color="#52525b">Begriff</Kicker>
    <H size={110}>Minderheitsregierung</H>
    <Sub delay={30}>Regierung ohne eigene Mehrheit im Landtag</Sub>
  </Page>
);
const MTolerierung: React.FC = () => (
  <Steps
    kicker="Tolerierung"
    stepDelay={50}
    steps={[
      {title: 'Nicht in der Regierung', text: 'Die Partei stellt keine Minister', color: '#3f3f46'},
      {title: 'Aber Stimmen', text: 'bei wichtigen Abstimmungen', color: P.bsw},
      {title: 'Gegenleistung', text: 'meist inhaltliche Zugeständnisse', color: C.linke},
    ]}
  />
);
const MRechnung: React.FC = () => (
  <Hemicycle groups={SEATS} highlight={['AfD']} side={<SeatSide title="Jedes Gesetz, jeder Haushalt" lines={[{text: 'AfD: 39 Stimmen', color: P.afd}, {text: '+ 3 aus anderen Fraktionen'}, {text: '= 42', color: C.accent}]} />} />
);
const MHoeppner: React.FC = () => (
  <Person kicker="Magdeburger Modell · 1994–2002" name="Reinhard Höppner" initials="RH" color={P.spd} facts={['SPD-Ministerpräsident', 'ohne eigene Mehrheit', 'toleriert von der PDS']} />
);
const MSachsen: React.FC = () => (
  <Person kicker="Sachsen · heute" name="Michael Kretschmer" initials="MK" color="#52525b" facts={['CDU-Ministerpräsident', 'Koalition ohne eigene Mehrheit']} />
);

// ---------- Thüringen ----------
const T2020: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color="#52525b">Thüringen · Februar 2020</Kicker>
    </FadeUp>
    <H size={96}>Thomas Kemmerich (FDP) wird Ministerpräsident</H>
    <div style={{display: 'flex', gap: 20, marginTop: 40}}>
      {[
        {t: 'CDU', c: P.cdu},
        {t: 'FDP', c: '#b59b00'},
        {t: 'AfD', c: P.afd},
      ].map((b, i) => (
        <FadeUp key={b.t} delay={30 + i * 15}>
          <div style={{background: b.c, color: '#fff', fontSize: 56, fontWeight: 900, padding: '16px 40px', borderRadius: 14, border: b.c === P.cdu ? '2px solid #71717a' : undefined}}>{b.t}</div>
        </FadeUp>
      ))}
    </div>
  </Page>
);
const TRuecktritt: React.FC = () => <Stamp top="Staatskrise" text="Rücktritt nach 3 Tagen" color={C.linke} />;
const T2024: React.FC = () => (
  <Page>
    <FadeUp>
      <Kicker color="#52525b">Thüringen · 2024</Kicker>
    </FadeUp>
    <div style={{display: 'flex', gap: 60, marginTop: 30, alignItems: 'center'}}>
      <div style={{flex: 1}}>
        <div style={{fontSize: 200, fontWeight: 900, color: P.afd, lineHeight: 1}}>
          <CountUp to={32.8} delay={6} decimals={1} suffix=" %" />
        </div>
        <H size={50}>AfD stärkste Kraft</H>
      </div>
      <FadeUp delay={60} style={{flex: 1}}>
        <div style={{background: '#4a1f3d', borderRadius: 24, padding: 40}}>
          <div style={{fontSize: 90}}>🫐</div>
          <div style={{fontSize: 54, fontWeight: 900, color: '#fff'}}>Brombeer-Koalition</div>
          <div style={{fontSize: 40, color: '#fff', marginTop: 10}}>CDU + BSW + SPD</div>
        </div>
      </FadeUp>
    </div>
  </Page>
);
const THeute: React.FC = () => (
  <Bullets
    kicker="Thüringen · heute"
    kickerColor="#52525b"
    step={60}
    items={[
      {icon: '🚪', text: 'BSW-Spitze aus der Partei ausgetreten', color: P.bsw},
      {icon: '🤝', text: 'Koalition sucht Mehrheiten mit der Linken', color: P.linke},
    ]}
  />
);
const TLehre: React.FC = () => (
  <SlamLines
    lines={[
      {text: 'Mehrheiten ohne AfD:', delay: 0},
      {text: 'möglich –', delay: 18, color: C.gruene},
      {text: 'aber zerbrechlich', delay: 36, color: C.linke},
    ]}
    size={110}
  />
);

export const VISUALS: Record<string, React.FC> = {
  'g-2016': G2016,
  'g-2021': G2021,
  'g-2026': G2026,
  'sch-person': SchPerson,
  'sch-karriere': SchKarriere,
  'sch-lage': SchLage,
  'x-warnung': XWarnung,
  'x-programm': XProgramm,
  'x-handel': XHandel,
  'x-demografie': XDemografie,
  'x-arbeitslos': XArbeitslos,
  'm-def': MDef,
  'm-tolerierung': MTolerierung,
  'm-rechnung': MRechnung,
  'm-hoeppner': MHoeppner,
  'm-sachsen': MSachsen,
  't-2020': T2020,
  't-ruecktritt': TRuecktritt,
  't-2024': T2024,
  't-heute': THeute,
  't-lehre': TLehre,
  musik: Musik,
  'i-zahl': IZahl,
  'i-neuland': INeuland,
  'i-lage': ILage,
  'i-frage': IFrage,
  'i-agenda': IAgenda,
  'e-afd': EAfd,
  'e-balken': EBalken,
  'e-bsw': EBsw,
  'e-beteiligung': EBeteiligung,
  'e-sitze': ESitze,
  'h-2021': H2021,
  'h-wechsel': HWechsel,
  'h-absturz': HAbsturz,
  'w-frage': WFrage,
  'w-arbeiter': WArbeiter,
  'w-lage': WLage,
  'w-osten': WOsten,
  'w-wanderung': WWanderung,
  'w-bund': WBund,
  's-person': SPerson,
  's-rekord': SRekord,
  's-social': SSocial,
  's-auftritt': SAuftritt,
  's-programm': SProgramm,
  's-ukraine': SUkraine,
  'v-einstufung': VEinstufung,
  'v-gruende': VGruende,
  'v-afd': VAfd,
  'a-intro': AIntro,
  'a-rundfunk': ARundfunk,
  'a-vs': AVs,
  'a-schule': ASchule,
  'a-bundesrat': ABundesrat,
  'a-grenzen': AGrenzen,
  'r-frage': RFrage,
  'r-runde12': RRunde12,
  'r-runde3': RRunde3,
  'r-folge': RFolge,
  'r-frist': RFrist,
  'r-schulze': RSchulze,
  'p-cdu': PCdu,
  'p-tullner': PTullner,
  'p-rechnung': PRechnung,
  'p-beschluss': PBeschluss,
  'p-bsw': PBsw,
  'p-bedingung': PBedingung,
  'p-tolerierung': PTolerierung,
  'b-merz': BMerz,
  'b-soeder': BSoeder,
  'b-debatte': BDebatte,
  'z-termin': ZTermin,
  'z-spaeter': ZSpaeter,
  'z-1': Z1,
  'z-2': Z2,
  'z-3': Z3,
  'f-erstmals': FErstmals,
  'f-wenige': FWenige,
  'f-frage': FFrage,
  'f-abo': FAbo,
};
