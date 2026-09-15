const { test, expect } = require('@playwright/test');

async function abrirCastelo(page) {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => iniciarExploracaoDoCastelo());
    await page.locator('#limbo-continuar').click();
    await page.locator('#limbo-continuar').click();
}
async function interagirEm(page, sala, x, y) {
    await page.evaluate(({ sala, x, y }) => mudarSalaDoCastelo(sala, x, y), { sala, x, y });
    await page.locator('#limbo-interagir').click();
}

test('Castelo: movimento, colisões, guardas, varanda, cama e checkpoints', async ({ page }, testInfo) => {
    const erros = []; page.on('pageerror', erro => erros.push(erro.message));
    await abrirCastelo(page);
    await page.locator('#canvas-exploracao-limbo').focus();
    await page.keyboard.down('ArrowLeft');
    await page.waitForTimeout(250);
    await page.keyboard.up('ArrowLeft');
    expect(await page.evaluate(() => jornadaDoLimbo.x)).toBeLessThan(300);
    expect(await page.evaluate(() => !podeAndarNoCastelo(300, 180) && !podeAndarNoCastelo(560, 190) && !podeAndarNoCastelo(2, 2))).toBe(true);
    await page.locator('#exploracao-limbo').screenshot({ path: testInfo.outputPath('salao.png') });
    await interagirEm(page, 'salao', 510, 194);
    await expect(page.locator('#limbo-fala')).toHaveText('Você não tem permissão para entrar aqui.');
    const posicao = await page.evaluate(() => jornadaDoLimbo.x);
    await page.keyboard.down('ArrowLeft'); await page.waitForTimeout(150); await page.keyboard.up('ArrowLeft');
    expect(await page.evaluate(() => jornadaDoLimbo.x)).toBe(posicao);
    await page.locator('#limbo-continuar').click();
    await interagirEm(page, 'varanda', 320, 255);
    await expect(page.locator('#limbo-fala')).toContainText('Afinal, aqui é o Limbo');
    await page.locator('#limbo-continuar').click();
    await interagirEm(page, 'hospedes', 420, 220);
    await expect(page.locator('#limbo-fala')).toContainText('preciso falar com a entidade');
    await page.locator('#limbo-continuar').click();
    await interagirEm(page, 'andar', 320, 155);
    for (let i = 0; i < 4; i++) await page.locator('#limbo-continuar').click();
    expect(await page.evaluate(() => jornadaDoLimbo.desafio)).toBe(true);
    await interagirEm(page, 'hospedes', 420, 220);
    await page.locator('#limbo-continuar').click();
    await expect(page.locator('#limbo-falante')).toHaveText('NO DIA SEGUINTE');
    await page.locator('#limbo-continuar').click();
    await expect(page.locator('#limbo-fala')).toContainText('Siga-me até a arena');
    await page.locator('#limbo-continuar').click();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('#limbo-interagir')).toBeInViewport();
    const antesDoToque = await page.evaluate(() => jornadaDoLimbo.x);
    const direcional = await page.locator('[data-direcao-castelo="esquerda"]').boundingBox();
    await page.mouse.move(direcional.x + direcional.width / 2, direcional.y + direcional.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(150);
    await page.mouse.up();
    expect(await page.evaluate(() => jornadaDoLimbo.x)).toBeLessThan(antesDoToque);
    await page.locator('#exploracao-limbo').screenshot({ path: testInfo.outputPath('hospedes-celular.png') });
    await page.locator('#limbo-sair').click();
    await page.reload(); await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-retomar-castelo').click();
    expect(await page.evaluate(() => jornadaDoLimbo.fase)).toBe('manha');
    await interagirEm(page, 'salao', 320, 330);
    await page.locator('#limbo-continuar').click(); await page.locator('#limbo-continuar').click();
    await expect(page.locator('#limbo-controles-arena')).toBeVisible();
    expect(erros).toEqual([]);
});

