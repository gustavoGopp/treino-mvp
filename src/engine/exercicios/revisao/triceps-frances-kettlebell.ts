// @ts-nocheck
// Animação nova (em revisão). Tríceps francês com um kettlebell: sentado, as duas mãos nos lados da alça
// ("chifres"), a bola para baixo, atrás da cabeça; cotovelos apontando para cima e parados. Parte do tríceps francês
// com halter aprovado (mesmo corpo e mesmo braço). Técnica e fontes: docs/pesquisa/animacoes/triceps-frances-kettlebell.md.
import { BOX, L3, TX, kettlebell } from '../../desenho';
import { X, Y, Z, add, mid, mul, sub } from '../../math';

const ex = {
  id:'triceps-frances-kettlebell',
  views:['lateral','frontal'],
  base:{P:[0,53,0],lumbar:-2,thor:-4,neck:0,legR:{ikS:[16,7,40],poleRel:[.3,.5,1],ft:[12,-20]}},
  keys:{
    stretch:{armR:{ua:[-14,74],fa:[220,-58]}},
    mid:{armR:{ua:[-18,76],fa:[200,12]}},
    end:{armR:{ua:[-24,78],fa:[264,71]}}
  },
  seq:[
    {path:['stretch'],dur:.5,kind:'hold',label:'Alongado',tempo:'halter atrás da cabeça',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.4,kind:'hold',label:'Braços estendidos',tempo:'',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.4,kind:'ecc',label:'Volta · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],frontal:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){
    BOX([0,45,6],[[X,13],[Y,2.5],[Z,17]],'eqp',{bias:-4});
    BOX([0,2.5,0],[[X,4],[Y,2],[Z,30]],'eqd',{bias:-6});BOX([0,22,4],[[X,2.5],[Y,20],[Z,2.5]],'eqd',{bias:-6});
    kettlebell(null,[0,-1,0],X,'db'+(this._pal==='e'?'-e':''),{maos:[sk.side.R.G,sk.side.L.G]});
  },
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,mul(sub(R.E,R.S),1.45)),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(R.E,mul(sub(R.E,R.S),.45)),'cotovelo parado',{cls:'lbl-g',dx:8});},
    frontal(sk){for(const k of['R','L']){const sd=sk.side[k];L3(sd.S,add(sd.S,mul(sub(sd.E,sd.S),1.35)),'gd',.9,{layer:3,dash:'3 2.5'});}TX(add(sk.Hc,[-30,-14,0]),'cotovelos perto',{cls:'lbl-g',anchor:'end'});TX(add(sk.Hc,[-30,-14,0]),'da cabeça',{cls:'lbl-g',anchor:'end',dy:15});}
  },
  muscles:{p:[['triceps','RL']],s:[]},
  errors:[
    {id:'abre',view:'frontal',keys:{stretch:{armR:{ua:[30,64],fa:[249,-48]}},mid:{armR:{ua:[34,66],fa:[321,7]}},end:{armR:{ua:[24,72],fa:[252,56]}}}},
    {id:'arco',view:'lateral',keys:{mid:{lumbar:-16,thor:-22,neck:-10},end:{lumbar:-22,thor:-30,neck:-16}}},
    {id:'curta',view:'lateral',keys:{stretch:{armR:{ua:[-18,76],fa:[200,10]}}}}
  ]
};
export default ex;
