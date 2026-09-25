// Teil 3: „Enteignung – kurz erklärt“.
// Die Dauern entsprechen den Satzpausen in den Aufnahmen (public/teil3/).
import {INTRO_SECONDS, Shot, VoicePart, totalFrames} from '../shorts/types';

export {FPS} from '../shorts/types';

export const SHOTS: Shot[] = [
  {id: 'intro', bg: 'alarm', seconds: INTRO_SECONDS, text: ''},
  {id: 'hook1', bg: 'alarm', seconds: 4.39, text: '240.000 Wohnungen. Milliarden Euro. Und eine Idee, die Berlin spaltet.'},
  {id: 'hook2', bg: 'nacht', seconds: 1.37, text: 'Enteignung – kurz erklärt.'},
  {id: 'volksentscheid', bg: 'rot', seconds: 6.3, text: '2021 haben die Berliner abgestimmt: 59 Prozent sagten Ja zu „Deutsche Wohnen & Co enteignen“.'},
  {id: 'wer', bg: 'nacht', seconds: 3.07, text: 'Gemeint sind Konzerne mit mehr als 3.000 Wohnungen in Berlin.'},
  {id: 'wieviel', bg: 'spot', seconds: 3.37, text: 'Je nach Rechnung 210.000 bis 240.000 Wohnungen.'},
  {id: 'art15', bg: 'blau', seconds: 6.13, text: 'Möglich macht das Artikel 15 im Grundgesetz: Grund und Boden dürfen vergesellschaftet werden – gegen Entschädigung.'},
  {id: 'kommission', bg: 'grau', seconds: 4.52, text: 'Eine Expertenkommission des Senats hielt das 2023 für verfassungsgemäß.'},
  {id: 'nichts', bg: 'nacht', seconds: 2.35, text: 'Umgesetzt wurde bisher trotzdem nichts.'},
  {id: 'plan', bg: 'rot', seconds: 5.4, text: 'Jetzt will die Linke es durchziehen: Eine öffentliche Anstalt soll die Wohnungen übernehmen – finanziert über Kredite.'},
  {id: 'kosten', bg: 'alarm', seconds: 7.5, text: 'Und was kostet das? Eine neue Studie rechnet mit 13,5 Milliarden Euro. Nach Marktwert wären es 23 bis 38 Milliarden.'},
  {id: 'pro', bg: 'gruen', seconds: 3.2, text: 'Befürworter sagen: So bleiben die Mieten dauerhaft bezahlbar.'},
  {id: 'contra', bg: 'grau', seconds: 7.6, text: 'Kritiker halten dagegen: So entsteht keine einzige neue Wohnung. Und weil das Land für die Kredite bürgt, trägt der Steuerzahler das Risiko.'},
  {id: 'battis', bg: 'nacht', seconds: 4.05, text: 'Staatsrechtler Ulrich Battis meint, vor Gericht würde das Vorhaben scheitern.'},
  {id: 'merz', bg: 'blau', seconds: 4.03, text: 'Und Kanzler Friedrich Merz will Vergesellschaftungen per Bundesgesetz verbieten.'},
  {id: 'verfassung', bg: 'grau', seconds: 3.37, text: 'Einige Juristen halten so ein Verbot aber für verfassungswidrig.'},
  {id: 'partner', bg: 'spot', seconds: 6.15, text: 'Und: Die Linke braucht SPD und Grüne – und muss beide erst überzeugen.'},
  {id: 'frage', bg: 'nacht', seconds: 4.02, text: 'Also: Lösung für die Mietkrise oder teures Risiko?'},
  {id: 'outro', bg: 'nacht', seconds: 6.48, text: 'Schreibt es in die Kommentare – und lasst gerne ein Abo da, um nächste Woche nichts zu verpassen.'},
];

export const VOICE_PARTS: VoicePart[] = [
  {file: 'teil3/stimme-1.mp3', firstShot: 'hook1'},
  {file: 'teil3/stimme-2.mp3', firstShot: 'plan'},
  {file: 'teil3/stimme-3.mp3', firstShot: 'battis'},
  {file: 'teil3/stimme-4.mp3', firstShot: 'frage'},
];

export const TOTAL_FRAMES = totalFrames(SHOTS);
