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
    codigo.slice(inicioDaConfig, fimDaConfig)
        + "\nglobalThis.CONFIG_TESTE = CONFIG;",
    contextoDaConfig
);
vm.runInContext(
    codigo.slice(inicioDosCaminhos, fimDosCaminhos)
        + "\nglobalThis.CAMINHOS_TESTE = caminhosDasFases;",
    contextoDaConfig
);

const CONFIG = contextoDaConfig.CONFIG_TESTE;
const fase = CONFIG.fases.find(item => item.numero === 8);
assert.strictEqual(fase.tema, "primordial");
assert.strictEqual(fase.descricao, "Selva Primordial");
assert.strictEqual(CONFIG.torre.limitesPorFase[8], 15);
assert.strictEqual(CONFIG.audio.musicaDaSelvaPrimordial.intervaloDoPasso, 230);
assert.strictEqual(CONFIG.audio.musicaDaSelvaPrimordial.volumeRelativo, 1.7);
assert.deepStrictEqual(
    Array.from(CONFIG.inimigo.bossPrimordial.percentuaisDeVidaParaChamado),
    [0.6, 0.3]
);
assert.strictEqual(CONFIG.inimigo.besouroDeAmbar.reducaoDeDano, 0.2);
assert.strictEqual(CONFIG.pulsoTemporal.faseConcluidaParaDesbloqueio, 8);
assert.strictEqual(CONFIG.pulsoTemporal.wavesParaRecarregar, 5);
assert.strictEqual(CONFIG.caminhoVivo.numeroDaFase, 8);
assert.strictEqual(CONFIG.caminhoVivo.primeiraWaveDoCaminhoBaixo, 6);
assert.strictEqual(CONFIG.caminhoVivo.primeiraWaveDaAlternancia, 11);

const caminhos = contextoDaConfig.CAMINHOS_TESTE[8];
const comprimentos = caminhos.map(caminho => caminho.slice(1).reduce(
    (total, ponto, indice) => total
        + Math.hypot(ponto.x - caminho[indice].x, ponto.y - caminho[indice].y),
    0
));
assert.deepStrictEqual(Array.from(comprimentos), [3200, 3180, 2320]);

const mensagensDosCaminhos = [];
const contextoDosCaminhos = {
    CONFIG,
    faseSelecionada: 8,
    wave: 1,
    proximoIndiceDeEntrada: 0,
    localizar(texto, variaveis = {}) {
        return Object.entries(variaveis).reduce(
            (resultado, [nome, valor]) => resultado.replaceAll(`{${nome}}`, valor),
            texto
        );
    },
    mostrarAviso(mensagem) { mensagensDosCaminhos.push(mensagem); },
    obterCaminhosAtuais() { return caminhos; }
};
vm.createContext(contextoDosCaminhos);
vm.runInContext([
    extrairFuncao("faseAtualUsaCaminhoVivo"),
    extrairFuncao("obterIndiceDoCaminhoVivoNaWave"),
    extrairFuncao("waveAbreAtalhoDoTirano"),
    extrairFuncao("obterIndiceDoCaminhoParaNovoInimigo"),
    extrairFuncao("obterNomeDoCaminhoVivo"),
    extrairFuncao("avisarProximoCaminhoVivo")
].join("\n"), contextoDosCaminhos);
assert.strictEqual(contextoDosCaminhos.obterIndiceDoCaminhoVivoNaWave(1), 0);
assert.strictEqual(contextoDosCaminhos.obterIndiceDoCaminhoVivoNaWave(5), 0);
assert.strictEqual(contextoDosCaminhos.obterIndiceDoCaminhoVivoNaWave(6), 1);
assert.strictEqual(contextoDosCaminhos.obterIndiceDoCaminhoVivoNaWave(10), 1);
assert.strictEqual(contextoDosCaminhos.obterIndiceDoCaminhoVivoNaWave(11), 0);
assert.strictEqual(contextoDosCaminhos.obterIndiceDoCaminhoVivoNaWave(12), 1);
contextoDosCaminhos.wave = 10;
assert.strictEqual(contextoDosCaminhos.waveAbreAtalhoDoTirano(), true);
assert.strictEqual(contextoDosCaminhos.obterIndiceDoCaminhoParaNovoInimigo("normal"), 1);
assert.strictEqual(contextoDosCaminhos.obterIndiceDoCaminhoParaNovoInimigo("bossPrimordial"), 2);
contextoDosCaminhos.wave = 5;
contextoDosCaminhos.avisarProximoCaminhoVivo(6);
assert.match(mensagensDosCaminhos.at(-1), /Caminho Baixo/);
contextoDosCaminhos.wave = 9;
contextoDosCaminhos.avisarProximoCaminhoVivo(10);
assert.match(mensagensDosCaminhos.at(-1), /atalho aberto/);

const quantidadeExclusiva = (wave, primeira, intervalo) => (
    wave < primeira ? 0 : 1 + Math.floor((wave - primeira) / intervalo)
);
assert.strictEqual(quantidadeExclusiva(20, 3, 4), 5);
assert.strictEqual(quantidadeExclusiva(20, 5, 4), 4);
assert.strictEqual(quantidadeExclusiva(20, 7, 5), 3);

