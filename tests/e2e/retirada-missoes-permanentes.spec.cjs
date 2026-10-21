const { test, expect } = require('@playwright/test');

test('painel novo mostra só diárias e semanais, sem criar progresso permanente', async ({ page }, info) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarMissoes()"]').click();
    await expect(page.locator('.desafio-diario-cartao')).toHaveCount(3);
    await expect(page.locator('.desafio-semanal-cartao')).toHaveCount(5);
    await expect(page.locator('.categorias-missoes')).toHaveCount(0);
    await expect(page.locator('.missao-cartao:not(.desafio-diario-cartao)')).toHaveCount(0);
    await expect(page.locator('#resgatar-premio-final-missoes')).toHaveCount(0);
    expect(await page.evaluate(() => {
        registrarProgressoDaMissao('torresConstruidas', 1);
        return localStorage.getItem(CHAVE_MISSOES_PERMANENTES);
    })).toBeNull();
    await page.locator('#conteudo-menu').screenshot({ path: info.outputPath('missoes-sem-permanentes.png') });
});

test('75 resgates antigos continuam 75/100 após retirar o catálogo ativo', async ({ page }) => {
    await page.addInitScript(() => {
        if (sessionStorage.getItem('contador-legado-75')) return;
        sessionStorage.setItem('contador-legado-75', 'true');
        localStorage.setItem('guardians-of-pixel-missoes-permanentes-v1', JSON.stringify({
            recompensasResgatadas: Array.from({ length: 75 }, (_, indice) => `permanente${indice + 1}`)
        }));
    });
    await page.goto('/');
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(75);
    expect(await page.evaluate(() => Object.hasOwn(CONFIG.missoes, 'permanentes'))).toBe(false);
    await page.reload();
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(75);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem(CHAVE_MISSOES_PERMANENTES))
        .recompensasResgatadas.length)).toBe(75);
});

test('save antigo preserva contador, resgates pendentes e prêmio final sem novos cartões', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.evaluate(() => {
        const antigo = {
            ...CONFIG.missoes.criteriosDoPremioFinalLegado,
            recompensasResgatadas: Array.from({ length: 98 }, (_, indice) => `permanente${indice + 1}`),
            recompensasConcedidas: {}
        };
        localStorage.setItem(CHAVE_MISSOES_PERMANENTES, JSON.stringify(antigo));
    });
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarMissoes()"]').click();
    await expect(page.locator('.categorias-missoes')).toHaveCount(0);
    await expect(page.locator('.premio-final-missoes')).toHaveCount(2);
    await expect(page.locator('.premio-final-missoes .botao-resgatar-missao')).toHaveCount(2);
    await expect(page.locator('#resgatar-premio-final-missoes')).toBeEnabled();
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(98);
    const xpAntes = await page.evaluate(() => progressaoDeNivel.experienciaTotal);
    await page.locator('#resgatar-premio-final-missoes').click();
    expect(await page.evaluate(() => progressaoDeNivel.experienciaTotal)).toBe(xpAntes + 1250);
    await page.locator('.premio-final-missoes .botao-resgatar-missao').first().click();
    await page.locator('.premio-final-missoes .botao-resgatar-missao').first().click();
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(100);
    await expect(page.locator('.premio-final-missoes .botao-resgatar-missao')).toHaveCount(0);
    await page.reload();
    expect(await page.evaluate(() => ({
        total: obterTotalDeMissoesResgatadas(),
        xp: progressaoDeNivel.experienciaTotal,
        finalResgatado: premioFinalLegado.resgatado
    }))).toEqual({ total: 100, xp: xpAntes + 1250, finalResgatado: true });
});
