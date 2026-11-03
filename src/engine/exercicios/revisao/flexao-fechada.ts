// @ts-nocheck
// Animação nova (em revisão). Flexão de braço com as mãos juntas. Técnica e fontes: docs/pesquisa/animacoes/flexao-fechada.md.
// Parte da flexão aprovada (src/engine/exercicios/flexao.ts): as mesmas poses do tronco e das pernas, com as mãos
// na largura dos ombros, abaixo da parte baixa do peito, e os cotovelos rentes ao corpo.
import { L3, TX } from '../../desenho';
import { add, mul, sub } from '../../math';

const ex = {
  id:'flexao-fechada',
  views:['lateral','top'],
  base:{legR:{ikS:[9,9.5,-119.5],poleRel:[0,1,0],ft:[0,-34]},armR:{ikS:[14,3,-7],poleRel:[.25,.45,-1]},wrist:80,wristDir:[0,0,1]},
  keys:{
    top:{P:[0,43.8,-41.1],lumbar:66.5,thor:66.5,neck:70,pro:0},
    mid:{P:[0,28.8,-36.2],lumbar:77,thor:77,neck:80,pro:-2},
    bottom:{P:[0,15.3,-34.1],lumbar:85.6,thor:85.6,neck:87,pro:-4}
  },
  seq:[
    {path:['top'],dur:.4,kind:'hold',label:'Em cima',tempo:'prancha',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.35,kind:'hold',label:'Embaixo',tempo:'peito perto das mãos',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['N','','peito'],['E','R','cotovelo']],top:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){},
  guides:{
    lateral(sk){L3(sk.side.R.A,add(sk.Hc,mul(sub(sk.Hc,sk.side.R.A),.06)),'gd',.9,{layer:3,dash:'3 2.5'});TX(sk.P,'corpo em linha reta',{cls:'lbl-g',anchor:'middle',dy:-18});},
    top(sk){const o={cls:'lbl-g',size:10};TX([-38,0,-26],'cotovelos',{...o,anchor:'end'});TX([-38,0,-26],'rentes ao corpo',{...o,anchor:'end',dy:12});TX([36,0,-4],'mãos na largura',o);TX([36,0,-4],'dos ombros',{...o,dy:12});}
  },
  // Biblioteca: tríceps e peito principais; ombro anterior secundário. O abdômen só firma a prancha e fica fora do
  // desenho: a lista de "só ajuda" (estilo/musculos.ts) é do motor e não ganha entradas na revisão.
  muscles:{p:[['triceps','RL'],['pecStern','RL']],s:[['deltAnt','RL']]},
  errors:[
    {id:'cot',view:'top',base:{armR:{ikS:[14,3,-7],poleRel:[1,.4,-.1]}}},
    {id:'quadril',view:'lateral',keys:{top:{P:[0,33,-42],lumbar:54,thor:72},mid:{P:[0,19,-37],lumbar:65,thor:83},bottom:{P:[0,7,-35],lumbar:75,thor:91}}},
    {id:'curta',view:'lateral',keys:{bottom:{P:[0,28.8,-36.2],lumbar:77,thor:77,neck:80,pro:-2}}}
  ]
};
export default ex;
