// @ts-nocheck
// Port do guia original (referencia/guia-execucao-fase1.html), feito por scripts/extrair-motor.mjs no M1. Desde então é mantido à mão: o script só roda com --forcar.
import { CTX } from './contexto';
import { B, scapPts } from './esqueleto';
import { X, Y, Z, add, comb, cross, dot, len, mid, mul, norm, sub } from './math';

/* ================= projeção e primitivas ================= */
export const VIEWS={
  lateral:{name:'Lateral',proj:v=>[v[2],-v[1],-v[0]]},
  frontal:{name:'Frontal',proj:v=>[v[0],-v[1],v[2]]},
  posterior:{name:'Por trás',proj:v=>[-v[0],-v[1],-v[2]]},
  top:{name:'De cima',proj:v=>[v[0],v[2],v[1]]},
  zoom:{name:'Detalhe',proj:v=>[v[2],-v[1],-v[0]]}
};
export const isSide=()=>CTX.VIEW==='lateral'||CTX.VIEW==='zoom';
export const f1=n=>Math.round(n*10)/10;
export function bb(x,y,r){if(CTX.MEAS){r=r||0;CTX.MEAS[0]=Math.min(CTX.MEAS[0],x-r);CTX.MEAS[1]=Math.max(CTX.MEAS[1],x+r);CTX.MEAS[2]=Math.min(CTX.MEAS[2],y-r);CTX.MEAS[3]=Math.max(CTX.MEAS[3],y+r);}}
export function push(l,d,s){CTX.prims.push({l,d,s});}
export function at(o){return(o.dash?` stroke-dasharray="${o.dash}"`:'')+(o.op!=null?` opacity="${o.op}"`:'');}
export function L3(a,b,cls,w,o={}){const A=CTX.PJ(a),C=CTX.PJ(b);bb(A[0],A[1],w/2);bb(C[0],C[1],w/2);push(o.layer??1,(A[2]+C[2])/2+(o.bias||0),`<line x1="${f1(A[0])}" y1="${f1(A[1])}" x2="${f1(C[0])}" y2="${f1(C[1])}" class="${cls}" stroke-width="${f1(w)}"${at(o)}/>`);}
export function PL3(pts,cls,w,o={}){const Q=pts.map(CTX.PJ);Q.forEach(q=>bb(q[0],q[1],w/2));push(o.layer??1,Q.reduce((s,q)=>s+q[2],0)/Q.length+(o.bias||0),`<polyline points="${Q.map(q=>f1(q[0])+','+f1(q[1])).join(' ')}" class="${cls}" stroke-width="${f1(w)}" fill="none"${at(o)}/>`);}
export function PG3(pts,cls,o={}){const Q=pts.map(CTX.PJ);Q.forEach(q=>bb(q[0],q[1],(o.w||0)/2));push(o.layer??1,Q.reduce((s,q)=>s+q[2],0)/Q.length+(o.bias||0),`<polygon points="${Q.map(q=>f1(q[0])+','+f1(q[1])).join(' ')}" class="${cls}"${o.w?` stroke-width="${f1(o.w)}"`:''}${at(o)}/>`);}
export function C3(c,r,cls,o={}){const A=CTX.PJ(c);bb(A[0],A[1],r);push(o.layer??1,A[2]+(o.bias||0),`<circle cx="${f1(A[0])}" cy="${f1(A[1])}" r="${f1(r)}" class="${cls}"${o.w?` stroke-width="${f1(o.w)}"`:''}${at(o)}/>`);}
export function hull(P){const p=P.map(q=>[q[0],q[1]]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);if(p.length<3)return p;const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];for(const q of p){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],q)<=0)lo.pop();lo.push(q);}for(let i=p.length-1;i>=0;i--){const q=p[i];while(up.length>=2&&cr(up[up.length-2],up[up.length-1],q)<=0)up.pop();up.push(q);}up.pop();lo.pop();return lo.concat(up);}
export function BOX(c,ax,cls,o={}){const pts=[];for(const a of[-1,1])for(const b of[-1,1])for(const d of[-1,1])pts.push(comb(1,c,a*ax[0][1],ax[0][0],b*ax[1][1],ax[1][0],d*ax[2][1],ax[2][0]));const Q=pts.map(CTX.PJ);Q.forEach(q=>bb(q[0],q[1],1));const h=hull(Q);push(o.layer??1,Q.reduce((s,q)=>s+q[2],0)/8+(o.bias||0),`<polygon points="${h.map(q=>f1(q[0])+','+f1(q[1])).join(' ')}" class="${cls}" stroke-width="${f1(o.w||0.8)}"${at(o)}/>`);}
export function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
/** O <text> de um rótulo (a mesma string de sempre; separada para a cena do Boneco poder reescrever um rótulo movido). */
export function textoSvg(x,y,cls,size,anchor,str){return`<text x="${f1(x)}" y="${f1(y)}" class="${cls}" font-size="${f1(size)}" text-anchor="${anchor}" stroke-width="${f1(3.2*CTX.KS)}">${esc(str)}</text>`;}
// A prim do rótulo guarda a âncora projetada (ax, ay: antes de dx/dy) e o texto em `tx` (R4, 05/11/2026): o SVG não muda.
export function TX(v,str,o={}){if(CTX.MEAS)return;const A=o.scr?v:CTX.PJ(v);const x=A[0]+(o.dx||0)*CTX.KS,y=A[1]+(o.dy||0)*CTX.KS;const cls=o.cls||'lbl',size=(o.size||11)*CTX.KS,anchor=o.anchor||'start';CTX.prims.push({l:o.layer??4,d:0,s:textoSvg(x,y,cls,size,anchor,str),tx:{ax:A[0],ay:A[1],x,y,cls,size,anchor,str}});}
export function arrowHead(p,q,cls,size){const dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy)||1,ux=dx/l,uy=dy/l,s=size;const a=[q[0]-ux*s+uy*s*.55,q[1]-uy*s-ux*s*.55],b=[q[0]-ux*s-uy*s*.55,q[1]-uy*s+ux*s*.55];return`<polygon points="${f1(q[0])},${f1(q[1])} ${f1(a[0])},${f1(a[1])} ${f1(b[0])},${f1(b[1])}" class="${cls}"/>`;}
export function PATH2(Q,cls,w,o={}){if(CTX.MEAS||Q.length<2)return;let s=`<polyline points="${Q.map(q=>f1(q[0])+','+f1(q[1])).join(' ')}" class="${cls}" stroke-width="${f1(w)}" fill="none"${at(o)}/>`;if(o.arrow!==false){let i=Q.length-2;while(i>0&&Math.hypot(Q[Q.length-1][0]-Q[i][0],Q[Q.length-1][1]-Q[i][1])<3)i--;s+=arrowHead(Q[i],Q[Q.length-1],o.acls||'pta',(o.asz||4.2)*CTX.KS);}push(o.layer??3,0,s);}
export function ARROW3(a,b,cls,w,acls,o={}){if(CTX.MEAS)return;const A=CTX.PJ(a),C=CTX.PJ(b);push(o.layer??3,0,`<line x1="${f1(A[0])}" y1="${f1(A[1])}" x2="${f1(C[0])}" y2="${f1(C[1])}" class="${cls}" stroke-width="${f1(w)}"${at(o)}/>`+arrowHead(A,C,acls,4*CTX.KS));}

