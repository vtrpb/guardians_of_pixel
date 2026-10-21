// Waves livres com caminhos da campanha e progresso próprio por save.
const CHAVE_PROGRESSO_CLASSICO = 'guardians-of-pixel-classico-v1';
let lobbyClassicoAtivo = false;
let dificuldadeClassicaSelecionada = 'normal';
let paginaClassica = 0;
let mapaClassicoSelecionado = null;
let rotaClassicaSelecionada = 0;
let contratoDaMareClassicaAtivo = false;
const TEXTOS_CLASSICO = {
 titulo:textoCasa('Modo clássico','Classic mode','Modo clásico'),
 mapas:textoCasa('Mapas','Maps','Mapas'),
 retorno:textoCasa('Voltar ao Modo história','Return to Story mode','Volver al Modo historia'),
 apresentacao:textoCasa('Explore {quantidade} cenários exclusivos desde o início. Complete fases da história para liberar seus mapas no clássico.','Explore {quantidade} exclusive landscapes from the start. Complete story stages to unlock their Classic maps.','Explora {quantidade} escenarios exclusivos desde el inicio. Completa fases de la historia para desbloquear sus mapas clásicos.'),
 premios:textoCasa('Mapas vencidos: 2 — Boia de Arpões; 3 — Isca Blindada; 5 — Torre de Torpedos; 9 — Canhão Blindado. Itens já obtidos não são duplicados.','Maps won: 2 — Harpoon Buoy; 3 — Armored Decoy; 5 — Torpedo Tower; 9 — Armored Cannon. Owned items are not duplicated.','Mapas ganados: 2 — Boya de Arpones; 3 — Señuelo Blindado; 5 — Torre de Torpedos; 9 — Cañón Blindado. Los objetos obtenidos no se duplican.'),
 jogar:textoCasa('Escolher defesas','Choose defenses','Elegir defensas'),
 venceu:textoCasa('Concluído','Completed','Completado'),
 livre:textoCasa('Disponível','Available','Disponible')
};
for (const [pt, en, es] of [
  ['Inflação', 'Inflation', 'Inflación'],
  ['Torres e melhorias 12% mais caras; torres causam 10% mais dano.', 'Towers and upgrades cost 12% more; towers deal 10% more damage.', 'Torres y mejoras cuestan 12% más; las torres causan 10% más de daño.'],
  ['Ventania', 'Strong wind', 'Viento fuerte'],
  ['Projéteis 25% mais rápidos, com 10% de chance de errar.', 'Projectiles travel 25% faster, with a 10% chance to miss.', 'Los proyectiles viajan un 25% más rápido, con un 10% de probabilidad de fallar.'],
  ['Dia de sorte', 'Lucky day', 'Día de suerte'],
  ['Inimigos têm 15% menos vida.', 'Enemies have 15% less health.', 'Los enemigos tienen un 15% menos de vida.']
]) textoCasa(pt, en, es);
for (const [pt, en, es] of [
  ['Mutação genética', 'Genetic mutation', 'Mutación genética'],
  ['Resistente', 'Resilient', 'Resistente'],['+20% vida, −15% velocidade', '+20% health, −15% speed', '+20% vida, −15% velocidad'],
  ['Agitado', 'Restless', 'Agitado'],['+20% velocidade, −15% vida', '+20% speed, −15% health', '+20% velocidad, −15% vida']
]) textoCasa(pt, en, es);
for (const [pt, en, es] of [
  ['Escasso', 'Scarce', 'Escaso'],
  ['Iron / Sobrevivência', 'Iron / Survival', 'Iron / Supervivencia'],
  ['Regras clássicas sem restrições extras.', 'Classic rules without extra restrictions.', 'Reglas clásicas sin restricciones extra.'],
  ['Torres e melhorias 15% mais caras; limite de 8 torres.', 'Towers and upgrades cost 15% more; limit of 8 towers.', 'Torres y mejoras cuestan un 15% más; límite de 8 torres.'],
  ['Inimigos mais fortes e rápidos, com ameaça própria em cada mapa.', 'Stronger and faster enemies, with a unique threat on each map.', 'Enemigos más fuertes y rápidos, con una amenaza propia en cada mapa.'],
  ['Perseguidor de Ferro', 'Iron Pursuer', 'Perseguidor de Hierro'],
  ['Bastião de Ferro', 'Iron Bastion', 'Bastión de Hierro'],
  ['O inimigo Iron retornou pelo caminho!', 'The Iron enemy returned along the path!', '¡El enemigo Iron regresó por el camino!'],
  ['Exclusivo do Iron em {mapa}', 'Iron exclusive on {mapa}', 'Exclusivo de Iron en {mapa}'],
  ['Armadura: reduz dano em {porcentagem}%', 'Armor: reduces damage by {porcentagem}%', 'Armadura: reduce el daño un {porcentagem}%'],
  ['Acelera com metade da vida', 'Speeds up at half health', 'Acelera con la mitad de vida'],
  ['Retorna uma vez após a derrota', 'Returns once after defeat', 'Regresa una vez tras ser derrotado']
]) textoCasa(pt, en, es);
if (typeof CONFIG !== 'undefined') {
  for (const inimigo of Object.values(CONFIG.inimigo)) {
    if (inimigo.numeroDoMapaIron) textoCasa(inimigo.nome, inimigo.nomeEn, inimigo.nomeEs);
  }
}
let temporizadorDoAnuncioClassico = null;
function sortearMutacaoClassica(tipo){
  if(!mapaPersonalizadoAtivo?.classico||tipoEhBoss(tipo)||Math.random()>=CONFIG.classico.mutacoes.chancePorInimigo)return null;
  const id=mapaPersonalizadoAtivo.mutacaoDiaria||obterMutacaoClassicaDoDia().id;
  return {id,...CONFIG.classico.mutacoes.variantes[id]};
}
function obterMutacaoClassicaDoDia(data=new Date()){
  const variantes=Object.keys(CONFIG.classico.mutacoes.variantes);
  const dia=Math.floor(Date.UTC(data.getFullYear(),data.getMonth(),data.getDate())/86400000);
  const id=variantes[dia%variantes.length];
  return {id,...CONFIG.classico.mutacoes.variantes[id]};
}
function alternarContratoDaMareClassica(){
  contratoDaMareClassicaAtivo=!contratoDaMareClassicaAtivo;
  mostrarApresentacaoClassico();
}
function desenharIndicadorMutacaoClassica(contexto,inimigo,x,y,tamanho){
  const configuracao=CONFIG.classico.mutacoes.variantes[inimigo.mutacaoClassica];
  if(!configuracao)return;
  contexto.save();
  contexto.strokeStyle=configuracao.cor;contexto.lineWidth=3;
  contexto.strokeRect(x-3,y-3,tamanho+6,tamanho+6);
  contexto.fillStyle='#12272d';contexto.fillRect(x+tamanho-10,y-13,31,14);
  contexto.fillStyle=configuracao.cor;contexto.font='bold 9px monospace';
  contexto.fillText(inimigo.mutacaoClassica==='resistente'?'HP+':'VEL+',x+tamanho-8,y-3);
  contexto.restore();
}
function obterModificadorClassicoAtivo() {
  return mapaPersonalizadoAtivo?.classico
    ? CONFIG.classico.modificadores[mapaPersonalizadoAtivo.modificadorClassico] || null
    : null;
}
function obterCustoComModificadorClassico(custo) {
  const modo = mapaPersonalizadoAtivo?.classico
    ? CONFIG.classico.dificuldades[mapaPersonalizadoAtivo.dificuldadeClassica] : null;
  const multiplicador = (modo?.multiplicadorCusto || 1) * (obterModificadorClassicoAtivo()?.multiplicadorCusto || 1);
  return Math.ceil(Math.round(custo * multiplicador * 100) / 100);
}
function encerrarModificadorClassico() {
  clearTimeout(temporizadorDoAnuncioClassico);
  temporizadorDoAnuncioClassico = null;
  const anuncio = document.getElementById('anuncio-modificador-classico');
  if (anuncio) anuncio.hidden = true;
}
function iniciarModificadorClassico() {
  encerrarModificadorClassico();
  const modificador = obterModificadorClassicoAtivo();
  if (!modificador) return;
  const anuncio = document.getElementById('anuncio-modificador-classico');
  anuncio.dataset.modificador = mapaPersonalizadoAtivo.modificadorClassico;
  document.getElementById('nome-modificador-classico').textContent = localizar(modificador.nome);
  document.getElementById('efeito-modificador-classico').textContent = localizar(modificador.descricao);
  void anuncio.offsetWidth;
  anuncio.hidden = false;
  temporizadorDoAnuncioClassico = setTimeout(encerrarModificadorClassico,
    CONFIG.classico.duracaoDoAnuncioDoModificadorMs);
}
for(const [pt,en,es] of [
 ['Estreia clássica','Classic debut','Debut clásico'],
 ['Vença uma partida no Modo clássico.','Win a match in Classic mode.','Gana una partida en el Modo clásico.'],
 ['Explorador clássico','Classic explorer','Explorador clásico'],
 ['Vença em todos os mapas do Modo clássico.','Win on every Classic map.','Gana en todos los mapas del Modo clásico.'],
 ['Mestre clássico','Classic master','Maestro clásico'],
 ['Vença em todos os mapas no modo Iron / Sobrevivência.','Win on every Classic map in Iron / Survival mode.','Gana en todos los mapas clásicos en el modo Iron / Supervivencia.']
]) textoCasa(pt,en,es);
textoCasa('Lendas do Cl\u00e1ssico','Classic legends','Leyendas del Cl\u00e1sico');
textoCasa('Vença os oito mapas do Modo Clássico em qualquer modo.','Win the eight Classic maps in any mode.','Gana los ocho mapas del Modo Clásico en cualquier modo.');
for(const [pt,en,es] of [
 ['Floresta de Cerejeiras','Cherry Blossom Forest','Bosque de Cerezos'],['Pétalas ao vento','Petals in the wind','Pétalos al viento'],
 ['Floresta Morta','Dead Forest','Bosque Muerto'],['O bosque da névoa','The misty woods','El bosque de la niebla'],
 ['Broto Errante','Wandering Sprout','Brote Errante'],['Guardião das Pétalas','Petal Guardian','Guardián de los Pétalos'],['Raposa Sakura','Sakura Fox','Zorro Sakura'],['Ancião das Cerejeiras','Cherry Elder','Anciano de los Cerezos'],
 ['Espectro de Cinzas','Ash Wraith','Espectro de Cenizas'],['Besouro de Mármore','Marble Beetle','Escarabajo de Mármol'],['Corvo da Névoa','Mist Raven','Cuervo de la Niebla'],['Rei Ressequido','Withered King','Rey Marchito'],
 ['Conclua a Fase {fase} na história.','Complete Stage {fase} in Story mode.','Completa la Fase {fase} en la historia.'],
 ['Exclusivo do clássico','Classic exclusive','Exclusivo del clásico'],['Página anterior','Previous page','Página anterior'],['Próxima página','Next page','Página siguiente'],
 ['Página {pagina} de {total}','Page {pagina} of {total}','Página {pagina} de {total}'],['Bloqueado','Locked','Bloqueado']
]) textoCasa(pt,en,es);
for(const [pt,en,es] of [
 ['Rota principal','Main route','Ruta principal'],['Caminho original','Original path','Camino original'],
 ['Trilha das pétalas','Petal trail','Sendero de pétalos'],['Segue o bosque pelo sul','Follows the forest south','Rodea el bosque por el sur'],
 ['Passagem das pedras','Stone passage','Paso de las piedras'],['Corta pelo vale baixo','Cuts through the lower valley','Cruza el valle bajo'],
 ['Margem espelhada','Mirrored shore','Orilla espejada'],['Contorna as salinas pelo sul','Circles the salt flats south','Rodea las salinas por el sur'],
 ['Rotas do mapa','Map routes','Rutas del mapa']
]) textoCasa(pt,en,es);

