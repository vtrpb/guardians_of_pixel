// Carregado antes de game.js para validar mapas livres já salvos.
const DECORACOES_EDITOR_LIVRE = Object.freeze([
    ['arvore','Árvore','Tree','Árbol'], ['pedra','Pedra','Rock','Piedra'],
    ['arbusto','Arbusto','Bush','Arbusto'], ['flores','Flores','Flowers','Flores'],
    ['lago','Lago','Lake','Lago'], ['cacto','Cacto','Cactus','Cactus'],
    ['piramide','Pirâmide','Pyramid','Pirámide'], ['rochaDeserto','Rocha do deserto','Desert rock','Roca del desierto'],
    ['iglu','Iglu','Igloo','Iglú'], ['pinheiroNevado','Pinheiro nevado','Snowy pine','Pino nevado'],
    ['blocoGelo','Bloco de gelo','Ice block','Bloque de hielo'], ['pinguim','Pinguim','Penguin','Pingüino'],
    ['arvoreSelva','Árvore da selva','Jungle tree','Árbol de la selva'], ['ruinaSelva','Ruína','Ruin','Ruina'],
    ['arvoreTemperada','Árvore outonal','Autumn tree','Árbol otoñal'], ['cogumelosTemperados','Cogumelos','Mushrooms','Hongos'],
    ['troncoCaido','Tronco caído','Fallen trunk','Tronco caído'], ['vulcao','Vulcão','Volcano','Volcán'],
    ['cristalDeObsidiana','Obsidiana','Obsidian','Obsidiana'], ['pocaToxica','Poça tóxica','Toxic puddle','Charco tóxico'],
    ['arvoreDoPantano','Árvore do pântano','Swamp tree','Árbol del pantano'], ['predioNeon','Prédio neon','Neon building','Edificio neón'],
    ['arvoreHolografica','Árvore holográfica','Holographic tree','Árbol holográfico'], ['placaNeon','Placa neon','Neon sign','Cartel neón']
]);
let estadoEditorLivre = null;
let textosEditorLivreProntos = false;

function normalizarDadosDoEditorLivre(valor) {
    const c = CONFIG.editorDeFases.livre;
    const pontos = valor.pontosLivres, decoracoes = valor.decoracoesLivres;
    const posicaoValida = p => p && Number.isInteger(p.x) && Number.isInteger(p.y)
        && p.x >= 0 && p.x <= c.largura && p.y >= 0 && p.y <= c.altura;
    if (!Array.isArray(pontos) || pontos.length < 2 || pontos.length > c.maximoDePontos
        || !pontos.every(posicaoValida) || pontos[0].x !== 0 || pontos.at(-1).x !== c.largura
        || pontos.some((p,i) => i > 0 && Math.hypot(p.x-pontos[i-1].x,p.y-pontos[i-1].y) < c.grade)
        || !Array.isArray(decoracoes) || decoracoes.length > c.maximoDeDecoracoes
        || !decoracoes.every(d => posicaoValida(d) && DECORACOES_EDITOR_LIVRE.some(item=>item[0]===d.tipo)
            && Number.isFinite(d.escala) && d.escala >= .5 && d.escala <= 1.5)) return null;
    return {modoEdicao:'livre',pontosLivres:pontos.map(({x,y})=>({x,y})),
        decoracoesLivres:decoracoes.map(({tipo,x,y,escala})=>({tipo,x,y,escala}))};
}

