const fs = require('node:fs');
const path = require('node:path');

const raiz = path.resolve(__dirname, '..');
const verificados = new Set();
const ausentes = new Set();

function verificarReferencia(referencia, origem) {
    if (/^(?:[a-z]+:|\/\/|#)/i.test(referencia)) return;
    const nome = decodeURIComponent(referencia.split(/[?#]/)[0]);
    if (!nome) return;
    const arquivo = path.resolve(path.dirname(origem), nome);
    if (!fs.existsSync(arquivo)) {
        ausentes.add(`${path.relative(raiz, origem)} → ${referencia}`);
        return;
    }
    if (verificados.has(arquivo)) return;
    verificados.add(arquivo);
    if (path.extname(arquivo) === '.css') {
        const css = fs.readFileSync(arquivo, 'utf8');
        for (const trecho of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)) {
            verificarReferencia(trecho[1], arquivo);
        }
    }
}

const entrada = path.join(raiz, 'index.htm');
const html = fs.readFileSync(entrada, 'utf8');
for (const trecho of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
    verificarReferencia(trecho[1], entrada);
}
if (ausentes.size) {
    console.error([...ausentes].join('\n'));
    process.exitCode = 1;
} else {
    console.log(`${verificados.size} recursos locais do HTML e CSS encontrados.`);
}