/* ================= desenho do corpo ================= */
export function body(sk,pal){
  const g=pal==='g'||pal==='g2';
  const cl=b=>g?pal==='g'?'gh':'gh2':pal==='e'?b+'-e':b;
  const ws=g?0.32:1;
  const dN=CTX.PJ(sk.N)[2],dP=CTX.PJ(sk.P)[2];
  const R=sk.side.R,Lf=sk.side.L;
  const xM=norm(add(sk.xL,sk.xT));
  const Mr=add(sk.M,mul(xM,-13)),Ml=add(sk.M,mul(xM,13));
  const tw=({lateral:16,zoom:16,top:22,frontal:3.5,posterior:3.5})[CTX.VIEW];
  const tcls=g?cl(''):cl('tor');
  PG3([R.S,Lf.S,Ml,Mr],tcls,{w:tw*(g?0.18:1),bias:0});
  PG3([Mr,Ml,Lf.Hp,R.Hp],tcls,{w:tw*(g?0.18:1),bias:-0.2});
  // coluna (só na figura principal)
  if(!g&&(isSide()||CTX.VIEW==='posterior')){
    const back=isSide()?-5:-7.5;
    const sp=[comb(1,sk.P,back,sk.fL),comb(1,sk.M,back-1,sk.fT),comb(1,sk.N,back+1,sk.fT),comb(1,sk.N,0.45,sub(sk.Hc,sk.N),back+2,sk.fN)];
    PL3(sp,'sp',1.5,{bias:3,dash:''});
    for(let i=0;i<3;i++)for(let j=0;j<4;j++){const t=j/4;C3(add(mul(sp[i],1-t),mul(sp[i+1],t)),1.25,'spd',{bias:3.1});}
  }
  // escápulas (vista de trás)
  if(!g&&CTX.VIEW==='posterior'){for(const k of['R','L'])PG3(scapPts(sk,k),pal==='e'?'tor-e':'scap',{w:1.2,bias:2.5});}
  // pescoço e cabeça
  L3(sk.N,add(sk.N,mul(sub(sk.Hc,sk.N),.6)),g?cl(''):cl('bn'),6.5*ws,{bias:0.3});
  C3(sk.Hc,B.head,g?cl(''):cl('hd'),{w:2.2*(g?.6:1),bias:0.6});
  if(isSide()||CTX.VIEW==='top'){L3(comb(1,sk.Hc,7,sk.fN,.5,sk.uN),comb(1,sk.Hc,12.5,sk.fN,0,sk.uN),g?cl(''):cl('ns'),2.4*(g?.6:1),{bias:0.7});}
  // membros
  for(const k of['L','R']){
    const sd=sk.side[k];
    const side=isSide();
    const nearA=!side||CTX.PJ(sd.S)[2]>=dN-1, nearL=!side||CTX.PJ(sd.Hp)[2]>=dP-1;
    const ca=g?cl(''):cl(nearA?'bn':'bf'), cg=g?cl(''):cl(nearL?'bn':'bf');
    L3(sd.Hp,sd.K,cg,10*ws);L3(sd.K,sd.A,cg,8*ws);PL3([sd.heel,sd.A,sd.toe],cg,4.5*ws);
    L3(sd.S,sd.E,ca,8*ws,{bias:0.05});L3(sd.E,sd.W,ca,6.5*ws,{bias:0.06});L3(sd.W,sd.G,ca,5*ws,{bias:0.07});
    if(!g&&pal!=='e'){for(const j of[sd.S,sd.E,sd.Hp,sd.K,sd.A])C3(j,2.3,'jt',{w:1.3,bias:0.2});}
  }
}
/* músculos */
export const MUS={
  pecClav(sk,k){const sd=sk.side[k],s=sd.s,{N,uT,fT,xT}=sk;const ins=comb(1,sd.S,.22,sub(sd.E,sd.S),2,fT);return[comb(1,N,10,fT,-3,uT,s*1,xT),comb(1,N,8,fT,-1,uT,s*10,xT),comb(1,sd.S,4,fT,-1,uT),ins,comb(1,N,10.5,fT,-9,uT,s*6,xT),comb(1,N,10.5,fT,-8,uT,s*1,xT)];},
  pecStern(sk,k){const sd=sk.side[k],s=sd.s,{N,uT,fT,xT}=sk;const ins=comb(1,sd.S,.22,sub(sd.E,sd.S),2,fT);return[comb(1,N,10.5,fT,-8,uT,s*1,xT),comb(1,N,10.5,fT,-9,uT,s*6,xT),ins,comb(1,N,10,fT,-17,uT,s*12,xT),comb(1,N,11,fT,-19,uT,s*1,xT)];},
  deltAnt(sk,k){const sd=sk.side[k];return{c:comb(1,sd.S,6,sd.uad,4,sk.fT),r:6};},
  deltLat(sk,k){const sd=sk.side[k];return{c:comb(1,sd.S,6,sd.uad,sd.s*4.5,sk.xT,1,sk.uT),r:7};},
  deltPost(sk,k){const sd=sk.side[k];return{c:comb(1,sd.S,6,sd.uad,-4,sk.fT),r:6.5};},
  lats(sk,k){const sd=sk.side[k],s=sd.s,{N,P,M,uT,fT,xT,uL,fL,xL}=sk;return[comb(1,sd.S,.15,sub(sd.E,sd.S),-3,fT),comb(1,N,s*7,xT,-15,uT,-7,fT),comb(1,P,s*3,xL,10,uL,-7,fL),comb(1,P,s*11,xL,4,uL,-3,fL),comb(1,M,s*14,xT,-1,fT)];},
  midTrap(sk,k){const sd=sk.side[k],s=sd.s,{N,uT,fT,xT}=sk;const sc=scapPts(sk,k);return[comb(1,N,s*1,xT,-2,uT,-7.5,fT),sc[0],sc[2],comb(1,N,s*1,xT,-19,uT,-7.5,fT)];},
  upTrap(sk,k){const sd=sk.side[k],s=sd.s,{N,uT,fT,xT}=sk;return[comb(1,N,7,uT,s*2,xT,-2,fT),comb(1,sd.S,1.5,uT,-2,fT),comb(1,N,s*7,xT,-7,uT,-7,fT)];},
  biceps(sk,k){const sd=sk.side[k];let an=sub(sd.fa,mul(sd.uad,dot(sd.fa,sd.uad)));an=len(an)<.15?sk.fT:norm(an);return{a:comb(1,sd.S,.3,sub(sd.E,sd.S),3,an),b:comb(1,sd.S,.85,sub(sd.E,sd.S),3,an),w:6};},
  triceps(sk,k){const sd=sk.side[k];let an=sub(sd.fa,mul(sd.uad,dot(sd.fa,sd.uad)));an=len(an)<.15?sk.fT:norm(an);return{a:comb(1,sd.S,.25,sub(sd.E,sd.S),-3,an),b:comb(1,sd.S,.85,sub(sd.E,sd.S),-3,an),w:6.5};},
  forearm(sk,k){const sd=sk.side[k];return{a:comb(1,sd.E,.15,sub(sd.W,sd.E)),b:comb(1,sd.E,.8,sub(sd.W,sd.E)),w:5};},
  quads(sk,k){const sd=sk.side[k];const t=norm(sub(sd.K,sd.Hp)),sh=norm(sub(sd.A,sd.K));let p=sub(sh,mul(t,dot(sh,t)));p=len(p)<.12?mul(sk.fL,-1):norm(p);return{a:comb(1,sd.Hp,.2,sub(sd.K,sd.Hp),-5,p),b:comb(1,sd.Hp,.86,sub(sd.K,sd.Hp),-4,p),w:9};},
  hams(sk,k){const sd=sk.side[k];const t=norm(sub(sd.K,sd.Hp)),sh=norm(sub(sd.A,sd.K));let p=sub(sh,mul(t,dot(sh,t)));p=len(p)<.12?mul(sk.fL,-1):norm(p);return{a:comb(1,sd.Hp,.15,sub(sd.K,sd.Hp),4.5,p),b:comb(1,sd.Hp,.85,sub(sd.K,sd.Hp),4,p),w:8};},
  glutes(sk,k){const sd=sk.side[k];return{c:comb(1,sd.Hp,-6,sk.fL,1.5,sk.uL,sd.s*1.5,sk.xL),r:7.5};},
  calf(sk,k){const sd=sk.side[k];const sh=norm(sub(sd.A,sd.K)),fd=norm(sub(sd.toe,sd.A));let q=sub(fd,mul(sh,dot(fd,sh)));q=len(q)<.12?sk.fL:norm(q);return{a:comb(1,sd.K,.12,sub(sd.A,sd.K),-3.5,q),b:comb(1,sd.K,.62,sub(sd.A,sd.K),-3,q),w:7.5};},
  erect(sk){return{a:comb(1,sk.P,-7,sk.fL,4,sk.uL),b:comb(1,sk.N,-6,sk.fT,-6,sk.uT),w:6};},
  rectus(sk){const{N,P,uT,fT,xT,uL,fL,xL}=sk;return[comb(1,N,10,fT,-15,uT,-4,xT),comb(1,N,10,fT,-15,uT,4,xT),comb(1,P,9,fL,4,uL,4,xL),comb(1,P,9,fL,4,uL,-4,xL)];},
  obliq(sk,k){const s=sk.side[k].s,{N,M,P,uT,fT,xT,uL,fL,xL}=sk;return[comb(1,M,s*13,xT,2,fT),comb(1,N,s*12,xT,-14,uT,6,fT),comb(1,P,s*10,xL,6,uL,4,fL)];},
  // adutores (catálogo, 11/2026): fuso na face interna da coxa, do púbis ao joelho (a adução com caneleira os tem como principal)
  adutores(sk,k){const sd=sk.side[k];const t=norm(sub(sd.K,sd.Hp));let m=mul(sk.xL,-sd.s);m=norm(sub(m,mul(t,dot(m,t))));return{a:comb(1,sd.Hp,.12,sub(sd.K,sd.Hp),3,m),b:comb(1,sd.Hp,.72,sub(sd.K,sd.Hp),2.5,m),w:7};}
};
export function muscles(sk,list,cls){
  for(const[id,sides]of list){
    let ks=sides==='RL'?['R','L']:[sides];
    // na vista lateral, só o lado de perto (o de longe ficaria por cima do corpo)
    if(isSide()&&sides==='RL')ks=['R'];
    for(const k of ks){
      const r=MUS[id](sk,k);
      if(Array.isArray(r))PG3(r,cls,{layer:2});
      else if(r.c)C3(r.c,r.r,cls,{layer:2});
      else L3(r.a,r.b,cls+'l',r.w,{layer:2});
    }
  }
}

