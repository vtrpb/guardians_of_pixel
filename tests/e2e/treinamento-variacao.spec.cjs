const { test, expect } = require('@playwright/test');

test('treino varia Voo e Chuva e mede Voo por impulsos sem apagar o tempo antigo', async ({ page }, info) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        if (sessionStorage.getItem('treinamento-variacao-iniciado') !== 'true') {
            localStorage.setItem('guardians-of-pixel-centro-treinamento-v1', JSON.stringify({
                partidas: 1, vitorias: 1, tiposConcluidos: ['voo'], recordes: { voo: 8360 }
            }));
            sessionStorage.setItem('treinamento-variacao-iniciado', 'true');
        }
        window.requestAnimationFrame = () => 0;
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('.botao-lobby-treinamento').click();
    await expect(page.locator('.treinamento-cartao[data-tipo="voo"]')).toContainText('Ainda sem recorde');

    const primeira = await page.evaluate(() => {
        const sorteio = Math.random;
        Math.random = () => 0;
        iniciarMinigameFliperama('voo', true);
        const vaos = estadoVooPixel.portais.map(portal => portal.centroDoVao);
        impulsionarRoboDoVooPixel();
        impulsionarRoboDoVooPixel();
        Math.random = sorteio;
        return { vaos, impulsos: estadoVooPixel.impulsos };
    });
    expect(primeira.impulsos).toBe(2);
    expect(primeira.vaos.slice(1).every((vao, indice) =>
        vao !== primeira.vaos[indice] && Math.abs(vao - primeira.vaos[indice]) <= 135
    )).toBe(true);
    await page.evaluate(() => {
        estadoVooPixel.impulsos = 12;
        finalizarMinigameFliperama(true);
    });
    await expect(page.locator('.treinamento-resultado')).toContainText('12 impulsos');
    await page.screenshot({ path: info.outputPath('voo-recorde-impulsos.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.treinamento-resultado')).toBeVisible();
    await page.screenshot({ path: info.outputPath('voo-recorde-impulsos-celular.png') });
    await page.setViewportSize({ width: 1440, height: 1000 });
    const historicoAposVoo = await page.evaluate(() => JSON.parse(
        localStorage.getItem('guardians-of-pixel-centro-treinamento-v1')
    ));
    expect(historicoAposVoo.recordes.voo).toBe(8360);
    expect(historicoAposVoo.recordesPorImpulsos.voo).toBe(12);
    await page.locator('.treinamento-resultado button').filter({ hasText: 'Voltar' }).click();
    await expect(page.locator('.treinamento-cartao[data-tipo="voo"]')).toContainText('Menos impulsos: 12');

    const segunda = await page.evaluate(() => {
        const sorteio = Math.random;
        Math.random = () => 0.99;
        iniciarMinigameFliperama('voo', true);
        const vaos = estadoVooPixel.portais.map(portal => portal.centroDoVao);
        Math.random = sorteio;
        estadoVooPixel.impulsos = 9;
        finalizarMinigameFliperama(true);
        return vaos;
    });
    expect(segunda).not.toEqual(primeira.vaos);
    await expect(page.locator('.treinamento-resultado')).toContainText('NOVO RECORDE');
    await page.locator('.treinamento-resultado button').filter({ hasText: 'Voltar' }).click();
    await expect(page.locator('.treinamento-cartao[data-tipo="voo"]')).toContainText('Menos impulsos: 9');
    await page.evaluate(() => selecionarIdioma('en'));
    await expect(page.locator('.treinamento-cartao[data-tipo="voo"]')).toContainText('Fewest boosts: 9');
    await page.evaluate(() => selecionarIdioma('es'));
    await expect(page.locator('.treinamento-cartao[data-tipo="voo"]')).toContainText('Menos impulsos: 9');
    await page.evaluate(() => selecionarIdioma('pt-BR'));

    const chuvas = await page.evaluate(() => {
        function gerar(valor) {
            const sorteio = Math.random;
            Math.random = () => valor;
            iniciarMinigameFliperama('coleta', true);
            for (let indice = 0; indice < 6; indice++) criarPixelDaChuva();
            const pixels = estadoChuvaDePixels.pixels.map(({ x, corrompido }) => ({ x, corrompido }));
            abandonarMinigameDoFliperamaEmTreinamento();
            Math.random = sorteio;
            return pixels;
        }
        return [gerar(0), gerar(0.99)];
    });
    expect(chuvas[0]).not.toEqual(chuvas[1]);
    for (const chuva of chuvas) {
        expect(chuva.slice(1).every((pixel, indice) =>
            Math.abs(pixel.x - chuva[indice].x) <= 190
        )).toBe(true);
    }
    const padroesDaPartida = await page.evaluate(() => {
        minigameFliperamaEmTreinamento = false;
        iniciarEstadoDoVooPixel();
        const vaos = estadoVooPixel.portais.map(portal => portal.centroDoVao);
        iniciarEstadoDaChuvaDePixels();
        for (let indice = 0; indice < 5; indice++) criarPixelDaChuva();
        return {
            vaos,
            chuva: estadoChuvaDePixels.pixels.map(({ x, corrompido }) => ({ x, corrompido })),
            vaosOriginais: [...CONFIG.fliperama.minigame.voo.centrosDosVaos],
            chuvaOriginal: CONFIG.fliperama.minigame.coleta.posicoesDeSurgimento.slice(0, 5)
        };
    });
    expect(padroesDaPartida.vaos).toEqual(padroesDaPartida.vaosOriginais);
    expect(padroesDaPartida.chuva.map(pixel => pixel.x)).toEqual(padroesDaPartida.chuvaOriginal);
    expect(padroesDaPartida.chuva.map(pixel => pixel.corrompido)).toEqual([false, false, false, true, false]);
    await page.screenshot({ path: info.outputPath('centro-variado.png') });
    await page.reload();
    const salvo = await page.evaluate(() => JSON.parse(localStorage.getItem('guardians-of-pixel-centro-treinamento-v1')));
    expect(salvo.recordes.voo).toBe(8360);
    expect(salvo.recordesPorImpulsos.voo).toBe(9);
    expect(erros).toEqual([]);
});
