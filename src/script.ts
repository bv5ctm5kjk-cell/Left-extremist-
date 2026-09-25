// Sprechertext (= Untertitel) und Timing jeder Szene. Die Sekunden sind auf
// public/voiceover.mp3 abgestimmt: Jeder Wechsel liegt in der Sprechpause
// vor dem neuen Abschnitt. Neue Aufnahme -> Sekunden hier anpassen.
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
    seconds: 3.36,
    text: 'Berlin hat gewählt – und die Linke ist zum ersten Mal stärkste Kraft.',
  },
  {
    id: 'wahl',
    seconds: 14.04,
    text: 'Das Wahlergebnis am 20. September: 25,7 Prozent für die Linke. Dahinter CDU mit 18,8, AfD mit 16,3, die Grünen mit 14,3 und die SPD mit 12,1 Prozent.',
  },
  {
    id: 'vorhaben',
    seconds: 10.9,
    text: 'Die Vorhaben der Linken sind klar: „Deutsche Wohnen & Co enteignen“ umsetzen, große Wohnungsbestände vergesellschaften und die Mieten bei landeseigenen Wohnungen ein Jahr lang einfrieren.',
  },
  {
    id: 'lagebild',
    seconds: 13.65,
    text: 'Die Clankriminalität wächst: Laut Lagebild werden 685 Personen dem Milieu zugerechnet – elf Prozent mehr als im Vorjahr. 952 Straftaten wurden 2025 erfasst.',
  },
  {
    id: 'begriff',
    seconds: 5.05,
    text: 'Die Linke kritisiert den Begriff „Clankriminalität“ seit Jahren als pauschal und stigmatisierend.',
  },
  {
    id: 'kocak',
    seconds: 12.8,
    text: 'Der Fall Koçak: Jetzt steht der Bundestagsabgeordnete Ferat Koçak in der Kritik. In einem Chat mit einem Sohn von Clanchef Issa Remmo ließ er „Grüße mit Respekt“ ausrichten. Koçak hat sich entschuldigt und zieht sich vorerst zurück.',
  },
  {
    id: 'outro',
    seconds: 10.31,
    text: 'Die Parteispitze hat ihn kritisiert. Wie die neue Regierung mit Clankriminalität umgeht, wird sich zeigen.',
  },
];

export const sceneFrames = (seconds: number) => Math.round(seconds * FPS);

export const TOTAL_FRAMES = SCENES.reduce(
  (sum, s) => sum + sceneFrames(s.seconds),
  0,
);
