// Arquivo histórico para recuperar prêmios e resgates anteriores à retirada das permanentes.
function criarSkinFinalDeMissoes(nome, bases, canhoes) {
    return Object.freeze({ nome, tipoDeTorre:'padrao', descricao:'Prêmio de evento especial.',
        coresPorNivel: Object.freeze(bases.map((corBase,i)=>Object.freeze({corBase,corCanhao:canhoes[i]}))) });
}

function objetivosDoPremioFinalLegadoConcluidos(progresso) {
    return Object.entries(CONFIG.missoes.criteriosDoPremioFinalLegado)
        .every(([propriedade, objetivo]) => (progresso[propriedade] || 0) >= objetivo);
}

function premioFinalDasMissoesDisponivel() {
    if (premioFinalLegado.resgatado) return false;
    if (premioFinalLegado.desbloqueado) return true;
    if (!objetivosDoPremioFinalLegadoConcluidos(progressoMissoesPermanentes)) return false;
    premioFinalLegado.desbloqueado = true;
    salvarPremioFinalLegado();
    return true;
}

function resgatarPremioFinalDasMissoes() {
    if (!premioFinalDasMissoesDisponivel()) return;
    const premio = CONFIG.missoes.premioFinal;
    premioFinalLegado.resgatado = true;
    if (!salvarPremioFinalLegado()) {
        premioFinalLegado.resgatado = false;
        return;
    }
    registrarExperiencia(premio.experiencia);
    atualizarResumoDasMissoesNoMenu();
    mostrarMissoes();
}

function criarPainelDoPremioFinalDasMissoes() {
    if (!premioFinalLegado.desbloqueado && !premioFinalDasMissoesDisponivel()) return '';
    const premio = CONFIG.missoes.premioFinal;
    const resgatado = premioFinalLegado.resgatado;
    return `<section class="premio-final-missoes">
        <h3>${localizar('Prêmio final das 100 missões')}</h3>
        <p>${premio.experiencia.toLocaleString(idiomaAtual)} XP</p>
        <button id="resgatar-premio-final-missoes" class="botao" onclick="resgatarPremioFinalDasMissoes()" ${!premioFinalDasMissoesDisponivel()?'disabled':''}>${localizar(resgatado?'Resgatada':'Resgatar prêmio final')}</button>
    </section>`;
}

