import { describe, expect, it } from 'vitest';
import { dorQueSeRepete, dorRepetida, semanaLeveDeHoje } from '../../src/domain/acompanhamento/semana-leve';
import { hojeNoPrograma, opcoesDeHoje, sugestaoDoExercicio, type Sessao } from '../../src/domain/sessao';
import type { Estado } from '../../src/storage/esquema';
import { aceitarSemanaLeve, encerrarSemanaLeve, marcarHojeFoi, recusarSemanaLeve, semanaLeveDoEstado } from '../../src/features/acompanhamento/acoes';
import { anotarDor, iniciarSessao, interromperExercicio, registrarSerie, terminarSessao } from '../../src/features/treino/acoes';
import { bruno } from '../personas';
import { dia, estadoDe, POR_ID, serieTipica, treinar } from './apoio-treino';

// Semana leve sugerida (deload.semana-leve; pesquisa-v2/07, seção 6): os casos S1 a S5 do T6, o toque "hoje foi" e o
// aviso de dor, que soma à semana leve e nunca é substituído por ela.

const DIAS = ['superior-a', 'inferior-a', 'superior-b', 'inferior-b'];
const sugestao = (e: Estado, n: number) =>
  semanaLeveDeHoje(e.programa!.programa, e.historico, dia(n), {
    inventario: () => bruno.inventario,
    localDe: () => 'local-1',
    ...(e.semanaLeve ? { semanaLeve: e.semanaLeve } : {}),
  });
/** Uma semana inteira do Bruno, com a série de cada exercício dada pela semana. */
function semanaDe(e: Estado, w: number, serie = serieTipica, quantas?: (exId: string, prescritas: number) => number) {
  [0, 1, 3, 4].forEach((k, i) => (e = treinar(e, w * 7 + k, DIAS[i]!, 'local-1', serie, quantas)));
  return e;
}
const comHojeFoi = (e: Estado, k: number, v: 'leve' | 'normal' | 'pesado') => marcarHojeFoi(e, e.historico.at(k)!.id, v);

