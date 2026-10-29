// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { CTX } from '../contexto';
import { BOX, L3, TX, dumbbell, tower } from '../desenho';
import { X, Y, Z, add } from '../math';

/* ================= exercícios: Membros B ================= */
const ex = {
  id:'bulgaro',sets:6,setLbl:['1a','1b','2a','2b','3a','3b'],setUnit:'séries (3 por perna)',
  rest:{opts:[90],def:90,note:'O descanso de 1,5 min vale entre uma perna e outra. a = perna mais fraca (comece por ela), b = a outra.'},
  name:'Agachamento búlgaro com apoio',short:'Búlgaro',
  rx:'3 × 8–12 por perna · RIR 1–2 · 1,5 min entre as pernas',target:'Quadríceps e glúteo da perna da frente',
  views:['lateral','frontal'],noCable:true,
  base:{lumbar:14,thor:16,neck:10,legR:{ikS:[11,7,30],poleRel:[.1,.4,1],ft:[5,-18]},legL:{ikS:[10,53,-56],poleRel:[0,-1,.3],ft:[180,-20],heelV:[0,4,5]},
    armR:{ua:[0,-90],fa:[0,-89]},armL:{ikS:[47,100,0],poleRel:[.4,-1,-.2]}},
  keys:{top:{P:[0,80,-12]},mid:{P:[0,65,-12.5]},bottom:{P:[0,50,-13]}},
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em cima',tempo:'firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.3,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.4,kind:'hold',label:'Embaixo',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],extLabels:['em cima','embaixo'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho da frente']]},
  tower:{x:51,z:0,ac:Z,out:[-1,0,0],py:12},
  equip(sk){
    BOX([0,42.5,-84],[[X,13],[Y,2.5],[Z,31]],'eqp',{bias:-4});
    for(const z of[-110,-58])BOX([0,21,z],[[X,2.5],[Y,19],[Z,2.5]],'eqd',{bias:-6});BOX([0,2.5,-84],[[X,4],[Y,2],[Z,28]],'eqd',{bias:-6});
    dumbbell(sk.side.R.G,Z,'db'+(this._pal==='e'?'-e':''));if(CTX.VIEW!=='lateral')tower(this.tower,0);
  },
  guides:{
    lateral(sk){L3(add(sk.P,[0,-12,0]),[0,1,sk.P[2]],'gd',.9,{layer:2,dash:'2 3'});TX([0,1,sk.P[2]],'desce reto',{cls:'lbl-g',anchor:'middle',dy:-5});},
    frontal(sk){const t=sk.side.R.toe;L3([t[0],1,t[2]],[t[0],62,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});TX([t[0],30,t[2]],'joelho sobre o pé',{cls:'lbl-g',anchor:'end',dx:-16});}
  },
  muscles:{p:[['quads','R'],['glutes','R']],s:[]},
  feel:'Frente da coxa e glúteo da perna da frente.',
  feelNote:'Sentir alongar a frente do quadril da perna de trás é normal. Dor no joelho da frente não é: pare e me avise.',
  setupEq:['Banco plano atrás de você; a estação ao lado, para a mão de apoio.','Um halter na mão do lado da perna da frente.'],
  setupBody:['Peito do pé de trás apoiado no banco, cadarço para baixo.','Pé da frente longe o bastante para o calcanhar ficar no chão embaixo: teste antes com o peso do corpo.','A mão livre segura a coluna da estação só para equilibrar, sem puxar.','Tronco levemente inclinado à frente, peso na perna da frente.'],
  exec:[['hold','Em cima','Joelho da frente quase estendido, pés fixos.'],['ecc','Descida (excêntrica)','~2–3 s. Desça reto, levando o joelho de trás em direção ao chão.'],['hold','Embaixo','Coxa da frente perto da horizontal, joelho de trás a poucos centímetros do chão.'],['conc','Subida (concêntrica)','~1–1,5 s. Empurre o chão com o pé da frente inteiro.']],
  range:['Embaixo: coxa da frente perto da horizontal ou um pouco abaixo.','Em cima: pare antes de travar o joelho, para manter a tensão.','Se o calcanhar da frente sair do chão, o pé está perto demais do banco.'],
  breath:'Inspire em cima e firme o abdômen. Solte o ar subindo.',
  cues:['Desce reto.','Peso no pé da frente.','Mão só equilibra.'],
  check:['Peito do pé no banco','Calcanhar da frente no chão','Mão de apoio na estação','Tronco levemente à frente','Comece pela perna mais fraca'],
  vary:'A distância do banco muda o foco: pé da frente mais perto, com o joelho avançando, trabalha mais o quadríceps; mais longe, com o tronco mais inclinado, trabalha mais o glúteo. Os dois servem, desde que o calcanhar fique no chão.',
  errors:[
    {id:'valgo',title:'Joelho da frente para dentro',view:'frontal',desc:'O joelho cai para dentro e a carga vai para a articulação.',keys:{mid:{legR:{ikS:[11,7,30],poleRel:[-.3,.4,1],ft:[5,-18]}},bottom:{legR:{ikS:[11,7,30],poleRel:[-.3,.4,1],ft:[5,-18]}}}},
    {id:'perto',title:'Pé da frente perto do banco',view:'lateral',desc:'O calcanhar da frente sobe e o peso vai para a ponta do pé e para o joelho.',keys:{mid:{legR:{ikS:[11,12,12],poleRel:[.1,.4,1],ft:[5,-48]}},bottom:{legR:{ikS:[11,13,10],poleRel:[.1,.4,1],ft:[5,-52]}}}},
    {id:'raso',title:'Descer pouco',view:'lateral',desc:'Parar com a coxa longe da horizontal corta a parte mais produtiva da amplitude.',keys:{bottom:{P:[0,66,-12.5]}}}
  ]
};
export default ex;
