// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, liftOf, rope, tower } from '../desenho';
import { X, Y, add, comb } from '../math';

const ex = {
  id:'triceps-corda',ropeAttach:true,
  views:['lateral'],
  base:{P:[0,93,0],lumbar:8,thor:10,neck:8,legR:{ikS:[12,7,-4],poleRel:[0,0,1],ft:[8,-18]}},
  keys:{up:{armR:{ua:[5,-84],fa:[-5,22]}},mid:{armR:{ua:[5,-84],fa:[25,-35]}},down:{armR:{ua:[5,-84],fa:[70,-78]}}},
  seq:[
    {path:['up'],dur:.4,kind:'hold',label:'Em cima',tempo:'cotovelos colados',breath:'INSPIRA'},
    {path:['up','mid','down'],dur:1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['down'],dur:.5,kind:'hold',label:'Embaixo · corda aberta',tempo:'contrai',breath:'FIRME'},
    {path:['down','mid','up'],dur:2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['up','down'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']]},
  tower:{x:0,z:66,ac:X,out:[0,0,-1],py:205},
  equip(sk){const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const L=rope(this,'a',sk,pul);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-44,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo colado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});}
  },
  muscles:{p:[['triceps','RL']],s:[]},
  errors:[
    {id:'cotovelo',view:'lateral',keys:{up:{armR:{ua:[0,-45],fa:[-5,45]}},mid:{armR:{ua:[0,-62],fa:[20,-20]}}}},
    {id:'tronco',view:'lateral',keys:{mid:{lumbar:18,thor:24},down:{lumbar:28,thor:38,neck:30}}}
  ]
};
export default ex;
