const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

function extrairFuncao(nome) {
    const inicio = codigo.indexOf("function " + nome + "(");
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, "Função não encontrada: " + nome);
    return codigo.slice(inicio, fim);
}

function criarContexto(valoresIniciais) {
    const armazenamento = new Map(Object.entries(valoresIniciais));
    const contexto = {
        CONFIG: {
            fases: Array.from({ length: 14 }, (_, indice) => ({ numero: indice + 1 })),
            progressoDaCampanha: {
                maiorFaseConfiavelAntesDaCorrecao: 12
            }
        },
        CHAVE_PROGRESSO_FASES: "tower-defense-2-progresso-fases-v2",
        CHAVE_CORRECAO_PROGRESSO_FASES:
            "guardians-of-pixel-correcao-progresso-fases-13-14-v1",
        localStorage: {
            getItem(chave) {
                return armazenamento.has(chave) ? armazenamento.get(chave) : null;
            },
            setItem(chave, valor) {
                armazenamento.set(chave, valor);
            }
        }
    };
    vm.createContext(contexto);
    vm.runInContext(extrairFuncao("carregarMaiorFaseConcluida"), contexto);
    return { contexto, armazenamento };
}

const progressoIncorreto = criarContexto({
    "tower-defense-2-progresso-fases-v2": "14"
});
assert.strictEqual(progressoIncorreto.contexto.carregarMaiorFaseConcluida(), 12);
assert.strictEqual(
    progressoIncorreto.armazenamento.get("tower-defense-2-progresso-fases-v2"),
    "12"
);
assert.strictEqual(
    progressoIncorreto.armazenamento.get(
        "guardians-of-pixel-correcao-progresso-fases-13-14-v1"
    ),
    "true"
);

const progressoPosteriorValido = criarContexto({
    "tower-defense-2-progresso-fases-v2": "14",
    "guardians-of-pixel-correcao-progresso-fases-13-14-v1": "true"
});
assert.strictEqual(progressoPosteriorValido.contexto.carregarMaiorFaseConcluida(), 14);

const progressoAcimaDoLimite = criarContexto({
    "tower-defense-2-progresso-fases-v2": "99",
    "guardians-of-pixel-correcao-progresso-fases-13-14-v1": "true"
});
assert.strictEqual(progressoAcimaDoLimite.contexto.carregarMaiorFaseConcluida(), 14);
assert.strictEqual(
    progressoAcimaDoLimite.armazenamento.get("tower-defense-2-progresso-fases-v2"),
    "14"
);

assert.match(especificacao, /correção única limita a campanha existente à Fase 12/);
assert.match(especificacao, /Valores salvos acima da quantidade atual de fases são normalizados/);

console.log("Progresso das fases: correção única e normalização validadas.");
