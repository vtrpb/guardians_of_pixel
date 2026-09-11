const { test, expect } = require("@playwright/test");

const CHAVE_TUTORIAL = "guardians-of-pixel-tutorial-concluido-v1";
const CHAVE_FRAGMENTOS = "guardians-of-pixel-fragmentos-v2";
const CHAVE_COMPRAS = "guardians-of-pixel-compras-v2";
const CHAVE_OFERTA_SEMANAL = "guardians-of-pixel-oferta-semanal-v1";
const CHAVE_PREFERENCIAS = "guardians-of-pixel-preferencias-v1";

async function confirmarEquipeAtual(page) {
    await expect(page.locator("#conteudo-menu")).toHaveAttribute(
        "data-tela",
        "selecaoDefesas"
    );
    await page.locator(".botao-confirmar-selecao-defesas").click();
}

test.beforeEach(async ({ page }) => {
    await page.addInitScript((chaveTutorial) => {
        const chaveDaSessaoDeTeste = "guardians-of-pixel-e2e-inicializado";
        if (sessionStorage.getItem(chaveDaSessaoDeTeste) !== "true") {
            localStorage.clear();
            sessionStorage.setItem(chaveDaSessaoDeTeste, "true");
        }
        localStorage.setItem(chaveTutorial, "true");

        window.addEventListener("load", () => {
            const entrarAutomaticamente = () => {
                if (sessionStorage.getItem("guardians-of-pixel-e2e-exibir-abertura") === "true") {
                    return;
                }

                const botaoJogar = document.getElementById("botao-jogar-menu-inicial");
                const carregamento = document.getElementById("tela-carregamento");
                const abertura = document.getElementById("tela-inicial-jogo");
                if (
                    !botaoJogar
                    || botaoJogar.disabled
                    || !carregamento?.hidden
                    || abertura?.hidden
                ) {
                    setTimeout(entrarAutomaticamente, 20);
                    return;
                }
                botaoJogar.click();
            };
            setTimeout(entrarAutomaticamente, 0);
        }, { once: true });
    }, CHAVE_TUTORIAL);
});

test("mostra a produtora, diferencia primeira entrada e abre o lobby", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        Object.defineProperty(navigator, "webdriver", { get: () => false });
        sessionStorage.setItem("guardians-of-pixel-e2e-exibir-abertura", "true");
        const primeiraNavegacao = "guardians-of-pixel-e2e-primeira-abertura";
        if (sessionStorage.getItem(primeiraNavegacao) !== "true") {
            localStorage.removeItem("guardians-of-pixel-entrada-anterior-v1");
            localStorage.removeItem("guardians-of-pixel-tutorial-concluido-v1");
            sessionStorage.setItem(primeiraNavegacao, "true");
        }
    });
    await page.goto("/");

    const carregamento = page.locator("#tela-carregamento");
    const abertura = page.locator("#tela-inicial-jogo");
    await expect(carregamento).toBeVisible();
    expect(await page.locator(".carregamento-logo-moldura img").evaluate(imagem => ({
        completa: imagem.complete,
        largura: imagem.naturalWidth
    }))).toEqual({ completa: true, largura: 660 });
    await carregamento.screenshot({ path: testInfo.outputPath("tela-carregamento.png") });
    await expect(carregamento).toBeHidden({ timeout: 5000 });
    await expect(abertura).toBeVisible();
    await expect(abertura).toHaveCSS("opacity", "1");
    const relogioDeFundo = page.locator(".menu-inicial-relogio-fundo");
    await expect(relogioDeFundo).toBeVisible();
    const visualDoRelogio = await relogioDeFundo.evaluate(elemento => {
        const estilo = getComputedStyle(elemento);
        const caixa = elemento.getBoundingClientRect();
        return {
            desfocado: estilo.filter.includes("blur"),
            opacidade: Number(estilo.opacity),
            largura: Math.round(caixa.width)
        };
    });
    expect(visualDoRelogio.desfocado).toBe(true);
    expect(visualDoRelogio.opacidade).toBe(0.3);
    expect(visualDoRelogio.largura).toBeGreaterThan(400);
    await expect(page.locator("#saudacao-menu-inicial")).toHaveText("Bem-vindo!");
    await expect(page.locator("#botao-jogar-menu-inicial")).toBeFocused();
    await expect(page.locator(".aplicacao-jogo")).toHaveAttribute("inert", "");
    await abertura.screenshot({ path: testInfo.outputPath("menu-inicial-desktop.png") });

    await page.evaluate(() => {
        tutorialConcluido = true;
    });
    await page.locator("#botao-jogar-menu-inicial").click();
    await expect(abertura).toBeHidden();
    await expect(page.locator("#menu-principal")).toBeVisible();
    await expect(page.locator(".aplicacao-jogo")).not.toHaveAttribute("inert", "");
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-entrada-anterior-v1"
    ))).toBe("true");

    await page.reload();
    await expect(carregamento).toBeHidden({ timeout: 5000 });
    await expect(abertura).toBeVisible();
    await expect(abertura).toHaveCSS("opacity", "1");
    await expect(page.locator("#saudacao-menu-inicial")).toHaveText("Bem-vindo de volta!");
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("#botao-jogar-menu-inicial")).toBeInViewport();
    await expect(page.locator("#botao-sair-menu-inicial")).toBeInViewport();
    await abertura.screenshot({ path: testInfo.outputPath("menu-inicial-celular.png") });
});

test("abre as áreas de consulta como páginas inteiras e preserva configurações e portal", async ({ page }) => {
    await page.setViewportSize({ width: 1363, height: 756 });
    await page.goto("/");

    const paginas = [
        { tela: "album", seletor: 'button[onclick="mostrarAlbum()"]' },
        { tela: "capitulos", seletor: 'button[onclick="mostrarCapitulos()"]' },
        { tela: "tutorial", seletor: 'button[onclick="mostrarTutorial()"]' },
        { tela: "loja", seletor: ".botao-lobby-loja" },
        { tela: "pacoteApoiador", seletor: ".botao-lobby-apoiador" },
        { tela: "missoes", seletor: ".botao-lobby-missoes" },
        { tela: "conquistas", seletor: ".botao-lobby-conquistas" },
        { tela: "salvos", seletor: ".botao-lobby-salvos" }
    ];
    const conteudo = page.locator("#conteudo-menu");
    const menu = page.locator("#menu-principal");

    for (const [indice, pagina] of paginas.entries()) {
        const botaoDeOrigem = page.locator(pagina.seletor);
        await botaoDeOrigem.click();
        await expect(conteudo).toHaveClass(/conteudo-menu-tela-cheia/);
        await expect(conteudo).toHaveAttribute("data-tela", pagina.tela);
        await expect(menu).toHaveClass(/pagina-menu-aberta/);
        await expect(conteudo.locator(".botao-fechar")).toBeFocused();

        const caixa = await conteudo.boundingBox();
        expect(caixa).not.toBeNull();
        expect(caixa.x).toBeLessThanOrEqual(0.5);
        expect(caixa.y).toBeLessThanOrEqual(0.5);
        expect(caixa.width).toBeGreaterThanOrEqual(1362);
        expect(caixa.height).toBeGreaterThanOrEqual(755);
        await expect(page.locator(".menu-cartao")).toHaveCSS("overflow", "hidden");

        if (pagina.tela === "album") {
            await page.locator("#aba-album-inimigos").click();
            await expect(page.locator("#aba-album-inimigos")).toHaveAttribute("aria-selected", "true");
            await expect(conteudo).toHaveAttribute("data-tela", "album");
        }

        if (pagina.tela === "capitulos") {
            await expect(conteudo.locator(".capitulo-cartao")).toHaveCount(3);
            await conteudo.locator('[data-numero-capitulo="1"] .botao-capitulo-acao').click();
            await expect(conteudo).toHaveAttribute("data-tela", "fases");
            await expect(conteudo.getByRole("heading", { name: "Capítulo 1 · Fases" })).toBeVisible();
            await conteudo.locator(".botao-voltar-capitulos").click();
            await expect(conteudo).toHaveAttribute("data-tela", "capitulos");
        }

        if (pagina.tela === "loja") {
            const abaDeMinas = page.locator('button[onclick="selecionarCategoriaDaLoja(\'minas\')"]');
            await abaDeMinas.click();
            await expect(abaDeMinas).toHaveAttribute("aria-selected", "true");
            await expect(conteudo).toHaveAttribute("data-tela", "loja");
        }

        if (indice === paginas.length - 1) {
            await page.keyboard.press("Escape");
        } else {
            await conteudo.locator(".botao-fechar").click();
        }

        await expect(conteudo).toBeHidden();
        await expect(menu).not.toHaveClass(/pagina-menu-aberta/);
        await expect(botaoDeOrigem).toBeFocused();
    }

    await page.locator("#botao-configuracoes-lobby").click();
    await expect(page.locator("#camada-configuracoes")).toBeVisible();
    await expect(conteudo).not.toHaveClass(/conteudo-menu-tela-cheia/);
    await page.locator(".botao-fechar-configuracoes").click();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('button[onclick="mostrarAlbum()"]').click();
    const caixaCompacta = await conteudo.boundingBox();
    expect(caixaCompacta).not.toBeNull();
    expect(caixaCompacta.width).toBeGreaterThanOrEqual(389);
    expect(caixaCompacta.height).toBeGreaterThanOrEqual(843);
    await expect(conteudo.locator(".botao-fechar")).toBeVisible();
    await conteudo.locator(".botao-fechar").click();
    await page.setViewportSize({ width: 1363, height: 756 });

    await page.evaluate(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "6");
    });
    await page.reload();

    await page.locator("#portal-fase-secreta").click({ force: true });
    await expect(page.locator("#camada-transicao-glitch")).toBeVisible();
    await expect(page.locator("#camada-conversa-portal")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("#camada-conversa-portal .senhor-tempo-cabeca")).toBeVisible();
    await expect(page.locator("#camada-conversa-portal .senhor-tempo-corpo")).toBeVisible();
    await expect(page.locator("#camada-conversa-portal .senhor-tempo-forma-humana")).toHaveCount(0);
    await expect(page.locator("#camada-conversa-portal .senhor-tempo-braco")).toHaveCount(0);
    await expect(page.locator(".conversa-portal-fala")).toContainText(
        "Era eu quem falava com você através do portal."
    );
    await expect(conteudo).not.toHaveClass(/conteudo-menu-tela-cheia/);
    await expect(menu).not.toHaveClass(/pagina-menu-aberta/);
});

test("escolhe no máximo seis defesas e aplica o novo teto de torres", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "6");
        localStorage.setItem(
            "guardians-of-pixel-compras-v2",
            JSON.stringify([
                "iscaBlindada",
                "amplificadorPixel",
                "torreDeRaios",
                "lancaChamas",
                "minaTerrestre",
                "minaCongelante",
                "bombaPesada"
            ])
        );
    });
    await page.reload();
    await page.locator(".botao-lobby-jogar").click();

    const conteudo = page.locator("#conteudo-menu");
    await expect(conteudo).toHaveAttribute("data-tela", "selecaoDefesas");
    await expect(conteudo.locator(".selecao-defesa-cartao")).toHaveCount(25);
    await expect(conteudo.locator('.selecao-defesa-cartao[aria-pressed="true"]')).toHaveCount(1);

    for (const tipo of [
        "canhaoPesado",
        "torreGlacial",
        "torreBesta",
        "torreEsporos",
        "obliterador"
    ]) {
        await conteudo.locator(`[data-tipo-defesa="${tipo}"]`).click();
    }

    await expect(conteudo.locator('.selecao-defesa-cartao[aria-pressed="true"]')).toHaveCount(6);
    await expect(conteudo).toContainText("6 de 6 escolhidas");
    await conteudo.locator('[data-tipo-defesa="iscaBlindada"]').click();
    await expect(conteudo.locator('[data-tipo-defesa="iscaBlindada"]'))
        .toHaveAttribute("aria-pressed", "false");
    await expect(conteudo.locator(".selecao-defesas-mensagem"))
        .toContainText("Sua equipe já está completa");
    await expect.poll(() => page.evaluate(() => (
        JSON.parse(localStorage.getItem("guardians-of-pixel-selecao-defesas-v1"))
    ))).toEqual(["padrao"]);

    await conteudo.locator('[data-tipo-defesa="canhaoPesado"]').click();
    await conteudo.locator('[data-tipo-defesa="iscaBlindada"]').click();
    await conteudo.locator(".botao-confirmar-selecao-defesas").click();

    await expect(page.locator("#seletor-torres .botao-construcao:visible")).toHaveCount(6);
    await expect(page.locator("#botao-canhao-pesado")).toBeHidden();
    await expect(page.locator("#botao-isca-blindada")).toBeVisible();
    await expect.poll(() => page.evaluate(() => (
        JSON.parse(localStorage.getItem("guardians-of-pixel-selecao-defesas-v1"))
    ))).toEqual([
        "padrao",
        "torreGlacial",
        "torreBesta",
        "torreEsporos",
        "obliterador",
        "iscaBlindada"
    ]);

    expect(await page.evaluate(() => {
        const limitesBase = [1, 2, 3, 4, 5, 6, 7, 99]
            .map(numero => obterLimiteDeTorres(numero));
        comprasDaLoja.add("licencaDeConstrucao");
        const limitesComLicenca = [1, 2, 3, 4, 5, 6, 7, 99]
            .map(numero => obterLimiteDeTorres(numero));
        return { limitesBase, limitesComLicenca };
    })).toEqual({
        limitesBase: [10, 12, 12, 14, 15, 15, 15, 12],
        limitesComLicenca: [11, 13, 13, 15, 16, 16, 16, 13]
    });
});

test("posiciona a Bomba Pesada somente sobre o caminho", async ({ page }) => {
    await page.addInitScript(({ chaveCompras }) => {
        localStorage.setItem(chaveCompras, JSON.stringify(["bombaPesada"]));
        localStorage.setItem(
            "guardians-of-pixel-selecao-defesas-v1",
            JSON.stringify(["padrao", "bombaPesada"])
        );
    }, { chaveCompras: CHAVE_COMPRAS });
    await page.goto("/");
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);
    await page.evaluate(() => eval("dinheiro = 500;"));
    await page.locator("#botao-bomba-pesada").click();

    const mapa = page.locator("#game");
    const caixaDoMapa = await mapa.boundingBox();
    expect(caixaDoMapa).not.toBeNull();
    const clicarNoMapa = async (x, y) => page.mouse.click(
        caixaDoMapa.x + caixaDoMapa.width * (x / 1200),
        caixaDoMapa.y + caixaDoMapa.height * (y / 700)
    );

    await clicarNoMapa(80, 80);
    expect(await page.evaluate(() => eval("bombasPesadas.length"))).toBe(0);
    expect(await page.evaluate(() => eval("dinheiro"))).toBe(500);
    expect(await page.evaluate(() => eval("aviso"))).toContain(
        "Bomba Pesada só pode ser colocada no caminho"
    );

    await clicarNoMapa(80, 540);
    expect(await page.evaluate(() => eval("bombasPesadas.length"))).toBe(1);
    expect(await page.evaluate(() => eval("dinheiro"))).toBe(300);
    const posicaoDaBomba = await page.evaluate(() => eval(`({
        x: bombasPesadas[0].x,
        y: bombasPesadas[0].y
    })`));
    expect(Math.abs(posicaoDaBomba.x - 80)).toBeLessThan(1);
    expect(posicaoDaBomba.y).toBeCloseTo(525, 5);
});

test("compra a Mina de Pulso, empurra inimigos e revalida Mestre do Arsenal", async ({ page }) => {
    await page.addInitScript(({ chaveCompras, chaveFragmentos }) => {
        localStorage.setItem(chaveCompras, JSON.stringify([
            "iscaBlindada", "amplificadorPixel", "geradorDeCreditos",
            "torreDeRaios", "lancaChamas", "torrePerfuradora",
            "torreMarcadora", "torreDrones", "torreCorrentes",
            "torreSucata", "canhaoPrismatico", "minaTerrestre",
            "minaCongelante", "bombaPesada", "reservaDeCreditos",
            "licencaDeConstrucao", "recompensaOtimizada", "minaCorrosiva",
            "bombaDeFragmentacao", "miraCalibrada", "sensoresDeLongoAlcance",
            "contratoDeRecuperacao"
        ]));
        localStorage.setItem(chaveFragmentos, "50");
        localStorage.setItem(
            "guardians-of-pixel-recompensas-missoes-v1",
            JSON.stringify({
                skinsDesbloqueadas: [],
                conquistasDesbloqueadas: ["mestreDoArsenal"],
                skinTorrePadraoEquipada: null
            })
        );
    }, { chaveCompras: CHAVE_COMPRAS, chaveFragmentos: CHAVE_FRAGMENTOS });
    await page.goto("/");

    await page.locator(".botao-lobby-conquistas").click();
    let conquista = page.locator(".conquista-cartao").filter({ hasText: "Mestre do Arsenal" });
    await expect(conquista).toHaveClass(/conquista-bloqueada/);
    await expect(conquista).toContainText("22 / 23");
    await page.locator("#conteudo-menu .botao-fechar").click();

    await page.locator(".botao-lobby-loja").click();
    await page.locator('button[onclick="selecionarCategoriaDaLoja(\'minas\')"]').click();
    const botaoDaMina = page.locator('[data-id-item-loja="minaDePulso"]');
    const cartaoDaMina = botaoDaMina.locator("xpath=ancestor::article");
    await expect(cartaoDaMina).toContainText("empurra inimigos comuns 120 px");
    await botaoDaMina.click();
    await page.locator("#botao-confirmar-compra-loja").click();
    await expect.poll(() => page.evaluate((chave) => (
        JSON.parse(localStorage.getItem(chave)).includes("minaDePulso")
    ), CHAVE_COMPRAS)).toBe(true);
    await page.locator("#conteudo-menu .botao-fechar").click();

    await page.locator(".botao-lobby-conquistas").click();
    conquista = page.locator(".conquista-cartao").filter({ hasText: "Mestre do Arsenal" });
    await expect(conquista).toHaveClass(/conquista-desbloqueada/);
    await expect(conquista).toContainText("23 / 23");
    await page.locator("#conteudo-menu .botao-fechar").click();

    await page.locator(".botao-lobby-jogar").click();
    const cartaoDaMinaNaEquipe = page.locator('[data-tipo-defesa="minaDePulso"]');
    if (await cartaoDaMinaNaEquipe.getAttribute("aria-pressed") !== "true") {
        const iscaSelecionada = page.locator('[data-tipo-defesa="iscaBlindada"]');
        if (await iscaSelecionada.getAttribute("aria-pressed") === "true") {
            await iscaSelecionada.click();
        }
        await cartaoDaMinaNaEquipe.click();
    }
    await expect(cartaoDaMinaNaEquipe).toHaveAttribute("aria-pressed", "true");
    await confirmarEquipeAtual(page);
    await page.evaluate(() => eval("dinheiro = 500"));
    await page.locator("#botao-mina-pulso").click();

    const mapa = page.locator("#game");
    const caixaDoMapa = await mapa.boundingBox();
    expect(caixaDoMapa).not.toBeNull();
    await page.mouse.click(
        caixaDoMapa.x + caixaDoMapa.width * (80 / 1200),
        caixaDoMapa.y + caixaDoMapa.height * (540 / 700)
    );
    expect(await page.evaluate(() => eval("minasTerrestres[0].tipo"))).toBe("minaDePulso");

    const resultadoDoPulso = await page.evaluate(() => eval(`(() => {
        definirJogoPausado(true);
        const posicao = obterPosicaoNoCaminhoPeloProgresso(250, obterCaminhoAtual());
        const inimigo = {
            tipo: "normal", x: posicao.x, y: posicao.y, alvo: posicao.alvo,
            vida: 100, vidaMaxima: 100, tamanho: 12, velocidade: 0
        };
        inimigos = [inimigo];
        minasTerrestres[0].x = posicao.x;
        minasTerrestres[0].y = posicao.y;
        const progressoAntes = calcularProgressoDoInimigo(inimigo);
        atualizarMinasTerrestres();
        return {
            vida: inimigo.vida,
            recuo: progressoAntes - calcularProgressoDoInimigo(inimigo),
            minasRestantes: minasTerrestres.length
        };
    })()`));
    expect(resultadoDoPulso.vida).toBe(65);
    expect(resultadoDoPulso.recuo).toBeCloseTo(120, 5);
    expect(resultadoDoPulso.minasRestantes).toBe(0);
});

test("mantém a Torre padrão na equipe da primeira partida guiada", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
        localStorage.removeItem("guardians-of-pixel-tutorial-concluido-v1");
        localStorage.removeItem("guardians-of-pixel-selecao-defesas-v1");
        eval(`
            tutorialConcluido = false;
            defesasSelecionadasParaPartida = new Set(["padrao"]);
        `);
        mostrarTutorial();
    });

    await expect(page.locator("#conteudo-menu")).toHaveAttribute("data-tela", "tutorial");
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();

    const torrePadrao = page.locator('[data-tipo-defesa="padrao"]');
    await expect(torrePadrao).toHaveAttribute("aria-pressed", "true");
    await torrePadrao.click();
    await expect(torrePadrao).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".selecao-defesas-mensagem"))
        .toContainText("A Torre padrão precisa ficar na equipe");
    await page.locator(".botao-confirmar-selecao-defesas").click();

    await expect(page.locator("#camada-tutorial-partida")).toBeVisible();
    await expect(page.locator("#botao-torre-padrao")).toBeVisible();
    await expect(page.locator("#botao-torre-padrao")).toBeEnabled();
});

