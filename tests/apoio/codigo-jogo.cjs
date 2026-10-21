const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const raiz = path.resolve(__dirname, "../..");

function lerCodigo(arquivo = "game.js") {
    return fs.readFileSync(path.join(raiz, arquivo), "utf8");
}

function extrairFuncao(nome, arquivo = "game.js") {
    const codigo = lerCodigo(arquivo);
    const inicio = codigo.indexOf(`function ${nome}(`);
    assert.ok(inicio >= 0, `Função ausente: ${arquivo}:${nome}`);
    // O compilador determina o fim, inclusive com chaves em strings e templates.
    let fim = codigo.indexOf("}", inicio);
    while (fim !== -1) {
        const trecho = codigo.slice(inicio, fim + 1);
        try {
            new vm.Script(`(${trecho})`);
            return trecho;
        } catch (erro) {
            if (!(erro instanceof SyntaxError)) throw erro;
        }
        fim = codigo.indexOf("}", fim + 1);
    }
    throw new Error(`Função incompleta: ${nome}`);
}

function carregarConfig() {
    const contexto = vm.createContext({});
    vm.runInContext(lerCodigo("modulos/fase18.js"), contexto);
    const fabricas = [
        ["game.js", "ampliarComposicaoExistente"],
        ["game.js", "criarTrilhaDoEvento"],
        ["game.js", "criarConfiguracaoDoInimigoIron"],
        ["modulos/missoes.js", "criarCatalogoDeMissoesPermanentes"],
        ["modulos/missoes.js", "criarSkinFinalDeMissoes"],
        ["modulos/conquistas-extras.js", "criarConquistasExtras"],
        ["modulos/musicas-classicas.js", "criarPartiturasClassicas"],
        ["modulos/biomas-classicos.js", "criarVisualDaTorreAquatica"],
        ["modulos/biomas-classicos.js", "criarVisualDaTorreDeBolhas"],
        ["modulos/canhao-blindado.js", "criarVisualDoCanhaoBlindado"]
    ];
    for (const [arquivo, nome] of fabricas) {
        vm.runInContext(extrairFuncao(nome, arquivo), contexto);
    }
    const codigo = lerCodigo();
    const inicio = codigo.indexOf("const CONFIG = Object.freeze({");
    const fim = codigo.indexOf("// Cada fase possui", inicio);
    assert.ok(inicio >= 0 && fim > inicio);
    return vm.runInContext(codigo.slice(inicio, fim) + "\nCONFIG;", contexto);
}

module.exports = { lerCodigo, extrairFuncao, carregarConfig };
