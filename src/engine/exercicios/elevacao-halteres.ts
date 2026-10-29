// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, dumbbell } from '../desenho';
import { Y, Z, add, comb } from '../math';

const ex = {
  id:'elevacao-halteres',
  views:['frontal','lateral'],
  base:{P:[0,93,0],lumbar:8,thor:10,neck:6,legR:{ikS:[11,7,2],poleRel:[0,0,1],ft:[8,-18]}},
  keys:{low:{armR:{sph:[20,-80,62],poleRel:[1,.2,-.3]}},mid:{armR:{sph:[45,-38,62],poleRel:[.7,.6,-.5]}},high:{armR:{sph:[60,-3,62],poleRel:[.25,1,-.5]}}},
  seq:[
    {path:['low'],dur:.3,kind:'hold',label:'Embaixo',tempo:'',breath:'INSPIRA'},
    {path:['low','mid','high'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['high'],dur:.25,kind:'hold',label:'Linha do ombro',tempo:'',breath:'FIRME'},
    {path:['high','mid','low'],dur:2.1,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['low','high'],
  paths:{frontal:[['G','R','mão'],['E','R','cotovelo']],lateral:[['G','R','mão']]},
  equip(sk){for(const k of['R','L'])dumbbell(sk.side[k].G,Z,'db'+(this._pal==='e'?'-e':''));},
  guides:{
    frontal(sk){const S=sk.side.R.S;L3(add(S,[6,0,0]),add(S,[-80,0,0]),'gd',.9,{layer:2,dash:'2 3'});TX(add(S,[-80,0,0]),'linha do ombro',{cls:'lbl-g',dy:-6});},
    lateral(sk){TX(comb(1,sk.side.R.S,22,Z,44,Y),'tronco levemente à frente',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltLat','RL']],s:[['deltAnt','RL'],['upTrap','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{low:{lumbar:22,thor:26},mid:{P:[0,90,0],lumbar:-4,thor:-6},high:{lumbar:-6,thor:-8}}},
    {id:'encolher',view:'frontal',keys:{mid:{elev:4},high:{elev:7}}},
    {id:'frontal',view:'lateral',keys:{mid:{armR:{sph:[5,-36,62],poleRel:[.8,.6,-.3]}},high:{armR:{sph:[12,-3,62],poleRel:[.6,1,-.2]}}}}
  ]
};
export default ex;
