// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { C3, L3, TX } from '../desenho';
import { BALL } from '../exercicios/compartilhado';
import { norm, sub } from '../math';

const ex = {
  id:'flexao-bola',sets:3,rest:{opts:[90],def:90},name:'Flexão de joelho na bola suíça',short:'Flexão na bola',
  rx:'3 × 8–15 · RIR 1 · descanso 1,5 min',target:'Posteriores da coxa',
  views:['lateral'],noCable:true,
  base:{neck:-88,armR:{ua:[25,-10],fa:[25,-4]}},
  keys:{
    ext:{P:[0,28.8,-32.6],lumbar:-111.6,thor:-111.6,legR:{ikS:[9,60.3,46.9],poleRel:[0,1,0],ft:[180,68],heelV:[0,-4.1,5.9]}},
    mid:{P:[0,42.8,-40.9],lumbar:-130,thor:-130,legR:{ikS:[9,62,27],poleRel:[0,1,0],ft:[0,95],heelV:[0,-6,2]}},
    curl:{P:[0,51.8,-50.7],lumbar:-145,thor:-145,legR:{ikS:[9,59.4,6.9],poleRel:[0,1,0],ft:[0,-5],heelV:[0,-3.5,-6]}}
  },
  seq:[
    {path:['ext'],dur:.5,kind:'hold',label:'Pernas estendidas',tempo:'quadril alto',breath:'INSPIRA'},
    {path:['ext','mid','curl'],dur:1.2,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['curl'],dur:.6,kind:'hold',label:'Joelhos a ~90°',tempo:'segura',breath:'FIRME'},
    {path:['curl','mid','ext'],dur:2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['ext','curl'],extLabels:['início','fim'],
  paths:{lateral:[['heel','R','calcanhar'],['P','','quadril']]},
  equip(sk){
    const sd=sk.side.R,fd=norm(sub(sd.toe,sd.A));const u=Math.max(0,Math.min(1,(.9-fd[1])/.95));
    C3([0,BALL,sd.heel[2]+8.6*u],BALL,'ball',{bias:0});
  },
  guides:{
    lateral(sk){L3(sk.N,sk.side.R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,80,-70],'quadril alto o tempo todo',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['hams','R']],s:[['glutes','R'],['calf','R']]},
  feel:'Parte de trás da coxa. O glúteo trabalha para segurar o quadril alto.',
  feelNote:'Câimbra na parte de trás da coxa pode acontecer no começo: pare, alongue e retome com menos repetições.',
  setupEq:['Bola suíça cheia e firme, num piso que não escorregue.','Colchonete embaixo das costas, se quiser.'],
  setupBody:['Deite de costas com os braços no chão, abertos ~30° do corpo, palmas para baixo.','Calcanhares em cima da bola, pernas estendidas.','Suba o quadril até ombros, quadril e calcanhares ficarem em linha.'],
  exec:[['hold','Pernas estendidas','Quadril alto, corpo em linha.'],['conc','Puxada (concêntrica)','~1 s. Puxe a bola com os calcanhares em direção ao glúteo, subindo ainda mais o quadril.'],['hold','Fim','Joelhos a ~90°, pés apoiados em cima da bola. Segure um instante.'],['ecc','Volta (excêntrica)','~2 s, estendendo as pernas sem deixar o quadril descer.']],
  range:['Fim: joelhos a ~90°, com ombros, quadril e joelhos em linha.','Início: pernas estendidas, com o quadril ainda alto.','O quadril não encosta no chão entre as repetições.'],
  breath:'Solte o ar puxando, inspire na volta.',
  cues:['Quadril alto.','Calcanhar no glúteo.','Volta devagar.'],
  check:['Bola firme','Braços no chão','Calcanhares na bola','Quadril alto antes de começar','Parar com RIR 1'],
  vary:'Braços mais abertos dão mais estabilidade; mais junto ao corpo, mais difícil. Quando 15 repetições ficarem fáceis, passe para uma perna só.',
  errors:[
    {id:'quadril',title:'Quadril cai ao puxar',view:'lateral',desc:'O quadril dobra e desce quando os joelhos dobram. A parte de trás da coxa trabalha menos e o movimento fica mais curto.',keys:{mid:{P:[0,35.5,-36.3],lumbar:-120,thor:-120},curl:{P:[0,39.3,-38.2],lumbar:-125,thor:-125}}},
    {id:'volta',title:'Quadril encosta no chão na volta',view:'lateral',desc:'Descer o quadril entre as repetições tira a tensão. O quadril fica alto do início ao fim da série.',keys:{ext:{P:[0,13,-29.5],lumbar:-93,thor:-93,legR:{ikS:[9,58,42],poleRel:[0,1,0],ft:[180,62],heelV:[0,-4.5,5.5]}}}},
    {id:'curta',title:'Puxar pouco',view:'lateral',desc:'Parar com os joelhos longe de 90° corta metade do movimento.',keys:{curl:{P:[0,42.8,-40.9],lumbar:-130,thor:-130,legR:{ikS:[9,62,27],poleRel:[0,1,0],ft:[0,95],heelV:[0,-6,2]}}}}
  ]
};
export default ex;
