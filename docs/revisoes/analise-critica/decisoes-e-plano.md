# Decisões do Gustavo e o plano de melhorias

19/11/2026, atualizado em 21/11/2026. Continuação de [`relatorio.md`](relatorio.md). Este arquivo registra o que o Gustavo respondeu depois de ler a análise e o que sai disso. **Nada no app foi alterado**: o plano é para uma sessão de construção, e o texto pronto para ela está em [`docs/prompts/sessao-melhorias-analise-critica.md`](../../prompts/sessao-melhorias-analise-critica.md).

## As decisões

| Pergunta | O que o Gustavo respondeu | O que isso vira |
|---|---|---|
| Para quem é o app agora? | "O principal de fato sou eu, mas já tenho alguns amigos solicitando para usar e quero deixar redondo para poder compartilhar com qualquer pessoa." | O ranking pensado para desconhecidos vale |
| O app pode chutar o equipamento? | Escolheu "programa na hora" | Lote M1 |
| Servidor pequeno ou app de loja, para os avisos? | "O que você recomendar e for gratuito." Ele usa Android, a maioria dos amigos usa iPhone, e ele quer "que todos tivessem capacidade de fazer as mesmas coisas" | Lote M4, com um limite dito abaixo |
| O ramo das animações entra antes? | "A sessão das animações ainda está em andamento e sendo finalizada" | O lote M2 separa o que espera do que não espera |
| A triagem fica como está? | "Não acho que precise ficar assim"; e, sobre até onde mudar, "como você entender mais correto" | Lote M6, com a minha escolha explicada |
| O app ganha um nome agora? | Em 19/11, "sim". **Em 21/11, mudou:** "podemos manter do jeito que tá, acho que a gente pode deixar isso para depois" | O lote M0 sai da fila. Os candidatos ficam guardados no fim deste arquivo |
| Parar uma semana para ver 5 pessoas usando? | "Só depois das melhorias" | Vira o fecho do plano |
| Testar o cartão da semana? | Pediu a explicação (abaixo) | Entra no lote M5 |
| O que esta sessão faz agora? | Escrever o plano e o prompt, sem mexer no código | Este arquivo e o prompt |
| A ordem entre este plano e os pacotes D? (21/11) | "Eu quero que você faça a ordem recomendada" | A fila da seção "A ordem decidida" |
| Como a construção começa? (21/11) | Uma conversa paralela, aberta pela sessão da análise; uma só, em fila | A conversa nova segue a fila, um item de cada vez. Esta sessão continua como crítica de fora |

## Duas explicações que ele pediu

### Como é "chutar o equipamento"

O app já faz isso, mas só num dos atalhos. Ao tocar em "Academia completa", ele preenche sozinho as respostas típicas (halteres de 2 a 40 kg, de 2 em 2) e o programa sai na hora. O próprio código diz que essas respostas "ficam editáveis em 'Meus locais'; a 1ª série de cada exercício acerta a carga" (`src/domain/taxonomia/atalhos.ts:24-27`, `:99`).

A mudança é dar o mesmo tratamento aos atalhos "Condomínio" e "Casa":

| | Hoje | Com o chute |
|---|---|---|
| Toca no atalho de casa e em "Gerar meu programa" | Abre a folha de manoplas e anilhas, com erros em vermelho | O programa aparece |
| De onde vêm os pesos | A pessoa conta as anilhas | O app supõe um kit típico |
| Se o chute estiver errado | Não se aplica | Na hora de anotar a carga, a lista ganha "não tenho esse peso". O app pergunta uma vez qual é o mais pesado e refaz o que precisar |
| Onde conferir tudo | No cadastro, obrigatório | Uma linha no programa: "Montado para um kit típico de casa. Ajustar" |

**O risco:** o app sugerir um peso que a pessoa não tem. Ele aparece no primeiro treino, que é quando ela está diante dos pesos e sabe responder.

### O que é o "cartão da semana"

Uma imagem que o app monta no fim do treino, com um botão "Mandar":

