// @ts-nocheck
// Animação nova (marco das animações). Mesmo formato dos exercícios portados do guia original.
// Remada unilateral com halter, joelho e mão esquerdos no banco plano, braço direito puxando.
// Técnica e fontes: docs/pesquisa/animacoes/remada-unilateral.md.
import { TX, BOX, dumbbell } from '../desenho';
import { X, Y, Z } from '../math';

// Banco plano ao longo do eixo Z, do lado esquerdo do corpo; topo do estofado em y = 46.5.
const BANCO = { x: 10, y: 44, z: 2, meiaLarg: 13, meioComp: 56 };

const ex = {
  id:'remada-unilateral',
  views:['lateral','posterior'],
  base:{P:[0,88,-22],lumbar:74,thor:76,neck:62,
    legR:{ikS:[20,7,-24],poleRel:[.3,.2,1],ft:[12,-20]},
    legL:{ikS:[10,50,-64],poleRel:[0,-.2,1],ft:[180,-8],heelV:[0,5,3]},
    armL:{ikS:[17,49,30],poleRel:[.4,0,-1]}},
  keys:{
    stretch:{proR:6,elevR:1,armR:{ikS:[20,44,33],poleRel:[.3,0,-1]}},
    mid:{proR:0,elevR:0,armR:{ikS:[22,64,16],poleRel:[.25,1,-.5]}},
    end:{proR:-6,elevR:-1,armR:{ikS:[22,82,-4],poleRel:[.2,1,-.6]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Alongado',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:1,kind:'hold',label:'Segura contraído',tempo:'1 s',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],posterior:[['E','R','cotovelo']]},
  equip(sk){
    const b=BANCO;
    BOX([b.x,b.y,b.z],[[X,b.meiaLarg],[Y,2.5],[Z,b.meioComp]],'eqp',{bias:-4});
    BOX([b.x,21,b.z-44],[[X,2.5],[Y,19],[Z,2.5]],'eqd',{bias:-6});BOX([b.x,21,b.z+44],[[X,2.5],[Y,19],[Z,2.5]],'eqd',{bias:-6});
    BOX([b.x,2.5,b.z],[[X,4],[Y,2],[Z,48]],'eqd',{bias:-6});
    dumbbell(sk.side.R.G,Z,'db'+(this._pal==='e'?'-e':''));
  },
  guides:{
    lateral(sk){TX([0,121,4],'costas retas',{cls:'lbl-g',anchor:'middle'});TX([0,104,-62],'cotovelo vai ao quadril',{cls:'lbl-g',anchor:'middle'});},
    posterior(sk){TX([-40,128,0],'ombros e quadril',{cls:'lbl-g',anchor:'start'});TX([-40,128,0],'sem girar o tronco',{cls:'lbl-g',anchor:'start',dy:15});}
  },
  muscles:{p:[['lats','R'],['midTrap','R']],s:[['deltPost','R'],['biceps','R']]},
  errors:[
    {id:'girar',view:'posterior',keys:{mid:{roll:-10},end:{roll:-18}}},
    {id:'arredondar',view:'lateral',keys:{stretch:{lumbar:60,thor:100,neck:96},mid:{lumbar:62,thor:96,neck:92},end:{lumbar:64,thor:94,neck:90}}},
    {id:'curta',view:'lateral',keys:{stretch:{proR:0,armR:{ikS:[21,60,20],poleRel:[.25,1,-.5]}}}}
  ]
};
export default ex;
