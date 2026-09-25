import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background, CutFlash, Grain, ProgressBar, SceneFx} from './effects';
import {Begriff, Intro, Kocak, Lagebild, Outro, Vorhaben, Wahl} from './scenes';
import {SCENES, SceneId, sceneFrames} from './script';
import {C, FONT} from './theme';

export type BerlinVideoProps = {
  voiceover: string | null;
  untertitel: boolean;
};

const SCENE_COMPONENTS: Record<SceneId, React.FC> = {
  intro: Intro,
  wahl: Wahl,
  vorhaben: Vorhaben,
  lagebild: Lagebild,
  begriff: Begriff,
  kocak: Kocak,
  outro: Outro,
};

// Der Whoosh erreicht nach ~0,35 s seinen Höhepunkt – so früh vor dem Schnitt starten.
const WHOOSH_LEAD = 10;

export const BerlinVideo: React.FC<BerlinVideoProps> = ({voiceover, untertitel}) => {
  let from = 0;
  const timeline = SCENES.map((scene) => {
    const start = from;
    const duration = sceneFrames(scene.seconds);
    from += duration;
    return {...scene, start, duration};
  });

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <Background />
      {voiceover ? <Audio src={staticFile(voiceover)} /> : null}
      {timeline.map((scene) => {
        const Scene = SCENE_COMPONENTS[scene.id];
        return (
          <Sequence key={scene.id} from={scene.start} durationInFrames={scene.duration} name={scene.id}>
            <SceneFx duration={scene.duration}>
              <Scene />
            </SceneFx>
            {scene.start > 0 ? <CutFlash color={scene.id === 'kocak' ? C.linke : '#ffffff'} /> : null}
            {untertitel ? <Untertitel text={scene.text} /> : null}
          </Sequence>
        );
      })}
      {timeline.slice(1).map((scene) => (
        <Sequence key={`sfx-${scene.id}`} from={Math.max(0, scene.start - WHOOSH_LEAD)} durationInFrames={30} layout="none">
          <Audio src={staticFile('whoosh.mp3')} volume={0.35} />
        </Sequence>
      ))}
      {timeline
        .filter((s) => s.id === 'kocak' || s.id === 'lagebild')
        .map((scene) => (
          <Sequence key={`hit-${scene.id}`} from={scene.start} durationInFrames={30} layout="none">
            <Audio src={staticFile('impact.mp3')} volume={0.5} />
          </Sequence>
        ))}
      <Grain />
      <ProgressBar />
    </AbsoluteFill>
  );
};

const Untertitel: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - 4, fps, config: {damping: 14, stiffness: 160}});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 70px 180px'}}>
      <div
        style={{
          background: 'rgba(0,0,0,0.78)',
          color: '#fff',
          fontSize: 40,
          lineHeight: 1.35,
          padding: '22px 30px',
          borderRadius: 14,
          textAlign: 'center',
          borderTop: `4px solid ${C.linke}`,
          opacity: interpolate(p, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px) scale(${interpolate(p, [0, 1], [0.94, 1])})`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
