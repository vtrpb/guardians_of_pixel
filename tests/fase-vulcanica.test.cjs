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
    "globalThis.testarFaseVulcanica = function () {",
    "    const fase = CONFIG.fases.find((item) => item.numero === 6);",
    "    assert.strictEqual(fase.tema, 'vulcanica');",
    "    assert.strictEqual(CONFIG.torre.limitesPorFase[6], 15);",
    "    assert.strictEqual(CONFIG.audio.musicaDaForja.intervaloDoPasso, 240);",
    "    assert.strictEqual(CONFIG.audio.musicaDaForja.volumeRelativo, 1.55);",
    "    const caminho = caminhosDasFases[6];",
    "    const comprimento = caminho.slice(1).reduce((total, ponto, indice) => total + Math.hypot(ponto.x - caminho[indice].x, ponto.y - caminho[indice].y), 0);",
    "    assert.strictEqual(comprimento, 3050);",
    "    assert.strictEqual(CONFIG.inimigo.bossVulcanico.incrementoVidaPorAparicao, 0);",
    "    assert.strictEqual(calcularQuantidadeDeFragmentosDoTita(5), 2);",
    "    assert.strictEqual(calcularQuantidadeDeFragmentosDoTita(10), 3);",
    "    assert.strictEqual(calcularQuantidadeDeFragmentosDoTita(20), 5);",
    "    maiorFaseConcluida = 4;",
    "    assert.strictEqual(torreEstaDesbloqueada('obliterador'), false);",
    "    maiorFaseConcluida = 5;",
    "    assert.strictEqual(torreEstaDesbloqueada('obliterador'), true);",
    "    faseSelecionada = 6;",
    "    wave = 19;",
    "    iniciarProximaWave();",
    "    assert.strictEqual(inimigosMorcegosDeFogoParaCriar, 5);",
    "    assert.strictEqual(inimigosLagartosVulcanicosParaCriar, 4);",
    "    assert.strictEqual(inimigosGolemsDeMagmaParaCriar, 3);",
    "    assert.strictEqual(inimigosChefesParaCriar, 1);",
    "    inimigos = [];",
    "    wave = 5;",
    "    criarInimigo('bossVulcanico');",
    "    const tita = inimigos[0];",
    "    aplicarDanoAoInimigo(tita, 2000, 1000);",
    "    assert.strictEqual(tita.vida, 1600);",
    "    assert.strictEqual(tita.formaDeErupcao, true);",
    "    assert.strictEqual(inimigos.filter((inimigo) => inimigo.tipo === 'fragmentoDeMagma').length, 2);",
    "    assert.strictEqual(obterVelocidadeAtualDoInimigo(tita, 1001), 1.05 * 1.65);",
    "    aplicarDanoAoInimigo(tita, 100, 1002);",
    "    assert.strictEqual(tita.vida, 1500);",
    "    assert.strictEqual(inimigos.filter((inimigo) => inimigo.tipo === 'fragmentoDeMagma').length, 2);",
    "    const alvo = { tipo: 'normal', indiceDoCaminho: 0, x: 80, y: 350, alvo: 1, vida: 1000, vidaMaxima: 1000, tamanho: 20, velocidade: 1.5, cor: 'red' };",
    "    inimigos = [alvo];",
    "    assert.strictEqual(CONFIG.torre.tipos.obliterador.dano, 38);",
    "    assert.deepStrictEqual(Array.from(CONFIG.torre.tipos.obliterador.melhorias, (melhoria) => melhoria.dano), [52, 70, 96]);",
    "    torres = [{ x: 20, y: 350, tipo: 'obliterador', nivel: 0, dano: 38, alcance: 230, velocidadeAtaque: 1600, velocidadeTiro: 13, ultimoTiro: 0, modoDeAlvo: 'primeiro' }];",
    "    tiros = [];",
    "    dinheiro = 0;",
    "    atacarComTorres(2000);",
    "    assert.strictEqual(tiros.length, 3);",
    "    assert.strictEqual(dinheiro, obterRecompensaPorTiro());",
    "    assert.doesNotThrow(() => desenharCorpoDaTorre(50, 50, CONFIG.torre.tipos.obliterador.visualBase));",
    "    assert.doesNotThrow(() => desenharCorpoDoInimigo(tita, 0, 0, tita.tamanho * 2));",
    "};"
].join(String.fromCharCode(10));

vm.createContext(contexto);
vm.runInContext(codigo, contexto, { filename: "game.js" });
contexto.testarFaseVulcanica();
console.log("Fase 6 vulcânica: progressão, waves, Boss e Obliterador validados.");
