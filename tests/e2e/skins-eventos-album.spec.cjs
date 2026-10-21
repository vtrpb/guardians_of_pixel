const { test, expect } = require('@playwright/test');

test('skins dos eventos podem ser equipadas no Álbum sem abrir as missões permanentes', async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        if (sessionStorage.getItem('skins-eventos-preparadas') === 'true') return;
        sessionStorage.setItem('skins-eventos-preparadas', 'true');
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-recompensas-missoes-v1', JSON.stringify({
            skinsDesbloqueadas: ['sentinelaDourada', 'guardiaoSolar', 'sentinelaCosmica'],
            conquistasDesbloqueadas: [],
            skinTorrePadraoEquipada: null
        }));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarAlbum()"]').click();
    await page.locator('#aba-album-skins').click();

    for (const id of ['sentinelaDourada', 'guardiaoSolar', 'sentinelaCosmica']) {
        await page.locator(`[data-id-skin="${id}"]`).click();
        const botao = page.locator('.album-equipar-skin');
        await expect(botao).toHaveText('Equipar skin');
        await botao.click();
        await expect(botao).toBeFocused();
        await expect(botao).toHaveText('Usar visual original');
        if (id === 'sentinelaDourada') {
            await page.locator('#conteudo-menu').screenshot({ path: testInfo.outputPath('skin-evento-equipada.png') });
        }
        expect(await page.evaluate(() => recompensasPermanentesDasMissoes.skinTorrePadraoEquipada)).toBe(id);
        await page.locator('.album-detalhes-fechar').click();
        await expect(page.locator(`[data-id-skin="${id}"]`).locator('..')).toContainText('Equipada');
    }

    await page.reload();
    expect(await page.evaluate(() => recompensasPermanentesDasMissoes.skinTorrePadraoEquipada)).toBe('sentinelaCosmica');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarAlbum()"]').click();
    await page.locator('#aba-album-skins').click();
    await page.locator('[data-id-skin="sentinelaCosmica"]').click();
    await page.locator('.album-equipar-skin').click();
    expect(await page.evaluate(() => recompensasPermanentesDasMissoes.skinTorrePadraoEquipada)).toBe(null);
    await expect(page.locator('.album-equipar-skin')).toHaveText('Equipar skin');
});
