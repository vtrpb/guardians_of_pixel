const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const tiposDeDefesa = Object.fromEntries(
    ["a", "b", "c", "d", "e", "f"].map(tipo => [tipo, {}])
);
const conquistas = {
    osSeisGuardioes: {
        nome: "Os Seis Guardiões",
        descricao: "Construa seis defesas.",
        icone: "VI",
        tipoDeCriterio: "especial",
        objetivo: 6
    },
    mestreDoFliperama: {
        nome: "Mestre do Fliperama",
        descricao: "Conclua os cinco minigames.",
        icone: "★",
        tipoDeCriterio: "colecao",
        propriedade: "minigamesFliperamaConcluidos",
        itensObrigatorios: ["alvo", "labirinto", "voo", "coleta", "sequencia"],
        objetivo: 5
    },
    pareORelogio: {
        nome: "Pare o Relógio!",
        descricao: "Ative o pulso na hora certa.",
        icone: "⌛",
        tipoDeCriterio: "especial",
        quantidadeMinimaDeInimigosComuns: 5,
        objetivo: 1
    },
    demolicaoEmMassa: {
        nome: "Demolição em Massa",
        descricao: "Elimine oito inimigos.",
        icone: "BOOM",
        tipoDeCriterio: "especial",
        objetivo: 8
    },
    frequencia09: {
        nome: "Frequência 09",
        nomeBloqueado: "Frequência 09",
        descricao: "Escute a transmissão.",
        descricaoBloqueada: "O futuro guarda uma frequência esquecida.",
        icone: "09",
        iconeBloqueado: "?",
        tipoDeCriterio: "especial",
        secreta: true,
        objetivo: 1
    }
};
const desbloqueadas = [];
const notificacoes = [];
const construcoesParaMissoes = [];
const progressoDasMissoes = [];
const contexto = {
    CONFIG: {
        torre: { tipos: tiposDeDefesa },
        conquistas,
        fliperama: {
            minigame: {
                tiposDisponiveis: ["alvo", "labirinto", "voo", "coleta", "sequencia"]
            }
        }
    },
    tiposDeDefesaConstruidosNaPartida: new Set(),
    estatisticasDasConquistas: { minigamesFliperamaConcluidos: [] },
    progressoMissoesPermanentes: {},
    comprasDaLoja: new Set(),
    obterDadosDoNivel() { return { nivel: 1 }; },
    recompensasPermanentesDasMissoes: { conquistasDesbloqueadas: desbloqueadas },
    maiorFaseConcluida: 0,
    inimigos: [],
    registrarConstrucaoParaMissoes(tipo) { construcoesParaMissoes.push(tipo); },
    registrarProgressoDaMissao(...argumentos) { progressoDasMissoes.push(argumentos); },
    salvarRecompensasPermanentesDasMissoes() {},
    salvarEstatisticasDasConquistas() {},
    atualizarResumoDasConquistasNoMenu() {},
    traduzir(texto) { return texto; },
    obterNomeLocalizado(configuracao) { return configuracao.nome; },
    localizar(texto) { return texto; },
    enfileirarNotificacaoDeProgresso(...argumentos) { notificacoes.push(argumentos); },
    tipoEhBoss(tipo) { return tipo === "boss"; }
};
contexto.entradaSecreta = ["frequencia09", conquistas.frequencia09];
vm.createContext(contexto);
vm.runInContext([
    extrairFuncao("conquistaEstaDesbloqueada"),
    extrairFuncao("obterEstadoDaConquista"),
    extrairFuncao("desbloquearConquista"),
    extrairFuncao("verificarConquistasAutomaticas"),
    extrairFuncao("revalidarConquistaQueDeixouDeCumprir"),
    extrairFuncao("revalidarConquistaMestreDoFliperama"),
    extrairFuncao("registrarDefesaConstruidaParaConquistas"),
    extrairFuncao("registrarMinigameFliperamaConcluidoParaConquistas"),
    extrairFuncao("registrarUsoDoPulsoTemporalParaConquistas"),
    extrairFuncao("registrarEliminacoesDaBombaPesadaParaConquistas"),
    extrairFuncao("registrarTransmissaoProjetoRelogioParaConquistas"),
    extrairFuncao("criarImagemDaConquista"),
    extrairFuncao("criarCartaoDeConquista")
].join("\n"), contexto);

for (const tipo of ["a", "b", "c", "d", "e"]) {
    contexto.registrarDefesaConstruidaParaConquistas(tipo);
}
contexto.registrarDefesaConstruidaParaConquistas("a");
assert.ok(!desbloqueadas.includes("osSeisGuardioes"));
contexto.registrarDefesaConstruidaParaConquistas("f");
assert.ok(desbloqueadas.includes("osSeisGuardioes"));
assert.deepStrictEqual(construcoesParaMissoes, ["a", "b", "c", "d", "e", "a", "f"]);

