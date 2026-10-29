// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, liftOf, rope, tower } from '../desenho';
import { X, Y, add, comb } from '../math';

const ex = {
  id:'triceps-corda',sets:3,rest:{opts:[90,60],def:90,note:'Em bi-set com a rosca: rosca, tríceps e 1 min de descanso.'},name:'Tríceps na polia com corda',short:'Tríceps corda',ropeAttach:true,
  rx:'3 × 10–15 · RIR 0–1 · descanso 1,5 min',target:'Tríceps',
  views:['lateral'],
  base:{P:[0,93,0],lumbar:8,thor:10,neck:8,legR:{ikS:[12,7,-4],poleRel:[0,0,1],ft:[8,-18]}},
  keys:{up:{armR:{ua:[5,-84],fa:[-5,22]}},mid:{armR:{ua:[5,-84],fa:[25,-35]}},down:{armR:{ua:[5,-84],fa:[70,-78]}}},
  seq:[
    {path:['up'],dur:.4,kind:'hold',label:'Em cima',tempo:'cotovelos colados',breath:'INSPIRA'},
    {path:['up','mid','down'],dur:1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['down'],dur:.5,kind:'hold',label:'Embaixo · corda aberta',tempo:'contrai',breath:'FIRME'},
    {path:['down','mid','up'],dur:2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['up','down'],extLabels:['em cima','embaixo'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']]},
  tower:{x:0,z:66,ac:X,out:[0,0,-1],py:205},
  equip(sk){const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const L=rope(this,'a',sk,pul);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-44,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo colado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});}
  },
  muscles:{p:[['triceps','RL']],s:[]},
  feel:'Parte de trás do braço (tríceps), principalmente as cabeças lateral e medial.',
  feelNote:'O tríceps francês do Membros B complementa este, porque trabalha mais a cabeça longa.',
  setupEq:['Carro no ponto mais alto, com a corda.','Fique de frente para a torre, a cerca de meio passo.'],
  setupBody:['Pés na largura do quadril ou um à frente do outro.','Tronco levemente inclinado à frente, abdômen firme.','Cotovelos colados nas laterais do tronco, mãos nas bolinhas da corda.'],
  exec:[['hold','Em cima','Mãos na altura do peito, cotovelos dobrados e colados.'],['conc','Extensão (concêntrica)','~1 s. Estenda o cotovelo e, no fim, abra a corda levando as mãos para os lados das coxas.'],['hold','Embaixo','Braço estendido. Segure um instante.'],['ecc','Volta (excêntrica)','~2 s, até as mãos voltarem à altura do peito.']],
  range:['Embaixo: cotovelo totalmente estendido, com a corda aberta.','Em cima: mãos perto do peito, sem os cotovelos saírem do lugar.','Se os cotovelos sobem para as mãos irem mais alto, você passou do ponto.'],
  breath:'Solte o ar estendendo, inspire voltando.',
  cues:['Cotovelos colados.','Abre a corda no fim.','Tronco parado.'],
  check:['Polia no alto','Corda no mosquetão','Cotovelos colados','Tronco levemente à frente','Carga para RIR 0–1'],
  vary:'A inclinação do tronco, de reto até ~20°, é preferência. O essencial é o cotovelo ficar parado.',
  errors:[
    {id:'cotovelo',title:'Cotovelos sobem e saem do tronco',view:'lateral',desc:'O ombro entra no movimento e o tríceps trabalha menos.',keys:{up:{armR:{ua:[0,-45],fa:[-5,45]}},mid:{armR:{ua:[0,-62],fa:[20,-20]}}}},
    {id:'tronco',title:'Debruçar o tronco',view:'lateral',desc:'Debruçar sobre a corda usa o peso do corpo para empurrar.',keys:{mid:{lumbar:18,thor:24},down:{lumbar:28,thor:38,neck:30}}}
  ]
};
export default ex;
