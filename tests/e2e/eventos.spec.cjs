const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.waitForFunction(() => typeof mostrarEventos === 'function' && typeof jogarEvento === 'function');
});

test('nove eventos aparecem juntos e mantêm a tradução nos três idiomas', async ({ page }) => {
    await expect(page.locator('#botao-jogar-menu-inicial')).toBeVisible();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('#botao-eventos').click();
    await expect(page.locator('.cartao-evento')).toHaveCount(9);
    await expect(page.locator('.grupo-eventos').first().locator('.cartao-evento')).toHaveCount(4);
    await expect(page.locator('.grupo-eventos-superbosses .cartao-evento')).toHaveCount(5);
    await expect(page.locator('.grupo-eventos-superbosses > h3')).toHaveText('Superbosses');
    await expect(page.locator('.grupo-eventos-superbosses .cartao-evento h3')).toHaveText([
        'Superboss: Soberano Infernal', 'Superboss: Titã da Forja', 'Superboss: Leviatã Abissal', 'Superboss: Víbora Ácida', 'Superboss: Metamorfo'
    ]);
    const cores = await page.locator('.cartao-evento').evaluateAll(cartoes => cartoes.map(cartao => getComputedStyle(cartao).backgroundColor));
    expect(new Set(cores).size).toBe(9);
    await expect(page.locator('.cartao-evento').first()).toContainText('Caixa Surpresa');
    await expect(page.locator('#botao-eventos small')).toHaveText('Nove desafios para testar');
    await page.evaluate(() => selecionarIdioma('en'));
    await expect(page.locator('#botao-eventos small')).toHaveText('Nine challenges to test');
    await expect(page.locator('.cartao-evento').first()).toContainText('Surprise Boxes');
    for (const id of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais', 'superBossesAcidos', 'superBossesMetamorfos']) {
        await expect(page.locator(`.cartao-evento[data-evento="${id}"]`))
            .toContainText('700 credits in wave 1; +75 per wave');
    }
    await expect(page.locator('.grupo-eventos-superbosses .cartao-evento h3')).toHaveText([
        'Superboss: Infernal Sovereign', 'Superboss: Forge Titan', 'Superboss: Abyssal Leviathan', 'Superboss: Acid Viper', 'Superboss: Shapeshifter'
    ]);
    await page.evaluate(() => selecionarIdioma('es'));
    await expect(page.locator('#botao-eventos small')).toHaveText('Nueve desafíos para probar');
    await expect(page.locator('.cartao-evento').first()).toContainText('Cajas Sorpresa');
    for (const id of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais', 'superBossesAcidos', 'superBossesMetamorfos']) {
        await expect(page.locator(`.cartao-evento[data-evento="${id}"]`))
            .toContainText('700 créditos en la oleada 1; +75 por oleada');
    }
    await expect(page.locator('.grupo-eventos-superbosses > h3')).toHaveText('Superjefes');
    await expect(page.locator('.grupo-eventos-superbosses .cartao-evento h3')).toHaveText([
        'Superjefe: Soberano Infernal', 'Superjefe: Titán de la Forja', 'Superjefe: Leviatán Abisal', 'Superjefe: Víbora Ácida', 'Superjefe: Metamorfo'
    ]);
    await page.screenshot({ path: 'artifacts/eventos-superbosses/menu.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('.cartao-evento[data-evento="superBossesMetamorfos"]')).toBeVisible();
    await page.screenshot({ path: 'artifacts/eventos-superbosses/metamorfo-menu-celular.png', fullPage: true });
    await page.locator('.cartao-evento[data-evento="superBossesMetamorfos"]').screenshot({
        path: 'artifacts/eventos-superbosses/metamorfo-cartao-celular.png'
    });
});

test('eventos comuns oferecem três modos, atualizam o prêmio e aplicam a dificuldade escolhida', async ({ page }) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.locator('#botao-eventos').click();
    await expect(page.locator('.grupo-eventos').first().locator('.seletor-dificuldade-evento')).toHaveCount(4);
    await expect(page.locator('.grupo-eventos-superbosses .seletor-dificuldade-evento')).toHaveCount(5);
    const seletores = page.locator('.grupo-eventos').first().locator('.seletor-dificuldade-evento');
    for (const seletor of await seletores.all()) {
        await expect(seletor.locator('option')).toHaveText(['Fácil', 'Médio', 'Difícil']);
        await expect(seletor).toHaveValue('facil');
        await seletor.selectOption('medio');
        await expect(seletor.locator('..').locator('[data-fragmentos-evento]')).toHaveText(['14', '14']);
        await seletor.selectOption('dificil');
        await expect(seletor.locator('..').locator('[data-fragmentos-evento]')).toHaveText(['16', '16']);
    }
    for (const seletor of await page.locator('.grupo-eventos-superbosses .seletor-dificuldade-evento').all()) {
        await expect(seletor.locator('option')).toHaveText(['Fácil', 'Médio', 'Difícil']);
        await expect(seletor.locator('..').locator('[data-fragmentos-evento]')).toHaveText(['25', '25']);
        await seletor.selectOption('medio');
        await expect(seletor.locator('..').locator('[data-fragmentos-evento]')).toHaveText(['30', '30']);
        await seletor.selectOption('dificil');
        await expect(seletor.locator('..').locator('[data-fragmentos-evento]')).toHaveText(['35', '35']);
    }

    const modos = await page.evaluate(() => {
        const saida = [];
        for (const dificuldade of ['facil', 'medio', 'dificil']) {
            jogarEvento('caixaSurpresa', dificuldade);
            wave = 3;
            const inimigo = { tipo: CONFIG.eventos.elencosNormais.caixaSurpresa.comuns[0], vida: 100,
                vidaMaxima: 100, velocidade: 1 };
            ajustarInimigoDoEvento(inimigo);
            const antes = fragmentosPixel;
            const dados = {
                dificuldade: mapaPersonalizadoAtivo.dificuldadeEvento,
                wave5: mapaPersonalizadoAtivo.waves[4].grupos[0].quantidade,
                vida: inimigo.vida, velocidade: inimigo.velocidade,
                intervaloChefe: obterIntervaloDaAcaoDoChefe('caixaSurpresa')
            };
            concluirPartidaDeEvento();
            dados.fragmentos = fragmentosPixel - antes;
            saida.push(dados);
            voltarAoLobby();
        }
        return saida;
    });
    expect(modos.map(modo => modo.dificuldade)).toEqual(['facil', 'medio', 'dificil']);
    expect(modos.map(modo => modo.wave5)).toEqual([7, 8, 9]);
    expect(modos.map(modo => modo.vida)).toEqual([140, 157, 175]);
    expect(modos.map(modo => modo.fragmentos)).toEqual([12, 14, 16]);
    expect(modos.map(modo => modo.intervaloChefe)).toEqual([8000, 6800, 5600]);
    expect(modos[0].velocidade).toBeCloseTo(1.1);
    expect(modos[1].velocidade).toBeCloseTo(1.155);
    expect(modos[2].velocidade).toBeCloseTo(1.21);
});

test('Superbosses preservam Fácil e escalam waves, chefe, ataque e prêmio nos modos maiores', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const resultado = [];
        for (const dificuldade of ['facil', 'medio', 'dificil']) {
            jogarEvento('superBosses', dificuldade);
            const mapa = mapaPersonalizadoAtivo;
            const tipo = CONFIG.eventos.elencosSuperBosses.superBosses.chefes.at(-1);
            const inimigo = { tipo, vida: 100, vidaMaxima: 100, velocidade: 1 };
            ajustarInimigoDoEvento(inimigo);
            const antes = fragmentosPixel;
            const dadosDoModo = {
                dificuldade: mapa.dificuldadeEvento,
                limiteDeTorres: mapa.limiteDeTorres,
                comunsWave5: mapa.waves[4].grupos[0].quantidade,
                resistentesWave20: mapa.waves[19].grupos[1].quantidade,
                subordinadoWave5: mapa.waves[4].grupos.at(-1).tipo,
                chefeWave20: mapa.waves[19].grupos.at(-1).tipo,
                vidaChefe: inimigo.vida,
                velocidadeChefe: inimigo.velocidade,
                intervaloAtaque: inimigo.proximoAtaqueDeEventoEm - tempoDoEventoMs
            };
            concluirPartidaDeEvento();
            dadosDoModo.fragmentos = fragmentosPixel - antes;
            resultado.push(dadosDoModo);
            voltarAoLobby();
        }
        return resultado;
    });
    expect(dados.map(item => item.dificuldade)).toEqual(['facil', 'medio', 'dificil']);
    expect(dados.map(item => item.limiteDeTorres)).toEqual([12, 8, 7]);
    expect(dados.map(item => item.comunsWave5)).toEqual([7, 10, 11]);
    expect(dados.map(item => item.resistentesWave20)).toEqual([6, 12, 18]);
    expect(dados.map(item => item.subordinadoWave5)).toEqual(Array(3).fill('duqueDasBrasas'));
    expect(dados.map(item => item.chefeWave20)).toEqual(Array(3).fill('soberanoInfernal'));
    expect(dados.map(item => item.vidaChefe)).toEqual([300, 35000, 40000]);
    expect(dados.map(item => item.intervaloAtaque)).toEqual([5500, 4950, 4400]);
    expect(dados.map(item => item.fragmentos)).toEqual([25, 30, 35]);
    expect(dados.map(item => item.velocidadeChefe)).toEqual([1, 1.15, 1.25]);
});

test('os três Superbosses recebem as vidas finais combinadas', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const resultado = {};
        for (const [id, tipo] of [
            ['superBosses', 'soberanoInfernal'],
            ['superBossesMecanicos', 'titaDaForja'],
            ['superBossesAbissais', 'leviataAbissal']
        ]) {
            resultado[id] = [];
            for (const dificuldade of ['facil', 'medio', 'dificil']) {
                jogarEvento(id, dificuldade);
                wave = 20;
                criarInimigo(tipo);
                resultado[id].push(inimigos.at(-1).vidaMaxima);
                voltarAoLobby();
            }
        }
        return resultado;
    });
    expect(dados).toEqual({
        superBosses: [23250, 35000, 40000],
        superBossesMecanicos: [24150, 36500, 41500],
        superBossesAbissais: [25050, 38000, 43500]
    });
});

