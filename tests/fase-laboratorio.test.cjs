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
const fase = CONFIG.fases.find(item => item.numero === 10);
const caminho = contextoDaConfig.CAMINHOS_TESTE[10];
const comprimento = caminho.slice(1).reduce(
    (total, ponto, indice) => total
        + Math.hypot(ponto.x - caminho[indice].x, ponto.y - caminho[indice].y),
    0
);

assert.strictEqual(fase.tema, "laboratorio");
assert.strictEqual(fase.descricao, "Laboratório Abandonado");
assert.strictEqual(comprimento, 3150);
assert.strictEqual(CONFIG.torre.limitesPorFase[10], 15);
assert.strictEqual(CONFIG.laboratorioAbandonado.terminal.waveDeAtivacao, 10);
assert.strictEqual(CONFIG.laboratorioAbandonado.terminal.x, 650);
assert.strictEqual(CONFIG.laboratorioAbandonado.terminal.y, 350);
assert.deepStrictEqual(
    Array.from(CONFIG.laboratorioAbandonado.cenaFinal.etapas, etapa => etapa.id),
    ["arquivo", "gravacao", "coordenada"]
);
assert.ok(CONFIG.laboratorioAbandonado.cenaFinal.etapas[0].texto.includes(
    "não criou a consciência temporal"
));
assert.ok(CONFIG.laboratorioAbandonado.cenaFinal.etapas[1].texto.includes(
    "Se eu desaparecer, destruam a máquina"
));
assert.ok(CONFIG.laboratorioAbandonado.cenaFinal.etapas[2].texto.includes(
    "futuro que não deveria existir"
));
assert.strictEqual(CONFIG.laboratorioAbandonado.contencao.camaras.length, 2);
assert.strictEqual(CONFIG.laboratorioAbandonado.contencao.atrasoDoFechamento, 900);
assert.strictEqual(CONFIG.laboratorioAbandonado.contencao.duracaoDoFechamento, 3000);
assert.strictEqual(
    CONFIG.laboratorioAbandonado.contencao.duracaoDoFechamentoParaBosses,
    1500
);
assert.deepStrictEqual(
    Array.from(CONFIG.laboratorioAbandonado.contencao.camaras, camara => camara.id),
    ["a", "b"]
);
assert.strictEqual(CONFIG.audio.musicaDoLaboratorio.intervaloDoPasso, 250);
assert.strictEqual(CONFIG.audio.musicaDoLaboratorio.volumeRelativo, 1.75);
assert.strictEqual(CONFIG.inimigo.guardaDeContencao.reducaoDeDano, 0.25);
assert.deepStrictEqual(
    Array.from(CONFIG.inimigo.prototipoAlfa.percentuaisDeVidaParaEstase),
    [0.7, 0.35]
);
assert.strictEqual(CONFIG.inimigo.prototipoAlfa.quantidadeDeTorresParalisadas, 3);
assert.strictEqual(CONFIG.inimigo.prototipoAlfa.duracaoDaEstase, 2500);
assert.ok(CONFIG.maquinaDoTempo.fasesPlanejadasPorEpoca.passado.includes(10));

const contextoDaVelocidade = {
    CONFIG,
    Date,
    pulsoTemporalNormalExpiraEm: 0,
    pulsoTemporalBossExpiraEm: 0,
    tipoEhBoss() { return false; },
    oncaEstaEmDisparada() { return false; },
    obterMultiplicadorDaArrancadaDoJavali() { return 1; }
};
vm.createContext(contextoDaVelocidade);
vm.runInContext(extrairFuncao("obterVelocidadeAtualDoInimigo"), contextoDaVelocidade);
const cobaia = {
    tipo: "cobaiaInstavel",
    velocidade: CONFIG.inimigo.cobaiaInstavel.velocidade,
    vida: 900,
    vidaMaxima: 900
};
assert.strictEqual(contextoDaVelocidade.obterVelocidadeAtualDoInimigo(cobaia, 1000), 1.25);
cobaia.vida = 450;
assert.strictEqual(contextoDaVelocidade.obterVelocidadeAtualDoInimigo(cobaia, 1000), 1.9375);

const mensagens = [];
const torres = [
    { tipo: "padrao", x: 110, y: 100, alvoAtual: {} },
    { tipo: "gelo", x: 130, y: 100, alvoAtual: {} },
    { tipo: "amplificadorPixel", x: 105, y: 100, alvoAtual: {} },
    { tipo: "laser", x: 150, y: 100, alvoAtual: {} },
    { tipo: "sismica", x: 500, y: 100, alvoAtual: {} }
];
const prototipo = {
    tipo: "prototipoAlfa",
    x: 100,
    y: 100,
    vida: 2000,
    vidaMaxima: 5900,
    pulsosDeEstaseRealizados: 0
};
const contextoDaEstase = {
    CONFIG,
    Date,
    Math,
    torres,
    obterConfiguracaoDaTorre(tipo) { return { naoAtira: tipo === "amplificadorPixel" }; },
    mostrarAviso(mensagem) { mensagens.push(mensagem); },
    localizar(texto) { return texto; }
};
vm.createContext(contextoDaEstase);
vm.runInContext([
    extrairFuncao("ativarPulsoDeEstase"),
    extrairFuncao("torreEstaEmEstaseTemporal")
].join("\n"), contextoDaEstase);

