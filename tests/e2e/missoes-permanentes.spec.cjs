const { test, expect } = require('@playwright/test');

test('catálogo antigo fica arquivado, sem cartões ou progresso novo', async ({ page }, info) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(() => mostrarMissoes());
    expect(await page.evaluate(() => Object.hasOwn(CONFIG.missoes, 'permanentes'))).toBe(false);
    expect(await page.evaluate(() => obterCatalogoHistoricoDasMissoes().length)).toBe(100);
    await expect(page.locator('.categorias-missoes')).toHaveCount(0);
    await expect(page.locator('#conteudo-menu > .missoes-grade')).toHaveCount(0);
    await expect(page.locator('.desafio-diario-cartao')).toHaveCount(3);
    await expect(page.locator('.desafio-semanal-cartao')).toHaveCount(5);
    const antes = await page.evaluate(() => JSON.stringify(progressoMissoesPermanentes));
    await page.evaluate(() => registrarProgressoDaMissao('inimigosEliminados', 500));
    expect(await page.evaluate(() => JSON.stringify(progressoMissoesPermanentes))).toBe(antes);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#conteudo-menu').screenshot({ path: info.outputPath('missoes-celular-sem-permanentes.png') });
    expect(erros).toEqual([]);
});

test('prêmios legados usam três idiomas e ficam isolados por slot', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem(CHAVE_MISSOES_PERMANENTES, JSON.stringify({
        torresConstruidas: 1, recompensasResgatadas: []
    })));
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { selecionarIdioma('en'); mostrarMissoes(); });
    await expect(page.locator('#conteudo-menu')).toContainText('Daily and weekly missions.');
    await expect(page.locator('.premio-final-missoes')).toContainText('First defense');
    await page.evaluate(() => { selecionarIdioma('es'); mostrarMissoes(); });
    await expect(page.locator('#conteudo-menu')).toContainText('Misiones diarias y semanales.');
    await expect(page.locator('.premio-final-missoes')).toContainText('Primera defensa');
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => trocarSalvoAtivo(2))]);
    expect(await page.evaluate(() => obterRecompensasLegadasPendentes().length)).toBe(0);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => trocarSalvoAtivo(1))]);
    expect(await page.evaluate(() => obterRecompensasLegadasPendentes().length)).toBe(1);
});

test('migração semanal antiga preserva resgates, skin e conquista', async ({ page }) => {
    await page.addInitScript(() => {
        if (sessionStorage.getItem('migrado')) return;
        sessionStorage.setItem('migrado', '1');
        localStorage.setItem('guardians-of-pixel-missoes-semanais-v1', JSON.stringify({
            semana: '2020-S01', inimigosEliminados: 50, fasesConcluidas: 3, maiorWaveInfinita: 40,
            recompensasResgatadas: ['cacadorDePixels', 'guardiaoDaCampanha', 'alemDoLimite']
        }));
        localStorage.setItem('guardians-of-pixel-recompensas-missoes-v1', JSON.stringify({
            skinsDesbloqueadas: ['sentinelaDourada'],
            conquistasDesbloqueadas: ['alemDoLimite'],
            skinTorrePadraoEquipada: 'sentinelaDourada'
        }));
    });
    await page.goto('/');
    expect(await page.evaluate(() => progressoMissoesPermanentes.recompensasResgatadas))
        .toEqual(['permanente11', 'permanente61', 'permanente83']);
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(3);
    expect(await page.evaluate(() => recompensasPermanentesDasMissoes.skinTorrePadraoEquipada))
        .toBe('sentinelaDourada');
    await page.reload();
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(3);
});

test('recompensa individual já conquistada é resgatada uma vez e mantém o registro antigo', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem(CHAVE_MISSOES_PERMANENTES, JSON.stringify({
        fasesConcluidas: 1, recompensasResgatadas: [], recompensasConcedidas: {}
    })));
    await page.reload();
    const saldo = await page.evaluate(() => fragmentosPixel);
    await page.evaluate(() => resgatarMissaoPermanente('permanente10'));
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldo + 5);
    await page.evaluate(() => resgatarMissaoPermanente('permanente10'));
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldo + 5);
    await page.reload();
    expect(await page.evaluate(() => ({
        saldo: fragmentosPixel,
        resgatada: recompensaDaMissaoFoiResgatada('permanente10'),
        rotulo: progressoMissoesPermanentes.recompensasConcedidas.permanente10
    }))).toEqual({ saldo: saldo + 5, resgatada: true, rotulo: '5 Fragmentos de Pixel' });
});

test('construções, eliminações e waves novas não escrevem no save legado', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { fecharConteudoMenu(); iniciarPartida(); });
    const dados = await page.evaluate(() => {
        const antes = JSON.stringify(progressoMissoesPermanentes);
        registrarConstrucaoParaMissoes('padrao');
        registrarAcaoDaTorreParaMissoes('melhorias');
        registrarInimigoEliminadoParaMissoes({ tipo: 'normal', defesaDoGolpeFinal: 'padrao' });
        modoWavesInfinitas = true;
        wave = 40;
        registrarWaveCompletaParaMissoes();
        return { antes, depois: JSON.stringify(progressoMissoesPermanentes) };
    });
    expect(dados.depois).toBe(dados.antes);
    expect(await page.evaluate(() => localStorage.getItem(CHAVE_MISSOES_PERMANENTES))).toBeNull();
});

test('coleções independentes continuam progredindo sem escrever nas permanentes', async ({ page }) => {
    await page.goto('/');
    const dados = await page.evaluate(() => {
        const antes = JSON.stringify(progressoMissoesPermanentes);
        registrarElementoUnicoParaMissoes('fases', 1, 'fasesDiferentes');
        return {
            antes, depois: JSON.stringify(progressoMissoesPermanentes),
            fases: estatisticasDosObjetivos.colecoes.fases
        };
    });
    expect(dados.depois).toBe(dados.antes);
    expect(dados.fases).toContain(1);
});
