const CHAVE_DESAFIOS_CLASSICOS='guardians-of-pixel-desafios-classicos-v1';
const CHAVE_CONTRATOS_CLASSICOS='guardians-of-pixel-contratos-classicos-v1';
const DESAFIOS_CLASSICOS=Object.freeze([
    {id:'semNucleos',nome:'Poder próprio',descricao:'Vença sem usar núcleos de sobrecarga.',icone:'◇'},
    {id:'compacta',nome:'Defesa compacta',descricao:'Vença construindo no máximo {limite} torres no total. Vender ou perder uma torre não devolve a construção.',icone:'▥'},
    {id:'especialista',nome:'Especialista',descricao:'Vença usando um único tipo de defesa durante toda a partida, incluindo suportes, minas e bombas.',icone:'◎'}
]);
for(const textos of [
 ['Poder próprio','Own power','Poder propio'],['Defesa compacta','Compact defense','Defensa compacta'],['Especialista','Specialist','Especialista'],
 ['Vença sem usar núcleos de sobrecarga.','Win without using overload cores.','Gana sin usar núcleos de sobrecarga.'],
 ['Vença construindo no máximo {limite} torres no total. Vender ou perder uma torre não devolve a construção.','Win by building at most {limite} towers in total. Selling or losing a tower does not refund the build.','Gana construyendo como máximo {limite} torres en total. Vender o perder una torre no devuelve la construcción.'],
 ['Vença usando um único tipo de defesa durante toda a partida, incluindo suportes, minas e bombas.','Win using a single defense type throughout the match, including supports, mines and bombs.','Gana usando un único tipo de defensa durante toda la partida, incluidos apoyos, minas y bombas.'],
 ['Desafios do mapa','Map challenges','Desafíos del mapa'],['Medalhas: {quantidade}/{total}','Medals: {quantidade}/{total}','Medallas: {quantidade}/{total}'],
 ['Conquistada','Earned','Conseguida'],['Não conquistada','Not earned','No conseguida'],
 ['Válido','Eligible','Válido'],['Fora desta tentativa','Missed this attempt','Fuera de este intento'],
 ['Desafios acompanham todas as partidas clássicas. Vença em qualquer dificuldade e construa ao menos uma torre. Pode ganhar várias medalhas de uma vez; elas são colecionáveis, sem bônus de atributos ou moedas.','Challenges track every Classic match. Win on any difficulty and build at least one tower. You can earn several medals at once; they are collectibles with no stat or currency bonuses.','Los desafíos se registran en cada partida clásica. Gana en cualquier dificultad y construye al menos una torre. Puedes ganar varias medallas a la vez; son coleccionables sin bonos de atributos ni monedas.'],
 ['Novas medalhas: {nomes}','New medals: {nomes}','Nuevas medallas: {nomes}'],
 ['Não foi possível salvar as medalhas.','Could not save the medals.','No se pudieron guardar las medallas.']
])textoCasa(...textos);
for(const textos of [
 ['Contrato do mapa','Map contract','Contrato del mapa'],['Selo conquistado','Seal earned','Sello conseguido'],
 ['Selo disponível','Seal available','Sello disponible'],['Contrato válido','Contract eligible','Contrato válido'],
 ['Contrato perdido nesta tentativa','Contract missed this attempt','Contrato perdido en este intento'],
 ['Novo selo: {nome}','New seal: {nome}','Nuevo sello: {nome}'],
 ['Não foi possível salvar o selo.','Could not save the seal.','No se pudo guardar el sello.'],
 ['Pétalas sem explosões','Petals without explosions','Pétalos sin explosiones'],
 ['Vença sem construir minas ou bombas.','Win without building mines or bombs.','Gana sin construir minas ni bombas.'],
  ['Maré de prova','Trial tide','Marea de prueba'],
  ['Ative o contrato e sobreviva à wave {quantidade}: os inimigos avançam 25% mais rápido durante a maré.','Activate the contract and survive wave {quantidade}: enemies move 25% faster during the tide.','Activa el contrato y sobrevive a la oleada {quantidade}: los enemigos avanzan un 25% más rápido durante la marea.'],
  ['Ativar maré de prova','Activate trial tide','Activar marea de prueba'],
  ['Maré de prova ativada','Trial tide active','Marea de prueba activada'],
  ['Contrato não ativado','Contract not activated','Contrato no activado'],
  ['Aguardando a wave da maré','Waiting for the tide wave','Esperando la oleada de la marea'],
  ['Maré de prova! Inimigos 25% mais rápidos nesta wave.','Trial tide! Enemies are 25% faster this wave.','¡Marea de prueba! Los enemigos son un 25% más rápidos en esta oleada.'],
 ['Aurora em equipe','Team aurora','Aurora en equipo'],
 ['Vença usando ao menos {quantidade} tipos de defesa.','Win using at least {quantidade} defense types.','Gana usando al menos {quantidade} tipos de defensa.']
])textoCasa(...textos);
let tentativaDesafiosClassicos=null;

