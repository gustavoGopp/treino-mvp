// Protótipos do frontend novo (12/11/2026): o comportamento comum às três direções.
// Cada direção traz a sua própria marcação e o seu CSS; aqui ficam os dados (a Ana, do gerador real), o Boneco (do
// motor, sem mudança) e as ações. A marcação se liga por atributos:
//   data-t="chave"      recebe um texto (veja `textos()`)
//   data-lista="..."    repete o <template> filho para cada item
//   data-mini="id"      recebe a miniatura do Boneco;  data-palco  recebe o Boneco animado
//   data-acao="..."     um toque (veja `acoes`)
// Nada aqui grava nem envia dado: é um protótipo de tela.
(() => {
  const D = window.DADOS, B = window.BONECO, I = window.ICONES;
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const dia = D.dias[0];
  const parado = /[?&]parado/.test(location.search); // capturas: o relógio e o Boneco não andam
  if (/[?&]limpo/.test(location.search)) document.documentElement.classList.add('limpo');

  const S = { tela: 'inicio', fase: 'serie', ex: 0, serie: 1, cargaI: 2, reps: 9, rir: null, feitas: [], resto: 0, total: 0, acabou: false, modo: 'tec', pausado: false, ajuste: null };
  const ex = () => dia.exercicios[S.ex];
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const faixa = (f) => (f[0] === f[1] ? `${f[0]}` : `${f[0]}–${f[1]}`);
  const rx = (x) => `${x.series} × ${faixa(x.reps)}${x.unilateral ? ' cada lado' : ''}`;
  const carga = () => D.cargas[S.cargaI];

  function textos() {
    const x = ex();
    const ultima = S.feitas[S.feitas.length - 1];
    return {
      diaNome: dia.nome,
      nExercicios: dia.exercicios.length,
      minutos: dia.minutos,
      semana: D.semana,
      diasPorSemana: D.diasPorSemana,
      posicao: `${S.ex + 1} de ${dia.exercicios.length}`,
      exNome: x.nome,
      prescricao: rx(x),
      descanso: mmss(x.descansoSeg),
      serie: S.serie,
      series: x.series,
      carga: carga(),
      reps: S.reps,
      rir: S.rir === null ? '?' : S.rir === 4 ? '4+' : S.rir,
      metaRir: faixa(x.rir),
      relogio: mmss(S.resto),
      ultima: ultima ? `${ultima.carga} kg × ${ultima.reps}` : '',
      serieSalva: ultima ? `Série ${ultima.n} salva` : '',
      alvo: D.guia.alvo,
      dica: D.guia.dicas[0],
    };
  }

  const svg = (q) => `<svg viewBox="${q.v}" class="${q.c}" aria-hidden="true">${q.h}</svg>`;
  const icones = (raiz) => $$('[data-icone]', raiz).forEach((e) => { e.innerHTML = I[e.dataset.icone] ?? ''; });
  const minis = (raiz) => $$('[data-mini]', raiz).forEach((e) => { const q = B.mini[e.dataset.mini]; if (q) e.innerHTML = svg(q); });

  function listas() {
    for (const lista of $$('[data-lista]')) {
      const molde = lista.querySelector('template');
      $$(':scope > :not(template)', lista).forEach((e) => e.remove());
      const itens = lista.dataset.lista === 'exercicios' ? dia.exercicios.map((x, i) => ({ n: i + 1, nome: x.nome, prescricao: rx(x), mini: x.animacaoId, atual: i === S.ex })) : lista.dataset.lista === 'series' ? Array.from({ length: ex().series }, (_, i) => ({ n: i + 1, feita: S.feitas[i], atual: i + 1 === S.serie })) : lista.dataset.lista === 'outros-dias' ? D.dias.slice(1).map((d) => ({ nome: d.nome, resumo: `${d.exercicios.length} exercícios · ~${d.minutos} min` })) : [];
      for (const it of itens) {
        const no = molde.content.firstElementChild.cloneNode(true);
        $$('[data-i]', no).forEach((e) => { e.textContent = it[e.dataset.i] ?? ''; });
        $$('[data-mini-i]', no).forEach((e) => { e.dataset.mini = it.mini ?? ''; });
        if (it.atual) no.dataset.atual = '';
        if (it.feita) { no.dataset.feita = ''; $$('[data-i="feita"]', no).forEach((e) => { e.textContent = `${it.feita.carga} kg × ${it.feita.reps}`; }); }
        lista.append(no);
      }
      minis(lista);
      icones(lista);
    }
  }

  function pintar() {
    const b = document.body;
    b.dataset.tela = S.tela;
    b.dataset.fase = S.fase;
    b.toggleAttribute('data-acabou', S.acabou);
    b.toggleAttribute('data-tem-feita', S.feitas.length > 0);
    b.dataset.ajuste = S.ajuste ?? '';
    const t = textos();
    $$('[data-t]').forEach((e) => { e.textContent = t[e.dataset.t]; });
    $$('[data-acao="rir"]').forEach((e) => e.setAttribute('aria-pressed', String(Number(e.dataset.v) === S.rir)));
    $$('[data-meta-rir]').forEach((e) => e.toggleAttribute('data-na-meta', Number(e.dataset.v) >= ex().rir[0] && Number(e.dataset.v) <= Math.min(ex().rir[1], 4)));
    $$('[data-acao="ajuste"]').forEach((e) => { e.setAttribute('aria-expanded', String(e.dataset.v === S.ajuste)); e.classList.toggle('falta', e.dataset.v === 'rir' && S.rir === null); });
    $$('[data-acao="modo"]').forEach((e) => e.setAttribute('aria-pressed', String(e.dataset.v === S.modo)));
    $$('[data-acao="feita"]').forEach((e) => { e.disabled = S.rir === null; });
    $$('[data-acao="carga-menos"]').forEach((e) => { e.disabled = S.cargaI === 0; });
    $$('[data-acao="carga-mais"]').forEach((e) => { e.disabled = S.cargaI === D.cargas.length - 1; });
    $$('[data-progresso]').forEach((e) => e.style.setProperty('--p', S.total ? String(1 - S.resto / S.total) : '0'));
    $$('[data-pausa-icone]').forEach((e) => { e.dataset.icone = S.pausado ? 'play' : 'pause'; });
    icones(document);
    listas();
  }

  // --- o Boneco animado: os quadros do motor, no tempo do motor ---
  let inicio = performance.now(), ultimoQuadro = -1, modoPintado = '';
  function quadro(agora) {
    const g = B.guia[S.modo];
    const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches || parado || S.pausado;
    const fr = reduz ? Math.floor(g.quadros.length * 0.3) : Math.floor((((agora - inicio) / 1000) % g.T) / g.T * g.quadros.length);
    if (fr !== ultimoQuadro || modoPintado !== S.modo) {
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
    S.fase = 'descanso';
    S.acabou = false;
    S.total = S.resto = ex().descansoSeg;
    clearInterval(relogio);
    if (!parado) relogio = setInterval(() => { S.resto = Math.max(0, S.resto - 1); if (S.resto === 0) fimDoDescanso(true); pintar(); }, 1000);
  }
  function fimDoDescanso(acabou) {
    clearInterval(relogio);
    S.fase = 'serie';
    S.acabou = acabou;
  }

  const acoes = {
    'ir-inicio': () => { S.tela = 'inicio'; },
    'ir-treino': () => { S.tela = 'treino'; scrollTo(0, 0); },
    'carga-menos': () => { S.cargaI = Math.max(0, S.cargaI - 1); },
    'carga-mais': () => { S.cargaI = Math.min(D.cargas.length - 1, S.cargaI + 1); },
    'reps-menos': () => { S.reps = Math.max(1, S.reps - 1); },
    'reps-mais': () => { S.reps += 1; },
    rir: (e) => { S.rir = Number(e.dataset.v); if (S.ajuste === 'rir') S.ajuste = null; },
    ajuste: (e) => { S.ajuste = S.ajuste === e.dataset.v ? null : e.dataset.v; },
    feita: () => {
      if (S.rir === null) return;
      S.feitas.push({ n: S.serie, carga: carga(), reps: S.reps, rir: S.rir });
      S.ajuste = null;
      if (S.serie < ex().series) { S.serie += 1; descansar(); } else { fimDoDescanso(false); }
    },
    desfazer: () => { const u = S.feitas.pop(); if (u) { S.serie = u.n; fimDoDescanso(false); } },
    mais15: () => { S.resto += 15; S.total = Math.max(S.total, S.resto); },
    menos15: () => { S.resto = Math.max(0, S.resto - 15); if (S.resto === 0) fimDoDescanso(true); },
    pular: () => fimDoDescanso(false),
    modo: (e) => { S.modo = e.dataset.v; },
    pausar: () => { S.pausado = !S.pausado; },
    tema: () => {
      const r = document.documentElement;
      const escuro = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      r.dataset.theme = escuro ? 'light' : 'dark';
    },
  };
  document.addEventListener('click', (ev) => {
    const e = ev.target.closest('[data-acao]');
    if (!e || e.disabled) return;
    acoes[e.dataset.acao]?.(e);
    pintar();
  });

  // estado inicial pelo endereço, para abrir direto numa tela: #treino, #descanso
  const ir = () => {
    const h = location.hash.slice(1);
    if (h === 'treino' || h === 'descanso') S.tela = 'treino';
    if (h === 'inicio') S.tela = 'inicio';
    if (h === 'descanso' && S.fase !== 'descanso') { S.rir = 3; acoes.feita(); }
    pintar();
  };
  addEventListener('hashchange', ir);
  minis(document);
  ir();
  requestAnimationFrame(quadro);
})();
