const { test, expect } = require('@playwright/test');

test('música medieval acompanha o castelo, respeita silêncio e termina na saída', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => iniciarExploracaoDoCastelo());
    expect(await page.evaluate(() => ({
        nome: obterConfiguracaoDaMusicaDaSelva().nomeInterno,
        tocando: musicaDaSelvaTocando, lobby: musicaDoLobbyTocando, arquivo: musica.paused
    }))).toEqual({ nome: 'Salões do Vazio', tocando: true, lobby: false, arquivo: true });
    expect(await page.evaluate(() => {
        const intervalo = intervaloDaMusicaDaSelva;
        mudarSalaDoCastelo('biblioteca');
        return intervalo === intervaloDaMusicaDaSelva;
    })).toBe(true);
    await page.evaluate(() => alternarMusica());
    expect(await page.evaluate(() => musicaDaSelvaTocando)).toBe(false);
    await page.locator('#limbo-sair').click();
    await page.locator('#botao-retomar-castelo').click();
    expect(await page.evaluate(() => musicaDaSelvaTocando)).toBe(false);
    await page.evaluate(() => tocarMusica());
    expect(await page.evaluate(() => musicaDaSelvaTocando)).toBe(true);
    // Exercita todas as notas reais do ciclo no Web Audio do navegador.
    await page.evaluate(() => {
        for (let i = 0; i < 96; i++) tocarPassoDaMusicaDaSelva();
        jornadaDoLimbo.desafio = true;
        jornadaDoLimbo.fase = 'manha';
        iniciarArenaDoLimbo();
    });
    expect(await page.evaluate(() => obterConfiguracaoDaMusicaDaSelva().nomeInterno)).toBe('Ecos do Limbo');
    await page.locator('#limbo-sair').click();
    expect(await page.evaluate(() => ({ tocando: musicaDaSelvaTocando, lobby: musicaDoLobbyTocando, tema: temaMusicalAlternativo })))
        .toEqual({ tocando: false, lobby: true, tema: null });
    expect(erros).toEqual([]);
});
