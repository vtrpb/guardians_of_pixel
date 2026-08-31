const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

[
    "function tocarPassoDaMusicaDaConversaDoPortal()",
    "function iniciarMusicaDaConversaDoPortal()",
    "function pararMusicaDaConversaDoPortal()",
    "function selecionarTrilhaDaConversaDoPortal()",
    "function atualizarGanhoDaMusicaDaConversaDoPortal()",
    "ganhoDaMusicaDaConversaDoPortal.connect(contextoAudio.destination)",
    "pararMusicaDaConversaDoPortal();"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

assert.match(
    codigo,
    /musicaDaConversaDoPortal: Object\.freeze\(\{\s*intervaloDoPasso: 540,\s*volumeRelativo: 1\.85,/
);
assert.match(codigo, /melodia: Object\.freeze\(\[\s*130\.81, 138\.59, 110, 155\.56,/);
assert.match(codigo, /nota \* 1\.414/);
assert.match(codigo, /indice === 2 \|\| indice === 6/);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf("function " + nome + "(");
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, "Função não encontrada: " + nome);
    return codigo.slice(inicio, fim);
}

const notas = [];
const ruidos = [];
const contexto = {
    CONFIG: {
        audio: {
            musicaDaConversaDoPortal: {
                intervaloDoPasso: 540,
                volumeRelativo: 1.85,
                melodia: [130.81, 138.59, 110, 155.56, 123.47, 103.83, 146.83, 92.5],
                baixo: [65.41, 58.27]
            }
        }
    },
    contextoAudio: { currentTime: 9 },
    ganhoDaMusicaDaConversaDoPortal: {},
    musicaDaConversaDoPortalTocando: true,
    passoDaMusicaDaConversaDoPortal: 6,
    trilhaDaConversaDoPortalAtiva: true,
    musicaPausadaPeloJogador: false,
    volumeDaMusica: 0.35,
    intervaloDaMusicaDaConversaDoPortal: null,
    obterContextoAudio() { return this.contextoAudio; },
    tocarNotaSintetizada(...argumentos) { notas.push(argumentos); },
    tocarRuidoSintetizado(...argumentos) { ruidos.push(argumentos); },
    iniciarSequenciaMusical() { return 91; },
    pararSequenciaMusical() { return null; },
    atualizarGanhoDaMusicaDaConversaDoPortal() {},
    atualizarBotoesDaMusica() {},
    Math
};
contexto.obterContextoAudio = () => contexto.contextoAudio;
contexto.iniciarSequenciaMusical = (funcao, intervalo) => {
    contexto.funcaoAgendada = funcao;
    contexto.intervaloAgendado = intervalo;
    return 91;
};
vm.createContext(contexto);
vm.runInContext([
    extrairFuncao("tocarPassoDaMusicaDaConversaDoPortal"),
    extrairFuncao("iniciarMusicaDaConversaDoPortal"),
    extrairFuncao("pararMusicaDaConversaDoPortal")
].join("\n"), contexto);

contexto.tocarPassoDaMusicaDaConversaDoPortal();
assert.strictEqual(notas.length, 2, "O passo 7 deve combinar nota grave e intervalo dissonante.");
assert.strictEqual(ruidos.length, 1, "O passo 7 deve incluir ruído filtrado.");
assert.strictEqual(contexto.passoDaMusicaDaConversaDoPortal, 7);

contexto.musicaDaConversaDoPortalTocando = false;
contexto.iniciarMusicaDaConversaDoPortal();
assert.strictEqual(contexto.musicaDaConversaDoPortalTocando, true);
assert.strictEqual(contexto.intervaloDaMusicaDaConversaDoPortal, 91);
assert.strictEqual(contexto.intervaloAgendado, 540);
contexto.pararMusicaDaConversaDoPortal();
assert.strictEqual(contexto.musicaDaConversaDoPortalTocando, false);
assert.strictEqual(contexto.intervaloDaMusicaDaConversaDoPortal, null);

assert.ok(especificacao.includes("composição procedural assustadora e corrompida exclusiva desse diálogo"));
assert.ok(especificacao.includes("passos de 540 ms e ganho relativo de 185%"));
assert.ok(especificacao.includes("entre 92,5 e 155,56 Hz"));
assert.ok(especificacao.includes("diferentes da música da Dimensão Glitch"));

console.log("Música da conversa do portal: composição exclusiva, controle e encerramento validados.");
