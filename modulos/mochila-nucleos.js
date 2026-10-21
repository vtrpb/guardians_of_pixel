const CHAVE_NUCLEOS_DE_SOBRECARGA = 'guardians-of-pixel-nucleos-sobrecarga-v1';
const temposDosNucleos = {dano:0,velocidade:0,alcance:0};
let nucleosVisuaisDaPartida = [];
const imagemDoNucleo = new Image();
imagemDoNucleo.src = 'assets/nucleo-sobrecarga.svg';

function obterEstoqueDeNucleos() {
    let salvo;
    try { salvo=JSON.parse(localStorage.getItem(CHAVE_NUCLEOS_DE_SOBRECARGA)); } catch {}
    // O núcleo antigo reunia dano e cadência; conservar ambos os benefícios.
    if(Number.isSafeInteger(salvo)&&salvo>=0)salvo={dano:salvo,velocidade:salvo,alcance:0};
    return Object.fromEntries(Object.keys(CONFIG.sobrecarga.tipos).map(tipo=>{
        const n=salvo?.[tipo];
        return [tipo,Number.isSafeInteger(n)&&n>=0?Math.min(n,CONFIG.sobrecarga.estoqueMaximo):0];
    }));
}
function obterQuantidadeDeNucleos(tipo) {
    const estoque=obterEstoqueDeNucleos();
    return tipo?estoque[tipo]||0:Object.values(estoque).reduce((a,b)=>a+b,0);
}
function obterTipoDoNucleoDaLoja(id) {
    return Object.keys(CONFIG.sobrecarga.tipos).find(tipo=>CONFIG.sobrecarga.tipos[tipo].id===id);
}
function obterMultiplicadorDoNucleo(tipo) {
    return temposDosNucleos[tipo]>0?CONFIG.sobrecarga.tipos[tipo].multiplicador:1;
}
function alterarEstoqueDeNucleos(delta,custo=0,tipo='dano') {
    const estoque=obterEstoqueDeNucleos();
    if(!(tipo in estoque))return false;
    const quantidade=estoque[tipo]+delta;
    if(quantidade<0||quantidade>CONFIG.sobrecarga.estoqueMaximo||fragmentosPixel<custo)return false;
    const saldoAnterior=fragmentosPixel;
    let estoqueAnterior,fragmentosAnteriores;
    try{
        estoqueAnterior=localStorage.getItem(CHAVE_NUCLEOS_DE_SOBRECARGA);
        fragmentosAnteriores=localStorage.getItem(CHAVE_FRAGMENTOS_PIXEL);
        estoque[tipo]=quantidade;
        localStorage.setItem(CHAVE_NUCLEOS_DE_SOBRECARGA,JSON.stringify(estoque));
        if(custo)localStorage.setItem(CHAVE_FRAGMENTOS_PIXEL,String(saldoAnterior-custo));
        fragmentosPixel=saldoAnterior-custo;
        if(!atualizarSalvoAtivo())throw Error('slot');
        atualizarControleDaSobrecarga();return true;
    }catch{
        fragmentosPixel=saldoAnterior;
        try{
            if(estoqueAnterior!==undefined)estoqueAnterior===null?localStorage.removeItem(CHAVE_NUCLEOS_DE_SOBRECARGA):localStorage.setItem(CHAVE_NUCLEOS_DE_SOBRECARGA,estoqueAnterior);
            if(custo&&fragmentosAnteriores!==undefined)fragmentosAnteriores===null?localStorage.removeItem(CHAVE_FRAGMENTOS_PIXEL):localStorage.setItem(CHAVE_FRAGMENTOS_PIXEL,fragmentosAnteriores);
        }catch{}
        mostrarAviso(localizar('Não foi possível salvar o núcleo. Tente novamente.'));return false;
    }
}
function partidaPermiteSobrecarga(){return jogoIniciado&&!partidaEncerrada&&(!mapaPersonalizadoAtivo||mapaPersonalizadoAtivo.classico);}
function podeUsarNucleo(tipo){return Boolean(CONFIG.sobrecarga.tipos[tipo])&&partidaPermiteSobrecarga()&&!jogoPausado&&!tutorialAtivo&&wave>=1&&torres.length>0&&!temposDosNucleos[tipo]&&obterQuantidadeDeNucleos(tipo)>0;}
function ativarNucleoDeSobrecarga(tipo){
    if(!podeUsarNucleo(tipo)||!alterarEstoqueDeNucleos(-1,0,tipo))return;
    temposDosNucleos[tipo]=CONFIG.sobrecarga.duracao;
    if(typeof registrarNucleoDesafioClassico==='function')registrarNucleoDesafioClassico();
    torres.forEach(atualizarAtributosDaTorreComBonus);atualizarControleDaSobrecarga();
    mostrarAviso(localizar('{nome} ativado para todas as torres!',{nome:localizar(CONFIG.sobrecarga.tipos[tipo].nome)}));
}
function tentarSoltarNucleo(inimigo){
    if(!partidaPermiteSobrecarga()||inimigo.nucleoSorteado||inimigo.restauradoPeloCurador||inimigo.invocadoSemNucleo||tutorialAtivo)return;
    inimigo.nucleoSorteado=true;
    if(Math.random()>=(tipoEhBoss(inimigo.tipo)?CONFIG.sobrecarga.chanceBoss:CONFIG.sobrecarga.chanceInimigo))return;
    const tipos=Object.keys(CONFIG.sobrecarga.tipos),tipo=tipos[Math.floor(Math.random()*tipos.length)];
    if(!alterarEstoqueDeNucleos(1,0,tipo))return;
    nucleosVisuaisDaPartida.push({x:inimigo.x,y:inimigo.y,tipo,restante:CONFIG.sobrecarga.duracaoDoDrop});
    mostrarAviso(localizar('{nome} coletado!',{nome:localizar(CONFIG.sobrecarga.tipos[tipo].nome)}));
}
function atualizarSobrecarga(delta){
    if(!partidaPermiteSobrecarga()||jogoPausado)return;
    let terminou=false;
    for(const tipo of Object.keys(temposDosNucleos)){const antes=temposDosNucleos[tipo];temposDosNucleos[tipo]=Math.max(0,antes-delta);terminou ||= antes>0&&!temposDosNucleos[tipo];}
    for(const n of nucleosVisuaisDaPartida)n.restante-=delta;
    nucleosVisuaisDaPartida=nucleosVisuaisDaPartida.filter(n=>n.restante>0);
    if(terminou)torres.forEach(atualizarAtributosDaTorreComBonus);
}
function limparSobrecargaDaPartida(){
    const ativa=Object.values(temposDosNucleos).some(t=>t>0);
    for(const tipo of Object.keys(temposDosNucleos))temposDosNucleos[tipo]=0;
    nucleosVisuaisDaPartida=[];fecharMochila(false);
    if(ativa)torres.forEach(atualizarAtributosDaTorreComBonus);
    atualizarControleDaSobrecarga();
}
function mochilaEstaAberta(){return !document.getElementById('mochila-nucleos').hidden;}
function fecharMochila(foco=true){const painel=document.getElementById('mochila-nucleos');painel.hidden=true;document.getElementById('botao-sobrecarga').setAttribute('aria-expanded','false');if(foco)document.getElementById('botao-sobrecarga').focus();}
function alternarMochila(){
    if(mochilaEstaAberta()){fecharMochila();return;}
    if(!partidaPermiteSobrecarga()||jogoPausado||tutorialAtivo)return;
    const painel=document.getElementById('mochila-nucleos');
    painel.querySelector('.mochila-itens').innerHTML=Object.keys(CONFIG.sobrecarga.tipos).map(tipo=>`<article class="mochila-item"><span class="icone-nucleo nucleo-${tipo}" aria-hidden="true"></span><div><h3>${localizar(CONFIG.sobrecarga.tipos[tipo].nome)}</h3><p>${obterDescricaoDaSobrecarga(tipo)}</p><small data-estoque-nucleo="${tipo}"></small><button class="botao" type="button" data-usar-nucleo="${tipo}" onclick="ativarNucleoDeSobrecarga('${tipo}')"></button></div></article>`).join('');
    painel.hidden=false;document.getElementById('botao-sobrecarga').setAttribute('aria-expanded','true');atualizarControleDaSobrecarga();document.getElementById('fechar-mochila').focus();
}
function atualizarControleDaSobrecarga(){
    const botao=document.getElementById('botao-sobrecarga');if(!botao)return;
    botao.hidden=!jogoIniciado||Boolean(mapaPersonalizadoAtivo&&!mapaPersonalizadoAtivo.classico);
    botao.disabled=!partidaPermiteSobrecarga()||jogoPausado||tutorialAtivo;
    const estoque=obterEstoqueDeNucleos(),ativos=Object.keys(temposDosNucleos).filter(t=>temposDosNucleos[t]>0);
    botao.classList.toggle('sobrecarga-ativa',ativos.length>0);
    const texto=ativos.length?localizar('Efeitos ativos: {quantidade}',{quantidade:ativos.length}):localizar('Núcleos: {quantidade}',{quantidade:Object.values(estoque).reduce((a,b)=>a+b,0)});
    const estado=document.getElementById('estado-sobrecarga');if(estado.textContent!==texto)estado.textContent=texto;
    if(mochilaEstaAberta())for(const tipo of Object.keys(estoque)){
        const usar=document.querySelector(`[data-usar-nucleo="${tipo}"]`),saldo=document.querySelector(`[data-estoque-nucleo="${tipo}"]`);
        const legenda=temposDosNucleos[tipo]>0?localizar('Ativo: {segundos}s',{segundos:Math.ceil(temposDosNucleos[tipo]/1000)}):localizar('Usar núcleo');
        if(usar.textContent!==legenda)usar.textContent=legenda;
        usar.disabled=!podeUsarNucleo(tipo);saldo.textContent=localizar('Núcleos: {quantidade}',{quantidade:estoque[tipo]});
    }
}
function obterDescricaoDaSobrecarga(tipo){const c=CONFIG.sobrecarga.tipos[tipo];return localizar('+{percentual}% de {atributo} por {segundos}s em todas as torres.',{percentual:Math.round((c.multiplicador-1)*100),atributo:localizar(c.atributo),segundos:CONFIG.sobrecarga.duracao/1000});}
function criarOfertaDeNucleoNaLoja(){return Object.entries(CONFIG.sobrecarga.tipos).map(([tipo,c])=>`<article class="loja-nucleo"><span class="icone-nucleo nucleo-${tipo}" aria-hidden="true"></span><div><h3>${localizar(c.nome)}</h3><p>${obterDescricaoDaSobrecarga(tipo)}</p><small>${localizar('Núcleos: {quantidade}',{quantidade:obterQuantidadeDeNucleos(tipo)})}</small></div><button class="botao" type="button" data-comprar-nucleo="${tipo}" onclick="comprarItemDaLoja('${c.id}')" ${podeComprarItemDaLoja(c.id)?'':'disabled'}>${localizar('Comprar 1 núcleo · {preco}◆',{preco:c.custoNaLoja})}</button></article>`).join('');}
function comprarNucleoDeSobrecarga(id){const tipo=obterTipoDoNucleoDaLoja(id);if(tipo&&podeComprarItemDaLoja(id)&&alterarEstoqueDeNucleos(1,CONFIG.sobrecarga.tipos[tipo].custoNaLoja,tipo))desbloquearConquista('primeiraCompra');atualizarSaldoDeFragmentos();mostrarLoja();}
function desenharNucleosColetados(){
    if(!imagemDoNucleo.complete||!imagemDoNucleo.naturalWidth)return;
    ctx.save();for(const n of nucleosVisuaisDaPartida){const p=1-n.restante/CONFIG.sobrecarga.duracaoDoDrop;ctx.globalAlpha=Math.min(1,n.restante/400);ctx.filter=n.tipo==='dano'?'hue-rotate(170deg)':n.tipo==='alcance'?'hue-rotate(70deg)':'none';ctx.drawImage(imagemDoNucleo,n.x-15,n.y-20-p*35,30,30);ctx.filter='none';ctx.fillStyle='#c0ffef';ctx.font='bold 15px monospace';ctx.fillText('+1',n.x+16,n.y-p*35);}ctx.restore();
}
for(const[pt,en,es]of[
 ['Use Fragmentos de Pixel para comprar equipamentos e consumíveis.','Use Pixel Fragments to buy equipment and consumables.','Usa Fragmentos de Píxel para comprar equipamiento y consumibles.'],
 ['Núcleos','Cores','Núcleos'],['Mochila','Backpack','Mochila'],['Núcleos de Sobrecarga','Overcharge Cores','Núcleos de Sobrecarga'],
 ['Núcleo de Dano','Damage Core','Núcleo de Daño'],['Núcleo de Velocidade','Attack Speed Core','Núcleo de Velocidad'],['Núcleo de Alcance','Range Core','Núcleo de Alcance'],
 ['Dano','Damage','Daño'],['Velocidade','Speed','Velocidad'],['Alcance','Range','Alcance'],['dano','damage','daño'],['velocidade de ataque','attack speed','velocidad de ataque'],['alcance','range','alcance'],
 ['Núcleos: {quantidade}','Cores: {quantidade}','Núcleos: {quantidade}'],['Usar núcleo','Use core','Usar núcleo'],['Ativo: {segundos}s','Active: {segundos}s','Activo: {segundos}s'],
 ['Efeitos ativos: {quantidade}','Active effects: {quantidade}','Efectos activos: {quantidade}'],
 ['Comprar 1 núcleo · {preco}◆','Buy 1 core · {preco}◆','Comprar 1 núcleo · {preco}◆'],
 ['+{percentual}% de {atributo} por {segundos}s em todas as torres.','+{percentual}% {atributo} for {segundos}s on all towers.','+{percentual}% de {atributo} durante {segundos}s en todas las torres.'],
 ['{nome} ativado para todas as torres!','{nome} activated for all towers!','¡{nome} activado para todas las torres!'],['{nome} coletado!','{nome} collected!','¡{nome} recogido!'],
 ['Não foi possível salvar o núcleo. Tente novamente.','Could not save the core. Try again.','No se pudo guardar el núcleo. Inténtalo de nuevo.'],
 ['Escolha um núcleo. A batalha continua enquanto a mochila está aberta.','Choose a core. The battle continues while the backpack is open.','Elige un núcleo. La batalla continúa mientras la mochila está abierta.'],
 ['Consumíveis temporários para todas as torres.','Temporary consumables for all towers.','Consumibles temporales para todas las torres.']
]){TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es;}
