import { describe, expect, it, vi } from 'vitest';
import { POR_ID, PADROES_EMPURRAR, PADROES_PUXAR } from '../../src/domain/biblioteca';
import { gerarPrograma, seriesDeVolume, type Perfil, type Programa } from '../../src/domain/gerador';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS, iris, leandro } from '../personas/todos';

// Sessão "treino para todos", etapa 2, pacote 0 (14/11/2026): com dor acima de 5 no joelho, saem também os exercícios
// feitos com o joelho apoiado (seguranca.dor.programa), e a vaga que a dor esvazia recebe outro exercício do mesmo
// músculo e do mesmo tipo (selecao.dia-sem-principal). Aqui não há "antes" para comparar: a mudança é no dado da
// biblioteca, que o protótipo também lê. Só personas fictícias.

const APOIAM_O_JOELHO = ['puxada-unilateral', 'puxada-barra-reta', 'puxada-elastico', 'abdominal-polia', 'roda-abdominal', 'coice-caneleira', 'coice-elastico', 'coice-maquina'];
const comDor = (perfil: Perfil, articulacao: 'joelho' | 'ombro' | 'cotovelo' | 'quadril' | 'lombar', nota: number): Perfil => ({
  ...perfil,
  triagem: { ...perfil.triagem, respostas: { ...perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao, nota }] },
});
const ok = (gerar: typeof gerarPrograma, perfil: Perfil, inventario: Inventario): Programa => {
  const r = gerar(perfil, inventario);
  if (r.status !== 'ok') throw new Error(`sem programa: ${r.status}`);
  return r.programa;
};
const ids = (p: Programa) => p.dias.flatMap((d) => d.exercicios.map((x) => x.exId));
const doPadrao = (p: Programa, padroes: readonly string[]) =>
  p.dias.flatMap((d) => d.exercicios).filter((x) => padroes.includes(x.padrao)).reduce((t, x) => t + seriesDeVolume(x), 0);
const TODAS = Object.values({ ...PERSONAS, ...PERSONAS_NOVAS });

