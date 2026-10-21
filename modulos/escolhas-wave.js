const TEXTOS_DAS_ESCOLHAS_DA_WAVE = Object.freeze({
    'pt-BR': {
        rotulo: 'FASE {fase} · WAVE {wave}',
        titulo: 'Escolha o próximo desafio',
        descricao: 'Escolha o risco antes da wave começar. O prêmio só vem se você concluir esta wave.',
        velocidade: 'Investida veloz',
        detalheVelocidade: 'Inimigos {percentual}% mais rápidos · +{fragmentos} Fragmentos de Pixel',
        resistencia: 'Linha resistente',
        detalheResistencia: 'Inimigos com {percentual}% mais vida · +{fragmentos} Fragmentos de Pixel',
        normal: 'Wave normal',
        detalheNormal: 'Sem mudança nos inimigos e sem prêmio extra.',
        premio: 'Desafio concluído! +{fragmentos} Fragmentos de Pixel.'
    },
    en: {
        rotulo: 'STAGE {fase} · WAVE {wave}',
        titulo: 'Choose the next challenge',
        descricao: 'Choose a risk before the wave starts. Earn the reward only if you complete this wave.',
        velocidade: 'Swift assault',
        detalheVelocidade: 'Enemies {percentual}% faster · +{fragmentos} Pixel Fragments',
        resistencia: 'Tough line',
        detalheResistencia: 'Enemies have {percentual}% more health · +{fragmentos} Pixel Fragments',
        normal: 'Normal wave',
        detalheNormal: 'No enemy changes and no extra reward.',
        premio: 'Challenge complete! +{fragmentos} Pixel Fragments.'
    },
    es: {
        rotulo: 'FASE {fase} · OLEADA {wave}',
        titulo: 'Elige el próximo desafío',
        descricao: 'Elige el riesgo antes de la oleada. Recibirás el premio solo si la completas.',
        velocidade: 'Asalto veloz',
        detalheVelocidade: 'Enemigos un {percentual}% más rápidos · +{fragmentos} Fragmentos de Píxel',
        resistencia: 'Línea resistente',
        detalheResistencia: 'Enemigos con un {percentual}% más de vida · +{fragmentos} Fragmentos de Píxel',
        normal: 'Oleada normal',
        detalheNormal: 'Sin cambios en los enemigos ni premio adicional.',
        premio: '¡Desafío completado! +{fragmentos} Fragmentos de Píxel.'
    }
});

let waveComEscolhaAberta = 0;
let desafioEscolhidoDaProximaWave = null;
let desafioAtivoDaWave = null;
let proximaTentativaDePremioDaWaveEm = 0;

function textoDaEscolhaDaWave(chave, variaveis = {}) {
    const texto = TEXTOS_DAS_ESCOLHAS_DA_WAVE[idiomaAtual]?.[chave]
        || TEXTOS_DAS_ESCOLHAS_DA_WAVE['pt-BR'][chave];
    return preencherVariaveisDoTexto(texto, variaveis);
}

function partidaPermiteEscolhaDaWave() {
    return jogoIniciado && !partidaEncerrada && !mapaPersonalizadoAtivo
        && !modoWavesInfinitas && !desafioSupremoAtivo
        && CONFIG.fases.some(fase => fase.numero === faseSelecionada);
}

function obterFragmentosDoDesafioDaWave() {
    const configuracao = CONFIG.escolhasDaWave;
    return Math.min(configuracao.fragmentosMaximos,
        configuracao.fragmentosMinimos
        + Math.floor((faseSelecionada - 1) / configuracao.fasesPorAumento));
}

function reiniciarEscolhasDaWave() {
    waveComEscolhaAberta = 0;
    desafioEscolhidoDaProximaWave = null;
    desafioAtivoDaWave = null;
    proximaTentativaDePremioDaWaveEm = 0;
    document.getElementById('camada-escolha-wave').hidden = true;
}

function escolhaDeDesafioDaWaveEstaAberta() {
    return waveComEscolhaAberta > 0;
}

