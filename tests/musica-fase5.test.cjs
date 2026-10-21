const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");

[
    "function tocarPassoDaMusicaDoBosque()",
    "function iniciarMusicaDoBosque()",
    "function pararMusicaDoBosque()",
    "function atualizarGanhoDaMusicaDoBosque()",
    'trilhaDoBosqueAtiva = faseAtual.tema === "temperada";',
    "ganhoDaMusicaDoBosque.connect(contextoAudio.destination)"
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Integração ausente: ${trecho}`));

const { carregarConfig } = require('./apoio/codigo-jogo.cjs');
const musica = carregarConfig().audio.musicaDoBosque;
assert.strictEqual(musica.intervaloDoPasso, 330);
assert.strictEqual(musica.volumeRelativo, 1.65);
assert.ok(musica.melodia.length > 0);
assert.ok(especificacao.includes("composição procedural exclusiva do Bosque do Crepúsculo"));
assert.ok(especificacao.includes("passos de 330 ms com ganho relativo de 165%"));

console.log("Música exclusiva da Fase 5: integração validada.");
