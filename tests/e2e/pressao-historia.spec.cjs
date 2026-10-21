const { test, expect } = require('@playwright/test');

test('pressão seletiva cresce da fase 4 em diante sem alcançar os outros modos', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    const faixas = await page.evaluate(() => {
        const fases = [1, 2, 3, 4, 7, 13, 18];
        const resultado = fases.map(fase => {
            faseSelecionada = fase;
            return { fase, waves: [9, 13, 17].filter(numero => obterPressaoDaHistoria(numero)) };
        });
        faseSelecionada = 7;
        modoWavesInfinitas = true;
        const infinito = obterPressaoDaHistoria(17);
        modoWavesInfinitas = false;
        mapaPersonalizadoAtivo = { classico: true };
        const classico = obterPressaoDaHistoria(17);
        mapaPersonalizadoAtivo = null;
        desafioSupremoAtivo = 'supremaCronarca';
        const suprema = obterPressaoDaHistoria(17);
        desafioSupremoAtivo = null;
        return { resultado, infinito, classico, suprema };
    });
    expect(faixas.resultado).toEqual([
        { fase: 1, waves: [] }, { fase: 2, waves: [] }, { fase: 3, waves: [] },
        { fase: 4, waves: [17] }, { fase: 7, waves: [13, 17] },
        { fase: 13, waves: [9, 13, 17] }, { fase: 18, waves: [9, 13, 17] }
    ]);
    expect(faixas.infinito).toBeNull();
    expect(faixas.classico).toBeNull();
    expect(faixas.suprema).toBeNull();

    const contagens = await page.evaluate(() => [
        { fase: 3, numero: 17 }, { fase: 4, numero: 17 },
        { fase: 7, numero: 13 }, { fase: 13, numero: 9 }, { fase: 15, numero: 17 }
    ].map(({ fase, numero }) => {
        faseSelecionada = fase;
        modoWavesInfinitas = true;
        wave = numero - 1;
        iniciarProximaWave();
        const totalOriginal = inimigosParaCriar;
        modoWavesInfinitas = false;
        wave = numero - 1;
        iniciarProximaWave();
        return { fase, extras: inimigosParaCriar - totalOriginal };
    }));
    expect(contagens).toEqual([
        { fase: 3, extras: 0 }, { fase: 4, extras: 1 },
        { fase: 7, extras: 3 }, { fase: 13, extras: 4 }, { fase: 15, extras: 0 }
    ]);

    const entrada = await page.evaluate(() => {
        faseSelecionada = 4;
        wave = 16;
        iniciarProximaWave();
        const rapidos = inimigosRapidosParaCriar;
        const elites = inimigosRoxosParaCriar;
        const tipos = [];
        for (let i = 0; i < 9; i++) {
            proximoInimigoEm = 0;
            atualizarWaves();
            tipos.push(inimigos.at(-1).tipo);
        }
        const intervalo = proximoInimigoEm - Date.now();
        return { rapidos, elites, tipos, intervalo };
    });
    expect(entrada.rapidos).toBeGreaterThan(0);
    expect(entrada.elites).toBeGreaterThan(0);
    expect(entrada.tipos).toContain('rapido');
    expect(entrada.tipos.some(tipo => tipo !== 'rapido')).toBe(true);
    expect(entrada.intervalo).toBeGreaterThan(500);
    expect(entrada.intervalo).toBeLessThanOrEqual(630);
    expect(erros).toEqual([]);
});

test('vida cresce 8% após a quinta wave apenas na História e no Clássico', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    const resultado = await page.evaluate(() => {
        faseSelecionada = 1;
        wave = 5;
        const historiaInicial = obterMultiplicadorDeVidaDosModosPrincipais('normal');
        wave = 6;
        criarInimigo('normal');
        const historia = inimigos.at(-1).vida / CONFIG.inimigo.normal.vida;
        const bossHistoria = obterMultiplicadorDeVidaDosModosPrincipais('boss');
        modoWavesInfinitas = true;
        const infinito = obterMultiplicadorDeVidaDosModosPrincipais('normal');
        modoWavesInfinitas = false;
        faseSelecionada = 19;
        const secreta = obterMultiplicadorDeVidaDosModosPrincipais('normal');

        prepararPartidaClassica(101);
        mapaPersonalizadoAtivo.modificadorClassico = 'ventania';
        wave = 5;
        const classicoInicial = obterMultiplicadorDeVidaDosModosPrincipais('normal');
        wave = 6;
        const sorteio = Math.random;
        Math.random = () => 1;
        try { criarInimigo('normal'); } finally { Math.random = sorteio; }
        const classico = inimigos.at(-1).vida / CONFIG.inimigo.normal.vida;
        const bossClassico = obterMultiplicadorDeVidaDosModosPrincipais('anciaoSakura');
        mapaPersonalizadoAtivo.classico = false;
        const editorOuEvento = obterMultiplicadorDeVidaDosModosPrincipais('normal');
        desafioSupremoAtivo = 'supremaCronarca';
        const suprema = obterMultiplicadorDeVidaDosModosPrincipais('normal');
        desafioSupremoAtivo = null;
        return { historiaInicial, historia, bossHistoria, infinito, secreta,
            classicoInicial, classico, bossClassico, editorOuEvento, suprema };
    });
    expect(resultado).toEqual({
        historiaInicial: 1, historia: 1.08, bossHistoria: 1, infinito: 1, secreta: 1,
        classicoInicial: 1, classico: 1.08, bossClassico: 1, editorOuEvento: 1, suprema: 1
    });
});
