// @ts-nocheck
// Animação nova (em revisão). Panturrilha no degrau da escada, as duas pernas, calcanhares abaixo da borda,
// uma mão na parede (ou no corrimão) só para equilíbrio. Sem carga.
// Base: a geometria do step da `panturrilha-b` (aprovada) e a mão na parede da `panturrilha-chao` (aprovada);
// o degrau é a mesma caixa de 15 cm do step, sem peça nova de cena.
// Técnica e fontes: docs/pesquisa/animacoes/panturrilha-degrau.md.
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

const ex = {
  id:'panturrilha-degrau',
  views:['lateral','zoom'],noCable:true,bounds:{zoom:[-42,46,-52,3]},
  base:{lumbar:2,thor:2,neck:0,armR:{ikS:[20,128,43],poleRel:[.3,-1,-.2]}},
  keys:{
    stretch:{P:[0,93.1,-7.8],legR:{ikS:[11,8.6,-6.8],poleRel:[0,0,1],ft:[0,22]}},
    mid:{P:[0,104.75,-8.2],legR:{ikS:[11,20.25,-7.2],poleRel:[0,0,1],ft:[0,-18]}},
    top:{P:[0,113.4,-1.75],legR:{ikS:[11,28.9,-.75],poleRel:[0,0,1],ft:[0,-55]}}
  },
  seq:[
    {path:['stretch'],dur:1,kind:'hold',label:'Embaixo · alongado',tempo:'~1 s, sem quicar',breath:'INSPIRA'},
    {path:['stretch','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Topo · segura',tempo:'1 s',breath:'FIRME'},
    {path:['top','mid','stretch'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','top'],
  paths:{lateral:[['heel','R','calcanhar']],zoom:[['heel','R','calcanhar']]},
  equip(sk){BOX([-4,7.5,24],[[X,34],[Y,7.5],[Z,16]],'eqp',{bias:-3});BOX([0,90,46],[[X,45],[Y,90],[Z,2]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){TX([0,150,-20],'joelhos estendidos',{cls:'lbl-g',anchor:'middle'});L3([-11,15,8],[-11,15,-30],'gd',.9,{layer:3,dash:'2 3'});TX([-11,15,-30],'borda do degrau',{cls:'lbl-g',anchor:'end',dx:-4,dy:4});},
    zoom(sk){L3([-11,15,8],[-11,15,-38],'gd',.9,{layer:3,dash:'2 3'});TX([-11,15,-38],'borda do degrau',{cls:'lbl-g',dy:14});}
  },
  muscles:{p:[['calf','RL']],s:[]},
  errors:[
    {id:'curta',view:'lateral',keys:{stretch:{P:[0,101,-8.9],legR:{ikS:[11,16.5,-7.9],poleRel:[0,0,1],ft:[0,-5]}}}},
    {id:'joelho',view:'lateral',keys:{stretch:{P:[0,86,-10]},mid:{P:[0,100,-9]}}}
  ]
};
export default ex;
