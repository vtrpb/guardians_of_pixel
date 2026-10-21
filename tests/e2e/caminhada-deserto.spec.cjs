const { test, expect } = require('@playwright/test');

test('Escorpião, Múmia e Faraó caminham na Fase 2 e param com a preferência desligada', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const dados = await page.evaluate(() => {
        faseSelecionada = 2;
        iniciarPartida(false);
        const tipos = ['escorpiao', 'mumia', 'bossDeserto'];
        for (const [indice, tipo] of tipos.entries()) {
            criarInimigo(tipo);
            const inimigo = inimigos.at(-1);
            inimigo.x = 240 + indice * 300;
            inimigo.y = 350;
            inimigo.distanciaDaPassada = 17;
        }
        jogoPausado = true;
        const quadros = [];
        const originais = {};
        for (const nome of ['desenharEscorpiao', 'desenharMumia', 'desenharFaraoDeAreia']) {
            originais[nome] = window[nome];
            window[nome] = (...args) => { quadros.push(args[3]); originais[nome](...args); };
        }
        desenharMapa();
        desenharInimigos();
        for (const [nome, original] of Object.entries(originais)) window[nome] = original;
        const antes = inimigos.map(inimigo => inimigo.distanciaDaPassada);
        moverInimigos(0);
        const congelados = inimigos.map(inimigo => inimigo.distanciaDaPassada);
        const visuais = [];
        for (let quadro = 0; quadro < CONFIG.animacaoDoVermelho.quadrosDaCaminhada; quadro++) {
            inimigos.forEach(inimigo => { inimigo.distanciaDaPassada = quadro * 8; });
            desenharMapa();
            desenharInimigos();
            visuais.push(canvas.toDataURL());
        }
        inimigos.forEach(inimigo => { inimigo.distanciaDaPassada = 17; });
        desenharMapa();
        desenharInimigos();
        return { quadros, antes, congelados, tipos: inimigos.map(inimigo => inimigo.tipo),
            jogoIniciado, fase: faseSelecionada, posesDistintas: new Set(visuais).size };
    });
    expect(dados).toEqual({ quadros: [2, 2, 2], antes: [17, 17, 17],
        congelados: [17, 17, 17], tipos: ['escorpiao', 'mumia', 'bossDeserto'],
        jogoIniciado: true, fase: 2, posesDistintas: 4 });
    for (let quadro = 0; quadro < 4; quadro++) {
        await page.evaluate(indice => {
            inimigos.forEach(inimigo => { inimigo.distanciaDaPassada = indice * 8; });
            desenharMapa();
            desenharInimigos();
        }, quadro);
        await page.locator('#game').screenshot({ path: `artifacts/caminhada-deserto-quadro-${quadro}.png` });
    }
    await page.locator('#game').screenshot({ path: 'artifacts/caminhada-deserto-animados.png' });
    const parado = await page.evaluate(() => {
        alternarAnimacaoDoVermelho(false);
        const quadros = [];
        const originais = {};
        for (const nome of ['desenharEscorpiao', 'desenharMumia', 'desenharFaraoDeAreia']) {
            originais[nome] = window[nome];
            window[nome] = (...args) => { quadros.push(args[3]); originais[nome](...args); };
        }
        desenharMapa();
        desenharInimigos();
        for (const [nome, original] of Object.entries(originais)) window[nome] = original;
        return quadros;
    });
    expect(parado).toEqual([null, null, null]);
    await page.locator('#game').screenshot({ path: 'artifacts/caminhada-deserto-parados.png' });
});
