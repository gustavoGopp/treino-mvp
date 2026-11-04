// @ts-nocheck
// Animação nova (em revisão). Stiff com um kettlebell nas duas mãos (pela alça), joelhos levemente dobrados e fixos; o quadril vai para trás e o kettlebell desce perto das pernas. Parte do stiff aprovado (mesmo corpo e mesmo quadril); as mãos se juntam na alça. Técnica e fontes: docs/pesquisa/animacoes/stiff-kettlebell.md.
import { ARROW3, L3, TX, kettlebell } from '../../desenho';
import { Z, add, comb, mul, sub } from '../../math';

const ex = {
  id:'stiff-kettlebell',
  views:['lateral'],
  base:{legR:{ikS:[11,7,0],poleRel:[0,.2,1],ft:[6,-18]}},
  keys:{
    top:{P:[0,92,0],lumbar:0,thor:0,neck:2,armR:{sph:[-80,-77,62.5],poleRel:[1,0,-.3]}},
    mid:{P:[0,90.5,-15],lumbar:35,thor:35,neck:40,armR:{sph:[-110,-77,62.5],poleRel:[1,0,-.3]}},
    bottom:{P:[0,86.5,-30],lumbar:68,thor:70,neck:74,armR:{sph:[-118,-74,62.5],poleRel:[1,0,-.3]}}
  },
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em pé',tempo:'respire e firme o abdômen',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · alongado',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['G','R','halter'],['P','','quadril']]},
  equip(sk){const R=sk.side.R.G,L=sk.side.L.G;kettlebell([(R[0]+L[0])/2,(R[1]+L[1])/2,(R[2]+L[2])/2],[0,-1,0],[1,0,0],'db'+(this._pal==='e'?'-e':''),{layer:1.4});},
  guides:{
    lateral(sk){const a=comb(1,sk.P,-10,sk.fL),b=comb(1,sk.N,-9,sk.fT);L3(add(a,mul(sub(a,b),.1)),add(b,mul(sub(b,a),.3)),'gd',1,{layer:3,dash:'3 2.5'});TX(add(b,mul(sub(b,a),.32)),'coluna neutra',{cls:'lbl-g',anchor:'end',dx:-4,dy:-4});
      ARROW3(comb(1,sk.P,-12,Z),comb(1,sk.P,-28,Z),'gd',1.1,'gda',{layer:3});TX(comb(1,sk.P,-30,Z),'quadril para trás',{cls:'lbl-g',anchor:'end',dy:4});}
  },
  muscles:{p:[['hams','RL']],s:[['glutes','RL'],['erect','R']]},
  errors:[
    {id:'arred',view:'lateral',keys:{mid:{lumbar:30,thor:48,neck:55},bottom:{P:[0,88,-18],lumbar:58,thor:96,neck:110}}},
    {id:'agachar',view:'lateral',keys:{mid:{P:[0,77,-10],lumbar:24,thor:24,neck:28},bottom:{P:[0,62,-16],lumbar:42,thor:42,neck:46}}},
    {id:'longe',view:'lateral',keys:{mid:{armR:{sph:[-30,-66,62.5],poleRel:[1,0,-.3]}},bottom:{armR:{sph:[0,-62,62.5],poleRel:[1,0,-.3]}}}}
  ]
};
export default ex;
