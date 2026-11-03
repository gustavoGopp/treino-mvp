// @ts-nocheck
// Animação nova (aprovada). Flexão nórdica (nórdico). Técnica e fontes: docs/pesquisa/animacoes/nordico.md.
// Pose nova: ajoelhado numa almofada, calcanhares presos sob um sofá pesado. O corpo gira em bloco em torno dos
// joelhos (joelho fixo em z = 0), reto do joelho à cabeça, e desce devagar (4 s); as mãos esperam na frente do
// peito, tocam o chão e amortecem dobrando os cotovelos, como numa flexão. A volta é empurrando o chão com as mãos.
// O sofá é desenhado com caixas (BOX): o motor não tem uma peça de sofá.
import { BOX, L3, TX } from '../desenho';
import { CTX } from '../contexto';
import { X, Y, Z } from '../math';

// pernas: tíbia no chão, calcanhar para cima (preso), dedos apoiados atrás
const PERNA={ikS:[9,6,-43],poleRel:[0,-.3,1],ft:[180,-15],heelV:[0,4.5,1.5]};
const pose=(a,P,mao,cot=[.4,-1,-.4])=>({P,lumbar:a,thor:a,neck:a,armR:{ikS:mao,poleRel:cot}});

const ex = {
  id:'nordico',
  views:['lateral'],
  base:{legR:PERNA,wrist:60,wristDir:[0,0,1]},
  keys:{
    top:pose(3,[0,47.9,2.3],[16,83.8,24.2]),
    d1:pose(15,[0,46.5,11.1],[16,77.1,40]),
    d2:pose(30,[0,42.2,21.5],[16,64.3,57.3]),
    d3:pose(45,[0,35.4,30.4],[16,42,76]),
    catch:pose(58,[0,27.8,36.5],[16,3,86],[.5,.2,-1]),
    bottom:pose(72,[0,18.3,40.9],[16,3,86],[.6,.4,-1])
  },
  seq:[
    {path:['top'],dur:.6,kind:'hold',label:'Ajoelhado',tempo:'corpo reto',breath:'INSPIRA'},
    {path:['top','d1','d2'],dur:2,kind:'ecc',label:'Descida lenta · excêntrica',tempo:'3–5 s no total',breath:'INSPIRA'},
    {path:['d2','d3','catch'],dur:2,kind:'ecc',label:'Descida lenta · excêntrica',tempo:'segura o máximo',breath:'FIRME'},
    {path:['catch','bottom'],dur:.6,kind:'ecc',label:'Mãos amortecem',tempo:'como numa flexão',breath:'FIRME'},
    {path:['bottom','catch','d3','d2','d1','top'],dur:1.6,kind:'conc',label:'Volta · concêntrica',tempo:'empurra o chão',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['Hc','','cabeça'],['P','','quadril']]},
  equip(sk){
    // almofada sob os joelhos
    BOX([0,1.2,0],[[X,22],[Y,1.2],[Z,12]],'eqp',{bias:-4});
    // sofá (a pedido do Gustavo, 04/11/2026, mais parecido com um sofá): base apoiada em pés curtos, com os
    // calcanhares presos por baixo dela; almofada do assento, encosto e o braço do sofá (vista de lado, translúcido)
    for(const z of[-72,-40])BOX([45,6,z],[[X,2],[Y,6],[Z,2]],'eqd',{bias:-62});
    BOX([0,20,-56],[[X,50],[Y,8],[Z,18]],'eqd',{bias:-60});
    BOX([0,33,-55],[[X,46],[Y,5],[Z,16]],'eqp',{bias:-60});
    BOX([0,56,-70],[[X,48],[Y,18],[Z,4]],'eqp',{bias:-61});
    if(CTX.VIEW==='lateral')BOX([0,40,-56],[[X,54],[Y,12],[Z,18]],'eqp',{bias:-59,op:.55});
  },
  guides:{
    lateral(sk){L3(sk.side.R.K,sk.Hc,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,130,40],'joelho, quadril e cabeça em linha',{cls:'lbl-g',anchor:'middle'});TX([0,-7,-44],'calcanhares presos',{cls:'lbl-g',anchor:'middle'});TX([0,-7,86],'mãos amortecem',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['hams','R']],s:[]},
  errors:[
    // dobra o quadril: a coxa fica mais em pé e o tronco cai para a frente (o quadril vai para trás)
    {id:'quadril',view:'lateral',keys:{
      d2:pose(50,[0,46.5,11.1],[16,62,52]),
      d3:pose(70,[0,44.9,16.1],[16,36,70]),
      catch:pose(85,[0,43,20.2],[16,3,80],[.5,.2,-1])
    }},
    // desaba: perde o controle logo no começo e cai nas mãos
    {id:'desaba',view:'lateral',keys:{
      d1:pose(30,[0,42.2,21.5],[16,64.3,57.3]),
      d2:pose(58,[0,27.8,36.5],[16,3,86],[.5,.2,-1]),
      d3:pose(58,[0,27.8,36.5],[16,3,86],[.5,.2,-1])
    }}
  ]
};
export default ex;
