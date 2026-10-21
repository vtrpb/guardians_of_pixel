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

test('perder o fliperama acelera inimigos por 30 segundos, com penalidade leve nas Fases 1 a 3', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const resultados = [];
        for (const fase of [1, 2, 3, 4, 5, 7]) {
            faseSelecionada = fase;
            if (jogoIniciado) prepararNovaPartida(); else iniciarPartida(false);
            criarInimigo('normal');
            const inimigo = inimigos.at(-1);
            const antes = obterVelocidadeAtualDoInimigo(inimigo);
            minigameFliperamaAtivo = true;
            minigameFliperamaEmTreinamento = false;
            tipoMinigameFliperamaAtivo = 'alvo';
            minigameFliperamaComecaEm = Date.now() - 1000;
            finalizarMinigameFliperama(false);
            const agora = Date.now();
            const durante = obterVelocidadeAtualDoInimigo(inimigo, agora);
            const duracao = boostInimigosFliperamaExpiraEm - agora;
            const depois = obterVelocidadeAtualDoInimigo(inimigo,
                boostInimigosFliperamaExpiraEm + 1);
            resultados.push({ fase, multiplicador: +(durante / antes).toFixed(2),
                duracao, voltou: Math.abs(depois - antes) < 0.001 });
        }
        faseSelecionada = 7;
        prepararNovaPartida();
        const primeira = Date.now();
        aplicarBoostInimigoDoFliperama(primeira);
        aplicarBoostInimigoDoFliperama(primeira + 1000);
        const acumulado = boostInimigosFliperamaExpiraEm - primeira;
        definirJogoPausado(true);
        pausaIniciadaEm = Date.now() - 5000;
        const antesDeRetomar = boostInimigosFliperamaExpiraEm;
        definirJogoPausado(false);
        return { resultados, acumulado,
            pausa: boostInimigosFliperamaExpiraEm - antesDeRetomar };
    });
    expect(dados.resultados.map(r => r.multiplicador)).toEqual([1.08, 1.08, 1.08, 1.15, 1.15, 1.15]);
    expect(dados.resultados.every(r => r.duracao > 29000 && r.duracao <= 30000 && r.voltou)).toBe(true);
    expect(dados.acumulado).toBe(60000);
    expect(dados.pausa).toBeGreaterThanOrEqual(4900);
});

test('Super Sabotador entra além dos Sabotadores nas waves 10, 15 e 20 da Fase 7', async ({ page }) => {
    const dados = await page.evaluate(() => {
        faseSelecionada = 7;
        iniciarPartida(false);
        wave = 9;
        iniciarProximaWave();
        const composicaoDaWave10 = { wave, comuns: inimigosSabotadoresParaCriar,
            supers: inimigosSuperSabotadoresParaCriar, total: inimigosParaCriar };
        prepararNovaPartida();
        const tipos = [];
        for (const numero of [9, 10, 11, 15, 20]) {
            wave = numero;
            inimigosSabotadoresParaCriar = 1 + Math.floor(
                (wave - CONFIG.wave.primeiraWaveSabotador) / CONFIG.wave.wavesPorNovoSabotador);
            inimigosSuperSabotadoresParaCriar = deveAdicionarSuperSabotadorNaWave(wave) ? 1 : 0;
            tipos.push([numero, obterProximoTipoDeInimigo()]);
        }
        wave = 10;
        inimigosSabotadoresParaCriar = 1;
        inimigosSuperSabotadoresParaCriar = 1;
        inimigosParaCriar = 2;
        proximoInimigoEm = 0;
        atualizarWaves();
        const novo = inimigos.at(-1);
        const restantesAposSuper = {
            comuns: inimigosSabotadoresParaCriar,
            supers: inimigosSuperSabotadoresParaCriar,
            total: inimigosParaCriar,
            proximo: obterProximoTipoDeInimigo()
        };
        novo.x = 300; novo.y = 300; novo.ultimoTiro = 0;
        torres = [{ tipo: 'padrao', x: 370, y: 300, tirosRecebidos: 0 }];
        atacarTorresComInimigos(Date.now());
        const disparos = tirosDosInimigos.map(tiro => tiro.tipoDoInimigo);
        tirosDosInimigos.forEach(tiro => { tiro.x = tiro.alvo.x; tiro.y = tiro.alvo.y; });
        moverTirosDosInimigos();
        const impactos = torres[0].tirosRecebidos;
        desenharMapa();
        desenharInimigos();
        const alvoDoCanhao = CONFIG.torre.tipos.canhaoBlindado.tiposDeAlvo.includes(novo.tipo);
        const previa = obterPreviaDosInimigos().map(item => item.tipo);
        modoWavesInfinitas = true;
        const previaInfinita = obterPreviaDosInimigos().map(item => item.tipo);
        inimigosSuperSabotadoresParaCriar = 0;
        inimigosSabotadoresParaCriar = 1 + Math.floor(
            (wave - CONFIG.wave.primeiraWaveSabotador) / CONFIG.wave.wavesPorNovoSabotador);
        const tipoInfinito = obterProximoTipoDeInimigo();
        modoWavesInfinitas = false;
        faseSelecionada = 5;
        wave = 10;
        inimigosSabotadoresParaCriar = 1;
        inimigosSuperSabotadoresParaCriar = 0;
        const anterior = obterProximoTipoDeInimigo();
        return { composicaoDaWave10, tipos, criado: novo.tipo, restantesAposSuper,
            vida: novo.vidaMaxima,
            disparos, impactos, alvoDoCanhao,
            naPrevia: previa.includes('superSabotador'), naPreviaInfinita: previaInfinita.includes('superSabotador'),
            tipoInfinito, anterior };
    });
    expect(dados.tipos).toEqual([[9,'sabotador'],[10,'superSabotador'],[11,'sabotador'],
        [15,'superSabotador'],[20,'superSabotador']]);
    expect(dados.composicaoDaWave10).toMatchObject({ wave: 10, comuns: 1, supers: 1 });
    expect(dados.composicaoDaWave10.total).toBeGreaterThanOrEqual(2);
    expect(dados).toMatchObject({ criado:'superSabotador',
        restantesAposSuper: { comuns: 1, supers: 0, total: 1, proximo: 'sabotador' },
        disparos:['superSabotador','superSabotador'], impactos:2, alvoDoCanhao:true,
        naPrevia:true, naPreviaInfinita:false, tipoInfinito:'sabotador', anterior:'sabotador' });
    expect(dados.vida).toBeCloseTo(302.4);
});
