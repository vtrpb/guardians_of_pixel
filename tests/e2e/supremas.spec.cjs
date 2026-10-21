const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
    await page.addInitScript(()=>{
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true');
        window.requestAnimationFrame=()=>0;
    });
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
async function vencerDesafio(page,tipo){
    await page.evaluate(tipo=>{
        iniciarDesafioSupremo(tipo);
        for(let n=1;n<=CONFIG.supremas.desafios[tipo].waves;n++){
            wave=n;inimigos=[];inimigosParaCriar=0;atualizarWaves();
        }
    },tipo);
}
async function iniciarComSuprema(page,tipo){
    await page.evaluate(tipo=>{
        localStorage.setItem(CHAVE_SUPREMAS,JSON.stringify({desbloqueadas:obterTiposSupremos(),equipada:tipo}));
        prepararPartidaClassica(101);confirmarSelecaoDeDefesas();
        dinheiro=5000;definirJogoPausado(true);selecionarTipoDeTorre(tipo);
    },tipo);
    const ponto=await page.evaluate(()=>{
        for(let y=60;y<650;y+=60)for(let x=60;x<1150;x+=60)
            if(!estaNoCaminho(x,y)&&!construcaoSobreDecoracao(x,y)&&terrenoPermiteDefesa(tipoDeTorreParaConstruir,x,y))return {x,y};
    });
    const caixa=await page.locator('#game').boundingBox();
    await page.mouse.click(caixa.x+ponto.x*caixa.width/1200,caixa.y+ponto.y*caixa.height/700);
    expect(await page.evaluate(()=>torres.filter(t=>CONFIG.torre.tipos[t.tipo].suprema).length)).toBe(1);
}
test('Lobby, desafio com exército emprestado, derrota e retorno sem desbloqueio',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.locator('#botao-supremas').click();
    await expect(page.locator('[data-suprema]')).toHaveCount(5);
    await expect(page.locator('[data-equipar-suprema=supremaCronarca]')).toBeDisabled();
    await page.screenshot({path:info.outputPath('lobby-desktop.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:info.outputPath('lobby-celular.png')});
    await page.locator('[data-desafio-supremo=supremaCronarca]').click();
    const estado=await page.evaluate(()=>({limite:obterLimiteDeTorres(),dinheiro,equipe:[...defesasSelecionadasParaPartida],bloqueada:torreEstaDesbloqueada('supremaCronarca'),bonus:obterBonusPermanenteDaLoja('bonusDinheiroInicial'),nucleo:Boolean(partidaPermiteSobrecarga()),fase:maiorFaseConcluida}));
    expect(estado).toMatchObject({limite:6,dinheiro:2800,bloqueada:false,bonus:0,nucleo:false,fase:0});
    expect(estado.equipe).toHaveLength(6);
    await page.evaluate(()=>{finalizarPartida();voltarAoLobbyDoResultado();});
    await expect(page.locator('[data-suprema]')).toHaveCount(5);
    expect(await page.evaluate(()=>carregarSupremas().desbloqueadas)).toEqual([]);
    expect(erros).toEqual([]);
});
test('Vitória completa concede somente a Suprema, persiste e não altera campanha',async({page})=>{
    const antes=await page.evaluate(()=>({fase:maiorFaseConcluida,fragmentos:fragmentosPixel,equipe:[...defesasSelecionadasParaPartida]}));
    await vencerDesafio(page,'supremaCronarca');
    await expect(page.locator('#descricao-resultado')).toContainText('Cronarca conquistada');
    expect(await page.evaluate(()=>carregarSupremas().desbloqueadas)).toEqual(['supremaCronarca']);
    await page.evaluate(()=>{voltarAoLobbyDoResultado();selecionarSuprema('supremaCronarca');});
    expect(await page.evaluate(()=>({fase:maiorFaseConcluida,fragmentos:fragmentosPixel,equipe:[...defesasSelecionadasParaPartida]}))).toEqual(antes);
    await page.reload();expect(await page.evaluate(()=>carregarSupremas())).toEqual({desbloqueadas:['supremaCronarca'],equipada:'supremaCronarca'});
});
test('Falha de save reverte desbloqueio e permite repetir somente a gravação',async({page})=>{
    await page.evaluate(()=>{window.gravarOriginal=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k===CHAVE_SUPREMAS)throw Error('disco cheio');return window.gravarOriginal.call(this,k,v);};});
    await vencerDesafio(page,'supremaTempestade');
    expect(await page.evaluate(()=>carregarSupremas().desbloqueadas)).toEqual([]);
    await expect(page.locator('#repetir-save-suprema')).toBeVisible();
    await page.evaluate(()=>Storage.prototype.setItem=window.gravarOriginal);
    await page.locator('#repetir-save-suprema').click();
    expect(await page.evaluate(()=>carregarSupremas().desbloqueadas)).toEqual(['supremaTempestade']);
});
test('Uma escolha e uma construção, inclusive após venda; reinício zera a tentativa',async({page})=>{
    await iniciarComSuprema(page,'supremaCronarca');
    expect(await page.evaluate(()=>{
        selecionarSuprema('supremaBastiao');
        const escolha=supremaDaPartida;
        torreSelecionada=obterSupremaConstruida();venderTorreSelecionada();
        const limite=atingiuLimiteDoTipoDeTorre('supremaCronarca');
        const outra=defesaEstaDisponivelNaPartida('supremaBastiao');
        prepararNovaPartida();return {escolha,limite,outra,reinicio:supremaFoiConstruida,carga:cargaSuprema};
    })).toEqual({escolha:'supremaCronarca',limite:true,outra:false,reinicio:false,carga:0});
});
test('Cronarca carrega somente em combate, respeita pausa e paralisa chefes por menos tempo',async({page},info)=>{
    await iniciarComSuprema(page,'supremaCronarca');
    const resultado=await page.evaluate(()=>{
        atualizarPoderSupremo(60000);const pausada=cargaSuprema;
        definirJogoPausado(false);inimigos=[];inimigosParaCriar=0;atualizarPoderSupremo(60000);const intervalo=cargaSuprema;
        criarInimigo('normal');criarInimigo('boss');atualizarPoderSupremo(45000);atualizarControleSupremo();
        return {pausada,intervalo,pronta:podeAtivarPoderSupremo()};
    });expect(resultado).toEqual({pausada:0,intervalo:0,pronta:true});
    await page.locator('#botao-poder-supremo').click();
    expect(await page.evaluate(()=>inimigos.map(i=>i.estaseSupremaRestante))).toEqual([6000,2500]);
    expect(await page.evaluate(()=>inimigos.map(i=>obterVelocidadeAtualDoInimigo(i)))).toEqual([0,0]);
    await page.evaluate(()=>{desenharMapa();desenharTorres();desenharInimigos();desenharEfeitosSupremos();});
    await page.screenshot({path:info.outputPath('poder-na-partida.png')});
    expect(await page.evaluate(()=>{atualizarPoderSupremo(3000);return inimigos.map(i=>i.estaseSupremaRestante);})).toEqual([3000,0]);
});
test('Tempestade aplica dano e Bastião impede tiros somente durante o escudo',async({page})=>{
    await iniciarComSuprema(page,'supremaTempestade');
    expect(await page.evaluate(()=>{
        definirJogoPausado(false);inimigos=[];criarInimigo('normal');criarInimigo('boss');
        inimigos.forEach(i=>i.vida=i.vidaMaxima=5000);cargaSuprema=55000;ativarPoderSupremo();return inimigos.map(i=>i.vida);
    })).toEqual([4400,4000]);
    await page.evaluate(()=>voltarAoLobby());
    await iniciarComSuprema(page,'supremaBastiao');
    expect(await page.evaluate(()=>{
        definirJogoPausado(false);criarInimigo('normal');cargaSuprema=50000;ativarPoderSupremo();
        const torre=obterSupremaConstruida();atingirTorreComTiroInimigo(torre);const protegida=torre.tirosRecebidos;
        atualizarPoderSupremo(8000);atingirTorreComTiroInimigo(torre);return {protegida,apos:torre.tirosRecebidos};
    })).toEqual({protegida:0,apos:1});
});
test('cada Superboss recebe dano extra apenas da Suprema correspondente',async({page})=>{
    const resultado=await page.evaluate(()=>{
        return Object.entries(CONFIG.supremas.fraquezaPorSuperBoss).map(([tipoDoBoss,tipoDaSuprema])=>{
            const inimigo={tipo:tipoDoBoss,vida:10000,vidaMaxima:10000};
            const normal=aplicarDanoAoInimigo(inimigo,100,Date.now(),{tipoDaDefesa:'padrao'});
            inimigo.vida=10000;
            const suprema=aplicarDanoAoInimigo(inimigo,100,Date.now(),{tipoDaDefesa:tipoDaSuprema});
            inimigo.vida=10000;
            const outra=aplicarDanoAoInimigo(inimigo,100,Date.now(),{tipoDaDefesa:'supremaPurificadora'===tipoDaSuprema?'supremaReveladora':'supremaPurificadora'});
            return {tipoDoBoss,tipoDaSuprema,normal,suprema,outra};
        });
    });
    expect(resultado).toHaveLength(5);
    for(const alvo of resultado){
        expect(alvo.suprema).toBeGreaterThan(alvo.normal);
        expect(alvo.suprema/alvo.normal).toBeCloseTo(1.15,2);
        expect(alvo.outra).toBe(alvo.normal);
    }
    await page.locator('#botao-supremas').click();
    await expect(page.locator('[data-suprema]').filter({hasText:'+15% de dano.'})).toHaveCount(5);
});
test('Purificadora repara torres e Reveladora expõe inimigos durante o combate',async({page})=>{
    await iniciarComSuprema(page,'supremaPurificadora');
    const reparo=await page.evaluate(()=>{
        definirJogoPausado(false);criarInimigo('normal');
        const torre=obterSupremaConstruida();torre.tirosRecebidos=5;
        cargaSuprema=CONFIG.torre.tipos[torre.tipo].poder.carga;ativarPoderSupremo();
        return {tirosRecebidos:torre.tirosRecebidos,carga:cargaSuprema};
    });
    expect(reparo).toEqual({tirosRecebidos:2,carga:0});
    await page.evaluate(()=>voltarAoLobby());
    await iniciarComSuprema(page,'supremaReveladora');
    const marca=await page.evaluate(()=>{
        definirJogoPausado(false);inimigos=[];criarInimigo('normal');
        const inimigo=inimigos[0];inimigo.vida=inimigo.vidaMaxima=1000;
        const antes=aplicarDanoAoInimigo(inimigo,100);
        inimigo.vida=1000;
        cargaSuprema=CONFIG.torre.tipos.supremaReveladora.poder.carga;ativarPoderSupremo();
        const durante=aplicarDanoAoInimigo(inimigo,100);
        inimigo.vida=1000;atualizarPoderSupremo(7000);
        const depois=aplicarDanoAoInimigo(inimigo,100);
        return {antes,durante,depois,carga:cargaSuprema};
    });
    expect(marca).toEqual({antes:100,durante:125,depois:100,carga:7000});
});
test('novos desafios concedem as duas Supremas por slot',async({page})=>{
    await vencerDesafio(page,'supremaPurificadora');
    expect(await page.evaluate(()=>carregarSupremas().desbloqueadas)).toEqual(['supremaPurificadora']);
    await page.evaluate(()=>voltarAoLobbyDoResultado());
    await vencerDesafio(page,'supremaReveladora');
    expect(await page.evaluate(()=>carregarSupremas().desbloqueadas)).toEqual(['supremaPurificadora','supremaReveladora']);
});
test('Slots isolados, entrada inválida e bloqueio de bônus antigos no desafio',async({page})=>{
    await page.evaluate(()=>salvarSupremas({desbloqueadas:['supremaBastiao'],equipada:'supremaBastiao'}));
    await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);
    expect(await page.evaluate(()=>sistemaDeSalvos.indiceAtivo)).toBe(1);
    expect(await page.evaluate(()=>carregarSupremas())).toEqual({desbloqueadas:[],equipada:null});
    await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(1))]);
    expect(await page.evaluate(()=>sistemaDeSalvos.indiceAtivo)).toBe(0);
    expect(await page.evaluate(()=>carregarSupremas())).toEqual({desbloqueadas:['supremaBastiao'],equipada:'supremaBastiao'});
    expect(await page.evaluate(()=>{
        localStorage.setItem(CHAVE_SUPREMAS,JSON.stringify({desbloqueadas:['invalida','supremaBastiao','supremaBastiao'],equipada:'supremaCronarca'}));
        const validado=carregarSupremas();
        maiorFaseConcluida=18;
        iniciarDesafioSupremo('supremaBastiao');
        const pulso=pulsoTemporalPodeSerAtivado();
        finalizarPartidaComVitoria();
        return {validado,pulso,encerrou:partidaEncerrada};
    })).toEqual({validado:{desbloqueadas:['supremaBastiao'],equipada:null},pulso:false,encerrou:false});
});

