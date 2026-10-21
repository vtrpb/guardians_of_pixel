const { test, expect } = require('@playwright/test');

test('secoes dos Bosses ficam completas e legiveis no celular', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
        localStorage.setItem('guardians-of-pixel-eventos-v1', JSON.stringify({ superBosses: 1 }));
        localStorage.setItem('guardians-of-pixel-album-figurinhas-v1',
            JSON.stringify(['boss', 'arconteDasRuinas', 'duqueDasBrasas']));
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await page.locator('#aba-album-bosses').click();
    const secoes = page.locator('.album-grupo-inimigos');
    await expect(secoes).toHaveCount(3);
    await expect(secoes.nth(0)).toContainText('Modo história');
    await expect(secoes.nth(0).locator('[data-tipo-inimigo="boss"]')).toHaveCount(1);
    await expect(secoes.nth(1)).toContainText('Modo clássico');
    await expect(secoes.nth(1).locator('[data-tipo-inimigo="arconteDasRuinas"]')).toHaveCount(1);
    await expect(secoes.nth(2)).toContainText('Eventos');
    await expect(secoes.nth(2).locator('[data-tipo-inimigo="duqueDasBrasas"]')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
