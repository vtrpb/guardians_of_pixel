// Três missões por dia local, com progresso e resgate independentes dos demais catálogos.
const CHAVE_DESAFIOS_DIARIOS = 'guardians-of-pixel-desafios-diarios-v1';
const TEXTOS_DOS_DESAFIOS_DIARIOS = Object.freeze({
    'pt-BR': ['MISSÕES DIÁRIAS', 'Renovam à meia-noite do aparelho', 'Resgatar prêmio', 'Resgatado', 'Missão concluída', 'Abra Missões para resgatar o prêmio.', 'Não foi possível salvar. Tente novamente.', 'Fragmentos'],
    en: ['DAILY MISSIONS', 'Reset at midnight on your device', 'Claim reward', 'Claimed', 'Mission complete', 'Open Missions to claim the reward.', 'Could not save. Try again.', 'Fragments'],
    es: ['MISIONES DIARIAS', 'Se renuevan a medianoche en tu dispositivo', 'Reclamar premio', 'Reclamado', 'Misión completada', 'Abre Misiones para reclamar el premio.', 'No se pudo guardar. Inténtalo de nuevo.', 'Fragmentos']
});
const METAS_DOS_DESAFIOS_DIARIOS = Object.freeze({
    danoTotal: {
        'pt-BR': ['Dano acumulado', 'Cause {objetivo} de dano com defesas ao longo do dia.'],
        en: ['Damage dealt', 'Deal {objetivo} damage with defenses during the day.'],
        es: ['Daño acumulado', 'Inflige {objetivo} de daño con defensas durante el día.']
    },
    eliminacoesNaWave: {
        'pt-BR': ['Limpeza rápida', 'Elimine {objetivo} inimigos na mesma wave.'],
        en: ['Quick cleanup', 'Defeat {objetivo} enemies in the same wave.'],
        es: ['Limpieza rápida', 'Elimina {objetivo} enemigos en la misma oleada.']
    },
    danoNaWave: {
        'pt-BR': ['Pressão concentrada', 'Cause {objetivo} de dano com defesas na mesma wave.'],
        en: ['Focused pressure', 'Deal {objetivo} damage with defenses in the same wave.'],
        es: ['Presión concentrada', 'Inflige {objetivo} de daño con defensas en la misma oleada.']
    },
    construcoesComInimigos: {
        'pt-BR': ['Reforço de emergência', 'Construa {objetivo} defesa(s) enquanto houver inimigos no mapa.'],
        en: ['Emergency reinforcements', 'Build {objetivo} defense(s) while enemies are on the map.'],
        es: ['Refuerzo de emergencia', 'Construye {objetivo} defensa(s) mientras haya enemigos en el mapa.']
    },
    melhoriasComInimigos: {
        'pt-BR': ['Ajuste sob pressão', 'Melhore torres {objetivo} vez(es) enquanto houver inimigos no mapa.'],
        en: ['Upgrade under pressure', 'Upgrade towers {objetivo} time(s) while enemies are on the map.'],
        es: ['Mejora bajo presión', 'Mejora torres {objetivo} vez/veces mientras haya enemigos en el mapa.']
    },
    tiposComDanoNaPartida: {
        'pt-BR': ['Ataque combinado', 'Cause dano com {objetivo} tipos de defesa na mesma partida.'],
        en: ['Combined attack', 'Deal damage with {objetivo} defense types in one match.'],
        es: ['Ataque combinado', 'Inflige daño con {objetivo} tipos de defensa en una partida.']
    },
    prioridades: {
        'pt-BR': ['Escolha seu alvo', 'Altere a prioridade de torres {objetivo} {vezes}.'],
        en: ['Choose your target', 'Change tower targeting priority {objetivo} {vezes}.'],
        es: ['Elige tu objetivo', 'Cambia la prioridad de torres {objetivo} {vezes}.']
    },
    tiposNaPartida: {
        'pt-BR': ['Equipe variada', 'Construa {objetivo} tipos de torre na mesma partida.'],
        en: ['Varied team', 'Build {objetivo} tower types in one match.'],
        es: ['Equipo variado', 'Construye {objetivo} tipos de torre en una partida.']
    },
    eliminacoes_padrao: {
        'pt-BR': ['O básico funciona', 'Elimine {objetivo} inimigos com a Torre padrão.'],
        en: ['The basics work', 'Defeat {objetivo} enemies with the Standard Tower.'],
        es: ['Lo básico funciona', 'Elimina {objetivo} enemigos con la Torre estándar.']
    },
    feixeMaximo: {
        'pt-BR': ['Foco total', 'Alcance a sequência máxima do Feixe Contínuo.'],
        en: ['Full focus', 'Reach the Continuous Beam’s maximum streak.'],
        es: ['Concentración total', 'Alcanza la secuencia máxima del Rayo Continuo.']
    },
    eliminacoes_torreLongoAlcance: {
        'pt-BR': ['Lá de longe', 'Elimine {objetivo} inimigos com a Torre de Longo Alcance.'],
        en: ['From afar', 'Defeat {objetivo} enemies with the Long Range Tower.'],
        es: ['Desde lejos', 'Elimina {objetivo} enemigos con la Torre de Largo Alcance.']
    }
});

