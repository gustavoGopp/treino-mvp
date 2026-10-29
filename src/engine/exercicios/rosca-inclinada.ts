// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbell } from '../desenho';
import { RI } from '../exercicios/compartilhado';
import { X, Y, Z, add, comb } from '../math';

const ex = {
  id:'rosca-inclinada',
  views:['lateral'],
  base:{P:[0,53,0],lumbar:-40,thor:-40,neck:-28,pro:-3,legR:{ikS:[18,7,42],poleRel:[.3,.5,1],ft:[12,-20]}},
  keys:{bottom:{armR:{ua:[0,-90],fa:[0,-83]}},mid:{armR:{ua:[0,-90],fa:[0,-5]}},top:{armR:{ua:[0,-90],fa:[0,45]}}},
  seq:[
    {path:['bottom'],dur:.6,kind:'hold',label:'Embaixo · alongado',tempo:'braço estendido',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']]},
  equip(sk){
    BOX([0,45,8],[[X,13],[Y,2.5],[Z,17]],'eqp',{bias:-4});
    BOX(comb(1,[0,53,0],36,RI.u,-10.5,RI.f),[[X,13],[RI.u,36],[RI.f,2.5]],'eqp',{bias:-4});
    BOX([0,2.5,0],[[X,4],[Y,2],[Z,36]],'eqd',{bias:-6});BOX([0,22,4],[[X,2.5],[Y,20],[Z,2.5]],'eqd',{bias:-6});
    const c='db'+(this._pal==='e'?'-e':'');for(const k of['R','L'])dumbbell(sk.side[k].G,X,c);
  },
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-44,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo parado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});
      TX([0,112,48],'encosto a 45–60°',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['biceps','RL']],s:[['forearm','RL']]},
  errors:[
    {id:'cotovelo',view:'lateral',keys:{mid:{armR:{ua:[0,-68],fa:[0,10]}},top:{armR:{ua:[0,-38],fa:[0,72]}}}},
    {id:'ombro',view:'lateral',keys:{mid:{lumbar:-34,thor:-28,neck:-20,pro:5},top:{lumbar:-30,thor:-20,neck:-12,pro:9,armR:{ua:[0,-62],fa:[0,62]}}}},
    {id:'curta',view:'lateral',keys:{bottom:{armR:{ua:[0,-90],fa:[0,-35]}}}}
  ]
};
export default ex;