function inicializarTextosDoEditorLivre() {
    if (textosEditorLivreProntos) return;
    textosEditorLivreProntos = true;
    for (const [, ...textos] of DECORACOES_EDITOR_LIVRE) textoCasa(...textos);
    for (const textos of [
        ['Modo normal','Normal mode','Modo normal'], ['Modo livre','Free mode','Modo libre'],
        ['Caminho','Path','Camino'], ['Decoração','Decoration','Decoración'], ['Mover','Move','Mover'], ['Apagar','Erase','Borrar'],
        ['Desfazer','Undo','Deshacer'], ['Refazer','Redo','Rehacer'], ['Novo traçado','New path','Nuevo trazado'],
        ['Tamanho','Size','Tamaño'], ['Entrada','Entrance','Entrada'], ['Base','Base','Base'],
        ['Ateliê do mapa','Map workshop','Taller del mapa'],
        ['Clique para adicionar curvas antes da base. Use Mover para arrastar os pontos e as decorações. Entrada e base deslizam pelas bordas esquerda e direita.','Click to add bends before the base. Use Move to drag points and decorations. Entrance and base slide along the left and right edges.','Haz clic para añadir curvas antes de la base. Usa Mover para arrastrar puntos y decoraciones. Entrada y base se deslizan por los bordes izquierdo y derecho.'],
        ['No canvas: setas movem o cursor ou a seleção, Enter usa a ferramenta, Delete apaga, Ctrl+Z desfaz. Árvores bloqueiam construções; lagos permitem torres aquáticas.','On the canvas: arrows move the cursor or selection, Enter uses the tool, Delete erases, Ctrl+Z undoes. Trees block building; lakes allow aquatic towers.','En el lienzo: las flechas mueven el cursor o la selección, Enter usa la herramienta, Delete borra, Ctrl+Z deshace. Los árboles bloquean construcciones; los lagos permiten torres acuáticas.'],
        ['Pontos: {pontos}/{maxPontos} · Decorações: {decoracoes}/{maxDecoracoes}','Points: {pontos}/{maxPontos} · Decorations: {decoracoes}/{maxDecoracoes}','Puntos: {pontos}/{maxPontos} · Decoraciones: {decoracoes}/{maxDecoracoes}'],
        ['Limite atingido. Apague um item antes de adicionar outro.','Limit reached. Erase an item before adding another.','Límite alcanzado. Borra un elemento antes de añadir otro.'],
        ['Os pontos consecutivos precisam ficar separados por pelo menos uma célula.','Consecutive points must be at least one grid cell apart.','Los puntos consecutivos deben estar separados al menos una celda.']
    ]) textoCasa(...textos);
}

function obterEstadoEditorLivre() {
    if (!estadoEditorLivre || estadoEditorLivre.rascunho !== rascunhoDoMapaNoEditor) estadoEditorLivre = {
        rascunho:rascunhoDoMapaNoEditor,ferramenta:'caminho',tipo:'arvore',escala:1,selecao:null,
        desfazer:[],refazer:[],cursor:{x:600,y:340},aviso:''
    };
    return estadoEditorLivre;
}

function definirModoDoEditor(modo) {
    const mapa = rascunhoDoMapaNoEditor;
    if (!mapa || !['normal','livre'].includes(modo)) return;
    if (modo === 'livre' && !mapa.pontosLivres) {
        mapa.pontosLivres = obterCaminhosDoEditor(mapa.idDoCaminho)[0].map(p=>({...p}));
        if (mapa.pontosLivres.at(-1).x !== CONFIG.editorDeFases.livre.largura) {
            mapa.pontosLivres.push({x:CONFIG.editorDeFases.livre.largura,y:mapa.pontosLivres.at(-1).y});
        }
        // Rascunho novo sem objetos; mapas livres existentes mantêm suas decorações.
        mapa.decoracoesLivres = [];
    }
    mapa.modoEdicao = modo;
    mostrarFormularioDoEditor();
}