textoCasa('Caminho padrão','Standard path','Camino estándar');
textoCasa('Caminho alternativo','Alternate path','Camino alternativo');
textoCasa('Desvia pela outra margem do cenário','Detours along the other side of the scenery','Se desvía por el otro lado del escenario');
function obterMapasClassicos() { return [...[...CONFIG.classico.mapasExclusivos].sort((a,b)=>a.numero-b.numero),...CONFIG.fases]; }
function mapaClassicoEstaDesbloqueado(mapa) { return Boolean(mapa.caminho) || maiorFaseConcluida >= mapa.numero; }
function obterCaminhosBaseDoMapaClassico(mapa) {
 const caminhos=mapa.caminho?[mapa.caminho]:caminhosDasFases[mapa.numero];
 return Array.isArray(caminhos[0])?caminhos:[caminhos];
}
function criarRotaAlternativaDoMapaClassico(mapa) {
 if(mapa.rotaAlternativa)return {nome:'Caminho alternativo',descricao:mapa.rotaAlternativa.descricao,caminho:mapa.rotaAlternativa.caminho,caminhos:[mapa.rotaAlternativa.caminho]};
 const caminhoBase=obterCaminhosBaseDoMapaClassico(mapa)[0];
 const direcao=mapa.numero%2===0?1:-1;
 const limiteSuperiorDaAgua=mapa.agua?.y+CONFIG.classico.margemDaRotaAlternativaNaAgua;
 const limiteInferiorDaAgua=mapa.agua?.y+mapa.agua?.altura-CONFIG.classico.margemDaRotaAlternativaNaAgua;
 const caminho=caminhoBase.map((ponto,indice)=>{
  if(indice===0||indice===caminhoBase.length-1)return ponto;
  const onda=((indice+mapa.numero)%3-1)*42*direcao;
  const deslocamento=(indice%2===0?108:-108)*direcao+onda;
  const y=Math.max(58,Math.min(642,ponto.y+deslocamento));
  return Object.freeze({x:ponto.x,y:mapa.agua?Math.max(limiteSuperiorDaAgua,Math.min(limiteInferiorDaAgua,y)):y});
 });
 return {nome:'Caminho alternativo',descricao:'Desvia pela outra margem do cenário',caminho,caminhos:[caminho]};
}
function obterRotasDoMapaClassico(mapa) {
 const caminhos=obterCaminhosBaseDoMapaClassico(mapa);
 return [{nome:'Caminho padrão',descricao:'Caminho original',caminho:caminhos[0],caminhos},criarRotaAlternativaDoMapaClassico(mapa)];
}
function obterCaminhoClassicoSelecionado(mapa,indiceDaRota=0) {
 return obterRotasDoMapaClassico(mapa)[indiceDaRota]?.caminho || mapa.caminho;
}
function obterCaminhosDaRotaClassicaSelecionada(mapa,indiceDaRota=0) {
 const rota=obterRotasDoMapaClassico(mapa)[indiceDaRota]||obterRotasDoMapaClassico(mapa)[0];
 return rota.caminhos||[rota.caminho];
}

