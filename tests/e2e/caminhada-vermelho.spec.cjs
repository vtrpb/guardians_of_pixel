const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});

test('Vermelho anima braços e pernas em passos mais lentos pelo mapa', async ({ page }) => {
    const primeiroPasso = await page.evaluate(() => {
        jogarEvento('superBossesAcidos');
        criarInimigo('normal');
        const vermelho = inimigos.at(-1);
        vermelho.x = 300;
        vermelho.y = 300;
        vermelho.alvo = 5;
        jogoPausado = true;
        moverInimigos(3);
        desenharMapa();
        desenharInimigos();
        return { distancia: vermelho.distanciaDaPassada,
            quadro: Math.floor(vermelho.distanciaDaPassada / CONFIG.animacaoDoVermelho.distanciaPorQuadro),
            vida: vermelho.vida, velocidade: vermelho.velocidade };
    });
    expect(primeiroPasso.distancia).toBeGreaterThan(0);
    expect(primeiroPasso.distancia).toBeLessThan(8);
    expect(primeiroPasso.quadro).toBe(0);
    expect(primeiroPasso.vida).toBe(100);
    expect(primeiroPasso.velocidade).toBe(1.5);
    await page.locator('#game').screenshot({ path: 'artifacts/caminhada-vermelho-passo-1.png' });

    const segundoPasso = await page.evaluate(() => {
        const vermelho = inimigos.at(-1);
        moverInimigos(3);
        desenharMapa();
        desenharInimigos();
        return vermelho.distanciaDaPassada;
    });
    expect(segundoPasso).toBeGreaterThanOrEqual(8);
    expect(segundoPasso).toBeLessThan(16);
    await page.locator('#game').screenshot({ path: 'artifacts/caminhada-vermelho-passo-2.png' });

    const quadroCongelado = await page.evaluate(() => {
        const vermelho = inimigos.at(-1);
        const distanciaAntes = vermelho.distanciaDaPassada;
        moverInimigos(0);
        return { antes: distanciaAntes, depois: vermelho.distanciaDaPassada,
            cicloCompleto: CONFIG.animacaoDoVermelho.distanciaPorQuadro
                * CONFIG.animacaoDoVermelho.quadrosDaCaminhada };
    });
    expect(quadroCongelado).toEqual({ antes: segundoPasso, depois: segundoPasso, cicloCompleto: 32 });
});

test('configuração alterna as cinco caminhadas e persiste', async ({ page }) => {
    const tipos = ['normal', 'elite', 'rapido', 'sabotador', 'boss'];
    const capturarQuadros = () => page.evaluate(() => {
        const funcoes = ['desenharInimigoVermelho', 'desenharInimigoRoxo',
            'desenharInimigoCianoRapido', 'desenharSabotador', 'desenharBossComum'];
        const vistos = {};
        const originais = {};
        for (const nome of funcoes) {
            originais[nome] = window[nome];
            window[nome] = (...argumentos) => {
                vistos[nome] = argumentos[3];
                originais[nome](...argumentos);
            };
        }
        try {
            desenharMapa();
            desenharInimigos();
        } finally {
            for (const nome of funcoes) window[nome] = originais[nome];
        }
        return vistos;
    });
    await page.evaluate((nomes) => {
        faseSelecionada = 2;
        iniciarPartida(false);
        for (const tipo of nomes) {
            criarInimigo(tipo);
            const inimigo = inimigos.at(-1);
            inimigo.x = 250 + nomes.indexOf(tipo) * 85;
            inimigo.y = 300;
            inimigo.distanciaDaPassada = 17;
        }
        jogoPausado = true;
    }, tipos);
    const ativados = await capturarQuadros();
    expect(Object.values(ativados)).toEqual([2, 2, 2, 2, 2]);
    await page.locator('#game').screenshot({ path: 'artifacts/inimigos-iniciais-animados.png' });

    await page.evaluate(() => abrirConfiguracoes());
    const controle = page.locator('#controle-animacao-vermelho');
    await expect(controle).toBeChecked();
    await page.locator('#painel-configuracoes').screenshot({ path: 'artifacts/configuracao-animacao-inimigos.png' });
    await controle.uncheck();
    await page.evaluate(() => fecharConfiguracoes());
    expect(Object.values(await capturarQuadros())).toEqual([null, null, null, null, null]);
    await page.locator('#game').screenshot({ path: 'artifacts/inimigos-iniciais-parados.png' });

    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => abrirConfiguracoes());
    await expect(controle).not.toBeChecked();
    await controle.check();
    await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => abrirConfiguracoes());
    await expect(controle).toBeChecked();
});
