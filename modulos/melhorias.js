// Escolhas de atributos por torre; valores e limites pertencem a CONFIG.
function configuracaoUsaMelhoriasEscolhidas(c) {
    return Boolean(c && !c.suprema && !c.naoAtira && c.dano>0 && c.velocidadeAtaque>0 && !['mina','bomba'].includes(c.tipoDeItem));
}
function obterDescricaoDoNivelVisualDaTorre(nivel) {
    return localizar('Melhorias aplicadas: {nivel}. Dano, velocidade e alcance dependem das escolhas feitas na partida.',{nivel});
}
function obterLimiteVisualDaTorre(c) {
    return configuracaoUsaMelhoriasEscolhidas(c) ? CONFIG.melhoriasEscolhidas.limite : (c?.melhorias?.length || 0);
}
function obterVisualDaTorreNoNivel(c, nivel) {
    const visual = nivel === 0 ? c.visualBase : (c.melhorias?.[Math.min(nivel,c.melhorias.length)-1]?.visual || c.visualBase);
    if ([CONFIG.torre.tipos.catapulta, CONFIG.torre.tipos.torreMagnetica,
        CONFIG.torre.tipos.torreMetamorfa].includes(c)) {
        return { ...visual, nivelDoPremio: nivel };
    }
    if ((c === CONFIG.torre.tipos.obliterador && nivel >= 1 && nivel <= 5)
        || (c === CONFIG.torre.tipos.torreEsporos && nivel >= 1 && nivel <= 3)) {
        return { ...visual, remakeDaTorre: visual.tipoVisual, nivelDoRemake: nivel };
    }
    const remake = c === CONFIG.torre.tipos.padrao ? 'padrao'
        : c === CONFIG.torre.tipos.canhaoPesado ? 'canhaoPesado'
        : c === CONFIG.torre.tipos.torreDeRaios ? 'raios' : null;
    if (remake && (remake === 'raios' ? nivel >= 1 && nivel <= 3 : nivel === 4 || nivel === 5)) {
        return { ...visual, remakeDaTorre: remake, nivelDoRemake: nivel };
    }
    if (!visual || nivel < 4 || !configuracaoUsaMelhoriasEscolhidas(c)) return visual;
    const novo = { ...visual, nivelEvolucaoVisual: nivel };
    const etapa = nivel - 3;
    if (!visual.tipoVisual) {
        novo.comprimentoCanhao = (visual.comprimentoCanhao || 34) + etapa * 5;
        novo.larguraCanhao = (visual.larguraCanhao || 12) + etapa * 3;
    }
    for (const campo of ['comprimentoCanhao','comprimentoBesta','alturaCristal','alturaCogumelo']) {
        if (visual[campo]) novo[campo] = visual[campo] + etapa * 5;
    }
    for (const campo of ['larguraCanhao','larguraBesta','larguraCristal','larguraCogumelo']) {
        if (visual[campo]) novo[campo] = visual[campo] + etapa * 3;
    }
    return novo;
}

