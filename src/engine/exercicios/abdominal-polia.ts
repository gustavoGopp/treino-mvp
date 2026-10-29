// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, C3, L3, TX, liftOf, rope, tower } from '../desenho';
import { X, Y, Z, comb } from '../math';

const ex = {
  id:'abdominal-polia',ropeAttach:true,
  views:['lateral'],
  base:{P:[0,48,-8],legR:{ikS:[10,8,-42],poleRel:[0,-.4,1],ft:[180,-12],heelV:[0,5,1]},armR:{head:[9,-1,4],poleRel:[.45,-1,.35]}},
  keys:{up:{lumbar:28,thor:30,neck:26},mid:{lumbar:40,thor:64,neck:78},down:{lumbar:48,thor:98,neck:126}},
  seq:[
    {path:['up'],dur:.4,kind:'hold',label:'Coluna neutra',tempo:'',breath:'INSPIRA'},
    {path:['up','mid','down'],dur:1.5,kind:'conc',label:'Enrolar · concêntrica',tempo:'~1,5 s',breath:'EXPIRA'},
    {path:['down'],dur:1,kind:'hold',label:'Segura contraído',tempo:'1 s',breath:'EXPIRA'},
    {path:['down','mid','up'],dur:2,kind:'ecc',label:'Desenrolar · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['up','down'],
  paths:{lateral:[['Hc','','cabeça'],['E','R','cotovelo']]},
  tower:{x:0,z:84,ac:X,out:[0,0,-1],py:212},
  equip(sk){BOX([0,1.5,-15],[[X,25],[Y,1.5],[Z,35]],'eqp',{bias:-6});const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const L=rope(this,'a',sk,pul);tower(t,liftOf(this,'a',L));},
  guides:{lateral(sk){L3([0,2,sk.P[2]],[0,78,sk.P[2]],'gd',.9,{layer:2,dash:'3 2.5'});C3(sk.P,3.4,'gd',{layer:3,w:1.2,op:.9});TX([0,80,sk.P[2]-4],'quadril parado',{cls:'lbl-g',anchor:'end'});}},
  muscles:{p:[['rectus','R']],s:[['obliq','RL']]},
  errors:[
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,46.9,-12.3],lumbar:50,thor:54,neck:54},down:{P:[0,45,-17.2],lumbar:68,thor:72,neck:72}}},
    {id:'bracos',view:'lateral',keys:{up:{armR:{ikS:[9,108,29],poleRel:[.45,-1,.35]}},mid:{thor:50,neck:55,armR:{ikS:[12,58,42],poleRel:[.5,-.2,-1]}},down:{thor:62,neck:66,armR:{ikS:[12,42,40],poleRel:[.5,-.2,-1]}}}}
  ]
};
export default ex;