test('aviso nomeia subordinados sem cobrir a tela com alarme', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('superBosses');
        const textos = [];
        const coberturasDeTela = [];
        const escreverOriginal = ctx.fillText;
        const preencherOriginal = ctx.fillRect;
        ctx.fillText = function(texto, ...args) { textos.push(texto); return escreverOriginal.call(this, texto, ...args); };
        ctx.fillRect = function(x, y, largura, altura) {
            if (x === 0 && y === 0 && largura === canvas.width && altura === canvas.height) {
                coberturasDeTela.push(wave);
            }
            return preencherOriginal.call(this, x, y, largura, altura);
        };
        const avisos = [];
        for (const numeroDaWave of [5, 10, 15, 20]) {
            wave = numeroDaWave;
            avisoBossExpiraEm = Date.now() + 2100;
            textos.length = 0;
            desenharAvisoBoss();
            avisos.push(textos.at(-1));
        }
        avisoBossExpiraEm = Date.now() - 1;
        textos.length = 0;
        desenharAvisoBoss();
        ctx.fillText = escreverOriginal;
        ctx.fillRect = preencherOriginal;
        const semAvisoAposExpirar = textos.length === 0;
        voltarAoLobby();
        return { avisos, coberturasDeTela, semAvisoAposExpirar };
    });
    expect(dados).toEqual({
        avisos: ['SUBORDINADO 1', 'SUBORDINADO 2', 'SUBORDINADO 3', 'SUPERBOSS'],
        coberturasDeTela: [],
        semAvisoAposExpirar: true
    });
});

test('Forja e Abismo recebem a mesma pressão no Médio e no Difícil', async ({ page }) => {
    const mapas = await page.evaluate(() => {
        const resultado = [];
        for (const id of ['superBossesMecanicos', 'superBossesAbissais']) {
            for (const dificuldade of ['medio', 'dificil']) {
                jogarEvento(id, dificuldade);
                resultado.push({ id, dificuldade,
                    limite: mapaPersonalizadoAtivo.limiteDeTorres,
                    primeiroGrupo: mapaPersonalizadoAtivo.waves[19].grupos[0].quantidade,
                    segundoGrupo: mapaPersonalizadoAtivo.waves[19].grupos[1].quantidade,
                    chefe: mapaPersonalizadoAtivo.waves[19].grupos.at(-1).tipo });
                voltarAoLobby();
            }
        }
        return resultado;
    });
    expect(mapas).toEqual([
        { id: 'superBossesMecanicos', dificuldade: 'medio', limite: 8,
            primeiroGrupo: 34, segundoGrupo: 12, chefe: 'titaDaForja' },
        { id: 'superBossesMecanicos', dificuldade: 'dificil', limite: 7,
            primeiroGrupo: 38, segundoGrupo: 18, chefe: 'titaDaForja' },
        { id: 'superBossesAbissais', dificuldade: 'medio', limite: 8,
            primeiroGrupo: 34, segundoGrupo: 12, chefe: 'leviataAbissal' },
        { id: 'superBossesAbissais', dificuldade: 'dificil', limite: 7,
            primeiroGrupo: 38, segundoGrupo: 18, chefe: 'leviataAbissal' }
    ]);
});

test('Obliterador custa 750 e Prismático mantém o ajuste na compra real', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesMecanicos');
        maiorFaseConcluida = 5;
        comprasDaLoja.add('canhaoPrismatico');
        defesasSelecionadasParaPartida.add('obliterador');
        defesasSelecionadasParaPartida.add('canhaoPrismatico');
        const custos = {};
        for (const tipo of ['obliterador', 'canhaoPrismatico']) {
            dinheiro = 20000;
            tipoDeTorreParaConstruir = tipo;
            const posicao = escolherPosicaoLivreDoEvento(tipo);
            const area = canvas.getBoundingClientRect();
            canvas.dispatchEvent(new MouseEvent('click', { bubbles: true,
                clientX: area.left + posicao.x * area.width / canvas.width,
                clientY: area.top + posicao.y * area.height / canvas.height }));
            const torre = torres.at(-1);
            const saldos = [dinheiro];
            torreSelecionada = torre;
            for (let nivel = 0; nivel < 5; nivel++) {
                melhorarTorreSelecionada('dano');
                saldos.push(dinheiro);
            }
            custos[tipo] = { tipoConstruido: torre.tipo, nivel: torre.nivel,
                valorInvestido: torre.valorInvestido, saldos };
        }
        return custos;
    });
    expect(resultado.obliterador).toEqual({ tipoConstruido: 'obliterador', nivel: 5,
        valorInvestido: 11160, saldos: [19250, 18920, 18270, 16970, 13720, 8840] });
    expect(resultado.canhaoPrismatico).toEqual({ tipoConstruido: 'canhaoPrismatico', nivel: 5,
        valorInvestido: 8850, saldos: [19400, 19150, 18650, 17650, 15150, 11150] });
});

test('Obliterador alcança o nível 5 com o teto de créditos da História', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesMecanicos');
        mapaPersonalizadoAtivo = null;
        const torre = { tipo: 'obliterador', x: 300, y: 300, nivel: 4,
            melhoriasEscolhidas: { dano: 4, velocidade: 0, alcance: 0 },
            valorInvestido: 6280 };
        atualizarAtributosDaTorreComBonus(torre);
        torres.push(torre);
        torreSelecionada = torre;
        dinheiro = CONFIG.economia.tetoDeSaldoDasPartidasComuns;
        const custo = obterCustoDaMelhoriaEscolhida(torre);
        comprarMelhoriaEscolhida('dano');
        return { custo, nivel: torre.nivel, saldo: dinheiro,
            teto: CONFIG.economia.tetoDeSaldoDasPartidasComuns,
            prismático: obterCustoDaMelhoriaEscolhida({ tipo: 'canhaoPrismatico', nivel: 4,
                melhoriasEscolhidas: { dano: 4, velocidade: 0, alcance: 0 } }) };
    });
    expect(resultado).toEqual({ custo: 4880, nivel: 5, saldo: 120, teto: 5000,
        prismático: 4000 });
});

test('fases normais limitam o saldo a 5000 em qualquer wave', async ({ page }) => {
    const dados = await page.evaluate(() => {
        mapaPersonalizadoAtivo = null;
        desafioSupremoAtivo = null;
        dinheiro = 0;
        wave = 1;
        creditosDeCombateRecebidosNaWave = 0;
        const primeiraWave = Array.from({ length: 300 }, () => registrarCreditosPorDisparo())
            .reduce((total, premio) => total + premio, 0);
        const geradorNoTeto = concederCreditosNaPartida(100);
        dinheiro -= 1000;
        const depoisDeGastar = registrarCreditosPorDisparo();
        wave = 11;
        creditosDeCombateRecebidosNaWave = 0;
        const waveSeguinte = Array.from({ length: 300 }, () => registrarCreditosPorDisparo())
            .reduce((total, premio) => total + premio, 0);
        modoWavesInfinitas = true;
        wave = 25;
        dinheiro -= 200;
        const infinito = concederCreditosNaPartida(1000);
        return { primeiraWave, geradorNoTeto, depoisDeGastar, waveSeguinte,
            infinito, saldo: dinheiro, contador: creditosDeCombateRecebidosNaWave };
    });
    expect(dados).toEqual({ primeiraWave: 5000, geradorNoTeto: 0,
        depoisDeGastar: 20, waveSeguinte: 980, infinito: 200, saldo: 5000, contador: 0 });
});

test('Clássico, Editor e eventos normais têm teto de 5000; Superbosses preservam a economia', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const resultados = [];
        desafioSupremoAtivo = null;
        for (const mapa of [{ classico: true }, { creditosIniciais: 500 },
            { evento: 'caixaSurpresa' }, { evento: 'roleta' },
            { evento: 'meteoros' }, { evento: 'idadeDaPedra' }]) {
            mapaPersonalizadoAtivo = mapa;
            dinheiro = 4980;
            const recebido = concederCreditosDeCombate(100);
            const noTeto = concederCreditosNaPartida(100);
            dinheiro -= 50;
            const aposGastar = concederCreditosNaPartida(100);
            resultados.push({ recebido, noTeto, aposGastar, saldo: dinheiro });
        }
        const superbosses = Object.keys(CONFIG.eventos.elencosSuperBosses).map((evento) => {
            mapaPersonalizadoAtivo = { evento };
            dinheiro = 5000;
            return { evento, recebido: concederCreditosNaPartida(100), saldo: dinheiro };
        });
        return { resultados, superbosses };
    });
    for (const resultado of dados.resultados) {
        expect(resultado).toEqual({ recebido: 20, noTeto: 0, aposGastar: 50, saldo: 5000 });
    }
    expect(dados.superbosses).toHaveLength(5);
    for (const superboss of dados.superbosses) {
        expect(superboss).toMatchObject({ recebido: 100, saldo: 5100 });
    }
});

test('prêmio em créditos da Roleta respeita o teto e mostra o valor recebido', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('roleta');
        abrirRoletaDoEvento();
        dinheiro = 5000;
        const sorteio = Math.random;
        Math.random = () => 0.2;
        try { girarRoletaDoEvento(); } finally { Math.random = sorteio; }
        return { saldo: dinheiro, mensagem: obterCamadaDaRoleta().querySelector('p').textContent };
    });
    expect(dados.saldo).toBe(5000);
    expect(dados.mensagem).toContain('180');
});

test('os três Superbosses usam a mesma cota por wave, com Gerador fora dela', async ({ page }) => {
    const resultados = await page.evaluate(() => {
        const saida = [];
        for (const id of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais']) {
            jogarEvento(id);
            dinheiro = 0;
            const creditoPorTiro = obterRecompensaPorTiro();
            const primeira = Array.from({ length: 32 }, () => registrarCreditosPorDisparo())
                .reduce((total, premio) => total + premio, 0);
            dinheiro -= 100;
            const aposGasto = registrarCreditosPorDisparo();
            const gerador = concederCreditosNaPartida(100);
            iniciarProximaWave();
            const segunda = Array.from({ length: 35 }, () => registrarCreditosPorDisparo())
                .reduce((total, premio) => total + premio, 0);
            const comum = CONFIG.eventos.elencosSuperBosses[id].comuns[0];
            criarInimigo(comum);
            inimigos.at(-1).vida = 0;
            moverInimigos(0);
            saida.push({ id, creditoPorTiro, primeira, aposGasto, gerador, segunda,
                contador: creditosDeCombateRecebidosNaWave, saldo: dinheiro });
            voltarAoLobby();
        }
        return saida;
    });
    for (const [indice, id] of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais'].entries()) {
        expect(resultados[indice]).toEqual({ id, creditoPorTiro: 23, primeira: 700,
            aposGasto: 0, gerador: 100, segunda: 775, contador: 775, saldo: 1475 });
    }
});

