# Lote B1 · Suporte de agachamento e as três animações com barra: resumo

De 18/11/2026. Uma peça nova (o suporte de agachamento) e três animações novas no motor novo, de exercícios que até aqui só apareciam como cartão de texto: `agachamento-barra`, `supino-barra` e `desenvolvimento-barra`. **Nada foi aprovado nem ligado às telas**: quem integra registra em `aprovados.ts` e no catálogo do guia.

| O quê | Onde |
|---|---|
| A peça | `src/engine/novo/pecas-de-cena/suporte.ts`; medidas em `src/engine/novo/dados/objetos/suporte.json` |
| A folha da peça (o cartão de hoje × a peça nova, no tamanho do cartão e ampliada, com as medidas e a regulagem de cada exercício) | `docs/revisoes/animacoes-restantes/pecas/folha-suporte.png` (`node scripts/animacao-nova/folha-pecas.mjs suporte`) |
| As conferências escritas | `agachamento-barra.md`, `supino-barra.md`, `desenvolvimento-barra.md` (nesta pasta) |
| Os quadros grandes | `../quadros/agachamento-barra.png`, `supino-barra.png`, `desenvolvimento-barra.png` |

## O suporte

**O cartão de hoje é uma gaiola** de quatro colunas (2,24 m de altura, 1,2 m de lado, medidas de desenho sem fonte). **As fichas de fabricante lidas são de suportes abertos** (o Olympic Squat Rack da Life Fitness, LBR-OS, e o da Hammer Strength, OSR). A peça nova segue as fichas: dois montantes furados presos a um quadro no chão, com os ganchos em J e os pinos de segurança virados para a pessoa, sem a travessa de cima (de cima, no supino, ela cobriria a cabeça). Do cartão vêm o gancho com a borracha no berço, os furos e os pinos cromados.

| Medida | Valor | Tipo | Fonte |
|---|---|---|---|
| Altura dos montantes | 192 cm | medida | Life Fitness LBR-OS, catálogo 2026, p. 216 (o Hammer Strength OSR tem 186 cm) |
| Comprimento do quadro do chão | 150 cm | medida | Hammer Strength OSR, catálogo 2024, p. 63 |
| Vão entre os montantes | 110 cm | derivada | IPF 2026, seção 2.6 (mínimo entre os apoios da barra no banco); cabe na barra, que tem 131 cm entre as mangas |
| Passo da regulagem (furos) | 2,5 cm | medida | IPF 2026, seção 2.5 |
| Ganchos | de 75 a 170 cm | medida | IPF 2026, seções 2.6 (banco: 75 a 110) e 2.5 (agachamento: 100 a pelo menos 170) |
| Pinos de segurança | 50 cm de comprimento, a partir de 50 cm do chão | medida | IPF 2026, seção 2.6 (os racks de segurança do banco) |
| Seção do montante | 7,5 cm | desenho | nenhuma ficha lida dá; o cartão usa 7 cm |
| Gancho: quanto sai do montante, altura da chapa, borda do J | 9, 13 e 4 cm | desenho | as proporções do cartão |
| Furo, seção do pino | 1,6 e 5 cm | desenho | as do cartão, ajustadas ao passo de 2,5 cm |

A largura total das fichas (168 e 176 cm) inclui os pinos de guardar anilha, que este suporte não desenha; a dele é de 125 cm. A IPF também dá 22 cm (± 5) da cabeça do banco ao centro dos montantes: fica na tabela como referência (no supino, deu 8,8 cm; ver `supino-barra.md`).

**Na cena**, a estrutura (montantes, quadro do chão e pinos) é pintada atrás do corpo, como cenário: de lado, o montante e o pino de perto cruzariam o corpo, e de perfil o de perto e o de longe caem no mesmo lugar da tela. Os ganchos ficam na ordem certa de profundidade e entram no enquadramento, perto da barra.

**A regulagem de cada exercício** (medida nas animações):

