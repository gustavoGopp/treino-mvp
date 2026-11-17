# Relatório · tríceps na polia e com elástico (lote 5)

Entreguei dois dos três exercícios: `triceps-corda` e `triceps-frances-polia-unilateral`. O `triceps-elastico-acima` **não foi entregue**. Com o tubo da tabela de objetos, ele estica além do máximo do fabricante (o motivo está no fim). As conferências escritas ficam em `lote-5/<id>.md`.

## triceps-corda (polia alta, corda, empurrar para baixo)

- **Conferência:** nenhuma falha.
  - Com `conferir.mjs`, um aviso: as linhas da ficha que são escolha de desenho.
  - Com `npm run conferir:animacao`, mais um aviso: de lado aparecem só 56 cm² do tríceps. A vista padrão do modo Músculos é a de trás, com 208 cm².
- **Medidas:**
  - o cotovelo anda 0 cm, e a pele do braço fica de 0,1 a 0,7 cm do tronco;
  - em cima, as mãos ficam 13 cm abaixo do acrômio (altura do peito), com o cotovelo a 112°;
  - embaixo, o cotovelo fica a 4°, e as mãos se abrem de 13 para 32,4 cm, para os lados das coxas;
  - o tronco fica parado a 15°;
  - a corda e o cabo passam a 3,7 cm ou mais do corpo;
  - a pilha sobe 29,9 cm para 59,8 cm de cabo (2:1).
- **Vistas:** `lateral` e `posterior`. De frente, a coluna tapa o corpo.
- **O que não ficou bom:**
  - No modo Trajetória, o fio do nome "mãos" passa de leve pela frente da coxa (`quadros/triceps-corda.png`, `lateral:traj:f1`). Quem põe o nome à esquerda é o arranjo automático dos rótulos (arquivo comum). Afastei a coluna (o cabo a 20° da vertical em cima), mas não bastou.
  - De trás, a corda quase não aparece, só as pontas ao lado das coxas.
- **Risco:** baixo a médio. É uma montagem nova (corda para baixo, mãos que se abrem pela geometria do braço). A corda abre menos que na animação de hoje (32 cm contra 61 cm), porque os ramos da corda da Rogue não deixam passar de uns 42 cm.

## triceps-frances-polia-unilateral (polia baixa, estribo, braço direito)

- **Conferência:** nenhuma falha e um aviso (as linhas de desenho da ficha).
- **Medidas:**
  - o braço fica parado a 166,6°, e o cotovelo, a 8,3 cm da cabeça;
  - no alongado, a mão fica 19,2 cm atrás da cabeça, com o cotovelo a 134,7°; em cima, o cotovelo chega a 8,1°;
  - a pegada é neutra (pronação de 2,2° e supinação de 5,8°);
  - o cabo passa por trás, a 1,9 cm ou mais do corpo;
  - a pilha sobe 27,4 cm para 54,8 cm de cabo;
  - a mão esquerda fica na cintura (0,6 cm da pele, parada), como pede o texto do app;
  - a polia fica a 22 cm do chão, como na correção de 04/11.
- **Vistas:** `lateral` e `frontal`. A padrão do modo Músculos é a de frente (90 cm², só o lado direito).
- **O que não ficou bom:**
  - De lado, o cabo cruza o desenho do braço esquerdo dobrado na cintura (`lateral:tec:f0` e `f1`). No 3D ele passa 1,9 cm atrás desse braço.
  - O estribo aparece pequeno.
  - Tirei o rótulo "desce atrás da cabeça", porque o fio cruzava o braço e a cabeça. A vista de lado ficou com um rótulo só.
- **Risco:** médio. A mão na cintura e o cabo cruzando o braço de longe são o que o dono pode estranhar.

## triceps-elastico-acima: não entregue

A ficha e o cartão pedem o tubo com pegadores pisado pelo pé de trás, com as duas pontas subindo pelas costas até as mãos atrás da cabeça. Montei a animação sobre o núcleo do francês, com o tubo esticado contornando o corpo (costas, glúteo e perna de trás) e passando por baixo da bola do pé. Nessa montagem:

- o tronco, o pé e a cabeça conferiram: o tubo passa a 1,2 cm da cabeça;
- o elástico, não: **com o tubo da tabela (121,9 cm, máximo de 3 vezes), ele estica 2,5 vezes no alongado e 3,4 vezes com os braços estendidos.** Isso passa do máximo do fabricante e é uma falha da conferência.

O caminho da mão ao pé, ida e volta, já tem cerca de 300 cm com as mãos atrás da cabeça. Não há pose que caiba num tubo de 48 pol. O próprio cartão admite "um elástico longo". Para fazer, é preciso que o Gustavo decida:

- **ou** um elástico longo em laço (a Rogue Monster Band tem 41 pol, 104 cm; a página não diz se isso é o comprimento do laço aberto ou fechado, nem o estiramento máximo). Isso pede um objeto novo (medidas provisórias), uma peça de faixa chata e uma mudança na conferência, que hoje só mede estiramento para o `elastico` da tabela;
- **ou** um tubo mais longo, com fonte.

O rascunho (animação, regras e ficha) não entrou no ramo. A mudança aditiva que ele fazia no núcleo (a carga `elastico`) também foi desfeita.

## Arquivos comuns que mexi

- `exercicios/registro.ts` e `regras/registro.ts`: uma linha por exercício ou arquivo de regras.
- `exercicios/triceps-frances-base.ts` (núcleo da família, aditivo):
  - a carga `estribo` (polia embaixo, atrás; pegada neutra; a pilha sobe);
  - o giro do antebraço fixo no do alongado quando há uma mão só;
  - a mão esquerda na cintura.

  Os três tríceps franceses já feitos dão saída idêntica com o núcleo antigo e com o novo: os quadros de todos os erros, as cenas e a conferência completa têm o mesmo resumo SHA-1. `conferir.mjs` dá 0 falha nos três.
- Nada no motor comum. `npm run check` passa, e `npm run conferir:animacao` dá 0 falha em todas as animações. Os arquivos gerais regenerados foram desfeitos.

## Medidas provisórias

- **Corda:** a mesma do francês (ponta, bucha; diâmetro de outro fabricante).
- **Estribo:** a altura de 15 cm, já provisória na tabela.
- **Escolhas de desenho no `triceps-corda`:**
  - a posição dos pés e da pelve, o pescoço e quanto o braço vai para o meio (2°);
  - as mãos a 13 cm em cima;
  - o cabo a 20° da vertical em cima;
  - o braço 15° à frente da linha do tronco, com o tronco a 15° (a ficha só diz "levemente", até 20°);
  - o cotovelo a 112° em cima.
- **Escolhas de desenho no unilateral:**
  - o tronco a 18°;
  - o cabo a 64° da horizontal no alongado;
  - a mão a 5 cm do meio no alongado;
  - a posição da mão na cintura;
  - os ângulos do braço herdados do francês.

## Ramo e commits

- **Ramo:** `worktree-agent-a25594c1b12208b97`.
- **Commits:**
  - `858d25c`: tríceps na polia com corda;
  - `b8ba28a`: tríceps francês unilateral na polia, com estribo;
  - o último commit do ramo: este relatório e a nota do aviso de Músculos no `triceps-corda.md`.
