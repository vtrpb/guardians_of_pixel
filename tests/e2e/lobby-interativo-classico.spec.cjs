const { test, expect } = require('@playwright/test');

test('Lobby Clássico: alvos do cenário recebem flechas sem abrir páginas', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { tutorialConcluido = true; fecharConteudoMenu(); alternarModoClassico(); });

    const alvos = page.locator('.lobby-classico-interativo');
    await expect(alvos).toBeVisible();
    await expect(alvos.getByRole('button', { name: 'Acertar alvo de treino' })).toHaveCount(2);
    await alvos.getByRole('button', { name: 'Acertar alvo de treino' }).nth(1).click();
    await expect(alvos.locator('.alvo-acertado')).toHaveCount(1);
    await expect(alvos.locator('.alvo-acertado .flecha-lobby-classico')).toBeVisible();
    await expect(page.locator('.classico-mapa')).toHaveCount(0);

    await page.evaluate(() => mostrarApresentacaoClassico());
    await expect(alvos).toBeHidden();
    await page.evaluate(() => fecharConteudoMenu());
    await expect(alvos).toBeVisible();
    expect(erros).toEqual([]);
});
