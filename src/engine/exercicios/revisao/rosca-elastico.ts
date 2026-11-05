// @ts-nocheck
// Animação nova (em revisão). Rosca com elástico: em pé, pisando no meio do elástico com os dois pés, cada mão numa
// ponta; os dois antebraços sobem juntos com os cotovelos parados ao lado do tronco. Parte da rosca alternada aprovada
// (mesmo corpo em pé, mesmo caminho do antebraço), com os dois braços juntos e a peça do elástico (band) no lugar do
// halter: a faixa sai de baixo do meio de cada pé e afina quando estica (a tensão sobe no topo).
// Técnica e fontes: docs/pesquisa/animacoes/rosca-elastico.md.
import { L3, TX, band, bandHandle } from '../../desenho';
import { X, add, mid } from '../../math';

const baixo={ua:[0,-90],fa:[0,-86]};
const sola=(sk,k)=>add(mid(sk.side[k].heel,sk.side[k].toe),[0,-1,0]); // sob o meio do pé
const ex = {
  id:'rosca-elastico',
  views:['lateral','frontal'],
  base:{P:[0,93,0],lumbar:0,thor:0,neck:0,legR:{ikS:[12,7,0],poleRel:[.1,0,1],ft:[10,-20]}},
  keys:{
    bottom:{armR:baixo},
    mid:{armR:{ua:[0,-88],fa:[0,-5]}},
    top:{armR:{ua:[0,-84],fa:[0,62]}}
  },
  seq:[
    {path:['bottom'],dur:.5,kind:'hold',label:'Embaixo',tempo:'braços estendidos',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'elástico mais esticado',breath:'FIRME'},
    {path:['top','mid','bottom'],dur:2.2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']],frontal:[['G','R','mãos'],['G','L','']]},
  equip(sk){
    for(const k of['R','L']){band(this,k,sola(sk,k),sk.side[k].G,{bias:.4});bandHandle(sk.side[k].G,X);}
  },
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-40,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo parado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});TX([0,128,-14],'tronco parado',{cls:'lbl-g',anchor:'end'});},
    frontal(sk){TX(mid(sola(sk,'R'),sola(sk,'L')),'pise no meio do elástico',{cls:'lbl-g',anchor:'middle',dy:-8});}
  },
  muscles:{p:[['biceps','RL']],s:[['forearm','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{mid:{lumbar:-8,thor:-10,P:[0,93,2]},top:{lumbar:-14,thor:-16,neck:-8,P:[0,93,3]}}},
    {id:'cotovelo',view:'lateral',keys:{mid:{armR:{ua:[0,-66],fa:[0,10]}},top:{armR:{ua:[0,-36],fa:[0,74]}}}},
    {id:'curta',view:'lateral',keys:{bottom:{armR:{ua:[0,-90],fa:[0,-35]}}}}
  ]
};
export default ex;
