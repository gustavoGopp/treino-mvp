import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { APROVADOS, EM_REVISAO, ESPERAM_A_LIGACAO } from '../../src/engine/novo/aprovados';
import { EXERCICIOS } from '../../src/engine/novo/app';
import { cssDoBoneco } from '../../src/engine/novo/boneco';
import { enquadramentoCalculado, fichaDoMotorNovo, miniaturaDoMotorNovo, previaDoMotorNovo, quadroDoMotorNovo, vistasDoGuia } from '../../src/engine/novo/ponte';
import CATALOGO from '../../src/engine/novo/dados/catalogo-do-guia.json';
import { usarPreparoGuardado } from '../../src/engine/novo/preparo';
import type { Preparo } from '../../src/engine/novo/preparo';
import { NOME_DA_VISTA } from '../../src/engine/novo/vistas';

// A ponte entre o motor novo e as telas (src/engine/novo/ponte.ts): o app só usa o motor novo para os exercícios
// refeitos e aprovados pelo Gustavo, e a resposta tem de ter o mesmo formato da do motor de hoje.

const conteudo = (id: string) => JSON.parse(readFileSync(`src/conteudo/exercicios/${id}.json`, 'utf8')) as { errors: { id: string; title: string }[] };

describe('motor novo: a ponte com as telas', () => {
  it('todo exercício aprovado existe no motor novo, num arquivo com o nome do id (é por ele que o app carrega)', () => {
    const arquivos = new Set(readdirSync('src/engine/novo/exercicios').map((a) => a.replace(/\.ts$/, '')));
    for (const id of Object.keys(APROVADOS)) {
      expect(EXERCICIOS[id], id).toBeDefined();
      expect(arquivos.has(id), id).toBe(true);
    }
  });

  it('os erros de cada animação nova têm os títulos do texto do app, na mesma ordem (o guia escolhe o erro pelo índice)', () => {
    // exceção conhecida: a panturrilha no degrau não desenha o erro de ritmo "Quicar embaixo" (o guia mostra o
    // movimento certo nesse erro); os outros erros dela seguem a ordem do app
    // "Carga pesada demais", do crucifixo inverso, "Balançar a perna", da abdução em pé, "Chutar com embalo", do coice com
    // elástico, "Soltar a volta", dos supinos na polia, e "Quicar a barra" (no peito e no smith):
    // o cartão só descreve o ritmo; "Esquecer a trava", do agachamento no smith, não muda a pose; "Parar longe da falha", da extensão com mini band e das três caneleiras, e "Não
    // testar o ponto alto", do tríceps no elástico alto, não têm nada visível (a proposta
    // de desenhar o erro de ritmo espera o Gustavo: docs/revisoes/animacoes-restantes/plano.md, seção 5)
    const SEM_DESENHO: Record<string, string[]> = { 'panturrilha-degrau': ['Quicar embaixo'], 'crucifixo-inverso': ['Carga pesada demais'], 'abducao-elastico': ['Balançar a perna'], 'coice-elastico': ['Chutar com embalo'], 'extensao-joelho-mini-band': ['Parar longe da falha'], 'triceps-elastico-alto': ['Não testar o ponto alto'], 'elevacao-lateral-caneleira': ['Parar longe da falha'], 'coice-caneleira': ['Parar longe da falha'], 'crucifixo-invertido-caneleira': ['Parar longe da falha'], 'supino-polia': ['Soltar a volta'], 'supino-inclinado-polia': ['Soltar a volta'], 'supino-barra': ['Quicar a barra no peito'], 'supino-smith': ['Quicar a barra'], 'agachamento-smith': ['Esquecer a trava'], 'mesa-flexora': ['Volta solta'], 'coice-maquina': ['Soltar a volta'], 'panturrilha-leg-press': ['Quicar embaixo'], 'panturrilha-em-pe-maquina': ['Quicar'], hiperextensao: ['Embalar'], 'abducao-polia': ['Embalar a perna'] };
    for (const [id, ex] of Object.entries(EXERCICIOS)) {
      const doApp = conteudo(id)
        .errors.map((e) => e.title)
        .filter((t) => !(SEM_DESENHO[id] ?? []).includes(t));
      expect(
        ex.ficha.erros.map((e) => e.titulo),
        id,
      ).toEqual(doApp);
    }
  });

  it('a ficha, o quadro e a miniatura saem no formato que as telas esperam', () => {
    const ex = EXERCICIOS.bulgaro!;
    const f = fichaDoMotorNovo(ex);
    expect(f.id).toBe('bulgaro');
    expect(f.views).toEqual(ex.vistas);
    expect(f.seq.map((s) => s.kind)).toEqual(['hold', 'ecc', 'hold', 'conc']);
    expect(f.T).toBeCloseTo(4.5, 5);
    expect(f.errors).toHaveLength(conteudo('bulgaro').errors.length);
    expect(f.instantesErro.every((t) => t >= 0 && t <= f.T)).toBe(true);
    expect(f.views).toContain(f.vistaMiniatura);
    const q = quadroDoMotorNovo(ex, 'lateral', 'tec', 1, 0, '', 'claro');
    expect(q.classe).toBe('novo boneco cinza');
    expect(q.viewBox.split(' ')).toHaveLength(4);
    expect(q.html).toContain('<path');
    expect(q.html).not.toContain('<svg');
    expect(q.fase.label).toBe('Descida · excêntrica');
    // a mesma entrada dá a mesma saída
    expect(quadroDoMotorNovo(ex, 'lateral', 'tec', 1, 0, '', 'claro').html).toBe(q.html);
    // o erro é achado pelo título do app; no tema escuro, a classe muda
    const erro = conteudo('bulgaro').errors[1]!;
    const qe = quadroDoMotorNovo(ex, 'lateral', 'err', f.instantesErro[1]!, 1, erro.title, 'escuro');
    expect(qe.classe).toBe('novo boneco cinza escuro');
    expect(qe.html).toContain(erro.title.split(' ')[0]!);
    const m = miniaturaDoMotorNovo(ex);
    expect(m.classe).toContain('mini');
    // a proporção do palco e da miniatura do app é 4:3
    for (const vb of [q.viewBox, m.viewBox]) {
      const [, , w, h] = vb.split(' ').map(Number);
      expect(w! / h!).toBeCloseTo(4 / 3, 1);
    }
  });

  it('toda vista usada pelas animações novas tem nome para o botão do guia', () => {
    for (const ex of Object.values(EXERCICIOS)) for (const v of ex.vistas) expect(v in NOME_DA_VISTA, `${ex.ficha.id}: ${v}`).toBe(true);
  });

  // Desde 16/11/2026 o motor novo é o único do app: toda animação tem de estar aprovada, e o catálogo do guia (os dias
  // do programa de referência e a ordem da lista) tem de falar das mesmas animações. A exceção (17/11/2026) são as
  // animações novas dos exercícios que ainda são cartão de texto: aprovadas, mas fora do catálogo até a ligação com a
  // biblioteca (ESPERAM_A_LIGACAO), que muda o treino gerado e espera o ok do Gustavo.
  it('todas as animações estão aprovadas e no catálogo do guia, sem sobra de um lado nem do outro', () => {
    const ids = Object.keys(EXERCICIOS).sort();
    // as que estão em revisão (para o Gustavo ver ou em correção) ainda não estão aprovadas, e as duas listas não se cruzam
    const emRevisao = Object.keys(EM_REVISAO);
    for (const id of emRevisao) expect(APROVADOS[id], id).toBeUndefined();
    expect([...Object.keys(APROVADOS), ...emRevisao].sort()).toEqual(ids);
    expect(new Set(ESPERAM_A_LIGACAO).size).toBe(ESPERAM_A_LIGACAO.length);
    for (const id of ESPERAM_A_LIGACAO) {
      expect(ids, id).toContain(id);
      expect(BIBLIOTECA.some((e) => e.animacaoId === id), `${id} já está ligado na biblioteca`).toBe(false);
    }
    expect([...CATALOGO.todos].sort()).toEqual(ids.filter((id) => !ESPERAM_A_LIGACAO.includes(id) && !emRevisao.includes(id)));
    expect(new Set(CATALOGO.todos).size).toBe(CATALOGO.todos.length);
    for (const d of CATALOGO.dias) for (const id of d.ids) expect(ids, `${d.nome}: ${id}`).toContain(id);
  });

  it('o desenho cor de pele sai com a classe dele, e a legenda do guia usa as cores desse desenho', () => {
    const ex = EXERCICIOS.goblet!;
    const f = fichaDoMotorNovo(ex);
    expect(quadroDoMotorNovo(ex, f.vistaMovimento, 'mus', 0, 0, '', 'claro', 'pele').classe).toContain('pele');
    expect(quadroDoMotorNovo(ex, f.vistaMovimento, 'mus', 0, 0, '', 'claro', 'cinza').classe).toContain('cinza');
    // uma preferência antiga guardada ('a', 'b', 'atual') vale o padrão
    expect(quadroDoMotorNovo(ex, f.vistaMovimento, 'mus', 0, 0, '', 'claro', 'b').classe).toContain('cinza');
    expect(miniaturaDoMotorNovo(ex, 'claro', 'pele').classe).toContain('pele');
    expect(previaDoMotorNovo(ex, 'pele').classe).toContain('pele');
    // o mesmo quadro nos dois desenhos: o corpo não muda de lugar quando a pessoa troca
    expect(quadroDoMotorNovo(ex, f.vistaMovimento, 'tec', 0, 0, '', 'claro', 'pele').viewBox).toBe(quadroDoMotorNovo(ex, f.vistaMovimento, 'tec', 0, 0, '', 'claro', 'cinza').viewBox);
    const cor = (nome: string) => new RegExp(`\\.boneco\\.pele\\{[^}]*--b-${nome}:(#[0-9a-f]{6})`).exec(cssDoBoneco())![1]!;
    const css = readFileSync('src/styles.css', 'utf8');
    expect(css).toContain(`.legend.pele{--m-p:${cor('musP')};--m-s:${cor('musS')};--m-borda:${cor('musPb')};--ea-pele:${cor('pele')}}`);
    expect(css).toContain(`.legend.pele .sw.listras{background:repeating-linear-gradient(45deg,${cor('musA')} 0 2px`);
  });

  // O quadro de cada vista e as calibrações demoradas vêm calculados de antemão, num arquivo por exercício, para o guia
  // abrir sem esperar (node scripts/animacao-nova/preparo.mjs). A conferência completa, número por número, roda no
  // navegador (tests/motor/motor-novo.spec.ts); aqui, o que dá para ver depressa: nenhuma animação ficou sem arquivo
  // e, em três delas, o guardado é o que o motor calcula (no Node a última casa decimal pode diferir da do navegador).
  it('toda animação tem o seu arquivo do que vem calculado de antemão, e o guardado é o que o motor calcula', () => {
    const guardado = (id: string) => JSON.parse(readFileSync(`src/engine/novo/dados/preparo/${id}.json`, 'utf8')) as Preparo;
    const arquivos = readdirSync('src/engine/novo/dados/preparo')
      .filter((a) => a.endsWith('.json'))
      .map((a) => a.replace(/\.json$/, ''));
    expect(arquivos.sort()).toEqual(Object.keys(EXERCICIOS).sort());
    for (const id of Object.keys(APROVADOS)) {
      const g = guardado(id).enquadramento;
      for (const v of vistasDoGuia(EXERCICIOS[id]!)) expect(g.quadros[v], `${id}: ${v}`).toHaveLength(4);
      expect(g.mini, id).toHaveLength(4);
      expect(Object.keys(g.caixas).length, id).toBe(Object.keys(g.quadros).length + 1);
    }
    usarPreparoGuardado(false);
    try {
      for (const id of ['goblet', 'flexao', 'rosca-martelo']) {
        const calculado = enquadramentoCalculado(EXERCICIOS[id]!);
        const g = guardado(id).enquadramento;
        expect(calculado.vistaMiniatura, id).toBe(g.vistaMiniatura);
        for (const [v, vb] of Object.entries(calculado.quadros)) vb.forEach((n, i) => expect(n, `${id}: ${v}`).toBeCloseTo(g.quadros[v]![i]!, 6));
        for (const [k, c] of Object.entries(calculado.caixas)) c.forEach((n, i) => expect(n, `${id}: ${k}`).toBeCloseTo(g.caixas[k]![i]!, 6));
      }
    } finally {
      usarPreparoGuardado(true);
    }
  });

  it('o CSS do Boneco que o app carrega é o que o motor gera (node scripts/animacao-nova/css-do-boneco.mjs)', () => {
    expect(readFileSync('src/engine/novo/boneco.gerado.css', 'utf8').split('\n').slice(1).join('\n')).toBe(cssDoBoneco());
  });
});
