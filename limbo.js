// Exploração e arena opcionais. O combate da campanha permanece independente.
const CHAVE_JORNADA_DO_LIMBO = "guardians-of-pixel-jornada-limbo-v1";
const camadaExploracaoLimbo = document.getElementById("exploracao-limbo");
const canvasExploracaoLimbo = document.getElementById("canvas-exploracao-limbo");
const contextoExploracaoLimbo = canvasExploracaoLimbo.getContext("2d");
const teclasDoCastelo = new Set();
let jornadaDoLimbo = carregarJornadaDoLimbo();
let exploracaoDoLimboAtiva = false;
let arenaDoLimbo = null;
let dialogoDoCastelo = null;
let quadroDoCastelo = null;
let ultimoQuadroDoCastelo = 0;
let tempoVisualDoCastelo = 0;
const caminhadaDoJogador = { direcao: "baixo", tempo: 0, movendo: false };

function carregarJornadaDoLimbo() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_JORNADA_DO_LIMBO) || "null");
        if (!dados || !["castelo", "manha", "arena", "vitoria", "concluido"].includes(dados.fase)) return null;
        return {
            fase: dados.fase,
            sala: ["salao", "andar", "varanda", "real", "hospedes", "estar", "biblioteca", "galeria"].includes(dados.sala) ? dados.sala : "salao",
            x: Number.isFinite(dados.x) ? Math.max(40, Math.min(600, dados.x)) : 320,
            y: Number.isFinite(dados.y) ? Math.max(60, Math.min(355, dados.y)) : 330,
            desafio: dados.desafio === true,
            promessaDeAjuda: dados.promessaDeAjuda === true
        };
    } catch { return null; }
}

function salvarJornadaDoLimbo() {
    try { localStorage.setItem(CHAVE_JORNADA_DO_LIMBO, JSON.stringify(jornadaDoLimbo)); }
    catch { avisarNoCastelo("Não foi possível salvar neste navegador. Seu progresso será mantido apenas nesta sessão."); }
    atualizarBotaoDoCastelo();
}

function atualizarBotaoDoCastelo() {
    const botao = document.getElementById("botao-retomar-castelo");
    const indisponivel = !jornadaDoLimbo || jornadaDoLimbo.fase === "concluido";
    botao.hidden = indisponivel;
    botao.disabled = indisponivel;
}

function iniciarExploracaoDoCastelo() {
    const promessa = jornadaDoLimbo?.promessaDeAjuda === true;
    jornadaDoLimbo = { fase: "castelo", sala: "salao", x: 320, y: 330, desafio: false, promessaDeAjuda: promessa };
    salvarJornadaDoLimbo();
    abrirExploracaoDoLimbo();
    conversarNoCastelo([["???", "Entre. Não me faça esperar."],
        ["VOCÊ", "A entidade atravessa o salão e sobe as escadas para o segundo andar."]]);
}

function retomarCasteloDoLimbo() {
    if (!jornadaDoLimbo || jornadaDoLimbo.fase === "concluido" || exploracaoDoLimboAtiva) return;
    abrirExploracaoDoLimbo();
    if (jornadaDoLimbo.fase === "arena") iniciarArenaDoLimbo();
    else if (jornadaDoLimbo.fase === "vitoria") {
        // Só reconstruir o cenário; uma vitória já salva não precisa ser repetida.
        prepararEstadoDaArenaDoLimbo();
        arenaDoLimbo.wave = CONFIG.casteloDoLimbo.arena.totalDeWaves;
        arenaDoLimbo.encerrada = true;
        mostrarVitoriaDaArenaDoLimbo();
        atualizarInterfaceDoCastelo();
    }
}

