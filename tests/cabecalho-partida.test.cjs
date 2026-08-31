const assert = require("assert");
const fs = require("fs");

const html = fs.readFileSync("index.htm", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.doesNotMatch(html, /class="cabecalho-jogo"/);
assert.doesNotMatch(html, /class="marca-jogo"/);
assert.doesNotMatch(html, /Comando de defesa|Zona sob proteção/);
assert.match(html, /<div class="aplicacao-jogo">\s*<div class="palco-com-torres">/);
assert.match(html, /class="controles"/);

assert.match(
    css,
    /\.aplicacao-jogo\s*\{[\s\S]*?grid-template-rows: minmax\(0, 1fr\) auto;/
);
assert.match(css, /\.aplicacao-jogo\s*\{[\s\S]*?height: 100vh;/);
assert.match(css, /\.aplicacao-jogo\s*\{[\s\S]*?--espaco-reservado-controles: 116px;/);
assert.match(css, /\.palco-com-torres\s*\{[\s\S]*?height: 100%;/);
assert.match(css, /\.palco-jogo\s*\{[\s\S]*?height: 100%;/);
assert.match(css, /\.palco-com-torres canvas\s*\{[\s\S]*?max-height: calc\(100vh - var\(--espaco-reservado-controles\)\);/);
assert.match(css, /\.seletor-torres\s*\{[\s\S]*?height: 100%;/);
assert.match(css, /\.seletor-torres\s*\{[\s\S]*?max-height: calc\(100vh - var\(--espaco-reservado-controles\)\);/);
assert.doesNotMatch(css, /\.cabecalho-jogo|\.marca-jogo|\.marca-emblema|\.cabecalho-status/);

assert.match(especificacao, /### Mudança: partida sem cabeçalho redundante/);
assert.match(especificacao, /não existe faixa de marca acima do mapa/i);
assert.match(especificacao, /preservando a proporção interna de 1\.200 × 700 px/i);
assert.match(especificacao, /reserva somente 116 px/i);
assert.match(especificacao, /sem distorção, corte ou sobreposição da barra inferior/i);

console.log("Partida sem cabeçalho: espaço do mapa e controles inferiores validados.");
