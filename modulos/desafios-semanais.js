/* Três desafios renovados a cada semana, isolados das missões permanentes. */
const CHAVE_DESAFIOS_SEMANAIS = 'guardians-of-pixel-desafios-semanais-v2';
let DESAFIOS_SEMANAIS = Object.freeze([
    Object.freeze({ id: 'eliminar', propriedadeDoProgresso:'inimigosEliminados', icone: '✦', objetivo: CONFIG.desafiosSemanais.eliminar.objetivo, premioFragmentos: CONFIG.desafiosSemanais.eliminar.fragmentos, premioXp: CONFIG.desafiosSemanais.eliminar.experiencia,
        textos: Object.freeze({
            'pt-BR': ['Caçada da semana', 'Derrote 100 inimigos em partidas válidas.'],
            en: ['Weekly hunt', 'Defeat 100 enemies in eligible matches.'],
            es: ['Cacería semanal', 'Derrota a 100 enemigos en partidas válidas.']
        }) }),
    Object.freeze({ id: 'vencer', propriedadeDoProgresso:'fasesConcluidas', icone: '★', objetivo: CONFIG.desafiosSemanais.vencer.objetivo, premioFragmentos: CONFIG.desafiosSemanais.vencer.fragmentos, premioXp: CONFIG.desafiosSemanais.vencer.experiencia,
        textos: Object.freeze({
            'pt-BR': ['Vitória constante', 'Vença 3 partidas da campanha, Clássico ou infinito.'],
            en: ['Steady victory', 'Win 3 Campaign, Classic, or Endless matches.'],
            es: ['Victoria constante', 'Gana 3 partidas de Campaña, Clásico o Infinito.']
        }) }),
    Object.freeze({ id: 'construir', propriedadeDoProgresso:'torresConstruidas', icone: '▣', objetivo: CONFIG.desafiosSemanais.construir.objetivo, premioFragmentos: CONFIG.desafiosSemanais.construir.fragmentos, premioXp: CONFIG.desafiosSemanais.construir.experiencia,
        textos: Object.freeze({
            'pt-BR': ['Arsenal em campo', 'Construa 18 defesas em partidas válidas.'],
            en: ['Arsenal in the field', 'Build 18 defenses in eligible matches.'],
            es: ['Arsenal en el campo', 'Construye 18 defenses in eligible matches.']
        }) })
]);

// Catálogo próprio: os IDs e as metas não dependem da presença das missões permanentes.
const CANDIDATAS_DOS_DESAFIOS_ROTATIVOS = CONFIG.desafiosSemanais.candidatas;
const IDS_DOS_DESAFIOS_ROTATIVOS = Object.freeze(CANDIDATAS_DOS_DESAFIOS_ROTATIVOS.map(missao => missao.numero));
const PROPRIEDADES_DOS_DESAFIOS_ROTATIVOS = new Set(CANDIDATAS_DOS_DESAFIOS_ROTATIVOS.map(missao => missao.propriedadeDoProgresso));

function obterDesafiosRotativosDaSemana(semana = obterSemanaDoDesafio()) {
    const candidatos = [...CANDIDATAS_DOS_DESAFIOS_ROTATIVOS];
    let estado = [...semana].reduce((total,letra)=>((total * 31) + letra.charCodeAt(0)) >>> 0, 17);
    const sorteados = [];
    while (sorteados.length < 5 && candidatos.length) {
        estado = (estado * 1664525 + 1013904223) >>> 0;
        const indice = estado % candidatos.length;
        const missao = candidatos.splice(indice,1)[0];
        const objetivo = missao.propriedadeDoProgresso === 'inimigosEliminados' ? Math.min(missao.objetivo,500) : missao.propriedadeDoProgresso === 'bosses' ? Math.min(missao.objetivo,12) : missao.objetivo;
        sorteados.push(Object.freeze({id:`semanal-${missao.numero}`,propriedadeDoProgresso:missao.propriedadeDoProgresso,objetivo,premioFragmentos:12,premioXp:60,icone:'✦',textos:Object.freeze({'pt-BR':[missao.nome,missao.descricao],en:[missao.nome,missao.descricao],es:[missao.nome,missao.descricao]})}));
    }
    return Object.freeze(sorteados);
}

function obterSemanaDoDesafio(data = new Date()) {
    return typeof obterIdentificadorDaSemana === 'function'
        ? obterIdentificadorDaSemana(data)
        : `${data.getFullYear()}-S${Math.ceil((data.getDate() + 6) / 7)}`;
}

