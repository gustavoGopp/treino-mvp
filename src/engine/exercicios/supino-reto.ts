// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbell } from '../desenho';
import { X, Y, Z, add, mul, norm, sub } from '../math';

/* ================= exercícios: Torso B ================= */
const ex = {
  id:'supino-reto',
  views:['lateral','top'],
  base:{P:[0,53,0],lumbar:-90,thor:-90,neck:-82,pro:-2,elev:-1,legR:{ikS:[16,7,38],poleRel:[.3,.6,1],ft:[10,-22]}},
  keys:{top:{armR:{ua:[90,84],fa:[-90,86]}},mid:{armR:{ua:[65,25],fa:[-90,86]}},bottom:{armR:{ua:[50,-20],fa:[-90,90]}}},
  seq:[
    {path:['top'],dur:.6,kind:'hold',label:'Topo',tempo:'respire',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · sem quicar',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['bottom','top'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],top:[['G','R','halter'],['G','L',''],['E','R','cotovelo']]},
  equip(sk){
    BOX([0,42.5,-34],[[X,13],[Y,2.5],[Z,54]],'eqp',{bias:-4});BOX([0,2.5,-34],[[X,4],[Y,2],[Z,46]],'eqd',{bias:-6});
    for(const z of[-72,6])BOX([0,21,z],[[X,2.5],[Y,18.5],[Z,2.5]],'eqd',{bias:-6});
    const c='db'+(this._pal==='e'?'-e':'');dumbbell(sk.side.R.G,norm([1,0,-.55]),c);dumbbell(sk.side.L.G,norm([1,0,.55]),c);
  },
  guides:{
    lateral(sk){const sd=sk.side.R;L3(sd.E,add(sd.E,[0,44,0]),'gd',1,{layer:3,dash:'3 2.5'});TX(sd.G,'antebraço na vertical',{cls:'lbl-g',dx:16,dy:4});},
    top(sk){const R=sk.side.R;L3(R.S,add(R.S,mul(sk.uT,-30)),'gd',1,{layer:3,dash:'3 2.5'});L3(R.S,add(R.S,mul(sub(R.E,R.S),1.25)),'gd',1,{layer:3,dash:'3 2.5'});
      TX([-36,0,-8],'cotovelo ~30–70° do tronco',{cls:'lbl-g',size:10,anchor:'end',dx:8});TX([36,0,-8],'halter sobre o cotovelo',{cls:'lbl-g',size:10,dx:-8});}
  },
  muscles:{p:[['pecStern','RL']],s:[['pecClav','RL'],['deltAnt','RL'],['triceps','RL']]},
  errors:[
    {id:'cot',view:'top',keys:{mid:{armR:{ua:[90,25],fa:[-90,86]}},bottom:{armR:{ua:[92,-15],fa:[-90,90]}}}},
    {id:'escap',view:'lateral',keys:{mid:{pro:6},top:{pro:13,elev:3}}},
    {id:'curta',view:'lateral',keys:{bottom:{armR:{ua:[63,18],fa:[-90,86]}}}}
  ]
};
export default ex;