/* ================= equipamentos ================= */
export function dumbbell(G,hd,cls){L3(add(G,mul(hd,-9)),add(G,mul(hd,9)),cls,2.6);C3(add(G,mul(hd,-9)),7,cls,{bias:.1});C3(add(G,mul(hd,9)),7,cls,{bias:.1});}
// torre da estação Movement: base [x,z], across = vetor da largura, out = vetor de frente; pulleyY = altura do carro
export function tower(t,lift){
  const base=[t.x,0,t.z],ac=t.ac,out=t.out;
  const zb=-400;
  BOX(comb(1,base,119,Y,-7,out),[[ac,10],[Y,119],[out,7]],'eqp',{bias:zb,w:.6});
  for(const s of[-1,1])L3(comb(1,base,s*8,ac,1,out),comb(1,base,s*8,ac,1,out,238,Y),'eql',2.2,{bias:zb+1});
  BOX(comb(1,base,8,Y,-7,out),[[ac,8],[Y,4],[out,5]],'eqd',{bias:zb+2});
  BOX(comb(1,base,36+lift,Y,-7,out),[[ac,7],[Y,22],[out,5]],'eqs',{bias:zb+2});
  const pul=comb(1,base,t.py,Y,2,out);
  BOX(comb(1,base,t.py,Y,1,out),[[ac,4.5],[Y,5],[out,2.5]],'eqd',{bias:zb+3});
  C3(pul,3.2,'eqp',{w:1,bias:zb+4});
  return pul;
}
export function liftOf(ex,id,L){const L0=ex.L0&&ex.L0[id]!=null?ex.L0[id]:L;return Math.max(0,Math.min(95,(L-L0)*0.5));}
export function cable(ex,id,from,to){const L=len(sub(from,to));if(CTX.MEAS&&ex._cab){ex._cab[id]=Math.min(ex._cab[id]??1e9,L);}L3(from,to,'cb',1,{bias:-1});return L;}
/**
 * Elástico (peça nova do motor, 04/11/2026; pesquisa-v2/08, seção 6): uma faixa entre a âncora e a mão (ou o pé). O
 * comprimento de repouso é o menor medido na calibração (como o cabo da polia); a faixa afina quando estica, até
 * ~55% da largura com o dobro do comprimento, para a pessoa ver a tensão subir. Devolve o comprimento.
 */