assert.strictEqual(contextoDaEstase.ativarPulsoDeEstase(prototipo, 1000), 3);
assert.strictEqual(prototipo.pulsosDeEstaseRealizados, 2);
assert.strictEqual(mensagens.length, 1);
assert.strictEqual(torres[0].estaseTemporalExpiraEm, 3500);
assert.strictEqual(torres[1].estaseTemporalExpiraEm, 3500);
assert.strictEqual(torres[3].estaseTemporalExpiraEm, 3500);
assert.strictEqual(torres[2].estaseTemporalExpiraEm, undefined);
assert.strictEqual(torres[4].estaseTemporalExpiraEm, undefined);
assert.strictEqual(contextoDaEstase.torreEstaEmEstaseTemporal(torres[0], 3499), true);
assert.strictEqual(contextoDaEstase.torreEstaEmEstaseTemporal(torres[0], 3500), false);
assert.strictEqual(contextoDaEstase.ativarPulsoDeEstase(prototipo, 1001), 0);

const guarda = { tipo: "guardaDeContencao", vida: 1650, vidaMaxima: 1650 };
const contextoDoDano = {
    CONFIG,
    Date,
    Math,
    ativarErupcaoDoTita() {},
    ativarChamadoDaMatilha() {},
    ativarReversaoDeEmergencia() {},
    ativarPulsoDeEstase() {}
};
vm.createContext(contextoDoDano);
vm.runInContext(extrairFuncao("aplicarDanoAoInimigo"), contextoDoDano);
assert.strictEqual(contextoDoDano.aplicarDanoAoInimigo(guarda, 100, 1000), 75);
assert.strictEqual(guarda.vida, 1575);

const avisosDaContencao = [];
const contextoDaContencao = {
    CONFIG,
    Date,
    Math,
    faseSelecionada: 10,
    idiomaAtual: "pt-BR",
    partidaEncerrada: false,
    jogoPausado: false,
    inimigosParaCriar: 1,
    inimigos: [],
    contencaoLaboratorioUsadaNaWave: false,
    idDaCamaraDeContencaoSelecionada: null,
    contencaoLaboratorioFechaEm: 0,
    contencaoLaboratorioExpiraEm: 0,
    contencaoLaboratorioAtivada: false,
    numeroDaAtivacaoDaContencao: 0,
    mostrarAviso(mensagem) { avisosDaContencao.push(mensagem); },
    localizar(texto, variaveis = {}) {
        return Object.entries(variaveis).reduce(
            (resultado, [nome, valor]) => resultado.replaceAll(`{${nome}}`, valor),
            texto
        );
    },
    tipoEhBoss(tipo) { return tipo === "prototipoAlfa"; }
};
vm.createContext(contextoDaContencao);
vm.runInContext([
    extrairFuncao("faseAtualUsaLaboratorioAbandonado"),
    extrairFuncao("recarregarProtocoloDeContencao"),
    extrairFuncao("obterCamaraDeContencao"),
    extrairFuncao("waveEstaAtivaParaContencao"),
    extrairFuncao("formatarSegundosDaContencao"),
    extrairFuncao("ativarProtocoloDeContencao"),
    extrairFuncao("atualizarProtocoloDeContencao"),
    extrairFuncao("contencaoLaboratorioEstaFechada"),
    extrairFuncao("inimigoEstaDentroDaCamaraDeContencao"),
    extrairFuncao("inimigoEstaRetidoPelaContencao")
].join("\n"), contextoDaContencao);

assert.strictEqual(contextoDaContencao.ativarProtocoloDeContencao("a", 1000), true);
assert.strictEqual(contextoDaContencao.contencaoLaboratorioUsadaNaWave, true);
assert.strictEqual(contextoDaContencao.idDaCamaraDeContencaoSelecionada, "a");
assert.strictEqual(contextoDaContencao.contencaoLaboratorioFechaEm, 1900);
assert.strictEqual(contextoDaContencao.contencaoLaboratorioExpiraEm, 4900);
assert.strictEqual(contextoDaContencao.ativarProtocoloDeContencao("b", 1100), false);
assert.strictEqual(contextoDaContencao.idDaCamaraDeContencaoSelecionada, "a");
assert.strictEqual(contextoDaContencao.atualizarProtocoloDeContencao(1899), false);
assert.strictEqual(contextoDaContencao.atualizarProtocoloDeContencao(1900), true);

