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
    assert.notStrictEqual(inicio, -1, `Função ${nome} não encontrada.`);
    const inicioDoCorpo = codigo.indexOf("{", inicio);
    let profundidade = 0;

    for (let indice = inicioDoCorpo; indice < codigo.length; indice++) {
        if (codigo[indice] === "{") profundidade++;
        if (codigo[indice] === "}") profundidade--;
        if (profundidade === 0) return codigo.slice(inicio, indice + 1);
    }

    throw new Error(`Corpo da função ${nome} não foi fechado.`);
}

assert.match(codigo, /function configuracaoPossuiMelhorias\(configuracao\)/);
assert.match(codigo, /return configuracao\.melhorias\.length > 0;/);
assert.match(
    codigo,
    /const nomeDoNivelBase = configuracaoEhExplosivoConsumivel\(configuracao\)\s*\|\| !configuracaoPossuiMelhorias\(configuracao\)\s*\? nomeDaTorre/
);
assert.ok(codigo.includes('localizar("{nome} selecionado.", { nome: nomeDaTorre })'));
assert.ok(codigo.includes('"{nome} selecionado.": "{nome} selected."'));
assert.ok(codigo.includes('"{nome} selecionado.": "{nome} seleccionado."'));
assert.ok(codigo.includes('localizar("{nome} · Dano {dano} · Alcance {alcance}", parametros)'));
assert.match(
    codigo,
    /configuracaoPossuiMelhorias\(configuracaoSelecionada\)\s*\? localizar\("Nível \{nivel\}\/3"[\s\S]*?: obterNomeLocalizado\(configuracaoSelecionada\)/
);
assert.ok(especificacao.includes("### Mudança: nomes de defesas sem melhorias"));

const contexto = {
    localizar(modelo, valores = {}) {
        return modelo.replace(/\{(\w+)\}/g, (_, chave) => valores[chave]);
    },
    obterNomeLocalizado: configuracao => configuracao.nome,
    obterPercentualInteiro: valor => Math.round(valor * 100),
    obterResistenciaDaTorre: torre => torre.resistenciaATiros
};
vm.createContext(contexto);
vm.runInContext(
    `${extrairFuncao("configuracaoPossuiMelhorias")}\n${extrairFuncao("obterDescricaoDaTorreSelecionada")}`,
    contexto
);

const lancaChamas = {
    nome: "Lança-Chamas",
    melhorias: [],
    percentualBonusCadencia: 0,
    naoAtira: false
};
const torreSemMelhorias = { nivel: 0, dano: 10, alcance: 145 };
assert.strictEqual(contexto.configuracaoPossuiMelhorias(lancaChamas), false);
assert.strictEqual(
    contexto.obterDescricaoDaTorreSelecionada(torreSemMelhorias, lancaChamas, {}),
    "Lança-Chamas · Dano 10 · Alcance 145"
);

const torrePadrao = {
    nome: "Torre padrão",
    melhorias: [{ custo: 200 }],
    percentualBonusCadencia: 0,
    naoAtira: false
};
assert.strictEqual(contexto.configuracaoPossuiMelhorias(torrePadrao), true);
assert.strictEqual(
    contexto.obterDescricaoDaTorreSelecionada(
        { nivel: 0, dano: 10, alcance: 150 },
        torrePadrao,
        {}
    ),
    "Torre padrão · Nível 0 · Dano 10 · Alcance 150"
);

const iscaBlindada = {
    nome: "Isca Blindada",
    melhorias: [],
    percentualBonusCadencia: 0,
    naoAtira: true
};
assert.strictEqual(
    contexto.obterDescricaoDaTorreSelecionada(
        { nivel: 0, alcance: 0, tirosRecebidos: 2, resistenciaATiros: 10 },
        iscaBlindada,
        {}
    ),
    "Isca Blindada · Resistência 8/10 tiros"
);

console.log("Defesas sem melhorias: nomes sem nível 0 validados.");
