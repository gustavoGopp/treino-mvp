"""Junta as capturas do protótipo B2 em folhas de comparação: uma por tema em 390 px, e uma em 320 px.

Uso: python3 scripts/design/frontend-novo/prototipo/folha-b2.py
Saída: docs/revisoes/frontend-novo/prototipos/capturas-b2/folha-claro.png, folha-escuro.png e folha-320.png
"""

import glob
import os

from PIL import Image

C = "docs/revisoes/frontend-novo/prototipos/capturas-b2"
VAO = 12


def folha(sufixo: str, largura: int, altura: int, por_linha: int, saida: str) -> None:
    nomes = sorted(n for n in glob.glob(f"{C}/[0-9]*-{sufixo}.png"))
    linhas = [nomes[i : i + por_linha] for i in range(0, len(nomes), por_linha)]
    im = Image.new("RGB", ((largura + VAO) * por_linha - VAO, (altura + VAO) * len(linhas) - VAO), "#888888")
    for y, linha in enumerate(linhas):
        for x, n in enumerate(linha):
            im.paste(Image.open(n).convert("RGB").resize((largura, altura), Image.LANCZOS), (x * (largura + VAO), y * (altura + VAO)))
    im.save(os.path.join(C, saida), optimize=True)


folha("390-claro", 390, 844, 7, "folha-claro.png")
folha("390-escuro", 390, 844, 7, "folha-escuro.png")
folha("320-claro", 320, 640, 7, "folha-320.png")
