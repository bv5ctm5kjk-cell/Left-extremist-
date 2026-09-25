import {Composition} from 'remotion';
import {BerlinVideo, BerlinVideoProps} from './BerlinVideo';
import {FPS, TOTAL_FRAMES} from './script';
import {KocakTeil2, KocakTeil2Props} from './teil2/KocakTeil2';
import * as T2 from './teil2/script';
import {Enteignung} from './teil3/Enteignung';
import * as T3 from './teil3/script';
import {SachsenAnhalt, Thumbnail} from './sachsen/SachsenAnhalt';
import {SHOTS as SA_SHOTS} from './sachsen/script';
import {totalFrames} from './shorts/types';
import {Still} from 'remotion';

const defaultProps: BerlinVideoProps = {
  // Eigene Sprachaufnahme als public/voiceover.mp3 ablegen und hier
  // 'voiceover.mp3' eintragen. null = Video ohne Sprecher.
  voiceover: 'voiceover.mp3',
  untertitel: true,
};

const teil2Props: KocakTeil2Props = {
  // Sprachaufnahmen: siehe VOICE_PARTS in src/teil2/script.ts
  stimme: true,
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
  <Composition
    id="Enteignung"
    component={Enteignung}
    durationInFrames={T3.TOTAL_FRAMES}
    fps={T3.FPS}
    width={1080}
    height={1920}
    defaultProps={{stimme: true, musik: 'teil3/musik.mp3', untertitel: true}}
  />
  <Composition
    id="SachsenAnhalt"
    component={SachsenAnhalt}
    durationInFrames={totalFrames(SA_SHOTS)}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{stimme: true, musik: 'sachsen/musik.mp3', untertitel: true}}
  />
  <Still id="SachsenAnhaltThumbnail" component={Thumbnail} width={1280} height={720} />
  </>
);
