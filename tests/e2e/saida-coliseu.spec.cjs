const { test, expect } = require('@playwright/test');

test('terminar o Coliseu devolve a musica e a selecao da campanha ao lobby', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
        localStorage.setItem('guardians-of-pixel-jornada-limbo-v1', JSON.stringify({
            fase: 'vitoria', sala: 'salao', x: 320, y: 330, desafio: true, promessaDeAjuda: false
        }));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const resultado = await page.evaluate(() => {
        faseSelecionada = CONFIG.intervaloPerdido.numeroInterno;
        jogoIniciado = true;
        partidaEncerrada = true;
        partidaVencida = true;
        selecionarTrilhaDaPartida('intervaloPerdido');
        retomarCasteloDoLimbo();
        sairDoCasteloParaLobby();
        retomarCasteloDoLimbo();
        for (let indice = 0; indice < CONFIG.casteloDoLimbo.vitoria.length; indice++) avancarDialogoDoCastelo();
        return { musicaNoFimDoColiseu: { trilhaDoLobbyAtiva, musicaDaSelvaTocando },
            cenaDoCapitulo: !camadaCutsceneCapitulo2.hidden };
    });
    expect(resultado.cenaDoCapitulo).toBe(true);
    expect(resultado.musicaNoFimDoColiseu).toEqual({ trilhaDoLobbyAtiva: true, musicaDaSelvaTocando: false });
    await page.locator('#botao-continuar-cutscene-capitulo-2').click();
    await expect(page.locator('#camada-resultado')).toBeVisible();
    await page.locator('#botao-voltar-lobby-resultado').click();
    const estadoDoLobby = await page.evaluate(() => ({ faseSelecionada,
            numeroDoIntervalo: CONFIG.intervaloPerdido.numeroInterno,
            musicaDaSelvaTocando, trilhaDaSelvaAtiva, trilhaDoLobbyAtiva,
            menuVisivel: !menuPrincipal.classList.contains('oculto') }));
    expect(estadoDoLobby.menuVisivel).toBe(true);
    expect(estadoDoLobby.trilhaDoLobbyAtiva).toBe(true);
    expect(estadoDoLobby.musicaDaSelvaTocando).toBe(false);
    expect(estadoDoLobby.faseSelecionada).not.toBe(estadoDoLobby.numeroDoIntervalo);
    await page.locator('#conteudo-menu .botao-fechar').click();
    await page.locator('.botao-lobby-jogar').click();
    expect(await page.evaluate(() => faseSelecionada)).not.toBe(estadoDoLobby.numeroDoIntervalo);
});

test('sair da arena vencida pelo botao de salvar restaura o lobby', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
        localStorage.setItem('guardians-of-pixel-jornada-limbo-v1', JSON.stringify({
            fase: 'vitoria', sala: 'salao', x: 320, y: 330, desafio: true, promessaDeAjuda: false
        }));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const resultado = await page.evaluate(() => {
        faseSelecionada = CONFIG.intervaloPerdido.numeroInterno;
        jogoIniciado = true;
        partidaEncerrada = true;
        partidaVencida = true;
        retomarCasteloDoLimbo();
        sairDoCasteloParaLobby();
        return { faseSelecionada, numeroDoIntervalo: CONFIG.intervaloPerdido.numeroInterno,
            musicaDaSelvaTocando, trilhaDoLobbyAtiva, menuVisivel: !menuPrincipal.classList.contains('oculto') };
    });
    expect(resultado.menuVisivel).toBe(true);
    expect(resultado.trilhaDoLobbyAtiva).toBe(true);
    expect(resultado.musicaDaSelvaTocando).toBe(false);
    expect(resultado.faseSelecionada).not.toBe(resultado.numeroDoIntervalo);
});
