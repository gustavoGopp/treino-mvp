// @ts-nocheck
// Animação nova (em revisão). Abdominal invertido no chão: deitado de costas no colchonete, braços no chão ao lado
// do corpo, quadril e joelhos a ~90° (coxas na vertical). Enrola a pelve em direção ao peito, tirando o quadril do
// chão; a parte de cima das costas e a cabeça ficam no chão. Sem carga.
// Base: o corpo deitado, o colchonete e os braços da `ponte-gluteo` (aprovada); o tronco por ângulos como no
// `abdominal-chao` e a pelve que enrola como na `elevacao-joelhos` (aprovadas). Sem peça nova de cena.
// Técnica e fontes: docs/pesquisa/animacoes/abdominal-invertido.md.
import { BOX, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

const ex = {
  id:'abdominal-invertido',
  views:['lateral'],
  base:{armR:{ua:[50,-7],fa:[50,-3]}},
  keys:{
    down:{P:[0,12,0],lumbar:-90,thor:-90,neck:-90,legR:{th:[180,90],sh:[0,0],ft:[0,50]}},
    mid:{P:[0,21,-1],lumbar:-112,thor:-91,neck:-90,legR:{th:[180,68],sh:[0,22],ft:[0,62]}},
    up:{P:[0,29,-5.4],lumbar:-135,thor:-92,neck:-90,legR:{th:[180,45],sh:[0,45],ft:[0,78]}}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Deitado',tempo:'joelhos a 90°',breath:'INSPIRA'},
    {path:['down','mid','up'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['up'],dur:1,kind:'hold',label:'Topo · pelve enrolada',tempo:'1 s',breath:'EXPIRA'},
    {path:['up','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','up'],
  paths:{lateral:[['P','','quadril']]},
  equip(sk){BOX([0,0.6,-18],[[X,30],[Y,0.6],[Z,74]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){TX(sk.P,'enrola a pelve',{cls:'lbl-g',anchor:'start',dx:10,dy:14});TX([0,-6,-40],'costas de cima no chão',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['rectus','R']],s:[['obliq','R']]},
  errors:[
    {id:'pernas',view:'lateral',keys:{mid:{P:[0,12,0],lumbar:-90,thor:-90,legR:{th:[180,70],sh:[0,20],ft:[0,62]}},up:{P:[0,12,0],lumbar:-90,thor:-90,legR:{th:[180,50],sh:[0,40],ft:[0,75]}}}},
    {id:'balanco',view:'lateral',keys:{down:{legR:{th:[180,128],sh:[0,-30],ft:[0,20]}},mid:{P:[0,22,-1],lumbar:-112,legR:{th:[180,95],sh:[0,5],ft:[0,45]}},up:{P:[0,36,-6],lumbar:-150,thor:-106,neck:-98,legR:{th:[180,30],sh:[0,55],ft:[0,85]}}}}
  ]
};
export default ex;
