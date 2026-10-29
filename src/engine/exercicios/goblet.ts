// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbellV } from '../desenho';
import { X, Y, Z, add, mid } from '../math';

/* ================= exercícios: Membros A ================= */
const ex = {
  id:'goblet',
  views:['lateral','frontal'],
  base:{legR:{ikS:[15,10,0],poleRel:[.35,.3,1],ft:[15,-30],heelV:[0,-6.5,-4]},armR:{tr:[6,-10,16],poleRel:[.25,-1,.1]}},
  keys:{top:{P:[0,95.3,-1],lumbar:6,thor:6,neck:2},mid:{P:[0,66,-9],lumbar:18,thor:16,neck:8},bottom:{P:[0,39,-15],lumbar:30,thor:26,neck:14}},
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em pé',tempo:'respire e firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · sem quicar',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho'],['K','L','']]},
  equip(sk){
    for(const s of[-1,1])BOX([s*15,1.6,-4],[[X,7],[Y,1.6],[Z,9]],'eqd',{bias:-1});
    const top=add(mid(sk.side.R.G,sk.side.L.G),[0,3,0]);dumbbellV(top,'db'+(this._pal==='e'?'-e':''));
  },
  guides:{
    lateral(sk){TX(sk.side.R.K,'joelho pode',{cls:'lbl-g',dx:8,dy:-20});TX(sk.side.R.K,'passar do pé',{cls:'lbl-g',dx:8,dy:-7});TX([-15,0,-12],'anilha sob o calcanhar',{cls:'lbl-g',anchor:'end',dy:-8});},
    frontal(sk){for(const k of['R','L']){const t=sk.side[k].toe;L3([t[0],1,t[2]],[t[0],60,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});}TX([0,1,0],'joelho na direção do pé',{cls:'lbl-g',anchor:'middle',dy:-6});}
  },
  muscles:{p:[['quads','RL']],s:[['glutes','RL']]},
  errors:[
    {id:'valgo',view:'frontal',keys:{mid:{legR:{ikS:[15,10,0],poleRel:[-.22,.3,1],ft:[15,-30],heelV:[0,-6.5,-4]}},bottom:{legR:{ikS:[15,10,0],poleRel:[-.22,.3,1],ft:[15,-30],heelV:[0,-6.5,-4]}}}},
    {id:'lombar',view:'lateral',keys:{mid:{lumbar:26,thor:32},bottom:{P:[0,41,-19],lumbar:46,thor:60,neck:40}}},
    {id:'raso',view:'lateral',keys:{mid:{P:[0,83,-5],lumbar:10,thor:10},bottom:{P:[0,72,-8],lumbar:14,thor:13,neck:6}}}
  ]
};
export default ex;
