// @ts-nocheck
// Animação nova (aprovada). Elevação lateral com elástico: em pé, pisando no meio do elástico com os dois pés, cada
// mão numa ponta; os braços sobem para fora e um pouco à frente até a linha dos ombros, cotovelo um pouco acima da
// mão. Parte da elevação com halteres aprovada (mesmo corpo e mesmo caminho do braço), com a peça do elástico (band)
// no lugar do halter: a faixa sai de baixo do meio de cada pé e afina quando estica (a tensão sobe no topo).
// Técnica e fontes: docs/pesquisa/animacoes/elevacao-lateral-elastico.md.
import { L3, TX, band, bandHandle } from '../desenho';
import { Y, Z, add, comb, mid } from '../math';

const sola=(sk,k)=>add(mid(sk.side[k].heel,sk.side[k].toe),[0,-1,0]);
const ex = {
  id:'elevacao-lateral-elastico',
  views:['frontal','lateral'],
  base:{P:[0,93,0],lumbar:8,thor:10,neck:6,legR:{ikS:[11,7,2],poleRel:[0,0,1],ft:[8,-18]}},
  keys:{low:{armR:{sph:[20,-80,62],poleRel:[1,.2,-.3]}},mid:{armR:{sph:[45,-38,62],poleRel:[.7,.6,-.5]}},high:{armR:{sph:[60,-3,62],poleRel:[.25,1,-.5]}}},
  seq:[
    {path:['low'],dur:.3,kind:'hold',label:'Embaixo',tempo:'',breath:'INSPIRA'},
    {path:['low','mid','high'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['high'],dur:.25,kind:'hold',label:'Linha do ombro',tempo:'elástico mais esticado',breath:'FIRME'},
    {path:['high','mid','low'],dur:2.1,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['low','high'],
  paths:{frontal:[['G','R','mão'],['E','R','cotovelo']],lateral:[['G','R','mão']]},
  equip(sk){for(const k of['R','L']){band(this,k,sola(sk,k),sk.side[k].G,{bias:.4});bandHandle(sk.side[k].G,Z);}},
  guides:{
    frontal(sk){const S=sk.side.R.S;L3(add(S,[6,0,0]),add(S,[-80,0,0]),'gd',.9,{layer:2,dash:'2 3'});TX(add(S,[-80,0,0]),'linha do ombro',{cls:'lbl-g',dy:-6});TX(mid(sola(sk,'R'),sola(sk,'L')),'pise no meio do elástico',{cls:'lbl-g',anchor:'middle',dy:-8});},
    lateral(sk){TX(comb(1,sk.side.R.S,22,Z,44,Y),'tronco levemente à frente',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltLat','RL']],s:[['deltAnt','RL'],['upTrap','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{low:{lumbar:22,thor:26},mid:{P:[0,90,0],lumbar:-4,thor:-6},high:{lumbar:-6,thor:-8}}},
    {id:'encolher',view:'frontal',keys:{mid:{elev:4},high:{elev:7}}},
    {id:'frontal',view:'lateral',keys:{mid:{armR:{sph:[5,-36,62],poleRel:[.8,.6,-.3]}},high:{armR:{sph:[12,-3,62],poleRel:[.6,1,-.2]}}}}
  ]
};
export default ex;
