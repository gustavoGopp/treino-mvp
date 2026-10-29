// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import base from './elevacao-lateral';

const src = base;
const ex = Object.assign({},src,{id:'elevacao-lateral-b',
  rx:'3 × 12–20 por lado · RIR 0–1 · 1 min após os dois lados',
  rest:{opts:[60],def:60,note:'Faça um lado e logo o outro, sem pausa. O descanso vale depois dos dois lados.'},
  check:src.check});
export default ex;
