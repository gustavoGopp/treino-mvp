// @ts-nocheck
// Animação nova (aprovada). Rolamento com a roda abdominal, de joelhos: ajoelhado no colchonete, mãos nos
// pegadores, roda embaixo dos ombros, braços estendidos, abdômen firme; rola à frente devagar (2–3 s), com o quadril
// acompanhando, só até onde a lombar não arqueia; puxa a roda de volta com o abdômen até os ombros voltarem em cima
// das mãos. Parte do nórdico aprovado (mesmas pernas ajoelhadas, joelho fixo), com a roda (peça nova) nas mãos.
// Técnica e fontes: docs/pesquisa/animacoes/roda-abdominal.md.
import { BOX, L3, TX, roda } from '../desenho';
import { X, Y, Z } from '../math';

// pernas: tíbia no chão, joelho em z = 0
const PERNA={ikS:[9,6,-43],poleRel:[0,-.3,1],ft:[180,-15],heelV:[0,4.5,1.5]};
const ex = {
  id:'roda-abdominal',
  views:['lateral'],
  base:{legR:PERNA,wrist:30,wristDir:[0,0,1]},
  keys:{
    start:{P:[0,47,0],lumbar:65,thor:62,neck:50,armR:{ikS:[11,9,47],poleRel:[.2,.3,-1]}},
    mid:{P:[0,45.4,14.7],lumbar:63,thor:60,neck:48,armR:{ikS:[11,9,72],poleRel:[.2,.5,-1]}},
    end:{P:[0,30.9,34.3],lumbar:53,thor:52,neck:45,armR:{ikS:[11,9,105],poleRel:[.2,.6,-1]}}
  },
  seq:[
    {path:['start'],dur:.5,kind:'hold',label:'Ajoelhado',tempo:'roda embaixo dos ombros',breath:'INSPIRA'},
    {path:['start','mid','end'],dur:2.5,kind:'ecc',label:'Ida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'},
    {path:['end'],dur:.5,kind:'hold',label:'Ponto mais longe',tempo:'lombar não afunda',breath:'FIRME'},
    {path:['end','mid','start'],dur:1.5,kind:'conc',label:'Volta · concêntrica',tempo:'~1–2 s',breath:'EXPIRA'}
  ],
  ext:['start','end'],
  paths:{lateral:[['G','R','roda'],['P','','quadril']]},
  equip(sk){
    BOX([0,1.2,-8],[[X,22],[Y,1.2],[Z,14]],'eqp',{bias:-4}); // almofada sob os joelhos
    roda(sk.side.R.G,sk.side.L.G,'db'+(this._pal==='e'?'-e':''));
  },
  guides:{
    lateral(sk){L3(sk.side.R.K,sk.N,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,96,36],'corpo reto, costelas para baixo',{cls:'lbl-g',anchor:'middle'});TX([0,-7,60],'só até onde a lombar não arqueia',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['rectus','R']],s:[['obliq','R']]},
  errors:[
    // arquear a lombar: a barriga cai e a lombar afunda no fim da ida
    {id:'lombar',view:'lateral',keys:{mid:{P:[0,43,16],lumbar:74,thor:52,neck:42,armR:{ikS:[11,9,74],poleRel:[.2,.5,-1]}},end:{P:[0,27,36],lumbar:72,thor:40,neck:36,armR:{ikS:[11,9,104],poleRel:[.2,.6,-1]}}}},
    // deixar o quadril para trás: só os braços vão à frente, o quadril fica parado e o tronco deita
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,47,2],lumbar:76,thor:74,neck:60,armR:{ikS:[11,9,72],poleRel:[.2,.5,-1]}},end:{P:[0,47,0],lumbar:86,thor:84,neck:66,armR:{ikS:[11,9,91],poleRel:[.2,.6,-1]}}}},
    // ir rápido demais: chega ao ponto mais longe logo no começo da ida
    {id:'rapido',view:'lateral',keys:{mid:{P:[0,30.9,34.3],lumbar:53,thor:52,neck:45,armR:{ikS:[11,9,105],poleRel:[.2,.6,-1]}}}}
  ]
};
export default ex;
