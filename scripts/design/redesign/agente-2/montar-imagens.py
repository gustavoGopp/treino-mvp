# Agente 2: monta as imagens do relatório a partir das capturas brutas (reports/design/redesign/agente-2/).
# Uso: python3 scripts/design/redesign/agente-2/montar-imagens.py
from PIL import Image, ImageDraw, ImageFont
B = 'reports/design/redesign/agente-2'
O = 'docs/revisoes/redesign/img'
F = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FB = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

def faixa(arquivos, legendas, saida, largura=240, titulo=None):
    ims = [Image.open(a).convert('RGB') if isinstance(a, str) else Image.open(a[0]).convert('RGB').crop((0, a[1], 360, a[1] + 740)) for a in arquivos]  # (arquivo, topo) = recorte de 1 tela
    ims = [i.resize((largura, round(i.height * largura / i.width)), Image.LANCZOS) for i in ims]
    h = max(i.height for i in ims)
    topo = 40 if titulo else 0
    W = len(ims) * (largura + 12) + 12
    tela = Image.new('RGB', (W, h + 64 + topo), 'white')
    d = ImageDraw.Draw(tela)
    if titulo:
        d.text((12, 10), titulo, fill='black', font=ImageFont.truetype(FB, 18))
    for k, (im, leg) in enumerate(zip(ims, legendas)):
        x = 12 + k * (largura + 12)
        tela.paste(im, (x, topo + 8))
        d.rectangle([x - 1, topo + 7, x + largura, topo + 8 + im.height], outline='#999')
        for j, linha in enumerate(leg.split('\n')):
            d.text((x, topo + h + 14 + j * 18), linha, fill='black', font=ImageFont.truetype(F, 14))
    tela.save(saida, optimize=True)
    print(saida, tela.size)

P = f'{B}/pequeno/ana'
faixa([f'{P}/0{i}-{n}-relance.png' for i, n in enumerate(['boas-vindas', 'triagem', 'nivel', 'rotina', 'equipamento', 'confirmar'], 1)],
      ['1. Boas-vindas: 1 toque\n180 palavras; botão fora', '2. Triagem: 1 toque\n178 palavras; botão fora', '3. Experiência: 4 toques', '4. Rotina: 5 toques\n(2 são prioridades)', '5. Equipamento: 6 toques\n(fora da contagem)', '6. Tudo certo?: 1 toque'],
      f'{O}/agente-2-hoje-ana.png', 200, 'Hoje, Ana, celular pequeno (360 x 740): o que se vê ao abrir cada tela')
E = f'{B}/pequeno/equipamento'
faixa([f'{B}/pequeno/ana/05-equipamento-relance.png', f'{E}/01-atalho-academia-relance.png', (f'{E}/03-foto-esperando.png', 420), (f'{E}/04-foto-sugestoes.png', 420)],
      ['Ao abrir: os 4 atalhos\nem cima; foto logo abaixo', '"Academia completa":\n39 itens; 2 toques até sair', 'Foto: a espera\n(só o texto "Analisando...")', 'Foto: sugestões\n("Usar" travado até responder)'],
      f'{O}/agente-2-equipamento.png', 220, 'Equipamento hoje (360 x 740)')

# Fluxo hoje × proposto (Ana), em caixas
def fluxo(saida):
    linhas = [
        ('Hoje (Ana): 6 telas, 12 toques fora do equipamento + 6 nele', [('Boas-vindas', '1 toque · 180 pal.'), ('Triagem', '1 toque · 178 pal.'), ('Experiência', '4 toques'), ('Rotina', '5 toques\n(2 prioridades)'), ('Equipamento', '6 toques'), ('Tudo certo?', '1 toque')]),
        ('Proposto (Ana): 5 telas, 11 fora do equipamento + 6 nele (o último é "Gerar")', [('Boas-vindas', '1 toque · ~100 pal.\nbotão à vista'), ('Triagem', '1 toque · igual'), ('Experiência', '4 toques'), ('Rotina', '5 toques\n(sem "objetivo")'), ('Equipamento', '6 toques\núltimo = "Gerar"'), ('Programa', 'resumo "Montado\npara..." no topo')]),
    ]
    W, bw, bh = 1180, 178, 92
    im = Image.new('RGB', (W, 330), 'white')
    d = ImageDraw.Draw(im)
    f, fb = ImageFont.truetype(F, 14), ImageFont.truetype(FB, 15)
    for r, (tit, caixas) in enumerate(linhas):
        y = 16 + r * 156
        d.text((12, y), tit, fill='black', font=fb)
        for k, (n, s) in enumerate(caixas):
            x = 12 + k * (bw + 16)
            novo = r == 1 and k == 5
            d.rounded_rectangle([x, y + 28, x + bw, y + 28 + bh], 10, outline='#1f3fbf' if not novo else '#2e7d32', width=2, fill='#eef2ff' if not novo else '#eaf5ea')
            d.text((x + 10, y + 36), n, fill='black', font=fb)
            for j, l in enumerate(s.split('\n')):
                d.text((x + 10, y + 60 + j * 18), l, fill='#222', font=f)
            if k < 5:
                d.text((x + bw + 2, y + 62), '→', fill='black', font=fb)
    im.save(saida, optimize=True)
    print(saida, im.size)

fluxo(f'{O}/agente-2-fluxo-proposto.png')