DESAFIOS_SEMANAIS = obterDesafiosRotativosDaSemana();

function criarProgressoSemanalVazio(semana = obterSemanaDoDesafio()) {
    return { versao: 2, semana, progresso: {}, resgatados: [] };
}

function carregarProgressoDosDesafiosSemanais(data = new Date()) {
    const semana = obterSemanaDoDesafio(data);
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_DESAFIOS_SEMANAIS) || 'null');
        if (!salvo || salvo.semana !== semana) return criarProgressoSemanalVazio(semana);
        const ids = new Set(DESAFIOS_SEMANAIS.map(desafio => desafio.id));
        const progresso = Object.fromEntries(Object.entries(salvo.progresso || {})
            .filter(([id, valor]) => ids.has(id) && Number.isSafeInteger(valor) && valor >= 0));
        const resgatados = Array.isArray(salvo.resgatados)
            ? [...new Set(salvo.resgatados.filter(id => ids.has(id)))] : [];
        return { versao: 2, semana, progresso, resgatados };
    } catch { return criarProgressoSemanalVazio(semana); }
}

let progressoDosDesafiosSemanais = carregarProgressoDosDesafiosSemanais();
atualizarResumoDasMissoesNoMenu();

function salvarProgressoDosDesafiosSemanais() {
    try {
        localStorage.setItem(CHAVE_DESAFIOS_SEMANAIS, JSON.stringify(progressoDosDesafiosSemanais));
        return true;
    } catch { return false; }
}

function atualizarSemanaDosDesafiosSemanais() {
    const semana = obterSemanaDoDesafio();
    if (progressoDosDesafiosSemanais.semana !== semana) {
        DESAFIOS_SEMANAIS = obterDesafiosRotativosDaSemana(semana);
        progressoDosDesafiosSemanais = criarProgressoSemanalVazio(semana);
    }
}

function textosDoDesafioSemanal(desafio) {
    return desafio.textos[document.documentElement.lang] || desafio.textos['pt-BR'];
}

function textoSemanal(textos) {
    return textos[document.documentElement.lang] || textos['pt-BR'];
}

const TEXTOS_SEMANAIS = Object.freeze({
    'pt-BR': ['DESAFIOS SEMANAIS', 'Semana {semana}', 'Renova {data} à 0h', 'Prêmios semanais: Fragmentos e XP.', 'Resgatar prêmio', 'Resgatado', '{fragmentos} Fragmentos + {xp} XP', 'Desafio concluído', 'Abra Missões para resgatar o prêmio.', 'Não foi possível salvar o prêmio. Tentar novamente'],
    en: ['WEEKLY CHALLENGES', 'Week {semana}', 'Resets {data} at midnight', 'Weekly rewards: Fragments and XP.', 'Claim reward', 'Claimed', '{fragmentos} Fragments + {xp} XP', 'Challenge complete', 'Open Missions to claim the reward.', 'Could not save the reward. Try again'],
    es: ['DESAFÍOS SEMANALES', 'Semana {semana}', 'Se renueva {data} a medianoche', 'Premios semanales: Fragmentos y XP.', 'Reclamar premio', 'Reclamado', '{fragmentos} Fragmentos + {xp} XP', 'Desafío completado', 'Abre Misiones para reclamar el premio.', 'No se pudo guardar el premio. Intentar de nuevo']
});

function interpolarSemanal(texto, valores = {}) {
    return Object.entries(valores).reduce((resultado, [nome, valor]) => resultado.replaceAll(`{${nome}}`, valor), texto);
}

function desafioSemanalConcluido(desafio) {
    return (progressoDosDesafiosSemanais.progresso[desafio.id] || 0) >= desafio.objetivo;
}

function contarPremiosSemanaisProntos() {
    atualizarSemanaDosDesafiosSemanais();
    return DESAFIOS_SEMANAIS.filter(desafio => desafioSemanalConcluido(desafio)
        && !progressoDosDesafiosSemanais.resgatados.includes(desafio.id)).length;
}

function partidaContaParaDesafiosSemanais() {
    return jogoIniciado && !mapaPersonalizadoAtivo?.modoEdicao
        && !(typeof exploracaoDoLimboAtiva !== 'undefined' && exploracaoDoLimboAtiva);
}

