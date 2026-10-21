const { test, expect } = require('@playwright/test');

test('Todo mapa exclusivo do Clássico tem dois inimigos e um chefe próprios', async ({ page }) => {
    const erros = [];
    page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(() => {
        comprasDaLoja.add('boiaArpoes');
        return CONFIG.classico.mapasExclusivos.map(mapa => {
            prepararPartidaClassica(mapa.numero);
            const tipos = Object.values(mapa.elenco || {});
            inimigos = [];
            tipos.forEach(criarInimigo);
            desenharCenaPausadaDoTutorial();
            desativarMapaPersonalizado();
            return {
                numero: mapa.numero,
                tipos,
                doisInimigos: tipos.filter(tipo => !tipoEhBoss(tipo)).length >= 2,
                temChefe: tipos.some(tipoEhBoss),
                todosConfigurados: tipos.every(tipo => Boolean(CONFIG.inimigo[tipo]))
            };
        });
    });
    expect(resultado).toHaveLength(17);
    expect(resultado.every(item => item.doisInimigos && item.temChefe && item.todosConfigurados)).toBe(true);
    expect(erros).toEqual([]);
});
