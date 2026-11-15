import { describe, expect, it } from 'vitest';
import { PADROES_EMPURRAR, PADROES_PUXAR, type Articulacao } from '../../src/domain/biblioteca';
import { contextoDeSelecao, gerarPrograma, MUSCULOS_COM_META, razaoCoxa, seriesDeVolume, type Perfil, type Programa } from '../../src/domain/gerador';
import { OPCOES_POR_DIAS } from '../../src/domain/gerador/divisoes';
import { VOLUME } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { medirRegua } from '../../scripts/auditoria/regua';
import { inventarioDe, perfilDe } from '../../scripts/auditoria/ver-lib';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS, jonas } from '../personas/todos';

// Sessão "treino para todos", etapa 2, pacote 3 (15/11/2026): a dor que não desmonta o dia, os 30 minutos e as duplas.
//  - selecao.dia-sem-principal: quando a dor deixa um dia fraco na divisão recomendada, a semana sai noutra divisão do
//    mesmo número de dias, se a troca não custar outra coisa;
//  - selecao.variacoes-equivalentes: o mesmo exercício nunca em todos os dias havendo outro do mesmo nível, em todo caminho;
//  - tempo.musculo-protegido: o músculo protegido com menos dias onde entrar escolhe primeiro;
//  - tempo.superserie: os dois exercícios de uma dupla ficam um depois do outro.
// Só personas e perfis fictícios.

const ARTICULACOES: Articulacao[] = ['ombro', 'cotovelo', 'punho', 'lombar', 'quadril', 'joelho', 'tornozelo'];
const comDor = (perfil: Perfil, articulacao: Articulacao, nota: number): Perfil => ({
  ...perfil,
  divisao: undefined,
  triagem: { ...perfil.triagem, respostas: { ...perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao, nota }] },
});
const TODAS = Object.values({ ...PERSONAS, ...PERSONAS_NOVAS });
type Caso = { nome: string; perfil: Perfil; inventario: Inventario };
/** As 12 personas com dor 7 em cada uma das 7 regiões (84 perfis; alguns ficam sem programa). */
const COM_DOR: Caso[] = TODAS.flatMap((p) => ARTICULACOES.map((a) => ({ nome: `${p.nome}, dor 7: ${a}`, perfil: comDor(p.perfil, a, 7), inventario: p.inventario })));
const programa = (perfil: Perfil, inventario: Inventario): Programa | null => {
  const r = gerarPrograma(perfil, inventario);
  return r.status === 'ok' ? r.programa : null;
};
const fracos = (p: Programa, dias: number) => dias - p.dias.length + p.dias.filter((d) => d.exercicios.length < 3 || !d.exercicios.some((x) => x.tipo === 'composto')).length;
const doPadrao = (p: Programa, padroes: readonly string[]) =>
  p.dias.flatMap((d) => d.exercicios).filter((x) => padroes.includes(x.padrao)).reduce((t, x) => t + seriesDeVolume(x), 0);
const coxaNaFaixa = (p: Programa) => razaoCoxa(p.volumeSemanal) >= VOLUME.coxa[0] && razaoCoxa(p.volumeSemanal) <= VOLUME.coxa[1];
const empurraDemais = (p: Programa) => doPadrao(p, PADROES_PUXAR) > 0 && doPadrao(p, PADROES_EMPURRAR) > 1.5 * doPadrao(p, PADROES_PUXAR);
const passaDoTempo = (p: Programa, min: number) => p.dias.some((d) => d.minutosEstimados > 1.1 * min);
/** O perfil fictício da revisão cega: intermediária, academia completa, 4 dias de 60 min, dor 7 no ombro. */
const ombro7 = { perfil: perfilDe({ cenario: 'academia', nivel: 'intermediario', dias: '4', min: 60, focos: [], dores: [{ articulacao: 'ombro', nota: 7 }], semanasParado: 0 }), inventario: inventarioDe('academia') };

