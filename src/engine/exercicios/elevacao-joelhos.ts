// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { L3, TX, pullBar } from '../desenho';

const ex = {
  id:'elevacao-joelhos',sets:2,rest:{opts:[60],def:60},name:'Elevação de joelhos na barra fixa',short:'Elevação de joelhos',
  rx:'2 × 10–15 · RIR 1 · descanso 1 min',target:'Abdômen (reto abdominal)',
  views:['lateral'],
  base:{neck:0,elev:2,armR:{ikS:[30,230,0],poleRel:[1,-.25,.2]}},
  keys:{
    hang:{P:[0,118,1],lumbar:0,thor:0,legR:{th:[0,-84],sh:[180,-84],ft:[0,-55]}},
    mid:{P:[0,119,5.5],lumbar:-10,thor:-2,legR:{th:[0,-40],sh:[0,-88],ft:[0,-45]}},
    top:{P:[0,120.2,11.3],lumbar:-25,thor:-4,legR:{th:[0,8],sh:[0,-85],ft:[0,-40]}}
  },
  seq:[
    {path:['hang'],dur:.4,kind:'hold',label:'Pendurado',tempo:'corpo parado',breath:'INSPIRA'},
    {path:['hang','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.5,kind:'hold',label:'Topo · pelve enrolada',tempo:'',breath:'EXPIRA'},
    {path:['top','mid','hang'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['hang','top'],extLabels:['embaixo','topo'],
  paths:{lateral:[['K','R','joelho'],['P','','']]},
  equip(sk){pullBar();},
  guides:{lateral(sk){L3([0,230,0],[0,20,0],'gd',.9,{layer:2,dash:'2 3'});TX(sk.P,'enrola a pelve',{cls:'lbl-g',anchor:'end',dx:-14,dy:4});}},
  muscles:{p:[['rectus','R']],s:[['obliq','RL'],['forearm','RL']]},
  feel:'Abdômen, principalmente a parte de baixo.',
  feelNote:'Sentir só a frente do quadril significa que a pelve não está enrolando.',
  setupEq:['Barra no topo da estação. Use o banco para alcançar.'],
  setupBody:['Pendure com a pegada na largura dos ombros ou um pouco mais aberta.','Ombros ativos: afaste-os um pouco das orelhas.','Corpo parado, pernas juntas.'],
  exec:[['hold','Pendurado','Corpo parado.'],['conc','Subida (concêntrica)','~1 s. Suba os joelhos e, no fim, enrole a pelve para cima, como se levasse os joelhos ao peito.'],['hold','Topo','Joelhos acima do quadril, pelve enrolada.'],['ecc','Descida (excêntrica)','~2 s, sem deixar o corpo balançar.']],
  range:['Em cima: joelhos pelo menos na altura do quadril, com a pelve enrolada.','Embaixo: pernas estendidas, sem embalo.','Se a pegada cansar antes do abdômen, troque pelo abdominal na polia.'],
  breath:'Solte o ar subindo, inspire descendo.',
  cues:['Enrola a pelve.','Corpo parado.','Desce devagar.'],
  check:['Banco para alcançar','Ombros ativos','Pernas juntas','Sem balanço','Parar com RIR 1'],
  vary:'Esticar mais as pernas deixa o exercício mais difícil; é a progressão quando 15 repetições ficarem fáceis.',
  errors:[
    {id:'balanco',title:'Balançar o corpo',view:'lateral',desc:'O balanço sobe as pernas por impulso e o abdômen quase não trabalha.',keys:{hang:{P:[0,123,7],lumbar:-10,thor:-14,legR:{th:[180,-80],sh:[180,-75],ft:[0,-60]}},mid:{P:[0,121,8]},top:{P:[0,122,14],thor:6}}},
    {id:'pelve',title:'Só levantar as pernas',view:'lateral',desc:'Subir os joelhos sem enrolar a pelve trabalha a frente do quadril e quase não usa o abdômen.',keys:{mid:{P:[0,118,1],lumbar:0,thor:0},top:{P:[0,118,1],lumbar:0,thor:0}}}
  ]
};
export default ex;
