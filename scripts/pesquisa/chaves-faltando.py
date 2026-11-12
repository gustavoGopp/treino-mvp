#!/usr/bin/env python3
"""Lista as chaves de fonte citadas em docs/pesquisa-v2/ que não estão em docs/pesquisa/fontes.md.

Uso:
  python3 -I scripts/pesquisa/chaves-faltando.py           # chave, arquivos e a 1ª linha em que aparece
  python3 -I scripts/pesquisa/chaves-faltando.py --so-chaves

Uma chave é um texto entre crases no formato das chaves de fontes.md: letras minúsculas (e hífens), um ano de
4 dígitos e, às vezes, uma letra ("schoenfeld2016c", "nordico-2019"). Ids de regra, de exercício e nomes de
arquivo não têm esse formato. A saída é para conferência humana: nem todo texto com cara de chave é uma fonte.
"""
import glob, re, sys

CHAVE = re.compile(r'`([a-z][a-z-]*(?:19|20)\d{2}[a-z]?)`')
fontes = set(re.findall(r'^- `([^`]+)`', open('docs/pesquisa/fontes.md', encoding='utf-8').read(), re.M))
achadas = {}
for arq in sorted(glob.glob('docs/pesquisa-v2/*.md')):
    for n, linha in enumerate(open(arq, encoding='utf-8'), 1):
        for chave in CHAVE.findall(linha):
            if chave not in fontes:
                achadas.setdefault(chave, []).append((arq.split('/')[-1], n, linha.strip()))
for chave in sorted(achadas):
    if '--so-chaves' in sys.argv:
        print(chave)
        continue
    usos = achadas[chave]
    arquivos = sorted({a for a, _, _ in usos})
    print(f'{chave}\t{len(usos)} uso(s) em {", ".join(arquivos)}\t{usos[0][0]}:{usos[0][1]}: {usos[0][2][:160]}')
print(f'{len(achadas)} chave(s) citada(s) em docs/pesquisa-v2 e ausente(s) de docs/pesquisa/fontes.md', file=sys.stderr)