test('os três Superbosses ganham ataques próprios no Médio e no Difícil', async ({ page }) => {
    const ataques = await page.evaluate(() => {
        const saida = [];
        for (const id of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais']) {
            for (const dificuldade of ['facil', 'medio', 'dificil']) {
                jogarEvento(id, dificuldade);
                const chefe = { tipo: CONFIG.eventos.elencosSuperBosses[id].chefes.at(-1),
                    superBoss: true, vida: 100, vidaMaxima: 100, velocidade: 1,
                    x: 300, y: 300, alvo: 1, indiceDoCaminho: 0,
                    proximoAtaqueDeEventoEm: 999999, proximoAtaqueSecundarioEm: 0 };
                const aliadoProximo = { tipo: 'impDeBrasa', vida: 100, vidaMaxima: 100,
                    velocidade: 1, x: 350, y: 300 };
                const aliadoDistante = { tipo: 'impDeBrasa', vida: 100, vidaMaxima: 100,
                    velocidade: 1, x: 550, y: 300 };
                inimigos = id === 'superBosses'
                    ? [chefe, aliadoProximo, aliadoDistante] : [chefe];
                torres = [{ tipo: 'padrao', x: 340, y: 330 }, { tipo: 'padrao', x: 360, y: 350 }];
                tempoDoEventoMs = 15000;
                atualizarAtaquesDosSuperBosses();
                saida.push({ id, dificuldade,
                    projeteis: tirosDosInimigos.length,
                    furiaChefe: obterMultiplicadorDaFuriaDasCinzas(chefe),
                    furiaAliado: obterMultiplicadorDaFuriaDasCinzas(aliadoProximo),
                    furiaDistante: obterMultiplicadorDaFuriaDasCinzas(aliadoDistante),
                    torretas: inimigos.filter(inimigo => inimigo.torretaDaForja).length,
                    enguias: inimigos.filter(inimigo => inimigo.invocadoPeloLeviata).length });
                voltarAoLobby();
            }
        }
        return saida;
    });
    expect(ataques.filter(item => item.dificuldade === 'facil')
        .every(item => item.projeteis === 0 && item.torretas === 0 && item.enguias === 0)).toBe(true);
    expect(ataques.filter(item => item.id === 'superBosses').map(item => item.projeteis)).toEqual([0, 0, 0]);
    expect(ataques.filter(item => item.id === 'superBosses').map(item => item.furiaChefe)).toEqual([1, 1.35, 1.5]);
    expect(ataques.filter(item => item.id === 'superBosses').map(item => item.furiaAliado)).toEqual([1, 1.35, 1.5]);
    expect(ataques.filter(item => item.id === 'superBosses').map(item => item.furiaDistante)).toEqual([1, 1, 1]);
    expect(ataques.filter(item => item.id === 'superBossesMecanicos').map(item => item.torretas)).toEqual([0, 1, 1]);
    expect(ataques.filter(item => item.id === 'superBossesAbissais').map(item => item.enguias)).toEqual([0, 2, 3]);
});

test('Fúria das Cinzas acelera próximos por cinco segundos sem atingir torres', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('superBosses', 'medio');
        const chefe = { tipo: 'soberanoInfernal', superBoss: true, vida: 100, vidaMaxima: 100,
            velocidade: 1, x: 300, y: 300, proximoAtaqueDeEventoEm: 999999,
            proximoAtaqueSecundarioEm: 0 };
        const aliado = { tipo: 'impDeBrasa', vida: 100, vidaMaxima: 100,
            velocidade: 1, x: 350, y: 300 };
        inimigos = [chefe, aliado];
        torres = [{ tipo: 'padrao', x: 320, y: 310 }];
        tempoDoEventoMs = 12000;
        const velocidadeAnterior = obterVelocidadeAtualDoInimigo(aliado);
        atualizarAtaquesDosSuperBosses();
        const velocidadeDurante = obterVelocidadeAtualDoInimigo(aliado);
        const projeteis = tirosDosInimigos.length;
        tempoDoEventoMs += CONFIG.eventos.ataquesSecundariosSuperBoss.superBosses.duracaoFuriaMs;
        const velocidadeDepois = obterVelocidadeAtualDoInimigo(aliado);
        return { velocidadeAnterior, velocidadeDurante, velocidadeDepois, projeteis };
    });
    expect(resultado.velocidadeDurante).toBeCloseTo(resultado.velocidadeAnterior * 1.35);
    expect(resultado.velocidadeDepois).toBeCloseTo(resultado.velocidadeAnterior);
    expect(resultado.projeteis).toBe(0);
});

test('torreta da Forja recebe dano normal e destrói uma torre no sexto disparo', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesMecanicos', 'medio');
        const chefe = { tipo: 'titaDaForja', superBoss: true, vida: 100, x: 300, y: 300,
            alvo: 1, indiceDoCaminho: 0, proximoAtaqueDeEventoEm: 999999,
            proximoAtaqueSecundarioEm: 0 };
        const torre = { tipo: 'padrao', x: 345, y: 335, alcance: 200, ultimoTiro: 0 };
        inimigos = [chefe];
        torres = [torre];
        tempoDoEventoMs = 14000;
        atualizarAtaquesDosSuperBosses();
        const torreta = inimigos.find(inimigo => inimigo.torretaDaForja);
        const alvoPreferido = escolherAlvoDaTorre(torre, true) === torreta;
        tempoDoEventoMs = torreta.proximoTiroEm;
        atualizarTorretaDaForja();
        for (let laser = 0; laser < 3; laser++) aplicarDanoAoInimigo(torreta, 86);
        const resistiuRajada = torreta.vida === 5742;
        aplicarDanoAoInimigo(torreta, 5741);
        const quaseDestruida = torreta.vida === 1;
        aplicarDanoAoInimigo(torreta, 1);
        for (let tiro = 0; tiro < 5; tiro++) atingirTorreComTiroInimigo(torre, 'torretaDaForja');
        const resistiuCinco = torres.includes(torre);
        atingirTorreComTiroInimigo(torre, 'torretaDaForja');
        return { alvoPreferido, tipoDoProjetil: tirosDosInimigos[0]?.tipoDoInimigo,
            resistiuRajada, quaseDestruida, torretaDestruida: torreta.vida <= 0,
            resistiuCinco, torreDestruida: !torres.includes(torre) };
    });
    expect(resultado).toEqual({ alvoPreferido: true, tipoDoProjetil: 'torretaDaForja',
        resistiuRajada: true, quaseDestruida: true, torretaDestruida: true,
        resistiuCinco: true, torreDestruida: true });
});

test('Superboss derrotado não executa ataque pendente', async ({ page }) => {
    const golpes = await page.evaluate(() => {
        jogarEvento('superBosses');
        inimigos = [{ tipo: 'soberanoInfernal', superBoss: true, vida: 0,
            x: 100, y: 100, proximoAtaqueDeEventoEm: 0 }];
        torres = [{ tipo: 'padrao', x: 110, y: 110 }];
        tempoDoEventoMs = 6000;
        const original = atingirTorreComTiroInimigo;
        let total = 0;
        try {
            atingirTorreComTiroInimigo = () => { total++; };
            atualizarAtaquesDosSuperBosses();
        } finally { atingirTorreComTiroInimigo = original; }
        return total;
    });
    expect(golpes).toBe(0);
});

test('cada evento tem caminho, visual e música próprios sem tocar a trilha antiga', async ({ page }, info) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const caminhos = [];
    for (const id of ['caixaSurpresa', 'roleta', 'superBosses', 'superBossesMecanicos', 'superBossesAbissais', 'superBossesAcidos', 'superBossesMetamorfos', 'meteoros']) {
        const dados = await page.evaluate(evento => {
            jogarEvento(evento);
            const caminho = obterCaminhoAtual().map(ponto => ({ x: ponto.x, y: ponto.y }));
            const musicaAntiga = musica;
            const reproduzirOriginal = musicaAntiga.play;
            let tentativasDeTocar = 0;
            musicaAntiga.play = () => { tentativasDeTocar++; return Promise.resolve(); };
            const tocandoAoIniciar = musicaDoEventoTocando;
            const intervaloInicial = intervaloDaMusicaDoEvento;
            const nomeDaTrilha = CONFIG.eventos.trilhas[evento].nomeInterno;
            const visual = CONFIG.eventos.visuais[evento].terrenoBase;
            try {
                tocarMusica();
                reproduzirMusica();
                const semDuplicar = intervaloDaMusicaDoEvento === intervaloInicial;
                alternarMusica();
                const silenciou = !musicaDoEventoTocando;
                alternarMusica();
                return { caminho, visual, nomeDaTrilha, tocandoAoIniciar, semDuplicar, silenciou,
                    retomou: musicaDoEventoTocando, sequenciador: intervaloDaMusicaDoEvento !== null,
                    tentativasDeTocar, pausada: musicaAntiga.paused,
                    trilhaDoLobbyAtiva, trilhaPixeladaDaFase1Ativa };
            } finally { musicaAntiga.play = reproduzirOriginal; }
        }, id);
        expect(dados.caminho[0].x).toBe(0);
        expect(dados.caminho.at(-1).x).toBe(1200);
        expect(dados.caminho.every(ponto => ponto.y >= 0 && ponto.y <= 700)).toBe(true);
        expect(dados.tentativasDeTocar).toBe(0);
        expect(dados.pausada).toBe(true);
        expect(dados.tocandoAoIniciar).toBe(true);
        expect(dados.semDuplicar).toBe(true);
        expect(dados.silenciou).toBe(true);
        expect(dados.retomou).toBe(true);
        expect(dados.sequenciador).toBe(true);
        expect(dados.trilhaDoLobbyAtiva).toBe(false);
        expect(dados.trilhaPixeladaDaFase1Ativa).toBe(false);
        caminhos.push(dados);
        await page.locator('#game').scrollIntoViewIfNeeded();
        await page.screenshot({ path: info.outputPath(`caminho-${id}.png`) });
        await page.evaluate(() => voltarAoLobby());
    }
    expect(new Set(caminhos.map(item => JSON.stringify(item.caminho))).size).toBe(8);
    expect(new Set(caminhos.map(item => item.visual)).size).toBe(8);
    expect(new Set(caminhos.map(item => item.nomeDaTrilha)).size).toBe(8);
    expect(await page.evaluate(() => trilhaDoLobbyAtiva)).toBe(true);
});

