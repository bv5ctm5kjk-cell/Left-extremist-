import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Grain, ProgressBar} from '../effects';
import {C, FONT} from '../theme';
import {Backdrop, Flash, KINDS, ShotFx} from './fx';
import {FPS, INTRO_SECONDS, SHOTS, TOTAL_FRAMES, VOICE_PARTS, shotFrames} from './script';
import * as S from './shots';

export type KocakTeil2Props = {
  stimme: boolean;
  musik: string;
  untertitel: boolean;
};

const VISUALS: Record<string, React.FC> = {
  intro: S.IntroShot,
  hook1: S.Hook1,
  hook2: S.Hook2,
  chat: S.Chat,
  party: S.Party,
  fehler: S.Fehler,
  ruhen: S.Ruhen,
  gespalten: S.Gespalten,
  pellmann: S.Pellmann,
  reichinnek: S.Reichinnek,
  pau: S.Pau,
  gruene: S.Gruene,
  cdu: S.Cdu,
  bundestag: S.Bundestag,
  wahlsieg: S.Wahlsieg,
  bedingung: S.Bedingung,
  kloeckner: S.Kloeckner,
  eralp: S.Eralp,
  frage: S.Frage,
  r2g: S.R2g,
  outro: S.Outro,
};

// Einstellungen mit Impact-Sound und rotem Blitz.
const HITS = new Set(['hook1', 'chat', 'fehler', 'bundestag', 'bedingung', 'r2g']);
const WHOOSH_LEAD = 10;
const INTRO_FRAMES = INTRO_SECONDS * FPS;

export const KocakTeil2: React.FC<KocakTeil2Props> = ({stimme, musik, untertitel}) => {
  let from = 0;
  const timeline = SHOTS.map((shot, i) => {
    const start = from;
    const duration = shotFrames(shot.seconds);
    from += duration;
    return {...shot, start, duration, kind: KINDS[i % KINDS.length]};
  });

  const musicVolume = (f: number) => {
    const duck = interpolate(f, [INTRO_FRAMES - 4, INTRO_FRAMES + 8], [0.9, 0.16], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const tail = interpolate(f, [TOTAL_FRAMES - 45, TOTAL_FRAMES - 30, TOTAL_FRAMES], [0, 0.4, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return duck + tail;
  };

  return (
    <AbsoluteFill style={{fontFamily: FONT, background: C.bg}}>
      <Audio src={staticFile(musik)} volume={musicVolume} />
      {stimme
        ? VOICE_PARTS.map((part) => {
            const shot = timeline.find((s) => s.id === part.firstShot);
            return shot ? (
              <Sequence key={part.file} from={shot.start} layout="none">
                <Audio src={staticFile(part.file)} />
              </Sequence>
            ) : null;
          })
        : null}

      {timeline.map((shot) => {
        const Visual = VISUALS[shot.id];
        return (
          <Sequence key={shot.id} from={shot.start} durationInFrames={shot.duration} name={shot.id}>
            <BackdropAt bg={shot.bg} offset={shot.start} />
            <ShotFx kind={shot.kind} duration={shot.duration}>
              <Visual />
            </ShotFx>
            {shot.start > 0 ? <Flash color={HITS.has(shot.id) ? C.linke : '#ffffff'} /> : null}
            {untertitel && shot.text ? <Untertitel text={shot.text} /> : null}
          </Sequence>
        );
      })}

      {timeline.slice(2).map((shot) => (
        <Sequence key={`w-${shot.id}`} from={shot.start - WHOOSH_LEAD} durationInFrames={30} layout="none">
          <Audio src={staticFile('whoosh.mp3')} volume={0.3} />
        </Sequence>
      ))}
      {timeline
        .filter((s) => HITS.has(s.id) && s.id !== 'hook1')
        .map((shot) => (
          <Sequence key={`h-${shot.id}`} from={shot.start} durationInFrames={30} layout="none">
            <Audio src={staticFile('impact.mp3')} volume={0.45} />
          </Sequence>
        ))}
      <Grain />
      <ProgressBar />
    </AbsoluteFill>
  );
};

const BackdropAt: React.FC<{bg: (typeof SHOTS)[number]['bg']; offset: number}> = ({bg, offset}) => {
  const frame = useCurrentFrame();
  return <Backdrop bg={bg} globalFrame={offset + frame} />;
};

const Untertitel: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - 3, fps, config: {damping: 14, stiffness: 180}});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 70px 200px'}}>
      <div
        style={{
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.35,
          padding: '22px 30px',
          borderRadius: 14,
          textAlign: 'center',
          borderLeft: `8px solid ${C.linke}`,
          opacity: p,
          transform: `translateY(${(1 - p) * 40}px) scale(${0.94 + 0.06 * p})`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
