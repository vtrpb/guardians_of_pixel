let cacheDeDecoracoesParaConstrucao = null;

function obterMapaExclusivoDaConstrucao() {
    return mapaPersonalizadoAtivo?.classico
        ? CONFIG.classico.mapasExclusivos.find(m => m.numero === mapaPersonalizadoAtivo.numeroClassico)
        : null;
}

function obterAreasDeAguaParaConstrucao() {
    const exclusivo = obterMapaExclusivoDaConstrucao();
    if (exclusivo) return exclusivo.agua ? [exclusivo.agua] : [];
    return obterDecoracoesVisiveisDoMapa().filter(d => d.tipo === 'lago').flatMap(d =>
        CONFIG.construcaoNoTerreno.aguaDoLago.map(([x,y,largura,altura]) => ({
            x: d.x+x*d.escala, y: d.y+y*d.escala,
            largura: largura*d.escala, altura: altura*d.escala
        })));
}

function obterMascaraDeDecoracoes() {
    const mapa = obterMapaExclusivoDaConstrucao();
    const decoracoes = mapa ? [] : obterDecoracoesVisiveisDoMapa();
    const mapaClassico = mapaPersonalizadoAtivo?.classico ? obterMapasClassicos().find(m => m.numero === mapaPersonalizadoAtivo.numeroClassico) : null;
    const chave = JSON.stringify([mapa ? mapa.numero : decoracoes, mapaClassico?.numero]);
    if (cacheDeDecoracoesParaConstrucao?.chave === chave) return cacheDeDecoracoesParaConstrucao;
    const tela = document.createElement('canvas');
    tela.width = canvas.width; tela.height = canvas.height;
    const c = tela.getContext('2d', {willReadFrequently:true});
    if (mapa) {
        if (['cerejeiras','florestaMorta'].includes(mapa.tema)) desenharArvoresDasFlorestasClassicas(c,mapa);
        else desenharObjetosDosBiomasClassicos(c,mapa);
    } else {
        for (const d of decoracoes) {
            if (!CONFIG.construcaoNoTerreno.decoracoesLivres.includes(d.tipo)) desenhadoresDeDecoracao[d.tipo]?.(d,c);
        }
    }
    if (mapaClassico) desenharDecoracoesExtrasClassicas(c,mapaClassico);
    cacheDeDecoracoesParaConstrucao = {chave,largura:tela.width,altura:tela.height,dados:c.getImageData(0,0,tela.width,tela.height).data};
    return cacheDeDecoracoesParaConstrucao;
}

function construcaoSobreDecoracao(x,y) {
    if (typeof estaEmCrateraDoEvento === 'function' && estaEmCrateraDoEvento(x,y)) return true;
    const mascara = obterMascaraDeDecoracoes(), raio = CONFIG.construcaoNoTerreno.raioDaBase;
    for (let py=Math.max(0,Math.floor(y-raio));py<=Math.min(mascara.altura-1,Math.ceil(y+raio));py++) {
        for (let px=Math.max(0,Math.floor(x-raio));px<=Math.min(mascara.largura-1,Math.ceil(x+raio));px++) {
            if ((px-x)**2+(py-y)**2<=raio**2 && mascara.dados[(py*mascara.largura+px)*4+3]>=200) return true;
        }
    }
    return false;
}

TRADUCOES_FASE18.en['Não é possível construir sobre árvores ou outras decorações.']='You cannot build on trees or other decorations.';
TRADUCOES_FASE18.es['Não é possível construir sobre árvores ou outras decorações.']='No puedes construir sobre árboles u otras decoraciones.';
