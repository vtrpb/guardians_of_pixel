const { test, expect } = require('@playwright/test');

test('portal bloqueado não fecha pelo fundo e libera Escape ao encerrar', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => fecharConteudoMenu());
    await page.locator('#portal-fase-secreta').click({ force: true });
    const conversa = page.locator('#camada-conversa-portal');
    await expect(conversa).toBeVisible();
    await conversa.click({ position: { x: 10, y: 10 } });
    await expect(conversa).toBeVisible();
    await conversa.getByRole('button', { name: 'Quem é você?' }).click();
    await expect(conversa.locator('.conversa-portal-fala')).toContainText('...');
    await conversa.screenshot({ path: testInfo.outputPath('portal-resposta.png') });
    await conversa.getByRole('button', { name: 'Encerrar conversa' }).click();
    expect(await page.evaluate(() => conversaDoPortalSecretoBloqueadoAtiva)).toBe(false);
    await page.evaluate(() => mostrarCapitulos());
    await page.keyboard.press('Escape');
    expect(await page.evaluate(() => telaDoMenuAberta)).toBe(null);
    await page.locator('#portal-fase-secreta').click({ force: true });
    await page.evaluate(() => fecharConteudoMenu());
    expect(await page.evaluate(() => conversaDoPortalSecretoBloqueadoAtiva)).toBe(false);
    await expect(conversa).toBeHidden();
});

test('infinito das fases 14 e 15 mantém Varredura entre as seis defesas', async ({ page }) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    for (const fase of [14, 15]) {
        await page.evaluate(numero => {
            maiorFaseConcluida = 14;
            capitulo3Desbloqueado = true;
            faseSelecionada = numero;
            abrirSelecaoDeDefesas(true);
        }, fase);
        expect(await page.evaluate(() => {
            alternarDefesaDaSelecao('torreDeVarredura');
            return selecaoDeDefesasParaModoInfinito && selecaoDeDefesasEmEdicao.has('torreDeVarredura')
                && selecaoDeDefesasEmEdicao.size <= 6;
        })).toBe(true);
    }
});

test('prévia do editor usa as coordenadas da partida', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(() => criarNovoMapaNoEditor());
    const coordenadas = await page.evaluate(() => {
        const previa = document.getElementById('previa-mapa-editor');
        const contexto = previa.getContext('2d');
        const movimentos = [];
        const original = contexto.moveTo;
        contexto.moveTo = function(x, y) { movimentos.push([x, y]); original.call(this, x, y); };
        try { desenharPreviaDoEditor(); } finally { contexto.moveTo = original; }
        const caminho = CONFIG.editorDeFases.caminhos.find(c => c.id === rascunhoDoMapaNoEditor.idDoCaminho);
        return { real: movimentos[0], esperado: [caminho.pontos[0].x * previa.width / canvas.width,
            caminho.pontos[0].y * previa.height / canvas.height] };
    });
    expect(coordenadas.real).toEqual(coordenadas.esperado);
    await page.locator('#previa-mapa-editor').screenshot({ path: testInfo.outputPath('previa-editor.png') });
});