function diaDosDesafiosDiarios(data = new Date()) {
    return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
}

function catalogoDosDesafiosDiarios() {
    return CONFIG.desafiosDiarios.candidatas.filter(candidata =>
        METAS_DOS_DESAFIOS_DIARIOS[candidata.propriedadeDoProgresso]
        && !PROPRIEDADES_DOS_DESAFIOS_ROTATIVOS.has(candidata.propriedadeDoProgresso))
        .map(candidata => Object.freeze({ ...candidata,
            id: candidata.id || `diaria-${candidata.propriedadeDoProgresso}-${candidata.objetivo}` }));
}

const CATALOGO_DOS_DESAFIOS_DIARIOS = Object.freeze(catalogoDosDesafiosDiarios());

function desafioDiarioEstaDisponivel(desafio) {
    if (desafio.propriedadeDoProgresso === 'feixeMaximo') return maiorFaseConcluida >= 16;
    if (desafio.propriedadeDoProgresso === 'eliminacoes_torreLongoAlcance') return obterDadosDoNivel().nivel >= 12;
    return true;
}

function sortearDesafiosDoDia(dia, anteriores = []) {
    const disponiveis = CATALOGO_DOS_DESAFIOS_DIARIOS.filter(desafioDiarioEstaDisponivel);
    const semRepeticao = disponiveis.filter(desafio => !anteriores.includes(desafio.id));
    const candidatos = semRepeticao.length >= CONFIG.desafiosDiarios.quantidade ? semRepeticao : disponiveis;
    let semente = [...dia].reduce((valor, letra) => (valor * 31 + letra.charCodeAt(0)) >>> 0, 17);
    const restantes = [...candidatos];
    const escolhidos = [];
    const propriedadesEscolhidas = new Set();
    while (escolhidos.length < CONFIG.desafiosDiarios.quantidade && restantes.length) {
        semente = (semente * 1664525 + 1013904223) >>> 0;
        const desafio = restantes.splice(semente % restantes.length, 1)[0];
        if (propriedadesEscolhidas.has(desafio.propriedadeDoProgresso)) continue;
        propriedadesEscolhidas.add(desafio.propriedadeDoProgresso);
        escolhidos.push(desafio.id);
    }
    return escolhidos;
}

function criarProgressoDiarioVazio(dia = diaDosDesafiosDiarios(), anteriores = []) {
    return { versao: 1, dia, ids: sortearDesafiosDoDia(dia, anteriores), progresso: {}, resgatados: [] };
}

function carregarProgressoDosDesafiosDiarios() {
    const hoje = diaDosDesafiosDiarios();
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_DESAFIOS_DIARIOS) || 'null');
        const idsValidos = new Set(CATALOGO_DOS_DESAFIOS_DIARIOS.map(desafio => desafio.id));
        if (!salvo || typeof salvo.dia !== 'string' || salvo.dia < hoje) return criarProgressoDiarioVazio(hoje, salvo?.ids || []);
        const ids = Array.isArray(salvo.ids) ? [...new Set(salvo.ids.filter(id => idsValidos.has(id)))].slice(0, 3) : [];
        if (ids.length !== CONFIG.desafiosDiarios.quantidade) return criarProgressoDiarioVazio(hoje);
        return { versao: 1, dia: salvo.dia, ids,
            progresso: Object.fromEntries(Object.entries(salvo.progresso || {}).filter(([id, valor]) => ids.includes(id) && Number.isSafeInteger(valor) && valor >= 0)),
            resgatados: Array.isArray(salvo.resgatados) ? [...new Set(salvo.resgatados.filter(id => ids.includes(id)))] : [] };
    } catch { return criarProgressoDiarioVazio(hoje); }
}

