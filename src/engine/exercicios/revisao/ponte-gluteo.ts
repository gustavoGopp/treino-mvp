// @ts-nocheck
// Animação nova (em revisão). Ponte de glúteo com o peso do corpo: deitado de costas num colchonete, joelhos
// dobrados, pés no chão a cerca de um palmo dos glúteos, braços ao lado do corpo. O quadril sobe até ombros,
// quadril e joelhos ficarem em linha; ombros e cabeça ficam no chão. Pose nova (partes do abdominal no chão).
// Técnica e fontes: docs/pesquisa/animacoes/ponte-gluteo.md.
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

const ex = {
  id:'ponte-gluteo',
  views:['lateral'],
  base:{legR:{ikS:[11,7,36],poleRel:[0,1,.3],ft:[4,-18]},armR:{ua:[8,-7],fa:[8,-4]}},
  keys:{
    down:{P:[0,11,0],lumbar:-88,thor:-88,neck:-89},
    mid:{P:[0,23,-1.5],lumbar:-102,thor:-102,neck:-91},
    top:{P:[0,34,-3],lumbar:-115,thor:-115,neck:-93}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Deitado',tempo:'firme o abdômen',breath:'INSPIRA'},
    {path:['down','mid','top'],dur:1.2,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Topo · segura',tempo:'~1 s',breath:'FIRME'},
    {path:['top','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','top'],
  paths:{lateral:[['P','','quadril']]},
  equip(sk){BOX([0,0.6,-18],[[X,30],[Y,0.6],[Z,74]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){const R=sk.side.R;L3(sk.N,R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,72,-14],'ombro, quadril e joelho em linha',{cls:'lbl-g',anchor:'middle'});TX([0,0,42],'empurra pelo calcanhar',{cls:'lbl-g',anchor:'end',dy:13});}
  },
  muscles:{p:[['glutes','RL']],s:[]},
  errors:[
    {id:'lombar',view:'lateral',keys:{mid:{P:[0,26,-2],lumbar:-98,thor:-110},top:{P:[0,37,-5],lumbar:-94,thor:-142,neck:-96}}},
    {id:'calcanhar',view:'lateral',keys:{mid:{legR:{ikS:[11,10,38],poleRel:[0,1,.3],ft:[4,-35]}},top:{P:[0,35,-2],legR:{ikS:[11,13,40],poleRel:[0,1,.3],ft:[4,-48]}}}},
    {id:'raso',view:'lateral',keys:{mid:{P:[0,17,-.8],lumbar:-95,thor:-95,neck:-90},top:{P:[0,22,-1.5],lumbar:-102,thor:-102,neck:-91}}}
  ]
};
export default ex;
