// Continuação narrativa: reutiliza movimento, controles, diálogo e pausa da exploração.
const CHAVE_CASA='guardians-of-pixel-casa-parada-v1';
const MOBILIA_OFICINA=[{x:30,y:96,w:98,h:84},{x:28,y:211,w:54,h:60},{x:563,y:288,w:43,h:38}];
function textoCasa(pt,en,es){TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es;return pt;}
const LUGARES_CASA={
    casa:{nome:textoCasa('A casa silenciosa','The silent house','La casa silenciosa'),largura:640,entrada:[110,290],
        objetos:[{id:'relogio',x:170,y:100,w:38,h:65,nome:textoCasa('Relógio','Clock','Reloj')},{id:'desenhos',x:300,y:130,w:95,h:45,nome:textoCasa('Mesa de desenhos','Drawing desk','Mesa de dibujos')},{id:'janela',x:520,y:90,w:80,h:50,nome:textoCasa('Janela','Window','Ventana')},{id:'telefone',x:440,y:260,w:45,h:35,nome:textoCasa('Telefone','Telephone','Teléfono')},{id:'rua',x:80,y:330,w:44,h:15,nome:textoCasa('Sair para a rua','Go outside','Salir a la calle')}]},
    rua:{nome:textoCasa('A rua sem segundos','The street without seconds','La calle sin segundos'),largura:1280,entrada:[100,270],
        objetos:[{id:'casa',x:80,y:135,w:50,h:20,nome:textoCasa('Voltar para casa','Go home','Volver a casa')},{id:'pessoa',x:590,y:220,w:24,h:35,nome:textoCasa('Pessoa na luz','Person in the light','Persona en la luz')},{id:'oficina',x:1140,y:135,w:60,h:20,nome:textoCasa('Entrar na oficina','Enter the workshop','Entrar al taller')},{id:'carro',x:360,y:305,w:110,h:40,nome:textoCasa('Carro parado','Stopped car','Coche detenido')}]},
    oficina:{nome:textoCasa('A antiga oficina','The old workshop','El antiguo taller'),largura:640,entrada:[110,290],
        objetos:[{id:'foto',x:350,y:115,w:85,h:50,nome:textoCasa('Fotografia rasgada','Torn photograph','Fotografía rota')},{id:'projeto',x:510,y:220,w:70,h:50,nome:textoCasa('Projeto inacabado','Unfinished blueprint','Plano sin terminar')},{id:'rua',x:80,y:330,w:44,h:15,nome:textoCasa('Voltar para a rua','Return to the street','Volver a la calle')}]}
};
const FALAS_CASA={
    relogio:textoCasa('O pêndulo está preso no ar. Se estivesse quebrado, teria parado no centro… Isto não é um defeito.','The pendulum is stuck in midair. If it were broken, it would hang straight down… This is no malfunction.','El péndulo está suspendido. Si estuviera roto, colgaría en el centro… Esto no es una avería.'),
    desenhos:textoCasa('Estas torres… Eu desenhei todas elas. A data é de antes de eu desaparecer. Por que não me lembro disso?','These towers… I drew every one of them. The date is from before I disappeared. Why do I not remember this?','Estas torres… Las dibujé todas. La fecha es anterior a mi desaparición. ¿Por qué no lo recuerdo?'),
    janela:textoCasa('A mesma gota ainda está aqui. Lá fora, uma faixa de luz se move junto de uma pessoa. Talvez eu não esteja sozinho.','The same raindrop is still here. Outside, a ribbon of light moves around someone. Maybe I am not alone.','La misma gota sigue aquí. Afuera, una franja de luz se mueve junto a alguien. Quizás no esté solo.'),
    telefone:textoCasa('Não ligue o relógio. Se ele voltar a contar, vai saber onde você está. Procure a oficina no fim da rua.','Do not start the clock. If it ticks again, he will know where you are. Find the workshop at the end of the street.','No pongas en marcha el reloj. Si vuelve a contar, sabrá dónde estás. Busca el taller al final de la calle.'),
    pessoa:textoCasa('Dentro da luz, a pessoa vira o rosto para você e sussurra: “Você voltou… Conseguiu consertar?” Antes de responder, ela fica imóvel outra vez.','Inside the light, the person turns toward you and whispers: “You came back… Did you fix it?” Before you can answer, they freeze again.','Dentro de la luz, la persona te mira y susurra: «Volviste… ¿Lograste arreglarlo?» Antes de responder, vuelve a quedarse inmóvil.'),
    foto:textoCasa('Sou eu, ao lado de alguém de terno. A parte da cabeça foi arrancada. Atrás está escrito: “Antes do primeiro segundo”. Eu já conhecia ele?','That is me, beside someone in a suit. The head has been torn away. On the back: “Before the first second”. Did I already know him?','Soy yo, junto a alguien de traje. Arrancaron la parte de la cabeza. Detrás dice: «Antes del primer segundo». ¿Ya lo conocía?'),
    projeto:textoCasa('O desenho liga as torres a um relógio. Falta uma peça no centro. Minha letra, de novo: “A memória é a chave”. O que eu estava tentando fazer?','The blueprint connects the towers to a clock. A piece is missing at the center. My handwriting again: “Memory is the key”. What was I trying to do?','El plano conecta las torres con un reloj. Falta una pieza central. Otra vez mi letra: «La memoria es la llave». ¿Qué intentaba hacer?'),
    carro:textoCasa('O motorista nem pisca. Até o reflexo da chuva está parado no vidro.','The driver does not even blink. Even the rain reflected on the glass is frozen.','El conductor ni parpadea. Hasta el reflejo de la lluvia está detenido en el cristal.')
};
const OBJETIVOS_CASA=[
 textoCasa('Investigue o relógio, os desenhos e a janela.','Inspect the clock, drawings and window.','Examina el reloj, los dibujos y la ventana.'),
 textoCasa('O telefone está tocando. Atenda.','The telephone is ringing. Answer it.','El teléfono está sonando. Contesta.'),
 textoCasa('Saia de casa. Procure a luz e a oficina no fim da rua.','Go outside. Find the light and the workshop at the end of the street.','Sal de casa. Busca la luz y el taller al final de la calle.'),
 textoCasa('Examine a fotografia e o projeto na oficina.','Inspect the photograph and blueprint in the workshop.','Examina la fotografía y el plano del taller.'),
 textoCasa('Pistas reunidas. A memória é a chave… Continua.','Clues gathered. Memory is the key… To be continued.','Pistas reunidas. La memoria es la llave… Continuará.')
];
textoCasa('Continuar história: tempo parado','Continue story: frozen time','Continuar historia: tiempo detenido');
textoCasa('Aproxime-se de um objeto e pressione E.','Approach an object and press E.','Acércate a un objeto y pulsa E.');
textoCasa('Primeiro preciso entender o que aconteceu aqui.','First I need to understand what happened here.','Primero debo entender qué ocurrió aquí.');
textoCasa('Sem sinal.','No signal.','Sin señal.');
function carregarCasaParada(){
    try {const s=JSON.parse(localStorage.getItem(CHAVE_CASA));if(!s||!LUGARES_CASA[s.local])return null;
        const lugar=LUGARES_CASA[s.local],estado={capitulo:'casa',sala:0,local:s.local,x:s.x,y:s.y,pistas:Array.isArray(s.pistas)?s.pistas.filter(p=>Object.hasOwn(FALAS_CASA,p)):[],concluido:s.concluido===true};
        estado.passagemAberta=s.passagemAberta===true&&estado.concluido;
        estado.selosAtivos=estado.passagemAberta&&Number.isInteger(s.selosAtivos)?Math.max(0,Math.min(3,s.selosAtivos)):0;
        estado.memoriaRecuperada=s.memoriaRecuperada===true&&estado.selosAtivos===3;
        estado.memoriaConcluida=s.memoriaConcluida===true&&estado.memoriaRecuperada;
        estado.registrosFinais=estado.memoriaConcluida&&Array.isArray(s.registrosFinais)?[...new Set(s.registrosFinais.filter(id=>['origem','retrato','radioFinal'].includes(id)))]:[];
        estado.circuitosFinais=estado.registrosFinais.length===3&&Number.isInteger(s.circuitosFinais)?Math.max(0,Math.min(3,s.circuitosFinais)):0;
        estado.historiaConcluida=s.historiaConcluida===true&&estado.circuitosFinais===3;
        if(s.local==='observatorio'&&!estado.memoriaConcluida){estado.local='rua';[estado.x,estado.y]=LUGARES_CASA.rua.entrada;}
        if(s.local==='arquivo'&&!estado.passagemAberta){estado.local='oficina';[estado.x,estado.y]=LUGARES_CASA.oficina.entrada;}
        if(!Number.isFinite(s.x)||!Number.isFinite(s.y)||!posicaoLivreCasaParada(s.x,s.y,s.local))[estado.x,estado.y]=lugar.entrada;
        return estado;
    }catch{return null;}
}
function salvarCasaParada(){try{localStorage.setItem(CHAVE_CASA,JSON.stringify(estadoFloresta));}catch{document.getElementById('floresta-aviso').textContent=localizar('Não foi possível salvar neste navegador.');}atualizarBotaoCasaParada();}
function atualizarBotaoCasaParada(){
    document.getElementById('botao-casa-parada')?.remove();
}
function iniciarCasaParada(){
    if(!florestaEstaDesbloqueada()||!carregarFloresta()?.concluido)return;
    if(florestaAtiva)fecharFloresta();ocultarCutsceneDaCarta();ocultarPainelDeResultado();fecharConteudoMenu();definirJogoPausado(true);
    estadoFloresta=carregarCasaParada()||{capitulo:'casa',sala:0,local:'casa',x:110,y:290,pistas:[],concluido:false};
    florestaAtiva=true;pausaFloresta=false;dialogoFloresta=null;escondidoFloresta=false;perseguidorFloresta=null;prisaoJogadorFloresta=0;teclasFloresta.clear();
    telaFloresta.hidden=false;aplicacaoJogo.inert=true;canvasFloresta.setAttribute('aria-label',localizar('A casa silenciosa'));
    selecionarTrilhaDaPartida('casteloDoLimbo');salvarCasaParada();atualizarInterfaceFloresta();canvasFloresta.focus();
    ultimoQuadroFloresta=performance.now();quadroFloresta=requestAnimationFrame(quadroDaFloresta);
}
function objetosVisiveisCasa(local=estadoFloresta.local){return LUGARES_CASA[local].objetos.filter(o=>(o.id!=='arquivo'||estadoFloresta?.passagemAberta)&&(o.id!=='observatorio'||estadoFloresta?.memoriaConcluida));}
function objetoProximoCasa(){return objetosVisiveisCasa().map(o=>({o,distancia:Math.hypot(o.x-estadoFloresta.x,o.y-estadoFloresta.y)})).filter(p=>p.distancia<CONFIG.florestaSecreta.distanciaInteracao+30).sort((a,b)=>a.distancia-b.distancia)[0]?.o;}
function atualizarInterfaceCasaParada(){
    telaFloresta.classList.toggle('pensamento-ao-dormir',dialogoFloresta?.cena==='dormir'&&dialogoFloresta.indice===1);
    atualizarEscolhasDoDescanso();
    const s=estadoFloresta,p=s.pistas;
    document.getElementById('floresta-titulo').textContent=localizar(LUGARES_CASA[s.local].nome);
    const indice=s.concluido?4:!p.includes('telefone')?(['relogio','desenhos','janela'].every(id=>p.includes(id))?1:0):s.local==='oficina'&&!['foto','projeto'].every(id=>p.includes(id))?3:2;
    document.getElementById('floresta-objetivo').textContent=localizar(objetivoDesfecho()||objetivoArquivoMemoria()||OBJETIVOS_CASA[indice]);
    if(!pausaFloresta)document.getElementById('floresta-aviso').textContent=localizar('Aproxime-se de um objeto e pressione E.');
}
function posicaoLivreCasaParada(x,y,local=estadoFloresta.local){
    const l=LUGARES_CASA[local],r=CONFIG.florestaSecreta.raioJogador;
    if(x<25+r||x>l.largura-25-r||y<(local==='rua'?155:65)+r||y>355-r)return false;
    if(local==='oficina'&&MOBILIA_OFICINA.some(o=>x+r>o.x&&x-r<o.x+o.w&&y+r>o.y&&y-r<o.y+o.h))return false;
    return !objetosVisiveisCasa(local).filter(o=>!['rua','casa','oficina','arquivo','observatorio','janela'].includes(o.id)).some(o=>x+r>o.x-o.w/2&&x-r<o.x+o.w/2&&y+r>o.y-o.h/2&&y-r<o.y+o.h/2);
}
function interagirCasaParada(){
    const o=objetoProximoCasa();if(!o)return;
    const s=estadoFloresta;
    if(interagirDesfecho(o))return;
    if(interagirArquivoMemoria(o))return;
    if(['rua','casa','oficina','arquivo','observatorio'].includes(o.id)){
        if(!s.pistas.includes('telefone')){conversarNaFloresta([['VOCÊ',localizar('Primeiro preciso entender o que aconteceu aqui.')]]);return;}
        const anterior=s.local;s.local=o.id;[s.x,s.y]=LUGARES_CASA[s.local].entrada;
        if(s.local==='rua'&&anterior==='oficina')s.x=1120;
        if(s.local==='rua'&&anterior==='observatorio')s.x=900;
        salvarCasaParada();atualizarInterfaceFloresta();return;
    }
    if(o.id==='telefone'&&!['relogio','desenhos','janela'].every(id=>s.pistas.includes(id))){conversarNaFloresta([['VOCÊ',localizar('Sem sinal.')]]);return;}
    conversarNaFloresta([[o.id==='telefone'?'???':'VOCÊ',FALAS_CASA[o.id],o.id==='telefone'?'audio':'presencial']],()=>{
        if(!s.pistas.includes(o.id))s.pistas.push(o.id);
        s.concluido=['foto','projeto','pessoa'].every(id=>s.pistas.includes(id));salvarCasaParada();
    });
}
function desenharCasaParada(){
    if(dialogoFloresta?.cena==='epilogo'){desenharEpilogo(contextoFloresta);return;}
    if(dialogoFloresta?.cena==='lembranca'){desenharLembrancaArquivo(contextoFloresta);return;}
    const c=contextoFloresta,s=estadoFloresta,l=LUGARES_CASA[s.local],rua=s.local==='rua';
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(Math.round(x),Math.round(y),w,h);};
    cameraFloresta.x=Math.round(Math.max(0,Math.min(l.largura-640,s.x-320)));cameraFloresta.y=0;
    c.save();c.translate(-cameraFloresta.x,0);c.imageSmoothingEnabled=false;b(rua?'#263b4b':'#66504a',0,0,l.largura,384);
    if(rua){
        for(let i=0;i<8;i++){b(i%2?'#6d7a80':'#596c75',i*160,15,150,141);if(i!==0&&i!==7&&(i!==5||!s.memoriaConcluida)){b('#27323d',i*160+60,96,42,60);b('#74827e',i*160+57,153,48,3);}for(let j=0;j<3;j++)b('#c5ba8c',i*160+15+j*43,42,23,32);}
        b('#9d9a89',0,156,1280,110);b('#3e4b54',0,266,1280,95);for(let x=0;x<1280;x+=80)b('#c8ba8d',x,355,35,3);
        if(!s.historiaConcluida)b('#b0e7c744',553,160,76,105);
        for(let i=0;i<120;i++)b('#b7d8e5',(i*137)%1280,(i*53+(s.historiaConcluida?performance.now()*.04:0))%380,1,5);
    }else{
        b(s.local==='casa'?'#baa58a':'#89918a',0,0,640,70);b('#423e42',0,64,640,6);
        for(let y=84;y<384;y+=28)b('#836653',0,y,640,2);
        for(let x=0;x<640;x+=64)b('#4e4140',x,70,2,314);
    }
    desenharDecoracaoCasa(c,s.local);
    for(const o of objetosVisiveisCasa()){
        if(desenharObjetoDesfecho(c,o)||desenharObjetoArquivo(c,o))continue;
        const x=o.x-o.w/2,y=o.y-o.h/2;
        if(['rua','casa','oficina','arquivo','observatorio'].includes(o.id)){
            const base=rua?156:o.y,topo=base-62;
            b('#28262e',x-6,topo-6,o.w+12,70);b('#c3a074',x-4,topo-4,o.w+8,5);
            b('#ad8c65',x-4,topo,4,64);b('#ad8c65',x+o.w,topo,4,64);
            b('#785044',x,topo,o.w,62);b('#a27653',x+4,topo+5,o.w-8,22);b('#a27653',x+4,topo+32,o.w-8,24);
            b('#453a3b',x+7,topo+8,o.w-14,16);b('#906747',x+8,topo+9,o.w-16,14);
            b('#eed399',x+o.w-11,topo+29,5,5);b('#d0b486',x-6,base-3,o.w+12,3);
            if(o.id==='oficina'){b('#403d42',x-13,topo-25,o.w+26,16);for(let i=0;i<3;i++){b('#c2ae82',x+i*18,topo-22,4,9);b('#c2ae82',x-3+i*18,topo-22,10,3);}}
        }
        else if(o.id==='janela'){b('#493c37',x-6,y-6,o.w+12,o.h+12);desenharRuaParada(c,x,y,.4);b('#ddc69e',o.x-2,y,4,o.h);b('#ddc69e',x,y+24,o.w,4);b('#e4cfab',x-8,y+o.h,96,6);for(const dx of [-10,o.w-2]){b('#826178',x+dx,y-4,12,o.h+7);b('#b28a9f',x+dx+3,y,3,o.h-2);}}
        else if(o.id==='relogio'){b('#a37c50',x,y,o.w,o.h);b('#eddfb7',x+5,y+5,28,25);b('#443e41',o.x,y+8,3,14);b('#443e41',o.x,y+19,8,3);b('#373b43',x+5,y+34,28,26);b('#e5bf77',o.x+4,y+36,3,12);b('#e5bf77',o.x+6,y+47,8,8);}
        else if(o.id==='pessoa'){desenharPessoaNaLuz(c,o.x,o.y+12);}
        else if(o.id==='carro'){b('#ba6960',x,y,o.w,o.h);b('#b4d1cf',x+23,y-12,60,23);b('#212b32',x+6,y+30,20,14);b('#212b32',x+84,y+30,20,14);}
        else {b('#483d39',x-3,y+5,o.w+6,o.h);b('#9f7c58',x,y,o.w,o.h-6);
            if(o.id==='telefone'){b('#1d2833',x+6,y+7,33,18);b('#485968',x+9,y+9,27,12);b('#b8b9a2',x+18,y+10,10,10);b('#33404c',x+21,y+13,4,4);b('#1c2831',x+3,y+1,38,6);b('#1c2831',x+3,y+5,7,7);b('#1c2831',x+34,y+5,7,7);for(let i=0;i<4;i++)b('#273039',x+o.w-2+i%2*3,y+9+i*4,4,5);if(!s.pistas.includes('telefone')&&['relogio','desenhos','janela'].every(id=>s.pistas.includes(id))){b('#f9dc78',x-8,y,3,13);b('#f9dc78',x+o.w+5,y,3,13);}}
            else {b('#e5d6b3',x+8,y+4,o.w-16,o.h-15);
                if(o.id==='foto'){b('#56646b',x+17,y+18,17,15);b('#d1aa87',x+21,y+8,9,10);b('#443939',x+20,y+6,11,4);b('#3d3942',x+47,y+17,17,16);b('#d4c29a',x+44,y+4,21,13);for(let i=0;i<5;i++)b('#f8e6ba',x+43+i*4,y+12+i%2*3,5,3);}
                else {for(let i=0;i<3;i++){b('#547378',x+14+i*15,y+11,9,18);b('#547378',x+12+i*15,y+8,13,4);b('#dacda5',x+17+i*15,y+17,3,6);}b('#d4b06f',x+o.w-10,y+4,3,23);b('#353c45',x+o.w-10,y+25,3,4);b('#bca985',x+5,y+o.h-13,o.w-10,2);}
            }
            b('#533e34',x+3,y+o.h-6,6,9);b('#533e34',x+o.w-9,y+o.h-6,6,9);b('#c49a69',x,y,o.w,3);
        }
    }
    const passo=caminhadaNaFloresta.movendo&&teclasFloresta.size&&!dialogoFloresta&&!pausaFloresta?[0,2,0,-2][Math.floor(caminhadaNaFloresta.tempo/.12)%4]:0;
    if(dialogoFloresta?.cena!=='dormir')desenharPessoaDoCastelo(s.x,s.y,'jogador',1,passo,caminhadaNaFloresta.direcao,c);
    const objeto=objetoProximoCasa();if(objeto&&!dialogoFloresta){b('#18212b',s.x-10,s.y-48,20,16);c.font='10px monospace';c.fillStyle='#ffe0a2';c.textAlign='center';c.fillText('E',s.x,s.y-36);}
    c.restore();
    if(pausaFloresta){b('#101a22cc',0,0,640,384);c.font='bold 24px monospace';c.textAlign='center';c.fillStyle='#f4e2b8';c.fillText(localizar('Pausado'),320,190);}
}
function desenharDecoracaoCasa(c,local){
    if(local==='observatorio'){desenharObservatorio(c);return;}
    if(local==='arquivo'){desenharDecoracaoArquivo(c);return;}
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    function prateleira(x,y,largura){
        b('#493934',x-3,y+22,largura+6,7);b('#a67c53',x,y+20,largura,4);
        for(let i=0;i<Math.floor(largura/12);i++){const h=12+i%3*3;b(['#596e70','#9a6659','#b19a69'][i%3],x+3+i*12,y+20-h,8,h);b('#d1bd8c',x+5+i*12,y+22-h,2,h-4);}
    }
    function vaso(x,y){b('#a26f50',x,y,16,14);b('#d3a777',x-2,y,20,4);b('#3b6653',x-7,y-16,14,17);b('#507d60',x+5,y-23,14,23);b('#72966c',x+7,y-20,5,12);}
    if(local==='rua'){
        for(let x=140;x<1280;x+=320){b('#263440',x,40,5,118);b('#c5b98d',x-9,35,23,19);b('#eadba3',x-5,38,15,12);b('#455660',x-12,31,28,5);}
        for(let x=110;x<1280;x+=160){b('#354c49',x,106,35,15);b('#48705a',x-2,94,39,17);b('#729174',x+4,91,25,9);}
        for(let x=0;x<1280;x+=32)b('#777e79',x,257,28,3);
        return;
    }
    // Decoração nas paredes e estampas no piso não criam obstáculos invisíveis.
    if(local==='casa'){
        b('#4c3949',183,206,202,115);b('#916576',188,211,192,105);b('#c29a86',196,219,176,89);b('#765465',201,224,166,79);
        for(let x=212;x<362;x+=22){b('#b99081',x,232,10,4);b('#b99081',x,291,10,4);}
        prateleira(260,16,125);vaso(40,49);vaso(580,49);
        b('#755444',83,10,68,44);b('#d4b894',88,15,58,34);b('#798d88',92,19,50,26);b('#d5c99b',124,21,9,9);b('#45665b',92,35,50,10);
        b('#d8c4a1',0,60,640,4);b('#5a493e',0,66,640,4);
    }else{
        b('#353e42',161,202,252,114);b('#56615e',166,207,242,104);
        for(let x=176;x<402;x+=24)for(let y=217;y<300;y+=24)b('#69716a',x,y,12,2);
        prateleira(30,16,125);prateleira(475,16,125);
        b('#4a4944',210,9,205,47);b('#ac9770',214,13,197,39);
        for(let x=222;x<407;x+=13)for(let y=19;y<49;y+=10)b('#807557',x,y,2,2);
        for(let i=0;i<5;i++){const x=228+i*35;b('#594839',x+4,28,5,21);b('#a6b8b1',x,20,14,10);b('#d0d1b7',x+2,19,10,3);}
        b('#bca37d',0,61,640,4);b('#43453e',0,66,640,4);
        // Marcas de montagem e pequenos parafusos desenhados no tapete de trabalho.
        for(let i=0;i<6;i++){b('#b1ab8f',192+i*28,274,4,4);b('#454e4e',193+i*28,275,2,2);}
        desenharMobiliaOficina(c);
    }
}
function desenharPessoaNaLuz(c,x,y){
    c.save();c.translate(x,y);
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    b('#172630',-11,-2,22,4);
    b('#384453',-8,-10,6,10);b('#384453',3,-9,6,7);b('#1b2733',-10,0,8,4);b('#1b2733',4,-2,9,4);
    b('#6c3f3a',-12,-28,24,20);b('#ac7153',-9,-28,18,20);b('#d29d6b',-7,-26,4,15);
    b('#b89074',-13,-15,4,7);b('#b89074',10,-18,4,7);
    b('#cca68b',-7,-43,15,15);b('#c6c3b7',-9,-46,18,8);b('#8e989a',-9,-40,4,9);b('#e3ddc7',-5,-46,11,3);
    b('#263443',-5,-36,4,3);b('#263443',3,-36,4,3);b('#b0bcba',-1,-36,4,1);
    b('#697e89',-10,-29,21,5);b('#a1b2b0',3,-25,5,11);b('#c8bf9e',0,-20,2,2);b('#c8bf9e',0,-13,2,2);
    c.restore();
}
function desenharMobiliaOficina(c){
    const b=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    // As bases usam os mesmos retângulos da colisão.
    const [bancada,armario,caixa]=MOBILIA_OFICINA;
    b('#413b34',bancada.x,bancada.y,bancada.w,bancada.h);b('#a78058',30,96,98,29);b('#d0ae79',30,96,98,4);
    for(let y=132;y<178;y+=20){b('#73523d',34,y,89,15);b('#ba9868',69,y+5,15,3);}
    b('#263940',43,101,29,16);b('#738e8b',49,99,19,12);b('#c8c6a4',53,101,11,5);
    b('#c7ae7a',84,103,4,17);b('#727e82',77,101,20,6);b('#ede0bb',103,102,15,15);
    b('#424649',armario.x,armario.y,armario.w,armario.h);b('#7e8172',31,214,48,53);
    for(let y=217;y<263;y+=15){b('#525d5d',34,y,41,12);b('#b2b497',48,y+4,12,2);}
    b('#3f382e',caixa.x,caixa.y,caixa.w,caixa.h);b('#a18054',566,291,37,32);
    for(let y=294;y<322;y+=9)b('#614e35',568,y,33,2);b('#c7a371',570,291,4,31);b('#c7a371',594,291,4,31);
    // Bobinas, peças e desenhos pendurados na parede.
    for(let x=165;x<205;x+=18){b('#464d51',x,23,13,21);b('#d0b57b',x-2,20,17,5);b('#d0b57b',x-2,42,17,4);b('#ac8455',x+3,26,6,14);}
    b('#ede0b4',424,14,35,35);b('#8b957d',430,21,23,2);b('#8b957d',430,28,16,2);b('#8b957d',430,35,20,2);
}
window.casaParadaPronta=true;
atualizarBotaoCasaParada();
