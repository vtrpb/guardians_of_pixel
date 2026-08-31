const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const html = fs.readFileSync("index.htm", "utf8");
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
const fase = CONFIG.fases.find(item => item.numero === 9);
const caminho = contextoDaConfig.CAMINHOS_TESTE[9];
const comprimento = caminho.slice(1).reduce(
    (total, ponto, indice) => total
        + Math.hypot(ponto.x - caminho[indice].x, ponto.y - caminho[indice].y),
    0
);

assert.strictEqual(fase.tema, "futurista");
assert.strictEqual(fase.descricao, "Metrópole Neon");
assert.strictEqual(comprimento, 3010);
assert.strictEqual(CONFIG.torre.limitesPorFase[9], 15);
assert.strictEqual(CONFIG.metropoleNeon.multiplicadorVelocidadeNosTrilhos, 1.45);
assert.strictEqual(CONFIG.metropoleNeon.trilhosDeImpulso.length, 3);
assert.strictEqual(CONFIG.metropoleNeon.radio.waveDeAtivacao, 10);
assert.strictEqual(CONFIG.audio.musicaDaMetropoleNeon.intervaloDoPasso, 210);
assert.strictEqual(CONFIG.audio.musicaDaMetropoleNeon.volumeRelativo, 1.8);
assert.deepStrictEqual(Array.from(CONFIG.inimigo.protocoloZero.percentuaisDeVidaParaReversao), [0.65, 0.3]);
assert.ok(CONFIG.maquinaDoTempo.fasesPlanejadasPorEpoca.futuro.includes(9));

assert.match(html, /decoracao-lobby-futurista/);
assert.match(estilos, /\.menu-principal\.tema-futurista/);
assert.match(estilos, /\.fase-tema-futurista/);
assert.match(estilos, /data-tipo-carta="transmissao"/);
assert.match(html, /class="radio-transmissao"[\s\S]*?radio-transmissao-antena[\s\S]*?radio-transmissao-alto-falante/);
assert.match(estilos, /\.radio-transmissao\s*\{[\s\S]*?display: none/);
assert.match(estilos, /data-tipo-carta="transmissao"[\s\S]*?\.radio-transmissao[\s\S]*?background: #42a774/);
assert.match(especificacao, /### Mudança: Fase 9 Metrópole Neon e Projeto Relógio/);
assert.match(especificacao, /rádio clicável do Projeto Relógio/i);
assert.match(codigo, /function desenharRadioProjetoRelogio\(\)[\s\S]*?#ef1818[\s\S]*?#42a774[\s\S]*?#b4a500/);
assert.match(codigo, /"Rádio do Projeto Relógio encontrado!": "Clock Project radio found!"/);
assert.match(codigo, /"Rádio do Projeto Relógio encontrado!": "¡Radio del Proyecto Reloj encontrada!"/);
assert.match(codigo, /deveMostrarTransmissaoProjetoRelogioAposVitoria\(\)[\s\S]*?mostrarTransmissaoProjetoRelogio\(false\)/);

const contextoDaVelocidade = {
    CONFIG,
    Date,
    faseSelecionada: 9,
    pulsoTemporalNormalExpiraEm: 0,
    pulsoTemporalBossExpiraEm: 0,
    tipoEhBoss() { return false; }
};
vm.createContext(contextoDaVelocidade);
vm.runInContext([
    extrairFuncao("faseAtualUsaMetropoleNeon"),
    extrairFuncao("inimigoEstaEmTrilhoDeImpulso"),
    extrairFuncao("oncaEstaEmDisparada"),
    extrairFuncao("javaliEstaEmArrancada"),
    extrairFuncao("obterMultiplicadorDaArrancadaDoJavali"),
    extrairFuncao("obterVelocidadeAtualDoInimigo")
].join("\n"), contextoDaVelocidade);
const drone = { tipo: "droneCacador", x: 220, y: 100, velocidade: 3, vida: 360, vidaMaxima: 360 };
assert.strictEqual(contextoDaVelocidade.obterVelocidadeAtualDoInimigo(drone, 1000), 4.35);
drone.x = 400;
assert.strictEqual(contextoDaVelocidade.obterVelocidadeAtualDoInimigo(drone, 1000), 3);

const alvoProtegido = { tipo: "normal", x: 100, y: 100, vida: 500, vidaMaxima: 500 };
const sentinela = { tipo: "sentinelaDeEscudo", x: 170, y: 100, vida: 1200, vidaMaxima: 1200 };
const contextoDoEscudo = {
    CONFIG,
    Date,
    Math,
    inimigos: [alvoProtegido, sentinela],
    ativarErupcaoDoTita() {},
    mostrarAviso() {},
    localizar(texto) { return texto; }
};
vm.createContext(contextoDoEscudo);
vm.runInContext([
    extrairFuncao("obterReducaoDoEscudoParaInimigo"),
    extrairFuncao("aplicarDanoAoInimigo")
].join("\n"), contextoDoEscudo);
assert.strictEqual(contextoDoEscudo.aplicarDanoAoInimigo(alvoProtegido, 100, 1000), 75);
assert.strictEqual(alvoProtegido.vida, 425);

const aliadoFerido = { tipo: "normal", x: 140, y: 100, vida: 20, vidaMaxima: 100 };
const reparador = { tipo: "roboReparador", x: 100, y: 100, vida: 700, vidaMaxima: 700, proximoReparoEm: 900 };
const contextoDoReparo = { CONFIG, Date, Math, inimigos: [reparador, aliadoFerido] };
vm.createContext(contextoDoReparo);
vm.runInContext(extrairFuncao("atualizarReparoDoRobo"), contextoDoReparo);
assert.strictEqual(contextoDoReparo.atualizarReparoDoRobo(reparador, 1000), 45);
assert.strictEqual(aliadoFerido.vida, 65);
assert.strictEqual(contextoDoReparo.atualizarReparoDoRobo(reparador, 1001), 0);

const mensagens = [];
const protocolo = {
    tipo: "protocoloZero",
    indiceDoCaminho: 0,
    x: 0,
    y: 350,
    alvo: 1,
    vida: 1400,
    vidaMaxima: 5400,
    reversoesTemporaisRealizadas: 0
};
const contextoDaReversao = {
    CONFIG,
    Date,
    Math,
    mostrarAviso(mensagem) { mensagens.push(mensagem); },
    localizar(texto) { return texto; },
    obterCaminhoDoInimigo() { return caminho; }
};
vm.createContext(contextoDaReversao);
vm.runInContext([
    extrairFuncao("calcularProgressoDoInimigo"),
    extrairFuncao("posicionarInimigoNoProgressoDoCaminho"),
    extrairFuncao("recuarInimigoNoCaminho"),
    extrairFuncao("ativarReversaoDeEmergencia")
].join("\n"), contextoDaReversao);
contextoDaReversao.posicionarInimigoNoProgressoDoCaminho(protocolo, 1000);
assert.strictEqual(contextoDaReversao.ativarReversaoDeEmergencia(protocolo, 1000), 2);
assert.strictEqual(protocolo.reversoesTemporaisRealizadas, 2);
assert.strictEqual(protocolo.vida, 2264);
assert.strictEqual(Math.round(contextoDaReversao.calcularProgressoDoInimigo(protocolo)), 520);
assert.strictEqual(mensagens.length, 1);

console.log("Fase 9 Metrópole Neon: mapa, trilhos, suporte, Boss e transmissão validados.");
