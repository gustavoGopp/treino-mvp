// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { ARROW3, BOX, C3, TX, cable, liftOf, tower } from '../desenho';
import { scapPts } from '../esqueleto';
import { X, Y, Z, add, comb, mul } from '../math';

const ex = {
  id:'puxada-unilateral',
  views:['posterior','lateral'],
  base:{P:[0,49,-2],lumbar:-4,thor:-6,neck:-4,legR:{ikS:[10,8,-42],poleRel:[0,-.4,1],ft:[180,-12],heelV:[0,5,1]},armL:{ikS:[12,40,6],poleRel:[.3,-1,-.2]}},
  keys:{
    stretch:{elevR:5,proR:2,rotR:30,armR:{ikS:[12,158,22],poleRel:[1,-.2,.2]}},
    mid:{elevR:1,proR:0,rotR:15,armR:{ikS:[18,128,16],poleRel:[.7,-.8,-.2]}},
    end:{elevR:-3,proR:-4,rotR:0,armR:{ikS:[22,92,4],poleRel:[.4,-1,-.5]}}
  },
  seq:[
    {path:['stretch'],dur:.5,kind:'hold',label:'Alongado',tempo:'ombro sobe',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.5,kind:'hold',label:'Fim',tempo:'segura',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{posterior:[['E','R','cotovelo'],['S','R','']],lateral:[['G','R','mão'],['E','R','cotovelo']]},
  tower:{x:0,z:60,ac:X,out:[0,0,-1],py:210},
  equip(sk){BOX([0,1.5,-15],[[X,25],[Y,1.5],[Z,35]],'eqp',{bias:-6});const t=this.tower;const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);C3(sk.side.R.G,2.6,'eqd',{bias:.3});const L=cable(this,'a',sk.side.R.G,pul);tower(t,liftOf(this,'a',L));},
  guides:{
    posterior(sk){const R=sk.side.R,sc=scapPts(sk,'R');const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,[0,6,-3]),add(c,[0,-5,-3]),'gd',1.1,'gda',{layer:3});TX([34,150,0],'ombro desce,',{cls:'lbl-g',anchor:'end'});TX([34,150,0],'cotovelo ao quadril',{cls:'lbl-g',anchor:'end',dy:15});},
    lateral(sk){TX(add(sk.P,[0,96,-14]),'tronco quase parado',{cls:'lbl-g',anchor:'end'});}
  },
  muscles:{p:[['lats','R']],s:[['biceps','R'],['deltPost','R']]},
  errors:[
    {id:'tronco',view:'lateral',keys:{mid:{lumbar:-14,thor:-18},end:{lumbar:-24,thor:-32,neck:-20}}},
    {id:'encolher',view:'posterior',keys:{mid:{elevR:5},end:{elevR:6,rotR:20}}},
    {id:'curta',view:'lateral',keys:{stretch:{elevR:1,rotR:12,armR:{ikS:[17,132,18],poleRel:[.8,-.6,-.2]}}}}
  ]
};
export default ex;
