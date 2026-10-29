// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { C3, PL3, TX, cable, liftOf, tower } from '../desenho';
import { Y, Z, add, comb, dirAE, mul } from '../math';

const ex = {
  id:'crucifixo-polia',sets:3,rest:{opts:[90],def:90},name:'Crucifixo na polia (crossover)',short:'Crucifixo polia',
  rx:'3 × 10–15 · RIR 0–1 · descanso 1,5 min',target:'Peitoral maior',
  views:['frontal','top'],
  base:{P:[0,91,4],lumbar:12,thor:12,neck:4,legR:{ikS:[11,7,-16],poleRel:[.1,0,1],ft:[8,-18]},legL:{ikS:[11,7,24],poleRel:[.1,0,1],ft:[8,-18]}},
  keys:{
    open:{pro:-2,armR:{sph:[100,-6,62],poleRel:[.45,.25,-1]}},
    mid:{pro:-1,armR:{sph:[45,-11,62],poleRel:[.8,.2,-.7]}},
    close:{pro:1,armR:{sph:[-16,-16,62],poleRel:[1,.1,-.25]}}
  },
  seq:[
    {path:['open'],dur:.5,kind:'hold',label:'Alongado',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['open','mid','close'],dur:1.3,kind:'conc',label:'Fechamento · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['close'],dur:.5,kind:'hold',label:'Mãos juntas',tempo:'pausa curta',breath:'FIRME'},
    {path:['close','mid','open'],dur:2.5,kind:'ecc',label:'Abertura · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['open','close'],extLabels:['aberto','fechado'],
  paths:{frontal:[['G','R','mãos'],['G','L','']],top:[['G','R','mãos em arco'],['G','L',''],['E','R','cotovelo']]},
  towers:[{x:-84,z:-45,ac:Z,out:[1,0,0],py:140},{x:84,z:-45,ac:Z,out:[-1,0,0],py:140}],
  bounds:{frontal:[-96,96,-196,0]},
  equip(sk){
    const ids=['r','l'];
    this.towers.forEach((t,i)=>{const k=i?'L':'R';const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);C3(sk.side[k].G,2.6,'eqd',{bias:.3});const L=cable(this,ids[i],sk.side[k].G,pul);tower(t,liftOf(this,ids[i],L));});
  },
  guides:{
    top(sk){for(const k of['R','L']){const sd=sk.side[k];const pts=[];for(let a=104;a>=-18;a-=6)pts.push(add(sd.S,mul(dirAE(a,-10,sd.s),62)));PL3(pts,'gd',.9,{layer:2,dash:'2 3'});}TX(comb(1,sk.N,92,Z),'mãos em arco',{cls:'lbl-g',anchor:'middle'});},
    frontal(sk){TX([0,12,0],'cotovelo levemente dobrado e fixo',{cls:'lbl-g',anchor:'middle',dy:-4});}
  },
  muscles:{p:[['pecStern','RL'],['pecClav','RL']],s:[['deltAnt','RL']]},
  feel:'Peitoral, principalmente meio e parte de cima. A frente do ombro ajuda.',
  feelNote:'Se sentir mais o bíceps ou o ombro, confira se os cotovelos estão dobrando e esticando, o que transforma o crucifixo em supino.',
  setupEq:['Os dois carros na altura do ombro, com estribos.','Pegue um estribo de cada vez e dê 1–2 passos à frente da linha das torres, até o cabo ficar tenso com os braços abertos.'],
  setupBody:['Um pé à frente do outro, joelhos levemente dobrados.','Tronco levemente inclinado à frente, peito alto, ombros para trás.','Cotovelos levemente dobrados. Esse ângulo fica igual a série toda.'],
  exec:[['hold','Alongado','Braços abertos, mãos mais ou menos na linha do corpo, peito alongado.'],['conc','Fechamento (concêntrica)','~1–1,5 s. Leve as mãos em arco até se encontrarem na frente do peito, como se fosse abraçar uma árvore.'],['hold','Fim','Mãos juntas na frente da parte de baixo do peito.'],['ecc','Abertura (excêntrica)','~2–3 s. Abra no mesmo arco, controlando, até sentir o peito alongar.']],
  range:['Início: mãos na linha do corpo ou um pouco atrás, peito alongado e ombro encaixado.','Fim: mãos se encontram na frente do peito.','Não abra mais se o ombro rolar para a frente ou se a sensação for na articulação do ombro.'],
  breath:'Inspire abrindo, solte o ar fechando.',
  cues:['Cotovelos travados no mesmo ângulo.','Abraça a árvore.','Peito alto, ombro para trás.'],
  check:['Polias na altura do ombro','1–2 passos à frente','Pés escalonados','Cotovelos levemente dobrados','Cabo tenso com os braços abertos'],
  vary:'A altura das polias muda a região mais trabalhada: polia alta favorece a parte de baixo do peito; polia baixa, a de cima. O quanto abrir depende da mobilidade do ombro.',
  errors:[
    {id:'supino',title:'Transformar em supino',view:'top',desc:'Dobrar e esticar o cotovelo transforma o crucifixo num supino e tira a tensão do peito no alongamento.',keys:{open:{armR:{sph:[100,-6,50],poleRel:[.45,.25,-1]}},mid:{armR:{sph:[45,-11,38],poleRel:[.9,.1,-.5]}}}},
    {id:'abrir',title:'Abrir demais',view:'top',desc:'Abrir além da mobilidade leva o ombro para a frente e a carga para a articulação.',keys:{open:{pro:7,armR:{sph:[132,-2,62],poleRel:[.3,.3,-1]}}}},
    {id:'tronco',title:'Usar o tronco',view:'lateral',desc:'Curvar o tronco para fechar troca trabalho do peito por impulso.',keys:{mid:{lumbar:20,thor:24},close:{lumbar:30,thor:40,neck:30}}}
  ]
};
export default ex;
