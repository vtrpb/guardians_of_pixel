const { test, expect } = require('@playwright/test');

test('recupera no Álbum os Superbosses de eventos já vencidos', async ({ page }, info) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-eventos-v1', JSON.stringify({
            superBosses: 1,
            superBossesMecanicos: 2
        }));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await page.locator('#aba-album-superBosses').click();
    await expect(page.locator('#conteudo-menu')).toContainText('2 de 5 figurinhas coladas');
    await expect(page.locator('[data-tipo-inimigo="soberanoInfernal"]')).toHaveCount(1);
    await expect(page.locator('[data-tipo-inimigo="titaDaForja"]')).toHaveCount(1);
    await expect(page.locator('[data-tipo-inimigo="leviataAbissal"]')).toHaveCount(0);
    await page.screenshot({ path: info.outputPath('album-superbosses-recuperados.png') });
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('guardians-of-pixel-album-figurinhas-v1'))))
        .toEqual(expect.arrayContaining(['soberanoInfernal', 'titaDaForja']));
});

test('registra o chefe final e os outros inimigos derrotados durante um evento', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    const estado = await page.evaluate(() => {
        jogarEvento('superBossesAbissais');
        const elenco = CONFIG.eventos.elencosSuperBosses.superBossesAbissais;
        for (const tipo of [elenco.comuns[0], elenco.chefes[0], elenco.chefes.at(-1)]) {
            criarInimigo(tipo);
            inimigos.at(-1).vida = 0;
        }
        moverInimigos();
        return {
            tipos: [...inimigosDerrotadosNoAlbum],
            salvos: JSON.parse(localStorage.getItem('guardians-of-pixel-album-figurinhas-v1'))
        };
    });
    expect(estado.tipos).toContain('leviataAbissal');
    expect(estado.salvos).toContain('leviataAbissal');
    expect(estado.tipos).toContain('enguiaAbissal');
    expect(estado.tipos).toContain('sirenaSombria');
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await page.locator('#aba-album-superBosses').click();
    await expect(page.locator('[data-tipo-inimigo="leviataAbissal"]')).toHaveCount(1);
});
