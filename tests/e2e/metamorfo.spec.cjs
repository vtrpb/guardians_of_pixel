const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.waitForFunction(() => typeof jogarEvento === 'function');
});

test('o Metamorfo troca entre inimigos existentes, preserva a vida e adapta a resistência', async ({ page }) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const dados = await page.evaluate(() => {
        jogarEvento('superBossesMetamorfos', 'medio');
        const elenco = CONFIG.eventos.elencosSuperBosses.superBossesMetamorfos;
        const gruposFinais = mapaPersonalizadoAtivo.waves.at(-1).grupos.map(grupo => grupo.tipo);
        const subordinados = [4, 9, 14].map(indice => mapaPersonalizadoAtivo.waves[indice]
            .grupos.at(-1).tipo);
        criarInimigo('metamorfo');
        const chefe = inimigos.at(-1);
        ajustarInimigoDoEvento(chefe);
        chefe.x = 670;
        chefe.y = 350;
        const vidaInicial = chefe.vida;
        const sorteioOriginal = Math.random;
        Math.random = () => 0;
        try {
            const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos;
            tempoDoEventoMs = regra.intervaloFormaMedioMs;
            atualizarMetamorfo(chefe, 0);
            const primeira = { forma: chefe.formaMetamorfo, blindado: chefe.armaduraMetamorfo,
                formaAnterior: chefe.formaMetamorfoAnterior,
                velocidade: obterMultiplicadorDaFormaDoMetamorfo(chefe),
                duracaoDoCasulo: chefe.casuloAte - tempoDoEventoMs };
            tempoDoEventoMs = chefe.casuloAte;
            const velocidadeDepois = obterMultiplicadorDaFormaDoMetamorfo(chefe);
            aplicarDanoAoInimigo(chefe, 100, Date.now(), { tipoDaDefesa: 'padrao' });
            const vidaAntesDaTroca = chefe.vida;
            tempoDoEventoMs = chefe.proximaTransformacaoEm;
            atualizarMetamorfo(chefe, 0);
            const desenhoOriginal = desenharCorpoDoInimigo;
            const formasDesenhadas = [];
            desenharCorpoDoInimigo = inimigo => formasDesenhadas.push(inimigo.tipo);
            try {
                tempoDoEventoMs = chefe.casuloAte - 900;
                desenharSpriteDoInimigoDoEvento(chefe, 600, 300, 80);
                tempoDoEventoMs = chefe.casuloAte - 100;
                desenharSpriteDoInimigoDoEvento(chefe, 600, 300, 80);
            } finally { desenharCorpoDoInimigo = desenhoOriginal; }
            tempoDoEventoMs = chefe.casuloAte;
            const vidaDepoisDaTroca = chefe.vida;
            const danoDaPadrao = aplicarDanoAoInimigo(chefe, 100, Date.now(), { tipoDaDefesa: 'padrao' });
            const danoDaBesta = aplicarDanoAoInimigo(chefe, 100, Date.now(), { tipoDaDefesa: 'besta' });
            return { vidaInicial, vidaMaxima: chefe.vidaMaxima, vidaAntesDaTroca,
                gruposFinais, subordinados, elenco,
                vidaDepoisDaTroca, primeira, velocidadeDepois, danoDaPadrao, danoDaBesta,
                segundaForma: chefe.formaMetamorfo, defesaAdaptada: chefe.defesaAdaptada,
                formaAnteriorDaSegunda: chefe.formaMetamorfoAnterior, formasDesenhadas,
                reducaoDaPadrao: obterReducaoDoMetamorfo(chefe, 'padrao'),
                reducaoDaBesta: obterReducaoDoMetamorfo(chefe, 'besta'),
                maximo: regra.reducaoTotalMaxima };
        } finally { Math.random = sorteioOriginal; }
    });
    expect(dados.vidaInicial).toBe(30500);
    expect(dados.gruposFinais).toContain('metamorfo');
    expect(dados.subordinados).toEqual(['ecoPrismatico', 'guardiaoDoCasulo', 'quimeraDaRuptura']);
    expect(dados.elenco.comuns).toEqual(['fragmentoInstavel', 'sentinelaMutante']);
    expect(dados.vidaMaxima).toBe(30500);
    expect(dados.primeira.forma).toBe('ciano');
    expect(dados.primeira.blindado).toBe(true);
    expect(dados.primeira.velocidade).toBe(0);
    expect(dados.primeira.duracaoDoCasulo).toBe(1000);
    expect(dados.velocidadeDepois).toBeGreaterThan(1);
    expect(dados.segundaForma).toBe('sabotador');
    expect(dados.vidaDepoisDaTroca).toBe(dados.vidaAntesDaTroca);
    expect(dados.primeira.formaAnterior).toBeNull();
    expect(dados.formaAnteriorDaSegunda).toBe('ciano');
    expect(dados.formasDesenhadas).toEqual(['rapido', 'sabotador']);
    expect(dados.defesaAdaptada).toBe('padrao');
    expect(dados.reducaoDaPadrao).toBeGreaterThan(dados.reducaoDaBesta);
    expect(dados.reducaoDaPadrao).toBeLessThanOrEqual(dados.maximo);
    expect(dados.danoDaPadrao).toBeLessThan(dados.danoDaBesta);
    await page.locator('#game').screenshot({ path: 'artifacts/eventos-superbosses/metamorfo-sabotador.png' });
});

