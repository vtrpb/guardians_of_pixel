const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");

[
    "torreDeRaios: Object.freeze({",
    "minaCongelante: Object.freeze({",
    "quantidadeMaximaDeAlvos: 3",
    "alcanceEncadeamento: 110",
    "multiplicadorDeDanoPorSalto: 0.7",
    "percentualLentidao: 0.5",
    "duracaoLentidao: 2500",
    "function aplicarRaioEncadeado(tiro)",
    "function desenharArmamentoDeRaios(estilo)",
    "function desenharExplosaoCongelante(explosao, progresso, raioAtual)"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

assert.ok(html.includes('id="botao-torre-raios"'));
assert.ok(html.includes('id="botao-mina-congelante"'));
assert.ok(css.includes(".botao-construcao-raios"));
assert.ok(css.includes(".botao-construcao-mina-congelante"));
assert.ok(especificacao.includes("### Mudança: Torre de Raios e Mina Congelante"));
assert.ok(especificacao.includes("mantendo 70% do dano a cada salto"));

const funcaoDoRaio = codigo.match(
    /function aplicarRaioEncadeado\(tiro\) \{[\s\S]*?\n\}/
)[0];
const contexto = {
    Math,
    inimigos: [
        { x: 0, y: 0, vida: 100 },
        { x: 80, y: 0, vida: 100 },
        { x: 160, y: 0, vida: 100 },
        { x: 320, y: 0, vida: 100 }
    ],
    explosoesDosExplosivos: [],
    aplicarDanoAoInimigo(inimigo, dano) {
        inimigo.vida -= dano;
    },
    encontrarAlvoMaisProximo(origem, alvos, alcance) {
        return alvos
            .map((alvo) => ({ alvo, distancia: Math.hypot(origem.x - alvo.x, origem.y - alvo.y) }))
            .filter((candidato) => candidato.distancia <= alcance)
            .sort((a, b) => a.distancia - b.distancia)[0]?.alvo || null;
    }
};
vm.createContext(contexto);
vm.runInContext(funcaoDoRaio, contexto);
contexto.aplicarRaioEncadeado({
    alvo: contexto.inimigos[0],
    dano: 30,
    efeitoDeRaio: {
        quantidadeMaximaDeAlvos: 3,
        alcanceEncadeamento: 110,
        multiplicadorDeDanoPorSalto: 0.7
    }
});

assert.deepStrictEqual(
    contexto.inimigos.map((inimigo) => inimigo.vida),
    [70, 79, 85, 100]
);
assert.strictEqual(contexto.explosoesDosExplosivos[0].segmentos.length, 2);

console.log("Torre de Raios e Mina Congelante: integração validada.");
