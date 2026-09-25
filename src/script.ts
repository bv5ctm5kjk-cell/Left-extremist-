// Sprechertext und Timing jeder Szene. Wenn deine Aufnahme länger oder
// kürzer ist, hier die Sekunden anpassen – das Video passt sich an.
export const FPS = 30;

export type SceneId =
  | 'intro'
  | 'wahl'
  | 'vorhaben'
  | 'lagebild'
  | 'begriff'
  | 'kocak'
  | 'outro';

export const SCENES: {id: SceneId; seconds: number; text: string}[] = [
  {
    id: 'intro',
    seconds: 5,
    text: 'Berlin hat gewählt – und die Linke ist zum ersten Mal stärkste Kraft.',
  },
  {
    id: 'wahl',
    seconds: 9,
    text: 'Am 20. September holte sie 25,7 Prozent. Dahinter: CDU 18,8, AfD 16,3, Grüne 14,3 und SPD 12,1 Prozent.',
  },
  {
    id: 'vorhaben',
    seconds: 10,
    text: 'Ihre wichtigsten Vorhaben: den Volksentscheid „Deutsche Wohnen & Co enteignen“ umsetzen, große Wohnungsbestände vergesellschaften und die Mieten bei landeseigenen Wohnungen ein Jahr lang einfrieren.',
  },
  {
    id: 'lagebild',
    seconds: 10,
    text: 'Gleichzeitig wächst die Clankriminalität. Laut Lagebild werden 685 Personen dem Milieu zugerechnet – elf Prozent mehr als im Vorjahr. 2025 wurden 952 Straftaten erfasst.',
  },
  {
    id: 'begriff',
    seconds: 6,
    text: 'Die Linke kritisiert den Begriff „Clankriminalität“ seit Jahren als pauschal und stigmatisierend.',
  },
  {
    id: 'kocak',
    seconds: 13,
    text: 'Jetzt steht ihr Bundestagsabgeordneter Ferat Koçak in der Kritik: In einem Chat mit einem Sohn von Clanchef Issa Remmo ließ er „Grüße mit Respekt“ ausrichten. Koçak hat sich entschuldigt und zieht sich vorerst zurück.',
  },
  {
    id: 'outro',
    seconds: 7,
    text: 'Die Parteispitze hat ihn kritisiert. Wie die neue Regierung mit Clankriminalität umgeht, wird sich zeigen.',
  },
];

export const sceneFrames = (seconds: number) => Math.round(seconds * FPS);

export const TOTAL_FRAMES = SCENES.reduce(
  (sum, s) => sum + sceneFrames(s.seconds),
  0,
);
