# Sprechertext: „Berlin-Wahl 2026: Die Linke, Clankriminalität und der Fall Koçak“

Ca. 70 Sekunden, Hochformat 1080×1920 (Reels/TikTok/Shorts). Die eingesprochene Stimme liegt als `public/voiceover.mp3` bei, Pausen sind herausgeschnitten. Die Zeiten unten sind die Planung vor der Aufnahme; das tatsächliche Timing steht in `src/script.ts`.

| Zeit | Szene | Text |
|---|---|---|
| 0:00–0:05 | Intro | Berlin hat gewählt – und die Linke ist zum ersten Mal stärkste Kraft. |
| 0:05–0:14 | Wahlergebnis | Am 20. September holte sie 25,7 Prozent. Dahinter: CDU 18,8, AfD 16,3, Grüne 14,3 und SPD 12,1 Prozent. |
| 0:14–0:24 | Vorhaben | Ihre wichtigsten Vorhaben: den Volksentscheid „Deutsche Wohnen & Co enteignen“ umsetzen, große Wohnungsbestände vergesellschaften und die Mieten bei landeseigenen Wohnungen ein Jahr lang einfrieren. |
| 0:24–0:34 | Lagebild | Gleichzeitig wächst die Clankriminalität. Laut Lagebild werden 685 Personen dem Milieu zugerechnet – elf Prozent mehr als im Vorjahr. 2025 wurden 952 Straftaten erfasst. |
| 0:34–0:40 | Begriff | Die Linke kritisiert den Begriff „Clankriminalität“ seit Jahren als pauschal und stigmatisierend. |
| 0:40–0:53 | Fall Koçak | Jetzt steht ihr Bundestagsabgeordneter Ferat Koçak in der Kritik: In einem Chat mit einem Sohn von Clanchef Issa Remmo ließ er „Grüße mit Respekt“ ausrichten. Koçak hat sich entschuldigt und zieht sich vorerst zurück. |
| 0:53–1:00 | Outro | Die Parteispitze hat ihn kritisiert. Wie die neue Regierung mit Clankriminalität umgeht, wird sich zeigen. |

## Stimme neu aufnehmen

1. Den Text oben einsprechen, am besten in einem Stück, ruhig und deutlich. Das Handy reicht, wenn du in einem ruhigen Raum aufnimmst.
2. Die Aufnahme als `public/voiceover.mp3` speichern (WAV oder M4A gehen auch, dann den Namen anpassen).
3. Pausen kürzen (optional): `ffmpeg -i aufnahme.m4a -af "silenceremove=start_periods=1:start_threshold=-35dB:stop_periods=-1:stop_duration=0.25:stop_threshold=-35dB:stop_silence=0.15,loudnorm=I=-16:TP=-1.5:LRA=11" public/voiceover.mp3`
4. Passt das Timing nicht, in `src/script.ts` bei jeder Szene `seconds` anpassen. Die Gesamtlänge ergibt sich automatisch.
5. Untertitel abschalten: `untertitel: false` in `src/Root.tsx`.

## Starten und Rendern

```bash
npm install
npm run dev      # Vorschau im Browser (Remotion Studio)
npm run render   # erzeugt out/berlin-video.mp4
```

## Quellen (Stand 25.09.2026)

- Wahlergebnis: Landeswahlleitung Berlin; Wikipedia „Wahl zum Abgeordnetenhaus von Berlin 2026“
- Lagebild Clankriminalität Berlin 2025, Senatsverwaltung für Inneres und Sport: https://www.berlin.de/sen/inneres/presse/weitere-informationen/lagebild-clankriminalitaet-berlin-2025.pdf
- Wahlprogramm Die Linke Berlin 2026: https://dielinke.berlin/fileadmin/download/2026/Wahlprogramm_AGH_2026_Die_Linke_Berlin.pdf
- Fall Koçak/Remmo: ZDFheute, Tagesspiegel, taz, t-online (22.–24.09.2026)

Hinweis: Das Video stellt belegte Einzelfakten dar. Belege für eine Zusammenarbeit der Partei mit Clan-Strukturen gibt es nicht. Wer das Video mit eigenem Kommentar veröffentlicht, sollte Meinung und Tatsachen klar trennen.
