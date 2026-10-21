const { test, expect } = require('@playwright/test');

test('marcos antigos aparecem como conquistas sem mudar missões permanentes', async ({ page }, info) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-missoes-permanentes-v1', JSON.stringify({
            inimigosEliminados: 1, torresConstruidas: 1, melhorias: 1, bosses: 1
        }));
    });
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    expect(await page.evaluate(() => ({
        total: Object.keys(CONFIG.conquistas).length,
        catalogoAtivo: Object.hasOwn(CONFIG.missoes, 'permanentes'),
        memoraveis: ['primeiroInimigo', 'primeiraTorre', 'primeiraMelhoria', 'primeiroChefe']
            .every(conquistaEstaDesbloqueada)
    }))).toEqual({ total: 47, catalogoAtivo: false, memoraveis: true });
    await page.evaluate(() => mostrarConquistas('comuns'));
    await expect(page.locator('.conquistas-resumo')).toContainText('4 de 47');
    await expect(page.locator('.conquista-cartao')).toHaveCount(33);
    await page.locator('#conteudo-menu').screenshot({ path: info.outputPath('conquistas-memoraveis.png') });
    expect(erros).toEqual([]);
});

test('marcos antigos migram para estatísticas próprias e sobrevivem sem o save permanente', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
        localStorage.setItem(CHAVE_MISSOES_PERMANENTES, JSON.stringify({
            inimigosEliminados: 1, torresConstruidas: 1, melhorias: 1, bosses: 1
        }));
    });
    await page.reload();
    const importado = await page.evaluate(() => ({
        estatisticas: JSON.parse(localStorage.getItem(CHAVE_ESTATISTICAS_CONQUISTAS)),
        conquistas: ['primeiroInimigo', 'primeiraTorre', 'primeiraMelhoria', 'primeiroChefe'].map(conquistaEstaDesbloqueada)
    }));
    expect(importado.conquistas).toEqual([true, true, true, true]);
    for (const propriedade of ['inimigosEliminados', 'torresConstruidas', 'melhorias', 'bosses']) {
        expect(importado.estatisticas[propriedade]).toBeGreaterThan(0);
    }
    await page.evaluate(() => {
        localStorage.removeItem(CHAVE_MISSOES_PERMANENTES);
        const recompensas = JSON.parse(localStorage.getItem(CHAVE_RECOMPENSAS_MISSOES));
        recompensas.conquistasDesbloqueadas = recompensas.conquistasDesbloqueadas.filter(id =>
            !['primeiroInimigo', 'primeiraTorre', 'primeiraMelhoria', 'primeiroChefe'].includes(id));
        localStorage.setItem(CHAVE_RECOMPENSAS_MISSOES, JSON.stringify(recompensas));
    });
    await page.reload();
    expect(await page.evaluate(() => ['primeiroInimigo', 'primeiraTorre', 'primeiraMelhoria', 'primeiroChefe']
        .every(conquistaEstaDesbloqueada))).toBe(true);
    expect(await page.evaluate(() => progressoMissoesPermanentes.torresConstruidas || 0)).toBe(0);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => trocarSalvoAtivo(2))]);
    expect(await page.evaluate(() => ['primeiroInimigo', 'primeiraTorre', 'primeiraMelhoria', 'primeiroChefe']
        .some(conquistaEstaDesbloqueada))).toBe(false);
});
