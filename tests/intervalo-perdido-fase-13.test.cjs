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
const caminhos = contextoDaConfig.CAMINHOS_TESTE;
const intervalo = CONFIG.intervaloPerdido;
const linhaTemporal = CONFIG.linhaDeFrenteTemporal;
const capitulo3 = CONFIG.capitulos.find(capitulo => capitulo.numero === 3);
const fase13 = CONFIG.fases.find(fase => fase.numero === 13);

assert.strictEqual(intervalo.numeroInterno, 100);
assert.strictEqual(intervalo.totalDeWaves, 10);
assert.strictEqual(intervalo.duracaoDaTransicaoMs, 1400);
assert.deepStrictEqual(
    Array.from(intervalo.armadilhaDoSenhorDoTempo, etapa => etapa.id),
    ["revelacao", "desterro", "prisioneiro", "adeus"]
);
assert.ok(intervalo.armadilhaDoSenhorDoTempo[0].texto.includes("sabe o que eu sou"));
assert.ok(intervalo.armadilhaDoSenhorDoTempo[3].texto.includes("Não sou eu quem controla"));
assert.strictEqual(intervalo.armadilhaDoSenhorDoTempo[3].textoDoBotao, "Tentar resistir");
assert.deepStrictEqual(
    Array.from(intervalo.introducao, etapa => etapa.id),
    ["coordenada", "sinal"]
);
assert.ok(intervalo.introducao[0].texto.includes("nenhuma era"));
assert.ok(intervalo.introducao[1].texto.includes("preso entre os segundos"));
assert.strictEqual(intervalo.waves.quantidadeBaseDeFragmentosDeSegundo, 3);
assert.strictEqual(intervalo.waves.primeiraWavePonteiroErrante, 2);
assert.strictEqual(intervalo.waves.primeiraWaveParadoxoBlindado, 4);
assert.deepStrictEqual(Array.from(intervalo.relogiosDeRuptura.wavesDeAtivacao), [3, 6, 9]);
assert.strictEqual(intervalo.relogiosDeRuptura.intervaloDeExibicaoMs, 620);
assert.strictEqual(intervalo.relogiosDeRuptura.tempoDeRespostaMs, 5000);
assert.strictEqual(intervalo.relogiosDeRuptura.percentualDeLentidao, 0.35);
assert.strictEqual(intervalo.relogiosDeRuptura.duracaoDaLentidaoMs, 4000);
assert.strictEqual(intervalo.relogiosDeRuptura.ecosTemporaisPorFalha, 2);
assert.strictEqual(intervalo.relogiosDeRuptura.raioDeClique, 42);
assert.strictEqual(intervalo.relogiosDeRuptura.distanciaMinimaDasTorres, 70);
assert.deepStrictEqual(
    Array.from(intervalo.cenaFinal.etapas, etapa => etapa.id),
    ["aproximacao", "pergunta"]
);
assert.ok(intervalo.cenaFinal.verdade.some(etapa => etapa.id === "selado"));
assert.strictEqual(intervalo.cenaFinal.verdade.at(-1).id, "retorno");
assert.strictEqual(intervalo.cenaFinal.silencio.at(-1).id, "castelo");
assert.strictEqual(intervalo.cenaFinal.etapas[1].titulo, "???");

assert.strictEqual(capitulo3.requerVitoriaNoIntervaloPerdido, true);
assert.strictEqual(fase13.tema, "linhaTemporal");
assert.strictEqual(fase13.descricao, "Linha de Frente Temporal");
assert.deepStrictEqual(Array.from(linhaTemporal.interferencia.wavesDeAtivacao), [4, 8, 12, 16, 20]);
assert.strictEqual(linhaTemporal.interferencia.multiplicadorDeVelocidade, 1.25);
assert.strictEqual(linhaTemporal.interferencia.duracaoDaAceleracaoMs, 6000);
assert.strictEqual(linhaTemporal.interferencia.quantidadeDeTorresEmEstase, 2);
assert.strictEqual(linhaTemporal.interferencia.duracaoDaEstaseMs, 3200);
assert.ok(Array.isArray(Array.from(caminhos[13])) && caminhos[13].length > 2);
assert.ok(Array.isArray(Array.from(caminhos[100])) && caminhos[100].length > 2);
assert.strictEqual(CONFIG.torre.limitesPorFase[13], 15);
assert.strictEqual(CONFIG.torre.limitesPorFase[100], 12);

