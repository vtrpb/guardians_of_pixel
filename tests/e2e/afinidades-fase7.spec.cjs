const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
        localStorage.setItem('tower-defense-2-progresso-fases-v2', '6');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});

test('Fase 7 mostra afinidades antes do deck e aplica o dano durante a partida', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    const escolha = await page.evaluate(() => {
        faseSelecionada = 7;
        abrirSelecaoDeDefesas();
        return { ...obterAfinidadesDasTorres() };
    });
    expect(escolha.bonus).toHaveLength(2);
    expect(escolha.penalidade).toHaveLength(2);
    expect(new Set([...escolha.bonus, ...escolha.penalidade]).size).toBe(4);
    expect([...escolha.bonus, ...escolha.penalidade]).not.toContain('padrao');
    await expect(page.locator('.selecao-defesas-afinidades')).toContainText('Torre padrão não recebe efeitos');
    await expect(page.locator('.selecao-defesas-afinidades span')).toHaveCount(4);
    for (const tipo of escolha.bonus) {
        await expect(page.locator(`[data-tipo-defesa="${tipo}"]`)).toContainText('+10% de dano');
    }
    for (const tipo of escolha.penalidade) {
        await expect(page.locator(`[data-tipo-defesa="${tipo}"]`)).toContainText('−10% de dano');
    }
    await expect(page.locator('[data-tipo-defesa="padrao"]')).not.toContainText('10% de dano');

    const estavel = await page.evaluate(() => {
        alternarDefesaDaSelecao(obterAfinidadesDasTorres().bonus[0]);
        return { ...obterAfinidadesDasTorres() };
    });
    expect(estavel).toEqual(escolha);
    await page.evaluate(() => { selecionarIdioma('en'); mostrarSelecaoDeDefesas(); });
    await expect(page.locator('.selecao-defesas-afinidades')).toContainText('Standard Tower is unaffected');
    await page.evaluate(() => { selecionarIdioma('es'); mostrarSelecaoDeDefesas(); });
    await expect(page.locator('.selecao-defesas-afinidades')).toContainText('Torre estándar no recibe efectos');
    await page.locator('.botao-confirmar-selecao-defesas').click();
    const dano = await page.evaluate(escolhaDaAfinidade => {
        definirJogoPausado(true);
        const valores = {};
        for (const tipo of ['padrao', ...escolhaDaAfinidade.bonus, ...escolhaDaAfinidade.penalidade]) {
            const torre = criarTorreNaPartida(tipo, 200, 200);
            valores[tipo] = {
                dano: torre.dano,
                base: obterConfiguracaoDaTorre(tipo).dano
            };
        }
        const torreComBonus = torres.find(torre => torre.tipo === escolhaDaAfinidade.bonus[0]);
        const original = torreComBonus.dano;
        torreComBonus.nivel = 1;
        atualizarAtributosDaTorreComBonus(torreComBonus);
        valores.melhoria = {
            original,
            dano: torreComBonus.dano,
            base: obterConfiguracaoAtualDaTorre(torreComBonus).dano
        };
        return valores;
    }, escolha);
    expect(dano.padrao.dano).toBe(dano.padrao.base);
    for (const tipo of escolha.bonus) expect(dano[tipo].dano).toBe(Math.round(dano[tipo].base * 1.1));
    for (const tipo of escolha.penalidade) expect(dano[tipo].dano).toBe(Math.round(dano[tipo].base * 0.9));
    expect(dano.melhoria.dano).toBe(Math.round(dano.melhoria.base * 1.1));
    const ciclo = await page.evaluate(() => {
        const antes = { ...obterAfinidadesDasTorres() };
        prepararNovaPartida();
        const reinicio = { ...obterAfinidadesDasTorres() };
        voltarAoLobby();
        return { antes, reinicio, sorteioLimpo: afinidadesDasTorres === null };
    });
    expect(ciclo.antes).toEqual(escolha);
    expect(ciclo.reinicio).toEqual(escolha);
    expect(ciclo.sorteioLimpo).toBe(true);
    expect(erros).toEqual([]);
});

