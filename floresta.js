// Capítulo secreto independente do combate e da jornada salva no castelo.
const CHAVE_FLORESTA = 'guardians-of-pixel-floresta-v1';
const SALAS_DA_FLORESTA = [{nome:'Floresta dos Ecos',
    rota:[[4,34],[13,34],[13,23],[25,23],[25,12],[38,12],[38,29],[52,29],[52,19],[64,19],[64,6],[75,6]],
    ramo:[[13,29],[5,29],[5,19],[19,19]],abrigo:[25,19],
    abrigos:[[13,26],[25,19],[38,23],[52,24],[64,12]],
    checkpoints:[[4,34],[25,23],[38,29],[64,19]]}];
// Obstáculos deixam passagens laterais; os ramos formam desvios e becos entre árvores.
const OBSTACULOS_FLORESTA = [
    {pedras:[[9,34],[13,27],[20,24],[25,16],[32,12],[38,19],[45,28],[52,25],[59,19],[64,10],[70,7],[19,19],[45,35],[58,9]],
    arvores:[[13,31],[25,20],[38,25],[49,29],[64,15],[33,7],[48,19]],
    armadilhas:[[11,34],[18,23],[25,14],[35,12],[38,21],[42,29],[50,29],[56,19],[64,13],[71,6],[30,7],[47,35]],
    desvios:[[[9,34],[9,38],[18,38],[18,29],[13,29]],[[21,23],[21,17],[29,17],[29,23],[25,23]],[[25,12],[25,7],[34,7],[34,12]],[[38,17],[45,17],[45,24],[38,24]],[[38,29],[38,35],[48,35],[48,29]],[[52,19],[52,9],[59,9]],[[60,19],[60,24],[69,24],[69,13],[64,13]],[[64,6],[64,3],[73,3],[73,6]]]}
];
const cameraFloresta={x:0,y:0};
let prisaoJogadorFloresta=0;
let florestaAtiva=false, estadoFloresta=null, dialogoFloresta=null, pausaFloresta=false, quadroFloresta=null, ultimoQuadroFloresta=0;
let perseguidorFloresta=null, escondidoFloresta=false;
const teclasFloresta=new Set();
const caminhadaNaFloresta={direcao:'baixo',tempo:0,movendo:false};
const telaFloresta=document.getElementById('floresta-secreta');
const canvasFloresta=document.getElementById('floresta-canvas');
const contextoFloresta=canvasFloresta.getContext('2d');
function pontoDaFloresta([x,y]) { return {x:x*32+16,y:y*32+16}; }
function florestaEstaDesbloqueada() { return maiorFaseConcluida>=18 && jornadaDoLimbo?.promessaDeAjuda===true; }
function carregarFloresta() {
    try {
        const s=JSON.parse(localStorage.getItem(CHAVE_FLORESTA));
        if(!s || !Number.isInteger(s.sala) || s.sala<0 || s.sala>2) return null;
        const checkpoint=s.versao===3&&Number.isInteger(s.checkpoint)?Math.max(0,Math.min(3,s.checkpoint)):s.sala;
        const inicio=pontoDaFloresta(SALAS_DA_FLORESTA[0].checkpoints[checkpoint]);
        const estado={versao:3,sala:0,checkpoint,revelado:s.revelado===true||s.sala===2,concluido:s.concluido===true,x:s.versao===3&&Number.isFinite(s.x)?s.x:inicio.x,y:s.versao===3&&Number.isFinite(s.y)?s.y:inicio.y,armadilhasFechadas:s.versao===3&&Array.isArray(s.armadilhasFechadas)?s.armadilhasFechadas.filter(v=>typeof v==='string'):[]};
        if(!posicaoLivreNaFloresta(estado.x,estado.y,estado.sala)) Object.assign(estado,inicio);
        if(s.versao===3&&s.perseguidor&&Number.isFinite(s.perseguidor.x)&&Number.isFinite(s.perseguidor.y)&&posicaoLivreNaFloresta(s.perseguidor.x,s.perseguidor.y,0))estado.perseguidor={x:s.perseguidor.x,y:s.perseguidor.y,espera:Math.max(0,Math.min(3,Number(s.perseguidor.espera)||0))};
        return estado;
    } catch {return null;}
}
function salvarFloresta() {
    if(estadoFloresta?.capitulo==='casa'){salvarCasaParada();return;}
    try { localStorage.setItem(CHAVE_FLORESTA,JSON.stringify({...estadoFloresta,versao:3,perseguidor:perseguidorFloresta})); }
    catch { document.getElementById('floresta-aviso').textContent=localizar('Não foi possível salvar neste navegador.'); }
    atualizarBotaoDaFloresta();
}
function atualizarBotaoDaFloresta() {
    if(window.casaParadaPronta)atualizarBotaoCasaParada();
    atualizarBotaoDoFinalDaFase18();
    document.getElementById('botao-floresta')?.remove();
}
function iniciarFlorestaSecreta(nova=false) {
    if(!florestaEstaDesbloqueada() || florestaAtiva) return;
    ocultarCutsceneDaCarta();ocultarPainelDeResultado();fecharConteudoMenu();
    if(jogoIniciado) definirJogoPausado(true);
    const salvo=nova?null:carregarFloresta();
    estadoFloresta=salvo&&!salvo.concluido?salvo:{sala:0,...pontoDaFloresta(SALAS_DA_FLORESTA[0].rota[0]),revelado:false,concluido:false};
    florestaAtiva=true;pausaFloresta=false;dialogoFloresta=null;escondidoFloresta=false;teclasFloresta.clear();
    Object.assign(caminhadaNaFloresta,{direcao:'baixo',tempo:0,movendo:false});
    telaFloresta.hidden=false;aplicacaoJogo.inert=true;
    selecionarTrilhaDaPartida('casteloDoLimbo');
    reiniciarPerseguidorFloresta();salvarFloresta();atualizarInterfaceFloresta();
    if(!salvo) conversarNaFloresta([
        ['VOCÊ','Saí pela passagem atrás da sala do relógio. Corri entre as ruínas até chegar aqui… Onde fica a saída?'],
        ['VOCÊ','Há marcas nas pedras. E uma luz entre as árvores. Talvez levem a algum lugar.']
    ]);
    canvasFloresta.focus();ultimoQuadroFloresta=performance.now();quadroFloresta=requestAnimationFrame(quadroDaFloresta);
}
function fecharFloresta() {
    florestaAtiva=false;teclasFloresta.clear();cancelAnimationFrame(quadroFloresta);quadroFloresta=null;
    telaFloresta.hidden=true;aplicacaoJogo.inert=false;dialogoFloresta=null;selecionarTrilhaDaPartida();
}
function sairDaFloresta() {if(!florestaAtiva)return;salvarFloresta();fecharFloresta();voltarAoLobby();atualizarBotaoDaFloresta();document.querySelector('.botao-lobby-jogar')?.focus();}
function conversarNaFloresta(falas,aoTerminar=null) {teclasFloresta.clear();dialogoFloresta={falas,indice:0,aoTerminar};atualizarInterfaceFloresta();document.getElementById('floresta-continuar').focus();}
function avancarFalaFloresta() {
    if(!dialogoFloresta)return;
    if(++dialogoFloresta.indice===dialogoFloresta.falas.length) {const terminar=dialogoFloresta.aoTerminar;dialogoFloresta=null;terminar?.();}
    atualizarInterfaceFloresta();if(!dialogoFloresta)canvasFloresta.focus();
}
function atualizarInterfaceFloresta() {
    if(!estadoFloresta)return;
    document.getElementById('floresta-titulo').textContent=localizar(SALAS_DA_FLORESTA[estadoFloresta.sala].nome);
    document.getElementById('floresta-objetivo').textContent=localizar(estadoFloresta.revelado?'Encontre o arco. Siga as pedras claras e não deixe que ele alcance você.':'Encontre a saída da floresta. Siga as pedras claras.');
    document.getElementById('floresta-aviso').textContent=localizar(pausaFloresta?'Pausado':escondidoFloresta?'Escondido. Pressione E para sair.':'WASD ou setas: andar · E: interagir com abrigo ou saída · Esc: pausar');
    document.getElementById('floresta-sair').textContent=localizar('Salvar e voltar ao lobby');
    document.getElementById('floresta-interagir').textContent=localizar('Interagir (E)');
    document.getElementById('floresta-pausar').textContent=localizar(pausaFloresta?'Continuar':'Pausar');
    document.getElementById('floresta-continuar').textContent=localizar('Continuar');
    document.getElementById('floresta-controles').hidden=Boolean(dialogoFloresta);
    const caixa=document.getElementById('floresta-dialogo');caixa.hidden=!dialogoFloresta;
    if(dialogoFloresta) {
        const [nome,fala,meio='presencial']=dialogoFloresta.falas[dialogoFloresta.indice];
        aplicarRetratoDeDialogo(caixa,identificarFalanteDoDialogo(nome,'castelo'),meio);
        document.getElementById('floresta-falante').textContent=localizar(nome==='VOCÊ'?'Você':nome);
        document.getElementById('floresta-fala').textContent=localizar(fala);
    }
    if(estadoFloresta.capitulo==='casa')atualizarInterfaceCasaParada();
}
const celulasLivresFloresta=new Map();
function celulaLivreFloresta(x,y,sala=0) {
    if(!celulasLivresFloresta.has(sala)){
        const livres=new Set();
        for(let cy=0;cy<CONFIG.florestaSecreta.linhas;cy++)for(let cx=0;cx<CONFIG.florestaSecreta.colunas;cx++)if(calcularCelulaLivreFloresta(cx,cy,sala))livres.add(`${cx},${cy}`);
        celulasLivresFloresta.set(sala,livres);
    }
    return celulasLivresFloresta.get(sala).has(`${x},${y}`);
}
function calcularCelulaLivreFloresta(x,y,sala) {
    if(x<1||x>CONFIG.florestaSecreta.colunas-2||y<1||y>CONFIG.florestaSecreta.linhas-2)return false;
    const dados=SALAS_DA_FLORESTA[sala];
    const obstaculos=OBSTACULOS_FLORESTA[sala];
    if([...obstaculos.pedras,...obstaculos.arvores].some(p=>p[0]===x&&p[1]===y))return false;
    return [dados.rota,dados.ramo,...obstaculos.desvios].some(rota=>rota.slice(1).some((p,i)=>{
        const a=rota[i];return x>=Math.min(a[0],p[0])-1&&x<=Math.max(a[0],p[0])+1&&y>=Math.min(a[1],p[1])-1&&y<=Math.max(a[1],p[1])+1;
    }));
}
function posicaoLivreNaFloresta(x,y,sala=estadoFloresta.sala) {
    if(estadoFloresta?.capitulo==='casa'&&arguments.length<3)return posicaoLivreCasaParada(x,y);
    const r=CONFIG.florestaSecreta.raioJogador;
    return [[-r,-r],[-r,r],[r,-r],[r,r]].every(([dx,dy])=>celulaLivreFloresta(Math.floor((x+dx)/32),Math.floor((y+dy)/32),sala));
}
function moverNaFloresta(alvo,dx,dy) {
    if(posicaoLivreNaFloresta(alvo.x+dx,alvo.y))alvo.x+=dx;
    if(posicaoLivreNaFloresta(alvo.x,alvo.y+dy))alvo.y+=dy;
}
function reiniciarPerseguidorFloresta() {
    prisaoJogadorFloresta=0;
    const inicio=pontoDaFloresta(SALAS_DA_FLORESTA[0].checkpoints[estadoFloresta.checkpoint||0]);
    perseguidorFloresta=estadoFloresta.perseguidor?{...estadoFloresta.perseguidor}:{...pontoDaFloresta(estadoFloresta.revelado?SALAS_DA_FLORESTA[0].checkpoints[estadoFloresta.checkpoint||0]:[13,29]),espera:CONFIG.florestaSecreta.esperaPerseguidor};
    if(perseguidorFloresta&&Math.hypot(inicio.x-estadoFloresta.x,inicio.y-estadoFloresta.y)<CONFIG.florestaSecreta.distanciaInteracao*2)perseguidorFloresta.espera=CONFIG.florestaSecreta.esperaCheckpoint;
}
function revelarSenhorNaFloresta() {
    conversarNaFloresta([
        ['VOCÊ','Aquela sombra… É você?!'],
        ['SENHOR DO TEMPO','Ele viu o que precisava ver. Uma versão de mim caindo. Deixei uma cópia temporal para trás e vim atrás de você.'],
        ['VOCÊ','Como você me encontrou?'],
        ['SENHOR DO TEMPO','Fui eu quem trouxe você. Achou que não saberia seguir o seu rastro?']
    ],()=>{estadoFloresta.revelado=true;perseguidorFloresta.espera=CONFIG.florestaSecreta.esperaCheckpoint;salvarFloresta();});
}
function proximoPassoDoPerseguidor(alvo=estadoFloresta) {
    const origem=[Math.floor(perseguidorFloresta.x/32),Math.floor(perseguidorFloresta.y/32)];
    const destino=[Math.floor(alvo.x/32),Math.floor(alvo.y/32)];
    const fila=[{p:origem,primeiro:null}],vistos=new Set([origem.join(',')]);
    for(let i=0;i<fila.length;i++) {
        const no=fila[i];if(no.p[0]===destino[0]&&no.p[1]===destino[1])return no.primeiro?pontoDaFloresta(no.primeiro):alvo;
        for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const p=[no.p[0]+dx,no.p[1]+dy],chave=p.join(',');
            if(vistos.has(chave)||!celulaLivreFloresta(...p,estadoFloresta.sala))continue;
            vistos.add(chave);fila.push({p,primeiro:no.primeiro||p});
        }
    }
    return perseguidorFloresta;
}
function atualizarFloresta(dt) {
    caminhadaNaFloresta.movendo=false;
    if(!florestaAtiva||dialogoFloresta||pausaFloresta||document.hidden)return;
    const cfg=CONFIG.florestaSecreta;
    let dx=Number(teclasFloresta.has('direita'))-Number(teclasFloresta.has('esquerda')),dy=Number(teclasFloresta.has('baixo'))-Number(teclasFloresta.has('cima'));
    const comprimento=Math.hypot(dx,dy)||1;
    const anterior={x:estadoFloresta.x,y:estadoFloresta.y};
    prisaoJogadorFloresta=Math.max(0,prisaoJogadorFloresta-dt);
    if(!escondidoFloresta&&!prisaoJogadorFloresta)moverNaFloresta(estadoFloresta,dx/comprimento*cfg.velocidadeJogador*dt,dy/comprimento*cfg.velocidadeJogador*dt);
    if(estadoFloresta.capitulo!=='casa')verificarArmadilhasFloresta(estadoFloresta,true);
    caminhadaNaFloresta.movendo=estadoFloresta.x!==anterior.x||estadoFloresta.y!==anterior.y;
    if(caminhadaNaFloresta.movendo) {
        caminhadaNaFloresta.tempo+=dt;
        caminhadaNaFloresta.direcao=dy?(dy>0?'baixo':'cima'):(dx>0?'direita':'esquerda');
    }
    if(estadoFloresta.capitulo==='casa')return;
    SALAS_DA_FLORESTA[0].checkpoints.forEach((p,i)=>{const lugar=pontoDaFloresta(p);if(i>(estadoFloresta.checkpoint||0)&&Math.hypot(lugar.x-estadoFloresta.x,lugar.y-estadoFloresta.y)<45){estadoFloresta.checkpoint=i;salvarFloresta();}});
    if(!perseguidorFloresta)return;
    if(perseguidorFloresta.espera>0){perseguidorFloresta.espera-=dt;return;}
    if(escondidoFloresta)return;
    const distancia=Math.hypot(estadoFloresta.x-perseguidorFloresta.x,estadoFloresta.y-perseguidorFloresta.y);
    let destino=estadoFloresta;
    const aproximar=estadoFloresta.x>=CONFIG.florestaSecreta.inicioEncontro;
    if(!estadoFloresta.revelado&&!aproximar&&distancia<cfg.distanciaSombra){
        if(!perseguidorFloresta.patrulha||Math.hypot(perseguidorFloresta.patrulha.x-perseguidorFloresta.x,perseguidorFloresta.patrulha.y-perseguidorFloresta.y)<10){
            const opcoes=[];
            for(let y=2;y<cfg.linhas-2;y+=2)for(let x=2;x<cfg.colunas-2;x+=2){const p=pontoDaFloresta([x,y]),d=Math.hypot(p.x-estadoFloresta.x,p.y-estadoFloresta.y);if(d>cfg.distanciaSombra*.6&&d<cfg.distanciaSombra&&posicaoLivreNaFloresta(p.x,p.y))opcoes.push(p);}
            perseguidorFloresta.patrulha=opcoes[Math.floor(Math.random()*opcoes.length)]||estadoFloresta;
        }
        destino=perseguidorFloresta.patrulha;
    }
    const alvo=proximoPassoDoPerseguidor(destino),dist=Math.hypot(alvo.x-perseguidorFloresta.x,alvo.y-perseguidorFloresta.y);
    if(dist) {const passo=Math.min(dist,(estadoFloresta.revelado||aproximar?cfg.velocidadePerseguidor:cfg.velocidadeSombra)*dt);moverNaFloresta(perseguidorFloresta,(alvo.x-perseguidorFloresta.x)/dist*passo,(alvo.y-perseguidorFloresta.y)/dist*passo);}
    if(!estadoFloresta.revelado){if(aproximar&&distancia<cfg.distanciaEncontro)revelarSenhorNaFloresta();return;}
    verificarArmadilhasFloresta(perseguidorFloresta,false);
    if(Math.hypot(estadoFloresta.x-perseguidorFloresta.x,estadoFloresta.y-perseguidorFloresta.y)<cfg.distanciaCaptura) {
        conversarNaFloresta([['VOCÊ','Ele me alcançou… Preciso tentar outro caminho.']],()=>{
            Object.assign(estadoFloresta,pontoDaFloresta(SALAS_DA_FLORESTA[0].checkpoints[estadoFloresta.checkpoint||0]));
            delete estadoFloresta.perseguidor;
            escondidoFloresta=false;reiniciarPerseguidorFloresta();salvarFloresta();
        });
    }
}
function interagirNaFloresta() {
    if(!florestaAtiva||dialogoFloresta||pausaFloresta)return;
    if(estadoFloresta.capitulo==='casa'){interagirCasaParada();return;}
    if(escondidoFloresta){escondidoFloresta=false;if(perseguidorFloresta)perseguidorFloresta.espera=CONFIG.florestaSecreta.esperaSaidaAbrigo;atualizarInterfaceFloresta();return;}
    const sala=SALAS_DA_FLORESTA[estadoFloresta.sala],fim=pontoDaFloresta(sala.rota.at(-1));
    const perto=p=>Math.hypot(p.x-estadoFloresta.x,p.y-estadoFloresta.y)<CONFIG.florestaSecreta.distanciaInteracao;
    if(perto(fim)) {
        if(!estadoFloresta.revelado){document.getElementById('floresta-aviso').textContent=localizar('O arco está apagado. Há passos se aproximando atrás de você.');return;}
        {
            conversarNaFloresta([
                ['VOCÊ','Um arco… Está apagado. Não há mais caminho.'],
                ['???','Encontrei você. Atravesse. Eu não consigo mantê-la aberta por muito tempo.','audio'],
                ['VOCÊ','A marca da coroa! Ele ainda está me ajudando. Do outro lado… é minha casa!']
            ],concluirFugaDaFloresta);
        }
    } else if(sala.abrigos.some(p=>perto(pontoDaFloresta(p)))) {escondidoFloresta=true;teclasFloresta.clear();atualizarInterfaceFloresta();}
    else document.getElementById('floresta-aviso').textContent=localizar('Aproxime-se das pedras de saída ou do abrigo de folhas.');
}
function concluirFugaDaFloresta() {
    estadoFloresta.concluido=true;salvarFloresta();fecharFloresta();
    etapasDoFinalDaCampanha=CONFIG.confrontoFinal.casa;mostrarConfrontoFinal(true,0,true);
}
function quadroDaFloresta(agora) {
    if(!florestaAtiva)return;
    atualizarFloresta(Math.min(.04,(agora-ultimoQuadroFloresta)/1000));ultimoQuadroFloresta=agora;
    desenharFloresta(agora);quadroFloresta=requestAnimationFrame(quadroDaFloresta);
}
function verificarArmadilhasFloresta(alvo,jogador) {
    const fechadas=estadoFloresta.armadilhasFechadas??=[];
    OBSTACULOS_FLORESTA[estadoFloresta.sala].armadilhas.forEach((celula,i)=>{
        const chave=`${estadoFloresta.sala}:${i}`,p=pontoDaFloresta(celula);
        if(fechadas.includes(chave)||Math.hypot(alvo.x-p.x,alvo.y-p.y)>=CONFIG.florestaSecreta.raioArmadilha)return;
        fechadas.push(chave);
        if(jogador)prisaoJogadorFloresta=CONFIG.florestaSecreta.prisaoJogador;
        else alvo.espera=CONFIG.florestaSecreta.prisaoPerseguidor;
    });
}
function atualizarCameraFloresta() {
    cameraFloresta.x=Math.round(Math.max(0,Math.min(CONFIG.florestaSecreta.colunas*32-canvasFloresta.width,estadoFloresta.x-canvasFloresta.width/2)));
    cameraFloresta.y=Math.round(Math.max(0,Math.min(CONFIG.florestaSecreta.linhas*32-canvasFloresta.height,estadoFloresta.y-canvasFloresta.height/2)));
}
function desenharFloresta(agora=0) {
    ajustarJanelaExploracao();
    if(estadoFloresta.capitulo==='casa'){desenharCasaParada();return;}
    const c=contextoFloresta,s=estadoFloresta,dados=SALAS_DA_FLORESTA[s.sala];c.imageSmoothingEnabled=false;
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(Math.round(x),Math.round(y),w,h);};
    b('#0c201e',0,0,canvasFloresta.width,canvasFloresta.height);
    atualizarCameraFloresta();c.save();c.translate(-cameraFloresta.x,-cameraFloresta.y);
    for(let y=Math.floor(cameraFloresta.y/32);y<Math.min(CONFIG.florestaSecreta.linhas,Math.ceil((cameraFloresta.y+canvasFloresta.height)/32));y++)for(let x=Math.floor(cameraFloresta.x/32);x<Math.min(CONFIG.florestaSecreta.colunas,Math.ceil((cameraFloresta.x+canvasFloresta.width)/32));x++) {
        if(celulaLivreFloresta(x,y,s.sala)) {b((x+y)%2?'#334238':'#39463a',x*32,y*32,32,32);b('#4c5541',x*32+9,y*32+13,5,3);}
        else {b('#342e2a',x*32+13,y*32+15,8,17);b('#173f32',x*32+3,y*32+7,28,15);b((x+y)%3?'#20503a':'#294d35',x*32+7,y*32+2,20,13);b('#2e6246',x*32+10,y*32,11,6);}
    }
    for(const celula of OBSTACULOS_FLORESTA[s.sala].pedras) {
        const p=pontoDaFloresta(celula);b('#334238',p.x-16,p.y-16,32,32);b('#202b29',p.x-14,p.y+5,29,10);b('#697774',p.x-13,p.y-7,27,17);b('#919c8b',p.x-8,p.y-13,17,9);b('#b3b6a0',p.x-6,p.y-11,9,3);
    }
    OBSTACULOS_FLORESTA[s.sala].armadilhas.forEach((celula,i)=>{
        const p=pontoDaFloresta(celula),fechada=s.armadilhasFechadas?.includes(`${s.sala}:${i}`);
        b('#232c27',p.x-13,p.y-8,26,18);b('#80694d',p.x-8,p.y-5,16,11);
        for(const lado of [-1,1]){const y=p.y+(fechada?lado*2:lado*8);b('#acb9ae',p.x-12,y,24,3);for(let d=-10;d<=10;d+=5)b('#e0dbc3',p.x+d,y+(lado<0?3:-3),3,3);}
        b('#b79557',p.x-2,p.y-2,4,4);
    });
    for(const ponto of dados.rota) {const p=pontoDaFloresta(ponto);b('#b6ba96',p.x-4,p.y-3,8,5);b('#799b83',p.x+7,p.y+4,4,3);}
    for(const celula of dados.abrigos){const abrigo=pontoDaFloresta(celula);b('#507f4f',abrigo.x-18,abrigo.y-15,36,30);b('#82a86b',abrigo.x-13,abrigo.y-18,24,10);}
    const fim=pontoDaFloresta(dados.rota.at(-1));
    {
        const aceso=dialogoFloresta&&dialogoFloresta.indice>=1;
        b('#8d8a78',fim.x-24,fim.y-54,10,62);b('#8d8a78',fim.x+15,fim.y-54,10,62);b('#adab91',fim.x-24,fim.y-62,49,10);
        b(aceso?'#acf0df':'#10221f',fim.x-14,fim.y-50,29,58);
        if(aceso){b('#e9c660',fim.x-13,fim.y-77,26,10);for(const dx of [-13,-2,9])b('#fff2a9',fim.x+dx,fim.y-84,4,9);}
    }
    if(perseguidorFloresta){const {x,y}=perseguidorFloresta;
        if(s.revelado||dialogoFloresta?.falas[dialogoFloresta.indice]?.[0]==='SENHOR DO TEMPO')desenharSenhorDoTempoFinal(c,x-17,y-30,34);
        else {b('#090f17',x-7,y-30,14,14);b('#090f17',x-11,y-16,22,16);b('#090f17',x-9,y,7,6);b('#090f17',x+2,y,7,6);}
    }
    if(!escondidoFloresta) {
        const andando=caminhadaNaFloresta.movendo&&teclasFloresta.size&&!dialogoFloresta&&!pausaFloresta&&!document.hidden;
        const passo=andando?[0,2,0,-2][Math.floor(caminhadaNaFloresta.tempo/.12)%4]:0;
        desenharPessoaDoCastelo(s.x,s.y,'jogador',1,passo,caminhadaNaFloresta.direcao,c);
    }
    if(prisaoJogadorFloresta>0){b('#e2bb66',s.x-10,s.y+5,20,3);}
    c.restore();
    if(pausaFloresta){b('#101a22cc',0,0,canvasFloresta.width,canvasFloresta.height);c.fillStyle='#f4e2b8';c.font='bold 24px monospace';c.textAlign='center';c.fillText(localizar('Pausado'),canvasFloresta.width/2,canvasFloresta.height/2);}
}
function ajustarJanelaExploracao(){
    const celular=window.matchMedia('(max-width: 600px)').matches&&estadoFloresta.capitulo!=='casa';
    const largura=celular?320:640;
    const altura=celular?Math.round(Math.max(260,Math.min(460,(window.innerHeight-260)*320/Math.max(280,canvasFloresta.clientWidth-8)))):384;
    if(canvasFloresta.width!==largura)canvasFloresta.width=largura;
    if(canvasFloresta.height!==altura)canvasFloresta.height=altura;
}
const DIRECOES_FLORESTA={w:'cima',ArrowUp:'cima',s:'baixo',ArrowDown:'baixo',a:'esquerda',ArrowLeft:'esquerda',d:'direita',ArrowRight:'direita'};
function pausarFloresta(){if(!florestaAtiva||dialogoFloresta)return;pausaFloresta=!pausaFloresta;teclasFloresta.clear();atualizarInterfaceFloresta();}
for(const tipo of ['keydown','keyup'])document.addEventListener(tipo,e=>{
    if(!florestaAtiva)return;
    const tecla=e.key.length===1?e.key.toLowerCase():e.key,direcao=DIRECOES_FLORESTA[tecla];
    if(direcao||['e','Escape'].includes(tecla)){e.preventDefault();e.stopImmediatePropagation();}
    if(direcao){if(tipo==='keydown'&&!dialogoFloresta&&!pausaFloresta)teclasFloresta.add(direcao);else teclasFloresta.delete(direcao);}
    if(tipo==='keydown'&&!e.repeat){if(tecla==='e')interagirNaFloresta();if(tecla==='Escape')pausarFloresta();}
},true);
for(const botao of document.querySelectorAll('[data-floresta-direcao]')) {
    botao.addEventListener('pointerdown',e=>{if(dialogoFloresta||pausaFloresta)return;e.preventDefault();botao.setPointerCapture(e.pointerId);teclasFloresta.add(botao.dataset.florestaDirecao);});
    for(const tipo of ['pointerup','pointercancel','lostpointercapture'])botao.addEventListener(tipo,()=>teclasFloresta.delete(botao.dataset.florestaDirecao));
}
function suspenderFloresta(){teclasFloresta.clear();if(florestaAtiva){pausaFloresta=true;salvarFloresta();atualizarInterfaceFloresta();}}
window.addEventListener('blur',suspenderFloresta);document.addEventListener('visibilitychange',()=>{if(document.hidden)suspenderFloresta();});
window.addEventListener('pagehide',()=>{if(florestaAtiva)salvarFloresta();});
document.getElementById('floresta-sair').onclick=sairDaFloresta;
document.getElementById('floresta-continuar').onclick=avancarFalaFloresta;
document.getElementById('floresta-interagir').onclick=interagirNaFloresta;
document.getElementById('floresta-pausar').onclick=pausarFloresta;
for(const [pt,en,es] of [
    ['O arco está apagado. Há passos se aproximando atrás de você.','The arch is dark. Footsteps are approaching behind you.','El arco está apagado. Se acercan pasos detrás de ti.'],
    ['Floresta dos Ecos','Forest of Echoes','Bosque de los Ecos'],
    ['Ruínas na mata','Ruins in the woods','Ruinas en el bosque'],
    ['A sombra entre as árvores','The shadow among the trees','La sombra entre los árboles'],
    ['A clareira do arco','The arch clearing','El claro del arco'],
    ['Continuar na floresta','Continue in the forest','Continuar en el bosque'],
    ['Capítulo secreto: Floresta dos Ecos','Secret chapter: Forest of Echoes','Capítulo secreto: Bosque de los Ecos'],
    ['Saí pela passagem atrás da sala do relógio. Corri entre as ruínas até chegar aqui… Onde fica a saída?','I left through the corridor behind the clock room. I ran through the ruins until I got here… Where is the way out?','Salí por el corredor detrás de la sala del reloj. Corrí entre las ruinas hasta llegar aquí… ¿Dónde está la salida?'],
    ['Há marcas nas pedras. E uma luz entre as árvores. Talvez levem a algum lugar.','There are marks on the stones. And a light among the trees. Maybe they lead somewhere.','Hay marcas en las piedras. Y una luz entre los árboles. Tal vez lleven a algún lugar.'],
    ['Encontre o arco. Siga as pedras claras e não deixe que ele alcance você.','Find the arch. Follow the pale stones and do not let him catch you.','Encuentra el arco. Sigue las piedras claras y no dejes que te alcance.'],
    ['Encontre a saída da floresta. Siga as pedras claras.','Find the way out of the forest. Follow the pale stones.','Encuentra la salida del bosque. Sigue las piedras claras.'],
    ['Escondido. Pressione E para sair.','Hidden. Press E to leave.','Oculto. Pulsa E para salir.'],
    ['WASD ou setas: andar · E: interagir com abrigo ou saída · Esc: pausar','WASD or arrows: move · E: interact with shelter or exit · Esc: pause','WASD o flechas: moverse · E: interactuar con refugio o salida · Esc: pausa'],
    ['Aquela sombra… É você?!','That shadow… Is that you?!','Esa sombra… ¡¿Eres tú?!'],
    ['Ele viu o que precisava ver. Uma versão de mim caindo. Deixei uma cópia temporal para trás e vim atrás de você.','He saw what he needed to see. A version of me falling. I left a temporal copy behind and came after you.','Vio lo que necesitaba ver. Una versión de mí cayendo. Dejé una copia temporal atrás y vine a buscarte.'],
    ['Como você me encontrou?','How did you find me?','¿Cómo me encontraste?'],
    ['Fui eu quem trouxe você. Achou que não saberia seguir o seu rastro?','I brought you here. Did you think I could not follow your trail?','Yo te traje. ¿Creíste que no sabría seguir tu rastro?'],
    ['Ele me alcançou… Preciso tentar outro caminho.','He caught me… I need to try another route.','Me alcanzó… Tengo que intentar otro camino.'],
    ['Um arco… Está apagado. Não há mais caminho.','An arch… It is dark. The path ends here.','Un arco… Está apagado. El camino termina aquí.'],
    ['Encontrei você. Atravesse. Eu não consigo mantê-la aberta por muito tempo.','I found you. Go through. I cannot keep it open for long.','Te encontré. Cruza. No puedo mantenerla abierta mucho tiempo.'],
    ['A marca da coroa! Ele ainda está me ajudando. Do outro lado… é minha casa!','The crown mark! He is still helping me. On the other side… that is my home!','¡La marca de la corona! Sigue ayudándome. Al otro lado… ¡está mi casa!'],
    ['Aproxime-se das pedras de saída ou do abrigo de folhas.','Move closer to the exit stones or the leafy shelter.','Acércate a las piedras de salida o al refugio de hojas.'],
    ['Não foi possível salvar neste navegador.','Could not save in this browser.','No se pudo guardar en este navegador.']
]) {TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es;}
atualizarBotaoDaFloresta();
