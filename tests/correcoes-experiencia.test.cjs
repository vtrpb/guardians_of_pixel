const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    assert.ok(inicio >= 0, `Função ausente: ${nome}`);
    const inicioDoBloco = codigo.indexOf("{", inicio);
    let profundidade = 0;

    for (let indice = inicioDoBloco; indice < codigo.length; indice++) {
        if (codigo[indice] === "{") profundidade++;
        if (codigo[indice] === "}") profundidade--;

        if (profundidade === 0) {
            return codigo.slice(inicio, indice + 1);
        }
    }

    throw new Error(`Bloco incompleto: ${nome}`);
}

[
    "quadrosPorSegundoDeReferencia: 60",
    "deltaMaximoMs: 50",
    "function calcularMultiplicadorDeMovimento(instanteDoQuadro)",
    "function moverInimigos(multiplicadorDeMovimento = 1)",
    "function moverTiros(multiplicadorDeMovimento = 1)",
    "function moverTirosDosInimigos(multiplicadorDeMovimento = 1)",
    "atualizarExplosoesDosExplosivos(multiplicadorDeMovimento)",
    "requestAnimationFrame(atualizar);"
].forEach((trecho) => assert.ok(
    codigo.includes(trecho),
    `Simulação estável ausente: ${trecho}`
));

const contextoDoTempo = {
    CONFIG: {
        simulacao: {
            quadrosPorSegundoDeReferencia: 60,
            deltaMaximoMs: 50
        }
    }
};
vm.createContext(contextoDoTempo);
vm.runInContext("let instanteDoUltimoQuadro = 0;", contextoDoTempo);
vm.runInContext(extrairFuncao("calcularMultiplicadorDeMovimento"), contextoDoTempo);
assert.strictEqual(
    vm.runInContext("calcularMultiplicadorDeMovimento(1000)", contextoDoTempo),
    1
);
assert.ok(Math.abs(
    vm.runInContext("calcularMultiplicadorDeMovimento(1000 + 1000 / 144)", contextoDoTempo)
    - 60 / 144
) < 0.000001);
vm.runInContext("instanteDoUltimoQuadro = 2000;", contextoDoTempo);
assert.strictEqual(
    vm.runInContext("calcularMultiplicadorDeMovimento(3000)", contextoDoTempo),
    3,
    "A simulação deve limitar atrasos grandes a 50 ms, equivalentes a 3 quadros de 60 Hz."
);

let agoraDaVisibilidade = 5000;
const contextoDaVisibilidade = {
    Date: { now: () => agoraDaVisibilidade },
    document: { hidden: true },
    jogoIniciado: true,
    partidaEncerrada: false,
    jogoPausado: false,
    tutorialAtivo: false,
    paginaOcultadaEm: 0,
    pausaAutomaticaPorOcultacao: false,
    menuAberto: false,
    duracaoCompensada: 0,
    focoRestaurado: false,
    definirMenuDaPartidaAberto(aberto) {
        contextoDaVisibilidade.menuAberto = aberto;
    },
    compensarMinigameAposOcultarPagina(duracao) {
        contextoDaVisibilidade.duracaoCompensada = duracao;
    },
    botaoMenuPartida: {
        focus() {
            contextoDaVisibilidade.focoRestaurado = true;
        }
    }
};
vm.createContext(contextoDaVisibilidade);
vm.runInContext(extrairFuncao("controlarVisibilidadeDaPagina"), contextoDaVisibilidade);
vm.runInContext("controlarVisibilidadeDaPagina()", contextoDaVisibilidade);
assert.strictEqual(contextoDaVisibilidade.paginaOcultadaEm, 5000);
assert.strictEqual(contextoDaVisibilidade.pausaAutomaticaPorOcultacao, true);
assert.strictEqual(contextoDaVisibilidade.menuAberto, true);

agoraDaVisibilidade = 8000;
contextoDaVisibilidade.document.hidden = false;
vm.runInContext("controlarVisibilidadeDaPagina()", contextoDaVisibilidade);
assert.strictEqual(contextoDaVisibilidade.duracaoCompensada, 3000);
assert.strictEqual(contextoDaVisibilidade.paginaOcultadaEm, 0);
assert.strictEqual(contextoDaVisibilidade.pausaAutomaticaPorOcultacao, false);
assert.strictEqual(contextoDaVisibilidade.focoRestaurado, true);

