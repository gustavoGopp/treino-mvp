// "Quando é o próximo?" (lote M5 da análise crítica, 22/11/2026): o app monta um compromisso para a agenda do celular
// (um arquivo de calendário, .ics). Quem lembra é a agenda: sem servidor, sem aviso do app e sem nada sair do aparelho.
// O compromisso leva só o nome do treino; nada de carga, de série ou de saúde.
// Funções puras: a data e a hora entram como texto local ("2026-11-24T18:00"), sem relógio nem fuso aqui dentro.

/** Com quantos minutos de antecedência a agenda lembra. [opinião] */
export const LEMBRETE_MIN = 30;

const DATA_HORA = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

/**
 * A sugestão de quando é o próximo treino: daqui ao intervalo da rotina (7 ÷ treinos por semana, para cima), na mesma
 * hora em que o treino de hoje começou. `hojeLocal` é a data e a hora locais do começo do treino de hoje.
 */
export function proximaDataSugerida(hojeLocal: string, treinosPorSemana: number): string {
  const m = DATA_HORA.exec(hojeLocal);
  if (!m) return '';
  const dias = Math.ceil(7 / Math.max(1, treinosPorSemana));
  // conta em UTC só para somar dias no calendário; a hora local volta como entrou
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + dias));
  return `${d.toISOString().slice(0, 10)}T${m[4]}:${m[5]}`;
}

const escapar = (s: string) => s.replace(/\\/g, '\\\\').replace(/[,;]/g, (c) => `\\${c}`).replace(/\r?\n/g, '\\n');
const compacta = (local: string) => local.replace(/[-:]/g, '') + '00';

/**
 * O arquivo de calendário de um treino. O horário é "flutuante" (sem fuso): vale no relógio do aparelho que abrir.
 * `criadoEm` é a hora de agora em ISO (UTC), que o formato exige. Devolve '' se a data não estiver no formato esperado.
 */
export function compromissoDoTreino(o: { nome: string; inicioLocal: string; minutos: number; criadoEm: string }): string {
  const m = DATA_HORA.exec(o.inicioLocal);
  if (!m || !(o.minutos > 0)) return '';
  const fim = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]) + Math.round(o.minutos)));
  const fimLocal = fim.toISOString().slice(0, 16);
  const carimbo = o.criadoEm.replace(/[-:]/g, '').replace(/\.\d+/, '');
  const titulo = escapar(`Treino: ${o.nome}`);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//treino-mvp//pt-BR',
    'BEGIN:VEVENT',
    `UID:treino-${compacta(o.inicioLocal)}@treino-mvp`,
    `DTSTAMP:${carimbo}`,
    `DTSTART:${compacta(o.inicioLocal)}`,
    `DTEND:${compacta(fimLocal)}`,
    `SUMMARY:${titulo}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${titulo}`,
    `TRIGGER:-PT${LEMBRETE_MIN}M`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
