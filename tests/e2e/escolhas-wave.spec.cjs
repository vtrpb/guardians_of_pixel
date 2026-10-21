const { test, expect } = require('@playwright/test');

test('campanha oferece dois riscos e wave normal com prêmio moderado por fase', async ({ page }, testInfo) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('.botao-lobby-jogar').click();
    await page.locator('.botao-confirmar-selecao-defesas').click();
    const introducao = page.locator('#camada-cutscene-carta[data-tipo-carta="introducao-fase-1"]');
    if (await introducao.isVisible()) {
        for (let fala = 0; fala < 3; fala++) await page.locator('#botao-continuar-cutscene-carta').click();
    }

    await page.evaluate(() => {
        wave = 3;
        inimigosParaCriar = 0;
        inimigos = [];
        proximaWaveEm = 0;
        atualizarWaves();
    });
    const painel = page.locator('#camada-escolha-wave');
    await expect(painel).toBeVisible();
    await expect(painel.locator('[data-escolha-wave]')).toHaveCount(3);
    await expect(painel.locator('[data-escolha-wave="velocidade"]')).toContainText('+2 Fragmentos de Pixel');
    await painel.screenshot({ path: testInfo.outputPath('escolha-wave-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(painel.locator('[data-escolha-wave="normal"]')).toBeVisible();
    await page.waitForTimeout(150);
    await painel.screenshot({ path: testInfo.outputPath('escolha-wave-celular.png') });
    await painel.locator('[data-escolha-wave="velocidade"]').click();
    await expect(painel).toBeHidden();
    const resultado = await page.evaluate(() => {
        proximaWaveEm = Date.now() - 1;
        atualizarWaves();
        const inimigo = criarInimigo('normal');
        return { wave, velocidade: inimigos.at(-1).velocidade, base: CONFIG.inimigo.normal.velocidade };
    });
    expect(resultado.wave).toBe(4);
    expect(resultado.velocidade).toBeCloseTo(resultado.base * 1.15);
    const saldoAntes = await page.evaluate(() => fragmentosPixel);
    await page.evaluate(() => {
        inimigosParaCriar = 0;
        inimigos = [];
        atualizarWaves();
        atualizarWaves();
    });
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldoAntes + 2);
    expect(await page.evaluate(() => Number(localStorage.getItem(CHAVE_FRAGMENTOS_PIXEL)))).toBe(saldoAntes + 2);

    await page.evaluate(() => {
        wave = 7;
        inimigosParaCriar = 0;
        inimigos = [];
        proximaWaveEm = 0;
        atualizarWaves();
    });
    await expect(painel).toBeVisible();
    await painel.locator('[data-escolha-wave="normal"]').click();
    const saldoNormal = await page.evaluate(() => fragmentosPixel);
    await page.evaluate(() => {
        proximaWaveEm = Date.now() - 1;
        atualizarWaves();
        inimigosParaCriar = 0;
        inimigos = [];
        atualizarWaves();
    });
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldoNormal);
    const vidaReforcada = await page.evaluate(() => {
        wave = 7;
        inimigosParaCriar = 0;
        inimigos = [];
        proximaWaveEm = 0;
        atualizarWaves();
        escolherDesafioDaWave('resistencia');
        proximaWaveEm = Date.now() - 1;
        atualizarWaves();
        criarInimigo('normal');
        return { vida: inimigos.at(-1).vida, base: CONFIG.inimigo.normal.vida };
    });
    expect(vidaReforcada.vida).toBeCloseTo(vidaReforcada.base * 1.2);

    await page.evaluate(() => {
        reiniciarEscolhasDaWave();
        faseSelecionada = 7;
        wave = 11;
        inimigosParaCriar = 0;
        inimigos = [];
        proximaWaveEm = 0;
        atualizarWaves();
    });
    await expect(painel).toBeVisible();
    await expect(page.locator('#rotulo-escolha-wave')).toHaveText('FASE 7 · WAVE 12');
    await expect(painel.locator('[data-escolha-wave="resistencia"]')).toContainText('+3 Fragmentos de Pixel');
    await painel.locator('[data-escolha-wave="resistencia"]').click();
    const saldoAvancado = await page.evaluate(() => fragmentosPixel);
    await page.evaluate(() => {
        proximaWaveEm = Date.now() - 1;
        atualizarWaves();
        inimigosParaCriar = 0;
        inimigos = [];
        atualizarWaves();
    });
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldoAvancado + 3);

    for (const [fase, premio] of [[11, 4], [16, 5]]) {
        await page.evaluate(({ fase }) => {
            reiniciarEscolhasDaWave();
            faseSelecionada = fase;
            wave = 11;
            inimigosParaCriar = 0;
            inimigos = [];
            proximaWaveEm = 0;
            atualizarWaves();
        }, { fase });
        await expect(painel).toBeVisible();
        await expect(painel.locator('[data-escolha-wave="velocidade"]'))
            .toContainText(`+${premio} Fragmentos de Pixel`);
        await painel.locator('[data-escolha-wave="normal"]').click();
    }

    await page.evaluate(() => {
        reiniciarEscolhasDaWave();
        faseSelecionada = 18;
        wave = 15;
        inimigosParaCriar = 0;
        inimigos = [];
        proximaWaveEm = 0;
        atualizarWaves();
    });
    await expect(page.locator('#camada-bonus-pos-boss')).toBeVisible();
    await page.locator('.botao-bonus-pos-boss').first().click();
    await page.evaluate(() => atualizarWaves());
    await expect(page.locator('#rotulo-escolha-wave')).toHaveText('FASE 18 · WAVE 16');
    await expect(painel.locator('[data-escolha-wave="resistencia"]')).toContainText('+5 Fragmentos de Pixel');
    await painel.locator('[data-escolha-wave="resistencia"]').click();
    const saldoFinal = await page.evaluate(() => fragmentosPixel);
    await page.evaluate(() => {
        proximaWaveEm = Date.now() - 1;
        atualizarWaves();
        inimigosParaCriar = 0;
        inimigos = [];
        atualizarWaves();
    });
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldoFinal + 5);
    expect(await page.evaluate(() => Number(localStorage.getItem(CHAVE_FRAGMENTOS_PIXEL))))
        .toBe(saldoFinal + 5);
    await page.evaluate(() => {
        wave = 19;
        inimigosParaCriar = 0;
        inimigos = [];
        proximaWaveEm = 0;
        atualizarWaves();
    });
    await expect(painel).toBeHidden();
});
