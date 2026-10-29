// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, cable, liftOf, tower } from '../desenho';
import { X, Y, add, comb, mid } from '../math';

const ex = {
  id:'rosca-polia',barAttach:true,
  views:['lateral'],
  base:{P:[0,93,0],lumbar:0,thor:0,neck:0,legR:{ikS:[12,7,2],poleRel:[0,0,1],ft:[8,-18]},armR:{ua:[0,-84],fa:[-10,-78]}},
  keys:{bottom:{},mid:{armR:{ua:[0,-84],fa:[-10,-10]}},top:{armR:{ua:[0,-84],fa:[-10,55]}}},
  seq:[
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'cabo tenso',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'contrai',breath:'FIRME'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],
  paths:{lateral:[['G','R','barra'],['E','R','cotovelo']]},
  tower:{x:0,z:52,ac:X,out:[0,0,-1],py:12},
  equip(sk){const hr=sk.side.R.G,hl=sk.side.L.G;L3(add(hr,[-6,0,0]),add(hl,[6,0,0]),'db'+(this._pal==='e'?'-e':''),2.8,{bias:.4});const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const L=cable(this,'a',mid(hr,hl),pul);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-44,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo parado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});}
  },
  muscles:{p:[['biceps','RL']],s:[['forearm','RL']]},
  errors:[
    {id:'cotovelo',view:'lateral',keys:{mid:{armR:{ua:[0,-70],fa:[-10,-5]}},top:{armR:{ua:[0,-45],fa:[-10,72]}}}},
    {id:'balanco',view:'lateral',keys:{bottom:{lumbar:10,thor:12},mid:{lumbar:-4,thor:-6},top:{P:[0,93,-4],lumbar:-14,thor:-18,neck:-10}}}
  ]
};
export default ex;
