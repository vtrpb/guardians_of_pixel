const CHAVE_DOMINIO_TORRES = 'guardians-of-pixel-dominio-torres-v1';
for (const t of [
    ['Domínio das torres', 'Tower mastery', 'Dominio de torres'],
    ['Use cada torre para causar dano e eliminar inimigos. Torres de suporte ganham pontos ao participar das waves. O progresso vale em qualquer modo e continua entre partidas.', 'Use each tower to deal damage and defeat enemies. Support towers earn points by taking part in waves. Progress counts in any mode and carries over between matches.', 'Usa cada torre para causar daño y eliminar enemigos. Las torres de apoyo ganan puntos al participar en las oleadas. El progreso cuenta en cualquier modo y continúa entre partidas.'],
    ['Ao completar o domínio, a torre recebe um atributo especial permanente e uma skin opcional. A estrela indica o atributo ativo. Minas e bombas não participam.', 'Completing mastery grants the tower a permanent special attribute and an optional skin. The star shows that the attribute is active. Mines and bombs do not participate.', 'Al completar el dominio, la torre recibe un atributo especial permanente y una skin opcional. La estrella indica que el atributo está activo. Las minas y bombas no participan.'],
    ['Pontos de domínio: {atual}/{total}', 'Mastery points: {atual}/{total}', 'Puntos de dominio: {atual}/{total}'],
    ['Pontos da Torre padrão na última partida: {pontos}', 'Standard Tower points in the last match: {pontos}', 'Puntos de la Torre estándar en la última partida: {pontos}'],
    ['Atributo: +{percentual}% de dano', 'Attribute: +{percentual}% damage', 'Atributo: +{percentual}% de daño'],
    ['Atributo: +{percentual}% de alcance', 'Attribute: +{percentual}% range', 'Atributo: +{percentual}% de alcance'],
    ['Atributo: +{resistencia} de resistência', 'Attribute: +{resistencia} durability', 'Atributo: +{resistencia} de resistencia'],
    ['Atributo: +{percentual}% de créditos por wave', 'Attribute: +{percentual}% credits per wave', 'Atributo: +{percentual}% de créditos por oleada'],
    ['Domínio completo', 'Mastery complete', 'Dominio completo'],
    ['Domínio de {nome}', '{nome} mastery', 'Dominio de {nome}'],
    ['Skin de domínio da torre {nome}.', 'Mastery skin for the {nome} tower.', 'Skin de dominio de la torre {nome}.'],
    ['Atributo de domínio', 'Mastery attribute', 'Atributo de dominio'],
    ['Estrela do domínio', 'Mastery star', 'Estrella de dominio'],
    ['Equipar domínio', 'Equip mastery', 'Equipar dominio'],
    ['Usar visual anterior', 'Use previous appearance', 'Usar aspecto anterior'],
    ['Domínio pendente', 'Mastery pending', 'Dominio pendiente'],
    ['Domínio concluído: {nomes}', 'Mastery complete: {nomes}', 'Dominio completado: {nomes}'],
    ['Salvar domínio novamente', 'Retry saving mastery', 'Reintentar guardar dominio'],
    ['Voltar ao Álbum', 'Back to Album', 'Volver al Álbum']
]) textoCasa(...t);
let cacheDominioTexto;
let cacheDominioDados = {};
const pontosPendentesDeDominio = {};
const danoPendenteDeDominio = {};
let falhaDeGravacaoDeDominio = false;
let ultimaWaveDeSuporteRegistrada = 0;
let origemDoDominioDasTorres = 'album';
let pontosDaTorrePadraoNestaPartida = 0;
let pontosDaTorrePadraoNaUltimaPartida = null;

function obterTiposDeDominio() {
    const tipos = Object.keys(CONFIG.torre.tipos).filter(tipo => {
        const c = CONFIG.torre.tipos[tipo];
        return c.visualBase && !['mina', 'bomba'].includes(c.tipoDeItem);
    });
    const novosPremios = ['catapulta', 'torreMagnetica', 'torreMetamorfa'];
    return [...tipos.filter(tipo => !novosPremios.includes(tipo)),
        ...novosPremios.filter(tipo => tipos.includes(tipo))];
}

function obterMetaDeDominio(tipo) {
    const configuracao = CONFIG.torre.tipos[tipo];
    const c = CONFIG.dominioDasTorres;
    if (tipo === 'padrao') return c.metaDaTorrePadrao;
    if (configuracao.naoAtira) return c.pontosParaConcluir.suporte;
    if (configuracao.velocidadeAtaque <= c.cadenciaMaximaRapida) return c.pontosParaConcluir.rapida;
    if (configuracao.velocidadeAtaque <= c.cadenciaMaximaIntermediaria) return c.pontosParaConcluir.intermediaria;
    return c.pontosParaConcluir.lenta;
}