test("revela o Senhor do Tempo e prende o jogador até vencer a Dimensão Glitch", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "6");
        Math.random = () => 0.5;
    });
    await page.goto("/");
    await page.locator("#portal-fase-secreta").click({ force: true });
    const conversa = page.locator("#camada-conversa-portal");
    const fala = conversa.locator(".conversa-portal-fala");
    const avancar = conversa.locator(".botao-avancar-senhor-tempo");

    await expect(conversa).toBeVisible({ timeout: 5000 });
    await expect(fala).toContainText("Era eu quem falava com você através do portal.");
    expect(await page.evaluate(() => eval("({ faseSelecionada, jogoPausado, wave, dinheiro })"))).toEqual({
        faseSelecionada: 99,
        jogoPausado: true,
        wave: 1,
        dinheiro: 450
    });

    const falasSeguintes = [
        "Meu nome é Senhor do Tempo.",
        "Você não tem escolha.",
        "Se quiser sair, vai ter que sair vitorioso daqui.",
        "Supere as 20 waves e eu abrirei o caminho de volta.",
        "Serei generoso com você. Afinal, poucas pessoas chegam até aqui. Darei 300 créditos a mais para você começar. Mas depois disso você pensa que acabou? Ainda não.",
        "Agora lute. O tempo já começou a correr."
    ];

    for (const falaEsperada of falasSeguintes) {
        await avancar.click();
        await expect(fala).toContainText(falaEsperada);

        if (falaEsperada.startsWith("Serei generoso")) {
            await page.setViewportSize({ width: 390, height: 844 });
            const caixaDoBalao = await conversa.locator(".balao-senhor-do-tempo").boundingBox();
            expect(caixaDoBalao).not.toBeNull();
            expect(caixaDoBalao.x).toBeGreaterThanOrEqual(0);
            expect(caixaDoBalao.y).toBeGreaterThanOrEqual(0);
            expect(caixaDoBalao.x + caixaDoBalao.width).toBeLessThanOrEqual(390);
            expect(caixaDoBalao.y + caixaDoBalao.height).toBeLessThanOrEqual(844);
            await expect(avancar).toBeVisible();
            await page.setViewportSize({ width: 1440, height: 1000 });
        }
    }

    await expect(conversa.getByRole("heading", { name: "Senhor do Tempo" })).toBeVisible();
    await expect(avancar).toHaveText("Enfrentar a Dimensão");
    await avancar.click();
    await expect(conversa).toBeHidden();
    await expect.poll(() => page.evaluate(() => eval("jogoPausado"))).toBe(false);

    await page.locator("#botao-menu-partida").click();
    await expect(page.locator("#botao-desistir-menu")).toBeDisabled();
    await expect(page.locator("#botao-desistir-menu")).toContainText("Saída bloqueada");
    await page.locator("#botao-menu-partida").click();

    await page.evaluate(() => finalizarPartida());
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#descricao-resultado")).toContainText(
        "A derrota não abriu a saída. O Senhor do Tempo exige uma vitória."
    );
    await expect(page.locator("#botao-voltar-lobby-resultado")).toBeHidden();
    await expect(page.locator("#botao-repetir-resultado")).toBeVisible();

    await page.locator("#botao-repetir-resultado").click();
    await expect(page.locator("#camada-resultado")).toBeHidden();
    await page.evaluate(() => finalizarPartidaComVitoria());

    const falasDaVitoria = [
        "Parabéns. Você conseguiu.",
        "Poucas pessoas passam por este desafio.",
        "Então eu estou livre?",
        "Livre para continuar. Mas sua jornada está longe de terminar.",
        "O que você quer dizer?",
        "Eu abri um novo caminho. O Capítulo 2 espera por você.",
        "Considere isso uma recompensa... e um aviso. Ainda não acabou."
    ];

    for (const [indice, falaEsperada] of falasDaVitoria.entries()) {
        await expect(fala).toContainText(falaEsperada);
        if (indice < falasDaVitoria.length - 1) {
            await avancar.click();
        }
    }

    await expect(avancar).toHaveText("Revelar Capítulo 2");
    await avancar.click();

    const cutscene = page.locator("#camada-cutscene-capitulo-2");
    await expect(cutscene).toBeVisible();
    await expect(cutscene.getByRole("heading", { name: "CAPÍTULO 2" })).toBeVisible();
    await expect(cutscene).toContainText("NOVO CAPÍTULO DESBLOQUEADO");
    await page.keyboard.press("Escape");
    await expect(cutscene).toBeVisible();
    await expect.poll(() => page.evaluate(() => ({
        salvo: localStorage.getItem("guardians-of-pixel-capitulo-2-desbloqueado-v1"),
        liberado: capituloEstaDesbloqueado(2)
    }))).toEqual({ salvo: "true", liberado: true });

    await page.setViewportSize({ width: 390, height: 844 });
    const caixaDaCutscene = await cutscene.locator(".cutscene-capitulo-painel").boundingBox();
    expect(caixaDaCutscene).not.toBeNull();
    expect(caixaDaCutscene.x).toBeGreaterThanOrEqual(0);
    expect(caixaDaCutscene.y).toBeGreaterThanOrEqual(0);
    expect(caixaDaCutscene.x + caixaDaCutscene.width).toBeLessThanOrEqual(390);
    expect(caixaDaCutscene.y + caixaDaCutscene.height).toBeLessThanOrEqual(844);
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.locator("#botao-continuar-cutscene-capitulo-2").click();
    await expect(cutscene).toBeHidden();
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#descricao-resultado")).toContainText(
        "o caminho para o Capítulo 2 está aberto"
    );
    await page.locator("#botao-voltar-lobby-resultado").click();
    await page.locator('button[onclick="mostrarCapitulos()"]')
        .click();
    await expect(page.locator('[data-numero-capitulo="2"] .botao-capitulo-acao')).toBeEnabled();
});

test("desvia 10% das entradas do portal para os Corredores Amarelos e retorna à fase secreta", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "6");
        Math.random = () => 0.05;
    });
    await page.goto("/");
    await page.locator("#portal-fase-secreta").click({ force: true });

    const corredores = page.locator("#camada-corredores-amarelos");
    const labirinto = page.locator("#labirinto-amarelo");
    await expect(corredores).toBeVisible({ timeout: 5000 });
    await expect(corredores.getByRole("heading", { name: "Corredores Amarelos" })).toBeVisible();
    await expect(page.locator("#camada-conversa-portal")).toBeHidden();
    expect(await page.evaluate(() => eval("({ labirintoAmareloAtivo, jogoIniciado })"))).toEqual({
        labirintoAmareloAtivo: true,
        jogoIniciado: false
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("#controles-toque-corredores")).toBeVisible();
    const caixaDoLabirinto = await labirinto.boundingBox();
    expect(caixaDoLabirinto).not.toBeNull();
    expect(caixaDoLabirinto.x).toBeGreaterThanOrEqual(0);
    expect(caixaDoLabirinto.x + caixaDoLabirinto.width).toBeLessThanOrEqual(390);

    await page.evaluate(() => {
        jogadorDosCorredoresAmarelos.x = 865;
        jogadorDosCorredoresAmarelos.y = 90;
        jogadorDosCorredoresAmarelos.atualizadoEm = Date.now();
    });
    await page.keyboard.down("ArrowUp");
    await page.waitForTimeout(250);
    await page.keyboard.up("ArrowUp");

    await expect(corredores).toBeHidden();
    await expect(page.locator("#camada-conversa-portal")).toBeVisible();
    expect(await page.evaluate(() => eval("({ faseSelecionada, jogoPausado, wave, dinheiro })"))).toEqual({
        faseSelecionada: 99,
        jogoPausado: true,
        wave: 1,
        dinheiro: 450
    });
});

test("encontra a carta misteriosa ao concluir a Fase 6 sem descobrir o portal", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
        maiorFaseConcluida = 5;
        faseSelecionada = 6;
        atualizarIndicadorFaseSelecionada();
        atualizarTemaDoLobby();
        iniciarPartida(false);
        finalizarPartidaComVitoria();
    });

    const cutscene = page.locator("#camada-cutscene-carta");
    await expect(cutscene).toBeVisible();
    await expect(cutscene).toContainText("VOCÊ ENCONTROU UMA CARTA");
    await expect(page.locator("#texto-cutscene-carta")).toHaveText(
        "Você está pronto. Algo estará lhe esperando no lobby da Fase 1, entre as árvores. Venha ver meu desafio."
    );
    await expect(page.locator("#assinatura-cutscene-carta")).toHaveText("???");
    await expect(page.locator("#camada-resultado")).toBeHidden();
    await page.keyboard.press("Escape");
    await expect(cutscene).toBeVisible();

    await expect.poll(() => page.evaluate(() => ({
        cartaVista: localStorage.getItem("guardians-of-pixel-carta-misteriosa-v1"),
        maiorFaseConcluida,
        portalLiberado: podeEntrarNaFaseSecreta(),
        portalDescoberto: faseSecretaDescoberta,
        capitulo2Liberado: capituloEstaDesbloqueado(2),
        fase7Liberada: faseEstaDesbloqueada(7)
    }))).toEqual({
        cartaVista: "true",
        maiorFaseConcluida: 6,
        portalLiberado: true,
        portalDescoberto: false,
        capitulo2Liberado: false,
        fase7Liberada: false
    });

    await page.setViewportSize({ width: 390, height: 844 });
    const caixaDaCarta = await cutscene.locator(".cutscene-carta-painel").boundingBox();
    expect(caixaDaCarta).not.toBeNull();
    expect(caixaDaCarta.x).toBeGreaterThanOrEqual(0);
    expect(caixaDaCarta.y).toBeGreaterThanOrEqual(0);
    expect(caixaDaCarta.x + caixaDaCarta.width).toBeLessThanOrEqual(390);
    expect(caixaDaCarta.y + caixaDaCarta.height).toBeLessThanOrEqual(844);
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cutscene).toBeHidden();
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#descricao-resultado")).toContainText("Fase concluída.");
    await expect(page.locator("#descricao-resultado")).not.toContainText("A Fase 7 foi desbloqueada");
    await expect(page.locator("#botao-proxima-fase-resultado")).toBeDisabled();

    await page.locator("#botao-repetir-resultado").click();
    await page.evaluate(() => finalizarPartidaComVitoria());
    await expect(cutscene).toBeHidden();
    await expect(page.locator("#camada-resultado")).toBeVisible();
});

test("inicia o Álbum sem inimigos e revela somente figurinhas conquistadas", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "3");
        localStorage.setItem("guardians-of-pixel-fragmentos-v2", "77");
        localStorage.setItem(
            "guardians-of-pixel-compras-v2",
            JSON.stringify(["minaTerrestre"])
        );
    });
    await page.goto("/");
    await page.locator('button[onclick="mostrarAlbum()"]').click();

    const conteudo = page.locator("#conteudo-menu");
    await expect(conteudo.getByRole("heading", { name: "Álbum de Figurinhas" })).toBeVisible();
    await expect(conteudo.locator('[data-tipo-torre="padrao"]')).toHaveCount(4);
    await expect(conteudo.locator('[data-tipo-torre="torreBesta"]')).toHaveCount(4);
    await expect(conteudo.locator('[data-tipo-torre="torreEsporos"]')).toHaveCount(0);

    await conteudo.locator("#aba-album-inimigos").click();
    await expect(conteudo.locator(".album-vazio")).toBeVisible();
    await expect(conteudo.locator(".album-cartao-inimigo")).toHaveCount(0);
    await expect(conteudo.getByText("0 de 43 figurinhas coladas")).toBeVisible();

    const contaPreservada = await page.evaluate(() => ({
        progresso: localStorage.getItem("tower-defense-2-progresso-fases-v2"),
        fragmentos: localStorage.getItem("guardians-of-pixel-fragmentos-v2"),
        compras: localStorage.getItem("guardians-of-pixel-compras-v2"),
        figurinhas: localStorage.getItem("guardians-of-pixel-album-figurinhas-v1")
    }));
    expect(contaPreservada).toEqual({
        progresso: "3",
        fragmentos: "77",
        compras: JSON.stringify(["minaTerrestre"]),
        figurinhas: null
    });

    const primeiraDescoberta = await page.evaluate(() =>
        window.registrarInimigoDerrotadoNoAlbum("normal")
    );
    expect(primeiraDescoberta).toBe(true);
    await conteudo.locator("#aba-album-inimigos").click();
    await expect(conteudo.locator('[data-tipo-inimigo="normal"]')).toHaveCount(1);
    await expect(conteudo.locator('[data-tipo-inimigo="elite"]')).toHaveCount(0);
    await expect(conteudo.locator(".album-vazio")).toHaveCount(0);

    const descobertaRepetida = await page.evaluate(() =>
        window.registrarInimigoDerrotadoNoAlbum("normal")
    );
    expect(descobertaRepetida).toBe(false);
    await expect.poll(() => page.evaluate(() =>
        localStorage.getItem("guardians-of-pixel-album-figurinhas-v1")
    )).toBe(JSON.stringify(["normal"]));

    await conteudo.locator("#aba-album-bosses").click();
    await expect(conteudo.locator(".album-vazio")).toBeVisible();
    await conteudo.locator("#aba-album-minas").click();
    await expect(conteudo.locator('[data-tipo-torre="minaTerrestre"]')).toHaveCount(1);
    await expect(conteudo.locator('[data-tipo-torre="bombaPesada"]')).toHaveCount(0);
    await conteudo.locator("#aba-album-skins").click();
    await expect(conteudo.locator('[data-id-skin="original"]')).toHaveCount(1);
    await expect(conteudo.locator('[data-id-skin="sentinelaDourada"]')).toHaveCount(0);
    await expect(conteudo.locator('[data-id-skin="auroraPixel"]')).toHaveCount(0);
});

test("mantém a forma humana futura guardada e fora do Álbum", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("guardians-of-pixel-fase-secreta-v1", "true");
    });
    await page.goto("/");
    await page.locator('button[onclick="mostrarAlbum()"]')
        .click();
    await page.locator("#aba-album-inimigos").click();

    await expect(page.locator(".album-cartao-conceito")).toHaveCount(0);
    await expect(page.locator('[data-tipo-inimigo="senhorDoTempoHumano"]')).toHaveCount(0);
    await expect(page.locator(".album-cartao-inimigo")).toHaveCount(0);
    await expect(page.locator(".album-vazio")).toBeVisible();
    await expect(page.getByText("0 de 46 figurinhas coladas")).toBeVisible();
});

test("desbloqueia, seleciona e inicia a Fase 7 no Pântano Tóxico", async ({ page }) => {
    await page.goto("/");
    await page.locator('button[onclick="mostrarCapitulos()"]')
        .click();
    await expect(page.locator('[data-numero-capitulo="2"] .botao-capitulo-acao')).toBeDisabled();
    await page.locator("#conteudo-menu .botao-fechar").click();

    await page.evaluate(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "6");
    });
    await page.reload();
    await page.locator('button[onclick="mostrarCapitulos()"]')
        .click();

    const capitulo1 = page.locator('[data-numero-capitulo="1"]');
    const capitulo2 = page.locator('[data-numero-capitulo="2"]');
    const capitulo3 = page.locator('[data-numero-capitulo="3"]');
    await expect(capitulo1).toContainText("6 de 6 fases concluídas");
    await expect(capitulo2).toContainText("Vença a Dimensão Glitch para desbloquear");
    await expect(capitulo2.locator(".botao-capitulo-acao")).toBeDisabled();
    await expect(capitulo3.locator(".botao-capitulo-acao")).toBeDisabled();

    await page.evaluate(() => {
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
    });
    await page.reload();
    await page.locator('button[onclick="mostrarCapitulos()"]')
        .click();
    await expect(capitulo2).toContainText("0 de 6 fases concluídas");
    await expect(capitulo2.locator(".botao-capitulo-acao")).toBeEnabled();
    await expect(capitulo3.locator(".botao-capitulo-acao")).toBeDisabled();
    await capitulo2.locator(".botao-capitulo-acao").click();
    await expect(page.locator("#conteudo-menu")).toHaveAttribute("data-tela", "fases");

    const cartaoDoPantano = page.locator(".fase-tema-pantano");
    await expect(cartaoDoPantano).toBeVisible();
    await expect(cartaoDoPantano).toContainText("07");
    await expect(cartaoDoPantano).toContainText("Pântano Tóxico");
    await expect(cartaoDoPantano).toContainText("Disponível");
    await expect(cartaoDoPantano).toContainText("20 waves");
    await expect(page.locator(".fases-em-desenvolvimento")).toHaveCount(0);

    const botaoSelecionar = cartaoDoPantano.locator(".botao-fase-acao");
    await expect(botaoSelecionar).toBeEnabled();
    await botaoSelecionar.click();
    await expect(cartaoDoPantano).toHaveClass(/fase-cartao-selecionado/);
    await expect(page.locator("#menu-principal")).toHaveClass(/tema-pantano/);

    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);
    await expect(page.locator("#game")).toBeVisible();
    expect(await page.evaluate(() => eval(`({
        faseSelecionada,
        tema: obterFaseAtual().tema,
        limite: obterLimiteDeTorres(),
        wave,
        musicaDoPantano: trilhaDoPantanoAtiva,
        ganhoDaMusicaDoPantano: CONFIG.audio.musicaDoPantano.volumeRelativo
    })`))).toEqual({
        faseSelecionada: 7,
        tema: "pantano",
        limite: 15,
        wave: 1,
        musicaDoPantano: true,
        ganhoDaMusicaDoPantano: 3.2
    });
});

test("recebe a Máquina do Tempo e encontra a Fase 8 jogável no Passado", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "6");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
    });
    await page.goto("/");

    await page.evaluate(() => {
        eval(`
            maiorFaseConcluida = 6;
            capitulo2Desbloqueado = true;
            faseSelecionada = 7;
            jogoIniciado = true;
            partidaEncerrada = false;
            partidaVencida = false;
            menuPrincipal.classList.add("oculto");
        `);
        finalizarPartidaComVitoria();
    });

    const carta = page.locator("#camada-cutscene-carta");
    await expect(carta).toBeVisible();
    await expect(page.locator("#texto-cutscene-carta")).toHaveText(
        "Você venceu o desafio. Como recompensa, deixei uma Máquina do Tempo para você no Capítulo 2. Sua próxima passagem está em uma época anterior ao pântano."
    );
    await expect(page.locator("#assinatura-cutscene-carta")).toHaveText("Senhor do Tempo");
    await expect(page.locator("#botao-continuar-cutscene-carta"))
        .toHaveText("Receber Máquina do Tempo");
    await page.keyboard.press("Escape");
    await expect(carta).toBeVisible();
    await expect.poll(() => page.evaluate(() => ({
        carta: localStorage.getItem("guardians-of-pixel-carta-maquina-tempo-v1"),
        maquina: localStorage.getItem("guardians-of-pixel-maquina-tempo-v1"),
        progresso: localStorage.getItem("tower-defense-2-progresso-fases-v2")
    }))).toEqual({ carta: "true", maquina: "true", progresso: "7" });

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await page.locator("#botao-voltar-lobby-resultado").click();
    await expect(page.locator("#conteudo-menu")).toHaveAttribute("data-tela", "capitulos");

    const capitulo2 = page.locator('[data-numero-capitulo="2"]');
    const botaoDaMaquina = capitulo2.locator(".botao-maquina-tempo-capitulo");
    await expect(botaoDaMaquina).toBeVisible();
    await expect(botaoDaMaquina).toContainText("Máquina do Tempo");
    await expect(botaoDaMaquina).toContainText("NOVO");
    await botaoDaMaquina.click();

    await expect(page.locator(".painel-maquina-tempo")).toBeVisible();
    await expect(page.locator(".botao-epoca-temporal")).toHaveCount(3);
    await expect(page.locator('[data-epoca-temporal="presente"]'))
        .toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".conteudo-cabecalho h2")).toContainText("Capítulo 2 · Presente");
    await expect(page.locator(".fase-tema-pantano")).toBeVisible();
    await expect(page.locator(".fase-cartao-planejada")).toHaveCount(0);

    await page.locator('[data-epoca-temporal="futuro"]').click();
    await expect(page.locator(".conteudo-cabecalho h2")).toContainText("Capítulo 2 · Futuro");
    const passagemDaFase9Bloqueada = page.locator(".fase-tema-futurista");
    await expect(passagemDaFase9Bloqueada).toBeVisible();
    await expect(passagemDaFase9Bloqueada).toContainText("Metrópole Neon");
    await expect(passagemDaFase9Bloqueada.locator("button")).toBeDisabled();

    await page.locator('[data-epoca-temporal="passado"]').click();
    const passagemDaFase8 = page.locator(".fase-tema-primordial");
    await expect(page.locator(".conteudo-cabecalho h2")).toContainText("Capítulo 2 · Passado");
    await expect(passagemDaFase8).toBeVisible();
    await expect(passagemDaFase8).toContainText("08");
    await expect(passagemDaFase8).toContainText("Selva Primordial");
    await expect(passagemDaFase8.locator("button")).toBeEnabled();
    await passagemDaFase8.locator("button").click();
    await expect(passagemDaFase8).toHaveClass(/fase-cartao-selecionado/);
    await expect(page.locator("#menu-principal")).toHaveClass(/tema-primordial/);
    await expect.poll(() => page.evaluate(() => (
        localStorage.getItem("guardians-of-pixel-epoca-temporal-v1")
    ))).toBe("passado");

    await page.setViewportSize({ width: 390, height: 844 });
    const caixaDoPainel = await page.locator(".painel-maquina-tempo").boundingBox();
    expect(caixaDoPainel).not.toBeNull();
    expect(caixaDoPainel.x).toBeGreaterThanOrEqual(0);
    expect(caixaDoPainel.x + caixaDoPainel.width).toBeLessThanOrEqual(390);
    await expect(page.locator(".botao-epoca-temporal")).toHaveCount(3);

    await page.reload();
    await page.locator('button[onclick="mostrarCapitulos()"]')
        .click();
    await page.locator('[data-numero-capitulo="2"] .botao-maquina-tempo-capitulo').click();
    await expect(page.locator('[data-epoca-temporal="passado"]'))
        .toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".fase-tema-primordial")).toBeVisible();
    await expect(page.locator(".fase-cartao-planejada")).toHaveCount(0);
});

test("inicia a Selva Primordial e o Tirano chama sua matilha", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "7");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-maquina-tempo-v1", "true");
        localStorage.setItem("guardians-of-pixel-epoca-temporal-v1", "passado");
    });
    await page.goto("/");
    await page.locator('button[onclick="mostrarCapitulos()"]')
        .click();
    await page.locator('[data-numero-capitulo="2"] .botao-maquina-tempo-capitulo').click();
    await page.locator(".fase-tema-primordial .botao-fase-acao").click();
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    expect(await page.evaluate(() => eval(`({
        faseSelecionada,
        tema: obterFaseAtual().tema,
        limite: obterLimiteDeTorres(),
        wave,
        trilhaPrimordial: trilhaDaSelvaAtiva,
        intervaloMusica: obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso,
        comprimentos: caminhosDasFases[8].map(caminho => caminho.slice(1).reduce(
            (total, ponto, indice) => total + Math.hypot(
                ponto.x - caminho[indice].x,
                ponto.y - caminho[indice].y
            ),
            0
        )),
        rotasPorWave: [1, 5, 6, 10, 11, 12, 19, 20]
            .map(obterIndiceDoCaminhoVivoNaWave)
    })`))).toEqual({
        faseSelecionada: 8,
        tema: "primordial",
        limite: 15,
        wave: 1,
        trilhaPrimordial: true,
        intervaloMusica: 230,
        comprimentos: [3200, 3180, 2320],
        rotasPorWave: [0, 0, 1, 1, 0, 1, 0, 1]
    });

    expect(await page.evaluate(() => eval(`(() => {
        wave = 19;
        iniciarProximaWave();
        return {
            raptors: inimigosRaptorsAncestraisParaCriar,
            besouros: inimigosBesourosDeAmbarParaCriar,
            triceratopos: inimigosTriceratoposParaCriar,
            bosses: inimigosChefesParaCriar,
            tipoDoBoss: obterTipoDeBossDaFase()
        };
    })()`))).toEqual({
        raptors: 5,
        besouros: 4,
        triceratopos: 3,
        bosses: 1,
        tipoDoBoss: "bossPrimordial"
    });

    expect(await page.evaluate(() => eval(`(() => {
        inimigos = [];
        wave = 5;
        criarInimigo("bossPrimordial");
        const tirano = inimigos[0];
        aplicarDanoAoInimigo(tirano, 3500, Date.now());
        return {
            vida: tirano.vida,
            chamados: tirano.chamadosPrimordiaisRealizados,
            caminhoDoTirano: tirano.indiceDoCaminho,
            raptorsInvocados: inimigos.filter(inimigo => inimigo.tipo === "raptorAncestral").length,
            raptorsNoAtalho: inimigos.filter(inimigo => (
                inimigo.tipo === "raptorAncestral" && inimigo.indiceDoCaminho === 2
            )).length
        };
    })()`))).toEqual({
        vida: 1300,
        chamados: 2,
        caminhoDoTirano: 2,
        raptorsInvocados: 4,
        raptorsNoAtalho: 4
    });
});

