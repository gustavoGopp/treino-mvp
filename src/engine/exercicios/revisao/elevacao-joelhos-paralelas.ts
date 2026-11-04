// @ts-nocheck
// Animação nova (em revisão). Elevação de joelhos nas paralelas: corpo sustentado nas barras com os braços retos,
// ombros longe das orelhas; sobe os joelhos e, no fim, enrola a pelve; desce sem balançar. Parte da elevação de
// joelhos na barra fixa aprovada (mesmo tronco, mesmas pernas e mesmo caminho), com as mãos nas paralelas, embaixo,
// em vez de na barra, em cima. Peça nova: paralelas (src/engine/desenho.ts).
// Técnica e fontes: docs/pesquisa/animacoes/elevacao-joelhos-paralelas.md.
import { L3, TX, paralelas } from '../../desenho';

const ex = {
  id:'elevacao-joelhos-paralelas',
  views:['lateral'],
  base:{neck:0,elev:-3,armR:{ikS:[25,105,0],poleRel:[1,-.25,.2]}},
  keys:{
    hang:{P:[0,116,1],lumbar:0,thor:0,legR:{th:[0,-84],sh:[180,-84],ft:[0,-55]}},
    mid:{P:[0,117,5.5],lumbar:-10,thor:-2,legR:{th:[0,-40],sh:[0,-88],ft:[0,-45]}},
    top:{P:[0,118.2,11.3],lumbar:-25,thor:-4,legR:{th:[0,8],sh:[0,-85],ft:[0,-40]}}
  },
  seq:[
    {path:['hang'],dur:.4,kind:'hold',label:'Pendurado',tempo:'braços retos, corpo parado',breath:'INSPIRA'},
    {path:['hang','mid','top'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['top'],dur:.5,kind:'hold',label:'Topo · pelve enrolada',tempo:'',breath:'EXPIRA'},
    {path:['top','mid','hang'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['hang','top'],
  paths:{lateral:[['K','R','joelho'],['P','','']]},
  equip(sk){paralelas(105,25);},
  guides:{lateral(sk){L3([0,105,0],[0,20,0],'gd',.9,{layer:2,dash:'2 3'});TX(sk.P,'enrola a pelve',{cls:'lbl-g',anchor:'end',dx:-14,dy:-8});TX([0,180,0],'ombros longe das orelhas',{cls:'lbl-g',anchor:'middle'});}},
  muscles:{p:[['rectus','R']],s:[['obliq','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{hang:{P:[0,121,7],lumbar:-10,thor:-14,legR:{th:[180,-80],sh:[180,-75],ft:[0,-60]}},mid:{P:[0,119,8]},top:{P:[0,120,14],thor:6}}},
    {id:'pelve',view:'lateral',keys:{mid:{P:[0,116,1],lumbar:0,thor:0},top:{P:[0,116,1],lumbar:0,thor:0}}},
    // afundar nos ombros: os ombros sobem até as orelhas e o corpo desce entre as barras
    {id:'ombros',view:'lateral',keys:{hang:{P:[0,108,1],elev:8,pro:5,neck:10},mid:{P:[0,109,5.5],elev:8,pro:5,neck:10},top:{P:[0,110,11],elev:8,pro:5,neck:10}}}
  ]
};
export default ex;
