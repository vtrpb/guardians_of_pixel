const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);
const listaDeTermos = codigo.match(/termosProibidos: Object\.freeze\(\[([\s\S]*?)\]\)/);
assert.ok(listaDeTermos, "Lista de moderação ausente em CONFIG");
const termosProibidos = JSON.parse(`[${listaDeTermos[1]}]`);
const listaDeExpressoes = codigo.match(/expressoesProibidas: Object\.freeze\(\[([\s\S]*?)\]\)/);
assert.ok(listaDeExpressoes, "Lista de expressões de moderação ausente em CONFIG");
const expressoesProibidas = JSON.parse(`[${listaDeExpressoes[1]}]`);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const contexto = {
    CONFIG: {
        editorDeFases: {
            moderacao: { termosProibidos, expressoesProibidas, tentativasParaBloqueio: 3, duracaoBloqueioMs: 600000 },
            maximoDeWaves: 20,
            maximoDeGruposPorWave: 6,
            maximoDeInimigosPorGrupo: 50,
            maximoDeInimigosPorMapa: 600,
            minimoDeCreditos: 150,
            maximoDeCreditos: 2000,
            passoDeCreditos: 50,
            minimoDeTorres: 3,
            maximoDeTorres: 30,
            cenarios: [{ id: "campo" }, { id: "artico" }],
            caminhos: [{ id: "ziguezague" }, { id: "serpente" }],
            inimigos: ["normal", "rapido", "boss"],
            percentuaisDeDecoracoes: [0, 0.35, 0.7, 1]
        }
    },
    Date,
    Math,
    JSON,
    TextEncoder,
    TextDecoder,
    Uint8Array,
    btoa,
    atob
};
vm.createContext(contexto);
vm.runInContext(`
    ${extrairFuncao("clonarMapaDoEditor")}
    ${extrairFuncao("contarInimigosDoMapa")}
    ${extrairFuncao("censurarTextoDoEditor")}
    ${extrairFuncao("normalizarMapaDoEditor")}
    ${extrairFuncao("calcularAssinaturaDoCodigoDoEditor")}
    ${extrairFuncao("codificarTextoDoEditor")}
    ${extrairFuncao("decodificarTextoDoEditor")}
    ${extrairFuncao("gerarCodigoDoMapaNoEditor")}
    ${extrairFuncao("importarMapaPeloCodigo")}
`, contexto);

const mapaValido = {
    id: "mapa-teste",
    nome: "Caminho Congelado",
    criador: "Lequ48",
    descricao: "Um teste com duas waves.",
    tema: "artico",
    idDoCaminho: "serpente",
    nivelDeDecoracoes: 2,
    creditosIniciais: 500,
    limiteDeTorres: 12,
    waves: [
        { grupos: [{ tipo: "normal", quantidade: 10 }, { tipo: "rapido", quantidade: 4 }] },
        { grupos: [{ tipo: "boss", quantidade: 1 }] }
    ],
    publicado: false,
    atualizadoEm: 1
};

contexto.mapaDoTeste = mapaValido;
const normalizado = JSON.parse(JSON.stringify(
    vm.runInContext("normalizarMapaDoEditor(mapaDoTeste)", contexto)
));
assert.strictEqual(normalizado.nome, "Caminho Congelado");
assert.strictEqual(normalizado.waves.length, 2);
assert.strictEqual(contexto.censurarTextoDoEditor("Computador grande").texto, "Computador grande");
assert.strictEqual(contexto.censurarTextoDoEditor("Mapa MERDA livre").texto, "Mapa livre");
assert.strictEqual(contexto.censurarTextoDoEditor("Uma PUTAIN fase").texto, "Uma fase");
assert.strictEqual(contexto.censurarTextoDoEditor("No SHIT here").texto, "No here");
assert.strictEqual(contexto.censurarTextoDoEditor("Qué cabrón").texto, "Qué");
assert.strictEqual(contexto.censurarTextoDoEditor("Scheiße mapa").texto, "mapa");
assert.strictEqual(contexto.censurarTextoDoEditor("Mapa filho da puta novo").texto, "Mapa novo");
assert.strictEqual(contexto.censurarTextoDoEditor("Uma fase vai se ferrar logo").texto, "Uma fase logo");
assert.strictEqual(contexto.censurarTextoDoEditor("Mapa pqp difícil").texto, "Mapa difícil");
assert.strictEqual(contexto.censurarTextoDoEditor("Autor f.d.p incrível").texto, "Autor incrível");
assert.strictEqual(contexto.censurarTextoDoEditor("Criador imbecil").texto, "Criador");
assert.strictEqual(contexto.censurarTextoDoEditor("Um filho da floresta").texto, "Um filho da floresta");
assert.strictEqual(contexto.censurarTextoDoEditor("FDPixel").texto, "FDPixel");
const mapaComTermos = contexto.normalizarMapaDoEditor({
    ...mapaValido,
    nome: "Mapa MERDA livre",
    criador: "shit",
    descricao: "Uma PUTAIN fase"
});
assert.strictEqual(mapaComTermos.nome, "Mapa livre");
assert.strictEqual(mapaComTermos.criador, "Anônimo");
assert.strictEqual(mapaComTermos.descricao, "Uma fase");

