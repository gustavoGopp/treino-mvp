// @ts-nocheck
// Animação nova (em revisão). Panturrilha no degrau da escada: as duas pernas, a ponta dos pés na beirada do degrau,
// os calcanhares no ar, uma mão na parede só para equilibrar. Técnica e fontes: docs/pesquisa/animacoes/panturrilha-degrau.md.
// O corpo e as poses-chave das pernas são os da panturrilha no step aprovada (panturrilha-b); o degrau é a peça do step
// (mesma caixa de 15 cm) e a parede é a da panturrilha no chão. Sem halter e sem torre.
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

// A mão esquerda fica parada na parede (a 43 cm à frente, na altura do peito); a direita solta ao lado do corpo.
const MAO_PAREDE = { ikS: [14, 128, 43], poleRel: [.3, -1, -.2] };
const ex = {
  id:'panturrilha-degrau',
  views:['lateral','zoom'],bounds:{zoom:[-42,46,-52,3]},
  base:{lumbar:0,thor:0,neck:0,armR:{ua:[0,-88],fa:[0,-86]},armL:MAO_PAREDE},
  keys:{
    stretch:{P:[0,93.1,-7.8],legR:{ikS:[11,8.6,-6.8],poleRel:[0,0,1],ft:[0,22]}},
    // "pausa" é o fim da pausa embaixo: no certo é a mesma pose do alongado; no erro "quicar", o corpo já está subindo
    pausa:{P:[0,93.1,-7.8],legR:{ikS:[11,8.6,-6.8],poleRel:[0,0,1],ft:[0,22]}},
    mid:{P:[0,104.75,-8.2],legR:{ikS:[11,20.25,-7.2],poleRel:[0,0,1],ft:[0,-18]}},
    top:{P:[0,113.4,-1.75],legR:{ikS:[11,28.9,-.75],poleRel:[0,0,1],ft:[0,-55]}}
  },
  seq:[
    {path:['stretch','pausa'],dur:1.5,kind:'hold',label:'Embaixo · pausa',tempo:'1 a 2 s',breath:'INSPIRA'},
    {path:['pausa','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top','mid','stretch'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'2 a 3 s',breath:'INSPIRA'}
  ],
  ext:['stretch','top'],
  paths:{lateral:[['heel','R','calcanhar']],zoom:[['heel','R','calcanhar']]},
  equip(sk){
    BOX([-4,7.5,24],[[X,34],[Y,7.5],[Z,16]],'eqp',{bias:-3});
    BOX([0,90,46],[[X,45],[Y,90],[Z,2]],'eqp',{bias:-4});
  },
  guides:{
    lateral(sk){L3([-11,15,8],[-11,15,-30],'gd',.9,{layer:3,dash:'2 3'});TX([-11,15,-30],'beirada do degrau',{cls:'lbl-g',anchor:'end',dx:-4,dy:4});TX([14,150,43],'a mão só equilibra',{cls:'lbl-g',anchor:'middle',dy:-6});},
    zoom(sk){L3([-11,15,8],[-11,15,-38],'gd',.9,{layer:3,dash:'2 3'});TX([-11,15,-38],'beirada do degrau',{cls:'lbl-g',dy:14});}
  },
  muscles:{p:[['calf','RL']],s:[]},
  errors:[
    // quicar: não para embaixo; o calcanhar toca o fundo e já volta (no fim da pausa, o errado está no meio da subida)
    {id:'quicar',view:'lateral',keys:{pausa:{P:[0,104.75,-8.2],legR:{ikS:[11,20.25,-7.2],poleRel:[0,0,1],ft:[0,-18]}}}},
    // descer pouco: o calcanhar para na altura do degrau, sem passar a beirada
    {id:'curta',view:'lateral',keys:{
      stretch:{P:[0,102.6,-8.6],legR:{ikS:[11,18,-7.6],poleRel:[0,0,1],ft:[0,-10]}},
      pausa:{P:[0,102.6,-8.6],legR:{ikS:[11,18,-7.6],poleRel:[0,0,1],ft:[0,-10]}}}},
    // puxar com a mão: embaixo o corpo pende para trás, pendurado no braço esticado; na subida o braço dobra e puxa o
    // corpo para a parede (a mão continua no mesmo ponto)
    {id:'puxar',view:'lateral',keys:{
      stretch:{lumbar:-3,thor:-6},pausa:{lumbar:-3,thor:-6},
      mid:{lumbar:4,thor:8},
      top:{P:[0,113.4,1.5],lumbar:10,thor:16}}}
  ]
};
export default ex;
