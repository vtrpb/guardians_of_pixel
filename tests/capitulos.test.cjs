const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const html = fs.readFileSync("index.htm", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

const botaoCapitulos = html.match(/<button\b[^>]*id="botao-capitulos-mapas"[^>]*>/)?.[0];
assert.ok(botaoCapitulos, 'Atalho de capítulos deve existir');
const acaoCapitulos = botaoCapitulos.match(/onclick="([^"]+)"/)[1];
for (const classico of [false, true]) {
    const destinos = [];
    vm.runInNewContext(acaoCapitulos, {
        lobbyClassicoAtivo: classico,
        mostrarCapitulos: () => destinos.push('capitulos'),
        mostrarApresentacaoClassico: () => destinos.push('mapas')
    });
    assert.deepStrictEqual(destinos, [classico ? 'mapas' : 'capitulos']);
}
assert.match(html, /data-i18n="lobby\.capitulos">Capítulos</);
assert.doesNotMatch(html, /onclick="mostrarFases\(\)"/);
assert.match(codigo, /capitulos: Object\.freeze\(\[[\s\S]*?faseInicial: 1, faseFinal: 6[\s\S]*?faseInicial: 7, faseFinal: 12[\s\S]*?faseInicial: 13, faseFinal: 18/);
assert.match(codigo, /numero: 2[\s\S]*?requerVitoriaNaFaseSecreta: true/);
assert.match(codigo, /numero: 3[\s\S]*?requerVitoriaNoIntervaloPerdido: true/);
assert.match(codigo, /CHAVE_CAPITULO_2_DESBLOQUEADO = "guardians-of-pixel-capitulo-2-desbloqueado-v1"/);
assert.match(codigo, /CHAVE_CAPITULO_3_DESBLOQUEADO = "guardians-of-pixel-capitulo-3-desbloqueado-v1"/);
assert.match(codigo, /function mostrarCapitulos\(\)[\s\S]*?CONFIG\.capitulos\.map/);
assert.match(codigo, /data-numero-capitulo="\$\{capitulo\.numero\}"/);
assert.match(codigo, /function abrirCapitulo\(numeroDoCapitulo\)/);
assert.match(codigo, /const fasesDoCapitulo = CONFIG\.fases\.filter/);
assert.match(codigo, /function mostrarFases\(numeroDoCapitulo = capituloSelecionado\)/);
assert.match(codigo, /onclick="mostrarCapitulos\(\)">← \$\{localizar\("Voltar aos capítulos"\)\}/);
assert.match(codigo, /As Fases \{inicio\} a \{fim\} serão adicionadas em futuras atualizações\./);
assert.ok(codigo.includes('"Capítulos": "Chapters"'));
assert.ok(codigo.includes('"Capítulos": "Capítulos"'));

[
    ".capitulos-grade",
    ".capitulo-cartao",
    ".capitulo-cartao-bloqueado",
    ".capitulo-progresso",
    ".botao-capitulo-acao",
    ".navegacao-capitulos",
    ".fases-em-desenvolvimento"
].forEach((seletor) => assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`));

function extrairFuncao(nome) {
    const inicio = codigo.indexOf("function " + nome + "(");
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, "Função não encontrada: " + nome);
    return codigo.slice(inicio, fim);
}

const contexto = {
    CONFIG: {
        capitulos: [
            { numero: 1, faseInicial: 1, faseFinal: 6 },
            { numero: 2, faseInicial: 7, faseFinal: 12, requerVitoriaNaFaseSecreta: true },
            { numero: 3, faseInicial: 13, faseFinal: 18, requerVitoriaNoIntervaloPerdido: true }
        ],
        fases: Array.from({ length: 13 }, (_, indice) => ({ numero: indice + 1 }))
    }
};
vm.createContext(contexto);
vm.runInContext([
    "var maiorFaseConcluida = 0;",
    "var capitulo2Desbloqueado = false;",
    "var capitulo3Desbloqueado = false;",
    extrairFuncao("obterCapitulo"),
    extrairFuncao("obterCapituloDaFase"),
    extrairFuncao("obterProgressoDoCapitulo"),
    extrairFuncao("capituloEstaConcluido"),
    extrairFuncao("capituloEstaDesbloqueado"),
    extrairFuncao("faseEstaDesbloqueada")
].join("\n"), contexto);

contexto.maiorFaseConcluida = 5;
assert.strictEqual(contexto.capituloEstaDesbloqueado(1), true);
assert.strictEqual(contexto.capituloEstaConcluido(1), false);
assert.strictEqual(contexto.capituloEstaDesbloqueado(2), false);
assert.strictEqual(contexto.faseEstaDesbloqueada(6), true);
assert.strictEqual(contexto.faseEstaDesbloqueada(7), false);

contexto.maiorFaseConcluida = 6;
assert.strictEqual(contexto.capituloEstaConcluido(1), true);
assert.strictEqual(contexto.capituloEstaDesbloqueado(2), false);
assert.strictEqual(contexto.faseEstaDesbloqueada(7), false);
assert.strictEqual(contexto.capituloEstaDesbloqueado(3), false);
assert.strictEqual(contexto.obterProgressoDoCapitulo(contexto.CONFIG.capitulos[1]).fasesConcluidas, 0);

contexto.capitulo2Desbloqueado = true;
assert.strictEqual(contexto.capituloEstaDesbloqueado(2), true);
assert.strictEqual(contexto.faseEstaDesbloqueada(7), true);

contexto.maiorFaseConcluida = 7;
const progressoDoCapitulo2 = contexto.obterProgressoDoCapitulo(contexto.CONFIG.capitulos[1]);
assert.strictEqual(progressoDoCapitulo2.fasesConcluidas, 1);
assert.strictEqual(progressoDoCapitulo2.totalDeFases, 6);
assert.strictEqual(contexto.capituloEstaDesbloqueado(3), false);

contexto.maiorFaseConcluida = 12;
assert.strictEqual(contexto.capituloEstaConcluido(2), true);
assert.strictEqual(contexto.capituloEstaDesbloqueado(3), false);
assert.strictEqual(contexto.faseEstaDesbloqueada(13), false);
contexto.capitulo3Desbloqueado = true;
assert.strictEqual(contexto.capituloEstaDesbloqueado(3), true);
assert.strictEqual(contexto.faseEstaDesbloqueada(13), true);
assert.strictEqual(contexto.capituloEstaDesbloqueado(4), false);
assert.strictEqual(contexto.obterCapituloDaFase(99), null);

const contextoDaConclusao = {
    CONFIG: contexto.CONFIG,
    maiorFaseConcluida: 5,
    faseSelecionada: 6,
    capitulo2Desbloqueado: false,
    capitulo3Desbloqueado: false,
    salvarProgressoDasFases() {},
    atualizarPortalFaseSecreta() {},
    atualizarRelogioQuebradoDoIntervalo() {}
};
vm.createContext(contextoDaConclusao);
vm.runInContext([
    extrairFuncao("obterCapitulo"),
    extrairFuncao("obterCapituloDaFase"),
    extrairFuncao("capituloEstaConcluido"),
    extrairFuncao("capituloEstaDesbloqueado"),
    extrairFuncao("faseEstaDesbloqueada"),
    extrairFuncao("registrarConclusaoDaFase")
].join("\n"), contextoDaConclusao);
assert.strictEqual(contextoDaConclusao.registrarConclusaoDaFase(), false);
assert.strictEqual(contextoDaConclusao.maiorFaseConcluida, 6);
assert.strictEqual(contextoDaConclusao.faseEstaDesbloqueada(7), false);

assert.match(especificacao, /### Mudança: campanha organizada em capítulos/);
assert.match(especificacao, /Capítulo 1.*Fases 1 a 6/);
assert.match(especificacao, /Capítulo 2.*Fases 7 a 12/);
assert.match(especificacao, /vencer a (?:fase secreta )?Dimensão Glitch libera o Capítulo 2/i);
assert.match(especificacao, /Capítulo 3.*Fases 13 a 18/);
assert.match(especificacao, /vencer o Intervalo Perdido libera o Capítulo 3/i);
assert.match(especificacao, /não pertence a nenhum capítulo/i);

console.log("Capítulos: navegação, intervalos e bloqueios progressivos validados.");
