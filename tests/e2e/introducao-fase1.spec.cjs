const { test, expect } = require('@playwright/test');

for (const tutorialConcluido of [false, true]) {
    test(`Fase 1: pensamentos antes da defesa, tutorial concluído = ${tutorialConcluido}`, async ({ page }, testInfo) => {
        const erros = [];
        page.on('pageerror', erro => erros.push(erro.message));
        await page.addInitScript(concluido => {
            localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', String(concluido));
        }, tutorialConcluido);
        await page.goto('/');
        await page.locator('#botao-jogar-menu-inicial').click();
        await page.evaluate(() => fecharConteudoMenu());
        await page.locator('.botao-lobby-jogar').click();
        await page.locator('.botao-confirmar-selecao-defesas').click();
        const cena = page.locator('#camada-cutscene-carta');
        const continuar = page.locator('#botao-continuar-cutscene-carta');
        await expect(page.locator('#texto-cutscene-carta')).toHaveText('Como eu vim parar aqui? Não consigo lembrar…');
        await expect(page.locator('#camada-tutorial-partida')).toBeHidden();
        await page.keyboard.press('Escape');
        await cena.click({ position: { x: 5, y: 5 } });
        await expect(cena).toBeVisible();
        expect(await page.evaluate(() => jogoPausado && inimigos.length === 0)).toBe(true);
        await continuar.click();
        await expect(page.locator('#texto-cutscene-carta')).toHaveText('Essas criaturas… Por que elas querem me atacar?');
        await page.screenshot({ path: testInfo.outputPath('pensamento-desktop.png') });
        await page.setViewportSize({ width: 390, height: 844 });
        await page.screenshot({ path: testInfo.outputPath('pensamento-celular.png') });
        await continuar.click();
        await expect(page.locator('#texto-cutscene-carta')).toHaveText('Preciso defender este lugar… Depois tento entender.');
        await continuar.click();
        await expect(cena).toBeHidden();
        expect(await page.evaluate(() => tutorialAtivo)).toBe(!tutorialConcluido);
        expect(await page.evaluate(() => jogoPausado)).toBe(!tutorialConcluido);
        expect(await page.evaluate(() => ['en', 'es'].every(idioma => {
            selecionarIdioma(idioma);
            return CONFIG.introducaoFase1.every(texto => localizar(texto) !== texto);
        }))).toBe(true);
        expect(erros).toEqual([]);
    });
}
