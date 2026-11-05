// @ts-nocheck
// Animação nova (em revisão). Crucifixo com elástico: o elástico preso atrás, na altura do peito (porta, pilar ou
// barra: aqui um poste, escolha de desenho do R4), uma ponta em cada mão, 1–2 passos à frente; as mãos vão em arco
// até se encontrarem na frente do peito, cotovelos travados no mesmo ângulo. Parte do crucifixo na polia aprovado
// (mesmo corpo e mesmo arco das mãos), sem as duas torres: duas faixas do anel do poste às mãos, que afinam quando
// esticam (a tensão sobe no fechamento). O erro "frouxo" é ficar perto demais do poste: a faixa fica grossa.
// Técnica e fontes: docs/pesquisa/animacoes/crucifixo-elastico.md.
import { PL3, TX, band, bandHandle, poste } from '../../desenho';
import { Z, add, comb, dirAE, mul, norm, sub } from '../../math';

const ex = {
  id:'crucifixo-elastico',
  views:['frontal','top'],
  base:{P:[0,91,4],lumbar:12,thor:12,neck:4,legR:{ikS:[11,7,-16],poleRel:[.1,0,1],ft:[8,-18]},legL:{ikS:[11,7,24],poleRel:[.1,0,1],ft:[8,-18]}},
  keys:{
    open:{pro:-2,armR:{sph:[100,-6,62],poleRel:[.45,.25,-1]}},
    mid:{pro:-1,armR:{sph:[45,-11,62],poleRel:[.8,.2,-.7]}},
    close:{pro:1,armR:{sph:[-16,-16,62],poleRel:[1,.1,-.25]}}
  },
  seq:[
    {path:['open'],dur:.5,kind:'hold',label:'Alongado',tempo:'elástico já esticado',breath:'INSPIRA'},
    {path:['open','mid','close'],dur:1.3,kind:'conc',label:'Fechamento · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['close'],dur:.5,kind:'hold',label:'Mãos juntas',tempo:'pausa curta',breath:'FIRME'},
    {path:['close','mid','open'],dur:2.5,kind:'ecc',label:'Abertura · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['open','close'],
  paths:{frontal:[['G','R','mãos'],['G','L','']],top:[['G','R','mãos em arco'],['G','L',''],['E','R','cotovelo']]},
  ancora:[0,128,-62],
  equip(sk){
    const a=poste(this.ancora[0],this.ancora[2],this.ancora[1],{h:170});
    for(const k of['R','L']){band(this,k,a,sk.side[k].G,{bias:-1});bandHandle(sk.side[k].G,norm(sub(sk.side[k].G,a)));}
  },
  guides:{
    top(sk){for(const k of['R','L']){const sd=sk.side[k];const pts=[];for(let a=104;a>=-18;a-=6)pts.push(add(sd.S,mul(dirAE(a,-10,sd.s),62)));PL3(pts,'gd',.9,{layer:2,dash:'2 3'});}TX(comb(1,sk.N,92,Z),'mãos em arco',{cls:'lbl-g',anchor:'middle'});TX(add(this.ancora,[0,0,-10]),'preso atrás, na altura do peito',{cls:'lbl-g',anchor:'middle'});},
    frontal(sk){TX([0,12,0],'cotovelo levemente dobrado e fixo',{cls:'lbl-g',anchor:'middle',dy:-4});}
  },
  muscles:{p:[['pecStern','RL'],['pecClav','RL']],s:[['deltAnt','RL']]},
  errors:[
    {id:'supino',view:'top',keys:{open:{armR:{sph:[100,-6,50],poleRel:[.45,.25,-1]}},mid:{armR:{sph:[45,-11,38],poleRel:[.9,.1,-.5]}}}},
    {id:'abrir',view:'top',keys:{open:{pro:7,armR:{sph:[132,-2,62],poleRel:[.3,.3,-1]}}}},
    {id:'tronco',view:'lateral',keys:{mid:{lumbar:20,thor:24},close:{lumbar:30,thor:40,neck:30}}},
    // perto demais do poste: o elástico só estica no fim (a faixa fica grossa com os braços abertos)
    {id:'frouxo',view:'top',base:{P:[0,91,-30],legR:{ikS:[11,7,-50],poleRel:[.1,0,1],ft:[8,-18]},legL:{ikS:[11,7,-10],poleRel:[.1,0,1],ft:[8,-18]}}}
  ]
};
export default ex;
