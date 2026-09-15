// Roteiro e apresentação do confronto final. Balanceamento consumido por CONFIG.
const TRADUCOES_FASE18 = { en: {}, es: {} };
function falaDoConfronto(titulo, pt, en, es, cena = '') {
    TRADUCOES_FASE18.en[pt] = en;
    TRADUCOES_FASE18.es[pt] = es;
    return { titulo, texto: pt, assinatura: '', textoDoBotao: 'Continuar', meioComunicacao: 'presencial', cena };
}
const CONFIG_CONFRONTO_FINAL = Object.freeze({
    numeroDaFase: 18, boss: 'senhorDoTempo', waveDoBoss: 20, bossIntermediario: 'arconteDoLimiar',
    elenco: [{tipo:'batedorDeInstantes',base:4,porWave:1},{tipo:'couracadoDeAmpulheta',primeiraWave:2,wavesPorUnidade:3},{tipo:'tecelaoDeSegundos',primeiraWave:5,wavesPorUnidade:4}],
    introducao: [
        falaDoConfronto('O ÚLTIMO RELÓGIO','Além da porta, passagens para outros mundos cercam um relógio gigantesco. O Senhor do Tempo espera diante dele.','Beyond the door, passages to other worlds surround a giant clock. The Lord of Time waits before it.','Tras la puerta, pasajes a otros mundos rodean un reloj gigante. El Señor del Tiempo espera frente a él.'),
        falaDoConfronto('DEFENSOR','Eu não esqueci como cheguei aqui… Você apagou minhas lembranças.','I did not forget how I got here… You erased my memories.','No olvidé cómo llegué aquí… Tú borraste mis recuerdos.'),
        falaDoConfronto('SENHOR DO TEMPO','Eu trouxe você. Você precisava aprender a defender as torres. Lembrar de casa só faria você procurar uma saída.','I brought you here. You needed to learn to defend the towers. Remembering home would only make you look for a way out.','Yo te traje. Tenías que aprender a defender las torres. Recordar tu hogar solo te haría buscar una salida.'),
        falaDoConfronto('DEFENSOR','Então as torres… O que eu estava protegendo?','Then the towers… What was I protecting?','Entonces las torres… ¿Qué estaba protegiendo?'),
        falaDoConfronto('SENHOR DO TEMPO','As passagens que sustentam meu poder. As distorções atraem aquelas criaturas. Você as manteve longe, exatamente como eu precisava.','The passages that sustain my power. Their distortions attract those creatures. You kept them away, exactly as I needed.','Los pasajes que sostienen mi poder. Sus distorsiones atraen a esas criaturas. Las mantuviste lejos, tal como necesitaba.'),
        falaDoConfronto('DEFENSOR','Quantos vieram antes de mim?','How many came before me?','¿Cuántos vinieron antes que yo?'),
        falaDoConfronto('SENHOR DO TEMPO','Você encontrou os registros. Sabe que não foi o primeiro.','You found the records. You know you were not the first.','Encontraste los registros. Sabes que no fuiste el primero.'),
        falaDoConfronto('DEFENSOR','Então vou usar o que aprendi para abrir minha própria saída.','Then I will use what I learned to make my own way out.','Entonces usaré lo que aprendí para abrir mi propia salida.')
    ],
    final: [
        falaDoConfronto('O RELÓGIO SE PARTE','Suas defesas vencem. O relógio se rompe e as passagens começam a fechar. Você avança em direção à saída.','Your defenses prevail. The clock breaks and the passages begin to close. You move toward the exit.','Tus defensas vencen. El reloj se rompe y los pasajes empiezan a cerrarse. Avanzas hacia la salida.','relogio'),
        falaDoConfronto('UM ÚLTIMO INSTANTE','Um estalo. O mundo fica imóvel. Livre do alcance das torres, o Senhor do Tempo surge ao seu lado e o derruba. Caído, você vê uma lâmina de luz apontada para você.','A snap. The world stands still. Beyond the towers’ reach, the Lord of Time appears beside you and strikes you down. On the ground, you see a blade of light aimed at you.','Un chasquido. El mundo se detiene. Fuera del alcance de las torres, el Señor del Tiempo aparece a tu lado y te derriba. Desde el suelo, ves una hoja de luz apuntándote.','queda'),
        falaDoConfronto('SENHOR DO TEMPO','Acabou. Já não há mais volta.','It is over. There is no turning back.','Se acabó. Ya no hay vuelta atrás.','queda')
    ],
    ajuda: [
        falaDoConfronto('???','Solte-o.','Let them go.','Suéltalo.','ajuda'),
        falaDoConfronto('SENHOR DO TEMPO','Você?! Não tem autoridade nesta dimensão. Isso não lhe diz respeito!','You?! You have no authority in this dimension. This does not concern you!','¡¿Tú?! No tienes autoridad en esta dimensión. ¡Esto no te concierne!','ajuda'),
        falaDoConfronto('???','Não vim governar sua dimensão. Vim cumprir uma promessa.','I did not come to rule your dimension. I came to keep a promise.','No vine a gobernar tu dimensión. Vine a cumplir una promesa.','ajuda'),
        falaDoConfronto('UMA PROMESSA CUMPRIDA','A entidade intercepta a lâmina. O choque devolve movimento ao mundo. Atrás da sala do relógio, um corredor leva às ruínas do lado de fora.','The entity intercepts the blade. The clash sets the world moving again. Behind the clock room, a corridor leads to the ruins outside.','La entidad intercepta la hoja. El choque devuelve el movimiento al mundo. Detrás de la sala del reloj, un corredor lleva a las ruinas del exterior.','ajuda'),
        falaDoConfronto('???','Corra! Eu cuido dele!','Run! I will deal with him!','¡Corre! ¡Yo me encargo de él!','ajuda')
    ],
    casa: [
        falaDoConfronto('DE VOLTA PARA CASA','Você atravessa. Atrás de você, a passagem se fecha e os sons da luta desaparecem. Uma porta familiar. A luz entrando pela janela. Pela primeira vez, uma lembrança volta.','You step through. Behind you, the passage closes and the sounds of battle fade. A familiar door. Light through the window. For the first time, a memory returns.','Cruzas. Detrás de ti, el pasaje se cierra y los sonidos de la lucha desaparecen. Una puerta familiar. Luz por la ventana. Por primera vez, vuelve un recuerdo.','casa'),
        falaDoConfronto('DEFENSOR','Eu… conheço este lugar. Estou em casa.','I… know this place. I am home.','Yo… conozco este lugar. Estoy en casa.','casa'),
        falaDoConfronto('DEFENSOR','Finalmente… Mas por que está tão silencioso?','Finally… But why is it so quiet?','Por fin… Pero ¿por qué hay tanto silencio?','casa-relogio'),
        falaDoConfronto('O RELÓGIO PARADO','Você se aproxima do relógio da parede. O pêndulo está suspenso de lado. Nenhum tique. Nenhum movimento.','You approach the wall clock. Its pendulum hangs to one side. No ticking. No movement.','Te acercas al reloj de pared. El péndulo está suspendido hacia un lado. Ningún tictac. Ningún movimiento.','casa-relogio'),
        falaDoConfronto('ALÉM DA JANELA','Na rua, um carro parou no meio da curva. Uma pessoa está com o pé no ar. As gotas de chuva não chegam ao chão.','Outside, a car has stopped halfway through a turn. Someone has one foot in the air. The raindrops never reach the ground.','En la calle, un coche se detuvo en plena curva. Una persona tiene un pie en el aire. Las gotas de lluvia no llegan al suelo.','casa-rua'),
        falaDoConfronto('DEFENSOR','Não é só o relógio… Está tudo parado. Por que eu ainda consigo me mexer?','It is not just the clock… Everything has stopped. Why can I still move?','No es solo el reloj… Todo está detenido. ¿Por qué yo todavía puedo moverme?','casa-rua'),
        falaDoConfronto('DE VOLTA PARA CASA?','Você recua da janela. A passagem desapareceu. Esta é a sua casa… mas a fuga ainda não terminou.','You step back from the window. The passage is gone. This is your home… but the escape is not over yet.','Te apartas de la ventana. El pasaje ha desaparecido. Esta es tu casa… pero la huida aún no ha terminado.','casa-misterio')
    ],
    tragedia: [
        falaDoConfronto('VOCÊ','Você se pergunta: O que teria acontecido se eu tivesse ficado calado no primeiro encontro com a entidade?','You wonder: What would have happened if I had stayed silent when I first met the entity?','Te preguntas: ¿Qué habría pasado si me hubiera quedado callado en el primer encuentro con la entidad?','queda'),
        falaDoConfronto('O ÚLTIMO INSTANTE','Pouco depois, você sente a lâmina afiada perfurar seu corpo. Tudo fica escuro.','A moment later, you feel the sharp blade pierce your body. Everything goes dark.','Poco después, sientes la hoja afilada atravesar tu cuerpo. Todo queda oscuro.','escuro')
    ]
});
const CONFIG_BOSS_FINAL = Object.freeze({nome:'Senhor do Tempo',vida:15000,incrementoVidaPorAparicao:0,velocidade:0.55,tamanho:72,cor:'#ad63da',percentuaisDeVidaParaConvocar:[0.75,0.5,0.25],tipoDoReforco:'couracadoDeAmpulheta',quantidadeDeReforcos:1,quantidadeDeTorresSeladas:2,duracaoDoSelo:2500,avisoDaConvocacao:'O Senhor do Tempo paralisou suas defesas!',detalhe:'Fase 18 | Aos 75%, 50% e 25% de vida, sela duas torres por 2,5s e convoca um Couraçado'});
for (const [pt,en,es] of [
    ['O Último Relógio','The Last Clock','El Último Reloj'],
    ['O ÚLTIMO RELÓGIO','THE LAST CLOCK','EL ÚLTIMO RELOJ'],
    ['Fase 18','Stage 18','Fase 18'],
    ['O RELÓGIO SE PARTE','THE CLOCK BREAKS','EL RELOJ SE ROMPE'],
    ['UM ÚLTIMO INSTANTE','ONE LAST INSTANT','UN ÚLTIMO INSTANTE'],
    ['O ÚLTIMO INSTANTE','THE LAST INSTANT','EL ÚLTIMO INSTANTE'],
    ['UMA PROMESSA CUMPRIDA','A PROMISE KEPT','UNA PROMESA CUMPLIDA'],
    ['DE VOLTA PARA CASA','BACK HOME','DE VUELTA A CASA'],
    ['O RELÓGIO PARADO','THE STOPPED CLOCK','EL RELOJ DETENIDO'],
    ['ALÉM DA JANELA','BEYOND THE WINDOW','AL OTRO LADO DE LA VENTANA'],
    ['DE VOLTA PARA CASA?','BACK HOME?','¿DE VUELTA A CASA?'],
    ['Voltar ao menu','Return to menu','Volver al menú'],
    ['Rever diálogo após a Fase 18','Replay dialogue after Stage 18','Repetir diálogo tras la Fase 18'],
    ['Revisitar o Limbo','Revisit Limbo','Volver al Limbo'],
    [CONFIG_BOSS_FINAL.avisoDaConvocacao,'The Lord of Time froze your defenses!','¡El Señor del Tiempo paralizó tus defensas!'],
    [CONFIG_BOSS_FINAL.detalhe,'Stage 18 | At 75%, 50% and 25% health, seals two towers for 2.5s and summons an Hourglass Armored One','Fase 18 | Al 75%, 50% y 25% de vida, sella dos torres durante 2,5s e invoca un Acorazado']
]) { TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es; }
let etapasDoFinalDaCampanha = null;
let revendoFinalDaFase18 = false;
function atualizarBotaoDoFinalDaFase18() {
    const botao=document.getElementById('botao-rever-final18');
    if (!botao) return;
    botao.hidden=maiorFaseConcluida<18;
    botao.textContent=localizar('Rever diálogo após a Fase 18');
}
function reverFinalDaFase18() {
    if (maiorFaseConcluida<18 || jogoIniciado || florestaAtiva || exploracaoDoLimboAtiva) return;
    fecharConteudoMenu();ocultarPainelDeResultado();
    faseSelecionada=18;partidaEncerrada=true;partidaVencida=false;
    revendoFinalDaFase18=true;
    mostrarConfrontoFinal(true);
}

