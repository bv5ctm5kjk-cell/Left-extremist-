// Teil 2: „Der Fall Koçak – was seitdem passiert ist“.
// Jede Einstellung (Shot) hat ihren Untertitel-Text und eine Dauer.
// Die Dauern sind geschätzt und werden auf die Sprachaufnahme angepasst.
export const FPS = 30;

// Musik-Intro vor dem ersten gesprochenen Wort.
export const INTRO_SECONDS = 3;

export type Bg = 'rot' | 'blau' | 'nacht' | 'alarm' | 'spot' | 'gruen' | 'grau';

export type Shot = {
  id: string;
  bg: Bg;
  seconds: number;
  text: string;
};

export const SHOTS: Shot[] = [
  {id: 'intro', bg: 'alarm', seconds: INTRO_SECONDS, text: ''},
  {id: 'hook1', bg: 'alarm', seconds: 4.1, text: 'Ein Chat, ein Clan-Chef und eine Partei unter Druck.'},
  {id: 'hook2', bg: 'nacht', seconds: 3.1, text: 'Was ist seit dem Fall Koçak passiert?'},
  {id: 'chat', bg: 'rot', seconds: 6.7, text: 'Kurz zur Erinnerung: Der Linken-Abgeordnete Ferat Koçak ließ über einen Sohn von Clanchef Issa Remmo „Grüße mit Respekt“ an den Vater ausrichten.'},
  {id: 'party', bg: 'spot', seconds: 5.5, text: 'Remmo selbst war zuvor ungeladen auf der Wahlparty der Neuköllner Linken aufgetaucht.'},
  {id: 'fehler', bg: 'nacht', seconds: 5.5, text: 'Koçak nennt den Kontakt einen Fehler. Er habe anfangs nicht gewusst, mit wem er schreibt.'},
  {id: 'ruhen', bg: 'grau', seconds: 4.1, text: 'Er lässt seine Ämter ruhen und bleibt dem Innenausschuss fern.'},
  {id: 'gespalten', bg: 'rot', seconds: 2.2, text: 'Die Linke reagiert gespalten.'},
  {id: 'pellmann', bg: 'rot', seconds: 3.1, text: 'Fraktionschef Sören Pellmann sagt, Koçak habe volle Transparenz versprochen.'},
  {id: 'reichinnek', bg: 'rot', seconds: 3.6, text: 'Heidi Reichinnek sagt: „Ich vertraue meinen Abgeordneten.“'},
  {id: 'pau', bg: 'nacht', seconds: 4.3, text: 'Die langjährige Linken-Politikerin Petra Pau dagegen: „Mir reicht es langsam.“'},
  {id: 'gruene', bg: 'gruen', seconds: 3.4, text: 'Die Grünen fordern Koçaks Ausschluss aus der Fraktion.'},
  {id: 'cdu', bg: 'grau', seconds: 3.1, text: 'Aus der CDU kommt die Forderung, sein Mandat niederzulegen.'},
  {id: 'bundestag', bg: 'blau', seconds: 4.3, text: 'Und im Bundestag gab es auf Antrag der AfD eine hitzige Aktuelle Stunde.'},
  {id: 'wahlsieg', bg: 'spot', seconds: 5.5, text: 'Das Problem für Berlin: Die Linke hat die Wahl gewonnen und will mit SPD und Grünen regieren.'},
  {id: 'bedingung', bg: 'alarm', seconds: 7.4, text: 'Doch beide machen Gespräche davon abhängig, dass sich die Linke klar positioniert – zu Antisemitismus und zu organisierter Kriminalität.'},
  {id: 'kloeckner', bg: 'grau', seconds: 5.3, text: 'Bundestagspräsidentin Julia Klöckner rät SPD und Grünen sogar ganz von einer Koalition ab.'},
  {id: 'eralp', bg: 'rot', seconds: 5.0, text: 'Spitzenkandidatin Elif Eralp meint, es seien die richtigen Entscheidungen getroffen worden.'},
  {id: 'frage', bg: 'nacht', seconds: 3.6, text: 'Reicht das, um Vertrauen zurückzugewinnen?'},
  {id: 'r2g', bg: 'alarm', seconds: 3.6, text: 'Oder scheitert Rot-Grün-Rot schon vor dem Start?'},
  {id: 'outro', bg: 'nacht', seconds: 6.0, text: 'Schreib deine Meinung in die Kommentare.'},
];

export const shotFrames = (seconds: number) => Math.round(seconds * FPS);
export const TOTAL_FRAMES = SHOTS.reduce((sum, s) => sum + shotFrames(s.seconds), 0);
