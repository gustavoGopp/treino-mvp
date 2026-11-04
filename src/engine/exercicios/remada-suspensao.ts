// @ts-nocheck
// Animação nova (aprovada). Remada na suspensão (fitas tipo TRX): de frente para a âncora, corpo reto e inclinado
// para trás, calcanhares no chão; puxa até as mãos chegarem ao lado do peito e volta até estender os braços.
// Parte da remada baixa aprovada (mesmo caminho dos braços e das escápulas), com o corpo girando sobre os calcanhares
// e a peça nova da fita (suspensao, em src/engine/desenho.ts). A fita tem comprimento fixo (84 cm da âncora à mão):
// o ângulo do corpo em cada fase sai dessa geometria (scripts de medida da sessão de catálogo, 11/2026).
// Técnica e fontes: docs/pesquisa/animacoes/remada-suspensao.md.
import { ARROW3, L3, TX, suspensao } from '../desenho';
import { scapPts } from '../esqueleto';
import { add, comb, mul } from '../math';

const ANC = [0, 205, 0]; // âncora no alto (trava de porta ou viga), acima dos pés
const ex = {
  id:'remada-suspensao',
  views:['lateral','posterior'],
  base:{legR:{ikS:[11,7,30],poleRel:[0,1,.2],ft:[8,-18]}},
  keys:{
    stretch:{P:[0,55.2,-38.8],lumbar:-55,thor:-55,neck:-45,pro:6,elev:0,armR:{ikS:[16,134.9,-44.8],poleRel:[.7,-1,0]}},
    mid:{P:[0,73.2,-21.7],lumbar:-38,thor:-38,neck:-28,pro:0,elev:-1,armR:{ikS:[16,122,-8.8],poleRel:[.5,-1,-.4]}},
    end:{P:[0,85.4,-0.1],lumbar:-21,thor:-21,neck:-14,pro:-6,elev:-1,armR:{ikS:[16,121.2,1.7],poleRel:[.35,-.45,-1]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Braços estendidos',tempo:'corpo reto',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:1,kind:'hold',label:'Mãos ao lado do peito',tempo:'1 s',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','mãos'],['P','','quadril']],posterior:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){suspensao(this,'f',ANC,[sk.side.R.G,sk.side.L.G],'db'+(this._pal==='e'?'-e':''),{tira:28});},
  guides:{
    lateral(sk){L3(sk.side.R.heel,sk.Hc,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,-8,sk.P[2]-10],'corpo reto, do calcanhar à cabeça',{cls:'lbl-g',anchor:'middle'});
      TX([0,214,0],'âncora firme no alto',{cls:'lbl-g',anchor:'middle'});},
    posterior(sk){for(const k of['R','L']){const sd=sk.side[k],sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,mul(sk.xT,sd.s*6)),add(c,mul(sk.xT,-sd.s*3)),'gd',1.1,'gda',{layer:3});}TX(comb(1,sk.N,34,sk.uT),'escápulas se juntam no fim',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['lats','RL'],['midTrap','RL']],s:[['deltPost','RL'],['biceps','RL']]},
  errors:[
    // quadril cai: o corpo dobra no quadril (pernas no lugar, tronco mais deitado, quadril mais baixo e para trás)
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,64,-30],lumbar:-52,thor:-54,neck:-40,armR:{ikS:[16,121,-13],poleRel:[.5,-1,-.4]}},end:{P:[0,74,-14],lumbar:-40,thor:-42,neck:-30,armR:{ikS:[16,119,-3],poleRel:[.35,-.45,-1]}}}},
    {id:'encolher',view:'posterior',keys:{mid:{elev:4},end:{elev:7,neck:-9}}},
    {id:'curta',view:'lateral',keys:{stretch:{P:[0,73.2,-21.7],lumbar:-38,thor:-38,neck:-28,pro:0,armR:{ikS:[16,122,-8.8],poleRel:[.5,-1,-.4]}}}}
  ]
};
export default ex;