function carregarSelosClassicos(){
    let dados;try{dados=JSON.parse(localStorage.getItem(CHAVE_CONTRATOS_CLASSICOS));}catch{}
    return new Set(Array.isArray(dados)?dados.filter(numero=>CONFIG.classico.contratos[numero]):[]);
}
function obterContratoClassicoDaTentativa(){
    return CONFIG.classico.contratos[tentativaDesafiosClassicos?.mapa]||null;
}
function contratoClassicoValidoNaTentativa(){
    const t=tentativaDesafiosClassicos,c=obterContratoClassicoDaTentativa();
    if(!t||!c)return false;
    if(c.objetivo==='semExplosivos')return t.explosivos===0;
    if(c.objetivo==='mareDeProva')return Boolean(mapaPersonalizadoAtivo?.contratoDaMareAtivo&&t.mareEnfrentada);
    return t.tipos.size>=c.quantidade;
}
function obterMultiplicadorDaMareClassica(){
    const c=CONFIG.classico.contratos[103];
    return mapaPersonalizadoAtivo?.classico&&mapaPersonalizadoAtivo.numeroClassico===103
        &&mapaPersonalizadoAtivo.contratoDaMareAtivo&&wave===c.quantidade ? c.multiplicadorVelocidade : 1;
}
function atualizarMareDoContratoClassico(){
    const c=CONFIG.classico.contratos[103];
    const ativa=obterMultiplicadorDaMareClassica()>1;
    document.querySelector('.palco-jogo')?.classList.toggle('mare-classica-ativa',ativa);
    if(ativa&&tentativaDesafiosClassicos){
        tentativaDesafiosClassicos.mareEnfrentada=true;
        mostrarAviso(localizar('Maré de prova! Inimigos 25% mais rápidos nesta wave.'));
    }
    atualizarDesafiosClassicosNaPartida();
}

