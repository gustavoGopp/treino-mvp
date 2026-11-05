// @ts-nocheck
// Animação nova (aprovada). Abdução de quadril deitado de lado, sem carga: a mesma pose da versão com caneleira aprovada (abducao-caneleira), sem a peça
// (entrada da auditoria de 04/11/2026: a versão sem carga, para quem não tem caneleira; a técnica é a mesma).
// Técnica e fontes: docs/pesquisa/animacoes/abducao-deitado.md.
import { BOX, L3, TX } from '../desenho';
import { X, Y, Z } from '../math';

const ex = {
  id:'abducao-deitado',
  views:['lateral','top'],
  base:{P:[0,16,0],lumbar:-90,thor:-90,neck:-90,roll:90,
    legL:{ikS:[18,8,62],poleRel:[1,.1,.3],ft:[90,-10]},
    armL:{ikS:[-4,8,-62],poleRel:[.2,1,-1]},armR:{ikS:[-16,9,-12],poleRel:[-1,.6,.2]}},
  keys:{
    down:{legR:{ikS:[15,16,84],poleRel:[0,1,0],ft:[-90,-8]}},
    mid:{legR:{ikS:[15,36,78],poleRel:[0,1,0],ft:[-90,-8]}},
    top:{legR:{ikS:[15,60,69],poleRel:[0,1,0],ft:[-90,-8]}}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Embaixo',tempo:'quadril empilhado',breath:'INSPIRA'},
    {path:['down','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Topo · segura',tempo:'1 s',breath:'FIRME'},
    {path:['top','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','top'],
  paths:{lateral:[['A','R','tornozelo']],top:[['A','R','tornozelo']]},
  equip(sk){BOX([0,.6,0],[[X,30],[Y,.6],[Z,95]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){L3([0,16,-80],[0,16,100],'gd',.9,{layer:3,dash:'3 2.5'});TX([0,96,0],'perna estendida, um pouco atrás do corpo',{cls:'lbl-g',anchor:'middle'});TX([0,-14,-30],'quadril empilhado, sem rolar',{cls:'lbl-g',anchor:'middle'});},
    top(sk){L3([-9,16,-80],[-9,16,100],'gd',.9,{layer:3,dash:'3 2.5'});TX([-9,16,100],'linha do corpo',{cls:'lbl-g',anchor:'start',dx:6});TX([30,16,30],'perna um pouco atrás, dedos para a frente',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['glutes','R']],s:[]},
  errors:[
    // rolar o quadril para trás: o tronco gira para trás (o roll diminui) e a perna sobe à frente
    {id:'rola',view:'lateral',keys:{mid:{roll:70,legR:{ikS:[2,36,78],poleRel:[0,1,0],ft:[-60,20]}},top:{roll:60,legR:{ikS:[-8,58,68],poleRel:[0,1,0],ft:[-50,30]}}}},
    // levar a perna para a frente: o tornozelo vai 25 cm à frente da linha do corpo
    {id:'frente',view:'top',keys:{mid:{legR:{ikS:[-10,34,76],poleRel:[0,1,0],ft:[-90,-8]}},top:{legR:{ikS:[-18,56,62],poleRel:[0,1,0],ft:[-90,-8]}}}},
    // subir alto demais com tranco: o meio já é o topo, a perna passa de 45° e a cintura dobra
    {id:'alto',view:'lateral',keys:{mid:{legR:{ikS:[15,66,60],poleRel:[0,1,0],ft:[-90,-8]}},top:{lumbar:-100,legR:{ikS:[15,76,50],poleRel:[0,1,0],ft:[-90,-8]}}}}
  ]
};
export default ex;
