// @ts-nocheck
// Animação nova (em revisão). Stiff unilateral (em uma perna): apoio na perna esquerda, halter na mão esquerda,
// a perna direita sobe para trás alinhada com o tronco. Quadril nivelado, coluna neutra.
// Técnica e fontes: docs/pesquisa/animacoes/stiff-unilateral.md.
import { ARROW3, TX, dumbbell } from '../../desenho';
import { X, comb } from '../../math';

const ex = {
  id:'stiff-unilateral',
  views:['lateral','frontal'],
  base:{legL:{ikS:[10,7,0],poleRel:[0,.2,1],ft:[6,-18]}},
  keys:{
    top:{P:[0,92,0],lumbar:0,thor:0,neck:2,legR:{th:[180,-86],sh:[180,-86],ft:[0,-55]},armR:{sph:[-10,-86,62.5],poleRel:[1,0,-.3]},armL:{sph:[-10,-86,62.5],poleRel:[1,0,-.3]}},
    mid:{P:[0,90,-10],lumbar:38,thor:40,neck:44,legR:{th:[180,-48],sh:[180,-48],ft:[180,-70]},armR:{sph:[-20,-84,62.5],poleRel:[1,0,-.3]},armL:{sph:[-20,-86,62.5],poleRel:[1,0,-.3]}},
    bottom:{P:[0,87,-22],lumbar:74,thor:76,neck:80,legR:{th:[180,-12],sh:[180,-12],ft:[180,-80]},armR:{sph:[-30,-82,62.5],poleRel:[1,0,-.3]},armL:{sph:[-25,-86,62.5],poleRel:[1,0,-.3]}}
  },
  seq:[
    {path:['top'],dur:.5,kind:'hold',label:'Em pé',tempo:'apoio numa perna',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'FIRME'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · alongado',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.4,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['G','L','halter'],['P','','quadril']],frontal:[['P','','quadril']]},
  equip(sk){dumbbell(sk.side.L.G,X,'db'+(this._pal==='e'?'-e':''));},
  guides:{
    lateral(sk){ARROW3(comb(1,sk.P,-12,[0,0,1]),comb(1,sk.P,-28,[0,0,1]),'gd',1.1,'gda',{layer:3});TX(comb(1,sk.P,-30,[0,0,1]),'quadril para trás',{cls:'lbl-g',anchor:'end',dy:4});TX([0,150,-40],'perna e tronco numa linha',{cls:'lbl-g',anchor:'end'});},
    frontal(sk){TX([-34,104,0],'quadril nivelado',{cls:'lbl-g',anchor:'end'});}
  },
  muscles:{p:[['hams','L'],['glutes','L']],s:[['erect','R'],['glutes','R']]},
  errors:[
    {id:'abre',view:'frontal',keys:{mid:{roll:10},bottom:{roll:18,legR:{th:[150,-10],sh:[150,-10],ft:[180,-80]}}}},
    {id:'arred',view:'lateral',keys:{mid:{lumbar:30,thor:52,neck:60},bottom:{lumbar:54,thor:100,neck:110}}},
    {id:'agachar',view:'lateral',keys:{mid:{P:[0,80,-8],lumbar:28,thor:28,neck:32},bottom:{P:[0,70,-14],lumbar:46,thor:46,neck:50,legR:{th:[180,-40],sh:[180,-40],ft:[180,-80]}}}}
  ]
};
export default ex;
