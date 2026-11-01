import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { exportarJson, importarJson, nomeDoArquivo } from '../../storage/arquivo';
import { useApp } from '../app/estado';
import { Titulo, Topo } from '../app/ui';

// Meus dados: exportar e importar em JSON, apagar tudo e refazer a triagem. Nada sai do aparelho sem a pessoa.
export function Dados() {
  const { estado, carregado, persistente, erroCarga, substituir, limpar } = useApp();
  const navigate = useNavigate();
  const arquivo = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');
  const [confirmarApagar, setConfirmarApagar] = useState(false);
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
    setConfirmarApagar(false);
    navigate('/');
  };

  return (
    <div className="wrap app">
      <Topo direita={estado.programa ? <Link to="/programa">Meu programa</Link> : undefined} />
      <main className="conteudo">
        <Titulo>Meus dados</Titulo>
        <p className="lede">
          Tudo fica guardado só neste aparelho. A única coisa que sai é a foto do equipamento, se você usar: ela vai, sem a localização, para
          o reconhecimento e não fica guardada no servidor.
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
            O navegador pode apagar dados de sites pouco usados. Instale o app na tela inicial e exporte uma cópia de vez em quando.
            {persistente === true && ' Este navegador aceitou guardar seus dados de forma permanente.'}
          </p>
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

        <section className="box">
          <h2>Refazer as respostas</h2>
          <p>Mudou algo na sua saúde, rotina ou equipamento? Refaça a partir da triagem; o programa é gerado de novo no fim.</p>
          <Link className="btn sec" to="/comecar/triagem">
            Refazer a triagem e o perfil
          </Link>
        </section>

        <section className="box">
          <h2>Apagar tudo</h2>
          <p>Apaga o perfil, o equipamento e o programa deste aparelho. Não dá para desfazer sem um arquivo exportado.</p>
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
      </main>
    </div>
  );
}
