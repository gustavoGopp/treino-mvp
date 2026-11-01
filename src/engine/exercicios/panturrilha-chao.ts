// @ts-nocheck
// Animação nova (aprovada). Panturrilha em pé no chão, as duas pernas, mãos na parede para equilíbrio.
// Técnica e fontes: docs/pesquisa/animacoes/panturrilha-chao.md.
import { ARROW3, BOX, L3, TX } from '../desenho';
import { X, Y, Z } from '../math';

const ex = {
  id:'panturrilha-chao',
  views:['lateral','zoom'],bounds:{zoom:[-30,40,-58,3]},
  base:{lumbar:2,thor:2,neck:0,armR:{ikS:[20,128,43],poleRel:[.3,-1,-.2]}},
  keys:{
    stretch:{P:[0,92.6,-2],legR:{ikS:[11,7,-1],poleRel:[0,0,1],ft:[8,-18]}},
    mid:{P:[0,98.6,-1.5],legR:{ikS:[11,13,-.5],poleRel:[0,0,1],ft:[8,-38]}},
    top:{P:[0,104.6,-1],legR:{ikS:[11,19,0],poleRel:[0,0,1],ft:[8,-55]}}
  },
  seq:[
    {path:['stretch'],dur:.6,kind:'hold',label:'Embaixo',tempo:'calcanhar no chão',breath:'INSPIRA'},
    {path:['stretch','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Topo · segura',tempo:'1 s',breath:'FIRME'},
    {path:['top','mid','stretch'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','top'],
  paths:{lateral:[['heel','R','calcanhar']],zoom:[['heel','R','calcanhar']]},
  equip(sk){BOX([0,90,46],[[X,45],[Y,90],[Z,2]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){TX([0,150,-20],'joelhos estendidos',{cls:'lbl-g',anchor:'middle'});ARROW3([0,8,-24],[0,24,-24],'gd',1.1,'gda',{layer:3});TX([0,16,-27],'sobe o máximo',{cls:'lbl-g',anchor:'end'});},
    zoom(sk){L3([-11,0.5,-14],[-11,0.5,24],'gd',.9,{layer:3,dash:'2 3'});TX([-11,0.5,-27],'calcanhar volta ao chão',{cls:'lbl-g',anchor:'start',dy:-10});}
  },
  muscles:{p:[['calf','R']],s:[]},
  errors:[
    {id:'curta',view:'lateral',keys:{top:{P:[0,98.6,-1.5],legR:{ikS:[11,13,-.5],poleRel:[0,0,1],ft:[8,-38]}}}},
    {id:'joelho',view:'lateral',keys:{stretch:{P:[0,84,-6]},mid:{P:[0,92,-4]}}}
  ]
};
export default ex;
