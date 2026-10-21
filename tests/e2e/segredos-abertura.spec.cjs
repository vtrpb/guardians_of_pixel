const { test, expect } = require('@playwright/test');

for (const largura of [1440, 390]) {
    test(`Segredos da paisagem: descoberta e navegacao em ${largura}px`, async ({ page }, info) => {
        const erros = [];
        page.on('pageerror', e => erros.push(e.message));
        await page.setViewportSize({ width: largura, height: largura === 390 ? 844 : 1000 });
        await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
        await page.goto('/');
        await expect(page.locator('#tela-carregamento')).toBeHidden();
        await expect(page.locator('#tela-inicial-jogo')).toHaveCSS('opacity', '1');
        await expect(page.locator('.arte-segredos-abertura')).toHaveAttribute('viewBox', '0 0 320 180');
        await expect(page.locator('.arte-segredos-abertura [data-pista-visual="portal"]')).toBeVisible();
        await expect(page.locator('.arte-segredos-abertura [data-pista-visual="relogio"]')).toBeVisible();
        await expect(page.locator('[data-pista-visual="portal"] path[fill="#50d6c6"]')).toHaveCount(1);
        await expect(page.locator('[data-pista-visual="portal"] path[fill="#90728e"]')).toHaveCount(1);
        expect(await page.locator('[data-pista-visual="portal"] path').evaluateAll(caminhos =>
            caminhos.some(caminho => ['#204f37', '#284d3b', '#8aa56e', '#4aad6d'].includes(caminho.getAttribute('fill')))
        )).toBe(false);
        await expect(page.locator('[data-pista-visual="relogio"] path[fill="#f0d481"]')).toHaveCount(1);
        expect(await page.locator('[data-pista-visual="relogio"]').evaluate(relogio => relogio.getBBox().width)).toBeLessThanOrEqual(16);
        await expect(page.locator('.segredos-abertura canvas')).toHaveCount(0);
        await expect(page.locator('[data-segredo="entidade"]')).toBeHidden();
        await expect(page.locator('.retrato-entidade-abertura')).toBeHidden();
        await expect(page.locator('[data-segredo="portal"]')).toBeVisible();
        await expect(page.locator('[data-segredo="relogio"]')).toBeVisible();
        await page.locator('[data-segredo="portal"]').hover();
        await expect(page.locator('[data-segredo="portal"]')).toHaveCSS('box-shadow', 'none');
        await page.mouse.move(0, 0);
        await page.screenshot({ path: info.outputPath('boas-vindas.png') });
        for (const [indice, id] of ['relogio', 'portal'].entries()) {
            const botao = page.locator(`[data-segredo="${id}"]`);
            await botao.click();
            expect(await botao.evaluate(el => getComputedStyle(el, '::after').content)).toBe('"✦"');
            await expect(page.locator('.pista-abertura')).toBeVisible();
            await expect(page.locator('.pista-abertura small')).toContainText(`${indice + 1}/3`);
            await page.keyboard.press('Escape');
            await expect(botao).toBeFocused();
        }
        await page.evaluate(() => {
            maiorFaseConcluida = 18;
            window.atualizarEntidadeDaAbertura();
        });
        await expect(page.locator('[data-segredo="entidade"]')).toBeVisible();
        await expect(page.locator('.retrato-entidade-abertura')).toBeVisible();
        await page.screenshot({ path: info.outputPath('apos-fase18.png') });
        await page.locator('[data-segredo="entidade"]').click();
        await expect(page.locator('.pista-abertura small')).toContainText('3/3');
        await page.keyboard.press('Escape');
        await page.locator('[data-segredo="entidade"]').press('Enter');
        await expect(page.locator('.pista-abertura small')).toContainText('3/3');
        await expect(page.locator('.pista-abertura small')).toContainText('Três sinais');
        await page.screenshot({ path: info.outputPath('pistas.png') });
        await page.locator('#botao-jogar-menu-inicial').click();
        await expect(page.locator('.pista-abertura')).toBeHidden();
        await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
        await expect(page.locator('.botao-lobby-jogar')).toBeFocused();
        expect(erros).toEqual([]);
    });
}

test('A entidade aparece ao recarregar uma Fase 18 concluída', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('tower-defense-2-progresso-fases-v2', '18'));
    await page.goto('/');
    await expect(page.locator('#tela-carregamento')).toBeHidden();
    await expect(page.locator('[data-segredo="entidade"]')).toBeVisible();
    await expect(page.locator('.retrato-entidade-abertura')).toBeVisible();
});