test('Arena: combate real das cinco waves concede promessa somente após diálogo', async ({ page }, testInfo) => {
    const erros = []; page.on('pageerror', erro => erros.push(erro.message));
    await abrirCastelo(page);
    await page.evaluate(() => { jornadaDoLimbo.desafio = true; jornadaDoLimbo.fase = 'manha'; iniciarArenaDoLimbo(); });
    const saldo = await page.evaluate(() => fragmentosPixel);
    await page.evaluate(() => {
        construirNaArena(100, 100); // Caminho: deve recusar.
    });
    expect(await page.evaluate(() => arenaDoLimbo.creditos)).toBe(300);
    await page.locator('[data-defesa-arena="canhao"]').click();
    await page.evaluate(() => { construirNaArena(210, 190); construirNaArena(340, 190); construirNaArena(450, 190); });
    await page.locator('#exploracao-limbo').screenshot({ path: testInfo.outputPath('arena.png') });
    await page.locator('#limbo-wave').click();
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('desafiandoCoroa'))).toBe(true);
    await page.locator('#limbo-pausar').click();
    expect(await page.evaluate(() => { const antes = JSON.stringify(arenaDoLimbo.inimigos); atualizarArenaDoLimbo(1); return JSON.stringify(arenaDoLimbo.inimigos) === antes; })).toBe(true);
    await page.locator('#limbo-pausar').click();
    const batalha = await page.evaluate(() => {
        const relatorio = [];
        for (let etapa = 1; etapa <= 5; etapa++) {
            if (etapa > 1) iniciarWaveDaArena();
            for (let i = 0; i < 15000 && arenaDoLimbo.emWave && !arenaDoLimbo.encerrada; i++) atualizarArenaDoLimbo(.05);
            relatorio.push({ wave: arenaDoLimbo.wave, vida: arenaDoLimbo.vida, emWave: arenaDoLimbo.emWave });
            if (arenaDoLimbo.encerrada) break;
            // Estratégia: melhorar os canhões e adicionar cobertura próxima à base.
            for (let i = 0; i < arenaDoLimbo.torres.length; i++) { arenaDoLimbo.selecionada = i; melhorarTorreDaArena(); }
            arenaDoLimbo.tipo = 'flecha';
            for (const x of [230, 360, 470]) construirNaArena(x, 325);
        }
        return relatorio;
    });
    expect(batalha).toHaveLength(5);
    expect(batalha.at(-1).vida).toBeGreaterThan(0);
    await expect(page.locator('#limbo-fala')).toContainText('Conquistou meu respeito');
    expect(await page.evaluate(() => jornadaDoLimbo.promessaDeAjuda)).toBe(false);
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('respeitoConquistado'))).toBe(true);
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('promessaNoVazio'))).toBe(false);
    await page.locator('#exploracao-limbo').screenshot({ path: testInfo.outputPath('vitoria.png') });
    await page.locator('#limbo-sair').click();
    await page.reload(); await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-retomar-castelo').click();
    await expect(page.locator('#limbo-fala')).toContainText('Conquistou meu respeito');
    for (let i = 0; i < 5; i++) await page.locator('#limbo-continuar').click();
    expect(await page.evaluate(() => jornadaDoLimbo.promessaDeAjuda && capitulo3Desbloqueado)).toBe(true);
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('promessaNoVazio'))).toBe(true);
    expect(await page.evaluate(() => fragmentosPixel)).toBe(saldo);
    await page.reload();
    expect(await page.evaluate(() => jornadaDoLimbo.promessaDeAjuda)).toBe(true);
    expect(await page.evaluate(() => CONFIG.fases.length)).toBe(18);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => trocarSalvoAtivo(2))]);
    expect(await page.evaluate(() => jornadaDoLimbo)).toBe(null);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => trocarSalvoAtivo(1))]);
    expect(await page.evaluate(() => jornadaDoLimbo.promessaDeAjuda)).toBe(true);
    expect(erros).toEqual([]);
});

test('Arena: derrota permite repetir, saída reinicia recursos e save inválido é seguro', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-jornada-limbo-v1', '{invalido'));
    await abrirCastelo(page);
    await page.evaluate(() => { jornadaDoLimbo.desafio = true; jornadaDoLimbo.fase = 'manha'; iniciarArenaDoLimbo(); iniciarWaveDaArena(); });
    await page.evaluate(() => {
        for (let wave = 0; wave < 5 && !arenaDoLimbo.encerrada; wave++) {
            for (let i = 0; i < 15000 && arenaDoLimbo.emWave && !arenaDoLimbo.encerrada; i++) atualizarArenaDoLimbo(.05);
            if (!arenaDoLimbo.encerrada) iniciarWaveDaArena();
        }
    });
    await expect(page.locator('#limbo-repetir')).toBeVisible();
    expect(await page.evaluate(() => jornadaDoLimbo.promessaDeAjuda)).toBe(false);
    await page.locator('#limbo-repetir').click();
    expect(await page.evaluate(() => [arenaDoLimbo.wave, arenaDoLimbo.vida, arenaDoLimbo.creditos])).toEqual([0, 12, 300]);
    await page.locator('#limbo-sair').click();
    await page.locator('#botao-retomar-castelo').click();
    expect(await page.evaluate(() => arenaDoLimbo.wave)).toBe(0);
});

test('Castelo: falas principais acompanham inglês e espanhol', async ({ page }) => {
    await abrirCastelo(page);
    await page.evaluate(() => selecionarIdioma('en'));
    await interagirEm(page, 'andar', 320, 155);
    await expect(page.locator('#limbo-fala')).toContainText('no one enters without my permission');
    for (let i = 0; i < 4; i++) await page.locator('#limbo-continuar').click();
    await page.evaluate(() => selecionarIdioma('es'));
    await interagirEm(page, 'varanda', 320, 255);
    await expect(page.locator('#limbo-fala')).toContainText('esto es el Limbo');
});
