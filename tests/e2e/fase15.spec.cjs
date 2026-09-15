const { test, expect } = require('@playwright/test');

test('Fase 15: desbloqueio, história, camuflados, vitória e persistência', async ({ page }, testInfo) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => {
        if (sessionStorage.getItem('fase15-preparada')) return;
        sessionStorage.setItem('fase15-preparada', 'true');
        localStorage.setItem('tower-defense-2-progresso-fases-v2', '14');
        localStorage.setItem('guardians-of-pixel-capitulo-2-desbloqueado-v1', 'true');
        localStorage.setItem('guardians-of-pixel-capitulo-3-desbloqueado-v1', 'true');
        localStorage.setItem('guardians-of-pixel-correcao-progresso-fases-13-14-v1', 'true');
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    expect(await page.evaluate(() => {
        maiorFaseConcluida = 13;
        const bloqueada = !faseEstaDesbloqueada(15);
        maiorFaseConcluida = 14;
        return bloqueada && faseEstaDesbloqueada(15) && !faseEstaDesbloqueada(16);
    })).toBe(true);
    await page.evaluate(() => { selecionarFase(15); fecharConteudoMenu(); });
    await page.locator('.botao-lobby-jogar').click();
    await expect(page.locator('#conteudo-menu')).toContainText('Obrigatória nesta fase');
    await page.locator('.botao-confirmar-selecao-defesas').click();
    const cena = page.locator('#camada-cutscene-carta');
    const continuar = page.locator('#botao-continuar-cutscene-carta');
    await expect(cena).toHaveAttribute('data-tipo-carta', 'entrada-arquivo-proibido');
    expect(await page.evaluate(() => jogoPausado && defesasSelecionadasParaPartida.has('torreDeVarredura'))).toBe(true);
    await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toHaveText('Os inimigos camuflados já existiam antes. Alguém está apagando os registros.');
    await cena.screenshot({ path: testInfo.outputPath('registro.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await cena.screenshot({ path: testInfo.outputPath('registro-celular.png') });
    await page.keyboard.press('Escape');
    await expect(cena).toBeVisible();
    await continuar.click();
    await continuar.click();
    await expect(cena).toBeHidden();
    expect(await page.evaluate(() => jogoPausado)).toBe(false);
    await page.setViewportSize({ width: 1440, height: 1000 });
    const composicao = await page.evaluate(() => {
        definirJogoPausado(true);
        wave = 19; iniciarProximaWave();
        desenharCenaPausadaDoTutorial();
        return [filaDeInimigosExclusivos.filter(t=>t==='censorVelado').length,
            filaDeInimigosExclusivos.filter(t=>t==='rasurador').length,
            filaDeInimigosExclusivos.filter(t=>t==='sentinelaDeIndice').length,
            inimigosChefesParaCriar, obterTipoDeBossDaFase()];
    });
    expect(composicao).toEqual([5, 23, 4, 1, 'bibliotecarioMudo']);
    await page.screenshot({ path: testInfo.outputPath('mapa.png') });
    await page.evaluate(() => finalizarPartidaComVitoria());
    await expect(cena).toHaveAttribute('data-tipo-carta', 'final-arquivo-proibido');
    await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toHaveText('Você veio defender sua torre. Não investigar o passado.');
    await cena.screenshot({ path: testInfo.outputPath('senhor-do-tempo.png') });
    await continuar.click();
    await expect(page.locator('#camada-resultado')).toBeVisible();
    const saldo = await page.evaluate(() => fragmentosPixel);
    await page.evaluate(() => finalizarPartidaComVitoria());
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldo);
    await page.reload();
    expect(await page.evaluate(() => maiorFaseConcluida)).toBe(15);
    expect(await page.evaluate(() => {
        selecionarIdioma('en');
        const ingles = CONFIG.arquivoProibido.introducao.concat(CONFIG.arquivoProibido.final)
            .every(etapa => localizar(etapa.texto) !== etapa.texto);
        selecionarIdioma('es');
        const espanhol = CONFIG.arquivoProibido.introducao.concat(CONFIG.arquivoProibido.final)
            .every(etapa => localizar(etapa.texto) !== etapa.texto);
        selecionarIdioma('pt-BR');
        return ingles && espanhol;
    })).toBe(true);
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { selecionarFase(15); fecharConteudoMenu(); iniciarPartida(true); });
    await expect(cena).toBeHidden();
    expect(await page.evaluate(() => modoWavesInfinitas && !jogoPausado)).toBe(true);
    expect(erros).toEqual([]);
});