test("joga a Metrópole Neon, enfrenta o Protocolo Zero e abre a transmissão", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "8");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-maquina-tempo-v1", "true");
        localStorage.setItem("guardians-of-pixel-epoca-temporal-v1", "futuro");
    });
    await page.goto("/");
    await page.locator('button[onclick="mostrarCapitulos()"]')
        .click();
    await page.locator('[data-numero-capitulo="2"] .botao-maquina-tempo-capitulo').click();
    const passagem = page.locator(".fase-tema-futurista");
    await expect(passagem).toBeVisible();
    await expect(passagem.locator("button")).toBeEnabled();
    await passagem.locator("button").click();
    await expect(page.locator("#menu-principal")).toHaveClass(/tema-futurista/);
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    expect(await page.evaluate(() => eval(`({
        faseSelecionada,
        tema: obterFaseAtual().tema,
        limite: obterLimiteDeTorres(),
        wave,
        trilhaAtiva: trilhaDaSelvaAtiva,
        intervaloMusica: obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso,
        comprimento: caminhosDasFases[9].slice(1).reduce(
            (total, ponto, indice) => total + Math.hypot(
                ponto.x - caminhosDasFases[9][indice].x,
                ponto.y - caminhosDasFases[9][indice].y
            ),
            0
        ),
        velocidadeNoTrilho: obterVelocidadeAtualDoInimigo({
            tipo: "droneCacador", x: 220, y: 100, velocidade: 3, vida: 360, vidaMaxima: 360
        }, Date.now())
    })`))).toEqual({
        faseSelecionada: 9,
        tema: "futurista",
        limite: 15,
        wave: 1,
        trilhaAtiva: true,
        intervaloMusica: 210,
        comprimento: 3010,
        velocidadeNoTrilho: 4.35
    });

    expect(await page.evaluate(() => eval(`(() => {
        jogoPausado = true;
        wave = 19;
        iniciarProximaWave();
        const composicao = {
            drones: inimigosDronesCacadoresParaCriar,
            reparadores: inimigosRobosReparadoresParaCriar,
            sentinelas: inimigosSentinelasDeEscudoParaCriar,
            bosses: inimigosChefesParaCriar,
            tipoDoBoss: obterTipoDeBossDaFase()
        };
        inimigos = [];
        wave = 5;
        criarInimigo("protocoloZero");
        const protocolo = inimigos[0];
        posicionarInimigoNoProgressoDoCaminho(protocolo, 1000);
        aplicarDanoAoInimigo(protocolo, 4000, Date.now());
        return {
            ...composicao,
            vidaDoBoss: protocolo.vida,
            reversoes: protocolo.reversoesTemporaisRealizadas,
            progressoDoBoss: Math.round(calcularProgressoDoInimigo(protocolo))
        };
    })()`))).toEqual({
        drones: 5,
        reparadores: 4,
        sentinelas: 3,
        bosses: 1,
        tipoDoBoss: "protocoloZero",
        vidaDoBoss: 2264,
        reversoes: 2,
        progressoDoBoss: 520
    });

    await page.evaluate(() => eval(`
        inimigos = [];
        wave = 10;
        radioProjetoRelogioDisponivel = false;
        disponibilizarRadioProjetoRelogio();
        desenharMapa();
    `));
    const caixaDoMapa = await page.locator("#game").boundingBox();
    expect(caixaDoMapa).not.toBeNull();
    await page.mouse.click(
        caixaDoMapa.x + caixaDoMapa.width * (700 / 1200),
        caixaDoMapa.y + caixaDoMapa.height * (350 / 700)
    );
    await expect(page.locator("#camada-cutscene-carta")).toBeVisible();
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText(
        "TRANSMISSÃO 09 — REMETENTE DESCONHECIDO"
    );
    await expect(page.locator("#texto-cutscene-carta")).toContainText("Projeto Relógio");
    await expect(page.locator("#camada-cutscene-carta")).toHaveAttribute("data-tipo-carta", "transmissao");
    await expect(page.locator(".radio-transmissao")).toBeVisible();
    await expect(page.locator("#assinatura-cutscene-carta")).toHaveText("FREQUÊNCIA: PROJETO RELÓGIO");
    await expect(page.locator("#botao-continuar-cutscene-carta")).toHaveText("Desligar rádio");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(page.locator("#camada-cutscene-carta")).toBeHidden();
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-transmissao-projeto-relogio-v1"
    ))).toBe("true");
});

test("joga o Laboratório Abandonado e conclui sua história", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "9");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-maquina-tempo-v1", "true");
        localStorage.setItem("guardians-of-pixel-epoca-temporal-v1", "passado");
    });
    await page.goto("/");
    await page.locator('button[onclick="mostrarCapitulos()"]')
        .click();
    await page.locator('[data-numero-capitulo="2"] .botao-maquina-tempo-capitulo').click();
    const passagem = page.locator(".fase-tema-laboratorio");
    await expect(passagem).toBeVisible();
    await expect(passagem).toContainText("Laboratório Abandonado");
    await expect(passagem.locator("button")).toBeEnabled();
    await passagem.locator("button").click();
    await expect(page.locator("#menu-principal")).toHaveClass(/tema-laboratorio/);
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    expect(await page.evaluate(() => eval(`({
        faseSelecionada,
        tema: obterFaseAtual().tema,
        limite: obterLimiteDeTorres(),
        wave,
        camaras: CONFIG.laboratorioAbandonado.contencao.camaras.length,
        trilhaAtiva: trilhaDaSelvaAtiva,
        intervaloMusica: obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso,
        comprimento: caminhosDasFases[10].slice(1).reduce(
            (total, ponto, indice) => total + Math.hypot(
                ponto.x - caminhosDasFases[10][indice].x,
                ponto.y - caminhosDasFases[10][indice].y
            ),
            0
        )
    })`))).toEqual({
        faseSelecionada: 10,
        tema: "laboratorio",
        limite: 15,
        wave: 1,
        camaras: 2,
        trilhaAtiva: true,
        intervaloMusica: 250,
        comprimento: 3150
    });

    await page.evaluate(() => eval("inimigosParaCriar = Math.max(1, inimigosParaCriar)"));
    const caixaDoMapa = await page.locator("#game").boundingBox();
    expect(caixaDoMapa).not.toBeNull();
    await page.mouse.click(
        caixaDoMapa.x + caixaDoMapa.width * (250 / 1200),
        caixaDoMapa.y + caixaDoMapa.height * (105 / 700)
    );
    await page.mouse.click(
        caixaDoMapa.x + caixaDoMapa.width * (855 / 1200),
        caixaDoMapa.y + caixaDoMapa.height * (535 / 700)
    );
    expect(await page.evaluate(() => eval(`(() => {
        const agora = Date.now();
        contencaoLaboratorioFechaEm = agora;
        contencaoLaboratorioExpiraEm = agora + 3000;
        atualizarProtocoloDeContencao(agora);
        const comum = {
            tipo: "normal", x: 250, y: 160, velocidade: 1.5, vida: 100, vidaMaxima: 100
        };
        const boss = {
            tipo: "prototipoAlfa",
            x: 250,
            y: 160,
            velocidade: 0.7,
            vida: 5900,
            vidaMaxima: 5900,
            numeroDaAtivacaoDaContencao: 0,
            contencaoLaboratorioExpiraEm: 0
        };
        return {
            usada: contencaoLaboratorioUsadaNaWave,
            camara: idDaCamaraDeContencaoSelecionada,
            comumRetido: obterVelocidadeAtualDoInimigo(comum, agora),
            bossRetido: obterVelocidadeAtualDoInimigo(boss, agora),
            bossLiberado: obterVelocidadeAtualDoInimigo(boss, agora + 1500)
        };
    })()`))).toEqual({
        usada: true,
        camara: "a",
        comumRetido: 0,
        bossRetido: 0,
        bossLiberado: 0.7
    });

    expect(await page.evaluate(() => eval(`(() => {
        jogoPausado = true;
        wave = 19;
        iniciarProximaWave();
        const composicao = {
            automatos: inimigosAutomatosDeCobreParaCriar,
            cobaias: inimigosCobaiasInstaveisParaCriar,
            guardas: inimigosGuardasDeContencaoParaCriar,
            bosses: inimigosChefesParaCriar,
            tipoDoBoss: obterTipoDeBossDaFase()
        };
        inimigos = [];
        torres = [
            { tipo: "padrao", x: 110, y: 100, alvoAtual: {} },
            { tipo: "gelo", x: 130, y: 100, alvoAtual: {} },
            { tipo: "amplificadorPixel", x: 105, y: 100, alvoAtual: {} },
            { tipo: "laser", x: 150, y: 100, alvoAtual: {} },
            { tipo: "sismica", x: 500, y: 100, alvoAtual: {} }
        ];
        wave = 5;
        criarInimigo("prototipoAlfa");
        const prototipo = inimigos[0];
        prototipo.x = 100;
        prototipo.y = 100;
        const agora = Date.now();
        aplicarDanoAoInimigo(prototipo, 4000, agora);
        return {
            ...composicao,
            vidaDoBoss: prototipo.vida,
            pulsos: prototipo.pulsosDeEstaseRealizados,
            torresParalisadas: torres.filter(torre =>
                (torre.estaseTemporalExpiraEm || 0) > agora
            ).length,
            suporteParalisado: (torres[2].estaseTemporalExpiraEm || 0) > agora
        };
    })()`))).toEqual({
        automatos: 5,
        cobaias: 4,
        guardas: 3,
        bosses: 1,
        tipoDoBoss: "prototipoAlfa",
        vidaDoBoss: 1900,
        pulsos: 2,
        torresParalisadas: 3,
        suporteParalisado: false
    });

    await page.evaluate(() => eval(`
        inimigos = [];
        wave = 10;
        terminalLaboratorioDisponivel = false;
        disponibilizarTerminalLaboratorio();
        desenharMapa();
    `));
    await page.mouse.click(
        caixaDoMapa.x + caixaDoMapa.width * (650 / 1200),
        caixaDoMapa.y + caixaDoMapa.height * (350 / 700)
    );
    await expect(page.locator("#camada-cutscene-carta")).toBeVisible();
    await expect(page.locator("#camada-cutscene-carta")).toHaveAttribute("data-tipo-carta", "registro");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText("REGISTRO DE ATIVAÇÃO 00");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("O corpo permaneceu vazio");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("pesquisador-chefe desapareceu");
    await expect(page.locator(".terminal-registro")).toBeVisible();
    await expect(page.locator("#assinatura-cutscene-carta")).toHaveText("ARQUIVO: ORIGEM / ACESSO PARCIAL");
    await expect(page.locator("#botao-continuar-cutscene-carta")).toHaveText("Fechar registro");
    expect(await page.evaluate(() => eval("jogoPausado"))).toBe(true);
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(page.locator("#camada-cutscene-carta")).toBeHidden();
    expect(await page.evaluate(() => eval("jogoPausado"))).toBe(false);
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-registro-laboratorio-v1"
    ))).toBe("true");

    await page.evaluate(() => eval(`
        registroLaboratorioVisto = false;
        localStorage.removeItem("guardians-of-pixel-registro-laboratorio-v1");
        partidaEncerrada = false;
        partidaVencida = false;
        finalizarPartidaComVitoria();
    `));
    const cenaFinal = page.locator("#camada-cutscene-carta");
    await expect(cenaFinal).toBeVisible();
    await expect(cenaFinal).toHaveAttribute("data-tipo-carta", "registro");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText("REGISTRO DE ATIVAÇÃO 00");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cenaFinal).toHaveAttribute("data-tipo-carta", "cena-final-laboratorio");
    await expect(cenaFinal).toHaveAttribute("data-etapa-cena", "arquivo");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText("ARQUIVO RECUPERADO");
    await expect(page.locator("#texto-cutscene-carta")).toContainText(
        "não criou a consciência temporal"
    );
    await expect(page.locator("#botao-continuar-cutscene-carta")).toHaveText(
        "Reproduzir gravação"
    );

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cenaFinal).toHaveAttribute("data-etapa-cena", "gravacao");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText(
        "GRAVAÇÃO DO PESQUISADOR-CHEFE"
    );
    await expect(page.locator("#texto-cutscene-carta")).toContainText(
        "Se eu desaparecer, destruam a máquina"
    );
    await expect(page.locator("#assinatura-cutscene-carta")).toHaveText(
        "IDENTIDADE VISUAL: ARQUIVO CORROMPIDO"
    );

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cenaFinal).toHaveAttribute("data-etapa-cena", "coordenada");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText(
        "COORDENADA NÃO SOLICITADA"
    );
    await expect(page.locator(".maquina-tempo-cena-final")).toBeVisible();
    await expect(page.locator(".terminal-registro")).toBeHidden();
    await expect(page.locator("#texto-cutscene-carta")).toContainText(
        "futuro que não deveria existir"
    );
    await expect(page.locator("#botao-continuar-cutscene-carta")).toHaveText("Ver resultado");
    expect(await page.evaluate(() => eval("CONFIG.fases.some(fase => fase.numero === 11)")))
        .toBe(true);

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cenaFinal).toBeHidden();
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#botao-proxima-fase-resultado")).toBeEnabled();
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-cena-final-laboratorio-v1"
    ))).toBe("true");

    await page.evaluate(() => eval(`
        ocultarPainelDeResultado();
        partidaEncerrada = false;
        partidaVencida = false;
        finalizarPartidaComVitoria();
    `));
    await expect(cenaFinal).toBeHidden();
    await expect(page.locator("#camada-resultado")).toBeVisible();
});

test("atravessa as Fendas Temporais e descobre o Futuro Despedaçado", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "10");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-maquina-tempo-v1", "true");
        localStorage.setItem("guardians-of-pixel-epoca-temporal-v1", "futuro");
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
        localStorage.removeItem("guardians-of-pixel-transmissao-futuro-despedacado-v1");
        localStorage.removeItem("guardians-of-pixel-cena-final-futuro-despedacado-v1");
    });
    await page.goto("/");
    await page.locator('button[onclick="mostrarCapitulos()"]').click();
    await page.locator('[data-numero-capitulo="2"] .botao-maquina-tempo-capitulo').click();
    const passagem = page.locator(".fase-tema-futuroDespedacado");
    await expect(passagem).toBeVisible();
    await expect(passagem).toContainText("Futuro Despedaçado");
    await expect(passagem.locator("button")).toBeEnabled();
    await passagem.locator("button").click();
    await expect(page.locator("#menu-principal")).toHaveClass(/tema-futuroDespedacado/);
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    expect(await page.evaluate(() => eval(`({
        faseSelecionada,
        tema: obterFaseAtual().tema,
        limite: obterLimiteDeTorres(),
        wave,
        fendas: CONFIG.futuroDespedacado.fendasTemporais.pares.length,
        trilhaAtiva: trilhaDaSelvaAtiva,
        intervaloMusica: obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso,
        comprimento: caminhosDasFases[11].slice(1).reduce(
            (total, ponto, indice) => total + Math.hypot(
                ponto.x - caminhosDasFases[11][indice].x,
                ponto.y - caminhosDasFases[11][indice].y
            ),
            0
        )
    })`))).toEqual({
        faseSelecionada: 11,
        tema: "futuroDespedacado",
        limite: 15,
        wave: 1,
        fendas: 2,
        trilhaAtiva: true,
        intervaloMusica: 235,
        comprimento: 3160
    });

    expect(await page.evaluate(() => eval(`(() => {
        jogoPausado = true;
        wave = 19;
        iniciarProximaWave();
        const composicao = {
            drones: inimigosDronesDoFuturoDespedacadoParaCriar,
            andarilhos: inimigosAndarilhosDeSucataParaCriar,
            ecos: inimigosEcosTemporaisParaCriar,
            sentinelas: inimigosSentinelasCronologicasParaCriar,
            bosses: inimigosChefesParaCriar,
            tipoDoBoss: obterTipoDeBossDaFase()
        };
        inimigos = [];
        wave = 5;
        criarInimigo("sentinelaDoAmanha");
        const boss = inimigos[0];
        posicionarInimigoNoProgressoDoCaminho(boss, 1000);
        aplicarDanoAoInimigo(boss, 4300, 1000);

        criarInimigo("ecoTemporal");
        const eco = inimigos[1];
        posicionarInimigoNoProgressoDoCaminho(eco, 800);
        aplicarDanoAoInimigo(eco, 760, 1000);

        criarInimigo("andarilhoDeSucata");
        const andarilho = inimigos[2];
        posicionarInimigoNoProgressoDoCaminho(andarilho, 620);
        const iniciouContagem = atualizarFendaTemporalDoInimigo(andarilho, 1000);
        const parouNaContagem = atualizarFendaTemporalDoInimigo(andarilho, 1849);
        atualizarFendaTemporalDoInimigo(andarilho, 1850);

        return {
            ...composicao,
            vidaDoBoss: boss.vida,
            recuosDoBoss: boss.recuosDaSentinelaRealizados,
            progressoDoBoss: Math.round(calcularProgressoDoInimigo(boss)),
            vidaDoEco: eco.vida,
            retornosDoEco: eco.retornosDoEcoRealizados,
            progressoDoEco: Math.round(calcularProgressoDoInimigo(eco)),
            iniciouContagem,
            parouNaContagem,
            fendasUsadas: [...andarilho.fendasTemporaisUsadas],
            progressoDoAndarilho: Math.round(calcularProgressoDoInimigo(andarilho))
        };
    })()`))).toEqual({
        drones: 4,
        andarilhos: 4,
        ecos: 4,
        sentinelas: 3,
        bosses: 1,
        tipoDoBoss: "sentinelaDoAmanha",
        vidaDoBoss: 2200,
        recuosDoBoss: 2,
        progressoDoBoss: 360,
        vidaDoEco: 380,
        retornosDoEco: 1,
        progressoDoEco: 580,
        iniciouContagem: true,
        parouNaContagem: true,
        fendasUsadas: ["a"],
        progressoDoAndarilho: 1040
    });

    await page.evaluate(() => eval(`
        inimigos = [];
        wave = 1;
        jogoPausado = false;
        transmissorFuturoDespedacadoDisponivel = false;
        disponibilizarTransmissorFuturoDespedacado();
        desenharMapa();
    `));
    const caixaDoMapa = await page.locator("#game").boundingBox();
    expect(caixaDoMapa).not.toBeNull();
    await page.mouse.click(
        caixaDoMapa.x + caixaDoMapa.width * (675 / 1200),
        caixaDoMapa.y + caixaDoMapa.height * (405 / 700)
    );
    const cena = page.locator("#camada-cutscene-carta");
    await expect(cena).toBeVisible();
    await expect(cena).toHaveAttribute("data-tipo-carta", "transmissao-futuro-despedacado");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText("TRANSMISSÃO FRAGMENTADA 11");
    await expect(page.locator("#texto-cutscene-carta")).toContainText(
        "Não confie em quem lhe deu a máquina"
    );
    await expect(page.locator(".transmissao-futuro-visual")).toBeVisible();
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toBeHidden();

    await page.evaluate(() => eval(`
        transmissaoFuturoDespedacadoVista = false;
        localStorage.removeItem("guardians-of-pixel-transmissao-futuro-despedacado-v1");
        partidaEncerrada = false;
        partidaVencida = false;
        finalizarPartidaComVitoria();
    `));
    await expect(cena).toHaveAttribute("data-tipo-carta", "transmissao-futuro-despedacado");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-tipo-carta", "cena-final-futuro-despedacado");
    await expect(cena).toHaveAttribute("data-etapa-cena", "arquivo");
    await expect(page.locator("#texto-cutscene-carta")).toContainText(
        "Apenas abrimos a porta para ele"
    );

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "silhueta");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("silhueta humana alta");
    await expect(page.locator(".transmissao-futuro-relogio")).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("#titulo-cutscene-carta")).toBeInViewport();
    await expect(page.locator("#texto-cutscene-carta")).toBeInViewport();
    await expect(page.locator("#botao-continuar-cutscene-carta")).toBeInViewport();
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "coordenada");
    await expect(page.locator(".maquina-tempo-cena-final")).toBeVisible();
    await expect(page.locator("#texto-cutscene-carta")).toContainText("03:17");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toBeHidden();
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#botao-proxima-fase-resultado")).toBeEnabled();
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-cena-final-futuro-despedacado-v1"
    ))).toBe("true");
});

