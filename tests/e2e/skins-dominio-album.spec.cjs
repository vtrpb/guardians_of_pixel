const { test, expect } = require('@playwright/test');

test('skins de domínio obtidas aparecem e podem ser equipadas no Álbum', async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        if (sessionStorage.getItem('skins-dominio-preparadas')) return;
        sessionStorage.setItem('skins-dominio-preparadas', 'true');
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-dominio-torres-v1', JSON.stringify({
            padrao: { pontos: 20000, equipado: false },
            canhaoPesado: { pontos: 15000, equipado: false }
        }));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(() => mostrarAlbum());
    await page.locator('#aba-album-skins').click();

    const skin = page.locator('[data-id-skin="dominio-padrao"]');
    await expect(skin).toBeVisible();
    await expect(page.locator('[data-id-skin="dominio-canhaoPesado"]')).toBeVisible();
    await expect(page.locator('[data-id-skin="dominio-obliterador"]')).toHaveCount(0);
    await skin.click();
    await page.locator('#conteudo-menu').screenshot({ path: testInfo.outputPath('skins-dominio-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#conteudo-menu').screenshot({ path: testInfo.outputPath('skins-dominio-celular.png') });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.locator('.album-equipar-skin')).toHaveText('Equipar skin');
    await page.locator('.album-equipar-skin').click();
    await expect(page.locator('.album-equipar-skin')).toHaveText('Usar visual anterior');
    expect(await page.evaluate(() => dominioEstaEquipado('padrao'))).toBe(true);
    await page.reload();
    expect(await page.evaluate(() => dominioEstaEquipado('padrao'))).toBe(true);

    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(() => mostrarAlbum());
    await page.locator('#aba-album-skins').click();
    await page.locator('[data-id-skin="original"]').click();
    await page.locator('.album-equipar-skin').click();
    expect(await page.evaluate(() => dominioEstaEquipado('padrao'))).toBe(false);

    const ids = await page.evaluate(() => {
        const nivel = Object.keys(CONFIG.progressaoDeNivel.skins)[0];
        const apoiador = CONFIG.pacoteApoiador.skin.id;
        recompensasPermanentesDasMissoes.skinsDesbloqueadas.push(nivel);
        salvarRecompensasPermanentesDasMissoes();
        pacoteApoiador = { adquirido: true, skinEquipada: false };
        salvarPacoteApoiador();
        mostrarAlbum();
        return { nivel, apoiador };
    });
    await page.locator('#aba-album-skins').click();
    for (const id of [ids.nivel, ids.apoiador]) {
        await page.locator(`[data-id-skin="${id}"]`).click();
        await page.locator('.album-equipar-skin').click();
        await expect(page.locator('.album-equipar-skin')).toHaveText('Usar visual original');
        await page.locator('.album-detalhes-fechar').click();
    }
    expect(await page.evaluate(() => ({
        nivel: recompensasPermanentesDasMissoes.skinTorrePadraoEquipada,
        apoiador: pacoteApoiador.skinEquipada
    }))).toEqual({ nivel: null, apoiador: true });
});
