// @ts-nocheck
// Animação nova (aprovada). Búlgaro com o peso do corpo: peito do pé de trás no assento de uma cadeira firme,
// encostada na parede, mãos na cintura. Parte do búlgaro aprovado, sem o halter, sem o banco e sem a torre.
// Técnica e fontes: docs/pesquisa/animacoes/bulgaro-peso-corpo.md.
import { CTX } from '../contexto';
import { BOX, L3, TX } from '../desenho';
import { X, Y, Z, add } from '../math';

const ex = {
  id:'bulgaro-peso-corpo',
  views:['lateral','frontal'],
  base:{lumbar:14,thor:16,neck:10,legR:{ikS:[11,7,30],poleRel:[.1,.4,1],ft:[5,-18]},legL:{ikS:[10,53,-56],poleRel:[0,-1,.3],ft:[180,-20],heelV:[0,4,5]},
    armR:{tr:[17,-44,0],poleRel:[1,-.2,-.5]}},
  keys:{top:{P:[0,80,-12]},mid:{P:[0,65,-12.5]},bottom:{P:[0,50,-13]}},
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em cima',tempo:'firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.3,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho da frente']]},
  // cadeira firme, sem rodinhas: assento a 45 cm, encosto do lado oposto à pessoa, encostada na parede
  equip(sk){
    BOX([0,43,-80],[[X,21],[Y,2],[Z,20]],'eqp',{bias:-4});
    for(const x of[-18,18])for(const z of[-62,-98])BOX([x,20.5,z],[[X,1.6],[Y,20.5],[Z,1.6]],'eqd',{bias:-6});
    for(const x of[-18,18])BOX([x,66,-98.5],[[X,1.6],[Y,21],[Z,1.6]],'eqd',{bias:-6});
    BOX([0,78,-98.5],[[X,20],[Y,8],[Z,1.4]],'eqp',{bias:-5});
    if(CTX.VIEW==='lateral')BOX([0,75,-103],[[X,40],[Y,75],[Z,2.5]],'eqp',{bias:-8,op:.45});
  },
  guides:{
    lateral(sk){L3(add(sk.P,[0,-12,0]),[0,1,sk.P[2]],'gd',.9,{layer:2,dash:'2 3'});TX([0,1,sk.P[2]],'desce reto',{cls:'lbl-g',anchor:'middle',dy:-5});TX([0,150,-103],'cadeira na parede',{cls:'lbl-g',anchor:'middle'});},
    frontal(sk){const t=sk.side.R.toe;L3([t[0],1,t[2]],[t[0],62,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});TX([t[0],30,t[2]],'joelho sobre o pé',{cls:'lbl-g',anchor:'end',dx:-16});}
  },
  muscles:{p:[['quads','R']],s:[['glutes','R']]},
  errors:[
    {id:'valgo',view:'frontal',keys:{mid:{legR:{ikS:[11,7,30],poleRel:[-.3,.4,1],ft:[5,-18]}},bottom:{legR:{ikS:[11,7,30],poleRel:[-.3,.4,1],ft:[5,-18]}}}},
    {id:'perto',view:'lateral',keys:{mid:{legR:{ikS:[11,12,12],poleRel:[.1,.4,1],ft:[5,-48]}},bottom:{legR:{ikS:[11,13,10],poleRel:[.1,.4,1],ft:[5,-52]}}}},
    {id:'raso',view:'lateral',keys:{bottom:{P:[0,66,-12.5]}}}
  ]
};
export default ex;
