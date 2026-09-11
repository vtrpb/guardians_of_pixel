const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const inicioDaConfig = codigo.indexOf("const CONFIG = Object.freeze({");
const fimDaConfig = codigo.indexOf("// Cada fase possui", inicioDaConfig);
const contextoDaConfig = {};
vm.createContext(contextoDaConfig);
vm.runInContext(
    codigo.slice(inicioDaConfig, fimDaConfig) + "\nglobalThis.CONFIG_TESTE = CONFIG;",
    contextoDaConfig
);
const CONFIG = contextoDaConfig.CONFIG_TESTE;

assert.ok(html.includes('id="botao-torre-varredura"'));
assert.ok(html.includes("selecionarTipoDeTorre('torreDeVarredura')"));
assert.ok(html.includes("build=salvos-28"));
assert.ok(estilos.includes(".botao-construcao-varredura"));
assert.ok(estilos.includes('[data-etapa-cena="fichaTecnica"]'));
assert.ok(especificacao.includes("### Mudança: Protótipo V-13 e inimigos camuflados"));

const torre = CONFIG.torre.tipos.torreDeVarredura;
assert.deepStrictEqual(
    {
        fase: torre.faseConcluidaParaDesbloqueio,
        custo: torre.custo,
        alcance: torre.alcance,
        dano: torre.dano,
        ataque: torre.velocidadeAtaque,
        detecta: torre.detectaCamuflados,
        melhorias: torre.melhorias.length
    },
    {
        fase: 13,
        custo: 150,
        alcance: 170,
        dano: 12,
        ataque: 500,
        detecta: true,
        melhorias: 3
    }
);

const infiltrador = CONFIG.inimigo.infiltradorCamuflado;
assert.deepStrictEqual(
    {
        vida: infiltrador.vida,
        velocidade: infiltrador.velocidade,
        tamanho: infiltrador.tamanho,
        camuflado: infiltrador.camuflado
    },
    { vida: 180, velocidade: 1.85, tamanho: 24, camuflado: true }
);
assert.strictEqual(CONFIG.eraApagada.waves.primeiraWaveInfiltradorCamuflado, 2);
assert.strictEqual(CONFIG.eraApagada.waves.wavesPorNovoInfiltradorCamuflado, 4);
assert.deepStrictEqual(
    Array.from(CONFIG.linhaDeFrenteTemporal.cenaFinal.etapas, etapa => etapa.id).slice(-3),
    ["prototipo", "fichaTecnica", "camuflados"]
);
assert.deepStrictEqual(
    Array.from(CONFIG.eraApagada.introducao, etapa => etapa.id).slice(-2),
    ["inimigosCamuflados", "respostaPrototipo"]
);

const inimigoComum = { x: 40, y: 0, vida: 100, camuflado: false };
const inimigoCamuflado = { x: 60, y: 0, vida: 100, camuflado: true };
const contextoDosAlvos = {
    Math,
    CONFIG,
    inimigos: [inimigoComum, inimigoCamuflado],
    obterAlcanceAtualDaTorre() { return 100; }
};
vm.createContext(contextoDosAlvos);
vm.runInContext([
    extrairFuncao("tipoDeDefesaPodeDetectarInimigo"),
    extrairFuncao("torrePodeDetectarInimigo"),
    extrairFuncao("obterInimigosNoAlcanceDaTorre")
].join("\n"), contextoDosAlvos);
assert.deepStrictEqual(
    contextoDosAlvos.obterInimigosNoAlcanceDaTorre({ tipo: "padrao", x: 0, y: 0 }),
    [inimigoComum]
);
assert.deepStrictEqual(
    contextoDosAlvos.obterInimigosNoAlcanceDaTorre({ tipo: "torreDeVarredura", x: 0, y: 0 }),
    [inimigoComum, inimigoCamuflado]
);

const alvosDeArea = [
    { x: 0, y: 0, vida: 100, camuflado: false },
    { x: 0, y: 0, vida: 100, camuflado: true }
];
const contextoDaArea = {
    Math,
    Date,
    CONFIG,
    inimigos: alvosDeArea,
    aplicarDanoAoInimigo(inimigo, dano) { inimigo.vida -= dano; }
};
vm.createContext(contextoDaArea);
vm.runInContext([
    extrairFuncao("tipoDeDefesaPodeDetectarInimigo"),
    extrairFuncao("obterInimigosVivosNaArea"),
    extrairFuncao("aplicarDanoEmArea")
].join("\n"), contextoDaArea);
contextoDaArea.aplicarDanoEmArea(0, 0, 20, 25, null, 1000, "torreEsporos");
assert.deepStrictEqual(alvosDeArea.map(alvo => alvo.vida), [75, 100]);
contextoDaArea.aplicarDanoEmArea(0, 0, 20, 25, null, 1000, "torreDeVarredura");
assert.deepStrictEqual(alvosDeArea.map(alvo => alvo.vida), [50, 75]);

const contextoDaEquipe = { CONFIG };
vm.createContext(contextoDaEquipe);
vm.runInContext(extrairFuncao("incluirTorreDeVarreduraNaSelecao"), contextoDaEquipe);
assert.deepStrictEqual(
    Array.from(contextoDaEquipe.incluirTorreDeVarreduraNaSelecao(
        new Set(["padrao", "canhaoPesado", "torreGlacial", "torreBesta", "torreEsporos", "obliterador"])
    )),
    ["padrao", "canhaoPesado", "torreGlacial", "torreBesta", "torreEsporos", "torreDeVarredura"]
);

const codigoSecundario = fs.readFileSync(
    path.join(raiz, "tower defense 2", "game.js"),
    "utf8"
);
const htmlSecundario = fs.readFileSync(
    path.join(raiz, "tower defense 2", "index.htm"),
    "utf8"
);
assert.ok(codigoSecundario.includes("torreDeVarredura: Object.freeze({"));
assert.ok(codigoSecundario.includes("infiltradorCamuflado: Object.freeze({"));
assert.ok(htmlSecundario.includes("build=salvos-28"));

console.log("Protótipo V-13: desbloqueio, camuflagem, detecção e história validados.");