const inimigoComumRetido = { tipo: "normal", x: 250, y: 160 };
const bossRetido = {
    tipo: "prototipoAlfa",
    x: 250,
    y: 160,
    numeroDaAtivacaoDaContencao: 0,
    contencaoLaboratorioExpiraEm: 0
};
assert.strictEqual(
    contextoDaContencao.inimigoEstaRetidoPelaContencao(inimigoComumRetido, 4800),
    true
);
assert.strictEqual(
    contextoDaContencao.inimigoEstaRetidoPelaContencao(bossRetido, 1900),
    true
);
assert.strictEqual(bossRetido.contencaoLaboratorioExpiraEm, 3400);
assert.strictEqual(
    contextoDaContencao.inimigoEstaRetidoPelaContencao(bossRetido, 3399),
    true
);
assert.strictEqual(
    contextoDaContencao.inimigoEstaRetidoPelaContencao(bossRetido, 3400),
    false
);
contextoDaContencao.recarregarProtocoloDeContencao();
assert.strictEqual(contextoDaContencao.contencaoLaboratorioUsadaNaWave, false);
assert.strictEqual(contextoDaContencao.idDaCamaraDeContencaoSelecionada, null);
assert.strictEqual(avisosDaContencao.length, 3);

[
    "decoracao-lobby-laboratorio",
    "class=\"terminal-registro\"",
    "class=\"maquina-tempo-cena-final\""
].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    ".menu-principal.tema-laboratorio",
    ".fase-tema-laboratorio",
    "canvas.terminal-sob-cursor",
    "canvas.contencao-sob-cursor",
    "data-tipo-carta=\"registro\"",
    "data-tipo-carta=\"cena-final-laboratorio\"",
    "data-etapa-cena=\"coordenada\""
].forEach(trecho => assert.ok(estilos.includes(trecho), `Estilo ausente: ${trecho}`));

[
    "function desenharTerminalLaboratorio()",
    "function desenharCamarasDeContencaoDoLaboratorio()",
    "function desenharAutomatoDeCobre(",
    "function desenharCobaiaInstavel(",
    "function desenharGuardaDeContencao(",
    "function desenharPrototipoAlfa("
].forEach(trecho => assert.ok(codigo.includes(trecho), `Desenho ausente: ${trecho}`));

assert.match(codigo, /CHAVE_REGISTRO_LABORATORIO_VISTO = "guardians-of-pixel-registro-laboratorio-v1"/);
assert.match(codigo, /CHAVE_CENA_FINAL_LABORATORIO_VISTA = "guardians-of-pixel-cena-final-laboratorio-v1"/);
assert.match(codigo, /deveMostrarRegistroLaboratorioAposVitoria\(\)[\s\S]*?mostrarRegistroDoLaboratorio\(false\)/);
assert.match(codigo, /deveMostrarCenaFinalLaboratorioAposVitoria\(\)[\s\S]*?mostrarCenaFinalDoLaboratorio\(\)/);
assert.match(codigo, /concluiuRegistroLaboratorio[\s\S]*?mostrarCenaFinalDoLaboratorio\(\)/);
assert.match(codigo, /function iniciarProximaWave\(\)[\s\S]*?wave\+\+;[\s\S]*?recarregarProtocoloDeContencao\(\)/);
assert.match(codigo, /function definirJogoPausado\(pausar\)[\s\S]*?contencaoLaboratorioFechaEm = deslocarCronometroAposPausa[\s\S]*?contencaoLaboratorioExpiraEm = deslocarCronometroAposPausa/);
assert.match(codigo, /estaPertoDosPaineisDeContencao\(x, y\)[\s\S]*?Deixe espaço livre ao redor do painel de contenção/);
assert.ok(codigo.includes('"Deixe espaço livre ao redor do terminal.": "Leave some clear space around the terminal."'));
assert.ok(codigo.includes('"Deixe espaço livre ao redor do terminal.": "Deja espacio libre alrededor del terminal."'));
assert.ok(codigo.includes('"PROTOCOLO DE CONTENÇÃO": "CONTAINMENT PROTOCOL"'));
assert.ok(codigo.includes('"PROTOCOLO DE CONTENÇÃO": "PROTOCOLO DE CONTENCIÓN"'));
assert.ok(codigo.includes('"ARQUIVO RECUPERADO": "RECOVERED FILE"'));
assert.ok(codigo.includes('"ARQUIVO RECUPERADO": "ARCHIVO RECUPERADO"'));
assert.ok(especificacao.includes("### Mudança: Fase 10 Laboratório Abandonado"));
assert.ok(especificacao.includes("Protocolo de Contenção"));
assert.ok(especificacao.includes("não se torna uma habilidade permanente"));
assert.ok(especificacao.includes("O corpo permaneceu vazio"));
assert.ok(especificacao.includes("Nós não criamos um deus. Apenas abrimos a porta para ele."));
assert.ok(especificacao.includes("passa a conduzir à Fase 11"));

console.log("Fase 10 Laboratório Abandonado: contenção, inimigos, Boss, registro e cena final validados.");
