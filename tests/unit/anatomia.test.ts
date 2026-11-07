import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { CARTOES, CONTEUDO } from '../../src/conteudo';
import { AJUDANTES, doDesenho, doTexto, ehMusculo } from '../../scripts/auditoria/anatomia-regras';

// Revisão de anatomia (docs/revisoes/anatomia.md, 02/11/2026): os músculos de cada exercício, decididos item a item
// pelo Gustavo. O secundário conta meia série (volume.serie-indireta.peso), então cada regra aqui muda o volume.

describe('músculos da biblioteca (revisão de anatomia)', () => {
  it('achado 1: extensão de quadril com o joelho dobrado não conta os posteriores', () => {
    // Plotkin 2023 (PMID 37877099; um estudo): no hip thrust os posteriores quase não cresceram. A ponte e os coices
    // têm o joelho dobrado como o hip thrust (os coices, por analogia: opinião aprovada pelo Gustavo).
    const extensao = BIBLIOTECA.filter((e) => e.padrao === 'extensao-quadril');
    expect(extensao.map((e) => e.id).sort()).toEqual(['coice-caneleira', 'coice-elastico', 'coice-maquina', 'coice-polia', 'hip-thrust', 'ponte-gluteo', 'ponte-gluteo-halter', 'ponte-kettlebell', 'ponte-pes-bola']);
    for (const e of extensao) {
      expect(e.musculos.primarios, e.id).not.toContain('posteriores');
      expect(e.musculos.secundarios, e.id).not.toContain('posteriores');
    }
  });

  it('achado 5: os crucifixos invertidos não contam costas; o face pull, que junta as escápulas, conta', () => {
    // Abrir os braços para trás (abdução horizontal) é do deltoide posterior e do infraespinal (Schoenfeld 2013,
    // PMID 23302754, EMG); o meio das costas só entra quando a técnica junta as escápulas, e o cartão do crucifixo
    // inverso pede o contrário. O face pull pede "entre as escápulas".
    const posterior = BIBLIOTECA.filter((e) => e.padrao === 'isolador-ombro-posterior');
    for (const e of posterior) {
      if (e.id.startsWith('face-pull')) expect(e.musculos.secundarios, e.id).toContain('costas');
      else expect(e.musculos.secundarios, e.id).not.toContain('costas');
    }
    expect(posterior.filter((e) => !e.id.startsWith('face-pull')).map((e) => e.id).sort()).toEqual(['abertura-elastico', 'abertura-t-deitado', 'crucifixo-inverso', 'crucifixo-invertido-caneleira', 'crucifixo-invertido-curvado', 'crucifixo-invertido-polia', 'crucifixo-invertido-sentado', 'voador-invertido', 'yt-suspensao']);
  });

  it('achado 6: todo agachar e todo afundo contam os adutores como secundário', () => {
    // Kubo 2019 (PMID 31230110), Plotkin 2023 e Kinoshita 2026 (PMID 41630124; leg press): os adutores cresceram
    // nos exercícios de agachar (um estudo cada). Os adutores não têm meta: muda a conta mostrada, não o treino.
    for (const e of BIBLIOTECA.filter((x) => x.padrao === 'agachar' || x.padrao === 'afundo'))
      expect([...e.musculos.primarios, ...e.musculos.secundarios], e.id).toContain('adutores');
  });
});

// Os textos lidos pelas mesmas palavras-chave da tabela (scripts/auditoria/anatomia-regras.ts).
const comGuia = BIBLIOTECA.filter((e) => e.animacaoId && CONTEUDO[e.animacaoId]);

