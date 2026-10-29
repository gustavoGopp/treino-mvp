// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, liftOf, rope, tower } from '../desenho';
import { X, Y, add, comb, mul, sub } from '../math';

const ex = {
  id:'triceps-frances',ropeAttach:true,
  views:['lateral','frontal'],
  base:{P:[0,86,-4],lumbar:26,thor:30,neck:12,legR:{ikS:[12,7,28],poleRel:[.1,.3,1],ft:[6,-18]},legL:{ikS:[11,10,-40],poleRel:[0,-.3,1],ft:[0,-45],heelV:[0,3,-5]}},
  keys:{stretch:{armR:{ua:[-10,55],fa:[0,200]}},mid:{armR:{ua:[-10,55],fa:[0,145]}},end:{armR:{ua:[-10,55],fa:[0,62]}}},
  seq:[
    {path:['stretch'],dur:.5,kind:'hold',label:'Alongado',tempo:'mãos atrás da cabeça',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.4,kind:'hold',label:'Braços estendidos',tempo:'',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.3,kind:'ecc',label:'Volta · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']],frontal:[['E','R','cotovelo'],['E','L','']]},
  tower:{x:0,z:-60,ac:X,out:[0,0,1],py:150},
  equip(sk){const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const L=rope(this,'a',sk,pul);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,mul(sub(R.E,R.S),1.45)),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(R.E,mul(sub(R.E,R.S),.45)),'cotovelo parado',{cls:'lbl-g',dx:8});},
    frontal(sk){for(const k of['R','L']){const sd=sk.side[k];L3(sd.S,add(sd.S,mul(sub(sd.E,sd.S),1.35)),'gd',.9,{layer:3,dash:'3 2.5'});}TX(add(sk.Hc,[-28,-16,0]),'cotovelos',{cls:'lbl-g',anchor:'end'});TX(add(sk.Hc,[-28,-16,0]),'para a frente',{cls:'lbl-g',anchor:'end',dy:15});}
  },
  muscles:{p:[['triceps','RL']],s:[['rectus','R']]},
  errors:[
    {id:'abre',view:'frontal',keys:{stretch:{armR:{ua:[40,50],fa:[0,200]}},mid:{armR:{ua:[42,50],fa:[0,145]}},end:{armR:{ua:[30,52],fa:[0,62]}}}},
    {id:'cotovelo',view:'lateral',keys:{stretch:{armR:{ua:[-10,30],fa:[0,185]}},mid:{armR:{ua:[-10,40],fa:[0,135]}}}},
    {id:'curta',view:'lateral',keys:{stretch:{armR:{ua:[-10,55],fa:[0,150]}}}}
  ]
};
export default ex;
