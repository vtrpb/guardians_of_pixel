// Os documentos reutilizam as fontes narrativas; o save guarda somente IDs conhecidos.
const CHAVE_ENCICLOPEDIA = 'guardians-of-pixel-enciclopedia-v1';
const TEXTOS_ENCICLOPEDIA = [
    ['Enciclopédia', 'Encyclopedia', 'Enciclopedia'],
    ['Registros da sua jornada', 'Records of your journey', 'Registros de tu aventura'],
    ['Cartas, documentos e transmissões encontrados ficam guardados aqui, mesmo ao reiniciar a história.', 'Letters, documents and transmissions you find stay here, even when restarting the story.', 'Las cartas, documentos y transmisiones encontrados se conservan aquí, incluso al reiniciar la historia.'],
    ['Registros encontrados: {quantidade} de {total}', 'Records found: {quantidade} of {total}', 'Registros encontrados: {quantidade} de {total}'],
    ['Registro desconhecido', 'Unknown record', 'Registro desconocido'],
    ['Explore a história para encontrar este registro.', 'Explore the story to find this record.', 'Explora la historia para encontrar este registro.'],
    ['Voltar aos registros', 'Back to records', 'Volver a los registros'],
    ['Ainda não há registros encontrados. As descobertas da história aparecerão aqui.', 'No records found yet. Your story discoveries will appear here.', 'Aún no hay registros encontrados. Tus descubrimientos aparecerán aquí.'],
    ['Carta misteriosa', 'Mysterious letter', 'Carta misteriosa'],
    ['Carta da Máquina do Tempo', 'Time Machine letter', 'Carta de la Máquina del Tiempo'],
    ['Desenhos da casa', 'Drawings at home', 'Dibujos de la casa'],
    ['Mensagem no telefone', 'Telephone message', 'Mensaje del teléfono'],
    ['Fotografia rasgada', 'Torn photograph', 'Fotografía rota'],
    ['Projeto inacabado', 'Unfinished blueprint', 'Plano sin terminar'],
    ['Inscrição do arquivo', 'Archive inscription', 'Inscripción del archivo'],
    ['Caderno — página {numero}', 'Notebook — page {numero}', 'Cuaderno — página {numero}'],
    ['A primeira hora', 'The first hour', 'La primera hora'],
    ['Fotografia completa', 'Complete photograph', 'Fotografía completa'],
    ['Rádio do observatório', 'Observatory radio', 'Radio del observatorio'],
    ['Retrato do castelo', 'Castle portrait', 'Retrato del castillo']
];
for (const textos of TEXTOS_ENCICLOPEDIA) textoCasa(...textos);
for (let i = 0; i < 3; i++) {
    textoCasa(...['pt-BR', 'en', 'es'].map(idioma => TEXTOS_SEGREDOS_ABERTURA[idioma].nomes[i]));
    textoCasa(...['pt-BR', 'en', 'es'].map(idioma => TEXTOS_SEGREDOS_ABERTURA[idioma].pistas[i]));
}
for (const chave of ['titulo', 'fim']) textoCasa(...['pt-BR', 'en', 'es'].map(idioma => TEXTOS_SEGREDOS_ABERTURA[idioma][chave]));

