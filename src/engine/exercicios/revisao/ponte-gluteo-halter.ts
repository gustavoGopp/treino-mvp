// @ts-nocheck
// Animação nova (em revisão). Ponte de glúteo com halter: deitado de costas, o halter deitado de través sobre a dobra
// do quadril (com uma toalha embaixo), as duas mãos segurando as pontas do halter o tempo todo; empurra o chão pelos
// calcanhares até ombros, quadril e joelhos ficarem em linha. Técnica e fontes: docs/pesquisa/animacoes/ponte-gluteo-halter.md.
// Base: a ponte com kettlebell aprovada (ponte-kettlebell): o mesmo corpo, as mesmas poses, as mesmas mãos e os mesmos
// erros de corpo. Muda o objeto: o halter (dumbbell3) de través, com o cabo no eixo X, entre as duas mãos.
// O erro "halter rolando" usa um número da pose (`rola`, de 0 a 1): o halter escorrega para o lado direito e para baixo,
// e a mão esquerda solta. O motor interpola esse número como as juntas.
import { BOX, L3, TX, dumbbell3 } from '../../desenho';
import { X, Y, Z, add, comb, mid } from '../../math';

const MAO = (y, z) => ({ ikS: [10.5, y, z], poleRel: [.6, -.8, .2] });
// os cotovelos apoiados no chão ao lado da cintura (pedido do Gustavo, 10/11: abertos e no ar, "o braço está estranho")
// o halter: no meio das duas mãos, 3 cm acima delas (as mãos seguram as anilhas pelos lados)
const halter = (sk) => {
  const r = sk.pose.rola || 0;
  const m = r > 0 ? sk.side.R.G : mid(sk.side.R.G, sk.side.L.G);
  const base = r > 0 ? add(m, [10.5, 0, 0]) : m;
  return comb(1, base, 3 - 9 * r, sk.fL, 1, [-14 * r, 0, 0]);
};
const ex = {
  id:'ponte-gluteo-halter',
  views:['lateral','top'],
  base:{rola:0,legR:{ikS:[11,7,34],poleRel:[0,1,.3],ft:[4,-18]},armR:{tr:[11,-47,15],poleRel:[1,0,0]}},
  keys:{
    down:{P:[0,12,0],lumbar:-90,thor:-90,neck:-90,armR:MAO(23,1)},
    mid:{P:[0,22,-1.7],lumbar:-101.5,thor:-101.5,neck:-91,armR:MAO(33,-2.9)},
    top:{P:[0,32.3,-5.2],lumbar:-114,thor:-114,neck:-92,armR:MAO(42.8,-8.8)}
  },
  seq:[
    {path:['down'],dur:.5,kind:'hold',label:'Deitado',tempo:'firme o abdômen',breath:'INSPIRA'},
    {path:['down','mid','top'],dur:1.2,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:1,kind:'hold',label:'Topo · segura',tempo:'~1 s',breath:'FIRME'},
    {path:['top','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','top'],
  paths:{lateral:[['P','','quadril']]},
  equip(sk){BOX([0,0.6,-18],[[X,30],[Y,0.6],[Z,74]],'eqp',{bias:-4});dumbbell3(halter(sk),X,'db'+(this._pal==='e'?'-e':''),{layer:1.4});},
  guides:{
    lateral(sk){const R=sk.side.R;L3(sk.N,R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,72,-14],'ombro, quadril e joelho em linha',{cls:'lbl-g',anchor:'middle'});TX([0,0,42],'empurra pelo calcanhar',{cls:'lbl-g',anchor:'end',dy:13});},
    top(sk){TX(add(sk.P,[0,0,-38]),'as duas mãos no halter',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['glutes','RL']],s:[]},
  errors:[
    // arquear a lombar no topo (o "lombar" da ponte com kettlebell)
    {id:'e1',view:'lateral',keys:{mid:{P:[0,25,-2.5],lumbar:-99,thor:-112,armR:MAO(36,-3.2)},top:{P:[0,38,-6],lumbar:-98,thor:-140,neck:-95,armR:MAO(49,-6.5)}}},
    // halter rolando: a mão esquerda solta e o halter escorrega para o lado e para baixo (visto de cima)
    {id:'e2',view:'top',keys:{mid:{rola:.6,armL:{ua:[50,-7],fa:[50,-3]}},top:{rola:1,armL:{ua:[50,-7],fa:[50,-3]}}}},
    // empurrar pela ponta dos pés (o "calcanhar" da ponte com kettlebell)
    {id:'e3',view:'lateral',keys:{mid:{legR:{ikS:[11,10,36],poleRel:[0,1,.3],ft:[4,-35]}},top:{P:[0,33,-4.5],legR:{ikS:[11,13,38],poleRel:[0,1,.3],ft:[4,-48]},armR:MAO(43.5,-8.1)}}},
    // subir pouco (o "raso" da ponte com kettlebell)
    {id:'e4',view:'lateral',keys:{mid:{P:[0,15,-.5],lumbar:-93.5,thor:-93.5,neck:-90.3,armR:MAO(26,-0.2)},top:{P:[0,18,-1],lumbar:-97,thor:-97,neck:-90.5,armR:MAO(29,-1.3)}}}
  ]
};
export default ex;