test("encerra o Capítulo 2 no Ponto Zero", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "11");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-maquina-tempo-v1", "true");
        localStorage.setItem("guardians-of-pixel-epoca-temporal-v1", "futuro");
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
        localStorage.removeItem("guardians-of-pixel-cena-final-ponto-zero-v1");
    });
    await page.goto("/");
    await page.locator('button[onclick="mostrarCapitulos()"]').click();
    await page.locator('[data-numero-capitulo="2"] .botao-maquina-tempo-capitulo').click();
    const passagem = page.locator(".fase-tema-pontoZero");
    await expect(passagem).toBeVisible();
    await expect(passagem).toContainText("Ponto Zero");
    await expect(passagem.locator("button")).toBeEnabled();
    await passagem.locator("button").click();
    await expect(page.locator("#menu-principal")).toHaveClass(/tema-pontoZero/);
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    expect(await page.evaluate(() => eval(`({
        faseSelecionada,
        tema: obterFaseAtual().tema,
        limite: obterLimiteDeTorres(),
        wave,
        setores: CONFIG.pontoZero.oscilacaoTemporal.setores.length,
        registros: CONFIG.pontoZero.registros.length,
        trilhaAtiva: trilhaDaSelvaAtiva,
        intervaloMusica: obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso,
        espacosCentraisLivres: [
            { x: 470, y: 210 },
            { x: 570, y: 500 },
            { x: 760, y: 500 }
        ].every(ponto => (
            !estaNoCaminho(ponto.x, ponto.y)
            && !estaPertoDosRegistrosPontoZero(ponto.x, ponto.y)
        )),
        comprimentos: caminhosDasFases[12].map(caminho => caminho.slice(1).reduce(
            (total, ponto, indice) => total + Math.hypot(
                ponto.x - caminho[indice].x,
                ponto.y - caminho[indice].y
            ),
            0
        ))
    })`))).toEqual({
        faseSelecionada: 12,
        tema: "pontoZero",
        limite: 15,
        wave: 1,
        setores: 2,
        registros: 3,
        trilhaAtiva: true,
        intervaloMusica: 340,
        espacosCentraisLivres: true,
        comprimentos: [2020, 2020]
    });

    expect(await page.evaluate(() => eval(`(() => {
        jogoPausado = true;
        wave = 19;
        iniciarProximaWave();
        const composicao = {
            residuos: inimigosResiduosTemporaisParaCriar,
            arquivistas: inimigosArquivistasCorrompidosParaCriar,
            vigias: inimigosVigiasDoPontoZeroParaCriar,
            bosses: inimigosChefesParaCriar,
            tipoDoBoss: obterTipoDeBossDaFase()
        };

        inimigos = [];
        wave = 1;
        criarInimigo("residuoTemporal");
        const residuo = inimigos[0];
        posicionarInimigoNoProgressoDoCaminho(residuo, 160);
        const multiplicadorImpar = obterMultiplicadorDoPontoZeroParaInimigo(residuo);
        wave = 2;
        const multiplicadorPar = obterMultiplicadorDoPontoZeroParaInimigo(residuo);

        criarInimigo("arquivistaCorrompido");
        const arquivista = inimigos[1];
        aplicarDanoAoInimigo(arquivista, 600, 1000);

        criarInimigo("guardiaoDoPontoZero");
        const guardiao = inimigos.find(inimigo => inimigo.tipo === "guardiaoDoPontoZero");
        aplicarDanoAoInimigo(guardiao, 2500, 2000);

        return {
            ...composicao,
            multiplicadorImpar,
            multiplicadorPar,
            fragmentos: inimigos.filter(inimigo => inimigo.tipo === "fragmentoDeArquivo").length,
            rupturasDoBoss: guardiao.rupturasDoPontoZeroRealizadas,
            residuosInvocados: inimigos.filter(inimigo => inimigo.tipo === "residuoTemporal").length - 1,
            escudoExpiraEm: guardiao.escudoPontoZeroExpiraEm,
            reducaoDoEscudo: obterReducaoDoPontoZeroNoInimigo(guardiao, 3499)
        };
    })()`))).toEqual({
        residuos: 5,
        arquivistas: 4,
        vigias: 3,
        bosses: 1,
        tipoDoBoss: "guardiaoDoPontoZero",
        multiplicadorImpar: 0.75,
        multiplicadorPar: 1.3,
        fragmentos: 2,
        rupturasDoBoss: 2,
        residuosInvocados: 2,
        escudoExpiraEm: 3500,
        reducaoDoEscudo: 0.3
    });

    await page.evaluate(() => eval(`
        inimigos = [];
        inimigosParaCriar = 0;
        inimigosChefesParaCriar = 0;
        proximaWaveEm = Date.now() + 100000;
        wave = 5;
        jogoPausado = false;
        ultimaWaveComBonusOferecido = 5;
        ocultarPainelBonusPosBoss();
        avisoBossExpiraEm = 0;
        avisoExpiraEm = 0;
        registrosPontoZeroAnunciados.clear();
        registrosPontoZeroLidos.clear();
        disponibilizarRegistrosPontoZero();
        desenharMapa();
    `));
    await page.locator("#game").screenshot({
        path: testInfo.outputPath("fase-12-mapa.png")
    });
    const caixaDoMapa = await page.locator("#game").boundingBox();
    expect(caixaDoMapa).not.toBeNull();
    await page.mouse.click(
        caixaDoMapa.x + caixaDoMapa.width * (170 / 1200),
        caixaDoMapa.y + caixaDoMapa.height * (180 / 700)
    );
    const cena = page.locator("#camada-cutscene-carta");
    await expect(cena).toBeVisible();
    await expect(cena).toHaveAttribute("data-tipo-carta", "registro-ponto-zero");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText("REGISTRO I — O CORPO");
    await expect(page.locator(".terminal-registro")).toBeVisible();
    await expect(page.locator("#texto-cutscene-carta")).toContainText("fora do fluxo normal do tempo");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toBeHidden();

    await page.evaluate(() => eval(`
        partidaEncerrada = false;
        partidaVencida = false;
        finalizarPartidaComVitoria();
    `));
    await expect(cena).toHaveAttribute("data-tipo-carta", "cena-final-ponto-zero");
    await expect(cena).toHaveAttribute("data-etapa-cena", "arquivo");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("mente e as lembranças do pesquisador");

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "aparicao");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText("SENHOR DO TEMPO");
    await expect(page.locator(".senhor-tempo-revelado")).toBeVisible();
    await expect(page.locator("#texto-cutscene-carta")).toContainText("finalmente descobriu");
    await expect(page.locator(".carta-misteriosa")).toHaveCSS("opacity", "1");
    await page.screenshot({ path: testInfo.outputPath("fase-12-senhor-do-tempo.png") });

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("#titulo-cutscene-carta")).toBeInViewport();
    await expect(page.locator("#texto-cutscene-carta")).toBeInViewport();
    await expect(page.locator("#botao-continuar-cutscene-carta")).toBeInViewport();
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "maquina");
    await expect(page.locator(".maquina-tempo-cena-final")).toBeVisible();
    await expect(page.locator("#texto-cutscene-carta")).toContainText("coordenadas que eu preparei");

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "protecoes");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("removeu uma proteção");

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "capitulo3");
    await expect(page.locator("#titulo-cutscene-carta")).toHaveText("INTERVALO DETECTADO");
    await expect(page.locator("#texto-cutscene-carta")).toContainText(
        "coordenada impossível"
    );
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toBeHidden();
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#botao-proxima-fase-resultado")).toBeDisabled();
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-cena-final-ponto-zero-v1"
    ))).toBe("true");
    expect(await page.evaluate(() => localStorage.getItem(
        "tower-defense-2-progresso-fases-v2"
    ))).toBe("12");
    await page.locator("#botao-voltar-lobby-resultado").click();
    const capitulo3 = page.locator('[data-numero-capitulo="3"]');
    await expect(capitulo3).toBeVisible();
    await expect(capitulo3).toContainText("Vença O Intervalo Perdido");
    await expect(capitulo3.locator(".botao-capitulo-acao")).toBeDisabled();
    await expect(page.locator("#relogio-quebrado-intervalo")).toBeVisible();
});

test("atravessa o Intervalo Perdido e inicia a Fase 13", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "12");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
        localStorage.removeItem("guardians-of-pixel-capitulo-3-desbloqueado-v1");
        localStorage.removeItem("guardians-of-pixel-cena-final-intervalo-perdido-v1");
        localStorage.removeItem("guardians-of-pixel-introducao-fase-13-v1");
        localStorage.removeItem("guardians-of-pixel-cena-final-fase-13-v1");
    });
    await page.goto("/");

    const relogio = page.locator("#relogio-quebrado-intervalo");
    await expect(relogio).toBeVisible();
    await expect(relogio).toContainText("00:00");
    expect(await relogio.evaluate((elemento) => {
        const estilo = getComputedStyle(elemento);
        const corpo = elemento.querySelector(".relogio-quebrado-corpo");
        const aro = elemento.querySelector(".relogio-quebrado-aro");
        const mostrador = elemento.querySelector(".relogio-quebrado-mostrador");
        const arvore = document.querySelector(".arvore-lobby-1");
        const estiloDoCorpo = getComputedStyle(corpo);
        const caixaDoCorpo = corpo.getBoundingClientRect();
        const caixaDaArvore = arvore.getBoundingClientRect();
        return {
            fundo: estilo.backgroundColor,
            borda: estilo.borderTopWidth,
            cacos: elemento.querySelectorAll(".relogio-quebrado-cacos i").length,
            marcasDeHora: elemento.querySelectorAll(".relogio-quebrado-marcas i").length,
            rachaduras: elemento.querySelectorAll(".relogio-rachadura").length,
            temFalhaNoVidro: Boolean(elemento.querySelector(".relogio-quebrado-falta")),
            formatoCircular: Math.abs(caixaDoCorpo.height - caixaDoCorpo.width) <= 1,
            menorQueArvore: caixaDoCorpo.width < caixaDaArvore.width && caixaDoCorpo.height < caixaDaArvore.height,
            aroCircular: getComputedStyle(aro).borderRadius === "50%",
            mostradorCircular: getComputedStyle(mostrador).borderRadius === "50%",
            semRotacao: estiloDoCorpo.transform === "none",
            corpoCircular: estiloDoCorpo.borderRadius === "50%"
        };
    })).toEqual({
        fundo: "rgba(0, 0, 0, 0)",
        borda: "0px",
        cacos: 3,
        marcasDeHora: 12,
        rachaduras: 3,
        temFalhaNoVidro: true,
        formatoCircular: true,
        menorQueArvore: true,
        aroCircular: true,
        mostradorCircular: true,
        semRotacao: true,
        corpoCircular: true
    });
    await relogio.screenshot({
        path: testInfo.outputPath("relogio-parede-quebrado.png")
    });
    await page.screenshot({
        path: testInfo.outputPath("lobby-com-relogio-parede-quebrado.png")
    });
    await page.setViewportSize({ width: 390, height: 844 });
    const caixaDoRelogioNoCelular = await relogio.boundingBox();
    expect(caixaDoRelogioNoCelular).not.toBeNull();
    expect(caixaDoRelogioNoCelular.x).toBeGreaterThanOrEqual(0);
    expect(caixaDoRelogioNoCelular.y).toBeGreaterThanOrEqual(0);
    expect(caixaDoRelogioNoCelular.x + caixaDoRelogioNoCelular.width).toBeLessThanOrEqual(390);
    expect(caixaDoRelogioNoCelular.y + caixaDoRelogioNoCelular.height).toBeLessThanOrEqual(844);
    expect(await relogio.evaluate((elemento) => getComputedStyle(elemento).transform)).toBe("none");
    await page.screenshot({
        path: testInfo.outputPath("lobby-com-relogio-parede-quebrado-celular.png")
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await relogio.click();

    const armadilha = page.locator("#camada-conversa-portal");
    const avancarArmadilha = armadilha.locator(".botao-avancar-armadilha-intervalo");
    await expect(armadilha).toBeVisible();
    await expect(armadilha).toHaveAttribute("data-tipo-conversa", "armadilha-intervalo");
    await expect(armadilha).toHaveAttribute("data-etapa-conversa", "revelacao");
    await expect(armadilha.locator(".conversa-portal-fala")).toContainText("sabe o que eu sou");
    await expect(page.locator("#camada-transicao-intervalo")).toBeHidden();
    await armadilha.screenshot({
        path: testInfo.outputPath("armadilha-senhor-do-tempo.png")
    });
    await avancarArmadilha.click();
    await expect(armadilha).toHaveAttribute("data-etapa-conversa", "desterro");
    await expect(armadilha.locator(".conversa-portal-fala")).toContainText("O tempo não existe lá");
    await avancarArmadilha.click();
    await expect(armadilha).toHaveAttribute("data-etapa-conversa", "prisioneiro");
    await expect(armadilha.locator(".conversa-portal-fala")).toContainText("recria fragmentos");
    await avancarArmadilha.click();
    await expect(armadilha).toHaveAttribute("data-etapa-conversa", "adeus");
    await expect(armadilha.locator(".conversa-portal-fala")).toContainText("Não sou eu quem controla");
    await expect(avancarArmadilha).toHaveText("Tentar resistir");
    await avancarArmadilha.click();
    await expect(armadilha).toBeHidden();
    await expect(page.locator("#camada-transicao-intervalo")).toBeVisible();
    await expect.poll(() => page.evaluate(() => eval("faseSelecionada"))).toBe(100);
    await expect(page.locator("#camada-transicao-intervalo")).toBeHidden();

    const cena = page.locator("#camada-cutscene-carta");
    await expect(cena).toBeVisible();
    await expect(cena).toHaveAttribute("data-tipo-carta", "introducao-intervalo-perdido");
    await expect(cena).toHaveAttribute("data-etapa-cena", "coordenada");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("nenhuma era");
    await cena.screenshot({
        path: testInfo.outputPath("introducao-intervalo-perdido.png")
    });
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "sinal");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("preso entre os segundos");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toBeHidden();

    expect(await page.evaluate(() => eval(`(() => {
        definirJogoPausado(true);
        wave = 2;
        iniciarProximaWave();
        const desafioIniciado = desafioDosRelogiosDoIntervalo !== null;
        const sequencia = [...desafioDosRelogiosDoIntervalo.sequencia].sort();
        const proximoTipo = obterProximoTipoDeInimigo();
        concluirDesafioDosRelogiosDoIntervalo(true, 1000);
        return {
            faseSelecionada,
            tema: obterFaseAtual().tema,
            ultimaWave: obterUltimaWaveDaFase(),
            limite: obterLimiteDeTorres(),
            nomeDaMusica: obterConfiguracaoDaMusicaDaSelva().nomeInterno,
            intervaloMusica: obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso,
            trilhaDoLimboAtiva: trilhaDaSelvaAtiva,
            trilhaGlitchAtiva: trilhaDaDimensaoGlitchAtiva,
            fragmentosDeSegundoParaCriar,
            ponteirosErrantesParaCriar,
            paradoxosBlindadosParaCriar,
            proximoTipo,
            desafioIniciado,
            sequencia,
            lentidaoExpiraEm: lentidaoDosRelogiosDoIntervaloExpiraEm,
            tipoDoBoss: obterTipoDeBossDaFase()
        };
    })()`))).toEqual({
        faseSelecionada: 100,
        tema: "intervaloPerdido",
        ultimaWave: 10,
        limite: 12,
        nomeDaMusica: "Ecos do Limbo",
        intervaloMusica: 480,
        trilhaDoLimboAtiva: true,
        trilhaGlitchAtiva: false,
        fragmentosDeSegundoParaCriar: 6,
        ponteirosErrantesParaCriar: 1,
        paradoxosBlindadosParaCriar: 0,
        proximoTipo: "ponteiroErrante",
        desafioIniciado: true,
        sequencia: [0, 1, 2],
        lentidaoExpiraEm: 5000,
        tipoDoBoss: "carcereiroDoIntervalo"
    });
    await page.evaluate(() => eval("desenharMapa(); desenharInimigos();"));
    await page.locator("#game").screenshot({
        path: testInfo.outputPath("intervalo-perdido-mapa.png")
    });

    const permanenciaDaMusicaDoLimbo = await page.evaluate(() => eval(`(() => {
        const temporizadorInicial = intervaloDaMusicaDaSelva;
        wave = 4;
        iniciarProximaWave();
        const musicaDaWave5 = obterConfiguracaoDaMusicaDaSelva().nomeInterno;
        wave = 9;
        iniciarProximaWave();
        return {
            musicaDaWave5,
            musicaDaWave10: obterConfiguracaoDaMusicaDaSelva().nomeInterno,
            mesmoTemporizador: intervaloDaMusicaDaSelva === temporizadorInicial,
            configuracoesDoLimbo: Object.values(CONFIG.audio)
                .filter(configuracao => configuracao?.nomeInterno === "Ecos do Limbo")
                .length
        };
    })()`));
    expect(permanenciaDaMusicaDoLimbo).toEqual({
        musicaDaWave5: "Ecos do Limbo",
        musicaDaWave10: "Ecos do Limbo",
        mesmoTemporizador: true,
        configuracoesDoLimbo: 1
    });

    await page.evaluate(() => eval(`
        partidaEncerrada = false;
        partidaVencida = false;
        finalizarPartidaComVitoria();
    `));
    await expect(cena).toHaveAttribute("data-tipo-carta", "cena-final-intervalo-perdido");
    await expect(cena).toHaveAttribute("data-etapa-cena", "registro");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("tentando mantê-lo fechado");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "alerta");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "voz");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("abriu o intervalo");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "senhorDoTempo");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("não conseguia observar");
    await page.locator("#botao-continuar-cutscene-carta").click();

    const cutsceneCapitulo = page.locator("#camada-cutscene-capitulo-2");
    await expect(cutsceneCapitulo).toBeVisible();
    await expect(cutsceneCapitulo).toHaveAttribute("data-capitulo", "3");
    await expect(cutsceneCapitulo.locator(".cutscene-capitulo-selo strong")).toHaveText("III");
    await expect(page.locator("#titulo-cutscene-capitulo-2")).toHaveText("CAPÍTULO 3");
    await expect(page.locator("#descricao-cutscene-capitulo-2")).toHaveText("Fases 13 a 18");
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-capitulo-3-desbloqueado-v1"
    ))).toBe("true");
    await page.locator("#botao-continuar-cutscene-capitulo-2").click();
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await page.locator("#botao-voltar-lobby-resultado").click();
    expect(await page.evaluate(() => eval(`({
        musicaDoIntervaloTocando: musicaDaSelvaTocando,
        intervaloDaMusicaDoLimbo: intervaloDaMusicaDaSelva
    })`))).toEqual({
        musicaDoIntervaloTocando: false,
        intervaloDaMusicaDoLimbo: null
    });

    const capitulo3 = page.locator('[data-numero-capitulo="3"]');
    await expect(capitulo3.locator(".botao-capitulo-acao")).toBeEnabled();
    await capitulo3.locator(".botao-capitulo-acao").click();
    const passagem = page.locator(".fase-tema-linhaTemporal");
    await expect(passagem).toContainText("Linha de Frente Temporal");
    await expect(passagem.locator(".botao-fase-acao")).toBeEnabled();
    await passagem.locator(".botao-fase-acao").click();
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    await expect(cena).toBeVisible();
    await expect(cena).toHaveAttribute("data-tipo-carta", "introducao-fase-13");
    await expect(cena).toHaveAttribute("data-etapa-cena", "colisao");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("três frentes");
    await expect(cena.locator(".carta-misteriosa")).toHaveCSS("opacity", "1");
    await cena.screenshot({ path: testInfo.outputPath("fase-13-introducao-colisao.png") });
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "ameaca");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("todas as eras entram em guerra");
    await expect(cena.locator(".carta-misteriosa")).toHaveCSS("opacity", "1");
    await cena.screenshot({ path: testInfo.outputPath("fase-13-introducao-senhor-do-tempo.png") });
    await page.setViewportSize({ width: 390, height: 844 });
    const caixaDaIntroducaoNoCelular = await cena.locator(".carta-misteriosa").boundingBox();
    expect(caixaDaIntroducaoNoCelular).not.toBeNull();
    expect(caixaDaIntroducaoNoCelular.x).toBeGreaterThanOrEqual(0);
    expect(caixaDaIntroducaoNoCelular.x + caixaDaIntroducaoNoCelular.width)
        .toBeLessThanOrEqual(390);
    await cena.screenshot({ path: testInfo.outputPath("fase-13-introducao-celular.png") });
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toBeHidden();
    await page.setViewportSize({ width: 1440, height: 1000 });
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-introducao-fase-13-v1"
    ))).toBe("true");

    const estadoDaFase13 = await page.evaluate(() => eval(`(() => {
        definirJogoPausado(true);
        wave = 1;
        frenteTemporalAtiva = null;
        iniciarProximaWave();
        const frenteEmAviso = {
            era: frenteTemporalAtiva.entrada.id,
            estado: frenteTemporalAtiva.estado
        };
        atualizarFrenteTemporal(frenteTemporalAtiva.ativaEm);
        const reforcoDaFrente = inimigos.find(inimigo => inimigo.entrouPelaFrenteTemporal);
        wave = 3;
        iniciarProximaWave();
        const aceleracaoAtiva = aceleracaoDaInterferenciaTemporalExpiraEm > Date.now();
        wave = 5;
        inimigos = [];
        criarInimigo("executorCronal");
        const executor = inimigos[0];
        aplicarDanoAoInimigo(executor, 4500, Date.now());
        criarInimigo("soldadoCronal");
        const soldado = inimigos[inimigos.length - 1];
        soldado.x = 665;
        soldado.y = 350;
        soldado.formaCronal = "futuro";
        soldado.proximaTrocaDeFormaCronalEm = Date.now() + 3600;
        criarInimigo("portadorDaFenda");
        const portador = inimigos[inimigos.length - 1];
        portador.x = 505;
        portador.y = 300;
        criarFendaDoPortadorDerrotado({
            tipo: "portadorDaFenda",
            x: 910,
            y: 440,
            indiceDoCaminho: 0
        });
        desenharMapa();
        desenharFendasDosPortadores();
        desenharInimigos();
        desenharInterferenciaTemporalDoSenhorDoTempo();
        return {
            faseSelecionada,
            tema: obterFaseAtual().tema,
            limite: obterLimiteDeTorres(),
            nomeDaMusica: obterConfiguracaoDaMusicaDaSelva().nomeInterno,
            intervaloDaMusica: obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso,
            trilhaDaFase13Ativa: trilhaDaSelvaAtiva,
            musicaDaFase13Tocando: musicaDaSelvaTocando,
            aceleracaoAtiva,
            interferenciaVisualAtiva: interferenciaVisualDoSenhorDoTempoExpiraEm > Date.now(),
            frenteEmAviso,
            reforcoDaFrente: {
                tipo: reforcoDaFrente.tipo,
                entrada: reforcoDaFrente.entrouPelaFrenteTemporal
            },
            frenteAposOrdens: frenteTemporalAtiva.entrada.id,
            tipoDoBoss: obterTipoDeBossDaFase(),
            ordens: executor.ordensCronaisRealizadas,
            reforcos: inimigos.filter(inimigo => (
                inimigo.tipo === "raptorAncestral" || inimigo.tipo === "droneCacador"
            )).map(inimigo => inimigo.tipo).sort()
        };
    })()`));
    expect(estadoDaFase13).toEqual({
        faseSelecionada: 13,
        tema: "linhaTemporal",
        limite: 15,
        nomeDaMusica: "Guerra dos Séculos",
        intervaloDaMusica: 280,
        trilhaDaFase13Ativa: true,
        musicaDaFase13Tocando: true,
        aceleracaoAtiva: true,
        interferenciaVisualAtiva: true,
        frenteEmAviso: { era: "passado", estado: "aviso" },
        reforcoDaFrente: { tipo: "raptorAncestral", entrada: "passado" },
        frenteAposOrdens: "futuro",
        tipoDoBoss: "executorCronal",
        ordens: 2,
        reforcos: ["droneCacador", "droneCacador", "raptorAncestral", "raptorAncestral"]
    });
    await page.locator("#game").screenshot({
        path: testInfo.outputPath("fase-13-linha-temporal.png")
    });
    await page.setViewportSize({ width: 390, height: 844 });
    const caixaDoMapaDaFase13 = await page.locator("#game").boundingBox();
    expect(caixaDoMapaDaFase13).not.toBeNull();
    expect(caixaDoMapaDaFase13.x + caixaDoMapaDaFase13.width).toBeLessThanOrEqual(390);
    await page.locator("#game").screenshot({
        path: testInfo.outputPath("fase-13-linha-temporal-celular.png")
    });
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.evaluate(() => eval(`
        partidaEncerrada = false;
        partidaVencida = false;
        finalizarPartidaComVitoria();
    `));
    await expect(cena).toHaveAttribute("data-tipo-carta", "cena-final-fase-13");
    await expect(cena).toHaveAttribute("data-etapa-cena", "explicacao");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("já estavam falhando");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "interferencia");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "destino");
    await expect(page.locator("#assinatura-cutscene-carta")).toContainText("FASE 14");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "prototipo");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("tipo de defesa");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "fichaTecnica");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("você encontra uma ficha");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("inimigos camuflados");
    await expect(cena.locator(".carta-misteriosa")).toHaveCSS("opacity", "1");
    await cena.screenshot({ path: testInfo.outputPath("fase-13-ficha-prototipo-v13.png") });
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "camuflados");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("Como assim");
    await expect(page.locator("#assinatura-cutscene-carta")).toContainText("DESBLOQUEADA");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(page.locator("#camada-resultado")).toBeVisible();
});

test("corrige conclusões indevidas das Fases 13 e 14 sem apagar o restante do perfil", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "14");
        localStorage.setItem("guardians-of-pixel-capitulo-3-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
        localStorage.setItem("guardians-of-pixel-fragmentos-v2", "777");
        localStorage.removeItem("guardians-of-pixel-correcao-progresso-fases-13-14-v1");
    });
    await page.goto("/");

    expect(await page.evaluate(() => ({
        progresso: localStorage.getItem("tower-defense-2-progresso-fases-v2"),
        correcao: localStorage.getItem(
            "guardians-of-pixel-correcao-progresso-fases-13-14-v1"
        ),
        fragmentos: localStorage.getItem("guardians-of-pixel-fragmentos-v2")
    }))).toEqual({
        progresso: "12",
        correcao: "true",
        fragmentos: "777"
    });

    await page.locator('button[onclick="mostrarCapitulos()"]') .click();
    await page.locator('[data-numero-capitulo="3"] .botao-capitulo-acao').click();
    const fase13 = page.locator(".fase-tema-linhaTemporal");
    const fase14 = page.locator(".fase-tema-eraApagada");
    await expect(fase13.locator(".fase-estado")).toHaveText("Disponível");
    await expect(fase13.locator(".botao-fase-acao")).toBeEnabled();
    await expect(fase14.locator(".fase-estado")).toHaveText("Bloqueada");
    await expect(fase14.locator(".botao-fase-acao")).toBeDisabled();
});

