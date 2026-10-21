const { test, expect } = require('@playwright/test');

test('aviso do lobby soma permanentes, diárias e semanais prontas e acompanha os resgates', async ({ page }, info) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    const lerAviso = () => page.evaluate(() => resumoMissoesMenu.textContent);
    const ids = await page.evaluate(() => {
        const diaria = CATALOGO_DOS_DESAFIOS_DIARIOS.find(item => item.id === progressoDosDesafiosDiarios.ids[0]);
        const semanal = DESAFIOS_SEMANAIS[0];
        jogoIniciado = true;
        reiniciarEstatisticasDaPartidaParaMissoes();
        registrarProgressoDiarioPorPropriedade(diaria.propriedadeDoProgresso, diaria.objetivo, true);
        registrarProgressoDesafioSemanal(semanal.id, semanal.objetivo);
        jogoIniciado = false;
        return { diaria: diaria.id, semanal: semanal.id };
    });
    expect(await lerAviso()).toBe('2 prêmios prontos');
    await page.evaluate(() => {
        progressoMissoesPermanentes.tutorial = 1;
        salvarProgressoMissoesPermanentes();
        atualizarResumoDasMissoesNoMenu();
    });
    expect(await lerAviso()).toBe('3 prêmios prontos');
    await page.locator('#resumo-missoes-menu').screenshot({ path: info.outputPath('aviso-tres-premios.png') });

    await page.evaluate(() => resgatarMissaoPermanente('permanente2'));
    expect(await lerAviso()).toBe('2 prêmios prontos');
    await page.evaluate(id => resgatarDesafioDiario(id), ids.diaria);
    expect(await lerAviso()).toBe('1 prêmio pronto');
    await page.reload();
    expect(await lerAviso()).toBe('1 prêmio pronto');
    await page.evaluate(() => selecionarIdioma('en'));
    expect(await lerAviso()).toBe('1 reward ready');
    await page.evaluate(() => selecionarIdioma('es'));
    expect(await lerAviso()).toBe('1 premio listo');
    await page.evaluate(() => selecionarIdioma('pt-BR'));
    await page.evaluate(id => resgatarDesafioSemanal(id), ids.semanal);
    expect(await lerAviso()).toBe('0 prêmios prontos');
});
