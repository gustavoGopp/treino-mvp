// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { BOX, L3, PL3, TX, dumbbell } from '../desenho';
import { benchInc } from '../exercicios/compartilhado';
import { X, Y, Z, add, comb, cs, mul, norm, sn, sub } from '../math';

const ex = {
  id:'supino-inclinado',
  views:['lateral','top'],
  base:{P:[0,53,0],lumbar:-60,thor:-60,neck:-55,pro:-2,elev:-1,legR:{ikS:[15,7,40],poleRel:[.25,.5,1],ft:[10,-22]}},
  keys:{top:{armR:{ua:[90,84],fa:[-90,86]}},mid:{armR:{ua:[74,22],fa:[-90,84]}},bottom:{armR:{ua:[60,-30],fa:[-90,90]}}},
  seq:[
    {path:['top'],dur:.6,kind:'hold',label:'Topo',tempo:'respire',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2.5,kind:'ecc',label:'Descida · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.45,kind:'hold',label:'Embaixo · sem quicar',tempo:'pausa curta',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1.3,kind:'conc',label:'Subida · concêntrica',tempo:'~1–1,5 s',breath:'EXPIRA'}
  ],
  ext:['bottom','top'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],top:[['G','R','halter'],['G','L',''],['E','R','cotovelo']]},
  equip(sk){
    const P0=[0,53,0],bu=benchInc.u,bf=benchInc.f;
    BOX([0,46,13],[[X,13],[Y,2.6],[Z,17]],'eqp',{bias:-4});
    BOX(comb(1,P0,37,bu,-10.5,bf),[[X,13],[bu,37],[bf,2.6]],'eqp',{bias:-4});
    BOX([0,2.5,-12],[[X,4],[Y,2],[Z,48]],'eqd',{bias:-6});
    BOX([0,23,18],[[X,2.5],[Y,21],[Z,2.5]],'eqd',{bias:-6});
    BOX([0,23,-44],[[X,2.5],[Y,21],[Z,2.5]],'eqd',{bias:-6});
    L3(comb(1,P0,-12,bf,8,bu),[0,20,-44],'eql',3,{bias:-6});
    const hd=norm([1,0,-.3]);
    for(const k of['R','L']){const sd=sk.side[k];dumbbell(sd.G,hd,'db'+(this._pal==='e'?'-e':''));}
  },
  guides:{
    lateral(sk){const sd=sk.side.R;L3(sd.E,add(sd.E,[0,44,0]),'gd',1,{layer:3,dash:'3 2.5'});TX(add(sd.E,[0,16,0]),'antebraço na vertical',{cls:'lbl-g',dx:9});
      const h=[0,47,-3];const pts=[];for(let a=0;a<=30;a+=3)pts.push([0,47+20*sn(a),-3-20*cs(a)]);PL3(pts,'gd',1,{layer:3});L3(h,[0,47,-27],'gd',.8,{layer:3,dash:'2 2'});TX([0,51,-27],'~30°',{cls:'lbl-g',anchor:'end',dx:-2});},
    top(sk){const R=sk.side.R,Lf=sk.side.L;L3(R.S,add(R.S,mul(sk.uT,-30)),'gd',1,{layer:3,dash:'3 2.5'});L3(R.S,add(R.S,mul(sub(R.E,R.S),1.25)),'gd',1,{layer:3,dash:'3 2.5'});
      TX([-34,0,-4],'cotovelo ~30–70° do tronco',{cls:'lbl-g',size:10,anchor:'end',dx:8});TX([34,0,-4],'halter sobre o cotovelo',{cls:'lbl-g',size:10,dx:-8});}
  },
  muscles:{p:[['pecClav','RL']],s:[['pecStern','RL'],['deltAnt','RL'],['triceps','RL']]},
  errors:[
    {id:'cot',view:'top',keys:{bottom:{armR:{ua:[100,-17],fa:[-90,90]}},mid:{armR:{ua:[96,22],fa:[-90,84]}}}},
    {id:'punho',view:'lateral',base:{wrist:48,wristDir:[0,0,-1]}},
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,61,3],lumbar:-70,thor:-64},top:{P:[0,67,5],lumbar:-76,thor:-66}}}
  ]
};
export default ex;
