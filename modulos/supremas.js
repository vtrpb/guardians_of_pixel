// Progresso por slot; combate e dificuldade centralizados em CONFIG.
const CHAVE_SUPREMAS = 'guardians-of-pixel-supremas-v1';
let desafioSupremoAtivo = null;
let equipeAntesDoDesafioSupremo = null;
let supremaDaPartida = null;
let supremaFoiConstruida = false;
let cargaSuprema = 0;
let escudoSupremoRestante = 0;
let efeitoSupremoRestante = 0;
let alvosDoRaioSupremo = [];
let wavesVencidasNoDesafio = new Set();

function obterTiposSupremos() { return Object.keys(CONFIG.supremas.desafios); }
function obterMultiplicadorDaFraquezaSuprema(inimigo, tipoDaDefesa) {
    return CONFIG.inimigo[inimigo?.tipo]?.superBossDeEvento
        && CONFIG.supremas.fraquezaPorSuperBoss[inimigo.tipo] === tipoDaDefesa
        ? CONFIG.supremas.multiplicadorDaFraqueza : 1;
}
function obterSuperBossVulneravelASuprema(tipo) {
    return Object.keys(CONFIG.supremas.fraquezaPorSuperBoss)
        .find(superBoss => CONFIG.supremas.fraquezaPorSuperBoss[superBoss] === tipo);
}
function carregarSupremas() {
    let dados;
    try { dados = JSON.parse(localStorage.getItem(CHAVE_SUPREMAS)); } catch {}
    const desbloqueadas = [...new Set(Array.isArray(dados?.desbloqueadas)
        ? dados.desbloqueadas.filter(tipo => obterTiposSupremos().includes(tipo)) : [])];
    return {desbloqueadas, equipada: desbloqueadas.includes(dados?.equipada) ? dados.equipada : null};
}
function salvarSupremas(dados) {
    const anterior = localStorage.getItem(CHAVE_SUPREMAS);
    try {
        localStorage.setItem(CHAVE_SUPREMAS, JSON.stringify(dados));
        if (!atualizarSalvoAtivo()) throw new Error('save');
        return true;
    } catch {
        try {
            if (anterior === null) localStorage.removeItem(CHAVE_SUPREMAS);
            else localStorage.setItem(CHAVE_SUPREMAS, anterior);
        } catch {}
        return false;
    }
}
function selecionarSuprema(tipo, naSelecao = false) {
    if (jogoIniciado || desafioSupremoAtivo) return;
    const dados = carregarSupremas();
    if (tipo !== null && !dados.desbloqueadas.includes(tipo)) return;
    dados.equipada = tipo;
    if (!salvarSupremas(dados)) {
        const aviso = document.getElementById('aviso-supremas');
        if (aviso) aviso.textContent = localizar('Não foi possível salvar a Suprema. Tente novamente.');
        return;
    }
    const equipeAnterior = naSelecao ? [...selecaoDeDefesasEmEdicao] : [...defesasSelecionadasParaPartida];
    defesasSelecionadasParaPartida = normalizarSelecaoDeDefesas(defesasSelecionadasParaPartida);
    if (naSelecao) selecaoDeDefesasEmEdicao = normalizarSelecaoDeDefesas(selecaoDeDefesasEmEdicao, false);
    salvarSelecaoDeDefesas();
    atualizarSalvoAtivo();
    if (naSelecao) mostrarSelecaoDeDefesas(); else mostrarSupremas();
    const equipeAtual = naSelecao ? selecaoDeDefesasEmEdicao : defesasSelecionadasParaPartida;
    const defesaRemovida = equipeAnterior.find(defesa => !equipeAtual.has(defesa));
    if (defesaRemovida) {
        const aviso = document.getElementById('aviso-supremas');
        if (aviso) aviso.textContent = localizar('A Suprema ocupou uma vaga; {nome} saiu da equipe.',
            {nome: obterNomeLocalizado(CONFIG.torre.tipos[defesaRemovida])});
    }
}
function descricaoDoPoderSupremo(tipo) {
    const p = CONFIG.torre.tipos[tipo].poder;
    if (tipo === 'supremaCronarca') return localizar('Paralisa os inimigos atuais por {duracao}s; chefes por {boss}s.', {duracao:p.duracao/1000,boss:p.duracaoBoss/1000});
    if (tipo === 'supremaTempestade') return localizar('Atinge todos os inimigos atuais: {dano} de dano; {boss} em chefes.', {dano:p.dano,boss:p.danoBoss});
    if (tipo === 'supremaBastiao') return localizar('Protege todas as torres contra tiros por {duracao}s.', {duracao:p.duracao/1000});
    if (tipo === 'supremaPurificadora') return localizar('Restaura até {tiros} acertos sofridos por cada torre ainda construída.', {tiros:p.tirosRestaurados});
    return localizar('Expõe todos os inimigos atuais: +{percentual}% de dano recebido por {duracao}s.',
        {percentual:Math.round(p.danoAdicional*100),duracao:p.duracao/1000});
}
function dicaDoDesafioSupremo(tipo) {
    const dicas = {
        supremaCronarca: 'Ondas aceleradas: planeje a cobertura e use gelo para conter os rápidos.',
        supremaTempestade: 'Enxames densos: dano em área e posicionamento são essenciais.',
        supremaBastiao: 'Cerco de sabotadores: proteja os atacantes com iscas e canhões blindados.',
        supremaPurificadora: 'Resista aos ataques e recupere suas defesas entre as waves.',
        supremaReveladora: 'Controle os rápidos sem deixar os blindados atravessarem.'
    };
    return localizar(dicas[tipo]);
}
function criarSelecaoSupremaDaPartida() {
    if (desafioSupremoAtivo) return '';
    const dados = carregarSupremas();
    return `<section class="suprema-selecao"><strong>${localizar('Torre Suprema')}</strong>
        <p>${localizar('A Suprema ocupa uma vaga da equipe. Uma única construção por partida, mesmo após vender ou perder a torre.')}</p>
        <div class="suprema-opcoes"><button class="botao" type="button" aria-pressed="${!dados.equipada}" onclick="selecionarSuprema(null,true)">${localizar('Sem Suprema')}</button>
        ${dados.desbloqueadas.map(tipo=>`<button class="botao" type="button" aria-pressed="${dados.equipada===tipo}" onclick="selecionarSuprema('${tipo}',true)">${localizar(CONFIG.torre.tipos[tipo].nome)}</button>`).join('')}</div>
        ${dados.desbloqueadas.length ? '' : `<small>${localizar('Conquiste esta Suprema no desafio próprio do lobby.')}</small>`}
        <p id="aviso-supremas" role="status"></p></section>`;
}
function criarAbasDeSupremasEDominio(abaAtiva) {
    const abas = [
        { id: 'supremas', nome: 'Torres Supremas' },
        { id: 'dominio', nome: 'Domínio das torres' }
    ];
    return `<nav class="abas-supremas-dominio" role="tablist" aria-label="${localizar('Torres Supremas')} / ${localizar('Domínio das torres')}">
        ${abas.map(aba => `<button id="aba-supremas-dominio-${aba.id}" class="botao" type="button" role="tab" aria-controls="painel-supremas-dominio" aria-selected="${aba.id === abaAtiva}" tabindex="${aba.id === abaAtiva ? 0 : -1}" onclick="selecionarAbaDeSupremasEDominio('${aba.id}')" onkeydown="teclaNasAbasDeSupremasEDominio(event)">${localizar(aba.nome)}</button>`).join('')}
    </nav>`;
}
function selecionarAbaDeSupremasEDominio(aba) {
    if (aba === 'supremas') mostrarSupremas();
    else if (aba === 'dominio') mostrarDominioDasTorres('supremas');
    document.getElementById(`aba-supremas-dominio-${aba}`)?.focus();
}
function teclaNasAbasDeSupremasEDominio(evento) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(evento.key)) return;
    evento.preventDefault();
    const selecionada = document.querySelector('.abas-supremas-dominio [aria-selected="true"]')?.id;
    const proxima = evento.key === 'Home' ? 'supremas' : evento.key === 'End' ? 'dominio'
        : selecionada === 'aba-supremas-dominio-supremas' ? 'dominio' : 'supremas';
    selecionarAbaDeSupremasEDominio(proxima);
}
function mostrarSupremas() {
    if (jogoIniciado) return;
    definirTelaDoMenuAberta('supremas');
    const dados = carregarSupremas();
    conteudoMenu.innerHTML = `${criarCabecalhoConteudoMenu(localizar('Torres Supremas'),localizar('Conquiste seu poder. Nenhuma compra. Nenhum desbloqueio por fase.'))}
        ${criarAbasDeSupremasEDominio('supremas')}
        <div id="painel-supremas-dominio" role="tabpanel" aria-labelledby="aba-supremas-dominio-supremas">
        <section class="supremas-introducao"><strong>${localizar('DESAFIOS DIFÍCEIS')}</strong><p>${localizar('Exército emprestado e fixo, sem bônus da loja, núcleos ou Supremas. Uma invasão na base encerra a tentativa. Vença todas as waves para conquistar a torre permanentemente.')}</p>
        <details><summary>${localizar('Exército do desafio')}</summary><p>${CONFIG.supremas.equipeDoDesafio.map(tipo=>localizar(CONFIG.torre.tipos[tipo].nome)).join(' · ')}</p></details>
        <p>${localizar('Escolha uma Suprema para sua equipe. Ela tem atributos fixos e um poder manual que recarrega durante o combate.')}</p>
        <p>${localizar('A Suprema ocupa uma vaga da equipe. Uma única construção por partida, mesmo após vender ou perder a torre.')}</p></section>
        <p id="aviso-supremas" role="status"></p><div class="supremas-grade">${obterTiposSupremos().map(tipo=>{
            const c=CONFIG.torre.tipos[tipo],d=CONFIG.supremas.desafios[tipo],obtida=dados.desbloqueadas.includes(tipo);
            return `<article class="suprema-cartao" data-suprema="${tipo}"><canvas class="miniatura-torre-album" width="150" height="150" data-tipo-torre="${tipo}" data-nivel-torre="0" aria-hidden="true"></canvas>
            <small>${localizar(obtida?'Conquistada':'Desafio pendente')}</small><h2>${localizar(c.nome)}</h2>
            <p>${localizar('{custo} créditos',{custo:c.custo})} · ${c.dano} ${localizar('Dano')} · ${c.alcance} ${localizar('Alcance')}</p>
            <h3>${localizar(c.poder.nome)}</h3><p>${descricaoDoPoderSupremo(tipo)}</p><small>${localizar('Recarga: {segundos}s de combate.',{segundos:c.poder.carga/1000})}</small>
            <p>${localizar('Efetiva contra {nome}: +{percentual}% de dano.', {
                nome:localizarEvento(CONFIG.inimigo[obterSuperBossVulneravelASuprema(tipo)].nome),
                percentual:obterPercentualInteiro(CONFIG.supremas.multiplicadorDaFraqueza-1)
            })}</p>
            <div class="suprema-desafio"><h3>${localizar(d.nome)}</h3><p>${localizar('{waves} waves · {limite} torres · {creditos} créditos iniciais',{waves:d.waves,limite:d.limite,creditos:d.creditos})}</p>
            <p>${localizar('Vida ×{vida} · velocidade ×{velocidade} · chefe a cada {intervalo} waves',{vida:d.vida,velocidade:d.velocidade,intervalo:d.intervaloBoss})}</p>
            <small>${localizar('{creditos} créditos por disparo · dois chefes na última wave',{creditos:d.recompensaPorTiro||CONFIG.supremas.recompensaPorTiro})}</small>
            <p>${dicaDoDesafioSupremo(tipo)}</p>
            <button class="botao" type="button" data-desafio-supremo="${tipo}" onclick="iniciarDesafioSupremo('${tipo}')">${localizar(obtida?'Repetir desafio':'Enfrentar desafio')}</button></div>
            <button class="botao" type="button" data-equipar-suprema="${tipo}" aria-pressed="${dados.equipada===tipo}" onclick="selecionarSuprema('${tipo}')" ${obtida?'':'disabled'}>${localizar(dados.equipada===tipo?'Selecionada':'Selecionar Suprema')}</button></article>`;
        }).join('')}</div><button class="botao" type="button" onclick="selecionarSuprema(null)">${localizar('Sem Suprema')}</button></div>`;
    desenharMiniaturasDasTorresDoAlbum();
}
function iniciarDesafioSupremo(tipo) {
    const d=CONFIG.supremas.desafios[tipo];
    if (!d || jogoIniciado) return;
    fecharConteudoMenu();
    if (mapaPersonalizadoAtivo) desativarMapaPersonalizado();
    equipeAntesDoDesafioSupremo = new Set(defesasSelecionadasParaPartida);
    desafioSupremoAtivo = tipo;
    faseSelecionadaAntesDoMapaPersonalizado = faseSelecionada;
    mapaPersonalizadoAtivo = {suprema:tipo,nome:localizar(d.nome),descricao:localizar('DESAFIOS DIFÍCEIS'),tema:d.tema,idDoCaminho:d.caminho,
        criador:localizar('Torres Supremas'),nivelDeDecoracoes:0,creditosIniciais:d.creditos,limiteDeTorres:d.limite,
        waves:Array.from({length:d.waves},(_,i)=>{
            const n=i+1;
            const regras=CONFIG.supremas;
            const grupos=[{tipo:'normal',quantidade:d.comuns+d.crescimento*n},{tipo:'rapido',quantidade:d.rapidos?d.rapidos+Math.floor(n/regras.wavesPorRapido):0},
                {tipo:'elite',quantidade:d.elites+Math.floor(n/regras.wavesPorElite)}];
            if (d.sabotadores && n>=regras.primeiraWaveSabotador) grupos.push({tipo:'sabotador',quantidade:d.sabotadores+Math.floor(n/regras.wavesPorSabotador)});
            if (n%d.intervaloBoss===0) grupos.push({tipo:'boss',quantidade:n===d.waves?regras.chefesNaUltimaWave:1});
            return {grupos};
        })};
    faseSelecionada=CONFIG.editorDeFases.numeroInterno;
    defesasSelecionadasParaPartida=new Set(CONFIG.supremas.equipeDoDesafio);
    iniciarPartida(false);
    mostrarAviso(localizar('Desafio Supremo: exército fixo, sem bônus externos.'));
}
function encerrarDesafioSupremo() {
    desafioSupremoAtivo=null;
    if (equipeAntesDoDesafioSupremo) defesasSelecionadasParaPartida=equipeAntesDoDesafioSupremo;
    equipeAntesDoDesafioSupremo=null;
    supremaDaPartida=null;
    atualizarControleSupremo();
}
function concluirDesafioSupremo() {
    const d=CONFIG.supremas.desafios[desafioSupremoAtivo];
    if (!d || partidaEncerrada || wave!==d.waves || wavesVencidasNoDesafio.size!==d.waves || inimigos.length || inimigosParaCriar) return;
    partidaEncerrada=true;partidaVencida=true;tiros=[];tirosDosInimigos=[];
    fragmentosRecebidosNoResultado=0;experienciaRecebidaNaPartida=0;
    tocarEfeitoVitoria();mostrarPainelDeResultado(true);salvarConquistaSuprema();
}
function salvarConquistaSuprema() {
    if (!desafioSupremoAtivo || !partidaEncerrada || !partidaVencida) return;
    const dados=carregarSupremas();
    if (!dados.desbloqueadas.includes(desafioSupremoAtivo)) dados.desbloqueadas.push(desafioSupremoAtivo);
    const salvo=salvarSupremas(dados);
    seloResultado.textContent=localizar('Torres Supremas');
    descricaoResultado.textContent=salvo ? localizar('{nome} conquistada! Selecione-a no lobby.',{nome:localizar(CONFIG.torre.tipos[desafioSupremoAtivo].nome)}) : localizar('Não foi possível salvar a Suprema. Tente novamente.');
    document.getElementById('repetir-save-suprema')?.remove();
    if (!salvo) {
        const botao=document.createElement('button');botao.id='repetir-save-suprema';botao.className='botao';botao.textContent=localizar('Tentar salvar novamente');
        botao.onclick=salvarConquistaSuprema;descricaoResultado.after(botao);
    }
}
function prepararSupremaDaPartida() {
    supremaDaPartida=desafioSupremoAtivo?null:carregarSupremas().equipada;
    supremaFoiConstruida=false;cargaSuprema=0;escudoSupremoRestante=0;efeitoSupremoRestante=0;alvosDoRaioSupremo=[];
    wavesVencidasNoDesafio=new Set();
    document.getElementById('repetir-save-suprema')?.remove();
}
function obterSupremaConstruida() { return torres.find(t=>t.tipo===supremaDaPartida && CONFIG.torre.tipos[t.tipo]?.suprema); }
function combateSupremoAtivo() { return jogoIniciado&&!jogoPausado&&!partidaEncerrada&&!tutorialAtivo&&wave>0; }
function atualizarPoderSupremo(delta) {
    if (!combateSupremoAtivo()) return;
    const torre=obterSupremaConstruida();
    escudoSupremoRestante=torre?Math.max(0,escudoSupremoRestante-delta):0;
    efeitoSupremoRestante=Math.max(0,efeitoSupremoRestante-delta);
    for (const inimigo of inimigos) inimigo.estaseSupremaRestante=Math.max(0,(inimigo.estaseSupremaRestante||0)-delta);
    for (const inimigo of inimigos) inimigo.vulnerabilidadeSupremaRestante=Math.max(0,(inimigo.vulnerabilidadeSupremaRestante||0)-delta);
    if (torre && (inimigos.some(i=>i.vida>0)||inimigosParaCriar>0)) cargaSuprema=Math.min(CONFIG.torre.tipos[torre.tipo].poder.carga,cargaSuprema+delta);
}
function podeAtivarPoderSupremo() {
    const torre=obterSupremaConstruida();
    return Boolean(torre&&combateSupremoAtivo()&&inimigos.some(i=>i.vida>0)&&cargaSuprema>=CONFIG.torre.tipos[torre.tipo].poder.carga);
}
function ativarPoderSupremo() {
    if (!podeAtivarPoderSupremo()) return;
    const torre=obterSupremaConstruida(),p=CONFIG.torre.tipos[torre.tipo].poder;
    cargaSuprema=0;efeitoSupremoRestante=900;alvosDoRaioSupremo=[];
    if (torre.tipo==='supremaCronarca') {
        for (const inimigo of inimigos) if(inimigo.vida>0) inimigo.estaseSupremaRestante=tipoEhBoss(inimigo.tipo)?p.duracaoBoss:p.duracao;
    } else if (torre.tipo==='supremaTempestade') {
        for (const inimigo of inimigos) if(inimigo.vida>0) {
            alvosDoRaioSupremo.push({x:inimigo.x,y:inimigo.y});
            aplicarDanoAoInimigo(inimigo,tipoEhBoss(inimigo.tipo)?p.danoBoss:p.dano,Date.now(),{tipoDaDefesa:torre.tipo,torreOrigem:torre});
        }
    } else if (torre.tipo==='supremaBastiao') {
        escudoSupremoRestante=p.duracao;
    } else if (torre.tipo==='supremaPurificadora') {
        for (const defesa of torres) {
            defesa.tirosRecebidos=Math.max(0,(defesa.tirosRecebidos||0)-p.tirosRestaurados);
            defesa.tirosDaTorretaRecebidos=Math.max(0,(defesa.tirosDaTorretaRecebidos||0)-p.tirosRestaurados);
        }
    } else if (torre.tipo==='supremaReveladora') {
        for (const inimigo of inimigos) if(inimigo.vida>0) {
            inimigo.vulnerabilidadeSupremaRestante=p.duracao;
            inimigo.percentualDeVulnerabilidadeSuprema=p.danoAdicional;
        }
    }
    mostrarAviso(localizar(p.nome));atualizarControleSupremo();
}
function atualizarControleSupremo() {
    const botao=document.getElementById('botao-poder-supremo');if(!botao)return;
    const torre=obterSupremaConstruida();botao.hidden=!jogoIniciado||!torre||partidaEncerrada;
    if (botao.hidden) return;
    const p=CONFIG.torre.tipos[torre.tipo].poder,pronto=cargaSuprema>=p.carga;
    botao.disabled=!podeAtivarPoderSupremo();botao.classList.toggle('suprema-pronta',pronto);
    botao.querySelector('strong').textContent=localizar(p.nome);
    botao.querySelector('small').textContent=escudoSupremoRestante>0?localizar('Ativo: {segundos}s',{segundos:Math.ceil(escudoSupremoRestante/1000)}):pronto?localizar('Poder Supremo pronto!'):localizar('Carregando: {percentual}%',{percentual:Math.floor(cargaSuprema/p.carga*100)});
    botao.querySelector('progress').value=cargaSuprema/p.carga;
    botao.title=descricaoDoPoderSupremo(torre.tipo);
}
function desenharArmamentoSupremo(c,e) {
    const ret=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    ret('#191d30',-19,-22,38,33);ret(e.corCanhao,-15,-19,30,25);
    if(e.identidadeSuprema==='tempo') {
        ret(e.corDetalhe,-18,-52,36,6);ret(e.corDetalhe,-18,-26,36,6);
        for(let i=0;i<4;i++){const w=14-i*3;ret(e.corCanhao,-w,-46+i*4,w*2,4);ret(e.corCanhao,-w,-30-i*4,w*2,4);}
        ret(e.corDetalhe,-2,-43,4,19);
    } else if(e.identidadeSuprema==='tempestade') {
        for(const lado of [-1,1]){ret(e.corCanhao,lado*19-4,-47,8,36);ret(e.corDetalhe,lado*19-7,-53,14,9);}
        ret(e.corCanhao,-5,-62,10,40);ret(e.corDetalhe,-8,-65,16,10);
    } else if(e.identidadeSuprema==='purificadora') {
        ret(e.corCanhao,-17,-47,34,24);ret(e.corDetalhe,-5,-59,10,42);
        ret(e.corDetalhe,-17,-46,34,8);ret(e.corDetalhe,-7,-52,14,34);
    } else if(e.identidadeSuprema==='reveladora') {
        ret(e.corCanhao,-25,-43,50,28);ret(e.corDetalhe,-29,-40,8,18);ret(e.corDetalhe,21,-40,8,18);
        ret('#191d30',-16,-59,32,26);ret(e.corDetalhe,-12,-55,24,18);
        ret(e.corCanhao,-6,-66,12,8);
    } else {
        ret(e.corCanhao,-26,-38,52,18);ret(e.corDetalhe,-26,-46,10,12);ret(e.corDetalhe,-5,-46,10,12);ret(e.corDetalhe,16,-46,10,12);
        ret('#191d30',-8,-58,16,31);ret(e.corDetalhe,-5,-56,10,25);
    }
    ret(e.corDetalhe,-18,8,8,5);ret(e.corDetalhe,-4,8,8,5);ret(e.corDetalhe,10,8,8,5);
}
function desenharEfeitosSupremos() {
    ctx.save();ctx.lineWidth=3;
    if(escudoSupremoRestante>0){ctx.strokeStyle='#ffe29a';for(const torre of torres)ctx.strokeRect(torre.x-32,torre.y-32,64,64);}
    ctx.strokeStyle='#83e9ef';for(const inimigo of inimigos)if(inimigo.estaseSupremaRestante>0)ctx.strokeRect(inimigo.x-17,inimigo.y-17,34,34);
    ctx.strokeStyle='#e9afff';for(const inimigo of inimigos)if(inimigo.vulnerabilidadeSupremaRestante>0)ctx.strokeRect(inimigo.x-20,inimigo.y-20,40,40);
    if(efeitoSupremoRestante>0){ctx.globalAlpha=efeitoSupremoRestante/900;ctx.strokeStyle='#eac9ff';for(const alvo of alvosDoRaioSupremo){ctx.beginPath();ctx.moveTo(alvo.x+12,alvo.y-85);ctx.lineTo(alvo.x-8,alvo.y-40);ctx.lineTo(alvo.x+8,alvo.y-40);ctx.lineTo(alvo.x,alvo.y);ctx.stroke();}}
    ctx.restore();
}

