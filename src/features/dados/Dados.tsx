import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { textoUltimaCopia } from '../../domain/dados';
import { importarJson } from '../../storage/arquivo';
import { consultarPersistencia } from '../../storage/idb';
import { baixarCopia } from '../app/copia';
import { agoraIso, useApp } from '../app/estado';
import { apagarLocal, apagarTodosLocais, dataCurta, lerLocal, LOCAL } from '../app/local';
import { AvisarProblema, TextoFotoCurto } from '../app/privacidade';
import { NavInferior, Selo, Titulo, Topo } from '../app/ui';
import { EscolhaEstiloBoneco } from './EstiloBoneco';

// Meus dados: exportar e importar em JSON, apagar tudo e refazer a triagem. Nada sai do aparelho sem a pessoa.
// R5c: a data da última cópia (dados.copia), o aviso quando o navegador nega o armazenamento persistente
// (dados.persistente), a autorização da foto (privacidade.foto), os termos e o "Avisar um problema".
export function Dados() {
  const { estado, carregado, persistente, erroCarga, substituir, limpar } = useApp();
  const navigate = useNavigate();
  const arquivo = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');
  const [confirmarApagar, setConfirmarApagar] = useState(false);
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

  const importar = async () => {
    const f = arquivo.current?.files?.[0];
    if (!f) {
      setErro('Escolha um arquivo exportado pelo treino-mvp.');
      return;
    }
    const r = importarJson(await f.text());
    if (!r.ok) {
      setMsg('');
      setErro(`Não foi possível importar. ${r.erro} Seus dados atuais não foram alterados.`);
      return;
    }
    substituir(r.estado);
    setErro('');
    setMsg('Dados importados.');
    if (arquivo.current) arquivo.current.value = '';
    setNomeArquivo('');
  };

  const apagar = async () => {
    await limpar();
    apagarTodosLocais();
    setConfirmarApagar(false);
    navigate('/');
  };

  return (
    <div className={estado.programa ? 'wrap app com-nav' : 'wrap app'}>
      <Topo direita={estado.programa ? undefined : <Link to="/">Início</Link>} />
      <main className="conteudo">
        <Titulo>Meus dados</Titulo>
        <p className="lede">
          Tudo fica guardado só neste aparelho. <TextoFotoCurto />
        </p>
        {erroCarga && (
          <div className="caixa-erro" role="alert">
            {erroCarga}
          </div>
        )}
        <p role="status" className="status">
          {msg}
        </p>
        {erro && (
          <div className="caixa-erro" role="alert">
            {erro}
          </div>
        )}

        <section className="box">
          <h2>Guardar uma cópia</h2>
          <p>
            O navegador pode apagar dados de sites pouco usados. Instale o app na tela inicial e exporte uma cópia de vez em quando.{' '}
            <Selo id="dados.copia" />
          </p>
          <p>
            <b>Última cópia: {textoUltimaCopia(ultimaCopia || undefined, agoraIso())}</b>
            {ultimaCopia ? ` (${dataCurta(ultimaCopia)}, neste aparelho).` : '.'}
          </p>
          {guardaPermanente === true && <p>Este navegador aceitou guardar seus dados de forma permanente.</p>}
          {guardaPermanente === false && (
            <div className="warnbox" role="note">
              <p>
                <b>Este navegador não garantiu guardar seus dados de forma permanente:</b> ele pode apagá-los se faltar espaço. Instalar o
                app na tela inicial ajuda; exportar uma cópia protege. <Selo id="dados.persistente" />
              </p>
            </div>
          )}
          <button type="button" className="btn" onClick={exportar} disabled={!temDados}>
            Exportar meus dados (JSON)
          </button>
        </section>

        <section className="box">
          <h2>Trazer uma cópia</h2>
          <p>Importar substitui os dados deste aparelho pelos do arquivo.</p>
          <div className="arquivo-campo">
            <input
              id="arquivo"
              ref={arquivo}
              type="file"
              accept="application/json,.json"
              aria-label="Arquivo exportado pelo treino-mvp"
              onChange={(e) => setNomeArquivo(e.target.files?.[0]?.name ?? '')}
            />
            <label htmlFor="arquivo" className="btn sec">
              Escolher o arquivo
            </label>
            <span className="arquivo-nome">{nomeArquivo ? `Escolhido: ${nomeArquivo}` : 'Nenhum arquivo escolhido.'}</span>
          </div>
          <button type="button" className="btn sec" onClick={importar}>
            Importar dados
          </button>
        </section>

        {estado.locais?.length ? (
          <section className="box">
            <h2>Meus locais</h2>
            <p>Os lugares onde você treina, cada um com o seu equipamento. Dá para trocar o nome e cadastrar outro.</p>
            <Link className="btn sec" to="/locais">
              Ver meus locais
            </Link>
          </section>
        ) : null}

        {estado.rotina && (
          <section className="box">
            <h2>Rotina e divisão do treino</h2>
            <p>Dias, minutos, prioridades e como dividir os treinos na semana. Sem escolha, o app usa a divisão recomendada.</p>
            <Link className="btn sec" to="/comecar/rotina?de=dados">
              Mudar a rotina ou a divisão
            </Link>
          </section>
        )}

        <EscolhaEstiloBoneco />

        <section className="box">
          <h2>Refazer as respostas</h2>
          <p>Mudou algo na sua saúde, rotina ou equipamento? Refaça a partir da triagem; o programa é gerado de novo no fim.</p>
          <Link className="btn sec" to="/comecar/triagem">
            Refazer a triagem e o perfil
          </Link>
        </section>

        {fotoEm && (
          <section className="box">
            <h2>Foto do equipamento</h2>
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
              }}
            >
              Retirar a autorização da foto
            </button>
          </section>
        )}

        <section className="box pilha">
          <h2>Termos e ajuda</h2>
          <p>O que o app faz e não faz, onde ficam os seus dados, a foto e os seus direitos.</p>
          <Link className="btn sec" to="/termos">
            Termos de uso e privacidade
          </Link>
          <AvisarProblema />
        </section>

        <section className="box">
          <h2>Apagar tudo</h2>
          <p>Apaga o perfil, o equipamento, o programa, os treinos e as autorizações deste aparelho. Não dá para desfazer sem um arquivo exportado.</p>
          {!confirmarApagar ? (
            <button type="button" className="btn perigo" onClick={() => setConfirmarApagar(true)} disabled={!temDados}>
              Apagar todos os dados
            </button>
          ) : (
            <div className="pilha">
              <b>Tem certeza? Isso não pode ser desfeito.</b>
              <button type="button" className="btn perigo" onClick={apagar}>
                Sim, apagar tudo
              </button>
              <button type="button" className="btn sec" onClick={() => setConfirmarApagar(false)}>
                Cancelar
              </button>
            </div>
          )}
        </section>

        <p className="muted">
          Versão do app: {__VERSAO__}, publicada em {new Date(__DATA_BUILD__).toLocaleDateString('pt-BR')}.
        </p>
      </main>
      {estado.programa && <NavInferior atual="dados" />}
    </div>
  );
}
