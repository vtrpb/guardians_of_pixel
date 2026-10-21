const { test, expect } = require('@playwright/test');

test('Além do Limite só desbloqueia ao concluir a wave 40 e não exige resgatar a missão 83', async ({ page }, info) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const dados = await page.evaluate(() => {
        prepararNovaPartida();
        jogoIniciado = true;
        modoWavesInfinitas = true;
        wave = 40;
        registrarWaveInfinitaParaConquistas(wave);
        const antes = {
            desbloqueada: conquistaEstaDesbloqueada('alemDoLimite'),
            progresso: obterEstadoDaConquista('alemDoLimite', CONFIG.conquistas.alemDoLimite).progresso
        };
        inimigosParaCriar = 0;
        inimigos = [];
        proximaWaveEm = 0;
        atualizarWaves();
        const depois = {
            desbloqueada: conquistaEstaDesbloqueada('alemDoLimite'),
            progresso: obterEstadoDaConquista('alemDoLimite', CONFIG.conquistas.alemDoLimite).progresso,
            missaoResgatada: recompensaDaMissaoFoiResgatada('permanente83'),
            premio: obterCatalogoHistoricoDasMissoes()[82].recompensa.quantidade
        };
        return { antes, depois };
    });
    expect(dados.antes).toEqual({ desbloqueada: false, progresso: 0 });
    expect(dados.depois).toEqual({ desbloqueada: true, progresso: 40, missaoResgatada: false, premio: 25 });
    await page.evaluate(() => mostrarConquistas('comuns'));
    const cartao = page.locator('.conquista-cartao').filter({ hasText: 'Além do Limite' });
    await expect(cartao).toContainText('40 / 40');
    await cartao.screenshot({ path: info.outputPath('alem-do-limite-conquista.png') });
    expect(await page.evaluate(() => {
        selecionarIdioma('en');
        return localizar(CONFIG.conquistas.alemDoLimite.descricao);
    })).toBe('Complete wave 40 in endless mode.');
    expect(await page.evaluate(() => {
        selecionarIdioma('es');
        return localizar(CONFIG.conquistas.alemDoLimite.descricao);
    })).toBe('Completa la oleada 40 en el modo infinito.');
    expect(await page.evaluate(() => {
        const saldo = fragmentosPixel;
        resgatarMissaoPermanente('permanente83');
        return {
            fragmentos: fragmentosPixel - saldo,
            conquista: conquistaEstaDesbloqueada('alemDoLimite'),
            resgatada: recompensaDaMissaoFoiResgatada('permanente83')
        };
    })).toEqual({ fragmentos: 0, conquista: true, resgatada: false });
    await page.reload();
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('alemDoLimite'))).toBe(true);
    expect(await page.evaluate(() => estatisticasDasConquistas.maiorWaveInfinitaConcluida)).toBe(40);
});

test('saves antigos preservam Além do Limite mesmo sem resgatar a missão 83', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-missoes-permanentes-v1', JSON.stringify({
            versao: 1, maiorWaveInfinita: 40, recompensasResgatadas: [], recompensasConcedidas: {}
        }));
    });
    await page.goto('/');
    expect(await page.evaluate(() => ({
        desbloqueada: conquistaEstaDesbloqueada('alemDoLimite'),
        progresso: estatisticasDasConquistas.maiorWaveInfinitaConcluida,
        missaoResgatada: recompensaDaMissaoFoiResgatada('permanente83')
    }))).toEqual({ desbloqueada: true, progresso: 40, missaoResgatada: false });
    expect(await page.evaluate(() => {
        const saldo = fragmentosPixel;
        resgatarMissaoPermanente('permanente83');
        return fragmentosPixel - saldo;
    })).toBe(25);
});

test('conquista antiga já desbloqueada permanece mesmo sem contador de waves', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-recompensas-missoes-v1', JSON.stringify({
            skinsDesbloqueadas: [], conquistasDesbloqueadas: ['alemDoLimite'], skinTorrePadraoEquipada: null
        }));
    });
    await page.goto('/');
    expect(await page.evaluate(() => ({
        desbloqueada: conquistaEstaDesbloqueada('alemDoLimite'),
        progresso: obterEstadoDaConquista('alemDoLimite', CONFIG.conquistas.alemDoLimite).progresso
    }))).toEqual({ desbloqueada: true, progresso: 40 });
});