const armazenamentoDaModeracao = new Map();
let agoraDaModeracao = 1000000;
const contextoModeracao = {
    CONFIG: contexto.CONFIG,
    CHAVE_MODERACAO_DO_EDITOR: "guardians-of-pixel-editor-moderacao-v1",
    Date: { now: () => agoraDaModeracao },
    localStorage: {
        getItem(chave) { return armazenamentoDaModeracao.get(chave) || null; },
        setItem(chave, valor) { armazenamentoDaModeracao.set(chave, valor); }
    }
};
vm.createContext(contextoModeracao);
vm.runInContext(`
    ${extrairFuncao("carregarEstadoModeracaoDoEditor")}
    ${extrairFuncao("salvarEstadoModeracaoDoEditor")}
    ${extrairFuncao("editorEstaBloqueado")}
    ${extrairFuncao("registrarTextoProibidoNoEditor")}
    let estadoModeracaoDoEditor = carregarEstadoModeracaoDoEditor();
`, contextoModeracao);
for (let tentativa = 1; tentativa <= 2; tentativa++) {
    vm.runInContext("registrarTextoProibidoNoEditor()", contextoModeracao);
    assert.strictEqual(vm.runInContext("editorEstaBloqueado()", contextoModeracao), false);
}
vm.runInContext("registrarTextoProibidoNoEditor()", contextoModeracao);
assert.strictEqual(vm.runInContext("editorEstaBloqueado()", contextoModeracao), true);
assert.strictEqual(
    JSON.parse(armazenamentoDaModeracao.get(contextoModeracao.CHAVE_MODERACAO_DO_EDITOR)).bloqueadoAte,
    agoraDaModeracao + 600000
);
agoraDaModeracao += 600001;
assert.strictEqual(vm.runInContext("editorEstaBloqueado()", contextoModeracao), false);
assert.strictEqual(vm.runInContext("estadoModeracaoDoEditor.tentativas", contextoModeracao), 0);
assert.strictEqual(vm.runInContext("contarInimigosDoMapa(mapaDoTeste)", contexto), 15);

for (const alteracaoInvalida of [
    { nome: "" },
    { criador: "x".repeat(19) },
    { creditosIniciais: 175 },
    { limiteDeTorres: 31 },
    { tema: "inexistente" },
    { idDoCaminho: "inexistente" },
    { waves: [] },
    { waves: [{ grupos: [{ tipo: "normal", quantidade: 51 }] }] },
    { waves: [{ grupos: [{ tipo: "desconhecido", quantidade: 1 }] }] }
]) {
    contexto.mapaInvalido = { ...mapaValido, ...alteracaoInvalida };
    assert.strictEqual(vm.runInContext("normalizarMapaDoEditor(mapaInvalido)", contexto), null);
}

contexto.mapaGrande = {
    ...mapaValido,
    waves: Array.from({ length: 20 }, () => ({
        grupos: [{ tipo: "normal", quantidade: 31 }]
    }))
};
assert.strictEqual(vm.runInContext("normalizarMapaDoEditor(mapaGrande)", contexto), null);

