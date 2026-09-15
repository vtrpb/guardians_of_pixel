// Retratos originais: bustos em grade pixelada, sem imagens de outros jogos.
const RETRATOS_DE_DIALOGO = Object.freeze({
    jogador: ['....cccc....','...cccccc...','..ccaaaacc..','..cabaabac..','..caaaaaac..','...aaaaaa...','....abba....','...caaaac...','..accbbcca..','.acccccccca.','acccccccccca','acccccccccca'],
    lina: ['...cccccc...','..ccaaaacc..','.ccaaaaaacc.','.cabbaabbac.','.cabbaabbac.','.ccaaaaaacc.','..ccaaaacc..','...caaaac...','.aaacbbcaaa.','aaaacbbcaaaa','aaaacbbcaaaa','aaaaccccaaaa'],
    tempo: ['...aaaaaa...','..aabbbbaa..','.aabbbbbbaa.','.abbbcbbbba.','.abbbcbbbba.','.abbbccccba.','.aabbbbbbaa.','..aabbbbaa..','...aaaaaa...','.aaabccbaaa.','aaaabccbaaaa','aaaabbbbaaaa'],
    entidade: ['..a..aa..a..','..aaaaaaaa..','...aaaaaa...','...abbbba...','...abbbba...','...abbbba...','...abbbba...','..aabbbbaa..','.aacabbacaa.','aaccabbaccaa','acccabbaccca','acccabbaccca'],
    guarda: ['....aaaa....','...aaaaaa...','..aabbbbaa..','..aaccccaa..','..aabbbbaa..','...aabbaa...','...aaaaaa...','.aaaabbaaaa.','aaccaaaaccaa','aacaaaaaacaa','aaccaaaaccaa','aaaaaaaaaaaa'],
    desconhecido: ['....aaaa....','...aaaaaa...','..aabbbbaa..','..abcccbba..','..abbbcbba..','..abbccbba..','...abbbba...','....acba....','..aaabbaaa..','.aaabbbbaaa.','aaaabbbbaaaa','aaaabbbbaaaa']
});

function identificarFalanteDoDialogo(nome, contexto = '') {
    const titulo = String(nome).trim().toLocaleUpperCase('pt-BR');
    if (['VOCÊ','DEFENSOR','PENSAMENTO DO DEFENSOR','JOGADOR'].includes(titulo)) return 'jogador';
    if (titulo.includes('LINA VARELA')) return 'lina';
    if (titulo === 'SENHOR DO TEMPO') return 'tempo';
    if (titulo === 'GUARDAS' || titulo === 'GUARDA') return 'guarda';
    if (titulo === '???') return contexto === 'final-campanha' || contexto === 'castelo' || contexto === 'cena-final-intervalo-perdido' ? 'entidade' : 'desconhecido';
    if (titulo === 'ANTIGO DEFENSOR' || titulo.includes('PESQUISADOR')) return 'desconhecido';
    return null;
}

function criarRetratoDeDialogo(personagem) {
    if (personagem === 'entidade') return '<canvas width="96" height="128" aria-hidden="true"></canvas>';
    if (personagem === 'guarda') return '<canvas width="96" height="112" aria-hidden="true"></canvas>';
    if (personagem === 'tempo') return criarRetratoDoSenhorDoTempo();
    const grade = RETRATOS_DE_DIALOGO[personagem];
    if (!grade) return '';
    const paletas = {
        jogador: {a:'#efc398',b:'#30212b',c:'#57412e'},
        lina: {a:'#efc398',b:'#283449',c:'#76503e'},
        entidade: {a:'#ffd36b',b:'#100c18',c:'#eee0bc'},
        guarda: {a:'#829cb6',b:'#253144',c:'#dbc484'},
        desconhecido: {a:'#81679e',b:'#151020',c:'#8de1df'}
    };
    const pixels = grade.flatMap((linha,y)=>[...linha].flatMap((letra,x)=>{
        let cor = paletas[personagem]?.[letra];
        if (!cor) return [];
        if (personagem === 'jogador' && y >= 8 && letra !== 'b') cor = '#6394ac';
        if (personagem === 'lina' && y >= 8 && letra === 'a') cor = '#e5eee9';
        if (personagem === 'entidade' && y >= 7 && letra === 'a') cor = '#8950a8';
        return [`<rect x="${x}" y="${y}" width="1" height="1" fill="${cor}"/>`];
    })).join('');
    return `<svg viewBox="0 0 12 12" width="96" height="96" aria-hidden="true" shape-rendering="crispEdges">${pixels}</svg>`;
}

