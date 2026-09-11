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
const caminho = contextoDaConfig.CAMINHOS_TESTE[11];
const fase = CONFIG.fases.find(item => item.numero === 11);
const comprimento = caminho.slice(1).reduce(
    (total, ponto, indice) => total
        + Math.hypot(ponto.x - caminho[indice].x, ponto.y - caminho[indice].y),
    0
);

assert.strictEqual(fase.tema, "futuroDespedacado");
assert.strictEqual(fase.descricao, "Futuro Despedaçado");
assert.strictEqual(comprimento, 3160);
assert.strictEqual(CONFIG.torre.limitesPorFase[11], 15);
assert.ok(CONFIG.maquinaDoTempo.fasesPlanejadasPorEpoca.futuro.includes(11));
assert.ok(!CONFIG.maquinaDoTempo.fasesPlanejadasPorEpoca.presente.includes(11));
assert.strictEqual(CONFIG.futuroDespedacado.fendasTemporais.duracaoDaContagem, 850);
assert.deepStrictEqual(
    Array.from(CONFIG.futuroDespedacado.fendasTemporais.pares, fenda => fenda.id),
    ["a", "b"]
);
assert.strictEqual(CONFIG.futuroDespedacado.transmissor.waveDeAtivacao, 1);
assert.ok(CONFIG.futuroDespedacado.transmissor.texto.includes(
    "Não confie em quem lhe deu a máquina"
));
assert.deepStrictEqual(
    Array.from(CONFIG.futuroDespedacado.cenaFinal.etapas, etapa => etapa.id),
    ["arquivo", "silhueta", "coordenada"]
);
assert.ok(CONFIG.futuroDespedacado.cenaFinal.etapas[0].texto.includes(
    "Apenas abrimos a porta"
));
assert.ok(CONFIG.futuroDespedacado.cenaFinal.etapas[1].texto.includes(
    "silhueta humana alta"
));
assert.ok(CONFIG.futuroDespedacado.cenaFinal.etapas[2].texto.includes("03:17"));

assert.strictEqual(CONFIG.inimigo.andarilhoDeSucata.vida, 1150);
assert.strictEqual(CONFIG.inimigo.andarilhoDeSucata.usaFendasTemporais, true);
assert.strictEqual(CONFIG.inimigo.ecoTemporal.percentualDeVidaNoRetorno, 0.5);
assert.strictEqual(CONFIG.inimigo.ecoTemporal.distanciaDoRetorno, 220);
assert.strictEqual(CONFIG.inimigo.sentinelaCronologica.reducaoDeDanoPertoDaFenda, 0.3);
assert.strictEqual(CONFIG.inimigo.sentinelaCronologica.raioDeProtecaoDaFenda, 115);
assert.deepStrictEqual(
    Array.from(CONFIG.inimigo.sentinelaDoAmanha.percentuaisDeVidaParaRecuo),
    [0.7, 0.35]
);
assert.strictEqual(CONFIG.inimigo.sentinelaDoAmanha.distanciaDoRecuo, 320);
assert.strictEqual(CONFIG.inimigo.sentinelaDoAmanha.incrementoVidaPorAparicao, 750);
assert.strictEqual(CONFIG.audio.musicaDoFuturoDespedacado.intervaloDoPasso, 235);

const contextoDasFendas = {
    CONFIG,
    Math,
    faseSelecionada: 11,
    obterCaminhoAtual() { return caminho; },
    obterCaminhoDoInimigo() { return caminho; }
};
vm.createContext(contextoDasFendas);
vm.runInContext([
    extrairFuncao("faseAtualUsaFuturoDespedacado"),
    extrairFuncao("calcularProgressoDoInimigo"),
    extrairFuncao("obterPosicaoNoCaminhoPeloProgresso"),
    extrairFuncao("posicionarInimigoNoProgressoDoCaminho"),
    extrairFuncao("inimigoPodeUsarFendasTemporais"),
    extrairFuncao("atualizarFendaTemporalDoInimigo")
].join("\n"), contextoDasFendas);

const posicaoDaEntrada = contextoDasFendas.obterPosicaoNoCaminhoPeloProgresso(620);
const inimigoDaFenda = {
    tipo: "andarilhoDeSucata",
    x: posicaoDaEntrada.x,
    y: posicaoDaEntrada.y,
    alvo: posicaoDaEntrada.alvo,
    fendaTemporalAtiva: null,
    fendaTemporalTeleportaEm: 0,
    fendasTemporaisUsadas: []
};
assert.strictEqual(
    contextoDasFendas.atualizarFendaTemporalDoInimigo(inimigoDaFenda, 1000),
    true
);
assert.strictEqual(inimigoDaFenda.fendaTemporalAtiva, "a");
assert.strictEqual(inimigoDaFenda.fendaTemporalTeleportaEm, 1850);
assert.strictEqual(
    contextoDasFendas.atualizarFendaTemporalDoInimigo(inimigoDaFenda, 1849),
    true
);
assert.strictEqual(
    contextoDasFendas.atualizarFendaTemporalDoInimigo(inimigoDaFenda, 1850),
    false
);
assert.deepStrictEqual(inimigoDaFenda.fendasTemporaisUsadas, ["a"]);
assert.strictEqual(
    Math.round(contextoDasFendas.calcularProgressoDoInimigo(inimigoDaFenda)),
    1040
);
const drone = { tipo: "droneCacador" };
assert.strictEqual(contextoDasFendas.inimigoPodeUsarFendasTemporais(drone), false);

