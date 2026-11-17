# Relatório · roda abdominal e face pull com elástico

As duas animações ficaram prontas: a conferência automática dá **0 falha** em cada uma, no homem e na mulher.

## face-pull-elastico

**Conferência automática: 0 falha e 3 avisos.**

1. **"Mais esticado em cima":** é o aviso geral do elástico, que espera a maior tensão no primeiro quadro. Aqui a ficha pede o contrário (a tensão maior no fim), e a regra nova `elastico-face-pull-esticado-no-comeco` mede isso.
2. **As linhas que são escolha de desenho.**
3. **Músculos:** o ombro de trás aparece com **33 cm² de lado** (é a vista padrão do modo Músculos). De cima, aparece com 0 cm², como no face pull na polia aprovado.

Antes, o ombro de trás aparecia com 9 cm² no máximo. Resolvi com a pose dos braços do face pull na polia: no fim, o cotovelo fica 7,4 cm atrás da linha do ombro e 13,4 cm acima dele.

**A montagem:**

- O tubo é o de 48 pol (`elastico`). Ele estica de 1,15 a 2,0 vezes: nunca fica frouxo e fica longe do máximo de 3.
- A âncora fica numa porta fechada à frente, no vão da dobradiça, 9 cm acima do trágio.
- O tubo passa a no mínimo 10 cm da pele.
- As vistas: de lado, depois de cima.

**O que não ficou bom** (`docs/revisoes/animacao-nova/quadros/face-pull-elastico.png`):

- **Os antebraços não ficam na vertical** (ficam a 72° dela, quadro `lateral:tec:f1`).
  - Sem a corda, abri as mãos para 18 cm do meio (eram 14 na polia).
  - Com 20 a 26 cm, o antebraço chega a 40°, mas o ombro de trás cai para 4 a 21 cm², abaixo do mínimo de 30.
  - Para ele voltar a aparecer, o cotovelo teria de sair da linha do corpo.
  - O limite é o desenho do deltoide, que não posso mudar.
- De lado, no fim, o braço e o tubo passam na frente do rosto no desenho. É o mesmo do face pull aprovado.

**Risco: médio.** A pose é a do face pull aprovado, e o elástico fecha a conta. Mas o cartão pede "antebraços apontando para cima", e o boneco não chega lá.

## roda-abdominal

**Conferência automática: 0 falha e 2 avisos.**

1. Flexão plantar de 80,7°: o peito do pé fica no colchonete, como na puxada unilateral aprovada.
2. As linhas que são escolha de desenho.

Medido:

| O que se pede | O que o boneco faz |
|---|---|
| Joelhos e pés parados | andam 0 cm no ciclo |
| Braços quase retos | o cotovelo fica a 8° a ida toda |
| Roda embaixo dos ombros no começo | 0,1 cm |
| A roda rola sem escorregar | anda 65 cm e gira 368°, com erro de 0 cm; três furos no cubo giram com ela |
| O quadril acompanha | anda 30 cm junto e nunca para |
| A lombar não afunda | fica 4° menos curvada que em pé a ida toda |
| Corpo reto no ponto mais longe | a linha dos joelhos aos ombros fica a 37° do chão, e o quadril, a 0,2 cm dela |
| O rosto e o peito longe do chão | no mínimo 54 cm e 23 cm |
| Ritmo | ida de 2,5 s e volta de 1,5 s; 4,1% de salto de velocidade (o limite é 15%) |

As vistas: de lado, depois de três quartos pela frente (o abdômen aparece com 159 e 144 cm²). De cima, o abdômen aparece com 0 cm².

A roda é peça nova, com as medidas da Rogue Ab Wheel e o desenho do gerador realista. As mãos fecham nos pegadores.

**O que não ficou bom** (`docs/revisoes/animacao-nova/quadros/roda-abdominal.png`):

- Os dois rótulos ficam acima das costas, e os fios descem até a lombar e o quadril, cruzando o contorno das costas. Eles não se cruzam entre si. É o mesmo jeito do "peito parado" aprovado.
- O erro "arquear a lombar" é discreto, de propósito: a lombar afunda 16° e a pelve fica 5 cm mais baixa.

**Risco: médio.** É a primeira animação de prancha com a roda, e o desenho da peça é novo. Ainda não foi visto pelo dono ao lado do kettlebell e do banco.

## Arquivos comuns que mexi (só aditivo)

- Uma linha em cada registro:
  - `exercicios/registro.ts`: `facePullElastico` e `rodaAbdominal`;
  - `regras/registro.ts`: `REGRAS_RODA_ABDOMINAL`;
  - `dados/objetos/registro.ts`: `rodaAbdominal`.
- `regras/elasticos.ts`: duas regras novas, `elastico-face-pull-ancora-na-altura-da-testa` e `elastico-face-pull-esticado-no-comeco`, e o import de `obj`.
- Não mexi em `pecas.ts`, `equipamento.ts` nem nos núcleos.
- `npm run check` passa, e `npm run conferir:animacao` dá 0 falha em todas as animações. Os arquivos gerais regenerados foram desfeitos.

## Medidas provisórias

- **Roda:** o cubo (12,8 cm) e o eixo (2,2 cm) são escolha de desenho, tirada do cartão de hoje. O eixo à mostra (3,2 cm) é derivado da página.
- **Fonte da roda:** a página do produto da Rogue dá 8 pol de diâmetro, mas o guia do produto da Rogue dá 7,25 pol. Usei 8 pol.
- **Ficha da roda:** `joelhos.meiaDistancia`, `colchonete.z`, `inicio.coxa` e `cervical` são escolha de desenho. O ângulo de 37° vem da correção de 04/11, não da ficha da técnica.
- **Ficha do face pull:** `elastico.esticaNoInicio` (1,15) não tem número na ficha. `joelho`, `cervical`, `cabeca`, `elastico.noQuadro`, `inicio.maos`, `fim.aFrente` e `fim.polo.tras` são escolha de desenho.
- **Da tabela, sem mudança:** a alça da âncora (`porta.alcaComp`) e o colchonete continuam provisórios.

## Ramo e commits

- Ramo: `worktree-agent-a4f845c172e3990a5`.
- `96a97a8`: face pull com elástico.
- `558deee`: roda abdominal.
- O último commit do ramo: este relatório.
