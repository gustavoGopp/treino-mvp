# Redesign (06/11/2026): a apresentação, hoje (protótipo v5, guardado em reports/design/redesign/apresentacao-hoje/) ao
# lado das propostas A (o Boneco recebe) e B (o seu lugar), com as palavras à vista sem rolar (scripts/design/medir.ts).
# Saída: docs/revisoes/redesign/img/apresentacao-{claro,escuro-e-360}.png
# Uso: python3 scripts/design/redesign/apresentacao.py
from PIL import Image, ImageDraw, ImageFont
import json

F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 24)
f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 19)
P = 'reports/design/redesign/depois'
med = {p: {m['tela'].split('/', 1)[1]: m['palavras'] for m in json.load(open(f'docs/revisoes/redesign/depois/medidas-{p}.json'))} for p in ('claro', 'escuro', 'pequeno')}

def peca(caminho, rotulo, palavras, escuro=False):
    img = Image.open(caminho).convert('RGB')
    fundo, tinta, apoio = ('#111111', '#EEEEEE', '#BBBBBB') if escuro else ('#FFFFFF', '#222222', '#555555')
    out = Image.new('RGB', (img.width, img.height + 70), fundo)
    d = ImageDraw.Draw(out)
    d.text((12, 6), rotulo, font=F, fill=tinta)
    if palavras is not None:
        d.text((12, 38), f'{palavras} palavras à vista', font=f, fill=apoio)
    out.paste(img, (0, 70))
    return out

def juntar(pecas, nome, fundo='#DDDDDD'):
    w = sum(p.width for p in pecas) + 16 * (len(pecas) - 1)
    tela = Image.new('RGB', (w, max(p.height for p in pecas)), fundo)
    x = 0
    for p in pecas:
        tela.paste(p, (x, 0))
        x += p.width + 16
    tela = tela.resize((int(tela.width * 0.75), int(tela.height * 0.75)), Image.LANCZOS)
    tela.save(f'docs/revisoes/redesign/img/apresentacao-{nome}.png', optimize=True)
    print(nome, tela.size)

juntar([peca('reports/design/redesign/apresentacao-hoje/claro.png', 'Hoje', 106),
        peca(f'{P}/claro/boas-vindas-relance.png', 'A: o Boneco recebe', med['claro']['boas-vindas']),
        peca(f'{P}/claro/boas-vindas-b-relance.png', 'B: o seu lugar', med['claro']['boas-vindas-b'])], 'claro')
juntar([peca(f'{P}/escuro/boas-vindas-relance.png', 'A, escuro', None, True),
        peca(f'{P}/escuro/boas-vindas-b-relance.png', 'B, escuro', None, True),
        peca(f'{P}/pequeno/boas-vindas-relance.png', 'A, a 360 px', med['pequeno']['boas-vindas'])], 'escuro-e-360', '#555555')
