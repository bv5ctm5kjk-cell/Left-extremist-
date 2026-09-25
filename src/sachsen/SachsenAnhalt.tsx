import {AbsoluteFill} from 'remotion';
import {LongVideo, LongVideoProps} from '../long/LongVideo';
import {P} from '../long/templates';
import {Backdrop} from '../shorts/fx';
import {C, FONT} from '../theme';
import {CHAPTERS, SHOTS, VOICE_PARTS} from './script';
import {VISUALS} from './visuals';

const HITS = new Set(['i-zahl', 'e-afd', 'e-sitze', 'h-absturz', 'v-einstufung', 'a-vs', 'r-runde3', 'p-cdu', 'p-tolerierung', 'f-erstmals']);

export const SachsenAnhalt: React.FC<LongVideoProps> = (props) => (
  <LongVideo {...props} shots={SHOTS} chapters={CHAPTERS} visuals={VISUALS} voiceParts={VOICE_PARTS} hits={HITS} introSeconds={4} />
);

// YouTube-Thumbnail (1280×720).
export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily: FONT}}>
    <Backdrop bg="alarm" globalFrame={40} />
    <AbsoluteFill style={{padding: '50px 60px', justifyContent: 'center'}}>
      <div style={{fontSize: 44, fontWeight: 900, color: '#fff', background: C.linke, alignSelf: 'flex-start', padding: '6px 22px', transform: 'rotate(-2deg)'}}>
        SACHSEN-ANHALT
      </div>
      <div style={{fontSize: 210, fontWeight: 900, color: P.afd, lineHeight: 1, marginTop: 20, textShadow: '0 8px 0 #000, 0 0 60px rgba(0,158,224,0.6)'}}>43,8 %</div>
      <div style={{fontSize: 96, fontWeight: 900, color: '#fff', lineHeight: 1.02, textShadow: '0 6px 0 #000', textTransform: 'uppercase'}}>
        Wer regiert
        <br />
        <span style={{color: C.accent}}>jetzt?</span>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
