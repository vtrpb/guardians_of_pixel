const { test, expect } = require("@playwright/test");

async function entrarNoLobby(page) {
    await page.getByRole("dialog").getByRole("button").first().click();
    await expect(page.locator(".botao-lobby-editor")).toBeVisible();
}

test("remove palavras inadequadas e bloqueia Editor e Comunidade por dez minutos", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
    });
    await page.goto("/");
    await entrarNoLobby(page);
    await page.evaluate(() => eval("registrarExperiencia(1400)"));
    await page.locator(".botao-lobby-editor").click();
    await page.getByRole("button", { name: "Criar novo mapa" }).click();

    await expect(page.locator(".editor-aviso-linguagem")).toContainText("Sem ofensas ou palavrões aqui");
    await page.locator('#conteudo-menu[data-tela="editor"]').screenshot({
        path: testInfo.outputPath("aviso-moderacao-editor.png")
    });
    const titulo = page.locator("#nome-mapa-editor");
    const criador = page.locator("#criador-mapa-editor");
    const descricao = page.locator(".editor-formulario textarea").first();

    await titulo.fill("Mapa FILHO DA PUTA novo");
    await expect(titulo).toHaveValue("Mapa novo");
    await criador.fill("Bitch");
    await expect(criador).toBeEmpty();
    await descricao.fill("Uma p.q.p fase");

    const painel = page.locator('#conteudo-menu[data-tela="editor"]');
    await expect(painel).toContainText("Editor e Comunidade bloqueados");
    await painel.screenshot({ path: testInfo.outputPath("bloqueio-editor.png") });
    await expect(painel.getByRole("button", { name: "Comunidade" })).toHaveCount(0);
    const bloqueio = await page.evaluate(() => JSON.parse(
        localStorage.getItem("guardians-of-pixel-editor-moderacao-v1")
    ));
    expect(bloqueio.bloqueadoAte).toBeGreaterThan(Date.now() + 9 * 60 * 1000);

    await page.reload();
    await entrarNoLobby(page);
    await page.locator(".botao-lobby-editor").click();
    await expect(painel).toContainText("Editor e Comunidade bloqueados");

    await page.evaluate(() => {
        const chave = "guardians-of-pixel-editor-moderacao-v1";
        const estado = JSON.parse(localStorage.getItem(chave));
        estado.bloqueadoAte = Date.now() - 1;
        localStorage.setItem(chave, JSON.stringify(estado));
    });
    await page.reload();
    await entrarNoLobby(page);
    await page.locator(".botao-lobby-editor").click();
    await expect(painel.getByRole("button", { name: "Comunidade" })).toBeVisible();
});
