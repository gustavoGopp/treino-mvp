import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { comInventario, localPorId, localPrincipal, novoLocalId, primeiroPassoPendente } from '../../storage/esquema';
import { useApp } from '../app/estado';
import { Selo, Titulo, Topo } from '../app/ui';
import { FormularioInventario } from '../onboarding/Inventario';

// Vários locais de treino (R1b; local.treino-do-dia). Cada local tem um nome que a pessoa escolhe e o seu
// inventário. O programa é montado para o local principal; nos outros, o treino do dia troca o que não der.

/** Nomes para tocar (nada vem marcado); a pessoa pode escrever outro. */
const NOMES = ['Prédio', 'Academia', 'Casa', 'Trabalho'];

export function Locais() {
  const { estado, atualizar } = useApp();
  const [aviso, setAviso] = useState('');
  const pendente = primeiroPassoPendente(estado);
  if (pendente) return <Navigate to={pendente.rota} replace />;
  const principal = localPrincipal(estado);
  const locais = estado.locais ?? [];
  return (
    <div className="wrap app">
      <Topo direita={<Link to="/programa">Meu programa</Link>} />
      <main className="conteudo">
        <Titulo>Meus locais</Titulo>
        <p className="lede">
          Cadastre cada lugar onde você treina. O programa é montado para o principal; nos outros, o treino do dia troca cada aparelho que não houver
          pelo equivalente, e diz o motivo. <Selo id="local.treino-do-dia" />
        </p>
        <p role="status" className="status">
          {aviso}
        </p>
        <ul className="pilha lista-locais" aria-label="Locais">
          {locais.map((l) => (
            <li key={l.id} className="box local">
              <h2>{l.nome}</h2>
              <p className="ajuda">
                {Object.keys(l.inventario).length === 1 ? '1 equipamento' : `${Object.keys(l.inventario).length} equipamentos`}
                {l.id === principal?.id ? ' · o programa é montado para este local' : ''}
              </p>
              <div className="acoes-local">
                <Link className="btn sec pequeno" to={`/locais/${l.id}`} aria-label={`Editar ${l.nome}`}>
                  Editar nome e equipamento
                </Link>
                {l.id !== principal?.id && (
                  <button
                    type="button"
                    className="btn sec pequeno"
                    onClick={() => {
                      atualizar((s) => ({ ...s, localPrincipalId: l.id }));
                      setAviso(`${l.nome} é o local principal. O programa muda só quando você tocar em "Atualizar" no seu treino.`);
                    }}
                  >
                    Montar o programa para este local
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <Link className="btn" to="/locais/novo">
          Cadastrar outro local
        </Link>
      </main>
      <Link className="voltar" to="/programa">
        Voltar para o programa
      </Link>
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
    <div className="wrap app">
      <Topo direita={<Link to="/locais">Meus locais</Link>} />
      <main className="conteudo">
        <Titulo>{novo ? 'Novo local' : `Editar: ${local!.nome}`}</Titulo>
        <div className={`campo${erroNome ? ' com-erro' : ''}`}>
          <label htmlFor="nome-local" className="rotulo">
            Nome do local
          </label>
          <p className="ajuda" id="nome-local-ajuda">
            Toque numa sugestão ou escreva o seu.
          </p>
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
            aria-describedby={erroNome ? 'nome-local-ajuda nome-local-erro' : 'nome-local-ajuda'}
            aria-invalid={!!erroNome || undefined}
            onChange={(e) => {
              setNome(e.target.value);
              setErroNome('');
            }}
          />
        </div>
        <h2 className="secao">Que equipamento tem {nome.trim() ? `em "${nome.trim()}"` : 'neste local'}?</h2>
        <FormularioInventario inicial={local?.inventario} aoSalvar={salvar} textoBotao="Salvar local" />
      </main>
      <Link className="voltar" to="/locais">
        Voltar para meus locais
      </Link>
    </div>
  );
}
