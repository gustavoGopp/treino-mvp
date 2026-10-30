import type { Musculo } from '../biblioteca';
import { VOLUME, r } from '../regras';
import type { Inventario } from '../taxonomia/equipamentos';
import { GRUPOS, NOME_MUSCULO, gerarPrograma, type Grupo, type Perfil, type Programa } from './index';

// Escolhas calculadas: quando o programa não atinge as metas ou não cabe no tempo, o gerador roda de novo
// com variações simples do perfil e mostra só as que melhoram o resultado. A pessoa escolhe; nada muda sozinho.

export type Opcao = {
  id: 'manter' | 'mais-um-dia' | 'mais-tempo' | 'menos-prioridade';
  titulo: string;
  texto: string;
  perfil: Perfil;
  diasSemana: number;
  minutosSessao: number;
  minutosPorDia: number[];
  /** Músculos abaixo da meta (prioritários) ou do mínimo eficaz (demais). */
  abaixoDaMeta: Musculo[];
  diasAcimaDoTempo: number;
  regraId: string;
};

const prioritarios = (p: Perfil) => new Set<Musculo>(p.prioridades.flatMap((g) => GRUPOS[g]));

function avaliar(p: Perfil, programa: Programa) {
  const prio = prioritarios(p);
  const abaixoDaMeta = (Object.entries(programa.metas) as [Musculo, number][])
    .filter(([m, meta]) => (programa.volumeSemanal[m] ?? 0) < (prio.has(m) ? meta : Math.min(meta, VOLUME.minimoEficazPiso)))
    .map(([m]) => m);
  const diasAcimaDoTempo = programa.dias.filter((d) => d.minutosEstimados > p.minutosSessao).length;
  return { abaixoDaMeta, diasAcimaDoTempo, problemas: abaixoDaMeta.length + diasAcimaDoTempo };
}

const lista = (ms: Musculo[]) => ms.map((m) => NOME_MUSCULO[m]).join(', ');

export function opcoesDeAjuste(perfil: Perfil, inventario: Inventario): Opcao[] {
  const base = gerarPrograma(perfil, inventario);
  if (base.status !== 'ok') return [];
  const b = avaliar(perfil, base.programa);
  if (b.problemas === 0) return [];

  const opcao = (id: Opcao['id'], p: Perfil, titulo: string): (Opcao & { problemas: number }) | undefined => {
    const g = gerarPrograma(p, inventario);
    if (g.status !== 'ok') return undefined;
    const a = avaliar(p, g.programa);
    const removidos = new Set<Musculo>(perfil.prioridades.filter((x) => !p.prioridades.includes(x)).flatMap((x) => GRUPOS[x]));
    const resolvidos = b.abaixoDaMeta.filter((m) => !a.abaixoDaMeta.includes(m) && !removidos.has(m));
    const partes = [
      removidos.size ? `${lista([...removidos])} voltam ao mínimo eficaz (sem prioridade)` : '',
      a.problemas === 0 ? 'atinge todas as metas e cabe no tempo' : '',
      a.problemas > 0 && resolvidos.length ? `atinge a meta de ${lista(resolvidos)}` : '',
      a.problemas > 0 && a.diasAcimaDoTempo < b.diasAcimaDoTempo ? 'cabe melhor no tempo' : '',
      a.abaixoDaMeta.length && a.problemas > 0 ? `ainda abaixo: ${lista(a.abaixoDaMeta)}` : '',
    ].filter(Boolean);
    return {
      id,
      titulo,
      texto: id === 'manter' ? '' : partes.join('; ') + '.',
      perfil: p,
      diasSemana: p.diasSemana,
      minutosSessao: p.minutosSessao,
      minutosPorDia: g.programa.dias.map((d) => d.minutosEstimados),
      abaixoDaMeta: a.abaixoDaMeta,
      diasAcimaDoTempo: a.diasAcimaDoTempo,
      regraId: r('tempo.corte'),
      problemas: a.problemas,
    };
  };

  const candidatas = [
    perfil.diasSemana < 5 &&
      opcao('mais-um-dia', { ...perfil, diasSemana: (perfil.diasSemana + 1) as Perfil['diasSemana'] }, `${perfil.diasSemana + 1} treinos de ${perfil.minutosSessao} min`),
    opcao('mais-tempo', { ...perfil, minutosSessao: perfil.minutosSessao + 15 }, `${perfil.diasSemana} treinos de ${perfil.minutosSessao + 15} min`),
    ...menosPrioridade(perfil, base.programa).map((g) =>
      opcao('menos-prioridade', { ...perfil, prioridades: perfil.prioridades.filter((x) => x !== g) }, `Sem priorizar ${NOME_GRUPO[g]}`),
    ),
  ].filter((o): o is Opcao & { problemas: number } => !!o && o.problemas < b.problemas);

  const manter = opcao('manter', perfil, `Manter ${perfil.diasSemana} treinos de ${perfil.minutosSessao} min`)!;
  manter.texto =
    (b.abaixoDaMeta.length ? `Metas reduzidas: ${lista(b.abaixoDaMeta)}` : '') +
    (b.abaixoDaMeta.length && b.diasAcimaDoTempo ? '; ' : '') +
    (b.diasAcimaDoTempo ? `${b.diasAcimaDoTempo} treino(s) acima do tempo` : '') +
    '.';
  return [...candidatas.sort((x, y) => x.problemas - y.problemas), manter].map((o) => {
    const { problemas, ...semContagem } = o;
    void problemas;
    return semContagem;
  });
}

const NOME_GRUPO: Record<Grupo, string> = {
  peito: 'peito',
  costas: 'costas',
  ombros: 'ombros',
  bracos: 'braços',
  pernas: 'pernas',
  gluteos: 'glúteos',
  abdomen: 'abdômen',
};

/** O grupo prioritário com pior cobertura (volume/meta) é o candidato a deixar de ser prioridade. */
function menosPrioridade(perfil: Perfil, programa: Programa): Grupo[] {
  if (perfil.prioridades.length < 2) return [];
  const cobertura = (g: Grupo) => Math.min(...GRUPOS[g].map((m) => (programa.volumeSemanal[m] ?? 0) / (programa.metas[m] ?? 1)));
  return [[...perfil.prioridades].sort((a, b) => cobertura(a) - cobertura(b) || a.localeCompare(b))[0]!];
}
