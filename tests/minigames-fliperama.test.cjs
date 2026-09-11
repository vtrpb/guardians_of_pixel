const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

const contextoDasWaves = {
    CONFIG: { fliperama: { intervaloDeAparicao: 4 } }
};
vm.createContext(contextoDasWaves);
vm.runInContext(extrairFuncao("waveDeveExibirFliperama"), contextoDasWaves);
assert.deepStrictEqual(
    Array.from({ length: 24 }, (_, indice) => indice + 1)
        .filter(numeroDaWave => contextoDasWaves.waveDeveExibirFliperama(numeroDaWave)),
    [4, 8, 12, 16, 20, 24]
);

const contextoDaContagem = {
    Date,
    minigameFliperamaAtivo: true,
    minigameFliperamaComecaEm: 4000
};
vm.createContext(contextoDaContagem);
vm.runInContext([
    extrairFuncao("minigamePodeReceberEntrada"),
    extrairFuncao("obterNumeroDaContagemRegressiva")
].join("\n"), contextoDaContagem);
assert.strictEqual(contextoDaContagem.obterNumeroDaContagemRegressiva(1000), 3);
assert.strictEqual(contextoDaContagem.obterNumeroDaContagemRegressiva(2001), 2);
assert.strictEqual(contextoDaContagem.obterNumeroDaContagemRegressiva(3001), 1);
assert.strictEqual(contextoDaContagem.minigamePodeReceberEntrada(3999), false);
assert.strictEqual(contextoDaContagem.minigamePodeReceberEntrada(4000), true);

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

const configuracao = {
    fliperama: {
        minigame: {
            tiposDisponiveis: ["alvo", "labirinto", "voo", "coleta", "sequencia"],
            duracaoDaContagemRegressiva: 3000,
            voo: {
                portaisNecessarios: 5,
                xDoRobo: 140,
                yInicialDoRobo: 210,
                raioDoRobo: 14,
                gravidade: 900,
                impulso: -360,
                velocidadeDosPortais: 190,
                larguraDoPortal: 52,
                alturaDoVao: 150,
                distanciaInicial: 760,
                espacamentoDosPortais: 230,
                centrosDosVaos: [125, 285, 180, 305, 135]
            },
            coleta: {
                pixelsNecessarios: 8,
                velocidadeDoColetor: 340,
                larguraDoColetor: 84,
                alturaDoColetor: 24,
                yDoColetor: 370,
                tamanhoDoPixel: 22,
                velocidadeDosPixels: 235,
                intervaloEntrePixels: 600,
                frequenciaDePixelCorrompido: 4,
                posicoesDeSurgimento: [70, 180, 310, 450, 640, 540, 245, 110, 390, 665]
            },
            sequencia: {
                quantidadeDeSinais: 5,
                atrasoInicial: 600,
                intervaloEntreSinais: 450,
                duracaoDoSinal: 260,
                duracaoDoRetorno: 240,
                recompensaEmCreditos: 200
            }
        }
    }
};

const resultadosDoVoo = [];
const contextoDoVoo = {
    CONFIG: configuracao,
    Math,
    Date,
    canvasMinigameFliperama: { width: 720, height: 420 },
    estadoVooPixel: null,
    tipoMinigameFliperamaAtivo: "voo",
    finalizarMinigameFliperama(...argumentos) {
        resultadosDoVoo.push(argumentos);
    }
};
vm.createContext(contextoDoVoo);
vm.runInContext([
    extrairFuncao("iniciarEstadoDoVooPixel"),
    extrairFuncao("impulsionarRoboDoVooPixel"),
    extrairFuncao("roboDoVooTocaPortal"),
    extrairFuncao("atualizarVooPixel")
].join("\n"), contextoDoVoo);
contextoDoVoo.iniciarEstadoDoVooPixel(1000);
assert.strictEqual(contextoDoVoo.impulsionarRoboDoVooPixel(), true);
assert.strictEqual(contextoDoVoo.estadoVooPixel.velocidadeY, -360);
contextoDoVoo.estadoVooPixel.velocidadeY = 0;
contextoDoVoo.estadoVooPixel.portais[0].x = 0;
contextoDoVoo.atualizarVooPixel(1000);
assert.strictEqual(contextoDoVoo.estadoVooPixel.pontos, 1);
contextoDoVoo.iniciarEstadoDoVooPixel(2000);
contextoDoVoo.estadoVooPixel.portais[0].x = 130;
contextoDoVoo.atualizarVooPixel(2000);
assert.deepStrictEqual(resultadosDoVoo.at(-1), [false, "colisao"]);

