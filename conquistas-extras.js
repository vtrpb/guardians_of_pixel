// Novos critérios retornam configurações incorporadas a CONFIG.conquistas.
function criarConquistasExtras() {
    const linhas = [
        ['porUmPixel','Por um pixel','Derrote um Boss nos últimos 10% do caminho.'],
        ['naUltimaHora','Na última hora','Vença com o último golpe dado por uma torre construída depois que esse inimigo passou de 90% do caminho.'],
        ['viradaDeJogo','Virada de jogo','Vença depois de perder uma torre para um inimigo.'],
        ['naoDestaVez','Não desta vez','Vença uma fase na tentativa seguinte a uma derrota nela, no mesmo modo.'],
        ['voceNaoPassa','Você não passa!','Derrote um Boss antes da metade do caminho.'],
        ['controleAbsoluto','Controle absoluto','Elimine um inimigo com três efeitos diferentes ativos ao mesmo tempo.'],
        ['ultimaLinha','Última linha de defesa','Vença construindo todas as torres na metade final do caminho, sem explosivos.'],
        ['verdadeiroInimigo','O verdadeiro inimigo','Perca com créditos suficientes para construir uma torre disponível na sua equipe.'],
        ['soMaisUma','Era só mais uma…','Termine três partidas nesta sessão, sem fechar ou recarregar o jogo.'],
        ['semPressa','Sem pressa','Vença uma fase na velocidade normal do jogo.'],
        ['cadeSaida','Cadê a saída?','Encontre os Corredores Amarelos.'],
        ['amareloDemais','Amarelo demais','Escape dos Corredores Amarelos.'],
        ['silencioAbrePortas','O silêncio abre portas','Entre no castelo do Limbo.'],
        ['hospedeCurioso','Hóspede curioso','Visite os oito cômodos acessíveis do castelo.'],
        ['assuntoFamilia','Assunto de família?','Examine o retrato do casal no quarto real.'],
        ['limitesDoVazio','Até o vazio tem limites','Fale com os guardas que barram o arsenal.'],
        ['desafiandoCoroa','Desafiando a coroa','Inicie sua primeira wave na arena do Limbo.'],
        ['respeitoConquistado','Respeito conquistado','Vença a arena do Limbo.'],
        ['promessaNoVazio','Uma promessa no vazio','Conclua a conversa em que a entidade promete ajudar.'],
        ['doisCaminhos','Duas respostas, dois caminhos','Conclua a conversa da verdade e entre no castelo pela rota do silêncio no mesmo save.'],
        ['esseEOFim','Esse é o fim?','Chegue ao final em que o Senhor do Tempo tira sua vida.'],
        ['finalmenteEmCasa','Finalmente em casa','Chegue ao final em que a entidade protege você do Senhor do Tempo.']
    ];
    return Object.fromEntries(linhas.map(([id,nome,descricao],i)=>[id,Object.freeze({nome,descricao,icone:i>=10?'?':'★',secreta:i>=10,tipoDeCriterio:'especial',objetivo:1})]));
}