const contextoDaBatalha = {
    CONFIG,
    Date,
    Math,
    inimigos: [],
    mostrarAviso() {},
    localizar(texto) { return texto; },
    obterCaminhoDoInimigo(inimigo) { return caminhos[inimigo.indiceDoCaminho]; }
};
vm.createContext(contextoDaBatalha);
vm.runInContext([
    extrairFuncao("criarInimigoInvocado"),
    extrairFuncao("ativarChamadoDaMatilha"),
    extrairFuncao("aplicarDanoAoInimigo")
].join("\n"), contextoDaBatalha);

const tirano = {
    tipo: "bossPrimordial",
    indiceDoCaminho: 2,
    x: 330,
    y: 180,
    alvo: 3,
    vida: 4800,
    vidaMaxima: 4800,
    chamadosPrimordiaisRealizados: 0
};
contextoDaBatalha.aplicarDanoAoInimigo(tirano, 3500, 1000);
assert.strictEqual(tirano.vida, 1300);
assert.strictEqual(tirano.chamadosPrimordiaisRealizados, 2);
assert.strictEqual(contextoDaBatalha.inimigos.length, 4);
assert.ok(contextoDaBatalha.inimigos.every(inimigo => inimigo.tipo === "raptorAncestral"));
assert.ok(contextoDaBatalha.inimigos.every(inimigo => inimigo.indiceDoCaminho === 2));

const besouro = { tipo: "besouroDeAmbar", vida: 850, vidaMaxima: 850 };
assert.strictEqual(contextoDaBatalha.aplicarDanoAoInimigo(besouro, 100, 1000), 80);
assert.strictEqual(besouro.vida, 770);

const contextoDoPulso = {
    CONFIG,
    Date,
    Math,
    maiorFaseConcluida: 8,
    jogoIniciado: true,
    jogoPausado: false,
    partidaEncerrada: false,
    wave: 1,
    proximaWaveDoPulsoTemporal: 1,
    pulsoTemporalNormalExpiraEm: 0,
    pulsoTemporalBossExpiraEm: 0,
    botaoPulsoTemporal: { disabled: true, hidden: true, dataset: {} },
    estadoPulsoTemporal: { textContent: "" },
    localizar(texto, variaveis = {}) {
        return texto.replace("{segundos}", variaveis.segundos)
            .replace("{wave}", variaveis.wave);
    },
    registrarUsoDoPulsoTemporalParaConquistas() {},
    mostrarAviso(texto) { this.ultimoAviso = texto; }
};
vm.createContext(contextoDoPulso);
vm.runInContext([
    extrairFuncao("tipoEhBoss"),
    extrairFuncao("pulsoTemporalEstaDesbloqueado"),
    extrairFuncao("pulsoTemporalEstaAtivo"),
    extrairFuncao("pulsoTemporalPodeSerAtivado"),
    extrairFuncao("atualizarPulsoTemporalNoControle"),
    extrairFuncao("ativarPulsoTemporal"),
    extrairFuncao("oncaEstaEmDisparada"),
    extrairFuncao("javaliEstaEmArrancada"),
    extrairFuncao("obterMultiplicadorDaArrancadaDoJavali"),
    extrairFuncao("obterVelocidadeAtualDoInimigo")
].join("\n"), contextoDoPulso);

assert.strictEqual(contextoDoPulso.ativarPulsoTemporal(1000), true);
assert.strictEqual(contextoDoPulso.pulsoTemporalNormalExpiraEm, 5000);
assert.strictEqual(contextoDoPulso.pulsoTemporalBossExpiraEm, 4000);
assert.strictEqual(contextoDoPulso.proximaWaveDoPulsoTemporal, 6);
assert.strictEqual(
    contextoDoPulso.obterVelocidadeAtualDoInimigo({ tipo: "normal", velocidade: 1.5 }, 2000),
    0
);
assert.strictEqual(
    contextoDoPulso.obterVelocidadeAtualDoInimigo({ tipo: "bossPrimordial", velocidade: 0.68 }, 2000),
    0.34
);
contextoDoPulso.wave = 5;
contextoDoPulso.pulsoTemporalNormalExpiraEm = 0;
contextoDoPulso.pulsoTemporalBossExpiraEm = 0;
assert.strictEqual(contextoDoPulso.pulsoTemporalPodeSerAtivado(), false);
contextoDoPulso.wave = 6;
assert.strictEqual(contextoDoPulso.pulsoTemporalPodeSerAtivado(), true);

[
    'id="botao-pulso-temporal"',
    'onclick="ativarPulsoTemporal()"',
    "decoracao-lobby-primordial",
    "cristal-ambar-lobby-central"
].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    ".menu-principal.tema-primordial",
    ".fase-tema-primordial",
    ".botao-pulso-temporal",
    ".arvore-primordial-lobby",
    ".cristal-ambar-lobby"
].forEach(seletor => assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: Fase 8 Selva Primordial e Pulso Temporal",
    "Chamado da Matilha",
    "3.200 px",
    "Caminho Vivo",
    "Atalho do Tirano",
    "completamente parados por 4 segundos",
    "Bosses ficam 50% mais lentos por 3 segundos"
].forEach(trecho => assert.ok(
    especificacao.includes(trecho),
    `Especificação ausente: ${trecho}`
));

console.log("Fase 8 Selva Primordial: mapa, inimigos, Tirano e Pulso Temporal validados.");