function obterAtributoDeDominio(tipo) {
    if (tipo === 'iscaBlindada') return 'resistencia';
    if (tipo === 'geradorDeCreditos') return 'creditos';
    return CONFIG.torre.tipos[tipo].naoAtira ? 'alcance' : 'dano';
}

function obterDescricaoDoAtributoDeDominio(tipo) {
    const textos = {
        dano: 'Atributo: +{percentual}% de dano',
        alcance: 'Atributo: +{percentual}% de alcance',
        resistencia: 'Atributo: +{resistencia} de resistência',
        creditos: 'Atributo: +{percentual}% de créditos por wave'
    };
    const atributo = obterAtributoDeDominio(tipo);
    const percentual = atributo === 'dano' ? CONFIG.dominioDasTorres.bonusPercentualDano
        : atributo === 'alcance' ? CONFIG.dominioDasTorres.bonusPercentualAlcance
            : CONFIG.dominioDasTorres.bonusPercentualCreditos;
    return localizar(textos[atributo], {
        percentual: Math.round(percentual * 100),
        resistencia: CONFIG.dominioDasTorres.bonusDeResistencia
    });
}

function carregarDominioDasTorres() {
    let texto = null;
    try { texto = localStorage.getItem(CHAVE_DOMINIO_TORRES); } catch {}
    if (texto === cacheDominioTexto) return cacheDominioDados;
    let dados;
    try { dados = JSON.parse(texto); } catch {}
    const normalizados = {};
    for (const tipo of obterTiposDeDominio()) {
        const meta = obterMetaDeDominio(tipo);
        const pontosSalvos = dados?.[tipo]?.pontos;
        const vitoriasAntigas = dados?.[tipo]?.vitorias;
        const pontos = Number.isInteger(pontosSalvos)
            ? Math.max(0, Math.min(meta, pontosSalvos))
            : Number.isInteger(vitoriasAntigas)
                ? Math.max(0, Math.min(meta, Math.round((tipo === 'padrao'
                    ? CONFIG.dominioDasTorres.metaAnteriorDaTorrePadrao : meta) * vitoriasAntigas / 3)))
                : 0;
        normalizados[tipo] = {pontos, equipado: pontos >= meta && dados?.[tipo]?.equipado === true};
    }
    cacheDominioTexto = texto;
    cacheDominioDados = normalizados;
    return normalizados;
}

function salvarDominioDasTorres(dados) {
    let anterior;
    try {
        anterior = localStorage.getItem(CHAVE_DOMINIO_TORRES);
        localStorage.setItem(CHAVE_DOMINIO_TORRES, JSON.stringify(dados));
        if (!atualizarSalvoAtivo()) throw Error('slot');
        cacheDominioTexto = undefined;
        return true;
    } catch {
        if (anterior !== undefined) try {
            if (anterior === null) localStorage.removeItem(CHAVE_DOMINIO_TORRES);
            else localStorage.setItem(CHAVE_DOMINIO_TORRES, anterior);
        } catch {}
        cacheDominioTexto = undefined;
        mostrarAviso(localizar('Não foi possível salvar neste navegador.'));
        return false;
    }
}

function registrarPontosDeDominio(tipo, pontos) {
    if (!Number.isInteger(pontos) || pontos <= 0 || !obterTiposDeDominio().includes(tipo)) return;
    if (carregarDominioDasTorres()[tipo].pontos >= obterMetaDeDominio(tipo)) return;
    if (tipo === 'padrao') pontosDaTorrePadraoNestaPartida += pontos;
    pontosPendentesDeDominio[tipo] = (pontosPendentesDeDominio[tipo] || 0) + pontos;
    if (!falhaDeGravacaoDeDominio && pontosPendentesDeDominio[tipo] >= CONFIG.dominioDasTorres.pontosPorGravacao) {
        salvarPontosPendentesDeDominio();
    }
}

function salvarPontosPendentesDeDominio() {
    const dados = structuredClone(carregarDominioDasTorres());
    const concluidos = [];
    for (const [tipo, pontos] of Object.entries(pontosPendentesDeDominio)) {
        if (!pontos || !dados[tipo]) continue;
        const antes = dados[tipo].pontos;
        dados[tipo].pontos = Math.min(obterMetaDeDominio(tipo), antes + pontos);
        if (antes < obterMetaDeDominio(tipo) && dados[tipo].pontos >= obterMetaDeDominio(tipo)) concluidos.push(tipo);
    }
    if (!Object.values(pontosPendentesDeDominio).some(Boolean)) return true;
    if (!salvarDominioDasTorres(dados)) { falhaDeGravacaoDeDominio = true; return false; }
    for (const tipo of Object.keys(pontosPendentesDeDominio)) pontosPendentesDeDominio[tipo] = 0;
    falhaDeGravacaoDeDominio = false;
    if (concluidos.length) {
        for (const torre of torres) if (concluidos.includes(torre.tipo)) atualizarAtributosDaTorreComBonus(torre);
        mostrarAviso(localizar('Domínio concluído: {nomes}', {
            nomes: concluidos.map(tipo => obterNomeLocalizado(CONFIG.torre.tipos[tipo])).join(', ')
        }));
    }
    return true;
}

