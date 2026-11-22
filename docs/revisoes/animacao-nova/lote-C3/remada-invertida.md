# Lote C3 · Remada invertida (`remada-invertida`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Deitado embaixo da barra do smith, travada nos ganchos, os calcanhares no chão e o corpo reto; puxa o peito até a barra e desce até os braços estenderem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/remada-invertida.md`. Cartão do app: `src/conteudo/exercicios/remada-invertida.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-invertida.json`.
- Animação: `src/engine/novo/exercicios/remada-invertida.ts`, sobre o núcleo aprovado da suspensão (`exercicios/na-fita.ts`, sem mudança: o corpo em prancha sobre os calcanhares, girando no tornozelo) e o smith aprovado (`pecas-de-cena/smith.ts`, sem mudança). Regras novas: `src/engine/novo/regras/avulsos-c3.ts`.
- Quadros grandes: `../quadros/remada-invertida.png`. Sem folha ao lado da animação de hoje (não havia animação).

## Qual barra

A ficha aceita "no rack, no smith ou uma barra baixa de praça". **Ficou o smith**, como pedido: é peça aprovada, e a ficha diz como montá-lo ("no smith, barra travada nos ganchos"). O suporte espera a decisão do Gustavo (aberto ou gaiola). A barra fica no gancho deitado sobre o pino de 94 cm (o 5º da régua de 16 em 16 cm, a partir de 30): o centro dela a 96,6 cm, 9,9 cm abaixo da cintura da tabela. O pino de cima (110 cm) deixava o corpo a 45° da vertical em cima, mais em pé que deitado, e a remada se confundia com a da suspensão.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Barra firme na altura da cintura; no smith, travada nos ganchos | consenso | a barra não anda (0 cm), no eixo da guia (0 cm), 2,6 cm acima do pino; trava de segurança 6 cm abaixo | sim (9,9 cm abaixo da cintura: o pino mais perto que deixa o corpo deitado) |
| Pegada um pouco mais aberta que os ombros | consenso | pronada (o polegar para dentro, 88%), 1,25 vez os ombros (51 cm de centro a centro) | sim |
| (Os dois lados: aviso de 18/11) | consenso | as duas mãos inteiras na barra, a no mínimo 26,2 cm dos carros; os dois calcanhares no chão (0 cm) | sim |
| Corpo reto dos calcanhares à cabeça, calcanhares no chão | consenso | ombro, quadril e tornozelo a no mínimo 176,4°; o calcanhar no chão (0 cm), parado (0 cm), a ponta do pé para cima | sim |
| Puxa o peito até a barra | consenso | em cima, a pele do peito a 0,5 cm da barra, que encosta 24 cm abaixo da sétima cervical (logo abaixo da linha dos mamilos) | sim |
| O corpo sobe inteiro | consenso | o corpo vai de 73° a 54,9° da vertical (do tornozelo ao ombro), girando nos calcanhares | sim |
| Cotovelos indo para trás | consenso | no fim, o cotovelo passa 0,3 cm da linha das costas | sim (no limite) |
| Desce até os braços estenderem, ~2 s | consenso | embaixo, o cotovelo dobra 8°; descida de 2,1 s | sim |
| Escápulas se juntam (da remada na suspensão aprovada) | consenso | a clavícula vai 15,1° para trás do começo ao fim | sim |
| Nada atravessa a barra | desenho | fora as mãos, a pele fica a no mínimo 1,2 cm dela | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) Ritmo: salto de 17,1% da velocidade de pico (cotovelo, na puxada), abaixo do limite de 25%. (2) As linhas da ficha de movimento que são escolha de desenho.

## As vistas

**De lado** (padrão): o corpo em prancha subindo até a barra, os calcanhares no chão. O lado de perto do smith (guia, carro e montante) é pintado atrás do corpo (`atras: −1`, como no supino no smith); a barra aparece de topo, nas mãos. O quadro mostra o smith só até 120 cm e 30 cm para cada lado da barra (`noQuadro`): com a máquina inteira, os rótulos não cabiam e o quadro abria até os 237 cm da máquina, encolhendo o corpo. **De três quartos, por trás** (segunda): a barra atravessada, as mãos nela, o peito subindo, as costas. De cima, a barra cobre o peito; de trás (pela cabeça), o corpo aparece encurtado.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro | Vista | O que o boneco faz (medido) |
|---|---|---|
| Quadril caído | de lado | o quadril cai e o corpo dobra 30° nele; o peito para a 30,3 cm da barra (0,55 da subida certa): "encurta o movimento" |
| Puxar com o queixo | de lado | o peito para a 16 cm da barra (0,6 da subida) e o pescoço dobra 34° à frente com a cabeça estendida 30°: o queixo vai à barra |
| Descida solta | três quartos, por trás | embaixo, o cotovelo trava (2,5°, o mínimo do esqueleto) e o ombro leva o tranco: a escápula sobe 9° e vai 14° à frente (o precedente da barra só na descida aprovada) |

## O que não ficou bom

- **A descida solta se lê pelo braço e pelo ombro, não pelo corpo:** com a escápula solta, o alcance do braço cresce e o corpo embaixo fica no mesmo lugar do certo (72,6° contra 73°). Tentei pôr o corpo mais baixo, mas com a mão presa na barra e o cotovelo já quase reto, não há para onde cair.
- **De lado, a barra aparece de topo** (um ponto nas mãos, com o carro do smith atrás): é o mesmo do supino no smith aprovado. A vista de três quartos mostra a barra inteira.
- O cotovelo passa só 0,3 cm da linha das costas no fim: o peito encosta antes de o cotovelo ir mais para trás.

**Risco de o Gustavo não gostar: médio.** A barra na altura da cintura deixa o corpo entre 55° e 73° da vertical (mais em pé que a remada invertida "de foto", quase deitada); é o que o cartão pede. E a descida solta é fraca.
