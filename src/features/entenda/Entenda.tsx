import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { POR_ID, type Musculo } from '../../domain/biblioteca';
import { NOME_MUSCULO } from '../../domain/gerador';
import { mensagemDeVolta } from '../../domain/acompanhamento/volta';
import { numeroBr } from '../../domain/numero';
import { NOME_NIVEL } from '../../domain/nivel';
import { carregarFrasesDasRegras, type FraseDaRegra } from '../../conteudo/frasesDasRegras';
import { carregarRegras } from '../../domain/regras/carregar';
import { RIR, VOLUME, type Regra } from '../../domain/regras';
import { sugestaoDoExercicio, textoCarga } from '../../domain/sessao';
import { inventarioPrincipal, perfilDe, primeiroPassoPendente } from '../../storage/esquema';
import { semanaDoEstado, semanaLeveDoEstado } from '../acompanhamento/acoes';
import { agoraIso, fusoDoAparelho, useApp } from '../app/estado';
import { Explicacoes, NavInferior, Selo, SeloFolha, Titulo, Topo } from '../app/ui';
import { ComoEsta } from '../programa/ComoEsta';
import { DefinicoesDoTreino } from '../programa/ComoLer';
import { hojeDoEstado, opcoesDaCarga } from '../treino/acoes';

// "Entenda o treino" (sessão de textos, 16/11/2026; decisão do Gustavo: "quero bem menos que isso"). As telas ficam só
// com o que se usa para treinar; a explicação de cada coisa, o nível de evidência e as fontes moram aqui, num lugar só
// (Meus dados → Entenda o treino). É a única página em que o selo e o "por quê?" aparecem (<Explicacoes>).
// O que veio para cá: "Como ler o seu treino" e "Sobre o programa" (do início), "Por que este exercício" (da folha do
// exercício), o motivo da carga sugerida (do treino e do fim do treino), a mensagem da semana e da volta, os "por quê?"
// do cadastro, o texto de segurança do guia e, no fim, todas as regras do app com as fontes.

const ACAO: Record<string, string> = {
  subir: 'Subir',
  manter: 'Manter',
  reduzir: 'Reduzir',
  voltar: 'Voltar à anterior',
  estagnado: 'Estagnado',
  ajustar: 'Ajustar',
  interromper: 'Trocar',
  calibrar: 'Acertar a carga',
};

function Bloco({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <details className="box dobra">
      <summary>{titulo}</summary>
      <div className="pilha bloco-entenda">{children}</div>
    </details>
  );
}

/** Uma frase de explicação com o selo da regra (um toque no selo abre a regra e as fontes). */
function Frase({ regra, children }: { regra: string; children: ReactNode }) {
  return (
    <li>
      {children} <Selo id={regra} />
    </li>
  );
}

const GRUPO_DA_REGRA: [RegExp, string][] = [
  [/^seguranca\./, 'Segurança'],
  [/^(volume|frequencia)\./, 'Volume e frequência'],
  [/^(rir|carga|reps|falha)\./, 'Esforço, carga e repetições'],
  [/^(progressao|readaptacao|deload|iniciante|acompanhamento)\./, 'Progressão, pausas e semana leve'],
  [/^(descanso|tempo)\./, 'Descanso e tempo do treino'],
  [/^(divisao|objetivo|nivel)\./, 'Divisão, objetivo e nível'],
  [/^(selecao|tecnica|cadencia|ordem|equipamento|local|avaliador|visao)\./, 'Exercícios, técnica e equipamento'],
  [/^(dados|privacidade|registro|treino)\./, 'O app: dados, privacidade e registro'],
];
const grupoDe = (id: string) => GRUPO_DA_REGRA.find(([re]) => re.test(id))?.[1] ?? 'Outras regras';

