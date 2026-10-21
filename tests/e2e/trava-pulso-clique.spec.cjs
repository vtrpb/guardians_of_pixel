const { test, expect } = require('@playwright/test');

test('Trava de Pulso aceita a posição verde mostrada no clique e no teclado', async ({ page }, info) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('.botao-lobby-treinamento').click();
    await page.locator('.treinamento-cartao[data-tipo="pulso"] button').click();
    await page.evaluate(() => {
        desafioDeTreinamentoAtivo.comecaEm = Date.now();
        atualizarMinigameDeTreinamento();
        encerrarTemporizadorDoCentroDeTreinamento();
    });
    await expect(page.locator('#controle-minigame-treinamento')).toBeEnabled();

    async function mostrarMarcadorNoCentro() {
        return page.evaluate(() => {
            const desafio = desafioDeTreinamentoAtivo;
            const centro = CONFIG.centroDeTreinamento.pulso.centrosDasFaixas[desafio.indiceDaFaixa];
            const agora = Date.now();
            desafio.iniciadoEm = agora - centro * CONFIG.centroDeTreinamento.pulso.duracaoDoPercurso / 2;
            atualizarInterfaceDoTreinamento(agora);
            return {
                centro,
                exibida: desafio.posicaoExibidaDoPulso,
                marcador: document.getElementById('marcador-pulso-treinamento').style.left
            };
        });
    }

    const primeiraFaixa = await mostrarMarcadorNoCentro();
    expect(Math.abs(primeiraFaixa.exibida - primeiraFaixa.centro)).toBeLessThan(0.01);
    expect(primeiraFaixa.marcador).toBe(String(primeiraFaixa.exibida * 100) + '%');
    await page.screenshot({ path: info.outputPath('pulso-faixa-verde.png') });
    await page.waitForTimeout(120);
    await page.locator('#controle-minigame-treinamento').click();
    await expect(page.locator('#pontos-minigame-treinamento')).toContainText('1/3');

    await mostrarMarcadorNoCentro();
    await page.waitForTimeout(120);
    await page.locator('#controle-minigame-treinamento').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#pontos-minigame-treinamento')).toContainText('2/3');

    await mostrarMarcadorNoCentro();
    await page.waitForTimeout(120);
    await page.locator('#controle-minigame-treinamento').click();
    await expect(page.locator('.treinamento-resultado[data-vitoria="true"]')).toBeVisible();
    expect(erros).toEqual([]);
});
