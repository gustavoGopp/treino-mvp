#!/usr/bin/env bash
# Gera um GIF do devlog a partir do vídeo do Playwright (persona fictícia; nenhum dado de privado/).
# Uso: bash scripts/gif/gerar.sh [spec] [saida]   (padrão: jornada -> docs/img/m3-jornada.gif)
set -euo pipefail
cd "$(dirname "$0")/../.."
spec="${1:-jornada}"
saida="${2:-docs/img/m3-jornada.gif}"
rm -rf test-results/gif
npx playwright test --config scripts/gif/playwright.config.ts "scripts/gif/$spec.spec.ts"
video=$(find test-results/gif -name '*.webm' | head -1)
ffmpeg -loglevel error -y -i "$video" -vf "fps=8,scale=320:-1:flags=lanczos,palettegen=max_colors=96" /tmp/paleta.png
ffmpeg -loglevel error -y -i "$video" -i /tmp/paleta.png -lavfi "fps=8,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=4" "$saida"
ls -lh "$saida"
