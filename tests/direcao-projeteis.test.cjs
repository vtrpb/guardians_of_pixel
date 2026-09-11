const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    assert.ok(inicio >= 0, `Função ausente: ${nome}`);
    const inicioDoBloco = codigo.indexOf("{", inicio);
    let profundidade = 0;

    for (let indice = inicioDoBloco; indice < codigo.length; indice++) {
        if (codigo[indice] === "{") profundidade++;
        if (codigo[indice] === "}") profundidade--;
        if (profundidade === 0) return codigo.slice(inicio, indice + 1);
    }

    throw new Error(`Bloco incompleto: ${nome}`);
}

const rotacoes = [];
const contexto = {
    Math,
    Number,
    ctx: {
        save() {},
        restore() {},
        translate() {},
        rotate(angulo) { rotacoes.push(angulo); },
        beginPath() {},
        moveTo() {},
        lineTo() {},
        closePath() {},
        fill() {},
        fillRect() {},
        strokeRect() {},
        set fillStyle(valor) {},
        set strokeStyle(valor) {},
        set lineWidth(valor) {},
        set shadowColor(valor) {},
        set shadowBlur(valor) {}
    }
};

vm.createContext(contexto);
[
    "obterAnguloVisualDoTiro",
    "desenharProjetilOrientado",
    "desenharEstilhacoGlacial",
    "desenharViroteDaBesta",
    "desenharLaserDoObliterador",
    "desenharProjetilDaNovaTorre"
].forEach((nome) => vm.runInContext(extrairFuncao(nome), contexto));

const quaseIgual = (valor, esperado) => Math.abs(valor - esperado) < 0.000001;
const criarTiro = (alvo, extras = {}) => ({ x: 50, y: 50, alvo, ...extras });

assert.ok(quaseIgual(
    contexto.obterAnguloVisualDoTiro(criarTiro({ x: 50, y: 0 })),
    -Math.PI / 2
));
assert.ok(quaseIgual(
    contexto.obterAnguloVisualDoTiro(criarTiro({ x: 50, y: 100 })),
    Math.PI / 2
));

contexto.desenharViroteDaBesta(criarTiro({ x: 50, y: 0 }));
assert.ok(quaseIgual(rotacoes.pop(), -Math.PI / 2), "O virote deve apontar para o norte");

contexto.desenharLaserDoObliterador(criarTiro({ x: 50, y: 100 }));
assert.ok(quaseIgual(rotacoes.pop(), Math.PI / 2), "O laser deve apontar para o sul");

contexto.desenharProjetilDaNovaTorre(criarTiro(
    { x: 0, y: 50 },
    { tipoDaTorre: "torrePerfuradora" }
));
assert.ok(quaseIgual(Math.abs(rotacoes.pop()), Math.PI), "O disparo deve apontar para o oeste");

contexto.desenharEstilhacoGlacial(criarTiro({ x: 50, y: 0 }));
assert.ok(quaseIgual(rotacoes.pop(), 0), "O eixo vertical do estilhaço deve acompanhar o norte");

const anguloAntesDoAlvoMover = contexto.obterAnguloVisualDoTiro(
    criarTiro({ x: 100, y: 50 })
);
const anguloDepoisDoAlvoMover = contexto.obterAnguloVisualDoTiro(
    criarTiro({ x: 50, y: 0 })
);
assert.notStrictEqual(anguloAntesDoAlvoMover, anguloDepoisDoAlvoMover);

assert.doesNotMatch(extrairFuncao("desenharBolaDeCanhao"), /desenharProjetilOrientado/);
assert.match(especificacao, /### Mudança: direção visual dos projéteis/);
assert.match(especificacao, /O virote da Torre Besta aponta sua ponta para o alvo em qualquer direção/);
assert.match(especificacao, /demais projéteis simétricos preservam seus desenhos atuais sem rotação visual/);

console.log("Direção visual dos projéteis: orientação pelo alvo validada.");
