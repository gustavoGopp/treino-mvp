// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { C3, L3, TX } from '../desenho';
import { BALL } from '../exercicios/compartilhado';
import { norm, sub } from '../math';

const ex = {
  id:'flexao-bola',
  views:['lateral'],noCable:true,
  base:{neck:-88,armR:{ua:[25,-10],fa:[25,-4]}},
  keys:{
    ext:{P:[0,28.8,-32.6],lumbar:-111.6,thor:-111.6,legR:{ikS:[9,60.3,46.9],poleRel:[0,1,0],ft:[180,68],heelV:[0,-4.1,5.9]}},
    mid:{P:[0,42.8,-40.9],lumbar:-130,thor:-130,legR:{ikS:[9,62,27],poleRel:[0,1,0],ft:[0,95],heelV:[0,-6,2]}},
    curl:{P:[0,51.8,-50.7],lumbar:-145,thor:-145,legR:{ikS:[9,59.4,6.9],poleRel:[0,1,0],ft:[0,-5],heelV:[0,-3.5,-6]}}
  },
  seq:[
    {path:['ext'],dur:.5,kind:'hold',label:'Pernas estendidas',tempo:'quadril alto',breath:'INSPIRA'},
    {path:['ext','mid','curl'],dur:1.2,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['curl'],dur:.6,kind:'hold',label:'Joelhos a ~90°',tempo:'segura',breath:'FIRME'},
    {path:['curl','mid','ext'],dur:2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['ext','curl'],
  paths:{lateral:[['heel','R','calcanhar'],['P','','quadril']]},
  equip(sk){
    const sd=sk.side.R,fd=norm(sub(sd.toe,sd.A));const u=Math.max(0,Math.min(1,(.9-fd[1])/.95));
    C3([0,BALL,sd.heel[2]+8.6*u],BALL,'ball',{bias:0});
  },
  guides:{
    lateral(sk){L3(sk.N,sk.side.R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,80,-70],'quadril alto o tempo todo',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['hams','R']],s:[['glutes','R'],['calf','R']]},
  errors:[
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,35.5,-36.3],lumbar:-120,thor:-120},curl:{P:[0,39.3,-38.2],lumbar:-125,thor:-125}}},
    {id:'volta',view:'lateral',keys:{ext:{P:[0,13,-29.5],lumbar:-93,thor:-93,legR:{ikS:[9,58,42],poleRel:[0,1,0],ft:[180,62],heelV:[0,-4.5,5.5]}}}},
    {id:'curta',view:'lateral',keys:{curl:{P:[0,42.8,-40.9],lumbar:-130,thor:-130,legR:{ikS:[9,62,27],poleRel:[0,1,0],ft:[0,95],heelV:[0,-6,2]}}}}
  ]
};
export default ex;
