// @ts-nocheck
// Animação nova (aprovada). Tríceps francês unilateral na polia baixa, com estribo: de costas para a polia, pés
// alternados, tronco um pouco inclinado à frente; o braço direito fica acima da cabeça com o cotovelo apontado para
// cima e para a frente, e só o antebraço se move. Parte do tríceps francês na polia aprovado (mesmo braço e mesmo
// tronco); a polia passa para baixo, o cabo sobe pelas costas até a mão, e o outro braço fica solto.
// Técnica e fontes: docs/pesquisa/animacoes/triceps-frances-polia-unilateral.md.
import { L3, TX, bandHandle, cable, liftOf, tower } from '../desenho';
import { X, Y, add, comb, mul, sub } from '../math';

const solto={ua:[0,-90],fa:[0,-80]};
const ex = {
  id:'triceps-frances-polia-unilateral',
  views:['lateral','frontal'],
  base:{P:[0,86,-4],lumbar:22,thor:26,neck:10,legR:{ikS:[12,7,-34],poleRel:[0,-.3,1],ft:[0,-45],heelV:[0,3,-5]},legL:{ikS:[11,7,26],poleRel:[.1,.3,1],ft:[6,-18]},armL:solto},
  keys:{stretch:{armR:{ua:[-6,70],fa:[0,205]}},mid:{armR:{ua:[-6,70],fa:[0,150]}},end:{armR:{ua:[-6,70],fa:[0,66]}}},
  seq:[
    {path:['stretch'],dur:.5,kind:'hold',label:'Alongado',tempo:'mão atrás da cabeça',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.4,kind:'hold',label:'Braço estendido',tempo:'',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.3,kind:'ecc',label:'Volta · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','mão'],['E','R','cotovelo']],frontal:[['E','R','cotovelo']]},
  tower:{x:-10,z:-58,ac:X,out:[0,0,1],py:22},
  equip(sk){const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const G=sk.side.R.G;const L=cable(this,'a',pul,G);bandHandle(G,X);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,mul(sub(R.E,R.S),1.45)),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(R.E,mul(sub(R.E,R.S),.45)),'cotovelo parado',{cls:'lbl-g',dx:8});},
    frontal(sk){const sd=sk.side.R;L3(sd.S,add(sd.S,mul(sub(sd.E,sd.S),1.35)),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(sk.Hc,[-28,-16,0]),'cotovelo perto',{cls:'lbl-g',anchor:'end'});TX(add(sk.Hc,[-28,-16,0]),'da cabeça',{cls:'lbl-g',anchor:'end',dy:15});}
  },
  muscles:{p:[['triceps','R']],s:[]},
  errors:[
    {id:'abre',view:'frontal',keys:{stretch:{armR:{ua:[40,63],fa:[0,205]}},mid:{armR:{ua:[42,63],fa:[0,150]}},end:{armR:{ua:[30,65],fa:[0,66]}}}},
    {id:'arco',view:'lateral',keys:{mid:{lumbar:4,thor:-6,neck:-8},end:{lumbar:-2,thor:-14,neck:-14,P:[0,86,0]}}},
    {id:'curta',view:'lateral',keys:{stretch:{armR:{ua:[-6,70],fa:[0,150]}}}}
  ]
};
export default ex;
