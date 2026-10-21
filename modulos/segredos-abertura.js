/* Fonte compartilhada com a Enciclopédia. */
const TEXTOS_SEGREDOS_ABERTURA = {
        'pt-BR': {
            nomes: ['Observar a entidade', 'Examinar o relógio quebrado', 'Investigar o portal'],
            pistas: ['A figura na ponte não acompanha o rio. Ela observa o sol, como se esperasse um horário que nunca chega.',
                'O vidro está partido, mas os ponteiros continuam juntos. Há um risco na pedra: “Nem todo tempo perdido desaparece.”',
                'Entre as árvores, a paisagem se repete por um instante. Do outro lado, o pôr do sol parece acontecer ao contrário.'],
            titulo: 'Ecos do entardecer', fechar: 'Fechar pista',
            fim: 'Três sinais, uma mesma pergunta: o que aconteceu com o tempo deste lugar?'
        },
        en: {
            nomes: ['Observe the entity', 'Examine the broken clock', 'Investigate the portal'],
            pistas: ['The figure on the bridge is not watching the river. It watches the sun, as though waiting for an hour that never comes.',
                'The glass is broken, but the hands remain together. A mark on the stone reads: “Not all lost time disappears.”',
                'Between the trees, the landscape repeats for a moment. On the other side, sunset seems to run backwards.'],
            titulo: 'Echoes of dusk', fechar: 'Close clue',
            fim: 'Three signs, one question: what happened to time in this place?'
        },
        es: {
            nomes: ['Observar a la entidad', 'Examinar el reloj roto', 'Investigar el portal'],
            pistas: ['La figura del puente no mira el río. Observa el sol, como si esperara una hora que nunca llega.',
                'El cristal está roto, pero las agujas siguen juntas. Una marca en la piedra dice: «No todo tiempo perdido desaparece».',
                'Entre los árboles, el paisaje se repite por un instante. Al otro lado, la puesta de sol parece ocurrir al revés.'],
            titulo: 'Ecos del atardecer', fechar: 'Cerrar pista',
            fim: 'Tres señales, una pregunta: ¿qué ocurrió con el tiempo de este lugar?'
        }
    };
