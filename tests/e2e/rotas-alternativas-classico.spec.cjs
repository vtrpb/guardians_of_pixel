const { test, expect } = require('@playwright/test');

test('Rotas alternativas do Clássico mudam o caminho real da partida', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => mostrarApresentacaoClassico());
    await expect(page.locator('.classico-mapa[data-mapa="101"] .classico-rota')).toHaveCount(2);

    const resultado = await page.evaluate(() => [101, 108, 117].map(numero => {
        const mapa = CONFIG.classico.mapasExclusivos.find(item => item.numero === numero);
        selecionarMapaClassico(numero, 1);
        prepararPartidaClassica(numero);
        const caminhoDaPartida = obterCaminhosAtuais()[0];
        const pontoDaAlternativa = mapa.rotaAlternativa.caminho[1];
        const bloqueiaConstrucao = estaNoCaminho(pontoDaAlternativa.x, pontoDaAlternativa.y);
        desativarMapaPersonalizado();
        return {
            numero,
            rotaSelecionada: rotaClassicaSelecionada,
            igualAlternativa: JSON.stringify(caminhoDaPartida) === JSON.stringify(mapa.rotaAlternativa.caminho),
            bloqueiaConstrucao
        };
    }));

    expect(resultado).toEqual([101, 108, 117].map(numero => ({
        numero, rotaSelecionada: 1, igualAlternativa: true, bloqueiaConstrucao: true
    })));
    expect(erros).toEqual([]);
});

test('Todos os mapas do Clássico oferecem uma rota alternativa diferente', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        maiorFaseConcluida = 18;
        comprasDaLoja.add('boiaArpoes');
        return obterMapasClassicos().map(mapa => {
            const [principal, alternativa] = obterRotasDoMapaClassico(mapa);
            selecionarMapaClassico(mapa.numero, 1);
            prepararPartidaClassica(mapa.numero);
            const caminhosDaPartida = obterCaminhosAtuais();
            desativarMapaPersonalizado();
            return {
                numero: mapa.numero,
                possuiDuasRotas: Boolean(principal && alternativa),
                diferente: JSON.stringify(principal.caminhos) !== JSON.stringify(alternativa.caminhos),
                aplicada: JSON.stringify(caminhosDaPartida) === JSON.stringify(alternativa.caminhos),
                mesmaEntrada: principal.caminho[0].x === alternativa.caminho[0].x && principal.caminho[0].y === alternativa.caminho[0].y,
                mesmaSaida: principal.caminho.at(-1).x === alternativa.caminho.at(-1).x && principal.caminho.at(-1).y === alternativa.caminho.at(-1).y
            };
        });
    });
    expect(resultado).toHaveLength(35);
    expect(resultado.every(item => item.possuiDuasRotas && item.diferente && item.aplicada && item.mesmaEntrada && item.mesmaSaida)).toBe(true);
});

test('Rotas alternativas evitam decorações e ficam na água da Lagoa', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        maiorFaseConcluida = 18;
        comprasDaLoja.add('boiaArpoes');
        return obterMapasClassicos().map(mapa => {
            selecionarMapaClassico(mapa.numero, 1);
            prepararPartidaClassica(mapa.numero);
            const caminhos = obterCaminhosAtuais();
            const decoracoes = [
                ...obterDecoracoesBaseClassicas(mapa),
                ...obterDecoracoesExtrasClassicas(mapa)
            ];
            const rotaSegura = decoracoes.every(decoracao =>
                distanciaDosCaminhosClassicos(decoracao.x, decoracao.y, caminhos) >= CONFIG.decoracoesExtrasClassicas.distanciaCaminho
            );
            const dentroDaAgua = !mapa.agua || caminhos[0].every(ponto =>
                ponto.y >= mapa.agua.y + CONFIG.classico.margemDaRotaAlternativaNaAgua
                && ponto.y <= mapa.agua.y + mapa.agua.altura - CONFIG.classico.margemDaRotaAlternativaNaAgua
            );
            desativarMapaPersonalizado();
            return { numero: mapa.numero, rotaSegura, dentroDaAgua };
        });
    });
    expect(resultado.every(item => item.rotaSegura && item.dentroDaAgua)).toBe(true);
});
