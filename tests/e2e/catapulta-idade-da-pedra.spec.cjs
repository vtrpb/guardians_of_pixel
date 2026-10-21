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

test('primeira vitória libera a Catapulta no slot e na repetição do evento', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        const bloqueadaAntes = !torreEstaDesbloqueada('catapulta');
        mostrarEventos();
        const cartaoAntes = conteudoMenu.querySelector('.cartao-evento[data-evento="idadeDaPedra"]').textContent;
        jogarEvento('idadeDaPedra');
        const indisponivelAntes = !defesaEstaDisponivelNaPartida('catapulta');
        concluirPartidaDeEvento();
        const liberadaDepois = torreEstaDesbloqueada('catapulta');
        const premioMostrado = descricaoResultado.textContent;
        voltarAoLobbyDoResultado();
        const disponivelNaCampanha = defesaEstaDisponivelNaPartida('catapulta');
        mostrarEventos();
        const cartaoDepois = conteudoMenu.querySelector('.cartao-evento[data-evento="idadeDaPedra"]').textContent;
        defesasSelecionadasParaPartida = new Set(['padrao', 'catapulta']);
        salvarSelecaoDeDefesas();
        jogarEvento('idadeDaPedra');
        const disponivelNaRepeticao = defesaEstaDisponivelNaPartida('catapulta');
        selecionarTipoDeTorre('catapulta');
        const selecionada = tipoDeTorreParaConstruir === 'catapulta';
        return { bloqueadaAntes, indisponivelAntes, liberadaDepois, premioMostrado,
            disponivelNaCampanha, disponivelNaRepeticao, selecionada,
            cartaoAntes, cartaoDepois, salvas: [...defesasSelecionadasParaPartida] };
    });
    expect(resultado).toMatchObject({ bloqueadaAntes: true, indisponivelAntes: true,
        liberadaDepois: true, disponivelNaCampanha: true, disponivelNaRepeticao: true, selecionada: true,
        salvas: ['padrao', 'catapulta'] });
    expect(resultado.premioMostrado).toContain('Catapulta');
    expect(resultado.cartaoAntes).toContain('Catapulta');
    expect(resultado.cartaoAntes).not.toContain('pesado e Catapulta');
    expect(resultado.cartaoDepois).toContain('pesado e Catapulta');
    await expect(page.locator('#botao-catapulta')).toBeVisible();
    await expect(page.locator('#botao-catapulta')).toBeEnabled();
    await page.reload();
    expect(await page.evaluate(() => ({ liberada: torreEstaDesbloqueada('catapulta'),
        selecionada: defesasSelecionadasParaPartida.has('catapulta') }))).toEqual({ liberada: true, selecionada: true });
});

test('vitória antiga libera a Catapulta; disparo acerta inimigos em área', async ({ page }) => {
    const dados = await page.evaluate(() => {
        localStorage.setItem(CHAVE_VITORIAS_DOS_EVENTOS, JSON.stringify({ idadeDaPedra: 1 }));
        atualizarSalvoAtivo();
        const desbloqueada = torreEstaDesbloqueada('catapulta');
        jogarEvento('idadeDaPedra');
        torres = [];
        inimigos = [];
        const torre = criarTorreNaPartida('catapulta', 300, 300);
        torre.nivel = 3;
        atualizarAtributosDaTorreComBonus(torre);
        criarInimigo('mamuteLanoso');
        criarInimigo('mamuteLanoso');
        inimigos[0].x = 380; inimigos[0].y = 300;
        inimigos[1].x = 425; inimigos[1].y = 300;
        const vidasAntes = inimigos.map(inimigo => inimigo.vida);
        atacarComTorres(Date.now());
        const tiro = tiros.find(item => item.tipoDaTorre === 'catapulta');
        if (tiro) {
            desenharPedraDaCatapulta(tiro);
            tiro.x = tiro.alvo.x;
            tiro.y = tiro.alvo.y;
            moverTiros();
        }
        desenharCorpoDaTorre(torre.x, torre.y, obterEstiloDaTorre(torre));
        desenharExplosoesDosExplosivos();
        return { desbloqueada, raio: CONFIG.torre.tipos.catapulta.raioDanoEmArea,
            raioMelhorado: tiro?.raioDanoEmArea, danoMelhorado: tiro?.dano,
            tiro: Boolean(tiro), vidasAntes, vidasDepois: inimigos.map(inimigo => inimigo.vida),
            impacto: explosoesDosExplosivos.at(-1)?.tipoVisual };
    });
    expect(dados.desbloqueada).toBe(true);
    expect(dados.raio).toBe(70);
    expect(dados.raioMelhorado).toBe(85);
    expect(dados.danoMelhorado).toBe(150);
    expect(dados.tiro).toBe(true);
    expect(dados.vidasDepois).toHaveLength(2);
    expect(dados.vidasDepois[0]).toBeLessThan(dados.vidasAntes[0]);
    expect(dados.vidasDepois[1]).toBeLessThan(dados.vidasAntes[1]);
    expect(dados.impacto).toBe('catapulta');
});

test('Catapulta desbloqueada não passa para outro slot', async ({ page }) => {
    await page.evaluate(() => {
        jogarEvento('idadeDaPedra');
        concluirPartidaDeEvento();
        voltarAoLobbyDoResultado();
    });
    expect(await page.evaluate(() => torreEstaDesbloqueada('catapulta'))).toBe(true);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => {
        setTimeout(() => trocarSalvoAtivo(2), 0);
    })]);
    await page.waitForFunction(() => typeof torreEstaDesbloqueada === 'function');
    expect(await page.evaluate(() => torreEstaDesbloqueada('catapulta'))).toBe(false);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => {
        setTimeout(() => trocarSalvoAtivo(1), 0);
    })]);
    await page.waitForFunction(() => typeof torreEstaDesbloqueada === 'function');
    expect(await page.evaluate(() => torreEstaDesbloqueada('catapulta'))).toBe(true);
});

test('falha ao salvar a vitória não libera a Catapulta', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        jogarEvento('idadeDaPedra');
        const gravar = localStorage.setItem.bind(localStorage);
        localStorage.setItem = (chave, valor) => {
            if (chave === CHAVE_VITORIAS_DOS_EVENTOS) throw Error('falha simulada');
            return gravar(chave, valor);
        };
        const premio = concederPremioDoEvento('idadeDaPedra');
        localStorage.setItem = gravar;
        return { premio, vitorias: vitoriasDosEventos.idadeDaPedra,
            desbloqueada: torreEstaDesbloqueada('catapulta') };
    });
    expect(resultado).toEqual({ premio: null, vitorias: 0, desbloqueada: false });
});
