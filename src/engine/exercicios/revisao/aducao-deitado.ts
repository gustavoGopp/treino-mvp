// @ts-nocheck
// Animação nova (em revisão). Adução de quadril deitado de lado, sem carga: a mesma pose da versão com caneleira aprovada (aducao-caneleira), sem a peça
// (entrada da auditoria de 04/11/2026: a versão sem carga, para quem não tem caneleira; a técnica é a mesma).
// Técnica e fontes: docs/pesquisa/animacoes/aducao-deitado.md.
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

const ex = {
  id:'aducao-deitado',
  views:['lateral'],
  base:{P:[0,16,0],lumbar:-90,thor:-90,neck:-90,roll:-90,
    legL:{ikS:[-26,7,36],poleRel:[-1,.05,.3],ft:[-90,-10]},
    armL:{ikS:[4,8,-62],poleRel:[-.2,1,-1]},armR:{ikS:[18,8,-10],poleRel:[1,.6,.2]}},
  keys:{
    down:{legR:{ikS:[9,13,84],poleRel:[0,1,0],ft:[90,-8]}},
    mid:{legR:{ikS:[9,21,83],poleRel:[0,1,0],ft:[90,-8]}},
    top:{legR:{ikS:[9,29,80],poleRel:[0,1,0],ft:[90,-8]}}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Embaixo',tempo:'perna quase no chão',breath:'INSPIRA'},
    {path:['down','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Topo · segura',tempo:'1 s',breath:'FIRME'},
    {path:['top','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','top'],
  paths:{lateral:[['A','R','tornozelo']]},
  equip(sk){BOX([0,.6,0],[[X,30],[Y,.6],[Z,95]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){L3([0,16,-80],[0,16,100],'gd',.9,{layer:3,dash:'3 2.5'});TX([0,66,10],'curso curto: só até o quadril ficar parado',{cls:'lbl-g',anchor:'middle'});TX([0,-14,-30],'pé de cima no chão, à frente',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['adutores','R']],s:[]},
  errors:[
    // girar o quadril para subir mais: o tronco rola para trás e a perna sobe mais
    {id:'gira',view:'lateral',keys:{mid:{roll:-70,legR:{ikS:[9,30,80],poleRel:[0,1,0],ft:[90,-8]}},top:{roll:-60,legR:{ikS:[9,42,75],poleRel:[0,1,0],ft:[90,-8]}}}},
    // subir com tranco: o meio já é o topo
    {id:'tranco',view:'lateral',keys:{mid:{legR:{ikS:[9,29,80],poleRel:[0,1,0],ft:[90,-8]}}}},
    // descansar no chão: a perna deita no chão embaixo (e o topo fica mais baixo)
    {id:'descansa',view:'lateral',keys:{down:{legR:{ikS:[9,6,85],poleRel:[0,1,0],ft:[90,-8]}},mid:{legR:{ikS:[9,12,84],poleRel:[0,1,0],ft:[90,-8]}},top:{legR:{ikS:[9,20,83],poleRel:[0,1,0],ft:[90,-8]}}}}
  ]
};
export default ex;
