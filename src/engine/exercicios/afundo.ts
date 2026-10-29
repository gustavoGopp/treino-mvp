// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, dumbbell } from '../desenho';
import { Z, add } from '../math';

const ex = {
  id:'afundo',
  views:['lateral','frontal'],
  base:{lumbar:4,thor:4,neck:2,legR:{ikS:[10,7,28],poleRel:[.1,.4,1],ft:[5,-18]},legL:{ikS:[10,14,-52],poleRel:[0,-1,.4],ft:[0,-50],heelV:[0,3,-5]},armR:{ua:[0,-90],fa:[0,-89]}},
  keys:{top:{P:[0,83,-11]},mid:{P:[0,66,-11.5]},bottom:{P:[0,51,-12]}},
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em cima',tempo:'respire e firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.3,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho da frente']]},
  equip(sk){for(const k of['R','L'])dumbbell(sk.side[k].G,Z,'db'+(this._pal==='e'?'-e':''));},
  guides:{
    lateral(sk){L3(add(sk.P,[0,-12,0]),[0,1,sk.P[2]],'gd',.9,{layer:2,dash:'2 3'});TX([0,1,sk.P[2]],'desce reto',{cls:'lbl-g',anchor:'middle',dy:-5});},
    frontal(sk){const t=sk.side.R.toe;L3([t[0],1,t[2]],[t[0],62,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});TX([t[0],30,t[2]],'joelho sobre o pé',{cls:'lbl-g',anchor:'end',dx:-16});}
  },
  muscles:{p:[['quads','R'],['glutes','R']],s:[['quads','L']]},
  errors:[
    {id:'valgo',view:'frontal',keys:{mid:{legR:{ikS:[10,7,28],poleRel:[-.3,.4,1],ft:[5,-18]}},bottom:{legR:{ikS:[10,7,28],poleRel:[-.3,.4,1],ft:[5,-18]}}}},
    {id:'tronco',view:'lateral',keys:{mid:{lumbar:16,thor:18},bottom:{lumbar:28,thor:34,neck:30}}},
    {id:'raso',view:'lateral',keys:{mid:{P:[0,76,-11.2]},bottom:{P:[0,70,-11.5]}}}
  ]
};
export default ex;