function criarCatalogoDeMissoesPermanentes() {
    const categorias = ['Primeiros passos', 'Caçada aos pixels', 'Caçador de Bosses', 'Construção e melhorias', 'Domínio das defesas', 'Jornada pela campanha', 'Veterano da campanha', 'Desafios de estratégia', 'Além da última wave', 'Segredos e investigação'];
    const linhas = [
        ['Primeira defesa','Construa sua primeira torre.','torresConstruidas',1],
        ['Aprendiz','Conclua o tutorial.','tutorial',1],
        ['Primeiro investimento','Melhore uma torre.','melhorias',1],
        ['Escolha seu alvo','Altere a prioridade de uma torre.','prioridades',1],
        ['Mudança de planos','Venda uma torre.','vendas',1],
        ['Linha de defesa','Tenha três torres ao mesmo tempo.','torresSimultaneas',3],
        ['Equipe variada','Construa três tipos de torre em uma partida.','tiposNaPartida',3],
        ['Primeira resistência','Complete cinco waves acumuladas.','wavesCompletas',5],
        ['Primeiro gigante','Derrote um Boss.','bosses',1],
        ['Eu consigo!','Vença sua primeira partida de campanha.','fasesConcluidas',1],
        ...['Pequena limpeza','Caminho livre','Defensor dedicado','Sem passagem','Exército de um só','Pesadelo dos invasores','Guardião incansável','Muralha viva','Lenda dos pixels','Eles continuam vindo…'].map((nome,i)=>[nome,`Elimine ${[50,150,500,1000,2500,5000,10000,20000,35000,50000][i]} inimigos.`, 'inimigosEliminados',[50,150,500,1000,2500,5000,10000,20000,35000,50000][i]]),
        ...['Não era tão grande','Derrubando gigantes','Especialista em gigantes','Nenhum me assusta','Colecionador de vitórias','Fim dos titãs'].map((nome,i)=>[nome,`Derrote ${[3,10,25,50,100,250][i]} Bosses.`, 'bosses',[3,10,25,50,100,250][i]]),
        ['Conhecendo o perigo','Derrote três tipos de Boss.','tiposDeBoss',3],
        ['Bestiário de gigantes','Derrote seis tipos de Boss.','tiposDeBoss',6],
        ['Quatro encontros','Derrote quatro Bosses em uma partida.','bossesNaPartida',4],
        ['Pode mandar o próximo','Derrote oito Bosses em uma partida infinita.','bossesNaInfinita',8],
        ...['Pedra fundamental','Construtor','Engenheiro de defesa','Arquiteto da resistência'].map((nome,i)=>[nome,`Construa ${[10,50,150,500][i]} torres.`, 'torresConstruidas',[10,50,150,500][i]]),
        ...['Um pequeno ajuste','Sempre melhorando','Tecnologia de ponta'].map((nome,i)=>[nome,`Faça ${[10,50,150][i]} melhorias.`, 'melhorias',[10,50,150][i]]),
        ['Poder máximo','Leve uma torre ao nível máximo.','torresMaximas',1],
        ['Trio de elite','Tenha três torres no nível máximo em uma partida.','torresMaximas',3],
        ['Fortaleza completa','Tenha seis torres no nível máximo em uma partida.','torresMaximas',6],
        ['O básico funciona','Elimine 500 inimigos com a Torre padrão.','eliminacoes_padrao',500],
        ['Fiel à primeira torre','Vença cinco partidas com a Torre padrão construída.','vitoriasPadrao',5],
        ['Campo minado','Elimine 100 inimigos com Minas.','eliminacoes_minaTerrestre',100],
        ['Passo em falso','Elimine 500 inimigos com Minas.','eliminacoes_minaTerrestre',500],
        ['Impacto pesado','Elimine 100 inimigos com a Bomba Pesada.','eliminacoes_bombaPesada',100],
        ['Explosão em cadeia','Elimine 500 inimigos com a Bomba Pesada.','eliminacoes_bombaPesada',500],
        ['Eu vejo você','Revele 50 camuflados com a Varredura.','revelados',50],
        ['Sem esconderijo','Elimine 100 camuflados revelados pela Varredura.','camufladosEliminados',100],
        ['Foco total','Alcance a sequência máxima do Feixe Contínuo.','feixeMaximo',1],
        ['Lá de longe','Elimine 100 inimigos com a Torre de Longo Alcance.','eliminacoes_torreLongoAlcance',100],
        ...['Começo de tudo','Areia nos sapatos','Sangue-frio','Entre as ruínas','Depois do pôr do sol','Resistência ao calor'].map((nome,i)=>[nome,`Vença a Fase ${i+1}.`,`fase_${i+1}`,1]),
        ['Além do começo','Desbloqueie o Capítulo 2.','capitulo2',1],
        ['Águas perigosas','Vença a Fase 7.','fase_7',1],
        ['Uma viagem diferente','Vença as Fases 8 e 9.','passadoEFuturo',2],
        ['Uma nova etapa','Desbloqueie o Capítulo 3.','capitulo3',1],
        ...['De volta ao campo','Defensor experiente','Serviço de proteção','Sempre de pé','Guardião veterano'].map((nome,i)=>[nome,`Vença ${[3,10,25,50,100][i]} partidas de campanha.`,'fasesConcluidas',[3,10,25,50,100][i]]),
        ['Conheço este caminho','Vença a mesma fase cinco vezes.','vitoriasMesmaFase',5],
        ['Especialista local','Vença a mesma fase dez vezes.','vitoriasMesmaFase',10],
        ['Explorador de campos','Vença cinco fases numeradas diferentes.','fasesDiferentes',5],
        ['Defensor de muitas terras','Vença dez fases numeradas diferentes.','fasesDiferentes',10],
        ['Até as memórias','Vença todas as Fases 1 a 16.','fasesDiferentes',16],
        ['Economia de espaço','Vença a Fase 1 construindo no máximo cinco torres.','estrategia_71',1],
        ['Poucas, mas boas','Vença uma fase usando no máximo três tipos de torre.','estrategia_72',1],
        ['Tudo no lugar','Vença uma partida sem vender torres.','estrategia_73',1],
        ['Sem explosivos','Vença uma fase sem colocar Minas ou Bombas Pesadas.','estrategia_74',1],
        ['Defesa convencional','Vença a Fase 1 usando somente Torres padrão.','estrategia_75',1],
        ['Sem aperfeiçoamentos','Vença a Fase 1 sem melhorar torres.','estrategia_76',1],
        ['Diversidade em campo','Vença com seis tipos de torre construídos.','estrategia_77',1],
        ['Reserva de emergência','Vença com pelo menos 500 créditos restantes.','estrategia_78',1],
        ['Cofre protegido','Vença com pelo menos 1.000 créditos restantes.','estrategia_79',1],
        ['Investimento completo','Vença com quatro torres no nível máximo.','estrategia_80',1],
        ...['Sem linha de chegada','Só aquecendo','Além do limite','Ainda estou aqui','Resistência extrema','Não acaba nunca?','Cem motivos para resistir'].map((nome,i)=>[nome,`Complete a wave ${[20,30,40,50,60,75,100][i]} no modo infinito.`,'maiorWaveInfinita',[20,30,40,50,60,75,100][i]]),
        ['Maratonista','Complete 250 waves acumuladas no infinito.','wavesInfinitasCompletas',250],
        ['Turno interminável','Complete 1.000 waves acumuladas no infinito.','wavesInfinitasCompletas',1000],
        ['Resistência em qualquer lugar','Complete a wave 30 em três fases diferentes no infinito.','mapasInfinitos30',3],
        ['Correspondência inesperada','Leia a carta encontrada após a Fase 6.','carta',1],
        ['Entre as árvores','Descubra o portal escondido.','portal',1],
        ['Fora da realidade','Entre na Dimensão Glitch.','glitch',1],
        ['Erro corrigido','Vença a Dimensão Glitch.','vitoriaGlitch',1],
        ['O tempo nas mãos','Obtenha a Máquina do Tempo.','maquina',1],
        ['Projeto suspeito','Ouça a transmissão do Projeto Relógio.','transmissao',1],
        ['Uma pista preservada','Vença a Fase 15 e conclua sua cena final.','historia15',1],
        ['Outros antes de mim','Conclua a história da Fase 16.','historia16',1],
        ['Arsenal da memória','Desbloqueie a Torre de Feixe Contínuo.','feixeLiberado',1],
        ['Muito longe do começo','Alcance o nível 12 e desbloqueie a Torre de Longo Alcance.','nivel12',1]
    ];
    // Valores por missão, agrupados nas mesmas dez categorias do catálogo.
    // Fácil: 3–5; média: 10–20; difícil: 20–25 Fragmentos.
    const premiosPorMissao = [
        [3,3,3,3,3,3,5,3,5,5],
        [3,5,10,10,15,20,20,25,25,25],
        [3,5,10,15,20,25,10,15,5,20],
        [3,5,10,20,3,10,15,5,10,20],
        [10,10,5,15,5,15,10,15,5,10],
        [3,5,5,10,10,15,20,15,20,25],
        [15,10,15,20,25,5,10,10,20,25],
        [5,5,3,3,5,15,10,5,10,15],
        [10,15,25,20,25,25,25,15,25,20],
        [3,3,3,20,10,5,20,25,5,20]
    ].flat();
    return Object.freeze(linhas.map(([nome,descricao,propriedadeDoProgresso,objetivo],i)=> {
        const numero = i + 1;
        const quantidade = premiosPorMissao[i];
        const recompensa = numero === 61
            ? {tipo:'fragmentos',quantidade:15,rotulo:'15 Fragmentos de Pixel'}
            : {tipo:'fragmentos',quantidade,rotulo:`${quantidade} Fragmentos de Pixel`};
        return Object.freeze({id:`permanente${numero}`,numero,nome,descricao,propriedadeDoProgresso,objetivo,
            categoria:categorias[Math.floor(i/10)],secreta:numero>=91,icone:numero>=91?'?':'★',recompensa:Object.freeze(recompensa)});
    }));
}

