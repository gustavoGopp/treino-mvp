// @ts-nocheck
// Mesma verificação de IK do guia original (window.__guia.check).
import { poseAt } from './cena';
import { CTX } from './contexto';
import { skel } from './esqueleto';
import { EX } from './exercicios';

export function check() {
  const out = [];
  for (const ex of EX) {
    CTX.IKFAIL = 0;
    for (let i = 0; i < 80; i++) skel(poseAt(ex, ex.K, (i / 80) * ex.T));
    const ok = CTX.IKFAIL;
    CTX.IKFAIL = 0;
    const errs = ex.errors.map((e) => {
      CTX.IKFAIL = 0;
      for (let i = 0; i < 80; i++) skel(poseAt(ex, e.K, (i / 80) * ex.T));
      return e.id + ':' + CTX.IKFAIL;
    });
    out.push(ex.id + ' ik=' + ok + ' errs ' + errs.join(' ') + ' L0=' + JSON.stringify(ex.L0) + ' lift=' + JSON.stringify(ex._liftRange));
  }
  return out;
}