assert.strictEqual(CONFIG.inimigo.carcereiroDoIntervalo.vida, 3500);
assert.strictEqual(CONFIG.inimigo.fragmentoDeSegundo.vida, 140);
assert.strictEqual(CONFIG.inimigo.ponteiroErrante.velocidade, 2.45);
assert.strictEqual(CONFIG.inimigo.paradoxoBlindado.reducaoDeDano, 0.18);
assert.strictEqual(CONFIG.inimigo.carcereiroDoIntervalo.reducaoDeDanoNoPassado, 0.18);
assert.strictEqual(CONFIG.inimigo.carcereiroDoIntervalo.multiplicadorDeVelocidadeNoIntervalo, 1.35);
assert.strictEqual(CONFIG.audio.musicaDoIntervaloPerdido.nomeInterno, "Ecos do Limbo");
assert.strictEqual(CONFIG.audio.musicaDoIntervaloPerdido.intervaloDoPasso, 480);
assert.strictEqual(CONFIG.audio.musicaDoIntervaloPerdido.volumeRelativo, 1.9);
assert.strictEqual(CONFIG.audio.musicaGuardadaDoIntervaloPerdido, undefined);
const melodiaDoIntervalo = Array.from(CONFIG.audio.musicaDoIntervaloPerdido.melodia);
assert.strictEqual(melodiaDoIntervalo.length, 64);
assert.deepStrictEqual(
    melodiaDoIntervalo.slice(0, 16),
    [
        523.25, 0, 659.25, 0,
        783.99, 698.46, 0, 587.33,
        493.88, 0, 739.99, 0,
        659.25, 587.33, 0, 392
    ]
);
assert.deepStrictEqual(
    melodiaDoIntervalo.slice(-16),
    [1046.5022612023945, 0, 783.9908719634985, 0, 659.2551138257398,
        587.3295358348151, 0, 493.8833012561241, 523.2511306011972, 0,
        391.99543598174927, 0, 329.6275569128699, 293.6647679174076, 0,
        261.6255653005986]
);
assert.deepStrictEqual(
    Array.from(CONFIG.audio.musicaDoIntervaloPerdido.badaladas),
    [1046.5, 1318.51, 987.77, 1567.98]
);
assert.strictEqual(CONFIG.audio.musicaDaLinhaTemporal.nomeInterno, "Guerra dos Séculos");
assert.strictEqual(CONFIG.audio.musicaDaLinhaTemporal.intervaloDoPasso, 280);
assert.strictEqual(CONFIG.audio.musicaDaLinhaTemporal.volumeRelativo, 1.85);
assert.strictEqual(CONFIG.audio.musicaDaLinhaTemporal.multiplicadorDaEraEmDestaque, 1.25);
assert.strictEqual(CONFIG.audio.musicaDaLinhaTemporal.multiplicadorDasErasEmRecuo, 0.68);
assert.strictEqual(CONFIG.audio.musicaDaLinhaTemporal.notasDoPassado.length, 64);
assert.strictEqual(CONFIG.audio.musicaDaLinhaTemporal.pulsoDoPresente.length, 64);
assert.strictEqual(CONFIG.audio.musicaDaLinhaTemporal.arpejoDoFuturo.length, 64);

const notasDosEcosDoLimbo = [];
const destinoDosEcosDoLimbo = {};
const contextoDosEcosDoLimbo = {
    passoDaMusicaDaSelva: 0,
    ganhoDaMusicaDaSelva: destinoDosEcosDoLimbo,
    tocarNotaSintetizada(...argumentos) { notasDosEcosDoLimbo.push(argumentos); }
};
vm.createContext(contextoDosEcosDoLimbo);
vm.runInContext(extrairFuncao("tocarPassoDaMusicaDoIntervaloPerdido"), contextoDosEcosDoLimbo);
for (let passo = 0; passo < CONFIG.audio.musicaDoIntervaloPerdido.melodia.length; passo++) {
    contextoDosEcosDoLimbo.tocarPassoDaMusicaDoIntervaloPerdido(
        { currentTime: passo },
        CONFIG.audio.musicaDoIntervaloPerdido
    );
}
assert.ok(notasDosEcosDoLimbo.length > 0);
assert.ok(notasDosEcosDoLimbo.every(([, , , , , destino]) => destino === destinoDosEcosDoLimbo));