const resultadosDaColeta = [];
const contextoDaColeta = {
    CONFIG: configuracao,
    Date,
    canvasMinigameFliperama: { width: 720, height: 420 },
    estadoChuvaDePixels: null,
    teclasPressionadasNoLabirinto: new Set(),
    obterDirecaoPelasTeclas() { return { x: 0, y: 0 }; },
    finalizarMinigameFliperama(...argumentos) {
        resultadosDaColeta.push(argumentos);
    }
};
vm.createContext(contextoDaColeta);
vm.runInContext([
    extrairFuncao("retangulosSeSobrepoem"),
    extrairFuncao("iniciarEstadoDaChuvaDePixels"),
    extrairFuncao("criarPixelDaChuva"),
    extrairFuncao("atualizarChuvaDePixels")
].join("\n"), contextoDaColeta);
contextoDaColeta.iniciarEstadoDaChuvaDePixels(1000);
contextoDaColeta.estadoChuvaDePixels.ultimoPixelEm = 1000;
contextoDaColeta.estadoChuvaDePixels.pixels.push({
    x: 360,
    y: 370,
    corrompido: false
});
contextoDaColeta.atualizarChuvaDePixels(1000);
assert.strictEqual(contextoDaColeta.estadoChuvaDePixels.coletados, 1);
contextoDaColeta.estadoChuvaDePixels.pixels.push({
    x: 360,
    y: 370,
    corrompido: true
});
contextoDaColeta.atualizarChuvaDePixels(1000);
assert.strictEqual(contextoDaColeta.estadoChuvaDePixels.coletados, 0);
assert.deepStrictEqual(resultadosDaColeta, []);

const resultadosDaSequencia = [];
const contextoDaSequencia = {
    CONFIG: configuracao,
    Math,
    Date,
    estadoSequenciaNeon: null,
    finalizarMinigameFliperama(...argumentos) {
        resultadosDaSequencia.push(argumentos);
    }
};
vm.createContext(contextoDaSequencia);
vm.runInContext([
    extrairFuncao("iniciarEstadoDaSequenciaNeon"),
    extrairFuncao("atualizarSequenciaNeon"),
    extrairFuncao("registrarSinalDaSequenciaNeon")
].join("\n"), contextoDaSequencia);
contextoDaSequencia.iniciarEstadoDaSequenciaNeon(1000);
contextoDaSequencia.estadoSequenciaNeon.sinais = [0, 1, 2, 3, 0];
contextoDaSequencia.estadoSequenciaNeon.exibindo = false;
contextoDaSequencia.registrarSinalDaSequenciaNeon(3, 2000);
assert.strictEqual(contextoDaSequencia.estadoSequenciaNeon.indiceDoJogador, 0);
for (const sinal of [0, 1, 2, 3, 0]) {
    contextoDaSequencia.registrarSinalDaSequenciaNeon(sinal, 2100);
}
assert.deepStrictEqual(resultadosDaSequencia, [[true]]);

[
    "tiposDisponiveis: Object.freeze([",
    '"voo",',
    '"coleta",',
    '"sequencia"',
    "function desenharVooPixel()",
    "function desenharChuvaDePixels()",
    "function desenharSequenciaNeon(agora = Date.now())",
    "recompensaEmCreditos: 200",
    "duracaoDaContagemRegressiva: 3000",
    "function desenharContagemRegressivaDoMinigame",
    'tipoMinigameFliperamaAtivo === "sequencia"',
    'tipoMinigameFliperamaAtivo === "coleta"'
].forEach(trecho => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

assert.ok(html.includes('id="minigame-fliperama"'));
assert.ok(html.includes('tabindex="0"'));
assert.ok(html.includes('id="rotulo-tempo-minigame-fliperama"'));
for (const tipo of ["voo", "coleta", "sequencia"]) {
    assert.ok(css.includes(`[data-tipo="${tipo}"]`), `Tema ausente para ${tipo}`);
}
assert.ok(especificacao.includes("#### Mudança: três novos minigames do fliperama"));
assert.ok(especificacao.includes("#### Mudança: frequência do fliperama"));
assert.ok(especificacao.includes("#### Mudança: contagem regressiva dos minigames"));
assert.ok(especificacao.includes("**Voo Pixel**"));
assert.ok(especificacao.includes("**Chuva de Pixels**"));
assert.ok(especificacao.includes("**Sequência Neon**"));

for (const texto of [
    '"Voo Pixel":',
    '"Chuva de Pixels":',
    '"Sequência Neon":',
    '"Começa em":',
    '"Prepare-se!":',
    '"O robô colidiu. Tente novamente no próximo fliperama.":'
]) {
    assert.strictEqual(
        codigo.split(texto).length - 1,
        2,
        `Traduções em inglês e espanhol ausentes: ${texto}`
    );
}

console.log("Novos minigames: voo, coleta e sequência validados.");
