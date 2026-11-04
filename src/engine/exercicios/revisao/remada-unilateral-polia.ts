// @ts-nocheck
// Animação nova (em revisão). Remada unilateral na polia baixa, com estribo: pé esquerdo à frente, mão livre na coxa
// da frente, tronco inclinado com as costas retas; o braço direito puxa o cabo, que vem da polia baixa à frente, com o
// cotovelo indo para trás em direção ao quadril. Parte da remada unilateral sem banco aprovada (mesmo corpo e mesmo
// fim do braço); o começo do braço segue a linha do cabo.
// Técnica e fontes: docs/pesquisa/animacoes/remada-unilateral-polia.md.
import { TX, bandHandle, cable, liftOf, tower } from '../../desenho';
import { X, Y, comb } from '../../math';

const ex = {
  id:'remada-unilateral-polia',
  views:['lateral','posterior'],
  base:{P:[0,84,-12],lumbar:58,thor:60,neck:46,
    legL:{ikS:[12,7,16],poleRel:[0,.2,1],ft:[6,-18]},
    legR:{ikS:[14,7,-34],poleRel:[0,.2,1],ft:[14,-24]},
    armL:{ikS:[12,58,10],poleRel:[.5,0,-1]}},
  keys:{
    stretch:{proR:6,elevR:1,armR:{ikS:[18,56,44],poleRel:[.3,0,-1]}},
    mid:{proR:0,elevR:0,armR:{ikS:[20,68,22],poleRel:[.25,1,-.5]}},
    end:{proR:-6,elevR:-1,armR:{ikS:[20,82,0],poleRel:[.2,1,-.6]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Alongado',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:1,kind:'hold',label:'Segura contraído',tempo:'1 s',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','mão'],['E','R','cotovelo']],posterior:[['E','R','cotovelo']]},
  tower:{x:-18,z:92,ac:X,out:[0,0,-1],py:20},
  equip(sk){const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const G=sk.side.R.G;const L=cable(this,'a',pul,G);bandHandle(G,X);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){TX([0,132,40],'costas retas',{cls:'lbl-g',anchor:'start'});TX([0,150,-40],'cotovelo vai ao quadril',{cls:'lbl-g',anchor:'middle'});},
    posterior(sk){TX([-40,128,0],'ombros e quadril',{cls:'lbl-g',anchor:'start'});TX([-40,128,0],'sem girar o tronco',{cls:'lbl-g',anchor:'start',dy:15});}
  },
  muscles:{p:[['lats','R'],['midTrap','R']],s:[['deltPost','R'],['biceps','R']]},
  errors:[
    {id:'gira',view:'posterior',keys:{mid:{roll:-10},end:{roll:-18}}},
    {id:'arred',view:'lateral',keys:{stretch:{lumbar:40,thor:88,neck:84},mid:{lumbar:42,thor:84,neck:80},end:{lumbar:44,thor:82,neck:78}}},
    {id:'curta',view:'lateral',keys:{stretch:{proR:0,armR:{ikS:[20,66,24],poleRel:[.25,1,-.5]}}}}
  ]
};
export default ex;
