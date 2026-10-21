const { test, expect } = require('@playwright/test');

test('Saída mantém a duração ao interromper a entrada da abertura, inclusive após recarregar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
    });
    await page.goto('/');
    for (let tentativa = 0; tentativa < 2; tentativa++) {
        await expect(page.locator('#tela-carregamento')).toBeHidden();
        await page.evaluate(async () => {
            // Reproduz a entrada ainda incompleta no instante de clicar em Jogar.
            telaInicialJogo.classList.remove('menu-inicial-visivel');
            telaInicialJogo.style.transition = 'none';
            void telaInicialJogo.offsetWidth;
            telaInicialJogo.style.transition = 'opacity 2s linear';
            telaInicialJogo.classList.add('menu-inicial-visivel');
            await new Promise(resolve => setTimeout(resolve, 100));
            telaInicialJogo.style.removeProperty('transition');
            entrarNoLobbyPeloMenuInicial();
        });
        await page.waitForTimeout(650);
        const estado = await page.locator('#tela-inicial-jogo').evaluate(e => ({
            opacidade: Number(getComputedStyle(e).opacity), oculto: e.hidden,
            bloqueado: document.getElementById('menu-principal').hasAttribute('inert')
        }));
        expect(estado.oculto).toBe(false);
        expect(estado.bloqueado).toBe(true);
        expect(estado.opacidade).toBeGreaterThan(.4);
        expect(estado.opacidade).toBeLessThan(.95);
        await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
        if (tentativa === 0) await page.reload();
    }
});

for (const movimento of ['no-preference', 'reduce']) {
    test(`Paisagem: transição ${movimento}, bloqueio de cliques e foco no lobby`, async ({ page }, info) => {
        const erros = [];
        page.on('pageerror', e => erros.push(e.message));
        await page.emulateMedia({ reducedMotion: movimento });
        await page.addInitScript(() => {
            localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        });
        await page.goto('/');
        const tela = page.locator('#tela-inicial-jogo');
        await expect(page.locator('#tela-carregamento')).toBeHidden();
        await expect(tela).toHaveCSS('opacity', '1');
        await tela.screenshot({ path: info.outputPath('paisagem-desktop.png') });
        // Esperar na abertura não pode fazer a preferência do sistema pular a saída.
        await page.waitForTimeout(2200);
        await page.evaluate(() => { entrarNoLobbyPeloMenuInicial(); entrarNoLobbyPeloMenuInicial(); });
        await expect(tela).toHaveClass(/menu-inicial-saindo/);
        await expect(page.locator('#menu-principal')).toHaveAttribute('inert', '');
        expect(await page.evaluate(() => obterDuracaoDaAbertura('duracaoSaidaMs'))).toBe(1800);
        expect(await tela.evaluate(e => getComputedStyle(e).animationDuration)).toBe('1.8s');
        expect(await tela.evaluate(e => getComputedStyle(e).transform)).toBe('none');
        // Mede a imagem intermediária real, sem acelerar o relógio da animação.
        await expect.poll(() => tela.evaluate(e => {
            const opacidade = Number(getComputedStyle(e).opacity);
            return opacidade > .2 && opacidade < .8 && !e.hidden
                && document.getElementById('menu-principal').hasAttribute('inert');
        }), { intervals: [100], timeout: 1600 }).toBe(true);
        await tela.screenshot({ path: info.outputPath('transicao-intermediaria.png') });
        await expect(tela).toBeHidden();
        await expect(page.locator('#menu-principal')).not.toHaveAttribute('inert', '');
        await expect(page.locator('.botao-lobby-jogar')).toBeFocused();
        expect(erros).toEqual([]);
    });
}
