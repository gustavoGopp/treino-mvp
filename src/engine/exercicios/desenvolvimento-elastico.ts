// @ts-nocheck
// Animação nova (aprovada). Desenvolvimento com elástico: em pé, pisando no meio do elástico com os dois pés, cada
// mão numa ponta na altura das orelhas, cotovelos um pouco à frente; empurra para cima e um pouco para dentro até os
// cotovelos quase estenderem. Parte do desenvolvimento sentado aprovado (mesmo caminho dos braços), em pé (o corpo da
// rosca alternada), com a peça do elástico (band) no lugar do halter: a faixa sai de baixo do meio de cada pé e sobe
// pela frente do corpo, afinando quando estica (a tensão sobe no topo).
// Técnica e fontes: docs/pesquisa/animacoes/desenvolvimento-elastico.md.
import { L3, TX, band, bandHandle } from '../desenho';
import { X, add, mid } from '../math';

const sola=(sk,k)=>add(mid(sk.side[k].heel,sk.side[k].toe),[0,-1,0]);
const ex = {
  id:'desenvolvimento-elastico',
  views:['frontal','lateral'],
  base:{P:[0,93,0],lumbar:-2,thor:-4,neck:-2,pro:-1,legR:{ikS:[12,7,0],poleRel:[.1,0,1],ft:[10,-20]}},
  keys:{bottom:{armR:{ua:[70,-15],fa:[-90,90]}},mid:{armR:{ua:[74,30],fa:[-90,87]}},top:{armR:{ua:[80,82],fa:[-90,84]}}},
  seq:[
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo',tempo:'altura das orelhas',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'elástico mais esticado',breath:'FIRME'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],
  paths:{frontal:[['G','R','mãos'],['G','L',''],['E','R','cotovelo']],lateral:[['G','R','mãos'],['E','R','cotovelo']]},
  equip(sk){for(const k of['R','L']){band(this,k,sola(sk,k),sk.side[k].G,{bias:.4});bandHandle(sk.side[k].G,X);}},
  guides:{
    frontal(sk){for(const k of['R','L']){const sd=sk.side[k];L3(sd.E,add(sd.E,[0,40,0]),'gd',1,{layer:3,dash:'3 2.5'});}const y=sk.Hc[1];L3([-72,y,0],[72,y,0],'gd',.8,{layer:2,dash:'2 3'});TX([72,y,0],'altura da orelha',{cls:'lbl-g',anchor:'end',dy:-6});TX(mid(sola(sk,'R'),sola(sk,'L')),'pise no meio do elástico',{cls:'lbl-g',anchor:'middle',dy:-8});},
    lateral(sk){L3(sk.P,add(sk.P,[0,52,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(sk.P,[0,26,12]),'abdômen firme,',{cls:'lbl-g'});TX(add(sk.P,[0,26,12]),'lombar parada',{cls:'lbl-g',dy:14});}
  },
  muscles:{p:[['deltAnt','RL'],['deltLat','RL']],s:[['triceps','RL'],['upTrap','RL']]},
  errors:[
    {id:'arco',view:'lateral',keys:{mid:{lumbar:-16,thor:-20},top:{P:[0,93,2],lumbar:-24,thor:-28,neck:-16}}},
    {id:'cotovelo',view:'frontal',keys:{bottom:{armR:{ua:[100,-12],fa:[-90,90]}},mid:{armR:{ua:[96,30],fa:[-90,87]}}}},
    {id:'curta',view:'frontal',keys:{bottom:{armR:{ua:[74,28],fa:[-90,87]}}}}
  ]
};
export default ex;
