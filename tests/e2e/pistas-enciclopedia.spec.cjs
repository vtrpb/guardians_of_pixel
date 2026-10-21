const {test,expect}=require('@playwright/test');
test('Pistas: descoberta, persistencia, releitura traduzida e nenhum duplicado',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.addInitScript(()=>{
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true');
        localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
    });
    await page.goto('/');
    await expect(page.locator('#tela-carregamento')).toBeHidden();
    for(const id of ['entidade','relogio','portal','relogio']){
        await page.locator(`[data-segredo="${id}"]`).click();
        await page.keyboard.press('Escape');
    }
    expect(await page.evaluate(()=>[...carregarRegistrosDaEnciclopedia()].filter(id=>id.startsWith('paisagem-')).sort()))
        .toEqual(['paisagem-ecos','paisagem-entidade','paisagem-portal','paisagem-relogio']);
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(()=>mostrarEnciclopedia());
    await page.locator('[data-registro="paisagem-relogio"]').click();
    await expect(page.locator('.enciclopedia-texto')).toContainText('O vidro está partido');
    await page.screenshot({path:info.outputPath('pista-enciclopedia.png')});
    await page.evaluate(()=>{idiomaAtual='en';mostrarEnciclopedia('paisagem-relogio');});
    await expect(page.locator('.enciclopedia-texto')).toContainText('The glass is broken');
    await page.evaluate(()=>{idiomaAtual='es';mostrarEnciclopedia('paisagem-relogio');});
    await expect(page.locator('.enciclopedia-texto')).toContainText('El cristal está roto');
    expect(erros).toEqual([]);
});

test('Pistas: falha ao salvar visivel na abertura e recuperacao',async({page})=>{
    await page.goto('/');
    await expect(page.locator('#tela-carregamento')).toBeHidden();
    await page.evaluate(()=>{window.salvarSlotTeste=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;});
    await page.locator('[data-segredo="relogio"]').click();
    await expect(page.locator('.pista-abertura small')).toContainText('Não foi possível salvar');
    expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().has('paisagem-relogio'))).toBe(false);
    await page.keyboard.press('Escape');
    await page.evaluate(()=>{atualizarSalvoAtivo=window.salvarSlotTeste;});
    await page.locator('[data-segredo="relogio"]').click();
    expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().has('paisagem-relogio'))).toBe(true);
});
