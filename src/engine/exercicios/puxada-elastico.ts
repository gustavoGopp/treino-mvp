// @ts-nocheck
// Animação nova (aprovada). Puxada com elástico ancorado no alto: o elástico preso acima da cabeça (topo da porta,
// barra ou viga: aqui um poste alto, escolha de desenho do R4), uma ponta em cada mão; ajoelhado de frente para o
// ponto, a um passo; os ombros descem e os cotovelos vão para baixo, em direção ao quadril. Parte da puxada
// unilateral ajoelhada aprovada (mesmo corpo ajoelhado, mesmo caminho do braço), com os dois braços e as duas
// faixas, que afinam quando esticam (a tensão sobe no fim da puxada).
// Técnica e fontes: docs/pesquisa/animacoes/puxada-elastico.md.
import { ARROW3, BOX, TX, band, bandHandle, poste } from '../desenho';
import { scapPts } from '../esqueleto';
import { X, Y, Z, add, comb, mul } from '../math';

const ex = {
  id:'puxada-elastico',
  views:['posterior','lateral'],
  base:{P:[0,49,-2],lumbar:-4,thor:-6,neck:-4,legR:{ikS:[10,8,-42],poleRel:[0,-.4,1],ft:[180,-12],heelV:[0,5,1]}},
  keys:{
    stretch:{elev:5,pro:2,scapRot:30,armR:{ikS:[14,158,24],poleRel:[1,-.2,.2]}},
    mid:{elev:1,pro:0,scapRot:15,armR:{ikS:[20,128,16],poleRel:[.7,-.8,-.2]}},
    end:{elev:-3,pro:-4,scapRot:0,armR:{ikS:[23,92,4],poleRel:[.4,-1,-.5]}}
  },
  seq:[
    {path:['stretch'],dur:.5,kind:'hold',label:'Alongado',tempo:'ombros sobem',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.5,kind:'hold',label:'Fim',tempo:'elástico mais esticado',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{posterior:[['E','R','cotovelo'],['E','L',''],['S','R','']],lateral:[['G','R','mãos'],['E','R','cotovelo']]},
  ancora:[0,205,62],
  equip(sk){
    BOX([0,1.5,-15],[[X,25],[Y,1.5],[Z,35]],'eqp',{bias:-6});
    const a=poste(this.ancora[0],this.ancora[2],this.ancora[1],{h:225});
    for(const k of['R','L']){band(this,k,a,sk.side[k].G,{bias:-1});bandHandle(sk.side[k].G,X);}
  },
  guides:{
    posterior(sk){for(const k of['R','L']){const sc=scapPts(sk,k);const c=mul(add(add(sc[0],sc[1]),sc[2]),1/3);ARROW3(add(c,[0,6,-3]),add(c,[0,-5,-3]),'gd',1.1,'gda',{layer:3});}TX([40,150,0],'ombros descem,',{cls:'lbl-g',anchor:'end'});TX([40,150,0],'cotovelos ao quadril',{cls:'lbl-g',anchor:'end',dy:15});},
    lateral(sk){TX(add(sk.P,[0,96,-14]),'tronco quase parado',{cls:'lbl-g',anchor:'end'});TX(add(this.ancora,[0,8,0]),'preso no alto',{cls:'lbl-g',anchor:'end',dx:-6});}
  },
  muscles:{p:[['lats','RL']],s:[['biceps','RL'],['deltPost','RL']]},
  errors:[
    {id:'tronco',view:'lateral',keys:{mid:{lumbar:-14,thor:-18},end:{lumbar:-24,thor:-32,neck:-20}}},
    {id:'encolher',view:'posterior',keys:{mid:{elev:5},end:{elev:6,scapRot:20}}},
    {id:'curta',view:'lateral',keys:{stretch:{elev:1,scapRot:12,armR:{ikS:[18,132,18],poleRel:[.8,-.6,-.2]}}}}
  ]
};
export default ex;
