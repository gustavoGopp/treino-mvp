// @ts-nocheck
// Animação nova (em revisão). Tríceps na suspensão, mãos à testa: de costas para a âncora, corpo reto como numa
// prancha inclinada à frente, braços estendidos à frente na altura dos ombros; dobra os cotovelos e leva as mãos
// em direção à testa enquanto o corpo vai à frente; os cotovelos apontam para a frente e ficam parados; estende de
// volta. A fita passa por cima da cabeça. Parte da rosca na suspensão em revisão (mesmo corpo, espelhado para a frente)
// e do tríceps na corda aprovado (cotovelo parado). Técnica e fontes: docs/pesquisa/animacoes/triceps-suspensao.md.
import { L3, TX, suspensao } from '../../desenho';

const ANC = [0, 205, 0];
const ex = {
  id:'triceps-suspensao',
  views:['lateral'],
  base:{legR:{ikS:[11,7,-30],poleRel:[0,1,.2],ft:[8,-18]}},
  keys:{
    up:{P:[0,83.1,5.5],lumbar:25,thor:25,neck:15,armR:{ikS:[16,148,83],poleRel:[.2,1,0]}},
    mid:{P:[0,79.7,12],lumbar:30,thor:30,neck:20,armR:{ikS:[15,142,80],poleRel:[-.05,1,.3]}},
    down:{P:[0,75,19.4],lumbar:36,thor:36,neck:26,armR:{ikS:[13,130.8,72],poleRel:[-.05,1,.6]}}
  },
  seq:[
    {path:['up'],dur:.45,kind:'hold',label:'Braços estendidos',tempo:'corpo reto, inclinado à frente',breath:'INSPIRA'},
    {path:['up','mid','down'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['down'],dur:.5,kind:'hold',label:'Mãos perto da testa',tempo:'cotovelos parados',breath:'FIRME'},
    {path:['down','mid','up'],dur:1.1,kind:'conc',label:'Extensão · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['up','down'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']]},
  equip(sk){suspensao(this,'f',ANC,[sk.side.R.G,sk.side.L.G],'db'+(this._pal==='e'?'-e':''),{tira:40});},
  guides:{
    lateral(sk){L3(sk.side.R.heel,sk.Hc,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,-8,sk.P[2]+10],'corpo reto, como numa prancha',{cls:'lbl-g',anchor:'middle'});
      TX([0,sk.side.R.E[1]-18,sk.side.R.E[2]+6],'cotovelos parados, apontando à frente',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['triceps','RL']],s:[]},
  errors:[
    // quadril cai: a barriga desce e a lombar arqueia (quadril mais baixo, lombar à frente, tórax menos)
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,72,16],lumbar:42,thor:26,neck:16,armR:{ikS:[15,140,78],poleRel:[-.05,1,.3]}},down:{P:[0,67,24],lumbar:48,thor:30,neck:20,armR:{ikS:[13,129,70],poleRel:[-.05,1,.6]}}}},
    // cotovelos abrem e descem: vira uma flexão de braço (cotovelo para fora e para baixo, mãos no peito)
    {id:'cotovelo',view:'lateral',keys:{mid:{armR:{ikS:[22,124,62],poleRel:[1,-.3,-.2]}},down:{P:[0,74,21],armR:{ikS:[24,112,58],poleRel:[1,-.4,-.2]}}}},
    {id:'curta',view:'lateral',keys:{down:{P:[0,79.7,12],lumbar:30,thor:30,neck:20,armR:{ikS:[15,142,80],poleRel:[-.05,1,.3]}}}}
  ]
};
export default ex;
