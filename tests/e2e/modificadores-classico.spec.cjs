const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
});

test('Clássico: modificadores afetam a partida e anunciam o efeito', async ({ page }, info) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const antes = await page.evaluate(() => {
        mostrarApresentacaoClassico();
        prepararPartidaClassica(101);
        return {
            sorteado: mapaPersonalizadoAtivo.modificadorClassico,
            descricao: mapaPersonalizadoAtivo.descricao
        };
    });
    expect(Object.keys(await page.evaluate(() => CONFIG.classico.modificadores))).toContain(antes.sorteado);
    expect(antes.descricao).toContain(':' );

    const resultado = await page.evaluate(() => {
        mapaPersonalizadoAtivo.modificadorClassico = 'inflacao';
        confirmarSelecaoDeDefesas();
        definirJogoPausado(true);
        const anuncio = document.getElementById('anuncio-modificador-classico');
        const inflacao = {
            visivel: !anuncio.hidden,
            nome: document.getElementById('nome-modificador-classico').textContent,
            custo: obterCustoAtualDaPartida(100),
            melhoria: obterCustoDaMelhoriaEscolhida({ tipo: 'padrao', nivel: 0, melhoriasEscolhidas: {} })
        };
        criarTorreNaPartida('padrao', 250, 250);
        inflacao.dano = torres.at(-1).dano;
        inflacao.danoBase = obterConfiguracaoDaTorre('padrao').dano;

        mapaPersonalizadoAtivo.modificadorClassico = 'diaDeSorte';
        iniciarModificadorClassico();
        const sorteioDaMutacao = Math.random;
        Math.random = () => 1;
        try { criarInimigo('normal'); } finally { Math.random = sorteioDaMutacao; }
        const sorte = {
            vida: inimigos.at(-1).vida,
            vidaBase: CONFIG.inimigo.normal.vida,
            multiplicadorDaDificuldade: CONFIG.classico.dificuldades[mapaPersonalizadoAtivo.dificuldadeClassica].vida,
            nome: document.getElementById('nome-modificador-classico').textContent
        };

        mapaPersonalizadoAtivo.modificadorClassico = 'ventania';
        iniciarModificadorClassico();
        atualizarAtributosDaTorreComBonus(torres.at(-1));
        const inimigoDoDisparo = inimigos.at(-1);
        inimigoDoDisparo.x = torres.at(-1).x + 40;
        inimigoDoDisparo.y = torres.at(-1).y;
        const vidaAntesDoErro = inimigoDoDisparo.vida;
        const sorteioAnterior = Math.random;
        Math.random = () => 0;
        torres.at(-1).ultimoTiro = 0;
        atacarComTorres(Date.now());
        Math.random = sorteioAnterior;
        const tiro = tiros.at(-1);
        const vento = {
            nome: document.getElementById('nome-modificador-classico').textContent,
            custo: obterCustoAtualDaPartida(100),
            chance: obterModificadorClassicoAtivo().chanceDeErro,
            velocidade: obterModificadorClassicoAtivo().multiplicadorVelocidadeTiro,
            tiroErra: tiro?.erraPorVentania,
            velocidadeReal: tiro?.velocidade,
            velocidadeBase: torres.at(-1).velocidadeTiro
        };
        moverTiros(100);
        vento.vidaDepoisDoErro = inimigoDoDisparo.vida;
        vento.vidaAntesDoErro = vidaAntesDoErro;
        encerrarModificadorClassico();
        return { inflacao, sorte, vento, anuncioOculto: anuncio.hidden };
    });
    expect(resultado.inflacao).toMatchObject({ visivel: true, nome: 'Inflação', custo: 112 });
    expect(resultado.inflacao.melhoria).toBeGreaterThan(0);
    expect(resultado.inflacao.dano).toBe(Math.round(resultado.inflacao.danoBase * 1.1));
    expect(resultado.sorte).toMatchObject({ nome: 'Dia de sorte' });
    expect(resultado.sorte.vida).toBe(resultado.sorte.vidaBase * resultado.sorte.multiplicadorDaDificuldade * .85);
    expect(resultado.vento).toMatchObject({ nome: 'Ventania', custo: 100, chance: .1, velocidade: 1.25, tiroErra: true });
    expect(resultado.vento.velocidadeReal).toBe(resultado.vento.velocidadeBase * 1.25);
    expect(resultado.vento.vidaDepoisDoErro).toBe(resultado.vento.vidaAntesDoErro);
    expect(resultado.anuncioOculto).toBe(true);

    await page.evaluate(() => iniciarModificadorClassico());
    await expect(page.locator('#anuncio-modificador-classico')).toBeVisible();
    await page.waitForTimeout(700);
    await page.screenshot({ path: info.outputPath('ventania-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: info.outputPath('ventania-celular.png') });
    for (const modificador of ['inflacao', 'diaDeSorte']) {
        await page.evaluate(id => {
            mapaPersonalizadoAtivo.modificadorClassico = id;
            iniciarModificadorClassico();
        }, modificador);
        await page.waitForTimeout(1400);
        await page.screenshot({ path: info.outputPath(`${modificador}-celular.png`) });
    }
    const movimento = await page.evaluate(() => {
        const anuncio = document.getElementById('anuncio-modificador-classico');
        const resultado = {};
        for (const [modificador, seletor, propriedade] of [
            ['inflacao', '.ponto-inflacao', 'transform'],
            ['ventania', '.corpo-nuvem-ventania', 'fill'],
            ['diaDeSorte', '.trevo-sorte', 'transform']
        ]) {
            mapaPersonalizadoAtivo.modificadorClassico = modificador;
            iniciarModificadorClassico();
            const animacoes = anuncio.getAnimations({ subtree: true });
            const figura = anuncio.querySelector(seletor);
            animacoes.forEach(animacao => { animacao.currentTime = 600; });
            const inicio = getComputedStyle(figura)[propriedade];
            const posicaoInicial = figura.getBoundingClientRect();
            animacoes.forEach(animacao => { animacao.currentTime = 3900; });
            const posicaoFinal = figura.getBoundingClientRect();
            resultado[modificador] = {
                inicio,
                fim: getComputedStyle(figura)[propriedade],
                deslocamento: Math.hypot(posicaoFinal.x - posicaoInicial.x, posicaoFinal.y - posicaoInicial.y)
            };
        }
        return resultado;
    });
    for (const etapa of Object.values(movimento)) expect(etapa.fim).not.toBe(etapa.inicio);
    expect(movimento.inflacao.deslocamento).toBeGreaterThan(100);
    expect(movimento.diaDeSorte.deslocamento).toBeGreaterThan(100);
    await expect(page.locator('#anuncio-modificador-classico')).toBeHidden({ timeout: 6000 });
    await page.evaluate(() => iniciarModificadorClassico());
    await page.evaluate(() => voltarAoLobby());
    await expect(page.locator('#anuncio-modificador-classico')).toBeHidden();
    expect(erros).toEqual([]);
});
