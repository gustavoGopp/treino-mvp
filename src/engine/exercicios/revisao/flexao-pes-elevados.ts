// @ts-nocheck
// Animação nova (em revisão). Flexão com os pés elevados: as mãos no chão um pouco mais abertas que os ombros, a ponta
// dos pés na beirada de uma cama ou sofá firme (45 cm), o corpo reto; desce com os cotovelos a ~45° até o peito quase
// tocar o chão e empurra de volta. Técnica e fontes: docs/pesquisa/animacoes/flexao-pes-elevados.md.
// Base: a flexão aprovada (flexao): as mesmas mãos, os mesmos braços e cotovelos, o mesmo pescoço e os mesmos erros. A
// diferença: o tornozelo sobe para a altura do apoio (y 54,5) e o corpo reto gira em torno dele. Os ombros (N) ficam onde
// a flexão os põe em cima (64 cm) e descem até 20 cm (o queixo não bate no chão); o ângulo do corpo sai de
// cos φ = (N.y − 54,5) / 136,6 (do tornozelo ao ombro), e P = N − 51·(cos φ, sen φ). O apoio é uma caixa (BOX).
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z, add, mul, sub } from '../../math';

const ex = {
  id:'flexao-pes-elevados',
  views:['lateral','top'],
  base:{legR:{ikS:[9,54.5,-130.6],poleRel:[0,1,0],ft:[0,-34]},armR:{ikS:[30,3,-3],poleRel:[.7,.5,-1]},wrist:80,wristDir:[0,0,1]},
  keys:{
    top:{P:[0,60.5,-45.2],lumbar:86,thor:86,neck:89,pro:0},
    mid:{P:[0,46.7,-45.4],lumbar:95.3,thor:95.3,neck:96,pro:-2},
    bottom:{P:[0,32.9,-47.8],lumbar:104.6,thor:104.6,neck:101,pro:-4}
  },
  seq:[
    {path:['top'],dur:.4,kind:'hold',label:'Em cima',tempo:'prancha',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'2 a 3 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.35,kind:'hold',label:'Embaixo',tempo:'peito perto do chão',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['N','','peito'],['E','R','cotovelo']],top:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){BOX([0,22.5,-136],[[X,40],[Y,22.5],[Z,27]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){L3(sk.side.R.A,add(sk.Hc,mul(sub(sk.Hc,sk.side.R.A),.06)),'gd',.9,{layer:3,dash:'3 2.5'});TX(sk.P,'corpo em linha reta',{cls:'lbl-g',anchor:'middle',dy:-18});TX([0,22,-136],'pés num apoio firme',{cls:'lbl-g',anchor:'middle'});},
    top(sk){TX([-44,0,-4],'cotovelos ~45° do tronco',{cls:'lbl-g',size:10,anchor:'end'});TX([44,0,-4],'mãos na linha do peito',{cls:'lbl-g',size:10});}
  },
  muscles:{p:[['pecStern','RL']],s:[['triceps','RL'],['deltAnt','RL'],['rectus','R']]},
  errors:[
    // quadril caído: a perna gira 5° para baixo em torno do tornozelo (o quadril desce ~7 cm abaixo da linha) e a lombar
    // arqueia (lombar 4° acima e tórax 8° abaixo do ângulo do corpo), como o "quadril" da flexão aprovada; embaixo, o
    // ombro fica na mesma altura do certo (20 cm), e só o quadril cai
    {id:'quadril',view:'lateral',keys:{top:{P:[0,53,-45],lumbar:82,thor:94,neck:95},mid:{P:[0,39.2,-46.4],lumbar:91.3,thor:103.3,neck:104.3},bottom:{P:[0,31.6,-48.1],lumbar:96.5,thor:108.5,neck:104.5}}},
    // descer pouco: para no meio
    {id:'curta',view:'lateral',keys:{bottom:{P:[0,46.7,-45.4],lumbar:95.3,thor:95.3,neck:96,pro:-2}}},
    // cotovelos abertos em T: a mesma pose do erro "cot" da flexão aprovada (vista de cima)
    {id:'cotovelos',view:'top',base:{armR:{ikS:[33,3,0],poleRel:[1,.4,-.05]}}}
  ]
};
export default ex;
