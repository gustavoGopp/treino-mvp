# Lote C3 · Panturrilha em pé na máquina (`panturrilha-em-pe-maquina`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé no degrau da máquina, de frente para a torre, os ombros sob as almofadas, as mãos nos pegadores; a ponta dos pés na borda de trás do degrau, os joelhos quase estendidos e parados; o calcanhar desce abaixo da borda e sobe o máximo. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-em-pe-maquina.md`. Cartão do app: `src/conteudo/exercicios/panturrilha-em-pe-maquina.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/panturrilha-em-pe-maquina.json`.
- Animação: `src/engine/novo/exercicios/panturrilha-em-pe-maquina.ts`, sobre o núcleo aprovado das panturrilhas em pé (`exercicios/elevar-o-calcanhar.ts`, sem mudança). Regras: as das panturrilhas aprovadas (`regras/panturrilhas.ts`) e três novas em `regras/panturrilhas-maquinas.ts`.
- Peça nova: `pecas-de-cena/panturrilha-em-pe.ts`, medidas em `dados/objetos/panturrilha-em-pe.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-panturrilha-em-pe.png`.
- Quadros grandes: `../quadros/panturrilha-em-pe-maquina.png`. Sem folha ao lado da de hoje (não havia animação).

## Onde os números saem

A ficha da técnica não dá número. O arco do pé é o da **panturrilha no degrau aprovada**: o calcanhar de 6 cm abaixo a 13,9 cm acima da borda, os pés na largura do quadril, os joelhos a 4°, a bola do pé 2 cm para dentro da borda. O corpo sobe pelo núcleo aprovado: o centro de massa (o corpo mais 40 kg das almofadas, só para o equilíbrio) fica sobre a bola do pé, o tronco na vertical. Em cada quadro, o braço da máquina gira até a face de baixo das almofadas encostar no alto dos ombros (afundando 1 cm); a altura do alto dos ombros em relação à base do pescoço, com os braços nos pegadores, é calibrada uma vez por corpo.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Ombros sob as almofadas | consenso | o alto dos ombros fica de 1 a 1,1 cm dentro da face de baixo das almofadas, nos dois lados e em todos os quadros; a base do pescoço anda 1,3 cm debaixo delas, de frente para trás (o braço gira num arco) | sim |
| Ponta dos pés na borda da plataforma | consenso | a bola do pé a 2 cm da borda de trás do degrau, parada (0 cm no ciclo) | sim |
| Joelhos estendidos sem travar, parados (o gastrocnêmio alongado) | um estudo (`kinoshita2023`) | o joelho fica a 4° o ciclo inteiro | sim |
| Calcanhar bem abaixo da plataforma, até o alongamento máximo, pausa de ~1 s | um estudo (`kassiano2023b`) | 2,5 s descendo; embaixo o calcanhar fica 6 cm abaixo da borda (dorsiflexão de 30,2°); pausa de 1,2 s | sim (aviso da dorsiflexão, abaixo) |
| Sobe o calcanhar o máximo possível | consenso | 1 s subindo; em cima o calcanhar fica 13,9 cm acima do degrau (flexão plantar de 39°); 0,5 s no topo | sim |
| O corpo sobe reto | mecânica | o centro de massa (corpo + carga) fica a 0 cm da vertical da bola do pé; a cabeça anda 0,9 cm para a frente ou para trás | sim |
| A máquina acompanha o corpo; a pilha sobe | medida | as almofadas sobem 12,5 cm com os ombros (o braço gira 10°); os pegadores andam com elas e as mãos ficam neles (0 cm); as placas sobem o arco do came, de 0,4 cm embaixo a 2,4 cm em cima, sem descansar | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs panturrilha-em-pe-maquina`): **0 falhas, 2 avisos.**

- **Dorsiflexão 30,2°** (média da tabela 14,8°; a panturrilha no degrau aprovada tem o mesmo aviso, com os mesmos 6 cm): é o alongamento que a ficha pede, com o joelho estendido.
- **Provisórios:** a largura dos pés, a bola do pé na borda, a altura em cima (da animação aprovada), o quanto as almofadas afundam, a carga para o equilíbrio, as placas no pino e a folga da posição inicial.

O resto: proporções exatas, nenhum membro deixa de alcançar, o corpo não atravessa as almofadas além de 0,4 cm, ritmo suave (5,8% da velocidade de pico), simetria e fecho do ciclo em 0 cm, o centro de massa sempre sobre o apoio.

## A vista

De lado (a vista que o app abre) se vê o corpo inteiro, o braço das almofadas e o calcanhar descendo atrás da borda do degrau. O pé tem o tamanho do da panturrilha no degrau aprovada (o corpo inteiro no quadro): pequeno, mas o calcanhar abaixo da borda se lê no quadro de baixo. Por isso **não usei `enquadra`**. A segunda vista é de três quartos por trás (como na panturrilha no degrau): os dois calcanhares descendo atrás do degrau e as almofadas nos ombros, com a cabeça entre elas. De frente e de três quartos pela frente, a torre fica atrás e o tornozelo some atrás da canela; de trás (direto), as panturrilhas aparecem bem no modo Músculos, mas a máquina vira duas almofadas soltas.

## Os erros

| Erro | O que o desenho mostra (medido) | Vista, instante |
|---|---|---|
| Subida e descida curtas | "sem passar da linha da plataforma": embaixo o calcanhar para na altura do degrau (no certo, 6 cm abaixo); em cima sobe só 6 cm (no certo, 13,9) | lateral, embaixo |
| Dobrar os joelhos | embaixo os joelhos dobram 25° (como no erro da panturrilha no step aprovada) e esticam na subida, dando impulso; as almofadas descem com os ombros e a posição inicial do braço fica abaixo desse ponto (as placas não descansam) | lateral, embaixo |
| Quicar | **sem desenho**: é erro de ritmo ("sem pausa embaixo"); a pose do quique é a do movimento certo. Quem integra põe "Quicar" em `SEM_DESENHO` do teste da ponte, como o "Quicar embaixo" da panturrilha no degrau e no leg press | — |

## O que não ficou bom

- **O pé é pequeno no quadro de lado** (o corpo inteiro): o calcanhar abaixo da borda se lê, mas não tanto quanto no quadro cortado do leg press. Se o Gustavo achar pouco, a saída é o `enquadra` na vista de lado (das coxas para baixo), perdendo as almofadas nos ombros nessa vista.
- **As placas sobem pouco** (2 cm): o came fica no eixo, como na cadeira flexora aprovada. Uma máquina de verdade multiplica o curso (a Atlantis M118 diz que as roldanas aumentam a carga 1,5 vez), o que exigiria desenhar roldanas que nenhuma ficha mostra.
- **De três quartos por trás, o rótulo "calcanhar embaixo" fica em cima do trilho da base** (o texto, não a linha); e o nome do erro "Subida e descida curtas" encosta na base, no canto de baixo do quadro.
- **De lado, a almofada de perto cobre a nuca e o queixo**: é onde ela fica (a cabeça passa entre as duas).

**Risco de o Gustavo não gostar: médio.** A máquina é nova no desenho (o braço que gira, a travessa na frente do pescoço) e o pé é pequeno de lado; o movimento e os erros seguem a panturrilha aprovada.