function criarPainelDoEditorLivre(mapa) {
    const livre = mapa.modoEdicao === 'livre', e = obterEstadoEditorLivre();
    const botao = (modo,nome) => `<button type="button" class="botao" data-modo-editor="${modo}" aria-pressed="${livre === (modo === 'livre')}" onclick="definirModoDoEditor('${modo}')">${localizar(nome)}</button>`;
    return `<div class="editor-modos">${botao('normal','Modo normal')}${botao('livre','Modo livre')}</div>` + (!livre ? '' : `
        <section class="editor-livre-painel" aria-label="${localizar('Ateliê do mapa')}">
            <div class="editor-livre-ferramentas">${[['caminho','Caminho'],['decoracao','Decoração'],['mover','Mover'],['apagar','Apagar']].map(([id,nome])=>`<button type="button" class="botao" data-ferramenta-livre="${id}" aria-pressed="${e.ferramenta===id}" onclick="selecionarFerramentaLivre('${id}')">${localizar(nome)}</button>`).join('')}
                <button class="botao" type="button" data-historico-livre="desfazer" onclick="navegarHistoricoLivre('desfazer')">${localizar('Desfazer')}</button>
                <button class="botao" type="button" data-historico-livre="refazer" onclick="navegarHistoricoLivre('refazer')">${localizar('Refazer')}</button>
                <button class="botao" type="button" onclick="novoTracadoLivre()">${localizar('Novo traçado')}</button>
                <label>${localizar('Tamanho')} <select id="escala-editor-livre" onchange="alterarEscalaLivre(this.value)">${CONFIG.editorDeFases.livre.escalas.map(n=>`<option value="${n}" ${e.escala===n?'selected':''}>${n}×</option>`).join('')}</select></label>
            </div>
            <p>${localizar('Clique para adicionar curvas antes da base. Use Mover para arrastar os pontos e as decorações. Entrada e base deslizam pelas bordas esquerda e direita.')}</p>
            <div class="editor-livre-area"><div class="editor-livre-paleta">${DECORACOES_EDITOR_LIVRE.map(([id,nome])=>`<button type="button" data-decoracao-livre="${id}" aria-pressed="${e.tipo===id && e.ferramenta==='decoracao'}" onclick="selecionarDecoracaoLivre('${id}')"><canvas width="64" height="64" data-previa-decoracao="${id}" aria-hidden="true"></canvas><span>${escaparTextoDoEditor(localizar(nome))}</span></button>`).join('')}</div>
                <div><canvas id="canvas-editor-livre" width="1200" height="700" tabindex="0" aria-label="${localizar('Ateliê do mapa')}" aria-describedby="ajuda-editor-livre"></canvas>
                <p id="estado-editor-livre" role="status" aria-live="polite"></p>
                <small id="ajuda-editor-livre">${localizar('No canvas: setas movem o cursor ou a seleção, Enter usa a ferramenta, Delete apaga, Ctrl+Z desfaz. Árvores bloqueiam construções; lagos permitem torres aquáticas.')}</small></div></div>
        </section>`);
}

