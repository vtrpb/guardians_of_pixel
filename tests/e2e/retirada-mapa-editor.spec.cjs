const { test, expect } = require("@playwright/test");

async function entrarNoLobby(page) {
    const abertura = page.getByRole("dialog");
    if (await abertura.isVisible()) {
        await abertura.getByRole("button").first().click();
    }
    await expect(page.locator(".botao-lobby-editor")).toBeVisible();
}

test("retira somente o mapa próprio da Comunidade e conserva a retirada após recarregar", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
    });
    await page.goto("/");
    await entrarNoLobby(page);
    await page.evaluate(() => eval("registrarExperiencia(1400)"));
    const salvo = await page.evaluate(() => eval(`(() => {
        const proprio = normalizarMapaDoEditor({
            ...criarMapaPadraoDoEditor(), id: "mapa-proprio", nome: "Mapa próprio",
            criador: "Lequ48", descricao: "Teste de retirada", publicado: true
        });
        const copia = importarMapaPeloCodigo(gerarCodigoDoMapaNoEditor({
            ...proprio, descricao: "Versão anterior do mesmo mapa"
        }));
        const copiaAntiga = normalizarMapaDoEditor({
            ...proprio, id: "comunidade-copia-antiga", descricao: "Código antigo sem vínculo",
            idDoMapaOriginal: undefined
        });
        const outro = normalizarMapaDoEditor({
            ...criarMapaPadraoDoEditor(), id: "comunidade-outro", nome: "Mapa de outro jogador",
            criador: "Outro jogador", descricao: "Deve permanecer", publicado: true
        });
        mapasCriadosNoEditor = [proprio];
        mapasImportadosNoEditor = [copia, copiaAntiga, outro];
        return salvarMapasDoEditor();
    })()`));
    expect(salvo).toBe(true);
    expect(await page.evaluate(() => eval(`(() => {
        const cargaAtual = gerarCodigoDoMapaNoEditor(mapasCriadosNoEditor[0]).split(".")[1];
        const idAtual = "comunidade-" + calcularAssinaturaDoCodigoDoEditor(cargaAtual);
        return mapasImportadosNoEditor.filter(mapa => mapa.id === idAtual).length;
    })()`))).toBe(0);

    await page.locator(".botao-lobby-editor").click();
    const editor = page.locator('#conteudo-menu[data-tela="editor"]');
    await editor.getByRole("button", { name: "Retirar da Comunidade" }).click();
    await editor.getByRole("button", { name: "Comunidade", exact: true }).click();
    await expect(editor.locator(".editor-mapa-cartao")).toHaveCount(1);
    await expect(editor).toContainText("Mapa de outro jogador");
    await expect(editor).not.toContainText("Mapa próprio");

    await page.reload();
    await entrarNoLobby(page);
    await page.locator(".botao-lobby-editor").click();
    await editor.getByRole("button", { name: "Comunidade", exact: true }).click();
    await expect(editor.locator(".editor-mapa-cartao")).toHaveCount(1);
    await expect(editor).toContainText("Mapa de outro jogador");
    await expect(editor).not.toContainText("Mapa próprio");
});
