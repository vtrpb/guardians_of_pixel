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
    'class="botao-lobby-extra botao-lobby-conquistas"',
    'onclick="mostrarConquistas()"',
    'id="resumo-conquistas-menu"',
    "styles.css?v=maquina-tempo-1",
    "game.js?v=maquina-tempo-1"
].forEach((trecho) => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    'const CHAVE_ESTATISTICAS_CONQUISTAS = "guardians-of-pixel-estatisticas-conquistas-v1"',
    "conquistas: Object.freeze({",
    'primeiraVigilia: Object.freeze({',
    'nome: "Primeira Vigília"',
    'guardiaoDosCincoReinos: Object.freeze({',
    'nome: "Guardião dos Cinco Reinos"',
    'guardiaoDeTodosOsReinos: Object.freeze({',
    'nome: "Guardião de Todos os Reinos"',
    'mestreDoArsenal: Object.freeze({',
    'tipoDeCriterio: "loja"',
    'lendaDoInfinito: Object.freeze({',
    'propriedade: "maiorWaveInfinita"',
    "objetivo: 100",
    'cacadorDePixelsSupremo: Object.freeze({',
    'propriedade: "inimigosEliminados"',
    "objetivo: 500",
    'alemDoLimite: Object.freeze({',
    'aindaEstaEsperando: Object.freeze({',
    'nome: "???"',
    'descricao: "Ainda está te esperando, sempre vai estar."',
    'osSeisGuardioes: Object.freeze({',
    'nome: "Os Seis Guardiões"',
    'mestreDoFliperama: Object.freeze({',
    'propriedade: "minigamesFliperamaConcluidos"',
    'objetivo: 5',
    'pareORelogio: Object.freeze({',
    "quantidadeMinimaDeInimigosComuns: 5",
    'demolicaoEmMassa: Object.freeze({',
    'nome: "Demolição em Massa"',
    'frequencia09: Object.freeze({',
    'nomeBloqueado: "Frequência 09"',
    "secreta: true",
    'descricaoBloqueada: "O futuro guarda uma frequência esquecida."',
    'tipoDeCriterio: "especial"',
    "function carregarEstatisticasDasConquistas()",
    "function verificarConquistasAutomaticas()",
    "function mostrarConquistas()",
    "registrarFaseConcluidaParaConquistas();",
    'desbloquearConquista("aindaEstaEsperando");',
    "registrarWaveInfinitaParaConquistas(wave);",
    "registrarInimigoEliminadoParaConquistas();",
    "registrarDefesaConstruidaParaConquistas(tipoDeTorreParaConstruir);",
    "registrarMinigameFliperamaConcluidoParaConquistas(tipoConcluido);",
    "registrarUsoDoPulsoTemporalParaConquistas();",
    "registrarEliminacoesDaBombaPesadaParaConquistas(quantidadeEliminada);",
    "registrarTransmissaoProjetoRelogioParaConquistas();",
    "const itensAtuaisDaLoja = obterItensDaLoja();"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

const inicioDaVitoria = codigo.indexOf("function finalizarPartidaComVitoria()");
const inicioDaWave = codigo.indexOf("function iniciarProximaWave()");
const inicioDosInimigos = codigo.indexOf("function moverInimigos(");
const inicioDaCompra = codigo.indexOf("function comprarItemDaLoja(idDoItem)");

assert.ok(
    codigo.indexOf("registrarFaseConcluidaParaConquistas();", inicioDaVitoria) > inicioDaVitoria,
    "A vitória normal deve atualizar as conquistas."
);
assert.ok(
    codigo.indexOf("registrarWaveInfinitaParaConquistas(wave);", inicioDaWave) > inicioDaWave,
    "A nova wave infinita deve atualizar as conquistas."
);
assert.ok(
    codigo.indexOf("registrarInimigoEliminadoParaConquistas();", inicioDosInimigos)
        < codigo.indexOf("inimigos.splice(i, 1);", inicioDosInimigos),
    "A eliminação deve ser registrada antes de remover o inimigo."
);
assert.ok(
    codigo.indexOf("verificarConquistasAutomaticas();", inicioDaCompra)
        < codigo.indexOf("function mostrarAlbum()", inicioDaCompra),
    "Uma compra deve recalcular as conquistas."
);

[
    ".botao-lobby-conquistas",
    ".conquistas-resumo",
    ".conquistas-grade",
    ".conquista-cartao",
    ".conquista-bloqueada",
    "filter: grayscale(1) brightness(.42)",
    ".conquista-desbloqueada",
    ".conquista-progresso"
].forEach((seletor) => assert.ok(css.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: painel de conquistas",
    "**Primeira Vigília**",
    "**Guardião dos Cinco Reinos**",
    "**Guardião de Todos os Reinos**",
    "**Mestre do Arsenal**",
    "**Lenda do Infinito**",
    "**Caçador de Pixels Supremo**",
    "**Além do Limite**",
    "**???**",
    "**Os Seis Guardiões**",
    "**Mestre do Fliperama**",
    "**Pare o Relógio!**",
    "**Demolição em Massa**",
    "**Frequência 09**",
    "treze conquistas",
    "totalmente em preto e branco"
].forEach((trecho) => assert.ok(
    especificacao.includes(trecho),
    `Especificação ausente: ${trecho}`
));

console.log("Conquistas permanentes: interface, progresso e desbloqueios validados.");
