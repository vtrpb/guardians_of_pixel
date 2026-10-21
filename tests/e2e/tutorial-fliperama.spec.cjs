const { test, expect } = require('@playwright/test');

for (const largura of [1280, 390]) test(`tutorial aponta o fliperama e mantém a partida pausada até o clique em ${largura}px`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: 844 });
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => iniciarPartida(false));
    for (let i = 0; i < 3; i++) await page.locator('#botao-continuar-cutscene-carta').click();
    await page.evaluate(() => {
        iniciarTutorialDaPartida();
        avancarTutorialPara(5);
        concluirTutorialDaPartida();
        wave = CONFIG.fliperama.intervaloDeAparicao;
        tentarExibirFliperamaNaWaveAtual();
    });

    const painel = page.locator('#camada-tutorial-partida');
    await expect(painel).toBeVisible();
    await expect(painel).toContainText('Esse é o fliperama');
    await expect(painel).toContainText('Clique nele para jogar');
    await expect(painel).toContainText('Se perder, os inimigos recebem o benefício');
    await expect(page.locator('#botao-continuar-tutorial')).toBeHidden();
    const antes = await page.evaluate(() => ({
        pausado: jogoPausado,
        ativo: explicacaoFliperamaAtiva,
        expira: fliperamaNoMapa.expiraEm,
        posicao: { x: fliperamaNoMapa.x, y: fliperamaNoMapa.y }
    }));
    expect(antes.pausado && antes.ativo).toBe(true);
    await page.evaluate(() => definirJogoPausado(false));
    expect(await page.evaluate(() => jogoPausado)).toBe(true);

    const mapa = page.locator('#game');
    const caixa = await mapa.boundingBox();
    const pontoLivre = await page.evaluate(({ x, y }) => {
        const area = canvas.getBoundingClientRect();
        for (const fracaoX of [0.5, 0.2, 0.8]) {
            for (const fracaoY of [0.75, 0.5, 0.25]) {
                const ponto = { x: area.left + area.width * fracaoX, y: area.top + area.height * fracaoY };
                const distancia = Math.hypot(fracaoX * canvas.width - x, fracaoY * canvas.height - y);
                if (distancia > 100 && document.elementFromPoint(ponto.x, ponto.y) === canvas) return ponto;
            }
        }
        throw new Error('Nenhum ponto livre do mapa para verificar o clique fora do fliperama.');
    }, antes.posicao);
    await page.mouse.click(pontoLivre.x, pontoLivre.y);
    await expect(painel).toBeVisible();
    await mapa.click({ position: {
        x: antes.posicao.x * caixa.width / 1200,
        y: antes.posicao.y * caixa.height / 700
    } });
    await expect(painel).toBeHidden();
    expect(await page.evaluate(() => ({
        explicacaoAtiva: explicacaoFliperamaAtiva,
        pausado: jogoPausado,
        minigame: minigameFliperamaAtivo || desafioDeTreinamentoAtivo?.origem === 'fliperama',
        tempoPreservado: fliperamaNoMapa === null
    }))).toEqual({ explicacaoAtiva: false, pausado: true, minigame: true, tempoPreservado: true });
});
