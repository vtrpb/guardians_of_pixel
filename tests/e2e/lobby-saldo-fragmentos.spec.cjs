const { test, expect } = require('@playwright/test');

test('lobby mostra somente o saldo de Fragmentos no resumo', async ({ page }, info) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    const resumo = page.locator('.lobby-status');
    await expect(resumo.locator('span')).toHaveCount(1);
    await expect(resumo.locator('#fragmentos-pixel-menu')).toBeVisible();
    await expect(resumo).not.toContainText('créditos');
    await expect(resumo).not.toContainText('torres');
    await expect(resumo).not.toContainText('waves');
    await page.screenshot({ path: info.outputPath('lobby-fragmentos-desktop.png') });

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(resumo.locator('span')).toHaveCount(1);
    await resumo.scrollIntoViewIfNeeded();
    await page.screenshot({ path: info.outputPath('lobby-fragmentos-celular.png') });
});
