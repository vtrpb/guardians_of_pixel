const { test, expect } = require('@playwright/test');

test('Licença de Construção libera a sétima defesa e mantém a vaga extra de torre', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
        localStorage.setItem('guardians-of-pixel-fragmentos-v2', '100');
        localStorage.setItem('tower-defense-2-progresso-fases-v2', '6');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    await page.locator('.botao-lobby-jogar').click();
    await expect(page.locator('#conteudo-menu')).toContainText('6 vagas para a batalha');
    await page.locator('#conteudo-menu .botao-fechar').click();

    await page.locator('.botao-lobby-loja').click();
    await page.locator('button[onclick="selecionarCategoriaDaLoja(\'melhorias\')"]').click();
    const licenca = page.locator('[data-id-item-loja="licencaDeConstrucao"]');
    await expect(licenca).toBeEnabled();
    await licenca.click();
    await page.locator('#botao-confirmar-compra-loja').click();
    await expect.poll(() => page.evaluate(() =>
        JSON.parse(localStorage.getItem('guardians-of-pixel-compras-v2')).includes('licencaDeConstrucao')
    )).toBe(true);
    await page.locator('#conteudo-menu .botao-fechar').click();

    await page.locator('.botao-lobby-jogar').click();
    const preparacao = page.locator('#conteudo-menu');
    await expect(preparacao).toContainText('7 vagas para a batalha');
    await expect(preparacao.locator('.selecao-defesa-vaga')).toHaveCount(7);
    await preparacao.locator('.selecao-defesa-cartao[aria-pressed="false"]:not([disabled])').first().click();
    await expect(preparacao.locator('.selecao-defesa-cartao[aria-pressed="true"]')).toHaveCount(7);
    await expect(preparacao).toContainText('7 de 7 escolhidas');
    await preparacao.screenshot({ path: 'artifacts/licenca-construcao-sete-defesas.png' });
    await expect.poll(() => page.evaluate(() => obterLimiteDeTorres(1))).toBe(11);
    await preparacao.locator('.botao-confirmar-selecao-defesas').click();
    await expect(page.locator('#seletor-torres .botao-construcao:visible')).toHaveCount(8);
    await expect(page.locator('#botao-canhao-blindado')).toContainText('Empréstimo da fase 1');

    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('.botao-lobby-jogar').click();
    await expect(page.locator('#conteudo-menu')).toContainText('7 de 7 escolhidas');
});