const codigoCompartilhado = vm.runInContext("gerarCodigoDoMapaNoEditor(mapaDoTeste)", contexto);
assert.ok(codigoCompartilhado.startsWith("GP-MAPA-1."));
contexto.codigoCompartilhado = codigoCompartilhado;
const importado = JSON.parse(JSON.stringify(
    vm.runInContext("importarMapaPeloCodigo(codigoCompartilhado)", contexto)
));
assert.strictEqual(importado.nome, mapaValido.nome);
assert.strictEqual(importado.criador, "Lequ48");
assert.strictEqual(importado.publicado, true);
assert.strictEqual(importado.idDoMapaOriginal, mapaValido.id);
const cargaAntiga = contexto.codificarTextoDoEditor(JSON.stringify({
    versao: 1,
    mapa: Object.fromEntries(Object.entries(mapaValido).filter(([chave]) =>
        !["id", "publicado", "atualizadoEm"].includes(chave)
    ))
}));
contexto.codigoAntigo = `GP-MAPA-1.${cargaAntiga}.${contexto.calcularAssinaturaDoCodigoDoEditor(cargaAntiga)}`;
assert.strictEqual(contexto.importarMapaPeloCodigo(contexto.codigoAntigo).nome, mapaValido.nome);
assert.strictEqual(contexto.importarMapaPeloCodigo(contexto.codigoAntigo).idDoMapaOriginal, undefined);
contexto.codigoAdulterado = `${codigoCompartilhado.slice(0, -1)}x`;
assert.strictEqual(vm.runInContext("importarMapaPeloCodigo(codigoAdulterado)", contexto), null);

const botaoEditor = html.match(/<button\b[^>]*id="botao-editor-menu"[^>]*>[\s\S]*?<\/button>/)?.[0];
assert.ok(botaoEditor, 'Atalho do editor ausente');
const classesEditor = botaoEditor.match(/class="([^"]*)"/)[1].split(/\s+/);
['botao-lobby-salvos', 'lobby-atalho', 'botao-lobby-editor', 'botao-lobby-editor-bloqueado']
    .forEach(classe => assert.ok(classesEditor.includes(classe), `Classe do atalho ausente: ${classe}`));
assert.match(botaoEditor, /id="estado-editor-menu"[^>]*>Requer nível 5/);
assert.match(botaoEditor, /aria-describedby="estado-editor-menu"/);
assert.match(botaoEditor, /src="assets\/atalho-editor.svg"/);
assert.ok(fs.existsSync(path.join(raiz, 'assets/atalho-editor.svg')));
const scriptJogo = html.match(/<script\b[^>]*src="(game\.js(?:\?[^"]*)?)"[^>]*><\/script>/);
assert.ok(scriptJogo, 'Carregamento do jogo ausente');
assert.ok(fs.existsSync(path.join(raiz, scriptJogo[1].split('?')[0])));
[
    'id="botao-editor-menu"',
    'onclick="mostrarEditorDeFases()"',
    'disabled aria-disabled="true"',
    'data-i18n="lobby.editor"'
].forEach(trecho => assert.ok(botaoEditor.includes(trecho), `Interface ausente: ${trecho}`));

[
    'const CHAVE_MAPAS_DO_EDITOR = "guardians-of-pixel-editor-mapas-v1"',
    "editorDeFases: Object.freeze({",
    "nivelNecessarioParaDesbloqueio: 5",
    "maximoDeMapasCriados: 2",
    "maximoDeMapasImportados: 20",
    "maximoDeInimigosPorMapa: 600",
    "function editorDeFasesEstaDesbloqueado()",
    "function atualizarDisponibilidadeDoEditor()",
    "function mostrarEditorDeFases(",
    'if (!editorDeFasesEstaDesbloqueado()) {',
    "function mostrarFormularioDoEditor(",
    "function desenharPreviaDoEditor(",
    "function gerarCodigoDoMapaNoEditor(",
    "function importarMapaPeloCodigo(",
    "function configurarComposicaoDaWavePersonalizada(",
    "if (!mapaPersonalizadoAtivo) {\n                    registrarInimigoEliminadoParaMissoes(inimigo);"
].forEach(trecho => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

[
    ".botao-lobby-editor",
    ".botao-lobby-editor:disabled",
    ".botao-lobby-editor-bloqueado small",
    ".editor-mapas-grade",
    ".editor-formulario-layout",
    ".editor-wave-cartao",
    ".editor-previa-painel"
].forEach(seletor => assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: editor simples de fases",
    "Requer nível 5",
    "liberado imediatamente quando o jogador alcança o nível 5",
    "no máximo 2 mapas próprios",
    "no máximo 600 inimigos",
    "código `GP-MAPA-1`",
    "não alteram campanha, Fragmentos, XP, Missões, Conquistas ou Álbum"
].forEach(trecho => assert.ok(especificacao.includes(trecho), `Especificação ausente: ${trecho}`));

console.log("Editor de fases: criação, limites, compartilhamento e modo seguro validados.");
