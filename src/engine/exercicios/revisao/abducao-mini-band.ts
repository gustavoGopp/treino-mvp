// @ts-nocheck
// Animação nova (em revisão). Abdução de quadril sentado, com mini-band: sentado na beira do assento, costas retas,
// pés no chão na largura do quadril, mãos na lateral do assento, a faixa nas coxas logo acima dos joelhos; abre os
// joelhos para fora com os pés no lugar, segura ~1 s e volta em ~2 s sem deixar os joelhos baterem. Parte da extensão
// de joelho com caneleira em revisão (mesmo corpo sentado e mesmo banco), com o laço (miniBand, feito com a peça band).
// Técnica e fontes: docs/pesquisa/animacoes/abducao-mini-band.md.
import { BOX, L3, TX, miniBand } from '../../desenho';
import { X, Y, Z } from '../../math';

const ex = {
  id:'abducao-mini-band',
  views:['frontal','lateral'],
  base:{P:[0,53,0],lumbar:-2,thor:-4,neck:0,armR:{ikS:[22,46,-6],poleRel:[1,-.3,-.6]}},
  keys:{
    close:{legR:{ikS:[12,7,40],poleRel:[.1,.5,1],ft:[8,-20]}},
    mid:{legR:{ikS:[12,7,40],poleRel:[.6,.45,.8],ft:[8,-20]}},
    open:{legR:{ikS:[12,7,40],poleRel:[1,.4,.5],ft:[8,-20]}},
    midDown:{legR:{ikS:[12,7,40],poleRel:[.6,.45,.8],ft:[8,-20]}}
  },
  seq:[
    {path:['close'],dur:.5,kind:'hold',label:'Joelhos na largura do quadril',tempo:'faixa já esticada',breath:'INSPIRA'},
    {path:['close','mid','open'],dur:1.1,kind:'conc',label:'Abertura · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['open'],dur:1,kind:'hold',label:'Aberto · segura',tempo:'1 s',breath:'FIRME'},
    {path:['open','midDown','close'],dur:2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['close','open'],
  paths:{frontal:[['K','R','joelho'],['K','L','']],lateral:[['K','R','joelho']]},
  equip(sk){
    BOX([0,45,6],[[X,13],[Y,2.5],[Z,17]],'eqp',{bias:-4});
    BOX([0,2.5,0],[[X,4],[Y,2],[Z,30]],'eqd',{bias:-6});BOX([0,22,4],[[X,2.5],[Y,20],[Z,2.5]],'eqd',{bias:-6});
    miniBand(this,sk);
  },
  guides:{
    frontal(sk){for(const k of['R','L']){const t=sk.side[k].toe;L3([t[0],1,t[2]],[t[0],14,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});}TX([0,-6,40],'pés no lugar',{cls:'lbl-g',anchor:'middle'});TX([0,120,0],'tronco parado',{cls:'lbl-g',anchor:'middle'});},
    lateral(sk){TX([0,118,-6],'costas retas, mãos no assento',{cls:'lbl-g',anchor:'middle'});TX([0,-6,40],'pés no chão',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['glutes','RL']],s:[]},
  errors:[
    // embalar o tronco: vai à frente para abrir e para trás na volta
    {id:'tronco',view:'lateral',keys:{mid:{lumbar:12,thor:14,neck:8},open:{lumbar:-12,thor:-14,neck:-6}}},
    // soltar a volta: os joelhos fecham de uma vez
    {id:'solta',view:'frontal',keys:{midDown:{legR:{ikS:[12,7,40],poleRel:[.1,.5,1],ft:[8,-20]}}}},
    // tirar os pés do lugar: os pés abrem junto com os joelhos
    {id:'pes',view:'frontal',keys:{mid:{legR:{ikS:[20,7,40],poleRel:[.6,.45,.8],ft:[20,-20]}},open:{legR:{ikS:[28,7,40],poleRel:[1,.4,.5],ft:[30,-20]}}}}
  ]
};
export default ex;
