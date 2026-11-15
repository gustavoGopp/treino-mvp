import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { APROVADOS } from '../../src/engine/novo/aprovados';
import { EXERCICIOS } from '../../src/engine/novo/app';
import { cssDoBoneco } from '../../src/engine/novo/boneco';
import { fichaDoMotorNovo, miniaturaDoMotorNovo, quadroDoMotorNovo } from '../../src/engine/novo/ponte';
import { NOME_DA_VISTA_NOVA } from '../../src/engine/novo/vistas';
import { VIEWS } from '../../src/engine/desenho';

// A ponte entre o motor novo e as telas (src/engine/novo/ponte.ts): o app só usa o motor novo para os exercícios
// refeitos e aprovados pelo Gustavo, e a resposta tem de ter o mesmo formato da do motor de hoje.

const conteudo = (id: string) => JSON.parse(readFileSync(`src/conteudo/exercicios/${id}.json`, 'utf8')) as { errors: { id: string; title: string }[] };

describe('motor novo: a ponte com as telas', () => {
  it('todo exercício aprovado existe no motor novo, num arquivo com o nome do id (é por ele que o app carrega)', () => {
    const arquivos = new Set(readdirSync('src/engine/novo/exercicios').map((a) => a.replace(/\.ts$/, '')));
    for (const id of Object.keys(APROVADOS)) {
      expect(EXERCICIOS[id], id).toBeDefined();
      expect(arquivos.has(id), id).toBe(true);
    }
  });

  it('os erros de cada animação nova têm os títulos do texto do app, na mesma ordem (o guia escolhe o erro pelo índice)', () => {
    // exceção conhecida: a panturrilha no degrau não desenha o erro de ritmo "Quicar embaixo" (o guia mostra o
    // movimento certo nesse erro); os outros erros dela seguem a ordem do app
    const SEM_DESENHO: Record<string, string[]> = { 'panturrilha-degrau': ['Quicar embaixo'] };
    for (const [id, ex] of Object.entries(EXERCICIOS)) {
      const doApp = conteudo(id).errors.map((e) => e.title).filter((t) => !(SEM_DESENHO[id] ?? []).includes(t));
      expect(ex.ficha.erros.map((e) => e.titulo), id).toEqual(doApp);
    }
  });

  it('a ficha, o quadro e a miniatura saem no formato que as telas esperam', () => {
    const ex = EXERCICIOS.bulgaro!;
    const f = fichaDoMotorNovo(ex);
    expect(f.id).toBe('bulgaro');
    expect(f.views).toEqual(ex.vistas);
    expect(f.seq.map((s) => s.kind)).toEqual(['hold', 'ecc', 'hold', 'conc']);
    expect(f.T).toBeCloseTo(4.5, 5);
    expect(f.errors).toHaveLength(conteudo('bulgaro').errors.length);
    expect(f.instantesErro.every((t) => t >= 0 && t <= f.T)).toBe(true);
    expect(f.views).toContain(f.vistaMiniatura);
    const q = quadroDoMotorNovo(ex, 'lateral', 'tec', 1, 0, '', 'claro');
    expect(q.classe).toBe('novo boneco cinza');
    expect(q.viewBox.split(' ')).toHaveLength(4);
    expect(q.html).toContain('<path');
    expect(q.html).not.toContain('<svg');
    expect(q.fase.label).toBe('Descida · excêntrica');
    // a mesma entrada dá a mesma saída
    expect(quadroDoMotorNovo(ex, 'lateral', 'tec', 1, 0, '', 'claro').html).toBe(q.html);
    // o erro é achado pelo título do app; no tema escuro, a classe muda
    const erro = conteudo('bulgaro').errors[1]!;
    const qe = quadroDoMotorNovo(ex, 'lateral', 'err', f.instantesErro[1]!, 1, erro.title, 'escuro');
    expect(qe.classe).toBe('novo boneco cinza escuro');
    expect(qe.html).toContain(erro.title.split(' ')[0]!);
    const m = miniaturaDoMotorNovo(ex);
    expect(m.classe).toContain('mini');
    // a proporção do palco e da miniatura do app é 4:3
    for (const vb of [q.viewBox, m.viewBox]) {
      const [, , w, h] = vb.split(' ').map(Number);
      expect(w! / h!).toBeCloseTo(4 / 3, 1);
    }
  });

  it('toda vista usada pelas animações novas tem nome para o botão do guia', () => {
    for (const ex of Object.values(EXERCICIOS)) for (const v of ex.vistas) expect(v in VIEWS || v in NOME_DA_VISTA_NOVA, `${ex.ficha.id}: ${v}`).toBe(true);
  });

  it('o CSS do Boneco que o app carrega é o que o motor gera (node scripts/animacao-nova/css-do-boneco.mjs)', () => {
    expect(readFileSync('src/engine/novo/boneco.gerado.css', 'utf8').split('\n').slice(1).join('\n')).toBe(cssDoBoneco());
  });
});