function obterDistribuicaoDeMelhorias(torre) {
    // Partidas antigas em memória conservam suas compras como escolhas de dano.
    return torre.melhoriasEscolhidas || {dano:torre.nivel||0,velocidade:0,alcance:0};
}
function obterTotalDeMelhorias(torre) {
    return Object.values(obterDistribuicaoDeMelhorias(torre)).reduce((a,b)=>a+b,0);
}
function obterCustoDaMelhoriaEscolhida(torre) {
    const c=obterConfiguracaoDaTorre(torre.tipo),cfg=CONFIG.melhoriasEscolhidas;
    const base=Math.max(cfg.custoMinimo,c.melhorias?.[0]?.custo || c.custo*cfg.fracaoDoCustoDeConstrucao);
    const total=obterTotalDeMelhorias(torre);
    const multiplicador=c===CONFIG.torre.tipos.obliterador && total===cfg.limite-1
        ? cfg.multiplicadorFinalDoObliterador : cfg.multiplicadoresDeCusto[total];
    const custoBase=multiplicador==null?null:Math.ceil(base*multiplicador/cfg.arredondamentoDoCusto)*cfg.arredondamentoDoCusto;
    return custoBase === null ? null : typeof obterCustoAtualDaPartida === 'function'
        ? obterCustoAtualDaPartida(custoBase) : custoBase;
}
function obterConfiguracaoComMelhoriasEscolhidas(torre) {
    const c=obterConfiguracaoDaTorre(torre.tipo),p=obterDistribuicaoDeMelhorias(torre),cfg=CONFIG.melhoriasEscolhidas;
    const visual=obterVisualDaTorreNoNivel(c,torre.nivel)||c.visualBase;
    return {...c,
        dano:Math.round(c.dano*(1+cfg.danoPorPonto*p.dano)),
        alcance:Math.round(c.alcance*(1+cfg.alcancePorPonto*p.alcance)),
        velocidadeAtaque:Math.round(c.velocidadeAtaque/(1+cfg.cadenciaPorPonto*p.velocidade)),
        raioDanoEmArea: c === CONFIG.torre.tipos.catapulta
            ? (c.melhorias[Math.min(torre.nivel, c.melhorias.length) - 1]?.raioDanoEmArea || c.raioDanoEmArea)
            : c.raioDanoEmArea,
        visual
    };
}
function comprarMelhoriaEscolhida(atributo) {
    if(!['dano','velocidade','alcance'].includes(atributo)||!torreSelecionada||!torres.includes(torreSelecionada))return;
    const custo=obterCustoDaMelhoriaEscolhida(torreSelecionada);
    if(custo===null)return;
    if(dinheiro<custo){mostrarAviso(localizar('Dinheiro insuficiente para esta melhoria.'));return;}
    const pontos={...obterDistribuicaoDeMelhorias(torreSelecionada)};
    pontos[atributo]++;
    dinheiro-=custo;torreSelecionada.valorInvestido+=custo;
    torreSelecionada.melhoriasEscolhidas=pontos;torreSelecionada.nivel=obterTotalDeMelhorias(torreSelecionada);
    atualizarAtributosDaTorreComBonus(torreSelecionada);
    registrarAcaoDaTorreParaMissoes('melhorias');
    if(partidaContaParaConquistasMemoraveis())desbloquearConquista('primeiraMelhoria');
    atualizarBotoesDaTorre();
    mostrarAviso(localizar('Melhoria aplicada: {atributo} · {usadas}/{total}',{atributo:localizar({dano:'Dano',velocidade:'Velocidade',alcance:'Alcance'}[atributo]),usadas:torreSelecionada.nivel,total:CONFIG.melhoriasEscolhidas.limite}));
}
function atualizarPainelDeMelhoriasEscolhidas() {
    const painel=document.getElementById('painel-melhorias-escolhidas');
    if(!painel)return;
    const torre=torreSelecionada,c=torre&&obterConfiguracaoDaTorre(torre.tipo);
    if(!configuracaoUsaMelhoriasEscolhidas(c)){painel.hidden=true;botaoMelhorar.setAttribute('aria-expanded','false');return;}
    botaoMelhorar.setAttribute('aria-expanded',String(!painel.hidden));
    botaoMelhorar.setAttribute('aria-controls',painel.id);
    const pontos=obterDistribuicaoDeMelhorias(torre),custo=obterCustoDaMelhoriaEscolhida(torre);
    painel.dataset.saldo=String(dinheiro);
    document.getElementById('resumo-melhorias-escolhidas').textContent=localizar('Distribua {total} melhorias · Usadas: {usadas}/{total} · Dano {dano}, velocidade {velocidade}, alcance {alcance}',{...pontos,total:CONFIG.melhoriasEscolhidas.limite,usadas:obterTotalDeMelhorias(torre)});
    for(const atributo of ['dano','velocidade','alcance']) {
        const botao=document.getElementById('melhoria-'+atributo);
        const simulada={...torre,melhoriasEscolhidas:{...pontos,[atributo]:pontos[atributo]+1}};
        atualizarAtributosDaTorreComBonus(simulada);
        const atual=torre,proxima=simulada;
        const campo={dano:'dano',velocidade:'velocidadeAtaque',alcance:'alcance'}[atributo];
        botao.textContent=custo===null?localizar('Limite de melhorias atingido'):localizar('{atributo}: {antes} → {depois} · {custo} créditos',{
            atributo:localizar({dano:'Dano',velocidade:'Intervalo (ms)',alcance:'Alcance (px)'}[atributo]),antes:atual[campo],depois:proxima[campo],custo
        });
        botao.disabled=custo===null||dinheiro<custo;
    }
}
function fecharPainelDeMelhoriasEscolhidas() {
    document.getElementById('painel-melhorias-escolhidas').hidden=true;
    botaoMelhorar.setAttribute('aria-expanded','false');
    botaoMelhorar.focus();
}
function resumoDasMelhoriasEscolhidas() {
    return localizar('5 melhorias no total: escolha dano, velocidade ou alcance. Os preços aumentam a cada compra; não é possível maximizar todos os atributos.');
}
function obterWaveEspecialFinal(numero) {
    if(mapaPersonalizadoAtivo||![17,18].includes(faseSelecionada))return null;
    return CONFIG.desafiosFinais.waves[numero]||null;
}
function avisarWaveEspecialFinal(numero) {
    const desafio=obterWaveEspecialFinal(numero);
    if(desafio)mostrarAviso(localizar('Wave {wave}: {aviso}',{wave:numero,aviso:localizar(desafio.aviso)}));
}
for(const [pt,en,es] of [
 ['Melhorias ({usadas}/{total})','Upgrades ({usadas}/{total})','Mejoras ({usadas}/{total})'],
 ['Melhoria aplicada: {atributo} · {usadas}/{total}','Upgrade applied: {atributo} · {usadas}/{total}','Mejora aplicada: {atributo} · {usadas}/{total}'],
 ['Distribua {total} melhorias · Usadas: {usadas}/{total} · Dano {dano}, velocidade {velocidade}, alcance {alcance}','Allocate {total} upgrades · Used: {usadas}/{total} · Damage {dano}, speed {velocidade}, range {alcance}','Distribuye {total} mejoras · Usadas: {usadas}/{total} · Daño {dano}, velocidad {velocidade}, alcance {alcance}'],
 ['{atributo}: {antes} → {depois} · {custo} créditos','{atributo}: {antes} → {depois} · {custo} credits','{atributo}: {antes} → {depois} · {custo} créditos'],
 ['Limite de melhorias atingido','Upgrade limit reached','Límite de mejoras alcanzado'],
 ['Intervalo (ms)','Interval (ms)','Intervalo (ms)'],['Alcance (px)','Range (px)','Alcance (px)'],
 ['5 melhorias no total: escolha dano, velocidade ou alcance. Os preços aumentam a cada compra; não é possível maximizar todos os atributos.','5 upgrades total: choose damage, speed or range. Prices rise with each purchase; you cannot maximize every stat.','5 mejoras en total: elige daño, velocidad o alcance. Los precios suben con cada compra; no puedes maximizar todos los atributos.'],
 ['Nível {nivel}/{limite}','Level {nivel}/{limite}','Nivel {nivel}/{limite}'],
 ['Melhorias aplicadas: {nivel}. Dano, velocidade e alcance dependem das escolhas feitas na partida.','Upgrades applied: {nivel}. Damage, speed and range depend on your choices during the match.','Mejoras aplicadas: {nivel}. El daño, la velocidad y el alcance dependen de tus elecciones durante la partida.'],
 ['Wave {wave}: {aviso}','Wave {wave}: {aviso}','Oleada {wave}: {aviso}'],
 ['Investida veloz — prepare cadência e controle!','Fast assault — prepare attack speed and crowd control!','¡Asalto veloz: prepara cadencia y control!'],
 ['Coluna blindada — concentre dano nos Couraçados!','Armored column — focus damage on armored enemies!','¡Columna blindada: concentra daño en los Acorazados!'],
 ['Convergência — elimine os Tecelões antes dos reforços!','Convergence — eliminate Weavers before their reinforcements!','¡Convergencia: elimina a los Tejedores antes de sus refuerzos!'],
 ['Última ofensiva — rápidos, blindados e invocadores juntos!','Last offensive — fast, armored and summoner enemies together!','¡Última ofensiva: veloces, blindados e invocadores juntos!']
]) {TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es;}
