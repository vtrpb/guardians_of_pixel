const { test, expect } = require('@playwright/test');

test('três diárias do catálogo ampliado não repetem objetivos semanais nem exigem fases específicas', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    await page.evaluate(() => mostrarMissoes());
    await expect(page.locator('#desafios-diarios .desafio-diario-cartao')).toHaveCount(3);
    await expect(page.locator('#desafios-semanais')).toBeVisible();
    await page.locator('#desafios-diarios').screenshot({ path: 'artifacts/desafios-diarios-desktop.png' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#desafios-diarios').screenshot({ path: 'artifacts/desafios-diarios-celular.png' });
    const resultado = await page.evaluate(() => {
        const propriedadesSemanais = PROPRIEDADES_DOS_DESAFIOS_ROTATIVOS;
        return {
            catalogo: CATALOGO_DOS_DESAFIOS_DIARIOS.length,
            distintas: new Set(progressoDosDesafiosDiarios.ids).size,
            repetidas: CATALOGO_DOS_DESAFIOS_DIARIOS.filter(missao => propriedadesSemanais.has(missao.propriedadeDoProgresso)).length,
            fases: CATALOGO_DOS_DESAFIOS_DIARIOS.filter(missao => missao.propriedadeDoProgresso.startsWith('fase_')).length,
            camuflados: CATALOGO_DOS_DESAFIOS_DIARIOS.filter(missao =>
                ['revelados', 'camufladosEliminados'].includes(missao.propriedadeDoProgresso)).length,
            antigaPreservada: CATALOGO_DOS_DESAFIOS_DIARIOS.some(missao => missao.id === 'diaria-4-1')
        };
    });
    expect(resultado).toEqual({ catalogo: 26, distintas: 3, repetidas: 0,
        fases: 0, camuflados: 0, antigaPreservada: true });
});

test('diárias contam dano e eliminações por wave, resgatam uma vez e renovam', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        const id = 'diaria-danoTotal-150';
        progressoDosDesafiosDiarios = criarProgressoDiarioVazio();
        progressoDosDesafiosDiarios.ids = [id, 'diaria-eliminacoesNaWave-4', 'diaria-tiposComDanoNaPartida-2'];
        const antes = { fragmentos: fragmentosPixel, xp: progressaoDeNivel.experienciaTotal };
        jogoIniciado = true;
        partidaEncerrada = false;
        modoWavesInfinitas = false;
        mapaPersonalizadoAtivo = null;
        wave = 1;
        reiniciarEstatisticasDaPartidaParaMissoes();
        reiniciarEstatisticasDosDesafiosDiarios();
        iniciarEstatisticasDaBatalha();
        const outroTipo = Object.keys(CONFIG.torre.tipos).find(tipo => tipo !== 'padrao');
        registrarDanoNaBatalha('padrao', 75, false);
        registrarDanoNaBatalha(outroTipo, 75, false);
        for (let i = 0; i < 4; i++) registrarInimigoEliminadoParaMissoes({ tipo: 'normal' });
        const progressoNaWave = progressoDosDesafiosDiarios.progresso['diaria-eliminacoesNaWave-4'];
        wave = 2;
        registrarInimigoEliminadoParaMissoes({ tipo: 'normal' });
        jogoIniciado = false;
        const concluidas = progressoDosDesafiosDiarios.ids.every(chave =>
            desafioDiarioConcluido(CATALOGO_DOS_DESAFIOS_DIARIOS.find(item => item.id === chave)));
        const primeiro = resgatarDesafioDiario(id);
        const segundo = resgatarDesafioDiario(id);
        const premiado = { fragmentos: fragmentosPixel - antes.fragmentos, xp: progressaoDeNivel.experienciaTotal - antes.xp };
        const anteriores = [...progressoDosDesafiosDiarios.ids];
        progressoDosDesafiosDiarios.dia = '2000-01-01';
        atualizarDiaDosDesafiosDiarios();
        return { concluidas, progressoNaWave, primeiro, segundo, premiado,
            repetidas: anteriores.filter(item => progressoDosDesafiosDiarios.ids.includes(item)).length,
            progressoLimpo: Object.keys(progressoDosDesafiosDiarios.progresso).length === 0 };
    });
    expect(resultado).toEqual({ concluidas: true, progressoNaWave: 4, primeiro: true, segundo: false,
        premiado: { fragmentos: 4, xp: 20 }, repetidas: 0, progressoLimpo: true });
});

test('diárias de construção e melhoria só avançam com inimigos no mapa', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        progressoDosDesafiosDiarios = criarProgressoDiarioVazio();
        progressoDosDesafiosDiarios.ids = [
            'diaria-construcoesComInimigos-1', 'diaria-melhoriasComInimigos-1', 'diaria-danoNaWave-250'
        ];
        jogoIniciado = true;
        partidaEncerrada = false;
        modoWavesInfinitas = false;
        mapaPersonalizadoAtivo = null;
        wave = 1;
        reiniciarEstatisticasDaPartidaParaMissoes();
        reiniciarEstatisticasDosDesafiosDiarios();
        iniciarEstatisticasDaBatalha();
        inimigos = [];
        registrarConstrucaoParaMissoes('padrao');
        registrarAcaoDaTorreParaMissoes('melhorias');
        const antes = { ...progressoDosDesafiosDiarios.progresso };
        inimigos = [{ tipo: 'normal', vida: 10 }];
        registrarConstrucaoParaMissoes('padrao');
        registrarAcaoDaTorreParaMissoes('melhorias');
        registrarDanoNaBatalha('padrao', 100, false);
        wave = 2;
        registrarDanoNaBatalha('padrao', 100, false);
        const danoAposNovaWave = progressoDosDesafiosDiarios.progresso['diaria-danoNaWave-250'];
        registrarDanoNaBatalha('padrao', 150, false);
        jogoIniciado = false;
        return { antes, danoAposNovaWave, depois: { ...progressoDosDesafiosDiarios.progresso } };
    });
    expect(resultado.antes['diaria-construcoesComInimigos-1']).toBeUndefined();
    expect(resultado.antes['diaria-melhoriasComInimigos-1']).toBeUndefined();
    expect(resultado.danoAposNovaWave).toBe(100);
    expect(resultado.depois).toMatchObject({
        'diaria-construcoesComInimigos-1': 1,
        'diaria-melhoriasComInimigos-1': 1,
        'diaria-danoNaWave-250': 250
    });
});

test('missões antigas elegíveis continuam no sorteio e progridem separadas das permanentes', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        progressoDosDesafiosDiarios = criarProgressoDiarioVazio();
        progressoDosDesafiosDiarios.ids = ['diaria-4-1', 'diaria-7-2', 'diaria-41-10'];
        jogoIniciado = true;
        partidaEncerrada = false;
        modoWavesInfinitas = false;
        mapaPersonalizadoAtivo = null;
        reiniciarEstatisticasDaPartidaParaMissoes();
        progressoMissoesPermanentes.prioridades = 1;
        registrarProgressoDaMissao('prioridades', 1);
        registrarProgressoDaMissao('tiposNaPartida', 2, true);
        registrarProgressoDaMissao('eliminacoes_padrao', 10);
        jogoIniciado = false;
        return { ...progressoDosDesafiosDiarios.progresso };
    });
    expect(resultado).toMatchObject({
        'diaria-4-1': 1,
        'diaria-7-2': 2,
        'diaria-41-10': 10
    });
});
