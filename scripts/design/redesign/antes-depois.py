# Redesign (06/11/2026): o antes e o depois de cada tela, lado a lado, a partir das capturas por script
# (reports/design/redesign/antes/ e depois/). Cada imagem mostra o que se vê sem rolar, no Pixel 7 (412 × 839) ou a
# 360 × 740. Saída: docs/revisoes/redesign/img/ad-<tela>-<tema>.png (75% do tamanho, para o repositório não inchar).
# Uso: python3 scripts/design/redesign/antes-depois.py
from PIL import Image, ImageDraw, ImageFont
import os

A = 'reports/design/redesign/antes'
DEP = 'reports/design/redesign/depois'
SAIDA = 'docs/revisoes/redesign/img'
FONTE = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 26)
PARES = [  # (tela do protótipo, captura do app de hoje)
    ('boas-vindas', 'cadastro/01-boas-vindas'), ('triagem', 'cadastro/02-triagem'), ('triagem-sim', 'cadastro/02b-triagem-uma-a-uma'),
    ('experiencia', 'cadastro/03b-nivel-respondido'), ('rotina', 'cadastro/04b-rotina-respondida'), ('equipamento', 'cadastro/05-equipamento-vazio'),
    ('equipamento-academia', 'cadastro/05b-equipamento-academia-completa'), ('equipamento-lista', 'cadastro/05d-equipamento-lista-ana'),
    ('programa-novo', 'cadastro/07-programa-recem-gerado'), ('inicio', 'ana/10-programa'), ('treino', 'ana/11-treino-serie-1'),
    ('treino-descanso', 'ana/12-treino-descanso'), ('treino-senti', 'ana/14-treino-senti-algo'), ('treino-trocar', 'ana/15-treino-trocar'),
    ('treino-texto', 'ana/16e-treino-cartao-fechado'), ('guia', 'ana/16-guia-tecnica'), ('fim', 'ana/17-fim-do-treino'),
    ('semana', 'ana/18-semana'), ('evolucao', 'ana/19-evolucao'), ('dados', 'ana/20-meus-dados'), ('locais', 'bruno/21-locais'),
]
TEMAS = {'claro': [p[0] for p in PARES], 'escuro': ['boas-vindas', 'inicio', 'treino', 'treino-descanso', 'guia', 'fim'], 'pequeno': ['treino', 'treino-descanso', 'treino-senti', 'guia', 'triagem', 'equipamento-academia']}

def lado(img, rotulo, fundo, tinta):
    cab = 44
    out = Image.new('RGB', (img.width, img.height + cab), fundo)
    ImageDraw.Draw(out).text((12, 8), rotulo, font=FONTE, fill=tinta)
    out.paste(img, (0, cab))
    return out

os.makedirs(SAIDA, exist_ok=True)
n = 0
for tema, telas in TEMAS.items():
    escuro = tema == 'escuro'
    fundo, tinta = ('#111111', '#EEEEEE') if escuro else ('#FFFFFF', '#222222')
    for tela_id, antes in dict(PARES).items() if False else PARES:
        if tela_id not in telas:
            continue
        pa, pd = f'{A}/{tema}/{antes}-relance.png', f'{DEP}/{tema}/{tela_id}-relance.png'
        if not (os.path.exists(pa) and os.path.exists(pd)):
            print('falta', pa if not os.path.exists(pa) else pd)
            continue
        ia, idp = lado(Image.open(pa).convert('RGB'), 'Antes (hoje)', fundo, tinta), lado(Image.open(pd).convert('RGB'), 'Depois (proposta)', fundo, tinta)
        out = Image.new('RGB', (ia.width + idp.width + 16, max(ia.height, idp.height)), fundo)
        out.paste(ia, (0, 0)); out.paste(idp, (ia.width + 16, 0))
        out = out.resize((round(out.width * 0.75), round(out.height * 0.75)), Image.LANCZOS)
        out.save(f'{SAIDA}/ad-{tela_id}-{tema}.png', optimize=True)
        n += 1
print(n, 'imagens')