function aplicarRetratoDeDialogo(elemento, personagem, meio = 'presencial') {
    let retrato = elemento.querySelector(':scope > .retrato-dialogo');
    if (!retrato) {
        retrato = document.createElement('div');
        retrato.className = 'retrato-dialogo';
        retrato.setAttribute('aria-hidden','true');
        elemento.prepend(retrato);
    }
    const mostrarRetrato = Boolean(personagem && personagem !== 'jogador' && meio !== 'audio');
    retrato.hidden = !mostrarRetrato;
    retrato.dataset.personagem = personagem || '';
    retrato.innerHTML = mostrarRetrato ? criarRetratoDeDialogo(personagem) : '';
    if (mostrarRetrato && personagem === 'entidade') desenharRetratoDaEntidadeDoLimbo(retrato.querySelector('canvas').getContext('2d'));
    if (mostrarRetrato && personagem === 'guarda') desenharGuardaMedieval(retrato.querySelector('canvas').getContext('2d'), 42, 90, 2.5);
    elemento.classList.add('dialogo-pixelado');
    elemento.dataset.semRetrato = String(!mostrarRetrato);
    elemento.dataset.meioComunicacao = meio;
}

function atualizarRetratoDaCutscene(titulo, tipo, assinatura = '', meioComunicacao = null) {
    const camada = document.getElementById('camada-cutscene-carta');
    camada.classList.add('conversa-pixelada');
    const falante = titulo === 'REGISTRO RECUPERADO' && assinatura.includes('LINA VARELA') ? 'DRA. LINA VARELA' : titulo;
    const referencia = `${titulo} ${assinatura}`.toLocaleUpperCase('pt-BR');
    const meio = meioComunicacao || (/VÍDEO|VIDEO|QUADRO 03:17/.test(referencia) ? 'video'
        : /TRANSMISS|GRAVA|RÁDIO|SINAL|CANAL|REGISTRO|TRECHO PRESERVADO/.test(referencia)
            || ['entrada-arquivo-proibido','final-arquivo-proibido'].includes(tipo) ? 'audio' : 'presencial');
    aplicarRetratoDeDialogo(camada.querySelector('.carta-misteriosa'), identificarFalanteDoDialogo(falante, tipo), meio);
    if (identificarFalanteDoDialogo(falante, tipo) === 'jogador') {
        document.getElementById('titulo-cutscene-carta').textContent = localizar('Você');
    }
}

function atualizarRetratoDoPortal() {
    const camada = document.getElementById('camada-conversa-portal');
    const balao = camada.querySelector('.balao-conversa-portal');
    if (!balao) return;
    const autor = balao.querySelector('.conversa-portal-fala')?.dataset.autor;
    const personagem = autor === 'jogador' ? 'jogador'
        : camada.dataset.tipoConversa === 'portal-bloqueado' ? 'desconhecido' : 'tempo';
    const retratoOriginal = balao.querySelector(':scope > .retrato-senhor-do-tempo');
    aplicarRetratoDeDialogo(balao, personagem, camada.dataset.tipoConversa === 'portal-bloqueado' ? 'audio' : 'presencial');
    if (personagem === 'tempo' && retratoOriginal) {
        // Mantém exatamente a forma definida pela cena, inclusive a armadilha do Intervalo.
        balao.querySelector(':scope > .retrato-dialogo').replaceChildren(retratoOriginal);
    }
}
