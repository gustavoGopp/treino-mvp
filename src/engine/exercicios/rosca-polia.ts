// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, cable, liftOf, tower } from '../desenho';
import { X, Y, add, comb, mid } from '../math';

const ex = {
  id:'rosca-polia',sets:3,rest:{opts:[90,60],def:90,note:'Em bi-set com o tríceps (cada um numa torre): rosca, tríceps e 1 min de descanso.'},name:'Rosca direta na polia com barra reta',short:'Rosca polia',barAttach:true,
  rx:'3 × 8–12 · RIR 0–1 · descanso 1,5 min',target:'Bíceps',
  views:['lateral'],
  base:{P:[0,93,0],lumbar:0,thor:0,neck:0,legR:{ikS:[12,7,2],poleRel:[0,0,1],ft:[8,-18]},armR:{ua:[0,-84],fa:[-10,-78]}},
  keys:{bottom:{},mid:{armR:{ua:[0,-84],fa:[-10,-10]}},top:{armR:{ua:[0,-84],fa:[-10,55]}}},
  seq:[
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'cabo tenso',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'contrai',breath:'FIRME'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],extLabels:['embaixo','topo'],
  paths:{lateral:[['G','R','barra'],['E','R','cotovelo']]},
  tower:{x:0,z:52,ac:X,out:[0,0,-1],py:12},
  equip(sk){const hr=sk.side.R.G,hl=sk.side.L.G;L3(add(hr,[-6,0,0]),add(hl,[6,0,0]),'db'+(this._pal==='e'?'-e':''),2.8,{bias:.4});const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const L=cable(this,'a',mid(hr,hl),pul);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-44,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo parado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});}
  },
  muscles:{p:[['biceps','RL']],s:[['forearm','RL']]},
  feel:'Frente do braço (bíceps). O antebraço ajuda.',
  feelNote:'Se sentir mais a frente do ombro, os cotovelos provavelmente estão indo para a frente.',
  setupEq:['Carro no ponto mais baixo, com a barra reta.','Fique de frente para a torre, a cerca de meio passo, com o cabo esticado e a barra na altura das coxas.','Dá para fazer em bi-set com o tríceps, um em cada torre.'],
  setupBody:['Pés na largura do quadril, joelhos destravados.','Pegada por baixo (palmas para cima), na largura dos ombros.','Cotovelos encostados nas laterais do tronco, ombros para trás.'],
  exec:[['hold','Embaixo','Braços quase estendidos, cabo tenso.'],['conc','Subida (concêntrica)','~1 s. Dobre só o cotovelo, levando a barra até perto dos ombros.'],['hold','Topo','Segure um instante contraindo.'],['ecc','Descida (excêntrica)','~2–3 s, até os braços quase estenderem.']],
  range:['Embaixo: braço quase estendido, sem deixar o ombro ir para a frente.','Em cima: barra perto dos ombros, com os cotovelos ainda no lugar.','Se para subir mais o cotovelo precisa ir para a frente, você já chegou ao fim da amplitude.'],
  breath:'Solte o ar subindo, inspire descendo.',
  cues:['Cotovelos colados.','Só o antebraço se mexe.','Desce controlando.'],
  check:['Polia no ponto mais baixo','Pegada na largura dos ombros','Cotovelos colados no tronco','Tronco parado','Carga para RIR 0–1'],
  vary:'A largura da pegada pode variar um pouco para deixar punhos e cotovelos confortáveis.',
  errors:[
    {id:'cotovelo',title:'Cotovelos vão para a frente',view:'lateral',desc:'Levar o cotovelo para a frente no fim tira a carga do bíceps e passa para o ombro.',keys:{mid:{armR:{ua:[0,-70],fa:[-10,-5]}},top:{armR:{ua:[0,-45],fa:[-10,72]}}}},
    {id:'balanco',title:'Balançar o tronco',view:'lateral',desc:'Jogar o tronco para trás dá impulso e o bíceps trabalha menos.',keys:{bottom:{lumbar:10,thor:12},mid:{lumbar:-4,thor:-6},top:{P:[0,93,-4],lumbar:-14,thor:-18,neck:-10}}}
  ]
};
export default ex;
