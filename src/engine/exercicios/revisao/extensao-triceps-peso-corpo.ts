// @ts-nocheck
// Animação nova (em revisão). Extensão de tríceps com o peso do corpo, mãos na beira de uma bancada fixa (pia ou
// bancada da cozinha, o degrau 0 da escada): corpo reto como numa prancha inclinada, pés atrás; dobra os cotovelos
// e leva a cabeça para perto da bancada, com os braços indo para cima da cabeça; os cotovelos apontam para baixo;
// estende de volta. As mãos ficam paradas no apoio; o corpo gira em torno dos pés.
// Base: o corpo em prancha inclinada e os erros do `triceps-suspensao` (aprovado), com as mãos num apoio fixo.
// A bancada é uma caixa, o mesmo desenho do degrau e da parede (BOX), com 90 cm de altura.
// Técnica e fontes: docs/pesquisa/animacoes/extensao-triceps-peso-corpo.md.
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

const MAO = {ikS:[16,91,8],poleRel:[0,-1,.15]};
const ex = {
  id:'extensao-triceps-peso-corpo',
  views:['lateral'],
  base:{legR:{ikS:[11,7,-139],poleRel:[0,1,.2],ft:[8,-18]},armR:MAO},
  keys:{
    up:{P:[0,69.4,-82.8],lumbar:42,thor:42,neck:42},
    mid:{P:[0,61,-74.7],lumbar:50,thor:50,neck:50},
    down:{P:[0,51.5,-67.8],lumbar:58,thor:58,neck:58}
  },
  seq:[
    {path:['up'],dur:.45,kind:'hold',label:'Braços estendidos',tempo:'corpo reto, inclinado à frente',breath:'INSPIRA'},
    {path:['up','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['down'],dur:.5,kind:'hold',label:'Testa perto da bancada',tempo:'sem encostar',breath:'FIRME'},
    {path:['down','mid','up'],dur:1.1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['up','down'],
  paths:{lateral:[['Hc','','cabeça'],['E','R','cotovelo']]},
  equip(sk){BOX([0,45,25],[[X,45],[Y,45],[Z,20]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){L3(sk.side.R.heel,sk.Hc,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,135,-95],'corpo reto, como numa prancha',{cls:'lbl-g',anchor:'middle'});
      TX([0,sk.side.R.E[1]-14,sk.side.R.E[2]],'cotovelos para baixo',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['triceps','RL']],s:[]},
  errors:[
    // quadril cai: a barriga desce e a lombar arqueia
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,54,-71],lumbar:57,thor:44,neck:44},down:{P:[0,44,-64],lumbar:65,thor:52,neck:52}}},
    // cotovelos abrem para os lados e o peito vai à bancada: vira uma flexão inclinada
    {id:'cotovelo',view:'lateral',keys:{mid:{armR:{ikS:[16,91,8],poleRel:[1,-.5,0]}},down:{P:[0,56,-72],lumbar:54,thor:54,neck:40,armR:{ikS:[16,91,8],poleRel:[1,-.5,0]}}}},
    {id:'curta',view:'lateral',keys:{down:{P:[0,61,-74.7],lumbar:50,thor:50,neck:50}}}
  ]
};
export default ex;
