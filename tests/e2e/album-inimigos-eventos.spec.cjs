const { test, expect } = require('@playwright/test');

test('separa inimigos dos eventos e mostra a origem nas fichas', async ({ page }, info) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-eventos-v1', JSON.stringify({
            superBosses: 1,
            superBossesMecanicos: 1
        }));
        localStorage.setItem('guardians-of-pixel-album-figurinhas-v1',
            JSON.stringify(['normal', 'boss', 'orbeCeleste', 'arconteDasRuinas']));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await page.locator('#aba-album-inimigos').click();
    const grupos = page.locator('.album-grupo-inimigos');
    await expect(grupos).toHaveCount(3);
    await expect(grupos.nth(0)).toContainText('Modo história');
    await expect(grupos.nth(0).locator('[data-tipo-inimigo="normal"]')).toHaveCount(1);
    await expect(grupos.nth(0).locator('[data-tipo-inimigo="impDeBrasa"]')).toHaveCount(0);
    await expect(grupos.nth(1)).toContainText('Modo clássico');
    await expect(grupos.nth(1).locator('[data-tipo-inimigo="orbeCeleste"]')).toHaveCount(1);
    await expect(grupos.nth(2)).toContainText('Eventos');
    await expect(grupos.nth(2).locator('.album-cartao-inimigo')).toHaveCount(4);
    await expect(grupos.nth(2).locator('[data-tipo-inimigo="impDeBrasa"]')).toHaveCount(1);
    await expect(grupos.nth(2).locator('[data-tipo-inimigo="droneDeSucata"]')).toHaveCount(1);
    await expect(grupos.nth(2).locator('[data-tipo-inimigo="enguiaAbissal"]')).toHaveCount(0);
    await page.screenshot({ path: info.outputPath('inimigos-eventos-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: 'artifacts/album-inimigos-secoes-celular.png' });

    await page.locator('#aba-album-bosses').click();
    await expect(grupos).toHaveCount(3);
    await expect(grupos.nth(0)).toContainText('Modo história');
    await expect(grupos.nth(0).locator('[data-tipo-inimigo="boss"]')).toHaveCount(1);
    await expect(grupos.nth(0).locator('[data-tipo-inimigo="duqueDasBrasas"]')).toHaveCount(0);
    await expect(grupos.nth(1)).toContainText('Modo clássico');
    await expect(grupos.nth(1).locator('[data-tipo-inimigo="arconteDasRuinas"]')).toHaveCount(1);
    await expect(grupos.nth(2)).toContainText('Eventos');
    await expect(grupos.nth(2).locator('[data-tipo-inimigo="duqueDasBrasas"]')).toHaveCount(1);
    await expect(grupos.nth(2).locator('[data-tipo-inimigo="perfuradorDeAco"]')).toHaveCount(1);
    await page.screenshot({ path: 'artifacts/album-bosses-secoes-celular.png' });
    await page.locator('#aba-album-inimigos').click();

    await page.locator('[data-tipo-inimigo="impDeBrasa"]').click();
    await expect(page.locator('.album-detalhes-camada')).toContainText('Evento');
    await expect(page.locator('.album-detalhes-camada')).toContainText('Superboss: Soberano Infernal');
    await page.evaluate(() => selecionarIdioma('en'));
    await page.locator('[data-tipo-inimigo="impDeBrasa"]').click();
    await expect(page.locator('.album-detalhes-camada')).toContainText('Event');
    await expect(page.locator('.album-detalhes-camada')).toContainText('Superboss: Infernal Sovereign');
    await page.evaluate(() => selecionarIdioma('es'));
    await page.locator('[data-tipo-inimigo="impDeBrasa"]').click();
    await expect(page.locator('.album-detalhes-camada')).toContainText('Evento');
    await expect(page.locator('.album-detalhes-camada')).toContainText('Superjefe: Soberano Infernal');
    await page.evaluate(() => selecionarIdioma('pt-BR'));
    await page.locator('[data-tipo-inimigo="droneDeSucata"]').click();
    await expect(page.locator('.album-detalhes-camada')).toContainText('Superboss: Titã da Forja');
});

test('derrotas reais registram comuns e subordinados nas categorias corretas', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    const tipos = await page.evaluate(() => {
        jogarEvento('superBossesAbissais');
        const elenco = CONFIG.eventos.elencosSuperBosses.superBossesAbissais;
        for (const tipo of [elenco.comuns[0], elenco.chefes[0]]) {
            criarInimigo(tipo);
            inimigos.at(-1).vida = 0;
        }
        moverInimigos();
        return [...inimigosDerrotadosNoAlbum];
    });
    expect(tipos).toEqual(expect.arrayContaining(['enguiaAbissal', 'sirenaSombria']));
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await page.locator('#aba-album-inimigos').click();
    await expect(page.locator('.album-grupo-inimigos').nth(2)
        .locator('[data-tipo-inimigo="enguiaAbissal"]')).toHaveCount(1);
    await page.locator('[data-tipo-inimigo="enguiaAbissal"]').click();
    await expect(page.locator('.album-detalhes-camada')).toContainText('Superboss: Leviatã Abissal');
    await page.keyboard.press('Escape');
    await page.locator('#aba-album-bosses').click();
    await expect(page.locator('.album-grupo-inimigos').nth(2)
        .locator('[data-tipo-inimigo="sirenaSombria"]')).toHaveCount(1);
    await page.locator('[data-tipo-inimigo="sirenaSombria"]').click();
    await expect(page.locator('.album-detalhes-camada')).toContainText('Superboss: Leviatã Abissal');
});
