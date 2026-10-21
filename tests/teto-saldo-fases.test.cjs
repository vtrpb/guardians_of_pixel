const assert = require('node:assert/strict');
const vm = require('node:vm');
const { carregarConfig, extrairFuncao } = require('./apoio/codigo-jogo.cjs');

const CONFIG = carregarConfig();
const contexto = vm.createContext({
    CONFIG,
    dinheiro: 4990,
    wave: 1,
    mapaPersonalizadoAtivo: null,
    desafioSupremoAtivo: null,
    creditosDeCombateRecebidosNaWave: 0
});
for (const nome of ['faseUsaTetoDeSaldo', 'concederCreditosNaPartida',
    'obterLimiteDeCombateNaWaveDosSuperBosses', 'concederCreditosDeCombate']) {
    vm.runInContext(extrairFuncao(nome), contexto);
}

assert.equal(CONFIG.economia.tetoDeSaldoDasPartidasComuns, 5000);
assert.equal(contexto.concederCreditosDeCombate(20), 10);
assert.equal(contexto.dinheiro, 5000);
assert.equal(contexto.concederCreditosNaPartida(100), 0, 'Gerador e vendas também respeitam o teto');
contexto.wave = 12;
assert.equal(contexto.concederCreditosDeCombate(100), 0, 'Mudar de wave não libera nova cota');
contexto.dinheiro -= 800;
assert.equal(contexto.concederCreditosDeCombate(900), 800, 'Gastar abre espaço no saldo');
assert.equal(contexto.dinheiro, 5000);
assert.equal(contexto.creditosDeCombateRecebidosNaWave, 0, 'Fases normais não usam cota por wave');

for (const mapa of [{ classico: true }, { id: 'mapaDoEditor' }, { evento: 'caixaSurpresa' },
    { evento: 'roleta' }, { evento: 'meteoros' }, { evento: 'idadeDaPedra' }]) {
    contexto.mapaPersonalizadoAtivo = mapa;
    assert.equal(contexto.faseUsaTetoDeSaldo(), true);
    assert.equal(contexto.concederCreditosNaPartida(100), 0);
    contexto.dinheiro = 4990;
    assert.equal(contexto.concederCreditosNaPartida(100), 10);
    assert.equal(contexto.dinheiro, 5000);
}
for (const id of Object.keys(CONFIG.eventos.elencosSuperBosses)) {
    contexto.mapaPersonalizadoAtivo = { evento: id };
    assert.equal(contexto.faseUsaTetoDeSaldo(), false);
    assert.equal(contexto.concederCreditosNaPartida(100), 100);
    contexto.dinheiro = 5000;
}
contexto.mapaPersonalizadoAtivo = null;
contexto.desafioSupremoAtivo = 'qualquerDesafio';
assert.equal(contexto.concederCreditosNaPartida(100), 100, 'Desafio das Supremas não recebe teto');

console.log('Teto fixo das partidas comuns: saldo, gastos, modos e exceções validados.');
