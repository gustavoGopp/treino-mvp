// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbell } from '../desenho';
import { RI } from '../exercicios/compartilhado';
import { X, Y, Z, add, comb } from '../math';

const ex = {
  id:'rosca-inclinada',sets:3,rest:{opts:[90],def:90},name:'Rosca inclinada com halteres',short:'Rosca inclinada',
  rx:'3 × 8–12 · RIR 0–1 · descanso 1,5 min',target:'Bíceps (com ênfase na posição alongada)',
  views:['lateral'],
  base:{P:[0,53,0],lumbar:-40,thor:-40,neck:-28,pro:-3,legR:{ikS:[18,7,42],poleRel:[.3,.5,1],ft:[12,-20]}},
  keys:{bottom:{armR:{ua:[0,-90],fa:[0,-83]}},mid:{armR:{ua:[0,-90],fa:[0,-5]}},top:{armR:{ua:[0,-90],fa:[0,45]}}},
  seq:[
    {path:['bottom'],dur:.6,kind:'hold',label:'Embaixo · alongado',tempo:'braço estendido',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],extLabels:['embaixo','topo'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']]},
  equip(sk){
    BOX([0,45,8],[[X,13],[Y,2.5],[Z,17]],'eqp',{bias:-4});
    BOX(comb(1,[0,53,0],36,RI.u,-10.5,RI.f),[[X,13],[RI.u,36],[RI.f,2.5]],'eqp',{bias:-4});
    BOX([0,2.5,0],[[X,4],[Y,2],[Z,36]],'eqd',{bias:-6});BOX([0,22,4],[[X,2.5],[Y,20],[Z,2.5]],'eqd',{bias:-6});
    const c='db'+(this._pal==='e'?'-e':'');for(const k of['R','L'])dumbbell(sk.side[k].G,X,c);
  },
  guides:{
    lateral(sk){const R=sk.side.R;L3(R.S,add(R.S,[0,-44,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(R.E,'cotovelo parado',{cls:'lbl-g',anchor:'end',dx:-12,dy:4});
      TX([0,112,48],'encosto a 45–60°',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['biceps','RL']],s:[['forearm','RL']]},
  feel:'Bíceps, com bastante alongamento embaixo.',
  feelNote:'Sentir puxar a frente do ombro na parte de baixo é comum. Dor na frente do ombro não é: suba o encosto para 60° ou troque pela rosca na polia.',
  setupEq:['Encosto a 45–60°; quanto mais deitado, mais o bíceps alonga.','Halteres fixos (1–10 kg) ou montados.'],
  setupBody:['Sente com as costas e a cabeça apoiadas, pés firmes no chão.','Braços pendurados na vertical, atrás da linha do tronco.','Palmas para a frente, ombros encostados no banco.'],
  exec:[['hold','Embaixo','Braços estendidos, bíceps alongado.'],['conc','Subida (concêntrica)','~1 s. Dobre só o cotovelo; o braço continua na vertical.'],['hold','Topo','Halter perto do ombro, sem levar o cotovelo à frente.'],['ecc','Descida (excêntrica)','~2–3 s, até o braço estender de novo.']],
  range:['Embaixo: braço quase estendido, sem relaxar o ombro para a frente.','Em cima: até onde o cotovelo consegue ir sem sair da vertical.','Nas últimas repetições, a parte de baixo vale mais que a de cima: não encurte embaixo.'],
  breath:'Solte o ar subindo, inspire descendo.',
  cues:['Ombros no encosto.','Braço na vertical.','Estica embaixo.'],
  check:['Encosto a 45–60°','Costas e cabeça apoiadas','Palmas para a frente','Braços atrás do tronco','Carga para RIR 0–1'],
  vary:'A inclinação do encosto depende do conforto do ombro. Num estudo com rosca Scott, treinar só a parte inicial do movimento (braço estendido) gerou mais hipertrofia na porção do bíceps perto do cotovelo (Pedrosa et al., 2023; um estudo, mulheres destreinadas). O banco inclinado alonga ainda mais o bíceps por causa do ombro; isso vem da biomecânica, sem estudo direto de hipertrofia.',
  errors:[
    {id:'cotovelo',title:'Cotovelos vão para a frente',view:'lateral',desc:'O braço sai da vertical e a frente do ombro passa a ajudar. O bíceps perde a posição alongada.',keys:{mid:{armR:{ua:[0,-68],fa:[0,10]}},top:{armR:{ua:[0,-38],fa:[0,72]}}}},
    {id:'ombro',title:'Ombros saem do encosto',view:'lateral',desc:'O tronco e os ombros vão para a frente para ajudar a subir. A carga está pesada demais.',keys:{mid:{lumbar:-34,thor:-28,neck:-20,pro:5},top:{lumbar:-30,thor:-20,neck:-12,pro:9,armR:{ua:[0,-62],fa:[0,62]}}}},
    {id:'curta',title:'Não estender embaixo',view:'lateral',desc:'Voltar só até a metade perde a parte alongada, que é o motivo de fazer a rosca inclinada.',keys:{bottom:{armR:{ua:[0,-90],fa:[0,-35]}}}}
  ]
};
export default ex;
