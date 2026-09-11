const assert = require("assert");
const fs = require("fs");

const html = fs.readFileSync("index.htm", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const codigo = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.ok(fs.existsSync("assets/logo-lpg-studios.png"));
assert.ok(fs.statSync("assets/logo-lpg-studios.png").size > 0);
assert.match(html, /id="tela-carregamento"[\s\S]*?assets\/logo-lpg-studios\.png/);
assert.match(html, /id="tela-inicial-jogo"[\s\S]*?id="botao-jogar-menu-inicial"[\s\S]*?id="botao-sair-menu-inicial"/);
assert.match(html, /menu-inicial-cenario[\s\S]*?menu-inicial-relogio-fundo/);
assert.match(html, /class="aplicacao-jogo" inert aria-hidden="true"/);
assert.match(html, /id="menu-principal" class="menu-principal" inert aria-hidden="true"/);
assert.ok(html.includes("build=salvos-28"));

[
    ".tela-carregamento",
    ".carregamento-logo-moldura",
    ".carregamento-barra",
    ".tela-inicial-jogo",
    ".menu-inicial-relogio-fundo",
    ".menu-inicial-conteudo",
    ".botao-menu-inicial-jogar",
    ".botao-menu-inicial-sair"
].forEach(seletor => assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`));

assert.match(codigo, /const CHAVE_ENTRADA_ANTERIOR = "guardians-of-pixel-entrada-anterior-v1"/);
assert.match(codigo, /aberturaDoJogo: Object\.freeze\(\{[\s\S]*?duracaoMinimaCarregamentoMs: 1800[\s\S]*?duracaoTransicaoMs: 360/);
assert.match(codigo, /function revelarMenuInicial\(\)/);
assert.match(codigo, /function entrarNoLobbyPeloMenuInicial\(\)/);
assert.match(codigo, /function sairDoJogoPeloMenuInicial\(\)/);
assert.match(codigo, /window\.addEventListener\("load", concluirCarregamentoDaAbertura/);
assert.match(codigo, /jogadorJaEntrouAntes[\s\S]*?abertura\.bemVindoDeVolta/);
assert.doesNotMatch(codigo, /if \(!tutorialConcluido\) \{\s*mostrarTutorial\(\);\s*\}\s*function carregarTutorialConcluido/);

assert.match(especificacao, /### Mudança: tela de carregamento e menu de abertura/);
assert.match(especificacao, /\*\*Jogar\*\* realiza uma transição curta/);
assert.match(especificacao, /\*\*Sair\*\* solicita o fechamento da janela/);
assert.match(especificacao, /relógio de parede grande atrás do conteúdo/);

console.log("Abertura: carregamento, saudação, menu inicial e saída validados.");
