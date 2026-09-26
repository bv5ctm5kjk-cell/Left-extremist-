// YouTube-Video (16:9, ca. 10 Minuten): „Sachsen-Anhalt nach der Wahl“.
// Jede Einstellung hat Kapitel, Hintergrund, Dauer und Sprechertext (= Untertitel).
// Dauern sind geschätzt (ca. 2,3 Wörter/s) und werden nach der Aufnahme angepasst.
import type {Bg, VoicePart} from '../shorts/types';
import timing from './timing.json';

export {FPS} from '../shorts/types';

export type Chapter = {id: string; nr: number; title: string};

export const CHAPTERS: Chapter[] = [
  {id: 'intro', nr: 0, title: 'Intro'},
  {id: 'ergebnis', nr: 1, title: 'Das Ergebnis'},
  {id: 'vorher', nr: 2, title: 'Der Absturz der CDU'},
  {id: 'warum', nr: 3, title: 'Warum die AfD so stark ist'},
  {id: 'siegmund', nr: 4, title: 'Wer ist Ulrich Siegmund?'},
  {id: 'vs', nr: 5, title: 'Was der Verfassungsschutz sagt'},
  {id: 'aendern', nr: 6, title: 'Was eine AfD-Regierung ändern könnte'},
  {id: 'regeln', nr: 7, title: 'Wie wird man Ministerpräsident?'},
  {id: 'parteien', nr: 8, title: 'Wer mit wem?'},
  {id: 'bund', nr: 9, title: 'Beben in Berlin'},
  {id: 'szenarien', nr: 10, title: 'Wie geht es weiter?'},
  {id: 'fazit', nr: 11, title: 'Fazit'},
];

export type LongShot = {
  id: string;
  chapter: string;
  bg: Bg;
  seconds: number;
  text: string;
};

// Dauer: aus der Stimm-Schnittliste (timing.json), sonst geschätzt.
const TIMING = timing as Record<string, number>;
const s = (id: string, chapter: string, bg: Bg, text: string, seconds?: number): LongShot => ({
  id,
  chapter,
  bg,
  text,
  seconds: TIMING[id] ?? seconds ?? Math.round((text.split(/\s+/).length / 2.3 + 0.4) * 10) / 10,
});

