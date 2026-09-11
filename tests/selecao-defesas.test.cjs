const assert = require("assert");
const fs = require("fs");

const html = fs.readFileSync("index.htm", "utf8");
const codigo = fs.readFileSync("game.js", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.ok(html.includes('onclick="abrirSelecaoDeDefesas()"'));
assert.ok(html.includes('onclick="abrirSelecaoDeDefesas(true)"'));

[
    'const CHAVE_SELECAO_DE_DEFESAS = "guardians-of-pixel-selecao-defesas-v1"',
    "quantidadeMaximaDeDefesasSelecionadas: 6",
    "5: 15, 6: 15, 7: 15, 8: 15, 9: 15, 10: 15, 11: 15, 12: 15, 13: 15, 14: 15, 99: 12, 100: 12",
    "function carregarSelecaoDeDefesas()",
    "function salvarSelecaoDeDefesas()",
    "function normalizarSelecaoDeDefesas(selecao, preencherSeVazia = true)",
    "function abrirSelecaoDeDefesas(wavesInfinitas = false)",
    "function alternarDefesaDaSelecao(tipoDaDefesa)",
    "function confirmarSelecaoDeDefesas()",
    "function obterBotoesDeConstrucao()",
    'botao.elemento.hidden = !escolhidaParaPartida',
    "prepararSelecaoDeDefesasParaPartida(deveIniciarTutorial);"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

[
    '.conteudo-menu[data-tela="selecaoDefesas"]',
    ".selecao-defesas-layout",
    ".selecao-defesa-cartao-selecionado",
    ".selecao-defesa-cartao-bloqueado",
    ".selecao-defesas-equipe",
    ".botao-confirmar-selecao-defesas"
].forEach((seletor) => assert.ok(css.includes(seletor), `Estilo ausente: ${seletor}`));

assert.ok(especificacao.includes("### Mudança: equipe de até seis defesas e teto de construção"));
assert.ok(especificacao.includes("11, 13, 13, 15, 16, 16 e 16"));
assert.ok(especificacao.includes("no mínimo 1 e no máximo 6 defesas desbloqueadas"));

console.log("Seleção de até 6 defesas e limites das fases validados.");