export function band(ex,id,from,to,o={}){
  const L=len(sub(from,to));
  if(CTX.MEAS&&ex._cab){ex._cab[id]=Math.min(ex._cab[id]??1e9,L);}
  const L0=ex.L0&&ex.L0[id]!=null?ex.L0[id]+10:L;
  const r=Math.max(0,Math.min(1,(L-L0)/Math.max(1,L0)));
  L3(from,to,'elas',(o.w??3.4)*(1-0.45*r),{bias:o.bias??-1,layer:o.layer});
  return L;
}
/**
 * Âncora do elástico (R4, 05/11/2026): um poste fino no chão, em [x, 0, z], com um anel na altura `alt` onde o elástico
 * está preso. Escolha de desenho: a ficha fala em porta, pilar ou barra firme; de lado, uma porta cobriria o corpo e,
 * de frente, sumiria; o poste lê em todas as vistas e é a convenção da torre da polia. Devolve o ponto do anel.
 */
export function poste(x,z,alt,o={}){
  const h=o.h??Math.max(alt+12,60);
  BOX([x,h/2,z],[[X,2.5],[Y,h/2],[Z,2.5]],'eqp',{bias:-400,w:.6});
  BOX([x,2,z],[[X,7],[Y,2],[Z,7]],'eqd',{bias:-399});
  C3([x,alt,z],3,'eqd',{bias:-398});
  return[x,alt,z];
}
/** Pegador do elástico na mão: uma barrinha curta atravessada. */
export function bandHandle(G,dir,o={}){L3(add(G,mul(dir,-4.5)),add(G,mul(dir,4.5)),'eqd',2.6,{bias:o.bias??.3});}
/**
 * Halter em 3D (catálogo, 04/11/2026): o cabo e as anilhas como cilindros de verdade, projetados na vista. De lado,
 * a anilha vista de frente é um círculo e vista de perfil é um retângulo fino, como na vida real (o `dumbbell` antigo
 * desenha sempre dois círculos). hd = direção do cabo.
 */