test("entra na Era Apagada, enfrenta a Reescrita e conclui a Fase 14", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "13");
        localStorage.setItem("guardians-of-pixel-correcao-progresso-fases-13-14-v1", "true");
        localStorage.setItem("guardians-of-pixel-capitulo-3-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
        localStorage.setItem("guardians-of-pixel-introducao-fase-14-v1", "true");
        localStorage.removeItem("guardians-of-pixel-introducao-fase-14-v2");
        localStorage.removeItem("guardians-of-pixel-cena-final-fase-14-v1");
    });
    await page.goto("/");

    await page.locator('button[onclick="mostrarCapitulos()"]') .click();
    const capitulo3 = page.locator('[data-numero-capitulo="3"]');
    await expect(capitulo3.locator(".botao-capitulo-acao")).toBeEnabled();
    await capitulo3.locator(".botao-capitulo-acao").click();
    const cartaoDaFase = page.locator(".fase-tema-eraApagada");
    await expect(cartaoDaFase).toContainText("A Era Apagada");
    await expect(cartaoDaFase.locator(".botao-fase-acao")).toBeEnabled();
    await expect(cartaoDaFase.locator("h3")).toHaveCSS("color", "rgb(41, 42, 49)");
    await expect(cartaoDaFase.locator("p")).toHaveCSS("color", "rgb(57, 58, 67)");
    await cartaoDaFase.screenshot({ path: testInfo.outputPath("fase-14-cartao.png") });
    await cartaoDaFase.locator(".botao-fase-acao").click();
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    const cartaoDaVarredura = page.locator('[data-tipo-defesa="torreDeVarredura"]');
    await expect(cartaoDaVarredura).toHaveAttribute("aria-pressed", "true");
    await expect(cartaoDaVarredura).toContainText("Obrigatória na Fase 14");
    await cartaoDaVarredura.click();
    await expect(cartaoDaVarredura).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".selecao-defesas-mensagem"))
        .toContainText("detectar os inimigos camuflados");
    await page.locator("#conteudo-menu").screenshot({
        path: testInfo.outputPath("fase-14-torre-varredura-obrigatoria.png")
    });
    await confirmarEquipeAtual(page);

    const cena = page.locator("#camada-cutscene-carta");
    await expect(cena).toBeVisible();
    await expect(cena).toHaveAttribute("data-tipo-carta", "introducao-fase-14");
    await expect(cena).toHaveAttribute("data-etapa-cena", "coordenadaApagada");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("removida da história");
    await expect(cena.locator(".carta-misteriosa")).toHaveCSS("opacity", "1");
    await cena.screenshot({ path: testInfo.outputPath("fase-14-introducao.png") });

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("#titulo-cutscene-carta")).toBeInViewport();
    await expect(page.locator("#botao-continuar-cutscene-carta")).toBeInViewport();
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "avisoReescrita");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("apagada por um motivo");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "inimigosCamuflados");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("nenhuma das suas torres enxerga");
    await expect(cena.locator(".senhor-tempo-revelado")).toBeVisible();
    await expect(cena.locator(".carta-misteriosa")).toHaveCSS("opacity", "1");
    await cena.screenshot({ path: testInfo.outputPath("fase-14-senhor-do-tempo.png") });
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "respostaPrototipo");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("torre específica");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toBeHidden();

    expect(await page.evaluate(() => eval(`({
        tema: obterFaseAtual().tema,
        trilhaAtiva: trilhaDaSelvaAtiva,
        musicaTocando: musicaDaSelvaTocando,
        sequenciadorAtivo: intervaloDaMusicaDaSelva !== null,
        nomeDaMusica: obterConfiguracaoDaMusicaDaSelva().nomeInterno,
        intervaloDoPasso: obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso
    })`))).toEqual({
        tema: "eraApagada",
        trilhaAtiva: true,
        musicaTocando: true,
        sequenciadorAtivo: true,
        nomeDaMusica: "Memórias que Não Existem",
        intervaloDoPasso: 360
    });

    await expect(page.locator("#botao-torre-varredura")).toBeVisible();
    await expect(page.locator("#botao-torre-varredura")).toBeEnabled();
    await expect(page.locator("#botao-torre-varredura")).toContainText("(150)");

    const canvas = page.locator("#game");
    const caixa = await canvas.boundingBox();
    expect(caixa).not.toBeNull();
    await page.locator("#botao-torre-varredura").click();
    await page.mouse.click(
        caixa.x + caixa.width * 70 / 1200,
        caixa.y + caixa.height * 70 / 700
    );
    expect(await page.evaluate(() => eval(
        "torres.some(torre => torre.tipo === 'torreDeVarredura')"
    ))).toBe(true);
    await page.evaluate(() => eval("dinheiro = 500"));
    await page.mouse.move(
        caixa.x + caixa.width * 500 / 1200,
        caixa.y + caixa.height * 70 / 700
    );
    await expect(canvas).toHaveClass(/construcao-sob-cursor/);
    expect(await canvas.evaluate(elemento => getComputedStyle(elemento).cursor))
        .toContain("cursor-pixel-construcao.png");
    await page.mouse.move(
        caixa.x + caixa.width * 100 / 1200,
        caixa.y + caixa.height * 570 / 700
    );
    await expect(canvas).toHaveClass(/posicao-invalida-sob-cursor/);
    expect(await canvas.evaluate(elemento => getComputedStyle(elemento).cursor))
        .toContain("cursor-pixel-invalido.png");

    const estadoDaFase14 = await page.evaluate(() => eval(`(() => {
        definirJogoPausado(true);
        const agora = Date.now();
        const infiltrador = {
            tipo: "infiltradorCamuflado",
            x: 155,
            y: 70,
            indiceDoCaminho: 0,
            alvo: 1,
            velocidade: 1.85,
            vida: 180,
            vidaMaxima: 180,
            tamanho: 24,
            cor: "#79eee2",
            camuflado: true
        };
        const deteccao = {
            padrao: tipoDeDefesaPodeDetectarInimigo("padrao", infiltrador),
            varredura: tipoDeDefesaPodeDetectarInimigo("torreDeVarredura", infiltrador)
        };
        wave = 3;
        reescritaTemporalDaEraApagada = null;
        iniciarReescritaTemporalDaEraApagada(agora);
        const estadoNoAviso = reescritaTemporalDaEraApagada.estado;
        atualizarReescritaTemporalDaEraApagada(agora + 2200);
        const estadoAtivo = reescritaTemporalDaEraApagada.estado;
        inimigos = [infiltrador];
        desenharMapa();
        desenharTorres();
        desenharInimigos();
        desenharReescritaTemporalDaEraApagada(agora + 2200);
        return {
            faseSelecionada,
            tema: obterFaseAtual().tema,
            limite: obterLimiteDeTorres(),
            tipoDoBoss: obterTipoDeBossDaFase(),
            deteccao,
            revelado: inimigoEstaReveladoPelaVarredura(infiltrador),
            estadoNoAviso,
            estadoAtivo,
            caminhoIntacto: obterCaminhoAtual().length
        };
    })()`));
    expect(estadoDaFase14).toEqual({
        faseSelecionada: 14,
        tema: "eraApagada",
        limite: 15,
        tipoDoBoss: "curadorDoVazio",
        deteccao: { padrao: false, varredura: true },
        revelado: true,
        estadoNoAviso: "aviso",
        estadoAtivo: "ativa",
        caminhoIntacto: 12
    });
    await canvas.screenshot({ path: testInfo.outputPath("fase-14-era-apagada.png") });
    await page.setViewportSize({ width: 390, height: 844 });
    const caixaDoMapaNoCelular = await canvas.boundingBox();
    expect(caixaDoMapaNoCelular).not.toBeNull();
    expect(caixaDoMapaNoCelular.x).toBeGreaterThanOrEqual(0);
    expect(caixaDoMapaNoCelular.x + caixaDoMapaNoCelular.width).toBeLessThanOrEqual(390);
    await page.screenshot({ path: testInfo.outputPath("fase-14-celular.png") });
    await page.setViewportSize({ width: 1440, height: 1000 });

    const restauracaoDoBoss = await page.evaluate(() => eval(`(() => {
        inimigos = [];
        wave = 5;
        criarInimigo("curadorDoVazio");
        const curador = inimigos[0];
        const agora = Date.now();
        inimigosDerrotadosRecentementeNaEraApagada = [
            { tipo: "rascunhoVivo", indiceDoCaminho: 0, x: 100, y: 570, alvo: 1, eliminadoEm: agora - 900 },
            { tipo: "sombraCongelada", indiceDoCaminho: 0, x: 130, y: 570, alvo: 1, eliminadoEm: agora - 400 }
        ];
        aplicarDanoAoInimigo(curador, 3000, agora);
        return {
            restauracaoRealizada: curador.restauracaoDoVazioRealizada,
            restaurados: inimigos.filter(inimigo => inimigo.restauradoPeloCurador)
                .map(inimigo => ({ tipo: inimigo.tipo, vida: inimigo.vida }))
        };
    })()`));
    expect(restauracaoDoBoss).toEqual({
        restauracaoRealizada: true,
        restaurados: [
            { tipo: "rascunhoVivo", vida: 216 },
            { tipo: "sombraCongelada", vida: 405 }
        ]
    });

    await page.evaluate(() => eval(`
        partidaEncerrada = false;
        partidaVencida = false;
        finalizarPartidaComVitoria();
    `));
    await expect(cena).toHaveAttribute("data-tipo-carta", "cena-final-fase-14");
    await expect(cena).toHaveAttribute("data-etapa-cena", "gravacao");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("ainda usa meu rosto");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "assinatura");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("47 anos");
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(cena).toHaveAttribute("data-etapa-cena", "interrupcao");
    await expect(page.locator("#texto-cutscene-carta")).toContainText("É uma isca");
    await expect(cena.locator(".senhor-tempo-revelado")).toBeVisible();
    await expect(cena.locator(".carta-misteriosa")).toHaveCSS("opacity", "1");
    await cena.screenshot({ path: testInfo.outputPath("fase-14-final.png") });
    await page.locator("#botao-continuar-cutscene-carta").click();
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#botao-proxima-fase-resultado")).toBeDisabled();
    expect(await page.evaluate(() => localStorage.getItem(
        "tower-defense-2-progresso-fases-v2"
    ))).toBe("14");
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-cena-final-fase-14-v1"
    ))).toBe("true");
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-introducao-fase-14-v2"
    ))).toBe("true");
});

test("libera e recarrega o Pulso Temporal depois da Fase 8", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "7");
        localStorage.setItem("guardians-of-pixel-capitulo-2-desbloqueado-v1", "true");
        localStorage.setItem("guardians-of-pixel-maquina-tempo-v1", "true");
        localStorage.setItem("guardians-of-pixel-epoca-temporal-v1", "passado");
    });
    await page.goto("/");
    await page.evaluate(() => eval(`
        faseSelecionada = 8;
        jogoIniciado = true;
        partidaEncerrada = false;
        partidaVencida = false;
        menuPrincipal.classList.add("oculto");
        finalizarPartidaComVitoria();
    `));
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#descricao-resultado")).toContainText(
        "Pulso Temporal desbloqueado!"
    );
    await expect.poll(() => page.evaluate(() => (
        localStorage.getItem("tower-defense-2-progresso-fases-v2")
    ))).toBe("8");
    await page.locator("#botao-voltar-lobby-resultado").click();
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    const botaoDoPulso = page.locator("#botao-pulso-temporal");
    await expect(botaoDoPulso).toBeVisible();
    await expect(botaoDoPulso).toBeEnabled();
    await page.locator("#botao-menu-partida").click();
    await expect(botaoDoPulso).toBeDisabled();
    await page.locator("#botao-menu-partida").click();
    await expect(botaoDoPulso).toBeEnabled();
    await botaoDoPulso.click();
    await expect(botaoDoPulso).toBeDisabled();
    await expect(page.locator("#estado-pulso-temporal")).toContainText("Tempo alterado");

    const velocidades = await page.evaluate(() => eval(`(() => {
        const agora = Date.now();
        return {
            comum: obterVelocidadeAtualDoInimigo({ tipo: "normal", velocidade: 1.5 }, agora),
            boss: obterVelocidadeAtualDoInimigo({ tipo: "boss", velocidade: 1.1 }, agora),
            proximaWaveDoPulsoTemporal
        };
    })()`));
    expect(velocidades.comum).toBe(0);
    expect(velocidades.boss).toBeCloseTo(0.55, 6);
    expect(velocidades.proximaWaveDoPulsoTemporal).toBe(6);

    await page.evaluate(() => eval(`
        wave = 6;
        pulsoTemporalNormalExpiraEm = 0;
        pulsoTemporalBossExpiraEm = 0;
        atualizarPulsoTemporalNoControle();
    `));
    await expect(botaoDoPulso).toBeEnabled();
    await expect(page.locator("#estado-pulso-temporal")).toHaveText("Pronto para usar");
});

test("cola a figurinha de um inimigo derrotado durante uma partida real", async ({ page }) => {
    await page.goto("/");
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    const canvas = page.locator("#game");
    const caixa = await canvas.boundingBox();
    expect(caixa).not.toBeNull();
    const posicaoDaTorre = {
        x: caixa.width * 255 / 1200,
        y: caixa.height * 375 / 700
    };
    await canvas.click({ position: posicaoDaTorre });
    await canvas.click({ position: posicaoDaTorre });
    await expect(page.locator("#botao-vender")).toBeEnabled();

    await expect.poll(async () => {
        const valorSalvo = await page.evaluate(() =>
            localStorage.getItem("guardians-of-pixel-album-figurinhas-v1")
        );
        return JSON.parse(valorSalvo || "[]");
    }, { timeout: 30000 }).toContain("normal");

    await page.reload();
    await page.locator('button[onclick="mostrarAlbum()"]').click();
    await page.locator("#aba-album-inimigos").click();
    await expect(page.locator('[data-tipo-inimigo="normal"]')).toHaveCount(1);
    await expect(page.locator('[data-tipo-inimigo="elite"]')).toHaveCount(0);
});

test("confirma o bônus escolhido sem manter um painel sobre o mapa", async ({ page }) => {
    await page.goto("/");
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    await expect(page.locator(".posto-comando-lateral")).toHaveCount(0);
    await expect(page.locator("#lista-bonus-posto")).toHaveCount(0);
    await expect(
        page.locator(".controles-acoes > #botao-pulso-temporal")
    ).toHaveCount(1);

    await page.evaluate(() => eval("abrirPainelBonusPosBoss()"));
    const primeiraOpcao = page.locator("#opcoes-bonus-pos-boss button").first();
    const recompensa = await primeiraOpcao.evaluate((elemento) => ({
        nome: elemento.querySelector("strong").textContent,
        descricao: elemento.querySelector("small").textContent
    }));
    await primeiraOpcao.click();

    await expect(page.locator("#camada-bonus-pos-boss")).toBeHidden();
    const avisoDoBonus = await page.evaluate(() => eval("aviso"));
    expect(avisoDoBonus).toContain("Bônus escolhido:");
    expect(avisoDoBonus).toContain(recompensa.nome);
    expect(avisoDoBonus).toContain(recompensa.descricao);
});

test("amplia o mapa sem distorcer nem cobrir os controles", async ({ page }) => {
    await page.setViewportSize({ width: 1363, height: 756 });
    await page.goto("/");
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    const caixaMapa = await page.locator("#game").boundingBox();
    const caixaSeletor = await page.locator("#seletor-torres").boundingBox();
    const caixaControles = await page.locator(".controles").boundingBox();

    expect(caixaMapa).not.toBeNull();
    expect(caixaSeletor).not.toBeNull();
    expect(caixaControles).not.toBeNull();
    expect(caixaMapa.width).toBeGreaterThanOrEqual(1080);
    expect(caixaMapa.height).toBeGreaterThanOrEqual(630);
    expect(Math.abs(caixaMapa.width / caixaMapa.height - 12 / 7)).toBeLessThan(0.01);
    expect(caixaSeletor.height).toBeGreaterThanOrEqual(600);
    expect(caixaMapa.y + caixaMapa.height).toBeLessThan(caixaControles.y);
    expect(caixaSeletor.y + caixaSeletor.height).toBeLessThan(caixaControles.y);
    expect(caixaControles.y + caixaControles.height).toBeLessThanOrEqual(756 - 18);
});

test("inicia uma partida, constrói, seleciona uma torre e pausa", async ({ page }) => {
    await page.goto("/");
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);
    await expect(page.locator("#menu-principal")).toHaveClass(/oculto/);
    await expect(page.locator("#seletor-torres")).not.toHaveClass(/oculto/);

    const canvas = page.locator("#game");
    const caixa = await canvas.boundingBox();
    expect(caixa).not.toBeNull();
    const pontosInternos = [
        { x: 700, y: 350 },
        { x: 950, y: 650 },
        { x: 450, y: 350 }
    ];

    for (const ponto of pontosInternos) {
        const posicao = {
            x: caixa.width * ponto.x / 1200,
            y: caixa.height * ponto.y / 700
        };
        await canvas.click({ position: posicao });
        await canvas.click({ position: posicao });

        if (await page.locator("#botao-vender").isEnabled()) {
            break;
        }
    }

    await expect(page.locator("#botao-vender")).toBeEnabled();
    await page.locator("#botao-menu-partida").click();
    await expect(page.locator("#painel-menu-partida")).toBeVisible();
    await expect(page.locator("#painel-menu-partida")).toContainText("Jogo pausado");
});

test("restaura volumes, efeitos desligados e modo noturno", async ({ page }) => {
    await page.goto("/");
    await page.locator("#botao-configuracoes-lobby").click();
    await page.locator("#controle-volume-musica").fill("17");
    await page.locator("#controle-volume-efeitos").fill("63");
    await page.locator("#botao-efeitos-sonoros").click();
    await page.locator("#botao-modo-dia-noite").click();

    await expect.poll(async () => page.evaluate((chave) => (
        JSON.parse(localStorage.getItem(chave)).modoNoturno
    ), CHAVE_PREFERENCIAS)).toBe(true);

    await page.reload();
    await page.locator("#botao-configuracoes-lobby").click();
    await expect(page.locator("#controle-volume-musica")).toHaveValue("17");
    await expect(page.locator("#controle-volume-efeitos")).toHaveValue("63");
    await expect(page.locator("#botao-efeitos-sonoros")).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator("body")).toHaveClass(/modo-noturno/);
});

test("cancela e confirma uma compra sem descontar duas vezes", async ({ page }) => {
    await page.goto("/");
    await page.evaluate((chave) => localStorage.setItem(chave, "100"), CHAVE_FRAGMENTOS);
    await page.reload();
    await page.locator(".botao-lobby-loja").click();
    const precoDaIsca = await page.evaluate(() => obterPrecoAtualDoItemDaLoja("iscaBlindada"));
    const botaoDaIsca = page.locator('[data-id-item-loja="iscaBlindada"]');
    await botaoDaIsca.click();
    await expect(page.locator("#camada-confirmacao-compra-loja")).toBeVisible();
    await expect(page.locator("#descricao-confirmacao-compra-loja"))
        .toContainText(`${precoDaIsca} Fragmentos`);
    await page.locator("#botao-cancelar-compra-loja").click();
    await expect(page.locator("#camada-confirmacao-compra-loja")).toBeHidden();
    await expect.poll(async () => page.evaluate((chave) => localStorage.getItem(chave), CHAVE_FRAGMENTOS)).toBe("100");

    await botaoDaIsca.click();
    await page.locator("#botao-confirmar-compra-loja").click();
    await expect.poll(async () => page.evaluate((chave) => (
        localStorage.getItem(chave)
    ), CHAVE_FRAGMENTOS)).toBe(String(100 - precoDaIsca));
    await expect.poll(async () => page.evaluate((chave) => (
        JSON.parse(localStorage.getItem(chave))
    ), CHAVE_COMPRAS)).toContain("iscaBlindada");
    await expect(page.locator('[data-id-item-loja="iscaBlindada"]')).toBeDisabled();
});

