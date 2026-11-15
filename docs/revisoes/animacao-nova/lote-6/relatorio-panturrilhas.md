# Relatório: família das panturrilhas no motor novo (lote 6)

Ramo: `panturrilhas-motor-novo` (sobre `539dc0b`). Sem push. Os cinco exercícios foram feitos, um commit cada:
`c349172` panturrilha-chao · `4f6943b` panturrilha-degrau · `9168a7c` panturrilha · `58089ee` panturrilha-b · o último commit (panturrilha-sentada-halter + este relatório).

Núcleo comum: `exercicios/elevar-o-calcanhar.ts` (o pé gira na bola; o quadril sai do equilíbrio, com o centro de massa sobre a bola do pé; o tronco fica na vertical, então a cabeça sobe reta) e `exercicios/panturrilha-no-step.ts` (step + halter + mão na coluna). Peças novas em `pecas-de-cena/degrau.ts`: step (Reebok Step 102 × 38,5 × 15 cm, ficha pública), escada com corrimão (ABNT NBR 9077, cópia pública do MPRJ) e parede em frente. Regras da família em `regras/panturrilhas.ts`. Conferências escritas em `lote-6/<id>.md`; pedidos ao conteúdo em `lote-6/pedidos-panturrilhas.md`.

`npm run typecheck`, lint e `npm run conferir:animacao` (todas as animações) sem falha. Os testes unitários passam (896), mas só com `--testTimeout=60000`: no `npm run check` normal, 2 a 4 testes do domínio estouraram os 5 s por carga da máquina (outros agentes rodando); nada a ver com o motor.

## Por exercício

**panturrilha-chao** (de lado + três quartos de trás). 0 falha, 1 aviso (linhas de desenho). Segue a ficha de 12/11: sobe com as duas, tira um pé no topo, desce em 3 s numa perna só. Isso contraria a animação aprovada em 01/11 (descida com as duas) e o próprio texto do app diz "a animação mostra a descida com as duas pernas": a decisão do Gustavo estava pendente. Não ficou bom: o pé que sai do chão fica com os dedos deitados (é o pé apoiado do esqueleto; ele fica a só 6 cm do chão); o calcanhar sobe só 12 cm, num corpo inteiro no quadro. **Risco: médio** (a escolha da descida numa perna, decisão dele; a parede ocupa o fundo na vista de trás).

**panturrilha-degrau** (de lado + três quartos de trás). 0 falha, 2 avisos: dorsiflexão de 29,3° embaixo (média 14,8°, máx. 48°; hoje 32°: calcanhar 6 cm abaixo do degrau mais a inclinação que põe o peso sobre a bola) e as linhas de desenho. A escada é peça nova (degraus de 17 × 29,5 cm, corrimão a 86 cm), cenário na pintura (o montante passava na frente da canela; corrigido). Não ficou bom: **o erro "quicar embaixo" não foi desenhado** (erro de ritmo; o motor novo não muda o tempo das fases por erro, e desenhá-lo repetiria "descer pouco"); no erro "puxar com a mão" o braço que puxa é o de longe na vista de lado. **Risco: médio** (o erro que falta e a dorsiflexão).

**panturrilha** (de lado + três quartos de trás). 0 falha, 2 avisos: dorsiflexão 30,5° (hoje 32°) e linhas de desenho. Não ficou bom: o cotovelo da mão na coluna sai "de asa" embaixo na vista de três quartos (a mão parada e o corpo subindo 14 cm; testei mão mais alta, sem alcance em cima, e cotovelo para trás, que aparecia atrás das costas de lado); a mão fica 5 cm à frente da bola do pé, não 12 como no búlgaro, para não aparecer de lado segurando o nada; a pegada na coluna fica um pouco inclinada. **Risco: médio** (o braço da coluna).

**panturrilha-b** (de lado + de trás, que mostra as duas panturrilhas). 0 falha, 3 avisos: dorsiflexão 31,4°, linhas de desenho, e de lado o músculo quase não aparece (por isso o modo Músculos abre de trás). Não ficou bom: o mesmo braço "de asa" e a pegada inclinada (com o polegar na vertical, a supinação passava da média); a bacia vai 3,5 cm para a esquerda para equilibrar o halter. **Risco: médio**.

**panturrilha-sentada-halter** (de lado + três quartos pela frente). 0 falha, 2 avisos: pronação da mão esquerda 93,6° (média 80°, máx. 108°; era 137° antes de virar os dedos um pouco para dentro) e linhas de desenho. Primeira animação sentada do motor novo: quadril apoiado no banco medido na superfície do Boneco, degrau a 90° de joelho, halter atravessado na coxa direita perto do joelho (8 cm) sobre a toalha. Não ficou bom: a cabeça de dentro do halter passa por cima da outra coxa (pés na largura do quadril); o corpo fica menor no quadro de lado (banco e degrau dos dois lados); o apoio dos pés é o step de 15 cm (a anilha da tabela tem 2,4 cm, pouco para o calcanhar descer). **Risco: alto**: é a primeira pose sentada (sem animação aprovada para comparar) e o halter na coxa e as mãos foram as partes que mais precisei refazer.

## Arquivos comuns mexidos

- `src/engine/novo/exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`: uma linha por arquivo novo.
- `scripts/animacao-nova/conferir.mjs`: ao procurar os músculos na biblioteca, quando não acha pelo id, procura pelo `animacaoId` (o exercício da biblioteca é `panturrilha-bilateral-step`, a animação é `panturrilha-b`; sem isso a conferência dava falha "não está na biblioteca"). Aditivo: os outros continuam achando pelo id.
- Nada no esqueleto, no corpo, no desenho nem nos núcleos dos outros.

## Medidas provisórias

- Step: espessuras do tapete e da plataforma e largura dos apoios (do cartão do app, desenho). Escada: largura (90 cm, desenho; a norma pede no mínimo 80), três degraus no quadro, seção dos montantes (3 cm, provisória).
- Em todas as fichas de movimento, as distâncias que a ficha da técnica não dá: altura do calcanhar em cima (da animação de hoje: 12 cm no chão, 13,9 nos steps, 10 sentado) e embaixo (6 cm no degrau, 6,4 nos steps, 8,5 sentado), a posição das mãos (parede, corrimão, coluna), a perna livre da unilateral, a posição do halter na coxa, `step.x`, a parede.