function abrirExploracaoDoLimbo() {
    desbloquearConquista('silencioAbrePortas');
    registrarRotaParaConquistas('silencio');
    registrarSalaParaConquistas(jornadaDoLimbo.sala);
    if (jornadaDoLimbo.promessaDeAjuda) desbloquearConquista('promessaNoVazio');
    fecharConteudoMenu();
    ocultarCutsceneDaCarta();
    ocultarPainelDeResultado();
    if (jogoIniciado && !partidaEncerrada) definirJogoPausado(true);
    exploracaoDoLimboAtiva = true;
    selecionarTrilhaDaPartida(["arena", "vitoria"].includes(jornadaDoLimbo.fase) ? "intervaloPerdido" : "casteloDoLimbo");
    arenaDoLimbo = null;
    dialogoDoCastelo = null;
    teclasDoCastelo.clear();
    camadaExploracaoLimbo.hidden = false;
    aplicacaoJogo.inert = true;
    tempoVisualDoCastelo = 0;
    assegurarPosicaoLivreNoCastelo();
    camadaExploracaoLimbo.classList.remove("limbo-amanhecer");
    desenharCenaDaEntidadeDoLimbo("castelo");
    atualizarInterfaceDoCastelo();
    canvasExploracaoLimbo.focus();
    ultimoQuadroDoCastelo = performance.now();
    if (quadroDoCastelo === null) quadroDoCastelo = requestAnimationFrame(atualizarCasteloDoLimbo);
}

function fecharExploracaoDoLimbo() {
    exploracaoDoLimboAtiva = false;
    selecionarTrilhaDaPartida();
    teclasDoCastelo.clear();
    if (quadroDoCastelo !== null) cancelAnimationFrame(quadroDoCastelo);
    quadroDoCastelo = null;
    camadaExploracaoLimbo.hidden = true;
    aplicacaoJogo.inert = false;
    dialogoDoCastelo = null;
    arenaDoLimbo = null;
}

function sairDoCasteloParaLobby() {
    if (!exploracaoDoLimboAtiva) return;
    salvarJornadaDoLimbo();
    fecharExploracaoDoLimbo();
    voltarAoLobby();
    atualizarBotaoDoCastelo();
    document.getElementById("botao-retomar-castelo").focus();
}

function avisarNoCastelo(texto) {
    document.getElementById("limbo-aviso").textContent = localizar(texto);
}

function conversarNoCastelo(falas, aoTerminar = null) {
    teclasDoCastelo.clear();
    dialogoDoCastelo = { falas, indice: 0, aoTerminar };
    atualizarDialogoDoCastelo();
}

function atualizarDialogoDoCastelo() {
    document.getElementById("limbo-retrato-ampliado").hidden = !dialogoDoCastelo?.retrato;
    document.getElementById("limbo-dialogo").hidden = !dialogoDoCastelo;
    document.getElementById("limbo-controles-exploracao").hidden = Boolean(arenaDoLimbo || dialogoDoCastelo);
    document.getElementById("limbo-controles-arena").hidden = !arenaDoLimbo || Boolean(dialogoDoCastelo);
    if (!dialogoDoCastelo) return;
    const [nome, fala] = dialogoDoCastelo.falas[dialogoDoCastelo.indice];
    aplicarRetratoDeDialogo(document.getElementById('limbo-dialogo'), identificarFalanteDoDialogo(nome, 'castelo'));
    document.getElementById("limbo-falante").textContent = localizar(identificarFalanteDoDialogo(nome, 'castelo') === 'jogador' ? 'Você' : nome);
    document.getElementById("limbo-fala").textContent = localizar(fala);
    document.getElementById("limbo-continuar").focus();
}

function avancarDialogoDoCastelo() {
    if (!dialogoDoCastelo) return;
    if (++dialogoDoCastelo.indice < dialogoDoCastelo.falas.length) atualizarDialogoDoCastelo();
    else {
        const aoTerminar = dialogoDoCastelo.aoTerminar;
        dialogoDoCastelo = null;
        atualizarDialogoDoCastelo();
        aoTerminar?.();
        if (exploracaoDoLimboAtiva && !dialogoDoCastelo) canvasExploracaoLimbo.focus();
    }
}

function mudarSalaDoCastelo(sala, x = 320, y = 320) {
    Object.assign(jornadaDoLimbo, { sala, x, y });
    registrarSalaParaConquistas(sala);
    assegurarPosicaoLivreNoCastelo();
    teclasDoCastelo.clear();
    salvarJornadaDoLimbo();
    atualizarInterfaceDoCastelo();
}

function obterInteracoesDoCastelo() {
    const ligacoes = (LIGACOES_NOVAS_DO_CASTELO[jornadaDoLimbo.sala] || []).map(porta => ({
        ...porta, acao: () => mudarSalaDoCastelo(porta.destino, porta.chegadaX, porta.chegadaY)
    }));
    return [...obterInteracoesNarrativasDoCastelo(), ...ligacoes];
}

