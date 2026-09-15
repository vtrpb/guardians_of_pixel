// Apresentação do modo clássico; as partidas serão adicionadas posteriormente.
const CHAVE_APRESENTACAO_CLASSICO='guardians-of-pixel-apresentacao-classico-v1';
const TEXTOS_CLASSICO={
 titulo:textoCasa('Modo clássico','Classic mode','Modo clásico'),
 subtitulo:textoCasa('Novas formas de defender','New ways to defend','Nuevas formas de defender'),
 boasVindas:textoCasa('Bem-vindo ao Modo clássico!','Welcome to Classic mode!','¡Bienvenido al Modo clásico!'),
 apresentacao:textoCasa('No Modo clássico, você poderá escolher qualquer mapa e jogar nas dificuldades Fácil, Médio e Difícil. Ganhe recompensas, conquistas e novas defesas. Você sempre poderá voltar ao Modo história.','In Classic mode, you will be able to choose any map and play on Easy, Medium or Hard difficulty. Earn rewards, achievements and new defenses. You will always be able to return to Story mode.','En el Modo clásico, podrás elegir cualquier mapa y jugar en las dificultades Fácil, Medio y Difícil. Gana recompensas, logros y nuevas defensas. Siempre podrás volver al Modo historia.'),
 breve:textoCasa('Em breve','Coming soon','Próximamente'),
 retorno:textoCasa('Voltar ao Modo história','Return to Story mode','Volver al Modo historia'),
 resumo:textoCasa('Qualquer mapa. Três dificuldades. Novas recompensas.','Any map. Three difficulties. New rewards.','Cualquier mapa. Tres dificultades. Nuevas recompensas.')
};
function mostrarApresentacaoClassico(){
 if(jogoIniciado)return;
 let primeiraVez=true;
 try{primeiraVez=localStorage.getItem(CHAVE_APRESENTACAO_CLASSICO)!=='true';}catch{}
 definirTelaDoMenuAberta('classico');
 conteudoMenu.innerHTML=`${criarCabecalhoConteudoMenu(localizar(TEXTOS_CLASSICO.titulo),localizar(TEXTOS_CLASSICO.subtitulo))}
 <section class="classico-apresentacao">
  <span class="classico-emblema" aria-hidden="true">⚑</span>
  <span class="classico-em-breve">${localizar(TEXTOS_CLASSICO.breve)}</span>
  <h3>${localizar(primeiraVez?TEXTOS_CLASSICO.boasVindas:TEXTOS_CLASSICO.titulo)}</h3>
  <p id="classico-mensagem">${localizar(primeiraVez?TEXTOS_CLASSICO.apresentacao:TEXTOS_CLASSICO.resumo)}</p>
  <button type="button" class="botao" onclick="concluirApresentacaoClassico()">${localizar(TEXTOS_CLASSICO.retorno)}</button>
 </section>`;
}
function concluirApresentacaoClassico(){
 try{localStorage.setItem(CHAVE_APRESENTACAO_CLASSICO,'true');atualizarSalvoAtivo();}catch{}
 fecharConteudoMenu();
 document.getElementById('botao-modo-classico').focus();
}
TELAS_DO_LOBBY_EM_TELA_CHEIA.add('classico');
document.querySelectorAll('#botao-modo-classico [data-localizar]').forEach(elemento=>{elemento.textContent=localizar(elemento.dataset.localizar);});
