// @ts-nocheck
// Animação nova (aprovada). Desenvolvimento unilateral com kettlebell, em pé: o kettlebell apoiado no antebraço na
// altura do ombro, a bola do lado de fora; sobe até o braço estender acima da cabeça. A outra mão na cintura. Parte do
// desenvolvimento aprovado (mesmo braço), em pé como a rosca. Técnica e fontes: docs/pesquisa/animacoes/desenvolvimento-unilateral-kettlebell.md.
import { L3, TX, kettlebell } from '../desenho';
import { X, Z, add, comb, norm, sub } from '../math';

const ex = {
  id:'desenvolvimento-unilateral-kettlebell',
  views:['frontal','lateral'],
  base:{P:[0,93,0],lumbar:0,thor:0,neck:0,legR:{ikS:[12,7,0],poleRel:[.1,0,1],ft:[10,-20]},armL:{tr:[17,-44,0],poleRel:[1,-.2,-.5]}},
  keys:{bottom:{armR:{ua:[20,-68],fa:[10,82]}},mid:{armR:{ua:[45,20],fa:[10,86]}},top:{armR:{ua:[20,84],fa:[15,87]}}},
  seq:[
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo',tempo:'na altura do ombro',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],
  paths:{frontal:[['G','R','mão'],['E','R','cotovelo']],lateral:[['G','R','mão'],['E','R','cotovelo']]},
  equip(sk){
    // a bola apoiada do lado de fora e atrás do antebraço; com o punho dobrado (erro), ela cai mais para trás
    const sd=sk.side.R,ante=norm(sub(sd.E,sd.G)),p=sk.pose.punho?1:0;
    kettlebell(sd.G,norm(comb(.5,ante,.75-.4*p,[-1,0,0],.45+.6*p,[0,0,-1])),Z,'db'+(this._pal==='e'?'-e':''),{layer:1.4});
  },
  guides:{
    frontal(sk){const sd=sk.side.R;L3(sd.E,add(sd.E,[0,40,0]),'gd',1,{layer:3,dash:'3 2.5'});TX(add(sk.Hc,[30,12,0]),'braço sobe reto',{cls:'lbl-g',anchor:'start'});},
    lateral(sk){TX(add(sk.Hc,[0,20,-20]),'tronco parado, sem arquear',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltAnt','R']],s:[['deltLat','R'],['triceps','R']]},
  errors:[
    {id:'arco',view:'lateral',keys:{mid:{lumbar:-20,thor:-24},top:{lumbar:-28,thor:-32,neck:-20}}},
    {id:'jogar',view:'lateral',keys:{bottom:{P:[0,86,2]},mid:{P:[0,91,1],lumbar:-8,thor:-10}}},
    {id:'punho',view:'lateral',keys:{bottom:{punho:1},mid:{punho:1}}}
  ]
};
export default ex;
