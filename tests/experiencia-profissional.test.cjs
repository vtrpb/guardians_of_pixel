const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.htm"), "utf8");
const codigo = fs.readFileSync(path.join(raiz, "game.js"), "utf8");
const desafiosDiarios = fs.readFileSync(path.join(raiz, "modulos/desafios-diarios.js"), "utf8");
const desafiosSemanais = fs.readFileSync(path.join(raiz, "modulos/desafios-semanais.js"), "utf8");
const css = fs.readFileSync(path.join(raiz, "styles.css"), "utf8");
const especificacao = fs.readFileSync(path.join(raiz, "docs", "ESPECIFICACAO.md"), "utf8");
const checkout = fs.readFileSync(path.join(raiz, "docs", "CHECKOUT_APOIADOR.md"), "utf8");

[
    'meta name="token-csrf-checkout"',
    'id="camada-confirmacao-compra-loja"',
    'id="descricao-confirmacao-compra-loja"',
    'id="botao-confirmar-compra-loja"',
    'id="botao-cancelar-compra-loja"',
    'id="regiao-notificacoes-progresso"',
    'aria-live="polite"',
    "styles.css?v=maquina-tempo-1",
    "game.js?v=maquina-tempo-1"
].forEach(trecho => assert.ok(html.includes(trecho), `Interface ausente: ${trecho}`));

[
    'const CHAVE_PREFERENCIAS = "guardians-of-pixel-preferencias-v1"',
    "function carregarPreferencias()",
    "function salvarPreferencias()",
    "function aplicarPreferenciasSalvas()",
    "function atualizarConfirmacaoDaCompraDaLoja()",
    "function confirmarCompraDaLoja()",
    "function concluirCompraDaLoja(idDoItem)",
    "function enfileirarNotificacaoDeProgresso(",
    'traduzir("notificacoes.conquistaDesbloqueada")',
    "async function iniciarCompraDoPacoteApoiador()",
    "async function sincronizarPacoteApoiadorComServidor()",
    'credentials: "same-origin"',
    'cabecalhos["X-CSRF-Token"]',
    'body: JSON.stringify({ pacote: CONFIG.pacoteApoiador.id })',
    'url.protocol !== "https:"',
    "checkout.origensPermitidas"
].forEach(trecho => assert.ok(codigo.includes(trecho), `Regra ausente: ${trecho}`));
assert.match(desafiosDiarios, /enfileirarNotificacaoDeProgresso\('missao',/);
assert.match(desafiosSemanais, /enfileirarNotificacaoDeProgresso\('missao',/);

const trechoDeAberturaDaCompra = codigo.slice(
    codigo.indexOf("function comprarItemDaLoja(idDoItem)"),
    codigo.indexOf("function concluirCompraDaLoja(idDoItem)")
);
assert.ok(!trechoDeAberturaDaCompra.includes("fragmentosPixel = novoSaldo"));

const trechoDeConclusaoDaCompra = codigo.slice(
    codigo.indexOf("function concluirCompraDaLoja(idDoItem)"),
    codigo.indexOf("function obterDetalheDoInimigoNoAlbum")
);
assert.ok(trechoDeConclusaoDaCompra.includes("podeComprarItemDaLoja(idDoItem)"));
assert.ok(trechoDeConclusaoDaCompra.includes("fragmentosPixel = novoSaldo"));

[
    ".camada-confirmacao-compra-loja",
    ".painel-confirmacao-compra-loja",
    ".regiao-notificacoes-progresso",
    ".notificacao-progresso",
    '.notificacao-progresso[data-tipo="conquista"]',
    ".pacote-apoiador-erro"
].forEach(seletor => assert.ok(css.includes(seletor), `Estilo ausente: ${seletor}`));

[
    "### Mudança: preferências de áudio e iluminação persistentes",
    "### Mudança: confirmação das compras da Loja",
    "### Mudança: avisos de missão e conquista concluídas",
    "### Validação automatizada no navegador"
].forEach(trecho => assert.ok(especificacao.includes(trecho), `Especificação ausente: ${trecho}`));

[
    "X-CSRF-Token",
    "Secure`, `HttpOnly` e `SameSite",
    "nunca aceita esses valores do navegador",
    "Verifique a assinatura do webhook",
    "idempotente"
].forEach(trecho => assert.ok(checkout.includes(trecho), `Proteção ausente: ${trecho}`));

const armazenamento = new Map([["guardians-of-pixel-preferencias-v1", JSON.stringify({
    volumeDaMusica: 2,
    ultimoVolumeAudivel: 0.42,
    musicaPausadaPeloJogador: true,
    volumeDosEfeitos: -3,
    ultimoVolumeAudivelDosEfeitos: 0.63,
    efeitosSonorosAtivos: false,
    modoNoturno: true,
    modoDeExibicao: "janela"
})]]);
const classesDoBody = new Set();
const contexto = {
    window: {},
    localStorage: {
        getItem: chave => armazenamento.get(chave) ?? null,
        setItem: (chave, valor) => armazenamento.set(chave, valor)
    },
    document: {
        body: {
            classList: {
                toggle(classe, ativa) {
                    if (ativa) classesDoBody.add(classe);
                    else classesDoBody.delete(classe);
                }
            }
        }
    }
};
vm.createContext(contexto);
const inicioDasPreferencias = codigo.indexOf("function normalizarVolumeSalvo");
const fimDasPreferencias = codigo.indexOf("function traduzir(", inicioDasPreferencias);
vm.runInContext(`
    const CHAVE_PREFERENCIAS = "guardians-of-pixel-preferencias-v1";
    const VOLUME_MUSICA_DE_FUNDO = 0.35;
    const CONFIG = { audio: { volumeInicialDosEfeitos: 0.8 } };
    let volumeDaMusica = 0.35;
    let ultimoVolumeAudivel = 0.35;
    let musicaPausadaPeloJogador = false;
    let volumeDosEfeitos = 0.8;
    let ultimoVolumeAudivelDosEfeitos = 0.8;
    let efeitosSonorosAtivos = true;
    let modoNoturno = false;
    let construcaoSeguindoCursor = false;
    let animacaoDoVermelhoAtiva = true;
    function atualizarVolumeEfetivoDaMusica() {}
    function atualizarGanhoDosEfeitos() {}
    function atualizarControleDeVolume() {}
    function atualizarControleDosEfeitos() {}
    function atualizarControleDoModoDiaNoite() {}
    ${codigo.slice(inicioDasPreferencias, fimDasPreferencias)}
    aplicarPreferenciasSalvas();
    salvarPreferencias();
`, contexto);

assert.strictEqual(vm.runInContext("volumeDaMusica", contexto), 1);
assert.strictEqual(vm.runInContext("volumeDosEfeitos", contexto), 0);
assert.strictEqual(vm.runInContext("ultimoVolumeAudivelDosEfeitos", contexto), 0.63);
assert.strictEqual(vm.runInContext("efeitosSonorosAtivos", contexto), false);
assert.strictEqual(vm.runInContext("musicaPausadaPeloJogador", contexto), true);
assert.ok(classesDoBody.has("modo-noturno"));
assert.strictEqual(JSON.parse(armazenamento.get("guardians-of-pixel-preferencias-v1")).modoDeExibicao, undefined);

console.log("Preferências, compras, notificações e checkout seguro validados.");