test('Inferno, Abismo e Idade da Pedra têm ganho próprio sem afetar outras trilhas ou o silêncio', async ({ page }) => {
    const volumes = await page.evaluate(() => {
        const contextoAnterior = contextoAudio;
        const ganhoAnterior = ganhoDaMusicaDoEvento;
        const eventoAnterior = eventoDaMusicaAtivo;
        const volumeAnterior = volumeDaMusica;
        let ultimoGanho = null;
        try {
            contextoAudio = { currentTime: 0 };
            ganhoDaMusicaDoEvento = { gain: {
                setTargetAtTime(valor) { ultimoGanho = valor; }
            } };
            volumeDaMusica = 0.4;
            const volumesPorEvento = {};
            for (const id of Object.keys(CONFIG.eventos.trilhas)) {
                eventoDaMusicaAtivo = id;
                atualizarVolumeDaMusicaDoEvento();
                volumesPorEvento[id] = ultimoGanho;
            }
            volumeDaMusica = 0;
            eventoDaMusicaAtivo = 'idadeDaPedra';
            atualizarVolumeDaMusicaDoEvento();
            return { volumesPorEvento, silenciado: ultimoGanho };
        } finally {
            contextoAudio = contextoAnterior;
            ganhoDaMusicaDoEvento = ganhoAnterior;
            eventoDaMusicaAtivo = eventoAnterior;
            volumeDaMusica = volumeAnterior;
        }
    });
    expect(volumes.volumesPorEvento.superBosses).toBeCloseTo(1.04);
    expect(volumes.volumesPorEvento.superBossesMecanicos).toBeCloseTo(0.72);
    expect(volumes.volumesPorEvento.superBossesAbissais).toBeCloseTo(1.2);
    expect(volumes.volumesPorEvento.superBossesAcidos).toBeCloseTo(1.2);
    expect(volumes.volumesPorEvento.idadeDaPedra).toBeCloseTo(1.6);
    expect(await page.evaluate(() => CONFIG.eventos.trilhas.idadeDaPedra.volumeMelodia)).toBe(0.14);
    for (const id of ['caixaSurpresa', 'roleta', 'meteoros']) {
        expect(volumes.volumesPorEvento[id]).toBeCloseTo(0.4);
    }
    expect(volumes.silenciado).toBe(0);
});

test('Abismo mantém o ganho em 80% e destaca suas notas sem alterar as outras trilhas', async ({ page }) => {
    const mixagem = await page.evaluate(() => {
        const trilhas = CONFIG.eventos.trilhas;
        const abismo = trilhas.superBossesAbissais;
        return {
            volumeEmOitentaPorCento: 0.8 * abismo.volumeRelativo
                * CONFIG.eventos.volumeRelativoSuperBosses.superBossesAbissais,
            baixo: abismo.baixos[0][0],
            melodia: abismo.volumeMelodia,
            bateria: abismo.volumeBateria,
            instrumentos: [abismo.instrumento, trilhas.superBosses.instrumento],
            forja: trilhas.superBossesMecanicos.volumeMelodia,
            outros: ['caixaSurpresa', 'roleta', 'meteoros'].map(id => trilhas[id].volumeMelodia)
        };
    });
    expect(mixagem.volumeEmOitentaPorCento).toBeCloseTo(2.4);
    expect(mixagem.baixo).toBe(38);
    expect(mixagem.melodia).toBe(0.11);
    expect(mixagem.bateria).toBe(0.11);
    expect(mixagem.instrumentos).toEqual(['triangle', 'sawtooth']);
    expect(mixagem.forja).toBe(0.07);
    expect(mixagem.outros).toEqual([0.07, 0.07, 0.07]);
});

for (const id of ['caixaSurpresa', 'roleta', 'idadeDaPedra', 'superBosses', 'superBossesMecanicos', 'superBossesAbissais', 'superBossesAcidos', 'superBossesMetamorfos', 'meteoros']) {
    test(`${id} inicia uma partida própria e entrega o prêmio de vitória`, async ({ page }) => {
        const dados = await page.evaluate((evento) => {
            jogarEvento(evento);
            const antes = fragmentosPixel;
            const mapa = mapaPersonalizadoAtivo;
            const creditos = dinheiro;
            concluirPartidaDeEvento();
            return {
                id: mapa?.evento, ondas: mapa?.waves.length, creditos,
                vitoria: partidaVencida, fragmentos: fragmentosPixel - antes,
                skin: EVENTOS_DISPONIVEIS.find(item => item.id === evento).skin,
                desbloqueadas: [...recompensasPermanentesDasMissoes.skinsDesbloqueadas],
                vitorias: vitoriasDosEventos[evento]
            };
        }, id);
        expect(dados.id).toBe(id);
        expect(dados.ondas).toBe(id.startsWith('superBosses') ? 20 : id === 'meteoros' ? 10 : 16);
        expect(dados.vitoria).toBe(true);
        expect(dados.fragmentos).toBe(id.startsWith('superBosses') ? 25 : 12);
        expect(dados.vitorias).toBe(1);
        if (dados.skin) expect(dados.desbloqueadas).toContain(dados.skin);
        if (id === 'roleta') expect(dados.creditos).toBe(1000);
        if (id.startsWith('superBosses')) expect(dados.creditos).toBe(2000);
    });
}

test('vitória na Idade da Pedra mostra a piada traduzida junto do prêmio', async ({ page }) => {
    const falas = {
        'pt-BR': 'Ah, não! Você destruiu todos os nossos ancestrais... O que vai acontecer com a gente?',
        en: 'Oh no! You destroyed all our ancestors... What will happen to us?',
        es: '¡Ay, no! Destruiste a todos nuestros antepasados... ¿Qué va a pasar con nosotros?'
    };
    for (const [idioma, fala] of Object.entries(falas)) {
        await page.locator('#botao-jogar-menu-inicial').click();
        await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
        const resultado = await page.evaluate(idiomaAtualDaVitoria => {
            selecionarIdioma(idiomaAtualDaVitoria);
            jogarEvento('idadeDaPedra');
            concluirPartidaDeEvento();
            return {
                descricao: descricaoResultado.textContent,
                fala: falaIdadeDaPedra.textContent,
                visivel: !falaIdadeDaPedra.hidden
            };
        }, idioma);
        expect(resultado.descricao).toContain('12');
        expect(resultado.fala).toBe(fala);
        expect(resultado.visivel).toBe(true);
        await expect(page.locator('#fala-idade-da-pedra')).toBeVisible();
        if (idioma === 'pt-BR') {
            await page.setViewportSize({ width: 390, height: 844 });
            const posicao = await page.locator('#fala-idade-da-pedra').boundingBox();
            expect(posicao.y).toBeGreaterThanOrEqual(0);
            expect(posicao.y + posicao.height).toBeLessThanOrEqual(844);
            await page.setViewportSize({ width: 1440, height: 1000 });
        }
        await page.reload();
        await page.waitForFunction(() => typeof jogarEvento === 'function');
    }
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const outroEvento = await page.evaluate(() => {
        jogarEvento('caixaSurpresa');
        concluirPartidaDeEvento();
        return { descricao: descricaoResultado.textContent, falaVisivel: !falaIdadeDaPedra.hidden };
    });
    expect(outroEvento.descricao).not.toContain(falas.es);
    expect(outroEvento.falaVisivel).toBe(false);
    await expect(page.locator('#fala-idade-da-pedra')).toBeHidden();
});

test('E agora? desbloqueia uma vez após vitória salva e persiste no slot', async ({ page }) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const dados = await page.evaluate(() => {
        const antes = conquistaEstaDesbloqueada('eAgora');
        jogarEvento('idadeDaPedra');
        concluirPartidaDeEvento();
        const salvo = sistemaDeSalvos.espacos[sistemaDeSalvos.indiceAtivo].dados;
        return {
            antes,
            depois: conquistaEstaDesbloqueada('eAgora'),
            guardadaNoSlot: JSON.parse(salvo[CHAVE_RECOMPENSAS_MISSOES]).conquistasDesbloqueadas.includes('eAgora'),
            vitorias: vitoriasDosEventos.idadeDaPedra
        };
    });
    expect(dados).toEqual({ antes: false, depois: true, guardadaNoSlot: true, vitorias: 1 });
    await page.evaluate(() => { voltarAoLobbyDoResultado(); mostrarConquistas('ocultas'); });
    const cartao = page.locator('.conquista-cartao').filter({ hasText: 'E agora?' });
    await expect(cartao).toContainText('Ainda nada aconteceu.');
    await expect.poll(() => cartao.locator('img').evaluate(imagem => imagem.complete && imagem.naturalWidth > 0)).toBe(true);
    await page.reload();
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('eAgora'))).toBe(true);
});

test('E agora? reconhece vitória antiga sem compartilhar com outro slot', async ({ page }) => {
    await page.evaluate(() => {
        localStorage.setItem(CHAVE_VITORIAS_DOS_EVENTOS, JSON.stringify({ idadeDaPedra: 1 }));
        atualizarSalvoAtivo();
    });
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(() => mostrarConquistas('ocultas'));
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('eAgora'))).toBe(true);
    await Promise.all([
        page.waitForEvent('load'),
        page.evaluate(() => { setTimeout(() => trocarSalvoAtivo(2), 0); })
    ]);
    await page.waitForFunction(() => typeof conquistaEstaDesbloqueada === 'function');
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('eAgora'))).toBe(false);
});