/** Todas as regras do app, com o nível de evidência e as fontes; baixadas quando o bloco abre. */
function TodasAsRegras() {
  const [regras, setRegras] = useState<Regra[] | null | 'erro'>(null);
  const [frases, setFrases] = useState<Record<string, FraseDaRegra>>({});
  useEffect(() => {
    let vivo = true;
    Promise.all([carregarRegras(), carregarFrasesDasRegras()]).then(
      ([r, f]) => {
        if (!vivo) return;
        setFrases(f);
        setRegras(Object.values(r));
      },
      () => vivo && setRegras('erro'),
    );
    return () => {
      vivo = false;
    };
  }, []);
  if (regras === null) return <p role="status">Carregando as regras…</p>;
  if (regras === 'erro') return <p role="status">Não deu para carregar as regras agora. Tente de novo com internet.</p>;
  const grupos = [...GRUPO_DA_REGRA.map(([, nome]) => nome), 'Outras regras'].map((nome) => ({ nome, lista: regras.filter((r) => grupoDe(r.id) === nome) })).filter((g) => g.lista.length);
  return (
    <>
      {grupos.map((g) => (
        <section key={g.nome} className="pilha" aria-label={g.nome}>
          <h3>
            {g.nome} ({g.lista.length})
          </h3>
          {g.lista.map((r) => (
            <details key={r.id} className="box dobra regra-do-catalogo" data-regra={r.id}>
              <summary>{frases[r.id]?.titulo ?? r.id}</summary>
              <SeloFolha regra={r} />
            </details>
          ))}
        </section>
      ))}
    </>
  );
}