function registrarDanoDeDominio(torre, dano, eliminou) {
    if (!jogoIniciado || !torre || !torres.includes(torre) || !obterTiposDeDominio().includes(torre.tipo)) return;
    const tipo = torre.tipo;
    const acumulado = (danoPendenteDeDominio[tipo] || 0) + Math.max(0, dano);
    const pontosPorDano = Math.floor(acumulado / CONFIG.dominioDasTorres.danoPorPonto);
    danoPendenteDeDominio[tipo] = acumulado % CONFIG.dominioDasTorres.danoPorPonto;
    registrarPontosDeDominio(tipo, pontosPorDano + (eliminou ? CONFIG.dominioDasTorres.pontosPorEliminacao : 0));
}

function iniciarPartidaDeDominio() {
    salvarPontosPendentesDeDominio();
    pontosDaTorrePadraoNestaPartida = 0;
    ultimaWaveDeSuporteRegistrada = 0;
    for (const tipo of Object.keys(danoPendenteDeDominio)) danoPendenteDeDominio[tipo] = 0;
}

function reiniciarTentativaDeDominio() { salvarPontosPendentesDeDominio(); }

function registrarSuportesNaWaveConcluida(waveConcluida) {
    if (waveConcluida <= ultimaWaveDeSuporteRegistrada || waveConcluida < 1) return;
    ultimaWaveDeSuporteRegistrada = waveConcluida;
    const tiposDeSuporte = new Set(torres.filter(torre =>
        CONFIG.torre.tipos[torre.tipo]?.naoAtira && (torre.waveDeConstrucao || 0) <= waveConcluida
    ).map(torre => torre.tipo));
    for (const tipo of tiposDeSuporte) registrarPontosDeDominio(tipo, CONFIG.dominioDasTorres.pontosPorWaveDeSuporte);
}

function registrarWaveDeDominio() {
    if (wave > 1) registrarSuportesNaWaveConcluida(wave - 1);
    salvarPontosPendentesDeDominio();
}

function concluirDominioDasTorres(contarWaveConcluida = partidaVencida) {
    pontosDaTorrePadraoNaUltimaPartida = pontosDaTorrePadraoNestaPartida;
    if (contarWaveConcluida) registrarSuportesNaWaveConcluida(wave);
    if (salvarPontosPendentesDeDominio()) {
        document.getElementById('repetir-salvar-dominio')?.remove();
        return;
    }
    if (!document.getElementById('repetir-salvar-dominio') && descricaoResultado) {
        const botao = document.createElement('button');
        botao.id = 'repetir-salvar-dominio'; botao.className = 'botao';
        botao.textContent = localizar('Salvar domínio novamente');
        botao.onclick = concluirDominioDasTorres;
        descricaoResultado.append(botao);
    }
}

function dominioFoiConcluido(tipo) {
    return Boolean(CONFIG.torre.tipos[tipo] && obterTiposDeDominio().includes(tipo)
        && (carregarDominioDasTorres()[tipo]?.pontos || 0) >= obterMetaDeDominio(tipo));
}

function dominioEstaEquipado(tipo) { return carregarDominioDasTorres()[tipo]?.equipado === true; }

function obterEstiloDeDominio(tipo, original) {
    const indice = obterTiposDeDominio().indexOf(tipo);
    const matiz = Math.round(indice * 137.508) % 360;
    return {...original, corBase: `hsl(${matiz} 42% 28%)`, corDetalhe: `hsl(${matiz} 85% 76%)`,
        dominio: {cor: `hsl(${matiz} 85% 76%)`, variante: indice % 4}};
}

function desenharInsigniaDeDominio(x, y, estilo) {
    const {cor, variante} = estilo.dominio;
    const r = estilo.raioBase || 20;
    ctx.save(); ctx.translate(Math.round(x), Math.round(y));
    ctx.fillStyle = '#282136'; ctx.fillRect(-12, r - 3, 24, 12);
    ctx.fillStyle = cor;
    // Escudo, asas, raios ou coroa pixelada, preservando a arma original.
    if (variante === 0) { ctx.fillRect(-7, r - 1, 14, 5); ctx.fillRect(-4, r + 4, 8, 3); }
    if (variante === 1) { ctx.fillRect(-10, r - 1, 7, 3); ctx.fillRect(3, r - 1, 7, 3); ctx.fillRect(-6, r + 2, 12, 3); }
    if (variante === 2) { ctx.fillRect(-5, r - 2, 10, 3); ctx.fillRect(-8, r + 1, 10, 3); ctx.fillRect(-3, r + 4, 10, 3); }
    if (variante === 3) { ctx.fillRect(-9, r + 2, 18, 4); for (const a of [-9, -2, 5]) ctx.fillRect(a, r - 3, 4, 5); }
    ctx.restore();
}

