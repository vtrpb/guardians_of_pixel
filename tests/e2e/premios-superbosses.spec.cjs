const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});

test('torre de prêmio usa só a maior dificuldade salva no slot', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        const bloqueadaAntes = !torreEstaDesbloqueada('torreMetamorfa');
        jogarEvento('superBossesMetamorfos', 'facil');
        concluirPartidaDeEvento();
        const facil = obterBonusDeDanoDaTorrePremio('torreMetamorfa');
        const textoDoResultado = descricaoResultado.textContent;
        voltarAoLobbyDoResultado();
        jogarEvento('superBossesMetamorfos', 'medio');
        concluirPartidaDeEvento();
        const medio = obterBonusDeDanoDaTorrePremio('torreMetamorfa');
        voltarAoLobbyDoResultado();
        jogarEvento('superBossesMetamorfos', 'facil');
        concluirPartidaDeEvento();
        const repetida = obterBonusDeDanoDaTorrePremio('torreMetamorfa');
        voltarAoLobbyDoResultado();
        jogarEvento('superBossesMetamorfos', 'dificil');
        concluirPartidaDeEvento();
        const dificil = obterBonusDeDanoDaTorrePremio('torreMetamorfa');
        const torre = criarTorreNaPartida('torreMetamorfa', 300, 300);
        const danoDaTorre = torre.dano;
        return { bloqueadaAntes, liberada: torreEstaDesbloqueada('torreMetamorfa'),
            facil, medio, repetida, dificil, danoDaTorre, textoDoResultado,
            dificuldades: obterDificuldadesConcluidasDoSuperBoss('superBossesMetamorfos') };
    });
    expect(resultado).toMatchObject({ bloqueadaAntes: true, liberada: true,
        facil: 0.05, medio: 0.10, repetida: 0.10, dificil: 0.15, danoDaTorre: 55 });
    expect(resultado.textoDoResultado).toContain('Torre Metamorfa');
    expect(resultado.textoDoResultado).toContain('+5%');
    expect(resultado.dificuldades).toEqual(['facil', 'medio', 'dificil']);
    await page.reload();
    expect(await page.evaluate(() => obterBonusDeDanoDaTorrePremio('torreMetamorfa'))).toBe(0.15);
});

test('vitórias antigas liberam os novos prêmios sem inventar dificuldade', async ({ page }) => {
    await page.evaluate(() => {
        localStorage.setItem(CHAVE_VITORIAS_DOS_EVENTOS, JSON.stringify({
            superBossesMecanicos: 1, superBossesAbissais: 1, superBossesAcidos: 1,
            dificuldadesConcluidas: { superBossesAbissais: ['medio'], superBossesAcidos: ['facil'] }
        }));
        atualizarSalvoAtivo();
    });
    await page.reload();
    const resultado = await page.evaluate(() => ({
        magnetica: torreEstaDesbloqueada('torreMagnetica'),
        bonusDesconhecido: obterBonusDeDanoDaTorrePremio('torreMagnetica'),
        coral: obterSkinsDoAlbum().find(skin => skin.id === 'coralAbissal').desbloqueada,
        corrosao: obterSkinsDoAlbum().find(skin => skin.id === 'corrosaoViva').desbloqueada,
        corDoCoral: obterCoresDaSkinSuperBoss('coralAbissal').corBase,
        corDaCorrosao: obterCoresDaSkinSuperBoss('corrosaoViva').corBase
    }));
    expect(resultado).toEqual({ magnetica: true, bonusDesconhecido: 0,
        coral: true, corrosao: true, corDoCoral: '#247f94', corDaCorrosao: '#45642d' });
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => setTimeout(() => trocarSalvoAtivo(2), 0))]);
    expect(await page.evaluate(() => ({ magnetica: torreEstaDesbloqueada('torreMagnetica'),
        coral: obterSkinsDoAlbum().find(skin => skin.id === 'coralAbissal').desbloqueada })))
        .toEqual({ magnetica: false, coral: false });
});

