"""Redesign (06/11/2026), agente 6: daltonismo (Machado, Oliveira e Fernandes 2009, severidade 1) e reflexo do sol
(luz somada à tela, em espaço linear) sobre as capturas do teste 8 de critica.spec.ts, e o contraste efetivo dos pares
de cor da direção Giz e grafite com reflexo. Uso: python3 scripts/design/redesign/agente-6/cor-sol.py"""
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFont

R = 'reports/design/redesign/agente-6'
M = {
    'protanopia': [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
    'deuteranopia': [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
    'tritanopia': [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.146860], [0.004733, 0.691367, 0.303900]],
}
lin = lambda c: np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
srgb = lambda c: np.where(c <= 0.0031308, c * 12.92, 1.055 * np.clip(c, 0, 1) ** (1 / 2.4) - 0.055)


def carregar(p):
    return lin(np.asarray(Image.open(p).convert('RGB')).astype(float) / 255)


def salvar(a):
    return Image.fromarray((np.clip(srgb(np.clip(a, 0, 1)), 0, 1) * 255).round().astype('uint8'))


def sol(a, reflexo):  # a luz refletida soma ao que a tela emite; normaliza para o branco
    return (a + reflexo) / (1 + reflexo)


def versoes(p):
    a = carregar(p)
    out = [('normal', salvar(a))]
    for k, m in M.items():
        out.append((k, salvar(a @ np.array(m).T)))
    out.append(('sol (reflexo 25%)', salvar(sol(a, 0.25))))
    return out


def montagem(linhas, destino, largura=196):
    fonte = ImageFont.load_default()
    cols = 5
    alto = None
    blocos = []
    for nome, p in linhas:
        vs = versoes(p)
        ims = [im.resize((largura, int(im.height * largura / im.width)), Image.LANCZOS) for _, im in vs]
        blocos.append((nome, vs, ims))
        alto = ims[0].height
    W = cols * (largura + 8) + 8
    H = len(blocos) * (alto + 30) + 8
    tela = Image.new('RGB', (W, H), 'white')
    d = ImageDraw.Draw(tela)
    for i, (nome, vs, ims) in enumerate(blocos):
        y = 8 + i * (alto + 30)
        for j, im in enumerate(ims):
            x = 8 + j * (largura + 8)
            d.text((x, y), f'{nome} · {vs[j][0]}', fill='black', font=fonte)
            tela.paste(im, (x, y + 16))
    tela.save(destino, optimize=True)


montagem([('descanso, claro', f'{R}/cor-light-treino-descanso.png'), ('semana, claro', f'{R}/cor-light-semana.png'), ('guia músculos, claro', f'{R}/cor-light-guia-mus.png')], f'{R}/montagem-cor-claro.png')
montagem([('descanso, escuro', f'{R}/cor-dark-treino-descanso.png'), ('semana, escuro', f'{R}/cor-dark-semana.png'), ('guia erros, escuro', f'{R}/cor-dark-guia-err.png')], f'{R}/montagem-cor-escuro.png')


# contraste efetivo com reflexo (WCAG: (L1 + 0,05) / (L2 + 0,05); o reflexo soma luz igual às duas cores)
def L(h):
    c = lin(np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)]) / 255)
    return float(0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2])


PARES = {
    'claro': [('texto 2 no fundo', '#464B51', '#F5F3EF', 4.5), ('"Senti algo" (alerta na superfície)', '#AF283D', '#FFFFFF', 4.5),
              ('selo (texto 2 na superfície 2)', '#464B51', '#EAE7E2', 4.5), ('borda de controle no fundo', '#868A92', '#F5F3EF', 3),
              ('texto no botão de ação', '#FFFFFF', '#3F3AA8', 4.5), ('feito (verde) no fundo', '#0F6B3E', '#F5F3EF', 4.5),
              ('trilho vazio da barra (superfície 2) no cartão', '#EAE7E2', '#FFFFFF', 3)],
    'escuro': [('texto 2 no fundo', '#BBB8B0', '#151410', 4.5), ('"Senti algo" (alerta na superfície)', '#EA8085', '#211F1C', 4.5),
               ('selo (texto 2 na superfície 2)', '#BBB8B0', '#2D2B27', 4.5), ('borda de controle no fundo', '#6F6C64', '#151410', 3),
               ('texto no botão de ação', '#25284A', '#A9B3FF', 4.5), ('feito (verde) no fundo', '#65AE80', '#151410', 4.5)],
}
saida = {}
for tema, ps in PARES.items():
    saida[tema] = []
    for nome, a, b, minimo in ps:
        la, lb = sorted([L(a), L(b)], reverse=True)
        linha = {'par': nome, 'minimo': minimo}
        for r in (0, 0.1, 0.25, 0.5):  # reflexo como fração do branco da tela
            linha[f'reflexo {int(r * 100)}%'] = round((la + 0.05 + r) / (lb + 0.05 + r), 2)
        saida[tema].append(linha)
json.dump(saida, open(f'{R}/contraste-sol.json', 'w'), ensure_ascii=False, indent=1)
for t, ls in saida.items():
    print(t)
    for l in ls:
        print('  ', l)