function obterInteracoesNarrativasDoCastelo() {
    const interacao = (x, y, nome, acao) => ({ x, y, nome, acao });
    const subir = () => mudarSalaDoCastelo("andar");
    const voltar = () => mudarSalaDoCastelo("andar", 320, 240);
    switch (jornadaDoLimbo.sala) {
        case "salao": return [
            interacao(320, 64, "Subir escadas", subir),
            interacao(548, 194, "Arsenal · falar com guardas", () => { desbloquearConquista('limitesDoVazio'); conversarNoCastelo([["GUARDAS", "Você não tem permissão para entrar aqui."]]); }),
            interacao(320, 244, "Examinar mesa", () => conversarNoCastelo([["VOCÊ", "Uma mesa comprida, preparada para convidados que nunca chegam."]])),
            interacao(320, 354, jornadaDoLimbo.fase === "manha" ? "Seguir para a arena" : "Portão do castelo", () => {
                if (jornadaDoLimbo.fase === "manha") conversarNoCastelo([["???", "Siga-me. A arena nos espera."], ["VOCÊ", "Vocês deixam o castelo. Entre as ruínas do vazio, surge um coliseu."]], iniciarArenaDoLimbo);
                else conversarNoCastelo([["VOCÊ", "A entidade está esperando no segundo andar."]]);
            })
        ];
        case "andar": return [
            interacao(320, 350, "Descer escadas", () => mudarSalaDoCastelo("salao", 320, 100)),
            interacao(70, 200, "Varanda", () => mudarSalaDoCastelo("varanda", 320, 320)),
            interacao(570, 200, "Quarto de hóspedes", () => mudarSalaDoCastelo("hospedes", 120, 300)),
            interacao(475, 70, "Quarto da entidade", () => mudarSalaDoCastelo("real", 320, 320)),
            interacao(320, 120, "Falar com ???", () => {
                if (!jornadaDoLimbo.desafio) conversarNoCastelo(CONFIG.casteloDoLimbo.desafio, () => {
                    jornadaDoLimbo.desafio = true; salvarJornadaDoLimbo(); avisarNoCastelo("Descanse no quarto de hóspedes, à direita.");
                });
                else conversarNoCastelo([["???", jornadaDoLimbo.fase === "manha" ? "Vamos. Saia pelo portão do térreo." : "Seu quarto está à direita. Amanhã nos encontraremos na arena."]]);
            })
        ];
        case "varanda": return [interacao(320, 350, "Voltar", voltar),
            interacao(320, 230, "Olhar para o vazio", () => conversarNoCastelo([["VOCÊ", "Aqui não tem nada… Afinal, aqui é o Limbo."]]))];
        case "real": return [interacao(320, 350, "Voltar", voltar),
            interacao(417, 132, "Examinar retrato", () => {
                conversarNoCastelo([["VOCÊ", "É um retrato da entidade ao lado de uma mulher coroada. Sua esposa? Não há nomes na moldura."]]);
                desbloquearConquista('assuntoFamilia');
                dialogoDoCastelo.retrato = true;
                const tela = document.getElementById("limbo-retrato-ampliado");
                const desenho = tela.getContext("2d");
                desenho.clearRect(0, 0, tela.width, tela.height);
                desenharPortaRetratoDoLimbo(desenho, 20, 0, 160, 176);
                atualizarDialogoDoCastelo();
            }),
            interacao(320, 200, "Examinar quarto real", () => conversarNoCastelo([["VOCÊ", "Uma coroa antiga repousa ao lado da cama. Este quarto parece não envelhecer."]]))];
        case "hospedes": return [interacao(120, 330, "Voltar ao corredor", voltar),
            interacao(420, 210, "Dormir", () => {
                if (!jornadaDoLimbo.desafio) conversarNoCastelo([["VOCÊ", "Antes de descansar, preciso falar com a entidade no corredor."]]);
                else if (jornadaDoLimbo.fase === "manha") conversarNoCastelo([["VOCÊ", "Já amanheceu. Preciso seguir a entidade até a arena."]]);
                else conversarNoCastelo([["VOCÊ", "Vou descansar até amanhã."]], dormirNoCastelo);
            })];
        default: return [];
    }
}