(() => {
    const tela = document.getElementById('tela-inicial-jogo');
    const textos = TEXTOS_SEGREDOS_ABERTURA;
    const vistos = new Set();
    const camada = document.createElement('div');
    camada.className = 'segredos-abertura';
    const arte = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arte.classList.add('arte-segredos-abertura');
    arte.setAttribute('viewBox', '0 0 320 180');
    arte.setAttribute('preserveAspectRatio', 'none');
    arte.setAttribute('aria-hidden', 'true');
    arte.innerHTML = `
        <g transform="translate(0 -12)">
        <g data-pista-visual="portal">
            <path fill="#292638" d="M30 160h18v2H30z"/>
            <path fill="#46344f" d="M35 143h9v2h2v13h-2v3H34v-3h-2v-13h3z"/>
            <path fill="#90728e" d="M35 145h9v2h1v10h-2v2h-8v-2h-1v-10h1z"/>
            <path fill="#293d43" d="M37 148h5v2h1v7h-7v-7h1z"/>
            <path fill="#b45abf" d="M37 148h5v2h-5zM35 152h2v4h-2z"/>
            <path fill="#50d6c6" d="M39 151h2v3h-2zM37 155h2v2h-2z"/>
            <path fill="#a7f1d8" d="M40 151h1v1h-1z"/>
            <path fill="#594a62" d="M31 158h3v3h-3zM45 158h3v3h-3z"/>
        </g>
        <g data-pista-visual="relogio">
            <path fill="#204f37" d="M267 159h15v2h-15z"/>
            <path fill="#4c5745" d="M271 147h6v1h2v10h-2v2h-8v-2h-2v-10h4z"/>
            <path fill="#b7a36b" d="M271 148h6v2h1v7h-2v1h-6v-1h-1v-7h2z"/>
            <path fill="#f0d481" d="M271 150h5v1h1v5h-1v1h-5v-1h-1v-5h1z"/>
            <path fill="#fff0b5" d="M271 150h3v1h-3z"/>
            <path fill="#5b4d39" d="M273 151h1v4h-1zM274 154h3v1h-3z"/>
            <path fill="#8b7050" d="M278 149h2v8h-2z"/>
            <path fill="#4aad6d" d="M266 158h2v2h-2zM280 159h2v1h-2z"/>
        </g>
        <g class="retrato-entidade-abertura" data-pista-visual="entidade" hidden>
            <path fill="#204f37" d="M121 159h16v2h-16z"/>
            <path fill="#b6ad62" d="M125 144h2v-2h2v2h2v-2h2v4h-8z"/>
            <path fill="#283c38" d="M125 146h8v2h1v4h-10v-4h1z"/>
            <path fill="#5c596b" d="M124 151h10v3h1v5h-12v-5h1z"/>
            <path fill="#8d9e78" d="M128 152h2v7h-2z"/>
            <path fill="#3f7f3d" d="M122 157h3v3h-3zM133 157h4v3h-4z"/>
        </g>
        </g>
    `;
    const retratoDaEntidade = arte.querySelector('.retrato-entidade-abertura');
    camada.append(arte);
    const painel = document.createElement('section');
    painel.className = 'pista-abertura';
    painel.hidden = true;
    painel.setAttribute('aria-labelledby', 'titulo-pista-abertura');
    const titulo = document.createElement('h2');
    titulo.id = 'titulo-pista-abertura';
    const mensagem = document.createElement('p');
    mensagem.setAttribute('aria-live', 'polite');
    const contador = document.createElement('small');
    const fechar = document.createElement('button');
    fechar.type = 'button';
    painel.append(titulo, mensagem, contador, fechar);
    tela.append(camada, painel);
    let origem = null;
    const idioma = () => textos[document.documentElement.lang] || textos['pt-BR'];
    const botoes = [[.40, .78, 'entidade'], [.85, .75, 'relogio'], [.12, .78, 'portal']].map(([x, y, id], indice) => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'segredo-abertura';
        botao.dataset.segredo = id;
        botao.style.left = `${x * 100}%`;
        botao.style.top = `${y * 100}%`;
        botao.addEventListener('click', () => {
            if (botao.hidden || tela.hidden || tela.classList.contains('menu-inicial-saindo')) return;
            origem = botao;
            vistos.add(indice);
            const registros = [`paisagem-${id}`];
            if (vistos.size === 3) registros.push('paisagem-ecos');
            const salvo = guardarRegistrosNaEnciclopedia(registros);
            botao.classList.add('segredo-descoberto');
            const t = idioma();
            titulo.textContent = t.titulo;
            mensagem.textContent = t.pistas[indice];
            contador.textContent = `${vistos.size}/3${vistos.size === 3 ? ` · ${t.fim}` : ''}`;
            if (!salvo) contador.textContent += ` · ${localizar('Não foi possível salvar neste navegador.')}`;
            fechar.textContent = t.fechar;
            painel.hidden = false;
            fechar.focus();
        });
        camada.append(botao);
        return botao;
    });
    const atualizarIdioma = () => botoes.forEach((botao, i) => {
        botao.setAttribute('aria-label', idioma().nomes[i]);
        botao.title = idioma().nomes[i];
    });
    const atualizarEntidade = () => {
        const entidadeLiberada = maiorFaseConcluida >= 18;
        retratoDaEntidade.toggleAttribute('hidden', !entidadeLiberada);
        botoes[0].hidden = !entidadeLiberada;
    };
    window.atualizarEntidadeDaAbertura = atualizarEntidade;
    const fecharPista = () => { painel.hidden = true; origem?.focus(); };
    fechar.addEventListener('click', fecharPista);
    tela.addEventListener('keydown', evento => {
        if (evento.key === 'Escape' && !painel.hidden) {
            evento.preventDefault();
            evento.stopPropagation();
            fecharPista();
        }
    });
    new MutationObserver(() => {
        const saindo = tela.hidden || tela.classList.contains('menu-inicial-saindo') || tela.dataset.estado === 'encerrado';
        camada.inert = saindo;
        if (saindo) painel.hidden = true;
    }).observe(tela, { attributes: true, attributeFilter: ['class', 'hidden', 'data-estado'] });
    new MutationObserver(atualizarIdioma).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    atualizarIdioma();
    atualizarEntidade();
    const imagem = new Image();
    const posicionar = () => {
        if (!imagem.naturalWidth) return;
        const largura = tela.clientWidth;
        const altura = tela.clientHeight;
        const proporcao = imagem.naturalWidth / imagem.naturalHeight;
        let w = largura, h = altura;
        if (largura <= 700) h = largura / proporcao;
        else if (largura / altura > 16 / 9) {
            const escala = Math.max(largura / imagem.naturalWidth, altura / imagem.naturalHeight);
            w = imagem.naturalWidth * escala;
            h = imagem.naturalHeight * escala;
        }
        camada.style.width = `${w}px`;
        camada.style.height = `${h}px`;
        camada.style.left = `${(largura - w) / 2}px`;
        camada.style.top = `${largura <= 700 ? altura - h : (altura - h) / 2}px`;
    };
    imagem.onload = posicionar;
    imagem.src = 'assets/fundo-menu-8bits.svg';
    new ResizeObserver(posicionar).observe(tela);
})();
