import { useEffect, useRef, useState } from 'react';

// Temporizador de descanso, portado do guia original (referencia/guia-execucao-fase1.html):
// bipes (Web Audio), vibração e ±15 s. A tela ligada vale para o treino todo (useTelaAcesa, abaixo).
// Conta pelo horário de término, não por tique: continua certo se a tela bloquear (docs/pesquisa/10-decisoes-m5.md, 8).

type Estado = { fim: number; dur: number } | null;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

type Trava = { release: () => Promise<void> };
type WakeLock = { request: (t: 'screen') => Promise<Trava> };

/**
 * Tela ligada durante o treino todo (redesign, lote 2; antes, só no descanso): o celular não apaga entre as séries,
 * com o app aberto na mão ou no banco. Pede o Wake Lock ao abrir o treino, pede de novo ao voltar para o app (o
 * sistema solta a trava quando o app sai da tela) e solta ao sair do treino. Sem suporte, não faz nada.
 */
export function useTelaAcesa(ligada = true) {
  useEffect(() => {
    const wl = (navigator as unknown as { wakeLock?: WakeLock }).wakeLock;
    if (!wl || !ligada) return;
    let trava: Trava | null = null;
    let vivo = true;
    const pedir = () => {
      if (document.visibilityState !== 'visible' || trava) return;
      void wl
        .request('screen')
        .then((t) => {
          if (vivo) trava = t;
          else void t.release().catch(() => {});
          (t as unknown as EventTarget).addEventListener?.('release', () => {
            if (trava === t) trava = null;
          });
        })
        .catch(() => {});
    };
    pedir();
    document.addEventListener('visibilitychange', pedir);
    return () => {
      vivo = false;
      document.removeEventListener('visibilitychange', pedir);
      void trava?.release().catch(() => {});
    };
  }, [ligada]);
}

// O descanso em curso fica guardado na sessão do navegador (só o horário de término e a duração, nada do treino), para
// sobreviver à ida ao guia e a um recarregar: antes, sair da tela do treino no meio do descanso parava o temporizador.
// A chave leva o id do treino: o descanso de um treino nunca aparece em outro.
const CHAVE_DESCANSO = 'treino-mvp:descanso';
function lerDescanso(treino: string): Estado {
  try {
    const d = JSON.parse(sessionStorage.getItem(CHAVE_DESCANSO) ?? 'null') as { treino?: string; fim?: number; dur?: number } | null;
    return d && d.treino === treino && typeof d.fim === 'number' && typeof d.dur === 'number' ? { fim: d.fim, dur: d.dur } : null;
  } catch {
    return null;
  }
}
function guardarDescanso(treino: string, e: Estado) {
  try {
    if (e) sessionStorage.setItem(CHAVE_DESCANSO, JSON.stringify({ treino, ...e }));
    else sessionStorage.removeItem(CHAVE_DESCANSO);
  } catch {
    // sem sessionStorage: o descanso vale só enquanto a tela estiver aberta, como antes
  }
}