function interagirNoCastelo() {
    if (!exploracaoDoLimboAtiva || arenaDoLimbo || dialogoDoCastelo) return;
    const alvo = obterInteracoesDoCastelo().sort((a, b) => distanciaDoJogador(a) - distanciaDoJogador(b))[0];
    if (alvo && distanciaDoJogador(alvo) <= CONFIG.casteloDoLimbo.alcanceDeInteracao) alvo.acao();
    else avisarNoCastelo("Aproxime-se de uma porta, pessoa ou objeto para interagir.");
}

function distanciaDoJogador(ponto) { return Math.hypot(jornadaDoLimbo.x - ponto.x, jornadaDoLimbo.y - ponto.y); }

function dormirNoCastelo() {
    jornadaDoLimbo.fase = "manha";
    jornadaDoLimbo.x = 390;
    jornadaDoLimbo.y = 240;
    tempoVisualDoCastelo = 0;
    camadaExploracaoLimbo.classList.add("limbo-amanhecer");
    salvarJornadaDoLimbo();
    conversarNoCastelo([["NO DIA SEGUINTE", "Depois de uma noite silenciosa, a porta se abre. A entidade entra no quarto."],
        ["???", "Amanheceu. Siga-me até a arena. Quero ver do que você é capaz."]], () => avisarNoCastelo("Volte ao corredor, desça as escadas e saia pelo portão do térreo."));
}

function obterObstaculosDoCastelo() {
    const moveis = (MOBILIARIO_DO_CASTELO[jornadaDoLimbo.sala] || []).filter(m => m.solido);
    if (jornadaDoLimbo.sala === "salao") return [...moveis, { x: 540, y: 153, w: 60, h: 85 }];
    if (jornadaDoLimbo.sala === "andar") return [...moveis, { x: 302, y: 95, w: 36, h: 38 }];
    return moveis;
}

function assegurarPosicaoLivreNoCastelo() {
    if (podeAndarNoCastelo(jornadaDoLimbo.x, jornadaDoLimbo.y)) return;
    const livres = [];
    for (let y = 70; y <= 350; y += 10) for (let x = 50; x <= 590; x += 10) {
        if (podeAndarNoCastelo(x, y)) livres.push({ x, y });
    }
    livres.sort((a, b) => distanciaDoJogador(a) - distanciaDoJogador(b));
    if (livres[0]) Object.assign(jornadaDoLimbo, livres[0]);
}

function podeAndarNoCastelo(x, y) {
    const r = CONFIG.casteloDoLimbo.raioDoJogador;
    if (x < 35 + r || x > 605 - r || y < 55 + r || y > 365 - r) return false;
    if (jornadaDoLimbo.sala === "varanda" && y < 228) return false;
    return !obterObstaculosDoCastelo().some(o => x + r > o.x && x - r < o.x + o.w && y + r > o.y && y - r < o.y + o.h);
}

function atualizarMovimentoDoCastelo(dt) {
    const antesX = jornadaDoLimbo.x, antesY = jornadaDoLimbo.y;
    let dx = Number(teclasDoCastelo.has("direita")) - Number(teclasDoCastelo.has("esquerda"));
    let dy = Number(teclasDoCastelo.has("baixo")) - Number(teclasDoCastelo.has("cima"));
    const norma = Math.hypot(dx, dy) || 1;
    dx = dx / norma * CONFIG.casteloDoLimbo.velocidadeDoJogador * dt;
    dy = dy / norma * CONFIG.casteloDoLimbo.velocidadeDoJogador * dt;
    if (podeAndarNoCastelo(jornadaDoLimbo.x + dx, jornadaDoLimbo.y)) jornadaDoLimbo.x += dx;
    if (podeAndarNoCastelo(jornadaDoLimbo.x, jornadaDoLimbo.y + dy)) jornadaDoLimbo.y += dy;
    caminhadaDoJogador.movendo = jornadaDoLimbo.x !== antesX || jornadaDoLimbo.y !== antesY;
    if (caminhadaDoJogador.movendo) {
        caminhadaDoJogador.tempo += dt;
        caminhadaDoJogador.direcao = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "direita" : "esquerda") : (dy > 0 ? "baixo" : "cima");
    } else caminhadaDoJogador.tempo = 0;
    const alvo = obterInteracoesDoCastelo().find(p => distanciaDoJogador(p) <= CONFIG.casteloDoLimbo.alcanceDeInteracao);
    document.getElementById("limbo-interagir").textContent = alvo ? `${localizar(alvo.nome)} (E)` : localizar("Interagir (E)");
}

