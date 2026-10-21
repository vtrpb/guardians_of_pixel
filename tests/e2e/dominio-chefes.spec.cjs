const {test, expect} = require('@playwright/test');
test.beforeEach(async ({page}) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});

test('Chefes: limiar, aviso, pausa, estase, morte e tres ataques diferentes', async ({page}, info) => {
    await page.evaluate(() => {
        mostrarApresentacaoClassico(); prepararPartidaClassica(101);
        confirmarSelecaoDeDefesas(); definirJogoPausado(true);
    });
    const resultado = await page.evaluate(() => {
        jogoIniciado = true; jogoPausado = false; partidaEncerrada = false;
        const torre = (x, y) => ({tipo:'padrao', nivel:0, x,y,tirosRecebidos:0,alcance:180,dano:20,velocidadeAtaque:1000});
        const criar = tipo => ({tipo, vida:51,vidaMaxima:100,x:400,y:300,tamanho:30,ultimoTiro:0});
        torres = [torre(450,300),torre(480,300),torre(800,500)];
        const boss = criar('boss'); inimigos=[boss]; tirosDosInimigos=[];
        atualizarSegundaEtapaDosChefes(16);
        const antes = !boss.etapaDoChefe;
        boss.vida = 50; atualizarSegundaEtapaDosChefes(16);
        const avisou = boss.etapaDoChefe.restante === 1600 && tirosDosInimigos.length === 0;
        jogoPausado = true; atualizarSegundaEtapaDosChefes(3000);
        const pausa = boss.etapaDoChefe.restante === 1600;
        jogoPausado = false; boss.estaseSupremaRestante=100; atualizarSegundaEtapaDosChefes(3000);
        const estase = boss.etapaDoChefe.restante === 1600;
        boss.estaseSupremaRestante=0; atualizarSegundaEtapaDosChefes(1600);
        const salva = tirosDosInimigos.length;
        const areia = criar('bossDeserto'); areia.vida=40; inimigos=[areia];
        atualizarSegundaEtapaDosChefes(16); atualizarSegundaEtapaDosChefes(1600);
        const impactos = torres.map(t => t.tirosRecebidos);
        const gelo = criar('bossArtico'); gelo.vida=40; inimigos=[gelo];
        atualizarSegundaEtapaDosChefes(16); atualizarSegundaEtapaDosChefes(1600);
        const geada = torres.map(t => (t.lentidaoMacacoExpiraEm || 0) > Date.now());
        const morto = criar('boss'); morto.vida=40; inimigos=[morto];
        atualizarSegundaEtapaDosChefes(16); morto.vida=0; tirosDosInimigos=[];
        atualizarSegundaEtapaDosChefes(1600);
        const cancelou = tirosDosInimigos.length === 0;
        const sabotador = criar('sabotador'); sabotador.vida=0; inimigos=[sabotador];
        atacarTorresComInimigos();
        const mortoNaoAtira = tirosDosInimigos.length === 0;
        sabotador.vida=20; atacarTorresComInimigos();
        const vivoAtira = tirosDosInimigos.length === 1;
        inimigos=[gelo]; atualizarSegundaEtapaDosChefes(8000);
        ctx.clearRect(0,0,canvas.width,canvas.height); desenharTorres();
        desenharCorpoDoInimigo(gelo,370,270,60); desenharSegundaEtapaDoChefe(gelo);
        jogoPausado=true;
        return {antes,avisou,pausa,estase,salva,impactos,geada,cancelou,mortoNaoAtira,vivoAtira};
    });
    expect(resultado).toEqual({antes:true,avisou:true,pausa:true,estase:true,salva:2,impactos:[1,1,0],geada:[true,true,false],cancelou:true,mortoNaoAtira:true,vivoAtira:true});
    await page.locator('#game').screenshot({path:info.outputPath('chefe-geada.png')});
});

