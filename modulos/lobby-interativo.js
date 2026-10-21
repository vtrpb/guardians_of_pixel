/* Alvos de treino que fazem parte do cenário do lobby Clássico. */
(() => {
    const menu = document.getElementById('menu-principal');
    const camada = document.createElement('div');
    camada.className = 'lobby-classico-interativo';
    camada.setAttribute('aria-label', 'Alvos de treino');

    // Os botões ocupam os dois alvos que já estão desenhados no papel de parede.
    for (const id of ['esquerdo', 'direito']) {
        const alvo = document.createElement('button');
        alvo.type = 'button';
        alvo.className = `alvo-lobby-classico alvo-lobby-classico-${id}`;
        alvo.setAttribute('aria-label', 'Acertar alvo de treino');
        alvo.innerHTML = '<span class="flecha-lobby-classico" aria-hidden="true">➤</span>';
        alvo.addEventListener('click', () => {
            alvo.classList.remove('alvo-acertado');
            void alvo.offsetWidth;
            alvo.classList.add('alvo-acertado');
        });
        camada.append(alvo);
    }
    menu.append(camada);
    window.atualizarPontosInterativosDoLobbyClassico = function () {
        camada.hidden = !Boolean(lobbyClassicoAtivo && !jogoIniciado && !telaDoMenuAberta);
    };
    window.atualizarPontosInterativosDoLobbyClassico();
})();
