const {test,expect}=require('@playwright/test');

test('Prêmio final exige 100 objetivos, concede duas skins e 1250 XP apenas uma vez por slot',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    const antes=await page.evaluate(()=>{
        for(const m of CONFIG.missoes.permanentes) progressoMissoesPermanentes[m.propriedadeDoProgresso]=Math.max(progressoMissoesPermanentes[m.propriedadeDoProgresso]||0,m.objetivo);
        progressoMissoesPermanentes.nivel12=0;
        const xp=progressaoDeNivel.experienciaTotal;
        resgatarPremioFinalDasMissoes();
        const bloqueado=!progressoMissoesPermanentes.premioFinalResgatado&&xp===progressaoDeNivel.experienciaTotal;
        progressoMissoesPermanentes.nivel12=1;
        mostrarMissoes();
        return {xp,bloqueado};
    });
    expect(antes.bloqueado).toBe(true);
    await expect(page.locator('#resgatar-premio-final-missoes')).toBeEnabled();
    await page.setViewportSize({width:390,height:844});
    await page.locator('.premio-final-missoes').screenshot({path:info.outputPath('premio-final-celular.png')});
    await page.locator('#resgatar-premio-final-missoes').click();
    expect(await page.evaluate(()=>progressaoDeNivel.experienciaTotal)).toBe(antes.xp+1250);
    expect(await page.evaluate(()=>CONFIG.missoes.premioFinal.skins.every(id=>recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes(id)))).toBe(true);
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('lendaDasCemMissoes'))).toBe(true);
    await page.locator('.premio-final-skin').first().getByRole('button',{name:'Equipar skin'}).click();
    expect(await page.evaluate(()=>obterSkinEquipadaDaTorrePadrao().nome)).toBe('Guardião Solar');
    expect(await page.evaluate(()=>obterSkinsDoAlbum().filter(s=>CONFIG.missoes.premioFinal.skins.includes(s.id)&&s.desbloqueada).length)).toBe(2);
    await page.reload();
    await page.evaluate(()=>resgatarPremioFinalDasMissoes());
    expect(await page.evaluate(()=>progressaoDeNivel.experienciaTotal)).toBe(antes.xp+1250);
    expect(await page.evaluate(()=>obterSkinEquipadaDaTorrePadrao().nome)).toBe('Guardião Solar');
    await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);
    expect(await page.evaluate(()=>Boolean(progressoMissoesPermanentes.premioFinalResgatado))).toBe(false);
    expect(await page.evaluate(()=>obterSkinsDoAlbum().filter(s=>CONFIG.missoes.premioFinal.skins.includes(s.id)&&s.desbloqueada).length)).toBe(0);
    expect(erros).toEqual([]);
});
