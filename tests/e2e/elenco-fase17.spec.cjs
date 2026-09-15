const {test,expect}=require('@playwright/test');
test('Elenco do Limiar: waves, habilidades, desenhos, Álbum e isolamento',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>{
        maiorFaseConcluida=16;capitulo3Desbloqueado=true;
        selecionarFase(17);fecharConteudoMenu();iniciarPartida();
        while(cutsceneDaCartaAtiva)concluirCutsceneDaCarta();definirJogoPausado(true);
    });
    const waves=await page.evaluate(()=>{
        const resultados=[];
        for(const numero of [1,3,6,20]){
            wave=numero;configurarWaveDoElencoExclusivo();inimigos=[];
            while(inimigosParaCriar>0){proximoInimigoEm=0;atualizarWaves();}
            resultados.push(inimigos.reduce((r,i)=>(r[i.tipo]=(r[i.tipo]||0)+1,r),{}));
        }
        return resultados;
    });
    expect(waves).toEqual([
        {batedorDeInstantes:4},
        {batedorDeInstantes:6,couracadoDeAmpulheta:1},
        {batedorDeInstantes:9,couracadoDeAmpulheta:1,tecelaoDeSegundos:1},
        {batedorDeInstantes:23,couracadoDeAmpulheta:5,tecelaoDeSegundos:3,arconteDoLimiar:1}
    ]);
    const habilidades=await page.evaluate(()=>{
        inimigos=[];
        criarInimigo('batedorDeInstantes');const b=inimigos[0];
        const normal=obterVelocidadeAtualDoInimigo(b);b.vida=b.vidaMaxima*.5;
        const aceleracao=obterVelocidadeAtualDoInimigo(b)/normal;
        b.congeladoAte=Date.now()+10000;const congelado=obterVelocidadeAtualDoInimigo(b);
        criarInimigo('couracadoDeAmpulheta');const c=inimigos[1];
        const dano=aplicarDanoAoInimigo(c,100);
        criarInimigo('tecelaoDeSegundos');const t=inimigos[2];
        posicionarInimigoNoProgressoDoCaminho(t,600);
        aplicarDanoAoInimigo(t,t.vidaMaxima*.51);
        const convocados=inimigos.slice(3);
        aplicarDanoAoInimigo(t,1);
        const umaVez=inimigos.length===5;
        const local=convocados.every(i=>i.x===t.x&&i.y===t.y&&i.alvo===t.alvo);
        criarInimigo('arconteDoLimiar');const boss=inimigos[inimigos.length-1];
        torres=[0,1,2].map(i=>({tipo:'padrao',x:i*100,y:0,pulsosDoFeixe:5}));
        const agora=Date.now();
        aplicarDanoAoInimigo(boss,boss.vidaMaxima*.31,agora);
        const seladas=torres.filter(t=>t.estaseTemporalExpiraEm===agora+2000).length;
        aplicarDanoAoInimigo(boss,boss.vidaMaxima*.35,agora);
        const reforcos=inimigos.filter(i=>i.tipo==='couracadoDeAmpulheta').length-1;
        aplicarDanoAoInimigo(boss,999999,agora);
        const semRepetir=inimigos.filter(i=>i.tipo==='couracadoDeAmpulheta').length-1===reforcos;
        criarInimigo('tecelaoDeSegundos');const morto=inimigos[inimigos.length-1];
        const antes=inimigos.length;aplicarDanoAoInimigo(morto,999999);
        return {aceleracao,congelado,dano,umaVez,local,seladas,reforcos,semRepetir,letalNaoConvoca:antes===inimigos.length};
    });
    expect(habilidades).toEqual({aceleracao:1.6,congelado:0,dano:70,umaVez:true,local:true,seladas:2,reforcos:2,semRepetir:true,letalNaoConvoca:true});
    await page.evaluate(()=>{
        inimigos=[];torres=[];
        ['batedorDeInstantes','couracadoDeAmpulheta','tecelaoDeSegundos','arconteDoLimiar'].forEach((tipo,i)=>{
            criarInimigo(tipo);posicionarInimigoNoProgressoDoCaminho(inimigos[i],300+i*400);
        });
        desenharCenaPausadaDoTutorial();
    });
    await page.screenshot({path:info.outputPath('elenco17.png')});
    expect(await page.evaluate(()=>{
        const tipos=['batedorDeInstantes','couracadoDeAmpulheta','tecelaoDeSegundos','arconteDoLimiar'];
        const traduzidos=['en','es'].every(id=>{selecionarIdioma(id);return tipos.every(t=>localizar(CONFIG.inimigo[t].nome)!==CONFIG.inimigo[t].nome&&obterDetalheDoInimigoNoAlbum(t,CONFIG.inimigo[t])!==CONFIG.inimigo[t].detalhe);});
        selecionarIdioma('pt-BR');
        faseSelecionada=11;const anterior=obterTipoDeBossDaFase()==='sentinelaDoAmanha';
        faseSelecionada=17;mapaPersonalizadoAtivo={};const editor=obterTipoDeBossDaFase()==='boss';mapaPersonalizadoAtivo=null;
        return traduzidos&&anterior&&editor&&tipoEhBoss('arconteDoLimiar');
    })).toBe(true);
    await page.evaluate(()=>{
        ['batedorDeInstantes','couracadoDeAmpulheta','tecelaoDeSegundos','arconteDoLimiar'].forEach(registrarInimigoDerrotadoNoAlbum);
        voltarAoLobby();mostrarAlbum();selecionarCategoriaDoAlbum('bosses');
        abrirDetalhesDaFigurinhaDoAlbum('inimigo','arconteDoLimiar');
    });
    await expect(page.locator('.album-detalhes-camada')).toContainText('Arconte do Limiar');
    await expect(page.locator('.album-detalhes-camada')).toContainText('sela duas torres');
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:info.outputPath('arconte-album-celular.png')});
    await page.reload();
    expect(await page.evaluate(()=>['batedorDeInstantes','couracadoDeAmpulheta','tecelaoDeSegundos','arconteDoLimiar'].every(t=>inimigosDerrotadosNoAlbum.has(t)))).toBe(true);
    expect(erros).toEqual([]);
});
