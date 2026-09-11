const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const html = fs.readFileSync("index.htm", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

const inicioDaConfiguracao = codigo.indexOf("album: Object.freeze({");
const fimDaConfiguracao = codigo.indexOf("\n    loja: Object.freeze({", inicioDaConfiguracao);
const configuracaoDoAlbum = codigo.slice(inicioDaConfiguracao, fimDaConfiguracao);
const categoriasEsperadas = ["torres", "inimigos", "bosses", "minas", "skins"];

for (const id of categoriasEsperadas) {
    assert.match(configuracaoDoAlbum, new RegExp(`id: "${id}"`));
}

assert.ok(configuracaoDoAlbum.indexOf('id: "torres"') < configuracaoDoAlbum.indexOf('id: "inimigos"'));
assert.ok(configuracaoDoAlbum.indexOf('id: "inimigos"') < configuracaoDoAlbum.indexOf('id: "bosses"'));
assert.match(codigo, /let categoriaDoAlbumSelecionada = "torres";/);
assert.match(codigo, /const torres = todasAsTorres\s*\.filter\(\(\[tipo\]\) => torreEstaDesbloqueada\(tipo\)\);/);
assert.match(codigo, /const minas = todosOsExplosivos\s*\.filter\(\(\[tipo\]\) => torreEstaDesbloqueada\(tipo\)\);/);
assert.match(codigo, /const inimigos = todosOsInimigos\s*\.filter\(tipo => inimigosDerrotadosNoAlbum\.has\(tipo\)\);/);
assert.match(codigo, /const bosses = todosOsBosses\s*\.filter\(tipo => inimigosDerrotadosNoAlbum\.has\(tipo\)\);/);
assert.match(codigo, /const skins = todasAsSkins\.filter\(skin => skin\.desbloqueada\);/);
assert.match(codigo, /id: "original"[\s\S]*?id: idDaSkinDeMissao[\s\S]*?id: skinDoApoiador\.id/);
assert.match(codigo, /role="tablist"[\s\S]*?role="tab"[\s\S]*?role="tabpanel"/);
assert.match(codigo, /desenharMiniaturasDasSkinsDoAlbum\(\);/);
assert.match(codigo, /id: "senhorDoTempoHumano"/);
assert.match(codigo, /formaHumanaFutura: Object\.freeze\(\{\s*ativa: false/);
assert.match(codigo, /function criarCartaoDaFormaHumanaDoSenhorDoTempo\(configuracao\)/);
assert.match(codigo, /function desenharFormaHumanaDoSenhorDoTempoNoAlbum\(tamanhoDaAreaDeDesenho\)/);
assert.match(codigo, /faseSecretaDescoberta[\s\S]*?formaHumanaFutura\.ativa[\s\S]*?formaHumanaFutura/);
assert.match(codigo, /data-tipo-inimigo="\$\{configuracao\.id\}"/);
assert.match(codigo, /CHAVE_FIGURINHAS_DO_ALBUM = "guardians-of-pixel-album-figurinhas-v1"/);
assert.match(codigo, /registrarInimigoDerrotadoNoAlbum\(inimigo\.tipo\);/);
assert.match(codigo, /class="album-pagina-figurinhas"/);
assert.match(codigo, /class="album-vazio" role="status"/);
assert.ok(codigo.includes('"Categorias do Álbum": "Album categories"'));
assert.ok(codigo.includes('"Categorias do Álbum": "Categorías del Álbum"'));
assert.ok(codigo.includes('"Álbum de Figurinhas": "Sticker Album"'));
assert.ok(codigo.includes('"Álbum de Figurinhas": "Álbum de Cromos"'));
assert.ok(codigo.includes('"Nenhuma figurinha ainda": "No stickers yet"'));
assert.ok(codigo.includes('"Nenhuma figurinha ainda": "Aún no hay cromos"'));
assert.ok(codigo.includes('"Bosses": "Jefes"'));
assert.ok(codigo.includes('"Senhor do Tempo — Forma Humana": "Lord of Time — Human Form"'));
assert.ok(codigo.includes('"Conceito futuro: retrato humano alto de meio-corpo, com terno, gravata, cabeça de relógio e uma mão no bolso."'));

function extrairFuncao(nome) {
    const inicio = codigo.indexOf("function " + nome + "(");
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, "Função não encontrada: " + nome);
    return codigo.slice(inicio, fim);
}

const desenhoDaFormaHumana = extrairFuncao("desenharFormaHumanaDoSenhorDoTempoNoAlbum");
assert.doesNotMatch(desenhoDaFormaHumana, /visual\.sapatos/);
assert.match(desenhoDaFormaHumana, /ctx\.lineTo\(31, 100\)/);
assert.match(desenhoDaFormaHumana, /ctx\.fillRect\(9, 92, 20, 4\)/);

const contexto = {
    CONFIG: {
        album: {
            categorias: categoriasEsperadas.map((id) => ({ id }))
        }
    }
};
vm.createContext(contexto);
vm.runInContext(
    'var categoriaDoAlbumSelecionada = "torres";\n'
    + 'var renderizacoes = 0;\n'
    + 'function mostrarAlbum() { renderizacoes++; }\n'
    + extrairFuncao("obterCategoriaDoAlbum")
    + "\n"
    + extrairFuncao("selecionarCategoriaDoAlbum"),
    contexto
);

assert.strictEqual(contexto.obterCategoriaDoAlbum("invalida").id, "torres");
contexto.selecionarCategoriaDoAlbum("bosses");
assert.strictEqual(contexto.categoriaDoAlbumSelecionada, "bosses");
assert.strictEqual(contexto.renderizacoes, 1);
contexto.selecionarCategoriaDoAlbum("categoria-inexistente");
assert.strictEqual(contexto.categoriaDoAlbumSelecionada, "bosses");
assert.strictEqual(contexto.renderizacoes, 1);

const armazenamento = new Map([
    ["guardians-of-pixel-fragmentos-v2", "77"]
]);
const contextoFigurinhas = {
    CONFIG: { inimigo: { normal: {}, boss: {} } },
    CHAVE_FIGURINHAS_DO_ALBUM: "guardians-of-pixel-album-figurinhas-v1",
    localStorage: {
        getItem(chave) { return armazenamento.get(chave) ?? null; },
        setItem(chave, valor) { armazenamento.set(chave, valor); }
    }
};
vm.createContext(contextoFigurinhas);
vm.runInContext(
    "var inimigosDerrotadosNoAlbum;\n"
    + extrairFuncao("carregarInimigosDerrotadosNoAlbum")
    + "\n"
    + extrairFuncao("salvarInimigosDerrotadosNoAlbum")
    + "\n"
    + extrairFuncao("registrarInimigoDerrotadoNoAlbum")
    + "\ninimigosDerrotadosNoAlbum = carregarInimigosDerrotadosNoAlbum();",
    contextoFigurinhas
);

assert.strictEqual(contextoFigurinhas.inimigosDerrotadosNoAlbum.size, 0);
assert.strictEqual(armazenamento.get("guardians-of-pixel-fragmentos-v2"), "77");
assert.strictEqual(contextoFigurinhas.registrarInimigoDerrotadoNoAlbum("invalido"), false);
assert.strictEqual(contextoFigurinhas.registrarInimigoDerrotadoNoAlbum("normal"), true);
assert.strictEqual(contextoFigurinhas.registrarInimigoDerrotadoNoAlbum("normal"), false);
assert.deepStrictEqual(
    JSON.parse(armazenamento.get("guardians-of-pixel-album-figurinhas-v1")),
    ["normal"]
);
assert.strictEqual(armazenamento.get("guardians-of-pixel-fragmentos-v2"), "77");

assert.match(estilos, /\.album-abas\s*\{[\s\S]*?grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/);
assert.match(estilos, /\.album-pagina-figurinhas\s*\{[\s\S]*?background-color: #eadcae[\s\S]*?border: 5px solid/);
assert.match(estilos, /\.album-espiral\s*\{[\s\S]*?repeating-linear-gradient/);
assert.match(estilos, /\.album-vazio\s*\{[\s\S]*?border: 4px dashed/);
assert.match(estilos, /\.album-cartao-conceito \.miniatura-inimigo-album\s*\{[\s\S]*?background-color: #171024/);
assert.match(estilos, /\.album-abas\s*\{[\s\S]*?grid-template-columns: repeat\(5, 88px\)[\s\S]*?overflow-x: auto/);
assert.ok(html.includes("Complete suas figurinhas"));
assert.ok(html.includes("styles.css?v=maquina-tempo-1"));
assert.ok(html.includes("game.js?v=maquina-tempo-1"));
assert.match(especificacao, /### Mudança: categorias do Álbum/);
assert.match(especificacao, /\*\*Torres\*\*, \*\*Inimigos\*\*, \*\*Bosses\*\*, \*\*Minas\*\* e \*\*Skins\*\*/);
assert.match(especificacao, /histórico de figurinhas de inimigos começa vazio/);
assert.match(especificacao, /não apaga nem altera estatísticas permanentes/);
assert.match(especificacao, /Forma humana do Senhor do Tempo/);
assert.match(especificacao, /manter `CONFIG\.faseSecreta\.senhorDoTempo\.formaHumanaFutura\.ativa` como `false`/i);
assert.match(especificacao, /forma humana completa na cena final do Ponto Zero/i);
assert.match(especificacao, /bolso baixo do paletó/i);

console.log("Álbum de Figurinhas: coleção, descoberta, persistência e responsividade validadas.");
