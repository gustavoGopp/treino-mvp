// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { CTX } from './contexto';
import { RAD, add, comb, cross, cs, dirAE, dot, len, mul, norm, sideV, sn, sub, tFr, tUp } from './math';

/* ================= corpo (cm) ================= */
export const B={lum:22,thor:29,neck:20,head:10.5,sh:19,shDrop:3,hip:9,ua:31,fa:32,th:43,sk:43,foot:17,heel:6,wrist:7};
export function ik2(S,T,a,b,pole){
  const d=sub(T,S);let dist=len(d);const n=dist>1e-6?mul(d,1/dist):[0,-1,0];
  const maxd=a+b-0.02;
  if(dist>maxd+0.8)CTX.IKFAIL++;
  dist=Math.min(Math.max(dist,Math.abs(a-b)+0.5),maxd);
  const ca=(a*a+dist*dist-b*b)/(2*a*dist);const A=Math.acos(Math.max(-1,Math.min(1,ca)));
  let pp=sub(pole,mul(n,dot(pole,n)));if(len(pp)<1e-4)pp=[0,0,1];pp=norm(pp);
  return{E:add(S,add(mul(n,a*Math.cos(A)),mul(pp,a*Math.sin(A)))),H:add(S,mul(n,dist))};
}
export function solveArm(a,S,s,sk){
  if(a.ua){const E=add(S,mul(dirAE(a.ua[0],a.ua[1],s),B.ua));return{E,H:add(E,mul(dirAE(a.fa[0],a.fa[1],s),B.fa))};}
  let T;
  if(a.ikS)T=sideV(a.ikS,s);
  else if(a.sph)T=add(S,mul(dirAE(a.sph[0],a.sph[1],s),a.sph[2]));
  else if(a.head)T=comb(1,sk.Hc,s*a.head[0],sk.xN,a.head[1],sk.uN,a.head[2],sk.fN);
  else if(a.tr)T=comb(1,sk.N,s*a.tr[0],sk.xT,a.tr[1],sk.uT,a.tr[2],sk.fT);
  return ik2(S,T,B.ua,B.fa,sideV(a.poleRel||[1,-1,0],s));
}
export function solveLeg(l,Hp,s){
  let K,A;
  if(l.th){K=add(Hp,mul(dirAE(l.th[0],l.th[1],s),B.th));A=add(K,mul(dirAE(l.sh[0],l.sh[1],s),B.sk));}
  else{const r=ik2(Hp,sideV(l.ikS,s),B.th,B.sk,sideV(l.poleRel||[0,0,1],s));K=r.E;A=r.H;}
  const fd=dirAE(l.ft[0],l.ft[1],s);
  return{K,A,toe:add(A,mul(fd,B.foot)),heel:l.heelV?add(A,sideV(l.heelV,s)):add(add(A,mul(fd,-B.heel)),[0,-4,0])};
}
export function skel(p){
  const r=p.roll||0,P=p.P;
  const lp=p.lumbar||0,tp=(p.thor!=null?p.thor:lp),np=(p.neck!=null?p.neck:tp);
  const uL=tUp(lp,r),fL=tFr(lp,r),uT=tUp(tp,r),fT=tFr(tp,r),uN=tUp(np,r),fN=tFr(np,r);
  const xL=cross(uL,fL),xT=cross(uT,fT),xN=cross(uN,fN);
  const M=add(P,mul(uL,B.lum)),N=add(M,mul(uT,B.thor)),Hc=add(N,mul(uN,B.neck));
  const xP=cross(tUp(lp,0),tFr(lp,0)); // pelve nivelada (o roll inclina só o tronco)
  const sk={P,M,N,Hc,uL,fL,xL,uT,fT,xT,uN,fN,xN,side:{},pose:p};
  for(const s of[-1,1]){
    const k=s<0?'R':'L';
    const pro=p['pro'+k]!=null?p['pro'+k]:(p.pro||0);
    const elev=p['elev'+k]!=null?p['elev'+k]:(p.elev||0);
    const rot=p['rot'+k]!=null?p['rot'+k]:(p.scapRot||0);
    sk.side[k]={s,pro,elev,rot,S:comb(1,N,s*(B.sh-0.25*pro),xT,elev-B.shDrop,uT,pro,fT),Hp:add(P,mul(xP,s*B.hip))};
  }
  for(const k of['R','L']){
    const sd=sk.side[k];
    const arm=solveArm(p['arm'+k]||p.armR,sd.S,sd.s,sk);sd.E=arm.E;sd.H=arm.H;
    const fa=norm(sub(sd.H,sd.E));sd.fa=fa;sd.uad=norm(sub(sd.E,sd.S));
    sd.W=add(sd.H,mul(fa,-B.wrist));sd.G=sd.H;
    const wb=p['wrist'+k]!=null?p['wrist'+k]:(p.wrist||0);
    if(wb){const wd=p.wristDir||[0,0,-1];const bd=norm(sub(wd,mul(fa,dot(wd,fa))));const hd=norm(add(mul(fa,cs(wb)),mul(bd,sn(wb))));sd.G=add(sd.W,mul(hd,B.wrist));}
    Object.assign(sd,solveLeg(p['leg'+k]||p.legR,sd.Hp,sd.s));
  }
  return sk;
}
export function scapPts(sk,k){
  const sd=sk.side[k],s=sd.s,{N,uT,fT,xT}=sk;
  const c=comb(1,N,s*(10-0.55*sd.pro),xT,-11+sd.elev,uT,-7,fT);
  const th=sd.rot*RAD;
  return[[-4,6],[7,6.5],[-1.5,-9]].map(([l,u])=>{const l2=l*Math.cos(th)-u*Math.sin(th),u2=l*Math.sin(th)+u*Math.cos(th);return comb(1,c,s*l2,xT,u2,uT);});
}

/* ================= interpolação ================= */
export function interp(a,b,u){
  if(a===undefined)return b; if(b===undefined)return a;
  if(typeof a==='number')return a+(b-a)*u;
  if(Array.isArray(a))return a.map((v,i)=>interp(v,b[i],u));
  if(typeof a==='object'){const o={};for(const k of new Set([...Object.keys(a),...Object.keys(b)]))o[k]=interp(a[k],b[k],u);return o;}
  return u<.5?a:b;
}
export const ease=u=>0.5-0.5*Math.cos(Math.PI*u);
