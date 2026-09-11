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
const tipos = contextoDaConfig.CONFIG_TESTE.torre.tipos;

const torresEsperadas = [
    ["torrePerfuradora", "Torre Perfuradora", 80, 500, "perfuradora"],
    ["torreMarcadora", "Torre Marcadora", 65, 375, "marcadora"],
    ["torreDrones", "Torre de Drones", 110, 650, "drones"],
    ["torreCorrentes", "Torre de Correntes", 90, 525, "correntes"],
    ["torreSucata", "Torre de Sucata", 75, 450, "sucata"],
    ["canhaoPrismatico", "Canhão Prismático", 125, 700, "prismatico"]
];

for (const [tipo, nome, custoNaLoja, custo, tipoVisual] of torresEsperadas) {
    const configuracao = tipos[tipo];
    assert.ok(configuracao, `${nome} precisa existir em CONFIG`);
    assert.strictEqual(configuracao.nome, nome);
    assert.strictEqual(configuracao.requerCompraNaLoja, true);
    assert.strictEqual(configuracao.categoriaLoja, "torres");
    assert.strictEqual(configuracao.custoNaLoja, custoNaLoja);
    assert.strictEqual(configuracao.custo, custo);
    assert.strictEqual(configuracao.visualBase.tipoVisual, tipoVisual);
    assert.strictEqual(configuracao.melhorias.length, 3);
    assert.ok(html.includes(`selecionarTipoDeTorre('${tipo}')`));
    assert.ok(codigo.includes(`{ tipo: "${tipo}", elemento:`));
    assert.ok(codigo.includes(`"${nome}":`), `Tradução ausente: ${nome}`);
}

[
    ".botao-construcao-perfuradora",
    ".botao-construcao-marcadora",
    ".botao-construcao-drones",
    ".botao-construcao-correntes",
    ".botao-construcao-sucata",
    ".botao-construcao-prismatico"
].forEach((classe) => assert.ok(estilos.includes(classe)));

assert.strictEqual(tipos.torrePerfuradora.efeitoPerfurante.larguraDoFeixe, 24);
assert.strictEqual(tipos.torreMarcadora.efeitoDeMarca.percentualDanoAdicional, 0.15);
assert.strictEqual(tipos.torreDrones.melhorias[1].efeitoDeDrones.quantidade, 3);
assert.strictEqual(tipos.torreCorrentes.efeitoDeCorrente.multiplicadorDanoSegundoAlvo, 0.65);
assert.strictEqual(tipos.torreSucata.melhorias[2].efeitoDeSucata.maximoDePecas, 7);
assert.strictEqual(tipos.canhaoPrismatico.melhorias[2].efeitoPrismatico.multiplicadorVermelho, 1.65);

const contextoDasDescricoes = {
    localizar(texto, parametros = {}) {
        return Object.entries(parametros).reduce(
            (resultado, [chave, valor]) => resultado.replaceAll(`{${chave}}`, valor),
            texto
        );
    },
    obterPercentualInteiro(valor) { return Math.round(valor * 100); },
    obterDuracaoDaQueimaduraEmSegundos(efeito) { return efeito.duracao / 1000; }
};
vm.createContext(contextoDasDescricoes);
vm.runInContext(extrairFuncao("obterDescricaoDoItemDaLoja"), contextoDasDescricoes);
const descricoesEsperadas = [
    ["torrePerfuradora", "Perfura todos os inimigos"],
    ["torreMarcadora", "Marca o alvo por 3.2 segundos"],
    ["torreDrones", "Lança 2 drones por ataque"],
    ["torreCorrentes", "A corrente alcança um segundo inimigo"],
    ["torreSucata", "Coleta até 5 peças"],
    ["canhaoPrismatico", "Alterna disparos"]
];
for (const [tipo, trechoEsperado] of descricoesEsperadas) {
    const descricao = contextoDasDescricoes.obterDescricaoDoItemDaLoja(tipos[tipo]);
    assert.ok(descricao.includes(trechoEsperado), `Descrição incorreta para ${tipo}`);
    assert.ok(!descricao.includes("Atrai Sabotadores"));
    assert.ok(!descricao.includes("undefined"));
}
assert.ok(
    contextoDasDescricoes.obterDescricaoDoItemDaLoja({ dano: 9, alcance: 99 })
        .includes("9 de dano e 99 px")
);