function abrirEscolhaDeDesafioDaWave(proximaWave) {
    if (!partidaPermiteEscolhaDaWave()
        || proximaWave % CONFIG.escolhasDaWave.intervaloEntreEscolhas !== 0
        || proximaWave > CONFIG.escolhasDaWave.ultimaWaveComEscolha
        || desafioEscolhidoDaProximaWave?.wave === proximaWave) return false;

    waveComEscolhaAberta = proximaWave;
    const camada = document.getElementById('camada-escolha-wave');
    document.getElementById('rotulo-escolha-wave').textContent = textoDaEscolhaDaWave('rotulo', {
        fase: faseSelecionada, wave: proximaWave
    });
    document.getElementById('titulo-escolha-wave').textContent = textoDaEscolhaDaWave('titulo');
    document.getElementById('descricao-escolha-wave').textContent = textoDaEscolhaDaWave('descricao');
    for (const tipo of ['velocidade', 'resistencia', 'normal']) {
        const regra = CONFIG.escolhasDaWave[tipo];
        const botao = camada.querySelector(`[data-escolha-wave="${tipo}"]`);
        const detalhe = textoDaEscolhaDaWave(`detalhe${tipo[0].toUpperCase()}${tipo.slice(1)}`, {
            percentual: Math.round(((regra?.multiplicador || 1) - 1) * 100),
            fragmentos: regra ? obterFragmentosDoDesafioDaWave() : 0
        });
        botao.replaceChildren();
        const nome = document.createElement('strong');
        nome.textContent = textoDaEscolhaDaWave(tipo);
        const explicacao = document.createElement('span');
        explicacao.textContent = detalhe;
        botao.append(nome, explicacao);
    }
    camada.hidden = false;
    camada.querySelector('[data-escolha-wave="velocidade"]').focus();
    return true;
}

function escolherDesafioDaWave(tipo) {
    if (!waveComEscolhaAberta || !['velocidade', 'resistencia', 'normal'].includes(tipo)
        || !partidaPermiteEscolhaDaWave()) return;
    desafioEscolhidoDaProximaWave = { wave: waveComEscolhaAberta, tipo };
    waveComEscolhaAberta = 0;
    document.getElementById('camada-escolha-wave').hidden = true;
    proximaWaveEm = Date.now() + CONFIG.wave.pausaEntreWaves;
    avisarProximoCaminhoVivo(desafioEscolhidoDaProximaWave.wave);
    avisarWaveEspecialFinal(desafioEscolhidoDaProximaWave.wave);
}

function iniciarDesafioEscolhidoDaWave(numeroDaWave) {
    desafioAtivoDaWave = desafioEscolhidoDaProximaWave?.wave === numeroDaWave
        ? { ...desafioEscolhidoDaProximaWave, premiado: false } : null;
    desafioEscolhidoDaProximaWave = null;
}

function obterMultiplicadorDoDesafioDaWave(atributo) {
    if (!partidaPermiteEscolhaDaWave() || desafioAtivoDaWave?.wave !== wave) return 1;
    return desafioAtivoDaWave.tipo === (atributo === 'vida' ? 'resistencia' : 'velocidade')
        ? CONFIG.escolhasDaWave[desafioAtivoDaWave.tipo].multiplicador : 1;
}

function concederPremioDoDesafioDaWave() {
    if (!desafioAtivoDaWave || desafioAtivoDaWave.premiado
        || desafioAtivoDaWave.wave !== wave) return true;
    if (Date.now() < proximaTentativaDePremioDaWaveEm) return false;
    const regra = CONFIG.escolhasDaWave[desafioAtivoDaWave.tipo];
    if (!regra) {
        desafioAtivoDaWave.premiado = true;
        return true;
    }
    const fragmentos = obterFragmentosDoDesafioDaWave();
    let saldoAnterior;
    let textoAnterior;
    try {
        saldoAnterior = fragmentosPixel;
        textoAnterior = localStorage.getItem(CHAVE_FRAGMENTOS_PIXEL);
        fragmentosPixel += fragmentos;
        localStorage.setItem(CHAVE_FRAGMENTOS_PIXEL, String(fragmentosPixel));
        if (!atualizarSalvoAtivo()) throw Error('slot');
    } catch {
        fragmentosPixel = saldoAnterior ?? fragmentosPixel;
        try {
            if (textoAnterior === null) localStorage.removeItem(CHAVE_FRAGMENTOS_PIXEL);
            else if (textoAnterior !== undefined) localStorage.setItem(CHAVE_FRAGMENTOS_PIXEL, textoAnterior);
        } catch {}
        proximaTentativaDePremioDaWaveEm = Date.now() + 2000;
        return false;
    }
    desafioAtivoDaWave.premiado = true;
    atualizarSaldoDeFragmentos();
    mostrarAviso(textoDaEscolhaDaWave('premio', { fragmentos }));
    return true;
}