let distanciaRecuada = 0;
const avisos = [];
const contextoDasHabilidades = {
    CONFIG,
    Date,
    recuarInimigoNoCaminho(inimigo, distancia) {
        distanciaRecuada += distancia;
        return distancia;
    },
    mostrarAviso(mensagem) { avisos.push(mensagem); },
    localizar(texto) { return texto; }
};
vm.createContext(contextoDasHabilidades);
vm.runInContext([
    extrairFuncao("ativarRetornoDoEco"),
    extrairFuncao("ativarRecuoDaSentinelaDoAmanha")
].join("\n"), contextoDasHabilidades);

const eco = {
    tipo: "ecoTemporal",
    vida: 0,
    vidaMaxima: 760,
    retornosDoEcoRealizados: 0
};
assert.strictEqual(contextoDasHabilidades.ativarRetornoDoEco(eco, 1000), true);
assert.strictEqual(eco.vida, 380);
assert.strictEqual(eco.retornosDoEcoRealizados, 1);
assert.strictEqual(contextoDasHabilidades.ativarRetornoDoEco(eco, 1100), false);

const sentinela = {
    tipo: "sentinelaDoAmanha",
    vida: 2200,
    vidaMaxima: 6500,
    recuosDaSentinelaRealizados: 0
};
assert.strictEqual(
    contextoDasHabilidades.ativarRecuoDaSentinelaDoAmanha(sentinela, 2000),
    2
);
assert.strictEqual(sentinela.vida, 2200);
assert.strictEqual(sentinela.recuosDaSentinelaRealizados, 2);
assert.strictEqual(distanciaRecuada, 860);
assert.deepStrictEqual(avisos.slice(-2), [
    "Você não deveria possuir essa máquina.",
    "Cada vitória sua está destruindo o futuro."
]);

[
    "decoracao-lobby-futuro-despedacado",
    "class=\"transmissao-futuro-visual\""
].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    ".menu-principal.tema-futuroDespedacado",
    ".fase-tema-futuroDespedacado",
    "canvas.transmissor-sob-cursor",
    "data-tipo-carta=\"transmissao-futuro-despedacado\"",
    "data-tipo-carta=\"cena-final-futuro-despedacado\"",
    "data-etapa-cena=\"silhueta\""
].forEach(trecho => assert.ok(estilos.includes(trecho), `Estilo ausente: ${trecho}`));

[
    "function desenharFendasTemporais()",
    "function desenharTransmissorFuturoDespedacado()",
    "function desenharAndarilhoDeSucata(",
    "function desenharEcoTemporal(",
    "function desenharSentinelaCronologica(",
    "function desenharSentinelaDoAmanha("
].forEach(trecho => assert.ok(codigo.includes(trecho), `Desenho ausente: ${trecho}`));

assert.match(codigo, /CHAVE_TRANSMISSAO_FUTURO_DESPEDACADO_VISTA = "guardians-of-pixel-transmissao-futuro-despedacado-v1"/);
assert.match(codigo, /CHAVE_CENA_FINAL_FUTURO_DESPEDACADO_VISTA = "guardians-of-pixel-cena-final-futuro-despedacado-v1"/);
assert.match(codigo, /deveMostrarTransmissaoFuturoDespedacadoAposVitoria\(\)[\s\S]*?mostrarTransmissaoFuturoDespedacado\(false\)/);
assert.match(codigo, /concluiuTransmissaoFuturoDespedacado[\s\S]*?mostrarCenaFinalDoFuturoDespedacado\(\)/);
assert.ok(codigo.includes('"Futuro Despedaçado": "Shattered Future"'));
assert.ok(codigo.includes('"Futuro Despedaçado": "Futuro Despedazado"'));
assert.ok(especificacao.includes("### Mudança: Fase 11 Futuro Despedaçado"));
assert.ok(especificacao.includes("não inicia ainda a interferência direta do Senhor do Tempo")
    || especificacao.includes("sem iniciar ainda a interferência direta do Senhor do Tempo"));
assert.ok(especificacao.includes("não vira recompensa, torre ou habilidade"));

console.log("Fase 11 Futuro Despedaçado: fendas, inimigos, Boss, história e interface validados.");