function iniciarArenaDoLimbo() {
    if (!exploracaoDoLimboAtiva || !jornadaDoLimbo.desafio || !["manha", "arena"].includes(jornadaDoLimbo.fase)) return;
    jornadaDoLimbo.fase = "arena";
    salvarJornadaDoLimbo();
    prepararEstadoDaArenaDoLimbo();
    atualizarInterfaceDoCastelo();
    avisarNoCastelo("Construa fora do caminho. Clique numa torre para selecioná-la e melhorá-la. A entidade lutará na última wave.");
}

function prepararEstadoDaArenaDoLimbo() {
    selecionarTrilhaDaPartida("intervaloPerdido");
    const c = CONFIG.casteloDoLimbo.arena;
    arenaDoLimbo = { wave: 0, creditos: c.creditosIniciais, vida: c.vidaDaBase, torres: [], inimigos: [], tiros: [], fila: [],
        cronometro: 0, emWave: false, pausada: false, encerrada: false, habilidade: c.intervaloDaHabilidade, selecionada: -1, tipo: "flecha" };
}

function iniciarWaveDaArena() {
    const a = arenaDoLimbo;
    if (!a || a.emWave || a.encerrada || a.pausada || dialogoDoCastelo) return;
    const c = CONFIG.casteloDoLimbo.arena;
    a.wave++;
    desbloquearConquista('desafiandoCoroa');
    a.emWave = true;
    a.cronometro = 0;
    a.fila = Array.from({ length: c.quantidadeBase + a.wave * c.quantidadePorWave }, () => "gladiador");
    if (a.wave === c.totalDeWaves) a.fila.push("entidade");
    avisarNoCastelo(a.wave === c.totalDeWaves ? "???: Agora, enfrente-me! Minha coroa pode selar suas torres por alguns instantes." : "Os gladiadores entraram na arena.");
    atualizarInterfaceDoCastelo();
}

function criarCombatenteDaArena(tipo) {
    const c = CONFIG.casteloDoLimbo.arena;
    const vida = tipo === "entidade" ? c.vidaDaEntidade : c.vidaBase + arenaDoLimbo.wave * c.vidaPorWave;
    return { tipo, vida, vidaMaxima: vida, x: c.caminho[0].x, y: c.caminho[0].y, trecho: 1, lento: 0 };
}

