// Pistas opcionais no lobby; a Enciclopédia é a única fonte de progresso.
const SEGREDOS_DO_LOBBY = [
 {id:'bussola',titulo:['Bússola sem norte','Compass without north','Brújula sin norte'],texto:[
  'A agulha aponta para você, mesmo quando a bússola gira. No verso, uma inscrição quase apagada: “Para encontrar o caminho de volta, lembre de onde veio.”',
  'The needle points at you even when the compass turns. On the back, a fading inscription reads: “To find the way back, remember where you came from.”',
  'La aguja te señala incluso cuando gira la brújula. Detrás, una inscripción casi borrada: «Para encontrar el camino de regreso, recuerda de dónde viniste».']},
 {id:'bilhete',titulo:['Bilhete sem assinatura','Unsigned note','Nota sin firma'],texto:[
  'O papel foi dobrado muitas vezes. Só uma frase continua legível: “Se tudo parecer novo outra vez, procure as pequenas marcas que você deixou.” Não há data nem assinatura.',
  'The paper has been folded many times. Only one sentence remains readable: “If everything seems new again, look for the small marks you left behind.” There is no date or signature.',
  'El papel ha sido doblado muchas veces. Solo se lee una frase: «Si todo vuelve a parecer nuevo, busca las pequeñas marcas que dejaste». No hay fecha ni firma.']},
 {id:'cristal',titulo:['Cristal apagado','Faded crystal','Cristal apagado'],texto:[
  'Dentro do cristal, três pontos de luz desenham um caminho e desaparecem. Por um instante, o reflexo da sua mão permanece depois que você a afasta.',
  'Inside the crystal, three points of light trace a path and disappear. For a moment, the reflection of your hand lingers after you move it away.',
  'Dentro del cristal, tres puntos de luz dibujan un camino y desaparecen. Por un instante, el reflejo de tu mano permanece después de que la apartas.']}
];
const CONCLUSAO_SEGREDOS_LOBBY={id:'marcas',titulo:['As marcas do viajante','The traveler’s marks','Las marcas del viajero'],texto:[
 'Uma direção, um recado e um reflexo que ficou para trás. Você decide guardar essas pistas: se o caminho mudar, suas descobertas ainda poderão ajudar a reconhecê-lo.',
 'A direction, a message and a reflection left behind. You decide to keep these clues: if the path changes, your discoveries may still help you recognize it.',
 'Una dirección, un mensaje y un reflejo que quedó atrás. Decides guardar estas pistas: si cambia el camino, tus descubrimientos aún podrán ayudarte a reconocerlo.']};
for(const pista of [...SEGREDOS_DO_LOBBY,CONCLUSAO_SEGREDOS_LOBBY]){textoCasa(...pista.titulo);textoCasa(...pista.texto);}
for(const t of [
 ['Objetos encontrados','Found objects','Objetos encontrados'],['Examinar bússola','Examine compass','Examinar brújula'],['Examinar bilhete','Examine note','Examinar nota'],['Examinar cristal','Examine crystal','Examinar cristal'],
 ['Fechar pista','Close clue','Cerrar pista'],['Pistas guardadas: {quantidade}/3','Clues saved: {quantidade}/3','Pistas guardadas: {quantidade}/3'],
 ['Ler na Enciclopédia','Read in the Encyclopedia','Leer en la Enciclopedia'],['Tentar salvar novamente','Try saving again','Intentar guardar de nuevo'],
 ['As três pistas se completam. Um novo registro foi guardado na Enciclopédia.','The three clues fit together. A new record was saved in the Encyclopedia.','Las tres pistas se complementan. Se ha guardado un nuevo registro en la Enciclopedia.']
])textoCasa(...t);

let segredoLobbyAberto=null,origemSegredoLobby=null;
function examinarSegredoDoLobby(id){
 const pista=SEGREDOS_DO_LOBBY.find(p=>p.id===id),menu=document.getElementById('menu-principal');
 if(!pista||jogoIniciado||menu.inert||menu.hidden||!document.getElementById('tela-inicial-jogo').hidden)return;
 segredoLobbyAberto=id;origemSegredoLobby=document.querySelector(`[data-segredo-lobby="${id}"]`);
 const encontrados=carregarRegistrosDaEnciclopedia(),ids=[`lobby-${id}`];
 if(SEGREDOS_DO_LOBBY.every(p=>p.id===id||encontrados.has(`lobby-${p.id}`)))ids.push('lobby-marcas');
 const salvo=guardarRegistrosNaEnciclopedia(ids),atuais=carregarRegistrosDaEnciclopedia();
 document.getElementById('titulo-segredo-lobby').textContent=localizar(pista.titulo[0]);
 document.getElementById('texto-segredo-lobby').textContent=localizar(pista.texto[0]);
 document.getElementById('estado-segredo-lobby').textContent=salvo?localizar('Pistas guardadas: {quantidade}/3',{quantidade:SEGREDOS_DO_LOBBY.filter(p=>atuais.has(`lobby-${p.id}`)).length}):localizar('Não foi possível salvar neste navegador.');
 const conclusao=document.getElementById('conclusao-segredo-lobby');conclusao.hidden=!salvo||!atuais.has('lobby-marcas');conclusao.textContent=localizar('As três pistas se completam. Um novo registro foi guardado na Enciclopédia.');
 const repetir=document.getElementById('salvar-segredo-lobby');repetir.hidden=salvo;repetir.textContent=localizar('Tentar salvar novamente');
 const ler=document.getElementById('ler-segredo-lobby');ler.hidden=!salvo;ler.textContent=localizar('Ler na Enciclopédia');
 document.getElementById('fechar-segredo-lobby').textContent=localizar('Fechar pista');
 const dialogo=document.getElementById('dialogo-segredo-lobby');if(!dialogo.open)dialogo.showModal();document.getElementById('fechar-segredo-lobby').focus();
}
function fecharSegredoDoLobby(){document.getElementById('dialogo-segredo-lobby').close();}
function lerSegredoDoLobby(){const id=segredoLobbyAberto;fecharSegredoDoLobby();abrirRegistroDaEnciclopedia(`lobby-${id}`);}
document.getElementById('dialogo-segredo-lobby').addEventListener('keydown',evento=>{if(evento.key==='Escape')evento.stopPropagation();});
document.getElementById('dialogo-segredo-lobby').addEventListener('close',()=>origemSegredoLobby?.focus());
const objetosEscondidosLobby=document.querySelector('.segredos-lobby');
document.getElementById('menu-principal').append(objetosEscondidosLobby);
objetosEscondidosLobby.querySelectorAll('[data-localizar-aria-label]').forEach(el=>el.setAttribute('aria-label',localizar(el.dataset.localizarAriaLabel)));
