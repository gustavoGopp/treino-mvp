"""Junta as capturas de cada direção numa folha só (início, treino e descanso; claro e escuro), para comparar lado a lado.

Uso: python3 scripts/design/frontend-novo/prototipo/folha.py
Saída: docs/revisoes/frontend-novo/prototipos/capturas/folha-<direção>.png e folha-<direção>-320.png
"""

import glob
import os

from PIL import Image

C = "docs/revisoes/frontend-novo/prototipos/capturas"
TELAS = ("1-inicio", "2-treino", "3-descanso")


def folha(d: str) -> None:
    nomes = [f"{d}-{t}-390-{m}.png" for m in ("claro", "escuro") for t in TELAS]
    im = Image.new("RGB", (402 * 6 - 12, 844), "#888888")
    for j, n in enumerate(nomes):
        im.paste(Image.open(f"{C}/{n}").convert("RGB").resize((390, 844), Image.LANCZOS), (j * 402, 0))
    im.save(f"{C}/folha-{d}.png", optimize=True)
    nomes = [f"{d}-{t}-320-{m}.png" for m in ("claro", "escuro") for t in TELAS]
    im = Image.new("RGB", (332 * 6 - 12, 640), "#888888")
    for j, n in enumerate(nomes):
        im.paste(Image.open(f"{C}/{n}").convert("RGB"), (j * 332, 0))
    im.save(f"{C}/folha-{d}-320.png", optimize=True)


for caminho in sorted(glob.glob(f"{C}/*-1-inicio-390-claro.png")):
    folha(os.path.basename(caminho).replace("-1-inicio-390-claro.png", ""))
