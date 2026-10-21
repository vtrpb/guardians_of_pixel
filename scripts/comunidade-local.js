async function mostrarMapas() {
    const estado = document.getElementById('estado');
    const lista = document.getElementById('mapas');
    estado.textContent = 'Buscando mapas...';
    lista.replaceChildren();
    try {
        const resposta = await fetch('/api/mapas');
        if (!resposta.ok) throw new Error('Falha na consulta');
        const dados = await resposta.json();
        const mapas = Array.isArray(dados.mapas) ? dados.mapas : [];
        estado.textContent = mapas.length ? `${mapas.length} mapa(s) disponível(is).` : 'Ainda não há mapas publicados.';
        for (const mapa of mapas) {
            const cartao = document.createElement('article');
            const titulo = document.createElement('h2');
            titulo.textContent = mapa.nome;
            const autor = document.createElement('p');
            autor.textContent = `Criado por ${mapa.criador}`;
            const botao = document.createElement('button');
            botao.type = 'button';
            botao.textContent = 'Copiar código';
            const codigo = document.createElement('textarea');
            codigo.readOnly = true;
            codigo.value = mapa.codigo;
            botao.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(mapa.codigo);
                    estado.textContent = 'Código copiado. Cole no jogo para importar.';
                } catch {
                    codigo.select();
                    estado.textContent = 'Selecione e copie o código exibido abaixo.';
                }
            });
            cartao.append(titulo, autor, botao, codigo);
            lista.append(cartao);
        }
    } catch {
        estado.textContent = 'Não foi possível buscar os mapas. Confira se o servidor continua aberto.';
    }
}

document.getElementById('atualizar').addEventListener('click', mostrarMapas);
mostrarMapas();
