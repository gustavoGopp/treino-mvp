// @ts-nocheck
// Animação nova (aprovada). Flexão de joelho na suspensão: deitado de costas, calcanhares nas alças (a um palmo e
// meio do chão), quadril fora do chão em ponte; puxa os calcanhares em direção ao glúteo, subindo o quadril, e volta
// sem o quadril encostar no chão. Parte da flexão de joelho deslizante aprovada (mesmo corpo e mesmo caminho), com os
// pés mais altos (nas alças) e a fita no lugar da toalha. Técnica e fontes: docs/pesquisa/animacoes/flexao-joelho-suspensao.md.
import { BOX, L3, TX, suspensao } from '../desenho';
import { X, Y, Z } from '../math';

const ANC = [0, 205, 40]; // âncora no alto, sobre os pés
const ex = {
  id:'flexao-joelho-suspensao',
  views:['lateral'],
  bounds:{lateral:[-80,100,-98,12]},
  base:{neck:-88,armR:{ua:[25,-12],fa:[25,0]}},
  keys:{
    ext:{P:[0,22,-31],lumbar:-102.5,thor:-102.5,legR:{ikS:[9,30,52],poleRel:[0,1,0],ft:[180,72],heelV:[0,-5,1]}},
    mid:{P:[0,30,-33],lumbar:-110,thor:-110,legR:{ikS:[9,30,36],poleRel:[0,1,0],ft:[0,50],heelV:[0,-5,.5]}},
    curl:{P:[0,40,-36],lumbar:-123,thor:-123,legR:{ikS:[9,30,17],poleRel:[0,1,0],ft:[0,20],heelV:[0,-5,-1]}}
  },
  seq:[
    {path:['ext'],dur:.5,kind:'hold',label:'Pernas estendidas',tempo:'quadril fora do chão',breath:'INSPIRA'},
    {path:['ext','mid','curl'],dur:1.2,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['curl'],dur:.6,kind:'hold',label:'Joelhos dobrados',tempo:'quadril alto',breath:'FIRME'},
    {path:['curl','mid','ext'],dur:2.5,kind:'ecc',label:'Volta · excêntrica',tempo:'~2 s',breath:'INSPIRA'}
  ],
  ext:['ext','curl'],
  paths:{lateral:[['heel','R','calcanhar'],['P','','quadril']]},
  equip(sk){
    BOX([0,.6,-52],[[X,30],[Y,.6],[Z,44]],'eqp',{bias:-4}); // colchonete sob os ombros e a cabeça
    suspensao(this,'f',ANC,[sk.side.R.heel,sk.side.L.heel],'db'+(this._pal==='e'?'-e':''),{pe:true,tira:150});
  },
  guides:{
    lateral(sk){L3(sk.N,sk.side.R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,72,-20],'quadril fora do chão o tempo todo',{cls:'lbl-g',anchor:'middle'});TX([0,-7,30],'calcanhares nas alças',{cls:'lbl-g',anchor:'middle'});}
  },
  muscles:{p:[['hams','R']],s:[['glutes','R']]},
  errors:[
    {id:'quadril',view:'lateral',keys:{ext:{P:[0,13,-29],lumbar:-93,thor:-93},mid:{P:[0,17,-30],lumbar:-99,thor:-99},curl:{P:[0,24,-32],lumbar:-104,thor:-104}}},
    {id:'lombar',view:'lateral',keys:{curl:{P:[0,44,-36.5],lumbar:-103,thor:-146}}},
    {id:'curta',view:'lateral',keys:{curl:{P:[0,30,-33],lumbar:-110,thor:-110,legR:{ikS:[9,30,36],poleRel:[0,1,0],ft:[0,50],heelV:[0,-5,.5]}}}}
  ]
};
export default ex;
