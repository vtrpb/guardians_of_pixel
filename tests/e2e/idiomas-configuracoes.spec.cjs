const { test, expect } = require('@playwright/test');

test('mostra a região dos idiomas nas configurações sem cortar os botões', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-configuracoes-lobby').click();

    const opcoes = [
        ['pt-BR', 'Português (BR)'],
        ['en', 'English (US)'],
        ['es', 'Español (ES)']
    ];
    const seletor = page.locator('.seletor-idiomas');
    await page.locator('#painel-configuracoes').screenshot({ path: testInfo.outputPath('configuracoes-idiomas-celular.png') });
    for (const [idioma, texto] of opcoes) {
        const botao = seletor.locator(`[data-idioma="${idioma}"]`);
        await expect(botao).toHaveText(texto);
        await expect(botao).toBeVisible();
        const largura = await botao.evaluate(elemento => ({
            conteudo: elemento.scrollWidth,
            disponivel: elemento.clientWidth
        }));
        expect(largura.conteudo).toBeLessThanOrEqual(largura.disponivel);
    }

    await seletor.locator('[data-idioma="en"]').click();
    await expect(seletor.locator('[data-idioma="en"]')).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-configuracoes-lobby').click();
    await expect(seletor.locator('[data-idioma="en"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(seletor.locator('[data-idioma="en"]')).toHaveText('English (US)');
});
