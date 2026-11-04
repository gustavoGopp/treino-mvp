// @ts-nocheck
// Animação nova (aprovada). Abdominal na bola suíça (crunch): a parte de baixo das costas apoiada na bola, pés no
// chão, mãos cruzadas no peito; enrola só a parte de cima das costas e volta acompanhando a curva da bola, que fica
// parada. Parte do abdominal no chão aprovado (mesmo enrolar do tronco), com a bola (C3, como na flexão na bola) no
// lugar do chão: a lombar fica na curva e o tronco começa um pouco estendido sobre ela.
// Técnica e fontes: docs/pesquisa/animacoes/abdominal-bola.md.
import { C3, L3, TX } from '../desenho';
import { BALL } from '../compartilhado';

const ex = {
  id:'abdominal-bola',
  views:['lateral'],
  base:{P:[0,44,26],lumbar:-45,legR:{ikS:[11,7,62],poleRel:[0,1,.2],ft:[4,-20]},armR:{tr:[4,-14,9],poleRel:[.6,-.2,1]}},
  keys:{
    down:{thor:-110,neck:-100},
    mid:{thor:-80,neck:-66},
    up:{thor:-50,neck:-38}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Em cima da bola',tempo:'costas na curva',breath:'INSPIRA'},
    {path:['down','mid','up'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['up'],dur:.8,kind:'hold',label:'Topo · contrai',tempo:'1 s',breath:'EXPIRA'},
    {path:['up','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','up'],
  paths:{lateral:[['N','','ombros']]},
  equip(sk){C3([0,BALL,0],BALL,'ball',{bias:-2});},
  guides:{
    lateral(sk){L3([0,2,-30],[0,2,30],'gd',1.2,{layer:3,dash:'3 2.5'});TX([0,-6,0],'bola parada',{cls:'lbl-g',anchor:'middle'});TX([0,88,-8],'enrola só a parte de cima das costas',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['rectus','R']],s:[['obliq','R']]},
  errors:[
    {id:'pescoco',view:'lateral',keys:{mid:{thor:-104,neck:-56},up:{thor:-98,neck:-24}}},
    // rolar a bola: as pernas empurram, o corpo desliza para trás sobre a bola e o tronco sobe sem enrolar
    {id:'rola',view:'lateral',keys:{mid:{P:[0,46,14],lumbar:-55,thor:-96,neck:-84,legR:{ikS:[11,7,70],poleRel:[0,1,.2],ft:[4,-20]}},up:{P:[0,47,6],lumbar:-60,thor:-84,neck:-72,legR:{ikS:[11,7,76],poleRel:[0,1,.2],ft:[4,-20]}}}},
    {id:'senta',view:'lateral',keys:{mid:{lumbar:-30,thor:-50,neck:-40},up:{lumbar:-10,thor:-12,neck:-6}}}
  ]
};
export default ex;
