# Lote 4 · Relatório das remadas com peso livre

Ramo: `worktree-agent-acfb1a417b2284184` (a partir de `8d6851d`). Commits: `9a7cf1b` (remada unilateral no banco + núcleo e regras), `fd918fc` (sem banco + base sem banco), `7965ffe` (curvada com halteres; também ajusta o cotovelo para 26° além das costas e o quadril da remada no banco para pernas curtas), `7863e2d` (com kettlebell; também a folga mínima da carga no núcleo) e o commit deste relatório (o último do ramo).

Entreguei **4 de 5**. A **remada apoiada não foi entregue** (motivo no fim).

Arquivos novos da família: núcleo `src/engine/novo/exercicios/remada.ts` (o tronco parado, o braço que puxa com a escápula, os erros e a folga da carga), base `exercicios/remada-sem-banco.ts` (pés escalonados e a mão livre na coxa), regras `src/engine/novo/regras/remadas.ts`. Cada exercício tem a ficha de movimento, a conferência escrita em `lote-4/<id>.md`, a folha e os quadros grandes. Conferi tudo nos dois corpos (homem e mulher), não só no homem que os quadros desenham.

## Por exercício

### 1. `remada-unilateral` (joelho e mão no banco)
- **Conferência:** 0 falha, 2 avisos (homem e mulher): extensão do punho de 92° na mão espalmada no banco (a mesma situação da flexão, que dá 94°); linhas de desenho da ficha.
- **O que ainda não ficou bom:** de lado, no começo (`lateral:tec:f0`), o halter aparece desenhado por cima do banco. Ele fica 28 cm para fora, na frente do banco, mas de perfil as figuras se sobrepõem. No corpo da mulher (pernas mais curtas) a coxa de apoio inclina e o cotovelo de apoio dobra 26,5° (no homem, 6°).
- **Risco:** baixo. A pose sai das medidas e todos os erros se leem.

### 2. `remada-unilateral-sem-banco` (mão livre na coxa)
- **Conferência:** 0 falha, 2 avisos: dorsiflexão do tornozelo de trás de 17,8° (mulher 19,1°; média 14,8°, máximo observado 48°); linhas de desenho.
- **O que ainda não ficou bom:** de lado, a mão livre na coxa fica escondida (é o lado de longe). Por isso a segunda vista é a de três quartos, de frente (`quina`), a única em que a mão aparece, e o modo Músculos fica de lado (176 cm² do principal, contra 299 cm² de três quartos, de trás). A dica "cotovelo para o quadril" ficou de fora: de lado, o fio atravessava as costas.
- **Risco:** médio. O Gustavo pode preferir a vista de trás, que mostra melhor o músculo, mesmo sem mostrar a mão.

### 3. `remada-curvada-halteres`
- **Conferência:** 0 falha, 2 avisos: linhas de desenho; o principal quase não aparece de lado (176 cm²), e a vista padrão do modo Músculos é a de três quartos, de trás (551 cm²).
- **O que ainda não ficou bom:** nada que eu tenha visto. No erro "encolher os ombros", de trás, os braços puxados aparecem quase na vertical; o que se lê é a linha dos ombros subindo.
- **Risco:** baixo.

### 4. `remada-unilateral-kettlebell`
- **Conferência:** 0 falha, 2 avisos, os mesmos da sem banco.
- **O que ainda não ficou bom:** na vista de três quartos, de frente, no fim da puxada (`quina:tec:f1` e o tema escuro), a coxa de trás tapa metade da bola. A bola fica 6 cm ao lado da coxa, mas o corte pode parecer que ela atravessa a perna. De lado, ela aparece inteira. Mesmo problema de vista da sem banco.
- **Risco:** médio, pela bola cortada nessa vista e pela escolha da vista.

