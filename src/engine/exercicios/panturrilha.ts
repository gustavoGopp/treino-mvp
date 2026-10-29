// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbell, tower } from '../desenho';
import { X, Y, Z } from '../math';

const ex = {
  id:'panturrilha',
  views:['lateral','zoom'],noCable:true,bounds:{zoom:[-42,46,-52,3]},
  base:{lumbar:0,thor:0,neck:0,legL:{th:[0,-86],sh:[180,-38],ft:[0,-60]},armR:{ua:[0,-90],fa:[0,-89]},armL:{ikS:[12,135,49],poleRel:[.3,-1,-.2]}},
  keys:{
    stretch:{P:[-3,93.1,-7.8],legR:{ikS:[11,8.6,-6.8],poleRel:[0,0,1],ft:[0,22]}},
    mid:{P:[-3,104.75,-8.2],legR:{ikS:[11,20.25,-7.2],poleRel:[0,0,1],ft:[0,-18]}},
    top:{P:[-3,113.4,-1.75],legR:{ikS:[11,28.9,-.75],poleRel:[0,0,1],ft:[0,-55]}}
  },
  seq:[
    {path:['stretch'],dur:2,kind:'hold',label:'Alongado · pausa',tempo:'2 s',breath:'INSPIRA'},
    {path:['stretch','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.8,kind:'hold',label:'Topo',tempo:'~1 s',breath:'FIRME'},
    {path:['top','mid','stretch'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','top'],
  paths:{lateral:[['heel','R','calcanhar']],zoom:[['heel','R','calcanhar']]},
  tower:{x:22,z:52,ac:X,out:[0,0,-1],py:12},
  equip(sk){BOX([-4,7.5,24],[[X,34],[Y,7.5],[Z,16]],'eqp',{bias:-3});dumbbell(sk.side.R.G,Z,'db'+(this._pal==='e'?'-e':''));tower(this.tower,0);},
  guides:{
    lateral(sk){L3([-11,15,8],[-11,15,-30],'gd',.9,{layer:3,dash:'2 3'});TX([-11,15,-30],'borda do step',{cls:'lbl-g',anchor:'end',dx:-4,dy:4});},
    zoom(sk){L3([-11,15,8],[-11,15,-38],'gd',.9,{layer:3,dash:'2 3'});TX([-11,15,-38],'borda do step',{cls:'lbl-g',dy:14});}
  },
  muscles:{p:[['calf','R']],s:[]},
  errors:[
    {id:'curta',view:'lateral',keys:{stretch:{P:[-3,101,-8.9],legR:{ikS:[11,16.5,-7.9],poleRel:[0,0,1],ft:[0,-5]}}}},
    {id:'joelho',view:'lateral',keys:{stretch:{P:[-3,86,-10]},mid:{P:[-3,100,-9]}}}
  ]
};
export default ex;
