const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('sete remakes pixelados preservam estado e renderizam em escalas distintas', async ({ page }, testInfo) => {
    const codigo = fs.readFileSync('game.js', 'utf8');
    const nomes = ['desenharGorilaDaSelva', 'desenharEscorpiao', 'desenharColossoDaSelva',
        'desenharHidraDoPantano', 'desenharTiranoPrimordial', 'desenharExecutorCronal', 'desenharCuradorDoVazio'];
    const extrair = nome => {
        const inicio = codigo.indexOf(`function ${nome}(`);
        return codigo.slice(inicio, codigo.indexOf('\nfunction ', inicio + 1));
    };
    await page.setContent('<canvas width="1120" height="460"></canvas>');
    const resultado = await page.evaluate(({ fonte, nomes }) => {
        const ctx = document.querySelector('canvas').getContext('2d');
        ctx.fillStyle = '#202a33';
        ctx.fillRect(0, 0, 1120, 460);
        let regeneracoes = 0;
        const desenharEfeitoDeRegeneracaoDaHidra = () => { regeneracoes++; };
        const funcoes = eval(fonte + '\n[' + nomes.join(',') + ']');
        const inimigo = { regeneracaoAtiva: true, chamadoPrimordialExpiraEm: Date.now() + 60000,
            ordemCronalExpiraEm: Date.now() + 60000, restauracaoDoVazioExpiraEm: Date.now() + 60000 };
        const antes = JSON.stringify(inimigo);
        funcoes.forEach((desenhar, indice) => {
            [36, 72, 120].forEach((tamanho, linha) => {
                const argumentos = [indice * 160 + 20, linha * 140 + 30, tamanho];
                ctx.fillStyle = '#abcdef';
                if (indice >= 3) desenhar(inimigo, ...argumentos);
                else desenhar(...argumentos);
            });
        });
        return { preservado: antes === JSON.stringify(inimigo), regeneracoes };
    }, { fonte: [extrair('desenharSpriteDoRemake'), ...nomes.map(extrair)].join('\n'), nomes });
    expect(resultado.preservado).toBe(true);
    expect(resultado.regeneracoes).toBe(3);
    await page.locator('canvas').screenshot({ path: testInfo.outputPath('remakes.png') });
});
