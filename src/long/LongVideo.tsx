// Rahmen für lange YouTube-Videos (16:9) mit Kapiteln.
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop, Flash, KINDS, ShotFx} from '../shorts/fx';
import {Bg, FPS, VoicePart, shotFrames} from '../shorts/types';
import {C, FONT} from '../theme';

export type LongShot = {id: string; chapter: string; bg: Bg; seconds: number; text: string};
export type Chapter = {id: string; nr: number; title: string};

export type LongVideoProps = {
  stimme: boolean;
  musik: string;
  untertitel: boolean;
};

type Config = {
  shots: LongShot[];
  chapters: Chapter[];
  visuals: Record<string, React.FC>;
  voiceParts: VoicePart[];
  hits: Set<string>;
  introSeconds: number;
};

const WHOOSH_LEAD = 10;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const isChapterCard = (id: string) => id.startsWith('kap-');

export const buildTimeline = (shots: LongShot[]) => {
  let from = 0;
  return shots.map((shot, i) => {
    const start = from;
    const duration = shotFrames(shot.seconds);
    from += duration;
    return {...shot, start, duration, kind: KINDS[i % KINDS.length]};
  });
};

export const LongVideo: React.FC<LongVideoProps & Config> = ({
  stimme,
  musik,
  untertitel,
  shots,
  chapters,
  visuals,
  voiceParts,
  hits,
  introSeconds,
}) => {
  const timeline = buildTimeline(shots);
  const total = timeline.reduce((a, s) => a + s.duration, 0);
  const introFrames = introSeconds * FPS;
  const cards = timeline.filter((s) => isChapterCard(s.id));

  // Musik: laut im Intro und auf den Kapitelkarten, sonst leise unter der Stimme.
  const musicVolume = (f: number) => {
    let v = interpolate(f, [introFrames - 4, introFrames + 8], [0.9, 0.12], clamp);
    for (const c of cards) {
      v = Math.max(v, interpolate(f, [c.start - 6, c.start + 4, c.start + c.duration - 8, c.start + c.duration + 4], [0.12, 0.6, 0.6, 0.12], clamp));
    }
    v = Math.max(v, interpolate(f, [total - 60, total - 40], [0.12, 0.5], clamp) * interpolate(f, [total - 20, total], [1, 0], clamp));
    return v;
  };

  return (
    <AbsoluteFill style={{fontFamily: FONT, background: C.bg}}>
      <Audio src={staticFile(musik)} volume={musicVolume} />
      {stimme
        ? voiceParts.map((part) => {
            const shot = timeline.find((s) => s.id === part.firstShot);
            return shot ? (
              <Sequence key={part.file} from={shot.start} layout="none">
                <Audio src={staticFile(part.file)} />
              </Sequence>
            ) : null;
          })
        : null}

      {timeline.map((shot) => {
        const chapter = chapters.find((c) => c.id === shot.chapter);
        const Visual = isChapterCard(shot.id) ? () => <ChapterCard chapter={chapter!} /> : visuals[shot.id];
        return (
          <Sequence key={shot.id} from={shot.start} durationInFrames={shot.duration} name={shot.id}>
            <BackdropAt bg={shot.bg} offset={shot.start} />
            <ShotFx kind={isChapterCard(shot.id) ? 'punch' : shot.kind} duration={shot.duration}>
              {Visual ? <Visual /> : <Missing id={shot.id} />}
            </ShotFx>
            {shot.start > 0 ? <Flash color={hits.has(shot.id) || isChapterCard(shot.id) ? C.linke : '#ffffff'} /> : null}
            {chapter && chapter.nr > 0 && !isChapterCard(shot.id) ? <ChapterTag chapter={chapter} /> : null}
            {untertitel && shot.text ? <Untertitel text={shot.text} /> : null}
          </Sequence>
        );
      })}

      {timeline.slice(2).map((shot) => (
        <Sequence key={`w-${shot.id}`} from={shot.start - WHOOSH_LEAD} durationInFrames={30} layout="none">
          <Audio src={staticFile('whoosh.mp3')} volume={isChapterCard(shot.id) ? 0.4 : 0.18} />
        </Sequence>
      ))}
      {timeline
        .filter((s) => (hits.has(s.id) || isChapterCard(s.id)) && s.start > introFrames)
        .map((shot) => (
          <Sequence key={`h-${shot.id}`} from={shot.start} durationInFrames={30} layout="none">
            <Audio src={staticFile('impact.mp3')} volume={0.4} />
          </Sequence>
        ))}
      <ChapterProgress timeline={timeline} total={total} />
    </AbsoluteFill>
  );
};

const Missing: React.FC<{id: string}> = ({id}) => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: 40}}>{id}</AbsoluteFill>
);

const BackdropAt: React.FC<{bg: Bg; offset: number}> = ({bg, offset}) => {
  const frame = useCurrentFrame();
  return <Backdrop bg={bg} globalFrame={offset + frame} />;
};

const ChapterCard: React.FC<{chapter: Chapter}> = ({chapter}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - 2, fps, config: {damping: 14}});
  const line = interpolate(frame, [6, 26], [0, 1], clamp);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontSize: 40, letterSpacing: 18, color: C.linke, fontWeight: 900, opacity: p}}>KAPITEL {chapter.nr}</div>
      <div style={{fontSize: 130, fontWeight: 900, color: C.text, textAlign: 'center', maxWidth: 1600, lineHeight: 1.05, marginTop: 20, transform: `scale(${0.8 + 0.2 * p})`, opacity: p}}>
        {chapter.title}
      </div>
      <div style={{height: 10, width: 600 * line, background: C.linke, marginTop: 40}} />
    </AbsoluteFill>
  );
};

const ChapterTag: React.FC<{chapter: Chapter}> = ({chapter}) => (
  <div
    style={{
      position: 'absolute',
      top: 44,
      left: 60,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      fontSize: 26,
      fontWeight: 700,
      color: 'rgba(255,255,255,0.75)',
      letterSpacing: 2,
    }}
  >
    <span style={{background: C.linke, color: '#fff', padding: '4px 12px', borderRadius: 6}}>{chapter.nr}</span>
    {chapter.title.toUpperCase()}
  </div>
);

const ChapterProgress: React.FC<{timeline: ReturnType<typeof buildTimeline>; total: number}> = ({timeline, total}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'rgba(255,255,255,0.1)'}}>
      <div style={{height: '100%', width: `${(frame / total) * 100}%`, background: C.linke}} />
      {timeline
        .filter((s) => isChapterCard(s.id))
        .map((s) => (
          <div key={s.id} style={{position: 'absolute', top: 0, left: `${(s.start / total) * 100}%`, width: 4, height: 10, background: '#fff'}} />
        ))}
    </div>
  );
};

const Untertitel: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - 3, fps, config: {damping: 14, stiffness: 180}});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', padding: '0 200px 60px'}}>
      <div
        style={{
          background: 'rgba(0,0,0,0.78)',
          color: '#fff',
          fontSize: 34,
          fontWeight: 600,
          lineHeight: 1.35,
          padding: '16px 28px',
          borderRadius: 12,
          textAlign: 'center',
          maxWidth: 1500,
          borderBottom: `4px solid ${C.linke}`,
          opacity: p,
          transform: `translateY(${(1 - p) * 30}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