const contextoDoMinigamePausado = {
    minigameFliperamaAtivo: true,
    minigameFliperamaComecaEm: 3000,
    minigameFliperamaTerminaEm: 15000,
    alvoDoMinigameFliperama: {
        atualizadoEm: 1000,
        podeSerAtingidoEm: 1100
    },
    roboDoLabirintoFliperama: { atualizadoEm: 1200 },
    estadoVooPixel: { atualizadoEm: 1300 },
    estadoChuvaDePixels: { atualizadoEm: 1400, ultimoPixelEm: 1500 },
    estadoSequenciaNeon: {
        proximaMudancaEm: 1600,
        sinalAtivoAte: 1700,
        erroAte: 1800
    }
};
vm.createContext(contextoDoMinigamePausado);
vm.runInContext(
    extrairFuncao("compensarMinigameAposOcultarPagina"),
    contextoDoMinigamePausado
);
vm.runInContext("compensarMinigameAposOcultarPagina(3000)", contextoDoMinigamePausado);
assert.strictEqual(contextoDoMinigamePausado.minigameFliperamaComecaEm, 6000);
assert.strictEqual(contextoDoMinigamePausado.minigameFliperamaTerminaEm, 18000);
assert.strictEqual(contextoDoMinigamePausado.alvoDoMinigameFliperama.atualizadoEm, 4000);
assert.strictEqual(contextoDoMinigamePausado.alvoDoMinigameFliperama.podeSerAtingidoEm, 4100);
assert.strictEqual(contextoDoMinigamePausado.roboDoLabirintoFliperama.atualizadoEm, 4200);
assert.strictEqual(contextoDoMinigamePausado.estadoVooPixel.atualizadoEm, 4300);
assert.strictEqual(contextoDoMinigamePausado.estadoChuvaDePixels.atualizadoEm, 4400);
assert.strictEqual(contextoDoMinigamePausado.estadoChuvaDePixels.ultimoPixelEm, 4500);
assert.strictEqual(contextoDoMinigamePausado.estadoSequenciaNeon.proximaMudancaEm, 4600);

[
    "function controlarVisibilidadeDaPagina()",
    "document.addEventListener(\"visibilitychange\", controlarVisibilidadeDaPagina)",
    "definirMenuDaPartidaAberto(true);",
    "function compensarMinigameAposOcultarPagina(duracaoOculta)",
    "minigameFliperamaTerminaEm += duracaoOculta"
].forEach((trecho) => assert.ok(
    codigo.includes(trecho),
    `Pausa automática ausente: ${trecho}`
));

[
    'id="controles-toque-labirinto"',
    'data-direcao-labirinto="arrowup"',
    'data-direcao-labirinto="arrowleft"',
    'data-direcao-labirinto="arrowdown"',
    'data-direcao-labirinto="arrowright"',
    'data-localizar-aria-label="Mover para cima"',
    "styles.css?v=maquina-tempo-1",
    "game.js?v=maquina-tempo-1"
].forEach((trecho) => assert.ok(html.includes(trecho), `Controle móvel ausente: ${trecho}`));

[
    "function alterarDirecaoDoLabirinto(tecla, pressionada)",
    "function controlarToqueDoLabirinto(evento, pressionada)",
    'botao.addEventListener("pointerdown"',
    'botao.addEventListener("pointerup"',
    "function configurarControlesDeToqueDoMinigame()",
    'includes(tipoMinigameFliperamaAtivo)',
    "botao.hidden = usaDirecional && !usaMovimentoVertical && movimentoVertical"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Toque ausente: ${trecho}`));

[
    ".controles-toque-labirinto",
    "(any-pointer: coarse)",
    "flex-direction: column",
    "scroll-snap-type: x proximity",
    "pointer-events: auto"
].forEach((trecho) => assert.ok(css.includes(trecho), `Layout móvel ausente: ${trecho}`));

[
    "### Mudança: simulação independente da taxa de atualização",
    "### Mudança: pausa automática ao ocultar a página",
    "### Mudança: controles de toque do Labirinto Pixel",
    "### Mudança: partida compacta em celulares pequenos"
].forEach((trecho) => assert.ok(
    especificacao.includes(trecho),
    `Especificação ausente: ${trecho}`
));

console.log("Correções de experiência: tempo, pausa e controles móveis validados.");
