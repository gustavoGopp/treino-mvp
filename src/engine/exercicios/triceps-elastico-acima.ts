// @ts-nocheck
// Animação nova (aprovada). Tríceps acima da cabeça com elástico: em pé, um pé à frente do outro; o pé de trás
// pisa no meio do elástico, as duas pontas sobem pelas costas e as mãos as seguram juntas atrás da cabeça; estende só
// o cotovelo, levando as mãos para cima. Parte do tríceps francês na polia aprovado (mesmo caminho do antebraço e a
// mesma base com um pé à frente), com o tronco em pé e as duas faixas de baixo do pé de trás às mãos (atrás do
// corpo), que afinam quando esticam (a tensão sobe com os braços estendidos).
// Técnica e fontes: docs/pesquisa/animacoes/triceps-elastico-acima.md.
import { L3, TX, band, bandHandle } from '../desenho';
import { X, add, mid, mul, sub } from '../math';

const sola=(sk,k)=>add(mid(sk.side[k].heel,sk.side[k].toe),[0,-1,0]);
const ex = {
  id:'triceps-elastico-acima',
  views:['lateral','frontal'],
  base:{P:[0,89,-2],lumbar:4,thor:4,neck:0,legR:{ikS:[12,7,24],poleRel:[.1,.3,1],ft:[6,-18]},legL:{ikS:[11,7,-26],poleRel:[0,.2,1],ft:[0,-20]}},
  keys:{stretch:{armR:{ua:[-22,58],fa:[22,200]}},mid:{armR:{ua:[-22,58],fa:[20,145]}},end:{armR:{ua:[-22,58],fa:[-28,62]}}},
  seq:[
    {path:['stretch'],dur:.5,kind:'hold',label:'Alongado',tempo:'mãos atrás da cabeça',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.4,kind:'hold',label:'Braços estendidos',tempo:'elástico mais esticado',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.3,kind:'ecc',label:'Volta · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']],frontal:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){
    // as duas pontas sobem pelas costas: de baixo do pé de trás (esquerdo) a cada mão, por trás do corpo
    const s=sola(sk,'L');
    for(const k of['R','L'])band(this,k,s,sk.side[k].G,{bias:-3});
    bandHandle(mid(sk.side.R.G,sk.side.L.G),X);
  },
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,mul(sub(R.E,R.S),1.45)),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(R.E,mul(sub(R.E,R.S),.45)),'cotovelo parado',{cls:'lbl-g',dx:8});TX(sola(sk,'L'),'pé de trás no elástico',{cls:'lbl-g',anchor:'end',dx:-4,dy:-8});},
    frontal(sk){for(const k of['R','L']){const sd=sk.side[k];L3(sd.S,add(sd.S,mul(sub(sd.E,sd.S),1.35)),'gd',.9,{layer:3,dash:'3 2.5'});}TX(add(sk.Hc,[-28,-16,0]),'cotovelos',{cls:'lbl-g',anchor:'end'});TX(add(sk.Hc,[-28,-16,0]),'para a frente',{cls:'lbl-g',anchor:'end',dy:15});}
  },
  muscles:{p:[['triceps','RL']],s:[['rectus','R']]},
  errors:[
    {id:'abre',view:'frontal',keys:{stretch:{armR:{ua:[40,52],fa:[22,200]}},mid:{armR:{ua:[42,52],fa:[20,145]}},end:{armR:{ua:[30,54],fa:[-28,62]}}}},
    {id:'cotovelo',view:'lateral',keys:{stretch:{armR:{ua:[-22,32],fa:[22,185]}},mid:{armR:{ua:[-22,42],fa:[20,135]}}}},
    {id:'arco',view:'lateral',keys:{mid:{lumbar:-12,thor:-14},end:{P:[0,89,0],lumbar:-22,thor:-26,neck:-14}}},
    {id:'curta',view:'lateral',keys:{stretch:{armR:{ua:[-22,58],fa:[20,150]}}}}
  ]
};
export default ex;
