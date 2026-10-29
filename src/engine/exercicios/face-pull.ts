// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, liftOf, rope, tower } from '../desenho';
import { X, Y, Z, add, comb } from '../math';

const ex = {
  id:'face-pull',ropeAttach:true,
  views:['lateral','top'],
  base:{P:[0,93,-2],lumbar:-4,thor:-6,neck:0,legR:{ikS:[11,7,2],poleRel:[0,0,1],ft:[8,-18]}},
  keys:{
    reach:{pro:4,elev:0,armR:{ikS:[9,152,56],poleRel:[1,-.35,-.1]}},
    mid:{pro:-1,elev:0,armR:{ikS:[17,156,30],poleRel:[1,-.15,-.35]}},
    pulled:{pro:-6,elev:-1,armR:{ikS:[27,159,2],poleRel:[1,-.1,-.4]}}
  },
  seq:[
    {path:['reach'],dur:.4,kind:'hold',label:'Braços estendidos',tempo:'',breath:'INSPIRA'},
    {path:['reach','mid','pulled'],dur:1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['pulled'],dur:1,kind:'hold',label:'Segura',tempo:'1 s',breath:'FIRME'},
    {path:['pulled','mid','reach'],dur:2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['reach','pulled'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']],top:[['G','R','mãos'],['G','L',''],['E','R','cotovelo'],['E','L','']]},
  tower:{x:0,z:130,ac:X,out:[0,0,-1],py:160},
  equip(sk){const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const L=rope(this,'a',sk,pul);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){const S=sk.side.R.S;L3(add(S,[0,0,-14]),add(S,[0,0,64]),'gd',.9,{layer:2,dash:'2 3'});TX(add(S,[0,0,20]),'cotovelos na altura dos ombros',{cls:'lbl-g',dy:16});},
    top(sk){TX(comb(1,sk.N,-30,Z),'mãos abrem ao lado da cabeça',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltPost','RL']],s:[['midTrap','RL']]},
  errors:[
    {id:'baixo',view:'lateral',keys:{mid:{armR:{ikS:[11,138,38],poleRel:[.4,-1,-.3]}},pulled:{armR:{ikS:[14,127,20],poleRel:[.3,-1,-.6]}}}},
    {id:'tronco',view:'lateral',keys:{mid:{lumbar:-12,thor:-14},pulled:{P:[0,93,-8],lumbar:-22,thor:-26,neck:-10}}},
    {id:'encolher',view:'lateral',keys:{mid:{elev:4,neck:12},pulled:{elev:7,neck:22}}}
  ]
};
export default ex;