function criarCatalogoDaEnciclopedia() {
    const registros = [];
    const adicionar = (id, fonte, chaveAntiga = null) => registros.push({...fonte, id, chaveAntiga});
    for(const pista of [...SEGREDOS_DO_LOBBY,CONCLUSAO_SEGREDOS_LOBBY])adicionar(`lobby-${pista.id}`,{titulo:pista.titulo[0],texto:pista.texto[0]});
    ['entidade', 'relogio', 'portal'].forEach((id, i) => adicionar(`paisagem-${id}`, {
        titulo: TEXTOS_SEGREDOS_ABERTURA['pt-BR'].nomes[i], texto: TEXTOS_SEGREDOS_ABERTURA['pt-BR'].pistas[i]
    }));
    adicionar('paisagem-ecos', {titulo: TEXTOS_SEGREDOS_ABERTURA['pt-BR'].titulo, texto: TEXTOS_SEGREDOS_ABERTURA['pt-BR'].fim});
    adicionar('carta-portal', {...CONFIG.faseSecreta.cartaMisteriosa, titulo:'Carta misteriosa'}, CHAVE_CARTA_MISTERIOSA_VISTA);
    adicionar('carta-maquina', {...CONFIG.maquinaDoTempo.carta, titulo:'Carta da Máquina do Tempo'}, CHAVE_CARTA_MAQUINA_DO_TEMPO_VISTA);
    adicionar('radio-projeto', CONFIG.metropoleNeon.radio, CHAVE_TRANSMISSAO_PROJETO_RELOGIO_VISTA);
    adicionar('terminal-laboratorio', CONFIG.laboratorioAbandonado.terminal, CHAVE_REGISTRO_LABORATORIO_VISTO);
    const cenas = (grupo, propriedade, indices, chave) => {
        const fonte = CONFIG[grupo][propriedade];
        const etapas = fonte.etapas || fonte;
        for (const indice of indices) adicionar(`${grupo}-${propriedade}-${indice}`, etapas[indice], chave);
    };
    cenas('laboratorioAbandonado','cenaFinal',[0,1],CHAVE_CENA_FINAL_LABORATORIO_VISTA);
    adicionar('transmissor-futuro',CONFIG.futuroDespedacado.transmissor,CHAVE_TRANSMISSAO_FUTURO_DESPEDACADO_VISTA);
    cenas('futuroDespedacado','cenaFinal',[0,1],CHAVE_CENA_FINAL_FUTURO_DESPEDACADO_VISTA);
    for (const registro of CONFIG.pontoZero.registros) adicionar(`ponto-zero-${registro.id}`,registro);
    cenas('pontoZero','cenaFinal',[0],CHAVE_CENA_FINAL_PONTO_ZERO_VISTA);
    cenas('linhaDeFrenteTemporal','introducao',[1],CHAVE_INTRODUCAO_FASE_13_VISTA);
    cenas('linhaDeFrenteTemporal','cenaFinal',[1,4],CHAVE_CENA_FINAL_FASE_13_VISTA);
    cenas('eraApagada','cenaFinal',[0,1],CHAVE_CENA_FINAL_FASE_14_VISTA);
    cenas('arquivoProibido','introducao',[1]);
    cenas('arquivoProibido','final',[1]);
    cenas('camaraDasMemorias','introducao',[1]);
    cenas('camaraDasMemorias','final',[1,2,4]);
    for (const [id,titulo] of [['desenhos','Desenhos da casa'],['telefone','Mensagem no telefone'],['foto','Fotografia rasgada'],['projeto','Projeto inacabado']]) {
        adicionar(`casa-${id}`,{titulo,texto:FALAS_CASA[id],pistaCasa:id});
    }
    adicionar('arquivo-inscricao',{titulo:'Inscrição do arquivo',texto:TEXTO_MEMORIA.inscricao});
    for (let numero=1;numero<=4;numero++) adicionar(`caderno-${numero}`,{
        titulo:'Caderno — página {numero}', parametros:{numero}, texto:TEXTO_MEMORIA[`lembranca${numero}`],memoria:true
    });
    for (const [id,titulo] of [['origem','A primeira hora'],['retrato','Fotografia completa'],['radioFinal','Rádio do observatório']]) {
        adicionar(`observatorio-${id}`,{titulo,texto:FALAS_DESFECHO[id],registroFinal:id});
    }
    adicionar('castelo-retrato',{titulo:'Retrato do castelo',texto:'É um retrato da entidade ao lado de uma mulher coroada. Sua esposa? Não há nomes na moldura.'});
    return registros;
}
const CATALOGO_ENCICLOPEDIA = criarCatalogoDaEnciclopedia();
let registroAbertoNaEnciclopedia = null;

function carregarRegistrosDaEnciclopedia() {
    try {
        const ids = JSON.parse(localStorage.getItem(CHAVE_ENCICLOPEDIA) || '[]');
        return new Set(Array.isArray(ids) ? ids.filter(id=>CATALOGO_ENCICLOPEDIA.some(r=>r.id===id)) : []);
    } catch { return new Set(); }
}

function guardarRegistrosNaEnciclopedia(ids) {
    const encontrados = carregarRegistrosDaEnciclopedia();
    let mudou = false;
    for (const id of ids) {
        if (!encontrados.has(id) && CATALOGO_ENCICLOPEDIA.some(r=>r.id===id)) {
            encontrados.add(id); mudou = true;
        }
    }
    if (!mudou) return true;
    let anterior;
    try {
        anterior = localStorage.getItem(CHAVE_ENCICLOPEDIA);
        localStorage.setItem(CHAVE_ENCICLOPEDIA, JSON.stringify([...encontrados]));
        if (!atualizarSalvoAtivo()) throw new Error('Falha ao salvar coleção');
        return true;
    } catch {
        if (anterior !== undefined) try {
            if (anterior === null) localStorage.removeItem(CHAVE_ENCICLOPEDIA);
            else localStorage.setItem(CHAVE_ENCICLOPEDIA,anterior);
        } catch {}
        mostrarAviso(localizar('Não foi possível salvar neste navegador.'));
        return false;
    }
}