### 5. `remada-apoiada`: não entregue
Tentei com a peça provisória `pecas-de-cena/banco-regulavel-provisorio.ts`, sem alterá-la. Encontrei três problemas que não consegui resolver no padrão de qualidade:
1. A peça só desenha o encosto subindo para −z, e a pessoa olha para +z. Fiz um embrulho que espelhava a peça em z (um Proxy na cena realista), e o desenho saiu certo.
2. O encosto tem 98 cm. Com o queixo além da ponta, como a ficha pede, a bacia fica sobre o estofado e as coxas atravessam o estofado. Para as coxas passarem dos lados, precisei de pés a 40 cm do meio e do tronco 15° mais em pé que o encosto (35° da vertical). O boneco ficou parecendo em pé, encostado no banco, e não deitado de bruços.
3. Sobraram falhas: tranco no ritmo (60% e 93%) e, na mulher, a perna que não alcança o chão. Além disso, de trás, o estofado cobria as costas na pintura.

Apaguei os arquivos e não fiz commit dessa animação. Para fazê-la direito, sugiro esperar a peça unificada do banco regulável, com a orientação do encosto como opção e um encosto mais curto, ou decidir com o Gustavo se a pessoa ajoelha no assento.

## Arquivos comuns mexidos
Nenhum. Só acrescentei uma linha em cada um dos registros `exercicios/registro.ts` e `regras/registro.ts`. Importei, sem mudar, estes arquivos de outros:
- `dobrar-o-quadril.ts`: `dobrarOQuadril`, `alcanceDoBraco` e `maoNoAngulo`, para a curvada;
- `dobrar-o-cotovelo.ts`: `kettlebellNaMao`. Se o colega das roscas mudar a assinatura dessa função, a remada com kettlebell quebra.

Regras usadas como estão: `lombar-neutra` e `mao-de-apoio-parada` (`conferir.ts`); `escapulas-se-juntam` e `palmas-uma-para-a-outra` (`regras/suspensao.ts`).

Regras novas, todas com nome próprio da família: `tronco-parado-na-remada`, `costas-quase-paralelas-ao-chao`, `tronco-bem-inclinado`, `cotovelo-passa-as-costas`, `cotovelo-rente-na-remada`, `carga-perto-do-quadril-no-fim`, `braco-estendido-no-comeco`, `carga-livre-do-corpo-e-do-banco`, `mao-e-joelho-no-banco`, `pe-da-carga-atras` e `mao-de-apoio-na-coxa`.

## O que o núcleo faz que vale saber
- **Folga da carga:** quando a carga chegaria a menos de 0,5 cm da pele das pernas ou do tronco (no corpo da mulher ou num erro que move o tronco), os braços que puxam se afastam do corpo só o necessário (`resolver1`). No homem, no movimento certo, isso não acontece. Antes disso, os erros "girar" e "subir o tronco" faziam o halter entrar na coxa da mulher em até 3 cm.
- **Pegada neutra:** o polegar aponta para a frente do antebraço; a pronação medida é de 90° em todos os quadros.

## Medidas provisórias (escolha de desenho, sem número na ficha da técnica)
- **Comuns às remadas:** fim do braço 26° além da linha das costas e 16° para fora; começo a 3° atrás e 8° para fora; escápula de +6 a −10, elevação de +1 a −1 (do guia de hoje, com −10 em vez de −6, como na remada na suspensão); pescoço −8 a −14°.
- **No banco:** cotovelo de apoio a 6°; mão 2 cm para dentro do ombro; o joelho amassa o estofado 0,5 cm; canela 3°; ponta do banco 6 cm além dos dedos; quadril 0,5 cm abaixo do alcance da perna (corpos de pernas curtas).
- **Sem banco e com kettlebell:** peito a 55°; joelhos a 30° (frente) e 8° (trás); calcanhar de trás 15° levantado; passo de 66 cm; cotovelo de apoio a 12°; pés 2 cm para fora; folga da bola de 1 cm.
- **Curvada:** peito a 62°; erro "subir" de 25°; "só com os braços" a 12° e 75°.
- **Erros:** girar 18°, como hoje (35% na lombar); arredondar +22°/+22° com o pescoço −10°; volta curta a 45%.
- **Peças:** halter e kettlebell da tabela de objetos, sem objeto novo.