function atualizarArenaDoLimbo(dt) {
    const a = arenaDoLimbo;
    if (!a || a.pausada || a.encerrada) return;
    const c = CONFIG.casteloDoLimbo.arena;
    a.tiros = a.tiros.filter(t => (t.tempo -= dt) > 0);
    if (!a.emWave) return;
    a.cronometro -= dt;
    if (a.fila.length && a.cronometro <= 0) { a.inimigos.push(criarCombatenteDaArena(a.fila.shift())); a.cronometro = c.intervaloDeCriacao; }
    const entidade = a.inimigos.find(i => i.tipo === "entidade" && i.vida > 0);
    if (entidade && (a.habilidade -= dt) <= 0) {
        a.habilidade = c.intervaloDaHabilidade;
        const torre = a.torres.filter(t => t.bloqueio <= 0).at(-1);
        if (torre) { torre.bloqueio = c.duracaoDoBloqueio; avisarNoCastelo("A coroa selou uma torre temporariamente!"); }
        a.inimigos.push(criarCombatenteDaArena("gladiador"));
    }
    for (const torre of a.torres) {
        torre.bloqueio = Math.max(0, torre.bloqueio - dt);
        torre.recarga -= dt;
        if (torre.bloqueio > 0 || torre.recarga > 0) continue;
        const defesa = c.defesas[torre.tipo];
        const alvo = a.inimigos.find(i => i.vida > 0 && Math.hypot(i.x - torre.x, i.y - torre.y) <= defesa.alcance);
        if (!alvo) continue;
        const dano = defesa.dano * (torre.melhorada ? c.multiplicadorDaMelhoria : 1);
        for (const i of a.inimigos) {
            if (i === alvo || (defesa.explosao && Math.hypot(i.x - alvo.x, i.y - alvo.y) <= defesa.explosao)) {
                i.vida -= dano;
                if (defesa.lentidao) i.lento = defesa.duracaoDaLentidao;
            }
        }
        a.tiros.push({ x: torre.x, y: torre.y, alvoX: alvo.x, alvoY: alvo.y, tempo: .12, cor: defesa.cor });
        torre.recarga = defesa.intervalo;
    }
    for (const i of a.inimigos) {
        if (i.vida <= 0) { a.creditos += c.recompensaPorInimigo; continue; }
        i.lento = Math.max(0, i.lento - dt);
        const destino = c.caminho[i.trecho];
        const dx = destino.x - i.x, dy = destino.y - i.y, distancia = Math.hypot(dx, dy);
        const passo = (i.tipo === "entidade" ? c.velocidadeDaEntidade : c.velocidade) * (i.lento > 0 ? c.defesas.gelo.lentidao : 1) * dt;
        if (passo >= distancia) {
            i.x = destino.x; i.y = destino.y; i.trecho++;
            if (i.trecho >= c.caminho.length) { i.escapou = true; a.vida -= i.tipo === "entidade" ? c.danoDaEntidadeNaBase : c.danoNaBase; }
        } else { i.x += dx / distancia * passo; i.y += dy / distancia * passo; }
    }
    a.inimigos = a.inimigos.filter(i => i.vida > 0 && !i.escapou);
    if (a.vida <= 0) {
        a.vida = 0; a.encerrada = true;
        avisarNoCastelo("Sua defesa caiu. A promessa ainda não foi conquistada. Você pode tentar novamente.");
        atualizarInterfaceDoCastelo();
    } else if (!a.fila.length && !a.inimigos.length) {
        a.emWave = false;
        if (a.wave === c.totalDeWaves) {
            a.encerrada = true; jornadaDoLimbo.fase = "vitoria"; salvarJornadaDoLimbo(); mostrarVitoriaDaArenaDoLimbo();
        } else { a.creditos += c.recompensaPorWave; avisarNoCastelo("Wave vencida! Prepare suas defesas e inicie a próxima."); atualizarInterfaceDoCastelo(); }
    }
    atualizarResumoDaArena();
}

function distanciaDoCaminhoDaArena(x, y) {
    const pontos = CONFIG.casteloDoLimbo.arena.caminho;
    return Math.min(...pontos.slice(1).map((b, i) => {
        const a = pontos[i], dx = b.x - a.x, dy = b.y - a.y;
        const t = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / (dx * dx + dy * dy)));
        return Math.hypot(x - a.x - t * dx, y - a.y - t * dy);
    }));
}

function construirNaArena(x, y) {
    const a = arenaDoLimbo, c = CONFIG.casteloDoLimbo.arena;
    if (!a || a.encerrada || dialogoDoCastelo) return;
    const existente = a.torres.findIndex(t => Math.hypot(t.x - x, t.y - y) < 22);
    if (existente >= 0) { a.selecionada = existente; atualizarInterfaceDoCastelo(); return; }
    if (x < 22 || x > 618 || y < 30 || y > 378 || distanciaDoCaminhoDaArena(x, y) < c.distanciaDoCaminho
        || a.torres.some(t => Math.hypot(t.x - x, t.y - y) < c.distanciaEntreTorres)) { avisarNoCastelo("Escolha um espaço livre, fora do caminho e longe de outra torre."); return; }
    const defesa = c.defesas[a.tipo];
    if (a.torres.length >= c.limiteDeTorres || a.creditos < defesa.custo) { avisarNoCastelo("Créditos insuficientes ou limite de seis torres atingido."); return; }
    a.creditos -= defesa.custo;
    a.torres.push({ x, y, tipo: a.tipo, recarga: 0, bloqueio: 0, melhorada: false });
    a.selecionada = a.torres.length - 1;
    avisarNoCastelo("Defesa construída. Prepare suas torres e inicie a wave quando estiver pronto.");
    atualizarInterfaceDoCastelo();
}

function melhorarTorreDaArena() {
    const a = arenaDoLimbo, c = CONFIG.casteloDoLimbo.arena, torre = a?.torres[a.selecionada];
    if (!torre || torre.melhorada || a.encerrada || a.creditos < c.custoDeMelhoria) return;
    a.creditos -= c.custoDeMelhoria; torre.melhorada = true; atualizarInterfaceDoCastelo();
}