/** `treino`: o id do treino em andamento (a chave do descanso guardado). */
export function useDescanso(treino = '') {
  const [estado, setEstado] = useState<Estado>(() => lerDescanso(treino));
  const [agora, setAgora] = useState(() => Date.now());
  const audio = useRef<AudioContext | null>(null);
  const bipes = useRef<OscillatorNode[]>([]);
  const vibrou = useRef(false);

  const pararBipes = () => {
    bipes.current.forEach((o) => {
      try {
        o.stop(0);
      } catch {
        /* já parou */
      }
    });
    bipes.current = [];
  };
  const agendarBipes = (seg: number) => {
    pararBipes();
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      audio.current ??= new AC();
      const c = audio.current;
      if (c.state === 'suspended') void c.resume();
      const t0 = c.currentTime + Math.max(0, seg);
      [0, 0.35, 0.7].forEach((d, i) => {
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = 'sine';
        o.frequency.value = i === 2 ? 1175 : 880;
        g.gain.setValueAtTime(0.0001, t0 + d);
        g.gain.exponentialRampToValueAtTime(0.4, t0 + d + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + d + 0.26);
        o.connect(g);
        g.connect(c.destination);
        o.start(t0 + d);
        o.stop(t0 + d + 0.3);
        bipes.current.push(o);
      });
    } catch {
      /* sem áudio: fica a vibração e o relógio */
    }
  };

  const iniciar = (seg: number) => {
    vibrou.current = false;
    const novo = { fim: Date.now() + seg * 1000, dur: seg };
    guardarDescanso(treino, novo);
    setEstado(novo);
    agendarBipes(seg);
  };
  const ajustar = (d: number) =>
    setEstado((e) => {
      if (!e) return e;
      const n = { fim: e.fim + d * 1000, dur: Math.max(5, e.dur + d) };
      const resta = (n.fim - Date.now()) / 1000;
      if (resta > 0) {
        vibrou.current = false;
        agendarBipes(resta);
      } else pararBipes(); // passou de zero: os bipes agendados para o horário antigo não tocam mais
      guardarDescanso(treino, n);
      return n;
    });
  const parar = () => {
    pararBipes();
    guardarDescanso(treino, null);
    setEstado(null);
  };

  useEffect(() => {
    if (!estado) return;
    const id = setInterval(() => setAgora(Date.now()), 250);
    return () => clearInterval(id);
  }, [estado]);
  // Descanso que veio guardado (a pessoa voltou do guia): os bipes são agendados de novo para o tempo que falta.
  useEffect(() => {
    const guardado = lerDescanso(treino);
    const falta = guardado ? (guardado.fim - Date.now()) / 1000 : 0;
    if (falta > 0) agendarBipes(falta);
    // só na montagem: depois, quem agenda é iniciar e ajustar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Ao sair da tela: os bipes param e o contexto de áudio é fechado (antes, ficava um aberto a cada entrada no treino).
  useEffect(
    () => () => {
      bipes.current.forEach((o) => {
        try {
          o.stop(0);
        } catch {
          /* já parou */
        }
      });
      bipes.current = [];
      void audio.current?.close().catch(() => {});
      audio.current = null;
    },
    [],
  );

  const resta = estado ? (estado.fim - agora) / 1000 : 0;
  const acabou = !!estado && resta <= 0;
  useEffect(() => {
    if (!acabou || vibrou.current) return;
    vibrou.current = true;
    try {
      navigator.vibrate?.([250, 120, 250, 120, 400]);
    } catch {
      /* sem vibração */
    }
  }, [acabou]);
  return { ativo: !!estado, resta, dur: estado?.dur ?? 0, iniciar, ajustar, parar };
}

export function PainelDescanso({ d }: { d: ReturnType<typeof useDescanso> }) {
  if (!d.ativo) return null;
  const acabou = d.resta <= 0;
  return (
    <section className={`descanso${acabou ? ' acabou' : ''}`} aria-label="Descanso">
      <div className="descanso-topo">
        <span>{acabou ? 'Hora da próxima série' : 'Descanso'}</span>
        <span className="tclock-mini" role="timer" aria-live="off">
          {acabou ? `+${fmt(-d.resta)}` : fmt(Math.ceil(d.resta))}
        </span>
      </div>
      <div className="tbar" aria-hidden="true">
        <i style={{ width: `${acabou ? 100 : (100 * (1 - d.resta / d.dur)).toFixed(1)}%` }} />
      </div>
      <div className="tctl">
        <button type="button" onClick={() => d.ajustar(-15)}>
          −15 s
        </button>
        <button type="button" onClick={() => d.ajustar(15)}>
          +15 s
        </button>
        <button type="button" onClick={d.parar}>
          {acabou ? 'Ok' : 'Pular'}
        </button>
      </div>
      {acabou && (
        <p className="sr" role="status">
          Descanso terminado.
        </p>
      )}
    </section>
  );
}
