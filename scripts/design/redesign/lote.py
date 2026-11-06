# Redesign (06/11/2026), Fase 5: o antes e o depois de um lote no app real, lado a lado, a partir das capturas por
# script (reports/design/redesign/antes/ e reports/design/redesign/<lote>/, de antes.spec.ts com FASE=<lote>).
# Saída: docs/img/redesign-<lote>-<nome>.png (o que se vê sem rolar, 75% do tamanho, para o repositório não inchar).
# Uso: python3 scripts/design/redesign/lote.py lote-1
from PIL import Image, ImageDraw, ImageFont
import os, sys

LOTE = sys.argv[1]
FONTE = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 26)
# (nome da imagem, tema, telas): cada tela vira um par antes | lote
GRUPOS = {
    'lote-1': [
        ('inicio-e-treino-claro', 'claro', ['ana/10-programa', 'ana/11-treino-serie-1']),
        ('treino-e-guia-escuro', 'escuro', ['ana/11-treino-serie-1', 'ana/16-guia-tecnica']),
        ('cadastro-360', 'pequeno', ['cadastro/03b-nivel-respondido', 'cadastro/04b-rotina-respondida']),
    ],
}

def rotular(img, rotulo, escuro):
    fundo, tinta = ('#111111', '#EEEEEE') if escuro else ('#FFFFFF', '#222222')
    out = Image.new('RGB', (img.width, img.height + 44), fundo)
    ImageDraw.Draw(out).text((12, 8), rotulo, font=FONTE, fill=tinta)
    out.paste(img, (0, 44))
    return out

for nome, tema, telas in GRUPOS[LOTE]:
    escuro = tema == 'escuro'
    pecas = []
    for t in telas:
        for fase, rot in (('antes', 'Antes'), (LOTE, LOTE.replace('-', ' ').capitalize())):
            pecas.append(rotular(Image.open(f'reports/design/redesign/{fase}/{tema}/{t}-relance.png').convert('RGB'), rot, escuro))
    gap = 16
    w = sum(p.width for p in pecas) + gap * (len(pecas) - 1)
    h = max(p.height for p in pecas)
    tela = Image.new('RGB', (w, h), '#000000' if escuro else '#DDDDDD')
    x = 0
    for p in pecas:
        tela.paste(p, (x, 0))
        x += p.width + gap
    tela = tela.resize((int(w * 0.75), int(h * 0.75)), Image.LANCZOS)
    caminho = f'docs/img/redesign-{LOTE}-{nome}.png'
    tela.save(caminho, optimize=True)
    print(caminho, tela.size, os.path.getsize(caminho) // 1024, 'kB')
