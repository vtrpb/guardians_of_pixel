const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.match(codigo, /CHAVE_CARTA_MAQUINA_DO_TEMPO_VISTA = "guardians-of-pixel-carta-maquina-tempo-v1"/);
assert.match(codigo, /CHAVE_MAQUINA_DO_TEMPO_DESBLOQUEADA = "guardians-of-pixel-maquina-tempo-v1"/);
assert.match(codigo, /CHAVE_EPOCA_DA_MAQUINA_DO_TEMPO = "guardians-of-pixel-epoca-temporal-v1"/);
assert.match(codigo, /maquinaDoTempo: Object\.freeze\(\{[\s\S]*?faseQueConcede: 7[\s\S]*?epocaInicial: "presente"/);
assert.match(codigo, /passado: Object\.freeze\(\[8, 10\]\)/);
assert.match(codigo, /presente: Object\.freeze\(\[7\]\)/);
assert.match(codigo, /futuro: Object\.freeze\(\[9, 11, 12\]\)/);
assert.match(codigo, /function finalizarPartidaComVitoria\(\)[\s\S]*?deveMostrarCartaDaMaquinaDoTempoAposVitoria\(\)[\s\S]*?mostrarCutsceneDaCarta\("maquinaDoTempo"\)/);
assert.match(codigo, /function mostrarCapitulos\(\)[\s\S]*?criarBotaoDaMaquinaDoTempoNoCapitulo\(\)/);
assert.match(codigo, /function mostrarFases\([\s\S]*?criarPainelDaMaquinaDoTempo\(\)/);
assert.match(codigo, /numero: 8, nome: "Fase 8", tema: "primordial", descricao: "Selva Primordial"/);
assert.ok(codigo.includes('"Passado": "Past"'));
assert.ok(codigo.includes('"Futuro": "Futuro"'));
assert.match(estilos, /\.botao-maquina-tempo-capitulo\s*\{[\s\S]*?position: absolute/);
assert.match(estilos, /\.maquina-tempo-destinos\s*\{[\s\S]*?grid-template-columns: repeat\(3/);
assert.match(estilos, /\.fase-tema-primordial\s*\{/);
assert.match(especificacao, /### Mudança: carta da Fase 7 e Máquina do Tempo/);
assert.match(especificacao, /Fases 8 e 10 no Passado, a Fase 7 no Presente e as Fases 9, 11 e 12 no Futuro/);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const armazenamento = new Map();
const classesDaCamada = new Set();
let resultadoExibido = 0;
const contexto = {
    CONFIG: {
        faseSecreta: {
            cartaMisteriosa: { texto: "Carta antiga", assinatura: "???" }
        },
        maquinaDoTempo: {
            faseQueConcede: 7,
            epocaInicial: "presente",
            carta: {
                texto: "Recompensa temporal",
                assinatura: "Senhor do Tempo"
            },
            epocas: [
                { id: "passado", nome: "Passado" },
                { id: "presente", nome: "Presente" },
                { id: "futuro", nome: "Futuro" }
            ],
            fasesPlanejadasPorEpoca: {
                passado: [8, 10],
                presente: [7],
                futuro: [9, 11, 12]
            }
        },
        fases: [{ numero: 7 }, { numero: 8 }]
    },
    CHAVE_CARTA_MAQUINA_DO_TEMPO_VISTA: "guardians-of-pixel-carta-maquina-tempo-v1",
    CHAVE_MAQUINA_DO_TEMPO_DESBLOQUEADA: "guardians-of-pixel-maquina-tempo-v1",
    CHAVE_EPOCA_DA_MAQUINA_DO_TEMPO: "guardians-of-pixel-epoca-temporal-v1",
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
    salvarCartaMisteriosaVista() {},
    faseSelecionada: 7,
    cartaDaMaquinaDoTempoVista: false,
    maquinaDoTempoDesbloqueada: false,
    maquinaDoTempoAcabouDeSerConcedida: false,
    cartaMisteriosaVista: true,
    cutsceneDaCartaAtiva: false,
    epocaDaMaquinaDoTempoSelecionada: "presente"
};

vm.createContext(contexto);
vm.runInContext([
    extrairFuncao("salvarCartaDaMaquinaDoTempoVista"),
    extrairFuncao("salvarMaquinaDoTempoDesbloqueada"),
    extrairFuncao("obterEpocaDaMaquinaDoTempo"),
    extrairFuncao("carregarEpocaDaMaquinaDoTempo"),
    extrairFuncao("salvarEpocaDaMaquinaDoTempo"),
    extrairFuncao("deveMostrarCartaDaMaquinaDoTempoAposVitoria"),
    extrairFuncao("mostrarCutsceneDaCarta"),
    extrairFuncao("ocultarCutsceneDaCarta"),
    extrairFuncao("concluirCutsceneDaCarta"),
    extrairFuncao("obterEpocaPlanejadaDaFase")
].join("\n"), contexto);

assert.strictEqual(contexto.deveMostrarCartaDaMaquinaDoTempoAposVitoria(), true);
contexto.mostrarCutsceneDaCarta("maquinaDoTempo");
assert.strictEqual(contexto.cartaDaMaquinaDoTempoVista, true);
assert.strictEqual(contexto.maquinaDoTempoDesbloqueada, true);
assert.strictEqual(contexto.maquinaDoTempoAcabouDeSerConcedida, true);
assert.strictEqual(contexto.textoCutsceneCarta.textContent, "Recompensa temporal");
assert.strictEqual(contexto.assinaturaCutsceneCarta.textContent, "Senhor do Tempo");
assert.strictEqual(contexto.botaoContinuarCutsceneCarta.textContent, "Receber Máquina do Tempo");
assert.strictEqual(
    armazenamento.get(contexto.CHAVE_MAQUINA_DO_TEMPO_DESBLOQUEADA),
    "true"
);
assert.strictEqual(contexto.deveMostrarCartaDaMaquinaDoTempoAposVitoria(), false);
contexto.concluirCutsceneDaCarta();
assert.strictEqual(resultadoExibido, 1);

contexto.epocaDaMaquinaDoTempoSelecionada = "passado";
contexto.salvarEpocaDaMaquinaDoTempo();
assert.strictEqual(contexto.carregarEpocaDaMaquinaDoTempo(), "passado");
armazenamento.set(contexto.CHAVE_EPOCA_DA_MAQUINA_DO_TEMPO, "invalida");
assert.strictEqual(contexto.carregarEpocaDaMaquinaDoTempo(), "presente");
assert.strictEqual(contexto.obterEpocaPlanejadaDaFase(8).id, "passado");

console.log("Máquina do Tempo: carta, épocas, persistência e Fase 8 jogável validadas.");
