const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const codigo = fs.readFileSync("game.js", "utf8");
const estilos = fs.readFileSync("styles.css", "utf8");
const html = fs.readFileSync("index.htm", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

const inicioDaFaseSecreta = codigo.indexOf("faseSecreta: Object.freeze({");
const inicioDasFasesComuns = codigo.indexOf("fases: Object.freeze([", inicioDaFaseSecreta);
const fimDasFasesComuns = codigo.indexOf("\n    album: Object.freeze({", inicioDasFasesComuns);
const configuracaoSecreta = codigo.slice(inicioDaFaseSecreta, inicioDasFasesComuns);
const configuracaoDasFasesComuns = codigo.slice(inicioDasFasesComuns, fimDasFasesComuns);

assert.match(configuracaoSecreta, /numeroInterno: 99/);
assert.match(configuracaoSecreta, /nome: "Dimensão Glitch"/);
assert.match(configuracaoSecreta, /faseConcluidaParaAcesso: 6/);
assert.match(codigo, /limitesPorFase: Object\.freeze\(\{[^}]*99: 12/);
assert.match(configuracaoDasFasesComuns, /numero: 7,[\s\S]*?tema: "pantano"/);
assert.match(codigo, /99: Object\.freeze\(\[\s*\{ x: 0, y: 590 \}/);
assert.match(codigo, /glitch: Object\.freeze\(\{[\s\S]*?terrenoBase: "#150d22"/);

const indicePortal = html.indexOf('id="portal-fase-secreta"');
const indicePrimeiraArvore = html.indexOf("arvore-lobby-1", indicePortal);
assert.ok(indicePortal >= 0 && indicePortal < indicePrimeiraArvore);
assert.strictEqual(html.includes('id="guardiao-portal-secreto"'), false);
assert.match(html, /class="segredo-arvore-lobby"[\s\S]*?id="portal-fase-secreta"[\s\S]*?arvore-lobby-1/);
assert.match(html, /id="camada-transicao-glitch"[\s\S]*?SINAL CORROMPIDO[\s\S]*?A realidade está falhando/);
assert.match(html, /id="camada-conversa-portal"[\s\S]*?role="dialog"[\s\S]*?aria-modal="true"/);
assert.match(html, /id="camada-cutscene-capitulo-2"[\s\S]*?id="titulo-cutscene-capitulo-2"[\s\S]*?id="botao-continuar-cutscene-capitulo-2"/);
assert.match(html, /id="botao-voltar-lobby-resultado"/);
assert.match(html, /onclick="interagirComPortalSecreto\(\)"/);
assert.match(estilos, /\.segredo-arvore-lobby\s*\{[\s\S]*?z-index: 2[\s\S]*?pointer-events: none/);
assert.match(estilos, /\.portal-fase-secreta\s*\{[\s\S]*?left: 49px[\s\S]*?pointer-events: auto/);
assert.match(estilos, /\.portal-fase-secreta-descoberto/);
assert.match(estilos, /\.camada-transicao-glitch\s*\{[\s\S]*?z-index: 80/);
assert.match(estilos, /@keyframes pane-total-glitch/);
assert.match(estilos, /\.camada-conversa-portal\s*\{[\s\S]*?position: fixed[\s\S]*?align-items: flex-end[\s\S]*?overflow: hidden/);
assert.match(estilos, /\.balao-conversa-portal\s*\{[\s\S]*?width: min\(1040px[\s\S]*?min-height: 238px/);
assert.match(estilos, /\.portal-retrato-conversa\s*\{[\s\S]*?left: 28px[\s\S]*?bottom: 26px/);
assert.match(estilos, /\.senhor-tempo-cabeca\s*\{[\s\S]*?border-radius: 50%/);
assert.match(estilos, /\.senhor-tempo-corpo\s*\{[\s\S]*?height: 55%/);
assert.match(estilos, /\.senhor-tempo-forma-humana \.senhor-tempo-corpo\s*\{[\s\S]*?height: 72%/);
assert.match(estilos, /\.senhor-tempo-forma-humana \.senhor-tempo-braco-no-bolso\s*\{[\s\S]*?width: 38%[\s\S]*?height: 72%/);
assert.match(estilos, /\.senhor-tempo-forma-humana \.senhor-tempo-bolso\s*\{[\s\S]*?bottom: 10%/);
assert.match(configuracaoSecreta, /formaHumanaFutura: Object\.freeze\(\{\s*ativa: false/);
assert.match(codigo, /class="senhor-tempo-braco senhor-tempo-braco-solto"/);
assert.match(codigo, /class="senhor-tempo-braco senhor-tempo-braco-no-bolso"/);
assert.match(codigo, /class="senhor-tempo-bolso"/);
assert.match(estilos, /@keyframes girar-ponteiro-senhor-tempo/);
assert.match(estilos, /\.conversa-portal-fala/);
assert.doesNotMatch(estilos, /\.guardiao-portal-secreto/);
assert.match(estilos, /@keyframes falha-portal-secreto/);
assert.match(estilos, /\.camada-cutscene-capitulo,\s*\.camada-cutscene-carta\s*\{[\s\S]*?z-index: 90/);
assert.match(estilos, /@keyframes abrir-cadeado-capitulo/);

assert.match(codigo, /CHAVE_FASE_SECRETA_DESCOBERTA = "guardians-of-pixel-fase-secreta-v1"/);
assert.match(codigo, /CHAVE_CAPITULO_2_DESBLOQUEADO = "guardians-of-pixel-capitulo-2-desbloqueado-v1"/);
assert.match(codigo, /localStorage\.setItem\(CHAVE_FASE_SECRETA_DESCOBERTA, "true"\)/);
assert.match(codigo, /localStorage\.setItem\(CHAVE_CAPITULO_2_DESBLOQUEADO, "true"\)/);
assert.match(configuracaoSecreta, /duracaoMs: 1600/);
assert.match(configuracaoSecreta, /corredoresAmarelos: Object\.freeze\(\{/);
assert.match(configuracaoSecreta, /chanceDeAparecer: 0\.1/);
assert.match(configuracaoSecreta, /velocidadeDoJogador: 190/);
assert.match(configuracaoSecreta, /nome: "Senhor do Tempo"/);
assert.match(configuracaoSecreta, /bonusCreditosIniciais: 300/);
assert.match(codigo, /function obterDinheiroInicial\(\)[\s\S]*?faseAtualEhSecreta\(\)[\s\S]*?CONFIG\.faseSecreta\.bonusCreditosIniciais/);
assert.match(codigo, /function iniciarTransicaoDoPortalGlitch\(\)/);
assert.match(codigo, /function deveEntrarNosCorredoresAmarelos\(valorAleatorio = Math\.random\(\)\)/);
assert.match(codigo, /function concluirCorredoresAmarelos\(\)[\s\S]*?iniciarFaseSecreta\(\)/);
assert.match(codigo, /function mostrarConversaDoSenhorDoTempo\([\s\S]*?indiceDaFala = 0,[\s\S]*?tipoDaConversa/);
assert.match(configuracaoSecreta, /falasDeVitoria: Object\.freeze\(\[/);
assert.match(configuracaoSecreta, /Parabéns\. Você conseguiu\./);
assert.match(configuracaoSecreta, /Eu abri um novo caminho\. O Capítulo 2 espera por você\./);
assert.match(codigo, /function mostrarCutsceneDeDesbloqueioDoCapitulo\(numeroDoCapitulo\)[\s\S]*?capitulo2Desbloqueado = true;[\s\S]*?salvarDesbloqueioDoCapitulo2\(\)/);
assert.match(codigo, /function mostrarCutsceneDoCapitulo2\(\) \{\s*mostrarCutsceneDeDesbloqueioDoCapitulo\(2\)/);
assert.match(codigo, /function iniciarFaseSecreta\(\)[\s\S]*?faseSelecionada = CONFIG\.faseSecreta\.numeroInterno;[\s\S]*?iniciarPartida\(false\)[\s\S]*?mostrarConversaDoSenhorDoTempo\(0, "entrada"\)/);
assert.match(codigo, /botaoDesistirMenu\.disabled = saidaBloqueada/);
assert.match(codigo, /botaoVoltarLobbyResultado\.hidden = faseOculta && !vitoria/);
assert.match(codigo, /const fasesDoCapitulo = CONFIG\.fases\.filter/);
assert.doesNotMatch(configuracaoDasFasesComuns, /numero: 99/);
assert.match(codigo, /const vitoriaNaFaseSecreta = faseAtualEhSecreta\(\)[\s\S]*?const deveDesbloquearCapitulo2[\s\S]*?!capitulo2Desbloqueado/);
assert.match(codigo, /if \(vitoriaNaFaseSecreta\) \{\s*desbloquearConquista\("aindaEstaEsperando"\)/);
assert.match(codigo, /if \(partidaEraSecreta\) \{\s*faseSelecionada = 1;/);
assert.match(html, /id="camada-corredores-amarelos"[\s\S]*?id="labirinto-amarelo"[\s\S]*?data-direcao-corredores="arrowup"/);
assert.match(estilos, /\.camada-corredores-amarelos\s*\{[\s\S]*?z-index: 84/);
assert.match(especificacao, /10% de chance[\s\S]*?Corredores Amarelos/i);

for (const tipo of ["pixelCorrompido", "erroVeloz", "blocoInstavel", "bossGlitch"]) {
    assert.match(codigo, new RegExp(`${tipo}: Object\\.freeze\\(\\{`));
    assert.ok(codigo.includes(`inimigo.tipo === "${tipo}"`));
}
assert.match(codigo, /O padrão em quatro blocos foi inspirado no primeiro desenho do criador/);
assert.match(codigo, /\? \["pixelCorrompido", "erroVeloz", "blocoInstavel", "bossGlitch"\]/);

function extrairFuncao(nome) {
    const inicio = codigo.indexOf("function " + nome + "(");
    const fim = codigo.indexOf("\nfunction ", inicio + 1);
    assert.ok(inicio >= 0 && fim > inicio, "Função não encontrada: " + nome);
    return codigo.slice(inicio, fim);
}

const contexto = {
    CONFIG: {
        fases: Array.from({ length: 7 }),
        faseSecreta: {
            waves: {
                quantidadeBaseDePixelsCorrompidos: 3,
                pixelsCorrompidosPorWave: 1,
                primeiraWaveErroVeloz: 3,
                wavesPorNovoErroVeloz: 2,
                primeiraWaveBlocoInstavel: 5,
                wavesPorNovoBlocoInstavel: 4
            }
        },
        wave: { intervaloDeBoss: 5 }
    },
    Date,
    Math
};
vm.createContext(contexto);
vm.runInContext([
    "var wave = 0;",
    "var pixelsCorrompidosParaCriar = 0;",
    "var errosVelozesParaCriar = 0;",
    "var blocosInstaveisParaCriar = 0;",
    "var inimigosChefesParaCriar = 0;",
    "var inimigosParaCriar = 0;",
    "var avisoBossExpiraEm = 0;",
    "var proximoInimigoEm = 0;",
    "var proximaWaveEm = 0;",
    extrairFuncao("calcularQuantidadeDeInimigoExclusivo"),
    extrairFuncao("configurarComposicaoDaWaveSecreta")
].join("\n"), contexto);

contexto.wave = 5;
contexto.configurarComposicaoDaWaveSecreta();
assert.strictEqual(contexto.pixelsCorrompidosParaCriar, 8);
assert.strictEqual(contexto.errosVelozesParaCriar, 2);
assert.strictEqual(contexto.blocosInstaveisParaCriar, 1);
assert.strictEqual(contexto.inimigosChefesParaCriar, 1);
assert.strictEqual(contexto.inimigosParaCriar, 12);

contexto.wave = 20;
contexto.configurarComposicaoDaWaveSecreta();
assert.strictEqual(contexto.pixelsCorrompidosParaCriar, 23);
assert.strictEqual(contexto.errosVelozesParaCriar, 9);
assert.strictEqual(contexto.blocosInstaveisParaCriar, 4);
assert.strictEqual(contexto.inimigosChefesParaCriar, 1);
assert.strictEqual(contexto.inimigosParaCriar, 37);

const armazenamento = new Map();
const classesDoPortal = new Set();
const classesDoCorpo = new Set();
const classesDaConversa = new Set();
const textoDoPortal = { textContent: "?" };
const contextoDoPortal = {
    CONFIG: {
        fases: Array.from({ length: 7 }),
        faseSecreta: {
            numeroInterno: 99,
            nome: "Dimensão Glitch",
            faseConcluidaParaAcesso: 6,
            bonusCreditosIniciais: 300,
            transicaoDoPortal: { duracaoMs: 1600 },
            corredoresAmarelos: { chanceDeAparecer: 0.1 },
            senhorDoTempo: {
                nome: "Senhor do Tempo",
                formaHumanaFutura: { ativa: false },
                falas: [
                    "Era eu quem falava com você através do portal.",
                    "Meu nome é Senhor do Tempo.",
                    "Você não tem escolha.",
                    "Se quiser sair, vai ter que sair vitorioso daqui.",
                    "Supere as 20 waves e eu abrirei o caminho de volta.",
                    "Serei generoso com você. Afinal, poucas pessoas chegam até aqui. Darei 300 créditos a mais para você começar. Mas depois disso você pensa que acabou? Ainda não.",
                    "Agora lute. O tempo já começou a correr."
                ],
                falasDeVitoria: []
            }
        }
    },
    localStorage: {
        getItem(chave) { return armazenamento.get(chave) ?? null; },
        setItem(chave, valor) { armazenamento.set(chave, String(valor)); }
    },
    CHAVE_FASE_SECRETA_DESCOBERTA: "guardians-of-pixel-fase-secreta-v1",
    portalFaseSecreta: {
        classList: {
            toggle(nome, ativo) {
                if (ativo) classesDoPortal.add(nome);
                else classesDoPortal.delete(nome);
            },
            remove(nome) { classesDoPortal.delete(nome); }
        },
        querySelector() { return textoDoPortal; },
        setAttribute(nome, valor) { this[nome] = valor; },
        disabled: false,
        title: ""
    },
    conteudoMenu: { innerHTML: "" },
    camadaTransicaoGlitch: { hidden: true, offsetWidth: 0 },
    camadaConversaPortal: {
        hidden: true,
        innerHTML: "",
        dataset: {},
        classList: {
            add(nome) { classesDaConversa.add(nome); },
            remove(nome) { classesDaConversa.delete(nome); }
        },
        removeAttribute(nome) { delete this[nome]; },
        querySelector() { return { focus() {} }; }
    },
    document: {
        body: {
            classList: {
                add(nome) { classesDoCorpo.add(nome); },
                remove(nome) { classesDoCorpo.delete(nome); }
            }
        },
        documentElement: { style: { setProperty() {} } }
    },
    localizar: (texto) => texto,
    obterNomeLocalizado: (configuracao) => configuracao.nome,
    iniciouMusicaDaConversa: 0,
    tocouEfeitoDoTeleporte: 0,
    selecionarTrilhaDaConversaDoPortal() {},
    fecharConteudoMenu() {},
    atualizarIndicadorFaseSelecionada() {},
    botaoMenuPartida: { focus() {} },
    pausas: [],
    definirJogoPausado(pausar) {
        this.jogoPausado = pausar;
        this.pausas.push(pausar);
    },
    iniciouPartida: 0,
    iniciarPartida() {},
    callbackDoTeleporte: null,
    duracaoDoTeleporte: 0,
    setTimeout(callback, duracao) {
        this.callbackDoTeleporte = callback;
        this.duracaoDoTeleporte = duracao;
        return 77;
    },
    clearTimeout() {},
    jogoIniciado: false,
    jogoPausado: false,
    modoWavesInfinitas: false,
    faseSelecionada: 1,
    maiorFaseConcluida: 5,
    faseSecretaDescoberta: false,
    teleporteGlitchEmAndamento: false,
    labirintoAmareloAtivo: false,
    conversaDoSenhorDoTempoAtiva: false,
    indiceDaFalaDoSenhorDoTempo: 0,
    tipoDaConversaDoSenhorDoTempo: "entrada",
    temporizadorDoTeleporteGlitch: null
};
contextoDoPortal.Math = Object.create(Math);
contextoDoPortal.Math.random = () => 0.5;
contextoDoPortal.iniciarPartida = () => {
    contextoDoPortal.iniciouPartida++;
    contextoDoPortal.jogoIniciado = true;
};
contextoDoPortal.setTimeout = (callback, duracao) => {
    contextoDoPortal.callbackDoTeleporte = callback;
    contextoDoPortal.duracaoDoTeleporte = duracao;
    return 77;
};
contextoDoPortal.definirJogoPausado = (pausar) => {
    contextoDoPortal.jogoPausado = pausar;
    contextoDoPortal.pausas.push(pausar);
};
contextoDoPortal.selecionarTrilhaDaConversaDoPortal = () => (
    contextoDoPortal.iniciouMusicaDaConversa++
);
contextoDoPortal.tocarEfeitoTeleporteGlitch = () => (
    contextoDoPortal.tocouEfeitoDoTeleporte++
);
contextoDoPortal.faseAtualEhSecreta = () => contextoDoPortal.faseSelecionada === 99;
vm.createContext(contextoDoPortal);
vm.runInContext([
    extrairFuncao("salvarFaseSecretaDescoberta"),
    extrairFuncao("podeEntrarNaFaseSecreta"),
    extrairFuncao("atualizarPortalFaseSecreta"),
    extrairFuncao("interagirComPortalSecreto"),
    extrairFuncao("mostrarConversaSecretaBloqueada"),
    extrairFuncao("responderConversaSecretaBloqueada"),
    extrairFuncao("encerrarConversaSecretaBloqueada"),
    extrairFuncao("ocultarConversaNoPortal"),
    extrairFuncao("iniciarTransicaoDoPortalGlitch"),
    extrairFuncao("ocultarTransicaoDoPortalGlitch"),
    extrairFuncao("deveEntrarNosCorredoresAmarelos"),
    extrairFuncao("criarRetratoDoSenhorDoTempo"),
    extrairFuncao("obterFalasDaConversaDoSenhorDoTempo"),
    extrairFuncao("normalizarFalaDoSenhorDoTempo"),
    extrairFuncao("mostrarConversaDoSenhorDoTempo"),
    extrairFuncao("avancarConversaDoSenhorDoTempo"),
    extrairFuncao("encerrarConversaDoSenhorDoTempo"),
    extrairFuncao("iniciarFaseSecreta")
].join("\n"), contextoDoPortal);

assert.strictEqual(contextoDoPortal.deveEntrarNosCorredoresAmarelos(0), true);
assert.strictEqual(contextoDoPortal.deveEntrarNosCorredoresAmarelos(0.099), true);
assert.strictEqual(contextoDoPortal.deveEntrarNosCorredoresAmarelos(0.1), false);
assert.strictEqual(contextoDoPortal.deveEntrarNosCorredoresAmarelos(0.9), false);

contextoDoPortal.atualizarPortalFaseSecreta();
assert.strictEqual(contextoDoPortal.portalFaseSecreta.disabled, false);
assert.ok(classesDoPortal.has("portal-fase-secreta-bloqueado"));
contextoDoPortal.interagirComPortalSecreto();
assert.strictEqual(contextoDoPortal.camadaTransicaoGlitch.hidden, true);
assert.strictEqual(contextoDoPortal.camadaConversaPortal.hidden, false);
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, /Ainda não/);
contextoDoPortal.responderConversaSecretaBloqueada('como-assim');
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, /Volte quando você estiver pronto/);
contextoDoPortal.encerrarConversaSecretaBloqueada();
assert.strictEqual(contextoDoPortal.conversaDoPortalSecretoBloqueadoAtiva, false);
assert.strictEqual(contextoDoPortal.camadaConversaPortal.hidden, true);

contextoDoPortal.maiorFaseConcluida = 6;
contextoDoPortal.atualizarPortalFaseSecreta();
contextoDoPortal.interagirComPortalSecreto();
assert.strictEqual(contextoDoPortal.faseSecretaDescoberta, true);
assert.strictEqual(armazenamento.get("guardians-of-pixel-fase-secreta-v1"), "true");
assert.ok(classesDoPortal.has("portal-fase-secreta-descoberto"));
assert.strictEqual(textoDoPortal.textContent, "◇");
assert.strictEqual(contextoDoPortal.portalFaseSecreta.disabled, true);
assert.strictEqual(contextoDoPortal.iniciouMusicaDaConversa, 1);
assert.strictEqual(contextoDoPortal.tocouEfeitoDoTeleporte, 1);
assert.strictEqual(contextoDoPortal.camadaTransicaoGlitch.hidden, false);
assert.ok(classesDoCorpo.has("teleporte-glitch-ativo"));
assert.strictEqual(contextoDoPortal.duracaoDoTeleporte, 1600);
assert.strictEqual(contextoDoPortal.iniciouPartida, 0);

contextoDoPortal.callbackDoTeleporte();
assert.strictEqual(contextoDoPortal.faseSelecionada, 99);
assert.strictEqual(contextoDoPortal.iniciouPartida, 1);
assert.strictEqual(contextoDoPortal.camadaTransicaoGlitch.hidden, true);
assert.strictEqual(contextoDoPortal.camadaConversaPortal.hidden, false);
assert.ok(classesDaConversa.has("camada-conversa-senhor-tempo"));
assert.strictEqual(contextoDoPortal.jogoPausado, true);
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, /senhor-tempo-cabeca/);
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, /senhor-tempo-corpo/);
assert.doesNotMatch(contextoDoPortal.camadaConversaPortal.innerHTML, /senhor-tempo-forma-humana/);
assert.doesNotMatch(contextoDoPortal.camadaConversaPortal.innerHTML, /senhor-tempo-braco/);
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, />\?\?\?<\/h2>/);
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, /Era eu quem falava com você através do portal\./);

contextoDoPortal.avancarConversaDoSenhorDoTempo();
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, /Senhor do Tempo<\/h2>/);
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, /Meu nome é Senhor do Tempo\./);
for (const fala of contextoDoPortal.CONFIG.faseSecreta.senhorDoTempo.falas.slice(2)) {
    contextoDoPortal.avancarConversaDoSenhorDoTempo();
    assert.ok(contextoDoPortal.camadaConversaPortal.innerHTML.includes(fala));
}
assert.match(contextoDoPortal.camadaConversaPortal.innerHTML, /Enfrentar a Dimensão/);
contextoDoPortal.avancarConversaDoSenhorDoTempo();
assert.strictEqual(contextoDoPortal.camadaConversaPortal.hidden, true);
assert.strictEqual(contextoDoPortal.conversaDoSenhorDoTempoAtiva, false);
assert.strictEqual(contextoDoPortal.jogoPausado, false);

assert.ok(codigo.includes('"Dimensão Glitch": "Glitch Dimension"'));
assert.ok(codigo.includes('"Dimensão Glitch": "Dimensión Glitch"'));
assert.ok(codigo.includes('"Corredores Amarelos": "Yellow Corridors"'));
assert.ok(codigo.includes('"Corredores Amarelos": "Pasillos Amarillos"'));
assert.ok(codigo.includes('"Senhor do Tempo": "Lord of Time"'));
assert.ok(codigo.includes('"Senhor do Tempo": "Señor del Tiempo"'));
assert.ok(html.includes("styles.css?v=maquina-tempo-1"));
assert.ok(html.includes("game.js?v=maquina-tempo-1"));
assert.match(especificacao, /### Mudança: fase secreta Dimensão Glitch/);
assert.match(especificacao, /não aumenta a maior fase da campanha/i);
assert.match(especificacao, /cabeça é um relógio animado/i);
assert.match(especificacao, /Você não tem escolha/i);
assert.match(especificacao, /sair vitorioso daqui/i);
assert.match(especificacao, /300 créditos adicionais/i);
assert.match(especificacao, /corpo geométrico escuro com detalhes ciano e magenta/i);
assert.match(especificacao, /Forma humana do Senhor do Tempo/i);
assert.match(especificacao, /comando \*\*Desistir\*\* vira \*\*Saída bloqueada\*\*/i);
assert.match(especificacao, /Revelar Capítulo 2/);
assert.match(especificacao, /NOVO CAPÍTULO DESBLOQUEADO/);

console.log("Fase secreta: portal, Senhor do Tempo, cutscene e Capítulo 2 validados.");