let catalogoHistoricoDasMissoes = null;
function obterCatalogoHistoricoDasMissoes() {
    if (!catalogoHistoricoDasMissoes) {
        catalogoHistoricoDasMissoes = criarCatalogoDeMissoesPermanentes();
    }
    return catalogoHistoricoDasMissoes;
}

let estatisticasDaPartidaParaMissoes;
function reiniciarEstatisticasDaPartidaParaMissoes() {
    estatisticasDaPartidaParaMissoes = {construidas:0,tipos:new Set(),explosivos:0,vendas:0,melhorias:0,bosses:0,waveRegistrada:0,vitoriaRegistrada:false};
}
function partidaContaParaMissoes() {
    return jogoIniciado && !mapaPersonalizadoAtivo && Boolean(estatisticasDaPartidaParaMissoes)
        && !(typeof exploracaoDoLimboAtiva !== 'undefined' && exploracaoDoLimboAtiva);
}
function atualizarTorresParaMissoes() {
    if (!partidaContaParaMissoes()) return;
    registrarProgressoDaMissao('torresSimultaneas',torres.length,true);
    registrarProgressoDaMissao('tiposNaPartida',estatisticasDaPartidaParaMissoes.tipos.size,true);
    registrarProgressoDaMissao('torresMaximas',contarTorresMaximasParaMissoes(),true);
}
function contarTorresMaximasParaMissoes() {
    return torres.filter(t=> {
        const melhorias=CONFIG.torre.tipos[t.tipo]?.melhorias;
        if(configuracaoUsaMelhoriasEscolhidas(CONFIG.torre.tipos[t.tipo]))return obterTotalDeMelhorias(t)>=CONFIG.melhoriasEscolhidas.limite;
        return melhorias?.length>0 && t.nivel>=melhorias.length;
    }).length;
}
function registrarConstrucaoParaMissoes(tipo) {
    if (!partidaContaParaMissoes()) return;
    const e=estatisticasDaPartidaParaMissoes;
    if (['mina','bomba'].includes(CONFIG.torre.tipos[tipo]?.tipoDeItem)) {
        e.explosivos++;
        if (combateContaParaConquistasExtras()) tentativaConquistasExtras.somenteMetadeFinal=false;
    }
    else {e.construidas++;e.tipos.add(tipo);registrarProgressoDaMissao('torresConstruidas',1);}
    atualizarTorresParaMissoes();
}
function registrarAcaoDaTorreParaMissoes(acao) {
    if (acao === 'melhorias' && typeof registrarMelhoriaDesafioDaCampanha === 'function') {
        registrarMelhoriaDesafioDaCampanha(torreSelecionada);
    }
    if (!partidaContaParaMissoes()) return;
    if (acao in estatisticasDaPartidaParaMissoes) estatisticasDaPartidaParaMissoes[acao]++;
    registrarProgressoDaMissao(acao,1);
    atualizarTorresParaMissoes();
}
function registrarElementoUnicoParaMissoes(grupo,valor,propriedade) {
    const lista=estatisticasDosObjetivos.colecoes[grupo] ||= [];
    if (!lista.includes(valor)) {
        lista.push(valor);
        registrarProgressoDaMissao(propriedade,lista.length,true);
        salvarEstatisticasDosObjetivos();
    }
}
function registrarEliminacaoDetalhadaParaMissoes(inimigo) {
    if (!partidaContaParaMissoes()) return;
    if (tipoEhBoss(inimigo.tipo)) {
        registrarProgressoDaMissao('bosses',1);
        estatisticasDaPartidaParaMissoes.bosses++;
        registrarProgressoDaMissao('bossesNaPartida',estatisticasDaPartidaParaMissoes.bosses,true);
        if (modoWavesInfinitas) registrarProgressoDaMissao('bossesNaInfinita',estatisticasDaPartidaParaMissoes.bosses,true);
        registrarElementoUnicoParaMissoes('bosses',inimigo.tipo,'tiposDeBoss');
    }
    if (inimigo.defesaDoGolpeFinal) registrarProgressoDaMissao(`eliminacoes_${inimigo.defesaDoGolpeFinal}`,1);
    if (inimigo.camuflado && inimigo.reveladoParaMissoes) registrarProgressoDaMissao('camufladosEliminados',1);
}
function registrarWaveCompletaParaMissoes() {
    if (!partidaContaParaMissoes() || wave<=estatisticasDaPartidaParaMissoes.waveRegistrada) return;
    estatisticasDaPartidaParaMissoes.waveRegistrada=wave;
    registrarProgressoDaMissao('wavesCompletas',1);
    if (modoWavesInfinitas) {
        registrarProgressoDaMissao('wavesInfinitasCompletas',1);
        registrarProgressoDaMissao('maiorWaveInfinita',wave,true);
        if (wave>=30) registrarElementoUnicoParaMissoes('mapasInfinitos',faseSelecionada,'mapasInfinitos30');
    }
}
function registrarVitoriaDetalhadaParaMissoes() {
    if (!partidaContaParaMissoes() || modoWavesInfinitas || estatisticasDaPartidaParaMissoes.vitoriaRegistrada) return;
    const e=estatisticasDaPartidaParaMissoes;
    e.vitoriaRegistrada=true;
    if (faseSelecionada>=1 && faseSelecionada<=16) {
        registrarProgressoDaMissao(`fase_${faseSelecionada}`,1,true);
        registrarElementoUnicoParaMissoes('fases',faseSelecionada,'fasesDiferentes');
    }
    const vitorias=estatisticasDosObjetivos.vitoriasPorFase;
    vitorias[faseSelecionada]=(vitorias[faseSelecionada]||0)+1;
    registrarProgressoDaMissao('vitoriasMesmaFase',vitorias[faseSelecionada],true);
    if (torres.some(t=>t.tipo==='padrao')) registrarProgressoDaMissao('vitoriasPadrao',1);
    const condicoes=[faseSelecionada===1&&e.construidas<=5,e.tipos.size<=3,e.vendas===0,e.explosivos===0,
        faseSelecionada===1&&e.tipos.size===1&&e.tipos.has('padrao')&&e.explosivos===0,
        faseSelecionada===1&&e.melhorias===0,new Set(torres.map(t=>t.tipo)).size>=6,dinheiro>=500,dinheiro>=1000,contarTorresMaximasParaMissoes()>=4];
    condicoes.forEach((ok,i)=>{if(ok)registrarProgressoDaMissao(`estrategia_${71+i}`,1,true);});
    salvarEstatisticasDosObjetivos();
}

