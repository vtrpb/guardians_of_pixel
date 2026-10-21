const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
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

const CONFIG = require("./apoio/codigo-jogo.cjs").carregarConfig();

assert.strictEqual(CONFIG.elementos.tipos.fogo.multiplicadorDeVantagem, 1.35);
assert.strictEqual(CONFIG.elementos.tipos.gelo.multiplicadorDeVantagem, 1.25);
assert.strictEqual(CONFIG.elementos.tipos.eletrico.multiplicadorDeVantagem, 1.3);
assert.strictEqual(CONFIG.elementos.tipos.sismico.multiplicadorDeVantagem, 1.25);
assert.strictEqual(CONFIG.elementos.tipos.toxico.multiplicadorDeVantagem, 1.25);
assert.strictEqual(CONFIG.elementos.duracaoDoAvisoSuperEfetivoMs, 700);

assert.strictEqual(CONFIG.torre.tipos.torreGlacial.elemento, "gelo");
assert.strictEqual(CONFIG.torre.tipos.minaCongelante.elemento, "gelo");
assert.strictEqual(CONFIG.torre.tipos.torreDeRaios.elemento, "eletrico");
assert.strictEqual(CONFIG.torre.tipos.minaDePulso.elemento, "eletrico");
assert.strictEqual(CONFIG.torre.tipos.lancaChamas.elemento, "fogo");
assert.strictEqual(CONFIG.torre.tipos.torreSismica.elemento, "sismico");
assert.strictEqual(CONFIG.torre.tipos.torreEsporos.elemento, "toxico");
assert.strictEqual(CONFIG.torre.tipos.minaCorrosiva.elemento, "toxico");
assert.strictEqual(CONFIG.torre.tipos.padrao.elemento, undefined);

const eventosDeMorte = [];
const contexto = {
    CONFIG, Date, Math,
    tentarSoltarNucleo(inimigo) { eventosDeMorte.push(["nucleo", inimigo]); },
    registrarGolpeFinalParaConquistas(inimigo, torre) { eventosDeMorte.push(["conquista", inimigo, torre]); }
};
vm.createContext(contexto);
vm.runInContext([
    extrairFuncao("obterConfiguracaoDoElemento"),
    extrairFuncao("obterCaracteristicasElementaisDoInimigo"),
    extrairFuncao("obterVantagemElementalDoAtaque"),
    extrairFuncao("obterFormaDoCarcereiroDoIntervalo"),
    extrairFuncao("obterVantagemElementalContraInimigo"),
    require("./apoio/codigo-jogo.cjs").extrairFuncao("ativarConvocacaoDoInimigo"),
    extrairFuncao("aplicarDanoAoInimigo")
].join("\n"), contexto);

function criarAlvo(tipo) {
    return { tipo, vida: 1000, vidaMaxima: 1000 };
}

const alvoDeGelo = criarAlvo("loboDeGelo");
assert.strictEqual(
    contexto.aplicarDanoAoInimigo(alvoDeGelo, 100, 1000, { elemento: "fogo" }),
    135
);
assert.strictEqual(alvoDeGelo.avisoSuperEfetivoExpiraEm, 1700);
assert.strictEqual(alvoDeGelo.corDoAvisoSuperEfetivo, CONFIG.elementos.tipos.fogo.cor);

const alvoDoMesmoElemento = criarAlvo("loboDeGelo");
assert.strictEqual(
    contexto.aplicarDanoAoInimigo(
        alvoDoMesmoElemento,
        100,
        1000,
        { elemento: "gelo" }
    ),
    100,
    "Gelo contra inimigo de gelo deve manter o dano normal"
);
assert.strictEqual(alvoDoMesmoElemento.avisoSuperEfetivoExpiraEm, undefined);

assert.strictEqual(
    contexto.aplicarDanoAoInimigo(
        criarAlvo("morcegoDeFogo"),
        100,
        1000,
        { elemento: "gelo" }
    ),
    125
);
assert.strictEqual(
    contexto.aplicarDanoAoInimigo(
        criarAlvo("droneCacador"),
        100,
        1000,
        { elemento: "eletrico" }
    ),
    130
);
assert.strictEqual(
    contexto.aplicarDanoAoInimigo(
        criarAlvo("triceratopo"),
        100,
        1000,
        { elemento: "sismico" }
    ),
    125
);
assert.strictEqual(
    contexto.aplicarDanoAoInimigo(
        criarAlvo("loboDeGelo"),
        100,
        1000,
        { elemento: "toxico" }
    ),
    125
);
assert.strictEqual(
    contexto.aplicarDanoAoInimigo(criarAlvo("loboDeGelo"), 100, 1000),
    100
);

const alvoFinal = criarAlvo("loboDeGelo");
alvoFinal.vida = 100;
const torreOrigem = { tipo: "lancaChamas" };
assert.strictEqual(contexto.aplicarDanoAoInimigo(alvoFinal, 0, 1000), 0);
assert.strictEqual(contexto.aplicarDanoAoInimigo(alvoFinal, -10, 1000), 0);
assert.strictEqual(alvoFinal.vida, 100);
contexto.aplicarDanoAoInimigo(alvoFinal, 100, 1000, {
    elemento: "fogo", tipoDaDefesa: "lancaChamas", torreOrigem
});
assert.ok(alvoFinal.vida <= 0);
assert.strictEqual(alvoFinal.defesaDoGolpeFinal, "lancaChamas");
assert.deepStrictEqual(eventosDeMorte, [["nucleo", alvoFinal], ["conquista", alvoFinal, torreOrigem]]);
assert.strictEqual(contexto.aplicarDanoAoInimigo(alvoFinal, 100, 1100), 0);
assert.strictEqual(eventosDeMorte.length, 2, "Um alvo morto não concede outro drop ou conquista");

[
    "elemento: configuracaoBase.elemento || null",
    "elemento: tiro.elemento",
    "tiro.elemento,\n        agora,",
    "configuracao.elemento,\n        agora",
    "inimigo.elementoDaQueimadura"
].forEach((trecho) => assert.ok(
    codigo.includes(trecho),
    `Propagação elemental ausente: ${trecho}`
));

assert.ok(especificacao.includes("### Mudança: vantagens elementais"));
assert.ok(especificacao.includes(
    "Atacar um inimigo com o mesmo elemento causa o dano normal"
));
assert.ok(especificacao.includes("SUPER EFETIVO!"));

console.log("Dano elemental: vantagens, dano normal do mesmo elemento e feedback validados.");
