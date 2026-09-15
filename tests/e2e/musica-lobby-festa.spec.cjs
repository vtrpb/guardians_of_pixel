const { test, expect } = require('@playwright/test');

test('Lobby calmo: música anterior ativa, controles e composição festiva preservada', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect.poll(() => page.evaluate(() => musicaDoLobbyTocando)).toBe(true);
    expect(await page.evaluate(() => obterConfiguracaoDaMusicaDoLobby() === CONFIG.audio.musicaAnteriorDoLobby)).toBe(true);
    const resultado = await page.evaluate(async () => {
        const c = CONFIG.audio.musicaDoLobby;
        const passos = c.frases[0].length * c.ordem.length;
        const segundos = passos * c.intervaloDoPasso / 1000;
        const offline = new OfflineAudioContext(1, Math.ceil((segundos + 2) * 22050), 22050);
        const original = obterContextoAudio;
        const ganho = offline.createGain();
        ganho.gain.value = c.volumeRelativo;
        ganho.connect(offline.destination);
        let proximo;
        try {
            obterContextoAudio = () => offline;
            for (let i = 0; i < passos; i++) {
                proximo = tocarPassoDaPartituraPixelada({ currentTime: i * c.intervaloDoPasso / 1000 }, c, i, ganho);
            }
        } finally { obterContextoAudio = original; }
        const audio = await offline.startRendering();
        const amostras = audio.getChannelData(0);
        let pico = 0, energia = 0;
        for (const valor of amostras) { pico = Math.max(pico, Math.abs(valor)); energia += valor * valor; }
        return { pico, rms: Math.sqrt(energia / amostras.length), segundos, proximo,
            anterior: CONFIG.audio.musicaAnteriorDoLobby };
    });
    expect(resultado.segundos).toBeCloseTo(23.04);
    expect(resultado.proximo).toBe(0);
    expect(resultado.pico).toBeLessThan(1);
    expect(resultado.rms).toBeGreaterThan(.005);
    expect(resultado.anterior).toEqual({ intervaloDoPasso: 430, volumeRelativo: 1.25,
        melodia: [392,493.88,587.33,493.88,349.23,440,523.25,440,329.63,392,493.88,392,349.23,440,587.33,440],
        baixo: [98,87.31,82.41,73.42] });
    await page.evaluate(() => alternarMusica());
    expect(await page.evaluate(() => musicaDoLobbyTocando)).toBe(false);
    await page.evaluate(() => alternarMusica());
    expect(await page.evaluate(() => musicaDoLobbyTocando)).toBe(true);
    await page.evaluate(() => ajustarVolumeDaMusica(0));
    expect(await page.evaluate(() => musicaDoLobbyTocando)).toBe(false);
    await page.evaluate(() => ajustarVolumeDaMusica(35));
    expect(await page.evaluate(() => musicaDoLobbyTocando)).toBe(true);
    await page.evaluate(() => { fecharConteudoMenu(); iniciarPartida(); });
    expect(await page.evaluate(() => !musicaDoLobbyTocando && musicaPixeladaDaFase1Tocando)).toBe(true);
    await page.evaluate(() => selecionarTrilhaDoLobby());
    expect(await page.evaluate(() => musicaDoLobbyTocando && !musicaPixeladaDaFase1Tocando)).toBe(true);
    expect(erros).toEqual([]);
});
