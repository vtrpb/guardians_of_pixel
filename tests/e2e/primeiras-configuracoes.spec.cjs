const { test, expect } = require('@playwright/test');

test('primeira entrada apresenta preferências uma só vez e permite escolher idioma', async ({ page }) => {
    await page.goto('/');
    const painel = page.locator('#painel-configuracoes');
    await expect(painel).toBeVisible();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await expect(page.locator('#apresentacao-primeiras-configuracoes')).toBeVisible();
    await expect(page.locator('#apresentacao-primeiras-configuracoes')).toContainText('Você sempre vai poder mudar essas coisas em Configurações.');
    await expect(page.locator('#apresentacao-primeiras-configuracoes')).toContainText('You can always change these choices in Settings.');
    await expect(page.locator('#apresentacao-primeiras-configuracoes')).toContainText('Siempre podrás cambiar estas opciones en Configuración.');
    await painel.screenshot({ path: 'artifacts/primeiras-configuracoes.png' });

    await page.locator('.botao-idioma[data-idioma="en"]').click();
    await expect(page.locator('#titulo-configuracoes')).toHaveText('Settings');
    await page.locator('#controle-animacao-vermelho').uncheck();
    await page.locator('#controle-volume-musica').fill('22');
    await expect(page.locator('#botao-concluir-primeiras-configuracoes')).toHaveText('Continue');

    await page.reload();
    await expect(page.locator('#camada-configuracoes')).toBeHidden();
    await expect(page.locator('#tela-inicial-jogo')).toBeVisible();
    await expect(page.locator('#apresentacao-primeiras-configuracoes')).toBeHidden();
    const preferencias = await page.evaluate(() => ({
        idioma: localStorage.getItem('guardians-of-pixel-idioma-v1'),
        ...JSON.parse(localStorage.getItem('guardians-of-pixel-preferencias-v1'))
    }));
    expect(preferencias.idioma).toBe('en');
    expect(preferencias.animacaoDoVermelhoAtiva).toBe(false);
    expect(preferencias.volumeDaMusica).toBe(0.22);
});

test('jogador que já entrou continua sem a etapa inicial', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await expect(page.locator('#tela-inicial-jogo')).toBeVisible();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#camada-configuracoes')).toBeHidden();
    await expect(page.locator('#apresentacao-primeiras-configuracoes')).toBeHidden();
});

test('continuar na primeira entrada abre o tutorial e não repete a etapa', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.locator('#painel-configuracoes')).toBeVisible();
    await page.locator('#painel-configuracoes').screenshot({ path: 'artifacts/primeiras-configuracoes-celular.png' });
    await page.locator('#botao-concluir-primeiras-configuracoes').click();
    await expect(page.locator('#camada-configuracoes')).toBeHidden();
    await expect(page.locator('#tela-inicial-jogo')).toBeVisible();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#aba-tutorial-basico')).toBeVisible();
    await page.reload();
    await expect(page.locator('#camada-configuracoes')).toBeHidden();
    await expect(page.locator('#tela-inicial-jogo')).toBeVisible();
});

test('cada slot novo recebe a etapa uma vez sem alterar o slot antigo', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#camada-configuracoes')).toBeHidden();
    await page.evaluate(() => mostrarSalvos());
    await page.locator('button[onclick="trocarSalvoAtivo(2)"]').click();
    await expect(page.locator('#apresentacao-primeiras-configuracoes')).toBeVisible();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('#painel-configuracoes').screenshot({ path: 'artifacts/primeiras-configuracoes-save-novo.png' });
    const marcadores = await page.evaluate(() => JSON.parse(localStorage.getItem('guardians-of-pixel-salvos-v1'))
        .espacos.map(salvo => salvo?.preferenciasApresentadas));
    expect(marcadores).toEqual([true, true, undefined]);

    await page.reload();
    await expect(page.locator('#camada-configuracoes')).toBeHidden();
    await expect(page.locator('#tela-inicial-jogo')).toBeVisible();
    await page.evaluate(() => trocarSalvoAtivo(1));
    await expect(page.locator('#camada-configuracoes')).toBeHidden();
    await expect(page.locator('#tela-inicial-jogo')).toBeVisible();
});
