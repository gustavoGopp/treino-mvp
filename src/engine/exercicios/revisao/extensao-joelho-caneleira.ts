// @ts-nocheck
// Animação nova (em revisão). Extensão de joelho sentado, com caneleira: sentado num banco (ou cadeira firme), costas
// retas, mãos na lateral do assento, coxas apoiadas; a perna da caneleira estende até quase esticar, segura ~1 s em
// cima (onde a caneleira pesa mais) e desce em ~2 s, sem cair. Uma perna de cada vez. Parte do tríceps francês com
// halter aprovado (mesmo corpo sentado e mesmo banco), com a caneleira (peça nova) no tornozelo direito.
// Técnica e fontes: docs/pesquisa/animacoes/extensao-joelho-caneleira.md.
import { BOX, L3, TX, caneleira } from '../../desenho';
import { X, Y, Z } from '../../math';

const ex = {
  id:'extensao-joelho-caneleira',
  views:['lateral'],
  base:{P:[0,53,0],lumbar:-2,thor:-4,neck:0,legL:{ikS:[16,7,40],poleRel:[.3,.5,1],ft:[12,-20]},armR:{ikS:[22,46,-6],poleRel:[1,-.3,-.6]}},
  keys:{
    bottom:{legR:{th:[0,-2],sh:[0,-85],ft:[0,-5]}},
    mid:{legR:{th:[0,-2],sh:[0,-45],ft:[0,30]}},
    top:{legR:{th:[0,-2],sh:[0,-8],ft:[0,55]}},
    midDown:{legR:{th:[0,-2],sh:[0,-45],ft:[0,30]}}
  },
  seq:[
    {path:['bottom'],dur:.5,kind:'hold',label:'Joelho dobrado',tempo:'pé fora do chão',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Em cima · segura',tempo:'1 s',breath:'FIRME'},
    {path:['top','midDown','bottom'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],
  paths:{lateral:[['A','R','tornozelo'],['K','R','joelho']]},
  equip(sk){
    BOX([0,45,6],[[X,13],[Y,2.5],[Z,17]],'eqp',{bias:-4});
    BOX([0,2.5,0],[[X,4],[Y,2],[Z,30]],'eqd',{bias:-6});BOX([0,22,4],[[X,2.5],[Y,20],[Z,2.5]],'eqd',{bias:-6});
    caneleira(sk,'R',this._pal==='e'?'db-e':'eqd');
  },
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.Hp,R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,30,-8],'coxa parada no assento',{cls:'lbl-g',anchor:'end'});TX([0,118,-6],'costas retas, mãos no assento',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['quads','R']],s:[]},
  errors:[
    // chutar a perna: sobe de uma vez (o meio já é o topo) e o tronco vai para trás
    {id:'tranco',view:'lateral',keys:{mid:{lumbar:-10,thor:-12,neck:-6,legR:{th:[0,-2],sh:[0,-8],ft:[0,55]}},top:{lumbar:-10,thor:-12,neck:-6}}},
    // tirar a coxa do assento: a coxa sobe e o tronco vai para trás
    {id:'quadril',view:'lateral',keys:{mid:{lumbar:-12,thor:-16,neck:-8,legR:{th:[0,8],sh:[0,-40],ft:[0,32]}},top:{lumbar:-16,thor:-22,neck:-10,legR:{th:[0,16],sh:[0,4],ft:[0,58]}}}},
    // deixar a perna cair: a descida acaba logo no começo
    {id:'cai',view:'lateral',keys:{midDown:{legR:{th:[0,-2],sh:[0,-85],ft:[0,-5]}}}}
  ]
};
export default ex;
