const { chromium } = require("@playwright/test");

(async () => {
    const navegador = await chromium.launch({ headless: true });
    const pagina = await navegador.newPage({
        viewport: { width: 1440, height: 1000 },
        reducedMotion: "reduce"
    });
    await pagina.addInitScript(() => {
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "8");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-maquina-tempo-v1", "true");
        localStorage.setItem("guardians-of-pixel-epoca-temporal-v1", "futuro");
    });
    await pagina.goto("http://127.0.0.1:4173");
    await pagina.locator('button[onclick="mostrarCapitulos()"]')
        .click();
    await pagina.locator('[data-numero-capitulo="2"] .botao-maquina-tempo-capitulo').click();
    await pagina.locator(".fase-tema-futurista button").click();
    await pagina.locator("#conteudo-menu .botao-fechar").click();
    await pagina.locator(".botao-lobby-jogar").click();
    await pagina.locator(".botao-confirmar-selecao-defesas").click();
    await pagina.evaluate(() => eval(`
        inimigos = [];
        jogoPausado = true;
        wave = 10;
        radioProjetoRelogioDisponivel = false;
        disponibilizarRadioProjetoRelogio();
        desenharMapa();
    `));
    await pagina.screenshot({
        path: "test-results/revisao-radio-mapa.png",
        fullPage: true
    });
    const mapa = await pagina.locator("#game").boundingBox();
    await pagina.mouse.click(
        mapa.x + mapa.width * (700 / 1200),
        mapa.y + mapa.height * (350 / 700)
    );
    await pagina.locator("#camada-cutscene-carta").waitFor({ state: "visible" });
    await pagina.screenshot({
        path: "test-results/revisao-radio-transmissao-desktop.png",
        fullPage: true
    });
    await pagina.setViewportSize({ width: 390, height: 844 });
    const dados = await pagina.evaluate(() => {
        const camada = document.querySelector("#camada-cutscene-carta");
        const radio = document.querySelector(".radio-transmissao").getBoundingClientRect();
        const botao = document.querySelector("#botao-continuar-cutscene-carta").getBoundingClientRect();
        return {
            camada: {
                larguraRolagem: camada.scrollWidth,
                alturaRolagem: camada.scrollHeight,
                larguraVisivel: camada.clientWidth,
                alturaVisivel: camada.clientHeight
            },
            radio: { x: radio.x, y: radio.y, largura: radio.width, altura: radio.height },
            botao: { x: botao.x, y: botao.y, largura: botao.width, altura: botao.height }
        };
    });
    await pagina.screenshot({
        path: "test-results/revisao-radio-transmissao-celular.png",
        fullPage: true
    });
    console.log(JSON.stringify(dados));
    await navegador.close();
})().catch((erro) => {
    console.error(erro);
    process.exit(1);
});
