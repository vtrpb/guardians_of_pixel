// Pesquisa diária das mutações do Modo Clássico.
let amostraDoLaboratorioClassico = 'normal';
let modoDoLaboratorioClassico = 'normal';

for (const textos of [
    ['Laboratório genético','Genetics lab','Laboratorio genético'],
    ['Pesquisa biológica','Biological research','Investigación biológica'],
    ['Mutação do dia','Today’s mutation','Mutación del día'],
    ['Até a próxima meia-noite local','Until the next local midnight','Hasta la próxima medianoche local'],
    ['18% dos inimigos comuns recebem esta mutação. Chefes não sofrem mutação.','18% of common enemies receive this mutation. Bosses do not mutate.','El 18% de los enemigos comunes recibe esta mutación. Los jefes no mutan.'],
    ['Analisar amostra','Analyze specimen','Analizar muestra'],
    ['Vida estimada','Estimated health','Vida estimada'],
    ['Velocidade estimada','Estimated speed','Velocidad estimada'],
    ['Sem mutação','Without mutation','Sin mutación'],
    ['Com mutação','With mutation','Con mutación'],
    ['Antes dos efeitos de clima e wave. A mutação do dia permanece fixa durante a partida iniciada.','Before weather and wave effects. Today’s mutation stays fixed throughout a started match.','Antes de los efectos del clima y la oleada. La mutación del día permanece fija durante la partida iniciada.'],
    ['Voltar aos mapas','Back to maps','Volver a los mapas'],
    ['Comum','Common','Común'],['Elite','Elite','Élite'],['Rápido','Fast','Rápido']
]) textoCasa(...textos);

function obterDadosDaAmostraClassica(tipo=amostraDoLaboratorioClassico,modo=modoDoLaboratorioClassico){
    const inimigo=CONFIG.inimigo[tipo];
    const dificuldade=CONFIG.classico.dificuldades[modo];
    const mutacao=obterMutacaoClassicaDoDia();
    return {
        vidaBase:inimigo.vida*dificuldade.vida,
        vidaMutada:inimigo.vida*dificuldade.vida*mutacao.vida,
        velocidadeBase:inimigo.velocidade*dificuldade.velocidade,
        velocidadeMutada:inimigo.velocidade*dificuldade.velocidade*mutacao.velocidade
    };
}
function atualizarAmostraDoLaboratorioClassico(tipo,modo){
    if(CONFIG.inimigo[tipo])amostraDoLaboratorioClassico=tipo;
    if(CONFIG.classico.dificuldades[modo])modoDoLaboratorioClassico=modo;
    const dados=obterDadosDaAmostraClassica();
    for(const [id,valor] of Object.entries(dados)){
        const elemento=document.getElementById(`laboratorio-${id}`);
        if(elemento)elemento.textContent=Number(valor.toFixed(2)).toLocaleString(document.documentElement.lang||'pt-BR');
    }
    for(const botao of conteudoMenu.querySelectorAll('[data-amostra]'))
        botao.setAttribute('aria-pressed',botao.dataset.amostra===amostraDoLaboratorioClassico);
    for(const botao of conteudoMenu.querySelectorAll('[data-modo-laboratorio]'))
        botao.setAttribute('aria-pressed',botao.dataset.modoLaboratorio===modoDoLaboratorioClassico);
}
function mostrarLaboratorioClassico(){
    const mutacao=obterMutacaoClassicaDoDia();
    const data=new Date();
    const dataLocal=data.toLocaleDateString(document.documentElement.lang||'pt-BR');
    definirTelaDoMenuAberta('laboratorio');
    conteudoMenu.innerHTML=`${criarCabecalhoConteudoMenu(localizar('Laboratório genético'),localizar('Pesquisa biológica'))}
    <section class="laboratorio-classico" aria-label="${localizar('Laboratório genético')}">
      <div class="laboratorio-cenario" aria-hidden="true">
        <div class="laboratorio-monitor"><span>DNA</span><svg viewBox="0 0 180 90"><path d="M20 8 C120 22 60 67 160 82 M160 8 C60 22 120 67 20 82"/><path d="M33 18 H147 M53 32 H127 M65 45 H115 M53 59 H127 M33 73 H147"/></svg></div>
        <div class="laboratorio-tubos"><div class="laboratorio-tubo"><span>☢</span><i></i></div><div class="laboratorio-tubo laboratorio-tubo-ativo"><span>☢</span><i></i></div><div class="laboratorio-tubo"><span>☢</span><i></i></div></div>
        <div class="laboratorio-monitor laboratorio-monitor-lateral"><span>ATGC · CGTA</span><svg viewBox="0 0 180 90"><path d="M8 64 L35 64 L45 30 L55 72 L70 46 L82 64 L111 64 L122 19 L134 64 L172 64"/></svg></div>
      </div>
      <div class="laboratorio-leitura"><small>${localizar('Mutação do dia')} · ${dataLocal}</small><h3>${localizar(mutacao.nome)}</h3><p>${localizar(mutacao.descricao)}</p><p>${localizar('18% dos inimigos comuns recebem esta mutação. Chefes não sofrem mutação.')}</p><small>${localizar('Até a próxima meia-noite local')}</small></div>
      <div class="laboratorio-simulador"><h3>${localizar('Analisar amostra')}</h3>
        <div class="laboratorio-opcoes" role="group" aria-label="${localizar('Analisar amostra')}">${[['normal','Comum'],['elite','Elite'],['rapido','Rápido']].map(([id,nome])=>`<button class="botao" type="button" data-amostra="${id}" onclick="atualizarAmostraDoLaboratorioClassico('${id}',modoDoLaboratorioClassico)">${localizar(nome)}</button>`).join('')}</div>
        <div class="laboratorio-opcoes" role="group" aria-label="${localizar('Modo clássico')}">${Object.entries(CONFIG.classico.dificuldades).map(([id,config])=>`<button class="botao" type="button" data-modo-laboratorio="${id}" onclick="atualizarAmostraDoLaboratorioClassico(amostraDoLaboratorioClassico,'${id}')">${localizar(config.nome)}</button>`).join('')}</div>
        <div class="laboratorio-resultados"><div><strong>${localizar('Vida estimada')}</strong><span>${localizar('Sem mutação')}: <b id="laboratorio-vidaBase"></b></span><span>${localizar('Com mutação')}: <b id="laboratorio-vidaMutada"></b></span></div><div><strong>${localizar('Velocidade estimada')}</strong><span>${localizar('Sem mutação')}: <b id="laboratorio-velocidadeBase"></b></span><span>${localizar('Com mutação')}: <b id="laboratorio-velocidadeMutada"></b></span></div></div>
        <p>${localizar('Antes dos efeitos de clima e wave. A mutação do dia permanece fixa durante a partida iniciada.')}</p>
      </div><button class="botao laboratorio-voltar" type="button" onclick="voltarDoLaboratorioClassico()">← ${localizar('Voltar aos mapas')}</button>
    </section>`;
    conteudoMenu.scrollTop=0;
    atualizarAmostraDoLaboratorioClassico(amostraDoLaboratorioClassico,modoDoLaboratorioClassico);
}
function voltarDoLaboratorioClassico(){
    mostrarApresentacaoClassico();
    conteudoMenu.scrollTop=0;
}
TELAS_DO_LOBBY_EM_TELA_CHEIA.add('laboratorio');