test('torres atacam nos modos próprios e skins podem ser equipadas separadamente', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesAbissais', 'medio');
        concluirPartidaDeEvento();
        voltarAoLobbyDoResultado();
        jogarEvento('superBossesAcidos', 'facil');
        concluirPartidaDeEvento();
        voltarAoLobbyDoResultado();
        mostrarAlbum();
        alternarSkinPeloAlbum('coralAbissal');
        alternarSkinPeloAlbum('corrosaoViva');
        const skinsEquipadas = { ...recompensasPermanentesDasMissoes.skinsDeTorresEquipadas };
        const corDosTorpedos = obterEstiloDaTorre({ tipo: 'torreTorpedos', nivel: 0 }).corBase;
        const corDosEsporos = obterEstiloDaTorre({ tipo: 'torreEsporos', nivel: 0 }).corBase;
        jogarEvento('superBossesMecanicos', 'facil');
        torres = []; inimigos = []; tiros = [];
        const caminho = obterCaminhoAtual();
        const ponto = { x: (caminho[0].x + caminho[1].x) / 2,
            y: (caminho[0].y + caminho[1].y) / 2 };
        const magnetica = criarTorreNaPartida('torreMagnetica', ponto.x + 50, ponto.y + 50);
        criarInimigo('droneDeSucata');
        inimigos[0].x = ponto.x; inimigos[0].y = ponto.y;
        const distanciaAnterior = Math.hypot(inimigos[0].x - caminho[0].x, inimigos[0].y - caminho[0].y);
        atacarComTorres(Date.now());
        const tiroMagnetico = tiros.find(tiro => tiro.tipoDaTorre === 'torreMagnetica');
        const vidaAnterior = inimigos[0].vida;
        tiroMagnetico.x = tiroMagnetico.alvo.x;
        tiroMagnetico.y = tiroMagnetico.alvo.y;
        moverTiros();
        const distanciaPosterior = Math.hypot(inimigos[0].x - caminho[0].x, inimigos[0].y - caminho[0].y);
        const vidaPosterior = inimigos[0].vida;
        torres = []; inimigos = []; tiros = [];
        const metamorfa = criarTorreNaPartida('torreMetamorfa', ponto.x + 50, ponto.y + 50);
        criarInimigo('droneDeSucata');
        inimigos[0].x = ponto.x; inimigos[0].y = ponto.y;
        const modos = [];
        for (let indice = 0; indice < 3; indice++) {
            atacarComTorres(Date.now() + indice * 3000);
            modos.push({ modo: tiros.at(-1)?.modoMetamorfo,
                dano: tiros.at(-1)?.dano, raio: tiros.at(-1)?.raioDanoEmArea });
        }
        return { skinsEquipadas, corDosTorpedos, corDosEsporos,
            distanciaAnterior, distanciaPosterior, vidaAnterior, vidaPosterior,
            raioMagnetico: tiroMagnetico.raioDanoEmArea, modos,
            danoMetamorfa: metamorfa.dano, danoMagnetica: magnetica.dano };
    });
    expect(resultado.skinsEquipadas).toMatchObject({
        torreTorpedos: 'coralAbissal', torreEsporos: 'corrosaoViva' });
    expect(resultado.corDosTorpedos).toBe('#247f94');
    expect(resultado.corDosEsporos).toBe('#45642d');
    expect(resultado.distanciaPosterior).toBeLessThan(resultado.distanciaAnterior);
    expect(resultado.vidaPosterior).toBeLessThan(resultado.vidaAnterior);
    expect(resultado.raioMagnetico).toBe(75);
    expect(resultado.modos.map(modo => modo.modo)).toEqual(['rapido', 'pesado', 'area']);
    expect(resultado.modos[0].dano).toBeLessThan(resultado.modos[1].dano);
    expect(resultado.modos[2].raio).toBe(60);
    await page.reload();
    expect(await page.evaluate(() => recompensasPermanentesDasMissoes.skinsDeTorresEquipadas))
        .toMatchObject({ torreTorpedos: 'coralAbissal', torreEsporos: 'corrosaoViva' });
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => setTimeout(() => trocarSalvoAtivo(2), 0))]);
    expect(await page.evaluate(() => recompensasPermanentesDasMissoes.skinsDeTorresEquipadas))
        .toEqual({});
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => setTimeout(() => trocarSalvoAtivo(1), 0))]);
    expect(await page.evaluate(() => recompensasPermanentesDasMissoes.skinsDeTorresEquipadas))
        .toMatchObject({ torreTorpedos: 'coralAbissal', torreEsporos: 'corrosaoViva' });
});

