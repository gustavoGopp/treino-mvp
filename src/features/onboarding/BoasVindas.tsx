import { Link, Navigate, useNavigate } from 'react-router-dom';
import { primeiroPassoPendente } from '../../storage/esquema';
import { agoraIso, useApp } from '../app/estado';
import { Selo, Titulo, Topo } from '../app/ui';

// Passo 1: o que o app faz e o que não faz (seguranca.sem-diagnostico). Se já existe programa, abre direto nele.
export function BoasVindas() {
  const { estado, carregado, erroCarga, atualizar } = useApp();
  const navigate = useNavigate();
  if (!carregado) return null;
  if (estado.programa && !primeiroPassoPendente(estado)) return <Navigate to="/programa" replace />;

  const comecar = () => {
    if (!estado.avisoAceitoEm) atualizar((e) => ({ ...e, avisoAceitoEm: agoraIso() }));
    navigate('/comecar/triagem');
  };

  return (
    <div className="wrap app">
      <Topo direita={<Link to="/dados">Meus dados</Link>} />
      <div className="progresso">
        <span>Passo 1 de 6</span>
        <div className="barra" aria-hidden="true">
          <i style={{ width: `${100 / 6}%` }} />
        </div>
      </div>
      <main className="conteudo">
        <Titulo>Seu treino, com o equipamento que você tem</Titulo>
        {erroCarga && (
          <div className="caixa-erro" role="alert">
            {erroCarga} Em <Link to="/dados">Meus dados</Link> você pode importar um backup.
          </div>
        )}
        <p className="lede">
          Montamos um programa de hipertrofia baseado em evidência, só com o seu equipamento, e mostramos o porquê de cada escolha.
          Leva cerca de 1 minuto, mais o tempo de marcar o seu equipamento.
        </p>
        <section className="box">
          <h2>O que o app faz</h2>
          <ul className="lista">
            <li>Monta o programa a partir de regras com fonte e selo de evidência.</li>
            <li>Mostra como executar cada exercício.</li>
            <li>Sugere a carga da próxima vez, pelo que você registrou.</li>
          </ul>
        </section>
        <section className="warnbox" aria-labelledby="nao-faz">
          <h2 id="nao-faz">O que o app não faz</h2>
          <p>
            O app não diagnostica e não substitui um médico ou um profissional de Educação Física. É uma ferramenta de orientação, não uma
            prescrição. Se sentir dor, tontura ou mal-estar, pare e procure avaliação. <Selo id="seguranca.sem-diagnostico" />
          </p>
        </section>
        <section className="box">
          <h2>Seus dados ficam no aparelho</h2>
          <p>
            O seu perfil, o programa e os treinos ficam guardados só neste aparelho. A única coisa que sai é a foto do equipamento, se
            você usar: ela vai, sem a localização, para o reconhecimento e não fica guardada no servidor. Você pode exportar ou apagar tudo
            quando quiser em “Meus dados”.
          </p>
        </section>
        <button type="button" className="btn" onClick={comecar}>
          Entendi, vamos começar
        </button>
        <Link className="link-sec" to="/guia">
          Ver o guia de execução
        </Link>
      </main>
    </div>
  );
}