const notasDaLinhaTemporal = [];
const ruidosDaLinhaTemporal = [];
const destinoDaLinhaTemporal = {};
const contextoDaLinhaTemporal = {
    passoDaMusicaDaSelva: 0,
    frenteTemporalAtiva: null,
    ganhoDaMusicaDaSelva: destinoDaLinhaTemporal,
    tocarNotaSintetizada(...argumentos) { notasDaLinhaTemporal.push(argumentos); },
    tocarRuidoSintetizado(...argumentos) { ruidosDaLinhaTemporal.push(argumentos); }
};
vm.createContext(contextoDaLinhaTemporal);
vm.runInContext(extrairFuncao("tocarPassoDaMusicaDaLinhaTemporal"), contextoDaLinhaTemporal);
for (let passo = 0; passo < CONFIG.audio.musicaDaLinhaTemporal.pulsoDoPresente.length; passo++) {
    contextoDaLinhaTemporal.tocarPassoDaMusicaDaLinhaTemporal(
        { currentTime: passo },
        CONFIG.audio.musicaDaLinhaTemporal
    );
}
assert.ok(notasDaLinhaTemporal.some(([, , , tipo]) => tipo === "triangle"));
assert.ok(notasDaLinhaTemporal.some(([, , , tipo]) => tipo === "square"));
assert.ok(notasDaLinhaTemporal.some(([, , , tipo]) => tipo === "sine"));
assert.ok(notasDaLinhaTemporal.every(([, , , , , destino]) => destino === destinoDaLinhaTemporal));
assert.strictEqual(ruidosDaLinhaTemporal.length, 64);

const notasComPassadoEmDestaque = [];
const contextoDoDestaqueMusical = {
    passoDaMusicaDaSelva: 0,
    frenteTemporalAtiva: { entrada: { id: "passado" } },
    ganhoDaMusicaDaSelva: {},
    tocarNotaSintetizada(...argumentos) { notasComPassadoEmDestaque.push(argumentos); },
    tocarRuidoSintetizado() {}
};
vm.createContext(contextoDoDestaqueMusical);
vm.runInContext(extrairFuncao("tocarPassoDaMusicaDaLinhaTemporal"), contextoDoDestaqueMusical);
contextoDoDestaqueMusical.tocarPassoDaMusicaDaLinhaTemporal(
    { currentTime: 0 },
    CONFIG.audio.musicaDaLinhaTemporal
);
const notaDoPassadoEmDestaque = notasComPassadoEmDestaque.find(
    ([frequencia, , , tipo]) => frequencia === 130.81 && tipo === "triangle"
);
assert.ok(notaDoPassadoEmDestaque);
assert.ok(Math.abs(notaDoPassadoEmDestaque[4] - 0.0875) < 0.000001);
assert.strictEqual(CONFIG.inimigo.executorCronal.vida, 4340);
assert.deepStrictEqual(
    Array.from(CONFIG.inimigo.executorCronal.percentuaisDeVidaParaOrdem),
    [0.6, 0.3]
);

const avisosDosRelogios = [];
const inimigosCriados = [];
const contextoDosRelogios = {
    CONFIG,
    Date,
    Math,
    faseSelecionada: 100,
    wave: 3,
    desafioDosRelogiosDoIntervalo: null,
    lentidaoDosRelogiosDoIntervaloExpiraEm: 0,
    localizar(texto) { return texto; },
    mostrarAviso(texto) { avisosDosRelogios.push(texto); },
    criarInimigo(tipo) { inimigosCriados.push(tipo); }
};
vm.createContext(contextoDosRelogios);
vm.runInContext([
    extrairFuncao("faseAtualEhIntervaloPerdido"),
    extrairFuncao("sortearSequenciaDosRelogiosDoIntervalo"),
    extrairFuncao("iniciarDesafioDosRelogiosDoIntervalo"),
    extrairFuncao("atualizarDesafioDosRelogiosDoIntervalo"),
    extrairFuncao("concluirDesafioDosRelogiosDoIntervalo")
].join("\n"), contextoDosRelogios);

assert.strictEqual(contextoDosRelogios.iniciarDesafioDosRelogiosDoIntervalo(1000), true);
assert.deepStrictEqual(
    Array.from(contextoDosRelogios.desafioDosRelogiosDoIntervalo.sequencia).sort(),
    [0, 1, 2]
);
contextoDosRelogios.atualizarDesafioDosRelogiosDoIntervalo(2860);
assert.strictEqual(contextoDosRelogios.desafioDosRelogiosDoIntervalo.estado, "respondendo");
assert.strictEqual(contextoDosRelogios.desafioDosRelogiosDoIntervalo.terminaEm, 7860);
assert.strictEqual(contextoDosRelogios.concluirDesafioDosRelogiosDoIntervalo(true, 3000), true);
assert.strictEqual(contextoDosRelogios.lentidaoDosRelogiosDoIntervaloExpiraEm, 7000);

