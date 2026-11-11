// @ts-nocheck
// Animação nova (aprovada). Afundo para trás com o peso do corpo: em pé com os pés juntos (na largura do quadril),
// mãos na cintura; dá um passo largo para trás com a perna esquerda e desce até o joelho de trás quase tocar o chão,
// tronco quase vertical e o peso no pé da frente; empurra com o pé da frente e volta a ficar em pé.
// Técnica e fontes: docs/pesquisa/animacoes/afundo-tras-peso-corpo.md.
// Base: o afundo com o peso do corpo aprovado (afundo-peso-corpo): o mesmo corpo, as mesmas mãos, o mesmo pé da frente
// (fixo no chão o ciclo inteiro) e a mesma posição embaixo. O que é novo é o passo: em pé, com o pé de trás ao lado do da
// frente; no meio do passo, o pé de trás no ar, indo para trás; e o apoio, que é a posição de cima do afundo aprovado.
// O calcanhar do pé de trás (heelV) vai de apoiado (em pé) a levantado (no afundo), como o motor interpola as juntas.
import { L3, TX } from '../desenho';
import { add } from '../math';

const PE_FRENTE = { ikS: [10, 7, 28], poleRel: [.1, .4, 1], ft: [5, -18] };
const ex = {
  id:'afundo-tras-peso-corpo',
  views:['lateral','frontal'],
  base:{lumbar:4,thor:4,neck:2,legR:PE_FRENTE,armR:{tr:[17,-44,0],poleRel:[1,-.2,-.5]}},
  keys:{
    // em pé, os dois pés juntos, o quadril sobre eles
    top:{P:[0,92,26],lumbar:2,thor:2,neck:0,legL:{ikS:[10,7,28],poleRel:[0,.2,1],ft:[5,-18],heelV:[0,-2.2,-5.7]}},
    // o passo: o quadril vai para trás e desce um pouco; o pé de trás no ar, a meio caminho
    passo:{P:[0,88,8],legL:{ikS:[10,22,-22],poleRel:[0,-1,.4],ft:[0,-40],heelV:[0,1,-5.5]}},
    // o pé de trás apoiado na ponta: a posição de cima do afundo aprovado
    apoio:{P:[0,83,-11],legL:{ikS:[10,14,-52],poleRel:[0,-1,.4],ft:[0,-50],heelV:[0,3,-5]}},
    bottom:{P:[0,51,-12],legL:{ikS:[10,14,-52],poleRel:[0,-1,.4],ft:[0,-50],heelV:[0,3,-5]}}
  },
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em pé',tempo:'pés juntos, firme o abdômen',breath:'INSPIRA'},
    {path:['top','passo','apoio','bottom'],dur:2.6,kind:'ecc',label:'Passo e descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'peso no pé da frente',breath:'FIRME'},
    {path:['bottom','apoio','passo','top'],dur:1.5,kind:'conc',label:'Volta · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['A','L','pé de trás'],['P','','quadril']],frontal:[['K','R','joelho da frente']]},
  equip(sk){},
  guides:{
    lateral(sk){TX([0,1,-52],'passo largo para trás',{cls:'lbl-g',anchor:'middle',dy:-5});TX([0,1,28],'peso no pé da frente',{cls:'lbl-g',anchor:'middle',dy:-5});},
    frontal(sk){const t=sk.side.R.toe;L3([t[0],1,t[2]],[t[0],62,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});TX([t[0],30,t[2]],'joelho sobre o pé',{cls:'lbl-g',anchor:'end',dx:-16});}
  },
  muscles:{p:[['quads','R']],s:[['glutes','R'],['quads','L']]},
  errors:[
    // joelho da frente para dentro (o "valgo" do afundo aprovado)
    {id:'joelho',view:'frontal',keys:{apoio:{legR:{...PE_FRENTE,poleRel:[-.3,.4,1]}},bottom:{legR:{...PE_FRENTE,poleRel:[-.3,.4,1]}}}},
    // descer pouco (o "raso" do afundo aprovado)
    {id:'curta',view:'lateral',keys:{bottom:{P:[0,70,-11.5]}}},
    // empurrar com o pé de trás: o quadril fica para trás, perto do pé de trás, e o tronco recua; a canela da frente
    // deita e a perna de trás carrega o peso
    {id:'tras',view:'lateral',keys:{apoio:{P:[0,78,-18],lumbar:-2,thor:-2},bottom:{P:[0,56,-25],lumbar:-4,thor:-4,neck:-2}}}
  ]
};
export default ex;
