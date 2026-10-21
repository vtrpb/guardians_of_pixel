const assert = require("assert");
const fs = require("fs");

const html = fs.readFileSync("index.htm", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const codigo = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.match(html, /id="tela-carregamento"[\s\S]*?class="carregamento-nucleo"/);
assert.doesNotMatch(html, /logo-lpg-studios|LPG\s*Studios/i);
assert.match(html, /href="assets\/guardians-of-pixel\.ico\?v=2"/);
assert.ok(fs.existsSync("assets/guardians-of-pixel.ico"));
assert.match(html, /id="tela-inicial-jogo"[\s\S]*?id="botao-jogar-menu-inicial"[\s\S]*?id="botao-sair-menu-inicial"/);
assert.match(html, /class="menu-inicial-cenario" aria-hidden="true"/);
assert.match(html, /class="aplicacao-jogo" inert aria-hidden="true"/);
assert.match(html, /id="menu-principal" class="menu-principal" inert aria-hidden="true"/);
// Confere os recursos efetivos, sem prender o teste a um cache antigo.
assert.match(html, /href="estilos\/menu-abertura\.css\?v=/);
assert.ok(fs.existsSync("assets/fundo-menu-8bits.svg"));
assert.match(fs.readFileSync("estilos/menu-abertura.css", "utf8"), /assets\/fundo-menu-8bits\.svg/);
assert.match(fs.readFileSync("modulos/segredos-abertura.js", "utf8"), /assets\/fundo-menu-8bits\.svg/);

[
    ".tela-carregamento",
    ".carregamento-nucleo",
    ".carregamento-barra",
    ".tela-inicial-jogo",
    ".menu-inicial-relogio-fundo",
    ".menu-inicial-conteudo",
    ".botao-menu-inicial-jogar",
    ".botao-menu-inicial-sair"
].forEach(seletor => assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`));
assert.ok(fs.existsSync("assets/conquistas/lendasDoClassico.svg"));
assert.match(fs.readFileSync("assets/conquistas/lendasDoClassico.svg", "utf8"), /shape-rendering="crispEdges"/);

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
assert.match(especificacao, /paisagem pixelada ao pôr do sol/);

console.log("Abertura: carregamento, saudação, menu inicial e saída validados.");
