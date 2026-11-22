import { useEffect, useRef, useState, type ReactNode } from 'react';

// Temporizador de descanso, portado do guia original (referencia/guia-execucao-fase1.html):
// três bipes (desde o lote M4, um som de arquivo), vibração e ±15 s. A tela ligada vale para o treino todo (useTelaAcesa, abaixo).
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

const SOM_FIM = '/sons/fim-descanso.wav'; // gerado por scripts/som/gerar-fim-descanso.mjs
const ATRASO_MAXIMO_MS = 5000;
const hora = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });

// Lote M4 (22/11/2026): o aviso de fim é um som de arquivo, e não mais bipes gerados pelo Web Audio. No iPhone, o som
// gerado pelo site entra na categoria "ambiente" e é calado pela chave do silencioso; o de arquivo (<audio>) não é
// (WebKit, bugs 237322 e 252746, lidos em 22/11/2026). O elemento é criado e carregado dentro do toque que começa o
// descanso, porque o iPhone só deixa tocar depois o elemento que um toque da pessoa preparou. É um só para o app
// inteiro: o guia, aberto no meio do descanso, toca o mesmo elemento que o toque no treino preparou.
let som: HTMLAudioElement | null = null;
function prepararSom() {
  if (som) return som;
  try {
    const a = new Audio(SOM_FIM);
    a.preload = 'auto';
    a.load();
    som = a;
  } catch {
    /* sem áudio: ficam a vibração e a tela que inverte */
  }
  return som;
}

/** `treino`: o id do treino em andamento (a chave do descanso guardado). */
export function useDescanso(treino = '') {
  const [estado, setEstado] = useState<Estado>(() => lerDescanso(treino));
  const [agora, setAgora] = useState(() => Date.now());
  const alarme = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const vibrou = useRef(false);

  const desmarcarSom = () => {
    clearTimeout(alarme.current);
    alarme.current = undefined;
  };
  const marcarSom = (seg: number) => {
    desmarcarSom();
    const a = prepararSom();
    if (!a) return;
    const fim = Date.now() + Math.max(0, seg) * 1000;
    alarme.current = setTimeout(() => {
      // Página que ficou parada em segundo plano acorda com o relógio atrasado: som fora de hora não avisa nada.
      if (Date.now() - fim > ATRASO_MAXIMO_MS) return;
      try {
        a.currentTime = 0;
        void a.play().catch(() => {});
      } catch {
        /* sem áudio */
      }
    }, Math.max(0, seg) * 1000);
  };

  const iniciar = (seg: number) => {
    vibrou.current = false;
    const novo = { fim: Date.now() + seg * 1000, dur: seg };
    guardarDescanso(treino, novo);
    setEstado(novo);
    marcarSom(seg);
  };
  const ajustar = (d: number) =>
    setEstado((e) => {
      if (!e) return e;
      const n = { fim: e.fim + d * 1000, dur: Math.max(5, e.dur + d) };
      const resta = (n.fim - Date.now()) / 1000;
      if (resta > 0) {
        vibrou.current = false;
        marcarSom(resta);
      } else desmarcarSom(); // passou de zero: o som marcado para o horário antigo não toca mais
      guardarDescanso(treino, n);
      return n;
    });
  const parar = () => {
    desmarcarSom();
    som?.pause();
    guardarDescanso(treino, null);
    setEstado(null);
  };

  useEffect(() => {
    if (!estado) return;
    const id = setInterval(() => setAgora(Date.now()), 250);
    return () => clearInterval(id);
  }, [estado]);
  // Descanso que veio guardado (a pessoa voltou do guia): o som é marcado de novo para o tempo que falta.
  useEffect(() => {
    const guardado = lerDescanso(treino);
    const falta = guardado ? (guardado.fim - Date.now()) / 1000 : 0;
    if (falta > 0) marcarSom(falta);
    // só na montagem: depois, quem marca é iniciar e ajustar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Ao sair da tela, o som marcado é desmarcado: quem toca é a tela que estiver aberta (o treino ou o guia).
  useEffect(() => () => clearTimeout(alarme.current), []);

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
  return { ativo: !!estado, resta, dur: estado?.dur ?? 0, fim: estado?.fim ?? 0, iniciar, ajustar, parar };
}

/**
 * O descanso toma a tela (frontend novo, 12/11/2026): o relógio é o maior elemento, para ler com o celular no chão.
 * O rótulo diz a hora do fim ("Descanso até 14:32", lote M4): quem olha o celular bloqueado ou outro app sabe quando voltar.
 * Quando o tempo acaba, a tela do treino inteira inverte (quem monta decide) e o rótulo vira "Hora da próxima série":
 * o aviso não depende de cor nem só do som. `children` é o que vem a seguir; `acao`, o botão principal, que fica por último, perto do polegar.
 */
export function PainelDescanso({ d, children, acao }: { d: ReturnType<typeof useDescanso>; children?: ReactNode; acao?: ReactNode }) {
  return d.ativo ? <Painel d={d} children={children} acao={acao} /> : null;
}

function Painel({ d, children, acao }: { d: ReturnType<typeof useDescanso>; children?: ReactNode; acao?: ReactNode }) {
  // Pacote D2 (22/11/2026): depois de salvar a série, o foco caía no corpo da página (o botão tocado some). Agora vai
  // para o descanso, que é o que tomou a tela: o leitor de tela anuncia "Descanso", e a tecla Tab segue dali.
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);
  const acabou = d.resta <= 0;
  return (
    <section ref={ref} tabIndex={-1} className={`descanso${acabou ? ' acabou' : ''}`} aria-label="Descanso">
      <div className="descanso-topo">
        <span>{acabou ? 'Hora da próxima série' : `Descanso até ${hora.format(d.fim)}`}</span>
        <span className="tclock-mini" role="timer" aria-live="off">
          {acabou ? `+${fmt(-d.resta)}` : fmt(Math.ceil(d.resta))}
        </span>
        <div className="tbar" aria-hidden="true">
          <i style={{ width: `${acabou ? 100 : (100 * (1 - d.resta / d.dur)).toFixed(1)}%` }} />
        </div>
      </div>
      {children && <div className="descanso-seguir">{children}</div>}
      <div className={`tctl${acabou ? ' so-um' : ''}`}>
        {!acabou && (
          <>
            <button type="button" onClick={() => d.ajustar(-15)}>
              −15 s
            </button>
            <button type="button" onClick={() => d.ajustar(15)}>
              +15 s
            </button>
          </>
        )}
        <button type="button" onClick={d.parar}>
          {acabou ? 'Ok' : 'Pular'}
        </button>
      </div>
      {acao}
      {acabou && (
        <p className="sr" role="status">
          Descanso terminado.
        </p>
      )}
    </section>
  );
}
