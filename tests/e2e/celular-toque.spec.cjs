const { test, expect } = require('@playwright/test');
test.use({ hasTouch: true, isMobile: true });
for (const tamanho of [{width:390,height:740}, {width:844,height:320}]) {
    test(`Toque: iniciar e ampliar ${tamanho.width}`, async ({ page }, testInfo) => {
        await page.setViewportSize(tamanho);
        await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
        await page.goto('/');
        await page.locator('#botao-jogar-menu-inicial').tap();
        await page.locator('.botao-lobby-jogar').tap();
        await page.locator('.botao-confirmar-selecao-defesas').scrollIntoViewIfNeeded();
        await page.screenshot({path:testInfo.outputPath('selecao.png')});
        await page.locator('.botao-confirmar-selecao-defesas').tap();
        expect(await page.evaluate(() => jogoIniciado)).toBe(true);
        for(let i=0;i<3;i++)await page.locator('#botao-continuar-cutscene-carta').tap();
        await page.evaluate(() => definirJogoPausado(true));
        await page.locator('#botao-ampliar-mapa').tap();
        await expect(page.locator('#botao-ampliar-mapa')).toHaveAttribute('aria-pressed', 'true');
        expect(await page.locator('#game').evaluate(el => el.getBoundingClientRect().width)).toBeGreaterThanOrEqual(720);
        const alvo = await page.evaluate(() => {
            const palco = canvas.closest('.palco-jogo');
            const escala = canvas.getBoundingClientRect().width / canvas.width;
            palco.scrollTop = 440 * escala - palco.clientHeight / 2;
            const caixa = canvas.getBoundingClientRect();
            return { x: caixa.left + 100 * escala, y: caixa.top + 440 * escala };
        });
        await page.touchscreen.tap(alvo.x, alvo.y);
        expect(await page.evaluate(() => torres.length)).toBe(1);
        expect(await page.evaluate(() => Math.abs(torres[0].x - 100) < 5 && Math.abs(torres[0].y - 440) < 5)).toBe(true);
        await page.screenshot({path:testInfo.outputPath('ampliado.png')});
        await page.locator('#botao-ampliar-mapa').tap();
        await expect(page.locator('#botao-ampliar-mapa')).toHaveAttribute('aria-pressed', 'false');
        await page.screenshot({path:testInfo.outputPath('partida.png')});
    });
}
