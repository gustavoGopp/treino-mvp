# Relatório · elásticos (tríceps acima da cabeça, rosca, remada, puxada; face pull não entregue)

Entreguei 4 dos 5 exercícios. O `face-pull-elastico` ficou de fora: ele tem uma falha da conferência que não consegui consertar (explicada abaixo). As conferências escritas estão em `lote-5/triceps-elastico-acima.md`, `lote-5/rosca-elastico.md`, `lote-4/remada-elastico.md` e `lote-4/puxada-elastico.md`.

## O elástico novo (`elasticoLongo`, `dados/objetos/elastico-longo.json`)

É o elástico longo em laço de 41 pol, tipo "super band". O cartão admite "um elástico longo".

| Medida | Valor | Tipo | Fonte |
|---|---|---|---|
| Laço deitado | 104,1 cm (41 pol) | medida | RubberBanditz, 41" Resistance Band, https://www.rubberbanditz.com/41-in-resistance-band/ ("Lay Flat Length 41"", "Each band is 41" [104 cm] in length") |
| Volta inteira (`comp`) | 208,3 cm | derivada | 2 × 41 pol |
| Largura (faixa média) | 1,27 cm (1/2 pol) | medida | RubberBanditz |
| Espessura | 4,5 mm | medida | Serious Steel #1, https://www.living.fit/products/41-mini-resistance-band-5-35-lbs ("4.5mm thick, 5-35 lb, 1/2" wide, 41" long") |
| Estiramento máximo (`esticaAte`) | 2,5 vezes | medida | RubberBanditz ("Each band is can stretch 2.5 times its resting length"; a frase da página está truncada) |
| Diâmetro da faixa franzida na mão | 2,2 cm | **provisória** | — |

Sobre o estiramento máximo: a Serious Steel mede a tensão até 2,5 vezes, mas não diz que esse é o máximo.

A faixa é a peça própria `pecas-de-cena/elastico-longo.ts`. É chata, com borda, face e um filete claro no meio, e estreita na raiz de quanto estica. Só o tríceps precisou dela. Nos outros três, o tubo da tabela fecha a conta.

## Por exercício

### triceps-elastico-acima

- **Conferência:** 0 falha e 3 avisos:
  - dorsiflexão do tornozelo de trás de 16,6°: o pé fica inteiro no chão sobre a faixa;
  - "mais esticado em cima": o ciclo começa no alongado, que é onde a faixa estica menos, e isso está certo aqui;
  - as linhas de desenho da ficha.
- **A faixa:** estica de 1,6 a 2,1 vezes no homem e de 1,5 a 1,9 na mulher. Ela passa sob o meio da sola do pé de trás e sobe pelas costas, a 0,5 cm da pele.
- **O que não ficou bom** (`quadros/triceps-elastico-acima.png`):
  - de frente, em cima, aparecem dois traços curtos da faixa entre os antebraços;
  - as mãos ficam a 14 cm uma da outra, de centro a centro. Com 11 cm, o giro do antebraço que o núcleo resolve dá um tranco de 61%;
  - o passo é mais curto que o de hoje (22 cm à frente e 12 atrás), para o pé de trás ficar inteiro no chão;
  - o braço fica a 170,4°, e não aos 166,6° do francês. Com o tronco em pé, os 166,6° faziam a faixa passar pelos lados da cabeça.
- **Risco: médio.** O elástico é outro (o laço, e não o tubo de hoje), e o máximo de 2,5 vezes vem de um fabricante só.

### rosca-elastico

- **Conferência:** 0 falha e 2 avisos ("mais esticado em cima", porque o ciclo começa embaixo, e as linhas de desenho). A conferência completa acrescenta mais dois:
  - a vista de lado mostra 53 cm² de bíceps, contra 192 de frente;
  - o antebraço aparece como "só ajuda", como nas roscas aprovadas.
- **O tubo:** estica de 1,4 a 2,3 vezes. Ele passa por fora das pernas e sob o meio das solas.
- **O que não ficou bom:**
  - embaixo, as mãos ficam a 63 cm uma da outra. O braço abre 12° para o pegador de 12,7 cm não entrar na coxa;
  - em cima, de frente, aparece um pouco da fita do pegador.
- **Risco: baixo.** O braço, os erros e as vistas são os da rosca alternada aprovada.

### remada-elastico

- **Conferência:** 0 falha e 2 avisos ("mais esticado em cima" e as linhas de desenho). A conferência completa acrescenta um: de lado aparecem 176 cm² de costas, contra 829 de trás.
- **O tubo:** estica de 1,3 a 2,2 vezes. Sem nada a mais, o tubo de 48 pol ficaria frouxo com os braços estendidos, então ele dá duas voltas em cada mão ("segure curto", como no stiff com elástico).
- **O que não ficou bom** (`quadros/remada-elastico.png`):
  - a vista de lado tem um rótulo só. O fio de "peito alto" cruzava a cabeça;
  - de trás, o fio de "junta as escápulas no fim" atravessa o trapézio até o C7;
  - as duas voltas aparecem como um borrão azul no punho, no alongado.
