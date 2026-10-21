const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const itensDaLojaTeste = [
    ["torreA", { custoNaLoja: 30 }],
    ["torreB", { custoNaLoja: 45 }],
    ["torreC", { custoNaLoja: 55 }],
    ["minaA", { custoNaLoja: 60 }],
    ["minaB", { custoNaLoja: 65 }],
    ["melhoriaA", { custoNaLoja: 90 }]
];
const configuracoesPorId = Object.fromEntries(itensDaLojaTeste);
const armazenamento = new Map();
const contexto = {
    CONFIG: {
        sobrecarga: require("./apoio/codigo-jogo.cjs").carregarConfig().sobrecarga,
        loja: {
            ofertaSemanal: {
                quantidadeMaximaDeItens: 3,
                percentuaisDeDesconto: [5, 10, 15]
            }
        }
    },
    CHAVE_OFERTA_SEMANAL_LOJA: "guardians-of-pixel-oferta-semanal-v1",
    itensDaLojaTeste,
    configuracoesPorId,
    comprasDaLoja: new Set(["torreA"]),
    fragmentosPixel: 0,
    ofertaSemanalDaLoja: null,
    localStorage: {
        getItem(chave) {
            return armazenamento.has(chave) ? armazenamento.get(chave) : null;
        },
        setItem(chave, valor) {
            armazenamento.set(chave, String(valor));
        }
    }
};
vm.createContext(contexto);
vm.runInContext(require("./apoio/codigo-jogo.cjs").extrairFuncao("obterTipoDoNucleoDaLoja", "modulos/mochila-nucleos.js"), contexto);
vm.runInContext(`
    function obterItensDaLoja() { return itensDaLojaTeste; }
    function obterConfiguracaoDoItemDaLoja(idDoItem) {
        return configuracoesPorId[idDoItem] || null;
    }
    ${extrairFuncao("obterIdentificadorDaSemana")}
    ${extrairFuncao("obterPontuacaoDeterministicaDaOfertaSemanal")}
    ${extrairFuncao("calcularPrecoComDescontoDaLoja")}
    ${extrairFuncao("criarOfertaSemanalDaLoja")}
    ${extrairFuncao("normalizarOfertaSemanalDaLoja")}
    ${extrairFuncao("salvarOfertaSemanalDaLoja")}
    ${extrairFuncao("carregarOfertaSemanalDaLoja")}
    ${extrairFuncao("garantirOfertaSemanalDaLoja")}
    ${extrairFuncao("obterOfertasSemanaisDaLoja")}
    ${extrairFuncao("obterOfertaSemanalDoItemDaLoja")}
    ${extrairFuncao("obterPrecoAtualDoItemDaLoja")}
    ${extrairFuncao("podeComprarItemDaLoja")}
    ofertaSemanalDaLoja = carregarOfertaSemanalDaLoja();
`, contexto);

function obterOfertas(data) {
    contexto.dataDoTeste = data;
    return JSON.parse(JSON.stringify(
        vm.runInContext("obterOfertasSemanaisDaLoja(dataDoTeste)", contexto)
    ));
}

const agora = new Date();
const proximaSemana = new Date(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate() + 7,
    12
);
const ofertasDaSemana = obterOfertas(agora);

assert.strictEqual(ofertasDaSemana.length, 3);
assert.ok(ofertasDaSemana.every(oferta => oferta.idDoItem !== "torreA"));
assert.deepStrictEqual(
    ofertasDaSemana.map(oferta => oferta.percentualDeDesconto).sort((a, b) => a - b),
    [5, 10, 15]
);
for (const oferta of ofertasDaSemana) {
    assert.strictEqual(
        oferta.precoComDesconto,
        Math.max(1, Math.floor(
            oferta.precoOriginal * (1 - oferta.percentualDeDesconto / 100)
        ))
    );
}

const ofertaSalva = JSON.parse(armazenamento.get(contexto.CHAVE_OFERTA_SEMANAL_LOJA));
assert.deepStrictEqual(
    ofertaSalva.itens.map(item => item.idDoItem),
    ofertasDaSemana.map(oferta => oferta.idDoItem)
);
vm.runInContext("ofertaSemanalDaLoja = carregarOfertaSemanalDaLoja()", contexto);
assert.deepStrictEqual(
    obterOfertas(agora).map(oferta => oferta.idDoItem),
    ofertasDaSemana.map(oferta => oferta.idDoItem)
);

