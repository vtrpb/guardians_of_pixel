// Objetivo opcional da Fase 6. O estado pertence à tentativa, nunca ao save.
function mostrarResultadoDesafioNaCarta() {
    let painel=document.getElementById('resultado-desafio-carta');
    if(!painel){
        painel=document.createElement('div');painel.id='resultado-desafio-carta';
        botaoContinuarCutsceneCarta.before(painel);
    }
    painel.hidden=true;
    if(obterCarrocaDaCampanha() && partidaVencida) concluirDesafioDaCampanha(true,painel);
}
function obterCarrocaDaCampanha() {
    const t = tentativaDesafioCampanha;
    return t?.regra === 'carroca' && faseSelecionada === t.fase && !mapaPersonalizadoAtivo && !modoWavesInfinitas && !desafioSupremoAtivo ? t : null;
}
function estaPertoDaCarroca(x, y) {
    const c = CONFIG.carrocaDaCampanha;
    return Boolean(obterCarrocaDaCampanha()) && Math.hypot(x-c.x,y-c.y)<c.raioConstrucao;
}
function atualizarCarrocaDaCampanha(deltaMs) {
    const t = obterCarrocaDaCampanha(), c = CONFIG.carrocaDaCampanha;
    if(!t || t.encerrada || t.vida<=0 || !jogoIniciado || jogoPausado || partidaEncerrada || document.hidden) return;
    const ameaca = inimigos.some(i=>i.vida>0 && Math.hypot(i.x-c.x,i.y-c.y)<=c.alcance);
    if(!ameaca){t.ataqueMs=0;return;}
    t.ataqueMs+=Math.max(0,deltaMs);
    const golpes=Math.floor(t.ataqueMs/c.intervaloMs);
    if(!golpes)return;
    t.ataqueMs%=c.intervaloMs;
    t.vida=Math.max(0,t.vida-golpes*c.dano);
    atualizarDesafioDaCampanha();
}
function desenharCarrocaDaCampanha() {
    const t=obterCarrocaDaCampanha(); if(!t)return;
    const c=CONFIG.carrocaDaCampanha,inteira=t.vida>0;
    ctx.save();ctx.translate(c.x,c.y);
    // Estrado, rodas e lona pixelados; a carga vazia permanece como destroço.
    ctx.fillStyle='#241e2d';ctx.fillRect(-35,18,70,8);
    ctx.fillStyle='#503b32';ctx.fillRect(-28,-6,56,28);ctx.fillRect(28,7,17,5);
    ctx.fillStyle=inteira?'#b98754':'#695951';ctx.fillRect(-25,-4,50,18);
    ctx.fillStyle='#e3ba77';ctx.fillRect(-22,0,44,3);ctx.fillRect(-22,9,44,3);
    if(inteira){
        ctx.fillStyle='#d9c69b';ctx.fillRect(-22,-23,44,19);ctx.fillRect(-17,-28,34,5);
        ctx.fillStyle='#867258';ctx.fillRect(-13,-23,4,19);ctx.fillRect(10,-23,4,19);
    }
    for(const x of [-20,17]){
        ctx.fillStyle='#241e2d';ctx.fillRect(x-8,13,16,16);
        ctx.fillStyle='#ae8050';ctx.fillRect(x-5,16,10,10);
        ctx.fillStyle='#463446';ctx.fillRect(x-2,19,4,4);
    }
    ctx.fillStyle='#241e2d';ctx.fillRect(-32,-43,64,10);
    ctx.fillStyle=inteira?'#9fd078':'#aa6666';ctx.fillRect(-30,-41,60*t.vida/c.vida,6);
    ctx.restore();
}