function registrarProgressoDesafioSemanal(id, quantidade = 1) {
    if (!Number.isSafeInteger(quantidade) || quantidade <= 0 || !partidaContaParaDesafiosSemanais()) return;
    atualizarSemanaDosDesafiosSemanais();
    const desafio = DESAFIOS_SEMANAIS.find(item => item.id === id);
    if (!desafio || desafioSemanalConcluido(desafio)) return;
    const anterior = progressoDosDesafiosSemanais.progresso[id] || 0;
    const novo = Math.min(desafio.objetivo, anterior + quantidade);
    progressoDosDesafiosSemanais.progresso[id] = novo;
    salvarProgressoDosDesafiosSemanais();
    atualizarResumoDasMissoesNoMenu();
    if (novo === desafio.objetivo) {
        const textos = TEXTOS_SEMANAIS['pt-BR'];
        const [nome] = textosDoDesafioSemanal(desafio);
        enfileirarNotificacaoDeProgresso('missao', textoSemanal(TEXTOS_SEMANAIS)[7], nome, textoSemanal(TEXTOS_SEMANAIS)[8], desafio.icone);
    }
}

function registrarProgressoSemanalPorPropriedade(propriedade, quantidade = 1, usarMaiorValor = false) {
    if (!partidaContaParaDesafiosSemanais()) return;
    for (const desafio of DESAFIOS_SEMANAIS.filter(item => item.propriedadeDoProgresso === propriedade)) {
        const atual = progressoDosDesafiosSemanais.progresso[desafio.id] || 0;
        const valor = usarMaiorValor ? Math.max(atual, quantidade) : atual + quantidade;
        registrarProgressoDesafioSemanal(desafio.id, Math.max(0, valor - atual));
    }
}

function criarCartaoDoDesafioSemanal(desafio) {
    const textos = textoSemanal(TEXTOS_SEMANAIS);
    const [nome, descricao] = textosDoDesafioSemanal(desafio);
    const progresso = Math.min(desafio.objetivo, progressoDosDesafiosSemanais.progresso[desafio.id] || 0);
    const concluido = progresso >= desafio.objetivo;
    const resgatado = progressoDosDesafiosSemanais.resgatados.includes(desafio.id);
    const premio = interpolarSemanal(textos[6], { fragmentos: desafio.premioFragmentos, xp: desafio.premioXp });
    return `<article class="desafio-semanal-cartao desafio-semanal ${concluido ? 'missao-concluida' : ''} ${resgatado ? 'missao-resgatada' : ''}">
        <span class="missao-icone" aria-hidden="true">${desafio.icone}</span><div class="missao-dados"><header class="missao-topo"><div><small>${textos[0]}</small><h3>${nome}</h3></div><span class="missao-recompensa">◇ ${premio}</span></header><p>${descricao}</p>
        <div class="missao-progresso" role="progressbar" aria-label="${nome}" aria-valuemin="0" aria-valuemax="${desafio.objetivo}" aria-valuenow="${progresso}"><span style="width:${Math.round((progresso / desafio.objetivo) * 100)}%"></span></div>
        <div class="missao-rodape"><strong>${progresso} / ${desafio.objetivo}</strong><button class="botao botao-resgatar-missao" onclick="resgatarDesafioSemanal('${desafio.id}')" ${!concluido || resgatado ? 'disabled' : ''}>${resgatado ? textos[5] : concluido ? textos[4] : `${progresso}/${desafio.objetivo}`}</button></div></div></article>`;
}

function criarSecaoDosDesafiosSemanais() {
    atualizarSemanaDosDesafiosSemanais();
    const textos = textoSemanal(TEXTOS_SEMANAIS);
    const semana = progressoDosDesafiosSemanais.semana.replace('-S', '/');
    const renovacao = typeof formatarProximaRenovacaoSemanal === 'function' ? formatarProximaRenovacaoSemanal() : '';
    return `<section id="desafios-semanais" class="desafios-semanais" aria-label="${textos[0]}"><header class="missoes-semana-cabecalho"><div><small>${textos[0]}</small><strong>${interpolarSemanal(textos[1], { semana })}</strong></div><p>${interpolarSemanal(textos[2], { data: renovacao })}<br>${textos[3]}</p></header><div class="missoes-grade">${DESAFIOS_SEMANAIS.map(criarCartaoDoDesafioSemanal).join('')}</div></section>`;
}

