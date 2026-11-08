import { useId, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { exportarJson, importarJson, nomeDoArquivo } from '../../storage/arquivo';
import { useApp } from '../app/estado';
import { NavInferior, Titulo, Topo } from '../app/ui';
import { Folha } from '../app/Folha';
import { EscolhaEstiloBoneco } from './EstiloBoneco';

// Meus dados: exportar e importar em JSON, apagar tudo e refazer a triagem. Nada sai do aparelho sem a pessoa.
// Lote 5 do redesign: 3 grupos de linhas (Programa, Cópia de segurança, Saúde) e "Apagar todos os dados" por último,
// confirmado num diálogo.
const OBJETIVO = { cutting: 'Manter o músculo enquanto perco peso', forca: 'Ficar mais forte', saude: 'Saúde e disposição', hipertrofia: 'Ganhar músculo' } as const;
export function Dados() {
  const { estado, carregado, persistente, erroCarga, substituir, limpar } = useApp();
  const navigate = useNavigate();
  const arquivo = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');
  // lote 5 do redesign: cópia, estilo e apagar abrem em folhas; apagar é o único diálogo de confirmação
  const [folha, setFolha] = useState<'estilo' | 'guardar' | 'trazer' | 'apagar' | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState('');
  if (!carregado) return null;

  const temDados = Object.keys(estado).length > 1;

  const exportar = () => {
    const agora = new Date();
    const blob = new Blob([exportarJson(estado, agora.toISOString())], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeDoArquivo(agora);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
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
        <p className="ajuda">Tudo fica só neste aparelho. Sem login.</p>
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
            Um arquivo com tudo, para guardar onde quiser
          </LinhaDados>
          <LinhaDados aoTocar={() => setFolha('trazer')} titulo="Trazer uma cópia">
            De um arquivo exportado por este app
          </LinhaDados>
        </GrupoLinhas>

        <GrupoLinhas rotulo="Saúde">
          <LinhaDados para="/comecar/triagem" titulo="Refazer a triagem">
            As 9 perguntas e a dor de hoje; o programa é gerado de novo no fim
          </LinhaDados>
        </GrupoLinhas>

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
              O navegador pode apagar dados de sites pouco usados. Instale o app na tela inicial e exporte uma cópia de vez em quando.
              {persistente === true && ' Este navegador aceitou guardar seus dados de forma permanente.'}
            </p>
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
        <Link to={para} aria-label={titulo}>
          {corpo}
        </Link>
      ) : (
        <button type="button" aria-haspopup="dialog" aria-label={titulo} onClick={aoTocar}>
          {corpo}
        </button>
      )}
    </li>
  );
}
