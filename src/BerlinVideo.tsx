import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
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

export const BerlinVideo: React.FC<BerlinVideoProps> = ({voiceover, untertitel}) => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: FONT}}>
      {voiceover ? <Audio src={staticFile(voiceover)} /> : null}
      {SCENES.map((scene) => {
        const duration = sceneFrames(scene.seconds);
        const Scene = SCENE_COMPONENTS[scene.id];
        const start = from;
        from += duration;
        return (
          <Sequence key={scene.id} from={start} durationInFrames={duration} name={scene.id}>
            <Scene />
            {untertitel ? <Untertitel text={scene.text} /> : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const Untertitel: React.FC<{text: string}> = ({text}) => (
  <AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 70px 180px'}}>
    <div
      style={{
        background: 'rgba(0,0,0,0.72)',
        color: '#fff',
        fontSize: 40,
        lineHeight: 1.35,
        padding: '22px 30px',
        borderRadius: 14,
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  </AbsoluteFill>
);
