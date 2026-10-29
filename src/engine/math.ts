// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.

/* ================= matemática ================= */
export const RAD=Math.PI/180;
export const sn=d=>Math.sin(d*RAD), cs=d=>Math.cos(d*RAD);
export const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
export const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
export const mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k];
export const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const len=a=>Math.hypot(a[0],a[1],a[2]);
export const norm=a=>{const l=len(a)||1;return[a[0]/l,a[1]/l,a[2]/l];};
export const mid=(a,b)=>mul(add(a,b),.5);
export function comb(){let r=[0,0,0];for(let i=0;i<arguments.length;i+=2){const k=arguments[i],v=arguments[i+1];r=[r[0]+k*v[0],r[1]+k*v[1],r[2]+k*v[2]];}return r;}
// direção por azimute/elevação, com lado (s=-1 direito, +1 esquerdo). az 0 = frente, 90 = para fora, 180 = trás. el +90 = cima.
export const dirAE=(az,el,s)=>[s*sn(az)*cs(el),sn(el),cs(az)*cs(el)];
// tronco: pitch (positivo = inclina à frente), roll (positivo = inclina para a esquerda, +X)
export const tUp=(p,r)=>[cs(p)*sn(r),cs(p)*cs(r),sn(p)];
export const tFr=(p,r)=>[-sn(p)*sn(r),-sn(p)*cs(r),cs(p)];
export const sideV=(v,s)=>[s*v[0],v[1],v[2]];
export const X=[1,0,0],Y=[0,1,0],Z=[0,0,1];
