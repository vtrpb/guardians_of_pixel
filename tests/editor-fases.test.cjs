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

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const contexto = {
    CONFIG: {
        editorDeFases: {
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
contexto.codigoAdulterado = `${codigoCompartilhado.slice(0, -1)}x`;
assert.strictEqual(vm.runInContext("importarMapaPeloCodigo(codigoAdulterado)", contexto), null);

[
    'id="botao-editor-menu"',
    'class="botao-lobby-extra botao-lobby-editor botao-lobby-editor-bloqueado"',
    'onclick="mostrarEditorDeFases()"',
    'disabled aria-disabled="true"',
    'id="estado-editor-menu">Requer nível 5',
    'data-i18n="lobby.editor"',
    "build=salvos-28"
].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

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
    "if (!mapaPersonalizadoAtivo) {\n                    registrarInimigoEliminadoParaMissoes();"
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
