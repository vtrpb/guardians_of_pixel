const { test, expect } = require('@playwright/test');

test('Torre de Bolhas: compra, água e estouro no terceiro acerto', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    await page.evaluate(() => { fragmentosPixel = 100; mostrarLoja(); });
    const item = page.locator('[data-id-item-loja="torreDeBolhas"]');
    await expect(item.locator('xpath=ancestor::article')).toContainText('Torre de Bolhas');
    await expect(item).toContainText('60');
    await item.click();
    await page.locator('#botao-confirmar-compra-loja').click();
    expect(await page.evaluate(() => torreEstaDesbloqueada('torreDeBolhas'))).toBe(true);
    await page.evaluate(() => { mostrarAlbum(); selecionarCategoriaDoAlbum('torres'); });
    await expect(page.locator('#conteudo-menu [data-tipo-torre="torreDeBolhas"]').first()).toBeVisible();

    await page.evaluate(() => { fecharConteudoMenu(); mostrarApresentacaoClassico(); prepararPartidaClassica(103); });
    await page.evaluate(() => {
        if (!selecaoDeDefesasEmEdicao.has('torreDeBolhas')) alternarDefesaDaSelecao('torreDeBolhas');
    });
    await expect(page.locator('[data-tipo-defesa="torreDeBolhas"]')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('.botao-confirmar-selecao-defesas').click();
    await page.evaluate(() => { definirJogoPausado(true); dinheiro = 5000; atualizarBotoesDeConstrucao(); });
    await page.locator('#botao-torre-de-bolhas').click();
    const mapa = page.locator('#game');
    const caixa = await mapa.boundingBox();
    const clicar = (x, y) => mapa.click({ position: { x: x * caixa.width / 1200, y: y * caixa.height / 700 } });
    await clicar(350, 70);
    expect(await page.evaluate(() => torres.length)).toBe(0);
    await clicar(350, 300);
    expect(await page.evaluate(() => torres.map(torre => torre.tipo))).toEqual(['torreDeBolhas']);

    const combate = await page.evaluate(() => {
        criarInimigo('normal');
        const alvo = inimigos.at(-1);
        Object.assign(alvo, { x: 395, y: 300 });
        const acertos = [];
        for (let indice = 0; indice < 2; indice++) {
            atacarComTorres(Date.now() + 1000 * (indice + 1));
            moverTiros(100);
            acertos.push(alvo.acertosDeBolha);
        }
        criarInimigo('normal');
        const vizinho = inimigos.at(-1);
        Object.assign(vizinho, { x: 418, y: 300 });
        const vidaDoVizinho = vizinho.vida;
        atacarComTorres(Date.now() + 3000);
        moverTiros(100);
        return { acertos, aposEstouro: alvo.acertosDeBolha, danoNoVizinho: vidaDoVizinho - vizinho.vida,
            visual: explosoesDosExplosivos.some(explosao => explosao.tipoVisual === 'bolhas') };
    });
    expect(combate).toEqual({ acertos: [1, 2], aposEstouro: 0, danoNoVizinho: 52, visual: true });

    const estouroMelhorado = await page.evaluate(() => {
        const torre = torres[0];
        torre.nivel = 1;
        torre.melhoriasEscolhidas = { dano: 1, velocidade: 0, alcance: 0 };
        atualizarAtributosDaTorreComBonus(torre);
        inimigos = [];
        criarInimigo('normal');
        const alvo = inimigos.at(-1);
        Object.assign(alvo, { x: 395, y: 300, vida: 200, vidaMaxima: 200 });
        criarInimigo('normal');
        const vizinho = inimigos.at(-1);
        Object.assign(vizinho, { x: 418, y: 300, vida: 200, vidaMaxima: 200 });
        const tiro = { alvo, dano: torre.dano, tipoDaTorre: torre.tipo, torreOrigem: torre,
            efeitoDeBolhas: CONFIG.torre.tipos.torreDeBolhas.efeitoDeBolhas };
        for (let indice = 0; indice < 3; indice++) aplicarBolhaDePressao(tiro, Date.now() + indice);
        return { dano: 200 - vizinho.vida, esperado: Math.round(52 * torre.dano / 13) };
    });
    expect(estouroMelhorado.dano).toBe(estouroMelhorado.esperado);

    const niveis = await page.evaluate(() => {
        const torre = torres[0];
        return [0, 1, 2, 3, 4, 5].map(nivel => {
            torre.nivel = nivel;
            const estilo = obterEstiloDaTorre(torre);
            return Math.max(estilo.nivelVisual || 0, estilo.nivelEvolucaoVisual || 0);
        });
    });
    expect(niveis).toEqual([0, 1, 2, 3, 4, 5]);
    const visuais = await page.evaluate(() => {
        const torre = torres[0];
        return [0, 1, 2, 3, 4, 5].map(nivel => {
            torre.nivel = nivel;
            const miniatura = document.createElement('canvas');
            miniatura.width = 100;
            miniatura.height = 100;
            const contexto = miniatura.getContext('2d');
            contexto.translate(50, 70);
            desenharArmamentoDaTorreDeBolhas(contexto, obterEstiloDaTorre(torre));
            return miniatura.toDataURL();
        });
    });
    expect(new Set(visuais).size).toBe(6);
    expect(erros).toEqual([]);
});