describe('a dor que não desmonta o dia (selecao.dia-sem-principal)', { timeout: 120_000 }, () => {
  it('com dor 7 no ombro, a semana de 4 dias sai em corpo todo: nenhum dia de 16 min só com rosca e tríceps', () => {
    // Na divisão recomendada (Superior/Inferior), os dois dias de superior ficavam com 2 exercícios e 16 min.
    const recomendada = programa({ ...ombro7.perfil, divisao: OPCOES_POR_DIAS[4][0]! }, ombro7.inventario)!;
    expect(fracos(recomendada, 4)).toBe(2);
    const p = programa(ombro7.perfil, ombro7.inventario)!;
    expect(p.divisaoId).toBe('ct-4x');
    expect(fracos(p, 4)).toBe(0);
    for (const d of p.dias) expect(d.minutosEstimados, d.nome).toBeGreaterThanOrEqual(40);
    // Nada do que a dor tirou volta.
    for (const x of p.dias.flatMap((d) => d.exercicios)) expect(x.padrao.startsWith('empurrar') || x.padrao.startsWith('puxar'), x.exId).toBe(false);
    expect(p.regioesExcluidas).toEqual(['ombro']);
  });

  it('o app diz por que a divisão mudou, e não diz que a pessoa a escolheu', () => {
    const p = programa(ombro7.perfil, ombro7.inventario)!;
    expect(p.avisos[0]).toEqual({
      regraId: 'selecao.dia-sem-principal',
      texto: 'Por causa da dor no ombro (7 hoje), a semana foi montada em Corpo todo 4x: na divisão recomendada (Superior/Inferior (2x)), um dos dias ficaria quase vazio. Quando a dor baixar, atualize a nota na triagem e a divisão recomendada volta.',
    });
    expect(p.porque.find((q) => q.regraId === 'divisao.recomendacao')?.texto).toBe('Corpo todo 4x: montada assim por causa da dor no ombro (7 hoje); a recomendada para 4 dias deixaria um dia quase vazio (você pode escolher outra na rotina).');
  });

  it('quem escolheu a divisão à mão fica com ela', () => {
    const p = programa({ ...ombro7.perfil, divisao: 'si-2x' }, ombro7.inventario)!;
    expect(p.divisaoId).toBe('si-2x');
    expect(p.avisos.some((a) => /a semana foi montada em/.test(a.texto))).toBe(false);
  });

  it('sem dor forte, ou sem dia fraco, a divisão é a recomendada', () => {
    for (const p of TODAS) {
      const r = programa({ ...p.perfil, divisao: undefined }, p.inventario);
      if (!r || r.regioesExcluidas.length) continue;
      expect(r.avisos.some((a) => /a semana foi montada em/.test(a.texto)), p.nome).toBe(false);
    }
  });

  it('a troca só acontece quando melhora e não custa outra coisa (12 personas × 7 regiões)', () => {
    let trocas = 0;
    for (const c of COM_DOR) {
      const p = programa(c.perfil, c.inventario);
      if (!p || !p.avisos.some((a) => /a semana foi montada em/.test(a.texto))) continue;
      trocas++;
      const base = programa({ ...c.perfil, divisao: OPCOES_POR_DIAS[c.perfil.diasSemana][0]! }, c.inventario)!;
      // menos dias fracos
      expect(fracos(p, c.perfil.diasSemana), c.nome).toBeLessThan(fracos(base, c.perfil.diasSemana));
      // nenhum músculo esquecido que a recomendada treinava
      for (const m of MUSCULOS_COM_META) if ((base.volumeSemanal[m] ?? 0) > 0) expect(p.volumeSemanal[m] ?? 0, `${c.nome}: ${m}`).toBeGreaterThan(0);
      // a coxa não sai da faixa, o empurrar não passa do puxar e nenhum dia passa do tempo, se antes não era assim
      if (coxaNaFaixa(base)) expect(coxaNaFaixa(p), c.nome).toBe(true);
      if (!empurraDemais(base)) expect(empurraDemais(p), c.nome).toBe(false);
      if (!passaDoTempo(base, c.perfil.minutosSessao)) expect(passaDoTempo(p, c.perfil.minutosSessao), c.nome).toBe(false);
      // a dor continua tirando o que tirava
      expect(p.regioesExcluidas, c.nome).toEqual(base.regioesExcluidas);
    }
    expect(trocas).toBeGreaterThan(8);
  });
});

describe('o mesmo exercício nunca em todos os dias, em todo caminho (selecao.variacoes-equivalentes)', { timeout: 120_000 }, () => {
  it('com dor forte, nenhuma das 12 personas tem o defeito B1 da régua (o mesmo exercício em todos os dias havendo outro do mesmo nível)', () => {
    let vistos = 0;
    for (const c of COM_DOR) {
      const p = programa(c.perfil, c.inventario);
      if (!p) continue;
      vistos++;
      expect(medirRegua(p, c.perfil, contextoDeSelecao(c.perfil, c.inventario)).defeitos.has('B1'), c.nome).toBe(false);
    }
    expect(vistos).toBeGreaterThan(60);
  });
});

describe('30 minutos: o músculo protegido com menos dias escolhe primeiro (tempo.musculo-protegido)', () => {
  it('o Jonas (2 dias de 30 min): o abdômen e a panturrilha ficam em dias diferentes, e o 1º dia encurta', () => {
    const p = programa(jonas.perfil, jonas.inventario)!;
    const diaDe = (padrao: string) => p.dias.findIndex((d) => d.exercicios.some((x) => x.padrao === padrao));
    expect(diaDe('panturrilha')).toBeGreaterThanOrEqual(0);
    expect(diaDe('core')).toBeGreaterThanOrEqual(0);
    expect(diaDe('core')).not.toBe(diaDe('panturrilha'));
    // Antes, os dois caíam no Corpo todo A, que ficava com 38 min em 30.
    expect(p.dias[0]!.minutosEstimados).toBeLessThanOrEqual(34);
  });
});

describe('os dois exercícios de uma dupla ficam um depois do outro (tempo.superserie)', { timeout: 120_000 }, () => {
  it('em toda dupla, o par vem logo antes ou logo depois (12 personas, 30 e 45 min, com e sem dor)', () => {
    let duplas = 0;
    const casos: Caso[] = [
      ...TODAS.flatMap((p) => [30, 45].map((minutosSessao) => ({ nome: `${p.nome}, ${minutosSessao} min`, perfil: { ...p.perfil, minutosSessao, divisao: undefined }, inventario: p.inventario }))),
      ...COM_DOR,
    ];
    for (const c of casos) {
      const p = programa(c.perfil, c.inventario);
      if (!p) continue;
      for (const d of p.dias)
        d.exercicios.forEach((x, i) => {
          if (!x.supersetCom) return;
          duplas++;
          const j = d.exercicios.findIndex((y) => y.exId === x.supersetCom);
          expect(Math.abs(i - j), `${c.nome}: ${d.nome}, ${x.exId} + ${x.supersetCom}`).toBe(1);
        });
    }
    expect(duplas).toBeGreaterThan(50);
  });
});
