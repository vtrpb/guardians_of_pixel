const {test,expect}=require('@playwright/test');

test('100 missões, categorias, segredos, resgate e persistência sem calendário',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>mostrarMissoes());
    expect(await page.evaluate(()=>CONFIG.missoes.permanentes.length)).toBe(100);
    await expect(page.locator('.missao-cartao')).toHaveCount(100);
    await expect(page.locator('.categoria-missao-premio')).toHaveCount(0);
    await expect(page.locator('#conteudo-menu')).not.toContainText('Renova');
    await page.getByRole('button',{name:'Segredos e investigação',exact:true}).click();
    await expect(page.locator('.missao-cartao')).toHaveCount(10);
    await expect(page.locator('.missao-cartao h3').first()).toHaveText('???');
    await page.getByRole('button',{name:'Caçada aos pixels',exact:true}).click();
    await page.evaluate(()=>registrarProgressoDaMissao('inimigosEliminados',500));
    await page.evaluate(()=>mostrarMissoes());
    const categoriaCacada=page.locator('.categorias-missoes button').filter({hasText:'Caçada aos pixels'});
    await expect(categoriaCacada.locator('.categoria-missao-premio')).toHaveText('!');
    await expect(page.locator('.categoria-missao-premio')).toHaveCount(2);
    expect(await page.evaluate(()=>CONFIG.missoes.permanentes.slice(10,13).every(missaoPermanenteEstaConcluida))).toBe(true);
    const saldo=await page.evaluate(()=>fragmentosPixel);
    await page.locator('.botao-resgatar-missao').first().click();
    await page.evaluate(()=>resgatarMissaoPermanente('permanente11'));
    expect(await page.evaluate(()=>fragmentosPixel)).toBe(saldo+3);
    await expect(categoriaCacada.locator('.categoria-missao-premio')).toBeVisible();
    await page.locator('#conteudo-menu').screenshot({path:info.outputPath('missoes-desktop.png')});
    await page.setViewportSize({width:390,height:844});
    await page.locator('.categorias-missoes').evaluate(el=>el.scrollLeft=0);
    await page.screenshot({path:info.outputPath('missoes-celular.png')});
    await page.evaluate(()=>{resgatarMissaoPermanente('permanente12');resgatarMissaoPermanente('permanente13');});
    await expect(page.locator('.categoria-missao-premio')).toHaveCount(0);
    await page.reload();
    expect(await page.evaluate(()=>progressoMissoesPermanentes.inimigosEliminados)).toBe(500);
    expect(await page.evaluate(()=>recompensaDaMissaoFoiResgatada('permanente11'))).toBe(true);
    expect(erros).toEqual([]);
});

test('Idiomas, limites da tentativa, eventos de defesa e isolamento dos slots',async({page})=>{
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>{selecionarIdioma('en');mostrarMissoes();});
    await expect(page.locator('#conteudo-menu')).toContainText('100 permanent missions');
    await expect(page.locator('.missao-cartao h3').first()).toHaveText('First defense');
    await page.evaluate(()=>{selecionarIdioma('es');mostrarMissoes();});
    await expect(page.locator('.missao-cartao h3').first()).toHaveText('Primera defensa');
    const dados=await page.evaluate(()=>{
        fecharConteudoMenu();iniciarPartida();
        estatisticasDaPartidaParaMissoes.construidas=6;
        estatisticasDaPartidaParaMissoes.tipos=new Set(['padrao','gelo','torreLongoAlcance','torreFeixeContinuo']);
        estatisticasDaPartidaParaMissoes.explosivos=1;
        estatisticasDaPartidaParaMissoes.vendas=1;
        estatisticasDaPartidaParaMissoes.melhorias=1;
        dinheiro=1200;registrarFaseConcluidaParaMissoes();registrarFaseConcluidaParaMissoes();
        const restricoes=[71,72,73,74,75,76].every(n=>!progressoMissoesPermanentes[`estrategia_${n}`]);
        const vitorias=progressoMissoesPermanentes.fasesConcluidas;
        const saldo=fragmentosPixel;resgatarMissaoPermanente('permanente71');
        const semPremioIndevido=saldo===fragmentosPixel;
        return {restricoes,vitorias,semPremioIndevido,reserva:progressoMissoesPermanentes.estrategia_79};
    });
    expect(dados).toEqual({restricoes:true,vitorias:1,semPremioIndevido:true,reserva:1});
    await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);
    await expect.poll(()=>page.evaluate(()=>sistemaDeSalvos.indiceAtivo)).toBe(1);
    expect(await page.evaluate(()=>progressoMissoesPermanentes.fasesConcluidas)).toBe(0);
    await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(1))]);
    await expect.poll(()=>page.evaluate(()=>sistemaDeSalvos.indiceAtivo)).toBe(0);
    expect(await page.evaluate(()=>progressoMissoesPermanentes.fasesConcluidas)).toBe(1);
});

