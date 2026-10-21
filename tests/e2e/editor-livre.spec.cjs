const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
    await page.addInitScript(()=>{
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true');
        localStorage.setItem('guardians-of-pixel-progressao-nivel-v1',JSON.stringify({experienciaTotal:3000,recompensasConcedidas:[],historicoImportado:true}));
    });
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(()=>{
        rascunhoDoMapaNoEditor=criarMapaPadraoDoEditor();
        rascunhoDoMapaNoEditor.nome='Meu mapa livre';rascunhoDoMapaNoEditor.criador='Criador de teste';rascunhoDoMapaNoEditor.nivelDeDecoracoes=0;
        mostrarFormularioDoEditor();
    });
});
async function clicarMapa(page,x,y){
    const b=await page.locator('#canvas-editor-livre').boundingBox();
    await page.mouse.click(b.x+x*b.width/1200,b.y+y*b.height/700);
}

test('Rascunho livre começa vazio mesmo com decoração normal e preserva objetos do jogador',async({page})=>{
 await page.evaluate(()=>{rascunhoDoMapaNoEditor.nivelDeDecoracoes=2;mostrarFormularioDoEditor();});
 await page.locator('[data-modo-editor="livre"]').click();
 expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres)).toEqual([]);
 await page.locator('[data-decoracao-livre="arvore"]').click();
 await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();await clicarMapa(page,400,100);
 await page.locator('[data-modo-editor="normal"]').click();await page.locator('[data-modo-editor="livre"]').click();
 expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres.length)).toBe(1);
 await page.locator('.editor-salvar').click();
 await page.evaluate(()=>editarMapaNoEditor(mapasCriadosNoEditor[0].id));
 expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres.length)).toBe(1);
});

test('Apagar curva não deixa vizinhos coincidentes nem impede salvar',async({page})=>{
    await page.locator('[data-modo-editor="livre"]').click();
    await page.evaluate(()=>{
        rascunhoDoMapaNoEditor.pontosLivres=[{x:0,y:340},{x:200,y:200},{x:400,y:400},{x:200,y:200},{x:1200,y:340}];
        desenharEditorLivre();
    });
    await page.locator('[data-ferramenta-livre="apagar"]').click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    await clicarMapa(page,400,400);
    expect(await page.evaluate(()=>!!normalizarMapaDoEditor(rascunhoDoMapaNoEditor))).toBe(true);
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres.length)).toBe(5);
    await expect(page.locator('#estado-editor-livre')).toContainText('separados');
    await page.locator('.editor-salvar').click();
    expect(await page.evaluate(()=>mapasCriadosNoEditor.length)).toBe(1);
});

test('Reabrir o mesmo mapa inicia histórico novo e seleção limpa',async({page})=>{
    await page.locator('[data-modo-editor="livre"]').click();
    await page.getByRole('button',{name:'Novo traçado',exact:true}).click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    await clicarMapa(page,200,200);
    await page.locator('.editor-salvar').click();
    await page.evaluate(()=>editarMapaNoEditor(mapasCriadosNoEditor[0].id));
    await expect(page.locator('[data-historico-livre="desfazer"]')).toBeDisabled();
    await expect(page.locator('[data-historico-livre="refazer"]')).toBeDisabled();
    expect(await page.evaluate(()=>obterEstadoEditorLivre().selecao)).toBeNull();
});

test('Tamanho acompanha decoração selecionada e Desfazer/Refazer',async({page})=>{
    await page.locator('[data-modo-editor="livre"]').click();
    await page.locator('[data-decoracao-livre="arvore"]').click();
    await page.locator('#escala-editor-livre').selectOption('1.5');
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    await clicarMapa(page,400,100);
    await page.locator('#escala-editor-livre').selectOption('0.5');
    await page.locator('[data-ferramenta-livre="mover"]').click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    await clicarMapa(page,400,100);
    await expect(page.locator('#escala-editor-livre')).toHaveValue('1.5');
    await page.locator('#escala-editor-livre').selectOption('0.75');
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres[0].escala)).toBe(.75);
    await page.locator('[data-historico-livre="desfazer"]').click();
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres[0].escala)).toBe(1.5);
    await page.locator('[data-historico-livre="refazer"]').click();
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres[0].escala)).toBe(.75);
});

