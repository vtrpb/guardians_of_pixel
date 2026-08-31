const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(
    path.join(raiz, "docs", "ESPECIFICACAO.md"),
    "utf8"
);

[
    'data-i18n="configuracoes.titulo"',
    'data-i18n="configuracoes.idioma"',
    'data-i18n-aria-label="configuracoes.escolherIdioma"',
    'data-idioma="pt-BR"',
    'data-idioma="en"',
    'data-idioma="es"',
    "Português",
    "English",
    "Español",
    "styles.css?v=maquina-tempo-1",
    "game.js?v=maquina-tempo-1"
].forEach((trecho) => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    'const CHAVE_IDIOMA = "guardians-of-pixel-idioma-v1"',
    'const IDIOMAS_SUPORTADOS = Object.freeze(["pt-BR", "en", "es"])',
    '"configuracoes.titulo": "Configurações"',
    '"configuracoes.titulo": "Settings"',
    '"configuracoes.titulo": "Configuración"',
    "function carregarIdioma()",
    "function salvarIdioma()",
    "function traduzir(chave, variaveis = {})",
    "function localizar(textoEmPortugues, variaveis = {})",
    "function obterNomeLocalizado(configuracao)",
    "function atualizarControleDeIdioma()",
    "function aplicarIdiomaNaInterface()",
    "function atualizarConteudoMenuAberto()",
    "function selecionarIdioma(novoIdioma)",
    "document.documentElement.lang = idiomaAtual",
    'localStorage.setItem(CHAVE_IDIOMA, idiomaAtual)',
    'return "pt-BR"',
    'traduzir("lobby.faseWave"',
    'traduzir("lobby.conquistasDesbloqueadas"',
    'definirTelaDoMenuAberta("loja")',
    'definirTelaDoMenuAberta("album")',
    'definirTelaDoMenuAberta("tutorial")',
    "atualizarConteudoMenuAberto();",
    'obterNomeLocalizado(configuracao)',
    'localizar(configuracao.descricao)'
].forEach((trecho) => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));

