const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
});

test('vitória antiga mantém a figurinha mas não revela dificuldade desconhecida', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-eventos-v1',
        JSON.stringify({ superBosses: 1 })));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await page.locator('#aba-album-superBosses').click();
    const figurinha = page.locator('.album-cartao:has([data-tipo-inimigo="soberanoInfernal"])');
    await expect(figurinha).toHaveCount(1);
    await expect(figurinha).not.toContainText('Vida:');
    await figurinha.click();
    await expect(page.locator('.album-dificuldades-superboss button:disabled')).toHaveCount(3);
    await expect(page.locator('.album-detalhes-atributos')).not.toContainText('Vida na wave 20');
    await expect(page.locator('.album-detalhes-atributos')).not.toContainText('Ataque');
    await expect(page.locator('.album-recuperacao-superboss')).toContainText('Vitórias antigas neste evento: 1');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'artifacts/album-superboss-recuperacao-antiga-celular.png' });
});

test('jogador novo não recebe as dificuldades de outro save', async ({ page }) => {
    await page.goto('/');
    const estado = await page.evaluate(() => ({
        vitorias: vitoriasDosEventos.superBosses,
        antigas: obterVitoriasAntigasSemDificuldadeDoSuperBoss('superBosses'),
        concluidas: obterDificuldadesConcluidasDoSuperBoss('superBosses')
    }));
    expect(estado).toEqual({ vitorias: 0, antigas: 0, concluidas: [] });
});

test('recupera dificuldades antigas apenas até o total de vitórias do próprio save', async ({ page }) => {
    await page.addInitScript(() => {
        if (!localStorage.getItem('guardians-of-pixel-eventos-v1')) {
            localStorage.setItem('guardians-of-pixel-eventos-v1', JSON.stringify({ superBosses: 1 }));
        }
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await page.locator('#aba-album-superBosses').click();
    await page.locator('.album-cartao:has([data-tipo-inimigo="soberanoInfernal"])').click();
    await page.locator('.album-recuperacao-superboss input[value="facil"]').check();
    await page.locator('.album-recuperacao-superboss input[value="dificil"]').check();
    await page.locator('.album-recuperacao-superboss button').click();
    await expect(page.locator('.album-dificuldades-superboss button:disabled')).toHaveCount(3);
    await page.locator('.album-recuperacao-superboss input[value="dificil"]').uncheck();
    await page.locator('.album-recuperacao-superboss button').click();
    await expect(page.locator('.album-dificuldades-superboss [data-dificuldade="facil"]')).toBeEnabled();
    await expect(page.locator('.album-dificuldades-superboss [data-dificuldade="dificil"]')).toBeDisabled();
    await expect(page.locator('.album-recuperacao-superboss')).toHaveCount(0);
    await page.reload();
    expect(await page.evaluate(() => obterDificuldadesConcluidasDoSuperBoss('superBosses'))).toEqual(['facil']);
});

test('mostra vida e ataque somente nas dificuldades vencidas', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-eventos-v1',
        JSON.stringify({ superBosses: 2, dificuldadesConcluidas: { superBosses: ['facil', 'medio'] } })));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('button[onclick="mostrarAlbum()"]:visible').click();
    await page.locator('#aba-album-superBosses').click();
    await page.locator('.album-cartao:has([data-tipo-inimigo="soberanoInfernal"])').click();
    const painel = page.locator('.album-detalhes-painel');
    const vidaFacil = await page.evaluate(() => calcularVidaDoBoss(
        CONFIG.eventos.wavesSuperBosses, 'soberanoInfernal') * CONFIG.eventos.multiplicadorVidaSuperBoss);
    await expect(painel).toContainText(vidaFacil.toLocaleString('pt-BR'));
    await expect(painel).toContainText('Sem ataque secundário');
    await expect(painel).toContainText('Suprema Bastião +20%');
    await expect(painel.locator('[data-dificuldade="dificil"]')).toBeDisabled();
    await painel.locator('[data-dificuldade="medio"]').click();
    await expect(painel).toContainText('35.000');
    await expect(painel).toContainText('Fúria das Cinzas');
    await expect(painel).not.toContainText('40.000');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'artifacts/album-superboss-dificuldades-celular.png' });
});

test('vitória nova registra a dificuldade do evento no save', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        jogarEvento('superBossesAcidos', 'dificil');
        const premio = concederPremioDoEvento('superBossesAcidos');
        return { premio: Boolean(premio), dados: JSON.parse(localStorage.getItem(CHAVE_VITORIAS_DOS_EVENTOS)) };
    });
    expect(resultado.premio).toBe(true);
    expect(resultado.dados.superBossesAcidos).toBe(1);
    expect(resultado.dados.dificuldadesConcluidas.superBossesAcidos).toEqual(['dificil']);
});
