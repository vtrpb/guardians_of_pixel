const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");

[
    "function tocarPassoDaMusicaDoArtico()",
    "function iniciarMusicaDoArtico()",
    "function pararMusicaDoArtico()",
    "function atualizarGanhoDaMusicaDoArtico()",
    'trilhaDoArticoAtiva = faseAtual.tema === "artico";',
    "ganhoDaMusicaDoArtico.connect(contextoAudio.destination)"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

const { carregarConfig } = require('./apoio/codigo-jogo.cjs');
const musica = carregarConfig().audio.musicaDoArtico;
assert.strictEqual(musica.intervaloDoPasso, 400);
assert.strictEqual(musica.volumeRelativo, 1.55);
assert.ok(musica.melodia.length > 0);
assert.ok(especificacao.includes("composição procedural exclusiva do Ártico"));
assert.ok(especificacao.includes("passos de 400 ms com ganho relativo de 155%"));

console.log("Música exclusiva da Fase 3: integração validada.");
