const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const estilos = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf(`function ${nome}(`);
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, `Função não encontrada: ${nome}`);
    return codigo.slice(inicio, fim);
}

const armazenamento = new Map();
const notificacoes = [];
const contexto = {
    CONFIG: {
        progressaoDeNivel: {
            experienciaPorInimigo: 1,
            experienciaPorBoss: 15,
            experienciaPorFaseConcluida: 100,
            experienciaBasePorNivel: 200,
            aumentoDeExperienciaPorNivel: 100,
            recompensas: [
                { id: "skin", nivel: 2, tipo: "skin", idDoItem: "vanguarda", nome: "Skin", icone: "✦", fragmentosAlternativos: 5 },
                { id: "torre", nivel: 4, tipo: "torre", idDoItem: "raios", nome: "Raios", icone: "ϟ", fragmentosAlternativos: 10 },
                { id: "melhoria", nivel: 6, tipo: "melhoria", idDoItem: "mira", nome: "Mira", icone: "+5%", fragmentosAlternativos: 10 }
            ],
            skins: { vanguarda: { nome: "Skin" } }
        },
        missoes: { skins: {} }
    },
    CHAVE_PROGRESSAO_NIVEL: "guardians-of-pixel-progressao-nivel-v1",
    localStorage: {
        getItem(chave) {
            return armazenamento.has(chave) ? armazenamento.get(chave) : null;
        },
        setItem(chave, valor) {
            armazenamento.set(chave, String(valor));
        }
    },
    estatisticasDasConquistas: { inimigosEliminados: 50, fasesConcluidas: 3 },
    recompensasPermanentesDasMissoes: {
        skinsDesbloqueadas: [],
        skinTorrePadraoEquipada: null
    },
    comprasDaLoja: new Set(),
    fragmentosPixel: 0,
    experienciaRecebidaNaPartida: 0,
    telaDoMenuAberta: null,
    nivelJogadorMenu: null,
    experienciaJogadorMenu: null,
    barraExperienciaJogadorMenu: null,
    notificacoes,
    salvarRecompensasPermanentesDasMissoes() {},
    salvarComprasDaLoja() {},
    salvarFragmentosPixel() {},
    atualizarSaldoDeFragmentos() {},
    atualizarBotoesDeConstrucao() {},
    verificarConquistasAutomaticas() {},
    atualizarResumoDasConquistasNoMenu() {},
    mostrarNiveis() {},
    obterNomeLocalizado(item) { return item.nome; },
    localizar(texto, variaveis = {}) {
        return Object.entries(variaveis).reduce(
            (resultado, [nome, valor]) => resultado.replaceAll(`{${nome}}`, valor),
            texto
        );
    },
    traduzir(chave, variaveis = {}) {
        const textos = {
            "nivel.alcancado": "Nível alcançado",
            "nivel.rotulo": "Nível {nivel}",
            "nivel.recompensa": "Recompensa: {recompensa}",
            "nivel.semRecompensa": "Continue avançando."
        };
        return Object.entries(variaveis).reduce(
            (resultado, [nome, valor]) => resultado.replaceAll(`{${nome}}`, valor),
            textos[chave] || chave
        );
    },
    enfileirarNotificacaoDeProgresso(...dados) { notificacoes.push(dados); }
};
vm.createContext(contexto);
vm.runInContext(`
    ${extrairFuncao("criarProgressaoDeNivelVazia")}
    ${extrairFuncao("normalizarProgressaoDeNivel")}
    ${extrairFuncao("carregarProgressaoDeNivel")}
    ${extrairFuncao("salvarProgressaoDeNivel")}
    ${extrairFuncao("calcularExperienciaParaProximoNivel")}
    ${extrairFuncao("obterDadosDoNivel")}
    ${extrairFuncao("obterSkinConquistavel")}
    ${extrairFuncao("importarExperienciaDoHistorico")}
    ${extrairFuncao("concederRecompensaDeNivel")}
    ${extrairFuncao("concederRecompensasDoNivelAtual")}
    ${extrairFuncao("atualizarResumoDoNivelNoMenu")}
    ${extrairFuncao("registrarExperiencia")}
    ${extrairFuncao("registrarExperienciaDaPartida")}
    progressaoDeNivel = criarProgressaoDeNivelVazia();
`, contexto);

function dadosDoNivel(xp) {
    contexto.xpDoTeste = xp;
    return JSON.parse(JSON.stringify(
        vm.runInContext("obterDadosDoNivel(xpDoTeste)", contexto)
    ));
}

