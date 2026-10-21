const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const codigo = fs.readFileSync('game.js', 'utf8');
function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf('\nfunction ', inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função ausente: ${nome}`);
    return codigo.slice(inicio, fim);
}

const raiosDesenhados = [];
const contexto = {
    Math,
    torres: [],
    obterConfiguracaoDaTorre(tipo) {
        return tipo === 'amplificador' ? { percentualBonusCadencia: 0.2 } : {};
    },
    ctx: {
        save() {}, restore() {}, beginPath() {}, fill() {}, stroke() {},
        setLineDash() {}, fillRect() {},
        arc(_x, _y, raio) { raiosDesenhados.push(raio); }
    }
};
vm.createContext(contexto);
vm.runInContext([
    'obterAlcanceAtualDaTorre',
    'obterBonusDeCadenciaDoAmplificador',
    'desenharAuraDoAmplificador'
].map(extrairFuncao).join('\n'), contexto);

const amplificador = { tipo: 'amplificador', x: 0, y: 0, alcance: 120 };
const torre = { tipo: 'padrao', x: 90, y: 0 };
contexto.torres.push(amplificador, torre);
assert.equal(contexto.obterBonusDeCadenciaDoAmplificador(torre), 0.2);
contexto.desenharAuraDoAmplificador(amplificador);
assert.equal(raiosDesenhados.at(-1), 120);

amplificador.percentualReducaoAlcanceCoruja = 0.4;
amplificador.reducaoAlcanceCorujaExpiraEm = Date.now() + 5000;
assert.equal(contexto.obterBonusDeCadenciaDoAmplificador(torre), 0);
contexto.desenharAuraDoAmplificador(amplificador);
assert.equal(raiosDesenhados.at(-1), 72);

amplificador.reducaoAlcanceCorujaExpiraEm = Date.now() - 1;
assert.equal(contexto.obterBonusDeCadenciaDoAmplificador(torre), 0.2);
contexto.desenharAuraDoAmplificador(amplificador);
assert.equal(raiosDesenhados.at(-1), 120);

console.log('Maré do Abismo: área e bônus do Amplificador acompanham o alcance efetivo.');
