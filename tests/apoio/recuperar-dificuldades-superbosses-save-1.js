// Recuperação única do Save 1 identificado no Opera em 17/10/2026.
const CHAVE_EVENTOS = 'guardians-of-pixel-eventos-v1';
const CHAVE_SALVOS = 'guardians-of-pixel-salvos-v1';
const CHAVE_BACKUP = 'backup-guardians-dificuldades-superbosses-save-1-2026-10-17';
const DIFICULDADES_INFORMADAS = Object.freeze({
    superBosses: ['facil', 'medio'],
    superBossesMecanicos: ['medio'],
    superBossesAbissais: ['medio'],
    superBossesAcidos: ['facil']
});
const VITORIAS_MINIMAS = Object.freeze({
    superBosses: 4, superBossesMecanicos: 5,
    superBossesAbissais: 3, superBossesAcidos: 1
});
const resultado = document.getElementById('resultado');
const botao = document.getElementById('recuperar');

function verificarSaveParaRecuperacao() {
    if (location.protocol !== 'file:') throw Error('Abra este arquivo localmente no navegador usado para jogar.');
    const anteriorEvento = localStorage.getItem(CHAVE_EVENTOS);
    const anteriorSistema = localStorage.getItem(CHAVE_SALVOS);
    const eventos = JSON.parse(anteriorEvento || 'null');
    const sistema = JSON.parse(anteriorSistema || 'null');
    if (sistema?.indiceAtivo !== 0 || sistema?.espacos?.[0]?.criadoEm !== 1789073607934
        || sistema.espacos[0]?.dados?.[CHAVE_EVENTOS] !== anteriorEvento) {
        throw Error('Este não é o Save 1 identificado, ou os dados locais mudaram. Nada foi alterado.');
    }
    if (!Object.entries(VITORIAS_MINIMAS).every(([id, minimo]) =>
        Number.isSafeInteger(eventos?.[id]) && eventos[id] >= minimo)) {
        throw Error('As vitórias deste save não correspondem às conferidas. Nada foi alterado.');
    }
    const concluídas = eventos.dificuldadesConcluidas || {};
    const faltam = Object.entries(DIFICULDADES_INFORMADAS).some(([id, dificuldades]) =>
        dificuldades.some(dificuldade => !concluídas[id]?.includes(dificuldade)));
    return { anteriorEvento, anteriorSistema, eventos, sistema, faltam };
}

try {
    const estado = verificarSaveParaRecuperacao();
    resultado.textContent = estado.faltam
        ? 'Save 1 principal conferido. A recuperação está pronta.'
        : 'Essas dificuldades já estão registradas. Nenhuma alteração é necessária.';
    botao.disabled = !estado.faltam;
} catch (erro) {
    resultado.textContent = erro.message;
}

botao.onclick = () => {
    let estado;
    try {
        estado = verificarSaveParaRecuperacao();
        if (!estado.faltam) throw Error('Essas dificuldades já estão registradas.');
        if (localStorage.getItem(CHAVE_BACKUP) !== null) {
            throw Error('Já existe um backup desta recuperação. Nada foi alterado.');
        }
        const backup = JSON.stringify({ evento: estado.anteriorEvento, sistema: estado.anteriorSistema });
        localStorage.setItem(CHAVE_BACKUP, backup);
        if (localStorage.getItem(CHAVE_BACKUP) !== backup) throw Error('Backup não confirmado. Nada foi alterado.');

        const dificuldadesConcluidas = { ...(estado.eventos.dificuldadesConcluidas || {}) };
        for (const [id, dificuldades] of Object.entries(DIFICULDADES_INFORMADAS)) {
            const anteriores = Array.isArray(dificuldadesConcluidas[id]) ? dificuldadesConcluidas[id] : [];
            dificuldadesConcluidas[id] = [...new Set([...anteriores, ...dificuldades])];
        }
        const eventoAtualizado = JSON.stringify({ ...estado.eventos, dificuldadesConcluidas,
            vitoriasAntigasPorEvento: { ...(estado.eventos.vitoriasAntigasPorEvento || {}),
                ...VITORIAS_MINIMAS },
            migracaoDificuldadesConfirmada: {
                ...(estado.eventos.migracaoDificuldadesConfirmada || {}),
                ...Object.fromEntries(Object.keys(DIFICULDADES_INFORMADAS).map(id => [id, true]))
            } });
        const outrosSlots = estado.sistema.espacos.slice(1).map(JSON.stringify);
        estado.sistema.espacos[0].dados[CHAVE_EVENTOS] = eventoAtualizado;
        estado.sistema.espacos[0].atualizadoEm = Date.now();
        localStorage.setItem(CHAVE_EVENTOS, eventoAtualizado);
        localStorage.setItem(CHAVE_SALVOS, JSON.stringify(estado.sistema));

        const sistemaGravado = JSON.parse(localStorage.getItem(CHAVE_SALVOS));
        if (localStorage.getItem(CHAVE_EVENTOS) !== eventoAtualizado
            || sistemaGravado.espacos[0].dados[CHAVE_EVENTOS] !== eventoAtualizado
            || sistemaGravado.espacos.slice(1).some((slot, indice) => JSON.stringify(slot) !== outrosSlots[indice])) {
            throw Error('A verificação falhou. Os dados anteriores serão restaurados.');
        }
        botao.disabled = true;
        resultado.textContent = 'Dificuldades recuperadas no Save 1. Abra o jogo novamente para vê-las no Álbum. O backup foi preservado.';
    } catch (erro) {
        if (estado && localStorage.getItem(CHAVE_BACKUP)) {
            try {
                localStorage.setItem(CHAVE_EVENTOS, estado.anteriorEvento);
                localStorage.setItem(CHAVE_SALVOS, estado.anteriorSistema);
            } catch {}
        }
        resultado.textContent = erro.message;
    }
};
