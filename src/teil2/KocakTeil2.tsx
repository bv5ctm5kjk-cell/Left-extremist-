import {ShortVideo, ShortVideoProps} from '../shorts/ShortVideo';
import {SHOTS, VOICE_PARTS} from './script';
import * as S from './shots';

export type KocakTeil2Props = ShortVideoProps;

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

const HITS = new Set(['hook1', 'chat', 'fehler', 'bundestag', 'bedingung', 'r2g']);

export const KocakTeil2: React.FC<KocakTeil2Props> = (props) => (
  <ShortVideo {...props} shots={SHOTS} visuals={VISUALS} voiceParts={VOICE_PARTS} hits={HITS} />
);