export function dumbbell3(G,hd,cls,o={}){
  // Sem o acabamento A2 (estilo clássico e o A aprovado), o halter antigo: o clássico é conferido contra o guia original.
  if(!CTX.ACABAMENTO)return dumbbell(G,hd,cls);
  const u=norm(hd),a=norm(Math.abs(u[1])<.9?cross(u,[0,1,0]):cross(u,[1,0,0])),b=cross(u,a);
  const disco=(c)=>{const pts=[];for(let i=0;i<20;i++){const t=i/20*2*Math.PI;pts.push(comb(1,c,7*Math.cos(t),a,7*Math.sin(t),b));}return pts;};
  L3(add(G,mul(u,-8)),add(G,mul(u,8)),cls,2.6,{bias:(o.bias??0),layer:o.layer});
  for(const s of[-1,1]){
    const pts=[...disco(add(G,mul(u,s*7))),...disco(add(G,mul(u,s*11)))];
    const Q=pts.map(CTX.PJ);Q.forEach(q=>bb(q[0],q[1],1));const h=hull(Q);
    push(o.layer??1,Q.reduce((t,q)=>t+q[2],0)/Q.length+(o.bias??0)+.1,`<polygon points="${h.map(q=>f1(q[0])+','+f1(q[1])).join(' ')}" class="${cls}" stroke-width="0.8"/>`);
  }
}
/**
 * Kettlebell (catálogo, 04/11/2026): a alça na mão (G) e a bola embaixo dela, na direção `baixo` (a gravidade, quando
 * pendurado; ao longo do antebraço, quando apoiado nele). A bola é uma esfera: um círculo em qualquer vista. `eixo` é a
 * direção da alça (de um "chifre" ao outro).
 */
