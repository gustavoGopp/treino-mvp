// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import { CTX } from './contexto';
import { ARROW3, PATH2, TX, VIEWS, at, body, liftOf, muscles, ropeC } from './desenho';
import { ease, interp, skel } from './esqueleto';
import { Y, Z, add, comb, len, mid, mul, norm, sub } from './math';

/* ================= preparação ================= */
export function prep(ex){
  const merge=(a,b)=>Object.assign({},a,b);
  ex.K={};for(const k in ex.keys)ex.K[k]=merge(ex.base,ex.keys[k]);
  ex.T=ex.seq.reduce((s,g)=>s+g.dur,0);
  let t=0;for(const g of ex.seq){g.t0=t;t+=g.dur;}
  for(const e of ex.errors){e.K={};for(const k in ex.keys)e.K[k]=Object.assign({},ex.K[k],e.base||{},(e.keys&&e.keys[k])||{});}
}
export function segAt(ex,t){t=((t%ex.T)+ex.T)%ex.T;for(const g of ex.seq)if(t<g.t0+g.dur)return g;return ex.seq[ex.seq.length-1];}
export function poseAt(ex,K,t){
  t=((t%ex.T)+ex.T)%ex.T;const g=segAt(ex,t);let u=(t-g.t0)/g.dur;if(g.kind!=='hold')u=ease(u);
  const p=g.path;if(p.length===1)return K[p[0]];
  const s=u*(p.length-1);const i=Math.min(p.length-2,Math.floor(s));return interp(K[p[i]],K[p[i+1]],s-i);
}
export function concTimes(ex,n){const segs=ex.seq.filter(g=>g.kind==='conc');const tot=segs.reduce((s,g)=>s+g.dur,0);const out=[];for(let i=0;i<=n;i++){let x=i/n*tot;for(const g of segs){if(x<=g.dur+1e-9){out.push(g.t0+Math.min(x,g.dur-1e-6));break;}x-=g.dur;}}return out;}
export function getPt(sk,key,side){if(key==='Hc')return sk.Hc;if(key==='N')return sk.N;if(key==='P')return sk.P;return sk.side[side][key];}

/* render de uma cena (para o palco ou para medir) */
export function scene(ex,view,mode,t,errIdx){
  CTX.VIEW=view;CTX.PJ=VIEWS[view].proj;CTX.prims=[];
  const sk=skel(poseAt(ex,ex.K,t));
  if(mode==='err'){
    const e=ex.errors[errIdx||0];const ske=skel(poseAt(ex,e.K,t));
    ex._pal='e';ex.equip(ske);ex._pal='n';
    body(ske,'e');body(sk,'g');
  }else{
    ex._pal='n';ex.equip(sk);body(sk,'n');
    if(mode==='mus'){muscles(sk,ex.muscles.s,'ms');muscles(sk,ex.muscles.p,'mp');}
    if(mode==='tec'&&ex.guides&&ex.guides[view])ex.guides[view].call(ex,sk);
    if(mode==='traj'){
      const a=skel(ex.K[ex.ext[0]]),b=skel(ex.K[ex.ext[1]]);
      body(a,'g2');body(b,'g');
      const ts=concTimes(ex,36);
      const list=(ex.paths&&ex.paths[view])||[];
      list.forEach(([key,side,label],i)=>{
        const Q=ts.map(tt=>CTX.PJ(getPt(skel(poseAt(ex,ex.K,tt)),key,side)));
        const elbow=key==='E'||key==='S'||key==='K'||(key==='P'&&i>0);
        PATH2(Q,elbow?'pt2':'pt',elbow?1.2:1.8,{dash:elbow?'2.5 2':'',asz:elbow?3.4:4.4});
        if(label&&i===0)TX(Q[Q.length-1],label,{scr:true,cls:'lbl-p',dx:7,dy:-7});
      });
      const tw=ex.tower||(ex.towers&&ex.towers[0]);
      if(tw&&ex._liftRange&&view!=='top'&&Math.abs(CTX.PJ([tw.x,0,tw.z])[0]-CTX.PJ(sk.P)[0])>40){const base=[tw.x,0,tw.z];const pos=comb(1,base,18,ex.tower?ex.tower.ac:Z,-7,tw.out);const a3=add(pos,[0,36+ex._liftRange[0],0]),b3=add(pos,[0,36+ex._liftRange[1],0]);
        if(len(sub(CTX.PJ(a3),CTX.PJ(b3)))>4){ARROW3(a3,b3,'pt',1.4,'pta');ARROW3(b3,a3,'pt',1.4,'pta');TX(b3,'carga',{cls:'lbl-p',dx:5,dy:-4});}}
    }
  }
  return sk;
}

/* caixa de visualização por exercício/visão */
export function fit(ex,view){
  CTX.MEAS=[1e9,-1e9,1e9,-1e9];
  const n=24;
  for(let i=0;i<n;i++){const t=i/n*ex.T;scene(ex,view,'tec',t);scene(ex,view,'traj',t);ex.errors.forEach((e,j)=>{if(e.view===view)scene(ex,view,'err',t,j);});}
  const m=CTX.MEAS;CTX.MEAS=null;
  let x0=m[0],x1=m[1],y0=m[2],y1=Math.max(m[3],view==='top'?m[3]:0);
  const ov=ex.bounds&&ex.bounds[view];if(ov){[x0,x1,y0,y1]=ov;}
  let w=x1-x0,h=y1-y0;const pad=0.07;x0-=w*pad;x1+=w*pad;y0-=h*pad*1.6;y1+=h*pad*.6;w=x1-x0;h=y1-y0;
  // topo reservado para o HUD
  y0-=h*0.08;h=y1-y0;
  if(w/h>4/3){const nh=w*3/4;y0-=(nh-h)/2+ (nh-h)*0.1;h=nh;}else{const nw=h*4/3;x0-=(nw-w)/2;w=nw;}
  return[x0,y0,w,h];
}
export function calib(ex){
  ex._cab={};CTX.MEAS=[1e9,-1e9,1e9,-1e9];
  for(let i=0;i<60;i++)scene(ex,ex.views[0],'tec',i/60*ex.T);
  for(const e of ex.errors)for(let i=0;i<30;i++)scene(ex,e.view,'err',i/30*ex.T,ex.errors.indexOf(e));
  CTX.MEAS=null;ex.L0={};for(const k in ex._cab)ex.L0[k]=ex._cab[k]-10;ex._cab=null;
  // faixa de subida da pilha no ciclo correto
  if((ex.tower||ex.towers)&&!ex.noCable){let lo=1e9,hi=-1e9;for(let i=0;i<40;i++){const sk=skel(poseAt(ex,ex.K,i/40*ex.T));const t=ex.tower||ex.towers[0];const pul=comb(1,[t.x,0,t.z],t.py,Y,2,t.out);let at;
    if(ex.id==='remada-baixa'){const m=mid(sk.side.R.G,sk.side.L.G);at=add(m,mul(norm(sub(pul,m)),9));}
    else if(ex.ropeAttach)at=ropeC(sk,pul);
    else if(ex.barAttach)at=mid(sk.side.R.G,sk.side.L.G);
    else at=sk.side.R.G;
    const l=liftOf(ex,'a' in ex.L0?'a':'r',len(sub(at,pul)));lo=Math.min(lo,l);hi=Math.max(hi,l);}ex._liftRange=[lo,hi];}
}
