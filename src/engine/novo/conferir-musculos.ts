// Motor novo: a conferência dos músculos (bloco A). Três perguntas, respondidas com medida:
// 1) cada forma do desenho está na parte do corpo em que o músculo fica, entre a origem e a inserção da tabela?
// 2) quem cobre quem na pintura segue a camada declarada? e as pontas das formas ficam onde a fonte diz?
// 3) o músculo realçado em cada animação é o do conteúdo do app (principal e secundário)?
import dados from './dados/boneco.json';
import type { ItemConferido } from './conferir';
import { resolverTronco } from './esqueleto';
import type { Exercicio } from './movimento';
import { MUSCULOS } from './tabelas';
import type { Corpo } from './tabelas';

interface Desenhado {
  id: string;
  em: string;
  pts: [number, number | string][];
}
const VISTAS_DO_DESENHO = dados.musculos as unknown as Record<'lado' | 'frente' | 'costas', Desenhado[]>;
const NOME_DA_VISTA = { lado: 'de lado', frente: 'de frente', costas: 'de costas' };
const CADEIAS = [
  ['tronco', 'braco', 'ante', 'mao'],
  ['tronco', 'pelve', 'coxa', 'canela', 'pe'],
];
const f1 = (x: number) => (Math.round(x * 10) / 10).toString().replace('.', ',');
/** O que não é músculo no desenho (a rótula): fica fora desta conferência. */
const NAO_E_MUSCULO = new Set(['patela']);

/** A conferência do desenho dos músculos contra a tabela (não depende da animação). */
export function conferirDesenhoDosMusculos(corpo: Corpo): ItemConferido[] {
  const itens: ItemConferido[] = [];
  const G = MUSCULOS.grupos;
  const semLinha = new Set<string>(),
    foraDoLugar: string[] = [],
    foraDaCadeia: string[] = [],
    ordem: string[] = [];
  for (const [vista, lista] of Object.entries(VISTAS_DO_DESENHO) as ['lado' | 'frente' | 'costas', Desenhado[]][]) {
    lista.forEach((mu, i) => {
      if (NAO_E_MUSCULO.has(mu.id)) return;
      const g = G[mu.id];
      if (!g) return void semLinha.add(mu.id);
      // 'abs' = desenhado em coordenadas do corpo em pé, sobre o tronco ou a bacia
      const certo = mu.em === 'abs' ? g.ventre === 'tronco' || g.ventre === 'pelve' : mu.em === g.ventre;
      if (!certo) foraDoLugar.push(`${mu.id} (${NOME_DA_VISTA[vista]}): desenhado em "${mu.em}", a tabela diz "${g.ventre}"`);
      for (const coberto of g.cobre) {
        const j = lista.findIndex((x) => x.id === coberto);
        if (j > i && lista[j]!.em === mu.em) ordem.push(`${mu.id} cobre ${coberto}, mas é pintado antes (${NOME_DA_VISTA[vista]})`);
      }
    });
  }
  for (const [id, g] of Object.entries(G)) {
    const cadeia = CADEIAS.find((c) => c.includes(g.origem.osso) && c.includes(g.insercao.osso) && c.includes(g.ventre));
    const entre = cadeia && (cadeia.indexOf(g.ventre) - cadeia.indexOf(g.origem.osso)) * (cadeia.indexOf(g.ventre) - cadeia.indexOf(g.insercao.osso)) <= 0;
    if (!entre) foraDaCadeia.push(`${id}: ${g.origem.osso} → ${g.insercao.osso}, com a massa em ${g.ventre}`);
  }
  const desenhados = new Set(Object.values(VISTAS_DO_DESENHO).flatMap((l) => l.map((m) => m.id)).filter((id) => !NAO_E_MUSCULO.has(id)));
  itens.push({ grupo: 'Músculos', oQue: 'cada forma do desenho tem a sua linha na tabela (origem, inserção, camada, fonte)', medido: semLinha.size ? `sem linha: ${[...semLinha].join(', ')}` : `${desenhados.size} formas, todas com linha`, limite: 'nenhuma forma sem linha', nivel: semLinha.size ? 'falha' : 'ok' });
  itens.push({ grupo: 'Músculos', oQue: 'a forma está na parte do corpo em que a massa do músculo fica', medido: foraDoLugar.length ? foraDoLugar.join('; ') : 'todas no lugar', limite: 'a parte do desenho = a parte da tabela', nivel: foraDoLugar.length ? 'falha' : 'ok' });
  itens.push({ grupo: 'Músculos', oQue: 'a massa do músculo fica entre o osso da origem e o da inserção', medido: foraDaCadeia.length ? foraDaCadeia.join('; ') : 'todas entre a origem e a inserção', limite: 'na ordem dos ossos (tronco, braço, antebraço, mão; tronco, bacia, coxa, perna, pé)', nivel: foraDaCadeia.length ? 'falha' : 'ok' });
  itens.push({ grupo: 'Músculos', oQue: 'quem cobre quem na pintura segue a camada da tabela', medido: ordem.length ? ordem.join('; ') : 'a ordem de pintura segue a tabela', limite: 'o músculo que cobre é pintado depois', nivel: ordem.length ? 'aviso' : 'ok' });

  // ----- as pontas das formas contra os pontos de referência que a fonte dá -----
  const extremos = (vista: 'lado' | 'frente' | 'costas', id: string, col: 0 | 1) => {
    const v = (VISTAS_DO_DESENHO[vista].find((m) => m.id === id)?.pts ?? []).map((p) => p[col]).filter((x): x is number => typeof x === 'number');
    return { min: Math.min(...v), max: Math.max(...v) };
  };
  const t0 = resolverTronco(corpo, { pelve: [0, corpo.m('altura.trocanter'), 0] });
  const yT12 = t0.nos[t0.iT12]!.ref.o[1];
  const marco = (oQue: string, medido: number, esperado: number, tol: number, un: string, fonte: string, texto = ''): ItemConferido => ({
    grupo: 'Músculos',
    oQue,
    medido: `${f1(medido)} ${un}${texto}`,
    limite: `${f1(esperado)} ${un}, com folga de ${f1(tol)} (${fonte})`,
    nivel: Math.abs(medido - esperado) <= tol ? 'ok' : 'aviso',
  });
  const delt = extremos('lado', 'deltoide', 0).max;
  itens.push(marco('deltoide: onde a ponta de baixo chega no braço (0 = ombro, 1 = cotovelo)', delt, 0.5, 0.1, 'do braço', 'Gray: a tuberosidade deltóidea fica no meio do úmero'));
  const trap = extremos('costas', 'trapezio', 1).min;
  itens.push(marco('trapézio: altura da ponta de baixo, em pé', trap, yT12, 3, 'cm', 'Gray: a ponta de baixo corresponde à 12ª vértebra torácica', ` (${f1(trap - yT12)} cm em relação a T12)`));
  const dors = extremos('costas', 'dorsal', 1).min;
  itens.push(marco('grande dorsal: altura da borda de baixo, em pé', dors, corpo.m('altura.cristaIliaca'), 3, 'cm', 'Gray: origem na crista ilíaca; altura da crista no ANSUR II'));
  const quad = extremos('lado', 'quadriceps', 0).max;
  itens.push(marco('quadríceps: até onde desce na coxa (1 = joelho)', quad, 1, 0.1, 'da coxa', 'Gray: insere-se na patela'));
  const abd = extremos('frente', 'abdomen', 1).min;
  itens.push({ grupo: 'Músculos', oQue: 'reto abdominal: altura da borda de baixo, em pé', medido: `${f1(abd)} cm (a cintura fica a ${f1(corpo.m('altura.cintura'))} cm e a virilha a ${f1(corpo.m('altura.virilha'))} cm)`, limite: 'Gray: a origem é na crista do púbis, abaixo da cintura; a tabela do corpo não tem a altura do púbis', nivel: abd > corpo.m('altura.cintura') - 6 ? 'aviso' : 'ok' });
  return itens;
}

