const { test, expect } = require('@playwright/test');

test('álbum reproduz e interrompe a caminhada dos inimigos das Fases 1 e 2', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-album-figurinhas-v1',
            JSON.stringify(['normal', 'elite', 'rapido', 'sabotador', 'boss',
                'escorpiao', 'mumia', 'bossDeserto', 'loboDeGelo']));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => mostrarAlbum());
    await expect(page.locator('#controle-animacao-vermelho')).toBeChecked();

    for (const tipo of ['normal', 'elite', 'rapido', 'sabotador', 'boss',
        'escorpiao', 'mumia', 'bossDeserto']) {
        await page.evaluate(tipoDoInimigo => abrirDetalhesDaFigurinhaDoAlbum('inimigo', tipoDoInimigo), tipo);
        const botao = page.locator('.album-ver-animacao');
        const miniatura = page.locator('.album-detalhes-miniatura');
        await expect(botao).toHaveText('Ver animação');
        const desenhoParado = await miniatura.evaluate(canvas => canvas.toDataURL());
        if (tipo === 'normal') {
            await page.waitForTimeout(220);
            await page.locator('.album-detalhes-painel')
                .screenshot({ path: 'artifacts/album-inimigo-parado.png' });
            await page.evaluate(() => alternarAnimacaoDoVermelho(false));
        }
        await botao.click();
        await expect(botao).toHaveAttribute('aria-pressed', 'true');
        await expect.poll(async () => miniatura.evaluate(canvas => canvas.toDataURL()))
            .not.toBe(desenhoParado);
        if (tipo === 'normal' || tipo === 'bossDeserto') await page.locator('.album-detalhes-painel')
            .screenshot({ path: tipo === 'normal' ? 'artifacts/album-inimigo-ver-animacao.png'
                : 'artifacts/album-farao-ver-animacao.png' });
        await botao.click();
        await expect(botao).toHaveText('Ver animação');
        expect(await miniatura.evaluate(canvas => canvas.toDataURL())).toBe(desenhoParado);
        await page.locator('.album-detalhes-fechar').click();
        await expect(page.locator('.album-detalhes-camada')).toHaveCount(0);
    }

    await page.evaluate(() => abrirDetalhesDaFigurinhaDoAlbum('inimigo', 'loboDeGelo'));
    await expect(page.locator('.album-ver-animacao')).toHaveCount(1);
});