function capturarGeometriaLivre() {
    const m = rascunhoDoMapaNoEditor;
    return JSON.stringify({pontosLivres:m.pontosLivres,decoracoesLivres:m.decoracoesLivres});
}
function guardarAcaoLivre(antes) {
    const e = obterEstadoEditorLivre();
    if (antes === capturarGeometriaLivre()) return;
    e.desfazer.push(antes); e.desfazer = e.desfazer.slice(-CONFIG.editorDeFases.livre.limiteHistorico); e.refazer=[];
}
function navegarHistoricoLivre(direcao) {
    const e=obterEstadoEditorLivre(), outra=direcao==='desfazer'?'refazer':'desfazer';
    if(!e[direcao]?.length) return;
    e[outra].push(capturarGeometriaLivre());
    Object.assign(rascunhoDoMapaNoEditor,JSON.parse(e[direcao].pop())); e.selecao=null;e.aviso='';desenharEditorLivre();
}
function selecionarFerramentaLivre(id) {
    if(!['caminho','decoracao','mover','apagar'].includes(id))return;
    const e=obterEstadoEditorLivre();e.ferramenta=id;e.selecao=null;e.aviso='';desenharEditorLivre();
}
function selecionarDecoracaoLivre(tipo) {
    if(!DECORACOES_EDITOR_LIVRE.some(d=>d[0]===tipo))return;
    selecionarFerramentaLivre('decoracao');obterEstadoEditorLivre().tipo=tipo;desenharEditorLivre();
}
function novoTracadoLivre() {
    const antes=capturarGeometriaLivre();
    rascunhoDoMapaNoEditor.pontosLivres=[{x:0,y:340},{x:1200,y:340}];
    obterEstadoEditorLivre().selecao=null;guardarAcaoLivre(antes);desenharEditorLivre();
}
function alterarEscalaLivre(valor) {
    const escala=Number(valor);if(!CONFIG.editorDeFases.livre.escalas.includes(escala))return;
    const e=obterEstadoEditorLivre(),antes=capturarGeometriaLivre();e.escala=escala;
    if(e.selecao?.grupo==='decoracoesLivres')rascunhoDoMapaNoEditor.decoracoesLivres[e.selecao.indice].escala=escala;
    guardarAcaoLivre(antes);desenharEditorLivre();
}
function localizarItemLivre(p) {
    const m=rascunhoDoMapaNoEditor;
    for(const grupo of ['pontosLivres','decoracoesLivres']) {
        for(let i=m[grupo].length-1;i>=0;i--) {
            const item=m[grupo][i],raio=grupo==='pontosLivres'?24:Math.max(24,38*item.escala);
            if(Math.hypot(item.x-p.x,item.y-p.y)<=raio)return {grupo,indice:i};
        }
    }
    return null;
}
function apagarSelecaoLivre() {
    const e=obterEstadoEditorLivre(),s=e.selecao,m=rascunhoDoMapaNoEditor;
    if(!s || (s.grupo==='pontosLivres' && (s.indice===0 || s.indice===m.pontosLivres.length-1)))return;
    if(s.grupo==='pontosLivres') {
        const anterior=m.pontosLivres[s.indice-1],seguinte=m.pontosLivres[s.indice+1];
        if(Math.hypot(anterior.x-seguinte.x,anterior.y-seguinte.y)<CONFIG.editorDeFases.livre.grade) {
            e.aviso=localizar('Os pontos consecutivos precisam ficar separados por pelo menos uma célula.');
            return;
        }
    }
    m[s.grupo].splice(s.indice,1);e.selecao=null;
}
function usarFerramentaLivre(p) {
    const e=obterEstadoEditorLivre(),m=rascunhoDoMapaNoEditor,c=CONFIG.editorDeFases.livre;
    const antes=capturarGeometriaLivre();e.cursor=p;e.aviso='';
    if(e.ferramenta==='mover')e.selecao=localizarItemLivre(p);
    else if(e.ferramenta==='apagar'){e.selecao=localizarItemLivre(p);apagarSelecaoLivre();}
    else {
        const grupo=e.ferramenta==='caminho'?'pontosLivres':'decoracoesLivres';
        const limite=grupo==='pontosLivres'?c.maximoDePontos:c.maximoDeDecoracoes;
        if(m[grupo].length>=limite)e.aviso=localizar('Limite atingido. Apague um item antes de adicionar outro.');
        else if(grupo==='pontosLivres') {
            const anterior=m.pontosLivres.at(-2),fim=m.pontosLivres.at(-1);
            if(Math.hypot(p.x-anterior.x,p.y-anterior.y)<c.grade || Math.hypot(p.x-fim.x,p.y-fim.y)<c.grade)e.aviso=localizar('Os pontos consecutivos precisam ficar separados por pelo menos uma célula.');
            else m.pontosLivres.splice(m.pontosLivres.length-1,0,{...p});
        } else m.decoracoesLivres.push({...p,tipo:e.tipo,escala:e.escala});
    }
    guardarAcaoLivre(antes);desenharEditorLivre();
}
function moverSelecaoLivre(p) {
    const e=obterEstadoEditorLivre(),s=e.selecao,m=rascunhoDoMapaNoEditor;
    if(!s)return;
    const item=m[s.grupo][s.indice];
    const x=s.grupo==='pontosLivres' && s.indice===0?0:s.grupo==='pontosLivres' && s.indice===m.pontosLivres.length-1?1200:p.x;
    if(s.grupo==='pontosLivres' && [m.pontosLivres[s.indice-1],m.pontosLivres[s.indice+1]].filter(Boolean)
        .some(vizinho=>Math.hypot(x-vizinho.x,p.y-vizinho.y)<CONFIG.editorDeFases.livre.grade))return;
    item.x=x; item.y=p.y;
}
function ajustarPontoLivre(x,y) {
    const c=CONFIG.editorDeFases.livre;
    return {x:Math.max(0,Math.min(c.largura,Math.round(x/c.grade)*c.grade)),y:Math.max(0,Math.min(c.altura,Math.round(y/c.grade)*c.grade))};
}

