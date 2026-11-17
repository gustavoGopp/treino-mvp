# Lote 7 · Abertura em T deitado de bruços (`abertura-t-deitado`)

De 15/11/2026. **Ainda não foi revista pelo Gustavo.**

- Ficha da técnica: `docs/pesquisa/animacoes/abertura-t-deitado.md`. Texto do app: `src/conteudo/exercicios/abertura-t-deitado.json` (só leitura). Animação de hoje: `src/engine/exercicios/abertura-t-deitado.ts` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abertura-t-deitado.json`.
- Animação: `src/engine/novo/exercicios/abertura-t-deitado.ts`, sobre o corpo de bruços do núcleo das flexões de joelho deitado (`deitadoDeBrucos`, em `exercicios/flexao-joelho.ts`) e a toalha da flexão deslizante (`pecas-de-cena/toalha.ts`), sem peça nova.
- **Mudança aditiva no núcleo `exercicios/flexao-joelho.ts`** (dois campos opcionais em `OpcoesDeBrucos`): `bracos` (os braços em outra pose, no lugar das mãos sob a testa) e `cabeca` (flexão da cabeça sobre o pescoço já posto, para o erro de levantar a cabeça). Sem os dois campos, o resultado é o mesmo de antes: a conferência de todas as animações continua sem falha, e as de `flexao-joelho-elastico` (a única que usa `deitadoDeBrucos`) não mudaram.
- Regras medidas novas: `src/engine/novo/regras/abdominais.ts` (`abertura-t-testa-na-toalha`, `abertura-t-bracos-em-t`, `abertura-t-amplitude`, `abertura-t-ombros-baixos`).
- Folha ao lado da de hoje: `../prototipos/folha-abertura-t-deitado.png`. Quadros grandes: `../quadros/abertura-t-deitado.png`.

## Como a pose é montada

De bruços, a cabeça para +z: o peito, a bacia e as coxas no chão (a barriga amassa 1,5 cm, como no núcleo), a lombar 10° mais reta que a curva de repouso, a testa na toalha dobrada (2 cm). As pernas estendidas, o pé esticado 60°; o joelho dobra só o que deixa o peito do pé encostar no chão (8,9°: com o joelho reto, a canela e o pé entrariam no chão, porque a coxa desce do quadril ao joelho). Os braços em T: a 90° do corpo vistos de cima, o cotovelo dobrado 5°, o polegar para o teto e a palma para a cabeça (antebraço neutro). Só a elevação do braço muda: embaixo, a mão fica 3 cm acima do chão; no alto, o braço sobe 10° acima da linha dos ombros. A bacia não sai do lugar (`pelve` nos contatos).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De bruços, testa na toalha | um estudo | de bruços; o ponto mais baixo da cabeça fica a 0 cm do tampo da toalha o ciclo inteiro | sim |
| Braços em T, cotovelos estendidos | um estudo | visto de cima, o braço a 90° da linha do corpo; o cotovelo dobra 5° | sim |
| Polegares para cima | um estudo | o polegar aponta para o teto (antebraço neutro, palma para a cabeça) | sim (ver abaixo) |
| Embaixo, as mãos quase tocam o chão | consenso | a mão a 3 cm do chão (o centro dela a 8,8 cm; o ombro a 19,7 cm) | sim |
| Em cima, os braços na altura do corpo ou um pouco acima | consenso | o centro da mão 11,1 cm acima do centro do ombro (10° acima da linha) | sim |
| Sem levantar a cabeça nem encolher os ombros | consenso | a cabeça não se mexe; a clavícula fica em 14,2° o ciclo inteiro (a elevação do braço contra o tronco fica em 90°, e o ritmo escapuloumeral não muda) | sim |
| ~1 s subindo, 1 s parado, ~2 s descendo | consenso | 1 s, 1 s, 2 s, com 0,5 s parado embaixo | sim |

Conferência automática (homem e mulher): **0 falha, 3 avisos**. Ponto mais baixo do corpo −1,5 cm (a barriga que amassa no chão, do núcleo de bruços); ritmo 5,1% (ok). Os avisos: (1) flexão plantar do tornozelo de 60°, acima da média (o pé deitado, com o peito do pé no chão; a flexão de joelho com elástico usa 55°); (2) provisórios `lombar`, `pe.plantar`, `pe.folga`, `maos.folgaEmbaixo`, `bracos.topo`; (3) o modo Músculos: o deltoide posterior aparece de três quartos de trás (69 cm², a vista padrão) e não de frente (0 cm²).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Levantar a cabeça | a cabeça dobra 35° para trás sobre o pescoço: a testa sai da toalha (sobe ~3,5 cm) e o queixo fica perto dela; vista de três quartos de trás |
| Encolher os ombros | a clavícula sobe 20° além do certo (34,2° contra 14,2°): a ponta do ombro anda 4,7 cm na direção da cabeça; vista de três quartos de trás |
| Jogar os braços | os braços sobem até 30° acima da linha dos ombros: a mão fica 32 cm acima do ombro (11,1 no certo); vista de frente |

## Correções já feitas que esta animação respeita

10/11 (R5-anim): "abre de frente (de lado, os braços apontam para a câmera)": a vista de técnica é de frente (a cabeça para quem olha) e eu testei a de lado, que continua ruim pelo mesmo motivo. "Vista de cima mostra o corpo deitado": troquei a de cima pela de três quartos de trás, que mostra o corpo deitado inteiro, os braços subindo e o deltoide posterior (de cima, o boneco parece em pé, e o músculo quase não aparece). "Polegares para cima não aparecem": no Boneco novo a mão tem polegar, e ele aparece apontando para o teto nas duas vistas.

## Músculos e vistas

Só o deltoide posterior, principal (a ficha: o trapézio médio e o inferior trabalham, mas não contam). Vistas: de frente (padrão de Técnica: o T, os braços subindo e descendo, a cabeça na toalha) e de três quartos de trás (`quinaTras`, padrão de Músculos e dos erros da cabeça e dos ombros). Testei também de trás (a vista dos pés: a bacia tapa a cabeça), de lado, de três quartos de frente e de cima.

## O que não ficou bom

- De frente, a cabeça aparece pelo alto (o cabelo, na cor de pele), sem rosto: lê-se como a cabeça apoiada, mas é preciso o rótulo "testa na toalha".
- O erro "Encolher os ombros" é pequeno no quadro (a ponta do ombro anda 4,7 cm): a linha vermelha entre os ombros fica pouco à frente da tracejada. Subir mais a clavícula deixaria o ombro numa pose que não existe; a animação que toca mostra melhor.
- O erro "Levantar a cabeça" se lê melhor de lado, mas de lado o braço de perto aponta para a câmera e tapa o tronco; o erro fica na vista de três quartos de trás, onde a cabeça aparece inclinada para cima, sem a toalha embaixo da testa.
- O colchonete não é desenhado: o do motor novo tem 100 cm (provisório) e, com ele, as canelas ficariam 1,5 cm no ar depois da borda.