contextoDosRelogios.wave = 6;
contextoDosRelogios.iniciarDesafioDosRelogiosDoIntervalo(4000);
assert.strictEqual(contextoDosRelogios.concluirDesafioDosRelogiosDoIntervalo(false, 5000), false);
assert.deepStrictEqual(inimigosCriados, ["ecoTemporal", "ecoTemporal"]);

const reforcosInvocados = [];
const avisosDosBosses = [];
const contextoDosBosses = {
    CONFIG,
    Date,
    criarInimigoInvocado(tipo, origem, deslocamento) {
        reforcosInvocados.push({ tipo, origem, deslocamento });
    },
    mostrarAviso(texto) { avisosDosBosses.push(texto); },
    localizar(texto) { return texto; }
};
vm.createContext(contextoDosBosses);
vm.runInContext([
    extrairFuncao("obterConfiguracaoDoElemento"),
    extrairFuncao("obterCaracteristicasElementaisDoInimigo"),
    extrairFuncao("obterVantagemElementalDoAtaque"),
    extrairFuncao("obterFormaDoCarcereiroDoIntervalo"),
    extrairFuncao("obterVantagemElementalContraInimigo"),
    extrairFuncao("ativarOrdemDoExecutorCronal")
].join("\n"), contextoDosBosses);

const carcereiro = { tipo: "carcereiroDoIntervalo", vida: 5000, vidaMaxima: 5000 };
assert.strictEqual(contextoDosBosses.obterFormaDoCarcereiroDoIntervalo(carcereiro), "passado");
assert.strictEqual(
    contextoDosBosses.obterVantagemElementalContraInimigo("sismico", carcereiro).multiplicadorDeVantagem,
    1.25
);
carcereiro.vida = 3000;
assert.strictEqual(contextoDosBosses.obterFormaDoCarcereiroDoIntervalo(carcereiro), "futuro");
assert.strictEqual(
    contextoDosBosses.obterVantagemElementalContraInimigo("eletrico", carcereiro).multiplicadorDeVantagem,
    1.3
);
carcereiro.vida = 1600;
assert.strictEqual(contextoDosBosses.obterFormaDoCarcereiroDoIntervalo(carcereiro), "intervalo");
assert.strictEqual(contextoDosBosses.obterVantagemElementalContraInimigo("eletrico", carcereiro), null);

const executor = {
    tipo: "executorCronal",
    vida: 1800,
    vidaMaxima: 6200,
    ordensCronaisRealizadas: 0,
    ordemCronalExpiraEm: 0
};
assert.strictEqual(contextoDosBosses.ativarOrdemDoExecutorCronal(executor, 2000), 2);
assert.deepStrictEqual(
    reforcosInvocados.map(item => item.tipo),
    ["raptorAncestral", "droneCacador", "raptorAncestral", "droneCacador"]
);
assert.strictEqual(executor.ordemCronalExpiraEm, 2650);

[
    "relogio-quebrado-intervalo",
    "relogio-quebrado-corpo",
    "relogio-quebrado-aro",
    "relogio-quebrado-mostrador",
    "relogio-quebrado-falta",
    "relogio-rachadura-1",
    "relogio-quebrado-cacos",
    "camada-transicao-intervalo",
    "onclick=\"interagirComRelogioQuebrado()\""
].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));
const marcasDoRelogio = html.match(/<span class="relogio-quebrado-marcas">([\s\S]*?)<\/span>/);
assert.ok(marcasDoRelogio, "As marcações do relógio de parede devem existir");
assert.strictEqual((marcasDoRelogio[1].match(/<i><\/i>/g) || []).length, 12);

[
    ".relogio-quebrado-intervalo",
    ".relogio-quebrado-corpo",
    ".relogio-quebrado-mostrador",
    ".relogio-quebrado-cacos",
    ".camada-transicao-intervalo",
    ".menu-principal.tema-linhaTemporal",
    ".menu-principal.tema-intervaloPerdido",
    ".fase-tema-linhaTemporal",
    "introducao-intervalo-perdido",
    "armadilha-intervalo",
    "data-capitulo=\"3\""
].forEach(trecho => assert.ok(estilos.includes(trecho), `Estilo ausente: ${trecho}`));