let progressoDosDesafiosDiarios = carregarProgressoDosDesafiosDiarios();
salvarProgressoDosDesafiosDiarios();
atualizarResumoDasMissoesNoMenu();
let estatisticasDosDesafiosDiarios = null;

function reiniciarEstatisticasDosDesafiosDiarios() {
    estatisticasDosDesafiosDiarios = { wave: 0, danoNaWave: 0, danoFracionario: 0,
        eliminacoesNaWave: 0, tiposComDano: new Set() };
}

function atualizarEstatisticasDaWaveDiaria() {
    if (!estatisticasDosDesafiosDiarios) reiniciarEstatisticasDosDesafiosDiarios();
    if (estatisticasDosDesafiosDiarios.wave !== wave) {
        estatisticasDosDesafiosDiarios.wave = wave;
        estatisticasDosDesafiosDiarios.danoNaWave = 0;
        estatisticasDosDesafiosDiarios.eliminacoesNaWave = 0;
    }
    return estatisticasDosDesafiosDiarios;
}

function salvarProgressoDosDesafiosDiarios() {
    try {
        localStorage.setItem(CHAVE_DESAFIOS_DIARIOS, JSON.stringify(progressoDosDesafiosDiarios));
        return atualizarSalvoAtivo();
    } catch { return false; }
}

function atualizarDiaDosDesafiosDiarios() {
    if (diaDosDesafiosDiarios() > progressoDosDesafiosDiarios.dia) {
        const anteriores = progressoDosDesafiosDiarios.ids;
        progressoDosDesafiosDiarios = criarProgressoDiarioVazio(diaDosDesafiosDiarios(), anteriores);
        reiniciarEstatisticasDosDesafiosDiarios();
        salvarProgressoDosDesafiosDiarios();
    }
}

function desafioDiarioConcluido(desafio) {
    return (progressoDosDesafiosDiarios.progresso[desafio.id] || 0) >= desafio.objetivo;
}

function contarPremiosDiariosProntos() {
    atualizarDiaDosDesafiosDiarios();
    return progressoDosDesafiosDiarios.ids.filter(id => {
        const desafio = CATALOGO_DOS_DESAFIOS_DIARIOS.find(item => item.id === id);
        return desafio && desafioDiarioConcluido(desafio) && !progressoDosDesafiosDiarios.resgatados.includes(id);
    }).length;
}

function registrarProgressoDiarioPorPropriedade(propriedade, valor = 1, usarMaiorValor = false) {
    if (!partidaContaParaMissoes() || modoWavesInfinitas || !Number.isSafeInteger(valor) || valor <= 0) return;
    atualizarDiaDosDesafiosDiarios();
    for (const id of progressoDosDesafiosDiarios.ids) {
        const desafio = CATALOGO_DOS_DESAFIOS_DIARIOS.find(item => item.id === id);
        if (!desafio || desafio.propriedadeDoProgresso !== propriedade || desafioDiarioConcluido(desafio)) continue;
        const atual = progressoDosDesafiosDiarios.progresso[id] || 0;
        const novo = Math.min(desafio.objetivo, usarMaiorValor ? Math.max(atual, valor) : atual + valor);
        if (novo <= atual) continue;
        progressoDosDesafiosDiarios.progresso[id] = novo;
        salvarProgressoDosDesafiosDiarios();
        atualizarResumoDasMissoesNoMenu();
        if (novo === desafio.objetivo) {
            const textos = TEXTOS_DOS_DESAFIOS_DIARIOS[document.documentElement.lang] || TEXTOS_DOS_DESAFIOS_DIARIOS['pt-BR'];
            const meta = METAS_DOS_DESAFIOS_DIARIOS[desafio.propriedadeDoProgresso][document.documentElement.lang]
                || METAS_DOS_DESAFIOS_DIARIOS[desafio.propriedadeDoProgresso]['pt-BR'];
            enfileirarNotificacaoDeProgresso('missao', textos[4], meta[0], textos[5], '◆');
        }
    }
}

