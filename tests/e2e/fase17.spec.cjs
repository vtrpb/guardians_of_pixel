const {test,expect}=require('@playwright/test');

test('Fase 17: acesso, história, waves, vitória única, idiomas e persistência',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.addInitScript(()=>{
        if(sessionStorage.getItem('fase17-preparada'))return;
        sessionStorage.setItem('fase17-preparada','true');
        localStorage.setItem('tower-defense-2-progresso-fases-v2','16');
        for(const chave of ['guardians-of-pixel-capitulo-2-desbloqueado-v1','guardians-of-pixel-capitulo-3-desbloqueado-v1','guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1'])localStorage.setItem(chave,'true');
    });
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    expect(await page.evaluate(()=>{
        maiorFaseConcluida=15;const bloqueada=!faseEstaDesbloqueada(17);
        maiorFaseConcluida=16;
        return bloqueada&&faseEstaDesbloqueada(17)&&!faseEstaDesbloqueada(18);
    })).toBe(true);
    await page.evaluate(()=>{selecionarFase(17);fecharConteudoMenu();});
    await page.locator('.botao-lobby-jogar').click();await page.locator('.botao-confirmar-selecao-defesas').click();
    const cena=page.locator('#camada-cutscene-carta'),botao=page.locator('#botao-continuar-cutscene-carta');
    await expect(page.locator('#titulo-cutscene-carta')).toHaveText('LIMIAR DO TEMPO');
    expect(await page.evaluate(()=>jogoPausado)).toBe(true);
    await botao.click();await expect(page.locator('#texto-cutscene-carta')).toContainText('não lembro como cheguei aqui');
    await page.keyboard.press('Escape');await expect(cena).toBeVisible();
    await page.setViewportSize({width:390,height:844});
    await cena.screenshot({path:info.outputPath('historia17-celular.png')});
    await botao.click();await botao.click();await botao.click();
    expect(await page.evaluate(()=>jogoPausado)).toBe(false);
    await page.setViewportSize({width:1440,height:1000});
    expect(await page.evaluate(()=>{
        definirJogoPausado(true);wave=19;iniciarProximaWave();desenharCenaPausadaDoTutorial();
        return {boss:obterTipoDeBossDaFase(),vagas:obterLimiteDeTorres(),ecos:inimigosEcosTemporaisParaCriar,sentinelas:inimigosSentinelasCronologicasParaCriar,fendas:obterPosicoesDasFendasTemporais().length};
    })).toEqual({boss:'arconteDoLimiar',vagas:15,ecos:0,sentinelas:0,fendas:0});
    await page.screenshot({path:info.outputPath('mapa17.png')});
    await page.evaluate(()=>finalizarPartidaComVitoria());
    await expect(page.locator('#titulo-cutscene-carta')).toHaveText('PASSAGEM PRESERVADA');
    const saldo=await page.evaluate(()=>fragmentosPixel);
    for(let i=0;i<5;i++)await botao.click();
    await expect(page.locator('#texto-cutscene-carta')).toContainText('Senhor do Tempo espera');
    await botao.click();await expect(page.locator('#camada-resultado')).toBeVisible();
    await page.evaluate(()=>finalizarPartidaComVitoria());
    expect(await page.evaluate(()=>fragmentosPixel)).toBe(saldo);
    await page.reload();
    expect(await page.evaluate(()=>({progresso:maiorFaseConcluida,final:faseEstaDesbloqueada(18)}))).toEqual({progresso:17,final:true});
    expect(await page.evaluate(()=>['en','es'].every(idioma=>{
        selecionarIdioma(idioma);
        return [...CONFIG.limiarDoTempo.introducao,...CONFIG.limiarDoTempo.final].every(e=>localizar(e.texto)!==e.texto);
    }))).toBe(true);
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>{selecionarFase(17);fecharConteudoMenu();iniciarPartida(true);});
    await expect(cena).toBeHidden();
    expect(await page.evaluate(()=>{mapaPersonalizadoAtivo={};return !faseAtualEhLimiarDoTempo();})).toBe(true);
    expect(erros).toEqual([]);
});