const contextoDano = {
    Date,
    Math,
    CONFIG: { inimigo: { normal: { reducaoDeDano: 0.5 } } }
};
vm.createContext(contextoDano);
vm.runInContext(extrairFuncao("aplicarDanoAoInimigo"), contextoDano);
const alvoMarcado = {
    tipo: "normal",
    vida: 500,
    vidaMaxima: 500,
    marcaExpiraEm: 2000,
    percentualDeDanoAdicionalDaMarca: 0.15
};
assert.strictEqual(contextoDano.aplicarDanoAoInimigo(alvoMarcado, 100, 1000), 57);
assert.strictEqual(
    contextoDano.aplicarDanoAoInimigo(alvoMarcado, 100, 1000, { ignorarReducoes: true }),
    115
);

const contextoPerfuracao = {
    Date,
    Math,
    inimigos: [
        { x: 60, y: 0, vida: 100 },
        { x: 140, y: 10, vida: 100 },
        { x: 140, y: 13, vida: 100 },
        { x: -20, y: 0, vida: 100 }
    ],
    explosoesDosExplosivos: [],
    aplicarDanoAoInimigo(inimigo, dano) { inimigo.vida -= dano; }
};
vm.createContext(contextoPerfuracao);
vm.runInContext(extrairFuncao("aplicarTiroPerfurante"), contextoPerfuracao);
contextoPerfuracao.aplicarTiroPerfurante({
    alvo: contextoPerfuracao.inimigos[0],
    origemX: 0,
    origemY: 0,
    alcanceOriginal: 230,
    dano: 42,
    efeitoPerfurante: { larguraDoFeixe: 24 }
}, 1000);
assert.deepStrictEqual(
    contextoPerfuracao.inimigos.map((inimigo) => inimigo.vida),
    [58, 58, 100, 100]
);

const contextoMarca = { Date, Math };
vm.createContext(contextoMarca);
vm.runInContext(extrairFuncao("aplicarMarcaAoInimigo"), contextoMarca);
const marcado = { vida: 100 };
assert.strictEqual(contextoMarca.aplicarMarcaAoInimigo(
    marcado,
    { percentualDanoAdicional: 0.2, duracao: 3800 },
    1000
), true);
assert.strictEqual(marcado.percentualDeDanoAdicionalDaMarca, 0.2);
assert.strictEqual(marcado.marcaExpiraEm, 4800);

const contextoDrones = {
    Math,
    obterInimigosNoAlcanceDaTorre() { return contextoDrones.candidatos; },
    candidatos: []
};
vm.createContext(contextoDrones);
vm.runInContext(extrairFuncao("obterAlvosDosDrones"), contextoDrones);
const principal = { x: 0, y: 0, vida: 100 };
const segundo = { x: 20, y: 0, vida: 100 };
const terceiro = { x: 40, y: 0, vida: 100 };
contextoDrones.candidatos = [terceiro, principal, segundo];
const alvosDosDrones = contextoDrones.obterAlvosDosDrones({}, principal, 3);
assert.strictEqual(alvosDosDrones[0], principal);
assert.strictEqual(new Set(alvosDosDrones).size, 3);

const contextoPrisma = {
    Date,
    Math,
    aplicarDanoAoInimigo(inimigo, dano, agora, opcoes = {}) {
        contextoPrisma.ultimo = { dano, agora, opcoes };
        inimigo.vida -= dano;
        return dano;
    }
};
vm.createContext(contextoPrisma);
vm.runInContext(extrairFuncao("aplicarDisparoPrismatico"), contextoPrisma);
const efeitoPrismatico = {
    multiplicadorVermelho: 1.45,
    multiplicadorAzul: 0.8,
    percentualLentidaoAzul: 0.3,
    duracaoLentidaoAzul: 1800
};
const alvoAzul = { vida: 200 };
contextoPrisma.aplicarDisparoPrismatico({
    alvo: alvoAzul,
    dano: 100,
    modoPrismatico: "azul",
    efeitoPrismatico
}, 1000);
assert.strictEqual(alvoAzul.vida, 120);
assert.strictEqual(alvoAzul.percentualLentidao, 0.3);
assert.strictEqual(alvoAzul.lentidaoExpiraEm, 2800);
const alvoAmarelo = { vida: 200 };
contextoPrisma.aplicarDisparoPrismatico({
    alvo: alvoAmarelo,
    dano: 100,
    modoPrismatico: "amarelo",
    efeitoPrismatico
}, 1000);
assert.strictEqual(contextoPrisma.ultimo.opcoes.ignorarReducoes, true);

assert.ok(especificacao.includes("### Mudança: seis novas torres da Loja"));
assert.ok(especificacao.includes("Os dezenove tipos de torre"));
assert.ok(especificacao.includes("Os ataques alternam sempre na ordem vermelho, azul e amarelo"));

console.log("Seis novas torres da Loja: compra, melhorias, combate e interface validados.");