assert.deepStrictEqual(dadosDoNivel(0), {
    nivel: 1,
    experienciaNoNivel: 0,
    experienciaParaProximoNivel: 200,
    percentual: 0
});
assert.strictEqual(dadosDoNivel(199).nivel, 1);
assert.deepStrictEqual(dadosDoNivel(200), {
    nivel: 2,
    experienciaNoNivel: 0,
    experienciaParaProximoNivel: 300,
    percentual: 0
});
assert.strictEqual(dadosDoNivel(500).nivel, 3);
assert.strictEqual(dadosDoNivel(900).nivel, 4);
assert.strictEqual(dadosDoNivel(2000).nivel, 6);

assert.strictEqual(vm.runInContext("importarExperienciaDoHistorico()", contexto), 350);
assert.strictEqual(contexto.progressaoDeNivel.experienciaTotal, 350);
assert.strictEqual(vm.runInContext("importarExperienciaDoHistorico()", contexto), 0);
assert.strictEqual(contexto.progressaoDeNivel.experienciaTotal, 350);

vm.runInContext("progressaoDeNivel = criarProgressaoDeNivelVazia(); progressaoDeNivel.historicoImportado = true; registrarExperiencia(900);", contexto);
assert.strictEqual(vm.runInContext("obterDadosDoNivel().nivel", contexto), 4);
assert.ok(contexto.recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes("vanguarda"));
assert.ok(contexto.comprasDaLoja.has("raios"));
assert.deepStrictEqual(
    Array.from(contexto.progressaoDeNivel.recompensasConcedidas),
    ["skin", "torre"]
);
assert.strictEqual(notificacoes.length, 3);

vm.runInContext("registrarExperienciaDaPartida(1100)", contexto);
assert.strictEqual(vm.runInContext("obterDadosDoNivel().nivel", contexto), 6);
assert.ok(contexto.comprasDaLoja.has("mira"));
assert.strictEqual(contexto.experienciaRecebidaNaPartida, 1100);

contexto.comprasDaLoja = new Set(["raios", "mira"]);
contexto.recompensasPermanentesDasMissoes.skinsDesbloqueadas = ["vanguarda"];
contexto.fragmentosPixel = 0;
vm.runInContext("progressaoDeNivel = criarProgressaoDeNivelVazia(); progressaoDeNivel.historicoImportado = true; registrarExperiencia(2000);", contexto);
assert.strictEqual(contexto.fragmentosPixel, 25);
vm.runInContext("salvarProgressaoDeNivel()", contexto);
assert.strictEqual(
    JSON.parse(armazenamento.get(contexto.CHAVE_PROGRESSAO_NIVEL)).experienciaTotal,
    2000
);

[
    'id="progresso-nivel-lobby"',
    'id="nivel-jogador-menu"',
    'id="experiencia-jogador-menu"',
    'id="barra-experiencia-jogador-menu"',
    'onclick="mostrarNiveis()"'
].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    'const CHAVE_PROGRESSAO_NIVEL = "guardians-of-pixel-progressao-nivel-v1"',
    "progressaoDeNivel: Object.freeze({",
    "experienciaPorInimigo: 1",
    "experienciaPorBoss: 15",
    "experienciaPorFaseConcluida: 100",
    "experienciaBasePorNivel: 200",
    "aumentoDeExperienciaPorNivel: 100",
    'id: "skinVanguardaEsmeralda"',
    'idDoItem: "torreDeRaios"',
    'idDoItem: "miraCalibrada"',
    "function mostrarNiveis()",
    "function alternarSkinDeNivel(idDaSkin)",
    "registrarExperienciaDaPartida(tipoEhBoss(inimigo.tipo)",
    "CONFIG.progressaoDeNivel.experienciaPorFaseConcluida"
].forEach(trecho => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

[
    ".lobby-nivel",
    ".lobby-nivel-barra",
    ".nivel-progresso-hero",
    ".nivel-progresso-barra",
    ".nivel-recompensas-grade",
    ".nivel-recompensa-bloqueada"
].forEach(seletor => assert.ok(estilos.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: nível de experiência do defensor",
    "Cada inimigo comum eliminado concede 1 XP",
    "cada Boss concede 15 XP",
    "Concluir qualquer fase normal ou secreta concede mais 100 XP",
    "nível 2 desbloqueia a skin cosmética **Vanguarda Esmeralda**",
    "nível 4 desbloqueia permanentemente a **Torre de Raios**",
    "nível 6 desbloqueia a melhoria **Mira Calibrada**",
    "guardians-of-pixel-progressao-nivel-v1"
].forEach(trecho => assert.ok(especificacao.includes(trecho), `Especificação ausente: ${trecho}`));

console.log("Nível de experiência: XP, curva, recompensas, migração e interface validados.");
