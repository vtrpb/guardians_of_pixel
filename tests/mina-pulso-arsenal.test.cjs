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
const CONFIG = contextoDaConfig.CONFIG_TESTE;
const mina = CONFIG.torre.tipos.minaDePulso;

assert.strictEqual(mina.nome, "Mina de Pulso");
assert.strictEqual(mina.tipoDeItem, "mina");
assert.strictEqual(mina.categoriaLoja, "minas");
assert.strictEqual(mina.custoNaLoja, 50);
assert.strictEqual(mina.custo, 175);
assert.strictEqual(mina.dano, 35);
assert.strictEqual(mina.raioExplosao, 90);
assert.strictEqual(mina.raioDeContato, 18);
assert.strictEqual(mina.limitePorPartida, 4);
assert.strictEqual(mina.efeitoDePulso.distanciaDoEmpurrao, 120);
assert.strictEqual(mina.tipoVisualDaExplosao, "pulso");

const totalDeDefesasCompraveis = Object.values(CONFIG.torre.tipos)
    .filter((configuracao) => configuracao.requerCompraNaLoja).length;
assert.strictEqual(totalDeDefesasCompraveis + Object.keys(CONFIG.loja.itens).length, 23);
assert.strictEqual(
    CONFIG.conquistas.mestreDoArsenal.descricao,
    "Compre todos os 23 itens disponíveis na Loja."
);

assert.ok(html.includes('id="botao-mina-pulso"'));
assert.ok(html.includes("selecionarTipoDeTorre('minaDePulso')"));
assert.ok(estilos.includes(".botao-construcao-mina-pulso"));
assert.ok(codigo.includes('{ tipo: "minaDePulso", elemento: botaoMinaPulso }'));
assert.ok(codigo.includes('"Mina de Pulso": "Pulse Mine"'));
assert.ok(codigo.includes('"Mina de Pulso": "Mina de Pulso"'));
assert.ok(codigo.includes('explosao.tipoVisual === "pulso"'));

const inimigoComum = { tipo: "normal", x: 20, y: 0, vida: 100 };
const boss = { tipo: "boss", x: 40, y: 0, vida: 200 };
const inimigoDistante = { tipo: "normal", x: 150, y: 0, vida: 100 };
const contextoDoPulso = {
    Math,
    inimigos: [inimigoComum, boss, inimigoDistante],
    explosoesDosExplosivos: [],
    aplicarDanoAoInimigo(inimigo, dano) { inimigo.vida -= dano; },
    registrarEliminacoesDaBombaPesadaParaConquistas() {},
    aplicarEfeitoGlacial() {},
    empurrarInimigoParaTrasNoCaminho(inimigo, distancia) {
        if (inimigo.tipo === "boss") {
            return 0;
        }
        inimigo.distanciaEmpurrada = distancia;
        return distancia;
    }
};
vm.createContext(contextoDoPulso);
vm.runInContext([
    extrairFuncao("obterInimigosVivosNaArea"),
    extrairFuncao("aplicarDanoEmArea"),
    extrairFuncao("registrarExplosaoVisual"),
    extrairFuncao("detonarFragmentos"),
    extrairFuncao("detonarExplosivo")
].join("\n"), contextoDoPulso);
contextoDoPulso.detonarExplosivo(
    { tipo: "minaDePulso", x: 0, y: 0 },
    mina
);

assert.strictEqual(inimigoComum.vida, 65);
assert.strictEqual(inimigoComum.distanciaEmpurrada, 120);
assert.strictEqual(boss.vida, 165);
assert.strictEqual(boss.distanciaEmpurrada, undefined);
assert.strictEqual(inimigoDistante.vida, 100);
assert.strictEqual(contextoDoPulso.explosoesDosExplosivos[0].tipoVisual, "pulso");

const desbloqueadas = ["mestreDoArsenal"];
let salvamentos = 0;
const contextoDaConquista = {
    CONFIG: { conquistas: { mestreDoArsenal: { objetivo: 1 } } },
    recompensasPermanentesDasMissoes: { conquistasDesbloqueadas: desbloqueadas },
    conquistaEstaDesbloqueada(id) { return desbloqueadas.includes(id); },
    obterEstadoDaConquista() { return { concluida: false }; },
    salvarRecompensasPermanentesDasMissoes() { salvamentos++; }
};
vm.createContext(contextoDaConquista);
vm.runInContext([
    extrairFuncao("revalidarConquistaQueDeixouDeCumprir"),
    extrairFuncao("revalidarConquistaMestreDoArsenal")
].join("\n"), contextoDaConquista);
assert.strictEqual(contextoDaConquista.revalidarConquistaMestreDoArsenal(), true);
assert.deepStrictEqual(desbloqueadas, []);
assert.strictEqual(salvamentos, 1);

assert.ok(especificacao.includes("### Mudança: Mina de Pulso e Mestre do Arsenal"));
assert.ok(especificacao.includes("Mestre do Arsenal mostra progresso sobre 23 itens"));

console.log("Mina de Pulso e Mestre do Arsenal: catálogo, pulso e revalidação validados.");
