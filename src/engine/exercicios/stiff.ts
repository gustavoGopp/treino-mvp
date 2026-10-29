// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { ARROW3, L3, TX, dumbbell } from '../desenho';
import { Z, add, comb, mul, sub } from '../math';

const ex = {
  id:'stiff',sets:3,rest:{opts:[120],def:120},name:'Stiff com halteres',short:'Stiff',
  rx:'3 × 8–12 · RIR 2 · descanso 2 min',target:'Posteriores da coxa e glúteos',
  views:['lateral'],
  base:{legR:{ikS:[11,7,0],poleRel:[0,.2,1],ft:[6,-18]}},
  keys:{
    top:{P:[0,92,0],lumbar:0,thor:0,neck:2,armR:{sph:[-32,-82,62.5],poleRel:[1,0,-.3]}},
    mid:{P:[0,90.5,-15],lumbar:35,thor:35,neck:40,armR:{sph:[-90,-81,62.5],poleRel:[1,0,-.3]}},
    bottom:{P:[0,86.5,-30],lumbar:68,thor:70,neck:74,armR:{sph:[-160,-80,62.5],poleRel:[1,0,-.3]}}
  },
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em pé',tempo:'respire e firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · alongado',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],extLabels:['em pé','embaixo'],
  paths:{lateral:[['G','R','halter'],['P','','quadril']]},
  equip(sk){const hd=[1,0,0];for(const k of['R','L'])dumbbell(sk.side[k].G,hd,'db'+(this._pal==='e'?'-e':''));},
  guides:{
    lateral(sk){const a=comb(1,sk.P,-10,sk.fL),b=comb(1,sk.N,-9,sk.fT);L3(add(a,mul(sub(a,b),.1)),add(b,mul(sub(b,a),.3)),'gd',1,{layer:3,dash:'3 2.5'});TX(add(b,mul(sub(b,a),.32)),'coluna neutra',{cls:'lbl-g',anchor:'end',dx:-4,dy:-4});
      ARROW3(comb(1,sk.P,-12,Z),comb(1,sk.P,-28,Z),'gd',1.1,'gda',{layer:3});TX(comb(1,sk.P,-30,Z),'quadril para trás',{cls:'lbl-g',anchor:'end',dy:4});}
  },
  muscles:{p:[['hams','RL']],s:[['glutes','RL'],['erect','R']]},
  feel:'Posterior da coxa, principalmente perto do glúteo, e os glúteos.',
  feelNote:'A lombar trabalha um pouco porque segura a postura, e isso é normal. Dor ou queimação forte na lombar não é: confira se a coluna está arredondando.',
  setupEq:['Dois halteres. Comece com os fixos e passe para os montáveis quando ficarem leves.','Roscas bem apertadas.'],
  setupBody:['Pés na largura do quadril, apontando para a frente.','Halteres na frente das coxas, palmas para você.','Joelhos levemente dobrados. Esse ângulo fica quase igual a série toda.','Escápulas encaixadas, peito aberto, abdômen firme.'],
  exec:[['hold','Em pé','Quadril estendido, halteres na frente das coxas.'],['ecc','Descida (excêntrica)','~2–3 s. Leve o quadril para trás, como se fosse fechar uma porta com o bumbum. Os halteres descem rentes às coxas e às canelas.'],['hold','Embaixo','Pare quando o posterior da coxa estiver bem alongado e a coluna ainda neutra.'],['conc','Subida (concêntrica)','~1–1,5 s. Empurre o quadril para a frente até ficar em pé, sem jogar o tronco para trás no fim.']],
  range:['Embaixo: até sentir o posterior bem alongado. Para muita gente os halteres chegam perto do meio da canela, mas isso depende da flexibilidade.','Em cima: quadril estendido, sem arquear a lombar para trás.','Pare de descer quando a lombar começar a arredondar, mesmo que os halteres não tenham chegado longe.'],
  breath:'Inspire e firme o abdômen em pé. Segure enquanto desce e solte o ar na subida, depois de passar os joelhos.',
  cues:['Quadril para trás.','Halteres rentes às pernas.','Coluna longa do quadril à cabeça.'],
  check:['Pés na largura do quadril','Joelhos levemente dobrados','Halteres colados nas coxas','Abdômen firme','Carga para RIR 2'],
  vary:'O quanto você desce depende da flexibilidade do posterior. A referência é a coluna neutra e o alongamento, não a altura em que o halter chega.',
  errors:[
    {id:'arred',title:'Coluna arredondada',view:'lateral',desc:'Para descer mais, a lombar arredonda e a carga vai para a coluna.',keys:{mid:{lumbar:30,thor:48,neck:55},bottom:{P:[0,88,-18],lumbar:58,thor:96,neck:110}}},
    {id:'agachar',title:'Agachar em vez de levar o quadril para trás',view:'lateral',desc:'Os joelhos dobram e o quadril desce: vira um agachamento e o posterior quase não alonga.',keys:{mid:{P:[0,77,-10],lumbar:24,thor:24,neck:28},bottom:{P:[0,62,-16],lumbar:42,thor:42,neck:46}}},
    {id:'longe',title:'Halteres longe das pernas',view:'lateral',desc:'Com os halteres à frente, a alavanca na lombar aumenta muito.',keys:{mid:{armR:{sph:[-30,-66,62.5],poleRel:[1,0,-.3]}},bottom:{armR:{sph:[0,-62,62.5],poleRel:[1,0,-.3]}}}}
  ]
};
export default ex;
