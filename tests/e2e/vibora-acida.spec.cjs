const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.waitForFunction(() => typeof jogarEvento === 'function');
});

test('Víbora cospe ácido e deixa a carcaça parada no caminho', async ({ page }) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesAcidos', 'medio');
        wave = 20;
        criarInimigo('viboraAcida');
        const chefe = inimigos.at(-1);
        chefe.x = 400;
        chefe.y = 130;
        chefe.alvo = 4;
        chefe.proximoAtaqueDeEventoEm = 0;
        chefe.proximoAtaqueSecundarioEm = 999999;
        const torre = criarTorreNaPartida('padrao', 455, 130);
        torre.tirosRecebidos = obterResistenciaDaTorre(torre) - 3;
        tempoDoEventoMs = 1000;
        atualizarAtaquesDosSuperBosses();
        const avisado = cuspesAcidosDoEvento.length === 1 && torres.includes(torre);
        tempoDoEventoMs += CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesAcidos.tempoDoCuspeMs;
        atualizarAtaquesDosSuperBosses();
        const derreteu = !torres.includes(torre) && torresDerretendoDoEvento.length === 1;
        const sobreposicaoComChefe = Math.hypot(torre.x - chefe.x, torre.y - chefe.y)
            <= chefe.tamanho + 28;
        chefe.proximoAtaqueDeEventoEm = 999999;
        chefe.proximoAtaqueSecundarioEm = 0;
        atualizarAtaquesDosSuperBosses();
        const carcaca = inimigos.find(inimigo => inimigo.carcacaDaVibora);
        const noCaminho = carcaca?.x === chefe.x && carcaca?.y === chefe.y
            && carcaca.velocidade === 0 && carcaca.alvo === chefe.alvo;
        const acelerou = obterMultiplicadorDaTrocaDePele(chefe);
        aplicarDanoAoInimigo(carcaca, carcaca.vida);
        const desacelerou = obterMultiplicadorDaTrocaDePele(chefe);
        jogoPausado = true;
        return { avisado, derreteu, sobreposicaoComChefe, noCaminho, acelerou, desacelerou,
            vida: chefe.vida,
            ondas: mapaPersonalizadoAtivo.waves.length,
            figurinhaDaCarcaca: obterIdDoEventoDoInimigo('carcacaDaVibora') };
    });
    expect(resultado).toEqual({ avisado: true, derreteu: true, sobreposicaoComChefe: true, noCaminho: true,
        acelerou: 1.3, desacelerou: 1, vida: 37000,
        ondas: 20, figurinhaDaCarcaca: null });
    for (const [nome, avanco] of [['inicio', 0], ['meio', 300], ['final', 600], ['poca', 850]]) {
        await page.evaluate((tempo) => {
            jogoPausado = true;
            tempoDoEventoMs = torresDerretendoDoEvento[0].inicio + tempo;
            desenharMapa();
            desenharInimigos('grandes');
            desenharTorres();
            desenharInimigos('pequenos');
            desenharBarrasDosInimigosGrandes();
            desenharMecanicaDoEvento();
        }, avanco);
        await page.locator('#game').screenshot({ path: `artifacts/eventos-superbosses/vibora-derretimento-v2-${nome}.png` });
    }
});

test('a primeira wave da arena ácida entra pelo fluxo normal', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.evaluate(() => {
        jogarEvento('superBossesAcidos');
        proximaWaveEm = Date.now() - 1;
    });
    await expect.poll(() => page.evaluate(() => wave)).toBeGreaterThanOrEqual(1);
    await expect.poll(() => page.evaluate(() => inimigos.some(inimigo => inimigo.tipo === 'gotaCorrosiva')
        || inimigosParaCriar > 0)).toBe(true);
    expect(erros).toEqual([]);
});

test('outros inimigos grandes ficam atrás das torres e conservam a barra visível', async ({ page }) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const ordem = await page.evaluate(() => {
        jogarEvento('superBossesAcidos', 'medio');
        criarInimigo('titaDaForja');
        criarInimigo('normal');
        const tita = inimigos.find(inimigo => inimigo.tipo === 'titaDaForja');
        const vermelho = inimigos.find(inimigo => inimigo.tipo === 'normal');
        tita.x = 400; tita.y = 130;
        vermelho.x = 500; vermelho.y = 130;
        criarTorreNaPartida('padrao', 400, 130);
        const eventos = [];
        const corpoOriginal = desenharCorpoDoInimigo;
        const torreOriginal = desenharCorpoDaTorre;
        const barraOriginal = desenharBarraDeVidaDoInimigo;
        desenharCorpoDoInimigo = (inimigo, ...args) => {
            eventos.push(inimigo.tipo);
            corpoOriginal(inimigo, ...args);
        };
        desenharCorpoDaTorre = (...args) => {
            eventos.push('torre');
            torreOriginal(...args);
        };
        desenharBarraDeVidaDoInimigo = inimigo => {
            eventos.push(`barra:${inimigo.tipo}`);
            barraOriginal(inimigo);
        };
        try {
            jogoPausado = true;
            desenharMapa();
            desenharInimigos('grandes');
            desenharTorres();
            desenharInimigos('pequenos');
            desenharBarrasDosInimigosGrandes();
        } finally {
            desenharCorpoDoInimigo = corpoOriginal;
            desenharCorpoDaTorre = torreOriginal;
            desenharBarraDeVidaDoInimigo = barraOriginal;
        }
        return eventos;
    });
    expect(ordem).toEqual(['titaDaForja', 'torre', 'normal', 'barra:normal', 'barra:titaDaForja']);
    await page.locator('#game').screenshot({ path: 'artifacts/eventos-superbosses/camada-tita-da-forja.png' });
});
