const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");

assert.strictEqual(html.split("decoracao-central-lobby").length - 1, 18);

[
    "arvore-lobby-central",
    "pedra-lobby-central",
    "flores-lobby-central",
    "piramide-lobby-central",
    "cacto-lobby-central",
    "mato-seco-lobby-central",
    "pinguim-lobby-central",
    "pinheiro-nevado-lobby-central",
    "bloco-gelo-lobby-central",
    "ruina-selva-lobby-central",
    "arvore-selva-lobby-central",
    "flor-selva-lobby-central",
    "arvore-outonal-lobby-central",
    "tronco-outonal-lobby-central",
    "folhas-outonais-lobby-central",
    "cristal-obsidiana-lobby-central",
    "cogumelo-pantano-lobby-central",
    "cristal-ambar-lobby-central"
].forEach((classe) => {
    assert.ok(html.includes(classe), `Decoração ausente no HTML: ${classe}`);
    assert.ok(css.includes(`.${classe}`), `Posição ausente no CSS: ${classe}`);
});

assert.ok(css.includes(".decoracao-central-lobby {"));
assert.ok(css.includes("opacity: .72"));
assert.ok(css.includes(".decoracao-central-lobby { opacity: .46; }"));
assert.ok(especificacao.includes("### Mudança: decorações centrais nos temas do lobby"));

console.log("Decorações centrais do lobby: integração validada.");
