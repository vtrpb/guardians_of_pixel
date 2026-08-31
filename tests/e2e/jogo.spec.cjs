const { test, expect } = require("@playwright/test");

const CHAVE_TUTORIAL = "guardians-of-pixel-tutorial-concluido-v1";
const CHAVE_FRAGMENTOS = "guardians-of-pixel-fragmentos-v2";
const CHAVE_COMPRAS = "guardians-of-pixel-compras-v2";
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
    }, CHAVE_TUTORIAL);
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
        { tela: "conquistas", seletor: ".botao-lobby-conquistas" }
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
    await expect(page.locator(".senhor-tempo-cabeca")).toBeVisible();
    await expect(page.locator(".senhor-tempo-corpo")).toBeVisible();
    await expect(page.locator(".senhor-tempo-forma-humana")).toHaveCount(0);
    await expect(page.locator(".senhor-tempo-braco")).toHaveCount(0);
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
    await expect(conteudo.locator(".selecao-defesa-cartao")).toHaveCount(15);
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
    await expect(conteudo.getByText("0 de 27 figurinhas coladas")).toBeVisible();

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
    await expect(page.getByText("0 de 30 figurinhas coladas")).toBeVisible();
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
    await expect(page.locator(".fases-em-desenvolvimento")).toContainText("Fases 10 a 12");

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

    const postoDoPulso = page.locator("#posto-pulso-temporal");
    const botaoDoPulso = page.locator("#botao-pulso-temporal");
    await expect(postoDoPulso).toBeVisible();
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
        atualizarPulsoTemporalNoPosto();
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
    const botaoDaIsca = page.locator('[data-id-item-loja="iscaBlindada"]');
    await botaoDaIsca.click();
    await expect(page.locator("#camada-confirmacao-compra-loja")).toBeVisible();
    await expect(page.locator("#descricao-confirmacao-compra-loja")).toContainText("70 Fragmentos");
    await page.locator("#botao-cancelar-compra-loja").click();
    await expect(page.locator("#camada-confirmacao-compra-loja")).toBeHidden();
    await expect.poll(async () => page.evaluate((chave) => localStorage.getItem(chave), CHAVE_FRAGMENTOS)).toBe("100");

    await botaoDaIsca.click();
    await page.locator("#botao-confirmar-compra-loja").click();
    await expect.poll(async () => page.evaluate((chave) => localStorage.getItem(chave), CHAVE_FRAGMENTOS)).toBe("70");
    await expect.poll(async () => page.evaluate((chave) => (
        JSON.parse(localStorage.getItem(chave))
    ), CHAVE_COMPRAS)).toContain("iscaBlindada");
    await expect(page.locator('[data-id-item-loja="iscaBlindada"]')).toBeDisabled();
});

test("compra dois Lança-Chamas e incendeia um inimigo em uma partida real", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.evaluate((chave) => localStorage.setItem(chave, "100"), CHAVE_FRAGMENTOS);
    await page.reload();
    await page.locator(".botao-lobby-loja").click();

    const botaoLancaChamas = page.locator('[data-id-item-loja="lancaChamas"]');
    const cartaoLancaChamas = botaoLancaChamas.locator("xpath=ancestor::article");
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
    ), CHAVE_FRAGMENTOS)).toBe("0");

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
        .locator("xpath=ancestor::article");
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
        .locator("xpath=ancestor::article");
    await expect(figurinhasSismicas).toHaveCount(4);
    await expect(figurinhasSismicas.nth(0)).toContainText("Carga: 3 inimigos");
    await expect(figurinhasSismicas.nth(3)).toContainText("Segundo impacto após 0,6s");

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
        .toContainText("Nível 0 · Carga 0/3 · Empurra 120 px");
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
    expect(resultadoDoImpacto).toEqual({ empurrao: 240, cargas: [0, 0], ondas: 2 });

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
