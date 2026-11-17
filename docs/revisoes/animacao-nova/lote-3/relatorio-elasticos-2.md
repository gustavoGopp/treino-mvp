# Relatório · elásticos, 2ª família (elevação lateral, desenvolvimento, crucifixo, extensão de joelho)

Entreguei os quatro exercícios. `npm run check` passa. `npm run conferir:animacao` dá 0 falha nas 67 animações. Os arquivos gerais regenerados foram desfeitos e não entraram em nenhum commit. As conferências escritas estão em `lote-3/elevacao-lateral-elastico.md`, `lote-3/desenvolvimento-elastico.md`, `lote-3/crucifixo-elastico.md` e `lote-7/extensao-joelho-elastico.md`.

## elevacao-lateral-elastico

- **Conferência:** 0 falha e 4 avisos:
  - "mais esticado em cima": o ciclo começa embaixo;
  - as linhas de desenho, as mesmas da elevação com halteres;
  - a frente do ombro aparece como "só ajuda", como na aprovada;
  - de cima, o principal aparece 17 cm² (78 de frente).
- **Tubo da tabela:** estica de 1,3 a 2,5 vezes no homem e de 1,2 a 2,3 na mulher. Passa por fora das pernas e sob o meio das solas.
- **O que não ficou bom** (`quadros/elevacao-lateral-elastico.png`):
  - de cima, embaixo, o corpo visto pela cabeça é um borrão, como na elevação com halteres aprovada;
  - o rótulo "pise no meio do elástico" de hoje saiu, porque o máximo é dois rótulos por vista.
- **Risco: baixo.** O braço, o corpo, os erros e as vistas são os da elevação com halteres aprovada.

## desenvolvimento-elastico

- **Conferência:** 0 falha e 3 avisos:
  - "mais esticado em cima";
  - as linhas de desenho;
  - de frente, o principal aparece 0 cm² (40 de lado), como no desenvolvimento aprovado.
- **O tubo de 48 pol não fecha a conta.** Em cima ele esticaria cerca de 3,5 vezes, e o máximo é 3. Criei o objeto `elasticoTuboLongo` (`dados/objetos/elastico-tubo-longo.json`):
  - tubo de 60 pol, da Spartan by Power Systems, com capa; a Life Fitness tem a mesma medida;
  - o máximo de 3,3 vezes é derivado da frase "can stretch to 199"".
- **Quanto o tubo estica:** de 2,3 a 2,8 vezes no homem e de 2,1 a 2,6 na mulher.
- **O que não ficou bom** (`quadros/desenvolvimento-elastico.png`):
  - a vista de lado tem um rótulo só. O fio de "cotovelos um pouco à frente" cruzava a cabeça no alto; acima do corpo, o quadro abria e o corpo ficava pequeno;
  - de lado, o tubo do lado de perto aparece como uma linha sobre o ombro e o tronco;
  - de trás, a conta de área dava 73 cm², mas o desenho põe a mancha da frente do ombro atrás do braço levantado. Por isso a vista padrão do modo Músculos ficou a de lado.
- **Risco: médio.** A pose em pé com os dois braços é nova, o tubo é outro, e falta o rótulo do cotovelo.

## crucifixo-elastico

- **Conferência:** 0 falha e 3 avisos:
  - "mais esticado em cima": o ciclo começa no alongado, como a ficha pede;
  - as linhas de desenho;
  - de cima, o peito aparece 0 cm² (474 de frente).
- **Montagem:** a porta fica atrás, com a âncora no vão da dobradiça, na altura do peito.
- **O tubo:** é o de 60 pol. Com o de 48 pol, o erro "frouxo" seria impossível: com as mãos a 140 cm uma da outra, ele estica pelo menos 1,15 vezes. Estica de 1,3 a 1,7 vezes no homem e de 1,3 a 1,8 na mulher.
- **O braço:** o arco é novo, porque o motor novo não tem crucifixo aprovado. O cotovelo fica a 20° o ciclo todo, e o tubo contorna o braço e as costas.
- **O que não ficou bom** (`quadros/crucifixo-elastico.png`):
  - de frente, sem rótulo: ao lado do corpo, o fio cruzava a mão ou o antebraço; acima, o texto caía sobre o batente da porta;
  - de cima, o fio de "abraça a árvore" cruza o antebraço no fim;
  - de frente, a porta ocupa metade do fundo;
  - no erro "frouxo", o tubo fica no comprimento de repouso e cai 4%, por escolha de desenho.
