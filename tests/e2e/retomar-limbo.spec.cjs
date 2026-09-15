const { test, expect } = require('@playwright/test');

test('Continuar no Limbo só aparece quando existe uma jornada para retomar', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#botao-retomar-castelo')).toBeHidden();
    await page.evaluate(() => iniciarExploracaoDoCastelo());
    await page.locator('#limbo-sair').click();
    await expect(page.locator('#botao-retomar-castelo')).toBeVisible();
    await page.locator('#botao-retomar-castelo').click();
    await expect(page.locator('#exploracao-limbo')).toBeVisible();
    await page.locator('#limbo-sair').click();
    await page.evaluate(() => {
        jornadaDoLimbo.fase = 'concluido';
        salvarJornadaDoLimbo();
    });
    await expect(page.locator('#botao-retomar-castelo')).toBeHidden();
});
