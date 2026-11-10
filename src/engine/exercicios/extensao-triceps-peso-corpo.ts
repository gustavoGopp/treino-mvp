// @ts-nocheck
// Animação nova (aprovada). Extensão de tríceps com o peso do corpo: as mãos na beirada de uma bancada fixa (altura
// da cintura), os pés para trás, o corpo reto e inclinado; dobra só os cotovelos, que apontam para a frente, e o corpo
// desce à frente até a testa chegar perto da bancada; estica os cotovelos de volta.
// Técnica e fontes: docs/pesquisa/animacoes/extensao-triceps-peso-corpo.md.
// Base: o tríceps na suspensão aprovado (triceps-suspensao): o mesmo corpo reto inclinado, os cotovelos para a frente e
// os mesmos erros de corpo. Aqui as mãos ficam paradas na bancada e o corpo gira em torno dos tornozelos: a pelve sai do
// tornozelo ao longo do corpo (P = tornozelo + 85,85·(sen φ, cos φ), a perna quase reta), com o tronco no mesmo ângulo φ das pernas.
import { BOX, L3, TX } from '../desenho';
import { X, Y, Z } from '../math';

// Mãos na beirada da bancada (tampo a 90 cm, beirada em z = 42), na largura dos ombros.
const MAO = [17, 92, 42];
const braco = (pole) => ({ ikS: MAO, poleRel: pole });
const ex = {
  id:'extensao-triceps-peso-corpo',
  views:['lateral','top'],
  base:{legR:{ikS:[11,7,-83],poleRel:[0,1,.2],ft:[8,-18]}},
  keys:{
    up:{P:[0,79.8,-37.5],lumbar:32,thor:32,neck:30,armR:braco([.2,-1,.6])},
    mid:{P:[0,72.8,-27.8],lumbar:40,thor:40,neck:38,armR:braco([.1,-1,.8])},
    down:{P:[0,65.5,-20.2],lumbar:47,thor:47,neck:44,armR:braco([.05,-1,1])}
  },
  seq:[
    {path:['up'],dur:.45,kind:'hold',label:'Braços estendidos',tempo:'corpo reto, inclinado',breath:'INSPIRA'},
    {path:['up','mid','down'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'2 a 3 s',breath:'INSPIRA'},
    {path:['down'],dur:.5,kind:'hold',label:'Embaixo',tempo:'testa perto da bancada',breath:'FIRME'},
    {path:['down','mid','up'],dur:1.1,kind:'conc',label:'Volta · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['up','down'],
  paths:{lateral:[['Hc','','cabeça'],['E','R','cotovelo']],top:[['E','R','cotovelo']]},
  equip(sk){BOX([0,45,70],[[X,35],[Y,45],[Z,28]],'eqp',{bias:4});},
  guides:{
    lateral(sk){L3(sk.side.R.heel,sk.Hc,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,sk.P[1]+26,sk.P[2]-6],'corpo reto',{cls:'lbl-g',anchor:'end'});
      TX([0,sk.side.R.E[1]-14,sk.side.R.E[2]],'só o cotovelo dobra',{cls:'lbl-g',anchor:'middle'});},
    top(sk){TX([0,sk.side.R.E[1],sk.side.R.E[2]-30],'cotovelos para a frente',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['triceps','RL']],s:[]},
  errors:[
    // dobrar o quadril: o quadril sobe e vai para trás, o tronco fica mais em pé sobre as mãos (série mais fácil)
    {id:'quadril',view:'lateral',keys:{
      mid:{P:[0,76.5,-32.5],lumbar:52,thor:52,neck:50},
      down:{P:[0,72.8,-27.8],lumbar:64,thor:64,neck:60}}},
    // abrir os cotovelos: os cotovelos vão para os lados (e descem) em vez de apontar para a frente
    {id:'cotovelos',view:'top',keys:{mid:{armR:braco([1,-.4,0])},down:{armR:braco([1,-.3,0])}}},
    // ir até a falha: o cotovelo cede embaixo e a testa chega à beirada da bancada
    {id:'falha',view:'lateral',keys:{down:{P:[0,59.9,-15.3],lumbar:52,thor:52,neck:50}}}
  ]
};
export default ex;