describe('os casos S1 a S5 do T6', () => {
  it('S1: 6 semanas seguidas, nada parado, sem cansaço → não sugere (antes do R2, sugeria por "6 semanas sem pausa")', () => {
    let e = estadoDe(bruno);
    // As repetições sobem 1 por semana (7 a 12): a dupla progressão anda, nada fica parado.
    for (let w = 0; w < 6; w++) e = semanaDe(e, w, (exId) => ({ ...serieTipica(exId), reps: 7 + w }));
    const s = sugestao(e, 6 * 7);
    expect(s.sugerir).toBe(false);
    expect(s.motivos).toEqual([]);
  });

  it('S2: 2 exercícios estagnados → sugere, com o motivo', () => {
    let e = estadoDe(bruno);
    // Desde o pacote 5 (16/11/2026), a janela do "sem melhora" vem do nível (progressao.estagnacao): para o Bruno,
    // intermediário, são 8 sessões do mesmo exercício. Com 3 semanas paradas (a janela de antes, de 3 treinos), nada.
    for (let w = 0; w < 3; w++) e = semanaDe(e, w);
    const antes = sugestao(e, 3 * 7);
    expect(antes.sugerir).toBe(false);
    expect(antes.motivos).toEqual([]);
    // Com 8 semanas, todo exercício do programa tem 8 sessões na mesma carga, sem ganhar repetição.
    for (let w = 3; w < 8; w++) e = semanaDe(e, w);
    const s = sugestao(e, 8 * 7);
    expect(s.sugerir).toBe(true);
    expect(s.motivos[0]).toMatch(/^\d+ exercícios sem progresso em 8 treinos$/);
    expect(s.texto).toMatch(/^Para descansar, não para crescer\./);
    expect(s.regraId).toBe('deload.semana-leve');
  });

  it('S3: "pesado demais" em 2 dos últimos 3 treinos → sugere', () => {
    let e = estadoDe(bruno);
    e = semanaDe(e, 0, (exId) => ({ ...serieTipica(exId), reps: 9 }));
    e = comHojeFoi(comHojeFoi(e, -1, 'pesado'), -3, 'pesado');
    const s = sugestao(e, 5);
    expect(s.sugerir).toBe(true);
    expect(s.motivos).toEqual(['"pesado demais" em 2 dos últimos 3 treinos']);
    // Um "pesado demais" só não basta; um "leve" ou "normal" não conta.
    const f = comHojeFoi(comHojeFoi(e, -1, 'pesado'), -2, 'normal');
    expect(sugestao(f, 5).sugerir).toBe(false);
  });

  it('S4: dor 4/10 no supino em 2 sessões seguidas → sugere a semana leve E mostra o aviso de dor e de avaliação', () => {
    let e = estadoDe(bruno);
    const comDor = (exId: string) => ({ ...serieTipica(exId), reps: 9, ...(exId === 'supino-reto' ? { dor: 4 } : {}) });
    e = treinar(e, 0, 'superior-a', 'local-1', comDor);
    e = treinar(e, 3, 'superior-a', 'local-1', comDor);
    const s = sugestao(e, 4);
    expect(dorQueSeRepete(e.historico)).toEqual(['supino-reto']);
    expect(s.sugerir).toBe(true);
    expect(s.motivos).toEqual(['dor de 3 a 5 no mesmo exercício em 2 treinos seguidos']);
    expect(s.dor).toMatchObject({ exIds: ['supino-reto'], regraId: 'seguranca.dor.escala' });
    expect(s.dor!.texto).toMatch(/procure avaliação profissional/);
    // A dor acima de 5 não é "dor que se repete" para a semana leve: ela já encerra o exercício (seguranca.dor.escala).
    let g = estadoDe(bruno);
    const forte = (exId: string) => ({ ...serieTipica(exId), ...(exId === 'supino-reto' ? { dor: 7 } : {}) });
    g = treinar(treinar(g, 0, 'superior-a', 'local-1', forte), 3, 'superior-a', 'local-1', forte);
    expect(dorQueSeRepete(g.historico)).toEqual([]);
  });

  // Auditoria de 12/11/2026: a dor acima de 5 antes da 1ª série não ficava registrada, e o aviso só lia as séries.
  it('dor 7 antes da 1ª série do supino em 2 treinos seguidos → mostra o aviso de dor e de avaliação, sem sugerir a semana leve', () => {
    let e = estadoDe(bruno);
    const comDorAntes = (est: Estado, n: number) => {
      let s = iniciarSessao(est, dia(n), 'superior-a', 'local-1');
      const i = s.sessaoAtual!.exercicios.findIndex((x) => x.exId === 'supino-reto');
      s = interromperExercicio(anotarDor(s, i, 7).estado, i);
      s.sessaoAtual!.exercicios.forEach((x, k) => {
        if (k !== i) s = registrarSerie(s, k, { ...serieTipica(x.exId), reps: 9 });
      });
      return terminarSessao(s, dia(n, 11));
    };
    e = comDorAntes(e, 0);
    expect(dorRepetida(e.historico)).toEqual([]);
    e = comDorAntes(e, 3);
    expect(dorRepetida(e.historico)).toEqual([{ exId: 'supino-reto', notas: [7, 7] }]);
    const s = sugestao(e, 4);
    expect(s.dor).toMatchObject({ exIds: ['supino-reto'], regraId: 'seguranca.dor.escala' });
    expect(s.dor!.texto).toMatch(/nota acima de 5: use a alternativa e procure avaliação profissional/);
    // acima de 5 não é gatilho da semana leve: o exercício já foi encerrado
    expect(dorQueSeRepete(e.historico)).toEqual([]);
    expect(s.sugerir).toBe(false);
  });

  it('S5: 2 exercícios estagnados na semana 2 depois de uma volta de pausa → não sugere', () => {
    let e = estadoDe(bruno);
    for (let w = 0; w < 2; w++) e = semanaDe(e, w);
    // Volta depois de 3 semanas (bloco novo), parado na mesma carga, com as mesmas 2 séries. Desde o pacote 5
    // (16/11/2026), o "sem melhora" do Bruno (intermediário) pede 8 sessões do mesmo exercício, contadas dentro do bloco.
    // Para isso caber nas 3 semanas da carência, ele treina todos os dias, no rodízio dos 4 treinos: no 16º dia seguido,
    // já na semana 3 do bloco, a puxada (Superior A e B) e o abdominal na polia (Inferior A e B) têm 8 sessões paradas.
    // Com 4 treinos por semana, os dois só chegariam à 8ª sessão no fim da semana 4 do bloco, com a carência já terminada.
    const duas = () => 2;
    const volta = 5 * 7;
    const rodizio = (de: number, ate: number) => {
      for (let n = de; n < ate; n++) e = treinar(e, n, DIAS[(n - volta) % 4]!, 'local-1', serieTipica, duas);
    };
    rodizio(volta, volta + 16);
    const h = hojeNoPrograma(e.programa!.programa, e.historico, dia(7 * 7 + 2));
    expect(h.bloco.pausaDias).toBeDefined();
    expect(h.semana).toBe(3);
    const s = sugestao(e, 7 * 7 + 2);
    expect(s.motivos.length).toBeGreaterThan(0);
    expect(s.carencia).toBe(true);
    expect(s.sugerir).toBe(false);
    // Na semana 4 do bloco, a carência acaba.
    rodizio(7 * 7 + 2, 8 * 7);
    expect(sugestao(e, 8 * 7).sugerir).toBe(true);
  });
});

