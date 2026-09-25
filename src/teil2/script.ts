// Teil 2: „Der Fall Koçak – was seitdem passiert ist“.
// Jede Einstellung (Shot) hat ihren Untertitel-Text und eine Dauer.
// Die Dauern entsprechen den Satzpausen in den Aufnahmen (public/teil2/).
import {INTRO_SECONDS, Shot, VoicePart, totalFrames} from '../shorts/types';

export {FPS} from '../shorts/types';

export const SHOTS: Shot[] = [
  {id: 'intro', bg: 'alarm', seconds: INTRO_SECONDS, text: ''},
  {id: 'hook1', bg: 'alarm', seconds: 2.52, text: 'Ein Chat, ein Clan-Chef und eine Partei unter Druck.'},
  {id: 'hook2', bg: 'nacht', seconds: 1.78, text: 'Was ist seit dem Fall Koçak passiert?'},
  {id: 'chat', bg: 'rot', seconds: 7.55, text: 'Kurz zur Erinnerung: Der Linken-Abgeordnete Ferat Koçak ließ über einen Sohn von Clanchef Issa Remmo „Grüße mit Respekt“ an den Vater ausrichten.'},
  {id: 'party', bg: 'spot', seconds: 5.45, text: 'Remmo selbst war zuvor ungeladen auf der Wahlparty der Neuköllner Linken aufgetaucht.'},
  {id: 'fehler', bg: 'nacht', seconds: 4.56, text: 'Koçak nennt den Kontakt einen Fehler. Er habe anfangs nicht gewusst, mit wem er schreibt.'},
  {id: 'ruhen', bg: 'grau', seconds: 3.94, text: 'Er lässt seine Ämter ruhen und bleibt dem Innenausschuss fern.'},
  {id: 'gespalten', bg: 'rot', seconds: 1.85, text: 'Die Linke reagiert gespalten.'},
  {id: 'pellmann', bg: 'rot', seconds: 3.95, text: 'Fraktionschef Sören Pellmann sagt, Koçak habe volle Transparenz versprochen.'},
  {id: 'reichinnek', bg: 'rot', seconds: 3.4, text: 'Heidi Reichinnek sagt: „Ich vertraue meinen Abgeordneten.“'},
  {id: 'pau', bg: 'nacht', seconds: 4.85, text: 'Die langjährige Linken-Politikerin Petra Pau hingegen sagt: „Mir reicht es langsam.“'},
  {id: 'gruene', bg: 'gruen', seconds: 2.85, text: 'Die Grünen fordern Koçaks Ausschluss aus der Fraktion.'},
  {id: 'cdu', bg: 'grau', seconds: 3.9, text: 'Aus der CDU kommt die Forderung, sein Mandat niederzulegen.'},
  {id: 'bundestag', bg: 'blau', seconds: 4.5, text: 'Und im Bundestag gab es auf Antrag der AfD eine hitzige Aktuelle Stunde.'},
  {id: 'wahlsieg', bg: 'spot', seconds: 4.8, text: 'Das Problem für Berlin: Die Linke hat die Wahl gewonnen und will mit SPD und Grünen regieren.'},
  {id: 'bedingung', bg: 'alarm', seconds: 8.1, text: 'Doch beide machen Gespräche davon abhängig, dass sich die Linke klar positioniert – zu Antisemitismus und zu organisierter Kriminalität.'},
  {id: 'kloeckner', bg: 'grau', seconds: 7.0, text: 'Bundestagspräsidentin Julia Klöckner rät SPD und Grünen sogar ganz davon ab, mit der Linken zu koalieren.'},
  {id: 'eralp', bg: 'rot', seconds: 6.3, text: 'Spitzenkandidatin Elif Eralp meint, es seien die richtigen Entscheidungen getroffen worden.'},
  {id: 'frage', bg: 'nacht', seconds: 3.7, text: 'Daher meine Frage an euch: Reicht das, um Vertrauen zurückzugewinnen?'},
  {id: 'r2g', bg: 'alarm', seconds: 3.9, text: 'Oder scheitert die rot-grün-rote Koalition schon vor dem Start?'},
  {id: 'outro', bg: 'nacht', seconds: 5.6, text: 'Schreibt es in die Kommentare – und lasst gerne ein Abo da.'},
];

// Sprachaufnahmen: jede startet mit der genannten Einstellung.
export const VOICE_PARTS: VoicePart[] = [
  {file: 'teil2/stimme-1.mp3', firstShot: 'hook1'},
  {file: 'teil2/stimme-2.mp3', firstShot: 'gespalten'},
  {file: 'teil2/stimme-3.mp3', firstShot: 'bundestag'},
  {file: 'teil2/stimme-4.mp3', firstShot: 'eralp'},
];

export const TOTAL_FRAMES = totalFrames(SHOTS);
