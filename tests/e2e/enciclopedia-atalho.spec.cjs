const { test, expect } = require('@playwright/test');

test('Enciclopédia usa a fileira compacta e permanece acessível nos três idiomas', async ({ page }, info) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    const atalho = page.locator('.lobby-atalhos-perfil #botao-enciclopedia');
    await expect(atalho).toBeVisible();
    await expect(page.locator('.lobby-acoes-extras #botao-enciclopedia')).toHaveCount(0);
    await expect(page.locator('.lobby-atalhos-perfil .lobby-atalho')).toHaveCount(6);
    await page.screenshot({ path: info.outputPath('lobby-desktop.png'), fullPage: true });

    await atalho.click();
    await expect(page.locator('.enciclopedia-contagem')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(atalho).toBeFocused();

    await page.evaluate(() => selecionarIdioma('en'));
    await expect(atalho).toHaveAttribute('aria-label', 'Encyclopedia');
    await page.evaluate(() => selecionarIdioma('es'));
    await expect(atalho).toHaveAttribute('aria-label', 'Enciclopedia');

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(atalho.locator('.atalho-rotulo')).toBeVisible();
    await page.screenshot({ path: info.outputPath('lobby-celular.png'), fullPage: true });
    await atalho.scrollIntoViewIfNeeded();
    await page.screenshot({ path: info.outputPath('atalhos-celular.png') });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.setViewportSize({ width: 320, height: 640 });
    const largurasDosAtalhos = await page.locator('.lobby-atalhos-perfil .lobby-atalho')
        .evaluateAll(itens => itens.map(item => item.getBoundingClientRect().width));
    expect(largurasDosAtalhos.every(largura => largura >= 44)).toBe(true);
    await atalho.scrollIntoViewIfNeeded();
    await page.screenshot({ path: info.outputPath('atalhos-celular-estreito.png') });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await atalho.click();
    await expect(page.locator('.enciclopedia-contagem')).toBeVisible();
    expect(erros).toEqual([]);
});
