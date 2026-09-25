import {ShortVideo, ShortVideoProps} from '../shorts/ShortVideo';
import {SHOTS, VOICE_PARTS} from './script';
import * as S from './shots';

const VISUALS: Record<string, React.FC> = {
  intro: S.IntroShot,
  hook1: S.Hook1,
  hook2: S.Hook2,
  volksentscheid: S.Volksentscheid,
  wer: S.Wer,
  wieviel: S.Wieviel,
  art15: S.Art15,
  kommission: S.Kommission,
  nichts: S.Nichts,
  plan: S.Plan,
  kosten: S.Kosten,
  pro: S.Pro,
  contra: S.Contra,
  battis: S.Battis,
  merz: S.Merz,
  verfassung: S.Verfassung,
  partner: S.Partner,
  frage: S.Frage,
  outro: S.Outro,
};

const HITS = new Set(['hook1', 'volksentscheid', 'kosten', 'contra', 'merz']);

export const Enteignung: React.FC<ShortVideoProps> = (props) => (
  <ShortVideo {...props} shots={SHOTS} visuals={VISUALS} voiceParts={VOICE_PARTS} hits={HITS} />
);