export const SHOTS: LongShot[] = [
  // Intro
  s('musik', 'intro', 'alarm', '', 4),
  s('i-zahl', 'intro', 'alarm', '43,8 Prozent. So stark war die AfD noch nie – in keinem Bundesland.'),
  s('i-neuland', 'intro', 'nacht', 'Seit dem 6. September ist Sachsen-Anhalt politisches Neuland.'),
  s('i-lage', 'intro', 'rot', 'Die AfD hat die Wahl klar gewonnen, aber keine eigene Mehrheit. Die CDU ist abgestürzt und geht in die Opposition.'),
  s('i-frage', 'intro', 'spot', 'Und niemand weiß, wer das Land künftig regiert.'),
  s('i-agenda', 'intro', 'nacht', 'In diesem Video schauen wir uns an: wie es zu diesem Ergebnis kam, wer Ulrich Siegmund ist, was eine AfD-Regierung ändern könnte, welche Wege es jetzt zu einer Regierung gibt – und was das für ganz Deutschland bedeutet.'),

  // 1 Ergebnis
  s('kap-ergebnis', 'ergebnis', 'nacht', '', 2.5),
  s('e-afd', 'ergebnis', 'blau', 'Fangen wir mit den Zahlen an. Die AfD holt 43,8 Prozent – ihr bestes Ergebnis bei einer Landtagswahl überhaupt und das höchste, das eine Partei in Sachsen-Anhalt seit der Wiedervereinigung erreicht hat.'),
  s('e-balken', 'ergebnis', 'nacht', 'Die CDU, bisher Regierungspartei, stürzt auf 17,2 Prozent – ein historischer Tiefstand. Die SPD kommt auf 9,3 Prozent, die Grünen auf 8,9 und die Linke auf 8,6 Prozent – ihr schlechtestes Ergebnis im Land.'),
  s('e-bsw', 'ergebnis', 'grau', 'Neu im Landtag: das BSW mit 5,3 Prozent. Die FDP fliegt raus.'),
  s('e-beteiligung', 'ergebnis', 'spot', 'Und: Die Wahlbeteiligung lag bei 77,8 Prozent – ein Rekord.'),
  s('e-sitze', 'ergebnis', 'nacht', 'Im Landtag sitzen 83 Abgeordnete. Für eine Mehrheit braucht man 42. Die AfD hat 39 Sitze – drei zu wenig. Die CDU hat 15, SPD, Grüne und Linke je 8, das BSW 5.'),

  // 2 Vorher
  s('kap-vorher', 'vorher', 'nacht', '', 2.5),
  s('h-2021', 'vorher', 'grau', 'Zum Vergleich: Vor fünf Jahren, 2021, lag die CDU unter Reiner Haseloff noch bei 37,1 Prozent – die AfD bei 20,8.'),
  s('h-wechsel', 'vorher', 'nacht', 'Im Januar 2026 trat Haseloff nach fast 15 Jahren im Amt zurück. Sein Nachfolger wurde Sven Schulze – gewählt am 28. Januar mit 58 Stimmen.'),
  s('h-absturz', 'vorher', 'alarm', 'Gut sieben Monate später hat die CDU mehr als die Hälfte ihres Stimmenanteils verloren – und die AfD ihr Ergebnis mehr als verdoppelt.'),

  // 3 Warum
  s('kap-warum', 'warum', 'nacht', '', 2.5),
  s('w-frage', 'warum', 'spot', 'Warum wählt fast jeder Zweite in Sachsen-Anhalt die AfD? Die Wahlanalysen zeichnen ein klares Bild.'),
  s('w-arbeiter', 'warum', 'blau', 'Bei Arbeitern kommt die AfD auf 59 Prozent – die CDU nur auf 9.'),
  s('w-lage', 'warum', 'grau', 'Wer seine eigene wirtschaftliche Lage als schlecht bewertet, hat zu 65 Prozent AfD gewählt.'),
  s('w-osten', 'warum', 'rot', 'Dazu kommt ein Gefühl der Benachteiligung: 83 Prozent der AfD-Wähler stimmen der Aussage zu, Ostdeutsche seien in vielem immer noch Bürger zweiter Klasse.'),
  s('w-wanderung', 'warum', 'nacht', 'Die CDU hat laut Infratest dimap rund 82.000 Wähler direkt an die AfD verloren.'),
  s('w-bund', 'warum', 'grau', 'Und viele machen sie für die Unzufriedenheit mit der Bundesregierung verantwortlich: 86 Prozent werfen der CDU vor, ihre Wahlversprechen nicht gehalten zu haben.'),

  // 4 Siegmund
  s('kap-siegmund', 'siegmund', 'nacht', '', 2.5),
  s('s-person', 'siegmund', 'blau', 'Das Gesicht dieses Erfolgs: Ulrich Siegmund. 35 Jahre alt, aus Tangermünde, gelernter Groß- und Außenhandelskaufmann.'),
  s('s-rekord', 'siegmund', 'spot', 'Würde er gewählt, wäre er der jüngste Ministerpräsident in der Geschichte der Bundesrepublik – und der erste der AfD.'),
  s('s-social', 'siegmund', 'alarm', 'Siegmunds Stärke ist Social Media: mehr als 820.000 Follower auf TikTok, über 600.000 auf Instagram.'),
  s('s-auftritt', 'siegmund', 'nacht', 'Er tritt freundlich auf, lächelt viel – und wirkt gemäßigter als viele in seinem Landesverband.'),
  s('s-programm', 'siegmund', 'rot', 'Das Programm ist es nicht: Die AfD will das Grundrecht auf Asyl abschaffen und ein eigenes Amt für sogenannte Remigration schaffen.'),
  s('s-ukraine', 'siegmund', 'grau', 'Ukrainer sollen nicht mehr als Kriegsflüchtlinge anerkannt werden. Und im Geschichtsunterricht soll das von Bismarck gegründete Kaiserreich eine größere Rolle spielen.'),

  // 5 Verfassungsschutz
  s('kap-vs', 'vs', 'nacht', '', 2.5),
  s('v-einstufung', 'vs', 'alarm', 'Wichtig zur Einordnung: Der Verfassungsschutz Sachsen-Anhalt stuft den AfD-Landesverband seit 2023 als gesichert rechtsextremistisch ein.'),
  s('v-gruende', 'vs', 'grau', 'Begründung unter anderem: Das Programm sei von einem ethnischen Volksbegriff geprägt, Funktionäre würden Migranten und Muslime abwerten.'),
  s('v-afd', 'vs', 'blau', 'Die AfD hält die Einstufung für rechtswidrig und wehrt sich juristisch. Das Verfahren ruht, bis über die Einstufung der Bundespartei entschieden ist.'),

  // 6 Was eine AfD-Regierung ändern könnte
  s('kap-aendern', 'aendern', 'nacht', '', 2.5),
  s('a-intro', 'aendern', 'spot', 'Was könnte eine AfD-Landesregierung überhaupt entscheiden? Mehr, als viele denken.'),
  s('a-rundfunk', 'aendern', 'blau', 'Die AfD verspricht, als erste Amtshandlung die Rundfunkstaatsverträge zu kündigen. Nach Ablauf der Fristen könnte Sachsen-Anhalt Ende 2028 aus dem MDR aussteigen.'),
  s('a-vs', 'aendern', 'alarm', 'Pikant: Der Verfassungsschutz, der die AfD beobachtet, gehört zum Innenministerium – also zur Landesregierung. Laut Programm soll er sich künftig auf Spionage und Terrorabwehr beschränken.'),
  s('a-schule', 'aendern', 'grau', 'In den Schulen will die AfD die Schulpflicht lockern: Eltern sollen ihre Kinder auch zu Hause unterrichten dürfen, mit regelmäßigen Prüfungen.'),
  s('a-bundesrat', 'aendern', 'rot', 'Und im Bundesrat hätte Sachsen-Anhalt vier Stimmen – zum ersten Mal würde dort eine AfD-Regierung mitentscheiden.'),
  s('a-grenzen', 'aendern', 'nacht', 'Grenzen gibt es trotzdem: Was gegen das Grundgesetz verstößt, kann vor dem Verfassungsgericht landen.'),

  // 7 Regeln
  s('kap-regeln', 'regeln', 'nacht', '', 2.5),
  s('r-frage', 'regeln', 'spot', 'Und jetzt? Wie kommt Sachsen-Anhalt zu einer Regierung? Die Landesverfassung regelt das in Artikel 65.'),
  s('r-runde12', 'regeln', 'blau', 'Im ersten und zweiten Wahlgang braucht ein Kandidat die absolute Mehrheit – also 42 Stimmen.'),
  s('r-runde3', 'regeln', 'alarm', 'Klappt das nicht, folgt ein dritter Wahlgang. Dann reicht die Mehrheit der abgegebenen Stimmen. Enthaltungen zählen dabei nicht mit.'),
  s('r-folge', 'regeln', 'rot', 'Das heißt: Siegmund braucht nicht unbedingt 42 Stimmen. Wenn sich genug Abgeordnete enthalten, könnte er im dritten Wahlgang gewählt werden.'),
  s('r-frist', 'regeln', 'grau', 'Und eine Frist gibt es nicht. Die Verfassung schreibt nicht vor, bis wann ein Ministerpräsident gewählt sein muss.'),
  s('r-schulze', 'regeln', 'nacht', 'So lange bleibt Sven Schulze von der CDU geschäftsführend im Amt. Und eine Neuwahl ginge nur, wenn sich der Landtag mit Zwei-Drittel-Mehrheit selbst auflöst.'),

  // 8 Parteien
  s('kap-parteien', 'parteien', 'nacht', '', 2.5),
  s('p-cdu', 'parteien', 'grau', 'Wer spricht mit wem? Die CDU hat entschieden: Sie geht in die Opposition. Eine Einladung der SPD zu Gesprächen über eine Regierung ohne AfD hat sie abgelehnt.'),
  s('p-tullner', 'parteien', 'nacht', 'Vize-Landeschef Marco Tullner sagt, der Ball liege jetzt im Spielfeld der AfD.'),
  s('p-rechnung', 'parteien', 'spot', 'Rechnerisch gäbe es nur ein Bündnis ohne AfD: CDU, SPD, Grüne, Linke und BSW zusammen – 44 Sitze.'),
  s('p-beschluss', 'parteien', 'grau', 'Aber die CDU darf laut Parteitagsbeschluss weder mit der AfD noch mit der Linken koalieren.'),
  s('p-bsw', 'parteien', 'rot', 'Bleibt das BSW. Es spricht mit der AfD über eine Zusammenarbeit in Sachfragen. BSW-Fraktionschef Thomas Schulze nennt die Gespräche konstruktiv.'),
  s('p-bedingung', 'parteien', 'nacht', 'Eine Koalition lehnt das BSW aber ab – und einen Ministerpräsidenten Siegmund will es bisher nicht mitwählen. Das BSW wünscht sich einen parteilosen Kandidaten.'),
  s('p-tolerierung', 'parteien', 'alarm', 'Die AfD dagegen will den Regierungschef selbst stellen. Denkbar wäre am Ende auch eine AfD-Minderheitsregierung, die das BSW toleriert. Zusammen hätten beide 44 Sitze.'),

  // 9 Bund
  s('kap-bund', 'bund', 'nacht', '', 2.5),
  s('b-merz', 'bund', 'grau', 'Die Wahl erschüttert auch Berlin. Für CDU-Chef und Kanzler Friedrich Merz ist das Ergebnis ein Schlag. Er hält an der Brandmauer fest und schließt jede Zusammenarbeit mit der AfD aus.'),
  s('b-soeder', 'bund', 'blau', 'CSU-Chef Markus Söder lehnt eine Debatte über die Brandmauer ebenfalls ab. Er nennt das Ergebnis eine Antiwahl – die größte Ablehnung, die man in den letzten 50 Jahren gesehen habe.'),
  s('b-debatte', 'bund', 'rot', 'Trotzdem ist die Frage in der Union offen: Wie umgehen mit einer Partei, die in Teilen Ostdeutschlands fast die Hälfte der Wähler hinter sich hat?'),

  // 10 Szenarien
  s('kap-szenarien', 'szenarien', 'nacht', '', 2.5),
  s('z-termin', 'szenarien', 'spot', 'Am 6. Oktober kommt der neue Landtag zum ersten Mal zusammen. Eröffnen wird die Sitzung ausgerechnet Linken-Fraktionschefin Eva von Angern – als Alterspräsidentin.'),
  s('z-spaeter', 'szenarien', 'nacht', 'Einen neuen Ministerpräsidenten wird es an diesem Tag aber noch nicht geben. Eine Wahl wird eher im November oder Dezember erwartet.'),
  s('z-1', 'szenarien', 'blau', 'Drei Szenarien sind denkbar. Erstens: Siegmund wird im dritten Wahlgang gewählt – mit Enthaltungen oder Stimmen aus dem BSW.'),
  s('z-2', 'szenarien', 'rot', 'Zweitens: eine AfD-Minderheitsregierung, die das BSW toleriert.'),
  s('z-3', 'szenarien', 'grau', 'Drittens: eine lange Hängepartie mit einer geschäftsführenden Regierung Schulze.'),

  // 11 Fazit
  s('kap-fazit', 'fazit', 'nacht', '', 2.5),
  s('f-erstmals', 'fazit', 'alarm', 'Sachsen-Anhalt steht vor einer Entscheidung, die es so noch nie gab: Zum ersten Mal könnte die AfD ein Bundesland regieren.'),
  s('f-wenige', 'fazit', 'spot', 'Ob das passiert, hängt jetzt an wenigen Abgeordneten – und an der Frage, wie lange die Brandmauer hält.'),
  s('f-frage', 'fazit', 'nacht', 'Was meint ihr: Sollte die AfD regieren dürfen, weil sie die Wahl klar gewonnen hat? Oder müssen die anderen Parteien das verhindern?'),
  s('f-abo', 'fazit', 'rot', 'Schreibt es in die Kommentare – und abonniert den Kanal, damit ihr nichts verpasst.', 7),
];

// Sprachaufnahmen: eine pro Kapitel (scripts/stimme-schnitt.mjs), jeweils ab der
// ersten Einstellung nach der Kapitelkarte.
export const VOICE_PARTS: VoicePart[] = CHAPTERS.map((c) => ({
  file: `sachsen/stimme-${c.id}.mp3`,
  firstShot: SHOTS.find((sh) => sh.chapter === c.id && !sh.id.startsWith('kap-') && sh.text)!.id,
}));
