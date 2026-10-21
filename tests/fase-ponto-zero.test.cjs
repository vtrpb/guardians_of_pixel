const assert = require("assert");
const fs = require("fs");
const vm = require("vm");
const { carregarConfig } = require("./apoio/codigo-jogo.cjs");

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

const inicioDosCaminhos = codigo.indexOf("const caminhosDasFases = Object.freeze({");
const fimDosCaminhos = codigo.indexOf("const temasDoMapa = Object.freeze({", inicioDosCaminhos);
const contextoDaConfig = {};
vm.createContext(contextoDaConfig);
contextoDaConfig.CONFIG_TESTE = carregarConfig();
vm.runInContext(
    codigo.slice(inicioDosCaminhos, fimDosCaminhos)
        + "\nglobalThis.CAMINHOS_TESTE = caminhosDasFases;",
    contextoDaConfig
);

const CONFIG = contextoDaConfig.CONFIG_TESTE;
const caminhos = contextoDaConfig.CAMINHOS_TESTE[12];
const caminho = caminhos[0];
const fase = CONFIG.fases.find(item => item.numero === 12);
const comprimentos = caminhos.map(caminhoAtual => caminhoAtual.slice(1).reduce(
    (total, ponto, indice) => total + Math.hypot(
        ponto.x - caminhoAtual[indice].x,
        ponto.y - caminhoAtual[indice].y
    ),
    0
));

assert.strictEqual(fase.tema, "pontoZero");
assert.strictEqual(fase.descricao, "Ponto Zero");
assert.strictEqual(caminhos.length, 2);
assert.deepStrictEqual(Array.from(comprimentos), [2020, 2020]);
assert.deepStrictEqual(
    Array.from(caminhos, caminhoAtual => ({
        inicio: { ...caminhoAtual[0] },
        reencontro: { ...caminhoAtual[8] },
        fim: { ...caminhoAtual[caminhoAtual.length - 1] }
    })),
    [
        { inicio: { x: 0, y: 370 }, reencontro: { x: 680, y: 370 }, fim: { x: 1200, y: 110 } },
        { inicio: { x: 0, y: 370 }, reencontro: { x: 680, y: 370 }, fim: { x: 1200, y: 110 } }
    ]
);
assert.strictEqual(CONFIG.torre.limitesPorFase[12], 15);
assert.deepStrictEqual(
    Array.from(CONFIG.maquinaDoTempo.fasesPlanejadasPorEpoca.futuro),
    [9, 11, 12]
);
assert.strictEqual(CONFIG.audio.musicaDoPontoZero.intervaloDoPasso, 340);
assert.strictEqual(CONFIG.audio.musicaDoPontoZero.volumeRelativo, 2.05);
assert.strictEqual(CONFIG.audio.musicaDoPontoZero.melodia.length, 48);
assert.ok(CONFIG.audio.musicaDoPontoZero.melodia.includes(0));
const composicaoDoPontoZero = extrairFuncao("tocarPassoDaMusicaDoPontoZero");
assert.ok(composicaoDoPontoZero.includes('"sine"'));
assert.ok(composicaoDoPontoZero.includes('"triangle"'));
assert.ok(!composicaoDoPontoZero.includes('"square"'));
assert.ok(!composicaoDoPontoZero.includes('"sawtooth"'));
assert.match(
    extrairFuncao("tocarPassoDaMusicaDaSelva"),
    /musicaDoPontoZero[\s\S]*tocarPassoDaMusicaDoPontoZero/
);

assert.strictEqual(CONFIG.pontoZero.oscilacaoTemporal.multiplicadorDoSetorEstavel, 0.75);
assert.strictEqual(CONFIG.pontoZero.oscilacaoTemporal.multiplicadorDoSetorDeRuptura, 1.3);
assert.deepStrictEqual(
    Array.from(CONFIG.pontoZero.registros, registro => registro.waveDeAtivacao),
    [5, 10, 15]
);
assert.deepStrictEqual(
    Array.from(CONFIG.pontoZero.cenaFinal.etapas, etapa => etapa.id),
    ["arquivo", "aparicao", "maquina", "protecoes", "capitulo3"]
);
assert.ok(CONFIG.pontoZero.cenaFinal.etapas[0].texto.includes("mente e as lembranças"));
assert.ok(CONFIG.pontoZero.cenaFinal.etapas[1].texto.includes("finalmente descobriu"));
assert.ok(CONFIG.pontoZero.cenaFinal.etapas[3].texto.includes("removeu uma proteção"));
assert.ok(CONFIG.pontoZero.cenaFinal.etapas[4].titulo.includes("INTERVALO"));
assert.ok(CONFIG.pontoZero.cenaFinal.etapas[4].assinatura.includes("00:00"));