test('Perder captura cancela arrasto e restaura geometria sem criar ação',async({page})=>{
    await page.locator('[data-modo-editor="livre"]').click();
    await page.getByRole('button',{name:'Novo traçado',exact:true}).click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    await clicarMapa(page,200,200);
    await page.locator('[data-ferramenta-livre="mover"]').click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    const antes=await page.evaluate(()=>({geometria:capturarGeometriaLivre(),acoes:obterEstadoEditorLivre().desfazer.length}));
    const b=await page.locator('#canvas-editor-livre').boundingBox();
    await page.mouse.move(b.x+200*b.width/1200,b.y+200*b.height/700);await page.mouse.down();
    await page.mouse.move(b.x+400*b.width/1200,b.y+300*b.height/700);
    await page.locator('#canvas-editor-livre').dispatchEvent('lostpointercapture',{pointerId:1});
    await page.mouse.up();
    expect(await page.evaluate(()=>({geometria:capturarGeometriaLivre(),acoes:obterEstadoEditorLivre().desfazer.length}))).toEqual(antes);
});

for(const largura of [1440,390])for(const ferramenta of ['mover','apagar'])test(`Curva parcialmente visível ${largura}: ${ferramenta} sem deslocar o canvas ao focar`,async({page},info)=>{
    await page.setViewportSize({width:largura,height:largura===390?844:1000});
    await page.locator('[data-modo-editor="livre"]').click();
    await page.evaluate(()=>{
        rascunhoDoMapaNoEditor.pontosLivres=[{x:0,y:340},{x:200,y:100},{x:700,y:500},{x:1200,y:340}];
        desenharEditorLivre();
    });
    await page.locator(`[data-ferramenta-livre="${ferramenta}"]`).click();
    await page.locator('#canvas-editor-livre').evaluate(tela=>{
        tela.scrollIntoView({block:'start'});
        let pai=tela.parentElement;
        while(pai && pai.scrollHeight<=pai.clientHeight) pai=pai.parentElement;
        pai.scrollTop-=window.innerHeight-180-tela.getBoundingClientRect().top;
    });
    const b=await page.locator('#canvas-editor-livre').boundingBox();
    await page.mouse.move(b.x+200*b.width/1200,b.y+100*b.height/700);
    await page.mouse.down();
    if(ferramenta==='mover')await page.mouse.move(b.x+280*b.width/1200,b.y+140*b.height/700,{steps:4});
    await page.mouse.up();
    const pontos=await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres);
    if(ferramenta==='mover')expect(pontos[1]).toEqual({x:280,y:140});
    else expect(pontos).toEqual([{x:0,y:340},{x:700,y:500},{x:1200,y:340}]);
    expect((await page.locator('#canvas-editor-livre').boundingBox()).y).toBe(b.y);
    await page.locator('[data-historico-livre="desfazer"]').click();
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres[1])).toEqual({x:200,y:100});
    await page.locator('[data-historico-livre="refazer"]').click();
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres)).toEqual(pontos);
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    await page.screenshot({path:info.outputPath('curva-editada.png')});
});