test('a Suprema ocupa uma das vagas da equipe na seleção e na partida',async({page})=>{
    const estado=await page.evaluate(()=>{
        const tipos=['padrao','canhaoPesado','torreGlacial','torreBesta','minaTerrestre','bombaPesada'];
        const desbloqueioOriginal=torreEstaDesbloqueada;
        torreEstaDesbloqueada=tipo=>tipos.includes(tipo)||desbloqueioOriginal(tipo);
        defesasSelecionadasParaPartida=new Set(tipos);
        salvarSupremas({desbloqueadas:['supremaCronarca'],equipada:null});
        selecionarSuprema('supremaCronarca');
        const equipeAposEquipar=[...defesasSelecionadasParaPartida];
        const equipeSalva=JSON.parse(sistemaDeSalvos.espacos[sistemaDeSalvos.indiceAtivo]
            .dados[CHAVE_SELECAO_DE_DEFESAS]);
        abrirSelecaoDeDefesas();
        const resumo=conteudoMenu.querySelector('.selecao-defesas-resumo strong').textContent;
        const vagas=[...conteudoMenu.querySelectorAll('.selecao-defesa-vaga span')].map(el=>el.textContent);
        alternarDefesaDaSelecao('bombaPesada');
        const mensagem=mensagemDaSelecaoDeDefesas;
        confirmarSelecaoDeDefesas();
        return {equipeAposEquipar,equipeSalva,resumo,vagas,mensagem,
            quantidadeNaPartida:defesasSelecionadasParaPartida.size+(supremaDaPartida?1:0),
            supremaDaPartida};
    });
    expect(estado.equipeAposEquipar).toEqual(['padrao','canhaoPesado','torreGlacial','torreBesta','minaTerrestre']);
    expect(estado.equipeSalva).toEqual(estado.equipeAposEquipar);
    expect(estado.resumo).toBe('6 de 6 escolhidas');
    expect(estado.vagas).toHaveLength(6);
    expect(estado.vagas.at(-1)).toBe('Cronarca');
    expect(estado.mensagem).toContain('equipe já está completa');
    expect(estado.quantidadeNaPartida).toBe(6);
    expect(estado.supremaDaPartida).toBe('supremaCronarca');
});
