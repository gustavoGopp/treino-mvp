import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { comInventario, localPorId, localPrincipal, novoLocalId, porQueNaoApagarLocal, primeiroPassoPendente, semLocal } from '../../storage/esquema';
import { Folha } from '../app/Folha';
import { useApp } from '../app/estado';
import { NavInferior, Titulo, Topo } from '../app/ui';
import { FormularioInventario } from '../onboarding/Inventario';

// Vários locais de treino (R1b; local.treino-do-dia). Cada local tem um nome que a pessoa escolhe e o seu
// inventário. O programa é montado para o local principal; nos outros, o treino do dia troca o que não der.

/** Nomes para tocar (nada vem marcado); a pessoa pode escrever outro. */
const NOMES = ['Prédio', 'Academia', 'Casa', 'Trabalho'];

export function Locais() {
  const { estado, atualizar } = useApp();
  const [aviso, setAviso] = useState('');
  const [apagando, setApagando] = useState<string | undefined>();
  const pendente = primeiroPassoPendente(estado);
  if (pendente) return <Navigate to={pendente.rota} replace />;
  const principal = localPrincipal(estado);
  const locais = estado.locais ?? [];
  return (
    <div className="wrap app com-nav">
      <Topo voltar={{ para: '/dados', rotulo: 'Meus dados' }} />
      <main className="conteudo">
        <Titulo>Meus locais</Titulo>
        <p role="status" className="status">
          {aviso}
        </p>
        <ul className="pilha lista-locais" aria-label="Locais">
          {locais.map((l) => (
            <li key={l.id} className="box local">
              <h2>{l.nome}</h2>
              <p className="ajuda">
                {Object.keys(l.inventario).length === 1 ? '1 equipamento' : `${Object.keys(l.inventario).length} equipamentos`}
                {l.id === principal?.id ? ' · principal' : ''}
              </p>
              <div className="acoes-local">
                <Link className="btn sec pequeno" to={`/locais/${l.id}`} aria-label={`Editar ${l.nome}`}>
                  Editar
                </Link>
                {l.id !== principal?.id && (
                  <button
                    type="button"
                    className="btn sec pequeno"
                    onClick={() => {
                      atualizar((s) => ({ ...s, localPrincipalId: l.id }));
                      setAviso(`${l.nome} é o principal. O programa muda quando você tocar em "Atualizar" no início.`);
                    }}
                  >
                    Tornar principal
                  </button>
                )}
                {/* pacote D2 (22/11/2026): não havia como apagar um local */}
                {!porQueNaoApagarLocal(estado, l.id) && (
                  <button type="button" className="btn sec pequeno perigo-sec" aria-haspopup="dialog" aria-label={`Apagar ${l.nome}`} onClick={() => setApagando(l.id)}>
                    Apagar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <Link className="btn" to="/locais/novo">
          Novo local
        </Link>
        {apagando && localPorId(estado, apagando) && (
          <Folha titulo={`Apagar ${localPorId(estado, apagando)!.nome}?`} aoFechar={() => setApagando(undefined)} rotuloFechar="Voltar">
            <p>O local e o equipamento dele saem deste aparelho. Os treinos feitos nele continuam no histórico, e o programa não muda.</p>
            <button
              type="button"
              className="btn perigo"
              onClick={() => {
                const nome = localPorId(estado, apagando)!.nome;
                atualizar((s) => semLocal(s, apagando));
                setApagando(undefined);
                setAviso(`${nome} apagado.`);
              }}
            >
              Apagar o local
            </button>
          </Folha>
        )}
      </main>
      <NavInferior atual="dados" />
    </div>
  );
}

/** Cadastro de um local novo (/locais/novo) ou edição de um existente (/locais/:id): nome e a mesma tela de equipamento. */
export function EditarLocal() {
  const { id } = useParams();
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const novo = id === 'novo' || !id;
  const local = novo ? undefined : localPorId(estado, id);
  const [nome, setNome] = useState(local?.nome ?? '');
  const [erroNome, setErroNome] = useState('');
  const pendente = primeiroPassoPendente(estado);
  if (pendente) return <Navigate to={pendente.rota} replace />;
  if (!novo && !local) return <Navigate to="/locais" replace />;

  const salvar = (inventario: Parameters<typeof comInventario>[2]) => {
    const n = nome.trim();
    if (!n) {
      setErroNome('Dê um nome ao local, por exemplo "Prédio" ou "Academia do bairro".');
      document.getElementById('nome-local')?.focus();
      return;
    }
    atualizar((s) => comInventario(s, local?.id ?? novoLocalId(s), inventario, n.slice(0, 40)));
    navigate('/locais');
  };

  return (
    <div className="wrap app com-nav">
      <Topo voltar={{ para: '/locais', rotulo: 'Meus locais' }} />
      <main className="conteudo">
        <Titulo>{novo ? 'Novo local' : `Editar: ${local!.nome}`}</Titulo>
        <div className={`campo${erroNome ? ' com-erro' : ''}`}>
          <label htmlFor="nome-local" className="rotulo">
            Nome do local
          </label>
          {erroNome && (
            <p className="erro" id="nome-local-erro">
              {erroNome}
            </p>
          )}
          <div className="opcoes linha">
            {NOMES.map((n) => (
              <button
                key={n}
                type="button"
                className="btn sec pequeno"
                aria-pressed={nome === n}
                onClick={() => {
                  setNome(n);
                  setErroNome('');
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <input
            id="nome-local"
            type="text"
            maxLength={40}
            value={nome}
            aria-describedby={erroNome ? 'nome-local-erro' : undefined}
            aria-invalid={!!erroNome || undefined}
            onChange={(e) => {
              setNome(e.target.value);
              setErroNome('');
            }}
          />
        </div>
        <h2 className="secao">Equipamento</h2>
        <FormularioInventario inicial={local?.inventario} aoSalvar={salvar} textoBotao="Salvar local" />
      </main>
    </div>
  );
}
