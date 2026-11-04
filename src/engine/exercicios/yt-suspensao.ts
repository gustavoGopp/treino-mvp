// @ts-nocheck
// Animação nova (aprovada). T na suspensão (o Y entra só no último degrau da escada, no texto): de frente para a
// âncora, palmas para baixo, corpo reto e inclinado para trás; abre os braços quase retos até as mãos chegarem à linha
// dos ombros, juntando as escápulas. Parte da remada na suspensão em revisão (mesmo corpo), com a fita mais longa
// (~100 cm): com os braços retos o corpo sobe muito, de ~60° a ~12° da vertical, como nos vídeos de referência.
// Técnica e fontes: docs/pesquisa/animacoes/yt-suspensao.md.
import { ARROW3, L3, TX, suspensao } from '../desenho';
import { scapPts } from '../esqueleto';
import { add, comb, mul } from '../math';

const ANC = [0, 205, 0];
const ex = {
  id:'yt-suspensao',
  views:['posterior','lateral'],
  base:{legR:{ikS:[11,7,12],poleRel:[0,1,.2],ft:[8,-18]}},
  keys:{
    front:{P:[0,49,-60.7],lumbar:-60,thor:-60,neck:-50,pro:5,elev:0,armR:{ikS:[16,119.2,-67.5],poleRel:[0,1,.3]}},
    mid:{P:[0,71.3,-42],lumbar:-40,thor:-40,neck:-30,pro:0,elev:-1,armR:{ikS:[55,124.5,-36],poleRel:[0,1,.3]}},
    t:{P:[0,87.7,-11.2],lumbar:-16,thor:-16,neck:-8,pro:-6,elev:-1,armR:{ikS:[68.7,136.5,-4.2],poleRel:[0,1,.5]}}
  },
  seq:[
    {path:['front'],dur:.45,kind:'hold',label:'Braços à frente',tempo:'corpo reto',breath:'INSPIRA'},
    {path:['front','mid','t'],dur:1.1,kind:'conc',label:'Abertura em T · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['t'],dur:1,kind:'hold',label:'T · segura',tempo:'1 s',breath:'FIRME'},
    {path:['t','mid','front'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['front','t'],
  paths:{posterior:[['G','R','mãos'],['G','L','']],lateral:[['G','R','mãos'],['P','','quadril']]},
  equip(sk){suspensao(this,'f',ANC,[sk.side.R.G,sk.side.L.G],'db'+(this._pal==='e'?'-e':''),{tira:34});},
  guides:{
    posterior(sk){for(const k of['R','L']){const sd=sk.side[k],sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,mul(sk.xT,sd.s*6)),add(c,mul(sk.xT,-sd.s*3)),'gd',1.1,'gda',{layer:3});}
      TX(comb(1,sk.N,34,sk.uT),'escápulas se juntam no T',{cls:'lbl-g',anchor:'middle'});TX([0,-8,-10],'braços quase retos, ombros longe das orelhas',{cls:'lbl-g',anchor:'middle'});},
    lateral(sk){L3(sk.side.R.heel,sk.Hc,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,-8,sk.P[2]-10],'corpo reto, do calcanhar à cabeça',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['deltPost','RL']],s:[]},
  errors:[
    // dobrar os cotovelos: as mãos vêm ao peito com os cotovelos dobrados, e vira uma remada
    {id:'cotovelo',view:'posterior',keys:{mid:{P:[0,69.4,-44.2],lumbar:-42,thor:-42,neck:-32,armR:{ikS:[34,108,-42],poleRel:[.7,-.6,-.4]}},t:{P:[0,73.2,-39.7],lumbar:-38,thor:-38,neck:-28,armR:{ikS:[36,113,-38],poleRel:[.7,-.6,-.4]}}}},
    {id:'encolher',view:'posterior',keys:{mid:{elev:4},t:{elev:7,neck:4}}},
    // quadril cai: o corpo dobra no quadril (quadril mais baixo e para trás, tronco mais deitado)
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,62,-48],lumbar:-54,thor:-56,neck:-44,armR:{ikS:[50,116,-44],poleRel:[0,1,.3]}},t:{P:[0,80,-24],lumbar:-32,thor:-34,neck:-24,armR:{ikS:[66,128,-16],poleRel:[0,1,.5]}}}}
  ]
};
export default ex;
