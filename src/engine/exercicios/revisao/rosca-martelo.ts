// @ts-nocheck
// Animação nova (em revisão). Rosca martelo em pé, alternada, halteres com a pegada neutra (palmas uma para a outra,
// polegares para cima). Parte da rosca alternada aprovada: mesmo corpo e mesmo caminho do braço; muda o halter,
// que fica sempre de pé em relação ao antebraço (cabo apontando para a frente embaixo e para cima no topo).
// Técnica e fontes: docs/pesquisa/animacoes/rosca-martelo.md.
import { L3, TX, dumbbell3 } from '../../desenho';
import { X, add, cross, norm, sub } from '../../math';

const baixo={ua:[0,-90],fa:[0,-86]};
// Pegada neutra: o cabo do halter fica no plano do movimento, perpendicular ao antebraço.
const neutro=(sd)=>norm(cross(X,sub(sd.G,sd.E)));
const ex = {
  id:'rosca-martelo',
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
    {path:['bottom'],dur:.5,kind:'hold',label:'Embaixo',tempo:'palmas para dentro',breath:'INSPIRA'},
    {path:['bottom','rMid','rTop'],dur:1.1,kind:'conc',label:'Direito sobe · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['rTop'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'},
    {path:['rTop','rMid','bottom'],dur:2.2,kind:'ecc',label:'Direito desce · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['bottom','lMid','lTop'],dur:1.1,kind:'conc',label:'Esquerdo sobe · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['lTop'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'},
    {path:['lTop','lMid','bottom'],dur:2.2,kind:'ecc',label:'Esquerdo desce · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['bottom','rTop'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],frontal:[['G','R','halter'],['G','L','']]},
  equip(sk){const c='db'+(this._pal==='e'?'-e':'');for(const k of['R','L'])dumbbell3(sk.side[k].G,neutro(sk.side[k]),c,k==='R'?{layer:1.4}:{});},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-40,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo parado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});TX([0,128,-14],'polegar para cima',{cls:'lbl-g',anchor:'end'});},
    frontal(sk){TX([24,132,0],'palmas para dentro',{cls:'lbl-g',anchor:'start'});}
  },
  muscles:{p:[['biceps','RL']],s:[['forearm','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{rMid:{lumbar:-8,thor:-10,P:[0,93,2]},rTop:{lumbar:-14,thor:-16,neck:-8,P:[0,93,3]}}},
    {id:'cotovelo',view:'lateral',keys:{rMid:{armR:{ua:[0,-66],fa:[0,10]}},rTop:{armR:{ua:[0,-36],fa:[0,74]}}}},
    {id:'curta',view:'lateral',keys:{bottom:{armR:{ua:[0,-90],fa:[0,-35]},armL:{ua:[0,-90],fa:[0,-35]}}}}
  ]
};
export default ex;
