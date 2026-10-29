// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, liftOf, rope, tower } from '../desenho';
import { X, Y, add, comb, mul, sub } from '../math';

const ex = {
  id:'triceps-frances',sets:3,rest:{opts:[90],def:90},ropeAttach:true,name:'Tríceps francês na polia com corda',short:'Tríceps francês',
  rx:'3 × 10–15 · RIR 0–1 · descanso 1,5 min',target:'Tríceps, principalmente a cabeça longa',
  views:['lateral','frontal'],
  base:{P:[0,86,-4],lumbar:26,thor:30,neck:12,legR:{ikS:[12,7,28],poleRel:[.1,.3,1],ft:[6,-18]},legL:{ikS:[11,10,-40],poleRel:[0,-.3,1],ft:[0,-45],heelV:[0,3,-5]}},
  keys:{stretch:{armR:{ua:[-10,55],fa:[0,200]}},mid:{armR:{ua:[-10,55],fa:[0,145]}},end:{armR:{ua:[-10,55],fa:[0,62]}}},
  seq:[
    {path:['stretch'],dur:.5,kind:'hold',label:'Alongado',tempo:'mãos atrás da cabeça',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.4,kind:'hold',label:'Braços estendidos',tempo:'',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.3,kind:'ecc',label:'Volta · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],extLabels:['alongado','fim'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']],frontal:[['E','R','cotovelo'],['E','L','']]},
  tower:{x:0,z:-60,ac:X,out:[0,0,1],py:150},
  equip(sk){const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);const L=rope(this,'a',sk,pul);tower(t,liftOf(this,'a',L));},
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,mul(sub(R.E,R.S),1.45)),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(R.E,mul(sub(R.E,R.S),.45)),'cotovelo parado',{cls:'lbl-g',dx:8});},
    frontal(sk){for(const k of['R','L']){const sd=sk.side[k];L3(sd.S,add(sd.S,mul(sub(sd.E,sd.S),1.35)),'gd',.9,{layer:3,dash:'3 2.5'});}TX(add(sk.Hc,[-28,-16,0]),'cotovelos',{cls:'lbl-g',anchor:'end'});TX(add(sk.Hc,[-28,-16,0]),'para a frente',{cls:'lbl-g',anchor:'end',dy:15});}
  },
  muscles:{p:[['triceps','RL']],s:[['rectus','R']]},
  feel:'Parte de trás do braço, com alongamento forte embaixo, atrás da cabeça.',
  feelNote:'Dor no cotovelo na parte alongada: reduza a carga e a amplitude e me avise. Desconforto no ombro: abra um pouco os cotovelos ou troque pelo tríceps francês sentado com halter.',
  setupEq:['Carro mais ou menos na altura do ombro, com a corda.','Pegue a corda, vire de costas para a torre e dê um passo à frente para o cabo ficar tenso.'],
  setupBody:['Um pé à frente do outro, joelhos destravados.','Tronco inclinado à frente ~25–30°, abdômen firme.','Braços acima da cabeça, ao lado das orelhas, cotovelos apontando para a frente.'],
  exec:[['hold','Alongado','Mãos atrás da cabeça, cotovelos bem dobrados.'],['conc','Extensão (concêntrica)','~1 s. Estenda só o cotovelo, levando as mãos para a frente e para cima.'],['hold','Fim','Braços estendidos na linha do tronco.'],['ecc','Volta (excêntrica)','~2–3 s, deixando as mãos irem bem para trás da cabeça.']],
  range:['Embaixo: mãos atrás da cabeça, cotovelos bem dobrados, sem dor.','Em cima: cotovelos estendidos.','Os cotovelos ficam no mesmo lugar do início ao fim.'],
  breath:'Solte o ar estendendo, inspire voltando.',
  cues:['Cotovelos parados.','Alonga atrás da cabeça.','Abdômen firme.'],
  check:['Polia na altura do ombro','Pés um à frente do outro','Tronco inclinado','Cotovelos à frente','Carga menor que no tríceps corda'],
  vary:'Com o braço acima da cabeça, a cabeça longa do tríceps trabalha alongada. Num estudo de 12 semanas, a extensão com o braço acima da cabeça gerou cerca de 1,4 vez mais hipertrofia do tríceps que a extensão com o braço ao lado do corpo, mesmo com cargas 34–39% menores (Maeo et al., 2023; um estudo). A polia embaixo, em pé e reto, também serve.',
  errors:[
    {id:'abre',title:'Cotovelos abrem para os lados',view:'frontal',desc:'O ombro gira e a carga sai do tríceps. Mantenha os cotovelos apontando para a frente.',keys:{stretch:{armR:{ua:[40,50],fa:[0,200]}},mid:{armR:{ua:[42,50],fa:[0,145]}},end:{armR:{ua:[30,52],fa:[0,62]}}}},
    {id:'cotovelo',title:'Cotovelos sobem e descem',view:'lateral',desc:'O ombro entra no movimento e o exercício vira um pullover. Só o antebraço se mexe.',keys:{stretch:{armR:{ua:[-10,30],fa:[0,185]}},mid:{armR:{ua:[-10,40],fa:[0,135]}}}},
    {id:'curta',title:'Não alongar atrás da cabeça',view:'lateral',desc:'Parar com o cotovelo a 90° perde a parte alongada, que é o motivo deste exercício.',keys:{stretch:{armR:{ua:[-10,55],fa:[0,150]}}}}
  ]
};
export default ex;
