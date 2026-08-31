const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

function criarElemento(id = "") {
    const classes = new Set();
    return {
        id,
        textContent: "",
        innerHTML: "",
        value: id.includes("volume") ? "35" : "",
        disabled: false,
        hidden: false,
        paused: true,
        volume: 0.35,
        currentTime: 0,
        dataset: {},
        style: { setProperty() {} },
        classList: {
            add(...nomes) { nomes.forEach((nome) => classes.add(nome)); },
            remove(...nomes) { nomes.forEach((nome) => classes.delete(nome)); },
            contains(nome) { return classes.has(nome); },
            toggle(nome, forcar) {
                if (forcar === false) classes.delete(nome);
                else classes.add(nome);
            }
        },
        addEventListener() {},
        removeEventListener() {},
        setAttribute(nome, valor) { this[nome] = String(valor); },
        getAttribute(nome) { return this[nome] ?? null; },
        querySelector() { return criarElemento(); },
        querySelectorAll() { return []; },
        replaceChildren() {},
        append() {},
        getBoundingClientRect() {
            return { left: 0, top: 0, width: 1200, height: 700 };
        },
        play() {
            this.paused = false;
            return Promise.resolve();
        },
        pause() { this.paused = true; }
    };
}

const elementos = new Map();
const contextoCanvas = new Proxy({
    measureText(texto) { return { width: String(texto).length * 8 }; },
    createLinearGradient() { return { addColorStop() {} }; },
    createRadialGradient() { return { addColorStop() {} }; }
}, {
    get(alvo, propriedade) {
        return propriedade in alvo ? alvo[propriedade] : () => {};
    },
    set(alvo, propriedade, valor) {
        alvo[propriedade] = valor;
        return true;
    }
});

function obterElemento(id) {
    if (!elementos.has(id)) {
        const elemento = criarElemento(id);
        if (id === "game" || id === "minigame-fliperama") {
            elemento.width = id === "game" ? 1200 : 720;
            elemento.height = id === "game" ? 700 : 420;
            elemento.getContext = () => contextoCanvas;
        }
        elementos.set(id, elemento);
    }
    return elementos.get(id);
}

class AudioFalso {
    constructor() {
        this.volume = 1;
        this.paused = true;
        this.currentTime = 0;
    }
    play() {
        this.paused = false;
        return Promise.resolve();
    }
    pause() { this.paused = true; }
    addEventListener() {}
}

const armazenamento = new Map();
const documento = {
    readyState: "complete",
    getElementById: obterElemento,
    createElement: criarElemento,
    querySelector(seletor) { return obterElemento("query:" + seletor); },
    querySelectorAll() { return []; },
    addEventListener() {},
    removeEventListener() {}
};
const contexto = {
    assert,
    console,
    document: documento,
    localStorage: {
        getItem(chave) { return armazenamento.get(chave) ?? null; },
        setItem(chave, valor) { armazenamento.set(chave, String(valor)); }
    },
    Audio: AudioFalso,
    window: {
        addEventListener() {},
        removeEventListener() {},
        AudioContext: undefined,
        webkitAudioContext: undefined
    },
    requestAnimationFrame() { return 1; },
    cancelAnimationFrame() {},
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Math,
    Date,
    Intl
};
contexto.globalThis = contexto;

let codigo = fs.readFileSync("game.js", "utf8");
codigo += [
    "",
    "globalThis.testarTorreDeEsporos = function () {",
    "    const configuracao = CONFIG.torre.tipos.torreEsporos;",
    "    assert.strictEqual(configuracao.faseConcluidaParaDesbloqueio, 4);",
    "    assert.strictEqual(configuracao.custo, 475);",
    "    assert.strictEqual(configuracao.dano, 42);",
    "    assert.strictEqual(configuracao.raioDanoEmArea, 60);",
    "    assert.strictEqual(configuracao.melhorias.map((m) => [m.custo, m.dano, m.raioDanoEmArea, m.alcance, m.velocidadeAtaque].join(':')).join('|'), '550:58:65:195:950|725:78:72:207:850|950:105:80:220:750');",
    "    maiorFaseConcluida = 3;",
    "    faseSelecionada = 5;",
    "    tipoDeTorreParaConstruir = 'torreEsporos';",
    "    atualizarBotoesDeConstrucao();",
    "    assert.strictEqual(torreEstaDesbloqueada('torreEsporos'), false);",
    "    assert.strictEqual(tipoDeTorreParaConstruir, 'padrao');",
    "    assert.strictEqual(botaoTorreEsporos.disabled, true);",
    "    assert.ok(botaoTorreEsporos.textContent.includes('Conclua Fase 4'));",
    "    faseSelecionada = 4;",
    "    registrarConclusaoDaFase();",
    "    assert.strictEqual(maiorFaseConcluida, 4);",
    "    faseSelecionada = 5;",
    "    atualizarBotoesDeConstrucao();",
    "    assert.strictEqual(torreEstaDesbloqueada('torreEsporos'), true);",
    "    assert.strictEqual(botaoTorreEsporos.disabled, false);",
    "    assert.ok(botaoTorreEsporos.textContent.includes('(475)'));",
    "    faseSelecionada = 1;",
    "    defesasSelecionadasParaPartida.add('torreEsporos');",
    "    tipoDeTorreParaConstruir = 'torreEsporos';",
    "    atualizarBotoesDeConstrucao();",
    "    assert.strictEqual(torreEstaDesbloqueada('torreEsporos'), true);",
    "    assert.strictEqual(tipoDeTorreParaConstruir, 'torreEsporos');",
    "    assert.strictEqual(botaoTorreEsporos.disabled, false);",
    "    inimigos = [{ x: 100, y: 100, vida: 100 }, { x: 160, y: 100, vida: 100 }, { x: 161, y: 100, vida: 100 }];",
    "    explosoesDosExplosivos = [];",
    "    detonarTiroDeEsporos({ alvo: inimigos[0], dano: 42, raioDanoEmArea: 60, duracaoExplosaoEmQuadros: 22, corEsporos: '#d98aba' });",
    "    assert.strictEqual(inimigos.map((inimigo) => inimigo.vida).join(','), '58,58,100');",
    "    assert.strictEqual(explosoesDosExplosivos.length, 1);",
    "    assert.strictEqual(explosoesDosExplosivos[0].tipoVisual, 'esporos');",
    "    assert.doesNotThrow(() => desenharCorpoDaTorre(50, 50, configuracao.visualBase));",
    "    assert.doesNotThrow(() => desenharOrbeDeEsporos({ x: 50, y: 50, corEsporos: '#d98aba' }));",
    "    assert.doesNotThrow(() => desenharNuvemDeEsporos(explosoesDosExplosivos[0], 0.5, 30));",
    "};"
].join(String.fromCharCode(10));

vm.createContext(contexto);
vm.runInContext(codigo, contexto, { filename: "game.js" });
contexto.testarTorreDeEsporos();
console.log("Torre de Esporos: integração validada.");
