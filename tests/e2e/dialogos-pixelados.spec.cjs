const {test,expect}=require('@playwright/test');
test('Diálogos: retratos por falante, portal, castelo, idiomas e celular',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>mostrarConversaSecretaBloqueada());
    await expect(page.locator('#camada-conversa-portal .retrato-dialogo')).toHaveAttribute('data-personagem','desconhecido');
    await expect(page.locator('#camada-conversa-portal .retrato-dialogo')).toBeHidden();
    await page.locator('.botao-conversa-portal').first().click();
    await page.keyboard.press('Escape');await expect(page.locator('#camada-conversa-portal')).toBeVisible();
    await page.locator('.botao-conversa-portal').click();
    await page.evaluate(()=>{jogoIniciado=true;faseSelecionada=99;mostrarConversaDoSenhorDoTempo(0,'vitoria');});
    await expect(page.locator('#camada-conversa-portal .retrato-dialogo')).toHaveAttribute('data-personagem','tempo');
    await expect(page.locator('.retrato-dialogo .retrato-senhor-do-tempo')).toBeVisible();
    await expect(page.locator('.retrato-dialogo .senhor-tempo-forma-humana')).toHaveCount(1);
    await page.screenshot({path:info.outputPath('senhor-tempo-original.png')});
    await page.locator('.botao-avancar-senhor-tempo').click();await page.locator('.botao-avancar-senhor-tempo').click();
    await expect(page.locator('#camada-conversa-portal .retrato-dialogo')).toHaveAttribute('data-personagem','jogador');
    await expect(page.locator('#camada-conversa-portal .retrato-dialogo')).toBeHidden();
    await page.screenshot({path:info.outputPath('portal-jogador.png')});
    await page.evaluate(()=>{ocultarConversaNoPortal();jogoIniciado=false;faseSelecionada=17;exibirConteudoDaCutscene({tipo:'entrada-arquivo-proibido',...CONFIG.limiarDoTempo.introducao[1]});});
    await page.setViewportSize({width:390,height:844});
    await expect(page.locator('#camada-cutscene-carta .retrato-dialogo')).toHaveAttribute('data-personagem','jogador');
    await expect(page.locator('#camada-cutscene-carta .retrato-dialogo')).toBeHidden();
    await expect(page.locator('#titulo-cutscene-carta')).toHaveText('Você');
    expect(await page.locator('.carta-misteriosa').evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(36, 27, 56)');
    expect(await page.locator('#botao-continuar-cutscene-carta').evaluate(el=>{const r=el.getBoundingClientRect();return r.bottom<=innerHeight&&r.top>=0;})).toBe(true);
    await page.screenshot({path:info.outputPath('fala-longa-celular.png')});
    await page.evaluate(()=>mostrarCenaFinalDoIntervaloPerdido(1));
    await expect(page.locator('#camada-cutscene-carta .retrato-dialogo')).toHaveAttribute('data-personagem','entidade');
    await page.screenshot({path:info.outputPath('entidade-celular.png')});
    for(const idioma of ['en','es']){
        await page.evaluate(id=>{selecionarIdioma(id);exibirConteudoDaCutscene({tipo:'entrada-arquivo-proibido',...CONFIG.camaraDasMemorias.introducao[1]});},idioma);
        await expect(page.locator('#camada-cutscene-carta .retrato-dialogo')).toHaveAttribute('data-personagem','lina');
        await expect(page.locator('#camada-cutscene-carta .retrato-dialogo')).toBeHidden();
    }
    await page.screenshot({path:info.outputPath('transmissao-sem-retrato.png')});
    await page.evaluate(()=>exibirConteudoDaCutscene({tipo:'transmissao',titulo:'DRA. LINA VARELA',texto:'Teste de vídeo.',assinatura:'VÍDEO',textoDoBotao:'Continuar',meioComunicacao:'video'}));
    await expect(page.locator('#camada-cutscene-carta .retrato-dialogo')).toBeVisible();
    await page.evaluate(()=>{ocultarCutsceneDaCarta();selecionarIdioma('pt-BR');iniciarExploracaoDoCastelo();conversarNoCastelo([['???','Entre. Não me faça esperar.'],['VOCÊ','Vou descansar até amanhã.'],['GUARDAS','Você não tem permissão para entrar aqui.']]);});
    await expect(page.locator('#limbo-dialogo .retrato-dialogo')).toHaveAttribute('data-personagem','entidade');
    await page.locator('#limbo-continuar').click();
    await expect(page.locator('#limbo-dialogo .retrato-dialogo')).toHaveAttribute('data-personagem','jogador');
    await expect(page.locator('#limbo-dialogo .retrato-dialogo')).toBeHidden();
    await expect(page.locator('#limbo-falante')).toHaveText('Você');
    await page.locator('#limbo-continuar').click();
    await expect(page.locator('#limbo-dialogo .retrato-dialogo')).toHaveAttribute('data-personagem','guarda');
    await page.screenshot({path:info.outputPath('guarda-celular.png')});
    await page.locator('#limbo-continuar').click();await expect(page.locator('#limbo-dialogo')).toBeHidden();
    expect(await page.evaluate(()=>Object.values(RETRATOS_DE_DIALOGO).every(g=>g.length===12&&g.every(l=>l.length===12)))).toBe(true);
    expect(erros).toEqual([]);
});

test('Album preserva coleta e ordena fases novas depois das antigas',async({page},info)=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 const resultado=await page.evaluate(()=>{
 inimigosDerrotadosNoAlbum=new Set(['rasurador','fragmentoMnesico','normal','sombraCongelada','batedorDeInstantes','arconteDoLimiar','boss','curadorDoVazio','bibliotecarioMudo','devoradorDeMemorias']);
 const antes=[...inimigosDerrotadosNoAlbum];
 const dados=obterDadosDasCategoriasDoAlbum();
 const tipos=html=>{const div=document.createElement('div');div.innerHTML=html;return [...div.querySelectorAll('canvas[data-tipo-inimigo]')].map(c=>c.dataset.tipoInimigo);};
 mostrarAlbum();selecionarCategoriaDoAlbum('inimigos');
 return {inimigos:tipos(dados.inimigos.conteudo),bosses:tipos(dados.bosses.conteudo),preservado:JSON.stringify(antes)===JSON.stringify([...inimigosDerrotadosNoAlbum])};
 });
 expect(resultado.inimigos).toEqual(['normal','sombraCongelada','rasurador','fragmentoMnesico','batedorDeInstantes']);
 expect(resultado.bosses).toEqual(['boss','curadorDoVazio','bibliotecarioMudo','devoradorDeMemorias','arconteDoLimiar']);
 expect(resultado.preservado).toBe(true);
 await page.screenshot({path:info.outputPath('album-ordenado.png')});
});
