const { test, expect } = require('@playwright/test');

test('Idade da Pedra usa elenco próprio e só permite as três torres simples', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.locator('#botao-eventos').click();
    await expect(page.locator('.cartao-evento[data-evento="idadeDaPedra"]')).toContainText('Besta e Canhão pesado');
    const dados = await page.evaluate(() => {
        const equipeAnterior = [...defesasSelecionadasParaPartida];
        jogarEvento('idadeDaPedra', 'medio');
        selecionarTipoDeTorre('torreBesta');
        const bestaSelecionada = tipoDeTorreParaConstruir === 'torreBesta';
        selecionarTipoDeTorre('torreGlacial');
        const bloqueada = tipoDeTorreParaConstruir === 'torreBesta';
        const tipos = ['padrao', 'torreBesta', 'canhaoPesado', 'torreGlacial', 'obliterador'];
        const permissoes = tipos.map(tipo => [tipo, defesaEstaSelecionadaParaPartida(tipo),
            defesaEstaDisponivelNaPartida(tipo)]);
        const elenco = CONFIG.eventos.elencosNormais.idadeDaPedra;
        const ondas = mapaPersonalizadoAtivo.waves;
        const caminho = obterCaminhosAtuais()[0];
        jogoPausado = true;
        desenharMapa();
        return { equipeAnterior, equipeDurante: [...defesasSelecionadasParaPartida],
            bestaSelecionada, bloqueada, permissoes, elenco, ondas: ondas.length,
            ultimaOnda: ondas.at(-1).grupos.at(-1).tipo, pontos: caminho.length,
            fragmentos: obterFragmentosDaDificuldadeDoEvento('idadeDaPedra', 'medio') };
    });
    expect(dados.equipeDurante).toEqual(dados.equipeAnterior);
    expect(dados.bestaSelecionada).toBe(true);
    expect(dados.bloqueada).toBe(true);
    expect(dados.permissoes).toEqual([
        ['padrao', true, true], ['torreBesta', true, true], ['canhaoPesado', true, true],
        ['torreGlacial', false, false], ['obliterador', false, false]
    ]);
    expect(dados.elenco).toEqual({ comuns: ['cacadorDaTribo', 'mamuteLanoso'], chefe: 'liderDaTribo' });
    expect(dados.ondas).toBe(16);
    expect(dados.ultimaOnda).toBe('liderDaTribo');
    expect(dados.pontos).toBeGreaterThan(2);
    expect(dados.fragmentos).toBe(14);
    await page.locator('#game').screenshot({ path: 'artifacts/idade-da-pedra-arena.png' });
    await expect(page.locator('#botao-torre-glacial')).toBeHidden();
    await expect(page.locator('#botao-torre-besta')).toBeVisible();
    const final = await page.evaluate(() => {
        const tipos = ['cacadorDaTribo', 'mamuteLanoso', 'liderDaTribo'];
        for (const [indice, tipo] of tipos.entries()) {
            criarInimigo(tipo);
            const inimigo = inimigos.at(-1);
            inimigo.x = [220, 490, 760][indice];
            inimigo.y = [350, 350, 350][indice];
        }
        desenharMapa();
        desenharInimigos();
        return tipos.map(tipo => obterIdDoEventoDoInimigo(tipo));
    });
    expect(final).toEqual(['idadeDaPedra', 'idadeDaPedra', 'idadeDaPedra']);
    await page.locator('#game').screenshot({ path: 'artifacts/idade-da-pedra-inimigos.png' });
    const equipeRestaurada = await page.evaluate(() => {
        voltarAoLobby();
        return [...defesasSelecionadasParaPartida];
    });
    expect(equipeRestaurada).toEqual(dados.equipeAnterior);
});