export function kettlebell(G,baixo,eixo,cls,o={}){
  // Com as duas mãos (o.maos = [mão direita, mão esquerda]), a alça passa pelas duas, e a bola fica embaixo do meio:
  // o kettlebell nunca fica solto entre as mãos (pedido do Gustavo, 04/11/2026).
  if(o.maos){G=mid(o.maos[0],o.maos[1]);eixo=sub(o.maos[1],o.maos[0]);}
  const d=norm(baixo),a=norm(eixo),c=add(G,mul(d,12));
  const m=o.maos?Math.max(5,len(sub(o.maos[1],o.maos[0]))/2):5;
  const pts=[comb(1,c,-6.5,a,-6,d),add(G,mul(a,-m)),add(G,mul(a,m)),comb(1,c,6.5,a,-6,d)];
  PL3(pts,cls.endsWith('-e')?'kb-alca-e':'kb-alca',2.4,{bias:(o.bias??0)+.2,layer:o.layer});
  C3(c,9,cls,{bias:o.bias??0,layer:o.layer});
}
export function dumbbellV(top,cls){const bot=add(top,[0,-20,0]);L3(top,bot,cls,2.6,{bias:.4});for(const c of[top,bot]){L3(add(c,[-9,0,0]),add(c,[9,0,0]),cls,4,{bias:.45});L3(add(c,[0,0,-9]),add(c,[0,0,9]),cls,4,{bias:.45});}}
export function ropeC(sk,pul){const hr=sk.side.R.G,hl=sk.side.L.G,m=mid(hr,hl);const half=len(sub(hr,hl))/2;return add(m,mul(norm(sub(pul,m)),Math.sqrt(Math.max(30,784-half*half))));}
export function rope(ex,id,sk,pul){
  const hr=sk.side.R.G,hl=sk.side.L.G,m=mid(hr,hl);const u=norm(sub(pul,m));const half=len(sub(hr,hl))/2;const d=Math.sqrt(Math.max(30,28*28-half*half));
  const c=add(m,mul(u,d));L3(c,hr,'rope',2,{bias:.2});L3(c,hl,'rope',2,{bias:.2});C3(hr,2.4,'eqd',{bias:.3});C3(hl,2.4,'eqd',{bias:.3});C3(c,1.6,'eqd',{bias:.2});
  return cable(ex,id,c,pul);
}

