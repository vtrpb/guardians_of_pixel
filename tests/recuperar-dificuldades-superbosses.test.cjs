const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const codigo = fs.readFileSync('tests/apoio/recuperar-dificuldades-superbosses-save-1.js', 'utf8');

function simular(criadoEm) {
    const eventos = JSON.stringify({ superBosses: 4, superBossesMecanicos: 5,
        superBossesAbissais: 3, superBossesAcidos: 1 });
    const sistema = { indiceAtivo: 0, espacos: [
        { criadoEm, dados: { 'guardians-of-pixel-eventos-v1': eventos, outraChave: 'preservada' } },
        { criadoEm: 42, dados: { outraChave: 'outro slot' } }
    ] };
    const valores = new Map([
        ['guardians-of-pixel-eventos-v1', eventos],
        ['guardians-of-pixel-salvos-v1', JSON.stringify(sistema)]
    ]);
    const resultado = { textContent: '' };
    const botao = { disabled: true, onclick: null };
    const contexto = { location: { protocol: 'file:' }, Date,
        document: { getElementById(id) { return id === 'resultado' ? resultado : botao; } },
        localStorage: {
            getItem(chave) { return valores.get(chave) ?? null; },
            setItem(chave, valor) { valores.set(chave, String(valor)); },
            removeItem(chave) { valores.delete(chave); }
        }
    };
    vm.runInNewContext(codigo, contexto);
    return { valores, resultado, botao, sistema };
}

const principal = simular(1789073607934);
assert.equal(principal.botao.disabled, false);
principal.botao.onclick();
const eventosRecuperados = JSON.parse(principal.valores.get('guardians-of-pixel-eventos-v1'));
assert.deepEqual([...eventosRecuperados.dificuldadesConcluidas.superBosses], ['facil', 'medio']);
assert.deepEqual([...eventosRecuperados.dificuldadesConcluidas.superBossesMecanicos], ['medio']);
assert.deepEqual([...eventosRecuperados.dificuldadesConcluidas.superBossesAbissais], ['medio']);
assert.deepEqual([...eventosRecuperados.dificuldadesConcluidas.superBossesAcidos], ['facil']);
assert.equal(eventosRecuperados.superBosses, 4);
assert.equal(eventosRecuperados.superBossesMecanicos, 5);
assert.equal(eventosRecuperados.superBossesAbissais, 3);
assert.equal(eventosRecuperados.superBossesAcidos, 1);
const salvoRecuperado = JSON.parse(principal.valores.get('guardians-of-pixel-salvos-v1'));
assert.equal(salvoRecuperado.espacos[0].dados.outraChave, 'preservada');
assert.deepEqual(salvoRecuperado.espacos[1], principal.sistema.espacos[1]);
assert.ok(principal.valores.has('backup-guardians-dificuldades-superbosses-save-1-2026-10-17'));

const novoJogador = simular(1799999999999);
assert.equal(novoJogador.botao.disabled, true);
novoJogador.botao.onclick();
assert.equal(novoJogador.valores.has('backup-guardians-dificuldades-superbosses-save-1-2026-10-17'), false);
assert.equal(novoJogador.valores.get('guardians-of-pixel-eventos-v1'),
    JSON.stringify({ superBosses: 4, superBossesMecanicos: 5, superBossesAbissais: 3, superBossesAcidos: 1 }));
console.log('Recuperação limitada ao Save 1 identificado; outro jogador e outros slots preservados.');
