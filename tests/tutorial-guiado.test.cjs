const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

[
    'id="camada-tutorial-partida"',
    'id="progresso-tutorial-partida"',
    'id="titulo-tutorial-partida"',
    'id="descricao-tutorial-partida"',
    'id="botao-continuar-tutorial"',
    'onclick="pularTutorialDaPartida()"'
].forEach((trecho) => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    'const CHAVE_TUTORIAL_CONCLUIDO = "guardians-of-pixel-tutorial-concluido-v1"',
    "function carregarTutorialConcluido()",
    "function salvarTutorialConcluido()",
    "function iniciarTutorialDaPartida()",
    "function avancarTutorialPara(passo)",
    "function concluirTutorialDaPartida(pulado = false)",
    "function pularTutorialDaPartida()",
    "function iniciarTutorialPeloMenu()",
    "definirJogoPausado(true);",
    "definirJogoPausado(false);",
    "&& (tutorialSolicitado || !tutorialConcluido)",
    "if (!tutorialConcluido) {",
    'localizar("Passo {passo} de {total}"',
    "Jogar tutorial"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

assert.ok(
    codigo.includes("const deveIniciarTutorial = !modoWavesInfinitas"),
    "O modo infinito não deve abrir o tutorial automaticamente."
);
assert.ok(
    codigo.includes('passoTutorial === 3\n            && novaTorre.tipo === "padrao"'),
    "A construção da Torre padrão deve avançar o treinamento."
);
assert.ok(
    codigo.includes("tutorialAtivo && passoTutorial === 4"),
    "A seleção da torre deve avançar o treinamento."
);

[
    ".camada-tutorial-partida",
    ".painel-tutorial-partida",
    ".tutorial-destaque",
    ".tutorial-introducao",
    ".botao-iniciar-tutorial"
].forEach((seletor) => assert.ok(css.includes(seletor), `Estilo ausente: ${seletor}`));

const blocoDoDestaque = css.match(/\.tutorial-destaque\s*\{([\s\S]*?)\}/)?.[1] || "";
assert.ok(
    !blocoDoDestaque.includes("z-index"),
    "O elemento destacado não pode ficar acima do painel do tutorial."
);
assert.ok(
    css.includes(".painel-tutorial-partida {\n    position: absolute;\n    z-index: 1;"),
    "O painel deve permanecer à frente dentro da camada do tutorial."
);

assert.ok(especificacao.includes("### Mudança: tutorial guiado da primeira partida"));
assert.ok(especificacao.includes("a wave 1 fica pausada"));
assert.ok(especificacao.includes("Jogar tutorial"));
assert.ok(especificacao.includes("o painel do treinamento permanece acima do mapa"));

console.log("Tutorial guiado da primeira partida: integração validada.");