export function pullBar(){
  L3([-62,230,0],[62,230,0],'eql',3.4,{bias:-3});
  for(const s of[-1,1]){L3([s*62,230,0],[s*74,221,0],'eql',3.4,{bias:-3});L3([s*74,221,0],[s*80,232,0],'eql',3,{bias:-3});}
  if(CTX.VIEW!=='lateral'){for(const s of[-1,1])BOX([s*84,119,-8],[[X,5],[Y,119],[Z,8]],'eqp',{bias:-400,w:.6});L3([-84,238,-8],[84,238,-8],'eql',3,{bias:-399});}
  else C3([0,230,0],3.6,'eqd',{bias:3});
}

/* ================= peças novas do catálogo completo (11/2026) ================= */
/**
 * Fita de suspensão (TRX ou argolas): mosquetão numa âncora no alto, um trecho único até o ponto em que a fita se
 * divide e duas fitas até os pegadores (as mãos, ou os pés). A fita não estica: o comprimento sai da pose, e por isso
 * não há calibração L0; com CTX.MEAS ligado, `ex._fita[id]` guarda o menor e o maior comprimento vistos
 * (scripts/medir-animacao.mjs imprime os dois), para o autor conferir que a fita não "cresce" entre as fases.
 * pegadores = [ponto direito, ponto esquerdo] (ou um ponto só: uma fita só). o.tira = comprimento do trecho único (cm). o.pe = pegador de pé (berço
 * largo, sem anel). cls = 'db' ou 'db-e' (o pegador fica vermelho na figura do erro, como o halter).
 */
export function suspensao(ex,id,ancora,pegadores,cls,o={}){
  const m=pegadores.length>1?mid(pegadores[0],pegadores[1]):pegadores[0],L=len(sub(m,ancora)); // um pegador só: uma fita
  const u=norm(sub(m,ancora)),tira=Math.min(o.tira??30,L*.6),split=add(ancora,mul(u,tira));
  if(CTX.MEAS){ // caminho da fita até cada pegador: trecho único + fita própria
    ex._fita=ex._fita||{};const f=ex._fita[id]||{min:1e9,max:0};
    for(const p of pegadores){const Lp=tira+len(sub(p,split));f.min=Math.min(f.min,Lp);f.max=Math.max(f.max,Lp);}
    ex._fita[id]=f;
  }
  L3(add(ancora,[0,0,-10]),add(ancora,[0,0,10]),'eql',3,{bias:-3});
  C3(ancora,2.6,'eqd',{bias:-3});
  L3(ancora,split,'eql',2.4,{bias:-2});
  for(const p of pegadores){
    L3(split,p,'eql',1.8,{bias:-1});
    const a=norm(Math.abs(u[0])<.9?cross(u,X):cross(u,Y)); // atravessado à fita
    if(o.pe){L3(add(p,mul(a,-6)),add(p,mul(a,6)),cls,3.2,{bias:.3});}
    else{C3(p,3,'eqd',{bias:.2});L3(add(p,mul(a,-4.5)),add(p,mul(a,4.5)),cls,2.6,{bias:.3});}
  }
}
/**
 * Paralelas (catálogo, 11/2026): duas barras na altura das mãos (h), separadas de 2·meia, com os montantes e a
 * travessa no fundo, atrás da figura em todas as vistas (como a barra fixa). De lado, as duas barras viram uma só.
 */
