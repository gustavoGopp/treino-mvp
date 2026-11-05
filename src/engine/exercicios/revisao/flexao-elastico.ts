// @ts-nocheck
// Animação nova (em revisão). Flexão de braço com elástico: o meio do elástico passa pelas costas, na altura das
// escápulas, e cada ponta fica presa sob a palma; a flexão é a de sempre, e o elástico pesa mais no fim da subida.
// Parte da flexão aprovada (mesmo corpo e mesmo caminho), com a faixa das costas a cada mão (band), que afina
// quando estica. O erro "pescoco" é a faixa subindo para o pescoço (um parâmetro da pose lido pelo equipamento).
// Técnica e fontes: docs/pesquisa/animacoes/flexao-elastico.md.
import { L3, TX, band } from '../../desenho';
import { add, comb, mul, sub } from '../../math';

const ex = {
  id:'flexao-elastico',
  views:['lateral','top'],
  base:{legR:{ikS:[9,9.5,-119.5],poleRel:[0,1,0],ft:[0,-34]},armR:{ikS:[30,3,-3],poleRel:[.7,.5,-1]},wrist:80,wristDir:[0,0,1]},
  keys:{
    top:{P:[0,43.8,-41.1],lumbar:66.5,thor:66.5,neck:70,pro:0},
    mid:{P:[0,28.8,-36.2],lumbar:77,thor:77,neck:80,pro:-2},
    bottom:{P:[0,14.3,-34.1],lumbar:86.8,thor:86.8,neck:88,pro:-4}
  },
  seq:[
    {path:['top'],dur:.4,kind:'hold',label:'Em cima',tempo:'elástico mais esticado',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.35,kind:'hold',label:'Embaixo',tempo:'peito perto do chão',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['N','','peito'],['E','R','cotovelo']],top:[['E','R','cotovelo'],['E','L','']]},
  // onde a faixa passa: nas costas, na altura das escápulas (ou, no erro, no pescoço)
  costas(sk){return sk.pose.faixaNoPescoco?comb(1,sk.Hc,-7,sk.fN,-4,sk.uN):comb(1,sk.N,-9,sk.fT,-8,sk.uT);},
  equip(sk){const c=this.costas(sk);for(const k of['R','L'])band(this,k,c,sk.side[k].G,{bias:k==='R'?.6:-3});},
  guides:{
    lateral(sk){L3(sk.side.R.A,add(sk.Hc,mul(sub(sk.Hc,sk.side.R.A),.06)),'gd',.9,{layer:3,dash:'3 2.5'});TX(sk.P,'corpo em linha reta',{cls:'lbl-g',anchor:'middle',dy:-18});TX(this.costas(sk),'elástico nas escápulas',{cls:'lbl-g',anchor:'end',dx:-8,dy:-6});},
    top(sk){TX([-44,0,-4],'cotovelos ~45° do tronco',{cls:'lbl-g',size:10,anchor:'end'});TX([44,0,-4],'mãos na linha do peito',{cls:'lbl-g',size:10});}
  },
  muscles:{p:[['pecStern','RL']],s:[['triceps','RL'],['deltAnt','RL'],['rectus','R']]},
  errors:[
    {id:'quadril',view:'lateral',keys:{top:{P:[0,33,-42],lumbar:54,thor:72},mid:{P:[0,19,-37],lumbar:65,thor:83},bottom:{P:[0,6,-35],lumbar:76,thor:92}}},
    {id:'cot',view:'top',base:{armR:{ikS:[33,3,0],poleRel:[1,.4,-.05]}}},
    {id:'curta',view:'lateral',keys:{bottom:{P:[0,28.8,-36.2],lumbar:77,thor:77,neck:80,pro:-2}}},
    {id:'pescoco',view:'lateral',base:{faixaNoPescoco:1}}
  ]
};
export default ex;