for(const largura of [1440,390])test(`Livre ${largura}: criar, arrastar, apagar, desfazer, salvar e jogar`,async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.setViewportSize({width:largura,height:largura===390?844:1000});
    await page.locator('[data-modo-editor="livre"]').click();
    await page.getByRole('button',{name:'Novo traçado',exact:true}).click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    await clicarMapa(page,200,200);await clicarMapa(page,600,500);
    await page.locator('[data-decoracao-livre="arvore"]').click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();await clicarMapa(page,400,100);
    await page.locator('[data-decoracao-livre="lago"]').click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();await clicarMapa(page,800,100);
    await page.locator('[data-ferramenta-livre="mover"]').click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    const b=await page.locator('#canvas-editor-livre').boundingBox();
    await page.mouse.move(b.x+400*b.width/1200,b.y+100*b.height/700);await page.mouse.down();
    await page.mouse.move(b.x+440*b.width/1200,b.y+140*b.height/700,{steps:4});await page.mouse.up();
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres[0].x)).toBe(440);
    await page.locator('[data-historico-livre="desfazer"]').click();
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres[0].x)).toBe(400);
    await page.locator('[data-historico-livre="refazer"]').click();
    await page.locator('[data-ferramenta-livre="apagar"]').click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();await clicarMapa(page,440,140);
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.decoracoesLivres.length)).toBe(1);
    await page.locator('[data-historico-livre="desfazer"]').click();
    await page.locator('#canvas-editor-livre').scrollIntoViewIfNeeded();
    await page.screenshot({path:info.outputPath('editor-livre.png')});
    const mapa=await page.evaluate(()=>structuredClone(rascunhoDoMapaNoEditor));
    expect(mapa.pontosLivres).toEqual([{x:0,y:340},{x:200,y:200},{x:600,y:500},{x:1200,y:340}]);
    await page.locator('.editor-salvar').click();
    expect(await page.evaluate(()=>mapasCriadosNoEditor[0].modoEdicao)).toBe('livre');
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const resultado=await page.evaluate(()=>{
        const salvo=mapasCriadosNoEditor[0];const codigo=gerarCodigoDoMapaNoEditor(salvo),importado=importarMapaPeloCodigo(codigo);
        jogarMapaDoEditor(salvo.id);confirmarSelecaoDeDefesas();definirJogoPausado(true);
        inimigos=[];criarInimigo('normal');
        const caminho=obterCaminhosAtuais()[0];
        const resultado={pontos:importado.pontosLivres,decoracoes:importado.decoracoesLivres,versao:codigo.startsWith('GP-MAPA-2.'),
            caminho,caminhoBloqueado:estaNoCaminho(200,200),arvoreBloqueia:construcaoSobreDecoracao(440,140),agua:obterAreasDeAguaParaConstrucao().length,
            inicio:[inimigos[0].x,inimigos[0].y]};
        moverInimigos(10000);resultado.proximo=inimigos[0].alvo;
        desenharMapa();return resultado;
    });
    expect(resultado.pontos).toEqual(mapa.pontosLivres);expect(resultado.caminho).toEqual(mapa.pontosLivres);
    expect(resultado.decoracoes).toEqual(mapa.decoracoesLivres);
    expect(resultado).toMatchObject({versao:true,caminhoBloqueado:true,arvoreBloqueia:true,agua:2,inicio:[0,340],proximo:2});
    await page.locator('#game').screenshot({path:info.outputPath('partida-livre.png')});
    expect(erros).toEqual([]);
});

test.describe('Toque em tela estreita',()=>{
    test.use({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
    test('Arrasto com dois dedos, desfazer e cancelar sem mover outro item',async({page,context},info)=>{
        await page.locator('[data-modo-editor="livre"]').tap();
        await page.getByRole('button',{name:'Novo traçado',exact:true}).tap();
        const tela=page.locator('#canvas-editor-livre');
        await tela.scrollIntoViewIfNeeded();
        let b=await tela.boundingBox();
        await page.touchscreen.tap(b.x+200*b.width/1200,b.y+200*b.height/700);
        await page.locator('[data-ferramenta-livre="mover"]').tap();
        await tela.scrollIntoViewIfNeeded();b=await tela.boundingBox();
        const ponto=(id,x,y)=>({id,x:b.x+x*b.width/1200,y:b.y+y*b.height/700});
        const sessao=await context.newCDPSession(page);
        const toque=(type,touchPoints)=>sessao.send('Input.dispatchTouchEvent',{type,touchPoints});
        const acoes=await page.evaluate(()=>obterEstadoEditorLivre().desfazer.length);
        await toque('touchStart',[ponto(1,200,200)]);
        await toque('touchMove',[ponto(1,400,300)]);
        await toque('touchStart',[ponto(1,400,300),ponto(2,800,100)]);
        await toque('touchMove',[ponto(1,400,300),ponto(2,900,150)]);
        await toque('touchEnd',[ponto(1,400,300)]);
        await toque('touchEnd',[]);
        expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres[1])).toEqual({x:400,y:300});
        expect(await page.evaluate(()=>obterEstadoEditorLivre().desfazer.length)).toBe(acoes+1);
        const desfazer=page.locator('[data-historico-livre="desfazer"]');
        await desfazer.scrollIntoViewIfNeeded();
        const caixa=await desfazer.boundingBox();
        await page.touchscreen.tap(caixa.x+caixa.width/2,caixa.y+caixa.height/2);
        await expect.poll(()=>page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres[1])).toEqual({x:200,y:200});
        await tela.scrollIntoViewIfNeeded();b=await tela.boundingBox();
        await toque('touchStart',[ponto(1,200,200)]);
        await toque('touchMove',[ponto(1,400,300)]);
        await toque('touchCancel',[]);
        expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres[1])).toEqual({x:200,y:200});
        await expect(page.locator('[data-historico-livre="refazer"]')).toBeEnabled();
        const ferramentaAntes=await page.evaluate(()=>obterEstadoEditorLivre().ferramenta);
        const paleta=page.locator('[data-decoracao-livre="arvore"]');
        await paleta.scrollIntoViewIfNeeded();
        const area=await paleta.boundingBox();
        await toque('touchStart',[{id:1,x:area.x+area.width/2,y:area.y+area.height/2}]);
        await toque('touchMove',[{id:1,x:area.x+area.width/2-50,y:area.y+area.height/2}]);
        await toque('touchEnd',[]);
        expect(await page.evaluate(()=>obterEstadoEditorLivre().ferramenta)).toBe(ferramentaAntes);
        await tela.scrollIntoViewIfNeeded();
        await page.screenshot({path:info.outputPath('toque-editor.png')});
        await sessao.detach();
    });
});