assert.strictEqual(CONFIG.inimigo.residuoTemporal.vida, 400);
assert.strictEqual(CONFIG.inimigo.arquivistaCorrompido.velocidade, 0.75);
assert.strictEqual(CONFIG.inimigo.arquivistaCorrompido.fragmentosLiberados, 2);
assert.strictEqual(CONFIG.inimigo.fragmentoDeArquivo.velocidade, 2);
assert.strictEqual(CONFIG.inimigo.vigiaDoPontoZero.reducaoDeDanoNoSetorDeRuptura, 0.25);
assert.strictEqual(CONFIG.inimigo.guardiaoDoPontoZero.vida, 2450);
assert.strictEqual(CONFIG.inimigo.guardiaoDoPontoZero.incrementoVidaPorAparicao, 660);
assert.strictEqual(CONFIG.inimigo.guardiaoDoPontoZero.residuosPorRuptura, 1);
assert.strictEqual(CONFIG.inimigo.guardiaoDoPontoZero.reducaoDeDanoDoEscudo, 0.3);
assert.strictEqual(CONFIG.inimigo.guardiaoDoPontoZero.duracaoDoEscudo, 1500);
assert.deepStrictEqual(
    Array.from(CONFIG.inimigo.guardiaoDoPontoZero.percentuaisDeVidaParaRuptura),
    [0.7, 0.35]
);

const contextoDosSetores = {
    CONFIG,
    Math,
    faseSelecionada: 12,
    wave: 1,
    obterCaminhoAtual() { return caminho; },
    obterCaminhoDoInimigo() { return caminho; }
};
vm.createContext(contextoDosSetores);
vm.runInContext([
    extrairFuncao("faseAtualUsaPontoZero"),
    extrairFuncao("calcularProgressoDoInimigo"),
    extrairFuncao("obterPosicaoNoCaminhoPeloProgresso"),
    extrairFuncao("posicionarInimigoNoProgressoDoCaminho"),
    extrairFuncao("obterTipoDoSetorPontoZero"),
    extrairFuncao("obterSetorDoPontoZeroParaInimigo"),
    extrairFuncao("obterMultiplicadorDoPontoZeroParaInimigo")
].join("\n"), contextoDosSetores);

const inimigoNoSetorA = { x: 0, y: 500, alvo: 1 };
contextoDosSetores.posicionarInimigoNoProgressoDoCaminho(inimigoNoSetorA, 160);
assert.strictEqual(
    contextoDosSetores.obterTipoDoSetorPontoZero(CONFIG.pontoZero.oscilacaoTemporal.setores[0], 1),
    "estavel"
);
assert.strictEqual(
    contextoDosSetores.obterTipoDoSetorPontoZero(CONFIG.pontoZero.oscilacaoTemporal.setores[1], 1),
    "ruptura"
);
assert.strictEqual(
    contextoDosSetores.obterTipoDoSetorPontoZero(CONFIG.pontoZero.oscilacaoTemporal.setores[0], 2),
    "ruptura"
);
assert.strictEqual(contextoDosSetores.obterMultiplicadorDoPontoZeroParaInimigo(inimigoNoSetorA), 0.75);
contextoDosSetores.wave = 2;
assert.strictEqual(contextoDosSetores.obterMultiplicadorDoPontoZeroParaInimigo(inimigoNoSetorA), 1.3);

const invocados = [];
const avisos = [];
const contextoDasHabilidades = {
    CONFIG,
    Date,
    Math,
    faseSelecionada: 12,
    wave: 1,
    obterCaminhoDoInimigo() { return caminho; },
    criarInimigoInvocado(tipo, origem, deslocamento) {
        invocados.push({ tipo, origem, deslocamento });
    },
    mostrarAviso(mensagem) { avisos.push(mensagem); },
    localizar(texto) { return texto; }
};
vm.createContext(contextoDasHabilidades);
vm.runInContext([
    extrairFuncao("faseAtualUsaPontoZero"),
    extrairFuncao("calcularProgressoDoInimigo"),
    extrairFuncao("obterTipoDoSetorPontoZero"),
    extrairFuncao("obterSetorDoPontoZeroParaInimigo"),
    extrairFuncao("ativarFragmentacaoDoArquivista"),
    extrairFuncao("ativarRupturaDoGuardiaoDoPontoZero"),
    extrairFuncao("obterReducaoDoPontoZeroNoInimigo")
].join("\n"), contextoDasHabilidades);

