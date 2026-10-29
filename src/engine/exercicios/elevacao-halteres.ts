// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, dumbbell } from '../desenho';
import { Y, Z, add, comb } from '../math';

const ex = {
  id:'elevacao-halteres',sets:3,rest:{opts:[60],def:60},name:'Elevação lateral com halteres',short:'Elevação lateral',
  rx:'3 × 12–20 · RIR 0–1 · descanso 1 min',target:'Deltoide lateral (lateral do ombro)',
  views:['frontal','lateral'],
  base:{P:[0,93,0],lumbar:8,thor:10,neck:6,legR:{ikS:[11,7,2],poleRel:[0,0,1],ft:[8,-18]}},
  keys:{low:{armR:{sph:[20,-80,62],poleRel:[1,.2,-.3]}},mid:{armR:{sph:[45,-38,62],poleRel:[.7,.6,-.5]}},high:{armR:{sph:[60,-3,62],poleRel:[.25,1,-.5]}}},
  seq:[
    {path:['low'],dur:.3,kind:'hold',label:'Embaixo',tempo:'',breath:'INSPIRA'},
    {path:['low','mid','high'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['high'],dur:.25,kind:'hold',label:'Linha do ombro',tempo:'',breath:'FIRME'},
    {path:['high','mid','low'],dur:2.1,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['low','high'],extLabels:['embaixo','topo'],
  paths:{frontal:[['G','R','mão'],['E','R','cotovelo']],lateral:[['G','R','mão']]},
  equip(sk){for(const k of['R','L'])dumbbell(sk.side[k].G,Z,'db'+(this._pal==='e'?'-e':''));},
  guides:{
    frontal(sk){const S=sk.side.R.S;L3(add(S,[6,0,0]),add(S,[-80,0,0]),'gd',.9,{layer:2,dash:'2 3'});TX(add(S,[-80,0,0]),'linha do ombro',{cls:'lbl-g',dy:-6});},
    lateral(sk){TX(comb(1,sk.side.R.S,22,Z,44,Y),'tronco levemente à frente',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltLat','RL']],s:[['deltAnt','RL'],['upTrap','RL']]},
  feel:'Lateral do ombro.',
  feelNote:'Se sentir o pescoço ou o trapézio, o ombro provavelmente está subindo junto com o braço.',
  setupEq:['Halteres fixos (1–10 kg), que sobem de 1 em 1 kg.'],
  setupBody:['Pés na largura do quadril, joelhos destravados.','Tronco levemente inclinado à frente.','Halteres na frente das coxas, palmas para dentro, cotovelos levemente dobrados.'],
  exec:[['hold','Embaixo','Halteres na frente das coxas.'],['conc','Subida (concêntrica)','~1–1,5 s. Leve os braços para fora e um pouco à frente do corpo, com o cotovelo um pouco acima da mão.'],['hold','Topo','Braços na linha dos ombros.'],['ecc','Descida (excêntrica)','~2 s, controlando.']],
  range:['Em cima: mais ou menos na linha do ombro.','Embaixo: halteres perto das coxas, sem relaxar os ombros.','Com um ombro saudável dá para subir um pouco acima, mas o trapézio assume mais. Como o seu ombro estala, fique na linha do ombro.'],
  breath:'Solte o ar subindo e inspire descendo.',
  cues:['Leva a mão para longe, não para cima.','Cotovelo conduz.','Ombro longe da orelha.'],
  check:['Halteres fixos','Tronco levemente à frente','Cotovelos levemente dobrados','Sem embalo','Ombro baixo'],
  vary:'O plano exato do braço (de ~20° a ~40° à frente do corpo) depende da postura da sua escápula. A mão pode ficar neutra ou com o polegar levemente para cima, o que alivia a parte de cima do ombro.',
  errors:[
    {id:'balanco',title:'Balançar o tronco',view:'lateral',desc:'O tronco dá o impulso e o ombro trabalha menos. Se precisar balançar, o halter está pesado.',keys:{low:{lumbar:22,thor:26},mid:{P:[0,90,0],lumbar:-4,thor:-6},high:{lumbar:-6,thor:-8}}},
    {id:'encolher',title:'Encolher os ombros',view:'frontal',desc:'Os ombros sobem junto com os braços e o trapézio assume.',keys:{mid:{elev:4},high:{elev:7}}},
    {id:'frontal',title:'Virar elevação frontal',view:'lateral',desc:'Os braços vão para a frente e o exercício passa a trabalhar mais a frente do ombro.',keys:{mid:{armR:{sph:[5,-36,62],poleRel:[.8,.6,-.3]}},high:{armR:{sph:[12,-3,62],poleRel:[.6,1,-.2]}}}}
  ]
};
export default ex;