test('casulo dura um segundo, se abre e mantém o chefe parado', async ({ page }) => {
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const dados = await page.evaluate(() => {
        jogarEvento('superBossesMetamorfos', 'facil');
        criarInimigo('metamorfo');
        const chefe = inimigos.at(-1);
        ajustarInimigoDoEvento(chefe);
        chefe.x = 670;
        chefe.y = 350;
        tempoDoEventoMs = chefe.proximaTransformacaoEm;
        atualizarMetamorfo(chefe, 0);
        const inicio = tempoDoEventoMs;
        tempoDoEventoMs = inicio + 100;
        jogoPausado = true;
        desenharMapa();
        desenharInimigos();
        return { vida: chefe.vida, duracao: chefe.casuloAte - inicio,
            parado: obterMultiplicadorDaFormaDoMetamorfo(chefe) === 0 };
    });
    expect(dados).toEqual({ vida: 26500, duracao: 1000, parado: true });
    await page.locator('#game').screenshot({ path: 'artifacts/eventos-superbosses/metamorfo-casulo-fechando.png' });
    await page.evaluate(() => {
        tempoDoEventoMs = inimigos.at(-1).casuloAte - 500;
        desenharMapa();
        desenharInimigos();
        return true;
    });
    await page.locator('#game').screenshot({ path: 'artifacts/eventos-superbosses/metamorfo-casulo-novo.png' });
    const abertura = await page.evaluate(() => {
        tempoDoEventoMs = inimigos.at(-1).casuloAte - 100;
        desenharMapa();
        desenharInimigos();
        return obterMultiplicadorDaFormaDoMetamorfo(inimigos.at(-1));
    });
    expect(abertura).toBe(0);
    await page.locator('#game').screenshot({ path: 'artifacts/eventos-superbosses/metamorfo-casulo-abrindo.png' });
    const vidaDificil = await page.evaluate(() => {
        voltarAoLobby();
        jogarEvento('superBossesMetamorfos', 'dificil');
        criarInimigo('metamorfo');
        const chefe = inimigos.at(-1);
        ajustarInimigoDoEvento(chefe);
        return chefe.vida;
    });
    expect(vidaDificil).toBe(35000);
});

test('a forma Curador recupera vida com limite e o Fácil não ganha Adaptação', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const dados = await page.evaluate(() => {
        jogarEvento('superBossesMetamorfos', 'facil');
        criarInimigo('metamorfo');
        const chefe = inimigos.at(-1);
        ajustarInimigoDoEvento(chefe);
        chefe.x = 600;
        chefe.y = 350;
        const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos;
        const sorteioOriginal = Math.random;
        Math.random = () => 1;
        try {
            for (let indice = 0; indice < 4; indice++) {
                tempoDoEventoMs = (chefe.proximaTransformacaoEm || regra.intervaloFormaFacilMs);
                atualizarMetamorfo(chefe, 0);
            }
            chefe.vida -= 5000;
            tempoDoEventoMs = chefe.casuloAte;
            atualizarMetamorfo(chefe, 30000);
            return { forma: chefe.formaMetamorfo, curada: chefe.vidaCurada,
                limite: chefe.vidaMaxima * regra.limiteTotalDeCura,
                defesaAdaptada: chefe.defesaAdaptada, blindado: chefe.armaduraMetamorfo };
        } finally { Math.random = sorteioOriginal; }
    });
    expect(dados.forma).toBe('curador');
    expect(dados.curada).toBe(dados.limite);
    expect(dados.defesaAdaptada).toBeFalsy();
    expect(dados.blindado).toBe(false);
    await page.locator('#game').screenshot({ path: 'artifacts/eventos-superbosses/metamorfo-curador.png' });
    expect(erros).toEqual([]);
});

test('as formas Sabotador e Titã Glacial atacam uma torre real da arena', async ({ page }) => {
    const ataques = await page.evaluate(() => {
        jogarEvento('superBossesMetamorfos', 'medio');
        criarInimigo('metamorfo');
        const chefe = inimigos.at(-1);
        ajustarInimigoDoEvento(chefe);
        chefe.x = 300;
        chefe.y = 300;
        const torre = { tipo: 'padrao', x: 345, y: 335, alcance: 200, ultimoTiro: 0 };
        torres = [torre];
        tempoDoEventoMs = chefe.proximaTransformacaoEm;
        atualizarMetamorfo(chefe, 0);
        tempoDoEventoMs = chefe.proximaTransformacaoEm;
        atualizarMetamorfo(chefe, 0);
        tempoDoEventoMs = chefe.casuloAte;
        atualizarMetamorfo(chefe, 0);
        const tiro = tirosDosInimigos.at(-1)?.tipoDoInimigo;
        tempoDoEventoMs = chefe.proximaTransformacaoEm;
        atualizarMetamorfo(chefe, 0);
        tempoDoEventoMs = chefe.casuloAte;
        atualizarMetamorfo(chefe, 0);
        return { tiro, alvo: tirosDosInimigos.at(-1)?.alvo === torre,
            congelou: torre.estaseTemporalExpiraEm > Date.now() };
    });
    expect(ataques).toEqual({ tiro: 'metamorfo', alvo: true, congelou: true });
});

test('vitória Difícil do Metamorfo libera só sua própria dificuldade', async ({ page }) => {
    const progresso = await page.evaluate(() => {
        jogarEvento('superBossesMetamorfos', 'dificil');
        concluirPartidaDeEvento();
        const dados = JSON.parse(localStorage.getItem(CHAVE_VITORIAS_DOS_EVENTOS));
        return { metamorfos: dados.superBossesMetamorfos,
            dificuldades: dados.dificuldadesConcluidas,
            soberano: dados.superBosses || 0 };
    });
    expect(progresso.metamorfos).toBe(1);
    expect(progresso.dificuldades.superBossesMetamorfos).toEqual(['dificil']);
    expect(progresso.dificuldades.superBosses).toBeUndefined();
    expect(progresso.soberano).toBe(0);
});
