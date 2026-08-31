const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const caminhoSprite = path.join(raiz, "assets", "fliperama-pixel.png");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");
const png = fs.readFileSync(caminhoSprite);

assert.deepStrictEqual(
    Array.from(png.subarray(0, 8)),
    [137, 80, 78, 71, 13, 10, 26, 10]
);
assert.strictEqual(png.readUInt32BE(16), 530);
assert.strictEqual(png.readUInt32BE(20), 1000);
assert.ok([4, 6].includes(png[25]), "O sprite PNG precisa possuir canal alfa.");

assert.ok(codigo.includes('caminho: "assets/fliperama-pixel.png"'));
assert.ok(codigo.includes("largura: 53"));
assert.ok(codigo.includes("altura: 100"));
assert.ok(codigo.includes("ctx.imageSmoothingEnabled = false"));
assert.ok(codigo.includes("ctx.drawImage("));
assert.ok(codigo.includes("function desenharFliperamaPixeladoAnterior"));
assert.ok(especificacao.includes("#### Mudança: novo sprite do fliperama"));

console.log("Novo sprite do fliperama: integração validada.");
