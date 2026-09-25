import {Composition} from 'remotion';
import {BerlinVideo, BerlinVideoProps} from './BerlinVideo';
import {FPS, TOTAL_FRAMES} from './script';
import {KocakTeil2, KocakTeil2Props} from './teil2/KocakTeil2';
import * as T2 from './teil2/script';

const defaultProps: BerlinVideoProps = {
  // Eigene Sprachaufnahme als public/voiceover.mp3 ablegen und hier
  // 'voiceover.mp3' eintragen. null = Video ohne Sprecher.
  voiceover: 'voiceover.mp3',
  untertitel: true,
};

const teil2Props: KocakTeil2Props = {
  // Aufnahme als public/voiceover-teil2.mp3 ablegen und hier eintragen.
  voiceover: null,
  musik: 'musik-teil2.mp3',
  untertitel: true,
};

export const RemotionRoot: React.FC = () => (
  <>
  <Composition
    id="BerlinVideo"
    component={BerlinVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={defaultProps}
  />
  <Composition
    id="KocakTeil2"
    component={KocakTeil2}
    durationInFrames={T2.TOTAL_FRAMES}
    fps={T2.FPS}
    width={1080}
    height={1920}
    defaultProps={teil2Props}
  />
  </>
);