test('cada arena de super-bosses usa três subordinados e um chefe final', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const resultados = [];
        for (const id of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais']) {
            jogarEvento(id);
            const elenco = CONFIG.eventos.elencosSuperBosses[id];
            const grupos = mapaPersonalizadoAtivo.waves.map(item => item.grupos.map(grupo => grupo.tipo));
            criarInimigo(elenco.chefes[0]);
            const subordinado = inimigos.at(-1);
            criarInimigo(elenco.chefes.at(-1));
            const chefe = inimigos.at(-1);
            resultados.push({
                id, comuns: [...elenco.comuns], chefes: [...elenco.chefes], grupos,
                vida: chefe?.vida, vidaBase: calcularVidaDoBoss(wave, elenco.chefes.at(-1)),
                superBoss: chefe?.superBoss,
                subordinadoSuperBoss: Boolean(subordinado?.superBoss),
                velocidade: chefe?.velocidade,
                visual: CONFIG.inimigo[elenco.chefes[0]].visualEvento,
                creditoPorTiro: obterRecompensaPorTiro(), bonusPorTiro: CONFIG.eventos.bonusCreditosPorTiroBosses
            });
            voltarAoLobby();
        }
        selecionarIdioma('en');
        const nomeIngles = localizar(CONFIG.inimigo.titaDaForja.nome);
        selecionarIdioma('es');
        const nomeEspanhol = localizar(CONFIG.inimigo.leviataAbissal.nome);
        return { resultados, nomeIngles, nomeEspanhol };
    });
    expect(dados.nomeIngles).toBe('Forge Titan');
    expect(dados.nomeEspanhol).toBe('Leviatán Abisal');
    expect(new Set(dados.resultados.flatMap(item => item.chefes)).size).toBe(12);
    for (const item of dados.resultados) {
        expect(new Set(item.chefes).size).toBe(4);
        expect(item.comuns).toHaveLength(2);
        expect(item.superBoss).toBe(true);
        expect(item.subordinadoSuperBoss).toBe(false);
        expect(item.velocidade).toBeLessThan(0.5);
        expect(item.vida).toBe(item.vidaBase * 3);
        expect(item.vida).toBeGreaterThan(20000);
        expect(item.creditoPorTiro).toBe(20 + item.bonusPorTiro);
        for (let indice = 0; indice < 20; indice++) {
            expect(item.grupos[indice]).toContain(item.comuns[0]);
            if (indice >= 2) expect(item.grupos[indice]).toContain(item.comuns[1]);
            if ((indice + 1) % 5 === 0) expect(item.grupos[indice]).toContain(item.chefes[Math.floor(indice / 5)]);
            else expect(item.grupos[indice].some(tipo => item.chefes.includes(tipo))).toBe(false);
        }
    }
});

test('o chefe final é anunciado nas três waves anteriores em três idiomas', async ({ page }) => {
    const avisos = await page.evaluate(() => {
        jogarEvento('superBosses');
        const mensagens = [];
        for (const idioma of ['pt-BR', 'en', 'es']) {
            selecionarIdioma(idioma);
            for (const numero of [17, 18, 19, 20]) {
                wave = numero - 1;
                iniciarProximaWave();
                mensagens.push({ idioma, numero, mensagem: aviso });
            }
        }
        return mensagens;
    });
    expect(avisos.filter(item => item.idioma === 'pt-BR').map(item => item.mensagem)).toEqual([
        'Daqui a 3 rodadas, Soberano Infernal está vindo!',
        'Daqui a 2 rodadas, Soberano Infernal está vindo!',
        'Daqui a 1 rodada, Soberano Infernal está vindo!',
        'Soberano Infernal chegou!'
    ]);
    expect(avisos.find(item => item.idioma === 'en' && item.numero === 17).mensagem).toContain('Infernal Sovereign arrives in 3 waves');
    expect(avisos.find(item => item.idioma === 'es' && item.numero === 20).mensagem).toContain('Soberano Infernal');
});

test('cada super-boss usa seu ataque especial sem dar esses poderes aos subordinados', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const resultados = {};
        for (const id of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais']) {
            jogarEvento(id);
            const tipoFinal = CONFIG.eventos.elencosSuperBosses[id].chefes.at(-1);
            criarInimigo(tipoFinal);
            const chefe = inimigos.at(-1);
            const torre = criarTorreNaPartida('padrao', 360, 350);
            chefe.x = torre.x - 70;
            chefe.y = torre.y;
            tempoDoEventoMs = 1000;
            aplicarAtaqueEspecialDoSuperBoss(chefe);
            const queimaduras = queimadurasDasTorresDoEvento.length;
            const estase = torreEstaEmEstaseTemporal(torre);
            const alcanceOriginal = torre.alcance;
            const alcanceComEfeito = obterAlcanceAtualDaTorre(torre);
            tempoDoEventoMs += CONFIG.eventos.ataquesEspeciaisSuperBoss.superBosses.intervaloDanoMs;
            atualizarQueimadurasDasTorresDoEvento();
            resultados[id] = { queimaduras, danoGradual: torre.tirosRecebidos, estase,
                alcanceOriginal, alcanceComEfeito, vida: chefe.vida, velocidade: chefe.velocidade };
            voltarAoLobby();
        }
        return resultados;
    });
    expect(dados.superBosses.queimaduras).toBe(1);
    expect(dados.superBosses.danoGradual).toBe(1);
    expect(dados.superBossesMecanicos.estase).toBe(true);
    expect(dados.superBossesAbissais.alcanceComEfeito).toBeLessThan(dados.superBossesAbissais.alcanceOriginal);
    expect(Object.values(dados).every(item => item.vida > 20000 && item.velocidade < 0.5)).toBe(true);
});

test('os três caminhos de Superbosses ficam mais longos, com curvas e sem sair do mapa', async ({ page }) => {
    const rotas = await page.evaluate(() => {
        return ['superBosses', 'superBossesMecanicos', 'superBossesAbissais'].map(id => {
            jogarEvento(id);
            const caminho = obterCaminhoAtual();
            const comprimento = caminho.slice(1).reduce((total, ponto, indice) =>
                total + Math.hypot(ponto.x - caminho[indice].x, ponto.y - caminho[indice].y), 0);
            const ortogonal = caminho.slice(1).every((ponto, indice) =>
                (ponto.x === caminho[indice].x) !== (ponto.y === caminho[indice].y));
            const dentroDoMapa = caminho.every(ponto =>
                ponto.x >= 0 && ponto.x <= 1200 && ponto.y >= 0 && ponto.y <= 700);
            const bloqueiaConstrucaoNaEstrada = estaNoCaminho(
                caminho[1].x, caminho[1].y);
            voltarAoLobby();
            return { id, comprimento, curvas: caminho.length - 2, ortogonal,
                dentroDoMapa, bloqueiaConstrucaoNaEstrada };
        });
    });
    expect(rotas.map(rota => rota.id)).toEqual([
        'superBosses', 'superBossesMecanicos', 'superBossesAbissais'
    ]);
    expect(rotas.map(rota => rota.comprimento)).toEqual([2410, 2660, 2900]);
    expect(rotas.every(rota => rota.curvas >= 10 && rota.ortogonal
        && rota.dentroDoMapa && rota.bloqueiaConstrucaoNaEstrada)).toBe(true);
});

test('ataques comuns e especiais dos três Superbosses respeitam 120 px', async ({ page }) => {
    const resultados = await page.evaluate(() => {
        const dados = {};
        for (const id of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais']) {
            jogarEvento(id);
            criarInimigo(CONFIG.eventos.elencosSuperBosses[id].chefes.at(-1));
            const chefe = inimigos.at(-1);
            chefe.x = 600;
            chefe.y = 350;
            chefe.proximoAtaqueDeEventoEm = 0;
            const proxima = { tipo: 'padrao', x: 650, y: 350, alcance: 180 };
            const naBorda = { tipo: 'padrao', x: 720, y: 350, alcance: 180 };
            const fora = { tipo: 'padrao', x: 721, y: 350, alcance: 180 };
            torres = [proxima, naBorda, fora];
            tempoDoEventoMs = CONFIG.eventos.intervaloAtaqueSuperBossMs;
            atualizarAtaquesDosSuperBosses();
            dados[id] = {
                acertos: torres.map(torre => torre.tirosRecebidos || 0),
                queimadas: queimadurasDasTorresDoEvento.map(item => torres.indexOf(item.torre)),
                paralisadas: torres.map(torre => Boolean(torre.estaseTemporalExpiraEm)),
                alcanceReduzido: torres.map(torre => Boolean(torre.percentualReducaoAlcanceCoruja))
            };
            voltarAoLobby();
        }
        return dados;
    });
    for (const id of Object.keys(resultados)) {
        expect(resultados[id].acertos).toEqual([1, 1, 0]);
    }
    expect(resultados.superBosses.queimadas).toEqual([0, 1]);
    expect(resultados.superBossesMecanicos.paralisadas).toEqual([true, true, false]);
    expect(resultados.superBossesAbissais.alcanceReduzido).toEqual([true, true, false]);
});

test('fogo do Soberano atinge até três torres a cada dois segundos sem destruí-las de uma vez', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('superBosses');
        criarInimigo('soberanoInfernal');
        const soberano = inimigos.at(-1);
        soberano.x = 600;
        soberano.y = 350;
        soberano.proximoAtaqueDeEventoEm = 0;
        torres = [50, 80, 120, 121].map(distancia => ({
            tipo: 'padrao', x: soberano.x + distancia, y: soberano.y, tirosRecebidos: 0
        }));
        tempoDoEventoMs = 0;
        atualizarAtaquesDosSuperBosses();
        const acertosPorSegundo = [torres.map(torre => torre.tirosRecebidos)];
        for (let segundo = 1; segundo <= 5; segundo++) {
            tempoDoEventoMs = segundo * 1000;
            atualizarQueimadurasDasTorresDoEvento();
            acertosPorSegundo.push(torres.map(torre => torre.tirosRecebidos));
        }
        return { acertosPorSegundo, torresRestantes: torres.length,
            intervalo: CONFIG.eventos.ataquesEspeciaisSuperBoss.superBosses.intervaloDanoMs };
    });
    expect(resultado.intervalo).toBe(2000);
    expect(resultado.acertosPorSegundo).toEqual([
        [1, 1, 1, 0], [1, 1, 1, 0], [2, 2, 2, 0],
        [2, 2, 2, 0], [3, 3, 3, 0], [3, 3, 3, 0]
    ]);
    expect(resultado.torresRestantes).toBe(4);
});

