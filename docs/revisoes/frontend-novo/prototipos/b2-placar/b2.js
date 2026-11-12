// Protótipo B2, "Placar" aprofundada (12/11/2026): início, treino (a série, o guia nos 4 modos e o descanso em tela
// cheia), fim do treino e semana, com as folhas "Senti algo", "por quê?", "Como fazer" e "Mais opções".
// De onde vem cada coisa, para nada ser inventado:
//   window.DADOS    o programa da Ana (gerador real) e os textos do guia (src/conteudo), por gerar.mjs
//   window.BONECO   os quadros do Boneco, do motor, sem mudança, por gerar.mjs
//   window.COLHIDO  os textos e números do "por quê?", do "Senti algo", do fim do treino e da semana, colhidos do app
//                   de verdade com a Ana fazendo o treino A inteiro (colher.spec.ts)
// Nada aqui grava nem envia dado: é um protótipo de tela.
(() => {
  const D = window.DADOS, B = window.BONECO, I = window.ICONES, C = window.COLHIDO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const dia = D.dias[0];
  const x0 = dia.exercicios[0];
  const parado = /[?&]parado/.test(location.search); // capturas: o relógio e o Boneco não andam
  if (/[?&]limpo/.test(location.search)) document.documentElement.classList.add('limpo');

  const S = { tela: 'inicio', vista: 'serie', descansando: false, acabou: false, serie: 1, cargaI: 2, reps: 9, rir: null, feitas: [], resto: 0, total: 0, modo: 'tec', pausado: false, folha: null, folhaItem: 0, hojeFoi: null, treinoFeito: false };
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const faixa = (f) => (f[0] === f[1] ? `${f[0]}` : `${f[0]}–${f[1]}`);
  const rx = (x) => `${x.series} × ${faixa(x.reps)}${x.unilateral ? ' cada lado' : ''}`;
  const carga = () => D.cargas[S.cargaI];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const ultimaSerie = () => S.serie > x0.series;

  function textos() {
    const ultima = S.feitas[S.feitas.length - 1];
    const [, minutosFim, seriesFim] = C.fim.subtitulo.split(' · ');
    const [feitosSem, restoSem] = [C.semana.numero.split(' ')[0], C.semana.numero.split(' ').slice(1).join(' ')];
    return {
      diaNome: dia.nome,
      nExercicios: dia.exercicios.length,
      minutos: dia.minutos,
      semana: D.semana,
      diasPorSemana: D.diasPorSemana,
      feitosNaSemana: S.treinoFeito ? 1 : 0,
      divisao: D.divisao,
      posicao: `1 de ${dia.exercicios.length}`,
      exNome: x0.nome,
      faixaReps: `${faixa(x0.reps)}${x0.unilateral ? ' cada lado' : ''}`,
      descanso: mmss(x0.descansoSeg),
      serie: Math.min(S.serie, x0.series),
      series: x0.series,
      carga: carga(),
      reps: S.reps,
      metaRir: faixa(x0.rir),
      relogio: mmss(S.resto),
      rotuloRelogio: S.acabou ? 'Hora da próxima série' : 'Descanso',
      rotuloFeita: ultimaSerie() ? 'Terminar o treino' : 'Série feita',
      subFeita: ultimaSerie() ? '(o protótipo pula os outros 5 exercícios)' : S.serie < x0.series ? `· descansar ${mmss(x0.descansoSeg)}` : '',
      serieSalva: ultima ? `Série ${ultima.n} salva · ${ultima.carga} kg × ${ultima.reps}` : '',
      fimRotulo: C.fim.titulo,
      mudouTitulo: C.fim.mudou.titulo,
      mudouTexto: C.fim.mudou.textos.join(' '),
      hojeFoiPergunta: C.fim.hojeFoi.pergunta,
      semanaPeriodo: C.semana.periodo,
      semanaFeitos: feitosSem,
      semanaResto: restoSem,
      semanaMensagem: C.semana.mensagem,
      _fim: [minutosFim, seriesFim],
    };
  }

  const svg = (q) => `<svg viewBox="${q.v}" class="${q.c}" aria-hidden="true">${q.h}</svg>`;
  const icones = (raiz) => $$('[data-icone]', raiz).forEach((e) => { if (e.dataset.posto !== e.dataset.icone) { e.innerHTML = I[e.dataset.icone] ?? ''; e.dataset.posto = e.dataset.icone; } });
  const minis = (raiz) => $$('[data-mini]', raiz).forEach((e) => { const q = B.mini[e.dataset.mini]; if (q && !e.firstChild) e.innerHTML = svg(q); });

  /** O que cada lista mostra. Cada item preenche os [data-i] do <template>; `_` leva atributos e estilos. */
  function itensDe(nome, t) {
    if (nome === 'dias') return D.dias.map((d, i) => ({ letra: d.nome.slice(-1), estado: i === 0 ? (S.treinoFeito ? 'feito' : 'hoje') : `~${d.minutos} min`, _: { pressed: i === 0 } }));
    if (nome === 'exercicios') return dia.exercicios.map((x, i) => ({ n: i + 1, nome: x.nome, prescricao: rx(x), _: { mini: x.animacaoId } }));
    if (nome === 'progresso') return dia.exercicios.map((_, i) => ({ _: { atual: i === 0 } }));
    if (nome === 'series') return Array.from({ length: x0.series }, (_, i) => ({ _: { feita: i < S.feitas.length, atual: i + 1 === S.serie } }));
    if (nome === 'fim-numeros') return [...t._fim.map((v) => ({ valor: v.split(' ')[0], rotulo: v.split(' ').slice(1).join(' ') })), { valor: C.fim.mudou.semana.replace(' de ', '/'), rotulo: 'na semana' }];
    if (nome === 'hoje-foi') return C.fim.hojeFoi.opcoes.map((o) => ({ texto: o, _: { pressed: S.hojeFoi === o, v: o } }));
    if (nome === 'proxima') return C.fim.proxima.map((p, i) => ({ nome: p.nome, acao: p.acao, resto: p.resto ? ` · ${p.resto}` : '', _: { item: i } }));
    if (nome === 'semana-pips') return Array.from({ length: D.diasPorSemana }, (_, i) => ({ _: { feita: i < Number(C.semana.numero.split(' ')[0]) } }));
    if (nome === 'musculos') return C.semana.musculos.map((m) => ({ nome: m.nome, numero: m.numero, _: { classe: m.classe, feito: m.feito, meta: m.meta } }));
    if (nome === 'semana-notas') return C.semana.notas.map((n) => ({ texto: n }));
    return [];
  }
  function listas(t) {
    for (const lista of $$('[data-lista]')) {
      const molde = lista.querySelector('template');
      const itens = itensDe(lista.dataset.lista, t);
      const chave = JSON.stringify(itens);
      if (lista.dataset.chave === chave) continue; // nada mudou: não refaz (as miniaturas não piscam)
      lista.dataset.chave = chave;
      $$(':scope > :not(template)', lista).forEach((e) => e.remove());
      for (const it of itens) {
        const no = molde.content.firstElementChild.cloneNode(true);
        $$('[data-i]', no).concat(no.matches('[data-i]') ? [no] : []).forEach((e) => { e.textContent = it[e.dataset.i] ?? ''; });
        const a = it._ ?? {};
        if (a.mini) $$('[data-mini-i]', no).forEach((e) => { e.dataset.mini = a.mini; });
        if ('pressed' in a) no.setAttribute('aria-pressed', String(a.pressed));
        if (a.v) no.dataset.v2 = a.v;
        if (a.atual) no.dataset.atual = '';
        if (a.feita) no.dataset.feita = '';
        if (a.classe) no.classList.add(a.classe);
        if ('item' in a) $$('[data-acao="folha"]', no).forEach((e) => { e.dataset.item = a.item; });
        if (a.feito) { no.querySelector('.m-barra i').style.width = a.feito; no.querySelector('.m-barra u').style.left = a.meta; }
        lista.append(no);
      }
      minis(lista);
    }
  }

  /** A legenda do modo do guia, com os textos de src/conteudo (os mesmos que a tela do guia mostra hoje). */
  function legenda() {
    const g = D.guia;
    if (S.modo === 'tec') return esc(g.dicas.join(' '));
    if (S.modo === 'err') return `<b>${esc(g.erros[0].titulo)}.</b> ${esc(g.erros[0].desc)}`;
    if (S.modo === 'mus') return `<b>Onde sentir:</b> ${esc(g.sentir)}`;
    return 'Trajetória da carga ou da mão; a seta mostra a fase concêntrica.';
  }

  // --- as folhas ---
  const lista = (itens) => `<ul class="pontos">${itens.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
  function regraHtml(p) {
    return p.texto.map((t) => `<p>${esc(t)}</p>`).join('') + p.regras.map((r) => `
      <p class="regra">${esc(r.regra)}</p>
      <div class="bloco-junto"><p class="rotulo">${esc(r.selo.replace(/\.$/, ''))}</p><p class="apoio">${esc(r.sentido)}</p></div>
      ${r.fontes.length ? `<div class="bloco-junto"><p class="rotulo">Fontes</p><ol class="fontes">${r.fontes.map((f) => `<li><span>${esc(f.citacao)}<small>${esc(f.leitura)}${f.link ? ` · <a href="${esc(f.link)}" target="_blank" rel="noreferrer">abrir a fonte</a>` : ''}</small></span></li>`).join('')}</ol></div>` : ''}`).join('');
  }
  const folhas = {
    sentir: () => ({ titulo: C.sentiAlgo.titulo, corpo: `
      <div class="tabela">${C.sentiAlgo.sinais.map((s) => `<button type="button" class="linha-toque"><span><b>${esc(s)}</b></span><i data-icone="chevron-right"></i></button>`).join('')}</div>
      <div class="bloco-junto"><p class="rotulo">${esc(C.sentiAlgo.escala[0])}</p><div class="notas">${C.sentiAlgo.notas.map((n) => `<button type="button">${esc(n)}</button>`).join('')}</div></div>
      <p class="apoio">${esc(C.sentiAlgo.rodape.join(' '))}</p>` }),
    porque: () => ({ titulo: C.porQueDaReserva.titulo, corpo: regraHtml(C.porQueDaReserva) }),
    'porque-fim': () => { const p = C.fim.porQues[S.folhaItem]; return { titulo: p.titulo, corpo: regraHtml(p) }; },
    como: () => { const g = D.guia; return { titulo: g.nome, corpo: `
      <div class="bloco-junto"><p class="rotulo">Montagem: o equipamento</p>${lista(g.montagemEq)}</div>
      <div class="bloco-junto"><p class="rotulo">Montagem: o corpo</p>${lista(g.montagemCorpo)}</div>
      <div class="bloco-junto"><p class="rotulo">Confira antes de começar</p>${lista(g.conferir)}</div>
      <div class="bloco-junto"><p class="rotulo">Respiração</p><p class="apoio">${esc(g.respiracao)}</p></div>
      <div class="bloco-junto"><p class="rotulo">Erros comuns</p><div class="tabela">${g.erros.map((e) => `<div class="linha-toque"><span><b>${esc(e.titulo)}</b><span class="apoio">${esc(e.desc)}</span></span></div>`).join('')}</div></div>` }; },
    mais: () => ({ titulo: 'Mais opções', corpo: `
      <div class="dois"><button type="button" class="btn quieto" disabled>Anterior</button><button type="button" class="btn quieto">Próximo</button></div>
      <div class="tabela"><button type="button" class="linha-toque"><span><b>Trocar exercício</b></span><i data-icone="chevron-right"></i></button><button type="button" class="linha-toque"><span><b>Terminar o treino agora</b></span><i data-icone="chevron-right"></i></button></div>` }),
  };
  function pintarFolha() {
    const veu = $('#veu'), el = $('#folha');
    if (!S.folha) { veu.hidden = true; el.dataset.aberta = ''; return; }
    if (el.dataset.aberta === S.folha + S.folhaItem) return;
    const f = folhas[S.folha]();
    el.innerHTML = `<div class="folha-cab"><h2 id="folha-t">${esc(f.titulo)}</h2><button type="button" class="icone-btn" data-acao="fechar" aria-label="Fechar"><i data-icone="x"></i></button></div>${f.corpo}`;
    el.dataset.aberta = S.folha + S.folhaItem;
    veu.hidden = false;
    el.scrollTop = 0;
  }

  function pintar() {
    const b = document.body;
    b.dataset.tela = S.tela;
    b.dataset.vista = S.vista;
    b.toggleAttribute('data-descansando', S.descansando);
    $('.tela-treino').classList.toggle('invertida', S.acabou && S.vista === 'relogio');
    const t = textos();
    $$('[data-t]').forEach((e) => { if (e.textContent !== String(t[e.dataset.t])) e.textContent = t[e.dataset.t]; });
    $$('[data-acao="rir"]').forEach((e) => e.setAttribute('aria-pressed', String(Number(e.dataset.v) === S.rir)));
    $$('[data-meta-rir]').forEach((e) => e.toggleAttribute('data-na-meta', Number(e.dataset.v) >= x0.rir[0] && Number(e.dataset.v) <= Math.min(x0.rir[1], 4)));
    $$('[data-acao="modo"]').forEach((e) => e.setAttribute('aria-pressed', String(e.dataset.v === S.modo)));
    $$('.so-serie [data-acao="feita"]').forEach((e) => { e.disabled = S.rir === null && !ultimaSerie(); });
    $$('.so-serie .placar, .so-serie .rir').forEach((e) => { e.hidden = ultimaSerie(); });
    $$('[data-acao="carga-menos"]').forEach((e) => { e.disabled = S.cargaI === 0; });
    $$('[data-acao="carga-mais"]').forEach((e) => { e.disabled = S.cargaI === D.cargas.length - 1; });
    $$('[data-progresso]').forEach((e) => e.style.setProperty('--p', S.total ? String(1 - S.resto / S.total) : '0'));
    $$('[data-pausa-icone]').forEach((e) => { e.dataset.icone = S.pausado ? 'play' : 'pause'; });
    $$('[data-legenda]').forEach((e) => { const h = legenda(); if (e.dataset.h !== h) { e.innerHTML = h; e.dataset.h = h; } });
    $$('.salva').forEach((e) => { e.hidden = S.feitas.length === 0; });
    listas(t);
    pintarFolha();
    icones(document);
  }

  // --- o Boneco animado: os quadros do motor, no tempo do motor ---
  const inicio = performance.now();
  let ultimoQuadro = -1, modoPintado = '';
  function quadro(agora) {
    const g = B.guia[S.modo];
    const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches || parado || S.pausado;
    const fr = reduz ? (ultimoQuadro >= 0 && !parado && modoPintado === S.modo ? ultimoQuadro : Math.floor(g.quadros.length * 0.3)) : Math.min(g.quadros.length - 1, Math.floor(((Math.max(0, agora - inicio) / 1000) % g.T) / g.T * g.quadros.length));
    if ((fr !== ultimoQuadro || modoPintado !== S.modo) && S.tela === 'treino' && S.vista === 'serie') {
      const q = g.quadros[fr];
      for (const p of $$('[data-palco]')) {
        p.innerHTML = svg(q);
        const fase = p.parentElement.querySelector('[data-fase-do-movimento]');
        if (fase) fase.textContent = q.f;
      }
      ultimoQuadro = fr;
      modoPintado = S.modo;
    }
    requestAnimationFrame(quadro);
  }

  // --- o descanso ---
  let relogio = null;
  function descansar() {
    S.descansando = true;
    S.vista = 'relogio';
    S.acabou = false;
    S.total = S.resto = x0.descansoSeg;
    clearInterval(relogio);
    if (!parado) relogio = setInterval(() => { if (S.resto > 0) S.resto -= 1; if (S.resto === 0) S.acabou = true; pintar(); }, 1000);
  }
  function fimDoDescanso() {
    clearInterval(relogio);
    S.descansando = false;
    S.acabou = false;
    S.vista = 'serie';
  }

  const acoes = {
    ir: (e) => { S.tela = e.dataset.v; S.folha = null; if (S.tela === 'fim') S.treinoFeito = true; scrollTo(0, 0); },
    'carga-menos': () => { S.cargaI = Math.max(0, S.cargaI - 1); },
    'carga-mais': () => { S.cargaI = Math.min(D.cargas.length - 1, S.cargaI + 1); },
    'reps-menos': () => { S.reps = Math.max(1, S.reps - 1); },
    'reps-mais': () => { S.reps += 1; },
    rir: (e) => { S.rir = Number(e.dataset.v); },
    feita: () => {
      if (ultimaSerie()) { fimDoDescanso(); S.tela = 'fim'; S.treinoFeito = true; scrollTo(0, 0); return; }
      if (S.rir === null) return;
      S.feitas.push({ n: S.serie, carga: carga(), reps: S.reps, rir: S.rir });
      S.serie += 1;
      if (ultimaSerie()) fimDoDescanso(); else descansar();
    },
    desfazer: () => { const u = S.feitas.pop(); if (u) { S.serie = u.n; fimDoDescanso(); } },
    mais15: () => { S.resto += 15; S.total = Math.max(S.total, S.resto); S.acabou = false; },
    menos15: () => { S.resto = Math.max(0, S.resto - 15); if (S.resto === 0) S.acabou = true; },
    'ver-serie': () => { S.vista = 'serie'; },
    'ver-relogio': () => { S.vista = 'relogio'; },
    modo: (e) => { S.modo = e.dataset.v; },
    pausar: () => { S.pausado = !S.pausado; },
    folha: (e) => { S.folha = e.dataset.v; S.folhaItem = Number(e.dataset.item ?? 0); },
    fechar: () => { S.folha = null; },
    'hoje-foi': (e) => { S.hojeFoi = S.hojeFoi === e.dataset.v2 ? null : e.dataset.v2; },
    tema: () => {
      const r = document.documentElement;
      const escuro = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      r.dataset.theme = escuro ? 'light' : 'dark';
    },
  };
  document.addEventListener('click', (ev) => {
    if (ev.target.id === 'veu') { S.folha = null; pintar(); return; }
    const e = ev.target.closest('[data-acao]');
    if (!e || e.disabled) return;
    acoes[e.dataset.acao]?.(e);
    pintar();
  });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && S.folha) { S.folha = null; pintar(); } });

  // estado inicial pelo endereço, para abrir direto numa tela: #treino, #descanso, #acabou, #fim, #semana
  const ir = () => {
    const h = location.hash.slice(1);
    if (['inicio', 'treino', 'fim', 'semana'].includes(h)) S.tela = h;
    if (h === 'descanso' || h === 'acabou') { S.tela = 'treino'; if (!S.descansando) { S.rir = 3; acoes.feita(); } if (h === 'acabou') { S.resto = 0; S.acabou = true; } }
    if (S.tela === 'fim') S.treinoFeito = true;
    pintar();
  };
  addEventListener('hashchange', ir);
  minis(document);
  ir();
  requestAnimationFrame(quadro);
})();
