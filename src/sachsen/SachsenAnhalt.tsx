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

// YouTube-Thumbnail (1280×720): Schach als Bild für den Machtpoker.
const CHESS = '"FreeSerif", "DejaVu Sans", serif';

const Piece: React.FC<{
  glyph: string;
  color: string;
  size: number;
  x: number;
  y: number;
  label: string;
  rotate?: number;
  glow?: boolean;
}> = ({glyph, color, size, x, y, label, rotate = 0, glow}) => (
  <div style={{position: 'absolute', left: x, top: y, textAlign: 'center', transform: `translateX(-50%)`}}>
    <div
      style={{
        fontFamily: CHESS,
        fontSize: size,
        lineHeight: 1,
        color,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: '50% 90%',
        filter: `drop-shadow(0 0 3px #fff) drop-shadow(0 10px 12px rgba(0,0,0,0.8))${glow ? ` drop-shadow(0 0 40px ${color})` : ''}`,
      }}
    >
      {glyph}
      {'\uFE0E'}
    </div>
    <div
      style={{
        marginTop: -6,
        fontSize: 26,
        fontWeight: 900,
        color: '#fff',
        background: color,
        padding: '2px 12px',
        borderRadius: 6,
        display: 'inline-block',
        border: color === P.cdu ? '2px solid #8a8a94' : undefined,
      }}
    >
      {label}
    </div>
  </div>
);

export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{fontFamily: FONT, background: '#07080b', overflow: 'hidden'}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 70% 30%, rgba(0,158,224,0.35), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(224,36,58,0.35), transparent 55%)'}} />
    {/* Schachbrett in Perspektive */}
    <div style={{position: 'absolute', left: 360, top: 380, width: 1100, height: 700, perspective: 900}}>
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: 'rotateX(62deg)',
          transformOrigin: '50% 0%',
          backgroundImage: 'conic-gradient(#d9d2c3 25%, #2b2f38 0 50%, #d9d2c3 0 75%, #2b2f38 0)',
          backgroundSize: '220px 220px',
          boxShadow: '0 0 80px rgba(0,0,0,0.9) inset',
          opacity: 0.9,
        }}
      />
    </div>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 75%, #07080b 100%)'}} />
    <AbsoluteFill style={{background: 'linear-gradient(90deg, #07080b 30%, rgba(7,8,11,0.4) 55%, transparent 75%)'}} />
    <Piece glyph="♚" color={P.afd} size={300} x={960} y={150} label="AfD 43,8 %" glow />
    <Piece glyph="♞" color={P.bsw} size={170} x={1150} y={330} label="BSW" />
    <Piece glyph="♚" color="#9a9aa6" size={170} x={800} y={400} label="CDU" rotate={-78} />
    <Piece glyph="♜" color={P.spd} size={120} x={590} y={430} label="SPD" />
    <Piece glyph="♝" color={P.gruene} size={120} x={1205} y={540} label="Grüne" />
    <Piece glyph="♟" color={P.linke} size={110} x={1030} y={540} label="Linke" />
    <AbsoluteFill style={{padding: '60px 60px', justifyContent: 'center'}}>
      <div style={{fontSize: 40, fontWeight: 900, color: '#fff', background: C.linke, alignSelf: 'flex-start', padding: '6px 22px', transform: 'rotate(-2deg)'}}>
        SACHSEN-ANHALT
      </div>
      <div style={{fontSize: 118, fontWeight: 900, color: '#fff', lineHeight: 0.95, marginTop: 24, textShadow: '0 6px 0 #000', textTransform: 'uppercase'}}>
        Schach-
        <br />
        matt?
      </div>
      <div style={{fontSize: 52, fontWeight: 900, color: C.accent, marginTop: 20, textShadow: '0 4px 0 #000'}}>Wer regiert jetzt?</div>
    </AbsoluteFill>
  </AbsoluteFill>
);
