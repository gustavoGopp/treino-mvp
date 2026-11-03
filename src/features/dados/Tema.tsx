import { Escolha } from '../app/ui';
import { definirTema, useTema, type Tema } from '../app/tema';

// "Meus dados" → Tema da tela: igual ao celular (padrão), claro ou escuro. Vale só neste aparelho.
const OPCOES: { id: Tema; texto: string }[] = [
  { id: 'auto', texto: 'Igual ao celular' },
  { id: 'claro', texto: 'Claro' },
  { id: 'escuro', texto: 'Escuro' },
];

export function EscolhaTema() {
  const tema = useTema();
  return (
    <section className="box">
      <h2>Tema da tela</h2>
      <Escolha nome="tema" legenda="Cores do app neste aparelho" opcoes={OPCOES} valor={tema} aoMudar={definirTema} />
    </section>
  );
}
