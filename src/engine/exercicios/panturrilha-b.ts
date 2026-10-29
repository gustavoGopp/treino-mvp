// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import base from './panturrilha';
import { X } from '../math';

const src = base;
const ex = {
  id:'panturrilha-b',
  views:['lateral','zoom'],noCable:true,bounds:{zoom:[-42,46,-52,3]},
  base:{lumbar:0,thor:0,neck:0,armR:{ua:[0,-90],fa:[0,-89]},armL:{ikS:[12,135,49],poleRel:[.3,-1,-.2]}},
  keys:{
    stretch:{P:[0,93.1,-7.8],legR:{ikS:[11,8.6,-6.8],poleRel:[0,0,1],ft:[0,22]}},
    mid:{P:[0,104.75,-8.2],legR:{ikS:[11,20.25,-7.2],poleRel:[0,0,1],ft:[0,-18]}},
    top:{P:[0,113.4,-1.75],legR:{ikS:[11,28.9,-.75],poleRel:[0,0,1],ft:[0,-55]}}
  },
  seq:src.seq.map(g=>Object.assign({},g)),
  ext:['stretch','top'],
  paths:{lateral:[['heel','R','calcanhar']],zoom:[['heel','R','calcanhar']]},
  tower:{x:22,z:52,ac:X,out:[0,0,-1],py:12},
  equip:src.equip,guides:src.guides,
  muscles:{p:[['calf','RL']],s:[]},
  errors:[
    {id:'curta',view:'lateral',keys:{stretch:{P:[0,101,-8.9],legR:{ikS:[11,16.5,-7.9],poleRel:[0,0,1],ft:[0,-5]}}}},
    {id:'joelho',view:'lateral',keys:{stretch:{P:[0,86,-10]},mid:{P:[0,100,-9]}}}
  ]
};
export default ex;
