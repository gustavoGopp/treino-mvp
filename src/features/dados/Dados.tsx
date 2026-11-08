import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { textoUltimaCopia } from '../../domain/dados';
import { importarJson } from '../../storage/arquivo';
import { consultarPersistencia } from '../../storage/idb';
import { baixarCopia } from '../app/copia';
import { agoraIso, useApp } from '../app/estado';
import { apagarLocal, apagarTodosLocais, dataCurta, lerLocal, LOCAL } from '../app/local';
import { AvisarProblema, TextoFotoCurto } from '../app/privacidade';
import { NavInferior, Selo, Titulo, Topo } from '../app/ui';
import { Folha } from '../app/Folha';
import { EscolhaEstiloBoneco } from './EstiloBoneco';

// Meus dados: exportar e importar em JSON, apagar tudo e refazer a triagem. Nada sai do aparelho sem a pessoa.
// R5c: a data da última cópia (dados.copia), o aviso quando o navegador nega o armazenamento persistente
// (dados.persistente), a autorização da foto (privacidade.foto), os termos e o "Avisar um problema".
// Lote 5 do redesign: 3 grupos de linhas (Programa, Cópia de segurança, Saúde e privacidade) e "Apagar todos os dados"
// por último, confirmado num diálogo.
const OBJETIVO = { cutting: 'Manter o músculo enquanto perco peso', forca: 'Ficar mais forte', saude: 'Saúde e disposição', hipertrofia: 'Ganhar músculo' } as const;
export function Dados() {
  const { estado, carregado, persistente, erroCarga, substituir, limpar } = useApp();
  const navigate = useNavigate();
  const arquivo = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');
  // lote 5 do redesign: cópia, estilo e apagar abrem em folhas; apagar é o único diálogo de confirmação
  const [folha, setFolha] = useState<'estilo' | 'guardar' | 'trazer' | 'foto' | 'apagar' | null>(null);
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
  if (!carregado) return null;
  const guardaPermanente = persistente ?? consultada;

  const temDados = Object.keys(estado).length > 1;

  const exportar = () => {
    baixarCopia(estado);
    setUltimaCopia(lerLocal(LOCAL.ultimaCopia));
    setErro('');
    setMsg('Arquivo exportado. Guarde-o num lugar seguro: ele tem seus dados de saúde.');
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
    setFolha(null);
    navigate('/');
  };

  const r = estado.rotina;
  const locais = estado.locais ?? [];
  const evitando = (estado.restricoes?.evitarExercicios.length ?? 0) + (estado.restricoes?.evitarEquipamentos.length ?? 0);
  const erroNaPagina = erro && folha !== 'trazer';

  return (
    <div className={estado.programa ? 'wrap app com-nav' : 'wrap app'}>
      <Topo direita={estado.programa ? undefined : <Link to="/">Início</Link>} />
      <main className="conteudo dados">
        <Titulo>Meus dados</Titulo>
        <p className="ajuda">
          Tudo fica guardado só neste aparelho. <TextoFotoCurto />
        </p>
        {guardaPermanente === false && (
          <div className="warnbox" role="note">
            <p>
              <b>Este navegador não garantiu guardar seus dados de forma permanente:</b> ele pode apagá-los se faltar espaço. Instalar o app
              na tela inicial ajuda; exportar uma cópia protege. <Selo id="dados.persistente" />
            </p>
          </div>
        )}
        {erroCarga && (
          <div className="caixa-erro" role="alert">
            {erroCarga}
          </div>
        )}
        <p role="status" className="status">
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
              <LinhaDados para="/comecar/rotina?de=dados" titulo="Objetivo">
                {r.objetivo && r.objetivo !== 'hipertrofia' ? OBJETIVO[r.objetivo] : 'Ganhar músculo (o padrão)'}
              </LinhaDados>
            )}
            {estado.programa && (
              <LinhaDados para="/comecar/restricoes" titulo="Algo a evitar">
                {evitando ? `${evitando} ${evitando === 1 ? 'marcado' : 'marcados'}` : 'Nada marcado'}
              </LinhaDados>
            )}
            {locais.length > 0 && (
              <LinhaDados para="/locais" titulo="Meus locais">
                {locais.length === 1 ? `1 local: ${locais[0]!.nome}` : `${locais.length} locais: ${locais.map((l) => l.nome).join(', ')}`}
              </LinhaDados>
            )}
            <LinhaDados aoTocar={() => setFolha('estilo')} titulo="Estilo do Boneco">
              Como o guia desenha os exercícios
            </LinhaDados>
          </GrupoLinhas>

        <GrupoLinhas rotulo="Cópia de segurança">
          <LinhaDados aoTocar={() => setFolha('guardar')} titulo="Guardar uma cópia">
            Última cópia: {textoUltimaCopia(ultimaCopia || undefined, agoraIso())}
          </LinhaDados>
          <LinhaDados aoTocar={() => setFolha('trazer')} titulo="Trazer uma cópia">
            De um arquivo exportado por este app
          </LinhaDados>
        </GrupoLinhas>

        <GrupoLinhas rotulo="Saúde e privacidade">
          <LinhaDados para="/comecar/triagem" titulo="Refazer a triagem">
            As 9 perguntas e a dor de hoje; o programa é gerado de novo no fim
          </LinhaDados>
          {fotoEm && (
            <LinhaDados aoTocar={() => setFolha('foto')} titulo="Foto do equipamento">
              Autorizada em {dataCurta(fotoEm)}
            </LinhaDados>
          )}
          <LinhaDados para="/termos" titulo="Termos de uso e privacidade">
            O que o app faz e não faz, onde ficam os dados e os seus direitos
          </LinhaDados>
        </GrupoLinhas>

        <AvisarProblema />

        <button type="button" className="btn perigo" onClick={() => setFolha('apagar')} disabled={!temDados}>
          Apagar todos os dados
        </button>

        <p className="muted">
          Versão do app: {__VERSAO__}, publicada em {new Date(__DATA_BUILD__).toLocaleDateString('pt-BR')}.
        </p>

        {folha === 'estilo' && (
          <Folha titulo="Estilo do Boneco" aoFechar={() => setFolha(null)}>
            <EscolhaEstiloBoneco />
          </Folha>
        )}
        {folha === 'guardar' && (
          <Folha titulo="Guardar uma cópia" aoFechar={() => setFolha(null)}>
            <p>
              O navegador pode apagar dados de sites pouco usados. Instale o app na tela inicial e exporte uma cópia de vez em quando.{' '}
              <Selo id="dados.copia" />
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
              onClick={async () => {
                if (await importar()) setFolha(null);
              }}
            >
              Importar dados
            </button>
          </Folha>
        )}
        {folha === 'foto' && fotoEm && (
          <Folha titulo="Foto do equipamento" aoFechar={() => setFolha(null)}>
            <p>
              Você autorizou o envio das fotos à Anthropic, nos EUA, em {dataCurta(fotoEm)}. Se retirar, a foto pede a autorização de novo
              antes do próximo envio. <Selo id="privacidade.foto" />
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
        {folha === 'apagar' && (
          <Folha titulo="Apagar todos os dados?" aoFechar={() => setFolha(null)} rotuloFechar="Voltar">
            <p>O perfil, o programa e os treinos saem deste aparelho e não voltam. Se quiser, guarde uma cópia antes.</p>
            <div className="pilha">
              <button type="button" className="btn" onClick={() => setFolha(null)}>
                Cancelar
              </button>
              <button type="button" className="btn sec perigo-sec" onClick={apagar}>
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

function LinhaDados({ titulo, children, para, aoTocar }: { titulo: string; children: ReactNode; para?: string; aoTocar?: () => void }) {
  const corpo = (
    <>
      <span>
        <b>{titulo}</b>
        <small>{children}</small>
      </span>
      <span className="seta" aria-hidden="true">
        ›
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
