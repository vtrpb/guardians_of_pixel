const { test, expect } = require('@playwright/test');

test('Catapulta, Magnética e Metamorfa mudam de forma do nível 0 ao 5 no Álbum e na partida', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const resultado = await page.evaluate(() => {
        localStorage.setItem(CHAVE_VITORIAS_DOS_EVENTOS, JSON.stringify({
            idadeDaPedra: 1, superBossesMecanicos: 1, superBossesMetamorfos: 1
        }));
        mostrarAlbum();
        return Object.fromEntries(['catapulta', 'torreMagnetica', 'torreMetamorfa'].map(tipo => {
            const miniaturas = [...conteudoMenu.querySelectorAll(`.miniatura-torre-album[data-tipo-torre="${tipo}"]`)]
                .sort((a, b) => Number(a.dataset.nivelTorre) - Number(b.dataset.nivelTorre));
            const imagens = miniaturas.map(elemento => elemento.getContext('2d')
                .getImageData(0, 0, elemento.width, elemento.height).data);
            const diferencas = imagens.slice(1).map((imagem, indice) => {
                let pixels = 0;
                const anterior = imagens[indice];
                for (let posicao = 0; posicao < imagem.length; posicao += 4) {
                    if (imagem[posicao] !== anterior[posicao] || imagem[posicao + 1] !== anterior[posicao + 1]
                        || imagem[posicao + 2] !== anterior[posicao + 2]
                        || imagem[posicao + 3] !== anterior[posicao + 3]) pixels++;
                }
                return pixels;
            });
            const niveisDaPartida = Array.from({ length: 6 }, (_, nivel) =>
                obterEstiloDaTorre({ tipo, nivel }).nivelDoPremio || 0);
            return [tipo, { total: miniaturas.length, diferencas, niveisDaPartida }];
        }));
    });
    for (const dados of Object.values(resultado)) {
        expect(dados.total).toBe(6);
        expect(dados.niveisDaPartida).toEqual([0, 1, 2, 3, 4, 5]);
        expect(dados.diferencas.every(pixels => pixels > 100),
            `mudança visual pequena demais: ${dados.diferencas}`).toBe(true);
    }
});

test('Coral Abissal tem silhueta propria no Album e na torre equipada', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesAbissais', 'facil');
        concluirPartidaDeEvento();
        voltarAoLobbyDoResultado();
        mostrarAlbum();
        selecionarCategoriaDoAlbum('skins');
        const miniatura = conteudoMenu.querySelector('.miniatura-skin-album[data-id-skin="coralAbissal"]');
        const original = document.createElement('canvas');
        original.width = miniatura.width;
        original.height = miniatura.height;
        copiarDesenhoParaMiniaturaDoAlbum(original, tamanho =>
            desenharCorpoDaTorre(tamanho / 2, tamanho / 2 + 7,
                CONFIG.torre.tipos.torreTorpedos.visualBase));
        const pixelsOriginais = original.getContext('2d').getImageData(0, 0, original.width, original.height).data;
        const contarPixelsNovos = miniaturaDaSkin => {
            const pixelsDaSkin = miniaturaDaSkin.getContext('2d')
                .getImageData(0, 0, miniaturaDaSkin.width, miniaturaDaSkin.height).data;
            let total = 0;
            for (let posicao = 3; posicao < pixelsDaSkin.length; posicao += 4) {
                if (pixelsDaSkin[posicao] > 0 && pixelsOriginais[posicao] === 0) total++;
            }
            return total;
        };
        const pixelsDaSilhuetaNoAlbum = contarPixelsNovos(miniatura);
        alternarSkinPeloAlbum('coralAbissal');
        const torreEquipada = document.createElement('canvas');
        torreEquipada.width = miniatura.width;
        torreEquipada.height = miniatura.height;
        copiarDesenhoParaMiniaturaDoAlbum(torreEquipada, tamanho =>
            desenharCorpoDaTorre(tamanho / 2, tamanho / 2 + 7,
                obterEstiloDaTorre({ tipo: 'torreTorpedos', nivel: 3 })));
        return { pixelsDaSilhuetaNoAlbum, pixelsDaSilhuetaNaPartida: contarPixelsNovos(torreEquipada),
            skinDoAlbum: obterEstiloDaSkinDoAlbum('coralAbissal').skinDeEvento,
            skinNaPartida: obterEstiloDaTorre({ tipo: 'torreTorpedos', nivel: 3 }).skinDeEvento };
    });
    expect(resultado.skinDoAlbum).toBe('coralAbissal');
    expect(resultado.skinNaPartida).toBe('coralAbissal');
    expect(resultado.pixelsDaSilhuetaNoAlbum).toBeGreaterThan(30);
    expect(resultado.pixelsDaSilhuetaNaPartida).toBeGreaterThan(30);
});
