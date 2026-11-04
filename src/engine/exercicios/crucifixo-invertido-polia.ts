// @ts-nocheck
// Animação nova (aprovada). Crucifixo invertido na polia dupla, com os cabos cruzados: polias na altura dos ombros,
// à frente e dos lados; a mão direita segura o cabo da polia da esquerda e vice-versa. Braços quase retos, cotovelos
// levemente dobrados e fixos; os braços abrem até as mãos chegarem perto da linha do corpo. Parte do crucifixo na
// polia aprovado (mesmas torres e o mesmo braço em arco), com o movimento ao contrário.
// Técnica e fontes: docs/pesquisa/animacoes/crucifixo-invertido-polia.md.
import { C3, PL3, TX, cable, liftOf, tower } from '../desenho';
import { Y, Z, add, comb, dirAE, mul } from '../math';

const ex = {
  id:'crucifixo-invertido-polia',
  views:['frontal','top'],
  base:{P:[0,91,0],lumbar:4,thor:4,neck:2,legR:{ikS:[11,7,-12],poleRel:[.1,0,1],ft:[8,-18]},legL:{ikS:[11,7,14],poleRel:[.1,0,1],ft:[8,-18]}},
  keys:{
    close:{pro:4,armR:{sph:[-10,-4,62],poleRel:[1,.1,-.25]}},
    mid:{pro:1,armR:{sph:[42,-4,62],poleRel:[.8,.2,-.7]}},
    open:{pro:-3,armR:{sph:[92,-4,62],poleRel:[.45,.25,-1]}}
  },
  seq:[
    {path:['close'],dur:.5,kind:'hold',label:'Braços à frente',tempo:'cabos cruzados',breath:'INSPIRA'},
    {path:['close','mid','open'],dur:1.1,kind:'conc',label:'Abertura · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['open'],dur:.5,kind:'hold',label:'Braços abertos',tempo:'pausa curta',breath:'FIRME'},
    {path:['open','mid','close'],dur:2.2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['close','open'],
  paths:{frontal:[['G','R','mãos'],['G','L','']],top:[['G','R','mãos em arco'],['G','L','']]},
  // polias à frente e dos lados, na altura dos ombros; a mão direita (x < 0) puxa o cabo da torre da esquerda (x > 0)
  towers:[{x:84,z:55,ac:Z,out:[-1,0,0],py:132},{x:-84,z:55,ac:Z,out:[1,0,0],py:132}],
  bounds:{frontal:[-96,96,-196,0]},
  equip(sk){
    const ids=['r','l'];
    this.towers.forEach((t,i)=>{const k=i?'L':'R';const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);C3(sk.side[k].G,2.6,'eqd',{bias:.3});const L=cable(this,ids[i],sk.side[k].G,pul);tower(t,liftOf(this,ids[i],L));});
  },
  guides:{
    top(sk){for(const k of['R','L']){const sd=sk.side[k];const pts=[];for(let a=-10;a<=94;a+=6)pts.push(add(sd.S,mul(dirAE(a,-4,sd.s),62)));PL3(pts,'gd',.9,{layer:2,dash:'2 3'});}TX(comb(1,sk.N,-40,Z),'braços quase retos, abrindo em arco',{cls:'lbl-g',anchor:'middle'});},
    frontal(sk){TX([0,12,0],'ombros baixos, cotovelos fixos',{cls:'lbl-g',anchor:'middle',dy:-4});}
  },
  muscles:{p:[['deltPost','RL']],s:[]},
  errors:[
    {id:'encolher',view:'frontal',keys:{mid:{elev:2.5},open:{elev:3}}},
    {id:'cotovelo',view:'top',keys:{mid:{armR:{sph:[42,-6,46],poleRel:[.2,.2,-1]}},open:{armR:{sph:[96,-6,44],poleRel:[.1,.3,-1]}}}},
    {id:'balanco',view:'lateral',keys:{mid:{lumbar:-6,thor:-8,neck:-4},open:{lumbar:-12,thor:-14,neck:-8}}}
  ]
};
export default ex;
