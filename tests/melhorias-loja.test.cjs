const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");

[
    "reservaDeCreditos: Object.freeze({",
    "licencaDeConstrucao: Object.freeze({",
    "recompensaOtimizada: Object.freeze({",
    "bonusDinheiroInicial: 50",
    "bonusLimiteDeTorres: 1",
    "bonusRecompensaPorTiro: 2",
    "function obterItensDaLoja()",
    "function obterBonusPermanenteDaLoja(propriedade)",
    "dinheiro = obterDinheiroInicial();",
    "function registrarCreditosPorDisparo()",
    "dinheiro += creditosRecebidos;"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));
assert.ok((codigo.match(/registrarCreditosPorDisparo\(alvo\);/g) || []).length >= 2,
    "Os disparos comuns e o feixe devem passar pela remuneração dos tiros.");

assert.ok(html.includes('id="fragmentos-pixel-menu"'));
assert.ok(!html.includes('id="creditos-iniciais-menu"'));
assert.ok(html.includes("Defesas e melhorias"));
assert.ok(css.includes(".loja-item-miniatura-melhoria"));
assert.ok(css.includes(".melhoria-recompensa-otimizada"));
assert.ok(especificacao.includes("### Mudança: melhorias permanentes da Loja"));
assert.ok(especificacao.includes("11, 13, 13, 15, 16, 16 e 16 torres"));

console.log("Melhorias permanentes da Loja: integração validada.");
