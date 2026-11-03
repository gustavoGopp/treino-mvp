// @ts-nocheck
// Animação nova (em revisão). Agachamento com o peso do corpo: pés no chão (sem anilha sob o calcanhar), braços
// estendidos à frente na altura dos ombros como contrapeso. Parte do goblet aprovado, sem o halter.
// Técnica e fontes: docs/pesquisa/animacoes/agachamento-peso-corpo.md.
import { L3, TX } from '../../desenho';

const ex = {
  id:'agachamento-peso-corpo',
  views:['lateral','frontal'],
  base:{legR:{ikS:[15,7,0],poleRel:[.35,.3,1],ft:[15,-18]},armR:{ua:[-7,-12],fa:[-7,-8]}},
  keys:{
    top:{P:[0,92.3,-1],lumbar:4,thor:4,neck:2},
    mid:{P:[0,65,-10],lumbar:20,thor:17,neck:8},
    bottom:{P:[0,41,-18],lumbar:34,thor:28,neck:14}
  },
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em pé',tempo:'respire e firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · sem quicar',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['P','','quadril'],['K','R','joelho']],frontal:[['K','R','joelho'],['K','L','']]},
  equip(sk){},
  guides:{
    lateral(sk){TX(sk.side.R.K,'joelho pode',{cls:'lbl-g',dx:9,dy:12});TX(sk.side.R.K,'passar do pé',{cls:'lbl-g',dx:9,dy:25});TX([-15,0,-12],'calcanhar no chão',{cls:'lbl-g',anchor:'end',dy:-8});},
    frontal(sk){for(const k of['R','L']){const t=sk.side[k].toe;L3([t[0],1,t[2]],[t[0],60,t[2]],'gd',.9,{layer:3,dash:'3 2.5'});}TX([0,1,0],'joelho na direção do pé',{cls:'lbl-g',anchor:'middle',dy:-6});}
  },
  muscles:{p:[['quads','RL']],s:[['glutes','RL']]},
  errors:[
    {id:'valgo',view:'frontal',keys:{mid:{legR:{ikS:[15,7,0],poleRel:[-.22,.3,1],ft:[15,-18]}},bottom:{legR:{ikS:[15,7,0],poleRel:[-.22,.3,1],ft:[15,-18]}}}},
    {id:'calcanhar',view:'lateral',keys:{mid:{P:[0,67,-8],legR:{ikS:[15,11,2.5],poleRel:[.35,.3,1],ft:[15,-38]}},bottom:{P:[0,44,-13],lumbar:30,thor:24,legR:{ikS:[15,13,4],poleRel:[.35,.3,1],ft:[15,-46]}}}},
    {id:'raso',view:'lateral',keys:{mid:{P:[0,82,-5],lumbar:10,thor:9},bottom:{P:[0,72,-8],lumbar:15,thor:13,neck:6}}}
  ]
};
export default ex;
