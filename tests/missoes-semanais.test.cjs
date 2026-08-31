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
    'class="botao-lobby-extra botao-lobby-missoes"',
    'onclick="mostrarMissoes()"',
    'id="resumo-missoes-menu"',
    "styles.css?v=maquina-tempo-1",
    "game.js?v=maquina-tempo-1"
].forEach((trecho) => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    'const CHAVE_MISSOES_SEMANAIS = "guardians-of-pixel-missoes-semanais-v1"',
    'const CHAVE_RECOMPENSAS_MISSOES = "guardians-of-pixel-recompensas-missoes-v1"',
    'id: "cacadorDePixels"',
    'propriedadeDoProgresso: "inimigosEliminados"',
    "objetivo: 50",
    "quantidade: 10",
    'id: "guardiaoDaCampanha"',
    'propriedadeDoProgresso: "fasesConcluidas"',
    "objetivo: 3",
    'id: "sentinelaDourada"',
    "fragmentosAlternativos: 15",
    'id: "alemDoLimite"',
    'propriedadeDoProgresso: "maiorWaveInfinita"',
    "objetivo: 40",
    "fragmentosAlternativos: 25",
    "function obterIdentificadorDaSemana(data = new Date())",
    "function garantirMissoesDaSemanaAtual()",
    "function mostrarMissoes()",
    "function resgatarMissaoSemanal(idDaMissao)",
    "function alternarSkinDeMissao(idDaSkin)",
    "registrarFaseConcluidaParaMissoes();",
    "registrarWaveInfinitaParaMissoes(wave);",
    "registrarInimigoEliminadoParaMissoes();",
    "return { ...estiloOriginal, ...coresDaSkin };"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

assert.ok(
    codigo.indexOf("registrarInimigoEliminadoParaMissoes();")
        < codigo.indexOf("inimigos.splice(i, 1);", codigo.indexOf("function moverInimigos(")),
    "A eliminação deve ser registrada antes de remover o inimigo."
);

[
    ".botao-lobby-missoes",
    ".missoes-semana-cabecalho",
    ".missao-cartao",
    ".missao-progresso",
    ".botao-resgatar-missao",
    ".colecao-missoes",
    ".preview-skin-sentinela",
    ".preview-conquista"
].forEach((seletor) => assert.ok(css.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: missões semanais",
    "eliminar 50 inimigos",
    "concluir 3 partidas",
    "wave 40",
    "Sentinela Dourada",
    "conquista permanente **Além do Limite**",
    "respectivamente 15 ou 25 Fragmentos"
].forEach((trecho) => assert.ok(
    especificacao.includes(trecho),
    `Especificação ausente: ${trecho}`
));

console.log("Missões semanais e recompensas variadas: integração validada.");
