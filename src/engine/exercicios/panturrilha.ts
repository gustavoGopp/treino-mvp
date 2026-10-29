// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbell, tower } from '../desenho';
import { X, Y, Z } from '../math';

const ex = {
  id:'panturrilha',sets:3,rest:{opts:[60],def:60,note:'Alterne as pernas sem pausa; o descanso vale depois das duas.'},name:'Panturrilha unilateral no step',short:'Panturrilha',
  rx:'3 × 10–15 por perna · RIR 0–1 · descanso 1 min',target:'Panturrilha (gastrocnêmio e sóleo)',
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
  ext:['stretch','top'],extLabels:['alongado','topo'],
  paths:{lateral:[['heel','R','calcanhar']],zoom:[['heel','R','calcanhar']]},
  tower:{x:22,z:52,ac:X,out:[0,0,-1],py:12},
  equip(sk){BOX([-4,7.5,24],[[X,34],[Y,7.5],[Z,16]],'eqp',{bias:-3});dumbbell(sk.side.R.G,Z,'db'+(this._pal==='e'?'-e':''));tower(this.tower,0);},
  guides:{
    lateral(sk){L3([-11,15,8],[-11,15,-30],'gd',.9,{layer:3,dash:'2 3'});TX([-11,15,-30],'borda do step',{cls:'lbl-g',anchor:'end',dx:-4,dy:4});},
    zoom(sk){L3([-11,15,8],[-11,15,-38],'gd',.9,{layer:3,dash:'2 3'});TX([-11,15,-38],'borda do step',{cls:'lbl-g',dy:14});}
  },
  muscles:{p:[['calf','R']],s:[]},
  feel:'Panturrilha, da parte de trás do joelho até o calcanhar.',
  feelNote:'Queimação forte no fim da série é normal nesse músculo. Dor em pontada no tendão de Aquiles não é: pare.',
  setupEq:['Step firme no chão, perto da torre.','Halter na mão do mesmo lado da perna que trabalha; a outra mão segura a torre.'],
  setupBody:['Ponta do pé (a “bola” do pé) na borda do step, calcanhar para fora.','A outra perna dobrada atrás, sem apoiar.','Joelho da perna de apoio quase estendido e parado.'],
  exec:[['hold','Alongado','Calcanhar abaixo da borda do step. Segure 2 s.'],['conc','Subida (concêntrica)','~1 s. Suba o máximo que der na ponta do pé, empurrando pelo dedão.'],['hold','Topo','Segure ~1 s contraindo.'],['ecc','Descida (excêntrica)','~2 s, até o calcanhar passar a borda.']],
  range:['Embaixo: calcanhar o mais baixo que der, com a panturrilha bem alongada.','Em cima: o mais alto possível na ponta do pé.','A pausa de 2 s embaixo tira o “rebote” do tendão e faz o músculo trabalhar mais.'],
  breath:'Respire normalmente: solte o ar subindo, inspire descendo.',
  cues:['Pausa embaixo.','Sobe pelo dedão.','Joelho parado.'],
  check:['Step firme','Ponta do pé na borda','Mão na torre','Joelho quase estendido','Pausa de 2 s embaixo'],
  vary:'O quanto o calcanhar desce depende da mobilidade do tornozelo. Com o joelho estendido trabalha mais o gastrocnêmio; dobrar o joelho de propósito passa o trabalho para o sóleo, que é outro exercício.',
  errors:[
    {id:'curta',title:'Não descer o calcanhar',view:'lateral',desc:'Sem passar a borda do step, você perde a parte alongada, que é a mais importante para a panturrilha.',keys:{stretch:{P:[-3,101,-8.9],legR:{ikS:[11,16.5,-7.9],poleRel:[0,0,1],ft:[0,-5]}}}},
    {id:'joelho',title:'Dobrar e esticar o joelho',view:'lateral',desc:'O joelho dá impulso com a coxa e tira carga da panturrilha.',keys:{stretch:{P:[-3,86,-10]},mid:{P:[-3,100,-9]}}}
  ]
};
export default ex;
