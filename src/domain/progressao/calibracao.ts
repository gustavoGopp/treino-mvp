import { r } from '../regras';
import { proximaCarga, type Alvo, type Carga, type OpcoesCarga, type SerieRegistrada, type SessaoExercicio } from './index';

// Calibração da carga, série a série (progressao.calibracao; pesquisa-v2/07, seção 2.3, e pesquisa-v2/09).
// Vale na 1ª vez de um exercício e na 1ª vez de uma máquina de placa, anilhas ou contrapeso num local.
// R = repetições feitas + reserva relatada; A = meio da faixa + meio do RIR alvo.
// Os números ±2, +25% e 12 são do projeto (consenso); a fórmula é a de Brzycki (Mayhew 1995).

export type ResultadoCalibracao = {
  acao: 'manter' | 'subir' | 'descer';
  /** Carga da próxima série (ou da próxima sessão). */
  proxima: Carga;
  /** A série caiu perto do alvo (A ± 2): a carga está calibrada e vira a referência. */
  perto: boolean;
  motivo: string;
  regraId: string;
};

export const alvoDaCalibracao = (a: Alvo) => (a.reps[0] + a.reps[1]) / 2 + (a.rir[0] + a.rir[1]) / 2;

const FOLGA = 2;
const FOLGA_DOIS_PASSOS = 6;
const REPS_FORMULA = 12;
const TETO_SUBIDA = 0.25;
const brzycki = (kg: number, a: number, rr: number) => (kg * (37 - a)) / (37 - rr);

/** Maior carga da lista do inventário até x (arredondar para baixo); sem lista, degraus de 2,5 kg. */
function paraBaixo(x: number, o: OpcoesCarga): number | undefined {
  const lista = o.lista ?? [];
  if (lista.length) return [...lista].reverse().find((k) => k <= x + 1e-9);
  const k = Math.floor(x / 2.5 + 1e-9) * 2.5;
  return k > 0 ? k : undefined;
}

const mesma = (a: Carga, b: Carga | undefined) => !!b && JSON.stringify(a) === JSON.stringify(b);

const texto = (c: Carga) =>
  c.tipo === 'kg' ? `${c.kg.toLocaleString('pt-BR')} kg` : c.tipo === 'placa' ? `placa ${c.placa}` : c.tipo === 'anilha' ? `${c.kgPorLado.toLocaleString('pt-BR')} kg por lado` : c.tipo === 'contrapeso' ? `contrapeso ${c.placa}` : 'o próximo degrau';

/**
 * Próxima carga a partir de uma série de calibração. `soDesce`: semana 1 da volta de uma pausa, em que a calibração
 * não sobe (a volta existe para evitar dano). A dor (seguranca.dor.escala) é tratada antes, por quem chama.
 */
export function calibrar(s: Pick<SerieRegistrada, 'carga' | 'reps' | 'rir'>, alvo: Alvo, o: OpcoesCarga, opcoes: { soDesce?: boolean } = {}): ResultadoCalibracao {
  const regraId = r('progressao.calibracao');
  const c = s.carga;
  const rr = s.reps + s.rir;
  const a = alvoDaCalibracao(alvo);
  const manter = (motivo: string, perto: boolean): ResultadoCalibracao => ({ acao: 'manter', proxima: c, perto, motivo, regraId });

  if (Math.abs(rr - a) <= FOLGA) return manter('Carga certa para a faixa: mantenha nas próximas séries.', true);

  if (rr < a - FOLGA) {
    // Pesada demais: a fórmula só em kg conhecido; nos outros tipos, passos.
    let prox: Carga | undefined;
    if (c.tipo === 'kg') {
      const k = paraBaixo(brzycki(c.kg, a, rr), o);
      prox = k !== undefined && k < c.kg - 1e-9 ? { tipo: 'kg', kg: k } : proximaCarga(c, -1, o);
    } else prox = proximaCarga(c, rr <= a - FOLGA_DOIS_PASSOS ? -2 : -1, o) ?? proximaCarga(c, -1, o);
    if (!prox || mesma(c, prox)) return manter('Pesada para a faixa, mas não há carga menor aqui: faça menos repetições ou use a alternativa.', false);
    return { acao: 'descer', proxima: prox, perto: false, motivo: `Ficou pesada: na próxima série, ${texto(prox)}.`, regraId };
  }

  // Leve demais.
  if (opcoes.soDesce) return manter('Semana 1 da volta: a calibração não sobe a carga. Mantenha.', false);
  let prox: Carga | undefined;
  if (c.tipo === 'kg' && rr <= REPS_FORMULA) {
    const k = paraBaixo(brzycki(c.kg, a, rr), o);
    prox = k !== undefined && k > c.kg + 1e-9 ? { tipo: 'kg', kg: k } : proximaCarga(c, 1, o);
  } else {
    prox = proximaCarga(c, rr >= a + FOLGA_DOIS_PASSOS ? 2 : 1, o) ?? proximaCarga(c, 1, o);
    // No kg conhecido, nunca mais que +25%, e sempre pelo menos 1 passo.
    if (prox && c.tipo === 'kg' && prox.tipo === 'kg' && prox.kg > c.kg * (1 + TETO_SUBIDA) + 1e-9) {
      const k = paraBaixo(c.kg * (1 + TETO_SUBIDA), o);
      prox = k !== undefined && k > c.kg + 1e-9 ? { tipo: 'kg', kg: k } : proximaCarga(c, 1, o);
    }
  }
  if (!prox || mesma(c, prox)) return manter('Leve, mas não há carga maior aqui: siga a escada (mais repetições, descida lenta, pausa).', false);
  return { acao: 'subir', proxima: prox, perto: false, motivo: `Ficou leve: na próxima série, ${texto(prox)}.`, regraId };
}

/** Séries de trabalho (fora as de acerto da calibração): só elas entram na dupla progressão. */
export const semCalibracao = (h: SessaoExercicio[]): SessaoExercicio[] =>
  h.map((s) => ({ series: s.series.filter((x) => !x.calibracao) })).filter((s) => s.series.length > 0);

/** O exercício ainda está em calibração: nenhuma série de trabalho registrada (nesta chave de local). */
export const emCalibracao = (h: SessaoExercicio[]) => semCalibracao(h).length === 0;
