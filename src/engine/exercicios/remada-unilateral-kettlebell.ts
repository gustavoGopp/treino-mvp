// @ts-nocheck
// Animação nova (aprovada). Remada unilateral com kettlebell: pé esquerdo à frente com o joelho dobrado,
// mão esquerda apoiada na coxa esquerda, tronco inclinado ~45–60° com a coluna neutra, braço direito puxando.
// Parte da remada unilateral sem banco aprovada (mesmo corpo e mesmo braço); o halter vira o kettlebell, pendurado pela alça.
// Técnica e fontes: docs/pesquisa/animacoes/remada-unilateral-kettlebell.md.
import { TX, kettlebell } from '../desenho';
import { Z } from '../math';

const ex = {
  id:'remada-unilateral-kettlebell',
  views:['lateral','posterior'],
  base:{P:[0,84,-12],lumbar:62,thor:64,neck:48,
    legL:{ikS:[12,7,16],poleRel:[0,.2,1],ft:[6,-18]},
    legR:{ikS:[14,7,-34],poleRel:[0,.2,1],ft:[14,-24]},
    armL:{ikS:[12,58,10],poleRel:[.5,0,-1]}},
  keys:{
    stretch:{proR:6,elevR:1,armR:{ikS:[18,50,32],poleRel:[.3,0,-1]}},
    mid:{proR:0,elevR:0,armR:{ikS:[20,66,20],poleRel:[.25,1,-.5]}},
    end:{proR:-6,elevR:-1,armR:{ikS:[20,84,-2],poleRel:[.2,1,-.6]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Alongado',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:1,kind:'hold',label:'Segura contraído',tempo:'1 s',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],posterior:[['E','R','cotovelo']]},
  equip(sk){kettlebell(sk.side.R.G,[0,-1,0],Z,'db'+(this._pal==='e'?'-e':''),{layer:1.4});},
  guides:{
    lateral(sk){TX([0,128,10],'costas retas',{cls:'lbl-g',anchor:'middle'});TX([0,52,52],'mão livre na coxa',{cls:'lbl-g',anchor:'middle'});TX([0,140,-30],'cotovelo vai ao quadril',{cls:'lbl-g',anchor:'middle'});},
    posterior(sk){TX([-40,128,0],'ombros e quadril',{cls:'lbl-g',anchor:'start'});TX([-40,128,0],'sem girar o tronco',{cls:'lbl-g',anchor:'start',dy:15});}
  },
  muscles:{p:[['lats','R'],['midTrap','R']],s:[['deltPost','R'],['biceps','R']]},
  errors:[
    {id:'gira',view:'posterior',keys:{mid:{roll:-10},end:{roll:-18}}},
    {id:'arred',view:'lateral',keys:{stretch:{lumbar:40,thor:86,neck:84},mid:{lumbar:42,thor:82,neck:80},end:{lumbar:44,thor:80,neck:78}}},
    {id:'curta',view:'lateral',keys:{stretch:{proR:0,armR:{ikS:[20,64,22],poleRel:[.25,1,-.5]}}}}
  ]
};
export default ex;
