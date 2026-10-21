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

const inicioDosCaminhos = codigo.indexOf("const caminhosDasFases = Object.freeze({");
const fimDosCaminhos = codigo.indexOf("const temasDoMapa = Object.freeze({", inicioDosCaminhos);
const contextoDaConfig = {};
vm.createContext(contextoDaConfig);
contextoDaConfig.CONFIG_TESTE = require("./apoio/codigo-jogo.cjs").carregarConfig();
vm.runInContext(
    codigo.slice(inicioDosCaminhos, fimDosCaminhos)
        + "\nglobalThis.CAMINHOS_TESTE = caminhosDasFases;",
    contextoDaConfig
);

const CONFIG = contextoDaConfig.CONFIG_TESTE;
const caminhos = contextoDaConfig.CAMINHOS_TESTE;
const fase14 = CONFIG.fases.find(fase => fase.numero === 14);
const era = CONFIG.eraApagada;

assert.deepStrictEqual(
    { numero: fase14.numero, tema: fase14.tema, descricao: fase14.descricao },
    { numero: 14, tema: "eraApagada", descricao: "A Era Apagada" }
);
assert.strictEqual(CONFIG.fases.some(fase => fase.numero === 15), true);
assert.strictEqual(CONFIG.torre.limitesPorFase[14], 15);
assert.deepStrictEqual(Array.from(era.reescritaTemporal.wavesDeAtivacao), [3, 6, 9, 12, 15, 18]);
assert.strictEqual(era.reescritaTemporal.duracaoDoAvisoMs, 2200);
assert.strictEqual(era.reescritaTemporal.duracaoDaEstaseMs, 3600);
assert.strictEqual(era.reescritaTemporal.regioes.length, 3);
assert.deepStrictEqual(
    Array.from(era.introducao, etapa => etapa.id),
    ["coordenadaApagada", "avisoReescrita", "inimigosCamuflados", "respostaPrototipo"]
);
assert.ok(era.introducao[1].texto.includes("apagada por um motivo"));
assert.deepStrictEqual(
    Array.from(era.cenaFinal.etapas, etapa => etapa.id),
    ["gravacao", "assinatura", "interrupcao"]
);
assert.ok(era.cenaFinal.etapas[0].texto.includes("ainda usa meu rosto"));
assert.ok(era.cenaFinal.etapas[1].texto.includes("47 anos"));
assert.ok(era.cenaFinal.etapas[2].texto.includes("É uma isca"));
assert.ok(Array.from(caminhos[14]).length > 8);

assert.deepStrictEqual(
    {
        vida: CONFIG.inimigo.rascunhoVivo.vida,
        velocidade: CONFIG.inimigo.rascunhoVivo.velocidade,
        tamanho: CONFIG.inimigo.rascunhoVivo.tamanho
    },
    { vida: 480, velocidade: 2.6, tamanho: 22 }
);
assert.strictEqual(CONFIG.inimigo.sentinelaIncompleta.vida, 1350);
assert.strictEqual(CONFIG.inimigo.sentinelaIncompleta.velocidade, 0.78);
assert.strictEqual(CONFIG.inimigo.sentinelaIncompleta.reducaoDeDano, 0.18);
assert.strictEqual(CONFIG.inimigo.sombraCongelada.vida, 900);
assert.strictEqual(CONFIG.inimigo.sombraCongelada.velocidade, 1.15);
assert.deepStrictEqual(
    {
        vida: CONFIG.inimigo.curadorDoVazio.vida,
        incremento: CONFIG.inimigo.curadorDoVazio.incrementoVidaPorAparicao,
        velocidade: CONFIG.inimigo.curadorDoVazio.velocidade,
        restaurados: CONFIG.inimigo.curadorDoVazio.quantidadeMaximaDeInimigosRestaurados,
        janela: CONFIG.inimigo.curadorDoVazio.janelaDeRestauracaoMs,
        vidaRestaurada: CONFIG.inimigo.curadorDoVazio.percentualDeVidaRestaurada
    },
    {
        vida: 3920,
        incremento: 360,
        velocidade: 0.62,
        restaurados: 2,
        janela: 5000,
        vidaRestaurada: 0.45
    }
);

const avisosDaReescrita = [];
const torresDaReescrita = [
    { tipo: "padrao", x: 250, y: 100, estaseTemporalExpiraEm: 0, alvoAtual: {} },
    { tipo: "fazenda", x: 300, y: 120, estaseTemporalExpiraEm: 0, alvoAtual: {} },
    { tipo: "padrao", x: 700, y: 600, estaseTemporalExpiraEm: 0, alvoAtual: {} }
];
const contextoDaReescrita = {
    CONFIG,
    Date,
    Math,
    faseSelecionada: 14,
    wave: 3,
    torres: torresDaReescrita,
    reescritaTemporalDaEraApagada: null,
    obterConfiguracaoDaTorre(tipo) { return { naoAtira: tipo === "fazenda" }; },
    localizar(texto, parametros = {}) {
        return texto.replace("{quantidade}", parametros.quantidade ?? "");
    },
    mostrarAviso(texto) { avisosDaReescrita.push(texto); }
};
vm.createContext(contextoDaReescrita);
vm.runInContext([
    extrairFuncao("faseAtualUsaEraApagada"),
    extrairFuncao("pontoEstaNaRegiaoDaReescrita"),
    extrairFuncao("iniciarReescritaTemporalDaEraApagada"),
    extrairFuncao("atualizarReescritaTemporalDaEraApagada")
].join("\n"), contextoDaReescrita);