test('sem outra torre desbloqueada, a Torre Padrão não recebe desvantagem', async ({ page }) => {
    const resultado = await page.evaluate(() => {
        faseSelecionada = 7;
        const original = torreEstaDesbloqueada;
        torreEstaDesbloqueada = tipo => tipo === 'padrao';
        try {
            afinidadesDasTorres = null;
            abrirSelecaoDeDefesas();
            return { ...obterAfinidadesDasTorres(), padrao: obterMultiplicadorDeAfinidadeDaTorre('padrao') };
        } finally {
            torreEstaDesbloqueada = original;
        }
    });
    expect(resultado).toEqual({ bonus: [], penalidade: [], padrao: 1 });
    await expect(page.locator('.selecao-defesas-afinidades')).toBeVisible();

    const umaTorreExtra = await page.evaluate(() => {
        const original = torreEstaDesbloqueada;
        torreEstaDesbloqueada = tipo => ['padrao', 'canhaoPesado'].includes(tipo);
        try {
            afinidadesDasTorres = null;
            return { ...obterAfinidadesDasTorres() };
        } finally {
            torreEstaDesbloqueada = original;
        }
    });
    expect(umaTorreExtra).toEqual({ bonus: ['canhaoPesado'], penalidade: [] });

    for (const [tipos, quantidadeDeBonus, quantidadeDePenalidades] of [
        [['padrao', 'canhaoPesado', 'torreGlacial'], 1, 1],
        [['padrao', 'canhaoPesado', 'torreGlacial', 'torreDeRaios'], 2, 1]
    ]) {
        const afinidades = await page.evaluate(tiposDesbloqueados => {
            const original = torreEstaDesbloqueada;
            torreEstaDesbloqueada = tipo => tiposDesbloqueados.includes(tipo);
            try {
                afinidadesDasTorres = null;
                return { ...obterAfinidadesDasTorres() };
            } finally {
                torreEstaDesbloqueada = original;
            }
        }, tipos);
        expect(afinidades.bonus).toHaveLength(quantidadeDeBonus);
        expect(afinidades.penalidade).toHaveLength(quantidadeDePenalidades);
        expect(new Set([...afinidades.bonus, ...afinidades.penalidade]).size).toBe(tipos.length - 1);
    }
});

test('afinidades aparecem em todas as fases da História e sorteiam novamente ao trocar de fase', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const fases = [];
        for (const fase of CONFIG.fases) {
            faseSelecionada = fase.numero;
            afinidadesDasTorres = null;
            const afinidades = obterAfinidadesDasTorres();
            fases.push({ numero: fase.numero, ativo: Boolean(afinidades),
                padrao: obterMultiplicadorDeAfinidadeDaTorre('padrao') });
        }
        selecionarFase(1);
        abrirSelecaoDeDefesas();
        return { fases, aviso: document.querySelector('.selecao-defesas-afinidades')?.textContent || '' };
    });
    expect(dados.fases).toHaveLength(18);
    expect(dados.fases.every(fase => fase.ativo && fase.padrao === 1)).toBe(true);
    expect(dados.aviso).toContain('Efeitos das torres nesta partida.');
});

test('Clássico recebe afinidades; Editor, Eventos e infinito ficam de fora', async ({ page }) => {
    const dados = await page.evaluate(() => {
        prepararPartidaClassica(1);
        const classico = Boolean(obterAfinidadesDasTorres());
        const aviso = document.querySelector('.selecao-defesas-afinidades')?.textContent || '';
        const sorteioClassico = afinidadesDasTorres;
        mapaPersonalizadoAtivo = { nome: 'Editor' };
        const editor = obterAfinidadesDasTorres();
        mapaPersonalizadoAtivo = { evento: 'idadeDaPedra' };
        const evento = obterAfinidadesDasTorres();
        mapaPersonalizadoAtivo = null;
        faseSelecionada = 7;
        modoWavesInfinitas = true;
        const infinito = obterAfinidadesDasTorres();
        return { classico, aviso, sorteioClassico: Boolean(sorteioClassico),
            editor, evento, infinito };
    });
    expect(dados).toMatchObject({ classico: true, sorteioClassico: true,
        editor: null, evento: null, infinito: null });
    expect(dados.aviso).toContain('Efeitos das torres nesta partida.');
});

test('bônus e penalidade alteram o dano real das torres no Clássico', async ({ page }) => {
    await page.evaluate(() => prepararPartidaClassica(1));
    const escolha = await page.evaluate(() => ({ ...obterAfinidadesDasTorres() }));
    expect(escolha.bonus).not.toHaveLength(0);
    expect(escolha.penalidade).not.toHaveLength(0);
    await page.locator('.botao-confirmar-selecao-defesas').click();
    const dano = await page.evaluate(() => {
        definirJogoPausado(true);
        return [obterAfinidadesDasTorres().bonus[0], obterAfinidadesDasTorres().penalidade[0]]
            .map(tipo => {
                const multiplicadorOriginal = obterMultiplicadorDeAfinidadeDaTorre;
                let semAfinidade;
                try {
                    obterMultiplicadorDeAfinidadeDaTorre = () => 1;
                    semAfinidade = criarTorreNaPartida(tipo, 200, 200).dano;
                } finally {
                    obterMultiplicadorDeAfinidadeDaTorre = multiplicadorOriginal;
                }
                const comAfinidade = criarTorreNaPartida(tipo, 200, 200).dano;
                return { tipo, comAfinidade, semAfinidade };
            });
    });
    expect(Math.abs(dano[0].comAfinidade - dano[0].semAfinidade * 1.1)).toBeLessThanOrEqual(1);
    expect(Math.abs(dano[1].comAfinidade - dano[1].semAfinidade * 0.9)).toBeLessThanOrEqual(1);
});
