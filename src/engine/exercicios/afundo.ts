// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, dumbbell } from '../desenho';
import { Z, add } from '../math';

const ex = {
  id:'afundo',sets:2,rest:{opts:[90],def:90,note:'Faça uma perna e logo a outra; o descanso vale depois das duas.'},name:'Afundo estático com halteres',short:'Afundo',
  rx:'2 × 8–12 por perna · RIR 1–2 · descanso 1,5 min',target:'Quadríceps e glúteo da perna da frente',
  views:['lateral','frontal'],
  base:{lumbar:4,thor:4,neck:2,legR:{ikS:[10,7,28],poleRel:[.1,.4,1],ft:[5,-18]},legL:{ikS:[10,14,-52],poleRel:[0,-1,.4],ft:[0,-50],heelV:[0,3,-5]},armR:{ua:[0,-90],fa:[0,-89]}},
  keys:{top:{P:[0,83,-11]},mid:{P:[0,66,-11.5]},bottom:{P:[0,51,-12]}},
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em cima',tempo:'respire e firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.3,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],extLabels:['em cima','embaixo'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho da frente']]},
  equip(sk){for(const k of['R','L'])dumbbell(sk.side[k].G,Z,'db'+(this._pal==='e'?'-e':''));},
  guides:{
    lateral(sk){L3(add(sk.P,[0,-12,0]),[0,1,sk.P[2]],'gd',.9,{layer:2,dash:'2 3'});TX([0,1,sk.P[2]],'desce reto',{cls:'lbl-g',anchor:'middle',dy:-5});},
    frontal(sk){const t=sk.side.R.toe;L3([t[0],1,t[2]],[t[0],62,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});TX([t[0],30,t[2]],'joelho sobre o pé',{cls:'lbl-g',anchor:'end',dx:-16});}
  },
  muscles:{p:[['quads','R'],['glutes','R']],s:[['quads','L']]},
  feel:'Frente da coxa e glúteo da perna da frente. A perna de trás ajuda menos.',
  feelNote:'Sentir alongar a frente do quadril da perna de trás é normal.',
  setupEq:['Dois halteres, um em cada mão, com pegada neutra.','Se o equilíbrio atrapalhar, segure a coluna da torre com uma mão e use um halter só, na outra.'],
  setupBody:['Dê um passo largo: pé da frente inteiro no chão, pé de trás apoiado na ponta.','Pés na largura do quadril, como trilhos, e não numa linha só.','Tronco quase vertical, peso mais na perna da frente.'],
  exec:[['hold','Em cima','Os dois joelhos quase estendidos, pés fixos no lugar.'],['ecc','Descida (excêntrica)','~2–3 s. Desça reto, levando o joelho de trás em direção ao chão.'],['hold','Embaixo','Joelho de trás a poucos centímetros do chão, coxa da frente perto da horizontal.'],['conc','Subida (concêntrica)','~1–1,5 s. Empurre o chão com o pé da frente inteiro.']],
  range:['Embaixo: joelho de trás quase encostando no chão.','Em cima: pare um pouco antes de estender os joelhos totalmente, para manter a tensão.','Se o calcanhar da frente sair do chão, o passo está curto: afaste mais os pés.'],
  breath:'Inspire em cima e firme o abdômen. Solte o ar subindo.',
  cues:['Desce reto.','Joelho de trás no chão.','Pé da frente inteiro.'],
  check:['Passo largo','Pés como trilhos','Calcanhar da frente no chão','Tronco quase vertical','Comece pela perna mais fraca'],
  vary:'O tamanho do passo muda o foco: passo mais curto, com o joelho mais à frente, trabalha mais o quadríceps; passo mais longo, com o tronco um pouco inclinado, trabalha mais o glúteo. Os dois servem.',
  errors:[
    {id:'valgo',title:'Joelho da frente para dentro',view:'frontal',desc:'O joelho cai para dentro e a carga vai para a articulação.',keys:{mid:{legR:{ikS:[10,7,28],poleRel:[-.3,.4,1],ft:[5,-18]}},bottom:{legR:{ikS:[10,7,28],poleRel:[-.3,.4,1],ft:[5,-18]}}}},
    {id:'tronco',title:'Tronco cai para a frente',view:'lateral',desc:'O peito cai e a lombar trabalha para segurar. Mantenha o tronco quase vertical.',keys:{mid:{lumbar:16,thor:18},bottom:{lumbar:28,thor:34,neck:30}}},
    {id:'raso',title:'Descer pouco',view:'lateral',desc:'Parar com o joelho de trás longe do chão corta a parte mais produtiva da amplitude.',keys:{mid:{P:[0,76,-11.2]},bottom:{P:[0,70,-11.5]}}}
  ]
};
export default ex;