assert.strictEqual(contextoDaReescrita.iniciarReescritaTemporalDaEraApagada(1000), true);
assert.strictEqual(contextoDaReescrita.reescritaTemporalDaEraApagada.estado, "aviso");
assert.strictEqual(contextoDaReescrita.reescritaTemporalDaEraApagada.ativaEm, 3200);
contextoDaReescrita.atualizarReescritaTemporalDaEraApagada(3199);
assert.strictEqual(torresDaReescrita[0].estaseTemporalExpiraEm, 0);
contextoDaReescrita.atualizarReescritaTemporalDaEraApagada(3200);
assert.strictEqual(contextoDaReescrita.reescritaTemporalDaEraApagada.estado, "ativa");
assert.strictEqual(torresDaReescrita[0].estaseTemporalExpiraEm, 6800);
assert.strictEqual(torresDaReescrita[0].alvoAtual, null);
assert.strictEqual(torresDaReescrita[1].estaseTemporalExpiraEm, 0);
assert.strictEqual(torresDaReescrita[2].estaseTemporalExpiraEm, 0);
contextoDaReescrita.atualizarReescritaTemporalDaEraApagada(6800);
assert.strictEqual(contextoDaReescrita.reescritaTemporalDaEraApagada, null);
assert.strictEqual(avisosDaReescrita.length, 3);

const avisosDoCurador = [];
const inimigosRestaurados = [];
const contextoDoCurador = {
    CONFIG,
    Date,
    Math,
    inimigos: inimigosRestaurados,
    inimigosDerrotadosRecentementeNaEraApagada: [
        { tipo: "rascunhoVivo", indiceDoCaminho: 0, x: 100, y: 200, alvo: 2, eliminadoEm: 7500 },
        { tipo: "sombraCongelada", indiceDoCaminho: 0, x: 140, y: 220, alvo: 3, eliminadoEm: 8000 },
        { tipo: "sentinelaIncompleta", indiceDoCaminho: 0, x: 180, y: 240, alvo: 4, eliminadoEm: 8500 }
    ],
    criarInimigoInvocado(tipo) {
        const configuracao = CONFIG.inimigo[tipo];
        inimigosRestaurados.push({
            tipo,
            vida: configuracao.vida,
            vidaMaxima: configuracao.vida,
            indiceDoCaminho: 0,
            x: 0,
            y: 0,
            alvo: 1
        });
    },
    obterCaminhoDoInimigo() { return caminhos[14]; },
    localizar(texto, parametros = {}) {
        return texto.replace("{quantidade}", parametros.quantidade ?? "");
    },
    mostrarAviso(texto) { avisosDoCurador.push(texto); }
};
vm.createContext(contextoDoCurador);
vm.runInContext([
    extrairFuncao("restaurarInimigoPeloCurador"),
    extrairFuncao("ativarRestauracaoDoCuradorDoVazio")
].join("\n"), contextoDoCurador);
const curador = {
    tipo: "curadorDoVazio",
    vida: 1960,
    vidaMaxima: 3920,
    restauracaoDoVazioRealizada: false,
    restauracaoDoVazioExpiraEm: 0
};
assert.strictEqual(contextoDoCurador.ativarRestauracaoDoCuradorDoVazio(curador, 10000), 2);
assert.deepStrictEqual(
    inimigosRestaurados.map(inimigo => inimigo.tipo),
    ["sombraCongelada", "sentinelaIncompleta"]
);
assert.deepStrictEqual(
    inimigosRestaurados.map(inimigo => inimigo.vida),
    [405, 608]
);
assert.ok(inimigosRestaurados.every(inimigo => inimigo.restauradoPeloCurador));
assert.strictEqual(curador.restauracaoDoVazioRealizada, true);
assert.strictEqual(contextoDoCurador.ativarRestauracaoDoCuradorDoVazio(curador, 10100), 0);
assert.strictEqual(avisosDoCurador.length, 1);

assert.match(codigo, /const CHAVE_INTRODUCAO_FASE_14_VISTA = "guardians-of-pixel-introducao-fase-14-v2"/);
assert.match(codigo, /const CHAVE_CENA_FINAL_FASE_14_VISTA = "guardians-of-pixel-cena-final-fase-14-v1"/);
assert.match(codigo, /tipo: "introducao-fase-14"/);
assert.match(codigo, /tipo: "cena-final-fase-14"/);
assert.match(codigo, /function desenharReescritaTemporalDaEraApagada/);
assert.match(codigo, /function desenharPredioApagado/);
assert.match(codigo, /function desenharSilhuetaCongelada/);
assert.match(codigo, /function desenharFragmentoApagado/);
assert.match(codigo, /"infiltradorCamuflado", "rascunhoVivo", "sentinelaIncompleta", "sombraCongelada"/);
assert.match(codigo, /"executorCronal", "curadorDoVazio"/);
assert.match(estilos, /\.menu-principal\.tema-eraApagada/);
assert.match(estilos, /\.fase-tema-eraApagada/);
assert.match(estilos, /\[data-tipo-carta="introducao-fase-14"\]/);
assert.match(estilos, /\[data-tipo-carta="cena-final-fase-14"\]/);
assert.match(estilos, /\[data-etapa-cena="interrupcao"\] \.senhor-tempo-revelado/);
assert.match(especificacao, /Fase 14 A Era Apagada/);
assert.match(especificacao, /Reescrita Temporal/);
assert.match(especificacao, /Se alguém encontrou isto, então ele ainda usa meu rosto/);

console.log("Fase 14: progressão, história, Reescrita Temporal, inimigos e Curador validados.");