| Exercício | Berço do gancho | Topo do pino | De onde sai |
|---|---|---|---|
| Agachamento com barra | 130 cm | 90 cm | ganchos na altura do meio do peito (129,4 cm, tabela do corpo), no furo mais perto; pinos no primeiro furo 3 cm abaixo da barra embaixo |
| Supino reto com barra | 105 cm | 67,5 cm | ganchos sobre os olhos, no primeiro furo 4 cm abaixo da barra com os cotovelos quase estendidos; travas no primeiro furo 2 cm abaixo da barra no peito |
| Desenvolvimento em pé com barra | 130 cm | 50 cm | ganchos na altura do peito; pinos no furo mais baixo (o cartão não pede pinos) |

## As três animações

| Exercício | Conferência automática | Erros desenhados | Não desenhados | Risco de o Gustavo não gostar |
|---|---|---|---|---|
| `agachamento-barra` | 0 falha, 4 avisos (cotovelo 154,8°; tornozelo 34,4°; linhas de desenho; músculos de frente) | os 4 do cartão | nenhum | médio |
| `supino-barra` | 0 falha, 2 avisos (linhas de desenho; músculos de lado) | Cotovelos abertos a 90°; Tirar o quadril do banco | Quicar a barra no peito (só ritmo: a descrição não diz nada visível) | médio |
| `desenvolvimento-barra` | 0 falha, 2 avisos (linhas de desenho; músculos de frente) | os 3 do cartão | nenhum | médio a alto |

## Mudanças em arquivo comum

- **`pecas-de-cena/barra-longa.ts`** (a barra já mostrada ao Gustavo): uma opção nova, `pontasAtras`, que empurra para trás na pintura o que fica fora da pegada (rebordos, mangas, anilhas, presilhas). Nas vistas de lado, a anilha de perto cobriria a cabeça (agachamento, desenvolvimento) ou o peito (supino); empurrada para trás do corpo, ela cai no mesmo lugar da tela que a de longe. Sem a opção, o desenho é o mesmo (a folha da barra não muda). Nenhuma animação aprovada usa a barra.
- **`scripts/animacao-nova/folha-pecas.mjs`**: a folha do suporte, como a da barra (acréscimo; as outras folhas não mudam).
- **Nos registros**, só as linhas novas (`objetos/registro.ts`, `exercicios/registro.ts`, `regras/registro.ts`) e o `dados/preparo/registro.ts` regravado pelo `preparo.mjs`. O preparo das animações aprovadas não mudou (só os três arquivos novos).
- **Arquivos novos comuns às três**: `exercicios/barra-nas-costas.ts` (a folga entre a barra e a pele, medida na superfície do Boneco, e a busca do toque vindo de fora) e `regras/barra-no-suporte.ts` (as regras medidas da família).

## O que fica para quem integra

- O teste da ponte falha em duas coisas, as duas esperadas: "todas as animações estão aprovadas e no catálogo" e os títulos dos erros do `supino-barra` (falta "Quicar a barra no peito", que precisa entrar em `SEM_DESENHO`).
- O cartão de equipamento (`public/equipamento/rack_de_agachamento.svg`) continua a gaiola: se o Gustavo aprovar o suporte aberto, o cartão pode ser refeito com a peça nova (não mexi nos cartões).

## O que não ficou bom (o mais importante; os detalhes estão em cada conferência)

- **O suporte da cena não é o do cartão**: o cartão é uma gaiola, a cena é um suporte aberto (o das fichas lidas). Quem tem a gaiola na academia pode estranhar. É a decisão que mais pede o olho do Gustavo.
- **As anilhas de perto e a estrutura do suporte são pintadas atrás do corpo** nas vistas de lado (para não cobrir a cabeça e o peito): é uma mentira de profundidade que não se vê de perfil, mas é uma escolha de desenho.
- **No desenvolvimento**, a barra vai 8,3 cm para a frente em volta do queixo, a cabeça já começa 6,6° para trás e o equilíbrio fica no limite (4,9 de 5 cm).
- **No supino**, o cotovelo passa abaixo do tampo do banco embaixo (por fora dele), e de cima o suporte vira trilhos e quadrados.
