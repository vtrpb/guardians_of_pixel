const { test, expect } = require('@playwright/test');

test('Formatura exige finalizar o guia, persiste e tem imagem', async ({ page }, info) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => iniciarTutorialPeloMenu());
    for (let i = 0; i < 3; i++) await page.locator('#botao-continuar-cutscene-carta').click();
    await page.evaluate(() => pularTutorialDaPartida());
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('formatura'))).toBe(false);
    await page.evaluate(() => { iniciarTutorialDaPartida(); avancarTutorialPara(CONFIG.tutorial.quantidadeDePassos); });
    await page.locator('#botao-continuar-tutorial').click();
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('formatura'))).toBe(true);
    await page.reload();
    expect(await page.evaluate(() => recompensasPermanentesDasMissoes.conquistasDesbloqueadas.filter(id => id === 'formatura').length)).toBe(1);
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => mostrarConquistas());
    const imagem = page.locator('img[src="assets/conquistas/formatura.svg"]').first();
    await imagem.scrollIntoViewIfNeeded();
    expect(await imagem.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    await page.screenshot({ path: info.outputPath('formatura.png') });
    expect(erros).toEqual([]);
});
