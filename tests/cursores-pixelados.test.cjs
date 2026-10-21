const assert = require("assert");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const estilos = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const gerador = fs.readFileSync(
    path.join(raiz, "scripts", "gerar-cursores-pixelados.ps1"),
    "utf8"
);
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

const arquivosDosCursores = [
    "cursor-pixel-seta.png",
    "cursor-pixel-mao.png",
    "cursor-pixel-construcao.png",
    "cursor-pixel-invalido.png",
    "cursor-pixel-mira.png",
    "cursor-pixel-explosivo.png"
];

for (const arquivo of arquivosDosCursores) {
    const caminho = path.join(raiz, "assets", arquivo);
    assert.ok(fs.existsSync(caminho), `Cursor ausente: ${arquivo}`);
    const png = fs.readFileSync(caminho);
    assert.deepStrictEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.strictEqual(png.readUInt32BE(16), 32);
    assert.strictEqual(png.readUInt32BE(20), 32);
}

assert.ok(fs.existsSync(path.join(raiz, "scripts", "gerar-cursores-pixelados.ps1")));
assert.match(gerador, /\$branco = Nova-Cor "#f7f7f2"/);
assert.match(gerador, /\$brilhoBranco = Nova-Cor "#ffffff"/);
assert.match(gerador, /\$sombraCinza = Nova-Cor "#aeb7ba"/);
assert.match(gerador, /Preencher-PoligonoPixelado \$seta\.Grafico \$branco/);
assert.match(gerador, /Preencher-PoligonoPixelado \$mao\.Grafico \$branco/);

assert.match(
    estilos,
    /--cursor-pixel-normal: url\("assets\/cursor-pixel-seta\.png"\) 3 2, auto;/
);
assert.match(
    estilos,
    /--cursor-pixel-acao: url\("assets\/cursor-pixel-mao\.png"\) 14 2, pointer;/
);
assert.match(
    estilos,
    /--cursor-pixel-construcao: url\("assets\/cursor-pixel-construcao\.png"\) 5 5, crosshair;/
);
assert.match(
    estilos,
    /--cursor-pixel-invalido: url\("assets\/cursor-pixel-invalido\.png"\) 16 16, not-allowed;/
);
assert.match(
    estilos,
    /--cursor-pixel-mira: url\("assets\/cursor-pixel-mira\.png"\) 16 16, crosshair;/
);
assert.match(
    estilos,
    /--cursor-pixel-explosivo: url\("assets\/cursor-pixel-explosivo\.png"\) 5 5, crosshair;/
);
assert.match(estilos, /html, body \{[\s\S]*?cursor: var\(--cursor-pixel-normal\);/);
assert.match(estilos, /button:not\(:disabled\),[\s\S]*?cursor: var\(--cursor-pixel-acao\) !important;/);
assert.match(estilos, /canvas\.inimigo-sob-cursor \{\s*cursor: var\(--cursor-pixel-mira\) !important;/);
assert.match(estilos, /canvas\.construcao-sob-cursor \{\s*cursor: var\(--cursor-pixel-construcao\);/);
assert.match(estilos, /canvas\.explosivo-sob-cursor \{\s*cursor: var\(--cursor-pixel-explosivo\);/);
assert.match(estilos, /canvas\.posicao-invalida-sob-cursor \{\s*cursor: var\(--cursor-pixel-invalido\) !important;/);
assert.match(estilos, /canvas\.objeto-interativo-sob-cursor \{\s*cursor: var\(--cursor-pixel-acao\) !important;/);
assert.match(estilos, /\.minigame-fliperama \{[\s\S]*?cursor: var\(--cursor-pixel-mira\);/);
assert.match(estilos, /\.botao:disabled \{ cursor: not-allowed;/);
const folhaPrincipal = html.match(/href="(styles\.css)(?:\?[^"]*)?"/);
assert.ok(folhaPrincipal, "A página deve carregar a folha que define os cursores");
assert.ok(fs.existsSync(path.join(raiz, folhaPrincipal[1])));

assert.match(codigo, /const classesDosCursoresEspeciaisDoMapa = Object\.freeze\(\[/);
assert.match(codigo, /function posicaoEhInvalidaParaCursorDeConstrucao\(x, y\)/);
assert.match(codigo, /function atualizarCursorEspecialDoMapa\(x, y\)/);
assert.match(codigo, /canvas\.classList\.add\("inimigo-sob-cursor"\)/);
assert.match(codigo, /"posicao-invalida-sob-cursor"/);
assert.match(codigo, /"explosivo-sob-cursor"\s*:\s*"construcao-sob-cursor"/);

assert.match(especificacao, /cursores pixelados básicos/);
assert.match(especificacao, /assets\/cursor-pixel-seta\.png/);
assert.match(especificacao, /assets\/cursor-pixel-mao\.png/);
assert.match(especificacao, /seta normal[\s\S]*?preenchimento branco, sombra cinza e contorno escuro/);
assert.match(especificacao, /luva branca de 32 × 32 px com sombra cinza, contorno escuro e punho dourado/);
assert.match(especificacao, /cursores pixelados de contexto/);
assert.match(especificacao, /assets\/cursor-pixel-construcao\.png/);
assert.match(especificacao, /assets\/cursor-pixel-invalido\.png/);
assert.match(especificacao, /assets\/cursor-pixel-mira\.png/);
assert.match(especificacao, /assets\/cursor-pixel-explosivo\.png/);
assert.match(especificacao, /cursores nativos `auto` e `pointer` permanecem como alternativas/);

console.log("Cursores pixelados: seis estados, pontos ativos e alternativas validados.");
