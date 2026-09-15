// Segundo trecho do tempo parado: passagem, enigma e lembrança preservados por slot.
LUGARES_CASA.oficina.objetos.push({id:'arquivo',x:550,y:105,w:46,h:15});
LUGARES_CASA.arquivo={nome:textoCasa('O arquivo sem horas','The timeless archive','El archivo sin horas'),largura:640,entrada:[100,290],objetos:[
    {id:'oficina',x:80,y:330,w:44,h:15},
    {id:'inscricao',x:100,y:120,w:55,h:40},
    {id:'seloLuz',x:245,y:210,w:34,h:40},
    {id:'seloPonte',x:390,y:210,w:34,h:40},
    {id:'seloPorta',x:535,y:210,w:34,h:40},
    {id:'caderno',x:390,y:105,w:70,h:42}
]};
const ORDEM_SELOS_MEMORIA=['seloLuz','seloPonte','seloPorta'];
const TEXTO_MEMORIA={
    projeto:textoCasa('A memória é a chave… A frase também aparece no verso da foto. Sob o desenho, encontro uma trava. A parede ao lado se abre. Eu escondi alguma coisa aqui.','Memory is the key… The same words are on the back of the photo. Beneath the drawing, I find a latch. The wall beside it opens. I hid something here.','La memoria es la llave… La frase también aparece detrás de la foto. Bajo el dibujo encuentro un pestillo. La pared de al lado se abre. Escondí algo aquí.'),
    inscricao:textoCasa('Minha letra: “Primeiro, acenda a LUZ. Depois, erga a PONTE. Só então abra a PORTA. As torres devem proteger a passagem, nunca a prisão.”','My handwriting: “First, kindle the LIGHT. Then raise the BRIDGE. Only then open the DOOR. The towers must protect the passage, never the prison.”','Mi letra: «Primero enciende la LUZ. Después levanta el PUENTE. Solo entonces abre la PUERTA. Las torres deben proteger el paso, nunca la prisión».'),
    erro:textoCasa('Os símbolos se apagam. A ordem está errada. Posso tentar de novo; a inscrição deve ajudar.','The symbols go dark. The order is wrong. I can try again; the inscription should help.','Los símbolos se apagan. El orden es incorrecto. Puedo intentarlo otra vez; la inscripción debe ayudar.'),
    luz:textoCasa('A luz acendeu. Um fio dourado liga o primeiro pedestal ao segundo.','The light is on. A golden thread connects the first pedestal to the second.','La luz se encendió. Un hilo dorado une el primer pedestal al segundo.'),
    ponte:textoCasa('A ponte se iluminou. Falta abrir a porta.','The bridge lit up. The door is all that remains.','El puente se iluminó. Falta abrir la puerta.'),
    porta:textoCasa('Os três símbolos brilham juntos. A proteção do caderno se desfez.','All three symbols shine together. The notebook’s protective seal has faded.','Los tres símbolos brillan juntos. La protección del cuaderno desapareció.'),
    trancado:textoCasa('Uma película de luz me impede de tocar o caderno. Os três pedestais estão ligados a ela.','A film of light keeps me from touching the notebook. The three pedestals are connected to it.','Una película de luz me impide tocar el cuaderno. Los tres pedestales están conectados a ella.'),
    lembranca1:textoCasa('Ao tocar o caderno, reconheço o cheiro de madeira e tinta. A oficina está iluminada. A chuva se move. Estou aqui… antes de tudo acontecer.','As I touch the notebook, I recognize the smell of wood and ink. The workshop is lit. The rain moves. I am here… before any of this happened.','Al tocar el cuaderno reconozco el olor a madera y tinta. El taller está iluminado. La lluvia se mueve. Estoy aquí… antes de que todo ocurriera.'),
    lembranca2:textoCasa('Lembro das minhas mãos copiando o desenho de uma torre. Eu procurava um jeito de manter uma passagem aberta para voltar. Não construí aquelas torres… mas já estudava como funcionavam.','I remember my hands copying a tower blueprint. I was looking for a way to keep a passage open so I could return. I did not build those towers… but I was already studying how they worked.','Recuerdo mis manos copiando el plano de una torre. Buscaba cómo mantener un paso abierto para volver. No construí aquellas torres… pero ya estudiaba cómo funcionaban.'),
    lembranca3:textoCasa('Na última página, eu escrevia: “Se ele apagar minhas lembranças, ainda posso reconhecer o que deixei para trás.” Eu sabia que podia esquecer… e preparei este caminho para mim.','On the last page, I was writing: “If he erases my memories, I may still recognize what I left behind.” I knew I might forget… and prepared this trail for myself.','En la última página escribía: «Si borra mis recuerdos, aún puedo reconocer lo que dejé atrás». Sabía que podía olvidar… y preparé este camino para mí.'),
    lembranca4:textoCasa('A lembrança se desfaz antes que eu veja quem entra pela porta. De volta ao arquivo, noto um endereço no caderno: o observatório. Preciso perguntar à pessoa na luz.','The memory fades before I can see who enters the doorway. Back in the archive, I notice an address in the notebook: the observatory. I need to ask the person in the light.','El recuerdo se desvanece antes de ver quién entra por la puerta. De vuelta en el archivo noto una dirección en el cuaderno: el observatorio. Debo preguntar a la persona de la luz.'),
    caderno:textoCasa('O endereço do observatório continua aqui. Desta vez, não vou esquecer.','The observatory address is still here. This time, I will not forget.','La dirección del observatorio sigue aquí. Esta vez no olvidaré.'),
    pessoa:textoCasa('Ao ver o caderno, a pessoa consegue falar outra vez: “Você encontrou. O observatório… foi lá que a primeira hora desapareceu. Vá antes que ele perceba.” A luz enfraquece, mas a lembrança fica com você.','Seeing the notebook, the person manages to speak again: “You found it. The observatory… that is where the first hour vanished. Go before he notices.” The light fades, but the memory stays with you.','Al ver el cuaderno la persona logra hablar otra vez: «Lo encontraste. El observatorio… allí desapareció la primera hora. Ve antes de que él lo note». La luz se debilita, pero el recuerdo permanece contigo.')
};
const OBJETIVOS_MEMORIA=[
 textoCasa('Pistas reunidas. A memória é a chave. Examine novamente o projeto da oficina.','Clues gathered. Memory is the key. Examine the workshop blueprint again.','Pistas reunidas. La memoria es la llave. Examina de nuevo el plano del taller.'),
 textoCasa('Entre na passagem que se abriu na oficina.','Enter the passage that opened in the workshop.','Entra en el paso que se abrió en el taller.'),
 textoCasa('Leia a inscrição e ative os três símbolos na ordem correta.','Read the inscription and activate the three symbols in order.','Lee la inscripción y activa los tres símbolos en orden.'),
 textoCasa('A proteção se abriu. Examine o caderno.','The seal is open. Examine the notebook.','La protección se abrió. Examina el cuaderno.'),
 textoCasa('Volte à rua e mostre o caderno à pessoa na luz.','Return to the street and show the notebook to the person in the light.','Vuelve a la calle y muestra el cuaderno a la persona de la luz.'),
 textoCasa('Uma lembrança recuperada. Próximo destino: o observatório. Continua…','One memory recovered. Next destination: the observatory. To be continued…','Un recuerdo recuperado. Próximo destino: el observatorio. Continuará…')
];
function objetivoArquivoMemoria(){
    const s=estadoFloresta;if(!s.concluido)return null;
    return OBJETIVOS_MEMORIA[s.memoriaConcluida?5:s.memoriaRecuperada?4:!s.passagemAberta?0:s.local!=='arquivo'?1:s.selosAtivos===3?3:2];
}
function interagirArquivoMemoria(o){
    const s=estadoFloresta;
    const falar=(texto,terminar)=>conversarNaFloresta([['VOCÊ',texto]],()=>{terminar?.();salvarCasaParada();});
    if(o.id==='projeto'&&s.concluido&&!s.passagemAberta){falar(TEXTO_MEMORIA.projeto,()=>{s.passagemAberta=true;s.selosAtivos=0;});return true;}
    if(o.id==='pessoa'&&s.memoriaRecuperada){falar(TEXTO_MEMORIA.pessoa,()=>{s.memoriaConcluida=true;});return true;}
    if(o.id==='inscricao'){falar(TEXTO_MEMORIA.inscricao);return true;}
    if(ORDEM_SELOS_MEMORIA.includes(o.id)){
        if(s.selosAtivos===3){falar(TEXTO_MEMORIA.porta);return true;}
        const indice=s.selosAtivos||0,correto=o.id===ORDEM_SELOS_MEMORIA[indice];
        falar(correto?[TEXTO_MEMORIA.luz,TEXTO_MEMORIA.ponte,TEXTO_MEMORIA.porta][indice]:TEXTO_MEMORIA.erro,()=>{s.selosAtivos=correto?indice+1:0;});return true;
    }
    if(o.id==='caderno'){
        if(s.selosAtivos!==3){falar(TEXTO_MEMORIA.trancado);return true;}
        if(s.memoriaRecuperada){falar(TEXTO_MEMORIA.caderno);return true;}
        conversarNaFloresta([1,2,3,4].map(i=>['VOCÊ',TEXTO_MEMORIA['lembranca'+i]]),()=>{s.memoriaRecuperada=true;salvarCasaParada();});
        dialogoFloresta.cena='lembranca';return true;
    }
    return false;
}
function desenharDecoracaoArquivo(c){
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    b('#26313e',0,0,640,70);b('#a99773',0,63,640,5);
    for(let x=16;x<640;x+=80){b('#3c4b59',x,8,54,48);b('#77867e',x+4,12,46,3);b('#172832',x+6,20,42,31);}
    b('#313c4e',184,82,406,174);b('#667f82',190,88,394,162);b('#263442',194,92,386,154);
    for(let x=240;x<540;x+=145){b('#a99562',x,148,4,61);if(x<530)b('#a99562',x,145,149,3);}
    b('#665a43',55,310,52,30);for(let i=0;i<5;i++)b('#a29578',59,314+i*5,44-i*3,2);
}
function desenharObjetoArquivo(c,o){
    const s=estadoFloresta,b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    if(o.id==='inscricao'){
        b('#4b4b4a',o.x-31,o.y-25,62,51);b('#b6a982',o.x-27,o.y-21,54,43);
        for(let i=0;i<5;i++)b('#69694f',o.x-20,o.y-15+i*7,37-i%2*9,2);return true;
    }
    const indice=ORDEM_SELOS_MEMORIA.indexOf(o.id);
    if(indice>=0){
        const aceso=indice<(s.selosAtivos||0),cor=aceso?'#f3d78e':'#8b9e9f';
        b('#161f2b',o.x-20,o.y-24,40,49);b('#5a6d76',o.x-17,o.y-23,34,38);b('#354650',o.x-13,o.y-19,26,30);b('#879786',o.x-19,o.y+15,38,6);
        if(indice===0){b(cor,o.x-3,o.y-13,6,17);b(cor,o.x-8,o.y-8,16,7);}
        if(indice===1){b(cor,o.x-11,o.y-7,22,4);b(cor,o.x-11,o.y-3,4,11);b(cor,o.x+7,o.y-3,4,11);}
        if(indice===2){b(cor,o.x-9,o.y-14,18,4);b(cor,o.x-9,o.y-10,4,18);b(cor,o.x+5,o.y-10,4,18);}
        return true;
    }
    if(o.id==='caderno'){
        b('#6c5545',o.x-37,o.y-24,74,49);b('#b39b72',o.x-33,o.y-20,66,37);b('#345b60',o.x-22,o.y-14,44,29);b('#e9d6aa',o.x-17,o.y-10,34,22);b('#bd9264',o.x-1,o.y-10,2,22);
        if(s.selosAtivos!==3){b('#91cfe080',o.x-31,o.y-26,62,48);b('#d6eee9',o.x-31,o.y-26,62,2);}return true;
    }
    return false;
}
function desenharLembrancaArquivo(c){
    c.save();c.fillStyle='#241b38';c.fillRect(0,0,640,384);
    c.translate(0,34);c.scale(1, .82);
    c.fillStyle='#bca580';c.fillRect(20,0,600,80);c.fillStyle='#6a5245';c.fillRect(20,80,600,300);
    desenharDecoracaoCasa(c,'oficina');
    c.fillStyle='#a88760';c.fillRect(255,126,160,80);c.fillStyle='#efddb0';c.fillRect(272,137,123,50);
    for(let i=0;i<3;i++){c.fillStyle='#41686b';c.fillRect(284+i*35,145,16,30);c.fillRect(280+i*35,142,24,5);}
    desenharPessoaDoCastelo(330,244,'jogador',2,0,'cima',c);
    c.fillStyle='#fff1bc18';c.fillRect(20,0,600,380);c.restore();
}
