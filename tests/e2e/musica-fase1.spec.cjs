const { test, expect } = require('@playwright/test');

test('Tempestade usa a música atual do Campo Verde e respeita controles e saída', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-supremas').click();
    await page.locator('[data-desafio-supremo=supremaTempestade]').click();
    const estado = () => page.evaluate(() => ({
        pixelada: musicaPixeladaDaFase1Tocando,
        arquivoPausado: musica.paused,
        faseMusical: obterNumeroDaFaseMusical(),
        desafio: desafioSupremoAtivo
    }));
    const tocando = { pixelada: true, arquivoPausado: true, faseMusical: 1, desafio: 'supremaTempestade' };
    expect(await estado()).toEqual(tocando);
    await page.evaluate(() => alternarMusica());
    expect(await estado()).toEqual({ ...tocando, pixelada: false });
    await page.evaluate(() => alternarMusica());
    expect(await estado()).toEqual(tocando);
    await page.evaluate(() => ajustarVolumeDaMusica(0));
    expect(await estado()).toEqual({ ...tocando, pixelada: false });
    await page.evaluate(() => ajustarVolumeDaMusica(50));
    expect(await estado()).toEqual(tocando);
    await page.evaluate(() => { finalizarPartida(); voltarAoLobbyDoResultado(); });
    await expect.poll(() => page.evaluate(() => musicaDoLobbyTocando && !musicaPixeladaDaFase1Tocando)).toBe(true);
    for (const tipo of ['supremaCronarca', 'supremaBastiao']) {
        await page.locator(`[data-desafio-supremo=${tipo}]`).click();
        expect(await page.evaluate(tipo => ({
            correta: tipo === 'supremaCronarca' ? musicaDoArticoTocando : musicaDoDesertoTocando,
            pixelada: musicaPixeladaDaFase1Tocando,
            arquivoPausado: musica.paused
        }), tipo)).toEqual({ correta: true, pixelada: false, arquivoPausado: true });
        await page.evaluate(() => { finalizarPartida(); voltarAoLobbyDoResultado(); });
    }
    expect(erros).toEqual([]);
});

test('Fase 1 mantém apenas música pixelada ao iniciar, silenciar e reativar', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
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