describe('textos × biblioteca (revisão de anatomia)', () => {
  it('todo guia e todo cartão citam o músculo principal no target', () => {
    for (const e of comGuia) for (const m of e.musculos.primarios) expect(doTexto(CONTEUDO[e.animacaoId!]!.target), e.id).toContain(m);
    for (const [id, c] of Object.entries(CARTOES))
      for (const m of BIBLIOTECA.find((e) => e.id === id)!.musculos.primarios) expect(doTexto(c.target), id).toContain(m);
  });

  it('achado 13: todo guia cita os secundários que a biblioteca conta, no target ou no feel', () => {
    for (const e of comGuia) {
      const t = CONTEUDO[e.animacaoId!]!;
      const citados = new Set([...doTexto(t.target), ...doTexto(t.feel)]);
      for (const m of e.musculos.secundarios) expect(citados, `${e.id}: ${m}`).toContain(m);
    }
  });

  it('achado 4: o desenvolvimento ensina a frente do ombro como principal e a lateral como ajuda, como a biblioteca conta', () => {
    // Campos 2020 (PMID 33312291, EMG): a lateral trabalha no desenvolvimento, mas não há ensaio de crescimento.
    const t = CONTEUDO.desenvolvimento!;
    expect(t.target).toBe('Deltoide anterior (frente do ombro); a lateral do ombro ajuda');
    expect(t.feel).toMatch(/^Frente do ombro\. A lateral do ombro/);
    for (const e of BIBLIOTECA.filter((x) => x.padrao === 'empurrar-v')) {
      expect(e.musculos.primarios, e.id).toEqual(['ombro_anterior']);
      expect(e.musculos.secundarios, e.id).toContain('ombro_lateral');
    }
  });

  it('achado 10: o cartão da hiperextensão diz que a lombar trabalha (sem contar no volume)', () => {
    // Andersen 2021 (PMID 33948095, EMG): na hiperextensão a 45°, a lombar trabalhou tanto quanto no stiff.
    expect(CARTOES.hiperextensao!.target).toMatch(/lombar/);
    expect(BIBLIOTECA.find((e) => e.id === 'hiperextensao')!.musculos).toEqual({ primarios: ['gluteos', 'posteriores'], secundarios: [] });
  });
});

describe('desenho do boneco × biblioteca (revisão de anatomia)', () => {
  it('achados 2 e 4: o principal do desenho é o principal da biblioteca, nem mais nem menos', () => {
    for (const e of BIBLIOTECA.filter((x) => x.animacaoId)) {
      const d = doDesenho(e.animacaoId!);
      expect([...d.p].filter(ehMusculo).sort(), e.id).toEqual([...e.musculos.primarios].sort());
    }
  });

  it('achado 6: todo secundário da biblioteca aparece no desenho', () => {
    for (const e of BIBLIOTECA.filter((x) => x.animacaoId)) {
      const d = doDesenho(e.animacaoId!);
      for (const m of e.musculos.secundarios) expect([...d.p, ...d.s], `${e.id}: ${m}`).toContain(m);
    }
  });

  it('achado 8: o desenho só mostra músculo contado que a biblioteca lista, ou um ajudante da lista', () => {
    for (const e of BIBLIOTECA.filter((x) => x.animacaoId)) {
      const d = doDesenho(e.animacaoId!);
      const conta = new Set<string>([...e.musculos.primarios, ...e.musculos.secundarios, ...(AJUDANTES[e.id] ?? [])]);
      for (const m of [...d.p, ...d.s].filter(ehMusculo)) expect(conta, `${e.id}: ${m}`).toContain(m);
    }
  });

  it('achado 3: as elevações laterais não realçam o trapézio superior', () => {
    for (const id of ['elevacao-halteres', 'elevacao-lateral']) {
      const d = doDesenho(id);
      expect([...d.p, ...d.s], id).not.toContain('trapézio superior');
    }
  });
});

describe('fichas de técnica (revisão de anatomia)', () => {
  it('achado 7: os músculos das 9 fichas do lote 1 e da auditoria têm selo', () => {
    const FICHAS = ['ponte-gluteo', 'ponte-gluteo-halter', 'crucifixo-halteres', 'crucifixo-inverso', 'crucifixo-invertido-caneleira', 'crucifixo-invertido-curvado', 'cadeira-extensora', 'cadeira-flexora', 'remada-curvada-halteres', 'supino-chao-halteres'];
    for (const id of FICHAS) {
      const md = readFileSync(`docs/pesquisa/animacoes/${id}.md`, 'utf8');
      const secao = md.split('## Músculos')[1]!.split('\n## ')[0]!;
      expect(secao, id).toMatch(/\*\*(robusta|moderada|um estudo|consenso)\*\*/i);
    }
  });
});

