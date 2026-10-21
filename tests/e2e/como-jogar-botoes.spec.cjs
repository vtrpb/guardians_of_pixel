const { test, expect } = require('@playwright/test');

test('Como jogar explica os botões principais sem substituir o tutorial', async ({ page }, info) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarTutorial()"]:visible').click();

    await expect(page.locator('#painel-tutorial-basico')).toBeVisible();
    await expect(page.locator('#painel-tutorial-basico .tutorial-lista li')).toHaveCount(6);
    await page.locator('#aba-tutorial-botoes').click();
    await expect(page.locator('#painel-tutorial-basico')).toBeHidden();
    await expect(page.locator('#painel-tutorial-botoes')).toBeVisible();
    await expect(page.locator('.tutorial-botoes-lista > li')).toHaveCount(11);
    await expect(page.locator('.tutorial-botoes-lista')).toContainText('torres desbloqueadas');
    await expect(page.locator('#aba-tutorial-botoes')).toHaveAttribute('aria-selected', 'true');
    const posicoes = await page.locator('.tutorial-botoes-lista > li').evaluateAll(cartoes => cartoes.map(cartao => {
        const area = cartao.getBoundingClientRect();
        return { topo: area.top, esquerda: area.left };
    }));
    expect(posicoes[8].topo).toBe(posicoes[9].topo);
    expect(posicoes[8].esquerda).toBeLessThan(posicoes[9].esquerda);
    expect(posicoes[10].topo).toBeGreaterThan(posicoes[9].topo);
    await page.screenshot({ path: info.outputPath('botoes-desktop.png') });

    await page.evaluate(() => selecionarIdioma('en'));
    await page.locator('#aba-tutorial-botoes').click();
    await expect(page.locator('.tutorial-botoes-lista')).toContainText('unlocked towers');
    await expect(page.locator('.tutorial-botoes-lista strong').first()).toHaveText('Start game');
    await expect(page.locator('.tutorial-botoes-lista > li').nth(9).locator('strong').first()).toHaveText('Settings');
    await expect(page.locator('.tutorial-botoes-lista > li').last().locator('strong').first()).toHaveText('Stage editor');
    await page.evaluate(() => selecionarIdioma('es'));
    await page.locator('#aba-tutorial-botoes').click();
    await expect(page.locator('.tutorial-botoes-lista')).toContainText('torres desbloqueadas');
    await expect(page.locator('.tutorial-botoes-lista strong').first()).toHaveText('Comenzar partida');

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.tutorial-botoes-lista > li')).toHaveCount(11);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath('botoes-celular.png') });
    await page.locator('#aba-tutorial-basico').click();
    await expect(page.locator('#painel-tutorial-basico .tutorial-lista li')).toHaveCount(6);
});

test('cartão do Editor abre o guia completo em Botões do menu', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarTutorial()"]:visible').click();

    await expect(page.locator('#painel-tutorial-basico')).toBeVisible();
    await expect(page.locator('#aba-tutorial-editor')).toHaveCount(0);
    await page.locator('#aba-tutorial-botoes').click();
    await expect(page.locator('.tutorial-botoes-lista > li')).toHaveCount(11);
    const cartaoEditor = page.locator('.tutorial-botoes-lista > li').filter({ has: page.getByText('Editor de fases', { exact: true }) });
    await expect(cartaoEditor).toContainText('Crie, teste e compartilhe mapas próprios');
    await expect(cartaoEditor).toContainText('nível 5');
    const entrada = cartaoEditor.locator('.tutorial-editor-entrada');
    const acionador = entrada.locator('> summary');
    expect(await acionador.evaluate(elemento => getComputedStyle(elemento).cursor)).toBe('pointer');
    await expect(entrada).not.toHaveAttribute('open');
    await acionador.click();
    await expect(entrada).toHaveAttribute('open');
    await expect(entrada.locator('.tutorial-editor-topico')).toHaveCount(6);
    await expect(entrada).toContainText('nome do criador');
    await expect(entrada.locator('.tutorial-editor-conteudo > .botao')).toBeDisabled();
    await entrada.getByText('Conectar a Comunidade local', { exact: true }).click();
    await expect(entrada.locator('code')).toBeVisible();
    await expect(entrada).toContainText('mesma rede Wi-Fi');
    await entrada.getByText('Encontrar e jogar um mapa', { exact: true }).click();
    await expect(entrada).toContainText('Adicionar à minha biblioteca');
    await expect(entrada).toContainText('site HTTPS');
    await acionador.focus();
    await page.keyboard.press('Enter');
    await expect(entrada).not.toHaveAttribute('open');
    await page.keyboard.press('Enter');
    await expect(entrada).toHaveAttribute('open');
    await page.locator('#aba-tutorial-basico').click();
    await expect(page.locator('#painel-tutorial-basico')).toContainText('limite de melhorias de cada torre');
    await expect(page.locator('#painel-tutorial-basico')).not.toContainText('Cada torre pode chegar ao nível 3');

    await page.evaluate(() => selecionarIdioma('en'));
    await page.locator('#aba-tutorial-botoes').click();
    await page.locator('.tutorial-editor-entrada > summary').click();
    await expect(page.locator('.tutorial-editor-entrada')).toContainText('same Wi-Fi or LAN');
    await page.evaluate(() => selecionarIdioma('es'));
    await page.locator('#aba-tutorial-botoes').click();
    await page.locator('.tutorial-editor-entrada > summary').click();
    await expect(page.locator('.tutorial-editor-entrada')).toContainText('misma red Wi-Fi');
    await page.locator('.tutorial-editor-entrada').getByText('Conectar a la Comunidad local', { exact: true }).click();
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

    await page.evaluate(() => eval('registrarExperiencia(1400)'));
    await page.locator('#aba-tutorial-botoes').click();
    await page.locator('.tutorial-editor-entrada > summary').click();
    await expect(page.locator('.tutorial-editor-conteudo > .botao')).toBeEnabled();
    await page.locator('.tutorial-editor-conteudo > .botao').click();
    await expect(page.locator('#conteudo-menu[data-tela="editor"]')).toBeVisible();
});