function registrarTextoNaEnciclopedia(texto) {
    if (mapaPersonalizadoAtivo || modoWavesInfinitas) return;
    const registros = CATALOGO_ENCICLOPEDIA.filter(r=>r.texto===texto);
    if (registros.length) guardarRegistrosNaEnciclopedia(registros.map(r=>r.id));
}

function recuperarRegistrosAntigosDaEnciclopedia() {
    const casa = carregarCasaParada();
    const ids = CATALOGO_ENCICLOPEDIA.filter(r=>
        (r.chaveAntiga && localStorage.getItem(r.chaveAntiga)==='true')
        || (r.pistaCasa && casa?.pistas.includes(r.pistaCasa))
        || (r.memoria && casa?.memoriaRecuperada)
        || (r.registroFinal && casa?.registrosFinais.includes(r.registroFinal))
    ).map(r=>r.id);
    return guardarRegistrosNaEnciclopedia(ids);
}

function abrirRegistroDaEnciclopedia(id) {
    if (!carregarRegistrosDaEnciclopedia().has(id)) return;
    mostrarEnciclopedia(id);
    conteudoMenu.querySelector('.enciclopedia-leitura h3')?.focus();
}

function voltarAListaDaEnciclopedia() {
    const anterior = registroAbertoNaEnciclopedia;
    mostrarEnciclopedia();
    conteudoMenu.querySelector(`[data-registro="${anterior}"]`)?.focus();
}

function mostrarEnciclopedia(id = null) {
    recuperarRegistrosAntigosDaEnciclopedia();
    definirTelaDoMenuAberta('enciclopedia');
    tentarIniciarMusicaDoLobby();
    const encontrados = carregarRegistrosDaEnciclopedia();
    const registro = encontrados.has(id) ? CATALOGO_ENCICLOPEDIA.find(r=>r.id===id) : null;
    registroAbertoNaEnciclopedia = registro?.id || null;
    const texto = (t,p) => escaparTextoDoEditor(localizar(t,p));
    conteudoMenu.innerHTML = criarCabecalhoConteudoMenu(localizar('Enciclopédia'),localizar('Cartas, documentos e transmissões encontrados ficam guardados aqui, mesmo ao reiniciar a história.')) + `
        <p class="enciclopedia-contagem">${texto('Registros encontrados: {quantidade} de {total}',{quantidade:encontrados.size,total:CATALOGO_ENCICLOPEDIA.length})}</p>
        ${registro ? `<article class="enciclopedia-leitura">
            <button class="botao" onclick="voltarAListaDaEnciclopedia()">← ${texto('Voltar aos registros')}</button>
            <h3 tabindex="-1">${texto(registro.titulo,registro.parametros)}</h3>
            <p class="enciclopedia-texto">${texto(registro.texto)}</p>
            ${registro.assinatura ? `<footer>${texto(registro.assinatura)}</footer>` : ''}
        </article>` : `
            ${encontrados.size===0 ? `<p class="enciclopedia-vazia">${texto('Ainda não há registros encontrados. As descobertas da história aparecerão aqui.')}</p>` : ''}
            <div class="enciclopedia-grade">${CATALOGO_ENCICLOPEDIA.map(r=>encontrados.has(r.id)
                ? `<button class="enciclopedia-registro" data-registro="${r.id}" onclick="abrirRegistroDaEnciclopedia('${r.id}')"><span aria-hidden="true">▤</span><strong>${texto(r.titulo,r.parametros)}</strong></button>`
                : `<div class="enciclopedia-registro enciclopedia-bloqueado"><span aria-hidden="true">?</span><strong aria-label="${texto('Registro desconhecido')}">???</strong><small>${texto('Explore a história para encontrar este registro.')}</small></div>`
            ).join('')}</div>`}`;
}

recuperarRegistrosAntigosDaEnciclopedia();
document.querySelectorAll('#botao-enciclopedia [data-localizar]').forEach(el=>el.textContent=localizar(el.dataset.localizar));