function mostrarVitoriaDaArenaDoLimbo() {
    desbloquearConquista('respeitoConquistado');
    if (arenaDoLimbo) arenaDoLimbo.tiros = [];
    avisarNoCastelo("Vitória! Ouça a entidade para concluir seu pedido de ajuda.");
    conversarNoCastelo(CONFIG.casteloDoLimbo.vitoria, () => {
        jornadaDoLimbo.promessaDeAjuda = true;
        desbloquearConquista('promessaNoVazio');
        jornadaDoLimbo.fase = "concluido";
        salvarJornadaDoLimbo();
        fecharExploracaoDoLimbo();
        // A recompensa da primeira vitória no Limbo já foi concedida. Não a repetir.
        faseSelecionada = CONFIG.intervaloPerdido.numeroInterno;
        partidaEncerrada = true; partidaVencida = true;
        fragmentosRecebidosNoResultado = 0;
        cenaFinalIntervaloPerdidoVista = true; salvarCenaFinalIntervaloPerdidoVista();
        mostrarCutsceneDoCapitulo3();
    });
}

function atualizarResumoDaArena() {
    const a = arenaDoLimbo;
    if (!a) return;
    document.getElementById("limbo-instrucao").textContent = localizar("Wave {wave}/{total} · Base {vida} · Créditos {creditos} · Torres {torres}/{limite}", { wave: a.wave, total: CONFIG.casteloDoLimbo.arena.totalDeWaves, vida: a.vida, creditos: a.creditos, torres: a.torres.length, limite: CONFIG.casteloDoLimbo.arena.limiteDeTorres });
    document.getElementById("limbo-melhorar").disabled = a.encerrada || !a.torres[a.selecionada] || a.torres[a.selecionada].melhorada || a.creditos < CONFIG.casteloDoLimbo.arena.custoDeMelhoria;
}

function atualizarInterfaceDoCastelo() {
    const nomes = { salao: "Salão de banquetes · Térreo", andar: "Corredor · Segundo andar", varanda: "Varanda para o vazio", real: "Quarto da entidade", hospedes: "Quarto de hóspedes", estar: "Sala de estar", biblioteca: "Biblioteca", galeria: "Galeria" };
    document.getElementById("titulo-exploracao-limbo").textContent = localizar(arenaDoLimbo ? "Arena do Limbo · ???" : nomes[jornadaDoLimbo.sala]);
    for (const [id, texto] of Object.entries({ "limbo-sair": "Salvar e voltar ao lobby", "limbo-continuar": "Continuar", "limbo-wave": "Iniciar wave", "limbo-repetir": "Tentar novamente" })) document.getElementById(id).textContent = localizar(texto);
    document.getElementById("limbo-melhorar").textContent = localizar("Melhorar ({custo})", { custo: CONFIG.casteloDoLimbo.arena.custoDeMelhoria });
    document.getElementById("limbo-instrucao").textContent = localizar("WASD ou setas para andar · E para interagir");
    document.getElementById("limbo-controles-exploracao").hidden = Boolean(arenaDoLimbo);
    document.getElementById("limbo-controles-arena").hidden = !arenaDoLimbo;
    atualizarDialogoDoCastelo();
    if (arenaDoLimbo) {
        const a = arenaDoLimbo;
        document.getElementById("limbo-wave").disabled = a.emWave || a.encerrada || a.pausada;
        document.getElementById("limbo-repetir").hidden = !a.encerrada || jornadaDoLimbo.fase !== "arena";
        document.getElementById("limbo-pausar").textContent = localizar(a.pausada ? "Continuar" : "Pausar");
        document.getElementById("limbo-defesas").replaceChildren(...Object.entries(CONFIG.casteloDoLimbo.arena.defesas).map(([tipo, defesa]) => {
            const botao = document.createElement("button");
            botao.className = "botao"; botao.type = "button"; botao.dataset.defesaArena = tipo;
            botao.textContent = `${localizar(defesa.nome)} (${defesa.custo})`;
            botao.setAttribute("aria-pressed", String(a.tipo === tipo));
            botao.onclick = () => { a.tipo = tipo; a.selecionada = -1; atualizarInterfaceDoCastelo(); };
            return botao;
        }));
        atualizarResumoDaArena();
    }
}