function faseAtualEhConfrontoFinal() { return !mapaPersonalizadoAtivo && faseSelecionada === CONFIG.confrontoFinal.numeroDaFase; }
function mostrarConfrontoFinal(final = false, indice = 0, manterEtapas = false) {
    if (final && indice === 0 && !manterEtapas) etapasDoFinalDaCampanha = [...CONFIG.confrontoFinal.final, ...(jornadaDoLimbo?.promessaDeAjuda === true ? CONFIG.confrontoFinal.ajuda : CONFIG.confrontoFinal.tragedia)];
    const etapas = final ? etapasDoFinalDaCampanha : CONFIG.confrontoFinal.introducao;
    const etapa = etapas[indice];
    definirJogoPausado(true);
    exibirConteudoDaCutscene({...etapa,tipo:final?'final-campanha':'entrada-confronto',etapa:String(indice),retomarPartida:!final});
    camadaCutsceneCarta.classList.toggle('final-campanha-escuro', etapa.cena === 'escuro');
    let tela = camadaCutsceneCarta.querySelector('.cena-confronto');
    if (!tela) { tela = document.createElement('canvas'); tela.className='cena-confronto'; tela.width=480; tela.height=160; camadaCutsceneCarta.querySelector('.carta-misteriosa').prepend(tela); }
    tela.hidden = !etapa.cena;
    if (etapa.cena) desenharCenaDoConfronto(tela.getContext('2d'),etapa.cena);
}
function avancarConfrontoFinal() {
    const final = camadaCutsceneCarta.dataset.tipoCarta === 'final-campanha';
    const indice = Number(camadaCutsceneCarta.dataset.etapaCena) + 1;
    const etapas = final ? etapasDoFinalDaCampanha : CONFIG.confrontoFinal.introducao;
    if (indice < etapas.length) return mostrarConfrontoFinal(final,indice);
    if (final && etapas.at(-1).cena === 'ajuda') {
        desbloquearConquista('finalmenteEmCasa');
        const nova=!revendoFinalDaFase18;
        revendoFinalDaFase18=false;
        if(!nova&&carregarFloresta()?.concluido){iniciarCasaParada();return;}
        iniciarFlorestaSecreta(nova); return;
    }
    if(final&&etapas.at(-1).cena==='casa-misterio'){iniciarCasaParada();return;}
    if (final) {
        if(etapas.at(-1).cena==='escuro')desbloquearConquista('esseEOFim');
        revendoFinalDaFase18=false;
        botaoContinuarCutsceneCarta.hidden = true;
        let escolhas = document.getElementById('acoes-final-campanha');
        if (!escolhas) { escolhas=document.createElement('div'); escolhas.id='acoes-final-campanha'; camadaCutsceneCarta.querySelector('.carta-misteriosa').append(escolhas); }
        escolhas.replaceChildren(); escolhas.hidden=false;
        const ajuda = etapas[etapas.length-1].cena.startsWith('casa');
        for (const [texto,fase] of [['Reiniciar a história',1],['Voltar à Fase 12',12],['Voltar ao lobby',null]]) {
            const botao=document.createElement('button');botao.textContent=localizar(texto);botao.onclick=()=>escolherDestinoDoDescanso(fase);escolhas.append(botao);
        }
        escolhas.dataset.final=ajuda?'casa':'tragico'; escolhas.firstElementChild.focus();
    } else { cutsceneDaTransmissaoRetomaPartida=false;ocultarCutsceneDaCarta();definirJogoPausado(false);botaoMenuPartida.focus(); }
}
function limparCenaDoConfronto() {
    camadaCutsceneCarta.classList.remove('final-campanha-escuro');
    camadaCutsceneCarta.querySelector('.cena-confronto')?.remove();
    document.getElementById('acoes-final-campanha')?.remove();
}
function desenharSenhorDoTempoFinal(c,x,y,tamanho) {
    c.save();c.translate(x,y);c.scale(tamanho/96,tamanho/96);
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    // Silhueta humana de terno escuro, camisa clara e gravata vermelha.
    b('#090b16',24,44,48,43);b('#252b43',26,46,44,35);
    b('#fff2c9',37,47,22,37);b('#cf3d60',46,51,5,25);b('#ee6b80',46,76,5,5);
    b('#111624',18,50,12,34);b('#30384e',18,51,8,29);
    b('#111624',66,50,12,34);b('#30384e',70,51,8,29);
    b('#3e4862',30,48,7,12);b('#3e4862',59,48,7,12);
    b('#151a2b',28,81,17,12);b('#151a2b',51,81,17,12);
    b('#080b13',25,91,20,5);b('#080b13',51,91,22,5);
    // Relógio redondo em degraus de pixels, aro magenta/ciano como no retrato.
    for(let py=0;py<44;py+=2)for(let px=0;px<48;px+=2) {
        const distancia=Math.hypot(px-23,py-21);
        if(distancia>22)continue;
        const cor=distancia>18?(px<23?'#df50f5':'#48e4db'):distancia>14?'#101522':'#f9eaa5';
        b(cor,24+px,py,2,2);
    }
    b('#413751',45,12,3,12);b('#413751',45,21,9,3);
    b('#55dedb',43,19,5,6);b('#635067',46,5,3,3);b('#635067',46,35,3,3);
    c.restore();
}
function desenharCenaDoConfronto(c,cena) {
    c.clearRect(0,0,480,160);c.fillStyle=cena==='escuro'?'#000':'#151026';c.fillRect(0,0,480,160);
    if(cena==='escuro') return;
    if(cena.startsWith('casa')) {desenharChegadaEmCasa(c,cena);return;}
    c.fillStyle='#57416e';c.fillRect(0,139,480,21);
    desenharSenhorDoTempoFinal(c,280,20,110);
    desenharJogadorCaidoNoConfronto(c);
    if(cena==='queda'||cena==='ajuda') desenharLaminaDoConfronto(c);
    if(cena==='ajuda') {
        const entidade=document.createElement('canvas');entidade.width=96;entidade.height=128;desenharRetratoDaEntidadeDoLimbo(entidade.getContext('2d'));
        c.drawImage(entidade,205,34,72,96);
        c.fillStyle='#544653';c.fillRect(40,85,90,54);c.fillStyle='#191321';c.fillRect(53,85,64,54);
    }
}
function desenharRuaParada(c,x,y,escala=1,tempo=0) {
    c.save();c.translate(x,y);c.scale(escala,escala);
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    b('#526d80',0,0,200,100);
    for(let i=0;i<5;i++) {
        b(i%2?'#6b7883':'#84938e',i*44,8+(i%2)*8,40,54);
        b('#d6c795',i*44+8,22,8,13);b('#314956',i*44+23,22,8,13);
    }
    b('#a6a597',0,62,200,12);b('#384957',0,74,200,26);
    for(let i=0;i<5;i++)b('#bdbca3',i*45,91,22,2);
    // Carro suspenso na curva e pedestre congelado no meio do passo.
    c.save();c.translate(tempo?((tempo*28)%270)-35:109,79);c.rotate(-.12);
    b('#21303c',-26,8,12,6);b('#21303c',18,8,12,6);b('#ac5c56',-31,-2,67,12);b('#ca8270',-17,-14,38,13);b('#a8d9d6',-12,-11,27,8);b('#ffe5a2',30,0,6,5);c.restore();
    b('#322b39',49,39,10,7);b('#d8b290',50,45,8,7);b('#c49b59',46,52,15,13);
    b('#333948',48,65,5,9);b('#333948',55,64,10,4);b('#262735',60,67,7,3);b('#262735',46,73,8,3);
    for(let i=0;i<29;i++){const px=(i*47+13)%198,py=(i*23+7+tempo*35)%95;b('#c4e7e9',px,py,1,4);}
    c.restore();
}
function desenharChegadaEmCasa(c,cena) {
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    if(cena==='casa-rua') {
        desenharRuaParada(c,20,-45,2.2);
        b('#493f42',0,0,20,160);b('#493f42',460,0,20,160);b('#aa9170',234,0,12,160);b('#aa9170',20,85,440,8);
        b('#ddc19a',0,148,480,12);
        desenharPessoaDoCastelo(388,148,'jogador',1.6,0,'cima',c);return;
    }
    b('#b8a383',0,0,480,118);b('#76645b',0,111,480,7);b('#66504a',0,118,480,42);
    for(let y=125;y<160;y+=14)b('#806252',0,y,480,2);
    for(let x=0;x<480;x+=60)b('#4f4242',x,118,2,42);
    b('#554346',25,20,66,98);b('#806454',31,25,54,91);b('#d9b870',74,75,5,5);
    b('#68594e',287,12,176,96);desenharRuaParada(c,292,17,.8);
    b('#dec79c',371,17,5,80);b('#dec79c',292,56,160,5);b('#e6d1ad',285,100,180,7);
    b('#644c40',154,13,43,84);b('#aa8050',158,17,35,39);b('#efe0af',162,21,27,27);
    b('#4a4650',174,25,3,12);b('#4a4650',174,34,10,3);
    b('#2b3039',161,58,29,33);b('#bf9b61',173,58,3,12);b('#bf9b61',176,68,3,7);b('#e0bc70',177,74,9,9);
    b('#4b5d55',105,99,37,23);b('#839582',101,91,45,14);
    const x=cena==='casa'?74:cena==='casa-relogio'?211:331;
    desenharPessoaDoCastelo(x,142,'jogador',1.45,0,cena==='casa'?'direita':'cima',c);
    if(cena==='casa-misterio'){b('#17243555',0,0,480,160);}
}
function desenharJogadorCaidoNoConfronto(c) {
    c.save();
    c.fillStyle='#0c0a13';c.fillRect(137,140,90,5);
    // Mesmo cabelo, roupas e membros do jogador controlado, deitado de lado.
    c.translate(190,126);c.rotate(-Math.PI/2);
    desenharPessoaDoCastelo(0,0,'jogador',1.65,2,'esquerda',c);
    c.restore();
}
function desenharLaminaDoConfronto(c) {
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    // Antebraço e mão seguram o cabo; lâmina desce na direção do jogador.
    b('#252b43',305,81,17,14);b('#3e4862',305,81,17,4);
    b('#e5d5ac',299,87,9,9);
    for(let i=0;i<5;i++) b(i%2?'#8d6448':'#403042',300-i*3,90+i,5,5);
    b('#e4bd65',283,90,5,18);b('#fff0a1',282,90,3,7);
    for(let i=0;i<17;i++) {
        const x=280-i*3,y=99+i;
        const largura=i>13?3:5,altura=i>13?3:7;
        b('#397b91',x,y,largura,altura);
        b('#9ce9ed',x,y,largura,3);
        if(i<13)b('#f0ffff',x,y,largura,1);
    }
    b('#d5ffff',227,117,5,2);
}
function desenharSalaDoUltimoRelogio() {
    ctx.save();ctx.fillStyle='#151026';ctx.fillRect(480,20,210,115);ctx.strokeStyle='#caa45b';ctx.lineWidth=6;ctx.strokeRect(495,28,180,98);
    ctx.fillStyle='#71e8df';ctx.fillRect(581,40,7,45);ctx.fillRect(581,78,48,7);
    for(const x of [65,1080]) {ctx.fillStyle='#735294';ctx.fillRect(x,65,45,130);ctx.fillStyle='#67cfcc';ctx.fillRect(x+10,75,25,100);}
    ctx.restore();
}
