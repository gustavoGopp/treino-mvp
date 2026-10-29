// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbellV } from '../desenho';
import { X, Y, Z, add, mid } from '../math';

/* ================= exercícios: Membros A ================= */
const ex = {
  id:'goblet',sets:3,rest:{opts:[120],def:120},name:'Agachamento goblet com calcanhar elevado',short:'Goblet',
  rx:'3 × 8–15 · RIR 1–2 · descanso 2 min',target:'Quadríceps (frente da coxa)',
  views:['lateral','frontal'],
  base:{legR:{ikS:[15,10,0],poleRel:[.35,.3,1],ft:[15,-30],heelV:[0,-6.5,-4]},armR:{tr:[6,-10,16],poleRel:[.25,-1,.1]}},
  keys:{top:{P:[0,95.3,-1],lumbar:6,thor:6,neck:2},mid:{P:[0,66,-9],lumbar:18,thor:16,neck:8},bottom:{P:[0,39,-15],lumbar:30,thor:26,neck:14}},
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em pé',tempo:'respire e firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · sem quicar',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],extLabels:['em pé','embaixo'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho'],['K','L','']]},
  equip(sk){
    for(const s of[-1,1])BOX([s*15,1.6,-4],[[X,7],[Y,1.6],[Z,9]],'eqd',{bias:-1});
    const top=add(mid(sk.side.R.G,sk.side.L.G),[0,3,0]);dumbbellV(top,'db'+(this._pal==='e'?'-e':''));
  },
  guides:{
    lateral(sk){TX(sk.side.R.K,'joelho pode',{cls:'lbl-g',dx:8,dy:-20});TX(sk.side.R.K,'passar do pé',{cls:'lbl-g',dx:8,dy:-7});TX([-15,0,-12],'anilha sob o calcanhar',{cls:'lbl-g',anchor:'end',dy:-8});},
    frontal(sk){for(const k of['R','L']){const t=sk.side[k].toe;L3([t[0],1,t[2]],[t[0],60,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});}TX([0,1,0],'joelho na direção do pé',{cls:'lbl-g',anchor:'middle',dy:-6});}
  },
  muscles:{p:[['quads','RL']],s:[['glutes','RL']]},
  feel:'Frente das coxas. Glúteos e parte de dentro da coxa trabalham junto.',
  feelNote:'Queimação no quadríceps em séries longas é esperada. Dor na frente do joelho ou na lombar não é: confira a profundidade e a postura.',
  setupEq:['Uma anilha de 5 kg (ou duas empilhadas) embaixo de cada calcanhar, uns 2–4 cm de altura. É mais estável que a borda do step.','Halter montável com a rosca bem apertada, porque você vai segurá-lo pela anilha de cima.','Enquanto os halteres fixos (até 10 kg) bastarem, use um fixo.'],
  setupBody:['Pés um pouco mais abertos que o quadril, pontas levemente para fora.','Halter na vertical, encostado no peito, mãos em concha embaixo da anilha de cima.','Cotovelos apontando para baixo, peito alto.'],
  exec:[['hold','Em pé','Joelhos quase estendidos, peso no meio do pé.'],['ecc','Descida (excêntrica)','~2–3 s. Os joelhos vão para a frente e para fora, na direção dos pés, e o quadril desce entre os calcanhares.'],['hold','Embaixo','Quadril na altura do joelho ou abaixo, sem perder a postura. Sem quicar.'],['conc','Subida (concêntrica)','~1–1,5 s. Empurre o chão com o pé inteiro, subindo quadril e peito juntos.']],
  range:['Embaixo: o mais fundo que conseguir com o calcanhar apoiado, o peito alto e a lombar neutra. Para a maioria, quadril na altura do joelho ou abaixo.','Em cima: joelhos quase estendidos, sem travar.','Pare de descer antes do ponto em que a lombar começa a arredondar e o quadril “vira” para baixo.'],
  breath:'Inspire em pé e firme o abdômen antes de descer. Mantenha a pressão na descida e no começo da subida, e solte o ar depois do trecho mais difícil. Em séries longas, respire a cada repetição, sempre em cima.',
  cues:['Joelhos para a frente e para fora.','Peito alto, halter colado.','Desce entre os calcanhares.'],
  check:['Anilhas sob os calcanhares','Rosca do halter apertada','Pés um pouco mais abertos que o quadril','Halter colado no peito','Carga para RIR 1–2'],
  vary:'A largura dos pés, o quanto as pontas abrem e a profundidade dependem do seu quadril e do tornozelo. Aqui o joelho passar da ponta do pé é normal: impedir isso joga a carga para o quadril e a lombar (um estudo pequeno, Fry et al. 2003). O que importa é o joelho seguir a direção do pé e o calcanhar ficar apoiado.',
  errors:[
    {id:'valgo',title:'Joelhos para dentro',view:'frontal',desc:'Os joelhos caem para dentro na descida ou na subida. A carga sai do quadríceps e vai para a articulação do joelho.',keys:{mid:{legR:{ikS:[15,10,0],poleRel:[-.22,.3,1],ft:[15,-30],heelV:[0,-6.5,-4]}},bottom:{legR:{ikS:[15,10,0],poleRel:[-.22,.3,1],ft:[15,-30],heelV:[0,-6.5,-4]}}}},
    {id:'lombar',title:'Tronco cai e a lombar arredonda',view:'lateral',desc:'Embaixo, o peito cai e a lombar arredonda. A carga passa para a coluna.',keys:{mid:{lumbar:26,thor:32},bottom:{P:[0,41,-19],lumbar:46,thor:60,neck:40}}},
    {id:'raso',title:'Descer pouco',view:'lateral',desc:'Parar alto corta a parte da amplitude que mais trabalha o quadríceps.',keys:{mid:{P:[0,83,-5],lumbar:10,thor:10},bottom:{P:[0,72,-8],lumbar:14,thor:13,neck:6}}}
  ]
};
export default ex;
