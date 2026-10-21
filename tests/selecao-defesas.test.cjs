const assert = require("assert");
const fs = require("fs");

const html = fs.readFileSync("index.htm", "utf8");
const codigo = fs.readFileSync("game.js", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

const acaoJogar = html.match(/onclick="([^"]*lobbyClassicoAtivo[^\"]*)"/);
assert.ok(acaoJogar, "Botão Jogar deve respeitar o modo do lobby");
for (const classico of [false, true]) {
    const chamadas = [];
    require("vm").runInNewContext(acaoJogar[1], {
        lobbyClassicoAtivo: classico,
        jogarClassico: () => chamadas.push("classico"),
        abrirSelecaoDeDefesas: () => chamadas.push("selecao")
    });
    assert.deepStrictEqual(chamadas, [classico ? "classico" : "selecao"]);
}
assert.ok(html.includes('onclick="abrirSelecaoDeDefesas(true)"'));

[
    'const CHAVE_SELECAO_DE_DEFESAS = "guardians-of-pixel-selecao-defesas-v1"',
    "quantidadeMaximaDeDefesasSelecionadas: 6",
    "function obterLimiteDaSelecaoDeDefesas()",
    'obterBonusPermanenteDaLoja("bonusLimiteDeTorres")',
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

const limites = require("vm").runInNewContext(`(${codigo.match(/limitesPorFase: Object.freeze\((\{[^}]+\})\)/)[1]})`);
for (let fase = 1; fase <= 18; fase++) {
    assert.strictEqual(limites[fase], fase === 1 ? 10 : fase <= 3 ? 12 : fase === 4 ? 14 : 15);
}
assert.strictEqual(limites[99], 12);
assert.strictEqual(limites[100], 12);

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
assert.ok(especificacao.includes("7 com a Licença de Construção"));

console.log("Seleção de 6 ou 7 defesas com Licença e limites das fases validados.");
