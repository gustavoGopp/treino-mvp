// @ts-nocheck
// Animação nova (aprovada). Flexão com o quadril alto (pike push-up). CORREÇÃO da conferência das animações antigas
// (04/11/2026): as mãos ficam plantadas no chão (antes subiam 5 cm e abriam 7 cm na descida, porque o punho dobrado
// girava com o antebraço). Agora cada pose-chave tem o alvo da mão ajustado para o ponto da palma não sair do lugar. Técnica e fontes: docs/pesquisa/animacoes/pike.md.
// Parte da flexão aprovada (src/engine/exercicios/flexao.ts): mãos e pés no chão, mas com o quadril bem alto (corpo
// em V invertido). Os cotovelos dobram e a cabeça desce entre as mãos, até a linha delas; o quadril continua alto e
// gira sobre os pés com as pernas estendidas.
import { L3, TX } from '../desenho';

const ex = {
  id:'pike',
  views:['lateral','frontal'],
  base:{legR:{ikS:[9,10,-28.7],poleRel:[0,0,1],ft:[0,-35]},wrist:80,wristDir:[0,0,1]},
  keys:{
    top:{P:[0,86,10],lumbar:128,thor:128,neck:135,pro:0,armR:{ikS:[20,2,78],poleRel:[.7,.3,-1]}},
    mid:{P:[0,76.6,23.3],lumbar:132,thor:132,neck:140,pro:-1,armR:{ikS:[14.9,5.4,80],poleRel:[.7,.3,-1]}},
    bottom:{P:[0,66.5,34.1],lumbar:137,thor:137,neck:145,pro:-2,armR:{ikS:[12.9,11.1,80.4],poleRel:[.7,.3,-1]}}
  },
  seq:[
    {path:['top'],dur:.4,kind:'hold',label:'Em cima',tempo:'quadril alto',breath:'INSPIRA'},
    {path:['top','mid','bottom'],dur:2,kind:'ecc',label:'Descida · excêntrica',tempo:'~2 s',breath:'INSPIRA'},
    {path:['bottom'],dur:.35,kind:'hold',label:'Embaixo',tempo:'cabeça perto do chão',breath:'FIRME'},
    {path:['bottom','mid','top'],dur:1,kind:'conc',label:'Subida · concêntrica',tempo:'~1 s',breath:'EXPIRA'}
  ],
  ext:['top','bottom'],
  paths:{lateral:[['Hc','','cabeça'],['E','R','cotovelo']],frontal:[['E','R','cotovelo'],['E','L','']]},
  equip(sk){},
  guides:{
    lateral(sk){L3(sk.P,sk.side.R.A,'gd',.9,{layer:3,dash:'3 2.5'});TX(sk.P,'quadril alto',{cls:'lbl-g',anchor:'middle',dy:-16});TX([0,-7,40],'a cabeça desce até a linha das mãos',{cls:'lbl-g',anchor:'middle'});},
    frontal(sk){TX([0,-6,0],'cabeça desce entre as mãos',{cls:'lbl-g',anchor:'middle'});}
  },
  // Biblioteca (revisão de anatomia, achado 4, para todo empurrar vertical): frente do ombro principal; lateral do
  // ombro e tríceps secundários.
  muscles:{p:[['deltAnt','RL']],s:[['deltLat','RL'],['triceps','RL']]},
  errors:[
    {id:'quadril',view:'lateral',keys:{mid:{P:[0,62,28],lumbar:118,thor:118,neck:122,armR:{ikS:[14.9,5.4,80],poleRel:[.7,.3,-1]}},bottom:{P:[0,50,44],lumbar:112,thor:112,neck:112,armR:{ikS:[12.9,11.1,80.4],poleRel:[.7,.3,-1]}}}},
    {id:'cot',view:'frontal',keys:{top:{armR:{ikS:[20,2,78],poleRel:[1,.2,-.1]}},mid:{armR:{ikS:[14.9,5.4,80],poleRel:[1,.2,-.1]}},bottom:{armR:{ikS:[12.9,11.1,80.4],poleRel:[1,.2,-.1]}}}},
    {id:'curta',view:'lateral',keys:{bottom:{P:[0,76.6,23.3],lumbar:132,thor:132,neck:140,pro:-1,armR:{ikS:[14.9,5.4,80],poleRel:[.7,.3,-1]}}}}
  ]
};
export default ex;