function criarSecaoDosDesafiosDiarios() {
    atualizarDiaDosDesafiosDiarios();
    const idioma = document.documentElement.lang;
    const textos = TEXTOS_DOS_DESAFIOS_DIARIOS[idioma] || TEXTOS_DOS_DESAFIOS_DIARIOS['pt-BR'];
    const cartoes = progressoDosDesafiosDiarios.ids.map(id => {
        const desafio = CATALOGO_DOS_DESAFIOS_DIARIOS.find(item => item.id === id);
        if (!desafio) return '';
        const progresso = Math.min(desafio.objetivo, progressoDosDesafiosDiarios.progresso[id] || 0);
        const concluido = desafioDiarioConcluido(desafio);
        const resgatado = progressoDosDesafiosDiarios.resgatados.includes(id);
        const [nome, modelo] = METAS_DOS_DESAFIOS_DIARIOS[desafio.propriedadeDoProgresso][idioma]
            || METAS_DOS_DESAFIOS_DIARIOS[desafio.propriedadeDoProgresso]['pt-BR'];
        const quantidade = desafio.objetivo;
        const plural = idioma === 'en' ? (quantidade === 1 ? 'time' : 'times')
            : idioma === 'es' ? (quantidade === 1 ? 'vez' : 'veces')
                : (quantidade === 1 ? 'vez' : 'vezes');
        const descricao = modelo.replace('{objetivo}', quantidade).replace('{vezes}', plural)
            .replace('defesa(s)', quantidade === 1 ? 'defesa' : 'defesas')
            .replace('defense(s)', quantidade === 1 ? 'defense' : 'defenses')
            .replace('defensa(s)', quantidade === 1 ? 'defensa' : 'defensas')
            .replace('vez(es)', plural).replace('time(s)', plural).replace('vez/veces', plural);
        return `<article class="missao-cartao desafio-diario-cartao ${concluido ? 'missao-concluida' : ''} ${resgatado ? 'missao-resgatada' : ''}">
            <span class="missao-icone" aria-hidden="true">◆</span><div class="missao-dados"><header class="missao-topo"><div><small>${textos[0]}</small><h3>${nome} · ${desafio.objetivo}</h3></div>
            <span class="missao-recompensa">◇ ${CONFIG.desafiosDiarios.fragmentos} ${textos[7]} + ${CONFIG.desafiosDiarios.experiencia} XP</span></header><p>${descricao}</p>
            <div class="missao-progresso" role="progressbar" aria-label="${nome}" aria-valuemin="0" aria-valuemax="${desafio.objetivo}" aria-valuenow="${progresso}"><span style="width:${Math.round(progresso / desafio.objetivo * 100)}%"></span></div>
            <div class="missao-rodape"><strong>${progresso} / ${desafio.objetivo}</strong><button class="botao botao-resgatar-missao" onclick="resgatarDesafioDiario('${id}')" ${!concluido || resgatado ? 'disabled' : ''}>${resgatado ? textos[3] : concluido ? textos[2] : `${progresso}/${desafio.objetivo}`}</button></div></div></article>`;
    }).join('');
    return `<section id="desafios-diarios" class="desafios-diarios" aria-label="${textos[0]}"><header class="missoes-semana-cabecalho"><div><small>${textos[0]}</small><strong>${progressoDosDesafiosDiarios.dia}</strong></div><p>${textos[1]}</p></header><div class="missoes-grade">${cartoes}</div></section>`;
}

