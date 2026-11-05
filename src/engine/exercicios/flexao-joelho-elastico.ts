// @ts-nocheck
// Animação nova (aprovada). Flexão de joelho com elástico: deitado de bruços num colchonete, testa apoiada nos
// braços dobrados, o elástico preso num ponto firme e baixo atrás dos pés (pé de um móvel ou porta: aqui um poste
// baixo, escolha de desenho do R4) e passando por trás dos dois tornozelos; dobra os joelhos trazendo os calcanhares
// ao glúteo, com o quadril no chão. Pose nova no motor (o tronco deitado de bruços: pitch +90), com o ciclo da flexão
// deslizante aprovada e as duas faixas do anel do poste aos tornozelos, que afinam quando esticam (a tensão sobe com
// os joelhos dobrados).
// Técnica e fontes: docs/pesquisa/animacoes/flexao-joelho-elastico.md.
import { BOX, L3, TX, band, poste } from '../desenho';
import { X, Y, Z, add, mul, norm, sub } from '../math';

// o laço no tornozelo: onde a faixa prende, logo acima do calcanhar
const laco=(sk,k)=>{const sd=sk.side[k];return add(sd.A,mul(norm(sub(sd.K,sd.A)),4));};
const ex = {
  id:'flexao-joelho-elastico',
  views:['lateral'],
  base:{P:[0,15,0],lumbar:90,thor:90,neck:68,armR:{ua:[42,-6],fa:[-100,-3]}},
  keys:{
    ext:{legR:{ikS:[9,11,-85.3],poleRel:[0,-1,0],ft:[180,-50]}},
    mid:{legR:{ikS:[9,36,-72],poleRel:[0,-1,0],ft:[180,-20]}},
    curl:{legR:{ikS:[9,52,-50],poleRel:[0,-1,0],ft:[180,20]}}
  },
  seq:[
    {path:['ext'],dur:.5,kind:'hold',label:'Pernas estendidas',tempo:'elástico já esticado',breath:'INSPIRA'},
    {path:['ext','mid','curl'],dur:1.1,kind:'conc',label:'Flexão · concêntrica',tempo:'~1 s',breath:'EXPIRA'},
    {path:['curl'],dur:.5,kind:'hold',label:'Joelhos dobrados',tempo:'pausa curta',breath:'FIRME'},
    {path:['curl','mid','ext'],dur:2.4,kind:'ecc',label:'Volta · excêntrica',tempo:'~2–3 s',breath:'INSPIRA'}
  ],
  ext:['ext','curl'],
  paths:{lateral:[['A','R','tornozelo'],['K','R','joelho']]},
  ancora:[0,9,-130],
  equip(sk){
    BOX([0,.6,0],[[X,30],[Y,.6],[Z,95]],'eqp',{bias:-6});
    const a=poste(this.ancora[0],this.ancora[2],this.ancora[1],{h:40});
    for(const k of['R','L']){const l=laco(sk,k);band(this,k,a,l,{bias:k==='R'?.5:-3});L3(add(l,[0,4,0]),add(l,[0,-4,0]),'elas',3.4,{bias:.6});}
  },
  guides:{
    lateral(sk){L3(add(sk.P,[0,6,-30]),add(sk.P,[0,6,30]),'gd',.9,{layer:3,dash:'3 2.5'});TX(add(sk.P,[0,20,0]),'quadril no chão',{cls:'lbl-g',anchor:'middle'});TX(add(this.ancora,[0,14,0]),'preso baixo e firme',{cls:'lbl-g',anchor:'start',dx:4});}
  },
  muscles:{p:[['hams','R']],s:[]},
  errors:[
    // o quadril sobe do chão para ajudar: a pelve levanta e dobra
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,24,0],lumbar:78},curl:{P:[0,30,0],lumbar:70,thor:84}}},
    // tranco: o meio já é o fim
    {id:'tranco',view:'lateral',keys:{mid:{legR:{ikS:[9,52,-50],poleRel:[0,-1,0],ft:[180,20]}}}},
    // curta: dobra pouco e não estende na volta
    {id:'curta',view:'lateral',keys:{ext:{legR:{ikS:[9,26,-77],poleRel:[0,-1,0],ft:[180,-30]}},curl:{legR:{ikS:[9,42,-66],poleRel:[0,-1,0],ft:[180,0]}}}}
  ]
};
export default ex;
