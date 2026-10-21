const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
        localStorage.setItem('guardians-of-pixel-album-figurinhas-v1', JSON.stringify(
            ['macacoSaqueador', 'oncaDaSelva', 'gorilaDaSelva', 'bossSelva']));
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});

test('os quatro inimigos da selva caminham e param com a preferência desligada', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        faseSelecionada = 4;
        iniciarPartida(false);
        const tipos = ['macacoSaqueador', 'oncaDaSelva', 'gorilaDaSelva', 'bossSelva'];
        const nomes = ['desenharMacacoSaqueador', 'desenharOncaDaSelva',
            'desenharGorilaDaSelva', 'desenharColossoDaSelva'];
        for (const [indice, tipo] of tipos.entries()) {
            criarInimigo(tipo);
            const inimigo = inimigos.at(-1);
            inimigo.x = 170 + indice * 240;
            inimigo.y = 350;
            inimigo.distanciaDaPassada = 17;
        }
        jogoPausado = true;
        const quadros = [];
        const originais = {};
        for (const nome of nomes) {
            originais[nome] = window[nome];
            window[nome] = (...args) => {
                quadros.push(args[nome === 'desenharOncaDaSelva' ? 4 : 3]);
                originais[nome](...args);
            };
        }
        desenharMapa();
        desenharInimigos();
        for (const nome of nomes) window[nome] = originais[nome];
        moverInimigos(0);
        const congelados = inimigos.map(inimigo => inimigo.distanciaDaPassada);
        const poses = nomes.map((nome, indice) => {
            const tamanho = CONFIG.inimigo[tipos[indice]].tamanho * 2;
            const desenhos = [];
            for (let quadro = 0; quadro < 4; quadro++) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (nome === 'desenharOncaDaSelva') {
                    originais[nome](inimigos[indice], 100, 100, tamanho, quadro);
                } else {
                    originais[nome](100, 100, tamanho, quadro);
                }
                desenhos.push(canvas.toDataURL());
            }
            return new Set(desenhos).size;
        });
        alternarAnimacaoDoVermelho(false);
        const parados = [];
        for (const nome of nomes) {
            window[nome] = (...args) => {
                parados.push(args[nome === 'desenharOncaDaSelva' ? 4 : 3]);
                originais[nome](...args);
            };
        }
        desenharMapa();
        desenharInimigos();
        for (const nome of nomes) window[nome] = originais[nome];
        return { tipos: inimigos.map(inimigo => inimigo.tipo), quadros, congelados, poses, parados };
    });
    expect(resultado).toEqual({
        tipos: ['macacoSaqueador', 'oncaDaSelva', 'gorilaDaSelva', 'bossSelva'],
        quadros: [2, 2, 2, 2], congelados: [17, 17, 17, 17],
        poses: [4, 4, 4, 4], parados: [null, null, null, null]
    });
});

test('o Álbum inicia parado e reproduz a caminhada dos quatro', async ({ page }) => {
    await page.evaluate(() => {
        mostrarAlbum();
    });
    for (const tipo of ['macacoSaqueador', 'oncaDaSelva', 'gorilaDaSelva', 'bossSelva']) {
        await page.evaluate(id => abrirDetalhesDaFigurinhaDoAlbum('inimigo', id), tipo);
        const botao = page.locator('.album-ver-animacao');
        const miniatura = page.locator('.album-detalhes-miniatura');
        await expect(botao).toHaveText('Ver animação');
        const neutra = await miniatura.evaluate(elemento => elemento.toDataURL());
        await botao.click();
        await expect.poll(() => miniatura.evaluate(elemento => elemento.toDataURL())).not.toBe(neutra);
        await botao.click();
        expect(await miniatura.evaluate(elemento => elemento.toDataURL())).toBe(neutra);
        await page.locator('.album-detalhes-fechar').click();
    }
});