function carregarMedalhasClassicas(){
    let dados;try{dados=JSON.parse(localStorage.getItem(CHAVE_DESAFIOS_CLASSICOS));}catch{}
    const validas=new Set(obterMapasClassicos().flatMap(m=>DESAFIOS_CLASSICOS.map(d=>`${m.numero}:${d.id}`)));
    return new Set(Array.isArray(dados)?dados.filter(id=>validas.has(id)):[]);
}
function iniciarDesafiosClassicos(){
    if (typeof reiniciarTentativaDeDominio === 'function') reiniciarTentativaDeDominio();
    tentativaDesafiosClassicos=mapaPersonalizadoAtivo?.classico
        ? {mapa:mapaPersonalizadoAtivo.numeroClassico,torres:0,tipos:new Set(),nucleos:0,explosivos:0,mareEnfrentada:false,concluida:false}:null;
    document.querySelector('.palco-jogo')?.classList.remove('mare-classica-ativa');
    const painel=document.getElementById('desafios-classicos-partida');
    if(painel){painel.hidden=!tentativaDesafiosClassicos;painel.open=false;}
    atualizarDesafiosClassicosNaPartida();
}
function registrarConstrucaoDesafioClassico(tipo){
    if(!mapaPersonalizadoAtivo?.classico||!tentativaDesafiosClassicos||partidaEncerrada)return;
    tentativaDesafiosClassicos.tipos.add(tipo);
    const c=obterConfiguracaoDaTorre(tipo);
    if(['mina','bomba'].includes(c.tipoDeItem))tentativaDesafiosClassicos.explosivos++;
    else tentativaDesafiosClassicos.torres++;
    atualizarDesafiosClassicosNaPartida();
}
function registrarNucleoDesafioClassico(){
    if(!mapaPersonalizadoAtivo?.classico||!tentativaDesafiosClassicos||partidaEncerrada)return;
    tentativaDesafiosClassicos.nucleos++;
    atualizarDesafiosClassicosNaPartida();
}
function desafiosValidosNaTentativa(){
    const t=tentativaDesafiosClassicos;
    if(!t)return [];
    return DESAFIOS_CLASSICOS.filter(d=>d.id==='semNucleos'?t.nucleos===0:d.id==='compacta'?t.torres<=CONFIG.classico.desafios.limiteTorresCompacta:t.tipos.size<=1);
}
function atualizarDesafiosClassicosNaPartida(){
    const painel=document.getElementById('desafios-classicos-partida');
    if(!painel||!tentativaDesafiosClassicos)return;
    const validos=desafiosValidosNaTentativa();
    painel.querySelector('summary').textContent=localizar('Desafios do mapa');
    const contrato=obterContratoClassicoDaTentativa();
    const mutacao=CONFIG.classico.mutacoes.variantes[mapaPersonalizadoAtivo.mutacaoDiaria]||obterMutacaoClassicaDoDia();
    painel.querySelector('div').innerHTML=DESAFIOS_CLASSICOS.map(d=>`<p>${d.icone} ${localizar(d.nome)} — ${localizar(validos.includes(d)?'Válido':'Fora desta tentativa')}</p>`).join('')
        +(contrato?`<p class="contrato-na-partida">◆ ${localizar(contrato.nome)} — ${localizar(contrato.objetivo==='mareDeProva'&&!mapaPersonalizadoAtivo?.contratoDaMareAtivo?'Contrato não ativado':contrato.objetivo==='mareDeProva'&&!tentativaDesafiosClassicos.mareEnfrentada?'Aguardando a wave da maré':contratoClassicoValidoNaTentativa()?'Contrato válido':'Contrato perdido nesta tentativa')}</p>`:'')
        +`<p class="mutacoes-na-partida">${localizar('Mutação genética')}: ${localizar(mutacao.nome)} (${localizar(mutacao.descricao)})</p>`;
}
function criarSeloDoContratoClassico(mapa){
    const contrato=CONFIG.classico.contratos[mapa.numero];
    if(!contrato)return '';
    const conquistado=carregarSelosClassicos().has(mapa.numero);
    const estado=localizar(conquistado?'Selo conquistado':'Selo disponível');
    return `<span class="classico-selo-contrato ${conquistado?'conquistado':''}" title="${localizar(contrato.nome)}: ${estado}" aria-label="${localizar('Contrato do mapa')}: ${localizar(contrato.nome)} — ${estado}">◆</span>`;
}
function criarContratoDoMapaClassico(mapa){
    const contrato=CONFIG.classico.contratos[mapa.numero];
    if(!contrato)return '';
    const conquistado=carregarSelosClassicos().has(mapa.numero);
    return `<div class="classico-contrato"><span aria-hidden="true">◆</span><div><strong>${localizar('Contrato do mapa')}: ${localizar(contrato.nome)}</strong><small>${localizar(conquistado?'Selo conquistado':'Selo disponível')}</small><p>${localizar(contrato.descricao,{quantidade:contrato.quantidade})}</p>${mapa.numero===103?`<button class="botao classico-botao-mare" aria-pressed="${contratoDaMareClassicaAtivo}" onclick="alternarContratoDaMareClassica()">${localizar(contratoDaMareClassicaAtivo?'Maré de prova ativada':'Ativar maré de prova')}</button>`:''}</div></div>`;
}
function criarDesafiosDoMapaClassico(mapa){
    const medalhas=carregarMedalhasClassicas();
    return `<details class="classico-desafios"><summary>${localizar('Desafios do mapa')} · ${DESAFIOS_CLASSICOS.filter(d=>medalhas.has(`${mapa.numero}:${d.id}`)).length}/3</summary>
        ${DESAFIOS_CLASSICOS.map(d=>`<div class="classico-desafio ${medalhas.has(`${mapa.numero}:${d.id}`)?'medalha-conquistada':''}"><span class="desafio-medalha" aria-hidden="true">${d.icone}</span><div><strong>${localizar(d.nome)}</strong><small>${localizar(medalhas.has(`${mapa.numero}:${d.id}`)?'Conquistada':'Não conquistada')}</small><p>${localizar(d.descricao,{limite:CONFIG.classico.desafios.limiteTorresCompacta})}</p></div></div>`).join('')}</details>`;
}
function criarResumoDesafiosClassicos(){
    return `<section class="classico-desafios-resumo"><strong>${localizar('Medalhas: {quantidade}/{total}',{quantidade:carregarMedalhasClassicas().size,total:obterMapasClassicos().length*DESAFIOS_CLASSICOS.length})}</strong><p>${localizar('Desafios acompanham todas as partidas clássicas. Vença em qualquer dificuldade e construa ao menos uma torre. Pode ganhar várias medalhas de uma vez; elas são colecionáveis, sem bônus de atributos ou moedas.')}</p></section>`;
}
function concluirDesafiosClassicos(){
    const t=tentativaDesafiosClassicos;
    if(!partidaVencida||!mapaPersonalizadoAtivo?.classico||!t||t.concluida||t.mapa!==mapaPersonalizadoAtivo.numeroClassico)return;
    t.concluida=true;
    if(t.torres<1)return;
    const medalhas=carregarMedalhasClassicas(),novas=desafiosValidosNaTentativa().filter(d=>!medalhas.has(`${t.mapa}:${d.id}`));
    if(!novas.length)return;
    for(const d of novas)medalhas.add(`${t.mapa}:${d.id}`);
    let anterior;
    try{
        anterior=localStorage.getItem(CHAVE_DESAFIOS_CLASSICOS);
        localStorage.setItem(CHAVE_DESAFIOS_CLASSICOS,JSON.stringify([...medalhas]));
        if(!atualizarSalvoAtivo())throw Error('slot');
        descricaoResultado.textContent+=' · '+localizar('Novas medalhas: {nomes}',{nomes:novas.map(d=>localizar(d.nome)).join(', ')});
    }catch{
        if(anterior!==undefined)try{if(anterior===null)localStorage.removeItem(CHAVE_DESAFIOS_CLASSICOS);else localStorage.setItem(CHAVE_DESAFIOS_CLASSICOS,anterior);}catch{}
        descricaoResultado.textContent+=' · '+localizar('Não foi possível salvar as medalhas.');
    }
}
function concluirContratoClassico(){
    const t=tentativaDesafiosClassicos,c=obterContratoClassicoDaTentativa();
    if(!partidaVencida||!t||!c||t.torres<1||!contratoClassicoValidoNaTentativa())return;
    const selos=carregarSelosClassicos();
    if(selos.has(t.mapa))return;
    selos.add(t.mapa);
    const anterior=localStorage.getItem(CHAVE_CONTRATOS_CLASSICOS);
    try{
        localStorage.setItem(CHAVE_CONTRATOS_CLASSICOS,JSON.stringify([...selos]));
        if(!atualizarSalvoAtivo())throw Error('slot');
        descricaoResultado.textContent+=' · '+localizar('Novo selo: {nome}',{nome:localizar(c.nome)});
    }catch{
        if(anterior===null)localStorage.removeItem(CHAVE_CONTRATOS_CLASSICOS);
        else localStorage.setItem(CHAVE_CONTRATOS_CLASSICOS,anterior);
        descricaoResultado.textContent+=' · '+localizar('Não foi possível salvar o selo.');
    }
}