function desenharEstrelaDeDominio(x, y) {
    const linhas = ['00100', '10101', '01110', '11111', '01010'];
    ctx.save();
    ctx.fillStyle = '#fff07a';
    linhas.forEach((linha, indiceY) => {
        for (let indiceX = 0; indiceX < linha.length; indiceX++) {
            if (linha[indiceX] === '1') ctx.fillRect(Math.round(x) + indiceX * 2, Math.round(y) + indiceY * 2, 2, 2);
        }
    });
    ctx.restore();
}

function alternarDominioDaTorre(tipo) {
    if (jogoIniciado || !obterTiposDeDominio().includes(tipo)) return;
    const dados = structuredClone(carregarDominioDasTorres());
    if (!dados[tipo] || !dominioFoiConcluido(tipo)) return;
    dados[tipo].equipado = !dados[tipo].equipado;
    if (salvarDominioDasTorres(dados)) mostrarDominioDasTorres(origemDoDominioDasTorres);
}

function mostrarDominioDasTorres(origem = 'album') {
    if (jogoIniciado) return;
    origemDoDominioDasTorres = origem;
    definirTelaDoMenuAberta('dominio');
    const dados = carregarDominioDasTorres();
    const regra = 'Use cada torre para causar dano e eliminar inimigos. Torres de suporte ganham pontos ao participar das waves. O progresso vale em qualquer modo e continua entre partidas.';
    const escapar = escaparTextoDoEditor;
    conteudoMenu.innerHTML = criarCabecalhoConteudoMenu(localizar('Domínio das torres'), localizar(regra))
        + criarAbasDeSupremasEDominio('dominio')
        + `<div id="painel-supremas-dominio" role="tabpanel" aria-labelledby="aba-supremas-dominio-dominio"><p>${localizar('Ao completar o domínio, a torre recebe um atributo especial permanente e uma skin opcional. A estrela indica o atributo ativo. Minas e bombas não participam.')}</p>${origem === 'album' ? `<button class="botao" onclick="mostrarAlbum()">${localizar('Voltar ao Álbum')}</button>` : ''}<div class="dominio-grade">`
        + obterTiposDeDominio().map(tipo => `<article class="dominio-cartao"><h3>${dominioFoiConcluido(tipo) ? `<span class="estrela-dominio" aria-label="${localizar('Estrela do domínio')}">★</span> ` : ''}${escapar(obterNomeLocalizado(CONFIG.torre.tipos[tipo]))}</h3>
            <canvas width="160" height="160" data-dominio="${tipo}" aria-hidden="true"></canvas>
            <p>${localizar('Pontos de domínio: {atual}/{total}', {atual:dados[tipo].pontos,total:obterMetaDeDominio(tipo)})}</p>
            ${tipo === 'padrao' && pontosDaTorrePadraoNaUltimaPartida !== null ? `<p>${localizar('Pontos da Torre padrão na última partida: {pontos}', {pontos:pontosDaTorrePadraoNaUltimaPartida})}</p>` : ''}
            <p>${obterDescricaoDoAtributoDeDominio(tipo)}</p>
            <button class="botao" data-equipar-dominio="${tipo}" onclick="alternarDominioDaTorre('${tipo}')" aria-pressed="${dados[tipo].equipado}" ${!dominioFoiConcluido(tipo) ? 'disabled' : ''}>${localizar(!dominioFoiConcluido(tipo) ? 'Domínio pendente' : dados[tipo].equipado ? 'Usar visual anterior' : 'Equipar domínio')}</button></article>`).join('') + '</div></div>';
    for (const miniatura of conteudoMenu.querySelectorAll('[data-dominio]')) {
        const tipo = miniatura.dataset.dominio;
        copiarDesenhoParaMiniaturaDoAlbum(miniatura, tamanho => {
            ctx.save();
            ctx.translate(tamanho / 2, tamanho / 2 + 5);
            ctx.scale(.72, .72);
            desenharCorpoDaTorre(0, 0, obterEstiloDeDominio(tipo, CONFIG.torre.tipos[tipo].visualBase));
            ctx.restore();
        });
    }
}
TELAS_DO_LOBBY_EM_TELA_CHEIA.add('dominio');