test('Domínio: migração das vitórias, metas por cadência, atributo e skin opcional', async ({page}, info) => {
    const erros=[]; page.on('pageerror', e=>erros.push(e.message));
    const resultado = await page.evaluate(() => {
        localStorage.setItem(CHAVE_DOMINIO_TORRES, JSON.stringify({
            padrao:{vitorias:3,equipado:true},canhaoPesado:{vitorias:1,equipado:true},
            obliterador:{pontos:-100,equipado:true},torreSismica:{pontos:100000,equipado:true}
        }));
        cacheDominioTexto=undefined;
        const padrao=carregarDominioDasTorres().padrao;
        const canhao=carregarDominioDasTorres().canhaoPesado;
        const limites=[carregarDominioDasTorres().obliterador,carregarDominioDasTorres().torreSismica];
        const metas=[obterMetaDeDominio('padrao'),obterMetaDeDominio('canhaoPesado'),obterMetaDeDominio('obliterador'),obterMetaDeDominio('geradorDeCreditos')];
        const torre={tipo:'padrao',nivel:0};
        atualizarAtributosDaTorreComBonus(torre);
        const dano=torre.dano;
        alternarDominioDaTorre('padrao');
        atualizarAtributosDaTorreComBonus(torre);
        mostrarAlbum();
        return {padrao,canhao,limites,metas,dano,danoSemSkin:torre.dano,equipado:dominioEstaEquipado('padrao'),estrela:!!document.querySelector('.album-cartao-torre .estrela-dominio')};
    });
    expect(resultado).toEqual({padrao:{pontos:5000,equipado:false},canhao:{pontos:5000,equipado:false},limites:[{pontos:0,equipado:false},{pontos:1600,equipado:true}],metas:[20000,15000,9500,1600],dano:10,danoSemSkin:10,equipado:false,estrela:false});
    await page.screenshot({path:info.outputPath('estrela-no-album.png')});
    await page.evaluate(() => mostrarDominioDasTorres());
    await expect(page.locator('[data-equipar-dominio="padrao"]')).toHaveAttribute('aria-pressed','false');
    await page.screenshot({path:info.outputPath('dominio-desktop.png')});
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:info.outputPath('dominio-celular.png')});
    await page.evaluate(() => selecionarIdioma('en'));
    await expect(page.locator('.dominio-cartao').first()).toContainText('Mastery points');
    await page.evaluate(() => selecionarIdioma('es'));
    await expect(page.locator('.dominio-cartao').first()).toContainText('Puntos de dominio');
    await page.reload();
    expect(await page.evaluate(()=>carregarDominioDasTorres().padrao)).toEqual({pontos:5000,equipado:false});
    expect(erros).toEqual([]);
});

test('Domínio: dano, eliminação, suporte e falha de gravação sem duplicar pontos', async ({page}) => {
    const resultado=await page.evaluate(()=>{
        jogoIniciado=true; partidaVencida=false; wave=1;
        const torre={tipo:'padrao',nivel:0,x:400,y:300};torres=[torre];
        registrarDanoDeDominio(torre, 24, false);
        registrarDanoDeDominio(torre, 26, true);
        const salvar=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;
        concluirDominioDasTorres();
        const falha=carregarDominioDasTorres().padrao.pontos;
        const podeRepetir=!!document.getElementById('repetir-salvar-dominio');
        atualizarSalvoAtivo=salvar;concluirDominioDasTorres();concluirDominioDasTorres();
        const depois=carregarDominioDasTorres().padrao.pontos;
        torres=[{tipo:'geradorDeCreditos',nivel:0,waveDeConstrucao:1}];
        wave=2;registrarWaveDeDominio();concluirDominioDasTorres();
        return {falha,podeRepetir,depois,suporte:carregarDominioDasTorres().geradorDeCreditos.pontos};
    });
    expect(resultado).toEqual({falha:0,podeRepetir:true,depois:7,suporte:8});
});

test('Torre padrão mede a partida e exige a nova meta sem apagar pontos antigos', async ({page}) => {
    const resultado = await page.evaluate(() => {
        localStorage.setItem(CHAVE_DOMINIO_TORRES, JSON.stringify({padrao:{pontos:5000,equipado:true}}));
        cacheDominioTexto = undefined;
        const concluidoAntes = dominioFoiConcluido('padrao');
        iniciarPartidaDeDominio();
        jogoIniciado = true;
        const torre = {tipo:'padrao',nivel:0,x:400,y:300};
        torres = [torre];
        registrarDanoDeDominio(torre, 2500, true);
        concluirDominioDasTorres(false);
        jogoIniciado = false;
        mostrarDominioDasTorres();
        const cartao = document.querySelector('[data-dominio="padrao"]').closest('.dominio-cartao');
        return {
            concluidoAntes, concluidoDepois:dominioFoiConcluido('padrao'),
            dados:carregarDominioDasTorres().padrao,
            ultimaPartida:pontosDaTorrePadraoNaUltimaPartida,
            texto:cartao.textContent,
            botaoDesativado:cartao.querySelector('[data-equipar-dominio]').disabled
        };
    });
    expect(resultado.concluidoAntes).toBe(false);
    expect(resultado.concluidoDepois).toBe(false);
    expect(resultado.dados).toEqual({pontos:5105,equipado:false});
    expect(resultado.ultimaPartida).toBe(105);
    expect(resultado.texto).toContain('5105/20000');
    expect(resultado.texto).toContain('última partida: 105');
    expect(resultado.botaoDesativado).toBe(true);
    await page.reload();
    expect(await page.evaluate(() => dominioFoiConcluido('padrao'))).toBe(false);
});

