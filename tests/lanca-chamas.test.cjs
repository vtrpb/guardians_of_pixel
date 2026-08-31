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
    "lancaChamas: Object.freeze({",
    'nome: "Lança-Chamas"',
    "custoNaLoja: 100",
    "custo: 650",
    "alcance: 145",
    "dano: 10",
    "velocidadeAtaque: 333",
    "velocidadeTiro: 9",
    "limitePorPartida: 2",
    "danoPorIntervalo: 5",
    "intervaloEntreDanos: 1000",
    "duracao: 10000",
    "function aplicarEfeitoDeQueimadura(inimigo, efeitoDeQueimadura, agora = Date.now())",
    "function atualizarDanoDaQueimaduraNoInimigo(inimigo, agora = Date.now())",
    "function desenharTanqueDeCombustivelDoLancaChamas(estilo)",
    "function desenharArmamentoDoLancaChamas(estilo)",
    "function desenharBolaDeFogo(tiro)",
    "function desenharEfeitoDeQueimaduraNoInimigo(inimigo, x, y, tamanho)",
    "efeitoDeQueimadura: configuracaoAtual.efeitoDeQueimadura || null",
    "aplicarEfeitoDeQueimadura(tiro.alvo, tiro.efeitoDeQueimadura);",
    "inimigo.queimaduraExpiraEm = deslocarCronometroAposPausa(",
    "inimigo.proximoDanoDeQueimaduraEm = deslocarCronometroAposPausa("
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

assert.ok(html.includes('id="botao-lanca-chamas"'));
assert.ok(html.includes("selecionarTipoDeTorre('lancaChamas')"));
assert.ok(css.includes(".botao-construcao-lanca-chamas"));
assert.ok(especificacao.includes("### Mudança: Lança-Chamas"));
assert.ok(especificacao.includes("100 Fragmentos na Loja"));
assert.ok(especificacao.includes("no máximo 2 unidades por partida"));
assert.ok(especificacao.includes("A queimadura não acumula"));
assert.strictEqual(Math.round((500 / 333) * 10) / 10, 1.5);

const inicioDasFuncoes = codigo.indexOf("function aplicarDanoAoInimigo(");
const fimDasFuncoes = codigo.indexOf(
    "function calcularQuantidadeDeInimigoExclusivo(",
    inicioDasFuncoes
);
const contexto = {
    Date,
    CONFIG: {
        inimigo: {
            bossVulcanico: {
                percentualDeVidaParaErupcao: 0.5,
                reducaoDeDanoDaCarapaca: 0.5
            }
        }
    },
    ativarErupcaoDoTita() {}
};
vm.createContext(contexto);
vm.runInContext(codigo.slice(inicioDasFuncoes, fimDasFuncoes), contexto);

const inimigo = {
    tipo: "normal",
    vida: 100,
    vidaMaxima: 100
};
const efeito = {
    danoPorIntervalo: 5,
    intervaloEntreDanos: 1000,
    duracao: 10000
};

assert.strictEqual(contexto.aplicarEfeitoDeQueimadura(inimigo, efeito, 1000), true);
assert.strictEqual(inimigo.queimaduraExpiraEm, 11000);
assert.strictEqual(inimigo.proximoDanoDeQueimaduraEm, 2000);

contexto.aplicarEfeitoDeQueimadura(inimigo, efeito, 1500);
assert.strictEqual(inimigo.queimaduraExpiraEm, 11500);
assert.strictEqual(
    inimigo.proximoDanoDeQueimaduraEm,
    2000,
    "Renovar a queimadura não deve adiar o próximo pulso"
);

assert.strictEqual(contexto.atualizarDanoDaQueimaduraNoInimigo(inimigo, 2000), 5);
assert.strictEqual(inimigo.vida, 95);
assert.strictEqual(contexto.atualizarDanoDaQueimaduraNoInimigo(inimigo, 11000), 45);
assert.strictEqual(inimigo.vida, 50, "Dez pulsos devem causar 50 de dano no total");
assert.strictEqual(contexto.atualizarDanoDaQueimaduraNoInimigo(inimigo, 11500), 0);

contexto.aplicarEfeitoDeQueimadura(inimigo, efeito, 12000);
assert.strictEqual(inimigo.queimaduraExpiraEm, 22000);
assert.strictEqual(inimigo.proximoDanoDeQueimaduraEm, 13000);

console.log("Lança-Chamas: compra, limite, queimadura e visuais validados.");
