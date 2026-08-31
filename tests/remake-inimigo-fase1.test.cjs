const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.match(
    codigo,
    /normal: Object\.freeze\(\{ nome: "Vermelho", vida: 100, velocidade: 1\.5, tamanho: 20, cor: "#d33a45" \}\)/
);
assert.match(
    codigo,
    /elite: Object\.freeze\(\{ nome: "Roxo", vida: 300, velocidade: 1\.1, tamanho: 25, cor: "#7b2cbf" \}\)/
);
assert.match(
    codigo,
    /rapido: Object\.freeze\(\{ nome: "Ciano rápido", vida: 200, velocidade: 2\.2, tamanho: 18, escalaVisual: 20, cor: "#00bcd4" \}\)/
);
assert.match(
    codigo,
    /sabotador: Object\.freeze\(\{\s*nome: "Sabotador",\s*vida: 75,\s*velocidade: 1\.1,\s*tamanho: 21,\s*escalaVisual: 22,\s*cor: "#5aa7a0",\s*alcanceAtaque: 180,\s*intervaloAtaque: 1200,\s*velocidadeTiro: 6,\s*tirosParaDestruirTorre: 6\s*\}\)/
);
assert.match(
    codigo,
    /boss: Object\.freeze\(\{\s*nome: "Boss comum",\s*vida: 1000,\s*incrementoVidaPorAparicao: 500,\s*velocidade: 1\.1,\s*tamanho: 38,\s*cor: "#4a001f"\s*\}\)/
);
assert.ok(
    (codigo.match(/desenharCorpoDoInimigo\(/g) || []).length >= 3,
    "Mapa e Álbum devem compartilhar o despachante dos desenhos dos inimigos."
);
assert.match(
    codigo,
    /function obterEscalaVisualDoInimigo\(tipo, tamanhoPadrao\)[\s\S]*?CONFIG\.inimigo\[tipo\]\?\.escalaVisual[\s\S]*?Number\.isFinite/
);
assert.match(
    codigo,
    /const escalaVisual = obterEscalaVisualDoInimigo\(inimigo\.tipo, inimigo\.tamanho\);\s*const tamanho = escalaVisual \* 2;/
);
assert.match(
    codigo,
    /const escalaVisual = obterEscalaVisualDoInimigo\(tipo, configuracao\.tamanho\);\s*const tamanhoDoSprite = escalaVisual \* 2;/
);

const desenhosPorTipo = {
    normal: "desenharInimigoVermelho",
    elite: "desenharInimigoRoxo",
    rapido: "desenharInimigoCianoRapido",
    sabotador: "desenharSabotador",
    boss: "desenharBossComum"
};

for (const [tipo, nomeDaFuncao] of Object.entries(desenhosPorTipo)) {
    assert.match(
        codigo,
        new RegExp(`if \\(inimigo\\.tipo === "${tipo}"\\) \\{\\s*${nomeDaFuncao}\\(x, y, tamanho\\);\\s*return;\\s*\\}`)
    );
}

function extrairFuncao(nomeDaFuncao) {
    const inicio = codigo.indexOf(`function ${nomeDaFuncao}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função ${nomeDaFuncao} não encontrada.`);
    return codigo.slice(inicio, fim);
}

const operacoes = [];
const contexto = {
    Math,
    CONFIG: {
        inimigo: {
            normal: { cor: "#d33a45" },
            elite: { cor: "#7b2cbf" },
            rapido: { cor: "#00bcd4" },
            sabotador: { cor: "#5aa7a0" },
            boss: { cor: "#4a001f" }
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
vm.runInContext(
    Object.values(desenhosPorTipo).map(extrairFuncao).join("\n"),
    contexto
);

const casos = [
    ["desenharInimigoVermelho", 40, "#ffc94a"],
    ["desenharInimigoRoxo", 50, "#e5a8ff"],
    ["desenharInimigoCianoRapido", 40, "#d9ffff"],
    ["desenharSabotador", 44, "#ff5f55"],
    ["desenharBossComum", 76, "#ffd166"]
];

for (const [nomeDaFuncao, tamanho, corDeDestaque] of casos) {
    operacoes.length = 0;
    contexto[nomeDaFuncao](10, 20, tamanho);
    assert.ok(
        operacoes.filter(([tipo]) => tipo === "retangulo").length >= 15,
        `${nomeDaFuncao} precisa ter detalhes pixelados suficientes.`
    );
    assert.ok(
        operacoes.some((operacao) => operacao[0] === "cor" && operacao[1] === corDeDestaque),
        `${nomeDaFuncao} precisa manter sua identidade visual.`
    );
}

assert.match(especificacao, /### Mudança: remake dos inimigos da Fase 1/);
assert.match(especificacao, /\*\*Não alterar:\*\* nomes, tipos internos, vida, velocidade, tamanho lógico, hitboxes/);
assert.match(especificacao, /Vermelho, Roxo, Ciano rápido, Sabotador e Boss comum/);
assert.match(especificacao, /### Mudança: escala visual do Ciano rápido e do Sabotador/);
assert.match(especificacao, /escala visual 20 para o Ciano rápido e 22 para o Sabotador/);

console.log("OK: todos os cinco inimigos da Fase 1 receberam remakes visuais pixelados.");
