const { test, expect } = require('@playwright/test');

test('Fase 16: acesso, memória, combate, resultado e save', async ({ page }, testInfo) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => {
        if (sessionStorage.getItem('fase16-preparada')) return;
        sessionStorage.setItem('fase16-preparada', 'true');
        localStorage.setItem('tower-defense-2-progresso-fases-v2', '15');
        for (const chave of ['guardians-of-pixel-capitulo-2-desbloqueado-v1', 'guardians-of-pixel-capitulo-3-desbloqueado-v1',
            'guardians-of-pixel-correcao-progresso-fases-13-14-v1', 'guardians-of-pixel-tutorial-concluido-v1']) localStorage.setItem(chave, 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    expect(await page.evaluate(() => {
        maiorFaseConcluida = 14;
        const bloqueada = !faseEstaDesbloqueada(16);
        maiorFaseConcluida = 15;
        return bloqueada && faseEstaDesbloqueada(16) && !faseEstaDesbloqueada(17);
    })).toBe(true);
    await page.evaluate(() => { selecionarFase(16); fecharConteudoMenu(); });
    await page.locator('.botao-lobby-jogar').click();
    await page.locator('.botao-confirmar-selecao-defesas').click();
    const cena = page.locator('#camada-cutscene-carta');
    const continuar = page.locator('#botao-continuar-cutscene-carta');
    await expect(page.locator('#titulo-cutscene-carta')).toHaveText('CÂMARA DAS MEMÓRIAS');
    expect(await page.evaluate(() => jogoPausado)).toBe(true);
    await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toContainText('registros oficiais');
    await page.keyboard.press('Escape');
    await expect(cena).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await cena.screenshot({ path: testInfo.outputPath('lina-celular.png') });
    await continuar.click(); await continuar.click();
    expect(await page.evaluate(() => jogoPausado)).toBe(false);
    await page.setViewportSize({ width: 1440, height: 1000 });
    const combate = await page.evaluate(() => {
        definirJogoPausado(true);
        wave = 19; iniciarProximaWave(); desenharCenaPausadaDoTutorial();
        return { vagas: obterLimiteDeTorres(), boss: obterTipoDeBossDaFase(),
            ecos: filaDeInimigosExclusivos.filter(t=>t==='ecoDaMemoria').length,
            blindadas: filaDeInimigosExclusivos.filter(t=>t==='lembrancaBlindada').length,
            registros: obterRegistrosPontoZeroDisponiveis().length };
    });
    expect(combate.vagas).toBe(15);
    expect(combate.ecos).toBe(4);
    expect(combate.blindadas).toBe(5);
    expect(combate.boss).toBe('devoradorDeMemorias');
    expect(combate.registros).toBe(0);
    await page.screenshot({ path: testInfo.outputPath('mapa.png') });
    await page.evaluate(() => finalizarPartidaComVitoria());
    await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toContainText('voltaria para casa');
    await continuar.click(); await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toHaveText('Quantas pessoas você trouxe antes de mim?');
    await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toHaveText('Prepare suas defesas.');
    await continuar.click();
    await expect(page.locator('#titulo-cutscene-carta')).toHaveText('TORRE DESBLOQUEADA');
    expect(await page.evaluate(() => torreEstaDesbloqueada('torreFeixeContinuo'))).toBe(true);
    await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toHaveText('Acho que esta é a última defesa que vou encontrar nesta jornada.');
    await continuar.click();
    await expect(page.locator('#camada-resultado')).toBeVisible();
    const saldo = await page.evaluate(() => fragmentosPixel);
    await page.evaluate(() => finalizarPartidaComVitoria());
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldo);
    await page.reload();
    expect(await page.evaluate(() => maiorFaseConcluida)).toBe(16);
    expect(await page.evaluate(() => faseEstaDesbloqueada(17))).toBe(true);
    expect(await page.evaluate(() => ['en', 'es'].every(idioma => {
        selecionarIdioma(idioma);
        return [...CONFIG.camaraDasMemorias.introducao, ...CONFIG.camaraDasMemorias.final].every(etapa => localizar(etapa.texto) !== etapa.texto);
    }))).toBe(true);
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { selecionarFase(16); fecharConteudoMenu(); iniciarPartida(true); });
    await expect(cena).toBeHidden();
    expect(erros).toEqual([]);
});