test("exibe e aplica as ofertas semanais da Loja", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.evaluate(({ chaveCompras, chaveOferta, chaveFragmentos }) => {
        localStorage.setItem(chaveCompras, JSON.stringify(["iscaBlindada"]));
        localStorage.removeItem(chaveOferta);
        localStorage.setItem(chaveFragmentos, "1000");
    }, {
        chaveCompras: CHAVE_COMPRAS,
        chaveOferta: CHAVE_OFERTA_SEMANAL,
        chaveFragmentos: CHAVE_FRAGMENTOS
    });
    await page.reload();
    await page.locator(".botao-lobby-loja").click();
    await expect(page.locator(".loja-aba")).toHaveCount(4);
    await page.locator('button[onclick="selecionarCategoriaDaLoja(\'ofertas\')"]').click();

    const ofertasAntesDaCompra = await page.evaluate(() => (
        obterOfertasSemanaisDaLoja().map(oferta => ({
            idDoItem: oferta.idDoItem,
            percentual: oferta.percentualDeDesconto,
            precoOriginal: oferta.precoOriginal,
            precoComDesconto: oferta.precoComDesconto
        }))
    ));
    expect(ofertasAntesDaCompra).toHaveLength(3);
    expect(ofertasAntesDaCompra.some(oferta => oferta.idDoItem === "iscaBlindada"))
        .toBe(false);
    expect(ofertasAntesDaCompra.map(oferta => oferta.percentual).sort((a, b) => a - b))
        .toEqual([5, 10, 15]);
    await expect(page.locator(".loja-grade .loja-item")).toHaveCount(3);

    const oferta = ofertasAntesDaCompra[0];
    const botaoDoItem = page.locator(`[data-id-item-loja="${oferta.idDoItem}"]`);
    const cartaoDoItem = botaoDoItem.locator("xpath=ancestor::article");
    await expect(cartaoDoItem).toHaveClass(/loja-item-em-oferta/);
    await expect(cartaoDoItem.locator(".loja-selo-desconto"))
        .toHaveText(`-${oferta.percentual}%`);
    await expect(cartaoDoItem.locator(".loja-preco del"))
        .toHaveText(`${oferta.precoOriginal}◆`);
    await expect(cartaoDoItem.locator(".loja-preco strong"))
        .toHaveText(`${oferta.precoComDesconto}◆`);
    await expect(botaoDoItem).toContainText(`Comprar por ${oferta.precoComDesconto}◆`);

    await page.locator("#conteudo-menu").screenshot({
        path: testInfo.outputPath("oferta-semanal-loja.png")
    });
    await page.setViewportSize({ width: 390, height: 844 });
    const posicoesDasOfertas = await page.locator(".loja-grade .loja-item")
        .evaluateAll(elementos => elementos.map(elemento => {
            const caixa = elemento.getBoundingClientRect();
            return { x: caixa.x, y: caixa.y, width: caixa.width };
        }));
    expect(posicoesDasOfertas[1].y).toBeGreaterThan(posicoesDasOfertas[0].y);
    expect(posicoesDasOfertas[2].y).toBeGreaterThan(posicoesDasOfertas[1].y);
    await page.screenshot({
        path: testInfo.outputPath("oferta-semanal-loja-mobile.png")
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await botaoDoItem.click();
    await expect(page.locator("#descricao-confirmacao-compra-loja"))
        .toContainText(`${oferta.precoComDesconto} Fragmentos`);
    await page.locator("#botao-confirmar-compra-loja").click();
    await expect.poll(() => page.evaluate((chave) => (
        localStorage.getItem(chave)
    ), CHAVE_FRAGMENTOS)).toBe(String(1000 - oferta.precoComDesconto));
    await expect(botaoDoItem).toBeDisabled();

    const idsDepoisDaCompra = await page.evaluate(() => (
        obterOfertasSemanaisDaLoja().map(ofertaAtual => ofertaAtual.idDoItem)
    ));
    expect(idsDepoisDaCompra).toEqual(
        ofertasAntesDaCompra.map(ofertaAtual => ofertaAtual.idDoItem)
    );
    await expect.poll(() => page.evaluate((chave) => (
        JSON.parse(localStorage.getItem(chave)).itens.length
    ), CHAVE_OFERTA_SEMANAL)).toBe(3);
});

test("preserva o save principal e inicia outro espaço do zero", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        const marcador = "guardians-of-pixel-e2e-salvos-preparados";
        if (sessionStorage.getItem(marcador) === "true") {
            return;
        }

        localStorage.removeItem("guardians-of-pixel-salvos-v1");
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "13");
        localStorage.setItem("guardians-of-pixel-correcao-progresso-fases-13-14-v1", "true");
        localStorage.setItem("guardians-of-pixel-fragmentos-v2", "87");
        localStorage.setItem(
            "guardians-of-pixel-compras-v2",
            JSON.stringify(["torreDeRaios", "miraCalibrada"])
        );
        localStorage.setItem(
            "guardians-of-pixel-progressao-nivel-v1",
            JSON.stringify({
                experienciaTotal: 10400,
                recompensasConcedidas: [
                    "skinVanguardaEsmeralda",
                    "torreRaiosPorNivel",
                    "miraCalibradaPorNivel"
                ],
                historicoImportado: true
            })
        );
        localStorage.setItem(
            "guardians-of-pixel-preferencias-v1",
            JSON.stringify({
                volumeMusica: 0.2,
                musicaSilenciada: false,
                volumeEfeitos: 0.6,
                efeitosAtivos: true,
                modoNoturno: true
            })
        );
        sessionStorage.setItem(marcador, "true");
    });
    await page.goto("/");

    await page.locator(".botao-lobby-salvos").click();
    const paginaDeSalvos = page.locator('#conteudo-menu[data-tela="salvos"]');
    const save1 = paginaDeSalvos.locator('[data-numero-salvo="1"]');
    const save2 = paginaDeSalvos.locator('[data-numero-salvo="2"]');
    const save3 = paginaDeSalvos.locator('[data-numero-salvo="3"]');

    await expect(paginaDeSalvos).toBeVisible();
    await expect(paginaDeSalvos.locator(".salvo-cartao")).toHaveCount(3);
    await expect(save1).toHaveClass(/salvo-cartao-ativo/);
    await expect(save1).toContainText("Nível 14");
    await expect(save1).toContainText("Fase 14 disponível");
    await expect(save1).toContainText("87 Fragmentos");
    await expect(save1).toContainText("2 itens da Loja");
    await expect(save1.locator(".salvo-acao")).toBeDisabled();
    await expect(save2).toContainText("VAZIO");
    await expect(save3).toContainText("VAZIO");
    await paginaDeSalvos.screenshot({
        path: testInfo.outputPath("salvos-desktop.png")
    });

    await page.setViewportSize({ width: 390, height: 844 });
    expect(await paginaDeSalvos.evaluate(elemento => (
        elemento.scrollWidth <= elemento.clientWidth
    ))).toBe(true);
    await expect(save1).toBeVisible();
    await paginaDeSalvos.screenshot({
        path: testInfo.outputPath("salvos-celular.png")
    });

    await save2.locator(".salvo-acao").click();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.locator(".botao-lobby-salvos")).toBeVisible({ timeout: 7000 });
    const estadoDoSaveNovo = await page.evaluate(() => ({
        fase: Number(localStorage.getItem("tower-defense-2-progresso-fases-v2") || 0),
        fragmentos: Number(localStorage.getItem("guardians-of-pixel-fragmentos-v2") || 0),
        nivel: eval("obterDadosDoNivel().nivel"),
        preferencias: JSON.parse(localStorage.getItem("guardians-of-pixel-preferencias-v1")),
        sistema: JSON.parse(localStorage.getItem("guardians-of-pixel-salvos-v1"))
    }));
    expect(estadoDoSaveNovo.fase).toBe(0);
    expect(estadoDoSaveNovo.fragmentos).toBe(0);
    expect(estadoDoSaveNovo.nivel).toBe(1);
    expect(estadoDoSaveNovo.preferencias.modoNoturno).toBe(true);
    expect(estadoDoSaveNovo.sistema.indiceAtivo).toBe(1);
    expect(estadoDoSaveNovo.sistema.espacos[0].dados["tower-defense-2-progresso-fases-v2"])
        .toBe("13");

    await page.locator(".botao-lobby-salvos").click();
    const paginaDoSaveNovo = page.locator('#conteudo-menu[data-tela="salvos"]');
    await expect(paginaDoSaveNovo.locator('[data-numero-salvo="2"]'))
        .toHaveClass(/salvo-cartao-ativo/);
    await expect(paginaDoSaveNovo.locator('[data-numero-salvo="2"]'))
        .toContainText("Nível 1");
    await expect(paginaDoSaveNovo.locator('[data-numero-salvo="2"]'))
        .toContainText("Fase 1 disponível");
    await paginaDoSaveNovo.locator('[data-numero-salvo="1"] .salvo-acao').click();

    await expect(page.locator(".botao-lobby-salvos")).toBeVisible({ timeout: 7000 });
    expect(await page.evaluate(() => ({
        fase: localStorage.getItem("tower-defense-2-progresso-fases-v2"),
        fragmentos: localStorage.getItem("guardians-of-pixel-fragmentos-v2"),
        nivel: eval("obterDadosDoNivel().nivel")
    }))).toEqual({ fase: "13", fragmentos: "87", nivel: 14 });
});

test("acumula XP e libera recompensas de nível", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
        localStorage.removeItem("guardians-of-pixel-progressao-nivel-v1");
        localStorage.removeItem("guardians-of-pixel-recompensas-missoes-v1");
        localStorage.removeItem("guardians-of-pixel-compras-v2");
        localStorage.removeItem("guardians-of-pixel-estatisticas-conquistas-v1");
        localStorage.removeItem("guardians-of-pixel-pacote-apoiador-v1");
    });
    await page.goto("/");

    const resumoDoNivel = page.locator("#progresso-nivel-lobby");
    await expect(resumoDoNivel).toBeVisible();
    await expect(page.locator("#nivel-jogador-menu")).toHaveText("1");
    await expect(page.locator("#experiencia-jogador-menu")).toHaveText("0/200 XP");
    await resumoDoNivel.click();

    const paginaDeNiveis = page.locator('#conteudo-menu[data-tela="niveis"]');
    await expect(paginaDeNiveis).toBeVisible();
    await expect(paginaDeNiveis).toContainText("Nível de experiência");
    await expect(paginaDeNiveis.locator(".nivel-recompensa")).toHaveCount(3);
    await expect(paginaDeNiveis).toContainText("Vanguarda Esmeralda");
    await expect(paginaDeNiveis).toContainText("Torre de Raios");
    await expect(paginaDeNiveis).toContainText("Mira Calibrada");

    await page.evaluate(() => eval("registrarExperiencia(199)"));
    await expect(paginaDeNiveis).toContainText("199/200 XP");
    await page.evaluate(() => eval("registrarExperiencia(1)"));
    await expect(paginaDeNiveis.locator(".nivel-progresso-selo strong")).toHaveText("2");
    const recompensaDaSkin = paginaDeNiveis.locator(".nivel-recompensa").filter({
        hasText: "Vanguarda Esmeralda"
    });
    await expect(recompensaDaSkin).toHaveClass(/nivel-recompensa-desbloqueada/);
    await recompensaDaSkin.locator(".nivel-recompensa-acao").click();

    expect(await page.evaluate(() => JSON.parse(localStorage.getItem(
        "guardians-of-pixel-recompensas-missoes-v1"
    )))).toMatchObject({
        skinsDesbloqueadas: ["vanguardaEsmeralda"],
        skinTorrePadraoEquipada: "vanguardaEsmeralda"
    });

    await page.evaluate(() => eval("registrarExperiencia(700)"));
    await expect(paginaDeNiveis.locator(".nivel-progresso-selo strong")).toHaveText("4");
    await page.evaluate(() => eval("registrarExperiencia(1100)"));
    await expect(paginaDeNiveis.locator(".nivel-progresso-selo strong")).toHaveText("6");

    const estadoSalvo = await page.evaluate(() => ({
        progresso: JSON.parse(localStorage.getItem("guardians-of-pixel-progressao-nivel-v1")),
        compras: JSON.parse(localStorage.getItem("guardians-of-pixel-compras-v2"))
    }));
    expect(estadoSalvo.progresso.experienciaTotal).toBe(2000);
    expect(estadoSalvo.progresso.recompensasConcedidas).toEqual([
        "skinVanguardaEsmeralda",
        "torreRaiosPorNivel",
        "miraCalibradaPorNivel"
    ]);
    expect(estadoSalvo.compras).toEqual(expect.arrayContaining([
        "torreDeRaios",
        "miraCalibrada"
    ]));

    await paginaDeNiveis.screenshot({
        path: testInfo.outputPath("nivel-experiencia-desktop.png")
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(paginaDeNiveis.locator(".nivel-recompensa")).toHaveCount(3);
    expect(await paginaDeNiveis.evaluate((elemento) => (
        elemento.scrollWidth <= elemento.clientWidth
    ))).toBe(true);
    await paginaDeNiveis.screenshot({
        path: testInfo.outputPath("nivel-experiencia-celular.png")
    });
});

test("cria, compartilha, importa, avalia e joga um mapa do Editor", async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        localStorage.setItem("guardians-of-pixel-tutorial-concluido-v1", "true");
        localStorage.removeItem("guardians-of-pixel-editor-mapas-v1");
        localStorage.removeItem("guardians-of-pixel-editor-comunidade-v1");
        localStorage.removeItem("guardians-of-pixel-editor-avaliacoes-v1");
        localStorage.removeItem("guardians-of-pixel-progressao-nivel-v1");
        localStorage.removeItem("guardians-of-pixel-estatisticas-conquistas-v1");
    });
    await page.goto("/");

    const botaoEditor = page.locator(".botao-lobby-editor");
    await expect(botaoEditor).toBeDisabled();
    await expect(page.locator("#estado-editor-menu")).toHaveText("Requer nível 5");
    await botaoEditor.screenshot({
        path: testInfo.outputPath("editor-bloqueado-nivel-1.png")
    });
    await page.evaluate(() => eval("mostrarEditorDeFases()"));
    await expect(page.locator('#conteudo-menu[data-tela="editor"]')).toHaveCount(0);

    await page.evaluate(() => eval("registrarExperiencia(1400)"));
    await expect(botaoEditor).toBeEnabled();
    await expect(page.locator("#estado-editor-menu")).toHaveText("Crie sua própria fase");
    await botaoEditor.click();
    const paginaEditor = page.locator('#conteudo-menu[data-tela="editor"]');
    await expect(paginaEditor).toBeVisible();
    await expect(paginaEditor).toContainText("Editor de fases");
    await expect(paginaEditor).toContainText("0 de 2 espaços usados");
    await paginaEditor.getByRole("button", { name: "Criar novo mapa" }).click();

    await page.locator("#nome-mapa-editor").fill("Fortaleza Congelada");
    await page.locator("#criador-mapa-editor").fill("Lequ48");
    await paginaEditor.locator("textarea").first().fill("Uma trilha gelada criada no editor simples.");
    await paginaEditor.getByLabel("Tema visual").selectOption("artico");
    await paginaEditor.getByLabel("Formato do caminho").selectOption("serpente");
    await paginaEditor.getByLabel("Decorações").selectOption("1");
    await paginaEditor.getByLabel("Créditos iniciais").fill("700");
    await paginaEditor.getByLabel("Limite de torres").fill("9");
    await paginaEditor.getByRole("button", { name: "+ Inimigo nesta wave" }).first().click();
    const primeiraWave = paginaEditor.locator(".editor-wave-cartao").first();
    await primeiraWave.getByLabel("Tipo de inimigo").nth(1).selectOption("boss");
    await primeiraWave.getByLabel("Quantidade").nth(1).fill("2");
    await paginaEditor.screenshot({
        path: testInfo.outputPath("editor-formulario-desktop.png")
    });
    await paginaEditor.getByRole("button", { name: "Salvar mapa" }).click();

    const mapaSalvo = await page.evaluate(() => JSON.parse(
        localStorage.getItem("guardians-of-pixel-editor-mapas-v1")
    )[0]);
    expect(mapaSalvo).toMatchObject({
        nome: "Fortaleza Congelada",
        criador: "Lequ48",
        tema: "artico",
        idDoCaminho: "serpente",
        nivelDeDecoracoes: 1,
        creditosIniciais: 700,
        limiteDeTorres: 9
    });
    expect(mapaSalvo.waves[0].grupos).toEqual([
        { tipo: "normal", quantidade: 5 },
        { tipo: "boss", quantidade: 2 }
    ]);

    await paginaEditor.getByRole("button", { name: "Publicar e copiar código" }).click();
    const campoDoCodigo = page.locator("#codigo-compartilhamento-editor");
    await expect(campoDoCodigo).toBeVisible();
    const codigoDoMapa = await campoDoCodigo.inputValue();
    expect(codigoDoMapa).toMatch(/^GP-MAPA-1\./);

    await paginaEditor.getByRole("button", { name: "Comunidade" }).click();
    await page.locator("#codigo-importacao-editor").fill(codigoDoMapa);
    await paginaEditor.getByRole("button", { name: "Importar mapa" }).click();
    const cartaoImportado = paginaEditor.locator(".editor-mapa-cartao");
    await expect(cartaoImportado).toHaveCount(1);
    await expect(cartaoImportado).toContainText("Fortaleza Congelada");
    await expect(cartaoImportado).toContainText("Criado por Lequ48");
    await cartaoImportado.getByLabel("Sua avaliação").selectOption("4");
    await cartaoImportado.getByLabel("Comentário opcional").fill("Caminho bonito e desafio justo.");
    await cartaoImportado.getByRole("button", { name: "Salvar avaliação" }).click();
    await expect(paginaEditor).toContainText("Avaliação salva!");
    expect(await page.evaluate(() => Object.values(JSON.parse(
        localStorage.getItem("guardians-of-pixel-editor-avaliacoes-v1")
    ))[0])).toEqual({ nota: 4, comentario: "Caminho bonito e desafio justo." });

    await page.setViewportSize({ width: 390, height: 844 });
    await paginaEditor.screenshot({
        path: testInfo.outputPath("editor-comunidade-celular.png")
    });
    expect(await paginaEditor.evaluate(elemento => elemento.scrollWidth <= elemento.clientWidth)).toBe(true);
    await page.setViewportSize({ width: 1440, height: 1000 });

    const progressoAntes = await page.evaluate(() => ({
        xp: localStorage.getItem("guardians-of-pixel-progressao-nivel-v1"),
        campanha: localStorage.getItem("tower-defense-2-progresso-fases-v2"),
        estatisticas: localStorage.getItem("guardians-of-pixel-estatisticas-conquistas-v1"),
        fragmentos: localStorage.getItem("guardians-of-pixel-fragmentos-v2")
    }));
    await cartaoImportado.getByRole("button", { name: "Jogar" }).click();
    const selecaoDeDefesas = page.locator('#conteudo-menu[data-tela="selecaoDefesas"]');
    await expect(selecaoDeDefesas).toContainText("Defesas para Fortaleza Congelada");
    await selecaoDeDefesas.locator(".botao-confirmar-selecao-defesas").click();
    await expect(page.locator("#game")).toBeVisible();
    expect(await page.evaluate(() => ({
        nome: mapaPersonalizadoAtivo.nome,
        fase: faseSelecionada,
        wave,
        creditos: dinheiro,
        limite: obterLimiteDeTorres(),
        totalDeWaves: obterUltimaWaveDaFase()
    }))).toEqual({
        nome: "Fortaleza Congelada",
        fase: 101,
        wave: 1,
        creditos: 700,
        limite: 9,
        totalDeWaves: 3
    });

    await page.evaluate(() => finalizarPartidaComVitoria());
    await expect(page.locator("#camada-resultado")).toBeVisible();
    await expect(page.locator("#selo-resultado")).toContainText("MAPA PERSONALIZADO");
    const progressoDepois = await page.evaluate(() => ({
        xp: localStorage.getItem("guardians-of-pixel-progressao-nivel-v1"),
        campanha: localStorage.getItem("tower-defense-2-progresso-fases-v2"),
        estatisticas: localStorage.getItem("guardians-of-pixel-estatisticas-conquistas-v1"),
        fragmentos: localStorage.getItem("guardians-of-pixel-fragmentos-v2")
    }));
    expect(progressoDepois).toEqual(progressoAntes);
    await page.locator("#botao-voltar-lobby-resultado").click();
    await expect(paginaEditor).toBeVisible();
    await expect(paginaEditor).toContainText("Comunidade");
    await paginaEditor.getByRole("button", { name: "Meus mapas" }).click();
    await paginaEditor.getByRole("button", { name: "Excluir", exact: true }).click();
    await expect(paginaEditor.getByRole("button", { name: "Confirmar exclusão" })).toBeVisible();
    await paginaEditor.getByRole("button", { name: "Confirmar exclusão" }).click();
    await expect(paginaEditor).toContainText("0 de 2 espaços usados");
    await expect(paginaEditor.getByRole("button", { name: "Criar novo mapa" })).toBeEnabled();
    expect(await page.evaluate(() => JSON.parse(
        localStorage.getItem("guardians-of-pixel-editor-mapas-v1")
    ))).toEqual([]);
});


test("mostra a descrição própria de cada nova torre na Loja", async ({ page }) => {
    await page.goto("/");
    await page.locator(".botao-lobby-loja").click();

    const descricoesEsperadas = {
        torrePerfuradora: "Perfura todos os inimigos",
        torreMarcadora: "Marca o alvo por 3.2 segundos",
        torreDrones: "Lança 2 drones por ataque",
        torreCorrentes: "A corrente alcança um segundo inimigo",
        torreSucata: "Coleta até 5 peças",
        canhaoPrismatico: "Alterna disparos"
    };

    for (const [tipo, trecho] of Object.entries(descricoesEsperadas)) {
        const cartao = page.locator(`[data-id-item-loja="${tipo}"]`)
            .locator("xpath=ancestor::article");
        await expect(cartao).toContainText(trecho);
        await expect(cartao).not.toContainText("Atrai Sabotadores");
        await expect(cartao).not.toContainText("undefined");
    }

    const cartaoDaIsca = page.locator('[data-id-item-loja="iscaBlindada"]')
        .locator("xpath=ancestor::article");
    await expect(cartaoDaIsca).toContainText("Atrai Sabotadores");
    await expect(cartaoDaIsca).toContainText("Aguenta 10 tiros");
});

test("integra o novo arsenal às categorias, ao Álbum e às melhorias permanentes", async ({ page }) => {
    await page.addInitScript((chaveCompras) => {
        localStorage.setItem(chaveCompras, JSON.stringify([
            "minaCorrosiva",
            "bombaDeFragmentacao",
            "miraCalibrada",
            "sensoresDeLongoAlcance",
            "contratoDeRecuperacao"
        ]));
    }, CHAVE_COMPRAS);
    await page.goto("/");

    await page.locator(".botao-lobby-loja").click();
    await page.locator('button[onclick="selecionarCategoriaDaLoja(\'minas\')"]').click();
    await expect(page.locator(".loja-item")).toHaveCount(6);

    const cartaoDaMina = page.locator('[data-id-item-loja="minaCorrosiva"]')
        .locator("xpath=ancestor::article");
    await expect(cartaoDaMina).toContainText("receberem 18% mais dano por 4.5 segundos");
    await expect(cartaoDaMina).toContainText("Custa $150 na partida");
    await expect(page.locator('[data-id-item-loja="minaCorrosiva"]')).toBeDisabled();

    const cartaoDaBomba = page.locator('[data-id-item-loja="bombaDeFragmentacao"]')
        .locator("xpath=ancestor::article");
    await expect(cartaoDaBomba).toContainText("lança 4 fragmentos explosivos");
    await expect(cartaoDaBomba).toContainText("Custa $225 na partida");
    await expect(page.locator('[data-id-item-loja="bombaDeFragmentacao"]')).toBeDisabled();

    await page.locator('button[onclick="selecionarCategoriaDaLoja(\'melhorias\')"]').click();
    await expect(page.locator(".loja-item")).toHaveCount(6);
    await expect(page.locator('[data-id-item-loja="miraCalibrada"]')
        .locator("xpath=ancestor::article")).toContainText("+5% de dano");
    await expect(page.locator('[data-id-item-loja="sensoresDeLongoAlcance"]')
        .locator("xpath=ancestor::article")).toContainText("+5% de alcance");
    await expect(page.locator('[data-id-item-loja="contratoDeRecuperacao"]')
        .locator("xpath=ancestor::article")).toContainText("devolve 70%");
    await expect(page.locator('[data-id-item-loja="contratoDeRecuperacao"]')
        .locator("xpath=ancestor::article")).toContainText("90◆");

    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator('button[onclick="mostrarAlbum()"]')
        .click();
    await page.locator("#aba-album-minas").click();
    await expect(page.locator(".album-cartao-torre")).toHaveCount(2);
    await expect(page.locator(".album-cartao-torre").filter({ hasText: "Mina Corrosiva" }))
        .toContainText("Corrosão: +18% de dano por 4.5s");
    await expect(page.locator(".album-cartao-torre").filter({ hasText: "Bomba de Fragmentação" }))
        .toContainText("Fragmentos: 4 de 45 de dano em 42 px");
    await page.locator("#conteudo-menu .botao-fechar").click();

    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);
    const efeitosDasMelhorias = await page.evaluate(() => eval(`(() => {
        const torre = { tipo: "padrao", nivel: 0, valorInvestido: 100 };
        atualizarAtributosDaTorreComBonus(torre);
        return {
            dano: torre.dano,
            alcance: torre.alcance,
            venda: calcularValorDeVenda(torre)
        };
    })()`));
    expect(efeitosDasMelhorias).toEqual({ dano: 11, alcance: 158, venda: 70 });
});

