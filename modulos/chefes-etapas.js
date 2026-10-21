for (const t of [
    ['Salva dupla', 'Double volley', 'Salva doble'],
    ['Impacto de areia', 'Sand impact', 'Impacto de arena'],
    ['Geada concentrada', 'Focused frost', 'Escarcha concentrada'],
    ['Colosso: mais rápido, porém vulnerável', 'Colossus: faster but vulnerable', 'Coloso: más rápido, pero vulnerable'],
    ['Urso: rugidos frequentes, passos lentos', 'Bear: frequent roars, slower steps', 'Oso: rugidos frecuentes, pasos lentos'],
    ['Segunda etapa: {ataque}', 'Second stage: {ataque}', 'Segunda etapa: {ataque}']
]) textoCasa(...t);

function obterConfiguracaoSegundaEtapa(tipo) {
    const c = CONFIG.segundaEtapaDosChefes;
    return {...c, ...c.ataques[tipo]};
}

function multiplicadorDaSegundaEtapa(inimigo, atributo) {
    const etapa = inimigo.etapaDoChefe;
    return etapa?.ativa ? CONFIG.segundaEtapaDosChefes.ataques[etapa.tipo]?.[atributo] || 1 : 1;
}

function atualizarSegundaEtapaDosChefes(deltaMs) {
    if (!jogoIniciado || jogoPausado || partidaEncerrada) return;
    for (const inimigo of inimigos) {
        const tipo = CONFIG.segundaEtapaDosChefes.tipos[inimigo.tipo];
        const c = obterConfiguracaoSegundaEtapa(tipo);
        if (!tipo || inimigo.vida <= 0 || (inimigo.estaseSupremaRestante || 0) > 0
            || Date.now() < (inimigo.atordoadoPelaTorreSismicaAte || 0)) continue;
        if (!inimigo.etapaDoChefe && inimigo.vida <= inimigo.vidaMaxima * c.percentualVida) {
            inimigo.etapaDoChefe = { tipo, restante: c.passiva ? c.avisoMs : 0, alvo: null };
            mostrarAviso(localizar('Segunda etapa: {ataque}', {ataque: localizar(nomeDoAtaqueDoChefe(tipo))}));
            if (c.passiva) continue;
        }
        const etapa = inimigo.etapaDoChefe;
        if (!etapa) continue;
        if (c.passiva) {
            etapa.restante = Math.max(0, etapa.restante - deltaMs);
            if (etapa.restante === 0) etapa.ativa = true;
            continue;
        }
        etapa.restante = Math.max(0, etapa.restante - deltaMs);
        if (etapa.restante > 0) continue;
        if (etapa.alvo) {
            if (tipo === 'salva') {
                for (const alvo of etapa.alvos.filter(t => torres.includes(t))) {
                    tirosDosInimigos.push({x: inimigo.x, y: inimigo.y, alvo,
                        velocidade: c.velocidadeTiro, tipoDoInimigo: inimigo.tipo});
                }
            } else if (escudoSupremoRestante <= 0) {
                for (const torre of [...torres]) {
                    if (Math.hypot(torre.x - etapa.alvo.x, torre.y - etapa.alvo.y) > c.raio) continue;
                    if (tipo === 'impacto') atingirTorreComTiroInimigo(torre, inimigo.tipo);
                    else aplicarLentidaoDoMacacoNaTorre(torre);
                }
            }
            etapa.alvo = null;
            etapa.alvos = [];
            etapa.restante = c.intervaloMs;
            continue;
        }
        const alvo = encontrarAlvoParaInimigoAtirador(inimigo, c.alcance);
        if (!alvo) continue;
        etapa.alvo = {x: alvo.x, y: alvo.y};
        etapa.alvos = [alvo, ...torres.filter(t => t !== alvo
            && Math.hypot(t.x - inimigo.x, t.y - inimigo.y) <= c.alcance)]
            .slice(0, c.alvosDaSalva);
        etapa.restante = c.avisoMs;
    }
}

function nomeDoAtaqueDoChefe(tipo) {
    return {salva: 'Salva dupla', impacto: 'Impacto de areia', geada: 'Geada concentrada', selva: 'Colosso: mais rápido, porém vulnerável', urso: 'Urso: rugidos frequentes, passos lentos'}[tipo];
}

function desenharSegundaEtapaDoChefe(inimigo) {
    const etapa = inimigo.etapaDoChefe;
    if (!etapa || inimigo.vida <= 0) return;
    ctx.save();
    const cor = {salva: '#ff8c73', impacto: '#ffcd67', geada: '#95edff', selva: '#a0ed80', urso: '#ffc28c'}[etapa.tipo];
    ctx.fillStyle = cor;
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('II', inimigo.x, inimigo.y - inimigo.tamanho - 22);
    if (obterConfiguracaoSegundaEtapa(etapa.tipo).passiva) {
        ctx.strokeStyle = cor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(inimigo.x, inimigo.y, inimigo.tamanho + 8, 0, Math.PI * 2);
        ctx.stroke();
        if (!etapa.ativa) {
            const texto = localizar(nomeDoAtaqueDoChefe(etapa.tipo));
            const margem = ctx.measureText(texto).width / 2 + 8;
            const x = Math.max(margem, Math.min(canvas.width - margem, inimigo.x));
            const y = Math.max(18, inimigo.y - inimigo.tamanho - 40);
            ctx.fillStyle = '#18231eee';
            ctx.fillRect(x - margem, y - 13, margem * 2, 19);
            ctx.fillStyle = cor;
            ctx.fillText(texto, x, y);
        }
    }
    if (etapa.alvo) {
        ctx.strokeStyle = cor;
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]);
        if (etapa.tipo === 'salva') {
            for (const alvo of etapa.alvos.filter(t => torres.includes(t))) {
                ctx.beginPath(); ctx.moveTo(inimigo.x, inimigo.y); ctx.lineTo(alvo.x, alvo.y); ctx.stroke();
            }
        } else {
            const c = obterConfiguracaoSegundaEtapa(etapa.tipo);
            ctx.beginPath(); ctx.arc(etapa.alvo.x, etapa.alvo.y, c.raio, 0, Math.PI * 2); ctx.stroke();

        }
        ctx.setLineDash([]);
        ctx.fillText(localizar(nomeDoAtaqueDoChefe(etapa.tipo)), etapa.alvo.x, etapa.alvo.y - 18);
    }
    ctx.restore();
}