const CHAVE_HISTORICO_CONQUISTAS_EXTRAS='guardians-of-pixel-historico-conquistas-v1';
let historicoConquistasExtras=null;
let tentativaConquistasExtras=null;
let partidasTerminadasNestaSessao=0;
function obterHistoricoConquistasExtras() {
    if(historicoConquistasExtras)return historicoConquistasExtras;
    let salvo;
    try {salvo=JSON.parse(localStorage.getItem(CHAVE_HISTORICO_CONQUISTAS_EXTRAS)||'null');}catch{}
    const salas=CONFIG.desafiosDeConquistas.salasDoCastelo;
    historicoConquistasExtras={salas:Array.isArray(salvo?.salas)?[...new Set(salvo.salas.filter(s=>salas.includes(s)))]:[],
        rotas:Array.isArray(salvo?.rotas)?[...new Set(salvo.rotas.filter(r=>['verdade','silencio'].includes(r)))]:[],
        ultimaDerrota:typeof salvo?.ultimaDerrota==='string'?salvo.ultimaDerrota:null};
    return historicoConquistasExtras;
}
function salvarHistoricoConquistasExtras() {
    try{localStorage.setItem(CHAVE_HISTORICO_CONQUISTAS_EXTRAS,JSON.stringify(obterHistoricoConquistasExtras()));}catch{}
}
function chaveDaTentativaParaConquistas() {return `${faseSelecionada}:${modoWavesInfinitas?'infinito':'campanha'}`;}
function iniciarTentativaParaConquistas() {
    const h=obterHistoricoConquistasExtras();
    tentativaConquistasExtras={valida:!mapaPersonalizadoAtivo,encerrada:false,perdeuTorre:false,construidas:0,somenteMetadeFinal:true,
        ultimoGolpeTardio:false,revanche:h.ultimaDerrota===chaveDaTentativaParaConquistas()};
    // Toda nova tentativa consome a oportunidade de revanche, inclusive desistências.
    h.ultimaDerrota=null;salvarHistoricoConquistasExtras();
}
function combateContaParaConquistasExtras() {
    return jogoIniciado&&!mapaPersonalizadoAtivo&&tentativaConquistasExtras?.valida
        &&!(typeof exploracaoDoLimboAtiva!=='undefined'&&exploracaoDoLimboAtiva);
}
function comprimentoDoCaminhoParaConquistas(caminho) {
    return caminho.slice(1).reduce((total,p,i)=>total+Math.hypot(p.x-caminho[i].x,p.y-caminho[i].y),0);
}
function fracaoDoCaminhoParaConquistas(inimigo) {
    const comprimento=comprimentoDoCaminhoParaConquistas(obterCaminhoDoInimigo(inimigo));
    return comprimento>0?calcularProgressoDoInimigo(inimigo)/comprimento:0;
}
function registrarTorreParaConquistasExtras(torre) {
    if(!combateContaParaConquistasExtras())return;
    const c=CONFIG.desafiosDeConquistas;
    tentativaConquistasExtras.construidas++;
    torre.inimigosAdiantadosAoConstruir=new Set(inimigos.filter(i=>i.vida>0&&fracaoDoCaminhoParaConquistas(i)>=c.limiteFinal));
    let maisPerto={distancia:Infinity,fracao:0};
    for(const caminho of obterCaminhosAtuais()) {
      let percorrido=0;
      const total=comprimentoDoCaminhoParaConquistas(caminho);
      for(let i=1;i<caminho.length;i++) {
        const a=caminho[i-1],b=caminho[i],dx=b.x-a.x,dy=b.y-a.y,tamanho=Math.hypot(dx,dy);
        const t=tamanho?Math.max(0,Math.min(1,((torre.x-a.x)*dx+(torre.y-a.y)*dy)/(tamanho*tamanho))):0;
        const distancia=Math.hypot(torre.x-a.x-t*dx,torre.y-a.y-t*dy);
        if(distancia<maisPerto.distancia)maisPerto={distancia,fracao:total?(percorrido+t*tamanho)/total:0};
        percorrido+=tamanho;
      }
    }
    if(maisPerto.fracao<c.metadeDoCaminho)tentativaConquistasExtras.somenteMetadeFinal=false;
}
function registrarGolpeFinalParaConquistas(inimigo,torre,agora) {
    if(!combateContaParaConquistasExtras())return;
    tentativaConquistasExtras.ultimoGolpeTardio=false;
    if(inimigo.restauradoPeloCurador)return;
    const c=CONFIG.desafiosDeConquistas;
    if(tipoEhBoss(inimigo.tipo)) {
        const fracao=fracaoDoCaminhoParaConquistas(inimigo);
        if(fracao>=c.limiteFinal)desbloquearConquista('porUmPixel');
        if(fracao<c.metadeDoCaminho)desbloquearConquista('voceNaoPassa');
    }
    const efeitos=['congeladoAte','lentidaoExpiraEm','queimaduraExpiraEm','marcaExpiraEm','corrosaoExpiraEm','vulnerabilidadeSismicaExpiraEm','estaseExpiraEm'];
    if(efeitos.filter(campo=>agora<(inimigo[campo]||0)).length>=c.efeitosSimultaneos)desbloquearConquista('controleAbsoluto');
    tentativaConquistasExtras.ultimoGolpeTardio=Boolean(torre?.inimigosAdiantadosAoConstruir?.has(inimigo));
}
function terminarTentativaParaConquistas(vitoria) {
    if(!combateContaParaConquistasExtras()||tentativaConquistasExtras.encerrada)return;
    const e=tentativaConquistasExtras;
    e.encerrada=true;
    partidasTerminadasNestaSessao++;
    if(partidasTerminadasNestaSessao>=CONFIG.desafiosDeConquistas.partidasNaSessao)desbloquearConquista('soMaisUma');
    if(vitoria) {
        if(e.perdeuTorre)desbloquearConquista('viradaDeJogo');
        if(e.revanche)desbloquearConquista('naoDestaVez');
        if(e.ultimoGolpeTardio)desbloquearConquista('naUltimaHora');
        if(e.construidas>0&&e.somenteMetadeFinal)desbloquearConquista('ultimaLinha');
        // A simulação atual só oferece a velocidade normal; pausas são permitidas.
        desbloquearConquista('semPressa');
    }else {
        const custo=Math.min(...[...defesasSelecionadasParaPartida].filter(tipo=>torreEstaDesbloqueada(tipo)&&!configuracaoEhExplosivoConsumivel(CONFIG.torre.tipos[tipo])).map(tipo=>CONFIG.torre.tipos[tipo].custo));
        if(dinheiro>=custo)desbloquearConquista('verdadeiroInimigo');
        obterHistoricoConquistasExtras().ultimaDerrota=chaveDaTentativaParaConquistas();salvarHistoricoConquistasExtras();
    }
}
function registrarSalaParaConquistas(sala) {
    const h=obterHistoricoConquistasExtras();
    if(!CONFIG.desafiosDeConquistas.salasDoCastelo.includes(sala))return;
    if(!h.salas.includes(sala)){h.salas.push(sala);salvarHistoricoConquistasExtras();}
    if(CONFIG.desafiosDeConquistas.salasDoCastelo.every(s=>h.salas.includes(s)))desbloquearConquista('hospedeCurioso');
}
function registrarRotaParaConquistas(rota) {
    const h=obterHistoricoConquistasExtras();
    if(!h.rotas.includes(rota)){h.rotas.push(rota);salvarHistoricoConquistasExtras();}
    if(h.rotas.includes('silencio')&&h.rotas.includes('verdade'))desbloquearConquista('doisCaminhos');
}

