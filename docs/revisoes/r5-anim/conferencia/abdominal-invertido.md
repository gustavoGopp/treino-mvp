# Conferência da folha: Abdominal invertido no chão (`abdominal-invertido`)

Cada ponto do movimento, a fonte (ficha `docs/pesquisa/animacoes/abdominal-invertido.md`) e o que foi medido no boneco (`node scripts/medir-animacao.mjs abdominal-invertido`, centímetros do motor; y para cima, z para a frente, a cabeça para trás). A folha: `../folhas/abdominal-invertido.png` (estilo A, R4). Checagem de cinemática: `ik=0` na animação e nos 2 erros.

| Ponto | O que a fonte pede | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Posição | Deitado de costas, braços no chão ao lado do corpo, quadril e joelhos a ~90° | colchonete e braços da ponte de glúteo (mãos no chão, a 7 cm de altura); coxa na vertical, canela na horizontal (joelho a 90°), o joelho a 55 cm do chão sobre o quadril | sim |
| Subida | ~1 s; a pelve enrola e o quadril sai do chão | 1 s; o quadril sobe de 12 a 29 cm e vem 5 cm em direção à cabeça; a lombar vai de deitada a 45° do chão; o joelho vem 36 cm em direção ao peito, mantendo os 90° | sim |
| Costas de cima | Cabeça e costas de cima no chão | os ombros ficam a 12–13 cm de altura nas 4 fases (o mesmo de deitado); o meio das costas sobe só ~1 cm | sim |
| Topo | Segura 1 s | 1 s | sim |
| Descida | ~2 s, até o quadril voltar ao chão | 2 s, volta à pose de deitado | sim |
| Erros | Só trazer as pernas; embalar as pernas | `pernas`: o quadril fica a 12 cm (no chão) e só as coxas vêm ao peito; `balanco`: embaixo, as coxas caem 38° para a frente e as canelas descem; no topo, o quadril vai a 36 cm e as costas de cima saem do chão (o peso no pescoço) | sim |
| Músculos | Reto do abdômen; oblíquos de secundário | reto em vermelho, oblíquos em laranja | sim |