test('Teclado protege extremos, apaga curvas e nova edição descarta Refazer',async({page})=>{
    await page.locator('[data-modo-editor="livre"]').click();
    await page.getByRole('button',{name:'Novo traçado',exact:true}).click();
    const tela=page.locator('#canvas-editor-livre');
    await tela.scrollIntoViewIfNeeded();await clicarMapa(page,200,200);
    await page.locator('[data-ferramenta-livre="mover"]').click();
    await tela.scrollIntoViewIfNeeded();await clicarMapa(page,200,200);
    await tela.press('ArrowRight');await tela.press('ArrowDown');
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres[1])).toEqual({x:220,y:220});
    await tela.press('Delete');
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres.length)).toBe(2);
    await tela.press('Control+z');
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres.length)).toBe(3);
    await tela.press('Control+Shift+z');
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres.length)).toBe(2);
    await tela.press('Control+z');
    await clicarMapa(page,0,340);await tela.press('ArrowRight');await tela.press('ArrowDown');await tela.press('Delete');
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres[0])).toEqual({x:0,y:360});
    await expect(page.locator('[data-historico-livre="refazer"]')).toBeDisabled();
    await clicarMapa(page,1198,340);await tela.press('ArrowLeft');await tela.press('ArrowUp');await tela.press('Delete');
    expect(await page.evaluate(()=>rascunhoDoMapaNoEditor.pontosLivres.at(-1))).toEqual({x:1200,y:320});
    const geometria=await page.evaluate(()=>capturarGeometriaLivre());
    await page.locator('[data-modo-editor="normal"]').click();
    await page.locator('[data-modo-editor="livre"]').click();
    expect(await page.evaluate(()=>capturarGeometriaLivre())).toBe(geometria);
    await expect(page.locator('[data-historico-livre="desfazer"]')).toBeEnabled();
});

test('Validacao rejeita geometria malformada e mantem codigos antigos',async({page})=>{
    const r=await page.evaluate(()=>{
        const normal={...criarMapaPadraoDoEditor(),nome:'Normal',criador:'Criador de teste'};
        const livre={...normal,modoEdicao:'livre',pontosLivres:[{x:0,y:300},{x:1200,y:300}],decoracoesLivres:[]};
        const invalidos=[{...livre,pontosLivres:[{x:1,y:300},{x:1200,y:300}]},{...livre,pontosLivres:[{x:0,y:300}]},
            {...livre,pontosLivres:[{x:0,y:300},{x:0,y:300},{x:1200,y:300}]},
            {...livre,decoracoesLivres:[{tipo:'inexistente',x:20,y:20,escala:1}]},
            {...livre,decoracoesLivres:[{tipo:'arvore',x:1201,y:20,escala:1}]},
            {...livre,decoracoesLivres:Array.from({length:121},()=>({tipo:'arvore',x:20,y:20,escala:1}))}];
        return {validos:!!normalizarMapaDoEditor(livre),invalidos:invalidos.every(m=>normalizarMapaDoEditor(m)===null),
            legado:importarMapaPeloCodigo(gerarCodigoDoMapaNoEditor(normal)).idDoCaminho};
    });
    expect(r).toEqual({validos:true,invalidos:true,legado:'ziguezague'});
});

test('Erro de gravacao mantem rascunho, reverte mapas e permite tentar novamente',async({page})=>{
    const resultado=await page.evaluate(()=>{
        const anterior=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;
        salvarMapaDoEditor();
        const falha={rascunho:!!rascunhoDoMapaNoEditor,mapas:mapasCriadosNoEditor.length,chave:localStorage.getItem(CHAVE_MAPAS_DO_EDITOR),mensagem:mensagemDoEditor};
        atualizarSalvoAtivo=anterior;salvarMapaDoEditor();
        return {falha,salvos:mapasCriadosNoEditor.length};
    });
    expect(resultado.falha).toMatchObject({rascunho:true,mapas:0,chave:null});
    expect(resultado.falha.mensagem).toContain('Não foi possível salvar');expect(resultado.salvos).toBe(1);
});
