const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const inicioDaConfig = codigo.indexOf("const CONFIG = Object.freeze({");
const fimDaConfig = codigo.indexOf("// Cada fase possui", inicioDaConfig);
const inicioDosCaminhos = codigo.indexOf("const caminhosDasFases = Object.freeze({");
const fimDosCaminhos = codigo.indexOf("const temasDoMapa = Object.freeze({", inicioDosCaminhos);
const contextoDaConfig = {};
vm.createContext(contextoDaConfig);
vm.runInContext(
    codigo.slice(inicioDaConfig, fimDaConfig) + "\nglobalThis.CONFIG_TESTE = CONFIG;",
    contextoDaConfig
);
vm.runInContext(
    codigo.slice(inicioDosCaminhos, fimDosCaminhos)
        + "\nglobalThis.CAMINHOS_TESTE = caminhosDasFases;",
    contextoDaConfig
);

const CONFIG = contextoDaConfig.CONFIG_TESTE;
const caminhos = contextoDaConfig.CAMINHOS_TESTE;
const fase13 = CONFIG.linhaDeFrenteTemporal;
const frentes = fase13.frentesTemporais;

assert.deepStrictEqual(Array.from(frentes.wavesDeAtivacao), [2, 5, 8, 11, 14, 17, 20]);
assert.strictEqual(frentes.duracaoDoAvisoMs, 1800);
assert.strictEqual(frentes.duracaoAtivaMs, 6500);
assert.strictEqual(frentes.reforcosPorAbertura, 1);
assert.deepStrictEqual(
    Array.from(frentes.entradas, entrada => [
        entrada.id,
        entrada.indiceDoPontoNoCaminho,
        entrada.tipoDoReforco
    ]),
    [
        ["passado", 2, "raptorAncestral"],
        ["presente", 5, "soldadoCronal"],
        ["futuro", 9, "droneCacador"]
    ]
);
assert.deepStrictEqual(Array.from(fase13.introducao, etapa => etapa.id), ["colisao", "ameaca"]);
assert.ok(fase13.introducao[1].texto.includes("todas as eras entram em guerra"));

assert.strictEqual(CONFIG.inimigo.soldadoCronal.vida, 700);
assert.strictEqual(CONFIG.inimigo.soldadoCronal.velocidade, 0.95);
assert.strictEqual(CONFIG.inimigo.soldadoCronal.duracaoDeCadaFormaMs, 3600);
assert.strictEqual(CONFIG.inimigo.soldadoCronal.reducaoDeDanoNoPassado, 0.2);
assert.strictEqual(CONFIG.inimigo.soldadoCronal.multiplicadorDeVelocidadeNoFuturo, 1.65);
assert.strictEqual(CONFIG.inimigo.portadorDaFenda.vida, 900);
assert.strictEqual(CONFIG.inimigo.portadorDaFenda.duracaoDaFendaMs, 6500);
assert.strictEqual(CONFIG.inimigo.portadorDaFenda.raioDaFenda, 36);
assert.strictEqual(CONFIG.inimigo.portadorDaFenda.distanciaDoTeleporte, 140);

const avisos = [];
const inimigosDasFrentes = [];
const contextoDasFrentes = {
    CONFIG,
    faseSelecionada: 13,
    wave: 2,
    frenteTemporalAtiva: null,
    indiceDaUltimaFrenteTemporal: -1,
    inimigos: inimigosDasFrentes,
    criarInimigo(tipo) {
        inimigosDasFrentes.push({ tipo, indiceDoCaminho: 0, x: 0, y: 350, alvo: 1 });
    },
    obterCaminhoDoInimigo() { return caminhos[13]; },
    localizar(texto, dados = {}) {
        return texto.replace("{era}", dados.era || "");
    },
    mostrarAviso(texto) { avisos.push(texto); }
};
vm.createContext(contextoDasFrentes);
vm.runInContext([
    extrairFuncao("faseAtualUsaLinhaDeFrenteTemporal"),
    extrairFuncao("obterEntradaDaFrenteTemporal"),
    extrairFuncao("criarInimigoNaFrenteTemporal"),
    extrairFuncao("iniciarFrenteTemporalDaWave"),
    extrairFuncao("atualizarFrenteTemporal"),
    extrairFuncao("trocarFrenteTemporalPeloExecutor")
].join("\n"), contextoDasFrentes);