describe('a semana leve aceita', () => {
  // 8 semanas na mesma carga, sem ganhar repetição: a janela do "sem melhora" do Bruno, intermediário, é de 8 sessões
  // do mesmo exercício (progressao.estagnacao, desde o pacote 5, 16/11/2026; antes, 3 treinos bastavam).
  const parado = () => {
    let e = estadoDe(bruno);
    for (let w = 0; w < 8; w++) e = semanaDe(e, w);
    return e;
  };

  it('é manual: só começa com o aceite, vale 7 dias, deixa a metade das séries com RIR 3–4, e o programa salvo não muda', () => {
    const e = parado();
    const n = 8 * 7;
    expect(semanaLeveDoEstado(e, dia(n))!.mostrar).toBe(true);
    const l = aceitarSemanaLeve(e, dia(n));
    expect(l.programa).toBe(e.programa);
    const h = hojeNoPrograma(l.programa!.programa, l.historico, dia(n + 1), { semanaLeve: l.semanaLeve! });
    expect(h.semanaLeve).toBe(true);
    expect(h.fase?.regraId).toBe('deload.semana-leve');
    const normal = l.programa!.programa.dias[0]!.exercicios;
    h.dias[0]!.exercicios.forEach((x, i) => {
      expect(x.series).toBe(Math.max(1, Math.round(normal[i]!.series * 0.5)));
      expect(x.rir).toEqual([3, 4]);
    });
    // O treino feito na semana leve fica marcado, e fora da dupla progressão.
    const t = iniciarSessao(l, dia(n + 1), 'superior-a');
    expect(t.sessaoAtual!.semanaLeve).toBe(true);
    expect(semanaLeveDoEstado(l, dia(n + 1))).toMatchObject({ ativa: true, mostrar: false, ate: '2026-12-06' });
    // No 8º dia, acabou.
    expect(hojeNoPrograma(l.programa!.programa, l.historico, dia(n + 7), { semanaLeve: l.semanaLeve! }).semanaLeve).toBe(false);
  });

  it('"Voltar ao normal" encerra antes; "Agora não" esconde a sugestão por 7 dias, com ou sem treino no meio (R5a)', () => {
    const e = parado();
    const n = 8 * 7;
    const l = encerrarSemanaLeve(aceitarSemanaLeve(e, dia(n)), dia(n + 2));
    expect(semanaLeveDoEstado(l, dia(n + 3))!.ativa).toBe(false);
    // Depois de uma semana leve, 3 semanas sem sugerir de novo.
    expect(semanaLeveDoEstado(l, dia(n + 3))!.mostrar).toBe(false);
    const r = recusarSemanaLeve(e, dia(n));
    expect(semanaLeveDoEstado(r, dia(n))!.mostrar).toBe(false);
    // Antes do R5a, um treino trazia a oferta de volta (até 106 vezes em 24 semanas, no simulador).
    const depois = treinar(r, n + 1, 'superior-a');
    expect(semanaLeveDoEstado(depois, dia(n + 2))!.mostrar).toBe(false);
    expect(semanaLeveDoEstado(depois, dia(n + 6))!.mostrar).toBe(false);
    expect(semanaLeveDoEstado(depois, dia(n + 7))!.mostrar).toBe(true);
  });

  it('o toque "hoje foi" não vem marcado; um toque marca e o mesmo toque desfaz', () => {
    const e = treinar(estadoDe(bruno), 0, 'superior-a');
    const id = e.historico[0]!.id;
    expect(e.historico[0]!.hojeFoi).toBeUndefined();
    const p = marcarHojeFoi(e, id, 'pesado');
    expect(p.historico[0]!.hojeFoi).toBe('pesado');
    expect(marcarHojeFoi(p, id, 'normal').historico[0]!.hojeFoi).toBe('normal');
    expect(marcarHojeFoi(p, id, 'pesado').historico[0]!.hojeFoi).toBeUndefined();
  });

  it('as sessões da semana leve ficam fora da dupla progressão: a sugestão depois dela olha os treinos de antes', () => {
    const e = parado();
    const n = 8 * 7;
    const l = aceitarSemanaLeve(e, dia(n));
    let v = l;
    [0, 1, 3, 4].forEach((k, i) => (v = treinar(v, n + k, DIAS[i]!, 'local-1', (exId) => ({ ...serieTipica(exId), reps: 6, rir: 4 }))));
    expect(v.historico.slice(-4).every((s: Sessao) => s.semanaLeve)).toBe(true);
    // Sem as sessões leves, os 8 treinos de antes seguem estagnados (a leve não "piorou" nada).
    expect(sugestao({ ...v, semanaLeve: undefined }, n + 5).motivos[0]).toMatch(/exercícios sem progresso/);
  });
});

