// @ts-nocheck
// Animação nova (em revisão). Flexão com os pés elevados: as pontas dos pés no assento de uma cadeira firme encostada
// na parede, mãos no chão um pouco mais abertas que os ombros, na linha do peito; o corpo em linha reta, inclinado
// com a cabeça mais baixa que os pés; desce o corpo inteiro até o peito perto do chão e sobe.
// Base: a `flexao` (aprovada: mãos, punhos, ciclo, guias e erros) e a cadeira do `bulgaro-peso-corpo` (aprovada:
// assento a 45 cm, encostada na parede), deslocada para trás dos pés. Sem peça nova de cena.
// Técnica e fontes: docs/pesquisa/animacoes/flexao-pes-elevados.md.
import { CTX } from '../../contexto';
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z, add, mul, sub } from '../../math';

const DZ = -42; // a cadeira do búlgaro (assento em z = -80) levada para trás dos pés
const ex = {
  id:'flexao-pes-elevados',
  views:['lateral','top'],
  base:{legR:{ikS:[9,54.5,-122],poleRel:[0,1,0],ft:[0,-34]},armR:{ikS:[30,3,-3],poleRel:[.7,.5,-1]},wrist:80,wristDir:[0,0,1]},
  keys:{
    top:{P:[0,59.6,-36.6],lumbar:86.6,thor:86.6,neck:89,pro:0},
    mid:{P:[0,45.6,-36.9],lumbar:96,thor:96,neck:98,pro:-2},
    bottom:{P:[0,32.4,-39.3],lumbar:105,thor:105,neck:107,pro:-4}
  },
  seq:[
    {path:['top'],dur:.4,kind:'hold',label:'Em cima',tempo:'prancha, pés na cadeira',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.35,kind:'hold',label:'Embaixo',tempo:'peito perto do chão',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['N','','peito'],['E','R','cotovelo']],top:[['E','R','cotovelo'],['E','L','']]},
  // cadeira firme, sem rodinhas, encostada na parede (a do búlgaro com o peso do corpo)
  equip(sk){
    BOX([0,43,-80+DZ],[[X,21],[Y,2],[Z,20]],'eqp',{bias:-4});
    for(const x of[-18,18])for(const z of[-62,-98])BOX([x,20.5,z+DZ],[[X,1.6],[Y,20.5],[Z,1.6]],'eqd',{bias:-6});
    for(const x of[-18,18])BOX([x,66,-98.5+DZ],[[X,1.6],[Y,21],[Z,1.6]],'eqd',{bias:-6});
    BOX([0,78,-98.5+DZ],[[X,20],[Y,8],[Z,1.4]],'eqp',{bias:-5});
    if(CTX.VIEW==='lateral')BOX([0,75,-103+DZ],[[X,40],[Y,75],[Z,2.5]],'eqp',{bias:-8,op:.45});
  },
  guides:{
    lateral(sk){L3(sk.side.R.A,add(sk.Hc,mul(sub(sk.Hc,sk.side.R.A),.06)),'gd',.9,{layer:3,dash:'3 2.5'});TX(sk.P,'corpo em linha reta',{cls:'lbl-g',anchor:'middle',dy:-18});TX([0,140,-150],'cadeira na parede',{cls:'lbl-g',anchor:'start',dx:6});},
    top(sk){TX([-44,0,-4],'cotovelos ~45° do tronco',{cls:'lbl-g',size:10,anchor:'end'});TX([44,0,-4],'mãos na linha do peito',{cls:'lbl-g',size:10});}
  },
  muscles:{p:[['pecStern','RL']],s:[['triceps','RL'],['deltAnt','RL'],['rectus','R']]},
  errors:[
    {id:'quadril',view:'lateral',keys:{top:{P:[0,50,-37.1],lumbar:74,thor:92},mid:{P:[0,37,-38.8],lumbar:84,thor:101},bottom:{P:[0,25,-42.3],lumbar:94,thor:110}}},
    {id:'cot',view:'top',base:{armR:{ikS:[33,3,0],poleRel:[1,.4,-.05]}}},
    {id:'curta',view:'lateral',keys:{bottom:{P:[0,45.6,-36.9],lumbar:96,thor:96,neck:98,pro:-2}}}
  ]
};
export default ex;
