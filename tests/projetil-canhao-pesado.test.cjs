const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.match(
    codigo,
    /canhaoPesado: Object\.freeze\(\{[\s\S]*?visualDoProjetil: Object\.freeze\(\{\s*tamanho: 18,\s*corPrincipal: "#303033",\s*corSombra: "#202124",\s*corBrilho: "#494954"\s*\}\)/
);
assert.match(
    codigo,
    /if \(tiro\.tipoDaTorre === "canhaoPesado"\) \{\s*desenharBolaDeCanhao\(tiro\);\s*continue;\s*\}/
);

const inicio = codigo.indexOf("function desenharBolaDeCanhao(");
const fim = codigo.indexOf("\nfunction ", inicio + 1);
assert.ok(inicio >= 0 && fim > inicio);
const funcao = codigo.slice(inicio, fim);

const operacoes = [];
const contexto = {
    Math,
    CONFIG: {
        torre: {
            tipos: {
                canhaoPesado: {
                    visualDoProjetil: {
                        tamanho: 18,
                        corPrincipal: "#303033",
                        corSombra: "#202124",
                        corBrilho: "#494954"
                    }
                }
            }
        }
    },
    ctx: {
        set fillStyle(valor) {
            operacoes.push(["cor", valor]);
        },
        fillRect(...argumentos) {
            operacoes.push(["retangulo", ...argumentos]);
        }
    }
};

vm.createContext(contexto);
vm.runInContext(funcao, contexto);
contexto.desenharBolaDeCanhao({ x: 100.4, y: 80.6 });

assert.strictEqual(operacoes.filter(([tipo]) => tipo === "retangulo").length, 6);
assert.ok(operacoes.some((operacao) => operacao[0] === "cor" && operacao[1] === "#303033"));
assert.ok(operacoes.some((operacao) => operacao[0] === "cor" && operacao[1] === "#494954"));
assert.doesNotMatch(funcao, /shadowBlur|laranja|fogo|cauda|#ff/i);
assert.match(especificacao, /#### Mudança: bola de canhão própria/);
assert.match(especificacao, /A bola não possui fogo, rastro luminoso nem cauda/);

console.log("Bola de canhão autoral: desenho exclusivo e sem fogo validado.");
