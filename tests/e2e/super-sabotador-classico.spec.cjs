const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
});

test('todos os mapas clássicos com Sabotadores recebem um Super nas waves previstas', async ({ page }) => {
    const mapas = await page.evaluate(() => {
        const desbloqueioOriginal = mapaClassicoEstaDesbloqueado;
        const aquaticasOriginais = obterTorresAquaticasDisponiveis;
        mapaClassicoEstaDesbloqueado = () => true;
        obterTorresAquaticasDisponiveis = () => ['boiaArpoes'];
        dificuldadeClassicaSelecionada = 'normal';
        try {
            return obterMapasClassicos().map(mapa => {
                prepararPartidaClassica(mapa.numero);
                const waves = mapaPersonalizadoAtivo.waves;
                const verificar = numero => {
                    const grupos = waves[numero - 1].grupos;
                    return {
                        numero,
                        sabotadores: grupos.find(grupo => grupo.tipo === 'sabotador')?.quantidade || 0,
                        supers: grupos.find(grupo => grupo.tipo === 'superSabotador')?.quantidade || 0
                    };
                };
                return { numero: mapa.numero, ondas: [5, 9, 10, 11, 15, 20, 25, 30].map(verificar),
                    naPrevia: obterPreviaDosInimigos().some(inimigo => inimigo.tipo === 'superSabotador') };
            });
        } finally {
            mapaClassicoEstaDesbloqueado = desbloqueioOriginal;
            obterTorresAquaticasDisponiveis = aquaticasOriginais;
        }
    });
    expect(mapas.length).toBeGreaterThan(20);
    for (const mapa of mapas) {
        const substituido = [8, 10, 103].includes(mapa.numero);
        for (const onda of mapa.ondas) {
            const esperado = !substituido && onda.numero >= 10 && onda.numero % 5 === 0 ? 1 : 0;
            expect(onda.supers, `Mapa ${mapa.numero}, wave ${onda.numero}`).toBe(esperado);
            if (!substituido) {
                expect(onda.sabotadores,
                    `Sabotadores comuns no mapa ${mapa.numero}, wave ${onda.numero}`)
                    .toBe(Math.floor(onda.numero / 5));
            } else {
                expect(onda.sabotadores).toBe(0);
            }
        }
        expect(mapa.naPrevia, `Prévia do mapa ${mapa.numero}`).toBe(!substituido);
    }
});

test('Iron inclui as waves 35 e 40 e Lagoa continua sem Super Sabotador', async ({ page }) => {
    const dados = await page.evaluate(() => {
        const desbloqueioOriginal = mapaClassicoEstaDesbloqueado;
        const aquaticasOriginais = obterTorresAquaticasDisponiveis;
        mapaClassicoEstaDesbloqueado = () => true;
        obterTorresAquaticasDisponiveis = () => ['boiaArpoes'];
        dificuldadeClassicaSelecionada = 'iron';
        try {
            prepararPartidaClassica(1);
            const campo = [35, 40].map(numero => mapaPersonalizadoAtivo.waves[numero - 1].grupos
                .find(grupo => grupo.tipo === 'superSabotador')?.quantidade || 0);
            prepararPartidaClassica(103);
            const lagoa = mapaPersonalizadoAtivo.waves.every(onda =>
                onda.grupos.every(grupo => !['sabotador', 'superSabotador'].includes(grupo.tipo)));
            return { campo, lagoa };
        } finally {
            mapaClassicoEstaDesbloqueado = desbloqueioOriginal;
            obterTorresAquaticasDisponiveis = aquaticasOriginais;
        }
    });
    expect(dados).toEqual({ campo: [1, 1], lagoa: true });
});
