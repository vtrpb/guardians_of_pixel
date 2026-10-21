const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
// Valida a aplicação da raiz, usada pelo servidor e pela suíte funcional.
for (const diretorio of [raiz]) {
    const html = fs.readFileSync(path.join(diretorio, "index.htm"), "utf8");
    const codigo = fs.readFileSync(path.join(diretorio, "game.js"), "utf8");
    const estilos = fs.readFileSync(path.join(diretorio, "styles.css"), "utf8");
    const especificacao = fs.readFileSync(
        path.join(diretorio, "docs", "ESPECIFICACAO.md"),
        "utf8"
    );

    [
        'class="botao-lobby-salvos lobby-atalho"',
        'onclick="mostrarSalvos()"',
        'data-i18n-aria-label="lobby.salvos"'
    ].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

    [
        'const CHAVE_SISTEMA_DE_SALVOS = "guardians-of-pixel-salvos-v1"',
        "salvos: Object.freeze({",
        "quantidadeDeEspacos: 3",
        "function inicializarSistemaDeSalvos()",
        "function atualizarSalvoAtivo()",
        "function trocarSalvoAtivo(numeroDoSalvo)",
        "function mostrarSalvos()",
        'definirTelaDoMenuAberta("salvos")',
        "salvos: mostrarSalvos"
    ].forEach(trecho => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

    [
        ".botao-lobby-salvos",
        ".salvos-aviso",
        ".salvos-grade",
        ".salvo-cartao-ativo",
        ".salvo-cartao-vazio",
        ".salvo-resumo",
        ".salvo-acao"
    ].forEach(seletor => assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`));

    [
        "### Mudança: três espaços de save",
        "todo o progresso local existente é migrado automaticamente para o Save 1",
        "Save 2 e Save 3 permanecem vazios",
        "Idioma, volumes de áudio e iluminação são preferências globais",
        "guardians-of-pixel-salvos-v1"
    ].forEach(trecho => assert.ok(
        especificacao.includes(trecho),
        `Especificação ausente: ${trecho}`
    ));
}

const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const inicioDasFuncoes = codigo.indexOf("function chavePertenceAoProgressoDoSalvo(");
const fimDasFuncoes = codigo.indexOf("\nlet sistemaDeSalvos =", inicioDasFuncoes);
assert.ok(inicioDasFuncoes >= 0 && fimDasFuncoes > inicioDasFuncoes);
const funcoesDosSalvos = codigo.slice(inicioDasFuncoes, fimDasFuncoes);

const CHAVE_SISTEMA = "guardians-of-pixel-salvos-v1";
const CHAVE_IDIOMA = "guardians-of-pixel-idioma-v1";
const CHAVE_PREFERENCIAS = "guardians-of-pixel-preferencias-v1";
const CHAVE_FASES = "tower-defense-2-progresso-fases-v2";
const CHAVE_FRAGMENTOS = "guardians-of-pixel-fragmentos-v2";
const CHAVE_COMPRAS = "guardians-of-pixel-compras-v2";
const CHAVE_NIVEL = "guardians-of-pixel-progressao-nivel-v1";
const CHAVE_SUPREMAS = "guardians-of-pixel-supremas-v1";
const supremasOriginais = JSON.stringify({ desbloqueadas: ["supremaCronarca"], equipada: "supremaCronarca" });
const armazenamento = new Map([
    [CHAVE_SUPREMAS, supremasOriginais],
    [CHAVE_FASES, "13"],
    [CHAVE_FRAGMENTOS, "87"],
    [CHAVE_COMPRAS, JSON.stringify(["torreDeRaios", "minaTerrestre"])],
    [CHAVE_NIVEL, JSON.stringify({ experienciaTotal: 10400, historicoImportado: true })],
    [CHAVE_IDIOMA, "pt-BR"],
    [CHAVE_PREFERENCIAS, JSON.stringify({ modoNoturno: true, volumeMusica: 0.2 })]
]);
let recarregamentos = 0;
const armazenamentoLocal = {
    get length() {
        return armazenamento.size;
    },
    key(indice) {
        return [...armazenamento.keys()][indice] ?? null;
    },
    getItem(chave) {
        return armazenamento.has(chave) ? armazenamento.get(chave) : null;
    },
    setItem(chave, valor) {
        armazenamento.set(chave, String(valor));
    },
    removeItem(chave) {
        armazenamento.delete(chave);
    }
};
const contexto = {
    CONFIG: { salvos: { versao: 1, quantidadeDeEspacos: 3 } },
    CHAVE_SISTEMA_DE_SALVOS: CHAVE_SISTEMA,
    PREFIXOS_DOS_DADOS_DE_PROGRESSO: ["guardians-of-pixel-", "tower-defense-2-"],
    CHAVES_GLOBAIS_DO_JOGO: [CHAVE_SISTEMA, CHAVE_IDIOMA, CHAVE_PREFERENCIAS],
    localStorage: armazenamentoLocal,
    window: { location: { reload() { recarregamentos++; } } },
    mostrarAviso() {},
    traduzir(chave) { return chave; },
    sistemaDeSalvos: null
};
vm.createContext(contexto);
vm.runInContext(`
    ${funcoesDosSalvos}
    sistemaDeSalvos = inicializarSistemaDeSalvos();
`, contexto);

let sistema = JSON.parse(armazenamento.get(CHAVE_SISTEMA));
assert.strictEqual(sistema.indiceAtivo, 0);
assert.strictEqual(sistema.espacos.length, 3);
assert.strictEqual(sistema.espacos[0].dados[CHAVE_FASES], "13");
assert.strictEqual(sistema.espacos[0].dados[CHAVE_FRAGMENTOS], "87");
assert.strictEqual(sistema.espacos[0].dados[CHAVE_SUPREMAS], supremasOriginais);
assert.strictEqual(sistema.espacos[1], null);
assert.strictEqual(sistema.espacos[2], null);
assert.ok(!(CHAVE_IDIOMA in sistema.espacos[0].dados));
assert.ok(!(CHAVE_PREFERENCIAS in sistema.espacos[0].dados));

assert.strictEqual(vm.runInContext("trocarSalvoAtivo(2)", contexto), true);
assert.strictEqual(recarregamentos, 1);
assert.strictEqual(armazenamento.has(CHAVE_FASES), false);
assert.strictEqual(armazenamento.has(CHAVE_FRAGMENTOS), false);
assert.strictEqual(armazenamento.has(CHAVE_SUPREMAS), false);
assert.strictEqual(armazenamento.get(CHAVE_IDIOMA), "pt-BR");
assert.deepStrictEqual(
    JSON.parse(armazenamento.get(CHAVE_PREFERENCIAS)),
    { modoNoturno: true, volumeMusica: 0.2 }
);

armazenamento.set(CHAVE_FASES, "1");
armazenamento.set(CHAVE_FRAGMENTOS, "3");
armazenamento.set(CHAVE_NIVEL, JSON.stringify({ experienciaTotal: 20 }));
assert.strictEqual(vm.runInContext("trocarSalvoAtivo(1)", contexto), true);
assert.strictEqual(recarregamentos, 2);
assert.strictEqual(armazenamento.get(CHAVE_FASES), "13");
assert.strictEqual(armazenamento.get(CHAVE_FRAGMENTOS), "87");
assert.strictEqual(armazenamento.get(CHAVE_SUPREMAS), supremasOriginais);
assert.strictEqual(JSON.parse(armazenamento.get(CHAVE_NIVEL)).experienciaTotal, 10400);

sistema = JSON.parse(armazenamento.get(CHAVE_SISTEMA));
assert.strictEqual(sistema.indiceAtivo, 0);
assert.strictEqual(sistema.espacos[1].dados[CHAVE_FASES], "1");
assert.strictEqual(sistema.espacos[1].dados[CHAVE_FRAGMENTOS], "3");
assert.strictEqual(vm.runInContext("trocarSalvoAtivo(1)", contexto), false);
assert.strictEqual(recarregamentos, 2);

console.log("Salvos: migração, isolamento, restauração e preferências globais validados.");
