const {test,expect}=require('@playwright/test');

test('catálogo semanal próprio mantém 51 metas sem consultar as permanentes', async ({ page }) => {
    await page.goto('/');
    const resultado = await page.evaluate(() => {
        const sorteio = obterDesafiosRotativosDaSemana('2026-W40');
        return {
            candidatas: CANDIDATAS_DOS_DESAFIOS_ROTATIVOS.length,
            idsUnicos: new Set(IDS_DOS_DESAFIOS_ROTATIVOS).size,
            sorteadas: sorteio.map(missao => missao.id),
            catalogoIndependente: !obterDesafiosRotativosDaSemana.toString().includes('CONFIG.missoes.permanentes'),
            filtroDiarioIndependente: !catalogoDosDesafiosDiarios.toString().includes('CONFIG.missoes.permanentes')
        };
    });
    expect(resultado.candidatas).toBe(51);
    expect(resultado.idsUnicos).toBe(51);
    expect(resultado.sorteadas).toHaveLength(5);
    expect(new Set(resultado.sorteadas).size).toBe(5);
    expect(resultado.catalogoIndependente).toBe(true);
    expect(resultado.filtroDiarioIndependente).toBe(true);
});

test('desafios semanais mostram progresso, renovação e resgate',async({page})=>{
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>tutorialConcluido=true);
    await page.evaluate(()=>mostrarMissoes());
    await expect(page.locator('#desafios-semanais')).toBeVisible();
    await expect(page.locator('.desafio-semanal-cartao')).toHaveCount(5);
    const antes=await page.evaluate(()=>({fragmentosPixel,xp:progressaoDeNivel.experienciaTotal}));
    await page.evaluate(()=>{
        fecharConteudoMenu(); iniciarPartida();
        const desafio=DESAFIOS_SEMANAIS[0];for(let i=0;i<desafio.objetivo;i++)registrarProgressoDesafioSemanal(desafio.id);
        partidaEncerrada=true; jogoIniciado=false; mostrarMissoes();
    });
    expect(await page.evaluate(()=>desafioSemanalConcluido(DESAFIOS_SEMANAIS[0]))).toBe(true);
    await page.evaluate(()=>resgatarDesafioSemanal(DESAFIOS_SEMANAIS[0].id));
    expect(await page.evaluate(()=>fragmentosPixel)).toBe(antes.fragmentosPixel+12);
    expect(await page.evaluate(()=>progressaoDeNivel.experienciaTotal)).toBe(antes.xp+60);
    expect(await page.evaluate(()=>progressoDosDesafiosSemanais.resgatados)).toContain(await page.evaluate(()=>DESAFIOS_SEMANAIS[0].id));
});

test('desafios semanais contam eliminações e vitórias do Clássico', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        DESAFIOS_SEMANAIS=Object.freeze([{id:'eliminar',propriedadeDoProgresso:'inimigosEliminados',objetivo:100},{id:'vencer',propriedadeDoProgresso:'fasesConcluidas',objetivo:3}]);progressoDosDesafiosSemanais = criarProgressoSemanalVazio();
        jogoIniciado = true;
        mapaPersonalizadoAtivo = { classico: true, numeroClassico: 101, dificuldadeClassica: 'normal' };
        registrarInimigoEliminadoParaDesafioSemanal({ tipo: 'normal' });
        registrarProgressoDesafioSemanal('vencer');
        return { eliminados: progressoDosDesafiosSemanais.progresso.eliminar, vitorias: progressoDosDesafiosSemanais.progresso.vencer };
    });
    expect(resultado).toEqual({ eliminados: 1, vitorias: 1 });
});

test('campanha não duplica vitória semanal e continua contando após o teto permanente', async ({ page }) => {
    await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const resultado = await page.evaluate(() => {
        iniciarPartida();
        DESAFIOS_SEMANAIS = Object.freeze([
            {id:'eliminar',propriedadeDoProgresso:'inimigosEliminados',objetivo:10},
            {id:'vencer',propriedadeDoProgresso:'fasesConcluidas',objetivo:10}
        ]);
        progressoDosDesafiosSemanais = criarProgressoSemanalVazio();
        progressoMissoesPermanentes.inimigosEliminados = 50000;
        progressoMissoesPermanentes.fasesConcluidas = 100;
        registrarProgressoDaMissao('inimigosEliminados',1);
        registrarFaseConcluidaParaMissoes();
        registrarFaseConcluidaParaMissoes();
        return {
            inimigosSemanais:progressoDosDesafiosSemanais.progresso.eliminar,
            vitoriasSemanais:progressoDosDesafiosSemanais.progresso.vencer,
            inimigosPermanentes:progressoMissoesPermanentes.inimigosEliminados,
            vitoriasPermanentes:progressoMissoesPermanentes.fasesConcluidas
        };
    });
    expect(resultado).toEqual({inimigosSemanais:1,vitoriasSemanais:1,inimigosPermanentes:50000,vitoriasPermanentes:100});
});
