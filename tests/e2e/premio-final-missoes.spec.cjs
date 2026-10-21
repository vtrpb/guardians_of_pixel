const {test,expect}=require('@playwright/test');

test('Prêmio final exige 100 objetivos e concede 1250 XP sem antecipar as skins dos eventos',async({page},info)=>{
    await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const antes=await page.evaluate(()=>{
        for(const m of obterCatalogoHistoricoDasMissoes()) progressoMissoesPermanentes[m.propriedadeDoProgresso]=Math.max(progressoMissoesPermanentes[m.propriedadeDoProgresso]||0,m.objetivo);
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
    await page.locator('.premio-final-missoes').first().screenshot({path:info.outputPath('premio-final-celular.png')});
    await page.locator('#resgatar-premio-final-missoes').click();
    expect(await page.evaluate(()=>progressaoDeNivel.experienciaTotal)).toBe(antes.xp+1250);
    expect(await page.evaluate(()=>['guardiaoSolar','sentinelaCosmica'].every(id=>!recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes(id)))).toBe(true);
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('lendaDasCemMissoes'))).toBe(false);
    expect(await page.evaluate(()=>obterSkinsDoAlbum().filter(s=>['guardiaoSolar','sentinelaCosmica'].includes(s.id)&&s.desbloqueada).length)).toBe(0);
    await page.reload();
    await page.evaluate(()=>resgatarPremioFinalDasMissoes());
    expect(await page.evaluate(()=>progressaoDeNivel.experienciaTotal)).toBe(antes.xp+1250);
    expect(await page.evaluate(()=>obterSkinsDoAlbum().filter(s=>['guardiaoSolar','sentinelaCosmica'].includes(s.id)&&s.desbloqueada).length)).toBe(0);
    await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);
    expect(await page.evaluate(()=>Boolean(progressoMissoesPermanentes.premioFinalResgatado))).toBe(false);
    expect(await page.evaluate(()=>Boolean(progressoMissoesPermanentes.premioFinalDesbloqueado))).toBe(false);
    expect(await page.evaluate(()=>obterSkinsDoAlbum().filter(s=>['guardiaoSolar','sentinelaCosmica'].includes(s.id)&&s.desbloqueada).length)).toBe(0);
    expect(erros).toEqual([]);
});

test('save antigo conserva o direito ao prêmio final após separar o catálogo', async ({ page }) => {
    await page.goto('/');
    const metasConferidas = await page.evaluate(() => {
        const metas = {};
        for (const missao of obterCatalogoHistoricoDasMissoes()) {
            metas[missao.propriedadeDoProgresso] = Math.max(
                metas[missao.propriedadeDoProgresso] || 0, missao.objetivo
            );
        }
        return {
            metasIguais: JSON.stringify(metas) === JSON.stringify(CONFIG.missoes.criteriosDoPremioFinalLegado),
            quantidade: Object.keys(metas).length
        };
    });
    expect(metasConferidas).toEqual({ metasIguais: true, quantidade: 58 });
    await page.evaluate(() => {
        const antigo = criarProgressoPermanenteVazio();
        for (const missao of obterCatalogoHistoricoDasMissoes()) {
            antigo[missao.propriedadeDoProgresso] = Math.max(
                antigo[missao.propriedadeDoProgresso] || 0, missao.objetivo
            );
        }
        localStorage.setItem(CHAVE_MISSOES_PERMANENTES, JSON.stringify(antigo));
    });
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    const estado = await page.evaluate(() => {
        const direitoImportado = premioFinalLegado.desbloqueado === true
            && JSON.parse(localStorage.getItem(CHAVE_PREMIO_FINAL_LEGADO)).desbloqueado === true;
        for (const missao of obterCatalogoHistoricoDasMissoes()) {
            progressoMissoesPermanentes[missao.propriedadeDoProgresso] = 0;
        }
        return { direitoImportado, disponivel: premioFinalDasMissoesDisponivel(), xp: progressaoDeNivel.experienciaTotal };
    });
    expect(estado.direitoImportado).toBe(true);
    expect(estado.disponivel).toBe(true);
    await page.evaluate(() => localStorage.removeItem(CHAVE_MISSOES_PERMANENTES));
    await page.reload();
    expect(await page.evaluate(() => premioFinalDasMissoesDisponivel())).toBe(true);
    await page.evaluate(() => resgatarPremioFinalDasMissoes());
    expect(await page.evaluate(() => progressaoDeNivel.experienciaTotal)).toBe(estado.xp + 1250);
    await page.reload();
    expect(await page.evaluate(() => premioFinalDasMissoesDisponivel())).toBe(false);
    expect(await page.evaluate(() => progressaoDeNivel.experienciaTotal)).toBe(estado.xp + 1250);
});
