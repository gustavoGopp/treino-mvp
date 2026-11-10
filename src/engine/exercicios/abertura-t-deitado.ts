// @ts-nocheck
// Animação nova (aprovada). Abertura em T deitado de bruços, sem carga: de bruços no colchonete, a testa numa toalha
// dobrada, os braços abertos para os lados em T, cotovelos estendidos; ergue os braços do chão abrindo para trás, sem
// levantar a cabeça nem encolher os ombros, e desce até as mãos quase tocarem o chão.
// Técnica e fontes: docs/pesquisa/animacoes/abertura-t-deitado.md.
// O corpo de bruços (tronco com pitch +90, a cabeça para +z) e as pernas são os da flexão de joelho com elástico
// aprovada (flexao-joelho-elastico); o braço em T e os erros vêm do T na suspensão aprovado (yt-suspensao). Os braços
// vão retos, a 90° do corpo (azimute 90), e só a elevação muda: a mão sai a 4 cm do chão e sobe a 28 cm (13 cm acima da
// linha dos ombros). Sem peça nova: o colchonete e a toalha são caixas (BOX).
import { L3, TX, BOX } from '../desenho';
import { X, Y, Z, add } from '../math';

const T = (el) => ({ ua: [90, el], fa: [90, el] });
const ex = {
  id:'abertura-t-deitado',
  views:['frontal','top'],
  base:{P:[0,15,0],lumbar:90,thor:90,neck:92,legR:{ikS:[9,11,-85.3],poleRel:[0,-1,0],ft:[180,-50]}},
  keys:{
    down:{armR:T(-10)},
    mid:{armR:T(1)},
    up:{armR:T(12)}
  },
  seq:[
    {path:['down'],dur:.4,kind:'hold',label:'Embaixo',tempo:'mãos quase no chão',breath:'INSPIRA'},
    {path:['down','mid','up'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['up'],dur:1,kind:'hold',label:'No alto · segura',tempo:'1 s',breath:'FIRME'},
    {path:['up','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','up'],
  paths:{frontal:[['G','R','mãos'],['G','L','']],top:[['G','R','mãos'],['G','L','']]},
  equip(sk){
    BOX([0,.6,-5],[[X,30],[Y,.6],[Z,95]],'eqp',{bias:-6});
    BOX([0,2.9,72],[[X,13],[Y,1.7],[Z,9]],'eqp',{bias:-2});
  },
  guides:{
    frontal(sk){TX([0,-8,0],'braços em T, cotovelos estendidos',{cls:'lbl-g',anchor:'middle'});TX(add(sk.Hc,[0,22,0]),'testa na toalha',{cls:'lbl-g',anchor:'middle'});},
    top(sk){L3(add(sk.side.R.S,[0,0,10]),add(sk.side.L.S,[0,0,10]),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(sk.N,[0,0,-36]),'ombros longe das orelhas',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltPost','RL']],s:[]},
  errors:[
    // levantar a cabeça: o pescoço dobra para trás e a testa sai da toalha
    {id:'cabeca',view:'frontal',keys:{mid:{neck:70},up:{neck:55}}},
    // encolher os ombros: de bruços, os ombros escorregam em direção às orelhas (para a cabeça)
    {id:'encolher',view:'top',keys:{mid:{elev:4},up:{elev:7}}},
    // jogar os braços: embaixo as mãos batem no chão e em cima os braços são lançados alto demais
    {id:'embalo',view:'frontal',keys:{down:{armR:T(-12.8)},up:{armR:T(35)}}}
  ]
};
export default ex;
