const { test, expect } = require('@playwright/test');

async function vencerLimbo(page) {
    await page.addInitScript(() => {
        localStorage.setItem('tower-defense-2-progresso-fases-v2', '12');
        localStorage.setItem('guardians-of-pixel-capitulo-2-desbloqueado-v1', 'true');
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => iniciarIntervaloPerdido());
    await page.locator('#botao-continuar-cutscene-carta').click();
    await page.locator('#botao-continuar-cutscene-carta').click();
    await page.evaluate(() => finalizarPartidaComVitoria());
    await expect(page.locator('#camada-cutscene-carta')).toHaveAttribute('data-etapa-cena', 'aproximacao');
    await page.locator('#botao-continuar-cutscene-carta').click();
}

test('Limbo: verdade, barreira e continuação normal sem duplicar recompensa', async ({ page }, testInfo) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await vencerLimbo(page);
    const cena = page.locator('#camada-cutscene-carta');
    const continuar = page.locator('#botao-continuar-cutscene-carta');
    await expect(page.locator('#titulo-cutscene-carta')).toHaveText('???');
    await expect(continuar).toBeHidden();
    await page.keyboard.press('Escape');
    await cena.click({ position: { x: 5, y: 5 } });
    await page.evaluate(() => concluirCutsceneDaCarta());
    await expect(cena).toHaveAttribute('data-etapa-cena', 'pergunta');
    await cena.screenshot({ path: testInfo.outputPath('entidade.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('#escolha-limbo-verdade')).toBeInViewport();
    await cena.screenshot({ path: testInfo.outputPath('entidade-celular.png') });
    await page.locator('#escolha-limbo-verdade').click();
    await expect(page.locator('#texto-cutscene-carta')).toHaveText('Foi o Senhor do Tempo.');
    await continuar.click();
    await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toHaveText('Que consequências?');
    await continuar.click();
    await continuar.click();
    await continuar.click();
    await expect(cena).toHaveAttribute('data-etapa-cena', 'barreira');
    await continuar.click();
    await expect(cena).toHaveAttribute('data-etapa-cena', 'selado');
    expect(await page.evaluate(() => capitulo3Desbloqueado)).toBe(false);
    await continuar.click();
    const saldo = await page.evaluate(() => fragmentosPixel);
    await continuar.click();
    expect(await page.evaluate(() => capitulo3Desbloqueado && cenaFinalIntervaloPerdidoVista)).toBe(true);
    await page.evaluate(() => concluirCutsceneDoCapitulo2());
    await expect(page.locator('#camada-resultado')).toBeVisible();
    await page.evaluate(() => finalizarPartidaComVitoria());
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldo);
    await page.reload();
    expect(await page.evaluate(() => capitulo3Desbloqueado && cenaFinalIntervaloPerdidoVista)).toBe(true);
    expect(erros).toEqual([]);
});

test('Limbo: silêncio chega ao castelo, não libera capítulo e permite nova escolha', async ({ page }, testInfo) => {
    await vencerLimbo(page);
    await page.locator('#escolha-limbo-silencio').click();
    const continuar = page.locator('#botao-continuar-cutscene-carta');
    await continuar.click();
    await expect(page.locator('#texto-cutscene-carta')).toContainText('sem minha permissão');
    await continuar.click();
    await expect(page.locator('#camada-cutscene-carta')).toHaveAttribute('data-etapa-cena', 'castelo');
    await page.locator('#camada-cutscene-carta').screenshot({ path: testInfo.outputPath('castelo.png') });
    await continuar.click();
    await expect(page.locator('#exploracao-limbo')).toBeVisible();
    await page.locator('#limbo-sair').click();
    expect(await page.evaluate(() => !jogoIniciado && !capitulo3Desbloqueado && !cenaFinalIntervaloPerdidoVista)).toBe(true);
    await page.evaluate(() => { fecharConteudoMenu(); iniciarIntervaloPerdido(); });
    await continuar.click();
    await continuar.click();
    await page.evaluate(() => finalizarPartidaComVitoria());
    await continuar.click();
    await expect(page.locator('#escolha-limbo-verdade')).toBeVisible();
    expect(await page.evaluate(() => {
        modoWavesInfinitas = true;
        const infinito = deveMostrarCenaFinalIntervaloPerdidoAposVitoria();
        modoWavesInfinitas = false;
        mapaPersonalizadoAtivo = {};
        const editor = deveMostrarCenaFinalIntervaloPerdidoAposVitoria();
        mapaPersonalizadoAtivo = null;
        return !infinito && !editor;
    })).toBe(true);
});

test('Limbo: save antigo mantém desbloqueios e novas falas acompanham o idioma', async ({ page }) => {
    await vencerLimbo(page);
    await page.evaluate(() => {
        capitulo3Desbloqueado = true;
        cenaFinalIntervaloPerdidoVista = true;
        selecionarIdioma('en');
        mostrarCenaFinalDoIntervaloPerdido(1);
    });
    await expect(page.locator('#escolha-limbo-verdade')).toHaveText('It was the Lord of Time');
    await expect(page.locator('#texto-cutscene-carta')).toContainText('Who brought you?');
    await page.evaluate(() => {
        selecionarIdioma('es');
        mostrarCenaFinalDoIntervaloPerdido(1);
    });
    await expect(page.locator('#escolha-limbo-silencio')).toHaveText('Permanecer en silencio');
    await page.locator('#escolha-limbo-silencio').click();
    for (let passo = 0; passo < 3; passo++) await page.locator('#botao-continuar-cutscene-carta').click();
    expect(await page.evaluate(() => capitulo3Desbloqueado && cenaFinalIntervaloPerdidoVista)).toBe(true);
});
