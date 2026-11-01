#!/usr/bin/env python3
"""Busca e lê resumos oficiais no PubMed, para a pesquisa (docs/pesquisa-v2/).

Uso:
  python3 -I scripts/pesquisa/pubmed.py s termos da busca      # lista PMID | título | revista
  python3 -I scripts/pesquisa/pubmed.py a 38595233 41343037    # título, autores, revista, DOI e resumo

Observações:
- Lê as páginas públicas do PubMed (pubmed.ncbi.nlm.nih.gov). O PMC e as editoras costumam estar
  bloqueados na rede das sessões; por isso o status das fontes é "resumo-PubMed" (resumo oficial lido),
  e não "texto completo".
- O PubMed limita pedidos seguidos: o script espera entre pedidos e guarda cópia em /tmp/pubmed-cache.
  Se um resumo vier vazio, espere alguns segundos e rode de novo (as cópias ruins são descartadas).
- Buscas longas podem não achar nada: prefira 3 a 6 termos.
"""
import html, os, re, sys, time, urllib.parse, urllib.request

CACHE = '/tmp/pubmed-cache'
UA = {'User-Agent': 'Mozilla/5.0'}
os.makedirs(CACHE, exist_ok=True)


def _get(url):
    arq = os.path.join(CACHE, re.sub(r'[^A-Za-z0-9]', '_', url)[-180:])
    if os.path.exists(arq) and os.path.getsize(arq) > 20_000:
        return open(arq, encoding='utf-8').read()
    for tentativa in range(3):
        time.sleep(2 + 2 * tentativa)
        try:
            s = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read().decode('utf-8', 'ignore')
            if len(s) > 20_000:  # páginas curtas costumam ser bloqueio temporário
                open(arq, 'w', encoding='utf-8').write(s)
                return s
        except Exception:
            pass
    return ''


def _limpa(x):
    return re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', ' ', x))).strip()


def buscar(termos, n=10):
    s = _get('https://pubmed.ncbi.nlm.nih.gov/?' + urllib.parse.urlencode({'term': termos, 'size': max(10, n)}))
    saida = [
        (m.group(1), _limpa(m.group(2)), _limpa(m.group(3))[:90])
        for m in re.finditer(
            r'class="docsum-title".*?data-article-id="(\d+)">(.*?)</a>.*?<span class="docsum-journal-citation full-journal-citation">(.*?)</span>',
            s, re.S)
    ]
    if not saida:  # um único resultado: o PubMed abre direto a página do artigo
        m = re.search(r'<meta name="citation_pmid" content="(\d+)"', s)
        t = re.search(r'<meta name="citation_title" content="([^"]*)"', s)
        if m:
            saida.append((m.group(1), html.unescape(t.group(1)) if t else '', ''))
    return saida[:n]


def resumo(pmid):
    s = _get(f'https://pubmed.ncbi.nlm.nih.gov/{pmid}/')
    pega = lambda padrao: (re.search(padrao, s, re.S) or [None, ''])[1]
    autores = re.findall(r'<a class="full-name"[^>]*>(.*?)</a>', s)
    return {
        'pmid': pmid,
        'titulo': _limpa(pega(r'<h1 class="heading-title">(.*?)</h1>')),
        'autores': ', '.join(dict.fromkeys(autores[:3])) + (' et al.' if len(autores) > 3 else ''),
        'revista': pega(r'<button[^>]*class="journal-actions-trigger[^"]*"[^>]*title="([^"]*)"'),
        'citacao': _limpa(pega(r'<span class="cit">(.*?)</span>')),
        'doi': pega(r'doi\.org/(10\.[^"\s<]+)'),
        'resumo': _limpa(pega(r'<div class="abstract-content selected"[^>]*>(.*?)</div>')),
    }


if __name__ == '__main__':
    if len(sys.argv) < 3 or sys.argv[1] not in ('s', 'a'):
        print(__doc__)
        sys.exit(1)
    if sys.argv[1] == 's':
        for linha in buscar(' '.join(sys.argv[2:])):
            print(' | '.join(linha))
    else:
        for p in sys.argv[2:]:
            d = resumo(p)
            print(f"\n## {d['pmid']} {d['titulo']}\n{d['autores']} — {d['revista']} {d['citacao']} doi:{d['doi']}\n{d['resumo'] or '(resumo vazio: espere e rode de novo)'}")
