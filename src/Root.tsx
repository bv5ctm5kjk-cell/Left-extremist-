import {Composition} from 'remotion';
import {BerlinVideo, BerlinVideoProps} from './BerlinVideo';
import {FPS, TOTAL_FRAMES} from './script';

const defaultProps: BerlinVideoProps = {
  // Eigene Sprachaufnahme als public/voiceover.mp3 ablegen und hier
  // 'voiceover.mp3' eintragen. null = Video ohne Sprecher.
  voiceover: 'voiceover.mp3',
  untertitel: true,
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="BerlinVideo"
    component={BerlinVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={defaultProps}
  />
);