describe('dor forte no joelho: os exercícios com o joelho apoiado saem (seguranca.dor.programa)', { timeout: 60_000 }, () => {
  it('os 8 exercícios com o joelho apoiado carregam o joelho na biblioteca', () => {
    for (const id of APOIAM_O_JOELHO) expect(POR_ID[id]!.articulacoes, id).toContain('joelho');
  });

  it('com dor 7 no joelho, nenhuma das 12 personas recebe exercício que carrega o joelho', () => {
    let comPrograma = 0;
    for (const p of TODAS) {
      const r = gerarPrograma(comDor(p.perfil, 'joelho', 7), p.inventario);
      if (r.status !== 'ok') continue;
      comPrograma++;
      for (const id of ids(r.programa)) expect(POR_ID[id]!.articulacoes, `${p.nome}: ${id}`).not.toContain('joelho');
    }
    expect(comPrograma).toBeGreaterThanOrEqual(10);
  });

  it('o Leandro (dor 7 no joelho, academia completa) deixa de ajoelhar e fica com a puxada sentado', () => {
    // Na `main`, o Leandro recebia a puxada unilateral ajoelhado e a puxada ajoelhado com barra reta.
    const d = ok(gerarPrograma, leandro.perfil, leandro.inventario);
    expect(ids(d).filter((id) => APOIAM_O_JOELHO.includes(id))).toEqual([]);
    expect(ids(d)).toContain('puxada-frente');
    // As costas ficam com o que tinham (8 séries), todo dia tem um puxar, e empurrar não passa de 1,5 vez o puxar.
    expect(d.volumeSemanal.costas ?? 0).toBeGreaterThanOrEqual(8);
    for (const dia of d.dias) expect(dia.exercicios.some((x) => PADROES_PUXAR.includes(x.padrao)), dia.nome).toBe(true);
    expect(doPadrao(d, PADROES_EMPURRAR)).toBeLessThanOrEqual(1.5 * doPadrao(d, PADROES_PUXAR));
  });

  it('só com elásticos (a Íris) e dor 7 no joelho: a puxada ajoelhada sai e a vaga fica com uma remada, em todos os dias que tinham puxar', () => {
    const perfil = comDor(iris.perfil, 'joelho', 7);
    // Sem a dor, a Íris tem a puxada com elástico (ajoelhada), que é o único puxar vertical dela.
    expect(ids(ok(gerarPrograma, iris.perfil, iris.inventario))).toContain('puxada-elastico');
    const d = ok(gerarPrograma, perfil, iris.inventario);
    expect(ids(d)).not.toContain('puxada-elastico');
    for (const dia of d.dias) expect(dia.exercicios.some((x) => PADROES_PUXAR.includes(x.padrao)), dia.nome).toBe(true);
    expect(doPadrao(d, PADROES_EMPURRAR)).toBeLessThanOrEqual(1.5 * doPadrao(d, PADROES_PUXAR));
    const trocado = d.dias.flatMap((dia) => dia.exercicios).find((x) => x.porque.some((q) => q.regraId === 'selecao.dia-sem-principal' && /^Entrou no lugar da vaga "puxar vertical", que a dor no joelho \(7 hoje\) deixou sem exercício: trabalha o mesmo músculo sem carregar a região\.$/.test(q.texto)));
    expect(trocado?.padrao).toBe('puxar-h');
  });

  it('com dor leve (4) no joelho, nada sai: o exercício com o joelho apoiado só fica por último no desempate', () => {
    const perfil = comDor({ ...leandro.perfil }, 'joelho', 4);
    const p = ok(gerarPrograma, perfil, leandro.inventario);
    expect(p.regioesExcluidas).toEqual([]);
    // Na academia completa há puxada sentado: com dor leve, ela vem antes das ajoelhadas.
    expect(ids(p).filter((id) => ['puxada-unilateral', 'puxada-barra-reta'].includes(id))).toEqual([]);
    expect(ids(p)).toContain('puxada-frente');
  });

  it('sem dor, ou com dor forte em que nenhuma vaga tem substituto, a regra da vaga não muda nada (as 12 personas sem dor ficam iguais com ela e sem ela)', async () => {
    // O protótipo com as regras adotadas, menos a da vaga que a dor esvazia.
    vi.stubEnv('PROT', 'app,-dor-musculo');
    vi.resetModules();
    const semARegra = ((await import('../../scripts/auditoria/prototipo/gerador')) as unknown as { gerarPrograma: typeof gerarPrograma }).gerarPrograma;
    for (const p of TODAS.filter((x) => !(x.perfil.triagem.dores ?? []).length)) {
      const [a, d] = [semARegra(p.perfil, p.inventario), gerarPrograma(p.perfil, p.inventario)];
      expect(d, p.nome).toEqual(a);
    }
  });

  it('a vaga que a dor esvazia só recebe exercício do mesmo tipo: nenhum dia perde o exercício grande por causa da troca', () => {
    for (const p of TODAS)
      for (const articulacao of ['joelho', 'ombro', 'cotovelo', 'quadril', 'lombar'] as const) {
        const r = gerarPrograma(comDor(p.perfil, articulacao, 7), p.inventario);
        if (r.status !== 'ok') continue;
        for (const x of r.programa.dias.flatMap((dia) => dia.exercicios)) {
          const q = x.porque.find((y) => y.regraId === 'selecao.dia-sem-principal' && y.texto.startsWith('Entrou no lugar da vaga'));
          if (!q) continue;
          const vaga = /^Entrou no lugar da vaga "([^"]+)"/.exec(q.texto)![1]!;
          // A vaga de puxar, empurrar, agachar ou dobrar o quadril é de multiarticular: o que entra também é.
          if (/puxar|empurrar|agachar|afundo|dobrar/.test(vaga)) expect(x.tipo, `${p.nome}, ${articulacao}: ${x.exId} no lugar de ${vaga}`).toBe('composto');
        }
      }
  });
});