test('álbum separa cinco super-bosses finais dos subordinados sem perder figurinhas', async ({ page }) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(() => {
        registrarInimigoDerrotadoNoAlbum('duqueDasBrasas');
        registrarInimigoDerrotadoNoAlbum('soberanoInfernal');
        mostrarAlbum();
    });
    await expect(page.locator('#aba-album-superBosses')).toBeVisible();
    await page.locator('#aba-album-superBosses').click();
    await page.screenshot({ path: 'artifacts/eventos-superbosses/album.png', fullPage: true });
    await expect(page.locator('#painel-album-superBosses')).toContainText('Soberano Infernal');
    const vidaFinal = await page.evaluate(() => calcularVidaDoBoss(CONFIG.eventos.wavesSuperBosses, 'soberanoInfernal') * CONFIG.eventos.multiplicadorVidaSuperBoss);
    // A figurinha isolada não revela valores; a vitória por dificuldade é coberta no teste do Álbum.
    await expect(page.locator('#painel-album-superBosses')).not.toContainText(vidaFinal.toLocaleString('pt-BR'));
    await expect(page.locator('#painel-album-superBosses')).not.toContainText('Duque das Brasas');
    await expect(page.locator('#aba-album-superBosses')).toContainText('1/5');
    await page.locator('#aba-album-bosses').click();
    await expect(page.locator('#painel-album-bosses')).toContainText('Duque das Brasas');
});

test('os 30 inimigos com arte de evento têm sprites próprios e aparecem nas arenas', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    const sprites = await page.evaluate(() => {
        const tipos = new Set(Object.values(CONFIG.eventos.elencosSuperBosses)
            .flatMap(elenco => [...elenco.comuns, ...elenco.chefes]));
        return Object.entries(SPRITES_DOS_INIMIGOS_DOS_EVENTOS)
            .filter(([tipo]) => tipos.has(tipo))
            .map(([tipo, linhas]) => ({ tipo, linhas: [...linhas] }));
    });
    expect(sprites).toHaveLength(30);
    expect(new Set(sprites.map(item => item.linhas.join(''))).size).toBe(30);
    expect(sprites.flatMap(sprite => sprite.linhas.map((linha, indice) => ({ tipo: sprite.tipo, indice, linha }))
        .filter(item => item.linha.length !== 12 || !/^[.abcd]{12}$/.test(item.linha)))).toEqual([]);
    expect(sprites.every(sprite => sprite.linhas.length === 12)).toBe(true);
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    for (const id of ['superBosses', 'superBossesMecanicos', 'superBossesAbissais', 'superBossesAcidos', 'superBossesMetamorfos']) {
        await page.evaluate(evento => {
            jogarEvento(evento);
            const elenco = CONFIG.eventos.elencosSuperBosses[evento];
            [...elenco.comuns, ...elenco.chefes].forEach((tipo, indice) => {
                criarInimigo(tipo);
                const chefe = inimigos.at(-1);
                chefe.x = 190 + indice % 3 * 300;
                chefe.y = indice < 3 ? 230 : 500;
            });
        }, id);
        await page.waitForTimeout(120);
        await page.locator('#game').screenshot({ path: `artifacts/eventos-superbosses/elenco-${id}.png` });
        await page.evaluate(() => voltarAoLobby());
    }
    expect(erros).toEqual([]);
});

test('roleta pausa a partida, cobra créditos e retoma', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('roleta');
        abrirRoletaDoEvento();
        const pausado = jogoPausado;
        const antes = dinheiro;
        girarRoletaDoEvento();
        const apos = dinheiro;
        girarRoletaDoEvento();
        const semGiroDuplicado = dinheiro === apos;
        const mensagem = document.querySelector('#camada-roleta-evento p').textContent;
        fecharRoletaDoEvento();
        return { pausado, retomou: !jogoPausado, antes, apos, semGiroDuplicado, mensagem };
    });
    expect(dados.pausado).toBe(true);
    expect(dados.retomou).toBe(true);
    expect(dados.antes).toBe(1000);
    expect(dados.apos).toBeLessThanOrEqual(1120);
    expect(dados.semGiroDuplicado).toBe(true);
    expect(dados.mensagem.length).toBeGreaterThan(0);
});

test('torre da roleta espera o jogador escolher uma posição válida', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('roleta');
        abrirRoletaDoEvento();
        const sorteio = Math.random;
        Math.random = () => 0.4;
        try { girarRoletaDoEvento(); } finally { Math.random = sorteio; }
        const antes = { torres: torres.length, pendentes: defesasPendentesDoEvento.length };
        fecharRoletaDoEvento();
        const clicar = (x, y) => {
            const area = canvas.getBoundingClientRect();
            canvas.dispatchEvent(new MouseEvent('click', { bubbles: true,
                clientX: area.left + x * area.width / canvas.width,
                clientY: area.top + y * area.height / canvas.height }));
        };
        clicar(0, 0);
        const aposCliqueInvalido = defesasPendentesDoEvento.length;
        const lugar = escolherPosicaoLivreDoEvento('padrao');
        clicar(lugar.x, lugar.y);
        return { antes, aposCliqueInvalido, depois: { torres: torres.length, pendentes: defesasPendentesDoEvento.length } };
    });
    expect(dados.antes).toEqual({ torres: 0, pendentes: 1 });
    expect(dados.aposCliqueInvalido).toBe(1);
    expect(dados.depois).toEqual({ torres: 1, pendentes: 0 });
});

test('caixa caída permanece fechada até o clique e mostra a torre no cursor', async ({ page }, info) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    const caixa = await page.evaluate(() => {
        jogarEvento('caixaSurpresa');
        for (let indice = 0; indice < 120; indice++) atualizarMecanicaDoEvento(1);
        const caixaNoChao = caixasDoEvento.find(item => item.progresso === 1);
        return { x: caixaNoChao.x, y: caixaNoChao.y, torres: torres.length };
    });
    expect(caixa.torres).toBe(0);
    await page.locator('#game').scrollIntoViewIfNeeded();
    const canvasDoJogo = page.locator('#game');
    let area = await canvasDoJogo.boundingBox();
    const dimensoes = await page.evaluate(() => ({ largura: canvas.width, altura: canvas.height }));
    const pontoNaTela = (x, y) => ({ x: area.x + x * area.width / dimensoes.largura,
        y: area.y + y * area.height / dimensoes.altura });
    await canvasDoJogo.click({ position: { x: caixa.x * area.width / dimensoes.largura,
        y: caixa.y * area.height / dimensoes.altura } });
    expect(await page.evaluate(() => defesasPendentesDoEvento.length)).toBe(1);
    const pontoLivre = await page.evaluate(() => escolherPosicaoLivreDoEvento(defesasPendentesDoEvento[0]));
    area = await canvasDoJogo.boundingBox();
    const pontoDoCursor = pontoNaTela(pontoLivre.x, pontoLivre.y);
    await page.mouse.move(pontoDoCursor.x, pontoDoCursor.y);
    await page.screenshot({ path: info.outputPath('caixa-torre-no-cursor.png') });
    await canvasDoJogo.click({ position: { x: pontoLivre.x * area.width / dimensoes.largura,
        y: pontoLivre.y * area.height / dimensoes.altura } });
    expect(await page.evaluate(() => defesasPendentesDoEvento.length)).toBe(0);
});

test('prévia opcional das fases fica desligada por padrão e persiste nos três idiomas', async ({ page }, info) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-configuracoes-lobby').click();
    const controle = page.locator('#controle-construcao-cursor');
    await expect(controle).not.toBeChecked();
    await controle.check();
    await expect(controle).toBeChecked();
    await page.screenshot({ path: info.outputPath('configuracao-construcao.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: info.outputPath('configuracao-construcao-celular.png') });
    await page.evaluate(() => selecionarIdioma('en'));
    await expect(page.locator('label[for="controle-construcao-cursor"]')).toContainText('following the cursor');
    await page.evaluate(() => selecionarIdioma('es'));
    await expect(page.locator('label[for="controle-construcao-cursor"]')).toContainText('siguiendo el cursor');
    await page.reload();
    await expect(controle).toBeChecked();
    expect(await page.evaluate(() => construcaoSeguindoCursor)).toBe(true);
    const previa = await page.evaluate(() => {
        iniciarPartida(false);
        jogoPausado = false;
        posicaoCursorNoMapa = { x: 350, y: 350 };
        const original = desenharPreviaDeDefesaNoCursor;
        let chamadas = 0;
        desenharPreviaDeDefesaNoCursor = () => { chamadas++; };
        try {
            desenharConstrucaoSeguindoCursor();
            const ligada = chamadas;
            alternarConstrucaoSeguindoCursor(false);
            desenharConstrucaoSeguindoCursor();
            return { ligada, desligada: chamadas };
        } finally { desenharPreviaDeDefesaNoCursor = original; }
    });
    expect(previa).toEqual({ ligada: 1, desligada: 1 });
});

test('roleta grande mostra todos os prêmios e funciona no celular', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(() => selecionarIdioma('en'));
    await page.locator('#botao-eventos').click();
    await page.locator('.cartao-evento').nth(1).getByRole('button').click();
    await page.locator('#botao-roleta-evento').click();
    await expect(page.locator('.roleta-evento-disco span')).toHaveCount(8);
    await expect(page.locator('#camada-roleta-evento')).toBeVisible();
    await expect(page.locator('#girar-roleta-evento')).toContainText('180');
    await page.screenshot({ path: testInfo.outputPath('evento-roleta-celular.png') });
});

test('vitórias repetidas dão Fragmentos sem duplicar a skin e persistem', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('caixaSurpresa');
        concluirPartidaDeEvento();
        const primeiro = { fragmentos: fragmentosPixel, skins: recompensasPermanentesDasMissoes.skinsDesbloqueadas.filter(id => id === 'sentinelaDourada').length };
        repetirFaseDoResultado();
        concluirPartidaDeEvento();
        return { primeiro, segundo: { fragmentos: fragmentosPixel, skins: recompensasPermanentesDasMissoes.skinsDesbloqueadas.filter(id => id === 'sentinelaDourada').length }, vitorias: vitoriasDosEventos.caixaSurpresa };
    });
    expect(dados.segundo.fragmentos - dados.primeiro.fragmentos).toBe(12);
    expect(dados.segundo.skins).toBe(1);
    expect(dados.vitorias).toBe(2);
    await page.reload();
    await expect.poll(() => page.evaluate(() => carregarVitoriasDosEventos().caixaSurpresa)).toBe(2);
});

