const { test, expect } = require('@playwright/test');

test('contador importa resgates antigos e soma diárias e semanais uma vez por edição e por slot', async ({ page }, info) => {
    await page.addInitScript(() => {
        if (sessionStorage.getItem('contador-iniciado')) return;
        sessionStorage.setItem('contador-iniciado', '1');
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-missoes-permanentes-v1', JSON.stringify({
            recompensasResgatadas: Array.from({ length: 98 }, (_, indice) => `permanente${indice + 1}`)
        }));
    });
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(98);
    const resultado = await page.evaluate(() => {
        const idDiario = progressoDosDesafiosDiarios.ids[0];
        const diario = CATALOGO_DOS_DESAFIOS_DIARIOS.find(item => item.id === idDiario);
        progressoDosDesafiosDiarios.progresso[idDiario] = diario.objetivo;
        const primeiroDiario = resgatarDesafioDiario(idDiario);
        const repetidoDiario = resgatarDesafioDiario(idDiario);
        const aposDiario = obterTotalDeMissoesResgatadas();
        const semanal = DESAFIOS_SEMANAIS[0];
        progressoDosDesafiosSemanais.progresso[semanal.id] = semanal.objetivo;
        const primeiroSemanal = resgatarDesafioSemanal(semanal.id);
        const repetidoSemanal = resgatarDesafioSemanal(semanal.id);
        return { primeiroDiario, repetidoDiario, aposDiario, primeiroSemanal,
            repetidoSemanal, total: obterTotalDeMissoesResgatadas(),
            conquista: conquistaEstaDesbloqueada('lendaDasCemMissoes') };
    });
    expect(resultado).toEqual({ primeiroDiario:true, repetidoDiario:false, aposDiario:99,
        primeiroSemanal:true, repetidoSemanal:false, total:100, conquista:true });
    await page.evaluate(() => mostrarMissoes());
    await expect(page.locator('#contador-missoes')).toContainText('Missões resgatadas: 100/100');
    await page.locator('#contador-missoes').screenshot({path:info.outputPath('contador-100-missoes.png')});
    await page.setViewportSize({width:390,height:844});
    await page.locator('#contador-missoes').screenshot({path:info.outputPath('contador-100-missoes-celular.png')});
    await page.reload();
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(100);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => trocarSalvoAtivo(2))]);
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(0);
    expect(await page.evaluate(() => conquistaEstaDesbloqueada('lendaDasCemMissoes'))).toBe(false);
    await Promise.all([page.waitForEvent('load'), page.evaluate(() => trocarSalvoAtivo(1))]);
    expect(await page.evaluate(() => obterTotalDeMissoesResgatadas())).toBe(100);
    expect(erros).toEqual([]);
});

test('conquista antiga permanece desbloqueada sem preencher artificialmente o contador', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-recompensas-missoes-v1', JSON.stringify({
            conquistasDesbloqueadas: ['lendaDasCemMissoes']
        }));
    });
    await page.goto('/');
    expect(await page.evaluate(() => ({ total:obterTotalDeMissoesResgatadas(),
        conquista:conquistaEstaDesbloqueada('lendaDasCemMissoes') }))).toEqual({total:0,conquista:true});
});

test('falha ao gravar o contador não concede nem contabiliza resgates', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    const resultado = await page.evaluate(() => {
        const idDiario = progressoDosDesafiosDiarios.ids[0];
        progressoDosDesafiosDiarios.progresso[idDiario] = CATALOGO_DOS_DESAFIOS_DIARIOS.find(item => item.id === idDiario).objetivo;
        const idSemanal = DESAFIOS_SEMANAIS[0].id;
        progressoDosDesafiosSemanais.progresso[idSemanal] = DESAFIOS_SEMANAIS[0].objetivo;
        const antes = {total:obterTotalDeMissoesResgatadas(),fragmentos:fragmentosPixel,xp:progressaoDeNivel.experienciaTotal};
        const gravar = Storage.prototype.setItem;
        const avisar = window.alert;
        Storage.prototype.setItem = function(chave, valor) {
            if (chave === CHAVE_CONTADOR_DE_MISSOES) throw Error('falha simulada');
            return gravar.call(this, chave, valor);
        };
        window.alert = () => {};
        let diario, semanal;
        try {
            diario = resgatarDesafioDiario(idDiario);
            semanal = resgatarDesafioSemanal(idSemanal);
        } finally {
            Storage.prototype.setItem = gravar;
            window.alert = avisar;
        }
        return {diario,semanal,antes,depois:{total:obterTotalDeMissoesResgatadas(),fragmentos:fragmentosPixel,xp:progressaoDeNivel.experienciaTotal},
            diarioResgatado:progressoDosDesafiosDiarios.resgatados.includes(idDiario),
            semanalResgatado:progressoDosDesafiosSemanais.resgatados.includes(idSemanal)};
    });
    expect(resultado.diario).toBe(false);
    expect(resultado.semanal).toBe(false);
    expect(resultado.depois).toEqual(resultado.antes);
    expect(resultado.diarioResgatado).toBe(false);
    expect(resultado.semanalResgatado).toBe(false);
});

test('a mesma missão em outro dia ou semana tem identidade própria no contador', async ({ page }) => {
    await page.goto('/');
    const resultado = await page.evaluate(() => {
        const primeiroDia = adicionarResgateAoContador('diaria', '2026-10-02', 'diaria-exemplo');
        const diaRepetido = adicionarResgateAoContador('diaria', '2026-10-02', 'diaria-exemplo');
        const outroDia = adicionarResgateAoContador('diaria', '2026-10-03', 'diaria-exemplo');
        const primeiraSemana = adicionarResgateAoContador('semanal', '2026-S40', 'semanal-13');
        const semanaRepetida = adicionarResgateAoContador('semanal', '2026-S40', 'semanal-13');
        const outraSemana = adicionarResgateAoContador('semanal', '2026-S41', 'semanal-13');
        return {primeiroDia,diaRepetido,outroDia,primeiraSemana,semanaRepetida,outraSemana,total:obterTotalDeMissoesResgatadas()};
    });
    expect(resultado).toEqual({primeiroDia:true,diaRepetido:false,outroDia:true,
        primeiraSemana:true,semanaRepetida:false,outraSemana:true,total:4});
});
