# Conferência da folha: Abertura em T deitado de bruços, sem carga (`abertura-t-deitado`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/abertura-t-deitado.md` e o cartão `src/conteudo/exercicios/abertura-t-deitado.json`) e o que foi medido no boneco (centímetros do motor; y para cima, z na direção da cabeça; x para o lado). A folha: `../folhas/abertura-t-deitado.png` (estilo A); os erros em 6 instantes do ciclo: `../folhas/abertura-t-deitado-erros.png`.

**De onde vem a pose.** O corpo de bruços e as pernas são os da flexão de joelho com elástico já aprovada (`flexao-joelho-elastico`); o braço em T e os erros vêm do T na suspensão aprovado (`yt-suspensao`). O colchonete e a toalha dobrada são caixas (`BOX`); nenhuma peça nova.

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Posição | De bruços, testa na toalha, pescoço alinhado (consenso) | Corpo reto no colchonete; a cabeça na linha do corpo, apoiada na toalha (4,6 cm) | sim |
| Braços | Abertos em T, cotovelos estendidos (consenso; TSAOG, vídeo) | Braços retos (cotovelo a 180°), a 90° do corpo, na linha dos ombros; as mãos a 81 cm do meio do corpo | sim |
| Polegares | Para cima (um estudo de EMG da rotação: `lim2015`, `yu2024`) | O boneco não tem dedos: a mão é uma luva, e o polegar não aparece | não se vê (ver o limite) |
| Embaixo | As mãos quase tocam o chão | Mãos a 4 cm do chão; pausa de 0,4 s | sim |
| Subida | ~1 s; erguer os braços abrindo para trás, sem levantar a cabeça nem encolher os ombros (consenso) | 1 s; as mãos sobem de 4 a 28 cm (13 cm acima da linha dos ombros); a cabeça e os ombros não se mexem | sim |
| No alto | Segurar 1 s; braços na altura do corpo ou um pouco acima | 1 s parado, com as mãos 13 cm acima da linha dos ombros | sim |
| Descida | ~2 s, até as mãos quase tocarem o chão | 2 s, de volta a 4 cm | sim |
| Erro `cabeca` | "Levantar a cabeça": o pescoço dobra para trás | A cabeça sobe 12 cm e a testa sai da toalha | sim |
| Erro `encolher` | "Encolher os ombros": os ombros sobem para as orelhas | De bruços, "para as orelhas" é na direção da cabeça: os ombros escorregam 7 cm para lá (a mesma medida do "encolher" do T na suspensão aprovado) | sim |
| Erro `embalo` | "Jogar os braços": o embalo tira o trabalho do ombro de trás | Embaixo as mãos batem no chão (1 cm); em cima os braços vão a 51 cm do chão (o certo: 28) | sim |
| Músculos | Primário: ombro posterior; sem secundário (moderada para o trapézio, consenso para o deltoide) | Deltoide posterior em vermelho | sim |

**Vistas.** De frente (`frontal`, olhando para a cabeça), onde se vê o T e os braços subindo, e de cima (`top`), onde se vê o corpo deitado com os braços em T e os ombros (o "encolher" abre nessa vista). De lado não serve: os braços apontam para a câmera e cobrem o corpo.

**Rótulos.** "braços em T, cotovelos estendidos" e "testa na toalha" (de frente); "ombros longe das orelhas" (de cima, com a linha tracejada nos ombros).

**Limites.**
- **Polegares para cima** não aparecem: a mão do boneco é uma luva, sem dedos. A dica está nos textos (configuração, dicas e checklist).
- De frente, o corpo fica escondido atrás da cabeça e o boneco parece "de pé com os braços abertos"; a vista de cima mostra que ele está deitado. É a vista que mostra o movimento.
- O "encolher" (7 cm) é pequeno na vista de cima, porque o corpo inteiro cabe no quadro.
- A técnica é **consenso**; a ativação do trapézio sem carga tem evidência **moderada** (EMG); o deltoide posterior e o crescimento sem carga não foram medidos. A referência visual (TSAOG; [P]rehab; Jeremy Ethier) não foi conferida por dentro e não é fonte de regra.
