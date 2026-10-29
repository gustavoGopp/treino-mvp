// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { ARROW3, L3, TX, pullBar } from '../desenho';
import { scapPts } from '../esqueleto';
import { add, mul } from '../math';

const ex = {
  id:'barra-fixa',sets:3,rest:{opts:[120,150,180],def:150},name:'Barra fixa (pegada pronada)',short:'Barra fixa',
  rx:'3 × 6–12 · RIR 1–2 · descanso 2–3 min',target:'Dorsal (latíssimo do dorso)',
  views:['posterior','lateral'],
  base:{lumbar:0,thor:0,neck:0,armR:{ikS:[34,230,0],poleRel:[1,-.25,.2]},legR:{th:[0,-80],sh:[180,-76],ft:[0,-55]}},
  keys:{
    hang:{P:[0,115.2,1],elev:6,pro:1,scapRot:32},
    set:{P:[0,122.5,1],elev:-1,pro:-1,scapRot:24},
    mid:{P:[0,150,1.5],lumbar:-4,thor:-7,neck:-3,elev:-2,pro:-3,scapRot:10,armR:{ikS:[34,230,0],poleRel:[.7,-1,.2]}},
    top:{P:[0,179,2],lumbar:-10,thor:-14,neck:-8,elev:-3,pro:-4,scapRot:0,armR:{ikS:[34,230,0],poleRel:[.35,-1,.3]},legR:{th:[0,-74],sh:[180,-72],ft:[0,-55]}}
  },
  seq:[
    {path:['hang'],dur:.5,kind:'hold',label:'Pendurado · braço estendido',tempo:'',breath:'INSPIRA'},
    {path:['hang','set'],dur:.4,kind:'conc',label:'Escápulas descem',tempo:'começo da subida',breath:'EXPIRA'},
    {path:['set','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['top'],dur:.5,kind:'hold',label:'Topo',tempo:'pausa curta',breath:'FIRME'},
    {path:['top','mid','set','hang'],dur:2.6,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['hang','top'],extLabels:['embaixo','topo'],
  paths:{posterior:[['E','R','cotovelo'],['E','L',''],['S','R','ombro']],lateral:[['S','R','ombro'],['E','R','cotovelo']]},
  equip(sk){pullBar();},
  guides:{
    posterior(sk){for(const k of['R','L']){const sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,[0,7,-3]),add(c,[0,-5,-3]),'gd',1.1,'gda',{layer:3});}TX([0,8,0],'escápulas descem antes de dobrar o braço',{cls:'lbl-g',anchor:'middle'});},
    lateral(sk){L3([0,230,0],[0,20,0],'gd',.9,{layer:2,dash:'2 3'});TX([0,24,0],'corpo sob a barra, sem balanço',{cls:'lbl-g',anchor:'middle',dy:12});}
  },
  muscles:{p:[['lats','RL']],s:[['midTrap','RL'],['biceps','RL'],['deltPost','RL'],['forearm','RL']]},
  feel:'Laterais das costas, abaixo das axilas, e entre as escápulas. Bíceps e antebraço trabalham como secundários.',
  feelNote:'É comum o antebraço ou o bíceps cansar antes das costas. Isso não quer dizer que a execução está errada.',
  setupEq:['Barra no topo da estação. Use o banco para alcançar sem pular.','Mãos na barra reta um pouco mais abertas que os ombros (cerca de 1,5× a largura dos ombros), palmas para a frente.','Se essa pegada incomodar o ombro, feche um pouco ou teste as alças anguladas das pontas.'],
  setupBody:['Comece pendurado, com os braços estendidos.','Pernas juntas, joelhos levemente dobrados, pés um pouco à frente do corpo.','Abdômen firme e glúteo contraído para o corpo não balançar.'],
  exec:[['hold','Pendurado','Braços estendidos, corpo parado.'],['conc','Começo da subida','Primeiro abaixe as escápulas: os ombros se afastam das orelhas e o corpo sobe alguns centímetros.'],['conc','Subida (concêntrica)','~1–1,5 s. Puxe os cotovelos para baixo e para os lados das costelas, levando o peito em direção à barra.'],['hold','Topo','Queixo acima da barra, peito perto dela, tronco levemente inclinado para trás.'],['ecc','Descida (excêntrica)','~2–3 s. Desça controlando até os braços estenderem de novo.']],
  range:['Embaixo: cotovelos estendidos. Os ombros sobem naturalmente, mas sem despencar.','Em cima: peito perto da barra e queixo acima dela.','Não vale ganhar altura balançando, chutando ou esticando o pescoço para passar o queixo.'],
  breath:'Inspire embaixo ou durante a descida. Solte o ar durante a subida. Mantenha o abdômen firme a repetição toda.',
  cues:['Ombros longe das orelhas.','Cotovelos para o bolso de trás.','Peito na barra.'],
  check:['Pegada ~1,5× os ombros','Corpo parado, abdômen firme','Braço estendido no início','Menos de 5 reps? Use a alternativa'],
  vary:'A largura ideal da pegada muda de pessoa para pessoa. A ativação do dorsal é parecida entre pegadas largas, médias e neutras, então escolha a que deixa o ombro mais confortável.',
  errors:[
    {id:'balanco',title:'Balanço (kipping)',view:'lateral',desc:'Chutar e balançar dá impulso e tira trabalho das costas.',keys:{hang:{lumbar:-8,thor:-6,legR:{th:[180,-78],sh:[180,-68],ft:[0,-60]}},set:{lumbar:6,legR:{th:[0,-55],sh:[0,-86],ft:[0,-40]}},mid:{lumbar:14,thor:2,legR:{th:[0,-12],sh:[0,-70],ft:[0,-20]}},top:{legR:{th:[0,-35],sh:[0,-82],ft:[0,-30]}}}},
    {id:'meia',title:'Meia repetição embaixo',view:'posterior',desc:'Parar com o cotovelo dobrado corta a parte em que o dorsal está mais alongado.',keys:{hang:{P:[0,148,1.5],lumbar:-4,thor:-7,elev:-1,pro:-2,scapRot:10,armR:{ikS:[34,230,0],poleRel:[.7,-1,.2]}},set:{P:[0,148,1.5],lumbar:-4,thor:-7,elev:-1,pro:-2,scapRot:10,armR:{ikS:[34,230,0],poleRel:[.7,-1,.2]}}}},
    {id:'encolher',title:'Ombros encolhidos no topo',view:'posterior',desc:'Os ombros sobem até as orelhas e o pescoço estica para passar o queixo. Termine com o peito, não com o queixo.',keys:{mid:{elev:4,pro:1,neck:-15},top:{P:[0,166,2],elev:7,pro:2,scapRot:20,neck:-30}}}
  ]
};
export default ex;
