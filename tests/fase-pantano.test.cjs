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
    "globalThis.testarFasePantano = function () {",
    "    const fase = CONFIG.fases.find((item) => item.numero === 7);",
    "    assert.strictEqual(fase.tema, 'pantano');",
    "    assert.strictEqual(fase.descricao, 'Pântano Tóxico');",
    "    assert.strictEqual(CONFIG.faseSecreta.numeroInterno, 99);",
    "    assert.strictEqual(CONFIG.torre.limitesPorFase[7], 15);",
    "    assert.strictEqual(CONFIG.torre.limitesPorFase[99], 12);",
    "    assert.strictEqual(CONFIG.audio.musicaDoPantano.intervaloDoPasso, 300);",
    "    assert.strictEqual(CONFIG.audio.musicaDoPantano.volumeRelativo, 3.2);",
    "    const caminho = caminhosDasFases[7];",
    "    const comprimento = caminho.slice(1).reduce((total, ponto, indice) => total + Math.hypot(ponto.x - caminho[indice].x, ponto.y - caminho[indice].y), 0);",
    "    assert.strictEqual(comprimento, 3170);",
    "    assert.strictEqual(caminhosDasFases[99][0].y, 590);",
    "    maiorFaseConcluida = 5;",
    "    assert.strictEqual(faseEstaDesbloqueada(7), false);",
    "    maiorFaseConcluida = 6;",
    "    assert.strictEqual(faseEstaDesbloqueada(7), false);",
    "    capitulo2Desbloqueado = true;",
    "    assert.strictEqual(faseEstaDesbloqueada(7), true);",
    "    faseSelecionada = 7;",
    "    wave = 19;",
    "    iniciarProximaWave();",
    "    assert.strictEqual(inimigosMosquitosDoBrejoParaCriar, 5);",
    "    assert.strictEqual(inimigosSaposVenenososParaCriar, 4);",
    "    assert.strictEqual(inimigosGuardioesDeLodoParaCriar, 3);",
    "    assert.strictEqual(inimigosChefesParaCriar, 1);",
    "    assert.strictEqual(calcularVidaDoBoss(5, 'bossPantano'), 3800);",
    "    assert.strictEqual(calcularVidaDoBoss(10, 'bossPantano'), 4300);",
    "    assert.strictEqual(calcularVidaDoBoss(20, 'bossPantano'), 5300);",
    "    inimigos = [];",
    "    wave = 5;",
    "    criarInimigo('bossPantano');",
    "    const hidra = inimigos[0];",
    "    aplicarDanoAoInimigo(hidra, 1900, 1000);",
    "    assert.strictEqual(hidra.vida, 1900);",
    "    assert.strictEqual(hidra.regeneracaoAtiva, true);",
    "    assert.strictEqual(hidra.regeneracaoAtivadaEm, 1000);",
    "    assert.strictEqual(atualizarRegeneracaoDaHidra(hidra, 60), 40);",
    "    assert.strictEqual(hidra.vida, 1940);",
    "    hidra.vida = hidra.vidaMaxima - 10;",
    "    assert.strictEqual(atualizarRegeneracaoDaHidra(hidra, 60), 10);",
    "    assert.strictEqual(hidra.vida, hidra.vidaMaxima);",
    "    hidra.vida = 0;",
    "    assert.strictEqual(atualizarRegeneracaoDaHidra(hidra, 60), 0);",
    "    assert.doesNotThrow(() => desenharCorpoDoInimigo({ ...hidra, vida: 1800 }, 0, 0, hidra.tamanho * 2));",
    "    assert.doesNotThrow(() => desenharCorpoDoInimigo({ tipo: 'mosquitoDoBrejo' }, 0, 0, 38));",
    "    assert.doesNotThrow(() => desenharCorpoDoInimigo({ tipo: 'sapoVenenoso' }, 0, 0, 58));",
    "    assert.doesNotThrow(() => desenharCorpoDoInimigo({ tipo: 'guardiaoDeLodo' }, 0, 0, 78));",
    "};"
].join(String.fromCharCode(10));

vm.createContext(contexto);
vm.runInContext(codigo, contexto, { filename: "game.js" });
contexto.testarFasePantano();
console.log("Fase 7 Pântano Tóxico: progressão, waves, Hidra e visuais validados.");
