// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX } from '../desenho';
import { add, mul, sub } from '../math';

const ex = {
  id:'flexao',sets:2,rest:{opts:[90],def:90},name:'Flexão de braço',short:'Flexão',
  rx:'2 × 8–20 · RIR 1 · descanso 1,5 min',target:'Peitoral e tríceps',
  views:['lateral','top'],
  base:{legR:{ikS:[9,9.5,-119.5],poleRel:[0,1,0],ft:[0,-34]},armR:{ikS:[30,3,-3],poleRel:[.7,.5,-1]},wrist:80,wristDir:[0,0,1]},
  keys:{
    top:{P:[0,43.8,-41.1],lumbar:66.5,thor:66.5,neck:70,pro:0},
    mid:{P:[0,28.8,-36.2],lumbar:77,thor:77,neck:80,pro:-2},
    bottom:{P:[0,14.3,-34.1],lumbar:86.8,thor:86.8,neck:88,pro:-4}
  },
  seq:[
    {path:['top'],dur:.4,kind:'hold',label:'Em cima',tempo:'prancha',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.35,kind:'hold',label:'Embaixo',tempo:'peito perto do chão',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],extLabels:['em cima','embaixo'],
  paths:{lateral:[['N','','peito'],['E','R','cotovelo']],top:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){},
  guides:{
    lateral(sk){L3(sk.side.R.A,add(sk.Hc,mul(sub(sk.Hc,sk.side.R.A),.06)),'gd',.9,{layer:3,dash:'3 2.5'});TX(sk.P,'corpo em linha reta',{cls:'lbl-g',anchor:'middle',dy:-18});},
    top(sk){TX([-44,0,-4],'cotovelos ~45° do tronco',{cls:'lbl-g',size:10,anchor:'end'});TX([44,0,-4],'mãos na linha do peito',{cls:'lbl-g',size:10});}
  },
  muscles:{p:[['pecStern','RL']],s:[['triceps','RL'],['deltAnt','RL'],['rectus','R']]},
  feel:'Peito e tríceps. O abdômen trabalha para segurar a prancha.',
  feelNote:'Dor no punho? Apoie nos punhos fechados ou segure dois halteres no chão para deixar o punho reto.',
  setupEq:['Chão. Quando passar de 20 repetições, pés no step.'],
  setupBody:['Mãos um pouco mais abertas que os ombros, na linha do meio do peito.','Corpo em linha reta da cabeça aos calcanhares, abdômen e glúteo contraídos.','Pés juntos ou na largura do quadril.'],
  exec:[['hold','Em cima','Braços estendidos, corpo em prancha.'],['ecc','Descida (excêntrica)','~2 s. O corpo desce inteiro junto, com os cotovelos indo para trás a meio caminho do tronco.'],['hold','Embaixo','Peito perto do chão.'],['conc','Subida (concêntrica)','~1 s. Empurre o chão mantendo a prancha.']],
  range:['Embaixo: peito a poucos centímetros do chão.','Em cima: braços estendidos.','Se o quadril cair ou subir para completar a repetição, a série acabou.'],
  breath:'Inspire descendo, solte o ar subindo.',
  cues:['Corpo em linha.','Cotovelos para trás, não para os lados.','Peito perto do chão.'],
  check:['Mãos na linha do peito','Abdômen e glúteo firmes','Corpo em linha','Descer até perto do chão','Parar com RIR 1'],
  vary:'A largura das mãos e o ângulo dos cotovelos variam com o tamanho dos ombros. Mãos mais fechadas trabalham mais o tríceps; mais abertas, mais o peito.',
  errors:[
    {id:'quadril',title:'Quadril cai',view:'lateral',desc:'A lombar arqueia e o abdômen deixa de segurar. Contraia abdômen e glúteo.',keys:{top:{P:[0,33,-42],lumbar:54,thor:72},mid:{P:[0,19,-37],lumbar:65,thor:83},bottom:{P:[0,6,-35],lumbar:76,thor:92}}},
    {id:'cot',title:'Cotovelos abertos a 90°',view:'top',desc:'Abrir os cotovelos para os lados aumenta a carga na frente do ombro.',base:{armR:{ikS:[33,3,0],poleRel:[1,.4,-.05]}}},
    {id:'curta',title:'Descer pouco',view:'lateral',desc:'Meia repetição corta a parte alongada do peitoral.',keys:{bottom:{P:[0,28.8,-36.2],lumbar:77,thor:77,neck:80,pro:-2}}}
  ]
};
export default ex;
