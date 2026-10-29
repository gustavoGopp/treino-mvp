// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, PL3, TX, dumbbell } from '../desenho';
import { benchInc } from '../exercicios/compartilhado';
import { X, Y, Z, add, comb, cs, mul, norm, sn, sub } from '../math';

const ex = {
  id:'supino-inclinado',sets:3,rest:{opts:[120,150,180],def:150},name:'Supino inclinado com halteres',short:'Supino inclinado',
  rx:'3 × 6–10 · RIR 1–2 · descanso 2–3 min',target:'Peitoral maior, parte de cima (porção clavicular)',
  views:['lateral','top'],
  base:{P:[0,53,0],lumbar:-60,thor:-60,neck:-55,pro:-2,elev:-1,legR:{ikS:[15,7,40],poleRel:[.25,.5,1],ft:[10,-22]}},
  keys:{top:{armR:{ua:[90,84],fa:[-90,86]}},mid:{armR:{ua:[74,22],fa:[-90,84]}},bottom:{armR:{ua:[60,-30],fa:[-90,90]}}},
  seq:[
    {path:['top'],dur:.6,kind:'hold',label:'Topo',tempo:'respire',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · sem quicar',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['bottom','top'],extLabels:['embaixo','topo'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],top:[['G','R','halter'],['G','L',''],['E','R','cotovelo']]},
  equip(sk){
    const P0=[0,53,0],bu=benchInc.u,bf=benchInc.f;
    BOX([0,46,13],[[X,13],[Y,2.6],[Z,17]],'eqp',{bias:-4});
    BOX(comb(1,P0,37,bu,-10.5,bf),[[X,13],[bu,37],[bf,2.6]],'eqp',{bias:-4});
    BOX([0,2.5,-12],[[X,4],[Y,2],[Z,48]],'eqd',{bias:-6});
    BOX([0,23,18],[[X,2.5],[Y,21],[Z,2.5]],'eqd',{bias:-6});
    BOX([0,23,-44],[[X,2.5],[Y,21],[Z,2.5]],'eqd',{bias:-6});
    L3(comb(1,P0,-12,bf,8,bu),[0,20,-44],'eql',3,{bias:-6});
    const hd=norm([1,0,-.3]);
    for(const k of['R','L']){const sd=sk.side[k];dumbbell(sd.G,hd,'db'+(this._pal==='e'?'-e':''));}
  },
  guides:{
    lateral(sk){const sd=sk.side.R;L3(sd.E,add(sd.E,[0,44,0]),'gd',1,{layer:3,dash:'3 2.5'});TX(add(sd.E,[0,16,0]),'antebraço na vertical',{cls:'lbl-g',dx:9});
      const h=[0,47,-3];const pts=[];for(let a=0;a<=30;a+=3)pts.push([0,47+20*sn(a),-3-20*cs(a)]);PL3(pts,'gd',1,{layer:3});L3(h,[0,47,-27],'gd',.8,{layer:3,dash:'2 2'});TX([0,51,-27],'~30°',{cls:'lbl-g',anchor:'end',dx:-2});},
    top(sk){const R=sk.side.R,Lf=sk.side.L;L3(R.S,add(R.S,mul(sk.uT,-30)),'gd',1,{layer:3,dash:'3 2.5'});L3(R.S,add(R.S,mul(sub(R.E,R.S),1.25)),'gd',1,{layer:3,dash:'3 2.5'});
      TX([-34,0,-4],'cotovelo ~30–70° do tronco',{cls:'lbl-g',size:10,anchor:'end',dx:8});TX([34,0,-4],'halter sobre o cotovelo',{cls:'lbl-g',size:10,dx:-8});}
  },
  muscles:{p:[['pecClav','RL']],s:[['pecStern','RL'],['deltAnt','RL'],['triceps','RL']]},
  feel:'Parte de cima do peito, perto da clavícula. Também um pouco na frente do ombro e no tríceps.',
  feelNote:'Sentir mais o ombro nem sempre é erro: pode ser fadiga ou anatomia. Confira primeiro o encosto e a trajetória.',
  setupEq:['Encosto a cerca de 30° (um terço do caminho entre deitado e sentado). Entre 30° e 45° funciona; acima disso o ombro assume mais o trabalho.','Assento plano, quadril encostado no fundo do banco.','Aperte a rosca das manoplas antes de cada série.'],
  setupBody:['Pés firmes no chão, um pouco mais abertos que o quadril.','Glúteo, costas e cabeça apoiados no banco a série toda.','Escápulas levemente juntas e para baixo, peito alto. A lombar mantém a curva natural, sem arco exagerado.','Palmas para os pés ou giradas uns 20–30°. Punho reto, com o halter em cima do antebraço.','Para chegar à posição, sente com os halteres nas coxas e deite levando-os junto ao peito.'],
  exec:[['hold','Topo','Halteres sobre os ombros, cotovelos quase estendidos sem travar.'],['ecc','Descida (excêntrica)','~2–3 s. Desça com o antebraço na vertical até os halteres chegarem ao lado do peito.'],['hold','Embaixo','Pausa curta, sem quicar, com o peito alongado.'],['conc','Subida (concêntrica)','~1–1,5 s. Empurre para cima e levemente em direção aos ombros, sem bater um halter no outro.']],
  range:['Topo: halteres sobre os ombros, cotovelos quase estendidos.','Embaixo: halteres na altura do peito, cotovelos um pouco abaixo da linha do tronco.','Não desça mais se o ombro precisar sair do banco, rolar para a frente ou doer na parte da frente. A profundidade certa depende do seu braço e da mobilidade do ombro.'],
  breath:'Inspire no topo e durante a descida. Embaixo, mantenha o abdômen firme. Solte o ar na subida, depois do trecho mais difícil (o começo). Em séries pesadas dá para segurar o ar 1–2 s na transição de baixo, mas não a série inteira.',
  cues:['Peito alto, escápulas no banco.','Antebraço sempre na vertical.','Desce controlando, sobe para os ombros.'],
  check:['Encosto a ~30°','Roscas apertadas','Pés firmes, glúteo no banco','Escápulas encaixadas','Carga para RIR 1–2'],
  vary:'O ângulo do cotovelo em relação ao tronco (algo entre ~30° e ~70°), a largura e a profundidade dependem do comprimento dos braços e da mobilidade do ombro. O que não muda: antebraço embaixo da carga, ombro estável e nenhuma dor articular.',
  errors:[
    {id:'cot',title:'Cotovelos abertos a ~90°',view:'top',desc:'O braço fica perpendicular ao tronco e o halter desce na linha do pescoço. Aumenta a carga na frente do ombro sem ganho para o peito.',keys:{bottom:{armR:{ua:[100,-17],fa:[-90,90]}},mid:{armR:{ua:[96,22],fa:[-90,84]}}}},
    {id:'punho',title:'Punho dobrado para trás',view:'lateral',desc:'O halter fica atrás da linha do antebraço e a carga vai para o punho.',base:{wrist:48,wristDir:[0,0,-1]}},
    {id:'quadril',title:'Quadril sai do banco',view:'lateral',desc:'O tronco fica mais plano, a lombar arqueia e o exercício vira um supino reto.',keys:{mid:{P:[0,61,3],lumbar:-70,thor:-64},top:{P:[0,67,5],lumbar:-76,thor:-66}}}
  ]
};
export default ex;
