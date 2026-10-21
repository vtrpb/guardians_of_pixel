const vm = require('node:vm');
const { lerCodigo, extrairFuncao } = require('./codigo-jogo.cjs');

// A auditoria e os testes carregam os mesmos registros, sem iniciar as telas.
const MODULOS_DOS_CATALOGOS = Object.freeze([
    ['fase18.js'], ['conquistas-extras.js'], ['mochila-nucleos.js'], ['melhorias.js'],
    ['clima-classico.js'], ['classico.js', 'function obterMapasClassicos'],
    ['supremas.js'], ['enciclopedia.js', 'for (let i = 0;'],
    ['estatisticas-partida.js'], ['segredos-lobby.js', 'function examinarSegredoDoLobby'],
    ['canhao-blindado.js'], ['dominio-torres.js'], ['biomas-classicos.js'],
    ['terreno-construcao.js'], ['previa-inimigos.js', 'function obterPreviaDosInimigos']
]);

function carregarCatalogosDosModulos(contexto) {
    vm.runInContext(extrairFuncao('textoCasa', 'modulos/casa.js'), contexto);
    for (const [nome, limite] of MODULOS_DOS_CATALOGOS) {
        const arquivo = `modulos/${nome}`;
        const fonte = lerCodigo(arquivo);
        const fim = limite ? fonte.indexOf(limite) : fonte.length;
        if (fim < 0) throw new Error(`Limite ausente: ${arquivo}`);
        vm.runInContext(fonte.slice(0, fim), contexto);
    }
}

module.exports = { carregarCatalogosDosModulos };
