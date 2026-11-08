// @ts-nocheck
// Animação nova (aprovada). Barra fixa com pegada supinada (palmas viradas para você), mãos na largura dos
// ombros; os cotovelos descem à frente do corpo, rentes às costelas. Parte da barra fixa (pronada) aprovada.
// Técnica e fontes: docs/pesquisa/animacoes/barra-fixa-supinada.md.
import { ARROW3, L3, TX, pullBar } from '../desenho';
import { scapPts } from '../esqueleto';
import { add, mul } from '../math';

const ex = {
  id:'barra-fixa-supinada',
  views:['posterior','lateral'],
  base:{lumbar:0,thor:0,neck:0,armR:{ikS:[21,230,1],poleRel:[.35,-.3,1]},legR:{th:[0,-80],sh:[180,-76],ft:[0,-55]}},
  keys:{
    hang:{P:[0,113.6,1],elev:6,pro:1,scapRot:32},
    set:{P:[0,120.8,1],elev:-1,pro:-1,scapRot:24},
    mid:{P:[0,150,1],lumbar:-4,thor:-6,neck:-3,elev:-2,pro:-3,scapRot:10,armR:{ikS:[21,230,1],poleRel:[.3,-1,1]}},
    top:{P:[0,177,1.5],lumbar:-8,thor:-12,neck:-6,elev:-3,pro:-4,scapRot:0,armR:{ikS:[21,230,1],poleRel:[.2,-1,.9]},legR:{th:[0,-74],sh:[180,-72],ft:[0,-55]}}
  },
  seq:[
    {path:['hang'],dur:.5,kind:'hold',label:'Pendurado · braço estendido',tempo:'',breath:'INSPIRA'},
    {path:['hang','set'],dur:.4,kind:'conc',label:'Escápulas descem',tempo:'começo da subida',breath:'EXPIRA'},
    {path:['set','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['top'],dur:.5,kind:'hold',label:'Topo',tempo:'pausa curta',breath:'FIRME'},
    {path:['top','mid','set','hang'],dur:2.6,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['hang','top'],
  paths:{posterior:[['E','R','cotovelo'],['E','L',''],['S','R','ombro']],lateral:[['S','R','ombro'],['E','R','cotovelo']]},
  equip(sk){pullBar();},
  guides:{
    posterior(sk){for(const k of['R','L']){const sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,[0,7,-3]),add(c,[0,-5,-3]),'gd',1.1,'gda',{layer:3});}TX([0,8,0],'escápulas descem antes de dobrar o braço',{cls:'lbl-g',anchor:'middle'});TX([0,246,0],'mãos na largura dos ombros',{cls:'lbl-g',anchor:'middle'});},
    lateral(sk){L3([0,230,0],[0,20,0],'gd',.9,{layer:2,dash:'2 3'});TX([0,24,0],'corpo sob a barra, sem balanço',{cls:'lbl-g',anchor:'middle',dy:12});TX([0,231,0],'palmas viradas para você',{cls:'lbl-g',anchor:'start',dx:9,dy:-4});}
  },
  muscles:{p:[['lats','RL']],s:[['midTrap','RL'],['biceps','RL'],['deltPost','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{hang:{lumbar:-8,thor:-6,legR:{th:[180,-78],sh:[180,-68],ft:[0,-60]}},set:{lumbar:6,legR:{th:[0,-55],sh:[0,-86],ft:[0,-40]}},mid:{lumbar:14,thor:2,legR:{th:[0,-12],sh:[0,-70],ft:[0,-20]}},top:{legR:{th:[0,-35],sh:[0,-82],ft:[0,-30]}}}},
    {id:'meia',view:'posterior',keys:{hang:{P:[0,148,1],lumbar:-4,thor:-6,elev:-1,pro:-2,scapRot:10,armR:{ikS:[21,230,1],poleRel:[.3,-1,1]}},set:{P:[0,148,1],lumbar:-4,thor:-6,elev:-1,pro:-2,scapRot:10,armR:{ikS:[21,230,1],poleRel:[.3,-1,1]}}}},
    {id:'encolher',view:'posterior',keys:{mid:{elev:4,pro:1,neck:-15},top:{P:[0,165,1.5],elev:7,pro:2,scapRot:20,neck:-30}}}
  ]
};
export default ex;
