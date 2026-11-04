// @ts-nocheck
// Animação nova (em revisão). Remada sentada com elástico: sentado no chão, pernas estendidas com os joelhos um pouco
// dobrados, o elástico passa pela sola dos pés e cada mão segura uma ponta. Parte da remada baixa aprovada (mesmo
// tronco e mesmo caminho dos braços), com a peça nova do elástico (band, em src/engine/desenho.ts) no lugar do cabo.
// Técnica e fontes: docs/pesquisa/animacoes/remada-elastico.md.
import { ARROW3, BOX, L3, TX, band, bandHandle } from '../../desenho';
import { scapPts } from '../../esqueleto';
import { X, Y, Z, add, comb, mul } from '../../math';

const pe = (sk, k) => add(sk.side[k].A, [0, 2, 9]); // sola, na frente do tornozelo: onde o elástico passa
const ex = {
  id:'remada-elastico',
  views:['lateral','posterior'],
  base:{P:[0,10,0],legR:{ikS:[11,7,84],poleRel:[0,1,.2],ft:[0,70]}},
  keys:{
    stretch:{lumbar:12,thor:14,neck:10,pro:6,elev:0,armR:{ikS:[6,29,64],poleRel:[.7,-1,0]}},
    mid:{lumbar:2,thor:3,neck:0,pro:0,elev:-1,armR:{ikS:[6,32,36],poleRel:[.5,-1,-.4]}},
    end:{lumbar:-3,thor:-4,neck:-2,pro:-6,elev:-1,armR:{ikS:[6,34,9],poleRel:[.35,-.45,-1]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Alongado',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:1,kind:'hold',label:'Segura contraído',tempo:'1 s',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']],posterior:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){
    // colchonete
    BOX([0,.6,25],[[X,30],[Y,.6],[Z,70]],'eqp',{bias:-6});
    for(const k of['R','L']){band(this,k,pe(sk,k),sk.side[k].G);bandHandle(sk.side[k].G,X);}
  },
  guides:{
    lateral(sk){L3(sk.P,add(sk.P,[0,80,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(sk.P,[0,84,0]),'tronco perto da vertical',{cls:'lbl-g',anchor:'middle'});
      TX(pe(sk,'R'),'elástico na sola dos pés',{cls:'lbl-g',anchor:'end',dy:16});},
    posterior(sk){for(const k of['R','L']){const sd=sk.side[k],sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,mul(sk.xT,sd.s*6)),add(c,mul(sk.xT,-sd.s*3)),'gd',1.1,'gda',{layer:3});}TX(comb(1,sk.N,34,sk.uT),'escápulas se juntam no fim',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['midTrap','RL'],['lats','RL']],s:[['deltPost','RL'],['biceps','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{stretch:{lumbar:34,thor:37,neck:30,armR:{ikS:[6,28,66],poleRel:[.7,-1,0]}},mid:{lumbar:8,thor:8,neck:6},end:{lumbar:-18,thor:-20,neck:-14,armR:{ikS:[6,39,4],poleRel:[.35,-.45,-1]}}}},
    {id:'arred',view:'lateral',keys:{stretch:{lumbar:16,thor:44,neck:48,pro:9,armR:{ikS:[6,30,62],poleRel:[.7,-1,0]}},mid:{lumbar:8,thor:22,neck:22}}},
    {id:'encolher',view:'posterior',keys:{mid:{elev:4},end:{elev:7,neck:12}}}
  ]
};
export default ex;
