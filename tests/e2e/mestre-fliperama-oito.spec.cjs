const { test, expect } = require('@playwright/test');

test('Mestre do Fliperama exige oito tipos distintos e preserva progresso', async ({ page }, info) => {
    await page.goto('/');
    expect(await page.evaluate(() => {
        const conquista = CONFIG.conquistas.mestreDoFliperama;
        for (const tipo of ['alvo', 'labirinto', 'voo', 'coleta', 'sequencia', 'alvo']) registrarMinigameFliperamaConcluidoParaConquistas(tipo);
        return { progresso: obterEstadoDaConquista('mestreDoFliperama', conquista).progresso, desbloqueada: conquistaEstaDesbloqueada('mestreDoFliperama'), lista: conquista.itensObrigatorios, disponiveis: CONFIG.fliperama.minigame.tiposDisponiveis };
    })).toMatchObject({ progresso: 5, desbloqueada: false, lista: ['alvo', 'labirinto', 'voo', 'coleta', 'sequencia', 'carga', 'reflexo', 'pulso'], disponiveis: ['alvo', 'labirinto', 'voo', 'coleta', 'sequencia', 'carga', 'reflexo', 'pulso'] });
    await page.reload();
    await page.evaluate(() => {
        registrarMinigameFliperamaConcluidoParaConquistas('carga');
        registrarMinigameFliperamaConcluidoParaConquistas('reflexo');
    });
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('mestreDoFliperama'))).toBe(false);
    await page.evaluate(() => registrarMinigameFliperamaConcluidoParaConquistas('pulso'));
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('mestreDoFliperama'))).toBe(true);
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => mostrarConquistas());
    const imagem = page.locator('img[src="assets/conquistas/mestreDoFliperama.svg"]').first();
    await imagem.scrollIntoViewIfNeeded();
    await page.screenshot({ path: info.outputPath('fliperama-oito.png') });
});
