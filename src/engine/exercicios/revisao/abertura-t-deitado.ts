// @ts-nocheck
// Animação nova (em revisão). Abertura em T deitado de bruços, sem carga: de bruços no colchonete, testa perto do
// chão, braços abertos em T na linha dos ombros, quase retos; levanta os braços do chão juntando as escápulas,
// segura e desce devagar. A cabeça e o peito ficam no chão.
// Base: o corpo de bruços da `flexao-joelho-elastico` (aprovada: tronco a +90°, pernas estendidas) e o T, os guias
// e os erros do `yt-suspensao` (aprovado). Colchonete como nas outras; sem peça nova de cena.
// Técnica e fontes: docs/pesquisa/animacoes/abertura-t-deitado.md.
import { BOX, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

const ex = {
  id:'abertura-t-deitado',
  views:['frontal','top','lateral'],
  base:{P:[0,15,0],lumbar:90,thor:90,neck:88,legR:{ikS:[9,11,-85.3],poleRel:[0,-1,0],ft:[180,-50]}},
  keys:{
    down:{pro:3,elev:0,armR:{ikS:[80,4,48],poleRel:[0,1,0]}},
    mid:{pro:-2,elev:-1,armR:{ikS:[82,13,48],poleRel:[0,1,0]}},
    up:{pro:-6,elev:-1,armR:{ikS:[83.5,22.5,48],poleRel:[0,1,0]}}
  },
  seq:[
    {path:['down'],dur:.45,kind:'hold',label:'Braços no chão, em T',tempo:'testa perto do chão',breath:'INSPIRA'},
    {path:['down','mid','up'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['up'],dur:1,kind:'hold',label:'T · segura',tempo:'1 s',breath:'FIRME'},
    {path:['up','mid','down'],dur:2.1,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','up'],
  paths:{frontal:[['G','R','mãos'],['G','L','']],lateral:[['G','R','mãos']]},
  equip(sk){BOX([0,.6,10],[[X,30],[Y,.6],[Z,105]],'eqp',{bias:-6});},
  guides:{
    frontal(sk){TX([0,50,0],'braços quase retos, até a linha dos ombros',{cls:'lbl-g',anchor:'middle'});TX([0,-12,0],'peito e cabeça no chão',{cls:'lbl-g',anchor:'middle'});},
    top(sk){TX([0,0,100],'braços em T, na linha dos ombros',{cls:'lbl-g',anchor:'middle'});},
    lateral(sk){TX([0,40,48],'sobe pouco, sem tirar o peito do chão',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltPost','RL']],s:[]},
  errors:[
    // dobrar os cotovelos: as mãos vêm para perto da cabeça e vira um W
    {id:'cotovelo',view:'frontal',keys:{mid:{armR:{ikS:[50,16,62],poleRel:[0,1,-.5]}},up:{armR:{ikS:[46,24,66],poleRel:[0,1,-.5]}}}},
    {id:'encolher',view:'frontal',keys:{mid:{elev:4},up:{elev:7}}},
    // tirar o peito e a cabeça do chão: a lombar arqueia e o pescoço sobe
    {id:'cabeca',view:'lateral',keys:{mid:{thor:80,neck:60},up:{thor:72,neck:45}}}
  ]
};
export default ex;
