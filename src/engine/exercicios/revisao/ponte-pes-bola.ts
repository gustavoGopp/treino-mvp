// @ts-nocheck
// Animação nova (em revisão). Ponte de glúteo com os pés na bola: deitado de costas, braços abertos no chão,
// calcanhares em cima da bola com as pernas quase estendidas; empurra a bola para baixo com os calcanhares e sobe o
// quadril até ombros, quadril e joelhos ficarem em linha; desce em ~2 s. Parte da ponte de glúteo aprovada (mesmo
// tronco e mesmo quadril), com a bola (C3) sob os calcanhares. A bola é desenhada sob o calcanhar: no erro em que
// ela foge, ela vai junto com os pés. Técnica e fontes: docs/pesquisa/animacoes/ponte-pes-bola.md.
import { BOX, C3, L3, TX } from '../../desenho';
import { BALL } from '../compartilhado';
import { X, Y, Z } from '../../math';

const ex = {
  id:'ponte-pes-bola',
  views:['lateral'],
  base:{legR:{ikS:[11,58,70],poleRel:[0,1,0],ft:[0,62],heelV:[0,-4,-2]},armR:{ua:[70,-6],fa:[70,-3]}},
  keys:{
    down:{P:[0,12,0],lumbar:-90,thor:-90,neck:-90},
    mid:{P:[0,22.5,-3],lumbar:-103,thor:-103,neck:-91},
    top:{P:[0,33,-6],lumbar:-116,thor:-116,neck:-92}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Embaixo',tempo:'calcanhares na bola',breath:'INSPIRA'},
    {path:['down','mid','top'],dur:1.2,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Topo · segura',tempo:'~1 s',breath:'FIRME'},
    {path:['top','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','top'],
  paths:{lateral:[['P','','quadril']]},
  equip(sk){BOX([0,0.6,-30],[[X,30],[Y,0.6],[Z,50]],'eqp',{bias:-4});const h=sk.side.R.heel;C3([0,BALL,h[2]+6],BALL,'ball',{bias:-2});},
  guides:{
    lateral(sk){const R=sk.side.R;L3(sk.N,R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,74,-10],'ombro, quadril e joelho em linha',{cls:'lbl-g',anchor:'middle'});TX([0,-6,60],'calcanhar empurra a bola',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['glutes','RL']],s:[['hams','R']]},
  errors:[
    {id:'lombar',view:'lateral',keys:{mid:{P:[0,25,-3.5],lumbar:-100,thor:-113},top:{P:[0,38,-7],lumbar:-99,thor:-142,neck:-95}}},
    // a bola foge para longe: os pés vão com ela, a perna estica e o quadril cai
    {id:'bola',view:'lateral',keys:{mid:{P:[0,16,-1.5],lumbar:-96,thor:-96,legR:{ikS:[11,52,76],poleRel:[0,1,0],ft:[0,62],heelV:[0,-4,-2]}},top:{P:[0,19,-2.5],lumbar:-99,thor:-99,legR:{ikS:[11,48,78],poleRel:[0,1,0],ft:[0,62],heelV:[0,-4,-2]}}}},
    {id:'raso',view:'lateral',keys:{mid:{P:[0,16,-1.2],lumbar:-95,thor:-95,neck:-90.3},top:{P:[0,20,-2],lumbar:-100,thor:-100,neck:-90.5}}}
  ]
};
export default ex;
