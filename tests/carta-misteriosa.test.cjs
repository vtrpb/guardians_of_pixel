const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const html = fs.readFileSync("index.htm", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.match(html, /id="camada-cutscene-carta"[\s\S]*?id="texto-cutscene-carta"[\s\S]*?id="assinatura-cutscene-carta"/);
assert.match(html, /onclick="concluirCutsceneDaCarta\(\)"/);
assert.match(codigo, /CHAVE_CARTA_MISTERIOSA_VISTA = "guardians-of-pixel-carta-misteriosa-v1"/);
assert.match(codigo, /cartaMisteriosa: Object\.freeze\(\{[\s\S]*?assinatura: "\?\?\?"/);
assert.match(codigo, /Você está pronto\. Algo estará lhe esperando no lobby da Fase 1, entre as árvores\. Venha ver meu desafio\./);
assert.match(codigo, /function finalizarPartidaComVitoria\(\)[\s\S]*?deveMostrarCartaMisteriosaAposVitoria\(\)[\s\S]*?mostrarCutsceneDaCarta\(\)/);
assert.match(codigo, /conversaDoSenhorDoTempoAtiva[\s\S]*?cutsceneDoCapitulo2Ativa[\s\S]*?cutsceneDaCartaAtiva[\s\S]*?evento\.key === "Escape"/);
assert.match(estilos, /\.camada-cutscene-carta\s*\{[\s\S]*?radial-gradient/);
assert.match(estilos, /\.carta-misteriosa\s*\{[\s\S]*?transform: rotate\(-2deg\)/);
assert.match(estilos, /@keyframes erguer-carta-do-chao/);
assert.match(especificacao, /### Mudança: carta misteriosa após a Fase 6/);
assert.match(especificacao, /A assinatura exibe somente \*\*\?\?\?\*\*/);
assert.match(especificacao, /A Fase 7 e o Capítulo 2 continuam bloqueados/);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf("function " + nome + "(");
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, "Função não encontrada: " + nome);
    return codigo.slice(inicio, fim);
}

const armazenamento = new Map();
const classesDaCamada = new Set();
let resultadoExibido = 0;
const contexto = {
    CONFIG: {
        faseSecreta: {
            faseConcluidaParaAcesso: 6,
            cartaMisteriosa: {
                texto: "Você está pronto. Algo estará lhe esperando no lobby da Fase 1, entre as árvores. Venha ver meu desafio.",
                assinatura: "???"
            }
        }
    },
    CHAVE_CARTA_MISTERIOSA_VISTA: "guardians-of-pixel-carta-misteriosa-v1",
    localStorage: {
        getItem(chave) { return armazenamento.get(chave) ?? null; },
        setItem(chave, valor) { armazenamento.set(chave, String(valor)); }
    },
    camadaCutsceneCarta: {
        hidden: true,
        offsetWidth: 640,
        classList: {
            add(nome) { classesDaCamada.add(nome); },
            remove(nome) { classesDaCamada.delete(nome); }
        }
    },
    tituloCutsceneCarta: { textContent: "" },
    textoCutsceneCarta: { textContent: "" },
    assinaturaCutsceneCarta: { textContent: "" },
    botaoContinuarCutsceneCarta: { textContent: "", focus() { this.focado = true; } },
    localizar: texto => texto,
    mostrarPainelDeResultado(vitoria) {
        assert.strictEqual(vitoria, true);
        resultadoExibido++;
    },
    faseSelecionada: 6,
    faseSecretaDescoberta: false,
    cartaMisteriosaVista: false,
    cutsceneDaCartaAtiva: false
};

vm.createContext(contexto);
vm.runInContext([
    extrairFuncao("salvarCartaMisteriosaVista"),
    extrairFuncao("deveMostrarCartaMisteriosaAposVitoria"),
    extrairFuncao("mostrarCutsceneDaCarta"),
    extrairFuncao("ocultarCutsceneDaCarta"),
    extrairFuncao("concluirCutsceneDaCarta")
].join("\n"), contexto);

assert.strictEqual(contexto.deveMostrarCartaMisteriosaAposVitoria(), true);
contexto.mostrarCutsceneDaCarta();
assert.strictEqual(contexto.cartaMisteriosaVista, true);
assert.strictEqual(armazenamento.get(contexto.CHAVE_CARTA_MISTERIOSA_VISTA), "true");
assert.strictEqual(contexto.camadaCutsceneCarta.hidden, false);
assert.ok(classesDaCamada.has("cutscene-carta-em-exibicao"));
assert.strictEqual(contexto.textoCutsceneCarta.textContent, contexto.CONFIG.faseSecreta.cartaMisteriosa.texto);
assert.strictEqual(contexto.assinaturaCutsceneCarta.textContent, "???");
assert.strictEqual(contexto.botaoContinuarCutsceneCarta.focado, true);
assert.strictEqual(contexto.deveMostrarCartaMisteriosaAposVitoria(), false);

contexto.concluirCutsceneDaCarta();
assert.strictEqual(contexto.camadaCutsceneCarta.hidden, true);
assert.strictEqual(contexto.cutsceneDaCartaAtiva, false);
assert.strictEqual(resultadoExibido, 1);

contexto.cartaMisteriosaVista = false;
contexto.faseSecretaDescoberta = true;
assert.strictEqual(contexto.deveMostrarCartaMisteriosaAposVitoria(), false);

console.log("Carta misteriosa: descoberta, assinatura, persistência e continuação validadas.");
