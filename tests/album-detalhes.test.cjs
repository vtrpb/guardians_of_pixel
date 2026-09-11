const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
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

const localizar = (texto, variaveis = {}) => Object.entries(variaveis).reduce(
    (resultado, [nome, valor]) => resultado.replaceAll(`{${nome}}`, valor),
    texto
);
const contextoDosCartoes = {
    localizar,
    idiomaAtual: "pt-BR",
    obterTextoDasFraquezasElementais() { return "Fraqueza: Fogo +35%"; }
};
vm.createContext(contextoDosCartoes);
vm.runInContext([
    extrairFuncao("criarCartaoDeTorre"),
    extrairFuncao("criarCartaoDeInimigo")
].join("\n"), contextoDosCartoes);

const cartaoDaTorre = contextoDosCartoes.criarCartaoDeTorre(
    "torreGlacial",
    0,
    "Torre Glacial · nível 0",
    "Elemento: Gelo"
);
assert.ok(cartaoDaTorre.includes("<button"));
assert.ok(cartaoDaTorre.includes(
    "abrirDetalhesDaFigurinhaDoAlbum('torre', 'torreGlacial', 0)"
));
assert.ok(cartaoDaTorre.includes("Abrir detalhes de Torre Glacial"));

const cartaoDoInimigo = contextoDosCartoes.criarCartaoDeInimigo(
    "loboDeGelo",
    "Lobo de Gelo",
    { vida: 240, velocidade: 1.8 },
    "Exclusivo da Fase 3"
);
assert.ok(cartaoDoInimigo.includes("<button"));
assert.ok(cartaoDoInimigo.includes(
    "abrirDetalhesDaFigurinhaDoAlbum('inimigo', 'loboDeGelo')"
));
assert.ok(cartaoDoInimigo.includes("Fraqueza: Fogo +35%"));

[
    "function criarDadosDosDetalhesDaTorre(",
    "function criarDadosDosDetalhesDoInimigo(",
    "function criarDadosDosDetalhesDaSkin(",
    "function abrirDetalhesDaFigurinhaDoAlbum(",
    "function fecharDetalhesDaFigurinhaDoAlbum(",
    'role="dialog"',
    'aria-modal="true"',
    "Melhor contra",
    "Fraquezas",
    "Contra o mesmo elemento, o dano permanece normal."
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

assert.match(estilos, /button\.album-cartao\s*\{[\s\S]*?cursor: pointer/);
assert.match(estilos, /\.album-detalhes-camada\s*\{[\s\S]*?position: fixed/);
assert.match(estilos, /\.album-detalhes-painel\s*\{[\s\S]*?width: min\(410px/);
assert.match(estilos, /\.album-detalhes-atributos\s*\{[\s\S]*?grid-template-columns: repeat\(2/);
assert.match(estilos, /\.album-detalhes-atributos\s*\{[\s\S]*?grid-template-columns: 1fr/);

assert.ok(especificacao.includes("### Mudança: fichas clicáveis do Álbum"));
assert.ok(especificacao.includes("Melhor contra"));
assert.ok(especificacao.includes("Nenhuma fraqueza elemental"));
assert.ok(especificacao.includes("Escape"));

console.log("Álbum clicável: cartões, fichas verticais, vantagens e fraquezas validados.");
