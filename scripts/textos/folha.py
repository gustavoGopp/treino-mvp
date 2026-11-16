"""Monta uma folha de comparação: várias capturas do app lado a lado, cada uma com um rótulo em cima.

Uso: python3 scripts/textos/folha.py <saída.png> "<rótulo>=<captura.png>" ... [--corte=<y0>,<y1>] [--linhas=N]
As capturas saem do app rodando (390 de largura; 844 de altura, ou mais numa tela fotografada inteira). O rótulo aceita "|" para uma 2ª linha menor (ex.: "Hoje|52 palavras").
--corte recorta cada captura na vertical (em pontos de 390 × 844), para mostrar só a folha aberta.
--linhas quebra as capturas em N linhas (padrão: 1).
"""

import math
import os
import sys

from PIL import Image, ImageDraw, ImageFont

args = [a for a in sys.argv[1:] if not a.startswith("--")]
ops = dict(a[2:].split("=", 1) for a in sys.argv[1:] if a.startswith("--"))
saida, itens = args[0], [a.split("=", 1) for a in args[1:]]
L, VAO, CAB, ESC = 390, 16, 64, 2
linhas = int(ops.get("linhas", 1))
colunas = math.ceil(len(itens) / linhas)


def letra(tam, peso="SemiBold"):
    for caminho in (f"/usr/share/fonts/opentype/inter/Inter-{peso}.otf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"):
        if os.path.exists(caminho):
            return ImageFont.truetype(caminho, tam * ESC)
    return ImageFont.load_default()


# cada captura vai para 390 pontos de largura, com a altura que tiver (844 na tela comum; mais numa tela alta)
fotos = []
for _, caminho in itens:
    f = Image.open(caminho).convert("RGB")
    f = f.resize((L * ESC, round(f.height * L * ESC / f.width)), Image.LANCZOS)
    if "corte" in ops:
        y0, y1 = (int(v) for v in ops["corte"].split(","))
        f = f.crop((0, y0 * ESC, L * ESC, min(y1 * ESC, f.height)))
    fotos.append(f)
alturas = [max(f.height for f in fotos[i * colunas : (i + 1) * colunas]) for i in range(linhas)]
im = Image.new("RGB", (ESC * ((L + VAO) * colunas + VAO), sum(alturas) + ESC * ((CAB + VAO) * linhas + VAO)), "#6F7073")
d = ImageDraw.Draw(im)
for i, (rotulo, _) in enumerate(itens):
    x = ESC * (VAO + (i % colunas) * (L + VAO))
    y = ESC * VAO + sum(alturas[: i // colunas]) + ESC * (CAB + VAO) * (i // colunas)
    um, _, dois = rotulo.partition("|")
    d.text((x, y + ESC * 6), um, font=letra(22), fill="#FFFFFF")
    if dois:
        d.text((x, y + ESC * 36), dois, font=letra(15, "Regular"), fill="#E4E4E2")
    im.paste(fotos[i], (x, y + ESC * CAB))
os.makedirs(os.path.dirname(saida) or ".", exist_ok=True)
im.quantize(256, dither=Image.Dither.NONE).save(saida, optimize=True)
print(saida, im.size)