/**
 * O músculo realçado é o do conteúdo? `conteudo` vem da biblioteca do app (src/domain/biblioteca/exercicios.json),
 * lida por quem chama: o motor não importa o domínio.
 */
export function conferirPapeis(ex: Exercicio, conteudo: { primarios: string[]; secundarios: string[] }): ItemConferido[] {
  const G = MUSCULOS.grupos;
  const problemas: string[] = [],
    notas: string[] = [];
  const pintados = Object.entries(ex.papeis).map(([chave, papel]) => ({ id: chave.split(':')[0]!, papel }));
  for (const { id, papel } of pintados) {
    const g = G[id];
    if (!g) {
      problemas.push(`"${id}" não está na tabela dos músculos`);
      continue;
    }
    const ePrimario = g.conteudo.some((c) => conteudo.primarios.includes(c)),
      eSecundario = g.conteudo.some((c) => conteudo.secundarios.includes(c));
    if (papel === 'p' && !ePrimario) problemas.push(`${g.nome} aparece como principal, e o conteúdo não o tem como principal`);
    if (papel === 's' && !eSecundario && !ePrimario) problemas.push(`${g.nome} aparece como secundário, e o conteúdo não o lista`);
    if (papel === 's' && !eSecundario && ePrimario) notas.push(`${g.nome} aparece como secundário dentro de um grupo que o conteúdo conta como principal (${g.conteudo.join(', ')})`);
    if (papel === 'a' && !eSecundario && !ePrimario) notas.push(`${g.nome} aparece como "só ajuda a firmar", fora da lista do conteúdo`);
    if (g.naoSepara && g.conteudo.length > 1) notas.push(`${g.nome}: o conteúdo pede ${g.conteudo.filter((c) => [...conteudo.primarios, ...conteudo.secundarios].includes(c)).join(', ')}, e o desenho só tem o músculo inteiro`);
  }
  const tem = (grupo: string, papeis: string[]) => pintados.some((p) => papeis.includes(p.papel) && G[p.id]?.conteudo.includes(grupo));
  for (const c of conteudo.primarios) if (!tem(c, ['p'])) problemas.push(`o principal do conteúdo "${c}" não está realçado como principal`);
  for (const c of conteudo.secundarios) if (!tem(c, ['s', 'p'])) problemas.push(`o secundário do conteúdo "${c}" não está realçado`);
  return [
    { grupo: 'Músculos', oQue: `o realçado é o do conteúdo (principal: ${conteudo.primarios.join(', ')}; secundário: ${conteudo.secundarios.join(', ') || 'nenhum'})`, medido: problemas.length ? problemas.join('; ') : 'principal e secundário batem com o conteúdo', limite: 'nenhuma diferença', nivel: problemas.length ? 'falha' : 'ok' },
    ...(notas.length ? [{ grupo: 'Músculos', oQue: 'diferenças aceitas, a confirmar com o Gustavo', medido: notas.join('; '), limite: 'cada uma precisa do ok dele', nivel: 'aviso' as const }] : []),
  ];
}