export function Entenda() {
  const { estado, carregado, atualizar } = useApp();
  const navigate = useNavigate();
  const perfil = useMemo(() => perfilDe(estado), [estado]);
  if (!carregado) return null;
  const pendente = primeiroPassoPendente(estado);
  if (pendente && estado.programa) return <Navigate to={pendente.rota} replace />;
  const programa = estado.programa?.programa;
  const inventario = inventarioPrincipal(estado);
  const agora = agoraIso();
  const fuso = fusoDoAparelho();
  const hoje = programa ? hojeDoEstado(estado, agora, fuso) : null;
  const semana = programa ? semanaDoEstado(estado, agora, fuso) : null;
  const volta = hoje ? mensagemDeVolta(hoje) : null;
  const leve = programa ? semanaLeveDoEstado(estado, agora, fuso) : null;
  const abaixo = (semana?.musculos ?? []).filter((m) => m.planejado !== undefined);
  const fase = hoje?.fase ?? programa?.fases[0];
  // a carga sugerida é a de um treino que começasse agora, no local do programa (como a tela do treino a mostra)
  const opcoes = programa ? opcoesDaCarga(estado, { id: agora, inicio: agora, ...(hoje?.semanaLeve ? { semanaLeve: true } : {}) }, fuso) : {};
  const linhas = programa ? (Object.entries(programa.metas) as [Musculo, number][]).map(([m, meta]) => ({ m, meta, v: programa.volumeSemanal[m] ?? 0 })) : [];
  return (
    <div className={programa ? 'wrap app com-nav' : 'wrap app'}>
      <Topo voltar={{ para: '/dados', rotulo: 'Meus dados' }} />
      <main className="conteudo entenda">
        <Titulo>Entenda o treino</Titulo>
        <Explicacoes>
          <Bloco titulo="Como ler o treino">
            <DefinicoesDoTreino iniciante={perfil?.nivel === 'iniciante'} />
          </Bloco>

          {programa && perfil && (
            <Bloco titulo="O seu programa">
              <ul className="fichas" aria-label="Resumo">
                <li>{perfil.diasSemana}x por semana</li>
                <li>até {perfil.minutosSessao} min</li>
                <li>{NOME_NIVEL[perfil.nivel]}</li>
                <li>{programa.divisao}</li>
              </ul>
              {fase && hoje && (
                <p className="fase">
                  <b>Semana {hoje.semana}.</b> {fase.texto} <Selo id={fase.regraId} />
                </p>
              )}
              {inventario && <ComoEsta programa={programa} perfil={perfil} inventario={inventario} />}
              {estado.ajustes?.recolhido && !estado.sessaoAtual && (
                <button
                  type="button"
                  className="btn sec"
                  onClick={() => {
                    atualizar((s) => ({ ...s, ajustes: { recolhido: false } }));
                    navigate('/programa');
                  }}
                >
                  Ver ajustes possíveis
                </button>
              )}
              {programa.avisos.length > 0 && (
                <details className="box dobra">
                  <summary>Avisos ({programa.avisos.length})</summary>
                  <div className="avisos-lista">
                    {programa.avisos.map((a, i) => (
                      <div key={i} className="warnbox">
                        {a.texto} <Selo id={a.regraId} />
                      </div>
                    ))}
                  </div>
                </details>
              )}
              {programa.fases.length > 0 && (
                <details className="box dobra">
                  <summary>Fases ({programa.fases.length})</summary>
                  <ul className="lista">
                    {programa.fases.map((f) => (
                      <li key={f.semanas}>
                        <b>{/^\d/.test(f.semanas) ? `Semana ${f.semanas}` : f.semanas}:</b> {f.texto} <Selo id={f.regraId} />
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              <details className="box dobra">
                <summary>Por que este programa ({programa.porque.length})</summary>
                <ul className="lista">
                  {programa.porque.map((q) => (
                    <li key={q.regraId}>
                      {q.texto} <Selo id={q.regraId} />
                    </li>
                  ))}
                </ul>
              </details>
              <details className="box dobra">
                <summary>Séries por músculo</summary>
                <p className="ajuda">
                  Séries indiretas contam como meia série. <Selo id="volume.serie-indireta.peso" />
                </p>
                <table className="vol">
                  <thead>
                    <tr>
                      <th scope="col">Músculo</th>
                      <th scope="col">Meta</th>
                      <th scope="col">Programa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linhas.map(({ m, meta, v }) => (
                      <tr key={m} className={v < meta ? 'abaixo' : undefined}>
                        <th scope="row">{NOME_MUSCULO[m]}</th>
                        <td>{meta}</td>
                        <td>
                          {numeroBr(v)}
                          {v < meta && <span className="sr"> (abaixo da meta)</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </Bloco>
          )}

          {programa && inventario && (
            <Bloco titulo="Os exercícios: por que cada um e a próxima carga">
              {(hoje?.dias ?? programa.dias).map((d) => (
                <section key={d.id} className="pilha" aria-label={d.nome}>
                  <h3>{d.nome}</h3>
                  {d.exercicios.map((x) => {
                    const s = sugestaoDoExercicio(estado.historico, x, inventario, opcoes);
                    return (
                      <details key={x.exId} className="box dobra">
                        <summary>{POR_ID[x.exId]?.nome ?? x.nome}</summary>
                        <p>
                          <b>
                            {ACAO[s.acao] ?? s.acao}
                            {s.proxima ? `: ${textoCarga(s.proxima, x.exId)}` : ''}.
                          </b>{' '}
                          {s.motivo} <Selo id={s.regraId} />
                        </p>
                        <ul className="lista">
                          {x.porque.map((q) => (
                            <li key={q.regraId}>
                              {q.texto} <Selo id={q.regraId} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    );
                  })}
                </section>
              ))}
            </Bloco>
          )}

          {(semana || volta) && (
            <Bloco titulo="A sua semana e as pausas">
              {semana && (
                <p>
                  {semana.mensagem} <Selo id={semana.regraId} />
                </p>
              )}
              {volta && (
                <p>
                  <b>{volta.titulo}</b> {volta.texto} <Selo id={volta.regraId} />
                </p>
              )}
              {semana?.revisao && (
                <p>
                  <b>Um programa com menos dias?</b> {semana.revisao.texto} Ele cabe melhor e rende o mesmo por treino. O programa só muda se você
                  escolher. <Selo id={semana.revisao.regraId} />
                </p>
              )}
              {leve?.mostrar && (
                <p>
                  <b>Semana leve sugerida.</b> Motivo: {leve.motivos.join('; ')}. {leve.texto} <Selo id={leve.regraId} />
                </p>
              )}
              {abaixo.length > 0 && (
                <>
                  <h3>Músculos que o programa planeja abaixo da meta</h3>
                  <ul className="lista">
                    {abaixo.map((m) => (
                      <li key={m.musculo}>
                        {m.nome.charAt(0).toUpperCase() + m.nome.slice(1)}: {numeroBr(m.planejado!)} de {numeroBr(m.meta)} ({m.motivo}).
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <h3>Como ler o quadro da semana</h3>
              <ul className="lista">
                <Frase regra="rir.serie-efetiva">
                  Conta a série com até {RIR.serieEfetivaMax} repetições de reserva e amplitude completa; a série que trabalha o músculo de forma
                  indireta vale meia. {semana?.metaPrescrita ? 'Nesta semana, a meta é o que o programa prescreveu para ela.' : 'A meta é a do seu programa.'}
                </Frase>
                <Frase regra="acompanhamento.semana">
                  A barra é o que foi feito; o traço tracejado é a meta. Cheio: na meta · médio: crescendo ({VOLUME.minimoEficazPiso} séries ou mais) ·
                  claro: mantendo · vazio: ainda sem treino na semana. A semana conta os treinos de qualquer local.
                </Frase>
                <Frase regra="deload.semana-leve">
                  A semana leve é sugerida quando o treino pesa demais ou para de progredir; é opcional e serve para descansar, não para crescer.
                </Frase>
                <Frase regra="acompanhamento.evolucao">
                  Na evolução de um exercício, cada linha é a melhor série daquele treino. Nas máquinas, cada local tem a sua lista: a placa de uma
                  torre não pesa o mesmo que a de outra.
                </Frase>
              </ul>
            </Bloco>
          )}

          <Bloco titulo="Por que o app pergunta e sugere">
            <h3>No cadastro</h3>
            <ul className="lista">
              <Frase regra="seguranca.triagem">
                Treinar é seguro para a maioria das pessoas. As perguntas de saúde veem se vale falar com um profissional antes. Um “sim” não impede
                o treino; pede uma avaliação antes do programa automático.
              </Frase>
              <Frase regra="nivel.classificacao">O nível sai do tempo de treino, das pausas e da confiança na técnica. Na dúvida, o app classifica para baixo.</Frase>
              <Frase regra="divisao.seis-dias">Com 2 a 6 dias dá para treinar cada músculo cerca de 2 vezes por semana.</Frase>
              <Frase regra="volume.prioridade.ate-dois">
                Os grupos prioritários recebem mais séries; os outros ficam no mínimo que já gera resultado. Escolha até 2: com mais, o foco se divide.
              </Frase>
              <Frase regra="objetivo.pergunta">
                O treino é de força em todos os objetivos. Só "ficar mais forte" muda números: menos repetições e mais descanso nos exercícios grandes. O
                app não cuida de alimentação nem de cardio.
              </Frase>
              <Frase regra="divisao.equivalencia">Com o mesmo volume, as divisões rendem o mesmo crescimento. Se você não escolher, o app usa a recomendada.</Frase>
              <Frase regra="equipamento.atalhos">Escolher o lugar marca os itens típicos dele; a 1ª série de cada exercício acerta a carga.</Frase>
              <Frase regra="equipamento.menor-anilha">A menor anilha é o passo para subir a carga nas máquinas e nas barras. Sem resposta, o app usa 2 kg.</Frase>
            </ul>
            <h3>No treino</h3>
            <ul className="lista">
              <Frase regra="tempo.aquecimento">Antes do 1º exercício de cada grupo, 1–2 séries leves de aquecimento, que não contam.</Frase>
              <Frase regra="progressao.calibracao">Na 1ª vez de um exercício, o app acerta a carga série a série, pelo que você registra.</Frase>
              <Frase regra="rir.leitura">
                RIR é “repetições na reserva”: quantas repetições ainda sobravam quando você parou. RIR 2 quer dizer que dava para fazer mais 2. A maioria
                das pessoas acha que tem menos reserva do que tem.
              </Frase>
              <Frase regra="tempo.drop-set">No drop set, logo depois da série, você tira parte da carga e faz mais repetições, sem descansar.</Frase>
              <Frase regra="selecao.preferencia">O “prefiro este” vale entre exercícios que fazem a mesma função; a dor sempre manda.</Frase>
              <Frase regra="tempo.corte">Quando o treino não cabe no tempo ou um músculo fica abaixo da meta, o app oferece ajustes; nada muda sem a sua escolha.</Frase>
              <Frase regra="local.treino-do-dia">
                O programa é montado para o local principal; nos outros, o treino do dia troca cada aparelho que não houver pelo equivalente, e diz o motivo.
              </Frase>
              <Frase regra="registro.treino-feito">Um treino sem nenhuma série não conta, e o próximo continua sendo o mesmo dia.</Frase>
            </ul>
            <h3>Os seus dados</h3>
            <ul className="lista">
              <Frase regra="dados.instalar-iphone">
                No iPhone, o Safari apaga os dados de um site depois de 7 dias sem abri-lo. Instalado na tela de início, o app não entra nessa
                contagem. Se já tem treinos, exporte uma cópia antes: o app instalado pode começar vazio, e aí é só importar.
              </Frase>
              <Frase regra="dados.copia">
                Os dados ficam só neste aparelho, e o navegador pode apagá-los. A cópia exportada tem tudo o que está aqui e pode ser importada
                depois, em “Meus dados”.
              </Frase>
              <Frase regra="dados.persistente">
                O app pede ao navegador para não apagar os dados por falta de espaço; o navegador decide e pode negar. Instalar o app ajuda;
                exportar uma cópia protege.
              </Frase>
              <li>
                Quando o aparelho recusa gravar (sem espaço ou em aba anônima), o que você registrar pode se perder ao fechar o app; por isso o
                aviso oferece exportar na hora.
              </li>
            </ul>
          </Bloco>

          <Bloco titulo="Segurança">
            <p>
              O app não diagnostica e não substitui um médico ou um profissional de Educação Física. É uma ferramenta de orientação, não uma
              prescrição. <Selo id="seguranca.sem-diagnostico" />
            </p>
            <p>Dor muscular de treino é esperada: queimação durante a série e dolorimento difuso por 1–3 dias.</p>
            <p>
              <b>Pare o exercício</b> e procure avaliação (fisioterapeuta ou médico do esporte) se aparecer dor articular forte ou em pontada,
              formigamento, perda de força incomum ou sensação de lesão. Nesses casos, não continue achando que é normal.
            </p>
            <p>
              As animações usam um modelo simplificado com medidas aproximadas e não substituem uma avaliação presencial. A sensação muscular sozinha
              não prova que a execução está certa: confira também a montagem, a trajetória e a amplitude.
            </p>
            <ul className="lista">
              <Frase regra="seguranca.dor.programa">
                Para cada região com problema, o app pergunta a dor de hoje. Acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o
                app prefere outros; até 2, o programa fica normal, com um lembrete.
              </Frase>
              <Frase regra="seguranca.montagem">Exercício com barra, rack, fita ou barra fixa traz a montagem segura antes da série.</Frase>
            </ul>
          </Bloco>

          <Bloco titulo="Todas as regras e as fontes">
            <TodasAsRegras />
          </Bloco>
        </Explicacoes>
      </main>
      {programa && <NavInferior atual="dados" />}
    </div>
  );
}
