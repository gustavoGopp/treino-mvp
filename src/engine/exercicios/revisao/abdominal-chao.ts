// @ts-nocheck
// Animação nova (em revisão). Abdominal no chão (crunch): deitado de costas, joelhos dobrados, pés no chão.
// Sobe só as escápulas, enrolando a parte de cima da coluna; a lombar fica no chão.
// Técnica e fontes: docs/pesquisa/animacoes/abdominal-chao.md.
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

const ex = {
  id:'abdominal-chao',
  views:['lateral'],
  base:{P:[0,11,0],lumbar:-88,legR:{ikS:[11,9,48],poleRel:[0,1,.2],ft:[4,-20]},armR:{tr:[4,-14,9],poleRel:[.6,-.2,1]}},
  keys:{
    down:{thor:-88,neck:-80},
    mid:{thor:-70,neck:-56},
    up:{thor:-52,neck:-36}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Deitado',tempo:'lombar no chão',breath:'INSPIRA'},
    {path:['down','mid','up'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['up'],dur:.8,kind:'hold',label:'Topo · contrai',tempo:'1 s',breath:'EXPIRA'},
    {path:['up','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','up'],
  paths:{lateral:[['N','','ombros']]},
  equip(sk){BOX([0,0.6,-10],[[X,30],[Y,0.6],[Z,70]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){L3([0,3,-22],[0,3,6],'gd',1.2,{layer:3,dash:'3 2.5'});TX([0,-6,-8],'lombar no chão',{cls:'lbl-g',anchor:'middle'});TX([0,46,-52],'sobe só as escápulas',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['rectus','R']],s:[['obliq','R']]},
  errors:[
    {id:'pescoco',view:'lateral',keys:{mid:{thor:-84,neck:-30},up:{thor:-80,neck:-6}}},
    {id:'lombar',view:'lateral',keys:{mid:{lumbar:-70,thor:-56,neck:-46},up:{lumbar:-50,thor:-30,neck:-22}}}
  ]
};
export default ex;
