// @ts-nocheck
// Animação nova (aprovada). Rosca alternada em pé, halteres, cotovelos parados ao lado do tronco.
// Técnica e fontes: docs/pesquisa/animacoes/rosca-alternada.md.
import { L3, TX, dumbbell } from '../desenho';
import { X, add } from '../math';

const baixo={ua:[0,-90],fa:[0,-86]};
const ex = {
  id:'rosca-alternada',
  views:['lateral','frontal'],
  base:{P:[0,93,0],lumbar:0,thor:0,neck:0,legR:{ikS:[12,7,0],poleRel:[.1,0,1],ft:[10,-20]},armL:baixo},
  keys:{
    bottom:{armR:baixo,armL:baixo},
    rMid:{armR:{ua:[0,-88],fa:[0,-5]},armL:baixo},
    rTop:{armR:{ua:[0,-84],fa:[0,62]},armL:baixo},
    lMid:{armR:baixo,armL:{ua:[0,-88],fa:[0,-5]}},
    lTop:{armR:baixo,armL:{ua:[0,-84],fa:[0,62]}}
  },
  seq:[
    {path:['bottom'],dur:.5,kind:'hold',label:'Embaixo',tempo:'braços estendidos',breath:'INSPIRA'},
    {path:['bottom','rMid','rTop'],dur:1.1,kind:'conc',label:'Direito sobe · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['rTop'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'},
    {path:['rTop','rMid','bottom'],dur:2.2,kind:'ecc',label:'Direito desce · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['bottom','lMid','lTop'],dur:1.1,kind:'conc',label:'Esquerdo sobe · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['lTop'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'},
    {path:['lTop','lMid','bottom'],dur:2.2,kind:'ecc',label:'Esquerdo desce · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['bottom','rTop'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],frontal:[['G','R','halter'],['G','L','']]},
  equip(sk){const c='db'+(this._pal==='e'?'-e':'');for(const k of['R','L'])dumbbell(sk.side[k].G,X,c);},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-40,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo parado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});TX([0,128,-14],'tronco parado',{cls:'lbl-g',anchor:'end'});},
    frontal(sk){}
  },
  muscles:{p:[['biceps','RL']],s:[['forearm','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{rMid:{lumbar:-8,thor:-10,P:[0,93,2]},rTop:{lumbar:-14,thor:-16,neck:-8,P:[0,93,3]}}},
    {id:'cotovelo',view:'lateral',keys:{rMid:{armR:{ua:[0,-66],fa:[0,10]}},rTop:{armR:{ua:[0,-36],fa:[0,74]}}}},
    {id:'curta',view:'lateral',keys:{bottom:{armR:{ua:[0,-90],fa:[0,-35]},armL:{ua:[0,-90],fa:[0,-35]}}}}
  ]
};
export default ex;