function configurarInteracaoDoEditorLivre() {
    const tela=document.getElementById('canvas-editor-livre');if(!tela)return;
    let arrasto=null;
    const encerrarArrasto=cancelar=>{
        if(!arrasto)return;
        const anterior=arrasto;arrasto=null;
        if(cancelar)Object.assign(rascunhoDoMapaNoEditor,JSON.parse(anterior.geometria));
        else guardarAcaoLivre(anterior.geometria);
        if(cancelar && tela.hasPointerCapture(anterior.ponteiro))tela.releasePointerCapture(anterior.ponteiro);
        desenharEditorLivre();
    };
    const ponto=evento=>{const b=tela.getBoundingClientRect();return ajustarPontoLivre((evento.clientX-b.left)*tela.width/b.width,(evento.clientY-b.top)*tela.height/b.height);};
    tela.onpointerdown=evento=>{
        if(evento.button!==0 || evento.isPrimary===false || arrasto)return;
        // O foco não pode rolar o mapa e deslocar o ponto sob o ponteiro.
        evento.preventDefault();tela.focus({preventScroll:true});usarFerramentaLivre(ponto(evento));
        if(obterEstadoEditorLivre().ferramenta==='mover' && obterEstadoEditorLivre().selecao){arrasto={geometria:capturarGeometriaLivre(),ponteiro:evento.pointerId};tela.setPointerCapture(evento.pointerId);}
    };
    tela.onpointermove=evento=>{if(arrasto?.ponteiro===evento.pointerId){moverSelecaoLivre(ponto(evento));desenharEditorLivre();}};
    tela.onpointerup=evento=>{if(arrasto?.ponteiro===evento.pointerId)encerrarArrasto(false);};
    tela.onpointercancel=tela.onlostpointercapture=evento=>{if(arrasto?.ponteiro===evento.pointerId)encerrarArrasto(true);};
    tela.onblur=()=>encerrarArrasto(true);
    tela.onkeydown=evento=>{
        encerrarArrasto(true);
        const e=obterEstadoEditorLivre(),passo=CONFIG.editorDeFases.livre.grade;
        if((evento.ctrlKey||evento.metaKey) && evento.key.toLowerCase()==='z'){evento.preventDefault();navegarHistoricoLivre(evento.shiftKey?'refazer':'desfazer');return;}
        const direcoes={ArrowLeft:[-passo,0],ArrowRight:[passo,0],ArrowUp:[0,-passo],ArrowDown:[0,passo]};
        if(direcoes[evento.key]){
            evento.preventDefault();const antes=capturarGeometriaLivre(),s=e.selecao;
            const origem=s?rascunhoDoMapaNoEditor[s.grupo][s.indice]:e.cursor;
            const [dx,dy]=direcoes[evento.key];e.cursor=ajustarPontoLivre(origem.x+dx,origem.y+dy);
            if(s)moverSelecaoLivre(e.cursor);guardarAcaoLivre(antes);desenharEditorLivre();
        }else if(evento.key==='Enter'){evento.preventDefault();usarFerramentaLivre(e.cursor);}
        else if(evento.key==='Delete'){evento.preventDefault();const antes=capturarGeometriaLivre();apagarSelecaoLivre();guardarAcaoLivre(antes);desenharEditorLivre();}
    };
    for(const mini of document.querySelectorAll('[data-previa-decoracao]')) {
        const c=mini.getContext('2d');c.translate(32,36);c.scale(.45,.45);
        desenhadoresDeDecoracao[mini.dataset.previaDecoracao]?.({x:0,y:0,escala:1},c);
    }
    // Um toque concluído ativa o controle diretamente; não depende do clique
    // de compatibilidade que o navegador pode suprimir após arrastar o canvas.
    for(const botao of document.querySelectorAll('.editor-livre-ferramentas button,.editor-livre-paleta button')) {
        let toque=null;
        botao.ontouchstart=evento=>{toque=evento.touches.length===1?evento.touches[0]:null;};
        botao.ontouchmove=botao.ontouchcancel=()=>{toque=null;};
        botao.addEventListener('touchend',evento=>{
            const fim=evento.changedTouches[0];
            const ativar=toque && fim?.identifier===toque.identifier && !evento.touches.length;
            toque=null;
            if(!ativar || botao.disabled)return;
            evento.preventDefault();botao.click();
        },{passive:false});
    }
    desenharEditorLivre();
}

