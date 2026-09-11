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

assert.ok(!html.includes("posto-comando-lateral"));
assert.ok(!html.includes("lista-bonus-posto"));
assert.ok(!estilos.includes(".posto-comando-lateral"));
assert.ok(!codigo.includes("atualizarPainelDeBoosts"));
assert.match(
    html,
    /<div class="controles-acoes">[\s\S]*?id="botao-pulso-temporal"/
);

const bonusAplicados = [];
const avisos = [];
const contexto = {
    camadaBonusPosBoss: { hidden: false },
    opcoesDeBonusAtuais: ["dano"],
    CONFIG: {
        bonusPosBoss: {
            tipos: {
                dano: {
                    nome: "Munição reforçada",
                    descricao: "Todas as torres causam 10% mais dano."
                }
            }
        }
    },
    aplicarBonusPosBoss(tipo) { bonusAplicados.push(tipo); },
    ocultarPainelBonusPosBoss() {},
    atualizarBotoesDaTorre() {},
    obterNomeLocalizado(configuracao) { return configuracao.nome; },
    localizar(texto, variaveis = {}) {
        return Object.entries(variaveis).reduce(
            (resultado, [nome, valor]) => resultado.replaceAll(`{${nome}}`, valor),
            texto
        );
    },
    mostrarAviso(mensagem) { avisos.push(mensagem); },
    definirJogoPausado() {}
};
vm.createContext(contexto);
vm.runInContext(extrairFuncao("escolherBonusPosBoss"), contexto);
contexto.escolherBonusPosBoss("dano");

assert.deepStrictEqual(bonusAplicados, ["dano"]);
assert.strictEqual(
    avisos.at(-1),
    "Bônus escolhido: Munição reforçada. Todas as torres causam 10% mais dano."
);
assert.ok(especificacao.includes("### Avisos de boosts"));
assert.ok(especificacao.includes("Nenhum quadro de bônus permanentes ou temporários fica sobre o canvas"));

console.log("Avisos de boosts: painel removido e confirmação temporária validada.");
