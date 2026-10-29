// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import base from './panturrilha';
import { X } from '../math';

const src = base;
const ex = {
  id:'panturrilha-b',sets:3,rest:{opts:[60],def:60},name:'Panturrilha em pé no step',short:'Panturrilha',
  rx:'3 × 12–20 · RIR 0–1 · descanso 1 min',target:'Panturrilha (gastrocnêmio e sóleo)',
  views:['lateral','zoom'],noCable:true,bounds:{zoom:[-42,46,-52,3]},
  base:{lumbar:0,thor:0,neck:0,armR:{ua:[0,-90],fa:[0,-89]},armL:{ikS:[12,135,49],poleRel:[.3,-1,-.2]}},
  keys:{
    stretch:{P:[0,93.1,-7.8],legR:{ikS:[11,8.6,-6.8],poleRel:[0,0,1],ft:[0,22]}},
    mid:{P:[0,104.75,-8.2],legR:{ikS:[11,20.25,-7.2],poleRel:[0,0,1],ft:[0,-18]}},
    top:{P:[0,113.4,-1.75],legR:{ikS:[11,28.9,-.75],poleRel:[0,0,1],ft:[0,-55]}}
  },
  seq:src.seq.map(g=>Object.assign({},g)),
  ext:['stretch','top'],extLabels:['alongado','topo'],
  paths:{lateral:[['heel','R','calcanhar']],zoom:[['heel','R','calcanhar']]},
  tower:{x:22,z:52,ac:X,out:[0,0,-1],py:12},
  equip:src.equip,guides:src.guides,
  muscles:{p:[['calf','RL']],s:[]},
  feel:'Panturrilhas, da parte de trás do joelho até o calcanhar.',
  feelNote:src.feelNote,
  setupEq:['Step firme no chão, perto da estação.','Um halter numa mão e a outra mão na estação; ou um halter em cada mão, se o equilíbrio estiver bom.'],
  setupBody:['Pontas dos dois pés (a “bola” do pé) na borda do step, calcanhares para fora.','Pés na largura do quadril, apontando para a frente.','Joelhos quase estendidos e parados.'],
  exec:[['hold','Alongado','Calcanhares abaixo da borda do step. Segure 2 s.'],['conc','Subida (concêntrica)','~1 s. Suba o máximo que der na ponta dos pés, empurrando pelo dedão.'],['hold','Topo','Segure ~1 s contraindo.'],['ecc','Descida (excêntrica)','~2 s, até os calcanhares passarem a borda.']],
  range:src.range,breath:src.breath,
  cues:['Pausa embaixo.','Sobe pelo dedão.','Joelhos parados.'],
  check:['Step firme','Pontas dos pés na borda','Mão na estação','Joelhos quase estendidos','Pausa de 2 s embaixo'],
  vary:src.vary,
  errors:[
    {id:'curta',title:'Não descer os calcanhares',view:'lateral',desc:'Sem passar a borda do step, você perde a parte alongada, que é a mais importante para a panturrilha.',keys:{stretch:{P:[0,101,-8.9],legR:{ikS:[11,16.5,-7.9],poleRel:[0,0,1],ft:[0,-5]}}}},
    {id:'joelho',title:'Dobrar e esticar os joelhos',view:'lateral',desc:'Os joelhos dão impulso com as coxas e tiram carga das panturrilhas.',keys:{stretch:{P:[0,86,-10]},mid:{P:[0,100,-9]}}}
  ]
};
export default ex;