test('Domínio: contribuição em partida clássica e mapa da comunidade', async ({page}) => {
    await page.evaluate(() => {
        mostrarApresentacaoClassico(); dificuldadeClassicaSelecionada='iron';
        prepararPartidaClassica(101); confirmarSelecaoDeDefesas();
        definirJogoPausado(true); dinheiro=5000; selecionarTipoDeTorre('padrao');
    });
    const b=await page.locator('#game').boundingBox();
    await page.mouse.click(b.x+350*b.width/1200,b.y+70*b.height/700);
    expect(await page.evaluate(()=>torres.length)).toBe(1);
    await page.evaluate(()=>{
        registrarDanoDeDominio(torres[0], 500, true);
        aplicarDanoAoInimigo({tipo:'normal',vida:100,vidaMaxima:100,x:450,y:300}, 50, Date.now(), {
            tipoDaDefesa:'padrao', torreOrigem:torres[0]
        });
        concluirDominioDasTorres();
    });
    expect(await page.evaluate(()=>carregarDominioDasTorres().padrao.pontos)).toBe(27);
    const pontosNoMapaDaComunidade = await page.evaluate(() => {
        mapaPersonalizadoAtivo = {id:'mapa-importado-da-comunidade'};
        registrarDanoDeDominio(torres[0], 250, true);
        concluirDominioDasTorres(false);
        return carregarDominioDasTorres().padrao.pontos;
    });
    expect(pontosNoMapaDaComunidade).toBe(42);
});

test('Domínio: estrela na partida e bônus de ataque, alcance, resistência e créditos sem skin', async ({page}, info) => {
    await page.evaluate(() => {
        mostrarApresentacaoClassico(); prepararPartidaClassica(101);
        confirmarSelecaoDeDefesas(); definirJogoPausado(true);
    });
    const resultado = await page.evaluate(() => {
        mapaPersonalizadoAtivo.modificadorClassico = null;
        const dados = structuredClone(carregarDominioDasTorres());
        for (const tipo of ['padrao','torreSismica','iscaBlindada','geradorDeCreditos']) {
            dados[tipo].pontos = obterMetaDeDominio(tipo);
            dados[tipo].equipado = false;
        }
        salvarDominioDasTorres(dados);
        const padrao = {tipo:'padrao',nivel:0,x:350,y:250,tirosRecebidos:0};
        const sismica = {tipo:'torreSismica',nivel:0,x:500,y:250,tirosRecebidos:0};
        const isca = {tipo:'iscaBlindada',nivel:0,x:650,y:250,tirosRecebidos:0};
        const gerador = {tipo:'geradorDeCreditos',nivel:0,x:800,y:250,tirosRecebidos:0,primeiraWaveParaGerarCreditos:1,ultimaWaveComCreditosGerados:0};
        torres=[padrao,sismica,isca,gerador];
        for (const torre of torres) atualizarAtributosDaTorreComBonus(torre);
        const desenhar = desenharEstrelaDeDominio;
        let estrelas=0;
        desenharEstrelaDeDominio=(...argumentos)=>{estrelas++;desenhar(...argumentos);};
        ctx.clearRect(0,0,canvas.width,canvas.height);desenharTorres();
        desenharEstrelaDeDominio=desenhar;
        const resistencia=obterResistenciaDaTorre(isca);
        const creditosAntes=dinheiro;
        concederCreditosDosGeradoresAposWave(1);
        return {estrelas,dano:padrao.dano,alcance:sismica.alcance,resistencia,creditos:dinheiro-creditosAntes,skins:torres.map(t=>dominioEstaEquipado(t.tipo))};
    });
    expect(resultado).toEqual({estrelas:4,dano:11,alcance:179,resistencia:11,creditos:105,skins:[false,false,false,false]});
    await page.locator('#game').screenshot({path:info.outputPath('estrelas-na-partida.png')});
});
