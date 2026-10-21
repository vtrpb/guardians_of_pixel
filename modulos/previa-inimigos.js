for(const texto of [
 ['Prévia dos inimigos','Enemy preview','Vista previa de enemigos'],
 ['Veja as ameaças antes de escolher suas defesas.','Check the threats before choosing your defenses.','Consulta las amenazas antes de elegir tus defensas.'],
 ['Chefe','Boss','Jefe'],['Reforço invocado','Summoned reinforcement','Refuerzo invocado'],
 ['Combine alcance e dano para cobrir o caminho.','Combine range and damage to cover the path.','Combina alcance y daño para cubrir el camino.'],
 ['É rápido: cubra vários trechos do caminho.','Fast: cover several sections of the path.','Es rápido: cubre varios tramos del camino.'],
 ['Tem muita vida: concentre o dano nele.','High health: focus your damage on it.','Tiene mucha vida: concentra el daño en él.'],
 ['Leve detecção para atingir inimigos camuflados.','Bring detection to target camouflaged enemies.','Lleva detección para atacar enemigos camuflados.'],
 ['Priorize este suporte para enfraquecer o grupo.','Prioritize this support to weaken the group.','Prioriza este apoyo para debilitar al grupo.'],
 ['Elimine-o antes que destrua suas torres.','Eliminate it before it destroys your towers.','Elimínalo antes de que destruya tus torres.'],
 ['Super Sabotador','Super Saboteur','Súper Saboteador'],
 ['Fase 7 e mapas clássicos | Dispara dois tiros contra torres','Stage 7 and Classic maps | Fires two shots at towers','Fase 7 y mapas clásicos | Dispara dos tiros contra torres'],
 ['Fliperama perdido! Inimigos {percentual}% mais rápidos por {segundos} segundos.','Arcade lost! Enemies move {percentual}% faster for {segundos} seconds.','¡Fliperama perdido! Los enemigos se mueven un {percentual}% más rápido durante {segundos} segundos.']
])textoCasa(...texto);

function obterPreviaDosInimigos() {
    let tipos;
    if(mapaPersonalizadoAtivo){
        tipos=mapaPersonalizadoAtivo.waves.flatMap(w=>w.grupos.filter(g=>g.quantidade>0).map(g=>g.tipo));
    } else {
        const elenco=obterElencoExclusivoDaFase(),tema=obterFaseAtual().tema;
        tipos=elenco ? [...elenco.elenco.map(r=>r.tipo),elenco.boss,...(elenco.bossIntermediario?[elenco.bossIntermediario]:[])]
            : [...(['glitch','intervaloPerdido'].includes(tema)?[]:['normal','elite','rapido','sabotador'].filter(tipo=>tipo!=='sabotador'||!CONFIG.substitutosDoSabotador[faseSelecionada])),...(CONFIG.previaInimigosPorTema[tema]||[]),obterTipoDeBossDaFase()];
    }
    if (!mapaPersonalizadoAtivo && !modoWavesInfinitas
            && faseSelecionada === CONFIG.fliperama.testeDeDificuldade.numeroDaFase) {
        tipos.push('superSabotador');
    }
    const diretos=new Set(tipos.filter(t=>CONFIG.inimigo[t]));
    const todos=new Set(diretos);
    for(const tipo of todos){
        const reforco=CONFIG.inimigo[tipo].tipoDoReforco || {bossVulcanico:'fragmentoDeMagma',bossPrimordial:'raptorAncestral',arquivistaCorrompido:'fragmentoDeArquivo'}[tipo];
        if(reforco&&CONFIG.inimigo[reforco])todos.add(reforco);
    }
    return [...todos].map(tipo=>({tipo,invocado:!diretos.has(tipo)}));
}
function obterDicaDaPrevia(tipo) {
    const c=CONFIG.inimigo[tipo];
    if(tipo==='infiltradorCamuflado'||tipo==='censorVelado')return localizar('Leve detecção para atingir inimigos camuflados.');
    if(['roboReparador','sentinelaDeEscudo','corujaSombria'].includes(tipo))return localizar('Priorize este suporte para enfraquecer o grupo.');
    if(tipo==='sabotador'||tipo==='superSabotador')return localizar('Elimine-o antes que destrua suas torres.');
    const detalhe=obterDetalheDoInimigoNoAlbum(tipo,c);
    if(tipoEhBoss(tipo)&&detalhe.includes('|'))return detalhe.split('|').slice(1).join('|').trim();
    return localizar(c.velocidade>=CONFIG.inimigo.rapido.velocidade?'É rápido: cubra vários trechos do caminho.':c.vida>=CONFIG.inimigo.elite.vida?'Tem muita vida: concentre o dano nele.':'Combine alcance e dano para cobrir o caminho.');
}
function criarPreviaDosInimigos() {
    const elenco=obterPreviaDosInimigos();
    const aberta=document.getElementById('previa-inimigos')?.open;
    const escapar=escaparTextoDoEditor;
    return `<details id="previa-inimigos" class="previa-inimigos" ${aberta?'open':''}>
      <summary>${localizar('Prévia dos inimigos')} · ${elenco.length}</summary>
      <p>${localizar('Veja as ameaças antes de escolher suas defesas.')}</p>
      <ul>${elenco.map(({tipo,invocado})=>`<li data-previa-inimigo="${tipo}">
        <canvas class="miniatura-inimigo-album" width="80" height="80" data-tipo-inimigo="${tipo}" aria-hidden="true"></canvas>
        <div><strong>${escapar(obterNomeLocalizado(CONFIG.inimigo[tipo]))}</strong>
        ${tipoEhBoss(tipo)||invocado?`<small>${localizar(invocado?'Reforço invocado':'Chefe')}</small>`:''}
        <p>${escapar(obterDicaDaPrevia(tipo))}</p></div></li>`).join('')}</ul>
    </details>`;
}