test("compra dois Lança-Chamas e incendeia um inimigo em uma partida real", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.evaluate((chave) => localStorage.setItem(chave, "100"), CHAVE_FRAGMENTOS);
    await page.reload();
    await page.locator(".botao-lobby-loja").click();

    const botaoLancaChamas = page.locator('[data-id-item-loja="lancaChamas"]');
    const cartaoLancaChamas = botaoLancaChamas.locator("xpath=ancestor::article");
    const precoDoLancaChamas = await page.evaluate(() => (
        obterPrecoAtualDoItemDaLoja("lancaChamas")
    ));
    await expect(cartaoLancaChamas).toContainText("100◆");
    await expect(cartaoLancaChamas).toContainText("5 de dano por segundo durante 10 segundos");
    await expect(cartaoLancaChamas).toContainText("Custa $650 na partida");
    await expect(cartaoLancaChamas).toContainText("máximo de 2 por partida");

    await botaoLancaChamas.click();
    await page.locator("#botao-confirmar-compra-loja").click();
    await expect.poll(async () => page.evaluate((chave) => (
        JSON.parse(localStorage.getItem(chave))
    ), CHAVE_COMPRAS)).toContain("lancaChamas");
    await expect.poll(async () => page.evaluate((chave) => (
        localStorage.getItem(chave)
    ), CHAVE_FRAGMENTOS)).toBe(String(100 - precoDoLancaChamas));

    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator('button[onclick="mostrarAlbum()"]')
        .click();
    const figurinhaDoLancaChamas = page.locator(".album-cartao-torre")
        .filter({ hasText: "Lança-Chamas" });
    await expect(figurinhaDoLancaChamas.locator("strong")).toHaveText("Lança-Chamas");
    await expect(figurinhaDoLancaChamas).not.toContainText("nível 0");
    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await page.locator('[data-tipo-defesa="lancaChamas"]').click();
    await confirmarEquipeAtual(page);
    const botaoDeConstrucao = page.locator("#botao-lanca-chamas");
    await expect(botaoDeConstrucao).toBeEnabled();
    await expect(botaoDeConstrucao).toContainText("650");
    await page.evaluate(() => eval("dinheiro = 2000"));
    await botaoDeConstrucao.click();

    const canvas = page.locator("#game");
    const caixa = await canvas.boundingBox();
    expect(caixa).not.toBeNull();
    const converterPosicao = ({ x, y }) => ({
        x: caixa.width * x / 1200,
        y: caixa.height * y / 700
    });
    await canvas.click({ position: converterPosicao({ x: 100, y: 440 }) });
    await canvas.click({ position: converterPosicao({ x: 260, y: 430 }) });
    await canvas.click({ position: converterPosicao({ x: 470, y: 430 }) });

    await expect.poll(() => page.evaluate(() => (
        eval("torres.filter((torre) => torre.tipo === 'lancaChamas').length")
    ))).toBe(2);
    await canvas.click({ position: converterPosicao({ x: 100, y: 440 }) });
    await expect(page.locator(".controles-contexto small")).toContainText("Lança-Chamas");
    await expect(page.locator(".controles-contexto small")).not.toContainText("Nível 0");
    await expect.poll(() => page.evaluate(() => eval("aviso")))
        .toBe("Lança-Chamas selecionado.");
    await expect.poll(() => page.evaluate(() => (
        eval("inimigos.some((inimigo) => inimigo.queimaduraExpiraEm > Date.now())")
    )), { timeout: 10000 }).toBe(true);

    await testInfo.attach("lanca-chamas-em-combate", {
        body: await page.screenshot({ type: "png" }),
        contentType: "image/png"
    });
});

test("compra, constrói e melhora o Gerador de Créditos", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.evaluate((chave) => localStorage.setItem(chave, "70"), CHAVE_FRAGMENTOS);
    await page.reload();
    await page.locator(".botao-lobby-loja").click();

    const botaoGerador = page.locator('[data-id-item-loja="geradorDeCreditos"]');
    const cartaoGerador = botaoGerador.locator("xpath=ancestor::article");
    await expect(cartaoGerador).toContainText("70◆");
    await expect(cartaoGerador).toContainText("100 créditos");
    await expect(cartaoGerador).toContainText("wave inteira");
    await expect(cartaoGerador).toContainText("Custa $300 na partida");
    await expect(cartaoGerador).toContainText("máximo de 1 por partida");

    await botaoGerador.click();
    await page.locator("#botao-confirmar-compra-loja").click();
    await expect.poll(() => page.evaluate((chave) => (
        JSON.parse(localStorage.getItem(chave))
    ), CHAVE_COMPRAS)).toContain("geradorDeCreditos");

    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator('button[onclick="mostrarAlbum()"]')
        .click();
    const figurinhasDoGerador = page
        .locator('.miniatura-torre-album[data-tipo-torre="geradorDeCreditos"]')
        .locator("xpath=ancestor::button");
    await expect(figurinhasDoGerador).toHaveCount(4);
    await expect(figurinhasDoGerador.nth(0)).toContainText("100 por wave");
    await expect(figurinhasDoGerador.nth(3)).toContainText("325 por wave");

    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await page.locator('[data-tipo-defesa="geradorDeCreditos"]').click();
    await confirmarEquipeAtual(page);

    await page.evaluate(() => eval("dinheiro = 3000"));
    const botaoDeConstrucao = page.locator("#botao-gerador-creditos");
    await expect(botaoDeConstrucao).toBeEnabled();
    await expect(botaoDeConstrucao).toContainText("300");
    await botaoDeConstrucao.click();

    const canvas = page.locator("#game");
    const caixa = await canvas.boundingBox();
    expect(caixa).not.toBeNull();
    const converterPosicao = ({ x, y }) => ({
        x: caixa.width * x / 1200,
        y: caixa.height * y / 700
    });
    await canvas.click({ position: converterPosicao({ x: 100, y: 440 }) });
    await canvas.click({ position: converterPosicao({ x: 260, y: 430 }) });

    await expect.poll(() => page.evaluate(() => (
        eval("torres.filter((torre) => torre.tipo === 'geradorDeCreditos').length")
    ))).toBe(1);
    await page.evaluate(() => eval("jogoPausado = true"));
    await canvas.click({ position: converterPosicao({ x: 100, y: 440 }) });
    await expect(page.locator(".controles-contexto small"))
        .toContainText("Nível 0 · Produção 100 créditos por wave");
    await expect(page.locator("#botao-modo-alvo")).toContainText("Gerador não atira");
    await expect(page.locator("#botao-melhorar")).toContainText("350");

    const primeiroPagamento = await page.evaluate(() => eval(`(() => {
        const gerador = torres.find((torre) => torre.tipo === "geradorDeCreditos");
        const waveElegivel = gerador.primeiraWaveParaGerarCreditos;
        return {
            antes: concederCreditosDosGeradoresAposWave(waveElegivel - 1),
            pago: concederCreditosDosGeradoresAposWave(waveElegivel),
            repetido: concederCreditosDosGeradoresAposWave(waveElegivel),
            avisos: avisosDeCreditosGerados.length,
            proximaWave: waveElegivel + 1
        };
    })()`));
    expect(primeiroPagamento).toMatchObject({
        antes: 0,
        pago: 100,
        repetido: 0,
        avisos: 1
    });
    expect(primeiroPagamento.proximaWave).toBeGreaterThan(1);

    await page.locator("#botao-melhorar").click();
    await expect(page.locator(".controles-contexto small"))
        .toContainText("Nível 1 · Produção 150 créditos por wave");
    const pagamentoMelhorado = await page.evaluate((waveDoPagamento) => eval(
        `concederCreditosDosGeradoresAposWave(${waveDoPagamento})`
    ), primeiroPagamento.proximaWave);
    expect(pagamentoMelhorado).toBe(150);

    await testInfo.attach("gerador-de-creditos-em-partida", {
        body: await page.screenshot({ type: "png" }),
        contentType: "image/png"
    });
});

test("desbloqueia duas Torres Sísmicas e soma seus empurrões pelo caminho", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.evaluate(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "6");
    });
    await page.reload();

    await page.locator('button[onclick="mostrarAlbum()"]')
        .click();
    const figurinhasSismicas = page
        .locator('.miniatura-torre-album[data-tipo-torre="torreSismica"]')
        .locator("xpath=ancestor::button");
    await expect(figurinhasSismicas).toHaveCount(4);
    await expect(figurinhasSismicas.nth(0)).toContainText("Carga: 3 inimigos");
    await expect(figurinhasSismicas.nth(3)).toContainText("Segundo impacto após 0,7s");

    await page.locator("#conteudo-menu .botao-fechar").click();
    await page.locator(".botao-lobby-jogar").click();
    await page.locator('[data-tipo-defesa="torreSismica"]').click();
    await confirmarEquipeAtual(page);

    await page.evaluate(() => eval("dinheiro = 3000"));
    const botaoSismico = page.locator("#botao-torre-sismica");
    await expect(botaoSismico).toBeEnabled();
    await expect(botaoSismico).toContainText("600");
    await botaoSismico.click();

    const canvas = page.locator("#game");
    const caixa = await canvas.boundingBox();
    expect(caixa).not.toBeNull();
    const posicao = {
        x: caixa.width * 470 / 1200,
        y: caixa.height * 430 / 700
    };
    await canvas.click({ position: posicao });
    await expect.poll(() => page.evaluate(() => (
        eval("torres.filter((torre) => torre.tipo === 'torreSismica').length")
    ))).toBe(1);

    await botaoSismico.click();
    const segundaPosicaoInterna = await page.evaluate(() => eval(`(() => {
        const primeiraTorre = torres.find((torre) => torre.tipo === "torreSismica");
        for (let y = 40; y <= 660; y += 10) {
            for (let x = 40; x <= 1160; x += 10) {
                const distancia = Math.hypot(primeiraTorre.x - x, primeiraTorre.y - y);
                const longeDoFliperama = !fliperamaNoMapa || Math.hypot(
                    fliperamaNoMapa.x - x,
                    fliperamaNoMapa.y - y
                ) >= CONFIG.fliperama.distanciaMinimaDasTorres;
                if (
                    distancia >= 80
                    && distancia <= 220
                    && !estaNoCaminho(x, y)
                    && !estaPertoDeOutraTorreOuBomba(x, y)
                    && longeDoFliperama
                ) {
                    return { x, y };
                }
            }
        }
        return null;
    })()`));
    expect(segundaPosicaoInterna).not.toBeNull();
    const segundaPosicao = {
        x: caixa.width * segundaPosicaoInterna.x / 1200,
        y: caixa.height * segundaPosicaoInterna.y / 700
    };
    await canvas.click({ position: segundaPosicao });
    await expect.poll(() => page.evaluate(() => (
        eval("torres.filter((torre) => torre.tipo === 'torreSismica').length")
    ))).toBe(2);

    await page.evaluate(() => eval("jogoPausado = true"));
    await canvas.click({ position: posicao });
    await expect(page.locator(".controles-contexto small"))
        .toContainText("Nível 0 · Carga 0/3 · Empurra 110 px");
    await expect(page.locator("#botao-modo-alvo")).toContainText("Impacto automático");

    const resultadoDoImpacto = await page.evaluate(() => eval(`(() => {
        inimigos = [];
        inimigosParaCriar = 0;
        const torresSismicas = torres.filter((item) => item.tipo === "torreSismica");
        const torre = torresSismicas[0];
        const segundaTorre = torresSismicas[1];
        const caminho = obterCaminhoAtual();
        let progressoAcumulado = 0;
        let melhor = { distancia: Infinity, progresso: 0 };

        for (let indice = 1; indice < caminho.length; indice++) {
            const inicio = caminho[indice - 1];
            const fim = caminho[indice];
            const comprimento = Math.hypot(fim.x - inicio.x, fim.y - inicio.y);
            for (let passo = 0; passo <= 20; passo++) {
                const fracao = passo / 20;
                const x = inicio.x + (fim.x - inicio.x) * fracao;
                const y = inicio.y + (fim.y - inicio.y) * fracao;
                const distancia = Math.max(
                    Math.hypot(torre.x - x, torre.y - y),
                    Math.hypot(segundaTorre.x - x, segundaTorre.y - y)
                );
                const progresso = progressoAcumulado + comprimento * fracao;
                if (progresso > 200 && distancia < melhor.distancia) {
                    melhor = { distancia, progresso };
                }
            }
            progressoAcumulado += comprimento;
        }

        for (let indice = 0; indice < 3; indice++) {
            const inimigo = {
                tipo: "normal",
                indiceDoCaminho: 0,
                x: 0,
                y: 0,
                alvo: 1,
                vida: 100,
                vidaMaxima: 100,
                tamanho: 20,
                velocidade: 1,
                cor: "red"
            };
            posicionarInimigoNoProgressoDoCaminho(inimigo, melhor.progresso + indice * 2);
            inimigos.push(inimigo);
        }

        const progressoAntes = calcularProgressoDoInimigo(inimigos[0]);
        atualizarTorresSismicas(1000);
        const progressoDepois = calcularProgressoDoInimigo(inimigos[0]);
        return {
            empurrao: Math.round(progressoAntes - progressoDepois),
            cargas: torresSismicas.map(item => item.cargaSismica),
            ondas: explosoesDosExplosivos.filter(
                efeito => efeito.tipoVisual === "sismico"
            ).length
        };
    })()`));
    expect(resultadoDoImpacto).toEqual({ empurrao: 220, cargas: [0, 0], ondas: 2 });

    await page.evaluate(() => eval("jogoPausado = false"));
    await page.waitForTimeout(100);
    await page.evaluate(() => eval("jogoPausado = true"));
    await testInfo.attach("torre-sismica-em-partida", {
        body: await page.screenshot({ type: "png" }),
        contentType: "image/png"
    });
});

test("avisa quando uma missão é concluída", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => registrarProgressoDaMissao("inimigosEliminados", 50));
    const aviso = page.locator('.notificacao-progresso[data-tipo="missao"]');
    await expect(aviso).toBeVisible();
    await expect(aviso).toContainText("Missão concluída");
    await expect(aviso).toContainText("Caçador de Pixels");
});

test("avisa quando uma conquista é desbloqueada", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => desbloquearConquista("primeiraVigilia"));
    const aviso = page.locator('.notificacao-progresso[data-tipo="conquista"]');
    await expect(aviso).toBeVisible();
    await expect(aviso).toContainText("Conquista desbloqueada");
    await expect(aviso).toContainText("Primeira Vigília");
});

test("exige os cinco minigames para dominar o fliperama", async ({ page }) => {
    await page.addInitScript(() => {
        const chaveDaPreparacao = "guardians-of-pixel-e2e-mestre-fliperama-preparado";
        if (sessionStorage.getItem(chaveDaPreparacao) === "true") {
            return;
        }
        sessionStorage.setItem(chaveDaPreparacao, "true");
        localStorage.setItem(
            "guardians-of-pixel-estatisticas-conquistas-v1",
            JSON.stringify({
                inimigosEliminados: 0,
                fasesConcluidas: 0,
                maiorWaveInfinita: 0,
                minigamesFliperamaConcluidos: ["alvo", "labirinto", "voo", "coleta"]
            })
        );
        localStorage.setItem(
            "guardians-of-pixel-recompensas-missoes-v1",
            JSON.stringify({
                skinsDesbloqueadas: [],
                conquistasDesbloqueadas: ["mestreDoFliperama"],
                skinTorrePadraoEquipada: null
            })
        );
    });
    await page.goto("/");
    await page.locator(".botao-lobby-conquistas").click();

    const conquista = page.locator(".conquista-cartao").filter({
        hasText: "Mestre do Fliperama"
    });
    await expect(conquista).toHaveClass(/conquista-bloqueada/);
    await expect(conquista.locator(".conquista-contador")).toHaveText("4 / 5");
    await expect(conquista.locator(".conquista-progresso")).toHaveAttribute(
        "aria-valuemax",
        "5"
    );

    await page.evaluate(() => {
        registrarMinigameFliperamaConcluidoParaConquistas("sequencia");
        mostrarConquistas();
    });
    await expect(conquista).toHaveClass(/conquista-desbloqueada/);
    await expect(conquista.locator(".conquista-contador")).toHaveText("5 / 5");
    const aviso = page.locator('.notificacao-progresso[data-tipo="conquista"]');
    await expect(aviso).toContainText("Mestre do Fliperama");

    await page.reload();
    await page.locator(".botao-lobby-conquistas").click();
    await expect(page.locator(".conquista-cartao").filter({
        hasText: "Mestre do Fliperama"
    })).toHaveClass(/conquista-desbloqueada/);
});

test("oferece Voo Pixel, Chuva de Pixels e Sequência Neon no fliperama", async ({ page }) => {
    await page.goto("/");
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    const abrirMinigame = async (valorDoSorteio) => {
        await page.evaluate((valor) => eval(`(() => {
            fliperamaNoMapa = { x: 200, y: 200, expiraEm: Date.now() + 10000 };
            const sorteioOriginal = Math.random;
            Math.random = () => ${valor};
            iniciarMinigameFliperama();
            Math.random = sorteioOriginal;
        })()`), valorDoSorteio);
        await expect(page.locator("#camada-minigame-fliperama")).toBeVisible();
    };
    const concluirContagemRegressiva = async () => {
        await page.evaluate(() => eval(`(() => {
            const agora = Date.now();
            minigameFliperamaComecaEm = agora;
            minigameFliperamaTerminaEm = agora + CONFIG.fliperama.minigame.duracao;
            if (alvoDoMinigameFliperama) {
                alvoDoMinigameFliperama.atualizadoEm = agora;
                alvoDoMinigameFliperama.podeSerAtingidoEm = agora;
            }
            if (roboDoLabirintoFliperama) roboDoLabirintoFliperama.atualizadoEm = agora;
            if (estadoVooPixel) estadoVooPixel.atualizadoEm = agora;
            if (estadoChuvaDePixels) {
                estadoChuvaDePixels.atualizadoEm = agora;
                estadoChuvaDePixels.ultimoPixelEm = agora;
            }
            atualizarPainelDoMinigameFliperama(agora);
        })()`));
    };

    await abrirMinigame(0.3);
    await expect(page.locator("#titulo-minigame-fliperama")).toHaveText("Voo Pixel");
    await expect(page.locator("#rotulo-pontos-minigame-fliperama")).toHaveText("Portais");
    await expect(page.locator("#rotulo-tempo-minigame-fliperama")).toHaveText("Começa em");
    await expect(page.locator("#tempo-minigame-fliperama")).toHaveText(/^[123]$/);
    await page.keyboard.press("Space");
    await expect.poll(() => page.evaluate(() => eval(
        "estadoVooPixel && estadoVooPixel.velocidadeY"
    ))).toBe(0);
    await concluirContagemRegressiva();
    await expect.poll(() => page.evaluate(() => eval(
        "minigamePodeReceberEntrada()"
    ))).toBe(true);
    await page.keyboard.press("Space");
    await expect.poll(() => page.evaluate(() => eval(
        "estadoVooPixel && estadoVooPixel.velocidadeY < 0"
    ))).toBe(true);
    await page.evaluate(() => finalizarMinigameFliperama(true));
    await expect(page.locator("#camada-minigame-fliperama")).toBeHidden();
    await expect.poll(() => page.evaluate(() => eval("boostFliperamaAtivo"))).toBe(true);

    await abrirMinigame(0.4);
    await expect(page.locator("#titulo-minigame-fliperama")).toHaveText("Chuva de Pixels");
    await expect(page.locator("#rotulo-pontos-minigame-fliperama")).toHaveText("Coletados");
    await expect(page.locator("#controles-toque-labirinto")).not.toHaveAttribute("hidden", "");
    await expect(page.locator('[data-direcao-labirinto="arrowup"]')).toHaveAttribute("hidden", "");
    await page.keyboard.down("ArrowRight");
    await expect.poll(() => page.evaluate(() => eval(
        'teclasPressionadasNoLabirinto.has("arrowright")'
    ))).toBe(false);
    await page.keyboard.up("ArrowRight");
    await concluirContagemRegressiva();
    await page.keyboard.down("ArrowRight");
    await expect.poll(() => page.evaluate(() => eval(
        'teclasPressionadasNoLabirinto.has("arrowright")'
    ))).toBe(true);
    await page.keyboard.up("ArrowRight");
    await page.evaluate(() => finalizarMinigameFliperama(true));
    await expect.poll(() => page.evaluate(() => eval("boostDanoFliperamaAtivo"))).toBe(true);

    const creditosAntes = await page.evaluate(() => eval("dinheiro"));
    await abrirMinigame(0.55);
    await expect(page.locator("#titulo-minigame-fliperama")).toHaveText("Sequência Neon");
    await expect(page.locator("#pontos-minigame-fliperama")).toHaveText("Observe");
    await concluirContagemRegressiva();
    await page.evaluate(() => eval(`
        estadoSequenciaNeon.sinais = [0, 1, 2, 3, 0];
        estadoSequenciaNeon.exibindo = false;
        estadoSequenciaNeon.sinalAtivo = null;
        estadoSequenciaNeon.indiceDoJogador = 0;
        atualizarPainelDoMinigameFliperama();
    `));

    const canvasDoMinigame = page.locator("#minigame-fliperama");
    const caixa = await canvasDoMinigame.boundingBox();
    expect(caixa).not.toBeNull();
    const converter = (x, y) => ({
        x: caixa.width * x / 720,
        y: caixa.height * y / 420
    });
    for (const [x, y] of [[220, 120], [500, 120], [220, 295], [500, 295], [220, 120]]) {
        await canvasDoMinigame.click({ position: converter(x, y) });
    }

    await expect(page.locator("#camada-minigame-fliperama")).toBeHidden();
    await expect.poll(() => page.evaluate(() => eval("dinheiro"))).toBe(creditosAntes + 200);
    await expect.poll(() => page.evaluate(() => eval("aviso"))).toContain("200 créditos");
});

test("oferece os três desafios da central no fliperama com recompensas", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.locator(".botao-lobby-jogar").click();
    await confirmarEquipeAtual(page);

    const abrirDesafio = async (valorDoSorteio, titulo) => {
        await page.evaluate((valor) => eval(`(() => {
            fliperamaNoMapa = { x: 200, y: 200, expiraEm: Date.now() + 10000 };
            const sorteioOriginal = Math.random;
            Math.random = () => ${valor};
            iniciarMinigameFliperama();
            Math.random = sorteioOriginal;
        })()`), valorDoSorteio);
        await expect(page.locator("#camada-minigame-treinamento-fliperama")).toBeVisible();
        await expect(page.locator("#painel-minigame-treinamento-fliperama h3")).toHaveText(titulo);
        await expect(page.locator("#painel-minigame-treinamento-fliperama .treinamento-desafio-topo > .botao")).toHaveCount(0);
        await expect.poll(() => page.evaluate(() => eval("jogoPausado"))).toBe(true);
        await page.evaluate(() => {
            eval("desafioDeTreinamentoAtivo.comecaEm = Date.now()");
            atualizarMinigameDeTreinamento();
        });
    };

    await abrirDesafio(0.65, "Carga Máxima");
    await page.locator("#camada-minigame-treinamento-fliperama").screenshot({
        path: testInfo.outputPath("carga-maxima-no-fliperama.png")
    });
    await page.evaluate(() => {
        for (let indice = 0; indice < CONFIG.centroDeTreinamento.carga.apertosNecessarios; indice++) {
            acionarControleDoTreinamento();
        }
    });
    await expect(page.locator("#camada-minigame-treinamento-fliperama")).toBeHidden();
    await expect.poll(() => page.evaluate(() => eval("boostFliperamaAtivo"))).toBe(true);
    await expect.poll(() => page.evaluate(() => eval("jogoPausado"))).toBe(false);

    await abrirDesafio(0.78, "Sinal de Reflexo");
    await page.evaluate(() => {
        for (let indice = 0; indice < CONFIG.centroDeTreinamento.reflexo.acertosNecessarios; indice++) {
            eval("desafioDeTreinamentoAtivo.sinalAtivo = true");
            eval("desafioDeTreinamentoAtivo.sinalAtivadoEm = Date.now() - 150");
            acionarControleDoTreinamento();
        }
    });
    await expect(page.locator("#camada-minigame-treinamento-fliperama")).toBeHidden();
    await expect.poll(() => page.evaluate(() => eval("boostDanoFliperamaAtivo"))).toBe(true);

    const creditosAntes = await page.evaluate(() => eval("dinheiro"));
    await abrirDesafio(0.9, "Trava de Pulso");
    await page.evaluate(() => {
        for (const centro of CONFIG.centroDeTreinamento.pulso.centrosDasFaixas) {
            const deslocamento = centro * CONFIG.centroDeTreinamento.pulso.duracaoDoPercurso / 2;
            eval(`desafioDeTreinamentoAtivo.iniciadoEm = Date.now() - ${deslocamento}`);
            acionarControleDoTreinamento();
        }
    });
    await expect(page.locator("#camada-minigame-treinamento-fliperama")).toBeHidden();
    await expect.poll(() => page.evaluate(() => eval("dinheiro"))).toBe(creditosAntes + 250);
    expect(await page.evaluate(() => eval(
        "[...estatisticasDasConquistas.minigamesFliperamaConcluidos].sort()"
    ))).toEqual(["carga", "pulso", "reflexo"]);
    expect(await page.evaluate(() => localStorage.getItem(
        "guardians-of-pixel-centro-treinamento-v1"
    ))).toBeNull();
});