describe('R5a: a fase de aprendizado e o exercício feito na vaga (deload.semana-leve; iniciante.fase-aprendizado)', () => {
  it('na fase de aprendizado do iniciante, nem semana leve nem "estagnado"; na semana 3, a semana leve volta a valer', () => {
    // O Bruno como iniciante: fase de aprendizado nas semanas 1 e 2.
    const ini = { ...bruno, perfil: { ...bruno.perfil, nivel: 'iniciante' as const } };
    let e = estadoDe(ini);
    // 2 semanas com tudo parado e "pesado demais": o sinal existe, mas é fase de aprendizado.
    for (let w = 0; w < 2; w++) e = semanaDe(e, w);
    e = comHojeFoi(comHojeFoi(e, -1, 'pesado'), -2, 'pesado');
    const s = sugestao(e, 13);
    expect(s.motivos.length).toBeGreaterThan(0);
    expect(s.carencia).toBe(true);
    expect(s.sugerir).toBe(false);
    const h = hojeNoPrograma(e.programa!.programa, e.historico, dia(13));
    // Um exercício que já tem as 4 sessões paradas do iniciante (entra em dois dias da semana): fora da fase de
    // aprendizado ele seria "estagnado"; nela, não. (Até 16/11/2026 a conferência olhava o 1º exercício do dia, que só
    // tinha 2 sessões e não seria "estagnado" de jeito nenhum.)
    const programa = e.programa!.programa;
    const x = programa.dias.flatMap((d) => d.exercicios).find((y) => programa.dias.filter((d) => d.exercicios.some((z) => z.exId === y.exId)).length >= 2)!;
    const sug = sugestaoDoExercicio(e.historico, x, bruno.inventario, { local: { localId: 'local-1' }, ...opcoesDeHoje(h) });
    expect(sug.acao).not.toBe('estagnado');
    const { aprendizado: _a, ...foraDaFase } = opcoesDeHoje(h);
    void _a;
    expect(sugestaoDoExercicio(e.historico, x, bruno.inventario, { local: { localId: 'local-1' }, ...foraDaFase }).acao).toBe('estagnado');
    // Semana 3: fora da fase, o mesmo sinal sugere.
    e = semanaDe(e, 2);
    e = comHojeFoi(comHojeFoi(e, -1, 'pesado'), -2, 'pesado');
    expect(sugestao(e, 3 * 7).sugerir).toBe(true);
  });

  it('a estagnação conta o exercício feito no lugar da vaga (noLugarDe), e não a vaga que ninguém fez', () => {
    const e = estadoDe(bruno);
    const vagas = e.programa!.programa.dias.flatMap((d) => d.exercicios).filter((x) => x.alternativas.length).slice(0, 2);
    expect(vagas).toHaveLength(2);
    // Cada sessão faz as 2 vagas: pelo exercício do programa (reps do programa) ou pela alternativa (noLugarDe).
    const sessao = (n: number, alt: boolean, reps: number): Sessao => ({
      id: dia(n), diaId: 'superior-a', semana: 1, inicio: dia(n), fim: dia(n, 11), localId: 'local-1',
      exercicios: vagas.map((v) => {
        const exId = alt ? v.alternativas[0]! : v.exId;
        const baixo = alt ? POR_ID[exId]!.faixaReps[0] : v.reps[0];
        return { exId, ...(alt ? { noLugarDe: v.exId } : {}), series: [{ ...serieTipica(exId), reps: baixo + reps }] };
      }),
    });
    // "Hoje" é sempre 2 dias depois da última sessão.
    const motivo = (h: Sessao[]) => sugestao({ ...e, historico: h }, (Date.parse(h.at(-1)!.inicio) - Date.parse(dia(0))) / 86_400_000 + 2).motivos.find((m) => m.includes('sem progresso'));
    // 8 sessões, uma a cada 2 dias: a janela do "sem melhora" do Bruno, intermediário (pacote 5, 16/11/2026; antes, 3).
    const oito = (de: number) => Array.from({ length: 8 }, (_, k) => de + 2 * k);
    // 1) As vagas paradas há tempo, mas agora a pessoa faz a alternativa e sobe as repetições (1 a cada 2 sessões, sem
    // sair da faixa): nada estagnado.
    const parado = oito(0).map((n) => sessao(n, false, 0));
    expect(motivo(parado)).toBe('2 exercícios sem progresso em 8 treinos');
    expect(motivo([...parado, ...oito(16).map((n, k) => sessao(n, true, Math.floor(k / 2)))])).toBeUndefined();
    // 2) A alternativa parada em 8 treinos, com a vaga nunca feita: conta (antes do R5a, ficava de fora).
    expect(motivo(oito(16).map((n) => sessao(n, true, 0)))).toBe('2 exercícios sem progresso em 8 treinos');
  });
});

