const { test, expect } = require('@playwright/test');

test('Castelo decorado: novos cômodos, passagens, retrato e save', async ({ page }, testInfo) => {
    const erros = []; page.on('pageerror', e => erros.push(e.message));
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/'); await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => iniciarExploracaoDoCastelo());
    await page.locator('#limbo-continuar').click(); await page.locator('#limbo-continuar').click();
    for (const sala of ['salao', 'andar', 'real', 'hospedes', 'estar', 'biblioteca', 'galeria', 'varanda']) {
        const verificacao = await page.evaluate(sala => {
            mudarSalaDoCastelo(sala, 320, 320);
            // Procurar caminhos físicos até o alcance de cada interação (sem atravessar móveis).
            const fila = [{ x: 320, y: 320 }], vistos = new Set(['320,320']);
            for (let i = 0; i < fila.length; i++) {
                const p = fila[i];
                for (const [dx, dy] of [[10,0],[-10,0],[0,10],[0,-10]]) {
                    const x = p.x + dx, y = p.y + dy, chave = `${x},${y}`;
                    if (!vistos.has(chave) && podeAndarNoCastelo(x,y)) { vistos.add(chave); fila.push({x,y}); }
                }
            }
            const alcancaveis = obterInteracoesDoCastelo().every(alvo => fila.some(p => Math.hypot(p.x-alvo.x,p.y-alvo.y) <= CONFIG.casteloDoLimbo.alcanceDeInteracao));
            let textos = 0;
            const original = contextoExploracaoLimbo.fillText;
            contextoExploracaoLimbo.fillText = () => textos++;
            desenharExploracaoDoCastelo();
            contextoExploracaoLimbo.fillText = original;
            return { alcancaveis, textos, posicaoLivre: podeAndarNoCastelo(jornadaDoLimbo.x,jornadaDoLimbo.y) };
        }, sala);
        expect(verificacao, sala).toEqual({alcancaveis:true,textos:0,posicaoLivre:true});
        await page.locator('#canvas-exploracao-limbo').screenshot({path:testInfo.outputPath(`${sala}.png`)});
    }
    for (const [sala,x,y,destino] of [['salao',100,178,'estar'],['salao',100,302,'biblioteca'],['andar',155,110,'galeria']]) {
        await page.evaluate(({sala,x,y}) => mudarSalaDoCastelo(sala,x,y), {sala,x,y});
        await page.locator('#limbo-interagir').click();
        expect(await page.evaluate(() => jornadaDoLimbo.sala)).toBe(destino);
        await page.locator('#limbo-interagir').click();
        expect(await page.evaluate(() => jornadaDoLimbo.sala)).toBe(sala);
    }
    await page.evaluate(() => mudarSalaDoCastelo('salao',320,244));
    await page.locator('#limbo-interagir').click();
    await expect(page.locator('#limbo-dialogo')).toBeVisible();
    await expect(page.locator('#limbo-retrato-ampliado')).toBeHidden();
    expect(await page.locator('#limbo-retrato-ampliado').evaluate(el => el.getBoundingClientRect().height)).toBe(0);
    await page.locator('#limbo-continuar').click();
    await page.evaluate(() => mudarSalaDoCastelo('real',447,165));
    await page.locator('#limbo-interagir').click();
    await expect(page.locator('#limbo-fala')).toContainText('Sua esposa?');
    await expect(page.locator('#limbo-retrato-ampliado')).toBeVisible();
    await page.locator('#limbo-dialogo').screenshot({path:testInfo.outputPath('retrato-ampliado.png')});
    await page.locator('#limbo-continuar').click();
    await expect(page.locator('#limbo-retrato-ampliado')).toBeHidden();
    await page.evaluate(() => mudarSalaDoCastelo('varanda',320,230));
    await page.locator('#limbo-interagir').click();
    await expect(page.locator('#limbo-fala')).toContainText('aqui é o Limbo');
    await expect(page.locator('#limbo-dialogo')).toBeVisible();
    await expect(page.locator('#limbo-retrato-ampliado')).toBeHidden();
    expect(await page.locator('#limbo-retrato-ampliado').evaluate(el => el.getBoundingClientRect().height)).toBe(0);
    await page.locator('#limbo-dialogo').screenshot({path:testInfo.outputPath('sacada-sem-retrato.png')});
    await page.locator('#limbo-continuar').click();
    await page.evaluate(() => mudarSalaDoCastelo('biblioteca',320,320));
    await page.locator('#limbo-sair').click(); await page.reload();
    await page.locator('#botao-jogar-menu-inicial').click(); await page.locator('#botao-retomar-castelo').click();
    expect(await page.evaluate(() => jornadaDoLimbo.sala)).toBe('biblioteca');
    await page.evaluate(() => mudarSalaDoCastelo('estar',180,210));
    expect(await page.evaluate(() => podeAndarNoCastelo(jornadaDoLimbo.x,jornadaDoLimbo.y))).toBe(true);
    await page.setViewportSize({width:390,height:844});
    await page.locator('#exploracao-limbo').screenshot({path:testInfo.outputPath('estar-celular.png')});
    expect(erros).toEqual([]);
});

test('Jogador anima apenas com deslocamento e arena não desenha rótulos', async ({page},testInfo) => {
    await page.goto('/'); await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => iniciarExploracaoDoCastelo());
    await page.locator('#limbo-continuar').click(); await page.locator('#limbo-continuar').click();
    const estado = await page.evaluate(() => {
        mudarSalaDoCastelo('andar',320,230); teclasDoCastelo.add('direita');
        atualizarMovimentoDoCastelo(.15); const andando = caminhadaDoJogador.movendo && caminhadaDoJogador.direcao === 'direita';
        teclasDoCastelo.clear(); atualizarMovimentoDoCastelo(.1);
        return {andando,parado:!caminhadaDoJogador.movendo && caminhadaDoJogador.tempo === 0};
    });
    expect(estado).toEqual({andando:true,parado:true});
    expect(await page.evaluate(() => {
        jornadaDoLimbo.desafio=true; jornadaDoLimbo.fase='manha'; iniciarArenaDoLimbo();
        for (const [i,tipo] of ['flecha','canhao','gelo'].entries()) {arenaDoLimbo.tipo=tipo; construirNaArena(200+i*110,190);}
        let textos=0; const original=contextoExploracaoLimbo.fillText;
        contextoExploracaoLimbo.fillText=()=>textos++; desenharArenaDoLimbo(); contextoExploracaoLimbo.fillText=original;
        return textos;
    })).toBe(0);
    await page.locator('#canvas-exploracao-limbo').screenshot({path:testInfo.outputPath('arena-decorada.png')});
});
