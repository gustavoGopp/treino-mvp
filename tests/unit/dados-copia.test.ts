import { describe, expect, it } from 'vitest';
import { avisarInstalar, diasDesde, ehAppleMovel, lembrarCopia, linkDoProblema, MAX_MENSAGEM_ERRO, textoDoProblema, textoUltimaCopia } from '../../src/domain/dados';

// R5c: a última cópia, o lembrete de exportar (dados.copia) e o aviso de instalar no iPhone (dados.instalar-iphone).
const AGORA = '2026-11-20T12:00:00.000Z';
const dia = (d: number) => `2026-11-${String(d).padStart(2, '0')}T10:00:00.000Z`;

describe('diasDesde e textoUltimaCopia', () => {
  it('conta dias inteiros e nunca negativos', () => {
    expect(diasDesde(dia(20), AGORA)).toBe(0);
    expect(diasDesde(dia(19), AGORA)).toBe(1);
    expect(diasDesde(dia(10), AGORA)).toBe(10);
    expect(diasDesde('2026-12-01T00:00:00.000Z', AGORA)).toBe(0);
  });
  it('sem data ou com data inválida devolve null', () => {
    expect(diasDesde(undefined, AGORA)).toBeNull();
    expect(diasDesde('ontem', AGORA)).toBeNull();
    expect(diasDesde(dia(1), 'agora')).toBeNull();
  });
  it('escreve hoje, há 1 dia, há N dias ou nenhuma cópia', () => {
    expect(textoUltimaCopia(dia(20), AGORA)).toBe('hoje');
    expect(textoUltimaCopia(dia(19), AGORA)).toBe('há 1 dia');
    expect(textoUltimaCopia(dia(5), AGORA)).toBe('há 15 dias');
    expect(textoUltimaCopia(undefined, AGORA)).toBe('nenhuma cópia ainda');
  });
});

describe('lembrarCopia (dados.copia)', () => {
  const tres = [dia(14), dia(16), dia(18)];
  it('sem cópia: lembra a partir do 3º treino terminado', () => {
    expect(lembrarCopia({ fins: [dia(14), dia(16)], agora: AGORA })).toBe(false);
    expect(lembrarCopia({ fins: tres, agora: AGORA })).toBe(true);
  });
  it('treino sem fim (em andamento) não conta', () => {
    expect(lembrarCopia({ fins: [dia(14), dia(16), undefined], agora: AGORA })).toBe(false);
  });
  it('cópia com menos de 7 dias: não lembra, mesmo com treinos depois', () => {
    expect(lembrarCopia({ ultimaCopia: dia(15), fins: [dia(16), dia(17), dia(18)], agora: AGORA })).toBe(false);
  });
  it('cópia antiga: conta só os treinos depois dela', () => {
    expect(lembrarCopia({ ultimaCopia: dia(10), fins: [dia(5), dia(6), dia(7), dia(12), dia(14)], agora: AGORA })).toBe(false);
    expect(lembrarCopia({ ultimaCopia: dia(10), fins: [dia(5), dia(12), dia(14), dia(16)], agora: AGORA })).toBe(true);
  });
  it('"Agora não" esconde por 7 dias', () => {
    expect(lembrarCopia({ adiadoEm: dia(15), fins: tres, agora: AGORA })).toBe(false);
    expect(lembrarCopia({ adiadoEm: dia(13), fins: tres, agora: AGORA })).toBe(true);
  });
});

describe('avisarInstalar (dados.instalar-iphone)', () => {
  const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
  const ipadComoMac = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
  const android = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36';
  it('avisa no iPhone e no iPad abertos no navegador', () => {
    expect(avisarInstalar({ userAgent: iphone, maxTouchPoints: 5, instalado: false })).toBe(true);
    expect(avisarInstalar({ userAgent: ipadComoMac, maxTouchPoints: 5, instalado: false })).toBe(true);
  });
  it('não avisa instalado, no Mac de verdade nem no Android', () => {
    expect(avisarInstalar({ userAgent: iphone, maxTouchPoints: 5, instalado: true })).toBe(false);
    expect(ehAppleMovel({ userAgent: ipadComoMac, maxTouchPoints: 0 })).toBe(false);
    expect(avisarInstalar({ userAgent: android, maxTouchPoints: 5, instalado: false })).toBe(false);
  });
});

describe('textoDoProblema e linkDoProblema (P5)', () => {
  const base = { versao: 'abc1234', publicadaEm: '07/11/2026', aparelho: 'Mozilla/5.0 (Linux; Android 14)', tela: '/evolucao/supino?x=1#a' };
  it('escreve a versão, o aparelho e a tela, sem a busca da URL', () => {
    const t = textoDoProblema(base);
    expect(t).toContain('Versão: abc1234 (publicada em 07/11/2026)');
    expect(t).toContain('Aparelho: Mozilla/5.0 (Linux; Android 14)');
    expect(t).toContain('Tela: /evolucao/supino\n'.trim());
    expect(t).not.toContain('x=1');
    expect(t).toMatch(/sem dados de saúde/);
    expect(t).not.toContain('Erro:');
  });
  it('do erro, leva só o tipo e a 1ª linha da mensagem, cortada', () => {
    const longa = 'a'.repeat(400);
    const t = textoDoProblema({ ...base, erro: { nome: 'TypeError', mensagem: `${longa}\nsegunda linha` } });
    const linha = t.split('\n').find((l) => l.startsWith('Erro:'))!;
    expect(linha).toBe(`Erro: TypeError: ${'a'.repeat(MAX_MENSAGEM_ERRO)}`);
    expect(t).not.toContain('segunda linha');
    expect(textoDoProblema({ ...base, erro: { nome: 'Error', mensagem: '' } })).toContain('Erro: Error\n'.trim());
  });
  it('monta o mailto só com um e-mail válido', () => {
    expect(linkDoProblema('', 'x')).toBeNull();
    expect(linkDoProblema('sem-arroba', 'x')).toBeNull();
    const l = linkDoProblema(' alguem@exemplo.com ', 'linha 1\nlinha 2')!;
    expect(l.startsWith('mailto:alguem@exemplo.com?subject=')).toBe(true);
    expect(decodeURIComponent(l.split('body=')[1]!)).toBe('linha 1\nlinha 2');
  });
});