[
    ".configuracoes-grupo-idioma",
    ".seletor-idiomas",
    ".botao-idioma",
    ".botao-idioma-ativo"
].forEach((seletor) => assert.ok(css.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: seletor de idioma",
    "**Português**, **English** e **Español**",
    "guardians-of-pixel-idioma-v1",
    "O atributo `lang` do documento acompanha `pt-BR`, `en` ou `es`"
].forEach((trecho) => assert.ok(
    especificacao.includes(trecho),
    `Especificação ausente: ${trecho}`
));

const criarBotaoDeIdioma = (idioma) => ({
    dataset: { idioma },
    classes: new Set(),
    atributos: {},
    classList: {
        toggle(nome, ativo) {
            const alvo = this.alvo;
            if (ativo) alvo.classes.add(nome);
            else alvo.classes.delete(nome);
        },
        alvo: null
    },
    setAttribute(nome, valor) {
        this.atributos[nome] = valor;
    }
});
const botoesDeIdiomaDoTeste = ["pt-BR", "en", "es"].map(criarBotaoDeIdioma);
botoesDeIdiomaDoTeste.forEach((botao) => { botao.classList.alvo = botao; });
const textoTraduzido = {
    dataset: { i18n: "configuracoes.titulo" },
    textContent: ""
};
const rotuloTraduzido = {
    dataset: { i18nAriaLabel: "configuracoes.escolherIdioma" },
    atributos: {},
    setAttribute(nome, valor) {
        this.atributos[nome] = valor;
    }
};
const armazenamento = new Map([["guardians-of-pixel-idioma-v1", "es"]]);
const contexto = {
    botoesDeIdiomaDoTeste,
    localStorage: {
        getItem: (chave) => armazenamento.get(chave) ?? null,
        setItem: (chave, valor) => armazenamento.set(chave, valor)
    },
    document: {
        documentElement: { lang: "pt-BR" },
        querySelectorAll(seletor) {
            if (seletor === "[data-i18n]") return [textoTraduzido];
            if (seletor === "[data-i18n-aria-label]") return [rotuloTraduzido];
            return [];
        }
    },
    atualizarBotoesDaMusica() {},
    atualizarControleDosEfeitos() {},
    atualizarControleDoModoDiaNoite() {},
    atualizarIndicadorFaseSelecionada() {},
    atualizarPortalFaseSecreta() {},
    atualizarResumoDasMissoesNoMenu() {},
    atualizarResumoDasConquistasNoMenu() {},
    atualizarIdentidadeDoApoiador() {},
    atualizarBotoesDeConstrucao() {},
    atualizarBotoesDaTorre() {},
    atualizarPainelDeBoosts() {},
    atualizarConteudoMenuAberto() {},
    atualizarConfirmacaoDaCompraDaLoja() {},
    camadaConfirmacaoCompraLoja: { hidden: true },
    atualizarPassoDoTutorial() {},
    tutorialAtivo: false
};
vm.createContext(contexto);

const inicioDasConstantes = codigo.indexOf("const CHAVE_IDIOMA");
const fimDasConstantes = codigo.indexOf("let musicaPausadaPeloJogador", inicioDasConstantes);
const inicioDasFuncoes = codigo.indexOf("function carregarIdioma()");
const fimDasFuncoes = codigo.indexOf(
    "function atualizarVolumeEfetivoDaMusica()",
    inicioDasFuncoes
);
const codigoExecutavel = `
    const botoesDeIdioma = botoesDeIdiomaDoTeste;
    ${codigo.slice(inicioDasConstantes, fimDasConstantes)}
    ${codigo.slice(inicioDasFuncoes, fimDasFuncoes)}
`;
vm.runInContext(codigoExecutavel, contexto);
vm.runInContext("aplicarIdiomaNaInterface()", contexto);

assert.strictEqual(contexto.document.documentElement.lang, "es");
assert.strictEqual(textoTraduzido.textContent, "Configuración");
assert.strictEqual(rotuloTraduzido.atributos["aria-label"], "Elegir idioma");
assert.ok(botoesDeIdiomaDoTeste[2].classes.has("botao-idioma-ativo"));
assert.strictEqual(botoesDeIdiomaDoTeste[2].atributos["aria-pressed"], "true");
assert.strictEqual(
    vm.runInContext('localizar("Torre padrão")', contexto),
    "Torre estándar"
);
assert.strictEqual(vm.runInContext('localizar("Como jogar")', contexto), "Cómo jugar");

vm.runInContext('selecionarIdioma("en")', contexto);
assert.strictEqual(armazenamento.get("guardians-of-pixel-idioma-v1"), "en");
assert.strictEqual(contexto.document.documentElement.lang, "en");
assert.strictEqual(textoTraduzido.textContent, "Settings");
assert.ok(botoesDeIdiomaDoTeste[1].classes.has("botao-idioma-ativo"));
assert.ok(!botoesDeIdiomaDoTeste[2].classes.has("botao-idioma-ativo"));
assert.strictEqual(vm.runInContext('localizar("Loja")', contexto), "Shop");
assert.strictEqual(
    vm.runInContext('localizar("Torre padrão")', contexto),
    "Standard Tower"
);
assert.strictEqual(
    vm.runInContext(
        'localizar("Aprimoramentos permanentes para fortalecer sua defesa.")',
        contexto
    ),
    "Permanent upgrades that strengthen your defense."
);

const traducoesCompletas = vm.runInContext("TEXTOS_LOCALIZADOS", contexto);
const traducoesPrincipais = vm.runInContext("TRADUCOES", contexto);
const textosLiteraisLocalizados = [...codigo.matchAll(/localizar\(\s*"([^"\n]+)"/g)]
    .map((correspondencia) => correspondencia[1]);
const textosEstaticosLocalizados = [...html.matchAll(/data-localizar="([^"]+)"/g)]
    .map((correspondencia) => correspondencia[1]);
const rotulosEstaticosLocalizados = [
    ...html.matchAll(/data-localizar-aria-label="([^"]+)"/g)
].map((correspondencia) => correspondencia[1]);
const titulosEstaticosLocalizados = [
    ...html.matchAll(/data-localizar-title="([^"]+)"/g)
].map((correspondencia) => correspondencia[1]);
const conteudosDoConfig = [
    ...codigo.matchAll(/\b(?:nome|descricao|detalhe|mensagemVazia|rotulo): "([^"]*)"/g)
].map((correspondencia) => correspondencia[1]).filter(Boolean);
const textosPrincipaisEmPortugues = new Set(
    Object.values(traducoesPrincipais["pt-BR"])
);

for (const textoEmPortugues of [
    ...textosLiteraisLocalizados,
    ...textosEstaticosLocalizados,
    ...rotulosEstaticosLocalizados,
    ...titulosEstaticosLocalizados,
    ...conteudosDoConfig
]) {
    if (textosPrincipaisEmPortugues.has(textoEmPortugues)) {
        continue;
    }

    assert.ok(
        Object.hasOwn(traducoesCompletas.en, textoEmPortugues),
        `Tradução inglesa ausente: ${textoEmPortugues}`
    );
    assert.ok(
        Object.hasOwn(traducoesCompletas.es, textoEmPortugues),
        `Tradução espanhola ausente: ${textoEmPortugues}`
    );
}

vm.runInContext('selecionarIdioma("de")', contexto);
assert.strictEqual(contexto.document.documentElement.lang, "en");
assert.strictEqual(armazenamento.get("guardians-of-pixel-idioma-v1"), "en");

console.log("Seletor de idioma: interface, traduções e persistência validadas.");
