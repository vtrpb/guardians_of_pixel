const { test, expect } = require('@playwright/test');

test('coleções e vitórias antigas migram para estatísticas independentes por slot', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
        const antigo = criarProgressoPermanenteVazio();
        antigo.colecoes = { bosses: [], fases: [8, 9], mapasInfinitos: [1] };
        antigo.vitoriasPorFase = { 1: 4 };
        localStorage.setItem(CHAVE_MISSOES_PERMANENTES, JSON.stringify(antigo));
        localStorage.removeItem(CHAVE_ESTATISTICAS_DOS_OBJETIVOS);
    });
    await page.reload();
    const importado = await page.evaluate(() => ({
        fases: estatisticasDosObjetivos.colecoes.fases,
        mapas: estatisticasDosObjetivos.colecoes.mapasInfinitos,
        vitorias: estatisticasDosObjetivos.vitoriasPorFase[1],
        salvo: localStorage.getItem(CHAVE_ESTATISTICAS_DOS_OBJETIVOS) !== null
    }));
    expect(importado).toEqual({ fases: [8, 9], mapas: [1], vitorias: 4, salvo: true });

    const atualizado = await page.evaluate(() => {
        registrarElementoUnicoParaMissoes('fases', 10, 'fasesDiferentes');
        jogoIniciado = true;
        modoWavesInfinitas = false;
        mapaPersonalizadoAtivo = null;
        faseSelecionada = 1;
        reiniciarEstatisticasDaPartidaParaMissoes();
        registrarVitoriaDetalhadaParaMissoes();
        return {
            fases: estatisticasDosObjetivos.colecoes.fases,
            fasesLegadas: progressoMissoesPermanentes.colecoes.fases,
            vitorias: estatisticasDosObjetivos.vitoriasPorFase[1],
            vitoriasLegadas: progressoMissoesPermanentes.vitoriasPorFase[1]
        };
    });
    expect(atualizado.fases).toEqual([8, 9, 10, 1]);
    expect(atualizado.fasesLegadas).toEqual(atualizado.fases);
    expect(atualizado.vitorias).toBe(5);
    expect(atualizado.vitoriasLegadas).toBe(5);

    await page.reload();
    expect(await page.evaluate(() => estatisticasDosObjetivos.vitoriasPorFase[1])).toBe(5);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => trocarSalvoAtivo(2))]);
    expect(await page.evaluate(() => estatisticasDosObjetivos.colecoes.fases)).toEqual([]);
    expect(await page.evaluate(() => estatisticasDosObjetivos.vitoriasPorFase[1] || 0)).toBe(0);
});