function desenharCenarioLivre(tela,mapa,editar=false) {
    const c=tela.getContext('2d'),tema=temasDoMapa[mapa.tema]||temasDoMapa.campo;
    c.save();c.setTransform(tela.width/1200,0,0,tela.height/700,0,0);
    c.fillStyle=tema.terrenoBase;c.fillRect(0,0,1200,700);
    c.fillStyle=tema.terrenoClaro;
    for(let x=0;x<1200;x+=48)for(let y=(x/48)%2*24;y<700;y+=48)c.fillRect(x,y,24,24);
    for(const d of mapa.decoracoesLivres)desenhadoresDeDecoracao[d.tipo]?.(d,c);
    c.lineCap='square';c.lineJoin='miter';
    desenharCaminhosComTema(tema,[mapa.pontosLivres],c);
    const inicio=mapa.pontosLivres[0],fim=mapa.pontosLivres.at(-1);
    desenharPortao(inicio.x,inicio.y,'#57b9ff',localizar('Entrada'),false,c);
    const base=obterPosicaoDaTorreFinal(mapa.pontosLivres);
    desenharTorreFinal(base.x,base.y,tema,c);
    if(editar) {
        const e=obterEstadoEditorLivre();
        c.strokeStyle='#ffffff18';c.lineWidth=1;
        for(let x=0;x<1200;x+=20){c.beginPath();c.moveTo(x,0);c.lineTo(x,700);c.stroke();}
        for(let y=0;y<700;y+=20){c.beginPath();c.moveTo(0,y);c.lineTo(1200,y);c.stroke();}
        for(const [i,p] of mapa.pontosLivres.entries()) {
            c.fillStyle=e.selecao?.grupo==='pontosLivres'&&e.selecao.indice===i?'#ff8f7c':'#fff0a8';
            c.fillRect(p.x-7,p.y-7,14,14);c.strokeStyle='#242435';c.strokeRect(p.x-7,p.y-7,14,14);
        }
        if(e.selecao?.grupo==='decoracoesLivres') {
            const d=mapa.decoracoesLivres[e.selecao.indice];c.strokeStyle='#ffe895';c.lineWidth=3;c.strokeRect(d.x-32*d.escala,d.y-45*d.escala,64*d.escala,80*d.escala);
        }
        if(document.activeElement===tela){c.strokeStyle='#fff';c.lineWidth=2;c.strokeRect(e.cursor.x-10,e.cursor.y-10,20,20);}
    }
    c.restore();
}
function desenharEditorLivre() {
    const tela=document.getElementById('canvas-editor-livre'),m=rascunhoDoMapaNoEditor;
    if(!tela || m?.modoEdicao!=='livre')return;
    desenharCenarioLivre(tela,m,true);
    const e=obterEstadoEditorLivre(),c=CONFIG.editorDeFases.livre;
    if(e.selecao?.grupo==='decoracoesLivres')e.escala=m.decoracoesLivres[e.selecao.indice].escala;
    document.getElementById('escala-editor-livre').value=String(e.escala);
    document.querySelectorAll('[data-ferramenta-livre]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ferramentaLivre===e.ferramenta)));
    document.querySelectorAll('[data-decoracao-livre]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.decoracaoLivre===e.tipo && e.ferramenta==='decoracao')));
    document.querySelectorAll('[data-historico-livre]').forEach(b=>{b.disabled=!e[b.dataset.historicoLivre].length;});
    document.getElementById('estado-editor-livre').textContent=e.aviso||localizar('Pontos: {pontos}/{maxPontos} · Decorações: {decoracoes}/{maxDecoracoes}',{pontos:m.pontosLivres.length,maxPontos:c.maximoDePontos,decoracoes:m.decoracoesLivres.length,maxDecoracoes:c.maximoDeDecoracoes});
    desenharPreviaDoEditor();
}
