const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const html = fs.readFileSync("index.htm", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const inicioDaConfig = codigo.indexOf("const CONFIG = Object.freeze({");
const fimDaConfig = codigo.indexOf("// Cada fase possui", inicioDaConfig);
const contextoDaConfig = {};
vm.createContext(contextoDaConfig);
vm.runInContext(
    codigo.slice(inicioDaConfig, fimDaConfig) + "\nglobalThis.CONFIG_TESTE = CONFIG;",
    contextoDaConfig
);
const CONFIG = contextoDaConfig.CONFIG_TESTE;

const mina = CONFIG.torre.tipos.minaCorrosiva;
assert.strictEqual(mina.nome, "Mina Corrosiva");
assert.strictEqual(mina.custoNaLoja, 45);
assert.strictEqual(mina.custo, 150);
assert.strictEqual(mina.dano, 30);
assert.strictEqual(mina.raioExplosao, 85);
assert.strictEqual(mina.limitePorPartida, 4);
assert.strictEqual(mina.exigeCaminho, true);
assert.strictEqual(mina.efeitoCorrosivo.percentualDanoAdicional, 0.18);
assert.strictEqual(mina.efeitoCorrosivo.duracao, 4500);

const bomba = CONFIG.torre.tipos.bombaDeFragmentacao;
assert.strictEqual(bomba.nome, "Bomba de Fragmentação");
assert.strictEqual(bomba.custoNaLoja, 55);
assert.strictEqual(bomba.custo, 225);
assert.strictEqual(bomba.dano, 80);
assert.strictEqual(bomba.raioExplosao, 70);
assert.strictEqual(bomba.tempoDoPavio, 1000);
assert.strictEqual(bomba.limitePorPartida, 3);
assert.strictEqual(bomba.exigeCaminho, true);
assert.strictEqual(bomba.efeitoDeFragmentacao.quantidadeDeFragmentos, 4);
assert.strictEqual(bomba.efeitoDeFragmentacao.distanciaDoCentro, 72);
assert.strictEqual(bomba.efeitoDeFragmentacao.raioDeCadaFragmento, 42);
assert.strictEqual(bomba.efeitoDeFragmentacao.danoDeCadaFragmento, 45);

const melhorias = CONFIG.loja.itens;
assert.strictEqual(melhorias.miraCalibrada.bonusPercentualDanoDasTorres, 0.05);
assert.strictEqual(
    melhorias.sensoresDeLongoAlcance.bonusPercentualAlcanceDasTorres,
    0.05
);
assert.strictEqual(melhorias.contratoDeRecuperacao.bonusPercentualDeVenda, 0.1);
assert.strictEqual(melhorias.contratoDeRecuperacao.custoNaLoja, 90);

const totalDeDefesasCompraveis = Object.values(CONFIG.torre.tipos)
    .filter((configuracao) => configuracao.requerCompraNaLoja).length;
assert.strictEqual(totalDeDefesasCompraveis + Object.keys(CONFIG.loja.itens).length, 23);
assert.strictEqual(
    CONFIG.conquistas.mestreDoArsenal.descricao,
    "Compre todos os 23 itens disponíveis na Loja."
);

const agora = 1000;
const inimigoCorroido = { tipo: "normal", x: 0, y: 0, vida: 500 };
const contextoDaCorrosao = {
    CONFIG,
    Date,
    Math,
    inimigos: [inimigoCorroido],
    explosoesDosExplosivos: [],
    registrarEliminacoesDaBombaPesadaParaConquistas() {}
};
vm.createContext(contextoDaCorrosao);
vm.runInContext([
    extrairFuncao("aplicarDanoAoInimigo"),
    extrairFuncao("aplicarCorrosaoAoInimigo"),
    extrairFuncao("obterInimigosVivosNaArea"),
    extrairFuncao("aplicarDanoEmArea"),
    extrairFuncao("registrarExplosaoVisual"),
    extrairFuncao("detonarFragmentos"),
    extrairFuncao("detonarExplosivo")
].join("\n"), contextoDaCorrosao);
contextoDaCorrosao.detonarExplosivo({ tipo: "minaCorrosiva", x: 0, y: 0 }, mina, agora);
assert.strictEqual(inimigoCorroido.vida, 470);
assert.strictEqual(inimigoCorroido.percentualDeDanoAdicionalDaCorrosao, 0.18);
assert.strictEqual(inimigoCorroido.corrosaoExpiraEm, 5500);
contextoDaCorrosao.aplicarDanoAoInimigo(inimigoCorroido, 100, agora + 1);
assert.strictEqual(inimigoCorroido.vida, 352);
assert.strictEqual(contextoDaCorrosao.explosoesDosExplosivos[0].tipoVisual, "corrosao");

const inimigoCentral = { tipo: "normal", x: 0, y: 0, vida: 500 };
const inimigoNoFragmento = { tipo: "normal", x: 51, y: -51, vida: 500 };
const contextoDaFragmentacao = {
    CONFIG,
    Date,
    Math,
    inimigos: [inimigoCentral, inimigoNoFragmento],
    explosoesDosExplosivos: [],
    registrarEliminacoesDaBombaPesadaParaConquistas() {}
};
vm.createContext(contextoDaFragmentacao);
vm.runInContext([
    extrairFuncao("aplicarDanoAoInimigo"),
    extrairFuncao("obterInimigosVivosNaArea"),
    extrairFuncao("aplicarDanoEmArea"),
    extrairFuncao("registrarExplosaoVisual"),
    extrairFuncao("detonarFragmentos"),
    extrairFuncao("detonarExplosivo")
].join("\n"), contextoDaFragmentacao);
contextoDaFragmentacao.detonarExplosivo(
    { tipo: "bombaDeFragmentacao", x: 0, y: 0 },
    bomba,
    agora
);
assert.strictEqual(inimigoCentral.vida, 420);
assert.strictEqual(inimigoNoFragmento.vida, 455);
assert.strictEqual(contextoDaFragmentacao.explosoesDosExplosivos.length, 5);

const comprasDaLoja = new Set([
    "miraCalibrada",
    "sensoresDeLongoAlcance",
    "contratoDeRecuperacao"
]);
const contextoDasMelhorias = {
    CONFIG,
    Math,
    comprasDaLoja,
    multiplicadorDeDanoDasTorres: 1,
    multiplicadorDeAlcanceDasTorres: 1,
    multiplicadorDeCadenciaDasTorres: 1,
    boostFliperamaAtivo: false,
    boostDanoFliperamaAtivo: false
};
vm.createContext(contextoDasMelhorias);
vm.runInContext([
    extrairFuncao("obterBonusPermanenteDaLoja"),
    extrairFuncao("obterMultiplicadorPermanenteDaLoja"),
    extrairFuncao("obterConfiguracaoDaTorre"),
    extrairFuncao("obterConfiguracaoAtualDaTorre"),
    extrairFuncao("atualizarAtributosDaTorreComBonus"),
    extrairFuncao("calcularValorDeVenda")
].join("\n"), contextoDasMelhorias);
const torrePadrao = { tipo: "padrao", nivel: 0, valorInvestido: 100 };
contextoDasMelhorias.atualizarAtributosDaTorreComBonus(torrePadrao);
assert.strictEqual(torrePadrao.dano, 11);
assert.strictEqual(torrePadrao.alcance, 158);
assert.strictEqual(contextoDasMelhorias.calcularValorDeVenda(torrePadrao), 70);

[
    'id="botao-mina-corrosiva"',
    'id="botao-bomba-fragmentacao"',
    "selecionarTipoDeTorre('minaCorrosiva')",
    "selecionarTipoDeTorre('bombaDeFragmentacao')"
].forEach((trecho) => assert.ok(html.includes(trecho), `HTML ausente: ${trecho}`));
[
    ".botao-construcao-mina-corrosiva",
    ".botao-construcao-bomba-fragmentacao",
    ".melhoria-mira-calibrada",
    ".melhoria-sensores-longo-alcance",
    ".melhoria-contrato-recuperacao"
].forEach((trecho) => assert.ok(estilos.includes(trecho), `CSS ausente: ${trecho}`));
assert.ok(especificacao.includes(
    "### Mudança: arsenal corrosivo, fragmentação e novas melhorias permanentes"
));
assert.ok(especificacao.includes("Mestre do Arsenal mostra progresso sobre 23 itens"));
assert.ok(codigo.includes('"Mina Corrosiva": "Corrosive Mine"'));
assert.ok(codigo.includes('"Bomba de Fragmentação": "Bomba de Fragmentación"'));

console.log("Novo arsenal da Loja: armadilhas, melhorias e progressão validadas.");
