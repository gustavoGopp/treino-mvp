// @ts-nocheck
// Animação nova (em revisão). Panturrilha sentada com halter no joelho: sentado num banco, joelhos a ~90°, a ponta dos
// pés num apoio baixo; o halter deitado sobre a coxa perto do joelho, segurado com as duas mãos; o calcanhar desce até
// o alongamento, pausa de ~1 s embaixo e sobe o máximo sem o tronco levantar. Parte do corpo sentado e do banco da
// extensão de joelho com caneleira aprovada, com o halter em 3D (dumbbell3) encostado na coxa e as mãos sobre ele.
// Técnica e fontes: docs/pesquisa/animacoes/panturrilha-sentada-halter.md.
import { BOX, L3, TX, dumbbell3 } from '../../desenho';
import { X, Y, Z, add } from '../../math';

// o halter deitado sobre a coxa, perto do joelho (ou, no erro, escorregado para o meio da coxa)
const halter=(sk)=>add(sk.side.R.K,[0,6.5,sk.pose.escorrega?-20:-6]);
const perna=(y,el,z)=>({ikS:[9,y,z],poleRel:[0,.3,1],ft:[0,el]});
const ex = {
  id:'panturrilha-sentada-halter',
  views:['lateral'],
  base:{P:[0,53,0],lumbar:-2,thor:-4,neck:0},
  keys:{
    top:{legR:perna(16,-28,43.5),armR:{ikS:[7,66,38],poleRel:[.4,-1,.3]}},
    mid:{legR:perna(10,-5,42.7),armR:{ikS:[7,60,37.5],poleRel:[.4,-1,.3]}},
    bottom:{legR:perna(4,15,42),armR:{ikS:[7,54,37],poleRel:[.4,-1,.3]}}
  },
  seq:[
    {path:['top','mid','bottom'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['bottom'],dur:1,kind:'hold',label:'Embaixo · alongado',tempo:'~1 s',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'}
  ],
  ext:['bottom','top'],
  paths:{lateral:[['heel','R','calcanhar'],['K','R','joelho']]},
  equip(sk){
    BOX([0,45,6],[[X,13],[Y,2.5],[Z,17]],'eqp',{bias:-4});
    BOX([0,2.5,0],[[X,4],[Y,2],[Z,30]],'eqd',{bias:-6});BOX([0,22,4],[[X,2.5],[Y,20],[Z,2.5]],'eqd',{bias:-6});
    BOX([0,4,61],[[X,22],[Y,4],[Z,6]],'eqp',{bias:-3}); // o apoio baixo da ponta dos pés
    dumbbell3(halter(sk),X,'db'+(this._pal==='e'?'-e':''),{layer:1.2});
  },
  guides:{
    lateral(sk){L3([0,8,54],[0,8,68],'gd',.9,{layer:3,dash:'2 3'});TX([0,8,68],'ponta dos pés no apoio',{cls:'lbl-g',dx:4,dy:4});TX([0,118,-6],'tronco parado',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['calf','R']],s:[]},
  errors:[
    // amplitude curta: o calcanhar sobe pouco e desce pouco
    {id:'curta',view:'lateral',keys:{top:{legR:perna(11,-10,43),armR:{ikS:[7,61,37.6],poleRel:[.4,-1,.3]}},bottom:{legR:perna(8,2,42.4),armR:{ikS:[7,58,37.3],poleRel:[.4,-1,.3]}}}},
    // levantar o tronco: o tronco vai para trás e sobe com o halter
    {id:'tronco',view:'lateral',keys:{mid:{lumbar:-10,thor:-12},top:{lumbar:-16,thor:-20,neck:-8}}},
    // o halter escorrega para o meio da coxa, e as mãos vão com ele
    {id:'halter',view:'lateral',base:{escorrega:1},keys:{top:{armR:{ikS:[7,66,24],poleRel:[.4,-1,.3]}},mid:{armR:{ikS:[7,60,23.5],poleRel:[.4,-1,.3]}},bottom:{armR:{ikS:[7,54,23],poleRel:[.4,-1,.3]}}}}
  ]
};
export default ex;