function resgatarDesafioDiario(id) {
    atualizarDiaDosDesafiosDiarios();
    const desafio = CATALOGO_DOS_DESAFIOS_DIARIOS.find(item => item.id === id);
    if (!desafio || !progressoDosDesafiosDiarios.ids.includes(id) || !desafioDiarioConcluido(desafio) || progressoDosDesafiosDiarios.resgatados.includes(id)) return false;
    const anterior = JSON.stringify(progressoDosDesafiosDiarios);
    const chaves = [CHAVE_DESAFIOS_DIARIOS, CHAVE_FRAGMENTOS_PIXEL, CHAVE_PROGRESSAO_NIVEL, CHAVE_CONTADOR_DE_MISSOES];
    const valoresAnteriores = new Map();
    const contadorAnterior = JSON.stringify(contadorDeMissoes);
    const premio = CONFIG.desafiosDiarios;
    try {
        for (const chave of chaves) valoresAnteriores.set(chave, localStorage.getItem(chave));
        progressoDosDesafiosDiarios.resgatados.push(id);
        adicionarResgateAoContador('diaria', progressoDosDesafiosDiarios.dia, id);
        localStorage.setItem(CHAVE_DESAFIOS_DIARIOS, JSON.stringify(progressoDosDesafiosDiarios));
        localStorage.setItem(CHAVE_CONTADOR_DE_MISSOES, JSON.stringify(contadorDeMissoes));
        localStorage.setItem(CHAVE_FRAGMENTOS_PIXEL, String(fragmentosPixel + premio.fragmentos));
        localStorage.setItem(CHAVE_PROGRESSAO_NIVEL, JSON.stringify({ ...progressaoDeNivel,
            experienciaTotal: Math.min(10000000, progressaoDeNivel.experienciaTotal + premio.experiencia) }));
        if (!atualizarSalvoAtivo()) throw Error('salvo');
    } catch {
        progressoDosDesafiosDiarios = JSON.parse(anterior);
        contadorDeMissoes = JSON.parse(contadorAnterior);
        for (const [chave, valor] of valoresAnteriores) try {
            if (valor === null) localStorage.removeItem(chave); else localStorage.setItem(chave, valor);
        } catch {}
        alert((TEXTOS_DOS_DESAFIOS_DIARIOS[document.documentElement.lang] || TEXTOS_DOS_DESAFIOS_DIARIOS['pt-BR'])[6]);
        return false;
    }
    fragmentosPixel += premio.fragmentos;
    registrarExperiencia(premio.experiencia);
    verificarConquistasAutomaticas();
    atualizarSaldoDeFragmentos();
    mostrarMissoes();
    return true;
}

function partidaContaParaDesafiosDiarios() {
    return partidaContaParaMissoes() && !modoWavesInfinitas && !partidaEncerrada;
}

const registrarDanoNaBatalhaOriginalParaDiarias = registrarDanoNaBatalha;
registrarDanoNaBatalha = function(tipo, dano, derrotado) {
    registrarDanoNaBatalhaOriginalParaDiarias(tipo, dano, derrotado);
    if (!partidaContaParaDesafiosDiarios() || !CONFIG.torre.tipos[tipo] || !Number.isFinite(dano) || dano <= 0) return;
    atualizarDiaDosDesafiosDiarios();
    const estatisticas = atualizarEstatisticasDaWaveDiaria();
    estatisticas.danoFracionario += dano;
    const danoInteiro = Math.floor(estatisticas.danoFracionario);
    estatisticas.danoFracionario -= danoInteiro;
    if (danoInteiro > 0) registrarProgressoDiarioPorPropriedade('danoTotal', danoInteiro);
    if (wave > 0) {
        estatisticas.danoNaWave += dano;
        registrarProgressoDiarioPorPropriedade('danoNaWave', Math.floor(estatisticas.danoNaWave), true);
    }
    estatisticas.tiposComDano.add(tipo);
    registrarProgressoDiarioPorPropriedade('tiposComDanoNaPartida', estatisticas.tiposComDano.size, true);
};

const registrarInimigoEliminadoOriginalParaDiarias = registrarInimigoEliminadoParaMissoes;
registrarInimigoEliminadoParaMissoes = function(inimigo) {
    registrarInimigoEliminadoOriginalParaDiarias(inimigo);
    if (!partidaContaParaDesafiosDiarios() || wave <= 0) return;
    atualizarDiaDosDesafiosDiarios();
    const estatisticas = atualizarEstatisticasDaWaveDiaria();
    estatisticas.eliminacoesNaWave++;
    registrarProgressoDiarioPorPropriedade('eliminacoesNaWave', estatisticas.eliminacoesNaWave, true);
};

const registrarConstrucaoOriginalParaDiarias = registrarConstrucaoParaMissoes;
registrarConstrucaoParaMissoes = function(tipo) {
    registrarConstrucaoOriginalParaDiarias(tipo);
    if (partidaContaParaDesafiosDiarios() && inimigos.length > 0)
        registrarProgressoDiarioPorPropriedade('construcoesComInimigos', 1);
};

const registrarAcaoDaTorreOriginalParaDiarias = registrarAcaoDaTorreParaMissoes;
registrarAcaoDaTorreParaMissoes = function(acao) {
    registrarAcaoDaTorreOriginalParaDiarias(acao);
    if (acao === 'melhorias' && partidaContaParaDesafiosDiarios() && inimigos.length > 0)
        registrarProgressoDiarioPorPropriedade('melhoriasComInimigos', 1);
};

reconciliarContadorComMissoesAtuais();