```
┌───────────────────────────┐
│  (nome do app)            │
│                           │
│   3 de 3                  │
│   treinos nesta semana    │
│                           │
│   5ª semana seguida       │
│   ■ ■ ■ ■ ■               │
└───────────────────────────┘
        [ Mandar ]
```

O botão abre a tela de compartilhar do próprio celular, e a pessoa escolhe o grupo do WhatsApp. Não há conta nem servidor. Só sai do aparelho essa imagem, e só quando ela quiser. O grupo vira o placar: cada um manda o seu. Mostra **só frequência**, nunca peso levantado (o porquê está no relatório, na parte da competição entre amigos).

## Avisos do descanso: o que é gratuito, e o limite

O pedido tem duas partes que não cabem inteiras juntas: **gratuito** e **igual para todos**. Digo sem rodeio o que dá e o que não dá.

**O caminho gratuito, em dois passos:**

1. **Sem servidor.** Trocar o bipe por um som de arquivo, que pelas fontes do WebKit não é calado pela chave do silencioso do iPhone, e mostrar a hora do fim ("descanso até 14:32"). Resolve o app aberto. Não resolve o celular bloqueado.
2. **Aviso com o celular bloqueado.** O app já tem um serviço na Vercel. O plano gratuito permite funções de até 5 minutos ([Vercel](https://vercel.com/docs/plans/hobby)), o que cobre um descanso, e há fila gratuita de 500 a 1.000 avisos por dia ([Upstash](https://upstash.com/pricing/qstash)). Basta para um grupo de amigos. O que sai do aparelho é um endereço de aviso e um horário; nenhum dado de treino ou de saúde.

**O que fica igual nos dois celulares, com esse caminho:**

| | Android | iPhone |
|---|---|---|
| Som com o app aberto | Sim | Sim, com o som de arquivo (a confirmar no aparelho) |
| Aviso visível na tela bloqueada | Sim | Sim, **só com o app instalado na tela de início** |
| Vibração | Sim | **Não.** Um site não vibra no iPhone |
| Som do aviso com a tela bloqueada | Sim | **Incerto.** Há relatos de que chega sem som ([fórum da Apple](https://developer.apple.com/forums/thread/728022)) |

**O que igualaria tudo:** um aplicativo de loja. Não é gratuito (a Apple cobra anuidade de desenvolvedor) e está fora do escopo atual. **Não recomendo agora.** A decisão fica para depois de medir os dois passos em aparelhos de verdade: se no iPhone o aviso chegar visível e os amigos acharem suficiente, o assunto se encerra sem gasto.

Parte dessas fontes eu vi só pelo resumo da busca; por isso o lote M4 termina com uma tabela medida num iPhone e num Android.

## A triagem: a minha escolha, e por quê

O Gustavo deixou comigo. Escolho **perguntas de seguimento para o caso comum, mais uma saída para quem ainda não foi avaliado**.

- **Como fica.** Quem marca pressão alta ou remédio contínuo responde mais duas ou três perguntas, com texto próprio: está controlada? o médico restringiu exercício? Se está controlada e não há restrição, o programa é liberado **com cuidados** (intensidade moderada, respirar sem prender o ar, parar com tontura ou dor no peito). Qualquer outra resposta, e todos os outros "sim" (dor no peito, desmaio, gravidez, médico que pediu acompanhamento), continuam bloqueando.
- **Por que acho o mais correto.**
  1. É a regra que a pesquisa do próprio projeto propõe, depois de ler as diretrizes (`docs/pesquisa-v2/23-dor-pressao-alta-e-gestacao.md`, linha 9 e a "Regra proposta" da linha 81).
  2. O bloqueio de hoje abre com uma caixinha e não pergunta nada útil. Perguntar "está controlada?" colhe mais do que a caixinha.
  3. Quem é honesto deixa de ser o único barrado.
- **O que precisa ficar dito.** Não sou profissional de saúde, e não houve revisão por um. A regra entra com o selo "consenso", a fonte, e o registro de que espera essa revisão. O texto das perguntas tem de ser próprio: o do questionário original exige autorização por escrito.

## O plano, em lotes

**Ordem:** o que mais faz um desconhecido desistir vem primeiro, ajustado pelo que depende de outras sessões. Um lote de cada vez, parando para a revisão do Gustavo ao fim de cada um.

### M0. O nome (adiado em 21/11)
- O app continua "treino-mvp". Nada de trocar título, ícone ou arquivo por enquanto.
- Quando o Gustavo quiser retomar: os candidatos estão no fim; o que trocar está no prompt.

### M1. A porta
- **O que muda para quem usa:**
  - "Condomínio" e "Casa" geram o programa na hora, com um kit típico. O atalho de casa passa a supor halteres comuns, não de montar.
  - Entra a opção "Nunca treinei", que não faz mais a pergunta da pausa.
  - A abertura diz o que a pessoa vai receber e mostra o boneco.
  - Os erros em vermelho só aparecem depois que a pessoa mexeu no campo.
- **Como saber se melhorou:** 15 toques ou menos da abertura ao programa, nos quatro atalhos, **contando** a tela de equipamento. Hoje são 13, 21 e 24.
- **Decisão antiga que muda:** "os detalhes que mudam o programa continuam sendo perguntados".

### M2. O guia chega
- **O que muda para quem usa:**
  - Tocar no boneco, durante o treino, abre o movimento grande por cima da tela, com um "fechar". A pausa vira um botão próprio.
  - A cabeça do boneco não é mais coberta pelo rótulo.
  - As 79 animações de barra e de máquina passam a aparecer.
- **Como saber se melhorou:** o boneco ampliado ocupa metade da tela ou mais; nenhum boneco cortado em telas de 320 × 568 a 412 × 839; 95% ou mais dos exercícios com animação nos programas de academia.
- **Depende de:** a junção do ramo das animações, **só** para a terceira parte. As duas primeiras não esperam.

### M3. A primeira sessão fala a língua de quem começa
- **O que muda para quem usa:**
  - "2 séries de 8 a 15 repetições" no lugar de "2 × 8–15"; "sobrando 3 ou 4" no lugar de "RIR 3–4".
  - Na semana leve, o programa diz "semana leve: metade das séries".
  - A carga não cai para quem ficou dentro da meta que a tela mostra.
  - "Calibrar" e "acerto da carga" viram uma frase que se entende.
- **Como saber se melhorou:** as explicações a zero toque de onde a dúvida nasce; um teste novo, "dentro da meta mostrada, o app mantém a carga".
- **Cruza com:** o pacote D1 da sessão de desenvolvimento 2, que já vai conferir a regra de acerto da carga.

### M4. O descanso avisa
- **O que muda para quem usa:** os dois passos da seção de avisos, acima.
- **Como saber se melhorou:** a tabela preenchida num iPhone e num Android de verdade (app aberto; em outro app; tela bloqueada; no silencioso).
- **Princípio que muda:** "tudo fica no aparelho" ganha uma exceção, o endereço de aviso. O texto "o que sai daqui" tem de dizer isso.
- **Depende do Gustavo:** fazer o teste no Android dele e pedir a um amigo o do iPhone.

### M5. Um motivo para voltar
- **O que muda para quem usa:**
  - O fim do treino em palavras: "2º treino da semana. Falta 1." e o que melhorou.
  - Uma recepção para quem volta depois de 3 a 13 dias (hoje só existe a partir de 14).
  - A tela da semana abre pelas semanas com treino; a tabela de músculos vai para uma gaveta.
  - "Quando é o próximo?" cria um compromisso na agenda do celular.
  - O cartão da semana.
- **Como saber se melhorou:** cada texto com teste de tela; o cartão sai pelo botão de compartilhar do celular, com a alternativa de salvar a imagem.
- **Decisões antigas que mudam:** "sem sequência, medalha, confete" (em parte) e "sem recursos sociais" (na letra; a privacidade fica intacta). A regra "sem vermelho e sem 'você falhou'" continua.

### M6. A triagem
- **O que muda para quem usa:** o que está na seção da triagem, acima; e some a terceira passada pelas mesmas perguntas.
- **Como saber se melhorou:** a persona de 55 anos com pressão controlada chega ao programa respondendo a verdade; os outros "sim" continuam bloqueando; a regra nova aparece em "Entenda o treino".
- **Cruza com:** o pacote D2, que já leva ao Gustavo a saída para quem não foi avaliado.

### Fecho. Gente de verdade
- Cinco pessoas que nunca viram o app, cada uma com o seu equipamento. Só observar: quantas chegam ao programa sem ajuda, e em quanto tempo.
- O cartão da semana no grupo da família, por 4 semanas: quantas pessoas mandam sem ninguém pedir.

## Onde este plano encontra as outras sessões

| Outra sessão | Onde cruza | Como ficou |
|---|---|---|
| Animações (`claude/great-dirac-cabwvh`, em andamento) | M2, parte 3 | Não tocar em `src/engine/novo/` nem no catálogo até ela ir para a `main`. Combinar quem liga as 79 animações |
| Desenvolvimento 2, pacote D1 (regras contra o código) | M3, a regra de acerto da carga | Os dois são feitos juntos, e a regra é mexida uma vez só |
| Desenvolvimento 2, pacote D2 (nada se perde) | M6, a saída da triagem | Fica no M6; o D2 pula esse ponto |
| Desenvolvimento 2, D3 e D4 | Nada (o D4 espera as animações) | No fim da fila |

### A ordem decidida (21/11)

O Gustavo confirmou a ordem recomendada, numa conversa só:

| Ordem | Item | Por quê |
|---|---|---|
| 1 | M1 A porta | É onde um desconhecido desiste |
| 2 | D2 Nada se perde | Perder dados é o pior que pode acontecer a quem já usa |
| 3 | M2 O guia chega | O que o app tem de seu chega pela metade |
| 4 | M3 A primeira sessão, junto com D1 | Os dois mexem na mesma regra |
| 5 | M4 O descanso avisa | Depende de teste em aparelho |
| 6 | M5 Um motivo para voltar | |
| 7 | M6 A triagem | Texto de segurança, com calma |
| 8 | D3 Os ajustes do treino | |
| 9 | D4 Mais leve | |

Os pacotes D vêm de outra análise, com outro critério (o que engana ou perde dados). A fila é uma só para que ninguém mexa no mesmo arquivo ao mesmo tempo.

## Candidatos de nome (guardados para depois)

O nome foi adiado em 21/11. Fica aqui o que já foi pensado.

Critérios: curto, em português, fácil de dizer em voz alta, e que diga algo do que o app tem de seu.

| Nome | Por quê |
|---|---|
| **Firme** | É a palavra que o app já usa sobre o corpo no meio do movimento, e é como se diz que está tudo certo ("tá firme"). Dá voz aos textos: "semana firme: 3 de 3" |
| **Mais Uma** | A frase da academia: mais uma repetição, mais uma série, mais uma semana. Combina com contar frequência, sem culpa |
| **Repê** | De "repetição". Curto, com jeito de apelido |
| **Boneco** | O app já chama assim o seu guia, e é o que nenhum outro tem |
| **Cabe** | "Cabe na sua casa, cabe na sua semana." É a promessa do equipamento e do tempo |
| **Com o que tem** | A promessa inteira no nome. É comprido para um ícone |

**A minha preferência:** Firme, depois Mais Uma. É gosto, não medida.

**Um aviso:** fiz uma busca rápida e não achei aplicativo de treino com esses nomes. Isso **não** é uma checagem de marca. Antes de adotar, vale procurar o nome na base de marcas do INPI e nas duas lojas de aplicativos.

## O que o Gustavo precisa fazer

1. Revisar cada item quando a conversa de construção parar, e dar o ok antes de ele ir para a `main`.
2. Responder às decisões que ela trouxer, uma de cada vez. A primeira deve ser a frase da abertura (M1).
3. No item M4: fazer o teste do descanso no Android e pedir a um amigo o do iPhone.
4. No fecho: achar as cinco pessoas.
5. Quando quiser: escolher o nome.
