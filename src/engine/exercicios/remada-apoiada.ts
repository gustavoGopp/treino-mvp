// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { ARROW3, BOX, TX, dumbbell } from '../desenho';
import { scapPts } from '../esqueleto';
import { RB } from '../exercicios/compartilhado';
import { X, Y, Z, add, comb, mul } from '../math';

const ex = {
  id:'remada-apoiada',sets:3,rest:{opts:[120],def:120},name:'Remada com halteres, peito apoiado no banco inclinado',short:'Remada apoiada',
  rx:'3 × 8–12 · RIR 1–2 · descanso 2 min',target:'Meio das costas e dorsal',
  views:['lateral','posterior'],
  base:{P:[0,71.7,3.6],lumbar:50,thor:50,neck:42,legR:{ikS:[24,7,-38],poleRel:[.3,.2,1],ft:[10,-20]}},
  keys:{
    stretch:{pro:5,elev:1,armR:{ikS:[19,36.6,43.5],poleRel:[.3,0,-1]}},
    mid:{pro:0,elev:0,armR:{ikS:[21,59.6,25.5],poleRel:[.25,1,-.5]}},
    end:{pro:-6,elev:-1,armR:{ikS:[22,78.6,7.5],poleRel:[.2,1,-.6]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Alongado',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:1,kind:'hold',label:'Segura contraído',tempo:'1 s',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],extLabels:['início','fim'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],posterior:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){
    BOX(comb(1,RB.h,40,RB.u,-2.5,RB.n),[[X,14],[RB.u,40],[RB.n,2.5]],'eqp',{bias:-4});
    BOX([0,43,-21],[[X,13],[Y,2.5],[Z,11]],'eqp',{bias:-4});
    BOX([0,2.5,5],[[X,4],[Y,2],[Z,42]],'eqd',{bias:-6});BOX([0,40,32],[[X,2.5],[Y,38],[Z,2.5]],'eqd',{bias:-6});BOX([0,21,-22],[[X,2.5],[Y,19],[Z,2.5]],'eqd',{bias:-6});
    for(const k of['R','L'])dumbbell(sk.side[k].G,Z,'db'+(this._pal==='e'?'-e':''));
  },
  guides:{
    lateral(sk){TX([0,142,-22],'peito colado no banco',{cls:'lbl-g',anchor:'middle'});TX([0,76,-44],'cotovelo vai ao quadril',{cls:'lbl-g',anchor:'middle'});},
    posterior(sk){for(const k of['R','L']){const sd=sk.side[k],sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,mul(sk.xT,sd.s*6)),add(c,mul(sk.xT,-sd.s*3)),'gd',1.1,'gda',{layer:3});}TX([42,122,0],'escápulas se',{cls:'lbl-g',anchor:'end'});TX([42,122,0],'juntam no fim',{cls:'lbl-g',anchor:'end',dy:15});}
  },
  muscles:{p:[['midTrap','RL'],['lats','RL']],s:[['deltPost','RL'],['biceps','RL']]},
  feel:'Meio das costas, entre as escápulas, e laterais das costas.',
  feelNote:'O apoio no peito tira a lombar do exercício. Se sentir a lombar, o peito está saindo do banco.',
  setupEq:['Encosto do banco a 30–45°.','Dois halteres no chão, ao lado da ponta do banco.'],
  setupBody:['Deite de bruços com o peito no encosto e o queixo um pouco além da ponta.','Pés firmes no chão atrás, joelhos levemente dobrados.','Pegada neutra (palmas uma para a outra), braços estendidos para baixo.'],
  exec:[['hold','Alongado','Braços estendidos, ombros soltos para baixo e para a frente.'],['conc','Puxada (concêntrica)','~1 s. Puxe os cotovelos para trás, em direção ao quadril, juntando as escápulas.'],['hold','Fim','Halteres ao lado do quadril, cotovelos atrás do tronco. Segure 1 s.'],['ecc','Volta (excêntrica)','~2 s, até os braços estenderem.']],
  range:['Início: braços estendidos, escápulas afastadas.','Fim: cotovelos passando a linha do tronco, escápulas juntas.','O peito não sai do banco em nenhum momento. Se precisar sair, a carga está alta.','Se o halter encostar no chão antes de o braço estender, suba o encosto para 45°.'],
  breath:'Solte o ar puxando, inspire na volta. Com o peito apoiado respirar fica um pouco mais difícil, então mantenha o ritmo.',
  cues:['Peito colado no banco.','Cotovelos para o quadril.','Junta as escápulas.'],
  check:['Banco a 30–45°','Peito apoiado','Pés firmes','Pegada neutra','Carga para RIR 1–2'],
  vary:'Cotovelos mais abertos (~45° do tronco) trabalham mais o meio das costas e a parte de trás do ombro; cotovelos mais fechados, mais o dorsal. Os dois servem.',
  errors:[
    {id:'peito',title:'Peito sai do banco',view:'lateral',desc:'Levantar o tronco transforma o exercício numa remada com impulso da lombar.',keys:{mid:{lumbar:38,thor:34},end:{lumbar:26,thor:20,neck:20}}},
    {id:'encolher',title:'Encolher os ombros',view:'posterior',desc:'Os ombros sobem no fim e o trapézio de cima assume o trabalho do meio das costas.',keys:{mid:{elev:4},end:{elev:7}}},
    {id:'curta',title:'Não estender os braços',view:'lateral',desc:'Sem deixar os braços estenderem embaixo, você perde o alongamento das costas.',keys:{stretch:{pro:0,armR:{ikS:[20,54.6,33.5],poleRel:[.25,1,-.5]}}}}
  ]
};
export default ex;