test('varias Magneticas nao prendem o mesmo inimigo no comeco do caminho', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesMecanicos', 'facil');
        inimigos = [];
        criarInimigo('droneDeSucata');
        const inimigo = inimigos[0];
        inimigo.vida = 10000;
        inimigo.vidaMaxima = 10000;
        const caminho = obterCaminhoDoInimigo(inimigo);
        const comprimentoInicial = Math.hypot(caminho[1].x - caminho[0].x, caminho[1].y - caminho[0].y);
        posicionarInimigoNoProgressoDoCaminho(inimigo, Math.min(100, comprimentoInicial / 2));
        const progressoInicial = calcularProgressoDoInimigo(inimigo);
        const tiro = { alvo: inimigo, dano: 1, raioDanoEmArea: 75,
            puxaoNoCaminho: 26, duracaoExplosaoEmQuadros: 18,
            tipoDaTorre: 'torreMagnetica' };
        for (let indice = 0; indice < 3; indice++) detonarTiroDeEsporos(tiro);
        const aposTresDisparos = calcularProgressoDoInimigo(inimigo);
        avancarInimigoNoCaminho(inimigo, 25);
        detonarTiroDeEsporos(tiro);
        const antesDeRecuperar = calcularProgressoDoInimigo(inimigo);
        avancarInimigoNoCaminho(inimigo, 53);
        const antesDoNovoPuxao = calcularProgressoDoInimigo(inimigo);
        detonarTiroDeEsporos(tiro);
        const aposNovoPuxao = calcularProgressoDoInimigo(inimigo);
        return { progressoInicial, aposTresDisparos, antesDeRecuperar,
            antesDoNovoPuxao, aposNovoPuxao };
    });
    expect(resultado.progressoInicial - resultado.aposTresDisparos).toBeCloseTo(26, 2);
    expect(resultado.antesDeRecuperar - resultado.aposTresDisparos).toBeCloseTo(25, 2);
    expect(resultado.antesDoNovoPuxao - resultado.aposNovoPuxao).toBeCloseTo(26, 2);
    expect(resultado.aposNovoPuxao).toBeGreaterThan(resultado.progressoInicial);
});

test('Torre Magnetica tem limite de duas por partida e libera vaga ao vender', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        torres = [];
        const configuracao = CONFIG.torre.tipos.torreMagnetica;
        const resumo = obterResumoDaConfiguracaoDaTorre(configuracao);
        const antes = atingiuLimiteDoTipoDeTorre('torreMagnetica');
        criarTorreNaPartida('torreMagnetica', 200, 200);
        const comUma = atingiuLimiteDoTipoDeTorre('torreMagnetica');
        criarTorreNaPartida('torreMagnetica', 350, 200);
        const comDuas = atingiuLimiteDoTipoDeTorre('torreMagnetica');
        torres.splice(0, 1);
        const depoisDaVenda = atingiuLimiteDoTipoDeTorre('torreMagnetica');
        return { limite: configuracao.limitePorPartida, resumo, antes, comUma, comDuas, depoisDaVenda };
    });
    expect(resultado).toMatchObject({ limite: 2, antes: false, comUma: false,
        comDuas: true, depoisDaVenda: false });
    expect(resultado.resumo).toContain('Limite de 2 Torre Magnética por partida.');
});

test('falha ao salvar não libera torre nem bônus de dificuldade', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesMecanicos', 'dificil');
        const gravar = localStorage.setItem.bind(localStorage);
        localStorage.setItem = (chave, valor) => {
            if (chave === CHAVE_VITORIAS_DOS_EVENTOS) throw Error('falha simulada');
            return gravar(chave, valor);
        };
        const premio = concederPremioDoEvento('superBossesMecanicos');
        localStorage.setItem = gravar;
        return { premio, liberada: torreEstaDesbloqueada('torreMagnetica'),
            bonus: obterBonusDeDanoDaTorrePremio('torreMagnetica'),
            vitorias: vitoriasDosEventos.superBossesMecanicos };
    });
    expect(resultado).toEqual({ premio: null, liberada: false, bonus: 0, vitorias: 0 });
});

test('as torres de prêmio não mudam a cor antiga do Domínio do Obliterador', async ({ page }) => {
    const resultado = await page.evaluate(() => ({
        cor: obterEstiloDeDominio('obliterador', CONFIG.torre.tipos.obliterador.visualBase).corBase,
        indice: obterTiposDeDominio().indexOf('obliterador'),
        ultimos: obterTiposDeDominio().slice(-3)
    }));
    expect(resultado).toEqual({ cor: 'hsl(20 42% 28%)', indice: 8,
        ultimos: ['catapulta', 'torreMagnetica', 'torreMetamorfa'] });
});

test('Sentinela Cósmica evolui por nível e dificuldade sem perder a progressão antiga', async ({ page }) => {
    const cores = await page.evaluate(() => {
        recompensasPermanentesDasMissoes.skinTorrePadraoEquipada = 'sentinelaCosmica';
        const registrar = dificuldade => localStorage.setItem(CHAVE_VITORIAS_DOS_EVENTOS,
            JSON.stringify({ superBosses: 1, dificuldadesConcluidas: { superBosses: [dificuldade] } }));
        const cor = nivel => obterEstiloDaTorre({ tipo: 'padrao', nivel }).corBase;
        registrar('facil');
        const facil = [cor(0), cor(1)];
        registrar('medio');
        const medio = [cor(0), cor(1)];
        registrar('dificil');
        const dificil = [cor(0), cor(1)];
        return { facil, medio, dificil };
    });
    expect(cores).toEqual({ facil: ['#493486', '#6545a8'],
        medio: ['#6545a8', '#865bca'], dificil: ['#865bca', '#b581ed'] });
});
