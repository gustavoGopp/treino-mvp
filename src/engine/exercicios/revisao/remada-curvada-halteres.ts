// @ts-nocheck
// Animação nova (em revisão). Remada curvada com halteres, sem banco: em pé, pés paralelos na largura do quadril,
// joelhos levemente dobrados, quadril para trás e tronco bem inclinado (~60°) com as costas retas; os dois halteres
// pendurados, pegada neutra; leva os dois cotovelos para trás, perto do corpo, até os halteres chegarem perto do quadril.
// Técnica e fontes: docs/pesquisa/animacoes/remada-curvada-halteres.md.
// Base: a remada unilateral sem banco aprovada (remada-unilateral-sem-banco): o mesmo tronco e o mesmo caminho do braço
// que puxa, agora nos dois braços. As pernas ficam paralelas, com o tornozelo 36 cm à frente do quadril, como no stiff
// aprovado (o joelho fica levemente dobrado). Sem peça nova: os halteres são os da remada sem banco.
import { TX, dumbbell3 } from '../../desenho';
import { Z } from '../../math';

const BRACO = (x, y, z, pole) => ({ ikS: [x, y, z], poleRel: pole });
const ex = {
  id:'remada-curvada-halteres',
  views:['lateral','posterior'],
  base:{P:[0,84,-12],lumbar:62,thor:64,neck:48,legR:{ikS:[11,7,24],poleRel:[0,.2,1],ft:[6,-18]}},
  keys:{
    stretch:{pro:6,elev:1,armR:BRACO(18,40.5,33,[.3,0,-1])},
    mid:{pro:0,elev:0,armR:BRACO(20,66,20,[.25,1,-.5])},
    end:{pro:-6,elev:-1,armR:BRACO(20,84,-2,[.2,1,-.6])}
  },
  seq:[
    {path:['stretch'],dur:.45,kind:'hold',label:'Braços estendidos',tempo:'pausa curta',breath:'INSPIRA'},
    {path:['stretch','mid','end'],dur:1.1,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['end'],dur:.6,kind:'hold',label:'Fim · segura',tempo:'pausa curta',breath:'FIRME'},
    {path:['end','mid','stretch'],dur:2.1,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['stretch','end'],
  paths:{lateral:[['G','R','halter'],['E','R','cotovelo']],posterior:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){const c='db'+(this._pal==='e'?'-e':'');for(const k of['R','L'])dumbbell3(sk.side[k].G,Z,c,{layer:1.4});},
  guides:{
    lateral(sk){TX([0,142,4],'costas retas, tronco parado',{cls:'lbl-g',anchor:'middle'});TX([0,142,4],'cotovelos vão ao quadril',{cls:'lbl-g',anchor:'middle',dy:14});},
    posterior(sk){TX([0,146,0],'ombros longe das orelhas',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['lats','RL'],['midTrap','RL']],s:[['deltPost','RL'],['biceps','RL']]},
  errors:[
    // arredondar as costas (o "arred" da remada sem banco)
    {id:'e1',view:'lateral',keys:{stretch:{lumbar:40,thor:86,neck:84},mid:{lumbar:42,thor:82,neck:80},end:{lumbar:44,thor:80,neck:78}}},
    // subir o tronco: o tronco levanta na puxada para dar embalo (de ~60° para ~35°), e os halteres sobem junto
    {id:'e2',view:'lateral',keys:{mid:{lumbar:48,thor:50,neck:40,armR:BRACO(20,74,14,[.25,1,-.5])},end:{lumbar:35,thor:37,neck:30,armR:BRACO(20,92,-6,[.2,1,-.6])}}},
    // encolher os ombros: os ombros sobem para as orelhas na puxada (vista de trás)
    {id:'e3',view:'posterior',keys:{mid:{elev:5},end:{elev:8}}},
    // puxar só com os braços: o cotovelo fica embaixo do ombro e só dobra (vira uma rosca); o halter não chega ao quadril
    {id:'e4',view:'lateral',keys:{mid:{armR:BRACO(20,66,30,[.2,-1,.3])},end:{pro:0,elev:0,armR:BRACO(20,80,26,[.2,-1,.3])}}}
  ]
};
export default ex;