- **Vista padrão do modo Músculos:** a de frente, e não a de cima como no motor de hoje, porque de cima o peito não aparece.
- **Risco: médio.**

## extensao-joelho-elastico

- **Conferência:** 0 falha e 2 avisos ("mais esticado em cima" e as linhas de desenho).
  - O item de ritmo dá 0%: ele não acompanha o tornozelo, que é o único ponto que anda.
- **Montagem:** sentado na ponta do banco reto, que o cartão aceita. Na cadeira da tabela, o tubo passaria pela travessa entre os pés da frente.
  - Um pegador do tubo de 48 pol fica na frente do tornozelo.
  - O tubo passa debaixo do banco, 4,2 cm longe dele, até uma âncora de porta a 10 cm do chão, atrás.
  - Estica de 1,2 a 1,4 vezes no homem e de 1,1 a 1,5 na mulher.
- **O que não ficou bom** (`quadros/extensao-joelho-elastico.png`):
  - embaixo, o joelho do homem dobra só 69°. Mais que isso, o pé encosta no chão nesse banco de 43,5 cm. A mulher chega a 83°, e hoje são ~87°;
  - o fio de "desce devagar" passa rente ao pé em cima;
  - de lado, o banco aparece inteiro.
- **Risco: médio.** A pose no banco é nova, o joelho embaixo dobra menos que hoje, e a âncora é a porta, e não o poste de hoje.

## Arquivos comuns que mexi (todos aditivos)

- **`exercicios/elevar-o-braco.ts`:** `MaosDaElevacao` ganhou `'elastico'`.
- **`exercicios/empurrar-para-cima.ts`:** `CargaDoDesenvolvimento` ganhou `'elastico'`, em pé e com os dois braços.
- **`exercicios/rosca-elastico.ts`:** a função `bordasDaSola` passou a ser exportada.
- **`pecas-de-cena/elastico-ancora-no-alto.ts`:** ganhou o argumento opcional `atras`, para a porta atrás de quem treina.
- **`movimento.ts`, `rotulos.ts` e `cena.ts`:** o rótulo da ficha ganhou o campo opcional `acima: true`, que põe o texto só acima do corpo. Sem ele, na elevação, o fio de "ombro longe da orelha" cruzava o braço levantado.
- **`regras/elasticos.ts`:** oito regras novas, todas `elastico-*`.
- **Registros:** uma linha por exercício em `exercicios/registro.ts` e `elasticoTuboLongo` em `dados/objetos/registro.ts`.
- **Conferido sem mudança:** o resumo SHA-1 de todos os quadros e enquadramentos das 62 animações anteriores dá o mesmo, antes e depois. Não mexi em `pecas.ts` nem em `equipamento.ts`.

## Medidas provisórias

- **Tubo de 60 pol:** o diâmetro e as medidas do pegador e da fita copiam o tubo da tabela. O máximo de 3,3 vezes é derivado de um fabricante só.
- **Linhas de desenho das fichas:** listadas nos avisos de cada exercício (a base, os pés, as mãos, a folga e o trecho do tubo no quadro, entre outras).

## Ramo e commits

- **Ramo:** `worktree-agent-ae2173448f28a32d2`.
- **Commits:**
  - `e77a11e`: elevação lateral;
  - `6864169`: desenvolvimento;
  - `311e5ec`: crucifixo;
  - `1a42191`: extensão de joelho;
  - o último commit do ramo: este relatório.
- Sem push, merge ou pull request.
