// @ts-nocheck
// Animação nova (em revisão). Abdominal invertido no chão: de costas, braços ao lado do corpo com as palmas no chão,
// joelhos a ~90° e coxas na vertical. A pelve enrola em direção ao peito e o quadril sai do chão; os ombros e as costas
// de cima ficam no chão. Técnica e fontes: docs/pesquisa/animacoes/abdominal-invertido.md.
// O colchonete, o corpo deitado e a cabeça são os do abdominal no chão aprovado (abdominal-chao). A pelve gira em torno
// do meio das costas (M, parado): P = M − 22·uL, com o tronco de cima parado; assim os ombros não se mexem.
import { BOX, L3, TX } from '../../desenho';
import { X, Y, Z } from '../../math';

const MAOS = { ikS: [24, 2, 10], poleRel: [1, .4, 0] };
const ex = {
  id:'abdominal-invertido',
  views:['lateral'],
  base:{thor:-88,neck:-82,armR:MAOS},
  keys:{
    // embaixo: quadril no chão, coxas na vertical, canelas paralelas ao chão (joelho a 90°)
    down:{P:[0,11,0],lumbar:-88,legR:{th:[0,90],sh:[0,0],ft:[0,60]}},
    // a pelve gira 17° e as pernas giram junto, com o joelho ainda a 90°
    mid:{P:[0,17.5,-.7],lumbar:-105,legR:{th:[180,73],sh:[0,17],ft:[0,77]}},
    // no alto: a pelve gira 37°, o quadril 13 cm acima do chão, os joelhos sobre o peito
    up:{P:[0,24.4,-4],lumbar:-125,legR:{th:[180,53],sh:[0,37],ft:[180,83]}}
  },
  seq:[
    {path:['down'],dur:.4,kind:'hold',label:'Embaixo',tempo:'coxas na vertical',breath:'INSPIRA'},
    {path:['down','mid','up'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['up'],dur:1,kind:'hold',label:'No alto · contrai',tempo:'1 s',breath:'EXPIRA'},
    {path:['up','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['down','up'],
  paths:{lateral:[['P','','quadril']]},
  equip(sk){BOX([0,0.6,-10],[[X,30],[Y,0.6],[Z,70]],'eqp',{bias:-4});},
  guides:{
    lateral(sk){L3([0,3,-60],[0,3,-30],'gd',1.2,{layer:3,dash:'3 2.5'});TX([0,-6,-45],'costas no chão',{cls:'lbl-g',anchor:'middle'});TX(sk.P,'enrola a pelve',{cls:'lbl-g',anchor:'end',dx:-14,dy:14});}
  },
  muscles:{p:[['rectus','R']],s:[]},
  errors:[
    // jogar as pernas: as pernas são lançadas em direção à cabeça e o embalo tira o quadril alto demais do chão
    // (a pelve gira 52°, e não 37°); no meio da subida, as pernas já vão à frente da pelve
    {id:'embalo',view:'lateral',keys:{
      mid:{P:[0,21.2,-2],lumbar:-115,legR:{th:[180,55],sh:[0,20],ft:[0,85]}},
      up:{P:[0,28.7,-7.8],lumbar:-140,legR:{th:[180,38],sh:[0,12],ft:[180,75]}}}},
    // empurrar com as mãos: as mãos apertam o chão perto do quadril, com os cotovelos dobrados e para cima (os braços
    // fazendo a força)
    {id:'maos',view:'lateral',base:{armR:{ikS:[24,2,-8],poleRel:[.4,1,0]}},keys:{
      down:{armR:{ikS:[24,2,-8],poleRel:[.4,1,0]}},mid:{armR:{ikS:[24,2,-8],poleRel:[.4,1,0]}},up:{armR:{ikS:[24,2,-8],poleRel:[.4,1,0]}}}},
    // arquear a lombar na descida: as pernas vão longe demais e a lombar sai do chão (a pelve fica no chão)
    {id:'lombar',view:'lateral',keys:{down:{P:[0,10,0],lumbar:-76,thor:-96,legR:{th:[0,38],sh:[0,-8],ft:[0,30]}}}}
  ]
};
export default ex;
