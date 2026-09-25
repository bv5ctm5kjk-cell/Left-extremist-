# Sprechertext Teil 2: „Der Fall Koçak – was seitdem passiert ist“

Ca. 90 Sekunden inklusive 3 Sekunden Musik-Intro, Hochformat 1080×1920. Gut 200 Wörter.

## So einsprechen

- **Mit Energie:** Stell dir vor, du erzählst es einem Freund, der es noch nicht weiß. Lieber etwas zu lebendig als zu brav.
- **Handy nah am Mund**, ca. 15–20 cm, ruhiger Raum ohne Hall, zum Beispiel neben einem Kleiderschrank.
- **Pausen sind egal**, die schneide ich raus. Wenn du dich versprichst: kurz Pause, dann den ganzen Satz nochmal. Den Versprecher schneide ich raus.
- **Zitate** („Mir reicht es langsam.“) ruhig etwas anders betonen, damit man hört, dass jemand anderes spricht.

## Text (Absatz = neue Einstellung)

Ein Chat, ein Clan-Chef und eine Partei unter Druck.

Was ist seit dem Fall Koçak passiert?

Kurz zur Erinnerung: Der Linken-Abgeordnete Ferat Koçak ließ über einen Sohn von Clanchef Issa Remmo „Grüße mit Respekt“ an den Vater ausrichten.

Remmo selbst war zuvor ungeladen auf der Wahlparty der Neuköllner Linken aufgetaucht.

Koçak nennt den Kontakt einen Fehler. Er habe anfangs nicht gewusst, mit wem er schreibt.

Er lässt seine Ämter ruhen und bleibt dem Innenausschuss fern.

Die Linke reagiert gespalten.

Fraktionschef Sören Pellmann sagt, Koçak habe volle Transparenz versprochen.

Heidi Reichinnek sagt: „Ich vertraue meinen Abgeordneten.“

Die langjährige Linken-Politikerin Petra Pau dagegen: „Mir reicht es langsam.“

Die Grünen fordern Koçaks Ausschluss aus der Fraktion.

Aus der CDU kommt die Forderung, sein Mandat niederzulegen.

Und im Bundestag gab es auf Antrag der AfD eine hitzige Aktuelle Stunde.

Das Problem für Berlin: Die Linke hat die Wahl gewonnen und will mit SPD und Grünen regieren.

Doch beide machen Gespräche davon abhängig, dass sich die Linke klar positioniert – zu Antisemitismus und zu organisierter Kriminalität.

Bundestagspräsidentin Julia Klöckner rät SPD und Grünen sogar ganz von einer Koalition ab.

Spitzenkandidatin Elif Eralp meint, es seien die richtigen Entscheidungen getroffen worden.

Reicht das, um Vertrauen zurückzugewinnen?

Oder scheitert Rot-Grün-Rot schon vor dem Start?

Schreib deine Meinung in die Kommentare.

## Nachbearbeitung

Die Aufnahme als `public/voiceover-teil2.mp3` aufbereiten:

```bash
scripts/stimme.sh aufnahme.m4a public/voiceover-teil2.mp3
```

Das Skript entfernt Pausen, hebt die Stimme an (Kompressor, Präsenz-EQ, Lautheit −13 LUFS) und macht sie 6 % schneller. Danach in `src/Root.tsx` bei `teil2Props` `voiceover: 'voiceover-teil2.mp3'` eintragen und die Sekunden in `src/teil2/script.ts` an die Aufnahme anpassen. Die Musik erzeugt `node scripts/make-music.mjs <sekunden> musik.wav`.

## Quellen (Stand 25.09.2026)

- Tagesspiegel/dpa: Koçak lässt Funktionen ruhen; Dröge empfiehlt Ausschluss; Linke: Kontakt schadet der Partei
- taz: Wegen Clan-Kontakten: Koçak lässt Funktionen vorerst ruhen; An Koçak spaltet sich die Linkspartei
- Jüdische Allgemeine: Petra Pau bricht mit Koçak; Klöckners Gretchenfrage
- ZDFheute: Was die Linke für Koalitionspartner unattraktiv macht; SPD-Spitze zu Antisemitismus und organisierter Kriminalität
- t-online: Remmo-Sohn meldet sich nach Linke-Wahlparty
