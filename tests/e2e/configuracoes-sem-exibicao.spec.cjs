const { test, expect } = require('@playwright/test');

test('Configurações mantêm idioma e volume sem controles de exibição', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-configuracoes-lobby').click();
    await expect(page.locator('.seletor-modos-exibicao, .botao-modo-exibicao')).toHaveCount(0);
    await expect(page.locator('.seletor-idiomas')).toBeVisible();
    await page.locator('#controle-volume-musica').fill('22');
    await expect(page.locator('#valor-volume-musica')).toHaveText('22%');
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-configuracoes-lobby').click();
    await expect(page.locator('#controle-volume-musica')).toHaveValue('22');
});

test('Configurações em tela pequena continuam acessíveis e traduzidas', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-configuracoes-lobby').click();
    await expect(page.locator('.seletor-modos-exibicao, .botao-modo-exibicao')).toHaveCount(0);
    await expect(page.locator('#controle-volume-musica')).toBeVisible();
    await page.locator('.seletor-idiomas [data-idioma="en"]').click();
    await expect(page.locator('#titulo-configuracoes')).toHaveText('Settings');
    await page.locator('.seletor-idiomas [data-idioma="es"]').click();
    await expect(page.locator('#titulo-configuracoes')).toHaveText('Configuración');
});

test('Configurações da partida abrem sem controles de exibição', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { fecharConteudoMenu(); iniciarPartida(); abrirConfiguracoes(); });
    await expect(page.locator('#painel-configuracoes')).toBeVisible();
    await expect(page.locator('.seletor-modos-exibicao, .botao-modo-exibicao')).toHaveCount(0);
    await expect(page.locator('#controle-volume-musica')).toBeVisible();
});
