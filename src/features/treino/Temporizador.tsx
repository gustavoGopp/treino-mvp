import { useEffect, useRef, useState } from 'react';

// Temporizador de descanso, portado do guia original (referencia/guia-execucao-fase1.html):
// bipes (Web Audio), vibração, tela ligada (Wake Lock, melhor esforço) e ±15 s.
// Conta pelo horário de término, não por tique: continua certo se a tela bloquear (docs/pesquisa/10-decisoes-m5.md, 8).

type Estado = { fim: number; dur: number } | null;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function useDescanso() {
  const [estado, setEstado] = useState<Estado>(null);
  const [agora, setAgora] = useState(() => Date.now());
  const audio = useRef<AudioContext | null>(null);
  const bipes = useRef<OscillatorNode[]>([]);
  const trava = useRef<{ release: () => Promise<void> } | null>(null);
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
  const pedirTelaLigada = () => {
    try {
      const wl = (navigator as unknown as { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } }).wakeLock;
      if (wl && !trava.current) void wl.request('screen').then((l) => (trava.current = l)).catch(() => {});
    } catch {
      /* melhor esforço */
    }
  };
  const soltarTela = () => {
    void trava.current?.release().catch(() => {});
    trava.current = null;
  };

  const iniciar = (seg: number) => {
    vibrou.current = false;
    setEstado({ fim: Date.now() + seg * 1000, dur: seg });
    agendarBipes(seg);
    pedirTelaLigada();
  };
  const ajustar = (d: number) =>
    setEstado((e) => {
      if (!e) return e;
      const n = { fim: e.fim + d * 1000, dur: Math.max(5, e.dur + d) };
      const resta = (n.fim - Date.now()) / 1000;
      if (resta > 0) {
        vibrou.current = false;
        agendarBipes(resta);
      }
      return n;
    });
  const parar = () => {
    pararBipes();
    soltarTela();
    setEstado(null);
  };

  useEffect(() => {
    if (!estado) return;
    const id = setInterval(() => setAgora(Date.now()), 250);
    return () => clearInterval(id);
  }, [estado]);
  useEffect(
    () => () => {
      bipes.current.forEach((o) => {
        try {
          o.stop(0);
        } catch {
          /* já parou */
        }
      });
      void trava.current?.release().catch(() => {});
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