assert.strictEqual(contextoDasFrentes.iniciarFrenteTemporalDaWave(100), true);
assert.strictEqual(contextoDasFrentes.frenteTemporalAtiva.estado, "aviso");
assert.strictEqual(contextoDasFrentes.frenteTemporalAtiva.entrada.id, "passado");
assert.strictEqual(contextoDasFrentes.atualizarFrenteTemporal(1900), true);
assert.strictEqual(contextoDasFrentes.frenteTemporalAtiva.estado, "ativa");
assert.strictEqual(contextoDasFrentes.inimigos[0].tipo, "raptorAncestral");
assert.deepStrictEqual(
    [contextoDasFrentes.inimigos[0].x, contextoDasFrentes.inimigos[0].y, contextoDasFrentes.inimigos[0].alvo],
    [caminhos[13][2].x, caminhos[13][2].y, 3]
);
assert.strictEqual(contextoDasFrentes.trocarFrenteTemporalPeloExecutor(2000), "presente");
assert.strictEqual(contextoDasFrentes.frenteTemporalAtiva.entrada.id, "presente");

const soldado = {
    tipo: "soldadoCronal",
    formaCronal: "passado",
    proximaTrocaDeFormaCronalEm: 4600
};
const contextoDoSoldado = { CONFIG };
vm.createContext(contextoDoSoldado);
vm.runInContext(extrairFuncao("atualizarFormaDoSoldadoCronal"), contextoDoSoldado);
assert.strictEqual(contextoDoSoldado.atualizarFormaDoSoldadoCronal(soldado, 4599), "passado");
assert.strictEqual(contextoDoSoldado.atualizarFormaDoSoldadoCronal(soldado, 4600), "futuro");
assert.strictEqual(contextoDoSoldado.atualizarFormaDoSoldadoCronal(soldado, 8200), "passado");

const avisosDasFendas = [];
const contextoDasFendas = {
    CONFIG,
    fendasDosPortadores: [],
    faseAtualUsaLinhaDeFrenteTemporal() { return true; },
    tipoEhBoss(tipo) { return tipo === "executorCronal"; },
    avancarInimigoNoCaminho(inimigo, distancia) { inimigo.avanco = distancia; },
    localizar(texto) { return texto; },
    mostrarAviso(texto) { avisosDasFendas.push(texto); }
};
vm.createContext(contextoDasFendas);
vm.runInContext([
    extrairFuncao("criarFendaDoPortadorDerrotado"),
    extrairFuncao("tentarTransportarInimigoPelaFendaDoPortador")
].join("\n"), contextoDasFendas);

const portador = { tipo: "portadorDaFenda", x: 320, y: 100, indiceDoCaminho: 0 };
assert.ok(contextoDasFendas.criarFendaDoPortadorDerrotado(portador, 1000));
assert.strictEqual(contextoDasFendas.fendasDosPortadores[0].expiraEm, 7500);
const executor = { tipo: "executorCronal", vida: 1, x: 320, y: 100, indiceDoCaminho: 0 };
assert.strictEqual(contextoDasFendas.tentarTransportarInimigoPelaFendaDoPortador(executor, 1200), false);
const comum = { tipo: "normal", vida: 100, x: 322, y: 100, indiceDoCaminho: 0 };
assert.strictEqual(contextoDasFendas.tentarTransportarInimigoPelaFendaDoPortador(comum, 1200), true);
assert.strictEqual(comum.avanco, 140);
assert.strictEqual(contextoDasFendas.fendasDosPortadores.length, 0);

assert.match(codigo, /function desenharFundoDasFrentesTemporais\(/);
assert.match(codigo, /function desenharEntradaDaFrenteTemporal\(/);
assert.match(codigo, /function desenharSilhuetaDoSenhorDoTempoNoMapa\(/);
assert.match(codigo, /interferenciaVisualDoSenhorDoTempoExpiraEm/);
assert.match(estilos, /data-tipo-carta="introducao-fase-13"/);
assert.match(especificacao, /mecânica \*\*Frentes Temporais\*\*/);
assert.match(especificacao, /\*\*Soldado Cronal\*\*/);
assert.match(especificacao, /\*\*Portador da Fenda\*\*/);

console.log("Fase 13 melhorada: frentes, inimigos, Boss, história e visual validados.");
