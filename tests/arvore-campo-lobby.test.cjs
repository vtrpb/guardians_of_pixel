const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");
const png = fs.readFileSync(path.join(raiz, "assets", "arvore-campo-lobby.png"));

assert.deepStrictEqual(
    Array.from(png.subarray(0, 8)),
    [137, 80, 78, 71, 13, 10, 26, 10]
);
assert.strictEqual(png.readUInt32BE(16), 423);
assert.strictEqual(png.readUInt32BE(20), 572);
assert.ok([4, 6].includes(png[25]), "O sprite PNG precisa possuir canal alfa.");

assert.strictEqual(
    html.split("arvore-lobby arvore-lobby-").length - 1,
    4
);
assert.ok(html.includes("styles.css?v=maquina-tempo-1"));
assert.ok(css.includes('background: url("assets/arvore-campo-lobby.png") center / contain no-repeat'));
assert.ok(css.includes("width: 74px"));
assert.ok(css.includes("height: 100px"));
assert.ok(css.includes(".arvore-lobby::before,"));
assert.ok(especificacao.includes("### Mudança: árvore autoral no lobby da Fase 1"));

console.log("Árvore autoral do lobby da Fase 1: integração validada.");