const inicioDoEstiloDoRelogio = estilos.indexOf(".relogio-quebrado-intervalo {");
const fimDoEstiloDoRelogio = estilos.indexOf(".camada-transicao-intervalo {", inicioDoEstiloDoRelogio);
const estiloDoRelogio = estilos.slice(inicioDoEstiloDoRelogio, fimDoEstiloDoRelogio);
assert.match(estiloDoRelogio, /\.relogio-quebrado-corpo \{[\s\S]*?border-radius: 50%/);
assert.match(estiloDoRelogio, /\.relogio-quebrado-corpo \{[\s\S]*?width: 68px;[\s\S]*?height: 68px;/);
assert.match(estiloDoRelogio, /\.relogio-quebrado-mostrador \{[\s\S]*?border-radius: 50%/);
assert.ok(estiloDoRelogio.includes(".relogio-quebrado-marcas i:nth-child(12)"));
assert.ok(estiloDoRelogio.includes(".relogio-quebrado-falta"));
assert.ok(!/rotate\(|scale\(/.test(estiloDoRelogio), "O relógio do lobby deve preservar pixels retos, sem rotação ou escala");

assert.ok(codigo.includes("function desenharRelogiosDeRuptura("));
assert.ok(codigo.includes("function mostrarIntroducaoDoIntervaloPerdido("));
assert.ok(codigo.includes("function mostrarConversaDaArmadilhaDoIntervalo("));
assert.ok(codigo.includes("function avancarConversaDaArmadilhaDoIntervalo("));
assert.ok(codigo.includes("function iniciarTransicaoDoIntervalo("));
assert.ok(codigo.includes("function desenharFragmentoDeSegundo("));
assert.ok(codigo.includes("function desenharPonteiroErrante("));
assert.ok(codigo.includes("function desenharParadoxoBlindado("));
assert.ok(codigo.includes("function desenharMarcasDoIntervaloPerdido("));
assert.ok(codigo.includes("function desenharFundoDoLimbo("));
assert.ok(codigo.includes("function desenharIlhaDoLimbo("));
assert.ok(codigo.includes("function desenharRelogioFlutuanteDoLimbo("));
assert.ok(codigo.includes("function tocarPassoDaMusicaDoIntervaloPerdido("));
assert.ok(codigo.includes("function tocarPassoDaMusicaDaLinhaTemporal("));
assert.ok(!codigo.includes("Linha Morta"));
assert.ok(!codigo.includes("musicaGuardadaDoIntervaloPerdido"));
assert.ok(!codigo.includes("atualizarMisturaDaMusicaDoIntervaloPerdido"));
assert.match(codigo, /intervaloPerdido: Object\.freeze\(\{[\s\S]*?terrenoBase: "#fbfbf7"/);
assert.ok(codigo.includes("function ativarInterferenciaDoSenhorDoTempo("));
assert.ok(codigo.includes("function desenharCarcereiroDoIntervalo("));
assert.ok(codigo.includes("function desenharExecutorCronal("));
assert.ok(codigo.includes('"O Intervalo Perdido": "The Lost Interval"'));
assert.ok(codigo.includes('"Linha de Frente Temporal": "Temporal Front Line"'));

assert.match(especificacao, /### Mudança: Intervalo Perdido e desbloqueio do Capítulo 3/);
assert.match(especificacao, /Pixels Corrompidos, Erros Velozes e Blocos Instáveis permanecem exclusivos da Dimensão Glitch/);
assert.match(especificacao, /cenário representa um \*\*limbo temporal\*\*/);
assert.match(especificacao, /aparece diretamente sobre o chão/);
assert.match(especificacao, /relógio analógico pixelado de parede, arrancado e quebrado/);
assert.match(especificacao, /corpo circular de 68 × 68 px, visivelmente menor que as árvores-base de 74 × 100 px/);
assert.match(especificacao, /somente a trilha sintetizada original \*\*Ecos do Limbo\*\*/);
assert.match(especificacao, /composição anteriormente inspirada em Dialtone/);
assert.match(especificacao, /Não sou eu quem controla o que existe naquele lugar/);
assert.match(especificacao, /### Mudança: Fase 13 Linha de Frente Temporal/);
assert.match(especificacao, /composição sintetizada original \*\*Guerra dos Séculos\*\*/);
assert.match(especificacao, /três camadas identificáveis/);
assert.match(especificacao, /waves 3, 6 e 9/);
assert.match(especificacao, /waves 4, 8, 12, 16 e 20/);

console.log("Intervalo Perdido e Fase 13: progressão, relógios, Bosses e interferências validados.");
