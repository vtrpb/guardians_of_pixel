// Desfecho da rota da promessa. Sem novas recompensas nem alteração do final trágico.
LUGARES_CASA.casa.objetos.find(o=>o.id==='janela').y=40;
LUGARES_CASA.casa.objetos.push({id:'cama',x:545,y:230,w:70,h:108});
const FALAS_DESCANSO=[
 textoCasa('Ainda não posso dormir. Preciso terminar o que comecei.','I cannot sleep yet. I need to finish what I started.','Todavía no puedo dormir. Debo terminar lo que empecé.'),
 textoCasa('Finalmente… posso descansar.','Finally… I can rest.','Por fin… puedo descansar.'),
 textoCasa('Será que tudo teria sido diferente se eu tivesse contado à entidade sobre o Senhor do Tempo… naquele primeiro encontro?','Would everything have been different if I had told the entity about the Lord of Time… when we first met?','¿Habría sido todo diferente si le hubiera contado a la entidad sobre el Señor del Tiempo… en aquel primer encuentro?')
];
textoCasa('Reiniciar a história','Restart the story','Reiniciar la historia');
textoCasa('Voltar à Fase 12','Return to Stage 12','Volver a la Fase 12');
textoCasa('Voltar ao lobby','Return to lobby','Volver al lobby');
function atualizarEscolhasDoDescanso(){
 const ativo=dialogoFloresta?.cena==='dormir'&&dialogoFloresta.indice===1;
 const opcoes=document.getElementById('escolhas-descanso');opcoes.hidden=!ativo;
 const titulo=document.getElementById('descanso-fim');titulo.hidden=!ativo;titulo.textContent=localizar('FIM');
 document.getElementById('floresta-continuar').hidden=ativo;
 for(const [id,texto]of [['descanso-reiniciar','Reiniciar a história'],['descanso-limbo','Voltar à Fase 12'],['descanso-lobby','Voltar ao lobby']])document.getElementById(id).textContent=localizar(texto);
 if(ativo&&!opcoes.contains(document.activeElement))document.getElementById('descanso-reiniciar').focus();
}
function escolherDestinoDoDescanso(fase){
 const naCama=dialogoFloresta?.cena==='dormir'&&dialogoFloresta.indice===1;
 const finalTragico=!camadaCutsceneCarta.hidden&&document.getElementById('acoes-final-campanha')?.dataset.final==='tragico';
 if(!naCama&&!finalTragico)return;
 if(fase===null){if(naCama)sairDaFloresta();else{ocultarCutsceneDaCarta();voltarAoLobbyDoResultado();atualizarSalvoAtivo();}return;}
 if(![1,12].includes(fase))return;
 if(!faseEstaDesbloqueada(fase))return;
 if(typeof recuperarRegistrosAntigosDaEnciclopedia==='function'&&!recuperarRegistrosAntigosDaEnciclopedia())return;
 const chaves=[CHAVE_JORNADA_DO_LIMBO,CHAVE_FLORESTA,CHAVE_CASA,CHAVE_CENA_FINAL_PONTO_ZERO_VISTA,CHAVE_CENA_FINAL_INTERVALO_PERDIDO_VISTA,CHAVE_INTRODUCAO_FASE_13_VISTA,CHAVE_CENA_FINAL_FASE_13_VISTA,CHAVE_INTRODUCAO_FASE_14_VISTA,CHAVE_CENA_FINAL_FASE_14_VISTA];
 if(fase===1)chaves.push(CHAVE_CARTA_MISTERIOSA_VISTA,CHAVE_CARTA_MAQUINA_DO_TEMPO_VISTA,CHAVE_TRANSMISSAO_PROJETO_RELOGIO_VISTA,CHAVE_REGISTRO_LABORATORIO_VISTO,CHAVE_CENA_FINAL_LABORATORIO_VISTA,CHAVE_TRANSMISSAO_FUTURO_DESPEDACADO_VISTA,CHAVE_CENA_FINAL_FUTURO_DESPEDACADO_VISTA);
 if(naCama)salvarCasaParada();
 const chaveEquipamentos='guardians-of-pixel-progresso-equipamentos-v1';
 const progressoEquipamentos=obterProgressoParaEquipamentos();
 chaves.push(CHAVE_PROGRESSO_FASES,CHAVE_CAPITULO_3_DESBLOQUEADO,chaveEquipamentos);
 if(fase===1)chaves.push(CHAVE_CAPITULO_2_DESBLOQUEADO,CHAVE_FASE_SECRETA_DESCOBERTA,CHAVE_INTERVALO_PERDIDO_DESCOBERTO);
 const anteriores=Object.fromEntries(chaves.map(chave=>[chave,localStorage.getItem(chave)]));
 try{
  localStorage.setItem('guardians-of-pixel-historia-antes-do-reinicio-v1',JSON.stringify(anteriores));
  chaves.forEach(chave=>localStorage.removeItem(chave));
  localStorage.setItem(chaveEquipamentos,String(progressoEquipamentos));
  localStorage.setItem(CHAVE_PROGRESSO_FASES,String(fase===1?0:fase));
  if(!atualizarSalvoAtivo())throw new Error('Falha ao gravar o slot do reinício.');
 }catch{
  for(const [chave,valor]of Object.entries(anteriores))try{if(valor===null)localStorage.removeItem(chave);else localStorage.setItem(chave,valor);}catch{}
  mostrarErroAoReiniciarHistoria();return;
 }
 if(finalTragico)ocultarCutsceneDaCarta();
 fecharFloresta();jornadaDoLimbo=null;
 {
  maiorFaseConcluida=fase===1?0:fase;capitulo3Desbloqueado=false;
  if(fase===1){
   capitulo2Desbloqueado=faseSecretaDescoberta=intervaloPerdidoDescoberto=false;
  }
  defesasSelecionadasParaPartida=normalizarSelecaoDeDefesas(defesasSelecionadasParaPartida);
  selecaoDeDefesasEmEdicao=new Set(defesasSelecionadasParaPartida);salvarSelecaoDeDefesas();
  atualizarBotaoDoFinalDaFase18();
 }
 cenaFinalPontoZeroVista=cenaFinalIntervaloPerdidoVista=introducaoFase13Vista=cenaFinalFase13Vista=introducaoFase14Vista=cenaFinalFase14Vista=false;
 if(fase===1)cartaMisteriosaVista=cartaDaMaquinaDoTempoVista=transmissaoProjetoRelogioVista=registroLaboratorioVisto=cenaFinalLaboratorioVista=transmissaoFuturoDespedacadoVista=cenaFinalFuturoDespedacadoVista=false;
 atualizarBotaoDoCastelo();voltarAoLobby();selecionarFase(fase);atualizarSalvoAtivo();iniciarPartida();
}
function mostrarErroAoReiniciarHistoria(){
 document.getElementById(florestaAtiva?'floresta-fala':'texto-cutscene-carta').textContent=localizar('Não foi possível salvar neste navegador.');
}
LUGARES_CASA.rua.objetos.push({id:'observatorio',x:900,y:135,w:54,h:20});
LUGARES_CASA.observatorio={nome:textoCasa('O observatório — a primeira hora','The observatory — the first hour','El observatorio — la primera hora'),largura:640,entrada:[90,290],objetos:[
 {id:'rua',x:80,y:330,w:44,h:15},
 {id:'origem',x:100,y:125,w:55,h:50},{id:'retrato',x:280,y:110,w:65,h:45},{id:'radioFinal',x:510,y:120,w:60,h:45},
 {id:'libertar',x:225,y:245,w:38,h:42},{id:'cortar',x:390,y:245,w:38,h:42},{id:'devolver',x:545,y:245,w:38,h:42}
]};
const OBJETIVOS_DESFECHO=[
 textoCasa('Entre no observatório: a porta sob a cúpula, entre a pessoa na luz e a oficina.','Enter the observatory: the door beneath the dome, between the person in the light and the workshop.','Entra al observatorio: la puerta bajo la cúpula, entre la persona de la luz y el taller.'),
 textoCasa('Examine o registro, a fotografia e o rádio do observatório.','Examine the observatory record, photograph and radio.','Examina el registro, la fotografía y la radio del observatorio.'),
 textoCasa('Primeiro, liberte os prisioneiros no painel com a porta aberta.','First, free the prisoners at the open-door panel.','Primero libera a los prisioneros en el panel de la puerta abierta.'),
 textoCasa('Agora corte a ligação do Senhor do Tempo no painel da corrente.','Now sever the Lord of Time’s connection at the chain panel.','Ahora corta la conexión del Señor del Tiempo en el panel de la cadena.'),
 textoCasa('Devolva as horas à cidade no painel do sol.','Return the hours to the city at the sun panel.','Devuelve las horas a la ciudad en el panel del sol.'),
 textoCasa('Tudo está pronto. Toque no painel do sol para concluir.','Everything is ready. Touch the sun panel to finish.','Todo está listo. Toca el panel del sol para terminar.'),
 textoCasa('Você finalmente está em paz. Descanse em sua cama.','You are finally at peace. Rest in your bed.','Por fin estás en paz. Descansa en tu cama.')
];
const FALAS_DESFECHO={
 origem:textoCasa('O registro explica tudo: o Senhor do Tempo roubou a primeira hora desta cidade para alimentar as passagens. Quando destruí o grande relógio, o vínculo que restou aqui congelou o mundo. Eu me movo porque voltei por uma passagem protegida pela entidade.','The record explains it: the Lord of Time stole this city’s first hour to feed the passages. When I destroyed the great clock, the remaining link here froze the world. I can move because I returned through a passage protected by the entity.','El registro lo explica: el Señor del Tiempo robó la primera hora de esta ciudad para alimentar los pasos. Al destruir el gran reloj, el vínculo restante congeló el mundo. Puedo moverme porque volví por un paso protegido por la entidad.'),
 retrato:textoCasa('Uma cópia inteira da fotografia. A cabeça de relógio… Era ele ao meu lado. Prometeu me ensinar a viajar entre mundos. Descobri que as passagens eram prisões e preparei uma volta. Ele me levou antes que eu terminasse, apagou minhas lembranças e me fez proteger seu poder. Agora eu lembro.','An intact copy of the photograph. The clock head… It was him beside me. He promised to teach me to travel between worlds. I discovered the passages were prisons and prepared a way back. He took me before I finished, erased my memories and made me protect his power. Now I remember.','Una copia completa de la fotografía. La cabeza de reloj… Era él a mi lado. Prometió enseñarme a viajar entre mundos. Descubrí que los pasos eran prisiones y preparé un regreso. Me llevó antes de terminar, borró mis recuerdos y me hizo proteger su poder. Ahora lo recuerdo.'),
 radioFinal:textoCasa('Aqui é Lina. Fiquei presa entre as passagens, mas seus sinais chegaram. O homem na luz é o antigo defensor: ele voltou antes de você e me ajudou a fazer aquela ligação. Primeiro abra a saída dos prisioneiros. Depois corte o vínculo dele. Só então devolva as horas. Assim ninguém ficará para trás.','This is Lina. I was trapped between the passages, but your signals reached me. The man in the light is the former defender: he returned before you and helped me make that call. First open the prisoners’ exit. Then cut his link. Only then return the hours. That way nobody is left behind.','Habla Lina. Quedé atrapada entre los pasos, pero recibí tus señales. El hombre en la luz es el antiguo defensor: volvió antes que tú y me ayudó a hacer aquella llamada. Primero abre la salida de los prisioneros. Luego corta su vínculo. Solo entonces devuelve las horas. Así nadie quedará atrás.'),
 preparar:textoCasa('Ainda preciso entender o registro, a fotografia e o rádio antes de tocar neste mecanismo.','I still need to understand the record, photograph and radio before touching this mechanism.','Antes de tocar este mecanismo debo entender el registro, la fotografía y la radio.'),
 ordem:textoCasa('Não vou arriscar deixar alguém preso. Primeiro a saída, depois a corrente, por último o sol.','I will not risk leaving anyone trapped. First the exit, then the chain, and finally the sun.','No arriesgaré dejar a alguien atrapado. Primero la salida, luego la cadena y al final el sol.'),
 libertar:textoCasa('A saída está aberta! Vejo Lina e os outros atravessando para a cidade. A entidade segura a passagem do outro lado. Desta vez, as torres estão protegendo quem precisava fugir.','The exit is open! I see Lina and the others crossing into the city. The entity holds the passage from the other side. This time, the towers are protecting the people who needed to escape.','¡La salida está abierta! Veo a Lina y a los demás cruzando a la ciudad. La entidad sostiene el paso desde el otro lado. Esta vez las torres protegen a quienes necesitaban escapar.'),
 ameaca:textoCasa('Você aprendeu tudo comigo. Sem as minhas passagens, nunca mais atravessará os mundos. Ainda pode devolver o controle a mim.','You learned everything from me. Without my passages, you will never cross the worlds again. You can still give control back to me.','Lo aprendiste todo de mí. Sin mis pasos no volverás a cruzar los mundos. Aún puedes devolverme el control.'),
 resposta:textoCasa('Aprendi a defender. Só estava defendendo a coisa errada. Ninguém mais vai perder a própria vida para sustentar o seu relógio.','I learned to defend. I was just defending the wrong thing. Nobody else will lose their life to keep your clock running.','Aprendí a defender. Solo defendía lo equivocado. Nadie más perderá su vida para mantener tu reloj.'),
 corte:textoCasa('A corrente se rompe. A imagem dele desaparece. Sem as horas roubadas e sem acesso às passagens, o Senhor do Tempo fica preso no próprio domínio. Não há cópia capaz de atravessar: a ligação foi desfeita.','The chain breaks. His image vanishes. Without the stolen hours or access to the passages, the Lord of Time is confined to his own realm. No copy can cross: the connection is gone.','La cadena se rompe. Su imagen desaparece. Sin las horas robadas ni acceso a los pasos, el Señor del Tiempo queda encerrado en su dominio. Ninguna copia puede cruzar: la conexión desapareció.'),
 feito:textoCasa('Este circuito já cumpriu sua função.','This circuit has already done its part.','Este circuito ya cumplió su función.'),
 gratidao:textoCasa('Você voltou por todos nós. Agora podemos seguir em frente.','You came back for all of us. Now we can move on.','Volviste por todos nosotros. Ahora podemos seguir adelante.')
};
const EPILOGO_DESFECHO=[
 ['VOCÊ',textoCasa('Devolvo a primeira hora. Uma gota alcança o chão. Depois outra. O vento passa pela janela, um carro termina a curva e a cidade volta a respirar.','I return the first hour. A drop reaches the ground. Then another. Wind passes through the window, a car completes its turn, and the city breathes again.','Devuelvo la primera hora. Una gota llega al suelo. Luego otra. El viento pasa por la ventana, un coche termina la curva y la ciudad vuelve a respirar.')],
 ['DRA. LINA VARELA',textoCasa('Estamos todos aqui. Eu guardei os registros. Ninguém vai precisar esquecer o que aconteceu para conseguir continuar.','We are all here. I kept the records. Nobody will have to forget what happened in order to move on.','Estamos todos aquí. Guardé los registros. Nadie tendrá que olvidar lo sucedido para seguir adelante.'),'audio'],
 ['???',textoCasa('A promessa está cumprida. As passagens dele estão fechadas. Vou cuidar dos que ainda procuram descanso no Limbo. Viva o tempo que é seu.','The promise is fulfilled. His passages are closed. I will care for those still seeking rest in Limbo. Live the time that is yours.','La promesa está cumplida. Sus pasos están cerrados. Cuidaré de quienes aún buscan descanso en el Limbo. Vive el tiempo que te pertenece.'),'audio'],
 ['VOCÊ',textoCasa('Lina segue seu caminho. O antigo defensor deixa de esperar dentro daquela luz. A entidade retorna ao Limbo. Pela primeira vez, ninguém me manda ficar diante de uma torre.','Lina goes her own way. The former defender no longer waits inside that light. The entity returns to Limbo. For the first time, nobody orders me to stand before a tower.','Lina sigue su camino. El antiguo defensor deja de esperar dentro de aquella luz. La entidad vuelve al Limbo. Por primera vez nadie me ordena quedarme ante una torre.')],
 ['VOCÊ',textoCasa('Em casa, o relógio funciona por conta própria. Lembro de onde vim e de como voltei. Coloco o caderno na mesa. Ainda há um dia inteiro lá fora. E desta vez, eu escolho como vivê-lo.','At home, the clock runs on its own. I remember where I came from and how I returned. I put the notebook on the table. There is still a whole day outside. And this time, I choose how to live it.','En casa, el reloj funciona por sí mismo. Recuerdo de dónde vine y cómo volví. Dejo el cuaderno en la mesa. Todavía hay un día entero afuera. Y esta vez yo elijo cómo vivirlo.')],
 ['VOCÊ',textoCasa('Não sou mais o prisioneiro de um relógio. O tempo é meu.','I am no longer a clock’s prisoner. Time is mine.','Ya no soy prisionero de un reloj. El tiempo es mío.')]
];
function objetivoDesfecho(){const s=estadoFloresta;if(!s.memoriaConcluida)return null;return OBJETIVOS_DESFECHO[s.historiaConcluida?6:s.local!=='observatorio'?0:(s.registrosFinais?.length||0)<3?1:2+(s.circuitosFinais||0)];}
function interagirDesfecho(o){
 const s=estadoFloresta,falar=(falas,terminar)=>conversarNaFloresta(falas,()=>{terminar?.();salvarCasaParada();});
 if(o.id==='cama'){
  if(!s.historiaConcluida){falar([['VOCÊ',FALAS_DESCANSO[0]]]);return true;}
  conversarNaFloresta([['VOCÊ',FALAS_DESCANSO[1]],['VOCÊ',FALAS_DESCANSO[2]]],()=>{salvarCasaParada();});
  dialogoFloresta.cena='dormir';atualizarInterfaceFloresta();return true;
 }
 if(s.historiaConcluida&&o.id==='pessoa'){falar([['VOCÊ',FALAS_DESFECHO.gratidao]]);return true;}
 if(s.local!=='observatorio')return false;
 if(['origem','retrato','radioFinal'].includes(o.id)){
  falar([[o.id==='radioFinal'?'DRA. LINA VARELA':'VOCÊ',FALAS_DESFECHO[o.id],o.id==='radioFinal'?'audio':'presencial']],()=>{s.registrosFinais??=[];if(!s.registrosFinais.includes(o.id))s.registrosFinais.push(o.id);});return true;
 }
 const passo=['libertar','cortar','devolver'].indexOf(o.id);if(passo<0)return false;
 if((s.registrosFinais?.length||0)<3){falar([['VOCÊ',FALAS_DESFECHO.preparar]]);return true;}
 const atual=s.circuitosFinais||0;
 if(passo===2&&atual===3){iniciarEpilogoDesfecho();return true;}
 if(passo!==atual){falar([['VOCÊ',FALAS_DESFECHO[passo<atual?'feito':'ordem']]]);return true;}
 if(passo===0)falar([['VOCÊ',FALAS_DESFECHO.libertar]],()=>{s.circuitosFinais=1;});
 if(passo===1)falar([['SENHOR DO TEMPO',FALAS_DESFECHO.ameaca,'video'],['VOCÊ',FALAS_DESFECHO.resposta],['VOCÊ',FALAS_DESFECHO.corte]],()=>{s.circuitosFinais=2;});
 if(passo===2){s.circuitosFinais=3;salvarCasaParada();iniciarEpilogoDesfecho();}
 return true;
}
function iniciarEpilogoDesfecho(){conversarNaFloresta(EPILOGO_DESFECHO,()=>{estadoFloresta.historiaConcluida=true;salvarCasaParada();});dialogoFloresta.cena='epilogo';}
function desenharObservatorio(c){
 const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};b('#20273f',0,0,640,70);
 for(let i=0;i<32;i++)b('#d5cca1',i*47%640,i*19%59,2,2);
 b('#3a4b61',168,77,438,220);b('#8a997e',173,82,428,210);b('#243244',178,87,418,200);
 for(const x of [225,390,545]){b('#b39b67',x,160,3,79);b('#b39b67',225,158,323,3);}
 c.save();c.translate(400,38);c.rotate(-.35);b('#798e98',-65,-12,126,24);b('#c8c9ad',48,-16,14,32);b('#4a5f70',-66,-16,15,32);c.restore();
 b('#bba777',382,45,6,27);b('#bba777',367,67,38,4);
}
function desenharObjetoDesfecho(c,o){
 if(o.id==='cama'){desenharCamaDaCasa(c,o,dialogoFloresta?.cena==='dormir');return true;}
 if(o.id==='observatorio'){
  c.fillStyle='#485571';c.fillRect(o.x-49,43,98,25);c.fillRect(o.x-38,30,76,13);c.fillRect(o.x-23,23,46,7);c.fillStyle='#b4b997';c.fillRect(o.x-2,23,4,45);c.fillRect(o.x-52,66,104,5);return false;
 }
 if(estadoFloresta.local!=='observatorio')return false;
 const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);},x=o.x,y=o.y;
 if(['origem','retrato','radioFinal'].includes(o.id)){
  b('#725b4b',x-o.w/2,y-o.h/2,o.w,o.h);b('#d0bd91',x-o.w/2+4,y-o.h/2+4,o.w-8,o.h-8);
  if(o.id==='origem')for(let i=0;i<5;i++)b('#596762',x-19,y-16+i*7,35-i%2*8,2);
  if(o.id==='retrato'){desenharSenhorDoTempoFinal(c,x+4,y-18,32);desenharPessoaDoCastelo(x-13,y+18,'jogador',.8,0,'baixo',c);}
  if(o.id==='radioFinal'){b('#354957',x-24,y-14,48,28);b('#9baba1',x-19,y-9,27,9);for(let i=0;i<4;i++)b('#172c37',x-18,y+3+i*3,27,1);b('#dbc593',x+14,y,5,5);}
  return true;
 }
 const i=['libertar','cortar','devolver'].indexOf(o.id);if(i<0)return false;
 b('#455e6c',x-21,y-25,42,49);b('#263b4b',x-17,y-21,34,36);const cor=(estadoFloresta.circuitosFinais||0)>i?'#e5cf87':'#8fa6a2';
 if(i===0){b(cor,x-12,y-15,5,27);b(cor,x-12,y-15,24,4);b(cor,x+8,y-15,4,14);}
 if(i===1){for(const dx of [-10,3]){b(cor,x+dx,y-12,8,3);b(cor,x+dx,y+7,8,3);b(cor,x+dx,y-12,3,22);}b(cor,x-4,y-3,11,3);}
 if(i===2){b(cor,x-7,y-11,14,14);for(const [dx,dy]of [[0,-18],[0,9],[-15,-5],[12,-5]])b(cor,x+dx,y+dy,4,5);}
 return true;
}
function desenharEpilogo(c){
 const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};b('#241b38',0,0,640,384);b('#c8a886',20,24,600,258);b('#766052',20,282,600,80);
 b('#785545',63,93,70,189);b('#b8895d',70,100,56,182);b('#ead397',111,208,6,6);
 c.save();c.translate(330,64);c.beginPath();c.rect(0,0,260,130);c.clip();desenharRuaParada(c,0,0,1.3,performance.now()/1000);
 b('#e5d0a4',123,0,6,130);b('#e5d0a4',0,64,260,5);c.restore();
 b('#9b784f',205,89,54,82);b('#efddb0',212,96,40,40);
 c.strokeStyle='#534959';c.lineWidth=3;c.beginPath();c.moveTo(232,116);c.lineTo(232+14*Math.sin(performance.now()/700),116-14*Math.cos(performance.now()/700));c.stroke();
 b('#ad865c',354,255,133,43);b('#ede0b8',373,260,54,25);b('#8b6e49',398,260,2,25);
 desenharPessoaDoCastelo(279,317,'jogador',1.7,0,'direita',c);
}
textoCasa('FIM','THE END','FIN');
function desenharCamaDaCasa(c,o,deitado){
 const x=o.x-o.w/2,y=o.y-o.h/2,b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
 b('#41333c',x-3,y-5,o.w+6,o.h+8);b('#92704f',x-3,y-7,o.w+6,15);b('#c2a377',x,y-5,o.w,5);
 b('#d2c4a5',x+5,y+10,o.w-10,o.h-18);b('#f0e5cb',x+12,y+13,o.w-24,20);b('#cabf9f',x+15,y+30,o.w-30,3);
 if(deitado){c.save();c.translate(o.x,y+47);desenharPessoaDoCastelo(0,0,'jogador',1.3,0,'baixo',c);c.restore();}
 b('#5e7289',x+5,y+38,o.w-10,o.h-46);b('#94adbb',x+5,y+38,o.w-10,7);
 for(let dx=12;dx<o.w-8;dx+=14)b('#718aa0',x+dx,y+47,3,o.h-61);
 b('#9c7751',x-3,y+o.h-9,o.w+6,9);b('#d1b285',x,y+o.h-9,o.w,3);
}
document.getElementById('descanso-reiniciar').onclick=()=>escolherDestinoDoDescanso(1);
document.getElementById('descanso-limbo').onclick=()=>escolherDestinoDoDescanso(CONFIG.intervaloPerdido.faseConcluidaParaAcesso);
document.getElementById('descanso-lobby').onclick=()=>escolherDestinoDoDescanso(null);