test("esconde e revela a conquista Frequência 09", async ({ page }) => {
    await page.goto("/");
    await page.locator(".botao-lobby-conquistas").click();

    const cartoes = page.locator(".conquista-cartao");
    const conquistaSecreta = page.locator(".conquista-secreta");
    await expect(cartoes).toHaveCount(13);
    await expect(conquistaSecreta.locator(".conquista-icone")).toHaveText("?");
    await expect(conquistaSecreta).toContainText(
        "O futuro guarda uma frequência esquecida."
    );
    await expect(conquistaSecreta).toContainText("Frequência 09");

    await page.evaluate(() => {
        registrarTransmissaoProjetoRelogioParaConquistas();
        mostrarConquistas();
    });
    await expect(conquistaSecreta).toContainText("Frequência 09");
    await expect(conquistaSecreta).toContainText(
        "Encontre e escute até o fim a transmissão do Projeto ???."
    );

    await page.reload();
    await page.locator(".botao-lobby-conquistas").click();
    await expect(page.locator(".conquista-secreta")).toContainText("Frequência 09");
});

test("aplica vantagens elementais e mantém dano normal no mesmo elemento", async ({ page }) => {
    await page.goto("/");

    const resultado = await page.evaluate(() => eval(`(() => {
        const criarAlvo = (tipo) => ({ tipo, vida: 1000, vidaMaxima: 1000 });
        const alvoDeGeloContraFogo = criarAlvo("loboDeGelo");
        const alvoDeGeloContraGelo = criarAlvo("loboDeGelo");
        const alvoMecanico = criarAlvo("droneCacador");

        const danoDeFogo = aplicarDanoAoInimigo(
            alvoDeGeloContraFogo,
            100,
            1000,
            { elemento: "fogo" }
        );
        const danoDoMesmoElemento = aplicarDanoAoInimigo(
            alvoDeGeloContraGelo,
            100,
            1000,
            { elemento: "gelo" }
        );
        const danoEletrico = aplicarDanoAoInimigo(
            alvoMecanico,
            100,
            1000,
            { elemento: "eletrico" }
        );

        return {
            danoDeFogo,
            danoDoMesmoElemento,
            danoEletrico,
            avisoAte: alvoDeGeloContraFogo.avisoSuperEfetivoExpiraEm,
            avisoNoMesmoElemento: alvoDeGeloContraGelo.avisoSuperEfetivoExpiraEm || 0,
            resumoGlacial: obterResumoDaConfiguracaoDaTorre(
                CONFIG.torre.tipos.torreGlacial
            ),
            fraquezasDoLobo: obterTextoDasFraquezasElementais("loboDeGelo")
        };
    })()`));

    expect(resultado.danoDeFogo).toBe(135);
    expect(resultado.danoDoMesmoElemento).toBe(100);
    expect(resultado.danoEletrico).toBe(130);
    expect(resultado.avisoAte).toBe(1700);
    expect(resultado.avisoNoMesmoElemento).toBe(0);
    expect(resultado.resumoGlacial).toContain("Elemento: Gelo");
    expect(resultado.fraquezasDoLobo).toContain("Fogo +35%");
    expect(resultado.fraquezasDoLobo).toContain("Tóxico +25%");
});

test("abre fichas clicáveis de torres, inimigos, Bosses e skins no Álbum", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
        localStorage.setItem("tower-defense-2-progresso-fases-v2", "12");
        localStorage.setItem(
            "guardians-of-pixel-album-figurinhas-v1",
            JSON.stringify(["loboDeGelo", "bossArtico"])
        );
    });
    await page.reload();
    await page.locator('button[onclick="mostrarAlbum()"]').click();

    const figurinhaGlacial = page.locator(
        'button.album-cartao-torre:has(canvas[data-tipo-torre="torreGlacial"][data-nivel-torre="0"])'
    );
    await figurinhaGlacial.click();

    const detalhes = page.locator(".album-detalhes-painel");
    await expect(detalhes).toBeVisible();
    await expect(detalhes).toHaveAttribute("role", "dialog");
    await expect(detalhes).toContainText("Torre Glacial · nível 0");
    await expect(detalhes.locator(".album-detalhes-atributo").filter({
        hasText: "Força (dano)"
    }).locator("strong")).toHaveText("18");
    await expect(detalhes.locator(".album-detalhes-atributo").filter({
        hasText: "Tempo para atacar"
    }).locator("strong")).toHaveText("0,8 s");
    await expect(detalhes.locator(".album-detalhes-atributo").filter({
        hasText: "Elemento"
    }).locator("strong")).toHaveText("Gelo");
    await expect(detalhes.locator(".album-detalhes-atributo").filter({
        hasText: "Melhor contra"
    })).toContainText("Fogo (+25% de dano)");
    await expect(page.locator(".album-detalhes-fechar")).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(page.locator(".album-detalhes-camada")).toHaveCount(0);
    await expect(page.locator("#conteudo-menu")).toHaveAttribute("data-tela", "album");
    await expect(figurinhaGlacial).toBeFocused();

    await page.locator("#aba-album-inimigos").click();
    const figurinhaDoLobo = page.locator(
        'button.album-cartao-inimigo:has(canvas[data-tipo-inimigo="loboDeGelo"])'
    );
    await figurinhaDoLobo.click();
    await expect(detalhes).toContainText("Lobo de Gelo");
    await expect(detalhes.locator(".album-detalhes-atributo").filter({
        hasText: "Vida base"
    }).locator("strong")).toHaveText("240");
    await expect(detalhes.locator(".album-detalhes-atributo").filter({
        hasText: "Características"
    })).toContainText("Gelo, Orgânico");
    await expect(detalhes.locator(".album-detalhes-atributo").filter({
        hasText: "Fraquezas"
    })).toContainText("Fogo +35%, Tóxico +25%");
    await page.locator(".album-detalhes-camada").click({ position: { x: 8, y: 8 } });
    await expect(page.locator(".album-detalhes-camada")).toHaveCount(0);

    await page.locator("#aba-album-bosses").click();
    await page.locator(
        'button.album-cartao-inimigo:has(canvas[data-tipo-inimigo="bossArtico"])'
    ).click();
    await expect(detalhes).toContainText("Titã Glacial");
    await expect(detalhes).toContainText("Boss");
    await expect(detalhes).toContainText("Fogo +35%, Tóxico +25%");
    await page.locator(".album-detalhes-fechar").click();

    await page.locator("#aba-album-skins").click();
    await page.locator(
        'button.album-cartao-skin:has(canvas[data-id-skin="original"])'
    ).click();
    await expect(detalhes).toContainText("Visual original");
    await expect(detalhes).toContainText("Nenhum; esta skin é somente cosmética.");

    await page.setViewportSize({ width: 390, height: 844 });
    const caixaDaFicha = await detalhes.boundingBox();
    expect(caixaDaFicha).not.toBeNull();
    expect(caixaDaFicha.width).toBeLessThanOrEqual(375);
    expect(caixaDaFicha.height).toBeLessThanOrEqual(828);
});

test("orienta visualmente os projéteis para o alvo", async ({ page }, testInfo) => {
    await page.goto("/");

    const angulos = await page.evaluate(() => eval(`(() => ([
        obterAnguloVisualDoTiro({ x: 50, y: 50, alvo: { x: 100, y: 50 } }),
        obterAnguloVisualDoTiro({ x: 50, y: 50, alvo: { x: 50, y: 100 } }),
        obterAnguloVisualDoTiro({ x: 50, y: 50, alvo: { x: 0, y: 50 } }),
        obterAnguloVisualDoTiro({ x: 50, y: 50, alvo: { x: 50, y: 0 } })
    ]))()`));

    expect(angulos[0]).toBeCloseTo(0, 6);
    expect(angulos[1]).toBeCloseTo(Math.PI / 2, 6);
    expect(Math.abs(angulos[2])).toBeCloseTo(Math.PI, 6);
    expect(angulos[3]).toBeCloseTo(-Math.PI / 2, 6);

    await page.evaluate(() => eval(`(() => {
        canvas.width = 600;
        canvas.height = 420;
        canvas.style.position = "fixed";
        canvas.style.inset = "20px auto auto 20px";
        canvas.style.zIndex = "999";
        canvas.style.display = "block";
        canvas.style.width = "600px";
        canvas.style.height = "420px";
        canvas.style.border = "6px solid #d8b65a";
        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = "#10251f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const desenharAlvo = (x, y) => {
            ctx.fillStyle = "#ffe66d";
            ctx.fillRect(x - 6, y - 6, 12, 12);
            ctx.fillStyle = "#7a5528";
            ctx.fillRect(x - 2, y - 2, 4, 4);
        };
        const desenharTitulo = (texto, x, y) => {
            ctx.fillStyle = "#f6f0c5";
            ctx.font = "bold 16px monospace";
            ctx.textAlign = "center";
            ctx.fillText(texto, x, y);
        };
        const desenharQuatroDirecoes = (desenhar, centroX, centroY, extras = {}) => {
            const alvo = { x: centroX, y: centroY };
            desenharAlvo(centroX, centroY);
            [
                { x: centroX - 65, y: centroY },
                { x: centroX + 65, y: centroY },
                { x: centroX, y: centroY - 65 },
                { x: centroX, y: centroY + 65 }
            ].forEach((posicao) => desenhar({ ...posicao, alvo, ...extras }));
        };

        desenharTitulo("BESTA", 150, 28);
        desenharQuatroDirecoes(desenharViroteDaBesta, 150, 112);
        desenharTitulo("GLACIAL", 450, 28);
        desenharQuatroDirecoes(desenharEstilhacoGlacial, 450, 112);
        desenharTitulo("LASER", 150, 220);
        desenharQuatroDirecoes(desenharLaserDoObliterador, 150, 310);
        desenharTitulo("PERFURADOR / DRONES", 450, 220);
        const alvoFinal = { x: 450, y: 310 };
        desenharAlvo(alvoFinal.x, alvoFinal.y);
        desenharProjetilDaNovaTorre({
            x: 380,
            y: 310,
            alvo: alvoFinal,
            tipoDaTorre: "torrePerfuradora"
        });
        desenharProjetilDaNovaTorre({
            x: 520,
            y: 310,
            alvo: alvoFinal,
            tipoDaTorre: "torreDrones"
        });
        desenharProjetilDaNovaTorre({
            x: 450,
            y: 245,
            alvo: alvoFinal,
            tipoDaTorre: "torreCorrentes"
        });
        desenharProjetilDaNovaTorre({
            x: 450,
            y: 375,
            alvo: alvoFinal,
            tipoDaTorre: "canhaoPrismatico",
            modoPrismatico: "azul"
        });
    })()`));

    const canvasDoJogo = page.locator("#game");
    await expect(canvasDoJogo).toBeVisible();
    await canvasDoJogo.screenshot({
        path: testInfo.outputPath("projeteis-em-direcoes-diferentes.png")
    });
});

test("aplica os cursores pixelados básicos e de contexto", async ({ page }, testInfo) => {
    await page.goto("/");

    const cursorNormal = await page.locator("body").evaluate(
        (elemento) => getComputedStyle(elemento).cursor
    );
    const cursorDeAcao = await page.locator(".botao-lobby-jogar").evaluate(
        (elemento) => getComputedStyle(elemento).cursor
    );
    expect(cursorNormal).toContain("cursor-pixel-seta.png");
    expect(cursorNormal).toContain("3 2");
    expect(cursorNormal).toMatch(/auto$/);
    expect(cursorDeAcao).toContain("cursor-pixel-mao.png");
    expect(cursorDeAcao).toContain("14 2");
    expect(cursorDeAcao).toMatch(/pointer$/);

    const estadosEspeciais = await page.evaluate(() => {
        const botaoDesabilitado = document.createElement("button");
        botaoDesabilitado.className = "botao";
        botaoDesabilitado.disabled = true;
        document.body.appendChild(botaoDesabilitado);
        const jogo = document.getElementById("game");
        jogo.classList.add("inimigo-sob-cursor");
        const cursores = {
            desabilitado: getComputedStyle(botaoDesabilitado).cursor,
            alvo: getComputedStyle(jogo).cursor
        };
        jogo.classList.replace("inimigo-sob-cursor", "construcao-sob-cursor");
        cursores.construcao = getComputedStyle(jogo).cursor;
        jogo.classList.replace("construcao-sob-cursor", "explosivo-sob-cursor");
        cursores.explosivo = getComputedStyle(jogo).cursor;
        jogo.classList.replace("explosivo-sob-cursor", "posicao-invalida-sob-cursor");
        cursores.invalido = getComputedStyle(jogo).cursor;
        botaoDesabilitado.remove();
        jogo.classList.remove("posicao-invalida-sob-cursor");
        return cursores;
    });
    expect(estadosEspeciais.desabilitado).toBe("not-allowed");
    expect(estadosEspeciais.alvo).toContain("cursor-pixel-mira.png");
    expect(estadosEspeciais.construcao).toContain("cursor-pixel-construcao.png");
    expect(estadosEspeciais.explosivo).toContain("cursor-pixel-explosivo.png");
    expect(estadosEspeciais.invalido).toContain("cursor-pixel-invalido.png");

    await page.evaluate(() => {
        const painel = document.createElement("section");
        painel.id = "previa-cursores-pixelados";
        painel.style.cssText = [
            "position:fixed",
            "inset:50% auto auto 50%",
            "transform:translate(-50%,-50%)",
            "z-index:999",
            "display:flex",
            "gap:32px",
            "padding:28px",
            "color:#f4f1d0",
            "background:#102218",
            "border:6px solid #f5cf57",
            "box-shadow:10px 10px 0 #020704",
            "font:900 16px monospace",
            "text-align:center"
        ].join(";");
        painel.innerHTML = `
            <figure style="margin:0">
                <img src="assets/cursor-pixel-seta.png" width="192" height="192"
                    style="display:block;image-rendering:pixelated;background:#397440">
                <figcaption style="margin-top:12px">NORMAL</figcaption>
            </figure>
            <figure style="margin:0">
                <img src="assets/cursor-pixel-mao.png" width="192" height="192"
                    style="display:block;image-rendering:pixelated;background:#397440">
                <figcaption style="margin-top:12px">AÇÃO</figcaption>
            </figure>
            <figure style="margin:0">
                <img src="assets/cursor-pixel-construcao.png" width="192" height="192"
                    style="display:block;image-rendering:pixelated;background:#397440">
                <figcaption style="margin-top:12px">CONSTRUIR</figcaption>
            </figure>
            <figure style="margin:0">
                <img src="assets/cursor-pixel-explosivo.png" width="192" height="192"
                    style="display:block;image-rendering:pixelated;background:#397440">
                <figcaption style="margin-top:12px">EXPLOSIVO</figcaption>
            </figure>
            <figure style="margin:0">
                <img src="assets/cursor-pixel-invalido.png" width="192" height="192"
                    style="display:block;image-rendering:pixelated;background:#397440">
                <figcaption style="margin-top:12px">INVÁLIDO</figcaption>
            </figure>
            <figure style="margin:0">
                <img src="assets/cursor-pixel-mira.png" width="192" height="192"
                    style="display:block;image-rendering:pixelated;background:#397440">
                <figcaption style="margin-top:12px">ALVO</figcaption>
            </figure>`;
        document.body.appendChild(painel);
    });

    const previa = page.locator("#previa-cursores-pixelados");
    await expect(previa).toBeVisible();
    await expect(previa.locator("img")).toHaveCount(6);
    await previa.screenshot({
        path: testInfo.outputPath("cursores-pixelados-ampliados.png")
    });
});

test("abre a central e treina os oito minigames sem recompensas", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const valoresAntes = await page.evaluate(() => ({
        fragmentos: eval("fragmentosPixel"),
        experiencia: eval("progressaoDeNivel.experienciaTotal"),
        minigamesDoFliperama: [...eval("estatisticasDasConquistas.minigamesFliperamaConcluidos")]
    }));
    await page.locator(".botao-lobby-treinamento").click();

    const conteudo = page.locator("#conteudo-menu");
    await expect(conteudo).toHaveAttribute("data-tela", "treinamento");
    await expect(page.locator(".treinamento-cartao")).toHaveCount(8);
    await expect(page.locator(".treinamento-cartao[data-tipo='alvo']")).toContainText("Tiro ao alvo");
    await expect(page.locator(".treinamento-cartao[data-tipo='labirinto']")).toContainText("Labirinto Pixel");
    await expect(page.locator(".treinamento-cartao[data-tipo='voo']")).toContainText("Voo Pixel");
    await expect(page.locator(".treinamento-cartao[data-tipo='coleta']")).toContainText("Chuva de Pixels");
    await expect(page.locator(".treinamento-cartao[data-tipo='sequencia']")).toContainText("Sequência Neon");
    await expect(page.locator(".treinamento-cartao[data-tipo='carga']")).toContainText("Carga Máxima");
    await expect(page.locator(".treinamento-cartao[data-tipo='reflexo']")).toContainText("Sinal de Reflexo");
    await expect(page.locator(".treinamento-cartao[data-tipo='pulso']")).toContainText("Trava de Pulso");
    await conteudo.screenshot({ path: testInfo.outputPath("centro-treinamento-desktop.png") });

    await page.locator(".treinamento-cartao[data-tipo='alvo'] button").click();
    await expect(page.locator("#camada-minigame-fliperama")).toBeVisible();
    await expect(page.locator("#titulo-minigame-fliperama")).toHaveText("Tiro ao alvo");
    await expect(page.locator("#selo-minigame-fliperama")).toHaveText("Modo treino");
    await expect(page.locator("#botao-sair-minigame-fliperama-treinamento")).toBeVisible();
    await page.evaluate(() => finalizarMinigameFliperama(true));
    await expect(page.locator("#camada-minigame-fliperama")).toBeHidden();
    await expect(page.locator(".treinamento-resultado[data-vitoria='true']")).toBeVisible();
    await page.locator(".treinamento-resultado button").filter({ hasText: "Voltar" }).click();

    await page.locator(".treinamento-cartao[data-tipo='carga'] button").click();
    await expect(page.locator("#contagem-minigame-treinamento")).toBeVisible();
    await expect(page.locator("#controle-minigame-treinamento")).toBeDisabled();
    await page.evaluate(() => {
        eval("desafioDeTreinamentoAtivo.comecaEm = Date.now()");
        atualizarMinigameDeTreinamento();
    });
    await expect(page.locator("#controle-minigame-treinamento")).toBeEnabled();
    await page.locator(".treinamento-desafio").screenshot({
        path: testInfo.outputPath("treinamento-carga-maxima.png")
    });
    await page.evaluate(() => {
        for (let indice = 0; indice < CONFIG.centroDeTreinamento.carga.apertosNecessarios; indice++) {
            acionarControleDoTreinamento();
        }
    });
    await expect(page.locator(".treinamento-resultado[data-vitoria='true']")).toBeVisible();
    await expect(page.locator(".treinamento-resultado")).toContainText("NOVO RECORDE");
    await page.locator(".treinamento-resultado").screenshot({
        path: testInfo.outputPath("treinamento-resultado.png")
    });
    await page.locator(".treinamento-resultado button").filter({ hasText: "Voltar" }).click();

    await page.locator(".treinamento-cartao[data-tipo='reflexo'] button").click();
    await page.evaluate(() => {
        eval("desafioDeTreinamentoAtivo.comecaEm = Date.now()");
        atualizarMinigameDeTreinamento();
        eval("desafioDeTreinamentoAtivo.sinalAtivo = true");
        eval("desafioDeTreinamentoAtivo.sinalAtivadoEm = Date.now()");
        atualizarMinigameDeTreinamento();
    });
    await expect(page.locator(".treinamento-botao-reflexo")).toHaveAttribute("data-estado", "agora");
    await page.locator(".treinamento-desafio").screenshot({
        path: testInfo.outputPath("treinamento-sinal-reflexo.png")
    });
    await page.evaluate(() => {
        for (let indice = 0; indice < CONFIG.centroDeTreinamento.reflexo.acertosNecessarios; indice++) {
            eval("desafioDeTreinamentoAtivo.sinalAtivo = true");
            eval("desafioDeTreinamentoAtivo.sinalAtivadoEm = Date.now() - 180");
            acionarControleDoTreinamento();
        }
    });
    await expect(page.locator(".treinamento-resultado[data-vitoria='true']")).toContainText("180 ms");
    await page.locator(".treinamento-resultado button").filter({ hasText: "Voltar" }).click();

    await page.locator(".treinamento-cartao[data-tipo='pulso'] button").click();
    await page.evaluate(() => {
        eval("desafioDeTreinamentoAtivo.comecaEm = Date.now()");
        atualizarMinigameDeTreinamento();
    });
    await page.locator(".treinamento-desafio").screenshot({
        path: testInfo.outputPath("treinamento-trava-pulso.png")
    });
    await page.evaluate(() => {
        for (const centro of CONFIG.centroDeTreinamento.pulso.centrosDasFaixas) {
            const deslocamento = centro * CONFIG.centroDeTreinamento.pulso.duracaoDoPercurso / 2;
            eval(`desafioDeTreinamentoAtivo.iniciadoEm = Date.now() - ${deslocamento}`);
            acionarControleDoTreinamento();
        }
    });
    await expect(page.locator(".treinamento-resultado[data-vitoria='true']")).toBeVisible();

    const historico = await page.evaluate(() => JSON.parse(localStorage.getItem(
        "guardians-of-pixel-centro-treinamento-v1"
    )));
    expect(historico.partidas).toBe(4);
    expect(historico.vitorias).toBe(4);
    expect(historico.tiposConcluidos.sort()).toEqual(["alvo", "carga", "pulso", "reflexo"]);
    expect(["alvo", "carga", "pulso", "reflexo"].every(
        tipo => historico.recordes[tipo] > 0
    )).toBe(true);
    expect(await page.evaluate(() => ({
        fragmentos: eval("fragmentosPixel"),
        experiencia: eval("progressaoDeNivel.experienciaTotal"),
        minigamesDoFliperama: [...eval("estatisticasDasConquistas.minigamesFliperamaConcluidos")]
    }))).toEqual(valoresAntes);

    await page.locator(".treinamento-resultado button").filter({ hasText: "Voltar" }).click();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator(".treinamento-cartao").first()).toBeInViewport();
    await conteudo.screenshot({ path: testInfo.outputPath("centro-treinamento-celular.png") });
});
