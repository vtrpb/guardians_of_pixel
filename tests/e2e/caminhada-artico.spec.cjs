const { test, expect } = require('@playwright/test');

test('Lobo, Yeti e Titã caminham na Fase 3 e param ao desligar a animação', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const dados = await page.evaluate(() => {
        faseSelecionada = 3;
        iniciarPartida(false);
        const tipos = ['loboDeGelo', 'yeti', 'bossArtico'];
        for (const tipo of tipos) criarInimigo(tipo);
        moverInimigos(1);
        const deslocaram = inimigos.map(inimigo => inimigo.distanciaDaPassada > 0);
        inimigos.forEach((inimigo, indice) => {
            inimigo.x = 240 + indice * 300;
            inimigo.y = 350;
            inimigo.distanciaDaPassada = 17;
        });
        jogoPausado = true;
        const nomes = ['desenharLoboDeGelo', 'desenharYeti', 'desenharTitaGlacial'];
        const quadros = [];
        const originais = {};
        for (const nome of nomes) {
            originais[nome] = window[nome];
            window[nome] = (...args) => { quadros.push(args[3]); originais[nome](...args); };
        }
        desenharMapa();
        desenharInimigos();
        for (const nome of nomes) window[nome] = originais[nome];
        moverInimigos(0);
        const congelados = inimigos.map(inimigo => inimigo.distanciaDaPassada);
        const desenhos = tipos.map((tipo, indice) => {
            const funcao = originais[nomes[indice]];
            const tamanho = CONFIG.inimigo[tipo].tamanho * 2;
            const poses = [];
            for (let quadro = 0; quadro < 4; quadro++) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                funcao(100, 100, tamanho, quadro);
                poses.push(canvas.toDataURL());
            }
            return new Set(poses).size;
        });
        alternarAnimacaoDoVermelho(false);
        const parados = [];
        for (const nome of nomes) {
            window[nome] = (...args) => { parados.push(args[3]); originais[nome](...args); };
        }
        desenharMapa();
        desenharInimigos();
        for (const nome of nomes) window[nome] = originais[nome];
        return { fase: faseSelecionada, tipos: inimigos.map(inimigo => inimigo.tipo),
            deslocaram, quadros, congelados, desenhos, parados };
    });
    expect(dados).toEqual({ fase: 3, tipos: ['loboDeGelo', 'yeti', 'bossArtico'],
        deslocaram: [true, true, true], quadros: [2, 2, 2], congelados: [17, 17, 17],
        desenhos: [4, 4, 4], parados: [null, null, null] });
});

test('Álbum mostra os três parados e reproduz as caminhadas sob comando', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
        localStorage.setItem('guardians-of-pixel-album-figurinhas-v1',
            JSON.stringify(['loboDeGelo', 'yeti', 'bossArtico']));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(() => mostrarAlbum());
    for (const tipo of ['loboDeGelo', 'yeti', 'bossArtico']) {
        await page.evaluate(id => abrirDetalhesDaFigurinhaDoAlbum('inimigo', id), tipo);
        const botao = page.locator('.album-ver-animacao');
        const miniatura = page.locator('.album-detalhes-miniatura');
        await expect(botao).toHaveText('Ver animação');
        const poseNeutra = await miniatura.evaluate(elemento => elemento.toDataURL());
        await botao.click();
        await expect.poll(() => miniatura.evaluate(elemento => elemento.toDataURL())).not.toBe(poseNeutra);
        await botao.click();
        expect(await miniatura.evaluate(elemento => elemento.toDataURL())).toBe(poseNeutra);
        await page.locator('.album-detalhes-fechar').click();
    }
});