- **Risco: médio.** A pose sentada é nova, e as duas voltas na mão não estão no cartão.

### puxada-elastico

- **Conferência:** 0 falha e 3 avisos no homem:
  - flexão plantar de 80,7°: o peito do pé fica no colchonete, como na puxada unilateral aprovada;
  - "mais esticado em cima";
  - as linhas de desenho.

  Na mulher há um quarto aviso: o cotovelo dobra 154,9° no fim (a unilateral aprovada tem 151,6°).
- **O tubo:** estica de 1,1 a 2,1 vezes. Ele fica preso no topo de uma porta fechada, numa peça nova (`pecas-de-cena/elastico-ancora-no-alto.ts`). A porta fica 86 cm à frente dos joelhos e é cenário: o tubo sai pela borda do quadro.
- **O que não ficou bom** (`quadros/puxada-elastico.png`):
  - no alongado, os braços ficam a uns 45° da vertical, e não "um pouco à frente". Com o tubo de 48 pol preso a 205 cm, ficar mais perto da vertical da âncora deixa o tubo frouxo;
  - no alongado, o fio de "tronco parado" passa sobre o ombro levantado;
  - o fio da trajetória do cotovelo passa pelas costas;
  - de trás, a porta aparece inteira como fundo.
- **Risco: médio.**

### face-pull-elastico: não entregue

Montei a animação: em pé, a âncora na altura da testa, no vão da porta, e o tubo esticado de 1,1 a 2,2 vezes. A conferência passava em tudo, menos nos músculos. A conferência completa dá **falha**: o deltoide de trás aparece no máximo 9 cm² em todos os quadros. O limite é 30 em pelo menos uma vista, e a medida usa o pior quadro.

Medi a área por quadro:

| Vista | Com os braços estendidos à frente | Com os braços abertos no fim |
|---|---|---|
| De trás | 0 | 95 |
| De lado | 46 | 9 |
| De cima | 0 | 0 |

Com os braços estendidos à frente, o desenho do deltoide de trás fica virado para baixo e não aparece de trás nem de cima. Baixar a âncora até o peito só leva para 9 cm². Consertar exige mudar o desenho do corpo, o que não posso fazer. Afrouxar a regra não é saída. O rascunho não entrou no ramo.

## Arquivos comuns que mexi

- **Uma linha em cada registro:**
  - `exercicios/registro.ts`: quatro exercícios;
  - `regras/registro.ts`: `regrasDosElasticos`;
  - `dados/objetos/registro.ts`: `elasticoLongo`.
- **`exercicios/triceps-frances-base.ts`** (aditivo): a carga `elastico`.
  - Em pé, com a pegada neutra do estribo e o diâmetro da faixa na mão. O núcleo devolve só o corpo e o chão.
  - O ramo da polia alta passou a testar `carga === 'corda'` em vez de `emPe`. Para a corda, dá o mesmo.
  - Os quatro franceses já feitos dão o mesmo resumo SHA-1 de todos os quadros (21 instantes, todos os erros, os dois corpos) e a mesma saída de `conferir.mjs`, antes e depois.
- **Núcleos usados sem mudança:** de `dobrar-o-cotovelo.ts`, `bracoDaRosca` e `corpoEmPe`. A porta foi redesenhada numa peça minha, virada para quem fica de frente para ela; `porta-com-ancora.ts` não mudou.
- **Não mexi** em `pecas.ts` nem em `equipamento.ts`. O pegador na mão é uma peça própria (`pecas-de-cena/elastico-pegador.ts`), pintada atrás do punho.
- **Arquivos novos da família:**
  - núcleo: `exercicios/elastico-faixa.ts`, o caminho do elástico em volta do corpo;
  - regras: `regras/elasticos.ts`, todas com ids `elastico-`;
  - peças: `pecas-de-cena/elastico-longo.ts`, `elastico-pegador.ts` e `elastico-ancora-no-alto.ts`.
- **Nomes de arquivo:** os exercícios `remada-elastico` e `puxada-elastico` usam o próprio id como nome, como o guia pede. `remada-elastico.ts` começa com `remada`, como os arquivos dos colegas das remadas com peso livre, mas o nome não colide com os deles.
- **Checagens:** `npm run check` passa. `npm run conferir:animacao` dá 0 falha nas 54 animações (a única falha era o face pull, que saiu). Os arquivos gerais regenerados foram desfeitos.

## Ramo e commits

- **Ramo:** `worktree-agent-ab280fbd7dff0bde1`.
- **Commits:**
  - `e4fb527`: tríceps acima da cabeça com elástico longo em laço;
  - `3f4519e`: rosca com elástico;
  - `0622e48`: remada sentada com elástico;
  - `4252c30`: puxada com elástico ancorado no alto;
  - o último commit do ramo: este relatório.
