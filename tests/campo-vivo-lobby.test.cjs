const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");

assert.strictEqual(html.split("arbusto-campo-lobby arbusto-campo-lobby-").length - 1, 2);
assert.strictEqual(html.split("grama-pixel-lobby grama-pixel-lobby-").length - 1, 3);
assert.ok(html.includes("styles.css?v=maquina-tempo-1"));

[
    ".menu-principal.tema-campo",
    "#3f7f3d",
    "#326b35",
    "#3ca370",
    "#cfff70",
    "#ba6156",
    ".arbusto-campo-lobby",
    ".grama-pixel-lobby",
    ".menu-principal:not(.tema-campo) .decoracao-lobby-campo"
].forEach((trecho) => assert.ok(css.includes(trecho), "Estilo ausente: " + trecho));

assert.ok(especificacao.includes("### Mudança: cenário vivo do lobby da Fase 1"));
assert.ok(css.includes("linear-gradient(#8fde5d 0 0) 0 10px / 7px 16px no-repeat"));
assert.ok(css.includes(".decoracao-lobby-campo { opacity: .62; }"));
assert.ok(css.includes("body:not(.modo-noturno) .menu-principal.tema-campo .lobby-cenario"));
assert.ok(css.includes("filter: brightness(.68) saturate(.82) contrast(1.06);"));
assert.ok(especificacao.includes("68% do brilho, 82% da saturação"));
assert.ok(especificacao.includes("#3F7F3D"));
assert.ok(especificacao.includes("#326B35"));

console.log("Cenário vivo do lobby da Fase 1: integração validada.");
