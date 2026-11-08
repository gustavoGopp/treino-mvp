# Agente 5: monta as imagens do relatório a partir das capturas de telas.spec.ts e dos quadros de cor.mjs.
# Uso: python3 scripts/design/redesign/agente-5/montar.py  (Pillow; ferramenta de documentação, fora do app)
from PIL import Image, ImageDraw, ImageFont
R = 'reports/design/redesign/agente-5'
OUT = 'docs/revisoes/redesign/img'
NOMES = {'atual': 'Hoje (v2)', 'giz': 'Giz e grafite', 'petroleo': 'Petróleo', 'ameixa': 'Ameixa'}
try:
    F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15)
    f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 13)
except OSError:
    F = f = ImageFont.load_default()

def abrir(p, w, crop=None):
    i = Image.open(p).convert('RGB')
    if crop: i = i.crop(crop)
    return i.resize((w, round(i.height * w / i.width)), Image.LANCZOS)

def grade(linhas, rotulos_col, rotulos_lin, gap=8, topo=24, esq=0):
    W = linhas[0][0].width; H = max(i.height for l in linhas for i in l)
    cols = max(len(l) for l in linhas)
    s = Image.new('RGB', (esq + cols * W + (cols - 1) * gap + 8, topo + len(linhas) * (H + gap)), 'white')
    d = ImageDraw.Draw(s)
    for c, t in enumerate(rotulos_col): d.text((esq + c * (W + gap) + 4, 4), t, fill='#15171C', font=F)
    for r, l in enumerate(linhas):
        y = topo + r * (H + gap)
        if rotulos_lin:
            d.text((4, y + 6), rotulos_lin[r], fill='#15171C', font=F)
        for c, i in enumerate(l): s.paste(i, (esq + c * (W + gap), y))
    return s

def salvar_leve(img, saida):
    q = img.convert('RGB').quantize(colors=200, method=Image.Quantize.MEDIANCUT)
    q.save(saida, optimize=True)

# 1-3: cada direção, programa e treino (descanso), claro e escuro
for d in ['giz', 'petroleo', 'ameixa']:
    ims = [[abrir(f'{R}/telas/{t}/{n}-{d}-normal.png', 300) for t in ['claro', 'escuro'] for n in ['programa', 'descanso']]]
    s = grade(ims, [f'{NOMES[d]} · programa · claro', 'treino (descanso) · claro', 'programa · escuro', 'treino (descanso) · escuro'], None)
    salvar_leve(s, f'{OUT}/agente-5-{d}.png')

# 4-5: as 3 simulações, por direção, treino e programa, em cada tema
for t in ['claro', 'escuro']:
    linhas = []
    for d in ['atual', 'giz', 'petroleo', 'ameixa']:
        linhas.append([abrir(f'{R}/telas/{t}/{n}-{d}-{k}.png', 150) for n in ['descanso', 'programa'] for k in ['normal', 'protanopia', 'deuteranopia', 'tritanopia']])
    s = grade(linhas, ['treino', 'protanopia', 'deuteranopia', 'tritanopia', 'programa', 'protanopia', 'deuteranopia', 'tritanopia'], [NOMES[d] for d in ['atual', 'giz', 'petroleo', 'ameixa']], esq=120)
    salvar_leve(s, f'{OUT}/agente-5-daltonismo-{t}.png')

# 6: a paleta sobre e ao lado do palco do Boneco (os dois primeiros cartões de cada quadro)
linhas = []
for d in ['giz', 'petroleo', 'ameixa']:
    linhas.append([abrir(f'{R}/palco-{d}-{t}.png', 560, (16, 52, 1104, 380)) for t in ['claro', 'escuro']])
s = grade(linhas, ['claro', 'escuro'], [NOMES[d] for d in ['giz', 'petroleo', 'ameixa']], esq=110)
salvar_leve(s, f'{OUT}/agente-5-palco.png')
print('ok')
