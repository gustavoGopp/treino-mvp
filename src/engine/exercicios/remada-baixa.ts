// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { ARROW3, BOX, L3, PL3, TX, cable, liftOf, tower } from '../desenho';
import { scapPts } from '../esqueleto';
import { X, Y, Z, add, comb, mid, mul, norm, sub } from '../math';

const ex = {
  id:'remada-baixa',
  views:['lateral','posterior'],
  base:{P:[0,53,0],legR:{ikS:[12,7,44],poleRel:[.2,.6,1],ft:[8,-15]}},
  keys:{
    stretch:{lumbar:12,thor:14,neck:10,pro:6,elev:0,armR:{ikS:[4,68,69],poleRel:[.7,-1,0]}},
    mid:{lumbar:2,thor:3,neck:0,pro:0,elev:-1,armR:{ikS:[4,68,40],poleRel:[.5,-1,-.4]}},
    end:{lumbar:-3,thor:-4,neck:-2,pro:-6,elev:-1,armR:{ikS:[4,67,15],poleRel:[.35,-.45,-1]}}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Alongado',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:1,kind:'hold',label:'Segura contraído',tempo:'1 s',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','mãos'],['E','R','cotovelo']],posterior:[['E','R','cotovelo'],['E','L','']]},
  tower:{x:0,z:118,ac:X,out:[0,0,-1],py:66},
  equip(sk){
    BOX([0,42,-15],[[X,13],[Y,3],[Z,45]],'eqp',{bias:-4});
    for(const z of[-50,20])BOX([0,20,z],[[X,2.5],[Y,19],[Z,2.5]],'eqd',{bias:-5});
    const hr=sk.side.R.G,hl=sk.side.L.G,m=mid(hr,hl);
    const t=this.tower;const pulPos=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);
    const apex=add(m,mul(norm(sub(pulPos,m)),9));
    PL3([hr,apex,hl,hr],'eql',2.2,{bias:.3});
    const L=cable(this,'a',apex,pulPos);tower(t,liftOf(this,'a',L));
  },
  guides:{
    lateral(sk){const t=this.tower;L3([0,t.py,t.z-2],[0,t.py,-5],'gd',.9,{layer:2,dash:'2 3'});TX([0,t.py,t.z-8],'cabo quase horizontal',{cls:'lbl-g',anchor:'end',dy:-8});
      L3(sk.P,add(sk.P,[0,92,0]),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(sk.P,[0,96,0]),'tronco perto da vertical',{cls:'lbl-g',anchor:'middle'});},
    posterior(sk){for(const k of['R','L']){const sd=sk.side[k],sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,mul(sk.xT,sd.s*6)),add(c,mul(sk.xT,-sd.s*3)),'gd',1.1,'gda',{layer:3});}TX(comb(1,sk.N,34,sk.uT),'escápulas se juntam no fim',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['midTrap','RL'],['lats','RL']],s:[['deltPost','RL'],['biceps','RL']]},
  errors:[
    {id:'balanco',view:'lateral',keys:{stretch:{lumbar:34,thor:37,neck:30,armR:{ikS:[4,62,80],poleRel:[.7,-1,0]}},mid:{lumbar:8,thor:8,neck:6},end:{lumbar:-18,thor:-20,neck:-14,armR:{ikS:[4,69,10],poleRel:[.35,-.45,-1]}}}},
    {id:'arred',view:'lateral',keys:{stretch:{lumbar:16,thor:44,neck:48,pro:9,armR:{ikS:[4,64,74],poleRel:[.7,-1,0]}},mid:{lumbar:8,thor:22,neck:22}}},
    {id:'encolher',view:'posterior',keys:{mid:{elev:4},end:{elev:7,neck:12}}}
  ]
};
export default ex;
