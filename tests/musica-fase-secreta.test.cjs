const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

[
    "function tocarPassoDaMusicaDaDimensaoGlitch()",
    "function iniciarMusicaDaDimensaoGlitch()",
    "function pararMusicaDaDimensaoGlitch()",
    "function atualizarGanhoDaMusicaDaDimensaoGlitch()",
    'trilhaDaDimensaoGlitchAtiva = faseAtual.tema === "glitch";',
    "ganhoDaMusicaDaDimensaoGlitch.connect(contextoAudio.destination)",
    "pararMusicaDaDimensaoGlitch();"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

assert.match(
    codigo,
    /musicaDaDimensaoGlitch: Object\.freeze\(\{\s*intervaloDoPasso: 310,\s*volumeRelativo: 1\.75,/
);
assert.match(codigo, /intensidadeDosCortes: Object\.freeze\(\[[\s\S]*?0\.5/);
assert.match(codigo, /indice === 7 \|\| indice === 15/);
assert.match(codigo, /for \(let repeticao = 0; repeticao < 3; repeticao\+\+\)/);

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
            musicaDaDimensaoGlitch: {
                intervaloDoPasso: 310,
                volumeRelativo: 1.75,
                melodia: [
                    146.83, 155.56, 220, 207.65,
                    146.83, 116.54, 155.56, 138.59,
                    174.61, 164.81, 233.08, 220,
                    138.59, 146.83, 110, 103.83
                ],
                baixo: [55, 51.91, 58.27, 46.25],
                intensidadeDosCortes: [
                    0.25, 0, 0.12, 0,
                    0.35, 0.08, 0, 0.18,
                    0.28, 0, 0.14, 0,
                    0.4, 0.1, 0.22, 0.5
                ]
            }
        }
    },
    contextoAudio: { currentTime: 12 },
    ganhoDaMusicaDaDimensaoGlitch: {},
    musicaDaDimensaoGlitchTocando: true,
    passoDaMusicaDaDimensaoGlitch: 15,
    trilhaDaDimensaoGlitchAtiva: true,
    musicaPausadaPeloJogador: false,
    volumeDaMusica: 0.35,
    intervaloDaMusicaDaDimensaoGlitch: null,
    obterContextoAudio() { return null; },
    tocarNotaSintetizada(...argumentos) { notas.push(argumentos); },
    tocarRuidoSintetizado(...argumentos) { ruidos.push(argumentos); },
    iniciarSequenciaMusical() { return 77; },
    pararSequenciaMusical() { return null; },
    atualizarGanhoDaMusicaDaDimensaoGlitch() {},
    atualizarBotoesDaMusica() {},
    Math
};
contexto.obterContextoAudio = () => contexto.contextoAudio;
contexto.iniciarSequenciaMusical = (funcao, intervalo) => {
    contexto.funcaoAgendada = funcao;
    contexto.intervaloAgendado = intervalo;
    return 77;
};
vm.createContext(contexto);
vm.runInContext([
    extrairFuncao("tocarPassoDaMusicaDaDimensaoGlitch"),
    extrairFuncao("iniciarMusicaDaDimensaoGlitch"),
    extrairFuncao("pararMusicaDaDimensaoGlitch")
].join("\n"), contexto);

contexto.tocarPassoDaMusicaDaDimensaoGlitch();
assert.strictEqual(notas.length, 4, "O passo final deve tocar a nota principal e três cortes");
assert.strictEqual(ruidos.length, 1);
assert.strictEqual(contexto.passoDaMusicaDaDimensaoGlitch, 0);

contexto.musicaDaDimensaoGlitchTocando = false;
contexto.iniciarMusicaDaDimensaoGlitch();
assert.strictEqual(contexto.musicaDaDimensaoGlitchTocando, true);
assert.strictEqual(contexto.intervaloDaMusicaDaDimensaoGlitch, 77);
assert.strictEqual(contexto.intervaloAgendado, 310);
contexto.pararMusicaDaDimensaoGlitch();
assert.strictEqual(contexto.musicaDaDimensaoGlitchTocando, false);
assert.strictEqual(contexto.intervaloDaMusicaDaDimensaoGlitch, null);

const chamadas = [];
const musicaFalsa = {
    paused: false,
    pause() { this.paused = true; }
};
const contextoDaSelecao = {
    obterFaseAtual: () => ({ numero: 99, tema: "glitch" }),
    trilhaDoLobbyAtiva: true,
    trilhaDoDesertoAtiva: false,
    trilhaDoArticoAtiva: false,
    trilhaDaSelvaAtiva: false,
    trilhaDoBosqueAtiva: false,
    trilhaDaForjaAtiva: false,
    trilhaDoPantanoAtiva: false,
    trilhaDaDimensaoGlitchAtiva: false,
    trilhaDaConversaDoPortalAtiva: false,
    trilhaPixeladaDaFase1Ativa: false,
    musicaPausadaPeloJogador: false,
    volumeDaMusica: 0.35,
    musica: musicaFalsa,
    atualizarVolumeEfetivoDaMusica() {},
    pararMusicaDoLobby: () => chamadas.push("pararLobby"),
    pararMusicaDoDeserto: () => chamadas.push("pararDeserto"),
    pararMusicaDoArtico: () => chamadas.push("pararArtico"),
    pararMusicaDaSelva: () => chamadas.push("pararSelva"),
    pararMusicaDoBosque: () => chamadas.push("pararBosque"),
    pararMusicaDaForja: () => chamadas.push("pararForja"),
    pararMusicaDoPantano: () => chamadas.push("pararPantano"),
    pararMusicaDaDimensaoGlitch: () => chamadas.push("pararGlitch"),
    pararMusicaDaConversaDoPortal: () => chamadas.push("pararConversaPortal"),
    pararMusicaPixeladaDaFase1: () => chamadas.push("pararFase1"),
    iniciarMusicaDoDeserto: () => chamadas.push("iniciarDeserto"),
    iniciarMusicaDoArtico: () => chamadas.push("iniciarArtico"),
    iniciarMusicaDaSelva: () => chamadas.push("iniciarSelva"),
    iniciarMusicaDoBosque: () => chamadas.push("iniciarBosque"),
    iniciarMusicaDaForja: () => chamadas.push("iniciarForja"),
    iniciarMusicaDoPantano: () => chamadas.push("iniciarPantano"),
    iniciarMusicaDaDimensaoGlitch: () => chamadas.push("iniciarGlitch"),
    iniciarMusicaPixeladaDaFase1: () => chamadas.push("iniciarFase1"),
    tentarIniciarMusicaDoLobby: () => chamadas.push("iniciarLobby"),
    obterContextoAudio: () => ({}),
    reproduzirMusica: () => chamadas.push("reproduzirArquivo")
};
vm.createContext(contextoDaSelecao);
vm.runInContext([
    extrairFuncao("selecionarTrilhaDaPartida"),
    extrairFuncao("selecionarTrilhaDoLobby")
].join("\n"), contextoDaSelecao);

contextoDaSelecao.selecionarTrilhaDaPartida();
assert.strictEqual(contextoDaSelecao.trilhaDaDimensaoGlitchAtiva, true);
assert.strictEqual(contextoDaSelecao.trilhaDaForjaAtiva, false);
assert.strictEqual(musicaFalsa.paused, true);
assert.ok(chamadas.includes("iniciarGlitch"));
assert.ok(!chamadas.includes("iniciarForja"));

contextoDaSelecao.selecionarTrilhaDoLobby();
assert.strictEqual(contextoDaSelecao.trilhaDaDimensaoGlitchAtiva, false);
assert.ok(chamadas.includes("pararGlitch"));
assert.ok(chamadas.includes("iniciarLobby"));

assert.ok(especificacao.includes("composição procedural misteriosa e corrompida"));
assert.ok(especificacao.includes("passos de 310 ms e com ganho relativo de 175%"));
assert.ok(especificacao.includes("três repetições digitais nos passos 8 e 16"));

console.log("Música da Dimensão Glitch: composição, cortes, controles e encerramento validados.");
