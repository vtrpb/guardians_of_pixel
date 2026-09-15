const {test,expect}=require('@playwright/test');
test('Fases 15 e 16: elencos exclusivos, camuflagem, retorno, restauração e Álbum',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.addInitScript(()=>{
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true');
        localStorage.setItem('tower-defense-2-progresso-fases-v2','16');
        for(const chave of ['guardians-of-pixel-capitulo-2-desbloqueado-v1','guardians-of-pixel-capitulo-3-desbloqueado-v1','guardians-of-pixel-correcao-progresso-fases-13-14-v1'])localStorage.setItem(chave,'true');
    });
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>{selecionarFase(15);fecharConteudoMenu();iniciarPartida();while(cutsceneDaCartaAtiva)concluirCutsceneDaCarta();definirJogoPausado(true);});
    expect(await page.evaluate(()=>{
        const resultados=[];
        for(const fase of [15,16]){
            faseSelecionada=fase;wave=20;inimigos=[];configurarWaveDoElencoExclusivo();
            while(inimigosParaCriar){proximoInimigoEm=0;atualizarWaves();}
            resultados.push(inimigos.reduce((r,i)=>(r[i.tipo]=(r[i.tipo]||0)+1,r),{}));
        }
        return resultados;
    })).toEqual([{rasurador:23,censorVelado:5,sentinelaDeIndice:4,bibliotecarioMudo:1},{fragmentoMnesico:23,lembrancaBlindada:5,ecoDaMemoria:4,devoradorDeMemorias:1}]);
    const habilidades=await page.evaluate(()=>{
        faseSelecionada=15;inimigos=[];
        criarInimigo('censorVelado');const censor=inimigos[0];
        const camuflagem=!torrePodeDetectarInimigo({tipo:'padrao'},censor)&&torrePodeDetectarInimigo({tipo:'torreDeVarredura'},censor);
        criarInimigo('sentinelaDeIndice');const indice=inimigos[1];const armadura=aplicarDanoAoInimigo(indice,100);
        criarInimigo('bibliotecarioMudo');const boss=inimigos[2];
        aplicarDanoAoInimigo(boss,boss.vidaMaxima*.36);aplicarDanoAoInimigo(boss,boss.vidaMaxima*.35);
        const convocados=inimigos.filter(i=>i.tipo==='censorVelado').length-1;
        aplicarDanoAoInimigo(boss,1);const semRepetir=inimigos.filter(i=>i.tipo==='censorVelado').length===convocados+1;
        faseSelecionada=16;inimigos=[];
        criarInimigo('ecoDaMemoria');const eco=inimigos[0];posicionarInimigoNoProgressoDoCaminho(eco,600);
        aplicarDanoAoInimigo(eco,99999);const retorno={vida:eco.vida,vezes:eco.retornosDoEcoRealizados};
        const esperado=obterPosicaoNoCaminhoPeloProgresso(420);const recuo=Math.hypot(eco.x-esperado.x,eco.y-esperado.y)<.01;
        aplicarDanoAoInimigo(eco,99999);const morreu=eco.vida<=0;
        inimigos=[];
        for(const tipo of ['fragmentoMnesico','lembrancaBlindada','devoradorDeMemorias'])criarInimigo(tipo);
        const [perto,longe,devorador]=inimigos;
        perto.vida=perto.vidaMaxima*.5;longe.vida=longe.vidaMaxima*.5;longe.x=1000;
        aplicarDanoAoInimigo(devorador,devorador.vidaMaxima*.31);
        const cura=perto.vida/perto.vidaMaxima;
        const foraDoRaio=longe.vida/longe.vidaMaxima;
        const naoCuraBoss=devorador.vida/devorador.vidaMaxima;
        aplicarDanoAoInimigo(devorador,devorador.vidaMaxima*.35);
        const limite=perto.vida===perto.vidaMaxima;
        const fragmentos=inimigos.filter(i=>i.tipo==='fragmentoMnesico').length-1;
        return {camuflagem,armadura,convocados,semRepetir,retorno,recuo,morreu,cura,foraDoRaio,naoCuraBoss,limite,fragmentos};
    });
    expect(habilidades).toEqual({camuflagem:true,armadura:75,convocados:4,semRepetir:true,retorno:{vida:227.49999999999997,vezes:1},recuo:true,morreu:true,cura:.75,foraDoRaio:.5,naoCuraBoss:.69,limite:true,fragmentos:4});
    expect(await page.evaluate(()=>{
        faseSelecionada=11;inimigos=[];criarInimigo('ecoTemporal');const eco=inimigos[0];
        aplicarDanoAoInimigo(eco,99999);
        const retorno=eco.vida===eco.vidaMaxima*CONFIG.inimigo.ecoTemporal.percentualDeVidaNoRetorno;
        faseSelecionada=10;const laboratorio=obterTipoDeBossDaFase()==='prototipoAlfa';
        faseSelecionada=12;const pontoZero=obterTipoDeBossDaFase()==='guardiaoDoPontoZero';
        return retorno&&laboratorio&&pontoZero;
    })).toBe(true);
    for(const fase of [15,16]){
        await page.evaluate(fase=>{
            faseSelecionada=fase;inimigos=[];torres=[];
            const c=obterElencoExclusivoDaFase();
            [...c.elenco.map(r=>r.tipo),c.boss].forEach((tipo,i)=>{criarInimigo(tipo);posicionarInimigoNoProgressoDoCaminho(inimigos[i],300+i*400);registrarInimigoDerrotadoNoAlbum(tipo);});
            desenharCenaPausadaDoTutorial();
        },fase);
        await page.screenshot({path:info.outputPath('elenco'+fase+'.png')});
    }
    expect(await page.evaluate(()=>{
        const tipos=[...CONFIG.arquivoProibido.elenco,...CONFIG.camaraDasMemorias.elenco].map(r=>r.tipo).concat(CONFIG.arquivoProibido.boss,CONFIG.camaraDasMemorias.boss);
        const traducoes=['en','es'].every(id=>{selecionarIdioma(id);return tipos.every(t=>obterDetalheDoInimigoNoAlbum(t,CONFIG.inimigo[t])!==CONFIG.inimigo[t].detalhe);});
        selecionarIdioma('pt-BR');
        return traducoes&&tipos.every(t=>SPRITES_DOS_ELENCOS_EXCLUSIVOS[t].length===12&&SPRITES_DOS_ELENCOS_EXCLUSIVOS[t].every(l=>l.length===12));
    })).toBe(true);
    await page.evaluate(()=>{voltarAoLobby();mostrarAlbum();selecionarCategoriaDoAlbum('bosses');abrirDetalhesDaFigurinhaDoAlbum('inimigo','devoradorDeMemorias');});
    await expect(page.locator('.album-detalhes-camada')).toContainText('restaura 25%');
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:info.outputPath('devorador-album.png')});
    await page.reload();
    expect(await page.evaluate(()=>['bibliotecarioMudo','devoradorDeMemorias','ecoDaMemoria','censorVelado'].every(t=>inimigosDerrotadosNoAlbum.has(t)))).toBe(true);
    expect(erros).toEqual([]);
});