test('caixas, super-bosses e meteoros aplicam suas regras', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('caixaSurpresa');
        const caixas = caixasDoEvento.length;
        for (let i = 0; i < 120; i++) atualizarMecanicaDoEvento(1);
        const torresAntesDeAbrir = torres.length;
        const caixa = caixasDoEvento.find(item => item.progresso === 1);
        const clicar = (x, y) => {
            const area = canvas.getBoundingClientRect();
            canvas.dispatchEvent(new MouseEvent('click', { bubbles: true,
                clientX: area.left + x * area.width / canvas.width,
                clientY: area.top + y * area.height / canvas.height }));
        };
        clicar(caixa.x, caixa.y);
        const defesaPendente = defesasPendentesDoEvento.length;
        const lugar = escolherPosicaoLivreDoEvento(caixa.tipo);
        clicar(lugar.x, lugar.y);
        const torresDaCaixa = torres.length;
        voltarAoLobby();
        jogarEvento('superBosses');
        wave = 2;
        criarInimigo('soberanoInfernal');
        const chefe = inimigos.at(-1);
        const vidaTriplicada = chefe.superBoss && chefe.vida === chefe.vidaMaxima;
        chefe.x = 350;
        chefe.y = 350;
        const torreDoChefe = criarTorreNaPartida('padrao', 360, 350);
        chefe.proximoAtaqueDeEventoEm = 0;
        atualizarAtaquesDosSuperBosses();
        const ataqueDoChefe = torreDoChefe.tirosRecebidos > 0;
        voltarAoLobby();
        jogarEvento('meteoros');
        const torre = criarTorreNaPartida('padrao', 350, 350);
        minasTerrestres.push({ tipo: 'minaTerrestre', x: 350, y: 350 });
        bombasPesadas.push({ tipo: 'bombaPesada', x: 350, y: 350 });
        inimigos.push({ tipo: 'normal', x: 350, y: 350 });
        aplicarImpactoDoMeteoro({ x: 350, y: 350 });
        return { caixas, torresAntesDeAbrir, defesaPendente, torresDaCaixa, vidaTriplicada, ataqueDoChefe, torreDestruida: !torres.includes(torre),
            minaDestruida: minasTerrestres.length === 0, bombaDestruida: bombasPesadas.length === 0,
            inimigoDestruido: inimigos.length === 0 };
    });
    expect(dados.caixas).toBeGreaterThan(0);
    expect(dados.torresAntesDeAbrir).toBe(0);
    expect(dados.defesaPendente).toBe(1);
    expect(dados.torresDaCaixa).toBeGreaterThan(0);
    expect(dados.vidaTriplicada).toBe(true);
    expect(dados.ataqueDoChefe).toBe(true);
    expect(dados.torreDestruida).toBe(true);
    expect(dados.minaDestruida).toBe(true);
    expect(dados.bombaDestruida).toBe(true);
    expect(dados.inimigoDestruido).toBe(true);
});

test('protótipo de Meteoros sobrevive ao tempo e crateras bloqueiam construção', async ({ page }) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const dados = await page.evaluate(() => {
        jogarEvento('meteoros');
        const indicador = document.getElementById('indicador-sobrevivencia-meteoros');
        const inicio = indicador.textContent;
        const local = escolherPosicaoLivreDoEvento('padrao');
        const livreAntes = !construcaoSobreDecoracao(local.x, local.y);
        aplicarImpactoDoMeteoro(local);
        const bloqueada = construcaoSobreDecoracao(local.x, local.y);
        tempoDoEventoMs = CONFIG.eventos.duracaoCrateraMeteorosMs;
        atualizarMecanicaDoEvento(0);
        const liberada = !construcaoSobreDecoracao(local.x, local.y);
        inimigosParaCriar = 0;
        tempoDoEventoMs = CONFIG.eventos.intervaloGruposMeteorosMs;
        atualizarMecanicaDoEvento(0);
        const segundoGrupo = wave;
        wave = CONFIG.eventos.gruposMeteoros;
        inimigosParaCriar = 0;
        inimigos = [];
        tempoDoEventoMs = CONFIG.eventos.duracaoSobrevivenciaMeteorosMs;
        atualizarMecanicaDoEvento(0);
        return { inicio, livreAntes, bloqueada, liberada, segundoGrupo,
            venceu: partidaVencida, encerrada: partidaEncerrada,
            intervalo: CONFIG.eventos.intervaloMeteorosMs,
            raio: CONFIG.eventos.raioMeteoro };
    });
    expect(dados).toEqual({ inicio: 'Sobreviva: 3:00', livreAntes: true,
        bloqueada: true, liberada: true, segundoGrupo: 2,
        venceu: true, encerrada: true, intervalo: 5000, raio: 95 });
    await page.evaluate(() => {
        voltarAoLobbyDoResultado();
        jogarEvento('meteoros');
        aplicarImpactoDoMeteoro({ x: 370, y: 280 });
        meteorosDoEvento.push({ x: 760, y: 350, progresso: 0.4, explosao: 0 });
    });
    await expect(page.locator('#indicador-sobrevivencia-meteoros')).toBeVisible();
    await page.locator('#game').screenshot({ path: 'artifacts/evento-meteoros-prototipo-desktop.png' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#game').screenshot({ path: 'artifacts/evento-meteoros-prototipo-celular.png' });
});

test('Caixa Surpresa fortalece inimigos e Meteoros só dobra a quarta chuva', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('caixaSurpresa');
        const inicial = { tipo: 'normal', vida: 100, vidaMaxima: 100, velocidade: 1 };
        wave = 2;
        ajustarInimigoDoEvento(inicial);
        const fortalecido = { tipo: 'normal', vida: 100, vidaMaxima: 100, velocidade: 1 };
        wave = 3;
        ajustarInimigoDoEvento(fortalecido);
        voltarAoLobby();
        jogarEvento('meteoros');
        const chuvas = [];
        for (let indice = 0; indice < 4; indice++) {
            tempoDoEventoMs = proximoMeteoroEm;
            atualizarMecanicaDoEvento(0);
            chuvas.push(meteorosDoEvento.length);
        }
        const distancia = Math.hypot(
            meteorosDoEvento[3].x - meteorosDoEvento[4].x,
            meteorosDoEvento[3].y - meteorosDoEvento[4].y
        );
        return { inicial, fortalecido, chuvas, distancia,
            minimo: CONFIG.eventos.distanciaMinimaEntreMeteorosDaChuva };
    });
    expect(dados.inicial).toEqual({ tipo: 'normal', vida: 100, vidaMaxima: 100, velocidade: 1 });
    expect(dados.fortalecido).toEqual({ tipo: 'normal', vida: 140, vidaMaxima: 140, velocidade: 1.1 });
    expect(dados.chuvas).toEqual([1, 2, 3, 5]);
    expect(dados.distancia).toBeGreaterThanOrEqual(dados.minimo);
});

test('eventos normais oferecem ações próprias e fortalecem os inimigos após a preparação', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const evolucao = {};
        for (const id of ['caixaSurpresa', 'roleta', 'meteoros', 'superBosses']) {
            jogarEvento(id);
            wave = 3;
            const inimigo = { tipo: 'normal', vida: 100, vidaMaxima: 100, velocidade: 1 };
            ajustarInimigoDoEvento(inimigo);
            evolucao[id] = { vida: inimigo.vida, velocidade: inimigo.velocidade };
            voltarAoLobby();
        }
        jogarEvento('caixaSurpresa');
        concederDefesaDoEvento('padrao');
        const alternativa = alternativaDaCaixaPendente;
        executarAcaoDoEvento();
        const defesaEscolhida = defesasPendentesDoEvento[0];
        voltarAoLobby();
        jogarEvento('roleta');
        concederDefesaDoEvento('padrao');
        const saldoAntesDaTroca = dinheiro;
        executarAcaoDoEvento();
        const trocouPremio = defesasPendentesDoEvento.length === 0;
        const saldoAposATroca = dinheiro;
        voltarAoLobby();
        jogarEvento('meteoros');
        const torre = criarTorreNaPartida('padrao', 350, 350);
        torreSelecionada = torre;
        const posicaoAnterior = { x: torre.x, y: torre.y };
        executarAcaoDoEvento();
        const deslocamento = Math.hypot(torre.x - posicaoAnterior.x, torre.y - posicaoAnterior.y);
        const recarga = proximaEvacuacaoDeTorreEm;
        executarAcaoDoEvento();
        return { evolucao, alternativa, defesaEscolhida, trocouPremio,
            ganhoNaRoleta: saldoAposATroca - saldoAntesDaTroca,
            deslocamento, recarga, aindaSelecionada: torreSelecionada === torre };
    });
    for (const id of ['caixaSurpresa', 'roleta', 'meteoros']) {
        expect(dados.evolucao[id]).toEqual({ vida: 140, velocidade: 1.1 });
    }
    expect(dados.evolucao.superBosses).toEqual({ vida: 100, velocidade: 1 });
    expect(dados.alternativa).not.toBe('padrao');
    expect(dados.defesaEscolhida).toBe(dados.alternativa);
    expect(dados.trocouPremio).toBe(true);
    expect(dados.ganhoNaRoleta).toBe(100);
    expect(dados.deslocamento).toBeGreaterThanOrEqual(150);
    expect(dados.recarga).toBe(30000);
    expect(dados.aindaSelecionada).toBe(true);
});