contexto.idEmOferta = ofertasDaSemana[0].idDoItem;
contexto.precoEmOferta = ofertasDaSemana[0].precoComDesconto;
contexto.dataDoTeste = agora;
assert.strictEqual(
    vm.runInContext(
        "obterPrecoAtualDoItemDaLoja(idEmOferta, dataDoTeste)",
        contexto
    ),
    ofertasDaSemana[0].precoComDesconto
);
const idSemOferta = itensDaLojaTeste
    .map(([idDoItem]) => idDoItem)
    .find(idDoItem => !ofertasDaSemana.some(oferta => oferta.idDoItem === idDoItem));
contexto.idSemOferta = idSemOferta;
assert.strictEqual(
    vm.runInContext(
        "obterPrecoAtualDoItemDaLoja(idSemOferta, dataDoTeste)",
        contexto
    ),
    configuracoesPorId[idSemOferta].custoNaLoja
);
contexto.fragmentosPixel = ofertasDaSemana[0].precoComDesconto - 1;
assert.strictEqual(
    vm.runInContext("podeComprarItemDaLoja(idEmOferta, dataDoTeste)", contexto),
    false
);
contexto.fragmentosPixel = ofertasDaSemana[0].precoComDesconto;
assert.strictEqual(
    vm.runInContext("podeComprarItemDaLoja(idEmOferta, dataDoTeste)", contexto),
    true
);

contexto.comprasDaLoja.add(ofertasDaSemana[0].idDoItem);
assert.deepStrictEqual(
    obterOfertas(agora).map(oferta => oferta.idDoItem),
    ofertasDaSemana.map(oferta => oferta.idDoItem),
    "Comprar uma oferta não deve sortear uma substituta na mesma semana."
);
const ofertasRenovadas = obterOfertas(proximaSemana);
assert.ok(
    ofertasRenovadas.every(oferta => !contexto.comprasDaLoja.has(oferta.idDoItem)),
    "A semana seguinte deve excluir todos os itens já comprados."
);

contexto.comprasDaLoja = new Set(itensDaLojaTeste.slice(0, 5).map(([id]) => id));
contexto.dataDoTeste = new Date(
    proximaSemana.getFullYear(),
    proximaSemana.getMonth(),
    proximaSemana.getDate() + 7,
    12
);
vm.runInContext(
    "ofertaSemanalDaLoja = criarOfertaSemanalDaLoja(dataDoTeste)",
    contexto
);
assert.strictEqual(obterOfertas(contexto.dataDoTeste).length, 1);
assert.strictEqual(obterOfertas(contexto.dataDoTeste)[0].idDoItem, "melhoriaA");

contexto.comprasDaLoja = new Set(itensDaLojaTeste.map(([id]) => id));
contexto.dataDoTeste = new Date(
    contexto.dataDoTeste.getFullYear(),
    contexto.dataDoTeste.getMonth(),
    contexto.dataDoTeste.getDate() + 7,
    12
);
vm.runInContext(
    "ofertaSemanalDaLoja = criarOfertaSemanalDaLoja(dataDoTeste)",
    contexto
);
assert.strictEqual(obterOfertas(contexto.dataDoTeste).length, 0);

[
    'const CHAVE_OFERTA_SEMANAL_LOJA = "guardians-of-pixel-oferta-semanal-v1"',
    'id: "ofertas"',
    'nome: "Ofertas"',
    "quantidadeMaximaDeItens: 3",
    "percentuaisDeDesconto: Object.freeze([5, 10, 15])",
    "function criarOfertaSemanalDaLoja(data = new Date(), comprasJaRealizadas = comprasDaLoja)",
    "function carregarOfertaSemanalDaLoja()",
    "function obterOfertasSemanaisDaLoja(data = new Date())",
    "const novoSaldo = fragmentosPixel - precoAtual;",
    'class="loja-oferta-semanal"',
    'class="loja-selo-desconto"',
    'class="loja-preco loja-preco-em-oferta"',
    '"loja.ofertaSemanal": "Weekly sale"',
    '"loja.semOfertas": "SIN OFERTAS"'
].forEach(trecho => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

[
    ".loja-oferta-semanal",
    ".loja-item-em-oferta",
    ".loja-selo-desconto",
    ".loja-preco-em-oferta",
    "grid-template-columns: repeat(4, minmax(0, 1fr))"
].forEach(seletor => assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: oferta semanal da Loja",
    "itens permanentes ainda não comprados",
    "aba **Ofertas**",
    "descontos de 5%, 10% e 15%",
    "arredondado para baixo",
    "não sorteia outro no lugar",
    "guardians-of-pixel-oferta-semanal-v1"
].forEach(trecho => assert.ok(
    especificacao.includes(trecho),
    `Especificação ausente: ${trecho}`
));

console.log("Oferta semanal da Loja: elegibilidade, persistência, preços e aba validados.");
