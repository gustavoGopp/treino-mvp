"""Monta uma folha de antes e depois de um bloco de telas da reconstrução (390 px, tema claro).

Uso: python3 scripts/design/frontend-novo/antes-depois.py <pasta do depois> <saída.png> <tela antes[=tela depois]> ...
Em cima fica o antes (docs/revisoes/frontend-novo/capturas/antes/390-claro); embaixo, o depois.
"""

import os
import sys

from PIL import Image

ANTES = "docs/revisoes/frontend-novo/capturas/antes/390-claro"
depois, saida, telas = sys.argv[1], sys.argv[2], sys.argv[3:]
L, A, VAO = 390, 844, 12
im = Image.new("RGB", ((L + VAO) * len(telas) - VAO, A * 2 + VAO), "#888888")
for x, t in enumerate(telas):
    a, _, d = t.partition("=")
    for y, f in enumerate((f"{ANTES}/{a}.png", f"{depois}/{d or a}.png")):
        if os.path.exists(f):
            im.paste(Image.open(f).convert("RGB").resize((L, A), Image.LANCZOS), (x * (L + VAO), y * (A + VAO)))
os.makedirs(os.path.dirname(saida), exist_ok=True)
im.quantize(256, dither=Image.Dither.NONE).save(saida, optimize=True)
