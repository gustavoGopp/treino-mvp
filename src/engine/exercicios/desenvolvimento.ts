// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, TX, dumbbell } from '../desenho';
import { SH } from '../exercicios/compartilhado';
import { X, Y, Z, add, comb } from '../math';

const ex = {
  id:'desenvolvimento',
  views:['frontal','lateral'],
  base:{P:[0,53,0],lumbar:-10,thor:-12,neck:-6,pro:-1,legR:{ikS:[18,7,42],poleRel:[.3,.5,1],ft:[12,-20]}},
  keys:{bottom:{armR:{ua:[70,-15],fa:[-90,90]}},mid:{armR:{ua:[74,30],fa:[-90,87]}},top:{armR:{ua:[80,82],fa:[-90,84]}}},
  seq:[
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo',tempo:'altura das orelhas',breath:'INSPIRA'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'},
    {path:['top'],dur:.4,kind:'hold',label:'Topo',tempo:'',breath:'FIRME'},
    {path:['top','mid','bottom'],dur:2.4,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['bottom','top'],
  paths:{frontal:[['G','R','halter'],['G','L',''],['E','R','cotovelo']],lateral:[['G','R','halter'],['E','R','cotovelo']]},
  equip(sk){
    BOX([0,45,8],[[X,13],[Y,2.5],[Z,17]],'eqp',{bias:-4});
    BOX(comb(1,[0,53,0],34,SH.u,-10.5,SH.f),[[X,13],[SH.u,34],[SH.f,2.5]],'eqp',{bias:-4});
    BOX([0,2.5,0],[[X,4],[Y,2],[Z,30]],'eqd',{bias:-6});BOX([0,22,4],[[X,2.5],[Y,20],[Z,2.5]],'eqd',{bias:-6});
    const c='db'+(this._pal==='e'?'-e':'');for(const k of['R','L'])dumbbell(sk.side[k].G,X,c);
  },
  guides:{
    frontal(sk){for(const k of['R','L']){const sd=sk.side[k];L3(sd.E,add(sd.E,[0,40,0]),'gd',1,{layer:3,dash:'3 2.5'});}const y=sk.Hc[1];L3([-72,y,0],[72,y,0],'gd',.8,{layer:2,dash:'2 3'});TX([72,y,0],'altura da orelha',{cls:'lbl-g',anchor:'end',dy:-6});},
    lateral(sk){TX(comb(1,[0,53,0],72,SH.u,-14,SH.f),'encosto a 75–80°',{cls:'lbl-g',anchor:'end',dx:-4});}
  },
  muscles:{p:[['deltAnt','RL'],['deltLat','RL']],s:[['triceps','RL'],['upTrap','RL']]},
  errors:[
    {id:'arco',view:'lateral',keys:{mid:{lumbar:-20,thor:-24},top:{lumbar:-28,thor:-32,neck:-20}}},
    {id:'cotovelo',view:'frontal',keys:{bottom:{armR:{ua:[100,-12],fa:[-90,90]}},mid:{armR:{ua:[96,30],fa:[-90,87]}}}},
    {id:'curta',view:'frontal',keys:{bottom:{armR:{ua:[74,28],fa:[-90,87]}}}}
  ]
};
export default ex;
