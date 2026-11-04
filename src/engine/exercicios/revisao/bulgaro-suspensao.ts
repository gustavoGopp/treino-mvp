// @ts-nocheck
// Animação nova (em revisão). Búlgaro com o pé de trás na suspensão: de costas para a âncora, peito do pé de trás na
// alça (na altura do meio da canela), mãos na cintura; desce reto e o pé de trás vai para trás com a fita; sobe
// empurrando o chão com o pé da frente. Parte do búlgaro com o peso do corpo aprovado (mesmo corpo e mesmo caminho),
// com a alça no lugar da cadeira. Técnica e fontes: docs/pesquisa/animacoes/bulgaro-suspensao.md.
import { L3, TX, suspensao } from '../../desenho';
import { add, mid } from '../../math';

const ANC = [0, 205, -78]; // âncora no alto, atrás da pessoa
const ex = {
  id:'bulgaro-suspensao',
  views:['lateral','frontal'],
  bounds:{lateral:[-115,60,-150,8]},
  base:{lumbar:14,thor:16,neck:10,legR:{ikS:[11,7,30],poleRel:[.1,.4,1],ft:[5,-18]},
    armR:{tr:[17,-44,0],poleRel:[1,-.2,-.5]}},
  keys:{
    top:{P:[0,80,-12],legL:{ikS:[10,28,-58],poleRel:[0,-1,.3],ft:[180,-45],heelV:[0,4,5]}},
    mid:{P:[0,65,-12.5],legL:{ikS:[10,29,-62],poleRel:[0,-1,.3],ft:[180,-45],heelV:[0,4,5]}},
    bottom:{P:[0,50,-13],legL:{ikS:[10,30,-66],poleRel:[0,-1,.3],ft:[180,-45],heelV:[0,4,5]}}
  },
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em cima',tempo:'firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.3,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho da frente']]},
  equip(sk){const L=sk.side.L;suspensao(this,'f',ANC,[add(mid(L.A,L.toe),[0,3,0])],'db'+(this._pal==='e'?'-e':''),{pe:true,tira:140});},
  guides:{
    lateral(sk){L3(add(sk.P,[0,-12,0]),[0,1,sk.P[2]],'gd',.9,{layer:2,dash:'2 3'});TX([0,1,sk.P[2]],'desce reto',{cls:'lbl-g',anchor:'middle',dy:-5});TX([0,140,-100],'alça no meio da canela',{cls:'lbl-g',anchor:'middle'});},
    frontal(sk){const t=sk.side.R.toe;L3([t[0],1,t[2]],[t[0],62,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});TX([t[0],30,t[2]],'joelho sobre o pé',{cls:'lbl-g',anchor:'end',dx:-16});}
  },
  muscles:{p:[['quads','R']],s:[['glutes','R']]},
  errors:[
    {id:'valgo',view:'frontal',keys:{mid:{legR:{ikS:[11,7,30],poleRel:[-.3,.4,1],ft:[5,-18]}},bottom:{legR:{ikS:[11,7,30],poleRel:[-.3,.4,1],ft:[5,-18]}}}},
    // empurrar com o pé de trás: a perna de trás estica na alça e o quadril vai para trás e para cima
    {id:'empurra',view:'lateral',keys:{mid:{P:[0,68,-18],legL:{ikS:[10,36,-74],poleRel:[0,-1,.3],ft:[180,-45],heelV:[0,4,5]}},bottom:{P:[0,56,-22],legL:{ikS:[10,38,-80],poleRel:[0,-1,.3],ft:[180,-45],heelV:[0,4,5]}}}},
    {id:'raso',view:'lateral',keys:{bottom:{P:[0,66,-12.5],legL:{ikS:[10,29,-62],poleRel:[0,-1,.3],ft:[180,-45],heelV:[0,4,5]}}}}
  ]
};
export default ex;
