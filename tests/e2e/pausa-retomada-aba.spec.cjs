const { test, expect } = require('@playwright/test');

test('inimigos voltam a andar após pausa manual e troca de aba', async ({ page, context }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
        localStorage.setItem('tower-defense-2-progresso-fases-v2', '6');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => { faseSelecionada = 7; iniciarPartida(false); });
    await page.waitForFunction(() => inimigos.length > 0);
    const inicio = await page.evaluate(() => {
        definirMenuDaPartidaAberto(true);
        const primeiro = inimigos[0];
        return { x: primeiro.x, y: primeiro.y, pausado: jogoPausado };
    });
    expect(inicio.pausado).toBe(true);
    const outraAba = await context.newPage();
    await outraAba.goto('/');
    await page.bringToFront();
    const retomada = await page.evaluate(() => {
        fecharMenuDaPartida();
        return { pausado: jogoPausado, menuFechado: painelMenuPartida.hidden };
    });
    expect(retomada).toEqual({ pausado: false, menuFechado: true });
    await expect.poll(() => page.evaluate(({ x, y }) =>
        inimigos.some(inimigo => Math.hypot(inimigo.x - x, inimigo.y - y) > 2), inicio
    ), { timeout: 3000 }).toBe(true);
    const quadroInterrompido = await page.evaluate(() => {
        definirMenuDaPartidaAberto(true);
        const { x, y } = inimigos[0];
        cancelAnimationFrame(quadroDaPartidaAgendado);
        fecharMenuDaPartida();
        return { x, y, pausado: jogoPausado, quadroAgendado: quadroDaPartidaAgendado > 0 };
    });
    expect(quadroInterrompido.pausado).toBe(false);
    expect(quadroInterrompido.quadroAgendado).toBe(true);
    await expect.poll(() => page.evaluate(({ x, y }) =>
        inimigos.some(inimigo => Math.hypot(inimigo.x - x, inimigo.y - y) > 2), quadroInterrompido
    ), { timeout: 3000 }).toBe(true);
    await outraAba.close();
});