function sincronizarDescobertasParaMissoes() {
    const marcos={tutorial:tutorialConcluido,capitulo2:capitulo2Desbloqueado,capitulo3:capitulo3Desbloqueado,
        carta:cartaMisteriosaVista,portal:faseSecretaDescoberta,glitch:capitulo2Desbloqueado,
        vitoriaGlitch:capitulo2Desbloqueado,maquina:maquinaDoTempoDesbloqueada,transmissao:transmissaoProjetoRelogioVista,
        feixeLiberado:maiorFaseConcluida>=16,nivel12:obterDadosDoNivel().nivel>=12};
    for(const [chave,valor] of Object.entries(marcos)) if(valor) registrarProgressoDaMissao(chave,1,true);
    // Somente o marco máximo efetivamente salvo; não inferir vitórias intermediárias.
    if(maiorFaseConcluida>=1&&maiorFaseConcluida<=16) {
        registrarProgressoDaMissao(`fase_${maiorFaseConcluida}`,1,true);
        registrarElementoUnicoParaMissoes('fases',maiorFaseConcluida,'fasesDiferentes');
    }
    const fases=estatisticasDosObjetivos.colecoes.fases||[];
    registrarProgressoDaMissao('passadoEFuturo',[8,9].filter(f=>fases.includes(f)).length,true);
}
