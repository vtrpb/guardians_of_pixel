const { test, expect } = require('@playwright/test');

test('Musica calma: troca gradual, notas anteriores desligadas e lobby preservado', async ({ page }) => {
    const erros = [];
    page.on('pageerror', e => erros.push(e.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await expect(page.locator('#tela-carregamento')).toBeHidden();
    await page.locator('#saudacao-menu-inicial').click();
    await expect.poll(() => page.evaluate(() => musicaDoLobbyTocando)).toBe(true);
    expect(await page.evaluate(() => obterConfiguracaoDaMusicaDoLobby().nomeInterno)).toBe('Ponte do Entardecer');
    await page.evaluate(() => { window.ganhoAnteriorTeste = ganhoDaMusicaDoLobby; });
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect.poll(() => page.evaluate(() => !musicaDaAberturaConcluida && ganhoDaTransicaoDoLobby.gain.value < .8 && ganhoDaTransicaoDoLobby.gain.value > .1), { intervals: [50] }).toBe(true);
    await expect.poll(() => page.evaluate(() => musicaDaAberturaConcluida && ganhoDaTransicaoDoLobby.gain.value < .8), { intervals: [50] }).toBe(true);
    expect(await page.evaluate(() => ganhoAnteriorTeste !== ganhoDaMusicaDoLobby && obterConfiguracaoDaMusicaDoLobby() === CONFIG.audio.musicaAnteriorDoLobby)).toBe(true);
    await expect.poll(() => page.evaluate(() => ganhoDaTransicaoDoLobby.gain.value)).toBe(1);
    expect(await page.evaluate(() => musicaDoLobbyTocando)).toBe(true);
    expect(erros).toEqual([]);
});

test('Silencio durante a transicao nao reinicia musica', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#tela-carregamento')).toBeHidden();
    await page.locator('#saudacao-menu-inicial').click();
    await expect.poll(() => page.evaluate(() => musicaDoLobbyTocando)).toBe(true);
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { musicaPausadaPeloJogador = true; pararMusicaDoLobby(); });
    await expect.poll(() => page.evaluate(() => musicaDaAberturaConcluida)).toBe(true);
    expect(await page.evaluate(() => musicaDoLobbyTocando)).toBe(false);
});