test('Caixa Surpresa renova a alternativa ao posicionar presentes consecutivos', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('caixaSurpresa');
        concederDefesaDoEvento('padrao');
        concederDefesaDoEvento('padrao');
        executarAcaoDoEvento();
        const primeiraDefesa = defesasPendentesDoEvento[0];
        let posicao = null;
        for (let tentativa = 0; tentativa < 100 && !posicao; tentativa++) {
            const candidata = escolherPosicaoLivreDoEvento(primeiraDefesa);
            if (candidata && posicaoValidaParaDefesaDoEvento(primeiraDefesa,
                candidata.x, candidata.y)) posicao = candidata;
        }
        if (!posicao) return { erro: 'sem posição para construir' };
        const retangulo = canvas.getBoundingClientRect();
        cliqueNoMapaDoEvento({
            clientX: retangulo.left + posicao.x * retangulo.width / canvas.width,
            clientY: retangulo.top + posicao.y * retangulo.height / canvas.height
        });
        return {
            primeiraDefesaConstruida: torres.some(torre => torre.tipo === primeiraDefesa),
            segundaDefesa: defesasPendentesDoEvento[0],
            alternativa: alternativaDaCaixaPendente,
            botaoVisivel: !document.getElementById('botao-acao-evento').hidden
        };
    });
    expect(dados.erro).toBeUndefined();
    expect(dados.primeiraDefesaConstruida).toBe(true);
    expect(dados.segundaDefesa).toBe('padrao');
    expect(dados.alternativa).toBeTruthy();
    expect(dados.alternativa).not.toBe('padrao');
    expect(dados.botaoVisivel).toBe(true);
});

test('eventos comuns têm elencos exclusivos, chefes finais e figurinhas próprias', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const elencos = {};
        for (const id of ['caixaSurpresa', 'roleta', 'meteoros']) {
            jogarEvento(id);
            const elenco = CONFIG.eventos.elencosNormais[id];
            const tipos = [...elenco.comuns, elenco.chefe];
            elencos[id] = {
                waves: mapaPersonalizadoAtivo.waves.length,
                primeiro: mapaPersonalizadoAtivo.waves[0].grupos[0].tipo,
                chefeFinal: mapaPersonalizadoAtivo.waves.at(-1).grupos.at(-1).tipo,
                sprites: tipos.every(tipo => SPRITES_DOS_INIMIGOS_DOS_EVENTOS[tipo]?.length === 8
                    && SPRITES_DOS_INIMIGOS_DOS_EVENTOS[tipo].every(linha => linha.length === 8)),
                eventosNoAlbum: tipos.every(tipo => obterIdDoEventoDoInimigo(tipo) === id)
            };
            voltarAoLobby();
        }
        registrarInimigoDerrotadoNoAlbum(CONFIG.eventos.elencosNormais.caixaSurpresa.comuns[0]);
        return { elencos, figurinha: inimigosDerrotadosNoAlbum.has('mimicoEmbrulhado') };
    });
    expect(dados.elencos.caixaSurpresa).toEqual({ waves: 16, primeiro: 'mimicoEmbrulhado',
        chefeFinal: 'reiDosPresentes', sprites: true, eventosNoAlbum: true });
    expect(dados.elencos.roleta).toEqual({ waves: 16, primeiro: 'fichaViva',
        chefeFinal: 'donoDaBanca', sprites: true, eventosNoAlbum: true });
    expect(dados.elencos.meteoros).toEqual({ waves: 10, primeiro: 'corredorDeCinzas',
        chefeFinal: 'arautoDoCometa', sprites: true, eventosNoAlbum: true });
    expect(dados.figurinha).toBe(true);
});

test('emboscada, cobrança, meteoros direcionados e chefes ativam as novas ameaças', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('caixaSurpresa');
        caixasAbertasNoEvento = CONFIG.eventos.intervaloEmboscadaCaixas - 1;
        caixasDoEvento = [{ x: 500, y: 350, tipo: 'padrao', progresso: 1 }];
        const retangulo = canvas.getBoundingClientRect();
        cliqueNoMapaDoEvento({ clientX: retangulo.left + 500 * retangulo.width / canvas.width,
            clientY: retangulo.top + 350 * retangulo.height / canvas.height });
        const emboscada = inimigos.some(inimigo => inimigo.tipo === 'mimicoEmbrulhado')
            && defesasPendentesDoEvento.length === 1;
        wave = CONFIG.eventos.waves;
        criarInimigo('reiDosPresentes');
        const rei = inimigos.at(-1);
        rei.proximaAcaoDeEventoEm = 0;
        const antesDoReforco = inimigos.length;
        atualizarMecanicaDoEvento(0);
        const reforco = inimigos.length === antesDoReforco + 1;
        voltarAoLobby();

        jogarEvento('roleta');
        girosDaRoletaNoEvento = CONFIG.eventos.intervaloCobrancaRoleta - 1;
        abrirRoletaDoEvento();
        girarRoletaDoEvento();
        const cobranca = inimigos.some(inimigo => inimigo.tipo === 'cobradorDaBanca');
        fecharRoletaDoEvento();
        wave = CONFIG.eventos.waves;
        criarInimigo('donoDaBanca');
        const dono = inimigos.at(-1);
        criarInimigo('fichaViva');
        const aliado = inimigos.at(-1);
        aliado.x = dono.x;
        aliado.y = dono.y;
        aliado.vida = 1;
        dono.proximaAcaoDeEventoEm = 0;
        atualizarMecanicaDoEvento(0);
        const reparo = aliado.vida > 1;
        voltarAoLobby();

        jogarEvento('meteoros');
        criarTorreNaPartida('padrao', 350, 350);
        numeroDaChuvaDeMeteoros = CONFIG.eventos.intervaloChuvasDirecionadasMeteoros - 1;
        proximoMeteoroEm = 0;
        atualizarMecanicaDoEvento(0);
        const direcionado = meteorosDoEvento[0].x === 350 && meteorosDoEvento[0].y === 350;
        wave = CONFIG.eventos.gruposMeteoros;
        criarInimigo('arautoDoCometa');
        const arauto = inimigos.at(-1);
        arauto.proximaAcaoDeEventoEm = 0;
        const antesDoCometa = meteorosDoEvento.length;
        atualizarMecanicaDoEvento(0);
        const cometa = meteorosDoEvento.length === antesDoCometa + 1;
        aplicarImpactoDoMeteoro({ x: arauto.x, y: arauto.y });
        const figurinhaDoChefe = inimigosDerrotadosNoAlbum.has('arautoDoCometa');
        return { emboscada, reforco, cobranca, reparo, direcionado, cometa,
            figurinhaDoChefe };
    });
    expect(dados).toEqual({ emboscada: true, reforco: true, cobranca: true,
        reparo: true, direcionado: true, cometa: true, figurinhaDoChefe: true });
});

test('sobrevivência de Meteoros espera o último grupo e a saída do Arauto', async ({ page }) => {
    const estados = await page.evaluate(() => {
        jogarEvento('meteoros');
        tempoDoEventoMs = CONFIG.eventos.duracaoSobrevivenciaMeteorosMs;
        wave = CONFIG.eventos.gruposMeteoros - 1;
        inimigosParaCriar = 1;
        atualizarMecanicaDoEvento(0);
        const antesDoGrupoFinal = partidaVencida;
        wave = CONFIG.eventos.gruposMeteoros;
        atualizarMecanicaDoEvento(0);
        const comInimigosParaCriar = partidaVencida;
        inimigosParaCriar = 0;
        criarInimigo('arautoDoCometa');
        atualizarMecanicaDoEvento(0);
        const comChefeNoCampo = partidaVencida;
        inimigos = inimigos.filter(inimigo => inimigo.tipo !== 'arautoDoCometa');
        atualizarMecanicaDoEvento(0);
        return { antesDoGrupoFinal, comInimigosParaCriar, comChefeNoCampo,
            depoisDoChefe: partidaVencida };
    });
    expect(estados).toEqual({ antesDoGrupoFinal: false, comInimigosParaCriar: false,
        comChefeNoCampo: false, depoisDoChefe: true });
});

test('falha ao salvar o prêmio não concede Fragmentos, skin nem vitória', async ({ page }) => {
    const dados = await page.evaluate(() => {
        jogarEvento('caixaSurpresa');
        const antes = fragmentosPixel;
        const gravar = localStorage.setItem.bind(localStorage);
        localStorage.setItem = (chave, valor) => {
            if (chave === CHAVE_VITORIAS_DOS_EVENTOS) throw Error('falha simulada');
            return gravar(chave, valor);
        };
        const premio = concederPremioDoEvento('caixaSurpresa');
        localStorage.setItem = gravar;
        return {
            premio, fragmentos: fragmentosPixel - antes,
            vitorias: vitoriasDosEventos.caixaSurpresa,
            skin: recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes('sentinelaDourada')
        };
    });
    expect(dados).toEqual({ premio: null, fragmentos: 0, vitorias: 0, skin: false });
});

test('waves dos eventos executam no loop real sem erro de página', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.evaluate(() => { jogarEvento('superBosses'); proximaWaveEm = Date.now() - 1; });
    await expect.poll(() => page.evaluate(() => wave)).toBeGreaterThanOrEqual(1);
    await page.waitForTimeout(1200);
    expect(await page.evaluate(() => inimigos.length > 0 || inimigosParaCriar > 0)).toBe(true);
    expect(erros).toEqual([]);
});

test('skins conquistadas antes da mudança continuam disponíveis no Álbum', async ({ page }) => {
    await page.evaluate(() => {
        recompensasPermanentesDasMissoes.skinsDesbloqueadas.push('sentinelaDourada', 'guardiaoSolar', 'sentinelaCosmica');
        salvarRecompensasPermanentesDasMissoes();
        atualizarSalvoAtivo();
    });
    await page.reload();
    const skins = await page.evaluate(() => obterSkinsDoAlbum()
        .filter(skin => ['sentinelaDourada', 'guardiaoSolar', 'sentinelaCosmica'].includes(skin.id))
        .map(skin => ({ id: skin.id, desbloqueada: skin.desbloqueada })));
    expect(skins).toHaveLength(3);
    expect(skins.every(skin => skin.desbloqueada)).toBe(true);
});

test('ao voltar da partida, retorna ao menu dos nove eventos', async ({ page }) => {
    await page.evaluate(() => { jogarEvento('meteoros'); concluirPartidaDeEvento(); voltarAoLobbyDoResultado(); });
    await expect(page.locator('.cartao-evento')).toHaveCount(9);
    expect(await page.evaluate(() => mapaPersonalizadoAtivo)).toBe(null);
    expect(await page.evaluate(() => telaDoMenuAberta)).toBe('eventos');
});