for (const [pt,en,es] of [
    ['Supremas','Supremes','Supremas'],['Torres Supremas','Supreme Towers','Torres Supremas'],['Torre Suprema','Supreme Tower','Torre Suprema'],
    ['Exército do desafio','Challenge army','Ejército del desafío'],['{creditos} créditos por disparo · dois chefes na última wave','{creditos} credits per shot · two bosses in the final wave','{creditos} créditos por disparo · dos jefes en la última oleada'],
    ['Cronarca','Chronarch','Cronarca'],['Tempestade','Tempest','Tempestad'],['Bastião','Bastion','Bastión'],
    ['Purificadora','Purifier','Purificadora'],['Reveladora','Revealer','Reveladora'],
    ['Instante Zero','Zero Moment','Instante Cero'],['Céu em Ruínas','Shattered Sky','Cielo en Ruinas'],['Muralha Absoluta','Absolute Wall','Muralla Absoluta'],
    ['Restauração','Restoration','Restauración'],['Forma Exposta','Exposed Form','Forma Expuesta'],
    ['Contra o Tempo','Against Time','Contra el Tiempo'],['Maré Infinita','Endless Tide','Marea Infinita'],['Última Fortaleza','Last Fortress','Última Fortaleza'],
    ['Zona Contaminada','Contaminated Zone','Zona Contaminada'],['Espelhos da Ruptura','Rupture Mirrors','Espejos de la Ruptura'],
    ['Conquiste seu poder','Earn your power','Conquista tu poder'],['Conquiste seu poder. Nenhuma compra. Nenhum desbloqueio por fase.','Earn your power. No purchases. No stage unlocks.','Conquista tu poder. Sin compras ni desbloqueos por fase.'],
    ['DESAFIOS DIFÍCEIS','HARD CHALLENGES','DESAFÍOS DIFÍCILES'],
    ['Exército emprestado e fixo, sem bônus da loja, núcleos ou Supremas. Uma invasão na base encerra a tentativa. Vença todas as waves para conquistar a torre permanentemente.','Fixed loaned army, no shop bonuses, cores or Supremes. One enemy reaching the base ends the attempt. Clear every wave to unlock the tower permanently.','Ejército prestado y fijo, sin bonos de tienda, núcleos ni Supremas. Un enemigo en la base termina el intento. Supera todas las oleadas para conseguir la torre permanentemente.'],
    ['Escolha uma Suprema para sua equipe. Ela tem atributos fixos e um poder manual que recarrega durante o combate.','Choose a Supreme for your team. It has fixed stats and a manual power that recharges during combat.','Elige una Suprema para tu equipo. Tiene atributos fijos y un poder manual que se recarga durante el combate.'],
    ['A Suprema ocupa uma vaga da equipe. Uma única construção por partida, mesmo após vender ou perder a torre.','The Supreme takes one team slot. You can build it only once per match, even after selling or losing it.','La Suprema ocupa una plaza del equipo. Solo puedes construirla una vez por partida, incluso tras venderla o perderla.'],
    ['A Suprema ocupou uma vaga; {nome} saiu da equipe.','The Supreme took one slot; {nome} left the team.','La Suprema ocupó una plaza; {nome} salió del equipo.'],
    ['Conquiste esta Suprema no desafio próprio do lobby.','Earn this Supreme in its lobby challenge.','Consigue esta Suprema en su desafío del lobby.'],['Vença o desafio Supremo','Win the Supreme challenge','Gana el desafío Supremo'],
    ['Sem Suprema','No Supreme','Sin Suprema'],['Conquistada','Earned','Conquistada'],['Desafio pendente','Challenge pending','Desafío pendiente'],['Selecionar Suprema','Select Supreme','Seleccionar Suprema'],
    ['Enfrentar desafio','Enter challenge','Enfrentar desafío'],['Repetir desafio','Retry challenge','Repetir desafío'],
    ['Recarga: {segundos}s de combate.','Recharge: {segundos}s of combat.','Recarga: {segundos}s de combate.'],
    ['Paralisa os inimigos atuais por {duracao}s; chefes por {boss}s.','Freezes current enemies for {duracao}s; bosses for {boss}s.','Paraliza a los enemigos actuales durante {duracao}s; jefes durante {boss}s.'],
    ['Atinge todos os inimigos atuais: {dano} de dano; {boss} em chefes.','Hits all current enemies: {dano} damage; {boss} against bosses.','Golpea a todos los enemigos actuales: {dano} de daño; {boss} contra jefes.'],
    ['Protege todas as torres contra tiros por {duracao}s.','Protects all towers from shots for {duracao}s.','Protege todas las torres de disparos durante {duracao}s.'],
    ['Restaura até {tiros} acertos sofridos por cada torre ainda construída.','Restores up to {tiros} hits taken by each tower still standing.','Restaura hasta {tiros} impactos recibidos por cada torre que sigue construida.'],
    ['Expõe todos os inimigos atuais: +{percentual}% de dano recebido por {duracao}s.','Exposes all current enemies: +{percentual}% damage taken for {duracao}s.','Expone a todos los enemigos actuales: +{percentual}% de daño recibido durante {duracao}s.'],
    ['Efetiva contra {nome}: +{percentual}% de dano.','Effective against {nome}: +{percentual}% damage.','Eficaz contra {nome}: +{percentual}% de daño.'],
    ['{waves} waves · {limite} torres · {creditos} créditos iniciais','{waves} waves · {limite} towers · {creditos} starting credits','{waves} oleadas · {limite} torres · {creditos} créditos iniciales'],
    ['Vida ×{vida} · velocidade ×{velocidade} · chefe a cada {intervalo} waves','Health ×{vida} · speed ×{velocidade} · boss every {intervalo} waves','Vida ×{vida} · velocidad ×{velocidade} · jefe cada {intervalo} oleadas'],
    ['Ondas aceleradas: planeje a cobertura e use gelo para conter os rápidos.','Fast waves: plan coverage and use ice to contain runners.','Oleadas rápidas: planifica la cobertura y usa hielo para frenar corredores.'],
    ['Enxames densos: dano em área e posicionamento são essenciais.','Dense swarms: area damage and placement are essential.','Enjambres densos: el daño de área y la posición son esenciales.'],
    ['Cerco de sabotadores: proteja os atacantes com iscas e canhões blindados.','Saboteur siege: protect attackers with decoys and armored cannons.','Asedio de saboteadores: protege a los atacantes con señuelos y cañones blindados.'],
    ['Resista aos ataques e recupere suas defesas entre as waves.','Withstand attacks and restore your defenses between waves.','Resiste los ataques y recupera tus defensas entre oleadas.'],
    ['Controle os rápidos sem deixar os blindados atravessarem.','Control the fast enemies without letting armored ones through.','Controla a los rápidos sin dejar pasar a los blindados.'],
    ['Suprema {nome} +{percentual}%','Supreme {nome} +{percentual}%','Suprema {nome} +{percentual}%'],
    ['A Suprema indicada causa mais dano a este Superboss.','The listed Supreme deals more damage to this Superboss.','La Suprema indicada causa más daño a este Superjefe.'],
    ['Desafio Supremo: exército fixo, sem bônus externos.','Supreme challenge: fixed army, no external bonuses.','Desafío Supremo: ejército fijo, sin bonos externos.'],
    ['{nome} conquistada! Selecione-a no lobby.','{nome} earned! Select it in the lobby.','¡{nome} conquistada! Selecciónala en el lobby.'],
    ['Não foi possível salvar a Suprema. Tente novamente.','Could not save the Supreme. Try again.','No se pudo guardar la Suprema. Inténtalo de nuevo.'],['Tentar salvar novamente','Retry saving','Volver a guardar'],
    ['Poder Supremo pronto!','Supreme Power ready!','¡Poder Supremo listo!'],['Carregando: {percentual}%','Charging: {percentual}%','Cargando: {percentual}%'],['Carga do poder Supremo','Supreme power charge','Carga del poder Supremo']
]) { TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es; }
