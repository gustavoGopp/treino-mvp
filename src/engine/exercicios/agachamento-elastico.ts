// @ts-nocheck
// Animação nova (aprovada). Agachamento com elástico: em pé, pisando no meio do elástico com os dois pés, cada mão
// numa ponta na frente dos ombros, cotovelos para baixo; o elástico sobe pela frente do corpo. Parte do agachamento
// com o peso do corpo aprovado (mesmo caminho do quadril e dos joelhos), com as mãos nos ombros (como no goblet) e a
// peça do elástico (band): a faixa sai de baixo do meio de cada pé e é mais curta em pé, onde estica mais.
// Técnica e fontes: docs/pesquisa/animacoes/agachamento-elastico.md.
import { L3, TX, band, bandHandle } from '../desenho';
import { X, add, mid } from '../math';

const sola=(sk,k)=>add(mid(sk.side[k].heel,sk.side[k].toe),[0,-1,0]);
const ex = {
  id:'agachamento-elastico',
  views:['lateral','frontal'],
  base:{legR:{ikS:[15,7,0],poleRel:[.35,.3,1],ft:[15,-18]},armR:{tr:[14,-6,14],poleRel:[.1,-1,.3]}},
  keys:{
    top:{P:[0,92.3,-1],lumbar:4,thor:4,neck:2},
    mid:{P:[0,65,-10],lumbar:20,thor:17,neck:8},
    bottom:{P:[0,32,-15],lumbar:34,thor:28,neck:14}
  },
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em pé',tempo:'elástico mais esticado',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · sem quicar',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho'],['K','L','']]},
  equip(sk){for(const k of['R','L']){band(this,k,sola(sk,k),sk.side[k].G,{bias:.4});bandHandle(sk.side[k].G,X);}},
  guides:{
    lateral(sk){TX(sk.side.R.K,'joelho pode',{cls:'lbl-g',dx:9,dy:12});TX(sk.side.R.K,'passar do pé',{cls:'lbl-g',dx:9,dy:25});TX([-15,0,-12],'calcanhar no chão',{cls:'lbl-g',anchor:'end',dy:-8});TX(sk.side.R.G,'mãos nos ombros',{cls:'lbl-g',dx:10,dy:-6});},
    frontal(sk){for(const k of['R','L']){const t=sk.side[k].toe;L3([t[0],1,t[2]],[t[0],60,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});}TX([0,1,0],'joelho na direção do pé',{cls:'lbl-g',anchor:'middle',dy:-6});}
  },
  muscles:{p:[['quads','RL']],s:[['glutes','RL'],['adutores','RL']]},
  errors:[
    {id:'valgo',view:'frontal',keys:{mid:{legR:{ikS:[15,7,0],poleRel:[-.22,.3,1],ft:[15,-18]}},bottom:{legR:{ikS:[15,7,0],poleRel:[-.22,.3,1],ft:[15,-18]}}}},
    {id:'lombar',view:'lateral',keys:{mid:{lumbar:28,thor:34},bottom:{P:[0,36,-19],lumbar:50,thor:64,neck:44}}},
    {id:'raso',view:'lateral',keys:{mid:{P:[0,82,-5],lumbar:10,thor:9},bottom:{P:[0,72,-8],lumbar:15,thor:13,neck:6}}}
  ]
};
export default ex;
