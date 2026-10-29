// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { C3, L3, TX, cable, liftOf, tower } from '../desenho';
import { Y, Z, add, comb } from '../math';

const ex = {
  id:'elevacao-lateral',sets:3,rest:{opts:[60],def:60,note:'Faça um lado e logo o outro, sem pausa. O descanso vale depois dos dois lados. Em bi-set com o face pull: sem pausa entre os dois e 1 min ao fim de cada volta.'},name:'Elevação lateral unilateral na polia',short:'Elevação lateral',
  rx:'3 × 10–15 por lado · RIR 0–1 · sem pausa entre os lados',target:'Deltoide lateral (lateral do ombro)',
  views:['frontal','lateral'],
  base:{P:[0,93,0],lumbar:0,thor:0,neck:0,roll:-4,legR:{ikS:[11,7,2],poleRel:[0,0,1],ft:[8,-18]},armL:{ikS:[40,125,6],poleRel:[.2,-1,-.3]}},
  keys:{
    low:{armR:{sph:[-40,-68,62],poleRel:[1,.25,-.4]}},
    mid:{armR:{sph:[25,-36,62],poleRel:[.7,.6,-.5]}},
    high:{armR:{sph:[60,-3,62],poleRel:[.25,1,-.5]}}
  },
  seq:[
    {path:['low'],dur:.3,kind:'hold',label:'Embaixo',tempo:'cabo tenso',breath:'INSPIRA'},
    {path:['low','mid','high'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['high'],dur:.25,kind:'hold',label:'Linha do ombro',tempo:'',breath:'FIRME'},
    {path:['high','mid','low'],dur:2.1,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['low','high'],extLabels:['embaixo','topo'],
  paths:{frontal:[['G','R','mão'],['E','R','cotovelo']],lateral:[['G','R','mão']]},
  tower:{x:52,z:0,ac:Z,out:[-1,0,0],py:12},
  equip(sk){const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);C3(sk.side.R.G,2.6,'eqd',{bias:.3});const L=cable(this,'a',sk.side.R.G,pul);tower(t,liftOf(this,'a',L));},
  guides:{
    frontal(sk){const S=sk.side.R.S;L3(add(S,[6,0,0]),add(S,[-80,0,0]),'gd',.9,{layer:2,dash:'2 3'});TX(add(S,[-80,0,0]),'linha do ombro',{cls:'lbl-g',dy:-6});},
    lateral(sk){TX(comb(1,sk.side.R.S,22,Z,44,Y),'braço um pouco à frente do corpo',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltLat','R']],s:[['deltAnt','R'],['upTrap','R']]},
  feel:'Lateral do ombro.',
  feelNote:'Se sentir o pescoço ou o trapézio, o ombro provavelmente está subindo junto com o braço.',
  setupEq:['Carro no ponto mais baixo, com estribo.','Fique de lado para a torre, a cerca de um passo dela.'],
  setupBody:['Segure o estribo com a mão mais longe da torre. O cabo passa na frente do corpo.','A outra mão segura a coluna da torre.','Tronco reto. Pode inclinar um pouco para longe da torre.'],
  exec:[['hold','Embaixo','Mão na frente do quadril, cabo tenso.'],['conc','Subida (concêntrica)','~1–1,5 s. Leve o braço para fora e um pouco à frente do corpo, com o cotovelo levemente dobrado e um pouco acima da mão.'],['hold','Topo','Braço na linha do ombro.'],['ecc','Descida (excêntrica)','~2 s, controlando até a frente do quadril.']],
  range:['Em cima: mais ou menos na linha do ombro.','Embaixo: mão na frente do quadril, sem deixar o cabo afrouxar.','Com um ombro saudável dá para subir acima disso, mas o trapézio assume mais. Como o seu ombro estala, fique na linha do ombro.'],
  breath:'Solte o ar subindo e inspire descendo.',
  cues:['Leva a mão para longe, não para cima.','Cotovelo conduz.','Ombro longe da orelha.'],
  check:['Polia no ponto mais baixo','Mão de fora no estribo','Cabo na frente do corpo','Mão livre na torre','Ombro baixo'],
  vary:'O plano exato do braço (de ~20° a ~40° à frente do corpo) depende da postura da sua escápula. A mão pode ficar neutra ou com o polegar levemente para cima, o que alivia a parte de cima do ombro.',
  errors:[
    {id:'balanco',title:'Balançar o tronco',view:'frontal',desc:'O tronco dá o impulso e o ombro trabalha menos.',keys:{low:{roll:4,P:[0,90,0]},mid:{roll:-12},high:{roll:-10}}},
    {id:'encolher',title:'Encolher o ombro',view:'frontal',desc:'O ombro sobe junto com o braço e o trapézio assume.',keys:{mid:{elevR:4},high:{elevR:7}}},
    {id:'frontal',title:'Virar elevação frontal',view:'lateral',desc:'O braço vai para a frente e o exercício passa a trabalhar mais a frente do ombro.',keys:{mid:{armR:{sph:[0,-36,62],poleRel:[.8,.6,-.3]}},high:{armR:{sph:[12,-3,62],poleRel:[.6,1,-.2]}}}}
  ]
};
export default ex;
