const { test, expect } = require('@playwright/test');

test('Novas defesas: desbloqueios, laser crescente, perda de foco e melhorias', async ({ page }, testInfo) => {
    const erros = []; page.on('pageerror', erro => erros.push(erro.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/'); await page.locator('#botao-jogar-menu-inicial').click();
    expect(await page.evaluate(() => {
        maiorFaseConcluida = 15;
        progressaoDeNivel.experienciaTotal = 7699;
        const bloqueadas = !torreEstaDesbloqueada('torreFeixeContinuo') && !torreEstaDesbloqueada('torreLongoAlcance');
        maiorFaseConcluida = 16; progressaoDeNivel.experienciaTotal = 7700;
        concederRecompensasDoNivelAtual();
        salvarProgressoDasFases();
        return bloqueadas && torreEstaDesbloqueada('torreFeixeContinuo') && torreEstaDesbloqueada('torreLongoAlcance');
    })).toBe(true);
    await page.reload(); await page.locator('#botao-jogar-menu-inicial').click();
    expect(await page.evaluate(() => torreEstaDesbloqueada('torreLongoAlcance'))).toBe(true);
    const resultado = await page.evaluate(() => {
        fecharConteudoMenu(); iniciarPartida(false);
        for (let i=0;i<3;i++) concluirCutsceneDaCarta();
        definirJogoPausado(true);
        inimigos.length = 0; torres.length = 0; tiros.length = 0;
        const torre = {tipo:'torreFeixeContinuo',x:200,y:200,nivel:0,ultimoTiro:0,modoDeAlvo:'primeiro'};
        atualizarAtributosDaTorreComBonus(torre); torres.push(torre);
        criarInimigo('normal'); const alvo = inimigos[0]; Object.assign(alvo,{x:260,y:200,vida:10000,vidaMaxima:10000});
        const danos = [];
        for (let i=1; i<=12; i++) { const vida = alvo.vida; atacarComTorres(i*500); danos.push(vida-alvo.vida); }
        const semProjetil = tiros.length === 0;
        alvo.x = 1100; atacarComTorres(6500); const zerou = torre.pulsosDoFeixe === 0;
        alvo.x = 260; const vida = alvo.vida; atacarComTorres(7000); const reinicio = vida-alvo.vida;
        torre.atordoadaPeloUrsoAte = 8000; atacarComTorres(7500);
        const interrompido = !torre.alvoAtual && torre.pulsosDoFeixe === 0;
        torre.atordoadaPeloUrsoAte = 0; alvo.camuflado = true; atacarComTorres(8500);
        const camuflado = !torre.alvoAtual;
        alvo.camuflado = false; atacarComTorres(9000);
        const visuais = [];
        for (const tipo of ['torreFeixeContinuo','torreLongoAlcance']) for (let nivel=0;nivel<4;nivel++) {
            torre.tipo=tipo; torre.nivel=nivel; atualizarAtributosDaTorreComBonus(torre);
            visuais.push(Boolean(obterEstiloDaTorre(torre)) && Number.isFinite(torre.dano));
        }
        torre.tipo='torreFeixeContinuo'; torre.nivel=3; atualizarAtributosDaTorreComBonus(torre); atacarComTorres(9500);
        desenharCenaPausadaDoTutorial();
        return {danos,semProjetil,zerou,reinicio,interrompido,camuflado,visuais};
    });
    expect(resultado.danos).toEqual([5,10,15,20,25,30,35,40,45,50,50,50]);
    expect(resultado).toMatchObject({semProjetil:true,zerou:true,reinicio:5,interrompido:true,camuflado:true});
    expect(resultado.visuais.every(Boolean)).toBe(true);
    await page.screenshot({path:testInfo.outputPath('feixe.png')});
    await page.evaluate(() => {
        torres.length = 0; inimigos.length = 0;
        maiorFaseConcluida = 16;
        defesasSelecionadasParaPartida = new Set(['padrao','torreFeixeContinuo','torreLongoAlcance']);
        dinheiro = 5000;
        atualizarBotoesDeConstrucao();
    });
    await expect(page.locator('#botao-feixe-continuo')).toBeVisible();
    await expect(page.locator('#botao-longo-alcance')).toBeVisible();
    await page.locator('#botao-feixe-continuo').click();
    const mapa = page.locator('#game');
    const caixa = await mapa.boundingBox();
    await mapa.click({position:{x:100*caixa.width/1200,y:440*caixa.height/700}});
    expect(await page.evaluate(() => torres[0].tipo)).toBe('torreFeixeContinuo');
    await page.evaluate(() => {
        selecionarTorre(torres[0]);
        melhorarTorreSelecionada(); melhorarTorreSelecionada(); melhorarTorreSelecionada();
        desenharCenaPausadaDoTutorial();
    });
    expect(await page.evaluate(() => torres[0].nivel)).toBe(3);
    expect(erros).toEqual([]);
});
