# Redesign (06/11/2026): o retorno do Gustavo sobre o lote 1 ("muita informação na tela"). Lado a lado: o app de hoje
# (capturas FASE=lote-1b de antes.spec.ts) e a proposta enxuta do protótipo (capturas.spec.ts), com as palavras à vista
# sem rolar de cada uma (scripts/design/medir.ts). Saída: docs/revisoes/redesign/img/menos-texto-*.png
# Uso: python3 scripts/design/redesign/menos-texto.py
from PIL import Image, ImageDraw, ImageFont
import json

F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 24)
f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 19)
app = {m['tela'].split('/', 1)[1]: m['palavras'] for m in json.load(open('docs/revisoes/redesign/lote-1b/medidas-claro.json'))}
pro = {m['tela'].split('/', 1)[1]: m['palavras'] for m in json.load(open('docs/revisoes/redesign/depois/medidas-claro.json'))}

def peca(caminho, rotulo, palavras):
    img = Image.open(caminho).convert('RGB')
    out = Image.new('RGB', (img.width, img.height + 70), '#FFFFFF')
    d = ImageDraw.Draw(out)
    d.text((12, 6), rotulo, font=F, fill='#222222')
    if palavras is not None:
        d.text((12, 38), f'{palavras} palavras à vista', font=f, fill='#555555')
    out.paste(img, (0, 70))
    return out

def juntar(pecas, nome):
    w = sum(p.width for p in pecas) + 16 * (len(pecas) - 1)
    tela = Image.new('RGB', (w, max(p.height for p in pecas)), '#DDDDDD')
    x = 0
    for p in pecas:
        tela.paste(p, (x, 0))
        x += p.width + 16
    tela = tela.resize((int(tela.width * 0.75), int(tela.height * 0.75)), Image.LANCZOS)
    tela.save(f'docs/revisoes/redesign/img/menos-texto-{nome}.png', optimize=True)
    print(nome, tela.size)

A, P = 'reports/design/redesign/lote-1b/claro/ana', 'reports/design/redesign/depois/claro'
juntar([peca(f'{A}/10-programa-relance.png', 'App hoje', app['ana/10-programa']), peca(f'{P}/inicio-relance.png', 'Proposta, menos texto', pro['inicio'])], 'inicio')
juntar([peca(f'{A}/11-treino-serie-1-relance.png', 'App hoje', app['ana/11-treino-serie-1']), peca(f'{P}/treino-relance.png', 'Proposta, menos texto', pro['treino'])], 'treino')
juntar([peca(f'{P}/treino-descanso-relance.png', 'Descanso', pro['treino-descanso']), peca(f'{P}/treino-texto-relance.png', 'Sem animação', pro['treino-texto']),
        peca(f'{P}/treino-porque-relance.png', '"por quê?" aberto', None), peca(f'{P}/treino-mais-relance.png', '"⋯" aberto', None)], 'treino-estados')
