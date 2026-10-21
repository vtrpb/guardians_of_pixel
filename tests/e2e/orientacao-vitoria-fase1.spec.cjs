const { test, expect } = require('@playwright/test');

test('primeira vitória da Fase 1 explica o Canhão pesado e a ida à Fase 2', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => iniciarPartida(false));
    for (let i = 0; i < 3; i++) await page.locator('#botao-continuar-cutscene-carta').click();
    await page.evaluate(() => {
        wave = obterUltimaWaveDaFase();
        finalizarPartidaComVitoria();
    });

    const orientacao = page.locator('#orientacao-vitoria-fase1');
    await expect(orientacao).toBeVisible();
    await expect(orientacao).toContainText('Agora você desbloqueou o Canhão pesado');
    await expect(orientacao).toContainText('Próxima fase');
    await expect(orientacao).toContainText('Capítulo 1');
    await expect(orientacao).toContainText('deserto');
    await expect(page.locator('#botao-proxima-fase-resultado')).toBeEnabled();
    expect(await page.evaluate(() => ({ progresso: maiorFaseConcluida,
        canhao: torreEstaDesbloqueada('canhaoPesado') })))
        .toEqual({ progresso: 1, canhao: true });

    const idiomas = await page.evaluate(() => {
        const anterior = idiomaAtual;
        const textos = {};
        for (const idioma of ['en', 'es']) {
            idiomaAtual = idioma;
            mostrarPainelDeResultado(true);
            textos[idioma] = {
                titulo: tituloOrientacaoVitoriaFase1.textContent,
                caminho: textoOrientacaoVitoriaFase1.textContent,
                tema: pistaOrientacaoVitoriaFase1.textContent,
                fliperama: localizar('Clique nele para jogar. Vença os minigames para suas torres receberem um benefício. Se perder, os inimigos recebem o benefício. A partida ficará pausada até você clicar no fliperama.')
            };
        }
        idiomaAtual = anterior;
        mostrarPainelDeResultado(true);
        return textos;
    });
    expect(idiomas.en.titulo).toContain('Heavy Cannon');
    expect(idiomas.en.caminho).toContain('Chapter 1');
    expect(idiomas.en.tema).toContain('desert');
    expect(idiomas.en.fliperama).toContain('Click it to play');
    expect(idiomas.es.titulo).toContain('Cañón pesado');
    expect(idiomas.es.caminho).toContain('Capítulo 1');
    expect(idiomas.es.tema).toContain('desierto');
    expect(idiomas.es.fliperama).toContain('Haz clic en ella para jugar');

    await orientacao.screenshot({ path: 'artifacts/mensagem-vitoria-fase1.png' });
    await page.locator('#botao-proxima-fase-resultado').click();
    expect(await page.evaluate(() => faseSelecionada)).toBe(2);
    await expect(page.locator('#camada-resultado')).toBeHidden();
    await page.evaluate(() => {
        faseSelecionada = 1;
        prepararNovaPartida();
        wave = obterUltimaWaveDaFase();
        finalizarPartidaComVitoria();
    });
    await expect(orientacao).toBeHidden();
});
