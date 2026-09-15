const { test, expect } = require('@playwright/test');

test('Fase 1 mantém apenas música pixelada ao iniciar, silenciar e reativar', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { fecharConteudoMenu(); iniciarPartida(); });
    const estado = () => page.evaluate(() => ({
        pixelada: musicaPixeladaDaFase1Tocando,
        arquivoPausado: musica.paused,
        botaoAtivo: botaoMusica.getAttribute('aria-pressed')
    }));
    expect(await estado()).toEqual({ pixelada: true, arquivoPausado: true, botaoAtivo: 'true' });
    await page.evaluate(() => alternarMusica());
    expect(await estado()).toEqual({ pixelada: false, arquivoPausado: true, botaoAtivo: 'false' });
    await page.evaluate(() => alternarMusica());
    expect(await estado()).toEqual({ pixelada: true, arquivoPausado: true, botaoAtivo: 'true' });
    await page.evaluate(() => ajustarVolumeDaMusica(0));
    expect((await estado()).pixelada).toBe(false);
    await page.evaluate(() => ajustarVolumeDaMusica(50));
    expect(await estado()).toEqual({ pixelada: true, arquivoPausado: true, botaoAtivo: 'true' });
    await page.evaluate(() => { faseSelecionada = 2; selecionarTrilhaDaPartida(); });
    expect(await page.evaluate(() => musicaDoDesertoTocando && !musicaPixeladaDaFase1Tocando)).toBe(true);
    await page.evaluate(() => selecionarTrilhaDoLobby());
    expect(await page.evaluate(() => musicaDoLobbyTocando && !musicaPixeladaDaFase1Tocando)).toBe(true);
});
