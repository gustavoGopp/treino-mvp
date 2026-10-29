// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbell } from '../desenho';
import { X, Y, Z, add, mul, norm, sub } from '../math';

/* ================= exercícios: Torso B ================= */
const ex = {
  id:'supino-reto',sets:3,rest:{opts:[120,150,180],def:150},name:'Supino reto com halteres',short:'Supino reto',
  rx:'3 × 6–10 · RIR 1–2 · descanso 2–3 min',target:'Peitoral maior (meio do peito)',
  views:['lateral','top'],
  base:{P:[0,53,0],lumbar:-90,thor:-90,neck:-82,pro:-2,elev:-1,legR:{ikS:[16,7,38],poleRel:[.3,.6,1],ft:[10,-22]}},
  keys:{top:{armR:{ua:[90,84],fa:[-90,86]}},mid:{armR:{ua:[65,25],fa:[-90,86]}},bottom:{armR:{ua:[50,-20],fa:[-90,90]}}},
  seq:[
    {path:['top'],dur:.6,kind:'hold',label:'Topo',tempo:'respire',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · sem quicar',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['bottom','top'],extLabels:['embaixo','topo'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],top:[['G','R','halter'],['G','L',''],['E','R','cotovelo']]},
  equip(sk){
    BOX([0,42.5,-34],[[X,13],[Y,2.5],[Z,54]],'eqp',{bias:-4});BOX([0,2.5,-34],[[X,4],[Y,2],[Z,46]],'eqd',{bias:-6});
    for(const z of[-72,6])BOX([0,21,z],[[X,2.5],[Y,18.5],[Z,2.5]],'eqd',{bias:-6});
    const c='db'+(this._pal==='e'?'-e':'');dumbbell(sk.side.R.G,norm([1,0,-.55]),c);dumbbell(sk.side.L.G,norm([1,0,.55]),c);
  },
  guides:{
    lateral(sk){const sd=sk.side.R;L3(sd.E,add(sd.E,[0,44,0]),'gd',1,{layer:3,dash:'3 2.5'});TX(sd.G,'antebraço na vertical',{cls:'lbl-g',dx:16,dy:4});},
    top(sk){const R=sk.side.R;L3(R.S,add(R.S,mul(sk.uT,-30)),'gd',1,{layer:3,dash:'3 2.5'});L3(R.S,add(R.S,mul(sub(R.E,R.S),1.25)),'gd',1,{layer:3,dash:'3 2.5'});
      TX([-36,0,-8],'cotovelo ~30–70° do tronco',{cls:'lbl-g',size:10,anchor:'end',dx:8});TX([36,0,-8],'halter sobre o cotovelo',{cls:'lbl-g',size:10,dx:-8});}
  },
  muscles:{p:[['pecStern','RL']],s:[['pecClav','RL'],['deltAnt','RL'],['triceps','RL']]},
  feel:'Meio do peito. Também a frente do ombro e o tríceps.',
  feelNote:'Se a frente do ombro dominar, confira se os cotovelos não estão abertos demais e se as escápulas continuam no banco.',
  setupEq:['Banco plano.','Aperte a rosca das manoplas antes de cada série.'],
  setupBody:['Pés firmes no chão, um pouco mais abertos que o quadril.','Glúteo, costas e cabeça apoiados no banco.','Escápulas levemente juntas e para baixo, peito alto. A lombar mantém a curva natural.','Pegada levemente neutra: palmas giradas uns 20–30° uma para a outra.','Para deitar com os halteres, sente com eles nas coxas e deite levando-os junto ao peito.'],
  exec:[['hold','Topo','Halteres sobre os ombros, cotovelos quase estendidos.'],['ecc','Descida (excêntrica)','~2–3 s. Antebraço na vertical, halteres descendo ao lado do peito, na linha do mamilo.'],['hold','Embaixo','Pausa curta, sem quicar, com o peito alongado.'],['conc','Subida (concêntrica)','~1–1,5 s. Empurre para cima e um pouco para dentro, terminando sobre os ombros.']],
  range:['Topo: halteres sobre os ombros.','Embaixo: halteres na altura do peito, cotovelos um pouco abaixo da linha do tronco.','Não desça mais se o ombro precisar sair do banco, rolar para a frente ou doer na parte da frente.'],
  breath:'Inspire no topo e durante a descida. Embaixo, mantenha o abdômen firme. Solte o ar na subida, depois do trecho mais difícil.',
  cues:['Escápulas no banco.','Antebraço na vertical.','Cotovelos a meio caminho do tronco.'],
  check:['Roscas apertadas','Pés firmes','Escápulas encaixadas','Pegada levemente neutra','Carga para RIR 1–2'],
  vary:'O ângulo do cotovelo (entre ~30° e ~70° do tronco) e a profundidade dependem do seu braço e do ombro. Num estudo de modelagem com supino de barra (Noteboom et al., 2024), pegada menos aberta e escápulas retraídas reduziram a carga no ombro; é evidência limitada, mas o princípio vale aqui.',
  errors:[
    {id:'cot',title:'Cotovelos abertos a ~90°',view:'top',desc:'O braço fica perpendicular ao tronco: aumenta a carga na frente do ombro sem ganho para o peito.',keys:{mid:{armR:{ua:[90,25],fa:[-90,86]}},bottom:{armR:{ua:[92,-15],fa:[-90,90]}}}},
    {id:'escap',title:'Ombros saem do banco no topo',view:'lateral',desc:'Empurrar até o ombro descolar do banco tira a estabilidade e põe carga na articulação.',keys:{mid:{pro:6},top:{pro:13,elev:3}}},
    {id:'curta',title:'Descer pouco',view:'lateral',desc:'Parar longe do peito corta a parte alongada, que é a mais útil para o peitoral.',keys:{bottom:{armR:{ua:[63,18],fa:[-90,86]}}}}
  ]
};
export default ex;
