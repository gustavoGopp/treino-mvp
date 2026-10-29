// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { ARROW3, BOX, L3, PL3, TX, cable, liftOf, tower } from '../desenho';
import { scapPts } from '../esqueleto';
import { X, Y, Z, add, comb, mid, mul, norm, sub } from '../math';

const ex = {
  id:'remada-baixa',sets:3,rest:{opts:[120],def:120},name:'Remada baixa com triângulo',short:'Remada baixa',
  rx:'3 × 8–12 · RIR 1–2 · descanso 2 min',target:'Meio das costas (romboides e trapézio médio) e dorsal',
  views:['lateral','posterior'],
  base:{P:[0,53,0],legR:{ikS:[12,7,44],poleRel:[.2,.6,1],ft:[8,-15]}},
  keys:{
    stretch:{lumbar:12,thor:14,neck:10,pro:6,elev:0,armR:{ikS:[4,68,69],poleRel:[.7,-1,0]}},
    mid:{lumbar:2,thor:3,neck:0,pro:0,elev:-1,armR:{ikS:[4,68,40],poleRel:[.5,-1,-.4]}},
    end:{lumbar:-3,thor:-4,neck:-2,pro:-6,elev:-1,armR:{ikS:[4,67,15],poleRel:[.35,-.45,-1]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Alongado',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:1,kind:'hold',label:'Segura contraído',tempo:'1 s',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],extLabels:['início','fim'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']],posterior:[['E','R','cotovelo'],['E','L','']]},
  tower:{x:0,z:118,ac:X,out:[0,0,-1],py:66},
  equip(sk){
    BOX([0,42,-15],[[X,13],[Y,3],[Z,45]],'eqp',{bias:-4});
    for(const z of[-50,20])BOX([0,20,z],[[X,2.5],[Y,19],[Z,2.5]],'eqd',{bias:-5});
    const hr=sk.side.R.G,hl=sk.side.L.G,m=mid(hr,hl);
    const t=this.tower;const pulPos=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);
    const apex=add(m,mul(norm(sub(pulPos,m)),9));
    PL3([hr,apex,hl,hr],'eql',2.2,{bias:.3});
    const L=cable(this,'a',apex,pulPos);tower(t,liftOf(this,'a',L));
  },
  guides:{
    lateral(sk){const t=this.tower;L3([0,t.py,t.z-2],[0,t.py,-5],'gd',.9,{layer:2,dash:'2 3'});TX([0,t.py,t.z-8],'cabo quase horizontal',{cls:'lbl-g',anchor:'end',dy:-8});
      L3(sk.P,add(sk.P,[0,92,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(sk.P,[0,96,0]),'tronco perto da vertical',{cls:'lbl-g',anchor:'middle'});},
    posterior(sk){for(const k of['R','L']){const sd=sk.side[k],sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,mul(sk.xT,sd.s*6)),add(c,mul(sk.xT,-sd.s*3)),'gd',1.1,'gda',{layer:3});}TX(comb(1,sk.N,34,sk.uT),'escápulas se juntam no fim',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['midTrap','RL'],['lats','RL']],s:[['deltPost','RL'],['biceps','RL']]},
  feel:'Meio das costas, entre as escápulas, e laterais das costas. A parte de trás do ombro e o bíceps trabalham como secundários.',
  feelNote:'Se sentir mais a lombar do que as costas, o tronco provavelmente está balançando.',
  setupEq:['Ajuste sugerido: carro da polia na altura do umbigo com você sentado (o programa diz "ponto mais baixo"). Assim o cabo fica quase horizontal.','Triângulo no mosquetão. Banco plano de frente para a torre.','Distância: com os braços estendidos, a pilha ainda precisa ficar levantada.'],
  setupBody:['Sente na ponta do banco, pés firmes no chão, joelhos dobrados.','Pegada neutra no triângulo (palmas uma para a outra).','Coluna neutra, peito alto.'],
  exec:[['hold','Alongado','Braços estendidos, tronco até ~10–15° inclinado à frente, escápulas abertas.'],['conc','Puxada (concêntrica)','~1 s. O tronco volta à vertical enquanto as escápulas se juntam e os cotovelos vão para trás, rentes ao corpo.'],['hold','Fim','Triângulo no abdômen, cotovelos atrás do tronco. Segure 1 s.'],['ecc','Volta (excêntrica)','~2 s. Estenda os braços e deixe as escápulas abrirem, sem arredondar a lombar.']],
  range:['Início: braços estendidos, costas alongadas e coluna ainda neutra.','Fim: triângulo encostando no abdômen, cotovelos passando a linha do tronco.','Não vá além do ponto em que a lombar começa a arredondar.'],
  breath:'Solte o ar puxando. Inspire na volta.',
  cues:['Peito alto.','Cotovelos rentes, para trás.','Junta as escápulas no fim.'],
  check:['Polia na altura do umbigo','Pilha levantada com o braço estendido','Pés firmes','Tronco quase vertical','Carga para RIR 1–2'],
  vary:'Inclinar o tronco entre 0° e ~15° no alongamento é questão de preferência. O essencial é o tronco não virar o motor do movimento.',
  note:'<b>Ajuste sugerido:</b> o programa diz polia no ponto mais baixo. Sentado no banco, isso faz o cabo puxar para baixo. Com o carro na altura do umbigo, a resistência fica na direção da puxada. O documento do programa ainda não foi alterado.',
  errors:[
    {id:'balanco',title:'Balançar o tronco',view:'lateral',desc:'O tronco vira alavanca: a lombar faz o trabalho e as costas descansam.',keys:{stretch:{lumbar:34,thor:37,neck:30,armR:{ikS:[4,62,80],poleRel:[.7,-1,0]}},mid:{lumbar:8,thor:8,neck:6},end:{lumbar:-18,thor:-20,neck:-14,armR:{ikS:[4,69,10],poleRel:[.35,-.45,-1]}}}},
    {id:'arred',title:'Arredondar a coluna no alongamento',view:'lateral',desc:'Buscar mais alongamento arredondando a lombar coloca a carga na coluna.',keys:{stretch:{lumbar:16,thor:44,neck:48,pro:9,armR:{ikS:[4,64,74],poleRel:[.7,-1,0]}},mid:{lumbar:8,thor:22,neck:22}}},
    {id:'encolher',title:'Encolher os ombros no fim',view:'posterior',desc:'Os ombros sobem: o trapézio de cima assume e o meio das costas trabalha menos.',keys:{mid:{elev:4},end:{elev:7,neck:12}}}
  ]
};
export default ex;