const arquivista = {
    tipo: "arquivistaCorrompido",
    vida: 500,
    vidaMaxima: 1050,
    fragmentosDeArquivoLiberados: false
};
assert.strictEqual(contextoDasHabilidades.ativarFragmentacaoDoArquivista(arquivista, 1000), 2);
assert.strictEqual(contextoDasHabilidades.ativarFragmentacaoDoArquivista(arquivista, 1001), 0);
assert.strictEqual(invocados.filter(item => item.tipo === "fragmentoDeArquivo").length, 2);

const guardiao = {
    tipo: "guardiaoDoPontoZero",
    vida: 700,
    vidaMaxima: CONFIG.inimigo.guardiaoDoPontoZero.vida,
    rupturasDoPontoZeroRealizadas: 0,
    escudoPontoZeroExpiraEm: 0,
    rupturaPontoZeroExpiraEm: 0
};
assert.strictEqual(contextoDasHabilidades.ativarRupturaDoGuardiaoDoPontoZero(guardiao, 2000), 2);
assert.strictEqual(guardiao.escudoPontoZeroExpiraEm, 3500);
assert.strictEqual(invocados.filter(item => item.tipo === "residuoTemporal").length, 2);
assert.strictEqual(contextoDasHabilidades.obterReducaoDoPontoZeroNoInimigo(guardiao, 3499), 0.3);
assert.strictEqual(contextoDasHabilidades.obterReducaoDoPontoZeroNoInimigo(guardiao, 3500), 0);
assert.deepStrictEqual(avisos.slice(-2), ["Arquivo selado.", "Linha temporal protegida."]);

const vigia = { tipo: "vigiaDoPontoZero", x: 0, y: 500, alvo: 1 };
contextoDosSetores.posicionarInimigoNoProgressoDoCaminho(vigia, 160);
contextoDasHabilidades.wave = 2;
Object.assign(vigia, { x: inimigoNoSetorA.x, y: inimigoNoSetorA.y, alvo: inimigoNoSetorA.alvo });
assert.strictEqual(contextoDasHabilidades.obterReducaoDoPontoZeroNoInimigo(vigia, 1000), 0.25);

[
    "decoracao-lobby-ponto-zero",
    "class=\"senhor-tempo-revelado senhor-tempo-forma-humana\""
].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    ".menu-principal.tema-pontoZero",
    ".fase-tema-pontoZero",
    "canvas.registro-ponto-zero-sob-cursor",
    "data-tipo-carta=\"registro-ponto-zero\"",
    "data-tipo-carta=\"cena-final-ponto-zero\"",
    "data-etapa-cena=\"capitulo3\""
].forEach(trecho => assert.ok(estilos.includes(trecho), `Estilo ausente: ${trecho}`));

[
    "function desenharSetoresDoPontoZero()",
    "function desenharRegistrosPontoZero()",
    "function desenharResiduoTemporal(",
    "function desenharArquivistaCorrompido(",
    "function desenharFragmentoDeArquivo(",
    "function desenharVigiaDoPontoZero(",
    "function desenharGuardiaoDoPontoZero(",
    "function tocarPassoDaMusicaDoPontoZero("
].forEach(trecho => assert.ok(codigo.includes(trecho), `Desenho ausente: ${trecho}`));

assert.match(codigo, /CHAVE_CENA_FINAL_PONTO_ZERO_VISTA = "guardians-of-pixel-cena-final-ponto-zero-v1"/);
assert.match(codigo, /deveMostrarCenaFinalPontoZeroAposVitoria\(\)[\s\S]*?mostrarCenaFinalDoPontoZero\(\)/);
assert.ok(codigo.includes('"Ponto Zero": "Point Zero"'));
assert.ok(codigo.includes('"Ponto Zero": "Punto Cero"'));
assert.ok(codigo.includes('"GUARDIÃO DO PONTO ZERO": "POINT ZERO GUARDIAN"'));
assert.ok(codigo.includes('"GUARDIÃO DO PONTO ZERO": "GUARDIÁN DEL PUNTO CERO"'));
assert.ok(especificacao.includes("### Mudança: Fase 12 Ponto Zero"));
assert.ok(especificacao.includes("Oscilação Temporal"));
assert.ok(especificacao.includes("00:00 — ERA INEXISTENTE"));
assert.ok(especificacao.includes("ainda não o libera"));

console.log("Fase 12 Ponto Zero: oscilação, inimigos, Boss, registros e história validados.");