const TRADUCOES_NOVAS_CONQUISTAS=(()=>{
    const nomes={
        en:'By one pixel|Just in time|Turning the tide|Not this time|You shall not pass!|Absolute control|Last line of defense|The real enemy|Just one more…|No hurry|Where is the exit?|Too much yellow|Silence opens doors|Curious guest|A family matter?|Even the void has limits|Challenging the crown|Earned respect|A promise in the void|Two answers, two paths'.split('|'),
        es:'Por un píxel|En el último momento|Cambio de rumbo|Esta vez no|¡No pasarás!|Control absoluto|Última línea de defensa|El verdadero enemigo|Solo una más…|Sin prisa|¿Dónde está la salida?|Demasiado amarillo|El silencio abre puertas|Huésped curioso|¿Un asunto familiar?|Hasta el vacío tiene límites|Desafiando a la corona|Respeto ganado|Una promesa en el vacío|Dos respuestas, dos caminos'.split('|')
    };
    const descricoes={
        en:[
            'Defeat a Boss in the last 10% of the path.',
            'Win with the final hit dealt by a tower built after that enemy passed 90% of the path.',
            'Win after losing a tower to an enemy.',
            'Win a stage on the very next attempt after losing it, in the same mode.',
            'Defeat a Boss before the halfway point of the path.',
            'Eliminate an enemy with three different effects active at once.',
            'Win building every tower in the final half of the path, without explosives.',
            'Lose with enough credits to build an available tower from your team.',
            'Finish three matches in this session without closing or reloading the game.',
            'Win a stage at the game’s normal speed.',
            'Find the Yellow Corridors.','Escape the Yellow Corridors.','Enter the castle of Limbo.',
            'Visit all eight accessible rooms in the castle.','Examine the couple’s portrait in the royal bedroom.',
            'Talk to the guards blocking the armory.','Start your first wave in the arena of Limbo.',
            'Win the arena of Limbo.','Finish the conversation in which the entity promises to help.',
            'Finish the truth conversation and enter the castle through the silence route in the same save.'
        ],
        es:[
            'Derrota a un jefe en el último 10% del camino.',
            'Gana con el golpe final de una torre construida después de que ese enemigo pasara el 90% del camino.',
            'Gana después de perder una torre por un enemigo.',
            'Gana una fase en el intento inmediatamente posterior a perderla, en el mismo modo.',
            'Derrota a un jefe antes de la mitad del camino.',
            'Elimina a un enemigo con tres efectos diferentes activos a la vez.',
            'Gana construyendo todas las torres en la mitad final del camino, sin explosivos.',
            'Pierde con créditos suficientes para construir una torre disponible de tu equipo.',
            'Termina tres partidas en esta sesión sin cerrar ni recargar el juego.',
            'Gana una fase a la velocidad normal del juego.',
            'Encuentra los Pasillos Amarillos.','Escapa de los Pasillos Amarillos.','Entra en el castillo del Limbo.',
            'Visita las ocho habitaciones accesibles del castillo.','Examina el retrato de la pareja en el dormitorio real.',
            'Habla con los guardias que bloquean la armería.','Inicia tu primera oleada en la arena del Limbo.',
            'Gana la arena del Limbo.','Termina la conversación en la que la entidad promete ayudar.',
            'Termina la conversación de la verdad y entra al castillo por la ruta del silencio en el mismo guardado.'
        ]
    };
    nomes.en.push('Is this the end?','Finally home');nomes.es.push('¿Este es el fin?','Finalmente en casa');
    descricoes.en.push('Reach the ending where the Lord of Time takes your life.','Reach the ending where the entity protects you from the Lord of Time.');
    descricoes.es.push('Llega al final en el que el Señor del Tiempo te quita la vida.','Llega al final en el que la entidad te protege del Señor del Tiempo.');
    return Object.fromEntries(['en','es'].map(idioma=>[idioma,Object.fromEntries(Object.values(criarConquistasExtras()).flatMap((c,i)=>[[c.nome,nomes[idioma][i]],[c.descricao,descricoes[idioma][i]]]))]));
})();
