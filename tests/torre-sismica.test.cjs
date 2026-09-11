const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

[
    "torreSismica: Object.freeze({",
    'nome: "Torre Sísmica"',
    "faseConcluidaParaDesbloqueio: 6",
    "custo: 600",
    "alcance: 170",
    "limitePorPartida: 2",
    "cargasNecessarias: 3",
    "distanciaDoEmpurrao: 110",
    "duracaoDoAtordoamentoDoBoss: 900",
    "percentualDeVulnerabilidade: 0.15",
    "duracaoDaVulnerabilidade: 3000",
    "atrasoDoSegundoImpacto: 700",
    "multiplicadorDoSegundoImpacto: 0.55",
    "function empurrarInimigoParaTrasNoCaminho(inimigo, distancia)",
    "function ativarImpactoSismico(",
    "function atualizarTorresSismicas(agora = Date.now())",
    "function desenharTorreSismica(x, y, estilo)",
    "function desenharImpactoSismico(explosao, progresso, raioAtual)",
    "atualizarTorresSismicas();"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

assert.ok(html.includes('id="botao-torre-sismica"'));
assert.ok(html.includes("selecionarTipoDeTorre('torreSismica')"));
assert.ok(css.includes(".botao-construcao-sismica"));
assert.ok(especificacao.includes("### Mudança: Torre Sísmica"));
assert.ok(especificacao.includes("desbloqueada ao concluir a Fase 6"));
assert.ok(especificacao.includes("#### Ajuste de balanceamento: Obliterador e Torre Sísmica"));
assert.ok(especificacao.includes("38/52/70/96** para **34/47/63/86"));
assert.ok(especificacao.includes("empurrão de **120 para 110 px**"));

const caminho = [{ x: 0, y: 0 }, { x: 200, y: 0 }, { x: 200, y: 200 }];
const efeitoBase = {
    cargasNecessarias: 3,
    distanciaDoEmpurrao: 110,
    duracaoDoAtordoamentoDoBoss: 900,
    percentualDeVulnerabilidade: 0,
    duracaoDaVulnerabilidade: 0,
    atrasoDoSegundoImpacto: 0,
    multiplicadorDoSegundoImpacto: 0.5,
    duracaoVisualEmQuadros: 26
};
const configuracaoBase = {
    efeitoSismico: efeitoBase,
    visualBase: { raioBase: 29, corFissura: "#ff8438" }
};
const contexto = {
    Date,
    Math,
    inimigos: [],
    torres: [],
    explosoesDosExplosivos: [],
    torreSelecionada: null,
    obterCaminhoDoInimigo() { return caminho; },
    tipoEhBoss(tipo) { return tipo === "boss"; },
    obterAlcanceAtualDaTorre(torre) { return torre.alcance; },
    obterEstiloDaTorre() { return configuracaoBase.visualBase; },
    obterConfiguracaoDaTorre() { return configuracaoBase; },
    obterConfiguracaoAtualDaTorre() { return configuracaoBase; },
    obterInimigosNoAlcanceDaTorre(torre) {
        return contexto.inimigos.filter(inimigo => (
            Math.hypot(torre.x - inimigo.x, torre.y - inimigo.y) <= torre.alcance
        ));
    },
    atualizarBotoesDaTorre() {}
};
vm.createContext(contexto);
const inicioDasFuncoes = codigo.indexOf("function calcularProgressoDoInimigo(");
const fimDasFuncoes = codigo.indexOf("function escolherAlvoDaTorre(", inicioDasFuncoes);
vm.runInContext(codigo.slice(inicioDasFuncoes, fimDasFuncoes), contexto);

const inimigo = { tipo: "normal", vida: 100, x: 200, y: 50, alvo: 2 };
assert.strictEqual(contexto.calcularProgressoDoInimigo(inimigo), 250);
assert.strictEqual(contexto.empurrarInimigoParaTrasNoCaminho(inimigo, 110), 110);
assert.strictEqual(contexto.calcularProgressoDoInimigo(inimigo), 140);
assert.strictEqual(inimigo.x, 140);
assert.strictEqual(inimigo.y, 0);

const torre = {
    tipo: "torreSismica",
    nivel: 0,
    x: 150,
    y: 0,
    alcance: 150,
    cargaSismica: 0,
    inimigosDentroDoAlcanceSismico: new Set(),
    impactoSismicoSecundarioEm: 0
};
const boss = { tipo: "boss", vida: 1000, x: 140, y: 0, alvo: 1 };
contexto.inimigos = [
    boss,
    ...Array.from({ length: 2 }, (_, indice) => ({
        tipo: "normal",
        vida: 100,
        x: 120 + indice * 5,
        y: 0,
        alvo: 1
    }))
];
contexto.torres = [torre];
contexto.atualizarTorresSismicas(1000);
assert.strictEqual(torre.cargaSismica, 0, "Três entradas devem ativar o impacto imediatamente");
assert.strictEqual(contexto.explosoesDosExplosivos.length, 1);
assert.strictEqual(boss.x, 140, "Boss não deve ser empurrado");
assert.strictEqual(boss.atordoadoPelaTorreSismicaAte, 1900);

const torresSobrepostas = Array.from({ length: 2 }, () => ({
    tipo: "torreSismica",
    nivel: 0,
    x: 200,
    y: 100,
    alcance: 170,
    cargaSismica: 0,
    inimigosDentroDoAlcanceSismico: new Set(),
    impactoSismicoSecundarioEm: 0
}));
const bossEntreDuasTorres = { tipo: "boss", vida: 1000, x: 200, y: 120, alvo: 2 };
const inimigoEntreDuasTorres = { tipo: "normal", vida: 100, x: 200, y: 150, alvo: 2 };
contexto.inimigos = [
    bossEntreDuasTorres,
    inimigoEntreDuasTorres,
    { tipo: "normal", vida: 100, x: 200, y: 160, alvo: 2 }
];
contexto.torres = torresSobrepostas;
contexto.explosoesDosExplosivos = [];
const progressoAntesDosDoisImpactos = contexto.calcularProgressoDoInimigo(
    inimigoEntreDuasTorres
);
contexto.atualizarTorresSismicas(4000);
assert.deepStrictEqual(
    torresSobrepostas.map(item => item.cargaSismica),
    [0, 0],
    "As duas torres devem carregar com as mesmas três entradas"
);
assert.strictEqual(contexto.explosoesDosExplosivos.length, 2);
assert.strictEqual(
    progressoAntesDosDoisImpactos
        - contexto.calcularProgressoDoInimigo(inimigoEntreDuasTorres),
    220,
    "Os empurrões de duas torres devem se somar"
);
assert.strictEqual(
    bossEntreDuasTorres.atordoadoPelaTorreSismicaAte,
    5800,
    "Dois impactos devem prolongar o atordoamento do Boss"
);

const efeitoAvancado = {
    ...efeitoBase,
    cargasNecessarias: 2,
    percentualDeVulnerabilidade: 0.15,
    duracaoDaVulnerabilidade: 3000,
    atrasoDoSegundoImpacto: 700,
    multiplicadorDoSegundoImpacto: 0.55
};
const configuracaoAvancada = {
    efeitoSismico: efeitoAvancado,
    visualBase: configuracaoBase.visualBase
};
contexto.obterConfiguracaoAtualDaTorre = () => configuracaoAvancada;
contexto.inimigos = [boss];
contexto.torres = [torre];
contexto.ativarImpactoSismico(torre, efeitoAvancado, 2000);
assert.strictEqual(torre.impactoSismicoSecundarioEm, 2700);
assert.strictEqual(boss.percentualDeVulnerabilidadeSismica, 0.15);
assert.strictEqual(boss.vulnerabilidadeSismicaExpiraEm, 5000);
contexto.atualizarTorresSismicas(2700);
assert.strictEqual(torre.impactoSismicoSecundarioEm, 0);
assert.ok(contexto.explosoesDosExplosivos.length >= 3);

const inicioDoDano = codigo.indexOf("function aplicarDanoAoInimigo(");
const fimDoDano = codigo.indexOf("function atualizarRegeneracaoDaHidra(", inicioDoDano);
const contextoDano = {
    Date,
    Math,
    CONFIG: { inimigo: { bossVulcanico: {}, bossPantano: {} } },
    ativarErupcaoDoTita() {},
    mostrarAviso() {},
    localizar(texto) { return texto; }
};
vm.createContext(contextoDano);
vm.runInContext(codigo.slice(inicioDoDano, fimDoDano), contextoDano);
const alvoVulneravel = {
    tipo: "normal",
    vida: 500,
    vidaMaxima: 500,
    percentualDeVulnerabilidadeSismica: 0.15,
    vulnerabilidadeSismicaExpiraEm: 5000
};
assert.strictEqual(contextoDano.aplicarDanoAoInimigo(alvoVulneravel, 100, 2000), 115);
assert.strictEqual(alvoVulneravel.vida, 385);

console.log("Torre Sísmica: carga, empurrão, Boss, vulnerabilidade e segundo impacto validados.");