export function paralelas(h=105,meia=25){
  for(const s of[-1,1])L3([s*meia,h,-30],[s*meia,h,30],'eql',3.4,{bias:s<0?2:-2});
  for(const s of[-1,1])BOX([s*meia,h/2,-27],[[X,2.5],[Y,h/2],[Z,2.5]],'eqp',{bias:-400,w:.6});
  L3([-meia,h-4,-27],[meia,h-4,-27],'eql',3,{bias:-399});
}
/**
 * Caneleira de peso (catálogo, 11/2026): uma caixa presa logo acima do tornozelo, atravessada por uma tira. k = lado.
 * cls = 'eqd' (normal) ou 'db-e' (vermelha, na figura do erro).
 */
export function caneleira(sk,k,cls,o={}){
  const sd=sk.side[k],u=norm(sub(sd.K,sd.A)),a=norm(Math.abs(u[1])<.9?cross(u,Y):cross(u,X)),b=cross(u,a);
  const c=add(sd.A,mul(u,7));
  BOX(c,[[u,4.5],[a,6.5],[b,6.5]],cls,{bias:o.bias??.3,w:.9});
  L3(comb(1,c,-6.8,a,4.5,u),comb(1,c,6.8,a,4.5,u),'eql',1.6,{bias:(o.bias??.3)+.1});
}
/**
 * Mini-band (catálogo, 11/2026): laço curto de elástico nas coxas, logo acima dos joelhos, feito com duas faixas
 * (`band`, ids 'f' e 't': frente e trás) entre as duas coxas e uma "tampa" em cada coxa. Herda da `band` a calibração
 * do repouso e o afinamento com a tensão: a faixa afina quando os joelhos abrem.
 */
export function miniBand(ex,sk,o={}){
  const p={};for(const k of['R','L']){const sd=sk.side[k];p[k]=add(sd.K,mul(sub(sd.Hp,sd.K),.18));}
  const f=mul(norm(sub(sk.fL,mul(sk.uL,dot(sk.fL,sk.uL)))),6);
  band(ex,'f',add(p.R,f),add(p.L,f),{w:o.w??3.4,bias:.4});
  band(ex,'t',sub(p.R,f),sub(p.L,f),{w:o.w??3.4,bias:-2});
  for(const k of['R','L'])L3(add(p[k],f),sub(p[k],f),'elas',o.w??3.4,{bias:.5});
}
/**
 * Roda abdominal (catálogo, 11/2026): uma roda de raio 9 no chão, com o eixo passando pelas duas mãos e um pegador
 * de cada lado. De lado, a roda é um círculo; de frente, um retângulo fino. cls = 'db' ou 'db-e' (pegadores).
 */
export function roda(GR,GL,cls,o={}){
  const c=mid(GR,GL),a=norm(sub(GL,GR));
  if(isSide()){C3(c,9,'eqp',{w:1.2,bias:o.bias??.5});C3(c,2.2,'eqd',{bias:(o.bias??.5)+.1});}
  else BOX(c,[[a,1.6],[Y,9],[Z,9]],'eqp',{bias:o.bias??.5,w:.9});
  L3(add(GR,mul(a,-10)),add(GL,mul(a,10)),'eqd',2.4,{bias:(o.bias??.5)+.2});
  for(const G of[GR,GL])L3(add(G,mul(a,-4.5)),add(G,mul(a,4.5)),cls,3.4,{bias:(o.bias??.5)+.3});
}
