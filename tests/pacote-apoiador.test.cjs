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
    'class="botao-lobby-salvos lobby-atalho botao-lobby-apoiador"',
    'onclick="mostrarPacoteApoiador()"',
    'id="estado-pacote-apoiador-menu"',
    'id="lobby-jogador"',
    'id="lobby-avatar"',
    "styles.css?v=maquina-tempo-1",
    "game.js?v=maquina-tempo-1"
].forEach((trecho) => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

assert.ok(
    html.indexOf("botao-lobby-apoiador") > html.indexOf('class="lobby-atalhos-perfil"')
        && html.indexOf("botao-lobby-apoiador") < html.indexOf("botao-lobby-treinamento"),
    "O Pacote Apoiador deve aparecer nos atalhos do perfil, antes do Treinamento."
);

[
    'const CHAVE_PACOTE_APOIADOR = "guardians-of-pixel-pacote-apoiador-v1"',
    "pacoteApoiador: Object.freeze({",
    'nome: "Pacote Coração de Pixel"',
    "modoDemonstracao: true",
    "checkout: Object.freeze({",
    'endpointCriacaoDaSessao: ""',
    'endpointConsultaDoDireito: ""',
    "origensPermitidas: Object.freeze([])",
    'nome: "Aurora Pixel"',
    'tipoVisual: "aurora"',
    "nivelVisualAurora: 0",
    "nivelVisualAurora: 1",
    "nivelVisualAurora: 2",
    "nivelVisualAurora: 3",
    'nome: "Emblema Coração"',
    'nome: "Selo Apoiador"',
    "function carregarPacoteApoiador()",
    "function salvarPacoteApoiador()",
    "function atualizarIdentidadeDoApoiador()",
    "function ativarDemonstracaoDoPacoteApoiador()",
    "function iniciarCompraDoPacoteApoiador()",
    "function sincronizarPacoteApoiadorComServidor()",
    "function validarUrlDoCheckoutRecebida(urlRecebida)",
    "function alternarSkinDoPacoteApoiador()",
    "function mostrarPacoteApoiador()",
    "function obterSkinEquipadaDaTorrePadrao()",
    "function desenharDetalhesDaSkinAurora(estilo)",
    'if (estilo.tipoVisual === "aurora")',
    'lobbyAvatar.textContent = adquirido ? "♥" : "GP"',
    'traduzir("lobby.apoiador")',
    'traduzir("lobby.defensor")',
    'recompensasPermanentesDasMissoes.skinTorrePadraoEquipada = null',
    "if (pacoteApoiador.skinEquipada)"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

const inicioDaAtivacao = codigo.indexOf("function ativarDemonstracaoDoPacoteApoiador()");
const fimDaAtivacao = codigo.indexOf("function iniciarCompraDoPacoteApoiador()", inicioDaAtivacao);
const codigoDaAtivacao = codigo.slice(inicioDaAtivacao, fimDaAtivacao);

[
    "fragmentosPixel",
    "dinheiro",
    "comprasDaLoja",
    "maiorFaseConcluida"
].forEach((regraDeJogo) => assert.ok(
    !codigoDaAtivacao.includes(regraDeJogo),
    `O pacote cosmético não pode alterar ${regraDeJogo}.`
));

[
    ".botao-lobby-apoiador",
    ".lobby-jogador-apoiador",
    ".pacote-apoiador-hero",
    ".pacote-apoiador-ativo",
    ".preview-skin-apoiador",
    ".pacote-apoiador-itens",
    ".pacote-apoiador-item",
    ".pacote-apoiador-compra",
    ".botao-ativar-apoiador",
    ".botao-equipar-apoiador"
].forEach((seletor) => assert.ok(css.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: Pacote Apoiador cosmético",
    "**Pacote Coração de Pixel**",
    "**Aurora Pixel**",
    "faixa luminosa, canhão mais longo e aletas laterais",
    "novos estabilizadores, luzes e núcleo central",
    "**Emblema Coração**",
    "**Selo Apoiador**",
    "nenhuma cobrança será feita",
    "não aumenta dano, créditos, Fragmentos ou limite de torres",
    "somente `GET` autenticado no servidor confirma o direito"
].forEach((trecho) => assert.ok(
    especificacao.includes(trecho),
    `Especificação ausente: ${trecho}`
));

console.log("Pacote Apoiador cosmético: demonstração e persistência validadas.");