function adicionarDesafiosSemanaisAoMenu() {
    const cabecalho = conteudoMenu?.querySelector('.missoes-semana-cabecalho');
    const anterior = conteudoMenu?.querySelector('#desafios-semanais');
    const secao = document.createRange().createContextualFragment(criarSecaoDosDesafiosSemanais()).firstElementChild;
    if (anterior) anterior.replaceWith(secao);
    else if (cabecalho) cabecalho.before(secao);
}

function resgatarDesafioSemanal(id) {
    atualizarSemanaDosDesafiosSemanais();
    const desafio = DESAFIOS_SEMANAIS.find(item => item.id === id);
    if (!desafio || !desafioSemanalConcluido(desafio) || progressoDosDesafiosSemanais.resgatados.includes(id)) return false;
    const anterior = JSON.stringify(progressoDosDesafiosSemanais);
    const contadorAnterior = JSON.stringify(contadorDeMissoes);
    const chaves = [CHAVE_DESAFIOS_SEMANAIS, CHAVE_CONTADOR_DE_MISSOES, CHAVE_FRAGMENTOS_PIXEL, CHAVE_PROGRESSAO_NIVEL];
    const valoresAnteriores = new Map();
    try {
        for (const chave of chaves) valoresAnteriores.set(chave, localStorage.getItem(chave));
        progressoDosDesafiosSemanais.resgatados.push(id);
        adicionarResgateAoContador('semanal', progressoDosDesafiosSemanais.semana, id);
        localStorage.setItem(CHAVE_DESAFIOS_SEMANAIS, JSON.stringify(progressoDosDesafiosSemanais));
        localStorage.setItem(CHAVE_CONTADOR_DE_MISSOES, JSON.stringify(contadorDeMissoes));
        localStorage.setItem(CHAVE_FRAGMENTOS_PIXEL, String(fragmentosPixel + desafio.premioFragmentos));
        localStorage.setItem(CHAVE_PROGRESSAO_NIVEL, JSON.stringify({ ...progressaoDeNivel,
            experienciaTotal: Math.min(10000000, progressaoDeNivel.experienciaTotal + desafio.premioXp) }));
        if (!atualizarSalvoAtivo()) throw Error('salvo');
    } catch {
        progressoDosDesafiosSemanais = JSON.parse(anterior);
        contadorDeMissoes = JSON.parse(contadorAnterior);
        for (const [chave, valor] of valoresAnteriores) try {
            if (valor === null) localStorage.removeItem(chave); else localStorage.setItem(chave, valor);
        } catch {}
        alert(textoSemanal(TEXTOS_SEMANAIS)[9]);
        return false;
    }
    fragmentosPixel += desafio.premioFragmentos;
    registrarExperiencia(desafio.premioXp);
    verificarConquistasAutomaticas();
    atualizarSaldoDeFragmentos();
    atualizarResumoDasMissoesNoMenu();
    adicionarDesafiosSemanaisAoMenu();
    atualizarPainelDoContadorDeMissoes();
    return true;
}

const registrarInimigoEliminadoParaMissoesOriginal = registrarInimigoEliminadoParaMissoes;
registrarInimigoEliminadoParaMissoes = function(inimigo) {
    registrarInimigoEliminadoParaMissoesOriginal(inimigo);
};
function registrarInimigoEliminadoParaDesafioSemanal(inimigo) {
    if (!inimigo?.restauradoPeloCurador) {
        registrarProgressoSemanalPorPropriedade('inimigosEliminados');
        if (tipoEhBoss(inimigo.tipo)) registrarProgressoSemanalPorPropriedade('bosses');
    }
}
const registrarDefesaConstruidaParaConquistasOriginal = registrarDefesaConstruidaParaConquistas;
registrarDefesaConstruidaParaConquistas = function(tipo) {
    const resultado = registrarDefesaConstruidaParaConquistasOriginal(tipo);
    if (mapaPersonalizadoAtivo?.classico) registrarProgressoSemanalPorPropriedade('torresConstruidas');
    return resultado;
};
const registrarAcaoDaTorreParaMissoesOriginal = registrarAcaoDaTorreParaMissoes;
registrarAcaoDaTorreParaMissoes = function(acao) {
    registrarAcaoDaTorreParaMissoesOriginal(acao);
    if (acao === 'melhorias' && mapaPersonalizadoAtivo?.classico) registrarProgressoSemanalPorPropriedade('melhorias');
};