test('Migra missões antigas sem repetir recompensas nem apagar conquistas',async({page})=>{
    await page.addInitScript(()=>{
        if(sessionStorage.getItem('migrado'))return;
        sessionStorage.setItem('migrado','1');
        localStorage.setItem('guardians-of-pixel-missoes-semanais-v1',JSON.stringify({semana:'2020-S01',inimigosEliminados:50,fasesConcluidas:3,maiorWaveInfinita:40,recompensasResgatadas:['cacadorDePixels','guardiaoDaCampanha','alemDoLimite']}));
        localStorage.setItem('guardians-of-pixel-recompensas-missoes-v1',JSON.stringify({skinsDesbloqueadas:['sentinelaDourada'],conquistasDesbloqueadas:['alemDoLimite'],skinTorrePadraoEquipada:'sentinelaDourada'}));
    });
    await page.goto('/');
    expect(await page.evaluate(()=>progressoMissoesPermanentes.recompensasResgatadas)).toEqual(['permanente11','permanente61','permanente83']);
    expect(await page.evaluate(()=>recompensasPermanentesDasMissoes.skinTorrePadraoEquipada)).toBe('sentinelaDourada');
    await page.reload();
    expect(await page.evaluate(()=>progressoMissoesPermanentes.recompensasResgatadas.length)).toBe(3);
});

test('Primeira vitória concede 5 Fragmentos; prêmios antigos resgatados são preservados',async({page},info)=>{
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>{
        registrarProgressoDaMissao('fasesConcluidas',1);
        mostrarMissoes('Primeiros passos');
    });
    const cartao=page.locator('.missao-cartao').filter({hasText:'Eu consigo!'});
    await expect(cartao.locator('.missao-recompensa')).toContainText('5 Fragmentos de Pixel');
    await cartao.scrollIntoViewIfNeeded();
    await cartao.screenshot({path:info.outputPath('primeira-vitoria-5-fragmentos.png')});
    const saldo=await page.evaluate(()=>fragmentosPixel);
    await cartao.getByRole('button',{name:'Resgatar prêmio'}).click();
    expect(await page.evaluate(()=>fragmentosPixel)).toBe(saldo+5);
    await page.evaluate(()=>{
        progressoMissoesPermanentes.recompensasConcedidas.permanente10='75 Fragmentos de Pixel';
        salvarProgressoMissoesPermanentes();
    });
    await page.reload();
    expect(await page.evaluate(()=>fragmentosPixel)).toBe(saldo+5);
    expect(await page.evaluate(()=>progressoMissoesPermanentes.recompensasConcedidas.permanente10)).toBe('75 Fragmentos de Pixel');
    await page.evaluate(()=>resgatarMissaoPermanente('permanente10'));
    expect(await page.evaluate(()=>fragmentosPixel)).toBe(saldo+5);
});

test('Eventos reais contam mortes, construção, waves completas e reiniciam restrições',async({page})=>{
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>{fecharConteudoMenu();iniciarPartida();});
    const dados=await page.evaluate(()=>{
        registrarConstrucaoParaMissoes('padrao');
        registrarAcaoDaTorreParaMissoes('melhorias');
        const inimigo={tipo:'normal',vida:1,vidaMaxima:1,x:0,y:0};
        aplicarDanoAoInimigo(inimigo,100,Date.now(),{tipoDaDefesa:'padrao'});
        registrarInimigoEliminadoParaMissoes(inimigo);
        modoWavesInfinitas=true;wave=40;
        registrarWaveCompletaParaMissoes();registrarWaveCompletaParaMissoes();
        const p={...progressoMissoesPermanentes};
        mapaPersonalizadoAtivo={};registrarConstrucaoParaMissoes('padrao');registrarInimigoEliminadoParaMissoes(inimigo);
        const excluiuEditor=progressoMissoesPermanentes.inimigosEliminados===p.inimigosEliminados;
        mapaPersonalizadoAtivo=null;prepararNovaPartida();
        return {p,excluiuEditor,reiniciou:estatisticasDaPartidaParaMissoes.construidas===0&&estatisticasDaPartidaParaMissoes.melhorias===0};
    });
    expect(dados.p.torresConstruidas).toBe(1);expect(dados.p.eliminacoes_padrao).toBe(1);
    expect(dados.p.wavesInfinitasCompletas).toBe(1);expect(dados.p.maiorWaveInfinita).toBe(40);
    expect(dados.excluiuEditor&&dados.reiniciou).toBe(true);
});

test('Golpes finais de explosivos e longo alcance contam uma vez; o Feixe registra a sequência máxima',async({page})=>{
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    const dados=await page.evaluate(()=>{
        fecharConteudoMenu();iniciarPartida();definirJogoPausado(true);
        for(const tipo of ['minaTerrestre','bombaPesada','torreLongoAlcance']) {
            inimigos=[];criarInimigo('normal');
            const alvo=inimigos[0];Object.assign(alvo,{x:200,y:200,vida:1});
            if(tipo==='torreLongoAlcance') {
                tiros=[{x:200,y:200,alvo,velocidade:24,dano:100,tipoDaTorre:tipo}];
                moverTiros();
            } else aplicarDanoEmArea(200,200,100,100,null,Date.now(),tipo);
            moverInimigos(0);moverInimigos(0);
        }
        criarInimigo('normal');const alvo=inimigos[0];Object.assign(alvo,{x:260,y:200,vida:10000,vidaMaxima:10000});
        const torre={tipo:'torreFeixeContinuo',x:200,y:200,nivel:0,ultimoTiro:0,modoDeAlvo:'primeiro'};
        atualizarAtributosDaTorreComBonus(torre);torres=[torre];
        for(let i=1;i<=10;i++)atacarComTorres(i*500);
        return {mina:progressoMissoesPermanentes.eliminacoes_minaTerrestre,bomba:progressoMissoesPermanentes.eliminacoes_bombaPesada,
            longo:progressoMissoesPermanentes.eliminacoes_torreLongoAlcance,feixe:progressoMissoesPermanentes.feixeMaximo};
    });
    expect(dados).toEqual({mina:1,bomba:1,longo:1,feixe:1});
});
