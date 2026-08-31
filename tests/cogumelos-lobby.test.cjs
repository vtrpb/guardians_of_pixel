const assert = require("assert");
const fs = require("fs");

const html = fs.readFileSync("index.htm", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.strictEqual(
    (html.match(/cogumelos-outonais-lobby cogumelos-outonais-lobby-/g) || []).length,
    2
);
assert.ok(html.includes("styles.css?v=maquina-tempo-1"));
assert.ok(css.includes(".menu-principal.tema-temperada .decoracao-lobby-temperada"));
assert.ok(css.includes(".cogumelos-outonais-lobby-1::before"));
assert.ok(css.includes(".cogumelos-outonais-lobby-2::before"));
assert.ok(css.includes("image-rendering: pixelated"));
assert.ok(css.includes("linear-gradient(#fff9e8"));
assert.ok(css.includes("linear-gradient(#d95750"));
assert.strictEqual(css.split("transform: scale(.3)").length - 1, 2);
assert.ok(especificacao.includes("### Mudança: cogumelos autorais no lobby da Fase 5"));

console.log("Cogumelos autorais do lobby: integração validada.");
