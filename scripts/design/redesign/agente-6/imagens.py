"""Redesign (06/11/2026), agente 6: monta as imagens do relatório (até 300 kB cada) a partir das brutas em
reports/design/redesign/agente-6/. Rode depois de critica.spec.ts, zoom-detalhe.spec.ts e cor-sol.py."""
import importlib.util
from PIL import Image, ImageDraw, ImageFont

R = 'reports/design/redesign/agente-6'
D = 'docs/revisoes/redesign/img'
F = ImageFont.load_default()
spec = importlib.util.spec_from_file_location('cs', 'scripts/design/redesign/agente-6/cor-sol.py')


def gravar(im, nome):
    im.convert('RGB').quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(f'{D}/agente-6-{nome}.png', optimize=True)


def lado_a_lado(itens, nome, alto=640):
    ims = [(t, Image.open(p).convert('RGB')) for t, p in itens]
    ims = [(t, im.resize((int(im.width * alto / im.height), alto), Image.LANCZOS)) for t, im in ims]
    W = sum(im.width for _, im in ims) + 16 * (len(ims) + 1)
    tela = Image.new('RGB', (W, alto + 40), 'white')
    d = ImageDraw.Draw(tela)
    x = 16
    for t, im in ims:
        d.text((x, 10), t, fill='black', font=F)
        tela.paste(im, (x, 28))
        d.rectangle([x - 1, 27, x + im.width, 28 + im.height], outline='#888')
        x += im.width + 16
    gravar(tela, nome)


lado_a_lado([('360 x 740: o registro ocupa 67% da tela', f'{R}/vista-pequeno-360x740-treino-descanso.png'),
             ('320 x 640 (WCAG 1.4.10): o "+" sai da tela', f'{R}/vista-reflow-320x640-treino-descanso.png'),
             ('206 x 420 (zoom 200% no Pixel 7)', f'{R}/vista-zoom200-206x420-treino-descanso.png')], 'reflow-zoom')
lado_a_lado([('Tab em "Terminar o treino agora": o foco fica atrás do registro', f'{R}/foco-terminar-coberto.png')], 'foco-coberto', alto=740)
lado_a_lado([('Triagem a 320 x 640: 2 das 9 condições atrás dos botões', f'{R}/triagem-320.png')], 'triagem-320')

# cor e sol: o descanso no claro e no escuro, normal, 3 daltonismos e reflexo de 25%
cs = importlib.util.module_from_spec(spec)
import sys
sys.argv = ['x']
src = open('scripts/design/redesign/agente-6/cor-sol.py').read().split('montagem([')[0]
exec(src, cs.__dict__)
linhas = []
for tema in ('light', 'dark'):
    vs = cs.versoes(f'{R}/cor-{tema}-treino-descanso.png')
    linhas.append([(f'{"claro" if tema == "light" else "escuro"} · {n}', im.resize((206, int(im.height * 206 / im.width)), Image.LANCZOS)) for n, im in vs])
h = linhas[0][0][1].height
tela = Image.new('RGB', (5 * 214 + 8, 2 * (h + 24) + 8), 'white')
d = ImageDraw.Draw(tela)
for i, ln in enumerate(linhas):
    for j, (t, im) in enumerate(ln):
        x, y = 8 + j * 214, 8 + i * (h + 24)
        d.text((x, y), t, fill='black', font=F)
        tela.paste(im, (x, y + 16))
gravar(tela, 'cor-sol')