function obterMapaDoLobbyClassico() {
 if (!lobbyClassicoAtivo) return null;
 return obterMapasClassicos().find(m=>m.numero===mapaClassicoSelecionado && mapaClassicoEstaDesbloqueado(m)) || CONFIG.fases[0];
}

function atualizarCenarioDoLobbyClassico(mapa) {
 const exclusivo=Boolean(lobbyClassicoAtivo && mapa?.caminho);
 menuPrincipal.classList.toggle('lobby-classico',lobbyClassicoAtivo);
 menuPrincipal.classList.toggle('lobby-classico-exclusivo',exclusivo);
 if(exclusivo&&mapa.paleta){
  const [chaoEscuro,chaoClaro,tronco,caminho,detalhe,copa]=mapa.paleta;
  menuPrincipal.style.setProperty('--chao-escuro',chaoEscuro);
  menuPrincipal.style.setProperty('--chao-claro',chaoClaro);
  menuPrincipal.style.setProperty('--tronco',tronco);
  menuPrincipal.style.setProperty('--detalhe',detalhe);
  menuPrincipal.style.setProperty('--copa-clara',caminho);
  menuPrincipal.style.setProperty('--copa-escura',copa);
 }else for(const propriedade of ['--chao-escuro','--chao-claro','--tronco','--detalhe','--copa-clara','--copa-escura'])menuPrincipal.style.removeProperty(propriedade);
}

