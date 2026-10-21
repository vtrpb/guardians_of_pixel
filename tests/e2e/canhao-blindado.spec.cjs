const { test, expect } = require('@playwright/test');

test('Canhao Blindado: compra, alvos exclusivos, melhorias e quatorze impactos', async ({ page }, testInfo) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => {
        fragmentosPixel = 1000;
        mostrarLoja();
        comprarItemDaLoja('canhaoBlindado');
        confirmarCompraDaLoja();
    });
    expect(await page.evaluate(() => torreEstaDesbloqueada('canhaoBlindado'))).toBe(true);
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    expect(await page.evaluate(() => torreEstaDesbloqueada('canhaoBlindado'))).toBe(true);
    const resultado = await page.evaluate(() => {
        fecharConteudoMenu(); iniciarPartida(false);
        for (let i = 0; i < 3; i++) concluirCutsceneDaCarta();
        definirJogoPausado(true);
        inimigos.length = 0; torres.length = 0; tiros.length = 0;
        const torre = { tipo: 'canhaoBlindado', x: 200, y: 200, nivel: 0, ultimoTiro: 0, modoDeAlvo: 'primeiro' };
        atualizarAtributosDaTorreComBonus(torre); torres.push(torre);
        criarInimigo('normal'); criarInimigo('sabotador');
        inimigos.forEach(inimigo => Object.assign(inimigo, { x: 250, y: 200 }));
        const alvos = ['primeiro', 'ultimo', 'aleatorio'].map(modo => {
            torre.modoDeAlvo = modo;
            return escolherAlvoDaTorre(torre, true)?.tipo;
        });
        atacarComTorres(10000);
        const disparo = tiros.length === 1 && tiros[0].alvo.tipo === 'sabotador';
        inimigos.pop(); tiros.length = 0;
        atacarComTorres(20000);
        const ignoraNormal = tiros.length === 0;
        dinheiro = 10000;
        selecionarTorre(torre);
        const antes = { dano: torre.dano, alcance: torre.alcance, velocidade: torre.velocidadeAtaque };
        for (const melhoria of ['dano', 'velocidade', 'alcance', 'dano', 'dano', 'dano']) melhorarTorreSelecionada(melhoria);
        const melhorias = torre.nivel === 5 && torre.dano > antes.dano && torre.alcance > antes.alcance && torre.velocidadeAtaque < antes.velocidade;
        for (let i = 0; i < 13; i++) atingirTorreComTiroInimigo(torre);
        const sobreviveTreze = torres.includes(torre);
        atingirTorreComTiroInimigo(torre);
        return { alvos, disparo, ignoraNormal, melhorias, sobreviveTreze, destruida: !torres.includes(torre) };
    });
    expect(resultado).toEqual({ alvos: ['sabotador', 'sabotador', 'sabotador'], disparo: true, ignoraNormal: true, melhorias: true, sobreviveTreze: true, destruida: true });
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => mostrarAlbum());
    const cartaoDoCanhao = page.locator('.album-cartao-torre').filter({ hasText: 'Canhão Blindado' });
    await expect(cartaoDoCanhao).toHaveCount(6);
    await cartaoDoCanhao.first().click();
    await expect(page.locator('.album-detalhes-painel')).toContainText('Sabotadores');
    await page.screenshot({ path: testInfo.outputPath('album-canhao.png'), fullPage: true });
    expect(erros).toEqual([]);
});

test('Canhão Blindado protege a si mesmo de dois Sabotadores juntos', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        fecharConteudoMenu(); iniciarPartida(false);
        for (let i = 0; i < 3; i++) concluirCutsceneDaCarta();
        definirJogoPausado(true);
        inimigos.length = 0; torres.length = 0; tiros.length = 0; tirosDosInimigos.length = 0;
        const torre = { tipo: 'canhaoBlindado', x: 200, y: 200, nivel: 0, ultimoTiro: 0, modoDeAlvo: 'primeiro' };
        atualizarAtributosDaTorreComBonus(torre); torres.push(torre);
        criarInimigo('sabotador'); criarInimigo('sabotador');
        inimigos.forEach((inimigo, indice) => Object.assign(inimigo, { x: 250, y: 200 + indice * 20 }));
        const vidaInicial = inimigos.map(inimigo => inimigo.vida);
        for (let agora = 100; agora <= 8000 && inimigos.length && torres.includes(torre); agora += 100) {
            atacarTorresComInimigos(agora);
            atacarComTorres(agora);
            moverTiros(6);
            moverTirosDosInimigos(6);
            for (let indice = inimigos.length - 1; indice >= 0; indice--) {
                if (inimigos[indice].vida <= 0) inimigos.splice(indice, 1);
            }
        }
        return { vidaInicial, abatidos: 2 - inimigos.length, torreViva: torres.includes(torre), tirosRecebidos: torre.tirosRecebidos || 0 };
    });
    expect(resultado.vidaInicial).toEqual([75, 75]);
    expect(resultado.abatidos).toBe(2);
    expect(resultado.torreViva).toBe(true);
});
