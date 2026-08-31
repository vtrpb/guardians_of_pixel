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
    "geradorDeCreditos: Object.freeze({",
    'nome: "Gerador de Créditos"',
    "custoNaLoja: 70",
    "custo: 300",
    "creditosPorWave: 100",
    "limitePorPartida: 1",
    "custo: 350",
    "creditosPorWave: 150",
    "custo: 500",
    "creditosPorWave: 225",
    "custo: 700",
    "creditosPorWave: 325",
    "primeiraWaveParaGerarCreditos: wave + 1",
    "function concederCreditosDosGeradoresAposWave(waveConcluida = wave)",
    "concederCreditosDosGeradoresAposWave(wave);",
    "function desenharGeradorDeCreditos(x, y, estilo)",
    "function desenharAvisosDeCreditosGerados()"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

assert.ok(html.includes('id="botao-gerador-creditos"'));
assert.ok(html.includes("selecionarTipoDeTorre('geradorDeCreditos')"));
assert.ok(css.includes(".botao-construcao-gerador"));
assert.ok(especificacao.includes("### Mudança: Gerador de Créditos"));
assert.ok(especificacao.includes("70 Fragmentos na Loja"));
assert.ok(especificacao.includes("sobreviver à wave seguinte inteira"));

const inicioDaFuncao = codigo.indexOf(
    "function concederCreditosDosGeradoresAposWave("
);
const fimDaFuncao = codigo.indexOf("function atualizarWaves()", inicioDaFuncao);
const configuracoesPorNivel = [100, 150, 225, 325]
    .map(creditosPorWave => ({ creditosPorWave }));
const contexto = {
    wave: 5,
    dinheiro: 0,
    torres: [],
    avisosDeCreditosGerados: [],
    CONFIG: {
        torre: {
            duracaoAvisoCreditosGeradosEmQuadros: 75
        }
    },
    obterConfiguracaoDaTorre(tipo) {
        return tipo === "geradorDeCreditos"
            ? { creditosPorWave: 100 }
            : { creditosPorWave: 0 };
    },
    obterConfiguracaoAtualDaTorre(torre) {
        return configuracoesPorNivel[torre.nivel];
    },
    obterEstiloDaTorre() {
        return { raioBase: 27 };
    },
    localizar(texto, parametros) {
        return texto.replace("{creditos}", parametros.creditos);
    },
    mostrarAviso(mensagem) {
        contexto.ultimoAviso = mensagem;
    }
};
vm.createContext(contexto);
vm.runInContext(codigo.slice(inicioDaFuncao, fimDaFuncao), contexto);

const gerador = {
    tipo: "geradorDeCreditos",
    nivel: 0,
    x: 120,
    y: 240,
    primeiraWaveParaGerarCreditos: 5,
    ultimaWaveComCreditosGerados: 4
};
contexto.torres = [gerador];

assert.strictEqual(contexto.concederCreditosDosGeradoresAposWave(4), 0);
assert.strictEqual(contexto.dinheiro, 0);
assert.strictEqual(contexto.concederCreditosDosGeradoresAposWave(5), 100);
assert.strictEqual(contexto.dinheiro, 100);
assert.strictEqual(contexto.concederCreditosDosGeradoresAposWave(5), 0);
assert.strictEqual(contexto.dinheiro, 100, "A mesma wave não pode pagar duas vezes");
assert.strictEqual(contexto.avisosDeCreditosGerados.length, 1);

gerador.nivel = 1;
assert.strictEqual(contexto.concederCreditosDosGeradoresAposWave(6), 150);
assert.strictEqual(contexto.dinheiro, 250);

gerador.nivel = 3;
assert.strictEqual(contexto.concederCreditosDosGeradoresAposWave(7), 325);
assert.strictEqual(contexto.dinheiro, 575);

contexto.torres = [];
assert.strictEqual(contexto.concederCreditosDosGeradoresAposWave(8), 0);
assert.strictEqual(contexto.dinheiro, 575, "Um Gerador removido não pode pagar");

console.log("Gerador de Créditos: compra, melhorias, wave inteira e pagamento único validados.");
