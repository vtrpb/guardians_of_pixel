const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);
const codigoSecundario = fs.readFileSync(
    path.join(raiz, "tower defense 2", "game.js"),
    "utf8"
);
const htmlSecundario = fs.readFileSync(
    path.join(raiz, "tower defense 2", "index.htm"),
    "utf8"
);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

[
    codigo,
    codigoSecundario
].forEach((fonte) => {
    assert.ok(fonte.includes(
        'const CHAVE_INTRODUCAO_FASE_14_VISTA = "guardians-of-pixel-introducao-fase-14-v2"'
    ));
    assert.ok(fonte.includes("musicaDaEraApagada: Object.freeze({"));
    assert.ok(fonte.includes('nomeInterno: "Memórias que Não Existem"'));
    assert.ok(fonte.includes("intervaloDoPasso: 360"));
    assert.ok(fonte.includes("volumeRelativo: 1.95"));
    assert.ok(fonte.includes('if (tema === "eraApagada")'));
    assert.ok(fonte.includes("tocarPassoDaMusicaDaEraApagada(audio, configuracao)"));
    assert.match(fonte, /"intervaloPerdido",\s*"eraApagada"/);
});

const notas = [];
const ruidos = [];
const configuracaoDaEra = {
    intervaloDoPasso: 360,
    melodia: [261.63, 0, 311.13, 293.66, 0, 392, 349.23, 0],
    ecos: [0, 523.25, 0, 622.25, 587.33, 0, 783.99, 0],
    baixo: [49, 43.65],
    percussao: [1, 0.18, 0, 0.42, 0.75, 0, 0.3, 0],
    volumeDaMelodia: 0.068,
    volumeDoEco: 0.022,
    volumeDoBaixo: 0.09,
    volumeDaPercussao: 0.025,
    volumeDaFalhaTemporal: 0.012
};
const contexto = {
    CONFIG: {
        audio: {
            musicaDaEraApagada: configuracaoDaEra,
            musicaDaLinhaTemporal: {},
            musicaDoIntervaloPerdido: {},
            musicaDoPontoZero: {},
            musicaDoFuturoDespedacado: {},
            musicaDoLaboratorio: {},
            musicaDaMetropoleNeon: {},
            musicaDaSelvaPrimordial: {},
            musicaDaSelva: {}
        }
    },
    passoDaMusicaDaSelva: 0,
    ganhoDaMusicaDaSelva: {},
    obterFaseAtual: () => ({ tema: "eraApagada" }),
    tocarNotaSintetizada: (...argumentos) => notas.push(argumentos),
    tocarRuidoSintetizado: (...argumentos) => ruidos.push(argumentos)
};
vm.createContext(contexto);
vm.runInContext([
    extrairFuncao("obterConfiguracaoDaMusicaDaSelva"),
    extrairFuncao("tocarPassoDaMusicaDaEraApagada")
].join("\n"), contexto);

assert.strictEqual(
    vm.runInContext("obterConfiguracaoDaMusicaDaSelva()", contexto),
    configuracaoDaEra
);
vm.runInContext(
    "tocarPassoDaMusicaDaEraApagada({ currentTime: 10 }, CONFIG.audio.musicaDaEraApagada)",
    contexto
);
assert.strictEqual(contexto.passoDaMusicaDaSelva, 1);
assert.strictEqual(notas.length, 2);
assert.strictEqual(ruidos.length, 1);
assert.strictEqual(notas[0][0], 261.63);
assert.strictEqual(notas[1][0], 49);

notas.length = 0;
ruidos.length = 0;
contexto.passoDaMusicaDaSelva = 7;
vm.runInContext(
    "tocarPassoDaMusicaDaEraApagada({ currentTime: 20 }, CONFIG.audio.musicaDaEraApagada)",
    contexto
);
assert.strictEqual(notas.length, 1);
assert.strictEqual(notas[0][0], 1567.98);
assert.strictEqual(notas[0][6], 98);

assert.ok(html.includes("build=salvos-28"));
assert.ok(htmlSecundario.includes("build=salvos-28"));
assert.ok(especificacao.includes("**Memórias que Não Existem**"));
assert.ok(especificacao.includes("guardians-of-pixel-introducao-fase-14-v2"));
assert.ok(especificacao.includes("a marca antiga `v1` não impede a exibição"));
assert.ok(estilos.includes('[data-etapa-cena="inimigosCamuflados"]'));
assert.ok(estilos.includes('[data-etapa-cena="avisoReescrita"]'));
assert.ok(especificacao.includes("O retrato humano do Senhor do Tempo fica visível"));

console.log("Fase 14: trilha exclusiva e reapresentação do diálogo validadas.");
