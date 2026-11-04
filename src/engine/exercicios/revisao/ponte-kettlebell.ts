// @ts-nocheck
// Animação nova (em revisão). Ponte de glúteo com um kettlebell deitado sobre o quadril (com uma toalha embaixo), as
// duas mãos segurando para ele não rolar. Parte da ponte de glúteo aprovada (mesmo corpo e mesmo quadril).
// Técnica e fontes: docs/pesquisa/animacoes/ponte-kettlebell.md.
import { BOX, L3, TX, kettlebell } from '../../desenho';
import { X, Y, Z, comb } from '../../math';

const ex = {
  id:'ponte-kettlebell',
  views:['lateral'],
  base:{legR:{ikS:[11,7,34],poleRel:[0,1,.3],ft:[4,-18]},armR:{tr:[11,-47,15],poleRel:[1,0,0]}},
  keys:{
    down:{P:[0,12,0],lumbar:-90,thor:-90,neck:-90,armR:{ikS:[10.5,23,1],poleRel:[1,.4,0]}},
    mid:{P:[0,22,-1.7],lumbar:-101.5,thor:-101.5,neck:-91,armR:{ikS:[10.5,33,-2.9],poleRel:[1,.4,0]}},
    top:{P:[0,32.3,-5.2],lumbar:-114,thor:-114,neck:-92,armR:{ikS:[10.5,42.8,-8.8],poleRel:[1,.4,0]}}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Deitado',tempo:'firme o abdômen',breath:'INSPIRA'},
    {path:['down','mid','top'],dur:1.2,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Topo · segura',tempo:'~1 s',breath:'FIRME'},
    {path:['top','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','top'],
  paths:{lateral:[['P','','quadril']]},
  equip(sk){BOX([0,0.6,-18],[[X,30],[Y,0.6],[Z,74]],'eqp',{bias:-4});const c=comb(1,sk.P,11,sk.fL,-1,sk.uL);kettlebell(comb(1,c,-12,sk.uL),sk.uL,X,'db'+(this._pal==='e'?'-e':''),{layer:1.4});},
  guides:{
    lateral(sk){const R=sk.side.R;L3(sk.N,R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,72,-14],'ombro, quadril e joelho em linha',{cls:'lbl-g',anchor:'middle'});TX([0,0,42],'empurra pelo calcanhar',{cls:'lbl-g',anchor:'end',dy:13});}
  },
  muscles:{p:[['glutes','RL']],s:[]},
  errors:[
    {id:'lombar',view:'lateral',keys:{mid:{P:[0,25,-2.5],lumbar:-99,thor:-112,armR:{ikS:[10.5,36,-3.2],poleRel:[1,.4,0]}},top:{P:[0,38,-6],lumbar:-98,thor:-140,neck:-95,armR:{ikS:[10.5,49,-6.5],poleRel:[1,.4,0]}}}},
    {id:'calcanhar',view:'lateral',keys:{mid:{legR:{ikS:[11,10,36],poleRel:[0,1,.3],ft:[4,-35]}},top:{P:[0,33,-4.5],legR:{ikS:[11,13,38],poleRel:[0,1,.3],ft:[4,-48]},armR:{ikS:[10.5,43.5,-8.1],poleRel:[1,.4,0]}}}},
    {id:'raso',view:'lateral',keys:{mid:{P:[0,15,-.5],lumbar:-93.5,thor:-93.5,neck:-90.3,armR:{ikS:[10.5,26,-0.2],poleRel:[1,.4,0]}},top:{P:[0,18,-1],lumbar:-97,thor:-97,neck:-90.5,armR:{ikS:[10.5,29,-1.3],poleRel:[1,.4,0]}}}}
  ]
};
export default ex;
