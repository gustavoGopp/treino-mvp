#!/usr/bin/env bash
# Gera docs/img/m3-jornada.gif a partir do vídeo do Playwright (persona fictícia; nenhum dado de privado/).
set -euo pipefail
cd "$(dirname "$0")/../.."
rm -rf test-results/gif
npx playwright test --config scripts/gif/playwright.config.ts
video=$(find test-results/gif -name '*.webm' | head -1)
ffmpeg -loglevel error -y -i "$video" -vf "fps=8,scale=320:-1:flags=lanczos,palettegen=max_colors=96" /tmp/paleta.png
ffmpeg -loglevel error -y -i "$video" -i /tmp/paleta.png -lavfi "fps=8,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=4" docs/img/m3-jornada.gif
ls -lh docs/img/m3-jornada.gif
