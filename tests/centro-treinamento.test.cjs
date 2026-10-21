const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    assert.ok(inicio >= 0, `Função ausente: ${nome}`);
    const inicioDoBloco = codigo.indexOf("{", inicio);
    let profundidade = 0;

    for (let indice = inicioDoBloco; indice < codigo.length; indice++) {
        if (codigo[indice] === "{") profundidade++;
        if (codigo[indice] === "}") profundidade--;
        if (profundidade === 0) return codigo.slice(inicio, indice + 1);
    }

    throw new Error(`Bloco incompleto: ${nome}`);
}

const CONFIG = {
    centroDeTreinamento: {
        tiposDisponiveis: [
            "alvo", "labirinto", "voo", "coleta", "sequencia",
            "carga", "reflexo", "pulso"
        ],
        pulso: { duracaoDoPercurso: 1000 }
    }
};
const contexto = {
    CONFIG,
    localStorage: {
        dados: new Map(),
        getItem(chave) { return this.dados.get(chave) || null; },
        setItem(chave, valor) { this.dados.set(chave, valor); }
    },
    CHAVE_CENTRO_DE_TREINAMENTO: "teste",
    desafioDeTreinamentoAtivo: { iniciadoEm: 1000 }
};
vm.createContext(contexto);
vm.runInContext([
    extrairFuncao("criarHistoricoVazioDoCentroDeTreinamento"),
    extrairFuncao("normalizarHistoricoDoCentroDeTreinamento"),
    extrairFuncao("carregarHistoricoDoCentroDeTreinamento"),
    extrairFuncao("obterPosicaoDoMarcadorDePulso")
].join("\n"), contexto);

const historico = contexto.normalizarHistoricoDoCentroDeTreinamento({
    partidas: 7.8,
    vitorias: 20,
    tiposConcluidos: ["alvo", "carga", "carga", "invalido"],
    recordes: { alvo: 2100, voo: 8360, carga: 4321.4, reflexo: -10, pulso: "6500" }
});
assert.deepStrictEqual(JSON.parse(JSON.stringify(historico)), {
    partidas: 7,
    vitorias: 7,
    tiposConcluidos: ["alvo", "carga"],
    recordesPorImpulsos: { voo: null },
    recordes: {
        alvo: 2100,
        labirinto: null,
        voo: 8360,
        coleta: null,
        sequencia: null,
        carga: 4321,
        reflexo: null,
        pulso: 6500
    }
});
assert.strictEqual(contexto.normalizarHistoricoDoCentroDeTreinamento({
    recordesPorImpulsos: { voo: 12 }
}).recordesPorImpulsos.voo, 12);
assert.strictEqual(contexto.obterPosicaoDoMarcadorDePulso(1000), 0);
assert.strictEqual(contexto.obterPosicaoDoMarcadorDePulso(1250), 0.5);
assert.strictEqual(contexto.obterPosicaoDoMarcadorDePulso(1500), 1);
assert.strictEqual(contexto.obterPosicaoDoMarcadorDePulso(1750), 0.5);

for (const trecho of [
    "centroDeTreinamento: Object.freeze({",
    "apertosNecessarios: 35",
    "acertosNecessarios: 5",
    "centrosDasFaixas: Object.freeze([0.25, 0.68, 0.42])",
    "function mostrarCentroDeTreinamento()",
    "function iniciarMinigameDaCentralDeTreinamento(tipo)",
    "function iniciarMinigameDeTreinamento(tipo, origem = \"central\")",
    "function concederRecompensaDoMinigameDeTreinamentoNoFliperama(tipo)",
    "function acionarControleDoTreinamento()",
    "function finalizarMinigameDeTreinamento(vitoria, agora = Date.now())",
    "CHAVE_CENTRO_DE_TREINAMENTO",
    "treinamento: mostrarCentroDeTreinamento"
]) {
    assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`);
}

assert.match(html, /botao-lobby-treinamento[\s\S]*?mostrarCentroDeTreinamento/);
const scriptPrincipal = html.match(/<script\b[^>]*src="(game\.js\?[^"\s]+)"/);
assert.ok(scriptPrincipal, 'A página deve carregar game.js com versão de cache');
assert.ok(fs.existsSync(path.join(raiz, scriptPrincipal[1].split('?')[0])), 'O script carregado deve existir');
assert.ok(html.includes('id="camada-minigame-treinamento-fliperama"'));

for (const seletor of [
    ".treinamento-grade",
    ".treinamento-cartao",
    ".treinamento-botao-carga",
    ".treinamento-botao-reflexo",
    ".treinamento-medidor",
    ".treinamento-resultado",
    ".camada-minigame-treinamento-fliperama"
]) {
    assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`);
}

for (const chave of [
    '"lobby.treinamento"',
    '"treinamento.alvo.nome"',
    '"treinamento.labirinto.nome"',
    '"treinamento.voo.nome"',
    '"treinamento.coleta.nome"',
    '"treinamento.sequencia.nome"',
    '"treinamento.carga.nome"',
    '"treinamento.reflexo.nome"',
    '"treinamento.pulso.nome"',
    '"treinamento.novoRecorde"'
]) {
    assert.strictEqual(
        codigo.split(chave).length - 1 >= 3,
        true,
        `Tradução incompleta: ${chave}`
    );
}

assert.ok(especificacao.includes("### Centro de Treinamento"));
assert.ok(especificacao.includes("**Carga Máxima**"));
assert.ok(especificacao.includes("**Sinal de Reflexo**"));
assert.ok(especificacao.includes("**Trava de Pulso**"));
assert.ok(especificacao.includes("guardians-of-pixel-centro-treinamento-v1"));
assert.ok(especificacao.includes("um dos oito minigames"));
assert.ok(especificacao.includes("os oito tipos com a mesma chance"));

console.log("Central de Treinamento: oito minigames, recordes e integração validados.");
