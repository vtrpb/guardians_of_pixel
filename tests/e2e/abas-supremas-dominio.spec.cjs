const { test, expect } = require('@playwright/test');

test('Supremas e Domínio dividem a página sem novo botão no lobby', async ({ page }, info) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    await page.locator('#botao-supremas').click();
    await expect(page.locator('#aba-supremas-dominio-supremas')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[data-suprema]')).toHaveCount(3);
    await page.locator('#aba-supremas-dominio-dominio').click();
    await expect(page.locator('#aba-supremas-dominio-dominio')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.dominio-cartao').first()).toBeVisible();
    await expect(page.locator('#conteudo-menu button[onclick="mostrarAlbum()"]')).toHaveCount(0);
    await page.screenshot({ path: info.outputPath('dominio-pelas-supremas-desktop.png') });

    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#aba-supremas-dominio-supremas')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[data-suprema]')).toHaveCount(3);
    await page.keyboard.press('End');
    await expect(page.locator('#aba-supremas-dominio-dominio')).toHaveAttribute('aria-selected', 'true');

    await page.evaluate(() => selecionarIdioma('en'));
    await expect(page.locator('#aba-supremas-dominio-dominio')).toHaveText('Tower mastery');
    await page.evaluate(() => selecionarIdioma('es'));
    await expect(page.locator('#aba-supremas-dominio-dominio')).toHaveText('Dominio de torres');
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.abas-supremas-dominio')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath('dominio-pelas-supremas-celular.png') });

    await page.locator('#conteudo-menu .botao-fechar').click();
    await page.evaluate(() => selecionarIdioma('pt-BR'));
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await expect(page.locator('#conteudo-menu button[onclick="mostrarDominioDasTorres()"]')).toHaveCount(0);
    await expect(page.locator('#aba-album-torres')).toBeVisible();
    await page.screenshot({ path: info.outputPath('album-sem-botao-dominio-celular.png') });
    expect(erros).toEqual([]);
});