function carregarProgressoClassico() {
 let dados;try{dados=JSON.parse(localStorage.getItem(CHAVE_PROGRESSO_CLASSICO));}catch{}
 const modos=[...Object.keys(CONFIG.classico.dificuldades),'facil','medio','dificil'];
 const validas=obterMapasClassicos().flatMap(f=>modos.map(modo=>`${f.numero}:${modo}`));
 return {vitorias:[...new Set(Array.isArray(dados?.vitorias)?dados.vitorias.filter(v=>validas.includes(v)):[])]};
}
function atualizarLobbyClassico() {
 atualizarTemaDoLobby();
 const botao=document.getElementById('botao-capitulos-mapas');
 botao.querySelector('strong').textContent=lobbyClassicoAtivo?localizar(TEXTOS_CLASSICO.mapas):traduzir('lobby.capitulos');
 botao.querySelector('small').textContent=lobbyClassicoAtivo?localizar(TEXTOS_CLASSICO.titulo):traduzir('lobby.progressoCampanha');
 document.querySelector('#botao-modo-classico [data-localizar]').textContent=localizar(lobbyClassicoAtivo?TEXTOS_CLASSICO.retorno:TEXTOS_CLASSICO.titulo);
 document.querySelector('.botao-lobby-apoiador').hidden=lobbyClassicoAtivo;
 if(lobbyClassicoAtivo){
  const mapa=obterMapasClassicos().find(m=>m.numero===mapaClassicoSelecionado);
  const rota=mapa&&obterRotasDoMapaClassico(mapa)[rotaClassicaSelecionada];
  indicadorFaseSelecionada.textContent=mapa?`${localizar(mapa.nome)} · ${localizar(rota.nome)} · ${localizar(CONFIG.classico.dificuldades[dificuldadeClassicaSelecionada].nome)}`:localizar('Escolha um mapa');
 }else atualizarIndicadorFaseSelecionada();
 if(typeof atualizarPontosInterativosDoLobbyClassico==='function')atualizarPontosInterativosDoLobbyClassico();
}
function alternarModoClassico() {
 if(jogoIniciado)return;
 if(lobbyClassicoAtivo){
  desativarMapaPersonalizado();lobbyClassicoAtivo=false;fecharConteudoMenu();atualizarLobbyClassico();
  pararMusicaDoLobby();tentarIniciarMusicaDoLobby();
 }else{
  lobbyClassicoAtivo=true;fecharConteudoMenu();atualizarLobbyClassico();
  pararMusicaDoLobby();tentarIniciarMusicaDoLobby();
 }
 mostrarAvisoClassico('');
}
function mostrarAvisoClassico(texto){
 const aviso=document.getElementById('aviso-classico-lobby');
 aviso.textContent=texto?localizar(texto):'';aviso.hidden=!texto;
}
function selecionarMapaClassico(numero,indiceDaRota=0){
 const mapa=obterMapasClassicos().find(m=>m.numero===numero);
 if(!mapa||!mapaClassicoEstaDesbloqueado(mapa))return;
 mapaClassicoSelecionado=numero;rotaClassicaSelecionada=Math.max(0,Math.min(indiceDaRota,obterRotasDoMapaClassico(mapa).length-1));fecharConteudoMenu();mostrarAvisoClassico('');atualizarLobbyClassico();
}
function jogarClassico(){
 const mapa=obterMapasClassicos().find(m=>m.numero===mapaClassicoSelecionado);
 if(!mapa||!mapaClassicoEstaDesbloqueado(mapa)){mostrarAvisoClassico('Escolha o mapa primeiro para depois jogar');return;}
 if(mapa.agua&&!obterTorresAquaticasDisponiveis().length){mostrarAvisoClassico('Compre ou desbloqueie uma torre aquática');return;}
 mostrarAvisoClassico('');prepararPartidaClassica(mapa.numero);
}
function mostrarApresentacaoClassico() {
 if(jogoIniciado)return;
 if(!lobbyClassicoAtivo){lobbyClassicoAtivo=true;pararMusicaDoLobby();}
 atualizarLobbyClassico();tentarIniciarMusicaDoLobby();definirTelaDoMenuAberta('classico');
 if(typeof atualizarPontosInterativosDoLobbyClassico==='function')atualizarPontosInterativosDoLobbyClassico();
 const progresso=carregarProgressoClassico(),d=CONFIG.classico.dificuldades[dificuldadeClassicaSelecionada];
 const mapas=obterMapasClassicos(),total=Math.ceil(mapas.length/CONFIG.classico.mapasPorPagina);
 paginaClassica=Math.max(0,Math.min(paginaClassica,total-1));
 const visiveis=mapas.slice(paginaClassica*CONFIG.classico.mapasPorPagina,(paginaClassica+1)*CONFIG.classico.mapasPorPagina);
 conteudoMenu.innerHTML=`${criarCabecalhoConteudoMenu(localizar(TEXTOS_CLASSICO.titulo),localizar(TEXTOS_CLASSICO.mapas))}
 <section class="classico-apresentacao"><p>${localizar(TEXTOS_CLASSICO.apresentacao,{quantidade:CONFIG.classico.mapasExclusivos.length})}</p>
 <div class="classico-dificuldades">${Object.entries(CONFIG.classico.dificuldades).map(([id,modo])=>`<button class="botao" aria-pressed="${id===dificuldadeClassicaSelecionada}" onclick="selecionarDificuldadeClassica('${id}')"><strong>${localizar(modo.nome)}</strong><small>${localizar(modo.descricao)}</small></button>`).join('')}</div>
 <p>${d.waves} waves · ${d.creditos} ${localizar('créditos')} · ${d.limiteTorres} ${localizar('torres')} · +${d.fragmentos} Fragmentos / +${d.xp} XP</p>
  <button class="botao classico-abrir-laboratorio" onclick="mostrarLaboratorioClassico()">☢ ${localizar('Laboratório genético')} · ${localizar(obterMutacaoClassicaDoDia().nome)}</button>
 </section><div class="classico-galeria">
 <button class="classico-seta" aria-label="${localizar('Página anterior')}" onclick="mudarPaginaClassica(-1)" ${paginaClassica===0?'disabled':''}>❮</button>
 <div class="classico-mapas">${visiveis.map(f=>criarCartaoDoMapaClassico(f,progresso)).join('')}</div>
 <button class="classico-seta" aria-label="${localizar('Próxima página')}" onclick="mudarPaginaClassica(1)" ${paginaClassica===total-1?'disabled':''}>❯</button></div>
 <nav class="classico-paginas" aria-label="${localizar(TEXTOS_CLASSICO.mapas)}">${Array.from({length:total},(_,i)=>`<button aria-label="${localizar('Página {pagina} de {total}',{pagina:i+1,total})}" aria-current="${i===paginaClassica?'page':'false'}" onclick="abrirPaginaClassica(${i})">${i+1}</button>`).join('')}</nav>
 <p class="classico-premios">${localizar(TEXTOS_CLASSICO.premios)}</p>
 ${typeof criarResumoDesafiosClassicos==='function'?criarResumoDesafiosClassicos():''}
 <button class="botao classico-retorno" onclick="alternarModoClassico()">${localizar(TEXTOS_CLASSICO.retorno)}</button>`;
 for(const tela of conteudoMenu.querySelectorAll('[data-mapa-classico]')){
  const c=tela.getContext('2d'),mapa=mapas.find(m=>m.numero===Number(tela.dataset.mapaClassico));
  c.save();c.scale(tela.width/1200,tela.height/700);desenharCenarioClassico(c,mapa);c.restore();
 }
}
function criarCartaoDoMapaClassico(mapa,progresso) {
 const liberado=mapaClassicoEstaDesbloqueado(mapa);
 const requisito=localizar('Conclua a Fase {fase} na história.',{fase:mapa.numero});
 const titulo=localizar(mapa.caminho?mapa.nome:mapa.descricao);
 return `<article class="classico-mapa ${liberado?'':'classico-bloqueado'}" data-mapa="${mapa.numero}">
 <button class="classico-escolher-mapa" onclick="selecionarMapaClassico(${mapa.numero})" ${liberado?'':'disabled'} aria-label="${escaparTextoDoEditor(titulo+' · '+(liberado?localizar('Selecionar mapa'):requisito))}">
 <h3>${titulo}</h3><canvas width="480" height="280" data-mapa-classico="${mapa.numero}" aria-hidden="true"></canvas>
 ${!liberado?`<span class="classico-cadeado" aria-hidden="true"><svg viewBox="0 0 32 38"><path d="M8 16V10a8 8 0 0 1 16 0v6" fill="none" stroke="currentColor" stroke-width="5"/><rect x="3" y="15" width="26" height="21" rx="3" fill="currentColor"/><path d="M16 22v8" stroke="#564934" stroke-width="4"/></svg></span>`:''}
 <span class="classico-medalhas">${Object.entries(CONFIG.classico.dificuldades).map(([id,d])=>`<span class="classico-medalha ${progresso.vitorias.includes(`${mapa.numero}:${id}`)?'ganha':''}" title="${localizar(d.nome)}" aria-label="${localizar(d.nome)}: ${localizar(progresso.vitorias.includes(`${mapa.numero}:${id}`)?TEXTOS_CLASSICO.venceu:TEXTOS_CLASSICO.livre)}">★<small>${localizar(d.nomeMedalha||d.nome)}</small></span>`).join('')}</span>
 ${typeof criarSeloDoContratoClassico==='function'?criarSeloDoContratoClassico(mapa):''}</button>
 <p>${liberado?localizar(mapa.caminho?'Exclusivo do clássico':TEXTOS_CLASSICO.livre):requisito}</p>
 ${liberado?`<div class="classico-rotas" role="group" aria-label="${localizar('Rotas do mapa')}">${obterRotasDoMapaClassico(mapa).map((rota,indice)=>`<button class="botao classico-rota" onclick="selecionarMapaClassico(${mapa.numero},${indice})"><strong>${localizar(rota.nome)}</strong><small>${localizar(rota.descricao)}</small></button>`).join('')}</div>`:''}
 ${typeof descricaoClimaClassico==='function'?descricaoClimaClassico(mapa.numero):''}
 ${typeof criarDesafiosDoMapaClassico==='function'?criarDesafiosDoMapaClassico(mapa):''}
 ${typeof criarContratoDoMapaClassico==='function'?criarContratoDoMapaClassico(mapa):''}</article>`;
}
function abrirPaginaClassica(pagina){paginaClassica=pagina;mostrarApresentacaoClassico();}
function mudarPaginaClassica(delta){abrirPaginaClassica(paginaClassica+delta);}
function selecionarDificuldadeClassica(id){if(CONFIG.classico.dificuldades[id]){dificuldadeClassicaSelecionada=id;mostrarApresentacaoClassico();}}
function prepararPartidaClassica(numero){
 const fase=obterMapasClassicos().find(f=>f.numero===numero);if(!fase||jogoIniciado)return;
 if(!mapaClassicoEstaDesbloqueado(fase)){mostrarAviso(localizar('Conclua a Fase {fase} na história.',{fase:numero}));return;}
 if(fase.agua&&!obterTorresAquaticasDisponiveis().length){mostrarAvisoClassico('Compre ou desbloqueie uma torre aquática');return;}
  const c=CONFIG.classico,d=c.dificuldades[dificuldadeClassicaSelecionada];
  const idsDosModificadores=Object.keys(c.modificadores);
  const modificadorClassico=idsDosModificadores[Math.floor(Math.random()*idsDosModificadores.length)];
  const modificador=c.modificadores[modificadorClassico];
 if(mapaPersonalizadoAtivo)desativarMapaPersonalizado();
 faseSelecionadaAntesDoMapaPersonalizado=faseSelecionada;
 const rotaClassica=mapaClassicoSelecionado===numero?rotaClassicaSelecionada:0;
  mapaPersonalizadoAtivo={classico:true,numeroClassico:numero,rotaClassica,dificuldadeClassica:dificuldadeClassicaSelecionada,
   mutacaoDiaria:obterMutacaoClassicaDoDia().id,contratoDaMareAtivo:numero===103&&contratoDaMareClassicaAtivo,
   modificadorClassico,
   nome:`${localizar(fase.nome)} · ${localizar(d.nome)}`,tema:fase.tema,
   descricao:`${localizar(fase.descricao)} · ${localizar(modificador.nome)}: ${localizar(modificador.descricao)}`,
   criador:localizar(TEXTOS_CLASSICO.titulo),
  creditosIniciais:d.creditos,limiteDeTorres:d.limiteTorres,nivelDeDecoracoes:2,
  waves:Array.from({length:d.waves},(_,i)=>{
   const n=i+1,grupos=[{tipo:'normal',quantidade:c.inimigosIniciais+n*c.aumentoPorWave}];
   if(n>=c.waveElite)grupos.push({tipo:'elite',quantidade:Math.floor(n/c.waveElite)});
   if(n>=c.waveRapido)grupos.push({tipo:'rapido',quantidade:Math.floor(n/c.waveRapido)});
   if(n>=c.waveSabotador)grupos.push({tipo:'sabotador',quantidade:Math.floor(n/c.waveSabotador)});
   if(n%c.intervaloBoss===0)grupos.push({tipo:'boss',quantidade:1});
   if(d.waveInimigoExclusivo&&n>=d.waveInimigoExclusivo)grupos.push({tipo:`ironMapa${numero}`,quantidade:Math.floor(n/d.intervaloInimigoExclusivo)});
   const gruposDoMapa=new Map();
   for(const grupo of grupos){
    const tipo=grupo.tipo==='sabotador'
     ? CONFIG.substitutosDoSabotador[numero]||fase.elenco?.[grupo.tipo]||grupo.tipo
     : fase.elenco?.[grupo.tipo]||grupo.tipo;
    const incluirSuperSabotador=tipo==='sabotador'
     && deveAdicionarSuperSabotadorNaWave(n);
    if(incluirSuperSabotador)gruposDoMapa.set('superSabotador',1);
    gruposDoMapa.set(tipo,(gruposDoMapa.get(tipo)||0)+grupo.quantidade);
   }
   return {grupos:[...gruposDoMapa].map(([tipo,quantidade])=>({tipo,quantidade}))};
  })};
 faseSelecionada=CONFIG.editorDeFases.numeroInterno;afinidadesDasTorres=null;abrirSelecaoDeDefesas(false);
 if(fase.agua&&!Array.from(selecaoDeDefesasEmEdicao).some(t=>CONFIG.torre.tipos[t].aquatica)){
  if(selecaoDeDefesasEmEdicao.size>=CONFIG.torre.quantidadeMaximaDeDefesasSelecionadas)selecaoDeDefesasEmEdicao.delete([...selecaoDeDefesasEmEdicao].at(-1));
  selecaoDeDefesasEmEdicao.add(obterTorresAquaticasDisponiveis()[0]);mostrarSelecaoDeDefesas();
 }
}
function concluirPartidaClassica(){
 if(partidaEncerrada)return;
 partidaEncerrada=true;partidaVencida=true;
 const mapa=mapaPersonalizadoAtivo,d=CONFIG.classico.dificuldades[mapa.dificuldadeClassica];
 const progresso=carregarProgressoClassico(),chave=`${mapa.numeroClassico}:${mapa.dificuldadeClassica}`;
 if(!progresso.vitorias.includes(chave))progresso.vitorias.push(chave);
 localStorage.setItem(CHAVE_PROGRESSO_CLASSICO,JSON.stringify(progresso));
 fragmentosRecebidosNoResultado=d.fragmentos;fragmentosPixel+=d.fragmentos;salvarFragmentosPixel();registrarExperienciaDaPartida(d.xp);
 if(typeof registrarProgressoSemanalPorPropriedade==='function')registrarProgressoSemanalPorPropriedade('fasesConcluidas');
 desbloquearConquista('estreiaClassica');
 const mapas=new Set(progresso.vitorias.map(v=>Number(v.split(':')[0])));
 if(mapas.size===obterMapasClassicos().length)desbloquearConquista('exploradorClassico');
 if(CONFIG.classico.mapasDaConquistaLendas.every(numero=>mapas.has(numero)))desbloquearConquista('lendasDoClassico');
 if(obterMapasClassicos().every(f=>progresso.vitorias.includes(`${f.numero}:iron`)))desbloquearConquista('mestreClassico');
 for(const premio of CONFIG.classico.premios)if(mapas.size>=premio.mapas)comprasDaLoja.add(premio.torre);
 salvarComprasDaLoja();atualizarSalvoAtivo();tiros=[];tirosDosInimigos=[];tocarEfeitoVitoria();mostrarPainelDeResultado(true);
 seloResultado.textContent=localizar(TEXTOS_CLASSICO.titulo);
 descricaoResultado.textContent=`${mapa.nome} · +${d.fragmentos} Fragmentos · +${d.xp} XP`;
 if(typeof concluirDesafiosClassicos==='function')concluirDesafiosClassicos();
 if(typeof concluirContratoClassico==='function')concluirContratoClassico();
 if(typeof concluirDominioDasTorres==='function')concluirDominioDasTorres();
}
TELAS_DO_LOBBY_EM_TELA_CHEIA.add('classico');
atualizarLobbyClassico();
