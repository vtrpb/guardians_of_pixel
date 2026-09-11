const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const caminhoSprite = path.join(raiz, "assets", "fliperama-pixel.png");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");
const png = fs.readFileSync(caminhoSprite);
const hashDaImagemRemovida = "a69153a2990cc72f3f207cbb41957a19ae47e196822c0ee258868baa2a290255";

assert.deepStrictEqual(
    Array.from(png.subarray(0, 8)),
    [137, 80, 78, 71, 13, 10, 26, 10]
);
assert.strictEqual(png.readUInt32BE(16), 53);
assert.strictEqual(png.readUInt32BE(20), 100);
assert.ok([4, 6].includes(png[25]), "O sprite PNG precisa possuir canal alfa.");
assert.notStrictEqual(
    crypto.createHash("sha256").update(png).digest("hex"),
    hashDaImagemRemovida,
    "A imagem com direitos autorais não pode permanecer no projeto."
);

assert.ok(codigo.includes('caminho: "assets/fliperama-pixel.png"'));
assert.ok(codigo.includes("largura: 53"));
assert.ok(codigo.includes("altura: 100"));
assert.ok(codigo.includes("ctx.imageSmoothingEnabled = false"));
assert.ok(codigo.includes("ctx.drawImage("));
assert.ok(codigo.includes("function desenharFliperamaPixeladoAnterior"));
assert.ok(especificacao.includes("#### Mudança: sprite temporário original do fliperama"));

console.log("Novo sprite do fliperama: integração validada.");
