#!/usr/bin/env bash
# Bereitet eine Sprachaufnahme auf: Pausen raus, lauter, mehr Energie.
# Aufruf: scripts/stimme.sh <eingabe.m4a> <ausgabe.mp3> [tempo, Standard 1.06]
set -euo pipefail
IN="$1"
OUT="$2"
TEMPO="${3:-1.06}"
FF="${FFMPEG:-ffmpeg}"

"$FF" -hide_banner -y -i "$IN" -af "\
highpass=f=85,\
silenceremove=start_periods=1:start_threshold=-35dB:start_silence=0.05:stop_periods=-1:stop_duration=0.2:stop_threshold=-35dB:stop_silence=0.1,\
atempo=${TEMPO},\
equalizer=f=200:t=q:w=1:g=-2,\
equalizer=f=3200:t=q:w=1.2:g=4,\
equalizer=f=9000:t=h:w=0.7:g=2,\
acompressor=threshold=-22dB:ratio=4:attack=5:release=80:makeup=6,\
loudnorm=I=-13:TP=-1:LRA=7,\
alimiter=limit=0.95" \
  -ar 44100 -ac 1 -c:a libmp3lame -b:a 192k "$OUT"
