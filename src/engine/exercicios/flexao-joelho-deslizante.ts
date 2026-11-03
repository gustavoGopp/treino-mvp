// @ts-nocheck
// Animação nova (aprovada). Flexão de joelho deslizando os calcanhares (toalha ou meias em chão liso).
// Técnica e fontes: docs/pesquisa/animacoes/flexao-joelho-deslizante.md.
// Parte da flexão na bola aprovada (src/engine/exercicios/flexao-bola.ts), sem a bola: deitado de costas, ombros no
// chão, quadril elevado em ponte; os calcanhares, sobre uma toalha, deslizam para longe e voltam. A toalha é uma caixa
// fina (BOX) sob os calcanhares: o motor não tem uma peça de tecido.
import { BOX, L3, TX } from '../desenho';
import { X, Y, Z } from '../math';

const ex = {
  id:'flexao-joelho-deslizante',
  views:['lateral'],
  base:{neck:-88,armR:{ua:[25,-12],fa:[25,0]}},
  keys:{
    ext:{P:[0,18,-29.5],lumbar:-97.9,thor:-97.9,legR:{ikS:[9,5.5,54],poleRel:[0,1,0],ft:[180,70],heelV:[0,-5,1]}},
    mid:{P:[0,26,-32],lumbar:-106,thor:-106,legR:{ikS:[9,5.5,37],poleRel:[0,1,0],ft:[0,48],heelV:[0,-5,.5]}},
    curl:{P:[0,36,-35.6],lumbar:-119.4,thor:-119.4,legR:{ikS:[9,5.5,17],poleRel:[0,1,0],ft:[0,18],heelV:[0,-5,-1]}}
  },
  seq:[
    {path:['ext'],dur:.5,kind:'hold',label:'Pernas estendidas',tempo:'quadril fora do chão',breath:'INSPIRA'},
    {path:['ext','mid','curl'],dur:1.2,kind:'conc',label:'Puxada · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['curl'],dur:.6,kind:'hold',label:'Joelhos dobrados',tempo:'quadril alto',breath:'FIRME'},
    {path:['curl','mid','ext'],dur:2.5,kind:'ecc',label:'Volta · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['ext','curl'],
  paths:{lateral:[['heel','R','calcanhar'],['P','','quadril']]},
  equip(sk){
    const h=sk.side.R.heel;
    BOX([0,1.6,h[2]-7],[[X,24],[Y,1.6],[Z,26]],'eqp',{bias:-4});
  },
  guides:{
    lateral(sk){L3(sk.N,sk.side.R.K,'gd',.9,{layer:3,dash:'3 2.5'});TX([0,70,-20],'quadril fora do chão o tempo todo',{cls:'lbl-g',anchor:'middle'});TX([0,-7,12],'calcanhares deslizam na toalha',{cls:'lbl-g',anchor:'middle'});}
  },
  // Biblioteca: posteriores principal; glúteos secundário. A panturrilha só ajuda (como na flexão na bola) e fica fora:
  // a lista de "só ajuda" (estilo/musculos.ts) é do motor e não ganha entradas na revisão.
  muscles:{p:[['hams','R']],s:[['glutes','R']]},
  errors:[
    {id:'quadril',view:'lateral',keys:{ext:{P:[0,12,-29],lumbar:-90,thor:-90},mid:{P:[0,15,-30],lumbar:-96,thor:-96},curl:{P:[0,20,-31.5],lumbar:-100,thor:-100}}},
    {id:'lombar',view:'lateral',keys:{curl:{P:[0,40,-36],lumbar:-100,thor:-143}}},
    {id:'curta',view:'lateral',keys:{curl:{P:[0,26,-32],lumbar:-106,thor:-106,legR:{ikS:[9,5.5,37],poleRel:[0,1,0],ft:[0,48],heelV:[0,-5,.5]}}}}
  ]
};
export default ex;