desbloqueadas.push("mestreDoFliperama");
contexto.estatisticasDasConquistas.minigamesFliperamaConcluidos.push(
    "alvo",
    "labirinto"
);
assert.strictEqual(contexto.revalidarConquistaMestreDoFliperama(), true);
assert.ok(!desbloqueadas.includes("mestreDoFliperama"));
contexto.estatisticasDasConquistas.minigamesFliperamaConcluidos.length = 0;

contexto.registrarMinigameFliperamaConcluidoParaConquistas("voo");
contexto.registrarMinigameFliperamaConcluidoParaConquistas("sequencia");
assert.ok(!desbloqueadas.includes("mestreDoFliperama"));
contexto.registrarMinigameFliperamaConcluidoParaConquistas("alvo");
contexto.registrarMinigameFliperamaConcluidoParaConquistas("alvo");
assert.deepStrictEqual(
    contexto.estatisticasDasConquistas.minigamesFliperamaConcluidos,
    ["voo", "sequencia", "alvo"]
);
assert.ok(!desbloqueadas.includes("mestreDoFliperama"));
contexto.registrarMinigameFliperamaConcluidoParaConquistas("labirinto");
assert.ok(!desbloqueadas.includes("mestreDoFliperama"));
contexto.registrarMinigameFliperamaConcluidoParaConquistas("coleta");
assert.ok(desbloqueadas.includes("mestreDoFliperama"));

assert.ok(codigo.includes(
    "new Set(\n            CONFIG.fliperama.minigame.tiposDisponiveis\n        )"
));

contexto.inimigos = [
    { tipo: "boss", vida: 100 },
    ...Array.from({ length: 4 }, () => ({ tipo: "normal", vida: 10 }))
];
assert.strictEqual(contexto.registrarUsoDoPulsoTemporalParaConquistas(), false);
contexto.inimigos.push({ tipo: "especial", vida: 10 });
assert.strictEqual(contexto.registrarUsoDoPulsoTemporalParaConquistas(), true);
assert.ok(desbloqueadas.includes("pareORelogio"));

assert.strictEqual(contexto.registrarEliminacoesDaBombaPesadaParaConquistas(7), false);
assert.strictEqual(contexto.registrarEliminacoesDaBombaPesadaParaConquistas(8), true);
assert.ok(desbloqueadas.includes("demolicaoEmMassa"));

const cartaoBloqueado = contexto.criarCartaoDeConquista(contexto.entradaSecreta);
assert.ok(cartaoBloqueado.includes("???"));
assert.ok(!cartaoBloqueado.includes("Frequência 09"));
assert.ok(cartaoBloqueado.includes('class="conquista-icone" aria-hidden="true">?</span>'));
assert.ok(cartaoBloqueado.includes("Explore o jogo para descobrir."));
assert.ok(!cartaoBloqueado.includes("O futuro guarda uma frequência esquecida."));
assert.ok(!cartaoBloqueado.includes("Escute a transmissão."));
contexto.registrarTransmissaoProjetoRelogioParaConquistas();
assert.deepStrictEqual(progressoDasMissoes, [["transmissao", 1, true]]);
const cartaoDesbloqueado = contexto.criarCartaoDeConquista(contexto.entradaSecreta);
assert.ok(cartaoDesbloqueado.includes("Frequência 09"));
assert.ok(cartaoDesbloqueado.includes("Escute a transmissão."));
assert.ok(notificacoes.length >= 5);

const inimigosDaExplosao = [
    ...Array.from({ length: 8 }, () => ({ x: 0, y: 0, vida: 20 })),
    { x: 200, y: 200, vida: 20 }
];
const contextoDaExplosao = {
    Math,
    inimigos: inimigosDaExplosao,
    aplicarDanoAoInimigo(inimigo, dano) { inimigo.vida -= dano; }
};
vm.createContext(contextoDaExplosao);
vm.runInContext([
    extrairFuncao("obterInimigosVivosNaArea"),
    extrairFuncao("aplicarDanoEmArea")
].join("\n"), contextoDaExplosao);
assert.strictEqual(contextoDaExplosao.aplicarDanoEmArea(0, 0, 100, 30), 8);

const transmissoesRegistradas = [];
const contextoDaTransmissao = {
    cutsceneDaCartaAtiva: true,
    cutsceneDaTransmissaoRetomaPartida: false,
    camadaCutsceneCarta: { dataset: { tipoCarta: "transmissao" } },
    ocultarCutsceneDaCarta() {},
    registrarTransmissaoProjetoRelogioParaConquistas() {
        transmissoesRegistradas.push("frequencia09");
    },
    definirJogoPausado() {},
    botaoMenuPartida: { focus() {} },
    mostrarPainelDeResultado() {}
};
vm.createContext(contextoDaTransmissao);
vm.runInContext(extrairFuncao("concluirCutsceneDaCarta"), contextoDaTransmissao);
contextoDaTransmissao.concluirCutsceneDaCarta();
assert.deepStrictEqual(transmissoesRegistradas, ["frequencia09"]);

console.log("Novas conquistas: construção, minigames, Pulso, Bomba e transmissão validados.");