function atualizarCasteloDoLimbo(agora) {
    quadroDoCastelo = null;
    if (!exploracaoDoLimboAtiva) return;
    const dt = Math.min(.05, Math.max(0, (agora - ultimoQuadroDoCastelo) / 1000));
    ultimoQuadroDoCastelo = agora;
    if (!document.hidden) {
        tempoVisualDoCastelo += dt;
        if (!dialogoDoCastelo) {
            if (arenaDoLimbo) atualizarArenaDoLimbo(dt);
            else atualizarMovimentoDoCastelo(dt);
        }
    }
    if (arenaDoLimbo) desenharArenaDoLimbo(); else desenharExploracaoDoCastelo();
    if (exploracaoDoLimboAtiva) quadroDoCastelo = requestAnimationFrame(atualizarCasteloDoLimbo);
}

function controlarTeclaDoCastelo(evento) {
    if (!exploracaoDoLimboAtiva) return;
    const tecla = evento.key.toLowerCase();
    const direcao = { w: "cima", arrowup: "cima", a: "esquerda", arrowleft: "esquerda", s: "baixo", arrowdown: "baixo", d: "direita", arrowright: "direita" }[tecla];
    if (!direcao && !["e", "escape", " "].includes(tecla)) return;
    evento.preventDefault(); evento.stopImmediatePropagation();
    if (evento.type === "keyup") { if (direcao) teclasDoCastelo.delete(direcao); return; }
    if (direcao && !dialogoDoCastelo) teclasDoCastelo.add(direcao);
    if (evento.repeat) return;
    if (tecla === "e") { if (dialogoDoCastelo) avancarDialogoDoCastelo(); else interagirNoCastelo(); }
    if (tecla === "escape" && arenaDoLimbo && !dialogoDoCastelo) alternarPausaDaArena();
}

function alternarPausaDaArena() {
    if (!arenaDoLimbo || arenaDoLimbo.encerrada) return;
    arenaDoLimbo.pausada = !arenaDoLimbo.pausada; atualizarInterfaceDoCastelo();
}

document.addEventListener("keydown", controlarTeclaDoCastelo, true);
document.addEventListener("keyup", controlarTeclaDoCastelo, true);
window.addEventListener("blur", () => { teclasDoCastelo.clear(); if (arenaDoLimbo) { arenaDoLimbo.pausada = true; atualizarInterfaceDoCastelo(); } });
document.addEventListener("visibilitychange", () => { if (document.hidden) { teclasDoCastelo.clear(); if (exploracaoDoLimboAtiva) salvarJornadaDoLimbo(); } });
window.addEventListener("pagehide", () => { if (exploracaoDoLimboAtiva) salvarJornadaDoLimbo(); });
document.getElementById("limbo-sair").onclick = sairDoCasteloParaLobby;
document.getElementById("limbo-continuar").onclick = avancarDialogoDoCastelo;
document.getElementById("limbo-interagir").onclick = interagirNoCastelo;
document.getElementById("limbo-wave").onclick = iniciarWaveDaArena;
document.getElementById("limbo-melhorar").onclick = melhorarTorreDaArena;
document.getElementById("limbo-pausar").onclick = alternarPausaDaArena;
document.getElementById("limbo-repetir").onclick = iniciarArenaDoLimbo;
canvasExploracaoLimbo.addEventListener("click", evento => {
    if (!arenaDoLimbo) return;
    const r = canvasExploracaoLimbo.getBoundingClientRect();
    construirNaArena((evento.clientX - r.left) * 640 / r.width, (evento.clientY - r.top) * 400 / r.height);
});
for (const botao of document.querySelectorAll("[data-direcao-castelo]")) {
    botao.addEventListener("pointerdown", evento => { evento.preventDefault(); if (!dialogoDoCastelo) teclasDoCastelo.add(botao.dataset.direcaoCastelo); botao.setPointerCapture(evento.pointerId); });
    for (const nome of ["pointerup", "pointercancel", "lostpointercapture"]) botao.addEventListener(nome, () => teclasDoCastelo.delete(botao.dataset.direcaoCastelo));
}
atualizarBotaoDoCastelo();
