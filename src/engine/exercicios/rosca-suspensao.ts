// @ts-nocheck
// Animação nova (aprovada). Rosca na suspensão: de frente para a âncora, palmas para cima, corpo reto e inclinado
// para trás; dobra os cotovelos e traz as mãos para perto da testa, com os cotovelos altos e parados (apontando para a
// âncora). Parte da remada na suspensão em revisão (mesmo corpo, mesma fita de 85 cm): como a fita não estica, o
// corpo sobe enquanto as mãos vêm à testa. Técnica e fontes: docs/pesquisa/animacoes/rosca-suspensao.md.
import { L3, TX, suspensao } from '../desenho';

const ANC = [0, 205, 0];
const ex = {
  id:'rosca-suspensao',
  views:['lateral'],
  base:{legR:{ikS:[11,7,30],poleRel:[0,1,.2],ft:[8,-18]}},
  keys:{
    stretch:{P:[0,55.2,-38.8],lumbar:-55,thor:-55,neck:-45,armR:{ikS:[16,134.4,-45.1],poleRel:[-.05,1,.6]}},
    mid:{P:[0,64.3,-31.4],lumbar:-47,thor:-47,neck:-37,armR:{ikS:[14,125.5,-25.6],poleRel:[-.05,1,.6]}},
    end:{P:[0,73.2,-21.7],lumbar:-38,thor:-38,neck:-28,armR:{ikS:[14,139,-52],poleRel:[-.05,1,.6]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Braços estendidos',tempo:'corpo reto',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.6,kind:'hold',label:'Mãos perto da testa',tempo:'cotovelos altos',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']]},
  equip(sk){suspensao(this,'f',ANC,[sk.side.R.G,sk.side.L.G],'db'+(this._pal==='e'?'-e':''),{tira:28});},
  guides:{
    lateral(sk){L3(sk.side.R.heel,sk.Hc,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,-8,sk.P[2]-10],'corpo reto, do calcanhar à cabeça',{cls:'lbl-g',anchor:'middle'});
      TX(sk.side.R.E,'cotovelo alto e parado',{cls:'lbl-g',anchor:'start',dx:10,dy:4});}
  },
  muscles:{p:[['biceps','RL']],s:[['forearm','RL']]},
  errors:[
    // quadril cai: o corpo dobra no quadril (quadril mais baixo e para trás, tronco mais deitado), mãos no mesmo lugar
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,56,-38],lumbar:-60,thor:-62,neck:-48,armR:{ikS:[14,117,-36],poleRel:[-.05,1,.6]}},end:{P:[0,64,-30],lumbar:-52,thor:-54,neck:-40,armR:{ikS:[14,134,-55],poleRel:[-.05,1,.6]}}}},
    // cotovelos descem e as mãos vêm ao peito: vira uma remada (a pose final da remada na suspensão)
    {id:'cotovelo',view:'lateral',keys:{mid:{P:[0,73.2,-21.7],lumbar:-38,thor:-38,neck:-28,armR:{ikS:[16,122,-8.8],poleRel:[.5,-1,-.4]}},end:{P:[0,85.4,-0.1],lumbar:-21,thor:-21,neck:-14,armR:{ikS:[16,121.2,1.7],poleRel:[.35,-.45,-1]}}}},
    {id:'curta',view:'lateral',keys:{stretch:{P:[0,64.3,-31.4],lumbar:-47,thor:-47,neck:-37,armR:{ikS:[14,125.5,-25.6],poleRel:[-.05,1,.6]}}}}
  ]
};
export default ex;
