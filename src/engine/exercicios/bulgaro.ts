// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { CTX } from '../contexto';
import { BOX, L3, TX, dumbbell, tower } from '../desenho';
import { X, Y, Z, add } from '../math';

/* ================= exercícios: Membros B ================= */
const ex = {
  id:'bulgaro',
  views:['lateral','frontal'],noCable:true,
  base:{lumbar:14,thor:16,neck:10,legR:{ikS:[11,7,30],poleRel:[.1,.4,1],ft:[5,-18]},legL:{ikS:[10,53,-56],poleRel:[0,-1,.3],ft:[180,-20],heelV:[0,4,5]},
    armR:{ua:[0,-90],fa:[0,-89]},armL:{ikS:[47,100,0],poleRel:[.4,-1,-.2]}},
  keys:{top:{P:[0,80,-12]},mid:{P:[0,65,-12.5]},bottom:{P:[0,50,-13]}},
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em cima',tempo:'firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.3,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho da frente']]},
  tower:{x:51,z:0,ac:Z,out:[-1,0,0],py:12},
  equip(sk){
    BOX([0,42.5,-84],[[X,13],[Y,2.5],[Z,31]],'eqp',{bias:-4});
    for(const z of[-110,-58])BOX([0,21,z],[[X,2.5],[Y,19],[Z,2.5]],'eqd',{bias:-6});BOX([0,2.5,-84],[[X,4],[Y,2],[Z,28]],'eqd',{bias:-6});
    dumbbell(sk.side.R.G,Z,'db'+(this._pal==='e'?'-e':''));if(CTX.VIEW!=='lateral')tower(this.tower,0);
  },
  guides:{
    lateral(sk){L3(add(sk.P,[0,-12,0]),[0,1,sk.P[2]],'gd',.9,{layer:2,dash:'2 3'});TX([0,1,sk.P[2]],'desce reto',{cls:'lbl-g',anchor:'middle',dy:-5});},
    frontal(sk){const t=sk.side.R.toe;L3([t[0],1,t[2]],[t[0],62,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});TX([t[0],30,t[2]],'joelho sobre o pé',{cls:'lbl-g',anchor:'end',dx:-16});}
  },
  muscles:{p:[['quads','R'],['glutes','R']],s:[]},
  errors:[
    {id:'valgo',view:'frontal',keys:{mid:{legR:{ikS:[11,7,30],poleRel:[-.3,.4,1],ft:[5,-18]}},bottom:{legR:{ikS:[11,7,30],poleRel:[-.3,.4,1],ft:[5,-18]}}}},
    {id:'perto',view:'lateral',keys:{mid:{legR:{ikS:[11,12,12],poleRel:[.1,.4,1],ft:[5,-48]}},bottom:{legR:{ikS:[11,13,10],poleRel:[.1,.4,1],ft:[5,-52]}}}},
    {id:'raso',view:'lateral',keys:{bottom:{P:[0,66,-12.5]}}}
  ]
};
export default ex;
