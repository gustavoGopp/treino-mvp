import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { textoUltimaCopia } from '../../domain/dados';
import { importarJson } from '../../storage/arquivo';
import { consultarPersistencia, lerBruto, lerIlegivel } from '../../storage/idb';
import { AvisoSalvar } from '../app/avisos';
import { baixarCopia } from '../app/copia';
import { agoraIso, useApp } from '../app/estado';
import { apagarLocal, apagarTodosLocais, dataCurta, lerLocal, LOCAL } from '../app/local';
import { AvisarProblema, TextoAvisoCurto, TextoFotoCurto } from '../app/privacidade';
import { AVISO_CHAVE, avisoDisponivel, desligarAviso, estadoDoAviso, ligarAviso } from '../treino/aviso';
import { Icone } from '../app/icones';
import { NavInferior, PorQue, Titulo, Topo } from '../app/ui';
import { Folha } from '../app/Folha';
import { EscolhaEstiloBoneco } from './EstiloBoneco';
import { apagarEstiloBoneco, useEstiloBoneco } from '../app/estiloBoneco';

// Meus dados: exportar e importar em JSON, apagar tudo e refazer a triagem. Nada sai do aparelho sem a pessoa.
// R5c: a data da última cópia (dados.copia), o aviso quando o navegador nega o armazenamento persistente
// (dados.persistente), a autorização da foto (privacidade.foto), os termos e o "Avisar um problema".
// Lote 5 do redesign: 3 grupos de linhas (Programa, Cópia de segurança, Saúde e privacidade) e "Apagar todos os dados"
// por último, confirmado num diálogo.
const OBJETIVO = { cutting: 'Manter o músculo enquanto perco peso', forca: 'Ficar mais forte', saude: 'Saúde e disposição', hipertrofia: 'Ganhar músculo' } as const;
export function Dados() {
  const { estado, carregado, persistente, erroCarga, cargaFalhou, substituir, limpar } = useApp();
  const navigate = useNavigate();
  const estilo = useEstiloBoneco();
  const arquivo = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');
  // lote 5 do redesign: cópia, estilo e apagar abrem em folhas; apagar é o único diálogo de confirmação
  const [folha, setFolha] = useState<'estilo' | 'guardar' | 'trazer' | 'foto' | 'aviso' | 'apagar' | null>(null);
  const [aviso, setAviso] = useState(estadoDoAviso);
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [ultimaCopia, setUltimaCopia] = useState(() => lerLocal(LOCAL.ultimaCopia));
  const [fotoEm, setFotoEm] = useState(() => lerLocal(LOCAL.fotoConsentimento));
  const [consultada, setConsultada] = useState<boolean | null>(null);
  useEffect(() => {
    // Só consulta (não pede): o pedido acontece quando a pessoa salva algo (estado.tsx).
    let vivo = true;
    void consultarPersistencia().then((p) => vivo && setConsultada(p));
    return () => {
      vivo = false;
    };
  }, []);
  // O dado antigo que o app não leu: ainda na chave principal (cargaFalhou) ou já guardado à parte, depois de um salvar.
  const [temIlegivel, setTemIlegivel] = useState(false);
  useEffect(() => {
    let vivo = true;
    lerIlegivel()
      .then((b) => vivo && setTemIlegivel(b !== undefined))
      .catch(() => undefined);
    return () => {
      vivo = false;
    };
  }, [cargaFalhou]);
  // a resposta de uma ação (exportado, importado, autorização retirada) aparece presa acima da navegação e some sozinha
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(''), 8000);
    return () => clearTimeout(t);
  }, [msg]);
  if (!carregado) return null;
  const guardaPermanente = persistente ?? consultada;

  const temDados = Object.keys(estado).length > 1;

  const exportar = () => {
    baixarCopia(estado);
    setUltimaCopia(lerLocal(LOCAL.ultimaCopia));
    setErro('');
    setMsg('Arquivo exportado. Guarde-o num lugar seguro: ele tem seus dados de saúde.');
  };

  const exportarNaoLido = async () => {
    setMsg('');
    try {
      const bruto = cargaFalhou ? await lerBruto() : await lerIlegivel();
      if (bruto === undefined) {
        setErro('Não há dados antigos guardados neste aparelho.');
        return;
      }
      baixarCopia(bruto);
      setErro('');
      setMsg('Arquivo exportado com os dados que o app não conseguiu ler. Guarde-o: ele tem seus dados de saúde.');
    } catch {
      setErro('Não foi possível ler os dados deste aparelho.');
    }
  };

  /** Devolve true quando importou (a folha fecha e a mensagem aparece na página). */
  const importar = async () => {
    const f = arquivo.current?.files?.[0];
    if (!f) {
      setErro('Escolha um arquivo exportado pelo treino-mvp.');
      return false;
    }
    const r = importarJson(await f.text());
    if (!r.ok) {
      setMsg('');
      setErro(`Não foi possível importar. ${r.erro} Seus dados atuais não foram alterados.`);
      return false;
    }
    substituir(r.estado);
    setErro('');
    setMsg('Dados importados.');
    if (arquivo.current) arquivo.current.value = '';
    setNomeArquivo('');
    return true;
  };

  const apagar = async () => {
    await limpar();
    apagarTodosLocais();
    void desligarAviso(); // o endereço de aviso deste aparelho também some
    apagarEstiloBoneco();
    setFolha(null);
    // a abertura diz que apagou (pacote D2): antes a pessoa caía nela sem nenhuma palavra sobre o que aconteceu
    navigate('/', { state: { apagou: true } });
  };

  const r = estado.rotina;
  const locais = estado.locais ?? [];
  const evitando = (estado.restricoes?.evitarExercicios.length ?? 0) + (estado.restricoes?.evitarEquipamentos.length ?? 0);
  const erroNaPagina = erro && folha !== 'trazer';

  return (
    <div className={estado.programa ? 'wrap app com-nav' : 'wrap app'}>
      <Topo direita={estado.programa ? undefined : <Link to="/">Início</Link>} />
      <main className="conteudo dados">
        <AvisoSalvar />
        <Titulo>Meus dados</Titulo>
        <p className="ajuda">
          Tudo fica guardado só neste aparelho.{' '}
          {/* o texto da foto, com o selo dele (a regra e a fonte), vem inteiro de privacidade.tsx */}
          <PorQue essencial regras={[]} titulo="O que sai deste aparelho" rotulo="o que sai daqui">
            <p>
              <TextoFotoCurto />
            </p>
            {AVISO_CHAVE && (
              <p>
                <TextoAvisoCurto />
              </p>
            )}
          </PorQue>
        </p>
        {guardaPermanente === false && (
          <div className="warnbox" role="note">
            <p>
              <b>Este navegador pode apagar seus dados.</b> Guarde uma cópia.{' '}
              <PorQue essencial regras={['dados.persistente']} titulo="O navegador e os seus dados">
                <p>
                  Este navegador não garantiu guardar seus dados de forma permanente: ele pode apagá-los se faltar espaço. Instalar o app na
                  tela inicial ajuda; exportar uma cópia protege.
                </p>
              </PorQue>
            </p>
          </div>
        )}
        {erroCarga && (
          <div className="caixa-erro" role="alert">
            {erroCarga}
          </div>
        )}
        {(cargaFalhou || temIlegivel) && (
          <div className="warnbox pilha" role="note">
            <p>Os dados que o app não conseguiu ler continuam guardados neste aparelho. Exporte-os para não perdê-los.</p>
            <button type="button" className="btn sec" onClick={() => void exportarNaoLido()}>
              Exportar esses dados
            </button>
          </div>
        )}
        <p role="status" className="status aviso-preso">
          {msg}
        </p>
        {erroNaPagina && (
          <div className="caixa-erro" role="alert">
            {erro}
          </div>
        )}

        <GrupoLinhas rotulo="Programa">
            {r && (
              <LinhaDados para="/comecar/rotina?de=dados" titulo="Rotina e divisão">
                {r.diasSemana} × {r.minutosSessao} min{estado.programa ? ` · ${estado.programa.programa.divisao}` : ''}
              </LinhaDados>
            )}
            {r && (
              <LinhaDados para="/comecar/rotina?de=dados&foco=objetivo" titulo="Objetivo">
                {OBJETIVO[r.objetivo ?? 'hipertrofia']}
              </LinhaDados>
            )}
            {estado.programa && (
              <LinhaDados para="/comecar/restricoes" titulo="Algo a evitar">
                {evitando ? `${evitando} ${evitando === 1 ? 'marcado' : 'marcados'}` : 'Nada marcado'}
              </LinhaDados>
            )}
            {locais.length > 0 && (
              <LinhaDados para="/locais" titulo="Meus locais">
                {locais.map((l) => l.nome).join(', ')}
              </LinhaDados>
            )}
            <LinhaDados para="/entenda" titulo="Entenda o treino">
              O porquê e as fontes
            </LinhaDados>
            <LinhaDados aoTocar={() => setFolha('estilo')} titulo="Estilo do Boneco">
              {estilo === 'pele' ? 'Pessoa' : 'Manequim'}
            </LinhaDados>
          </GrupoLinhas>

        <GrupoLinhas rotulo="Cópia de segurança">
          <LinhaDados aoTocar={() => setFolha('guardar')} titulo="Guardar uma cópia">
            Última cópia: {textoUltimaCopia(ultimaCopia || undefined, agoraIso())}
          </LinhaDados>
          <LinhaDados aoTocar={() => setFolha('trazer')} titulo="Trazer uma cópia" />
        </GrupoLinhas>

        <GrupoLinhas rotulo="Saúde e privacidade">
          <LinhaDados para="/comecar/triagem" titulo="Refazer a triagem" />
          {fotoEm && (
            <LinhaDados aoTocar={() => setFolha('foto')} titulo="Foto do equipamento">
              Autorizada em {dataCurta(fotoEm)}
            </LinhaDados>
          )}
          {avisoDisponivel() && (
            <LinhaDados aoTocar={() => setFolha('aviso')} titulo="Aviso do descanso">
              {aviso === 'ligado' ? 'Ligado' : 'Desligado'}
            </LinhaDados>
          )}
          <LinhaDados para="/termos" titulo="Termos de uso e privacidade" />
        </GrupoLinhas>

        <AvisarProblema />

        <button type="button" className="btn sec perigo-sec" aria-haspopup="dialog" onClick={() => setFolha('apagar')} disabled={!temDados}>
          Apagar todos os dados
        </button>

        <p className="muted">
          Versão {__VERSAO__} · {new Date(__DATA_BUILD__).toLocaleDateString('pt-BR')}
        </p>

        {folha === 'estilo' && (
          <Folha titulo="Estilo do Boneco" aoFechar={() => setFolha(null)}>
            <EscolhaEstiloBoneco />
          </Folha>
        )}
        {folha === 'guardar' && (
          <Folha titulo="Guardar uma cópia" aoFechar={() => setFolha(null)}>
            <p>
              O navegador pode apagar dados de sites pouco usados. Instale o app na tela inicial e exporte uma cópia de vez em quando.
            </p>
            <p>
              <b>Última cópia: {textoUltimaCopia(ultimaCopia || undefined, agoraIso())}</b>
              {ultimaCopia ? ` (${dataCurta(ultimaCopia)}, neste aparelho).` : '.'}
            </p>
            {guardaPermanente === true && <p>Este navegador aceitou guardar seus dados de forma permanente.</p>}
            <button
              type="button"
              className="btn"
              onClick={() => {
                exportar();
                setFolha(null);
              }}
              disabled={!temDados}
            >
              Exportar meus dados (JSON)
            </button>
          </Folha>
        )}
        {folha === 'trazer' && (
          <Folha titulo="Trazer uma cópia" aoFechar={() => setFolha(null)}>
            <p>Importar substitui os dados deste aparelho pelos do arquivo.</p>
            {/* pacote D2 (22/11/2026): o que está no aparelho vai ser substituído; antes de escolher o arquivo, a tela
                oferece guardar o que há hoje */}
            {temDados && (
              <button type="button" className="btn sec" onClick={exportar}>
                Guardar antes os dados de hoje
              </button>
            )}
            {msg && (
              <p className="status" role="status">
                {msg}
              </p>
            )}
            {erro && (
              <div className="caixa-erro" role="alert">
                {erro}
              </div>
            )}
            <div className="arquivo-campo">
              <input
                id="arquivo"
                ref={arquivo}
                type="file"
                accept="application/json,.json"
                className="sr"
                aria-label="Arquivo exportado pelo treino-mvp"
                onChange={(e) => setNomeArquivo(e.target.files?.[0]?.name ?? '')}
              />
              <label htmlFor="arquivo" className="btn sec">
                Escolher o arquivo
              </label>
              <span className="arquivo-nome">{nomeArquivo ? `Escolhido: ${nomeArquivo}` : 'Nenhum arquivo escolhido.'}</span>
            </div>
            <button
              type="button"
              className="btn"
              disabled={!nomeArquivo}
              aria-describedby={nomeArquivo ? undefined : 'falta-arquivo'}
              onClick={async () => {
                if (await importar()) setFolha(null);
              }}
            >
              Importar dados
            </button>
            {!nomeArquivo && (
              <p className="falta" id="falta-arquivo">
                Falta escolher o arquivo.
              </p>
            )}
          </Folha>
        )}
        {folha === 'foto' && fotoEm && (
          <Folha titulo="Foto do equipamento" aoFechar={() => setFolha(null)}>
            <p>
              Você autorizou o envio das fotos à Anthropic, nos EUA, em {dataCurta(fotoEm)}. Se retirar, a foto pede a autorização de novo
              antes do próximo envio.
            </p>
            <button
              type="button"
              className="btn sec"
              onClick={() => {
                apagarLocal(LOCAL.fotoConsentimento);
                setFotoEm('');
                setErro('');
                setMsg('Autorização da foto retirada.');
                setFolha(null);
              }}
            >
              Retirar a autorização da foto
            </button>
          </Folha>
        )}
        {folha === 'aviso' && (
          <Folha titulo="Aviso do descanso" aoFechar={() => setFolha(null)}>
            <p>
              <TextoAvisoCurto />
            </p>
            <button
              type="button"
              className="btn sec"
              onClick={() => {
                void (aviso === 'ligado' ? desligarAviso().then(estadoDoAviso) : ligarAviso()).then((e) => {
                  setAviso(e);
                  setFolha(null);
                });
              }}
            >
              {aviso === 'ligado' ? 'Desligar o aviso' : 'Ligar o aviso'}
            </button>
          </Folha>
        )}
        {folha === 'apagar' && (
          <Folha titulo="Apagar todos os dados?" aoFechar={() => setFolha(null)} rotuloFechar="Voltar">
            <p>O perfil, o programa e os treinos saem deste aparelho e não voltam.</p>
            {/* pacote D2 (22/11/2026): duas saídas (apagar ou "Voltar", no alto); eram três, com um "Cancelar" a mais.
                "Guardar uma cópia antes" deixou de ser só uma frase: é um botão, e a folha continua aberta */}
            {msg && (
              <p className="status" role="status">
                {msg}
              </p>
            )}
            <div className="pilha">
              <button type="button" className="btn sec" onClick={exportar}>
                Guardar uma cópia antes
              </button>
              <button type="button" className="btn perigo" onClick={apagar}>
                Apagar tudo
              </button>
            </div>
          </Folha>
        )}
      </main>
      {estado.programa && <NavInferior atual="dados" />}
    </div>
  );
}

/** Um grupo de linhas com rótulo (lote 5 do redesign; agente 4, seção 4.11): linhas de 56 px, a 2ª linha explica. */
function GrupoLinhas({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  const id = useId();
  return (
    <section className="grupo-dados" aria-labelledby={id}>
      <h2 id={id} className="rotulo">
        {rotulo}
      </h2>
      <ul className="linhas-dados">{children}</ul>
    </section>
  );
}

function LinhaDados({ titulo, children, para, aoTocar }: { titulo: string; children?: ReactNode; para?: string; aoTocar?: () => void }) {
  const corpo = (
    <>
      <span>
        <b>{titulo}</b>
        {children !== undefined && <small>{children}</small>}
      </span>
      <span className="seta" aria-hidden="true">
        <Icone nome="chevron-right" />
      </span>
    </>
  );
  return (
    <li>
      {para ? (
        <Link to={para}>
          {corpo}
        </Link>
      ) : (
        <button type="button" aria-haspopup="dialog" onClick={aoTocar}>
          {corpo}
        </button>
      )}
    </li>
  );
}
