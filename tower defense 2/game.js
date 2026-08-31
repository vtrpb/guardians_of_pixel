// Elementos da página
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const musica = document.getElementById("musica");
const botaoMusica = document.getElementById("botao-musica");
const botaoTorrePadrao = document.getElementById("botao-torre-padrao");
const botaoCanhaoPesado = document.getElementById("botao-canhao-pesado");
const botaoTorreGlacial = document.getElementById("botao-torre-glacial");
const botaoTorreBesta = document.getElementById("botao-torre-besta");
const botaoTorreEsporos = document.getElementById("botao-torre-esporos");
const botaoObliterador = document.getElementById("botao-obliterador");
const botaoTorreSismica = document.getElementById("botao-torre-sismica");
const botaoIscaBlindada = document.getElementById("botao-isca-blindada");
const botaoAmplificadorPixel = document.getElementById("botao-amplificador-pixel");
const botaoGeradorCreditos = document.getElementById("botao-gerador-creditos");
const botaoTorreRaios = document.getElementById("botao-torre-raios");
const botaoLancaChamas = document.getElementById("botao-lanca-chamas");
const botaoMinaTerrestre = document.getElementById("botao-mina-terrestre");
const botaoMinaCongelante = document.getElementById("botao-mina-congelante");
const botaoBombaPesada = document.getElementById("botao-bomba-pesada");
const botaoMelhorar = document.getElementById("botao-melhorar");
const botaoVender = document.getElementById("botao-vender");
const botaoModoDeAlvo = document.getElementById("botao-modo-alvo");
const controles = document.querySelector(".controles");
const seletorTorres = document.getElementById("seletor-torres");
const resumoDoSeletorTorres = document.querySelector(".seletor-torres-cabecalho small");
const descricaoCentralTorre = document.querySelector(".controles-contexto small");
const camadaTutorialPartida = document.getElementById("camada-tutorial-partida");
const progressoTutorialPartida = document.getElementById("progresso-tutorial-partida");
const tituloTutorialPartida = document.getElementById("titulo-tutorial-partida");
const descricaoTutorialPartida = document.getElementById("descricao-tutorial-partida");
const botaoContinuarTutorial = document.getElementById("botao-continuar-tutorial");
const menuPrincipal = document.getElementById("menu-principal");
const conteudoMenu = document.getElementById("conteudo-menu");
const indicadorFaseSelecionada = document.getElementById("fase-selecionada-menu");
const limiteTorresMenu = document.getElementById("limite-torres-menu");
const fragmentosPixelMenu = document.getElementById("fragmentos-pixel-menu");
const creditosIniciaisMenu = document.getElementById("creditos-iniciais-menu");
const resumoMissoesMenu = document.getElementById("resumo-missoes-menu");
const resumoConquistasMenu = document.getElementById("resumo-conquistas-menu");
const estadoPacoteApoiadorMenu = document.getElementById("estado-pacote-apoiador-menu");
const portalFaseSecreta = document.getElementById("portal-fase-secreta");
const camadaTransicaoGlitch = document.getElementById("camada-transicao-glitch");
const camadaCorredoresAmarelos = document.getElementById("camada-corredores-amarelos");
const canvasLabirintoAmarelo = document.getElementById("labirinto-amarelo");
const ctxLabirintoAmarelo = canvasLabirintoAmarelo.getContext?.("2d") || null;
const botoesDirecaoCorredores = [...document.querySelectorAll("[data-direcao-corredores]")];
const camadaConversaPortal = document.getElementById("camada-conversa-portal");
const camadaCutsceneCarta = document.getElementById("camada-cutscene-carta");
const tituloCutsceneCarta = document.getElementById("titulo-cutscene-carta");
const textoCutsceneCarta = document.getElementById("texto-cutscene-carta");
const assinaturaCutsceneCarta = document.getElementById("assinatura-cutscene-carta");
const botaoContinuarCutsceneCarta = document.getElementById("botao-continuar-cutscene-carta");
const camadaCutsceneCapitulo2 = document.getElementById("camada-cutscene-capitulo-2");
const rotuloCutsceneCapitulo2 = document.getElementById("rotulo-cutscene-capitulo-2");
const tituloCutsceneCapitulo2 = document.getElementById("titulo-cutscene-capitulo-2");
const descricaoCutsceneCapitulo2 = document.getElementById("descricao-cutscene-capitulo-2");
const mensagemCutsceneCapitulo2 = document.getElementById("mensagem-cutscene-capitulo-2");
const botaoContinuarCutsceneCapitulo2 = document.getElementById("botao-continuar-cutscene-capitulo-2");
const lobbyJogador = document.getElementById("lobby-jogador");
const lobbyAvatar = document.getElementById("lobby-avatar");
const rotuloDefensorLobby = document.getElementById("rotulo-defensor-lobby");
const estadoDefensorLobby = document.getElementById("estado-defensor-lobby");
const menuPartida = document.getElementById("menu-partida");
const botaoMenuPartida = document.getElementById("botao-menu-partida");
const painelMenuPartida = document.getElementById("painel-menu-partida");
const botaoConfiguracoesPartida = document.getElementById("botao-configuracoes-partida");
const botaoConfiguracoesLobby = document.getElementById("botao-configuracoes-lobby");
const camadaConfiguracoes = document.getElementById("camada-configuracoes");
const botaoFecharConfiguracoes = document.querySelector(".botao-fechar-configuracoes");
const controleVolumeMusica = document.getElementById("controle-volume-musica");
const valorVolumeMusica = document.getElementById("valor-volume-musica");
const controleVolumeEfeitos = document.getElementById("controle-volume-efeitos");
const valorVolumeEfeitos = document.getElementById("valor-volume-efeitos");
const botaoEfeitosSonoros = document.getElementById("botao-efeitos-sonoros");
const botaoModoDiaNoite = document.getElementById("botao-modo-dia-noite");
const botoesDeIdioma = [...document.querySelectorAll(".botao-idioma")];
const camadaConfirmacaoDesistencia = document.getElementById("camada-confirmacao-desistencia");
const descricaoConfirmacaoDesistencia = document.getElementById("descricao-confirmacao-desistencia");
const botaoDesistirMenu = document.getElementById("botao-desistir-menu");
const botaoCancelarDesistencia = document.getElementById("botao-cancelar-desistencia");
const camadaConfirmacaoCompraLoja = document.getElementById("camada-confirmacao-compra-loja");
const descricaoConfirmacaoCompraLoja = document.getElementById("descricao-confirmacao-compra-loja");
const botaoConfirmarCompraLoja = document.getElementById("botao-confirmar-compra-loja");
const botaoCancelarCompraLoja = document.getElementById("botao-cancelar-compra-loja");
const regiaoNotificacoesProgresso = document.getElementById("regiao-notificacoes-progresso");
const camadaResultado = document.getElementById("camada-resultado");
const seloResultado = document.getElementById("selo-resultado");
const tituloResultado = document.getElementById("titulo-resultado");
const descricaoResultado = document.getElementById("descricao-resultado");
const botaoRepetirResultado = document.getElementById("botao-repetir-resultado");
const botaoVoltarLobbyResultado = document.getElementById("botao-voltar-lobby-resultado");
const botaoProximaFaseResultado = document.getElementById("botao-proxima-fase-resultado");
const camadaBonusPosBoss = document.getElementById("camada-bonus-pos-boss");
const opcoesBonusPosBoss = document.getElementById("opcoes-bonus-pos-boss");
const camadaMinigameFliperama = document.getElementById("camada-minigame-fliperama");
const canvasMinigameFliperama = document.getElementById("minigame-fliperama");
const ctxMinigameFliperama = canvasMinigameFliperama.getContext("2d");
const tituloMinigameFliperama = document.getElementById("titulo-minigame-fliperama");
const descricaoMinigameFliperama = document.getElementById("descricao-minigame-fliperama");
const rotuloPontosMinigameFliperama = document.getElementById("rotulo-pontos-minigame-fliperama");
const pontosMinigameFliperama = document.getElementById("pontos-minigame-fliperama");
const tempoMinigameFliperama = document.getElementById("tempo-minigame-fliperama");
const instrucaoMinigameFliperama = document.getElementById("instrucao-minigame-fliperama");
const controlesToqueLabirinto = document.getElementById("controles-toque-labirinto");
const botoesDirecaoLabirinto = [...document.querySelectorAll("[data-direcao-labirinto]")];
const listaBonusPosBossNoPosto = document.getElementById("lista-bonus-posto");
const boostFliperamaNoPosto = document.getElementById("boost-fliperama-posto");
const estadoBoostFliperamaNoPosto = document.getElementById("estado-boost-fliperama-posto");
const barraBoostFliperamaNoPosto = document.getElementById("barra-boost-fliperama-posto");
const barraBoostDanoFliperamaNoPosto = document.getElementById("barra-boost-dano-fliperama-posto");
const postoPulsoTemporal = document.getElementById("posto-pulso-temporal");
const botaoPulsoTemporal = document.getElementById("botao-pulso-temporal");
const estadoPulsoTemporal = document.getElementById("estado-pulso-temporal");

const VOLUME_MUSICA_DE_FUNDO = 0.35;
const CHAVE_PROGRESSO_FASES = "tower-defense-2-progresso-fases-v2";
const CHAVE_FRAGMENTOS_PIXEL = "guardians-of-pixel-fragmentos-v2";
const CHAVE_COMPRAS_LOJA = "guardians-of-pixel-compras-v2";
const CHAVE_TUTORIAL_CONCLUIDO = "guardians-of-pixel-tutorial-concluido-v1";
const CHAVE_MISSOES_SEMANAIS = "guardians-of-pixel-missoes-semanais-v1";
const CHAVE_RECOMPENSAS_MISSOES = "guardians-of-pixel-recompensas-missoes-v1";
const CHAVE_ESTATISTICAS_CONQUISTAS = "guardians-of-pixel-estatisticas-conquistas-v1";
const CHAVE_PACOTE_APOIADOR = "guardians-of-pixel-pacote-apoiador-v1";
const CHAVE_IDIOMA = "guardians-of-pixel-idioma-v1";
const CHAVE_PREFERENCIAS = "guardians-of-pixel-preferencias-v1";
const CHAVE_FASE_SECRETA_DESCOBERTA = "guardians-of-pixel-fase-secreta-v1";
const CHAVE_CAPITULO_2_DESBLOQUEADO = "guardians-of-pixel-capitulo-2-desbloqueado-v1";
const CHAVE_CARTA_MISTERIOSA_VISTA = "guardians-of-pixel-carta-misteriosa-v1";
const CHAVE_CARTA_MAQUINA_DO_TEMPO_VISTA = "guardians-of-pixel-carta-maquina-tempo-v1";
const CHAVE_MAQUINA_DO_TEMPO_DESBLOQUEADA = "guardians-of-pixel-maquina-tempo-v1";
const CHAVE_EPOCA_DA_MAQUINA_DO_TEMPO = "guardians-of-pixel-epoca-temporal-v1";
const CHAVE_TRANSMISSAO_PROJETO_RELOGIO_VISTA = "guardians-of-pixel-transmissao-projeto-relogio-v1";
const CHAVE_FIGURINHAS_DO_ALBUM = "guardians-of-pixel-album-figurinhas-v1";
const CHAVE_SELECAO_DE_DEFESAS = "guardians-of-pixel-selecao-defesas-v1";
const IDIOMAS_SUPORTADOS = Object.freeze(["pt-BR", "en", "es"]);
const TRADUCOES = Object.freeze({
    "pt-BR": Object.freeze({
        "configuracoes.titulo": "Configurações",
        "configuracoes.fechar": "Fechar configurações",
        "configuracoes.volumeMusica": "Volume da música",
        "configuracoes.silenciarMusica": "Silenciar música",
        "configuracoes.ativarMusica": "Ativar música",
        "configuracoes.volumeEfeitos": "Volume dos efeitos",
        "configuracoes.desativarEfeitos": "Desativar efeitos",
        "configuracoes.ativarEfeitos": "Ativar efeitos",
        "configuracoes.iluminacao": "Iluminação",
        "configuracoes.modoDia": "Modo dia",
        "configuracoes.modoNoite": "Modo noite",
        "configuracoes.idioma": "Idioma",
        "configuracoes.escolherIdioma": "Escolher idioma",
        "lobby.sobreviva": "Sobreviva até o fim!",
        "lobby.album": "Álbum",
        "lobby.torresInimigos": "Complete suas figurinhas",
        "lobby.comecarPartida": "Começar partida",
        "lobby.capitulos": "Capítulos",
        "lobby.progressoCampanha": "Progresso da campanha",
        "lobby.comoJogar": "Como jogar",
        "lobby.aprendaDefender": "Aprenda a defender",
        "lobby.loja": "Loja",
        "lobby.defesasMelhorias": "Defesas e melhorias",
        "lobby.pacoteApoiador": "Pacote Apoiador",
        "lobby.pacoteAtivo": "Pacote ativo",
        "lobby.cosmeticosExclusivos": "Cosméticos exclusivos",
        "lobby.missoes": "Missões",
        "lobby.premioPronto": "{quantidade} prêmio pronto",
        "lobby.premiosProntos": "{quantidade} prêmios prontos",
        "lobby.conquistas": "Conquistas",
        "lobby.conquistasDesbloqueadas": "{desbloqueadas}/{total} desbloqueadas",
        "lobby.wavesInfinitas": "Waves infinitas",
        "lobby.jogueAteBaseCair": "Jogue até sua base cair",
        "lobby.defensor": "DEFENSOR",
        "lobby.apoiador": "APOIADOR",
        "lobby.prontoParaJogar": "PRONTO PARA JOGAR",
        "lobby.coracaoDePixel": "CORAÇÃO DE PIXEL",
        "lobby.faseWave": "Fase {fase} · Wave 1",
        "lobby.creditos": "créditos",
        "lobby.fragmentos": "fragmentos",
        "lobby.torres": "torres",
        "lobby.wavesPorFase": "waves por fase",
        "lobby.criadoPor": "Criado por",
        "loja.compraDaLoja": "Compra da Loja",
        "loja.confirmarCompra": "Confirmar compra?",
        "loja.confirmacaoCompra": "Comprar {item} por {preco} Fragmentos? Seu saldo ficará em {saldo} Fragmentos.",
        "loja.comprar": "Comprar",
        "loja.cancelar": "Cancelar",
        "notificacoes.missaoConcluida": "Missão concluída",
        "notificacoes.resgatarMissao": "Abra Missões para resgatar o prêmio.",
        "notificacoes.conquistaDesbloqueada": "Conquista desbloqueada",
        "apoiador.iniciandoCheckout": "Abrindo checkout seguro...",
        "apoiador.erroCheckout": "Não foi possível conectar ao checkout seguro. Tente novamente.",
        "apoiador.liberacaoConta": "Liberação vinculada à sua conta",
        "apoiador.confirmacaoServidor": "O pacote só será liberado depois que o servidor confirmar o pagamento."
    }),
    en: Object.freeze({
        "configuracoes.titulo": "Settings",
        "configuracoes.fechar": "Close settings",
        "configuracoes.volumeMusica": "Music volume",
        "configuracoes.silenciarMusica": "Mute music",
        "configuracoes.ativarMusica": "Enable music",
        "configuracoes.volumeEfeitos": "Sound effects volume",
        "configuracoes.desativarEfeitos": "Disable effects",
        "configuracoes.ativarEfeitos": "Enable effects",
        "configuracoes.iluminacao": "Lighting",
        "configuracoes.modoDia": "Day mode",
        "configuracoes.modoNoite": "Night mode",
        "configuracoes.idioma": "Language",
        "configuracoes.escolherIdioma": "Choose language",
        "lobby.sobreviva": "Survive until the end!",
        "lobby.album": "Album",
        "lobby.torresInimigos": "Complete your sticker album",
        "lobby.comecarPartida": "Start game",
        "lobby.capitulos": "Chapters",
        "lobby.progressoCampanha": "Campaign progress",
        "lobby.comoJogar": "How to play",
        "lobby.aprendaDefender": "Learn to defend",
        "lobby.loja": "Shop",
        "lobby.defesasMelhorias": "Defenses and upgrades",
        "lobby.pacoteApoiador": "Supporter Pack",
        "lobby.pacoteAtivo": "Pack active",
        "lobby.cosmeticosExclusivos": "Exclusive cosmetics",
        "lobby.missoes": "Missions",
        "lobby.premioPronto": "{quantidade} reward ready",
        "lobby.premiosProntos": "{quantidade} rewards ready",
        "lobby.conquistas": "Achievements",
        "lobby.conquistasDesbloqueadas": "{desbloqueadas}/{total} unlocked",
        "lobby.wavesInfinitas": "Endless waves",
        "lobby.jogueAteBaseCair": "Play until your base falls",
        "lobby.defensor": "DEFENDER",
        "lobby.apoiador": "SUPPORTER",
        "lobby.prontoParaJogar": "READY TO PLAY",
        "lobby.coracaoDePixel": "PIXEL HEART",
        "lobby.faseWave": "Stage {fase} · Wave 1",
        "lobby.creditos": "credits",
        "lobby.fragmentos": "fragments",
        "lobby.torres": "towers",
        "lobby.wavesPorFase": "waves per stage",
        "lobby.criadoPor": "Created by",
        "loja.compraDaLoja": "Shop purchase",
        "loja.confirmarCompra": "Confirm purchase?",
        "loja.confirmacaoCompra": "Buy {item} for {preco} Fragments? Your balance will be {saldo} Fragments.",
        "loja.comprar": "Buy",
        "loja.cancelar": "Cancel",
        "notificacoes.missaoConcluida": "Mission complete",
        "notificacoes.resgatarMissao": "Open Missions to claim the reward.",
        "notificacoes.conquistaDesbloqueada": "Achievement unlocked",
        "apoiador.iniciandoCheckout": "Opening secure checkout...",
        "apoiador.erroCheckout": "Could not connect to the secure checkout. Try again.",
        "apoiador.liberacaoConta": "Unlock linked to your account",
        "apoiador.confirmacaoServidor": "The pack will only unlock after the server confirms the payment."
    }),
    es: Object.freeze({
        "configuracoes.titulo": "Configuración",
        "configuracoes.fechar": "Cerrar configuración",
        "configuracoes.volumeMusica": "Volumen de música",
        "configuracoes.silenciarMusica": "Silenciar música",
        "configuracoes.ativarMusica": "Activar música",
        "configuracoes.volumeEfeitos": "Volumen de efectos",
        "configuracoes.desativarEfeitos": "Desactivar efectos",
        "configuracoes.ativarEfeitos": "Activar efectos",
        "configuracoes.iluminacao": "Iluminación",
        "configuracoes.modoDia": "Modo día",
        "configuracoes.modoNoite": "Modo noche",
        "configuracoes.idioma": "Idioma",
        "configuracoes.escolherIdioma": "Elegir idioma",
        "lobby.sobreviva": "¡Sobrevive hasta el final!",
        "lobby.album": "Álbum",
        "lobby.torresInimigos": "Completa tu álbum de cromos",
        "lobby.comecarPartida": "Comenzar partida",
        "lobby.capitulos": "Capítulos",
        "lobby.progressoCampanha": "Progreso de campaña",
        "lobby.comoJogar": "Cómo jugar",
        "lobby.aprendaDefender": "Aprende a defender",
        "lobby.loja": "Tienda",
        "lobby.defesasMelhorias": "Defensas y mejoras",
        "lobby.pacoteApoiador": "Paquete de Apoyo",
        "lobby.pacoteAtivo": "Paquete activo",
        "lobby.cosmeticosExclusivos": "Cosméticos exclusivos",
        "lobby.missoes": "Misiones",
        "lobby.premioPronto": "{quantidade} premio listo",
        "lobby.premiosProntos": "{quantidade} premios listos",
        "lobby.conquistas": "Logros",
        "lobby.conquistasDesbloqueadas": "{desbloqueadas}/{total} desbloqueados",
        "lobby.wavesInfinitas": "Oleadas infinitas",
        "lobby.jogueAteBaseCair": "Juega hasta que caiga tu base",
        "lobby.defensor": "DEFENSOR",
        "lobby.apoiador": "COLABORADOR",
        "lobby.prontoParaJogar": "LISTO PARA JUGAR",
        "lobby.coracaoDePixel": "CORAZÓN DE PÍXEL",
        "lobby.faseWave": "Fase {fase} · Oleada 1",
        "lobby.creditos": "créditos",
        "lobby.fragmentos": "fragmentos",
        "lobby.torres": "torres",
        "lobby.wavesPorFase": "oleadas por fase",
        "lobby.criadoPor": "Creado por",
        "loja.compraDaLoja": "Compra de la Tienda",
        "loja.confirmarCompra": "¿Confirmar compra?",
        "loja.confirmacaoCompra": "¿Comprar {item} por {preco} Fragmentos? Tu saldo quedará en {saldo} Fragmentos.",
        "loja.comprar": "Comprar",
        "loja.cancelar": "Cancelar",
        "notificacoes.missaoConcluida": "Misión completada",
        "notificacoes.resgatarMissao": "Abre Misiones para reclamar el premio.",
        "notificacoes.conquistaDesbloqueada": "Logro desbloqueado",
        "apoiador.iniciandoCheckout": "Abriendo pago seguro...",
        "apoiador.erroCheckout": "No se pudo conectar al pago seguro. Inténtalo de nuevo.",
        "apoiador.liberacaoConta": "Desbloqueo vinculado a tu cuenta",
        "apoiador.confirmacaoServidor": "El paquete solo se desbloqueará cuando el servidor confirme el pago."
    })
});
const CHAVES_PRINCIPAIS_POR_TEXTO = Object.freeze(Object.fromEntries(
    Object.entries(TRADUCOES["pt-BR"]).map(([chave, texto]) => [texto, chave])
));
const TEXTOS_LOCALIZADOS = Object.freeze({
    en: Object.freeze({
        "Fechar ×": "Close ×",
        "Selecionada": "Selected",
        "Disponível": "Available",
        "Obrigatória no tutorial": "Required in the tutorial",
        "{custo} créditos": "{custo} credits",
        "Vaga livre": "Empty slot",
        "Defesas para Waves infinitas": "Defenses for Endless Waves",
        "Escolha suas defesas": "Choose your defenses",
        "Iniciar Waves infinitas": "Start Endless Waves",
        "A Torre padrão é obrigatória na primeira partida para concluir o tutorial.": "The Standard Tower is required in your first game to complete the tutorial.",
        "Monte sua equipe antes da batalha. Você pode levar até 6 defesas, incluindo torres, suportes, minas e bombas.": "Build your team before battle. You can bring up to 6 defenses, including towers, supports, mines, and bombs.",
        "EQUIPE DA PARTIDA": "GAME LOADOUT",
        "{quantidade} de {limite} escolhidas": "{quantidade} of {limite} selected",
        "Defesas disponíveis": "Available defenses",
        "SUA EQUIPE": "YOUR TEAM",
        "6 vagas para a batalha": "6 slots for battle",
        "A Torre padrão precisa ficar na equipe durante o tutorial.": "The Standard Tower must stay on the team during the tutorial.",
        "Sua equipe já está completa. Retire uma defesa para escolher outra.": "Your team is already full. Remove a defense to choose another one.",
        "Escolha pelo menos uma defesa.": "Choose at least one defense.",
        "Caçador de Pixels": "Pixel Hunter",
        "Elimine inimigos em qualquer modo de jogo.": "Defeat enemies in any game mode.",
        "10 Fragmentos de Pixel": "10 Pixel Fragments",
        "Guardião da Campanha": "Campaign Guardian",
        "Conclua partidas da campanha normal.": "Complete normal campaign games.",
        "Skin Sentinela Dourada": "Golden Sentinel Skin",
        "Além do Limite": "Beyond the Limit",
        "Alcance a wave 40 em uma partida de Waves infinitas.": "Reach wave 40 in an Endless Waves game.",
        "Conquista Além do Limite": "Beyond the Limit Achievement",
        "Sentinela Dourada": "Golden Sentinel",
        "Uma pintura dourada exclusiva das missões semanais.": "An exclusive golden paint from weekly missions.",
        "Pacote Coração de Pixel": "Pixel Heart Pack",
        "Aurora Pixel": "Pixel Aurora",
        "Uma pintura neon exclusiva para a Torre padrão.": "An exclusive neon paint for the Standard Tower.",
        "Skin Aurora Pixel": "Pixel Aurora Skin",
        "Visual neon para todos os níveis da Torre padrão.": "A neon look for every Standard Tower level.",
        "Emblema Coração": "Heart Emblem",
        "Moldura especial no perfil do lobby.": "A special frame for the lobby profile.",
        "Selo Apoiador": "Supporter Badge",
        "Identificação permanente de quem ajudou o jogo.": "Permanent recognition for those who supported the game.",
        "Primeira Vigília": "First Watch",
        "Conclua sua primeira partida da campanha.": "Complete your first campaign game.",
        "Guardião dos Cinco Reinos": "Guardian of the Five Realms",
        "Conclua as cinco primeiras fases da campanha.": "Complete the first five campaign stages.",
        "Guardião de Todos os Reinos": "Guardian of All Realms",
        "Conclua todas as oito fases da campanha.": "Complete all eight campaign stages.",
        "???": "???",
        "Ainda está te esperando, sempre vai estar.": "It is still waiting for you. It always will be.",
        "Mestre do Arsenal": "Arsenal Master",
        "Compre todos os itens disponíveis na Loja.": "Buy every item available in the Shop.",
        "Lenda do Infinito": "Endless Legend",
        "Alcance a wave 100 no modo infinito.": "Reach wave 100 in endless mode.",
        "Caçador de Pixels Supremo": "Supreme Pixel Hunter",
        "Elimine 500 inimigos em qualquer modo.": "Defeat 500 enemies in any mode.",
        "Resgate a missão semanal da wave 40 infinita.": "Claim the weekly endless wave 40 mission.",
        "Fase 1": "Stage 1",
        "Fase 2": "Stage 2",
        "Fase 3": "Stage 3",
        "Fase 4": "Stage 4",
        "Fase 5": "Stage 5",
        "Fase 6": "Stage 6",
        "Fase 7": "Stage 7",
        "Fase 8": "Stage 8",
        "Fase 9": "Stage 9",
        "Campo verde": "Green Fields",
        "Deserto antigo": "Ancient Desert",
        "Tundra congelada": "Frozen Tundra",
        "Ruínas da Selva": "Jungle Ruins",
        "Bosque do Crepúsculo": "Twilight Grove",
        "Forja Vulcânica": "Volcanic Forge",
        "Pântano Tóxico": "Toxic Swamp",
        "Selva Primordial": "Primal Jungle",
        "Metrópole Neon": "Neon Metropolis",
        "Reserva de Créditos": "Credit Reserve",
        "Aumenta permanentemente os créditos disponíveis no começo de cada partida.": "Permanently increases the credits available at the start of every game.",
        "+50 créditos iniciais em todas as fases e no modo infinito": "+50 starting credits in every stage and endless mode",
        "Licença de Construção": "Building License",
        "Amplia permanentemente o espaço disponível para suas defesas.": "Permanently expands the space available for your defenses.",
        "+1 vaga no limite geral de torres de todas as fases": "+1 slot in the overall tower limit for every stage",
        "Recompensa Otimizada": "Optimized Reward",
        "Melhora permanentemente o pagamento recebido pelas torres de combate.": "Permanently improves the payment earned by combat towers.",
        "+2 créditos por disparo realizado pelas torres": "+2 credits for every shot fired by towers",
        "Torres": "Towers",
        "Defesas e estruturas especiais para levar às partidas.": "Special defenses and structures to bring into games.",
        "Minas": "Mines",
        "Explosivos de uso tático para controlar grupos de inimigos.": "Tactical explosives for controlling groups of enemies.",
        "Novos explosivos táticos chegarão em breve.": "New tactical explosives are coming soon.",
        "Melhorias": "Upgrades",
        "Aprimoramentos permanentes para fortalecer sua defesa.": "Permanent upgrades that strengthen your defense.",
        "Novos aprimoramentos permanentes chegarão em breve.": "New permanent upgrades are coming soon.",
        "Cadência rápida": "Rapid Fire",
        "Todas as torres atacam 10% mais rápido.": "All towers attack 10% faster.",
        "Suprimentos": "Supplies",
        "Receba 300 créditos imediatamente.": "Receive 300 credits immediately.",
        "Munição reforçada": "Reinforced Ammo",
        "Todas as torres causam 10% mais dano.": "All towers deal 10% more damage.",
        "Mira ampliada": "Extended Sight",
        "Todas as torres ganham 8% de alcance.": "All towers gain 8% range.",
        "Zigue-zague": "Zigzag",
        "Corredores": "Corridors",
        "Espelho": "Mirror",
        "Vermelho": "Red",
        "Roxo": "Purple",
        "Ciano rápido": "Fast Cyan",
        "Sabotador": "Saboteur",
        "Escorpião do deserto": "Desert Scorpion",
        "Múmia": "Mummy",
        "Lobo de Gelo": "Ice Wolf",
        "Yeti": "Yeti",
        "Macaco Saqueador": "Raider Monkey",
        "Onça da Selva": "Jungle Jaguar",
        "Gorila da Selva": "Jungle Gorilla",
        "Raposa Ladina": "Rogue Fox",
        "Javali Furioso": "Furious Boar",
        "Coruja Sombria": "Shadow Owl",
        "Morcego de Fogo": "Fire Bat",
        "Lagarto Vulcânico": "Volcanic Lizard",
        "Golem de Magma": "Magma Golem",
        "Fragmento de Magma": "Magma Fragment",
        "Titã de Obsidiana": "Obsidian Titan",
        "A carapaça do Titã se rompeu! Fragmentos de Magma foram liberados.": "The Titan's shell shattered! Magma Fragments were released.",
        "Mosquito do Brejo": "Swamp Mosquito",
        "Sapo Venenoso": "Poison Frog",
        "Guardião de Lodo": "Sludge Guardian",
        "Hidra do Pântano": "Swamp Hydra",
        "A Hidra despertou sua regeneração!": "The Hydra awakened its regeneration!",
        "Raptor Ancestral": "Ancient Raptor",
        "Besouro de Âmbar": "Amber Beetle",
        "Tricerátopo": "Triceratops",
        "Tirano Primordial": "Primal Tyrant",
        "O Tirano usou Chamado da Matilha!": "The Tyrant used Pack Call!",
        "Drone Caçador": "Hunter Drone",
        "Robô Reparador": "Repair Robot",
        "Sentinela de Escudo": "Shield Sentinel",
        "Protocolo Zero": "Protocol Zero",
        "Reversão de Emergência ativada!": "Emergency Reversal activated!",
        "Boss comum": "Common Boss",
        "Faraó de Areia": "Sand Pharaoh",
        "Titã Glacial": "Frost Titan",
        "Colosso da Selva": "Jungle Colossus",
        "Urso Ancestral": "Ancient Bear",
        "Primeiro": "First",
        "Último": "Last",
        "Aleatório": "Random",
        "{nome} deve ser comprada na Loja.": "{nome} must be purchased in the Shop.",
        "{nome} é desbloqueado ao concluir a Fase {fase}.": "{nome} is unlocked after completing Stage {fase}.",
        "Compre na Loja": "Buy in the Shop",
        "Conclua Fase {fase}": "Complete Stage {fase}",
        " · Lentidão {percentual}%": " · Slow {percentual}%",
        "Dano {dano} em {raio} px": "{dano} damage in {raio} px",
        " · Limite {limite} armadas": " · Limit {limite} armed",
        "Dano {dano} em {raio} px · Clique para detonar · Limite {limite}": "{dano} damage in {raio} px · Click to detonate · Limit {limite}",
        "Acelera torres em {percentual}% · Alcance {alcance} · Limite {limite}": "Speeds up towers by {percentual}% · Range {alcance} · Limit {limite}",
        "Carrega com {cargas} inimigos · Empurra {distancia} px · Limite {limite}": "Charges with {cargas} enemies · Pushes {distancia} px · Limit {limite}",
        "Produz {creditos} créditos por wave completa · Limite {limite}": "Produces {creditos} credits per full wave · Limit {limite}",
        "Dano {dano} · Queima {danoQueimadura}/s por {segundos}s · Alcance {alcance}": "Damage {dano} · Burns for {danoQueimadura}/s for {segundos}s · Range {alcance}",
        "Dano {dano} · Encadeia em {alvos} alvos · Alcance {alcance}": "Damage {dano} · Chains to {alvos} targets · Range {alcance}",
        "Resiste a {tiros} tiros · Limite {limite}": "Withstands {tiros} shots · Limit {limite}",
        "Dano {dano} em {raio} px · Alcance {alcance}": "{dano} damage in {raio} px · Range {alcance}",
        "Dano {dano} · Alcance {alcance}": "Damage {dano} · Range {alcance}",
        "No tutorial, escolha primeiro a Torre padrão.": "In the tutorial, choose the Standard Tower first.",
        "{nome} selecionado · {resumo}.": "{nome} selected · {resumo}.",
        "Proteja a torre-base": "Protect the base tower",
        "Os inimigos entram pelo começo do caminho e tentam chegar à sua torre-base. Sua missão é impedir que eles alcancem o final.": "Enemies enter at the start of the path and try to reach your base tower. Your mission is to stop them before they reach the end.",
        "Entendi": "Got it",
        "Escolha uma defesa": "Choose a defense",
        "Clique em Torre padrão na lista de Defesas. Ela custa 150 créditos e já está disponível na primeira fase.": "Click Standard Tower in the Defenses list. It costs 150 credits and is already available in the first stage.",
        "Construa fora do caminho": "Build away from the path",
        "Agora clique em um espaço livre do mapa, fora da estrada. As torres precisam ficar perto do caminho para alcançar os inimigos.": "Now click an empty spot on the map, away from the road. Towers must stay near the path to reach enemies.",
        "Selecione sua torre": "Select your tower",
        "Clique na Torre padrão que você acabou de construir. Assim você poderá ver seus atributos e comandos.": "Click the Standard Tower you just built. You will then see its stats and commands.",
        "Prepare a defesa": "Prepare the defense",
        "Na Central da torre você pode escolher a prioridade do alvo, melhorar a torre com créditos ou vendê-la. Agora libere os inimigos e sobreviva até a wave 20!": "In the Tower Hub you can choose target priority, upgrade the tower with credits, or sell it. Now release the enemies and survive through wave 20!",
        "Começar defesa": "Start defense",
        "Passo {passo} de {total}": "Step {passo} of {total}",
        "Continuar": "Continue",
        "Treinamento concluído. Defenda sua base!": "Training complete. Defend your base!",
        "Conclua ou pule o tutorial antes de usar este comando.": "Finish or skip the tutorial before using this command.",
        "Resgatada": "Claimed",
        "Resgatar prêmio": "Claim reward",
        "MISSÃO SEMANAL": "WEEKLY MISSION",
        "Progresso de {nome}": "Progress for {nome}",
        "Recompensas permanentes das missões": "Permanent mission rewards",
        "COLEÇÃO PERMANENTE": "PERMANENT COLLECTION",
        "Prêmios especiais": "Special rewards",
        "SKIN DE TORRE": "TOWER SKIN",
        "Usar visual original": "Use original look",
        "Equipar skin": "Equip skin",
        "Bloqueada": "Locked",
        "Complete objetivos, resgate prêmios e monte sua coleção.": "Complete objectives, claim rewards, and build your collection.",
        "SEMANA ATUAL": "CURRENT WEEK",
        "Semana {semana} de {ano}": "Week {semana} of {ano}",
        "Renova {data} à 0h": "Resets {data} at midnight",
        "Missões semanais": "Weekly missions",
        "Ativar demonstração": "Activate demo",
        "Ir para o checkout": "Go to checkout",
        "Checkout em preparação": "Checkout coming soon",
        "Ajude o projeto e receba cosméticos exclusivos, sem vantagem nas partidas.": "Support the project and receive exclusive cosmetics with no gameplay advantage.",
        "PACOTE ATIVO": "PACK ACTIVE",
        "COMPRA ÚNICA · SOMENTE COSMÉTICOS": "ONE-TIME PURCHASE · COSMETICS ONLY",
        "Um jeito de apoiar o desenvolvimento e mostrar que você fez parte da história do jogo.": "A way to support development and show that you were part of the game's story.",
        "Não aumenta dano, créditos, Fragmentos ou limite de torres.": "Does not increase damage, credits, Fragments, or tower limits.",
        "Conteúdo do Pacote Apoiador": "Supporter Pack contents",
        "DEMONSTRAÇÃO LOCAL": "LOCAL DEMO",
        "COMPRA SEGURA": "SECURE PURCHASE",
        "Obrigado por apoiar Guardians of Pixel!": "Thank you for supporting Guardians of Pixel!",
        "Liberação permanente neste navegador": "Permanent unlock in this browser",
        "Nenhuma cobrança será feita. O checkout real será conectado antes do lançamento.": "You will not be charged. The real checkout will be connected before release.",
        "O pacote será liberado depois da confirmação do pagamento.": "The pack will unlock after payment is confirmed.",
        "Equipar Aurora Pixel": "Equip Pixel Aurora",
        "CONQUISTA ESPECIAL": "SPECIAL ACHIEVEMENT",
        "MARCO PERMANENTE": "PERMANENT MILESTONE",
        "Desbloqueada": "Unlocked",
        "Complete desafios permanentes e revele todas as medalhas.": "Complete permanent challenges and reveal every medal.",
        "COLEÇÃO DE CONQUISTAS": "ACHIEVEMENT COLLECTION",
        "{desbloqueadas} de {total} desbloqueadas": "{desbloqueadas} of {total} unlocked",
        "Todas as conquistas": "All achievements",
        "Concluída": "Completed",
        "Disponível": "Available",
        "{descricao} · {waves} waves · Boss a cada {intervalo} waves": "{descricao} · {waves} waves · Boss every {intervalo} waves",
        "{descricao} · Conclua a Fase {fase} para desbloquear": "{descricao} · Complete Stage {fase} to unlock",
        "Selecionada": "Selected",
        "Selecionar": "Select",
        "Conclua todas as 20 waves de uma fase para liberar a próxima.": "Complete all 20 waves in a stage to unlock the next one.",
        "Fases": "Stages",
        "Seleção de fases": "Stage selection",
        "Capítulos": "Chapters",
        "Capítulo 1": "Chapter 1",
        "Capítulo 2": "Chapter 2",
        "Capítulo 3": "Chapter 3",
        "Escolha um capítulo para ver suas fases.": "Choose a chapter to view its stages.",
        "Seleção de capítulos": "Chapter selection",
        "Fases {inicio} a {fim}": "Stages {inicio} to {fim}",
        "{concluidas} de {total} fases concluídas": "{concluidas} of {total} stages completed",
        "Ver fases": "View stages",
        "Conclua o Capítulo {capitulo} para desbloquear": "Complete Chapter {capitulo} to unlock",
        "Complete todas as fases deste capítulo para liberar o próximo.": "Complete every stage in this chapter to unlock the next one.",
        "Voltar aos capítulos": "Back to chapters",
        "As Fases {inicio} a {fim} serão adicionadas em futuras atualizações.": "Stages {inicio} to {fim} will be added in future updates.",
        "Em desenvolvimento": "In development",
        "Dispara bolas de fogo e incendeia o alvo: {dano} de dano por segundo durante {segundos} segundos. Novos acertos renovam a duração.": "Fires fireballs and ignites the target for {dano} damage per second for {segundos} seconds. New hits refresh the duration.",
        "Dispara uma carga que salta entre até {quantidade} inimigos próximos e perde dano a cada salto.": "Fires a charge that jumps between up to {quantidade} nearby enemies and loses damage with each jump.",
        "Explode por contato, causa {dano} de dano em {raio} px e desacelera inimigos em {percentual}%.": "Explodes on contact, deals {dano} damage in {raio} px, and slows enemies by {percentual}%.",
        "Explode somente quando um inimigo encosta nela e causa {dano} de dano em uma área de {raio} px.": "Explodes only when an enemy touches it and deals {dano} damage in a {raio} px area.",
        "Clique na Bomba para acender o pavio. Após {segundos} segundo, ela causa {dano} de dano em uma área de {raio} px.": "Click the Bomb to light its fuse. After {segundos} second, it deals {dano} damage in a {raio} px area.",
        "Aumenta em {percentual}% a velocidade de ataque das torres dentro de {alcance} px. O bônus não acumula.": "Increases the attack speed of towers within {alcance} px by {percentual}%. The bonus does not stack.",
        "Produz {creditos} créditos ao concluir uma wave inteira. Precisa sobreviver até o fim para pagar.": "Produces {creditos} credits after completing a full wave. It must survive until the end to pay out.",
        "Atrai Sabotadores, Macacos e Corujas dentro do alcance deles. Aguenta {tiros} tiros e não atira.": "Draws Saboteurs, Monkeys, and Owls within their range. Withstands {tiros} shots and does not fire.",
        "Custa ${custo} na partida · máximo de {limite} no mapa · não ocupa vaga de torre": "Costs ${custo} in game · maximum {limite} on the map · uses no tower slot",
        "Custa ${custo} na partida · máximo de {limite} por partida": "Costs ${custo} in game · maximum {limite} per game",
        "Gerador produziu {creditos} créditos.": "Generator produced {creditos} credits.",
        "Comprada": "Purchased",
        "Comprar por {preco}◆": "Buy for {preco}◆",
        "Faltam {preco}◆": "Need {preco}◆",
        "{quantidade} item": "{quantidade} item",
        "{quantidade} itens": "{quantidade} items",
        "Em breve": "Coming soon",
        "EM BREVE": "COMING SOON",
        "Use Fragmentos de Pixel para liberar itens permanentemente.": "Use Pixel Fragments to unlock items permanently.",
        "Seu saldo": "Your balance",
        "SEU SALDO": "YOUR BALANCE",
        "{quantidade} Fragmentos de Pixel": "{quantidade} Pixel Fragments",
        "Categorias da Loja": "Shop categories",
        "Categorias do Álbum": "Album categories",
        "SEÇÃO ATUAL": "CURRENT SECTION",
        "Atira em torres | Destrói com {tiros} tiros": "Fires at towers | Destroys in {tiros} shots",
        "Exclusivo da Fase 2": "Exclusive to Stage 2",
        "Exclusiva da Fase 2": "Exclusive to Stage 2",
        "Exclusivo da Fase 3": "Exclusive to Stage 3",
        "Exclusivo da Fase 4 | Desacelera torres": "Exclusive to Stage 4 | Slows towers",
        "Exclusiva da Fase 4 | Dispara com 50% da vida": "Exclusive to Stage 4 | Dashes at 50% health",
        "Exclusivo da Fase 4": "Exclusive to Stage 4",
        "Exclusiva da Fase 5 | Muito rápida": "Exclusive to Stage 5 | Very fast",
        "Exclusivo da Fase 5 | Faz arrancadas": "Exclusive to Stage 5 | Charges forward",
        "Exclusiva da Fase 5 | Reduz o alcance das torres": "Exclusive to Stage 5 | Reduces tower range",
        "Exclusivo da Fase 6 | Muito rápido": "Exclusive to Stage 6 | Very fast",
        "Exclusivo da Fase 6": "Exclusive to Stage 6",
        "Criado pelo Titã de Obsidiana | Muito rápido": "Created by the Obsidian Titan | Very fast",
        "Exclusivo da Fase 1 | +{vida} de vida por aparição": "Exclusive to Stage 1 | +{vida} health per appearance",
        "Exclusivo da Fase 2 | +{vida} de vida por aparição": "Exclusive to Stage 2 | +{vida} health per appearance",
        "Exclusivo da Fase 3 | +{vida} de vida por aparição": "Exclusive to Stage 3 | +{vida} health per appearance",
        "Exclusivo da Fase 4 | +{vida} de vida por aparição": "Exclusive to Stage 4 | +{vida} health per appearance",
        "Exclusivo da Fase 5 | +{vida} de vida por aparição | Rugido atordoa torres próximas": "Exclusive to Stage 5 | +{vida} health per appearance | Roar stuns nearby towers",
        "Exclusivo da Fase 6 | Carapaça rompe com 50% de vida, acelera e libera fragmentos": "Exclusive to Stage 6 | Shell breaks at 50% health, speeds up, and releases fragments",
        "Exclusivo da Fase 7 | Muito rápido": "Exclusive to Stage 7 | Very fast",
        "Exclusivo da Fase 7": "Exclusive to Stage 7",
        "Exclusivo da Fase 7 | Regenera 40 de vida por segundo depois de alcançar 50%": "Exclusive to Stage 7 | Regenerates 40 health per second after reaching 50%",
        "Exclusivo da Fase 8 | Muito rápido": "Exclusive to Stage 8 | Very fast",
        "Exclusivo da Fase 8 | Reduz 20% do dano recebido": "Exclusive to Stage 8 | Reduces incoming damage by 20%",
        "Exclusivo da Fase 8 | Muita vida": "Exclusive to Stage 8 | High health",
        "Exclusivo da Fase 8 | Invoca 2 Raptors com 60% e 30% de vida": "Exclusive to Stage 8 | Summons 2 Raptors at 60% and 30% health",
        "Exclusivo da Fase 9 | Muito rápido e ainda mais veloz nos trilhos": "Exclusive to Stage 9 | Very fast and even faster on boost rails",
        "Exclusivo da Fase 9 | Restaura 45 de vida de um aliado próximo": "Exclusive to Stage 9 | Restores 45 health to a nearby ally",
        "Exclusivo da Fase 9 | Reduz 25% do dano recebido por aliados próximos": "Exclusive to Stage 9 | Reduces damage received by nearby allies by 25%",
        "Exclusivo da Fase 9 | Rebobina o caminho e recupera vida duas vezes": "Exclusive to Stage 9 | Rewinds the path and recovers health twice",
        "Habilidade temporal": "Time ability",
        "Pulso Temporal": "Time Pulse",
        "Pronto para usar": "Ready to use",
        "Tempo alterado · {segundos}s": "Time altered · {segundos}s",
        "Disponível na wave 1": "Available on wave 1",
        "Recarrega na wave {wave}": "Recharges on wave {wave}",
        "Pulso Temporal ativado!": "Time Pulse activated!",
        "Pulso Temporal desbloqueado! Ele estará disponível no posto lateral das próximas partidas.": "Time Pulse unlocked! It will be available in the side station during future games.",
        "TIRANO": "TYRANT",
        "Caminho Alto": "High Path",
        "Caminho Baixo": "Low Path",
        "Atalho do Tirano": "Tyrant's Shortcut",
        "CAMINHO VIVO": "LIVING PATH",
        "ROTA": "ROUTE",
        "ATALHO ABERTO": "SHORTCUT OPEN",
        "O {caminho} está ativo.": "The {caminho} is active.",
        "As raízes vão mudar: {caminho} na próxima wave.": "The roots will shift: {caminho} on the next wave.",
        "O Tirano rompeu as raízes: atalho aberto na próxima wave!": "The Tyrant broke through the roots: shortcut open on the next wave!",
        "PROTOCOLO ZERO": "PROTOCOL ZERO",
        "Rádio do Projeto Relógio encontrado!": "Clock Project radio found!",
        "OUVIR · PROJETO RELÓGIO": "LISTEN · CLOCK PROJECT",
        "Deixe espaço livre ao redor do rádio.": "Leave some clear space around the radio.",
        "TRANSMISSÃO 09 — REMETENTE DESCONHECIDO": "TRANSMISSION 09 — UNKNOWN SENDER",
        "Se alguém ainda recebe este sinal, procure o Projeto Relógio. Objetivo registrado: criar um guardião capaz de existir em todas as eras. Consciência temporal detectada. Preparando corpo para transferência... RESULTADO: ARQUIVO CORROMPIDO.": "If anyone still receives this signal, find the Clock Project. Recorded objective: create a guardian capable of existing in every era. Temporal consciousness detected. Preparing body for transfer... RESULT: CORRUPTED FILE.",
        "FREQUÊNCIA: PROJETO RELÓGIO": "FREQUENCY: CLOCK PROJECT",
        "Desligar rádio": "Turn off radio",
        "{quantidade} lasers de {dano} de dano · Alcance {alcance}": "{quantidade} lasers dealing {dano} damage · Range {alcance}",
        " | {quantidade} lasers por ataque": " | {quantidade} lasers per attack",
        "Álbum de Figurinhas": "Sticker Album",
        "Jogue para encontrar novas figurinhas e completar sua coleção.": "Play to find new stickers and complete your collection.",
        "{obtidas}/{total} figurinhas": "{obtidas}/{total} stickers",
        "PÁGINA DA COLEÇÃO": "COLLECTION PAGE",
        "{obtidas} de {total} figurinhas coladas": "{obtidas} of {total} stickers collected",
        "Nenhuma figurinha ainda": "No stickers yet",
        "Desbloqueie uma torre para colar uma nova figurinha aqui.": "Unlock a tower to add a new sticker here.",
        "Derrote um inimigo durante uma partida para colar a primeira figurinha.": "Defeat an enemy during a game to add your first sticker.",
        "Derrote um Boss para revelar e colar sua figurinha.": "Defeat a Boss to reveal and add its sticker.",
        "Compre uma mina ou bomba na Loja para adicioná-la ao Álbum.": "Buy a mine or bomb in the Shop to add it to the Album.",
        "Ganhe uma skin para adicioná-la à sua coleção.": "Earn a skin to add it to your collection.",
        "Somente torres desbloqueadas aparecem nesta página.": "Only unlocked towers appear on this page.",
        "Cada tipo é colado depois de ser derrotado pela primeira vez.": "Each type is added after you defeat it for the first time.",
        "Cada chefe é colado depois que você consegue derrotá-lo.": "Each boss is added after you manage to defeat it.",
        "Somente explosivos que você comprou aparecem nesta página.": "Only explosives you bought appear on this page.",
        "Somente visuais cosméticos que você já obteve aparecem aqui.": "Only cosmetic looks you have earned appear here.",
        "Explosivos": "Explosives",
        "Inimigos": "Enemies",
        "Bosses": "Bosses",
        "Skins": "Skins",
        "Defesas e estruturas em todos os níveis.": "Defenses and structures at every level.",
        "Unidades comuns e especiais de todas as fases.": "Common and special units from every stage.",
        "Chefes encontrados ao longo da campanha.": "Bosses encountered throughout the campaign.",
        "Explosivos de contato e detonação manual.": "Contact and manually detonated explosives.",
        "Visuais cosméticos da Torre padrão.": "Cosmetic looks for the Standard Tower.",
        "Visual original": "Original look",
        "Aparência padrão disponível para todos.": "The default look available to everyone.",
        "Disponível desde o início.": "Available from the beginning.",
        "Obtida em missão semanal.": "Earned from a weekly mission.",
        "Obtida no Pacote Apoiador.": "Included in the Supporter Pack.",
        "Equipada": "Equipped",
        " | Loja: {custo} fragmentos": " | Shop: {custo} fragments",
        " | Desbloqueio: conclua a Fase {fase}": " | Unlock: complete Stage {fase}",
        " | Dano em área: {raio} px": " | Area damage: {raio} px",
        " | Queimadura: {dano}/s durante {segundos}s": " | Burn: {dano}/s for {segundos}s",
        "Custo: {custo} | Dano em área: {dano} | Raio: {raio} px | Limite: {limite}": "Cost: {custo} | Area damage: {dano} | Radius: {raio} px | Limit: {limite}",
        " | Detonação manual": " | Manual detonation",
        " | Detonação por contato": " | Contact detonation",
        "Custo: {custo} | Cadência próxima: +{percentual}% | Alcance: {alcance} | Limite: {limite}": "Cost: {custo} | Nearby fire rate: +{percentual}% | Range: {alcance} | Limit: {limite}",
        "Custo: {custo} | Carga: {cargas} inimigos | Empurrão: {distancia} px | Limite: {limite}": "Cost: {custo} | Charge: {cargas} enemies | Push: {distancia} px | Limit: {limite}",
        "Custo: {custo} | Produção: {creditos} por wave | Limite: {limite}": "Cost: {custo} | Production: {creditos} per wave | Limit: {limite}",
        "Custo: {custo} | Resistência: {tiros} tiros | Limite: {limite}": "Cost: {custo} | Durability: {tiros} shots | Limit: {limite}",
        "Custo: {custo} | Dano: {dano} | Alcance: {alcance}": "Cost: {custo} | Damage: {dano} | Range: {alcance}",
        "{nome} · nível {nivel}": "{nome} · level {nivel}",
        "Melhoria: {custo} | Dano: {dano} | Alcance: {alcance}": "Upgrade: {custo} | Damage: {dano} | Range: {alcance}",
        "Melhoria: {custo} | Carga reduzida para {cargas} inimigos": "Upgrade: {custo} | Charge reduced to {cargas} enemies",
        "Melhoria: {custo} | Vulnerabilidade: +{percentual}% por {segundos}s": "Upgrade: {custo} | Vulnerability: +{percentual}% for {segundos}s",
        "Melhoria: {custo} | Segundo impacto após {segundos}s": "Upgrade: {custo} | Second impact after {segundos}s",
        "Melhoria: {custo} | Produção: {creditos} por wave": "Upgrade: {custo} | Production: {creditos} per wave",
        "Vida: {vida} | Velocidade: {velocidade}": "Health: {vida} | Speed: {velocidade}",
        "Aprenda o básico e pratique antes da primeira wave.": "Learn the basics and practice before the first wave.",
        "TREINAMENTO PARA INICIANTES": "BEGINNER TRAINING",
        "Defenda a torre-base": "Defend the base tower",
        "Construa torres perto do caminho e impeça que os inimigos cheguem ao final.": "Build towers near the path and stop enemies from reaching the end.",
        "Jogar tutorial": "Play tutorial",
        "Escolha uma defesa liberada na lista à direita. A Torre padrão custa 150 créditos.": "Choose an unlocked defense from the list on the right. The Standard Tower costs 150 credits.",
        "Clique fora do caminho para construir. Deixe a torre perto da estrada para alcançar os inimigos.": "Click away from the path to build. Keep the tower near the road so it can reach enemies.",
        "As torres atacam automaticamente e cada disparo rende {creditos} créditos.": "Towers attack automatically, and each shot earns {creditos} credits.",
        "Clique em uma torre construída para ver dano, alcance, melhoria, venda e prioridade de alvo.": "Click a built tower to view damage, range, upgrades, selling, and target priority.",
        "Use os créditos recebidos para construir ou melhorar. Cada torre pode chegar ao nível 3.": "Use earned credits to build or upgrade. Each tower can reach level 3.",
        "Não deixe nenhum inimigo chegar à torre-base. Conclua a wave {wave} para vencer a fase.": "Do not let any enemy reach the base tower. Complete wave {wave} to win the stage.",
        "{nome} selecionado.": "{nome} selected.",
        "{nome} nível {nivel} selecionado.": "{nome} level {nivel} selected.",
        "Selecione uma torre para melhorar.": "Select a tower to upgrade.",
        "Esta torre já está no nível máximo.": "This tower is already at maximum level.",
        "Dinheiro insuficiente para esta melhoria.": "Not enough credits for this upgrade.",
        "{nome} melhorado para o nível {nivel}.": "{nome} upgraded to level {nivel}.",
        "Selecione uma torre para vender.": "Select a tower to sell.",
        "Torre vendida por {valor}.": "Tower sold for {valor}.",
        "{nome} · Nível {nivel} · Carga {atual}/{total} · Empurra {distancia} px": "{nome} · Level {nivel} · Charge {atual}/{total} · Pushes {distancia} px",
        "{nome} · Nível {nivel} · Produção {creditos} créditos por wave": "{nome} · Level {nivel} · Production {creditos} credits per wave",
        "{nome} · Cadência próxima +{percentual}% · Alcance {alcance}": "{nome} · Nearby fire rate +{percentual}% · Range {alcance}",
        "{nome} · Resistência {atual}/{total} tiros": "{nome} · Durability {atual}/{total} shots",
        "{nome} · Dano {dano} em {raio} px · Alcance {alcance}": "{nome} · {dano} damage in {raio} px · Range {alcance}",
        "{nome} · Dano {dano} · Alcance {alcance}": "{nome} · Damage {dano} · Range {alcance}",
        "{nome} · Nível {nivel} · Dano {dano} em {raio} px · Alcance {alcance}": "{nome} · Level {nivel} · {dano} damage in {raio} px · Range {alcance}",
        "{nome} · Nível {nivel} · Dano {dano} · Alcance {alcance}": "{nome} · Level {nivel} · Damage {dano} · Range {alcance}",
        "Selecione uma torre no mapa": "Select a tower on the map",
        "Alvo: selecione uma torre": "Target: select a tower",
        "Suporte não atira": "Support does not fire",
        "Gerador não atira": "Generator does not fire",
        "Impacto automático": "Automatic impact",
        "Isca não atira": "Decoy does not fire",
        "Alvo: {modo}": "Target: {modo}",
        "Selecione uma torre para mudar o alvo.": "Select a tower to change its target.",
        "{nome} não possui modo de alvo.": "{nome} has no targeting mode.",
        "Prioridade de alvo: {modo}.": "Target priority: {modo}.",
        "Selecione uma torre": "Select a tower",
        "Torre no nível máximo": "Tower at maximum level",
        "Melhorar torre ({custo})": "Upgrade tower ({custo})",
        "Vender torre (+{valor})": "Sell tower (+{valor})",
        "Jogo pausado": "Game paused",
        "Desistir": "Give up",
        "Reiniciar fase": "Restart stage",
        "Boosts": "Boosts",
        "Partida atual": "Current game",
        "Derrote um Boss para escolher seu primeiro boost.": "Defeat a Boss to choose your first boost.",
        "Temporário": "Temporary",
        "Aguardando evento": "Waiting for event",
        "Defesas": "Defenses",
        "Torres e explosivos": "Towers and explosives",
        "Central da torre": "Tower Hub",
        "Treinamento GP": "GP Training",
        "Pular tutorial": "Skip tutorial",
        "Partida pausada": "Game paused",
        "Tem certeza que quer desistir?": "Are you sure you want to give up?",
        "Nunca!": "No way!",
        "Resultado da batalha": "Battle result",
        "Voltar ao menu": "Back to menu",
        "Próxima fase": "Next stage",
        "Boss derrotado": "Boss defeated",
        "Escolha um bônus": "Choose a bonus",
        "A recompensa escolhida permanece ativa até o fim da partida.": "The chosen reward remains active until the game ends.",
        "-{percentual}% intervalo": "-{percentual}% interval",
        "+{creditos} créditos": "+{creditos} credits",
        "dano": "damage",
        "alcance": "range",
        "Bônus escolhido: {nome}.": "Bonus chosen: {nome}.",
        "Um fliperama apareceu no mapa!": "An arcade machine appeared on the map!",
        "Labirinto Pixel": "Pixel Maze",
        "Mapa {mapa}: leve o robô até a saída sem tocar nas paredes.": "Map {mapa}: guide the robot to the exit without touching the walls.",
        "Mapa": "Map",
        "Use WASD ou as setas. Encostar na parede leva o robô de volta ao início.": "Use WASD or the arrow keys. Touching a wall sends the robot back to the start.",
        "Labirinto controlado pelas teclas WASD ou setas": "Maze controlled with WASD or arrow keys",
        "Use WASD, as setas ou o direcional da tela. Encostar na parede leva o robô de volta ao início.": "Use WASD, the arrow keys, or the on-screen directional pad. Touching a wall sends the robot back to the start.",
        "Labirinto controlado por teclado ou toque": "Maze controlled by keyboard or touch",
        "Controles de movimento do labirinto": "Maze movement controls",
        "Mover para cima": "Move up",
        "Mover para a esquerda": "Move left",
        "Mover para baixo": "Move down",
        "Mover para a direita": "Move right",
        "Tiro ao alvo": "Target Practice",
        "Acerte o alvo móvel {alvos} vezes antes que o tempo termine.": "Hit the moving target {alvos} times before time runs out.",
        "Acertos": "Hits",
        "Acompanhe o alvo: ele se move livremente e rebate nas bordas.": "Track the target: it moves freely and bounces off the edges.",
        "Área do minigame com alvo móvel": "Minigame area with a moving target",
        "Labirinto concluído! Torres com +{percentual}% de dano por {segundos} segundos.": "Maze complete! Towers gain +{percentual}% damage for {segundos} seconds.",
        "Tiro ao alvo concluído! Torres aceleradas por {segundos} segundos.": "Target practice complete! Towers attack faster for {segundos} seconds.",
        "Tempo esgotado no fliperama.": "Time ran out in the arcade.",
        "O boost do fliperama terminou.": "The arcade boost has ended.",
        "FASE {fase} · {waves} WAVES CONCLUÍDAS": "STAGE {fase} · {waves} WAVES COMPLETED",
        "SUA BASE FOI INVADIDA": "YOUR BASE WAS OVERRUN",
        "VITÓRIA": "VICTORY",
        "A Fase {fase} foi desbloqueada. Escolha seu próximo destino.": "Stage {fase} has been unlocked. Choose your next destination.",
        "Todas as fases disponíveis foram concluídas.": "All available stages have been completed.",
        "Fase concluída. Você pode repeti-la ou seguir em frente.": "Stage complete. You can replay it or move forward.",
        "Um inimigo alcançou sua base. Reorganize sua defesa e tente novamente.": "An enemy reached your base. Reorganize your defense and try again.",
        "Fragmento de Pixel": "Pixel Fragment",
        "Fragmentos de Pixel": "Pixel Fragments",
        " Você recebeu {quantidade} {moeda} pelas waves alcançadas.": " You received {quantidade} {moeda} for the waves reached.",
        "Repetir fase": "Replay stage",
        "Recomeçar fase": "Restart stage",
        "Fase {fase} reiniciada.": "Stage {fase} restarted.",
        "Fase {fase} iniciada.": "Stage {fase} started.",
        "wave": "wave",
        "waves": "waves",
        "As {wave} {textoWave} que você alcançou vão te dar {recompensa} {fragmentos} no total.": "Reaching {wave} {textoWave} will give you {recompensa} {fragmentos} in total.",
        "Fechar menu da partida (Esc)": "Close game menu (Esc)",
        "Abrir menu da partida (Esc)": "Open game menu (Esc)",
        "Conclua ou pule o tutorial antes de abrir o menu.": "Finish or skip the tutorial before opening the menu.",
        "Siga a instrução do treinamento para continuar.": "Follow the training instruction to continue.",
        "Clique na Torre padrão que você acabou de construir.": "Click the Standard Tower you just built.",
        "Mina armada · {dano} de dano em {raio} px.": "Armed mine · {dano} damage in {raio} px.",
        "Pavio aceso · explosão em {segundos}s.": "Fuse lit · explosion in {segundos}s.",
        "Pavio aceso! A Bomba Pesada explode em {segundos} segundo.": "Fuse lit! The Heavy Bomb explodes in {segundos} second.",
        "A {nome} só pode ser colocada no caminho.": "The {nome} can only be placed on the path.",
        "Não é possível colocar torres no caminho.": "Towers cannot be placed on the path.",
        "Deixe espaço livre ao redor do fliperama.": "Leave free space around the arcade machine.",
        "Limite de {limite} {nome} por partida.": "Limit of {limite} {nome} per game.",
        "Dinheiro insuficiente para construir {nome}.": "Not enough credits to build {nome}.",
        "Você já atingiu o limite de torres.": "You have reached the tower limit.",
        "Não coloque minas muito perto umas das outras.": "Do not place mines too close together.",
        "Não coloque Bombas Pesadas muito perto umas das outras.": "Do not place Heavy Bombs too close together.",
        "Não coloque esta defesa muito perto de torres ou Bombas Pesadas.": "Do not place this defense too close to towers or Heavy Bombs.",
        "Bomba posicionada · clique nela para acender o pavio · {quantidade}/{limite} no mapa.": "Bomb placed · click it to light the fuse · {quantidade}/{limite} on the map.",
        "Mina armada · {quantidade}/{limite} no mapa.": "Mine armed · {quantidade}/{limite} on the map.",
        "Inimigo": "Enemy",
        "{inimigo} destruiu {torre}!": "{inimigo} destroyed {torre}!",
        "BASE": "BASE",
        "FASE {fase} · INFINITO": "STAGE {fase} · ENDLESS",
        "FASE {fase} · WAVE": "STAGE {fase} · WAVE",
        "CRÉDITOS": "CREDITS",
        "TORRES": "TOWERS",
        "Dano {dano} · área {raio} px · encoste para explodir": "Damage {dano} · {raio} px area · contact to explode",
        "Dano {dano} · área {raio} px · clique para acender": "Damage {dano} · {raio} px area · click to light",
        "+{percentual}% de cadência próxima": "+{percentual}% nearby fire rate",
        "Atrai inimigos atiradores": "Draws ranged enemies",
        "Cada tiro  +{creditos}": "Each shot  +{creditos}",
        "Carga com {cargas} inimigos · Empurra {distancia} px": "Charges with {cargas} enemies · Pushes {distancia} px",
        "Produz {creditos} por wave completa": "Produces {creditos} per full wave",
        "Queima {dano}/s por {segundos}s": "Burns for {dano}/s for {segundos}s",
        "TORRE SELECIONADA": "SELECTED TOWER",
        "GERADOR ATIVO": "ACTIVE GENERATOR",
        "CARGA SÍSMICA": "SEISMIC CHARGE",
        "SUPORTE ATIVO": "ACTIVE SUPPORT",
        "ISCA DEFENSIVA": "DEFENSIVE DECOY",
        "Nível {nivel}/3": "Level {nivel}/3",
        "Cadência próxima +{percentual}%  •  Alcance {alcance}": "Nearby fire rate +{percentual}%  •  Range {alcance}",
        "Produção +{creditos} por wave completa": "Production +{creditos} per full wave",
        "Carga {atual}/{total}  •  Empurra {distancia} px": "Charge {atual}/{total}  •  Pushes {distancia} px",
        "Resistência {atual}/{total} tiros": "Durability {atual}/{total} shots",
        "Dano {dano}  •  Alcance {alcance}": "Damage {dano}  •  Range {alcance}",
        "Dano {dano}  •  Queima {danoQueimadura}/s por {segundos}s": "Damage {dano}  •  Burns for {danoQueimadura}/s for {segundos}s",
        "Vida {atual} / {maxima}": "Health {atual} / {maxima}",
        "CLIQUE · {segundos}s": "CLICK · {segundos}s",
        "URSO": "BEAR",
        "OBSIDIANO": "OBSIDIAN",
        "HIDRA": "HYDRA",
        "COLOSSO": "COLOSSUS",
        "FARAÓ": "PHARAOH",
        "TITÃ": "TITAN",
        "BOSS": "BOSS",
        "ALGO ESTÁ VINDO...": "SOMETHING IS COMING...",
        "Menu da partida": "Game menu",
        "Boosts da partida": "Game boosts",
        "Boost temporário": "Temporary boost",
        "Mapa do jogo Guardians of Pixel": "Guardians of Pixel game map",
        "Defesas disponíveis": "Available defenses",
        "Controles da partida": "Game controls",
        "Evento especial": "Special event",
        "Tempo": "Time",
        "Alternar entre primeiro, último e aleatório": "Switch between first, last, and random",
        "Torre padrão": "Standard Tower",
        "Canhão pesado": "Heavy Cannon",
        "Torre Glacial": "Frost Tower",
        "Torre Besta": "Crossbow Tower",
        "Torre de Esporos": "Spore Tower",
        "Obliterador": "Obliterator",
        "Torre Sísmica": "Seismic Tower",
        "Isca Blindada": "Armored Decoy",
        "Amplificador Pixel": "Pixel Amplifier",
        "Gerador de Créditos": "Credit Generator",
        "Torre de Raios": "Lightning Tower",
        "Lança-Chamas": "Flamethrower",
        "Mina Terrestre": "Land Mine",
        "Mina Congelante": "Frost Mine",
        "Bomba Pesada": "Heavy Bomb",
        "Dimensão Glitch": "Glitch Dimension",
        "Uma cópia quebrada do mundo, escondida atrás da árvore da Fase 1.": "A broken copy of the world, hidden behind the Stage 1 tree.",
        "Senhor do Tempo": "Lord of Time",
        "Senhor do Tempo — Forma Humana": "Lord of Time — Human Form",
        "Conceito futuro: retrato humano alto de meio-corpo, com terno, gravata, cabeça de relógio e uma mão no bolso.": "Future concept: a tall waist-up human portrait with a suit, tie, clock head, and one hand in his pocket.",
        "SINAL CORROMPIDO": "CORRUPTED SIGNAL",
        "A realidade está falhando...": "Reality is breaking...",
        "SINAL DESVIADO": "SIGNAL DIVERTED",
        "Corredores Amarelos": "Yellow Corridors",
        "Você não deveria estar aqui. Encontre a saída.": "You should not be here. Find the exit.",
        "Use WASD, as setas ou o direcional para escapar.": "Use WASD, the arrow keys, or the directional pad to escape.",
        "Labirinto amarelo controlado por teclado ou toque": "Yellow maze controlled by keyboard or touch",
        "Controles de movimento dos corredores": "Corridor movement controls",
        "ONDE EU ESTOU?": "WHERE AM I?",
        "SAÍDA": "EXIT",
        "Entrar no portal corrompido": "Enter the corrupted portal",
        "O tempo observa do outro lado...": "Time watches from the other side...",
        "ENTIDADE DA FALHA": "BREACH ENTITY",
        "Era eu quem falava com você através do portal.": "I was the one speaking to you through the portal.",
        "Meu nome é Senhor do Tempo.": "My name is the Lord of Time.",
        "Você não tem escolha.": "You have no choice.",
        "Se quiser sair, vai ter que sair vitorioso daqui.": "If you want to leave, you will have to emerge victorious from here.",
        "Supere as 20 waves e eu abrirei o caminho de volta.": "Survive all 20 waves and I will open the way back.",
        "Serei generoso com você. Afinal, poucas pessoas chegam até aqui. Darei 300 créditos a mais para você começar. Mas depois disso você pensa que acabou? Ainda não.": "I will be generous with you. After all, few people make it this far. I will give you 300 extra credits to start. But after that, do you think it is over? Not yet.",
        "Agora lute. O tempo já começou a correr.": "Now fight. Time has already begun to run.",
        "Enfrentar a Dimensão": "Face the Dimension",
        "Conclua a Fase 6 para despertar o portal.": "Complete Stage 6 to awaken the portal.",
        "VOCÊ ENCONTROU UMA CARTA": "YOU FOUND A LETTER",
        "Você está pronto. Algo estará lhe esperando no lobby da Fase 1, entre as árvores. Venha ver meu desafio.": "You are ready. Something will be waiting for you in the Stage 1 lobby, among the trees. Come and face my challenge.",
        "Guardar carta": "Keep letter",
        "Você venceu o desafio. Como recompensa, deixei uma Máquina do Tempo para você no Capítulo 2. Sua próxima passagem está em uma época anterior ao pântano.": "You conquered the challenge. As a reward, I left a Time Machine for you in Chapter 2. Your next passage lies in an era before the swamp.",
        "Receber Máquina do Tempo": "Claim Time Machine",
        "Máquina do Tempo": "Time Machine",
        "NOVO": "NEW",
        "Escolha uma época para procurar as fases do Capítulo 2.": "Choose an era to search for Chapter 2 stages.",
        "Passado": "Past",
        "Presente": "Present",
        "Futuro": "Future",
        "Ruínas inteiras e perigos que o presente esqueceu.": "Intact ruins and dangers forgotten by the present.",
        "O ponto de partida da sua jornada pelo tempo.": "The starting point of your journey through time.",
        "Caminhos instáveis que ainda não deveriam existir.": "Unstable paths that should not exist yet.",
        "ÉPOCA ATUAL": "CURRENT ERA",
        "Viajar para {epoca}": "Travel to {epoca}",
        "Capítulo 2 · {epoca}": "Chapter 2 · {epoca}",
        "Nenhuma fase disponível nesta época.": "No stage is available in this era.",
        "Tente outra época ou volte mais tarde.": "Try another era or return later.",
        "Parabéns. Você conseguiu.": "Congratulations. You made it.",
        "Poucas pessoas passam por este desafio.": "Few people make it through this challenge.",
        "Então eu estou livre?": "So am I free?",
        "Livre para continuar. Mas sua jornada está longe de terminar.": "Free to continue. But your journey is far from over.",
        "O que você quer dizer?": "What do you mean?",
        "Eu abri um novo caminho. O Capítulo 2 espera por você.": "I have opened a new path. Chapter 2 awaits you.",
        "Considere isso uma recompensa... e um aviso. Ainda não acabou.": "Consider this a reward... and a warning. It is not over yet.",
        "CONVERSA FINAL": "FINAL CONVERSATION",
        "Revelar Capítulo 2": "Reveal Chapter 2",
        "CAMINHO LIBERADO": "PATH UNLOCKED",
        "Fases 7 a 12": "Stages 7 to 12",
        "NOVO CAPÍTULO DESBLOQUEADO": "NEW CHAPTER UNLOCKED",
        "Vença a Dimensão Glitch para desbloquear": "Defeat the Glitch Dimension to unlock",
        "Saída bloqueada": "Exit locked",
        "O Senhor do Tempo só abrirá a saída depois da vitória.": "The Lord of Time will only open the exit after victory.",
        "A derrota não abriu a saída. O Senhor do Tempo exige uma vitória.": "Defeat did not open the exit. The Lord of Time demands a victory.",
        "Pixel Corrompido": "Corrupted Pixel",
        "Erro Veloz": "Speed Error",
        "Bloco Instável": "Unstable Block",
        "Núcleo Glitch": "Glitch Core",
        "Abrir portal da fase secreta": "Open secret stage portal",
        "Brilho estranho atrás da árvore": "Strange glow behind the tree",
        "Portal descoberto": "Portal discovered",
        "Algo está estranho aqui...": "Something is strange here...",
        "Ouvir o portal corrompido": "Listen to the corrupted portal",
        "Uma voz espera do outro lado...": "A voice waits on the other side...",
        "O portal responde": "The portal answers",
        "Alguma coisa falou do outro lado.": "Something spoke from the other side.",
        "TRANSMISSÃO DESCONHECIDA": "UNKNOWN TRANSMISSION",
        "Ainda não...": "Not yet...",
        "Como assim?": "What do you mean?",
        "O quê?": "What?",
        "Quem é você?": "Who are you?",
        "Volte quando você estiver pronto.": "Come back when you are ready.",
        "Você": "You",
        "Responder à voz do portal": "Answer the voice from the portal",
        "Encerrar conversa": "End conversation",
        "Sinal encontrado": "Signal found",
        "Esta fase não aparece no seletor comum e só pode ser aberta por este portal.": "This stage does not appear in the regular selector and can only be opened through this portal.",
        "FASE SECRETA DESCOBERTA": "SECRET STAGE DISCOVERED",
        "Sobreviva a 20 waves de inimigos corrompidos para fechar a falha.": "Survive 20 waves of corrupted enemies to close the breach.",
        "Entrar na Dimensão Glitch": "Enter the Glitch Dimension",
        "Fase secreta · Wave 1": "Secret stage · Wave 1",
        "FASE SECRETA · WAVE": "SECRET STAGE · WAVE",
        "FASE SECRETA · {waves} WAVES CONCLUÍDAS": "SECRET STAGE · {waves} WAVES COMPLETE",
        "A falha foi contida. O portal continuará escondido atrás da árvore da Fase 1.": "The breach was contained. The portal will remain hidden behind the Stage 1 tree.",
        "A falha foi contida e o caminho para o Capítulo 2 está aberto.": "The breach was contained and the path to Chapter 2 is open.",
        "Dimensão Glitch reiniciada.": "Glitch Dimension restarted.",
        "Encontrado na fase secreta | Textura quebrada": "Found in the secret stage | Broken texture",
        "Encontrado na fase secreta | Muito rápido": "Found in the secret stage | Very fast",
        "Encontrado na fase secreta | Muita vida": "Found in the secret stage | High health",
        "Boss da fase secreta | Fica mais forte a cada aparição": "Secret stage boss | Gets stronger with each appearance",
        "ERRO": "ERROR"
    }),
    es: Object.freeze({
        "Fechar ×": "Cerrar ×",
        "Selecionada": "Seleccionada",
        "Disponível": "Disponible",
        "Obrigatória no tutorial": "Obligatoria en el tutorial",
        "{custo} créditos": "{custo} créditos",
        "Vaga livre": "Espacio libre",
        "Defesas para Waves infinitas": "Defensas para Oleadas infinitas",
        "Escolha suas defesas": "Elige tus defensas",
        "Iniciar Waves infinitas": "Iniciar Oleadas infinitas",
        "A Torre padrão é obrigatória na primeira partida para concluir o tutorial.": "La Torre estándar es obligatoria en tu primera partida para completar el tutorial.",
        "Monte sua equipe antes da batalha. Você pode levar até 6 defesas, incluindo torres, suportes, minas e bombas.": "Prepara tu equipo antes de la batalla. Puedes llevar hasta 6 defensas, incluidas torres, apoyos, minas y bombas.",
        "EQUIPE DA PARTIDA": "EQUIPO DE LA PARTIDA",
        "{quantidade} de {limite} escolhidas": "{quantidade} de {limite} elegidas",
        "Defesas disponíveis": "Defensas disponibles",
        "SUA EQUIPE": "TU EQUIPO",
        "6 vagas para a batalha": "6 espacios para la batalla",
        "A Torre padrão precisa ficar na equipe durante o tutorial.": "La Torre estándar debe permanecer en el equipo durante el tutorial.",
        "Sua equipe já está completa. Retire uma defesa para escolher outra.": "Tu equipo ya está completo. Retira una defensa para elegir otra.",
        "Escolha pelo menos uma defesa.": "Elige al menos una defensa.",
        "Caçador de Pixels": "Cazador de Píxeles",
        "Elimine inimigos em qualquer modo de jogo.": "Elimina enemigos en cualquier modo de juego.",
        "10 Fragmentos de Pixel": "10 Fragmentos de Píxel",
        "Guardião da Campanha": "Guardián de la Campaña",
        "Conclua partidas da campanha normal.": "Completa partidas de la campaña normal.",
        "Skin Sentinela Dourada": "Skin Centinela Dorada",
        "Além do Limite": "Más Allá del Límite",
        "Alcance a wave 40 em uma partida de Waves infinitas.": "Alcanza la oleada 40 en una partida de Oleadas infinitas.",
        "Conquista Além do Limite": "Logro Más Allá del Límite",
        "Sentinela Dourada": "Centinela Dorada",
        "Uma pintura dourada exclusiva das missões semanais.": "Una pintura dorada exclusiva de las misiones semanales.",
        "Pacote Coração de Pixel": "Paquete Corazón de Píxel",
        "Aurora Pixel": "Aurora Píxel",
        "Uma pintura neon exclusiva para a Torre padrão.": "Una pintura neón exclusiva para la Torre estándar.",
        "Skin Aurora Pixel": "Skin Aurora Píxel",
        "Visual neon para todos os níveis da Torre padrão.": "Un aspecto neón para todos los niveles de la Torre estándar.",
        "Emblema Coração": "Emblema Corazón",
        "Moldura especial no perfil do lobby.": "Un marco especial para el perfil del lobby.",
        "Selo Apoiador": "Insignia de Colaborador",
        "Identificação permanente de quem ajudou o jogo.": "Reconocimiento permanente para quienes apoyaron el juego.",
        "Primeira Vigília": "Primera Guardia",
        "Conclua sua primeira partida da campanha.": "Completa tu primera partida de la campaña.",
        "Guardião dos Cinco Reinos": "Guardián de los Cinco Reinos",
        "Conclua as cinco primeiras fases da campanha.": "Completa las primeras cinco fases de la campaña.",
        "Guardião de Todos os Reinos": "Guardián de Todos los Reinos",
        "Conclua todas as oito fases da campanha.": "Completa las ocho fases de la campaña.",
        "???": "???",
        "Ainda está te esperando, sempre vai estar.": "Todavía te está esperando, siempre lo estará.",
        "Mestre do Arsenal": "Maestro del Arsenal",
        "Compre todos os itens disponíveis na Loja.": "Compra todos los objetos disponibles en la Tienda.",
        "Lenda do Infinito": "Leyenda del Infinito",
        "Alcance a wave 100 no modo infinito.": "Alcanza la oleada 100 en el modo infinito.",
        "Caçador de Pixels Supremo": "Cazador de Píxeles Supremo",
        "Elimine 500 inimigos em qualquer modo.": "Elimina 500 enemigos en cualquier modo.",
        "Resgate a missão semanal da wave 40 infinita.": "Reclama la misión semanal de la oleada infinita 40.",
        "Fase 1": "Fase 1",
        "Fase 2": "Fase 2",
        "Fase 3": "Fase 3",
        "Fase 4": "Fase 4",
        "Fase 5": "Fase 5",
        "Fase 6": "Fase 6",
        "Fase 7": "Fase 7",
        "Fase 8": "Fase 8",
        "Fase 9": "Fase 9",
        "Campo verde": "Campos Verdes",
        "Deserto antigo": "Desierto Antiguo",
        "Tundra congelada": "Tundra Helada",
        "Ruínas da Selva": "Ruinas de la Selva",
        "Bosque do Crepúsculo": "Bosque del Crepúsculo",
        "Forja Vulcânica": "Forja Volcánica",
        "Pântano Tóxico": "Pantano Tóxico",
        "Selva Primordial": "Selva Primordial",
        "Metrópole Neon": "Metrópolis Neón",
        "Reserva de Créditos": "Reserva de Créditos",
        "Aumenta permanentemente os créditos disponíveis no começo de cada partida.": "Aumenta permanentemente los créditos disponibles al comienzo de cada partida.",
        "+50 créditos iniciais em todas as fases e no modo infinito": "+50 créditos iniciales en todas las fases y en el modo infinito",
        "Licença de Construção": "Licencia de Construcción",
        "Amplia permanentemente o espaço disponível para suas defesas.": "Amplía permanentemente el espacio disponible para tus defensas.",
        "+1 vaga no limite geral de torres de todas as fases": "+1 espacio en el límite general de torres de todas las fases",
        "Recompensa Otimizada": "Recompensa Optimizada",
        "Melhora permanentemente o pagamento recebido pelas torres de combate.": "Mejora permanentemente el pago recibido por las torres de combate.",
        "+2 créditos por disparo realizado pelas torres": "+2 créditos por cada disparo de las torres",
        "Torres": "Torres",
        "Defesas e estruturas especiais para levar às partidas.": "Defensas y estructuras especiales para llevar a las partidas.",
        "Minas": "Minas",
        "Explosivos de uso tático para controlar grupos de inimigos.": "Explosivos tácticos para controlar grupos de enemigos.",
        "Novos explosivos táticos chegarão em breve.": "Pronto llegarán nuevos explosivos tácticos.",
        "Melhorias": "Mejoras",
        "Aprimoramentos permanentes para fortalecer sua defesa.": "Mejoras permanentes para fortalecer tu defensa.",
        "Novos aprimoramentos permanentes chegarão em breve.": "Pronto llegarán nuevas mejoras permanentes.",
        "Cadência rápida": "Cadencia Rápida",
        "Todas as torres atacam 10% mais rápido.": "Todas las torres atacan un 10% más rápido.",
        "Suprimentos": "Suministros",
        "Receba 300 créditos imediatamente.": "Recibe 300 créditos inmediatamente.",
        "Munição reforçada": "Munición Reforzada",
        "Todas as torres causam 10% mais dano.": "Todas las torres causan un 10% más de daño.",
        "Mira ampliada": "Mira Ampliada",
        "Todas as torres ganham 8% de alcance.": "Todas las torres obtienen un 8% más de alcance.",
        "Zigue-zague": "Zigzag",
        "Corredores": "Corredores",
        "Espelho": "Espejo",
        "Vermelho": "Rojo",
        "Roxo": "Morado",
        "Ciano rápido": "Cian Rápido",
        "Sabotador": "Saboteador",
        "Escorpião do deserto": "Escorpión del Desierto",
        "Múmia": "Momia",
        "Lobo de Gelo": "Lobo de Hielo",
        "Yeti": "Yeti",
        "Macaco Saqueador": "Mono Saqueador",
        "Onça da Selva": "Jaguar de la Selva",
        "Gorila da Selva": "Gorila de la Selva",
        "Raposa Ladina": "Zorra Ladina",
        "Javali Furioso": "Jabalí Furioso",
        "Coruja Sombria": "Búho Sombrío",
        "Morcego de Fogo": "Murciélago de Fuego",
        "Lagarto Vulcânico": "Lagarto Volcánico",
        "Golem de Magma": "Gólem de Magma",
        "Fragmento de Magma": "Fragmento de Magma",
        "Titã de Obsidiana": "Titán de Obsidiana",
        "A carapaça do Titã se rompeu! Fragmentos de Magma foram liberados.": "¡El caparazón del Titán se rompió! Se liberaron Fragmentos de Magma.",
        "Mosquito do Brejo": "Mosquito del Pantano",
        "Sapo Venenoso": "Sapo Venenoso",
        "Guardião de Lodo": "Guardián de Lodo",
        "Hidra do Pântano": "Hidra del Pantano",
        "A Hidra despertou sua regeneração!": "¡La Hidra despertó su regeneración!",
        "Raptor Ancestral": "Raptor Ancestral",
        "Besouro de Âmbar": "Escarabajo de Ámbar",
        "Tricerátopo": "Tricerátops",
        "Tirano Primordial": "Tirano Primordial",
        "O Tirano usou Chamado da Matilha!": "¡El Tirano usó Llamada de la Manada!",
        "Drone Caçador": "Dron Cazador",
        "Robô Reparador": "Robot Reparador",
        "Sentinela de Escudo": "Centinela de Escudo",
        "Protocolo Zero": "Protocolo Cero",
        "Reversão de Emergência ativada!": "¡Reversión de Emergencia activada!",
        "Boss comum": "Jefe Común",
        "Faraó de Areia": "Faraón de Arena",
        "Titã Glacial": "Titán Glacial",
        "Colosso da Selva": "Coloso de la Selva",
        "Urso Ancestral": "Oso Ancestral",
        "Primeiro": "Primero",
        "Último": "Último",
        "Aleatório": "Aleatorio",
        "{nome} deve ser comprada na Loja.": "Debes comprar {nome} en la Tienda.",
        "{nome} é desbloqueado ao concluir a Fase {fase}.": "{nome} se desbloquea al completar la Fase {fase}.",
        "Compre na Loja": "Compra en la Tienda",
        "Conclua Fase {fase}": "Completa la Fase {fase}",
        " · Lentidão {percentual}%": " · Ralentización {percentual}%",
        "Dano {dano} em {raio} px": "{dano} de daño en {raio} px",
        " · Limite {limite} armadas": " · Límite {limite} armadas",
        "Dano {dano} em {raio} px · Clique para detonar · Limite {limite}": "{dano} de daño en {raio} px · Haz clic para detonar · Límite {limite}",
        "Acelera torres em {percentual}% · Alcance {alcance} · Limite {limite}": "Acelera las torres un {percentual}% · Alcance {alcance} · Límite {limite}",
        "Carrega com {cargas} inimigos · Empurra {distancia} px · Limite {limite}": "Carga con {cargas} enemigos · Empuja {distancia} px · Límite {limite}",
        "Produz {creditos} créditos por wave completa · Limite {limite}": "Produce {creditos} créditos por oleada completa · Límite {limite}",
        "Dano {dano} · Queima {danoQueimadura}/s por {segundos}s · Alcance {alcance}": "Daño {dano} · Quema {danoQueimadura}/s durante {segundos}s · Alcance {alcance}",
        "Dano {dano} · Encadeia em {alvos} alvos · Alcance {alcance}": "Daño {dano} · Encadena a {alvos} objetivos · Alcance {alcance}",
        "Resiste a {tiros} tiros · Limite {limite}": "Resiste {tiros} disparos · Límite {limite}",
        "Dano {dano} em {raio} px · Alcance {alcance}": "{dano} de daño en {raio} px · Alcance {alcance}",
        "Dano {dano} · Alcance {alcance}": "Daño {dano} · Alcance {alcance}",
        "No tutorial, escolha primeiro a Torre padrão.": "En el tutorial, elige primero la Torre estándar.",
        "{nome} selecionado · {resumo}.": "{nome} seleccionado · {resumo}.",
        "Proteja a torre-base": "Protege la torre base",
        "Os inimigos entram pelo começo do caminho e tentam chegar à sua torre-base. Sua missão é impedir que eles alcancem o final.": "Los enemigos entran al inicio del camino e intentan llegar a tu torre base. Tu misión es impedir que alcancen el final.",
        "Entendi": "Entendido",
        "Escolha uma defesa": "Elige una defensa",
        "Clique em Torre padrão na lista de Defesas. Ela custa 150 créditos e já está disponível na primeira fase.": "Haz clic en Torre estándar en la lista de Defensas. Cuesta 150 créditos y ya está disponible en la primera fase.",
        "Construa fora do caminho": "Construye fuera del camino",
        "Agora clique em um espaço livre do mapa, fora da estrada. As torres precisam ficar perto do caminho para alcançar os inimigos.": "Ahora haz clic en un espacio libre del mapa, fuera del camino. Las torres deben estar cerca para alcanzar a los enemigos.",
        "Selecione sua torre": "Selecciona tu torre",
        "Clique na Torre padrão que você acabou de construir. Assim você poderá ver seus atributos e comandos.": "Haz clic en la Torre estándar que acabas de construir. Así podrás ver sus atributos y comandos.",
        "Prepare a defesa": "Prepara la defensa",
        "Na Central da torre você pode escolher a prioridade do alvo, melhorar a torre com créditos ou vendê-la. Agora libere os inimigos e sobreviva até a wave 20!": "En la Central de la torre puedes elegir la prioridad del objetivo, mejorar la torre con créditos o venderla. ¡Ahora libera a los enemigos y sobrevive hasta la oleada 20!",
        "Começar defesa": "Comenzar defensa",
        "Passo {passo} de {total}": "Paso {passo} de {total}",
        "Continuar": "Continuar",
        "Treinamento concluído. Defenda sua base!": "Entrenamiento completado. ¡Defiende tu base!",
        "Conclua ou pule o tutorial antes de usar este comando.": "Completa o salta el tutorial antes de usar este comando.",
        "Resgatada": "Reclamada",
        "Resgatar prêmio": "Reclamar premio",
        "MISSÃO SEMANAL": "MISIÓN SEMANAL",
        "Progresso de {nome}": "Progreso de {nome}",
        "Recompensas permanentes das missões": "Recompensas permanentes de las misiones",
        "COLEÇÃO PERMANENTE": "COLECCIÓN PERMANENTE",
        "Prêmios especiais": "Premios especiales",
        "SKIN DE TORRE": "SKIN DE TORRE",
        "Usar visual original": "Usar aspecto original",
        "Equipar skin": "Equipar skin",
        "Bloqueada": "Bloqueada",
        "Complete objetivos, resgate prêmios e monte sua coleção.": "Completa objetivos, reclama premios y crea tu colección.",
        "SEMANA ATUAL": "SEMANA ACTUAL",
        "Semana {semana} de {ano}": "Semana {semana} de {ano}",
        "Renova {data} à 0h": "Se renueva {data} a medianoche",
        "Missões semanais": "Misiones semanales",
        "Ativar demonstração": "Activar demostración",
        "Ir para o checkout": "Ir al pago",
        "Checkout em preparação": "Pago en preparación",
        "Ajude o projeto e receba cosméticos exclusivos, sem vantagem nas partidas.": "Apoya el proyecto y recibe cosméticos exclusivos sin ventajas en las partidas.",
        "PACOTE ATIVO": "PAQUETE ACTIVO",
        "COMPRA ÚNICA · SOMENTE COSMÉTICOS": "COMPRA ÚNICA · SOLO COSMÉTICOS",
        "Um jeito de apoiar o desenvolvimento e mostrar que você fez parte da história do jogo.": "Una forma de apoyar el desarrollo y demostrar que formaste parte de la historia del juego.",
        "Não aumenta dano, créditos, Fragmentos ou limite de torres.": "No aumenta el daño, los créditos, los Fragmentos ni el límite de torres.",
        "Conteúdo do Pacote Apoiador": "Contenido del Paquete de Apoyo",
        "DEMONSTRAÇÃO LOCAL": "DEMOSTRACIÓN LOCAL",
        "COMPRA SEGURA": "COMPRA SEGURA",
        "Obrigado por apoiar Guardians of Pixel!": "¡Gracias por apoyar Guardians of Pixel!",
        "Liberação permanente neste navegador": "Desbloqueo permanente en este navegador",
        "Nenhuma cobrança será feita. O checkout real será conectado antes do lançamento.": "No se realizará ningún cobro. El pago real se conectará antes del lanzamiento.",
        "O pacote será liberado depois da confirmação do pagamento.": "El paquete se desbloqueará después de confirmar el pago.",
        "Equipar Aurora Pixel": "Equipar Aurora Píxel",
        "CONQUISTA ESPECIAL": "LOGRO ESPECIAL",
        "MARCO PERMANENTE": "HITO PERMANENTE",
        "Desbloqueada": "Desbloqueada",
        "Complete desafios permanentes e revele todas as medalhas.": "Completa desafíos permanentes y revela todas las medallas.",
        "COLEÇÃO DE CONQUISTAS": "COLECCIÓN DE LOGROS",
        "{desbloqueadas} de {total} desbloqueadas": "{desbloqueadas} de {total} desbloqueados",
        "Todas as conquistas": "Todos los logros",
        "Concluída": "Completada",
        "Disponível": "Disponible",
        "{descricao} · {waves} waves · Boss a cada {intervalo} waves": "{descricao} · {waves} oleadas · Jefe cada {intervalo} oleadas",
        "{descricao} · Conclua a Fase {fase} para desbloquear": "{descricao} · Completa la Fase {fase} para desbloquear",
        "Selecionada": "Seleccionada",
        "Selecionar": "Seleccionar",
        "Conclua todas as 20 waves de uma fase para liberar a próxima.": "Completa las 20 oleadas de una fase para desbloquear la siguiente.",
        "Fases": "Fases",
        "Seleção de fases": "Selección de fases",
        "Capítulos": "Capítulos",
        "Capítulo 1": "Capítulo 1",
        "Capítulo 2": "Capítulo 2",
        "Capítulo 3": "Capítulo 3",
        "Escolha um capítulo para ver suas fases.": "Elige un capítulo para ver sus fases.",
        "Seleção de capítulos": "Selección de capítulos",
        "Fases {inicio} a {fim}": "Fases {inicio} a {fim}",
        "{concluidas} de {total} fases concluídas": "{concluidas} de {total} fases completadas",
        "Ver fases": "Ver fases",
        "Conclua o Capítulo {capitulo} para desbloquear": "Completa el Capítulo {capitulo} para desbloquear",
        "Complete todas as fases deste capítulo para liberar o próximo.": "Completa todas las fases de este capítulo para desbloquear el siguiente.",
        "Voltar aos capítulos": "Volver a los capítulos",
        "As Fases {inicio} a {fim} serão adicionadas em futuras atualizações.": "Las Fases {inicio} a {fim} se añadirán en futuras actualizaciones.",
        "Em desenvolvimento": "En desarrollo",
        "Dispara bolas de fogo e incendeia o alvo: {dano} de dano por segundo durante {segundos} segundos. Novos acertos renovam a duração.": "Dispara bolas de fuego e incendia el objetivo: {dano} de daño por segundo durante {segundos} segundos. Los nuevos impactos renuevan la duración.",
        "Dispara uma carga que salta entre até {quantidade} inimigos próximos e perde dano a cada salto.": "Dispara una carga que salta entre hasta {quantidade} enemigos cercanos y pierde daño con cada salto.",
        "Explode por contato, causa {dano} de dano em {raio} px e desacelera inimigos em {percentual}%.": "Explota por contacto, causa {dano} de daño en {raio} px y ralentiza a los enemigos un {percentual}%.",
        "Explode somente quando um inimigo encosta nela e causa {dano} de dano em uma área de {raio} px.": "Explota solo cuando un enemigo la toca y causa {dano} de daño en un área de {raio} px.",
        "Clique na Bomba para acender o pavio. Após {segundos} segundo, ela causa {dano} de dano em uma área de {raio} px.": "Haz clic en la Bomba para encender la mecha. Tras {segundos} segundo, causa {dano} de daño en un área de {raio} px.",
        "Aumenta em {percentual}% a velocidade de ataque das torres dentro de {alcance} px. O bônus não acumula.": "Aumenta un {percentual}% la velocidad de ataque de las torres dentro de {alcance} px. El bono no se acumula.",
        "Produz {creditos} créditos ao concluir uma wave inteira. Precisa sobreviver até o fim para pagar.": "Produce {creditos} créditos al completar una oleada entera. Debe sobrevivir hasta el final para pagar.",
        "Atrai Sabotadores, Macacos e Corujas dentro do alcance deles. Aguenta {tiros} tiros e não atira.": "Atrae a Saboteadores, Monos y Búhos dentro de su alcance. Resiste {tiros} disparos y no ataca.",
        "Custa ${custo} na partida · máximo de {limite} no mapa · não ocupa vaga de torre": "Cuesta ${custo} en la partida · máximo {limite} en el mapa · no ocupa espacio de torre",
        "Custa ${custo} na partida · máximo de {limite} por partida": "Cuesta ${custo} en la partida · máximo {limite} por partida",
        "Gerador produziu {creditos} créditos.": "El generador produjo {creditos} créditos.",
        "Comprada": "Comprada",
        "Comprar por {preco}◆": "Comprar por {preco}◆",
        "Faltam {preco}◆": "Faltan {preco}◆",
        "{quantidade} item": "{quantidade} objeto",
        "{quantidade} itens": "{quantidade} objetos",
        "Em breve": "Próximamente",
        "EM BREVE": "PRÓXIMAMENTE",
        "Use Fragmentos de Pixel para liberar itens permanentemente.": "Usa Fragmentos de Píxel para desbloquear objetos permanentemente.",
        "Seu saldo": "Tu saldo",
        "SEU SALDO": "TU SALDO",
        "{quantidade} Fragmentos de Pixel": "{quantidade} Fragmentos de Píxel",
        "Categorias da Loja": "Categorías de la Tienda",
        "Categorias do Álbum": "Categorías del Álbum",
        "SEÇÃO ATUAL": "SECCIÓN ACTUAL",
        "Atira em torres | Destrói com {tiros} tiros": "Dispara a torres | Destruye con {tiros} disparos",
        "Exclusivo da Fase 2": "Exclusivo de la Fase 2",
        "Exclusiva da Fase 2": "Exclusiva de la Fase 2",
        "Exclusivo da Fase 3": "Exclusivo de la Fase 3",
        "Exclusivo da Fase 4 | Desacelera torres": "Exclusivo de la Fase 4 | Ralentiza torres",
        "Exclusiva da Fase 4 | Dispara com 50% da vida": "Exclusiva de la Fase 4 | Acelera con 50% de vida",
        "Exclusivo da Fase 4": "Exclusivo de la Fase 4",
        "Exclusiva da Fase 5 | Muito rápida": "Exclusiva de la Fase 5 | Muy rápida",
        "Exclusivo da Fase 5 | Faz arrancadas": "Exclusivo de la Fase 5 | Realiza embestidas",
        "Exclusiva da Fase 5 | Reduz o alcance das torres": "Exclusiva de la Fase 5 | Reduce el alcance de las torres",
        "Exclusivo da Fase 6 | Muito rápido": "Exclusivo de la Fase 6 | Muy rápido",
        "Exclusivo da Fase 6": "Exclusivo de la Fase 6",
        "Criado pelo Titã de Obsidiana | Muito rápido": "Creado por el Titán de Obsidiana | Muy rápido",
        "Exclusivo da Fase 1 | +{vida} de vida por aparição": "Exclusivo de la Fase 1 | +{vida} de vida por aparición",
        "Exclusivo da Fase 2 | +{vida} de vida por aparição": "Exclusivo de la Fase 2 | +{vida} de vida por aparición",
        "Exclusivo da Fase 3 | +{vida} de vida por aparição": "Exclusivo de la Fase 3 | +{vida} de vida por aparición",
        "Exclusivo da Fase 4 | +{vida} de vida por aparição": "Exclusivo de la Fase 4 | +{vida} de vida por aparición",
        "Exclusivo da Fase 5 | +{vida} de vida por aparição | Rugido atordoa torres próximas": "Exclusivo de la Fase 5 | +{vida} de vida por aparición | El rugido aturde torres cercanas",
        "Exclusivo da Fase 6 | Carapaça rompe com 50% de vida, acelera e libera fragmentos": "Exclusivo de la Fase 6 | El caparazón se rompe con 50% de vida, acelera y libera fragmentos",
        "Exclusivo da Fase 7 | Muito rápido": "Exclusivo de la Fase 7 | Muy rápido",
        "Exclusivo da Fase 7": "Exclusivo de la Fase 7",
        "Exclusivo da Fase 7 | Regenera 40 de vida por segundo depois de alcançar 50%": "Exclusivo de la Fase 7 | Regenera 40 de vida por segundo después de alcanzar el 50%",
        "Exclusivo da Fase 8 | Muito rápido": "Exclusivo de la Fase 8 | Muy rápido",
        "Exclusivo da Fase 8 | Reduz 20% do dano recebido": "Exclusivo de la Fase 8 | Reduce un 20% el daño recibido",
        "Exclusivo da Fase 8 | Muita vida": "Exclusivo de la Fase 8 | Mucha vida",
        "Exclusivo da Fase 8 | Invoca 2 Raptors com 60% e 30% de vida": "Exclusivo de la Fase 8 | Invoca 2 Raptors con 60% y 30% de vida",
        "Exclusivo da Fase 9 | Muito rápido e ainda mais veloz nos trilhos": "Exclusivo de la Fase 9 | Muy rápido y aún más veloz en los rieles de impulso",
        "Exclusivo da Fase 9 | Restaura 45 de vida de um aliado próximo": "Exclusivo de la Fase 9 | Restaura 45 de vida a un aliado cercano",
        "Exclusivo da Fase 9 | Reduz 25% do dano recebido por aliados próximos": "Exclusivo de la Fase 9 | Reduce un 25% el daño recibido por aliados cercanos",
        "Exclusivo da Fase 9 | Rebobina o caminho e recupera vida duas vezes": "Exclusivo de la Fase 9 | Rebobina el camino y recupera vida dos veces",
        "Habilidade temporal": "Habilidad temporal",
        "Pulso Temporal": "Pulso Temporal",
        "Pronto para usar": "Listo para usar",
        "Tempo alterado · {segundos}s": "Tiempo alterado · {segundos}s",
        "Disponível na wave 1": "Disponible en la oleada 1",
        "Recarrega na wave {wave}": "Recarga en la oleada {wave}",
        "Pulso Temporal ativado!": "¡Pulso Temporal activado!",
        "Pulso Temporal desbloqueado! Ele estará disponível no posto lateral das próximas partidas.": "¡Pulso Temporal desbloqueado! Estará disponible en el puesto lateral de las próximas partidas.",
        "TIRANO": "TIRANO",
        "Caminho Alto": "Camino Alto",
        "Caminho Baixo": "Camino Bajo",
        "Atalho do Tirano": "Atajo del Tirano",
        "CAMINHO VIVO": "CAMINO VIVO",
        "ROTA": "RUTA",
        "ATALHO ABERTO": "ATAJO ABIERTO",
        "O {caminho} está ativo.": "El {caminho} está activo.",
        "As raízes vão mudar: {caminho} na próxima wave.": "Las raíces cambiarán: {caminho} en la próxima oleada.",
        "O Tirano rompeu as raízes: atalho aberto na próxima wave!": "El Tirano rompió las raíces: ¡atajo abierto en la próxima oleada!",
        "PROTOCOLO ZERO": "PROTOCOLO CERO",
        "Rádio do Projeto Relógio encontrado!": "¡Radio del Proyecto Reloj encontrada!",
        "OUVIR · PROJETO RELÓGIO": "ESCUCHAR · PROYECTO RELOJ",
        "Deixe espaço livre ao redor do rádio.": "Deja espacio libre alrededor de la radio.",
        "TRANSMISSÃO 09 — REMETENTE DESCONHECIDO": "TRANSMISIÓN 09 — REMITENTE DESCONOCIDO",
        "Se alguém ainda recebe este sinal, procure o Projeto Relógio. Objetivo registrado: criar um guardião capaz de existir em todas as eras. Consciência temporal detectada. Preparando corpo para transferência... RESULTADO: ARQUIVO CORROMPIDO.": "Si alguien aún recibe esta señal, busca el Proyecto Reloj. Objetivo registrado: crear un guardián capaz de existir en todas las eras. Conciencia temporal detectada. Preparando cuerpo para transferencia... RESULTADO: ARCHIVO CORRUPTO.",
        "FREQUÊNCIA: PROJETO RELÓGIO": "FRECUENCIA: PROYECTO RELOJ",
        "Desligar rádio": "Apagar radio",
        "{quantidade} lasers de {dano} de dano · Alcance {alcance}": "{quantidade} láseres de {dano} de daño · Alcance {alcance}",
        " | {quantidade} lasers por ataque": " | {quantidade} láseres por ataque",
        "Álbum de Figurinhas": "Álbum de Cromos",
        "Jogue para encontrar novas figurinhas e completar sua coleção.": "Juega para encontrar nuevos cromos y completar tu colección.",
        "{obtidas}/{total} figurinhas": "{obtidas}/{total} cromos",
        "PÁGINA DA COLEÇÃO": "PÁGINA DE LA COLECCIÓN",
        "{obtidas} de {total} figurinhas coladas": "{obtidas} de {total} cromos pegados",
        "Nenhuma figurinha ainda": "Aún no hay cromos",
        "Desbloqueie uma torre para colar uma nova figurinha aqui.": "Desbloquea una torre para pegar un nuevo cromo aquí.",
        "Derrote um inimigo durante uma partida para colar a primeira figurinha.": "Derrota a un enemigo durante una partida para pegar el primer cromo.",
        "Derrote um Boss para revelar e colar sua figurinha.": "Derrota a un Jefe para revelar y pegar su cromo.",
        "Compre uma mina ou bomba na Loja para adicioná-la ao Álbum.": "Compra una mina o bomba en la Tienda para añadirla al Álbum.",
        "Ganhe uma skin para adicioná-la à sua coleção.": "Consigue una skin para añadirla a tu colección.",
        "Somente torres desbloqueadas aparecem nesta página.": "Solo aparecen en esta página las torres desbloqueadas.",
        "Cada tipo é colado depois de ser derrotado pela primeira vez.": "Cada tipo se pega después de derrotarlo por primera vez.",
        "Cada chefe é colado depois que você consegue derrotá-lo.": "Cada jefe se pega después de que logras derrotarlo.",
        "Somente explosivos que você comprou aparecem nesta página.": "Solo aparecen en esta página los explosivos que compraste.",
        "Somente visuais cosméticos que você já obteve aparecem aqui.": "Aquí solo aparecen los aspectos cosméticos que ya obtuviste.",
        "Explosivos": "Explosivos",
        "Inimigos": "Enemigos",
        "Bosses": "Jefes",
        "Skins": "Skins",
        "Defesas e estruturas em todos os níveis.": "Defensas y estructuras en todos los niveles.",
        "Unidades comuns e especiais de todas as fases.": "Unidades comunes y especiales de todas las fases.",
        "Chefes encontrados ao longo da campanha.": "Jefes encontrados durante la campaña.",
        "Explosivos de contato e detonação manual.": "Explosivos de contacto y detonación manual.",
        "Visuais cosméticos da Torre padrão.": "Aspectos cosméticos de la Torre estándar.",
        "Visual original": "Aspecto original",
        "Aparência padrão disponível para todos.": "El aspecto predeterminado disponible para todos.",
        "Disponível desde o início.": "Disponible desde el inicio.",
        "Obtida em missão semanal.": "Obtenida en una misión semanal.",
        "Obtida no Pacote Apoiador.": "Incluida en el Paquete de Apoyo.",
        "Equipada": "Equipada",
        " | Loja: {custo} fragmentos": " | Tienda: {custo} fragmentos",
        " | Desbloqueio: conclua a Fase {fase}": " | Desbloqueo: completa la Fase {fase}",
        " | Dano em área: {raio} px": " | Daño de área: {raio} px",
        " | Queimadura: {dano}/s durante {segundos}s": " | Quemadura: {dano}/s durante {segundos}s",
        "Custo: {custo} | Dano em área: {dano} | Raio: {raio} px | Limite: {limite}": "Costo: {custo} | Daño de área: {dano} | Radio: {raio} px | Límite: {limite}",
        " | Detonação manual": " | Detonación manual",
        " | Detonação por contato": " | Detonación por contacto",
        "Custo: {custo} | Cadência próxima: +{percentual}% | Alcance: {alcance} | Limite: {limite}": "Costo: {custo} | Cadencia cercana: +{percentual}% | Alcance: {alcance} | Límite: {limite}",
        "Custo: {custo} | Carga: {cargas} inimigos | Empurrão: {distancia} px | Limite: {limite}": "Costo: {custo} | Carga: {cargas} enemigos | Empuje: {distancia} px | Límite: {limite}",
        "Custo: {custo} | Produção: {creditos} por wave | Limite: {limite}": "Costo: {custo} | Producción: {creditos} por oleada | Límite: {limite}",
        "Custo: {custo} | Resistência: {tiros} tiros | Limite: {limite}": "Costo: {custo} | Resistencia: {tiros} disparos | Límite: {limite}",
        "Custo: {custo} | Dano: {dano} | Alcance: {alcance}": "Costo: {custo} | Daño: {dano} | Alcance: {alcance}",
        "{nome} · nível {nivel}": "{nome} · nivel {nivel}",
        "Melhoria: {custo} | Dano: {dano} | Alcance: {alcance}": "Mejora: {custo} | Daño: {dano} | Alcance: {alcance}",
        "Melhoria: {custo} | Carga reduzida para {cargas} inimigos": "Mejora: {custo} | Carga reducida a {cargas} enemigos",
        "Melhoria: {custo} | Vulnerabilidade: +{percentual}% por {segundos}s": "Mejora: {custo} | Vulnerabilidad: +{percentual}% durante {segundos}s",
        "Melhoria: {custo} | Segundo impacto após {segundos}s": "Mejora: {custo} | Segundo impacto después de {segundos}s",
        "Melhoria: {custo} | Produção: {creditos} por wave": "Mejora: {custo} | Producción: {creditos} por oleada",
        "Vida: {vida} | Velocidade: {velocidade}": "Vida: {vida} | Velocidad: {velocidade}",
        "Aprenda o básico e pratique antes da primeira wave.": "Aprende lo básico y practica antes de la primera oleada.",
        "TREINAMENTO PARA INICIANTES": "ENTRENAMIENTO PARA PRINCIPIANTES",
        "Defenda a torre-base": "Defiende la torre base",
        "Construa torres perto do caminho e impeça que os inimigos cheguem ao final.": "Construye torres cerca del camino e impide que los enemigos lleguen al final.",
        "Jogar tutorial": "Jugar tutorial",
        "Escolha uma defesa liberada na lista à direita. A Torre padrão custa 150 créditos.": "Elige una defensa desbloqueada en la lista de la derecha. La Torre estándar cuesta 150 créditos.",
        "Clique fora do caminho para construir. Deixe a torre perto da estrada para alcançar os inimigos.": "Haz clic fuera del camino para construir. Deja la torre cerca para alcanzar a los enemigos.",
        "As torres atacam automaticamente e cada disparo rende {creditos} créditos.": "Las torres atacan automáticamente y cada disparo otorga {creditos} créditos.",
        "Clique em uma torre construída para ver dano, alcance, melhoria, venda e prioridade de alvo.": "Haz clic en una torre construida para ver daño, alcance, mejora, venta y prioridad de objetivo.",
        "Use os créditos recebidos para construir ou melhorar. Cada torre pode chegar ao nível 3.": "Usa los créditos obtenidos para construir o mejorar. Cada torre puede alcanzar el nivel 3.",
        "Não deixe nenhum inimigo chegar à torre-base. Conclua a wave {wave} para vencer a fase.": "No dejes que ningún enemigo llegue a la torre base. Completa la oleada {wave} para ganar la fase.",
        "{nome} selecionado.": "{nome} seleccionado.",
        "{nome} nível {nivel} selecionado.": "{nome} nivel {nivel} seleccionado.",
        "Selecione uma torre para melhorar.": "Selecciona una torre para mejorar.",
        "Esta torre já está no nível máximo.": "Esta torre ya está en el nivel máximo.",
        "Dinheiro insuficiente para esta melhoria.": "No tienes créditos suficientes para esta mejora.",
        "{nome} melhorado para o nível {nivel}.": "{nome} mejorado al nivel {nivel}.",
        "Selecione uma torre para vender.": "Selecciona una torre para vender.",
        "Torre vendida por {valor}.": "Torre vendida por {valor}.",
        "{nome} · Nível {nivel} · Carga {atual}/{total} · Empurra {distancia} px": "{nome} · Nivel {nivel} · Carga {atual}/{total} · Empuja {distancia} px",
        "{nome} · Nível {nivel} · Produção {creditos} créditos por wave": "{nome} · Nivel {nivel} · Producción {creditos} créditos por oleada",
        "{nome} · Cadência próxima +{percentual}% · Alcance {alcance}": "{nome} · Cadencia cercana +{percentual}% · Alcance {alcance}",
        "{nome} · Resistência {atual}/{total} tiros": "{nome} · Resistencia {atual}/{total} disparos",
        "{nome} · Dano {dano} em {raio} px · Alcance {alcance}": "{nome} · {dano} de daño en {raio} px · Alcance {alcance}",
        "{nome} · Dano {dano} · Alcance {alcance}": "{nome} · Daño {dano} · Alcance {alcance}",
        "{nome} · Nível {nivel} · Dano {dano} em {raio} px · Alcance {alcance}": "{nome} · Nivel {nivel} · {dano} de daño en {raio} px · Alcance {alcance}",
        "{nome} · Nível {nivel} · Dano {dano} · Alcance {alcance}": "{nome} · Nivel {nivel} · Daño {dano} · Alcance {alcance}",
        "Selecione uma torre no mapa": "Selecciona una torre en el mapa",
        "Alvo: selecione uma torre": "Objetivo: selecciona una torre",
        "Suporte não atira": "El apoyo no dispara",
        "Gerador não atira": "El generador no dispara",
        "Impacto automático": "Impacto automático",
        "Isca não atira": "El señuelo no dispara",
        "Alvo: {modo}": "Objetivo: {modo}",
        "Selecione uma torre para mudar o alvo.": "Selecciona una torre para cambiar el objetivo.",
        "{nome} não possui modo de alvo.": "{nome} no tiene modo de objetivo.",
        "Prioridade de alvo: {modo}.": "Prioridad de objetivo: {modo}.",
        "Selecione uma torre": "Selecciona una torre",
        "Torre no nível máximo": "Torre en el nivel máximo",
        "Melhorar torre ({custo})": "Mejorar torre ({custo})",
        "Vender torre (+{valor})": "Vender torre (+{valor})",
        "Jogo pausado": "Juego pausado",
        "Desistir": "Rendirse",
        "Reiniciar fase": "Reiniciar fase",
        "Boosts": "Bonificaciones",
        "Partida atual": "Partida actual",
        "Derrote um Boss para escolher seu primeiro boost.": "Derrota a un Jefe para elegir tu primera bonificación.",
        "Temporário": "Temporal",
        "Aguardando evento": "Esperando evento",
        "Defesas": "Defensas",
        "Torres e explosivos": "Torres y explosivos",
        "Central da torre": "Central de la torre",
        "Treinamento GP": "Entrenamiento GP",
        "Pular tutorial": "Saltar tutorial",
        "Partida pausada": "Partida pausada",
        "Tem certeza que quer desistir?": "¿Seguro que quieres rendirte?",
        "Nunca!": "¡Nunca!",
        "Resultado da batalha": "Resultado de la batalla",
        "Voltar ao menu": "Volver al menú",
        "Próxima fase": "Siguiente fase",
        "Boss derrotado": "Jefe derrotado",
        "Escolha um bônus": "Elige una bonificación",
        "A recompensa escolhida permanece ativa até o fim da partida.": "La recompensa elegida permanece activa hasta el final de la partida.",
        "-{percentual}% intervalo": "-{percentual}% de intervalo",
        "+{creditos} créditos": "+{creditos} créditos",
        "dano": "daño",
        "alcance": "alcance",
        "Bônus escolhido: {nome}.": "Bonificación elegida: {nome}.",
        "Um fliperama apareceu no mapa!": "¡Apareció una máquina recreativa en el mapa!",
        "Labirinto Pixel": "Laberinto Píxel",
        "Mapa {mapa}: leve o robô até a saída sem tocar nas paredes.": "Mapa {mapa}: lleva el robot hasta la salida sin tocar las paredes.",
        "Mapa": "Mapa",
        "Use WASD ou as setas. Encostar na parede leva o robô de volta ao início.": "Usa WASD o las flechas. Tocar una pared devuelve el robot al inicio.",
        "Labirinto controlado pelas teclas WASD ou setas": "Laberinto controlado con WASD o las flechas",
        "Use WASD, as setas ou o direcional da tela. Encostar na parede leva o robô de volta ao início.": "Usa WASD, las flechas o el control direccional de la pantalla. Tocar una pared devuelve el robot al inicio.",
        "Labirinto controlado por teclado ou toque": "Laberinto controlado por teclado o toque",
        "Controles de movimento do labirinto": "Controles de movimiento del laberinto",
        "Mover para cima": "Mover hacia arriba",
        "Mover para a esquerda": "Mover hacia la izquierda",
        "Mover para baixo": "Mover hacia abajo",
        "Mover para a direita": "Mover hacia la derecha",
        "Tiro ao alvo": "Tiro al Blanco",
        "Acerte o alvo móvel {alvos} vezes antes que o tempo termine.": "Acierta el objetivo móvil {alvos} veces antes de que termine el tiempo.",
        "Acertos": "Aciertos",
        "Acompanhe o alvo: ele se move livremente e rebate nas bordas.": "Sigue el objetivo: se mueve libremente y rebota en los bordes.",
        "Área do minigame com alvo móvel": "Área del minijuego con objetivo móvil",
        "Labirinto concluído! Torres com +{percentual}% de dano por {segundos} segundos.": "¡Laberinto completado! Las torres obtienen +{percentual}% de daño durante {segundos} segundos.",
        "Tiro ao alvo concluído! Torres aceleradas por {segundos} segundos.": "¡Tiro al blanco completado! Las torres atacan más rápido durante {segundos} segundos.",
        "Tempo esgotado no fliperama.": "Se acabó el tiempo en la máquina recreativa.",
        "O boost do fliperama terminou.": "La bonificación de la máquina recreativa terminó.",
        "FASE {fase} · {waves} WAVES CONCLUÍDAS": "FASE {fase} · {waves} OLEADAS COMPLETADAS",
        "SUA BASE FOI INVADIDA": "TU BASE FUE INVADIDA",
        "VITÓRIA": "VICTORIA",
        "A Fase {fase} foi desbloqueada. Escolha seu próximo destino.": "La Fase {fase} fue desbloqueada. Elige tu próximo destino.",
        "Todas as fases disponíveis foram concluídas.": "Todas las fases disponibles fueron completadas.",
        "Fase concluída. Você pode repeti-la ou seguir em frente.": "Fase completada. Puedes repetirla o seguir adelante.",
        "Um inimigo alcançou sua base. Reorganize sua defesa e tente novamente.": "Un enemigo alcanzó tu base. Reorganiza tu defensa e inténtalo de nuevo.",
        "Fragmento de Pixel": "Fragmento de Píxel",
        "Fragmentos de Pixel": "Fragmentos de Píxel",
        " Você recebeu {quantidade} {moeda} pelas waves alcançadas.": " Recibiste {quantidade} {moeda} por las oleadas alcanzadas.",
        "Repetir fase": "Repetir fase",
        "Recomeçar fase": "Reiniciar fase",
        "Fase {fase} reiniciada.": "Fase {fase} reiniciada.",
        "Fase {fase} iniciada.": "Fase {fase} iniciada.",
        "wave": "oleada",
        "waves": "oleadas",
        "As {wave} {textoWave} que você alcançou vão te dar {recompensa} {fragmentos} no total.": "Alcanzar {wave} {textoWave} te dará {recompensa} {fragmentos} en total.",
        "Fechar menu da partida (Esc)": "Cerrar menú de la partida (Esc)",
        "Abrir menu da partida (Esc)": "Abrir menú de la partida (Esc)",
        "Conclua ou pule o tutorial antes de abrir o menu.": "Completa o salta el tutorial antes de abrir el menú.",
        "Siga a instrução do treinamento para continuar.": "Sigue la instrucción del entrenamiento para continuar.",
        "Clique na Torre padrão que você acabou de construir.": "Haz clic en la Torre estándar que acabas de construir.",
        "Mina armada · {dano} de dano em {raio} px.": "Mina armada · {dano} de daño en {raio} px.",
        "Pavio aceso · explosão em {segundos}s.": "Mecha encendida · explosión en {segundos}s.",
        "Pavio aceso! A Bomba Pesada explode em {segundos} segundo.": "¡Mecha encendida! La Bomba Pesada explota en {segundos} segundo.",
        "A {nome} só pode ser colocada no caminho.": "La {nome} solo se puede colocar en el camino.",
        "Não é possível colocar torres no caminho.": "No se pueden colocar torres en el camino.",
        "Deixe espaço livre ao redor do fliperama.": "Deja espacio libre alrededor de la máquina recreativa.",
        "Limite de {limite} {nome} por partida.": "Límite de {limite} {nome} por partida.",
        "Dinheiro insuficiente para construir {nome}.": "No tienes créditos suficientes para construir {nome}.",
        "Você já atingiu o limite de torres.": "Ya alcanzaste el límite de torres.",
        "Não coloque minas muito perto umas das outras.": "No coloques minas demasiado cerca entre sí.",
        "Não coloque Bombas Pesadas muito perto umas das outras.": "No coloques Bombas Pesadas demasiado cerca entre sí.",
        "Não coloque esta defesa muito perto de torres ou Bombas Pesadas.": "No coloques esta defensa demasiado cerca de torres o Bombas Pesadas.",
        "Bomba posicionada · clique nela para acender o pavio · {quantidade}/{limite} no mapa.": "Bomba colocada · haz clic para encender la mecha · {quantidade}/{limite} en el mapa.",
        "Mina armada · {quantidade}/{limite} no mapa.": "Mina armada · {quantidade}/{limite} en el mapa.",
        "Inimigo": "Enemigo",
        "{inimigo} destruiu {torre}!": "¡{inimigo} destruyó {torre}!",
        "BASE": "BASE",
        "FASE {fase} · INFINITO": "FASE {fase} · INFINITO",
        "FASE {fase} · WAVE": "FASE {fase} · OLEADA",
        "CRÉDITOS": "CRÉDITOS",
        "TORRES": "TORRES",
        "Dano {dano} · área {raio} px · encoste para explodir": "Daño {dano} · área {raio} px · contacto para explotar",
        "Dano {dano} · área {raio} px · clique para acender": "Daño {dano} · área {raio} px · clic para encender",
        "+{percentual}% de cadência próxima": "+{percentual}% de cadencia cercana",
        "Atrai inimigos atiradores": "Atrae enemigos a distancia",
        "Cada tiro  +{creditos}": "Cada disparo  +{creditos}",
        "Carga com {cargas} inimigos · Empurra {distancia} px": "Carga con {cargas} enemigos · Empuja {distancia} px",
        "Produz {creditos} por wave completa": "Produce {creditos} por oleada completa",
        "Queima {dano}/s por {segundos}s": "Quema {dano}/s durante {segundos}s",
        "TORRE SELECIONADA": "TORRE SELECCIONADA",
        "GERADOR ATIVO": "GENERADOR ACTIVO",
        "CARGA SÍSMICA": "CARGA SÍSMICA",
        "SUPORTE ATIVO": "APOYO ACTIVO",
        "ISCA DEFENSIVA": "SEÑUELO DEFENSIVO",
        "Nível {nivel}/3": "Nivel {nivel}/3",
        "Cadência próxima +{percentual}%  •  Alcance {alcance}": "Cadencia cercana +{percentual}%  •  Alcance {alcance}",
        "Produção +{creditos} por wave completa": "Producción +{creditos} por oleada completa",
        "Carga {atual}/{total}  •  Empurra {distancia} px": "Carga {atual}/{total}  •  Empuja {distancia} px",
        "Resistência {atual}/{total} tiros": "Resistencia {atual}/{total} disparos",
        "Dano {dano}  •  Alcance {alcance}": "Daño {dano}  •  Alcance {alcance}",
        "Dano {dano}  •  Queima {danoQueimadura}/s por {segundos}s": "Daño {dano}  •  Quema {danoQueimadura}/s durante {segundos}s",
        "Vida {atual} / {maxima}": "Vida {atual} / {maxima}",
        "CLIQUE · {segundos}s": "CLIC · {segundos}s",
        "URSO": "OSO",
        "OBSIDIANO": "OBSIDIANA",
        "HIDRA": "HIDRA",
        "COLOSSO": "COLOSO",
        "FARAÓ": "FARAÓN",
        "TITÃ": "TITÁN",
        "BOSS": "JEFE",
        "ALGO ESTÁ VINDO...": "ALGO SE ACERCA...",
        "Menu da partida": "Menú de la partida",
        "Boosts da partida": "Bonificaciones de la partida",
        "Boost temporário": "Bonificación temporal",
        "Mapa do jogo Guardians of Pixel": "Mapa del juego Guardians of Pixel",
        "Defesas disponíveis": "Defensas disponibles",
        "Controles da partida": "Controles de la partida",
        "Evento especial": "Evento especial",
        "Tempo": "Tiempo",
        "Alternar entre primeiro, último e aleatório": "Alternar entre primero, último y aleatorio",
        "Torre padrão": "Torre estándar",
        "Canhão pesado": "Cañón pesado",
        "Torre Glacial": "Torre Glacial",
        "Torre Besta": "Torre Ballesta",
        "Torre de Esporos": "Torre de Esporas",
        "Obliterador": "Obliterador",
        "Torre Sísmica": "Torre Sísmica",
        "Isca Blindada": "Señuelo Blindado",
        "Amplificador Pixel": "Amplificador Píxel",
        "Gerador de Créditos": "Generador de Créditos",
        "Torre de Raios": "Torre de Rayos",
        "Lança-Chamas": "Lanzallamas",
        "Mina Terrestre": "Mina Terrestre",
        "Mina Congelante": "Mina Congelante",
        "Bomba Pesada": "Bomba Pesada",
        "Dimensão Glitch": "Dimensión Glitch",
        "Uma cópia quebrada do mundo, escondida atrás da árvore da Fase 1.": "Una copia rota del mundo, escondida detrás del árbol de la Fase 1.",
        "Senhor do Tempo": "Señor del Tiempo",
        "Senhor do Tempo — Forma Humana": "Señor del Tiempo — Forma Humana",
        "Conceito futuro: retrato humano alto de meio-corpo, com terno, gravata, cabeça de relógio e uma mão no bolso.": "Concepto futuro: retrato humano alto de medio cuerpo, con traje, corbata, cabeza de reloj y una mano en el bolsillo.",
        "SINAL CORROMPIDO": "SEÑAL CORRUPTADA",
        "A realidade está falhando...": "La realidad está fallando...",
        "SINAL DESVIADO": "SEÑAL DESVIADA",
        "Corredores Amarelos": "Pasillos Amarillos",
        "Você não deveria estar aqui. Encontre a saída.": "No deberías estar aquí. Encuentra la salida.",
        "Use WASD, as setas ou o direcional para escapar.": "Usa WASD, las flechas o el control direccional para escapar.",
        "Labirinto amarelo controlado por teclado ou toque": "Laberinto amarillo controlado por teclado o toque",
        "Controles de movimento dos corredores": "Controles de movimiento de los pasillos",
        "ONDE EU ESTOU?": "¿DÓNDE ESTOY?",
        "SAÍDA": "SALIDA",
        "Entrar no portal corrompido": "Entrar en el portal corrupto",
        "O tempo observa do outro lado...": "El tiempo observa desde el otro lado...",
        "ENTIDADE DA FALHA": "ENTIDAD DE LA FALLA",
        "Era eu quem falava com você através do portal.": "Era yo quien hablaba contigo a través del portal.",
        "Meu nome é Senhor do Tempo.": "Mi nombre es Señor del Tiempo.",
        "Você não tem escolha.": "No tienes elección.",
        "Se quiser sair, vai ter que sair vitorioso daqui.": "Si quieres salir, tendrás que vencer aquí.",
        "Supere as 20 waves e eu abrirei o caminho de volta.": "Supera las 20 oleadas y abriré el camino de regreso.",
        "Serei generoso com você. Afinal, poucas pessoas chegam até aqui. Darei 300 créditos a mais para você começar. Mas depois disso você pensa que acabou? Ainda não.": "Seré generoso contigo. Al fin y al cabo, pocas personas llegan hasta aquí. Te daré 300 créditos adicionales para empezar. Pero después de eso, ¿crees que se acabó? Todavía no.",
        "Agora lute. O tempo já começou a correr.": "Ahora lucha. El tiempo ya ha empezado a correr.",
        "Enfrentar a Dimensão": "Enfrentar la Dimensión",
        "Conclua a Fase 6 para despertar o portal.": "Completa la Fase 6 para despertar el portal.",
        "VOCÊ ENCONTROU UMA CARTA": "ENCONTRASTE UNA CARTA",
        "Você está pronto. Algo estará lhe esperando no lobby da Fase 1, entre as árvores. Venha ver meu desafio.": "Estás listo. Algo te estará esperando en el lobby de la Fase 1, entre los árboles. Ven a afrontar mi desafío.",
        "Guardar carta": "Guardar carta",
        "Você venceu o desafio. Como recompensa, deixei uma Máquina do Tempo para você no Capítulo 2. Sua próxima passagem está em uma época anterior ao pântano.": "Has vencido el desafío. Como recompensa, dejé una Máquina del Tiempo para ti en el Capítulo 2. Tu próximo pasaje está en una época anterior al pantano.",
        "Receber Máquina do Tempo": "Recibir Máquina del Tiempo",
        "Máquina do Tempo": "Máquina del Tiempo",
        "NOVO": "NUEVO",
        "Escolha uma época para procurar as fases do Capítulo 2.": "Elige una época para buscar las fases del Capítulo 2.",
        "Passado": "Pasado",
        "Presente": "Presente",
        "Futuro": "Futuro",
        "Ruínas inteiras e perigos que o presente esqueceu.": "Ruinas intactas y peligros que el presente olvidó.",
        "O ponto de partida da sua jornada pelo tempo.": "El punto de partida de tu viaje por el tiempo.",
        "Caminhos instáveis que ainda não deveriam existir.": "Caminos inestables que todavía no deberían existir.",
        "ÉPOCA ATUAL": "ÉPOCA ACTUAL",
        "Viajar para {epoca}": "Viajar al {epoca}",
        "Capítulo 2 · {epoca}": "Capítulo 2 · {epoca}",
        "Nenhuma fase disponível nesta época.": "No hay ninguna fase disponible en esta época.",
        "Tente outra época ou volte mais tarde.": "Prueba otra época o vuelve más tarde.",
        "Parabéns. Você conseguiu.": "Enhorabuena. Lo conseguiste.",
        "Poucas pessoas passam por este desafio.": "Pocas personas superan este desafío.",
        "Então eu estou livre?": "¿Entonces soy libre?",
        "Livre para continuar. Mas sua jornada está longe de terminar.": "Libre para continuar. Pero tu viaje está lejos de terminar.",
        "O que você quer dizer?": "¿Qué quieres decir?",
        "Eu abri um novo caminho. O Capítulo 2 espera por você.": "He abierto un nuevo camino. El Capítulo 2 te espera.",
        "Considere isso uma recompensa... e um aviso. Ainda não acabou.": "Considéralo una recompensa... y una advertencia. Esto aún no ha terminado.",
        "CONVERSA FINAL": "CONVERSACIÓN FINAL",
        "Revelar Capítulo 2": "Revelar Capítulo 2",
        "CAMINHO LIBERADO": "CAMINO LIBERADO",
        "Fases 7 a 12": "Fases 7 a 12",
        "NOVO CAPÍTULO DESBLOQUEADO": "NUEVO CAPÍTULO DESBLOQUEADO",
        "Vença a Dimensão Glitch para desbloquear": "Vence la Dimensión Glitch para desbloquear",
        "Saída bloqueada": "Salida bloqueada",
        "O Senhor do Tempo só abrirá a saída depois da vitória.": "El Señor del Tiempo solo abrirá la salida después de la victoria.",
        "A derrota não abriu a saída. O Senhor do Tempo exige uma vitória.": "La derrota no abrió la salida. El Señor del Tiempo exige una victoria.",
        "Pixel Corrompido": "Píxel Corrupto",
        "Erro Veloz": "Error Veloz",
        "Bloco Instável": "Bloque Inestable",
        "Núcleo Glitch": "Núcleo Glitch",
        "Abrir portal da fase secreta": "Abrir portal de la fase secreta",
        "Brilho estranho atrás da árvore": "Brillo extraño detrás del árbol",
        "Portal descoberto": "Portal descubierto",
        "Algo está estranho aqui...": "Algo está extraño aquí...",
        "Ouvir o portal corrompido": "Escuchar el portal corrupto",
        "Uma voz espera do outro lado...": "Una voz espera al otro lado...",
        "O portal responde": "El portal responde",
        "Alguma coisa falou do outro lado.": "Algo habló desde el otro lado.",
        "TRANSMISSÃO DESCONHECIDA": "TRANSMISIÓN DESCONOCIDA",
        "Ainda não...": "Todavía no...",
        "Como assim?": "¿Cómo que no?",
        "O quê?": "¿Qué?",
        "Quem é você?": "¿Quién eres?",
        "Volte quando você estiver pronto.": "Vuelve cuando estés listo.",
        "Você": "Tú",
        "Responder à voz do portal": "Responder a la voz del portal",
        "Encerrar conversa": "Terminar conversación",
        "Sinal encontrado": "Señal encontrada",
        "Esta fase não aparece no seletor comum e só pode ser aberta por este portal.": "Esta fase no aparece en el selector normal y solo puede abrirse desde este portal.",
        "FASE SECRETA DESCOBERTA": "FASE SECRETA DESCUBIERTA",
        "Sobreviva a 20 waves de inimigos corrompidos para fechar a falha.": "Sobrevive a 20 oleadas de enemigos corruptos para cerrar la falla.",
        "Entrar na Dimensão Glitch": "Entrar en la Dimensión Glitch",
        "Fase secreta · Wave 1": "Fase secreta · Oleada 1",
        "FASE SECRETA · WAVE": "FASE SECRETA · OLEADA",
        "FASE SECRETA · {waves} WAVES CONCLUÍDAS": "FASE SECRETA · {waves} OLEADAS COMPLETADAS",
        "A falha foi contida. O portal continuará escondido atrás da árvore da Fase 1.": "La falla fue contenida. El portal seguirá escondido detrás del árbol de la Fase 1.",
        "A falha foi contida e o caminho para o Capítulo 2 está aberto.": "La falla fue contenida y el camino al Capítulo 2 está abierto.",
        "Dimensão Glitch reiniciada.": "Dimensión Glitch reiniciada.",
        "Encontrado na fase secreta | Textura quebrada": "Encontrado en la fase secreta | Textura rota",
        "Encontrado na fase secreta | Muito rápido": "Encontrado en la fase secreta | Muy rápido",
        "Encontrado na fase secreta | Muita vida": "Encontrado en la fase secreta | Mucha vida",
        "Boss da fase secreta | Fica mais forte a cada aparição": "Jefe de la fase secreta | Se fortalece en cada aparición",
        "ERRO": "ERROR"
    })
});
let idiomaAtual = carregarIdioma();
let musicaPausadaPeloJogador = false;
let volumeDaMusica = VOLUME_MUSICA_DE_FUNDO;
let ultimoVolumeAudivel = VOLUME_MUSICA_DE_FUNDO;
let modoNoturno = false;
let trilhaDoLobbyAtiva = true;
let musicaDoLobbyTocando = false;
let trilhaDoDesertoAtiva = false;
let musicaDoDesertoTocando = false;
let trilhaDoArticoAtiva = false;
let musicaDoArticoTocando = false;
let trilhaDaSelvaAtiva = false;
let musicaDaSelvaTocando = false;
let trilhaDoBosqueAtiva = false;
let musicaDoBosqueTocando = false;
let trilhaDaForjaAtiva = false;
let musicaDaForjaTocando = false;
let trilhaDoPantanoAtiva = false;
let musicaDoPantanoTocando = false;
let trilhaDaDimensaoGlitchAtiva = false;
let musicaDaDimensaoGlitchTocando = false;
let trilhaDaConversaDoPortalAtiva = false;
let musicaDaConversaDoPortalTocando = false;
let trilhaPixeladaDaFase1Ativa = false;
let musicaPixeladaDaFase1Tocando = false;
let contextoAudio = null;
let ganhoDosEfeitos = null;
let ganhoDaMusicaDoLobby = null;
let ganhoDaMusicaDoDeserto = null;
let ganhoDaMusicaDoArtico = null;
let ganhoDaMusicaDaSelva = null;
let ganhoDaMusicaDoBosque = null;
let ganhoDaMusicaDaForja = null;
let ganhoDaMusicaDoPantano = null;
let ganhoDaMusicaDaDimensaoGlitch = null;
let ganhoDaMusicaDaConversaDoPortal = null;
let ganhoDaMusicaPixeladaDaFase1 = null;
let intervaloDaMusicaDoLobby = null;
let intervaloDaMusicaDoDeserto = null;
let intervaloDaMusicaDoArtico = null;
let intervaloDaMusicaDaSelva = null;
let intervaloDaMusicaDoBosque = null;
let intervaloDaMusicaDaForja = null;
let intervaloDaMusicaDoPantano = null;
let intervaloDaMusicaDaDimensaoGlitch = null;
let intervaloDaMusicaDaConversaDoPortal = null;
let intervaloDaMusicaPixeladaDaFase1 = null;
let passoDaMusicaDoLobby = 0;
let passoDaMusicaDoDeserto = 0;
let passoDaMusicaDoArtico = 0;
let passoDaMusicaDaSelva = 0;
let passoDaMusicaDoBosque = 0;
let passoDaMusicaDaForja = 0;
let passoDaMusicaDoPantano = 0;
let passoDaMusicaDaDimensaoGlitch = 0;
let passoDaMusicaDaConversaDoPortal = 0;
let passoDaMusicaPixeladaDaFase1 = 0;
let volumeDosEfeitos = 0;
let ultimoVolumeAudivelDosEfeitos = 0;
let efeitosSonorosAtivos = true;
let audioDoRugidoAncestral = null;

function carregarIdioma() {
    try {
        const idiomaSalvo = localStorage.getItem(CHAVE_IDIOMA);
        return IDIOMAS_SUPORTADOS.includes(idiomaSalvo) ? idiomaSalvo : "pt-BR";
    } catch (erro) {
        return "pt-BR";
    }
}

function salvarIdioma() {
    try {
        localStorage.setItem(CHAVE_IDIOMA, idiomaAtual);
    } catch (erro) {
        // A troca continua válida durante a sessão mesmo sem armazenamento local.
    }
}

function normalizarVolumeSalvo(valor, valorPadrao) {
    return typeof valor === "number" && Number.isFinite(valor)
        ? Math.max(0, Math.min(1, valor))
        : valorPadrao;
}

function carregarPreferencias() {
    const preferenciasPadrao = {
        volumeDaMusica: VOLUME_MUSICA_DE_FUNDO,
        ultimoVolumeAudivel: VOLUME_MUSICA_DE_FUNDO,
        musicaPausadaPeloJogador: false,
        volumeDosEfeitos: CONFIG.audio.volumeInicialDosEfeitos,
        ultimoVolumeAudivelDosEfeitos: CONFIG.audio.volumeInicialDosEfeitos,
        efeitosSonorosAtivos: true,
        modoNoturno: false
    };

    try {
        const valorSalvo = JSON.parse(localStorage.getItem(CHAVE_PREFERENCIAS) || "null");

        if (!valorSalvo || typeof valorSalvo !== "object") {
            return preferenciasPadrao;
        }

        return {
            volumeDaMusica: normalizarVolumeSalvo(
                valorSalvo.volumeDaMusica,
                preferenciasPadrao.volumeDaMusica
            ),
            ultimoVolumeAudivel: normalizarVolumeSalvo(
                valorSalvo.ultimoVolumeAudivel,
                preferenciasPadrao.ultimoVolumeAudivel
            ) || preferenciasPadrao.ultimoVolumeAudivel,
            musicaPausadaPeloJogador: valorSalvo.musicaPausadaPeloJogador === true,
            volumeDosEfeitos: normalizarVolumeSalvo(
                valorSalvo.volumeDosEfeitos,
                preferenciasPadrao.volumeDosEfeitos
            ),
            ultimoVolumeAudivelDosEfeitos: normalizarVolumeSalvo(
                valorSalvo.ultimoVolumeAudivelDosEfeitos,
                preferenciasPadrao.ultimoVolumeAudivelDosEfeitos
            ) || preferenciasPadrao.ultimoVolumeAudivelDosEfeitos,
            efeitosSonorosAtivos: valorSalvo.efeitosSonorosAtivos !== false,
            modoNoturno: valorSalvo.modoNoturno === true
        };
    } catch (erro) {
        return preferenciasPadrao;
    }
}

function salvarPreferencias() {
    try {
        localStorage.setItem(CHAVE_PREFERENCIAS, JSON.stringify({
            volumeDaMusica,
            ultimoVolumeAudivel,
            musicaPausadaPeloJogador,
            volumeDosEfeitos,
            ultimoVolumeAudivelDosEfeitos,
            efeitosSonorosAtivos,
            modoNoturno
        }));
    } catch (erro) {
        // As preferências continuam válidas durante a sessão.
    }
}

function aplicarPreferenciasSalvas() {
    const preferencias = carregarPreferencias();
    volumeDaMusica = preferencias.volumeDaMusica;
    ultimoVolumeAudivel = preferencias.ultimoVolumeAudivel;
    musicaPausadaPeloJogador = preferencias.musicaPausadaPeloJogador;
    volumeDosEfeitos = preferencias.volumeDosEfeitos;
    ultimoVolumeAudivelDosEfeitos = preferencias.ultimoVolumeAudivelDosEfeitos;
    efeitosSonorosAtivos = preferencias.efeitosSonorosAtivos;
    modoNoturno = preferencias.modoNoturno;
    document.body?.classList.toggle("modo-noturno", modoNoturno);
    atualizarVolumeEfetivoDaMusica();
    atualizarGanhoDosEfeitos();
    atualizarControleDeVolume();
    atualizarControleDosEfeitos();
    atualizarControleDoModoDiaNoite();
}

function traduzir(chave, variaveis = {}) {
    const traducoesDoIdioma = TRADUCOES[idiomaAtual] || TRADUCOES["pt-BR"];
    const texto = traducoesDoIdioma[chave] || TRADUCOES["pt-BR"][chave] || chave;

    return preencherVariaveisDoTexto(texto, variaveis);
}

function preencherVariaveisDoTexto(texto, variaveis = {}) {
    return Object.entries(variaveis).reduce(
        (resultado, [nome, valor]) => resultado.replaceAll(`{${nome}}`, valor),
        texto
    );
}

function localizar(textoEmPortugues, variaveis = {}) {
    const chaveDaTraducaoPrincipal = CHAVES_PRINCIPAIS_POR_TEXTO[textoEmPortugues];
    const textoLocalizado = idiomaAtual === "pt-BR"
        ? textoEmPortugues
        : TEXTOS_LOCALIZADOS[idiomaAtual]?.[textoEmPortugues]
            || TRADUCOES[idiomaAtual]?.[chaveDaTraducaoPrincipal]
            || textoEmPortugues;
    return preencherVariaveisDoTexto(textoLocalizado, variaveis);
}

function obterNomeLocalizado(configuracao) {
    return localizar(configuracao.nome);
}

function atualizarControleDeIdioma() {
    for (const botao of botoesDeIdioma) {
        const selecionado = botao.dataset.idioma === idiomaAtual;
        botao.classList.toggle("botao-idioma-ativo", selecionado);
        botao.setAttribute("aria-pressed", selecionado.toString());
    }
}

function aplicarIdiomaNaInterface() {
    if (document.documentElement) {
        document.documentElement.lang = idiomaAtual;
    }

    for (const elemento of document.querySelectorAll("[data-i18n]")) {
        elemento.textContent = traduzir(elemento.dataset.i18n);
    }

    for (const elemento of document.querySelectorAll("[data-i18n-aria-label]")) {
        elemento.setAttribute("aria-label", traduzir(elemento.dataset.i18nAriaLabel));
    }

    for (const elemento of document.querySelectorAll("[data-localizar]")) {
        elemento.textContent = localizar(elemento.dataset.localizar);
    }

    for (const elemento of document.querySelectorAll("[data-localizar-aria-label]")) {
        elemento.setAttribute(
            "aria-label",
            localizar(elemento.dataset.localizarAriaLabel)
        );
    }

    for (const elemento of document.querySelectorAll("[data-localizar-title]")) {
        elemento.setAttribute("title", localizar(elemento.dataset.localizarTitle));
    }

    atualizarControleDeIdioma();
    atualizarBotoesDaMusica();
    atualizarControleDosEfeitos();
    atualizarControleDoModoDiaNoite();
    atualizarIndicadorFaseSelecionada();
    atualizarPortalFaseSecreta();
    atualizarResumoDasMissoesNoMenu();
    atualizarResumoDasConquistasNoMenu();
    atualizarIdentidadeDoApoiador();
    atualizarBotoesDeConstrucao();
    atualizarBotoesDaTorre();
    atualizarPainelDeBoosts();
    atualizarConteudoMenuAberto();

    if (!camadaConfirmacaoCompraLoja.hidden) {
        atualizarConfirmacaoDaCompraDaLoja();
    }

    if (tutorialAtivo) {
        atualizarPassoDoTutorial();
    }
}

function selecionarIdioma(novoIdioma) {
    if (!IDIOMAS_SUPORTADOS.includes(novoIdioma) || idiomaAtual === novoIdioma) {
        atualizarControleDeIdioma();
        return;
    }

    idiomaAtual = novoIdioma;
    salvarIdioma();
    aplicarIdiomaNaInterface();
}

function atualizarVolumeEfetivoDaMusica() {
    const volumeRelativoDaMusicaOriginal = trilhaPixeladaDaFase1Ativa
        ? CONFIG.audio.musicaPixeladaDaFase1.volumeRelativoDaMusicaOriginal
        : 1;
    musica.volume = volumeDaMusica * volumeRelativoDaMusicaOriginal;
}

function atualizarBotoesDaMusica() {
    const musicaTocando = trilhaDaConversaDoPortalAtiva
        ? musicaDaConversaDoPortalTocando && volumeDaMusica > 0
        : trilhaDoLobbyAtiva
        ? musicaDoLobbyTocando && volumeDaMusica > 0
        : trilhaDoDesertoAtiva
            ? musicaDoDesertoTocando && volumeDaMusica > 0
            : trilhaDoArticoAtiva
                ? musicaDoArticoTocando && volumeDaMusica > 0
                : trilhaDaSelvaAtiva
                    ? musicaDaSelvaTocando && volumeDaMusica > 0
                    : trilhaDoBosqueAtiva
                        ? musicaDoBosqueTocando && volumeDaMusica > 0
                        : trilhaDaForjaAtiva
                            ? musicaDaForjaTocando && volumeDaMusica > 0
                            : trilhaDoPantanoAtiva
                                ? musicaDoPantanoTocando && volumeDaMusica > 0
                                : trilhaDaDimensaoGlitchAtiva
                                    ? musicaDaDimensaoGlitchTocando && volumeDaMusica > 0
                                    : !musica.paused && volumeDaMusica > 0;
    botaoMusica.textContent = musicaTocando
        ? `🔇 ${traduzir("configuracoes.silenciarMusica")}`
        : `♪ ${traduzir("configuracoes.ativarMusica")}`;
    botaoMusica.setAttribute("aria-pressed", musicaTocando.toString());
}

function reproduzirMusica() {
    const tentativa = musica.play();

    if (tentativa) {
        tentativa.then(atualizarBotoesDaMusica).catch(atualizarBotoesDaMusica);
    }
}

function tocarMusica() {
    musicaPausadaPeloJogador = false;

    if (trilhaDaConversaDoPortalAtiva) {
        iniciarMusicaDaConversaDoPortal();
    } else if (trilhaDoLobbyAtiva) {
        iniciarMusicaDoLobby();
    } else if (trilhaDoDesertoAtiva) {
        iniciarMusicaDoDeserto();
    } else if (trilhaDoArticoAtiva) {
        iniciarMusicaDoArtico();
    } else if (trilhaDaSelvaAtiva) {
        iniciarMusicaDaSelva();
    } else if (trilhaDoBosqueAtiva) {
        iniciarMusicaDoBosque();
    } else if (trilhaDaForjaAtiva) {
        iniciarMusicaDaForja();
    } else if (trilhaDoPantanoAtiva) {
        iniciarMusicaDoPantano();
    } else if (trilhaDaDimensaoGlitchAtiva) {
        iniciarMusicaDaDimensaoGlitch();
    } else {
        reproduzirMusica();

        if (trilhaPixeladaDaFase1Ativa) {
            iniciarMusicaPixeladaDaFase1();
        }
    }
}

function alternarMusica() {
    const musicaTocando = trilhaDaConversaDoPortalAtiva
        ? musicaDaConversaDoPortalTocando && volumeDaMusica > 0
        : trilhaDoLobbyAtiva
        ? musicaDoLobbyTocando && volumeDaMusica > 0
        : trilhaDoDesertoAtiva
            ? musicaDoDesertoTocando && volumeDaMusica > 0
            : trilhaDoArticoAtiva
                ? musicaDoArticoTocando && volumeDaMusica > 0
                : trilhaDaSelvaAtiva
                    ? musicaDaSelvaTocando && volumeDaMusica > 0
                    : trilhaDoBosqueAtiva
                        ? musicaDoBosqueTocando && volumeDaMusica > 0
                        : trilhaDaForjaAtiva
                            ? musicaDaForjaTocando && volumeDaMusica > 0
                            : trilhaDoPantanoAtiva
                                ? musicaDoPantanoTocando && volumeDaMusica > 0
                                : trilhaDaDimensaoGlitchAtiva
                                    ? musicaDaDimensaoGlitchTocando && volumeDaMusica > 0
                                    : !musica.paused && volumeDaMusica > 0;

    if (!musicaTocando) {
        if (volumeDaMusica === 0) {
            volumeDaMusica = ultimoVolumeAudivel;
            atualizarVolumeEfetivoDaMusica();
            atualizarControleDeVolume();
        }

        tocarMusica();
    } else {
        musicaPausadaPeloJogador = true;

        if (trilhaDaConversaDoPortalAtiva) {
            pararMusicaDaConversaDoPortal();
        } else if (trilhaDoLobbyAtiva) {
            pararMusicaDoLobby();
        } else if (trilhaDoDesertoAtiva) {
            pararMusicaDoDeserto();
        } else if (trilhaDoArticoAtiva) {
            pararMusicaDoArtico();
        } else if (trilhaDaSelvaAtiva) {
            pararMusicaDaSelva();
        } else if (trilhaDoBosqueAtiva) {
            pararMusicaDoBosque();
        } else if (trilhaDaForjaAtiva) {
            pararMusicaDaForja();
        } else if (trilhaDoPantanoAtiva) {
            pararMusicaDoPantano();
        } else if (trilhaDaDimensaoGlitchAtiva) {
            pararMusicaDaDimensaoGlitch();
        } else {
            pararMusicaPixeladaDaFase1();
            musica.pause();
        }
    }

    atualizarBotoesDaMusica();
    salvarPreferencias();
}

function atualizarControleDeVolume() {
    const percentual = Math.round(volumeDaMusica * 100);
    controleVolumeMusica.value = percentual.toString();
    valorVolumeMusica.textContent = `${percentual}%`;
    atualizarBotoesDaMusica();
}

function ajustarVolumeDaMusica(valor) {
    const percentual = Math.max(0, Math.min(100, Number(valor) || 0));
    volumeDaMusica = percentual / 100;
    atualizarVolumeEfetivoDaMusica();

    if (volumeDaMusica > 0) {
        ultimoVolumeAudivel = volumeDaMusica;
    }

    atualizarGanhoDaMusicaDoDeserto();
    atualizarGanhoDaMusicaDoArtico();
    atualizarGanhoDaMusicaDaSelva();
    atualizarGanhoDaMusicaDoBosque();
    atualizarGanhoDaMusicaDaForja();
    atualizarGanhoDaMusicaDoPantano();
    atualizarGanhoDaMusicaDaDimensaoGlitch();
    atualizarGanhoDaMusicaDaConversaDoPortal();
    atualizarGanhoDaMusicaPixeladaDaFase1();
    atualizarGanhoDaMusicaDoLobby();

    if (trilhaDoLobbyAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDoLobby();
        } else if (!musicaPausadaPeloJogador && !musicaDoLobbyTocando) {
            iniciarMusicaDoLobby();
        }
    }

    if (trilhaDoDesertoAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDoDeserto();
        } else if (!musicaPausadaPeloJogador && !musicaDoDesertoTocando) {
            iniciarMusicaDoDeserto();
        }
    }

    if (trilhaDoArticoAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDoArtico();
        } else if (!musicaPausadaPeloJogador && !musicaDoArticoTocando) {
            iniciarMusicaDoArtico();
        }
    }

    if (trilhaDaSelvaAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDaSelva();
        } else if (!musicaPausadaPeloJogador && !musicaDaSelvaTocando) {
            iniciarMusicaDaSelva();
        }
    }

    if (trilhaDoBosqueAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDoBosque();
        } else if (!musicaPausadaPeloJogador && !musicaDoBosqueTocando) {
            iniciarMusicaDoBosque();
        }
    }

    if (trilhaDaForjaAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDaForja();
        } else if (!musicaPausadaPeloJogador && !musicaDaForjaTocando) {
            iniciarMusicaDaForja();
        }
    }

    if (trilhaDoPantanoAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDoPantano();
        } else if (!musicaPausadaPeloJogador && !musicaDoPantanoTocando) {
            iniciarMusicaDoPantano();
        }
    }

    if (trilhaDaDimensaoGlitchAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDaDimensaoGlitch();
        } else if (!musicaPausadaPeloJogador && !musicaDaDimensaoGlitchTocando) {
            iniciarMusicaDaDimensaoGlitch();
        }
    }

    if (trilhaDaConversaDoPortalAtiva) {
        if (volumeDaMusica === 0) {
            pararMusicaDaConversaDoPortal();
        } else if (!musicaPausadaPeloJogador && !musicaDaConversaDoPortalTocando) {
            iniciarMusicaDaConversaDoPortal();
        }
    }

    if (trilhaPixeladaDaFase1Ativa) {
        if (volumeDaMusica === 0) {
            pararMusicaPixeladaDaFase1();
        } else if (!musicaPausadaPeloJogador && !musicaPixeladaDaFase1Tocando) {
            iniciarMusicaPixeladaDaFase1();
        }
    }

    atualizarControleDeVolume();
    salvarPreferencias();
}

function atualizarControleDosEfeitos() {
    const percentual = Math.round(volumeDosEfeitos * 100);
    const efeitosAudiveis = efeitosSonorosAtivos && volumeDosEfeitos > 0;
    controleVolumeEfeitos.value = percentual.toString();
    valorVolumeEfeitos.textContent = `${percentual}%`;
    botaoEfeitosSonoros.textContent = efeitosAudiveis
        ? `🔊 ${traduzir("configuracoes.desativarEfeitos")}`
        : `♪ ${traduzir("configuracoes.ativarEfeitos")}`;
    botaoEfeitosSonoros.setAttribute("aria-pressed", efeitosAudiveis.toString());
}

function atualizarGanhoDosEfeitos() {
    if (audioDoRugidoAncestral) {
        audioDoRugidoAncestral.volume = efeitosSonorosAtivos
            ? Math.min(
                1,
                volumeDosEfeitos * CONFIG.audio.rugidoDoUrso.volumeRelativo
            )
            : 0;
    }

    if (!ganhoDosEfeitos || !contextoAudio) {
        return;
    }

    const volume = efeitosSonorosAtivos ? volumeDosEfeitos : 0;
    ganhoDosEfeitos.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.015);
}

function ajustarVolumeDosEfeitos(valor) {
    const percentual = Math.max(0, Math.min(100, Number(valor) || 0));
    volumeDosEfeitos = percentual / 100;

    if (volumeDosEfeitos > 0) {
        ultimoVolumeAudivelDosEfeitos = volumeDosEfeitos;
        efeitosSonorosAtivos = true;
    }

    atualizarGanhoDosEfeitos();
    atualizarControleDosEfeitos();
    salvarPreferencias();
}

function alternarEfeitosSonoros() {
    const efeitosAudiveis = efeitosSonorosAtivos && volumeDosEfeitos > 0;

    if (efeitosAudiveis) {
        efeitosSonorosAtivos = false;
    } else {
        efeitosSonorosAtivos = true;

        if (volumeDosEfeitos === 0) {
            volumeDosEfeitos = ultimoVolumeAudivelDosEfeitos
                || CONFIG.audio.volumeInicialDosEfeitos;
        }
    }

    atualizarGanhoDosEfeitos();
    atualizarControleDosEfeitos();
    salvarPreferencias();
}

function obterContextoAudio() {
    const ClasseDoContexto = window.AudioContext || window.webkitAudioContext;

    if (!ClasseDoContexto) {
        return null;
    }

    if (!contextoAudio) {
        contextoAudio = new ClasseDoContexto();
        ganhoDosEfeitos = contextoAudio.createGain();
        ganhoDaMusicaDoLobby = contextoAudio.createGain();
        ganhoDaMusicaDoDeserto = contextoAudio.createGain();
        ganhoDaMusicaDoArtico = contextoAudio.createGain();
        ganhoDaMusicaDaSelva = contextoAudio.createGain();
        ganhoDaMusicaDoBosque = contextoAudio.createGain();
        ganhoDaMusicaDaForja = contextoAudio.createGain();
        ganhoDaMusicaDoPantano = contextoAudio.createGain();
        ganhoDaMusicaDaDimensaoGlitch = contextoAudio.createGain();
        ganhoDaMusicaDaConversaDoPortal = contextoAudio.createGain();
        ganhoDaMusicaPixeladaDaFase1 = contextoAudio.createGain();
        ganhoDosEfeitos.gain.value = efeitosSonorosAtivos ? volumeDosEfeitos : 0;
        ganhoDosEfeitos.connect(contextoAudio.destination);
        ganhoDaMusicaDoLobby.connect(contextoAudio.destination);
        ganhoDaMusicaDoDeserto.connect(contextoAudio.destination);
        ganhoDaMusicaDoArtico.connect(contextoAudio.destination);
        ganhoDaMusicaDaSelva.connect(contextoAudio.destination);
        ganhoDaMusicaDoBosque.connect(contextoAudio.destination);
        ganhoDaMusicaDaForja.connect(contextoAudio.destination);
        ganhoDaMusicaDoPantano.connect(contextoAudio.destination);
        ganhoDaMusicaDaDimensaoGlitch.connect(contextoAudio.destination);
        ganhoDaMusicaDaConversaDoPortal.connect(contextoAudio.destination);
        ganhoDaMusicaPixeladaDaFase1.connect(contextoAudio.destination);
        atualizarGanhoDaMusicaDoDeserto();
        atualizarGanhoDaMusicaDoArtico();
        atualizarGanhoDaMusicaDaSelva();
        atualizarGanhoDaMusicaDoBosque();
        atualizarGanhoDaMusicaDaForja();
        atualizarGanhoDaMusicaDoPantano();
        atualizarGanhoDaMusicaDaDimensaoGlitch();
        atualizarGanhoDaMusicaDaConversaDoPortal();
        atualizarGanhoDaMusicaPixeladaDaFase1();
        atualizarGanhoDaMusicaDoLobby();
    }

    if (contextoAudio.state === "suspended") {
        const retomada = contextoAudio.resume();

        if (retomada) {
            retomada.catch(() => {});
        }
    }

    return contextoAudio;
}

function atualizarGanhoDaMusicaDoDeserto() {
    if (!ganhoDaMusicaDoDeserto || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaDoDeserto.volumeRelativo;
    ganhoDaMusicaDoDeserto.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.02);
}

function atualizarGanhoDaMusicaDoArtico() {
    if (!ganhoDaMusicaDoArtico || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaDoArtico.volumeRelativo;
    ganhoDaMusicaDoArtico.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.02);
}

function atualizarGanhoDaMusicaDaSelva() {
    if (!ganhoDaMusicaDaSelva || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * obterConfiguracaoDaMusicaDaSelva().volumeRelativo;
    ganhoDaMusicaDaSelva.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.02);
}

function obterConfiguracaoDaMusicaDaSelva() {
    const tema = obterFaseAtual().tema;

    if (tema === "futurista") {
        return CONFIG.audio.musicaDaMetropoleNeon;
    }

    return tema === "primordial"
        ? CONFIG.audio.musicaDaSelvaPrimordial
        : CONFIG.audio.musicaDaSelva;
}

function atualizarGanhoDaMusicaDoBosque() {
    if (!ganhoDaMusicaDoBosque || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaDoBosque.volumeRelativo;
    ganhoDaMusicaDoBosque.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.02);
}

function atualizarGanhoDaMusicaDaForja() {
    if (!ganhoDaMusicaDaForja || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaDaForja.volumeRelativo;
    ganhoDaMusicaDaForja.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.02);
}

function atualizarGanhoDaMusicaDoPantano() {
    if (!ganhoDaMusicaDoPantano || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaDoPantano.volumeRelativo;
    ganhoDaMusicaDoPantano.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.02);
}

function atualizarGanhoDaMusicaDaDimensaoGlitch() {
    if (!ganhoDaMusicaDaDimensaoGlitch || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaDaDimensaoGlitch.volumeRelativo;
    ganhoDaMusicaDaDimensaoGlitch.gain.setTargetAtTime(
        volume,
        contextoAudio.currentTime,
        0.02
    );
}

function atualizarGanhoDaMusicaDaConversaDoPortal() {
    if (!ganhoDaMusicaDaConversaDoPortal || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaDaConversaDoPortal.volumeRelativo;
    ganhoDaMusicaDaConversaDoPortal.gain.setTargetAtTime(
        volume,
        contextoAudio.currentTime,
        0.08
    );
}

function atualizarGanhoDaMusicaDoLobby() {
    if (!ganhoDaMusicaDoLobby || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaDoLobby.volumeRelativo;
    ganhoDaMusicaDoLobby.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.02);
}

function atualizarGanhoDaMusicaPixeladaDaFase1() {
    if (!ganhoDaMusicaPixeladaDaFase1 || !contextoAudio) {
        return;
    }

    const volume = volumeDaMusica * CONFIG.audio.musicaPixeladaDaFase1.volumeRelativo;
    ganhoDaMusicaPixeladaDaFase1.gain.setTargetAtTime(volume, contextoAudio.currentTime, 0.02);
}

function tocarNotaSintetizada(frequencia, inicio, duracao, tipo, volume, destino, frequenciaFinal = frequencia) {
    const audio = obterContextoAudio();

    if (!audio || !destino) {
        return;
    }

    const oscilador = audio.createOscillator();
    const envelope = audio.createGain();
    const fim = inicio + duracao;

    oscilador.type = tipo;
    oscilador.frequency.setValueAtTime(frequencia, inicio);
    oscilador.frequency.exponentialRampToValueAtTime(Math.max(1, frequenciaFinal), fim);
    envelope.gain.setValueAtTime(0.0001, inicio);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), inicio + 0.015);
    envelope.gain.exponentialRampToValueAtTime(0.0001, fim);
    oscilador.connect(envelope);
    envelope.connect(destino);
    oscilador.start(inicio);
    oscilador.stop(fim + 0.02);
}

function tocarRuidoSintetizado(inicio, duracao, volume, frequenciaDoFiltro, destino) {
    const audio = obterContextoAudio();

    if (!audio || !destino) {
        return;
    }

    const quantidade = Math.max(1, Math.floor(audio.sampleRate * duracao));
    const buffer = audio.createBuffer(1, quantidade, audio.sampleRate);
    const dados = buffer.getChannelData(0);

    for (let indice = 0; indice < quantidade; indice++) {
        dados[indice] = Math.random() * 2 - 1;
    }

    const fonte = audio.createBufferSource();
    const filtro = audio.createBiquadFilter();
    const envelope = audio.createGain();
    const fim = inicio + duracao;

    fonte.buffer = buffer;
    filtro.type = "lowpass";
    filtro.frequency.value = frequenciaDoFiltro;
    envelope.gain.setValueAtTime(Math.max(0.0001, volume), inicio);
    envelope.gain.exponentialRampToValueAtTime(0.0001, fim);
    fonte.connect(filtro);
    filtro.connect(envelope);
    envelope.connect(destino);
    fonte.start(inicio);
    fonte.stop(fim + 0.02);
}

function tocarEfeitoTorreDestruida() {
    if (!efeitosSonorosAtivos || volumeDosEfeitos === 0) {
        return;
    }

    const audio = obterContextoAudio();

    if (!audio) {
        return;
    }

    const agora = audio.currentTime;
    tocarNotaSintetizada(190, agora, 0.48, "sawtooth", 0.28, ganhoDosEfeitos, 48);
    tocarNotaSintetizada(420, agora + 0.02, 0.24, "square", 0.16, ganhoDosEfeitos, 85);
    tocarRuidoSintetizado(agora, 0.38, 0.2, 1300, ganhoDosEfeitos);
}

function tocarEfeitoGameOver() {
    if (!efeitosSonorosAtivos || volumeDosEfeitos === 0) {
        return;
    }

    const audio = obterContextoAudio();

    if (!audio) {
        return;
    }

    const agora = audio.currentTime;
    const notas = [261.63, 196, 155.56, 130.81];

    notas.forEach((nota, indice) => {
        tocarNotaSintetizada(nota, agora + indice * 0.2, 0.32, "square", 0.16, ganhoDosEfeitos, nota * 0.82);
    });
}

function tocarEfeitoVitoria() {
    if (!efeitosSonorosAtivos || volumeDosEfeitos === 0) {
        return;
    }

    const audio = obterContextoAudio();

    if (!audio) {
        return;
    }

    const agora = audio.currentTime;
    const notas = [329.63, 415.3, 493.88, 659.25, 830.61];

    notas.forEach((nota, indice) => {
        tocarNotaSintetizada(nota, agora + indice * 0.13, 0.38, "square", 0.13, ganhoDosEfeitos);
    });
}

function tocarEfeitoTeleporteGlitch() {
    if (!efeitosSonorosAtivos || volumeDosEfeitos === 0) {
        return;
    }

    const audio = obterContextoAudio();

    if (!audio) {
        return;
    }

    const configuracao = CONFIG.audio.teleporteGlitch;
    const agora = audio.currentTime;

    configuracao.frequencias.forEach((frequencia, indice) => {
        tocarNotaSintetizada(
            frequencia,
            agora + indice * configuracao.intervaloEntreNotas,
            configuracao.duracaoDaNota,
            indice % 2 === 0 ? "square" : "sawtooth",
            configuracao.volumeDaNota,
            ganhoDosEfeitos,
            Math.max(1, frequencia * (indice % 2 === 0 ? 0.22 : 2.4))
        );
    });
    tocarRuidoSintetizado(
        agora,
        configuracao.duracaoDoRuido,
        configuracao.volumeDoRuido,
        configuracao.frequenciaDoFiltro,
        ganhoDosEfeitos
    );
}

function obterAudioDoRugidoAncestral() {
    if (typeof Audio !== "function") {
        return null;
    }

    if (!audioDoRugidoAncestral) {
        audioDoRugidoAncestral = new Audio(CONFIG.audio.rugidoDoUrso.arquivo);
        audioDoRugidoAncestral.preload = "auto";
    }

    atualizarGanhoDosEfeitos();
    return audioDoRugidoAncestral;
}

function tocarEfeitoRugidoAncestral() {
    if (!efeitosSonorosAtivos || volumeDosEfeitos === 0) {
        return;
    }

    const audio = obterAudioDoRugidoAncestral();

    if (!audio) {
        return;
    }

    audio.pause();
    audio.currentTime = 0;
    const tentativa = audio.play();

    if (tentativa) {
        tentativa.catch(() => {});
    }
}

function iniciarSequenciaMusical(tocarPasso, intervaloDoPasso) {
    tocarPasso();
    return setInterval(tocarPasso, intervaloDoPasso);
}

function pararSequenciaMusical(intervalo) {
    if (intervalo !== null) {
        clearInterval(intervalo);
    }

    return null;
}

function tocarPassoDaMusicaDoLobby() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDoLobbyTocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaDoLobby;
    const nota = configuracao.melodia[passoDaMusicaDoLobby % configuracao.melodia.length];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(nota, agora, duracaoDoPasso * 1.45, "square", 0.085, ganhoDaMusicaDoLobby);
    tocarNotaSintetizada(nota / 2, agora, duracaoDoPasso * 1.8, "triangle", 0.035, ganhoDaMusicaDoLobby);

    if (passoDaMusicaDoLobby % 4 === 0) {
        const indiceDoBaixo = Math.floor(passoDaMusicaDoLobby / 4) % configuracao.baixo.length;
        const notaDoBaixo = configuracao.baixo[indiceDoBaixo];
        tocarNotaSintetizada(notaDoBaixo, agora, duracaoDoPasso * 3.6, "triangle", 0.06, ganhoDaMusicaDoLobby);
    }

    if (passoDaMusicaDoLobby % 4 === 2) {
        tocarRuidoSintetizado(agora, 0.04, 0.018, 1450, ganhoDaMusicaDoLobby);
    }

    passoDaMusicaDoLobby = (passoDaMusicaDoLobby + 1) % configuracao.melodia.length;
}

function iniciarMusicaDoLobby() {
    if (
        !trilhaDoLobbyAtiva
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaDoLobbyTocando
    ) {
        return;
    }

    const audio = obterContextoAudio();

    if (!audio) {
        return;
    }

    if (audio.state !== "running") {
        const retomada = audio.resume();

        if (retomada) {
            retomada.then(iniciarMusicaDoLobby).catch(() => {});
        }

        return;
    }

    musicaDoLobbyTocando = true;
    passoDaMusicaDoLobby = 0;
    atualizarGanhoDaMusicaDoLobby();
    intervaloDaMusicaDoLobby = iniciarSequenciaMusical(
        tocarPassoDaMusicaDoLobby,
        CONFIG.audio.musicaDoLobby.intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDoLobby() {
    intervaloDaMusicaDoLobby = pararSequenciaMusical(intervaloDaMusicaDoLobby);
    musicaDoLobbyTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaDoDeserto() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDoDesertoTocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaDoDeserto;
    const nota = configuracao.melodia[passoDaMusicaDoDeserto % configuracao.melodia.length];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(nota, agora, duracaoDoPasso * 0.88, "square", 0.17, ganhoDaMusicaDoDeserto, nota * 0.995);
    tocarNotaSintetizada(nota / 2, agora, duracaoDoPasso * 1.7, "triangle", 0.1, ganhoDaMusicaDoDeserto);

    if (passoDaMusicaDoDeserto % 4 === 0) {
        tocarNotaSintetizada(82.41, agora, duracaoDoPasso * 3.7, "sawtooth", 0.08, ganhoDaMusicaDoDeserto, 80);
    }

    if (passoDaMusicaDoDeserto % 2 === 0) {
        tocarRuidoSintetizado(agora, 0.06, 0.055, 850, ganhoDaMusicaDoDeserto);
    }

    passoDaMusicaDoDeserto = (passoDaMusicaDoDeserto + 1) % configuracao.melodia.length;
}

function iniciarMusicaDoDeserto() {
    if (musicaPausadaPeloJogador || volumeDaMusica === 0 || musicaDoDesertoTocando) {
        return;
    }

    if (!obterContextoAudio()) {
        return;
    }

    musicaDoDesertoTocando = true;
    passoDaMusicaDoDeserto = 0;
    atualizarGanhoDaMusicaDoDeserto();
    intervaloDaMusicaDoDeserto = iniciarSequenciaMusical(
        tocarPassoDaMusicaDoDeserto,
        CONFIG.audio.musicaDoDeserto.intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDoDeserto() {
    intervaloDaMusicaDoDeserto = pararSequenciaMusical(intervaloDaMusicaDoDeserto);
    musicaDoDesertoTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaDoArtico() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDoArticoTocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaDoArtico;
    const nota = configuracao.melodia[passoDaMusicaDoArtico % configuracao.melodia.length];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(
        nota,
        agora,
        duracaoDoPasso * 1.35,
        "triangle",
        0.075,
        ganhoDaMusicaDoArtico,
        nota * 1.004
    );

    if (passoDaMusicaDoArtico % 2 === 0) {
        tocarNotaSintetizada(
            nota * 2,
            agora + duracaoDoPasso * 0.1,
            duracaoDoPasso * 0.62,
            "sine",
            0.035,
            ganhoDaMusicaDoArtico,
            nota * 2.015
        );
    }

    if (passoDaMusicaDoArtico % 4 === 0) {
        const indiceDoBaixo = Math.floor(passoDaMusicaDoArtico / 4)
            % configuracao.baixo.length;
        tocarNotaSintetizada(
            configuracao.baixo[indiceDoBaixo],
            agora,
            duracaoDoPasso * 3.7,
            "sine",
            0.085,
            ganhoDaMusicaDoArtico
        );
        tocarRuidoSintetizado(agora, 0.18, 0.009, 3200, ganhoDaMusicaDoArtico);
    }

    passoDaMusicaDoArtico = (passoDaMusicaDoArtico + 1)
        % configuracao.melodia.length;
}

function iniciarMusicaDoArtico() {
    if (
        !trilhaDoArticoAtiva
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaDoArticoTocando
        || !obterContextoAudio()
    ) {
        return;
    }

    musicaDoArticoTocando = true;
    passoDaMusicaDoArtico = 0;
    atualizarGanhoDaMusicaDoArtico();
    intervaloDaMusicaDoArtico = iniciarSequenciaMusical(
        tocarPassoDaMusicaDoArtico,
        CONFIG.audio.musicaDoArtico.intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDoArtico() {
    intervaloDaMusicaDoArtico = pararSequenciaMusical(intervaloDaMusicaDoArtico);
    musicaDoArticoTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaDaSelva() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDaSelvaTocando) {
        return;
    }

    const configuracao = obterConfiguracaoDaMusicaDaSelva();
    const indice = passoDaMusicaDaSelva % configuracao.melodia.length;
    const nota = configuracao.melodia[indice];
    const intensidadeDaPercussao = configuracao.percussao[
        passoDaMusicaDaSelva % configuracao.percussao.length
    ];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(
        nota,
        agora,
        duracaoDoPasso * 0.72,
        "square",
        0.085,
        ganhoDaMusicaDaSelva,
        nota * 0.992
    );

    if (passoDaMusicaDaSelva % 2 === 0) {
        tocarNotaSintetizada(
            nota / 2,
            agora,
            duracaoDoPasso * 1.65,
            "triangle",
            0.05,
            ganhoDaMusicaDaSelva,
            nota / 2.02
        );
    }

    if (passoDaMusicaDaSelva % 4 === 0) {
        const indiceDoBaixo = Math.floor(passoDaMusicaDaSelva / 4)
            % configuracao.baixo.length;
        const notaDoBaixo = configuracao.baixo[indiceDoBaixo];
        tocarNotaSintetizada(
            notaDoBaixo,
            agora,
            duracaoDoPasso * 3.7,
            "sawtooth",
            0.075,
            ganhoDaMusicaDaSelva,
            notaDoBaixo * 0.985
        );
        tocarNotaSintetizada(
            65.41,
            agora,
            0.13,
            "sine",
            0.12,
            ganhoDaMusicaDaSelva,
            43.65
        );
    }

    if (intensidadeDaPercussao > 0) {
        const batidaGrave = passoDaMusicaDaSelva % 4 === 0;
        tocarRuidoSintetizado(
            agora,
            batidaGrave ? 0.11 : 0.045,
            intensidadeDaPercussao * (batidaGrave ? 0.085 : 0.04),
            batidaGrave ? 320 : 1500,
            ganhoDaMusicaDaSelva
        );
    }

    if (passoDaMusicaDaSelva % 8 === 5) {
        tocarNotaSintetizada(
            nota * 2,
            agora,
            duracaoDoPasso * 0.42,
            "square",
            0.03,
            ganhoDaMusicaDaSelva,
            nota * 2.5
        );
    }

    passoDaMusicaDaSelva = (passoDaMusicaDaSelva + 1)
        % configuracao.melodia.length;
}

function iniciarMusicaDaSelva() {
    if (
        !trilhaDaSelvaAtiva
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaDaSelvaTocando
    ) {
        return;
    }

    if (!obterContextoAudio()) {
        return;
    }

    musicaDaSelvaTocando = true;
    passoDaMusicaDaSelva = 0;
    atualizarGanhoDaMusicaDaSelva();
    intervaloDaMusicaDaSelva = iniciarSequenciaMusical(
        tocarPassoDaMusicaDaSelva,
        obterConfiguracaoDaMusicaDaSelva().intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDaSelva() {
    intervaloDaMusicaDaSelva = pararSequenciaMusical(intervaloDaMusicaDaSelva);
    musicaDaSelvaTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaDoBosque() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDoBosqueTocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaDoBosque;
    const nota = configuracao.melodia[passoDaMusicaDoBosque % configuracao.melodia.length];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(
        nota,
        agora,
        duracaoDoPasso * 1.08,
        "triangle",
        0.075,
        ganhoDaMusicaDoBosque,
        nota * 0.996
    );

    if (passoDaMusicaDoBosque % 2 === 0) {
        tocarNotaSintetizada(
            nota * 1.5,
            agora + duracaoDoPasso * 0.08,
            duracaoDoPasso * 0.52,
            "square",
            0.022,
            ganhoDaMusicaDoBosque
        );
    }

    if (passoDaMusicaDoBosque % 4 === 0) {
        const indiceDoBaixo = Math.floor(passoDaMusicaDoBosque / 4) % configuracao.baixo.length;
        tocarNotaSintetizada(
            configuracao.baixo[indiceDoBaixo],
            agora,
            duracaoDoPasso * 3.65,
            "sine",
            0.09,
            ganhoDaMusicaDoBosque
        );
    }

    if (passoDaMusicaDoBosque % 2 === 1) {
        tocarRuidoSintetizado(agora, duracaoDoPasso * 0.2, 0.012, 1900, ganhoDaMusicaDoBosque);
    }

    passoDaMusicaDoBosque = (passoDaMusicaDoBosque + 1) % configuracao.melodia.length;
}

function iniciarMusicaDoBosque() {
    if (
        !trilhaDoBosqueAtiva
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaDoBosqueTocando
        || !obterContextoAudio()
    ) {
        return;
    }

    musicaDoBosqueTocando = true;
    passoDaMusicaDoBosque = 0;
    atualizarGanhoDaMusicaDoBosque();
    intervaloDaMusicaDoBosque = iniciarSequenciaMusical(
        tocarPassoDaMusicaDoBosque,
        CONFIG.audio.musicaDoBosque.intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDoBosque() {
    intervaloDaMusicaDoBosque = pararSequenciaMusical(intervaloDaMusicaDoBosque);
    musicaDoBosqueTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaDaForja() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDaForjaTocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaDaForja;
    const nota = configuracao.melodia[passoDaMusicaDaForja % configuracao.melodia.length];
    const intensidadeDaPercussao = configuracao.percussao[
        passoDaMusicaDaForja % configuracao.percussao.length
    ];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(
        nota,
        agora,
        duracaoDoPasso * 0.86,
        "sawtooth",
        0.08,
        ganhoDaMusicaDaForja,
        nota * 0.985
    );

    if (passoDaMusicaDaForja % 2 === 0) {
        tocarNotaSintetizada(
            nota * 2,
            agora,
            duracaoDoPasso * 0.45,
            "square",
            0.025,
            ganhoDaMusicaDaForja
        );
    }

    if (passoDaMusicaDaForja % 4 === 0) {
        const indiceDoBaixo = Math.floor(passoDaMusicaDaForja / 4)
            % configuracao.baixo.length;
        const notaDoBaixo = configuracao.baixo[indiceDoBaixo];
        tocarNotaSintetizada(
            notaDoBaixo,
            agora,
            duracaoDoPasso * 3.7,
            "sawtooth",
            0.1,
            ganhoDaMusicaDaForja,
            notaDoBaixo * 0.97
        );
    }

    tocarRuidoSintetizado(
        agora,
        passoDaMusicaDaForja % 4 === 0 ? 0.12 : 0.045,
        intensidadeDaPercussao * 0.055,
        passoDaMusicaDaForja % 4 === 0 ? 420 : 1700,
        ganhoDaMusicaDaForja
    );
    passoDaMusicaDaForja = (passoDaMusicaDaForja + 1) % configuracao.melodia.length;
}

function iniciarMusicaDaForja() {
    if (
        !trilhaDaForjaAtiva
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaDaForjaTocando
        || !obterContextoAudio()
    ) {
        return;
    }

    musicaDaForjaTocando = true;
    passoDaMusicaDaForja = 0;
    atualizarGanhoDaMusicaDaForja();
    intervaloDaMusicaDaForja = iniciarSequenciaMusical(
        tocarPassoDaMusicaDaForja,
        CONFIG.audio.musicaDaForja.intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDaForja() {
    intervaloDaMusicaDaForja = pararSequenciaMusical(intervaloDaMusicaDaForja);
    musicaDaForjaTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaDoPantano() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDoPantanoTocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaDoPantano;
    const indice = passoDaMusicaDoPantano % configuracao.melodia.length;
    const nota = configuracao.melodia[indice];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(
        nota,
        agora,
        duracaoDoPasso * 1.25,
        "triangle",
        0.065,
        ganhoDaMusicaDoPantano,
        nota * 0.992
    );

    if (indice % 4 === 0) {
        const notaDoBaixo = configuracao.baixo[(indice / 4) % configuracao.baixo.length];
        tocarNotaSintetizada(
            notaDoBaixo,
            agora,
            duracaoDoPasso * 3.8,
            "sine",
            0.105,
            ganhoDaMusicaDoPantano,
            notaDoBaixo * 0.975
        );
    }

    if (indice % 2 === 1) {
        tocarNotaSintetizada(
            nota * 2,
            agora + duracaoDoPasso * 0.58,
            duracaoDoPasso * 0.16,
            "sine",
            0.025,
            ganhoDaMusicaDoPantano,
            nota * 2.04
        );
    }

    tocarRuidoSintetizado(
        agora,
        indice % 4 === 0 ? 0.12 : 0.045,
        configuracao.percussao[indice % configuracao.percussao.length] * 0.04,
        indice % 4 === 0 ? 360 : 1250,
        ganhoDaMusicaDoPantano
    );
    passoDaMusicaDoPantano = (passoDaMusicaDoPantano + 1) % configuracao.melodia.length;
}

function iniciarMusicaDoPantano() {
    if (
        !trilhaDoPantanoAtiva
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaDoPantanoTocando
        || !obterContextoAudio()
    ) {
        return;
    }

    musicaDoPantanoTocando = true;
    passoDaMusicaDoPantano = 0;
    atualizarGanhoDaMusicaDoPantano();
    intervaloDaMusicaDoPantano = iniciarSequenciaMusical(
        tocarPassoDaMusicaDoPantano,
        CONFIG.audio.musicaDoPantano.intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDoPantano() {
    intervaloDaMusicaDoPantano = pararSequenciaMusical(intervaloDaMusicaDoPantano);
    musicaDoPantanoTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaDaDimensaoGlitch() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDaDimensaoGlitchTocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaDaDimensaoGlitch;
    const indice = passoDaMusicaDaDimensaoGlitch % configuracao.melodia.length;
    const nota = configuracao.melodia[indice];
    const intensidadeDoCorte = configuracao.intensidadeDosCortes[indice];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;
    const passoInterrompido = indice === 5 || indice === 13;
    const desvioDaNota = indice % 3 === 0 ? 0.965 : 1.012;

    tocarNotaSintetizada(
        nota,
        agora,
        duracaoDoPasso * (passoInterrompido ? 0.34 : 1.12),
        "triangle",
        0.07,
        ganhoDaMusicaDaDimensaoGlitch,
        nota * desvioDaNota
    );

    if (indice % 2 === 0) {
        tocarNotaSintetizada(
            nota * 2.01,
            agora + duracaoDoPasso * 0.08,
            duracaoDoPasso * 0.38,
            "square",
            0.022,
            ganhoDaMusicaDaDimensaoGlitch,
            nota * 1.94
        );
    }

    if (indice % 4 === 0) {
        const indiceDoBaixo = Math.floor(indice / 4) % configuracao.baixo.length;
        const notaDoBaixo = configuracao.baixo[indiceDoBaixo];
        tocarNotaSintetizada(
            notaDoBaixo,
            agora,
            duracaoDoPasso * 3.65,
            "sine",
            0.105,
            ganhoDaMusicaDaDimensaoGlitch,
            notaDoBaixo * 0.94
        );
    }

    if (intensidadeDoCorte > 0) {
        tocarRuidoSintetizado(
            agora + duracaoDoPasso * 0.52,
            0.025 + intensidadeDoCorte * 0.055,
            intensidadeDoCorte * 0.035,
            900 + intensidadeDoCorte * 2600,
            ganhoDaMusicaDaDimensaoGlitch
        );
    }

    if (indice === 7 || indice === 15) {
        for (let repeticao = 0; repeticao < 3; repeticao++) {
            tocarNotaSintetizada(
                nota * 2,
                agora + duracaoDoPasso * (0.48 + repeticao * 0.13),
                0.035,
                "square",
                0.03 - repeticao * 0.006,
                ganhoDaMusicaDaDimensaoGlitch,
                nota * (2.15 + repeticao * 0.08)
            );
        }
    }

    passoDaMusicaDaDimensaoGlitch = (passoDaMusicaDaDimensaoGlitch + 1)
        % configuracao.melodia.length;
}

function iniciarMusicaDaDimensaoGlitch() {
    if (
        !trilhaDaDimensaoGlitchAtiva
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaDaDimensaoGlitchTocando
        || !obterContextoAudio()
    ) {
        return;
    }

    musicaDaDimensaoGlitchTocando = true;
    passoDaMusicaDaDimensaoGlitch = 0;
    atualizarGanhoDaMusicaDaDimensaoGlitch();
    intervaloDaMusicaDaDimensaoGlitch = iniciarSequenciaMusical(
        tocarPassoDaMusicaDaDimensaoGlitch,
        CONFIG.audio.musicaDaDimensaoGlitch.intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDaDimensaoGlitch() {
    intervaloDaMusicaDaDimensaoGlitch = pararSequenciaMusical(
        intervaloDaMusicaDaDimensaoGlitch
    );
    musicaDaDimensaoGlitchTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaDaConversaDoPortal() {
    const audio = obterContextoAudio();

    if (!audio || !musicaDaConversaDoPortalTocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaDaConversaDoPortal;
    const indice = passoDaMusicaDaConversaDoPortal % configuracao.melodia.length;
    const nota = configuracao.melodia[indice];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(
        nota,
        agora,
        duracaoDoPasso * 2.7,
        "sine",
        0.08,
        ganhoDaMusicaDaConversaDoPortal,
        nota * 0.91
    );

    if (indice % 2 === 0) {
        tocarNotaSintetizada(
            nota * 1.414,
            agora + duracaoDoPasso * 0.18,
            duracaoDoPasso * 1.5,
            "triangle",
            0.032,
            ganhoDaMusicaDaConversaDoPortal,
            nota * 1.36
        );
    }

    if (indice === 0 || indice === 4) {
        const notaGrave = configuracao.baixo[indice === 0 ? 0 : 1];
        tocarNotaSintetizada(
            notaGrave,
            agora,
            duracaoDoPasso * 4.2,
            "sine",
            0.12,
            ganhoDaMusicaDaConversaDoPortal,
            notaGrave * 0.96
        );
    }

    if (indice === 2 || indice === 6) {
        tocarRuidoSintetizado(
            agora + duracaoDoPasso * 0.58,
            0.2,
            0.018,
            540,
            ganhoDaMusicaDaConversaDoPortal
        );
    }

    passoDaMusicaDaConversaDoPortal = (passoDaMusicaDaConversaDoPortal + 1)
        % configuracao.melodia.length;
}

function iniciarMusicaDaConversaDoPortal() {
    if (
        !trilhaDaConversaDoPortalAtiva
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaDaConversaDoPortalTocando
        || !obterContextoAudio()
    ) {
        return;
    }

    musicaDaConversaDoPortalTocando = true;
    passoDaMusicaDaConversaDoPortal = 0;
    atualizarGanhoDaMusicaDaConversaDoPortal();
    intervaloDaMusicaDaConversaDoPortal = iniciarSequenciaMusical(
        tocarPassoDaMusicaDaConversaDoPortal,
        CONFIG.audio.musicaDaConversaDoPortal.intervaloDoPasso
    );
    atualizarBotoesDaMusica();
}

function pararMusicaDaConversaDoPortal() {
    intervaloDaMusicaDaConversaDoPortal = pararSequenciaMusical(
        intervaloDaMusicaDaConversaDoPortal
    );
    musicaDaConversaDoPortalTocando = false;
    atualizarBotoesDaMusica();
}

function tocarPassoDaMusicaPixeladaDaFase1() {
    const audio = obterContextoAudio();

    if (!audio || !musicaPixeladaDaFase1Tocando) {
        return;
    }

    const configuracao = CONFIG.audio.musicaPixeladaDaFase1;
    const indiceDaMelodia = passoDaMusicaPixeladaDaFase1 % configuracao.melodia.length;
    const nota = configuracao.melodia[indiceDaMelodia];
    const agora = audio.currentTime;
    const duracaoDoPasso = configuracao.intervaloDoPasso / 1000;

    tocarNotaSintetizada(
        nota,
        agora,
        duracaoDoPasso * 0.9,
        "square",
        0.11,
        ganhoDaMusicaPixeladaDaFase1,
        nota * 0.997
    );

    if (passoDaMusicaPixeladaDaFase1 % 2 === 0) {
        tocarNotaSintetizada(
            nota / 2,
            agora,
            duracaoDoPasso * 1.7,
            "triangle",
            0.04,
            ganhoDaMusicaPixeladaDaFase1
        );
    } else {
        tocarRuidoSintetizado(agora, 0.045, 0.025, 1100, ganhoDaMusicaPixeladaDaFase1);
    }

    if (passoDaMusicaPixeladaDaFase1 % 4 === 0) {
        const indiceDoBaixo = Math.floor(passoDaMusicaPixeladaDaFase1 / 4)
            % configuracao.baixo.length;
        const notaDoBaixo = configuracao.baixo[indiceDoBaixo];
        tocarNotaSintetizada(
            notaDoBaixo,
            agora,
            duracaoDoPasso * 3.5,
            "triangle",
            0.075,
            ganhoDaMusicaPixeladaDaFase1,
            notaDoBaixo * 0.995
        );
    }

    passoDaMusicaPixeladaDaFase1 = (passoDaMusicaPixeladaDaFase1 + 1)
        % configuracao.melodia.length;
}

function iniciarMusicaPixeladaDaFase1() {
    if (
        !trilhaPixeladaDaFase1Ativa
        || musicaPausadaPeloJogador
        || volumeDaMusica === 0
        || musicaPixeladaDaFase1Tocando
    ) {
        return;
    }

    if (!obterContextoAudio()) {
        return;
    }

    musicaPixeladaDaFase1Tocando = true;
    passoDaMusicaPixeladaDaFase1 = 0;
    atualizarGanhoDaMusicaPixeladaDaFase1();
    intervaloDaMusicaPixeladaDaFase1 = iniciarSequenciaMusical(
        tocarPassoDaMusicaPixeladaDaFase1,
        CONFIG.audio.musicaPixeladaDaFase1.intervaloDoPasso
    );
}

function pararMusicaPixeladaDaFase1() {
    intervaloDaMusicaPixeladaDaFase1 = pararSequenciaMusical(intervaloDaMusicaPixeladaDaFase1);
    musicaPixeladaDaFase1Tocando = false;
}

function selecionarTrilhaDaPartida() {
    const faseAtual = obterFaseAtual();
    trilhaDoLobbyAtiva = false;
    trilhaDaConversaDoPortalAtiva = false;
    trilhaDoDesertoAtiva = faseAtual.tema === "deserto";
    trilhaDoArticoAtiva = faseAtual.tema === "artico";
    trilhaDaSelvaAtiva = ["selva", "primordial", "futurista"].includes(faseAtual.tema);
    trilhaDoBosqueAtiva = faseAtual.tema === "temperada";
    trilhaDaForjaAtiva = faseAtual.tema === "vulcanica";
    trilhaDoPantanoAtiva = faseAtual.tema === "pantano";
    trilhaDaDimensaoGlitchAtiva = faseAtual.tema === "glitch";
    trilhaPixeladaDaFase1Ativa = faseAtual.numero === 1;
    atualizarVolumeEfetivoDaMusica();
    pararMusicaDoLobby();
    pararMusicaDaConversaDoPortal();

    if (trilhaDoDesertoAtiva) {
        pararMusicaDoArtico();
        pararMusicaDaSelva();
        pararMusicaDoBosque();
        pararMusicaDaForja();
        pararMusicaDoPantano();
        pararMusicaDaDimensaoGlitch();
        pararMusicaPixeladaDaFase1();

        if (!obterContextoAudio()) {
            trilhaDoDesertoAtiva = false;

            if (!musicaPausadaPeloJogador && volumeDaMusica > 0 && musica.paused) {
                reproduzirMusica();
            }

            return;
        }

        musica.pause();
        iniciarMusicaDoDeserto();
    } else if (trilhaDoArticoAtiva) {
        pararMusicaDoDeserto();
        pararMusicaDaSelva();
        pararMusicaDoBosque();
        pararMusicaDaForja();
        pararMusicaDoPantano();
        pararMusicaDaDimensaoGlitch();
        pararMusicaPixeladaDaFase1();

        if (!obterContextoAudio()) {
            trilhaDoArticoAtiva = false;

            if (!musicaPausadaPeloJogador && volumeDaMusica > 0 && musica.paused) {
                reproduzirMusica();
            }

            return;
        }

        musica.pause();
        iniciarMusicaDoArtico();
    } else if (trilhaDaSelvaAtiva) {
        pararMusicaDoDeserto();
        pararMusicaDoArtico();
        pararMusicaDoBosque();
        pararMusicaDaForja();
        pararMusicaDoPantano();
        pararMusicaDaDimensaoGlitch();
        pararMusicaPixeladaDaFase1();

        if (!obterContextoAudio()) {
            trilhaDaSelvaAtiva = false;

            if (!musicaPausadaPeloJogador && volumeDaMusica > 0 && musica.paused) {
                reproduzirMusica();
            }

            return;
        }

        musica.pause();
        iniciarMusicaDaSelva();
    } else if (trilhaDoBosqueAtiva) {
        pararMusicaDoDeserto();
        pararMusicaDoArtico();
        pararMusicaDaSelva();
        pararMusicaDaForja();
        pararMusicaDoPantano();
        pararMusicaDaDimensaoGlitch();
        pararMusicaPixeladaDaFase1();

        if (!obterContextoAudio()) {
            trilhaDoBosqueAtiva = false;

            if (!musicaPausadaPeloJogador && volumeDaMusica > 0 && musica.paused) {
                reproduzirMusica();
            }

            return;
        }

        musica.pause();
        iniciarMusicaDoBosque();
    } else if (trilhaDaForjaAtiva) {
        pararMusicaDoDeserto();
        pararMusicaDoArtico();
        pararMusicaDaSelva();
        pararMusicaDoBosque();
        pararMusicaDoPantano();
        pararMusicaDaDimensaoGlitch();
        pararMusicaPixeladaDaFase1();

        if (!obterContextoAudio()) {
            trilhaDaForjaAtiva = false;

            if (!musicaPausadaPeloJogador && volumeDaMusica > 0 && musica.paused) {
                reproduzirMusica();
            }

            return;
        }

        musica.pause();
        iniciarMusicaDaForja();
    } else if (trilhaDoPantanoAtiva) {
        pararMusicaDoDeserto();
        pararMusicaDoArtico();
        pararMusicaDaSelva();
        pararMusicaDoBosque();
        pararMusicaDaForja();
        pararMusicaDaDimensaoGlitch();
        pararMusicaPixeladaDaFase1();

        if (!obterContextoAudio()) {
            trilhaDoPantanoAtiva = false;

            if (!musicaPausadaPeloJogador && volumeDaMusica > 0 && musica.paused) {
                reproduzirMusica();
            }

            return;
        }

        musica.pause();
        iniciarMusicaDoPantano();
    } else if (trilhaDaDimensaoGlitchAtiva) {
        pararMusicaDoDeserto();
        pararMusicaDoArtico();
        pararMusicaDaSelva();
        pararMusicaDoBosque();
        pararMusicaDaForja();
        pararMusicaDoPantano();
        pararMusicaPixeladaDaFase1();

        if (!obterContextoAudio()) {
            trilhaDaDimensaoGlitchAtiva = false;

            if (!musicaPausadaPeloJogador && volumeDaMusica > 0 && musica.paused) {
                reproduzirMusica();
            }

            return;
        }

        musica.pause();
        iniciarMusicaDaDimensaoGlitch();
    } else {
        pararMusicaDoDeserto();
        pararMusicaDoArtico();
        pararMusicaDaSelva();
        pararMusicaDoBosque();
        pararMusicaDaForja();
        pararMusicaDoPantano();
        pararMusicaDaDimensaoGlitch();

        if (!musicaPausadaPeloJogador && volumeDaMusica > 0 && musica.paused) {
            reproduzirMusica();
        }

        if (trilhaPixeladaDaFase1Ativa) {
            iniciarMusicaPixeladaDaFase1();
        } else {
            pararMusicaPixeladaDaFase1();
        }
    }
}

function selecionarTrilhaDaConversaDoPortal() {
    trilhaDaConversaDoPortalAtiva = true;
    trilhaDoLobbyAtiva = false;
    trilhaDoDesertoAtiva = false;
    trilhaDoArticoAtiva = false;
    trilhaDaSelvaAtiva = false;
    trilhaDoBosqueAtiva = false;
    trilhaDaForjaAtiva = false;
    trilhaDoPantanoAtiva = false;
    trilhaDaDimensaoGlitchAtiva = false;
    trilhaPixeladaDaFase1Ativa = false;
    atualizarVolumeEfetivoDaMusica();
    pararMusicaDoLobby();
    pararMusicaDoDeserto();
    pararMusicaDoArtico();
    pararMusicaDaSelva();
    pararMusicaDoBosque();
    pararMusicaDaForja();
    pararMusicaDoPantano();
    pararMusicaDaDimensaoGlitch();
    pararMusicaPixeladaDaFase1();
    musica.pause();
    iniciarMusicaDaConversaDoPortal();
}

function selecionarTrilhaDoLobby() {
    trilhaDoLobbyAtiva = true;
    trilhaDaConversaDoPortalAtiva = false;
    trilhaDoDesertoAtiva = false;
    trilhaDoArticoAtiva = false;
    trilhaDaSelvaAtiva = false;
    trilhaDoBosqueAtiva = false;
    trilhaDaForjaAtiva = false;
    trilhaDoPantanoAtiva = false;
    trilhaDaDimensaoGlitchAtiva = false;
    trilhaPixeladaDaFase1Ativa = false;
    atualizarVolumeEfetivoDaMusica();
    pararMusicaDoDeserto();
    pararMusicaDoArtico();
    pararMusicaDaSelva();
    pararMusicaDoBosque();
    pararMusicaDaForja();
    pararMusicaDoPantano();
    pararMusicaDaDimensaoGlitch();
    pararMusicaDaConversaDoPortal();
    pararMusicaPixeladaDaFase1();
    musica.pause();
    tentarIniciarMusicaDoLobby();
}

function atualizarControleDoModoDiaNoite() {
    botaoModoDiaNoite.textContent = modoNoturno
        ? `☀ ${traduzir("configuracoes.modoDia")}`
        : `☾ ${traduzir("configuracoes.modoNoite")}`;
    botaoModoDiaNoite.setAttribute("aria-pressed", modoNoturno.toString());
}

function alternarModoDiaNoite() {
    modoNoturno = !modoNoturno;
    document.body?.classList.toggle("modo-noturno", modoNoturno);
    atualizarControleDoModoDiaNoite();
    salvarPreferencias();
}

function deslocarCronometroAposPausa(instante, duracaoDaPausa) {
    return instante > 0 ? instante + duracaoDaPausa : instante;
}

function reiniciarRelogioDaSimulacao() {
    instanteDoUltimoQuadro = 0;
}

function calcularMultiplicadorDeMovimento(instanteDoQuadro) {
    const duracaoDoQuadroDeReferencia = 1000
        / CONFIG.simulacao.quadrosPorSegundoDeReferencia;

    if (!Number.isFinite(instanteDoQuadro) || instanteDoUltimoQuadro <= 0) {
        instanteDoUltimoQuadro = Number.isFinite(instanteDoQuadro)
            ? instanteDoQuadro
            : 0;
        return 1;
    }

    const tempoDecorrido = Math.min(
        CONFIG.simulacao.deltaMaximoMs,
        Math.max(0, instanteDoQuadro - instanteDoUltimoQuadro)
    );
    instanteDoUltimoQuadro = instanteDoQuadro;
    return tempoDecorrido / duracaoDoQuadroDeReferencia;
}

function definirJogoPausado(pausar) {
    if (!jogoIniciado || jogoPausado === pausar) {
        return;
    }

    if (pausar) {
        jogoPausado = true;
        pausaIniciadaEm = Date.now();
        reiniciarRelogioDaSimulacao();
        atualizarPulsoTemporalNoPosto();
        return;
    }

    const duracaoDaPausa = Math.max(0, Date.now() - pausaIniciadaEm);
    jogoPausado = false;
    pausaIniciadaEm = 0;
    reiniciarRelogioDaSimulacao();
    proximoInimigoEm = deslocarCronometroAposPausa(proximoInimigoEm, duracaoDaPausa);
    proximaWaveEm = deslocarCronometroAposPausa(proximaWaveEm, duracaoDaPausa);
    avisoExpiraEm = deslocarCronometroAposPausa(avisoExpiraEm, duracaoDaPausa);
    avisoBossExpiraEm = deslocarCronometroAposPausa(avisoBossExpiraEm, duracaoDaPausa);
    boostFliperamaExpiraEm = deslocarCronometroAposPausa(
        boostFliperamaExpiraEm,
        duracaoDaPausa
    );
    boostDanoFliperamaExpiraEm = deslocarCronometroAposPausa(
        boostDanoFliperamaExpiraEm,
        duracaoDaPausa
    );
    pulsoTemporalNormalExpiraEm = deslocarCronometroAposPausa(
        pulsoTemporalNormalExpiraEm,
        duracaoDaPausa
    );
    pulsoTemporalBossExpiraEm = deslocarCronometroAposPausa(
        pulsoTemporalBossExpiraEm,
        duracaoDaPausa
    );

    if (fliperamaNoMapa) {
        fliperamaNoMapa.expiraEm = deslocarCronometroAposPausa(
            fliperamaNoMapa.expiraEm,
            duracaoDaPausa
        );
    }

    for (const torre of torres) {
        torre.ultimoTiro = deslocarCronometroAposPausa(torre.ultimoTiro, duracaoDaPausa);
        torre.lentidaoMacacoExpiraEm = deslocarCronometroAposPausa(
            torre.lentidaoMacacoExpiraEm || 0,
            duracaoDaPausa
        );
        torre.reducaoAlcanceCorujaExpiraEm = deslocarCronometroAposPausa(
            torre.reducaoAlcanceCorujaExpiraEm || 0,
            duracaoDaPausa
        );
        torre.atordoadaPeloUrsoAte = deslocarCronometroAposPausa(
            torre.atordoadaPeloUrsoAte || 0,
            duracaoDaPausa
        );
        torre.impactoSismicoSecundarioEm = deslocarCronometroAposPausa(
            torre.impactoSismicoSecundarioEm || 0,
            duracaoDaPausa
        );
    }

    for (const bomba of bombasPesadas) {
        if (bomba.ativada) {
            bomba.explodeEm = deslocarCronometroAposPausa(
                bomba.explodeEm,
                duracaoDaPausa
            );
        }
    }

    for (const inimigo of inimigos) {
        inimigo.ultimoTiro = deslocarCronometroAposPausa(inimigo.ultimoTiro, duracaoDaPausa);
        inimigo.lentidaoExpiraEm = deslocarCronometroAposPausa(
            inimigo.lentidaoExpiraEm || 0,
            duracaoDaPausa
        );
        inimigo.congeladoAte = deslocarCronometroAposPausa(
            inimigo.congeladoAte || 0,
            duracaoDaPausa
        );
        inimigo.proximaArrancadaEm = deslocarCronometroAposPausa(
            inimigo.proximaArrancadaEm || 0,
            duracaoDaPausa
        );
        inimigo.arrancadaExpiraEm = deslocarCronometroAposPausa(
            inimigo.arrancadaExpiraEm || 0,
            duracaoDaPausa
        );
        inimigo.proximoRugidoEm = deslocarCronometroAposPausa(
            inimigo.proximoRugidoEm || 0,
            duracaoDaPausa
        );
        inimigo.rugidoExpiraEm = deslocarCronometroAposPausa(
            inimigo.rugidoExpiraEm || 0,
            duracaoDaPausa
        );
        inimigo.queimaduraExpiraEm = deslocarCronometroAposPausa(
            inimigo.queimaduraExpiraEm || 0,
            duracaoDaPausa
        );
        inimigo.proximoDanoDeQueimaduraEm = deslocarCronometroAposPausa(
            inimigo.proximoDanoDeQueimaduraEm || 0,
            duracaoDaPausa
        );
        inimigo.atordoadoPelaTorreSismicaAte = deslocarCronometroAposPausa(
            inimigo.atordoadoPelaTorreSismicaAte || 0,
            duracaoDaPausa
        );
        inimigo.vulnerabilidadeSismicaExpiraEm = deslocarCronometroAposPausa(
            inimigo.vulnerabilidadeSismicaExpiraEm || 0,
            duracaoDaPausa
        );
        inimigo.chamadoPrimordialExpiraEm = deslocarCronometroAposPausa(
            inimigo.chamadoPrimordialExpiraEm || 0,
            duracaoDaPausa
        );
        inimigo.proximoReparoEm = deslocarCronometroAposPausa(
            inimigo.proximoReparoEm || 0,
            duracaoDaPausa
        );
        inimigo.reparoExpiraEm = deslocarCronometroAposPausa(
            inimigo.reparoExpiraEm || 0,
            duracaoDaPausa
        );
        inimigo.reparadoExpiraEm = deslocarCronometroAposPausa(
            inimigo.reparadoExpiraEm || 0,
            duracaoDaPausa
        );
        inimigo.reversaoTemporalExpiraEm = deslocarCronometroAposPausa(
            inimigo.reversaoTemporalExpiraEm || 0,
            duracaoDaPausa
        );
    }

    atualizarPulsoTemporalNoPosto();
}

function definirMenuDaPartidaAberto(aberto) {
    painelMenuPartida.hidden = !aberto;
    botaoMenuPartida.setAttribute("aria-expanded", aberto.toString());
    botaoMenuPartida.setAttribute(
        "aria-label",
        aberto
            ? localizar("Fechar menu da partida (Esc)")
            : localizar("Abrir menu da partida (Esc)")
    );

    if (jogoIniciado) {
        definirJogoPausado(aberto || !camadaConfiguracoes.hidden);
    }
}

function alternarMenuDaPartida() {
    if (tutorialAtivo) {
        mostrarAviso(localizar("Conclua ou pule o tutorial antes de abrir o menu."));
        return;
    }

    definirMenuDaPartidaAberto(painelMenuPartida.hidden);
}

function compensarMinigameAposOcultarPagina(duracaoOculta) {
    if (!minigameFliperamaAtivo || duracaoOculta <= 0) {
        return;
    }

    minigameFliperamaTerminaEm += duracaoOculta;

    if (alvoDoMinigameFliperama) {
        alvoDoMinigameFliperama.atualizadoEm += duracaoOculta;
        alvoDoMinigameFliperama.podeSerAtingidoEm += duracaoOculta;
    }

    if (roboDoLabirintoFliperama) {
        roboDoLabirintoFliperama.atualizadoEm += duracaoOculta;
    }
}

function controlarVisibilidadeDaPagina() {
    const agora = Date.now();

    if (document.hidden) {
        paginaOcultadaEm = agora;

        if (
            jogoIniciado
            && !partidaEncerrada
            && !jogoPausado
            && !tutorialAtivo
        ) {
            pausaAutomaticaPorOcultacao = true;
            definirMenuDaPartidaAberto(true);
        }

        return;
    }

    if (paginaOcultadaEm > 0) {
        compensarMinigameAposOcultarPagina(
            Math.max(0, agora - paginaOcultadaEm)
        );
        paginaOcultadaEm = 0;
    }

    if (pausaAutomaticaPorOcultacao) {
        pausaAutomaticaPorOcultacao = false;
        botaoMenuPartida.focus();
    }
}

function controlarAtalhosDaPartida(evento) {
    if (
        (
            conversaDoSenhorDoTempoAtiva
            || cutsceneDoCapitulo2Ativa
            || cutsceneDaCartaAtiva
            || labirintoAmareloAtivo
        )
        && evento.key === "Escape"
    ) {
        evento.preventDefault();
        return;
    }

    if (evento.key === "Escape" && !camadaConfirmacaoCompraLoja.hidden) {
        evento.preventDefault();
        cancelarCompraDaLoja();
        return;
    }

    if (!camadaBonusPosBoss.hidden || !camadaMinigameFliperama.hidden) {
        return;
    }

    if (evento.key === "Escape") {
        if (!camadaResultado.hidden) {
            return;
        }

        if (!camadaConfirmacaoDesistencia.hidden) {
            evento.preventDefault();
            cancelarDesistencia();
            return;
        }

        if (!camadaConfiguracoes.hidden) {
            evento.preventDefault();
            fecharConfiguracoes();
            return;
        }

        if (conteudoMenu.classList.contains("conteudo-menu-tela-cheia")) {
            evento.preventDefault();
            fecharConteudoMenu();
            return;
        }

        if (jogoIniciado && !partidaEncerrada) {
            evento.preventDefault();
            alternarMenuDaPartida();
        }

        return;
    }

    if (
        !jogoIniciado
        || jogoPausado
        || partidaEncerrada
        || evento.repeat
        || evento.ctrlKey
        || evento.altKey
        || evento.metaKey
    ) {
        return;
    }

    const tecla = evento.key.toLowerCase();

    if (tecla === "e") {
        evento.preventDefault();
        melhorarTorreSelecionada();
    } else if (tecla === "x") {
        evento.preventDefault();
        venderTorreSelecionada();
    }
}

function definirConfiguracoesAbertas(abertas) {
    camadaConfiguracoes.hidden = !abertas;
    botaoConfiguracoesPartida.setAttribute("aria-expanded", abertas.toString());
    botaoConfiguracoesLobby.setAttribute("aria-expanded", abertas.toString());

    if (jogoIniciado) {
        definirJogoPausado(abertas || !painelMenuPartida.hidden);
    }

    if (abertas) {
        atualizarControleDeVolume();
        atualizarControleDosEfeitos();
        atualizarControleDeIdioma();
        botaoFecharConfiguracoes.focus();
    }
}

function abrirConfiguracoes() {
    tentarIniciarMusicaDoLobby();
    definirConfiguracoesAbertas(true);

    if (jogoIniciado) {
        fecharMenuDaPartida();
    }
}

function fecharConfiguracoes() {
    definirConfiguracoesAbertas(false);
}

function alternarConfiguracoes() {
    if (camadaConfiguracoes.hidden) {
        abrirConfiguracoes();
    } else {
        fecharConfiguracoes();
    }
}

function fecharConfiguracoesAoClicarFora(evento) {
    if (evento.target === camadaConfiguracoes) {
        fecharConfiguracoes();
    }
}

function fecharMenuDaPartida() {
    definirMenuDaPartidaAberto(false);
}

function tentarIniciarMusicaDoLobby() {
    if (trilhaDaConversaDoPortalAtiva) {
        selecionarTrilhaDoLobby();
        return;
    }

    if (trilhaDoLobbyAtiva && !musicaPausadaPeloJogador) {
        musica.pause();
        iniciarMusicaDoLobby();
    }
}

function tentarLiberarMusicaDoLobby() {
    tentarIniciarMusicaDoLobby();

    if (musicaDoLobbyTocando) {
        document.removeEventListener("click", tentarLiberarMusicaDoLobby);
        document.removeEventListener("keydown", tentarLiberarMusicaDoLobby);
    }
}

function configurarInicioAutomaticoDaMusicaDoLobby() {
    tentarLiberarMusicaDoLobby();

    if (!musicaDoLobbyTocando) {
        document.addEventListener("click", tentarLiberarMusicaDoLobby);
        document.addEventListener("keydown", tentarLiberarMusicaDoLobby);
    }
}

atualizarVolumeEfetivoDaMusica();
controleVolumeMusica.addEventListener("input", (evento) => ajustarVolumeDaMusica(evento.target.value));
controleVolumeEfeitos.addEventListener("input", (evento) => ajustarVolumeDosEfeitos(evento.target.value));
musica.addEventListener("playing", atualizarBotoesDaMusica);
musica.addEventListener("pause", atualizarBotoesDaMusica);
document.addEventListener("keydown", controlarAtalhosDaPartida);
document.addEventListener("visibilitychange", controlarVisibilidadeDaPagina);
atualizarControleDeVolume();
atualizarBotoesDaMusica();

// Configurações do jogo: altere valores aqui, sem espalhá-los pelo código.
const CONFIG = Object.freeze({
    simulacao: Object.freeze({
        quadrosPorSegundoDeReferencia: 60,
        deltaMaximoMs: 50
    }),
    interface: Object.freeze({
        duracaoNotificacaoDeProgressoMs: 5200,
        duracaoSaidaDaNotificacaoMs: 240
    }),
    tutorial: Object.freeze({
        quantidadeDePassos: 5
    }),
    missoes: Object.freeze({
        semanais: Object.freeze([
            Object.freeze({
                id: "cacadorDePixels",
                nome: "Caçador de Pixels",
                descricao: "Elimine inimigos em qualquer modo de jogo.",
                propriedadeDoProgresso: "inimigosEliminados",
                objetivo: 50,
                icone: "☠",
                recompensa: Object.freeze({
                    tipo: "fragmentos",
                    quantidade: 10,
                    rotulo: "10 Fragmentos de Pixel"
                })
            }),
            Object.freeze({
                id: "guardiaoDaCampanha",
                nome: "Guardião da Campanha",
                descricao: "Conclua partidas da campanha normal.",
                propriedadeDoProgresso: "fasesConcluidas",
                objetivo: 3,
                icone: "★",
                recompensa: Object.freeze({
                    tipo: "skin",
                    id: "sentinelaDourada",
                    rotulo: "Skin Sentinela Dourada",
                    fragmentosAlternativos: 15
                })
            }),
            Object.freeze({
                id: "alemDoLimite",
                nome: "Além do Limite",
                descricao: "Alcance a wave 40 em uma partida de Waves infinitas.",
                propriedadeDoProgresso: "maiorWaveInfinita",
                objetivo: 40,
                icone: "∞",
                recompensa: Object.freeze({
                    tipo: "conquista",
                    id: "alemDoLimite",
                    rotulo: "Conquista Além do Limite",
                    fragmentosAlternativos: 25
                })
            })
        ]),
        skins: Object.freeze({
            sentinelaDourada: Object.freeze({
                nome: "Sentinela Dourada",
                tipoDeTorre: "padrao",
                descricao: "Uma pintura dourada exclusiva das missões semanais.",
                coresPorNivel: Object.freeze([
                    Object.freeze({ corBase: "#c89528", corCanhao: "#5a431e" }),
                    Object.freeze({ corBase: "#dda931", corCanhao: "#6d5124" }),
                    Object.freeze({ corBase: "#efc64b", corCanhao: "#8a6328" }),
                    Object.freeze({ corBase: "#ffe36a", corCanhao: "#fff0ad" })
                ])
            })
        })
    }),
    pacoteApoiador: Object.freeze({
        id: "coracaoDePixel",
        nome: "Pacote Coração de Pixel",
        modoDemonstracao: true,
        checkout: Object.freeze({
            endpointCriacaoDaSessao: "",
            endpointConsultaDoDireito: "",
            origensPermitidas: Object.freeze([])
        }),
        skin: Object.freeze({
            id: "auroraPixel",
            nome: "Aurora Pixel",
            tipoDeTorre: "padrao",
            descricao: "Uma pintura neon exclusiva para a Torre padrão.",
            coresPorNivel: Object.freeze([
                Object.freeze({
                    tipoVisual: "aurora",
                    nivelVisualAurora: 0,
                    corBase: "#5b3da8",
                    corCanhao: "#56f2d2",
                    corAurora: "#ffb7ed",
                    larguraCanhao: 11,
                    comprimentoCanhao: 32
                }),
                Object.freeze({
                    tipoVisual: "aurora",
                    nivelVisualAurora: 1,
                    corBase: "#704fd0",
                    corCanhao: "#69ffe1",
                    corDetalhe: "#ffe66f",
                    corAurora: "#ff9fe7",
                    larguraCanhao: 16,
                    comprimentoCanhao: 42
                }),
                Object.freeze({
                    tipoVisual: "aurora",
                    nivelVisualAurora: 2,
                    corBase: "#9a58d6",
                    corCanhao: "#ffe66f",
                    corDetalhe: "#69ffe1",
                    corAurora: "#ffb7ed",
                    larguraCanhao: 19,
                    comprimentoCanhao: 46
                }),
                Object.freeze({
                    tipoVisual: "aurora",
                    nivelVisualAurora: 3,
                    corBase: "#d064e2",
                    corCanhao: "#fff3aa",
                    corDetalhe: "#69ffe1",
                    corAurora: "#ffe66f",
                    larguraCanhao: 22,
                    comprimentoCanhao: 50
                })
            ])
        }),
        itens: Object.freeze([
            Object.freeze({
                icone: "✦",
                nome: "Skin Aurora Pixel",
                descricao: "Visual neon para todos os níveis da Torre padrão."
            }),
            Object.freeze({
                icone: "♥",
                nome: "Emblema Coração",
                descricao: "Moldura especial no perfil do lobby."
            }),
            Object.freeze({
                icone: "GP+",
                nome: "Selo Apoiador",
                descricao: "Identificação permanente de quem ajudou o jogo."
            })
        ])
    }),
    conquistas: Object.freeze({
        primeiraVigilia: Object.freeze({
            nome: "Primeira Vigília",
            descricao: "Conclua sua primeira partida da campanha.",
            icone: "I",
            tipoDeCriterio: "estatistica",
            propriedade: "fasesConcluidas",
            objetivo: 1
        }),
        guardiaoDosCincoReinos: Object.freeze({
            nome: "Guardião dos Cinco Reinos",
            descricao: "Conclua as cinco primeiras fases da campanha.",
            icone: "V",
            tipoDeCriterio: "campanha",
            objetivo: 5
        }),
        guardiaoDeTodosOsReinos: Object.freeze({
            nome: "Guardião de Todos os Reinos",
            descricao: "Conclua todas as oito fases da campanha.",
            icone: "VIII",
            tipoDeCriterio: "campanha",
            objetivo: 8
        }),
        mestreDoArsenal: Object.freeze({
            nome: "Mestre do Arsenal",
            descricao: "Compre todos os itens disponíveis na Loja.",
            icone: "⚒",
            tipoDeCriterio: "loja"
        }),
        lendaDoInfinito: Object.freeze({
            nome: "Lenda do Infinito",
            descricao: "Alcance a wave 100 no modo infinito.",
            icone: "∞",
            tipoDeCriterio: "estatistica",
            propriedade: "maiorWaveInfinita",
            objetivo: 100
        }),
        cacadorDePixelsSupremo: Object.freeze({
            nome: "Caçador de Pixels Supremo",
            descricao: "Elimine 500 inimigos em qualquer modo.",
            icone: "☠",
            tipoDeCriterio: "estatistica",
            propriedade: "inimigosEliminados",
            objetivo: 500
        }),
        alemDoLimite: Object.freeze({
            nome: "Além do Limite",
            descricao: "Resgate a missão semanal da wave 40 infinita.",
            icone: "✦",
            tipoDeCriterio: "especial",
            objetivo: 1
        }),
        aindaEstaEsperando: Object.freeze({
            nome: "???",
            descricao: "Ainda está te esperando, sempre vai estar.",
            icone: "?",
            tipoDeCriterio: "especial",
            objetivo: 1
        })
    }),
    faseSecreta: Object.freeze({
        numeroInterno: 99,
        nome: "Dimensão Glitch",
        tema: "glitch",
        descricao: "Uma cópia quebrada do mundo, escondida atrás da árvore da Fase 1.",
        faseConcluidaParaAcesso: 6,
        bonusCreditosIniciais: 300,
        cartaMisteriosa: Object.freeze({
            texto: "Você está pronto. Algo estará lhe esperando no lobby da Fase 1, entre as árvores. Venha ver meu desafio.",
            assinatura: "???"
        }),
        transicaoDoPortal: Object.freeze({
            duracaoMs: 1600
        }),
        corredoresAmarelos: Object.freeze({
            chanceDeAparecer: 0.1,
            largura: 900,
            altura: 520,
            velocidadeDoJogador: 190,
            raioDoJogador: 11,
            inicio: Object.freeze({ x: 48, y: 468 }),
            saida: Object.freeze({ x: 830, y: 0, largura: 70, altura: 72 }),
            paredes: Object.freeze([
                Object.freeze({ x: 140, y: 0, largura: 24, altura: 400 }),
                Object.freeze({ x: 280, y: 120, largura: 24, altura: 400 }),
                Object.freeze({ x: 420, y: 0, largura: 24, altura: 400 }),
                Object.freeze({ x: 560, y: 120, largura: 24, altura: 400 }),
                Object.freeze({ x: 700, y: 0, largura: 24, altura: 400 })
            ])
        }),
        senhorDoTempo: Object.freeze({
            nome: "Senhor do Tempo",
            formaHumanaFutura: Object.freeze({
                ativa: false,
                id: "senhorDoTempoHumano",
                nome: "Senhor do Tempo — Forma Humana",
                descricao: "Conceito futuro: retrato humano alto de meio-corpo, com terno, gravata, cabeça de relógio e uma mão no bolso.",
                visual: Object.freeze({
                    contorno: "#090712",
                    terno: "#171a2b",
                    ternoIluminado: "#343b5c",
                    camisa: "#fff5d6",
                    gravata: "#bd315f",
                    aroDoRelogio: "#e4c85c",
                    mostrador: "#fff0a8",
                    marcadores: "#24152f",
                    brilhoCiano: "#32e0d0",
                    brilhoMagenta: "#dc3ed1"
                })
            }),
            falas: Object.freeze([
                "Era eu quem falava com você através do portal.",
                "Meu nome é Senhor do Tempo.",
                "Você não tem escolha.",
                "Se quiser sair, vai ter que sair vitorioso daqui.",
                "Supere as 20 waves e eu abrirei o caminho de volta.",
                "Serei generoso com você. Afinal, poucas pessoas chegam até aqui. Darei 300 créditos a mais para você começar. Mas depois disso você pensa que acabou? Ainda não.",
                "Agora lute. O tempo já começou a correr."
            ]),
            falasDeVitoria: Object.freeze([
                Object.freeze({ autor: "senhorDoTempo", texto: "Parabéns. Você conseguiu." }),
                Object.freeze({ autor: "senhorDoTempo", texto: "Poucas pessoas passam por este desafio." }),
                Object.freeze({ autor: "jogador", texto: "Então eu estou livre?" }),
                Object.freeze({ autor: "senhorDoTempo", texto: "Livre para continuar. Mas sua jornada está longe de terminar." }),
                Object.freeze({ autor: "jogador", texto: "O que você quer dizer?" }),
                Object.freeze({ autor: "senhorDoTempo", texto: "Eu abri um novo caminho. O Capítulo 2 espera por você." }),
                Object.freeze({ autor: "senhorDoTempo", texto: "Considere isso uma recompensa... e um aviso. Ainda não acabou." })
            ])
        }),
        waves: Object.freeze({
            quantidadeBaseDePixelsCorrompidos: 3,
            pixelsCorrompidosPorWave: 1,
            primeiraWaveErroVeloz: 3,
            wavesPorNovoErroVeloz: 2,
            primeiraWaveBlocoInstavel: 5,
            wavesPorNovoBlocoInstavel: 4
        })
    }),
    maquinaDoTempo: Object.freeze({
        faseQueConcede: 7,
        epocaInicial: "presente",
        carta: Object.freeze({
            texto: "Você venceu o desafio. Como recompensa, deixei uma Máquina do Tempo para você no Capítulo 2. Sua próxima passagem está em uma época anterior ao pântano.",
            assinatura: "Senhor do Tempo"
        }),
        epocas: Object.freeze([
            Object.freeze({
                id: "passado",
                nome: "Passado",
                descricao: "Ruínas inteiras e perigos que o presente esqueceu."
            }),
            Object.freeze({
                id: "presente",
                nome: "Presente",
                descricao: "O ponto de partida da sua jornada pelo tempo."
            }),
            Object.freeze({
                id: "futuro",
                nome: "Futuro",
                descricao: "Caminhos instáveis que ainda não deveriam existir."
            })
        ]),
        fasesPlanejadasPorEpoca: Object.freeze({
            passado: Object.freeze([8, 10]),
            presente: Object.freeze([7, 11]),
            futuro: Object.freeze([9, 12])
        })
    }),
    caminhoVivo: Object.freeze({
        numeroDaFase: 8,
        indiceDoCaminhoAlto: 0,
        indiceDoCaminhoBaixo: 1,
        indiceDoAtalhoDoTirano: 2,
        primeiraWaveDoCaminhoBaixo: 6,
        primeiraWaveDaAlternancia: 11,
        nomesDosCaminhos: Object.freeze([
            "Caminho Alto",
            "Caminho Baixo",
            "Atalho do Tirano"
        ])
    }),
    metropoleNeon: Object.freeze({
        numeroDaFase: 9,
        multiplicadorVelocidadeNosTrilhos: 1.45,
        trilhosDeImpulso: Object.freeze([
            Object.freeze({ x: 190, y: 70, largura: 130, altura: 60, direcao: "direita" }),
            Object.freeze({ x: 560, y: 300, largura: 60, altura: 150, direcao: "cima" }),
            Object.freeze({ x: 850, y: 530, largura: 130, altura: 60, direcao: "direita" })
        ]),
        radio: Object.freeze({
            x: 700,
            y: 350,
            raioDeClique: 50,
            distanciaMinimaDasTorres: 82,
            waveDeAtivacao: 10,
            titulo: "TRANSMISSÃO 09 — REMETENTE DESCONHECIDO",
            texto: "Se alguém ainda recebe este sinal, procure o Projeto Relógio. Objetivo registrado: criar um guardião capaz de existir em todas as eras. Consciência temporal detectada. Preparando corpo para transferência... RESULTADO: ARQUIVO CORROMPIDO.",
            assinatura: "FREQUÊNCIA: PROJETO RELÓGIO"
        })
    }),
    pulsoTemporal: Object.freeze({
        faseConcluidaParaDesbloqueio: 8,
        duracaoInimigosComuns: 4000,
        duracaoBosses: 3000,
        percentualLentidaoBosses: 0.5,
        wavesParaRecarregar: 5
    }),
    capitulos: Object.freeze([
        Object.freeze({ numero: 1, nome: "Capítulo 1", faseInicial: 1, faseFinal: 6, tema: "origens" }),
        Object.freeze({ numero: 2, nome: "Capítulo 2", faseInicial: 7, faseFinal: 12, tema: "fronteira", requerVitoriaNaFaseSecreta: true }),
        Object.freeze({ numero: 3, nome: "Capítulo 3", faseInicial: 13, faseFinal: 18, tema: "misterio" })
    ]),
    fases: Object.freeze([
        Object.freeze({ numero: 1, nome: "Fase 1", tema: "campo", descricao: "Campo verde" }),
        Object.freeze({ numero: 2, nome: "Fase 2", tema: "deserto", descricao: "Deserto antigo" }),
        Object.freeze({ numero: 3, nome: "Fase 3", tema: "artico", descricao: "Tundra congelada" }),
        Object.freeze({ numero: 4, nome: "Fase 4", tema: "selva", descricao: "Ruínas da Selva" }),
        Object.freeze({ numero: 5, nome: "Fase 5", tema: "temperada", descricao: "Bosque do Crepúsculo" }),
        Object.freeze({ numero: 6, nome: "Fase 6", tema: "vulcanica", descricao: "Forja Vulcânica" }),
        Object.freeze({ numero: 7, nome: "Fase 7", tema: "pantano", descricao: "Pântano Tóxico" }),
        Object.freeze({ numero: 8, nome: "Fase 8", tema: "primordial", descricao: "Selva Primordial" }),
        Object.freeze({ numero: 9, nome: "Fase 9", tema: "futurista", descricao: "Metrópole Neon" })
    ]),
    album: Object.freeze({
        categorias: Object.freeze([
            Object.freeze({
                id: "torres",
                nome: "Torres",
                icone: "▦",
                descricao: "Somente torres desbloqueadas aparecem nesta página."
            }),
            Object.freeze({
                id: "inimigos",
                nome: "Inimigos",
                icone: "◆",
                descricao: "Cada tipo é colado depois de ser derrotado pela primeira vez."
            }),
            Object.freeze({
                id: "bosses",
                nome: "Bosses",
                icone: "♛",
                descricao: "Cada chefe é colado depois que você consegue derrotá-lo."
            }),
            Object.freeze({
                id: "minas",
                nome: "Minas",
                icone: "✹",
                descricao: "Somente explosivos que você comprou aparecem nesta página."
            }),
            Object.freeze({
                id: "skins",
                nome: "Skins",
                icone: "✦",
                descricao: "Somente visuais cosméticos que você já obteve aparecem aqui."
            })
        ])
    }),
    loja: Object.freeze({
        fragmentosIniciais: 0,
        fragmentosPorWaveAlcancada: 1,
        primeiraWaveComRecompensa: 2,
        wavesPorFragmentoNoModoInfinito: 2,
        itens: Object.freeze({
            reservaDeCreditos: Object.freeze({
                nome: "Reserva de Créditos",
                tipoDeItem: "melhoria",
                categoriaLoja: "melhorias",
                custoNaLoja: 30,
                rotuloVisual: "+50",
                classeVisual: "melhoria-reserva-creditos",
                descricao: "Aumenta permanentemente os créditos disponíveis no começo de cada partida.",
                detalhe: "+50 créditos iniciais em todas as fases e no modo infinito",
                bonusDinheiroInicial: 50
            }),
            licencaDeConstrucao: Object.freeze({
                nome: "Licença de Construção",
                tipoDeItem: "melhoria",
                categoriaLoja: "melhorias",
                custoNaLoja: 45,
                rotuloVisual: "+1",
                classeVisual: "melhoria-licenca-construcao",
                descricao: "Amplia permanentemente o espaço disponível para suas defesas.",
                detalhe: "+1 vaga no limite geral de torres de todas as fases",
                bonusLimiteDeTorres: 1
            }),
            recompensaOtimizada: Object.freeze({
                nome: "Recompensa Otimizada",
                tipoDeItem: "melhoria",
                categoriaLoja: "melhorias",
                custoNaLoja: 55,
                rotuloVisual: "+2",
                classeVisual: "melhoria-recompensa-otimizada",
                descricao: "Melhora permanentemente o pagamento recebido pelas torres de combate.",
                detalhe: "+2 créditos por disparo realizado pelas torres",
                bonusRecompensaPorTiro: 2
            })
        }),
        categorias: Object.freeze([
            Object.freeze({
                id: "torres",
                nome: "Torres",
                icone: "▦",
                descricao: "Defesas e estruturas especiais para levar às partidas.",
                mensagemVazia: ""
            }),
            Object.freeze({
                id: "minas",
                nome: "Minas",
                icone: "✦",
                descricao: "Explosivos de uso tático para controlar grupos de inimigos.",
                mensagemVazia: "Novos explosivos táticos chegarão em breve."
            }),
            Object.freeze({
                id: "melhorias",
                nome: "Melhorias",
                icone: "↑",
                descricao: "Aprimoramentos permanentes para fortalecer sua defesa.",
                mensagemVazia: "Novos aprimoramentos permanentes chegarão em breve."
            })
        ])
    }),
    audio: Object.freeze({
        volumeInicialDosEfeitos: 0.8,
        musicaDoLobby: Object.freeze({
            intervaloDoPasso: 430,
            volumeRelativo: 1.25,
            melodia: Object.freeze([
                392, 493.88, 587.33, 493.88,
                349.23, 440, 523.25, 440,
                329.63, 392, 493.88, 392,
                349.23, 440, 587.33, 440
            ]),
            baixo: Object.freeze([98, 87.31, 82.41, 73.42])
        }),
        musicaPixeladaDaFase1: Object.freeze({
            intervaloDoPasso: 360,
            volumeRelativo: 1.25,
            volumeRelativoDaMusicaOriginal: 0.65,
            melodia: Object.freeze([
                293.66, 311.13, 349.23, 311.13,
                293.66, 261.63, 233.08, 261.63,
                293.66, 349.23, 392, 349.23,
                311.13, 293.66, 261.63, 233.08
            ]),
            baixo: Object.freeze([73.42, 69.3, 58.27, 65.41])
        }),
        musicaDoDeserto: Object.freeze({
            intervaloDoPasso: 270,
            volumeRelativo: 1.65,
            melodia: Object.freeze([
                329.63, 349.23, 415.3, 440,
                493.88, 440, 415.3, 349.23,
                329.63, 415.3, 493.88, 523.25,
                493.88, 440, 415.3, 349.23
            ])
        }),
        musicaDoArtico: Object.freeze({
            intervaloDoPasso: 400,
            volumeRelativo: 1.55,
            melodia: Object.freeze([
                329.63, 392, 493.88, 440,
                369.99, 329.63, 293.66, 246.94,
                329.63, 392, 523.25, 493.88,
                440, 369.99, 293.66, 329.63
            ]),
            baixo: Object.freeze([82.41, 73.42, 65.41, 61.74])
        }),
        musicaDaSelva: Object.freeze({
            intervaloDoPasso: 260,
            volumeRelativo: 1.45,
            melodia: Object.freeze([
                293.66, 349.23, 293.66, 261.63,
                220, 261.63, 293.66, 196,
                233.08, 293.66, 349.23, 293.66,
                261.63, 233.08, 196, 174.61
            ]),
            baixo: Object.freeze([73.42, 65.41, 58.27, 55]),
            percussao: Object.freeze([1, 0.35, 0.65, 0.3, 1, 0.45, 0.72, 0.4])
        }),
        musicaDaSelvaPrimordial: Object.freeze({
            intervaloDoPasso: 230,
            volumeRelativo: 1.7,
            melodia: Object.freeze([
                146.83, 174.61, 196, 174.61,
                130.81, 155.56, 174.61, 116.54,
                138.59, 164.81, 196, 164.81,
                123.47, 146.83, 155.56, 110
            ]),
            baixo: Object.freeze([55, 49, 46.25, 43.65]),
            percussao: Object.freeze([1, 0.4, 0.72, 0.32, 1, 0.5, 0.82, 0.38])
        }),
        musicaDaMetropoleNeon: Object.freeze({
            intervaloDoPasso: 210,
            volumeRelativo: 1.8,
            melodia: Object.freeze([
                220, 329.63, 440, 659.25,
                246.94, 369.99, 493.88, 739.99,
                196, 293.66, 392, 587.33,
                220, 349.23, 523.25, 698.46
            ]),
            baixo: Object.freeze([55, 61.74, 49, 65.41]),
            percussao: Object.freeze([1, 0.2, 0.65, 0.35, 1, 0.28, 0.78, 0.42])
        }),
        musicaDoBosque: Object.freeze({
            intervaloDoPasso: 330,
            volumeRelativo: 1.65,
            melodia: Object.freeze([
                293.66, 349.23, 440, 392,
                329.63, 293.66, 261.63, 220,
                293.66, 349.23, 466.16, 440,
                392, 349.23, 261.63, 293.66
            ]),
            baixo: Object.freeze([73.42, 65.41, 58.27, 55])
        }),
        musicaDaForja: Object.freeze({
            intervaloDoPasso: 240,
            volumeRelativo: 1.55,
            melodia: Object.freeze([
                164.81, 196, 220, 207.65,
                164.81, 233.08, 220, 196,
                146.83, 174.61, 207.65, 196,
                146.83, 220, 196, 174.61
            ]),
            baixo: Object.freeze([55, 58.27, 49, 51.91]),
            percussao: Object.freeze([1, 0.25, 0.7, 0.35, 1, 0.4, 0.78, 0.3])
        }),
        musicaDoPantano: Object.freeze({
            intervaloDoPasso: 300,
            volumeRelativo: 3.2,
            melodia: Object.freeze([
                174.61, 207.65, 233.08, 196,
                164.81, 196, 220, 174.61,
                155.56, 185, 207.65, 174.61,
                146.83, 174.61, 196, 155.56
            ]),
            baixo: Object.freeze([58.27, 55, 51.91, 49]),
            percussao: Object.freeze([1, 0.18, 0.48, 0.24, 0.82, 0.3, 0.58, 0.2])
        }),
        musicaDaDimensaoGlitch: Object.freeze({
            intervaloDoPasso: 310,
            volumeRelativo: 1.75,
            melodia: Object.freeze([
                146.83, 155.56, 220, 207.65,
                146.83, 116.54, 155.56, 138.59,
                174.61, 164.81, 233.08, 220,
                138.59, 146.83, 110, 103.83
            ]),
            baixo: Object.freeze([55, 51.91, 58.27, 46.25]),
            intensidadeDosCortes: Object.freeze([
                0.25, 0, 0.12, 0,
                0.35, 0.08, 0, 0.18,
                0.28, 0, 0.14, 0,
                0.4, 0.1, 0.22, 0.5
            ])
        }),
        musicaDaConversaDoPortal: Object.freeze({
            intervaloDoPasso: 540,
            volumeRelativo: 1.85,
            melodia: Object.freeze([
                130.81, 138.59, 110, 155.56,
                123.47, 103.83, 146.83, 92.5
            ]),
            baixo: Object.freeze([65.41, 58.27])
        }),
        teleporteGlitch: Object.freeze({
            frequencias: Object.freeze([523.25, 92.5, 698.46, 58.27]),
            duracaoDaNota: 0.34,
            intervaloEntreNotas: 0.12,
            volumeDaNota: 0.2,
            duracaoDoRuido: 1.15,
            volumeDoRuido: 0.24,
            frequenciaDoFiltro: 1900
        }),
        rugidoDoUrso: Object.freeze({
            arquivo: "sons/rugido-urso-ancestral.ogg",
            volumeRelativo: 1
        })
    }),
    wave: Object.freeze({
        intervaloEntreInimigos: 700,
        pausaEntreWaves: 2000,
        primeiraWaveElite: 5,
        vermelhosAntesDeNovoRoxo: 3,
        primeiraWaveEscorpiao: 3,
        wavesPorNovoEscorpiao: 4,
        primeiraWaveMumia: 7,
        wavesPorNovaMumia: 5,
        primeiraWaveLoboDeGelo: 3,
        wavesPorNovoLoboDeGelo: 4,
        primeiraWaveYeti: 7,
        wavesPorNovoYeti: 5,
        primeiraWaveMacacoSaqueador: 3,
        wavesPorNovoMacacoSaqueador: 4,
        primeiraWaveGorilaDaSelva: 7,
        wavesPorNovoGorilaDaSelva: 5,
        primeiraWaveOncaDaSelva: 5,
        wavesPorNovaOncaDaSelva: 4,
        primeiraWaveRaposaLadina: 3,
        wavesPorNovaRaposaLadina: 4,
        primeiraWaveJavaliFurioso: 7,
        wavesPorNovoJavaliFurioso: 5,
        primeiraWaveCorujaSombria: 9,
        wavesPorNovaCorujaSombria: 5,
        primeiraWaveMorcegoDeFogo: 3,
        wavesPorNovoMorcegoDeFogo: 4,
        primeiraWaveLagartoVulcanico: 5,
        wavesPorNovoLagartoVulcanico: 4,
        primeiraWaveGolemDeMagma: 7,
        wavesPorNovoGolemDeMagma: 5,
        primeiraWaveMosquitoDoBrejo: 3,
        wavesPorNovoMosquitoDoBrejo: 4,
        primeiraWaveSapoVenenoso: 5,
        wavesPorNovoSapoVenenoso: 4,
        primeiraWaveGuardiaoDeLodo: 7,
        wavesPorNovoGuardiaoDeLodo: 5,
        primeiraWaveRaptorAncestral: 3,
        wavesPorNovoRaptorAncestral: 4,
        primeiraWaveBesouroDeAmbar: 5,
        wavesPorNovoBesouroDeAmbar: 4,
        primeiraWaveTriceratopo: 7,
        wavesPorNovoTriceratopo: 5,
        primeiraWaveDroneCacador: 3,
        wavesPorNovoDroneCacador: 4,
        primeiraWaveRoboReparador: 5,
        wavesPorNovoRoboReparador: 4,
        primeiraWaveSentinelaDeEscudo: 7,
        wavesPorNovaSentinelaDeEscudo: 5,
        primeiraWaveSabotador: 6,
        wavesPorNovoSabotador: 5,
        intervaloDeBoss: 5,
        ultimaWave: 20
    }),
    bonusPosBoss: Object.freeze({
        quantidadeDeOpcoes: 3,
        wavesComBonus: Object.freeze([5, 10, 15]),
        tipos: Object.freeze({
            cadencia: Object.freeze({
                icone: ">>",
                nome: "Cadência rápida",
                descricao: "Todas as torres atacam 10% mais rápido.",
                percentual: 0.1
            }),
            creditos: Object.freeze({
                icone: "$",
                nome: "Suprimentos",
                descricao: "Receba 300 créditos imediatamente.",
                valor: 300
            }),
            dano: Object.freeze({
                icone: "+D",
                nome: "Munição reforçada",
                descricao: "Todas as torres causam 10% mais dano.",
                percentual: 0.1
            }),
            alcance: Object.freeze({
                icone: "+R",
                nome: "Mira ampliada",
                descricao: "Todas as torres ganham 8% de alcance.",
                percentual: 0.08
            })
        })
    }),
    fliperama: Object.freeze({
        wavesDeAparicao: Object.freeze([7, 14]),
        tempoDisponivelNoMapa: 10000,
        raioDeClique: 46,
        margemDoMapa: 70,
        distanciaMinimaDasTorres: 90,
        tentativasDePosicao: 80,
        sprite: Object.freeze({
            caminho: "assets/fliperama-pixel.png",
            largura: 53,
            altura: 100,
            deslocamentoVertical: 3
        }),
        minigame: Object.freeze({
            duracao: 15000,
            alvosNecessarios: 10,
            raioDoAlvo: 34,
            velocidadeDoAlvo: 185,
            intervaloMinimoEntreAcertos: 140,
            tiposDisponiveis: Object.freeze(["alvo", "labirinto"]),
            labirinto: Object.freeze({
                velocidadeDoRobo: 220,
                raioDoRobo: 10,
                modelos: Object.freeze([
                    Object.freeze({
                        id: "zigueZague",
                        nome: "Zigue-zague",
                        inicio: Object.freeze({ x: 42, y: 378 }),
                        saida: Object.freeze({ x: 682, y: 18, largura: 26, altura: 62 }),
                        paredes: Object.freeze([
                            Object.freeze({ x: 112, y: 0, largura: 18, altura: 300 }),
                            Object.freeze({ x: 242, y: 100, largura: 18, altura: 320 }),
                            Object.freeze({ x: 372, y: 0, largura: 18, altura: 300 }),
                            Object.freeze({ x: 502, y: 100, largura: 18, altura: 320 }),
                            Object.freeze({ x: 632, y: 0, largura: 18, altura: 300 })
                        ])
                    }),
                    Object.freeze({
                        id: "corredores",
                        nome: "Corredores",
                        inicio: Object.freeze({ x: 42, y: 42 }),
                        saida: Object.freeze({ x: 650, y: 352, largura: 58, altura: 26 }),
                        paredes: Object.freeze([
                            Object.freeze({ x: 0, y: 90, largura: 500, altura: 18 }),
                            Object.freeze({ x: 180, y: 170, largura: 540, altura: 18 }),
                            Object.freeze({ x: 0, y: 250, largura: 500, altura: 18 }),
                            Object.freeze({ x: 180, y: 330, largura: 540, altura: 18 })
                        ])
                    }),
                    Object.freeze({
                        id: "espelho",
                        nome: "Espelho",
                        inicio: Object.freeze({ x: 678, y: 378 }),
                        saida: Object.freeze({ x: 12, y: 18, largura: 26, altura: 62 }),
                        paredes: Object.freeze([
                            Object.freeze({ x: 590, y: 100, largura: 18, altura: 320 }),
                            Object.freeze({ x: 460, y: 0, largura: 18, altura: 300 }),
                            Object.freeze({ x: 330, y: 100, largura: 18, altura: 320 }),
                            Object.freeze({ x: 200, y: 0, largura: 18, altura: 300 }),
                            Object.freeze({ x: 70, y: 100, largura: 18, altura: 320 })
                        ])
                    })
                ])
            })
        }),
        boost: Object.freeze({
            percentualDeCadencia: 0.2,
            percentualDeDano: 0.15,
            duracao: 30000
        })
    }),
    inimigo: Object.freeze({
        normal: Object.freeze({ nome: "Vermelho", vida: 100, velocidade: 1.5, tamanho: 20, cor: "#d33a45" }),
        elite: Object.freeze({ nome: "Roxo", vida: 300, velocidade: 1.1, tamanho: 25, cor: "#7b2cbf" }),
        rapido: Object.freeze({ nome: "Ciano rápido", vida: 200, velocidade: 2.2, tamanho: 18, escalaVisual: 20, cor: "#00bcd4" }),
        sabotador: Object.freeze({
            nome: "Sabotador",
            vida: 75,
            velocidade: 1.1,
            tamanho: 21,
            escalaVisual: 22,
            cor: "#5aa7a0",
            alcanceAtaque: 180,
            intervaloAtaque: 1200,
            velocidadeTiro: 6,
            tirosParaDestruirTorre: 6
        }),
        escorpiao: Object.freeze({ nome: "Escorpião do deserto", vida: 160, velocidade: 1.9, tamanho: 19, cor: "#d87524" }),
        mumia: Object.freeze({ nome: "Múmia", vida: 500, velocidade: 0.85, tamanho: 28, cor: "#d8c38e" }),
        loboDeGelo: Object.freeze({ nome: "Lobo de Gelo", vida: 240, velocidade: 1.8, tamanho: 21, cor: "#79d8f2" }),
        yeti: Object.freeze({ nome: "Yeti", vida: 650, velocidade: 0.75, tamanho: 31, cor: "#e7f7ff" }),
        macacoSaqueador: Object.freeze({
            nome: "Macaco Saqueador",
            vida: 220,
            velocidade: 2,
            tamanho: 22,
            cor: "#a96f3c",
            alcanceAtaque: 165,
            intervaloAtaque: 1800,
            velocidadeTiro: 5.5,
            percentualLentidaoDaTorre: 0.25,
            duracaoLentidaoDaTorre: 2500
        }),
        oncaDaSelva: Object.freeze({
            nome: "Onça da Selva",
            vida: 360,
            velocidade: 1.7,
            tamanho: 24,
            cor: "#d6a13f",
            percentualVidaParaDisparada: 0.5,
            multiplicadorVelocidadeEmDisparada: 1.45
        }),
        gorilaDaSelva: Object.freeze({
            nome: "Gorila da Selva",
            vida: 850,
            velocidade: 0.6,
            tamanho: 34,
            cor: "#415b32"
        }),
        raposaLadina: Object.freeze({
            nome: "Raposa Ladina",
            vida: 260,
            velocidade: 2.55,
            tamanho: 20,
            cor: "#d56a2f"
        }),
        javaliFurioso: Object.freeze({
            nome: "Javali Furioso",
            vida: 950,
            velocidade: 0.72,
            tamanho: 32,
            cor: "#6b4734",
            intervaloEntreArrancadas: 4000,
            duracaoArrancada: 1100,
            multiplicadorVelocidadeNaArrancada: 1.8
        }),
        corujaSombria: Object.freeze({
            nome: "Coruja Sombria",
            vida: 420,
            velocidade: 1.4,
            tamanho: 24,
            cor: "#6a587a",
            alcanceAtaque: 190,
            intervaloAtaque: 2100,
            velocidadeTiro: 6.5,
            percentualReducaoAlcanceDaTorre: 0.25,
            duracaoReducaoAlcanceDaTorre: 3000
        }),
        morcegoDeFogo: Object.freeze({
            nome: "Morcego de Fogo",
            vida: 280,
            velocidade: 2.8,
            tamanho: 20,
            cor: "#ef6a32"
        }),
        lagartoVulcanico: Object.freeze({
            nome: "Lagarto Vulcânico",
            vida: 480,
            velocidade: 1.65,
            tamanho: 26,
            cor: "#b94732"
        }),
        golemDeMagma: Object.freeze({
            nome: "Golem de Magma",
            vida: 1100,
            velocidade: 0.68,
            tamanho: 36,
            cor: "#493139"
        }),
        fragmentoDeMagma: Object.freeze({
            nome: "Fragmento de Magma",
            vida: 180,
            velocidade: 2.5,
            tamanho: 13,
            cor: "#ff7b35"
        }),
        mosquitoDoBrejo: Object.freeze({
            nome: "Mosquito do Brejo",
            vida: 340,
            velocidade: 3,
            tamanho: 19,
            cor: "#9fcf4a"
        }),
        sapoVenenoso: Object.freeze({
            nome: "Sapo Venenoso",
            vida: 650,
            velocidade: 1.35,
            tamanho: 29,
            cor: "#6eaa43"
        }),
        guardiaoDeLodo: Object.freeze({
            nome: "Guardião de Lodo",
            vida: 1400,
            velocidade: 0.62,
            tamanho: 39,
            cor: "#49673d"
        }),
        raptorAncestral: Object.freeze({
            nome: "Raptor Ancestral",
            vida: 420,
            velocidade: 2.9,
            tamanho: 22,
            cor: "#d59a3b"
        }),
        besouroDeAmbar: Object.freeze({
            nome: "Besouro de Âmbar",
            vida: 850,
            velocidade: 1.15,
            tamanho: 30,
            cor: "#c9852d",
            reducaoDeDano: 0.2
        }),
        triceratopo: Object.freeze({
            nome: "Tricerátopo",
            vida: 1700,
            velocidade: 0.58,
            tamanho: 42,
            cor: "#657a46"
        }),
        droneCacador: Object.freeze({
            nome: "Drone Caçador",
            vida: 360,
            velocidade: 3,
            tamanho: 20,
            cor: "#35d9ed"
        }),
        roboReparador: Object.freeze({
            nome: "Robô Reparador",
            vida: 700,
            velocidade: 1.2,
            tamanho: 28,
            cor: "#df4ed8",
            raioDoReparo: 140,
            vidaRestaurada: 45,
            intervaloEntreReparos: 1800,
            duracaoVisualDoReparo: 450
        }),
        sentinelaDeEscudo: Object.freeze({
            nome: "Sentinela de Escudo",
            vida: 1200,
            velocidade: 0.7,
            tamanho: 36,
            cor: "#35528c",
            raioDoEscudo: 150,
            reducaoDeDanoAosAliados: 0.25
        }),
        pixelCorrompido: Object.freeze({
            nome: "Pixel Corrompido",
            vida: 190,
            velocidade: 1.55,
            tamanho: 22,
            cor: "#ae00ff"
        }),
        erroVeloz: Object.freeze({
            nome: "Erro Veloz",
            vida: 280,
            velocidade: 2.45,
            tamanho: 20,
            cor: "#eb4dff"
        }),
        blocoInstavel: Object.freeze({
            nome: "Bloco Instável",
            vida: 780,
            velocidade: 0.78,
            tamanho: 33,
            cor: "#65507e"
        }),
        boss: Object.freeze({
            nome: "Boss comum",
            vida: 1000,
            incrementoVidaPorAparicao: 500,
            velocidade: 1.1,
            tamanho: 38,
            cor: "#4a001f"
        }),
        bossDeserto: Object.freeze({
            nome: "Faraó de Areia",
            vida: 2000,
            incrementoVidaPorAparicao: 500,
            velocidade: 1.3,
            tamanho: 42,
            cor: "#c98c32"
        }),
        bossArtico: Object.freeze({
            nome: "Titã Glacial",
            vida: 3000,
            incrementoVidaPorAparicao: 500,
            velocidade: 0.65,
            tamanho: 46,
            cor: "#78cce5"
        }),
        bossSelva: Object.freeze({
            nome: "Colosso da Selva",
            vida: 4000,
            incrementoVidaPorAparicao: 500,
            velocidade: 0.55,
            tamanho: 50,
            cor: "#54713b"
        }),
        bossTemperado: Object.freeze({
            nome: "Urso Ancestral",
            vida: 3500,
            incrementoVidaPorAparicao: 500,
            velocidade: 0.45,
            tamanho: 54,
            cor: "#594333",
            atrasoDoPrimeiroRugido: 3500,
            intervaloEntreRugidos: 6000,
            raioDoRugido: 230,
            duracaoDoAtordoamentoDaTorre: 1400,
            duracaoVisualDoRugido: 500
        }),
        bossVulcanico: Object.freeze({
            nome: "Titã de Obsidiana",
            vida: 3200,
            incrementoVidaPorAparicao: 0,
            velocidade: 1.05,
            tamanho: 52,
            cor: "#231d29",
            percentualDeVidaParaErupcao: 0.5,
            reducaoDeDanoDaCarapaca: 0.15,
            multiplicadorVelocidadeEmErupcao: 1.65,
            fragmentosNaPrimeiraAparicao: 2,
            maximoDeFragmentos: 5,
            duracaoVisualDaErupcao: 700
        }),
        bossPantano: Object.freeze({
            nome: "Hidra do Pântano",
            vida: 3800,
            incrementoVidaPorAparicao: 500,
            velocidade: 0.7,
            tamanho: 58,
            cor: "#314f36",
            percentualDeVidaParaRegeneracao: 0.5,
            vidaRegeneradaPorSegundo: 40,
            duracaoVisualDaAtivacao: 650
        }),
        bossPrimordial: Object.freeze({
            nome: "Tirano Primordial",
            vida: 4800,
            incrementoVidaPorAparicao: 600,
            velocidade: 0.68,
            tamanho: 62,
            cor: "#556b38",
            percentuaisDeVidaParaChamado: Object.freeze([0.6, 0.3]),
            raptorsPorChamado: 2,
            duracaoVisualDoChamado: 650
        }),
        protocoloZero: Object.freeze({
            nome: "Protocolo Zero",
            vida: 5400,
            incrementoVidaPorAparicao: 650,
            velocidade: 0.75,
            tamanho: 60,
            cor: "#273456",
            percentuaisDeVidaParaReversao: Object.freeze([0.65, 0.3]),
            distanciaDaReversao: 240,
            percentualDeVidaRestaurada: 0.08,
            duracaoVisualDaReversao: 700
        }),
        bossGlitch: Object.freeze({
            nome: "Núcleo Glitch",
            vida: 2600,
            incrementoVidaPorAparicao: 450,
            velocidade: 0.9,
            tamanho: 48,
            cor: "#28143d"
        })
    }),
    economia: Object.freeze({ dinheiroInicial: 150 }),
    torreFinal: Object.freeze({
        margemDaBorda: 20,
        raioDeContato: 18,
        largura: 64,
        altura: 78
    }),
    torre: Object.freeze({
        recompensaPorTiro: 20,
        percentualDeVenda: 0.6,
        quantidadeMaximaDeDefesasSelecionadas: 6,
        duracaoAvisoCreditosGeradosEmQuadros: 75,
        modoDeAlvoInicial: "primeiro",
        modosDeAlvo: Object.freeze([
            Object.freeze({ id: "primeiro", nome: "Primeiro" }),
            Object.freeze({ id: "ultimo", nome: "Último" }),
            Object.freeze({ id: "aleatorio", nome: "Aleatório" })
        ]),
        limitesPorFase: Object.freeze({ 1: 10, 2: 12, 3: 12, 4: 14, 5: 15, 6: 15, 7: 15, 8: 15, 9: 15, 99: 12 }),
        distanciaMinima: 70,
        tipos: Object.freeze({
            padrao: Object.freeze({
                nome: "Torre padrão",
                faseConcluidaParaDesbloqueio: 0,
                custo: 150,
                alcance: 150,
                dano: 10,
                velocidadeAtaque: 500,
                visualBase: Object.freeze({ corBase: "blue", corCanhao: "gray", raioBase: 22 }),
                melhorias: Object.freeze([
                    Object.freeze({
                        custo: 200,
                        dano: 15,
                        alcance: 165,
                        velocidadeAtaque: 450,
                        visual: Object.freeze({ corBase: "#1976d2", corCanhao: "#b0bec5", raioBase: 24 })
                    }),
                    Object.freeze({
                        custo: 300,
                        dano: 22,
                        alcance: 180,
                        velocidadeAtaque: 400,
                        visual: Object.freeze({ corBase: "#f9a825", corCanhao: "#ef6c00", raioBase: 26 })
                    }),
                    Object.freeze({
                        custo: 450,
                        dano: 30,
                        alcance: 200,
                        velocidadeAtaque: 350,
                        visual: Object.freeze({ corBase: "#8e24aa", corCanhao: "#f50057", raioBase: 28 })
                    })
                ])
            }),
            canhaoPesado: Object.freeze({
                nome: "Canhão pesado",
                faseConcluidaParaDesbloqueio: 1,
                custo: 250,
                alcance: 110,
                dano: 20,
                velocidadeAtaque: 700,
                visualDoProjetil: Object.freeze({
                    tamanho: 18,
                    corPrincipal: "#303033",
                    corSombra: "#202124",
                    corBrilho: "#494954"
                }),
                visualBase: Object.freeze({
                    corBase: "#b84b26",
                    corCanhao: "#3b2924",
                    corDetalhe: "#f0a34a",
                    raioBase: 25,
                    larguraCanhao: 18,
                    comprimentoCanhao: 40
                }),
                melhorias: Object.freeze([
                    Object.freeze({
                        custo: 300,
                        dano: 28,
                        alcance: 118,
                        velocidadeAtaque: 650,
                        visual: Object.freeze({
                            corBase: "#d7622b",
                            corCanhao: "#332621",
                            corDetalhe: "#ffc35a",
                            raioBase: 27,
                            larguraCanhao: 19,
                            comprimentoCanhao: 42
                        })
                    }),
                    Object.freeze({
                        custo: 420,
                        dano: 38,
                        alcance: 128,
                        velocidadeAtaque: 600,
                        visual: Object.freeze({
                            corBase: "#d99125",
                            corCanhao: "#342820",
                            corDetalhe: "#ffe17a",
                            raioBase: 29,
                            larguraCanhao: 20,
                            comprimentoCanhao: 44
                        })
                    }),
                    Object.freeze({
                        custo: 560,
                        dano: 50,
                        alcance: 140,
                        velocidadeAtaque: 550,
                        visual: Object.freeze({
                            corBase: "#a9382c",
                            corCanhao: "#251d1b",
                            corDetalhe: "#ffb24f",
                            raioBase: 31,
                            larguraCanhao: 22,
                            comprimentoCanhao: 47
                        })
                    })
                ])
            }),
            torreGlacial: Object.freeze({
                nome: "Torre Glacial",
                faseConcluidaParaDesbloqueio: 2,
                custo: 350,
                alcance: 170,
                dano: 18,
                velocidadeAtaque: 800,
                velocidadeTiro: 8,
                efeitoGlacial: Object.freeze({
                    percentualLentidao: 0.25,
                    duracaoLentidao: 1400,
                    acertosParaCongelar: 4,
                    duracaoCongelamento: 500
                }),
                visualBase: Object.freeze({
                    tipoVisual: "glacial",
                    corBase: "#286887",
                    corCanhao: "#d8f7ff",
                    corDetalhe: "#63c5dc",
                    raioBase: 25,
                    larguraCristal: 24,
                    alturaCristal: 50
                }),
                melhorias: Object.freeze([
                    Object.freeze({
                        custo: 420,
                        dano: 25,
                        alcance: 180,
                        velocidadeAtaque: 740,
                        efeitoGlacial: Object.freeze({
                            percentualLentidao: 0.3,
                            duracaoLentidao: 1600,
                            acertosParaCongelar: 4,
                            duracaoCongelamento: 600
                        }),
                        visual: Object.freeze({
                            tipoVisual: "glacial",
                            corBase: "#3284a6",
                            corCanhao: "#e9fcff",
                            corDetalhe: "#83e3ef",
                            raioBase: 27,
                            larguraCristal: 27,
                            alturaCristal: 54
                        })
                    }),
                    Object.freeze({
                        custo: 560,
                        dano: 34,
                        alcance: 195,
                        velocidadeAtaque: 680,
                        efeitoGlacial: Object.freeze({
                            percentualLentidao: 0.35,
                            duracaoLentidao: 1800,
                            acertosParaCongelar: 3,
                            duracaoCongelamento: 700
                        }),
                        visual: Object.freeze({
                            tipoVisual: "glacial",
                            corBase: "#5e9fb6",
                            corCanhao: "#ffffff",
                            corDetalhe: "#a9f1ff",
                            raioBase: 29,
                            larguraCristal: 30,
                            alturaCristal: 58
                        })
                    }),
                    Object.freeze({
                        custo: 720,
                        dano: 46,
                        alcance: 210,
                        velocidadeAtaque: 600,
                        efeitoGlacial: Object.freeze({
                            percentualLentidao: 0.4,
                            duracaoLentidao: 2200,
                            acertosParaCongelar: 3,
                            duracaoCongelamento: 800
                        }),
                        visual: Object.freeze({
                            tipoVisual: "glacial",
                            corBase: "#426c9d",
                            corCanhao: "#fff36a",
                            corDetalhe: "#b8f6ff",
                            raioBase: 31,
                            larguraCristal: 34,
                            alturaCristal: 64
                        })
                    })
                ])
            }),
            torreBesta: Object.freeze({
                nome: "Torre Besta",
                faseConcluidaParaDesbloqueio: 3,
                custo: 400,
                alcance: 210,
                dano: 55,
                velocidadeAtaque: 1100,
                velocidadeTiro: 10,
                visualBase: Object.freeze({
                    tipoVisual: "besta",
                    corBase: "#486b35",
                    corCanhao: "#5b351f",
                    corDetalhe: "#d7b968",
                    raioBase: 26,
                    larguraBesta: 46,
                    comprimentoBesta: 48
                }),
                melhorias: Object.freeze([
                    Object.freeze({
                        custo: 480,
                        dano: 75,
                        alcance: 225,
                        velocidadeAtaque: 1000,
                        visual: Object.freeze({
                            tipoVisual: "besta",
                            corBase: "#557f3d",
                            corCanhao: "#704328",
                            corDetalhe: "#e6cb78",
                            raioBase: 28,
                            larguraBesta: 50,
                            comprimentoBesta: 51
                        })
                    }),
                    Object.freeze({
                        custo: 650,
                        dano: 100,
                        alcance: 240,
                        velocidadeAtaque: 900,
                        visual: Object.freeze({
                            tipoVisual: "besta",
                            corBase: "#6f7f3e",
                            corCanhao: "#7d4a29",
                            corDetalhe: "#f0dc84",
                            raioBase: 30,
                            larguraBesta: 54,
                            comprimentoBesta: 54
                        })
                    }),
                    Object.freeze({
                        custo: 850,
                        dano: 135,
                        alcance: 260,
                        velocidadeAtaque: 800,
                        visual: Object.freeze({
                            tipoVisual: "besta",
                            corBase: "#385b36",
                            corCanhao: "#442719",
                            corDetalhe: "#fff36a",
                            raioBase: 32,
                            larguraBesta: 58,
                            comprimentoBesta: 58
                        })
                    })
                ])
            }),
            torreEsporos: Object.freeze({
                nome: "Torre de Esporos",
                faseConcluidaParaDesbloqueio: 4,
                custo: 475,
                alcance: 185,
                dano: 42,
                velocidadeAtaque: 1050,
                velocidadeTiro: 7.5,
                raioDanoEmArea: 60,
                duracaoExplosaoEmQuadros: 22,
                visualBase: Object.freeze({
                    tipoVisual: "esporos",
                    corBase: "#59452d",
                    corCanhao: "#b85c86",
                    corDetalhe: "#e0a05b",
                    corEsporos: "#d98aba",
                    raioBase: 26,
                    larguraCogumelo: 42,
                    alturaCogumelo: 48
                }),
                melhorias: Object.freeze([
                    Object.freeze({
                        custo: 550,
                        dano: 58,
                        alcance: 195,
                        velocidadeAtaque: 950,
                        raioDanoEmArea: 65,
                        duracaoExplosaoEmQuadros: 22,
                        visual: Object.freeze({
                            tipoVisual: "esporos",
                            corBase: "#6b5130",
                            corCanhao: "#c86898",
                            corDetalhe: "#f0b765",
                            corEsporos: "#e89bc8",
                            raioBase: 28,
                            larguraCogumelo: 46,
                            alturaCogumelo: 52
                        })
                    }),
                    Object.freeze({
                        custo: 725,
                        dano: 78,
                        alcance: 207,
                        velocidadeAtaque: 850,
                        raioDanoEmArea: 72,
                        duracaoExplosaoEmQuadros: 24,
                        visual: Object.freeze({
                            tipoVisual: "esporos",
                            corBase: "#765f38",
                            corCanhao: "#8050a0",
                            corDetalhe: "#ffd06d",
                            corEsporos: "#b98ae0",
                            raioBase: 30,
                            larguraCogumelo: 50,
                            alturaCogumelo: 56
                        })
                    }),
                    Object.freeze({
                        custo: 950,
                        dano: 105,
                        alcance: 220,
                        velocidadeAtaque: 750,
                        raioDanoEmArea: 80,
                        duracaoExplosaoEmQuadros: 26,
                        visual: Object.freeze({
                            tipoVisual: "esporos",
                            corBase: "#4b3b2b",
                            corCanhao: "#9a5fc2",
                            corDetalhe: "#fff08a",
                            corEsporos: "#d4a2ff",
                            raioBase: 32,
                            larguraCogumelo: 56,
                            alturaCogumelo: 62
                        })
                    })
                ])
            }),
            obliterador: Object.freeze({
                nome: "Obliterador",
                faseConcluidaParaDesbloqueio: 5,
                custo: 550,
                alcance: 230,
                dano: 38,
                velocidadeAtaque: 1600,
                velocidadeTiro: 13,
                quantidadeDeLasers: 3,
                visualBase: Object.freeze({
                    tipoVisual: "obliterador",
                    corBase: "#3d252a",
                    corCanhao: "#e14d45",
                    corDetalhe: "#ff8a54",
                    raioBase: 28,
                    comprimentoCanhao: 48
                }),
                melhorias: Object.freeze([
                    Object.freeze({
                        custo: 650,
                        dano: 52,
                        alcance: 245,
                        velocidadeAtaque: 1500,
                        velocidadeTiro: 13.5,
                        quantidadeDeLasers: 3,
                        visual: Object.freeze({
                            tipoVisual: "obliterador",
                            corBase: "#51282c",
                            corCanhao: "#f05a4e",
                            corDetalhe: "#ffad59",
                            raioBase: 30,
                            comprimentoCanhao: 51
                        })
                    }),
                    Object.freeze({
                        custo: 850,
                        dano: 70,
                        alcance: 260,
                        velocidadeAtaque: 1400,
                        velocidadeTiro: 14,
                        quantidadeDeLasers: 3,
                        visual: Object.freeze({
                            tipoVisual: "obliterador",
                            corBase: "#651f28",
                            corCanhao: "#ff5549",
                            corDetalhe: "#ffd06a",
                            raioBase: 32,
                            comprimentoCanhao: 54
                        })
                    }),
                    Object.freeze({
                        custo: 1100,
                        dano: 96,
                        alcance: 280,
                        velocidadeAtaque: 1250,
                        velocidadeTiro: 15,
                        quantidadeDeLasers: 3,
                        visual: Object.freeze({
                            tipoVisual: "obliterador",
                            corBase: "#781a24",
                            corCanhao: "#ff3f36",
                            corDetalhe: "#fff07a",
                            raioBase: 34,
                            comprimentoCanhao: 58
                        })
                    })
                ])
            }),
            torreSismica: Object.freeze({
                nome: "Torre Sísmica",
                faseConcluidaParaDesbloqueio: 6,
                custo: 600,
                alcance: 170,
                dano: 0,
                velocidadeAtaque: 0,
                naoAtira: true,
                limitePorPartida: 2,
                efeitoSismico: Object.freeze({
                    cargasNecessarias: 3,
                    distanciaDoEmpurrao: 120,
                    duracaoDoAtordoamentoDoBoss: 1000,
                    percentualDeVulnerabilidade: 0,
                    duracaoDaVulnerabilidade: 0,
                    atrasoDoSegundoImpacto: 0,
                    multiplicadorDoSegundoImpacto: 0.5,
                    duracaoVisualEmQuadros: 34
                }),
                visualBase: Object.freeze({
                    tipoVisual: "sismica",
                    corBase: "#473832",
                    corCanhao: "#d96b35",
                    corDetalhe: "#f3b45d",
                    corFissura: "#ff8438",
                    raioBase: 29,
                    nivelVisual: 0
                }),
                melhorias: Object.freeze([
                    Object.freeze({
                        custo: 400,
                        alcance: 170,
                        efeitoSismico: Object.freeze({
                            cargasNecessarias: 2,
                            distanciaDoEmpurrao: 120,
                            duracaoDoAtordoamentoDoBoss: 1000,
                            percentualDeVulnerabilidade: 0,
                            duracaoDaVulnerabilidade: 0,
                            atrasoDoSegundoImpacto: 0,
                            multiplicadorDoSegundoImpacto: 0.5,
                            duracaoVisualEmQuadros: 34
                        }),
                        visual: Object.freeze({
                            tipoVisual: "sismica",
                            corBase: "#554039",
                            corCanhao: "#e47738",
                            corDetalhe: "#ffc46d",
                            corFissura: "#ff9145",
                            raioBase: 30,
                            nivelVisual: 1
                        })
                    }),
                    Object.freeze({
                        custo: 550,
                        alcance: 170,
                        efeitoSismico: Object.freeze({
                            cargasNecessarias: 2,
                            distanciaDoEmpurrao: 120,
                            duracaoDoAtordoamentoDoBoss: 1000,
                            percentualDeVulnerabilidade: 0.2,
                            duracaoDaVulnerabilidade: 3000,
                            atrasoDoSegundoImpacto: 0,
                            multiplicadorDoSegundoImpacto: 0.5,
                            duracaoVisualEmQuadros: 36
                        }),
                        visual: Object.freeze({
                            tipoVisual: "sismica",
                            corBase: "#62483d",
                            corCanhao: "#ed813e",
                            corDetalhe: "#ffd27e",
                            corFissura: "#ffa14f",
                            raioBase: 32,
                            nivelVisual: 2
                        })
                    }),
                    Object.freeze({
                        custo: 750,
                        alcance: 170,
                        efeitoSismico: Object.freeze({
                            cargasNecessarias: 2,
                            distanciaDoEmpurrao: 120,
                            duracaoDoAtordoamentoDoBoss: 1000,
                            percentualDeVulnerabilidade: 0.2,
                            duracaoDaVulnerabilidade: 3000,
                            atrasoDoSegundoImpacto: 600,
                            multiplicadorDoSegundoImpacto: 0.65,
                            duracaoVisualEmQuadros: 38
                        }),
                        visual: Object.freeze({
                            tipoVisual: "sismica",
                            corBase: "#714d3e",
                            corCanhao: "#ff8f42",
                            corDetalhe: "#ffe08f",
                            corFissura: "#ffb258",
                            raioBase: 34,
                            nivelVisual: 3
                        })
                    })
                ])
            }),
            iscaBlindada: Object.freeze({
                nome: "Isca Blindada",
                faseConcluidaParaDesbloqueio: 0,
                requerCompraNaLoja: true,
                categoriaLoja: "torres",
                custoNaLoja: 30,
                custo: 200,
                alcance: 0,
                dano: 0,
                velocidadeAtaque: 0,
                naoAtira: true,
                atraiInimigosAtiradores: true,
                resistenciaATiros: 10,
                limitePorPartida: 2,
                visualBase: Object.freeze({
                    tipoVisual: "isca",
                    corBase: "#6d7782",
                    corCanhao: "#e6bd58",
                    corDetalhe: "#dce7ea",
                    raioBase: 27
                }),
                melhorias: Object.freeze([])
            }),
            amplificadorPixel: Object.freeze({
                nome: "Amplificador Pixel",
                faseConcluidaParaDesbloqueio: 0,
                requerCompraNaLoja: true,
                categoriaLoja: "torres",
                custoNaLoja: 45,
                custo: 300,
                alcance: 135,
                dano: 0,
                velocidadeAtaque: 0,
                naoAtira: true,
                percentualBonusCadencia: 0.15,
                limitePorPartida: 1,
                visualBase: Object.freeze({
                    tipoVisual: "amplificador",
                    corBase: "#3d5575",
                    corCanhao: "#5ef0d0",
                    corDetalhe: "#c0f9ef",
                    raioBase: 27
                }),
                melhorias: Object.freeze([])
            }),
            geradorDeCreditos: Object.freeze({
                nome: "Gerador de Créditos",
                faseConcluidaParaDesbloqueio: 0,
                requerCompraNaLoja: true,
                categoriaLoja: "torres",
                custoNaLoja: 70,
                custo: 300,
                alcance: 0,
                dano: 0,
                velocidadeAtaque: 0,
                naoAtira: true,
                creditosPorWave: 100,
                limitePorPartida: 1,
                visualBase: Object.freeze({
                    tipoVisual: "geradorDeCreditos",
                    corBase: "#42624a",
                    corCanhao: "#f3ca55",
                    corDetalhe: "#9ce6a8",
                    corPainel: "#173529",
                    raioBase: 27,
                    nivelVisual: 0
                }),
                melhorias: Object.freeze([
                    Object.freeze({
                        custo: 350,
                        creditosPorWave: 150,
                        visual: Object.freeze({
                            tipoVisual: "geradorDeCreditos",
                            corBase: "#4d7254",
                            corCanhao: "#f6d265",
                            corDetalhe: "#aaf0b5",
                            corPainel: "#173a2b",
                            raioBase: 29,
                            nivelVisual: 1
                        })
                    }),
                    Object.freeze({
                        custo: 500,
                        creditosPorWave: 225,
                        visual: Object.freeze({
                            tipoVisual: "geradorDeCreditos",
                            corBase: "#56805d",
                            corCanhao: "#ffdc73",
                            corDetalhe: "#bcf6c5",
                            corPainel: "#123d2c",
                            raioBase: 31,
                            nivelVisual: 2
                        })
                    }),
                    Object.freeze({
                        custo: 700,
                        creditosPorWave: 325,
                        visual: Object.freeze({
                            tipoVisual: "geradorDeCreditos",
                            corBase: "#62936a",
                            corCanhao: "#ffe58b",
                            corDetalhe: "#d5ffda",
                            corPainel: "#0e4630",
                            raioBase: 33,
                            nivelVisual: 3
                        })
                    })
                ])
            }),
            torreDeRaios: Object.freeze({
                nome: "Torre de Raios",
                faseConcluidaParaDesbloqueio: 0,
                requerCompraNaLoja: true,
                categoriaLoja: "torres",
                custoNaLoja: 60,
                custo: 425,
                alcance: 175,
                dano: 30,
                velocidadeAtaque: 800,
                velocidadeTiro: 11,
                limitePorPartida: 2,
                efeitoDeRaio: Object.freeze({
                    quantidadeMaximaDeAlvos: 3,
                    alcanceEncadeamento: 110,
                    multiplicadorDeDanoPorSalto: 0.7
                }),
                visualBase: Object.freeze({
                    tipoVisual: "raios",
                    corBase: "#334b78",
                    corCanhao: "#70e7ff",
                    corDetalhe: "#d8fbff",
                    raioBase: 27
                }),
                melhorias: Object.freeze([])
            }),
            lancaChamas: Object.freeze({
                nome: "Lança-Chamas",
                faseConcluidaParaDesbloqueio: 0,
                requerCompraNaLoja: true,
                categoriaLoja: "torres",
                custoNaLoja: 100,
                custo: 650,
                alcance: 145,
                dano: 10,
                velocidadeAtaque: 333,
                velocidadeTiro: 9,
                limitePorPartida: 2,
                efeitoDeQueimadura: Object.freeze({
                    danoPorIntervalo: 5,
                    intervaloEntreDanos: 1000,
                    duracao: 10000
                }),
                visualBase: Object.freeze({
                    tipoVisual: "lancaChamas",
                    corBase: "#4a3028",
                    corCanhao: "#30343a",
                    corDetalhe: "#ff7a2f",
                    corCombustivel: "#d44a24",
                    raioBase: 28
                }),
                melhorias: Object.freeze([])
            }),
            minaTerrestre: Object.freeze({
                nome: "Mina Terrestre",
                tipoDeItem: "mina",
                faseConcluidaParaDesbloqueio: 0,
                requerCompraNaLoja: true,
                categoriaLoja: "minas",
                custoNaLoja: 25,
                custo: 100,
                alcance: 0,
                dano: 100,
                velocidadeAtaque: 0,
                naoAtira: true,
                exigeCaminho: true,
                naoContaNoLimiteDeTorres: true,
                raioExplosao: 75,
                raioDeContato: 18,
                duracaoExplosaoEmQuadros: 24,
                distanciaMinimaEntreMinas: 40,
                limitePorPartida: 5,
                visualBase: Object.freeze({
                    tipoVisual: "mina",
                    corBase: "#3f4852",
                    corCanhao: "#e14b3f",
                    corDetalhe: "#e8c55b",
                    raioBase: 18
                }),
                melhorias: Object.freeze([])
            }),
            minaCongelante: Object.freeze({
                nome: "Mina Congelante",
                tipoDeItem: "mina",
                faseConcluidaParaDesbloqueio: 0,
                requerCompraNaLoja: true,
                categoriaLoja: "minas",
                custoNaLoja: 35,
                custo: 125,
                alcance: 0,
                dano: 55,
                velocidadeAtaque: 0,
                naoAtira: true,
                exigeCaminho: true,
                naoContaNoLimiteDeTorres: true,
                raioExplosao: 85,
                raioDeContato: 18,
                duracaoExplosaoEmQuadros: 26,
                distanciaMinimaEntreMinas: 40,
                limitePorPartida: 4,
                tipoVisualDaExplosao: "gelo",
                efeitoGlacial: Object.freeze({
                    percentualLentidao: 0.5,
                    duracaoLentidao: 2500,
                    acertosParaCongelar: 1,
                    duracaoCongelamento: 800
                }),
                visualBase: Object.freeze({
                    tipoVisual: "mina",
                    corBase: "#356b88",
                    corCanhao: "#9ef4ff",
                    corDetalhe: "#d8fbff",
                    corBrilho: "#ffffff",
                    raioBase: 18
                }),
                melhorias: Object.freeze([])
            }),
            bombaPesada: Object.freeze({
                nome: "Bomba Pesada",
                tipoDeItem: "bomba",
                faseConcluidaParaDesbloqueio: 0,
                requerCompraNaLoja: true,
                categoriaLoja: "minas",
                custoNaLoja: 40,
                custo: 200,
                alcance: 0,
                dano: 200,
                velocidadeAtaque: 0,
                naoAtira: true,
                naoContaNoLimiteDeTorres: true,
                raioExplosao: 100,
                tempoDoPavio: 1500,
                duracaoExplosaoEmQuadros: 28,
                distanciaMinimaEntreBombas: 50,
                limitePorPartida: 3,
                visualBase: Object.freeze({
                    tipoVisual: "bomba",
                    corBase: "#31373f",
                    corCanhao: "#ff7a3d",
                    corDetalhe: "#e4b94f",
                    raioBase: 20
                }),
                melhorias: Object.freeze([])
            })
        })
    }),
    tiro: Object.freeze({ velocidade: 7 })
});

// Cada fase possui sua própria trajetória, usada no desenho, movimento e bloqueio de torres.
const caminhosDasFases = Object.freeze({
    1: Object.freeze([
        { x: 0, y: 525 },
        { x: 160, y: 525 },
        { x: 160, y: 150 },
        { x: 350, y: 150 },
        { x: 350, y: 600 },
        { x: 570, y: 600 },
        { x: 570, y: 100 },
        { x: 800, y: 100 },
        { x: 800, y: 500 },
        { x: 1030, y: 500 },
        { x: 1030, y: 220 },
        { x: 1200, y: 220 }
    ]),
    2: Object.freeze([
        { x: 0, y: 120 },
        { x: 220, y: 120 },
        { x: 220, y: 620 },
        { x: 460, y: 620 },
        { x: 460, y: 180 },
        { x: 700, y: 180 },
        { x: 700, y: 520 },
        { x: 930, y: 520 },
        { x: 930, y: 80 },
        { x: 1150, y: 80 },
        { x: 1150, y: 380 },
        { x: 1200, y: 380 }
    ]),
    3: Object.freeze([
        { x: 0, y: 360 },
        { x: 210, y: 360 },
        { x: 210, y: 80 },
        { x: 470, y: 80 },
        { x: 470, y: 620 },
        { x: 720, y: 620 },
        { x: 720, y: 180 },
        { x: 970, y: 180 },
        { x: 970, y: 560 },
        { x: 1160, y: 560 },
        { x: 1160, y: 320 },
        { x: 1200, y: 320 }
    ]),
    4: Object.freeze([
        { x: 0, y: 650 },
        { x: 150, y: 650 },
        { x: 150, y: 370 },
        { x: 360, y: 370 },
        { x: 360, y: 90 },
        { x: 600, y: 90 },
        { x: 600, y: 610 },
        { x: 840, y: 610 },
        { x: 840, y: 180 },
        { x: 1080, y: 180 },
        { x: 1080, y: 500 },
        { x: 1200, y: 500 }
    ]),
    5: Object.freeze([
        Object.freeze([
            { x: 0, y: 130 },
            { x: 180, y: 130 },
            { x: 180, y: 300 },
            { x: 400, y: 300 },
            { x: 400, y: 170 },
            { x: 650, y: 170 },
            { x: 650, y: 350 },
            { x: 820, y: 350 },
            { x: 820, y: 100 },
            { x: 1040, y: 100 },
            { x: 1040, y: 600 },
            { x: 900, y: 600 },
            { x: 900, y: 470 },
            { x: 1150, y: 470 },
            { x: 1150, y: 350 },
            { x: 1200, y: 350 }
        ]),
        Object.freeze([
            { x: 0, y: 570 },
            { x: 180, y: 570 },
            { x: 180, y: 400 },
            { x: 400, y: 400 },
            { x: 400, y: 530 },
            { x: 650, y: 530 },
            { x: 650, y: 350 },
            { x: 820, y: 350 },
            { x: 820, y: 100 },
            { x: 1040, y: 100 },
            { x: 1040, y: 600 },
            { x: 900, y: 600 },
            { x: 900, y: 470 },
            { x: 1150, y: 470 },
            { x: 1150, y: 350 },
            { x: 1200, y: 350 }
        ])
    ]),
    6: Object.freeze([
        { x: 0, y: 350 },
        { x: 140, y: 350 },
        { x: 140, y: 90 },
        { x: 360, y: 90 },
        { x: 360, y: 540 },
        { x: 580, y: 540 },
        { x: 580, y: 170 },
        { x: 800, y: 170 },
        { x: 800, y: 620 },
        { x: 1010, y: 620 },
        { x: 1010, y: 300 },
        { x: 1200, y: 300 }
    ]),
    7: Object.freeze([
        { x: 0, y: 100 },
        { x: 180, y: 100 },
        { x: 180, y: 560 },
        { x: 390, y: 560 },
        { x: 390, y: 220 },
        { x: 610, y: 220 },
        { x: 610, y: 620 },
        { x: 830, y: 620 },
        { x: 830, y: 140 },
        { x: 1050, y: 140 },
        { x: 1050, y: 430 },
        { x: 1200, y: 430 }
    ]),
    8: Object.freeze([
        Object.freeze([
            { x: 0, y: 610 },
            { x: 140, y: 610 },
            { x: 140, y: 180 },
            { x: 330, y: 180 },
            { x: 330, y: 510 },
            { x: 520, y: 510 },
            { x: 520, y: 80 },
            { x: 740, y: 80 },
            { x: 740, y: 570 },
            { x: 940, y: 570 },
            { x: 940, y: 250 },
            { x: 1200, y: 250 }
        ]),
        Object.freeze([
            { x: 0, y: 610 },
            { x: 140, y: 610 },
            { x: 140, y: 420 },
            { x: 330, y: 420 },
            { x: 330, y: 80 },
            { x: 520, y: 80 },
            { x: 520, y: 570 },
            { x: 740, y: 570 },
            { x: 740, y: 180 },
            { x: 940, y: 180 },
            { x: 940, y: 500 },
            { x: 1080, y: 500 },
            { x: 1080, y: 250 },
            { x: 1200, y: 250 }
        ]),
        Object.freeze([
            { x: 0, y: 610 },
            { x: 140, y: 610 },
            { x: 140, y: 520 },
            { x: 430, y: 520 },
            { x: 430, y: 120 },
            { x: 700, y: 120 },
            { x: 700, y: 500 },
            { x: 940, y: 500 },
            { x: 940, y: 250 },
            { x: 1200, y: 250 }
        ])
    ]),
    9: Object.freeze([
        { x: 0, y: 350 },
        { x: 150, y: 350 },
        { x: 150, y: 100 },
        { x: 360, y: 100 },
        { x: 360, y: 590 },
        { x: 590, y: 590 },
        { x: 590, y: 180 },
        { x: 820, y: 180 },
        { x: 820, y: 560 },
        { x: 1040, y: 560 },
        { x: 1040, y: 280 },
        { x: 1200, y: 280 }
    ]),
    99: Object.freeze([
        { x: 0, y: 590 },
        { x: 190, y: 590 },
        { x: 190, y: 120 },
        { x: 430, y: 120 },
        { x: 430, y: 490 },
        { x: 650, y: 490 },
        { x: 650, y: 220 },
        { x: 890, y: 220 },
        { x: 890, y: 620 },
        { x: 1080, y: 620 },
        { x: 1080, y: 360 },
        { x: 1200, y: 360 }
    ])
});

const temasDoMapa = Object.freeze({
    campo: Object.freeze({
        terrenoBase: "#397440",
        terrenoClaro: "#3d7a43",
        terrenoEscuro: "#35703d",
        caminhoContorno: "#24492a",
        caminhoBase: "#b98f51",
        caminhoCentro: "#d0aa66",
        caminhoMarcas: "#8a6538",
        torreFinalBase: "#17351f",
        torreFinalCorpo: "#68835d",
        torreFinalDetalhe: "#a8c27d",
        torreFinalNucleo: "#6fd8ff"
    }),
    deserto: Object.freeze({
        terrenoBase: "#b87838",
        terrenoClaro: "#c98b47",
        terrenoEscuro: "#b97a3a",
        caminhoContorno: "#5a3926",
        caminhoBase: "#8d6747",
        caminhoCentro: "#d5b273",
        caminhoMarcas: "#795537",
        torreFinalBase: "#4b2c1d",
        torreFinalCorpo: "#b07a3f",
        torreFinalDetalhe: "#f0c86c",
        torreFinalNucleo: "#70e5e0"
    }),
    artico: Object.freeze({
        terrenoBase: "#a9d1e2",
        terrenoClaro: "#c9e8f2",
        terrenoEscuro: "#96c4d8",
        caminhoContorno: "#426f85",
        caminhoBase: "#7eb6ce",
        caminhoCentro: "#bfe9f4",
        caminhoMarcas: "#eefbff",
        torreFinalBase: "#244b61",
        torreFinalCorpo: "#6aa6bd",
        torreFinalDetalhe: "#d8f7ff",
        torreFinalNucleo: "#8ff5ff"
    }),
    selva: Object.freeze({
        terrenoBase: "#245c37",
        terrenoClaro: "#2d6b3f",
        terrenoEscuro: "#1d5031",
        caminhoContorno: "#173b27",
        caminhoBase: "#715437",
        caminhoCentro: "#987047",
        caminhoMarcas: "#c39a5d",
        torreFinalBase: "#153721",
        torreFinalCorpo: "#526f3c",
        torreFinalDetalhe: "#b9c96a",
        torreFinalNucleo: "#7af0b0"
    }),
    temperada: Object.freeze({
        terrenoBase: "#6f6338",
        terrenoClaro: "#7c713f",
        terrenoEscuro: "#625a34",
        caminhoContorno: "#352f24",
        caminhoBase: "#70543e",
        caminhoCentro: "#9a7650",
        caminhoMarcas: "#d3a95e",
        torreFinalBase: "#33281f",
        torreFinalCorpo: "#77563d",
        torreFinalDetalhe: "#d29a4a",
        torreFinalNucleo: "#f3d66f"
    }),
    vulcanica: Object.freeze({
        terrenoBase: "#38282c",
        terrenoClaro: "#403035",
        terrenoEscuro: "#302126",
        caminhoContorno: "#171318",
        caminhoBase: "#6d322d",
        caminhoCentro: "#a94732",
        caminhoMarcas: "#ff9b45",
        torreFinalBase: "#171218",
        torreFinalCorpo: "#4b3037",
        torreFinalDetalhe: "#c64c39",
        torreFinalNucleo: "#ffb13b"
    }),
    pantano: Object.freeze({
        terrenoBase: "#263f32",
        terrenoClaro: "#2e4b39",
        terrenoEscuro: "#1d342a",
        caminhoContorno: "#14251d",
        caminhoBase: "#526044",
        caminhoCentro: "#728055",
        caminhoMarcas: "#b2cc62",
        torreFinalBase: "#12231b",
        torreFinalCorpo: "#405f43",
        torreFinalDetalhe: "#91b85b",
        torreFinalNucleo: "#b7f05f"
    }),
    primordial: Object.freeze({
        terrenoBase: "#294b2e",
        terrenoClaro: "#355c35",
        terrenoEscuro: "#203d29",
        caminhoContorno: "#162a1c",
        caminhoBase: "#664a2d",
        caminhoCentro: "#8b6840",
        caminhoMarcas: "#e2b85f",
        torreFinalBase: "#14261a",
        torreFinalCorpo: "#4f6d3f",
        torreFinalDetalhe: "#d09a42",
        torreFinalNucleo: "#ffd66b"
    }),
    futurista: Object.freeze({
        terrenoBase: "#101b31",
        terrenoClaro: "#152844",
        terrenoEscuro: "#0c172a",
        caminhoContorno: "#07101d",
        caminhoBase: "#263b57",
        caminhoCentro: "#365875",
        caminhoMarcas: "#47e5f2",
        torreFinalBase: "#07101d",
        torreFinalCorpo: "#263c5b",
        torreFinalDetalhe: "#e54ed9",
        torreFinalNucleo: "#53f5ff"
    }),
    glitch: Object.freeze({
        terrenoBase: "#150d22",
        terrenoClaro: "#201230",
        terrenoEscuro: "#101822",
        caminhoContorno: "#05070c",
        caminhoBase: "#4a235f",
        caminhoCentro: "#723b7f",
        caminhoMarcas: "#45f1d6",
        torreFinalBase: "#080b12",
        torreFinalCorpo: "#39214f",
        torreFinalDetalhe: "#e44cff",
        torreFinalNucleo: "#45f1d6"
    })
});

// Elementos puramente visuais: não interferem no posicionamento ou nas regras.
const decoracoesDoMapa = Object.freeze({
    campo: Object.freeze([
        Object.freeze({ tipo: "lago", x: 680, y: 390, escala: 1.15 }),
        Object.freeze({ tipo: "arvore", x: 82, y: 92, escala: 1.1 }),
        Object.freeze({ tipo: "arvore", x: 278, y: 344, escala: 0.9 }),
        Object.freeze({ tipo: "arvore", x: 468, y: 230, escala: 1.05 }),
        Object.freeze({ tipo: "arvore", x: 925, y: 105, escala: 0.95 }),
        Object.freeze({ tipo: "arvore", x: 1115, y: 612, escala: 1.15 }),
        Object.freeze({ tipo: "pedra", x: 78, y: 648, escala: 1 }),
        Object.freeze({ tipo: "pedra", x: 255, y: 255, escala: 0.8 }),
        Object.freeze({ tipo: "pedra", x: 472, y: 505, escala: 0.9 }),
        Object.freeze({ tipo: "pedra", x: 930, y: 365, escala: 0.75 }),
        Object.freeze({ tipo: "arbusto", x: 690, y: 648, escala: 1 }),
        Object.freeze({ tipo: "arbusto", x: 1090, y: 80, escala: 0.85 }),
        Object.freeze({ tipo: "flores", x: 480, y: 70, escala: 1 }),
        Object.freeze({ tipo: "flores", x: 915, y: 635, escala: 0.9 })
    ]),
    deserto: Object.freeze([
        Object.freeze({ tipo: "piramide", x: 90, y: 300, escala: 0.9 }),
        Object.freeze({ tipo: "piramide", x: 585, y: 75, escala: 0.75 }),
        Object.freeze({ tipo: "piramide", x: 1080, y: 625, escala: 1.05 }),
        Object.freeze({ tipo: "cacto", x: 85, y: 580, escala: 1.05 }),
        Object.freeze({ tipo: "cacto", x: 335, y: 325, escala: 0.8 }),
        Object.freeze({ tipo: "cacto", x: 580, y: 410, escala: 1 }),
        Object.freeze({ tipo: "cacto", x: 815, y: 300, escala: 0.9 }),
        Object.freeze({ tipo: "cacto", x: 1060, y: 520, escala: 1.1 }),
        Object.freeze({ tipo: "cacto", x: 1060, y: 230, escala: 0.85 }),
        Object.freeze({ tipo: "matoSeco", x: 90, y: 55, escala: 1 }),
        Object.freeze({ tipo: "matoSeco", x: 350, y: 80, escala: 0.9 }),
        Object.freeze({ tipo: "matoSeco", x: 590, y: 675, escala: 1.15 }),
        Object.freeze({ tipo: "matoSeco", x: 850, y: 650, escala: 0.85 }),
        Object.freeze({ tipo: "rochaDeserto", x: 85, y: 450, escala: 0.8 }),
        Object.freeze({ tipo: "rochaDeserto", x: 340, y: 470, escala: 0.95 }),
        Object.freeze({ tipo: "rochaDeserto", x: 590, y: 280, escala: 0.85 }),
        Object.freeze({ tipo: "rochaDeserto", x: 820, y: 90, escala: 0.8 }),
        Object.freeze({ tipo: "rochaDeserto", x: 1070, y: 650, escala: 0.9 })
    ]),
    artico: Object.freeze([
        Object.freeze({ tipo: "iglu", x: 95, y: 115, escala: 0.85 }),
        Object.freeze({ tipo: "iglu", x: 1090, y: 95, escala: 0.8 }),
        Object.freeze({ tipo: "pinguim", x: 330, y: 255, escala: 0.9 }),
        Object.freeze({ tipo: "pinguim", x: 585, y: 350, escala: 1.05 }),
        Object.freeze({ tipo: "pinguim", x: 1110, y: 670, escala: 0.8 }),
        Object.freeze({ tipo: "pinheiroNevado", x: 85, y: 610, escala: 1.05 }),
        Object.freeze({ tipo: "pinheiroNevado", x: 340, y: 430, escala: 0.85 }),
        Object.freeze({ tipo: "pinheiroNevado", x: 590, y: 120, escala: 0.9 }),
        Object.freeze({ tipo: "pinheiroNevado", x: 840, y: 390, escala: 1.1 }),
        Object.freeze({ tipo: "pinheiroNevado", x: 1080, y: 405, escala: 0.85 }),
        Object.freeze({ tipo: "blocoGelo", x: 305, y: 655, escala: 0.95 }),
        Object.freeze({ tipo: "blocoGelo", x: 865, y: 655, escala: 0.85 }),
        Object.freeze({ tipo: "lagoCongelado", x: 835, y: 430, escala: 0.9 })
    ]),
    selva: Object.freeze([
        Object.freeze({ tipo: "arvoreSelva", x: 80, y: 100, escala: 1 }),
        Object.freeze({ tipo: "arvoreSelva", x: 290, y: 585, escala: 0.85 }),
        Object.freeze({ tipo: "arvoreSelva", x: 500, y: 330, escala: 1.05 }),
        Object.freeze({ tipo: "arvoreSelva", x: 735, y: 330, escala: 0.9 }),
        Object.freeze({ tipo: "arvoreSelva", x: 980, y: 620, escala: 1.1 }),
        Object.freeze({ tipo: "ruinaSelva", x: 275, y: 210, escala: 0.95 }),
        Object.freeze({ tipo: "ruinaSelva", x: 740, y: 95, escala: 0.8 }),
        Object.freeze({ tipo: "ruinaSelva", x: 1005, y: 360, escala: 1.05 }),
        Object.freeze({ tipo: "cipoSelva", x: 65, y: 430, escala: 1 }),
        Object.freeze({ tipo: "cipoSelva", x: 485, y: 660, escala: 0.9 }),
        Object.freeze({ tipo: "cipoSelva", x: 940, y: 75, escala: 1.1 }),
        Object.freeze({ tipo: "florTropical", x: 260, y: 60, escala: 1 }),
        Object.freeze({ tipo: "florTropical", x: 760, y: 500, escala: 0.9 }),
        Object.freeze({ tipo: "lagoSelva", x: 1010, y: 80, escala: 0.8 })
    ]),
    temperada: Object.freeze([
        Object.freeze({ tipo: "arvoreTemperada", x: 75, y: 310, escala: 1.05 }),
        Object.freeze({ tipo: "arvoreTemperada", x: 290, y: 75, escala: 0.9 }),
        Object.freeze({ tipo: "arvoreTemperada", x: 520, y: 70, escala: 1.1 }),
        Object.freeze({ tipo: "arvoreTemperada", x: 535, y: 635, escala: 0.95 }),
        Object.freeze({ tipo: "arvoreTemperada", x: 760, y: 630, escala: 0.85 }),
        Object.freeze({ tipo: "cogumelosTemperados", x: 285, y: 500, escala: 1 }),
        Object.freeze({ tipo: "cogumelosTemperados", x: 750, y: 235, escala: 0.85 }),
        Object.freeze({ tipo: "cogumelosTemperados", x: 1110, y: 655, escala: 1.05 }),
        Object.freeze({ tipo: "troncoCaido", x: 520, y: 355, escala: 0.85 }),
        Object.freeze({ tipo: "troncoCaido", x: 1110, y: 240, escala: 0.95 }),
        Object.freeze({ tipo: "lagoOutonal", x: 300, y: 655, escala: 0.7 })
    ]),
    vulcanica: Object.freeze([
        Object.freeze({ tipo: "lagoDeLava", x: 245, y: 650, escala: 0.95 }),
        Object.freeze({ tipo: "lagoDeLava", x: 920, y: 90, escala: 0.8 }),
        Object.freeze({ tipo: "vulcao", x: 65, y: 110, escala: 0.85 }),
        Object.freeze({ tipo: "vulcao", x: 1110, y: 570, escala: 1 }),
        Object.freeze({ tipo: "cristalDeObsidiana", x: 265, y: 300, escala: 0.9 }),
        Object.freeze({ tipo: "cristalDeObsidiana", x: 475, y: 300, escala: 1.05 }),
        Object.freeze({ tipo: "cristalDeObsidiana", x: 690, y: 400, escala: 0.8 }),
        Object.freeze({ tipo: "cristalDeObsidiana", x: 910, y: 400, escala: 1.05 }),
        Object.freeze({ tipo: "rochaDeBasalto", x: 260, y: 60, escala: 0.8 }),
        Object.freeze({ tipo: "rochaDeBasalto", x: 475, y: 650, escala: 0.95 }),
        Object.freeze({ tipo: "rochaDeBasalto", x: 690, y: 80, escala: 0.85 }),
        Object.freeze({ tipo: "rochaDeBasalto", x: 1120, y: 90, escala: 0.9 })
    ]),
    pantano: Object.freeze([
        Object.freeze({ tipo: "pocaToxica", x: 295, y: 330, escala: 0.85 }),
        Object.freeze({ tipo: "pocaToxica", x: 945, y: 505, escala: 1.05 }),
        Object.freeze({ tipo: "arvoreDoPantano", x: 70, y: 630, escala: 0.9 }),
        Object.freeze({ tipo: "arvoreDoPantano", x: 300, y: 70, escala: 0.8 }),
        Object.freeze({ tipo: "arvoreDoPantano", x: 720, y: 420, escala: 1 }),
        Object.freeze({ tipo: "arvoreDoPantano", x: 1130, y: 80, escala: 0.85 }),
        Object.freeze({ tipo: "juncosDoPantano", x: 85, y: 355, escala: 1 }),
        Object.freeze({ tipo: "juncosDoPantano", x: 505, y: 390, escala: 0.9 }),
        Object.freeze({ tipo: "juncosDoPantano", x: 930, y: 310, escala: 1.05 }),
        Object.freeze({ tipo: "cogumeloDoPantano", x: 310, y: 660, escala: 0.9 }),
        Object.freeze({ tipo: "cogumeloDoPantano", x: 720, y: 80, escala: 1.1 }),
        Object.freeze({ tipo: "cogumeloDoPantano", x: 1140, y: 650, escala: 0.85 })
    ]),
    primordial: Object.freeze([
        Object.freeze({ tipo: "arvorePrimordial", x: 70, y: 80, escala: 0.9 }),
        Object.freeze({ tipo: "arvorePrimordial", x: 255, y: 365, escala: 0.82 }),
        Object.freeze({ tipo: "arvorePrimordial", x: 635, y: 350, escala: 1.05 }),
        Object.freeze({ tipo: "arvorePrimordial", x: 1100, y: 590, escala: 0.95 }),
        Object.freeze({ tipo: "samambaiaGigante", x: 80, y: 355, escala: 1 }),
        Object.freeze({ tipo: "samambaiaGigante", x: 420, y: 650, escala: 0.9 }),
        Object.freeze({ tipo: "samambaiaGigante", x: 850, y: 350, escala: 1.1 }),
        Object.freeze({ tipo: "samambaiaGigante", x: 1110, y: 90, escala: 0.85 }),
        Object.freeze({ tipo: "cristalDeAmbar", x: 250, y: 85, escala: 0.9 }),
        Object.freeze({ tipo: "cristalDeAmbar", x: 645, y: 650, escala: 1.05 }),
        Object.freeze({ tipo: "cristalDeAmbar", x: 1100, y: 400, escala: 0.85 }),
        Object.freeze({ tipo: "ossosPrimordiais", x: 430, y: 350, escala: 0.9 }),
        Object.freeze({ tipo: "ossosPrimordiais", x: 850, y: 665, escala: 1.05 })
    ]),
    futurista: Object.freeze([
        Object.freeze({ tipo: "predioNeon", x: 70, y: 105, escala: 0.9 }),
        Object.freeze({ tipo: "predioNeon", x: 255, y: 485, escala: 0.82 }),
        Object.freeze({ tipo: "predioNeon", x: 485, y: 300, escala: 1.05 }),
        Object.freeze({ tipo: "predioNeon", x: 700, y: 645, escala: 0.9 }),
        Object.freeze({ tipo: "predioNeon", x: 930, y: 340, escala: 1 }),
        Object.freeze({ tipo: "predioNeon", x: 1120, y: 650, escala: 0.8 }),
        Object.freeze({ tipo: "arvoreHolografica", x: 75, y: 610, escala: 0.9 }),
        Object.freeze({ tipo: "arvoreHolografica", x: 470, y: 650, escala: 0.85 }),
        Object.freeze({ tipo: "arvoreHolografica", x: 720, y: 85, escala: 1 }),
        Object.freeze({ tipo: "arvoreHolografica", x: 1120, y: 90, escala: 0.8 }),
        Object.freeze({ tipo: "placaNeon", x: 270, y: 60, escala: 0.9 }),
        Object.freeze({ tipo: "placaNeon", x: 945, y: 90, escala: 0.85 })
    ]),
    glitch: Object.freeze([])
});

aplicarPreferenciasSalvas();

if (document.readyState === "complete") {
    setTimeout(configurarInicioAutomaticoDaMusicaDoLobby, 0);
} else {
    window.addEventListener("load", configurarInicioAutomaticoDaMusicaDoLobby, { once: true });
}

const desenhadoresDeDecoracao = Object.freeze({
    lago: desenharLago,
    arvore: desenharArvore,
    pedra: desenharPedra,
    arbusto: desenharArbusto,
    flores: desenharFlores,
    cacto: desenharCacto,
    matoSeco: desenharMatoSeco,
    piramide: desenharPiramide,
    rochaDeserto: desenharRochaDoDeserto,
    iglu: desenharIglu,
    pinguim: desenharPinguim,
    pinheiroNevado: desenharPinheiroNevado,
    blocoGelo: desenharBlocoDeGelo,
    lagoCongelado: desenharLagoCongelado,
    arvoreSelva: desenharArvoreDaSelva,
    ruinaSelva: desenharRuinaDaSelva,
    cipoSelva: desenharCipoDaSelva,
    florTropical: desenharFlorTropical,
    lagoSelva: desenharLagoDaSelva,
    arvoreTemperada: desenharArvoreTemperada,
    cogumelosTemperados: desenharCogumelosTemperados,
    troncoCaido: desenharTroncoCaido,
    lagoOutonal: desenharLagoOutonal,
    lagoDeLava: desenharLagoDeLava,
    vulcao: desenharVulcao,
    cristalDeObsidiana: desenharCristalDeObsidiana,
    rochaDeBasalto: desenharRochaDeBasalto,
    pocaToxica: desenharPocaToxica,
    arvoreDoPantano: desenharArvoreDoPantano,
    juncosDoPantano: desenharJuncosDoPantano,
    cogumeloDoPantano: desenharCogumeloDoPantano,
    arvorePrimordial: desenharArvorePrimordial,
    samambaiaGigante: desenharSamambaiaGigante,
    cristalDeAmbar: desenharCristalDeAmbar,
    ossosPrimordiais: desenharOssosPrimordiais,
    predioNeon: desenharPredioNeon,
    arvoreHolografica: desenharArvoreHolografica,
    placaNeon: desenharPlacaNeon
});

// Estado do jogo
let inimigos = [];
let torres = [];
let minasTerrestres = [];
let bombasPesadas = [];
let explosoesDosExplosivos = [];
let avisosDeCreditosGerados = [];
let tiros = [];
let tirosDosInimigos = [];
let dinheiro = CONFIG.economia.dinheiroInicial;
let wave = 0;
let inimigosParaCriar = 0;
let inimigosRoxosParaCriar = 0;
let inimigosVermelhosParaCriar = 0;
let inimigosRapidosParaCriar = 0;
let inimigosSabotadoresParaCriar = 0;
let inimigosEscorpioesParaCriar = 0;
let inimigosMumiasParaCriar = 0;
let inimigosLobosDeGeloParaCriar = 0;
let inimigosYetisParaCriar = 0;
let inimigosMacacosSaqueadoresParaCriar = 0;
let inimigosGorilasDaSelvaParaCriar = 0;
let inimigosOncasDaSelvaParaCriar = 0;
let inimigosRaposasLadinasParaCriar = 0;
let inimigosJavalisFuriososParaCriar = 0;
let inimigosCorujasSombriasParaCriar = 0;
let inimigosMorcegosDeFogoParaCriar = 0;
let inimigosLagartosVulcanicosParaCriar = 0;
let inimigosGolemsDeMagmaParaCriar = 0;
let inimigosMosquitosDoBrejoParaCriar = 0;
let inimigosSaposVenenososParaCriar = 0;
let inimigosGuardioesDeLodoParaCriar = 0;
let inimigosRaptorsAncestraisParaCriar = 0;
let inimigosBesourosDeAmbarParaCriar = 0;
let inimigosTriceratoposParaCriar = 0;
let inimigosDronesCacadoresParaCriar = 0;
let inimigosRobosReparadoresParaCriar = 0;
let inimigosSentinelasDeEscudoParaCriar = 0;
let pixelsCorrompidosParaCriar = 0;
let errosVelozesParaCriar = 0;
let blocosInstaveisParaCriar = 0;
let inimigosChefesParaCriar = 0;
let proximoIndiceDeEntrada = 0;
let proximoInimigoEm = 0;
let proximaWaveEm = 0;
let aviso = "";
let avisoExpiraEm = 0;
let avisoBossExpiraEm = 0;
let torreSelecionada = null;
let jogoIniciado = false;
let partidaEncerrada = false;
let partidaVencida = false;
let jogoPausado = false;
let pausaIniciadaEm = 0;
let instanteDoUltimoQuadro = 0;
let paginaOcultadaEm = 0;
let pausaAutomaticaPorOcultacao = false;
let tutorialConcluido = carregarTutorialConcluido();
let tutorialAtivo = false;
let passoTutorial = 0;
let tutorialSolicitado = false;
let progressoMissoesSemanais = carregarProgressoMissoesSemanais();
let recompensasPermanentesDasMissoes = carregarRecompensasPermanentesDasMissoes();
let pacoteApoiador = carregarPacoteApoiador();
let estatisticasDasConquistas = carregarEstatisticasDasConquistas();
let maiorFaseConcluida = carregarMaiorFaseConcluida();
let faseSecretaDescoberta = carregarFaseSecretaDescoberta();
let capitulo2Desbloqueado = carregarDesbloqueioDoCapitulo2();
let cartaMisteriosaVista = carregarCartaMisteriosaVista();
let cartaDaMaquinaDoTempoVista = carregarCartaDaMaquinaDoTempoVista();
let maquinaDoTempoDesbloqueada = carregarMaquinaDoTempoDesbloqueada();
let epocaDaMaquinaDoTempoSelecionada = carregarEpocaDaMaquinaDoTempo();
let transmissaoProjetoRelogioVista = carregarTransmissaoProjetoRelogioVista();
let teleporteGlitchEmAndamento = false;
let labirintoAmareloAtivo = false;
let jogadorDosCorredoresAmarelos = null;
let teclasPressionadasNosCorredores = new Set();
let animacaoDosCorredoresAmarelos = null;
let conversaDoSenhorDoTempoAtiva = false;
let indiceDaFalaDoSenhorDoTempo = 0;
let tipoDaConversaDoSenhorDoTempo = "entrada";
let cutsceneDoCapitulo2Ativa = false;
let cutsceneDaCartaAtiva = false;
let cutsceneDaTransmissaoRetomaPartida = false;
let maquinaDoTempoAcabouDeSerConcedida = false;
let pulsoTemporalAcabouDeSerDesbloqueado = false;
let temporizadorDoTeleporteGlitch = null;
let radioProjetoRelogioDisponivel = false;
let fragmentosPixel = carregarFragmentosPixel();
let comprasDaLoja = carregarComprasDaLoja();
let defesasSelecionadasParaPartida = carregarSelecaoDeDefesas();
let selecaoDeDefesasEmEdicao = new Set();
let selecaoDeDefesasParaModoInfinito = false;
let mensagemDaSelecaoDeDefesas = "";
let inimigosDerrotadosNoAlbum = carregarInimigosDerrotadosNoAlbum();
let categoriaDaLojaSelecionada = "torres";
let categoriaDoAlbumSelecionada = "torres";
let telaDoMenuAberta = null;
const TELAS_DO_LOBBY_EM_TELA_CHEIA = new Set([
    "album",
    "capitulos",
    "fases",
    "tutorial",
    "loja",
    "pacoteApoiador",
    "missoes",
    "conquistas",
    "selecaoDefesas"
]);
let elementoDeOrigemDoConteudoMenu = null;
let idDaCompraPendente = null;
let elementoDeOrigemDaCompra = null;
let filaDeNotificacoesDeProgresso = [];
let notificacaoDeProgressoAtiva = null;
let checkoutDoApoiadorEmAndamento = false;
let checkoutDoApoiadorFalhou = false;
let sincronizacaoDoApoiadorEmAndamento = false;
let sincronizacaoDoApoiadorTentada = CONFIG.pacoteApoiador.modoDemonstracao;
let faseSelecionada = 1;
let capituloSelecionado = 1;
let novaFaseDesbloqueada = false;
let fragmentosRecebidosNoResultado = 0;
let modoWavesInfinitas = false;
let tipoDeTorreParaConstruir = "padrao";
let posicaoCursorNoMapa = null;
let ultimaWaveComBonusOferecido = 0;
let opcoesDeBonusAtuais = [];
let bonusPosBossEscolhidos = [];
let multiplicadorDeDanoDasTorres = 1;
let multiplicadorDeAlcanceDasTorres = 1;
let multiplicadorDeCadenciaDasTorres = 1;
const imagemFliperamaNoMapa = typeof Image === "function" ? new Image() : null;
let imagemFliperamaNoMapaFalhou = false;

if (imagemFliperamaNoMapa) {
    imagemFliperamaNoMapa.decoding = "async";
    imagemFliperamaNoMapa.addEventListener("error", () => {
        imagemFliperamaNoMapaFalhou = true;
    });
    imagemFliperamaNoMapa.src = CONFIG.fliperama.sprite.caminho;
}

let fliperamaNoMapa = null;
let minigameFliperamaAtivo = false;
let tipoMinigameFliperamaAtivo = "alvo";
let modeloLabirintoFliperamaAtivo = null;
let alvoDoMinigameFliperama = null;
let roboDoLabirintoFliperama = null;
let teclasPressionadasNoLabirinto = new Set();
let acertosNoMinigameFliperama = 0;
let minigameFliperamaTerminaEm = 0;
let animacaoDoMinigameFliperama = null;
let boostFliperamaAtivo = false;
let boostFliperamaExpiraEm = 0;
let boostDanoFliperamaAtivo = false;
let boostDanoFliperamaExpiraEm = 0;
let proximaWaveDoPulsoTemporal = 1;
let pulsoTemporalNormalExpiraEm = 0;
let pulsoTemporalBossExpiraEm = 0;

defesasSelecionadasParaPartida = normalizarSelecaoDeDefesas(
    defesasSelecionadasParaPartida
);
salvarSelecaoDeDefesas();

controles.classList.add("oculto");
seletorTorres.classList.add("oculto");
atualizarIndicadorFaseSelecionada();
atualizarTemaDoLobby();
atualizarPortalFaseSecreta();
atualizarBotoesDeConstrucao();
atualizarPainelDeBoosts();
atualizarPulsoTemporalNoPosto();
atualizarSaldoDeFragmentos();
atualizarResumoDasMissoesNoMenu();
verificarConquistasAutomaticas();
atualizarResumoDasConquistasNoMenu();
atualizarIdentidadeDoApoiador();
aplicarIdiomaNaInterface();
sincronizarPacoteApoiadorComServidor();

if (!tutorialConcluido) {
    mostrarTutorial();
}

function carregarTutorialConcluido() {
    try {
        return localStorage.getItem(CHAVE_TUTORIAL_CONCLUIDO) === "true";
    } catch (erro) {
        return false;
    }
}

function carregarFaseSecretaDescoberta() {
    try {
        return localStorage.getItem(CHAVE_FASE_SECRETA_DESCOBERTA) === "true";
    } catch (erro) {
        return false;
    }
}

function salvarFaseSecretaDescoberta() {
    try {
        localStorage.setItem(CHAVE_FASE_SECRETA_DESCOBERTA, "true");
    } catch (erro) {
        // A descoberta continua válida durante a sessão sem armazenamento local.
    }
}

function carregarDesbloqueioDoCapitulo2() {
    try {
        return localStorage.getItem(CHAVE_CAPITULO_2_DESBLOQUEADO) === "true";
    } catch (erro) {
        return false;
    }
}

function salvarDesbloqueioDoCapitulo2() {
    try {
        localStorage.setItem(CHAVE_CAPITULO_2_DESBLOQUEADO, "true");
    } catch (erro) {
        // O desbloqueio continua válido durante a sessão sem armazenamento local.
    }
}

function carregarCartaMisteriosaVista() {
    try {
        return localStorage.getItem(CHAVE_CARTA_MISTERIOSA_VISTA) === "true";
    } catch (erro) {
        return false;
    }
}

function salvarCartaMisteriosaVista() {
    try {
        localStorage.setItem(CHAVE_CARTA_MISTERIOSA_VISTA, "true");
    } catch (erro) {
        // A carta continua marcada como vista durante a sessão.
    }
}

function carregarCartaDaMaquinaDoTempoVista() {
    try {
        return localStorage.getItem(CHAVE_CARTA_MAQUINA_DO_TEMPO_VISTA) === "true";
    } catch (erro) {
        return false;
    }
}

function salvarCartaDaMaquinaDoTempoVista() {
    try {
        localStorage.setItem(CHAVE_CARTA_MAQUINA_DO_TEMPO_VISTA, "true");
    } catch (erro) {
        // A carta continua marcada como vista durante a sessão.
    }
}

function carregarTransmissaoProjetoRelogioVista() {
    try {
        return localStorage.getItem(CHAVE_TRANSMISSAO_PROJETO_RELOGIO_VISTA) === "true";
    } catch (erro) {
        return false;
    }
}

function salvarTransmissaoProjetoRelogioVista() {
    try {
        localStorage.setItem(CHAVE_TRANSMISSAO_PROJETO_RELOGIO_VISTA, "true");
    } catch (erro) {
        // A transmissão continua marcada como vista durante a sessão.
    }
}

function carregarMaquinaDoTempoDesbloqueada() {
    try {
        return localStorage.getItem(CHAVE_MAQUINA_DO_TEMPO_DESBLOQUEADA) === "true";
    } catch (erro) {
        return false;
    }
}

function salvarMaquinaDoTempoDesbloqueada() {
    try {
        localStorage.setItem(CHAVE_MAQUINA_DO_TEMPO_DESBLOQUEADA, "true");
    } catch (erro) {
        // A Máquina do Tempo continua disponível durante a sessão.
    }
}

function obterEpocaDaMaquinaDoTempo(idDaEpoca) {
    return CONFIG.maquinaDoTempo.epocas.find(epoca => epoca.id === idDaEpoca) || null;
}

function carregarEpocaDaMaquinaDoTempo() {
    try {
        const epocaSalva = localStorage.getItem(CHAVE_EPOCA_DA_MAQUINA_DO_TEMPO);
        return obterEpocaDaMaquinaDoTempo(epocaSalva)?.id
            || CONFIG.maquinaDoTempo.epocaInicial;
    } catch (erro) {
        return CONFIG.maquinaDoTempo.epocaInicial;
    }
}

function salvarEpocaDaMaquinaDoTempo() {
    try {
        localStorage.setItem(
            CHAVE_EPOCA_DA_MAQUINA_DO_TEMPO,
            epocaDaMaquinaDoTempoSelecionada
        );
    } catch (erro) {
        // A época escolhida continua válida durante a sessão.
    }
}

function salvarTutorialConcluido() {
    try {
        localStorage.setItem(CHAVE_TUTORIAL_CONCLUIDO, "true");
    } catch (erro) {
        // O tutorial continua funcionando durante a sessão mesmo sem armazenamento local.
    }
}

function carregarSelecaoDeDefesas() {
    try {
        const selecaoSalva = JSON.parse(
            localStorage.getItem(CHAVE_SELECAO_DE_DEFESAS) || "[]"
        );
        return new Set(Array.isArray(selecaoSalva) ? selecaoSalva : []);
    } catch (erro) {
        return new Set();
    }
}

function salvarSelecaoDeDefesas() {
    try {
        localStorage.setItem(
            CHAVE_SELECAO_DE_DEFESAS,
            JSON.stringify([...defesasSelecionadasParaPartida])
        );
    } catch (erro) {
        // A seleção continua válida durante a sessão.
    }
}

function obterTiposDeDefesa() {
    return Object.keys(CONFIG.torre.tipos);
}

function normalizarSelecaoDeDefesas(selecao, preencherSeVazia = true) {
    const limite = CONFIG.torre.quantidadeMaximaDeDefesasSelecionadas;
    const tiposValidos = new Set(obterTiposDeDefesa());
    const tiposSelecionados = [...(selecao || [])]
        .filter((tipo, indice, lista) => (
            tiposValidos.has(tipo)
            && lista.indexOf(tipo) === indice
            && torreEstaDesbloqueada(tipo)
        ))
        .slice(0, limite);

    if (tiposSelecionados.length === 0 && preencherSeVazia) {
        return new Set(
            obterTiposDeDefesa()
                .filter(torreEstaDesbloqueada)
                .slice(0, limite)
        );
    }

    return new Set(tiposSelecionados);
}

function prepararSelecaoDeDefesasParaPartida(tutorialDeveIniciar = false) {
    defesasSelecionadasParaPartida = normalizarSelecaoDeDefesas(
        defesasSelecionadasParaPartida
    );

    if (tutorialDeveIniciar && !defesasSelecionadasParaPartida.has("padrao")) {
        defesasSelecionadasParaPartida = new Set([
            "padrao",
            ...[...defesasSelecionadasParaPartida].slice(
                0,
                CONFIG.torre.quantidadeMaximaDeDefesasSelecionadas - 1
            )
        ]);
    }

    salvarSelecaoDeDefesas();
}

function defesaEstaSelecionadaParaPartida(tipoDaDefesa) {
    return defesasSelecionadasParaPartida.has(tipoDaDefesa);
}

function obterPrimeiraDefesaDisponivelParaPartida() {
    return [...defesasSelecionadasParaPartida]
        .find(tipo => torreEstaDesbloqueada(tipo)) || "padrao";
}

function obterIdentificadorDaSemana(data = new Date()) {
    const dataLocalComoUtc = new Date(Date.UTC(
        data.getFullYear(),
        data.getMonth(),
        data.getDate()
    ));
    const diaDaSemana = dataLocalComoUtc.getUTCDay() || 7;
    dataLocalComoUtc.setUTCDate(dataLocalComoUtc.getUTCDate() + 4 - diaDaSemana);
    const anoDaSemana = dataLocalComoUtc.getUTCFullYear();
    const primeiroDiaDoAno = new Date(Date.UTC(anoDaSemana, 0, 1));
    const numeroDaSemana = Math.ceil(
        (((dataLocalComoUtc - primeiroDiaDoAno) / 86400000) + 1) / 7
    );

    return `${anoDaSemana}-S${numeroDaSemana.toString().padStart(2, "0")}`;
}

function obterDataDaProximaRenovacaoSemanal(data = new Date()) {
    const diasAteSegunda = data.getDay() === 1 ? 7 : (8 - data.getDay()) % 7;
    return new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate() + diasAteSegunda,
        0,
        0,
        0,
        0
    );
}

function criarProgressoSemanalVazio(data = new Date()) {
    return {
        semana: obterIdentificadorDaSemana(data),
        inimigosEliminados: 0,
        fasesConcluidas: 0,
        maiorWaveInfinita: 0,
        recompensasResgatadas: [],
        recompensasConcedidas: {}
    };
}

function normalizarProgressoDasMissoesSemanais(valorSalvo, data = new Date()) {
    const progressoVazio = criarProgressoSemanalVazio(data);

    if (!valorSalvo || valorSalvo.semana !== progressoVazio.semana) {
        return progressoVazio;
    }

    const idsValidos = new Set(CONFIG.missoes.semanais.map(missao => missao.id));
    const normalizarContador = valor => (
        Number.isInteger(valor) && valor >= 0 ? valor : 0
    );

    const recompensasConcedidas = valorSalvo.recompensasConcedidas
        && typeof valorSalvo.recompensasConcedidas === "object"
        ? Object.fromEntries(
            Object.entries(valorSalvo.recompensasConcedidas)
                .filter(([id, rotulo]) => idsValidos.has(id) && typeof rotulo === "string")
        )
        : {};

    return {
        semana: progressoVazio.semana,
        inimigosEliminados: normalizarContador(valorSalvo.inimigosEliminados),
        fasesConcluidas: normalizarContador(valorSalvo.fasesConcluidas),
        maiorWaveInfinita: normalizarContador(valorSalvo.maiorWaveInfinita),
        recompensasResgatadas: Array.isArray(valorSalvo.recompensasResgatadas)
            ? [...new Set(valorSalvo.recompensasResgatadas.filter(id => idsValidos.has(id)))]
            : [],
        recompensasConcedidas
    };
}

function carregarProgressoMissoesSemanais() {
    try {
        const valorSalvo = JSON.parse(localStorage.getItem(CHAVE_MISSOES_SEMANAIS) || "null");
        const progressoNormalizado = normalizarProgressoDasMissoesSemanais(valorSalvo);

        if (!valorSalvo || valorSalvo.semana !== progressoNormalizado.semana) {
            localStorage.setItem(
                CHAVE_MISSOES_SEMANAIS,
                JSON.stringify(progressoNormalizado)
            );
        }

        return progressoNormalizado;
    } catch (erro) {
        return criarProgressoSemanalVazio();
    }
}

function salvarProgressoMissoesSemanais() {
    try {
        localStorage.setItem(
            CHAVE_MISSOES_SEMANAIS,
            JSON.stringify(progressoMissoesSemanais)
        );
    } catch (erro) {
        // O progresso continua válido durante a sessão sem armazenamento local.
    }
}

function garantirMissoesDaSemanaAtual() {
    const semanaAtual = obterIdentificadorDaSemana();

    if (progressoMissoesSemanais.semana === semanaAtual) {
        return;
    }

    progressoMissoesSemanais = criarProgressoSemanalVazio();
    salvarProgressoMissoesSemanais();
}

function carregarRecompensasPermanentesDasMissoes() {
    const recompensasVazias = {
        skinsDesbloqueadas: [],
        conquistasDesbloqueadas: [],
        skinTorrePadraoEquipada: null
    };

    try {
        const valorSalvo = JSON.parse(
            localStorage.getItem(CHAVE_RECOMPENSAS_MISSOES) || "null"
        );

        if (!valorSalvo) {
            return recompensasVazias;
        }

        const skinsValidas = new Set(Object.keys(CONFIG.missoes.skins));
        const conquistasValidas = new Set(Object.keys(CONFIG.conquistas));
        const skinsDesbloqueadas = Array.isArray(valorSalvo.skinsDesbloqueadas)
            ? [...new Set(valorSalvo.skinsDesbloqueadas.filter(id => skinsValidas.has(id)))]
            : [];
        const conquistasDesbloqueadas = Array.isArray(valorSalvo.conquistasDesbloqueadas)
            ? [...new Set(valorSalvo.conquistasDesbloqueadas.filter(id => conquistasValidas.has(id)))]
            : [];
        const skinEquipada = skinsDesbloqueadas.includes(valorSalvo.skinTorrePadraoEquipada)
            ? valorSalvo.skinTorrePadraoEquipada
            : null;

        return {
            skinsDesbloqueadas,
            conquistasDesbloqueadas,
            skinTorrePadraoEquipada: skinEquipada
        };
    } catch (erro) {
        return recompensasVazias;
    }
}

function salvarRecompensasPermanentesDasMissoes() {
    try {
        localStorage.setItem(
            CHAVE_RECOMPENSAS_MISSOES,
            JSON.stringify(recompensasPermanentesDasMissoes)
        );
    } catch (erro) {
        // As recompensas continuam disponíveis durante a sessão.
    }
}

function carregarPacoteApoiador() {
    const pacoteVazio = {
        adquirido: false,
        skinEquipada: false
    };

    try {
        const valorSalvo = JSON.parse(localStorage.getItem(CHAVE_PACOTE_APOIADOR) || "null");
        const adquirido = CONFIG.pacoteApoiador.modoDemonstracao
            && valorSalvo?.adquirido === true;

        return {
            adquirido,
            skinEquipada: adquirido && valorSalvo?.skinEquipada === true
        };
    } catch (erro) {
        return pacoteVazio;
    }
}

function salvarPacoteApoiador() {
    try {
        const valorSeguroParaSalvar = CONFIG.pacoteApoiador.modoDemonstracao
            ? pacoteApoiador
            : { skinEquipada: pacoteApoiador.adquirido && pacoteApoiador.skinEquipada };
        localStorage.setItem(
            CHAVE_PACOTE_APOIADOR,
            JSON.stringify(valorSeguroParaSalvar)
        );
    } catch (erro) {
        // O pacote continua ativo durante a sessão mesmo sem armazenamento local.
    }
}

function carregarPreferenciaLocalDaSkinDoApoiador() {
    try {
        const valorSalvo = JSON.parse(localStorage.getItem(CHAVE_PACOTE_APOIADOR) || "null");
        return valorSalvo?.skinEquipada === true;
    } catch (erro) {
        return false;
    }
}

function carregarEstatisticasDasConquistas() {
    const estatisticasVazias = {
        inimigosEliminados: progressoMissoesSemanais.inimigosEliminados || 0,
        fasesConcluidas: progressoMissoesSemanais.fasesConcluidas || 0,
        maiorWaveInfinita: progressoMissoesSemanais.maiorWaveInfinita || 0
    };

    try {
        const valorSalvo = JSON.parse(
            localStorage.getItem(CHAVE_ESTATISTICAS_CONQUISTAS) || "null"
        );

        if (!valorSalvo) {
            return estatisticasVazias;
        }

        const normalizarContador = valor => (
            Number.isInteger(valor) && valor >= 0 ? valor : 0
        );

        return {
            inimigosEliminados: Math.max(
                estatisticasVazias.inimigosEliminados,
                normalizarContador(valorSalvo.inimigosEliminados)
            ),
            fasesConcluidas: Math.max(
                estatisticasVazias.fasesConcluidas,
                normalizarContador(valorSalvo.fasesConcluidas)
            ),
            maiorWaveInfinita: Math.max(
                estatisticasVazias.maiorWaveInfinita,
                normalizarContador(valorSalvo.maiorWaveInfinita)
            )
        };
    } catch (erro) {
        return estatisticasVazias;
    }
}

function salvarEstatisticasDasConquistas() {
    try {
        localStorage.setItem(
            CHAVE_ESTATISTICAS_CONQUISTAS,
            JSON.stringify(estatisticasDasConquistas)
        );
    } catch (erro) {
        // As estatísticas continuam válidas durante a sessão.
    }
}

function carregarMaiorFaseConcluida() {
    try {
        const valorSalvo = Number(localStorage.getItem(CHAVE_PROGRESSO_FASES));

        if (!Number.isInteger(valorSalvo)) {
            return 0;
        }

        return Math.max(0, Math.min(valorSalvo, CONFIG.fases.length));
    } catch {
        return 0;
    }
}

function salvarProgressoDasFases() {
    try {
        localStorage.setItem(CHAVE_PROGRESSO_FASES, maiorFaseConcluida.toString());
    } catch {
        // O jogo continua funcionando mesmo quando o navegador bloqueia o armazenamento local.
    }
}

function carregarFragmentosPixel() {
    try {
        const valorBruto = localStorage.getItem(CHAVE_FRAGMENTOS_PIXEL);

        if (valorBruto === null) {
            return CONFIG.loja.fragmentosIniciais;
        }

        const valorSalvo = Number(valorBruto);

        if (!Number.isInteger(valorSalvo) || valorSalvo < 0) {
            return CONFIG.loja.fragmentosIniciais;
        }

        return valorSalvo;
    } catch {
        return CONFIG.loja.fragmentosIniciais;
    }
}

function salvarFragmentosPixel() {
    try {
        localStorage.setItem(CHAVE_FRAGMENTOS_PIXEL, fragmentosPixel.toString());
    } catch {
        // O jogo continua funcionando mesmo quando o armazenamento está indisponível.
    }
}

function carregarComprasDaLoja() {
    try {
        const comprasSalvas = JSON.parse(localStorage.getItem(CHAVE_COMPRAS_LOJA) || "[]");
        return new Set(Array.isArray(comprasSalvas) ? comprasSalvas : []);
    } catch {
        return new Set();
    }
}

function salvarComprasDaLoja() {
    try {
        localStorage.setItem(CHAVE_COMPRAS_LOJA, JSON.stringify([...comprasDaLoja]));
    } catch {
        // O jogo continua funcionando mesmo quando o armazenamento está indisponível.
    }
}

function carregarInimigosDerrotadosNoAlbum() {
    try {
        const valorSalvo = JSON.parse(
            localStorage.getItem(CHAVE_FIGURINHAS_DO_ALBUM) || "[]"
        );
        const tiposValidos = new Set(Object.keys(CONFIG.inimigo));
        const tiposDerrotados = Array.isArray(valorSalvo)
            ? valorSalvo.filter(tipo => tiposValidos.has(tipo))
            : [];

        return new Set(tiposDerrotados);
    } catch {
        return new Set();
    }
}

function salvarInimigosDerrotadosNoAlbum() {
    try {
        localStorage.setItem(
            CHAVE_FIGURINHAS_DO_ALBUM,
            JSON.stringify([...inimigosDerrotadosNoAlbum])
        );
    } catch {
        // As figurinhas conquistadas continuam disponíveis durante a sessão.
    }
}

function registrarInimigoDerrotadoNoAlbum(tipoDoInimigo) {
    if (
        !CONFIG.inimigo[tipoDoInimigo]
        || inimigosDerrotadosNoAlbum.has(tipoDoInimigo)
    ) {
        return false;
    }

    inimigosDerrotadosNoAlbum.add(tipoDoInimigo);
    salvarInimigosDerrotadosNoAlbum();
    return true;
}

function atualizarSaldoDeFragmentos() {
    if (fragmentosPixelMenu) {
        fragmentosPixelMenu.textContent = fragmentosPixel;
    }
}

function obterItensDaLoja() {
    const defesasCompraveis = Object.entries(CONFIG.torre.tipos)
        .filter(([, configuracao]) => configuracao.requerCompraNaLoja);
    return [...defesasCompraveis, ...Object.entries(CONFIG.loja.itens)];
}

function obterConfiguracaoDoItemDaLoja(idDoItem) {
    const configuracaoDaDefesa = CONFIG.torre.tipos[idDoItem];

    if (configuracaoDaDefesa && configuracaoDaDefesa.requerCompraNaLoja) {
        return configuracaoDaDefesa;
    }

    return CONFIG.loja.itens[idDoItem] || null;
}

function obterBonusPermanenteDaLoja(propriedade) {
    return Object.entries(CONFIG.loja.itens).reduce((total, [idDoItem, configuracao]) => (
        comprasDaLoja.has(idDoItem)
            ? total + (configuracao[propriedade] || 0)
            : total
    ), 0);
}

function obterDinheiroInicial() {
    return CONFIG.economia.dinheiroInicial
        + obterBonusPermanenteDaLoja("bonusDinheiroInicial")
        + (faseAtualEhSecreta() ? CONFIG.faseSecreta.bonusCreditosIniciais : 0);
}

function obterRecompensaPorTiro() {
    return CONFIG.torre.recompensaPorTiro
        + obterBonusPermanenteDaLoja("bonusRecompensaPorTiro");
}

function podeComprarItemDaLoja(idDoItem) {
    const configuracao = obterConfiguracaoDoItemDaLoja(idDoItem);

    return Boolean(
        configuracao
        && !comprasDaLoja.has(idDoItem)
        && Number.isInteger(fragmentosPixel)
        && fragmentosPixel >= configuracao.custoNaLoja
    );
}

function obterCapitulo(numeroDoCapitulo) {
    return CONFIG.capitulos.find(capitulo => capitulo.numero === numeroDoCapitulo) || null;
}

function obterCapituloDaFase(numeroDaFase) {
    return CONFIG.capitulos.find(capitulo => (
        numeroDaFase >= capitulo.faseInicial
        && numeroDaFase <= capitulo.faseFinal
    )) || null;
}

function obterProgressoDoCapitulo(capitulo) {
    const totalDeFases = capitulo.faseFinal - capitulo.faseInicial + 1;
    const fasesConcluidas = Math.max(
        0,
        Math.min(totalDeFases, maiorFaseConcluida - capitulo.faseInicial + 1)
    );
    return { fasesConcluidas, totalDeFases };
}

function capituloEstaConcluido(numeroDoCapitulo) {
    const capitulo = obterCapitulo(numeroDoCapitulo);
    return Boolean(capitulo && maiorFaseConcluida >= capitulo.faseFinal);
}

function capituloEstaDesbloqueado(numeroDoCapitulo) {
    const indiceDoCapitulo = CONFIG.capitulos.findIndex(
        capitulo => capitulo.numero === numeroDoCapitulo
    );

    if (indiceDoCapitulo < 0) {
        return false;
    }

    if (indiceDoCapitulo === 0) {
        return true;
    }

    const capitulo = CONFIG.capitulos[indiceDoCapitulo];
    const capituloAnteriorConcluido = capituloEstaConcluido(
        CONFIG.capitulos[indiceDoCapitulo - 1].numero
    );

    if (!capituloAnteriorConcluido) {
        return false;
    }

    return !capitulo.requerVitoriaNaFaseSecreta || capitulo2Desbloqueado;
}

function faseEstaDesbloqueada(numeroDaFase) {
    const faseExiste = CONFIG.fases.some(fase => fase.numero === numeroDaFase);
    const capitulo = obterCapituloDaFase(numeroDaFase);
    return Boolean(
        faseExiste
        && capitulo
        && capituloEstaDesbloqueado(capitulo.numero)
        && numeroDaFase <= maiorFaseConcluida + 1
    );
}

function registrarConclusaoDaFase() {
    const maiorFaseAnterior = maiorFaseConcluida;
    maiorFaseConcluida = Math.max(maiorFaseConcluida, faseSelecionada);
    salvarProgressoDasFases();
    atualizarPortalFaseSecreta();

    const proximaFase = faseSelecionada + 1;
    return proximaFase <= CONFIG.fases.length
        && maiorFaseAnterior < faseSelecionada
        && faseEstaDesbloqueada(proximaFase);
}

function faseAtualEhSecreta() {
    return faseSelecionada === CONFIG.faseSecreta.numeroInterno;
}

function todasAsFasesForamConcluidas() {
    return maiorFaseConcluida >= CONFIG.fases.length;
}

function podeEntrarNaFaseSecreta() {
    return maiorFaseConcluida >= CONFIG.faseSecreta.faseConcluidaParaAcesso;
}

function calcularFragmentosPelasWavesAlcancadas(
    waveAlcancada = wave,
    partidaInfinita = modoWavesInfinitas
) {
    if (waveAlcancada < CONFIG.loja.primeiraWaveComRecompensa) {
        return 0;
    }

    return partidaInfinita
        ? Math.max(
            0,
            Math.floor(waveAlcancada / CONFIG.loja.wavesPorFragmentoNoModoInfinito)
        )
        : Math.max(
            0,
            Math.floor(waveAlcancada * CONFIG.loja.fragmentosPorWaveAlcancada)
        );
}

function concederFragmentosPelasWavesAlcancadas() {
    const recompensa = calcularFragmentosPelasWavesAlcancadas();

    if (recompensa === 0) {
        return 0;
    }

    fragmentosPixel += recompensa;
    salvarFragmentosPixel();
    atualizarSaldoDeFragmentos();
    return recompensa;
}

function atualizarIndicadorFaseSelecionada() {
    indicadorFaseSelecionada.textContent = faseAtualEhSecreta()
        ? localizar("Fase secreta · Wave 1")
        : traduzir("lobby.faseWave", { fase: faseSelecionada });
    limiteTorresMenu.textContent = obterLimiteDeTorres().toString();
    creditosIniciaisMenu.textContent = obterDinheiroInicial().toString();
}

function obterFaseAtual() {
    if (faseAtualEhSecreta()) {
        return {
            numero: CONFIG.faseSecreta.numeroInterno,
            nome: CONFIG.faseSecreta.nome,
            tema: CONFIG.faseSecreta.tema,
            descricao: CONFIG.faseSecreta.descricao
        };
    }

    return CONFIG.fases.find((fase) => fase.numero === faseSelecionada)
        || CONFIG.fases[0];
}

function obterLimiteDeTorres(numeroDaFase = faseSelecionada) {
    const limiteBase = CONFIG.torre.limitesPorFase[numeroDaFase]
        ?? CONFIG.torre.limitesPorFase[1];
    return limiteBase + obterBonusPermanenteDaLoja("bonusLimiteDeTorres");
}

function obterCaminhosAtuais() {
    const configuracaoDosCaminhos = caminhosDasFases[faseSelecionada] || caminhosDasFases[1];
    return Array.isArray(configuracaoDosCaminhos[0])
        ? configuracaoDosCaminhos
        : [configuracaoDosCaminhos];
}

function obterCaminhoAtual(indiceDoCaminho = 0) {
    const caminhosAtuais = obterCaminhosAtuais();
    return caminhosAtuais[indiceDoCaminho] || caminhosAtuais[0];
}

function obterCaminhoDoInimigo(inimigo) {
    return obterCaminhoAtual(inimigo.indiceDoCaminho || 0);
}

function faseAtualUsaCaminhoVivo() {
    return faseSelecionada === CONFIG.caminhoVivo.numeroDaFase;
}

function obterIndiceDoCaminhoVivoNaWave(numeroDaWave = wave) {
    const configuracao = CONFIG.caminhoVivo;

    if (numeroDaWave < configuracao.primeiraWaveDoCaminhoBaixo) {
        return configuracao.indiceDoCaminhoAlto;
    }

    if (numeroDaWave < configuracao.primeiraWaveDaAlternancia) {
        return configuracao.indiceDoCaminhoBaixo;
    }

    const deslocamento = numeroDaWave - configuracao.primeiraWaveDaAlternancia;
    return deslocamento % 2 === 0
        ? configuracao.indiceDoCaminhoAlto
        : configuracao.indiceDoCaminhoBaixo;
}

function waveAbreAtalhoDoTirano(numeroDaWave = wave) {
    return faseAtualUsaCaminhoVivo()
        && numeroDaWave > 0
        && numeroDaWave % CONFIG.wave.intervaloDeBoss === 0;
}

function obterIndiceDoCaminhoParaNovoInimigo(tipoDoInimigo) {
    if (!faseAtualUsaCaminhoVivo()) {
        return proximoIndiceDeEntrada % obterCaminhosAtuais().length;
    }

    if (tipoDoInimigo === "bossPrimordial") {
        return CONFIG.caminhoVivo.indiceDoAtalhoDoTirano;
    }

    return obterIndiceDoCaminhoVivoNaWave();
}

function obterNomeDoCaminhoVivo(indiceDoCaminho) {
    const nome = CONFIG.caminhoVivo.nomesDosCaminhos[indiceDoCaminho]
        || CONFIG.caminhoVivo.nomesDosCaminhos[0];
    return localizar(nome);
}

function avisarProximoCaminhoVivo(proximaWave) {
    if (!faseAtualUsaCaminhoVivo()) {
        return;
    }

    if (waveAbreAtalhoDoTirano(proximaWave)) {
        mostrarAviso(localizar(
            "O Tirano rompeu as raízes: atalho aberto na próxima wave!"
        ));
        return;
    }

    const proximoIndice = obterIndiceDoCaminhoVivoNaWave(proximaWave);
    const indiceAtual = obterIndiceDoCaminhoVivoNaWave(wave);

    if (proximaWave > 1 && proximoIndice !== indiceAtual) {
        mostrarAviso(localizar(
            "As raízes vão mudar: {caminho} na próxima wave.",
            { caminho: obterNomeDoCaminhoVivo(proximoIndice) }
        ));
    }
}

function obterPosicaoDaTorreFinal(caminhoAtual = obterCaminhoAtual()) {
    const fimDoCaminho = caminhoAtual[caminhoAtual.length - 1];
    const margem = CONFIG.torreFinal.margemDaBorda;

    return {
        x: Math.max(margem, Math.min(canvas.width - margem, fimDoCaminho.x)),
        y: Math.max(margem, Math.min(canvas.height - margem, fimDoCaminho.y))
    };
}

function inimigoAtingiuTorreFinal(inimigo) {
    const torreFinal = obterPosicaoDaTorreFinal();
    const distancia = Math.hypot(inimigo.x - torreFinal.x, inimigo.y - torreFinal.y);
    return distancia <= CONFIG.torreFinal.raioDeContato + inimigo.tamanho;
}

function faseAtualUsaMetropoleNeon() {
    return faseSelecionada === CONFIG.metropoleNeon.numeroDaFase;
}

function inimigoEstaEmTrilhoDeImpulso(inimigo) {
    return faseAtualUsaMetropoleNeon()
        && CONFIG.metropoleNeon.trilhosDeImpulso.some((trilho) => (
            inimigo.x >= trilho.x
            && inimigo.x <= trilho.x + trilho.largura
            && inimigo.y >= trilho.y
            && inimigo.y <= trilho.y + trilho.altura
        ));
}

function radioProjetoRelogioEstaNaPosicao(x, y) {
    const radio = CONFIG.metropoleNeon.radio;
    return faseAtualUsaMetropoleNeon()
        && radioProjetoRelogioDisponivel
        && Math.hypot(radio.x - x, radio.y - y) <= radio.raioDeClique;
}

function estaPertoDoRadioProjetoRelogio(x, y) {
    const radio = CONFIG.metropoleNeon.radio;
    return faseAtualUsaMetropoleNeon()
        && Math.hypot(radio.x - x, radio.y - y)
            < radio.distanciaMinimaDasTorres;
}

function disponibilizarRadioProjetoRelogio() {
    if (
        !faseAtualUsaMetropoleNeon()
        || wave < CONFIG.metropoleNeon.radio.waveDeAtivacao
        || radioProjetoRelogioDisponivel
    ) {
        return false;
    }

    radioProjetoRelogioDisponivel = true;
    mostrarAviso(localizar("Rádio do Projeto Relógio encontrado!"));
    return true;
}

function atualizarTemaDoLobby() {
    const temaAtual = obterFaseAtual().tema;
    menuPrincipal.classList.remove(
        "tema-campo",
        "tema-deserto",
        "tema-artico",
        "tema-selva",
        "tema-temperada",
        "tema-vulcanica",
        "tema-pantano",
        "tema-primordial",
        "tema-futurista",
        "tema-glitch"
    );
    menuPrincipal.classList.add(`tema-${temaAtual}`);
    atualizarPortalFaseSecreta();
}

function atualizarPortalFaseSecreta() {
    if (!portalFaseSecreta) {
        return;
    }

    portalFaseSecreta.classList.toggle(
        "portal-fase-secreta-descoberto",
        faseSecretaDescoberta
    );
    const entradaLiberada = podeEntrarNaFaseSecreta();
    portalFaseSecreta.classList.toggle(
        "portal-fase-secreta-bloqueado",
        !entradaLiberada
    );
    portalFaseSecreta.disabled = teleporteGlitchEmAndamento
        || labirintoAmareloAtivo
        || !entradaLiberada;
    portalFaseSecreta.querySelector("span").textContent = faseSecretaDescoberta ? "◇" : "?";
    portalFaseSecreta.setAttribute(
        "aria-label",
        !entradaLiberada
            ? localizar("Conclua a Fase 6 para despertar o portal.")
            : faseSecretaDescoberta
            ? localizar("Abrir portal da fase secreta")
            : localizar("Entrar no portal corrompido")
    );
    portalFaseSecreta.title = !entradaLiberada
        ? localizar("Conclua a Fase 6 para despertar o portal.")
        : faseSecretaDescoberta
        ? localizar("Portal descoberto")
        : localizar("O tempo observa do outro lado...");
}

function interagirComPortalSecreto() {
    if (jogoIniciado || teleporteGlitchEmAndamento || labirintoAmareloAtivo) {
        return;
    }

    if (!podeEntrarNaFaseSecreta()) {
        return;
    }

    if (!faseSecretaDescoberta) {
        faseSecretaDescoberta = true;
        salvarFaseSecretaDescoberta();
        atualizarPortalFaseSecreta();
    }

    iniciarTransicaoDoPortalGlitch();
}

function iniciarTransicaoDoPortalGlitch() {
    if (teleporteGlitchEmAndamento || labirintoAmareloAtivo || jogoIniciado) {
        return;
    }

    fecharConteudoMenu();
    teleporteGlitchEmAndamento = true;
    atualizarPortalFaseSecreta();
    selecionarTrilhaDaConversaDoPortal();
    tocarEfeitoTeleporteGlitch();
    document.documentElement.style.setProperty(
        "--duracao-transicao-glitch",
        `${CONFIG.faseSecreta.transicaoDoPortal.duracaoMs}ms`
    );
    document.body.classList.add("teleporte-glitch-ativo");
    void camadaTransicaoGlitch.offsetWidth;
    camadaTransicaoGlitch.hidden = false;

    temporizadorDoTeleporteGlitch = setTimeout(() => {
        temporizadorDoTeleporteGlitch = null;
        ocultarTransicaoDoPortalGlitch();
        if (deveEntrarNosCorredoresAmarelos()) {
            iniciarCorredoresAmarelos();
        } else {
            iniciarFaseSecreta();
        }
    }, CONFIG.faseSecreta.transicaoDoPortal.duracaoMs);
}

function ocultarTransicaoDoPortalGlitch() {
    if (temporizadorDoTeleporteGlitch !== null) {
        clearTimeout(temporizadorDoTeleporteGlitch);
        temporizadorDoTeleporteGlitch = null;
    }

    teleporteGlitchEmAndamento = false;
    document.body.classList.remove("teleporte-glitch-ativo");
    camadaTransicaoGlitch.hidden = true;
    atualizarPortalFaseSecreta();
}

function deveEntrarNosCorredoresAmarelos(valorAleatorio = Math.random()) {
    return valorAleatorio < CONFIG.faseSecreta.corredoresAmarelos.chanceDeAparecer;
}

function iniciarCorredoresAmarelos(agora = Date.now()) {
    if (labirintoAmareloAtivo || jogoIniciado) {
        return;
    }

    const configuracao = CONFIG.faseSecreta.corredoresAmarelos;
    labirintoAmareloAtivo = true;
    jogadorDosCorredoresAmarelos = {
        x: configuracao.inicio.x,
        y: configuracao.inicio.y,
        atualizadoEm: agora
    };
    teclasPressionadasNosCorredores.clear();
    camadaCorredoresAmarelos.hidden = false;
    atualizarPortalFaseSecreta();
    desenharCorredoresAmarelos();
    canvasLabirintoAmarelo.focus({ preventScroll: true });
    animacaoDosCorredoresAmarelos = requestAnimationFrame(atualizarCorredoresAmarelos);
}

function jogadorDosCorredoresTocaParede(x, y) {
    const configuracao = CONFIG.faseSecreta.corredoresAmarelos;
    return configuracao.paredes.some((parede) => (
        circuloColideComRetangulo(x, y, configuracao.raioDoJogador, parede)
    ));
}

function atualizarMovimentoNosCorredores(agora = Date.now()) {
    if (!jogadorDosCorredoresAmarelos) {
        return;
    }

    const configuracao = CONFIG.faseSecreta.corredoresAmarelos;
    const direcao = obterDirecaoPelasTeclas(teclasPressionadasNosCorredores);
    const tempoDecorrido = Math.min(
        0.05,
        Math.max(0, (agora - jogadorDosCorredoresAmarelos.atualizadoEm) / 1000)
    );
    jogadorDosCorredoresAmarelos.atualizadoEm = agora;

    if (direcao.x === 0 && direcao.y === 0) {
        return;
    }

    const deslocamento = configuracao.velocidadeDoJogador * tempoDecorrido;
    const raio = configuracao.raioDoJogador;
    const novoX = Math.max(
        raio,
        Math.min(configuracao.largura - raio, jogadorDosCorredoresAmarelos.x + direcao.x * deslocamento)
    );
    const novoY = Math.max(
        raio,
        Math.min(configuracao.altura - raio, jogadorDosCorredoresAmarelos.y + direcao.y * deslocamento)
    );

    if (!jogadorDosCorredoresTocaParede(novoX, jogadorDosCorredoresAmarelos.y)) {
        jogadorDosCorredoresAmarelos.x = novoX;
    }
    if (!jogadorDosCorredoresTocaParede(jogadorDosCorredoresAmarelos.x, novoY)) {
        jogadorDosCorredoresAmarelos.y = novoY;
    }

    if (
        circuloColideComRetangulo(
            jogadorDosCorredoresAmarelos.x,
            jogadorDosCorredoresAmarelos.y,
            raio,
            configuracao.saida
        )
    ) {
        concluirCorredoresAmarelos();
    }
}

function desenharCorredoresAmarelos() {
    const configuracao = CONFIG.faseSecreta.corredoresAmarelos;
    const { largura, altura } = configuracao;
    const gradienteDoPiso = ctxLabirintoAmarelo.createLinearGradient(0, 0, 0, altura);
    gradienteDoPiso.addColorStop(0, "#d4c46f");
    gradienteDoPiso.addColorStop(1, "#a89242");
    ctxLabirintoAmarelo.fillStyle = gradienteDoPiso;
    ctxLabirintoAmarelo.fillRect(0, 0, largura, altura);

    ctxLabirintoAmarelo.fillStyle = "rgba(79, 66, 20, .13)";
    for (let y = 12; y < altura; y += 24) {
        for (let x = (y / 24) % 2 === 0 ? 10 : 22; x < largura; x += 42) {
            ctxLabirintoAmarelo.fillRect(x, y, 18, 3);
        }
    }

    ctxLabirintoAmarelo.fillStyle = "rgba(255, 251, 195, .7)";
    for (let x = 36; x < largura; x += 148) {
        ctxLabirintoAmarelo.fillRect(x, 12, 92, 10);
        ctxLabirintoAmarelo.fillStyle = "rgba(90, 78, 27, .22)";
        ctxLabirintoAmarelo.fillRect(x + 8, 22, 76, 4);
        ctxLabirintoAmarelo.fillStyle = "rgba(255, 251, 195, .7)";
    }

    const saida = configuracao.saida;
    ctxLabirintoAmarelo.fillStyle = "#162419";
    ctxLabirintoAmarelo.fillRect(saida.x, saida.y, saida.largura, saida.altura);
    ctxLabirintoAmarelo.fillStyle = "#7fe27a";
    ctxLabirintoAmarelo.fillRect(saida.x + 7, saida.y + 7, saida.largura - 14, saida.altura - 14);
    ctxLabirintoAmarelo.fillStyle = "#102716";
    ctxLabirintoAmarelo.font = "900 13px 'Courier New', monospace";
    ctxLabirintoAmarelo.textAlign = "center";
    ctxLabirintoAmarelo.fillText(localizar("SAÍDA"), saida.x + saida.largura / 2, 42);

    for (const parede of configuracao.paredes) {
        ctxLabirintoAmarelo.fillStyle = "#574c1f";
        ctxLabirintoAmarelo.fillRect(
            parede.x - 5,
            parede.y,
            parede.largura + 10,
            parede.altura
        );
        ctxLabirintoAmarelo.fillStyle = "#cbbb62";
        ctxLabirintoAmarelo.fillRect(parede.x, parede.y, parede.largura, parede.altura);
        ctxLabirintoAmarelo.fillStyle = "rgba(255, 248, 170, .36)";
        for (let y = parede.y + 8; y < parede.y + parede.altura; y += 28) {
            ctxLabirintoAmarelo.fillRect(parede.x + 4, y, parede.largura - 8, 5);
        }
    }

    ctxLabirintoAmarelo.fillStyle = "rgba(58, 47, 13, .72)";
    ctxLabirintoAmarelo.font = "900 18px 'Courier New', monospace";
    ctxLabirintoAmarelo.textAlign = "left";
    ctxLabirintoAmarelo.fillText(localizar("ONDE EU ESTOU?"), 24, 38);

    if (jogadorDosCorredoresAmarelos) {
        const x = Math.round(jogadorDosCorredoresAmarelos.x);
        const y = Math.round(jogadorDosCorredoresAmarelos.y);
        ctxLabirintoAmarelo.fillStyle = "#080a0c";
        ctxLabirintoAmarelo.fillRect(x - 13, y - 14, 26, 28);
        ctxLabirintoAmarelo.fillStyle = "#47e4d0";
        ctxLabirintoAmarelo.fillRect(x - 9, y - 10, 18, 18);
        ctxLabirintoAmarelo.fillStyle = "#10272b";
        ctxLabirintoAmarelo.fillRect(x - 6, y - 6, 4, 4);
        ctxLabirintoAmarelo.fillRect(x + 2, y - 6, 4, 4);
        ctxLabirintoAmarelo.fillRect(x - 5, y + 3, 10, 3);
        ctxLabirintoAmarelo.fillStyle = "#e34ef4";
        ctxLabirintoAmarelo.fillRect(x - 9, y + 10, 6, 4);
        ctxLabirintoAmarelo.fillRect(x + 3, y + 10, 6, 4);
    }

    const vinheta = ctxLabirintoAmarelo.createRadialGradient(
        largura / 2,
        altura / 2,
        altura * 0.2,
        largura / 2,
        altura / 2,
        largura * 0.65
    );
    vinheta.addColorStop(0, "rgba(22, 18, 3, 0)");
    vinheta.addColorStop(1, "rgba(22, 18, 3, .38)");
    ctxLabirintoAmarelo.fillStyle = vinheta;
    ctxLabirintoAmarelo.fillRect(0, 0, largura, altura);
}

function atualizarCorredoresAmarelos() {
    if (!labirintoAmareloAtivo) {
        return;
    }

    atualizarMovimentoNosCorredores();

    if (!labirintoAmareloAtivo) {
        return;
    }

    desenharCorredoresAmarelos();
    animacaoDosCorredoresAmarelos = requestAnimationFrame(atualizarCorredoresAmarelos);
}

function ocultarCorredoresAmarelos() {
    labirintoAmareloAtivo = false;
    jogadorDosCorredoresAmarelos = null;
    teclasPressionadasNosCorredores.clear();
    botoesDirecaoCorredores.forEach((botao) => (
        botao.classList.remove("botao-direcao-pressionado")
    ));
    camadaCorredoresAmarelos.hidden = true;

    if (animacaoDosCorredoresAmarelos !== null) {
        cancelAnimationFrame(animacaoDosCorredoresAmarelos);
        animacaoDosCorredoresAmarelos = null;
    }

    atualizarPortalFaseSecreta();
}

function concluirCorredoresAmarelos() {
    if (!labirintoAmareloAtivo) {
        return;
    }

    ocultarCorredoresAmarelos();
    iniciarFaseSecreta();
}

function fecharConversaDoPortalAoClicarFora(evento) {
    if (!conversaDoSenhorDoTempoAtiva && evento.target === camadaConversaPortal) {
        fecharConteudoMenu();
    }
}

function criarRetratoDoSenhorDoTempo() {
    const formaHumanaAtiva = CONFIG.faseSecreta.senhorDoTempo.formaHumanaFutura.ativa;
    const classeDaFormaHumana = formaHumanaAtiva ? "senhor-tempo-forma-humana" : "";
    const detalhesDoCorpoHumano = formaHumanaAtiva
        ? `
            <i class="senhor-tempo-braco senhor-tempo-braco-solto"></i>
            <i class="senhor-tempo-braco senhor-tempo-braco-no-bolso"></i>
            <i class="senhor-tempo-bolso"></i>
        `
        : "";

    return `
        <div class="portal-retrato-conversa retrato-senhor-do-tempo ${classeDaFormaHumana}" aria-hidden="true">
            <div class="senhor-tempo-corpo">${detalhesDoCorpoHumano}</div>
            <div class="senhor-tempo-cabeca">
                <i class="ponteiro-relogio ponteiro-relogio-hora"></i>
                <i class="ponteiro-relogio ponteiro-relogio-minuto"></i>
                <i class="centro-relogio"></i>
            </div>
        </div>
    `;
}

function obterFalasDaConversaDoSenhorDoTempo() {
    const configuracao = CONFIG.faseSecreta.senhorDoTempo;
    return tipoDaConversaDoSenhorDoTempo === "vitoria"
        ? configuracao.falasDeVitoria
        : configuracao.falas;
}

function normalizarFalaDoSenhorDoTempo(fala) {
    return typeof fala === "string"
        ? { autor: "senhorDoTempo", texto: fala }
        : fala;
}

function mostrarConversaDoSenhorDoTempo(
    indiceDaFala = 0,
    tipoDaConversa = tipoDaConversaDoSenhorDoTempo
) {
    if (!jogoIniciado || !faseAtualEhSecreta()) {
        return;
    }

    const configuracao = CONFIG.faseSecreta.senhorDoTempo;
    tipoDaConversaDoSenhorDoTempo = tipoDaConversa === "vitoria" ? "vitoria" : "entrada";
    const falas = obterFalasDaConversaDoSenhorDoTempo();
    const ultimoIndice = falas.length - 1;
    indiceDaFalaDoSenhorDoTempo = Math.max(0, Math.min(indiceDaFala, ultimoIndice));
    conversaDoSenhorDoTempoAtiva = true;
    definirJogoPausado(true);

    const falaAtual = normalizarFalaDoSenhorDoTempo(falas[indiceDaFalaDoSenhorDoTempo]);
    const falaDoJogador = falaAtual.autor === "jogador";
    const conversaDeVitoria = tipoDaConversaDoSenhorDoTempo === "vitoria";
    const nomeFoiRevelado = conversaDeVitoria || indiceDaFalaDoSenhorDoTempo >= 1;
    const ultimaFala = indiceDaFalaDoSenhorDoTempo === ultimoIndice;
    const nomeExibido = falaDoJogador
        ? localizar("Você")
        : nomeFoiRevelado
        ? obterNomeLocalizado(configuracao)
        : "???";
    const textoDoBotao = ultimaFala
        ? conversaDeVitoria
            ? localizar("Revelar Capítulo 2")
            : localizar("Enfrentar a Dimensão")
        : localizar("Continuar");
    const rotuloDaConversa = conversaDeVitoria
        ? localizar("CONVERSA FINAL")
        : localizar("ENTIDADE DA FALHA");

    camadaConversaPortal.classList.add("camada-conversa-senhor-tempo");
    camadaConversaPortal.dataset.tipoConversa = tipoDaConversaDoSenhorDoTempo;
    camadaConversaPortal.hidden = false;
    camadaConversaPortal.innerHTML = `
        <section class="balao-conversa-portal balao-senhor-do-tempo" role="document">
            ${criarRetratoDoSenhorDoTempo()}
            <div class="conversa-portal-conteudo">
                <small>${rotuloDaConversa} · ${indiceDaFalaDoSenhorDoTempo + 1}/${falas.length}</small>
                <h2 id="titulo-conversa-portal">${nomeExibido}</h2>
                <p class="conversa-portal-fala" data-autor="${falaAtual.autor}">“${localizar(falaAtual.texto)}”</p>
                <button
                    class="botao botao-conversa-portal botao-avancar-senhor-tempo"
                    type="button"
                    onclick="avancarConversaDoSenhorDoTempo()"
                >${textoDoBotao}</button>
            </div>
        </section>
    `;
    camadaConversaPortal.querySelector(".botao-avancar-senhor-tempo")?.focus();
}

function avancarConversaDoSenhorDoTempo() {
    if (!conversaDoSenhorDoTempoAtiva) {
        return;
    }

    const ultimoIndice = obterFalasDaConversaDoSenhorDoTempo().length - 1;

    if (indiceDaFalaDoSenhorDoTempo >= ultimoIndice) {
        encerrarConversaDoSenhorDoTempo();
        return;
    }

    mostrarConversaDoSenhorDoTempo(indiceDaFalaDoSenhorDoTempo + 1);
}

function encerrarConversaDoSenhorDoTempo() {
    if (!conversaDoSenhorDoTempoAtiva) {
        return;
    }

    const conversaDeVitoria = tipoDaConversaDoSenhorDoTempo === "vitoria";
    conversaDoSenhorDoTempoAtiva = false;
    camadaConversaPortal.classList.remove("camada-conversa-senhor-tempo");
    camadaConversaPortal.removeAttribute("data-tipo-conversa");
    camadaConversaPortal.hidden = true;
    camadaConversaPortal.innerHTML = "";

    if (conversaDeVitoria) {
        mostrarCutsceneDoCapitulo2();
        return;
    }

    definirJogoPausado(false);
    botaoMenuPartida.focus();
}

function deveMostrarCartaMisteriosaAposVitoria() {
    return faseSelecionada === CONFIG.faseSecreta.faseConcluidaParaAcesso
        && !faseSecretaDescoberta
        && !cartaMisteriosaVista;
}

function deveMostrarCartaDaMaquinaDoTempoAposVitoria() {
    return faseSelecionada === CONFIG.maquinaDoTempo.faseQueConcede
        && !cartaDaMaquinaDoTempoVista
        && !maquinaDoTempoDesbloqueada;
}

function mostrarCutsceneDaCarta(tipoDaCarta = "portal") {
    const cartaConcedeMaquinaDoTempo = tipoDaCarta === "maquinaDoTempo";
    const configuracao = cartaConcedeMaquinaDoTempo
        ? CONFIG.maquinaDoTempo.carta
        : CONFIG.faseSecreta.cartaMisteriosa;

    if (cartaConcedeMaquinaDoTempo) {
        cartaDaMaquinaDoTempoVista = true;
        maquinaDoTempoDesbloqueada = true;
        maquinaDoTempoAcabouDeSerConcedida = true;
        salvarCartaDaMaquinaDoTempoVista();
        salvarMaquinaDoTempoDesbloqueada();
    } else {
        cartaMisteriosaVista = true;
        salvarCartaMisteriosaVista();
    }

    cutsceneDaCartaAtiva = true;
    cutsceneDaTransmissaoRetomaPartida = false;
    if (camadaCutsceneCarta.dataset) {
        camadaCutsceneCarta.dataset.tipoCarta = "carta";
    }
    tituloCutsceneCarta.textContent = localizar("VOCÊ ENCONTROU UMA CARTA");
    textoCutsceneCarta.textContent = localizar(configuracao.texto);
    assinaturaCutsceneCarta.textContent = localizar(configuracao.assinatura);
    botaoContinuarCutsceneCarta.textContent = cartaConcedeMaquinaDoTempo
        ? localizar("Receber Máquina do Tempo")
        : localizar("Guardar carta");
    camadaCutsceneCarta.classList.remove("cutscene-carta-em-exibicao");
    camadaCutsceneCarta.hidden = false;
    void camadaCutsceneCarta.offsetWidth;
    camadaCutsceneCarta.classList.add("cutscene-carta-em-exibicao");
    botaoContinuarCutsceneCarta.focus();
}

function deveMostrarTransmissaoProjetoRelogioAposVitoria() {
    return faseSelecionada === CONFIG.metropoleNeon.numeroDaFase
        && !transmissaoProjetoRelogioVista;
}

function mostrarTransmissaoProjetoRelogio(retomarPartida = false) {
    const configuracao = CONFIG.metropoleNeon.radio;
    transmissaoProjetoRelogioVista = true;
    salvarTransmissaoProjetoRelogioVista();
    cutsceneDaCartaAtiva = true;
    cutsceneDaTransmissaoRetomaPartida = Boolean(retomarPartida && !partidaEncerrada);
    if (camadaCutsceneCarta.dataset) {
        camadaCutsceneCarta.dataset.tipoCarta = "transmissao";
    }
    tituloCutsceneCarta.textContent = localizar(configuracao.titulo);
    textoCutsceneCarta.textContent = localizar(configuracao.texto);
    assinaturaCutsceneCarta.textContent = localizar(configuracao.assinatura);
    botaoContinuarCutsceneCarta.textContent = localizar("Desligar rádio");
    camadaCutsceneCarta.classList.remove("cutscene-carta-em-exibicao");
    camadaCutsceneCarta.hidden = false;
    void camadaCutsceneCarta.offsetWidth;
    camadaCutsceneCarta.classList.add("cutscene-carta-em-exibicao");
    if (cutsceneDaTransmissaoRetomaPartida) {
        definirJogoPausado(true);
    }
    botaoContinuarCutsceneCarta.focus();
}

function ocultarCutsceneDaCarta() {
    cutsceneDaCartaAtiva = false;
    camadaCutsceneCarta.hidden = true;
    camadaCutsceneCarta.classList.remove("cutscene-carta-em-exibicao");
    if (typeof camadaCutsceneCarta.removeAttribute === "function") {
        camadaCutsceneCarta.removeAttribute("data-tipo-carta");
    }
}

function concluirCutsceneDaCarta() {
    if (!cutsceneDaCartaAtiva) {
        return;
    }

    const deveRetomarPartida = cutsceneDaTransmissaoRetomaPartida;
    cutsceneDaTransmissaoRetomaPartida = false;
    ocultarCutsceneDaCarta();

    if (deveRetomarPartida) {
        definirJogoPausado(false);
        botaoMenuPartida.focus();
        return;
    }

    mostrarPainelDeResultado(true);
}

function mostrarCutsceneDoCapitulo2() {
    capitulo2Desbloqueado = true;
    salvarDesbloqueioDoCapitulo2();
    cutsceneDoCapitulo2Ativa = true;
    rotuloCutsceneCapitulo2.textContent = localizar("CAMINHO LIBERADO");
    tituloCutsceneCapitulo2.textContent = localizar("Capítulo 2").toUpperCase();
    descricaoCutsceneCapitulo2.textContent = localizar("Fases 7 a 12");
    mensagemCutsceneCapitulo2.textContent = localizar("NOVO CAPÍTULO DESBLOQUEADO");
    botaoContinuarCutsceneCapitulo2.textContent = localizar("Continuar");
    camadaCutsceneCapitulo2.classList.remove("cutscene-capitulo-em-exibicao");
    camadaCutsceneCapitulo2.hidden = false;
    void camadaCutsceneCapitulo2.offsetWidth;
    camadaCutsceneCapitulo2.classList.add("cutscene-capitulo-em-exibicao");
    botaoContinuarCutsceneCapitulo2.focus();
}

function ocultarCutsceneDoCapitulo2() {
    cutsceneDoCapitulo2Ativa = false;
    camadaCutsceneCapitulo2.hidden = true;
    camadaCutsceneCapitulo2.classList.remove("cutscene-capitulo-em-exibicao");
}

function concluirCutsceneDoCapitulo2() {
    if (!cutsceneDoCapitulo2Ativa) {
        return;
    }

    ocultarCutsceneDoCapitulo2();
    mostrarPainelDeResultado(true);
}

function iniciarFaseSecreta() {
    if (jogoIniciado) {
        return;
    }

    faseSelecionada = CONFIG.faseSecreta.numeroInterno;
    modoWavesInfinitas = false;
    atualizarIndicadorFaseSelecionada();
    iniciarPartida(false);
    definirJogoPausado(true);
    mostrarConversaDoSenhorDoTempo(0, "entrada");
}

function obterConfiguracaoDaTorre(tipoDaTorre = tipoDeTorreParaConstruir) {
    return CONFIG.torre.tipos[tipoDaTorre] || CONFIG.torre.tipos.padrao;
}

function torreEstaDesbloqueada(tipoDaTorre) {
    const configuracao = obterConfiguracaoDaTorre(tipoDaTorre);
    const faseNecessariaConcluida =
        maiorFaseConcluida >= configuracao.faseConcluidaParaDesbloqueio;
    const compraNecessariaConcluida =
        !configuracao.requerCompraNaLoja || comprasDaLoja.has(tipoDaTorre);
    return faseNecessariaConcluida && compraNecessariaConcluida;
}

function obterMensagemDeTorreBloqueada(configuracao) {
    const nome = obterNomeLocalizado(configuracao);

    if (configuracao.requerCompraNaLoja) {
        return localizar("{nome} deve ser comprada na Loja.", { nome });
    }

    return localizar("{nome} é desbloqueado ao concluir a Fase {fase}.", {
        nome,
        fase: configuracao.faseConcluidaParaDesbloqueio
    });
}

function obterTextoDeTorreBloqueada(configuracao) {
    if (configuracao.requerCompraNaLoja) {
        return localizar("Compre na Loja");
    }

    return localizar("Conclua Fase {fase}", {
        fase: configuracao.faseConcluidaParaDesbloqueio
    });
}

function obterPercentualInteiro(valor) {
    return Math.round(valor * 100);
}

function configuracaoEhExplosivoConsumivel(configuracao) {
    return configuracao.tipoDeItem === "mina" || configuracao.tipoDeItem === "bomba";
}

function configuracaoPossuiMelhorias(configuracao) {
    return configuracao.melhorias.length > 0;
}

function obterDuracaoDaQueimaduraEmSegundos(efeitoDeQueimadura) {
    return efeitoDeQueimadura.duracao / 1000;
}

function obterDetalheDaQueimadura(configuracao) {
    if (!configuracao.efeitoDeQueimadura) {
        return "";
    }

    return localizar(" | Queimadura: {dano}/s durante {segundos}s", {
        dano: configuracao.efeitoDeQueimadura.danoPorIntervalo,
        segundos: obterDuracaoDaQueimaduraEmSegundos(configuracao.efeitoDeQueimadura)
    });
}

function obterResumoDaConfiguracaoDaTorre(configuracao) {
    if (configuracao.tipoDeItem === "mina") {
        const detalheGlacial = configuracao.efeitoGlacial
            ? localizar(" · Lentidão {percentual}%", {
                percentual: obterPercentualInteiro(configuracao.efeitoGlacial.percentualLentidao)
            })
            : "";
        return localizar("Dano {dano} em {raio} px", {
            dano: configuracao.dano,
            raio: configuracao.raioExplosao
        }) + detalheGlacial + localizar(" · Limite {limite} armadas", {
            limite: configuracao.limitePorPartida
        });
    }

    if (configuracao.tipoDeItem === "bomba") {
        return localizar("Dano {dano} em {raio} px · Clique para detonar · Limite {limite}", {
            dano: configuracao.dano,
            raio: configuracao.raioExplosao,
            limite: configuracao.limitePorPartida
        });
    }

    if (configuracao.efeitoSismico) {
        return localizar("Carrega com {cargas} inimigos · Empurra {distancia} px · Limite {limite}", {
            cargas: configuracao.efeitoSismico.cargasNecessarias,
            distancia: configuracao.efeitoSismico.distanciaDoEmpurrao,
            limite: configuracao.limitePorPartida
        });
    }

    if (configuracao.percentualBonusCadencia) {
        return localizar("Acelera torres em {percentual}% · Alcance {alcance} · Limite {limite}", {
            percentual: obterPercentualInteiro(configuracao.percentualBonusCadencia),
            alcance: configuracao.alcance,
            limite: configuracao.limitePorPartida
        });
    }

    if (configuracao.creditosPorWave) {
        return localizar("Produz {creditos} créditos por wave completa · Limite {limite}", {
            creditos: configuracao.creditosPorWave,
            limite: configuracao.limitePorPartida
        });
    }

    if (configuracao.efeitoDeQueimadura) {
        return localizar("Dano {dano} · Queima {danoQueimadura}/s por {segundos}s · Alcance {alcance}", {
            dano: configuracao.dano,
            danoQueimadura: configuracao.efeitoDeQueimadura.danoPorIntervalo,
            segundos: obterDuracaoDaQueimaduraEmSegundos(configuracao.efeitoDeQueimadura),
            alcance: configuracao.alcance
        });
    }

    if (configuracao.efeitoDeRaio) {
        return localizar("Dano {dano} · Encadeia em {alvos} alvos · Alcance {alcance}", {
            dano: configuracao.dano,
            alvos: configuracao.efeitoDeRaio.quantidadeMaximaDeAlvos,
            alcance: configuracao.alcance
        });
    }

    if (configuracao.quantidadeDeLasers) {
        return localizar("{quantidade} lasers de {dano} de dano · Alcance {alcance}", {
            quantidade: configuracao.quantidadeDeLasers,
            dano: configuracao.dano,
            alcance: configuracao.alcance
        });
    }

    if (configuracao.naoAtira) {
        return localizar("Resiste a {tiros} tiros · Limite {limite}", {
            tiros: configuracao.resistenciaATiros,
            limite: configuracao.limitePorPartida
        });
    }

    if (configuracao.raioDanoEmArea) {
        return localizar("Dano {dano} em {raio} px · Alcance {alcance}", {
            dano: configuracao.dano,
            raio: configuracao.raioDanoEmArea,
            alcance: configuracao.alcance
        });
    }

    return localizar("Dano {dano} · Alcance {alcance}", {
        dano: configuracao.dano,
        alcance: configuracao.alcance
    });
}

function criarCartaoDaSelecaoDeDefesa(tipo, configuracao) {
    const desbloqueada = torreEstaDesbloqueada(tipo);
    const selecionada = selecaoDeDefesasEmEdicao.has(tipo);
    const ordem = [...selecaoDeDefesasEmEdicao].indexOf(tipo) + 1;
    const obrigatoriaNoTutorial = !selecaoDeDefesasParaModoInfinito
        && !tutorialConcluido
        && tipo === "padrao";
    const estado = desbloqueada
        ? selecionada
            ? localizar("Selecionada")
            : localizar("Disponível")
        : obterTextoDeTorreBloqueada(configuracao);
    const classeDeEstado = desbloqueada
        ? selecionada
            ? "selecao-defesa-cartao-selecionado"
            : ""
        : "selecao-defesa-cartao-bloqueado";

    return `
        <button
            class="selecao-defesa-cartao ${classeDeEstado}"
            type="button"
            data-tipo-defesa="${tipo}"
            aria-pressed="${selecionada}"
            aria-label="${obterNomeLocalizado(configuracao)} · ${estado}"
            onclick="alternarDefesaDaSelecao('${tipo}')"
            ${desbloqueada ? "" : "disabled"}
        >
            <span class="selecao-defesa-ordem" aria-hidden="true">${selecionada ? ordem : "+"}</span>
            <canvas
                class="miniatura-torre-album miniatura-selecao-defesa"
                width="84"
                height="84"
                data-tipo-torre="${tipo}"
                data-nivel-torre="0"
                aria-hidden="true"
            ></canvas>
            <span class="selecao-defesa-dados">
                <strong>${obterNomeLocalizado(configuracao)}</strong>
                <small>${localizar("{custo} créditos", { custo: configuracao.custo })}</small>
                <em>${obterResumoDaConfiguracaoDaTorre(configuracao)}</em>
            </span>
            <span class="selecao-defesa-estado">
                ${obrigatoriaNoTutorial ? localizar("Obrigatória no tutorial") : estado}
            </span>
        </button>
    `;
}

function criarVagasDaSelecaoDeDefesas() {
    const tiposSelecionados = [...selecaoDeDefesasEmEdicao];
    return Array.from(
        { length: CONFIG.torre.quantidadeMaximaDeDefesasSelecionadas },
        (_, indice) => {
            const tipo = tiposSelecionados[indice];

            if (!tipo) {
                return `
                    <li class="selecao-defesa-vaga selecao-defesa-vaga-vazia">
                        <strong>${indice + 1}</strong>
                        <span>${localizar("Vaga livre")}</span>
                    </li>
                `;
            }

            return `
                <li class="selecao-defesa-vaga">
                    <strong>${indice + 1}</strong>
                    <span>${obterNomeLocalizado(obterConfiguracaoDaTorre(tipo))}</span>
                </li>
            `;
        }
    ).join("");
}

function mostrarSelecaoDeDefesas() {
    definirTelaDoMenuAberta("selecaoDefesas");
    tentarIniciarMusicaDoLobby();

    const quantidadeSelecionada = selecaoDeDefesasEmEdicao.size;
    const limite = CONFIG.torre.quantidadeMaximaDeDefesasSelecionadas;
    const titulo = selecaoDeDefesasParaModoInfinito
        ? localizar("Defesas para Waves infinitas")
        : localizar("Escolha suas defesas");
    const textoDoBotao = selecaoDeDefesasParaModoInfinito
        ? localizar("Iniciar Waves infinitas")
        : localizar("Começar partida");
    const avisoDoTutorial = !selecaoDeDefesasParaModoInfinito && !tutorialConcluido
        ? `<p class="selecao-defesas-tutorial">${localizar("A Torre padrão é obrigatória na primeira partida para concluir o tutorial.")}</p>`
        : "";
    const cartoes = Object.entries(CONFIG.torre.tipos)
        .map(([tipo, configuracao]) => criarCartaoDaSelecaoDeDefesa(tipo, configuracao))
        .join("");

    conteudoMenu.innerHTML = `
        ${criarCabecalhoConteudoMenu(
            titulo,
            localizar("Monte sua equipe antes da batalha. Você pode levar até 6 defesas, incluindo torres, suportes, minas e bombas.")
        )}
        <div class="selecao-defesas-resumo">
            <div>
                <small>${localizar("EQUIPE DA PARTIDA")}</small>
                <strong>${localizar("{quantidade} de {limite} escolhidas", {
                    quantidade: quantidadeSelecionada,
                    limite
                })}</strong>
            </div>
            <span aria-hidden="true">${"◆".repeat(quantidadeSelecionada)}${"◇".repeat(limite - quantidadeSelecionada)}</span>
        </div>
        ${avisoDoTutorial}
        <div class="selecao-defesas-layout">
            <section class="selecao-defesas-catalogo" aria-label="${localizar("Defesas disponíveis")}">
                ${cartoes}
            </section>
            <aside class="selecao-defesas-equipe">
                <small>${localizar("SUA EQUIPE")}</small>
                <h3>${localizar("6 vagas para a batalha")}</h3>
                <ol>${criarVagasDaSelecaoDeDefesas()}</ol>
                <p class="selecao-defesas-mensagem" role="status">${mensagemDaSelecaoDeDefesas}</p>
                <button
                    class="botao botao-confirmar-selecao-defesas"
                    type="button"
                    onclick="confirmarSelecaoDeDefesas()"
                    ${quantidadeSelecionada > 0 ? "" : "disabled"}
                >${textoDoBotao}</button>
            </aside>
        </div>
    `;

    desenharMiniaturasDasTorresDoAlbum();
}

function abrirSelecaoDeDefesas(wavesInfinitas = false) {
    if (jogoIniciado) {
        return;
    }

    selecaoDeDefesasParaModoInfinito = Boolean(wavesInfinitas);
    selecaoDeDefesasEmEdicao = normalizarSelecaoDeDefesas(
        defesasSelecionadasParaPartida
    );
    mensagemDaSelecaoDeDefesas = "";
    mostrarSelecaoDeDefesas();
}

function alternarDefesaDaSelecao(tipoDaDefesa) {
    if (!torreEstaDesbloqueada(tipoDaDefesa)) {
        return;
    }

    if (selecaoDeDefesasEmEdicao.has(tipoDaDefesa)) {
        const padraoEhObrigatoria = !selecaoDeDefesasParaModoInfinito
            && !tutorialConcluido
            && tipoDaDefesa === "padrao";

        if (padraoEhObrigatoria) {
            mensagemDaSelecaoDeDefesas = localizar(
                "A Torre padrão precisa ficar na equipe durante o tutorial."
            );
        } else {
            selecaoDeDefesasEmEdicao.delete(tipoDaDefesa);
            mensagemDaSelecaoDeDefesas = "";
        }
        mostrarSelecaoDeDefesas();
        return;
    }

    if (selecaoDeDefesasEmEdicao.size >= CONFIG.torre.quantidadeMaximaDeDefesasSelecionadas) {
        mensagemDaSelecaoDeDefesas = localizar(
            "Sua equipe já está completa. Retire uma defesa para escolher outra."
        );
        mostrarSelecaoDeDefesas();
        return;
    }

    selecaoDeDefesasEmEdicao.add(tipoDaDefesa);
    mensagemDaSelecaoDeDefesas = "";
    mostrarSelecaoDeDefesas();
}

function confirmarSelecaoDeDefesas() {
    if (selecaoDeDefesasEmEdicao.size === 0) {
        mensagemDaSelecaoDeDefesas = localizar("Escolha pelo menos uma defesa.");
        mostrarSelecaoDeDefesas();
        return;
    }

    defesasSelecionadasParaPartida = normalizarSelecaoDeDefesas(
        selecaoDeDefesasEmEdicao,
        false
    );
    salvarSelecaoDeDefesas();
    const iniciarNoModoInfinito = selecaoDeDefesasParaModoInfinito;
    fecharConteudoMenu();
    iniciarPartida(iniciarNoModoInfinito);
}

function obterBotoesDeConstrucao() {
    return [
        { tipo: "padrao", elemento: botaoTorrePadrao },
        { tipo: "canhaoPesado", elemento: botaoCanhaoPesado },
        { tipo: "torreGlacial", elemento: botaoTorreGlacial },
        { tipo: "torreBesta", elemento: botaoTorreBesta },
        { tipo: "torreEsporos", elemento: botaoTorreEsporos },
        { tipo: "obliterador", elemento: botaoObliterador },
        { tipo: "torreSismica", elemento: botaoTorreSismica },
        { tipo: "iscaBlindada", elemento: botaoIscaBlindada },
        { tipo: "amplificadorPixel", elemento: botaoAmplificadorPixel },
        { tipo: "geradorDeCreditos", elemento: botaoGeradorCreditos },
        { tipo: "torreDeRaios", elemento: botaoTorreRaios },
        { tipo: "lancaChamas", elemento: botaoLancaChamas },
        { tipo: "minaTerrestre", elemento: botaoMinaTerrestre },
        { tipo: "minaCongelante", elemento: botaoMinaCongelante },
        { tipo: "bombaPesada", elemento: botaoBombaPesada }
    ];
}

function selecionarTipoDeTorre(tipoDaTorre) {
    if (!CONFIG.torre.tipos[tipoDaTorre]) {
        return;
    }

    if (!defesaEstaSelecionadaParaPartida(tipoDaTorre)) {
        return;
    }

    if (tutorialAtivo && passoTutorial <= 3 && tipoDaTorre !== "padrao") {
        mostrarAviso(localizar("No tutorial, escolha primeiro a Torre padrão."));
        return;
    }

    if (!torreEstaDesbloqueada(tipoDaTorre)) {
        tipoDeTorreParaConstruir = obterPrimeiraDefesaDisponivelParaPartida();
        atualizarBotoesDeConstrucao();
        const configuracaoBloqueada = obterConfiguracaoDaTorre(tipoDaTorre);
        mostrarAviso(obterMensagemDeTorreBloqueada(configuracaoBloqueada));
        return;
    }

    tipoDeTorreParaConstruir = tipoDaTorre;
    atualizarBotoesDeConstrucao();

    const configuracao = obterConfiguracaoDaTorre();
    const resumo = obterResumoDaConfiguracaoDaTorre(configuracao);
    mostrarAviso(localizar("{nome} selecionado · {resumo}.", {
        nome: obterNomeLocalizado(configuracao),
        resumo
    }));

    if (tutorialAtivo && passoTutorial === 2 && tipoDaTorre === "padrao") {
        avancarTutorialPara(3);
    }
}

function atualizarBotoesDeConstrucao() {
    if (
        !torreEstaDesbloqueada(tipoDeTorreParaConstruir)
        || !defesaEstaSelecionadaParaPartida(tipoDeTorreParaConstruir)
    ) {
        tipoDeTorreParaConstruir = obterPrimeiraDefesaDisponivelParaPartida();
    }

    const botoes = obterBotoesDeConstrucao();

    for (const botao of botoes) {
        const selecionado = botao.tipo === tipoDeTorreParaConstruir;
        const configuracao = obterConfiguracaoDaTorre(botao.tipo);
        const disponivel = torreEstaDesbloqueada(botao.tipo);
        const escolhidaParaPartida = defesaEstaSelecionadaParaPartida(botao.tipo);
        const nome = obterNomeLocalizado(configuracao);
        botao.elemento.hidden = !escolhidaParaPartida;
        botao.elemento.textContent = disponivel
            ? `${nome} (${configuracao.custo})`
            : `${nome} (${obterTextoDeTorreBloqueada(configuracao)})`;
        botao.elemento.disabled = !disponivel;
        botao.elemento.setAttribute("aria-disabled", (!disponivel).toString());
        botao.elemento.setAttribute("aria-pressed", selecionado.toString());
        botao.elemento.classList.remove("botao-construcao-ativo");

        if (selecionado && disponivel) {
            botao.elemento.classList.add("botao-construcao-ativo");
        }
    }

    resumoDoSeletorTorres.textContent = localizar("{quantidade} de {limite} escolhidas", {
        quantidade: defesasSelecionadasParaPartida.size,
        limite: CONFIG.torre.quantidadeMaximaDeDefesasSelecionadas
    });
}

function obterConteudoDoPassoDoTutorial(passo) {
    const passos = {
        1: {
            titulo: localizar("Proteja a torre-base"),
            descricao: localizar("Os inimigos entram pelo começo do caminho e tentam chegar à sua torre-base. Sua missão é impedir que eles alcancem o final."),
            elementoDestacado: null,
            permiteContinuar: true,
            textoDoBotao: localizar("Entendi")
        },
        2: {
            titulo: localizar("Escolha uma defesa"),
            descricao: localizar("Clique em Torre padrão na lista de Defesas. Ela custa 150 créditos e já está disponível na primeira fase."),
            elementoDestacado: botaoTorrePadrao,
            permiteContinuar: false
        },
        3: {
            titulo: localizar("Construa fora do caminho"),
            descricao: localizar("Agora clique em um espaço livre do mapa, fora da estrada. As torres precisam ficar perto do caminho para alcançar os inimigos."),
            elementoDestacado: canvas,
            permiteContinuar: false
        },
        4: {
            titulo: localizar("Selecione sua torre"),
            descricao: localizar("Clique na Torre padrão que você acabou de construir. Assim você poderá ver seus atributos e comandos."),
            elementoDestacado: canvas,
            permiteContinuar: false
        },
        5: {
            titulo: localizar("Prepare a defesa"),
            descricao: localizar("Na Central da torre você pode escolher a prioridade do alvo, melhorar a torre com créditos ou vendê-la. Agora libere os inimigos e sobreviva até a wave 20!"),
            elementoDestacado: controles,
            permiteContinuar: true,
            textoDoBotao: localizar("Começar defesa")
        }
    };

    return passos[passo] || passos[1];
}

function limparDestaquesDoTutorial() {
    botaoTorrePadrao.classList.remove("tutorial-destaque");
    canvas.classList.remove("tutorial-destaque");
    controles.classList.remove("tutorial-destaque");
}

function atualizarPassoDoTutorial() {
    if (!tutorialAtivo) {
        return;
    }

    const conteudo = obterConteudoDoPassoDoTutorial(passoTutorial);
    limparDestaquesDoTutorial();
    camadaTutorialPartida.dataset.passo = passoTutorial.toString();
    progressoTutorialPartida.textContent = localizar("Passo {passo} de {total}", {
        passo: passoTutorial,
        total: CONFIG.tutorial.quantidadeDePassos
    });
    tituloTutorialPartida.textContent = conteudo.titulo;
    descricaoTutorialPartida.textContent = conteudo.descricao;
    botaoContinuarTutorial.hidden = !conteudo.permiteContinuar;
    botaoContinuarTutorial.textContent = conteudo.textoDoBotao || localizar("Continuar");

    if (conteudo.elementoDestacado) {
        conteudo.elementoDestacado.classList.add("tutorial-destaque");
    }

    if (conteudo.permiteContinuar) {
        botaoContinuarTutorial.focus();
    } else if (conteudo.elementoDestacado instanceof HTMLElement) {
        conteudo.elementoDestacado.focus();
    }
}

function desenharCenaPausadaDoTutorial() {
    desenharMapa();
    desenharFliperamaNoMapa();
    desenharMinasTerrestres();
    desenharBombasPesadas();
    desenharTorres();
    desenharInimigos();
    desenharTiros();
    desenharExplosoesDosExplosivos();
    desenharIluminacaoDoMapa();
    desenharInterface();
}

function iniciarTutorialDaPartida() {
    tutorialAtivo = true;
    passoTutorial = 1;
    camadaTutorialPartida.hidden = false;
    definirJogoPausado(true);
    desenharCenaPausadaDoTutorial();
    atualizarPassoDoTutorial();
}

function avancarTutorialPara(passo) {
    if (!tutorialAtivo || passo < 1 || passo > CONFIG.tutorial.quantidadeDePassos) {
        return;
    }

    passoTutorial = passo;
    desenharCenaPausadaDoTutorial();
    atualizarPassoDoTutorial();
}

function ocultarTutorialDaPartida() {
    tutorialAtivo = false;
    passoTutorial = 0;
    camadaTutorialPartida.hidden = true;
    delete camadaTutorialPartida.dataset.passo;
    limparDestaquesDoTutorial();
}

function concluirTutorialDaPartida() {
    if (!tutorialAtivo) {
        return;
    }

    tutorialConcluido = true;
    salvarTutorialConcluido();
    ocultarTutorialDaPartida();
    definirJogoPausado(false);
    mostrarAviso(localizar("Treinamento concluído. Defenda sua base!"));
}

function continuarTutorialDaPartida() {
    if (passoTutorial === 1) {
        avancarTutorialPara(2);
    } else if (passoTutorial === CONFIG.tutorial.quantidadeDePassos) {
        concluirTutorialDaPartida();
    }
}

function pularTutorialDaPartida() {
    concluirTutorialDaPartida();
}

function iniciarTutorialPeloMenu() {
    tutorialSolicitado = true;
    iniciarPartida(false);
}

function tutorialBloqueiaAcoesDaTorre() {
    if (!tutorialAtivo) {
        return false;
    }

    mostrarAviso(localizar("Conclua ou pule o tutorial antes de usar este comando."));
    return true;
}

function iniciarPartida(wavesInfinitas = false) {
    pararMusicaDoLobby();

    if (jogoIniciado) {
        return;
    }

    modoWavesInfinitas = Boolean(wavesInfinitas);
    const deveIniciarTutorial = !modoWavesInfinitas
        && !faseAtualEhSecreta()
        && (tutorialSolicitado || !tutorialConcluido);
    prepararSelecaoDeDefesasParaPartida(deveIniciarTutorial);
    tutorialSolicitado = false;
    jogoIniciado = true;
    fecharConfiguracoes();
    fecharConteudoMenu();
    menuPrincipal.classList.add("oculto");
    controles.classList.remove("oculto");
    seletorTorres.classList.remove("oculto");
    menuPartida.classList.remove("oculto");
    fecharMenuDaPartida();
    obterContextoAudio();
    selecionarTrilhaDaPartida();
    prepararNovaPartida();

    if (deveIniciarTutorial) {
        iniciarTutorialDaPartida();
    }

    requestAnimationFrame(atualizar);
}

function prepararNovaPartida() {
    ocultarTutorialDaPartida();
    inimigos = [];
    torres = [];
    minasTerrestres = [];
    bombasPesadas = [];
    explosoesDosExplosivos = [];
    avisosDeCreditosGerados = [];
    tiros = [];
    tirosDosInimigos = [];
    dinheiro = obterDinheiroInicial();
    wave = 0;
    inimigosParaCriar = 0;
    inimigosRoxosParaCriar = 0;
    inimigosVermelhosParaCriar = 0;
    inimigosRapidosParaCriar = 0;
    inimigosSabotadoresParaCriar = 0;
    inimigosEscorpioesParaCriar = 0;
    inimigosMumiasParaCriar = 0;
    inimigosLobosDeGeloParaCriar = 0;
    inimigosYetisParaCriar = 0;
    inimigosMacacosSaqueadoresParaCriar = 0;
    inimigosGorilasDaSelvaParaCriar = 0;
    inimigosOncasDaSelvaParaCriar = 0;
    inimigosRaposasLadinasParaCriar = 0;
    inimigosJavalisFuriososParaCriar = 0;
    inimigosCorujasSombriasParaCriar = 0;
    inimigosMorcegosDeFogoParaCriar = 0;
    inimigosLagartosVulcanicosParaCriar = 0;
    inimigosGolemsDeMagmaParaCriar = 0;
    inimigosMosquitosDoBrejoParaCriar = 0;
    inimigosSaposVenenososParaCriar = 0;
    inimigosGuardioesDeLodoParaCriar = 0;
    inimigosRaptorsAncestraisParaCriar = 0;
    inimigosBesourosDeAmbarParaCriar = 0;
    inimigosTriceratoposParaCriar = 0;
    inimigosDronesCacadoresParaCriar = 0;
    inimigosRobosReparadoresParaCriar = 0;
    inimigosSentinelasDeEscudoParaCriar = 0;
    pixelsCorrompidosParaCriar = 0;
    errosVelozesParaCriar = 0;
    blocosInstaveisParaCriar = 0;
    inimigosChefesParaCriar = 0;
    proximoIndiceDeEntrada = 0;
    proximoInimigoEm = 0;
    proximaWaveEm = 0;
    aviso = "";
    avisoExpiraEm = 0;
    avisoBossExpiraEm = 0;
    torreSelecionada = null;
    partidaEncerrada = false;
    partidaVencida = false;
    novaFaseDesbloqueada = false;
    fragmentosRecebidosNoResultado = 0;
    tipoDeTorreParaConstruir = obterPrimeiraDefesaDisponivelParaPartida();
    posicaoCursorNoMapa = null;
    ultimaWaveComBonusOferecido = 0;
    opcoesDeBonusAtuais = [];
    bonusPosBossEscolhidos = [];
    multiplicadorDeDanoDasTorres = 1;
    multiplicadorDeAlcanceDasTorres = 1;
    multiplicadorDeCadenciaDasTorres = 1;
    fliperamaNoMapa = null;
    boostFliperamaAtivo = false;
    boostFliperamaExpiraEm = 0;
    boostDanoFliperamaAtivo = false;
    boostDanoFliperamaExpiraEm = 0;
    proximaWaveDoPulsoTemporal = 1;
    pulsoTemporalNormalExpiraEm = 0;
    pulsoTemporalBossExpiraEm = 0;
    pulsoTemporalAcabouDeSerDesbloqueado = false;
    radioProjetoRelogioDisponivel = false;
    canvas.classList.remove("inimigo-sob-cursor");
    canvas.classList.remove("fliperama-sob-cursor");
    canvas.classList.remove("radio-sob-cursor");
    jogoPausado = false;
    pausaIniciadaEm = 0;
    pausaAutomaticaPorOcultacao = false;
    reiniciarRelogioDaSimulacao();

    ocultarMinigameFliperama();
    ocultarPainelBonusPosBoss();
    ocultarConfirmacaoDeDesistencia();
    ocultarPainelDeResultado();
    menuPartida.classList.remove("oculto");
    atualizarPainelDeBoosts();
    atualizarPulsoTemporalNoPosto();
    atualizarDisponibilidadeDaDesistencia();
    atualizarBotoesDeConstrucao();
    atualizarBotoesDaTorre();
    iniciarProximaWave();
}

function sortearOpcoesDeBonusPosBoss() {
    const tiposDisponiveis = Object.keys(CONFIG.bonusPosBoss.tipos);

    for (let indice = tiposDisponiveis.length - 1; indice > 0; indice--) {
        const indiceSorteado = Math.floor(Math.random() * (indice + 1));
        [tiposDisponiveis[indice], tiposDisponiveis[indiceSorteado]] = [
            tiposDisponiveis[indiceSorteado],
            tiposDisponiveis[indice]
        ];
    }

    return tiposDisponiveis.slice(0, CONFIG.bonusPosBoss.quantidadeDeOpcoes);
}

function criarBotaoDeBonusPosBoss(tipoDoBonus) {
    const configuracao = CONFIG.bonusPosBoss.tipos[tipoDoBonus];
    const botao = document.createElement("button");
    const icone = document.createElement("span");
    const nome = document.createElement("strong");
    const descricao = document.createElement("small");

    botao.type = "button";
    botao.className = "botao botao-bonus-pos-boss";
    botao.addEventListener("click", () => escolherBonusPosBoss(tipoDoBonus));
    icone.className = "icone-bonus-pos-boss";
    icone.setAttribute("aria-hidden", "true");
    icone.textContent = configuracao.icone;
    nome.textContent = obterNomeLocalizado(configuracao);
    descricao.textContent = localizar(configuracao.descricao);
    botao.append(icone, nome, descricao);

    return botao;
}

function abrirPainelBonusPosBoss() {
    ultimaWaveComBonusOferecido = wave;
    opcoesDeBonusAtuais = sortearOpcoesDeBonusPosBoss();
    opcoesBonusPosBoss.innerHTML = "";

    for (const tipoDoBonus of opcoesDeBonusAtuais) {
        opcoesBonusPosBoss.append(criarBotaoDeBonusPosBoss(tipoDoBonus));
    }

    camadaBonusPosBoss.hidden = false;
    definirJogoPausado(true);
    opcoesBonusPosBoss.firstElementChild?.focus();
}

function ocultarPainelBonusPosBoss() {
    camadaBonusPosBoss.hidden = true;
    opcoesBonusPosBoss.innerHTML = "";
}

function formatarPercentualDoBonus(valor) {
    const percentual = Math.round(valor * 1000) / 10;
    return Number.isInteger(percentual)
        ? percentual.toString()
        : percentual.toFixed(1).replace(".", ",");
}

function obterResumoDoBonusNoPosto(tipoDoBonus, quantidade) {
    const configuracao = CONFIG.bonusPosBoss.tipos[tipoDoBonus];

    if (tipoDoBonus === "cadencia") {
        const percentualAcumulado = 1 - Math.pow(1 - configuracao.percentual, quantidade);
        return localizar("-{percentual}% intervalo", {
            percentual: formatarPercentualDoBonus(percentualAcumulado)
        });
    }

    if (tipoDoBonus === "creditos") {
        return localizar("+{creditos} créditos", {
            creditos: configuracao.valor * quantidade
        });
    }

    const percentualAcumulado = Math.pow(1 + configuracao.percentual, quantidade) - 1;
    const atributo = tipoDoBonus === "dano" ? localizar("dano") : localizar("alcance");
    return "+" + formatarPercentualDoBonus(percentualAcumulado) + "% " + atributo;
}

function criarItemDeBonusNoPosto(tipoDoBonus, quantidade) {
    const configuracao = CONFIG.bonusPosBoss.tipos[tipoDoBonus];
    const item = document.createElement("div");
    const icone = document.createElement("span");
    const texto = document.createElement("span");
    const nome = document.createElement("strong");
    const resumo = document.createElement("small");
    const contador = document.createElement("b");

    item.className = "posto-boost-item";
    item.dataset.tipo = tipoDoBonus;
    icone.className = "posto-boost-icone";
    icone.setAttribute("aria-hidden", "true");
    icone.textContent = configuracao.icone;
    texto.className = "posto-boost-texto";
    nome.textContent = obterNomeLocalizado(configuracao);
    resumo.textContent = obterResumoDoBonusNoPosto(tipoDoBonus, quantidade);
    contador.className = "posto-boost-contador";
    contador.textContent = "x" + quantidade;
    texto.append(nome, resumo);
    item.append(icone, texto, contador);

    return item;
}

function atualizarBonusPosBossNoPosto() {
    const quantidades = bonusPosBossEscolhidos.reduce((acumulado, tipoDoBonus) => {
        acumulado[tipoDoBonus] = (acumulado[tipoDoBonus] || 0) + 1;
        return acumulado;
    }, {});
    const bonusAgrupados = Object.entries(quantidades);

    listaBonusPosBossNoPosto.replaceChildren();

    if (bonusAgrupados.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "posto-boosts-vazio";
        mensagem.textContent = localizar("Derrote um Boss para escolher seu primeiro boost.");
        listaBonusPosBossNoPosto.append(mensagem);
        return;
    }

    for (const [tipoDoBonus, quantidade] of bonusAgrupados) {
        listaBonusPosBossNoPosto.append(
            criarItemDeBonusNoPosto(tipoDoBonus, quantidade)
        );
    }
}

function calcularPercentualDoBoostTemporario(ativo, expiraEm, agora) {
    if (!ativo) {
        return 0;
    }

    return Math.min(
        100,
        Math.round(
            Math.max(0, expiraEm - agora)
            / CONFIG.fliperama.boost.duracao
            * 100
        )
    );
}

function atualizarBoostFliperamaNoPosto(agora = Date.now()) {
    const cadenciaAtiva = boostFliperamaAtivo && agora < boostFliperamaExpiraEm;
    const danoAtivo = boostDanoFliperamaAtivo && agora < boostDanoFliperamaExpiraEm;
    const efeitosAtivos = [];

    boostFliperamaNoPosto.dataset.estado =
        cadenciaAtiva || danoAtivo ? "ativo" : "inativo";
    barraBoostFliperamaNoPosto.style.width = calcularPercentualDoBoostTemporario(
        cadenciaAtiva,
        boostFliperamaExpiraEm,
        agora
    ) + "%";
    barraBoostDanoFliperamaNoPosto.style.width = calcularPercentualDoBoostTemporario(
        danoAtivo,
        boostDanoFliperamaExpiraEm,
        agora
    ) + "%";

    if (cadenciaAtiva) {
        efeitosAtivos.push(
            "CAD +"
            + Math.round(CONFIG.fliperama.boost.percentualDeCadencia * 100)
            + "% "
            + Math.ceil((boostFliperamaExpiraEm - agora) / 1000)
            + "s"
        );
    }

    if (danoAtivo) {
        efeitosAtivos.push(
            "DANO +"
            + Math.round(CONFIG.fliperama.boost.percentualDeDano * 100)
            + "% "
            + Math.ceil((boostDanoFliperamaExpiraEm - agora) / 1000)
            + "s"
        );
    }

    estadoBoostFliperamaNoPosto.textContent = efeitosAtivos.length > 0
        ? efeitosAtivos.join(" · ")
        : localizar("Aguardando evento");
}

function atualizarPainelDeBoosts(agora = Date.now()) {
    atualizarBonusPosBossNoPosto();
    atualizarBoostFliperamaNoPosto(agora);
}

function pulsoTemporalEstaDesbloqueado() {
    return maiorFaseConcluida >= CONFIG.pulsoTemporal.faseConcluidaParaDesbloqueio;
}

function pulsoTemporalEstaAtivo(agora = Date.now()) {
    return agora < pulsoTemporalNormalExpiraEm
        || agora < pulsoTemporalBossExpiraEm;
}

function pulsoTemporalPodeSerAtivado() {
    return pulsoTemporalEstaDesbloqueado()
        && jogoIniciado
        && !jogoPausado
        && !partidaEncerrada
        && wave >= 1
        && wave >= proximaWaveDoPulsoTemporal
        && !pulsoTemporalEstaAtivo();
}

function atualizarPulsoTemporalNoPosto(agora = Date.now()) {
    if (!postoPulsoTemporal || !botaoPulsoTemporal || !estadoPulsoTemporal) {
        return;
    }

    const deveMostrar = jogoIniciado && pulsoTemporalEstaDesbloqueado();
    postoPulsoTemporal.hidden = !deveMostrar;

    if (!deveMostrar) {
        return;
    }

    const tempoRestante = Math.max(
        pulsoTemporalNormalExpiraEm,
        pulsoTemporalBossExpiraEm
    ) - agora;
    const ativo = tempoRestante > 0;
    botaoPulsoTemporal.disabled = !pulsoTemporalPodeSerAtivado();
    botaoPulsoTemporal.dataset.estado = ativo ? "ativo" : "aguardando";

    if (ativo) {
        estadoPulsoTemporal.textContent = localizar("Tempo alterado · {segundos}s", {
            segundos: Math.max(1, Math.ceil(tempoRestante / 1000))
        });
    } else if (wave < 1) {
        estadoPulsoTemporal.textContent = localizar("Disponível na wave 1");
    } else if (wave < proximaWaveDoPulsoTemporal) {
        estadoPulsoTemporal.textContent = localizar("Recarrega na wave {wave}", {
            wave: proximaWaveDoPulsoTemporal
        });
    } else {
        estadoPulsoTemporal.textContent = localizar("Pronto para usar");
    }
}

function ativarPulsoTemporal(agora = Date.now()) {
    if (!pulsoTemporalPodeSerAtivado()) {
        atualizarPulsoTemporalNoPosto(agora);
        return false;
    }

    pulsoTemporalNormalExpiraEm = agora
        + CONFIG.pulsoTemporal.duracaoInimigosComuns;
    pulsoTemporalBossExpiraEm = agora
        + CONFIG.pulsoTemporal.duracaoBosses;
    proximaWaveDoPulsoTemporal = wave
        + CONFIG.pulsoTemporal.wavesParaRecarregar;
    mostrarAviso(localizar("Pulso Temporal ativado!"));
    atualizarPulsoTemporalNoPosto(agora);
    return true;
}

function aplicarBonusPosBoss(tipoDoBonus) {
    const configuracao = CONFIG.bonusPosBoss.tipos[tipoDoBonus];

    if (tipoDoBonus === "cadencia") {
        multiplicadorDeCadenciaDasTorres *= 1 - configuracao.percentual;
    } else if (tipoDoBonus === "creditos") {
        dinheiro += configuracao.valor;
    } else if (tipoDoBonus === "dano") {
        multiplicadorDeDanoDasTorres *= 1 + configuracao.percentual;
    } else if (tipoDoBonus === "alcance") {
        multiplicadorDeAlcanceDasTorres *= 1 + configuracao.percentual;
    }

    for (const torre of torres) {
        atualizarAtributosDaTorreComBonus(torre);
    }

    bonusPosBossEscolhidos.push(tipoDoBonus);
    atualizarBonusPosBossNoPosto();
}

function escolherBonusPosBoss(tipoDoBonus) {
    if (
        camadaBonusPosBoss.hidden
        || !opcoesDeBonusAtuais.includes(tipoDoBonus)
    ) {
        return;
    }

    const configuracao = CONFIG.bonusPosBoss.tipos[tipoDoBonus];
    aplicarBonusPosBoss(tipoDoBonus);
    opcoesDeBonusAtuais = [];
    ocultarPainelBonusPosBoss();
    atualizarBotoesDaTorre();
    mostrarAviso(localizar("Bônus escolhido: {nome}.", {
        nome: obterNomeLocalizado(configuracao)
    }));
    definirJogoPausado(false);
}

function deveOferecerBonusPosBoss() {
    return CONFIG.bonusPosBoss.wavesComBonus.includes(wave)
        && ultimaWaveComBonusOferecido !== wave;
}

function posicaoEstaLivreParaFliperama(x, y) {
    const margem = CONFIG.fliperama.margemDoMapa;

    if (
        x < margem
        || x > canvas.width - margem
        || y < margem
        || y > canvas.height - margem
        || estaNoCaminho(x, y)
    ) {
        return false;
    }

    const pertoDeDefesa = [...torres, ...bombasPesadas].some((defesa) => (
        Math.hypot(defesa.x - x, defesa.y - y)
        < CONFIG.fliperama.distanciaMinimaDasTorres
    ));
    const torreFinal = obterPosicaoDaTorreFinal();
    const pertoDaTorreFinal = Math.hypot(torreFinal.x - x, torreFinal.y - y) < 110;

    return !pertoDeDefesa && !pertoDaTorreFinal;
}

function sortearPosicaoDoFliperama() {
    const margem = CONFIG.fliperama.margemDoMapa;

    for (
        let tentativa = 0;
        tentativa < CONFIG.fliperama.tentativasDePosicao;
        tentativa++
    ) {
        const x = margem + Math.random() * (canvas.width - margem * 2);
        const y = margem + Math.random() * (canvas.height - margem * 2);

        if (posicaoEstaLivreParaFliperama(x, y)) {
            return { x: Math.round(x), y: Math.round(y) };
        }
    }

    for (let y = margem; y <= canvas.height - margem; y += 70) {
        for (let x = margem; x <= canvas.width - margem; x += 70) {
            if (posicaoEstaLivreParaFliperama(x, y)) {
                return { x, y };
            }
        }
    }

    return null;
}

function tentarExibirFliperamaNaWaveAtual() {
    if (!CONFIG.fliperama.wavesDeAparicao.includes(wave)) {
        return;
    }

    const posicao = sortearPosicaoDoFliperama();

    if (!posicao) {
        return;
    }

    fliperamaNoMapa = {
        x: posicao.x,
        y: posicao.y,
        expiraEm: Date.now() + CONFIG.fliperama.tempoDisponivelNoMapa
    };
    mostrarAviso(localizar("Um fliperama apareceu no mapa!"));
}

function atualizarFliperamaNoMapa(agora = Date.now()) {
    if (fliperamaNoMapa && agora >= fliperamaNoMapa.expiraEm) {
        fliperamaNoMapa = null;
        canvas.classList.remove("fliperama-sob-cursor");
    }
}

function fliperamaEstaNaPosicao(x, y) {
    return Boolean(
        fliperamaNoMapa
        && Math.hypot(fliperamaNoMapa.x - x, fliperamaNoMapa.y - y)
            <= CONFIG.fliperama.raioDeClique
    );
}

function criarAlvoMovelDoMinigame(agora = Date.now()) {
    const margem = CONFIG.fliperama.minigame.raioDoAlvo + 18;
    const angulo = Math.random() * Math.PI * 2;
    const velocidade = CONFIG.fliperama.minigame.velocidadeDoAlvo;

    alvoDoMinigameFliperama = {
        x: margem + Math.random() * (canvasMinigameFliperama.width - margem * 2),
        y: margem + Math.random() * (canvasMinigameFliperama.height - margem * 2),
        velocidadeX: Math.cos(angulo) * velocidade,
        velocidadeY: Math.sin(angulo) * velocidade,
        atualizadoEm: agora,
        podeSerAtingidoEm: agora
    };
}

function atualizarMovimentoDoAlvoDoMinigame(agora = Date.now()) {
    if (!alvoDoMinigameFliperama) {
        return;
    }

    const raio = CONFIG.fliperama.minigame.raioDoAlvo;
    const margem = raio + 18;
    const limiteX = canvasMinigameFliperama.width - margem;
    const limiteY = canvasMinigameFliperama.height - margem;
    const tempoDecorrido = Math.min(
        0.08,
        Math.max(0, (agora - alvoDoMinigameFliperama.atualizadoEm) / 1000)
    );

    alvoDoMinigameFliperama.x += alvoDoMinigameFliperama.velocidadeX * tempoDecorrido;
    alvoDoMinigameFliperama.y += alvoDoMinigameFliperama.velocidadeY * tempoDecorrido;

    if (alvoDoMinigameFliperama.x <= margem) {
        alvoDoMinigameFliperama.x = margem;
        alvoDoMinigameFliperama.velocidadeX = Math.abs(
            alvoDoMinigameFliperama.velocidadeX
        );
    } else if (alvoDoMinigameFliperama.x >= limiteX) {
        alvoDoMinigameFliperama.x = limiteX;
        alvoDoMinigameFliperama.velocidadeX = -Math.abs(
            alvoDoMinigameFliperama.velocidadeX
        );
    }

    if (alvoDoMinigameFliperama.y <= margem) {
        alvoDoMinigameFliperama.y = margem;
        alvoDoMinigameFliperama.velocidadeY = Math.abs(
            alvoDoMinigameFliperama.velocidadeY
        );
    } else if (alvoDoMinigameFliperama.y >= limiteY) {
        alvoDoMinigameFliperama.y = limiteY;
        alvoDoMinigameFliperama.velocidadeY = -Math.abs(
            alvoDoMinigameFliperama.velocidadeY
        );
    }

    alvoDoMinigameFliperama.atualizadoEm = agora;
}

function mudarDirecaoDoAlvoAposAcerto(agora = Date.now()) {
    const alvo = alvoDoMinigameFliperama;

    if (!alvo) {
        return;
    }

    const anguloAtual = Math.atan2(alvo.velocidadeY, alvo.velocidadeX);
    const ladoDoDesvio = Math.random() < 0.5 ? -1 : 1;
    const desvio = ladoDoDesvio * (Math.PI / 6 + Math.random() * Math.PI / 3);
    const novoAngulo = anguloAtual + desvio;
    const velocidade = CONFIG.fliperama.minigame.velocidadeDoAlvo;

    alvo.velocidadeX = Math.cos(novoAngulo) * velocidade;
    alvo.velocidadeY = Math.sin(novoAngulo) * velocidade;
    alvo.atualizadoEm = agora;
    alvo.podeSerAtingidoEm = agora
        + CONFIG.fliperama.minigame.intervaloMinimoEntreAcertos;
}

function desenharCenarioDoMinigameFliperama() {
    ctxMinigameFliperama.fillStyle = "#07120c";
    ctxMinigameFliperama.fillRect(
        0,
        0,
        canvasMinigameFliperama.width,
        canvasMinigameFliperama.height
    );

    ctxMinigameFliperama.fillStyle = "#0f2a1a";
    for (let y = 0; y < canvasMinigameFliperama.height; y += 40) {
        for (let x = (y / 40) % 2 === 0 ? 0 : 40; x < canvasMinigameFliperama.width; x += 80) {
            ctxMinigameFliperama.fillRect(x, y, 40, 40);
        }
    }

    ctxMinigameFliperama.strokeStyle = "#355b40";
    ctxMinigameFliperama.lineWidth = 6;
    ctxMinigameFliperama.strokeRect(
        3,
        3,
        canvasMinigameFliperama.width - 6,
        canvasMinigameFliperama.height - 6
    );
}

function desenharAlvoDoMinigameFliperama() {
    if (!alvoDoMinigameFliperama) {
        return;
    }

    const x = Math.round(alvoDoMinigameFliperama.x);
    const y = Math.round(alvoDoMinigameFliperama.y);
    const raio = CONFIG.fliperama.minigame.raioDoAlvo;

    ctxMinigameFliperama.fillStyle = "#020704";
    ctxMinigameFliperama.fillRect(x - raio - 5, y - raio - 5, raio * 2 + 10, raio * 2 + 10);
    ctxMinigameFliperama.fillStyle = "#ff6b6b";
    ctxMinigameFliperama.fillRect(x - raio, y - raio, raio * 2, raio * 2);
    ctxMinigameFliperama.fillStyle = "#f4f1d0";
    ctxMinigameFliperama.fillRect(x - 22, y - 22, 44, 44);
    ctxMinigameFliperama.fillStyle = "#fff36a";
    ctxMinigameFliperama.fillRect(x - 11, y - 11, 22, 22);
    ctxMinigameFliperama.fillStyle = "#07120c";
    ctxMinigameFliperama.fillRect(x - 4, y - 4, 8, 8);
}

function sortearTipoDeMinigameFliperama() {
    const tipos = CONFIG.fliperama.minigame.tiposDisponiveis;
    return tipos[Math.floor(Math.random() * tipos.length)];
}

function sortearModeloDoLabirintoFliperama() {
    const modelos = CONFIG.fliperama.minigame.labirinto.modelos;
    return modelos[Math.floor(Math.random() * modelos.length)];
}

function obterModeloDoLabirintoFliperama() {
    return modeloLabirintoFliperamaAtivo
        || CONFIG.fliperama.minigame.labirinto.modelos[0];
}

function configurarInterfaceDoMinigameFliperama() {
    const labirintoAtivo = tipoMinigameFliperamaAtivo === "labirinto";
    canvasMinigameFliperama.dataset.tipo = tipoMinigameFliperamaAtivo;
    controlesToqueLabirinto.hidden = !labirintoAtivo;

    if (labirintoAtivo) {
        const modelo = obterModeloDoLabirintoFliperama();
        const nomeDoModelo = obterNomeLocalizado(modelo);
        tituloMinigameFliperama.textContent = localizar("Labirinto Pixel");
        descricaoMinigameFliperama.textContent = localizar(
            "Mapa {mapa}: leve o robô até a saída sem tocar nas paredes.",
            { mapa: nomeDoModelo }
        );
        rotuloPontosMinigameFliperama.textContent = localizar("Mapa");
        pontosMinigameFliperama.textContent = nomeDoModelo.toUpperCase();
        instrucaoMinigameFliperama.textContent = localizar(
            "Use WASD, as setas ou o direcional da tela. Encostar na parede leva o robô de volta ao início."
        );
        canvasMinigameFliperama.setAttribute(
            "aria-label",
            localizar("Labirinto controlado por teclado ou toque")
        );
        return;
    }

    tituloMinigameFliperama.textContent = localizar("Tiro ao alvo");
    descricaoMinigameFliperama.textContent = localizar(
        "Acerte o alvo móvel {alvos} vezes antes que o tempo termine.",
        { alvos: CONFIG.fliperama.minigame.alvosNecessarios }
    );
    rotuloPontosMinigameFliperama.textContent = localizar("Acertos");
    pontosMinigameFliperama.textContent = "0/10";
    instrucaoMinigameFliperama.textContent = localizar(
        "Acompanhe o alvo: ele se move livremente e rebate nas bordas."
    );
    canvasMinigameFliperama.setAttribute(
        "aria-label",
        localizar("Área do minigame com alvo móvel")
    );
}

function iniciarEstadoDoLabirintoFliperama(agora = Date.now()) {
    const inicio = obterModeloDoLabirintoFliperama().inicio;
    roboDoLabirintoFliperama = {
        x: inicio.x,
        y: inicio.y,
        atualizadoEm: agora
    };
    teclasPressionadasNoLabirinto.clear();
}

function circuloColideComRetangulo(x, y, raio, retangulo) {
    const xMaisProximo = Math.max(
        retangulo.x,
        Math.min(x, retangulo.x + retangulo.largura)
    );
    const yMaisProximo = Math.max(
        retangulo.y,
        Math.min(y, retangulo.y + retangulo.altura)
    );
    return Math.hypot(x - xMaisProximo, y - yMaisProximo) <= raio;
}

function roboDoLabirintoTocaParede(x, y) {
    const configuracao = CONFIG.fliperama.minigame.labirinto;
    const modelo = obterModeloDoLabirintoFliperama();
    return modelo.paredes.some((parede) => (
        circuloColideComRetangulo(x, y, configuracao.raioDoRobo, parede)
    ));
}

function reiniciarPosicaoDoRoboNoLabirinto(agora = Date.now()) {
    const inicio = obterModeloDoLabirintoFliperama().inicio;
    roboDoLabirintoFliperama.x = inicio.x;
    roboDoLabirintoFliperama.y = inicio.y;
    roboDoLabirintoFliperama.atualizadoEm = agora;
}

function atualizarMovimentoDoRoboNoLabirinto(agora = Date.now()) {
    if (!roboDoLabirintoFliperama) {
        iniciarEstadoDoLabirintoFliperama(agora);
    }

    const configuracao = CONFIG.fliperama.minigame.labirinto;
    const modelo = obterModeloDoLabirintoFliperama();
    const direcao = obterDirecaoPelasTeclas(teclasPressionadasNoLabirinto);
    const tempoDecorrido = Math.min(
        0.05,
        Math.max(0, (agora - roboDoLabirintoFliperama.atualizadoEm) / 1000)
    );
    roboDoLabirintoFliperama.atualizadoEm = agora;

    if (direcao.x === 0 && direcao.y === 0) {
        return;
    }

    const deslocamento = configuracao.velocidadeDoRobo * tempoDecorrido;
    const novoX = Math.max(
        configuracao.raioDoRobo,
        Math.min(
            canvasMinigameFliperama.width - configuracao.raioDoRobo,
            roboDoLabirintoFliperama.x + direcao.x * deslocamento
        )
    );
    const novoY = Math.max(
        configuracao.raioDoRobo,
        Math.min(
            canvasMinigameFliperama.height - configuracao.raioDoRobo,
            roboDoLabirintoFliperama.y + direcao.y * deslocamento
        )
    );

    if (roboDoLabirintoTocaParede(novoX, novoY)) {
        reiniciarPosicaoDoRoboNoLabirinto(agora);
        return;
    }

    roboDoLabirintoFliperama.x = novoX;
    roboDoLabirintoFliperama.y = novoY;

    if (
        circuloColideComRetangulo(
            novoX,
            novoY,
            configuracao.raioDoRobo,
            modelo.saida
        )
    ) {
        finalizarMinigameFliperama(true);
    }
}

function desenharLabirintoDoFliperama() {
    const configuracao = CONFIG.fliperama.minigame.labirinto;
    const modelo = obterModeloDoLabirintoFliperama();
    desenharCenarioDoMinigameFliperama();

    ctxMinigameFliperama.fillStyle = "#1f7a53";
    ctxMinigameFliperama.fillRect(
        modelo.saida.x,
        modelo.saida.y,
        modelo.saida.largura,
        modelo.saida.altura
    );
    ctxMinigameFliperama.fillStyle = "#fff36a";
    ctxMinigameFliperama.fillRect(
        modelo.saida.x + 7,
        modelo.saida.y + 7,
        modelo.saida.largura - 14,
        modelo.saida.altura - 14
    );

    for (const parede of modelo.paredes) {
        ctxMinigameFliperama.fillStyle = "#0a0d12";
        ctxMinigameFliperama.fillRect(
            parede.x - 4,
            parede.y - 4,
            parede.largura + 8,
            parede.altura + 8
        );
        ctxMinigameFliperama.fillStyle = "#7092ad";
        ctxMinigameFliperama.fillRect(
            parede.x,
            parede.y,
            parede.largura,
            parede.altura
        );

        ctxMinigameFliperama.fillStyle = "#b9d6e8";
        if (parede.largura >= parede.altura) {
            for (let x = parede.x + 8; x < parede.x + parede.largura; x += 24) {
                ctxMinigameFliperama.fillRect(x, parede.y + 4, 6, parede.altura - 8);
            }
        } else {
            for (let y = parede.y + 8; y < parede.y + parede.altura; y += 24) {
                ctxMinigameFliperama.fillRect(parede.x + 4, y, parede.largura - 8, 6);
            }
        }
    }

    const inicio = modelo.inicio;
    ctxMinigameFliperama.fillStyle = "#4a2762";
    ctxMinigameFliperama.fillRect(inicio.x - 18, inicio.y - 18, 36, 36);
    ctxMinigameFliperama.fillStyle = "#d58aff";
    ctxMinigameFliperama.fillRect(inicio.x - 10, inicio.y - 10, 20, 20);

    if (!roboDoLabirintoFliperama) {
        return;
    }

    const x = Math.round(roboDoLabirintoFliperama.x);
    const y = Math.round(roboDoLabirintoFliperama.y);
    ctxMinigameFliperama.fillStyle = "#020704";
    ctxMinigameFliperama.fillRect(x - 13, y - 13, 26, 26);
    ctxMinigameFliperama.fillStyle = "#8fc9ff";
    ctxMinigameFliperama.fillRect(x - 10, y - 10, 20, 20);
    ctxMinigameFliperama.fillStyle = "#f4f1d0";
    ctxMinigameFliperama.fillRect(x - 6, y - 5, 4, 4);
    ctxMinigameFliperama.fillRect(x + 2, y - 5, 4, 4);
    ctxMinigameFliperama.fillStyle = "#244b67";
    ctxMinigameFliperama.fillRect(x - 5, y + 4, 10, 3);
}

function atualizarPainelDoMinigameFliperama(agora = Date.now()) {
    const tempoRestante = Math.max(0, minigameFliperamaTerminaEm - agora);

    if (tipoMinigameFliperamaAtivo === "alvo") {
        pontosMinigameFliperama.textContent = (
            acertosNoMinigameFliperama
            + "/"
            + CONFIG.fliperama.minigame.alvosNecessarios
        );
    }

    tempoMinigameFliperama.textContent = Math.ceil(tempoRestante / 1000) + "s";
}

function atualizarMinigameFliperama() {
    if (!minigameFliperamaAtivo) {
        return;
    }

    const agora = Date.now();

    if (agora >= minigameFliperamaTerminaEm) {
        finalizarMinigameFliperama(false);
        return;
    }

    if (tipoMinigameFliperamaAtivo === "labirinto") {
        atualizarMovimentoDoRoboNoLabirinto(agora);

        if (!minigameFliperamaAtivo) {
            return;
        }

        desenharLabirintoDoFliperama();
    } else {
        if (!alvoDoMinigameFliperama) {
            criarAlvoMovelDoMinigame(agora);
        }

        atualizarMovimentoDoAlvoDoMinigame(agora);
        desenharCenarioDoMinigameFliperama();
        desenharAlvoDoMinigameFliperama();
    }

    atualizarPainelDoMinigameFliperama(agora);
    animacaoDoMinigameFliperama = requestAnimationFrame(atualizarMinigameFliperama);
}

function ocultarMinigameFliperama() {
    minigameFliperamaAtivo = false;
    alvoDoMinigameFliperama = null;
    roboDoLabirintoFliperama = null;
    modeloLabirintoFliperamaAtivo = null;
    teclasPressionadasNoLabirinto.clear();
    botoesDirecaoLabirinto.forEach(botao => (
        botao.classList.remove("botao-direcao-pressionado")
    ));
    camadaMinigameFliperama.hidden = true;
    controlesToqueLabirinto.hidden = true;
    delete canvasMinigameFliperama.dataset.tipo;

    if (animacaoDoMinigameFliperama !== null) {
        cancelAnimationFrame(animacaoDoMinigameFliperama);
        animacaoDoMinigameFliperama = null;
    }
}

function iniciarMinigameFliperama() {
    if (!fliperamaNoMapa || minigameFliperamaAtivo) {
        return;
    }

    fliperamaNoMapa = null;
    canvas.classList.remove("fliperama-sob-cursor");
    definirJogoPausado(true);
    minigameFliperamaAtivo = true;
    tipoMinigameFliperamaAtivo = sortearTipoDeMinigameFliperama();
    modeloLabirintoFliperamaAtivo = tipoMinigameFliperamaAtivo === "labirinto"
        ? sortearModeloDoLabirintoFliperama()
        : null;
    acertosNoMinigameFliperama = 0;
    minigameFliperamaTerminaEm = Date.now() + CONFIG.fliperama.minigame.duracao;
    camadaMinigameFliperama.hidden = false;
    configurarInterfaceDoMinigameFliperama();

    if (tipoMinigameFliperamaAtivo === "labirinto") {
        iniciarEstadoDoLabirintoFliperama();
    } else {
        criarAlvoMovelDoMinigame();
    }

    atualizarPainelDoMinigameFliperama();
    atualizarMinigameFliperama();
}

function aplicarBoostDeCadenciaDoFliperama() {
    const agora = Date.now();
    boostFliperamaAtivo = true;
    boostFliperamaExpiraEm = Math.max(agora, boostFliperamaExpiraEm)
        + CONFIG.fliperama.boost.duracao;

    for (const torre of torres) {
        atualizarAtributosDaTorreComBonus(torre);
    }

    atualizarBoostFliperamaNoPosto(agora);
}

function aplicarBoostDeDanoDoFliperama() {
    const agora = Date.now();
    boostDanoFliperamaAtivo = true;
    boostDanoFliperamaExpiraEm = Math.max(agora, boostDanoFliperamaExpiraEm)
        + CONFIG.fliperama.boost.duracao;

    for (const torre of torres) {
        atualizarAtributosDaTorreComBonus(torre);
    }

    atualizarBoostFliperamaNoPosto(agora);
}

function finalizarMinigameFliperama(vitoria) {
    if (!minigameFliperamaAtivo) {
        return;
    }

    const tipoConcluido = tipoMinigameFliperamaAtivo;
    ocultarMinigameFliperama();
    definirJogoPausado(false);

    if (vitoria) {
        if (tipoConcluido === "labirinto") {
            aplicarBoostDeDanoDoFliperama();
            mostrarAviso(localizar(
                "Labirinto concluído! Torres com +{percentual}% de dano por {segundos} segundos.",
                {
                    percentual: obterPercentualInteiro(CONFIG.fliperama.boost.percentualDeDano),
                    segundos: CONFIG.fliperama.boost.duracao / 1000
                }
            ));
        } else {
            aplicarBoostDeCadenciaDoFliperama();
            mostrarAviso(localizar(
                "Tiro ao alvo concluído! Torres aceleradas por {segundos} segundos.",
                { segundos: CONFIG.fliperama.boost.duracao / 1000 }
            ));
        }
    } else {
        mostrarAviso(localizar("Tempo esgotado no fliperama."));
    }
}

function atualizarEstadoDoBoostFliperama(agora = Date.now()) {
    const cadenciaTerminou = boostFliperamaAtivo && agora >= boostFliperamaExpiraEm;
    const danoTerminou = boostDanoFliperamaAtivo && agora >= boostDanoFliperamaExpiraEm;

    if (!cadenciaTerminou && !danoTerminou) {
        return;
    }

    if (cadenciaTerminou) {
        boostFliperamaAtivo = false;
        boostFliperamaExpiraEm = 0;
    }

    if (danoTerminou) {
        boostDanoFliperamaAtivo = false;
        boostDanoFliperamaExpiraEm = 0;
    }

    for (const torre of torres) {
        atualizarAtributosDaTorreComBonus(torre);
    }

    atualizarBoostFliperamaNoPosto(agora);
    mostrarAviso(localizar("O boost do fliperama terminou."));
}

canvasMinigameFliperama.addEventListener("click", (evento) => {
    if (
        !minigameFliperamaAtivo
        || tipoMinigameFliperamaAtivo !== "alvo"
        || !alvoDoMinigameFliperama
    ) {
        return;
    }

    const agora = Date.now();

    if (agora < alvoDoMinigameFliperama.podeSerAtingidoEm) {
        return;
    }

    const retangulo = canvasMinigameFliperama.getBoundingClientRect();
    const x = (evento.clientX - retangulo.left)
        * (canvasMinigameFliperama.width / retangulo.width);
    const y = (evento.clientY - retangulo.top)
        * (canvasMinigameFliperama.height / retangulo.height);
    const distancia = Math.hypot(
        alvoDoMinigameFliperama.x - x,
        alvoDoMinigameFliperama.y - y
    );

    if (distancia > CONFIG.fliperama.minigame.raioDoAlvo) {
        return;
    }

    acertosNoMinigameFliperama++;

    if (acertosNoMinigameFliperama >= CONFIG.fliperama.minigame.alvosNecessarios) {
        finalizarMinigameFliperama(true);
        return;
    }

    mudarDirecaoDoAlvoAposAcerto(agora);
    atualizarPainelDoMinigameFliperama();
});

const TECLAS_DE_MOVIMENTO_DO_LABIRINTO = Object.freeze([
    "w",
    "a",
    "s",
    "d",
    "arrowup",
    "arrowdown",
    "arrowleft",
    "arrowright"
]);

function alterarTeclaDeMovimento(teclasPressionadas, tecla, pressionada) {
    if (!TECLAS_DE_MOVIMENTO_DO_LABIRINTO.includes(tecla)) {
        return false;
    }

    if (pressionada) {
        teclasPressionadas.add(tecla);
    } else {
        teclasPressionadas.delete(tecla);
    }

    return true;
}

function obterDirecaoPelasTeclas(teclasPressionadas) {
    const esquerda = teclasPressionadas.has("a")
        || teclasPressionadas.has("arrowleft");
    const direita = teclasPressionadas.has("d")
        || teclasPressionadas.has("arrowright");
    const cima = teclasPressionadas.has("w")
        || teclasPressionadas.has("arrowup");
    const baixo = teclasPressionadas.has("s")
        || teclasPressionadas.has("arrowdown");
    const direcaoX = Number(direita) - Number(esquerda);
    const direcaoY = Number(baixo) - Number(cima);
    const comprimento = Math.hypot(direcaoX, direcaoY);

    return comprimento === 0
        ? { x: 0, y: 0 }
        : { x: direcaoX / comprimento, y: direcaoY / comprimento };
}

function alterarDirecaoDoLabirinto(tecla, pressionada) {
    return alterarTeclaDeMovimento(teclasPressionadasNoLabirinto, tecla, pressionada);
}

function alterarDirecaoDosCorredores(tecla, pressionada) {
    return alterarTeclaDeMovimento(teclasPressionadasNosCorredores, tecla, pressionada);
}

function controlarTeclaDoLabirinto(evento) {
    if (!minigameFliperamaAtivo || tipoMinigameFliperamaAtivo !== "labirinto") {
        return;
    }

    const tecla = evento.key.toLowerCase();

    if (alterarDirecaoDoLabirinto(tecla, evento.type === "keydown")) {
        evento.preventDefault();
    }
}

function controlarTeclaDosCorredores(evento) {
    if (!labirintoAmareloAtivo) {
        return;
    }

    const tecla = evento.key.toLowerCase();

    if (alterarDirecaoDosCorredores(tecla, evento.type === "keydown")) {
        evento.preventDefault();
    }
}

function controlarToqueDoLabirinto(evento, pressionada) {
    const botao = evento.currentTarget;
    const direcao = botao.dataset.direcaoLabirinto;

    if (
        !minigameFliperamaAtivo
        || tipoMinigameFliperamaAtivo !== "labirinto"
        || !alterarDirecaoDoLabirinto(direcao, pressionada)
    ) {
        return;
    }

    evento.preventDefault();
    botao.classList.toggle("botao-direcao-pressionado", pressionada);

    if (pressionada && evento.pointerId !== undefined && botao.setPointerCapture) {
        botao.setPointerCapture(evento.pointerId);
    }
}

function controlarToqueDosCorredores(evento, pressionada) {
    const botao = evento.currentTarget;
    const direcao = botao.dataset.direcaoCorredores;

    if (
        !labirintoAmareloAtivo
        || !alterarDirecaoDosCorredores(direcao, pressionada)
    ) {
        return;
    }

    evento.preventDefault();
    botao.classList.toggle("botao-direcao-pressionado", pressionada);

    if (pressionada && evento.pointerId !== undefined && botao.setPointerCapture) {
        botao.setPointerCapture(evento.pointerId);
    }
}

for (const botao of botoesDirecaoLabirinto) {
    botao.addEventListener("pointerdown", evento => controlarToqueDoLabirinto(evento, true));
    botao.addEventListener("pointerup", evento => controlarToqueDoLabirinto(evento, false));
    botao.addEventListener("pointercancel", evento => controlarToqueDoLabirinto(evento, false));
    botao.addEventListener("lostpointercapture", evento => controlarToqueDoLabirinto(evento, false));
}

for (const botao of botoesDirecaoCorredores) {
    botao.addEventListener("pointerdown", evento => controlarToqueDosCorredores(evento, true));
    botao.addEventListener("pointerup", evento => controlarToqueDosCorredores(evento, false));
    botao.addEventListener("pointercancel", evento => controlarToqueDosCorredores(evento, false));
    botao.addEventListener("lostpointercapture", evento => controlarToqueDosCorredores(evento, false));
}

document.addEventListener("keydown", controlarTeclaDoLabirinto);
document.addEventListener("keyup", controlarTeclaDoLabirinto);
document.addEventListener("keydown", controlarTeclaDosCorredores);
document.addEventListener("keyup", controlarTeclaDosCorredores);
window.addEventListener("blur", () => {
    teclasPressionadasNoLabirinto.clear();
    teclasPressionadasNosCorredores.clear();
    botoesDirecaoLabirinto.forEach(botao => (
        botao.classList.remove("botao-direcao-pressionado")
    ));
    botoesDirecaoCorredores.forEach(botao => (
        botao.classList.remove("botao-direcao-pressionado")
    ));
});

function finalizarPartida() {
    if (partidaEncerrada) {
        return;
    }

    partidaEncerrada = true;
    partidaVencida = false;
    fragmentosRecebidosNoResultado = concederFragmentosPelasWavesAlcancadas();
    tiros = [];
    tirosDosInimigos = [];
    tocarEfeitoGameOver();
    mostrarPainelDeResultado(false);
}

function finalizarPartidaComVitoria() {
    if (partidaEncerrada) {
        return;
    }

    partidaEncerrada = true;
    partidaVencida = true;
    const vitoriaNaFaseSecreta = faseAtualEhSecreta();
    const deveDesbloquearCapitulo2 = vitoriaNaFaseSecreta
        && !capitulo2Desbloqueado;
    const pulsoTemporalEstavaBloqueado = !pulsoTemporalEstaDesbloqueado();
    novaFaseDesbloqueada = vitoriaNaFaseSecreta
        ? false
        : registrarConclusaoDaFase();
    pulsoTemporalAcabouDeSerDesbloqueado = !vitoriaNaFaseSecreta
        && pulsoTemporalEstavaBloqueado
        && pulsoTemporalEstaDesbloqueado();
    registrarFaseConcluidaParaMissoes();
    registrarFaseConcluidaParaConquistas();
    if (vitoriaNaFaseSecreta) {
        desbloquearConquista("aindaEstaEsperando");
    }
    fragmentosRecebidosNoResultado = concederFragmentosPelasWavesAlcancadas();
    tiros = [];
    tirosDosInimigos = [];
    tocarEfeitoVitoria();
    if (deveDesbloquearCapitulo2) {
        mostrarConversaDoSenhorDoTempo(0, "vitoria");
    } else if (deveMostrarCartaDaMaquinaDoTempoAposVitoria()) {
        mostrarCutsceneDaCarta("maquinaDoTempo");
    } else if (deveMostrarCartaMisteriosaAposVitoria()) {
        mostrarCutsceneDaCarta();
    } else if (deveMostrarTransmissaoProjetoRelogioAposVitoria()) {
        mostrarTransmissaoProjetoRelogio(false);
    } else {
        mostrarPainelDeResultado(true);
    }
}

function mostrarPainelDeResultado(vitoria) {
    const faseSecreta = faseAtualEhSecreta();
    const existeProximaFase = !faseSecreta
        && faseSelecionada < CONFIG.fases.length
        && faseEstaDesbloqueada(faseSelecionada + 1);

    fecharMenuDaPartida();
    menuPartida.classList.add("oculto");
    camadaResultado.dataset.estado = vitoria ? "vitoria" : "derrota";
    seloResultado.textContent = vitoria
        ? faseSecreta
            ? localizar("FASE SECRETA · {waves} WAVES CONCLUÍDAS", {
                waves: CONFIG.wave.ultimaWave
            })
            : localizar("FASE {fase} · {waves} WAVES CONCLUÍDAS", {
                fase: faseSelecionada,
                waves: CONFIG.wave.ultimaWave
            })
        : localizar("SUA BASE FOI INVADIDA");
    tituloResultado.textContent = vitoria ? localizar("VITÓRIA") : "GAME OVER";
    descricaoResultado.textContent = vitoria
        ? faseSecreta
            ? localizar("A falha foi contida e o caminho para o Capítulo 2 está aberto.")
            : pulsoTemporalAcabouDeSerDesbloqueado
                ? localizar("Pulso Temporal desbloqueado! Ele estará disponível no posto lateral das próximas partidas.")
            : novaFaseDesbloqueada
            ? localizar("A Fase {fase} foi desbloqueada. Escolha seu próximo destino.", {
                fase: faseSelecionada + 1
            })
            : faseSelecionada === CONFIG.fases.length
                ? localizar("Todas as fases disponíveis foram concluídas.")
                : localizar("Fase concluída. Você pode repeti-la ou seguir em frente.")
        : faseSecreta
            ? localizar("A derrota não abriu a saída. O Senhor do Tempo exige uma vitória.")
            : localizar("Um inimigo alcançou sua base. Reorganize sua defesa e tente novamente.");
    if (fragmentosRecebidosNoResultado > 0) {
        const nomeDaMoeda = fragmentosRecebidosNoResultado === 1
            ? localizar("Fragmento de Pixel")
            : localizar("Fragmentos de Pixel");
        descricaoResultado.textContent += localizar(
            " Você recebeu {quantidade} {moeda} pelas waves alcançadas.",
            {
                quantidade: fragmentosRecebidosNoResultado,
                moeda: nomeDaMoeda
            }
        );
    }
    botaoRepetirResultado.textContent = vitoria
        ? localizar("Repetir fase")
        : localizar("Recomeçar fase");
    botaoVoltarLobbyResultado.hidden = faseSecreta && !vitoria;
    botaoProximaFaseResultado.hidden = !vitoria || faseSecreta;
    botaoProximaFaseResultado.disabled = !existeProximaFase;
    botaoProximaFaseResultado.setAttribute("aria-disabled", (!existeProximaFase).toString());
    camadaResultado.hidden = false;
    botaoRepetirResultado.focus();
}

function ocultarPainelDeResultado() {
    camadaResultado.hidden = true;
    camadaResultado.removeAttribute("data-estado");
}

function repetirFaseDoResultado() {
    if (!partidaEncerrada) {
        return;
    }

    prepararNovaPartida();
    mostrarAviso(faseAtualEhSecreta()
        ? localizar("Dimensão Glitch reiniciada.")
        : localizar("Fase {fase} reiniciada.", { fase: faseSelecionada }));
}

function voltarAoLobbyDoResultado() {
    if (!partidaEncerrada || (faseAtualEhSecreta() && !partidaVencida)) {
        return;
    }

    voltarAoLobby(true);
}

function iniciarProximaFaseDoResultado() {
    const proximaFase = faseSelecionada + 1;

    if (
        !partidaEncerrada
        || !partidaVencida
        || proximaFase > CONFIG.fases.length
        || !faseEstaDesbloqueada(proximaFase)
    ) {
        return;
    }

    faseSelecionada = proximaFase;
    capituloSelecionado = obterCapituloDaFase(proximaFase)?.numero || capituloSelecionado;
    modoWavesInfinitas = false;
    atualizarIndicadorFaseSelecionada();
    atualizarTemaDoLobby();
    selecionarTrilhaDaPartida();
    prepararNovaPartida();
    mostrarAviso(localizar("Fase {fase} iniciada.", { fase: faseSelecionada }));
}

function voltarAoLobby(comVinheta = false) {
    const partidaEraSecreta = faseAtualEhSecreta();
    const exibirSeletorDeFases = partidaVencida && !partidaEraSecreta;
    const exibirMaquinaDoTempoRecemConcedida = maquinaDoTempoAcabouDeSerConcedida;
    maquinaDoTempoAcabouDeSerConcedida = false;
    const capituloDaPartida = obterCapituloDaFase(faseSelecionada);
    const capituloFoiConcluido = Boolean(
        capituloDaPartida
        && faseSelecionada === capituloDaPartida.faseFinal
    );

    jogoIniciado = false;
    jogoPausado = false;
    pausaIniciadaEm = 0;
    pausaAutomaticaPorOcultacao = false;
    paginaOcultadaEm = 0;
    reiniciarRelogioDaSimulacao();
    partidaEncerrada = false;
    partidaVencida = false;
    modoWavesInfinitas = false;
    torreSelecionada = null;
    conversaDoSenhorDoTempoAtiva = false;
    tipoDaConversaDoSenhorDoTempo = "entrada";
    camadaConversaPortal.classList.remove("camada-conversa-senhor-tempo");
    camadaConversaPortal.removeAttribute("data-tipo-conversa");
    camadaConversaPortal.hidden = true;
    camadaConversaPortal.innerHTML = "";
    ocultarCutsceneDaCarta();
    ocultarCutsceneDoCapitulo2();
    ocultarTransicaoDoPortalGlitch();
    if (partidaEraSecreta) {
        faseSelecionada = 1;
    }
    ocultarMinigameFliperama();
    ocultarPainelBonusPosBoss();
    ocultarPainelDeResultado();
    fecharConfiguracoes();
    fecharMenuDaPartida();
    menuPartida.classList.add("oculto");
    controles.classList.add("oculto");
    seletorTorres.classList.add("oculto");
    if (comVinheta) {
        menuPrincipal.classList.remove("entrada-vinheta-lobby");
        void menuPrincipal.offsetWidth;
        menuPrincipal.classList.remove("oculto");
        menuPrincipal.classList.add("entrada-vinheta-lobby");
    } else {
        menuPrincipal.classList.remove("oculto");
    }
    selecionarTrilhaDoLobby();
    atualizarIndicadorFaseSelecionada();
    atualizarTemaDoLobby();
    atualizarDisponibilidadeDaDesistencia();
    atualizarPulsoTemporalNoPosto();

    if (exibirSeletorDeFases) {
        if (capituloFoiConcluido || exibirMaquinaDoTempoRecemConcedida) {
            mostrarCapitulos();
        } else {
            mostrarFases(capituloDaPartida?.numero || capituloSelecionado);
        }
    } else {
        fecharConteudoMenu();
    }

    atualizarBotoesDaTorre();
}

function abrirConfirmacaoDeDesistencia() {
    if (!jogoIniciado || partidaEncerrada) {
        return;
    }

    if (faseAtualEhSecreta()) {
        mostrarAviso(localizar("O Senhor do Tempo só abrirá a saída depois da vitória."));
        return;
    }

    const recompensa = calcularFragmentosPelasWavesAlcancadas();
    const textoWave = wave === 1 ? localizar("wave") : localizar("waves");
    const textoFragmento = recompensa === 1
        ? localizar("Fragmento de Pixel")
        : localizar("Fragmentos de Pixel");

    descricaoConfirmacaoDesistencia.textContent = localizar(
        "As {wave} {textoWave} que você alcançou vão te dar {recompensa} {fragmentos} no total.",
        { wave, textoWave, recompensa, fragmentos: textoFragmento }
    );
    camadaConfirmacaoDesistencia.hidden = false;
    definirJogoPausado(true);
    botaoCancelarDesistencia.focus();
}

function ocultarConfirmacaoDeDesistencia() {
    camadaConfirmacaoDesistencia.hidden = true;
}

function cancelarDesistencia() {
    ocultarConfirmacaoDeDesistencia();

    if (jogoIniciado && !partidaEncerrada) {
        definirJogoPausado(true);
        botaoDesistirMenu.focus();
    }
}

function confirmarDesistencia() {
    if (
        camadaConfirmacaoDesistencia.hidden
        || !jogoIniciado
        || partidaEncerrada
    ) {
        return;
    }

    fragmentosRecebidosNoResultado = concederFragmentosPelasWavesAlcancadas();
    inimigos = [];
    torres = [];
    tiros = [];
    tirosDosInimigos = [];
    partidaVencida = false;
    ocultarConfirmacaoDeDesistencia();
    voltarAoLobby(true);
}

function reiniciarFasePeloMenu() {
    fecharMenuDaPartida();
    prepararNovaPartida();
    mostrarAviso(faseAtualEhSecreta()
        ? localizar("Dimensão Glitch reiniciada.")
        : localizar("Fase {fase} reiniciada.", { fase: faseSelecionada }));
}

function atualizarDisponibilidadeDaDesistencia() {
    const saidaBloqueada = jogoIniciado && faseAtualEhSecreta();
    const rotulo = botaoDesistirMenu.querySelector("span");

    botaoDesistirMenu.disabled = saidaBloqueada;
    botaoDesistirMenu.setAttribute("aria-disabled", saidaBloqueada.toString());
    botaoDesistirMenu.title = saidaBloqueada
        ? localizar("O Senhor do Tempo só abrirá a saída depois da vitória.")
        : "";

    if (rotulo) {
        rotulo.textContent = saidaBloqueada
            ? localizar("Saída bloqueada")
            : localizar("Desistir");
    }
}

function obterMissaoSemanal(idDaMissao) {
    return CONFIG.missoes.semanais.find(missao => missao.id === idDaMissao) || null;
}

function obterProgressoAtualDaMissao(missao) {
    const progresso = progressoMissoesSemanais[missao.propriedadeDoProgresso] || 0;
    return Math.min(progresso, missao.objetivo);
}

function missaoSemanalEstaConcluida(missao) {
    return obterProgressoAtualDaMissao(missao) >= missao.objetivo;
}

function recompensaDaMissaoFoiResgatada(idDaMissao) {
    return progressoMissoesSemanais.recompensasResgatadas.includes(idDaMissao);
}

function recompensaPermanenteJaFoiDesbloqueada(recompensa) {
    if (recompensa.tipo === "skin") {
        return recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes(recompensa.id);
    }

    if (recompensa.tipo === "conquista") {
        return recompensasPermanentesDasMissoes.conquistasDesbloqueadas.includes(recompensa.id);
    }

    return false;
}

function obterRecompensaEfetivaDaMissao(missao) {
    const recompensa = missao.recompensa;

    if (
        recompensa.tipo !== "fragmentos"
        && recompensaPermanenteJaFoiDesbloqueada(recompensa)
    ) {
        return {
            tipo: "fragmentos",
            quantidade: recompensa.fragmentosAlternativos,
            rotulo: `${recompensa.fragmentosAlternativos} Fragmentos de Pixel`
        };
    }

    return recompensa;
}

function obterIconeDaRecompensa(recompensa) {
    if (recompensa.tipo === "fragmentos") {
        return "◆";
    }

    if (recompensa.tipo === "skin") {
        return "✦";
    }

    return "🏆";
}

function localizarRotuloDaRecompensa(rotulo) {
    const correspondencia = /^(\d+) Fragmentos de Pixel$/.exec(rotulo);

    if (correspondencia) {
        return localizar("{quantidade} Fragmentos de Pixel", {
            quantidade: correspondencia[1]
        });
    }

    return localizar(rotulo);
}

function exibirProximaNotificacaoDeProgresso() {
    if (
        notificacaoDeProgressoAtiva
        || filaDeNotificacoesDeProgresso.length === 0
        || !regiaoNotificacoesProgresso
    ) {
        return;
    }

    const notificacao = filaDeNotificacoesDeProgresso.shift();
    const cartao = document.createElement("article");
    const icone = document.createElement("span");
    const conteudo = document.createElement("div");
    const titulo = document.createElement("small");
    const nome = document.createElement("strong");
    const descricao = document.createElement("p");
    cartao.className = "notificacao-progresso";
    cartao.dataset.tipo = notificacao.tipo;
    cartao.setAttribute("role", "status");
    icone.className = "notificacao-progresso-icone";
    icone.setAttribute("aria-hidden", "true");
    icone.textContent = notificacao.icone;
    titulo.textContent = notificacao.titulo;
    nome.textContent = notificacao.nome;
    descricao.textContent = notificacao.descricao;
    conteudo.append(titulo, nome, descricao);
    cartao.append(icone, conteudo);
    regiaoNotificacoesProgresso.appendChild(cartao);
    notificacaoDeProgressoAtiva = cartao;

    requestAnimationFrame(() => cartao.classList.add("notificacao-progresso-visivel"));
    setTimeout(() => {
        cartao.classList.add("notificacao-progresso-saindo");
        setTimeout(() => {
            cartao.remove();
            notificacaoDeProgressoAtiva = null;
            exibirProximaNotificacaoDeProgresso();
        }, CONFIG.interface.duracaoSaidaDaNotificacaoMs);
    }, CONFIG.interface.duracaoNotificacaoDeProgressoMs);
}

function enfileirarNotificacaoDeProgresso(tipo, titulo, nome, descricao, icone) {
    filaDeNotificacoesDeProgresso.push({ tipo, titulo, nome, descricao, icone });
    exibirProximaNotificacaoDeProgresso();
}

function registrarProgressoDaMissao(propriedade, valor, usarMaiorValor = false) {
    garantirMissoesDaSemanaAtual();
    const valorAtual = progressoMissoesSemanais[propriedade] || 0;
    const missaoDaPropriedade = CONFIG.missoes.semanais.find(missao => (
        missao.propriedadeDoProgresso === propriedade
    ));
    const valorCalculado = usarMaiorValor
        ? Math.max(valorAtual, valor)
        : valorAtual + valor;
    const novoValor = !usarMaiorValor && missaoDaPropriedade
        ? Math.min(valorCalculado, missaoDaPropriedade.objetivo)
        : valorCalculado;

    if (!Number.isInteger(novoValor) || novoValor < 0 || novoValor === valorAtual) {
        return;
    }

    progressoMissoesSemanais[propriedade] = novoValor;
    salvarProgressoMissoesSemanais();
    atualizarResumoDasMissoesNoMenu();

    if (
        missaoDaPropriedade
        && valorAtual < missaoDaPropriedade.objetivo
        && novoValor >= missaoDaPropriedade.objetivo
    ) {
        enfileirarNotificacaoDeProgresso(
            "missao",
            traduzir("notificacoes.missaoConcluida"),
            obterNomeLocalizado(missaoDaPropriedade),
            traduzir("notificacoes.resgatarMissao"),
            missaoDaPropriedade.icone
        );
    }
}

function registrarInimigoEliminadoParaMissoes() {
    registrarProgressoDaMissao("inimigosEliminados", 1);
}

function registrarFaseConcluidaParaMissoes() {
    if (!modoWavesInfinitas) {
        registrarProgressoDaMissao("fasesConcluidas", 1);
    }
}

function registrarWaveInfinitaParaMissoes(numeroDaWave) {
    if (modoWavesInfinitas) {
        registrarProgressoDaMissao("maiorWaveInfinita", numeroDaWave, true);
    }
}

function contarRecompensasProntasDasMissoes() {
    garantirMissoesDaSemanaAtual();
    return CONFIG.missoes.semanais.filter(missao => (
        missaoSemanalEstaConcluida(missao)
        && !recompensaDaMissaoFoiResgatada(missao.id)
    )).length;
}

function atualizarResumoDasMissoesNoMenu() {
    if (!resumoMissoesMenu) {
        return;
    }

    const quantidade = contarRecompensasProntasDasMissoes();
    const chave = quantidade === 1
        ? "lobby.premioPronto"
        : "lobby.premiosProntos";
    resumoMissoesMenu.textContent = traduzir(chave, { quantidade });
}

function formatarProximaRenovacaoDasMissoes() {
    return obterDataDaProximaRenovacaoSemanal().toLocaleDateString(idiomaAtual, {
        weekday: "long",
        day: "2-digit",
        month: "2-digit"
    });
}

function criarCartaoDaMissaoSemanal(missao) {
    const progresso = obterProgressoAtualDaMissao(missao);
    const concluida = missaoSemanalEstaConcluida(missao);
    const resgatada = recompensaDaMissaoFoiResgatada(missao.id);
    const percentual = Math.min(100, Math.round((progresso / missao.objetivo) * 100));
    const recompensaEfetiva = obterRecompensaEfetivaDaMissao(missao);
    const nomeDaMissao = obterNomeLocalizado(missao);
    const descricaoDaMissao = localizar(missao.descricao);
    const rotuloDaRecompensaOriginal = resgatada
        ? progressoMissoesSemanais.recompensasConcedidas[missao.id]
            || missao.recompensa.rotulo
        : recompensaEfetiva.rotulo;
    const rotuloDaRecompensa = localizarRotuloDaRecompensa(rotuloDaRecompensaOriginal);
    const iconeDaRecompensa = resgatada
        ? "✓"
        : obterIconeDaRecompensa(recompensaEfetiva);
    const textoDoBotao = resgatada
        ? localizar("Resgatada")
        : concluida
            ? localizar("Resgatar prêmio")
            : `${progresso}/${missao.objetivo}`;

    return `
        <article class="missao-cartao ${concluida ? "missao-concluida" : ""} ${resgatada ? "missao-resgatada" : ""}">
            <span class="missao-icone" aria-hidden="true">${missao.icone}</span>
            <div class="missao-dados">
                <header class="missao-topo">
                    <div>
                        <small>${localizar("MISSÃO SEMANAL")}</small>
                        <h3>${nomeDaMissao}</h3>
                    </div>
                    <span class="missao-recompensa">
                        <i aria-hidden="true">${iconeDaRecompensa}</i>
                        ${rotuloDaRecompensa}
                    </span>
                </header>
                <p>${descricaoDaMissao}</p>
                <div
                    class="missao-progresso"
                    role="progressbar"
                    aria-label="${localizar("Progresso de {nome}", { nome: nomeDaMissao })}"
                    aria-valuemin="0"
                    aria-valuemax="${missao.objetivo}"
                    aria-valuenow="${progresso}"
                >
                    <span style="width: ${percentual}%"></span>
                </div>
                <div class="missao-rodape">
                    <strong>${progresso} / ${missao.objetivo}</strong>
                    <button
                        class="botao botao-resgatar-missao"
                        onclick="resgatarMissaoSemanal('${missao.id}')"
                        ${!concluida || resgatada ? "disabled" : ""}
                    >${textoDoBotao}</button>
                </div>
            </div>
        </article>
    `;
}

function criarColecaoDasMissoes() {
    const idDaSkin = "sentinelaDourada";
    const skin = CONFIG.missoes.skins[idDaSkin];
    const skinDesbloqueada = recompensasPermanentesDasMissoes.skinsDesbloqueadas
        .includes(idDaSkin);
    const skinEquipada = recompensasPermanentesDasMissoes.skinTorrePadraoEquipada
        === idDaSkin;

    return `
        <section class="colecao-missoes" aria-label="${localizar("Recompensas permanentes das missões")}">
            <header>
                <small>${localizar("COLEÇÃO PERMANENTE")}</small>
                <h3>${localizar("Prêmios especiais")}</h3>
            </header>
            <div class="colecao-missoes-grade">
                <article class="premio-colecao ${skinDesbloqueada ? "premio-desbloqueado" : "premio-bloqueado"}">
                    <span class="preview-skin-sentinela" aria-hidden="true"><i></i></span>
                    <div>
                        <small>${localizar("SKIN DE TORRE")}</small>
                        <strong>${obterNomeLocalizado(skin)}</strong>
                        <p>${localizar(skin.descricao)}</p>
                    </div>
                    <button
                        class="botao botao-equipar-skin"
                        onclick="alternarSkinDeMissao('${idDaSkin}')"
                        ${skinDesbloqueada ? "" : "disabled"}
                    >${skinDesbloqueada
                        ? skinEquipada
                            ? localizar("Usar visual original")
                            : localizar("Equipar skin")
                        : localizar("Bloqueada")}</button>
                </article>
            </div>
        </section>
    `;
}

function mostrarMissoes() {
    definirTelaDoMenuAberta("missoes");
    tentarIniciarMusicaDoLobby();
    garantirMissoesDaSemanaAtual();
    atualizarResumoDasMissoesNoMenu();
    const [ano, numeroDaSemana] = progressoMissoesSemanais.semana.split("-S");
    const cartoes = CONFIG.missoes.semanais
        .map(criarCartaoDaMissaoSemanal)
        .join("");

    conteudoMenu.innerHTML = `
        ${criarCabecalhoConteudoMenu(
            localizar("Missões"),
            localizar("Complete objetivos, resgate prêmios e monte sua coleção.")
        )}
        <section class="missoes-semana-cabecalho">
            <div>
                <small>${localizar("SEMANA ATUAL")}</small>
                <strong>${localizar("Semana {semana} de {ano}", {
                    semana: numeroDaSemana,
                    ano
                })}</strong>
            </div>
            <p>${localizar("Renova {data} à 0h", {
                data: formatarProximaRenovacaoDasMissoes()
            })}</p>
        </section>
        <section class="missoes-grade" aria-label="${localizar("Missões semanais")}">
            ${cartoes}
        </section>
        ${criarColecaoDasMissoes()}
    `;
}

function resgatarMissaoSemanal(idDaMissao) {
    garantirMissoesDaSemanaAtual();
    const missao = obterMissaoSemanal(idDaMissao);

    if (
        !missao
        || !missaoSemanalEstaConcluida(missao)
        || recompensaDaMissaoFoiResgatada(idDaMissao)
    ) {
        return;
    }

    const recompensa = obterRecompensaEfetivaDaMissao(missao);

    if (recompensa.tipo === "fragmentos") {
        fragmentosPixel += recompensa.quantidade;
        salvarFragmentosPixel();
        atualizarSaldoDeFragmentos();
    } else if (recompensa.tipo === "skin") {
        recompensasPermanentesDasMissoes.skinsDesbloqueadas.push(recompensa.id);
        recompensasPermanentesDasMissoes.skinTorrePadraoEquipada = recompensa.id;

        if (pacoteApoiador.skinEquipada) {
            pacoteApoiador.skinEquipada = false;
            salvarPacoteApoiador();
        }

        salvarRecompensasPermanentesDasMissoes();
    } else if (recompensa.tipo === "conquista") {
        desbloquearConquista(recompensa.id);
    }

    progressoMissoesSemanais.recompensasResgatadas.push(idDaMissao);
    progressoMissoesSemanais.recompensasConcedidas[idDaMissao] = recompensa.rotulo;
    salvarProgressoMissoesSemanais();
    atualizarResumoDasMissoesNoMenu();
    mostrarMissoes();
}

function alternarSkinDeMissao(idDaSkin) {
    if (!recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes(idDaSkin)) {
        return;
    }

    const vaiEquipar = recompensasPermanentesDasMissoes.skinTorrePadraoEquipada !== idDaSkin;
    recompensasPermanentesDasMissoes.skinTorrePadraoEquipada = vaiEquipar ? idDaSkin : null;

    if (vaiEquipar && pacoteApoiador.skinEquipada) {
        pacoteApoiador.skinEquipada = false;
        salvarPacoteApoiador();
    }

    salvarRecompensasPermanentesDasMissoes();
    mostrarMissoes();
}

function atualizarIdentidadeDoApoiador() {
    const adquirido = pacoteApoiador.adquirido;

    if (estadoPacoteApoiadorMenu) {
        estadoPacoteApoiadorMenu.textContent = adquirido
            ? traduzir("lobby.pacoteAtivo")
            : traduzir("lobby.cosmeticosExclusivos");
    }

    if (!lobbyJogador || !lobbyAvatar || !rotuloDefensorLobby || !estadoDefensorLobby) {
        return;
    }

    lobbyJogador.classList.toggle("lobby-jogador-apoiador", adquirido);
    lobbyAvatar.textContent = adquirido ? "♥" : "GP";
    rotuloDefensorLobby.textContent = adquirido
        ? traduzir("lobby.apoiador")
        : traduzir("lobby.defensor");
    estadoDefensorLobby.textContent = adquirido
        ? traduzir("lobby.coracaoDePixel")
        : traduzir("lobby.prontoParaJogar");
}

function ativarDemonstracaoDoPacoteApoiador() {
    if (!CONFIG.pacoteApoiador.modoDemonstracao || pacoteApoiador.adquirido) {
        return;
    }

    pacoteApoiador = {
        adquirido: true,
        skinEquipada: true
    };
    checkoutDoApoiadorFalhou = false;
    recompensasPermanentesDasMissoes.skinTorrePadraoEquipada = null;
    salvarPacoteApoiador();
    salvarRecompensasPermanentesDasMissoes();
    atualizarIdentidadeDoApoiador();
    mostrarPacoteApoiador();
}

function obterTokenCsrfDoCheckout() {
    return document.querySelector('meta[name="token-csrf-checkout"]')
        ?.getAttribute("content")
        ?.trim() || "";
}

function obterUrlDoEndpointSeguro(caminho) {
    if (!caminho) {
        throw new Error("Endpoint do checkout não configurado.");
    }

    const url = new URL(caminho, window.location.href);

    if (url.origin !== window.location.origin) {
        throw new Error("O endpoint do checkout deve usar a mesma origem do jogo.");
    }

    return url.toString();
}

function ambientePermiteCheckoutSeguro() {
    return window.isSecureContext
        || ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

function checkoutDoApoiadorEstaConfigurado() {
    if (CONFIG.pacoteApoiador.modoDemonstracao) {
        return true;
    }

    const checkout = CONFIG.pacoteApoiador.checkout;

    try {
        obterUrlDoEndpointSeguro(checkout.endpointCriacaoDaSessao);
        obterUrlDoEndpointSeguro(checkout.endpointConsultaDoDireito);
    } catch (erro) {
        return false;
    }

    return ambientePermiteCheckoutSeguro()
        && obterTokenCsrfDoCheckout().length >= 16
        && checkout.origensPermitidas.length > 0
        && checkout.origensPermitidas.every(origem => {
            try {
                return new URL(origem).protocol === "https:";
            } catch (erro) {
                return false;
            }
        });
}

function criarCabecalhosDoCheckout(incluirTokenCsrf = false) {
    const cabecalhos = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };

    if (incluirTokenCsrf) {
        cabecalhos["X-CSRF-Token"] = obterTokenCsrfDoCheckout();
    }

    return cabecalhos;
}

function validarUrlDoCheckoutRecebida(urlRecebida) {
    const url = new URL(urlRecebida);
    const origensPermitidas = CONFIG.pacoteApoiador.checkout.origensPermitidas;

    if (url.protocol !== "https:" || !origensPermitidas.includes(url.origin)) {
        throw new Error("O servidor retornou um checkout não permitido.");
    }

    return url.toString();
}

async function sincronizarPacoteApoiadorComServidor() {
    if (
        CONFIG.pacoteApoiador.modoDemonstracao
        || sincronizacaoDoApoiadorTentada
        || sincronizacaoDoApoiadorEmAndamento
    ) {
        return;
    }

    sincronizacaoDoApoiadorTentada = true;
    const caminho = CONFIG.pacoteApoiador.checkout.endpointConsultaDoDireito;

    if (!caminho || !ambientePermiteCheckoutSeguro()) {
        return;
    }

    sincronizacaoDoApoiadorEmAndamento = true;

    try {
        const resposta = await fetch(obterUrlDoEndpointSeguro(caminho), {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
            headers: { Accept: "application/json" }
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o pacote no servidor.");
        }

        const dados = await resposta.json();

        if (typeof dados?.adquirido !== "boolean") {
            throw new Error("Resposta inválida ao consultar o pacote.");
        }

        const preferenciaLocalDaSkin = carregarPreferenciaLocalDaSkinDoApoiador();
        pacoteApoiador = {
            adquirido: dados.adquirido,
            skinEquipada: dados.adquirido && (
                typeof dados.skinEquipada === "boolean"
                    ? dados.skinEquipada
                    : preferenciaLocalDaSkin
            )
        };
        checkoutDoApoiadorFalhou = false;
        salvarPacoteApoiador();
        atualizarIdentidadeDoApoiador();
    } catch (erro) {
        pacoteApoiador = { adquirido: false, skinEquipada: false };
        atualizarIdentidadeDoApoiador();
    } finally {
        sincronizacaoDoApoiadorEmAndamento = false;

        if (telaDoMenuAberta === "pacoteApoiador") {
            mostrarPacoteApoiador();
        }
    }
}

async function iniciarCompraDoPacoteApoiador() {
    if (pacoteApoiador.adquirido || checkoutDoApoiadorEmAndamento) {
        return;
    }

    if (CONFIG.pacoteApoiador.modoDemonstracao) {
        ativarDemonstracaoDoPacoteApoiador();
        return;
    }

    if (!checkoutDoApoiadorEstaConfigurado()) {
        checkoutDoApoiadorFalhou = true;
        mostrarPacoteApoiador();
        return;
    }

    checkoutDoApoiadorEmAndamento = true;
    checkoutDoApoiadorFalhou = false;
    mostrarPacoteApoiador();

    try {
        const checkout = CONFIG.pacoteApoiador.checkout;
        const resposta = await fetch(
            obterUrlDoEndpointSeguro(checkout.endpointCriacaoDaSessao),
            {
                method: "POST",
                credentials: "same-origin",
                cache: "no-store",
                headers: criarCabecalhosDoCheckout(true),
                body: JSON.stringify({ pacote: CONFIG.pacoteApoiador.id })
            }
        );

        if (!resposta.ok) {
            throw new Error("O servidor não criou a sessão de checkout.");
        }

        const dados = await resposta.json();
        const urlDoCheckout = validarUrlDoCheckoutRecebida(dados?.urlDoCheckout);
        window.location.assign(urlDoCheckout);
    } catch (erro) {
        checkoutDoApoiadorFalhou = true;
    } finally {
        checkoutDoApoiadorEmAndamento = false;

        if (telaDoMenuAberta === "pacoteApoiador") {
            mostrarPacoteApoiador();
        }
    }
}

function alternarSkinDoPacoteApoiador() {
    if (!pacoteApoiador.adquirido) {
        return;
    }

    pacoteApoiador.skinEquipada = !pacoteApoiador.skinEquipada;

    if (pacoteApoiador.skinEquipada) {
        recompensasPermanentesDasMissoes.skinTorrePadraoEquipada = null;
        salvarRecompensasPermanentesDasMissoes();
    }

    salvarPacoteApoiador();
    mostrarPacoteApoiador();
}

function criarItemDoPacoteApoiador(item) {
    return `
        <article class="pacote-apoiador-item">
            <span aria-hidden="true">${item.icone}</span>
            <div>
                <strong>${obterNomeLocalizado(item)}</strong>
                <p>${localizar(item.descricao)}</p>
            </div>
        </article>
    `;
}

function mostrarPacoteApoiador() {
    definirTelaDoMenuAberta("pacoteApoiador");
    tentarIniciarMusicaDoLobby();
    atualizarIdentidadeDoApoiador();
    sincronizarPacoteApoiadorComServidor();
    const configuracao = CONFIG.pacoteApoiador;
    const adquirido = pacoteApoiador.adquirido;
    const podeIniciarCheckout = configuracao.modoDemonstracao
        || checkoutDoApoiadorEstaConfigurado();
    const textoDoBotaoPrincipal = adquirido
        ? localizar("Pacote ativo")
        : checkoutDoApoiadorEmAndamento
            ? traduzir("apoiador.iniciandoCheckout")
        : configuracao.modoDemonstracao
            ? localizar("Ativar demonstração")
            : podeIniciarCheckout
                ? localizar("Ir para o checkout")
                : localizar("Checkout em preparação");
    const itens = configuracao.itens.map(criarItemDoPacoteApoiador).join("");

    conteudoMenu.innerHTML = `
        ${criarCabecalhoConteudoMenu(
            localizar("Pacote Apoiador"),
            localizar("Ajude o projeto e receba cosméticos exclusivos, sem vantagem nas partidas.")
        )}
        <section class="pacote-apoiador-hero ${adquirido ? "pacote-apoiador-ativo" : ""}">
            <div class="pacote-apoiador-preview" aria-hidden="true">
                <span class="preview-skin-apoiador"><i></i></span>
                <span class="pacote-apoiador-coracao">♥</span>
            </div>
            <div class="pacote-apoiador-apresentacao">
                <small>${adquirido
                    ? localizar("PACOTE ATIVO")
                    : localizar("COMPRA ÚNICA · SOMENTE COSMÉTICOS")}</small>
                <h3>${obterNomeLocalizado(configuracao)}</h3>
                <p>${localizar("Um jeito de apoiar o desenvolvimento e mostrar que você fez parte da história do jogo.")}</p>
                <strong>${localizar("Não aumenta dano, créditos, Fragmentos ou limite de torres.")}</strong>
            </div>
        </section>
        <section class="pacote-apoiador-itens" aria-label="${localizar("Conteúdo do Pacote Apoiador")}">
            ${itens}
        </section>
        <section class="pacote-apoiador-compra">
            <div>
                <small>${configuracao.modoDemonstracao
                    ? localizar("DEMONSTRAÇÃO LOCAL")
                    : localizar("COMPRA SEGURA")}</small>
                <strong>${adquirido
                    ? localizar("Obrigado por apoiar Guardians of Pixel!")
                    : configuracao.modoDemonstracao
                        ? localizar("Liberação permanente neste navegador")
                        : traduzir("apoiador.liberacaoConta")}</strong>
                <p>${configuracao.modoDemonstracao
                    ? localizar("Nenhuma cobrança será feita. O checkout real será conectado antes do lançamento.")
                    : traduzir("apoiador.confirmacaoServidor")}</p>
                ${checkoutDoApoiadorFalhou ? `
                    <p class="pacote-apoiador-erro" role="alert">${traduzir("apoiador.erroCheckout")}</p>
                ` : ""}
            </div>
            <div class="pacote-apoiador-acoes">
                <button
                    class="botao botao-ativar-apoiador"
                    onclick="iniciarCompraDoPacoteApoiador()"
                    ${adquirido || !podeIniciarCheckout || checkoutDoApoiadorEmAndamento ? "disabled" : ""}
                >${textoDoBotaoPrincipal}</button>
                ${adquirido ? `
                    <button class="botao botao-equipar-apoiador" onclick="alternarSkinDoPacoteApoiador()">
                        ${pacoteApoiador.skinEquipada
                            ? localizar("Usar visual original")
                            : localizar("Equipar Aurora Pixel")}
                    </button>
                ` : ""}
            </div>
        </section>
    `;
}

function conquistaEstaDesbloqueada(idDaConquista) {
    return recompensasPermanentesDasMissoes.conquistasDesbloqueadas
        .includes(idDaConquista);
}

function obterEstadoDaConquista(idDaConquista, conquista) {
    let progresso = 0;
    let objetivo = conquista.objetivo || 1;

    if (conquista.tipoDeCriterio === "estatistica") {
        progresso = estatisticasDasConquistas[conquista.propriedade] || 0;

        if (conquista.propriedade === "fasesConcluidas" && maiorFaseConcluida > 0) {
            progresso = Math.max(progresso, 1);
        }
    } else if (conquista.tipoDeCriterio === "campanha") {
        progresso = maiorFaseConcluida;
    } else if (conquista.tipoDeCriterio === "loja") {
        const itensAtuaisDaLoja = obterItensDaLoja();
        progresso = itensAtuaisDaLoja.filter(([idDoItem]) => comprasDaLoja.has(idDoItem)).length;
        objetivo = itensAtuaisDaLoja.length;
    } else if (conquista.tipoDeCriterio === "especial") {
        progresso = conquistaEstaDesbloqueada(idDaConquista) ? 1 : 0;
    }

    return {
        progresso,
        progressoExibido: Math.min(progresso, objetivo),
        objetivo,
        concluida: objetivo > 0 && progresso >= objetivo
    };
}

function desbloquearConquista(idDaConquista) {
    const conquista = CONFIG.conquistas[idDaConquista];

    if (!conquista || conquistaEstaDesbloqueada(idDaConquista)) {
        return false;
    }

    recompensasPermanentesDasMissoes.conquistasDesbloqueadas.push(idDaConquista);
    salvarRecompensasPermanentesDasMissoes();
    atualizarResumoDasConquistasNoMenu();
    enfileirarNotificacaoDeProgresso(
        "conquista",
        traduzir("notificacoes.conquistaDesbloqueada"),
        obterNomeLocalizado(conquista),
        localizar(conquista.descricao),
        conquista.icone
    );
    return true;
}

function verificarConquistasAutomaticas() {
    for (const [idDaConquista, conquista] of Object.entries(CONFIG.conquistas)) {
        if (
            conquista.tipoDeCriterio !== "especial"
            && obterEstadoDaConquista(idDaConquista, conquista).concluida
        ) {
            desbloquearConquista(idDaConquista);
        }
    }
}

function registrarEstatisticaDeConquista(propriedade, valor, usarMaiorValor = false) {
    const valorAtual = estatisticasDasConquistas[propriedade] || 0;
    const novoValor = usarMaiorValor
        ? Math.max(valorAtual, valor)
        : valorAtual + valor;

    if (!Number.isInteger(novoValor) || novoValor < 0 || novoValor === valorAtual) {
        return;
    }

    estatisticasDasConquistas[propriedade] = novoValor;
    salvarEstatisticasDasConquistas();
    verificarConquistasAutomaticas();
}

function registrarInimigoEliminadoParaConquistas() {
    registrarEstatisticaDeConquista("inimigosEliminados", 1);
}

function registrarFaseConcluidaParaConquistas() {
    if (!modoWavesInfinitas) {
        registrarEstatisticaDeConquista("fasesConcluidas", 1);
    }
}

function registrarWaveInfinitaParaConquistas(numeroDaWave) {
    if (modoWavesInfinitas) {
        registrarEstatisticaDeConquista("maiorWaveInfinita", numeroDaWave, true);
    }
}

function atualizarResumoDasConquistasNoMenu() {
    if (!resumoConquistasMenu) {
        return;
    }

    const total = Object.keys(CONFIG.conquistas).length;
    const desbloqueadas = Object.keys(CONFIG.conquistas)
        .filter(conquistaEstaDesbloqueada)
        .length;
    resumoConquistasMenu.textContent = traduzir("lobby.conquistasDesbloqueadas", {
        desbloqueadas,
        total
    });
}

function criarCartaoDeConquista([idDaConquista, conquista]) {
    const desbloqueada = conquistaEstaDesbloqueada(idDaConquista);
    const estado = obterEstadoDaConquista(idDaConquista, conquista);
    const percentual = Math.min(
        100,
        Math.round((estado.progressoExibido / estado.objetivo) * 100)
    );
    const rotuloDoTipo = conquista.tipoDeCriterio === "especial"
        ? localizar("CONQUISTA ESPECIAL")
        : localizar("MARCO PERMANENTE");
    const nomeDaConquista = obterNomeLocalizado(conquista);

    return `
        <article class="conquista-cartao ${desbloqueada ? "conquista-desbloqueada" : "conquista-bloqueada"}">
            <header class="conquista-cartao-topo">
                <span class="conquista-icone" aria-hidden="true">${conquista.icone}</span>
                <span class="conquista-estado">${desbloqueada
                    ? localizar("Desbloqueada")
                    : localizar("Bloqueada")}</span>
            </header>
            <small>${rotuloDoTipo}</small>
            <h3>${nomeDaConquista}</h3>
            <p>${localizar(conquista.descricao)}</p>
            <div
                class="conquista-progresso"
                role="progressbar"
                aria-label="${localizar("Progresso de {nome}", { nome: nomeDaConquista })}"
                aria-valuemin="0"
                aria-valuemax="${estado.objetivo}"
                aria-valuenow="${estado.progressoExibido}"
            >
                <span style="width: ${percentual}%"></span>
            </div>
            <strong class="conquista-contador">${estado.progressoExibido} / ${estado.objetivo}</strong>
        </article>
    `;
}

function mostrarConquistas() {
    definirTelaDoMenuAberta("conquistas");
    tentarIniciarMusicaDoLobby();
    verificarConquistasAutomaticas();
    atualizarResumoDasConquistasNoMenu();
    const total = Object.keys(CONFIG.conquistas).length;
    const desbloqueadas = Object.keys(CONFIG.conquistas)
        .filter(conquistaEstaDesbloqueada)
        .length;
    const cartoes = Object.entries(CONFIG.conquistas)
        .map(criarCartaoDeConquista)
        .join("");

    conteudoMenu.innerHTML = `
        ${criarCabecalhoConteudoMenu(
            localizar("Conquistas"),
            localizar("Complete desafios permanentes e revele todas as medalhas.")
        )}
        <section class="conquistas-resumo">
            <span aria-hidden="true">🏆</span>
            <div>
                <small>${localizar("COLEÇÃO DE CONQUISTAS")}</small>
                <strong>${localizar("{desbloqueadas} de {total} desbloqueadas", {
                    desbloqueadas,
                    total
                })}</strong>
            </div>
        </section>
        <section class="conquistas-grade" aria-label="${localizar("Todas as conquistas")}">
            ${cartoes}
        </section>
    `;
}

function obterEpocaPlanejadaDaFase(numeroDaFase) {
    return CONFIG.maquinaDoTempo.epocas.find(epoca => (
        CONFIG.maquinaDoTempo.fasesPlanejadasPorEpoca[epoca.id]
            .includes(numeroDaFase)
    )) || null;
}

function criarBotaoDaMaquinaDoTempoNoCapitulo() {
    return `
        <button
            class="botao-maquina-tempo-capitulo"
            type="button"
            onclick="abrirMaquinaDoTempo()"
            aria-label="${localizar("Máquina do Tempo")}"
        >
            <span class="maquina-tempo-miniatura" aria-hidden="true">
                <i></i>
                <b></b>
            </span>
            <strong>${localizar("Máquina do Tempo")}</strong>
            <small>${localizar("NOVO")}</small>
        </button>
    `;
}

function abrirMaquinaDoTempo() {
    if (!maquinaDoTempoDesbloqueada || !capituloEstaDesbloqueado(2)) {
        return;
    }

    capituloSelecionado = 2;
    mostrarFases(2);
    conteudoMenu.querySelector(
        `[data-epoca-temporal="${epocaDaMaquinaDoTempoSelecionada}"]`
    )?.focus();
}

function viajarParaEpoca(idDaEpoca) {
    const epoca = obterEpocaDaMaquinaDoTempo(idDaEpoca);

    if (!maquinaDoTempoDesbloqueada || !epoca) {
        return;
    }

    epocaDaMaquinaDoTempoSelecionada = epoca.id;
    salvarEpocaDaMaquinaDoTempo();
    mostrarFases(2);
    conteudoMenu.querySelector(`[data-epoca-temporal="${epoca.id}"]`)?.focus();
}

function criarPainelDaMaquinaDoTempo() {
    const epocaAtual = obterEpocaDaMaquinaDoTempo(epocaDaMaquinaDoTempoSelecionada);
    const botoesDasEpocas = CONFIG.maquinaDoTempo.epocas.map((epoca) => {
        const selecionada = epoca.id === epocaAtual.id;
        return `
            <button
                class="botao-epoca-temporal botao-epoca-${epoca.id} ${selecionada ? "botao-epoca-selecionada" : ""}"
                type="button"
                data-epoca-temporal="${epoca.id}"
                onclick="viajarParaEpoca('${epoca.id}')"
                aria-pressed="${selecionada}"
                aria-label="${localizar("Viajar para {epoca}", {
                    epoca: localizar(epoca.nome)
                })}"
            >
                <small>${selecionada ? localizar("ÉPOCA ATUAL") : "···"}</small>
                <strong>${localizar(epoca.nome)}</strong>
                <span>${localizar(epoca.descricao)}</span>
            </button>
        `;
    }).join("");

    return `
        <section class="painel-maquina-tempo" data-epoca-atual="${epocaAtual.id}">
            <header class="maquina-tempo-cabecalho">
                <span class="maquina-tempo-relogio" aria-hidden="true">
                    <i></i>
                    <b></b>
                </span>
                <div>
                    <small>${localizar("Senhor do Tempo")}</small>
                    <h3>${localizar("Máquina do Tempo")}</h3>
                    <p>${localizar("Escolha uma época para procurar as fases do Capítulo 2.")}</p>
                </div>
            </header>
            <nav class="maquina-tempo-destinos" aria-label="${localizar("Máquina do Tempo")}">
                ${botoesDasEpocas}
            </nav>
        </section>
    `;
}

function mostrarCapitulos() {
    definirTelaDoMenuAberta("capitulos");
    tentarIniciarMusicaDoLobby();

    const capituloDaFaseAtual = obterCapituloDaFase(faseSelecionada);
    const cartoesDosCapitulos = CONFIG.capitulos.map((capitulo) => {
        const desbloqueado = capituloEstaDesbloqueado(capitulo.numero);
        const concluido = capituloEstaConcluido(capitulo.numero);
        const atual = capitulo.numero === capituloDaFaseAtual?.numero;
        const progresso = obterProgressoDoCapitulo(capitulo);
        const estado = concluido
            ? localizar("Concluída")
            : desbloqueado
                ? localizar("Disponível")
                : localizar("Bloqueada");
        const aguardaVitoriaNaFaseSecreta = capitulo.requerVitoriaNaFaseSecreta
            && capituloEstaConcluido(capitulo.numero - 1)
            && !capitulo2Desbloqueado;
        const descricao = desbloqueado
            ? localizar("{concluidas} de {total} fases concluídas", {
                concluidas: progresso.fasesConcluidas,
                total: progresso.totalDeFases
            })
            : aguardaVitoriaNaFaseSecreta
                ? localizar("Vença a Dimensão Glitch para desbloquear")
                : localizar("Conclua o Capítulo {capitulo} para desbloquear", {
                capitulo: capitulo.numero - 1
            });
        const classes = [
            "capitulo-cartao",
            `capitulo-tema-${capitulo.tema}`,
            atual ? "capitulo-cartao-atual" : "",
            capitulo.numero === 2 && maquinaDoTempoDesbloqueada
                ? "capitulo-cartao-com-maquina"
                : "",
            desbloqueado ? "" : "capitulo-cartao-bloqueado"
        ].filter(Boolean).join(" ");
        const botaoDaMaquinaDoTempo = capitulo.numero === 2
            && desbloqueado
            && maquinaDoTempoDesbloqueada
            ? criarBotaoDaMaquinaDoTempoNoCapitulo()
            : "";

        return `
            <article class="${classes}" data-numero-capitulo="${capitulo.numero}">
                <header class="capitulo-cartao-topo">
                    <span class="capitulo-numero" aria-hidden="true">${capitulo.numero.toString().padStart(2, "0")}</span>
                    <span class="fase-estado">${estado}</span>
                </header>
                ${botaoDaMaquinaDoTempo}
                <h3>${obterNomeLocalizado(capitulo)}</h3>
                <strong class="capitulo-intervalo">${localizar("Fases {inicio} a {fim}", {
                    inicio: capitulo.faseInicial,
                    fim: capitulo.faseFinal
                })}</strong>
                <p>${descricao}</p>
                <div class="capitulo-progresso" aria-hidden="true">
                    <span style="width: ${(progresso.fasesConcluidas / progresso.totalDeFases) * 100}%"></span>
                </div>
                <button class="botao botao-capitulo-acao" onclick="abrirCapitulo(${capitulo.numero})" ${desbloqueado ? "" : "disabled"}>${desbloqueado ? localizar("Ver fases") : localizar("Bloqueada")}</button>
            </article>
        `;
    }).join("");

    conteudoMenu.innerHTML = `
        ${criarCabecalhoConteudoMenu(
            localizar("Capítulos"),
            localizar("Escolha um capítulo para ver suas fases.")
        )}
        <section class="capitulos-grade" aria-label="${localizar("Seleção de capítulos")}">
            ${cartoesDosCapitulos}
        </section>
    `;
    conteudoMenu.scrollTop = 0;
}

function abrirCapitulo(numeroDoCapitulo) {
    if (!capituloEstaDesbloqueado(numeroDoCapitulo)) {
        return;
    }

    capituloSelecionado = numeroDoCapitulo;
    mostrarFases(numeroDoCapitulo);
}

function mostrarFases(numeroDoCapitulo = capituloSelecionado) {
    const capitulo = obterCapitulo(numeroDoCapitulo);

    if (!capitulo || !capituloEstaDesbloqueado(capitulo.numero)) {
        mostrarCapitulos();
        return;
    }

    capituloSelecionado = capitulo.numero;
    definirTelaDoMenuAberta("fases");
    tentarIniciarMusicaDoLobby();

    const usaMaquinaDoTempo = capitulo.numero === 2 && maquinaDoTempoDesbloqueada;
    const epocaAtual = usaMaquinaDoTempo
        ? obterEpocaDaMaquinaDoTempo(epocaDaMaquinaDoTempoSelecionada)
        : null;
    const fasesDoCapitulo = CONFIG.fases.filter(fase => (
        fase.numero >= capitulo.faseInicial
        && fase.numero <= capitulo.faseFinal
        && (!usaMaquinaDoTempo
            || obterEpocaPlanejadaDaFase(fase.numero)?.id === epocaAtual.id)
    ));
    const cartoesDasFases = fasesDoCapitulo.map((fase) => {
        const desbloqueada = faseEstaDesbloqueada(fase.numero);
        const concluida = fase.numero <= maiorFaseConcluida;
        const selecionada = fase.numero === faseSelecionada;
        const classes = [
            "fase-cartao",
            `fase-tema-${fase.tema}`,
            selecionada ? "fase-cartao-selecionado" : "",
            desbloqueada ? "" : "fase-cartao-bloqueado"
        ].filter(Boolean).join(" ");
        const estado = concluida
            ? localizar("Concluída")
            : desbloqueada
                ? localizar("Disponível")
                : localizar("Bloqueada");
        const descricao = desbloqueada
            ? localizar("{descricao} · {waves} waves · Boss a cada {intervalo} waves", {
                descricao: localizar(fase.descricao),
                waves: CONFIG.wave.ultimaWave,
                intervalo: CONFIG.wave.intervaloDeBoss
            })
            : localizar("{descricao} · Conclua a Fase {fase} para desbloquear", {
                descricao: localizar(fase.descricao),
                fase: fase.numero - 1
            });
        const textoBotao = selecionada
            ? localizar("Selecionada")
            : desbloqueada
                ? localizar("Selecionar")
                : localizar("Bloqueada");
        const desabilitado = selecionada || !desbloqueada ? "disabled" : "";

        return `
            <article class="${classes}">
                <header class="fase-cartao-topo">
                    <span class="fase-numero" aria-hidden="true">${fase.numero.toString().padStart(2, "0")}</span>
                    <span class="fase-estado">${estado}</span>
                </header>
                <h3>${obterNomeLocalizado(fase)}</h3>
                <p>${descricao}</p>
                <button class="botao botao-fase-acao" onclick="selecionarFase(${fase.numero})" ${desabilitado}>${textoBotao}</button>
            </article>
        `;
    }).join("");
    const conteudoDasFases = cartoesDasFases;
    const estadoVazioDaEpoca = usaMaquinaDoTempo && !conteudoDasFases
        ? `
            <aside class="fases-epoca-vazia" role="status">
                <span aria-hidden="true">⌛</span>
                <div>
                    <strong>${localizar("Nenhuma fase disponível nesta época.")}</strong>
                    <p>${localizar("Tente outra época ou volte mais tarde.")}</p>
                </div>
            </aside>
        `
        : "";
    const ultimaFaseImplementada = fasesDoCapitulo.reduce(
        (maiorNumero, fase) => Math.max(maiorNumero, fase.numero),
        capitulo.faseInicial - 1
    );
    const primeiraFaseFutura = ultimaFaseImplementada + 1;
    const avisoDeFasesFuturas = !usaMaquinaDoTempo
        && primeiraFaseFutura <= capitulo.faseFinal
        ? `
            <aside class="fases-em-desenvolvimento" role="status">
                <span aria-hidden="true">▫</span>
                <div>
                    <strong>${localizar("Em desenvolvimento")}</strong>
                    <p>${localizar("As Fases {inicio} a {fim} serão adicionadas em futuras atualizações.", {
                        inicio: primeiraFaseFutura,
                        fim: capitulo.faseFinal
                    })}</p>
                </div>
            </aside>
        `
        : "";
    const painelDaMaquinaDoTempo = usaMaquinaDoTempo
        ? criarPainelDaMaquinaDoTempo()
        : "";
    const tituloDaPagina = usaMaquinaDoTempo
        ? localizar("Capítulo 2 · {epoca}", { epoca: localizar(epocaAtual.nome) })
        : `${obterNomeLocalizado(capitulo)} · ${localizar("Fases")}`;

    conteudoMenu.innerHTML = `
        ${criarCabecalhoConteudoMenu(
            tituloDaPagina,
            localizar("Complete todas as fases deste capítulo para liberar o próximo.")
        )}
        <nav class="navegacao-capitulos" aria-label="${localizar("Capítulos")}">
            <button class="botao botao-voltar-capitulos" onclick="mostrarCapitulos()">← ${localizar("Voltar aos capítulos")}</button>
            <span>${localizar("Fases {inicio} a {fim}", {
                inicio: capitulo.faseInicial,
                fim: capitulo.faseFinal
            })}</span>
        </nav>
        ${painelDaMaquinaDoTempo}
        <section class="fases-grade" aria-label="${localizar("Seleção de fases")}">
            ${conteudoDasFases}
        </section>
        ${estadoVazioDaEpoca}
        ${avisoDeFasesFuturas}
    `;
    conteudoMenu.scrollTop = 0;
}

function selecionarFase(numeroDaFase) {
    const faseExiste = CONFIG.fases.some((fase) => fase.numero === numeroDaFase);

    if (!faseExiste || !faseEstaDesbloqueada(numeroDaFase)) {
        return;
    }

    faseSelecionada = numeroDaFase;
    capituloSelecionado = obterCapituloDaFase(numeroDaFase)?.numero || capituloSelecionado;
    atualizarIndicadorFaseSelecionada();
    atualizarTemaDoLobby();
    atualizarBotoesDeConstrucao();
    mostrarFases();
}

function mostrarLoja() {
    definirTelaDoMenuAberta("loja");
    tentarIniciarMusicaDoLobby();

    const categoriaAtual = obterCategoriaDaLoja();
    const itensDaLoja = obterItensDaLoja()
        .filter(([, configuracao]) =>
            (configuracao.categoriaLoja || "torres") === categoriaAtual.id
        )
        .map(([idDoItem, configuracao]) => {
            const comprada = comprasDaLoja.has(idDoItem);
            const saldoSuficiente = podeComprarItemDaLoja(idDoItem);
            const itemEhMelhoria = configuracao.tipoDeItem === "melhoria";
            const descricaoDoItem = itemEhMelhoria
                ? localizar(configuracao.descricao)
                : configuracao.efeitoDeQueimadura
                    ? localizar("Dispara bolas de fogo e incendeia o alvo: {dano} de dano por segundo durante {segundos} segundos. Novos acertos renovam a duração.", {
                        dano: configuracao.efeitoDeQueimadura.danoPorIntervalo,
                        segundos: obterDuracaoDaQueimaduraEmSegundos(configuracao.efeitoDeQueimadura)
                    })
                : configuracao.efeitoDeRaio
                    ? localizar("Dispara uma carga que salta entre até {quantidade} inimigos próximos e perde dano a cada salto.", {
                        quantidade: configuracao.efeitoDeRaio.quantidadeMaximaDeAlvos
                    })
                : configuracao.tipoDeItem === "mina"
                ? configuracao.efeitoGlacial
                    ? localizar("Explode por contato, causa {dano} de dano em {raio} px e desacelera inimigos em {percentual}%.", {
                        dano: configuracao.dano,
                        raio: configuracao.raioExplosao,
                        percentual: obterPercentualInteiro(configuracao.efeitoGlacial.percentualLentidao)
                    })
                    : localizar("Explode somente quando um inimigo encosta nela e causa {dano} de dano em uma área de {raio} px.", {
                        dano: configuracao.dano,
                        raio: configuracao.raioExplosao
                    })
                : configuracao.tipoDeItem === "bomba"
                    ? localizar("Clique na Bomba para acender o pavio. Após {segundos} segundo, ela causa {dano} de dano em uma área de {raio} px.", {
                        segundos: configuracao.tempoDoPavio / 1000,
                        dano: configuracao.dano,
                        raio: configuracao.raioExplosao
                    })
                : configuracao.percentualBonusCadencia
                    ? localizar("Aumenta em {percentual}% a velocidade de ataque das torres dentro de {alcance} px. O bônus não acumula.", {
                        percentual: obterPercentualInteiro(configuracao.percentualBonusCadencia),
                        alcance: configuracao.alcance
                    })
                : configuracao.creditosPorWave
                    ? localizar("Produz {creditos} créditos ao concluir uma wave inteira. Precisa sobreviver até o fim para pagar.", {
                        creditos: configuracao.creditosPorWave
                    })
                    : localizar("Atrai Sabotadores, Macacos e Corujas dentro do alcance deles. Aguenta {tiros} tiros e não atira.", {
                        tiros: configuracao.resistenciaATiros
                    });
            const detalheDoItem = itemEhMelhoria
                ? localizar(configuracao.detalhe)
                : configuracaoEhExplosivoConsumivel(configuracao)
                    ? localizar("Custa ${custo} na partida · máximo de {limite} no mapa · não ocupa vaga de torre", {
                        custo: configuracao.custo,
                        limite: configuracao.limitePorPartida
                    })
                    : localizar("Custa ${custo} na partida · máximo de {limite} por partida", {
                        custo: configuracao.custo,
                        limite: configuracao.limitePorPartida
                    });
            const textoDoBotao = comprada
                ? localizar("Comprada")
                : saldoSuficiente
                    ? localizar("Comprar por {preco}◆", { preco: configuracao.custoNaLoja })
                    : localizar("Faltam {preco}◆", {
                        preco: configuracao.custoNaLoja - fragmentosPixel
                    });
            const miniaturaDoItem = itemEhMelhoria
                ? `<span class="loja-item-miniatura loja-item-miniatura-melhoria ${configuracao.classeVisual}" aria-hidden="true">${configuracao.rotuloVisual}</span>`
                : `<canvas
                        class="miniatura-torre-album loja-item-miniatura"
                        width="84"
                        height="84"
                        data-tipo-torre="${idDoItem}"
                        data-nivel-torre="0"
                        aria-hidden="true"
                    ></canvas>`;

            return `
                <article class="loja-item ${comprada ? "loja-item-comprado" : ""}">
                    ${miniaturaDoItem}
                    <div class="loja-item-dados">
                        <div class="loja-item-topo">
                            <h3>${obterNomeLocalizado(configuracao)}</h3>
                            <span class="loja-preco">${configuracao.custoNaLoja}◆</span>
                        </div>
                        <p>${descricaoDoItem}</p>
                        <small>${detalheDoItem}</small>
                        <button
                            class="botao botao-comprar-loja"
                            type="button"
                            data-id-item-loja="${idDoItem}"
                            onclick="comprarItemDaLoja('${idDoItem}')"
                            ${comprada || !saldoSuficiente ? "disabled" : ""}
                        >${textoDoBotao}</button>
                    </div>
                </article>
            `;
        }).join("");
    const abasDaLoja = CONFIG.loja.categorias.map(categoria => {
        const ativa = categoria.id === categoriaAtual.id;
        const quantidadeDeItens = obterItensDaLoja()
            .filter(([, configuracao]) =>
                (configuracao.categoriaLoja || "torres") === categoria.id
            ).length;
        const resumo = quantidadeDeItens
            ? quantidadeDeItens === 1
                ? localizar("{quantidade} item", { quantidade: quantidadeDeItens })
                : localizar("{quantidade} itens", { quantidade: quantidadeDeItens })
            : localizar("Em breve");

        return `
            <button
                class="loja-aba ${ativa ? "loja-aba-ativa" : ""}"
                type="button"
                role="tab"
                aria-selected="${ativa}"
                onclick="selecionarCategoriaDaLoja('${categoria.id}')"
            >
                <span class="loja-aba-icone" aria-hidden="true">${criarIconeDaCategoria(categoria)}</span>
                <strong>${obterNomeLocalizado(categoria)}</strong>
                <small>${resumo}</small>
            </button>
        `;
    }).join("");
    const conteudoDaCategoria = itensDaLoja || `
        <div class="loja-vazia">
            <span class="loja-vazia-icone" aria-hidden="true">${criarIconeDaCategoria(categoriaAtual)}</span>
            <div>
                <small>${localizar("EM BREVE")}</small>
                <h3>${obterNomeLocalizado(categoriaAtual)}</h3>
                <p>${localizar(categoriaAtual.mensagemVazia)}</p>
            </div>
        </div>
    `;

    conteudoMenu.innerHTML = `
        ${criarCabecalhoConteudoMenu(
            localizar("Loja"),
            localizar("Use Fragmentos de Pixel para liberar itens permanentemente.")
        )}
        <div class="loja-saldo" aria-label="${localizar("Seu saldo")}">
            <span aria-hidden="true">◆</span>
            <div><small>${localizar("SEU SALDO")}</small><strong>${localizar("{quantidade} Fragmentos de Pixel", {
                quantidade: fragmentosPixel
            })}</strong></div>
        </div>
        <nav class="loja-abas" role="tablist" aria-label="${localizar("Categorias da Loja")}">
            ${abasDaLoja}
        </nav>
        <header class="loja-categoria-cabecalho">
            <div>
                <small>${localizar("SEÇÃO ATUAL")}</small>
                <h3>${obterNomeLocalizado(categoriaAtual)}</h3>
            </div>
            <p>${localizar(categoriaAtual.descricao)}</p>
        </header>
        <section class="loja-grade" role="tabpanel" aria-label="${obterNomeLocalizado(categoriaAtual)}">
            ${conteudoDaCategoria}
        </section>
    `;
    desenharMiniaturasDasTorresDoAlbum();
}

function criarIconeDaCategoria(categoria) {
    if (categoria.id === "torres") {
        return `
            <span class="icone-pixel-loja icone-pixel-torre">
                <i class="torre-pixel-base"></i>
                <i class="torre-pixel-corpo"></i>
                <i class="torre-pixel-topo"></i>
                <i class="torre-pixel-canhao"></i>
            </span>
        `;
    }

    if (categoria.id === "minas") {
        return `
            <span class="icone-pixel-loja icone-pixel-bomba">
                <i class="bomba-pixel-corpo"></i>
                <i class="bomba-pixel-brilho"></i>
                <i class="bomba-pixel-pavio"></i>
                <i class="bomba-pixel-faisca"></i>
            </span>
        `;
    }

    return `<span class="icone-categoria-texto">${categoria.icone}</span>`;
}

function obterCategoriaDaLoja(idDaCategoria = categoriaDaLojaSelecionada) {
    return CONFIG.loja.categorias.find(categoria => categoria.id === idDaCategoria)
        || CONFIG.loja.categorias[0];
}

function selecionarCategoriaDaLoja(idDaCategoria) {
    if (!CONFIG.loja.categorias.some(categoria => categoria.id === idDaCategoria)) {
        return;
    }

    categoriaDaLojaSelecionada = idDaCategoria;
    mostrarLoja();
}

function comprarItemDaLoja(idDoItem) {
    const configuracao = obterConfiguracaoDoItemDaLoja(idDoItem);

    if (!configuracao || comprasDaLoja.has(idDoItem)) {
        return;
    }

    if (!podeComprarItemDaLoja(idDoItem)) {
        atualizarSaldoDeFragmentos();
        mostrarLoja();
        return;
    }

    idDaCompraPendente = idDoItem;
    elementoDeOrigemDaCompra = document.activeElement;
    atualizarConfirmacaoDaCompraDaLoja();
    camadaConfirmacaoCompraLoja.hidden = false;
    botaoCancelarCompraLoja.focus();
}

function atualizarConfirmacaoDaCompraDaLoja() {
    const configuracao = obterConfiguracaoDoItemDaLoja(idDaCompraPendente);

    if (!configuracao) {
        return;
    }

    const saldoDepoisDaCompra = fragmentosPixel - configuracao.custoNaLoja;
    descricaoConfirmacaoCompraLoja.textContent = traduzir("loja.confirmacaoCompra", {
        item: obterNomeLocalizado(configuracao),
        preco: configuracao.custoNaLoja,
        saldo: Math.max(0, saldoDepoisDaCompra)
    });
    botaoConfirmarCompraLoja.disabled = !podeComprarItemDaLoja(idDaCompraPendente);
}

function fecharConfirmacaoDaCompraDaLoja(restaurarFoco = true) {
    camadaConfirmacaoCompraLoja.hidden = true;
    idDaCompraPendente = null;

    if (restaurarFoco && elementoDeOrigemDaCompra?.isConnected) {
        elementoDeOrigemDaCompra.focus();
    }

    elementoDeOrigemDaCompra = null;
}

function cancelarCompraDaLoja() {
    fecharConfirmacaoDaCompraDaLoja(true);
}

function fecharConfirmacaoDeCompraAoClicarFora(evento) {
    if (evento.target === camadaConfirmacaoCompraLoja) {
        cancelarCompraDaLoja();
    }
}

function confirmarCompraDaLoja() {
    const idDoItem = idDaCompraPendente;
    fecharConfirmacaoDaCompraDaLoja(false);
    concluirCompraDaLoja(idDoItem);
}

function concluirCompraDaLoja(idDoItem) {
    const configuracao = obterConfiguracaoDoItemDaLoja(idDoItem);

    if (!configuracao || comprasDaLoja.has(idDoItem)) {
        mostrarLoja();
        return;
    }

    if (!podeComprarItemDaLoja(idDoItem)) {
        atualizarSaldoDeFragmentos();
        mostrarLoja();
        return;
    }

    const novoSaldo = fragmentosPixel - configuracao.custoNaLoja;

    if (!Number.isInteger(novoSaldo) || novoSaldo < 0) {
        return;
    }

    fragmentosPixel = novoSaldo;
    comprasDaLoja.add(idDoItem);
    salvarFragmentosPixel();
    salvarComprasDaLoja();
    atualizarSaldoDeFragmentos();
    atualizarIndicadorFaseSelecionada();
    atualizarBotoesDeConstrucao();
    verificarConquistasAutomaticas();
    atualizarResumoDasConquistasNoMenu();
    mostrarLoja();
}

function obterDetalheDoInimigoNoAlbum(tipo, configuracao) {
    const detalhes = {
        sabotador: localizar("Atira em torres | Destrói com {tiros} tiros", {
            tiros: configuracao.tirosParaDestruirTorre
        }),
        escorpiao: localizar("Exclusivo da Fase 2"),
        mumia: localizar("Exclusiva da Fase 2"),
        loboDeGelo: localizar("Exclusivo da Fase 3"),
        yeti: localizar("Exclusivo da Fase 3"),
        macacoSaqueador: localizar("Exclusivo da Fase 4 | Desacelera torres"),
        oncaDaSelva: localizar("Exclusiva da Fase 4 | Dispara com 50% da vida"),
        gorilaDaSelva: localizar("Exclusivo da Fase 4"),
        raposaLadina: localizar("Exclusiva da Fase 5 | Muito rápida"),
        javaliFurioso: localizar("Exclusivo da Fase 5 | Faz arrancadas"),
        corujaSombria: localizar("Exclusiva da Fase 5 | Reduz o alcance das torres"),
        boss: localizar("Exclusivo da Fase 1 | +{vida} de vida por aparição", {
            vida: configuracao.incrementoVidaPorAparicao
        }),
        bossDeserto: localizar("Exclusivo da Fase 2 | +{vida} de vida por aparição", {
            vida: configuracao.incrementoVidaPorAparicao
        }),
        bossArtico: localizar("Exclusivo da Fase 3 | +{vida} de vida por aparição", {
            vida: configuracao.incrementoVidaPorAparicao
        }),
        bossSelva: localizar("Exclusivo da Fase 4 | +{vida} de vida por aparição", {
            vida: configuracao.incrementoVidaPorAparicao
        }),
        bossTemperado: localizar("Exclusivo da Fase 5 | +{vida} de vida por aparição | Rugido atordoa torres próximas", {
            vida: configuracao.incrementoVidaPorAparicao
        }),
        morcegoDeFogo: localizar("Exclusivo da Fase 6 | Muito rápido"),
        lagartoVulcanico: localizar("Exclusivo da Fase 6"),
        golemDeMagma: localizar("Exclusivo da Fase 6"),
        fragmentoDeMagma: localizar("Criado pelo Titã de Obsidiana | Muito rápido"),
        bossVulcanico: localizar("Exclusivo da Fase 6 | Carapaça rompe com 50% de vida, acelera e libera fragmentos"),
        mosquitoDoBrejo: localizar("Exclusivo da Fase 7 | Muito rápido"),
        sapoVenenoso: localizar("Exclusivo da Fase 7"),
        guardiaoDeLodo: localizar("Exclusivo da Fase 7"),
        bossPantano: localizar("Exclusivo da Fase 7 | Regenera 40 de vida por segundo depois de alcançar 50%"),
        raptorAncestral: localizar("Exclusivo da Fase 8 | Muito rápido"),
        besouroDeAmbar: localizar("Exclusivo da Fase 8 | Reduz 20% do dano recebido"),
        triceratopo: localizar("Exclusivo da Fase 8 | Muita vida"),
        bossPrimordial: localizar("Exclusivo da Fase 8 | Invoca 2 Raptors com 60% e 30% de vida"),
        droneCacador: localizar("Exclusivo da Fase 9 | Muito rápido e ainda mais veloz nos trilhos"),
        roboReparador: localizar("Exclusivo da Fase 9 | Restaura 45 de vida de um aliado próximo"),
        sentinelaDeEscudo: localizar("Exclusivo da Fase 9 | Reduz 25% do dano recebido por aliados próximos"),
        protocoloZero: localizar("Exclusivo da Fase 9 | Rebobina o caminho e recupera vida duas vezes"),
        pixelCorrompido: localizar("Encontrado na fase secreta | Textura quebrada"),
        erroVeloz: localizar("Encontrado na fase secreta | Muito rápido"),
        blocoInstavel: localizar("Encontrado na fase secreta | Muita vida"),
        bossGlitch: localizar("Boss da fase secreta | Fica mais forte a cada aparição")
    };

    return detalhes[tipo] || "";
}

function obterCategoriaDoAlbum(idDaCategoria = categoriaDoAlbumSelecionada) {
    return CONFIG.album.categorias.find(categoria => categoria.id === idDaCategoria)
        || CONFIG.album.categorias[0];
}

function selecionarCategoriaDoAlbum(idDaCategoria) {
    if (!CONFIG.album.categorias.some(categoria => categoria.id === idDaCategoria)) {
        return;
    }

    categoriaDoAlbumSelecionada = idDaCategoria;
    mostrarAlbum();
}

function criarCartoesDosInimigosDoAlbum(tipos) {
    return tipos.map((tipo) => {
        const configuracao = CONFIG.inimigo[tipo];
        return criarCartaoDeInimigo(
            tipo,
            obterNomeLocalizado(configuracao),
            configuracao,
            obterDetalheDoInimigoNoAlbum(tipo, configuracao)
        );
    }).join("");
}

function obterSkinsDoAlbum() {
    const idDaSkinDeMissao = "sentinelaDourada";
    const skinDeMissao = CONFIG.missoes.skins[idDaSkinDeMissao];
    const skinDoApoiador = CONFIG.pacoteApoiador.skin;
    const skinEquipada = obterSkinEquipadaDaTorrePadrao();

    return [
        {
            id: "original",
            nome: "Visual original",
            descricao: "Aparência padrão disponível para todos.",
            origem: "Disponível desde o início.",
            desbloqueada: true,
            equipada: !skinEquipada
        },
        {
            id: idDaSkinDeMissao,
            nome: obterNomeLocalizado(skinDeMissao),
            descricao: skinDeMissao.descricao,
            origem: "Obtida em missão semanal.",
            desbloqueada: recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes(idDaSkinDeMissao),
            equipada: recompensasPermanentesDasMissoes.skinTorrePadraoEquipada === idDaSkinDeMissao
        },
        {
            id: skinDoApoiador.id,
            nome: obterNomeLocalizado(skinDoApoiador),
            descricao: skinDoApoiador.descricao,
            origem: "Obtida no Pacote Apoiador.",
            desbloqueada: pacoteApoiador.adquirido,
            equipada: pacoteApoiador.adquirido && pacoteApoiador.skinEquipada
        }
    ];
}

function obterDadosDasCategoriasDoAlbum() {
    const itensDeDefesa = Object.entries(CONFIG.torre.tipos);
    const todasAsTorres = itensDeDefesa
        .filter(([, configuracao]) => !configuracaoEhExplosivoConsumivel(configuracao));
    const todosOsExplosivos = itensDeDefesa
        .filter(([, configuracao]) => configuracaoEhExplosivoConsumivel(configuracao));
    const torres = todasAsTorres
        .filter(([tipo]) => torreEstaDesbloqueada(tipo));
    const minas = todosOsExplosivos
        .filter(([tipo]) => torreEstaDesbloqueada(tipo));
    const ordemDosInimigos = [
        "normal", "elite", "rapido", "sabotador", "escorpiao", "mumia",
        "loboDeGelo", "yeti", "macacoSaqueador", "oncaDaSelva",
        "gorilaDaSelva", "raposaLadina", "javaliFurioso", "corujaSombria",
        "morcegoDeFogo", "lagartoVulcanico", "golemDeMagma", "fragmentoDeMagma",
        "mosquitoDoBrejo", "sapoVenenoso", "guardiaoDeLodo",
        "raptorAncestral", "besouroDeAmbar", "triceratopo",
        "droneCacador", "roboReparador", "sentinelaDeEscudo",
        "boss", "bossDeserto", "bossArtico", "bossSelva", "bossTemperado", "bossVulcanico", "bossPantano", "bossPrimordial", "protocoloZero",
        ...(faseSecretaDescoberta
            ? ["pixelCorrompido", "erroVeloz", "blocoInstavel", "bossGlitch"]
            : [])
    ];
    const todosOsInimigos = ordemDosInimigos.filter(tipo => !tipoEhBoss(tipo));
    const todosOsBosses = ordemDosInimigos.filter(tipoEhBoss);
    const inimigos = todosOsInimigos
        .filter(tipo => inimigosDerrotadosNoAlbum.has(tipo));
    const bosses = todosOsBosses
        .filter(tipo => inimigosDerrotadosNoAlbum.has(tipo));
    const formaHumanaDoSenhorDoTempo = faseSecretaDescoberta
        && CONFIG.faseSecreta.senhorDoTempo.formaHumanaFutura.ativa
        ? CONFIG.faseSecreta.senhorDoTempo.formaHumanaFutura
        : null;
    const todasAsSkins = obterSkinsDoAlbum();
    const skins = todasAsSkins.filter(skin => skin.desbloqueada);

    return {
        torres: {
            quantidade: torres.length,
            total: todasAsTorres.length,
            conteudo: torres.map(([tipo, configuracao]) =>
                criarCartoesDaTorre(tipo, configuracao)
            ).join("")
        },
        inimigos: {
            quantidade: inimigos.length + (formaHumanaDoSenhorDoTempo ? 1 : 0),
            total: todosOsInimigos.length + (formaHumanaDoSenhorDoTempo ? 1 : 0),
            conteudo: criarCartoesDosInimigosDoAlbum(inimigos)
                + (formaHumanaDoSenhorDoTempo
                    ? criarCartaoDaFormaHumanaDoSenhorDoTempo(formaHumanaDoSenhorDoTempo)
                    : "")
        },
        bosses: {
            quantidade: bosses.length,
            total: todosOsBosses.length,
            conteudo: criarCartoesDosInimigosDoAlbum(bosses)
        },
        minas: {
            quantidade: minas.length,
            total: todosOsExplosivos.length,
            conteudo: minas.map(([tipo, configuracao]) =>
                criarCartoesDaTorre(tipo, configuracao)
            ).join("")
        },
        skins: {
            quantidade: skins.length,
            total: todasAsSkins.length,
            conteudo: skins.map(criarCartaoDeSkin).join("")
        }
    };
}

function criarEstadoVazioDoAlbum(idDaCategoria) {
    const orientacoes = {
        torres: "Desbloqueie uma torre para colar uma nova figurinha aqui.",
        inimigos: "Derrote um inimigo durante uma partida para colar a primeira figurinha.",
        bosses: "Derrote um Boss para revelar e colar sua figurinha.",
        minas: "Compre uma mina ou bomba na Loja para adicioná-la ao Álbum.",
        skins: "Ganhe uma skin para adicioná-la à sua coleção."
    };

    return `
        <div class="album-vazio" role="status">
            <span class="album-vazio-silhueta" aria-hidden="true">?</span>
            <div>
                <strong>${localizar("Nenhuma figurinha ainda")}</strong>
                <p>${localizar(orientacoes[idDaCategoria] || orientacoes.inimigos)}</p>
            </div>
        </div>
    `;
}

function mostrarAlbum() {
    definirTelaDoMenuAberta("album");
    tentarIniciarMusicaDoLobby();

    const categoriaAtual = obterCategoriaDoAlbum();
    const dadosDasCategorias = obterDadosDasCategoriasDoAlbum();
    const dadosAtuais = dadosDasCategorias[categoriaAtual.id];
    const paginaEstaVazia = dadosAtuais.quantidade === 0;
    const abasDoAlbum = CONFIG.album.categorias.map((categoria) => {
        const ativa = categoria.id === categoriaAtual.id;
        const dadosDaCategoria = dadosDasCategorias[categoria.id];
        const resumo = localizar("{obtidas}/{total} figurinhas", {
            obtidas: dadosDaCategoria.quantidade,
            total: dadosDaCategoria.total
        });

        return `
            <button
                id="aba-album-${categoria.id}"
                class="loja-aba album-aba ${ativa ? "loja-aba-ativa" : ""}"
                type="button"
                role="tab"
                aria-controls="painel-album-${categoria.id}"
                aria-selected="${ativa}"
                onclick="selecionarCategoriaDoAlbum('${categoria.id}')"
            >
                <span class="loja-aba-icone" aria-hidden="true">${criarIconeDaCategoria(categoria)}</span>
                <strong>${obterNomeLocalizado(categoria)}</strong>
                <small>${resumo}</small>
            </button>
        `;
    }).join("");

    conteudoMenu.innerHTML = `
        ${criarCabecalhoConteudoMenu(
            localizar("Álbum de Figurinhas"),
            localizar("Jogue para encontrar novas figurinhas e completar sua coleção.")
        )}
        <nav class="album-abas" role="tablist" aria-label="${localizar("Categorias do Álbum")}">
            ${abasDoAlbum}
        </nav>
        <section class="album-pagina-figurinhas">
            <span class="album-espiral" aria-hidden="true"></span>
            <header class="loja-categoria-cabecalho album-categoria-cabecalho">
                <div>
                    <small>${localizar("PÁGINA DA COLEÇÃO")}</small>
                    <h3>${obterNomeLocalizado(categoriaAtual)}</h3>
                </div>
                <div class="album-categoria-resumo">
                    <strong>${localizar("{obtidas} de {total} figurinhas coladas", {
                        obtidas: dadosAtuais.quantidade,
                        total: dadosAtuais.total
                    })}</strong>
                    <p>${localizar(categoriaAtual.descricao)}</p>
                </div>
            </header>
            <section
                id="painel-album-${categoriaAtual.id}"
                class="album-grade ${paginaEstaVazia ? "album-grade-vazia" : ""}"
                role="tabpanel"
                aria-labelledby="aba-album-${categoriaAtual.id}"
            >
                ${paginaEstaVazia
                    ? criarEstadoVazioDoAlbum(categoriaAtual.id)
                    : dadosAtuais.conteudo}
            </section>
        </section>
    `;
    desenharMiniaturasDasTorresDoAlbum();
    desenharMiniaturasDosInimigosDoAlbum();
    desenharMiniaturasDasSkinsDoAlbum();
}

function criarCartoesDaTorre(tipo, configuracao) {
    const detalheDeDesbloqueio = configuracao.requerCompraNaLoja
        ? localizar(" | Loja: {custo} fragmentos", { custo: configuracao.custoNaLoja })
        : configuracao.faseConcluidaParaDesbloqueio > 0
            ? localizar(" | Desbloqueio: conclua a Fase {fase}", {
                fase: configuracao.faseConcluidaParaDesbloqueio
            })
            : "";
    const detalheDeAtaqueEmArea = configuracao.raioDanoEmArea
        ? localizar(" | Dano em área: {raio} px", { raio: configuracao.raioDanoEmArea })
        : "";
    const detalheDeLasers = configuracao.quantidadeDeLasers
        ? localizar(" | {quantidade} lasers por ataque", {
            quantidade: configuracao.quantidadeDeLasers
        })
        : "";
    const detalheDeQueimadura = obterDetalheDaQueimadura(configuracao);
    const descricaoDoNivelBase = configuracaoEhExplosivoConsumivel(configuracao)
        ? localizar("Custo: {custo} | Dano em área: {dano} | Raio: {raio} px | Limite: {limite}", {
            custo: configuracao.custo,
            dano: configuracao.dano,
            raio: configuracao.raioExplosao,
            limite: configuracao.limitePorPartida
        }) + (configuracao.tipoDeItem === "bomba"
            ? localizar(" | Detonação manual")
            : localizar(" | Detonação por contato")) + detalheDeDesbloqueio
        : configuracao.efeitoSismico
            ? localizar("Custo: {custo} | Carga: {cargas} inimigos | Empurrão: {distancia} px | Limite: {limite}", {
                custo: configuracao.custo,
                cargas: configuracao.efeitoSismico.cargasNecessarias,
                distancia: configuracao.efeitoSismico.distanciaDoEmpurrao,
                limite: configuracao.limitePorPartida
            }) + detalheDeDesbloqueio
        : configuracao.percentualBonusCadencia
            ? localizar("Custo: {custo} | Cadência próxima: +{percentual}% | Alcance: {alcance} | Limite: {limite}", {
                custo: configuracao.custo,
                percentual: obterPercentualInteiro(configuracao.percentualBonusCadencia),
                alcance: configuracao.alcance,
                limite: configuracao.limitePorPartida
            }) + detalheDeDesbloqueio
            : configuracao.creditosPorWave
                ? localizar("Custo: {custo} | Produção: {creditos} por wave | Limite: {limite}", {
                    custo: configuracao.custo,
                    creditos: configuracao.creditosPorWave,
                    limite: configuracao.limitePorPartida
                }) + detalheDeDesbloqueio
            : configuracao.naoAtira
                ? localizar("Custo: {custo} | Resistência: {tiros} tiros | Limite: {limite}", {
                    custo: configuracao.custo,
                    tiros: configuracao.resistenciaATiros,
                    limite: configuracao.limitePorPartida
                }) + detalheDeDesbloqueio
                : localizar("Custo: {custo} | Dano: {dano} | Alcance: {alcance}", {
                    custo: configuracao.custo,
                    dano: configuracao.dano,
                    alcance: configuracao.alcance
                }) + detalheDeAtaqueEmArea + detalheDeLasers + detalheDeQueimadura
                    + detalheDeDesbloqueio;
    const nomeDaTorre = obterNomeLocalizado(configuracao);
    const nomeDoNivelBase = configuracaoEhExplosivoConsumivel(configuracao)
        || !configuracaoPossuiMelhorias(configuracao)
        ? nomeDaTorre
        : localizar("{nome} · nível {nivel}", { nome: nomeDaTorre, nivel: 0 });

    return [
        criarCartaoDeTorre(
            tipo,
            0,
            nomeDoNivelBase,
            descricaoDoNivelBase
        ),
        ...configuracao.melhorias.map((melhoria, indice) => {
            const descricaoDaMelhoria = melhoria.efeitoSismico
                ? indice === 0
                    ? localizar("Melhoria: {custo} | Carga reduzida para {cargas} inimigos", {
                        custo: melhoria.custo,
                        cargas: melhoria.efeitoSismico.cargasNecessarias
                    })
                    : indice === 1
                        ? localizar("Melhoria: {custo} | Vulnerabilidade: +{percentual}% por {segundos}s", {
                            custo: melhoria.custo,
                            percentual: obterPercentualInteiro(
                                melhoria.efeitoSismico.percentualDeVulnerabilidade
                            ),
                            segundos: melhoria.efeitoSismico.duracaoDaVulnerabilidade / 1000
                        })
                        : localizar("Melhoria: {custo} | Segundo impacto após {segundos}s", {
                            custo: melhoria.custo,
                            segundos: (melhoria.efeitoSismico.atrasoDoSegundoImpacto / 1000).toLocaleString(idiomaAtual)
                        })
                : melhoria.creditosPorWave
                ? localizar("Melhoria: {custo} | Produção: {creditos} por wave", {
                    custo: melhoria.custo,
                    creditos: melhoria.creditosPorWave
                })
                : localizar("Melhoria: {custo} | Dano: {dano} | Alcance: {alcance}", {
                    custo: melhoria.custo,
                    dano: melhoria.dano,
                    alcance: melhoria.alcance
                }) + (melhoria.raioDanoEmArea
                    ? localizar(" | Dano em área: {raio} px", {
                        raio: melhoria.raioDanoEmArea
                    })
                    : "") + (melhoria.quantidadeDeLasers
                    ? localizar(" | {quantidade} lasers por ataque", {
                        quantidade: melhoria.quantidadeDeLasers
                    })
                    : "") + obterDetalheDaQueimadura(melhoria);

            return criarCartaoDeTorre(
                tipo,
                indice + 1,
                localizar("{nome} · nível {nivel}", {
                    nome: nomeDaTorre,
                    nivel: indice + 1
                }),
                descricaoDaMelhoria
            );
        })
    ].join("");
}

function criarCabecalhoConteudoMenu(titulo, descricao) {
    return `
        <header class="conteudo-cabecalho">
            <div>
                <h2>${titulo}</h2>
                <p>${descricao}</p>
            </div>
            <button class="botao botao-fechar" onclick="fecharConteudoMenu()">${localizar("Fechar ×")}</button>
        </header>
    `;
}

function definirTelaDoMenuAberta(tela) {
    const telaAnteriorEraPagina = TELAS_DO_LOBBY_EM_TELA_CHEIA.has(telaDoMenuAberta);
    const telaAtualEhPagina = TELAS_DO_LOBBY_EM_TELA_CHEIA.has(tela);
    const paginaNovaFoiAberta = telaAtualEhPagina && !telaAnteriorEraPagina;

    if (paginaNovaFoiAberta && typeof document.activeElement?.focus === "function") {
        elementoDeOrigemDoConteudoMenu = document.activeElement;
    }

    telaDoMenuAberta = tela;
    menuPrincipal.classList.toggle("pagina-menu-aberta", telaAtualEhPagina);
    conteudoMenu.classList.toggle("conteudo-menu-tela-cheia", telaAtualEhPagina);

    if (tela) {
        conteudoMenu.dataset.tela = tela;
    } else {
        delete conteudoMenu.dataset.tela;
    }

    if (paginaNovaFoiAberta) {
        requestAnimationFrame(() => {
            if (telaDoMenuAberta !== tela) {
                return;
            }

            conteudoMenu.scrollTop = 0;
            conteudoMenu.querySelector(".botao-fechar")?.focus();
        });
    }
}

function atualizarConteudoMenuAberto() {
    const renderizadores = {
        missoes: mostrarMissoes,
        pacoteApoiador: mostrarPacoteApoiador,
        conquistas: mostrarConquistas,
        capitulos: mostrarCapitulos,
        fases: mostrarFases,
        loja: mostrarLoja,
        album: mostrarAlbum,
        tutorial: mostrarTutorial,
        selecaoDefesas: mostrarSelecaoDeDefesas
    };

    renderizadores[telaDoMenuAberta]?.();
}

function fecharConteudoMenu() {
    if (conversaDoSenhorDoTempoAtiva) {
        return;
    }

    if (trilhaDaConversaDoPortalAtiva) {
        selecionarTrilhaDoLobby();
    }

    if (camadaConversaPortal) {
        camadaConversaPortal.hidden = true;
        camadaConversaPortal.innerHTML = "";
    }

    const elementoParaRestaurarFoco = elementoDeOrigemDoConteudoMenu;

    definirTelaDoMenuAberta(null);
    conteudoMenu.innerHTML = "";
    elementoDeOrigemDoConteudoMenu = null;

    if (elementoParaRestaurarFoco?.isConnected) {
        elementoParaRestaurarFoco.focus();
    }
}

function criarCartaoDeTorre(tipo, nivel, nome, descricao) {
    return `
        <article class="album-cartao album-cartao-torre">
            <canvas
                class="miniatura-torre-album"
                width="84"
                height="84"
                data-tipo-torre="${tipo}"
                data-nivel-torre="${nivel}"
                aria-hidden="true"
            ></canvas>
            <div class="album-torre-dados">
                <strong>${nome}</strong>
                <p>${descricao}</p>
            </div>
        </article>
    `;
}

function criarCartaoDeInimigo(tipo, nome, configuracao, detalheAdicional = "") {
    const vida = configuracao.vida.toLocaleString(idiomaAtual);
    const velocidade = configuracao.velocidade.toLocaleString(idiomaAtual);
    const detalhe = detalheAdicional ? ` | ${detalheAdicional}` : "";
    return `
        <article class="album-cartao album-cartao-inimigo">
            <canvas
                class="miniatura-inimigo-album"
                width="84"
                height="84"
                data-tipo-inimigo="${tipo}"
                aria-hidden="true"
            ></canvas>
            <div class="album-inimigo-dados">
                <strong>${nome}</strong>
                <p>${localizar("Vida: {vida} | Velocidade: {velocidade}", {
                    vida,
                    velocidade
                })}${detalhe}</p>
            </div>
        </article>
    `;
}

function criarCartaoDaFormaHumanaDoSenhorDoTempo(configuracao) {
    return `
        <article class="album-cartao album-cartao-inimigo album-cartao-conceito">
            <canvas
                class="miniatura-inimigo-album"
                width="84"
                height="84"
                data-tipo-inimigo="${configuracao.id}"
                aria-hidden="true"
            ></canvas>
            <div class="album-inimigo-dados">
                <div class="album-conceito-topo">
                    <strong>${localizar(configuracao.nome)}</strong>
                </div>
                <p>${localizar(configuracao.descricao)}</p>
            </div>
        </article>
    `;
}

function criarCartaoDeSkin(skin) {
    const estado = skin.equipada
        ? localizar("Equipada")
        : skin.desbloqueada
            ? localizar("Desbloqueada")
            : localizar("Bloqueada");

    return `
        <article class="album-cartao album-cartao-skin ${skin.desbloqueada ? "" : "album-cartao-skin-bloqueada"}">
            <canvas
                class="miniatura-skin-album"
                width="84"
                height="84"
                data-id-skin="${skin.id}"
                aria-hidden="true"
            ></canvas>
            <div class="album-skin-dados">
                <div class="album-skin-topo">
                    <strong>${localizar(skin.nome)}</strong>
                    <span class="${skin.equipada ? "album-skin-equipada" : ""}">${estado}</span>
                </div>
                <p>${localizar(skin.descricao)}</p>
                <small>${localizar(skin.origem)}</small>
            </div>
        </article>
    `;
}

function copiarDesenhoParaMiniaturaDoAlbum(miniatura, desenhar) {
    const tamanhoDaAreaDeDesenho = 100;
    const contextoDaMiniatura = miniatura.getContext("2d");

    if (!contextoDaMiniatura) {
        return;
    }

    ctx.save();
    try {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, tamanhoDaAreaDeDesenho, tamanhoDaAreaDeDesenho);
        desenhar(tamanhoDaAreaDeDesenho);

        contextoDaMiniatura.clearRect(0, 0, miniatura.width, miniatura.height);
        contextoDaMiniatura.imageSmoothingEnabled = false;
        contextoDaMiniatura.drawImage(
            canvas,
            0,
            0,
            tamanhoDaAreaDeDesenho,
            tamanhoDaAreaDeDesenho,
            0,
            0,
            miniatura.width,
            miniatura.height
        );
    } finally {
        ctx.clearRect(0, 0, tamanhoDaAreaDeDesenho, tamanhoDaAreaDeDesenho);
        ctx.restore();
    }
}

function desenharMiniaturasDasTorresDoAlbum() {
    const miniaturas = conteudoMenu.querySelectorAll(".miniatura-torre-album");

    for (const miniatura of miniaturas) {
        const configuracao = CONFIG.torre.tipos[miniatura.dataset.tipoTorre];
        const nivel = Number(miniatura.dataset.nivelTorre);
        const estilo = nivel === 0
            ? configuracao?.visualBase
            : configuracao?.melhorias[nivel - 1]?.visual;

        if (!estilo) {
            continue;
        }

        copiarDesenhoParaMiniaturaDoAlbum(miniatura, (tamanhoDaAreaDeDesenho) => {
            desenharCorpoDaTorre(
                tamanhoDaAreaDeDesenho / 2,
                tamanhoDaAreaDeDesenho / 2 + 7,
                estilo
            );
        });
    }
}

function desenharMiniaturasDosInimigosDoAlbum() {
    const miniaturas = conteudoMenu.querySelectorAll(".miniatura-inimigo-album");

    for (const miniatura of miniaturas) {
        const tipo = miniatura.dataset.tipoInimigo;

        if (tipo === CONFIG.faseSecreta.senhorDoTempo.formaHumanaFutura.id) {
            copiarDesenhoParaMiniaturaDoAlbum(
                miniatura,
                desenharFormaHumanaDoSenhorDoTempoNoAlbum
            );
            continue;
        }

        const configuracao = CONFIG.inimigo[tipo];

        if (!configuracao) {
            continue;
        }

        const inimigoDaMiniatura = {
            tipo,
            tamanho: configuracao.tamanho,
            cor: configuracao.cor
        };

        copiarDesenhoParaMiniaturaDoAlbum(miniatura, (tamanhoDaAreaDeDesenho) => {
            const escalaVisual = obterEscalaVisualDoInimigo(tipo, configuracao.tamanho);
            const tamanhoDoSprite = escalaVisual * 2;
            const x = Math.round((tamanhoDaAreaDeDesenho - tamanhoDoSprite) / 2);
            const y = Math.round((tamanhoDaAreaDeDesenho - tamanhoDoSprite) / 2);
            desenharCorpoDoInimigo(inimigoDaMiniatura, x, y, tamanhoDoSprite);
        });
    }
}

function desenharFormaHumanaDoSenhorDoTempoNoAlbum(tamanhoDaAreaDeDesenho) {
    const visual = CONFIG.faseSecreta.senhorDoTempo.formaHumanaFutura.visual;
    const centroX = Math.round(tamanhoDaAreaDeDesenho / 2);

    ctx.save();
    ctx.translate(centroX, 0);

    ctx.fillStyle = visual.brilhoCiano;
    ctx.fillRect(-23, 7, 4, 24);
    ctx.fillRect(-35, 56, 4, 31);
    ctx.fillStyle = visual.brilhoMagenta;
    ctx.fillRect(19, 12, 4, 22);
    ctx.fillRect(31, 61, 4, 27);

    ctx.fillStyle = visual.contorno;
    ctx.beginPath();
    ctx.moveTo(-19, 39);
    ctx.lineTo(19, 39);
    ctx.lineTo(28, 46);
    ctx.lineTo(31, 100);
    ctx.lineTo(-31, 100);
    ctx.lineTo(-28, 46);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = visual.terno;
    ctx.beginPath();
    ctx.moveTo(-17, 43);
    ctx.lineTo(17, 43);
    ctx.lineTo(24, 49);
    ctx.lineTo(27, 100);
    ctx.lineTo(-27, 100);
    ctx.lineTo(-24, 49);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = visual.contorno;
    ctx.beginPath();
    ctx.moveTo(-20, 44);
    ctx.lineTo(-31, 46);
    ctx.lineTo(-38, 56);
    ctx.lineTo(-37, 99);
    ctx.lineTo(-20, 99);
    ctx.lineTo(-20, 57);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = visual.ternoIluminado;
    ctx.beginPath();
    ctx.moveTo(-20, 48);
    ctx.lineTo(-29, 50);
    ctx.lineTo(-34, 59);
    ctx.lineTo(-33, 95);
    ctx.lineTo(-24, 95);
    ctx.lineTo(-23, 56);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = visual.contorno;
    ctx.beginPath();
    ctx.moveTo(20, 44);
    ctx.lineTo(31, 47);
    ctx.lineTo(38, 57);
    ctx.lineTo(35, 72);
    ctx.lineTo(25, 91);
    ctx.lineTo(13, 95);
    ctx.lineTo(8, 82);
    ctx.lineTo(20, 69);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = visual.ternoIluminado;
    ctx.beginPath();
    ctx.moveTo(21, 48);
    ctx.lineTo(29, 51);
    ctx.lineTo(34, 58);
    ctx.lineTo(31, 69);
    ctx.lineTo(22, 85);
    ctx.lineTo(15, 89);
    ctx.lineTo(13, 84);
    ctx.lineTo(24, 68);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = visual.camisa;
    ctx.beginPath();
    ctx.moveTo(-9, 43);
    ctx.lineTo(9, 43);
    ctx.lineTo(7, 76);
    ctx.lineTo(-7, 76);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = visual.terno;
    ctx.beginPath();
    ctx.moveTo(-18, 43);
    ctx.lineTo(-8, 43);
    ctx.lineTo(-1, 73);
    ctx.lineTo(-17, 58);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(18, 43);
    ctx.lineTo(8, 43);
    ctx.lineTo(1, 73);
    ctx.lineTo(17, 58);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = visual.gravata;
    ctx.fillRect(-3, 46, 7, 8);
    ctx.beginPath();
    ctx.moveTo(-3, 54);
    ctx.lineTo(4, 54);
    ctx.lineTo(5, 74);
    ctx.lineTo(0, 80);
    ctx.lineTo(-5, 74);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = visual.camisa;
    ctx.fillRect(11, 86, 7, 7);
    ctx.fillStyle = visual.contorno;
    ctx.fillRect(9, 92, 20, 4);
    ctx.fillStyle = visual.ternoIluminado;
    ctx.fillRect(12, 92, 15, 2);

    ctx.fillStyle = visual.contorno;
    ctx.fillRect(-5, 35, 10, 9);
    ctx.fillRect(-11, 1, 22, 3);
    ctx.fillRect(-16, 4, 32, 4);
    ctx.fillRect(-19, 8, 38, 25);
    ctx.fillRect(-16, 33, 32, 4);
    ctx.fillRect(-11, 37, 22, 3);
    ctx.fillStyle = visual.aroDoRelogio;
    ctx.fillRect(-9, 4, 18, 3);
    ctx.fillRect(-14, 7, 28, 4);
    ctx.fillRect(-16, 11, 32, 19);
    ctx.fillRect(-13, 30, 26, 4);
    ctx.fillRect(-8, 34, 16, 3);
    ctx.fillStyle = visual.mostrador;
    ctx.fillRect(-9, 10, 18, 3);
    ctx.fillRect(-12, 13, 24, 15);
    ctx.fillRect(-8, 28, 16, 3);

    ctx.fillStyle = visual.marcadores;
    ctx.fillRect(-2, 13, 4, 3);
    ctx.fillRect(-2, 26, 4, 3);
    ctx.fillRect(-11, 20, 3, 3);
    ctx.fillRect(8, 20, 3, 3);
    ctx.fillRect(-1, 20, 3, 7);
    ctx.fillRect(1, 20, 8, 3);
    ctx.fillRect(-2, 19, 5, 5);

    ctx.restore();
}

function obterEstiloDaSkinDoAlbum(idDaSkin) {
    const estiloOriginal = CONFIG.torre.tipos.padrao.visualBase;

    if (idDaSkin === "original") {
        return estiloOriginal;
    }

    const skin = idDaSkin === CONFIG.pacoteApoiador.skin.id
        ? CONFIG.pacoteApoiador.skin
        : CONFIG.missoes.skins[idDaSkin];
    const coresDoNivelBase = skin?.coresPorNivel[0];

    return coresDoNivelBase ? { ...estiloOriginal, ...coresDoNivelBase } : null;
}

function desenharMiniaturasDasSkinsDoAlbum() {
    const miniaturas = conteudoMenu.querySelectorAll(".miniatura-skin-album");

    for (const miniatura of miniaturas) {
        const estilo = obterEstiloDaSkinDoAlbum(miniatura.dataset.idSkin);

        if (!estilo) {
            continue;
        }

        copiarDesenhoParaMiniaturaDoAlbum(miniatura, (tamanhoDaAreaDeDesenho) => {
            desenharCorpoDaTorre(
                tamanhoDaAreaDeDesenho / 2,
                tamanhoDaAreaDeDesenho / 2 + 7,
                estilo
            );
        });
    }
}

function mostrarTutorial() {
    definirTelaDoMenuAberta("tutorial");
    tentarIniciarMusicaDoLobby();

    conteudoMenu.innerHTML = `
        <section>
            ${criarCabecalhoConteudoMenu(
                localizar("Como jogar"),
                localizar("Aprenda o básico e pratique antes da primeira wave.")
            )}
            <div class="tutorial-introducao">
                <div>
                    <small>${localizar("TREINAMENTO PARA INICIANTES")}</small>
                    <strong>${localizar("Defenda a torre-base")}</strong>
                    <p>${localizar("Construa torres perto do caminho e impeça que os inimigos cheguem ao final.")}</p>
                </div>
                <button class="botao botao-primario botao-iniciar-tutorial" onclick="iniciarTutorialPeloMenu()">${localizar("Jogar tutorial")}</button>
            </div>
            <ol class="tutorial-lista">
                <li>${localizar("Escolha uma defesa liberada na lista à direita. A Torre padrão custa 150 créditos.")}</li>
                <li>${localizar("Clique fora do caminho para construir. Deixe a torre perto da estrada para alcançar os inimigos.")}</li>
                <li>${localizar("As torres atacam automaticamente e cada disparo rende {creditos} créditos.", {
                    creditos: obterRecompensaPorTiro()
                })}</li>
                <li>${localizar("Clique em uma torre construída para ver dano, alcance, melhoria, venda e prioridade de alvo.")}</li>
                <li>${localizar("Use os créditos recebidos para construir ou melhorar. Cada torre pode chegar ao nível 3.")}</li>
                <li>${localizar("Não deixe nenhum inimigo chegar à torre-base. Conclua a wave {wave} para vencer a fase.", {
                    wave: CONFIG.wave.ultimaWave
                })}</li>
            </ol>
        </section>
    `;
}

// Waves e inimigos
function criarInimigo(tipo) {
    const configuracao = CONFIG.inimigo[tipo];
    const caminhosAtuais = obterCaminhosAtuais();
    const indiceDoCaminho = obterIndiceDoCaminhoParaNovoInimigo(tipo);
    const caminhoAtual = caminhosAtuais[indiceDoCaminho];
    const agora = Date.now();
    const vida = tipoEhBoss(tipo)
        ? calcularVidaDoBoss(wave, tipo)
        : configuracao.vida;

    if (!faseAtualUsaCaminhoVivo()) {
        proximoIndiceDeEntrada = (proximoIndiceDeEntrada + 1) % caminhosAtuais.length;
    }
    inimigos.push({
        tipo,
        indiceDoCaminho,
        x: caminhoAtual[0].x,
        y: caminhoAtual[0].y,
        velocidade: configuracao.velocidade,
        alvo: 1,
        tamanho: configuracao.tamanho,
        vida,
        vidaMaxima: vida,
        cor: configuracao.cor,
        ultimoTiro: 0,
        proximaArrancadaEm: tipo === "javaliFurioso"
            ? agora + configuracao.intervaloEntreArrancadas
            : 0,
        arrancadaExpiraEm: 0,
        proximoRugidoEm: tipo === "bossTemperado"
            ? agora + configuracao.atrasoDoPrimeiroRugido
            : 0,
        rugidoExpiraEm: 0,
        formaDeErupcao: false,
        erupcaoExpiraEm: 0,
        regeneracaoAtiva: false,
        regeneracaoAtivadaEm: 0,
        chamadosPrimordiaisRealizados: 0,
        chamadoPrimordialExpiraEm: 0,
        proximoReparoEm: tipo === "roboReparador"
            ? agora + configuracao.intervaloEntreReparos
            : 0,
        reparoExpiraEm: 0,
        reparadoExpiraEm: 0,
        reversoesTemporaisRealizadas: 0,
        reversaoTemporalExpiraEm: 0
    });
}

function tipoEhBoss(tipoDoInimigo) {
    return [
        "boss",
        "bossDeserto",
        "bossArtico",
        "bossSelva",
        "bossTemperado",
        "bossVulcanico",
        "bossPantano",
        "bossPrimordial",
        "protocoloZero",
        "bossGlitch"
    ].includes(tipoDoInimigo);
}

function obterTipoDeBossDaFase() {
    const tema = obterFaseAtual().tema;

    if (tema === "glitch") {
        return "bossGlitch";
    }

    if (tema === "deserto") {
        return "bossDeserto";
    }

    if (tema === "artico") {
        return "bossArtico";
    }

    if (tema === "selva") {
        return "bossSelva";
    }

    if (tema === "temperada") {
        return "bossTemperado";
    }

    if (tema === "vulcanica") {
        return "bossVulcanico";
    }

    if (tema === "pantano") {
        return "bossPantano";
    }

    if (tema === "primordial") {
        return "bossPrimordial";
    }

    if (tema === "futurista") {
        return "protocoloZero";
    }

    return "boss";
}

function calcularVidaDoBoss(waveAtual, tipoDoBoss = obterTipoDeBossDaFase()) {
    const numeroDaAparicao = Math.max(
        1,
        Math.floor(waveAtual / CONFIG.wave.intervaloDeBoss)
    );
    const configuracaoDoBoss = CONFIG.inimigo[tipoDoBoss];

    return configuracaoDoBoss.vida
        + (numeroDaAparicao - 1) * configuracaoDoBoss.incrementoVidaPorAparicao;
}

function calcularQuantidadeDeFragmentosDoTita(waveAtual = wave) {
    const configuracao = CONFIG.inimigo.bossVulcanico;
    const numeroDaAparicao = Math.max(
        1,
        Math.floor(waveAtual / CONFIG.wave.intervaloDeBoss)
    );
    return Math.min(
        configuracao.maximoDeFragmentos,
        configuracao.fragmentosNaPrimeiraAparicao + numeroDaAparicao - 1
    );
}

function criarInimigoInvocado(tipo, invocador, deslocamentoVertical = 0) {
    const configuracao = CONFIG.inimigo[tipo];
    const caminhoAtual = obterCaminhoDoInimigo(invocador);
    inimigos.push({
        tipo,
        indiceDoCaminho: invocador.indiceDoCaminho,
        x: invocador.x,
        y: invocador.y + deslocamentoVertical,
        velocidade: configuracao.velocidade,
        alvo: Math.min(invocador.alvo, caminhoAtual.length - 1),
        tamanho: configuracao.tamanho,
        vida: configuracao.vida,
        vidaMaxima: configuracao.vida,
        cor: configuracao.cor,
        ultimoTiro: 0,
        proximaArrancadaEm: 0,
        arrancadaExpiraEm: 0,
        proximoRugidoEm: 0,
        rugidoExpiraEm: 0,
        formaDeErupcao: false,
        erupcaoExpiraEm: 0,
        regeneracaoAtiva: false,
        regeneracaoAtivadaEm: 0,
        chamadosPrimordiaisRealizados: 0,
        chamadoPrimordialExpiraEm: 0,
        proximoReparoEm: tipo === "roboReparador"
            ? Date.now() + configuracao.intervaloEntreReparos
            : 0,
        reparoExpiraEm: 0,
        reparadoExpiraEm: 0,
        reversoesTemporaisRealizadas: 0,
        reversaoTemporalExpiraEm: 0
    });
}

function criarFragmentosDeMagmaDoTita(tita) {
    const quantidade = calcularQuantidadeDeFragmentosDoTita();

    for (let indice = 0; indice < quantidade; indice++) {
        const deslocamento = (indice - (quantidade - 1) / 2) * 12;
        criarInimigoInvocado("fragmentoDeMagma", tita, deslocamento);
    }
}

function ativarChamadoDaMatilha(tirano, agora = Date.now()) {
    if (tirano.tipo !== "bossPrimordial" || tirano.vida <= 0) {
        return 0;
    }

    const configuracao = CONFIG.inimigo.bossPrimordial;
    let chamadosRealizadosAgora = 0;

    while (
        tirano.chamadosPrimordiaisRealizados < configuracao.percentuaisDeVidaParaChamado.length
        && tirano.vida <= tirano.vidaMaxima * configuracao.percentuaisDeVidaParaChamado[
            tirano.chamadosPrimordiaisRealizados
        ]
    ) {
        for (let indice = 0; indice < configuracao.raptorsPorChamado; indice++) {
            const deslocamento = (indice - (configuracao.raptorsPorChamado - 1) / 2) * 18;
            criarInimigoInvocado("raptorAncestral", tirano, deslocamento);
        }

        tirano.chamadosPrimordiaisRealizados++;
        chamadosRealizadosAgora++;
    }

    if (chamadosRealizadosAgora > 0) {
        tirano.chamadoPrimordialExpiraEm = agora + configuracao.duracaoVisualDoChamado;
        mostrarAviso(localizar("O Tirano usou Chamado da Matilha!"));
    }

    return chamadosRealizadosAgora;
}

function ativarErupcaoDoTita(tita, agora = Date.now()) {
    if (tita.tipo !== "bossVulcanico" || tita.formaDeErupcao) {
        return false;
    }

    tita.formaDeErupcao = true;
    tita.erupcaoExpiraEm = agora + CONFIG.inimigo.bossVulcanico.duracaoVisualDaErupcao;
    criarFragmentosDeMagmaDoTita(tita);
    mostrarAviso(localizar("A carapaça do Titã se rompeu! Fragmentos de Magma foram liberados."));
    return true;
}

function obterReducaoDoEscudoParaInimigo(inimigo) {
    const configuracao = CONFIG.inimigo.sentinelaDeEscudo;
    const protegido = inimigos.some((sentinela) => (
        sentinela !== inimigo
        && sentinela.tipo === "sentinelaDeEscudo"
        && sentinela.vida > 0
        && Math.hypot(sentinela.x - inimigo.x, sentinela.y - inimigo.y)
            <= configuracao.raioDoEscudo
    ));

    return protegido ? configuracao.reducaoDeDanoAosAliados : 0;
}

function ativarReversaoDeEmergencia(protocolo, agora = Date.now()) {
    if (protocolo.tipo !== "protocoloZero") {
        return 0;
    }

    const configuracao = CONFIG.inimigo.protocoloZero;
    const vidaAposImpacto = protocolo.vida;
    let reversoesRealizadasAgora = 0;

    while (
        protocolo.reversoesTemporaisRealizadas
            < configuracao.percentuaisDeVidaParaReversao.length
        && vidaAposImpacto <= protocolo.vidaMaxima
            * configuracao.percentuaisDeVidaParaReversao[
                protocolo.reversoesTemporaisRealizadas
            ]
    ) {
        recuarInimigoNoCaminho(protocolo, configuracao.distanciaDaReversao);
        protocolo.vida = Math.min(
            protocolo.vidaMaxima,
            protocolo.vida + protocolo.vidaMaxima * configuracao.percentualDeVidaRestaurada
        );
        protocolo.reversoesTemporaisRealizadas++;
        reversoesRealizadasAgora++;
    }

    if (reversoesRealizadasAgora > 0) {
        protocolo.reversaoTemporalExpiraEm = agora
            + configuracao.duracaoVisualDaReversao;
        mostrarAviso(localizar("Reversão de Emergência ativada!"));
    }

    return reversoesRealizadasAgora;
}

function aplicarDanoAoInimigo(inimigo, dano, agora = Date.now()) {
    if (!inimigo || inimigo.vida <= 0 || dano <= 0) {
        return 0;
    }

    const vidaAnterior = inimigo.vida;
    const vulnerabilidadeAtiva = agora < (inimigo.vulnerabilidadeSismicaExpiraEm || 0);
    const multiplicadorDeVulnerabilidade = vulnerabilidadeAtiva
        ? 1 + (inimigo.percentualDeVulnerabilidadeSismica || 0)
        : 1;
    const reducaoDeDanoBase = CONFIG.inimigo[inimigo.tipo]?.reducaoDeDano || 0;
    const reducaoDoEscudo = typeof obterReducaoDoEscudoParaInimigo === "function"
        ? obterReducaoDoEscudoParaInimigo(inimigo)
        : 0;
    const reducaoDeDano = 1
        - (1 - reducaoDeDanoBase) * (1 - reducaoDoEscudo);
    const danoEfetivo = Math.round(
        dano * multiplicadorDeVulnerabilidade * (1 - reducaoDeDano)
    );

    if (!vulnerabilidadeAtiva) {
        inimigo.percentualDeVulnerabilidadeSismica = 0;
    }

    if (inimigo.tipo === "bossVulcanico" && !inimigo.formaDeErupcao) {
        const configuracao = CONFIG.inimigo.bossVulcanico;
        const limiteDaErupcao = inimigo.vidaMaxima * configuracao.percentualDeVidaParaErupcao;
        const danoReduzido = danoEfetivo * (1 - configuracao.reducaoDeDanoDaCarapaca);
        inimigo.vida = Math.max(limiteDaErupcao, inimigo.vida - danoReduzido);

        if (inimigo.vida <= limiteDaErupcao) {
            ativarErupcaoDoTita(inimigo, agora);
        }
    } else {
        inimigo.vida -= danoEfetivo;
    }

    if (
        inimigo.tipo === "bossPantano"
        && inimigo.vida > 0
        && !inimigo.regeneracaoAtiva
        && inimigo.vida <= inimigo.vidaMaxima
            * CONFIG.inimigo.bossPantano.percentualDeVidaParaRegeneracao
    ) {
        inimigo.regeneracaoAtiva = true;
        inimigo.regeneracaoAtivadaEm = agora;
        mostrarAviso(localizar("A Hidra despertou sua regeneração!"));
    }

    if (inimigo.tipo === "bossPrimordial") {
        ativarChamadoDaMatilha(inimigo, agora);
    }

    if (inimigo.tipo === "protocoloZero") {
        ativarReversaoDeEmergencia(inimigo, agora);
    }

    return vidaAnterior - inimigo.vida;
}

function atualizarRegeneracaoDaHidra(inimigo, multiplicadorDeMovimento = 1) {
    if (
        inimigo.tipo !== "bossPantano"
        || !inimigo.regeneracaoAtiva
        || inimigo.vida <= 0
        || inimigo.vida >= inimigo.vidaMaxima
    ) {
        return 0;
    }

    const vidaAnterior = inimigo.vida;
    const vidaPorQuadro = CONFIG.inimigo.bossPantano.vidaRegeneradaPorSegundo
        / CONFIG.simulacao.quadrosPorSegundoDeReferencia;
    inimigo.vida = Math.min(
        inimigo.vidaMaxima,
        inimigo.vida + vidaPorQuadro * multiplicadorDeMovimento
    );
    return inimigo.vida - vidaAnterior;
}

function atualizarReparoDoRobo(inimigo, agora = Date.now()) {
    if (
        inimigo.tipo !== "roboReparador"
        || inimigo.vida <= 0
        || agora < (inimigo.proximoReparoEm || 0)
    ) {
        return 0;
    }

    const configuracao = CONFIG.inimigo.roboReparador;
    inimigo.proximoReparoEm = agora + configuracao.intervaloEntreReparos;
    const alvo = inimigos
        .filter((possivelAlvo) => (
            possivelAlvo !== inimigo
            && possivelAlvo.vida > 0
            && possivelAlvo.vida < possivelAlvo.vidaMaxima
            && Math.hypot(possivelAlvo.x - inimigo.x, possivelAlvo.y - inimigo.y)
                <= configuracao.raioDoReparo
        ))
        .sort((a, b) => a.vida / a.vidaMaxima - b.vida / b.vidaMaxima)[0];

    if (!alvo) {
        return 0;
    }

    const vidaAnterior = alvo.vida;
    alvo.vida = Math.min(alvo.vidaMaxima, alvo.vida + configuracao.vidaRestaurada);
    inimigo.reparoExpiraEm = agora + configuracao.duracaoVisualDoReparo;
    inimigo.alvoDoReparo = alvo;
    alvo.reparadoExpiraEm = agora + configuracao.duracaoVisualDoReparo;
    return alvo.vida - vidaAnterior;
}

function aplicarEfeitoDeQueimadura(inimigo, efeitoDeQueimadura, agora = Date.now()) {
    if (!inimigo || inimigo.vida <= 0 || !efeitoDeQueimadura) {
        return false;
    }

    const queimaduraJaEstavaAtiva = agora < (inimigo.queimaduraExpiraEm || 0);
    inimigo.danoDaQueimadura = efeitoDeQueimadura.danoPorIntervalo;
    inimigo.intervaloDaQueimadura = efeitoDeQueimadura.intervaloEntreDanos;
    inimigo.queimaduraExpiraEm = agora + efeitoDeQueimadura.duracao;

    if (!queimaduraJaEstavaAtiva) {
        inimigo.proximoDanoDeQueimaduraEm = agora
            + efeitoDeQueimadura.intervaloEntreDanos;
    }

    return true;
}

function atualizarDanoDaQueimaduraNoInimigo(inimigo, agora = Date.now()) {
    const proximoDano = inimigo.proximoDanoDeQueimaduraEm || 0;
    const queimaduraExpiraEm = inimigo.queimaduraExpiraEm || 0;

    if (
        inimigo.vida <= 0
        || proximoDano <= 0
        || proximoDano > agora
        || proximoDano > queimaduraExpiraEm
    ) {
        return 0;
    }

    let danoAplicado = 0;

    while (
        inimigo.vida > 0
        && inimigo.proximoDanoDeQueimaduraEm <= agora
        && inimigo.proximoDanoDeQueimaduraEm <= queimaduraExpiraEm
    ) {
        danoAplicado += aplicarDanoAoInimigo(
            inimigo,
            inimigo.danoDaQueimadura,
            inimigo.proximoDanoDeQueimaduraEm
        );
        inimigo.proximoDanoDeQueimaduraEm += inimigo.intervaloDaQueimadura;
    }

    return danoAplicado;
}

function calcularQuantidadeDeInimigoExclusivo(faseAtiva, primeiraWave, wavesPorNovaUnidade) {
    if (!faseAtiva || wave < primeiraWave) {
        return 0;
    }

    return 1 + Math.floor((wave - primeiraWave) / wavesPorNovaUnidade);
}

function configurarComposicaoDaWaveSecreta() {
    const configuracao = CONFIG.faseSecreta.waves;
    pixelsCorrompidosParaCriar = configuracao.quantidadeBaseDePixelsCorrompidos
        + wave * configuracao.pixelsCorrompidosPorWave;
    errosVelozesParaCriar = calcularQuantidadeDeInimigoExclusivo(
        true,
        configuracao.primeiraWaveErroVeloz,
        configuracao.wavesPorNovoErroVeloz
    );
    blocosInstaveisParaCriar = calcularQuantidadeDeInimigoExclusivo(
        true,
        configuracao.primeiraWaveBlocoInstavel,
        configuracao.wavesPorNovoBlocoInstavel
    );
    inimigosChefesParaCriar = wave % CONFIG.wave.intervaloDeBoss === 0 ? 1 : 0;
    inimigosParaCriar = pixelsCorrompidosParaCriar
        + errosVelozesParaCriar
        + blocosInstaveisParaCriar
        + inimigosChefesParaCriar;
    avisoBossExpiraEm = inimigosChefesParaCriar > 0 ? Date.now() + 2500 : 0;
    proximoInimigoEm = Date.now();
    proximaWaveEm = 0;
}

function iniciarProximaWave() {
    if (!modoWavesInfinitas && wave >= CONFIG.wave.ultimaWave) {
        return;
    }

    wave++;
    registrarWaveInfinitaParaMissoes(wave);
    registrarWaveInfinitaParaConquistas(wave);

    if (faseAtualUsaCaminhoVivo() && wave === 1) {
        mostrarAviso(localizar("O {caminho} está ativo.", {
            caminho: obterNomeDoCaminhoVivo(obterIndiceDoCaminhoVivoNaWave())
        }));
    }

    if (faseAtualEhSecreta()) {
        configurarComposicaoDaWaveSecreta();
        tentarExibirFliperamaNaWaveAtual();
        return;
    }

    if (wave >= CONFIG.wave.primeiraWaveElite) {
        const progressoElite = wave - CONFIG.wave.primeiraWaveElite;
        const tamanhoDoCiclo = CONFIG.wave.vermelhosAntesDeNovoRoxo + 1;

        inimigosRoxosParaCriar = 2 + Math.floor(progressoElite / tamanhoDoCiclo);
        inimigosVermelhosParaCriar = progressoElite % tamanhoDoCiclo;
        inimigosRapidosParaCriar = inimigosRoxosParaCriar - 1;
    } else {
        inimigosRoxosParaCriar = 0;
        inimigosVermelhosParaCriar = 1 + wave;
        inimigosRapidosParaCriar = 0;
    }

    const temaDaFase = obterFaseAtual().tema;
    const faseDoDeserto = temaDaFase === "deserto";
    const faseDoArtico = temaDaFase === "artico";
    const faseDaSelva = temaDaFase === "selva";
    const faseTemperada = temaDaFase === "temperada";
    const faseVulcanica = temaDaFase === "vulcanica";
    const faseDoPantano = temaDaFase === "pantano";
    const fasePrimordial = temaDaFase === "primordial";
    const faseFuturista = temaDaFase === "futurista";
    inimigosEscorpioesParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDoDeserto,
        CONFIG.wave.primeiraWaveEscorpiao,
        CONFIG.wave.wavesPorNovoEscorpiao
    );
    inimigosMumiasParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDoDeserto,
        CONFIG.wave.primeiraWaveMumia,
        CONFIG.wave.wavesPorNovaMumia
    );
    inimigosLobosDeGeloParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDoArtico,
        CONFIG.wave.primeiraWaveLoboDeGelo,
        CONFIG.wave.wavesPorNovoLoboDeGelo
    );
    inimigosYetisParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDoArtico,
        CONFIG.wave.primeiraWaveYeti,
        CONFIG.wave.wavesPorNovoYeti
    );
    inimigosMacacosSaqueadoresParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDaSelva,
        CONFIG.wave.primeiraWaveMacacoSaqueador,
        CONFIG.wave.wavesPorNovoMacacoSaqueador
    );
    inimigosGorilasDaSelvaParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDaSelva,
        CONFIG.wave.primeiraWaveGorilaDaSelva,
        CONFIG.wave.wavesPorNovoGorilaDaSelva
    );
    inimigosOncasDaSelvaParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDaSelva,
        CONFIG.wave.primeiraWaveOncaDaSelva,
        CONFIG.wave.wavesPorNovaOncaDaSelva
    );
    inimigosRaposasLadinasParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseTemperada,
        CONFIG.wave.primeiraWaveRaposaLadina,
        CONFIG.wave.wavesPorNovaRaposaLadina
    );
    inimigosJavalisFuriososParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseTemperada,
        CONFIG.wave.primeiraWaveJavaliFurioso,
        CONFIG.wave.wavesPorNovoJavaliFurioso
    );
    inimigosCorujasSombriasParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseTemperada,
        CONFIG.wave.primeiraWaveCorujaSombria,
        CONFIG.wave.wavesPorNovaCorujaSombria
    );
    inimigosMorcegosDeFogoParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseVulcanica,
        CONFIG.wave.primeiraWaveMorcegoDeFogo,
        CONFIG.wave.wavesPorNovoMorcegoDeFogo
    );
    inimigosLagartosVulcanicosParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseVulcanica,
        CONFIG.wave.primeiraWaveLagartoVulcanico,
        CONFIG.wave.wavesPorNovoLagartoVulcanico
    );
    inimigosGolemsDeMagmaParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseVulcanica,
        CONFIG.wave.primeiraWaveGolemDeMagma,
        CONFIG.wave.wavesPorNovoGolemDeMagma
    );
    inimigosMosquitosDoBrejoParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDoPantano,
        CONFIG.wave.primeiraWaveMosquitoDoBrejo,
        CONFIG.wave.wavesPorNovoMosquitoDoBrejo
    );
    inimigosSaposVenenososParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDoPantano,
        CONFIG.wave.primeiraWaveSapoVenenoso,
        CONFIG.wave.wavesPorNovoSapoVenenoso
    );
    inimigosGuardioesDeLodoParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseDoPantano,
        CONFIG.wave.primeiraWaveGuardiaoDeLodo,
        CONFIG.wave.wavesPorNovoGuardiaoDeLodo
    );
    inimigosRaptorsAncestraisParaCriar = calcularQuantidadeDeInimigoExclusivo(
        fasePrimordial,
        CONFIG.wave.primeiraWaveRaptorAncestral,
        CONFIG.wave.wavesPorNovoRaptorAncestral
    );
    inimigosBesourosDeAmbarParaCriar = calcularQuantidadeDeInimigoExclusivo(
        fasePrimordial,
        CONFIG.wave.primeiraWaveBesouroDeAmbar,
        CONFIG.wave.wavesPorNovoBesouroDeAmbar
    );
    inimigosTriceratoposParaCriar = calcularQuantidadeDeInimigoExclusivo(
        fasePrimordial,
        CONFIG.wave.primeiraWaveTriceratopo,
        CONFIG.wave.wavesPorNovoTriceratopo
    );
    inimigosDronesCacadoresParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseFuturista,
        CONFIG.wave.primeiraWaveDroneCacador,
        CONFIG.wave.wavesPorNovoDroneCacador
    );
    inimigosRobosReparadoresParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseFuturista,
        CONFIG.wave.primeiraWaveRoboReparador,
        CONFIG.wave.wavesPorNovoRoboReparador
    );
    inimigosSentinelasDeEscudoParaCriar = calcularQuantidadeDeInimigoExclusivo(
        faseFuturista,
        CONFIG.wave.primeiraWaveSentinelaDeEscudo,
        CONFIG.wave.wavesPorNovaSentinelaDeEscudo
    );
    inimigosSabotadoresParaCriar = wave >= CONFIG.wave.primeiraWaveSabotador
        ? 1 + Math.floor(
            (wave - CONFIG.wave.primeiraWaveSabotador) / CONFIG.wave.wavesPorNovoSabotador
        )
        : 0;
    inimigosChefesParaCriar = wave % CONFIG.wave.intervaloDeBoss === 0 ? 1 : 0;
    avisoBossExpiraEm = inimigosChefesParaCriar > 0 ? Date.now() + 2500 : 0;

    inimigosParaCriar = inimigosRoxosParaCriar
        + inimigosVermelhosParaCriar
        + inimigosRapidosParaCriar
        + inimigosSabotadoresParaCriar
        + inimigosEscorpioesParaCriar
        + inimigosMumiasParaCriar
        + inimigosLobosDeGeloParaCriar
        + inimigosYetisParaCriar
        + inimigosMacacosSaqueadoresParaCriar
        + inimigosGorilasDaSelvaParaCriar
        + inimigosOncasDaSelvaParaCriar
        + inimigosRaposasLadinasParaCriar
        + inimigosJavalisFuriososParaCriar
        + inimigosCorujasSombriasParaCriar
        + inimigosMorcegosDeFogoParaCriar
        + inimigosLagartosVulcanicosParaCriar
        + inimigosGolemsDeMagmaParaCriar
        + inimigosMosquitosDoBrejoParaCriar
        + inimigosSaposVenenososParaCriar
        + inimigosGuardioesDeLodoParaCriar
        + inimigosRaptorsAncestraisParaCriar
        + inimigosBesourosDeAmbarParaCriar
        + inimigosTriceratoposParaCriar
        + inimigosDronesCacadoresParaCriar
        + inimigosRobosReparadoresParaCriar
        + inimigosSentinelasDeEscudoParaCriar
        + inimigosChefesParaCriar;
    proximoInimigoEm = Date.now();
    proximaWaveEm = 0;
    tentarExibirFliperamaNaWaveAtual();
    atualizarPulsoTemporalNoPosto();
}

function concederCreditosDosGeradoresAposWave(waveConcluida = wave) {
    let totalGerado = 0;

    for (const torre of torres) {
        const configuracaoBase = obterConfiguracaoDaTorre(torre.tipo);

        if (!configuracaoBase.creditosPorWave) {
            continue;
        }

        const primeiraWaveElegivel = torre.primeiraWaveParaGerarCreditos
            ?? waveConcluida + 1;
        const ultimaWavePaga = torre.ultimaWaveComCreditosGerados ?? 0;

        if (
            waveConcluida < primeiraWaveElegivel
            || ultimaWavePaga >= waveConcluida
        ) {
            continue;
        }

        const creditosGerados = obterConfiguracaoAtualDaTorre(torre).creditosPorWave;
        torre.ultimaWaveComCreditosGerados = waveConcluida;
        totalGerado += creditosGerados;
        avisosDeCreditosGerados.push({
            x: torre.x,
            y: torre.y - obterEstiloDaTorre(torre).raioBase - 12,
            creditos: creditosGerados,
            quadrosRestantes: CONFIG.torre.duracaoAvisoCreditosGeradosEmQuadros,
            totalDeQuadros: CONFIG.torre.duracaoAvisoCreditosGeradosEmQuadros
        });
    }

    if (totalGerado > 0) {
        dinheiro += totalGerado;
        mostrarAviso(localizar("Gerador produziu {creditos} créditos.", {
            creditos: totalGerado
        }));
    }

    return totalGerado;
}

function atualizarWaves() {
    const agora = Date.now();

    if (inimigosParaCriar > 0) {
        if (agora >= proximoInimigoEm) {
            const tipoDoInimigo = obterProximoTipoDeInimigo();

            criarInimigo(tipoDoInimigo);
            inimigosParaCriar--;

            if (tipoEhBoss(tipoDoInimigo)) {
                inimigosChefesParaCriar--;
            } else if (tipoDoInimigo === "sentinelaDeEscudo") {
                inimigosSentinelasDeEscudoParaCriar--;
            } else if (tipoDoInimigo === "roboReparador") {
                inimigosRobosReparadoresParaCriar--;
            } else if (tipoDoInimigo === "droneCacador") {
                inimigosDronesCacadoresParaCriar--;
            } else if (tipoDoInimigo === "triceratopo") {
                inimigosTriceratoposParaCriar--;
            } else if (tipoDoInimigo === "besouroDeAmbar") {
                inimigosBesourosDeAmbarParaCriar--;
            } else if (tipoDoInimigo === "raptorAncestral") {
                inimigosRaptorsAncestraisParaCriar--;
            } else if (tipoDoInimigo === "blocoInstavel") {
                blocosInstaveisParaCriar--;
            } else if (tipoDoInimigo === "erroVeloz") {
                errosVelozesParaCriar--;
            } else if (tipoDoInimigo === "pixelCorrompido") {
                pixelsCorrompidosParaCriar--;
            } else if (tipoDoInimigo === "guardiaoDeLodo") {
                inimigosGuardioesDeLodoParaCriar--;
            } else if (tipoDoInimigo === "sapoVenenoso") {
                inimigosSaposVenenososParaCriar--;
            } else if (tipoDoInimigo === "mosquitoDoBrejo") {
                inimigosMosquitosDoBrejoParaCriar--;
            } else if (tipoDoInimigo === "golemDeMagma") {
                inimigosGolemsDeMagmaParaCriar--;
            } else if (tipoDoInimigo === "lagartoVulcanico") {
                inimigosLagartosVulcanicosParaCriar--;
            } else if (tipoDoInimigo === "morcegoDeFogo") {
                inimigosMorcegosDeFogoParaCriar--;
            } else if (tipoDoInimigo === "javaliFurioso") {
                inimigosJavalisFuriososParaCriar--;
            } else if (tipoDoInimigo === "corujaSombria") {
                inimigosCorujasSombriasParaCriar--;
            } else if (tipoDoInimigo === "raposaLadina") {
                inimigosRaposasLadinasParaCriar--;
            } else if (tipoDoInimigo === "gorilaDaSelva") {
                inimigosGorilasDaSelvaParaCriar--;
            } else if (tipoDoInimigo === "oncaDaSelva") {
                inimigosOncasDaSelvaParaCriar--;
            } else if (tipoDoInimigo === "macacoSaqueador") {
                inimigosMacacosSaqueadoresParaCriar--;
            } else if (tipoDoInimigo === "sabotador") {
                inimigosSabotadoresParaCriar--;
            } else if (tipoDoInimigo === "yeti") {
                inimigosYetisParaCriar--;
            } else if (tipoDoInimigo === "loboDeGelo") {
                inimigosLobosDeGeloParaCriar--;
            } else if (tipoDoInimigo === "mumia") {
                inimigosMumiasParaCriar--;
            } else if (tipoDoInimigo === "escorpiao") {
                inimigosEscorpioesParaCriar--;
            } else if (tipoDoInimigo === "elite") {
                inimigosRoxosParaCriar--;
            } else if (tipoDoInimigo === "normal") {
                inimigosVermelhosParaCriar--;
            } else {
                inimigosRapidosParaCriar--;
            }

            proximoInimigoEm = agora + CONFIG.wave.intervaloEntreInimigos;
        }

        return;
    }

    if (inimigos.length === 0) {
        concederCreditosDosGeradoresAposWave(wave);
        disponibilizarRadioProjetoRelogio();

        if (!modoWavesInfinitas && wave >= CONFIG.wave.ultimaWave) {
            finalizarPartidaComVitoria();
            return;
        }

        if (deveOferecerBonusPosBoss()) {
            abrirPainelBonusPosBoss();
            return;
        }

        if (proximaWaveEm === 0) {
            proximaWaveEm = agora + CONFIG.wave.pausaEntreWaves;
            avisarProximoCaminhoVivo(wave + 1);
        } else if (agora >= proximaWaveEm) {
            iniciarProximaWave();
        }
    }
}

function obterProximoTipoDeInimigo() {
    if (inimigosChefesParaCriar > 0) {
        return obterTipoDeBossDaFase();
    }

    if (blocosInstaveisParaCriar > 0) {
        return "blocoInstavel";
    }

    if (errosVelozesParaCriar > 0) {
        return "erroVeloz";
    }

    if (pixelsCorrompidosParaCriar > 0) {
        return "pixelCorrompido";
    }

    if (inimigosSentinelasDeEscudoParaCriar > 0) {
        return "sentinelaDeEscudo";
    }

    if (inimigosRobosReparadoresParaCriar > 0) {
        return "roboReparador";
    }

    if (inimigosDronesCacadoresParaCriar > 0) {
        return "droneCacador";
    }

    if (inimigosTriceratoposParaCriar > 0) {
        return "triceratopo";
    }

    if (inimigosBesourosDeAmbarParaCriar > 0) {
        return "besouroDeAmbar";
    }

    if (inimigosRaptorsAncestraisParaCriar > 0) {
        return "raptorAncestral";
    }

    if (inimigosGuardioesDeLodoParaCriar > 0) {
        return "guardiaoDeLodo";
    }

    if (inimigosSaposVenenososParaCriar > 0) {
        return "sapoVenenoso";
    }

    if (inimigosMosquitosDoBrejoParaCriar > 0) {
        return "mosquitoDoBrejo";
    }

    if (inimigosGolemsDeMagmaParaCriar > 0) {
        return "golemDeMagma";
    }

    if (inimigosLagartosVulcanicosParaCriar > 0) {
        return "lagartoVulcanico";
    }

    if (inimigosMorcegosDeFogoParaCriar > 0) {
        return "morcegoDeFogo";
    }

    if (inimigosJavalisFuriososParaCriar > 0) {
        return "javaliFurioso";
    }

    if (inimigosCorujasSombriasParaCriar > 0) {
        return "corujaSombria";
    }

    if (inimigosRaposasLadinasParaCriar > 0) {
        return "raposaLadina";
    }

    if (inimigosGorilasDaSelvaParaCriar > 0) {
        return "gorilaDaSelva";
    }

    if (inimigosOncasDaSelvaParaCriar > 0) {
        return "oncaDaSelva";
    }

    if (inimigosMacacosSaqueadoresParaCriar > 0) {
        return "macacoSaqueador";
    }

    if (inimigosYetisParaCriar > 0) {
        return "yeti";
    }

    if (inimigosLobosDeGeloParaCriar > 0) {
        return "loboDeGelo";
    }

    if (inimigosMumiasParaCriar > 0) {
        return "mumia";
    }

    if (inimigosEscorpioesParaCriar > 0) {
        return "escorpiao";
    }

    if (inimigosSabotadoresParaCriar > 0) {
        return "sabotador";
    }

    if (inimigosRoxosParaCriar > 0) {
        return "elite";
    }

    if (inimigosVermelhosParaCriar > 0) {
        return "normal";
    }

    return "rapido";
}

function oncaEstaEmDisparada(inimigo) {
    const configuracao = CONFIG.inimigo.oncaDaSelva;

    return inimigo.tipo === "oncaDaSelva"
        && Number.isFinite(inimigo.vida)
        && Number.isFinite(inimigo.vidaMaxima)
        && inimigo.vida > 0
        && inimigo.vida <= inimigo.vidaMaxima * configuracao.percentualVidaParaDisparada;
}

function javaliEstaEmArrancada(inimigo, agora = Date.now()) {
    return inimigo.tipo === "javaliFurioso"
        && agora < (inimigo.arrancadaExpiraEm || 0);
}

function obterMultiplicadorDaArrancadaDoJavali(inimigo, agora) {
    if (inimigo.tipo !== "javaliFurioso") {
        return 1;
    }

    const configuracao = CONFIG.inimigo.javaliFurioso;
    if (
        inimigo.proximaArrancadaEm > 0
        && agora >= inimigo.proximaArrancadaEm
    ) {
        inimigo.arrancadaExpiraEm = agora + configuracao.duracaoArrancada;
        inimigo.proximaArrancadaEm = agora + configuracao.intervaloEntreArrancadas;
    }

    return javaliEstaEmArrancada(inimigo, agora)
        ? configuracao.multiplicadorVelocidadeNaArrancada
        : 1;
}

function obterVelocidadeAtualDoInimigo(inimigo, agora = Date.now()) {
    if (
        agora < (inimigo.congeladoAte || 0)
        || agora < (inimigo.atordoadoPelaTorreSismicaAte || 0)
    ) {
        return 0;
    }

    if (!tipoEhBoss(inimigo.tipo) && agora < pulsoTemporalNormalExpiraEm) {
        return 0;
    }

    const multiplicadorDeDisparada = oncaEstaEmDisparada(inimigo)
        ? CONFIG.inimigo.oncaDaSelva.multiplicadorVelocidadeEmDisparada
        : 1;
    const multiplicadorDaArrancada = obterMultiplicadorDaArrancadaDoJavali(inimigo, agora);
    const multiplicadorDaErupcao = inimigo.tipo === "bossVulcanico" && inimigo.formaDeErupcao
        ? CONFIG.inimigo.bossVulcanico.multiplicadorVelocidadeEmErupcao
        : 1;
    const multiplicadorDoPulsoTemporal = tipoEhBoss(inimigo.tipo)
        && agora < pulsoTemporalBossExpiraEm
        ? 1 - CONFIG.pulsoTemporal.percentualLentidaoBosses
        : 1;
    const multiplicadorDoTrilho = typeof inimigoEstaEmTrilhoDeImpulso === "function"
        && inimigoEstaEmTrilhoDeImpulso(inimigo)
        ? CONFIG.metropoleNeon.multiplicadorVelocidadeNosTrilhos
        : 1;
    const velocidadeComHabilidades = inimigo.velocidade
        * multiplicadorDeDisparada
        * multiplicadorDaArrancada
        * multiplicadorDaErupcao
        * multiplicadorDoPulsoTemporal
        * multiplicadorDoTrilho;

    if (agora < (inimigo.lentidaoExpiraEm || 0)) {
        return velocidadeComHabilidades * (1 - (inimigo.percentualLentidao || 0));
    }

    inimigo.percentualLentidao = 0;
    return velocidadeComHabilidades;
}

function moverInimigos(multiplicadorDeMovimento = 1) {
    const agora = Date.now();

    for (let i = inimigos.length - 1; i >= 0; i--) {
        const inimigo = inimigos[i];
        const caminhoAtual = obterCaminhoDoInimigo(inimigo);
        atualizarDanoDaQueimaduraNoInimigo(inimigo, agora);
        atualizarRegeneracaoDaHidra(inimigo, multiplicadorDeMovimento);
        atualizarReparoDoRobo(inimigo, agora);

        if (inimigo.vida <= 0) {
            registrarInimigoEliminadoParaMissoes();
            registrarInimigoEliminadoParaConquistas();
            registrarInimigoDerrotadoNoAlbum(inimigo.tipo);
            inimigos.splice(i, 1);
            continue;
        }

        if (inimigoAtingiuTorreFinal(inimigo)) {
            finalizarPartida();
            return;
        }

        if (inimigo.alvo >= caminhoAtual.length) {
            finalizarPartida();
            return;
        }

        const destino = caminhoAtual[inimigo.alvo];
        const dx = destino.x - inimigo.x;
        const dy = destino.y - inimigo.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        const velocidadeAtual = obterVelocidadeAtualDoInimigo(inimigo, agora);
        const deslocamento = velocidadeAtual * multiplicadorDeMovimento;

        if (deslocamento === 0) {
            continue;
        }

        if (distancia <= deslocamento) {
            inimigo.x = destino.x;
            inimigo.y = destino.y;
            inimigo.alvo++;
        } else {
            inimigo.x += (dx / distancia) * deslocamento;
            inimigo.y += (dy / distancia) * deslocamento;
        }

        if (inimigoAtingiuTorreFinal(inimigo)) {
            finalizarPartida();
            return;
        }
    }
}

function aplicarDanoEmArea(x, y, raio, dano) {
    const inimigosPresentesAntesDoImpacto = [...inimigos];

    for (const inimigo of inimigosPresentesAntesDoImpacto) {
        if (
            inimigo.vida > 0
            && Math.hypot(inimigo.x - x, inimigo.y - y) <= raio
        ) {
            aplicarDanoAoInimigo(inimigo, dano);
        }
    }
}

function detonarExplosivo(explosivo, configuracao) {
    aplicarDanoEmArea(
        explosivo.x,
        explosivo.y,
        configuracao.raioExplosao,
        configuracao.dano
    );

    if (configuracao.efeitoGlacial) {
        for (const inimigo of inimigos) {
            if (
                inimigo.vida > 0
                && Math.hypot(inimigo.x - explosivo.x, inimigo.y - explosivo.y)
                    <= configuracao.raioExplosao
            ) {
                aplicarEfeitoGlacial(inimigo, configuracao.efeitoGlacial);
            }
        }
    }

    explosoesDosExplosivos.push({
        x: explosivo.x,
        y: explosivo.y,
        raio: configuracao.raioExplosao,
        quadrosRestantes: configuracao.duracaoExplosaoEmQuadros,
        totalDeQuadros: configuracao.duracaoExplosaoEmQuadros,
        tipoVisual: configuracao.tipoVisualDaExplosao || "explosao",
        cor: configuracao.visualBase.corCanhao
    });
}

function atualizarMinasTerrestres() {
    for (let indice = minasTerrestres.length - 1; indice >= 0; indice--) {
        const mina = minasTerrestres[indice];
        const configuracao = obterConfiguracaoDaTorre(mina.tipo);
        const inimigoQueTocou = inimigos.find((inimigo) => (
            inimigo.vida > 0
            && Math.hypot(inimigo.x - mina.x, inimigo.y - mina.y)
                <= configuracao.raioDeContato + inimigo.tamanho
        ));

        if (!inimigoQueTocou) {
            continue;
        }

        minasTerrestres.splice(indice, 1);
        detonarExplosivo(mina, configuracao);
    }
}

function atualizarBombasPesadas(agora = Date.now()) {
    for (let indice = bombasPesadas.length - 1; indice >= 0; indice--) {
        const bomba = bombasPesadas[indice];

        if (!bomba.ativada || agora < bomba.explodeEm) {
            continue;
        }

        bombasPesadas.splice(indice, 1);
        detonarExplosivo(bomba, obterConfiguracaoDaTorre(bomba.tipo));
    }
}

function atualizarExplosoesDosExplosivos(multiplicadorDeMovimento = 1) {
    for (let indice = explosoesDosExplosivos.length - 1; indice >= 0; indice--) {
        explosoesDosExplosivos[indice].quadrosRestantes -= multiplicadorDeMovimento;

        if (explosoesDosExplosivos[indice].quadrosRestantes <= 0) {
            explosoesDosExplosivos.splice(indice, 1);
        }
    }
}

function atualizarAvisosDeCreditosGerados(multiplicadorDeMovimento = 1) {
    for (let indice = avisosDeCreditosGerados.length - 1; indice >= 0; indice--) {
        avisosDeCreditosGerados[indice].quadrosRestantes -= multiplicadorDeMovimento;

        if (avisosDeCreditosGerados[indice].quadrosRestantes <= 0) {
            avisosDeCreditosGerados.splice(indice, 1);
        }
    }
}

// Interação com o mapa
function obterPosicaoNoMapaPeloEvento(evento) {
    const retangulo = canvas.getBoundingClientRect();

    return {
        x: (evento.clientX - retangulo.left) * (canvas.width / retangulo.width),
        y: (evento.clientY - retangulo.top) * (canvas.height / retangulo.height)
    };
}

function encontrarInimigoNaPosicao(x, y) {
    for (let indice = inimigos.length - 1; indice >= 0; indice--) {
        const inimigo = inimigos[indice];
        const raioDeInteracao = inimigo.tamanho + 8;

        if (Math.hypot(inimigo.x - x, inimigo.y - y) <= raioDeInteracao) {
            return inimigo;
        }
    }

    return null;
}

canvas.addEventListener("mousemove", (evento) => {
    if (!jogoIniciado || partidaEncerrada) {
        posicaoCursorNoMapa = null;
        canvas.classList.remove("inimigo-sob-cursor");
        canvas.classList.remove("fliperama-sob-cursor");
        canvas.classList.remove("radio-sob-cursor");
        return;
    }

    posicaoCursorNoMapa = obterPosicaoNoMapaPeloEvento(evento);
    const inimigoSobCursor = encontrarInimigoNaPosicao(
        posicaoCursorNoMapa.x,
        posicaoCursorNoMapa.y
    );
    canvas.classList.toggle("inimigo-sob-cursor", Boolean(inimigoSobCursor));
    canvas.classList.toggle(
        "fliperama-sob-cursor",
        fliperamaEstaNaPosicao(posicaoCursorNoMapa.x, posicaoCursorNoMapa.y)
    );
    canvas.classList.toggle(
        "radio-sob-cursor",
        radioProjetoRelogioEstaNaPosicao(posicaoCursorNoMapa.x, posicaoCursorNoMapa.y)
    );
});

canvas.addEventListener("mouseleave", () => {
    posicaoCursorNoMapa = null;
    canvas.classList.remove("inimigo-sob-cursor");
    canvas.classList.remove("fliperama-sob-cursor");
    canvas.classList.remove("radio-sob-cursor");
});

// Torres
canvas.addEventListener("click", (evento) => {
    if (!jogoIniciado || partidaEncerrada) {
        return;
    }

    if (tutorialAtivo && passoTutorial < 3) {
        mostrarAviso(localizar("Siga a instrução do treinamento para continuar."));
        return;
    }

    const { x, y } = obterPosicaoNoMapaPeloEvento(evento);
    if (radioProjetoRelogioEstaNaPosicao(x, y)) {
        mostrarTransmissaoProjetoRelogio(true);
        return;
    }

    if (fliperamaEstaNaPosicao(x, y)) {
        iniciarMinigameFliperama();
        return;
    }

    const configuracaoDaConstrucao = obterConfiguracaoDaTorre();
    const construcaoEhMina = configuracaoDaConstrucao.tipoDeItem === "mina";
    const construcaoEhBomba = configuracaoDaConstrucao.tipoDeItem === "bomba";
    const posicaoDaMina = construcaoEhMina
        ? obterPosicaoMaisProximaNoCaminho(x, y)
        : null;
    const torreClicada = encontrarTorreNaPosicao(x, y);
    const minaClicada = encontrarMinaNaPosicao(x, y);
    const bombaClicada = encontrarBombaNaPosicao(x, y);

    if (tutorialAtivo && passoTutorial === 4 && !torreClicada) {
        mostrarAviso(localizar("Clique na Torre padrão que você acabou de construir."));
        return;
    }

    if (torreClicada) {
        selecionarTorre(torreClicada);
    } else if (minaClicada) {
        const configuracaoDaMinaClicada = obterConfiguracaoDaTorre(minaClicada.tipo);
        torreSelecionada = null;
        atualizarBotoesDaTorre();
        mostrarAviso(localizar("Mina armada · {dano} de dano em {raio} px.", {
            dano: configuracaoDaMinaClicada.dano,
            raio: configuracaoDaMinaClicada.raioExplosao
        }));
    } else if (bombaClicada) {
        const configuracaoDaBomba = obterConfiguracaoDaTorre(bombaClicada.tipo);
        torreSelecionada = null;
        atualizarBotoesDaTorre();

        if (bombaClicada.ativada) {
            const segundosRestantes = Math.max(
                0,
                (bombaClicada.explodeEm - Date.now()) / 1000
            ).toFixed(1);
            mostrarAviso(localizar("Pavio aceso · explosão em {segundos}s.", {
                segundos: segundosRestantes
            }));
        } else {
            bombaClicada.ativada = true;
            bombaClicada.explodeEm = Date.now() + configuracaoDaBomba.tempoDoPavio;
            mostrarAviso(localizar(
                "Pavio aceso! A Bomba Pesada explode em {segundos} segundo.",
                {
                    segundos: (configuracaoDaBomba.tempoDoPavio / 1000)
                        .toLocaleString(idiomaAtual)
                }
            ));
        }
    } else if (construcaoEhMina && !estaNoCaminho(x, y)) {
        mostrarAviso(localizar("A {nome} só pode ser colocada no caminho.", {
            nome: obterNomeLocalizado(configuracaoDaConstrucao)
        }));
    } else if (!construcaoEhMina && estaNoCaminho(x, y)) {
        mostrarAviso(localizar("Não é possível colocar torres no caminho."));
    } else if (
        fliperamaNoMapa
        && Math.hypot(fliperamaNoMapa.x - x, fliperamaNoMapa.y - y)
            < CONFIG.fliperama.distanciaMinimaDasTorres
    ) {
        mostrarAviso(localizar("Deixe espaço livre ao redor do fliperama."));
    } else if (estaPertoDoRadioProjetoRelogio(x, y)) {
        mostrarAviso(localizar("Deixe espaço livre ao redor do rádio."));
    } else if (!torreEstaDesbloqueada(tipoDeTorreParaConstruir)) {
        const configuracaoBloqueada = obterConfiguracaoDaTorre(tipoDeTorreParaConstruir);
        tipoDeTorreParaConstruir = obterPrimeiraDefesaDisponivelParaPartida();
        atualizarBotoesDeConstrucao();
        mostrarAviso(obterMensagemDeTorreBloqueada(configuracaoBloqueada));
    } else if (atingiuLimiteDoTipoDeTorre(tipoDeTorreParaConstruir)) {
        mostrarAviso(localizar("Limite de {limite} {nome} por partida.", {
            limite: configuracaoDaConstrucao.limitePorPartida,
            nome: obterNomeLocalizado(configuracaoDaConstrucao)
        }));
    } else if (dinheiro < configuracaoDaConstrucao.custo) {
        mostrarAviso(localizar("Dinheiro insuficiente para construir {nome}.", {
            nome: obterNomeLocalizado(configuracaoDaConstrucao)
        }));
    } else if (
        !configuracaoDaConstrucao.naoContaNoLimiteDeTorres
        && torres.length >= obterLimiteDeTorres()
    ) {
        mostrarAviso(localizar("Você já atingiu o limite de torres."));
    } else if (
        construcaoEhMina
        && estaPertoDeOutraMina(
            posicaoDaMina.x,
            posicaoDaMina.y,
            configuracaoDaConstrucao.distanciaMinimaEntreMinas
        )
    ) {
        mostrarAviso(localizar("Não coloque minas muito perto umas das outras."));
    } else if (
        construcaoEhBomba
        && estaPertoDeOutraDefesaConsumivel(
            bombasPesadas,
            x,
            y,
            configuracaoDaConstrucao.distanciaMinimaEntreBombas
        )
    ) {
        mostrarAviso(localizar("Não coloque Bombas Pesadas muito perto umas das outras."));
    } else if (!construcaoEhMina && estaPertoDeOutraTorreOuBomba(x, y)) {
        mostrarAviso(localizar("Não coloque esta defesa muito perto de torres ou Bombas Pesadas."));
    } else if (construcaoEhBomba) {
        bombasPesadas.push({
            x,
            y,
            tipo: tipoDeTorreParaConstruir,
            ativada: false,
            explodeEm: 0
        });
        dinheiro -= configuracaoDaConstrucao.custo;
        mostrarAviso(localizar(
            "Bomba posicionada · clique nela para acender o pavio · {quantidade}/{limite} no mapa.",
            {
                quantidade: bombasPesadas.length,
                limite: configuracaoDaConstrucao.limitePorPartida
            }
        ));
    } else if (construcaoEhMina) {
        minasTerrestres.push({
            x: posicaoDaMina.x,
            y: posicaoDaMina.y,
            tipo: tipoDeTorreParaConstruir
        });
        dinheiro -= configuracaoDaConstrucao.custo;
        mostrarAviso(localizar("Mina armada · {quantidade}/{limite} no mapa.", {
            quantidade: minasTerrestres.length,
            limite: configuracaoDaConstrucao.limitePorPartida
        }));
    } else {
        const novaTorre = {
            x,
            y,
            tipo: tipoDeTorreParaConstruir,
            anguloDaMira: -Math.PI / 2,
            modoDeAlvo: CONFIG.torre.modoDeAlvoInicial,
            alvoAtual: null,
            velocidadeTiro: configuracaoDaConstrucao.velocidadeTiro || CONFIG.tiro.velocidade,
            nivel: 0,
            valorInvestido: configuracaoDaConstrucao.custo,
            ultimoTiro: 0,
            tirosRecebidos: 0,
            ...(configuracaoDaConstrucao.creditosPorWave
                ? {
                    primeiraWaveParaGerarCreditos: wave + 1,
                    ultimaWaveComCreditosGerados: wave
                }
                : {}),
            ...(configuracaoDaConstrucao.efeitoSismico
                ? {
                    cargaSismica: 0,
                    inimigosDentroDoAlcanceSismico: new Set(),
                    impactoSismicoSecundarioEm: 0
                }
                : {})
        };
        atualizarAtributosDaTorreComBonus(novaTorre);
        torres.push(novaTorre);

        dinheiro -= configuracaoDaConstrucao.custo;

        if (
            tutorialAtivo
            && passoTutorial === 3
            && novaTorre.tipo === "padrao"
        ) {
            avancarTutorialPara(4);
        }
    }
});

function encontrarTorreNaPosicao(x, y) {
    return torres.find((torre) => {
        const estilo = obterEstiloDaTorre(torre);
        return Math.hypot(torre.x - x, torre.y - y) <= estilo.raioBase;
    });
}

function encontrarMinaNaPosicao(x, y) {
    return minasTerrestres.find((mina) => {
        const configuracao = obterConfiguracaoDaTorre(mina.tipo);
        return Math.hypot(mina.x - x, mina.y - y) <= configuracao.raioDeContato;
    });
}

function encontrarBombaNaPosicao(x, y) {
    return bombasPesadas.find((bomba) => {
        const configuracao = obterConfiguracaoDaTorre(bomba.tipo);
        return Math.hypot(bomba.x - x, bomba.y - y) <= configuracao.visualBase.raioBase + 8;
    });
}

function selecionarTorre(torre) {
    torreSelecionada = torre;
    atualizarBotoesDaTorre();
    const configuracao = obterConfiguracaoDaTorre(torre.tipo);
    const nomeDaTorre = obterNomeLocalizado(configuracao);
    mostrarAviso(configuracaoPossuiMelhorias(configuracao)
        ? localizar("{nome} nível {nivel} selecionado.", {
            nome: nomeDaTorre,
            nivel: torre.nivel
        })
        : localizar("{nome} selecionado.", { nome: nomeDaTorre }));

    if (tutorialAtivo && passoTutorial === 4) {
        avancarTutorialPara(5);
    }
}

function melhorarTorreSelecionada() {
    if (tutorialBloqueiaAcoesDaTorre()) {
        return;
    }

    if (!torreSelecionada) {
        mostrarAviso(localizar("Selecione uma torre para melhorar."));
        return;
    }

    const configuracao = obterConfiguracaoDaTorre(torreSelecionada.tipo);
    const proximaMelhoria = configuracao.melhorias[torreSelecionada.nivel];

    if (!proximaMelhoria) {
        mostrarAviso(localizar("Esta torre já está no nível máximo."));
        return;
    }

    if (dinheiro < proximaMelhoria.custo) {
        mostrarAviso(localizar("Dinheiro insuficiente para esta melhoria."));
        return;
    }

    dinheiro -= proximaMelhoria.custo;
    torreSelecionada.nivel++;
    torreSelecionada.valorInvestido += proximaMelhoria.custo;
    atualizarAtributosDaTorreComBonus(torreSelecionada);

    atualizarBotoesDaTorre();
    mostrarAviso(localizar("{nome} melhorado para o nível {nivel}.", {
        nome: obterNomeLocalizado(configuracao),
        nivel: torreSelecionada.nivel
    }));
}

function venderTorreSelecionada() {
    if (tutorialBloqueiaAcoesDaTorre()) {
        return;
    }

    if (!torreSelecionada) {
        mostrarAviso(localizar("Selecione uma torre para vender."));
        return;
    }

    const valorDaVenda = calcularValorDeVenda(torreSelecionada);
    dinheiro += valorDaVenda;
    torres.splice(torres.indexOf(torreSelecionada), 1);
    torreSelecionada = null;

    atualizarBotoesDaTorre();
    mostrarAviso(localizar("Torre vendida por {valor}.", { valor: valorDaVenda }));
}

function calcularValorDeVenda(torre) {
    return Math.floor(torre.valorInvestido * CONFIG.torre.percentualDeVenda);
}

function obterDescricaoDaTorreSelecionada(torre, configuracao, configuracaoAtual) {
    const nomeDaTorre = obterNomeLocalizado(configuracao);

    if (configuracao.efeitoSismico) {
        return localizar("{nome} · Nível {nivel} · Carga {atual}/{total} · Empurra {distancia} px", {
            nome: nomeDaTorre,
            nivel: torre.nivel,
            atual: torre.cargaSismica || 0,
            total: configuracaoAtual.efeitoSismico.cargasNecessarias,
            distancia: configuracaoAtual.efeitoSismico.distanciaDoEmpurrao
        });
    }

    if (configuracao.creditosPorWave) {
        return localizar("{nome} · Nível {nivel} · Produção {creditos} créditos por wave", {
            nome: nomeDaTorre,
            nivel: torre.nivel,
            creditos: configuracaoAtual.creditosPorWave
        });
    }

    if (configuracao.percentualBonusCadencia) {
        return localizar("{nome} · Cadência próxima +{percentual}% · Alcance {alcance}", {
            nome: nomeDaTorre,
            percentual: obterPercentualInteiro(configuracao.percentualBonusCadencia),
            alcance: torre.alcance
        });
    }

    if (configuracao.naoAtira) {
        return localizar("{nome} · Resistência {atual}/{total} tiros", {
            nome: nomeDaTorre,
            atual: obterResistenciaDaTorre(torre) - (torre.tirosRecebidos || 0),
            total: obterResistenciaDaTorre(torre)
        });
    }

    const parametros = {
        nome: nomeDaTorre,
        nivel: torre.nivel,
        dano: torre.dano,
        raio: configuracaoAtual.raioDanoEmArea,
        alcance: torre.alcance
    };

    if (configuracaoAtual.raioDanoEmArea) {
        return configuracaoPossuiMelhorias(configuracao)
            ? localizar("{nome} · Nível {nivel} · Dano {dano} em {raio} px · Alcance {alcance}", parametros)
            : localizar("{nome} · Dano {dano} em {raio} px · Alcance {alcance}", parametros);
    }

    return configuracaoPossuiMelhorias(configuracao)
        ? localizar("{nome} · Nível {nivel} · Dano {dano} · Alcance {alcance}", parametros)
        : localizar("{nome} · Dano {dano} · Alcance {alcance}", parametros);
}

function atualizarBotoesDaTorre() {
    const configuracao = torreSelecionada
        ? obterConfiguracaoDaTorre(torreSelecionada.tipo)
        : null;
    const configuracaoAtual = torreSelecionada
        ? obterConfiguracaoAtualDaTorre(torreSelecionada)
        : null;

    descricaoCentralTorre.textContent = torreSelecionada
        ? obterDescricaoDaTorreSelecionada(
            torreSelecionada,
            configuracao,
            configuracaoAtual
        )
        : localizar("Selecione uma torre no mapa");
    atualizarBotaoMelhorar();
    atualizarBotaoVender();
    atualizarBotaoModoDeAlvo();
}

function obterModoDeAlvoDaTorre(torre) {
    const modoAtual = torre?.modoDeAlvo || CONFIG.torre.modoDeAlvoInicial;
    return CONFIG.torre.modosDeAlvo.find((modo) => modo.id === modoAtual)
        || CONFIG.torre.modosDeAlvo[0];
}

function atualizarBotaoModoDeAlvo() {
    if (!torreSelecionada) {
        botaoModoDeAlvo.disabled = true;
        botaoModoDeAlvo.textContent = localizar("Alvo: selecione uma torre");
        return;
    }

    if (obterConfiguracaoDaTorre(torreSelecionada.tipo).naoAtira) {
        const configuracao = obterConfiguracaoDaTorre(torreSelecionada.tipo);
        botaoModoDeAlvo.disabled = true;
        botaoModoDeAlvo.textContent = configuracao.efeitoSismico
            ? localizar("Impacto automático")
            : configuracao.creditosPorWave
                ? localizar("Gerador não atira")
                : configuracao.percentualBonusCadencia
                    ? localizar("Suporte não atira")
                    : localizar("Isca não atira");
        return;
    }

    const modo = obterModoDeAlvoDaTorre(torreSelecionada);
    botaoModoDeAlvo.disabled = false;
    botaoModoDeAlvo.textContent = localizar("Alvo: {modo}", {
        modo: obterNomeLocalizado(modo)
    });
}

function alternarModoDeAlvoDaTorreSelecionada() {
    if (tutorialBloqueiaAcoesDaTorre()) {
        return;
    }

    if (!torreSelecionada) {
        mostrarAviso(localizar("Selecione uma torre para mudar o alvo."));
        return;
    }

    if (obterConfiguracaoDaTorre(torreSelecionada.tipo).naoAtira) {
        const configuracao = obterConfiguracaoDaTorre(torreSelecionada.tipo);
        mostrarAviso(localizar("{nome} não possui modo de alvo.", {
            nome: obterNomeLocalizado(configuracao)
        }));
        return;
    }

    const modoAtual = obterModoDeAlvoDaTorre(torreSelecionada);
    const indiceAtual = CONFIG.torre.modosDeAlvo.indexOf(modoAtual);
    const proximoModo = CONFIG.torre.modosDeAlvo[
        (indiceAtual + 1) % CONFIG.torre.modosDeAlvo.length
    ];
    torreSelecionada.modoDeAlvo = proximoModo.id;
    torreSelecionada.alvoAtual = null;
    atualizarBotaoModoDeAlvo();
    mostrarAviso(localizar("Prioridade de alvo: {modo}.", {
        modo: obterNomeLocalizado(proximoModo)
    }));
}

function atualizarBotaoMelhorar() {
    if (!torreSelecionada) {
        botaoMelhorar.disabled = true;
        botaoMelhorar.textContent = localizar("Selecione uma torre");
        return;
    }

    const configuracao = obterConfiguracaoDaTorre(torreSelecionada.tipo);
    const proximaMelhoria = configuracao.melhorias[torreSelecionada.nivel];

    if (!proximaMelhoria) {
        botaoMelhorar.disabled = true;
        botaoMelhorar.textContent = localizar("Torre no nível máximo");
        return;
    }

    botaoMelhorar.disabled = false;
    botaoMelhorar.textContent = localizar("Melhorar torre ({custo})", {
        custo: proximaMelhoria.custo
    });
}

function atualizarBotaoVender() {
    if (!torreSelecionada) {
        botaoVender.disabled = true;
        botaoVender.textContent = localizar("Selecione uma torre");
        return;
    }

    const valorDaVenda = calcularValorDeVenda(torreSelecionada);
    botaoVender.disabled = false;
    botaoVender.textContent = localizar("Vender torre (+{valor})", {
        valor: valorDaVenda
    });
}

function obterSkinEquipadaDaTorrePadrao() {
    if (pacoteApoiador.adquirido && pacoteApoiador.skinEquipada) {
        return CONFIG.pacoteApoiador.skin;
    }

    const idDaSkinDeMissao = recompensasPermanentesDasMissoes.skinTorrePadraoEquipada;
    return CONFIG.missoes.skins[idDaSkinDeMissao] || null;
}

function obterEstiloDaTorre(torre) {
    const configuracaoAtual = obterConfiguracaoAtualDaTorre(torre);
    const estiloOriginal = torre.nivel === 0
        ? configuracaoAtual.visualBase
        : configuracaoAtual.visual;
    const skin = obterSkinEquipadaDaTorrePadrao();

    if (!skin || torre.tipo !== skin.tipoDeTorre) {
        return estiloOriginal;
    }

    const coresDaSkin = skin.coresPorNivel[torre.nivel] || skin.coresPorNivel[0];
    return { ...estiloOriginal, ...coresDaSkin };
}

function obterConfiguracaoAtualDaTorre(torre) {
    const configuracao = obterConfiguracaoDaTorre(torre.tipo);

    if (torre.nivel === 0) {
        return configuracao;
    }

    return configuracao.melhorias[torre.nivel - 1];
}

function atualizarAtributosDaTorreComBonus(torre) {
    const configuracaoAtual = obterConfiguracaoAtualDaTorre(torre);
    if (obterConfiguracaoDaTorre(torre.tipo).naoAtira) {
        torre.dano = 0;
        torre.alcance = configuracaoAtual.alcance || 0;
        torre.velocidadeAtaque = 0;
        return;
    }

    const multiplicadorDoFliperama = boostFliperamaAtivo
        ? 1 - CONFIG.fliperama.boost.percentualDeCadencia
        : 1;
    const multiplicadorDeDanoDoFliperama = boostDanoFliperamaAtivo
        ? 1 + CONFIG.fliperama.boost.percentualDeDano
        : 1;
    torre.dano = Math.round(
        configuracaoAtual.dano
        * multiplicadorDeDanoDasTorres
        * multiplicadorDeDanoDoFliperama
    );
    torre.alcance = Math.round(configuracaoAtual.alcance * multiplicadorDeAlcanceDasTorres);
    torre.velocidadeTiro = configuracaoAtual.velocidadeTiro
        || obterConfiguracaoDaTorre(torre.tipo).velocidadeTiro
        || CONFIG.tiro.velocidade;
    torre.velocidadeAtaque = Math.max(
        100,
        Math.round(
            configuracaoAtual.velocidadeAtaque
            * multiplicadorDeCadenciaDasTorres
            * multiplicadorDoFliperama
        )
    );
}

function estaPertoDeOutraTorreOuBomba(x, y) {
    return [...torres, ...bombasPesadas].some((defesa) => {
        const distancia = Math.hypot(defesa.x - x, defesa.y - y);
        return distancia < CONFIG.torre.distanciaMinima;
    });
}

function estaPertoDeOutraMina(x, y, distanciaMinima) {
    return estaPertoDeOutraDefesaConsumivel(
        minasTerrestres,
        x,
        y,
        distanciaMinima
    );
}

function estaPertoDeOutraDefesaConsumivel(defesas, x, y, distanciaMinima) {
    return defesas.some((defesa) => (
        Math.hypot(defesa.x - x, defesa.y - y) < distanciaMinima
    ));
}

function atingiuLimiteDoTipoDeTorre(tipoDaTorre) {
    const configuracao = obterConfiguracaoDaTorre(tipoDaTorre);
    const limitePorPartida = configuracao.limitePorPartida;

    if (!limitePorPartida) {
        return false;
    }

    const construcoesDoTipo = configuracao.tipoDeItem === "mina"
        ? minasTerrestres
        : configuracao.tipoDeItem === "bomba"
            ? bombasPesadas
            : torres;
    return construcoesDoTipo.filter((construcao) => (
        construcao.tipo === tipoDaTorre
    )).length >= limitePorPartida;
}

function obterIntervaloDeAtaqueAtualDaTorre(torre, agora = Date.now()) {
    let intervaloDeAtaque = torre.velocidadeAtaque;

    if (agora < (torre.lentidaoMacacoExpiraEm || 0)) {
        intervaloDeAtaque *= 1 + CONFIG.inimigo.macacoSaqueador.percentualLentidaoDaTorre;
    }

    const bonusDoAmplificador = obterBonusDeCadenciaDoAmplificador(torre);
    intervaloDeAtaque *= 1 - bonusDoAmplificador;
    return Math.max(100, intervaloDeAtaque);
}

function obterAlcanceAtualDaTorre(torre, agora = Date.now()) {
    if (agora >= (torre.reducaoAlcanceCorujaExpiraEm || 0)) {
        torre.percentualReducaoAlcanceCoruja = 0;
        return torre.alcance;
    }

    return torre.alcance * (1 - (torre.percentualReducaoAlcanceCoruja || 0));
}

function obterBonusDeCadenciaDoAmplificador(torre) {
    if (obterConfiguracaoDaTorre(torre.tipo).naoAtira) {
        return 0;
    }

    return torres.reduce((maiorBonus, torreDeSuporte) => {
        const configuracaoDeSuporte = obterConfiguracaoDaTorre(torreDeSuporte.tipo);

        if (
            !configuracaoDeSuporte.percentualBonusCadencia
            || Math.hypot(torre.x - torreDeSuporte.x, torre.y - torreDeSuporte.y)
                > torreDeSuporte.alcance
        ) {
            return maiorBonus;
        }

        return Math.max(maiorBonus, configuracaoDeSuporte.percentualBonusCadencia);
    }, 0);
}

function torreEstaAtordoadaPeloUrso(torre, agora = Date.now()) {
    return agora < (torre.atordoadaPeloUrsoAte || 0);
}

function atacarComTorres(agora = Date.now()) {
    for (const torre of torres) {
        if (obterConfiguracaoDaTorre(torre.tipo).naoAtira) {
            torre.alvoAtual = null;
            continue;
        }

        if (torreEstaAtordoadaPeloUrso(torre, agora)) {
            torre.alvoAtual = null;
            continue;
        }

        const intervaloDeAtaque = obterIntervaloDeAtaqueAtualDaTorre(torre, agora);
        const prontaParaAtirar = agora - torre.ultimoTiro >= intervaloDeAtaque;
        const alvo = escolherAlvoDaTorre(torre, prontaParaAtirar);

        if (!alvo) {
            torre.alvoAtual = null;
            continue;
        }

        torre.alvoAtual = alvo;
        torre.anguloDaMira = Math.atan2(
            alvo.y - torre.y,
            alvo.x - torre.x
        );

        if (!prontaParaAtirar) {
            continue;
        }

        const configuracaoAtual = obterConfiguracaoAtualDaTorre(torre);
        const quantidadeDeTiros = configuracaoAtual.quantidadeDeLasers || 1;
        const perpendicularX = -Math.sin(torre.anguloDaMira);
        const perpendicularY = Math.cos(torre.anguloDaMira);

        for (let indiceDoTiro = 0; indiceDoTiro < quantidadeDeTiros; indiceDoTiro++) {
            const deslocamento = (indiceDoTiro - (quantidadeDeTiros - 1) / 2) * 11;
            tiros.push({
                x: torre.x + perpendicularX * deslocamento,
                y: torre.y + perpendicularY * deslocamento,
                alvo,
                velocidade: torre.velocidadeTiro || CONFIG.tiro.velocidade,
                dano: torre.dano,
                tipoDaTorre: torre.tipo,
                indiceDoTiro,
                efeitoGlacial: configuracaoAtual.efeitoGlacial || null,
                efeitoDeQueimadura: configuracaoAtual.efeitoDeQueimadura || null,
                efeitoDeRaio: configuracaoAtual.efeitoDeRaio || null,
                raioDanoEmArea: configuracaoAtual.raioDanoEmArea || 0,
                duracaoExplosaoEmQuadros: configuracaoAtual.duracaoExplosaoEmQuadros || 0,
                corEsporos: obterEstiloDaTorre(torre).corEsporos || null
            });
        }

        torre.ultimoTiro = agora;
        dinheiro += obterRecompensaPorTiro();
    }
}

function obterInimigosNoAlcanceDaTorre(torre) {
    const alcanceAtual = obterAlcanceAtualDaTorre(torre);
    return inimigos.filter((inimigo) => (
        Math.hypot(torre.x - inimigo.x, torre.y - inimigo.y) <= alcanceAtual
    ));
}

function calcularProgressoDoInimigo(inimigo) {
    const caminhoAtual = obterCaminhoDoInimigo(inimigo);
    const indiceDoDestino = Math.max(
        1,
        Math.min(inimigo.alvo || 1, caminhoAtual.length - 1)
    );
    let progresso = 0;

    for (let indice = 1; indice < indiceDoDestino; indice++) {
        progresso += Math.hypot(
            caminhoAtual[indice].x - caminhoAtual[indice - 1].x,
            caminhoAtual[indice].y - caminhoAtual[indice - 1].y
        );
    }

    const inicioDoTrecho = caminhoAtual[indiceDoDestino - 1];
    const fimDoTrecho = caminhoAtual[indiceDoDestino];
    const dx = fimDoTrecho.x - inicioDoTrecho.x;
    const dy = fimDoTrecho.y - inicioDoTrecho.y;
    const comprimentoAoQuadrado = dx * dx + dy * dy;
    const fracaoDoTrecho = comprimentoAoQuadrado === 0
        ? 0
        : Math.max(0, Math.min(1, (
            (inimigo.x - inicioDoTrecho.x) * dx
            + (inimigo.y - inicioDoTrecho.y) * dy
        ) / comprimentoAoQuadrado));

    return progresso + Math.sqrt(comprimentoAoQuadrado) * fracaoDoTrecho;
}

function posicionarInimigoNoProgressoDoCaminho(inimigo, progressoAlvo) {
    const caminhoAtual = obterCaminhoDoInimigo(inimigo);
    let distanciaRestante = Math.max(0, progressoAlvo);

    for (let indice = 1; indice < caminhoAtual.length; indice++) {
        const inicio = caminhoAtual[indice - 1];
        const fim = caminhoAtual[indice];
        const comprimento = Math.hypot(fim.x - inicio.x, fim.y - inicio.y);

        if (distanciaRestante <= comprimento) {
            const fracao = comprimento === 0 ? 0 : distanciaRestante / comprimento;
            inimigo.x = inicio.x + (fim.x - inicio.x) * fracao;
            inimigo.y = inicio.y + (fim.y - inicio.y) * fracao;
            inimigo.alvo = indice;
            return;
        }

        distanciaRestante -= comprimento;
    }

    const fimDoCaminho = caminhoAtual[caminhoAtual.length - 1];
    inimigo.x = fimDoCaminho.x;
    inimigo.y = fimDoCaminho.y;
    inimigo.alvo = caminhoAtual.length - 1;
}

function recuarInimigoNoCaminho(inimigo, distancia) {
    if (!inimigo || distancia <= 0) {
        return 0;
    }

    const progressoAnterior = calcularProgressoDoInimigo(inimigo);
    const novoProgresso = Math.max(0, progressoAnterior - distancia);
    posicionarInimigoNoProgressoDoCaminho(inimigo, novoProgresso);
    return progressoAnterior - novoProgresso;
}

function empurrarInimigoParaTrasNoCaminho(inimigo, distancia) {
    if (!inimigo || inimigo.vida <= 0 || tipoEhBoss(inimigo.tipo)) {
        return 0;
    }

    return recuarInimigoNoCaminho(inimigo, distancia);
}

function aplicarVulnerabilidadeSismica(inimigo, efeitoSismico, agora) {
    if (!efeitoSismico.percentualDeVulnerabilidade) {
        return;
    }

    inimigo.percentualDeVulnerabilidadeSismica = Math.max(
        inimigo.percentualDeVulnerabilidadeSismica || 0,
        efeitoSismico.percentualDeVulnerabilidade
    );
    inimigo.vulnerabilidadeSismicaExpiraEm = Math.max(
        inimigo.vulnerabilidadeSismicaExpiraEm || 0,
        agora + efeitoSismico.duracaoDaVulnerabilidade
    );
}

function ativarImpactoSismico(
    torre,
    efeitoSismico,
    agora = Date.now(),
    secundario = false,
    alvosRegistrados = null
) {
    const multiplicador = secundario
        ? efeitoSismico.multiplicadorDoSegundoImpacto
        : 1;
    const alcanceAtual = obterAlcanceAtualDaTorre(torre, agora);
    const alvos = (alvosRegistrados ? [...alvosRegistrados] : inimigos)
        .filter((inimigo) => (
            inimigo.vida > 0
            && (
                alvosRegistrados
                || Math.hypot(torre.x - inimigo.x, torre.y - inimigo.y) <= alcanceAtual
            )
        ));

    for (const inimigo of alvos) {
        if (tipoEhBoss(inimigo.tipo)) {
            const inicioDoNovoAtordoamento = Math.max(
                agora,
                inimigo.atordoadoPelaTorreSismicaAte || 0
            );
            inimigo.atordoadoPelaTorreSismicaAte = inicioDoNovoAtordoamento
                + efeitoSismico.duracaoDoAtordoamentoDoBoss * multiplicador;
        } else {
            empurrarInimigoParaTrasNoCaminho(
                inimigo,
                efeitoSismico.distanciaDoEmpurrao * multiplicador
            );
        }

        aplicarVulnerabilidadeSismica(inimigo, efeitoSismico, agora);
    }

    explosoesDosExplosivos.push({
        x: torre.x,
        y: torre.y,
        raio: alcanceAtual,
        quadrosRestantes: efeitoSismico.duracaoVisualEmQuadros,
        totalDeQuadros: efeitoSismico.duracaoVisualEmQuadros,
        tipoVisual: "sismico",
        cor: obterEstiloDaTorre(torre).corFissura,
        intensidade: multiplicador
    });

    if (!secundario && efeitoSismico.atrasoDoSegundoImpacto > 0) {
        torre.impactoSismicoSecundarioEm = agora + efeitoSismico.atrasoDoSegundoImpacto;
    }

    return alvos.length;
}

function atualizarTorresSismicas(agora = Date.now()) {
    const atualizacoesSismicas = [];

    for (const torre of torres) {
        const configuracaoBase = obterConfiguracaoDaTorre(torre.tipo);

        if (!configuracaoBase.efeitoSismico) {
            continue;
        }

        const configuracaoAtual = obterConfiguracaoAtualDaTorre(torre);
        const efeitoSismico = configuracaoAtual.efeitoSismico;
        const cargaAntesDaAtualizacao = torre.cargaSismica || 0;

        const deveAtivarImpactoSecundario = (
            torre.impactoSismicoSecundarioEm > 0
            && agora >= torre.impactoSismicoSecundarioEm
        );

        const inimigosDentroAgora = new Set(obterInimigosNoAlcanceDaTorre(torre));
        const inimigosDentroAntes = torre.inimigosDentroDoAlcanceSismico instanceof Set
            ? torre.inimigosDentroDoAlcanceSismico
            : new Set();

        for (const inimigo of inimigosDentroAgora) {
            if (!inimigosDentroAntes.has(inimigo)) {
                torre.cargaSismica = (torre.cargaSismica || 0) + 1;
            }
        }

        torre.inimigosDentroDoAlcanceSismico = inimigosDentroAgora;

        const deveAtivarImpactoPrincipal = (
            (torre.cargaSismica || 0) >= efeitoSismico.cargasNecessarias
        );

        if (deveAtivarImpactoPrincipal) {
            torre.cargaSismica -= efeitoSismico.cargasNecessarias;
        }

        atualizacoesSismicas.push({
            torre,
            efeitoSismico,
            inimigosDentroAgora,
            deveAtivarImpactoSecundario,
            deveAtivarImpactoPrincipal,
            cargaAntesDaAtualizacao
        });
    }

    for (const atualizacao of atualizacoesSismicas) {
        const {
            torre,
            efeitoSismico,
            inimigosDentroAgora,
            deveAtivarImpactoSecundario,
            deveAtivarImpactoPrincipal,
            cargaAntesDaAtualizacao
        } = atualizacao;

        if (deveAtivarImpactoSecundario) {
            torre.impactoSismicoSecundarioEm = 0;
            ativarImpactoSismico(
                torre,
                efeitoSismico,
                agora,
                true,
                inimigosDentroAgora
            );
        }

        if (deveAtivarImpactoPrincipal) {
            ativarImpactoSismico(
                torre,
                efeitoSismico,
                agora,
                false,
                inimigosDentroAgora
            );
        }

        if (
            torre === torreSelecionada
            && cargaAntesDaAtualizacao !== (torre.cargaSismica || 0)
        ) {
            atualizarBotoesDaTorre();
        }
    }
}

function escolherAlvoDaTorre(torre, permitirNovoAlvoAleatorio) {
    const candidatos = obterInimigosNoAlcanceDaTorre(torre);

    if (candidatos.length === 0) {
        return null;
    }

    const modo = obterModoDeAlvoDaTorre(torre).id;

    if (modo === "aleatorio") {
        if (!permitirNovoAlvoAleatorio && candidatos.includes(torre.alvoAtual)) {
            return torre.alvoAtual;
        }

        return candidatos[Math.floor(Math.random() * candidatos.length)];
    }

    const multiplicador = modo === "ultimo" ? 1 : -1;
    return candidatos.reduce((melhorAlvo, candidato) => (
        calcularProgressoDoInimigo(candidato) * multiplicador
            < calcularProgressoDoInimigo(melhorAlvo) * multiplicador
            ? candidato
            : melhorAlvo
    ));
}

function encontrarAlvoMaisProximo(origem, alvos, alcance) {
    let alvoMaisProximo = null;
    let menorDistancia = Infinity;

    for (const alvo of alvos) {
        const distancia = Math.hypot(origem.x - alvo.x, origem.y - alvo.y);

        if (distancia <= alcance && distancia < menorDistancia) {
            menorDistancia = distancia;
            alvoMaisProximo = alvo;
        }
    }

    return alvoMaisProximo;
}

function encontrarAlvoParaInimigoAtirador(inimigo, alcance) {
    const iscasNoAlcance = torres.filter((torre) => {
        const configuracao = obterConfiguracaoDaTorre(torre.tipo);
        return configuracao.atraiInimigosAtiradores
            && Math.hypot(inimigo.x - torre.x, inimigo.y - torre.y) <= alcance;
    });
    const alvosDisponiveis = iscasNoAlcance.length > 0 ? iscasNoAlcance : torres;
    return encontrarAlvoMaisProximo(inimigo, alvosDisponiveis, alcance);
}

function torrePodeSerAtordoadaPeloUrso(torre) {
    return !obterConfiguracaoDaTorre(torre.tipo).naoAtira;
}

function tentarUsarRugidoAncestral(inimigo, agora = Date.now()) {
    if (
        inimigo.tipo !== "bossTemperado"
        || agora < (inimigo.proximoRugidoEm || 0)
    ) {
        return false;
    }

    const configuracao = CONFIG.inimigo.bossTemperado;
    const torresNoAlcance = torres.filter((torre) => (
        torrePodeSerAtordoadaPeloUrso(torre)
        && Math.hypot(inimigo.x - torre.x, inimigo.y - torre.y)
            <= configuracao.raioDoRugido
    ));

    if (torresNoAlcance.length === 0) {
        return false;
    }

    for (const torre of torresNoAlcance) {
        torre.atordoadaPeloUrsoAte = Math.max(
            torre.atordoadaPeloUrsoAte || 0,
            agora + configuracao.duracaoDoAtordoamentoDaTorre
        );
        torre.alvoAtual = null;
    }

    inimigo.proximoRugidoEm = agora + configuracao.intervaloEntreRugidos;
    inimigo.rugidoExpiraEm = agora + configuracao.duracaoVisualDoRugido;
    tocarEfeitoRugidoAncestral();
    return true;
}

function atacarTorresComInimigos(agora = Date.now()) {
    for (const inimigo of inimigos) {
        const configuracao = CONFIG.inimigo[inimigo.tipo];

        tentarUsarRugidoAncestral(inimigo, agora);

        if (
            !configuracao.alcanceAtaque
            || agora - inimigo.ultimoTiro < configuracao.intervaloAtaque
        ) {
            continue;
        }

        const alvo = encontrarAlvoParaInimigoAtirador(inimigo, configuracao.alcanceAtaque);

        if (alvo) {
            tirosDosInimigos.push({
                x: inimigo.x,
                y: inimigo.y,
                alvo,
                velocidade: configuracao.velocidadeTiro,
                tipoDoInimigo: inimigo.tipo
            });
            inimigo.ultimoTiro = agora;
        }
    }
}

// Tiros e colisões
function aplicarEfeitoGlacial(inimigo, efeitoGlacial, agora = Date.now()) {
    if (!efeitoGlacial) {
        return;
    }

    inimigo.percentualLentidao = Math.max(
        inimigo.percentualLentidao || 0,
        efeitoGlacial.percentualLentidao
    );
    inimigo.lentidaoExpiraEm = Math.max(
        inimigo.lentidaoExpiraEm || 0,
        agora + efeitoGlacial.duracaoLentidao
    );

    if (tipoEhBoss(inimigo.tipo)) {
        return;
    }

    inimigo.acertosGelados = (inimigo.acertosGelados || 0) + 1;

    if (inimigo.acertosGelados >= efeitoGlacial.acertosParaCongelar) {
        inimigo.acertosGelados = 0;
        inimigo.congeladoAte = Math.max(
            inimigo.congeladoAte || 0,
            agora + efeitoGlacial.duracaoCongelamento
        );
    }
}

function detonarTiroDeEsporos(tiro) {
    const xDoImpacto = tiro.alvo.x;
    const yDoImpacto = tiro.alvo.y;

    aplicarDanoEmArea(
        xDoImpacto,
        yDoImpacto,
        tiro.raioDanoEmArea,
        tiro.dano
    );

    explosoesDosExplosivos.push({
        x: xDoImpacto,
        y: yDoImpacto,
        raio: tiro.raioDanoEmArea,
        quadrosRestantes: tiro.duracaoExplosaoEmQuadros,
        totalDeQuadros: tiro.duracaoExplosaoEmQuadros,
        tipoVisual: "esporos",
        cor: tiro.corEsporos
    });
}

function aplicarRaioEncadeado(tiro) {
    const configuracao = tiro.efeitoDeRaio;
    const atingidos = [];
    const segmentos = [];
    const alvosPresentesAntesDoImpacto = [...inimigos];
    let alvoAtual = tiro.alvo;

    for (
        let salto = 0;
        salto < configuracao.quantidadeMaximaDeAlvos && alvoAtual;
        salto++
    ) {
        const danoDoSalto = Math.max(1, Math.round(
            tiro.dano * Math.pow(configuracao.multiplicadorDeDanoPorSalto, salto)
        ));
        aplicarDanoAoInimigo(alvoAtual, danoDoSalto);
        atingidos.push(alvoAtual);

        const proximoAlvo = encontrarAlvoMaisProximo(
            alvoAtual,
            alvosPresentesAntesDoImpacto.filter((inimigo) => (
                inimigo.vida > 0 && !atingidos.includes(inimigo)
            )),
            configuracao.alcanceEncadeamento
        );

        if (proximoAlvo) {
            segmentos.push({
                inicioX: alvoAtual.x,
                inicioY: alvoAtual.y,
                fimX: proximoAlvo.x,
                fimY: proximoAlvo.y
            });
        }

        alvoAtual = proximoAlvo;
    }

    explosoesDosExplosivos.push({
        x: tiro.alvo.x,
        y: tiro.alvo.y,
        raio: configuracao.alcanceEncadeamento,
        quadrosRestantes: 12,
        totalDeQuadros: 12,
        tipoVisual: "raios",
        segmentos
    });
}

function moverTiros(multiplicadorDeMovimento = 1) {
    for (let i = tiros.length - 1; i >= 0; i--) {
        const tiro = tiros[i];

        if (!inimigos.includes(tiro.alvo)) {
            tiros.splice(i, 1);
            continue;
        }

        const dx = tiro.alvo.x - tiro.x;
        const dy = tiro.alvo.y - tiro.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        const deslocamento = tiro.velocidade * multiplicadorDeMovimento;

        if (distancia <= deslocamento) {
            if (tiro.efeitoDeRaio) {
                aplicarRaioEncadeado(tiro);
            } else if (tiro.raioDanoEmArea) {
                detonarTiroDeEsporos(tiro);
            } else {
                aplicarDanoAoInimigo(tiro.alvo, tiro.dano);
                aplicarEfeitoGlacial(tiro.alvo, tiro.efeitoGlacial);
                aplicarEfeitoDeQueimadura(tiro.alvo, tiro.efeitoDeQueimadura);
            }
            tiros.splice(i, 1);
        } else {
            tiro.x += (dx / distancia) * deslocamento;
            tiro.y += (dy / distancia) * deslocamento;
        }
    }
}

function moverTirosDosInimigos(multiplicadorDeMovimento = 1) {
    for (let i = tirosDosInimigos.length - 1; i >= 0; i--) {
        const tiro = tirosDosInimigos[i];

        if (!torres.includes(tiro.alvo)) {
            tirosDosInimigos.splice(i, 1);
            continue;
        }

        const dx = tiro.alvo.x - tiro.x;
        const dy = tiro.alvo.y - tiro.y;
        const distancia = Math.hypot(dx, dy);
        const deslocamento = tiro.velocidade * multiplicadorDeMovimento;

        if (distancia <= deslocamento) {
            const configuracaoDaTorre = obterConfiguracaoDaTorre(tiro.alvo.tipo);
            if (
                tiro.tipoDoInimigo === "corujaSombria"
                && !configuracaoDaTorre.atraiInimigosAtiradores
            ) {
                aplicarReducaoDeAlcanceDaCoruja(tiro.alvo);
            } else if (
                tiro.tipoDoInimigo === "macacoSaqueador"
                && !configuracaoDaTorre.atraiInimigosAtiradores
            ) {
                aplicarLentidaoDoMacacoNaTorre(tiro.alvo);
            } else {
                atingirTorreComTiroInimigo(tiro.alvo, tiro.tipoDoInimigo);
            }
            tirosDosInimigos.splice(i, 1);
        } else {
            tiro.x += (dx / distancia) * deslocamento;
            tiro.y += (dy / distancia) * deslocamento;
        }
    }
}

function aplicarLentidaoDoMacacoNaTorre(torre, agora = Date.now()) {
    torre.lentidaoMacacoExpiraEm = Math.max(
        torre.lentidaoMacacoExpiraEm || 0,
        agora + CONFIG.inimigo.macacoSaqueador.duracaoLentidaoDaTorre
    );
}

function aplicarReducaoDeAlcanceDaCoruja(torre, agora = Date.now()) {
    const configuracao = CONFIG.inimigo.corujaSombria;
    torre.percentualReducaoAlcanceCoruja = Math.max(
        torre.percentualReducaoAlcanceCoruja || 0,
        configuracao.percentualReducaoAlcanceDaTorre
    );
    torre.reducaoAlcanceCorujaExpiraEm = Math.max(
        torre.reducaoAlcanceCorujaExpiraEm || 0,
        agora + configuracao.duracaoReducaoAlcanceDaTorre
    );
}

function obterResistenciaDaTorre(torre) {
    return obterConfiguracaoDaTorre(torre.tipo).resistenciaATiros
        || CONFIG.inimigo.sabotador.tirosParaDestruirTorre;
}

function atingirTorreComTiroInimigo(torre, tipoDoInimigo = "sabotador") {
    torre.tirosRecebidos = (torre.tirosRecebidos || 0) + 1;

    if (torre.tirosRecebidos < obterResistenciaDaTorre(torre)) {
        return;
    }

    const indiceDaTorre = torres.indexOf(torre);

    if (indiceDaTorre < 0) {
        return;
    }

    torres.splice(indiceDaTorre, 1);

    if (torreSelecionada === torre) {
        torreSelecionada = null;
        atualizarBotoesDaTorre();
    }

    tocarEfeitoTorreDestruida();
    const configuracaoDoInimigo = CONFIG.inimigo[tipoDoInimigo];
    const nomeDoInimigo = configuracaoDoInimigo
        ? obterNomeLocalizado(configuracaoDoInimigo)
        : localizar("Inimigo");
    const nomeDaTorre = obterNomeLocalizado(obterConfiguracaoDaTorre(torre.tipo));
    mostrarAviso(localizar("{inimigo} destruiu {torre}!", {
        inimigo: nomeDoInimigo,
        torre: nomeDaTorre
    }));
}

// Funções auxiliares
function mostrarAviso(mensagem) {
    aviso = mensagem;
    avisoExpiraEm = Date.now() + 2500;
}

function estaNoCaminho(x, y) {
    for (const caminhoAtual of obterCaminhosAtuais()) {
        for (let i = 0; i < caminhoAtual.length - 1; i++) {
            const p1 = caminhoAtual[i];
            const p2 = caminhoAtual[i + 1];
            const distancia = distanciaPontoSegmento(x, y, p1.x, p1.y, p2.x, p2.y);

            if (distancia < 45) {
                return true;
            }
        }
    }

    return false;
}

function distanciaPontoSegmento(px, py, x1, y1, x2, y2) {
    const pontoMaisProximo = obterPontoMaisProximoNoSegmento(
        px,
        py,
        x1,
        y1,
        x2,
        y2
    );
    return Math.hypot(px - pontoMaisProximo.x, py - pontoMaisProximo.y);
}

function obterPontoMaisProximoNoSegmento(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    if (dx === 0 && dy === 0) {
        return { x: x1, y: y1 };
    }

    let t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t));

    return {
        x: x1 + t * dx,
        y: y1 + t * dy
    };
}

function obterPosicaoMaisProximaNoCaminho(x, y) {
    const caminhosAtuais = obterCaminhosAtuais();
    let melhorPosicao = caminhosAtuais[0][0];
    let menorDistancia = Infinity;

    for (const caminhoAtual of caminhosAtuais) {
        for (let indice = 0; indice < caminhoAtual.length - 1; indice++) {
            const inicio = caminhoAtual[indice];
            const fim = caminhoAtual[indice + 1];
            const posicao = obterPontoMaisProximoNoSegmento(
                x,
                y,
                inicio.x,
                inicio.y,
                fim.x,
                fim.y
            );
            const distancia = Math.hypot(x - posicao.x, y - posicao.y);

            if (distancia < menorDistancia) {
                melhorPosicao = posicao;
                menorDistancia = distancia;
            }
        }
    }

    return melhorPosicao;
}

// Desenho
function desenharRetanguloArredondado(x, y, largura, altura, raio) {
    const limite = Math.min(raio, largura / 2, altura / 2);

    ctx.beginPath();
    ctx.moveTo(x + limite, y);
    ctx.lineTo(x + largura - limite, y);
    ctx.quadraticCurveTo(x + largura, y, x + largura, y + limite);
    ctx.lineTo(x + largura, y + altura - limite);
    ctx.quadraticCurveTo(x + largura, y + altura, x + largura - limite, y + altura);
    ctx.lineTo(x + limite, y + altura);
    ctx.quadraticCurveTo(x, y + altura, x, y + altura - limite);
    ctx.lineTo(x, y + limite);
    ctx.quadraticCurveTo(x, y, x + limite, y);
    ctx.closePath();
}

function desenharMapa() {
    const faseAtual = obterFaseAtual();
    const caminhosAtuais = obterCaminhosAtuais();
    const tema = temasDoMapa[faseAtual.tema] || temasDoMapa.campo;

    ctx.fillStyle = tema.terrenoBase;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tamanhoBloco = 48;
    for (let y = 0; y < canvas.height; y += tamanhoBloco) {
        for (let x = 0; x < canvas.width; x += tamanhoBloco) {
            ctx.fillStyle = (x / tamanhoBloco + y / tamanhoBloco) % 2 === 0
                ? tema.terrenoClaro
                : tema.terrenoEscuro;
            ctx.fillRect(x, y, tamanhoBloco, tamanhoBloco);
        }
    }

    if (faseAtual.tema === "glitch") {
        desenharFalhasDoMapa();
    }

    desenharDecoracoesDoMapa(faseAtual.tema);

    ctx.lineCap = "square";
    ctx.lineJoin = "miter";
    if (faseAtualUsaCaminhoVivo()) {
        desenharCaminhoVivo(tema, caminhosAtuais);
    } else {
        desenharCaminhosComTema(tema, caminhosAtuais);
    }

    desenharTrilhosDeImpulso();

    const entradasDesenhadas = new Set();
    for (const caminhoAtual of caminhosAtuais) {
        const entrada = caminhoAtual[0];
        const chaveDaEntrada = `${entrada.x}:${entrada.y}`;

        if (entradasDesenhadas.has(chaveDaEntrada)) {
            continue;
        }

        entradasDesenhadas.add(chaveDaEntrada);
        desenharPortao(entrada.x, entrada.y, "#57b9ff", "ENTRADA", false);
    }

    const torreFinal = obterPosicaoDaTorreFinal(caminhosAtuais[0]);
    desenharTorreFinal(torreFinal.x, torreFinal.y, tema);
    desenharRadioProjetoRelogio();
}

function desenharTrilhosDeImpulso() {
    if (!faseAtualUsaMetropoleNeon()) {
        return;
    }

    const pulso = Math.floor(Date.now() / 140) % 3;
    ctx.save();
    ctx.globalAlpha = 0.9;

    for (const trilho of CONFIG.metropoleNeon.trilhosDeImpulso) {
        ctx.fillStyle = "rgba(28, 231, 240, 0.18)";
        ctx.fillRect(trilho.x, trilho.y, trilho.largura, trilho.altura);
        ctx.strokeStyle = "#45f1ed";
        ctx.lineWidth = 3;
        ctx.strokeRect(trilho.x + 2, trilho.y + 2, trilho.largura - 4, trilho.altura - 4);
        ctx.fillStyle = "#ec57df";

        if (trilho.direcao === "cima") {
            for (let y = trilho.y + trilho.altura - 25 - pulso * 12; y > trilho.y + 8; y -= 36) {
                const centroX = trilho.x + trilho.largura / 2;
                ctx.beginPath();
                ctx.moveTo(centroX, y - 10);
                ctx.lineTo(centroX - 10, y + 5);
                ctx.lineTo(centroX + 10, y + 5);
                ctx.closePath();
                ctx.fill();
            }
        } else {
            for (let x = trilho.x + 18 + pulso * 12; x < trilho.x + trilho.largura - 8; x += 36) {
                const centroY = trilho.y + trilho.altura / 2;
                ctx.beginPath();
                ctx.moveTo(x + 10, centroY);
                ctx.lineTo(x - 5, centroY - 10);
                ctx.lineTo(x - 5, centroY + 10);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    ctx.restore();
}

function desenharAltoFalanteDoRadio(x, y) {
    ctx.fillStyle = "#05060a";
    ctx.fillRect(x - 12, y - 8, 24, 16);
    ctx.fillRect(x - 8, y - 12, 16, 24);
    ctx.fillStyle = "#252638";
    ctx.fillRect(x - 8, y - 8, 16, 16);
    ctx.fillStyle = "#101119";
    ctx.fillRect(x - 5, y - 5, 10, 10);
}

function desenharRadioProjetoRelogio() {
    if (!faseAtualUsaMetropoleNeon() || !radioProjetoRelogioDisponivel) {
        return;
    }

    const radio = CONFIG.metropoleNeon.radio;
    const pulso = Math.floor(Date.now() / 240) % 2;
    ctx.save();
    ctx.translate(radio.x, radio.y);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = `rgba(72, 238, 193, ${pulso ? 0.2 : 0.12})`;
    ctx.fillRect(-54 - pulso * 3, -42 - pulso * 3, 108 + pulso * 6, 88 + pulso * 6);

    ctx.strokeStyle = "#05060a";
    ctx.lineWidth = 8;
    ctx.lineCap = "square";
    ctx.beginPath();
    ctx.moveTo(27, -30);
    ctx.lineTo(62, -67);
    ctx.stroke();
    ctx.strokeStyle = "#d8e5df";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(27, -30);
    ctx.lineTo(62, -67);
    ctx.stroke();
    ctx.fillStyle = "#05060a";
    ctx.fillRect(56, -76, 18, 18);
    ctx.fillStyle = "#ef1818";
    ctx.fillRect(60, -72, 14, 14);

    ctx.fillStyle = "rgba(0, 0, 0, .38)";
    ctx.fillRect(-43, -24, 96, 61);
    ctx.fillStyle = "#05060a";
    ctx.fillRect(-48, -30, 96, 60);
    ctx.fillStyle = "#42a774";
    ctx.fillRect(-43, -25, 86, 50);
    ctx.fillStyle = "#05060a";
    ctx.fillRect(-35, -20, 70, 25);
    ctx.fillStyle = "#b4a500";
    ctx.fillRect(-31, -16, 62, 5);
    ctx.fillRect(-31, -7, 62, 5);

    desenharAltoFalanteDoRadio(-31, 15);
    desenharAltoFalanteDoRadio(31, 15);
    ctx.fillStyle = "#05060a";
    ctx.fillRect(-11, 10, 14, 12);
    ctx.fillRect(9, 10, 14, 12);
    ctx.fillStyle = "#686a85";
    ctx.fillRect(-7, 13, 7, 6);
    ctx.fillRect(13, 13, 7, 6);

    ctx.fillStyle = "#07101d";
    ctx.fillRect(-78, 39, 156, 20);
    ctx.strokeStyle = "#45f1ed";
    ctx.lineWidth = 2;
    ctx.strokeRect(-78, 39, 156, 20);
    ctx.fillStyle = "#f7ffff";
    ctx.textAlign = "center";
    ctx.font = "900 10px 'Courier New', monospace";
    ctx.fillText(localizar("OUVIR · PROJETO RELÓGIO"), 0, 53);
    ctx.restore();
}

function desenharFalhasDoMapa() {
    const blocos = [
        [72, 88, 84, 12, "#e84cff"],
        [300, 650, 130, 10, "#44ead1"],
        [522, 46, 74, 16, "#6b2d86"],
        [760, 570, 110, 12, "#e84cff"],
        [1020, 115, 94, 15, "#44ead1"],
        [1128, 520, 46, 10, "#e84cff"]
    ];

    ctx.save();
    ctx.globalAlpha = 0.55;
    for (const [x, y, largura, altura, cor] of blocos) {
        ctx.fillStyle = cor;
        ctx.fillRect(x, y, largura, altura);
        ctx.fillRect(x + 14, y - 8, 10, 8);
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    for (let y = 22; y < canvas.height; y += 54) {
        ctx.fillRect(0, y, canvas.width, 3);
    }
    ctx.restore();
}

function desenharFliperamaPixeladoAnterior(x, y) {
    ctx.fillStyle = "#020704";
    ctx.fillRect(x - 32, y - 39, 68, 86);
    ctx.fillStyle = "#51276e";
    ctx.fillRect(x - 36, y - 43, 68, 84);
    ctx.strokeStyle = "#d58aff";
    ctx.lineWidth = 4;
    ctx.strokeRect(x - 36, y - 43, 68, 84);
    ctx.fillStyle = "#fff36a";
    ctx.fillRect(x - 29, y - 36, 54, 15);
    ctx.fillStyle = "#2c1740";
    ctx.font = "900 10px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText("ARCADE", x - 2, y - 25);
    ctx.fillStyle = "#07120c";
    ctx.fillRect(x - 27, y - 15, 50, 30);
    ctx.fillStyle = "#5de1ef";
    ctx.fillRect(x - 22, y - 10, 40, 20);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x - 16, y - 6, 9, 5);
    ctx.fillStyle = "#ff6b6b";
    ctx.fillRect(x + 7, y + 2, 7, 5);
    ctx.fillStyle = "#f4f1d0";
    ctx.fillRect(x - 24, y + 22, 5, 13);
    ctx.fillStyle = "#ff6b6b";
    ctx.fillRect(x - 29, y + 18, 15, 7);
    ctx.fillStyle = "#fff36a";
    ctx.fillRect(x + 3, y + 22, 8, 8);
    ctx.fillStyle = "#68df89";
    ctx.fillRect(x + 14, y + 25, 6, 6);
}

function desenharFliperamaNoMapa() {
    if (!fliperamaNoMapa) {
        return;
    }

    const x = Math.round(fliperamaNoMapa.x);
    const y = Math.round(fliperamaNoMapa.y);
    const segundos = Math.max(
        0,
        Math.ceil((fliperamaNoMapa.expiraEm - Date.now()) / 1000)
    );
    const sprite = CONFIG.fliperama.sprite;
    const imagemCarregada = imagemFliperamaNoMapa
        && !imagemFliperamaNoMapaFalhou
        && imagemFliperamaNoMapa.complete
        && imagemFliperamaNoMapa.naturalWidth > 0;

    ctx.save();

    if (imagemCarregada) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            imagemFliperamaNoMapa,
            Math.round(x - sprite.largura / 2),
            Math.round(y - sprite.altura / 2 + sprite.deslocamentoVertical),
            sprite.largura,
            sprite.altura
        );
    } else {
        desenharFliperamaPixeladoAnterior(x, y);
    }

    ctx.fillStyle = "#102218";
    ctx.fillRect(x - 40, y - 66, 76, 18);
    ctx.strokeStyle = "#6cdb7c";
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 40, y - 66, 76, 18);
    ctx.fillStyle = "#f4f1d0";
    ctx.font = "900 10px 'Courier New', monospace";
    ctx.fillText(localizar("CLIQUE · {segundos}s", { segundos }), x - 2, y - 54);
    ctx.restore();
}

function desenharDecoracoesDoMapa(temaDaFase) {
    const decoracoes = decoracoesDoMapa[temaDaFase] || decoracoesDoMapa.campo;

    for (const decoracao of decoracoes) {
        const desenharDecoracao = desenhadoresDeDecoracao[decoracao.tipo];

        if (desenharDecoracao) {
            desenharDecoracao(decoracao);
        }
    }
}

function desenharLago({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#255c55";
    ctx.fillRect(-56, -32, 112, 64);
    ctx.fillRect(-72, -16, 144, 32);
    ctx.fillStyle = "#3e9fb5";
    ctx.fillRect(-52, -24, 104, 48);
    ctx.fillRect(-64, -12, 128, 24);
    ctx.fillStyle = "#6ed2d0";
    ctx.fillRect(-38, -15, 42, 7);
    ctx.fillRect(12, 10, 28, 6);
    ctx.restore();
}

function desenharArvore({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#244c2c";
    ctx.fillRect(-16, 22, 40, 10);
    ctx.fillStyle = "#765437";
    ctx.fillRect(-6, -1, 12, 31);
    ctx.fillStyle = "#255f35";
    ctx.fillRect(-24, -25, 48, 32);
    ctx.fillRect(-16, -38, 32, 50);
    ctx.fillStyle = "#2d743e";
    ctx.fillRect(-17, -31, 34, 31);
    ctx.fillRect(-8, -43, 20, 18);
    ctx.fillStyle = "#84d36f";
    ctx.fillRect(-10, -34, 9, 9);
    ctx.restore();
}

function desenharPedra({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#31583c";
    ctx.fillRect(-18, 9, 42, 9);
    ctx.fillStyle = "#687b72";
    ctx.fillRect(-20, -3, 40, 17);
    ctx.fillRect(-12, -11, 25, 28);
    ctx.fillStyle = "#9eafa6";
    ctx.fillRect(-9, -7, 12, 6);
    ctx.restore();
}

function desenharArbusto({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#2b683b";
    ctx.fillRect(-24, -4, 48, 22);
    ctx.fillRect(-14, -15, 30, 33);
    ctx.fillStyle = "#76c66e";
    ctx.fillRect(-8, -10, 10, 8);
    ctx.fillRect(10, 2, 7, 7);
    ctx.restore();
}

function desenharFlores({ x, y, escala }) {
    const cores = ["#fff1a6", "#f7a8c4", "#d7c1ff"];
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    for (let i = 0; i < cores.length; i++) {
        ctx.fillStyle = cores[i];
        ctx.fillRect(i * 15 - 19, i % 2 === 0 ? -4 : 5, 9, 9);
        ctx.fillStyle = "#f3c84d";
        ctx.fillRect(i * 15 - 16, i % 2 === 0 ? -1 : 8, 3, 3);
    }
    ctx.restore();
}

function desenharCacto({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#87562d";
    ctx.fillRect(-18, 28, 42, 8);
    ctx.fillStyle = "#245335";
    ctx.fillRect(-9, -34, 22, 66);
    ctx.fillRect(-25, -12, 18, 14);
    ctx.fillRect(-25, -12, 10, 30);
    ctx.fillRect(11, -4, 22, 14);
    ctx.fillRect(23, -20, 10, 30);
    ctx.fillStyle = "#3f8650";
    ctx.fillRect(-3, -28, 7, 52);
    ctx.fillRect(-20, -7, 5, 18);
    ctx.fillRect(25, -15, 4, 18);
    ctx.fillStyle = "#91c35e";
    ctx.fillRect(-6, -38, 14, 7);
    ctx.restore();
}

function desenharMatoSeco({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#8e5a2e";
    ctx.fillRect(-25, 13, 50, 6);
    ctx.fillStyle = "#70401f";
    ctx.fillRect(-3, -12, 6, 29);
    ctx.fillRect(-19, -4, 18, 5);
    ctx.fillRect(-20, -14, 5, 15);
    ctx.fillRect(1, 3, 21, 5);
    ctx.fillRect(17, -9, 5, 17);
    ctx.fillStyle = "#c1833f";
    ctx.fillRect(-24, -18, 9, 5);
    ctx.fillRect(17, -13, 9, 5);
    ctx.fillRect(-5, -17, 9, 5);
    ctx.restore();
}

function desenharPiramide({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#8a572e";
    ctx.fillRect(-64, 38, 128, 10);

    for (let camada = 0; camada < 7; camada++) {
        const largura = 112 - camada * 16;
        const posicaoX = -largura / 2;
        const posicaoY = 30 - camada * 10;

        ctx.fillStyle = camada % 2 === 0 ? "#d9a552" : "#c89145";
        ctx.fillRect(posicaoX, posicaoY, largura, 10);
        ctx.fillStyle = "#a76a35";
        ctx.fillRect(posicaoX + Math.floor(largura * 0.68), posicaoY, Math.ceil(largura * 0.32), 10);
    }

    ctx.fillStyle = "#5f3822";
    ctx.fillRect(-7, 19, 14, 21);
    ctx.restore();
}

function desenharRochaDoDeserto({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#89572f";
    ctx.fillRect(-20, 10, 44, 8);
    ctx.fillStyle = "#9d6840";
    ctx.fillRect(-20, -3, 40, 17);
    ctx.fillRect(-11, -13, 24, 29);
    ctx.fillStyle = "#d09a61";
    ctx.fillRect(-8, -8, 12, 6);
    ctx.restore();
}

function desenharIglu({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#5c8799";
    ctx.fillRect(-62, 4, 124, 34);
    ctx.fillRect(-54, -8, 108, 46);
    ctx.fillRect(-44, -20, 88, 58);
    ctx.fillRect(-30, -30, 60, 68);

    ctx.fillStyle = "#e8f8ff";
    ctx.fillRect(-56, 7, 112, 27);
    ctx.fillRect(-48, -5, 96, 39);
    ctx.fillRect(-38, -17, 76, 51);
    ctx.fillRect(-25, -25, 50, 59);

    ctx.fillStyle = "#afd7e7";
    ctx.fillRect(-48, 5, 18, 5);
    ctx.fillRect(-22, 5, 20, 5);
    ctx.fillRect(7, 5, 18, 5);
    ctx.fillRect(-36, -9, 20, 5);
    ctx.fillRect(-7, -9, 20, 5);
    ctx.fillRect(-20, -20, 18, 5);

    ctx.fillStyle = "#416a7d";
    ctx.fillRect(20, 4, 34, 34);
    ctx.fillRect(25, -3, 24, 41);
    ctx.fillStyle = "#173746";
    ctx.fillRect(28, 8, 18, 30);
    ctx.restore();
}

function desenharPinguim({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#6d9bad";
    ctx.fillRect(-20, 27, 44, 7);
    ctx.fillStyle = "#142631";
    ctx.fillRect(-18, -25, 36, 50);
    ctx.fillRect(-23, -13, 46, 27);
    ctx.fillRect(-13, -32, 26, 62);

    ctx.fillStyle = "#f4fbff";
    ctx.fillRect(-10, -9, 20, 31);
    ctx.fillRect(-7, -15, 14, 39);
    ctx.fillStyle = "#82b9cc";
    ctx.fillRect(-8, 10, 16, 8);

    ctx.fillStyle = "#d9f3fb";
    ctx.fillRect(-8, -23, 6, 6);
    ctx.fillRect(2, -23, 6, 6);
    ctx.fillStyle = "#0a1218";
    ctx.fillRect(-6, -21, 3, 3);
    ctx.fillRect(3, -21, 3, 3);

    ctx.fillStyle = "#f1a83b";
    ctx.fillRect(-4, -15, 9, 6);
    ctx.fillRect(-17, 23, 14, 6);
    ctx.fillRect(4, 23, 14, 6);
    ctx.restore();
}

function desenharPinheiroNevado({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#587c8d";
    ctx.fillRect(-28, 32, 62, 8);
    ctx.fillStyle = "#655443";
    ctx.fillRect(-6, 12, 12, 26);

    ctx.fillStyle = "#24566a";
    ctx.fillRect(-15, -42, 30, 18);
    ctx.fillRect(-25, -28, 50, 22);
    ctx.fillRect(-34, -10, 68, 25);
    ctx.fillRect(-42, 10, 84, 22);

    ctx.fillStyle = "#e9f9ff";
    ctx.fillRect(-11, -42, 22, 7);
    ctx.fillRect(-21, -27, 34, 7);
    ctx.fillRect(-30, -9, 43, 7);
    ctx.fillRect(-38, 11, 55, 7);
    ctx.fillStyle = "#a8d5e6";
    ctx.fillRect(13, -20, 9, 7);
    ctx.fillRect(18, 0, 12, 7);
    ctx.fillRect(22, 20, 15, 7);
    ctx.restore();
}

function desenharBlocoDeGelo({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#527f94";
    ctx.fillRect(-30, -15, 64, 38);
    ctx.fillRect(-22, -24, 48, 48);
    ctx.fillStyle = "#7dc7df";
    ctx.fillRect(-26, -12, 54, 31);
    ctx.fillRect(-18, -20, 39, 39);
    ctx.fillStyle = "#dff9ff";
    ctx.fillRect(-14, -16, 18, 7);
    ctx.fillRect(-21, -6, 10, 18);
    ctx.fillStyle = "#4f9fbd";
    ctx.fillRect(10, 3, 14, 12);
    ctx.restore();
}

function desenharLagoCongelado({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#5b8fa6";
    ctx.fillRect(-62, -26, 124, 52);
    ctx.fillRect(-76, -14, 152, 28);
    ctx.fillStyle = "#9ed8e9";
    ctx.fillRect(-57, -20, 114, 40);
    ctx.fillRect(-68, -9, 136, 18);
    ctx.fillStyle = "#e7fbff";
    ctx.fillRect(-42, -12, 35, 6);
    ctx.fillRect(13, 8, 31, 5);
    ctx.fillStyle = "#5ca6c2";
    ctx.fillRect(-3, -5, 7, 18);
    ctx.fillRect(-20, 8, 23, 5);
    ctx.fillRect(3, -6, 20, 5);
    ctx.restore();
}

function desenharArvoreDaSelva({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#402d1b";
    ctx.fillRect(-8, -6, 16, 45);
    ctx.fillStyle = "#67452a";
    ctx.fillRect(-3, -6, 6, 45);
    ctx.fillStyle = "#173d25";
    ctx.fillRect(-31, -45, 62, 31);
    ctx.fillRect(-42, -33, 84, 22);
    ctx.fillStyle = "#28623a";
    ctx.fillRect(-25, -54, 50, 24);
    ctx.fillRect(-36, -38, 28, 21);
    ctx.fillRect(9, -37, 30, 20);
    ctx.fillStyle = "#4f8a48";
    ctx.fillRect(-17, -48, 17, 9);
    ctx.fillRect(17, -30, 14, 8);
    ctx.restore();
}

function desenharRuinaDaSelva({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#24341f";
    ctx.fillRect(-34, 18, 68, 10);
    ctx.fillStyle = "#657054";
    ctx.fillRect(-28, -25, 18, 43);
    ctx.fillRect(10, -36, 19, 54);
    ctx.fillRect(-20, -31, 40, 12);
    ctx.fillStyle = "#8b8d68";
    ctx.fillRect(-23, -20, 8, 29);
    ctx.fillRect(15, -30, 8, 20);
    ctx.fillStyle = "#38613a";
    ctx.fillRect(-31, -28, 12, 8);
    ctx.fillRect(18, -39, 15, 7);
    ctx.fillRect(24, -33, 7, 23);
    ctx.restore();
}

function desenharCipoDaSelva({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#315f32";
    ctx.fillRect(-3, -32, 6, 64);
    ctx.fillRect(2, 20, 18, 6);
    ctx.fillRect(-18, -12, 18, 6);
    ctx.fillStyle = "#5b9144";
    ctx.fillRect(13, 15, 13, 13);
    ctx.fillRect(-25, -18, 12, 12);
    ctx.restore();
}

function desenharFlorTropical({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#245b30";
    ctx.fillRect(-2, -1, 4, 22);
    ctx.fillStyle = "#ff6b91";
    ctx.fillRect(-14, -12, 12, 12);
    ctx.fillRect(2, -12, 12, 12);
    ctx.fillRect(-6, -20, 12, 12);
    ctx.fillStyle = "#ffd56a";
    ctx.fillRect(-5, -9, 10, 10);
    ctx.restore();
}

function desenharLagoDaSelva({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#173d35";
    ctx.fillRect(-57, -24, 114, 48);
    ctx.fillRect(-68, -13, 136, 26);
    ctx.fillStyle = "#2f7565";
    ctx.fillRect(-51, -17, 102, 34);
    ctx.fillRect(-61, -8, 122, 16);
    ctx.fillStyle = "#64aa78";
    ctx.fillRect(-36, -9, 25, 5);
    ctx.fillRect(20, 7, 22, 5);
    ctx.fillStyle = "#5a7d3a";
    ctx.fillRect(-5, -5, 17, 12);
    ctx.fillStyle = "#8bb850";
    ctx.fillRect(-1, -3, 9, 6);
    ctx.restore();
}

function desenharArvoreTemperada({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#493422";
    ctx.fillRect(-9, -4, 18, 46);
    ctx.fillStyle = "#765033";
    ctx.fillRect(-3, -4, 7, 46);
    ctx.fillStyle = "#6f351f";
    ctx.fillRect(-36, -41, 72, 25);
    ctx.fillRect(-45, -27, 90, 23);
    ctx.fillStyle = "#b85b2d";
    ctx.fillRect(-28, -52, 56, 26);
    ctx.fillRect(-38, -35, 31, 24);
    ctx.fillStyle = "#d99237";
    ctx.fillRect(7, -37, 33, 25);
    ctx.fillRect(-18, -48, 21, 13);
    ctx.fillStyle = "#f0bd55";
    ctx.fillRect(16, -31, 12, 9);
    ctx.fillRect(-31, -27, 11, 8);
    ctx.restore();
}

function desenharCogumelosTemperados({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#e3cfaa";
    ctx.fillRect(-15, -2, 7, 18);
    ctx.fillRect(10, 4, 6, 13);
    ctx.fillStyle = "#a94732";
    ctx.fillRect(-23, -10, 23, 10);
    ctx.fillRect(-18, -16, 13, 16);
    ctx.fillStyle = "#d9853b";
    ctx.fillRect(3, -3, 20, 8);
    ctx.fillRect(8, -8, 10, 12);
    ctx.fillStyle = "#f2d778";
    ctx.fillRect(-14, -12, 5, 4);
    ctx.fillRect(11, -5, 4, 4);
    ctx.restore();
}

function desenharTroncoCaido({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#3b2d21";
    ctx.fillRect(-48, -10, 96, 28);
    ctx.fillStyle = "#765037";
    ctx.fillRect(-43, -15, 83, 26);
    ctx.fillStyle = "#a77545";
    ctx.fillRect(-36, -10, 56, 7);
    ctx.fillStyle = "#423126";
    ctx.fillRect(32, -13, 17, 24);
    ctx.fillStyle = "#6d7d39";
    ctx.fillRect(-28, -17, 25, 6);
    ctx.fillRect(2, 7, 31, 6);
    ctx.restore();
}

function desenharLagoOutonal({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#344d45";
    ctx.fillRect(-66, -24, 132, 48);
    ctx.fillRect(-78, -12, 156, 24);
    ctx.fillStyle = "#52766e";
    ctx.fillRect(-59, -17, 118, 34);
    ctx.fillRect(-69, -7, 138, 14);
    ctx.fillStyle = "#91a58f";
    ctx.fillRect(-39, -9, 31, 5);
    ctx.fillStyle = "#d98238";
    ctx.fillRect(17, 5, 13, 7);
    ctx.fillRect(35, -8, 9, 6);
    ctx.restore();
}

function desenharLagoDeLava({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#171218";
    ctx.fillRect(-70, -24, 140, 48);
    ctx.fillRect(-82, -12, 164, 24);
    ctx.fillStyle = "#9f2f26";
    ctx.fillRect(-62, -17, 124, 34);
    ctx.fillRect(-72, -7, 144, 14);
    ctx.fillStyle = "#ff5a2d";
    ctx.fillRect(-48, -10, 39, 8);
    ctx.fillRect(5, 4, 45, 9);
    ctx.fillStyle = "#ffbd45";
    ctx.fillRect(-34, -8, 18, 4);
    ctx.fillRect(17, 6, 21, 4);
    ctx.restore();
}

function desenharVulcao({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#171218";
    ctx.fillRect(-48, 19, 96, 12);
    ctx.fillStyle = "#34252a";
    ctx.beginPath();
    ctx.moveTo(-48, 22);
    ctx.lineTo(-17, -32);
    ctx.lineTo(18, -32);
    ctx.lineTo(48, 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#5b2d2d";
    ctx.fillRect(-20, -32, 40, 10);
    ctx.fillStyle = "#e84d2d";
    ctx.fillRect(-8, -31, 16, 35);
    ctx.fillStyle = "#ffb13b";
    ctx.fillRect(-3, -31, 6, 22);
    ctx.restore();
}

function desenharCristalDeObsidiana({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#120f18";
    ctx.beginPath();
    ctx.moveTo(0, -38);
    ctx.lineTo(21, -10);
    ctx.lineTo(14, 31);
    ctx.lineTo(-15, 31);
    ctx.lineTo(-22, -10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#6d3c63";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = "#ff6038";
    ctx.fillRect(-3, -20, 6, 34);
    ctx.fillStyle = "#ffb13b";
    ctx.fillRect(6, 9, 5, 12);
    ctx.restore();
}

function desenharRochaDeBasalto({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#171319";
    ctx.fillRect(-27, -18, 54, 37);
    ctx.fillRect(-18, -27, 35, 54);
    ctx.fillStyle = "#3f3038";
    ctx.fillRect(-19, -14, 38, 26);
    ctx.fillRect(-11, -21, 20, 39);
    ctx.fillStyle = "#76505a";
    ctx.fillRect(-10, -14, 8, 8);
    ctx.restore();
}

function desenharPocaToxica({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#172b22";
    ctx.fillRect(-66, -24, 132, 48);
    ctx.fillRect(-78, -12, 156, 24);
    ctx.fillStyle = "#52723d";
    ctx.fillRect(-59, -17, 118, 34);
    ctx.fillRect(-69, -7, 138, 14);
    ctx.fillStyle = "#9ac957";
    ctx.fillRect(-42, -9, 35, 6);
    ctx.fillRect(14, 5, 32, 7);
    ctx.fillStyle = "#d2ed72";
    ctx.fillRect(-27, -7, 11, 3);
    ctx.fillRect(28, 7, 9, 3);
    ctx.restore();
}

function desenharArvoreDoPantano({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#18281f";
    ctx.fillRect(-30, 33, 66, 9);
    ctx.fillStyle = "#4a4430";
    ctx.fillRect(-8, -28, 16, 68);
    ctx.fillRect(-25, -12, 22, 10);
    ctx.fillRect(3, -22, 27, 10);
    ctx.fillStyle = "#6a6139";
    ctx.fillRect(-3, -24, 6, 57);
    ctx.fillStyle = "#2c5335";
    ctx.fillRect(-36, -47, 72, 22);
    ctx.fillRect(-46, -33, 38, 20);
    ctx.fillRect(9, -39, 39, 22);
    ctx.fillStyle = "#668245";
    ctx.fillRect(-24, -43, 18, 8);
    ctx.fillRect(18, -34, 16, 8);
    ctx.restore();
}

function desenharJuncosDoPantano({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#314e30";
    ctx.fillRect(-18, -19, 5, 38);
    ctx.fillRect(-3, -28, 5, 47);
    ctx.fillRect(13, -22, 5, 41);
    ctx.fillStyle = "#87a94d";
    ctx.fillRect(-20, -25, 9, 11);
    ctx.fillRect(-5, -34, 9, 11);
    ctx.fillRect(11, -28, 9, 11);
    ctx.fillStyle = "#1d3024";
    ctx.fillRect(-28, 17, 56, 7);
    ctx.restore();
}

function desenharCogumeloDoPantano({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#d4db9b";
    ctx.fillRect(-5, -1, 10, 24);
    ctx.fillStyle = "#577a45";
    ctx.fillRect(-25, -14, 50, 15);
    ctx.fillRect(-17, -23, 34, 24);
    ctx.fillStyle = "#b8e85d";
    ctx.fillRect(-12, -19, 9, 7);
    ctx.fillRect(6, -13, 8, 7);
    ctx.fillStyle = "rgba(190, 247, 100, .32)";
    ctx.fillRect(-30, -28, 60, 5);
    ctx.restore();
}

function desenharArvorePrimordial({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#17291d";
    ctx.fillRect(-42, 34, 88, 10);
    ctx.fillStyle = "#453421";
    ctx.fillRect(-12, -25, 24, 66);
    ctx.fillRect(-31, -11, 25, 12);
    ctx.fillRect(6, -20, 32, 12);
    ctx.fillStyle = "#75502d";
    ctx.fillRect(-5, -23, 8, 61);
    ctx.fillStyle = "#173c24";
    ctx.fillRect(-44, -58, 88, 24);
    ctx.fillRect(-56, -43, 50, 25);
    ctx.fillRect(7, -49, 52, 27);
    ctx.fillStyle = "#356b36";
    ctx.fillRect(-31, -66, 63, 22);
    ctx.fillRect(-47, -45, 27, 17);
    ctx.fillRect(21, -44, 29, 17);
    ctx.fillStyle = "#8d7638";
    ctx.fillRect(-20, -59, 14, 7);
    ctx.fillRect(26, -40, 13, 7);
    ctx.restore();
}

function desenharSamambaiaGigante({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#183923";
    ctx.fillRect(-3, -25, 6, 49);
    ctx.fillStyle = "#3f773d";
    for (let indice = 0; indice < 4; indice++) {
        const deslocamentoY = -20 + indice * 11;
        const largura = 28 - indice * 3;
        ctx.fillRect(-largura, deslocamentoY, largura - 2, 7);
        ctx.fillRect(5, deslocamentoY + 4, largura, 7);
    }
    ctx.fillStyle = "#759b48";
    ctx.fillRect(-25, -18, 8, 5);
    ctx.fillRect(18, -3, 9, 5);
    ctx.restore();
}

function desenharCristalDeAmbar({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#4b331d";
    ctx.fillRect(-27, 24, 57, 8);
    ctx.fillStyle = "#a65d25";
    ctx.beginPath();
    ctx.moveTo(0, -37);
    ctx.lineTo(18, -10);
    ctx.lineTo(13, 26);
    ctx.lineTo(-15, 26);
    ctx.lineTo(-21, -10);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#e69a35";
    ctx.fillRect(-7, -22, 8, 36);
    ctx.fillStyle = "#ffd56b";
    ctx.fillRect(4, -8, 7, 22);
    ctx.restore();
}

function desenharOssosPrimordiais({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#38412d";
    ctx.fillRect(-42, 18, 84, 7);
    ctx.fillStyle = "#d4c58b";
    ctx.fillRect(-35, -3, 70, 9);
    ctx.fillRect(-39, -8, 12, 19);
    ctx.fillRect(27, -8, 12, 19);
    ctx.fillRect(-17, -20, 8, 42);
    ctx.fillRect(9, -15, 8, 37);
    ctx.fillStyle = "#8e845d";
    ctx.fillRect(-10, 0, 20, 5);
    ctx.restore();
}

function desenharPredioNeon({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#07101d";
    ctx.fillRect(-34, -52, 68, 96);
    ctx.fillStyle = "#1b304d";
    ctx.fillRect(-27, -45, 54, 82);
    ctx.fillStyle = "#2b4666";
    ctx.fillRect(-17, -60, 34, 15);
    ctx.fillStyle = "#48edf4";
    for (let linha = 0; linha < 4; linha++) {
        for (let coluna = 0; coluna < 3; coluna++) {
            if ((linha + coluna) % 3 !== 1) {
                ctx.fillRect(-20 + coluna * 16, -35 + linha * 17, 8, 7);
            }
        }
    }
    ctx.fillStyle = "#e955dc";
    ctx.fillRect(-27, 11, 54, 5);
    ctx.restore();
}

function desenharArvoreHolografica({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.globalAlpha = 0.82;
    ctx.fillStyle = "#0a1525";
    ctx.fillRect(-25, 26, 50, 8);
    ctx.fillStyle = "#e955dc";
    ctx.fillRect(-4, -6, 8, 34);
    ctx.fillStyle = "#48edf4";
    ctx.fillRect(-27, -16, 54, 10);
    ctx.fillRect(-20, -29, 40, 11);
    ctx.fillRect(-11, -41, 22, 11);
    ctx.strokeStyle = "#b8ffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(-30, -44, 60, 72);
    ctx.restore();
}

function desenharPlacaNeon({ x, y, escala }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "#07101d";
    ctx.fillRect(-30, -24, 60, 39);
    ctx.fillRect(-5, 15, 10, 27);
    ctx.strokeStyle = "#e955dc";
    ctx.lineWidth = 4;
    ctx.strokeRect(-30, -24, 60, 39);
    ctx.fillStyle = "#48edf4";
    ctx.fillRect(-19, -13, 38, 5);
    ctx.fillRect(-19, -2, 25, 5);
    ctx.restore();
}

function desenharPortao(x, y, cor, rotulo, inverter) {
    const posicaoX = inverter ? x - 20 : x;
    const textoX = inverter ? x - 30 : x + 30;

    ctx.save();
    ctx.fillStyle = "#10241a";
    ctx.fillRect(posicaoX, y - 48, 20, 96);
    ctx.strokeStyle = "#d9e5c9";
    ctx.lineWidth = 3;
    ctx.strokeRect(posicaoX, y - 48, 20, 96);
    ctx.fillStyle = cor;
    ctx.fillRect(posicaoX + 6, y - 38, 8, 76);
    ctx.textAlign = inverter ? "right" : "left";
    ctx.font = "900 11px monospace";
    ctx.fillStyle = "#f4f1d0";
    ctx.fillText(rotulo, textoX, y - 50);
    ctx.restore();
}

function desenharTorreFinal(x, y, tema) {
    const largura = CONFIG.torreFinal.largura;
    const altura = CONFIG.torreFinal.altura;
    const metadeDaLargura = largura / 2;
    const topo = -altura / 2;

    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));

    ctx.fillStyle = "rgba(7, 15, 12, 0.48)";
    ctx.fillRect(-metadeDaLargura - 7, topo + 9, largura + 14, altura + 13);

    ctx.fillStyle = tema.torreFinalBase;
    ctx.fillRect(-metadeDaLargura - 6, altura / 2 - 13, largura + 12, 15);
    ctx.fillRect(-metadeDaLargura, topo + 6, largura, altura - 17);

    ctx.fillStyle = tema.torreFinalCorpo;
    ctx.fillRect(-metadeDaLargura + 7, topo + 13, largura - 14, altura - 30);
    ctx.fillRect(-metadeDaLargura + 2, topo, 13, 20);
    ctx.fillRect(-6, topo, 13, 20);
    ctx.fillRect(metadeDaLargura - 15, topo, 13, 20);

    ctx.fillStyle = tema.torreFinalDetalhe;
    ctx.fillRect(-metadeDaLargura + 12, topo + 19, largura - 24, 7);
    ctx.fillRect(-metadeDaLargura + 12, topo + 31, 8, 17);
    ctx.fillRect(metadeDaLargura - 20, topo + 31, 8, 17);

    ctx.fillStyle = tema.torreFinalBase;
    ctx.fillRect(-13, topo + 29, 26, 32);
    ctx.fillStyle = tema.torreFinalNucleo;
    ctx.fillRect(-7, topo + 35, 14, 14);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-4, topo + 38, 5, 5);

    ctx.strokeStyle = "#f5f0d0";
    ctx.lineWidth = 3;
    ctx.strokeRect(-metadeDaLargura, topo + 6, largura, altura - 17);

    ctx.fillStyle = "rgba(10, 22, 17, 0.92)";
    ctx.fillRect(-27, topo - 21, 54, 16);
    ctx.fillStyle = "#f4f1d0";
    ctx.font = "900 10px monospace";
    ctx.textAlign = "center";
    ctx.fillText(localizar("BASE"), 0, topo - 10);
    ctx.restore();
}

function desenharCamadaDeCaminhos(caminhos, cor, largura, tracejado = []) {
    ctx.save();
    ctx.strokeStyle = cor;
    ctx.lineWidth = largura;
    ctx.setLineDash(tracejado);
    desenharTracadoDoCaminho(caminhos);
    ctx.stroke();
    ctx.restore();
}

function desenharCaminhosComTema(tema, caminhos) {
    desenharCamadaDeCaminhos(caminhos, tema.caminhoContorno, 84);
    desenharCamadaDeCaminhos(caminhos, tema.caminhoBase, 72);
    desenharCamadaDeCaminhos(caminhos, tema.caminhoCentro, 58);
    desenharCamadaDeCaminhos(caminhos, tema.caminhoMarcas, 4, [12, 14]);
}

function desenharCaminhoVivo(tema, caminhos) {
    const configuracao = CONFIG.caminhoVivo;
    const caminhoAtivo = caminhos[obterIndiceDoCaminhoVivoNaWave()] || caminhos[0];
    const atalho = caminhos[configuracao.indiceDoAtalhoDoTirano];
    const caminhosComuns = caminhos.slice(0, configuracao.indiceDoAtalhoDoTirano);

    desenharCamadaDeCaminhos(caminhosComuns, "#172619", 82);
    desenharCamadaDeCaminhos(caminhosComuns, "#293a28", 68);
    desenharCamadaDeCaminhos(caminhosComuns, "#3b472f", 52);
    desenharCamadaDeCaminhos(caminhosComuns, "rgba(174, 143, 73, 0.34)", 3, [8, 17]);

    desenharCamadaDeCaminhos([atalho], "#142218", 66);
    desenharCamadaDeCaminhos([atalho], "#233426", 54);
    desenharCamadaDeCaminhos([atalho], "#32422e", 40);
    desenharCamadaDeCaminhos([atalho], "rgba(146, 116, 60, 0.3)", 3, [6, 18]);

    desenharCaminhosComTema(tema, [caminhoAtivo]);

    if (waveAbreAtalhoDoTirano()) {
        ctx.save();
        ctx.shadowColor = "rgba(255, 173, 60, 0.7)";
        ctx.shadowBlur = 16;
        desenharCamadaDeCaminhos([atalho], "#4b281b", 76);
        ctx.restore();
        desenharCamadaDeCaminhos([atalho], "#754122", 64);
        desenharCamadaDeCaminhos([atalho], "#9b632b", 48);
        desenharCamadaDeCaminhos([atalho], "#ffd66b", 4, [10, 12]);
    }

    desenharRaizesDoCaminhoVivo();
}

function desenharBarreiraDeRaizes(x, y, rotacao, aberta, atalho = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotacao);
    ctx.fillStyle = atalho ? "#5e371f" : "#503b22";

    if (aberta) {
        ctx.fillRect(-45, -6, 23, 12);
        ctx.fillRect(22, -6, 23, 12);
        ctx.fillRect(-38, -17, 8, 12);
        ctx.fillRect(30, 5, 8, 12);
    } else {
        ctx.fillRect(-45, -6, 90, 12);
        ctx.fillRect(-34, -18, 9, 16);
        ctx.fillRect(-5, 4, 10, 17);
        ctx.fillRect(25, -16, 9, 14);
    }

    ctx.fillStyle = atalho ? "#ffb446" : "#b58a42";
    ctx.fillRect(aberta ? -26 : -8, -3, 6, 6);
    ctx.fillRect(aberta ? 20 : 17, -3, 6, 6);
    ctx.restore();
}

function desenharRaizesDoCaminhoVivo() {
    const configuracao = CONFIG.caminhoVivo;
    const indiceAtivo = obterIndiceDoCaminhoVivoNaWave();
    desenharBarreiraDeRaizes(
        140,
        330,
        0,
        indiceAtivo === configuracao.indiceDoCaminhoAlto
    );
    desenharBarreiraDeRaizes(
        235,
        420,
        Math.PI / 2,
        indiceAtivo === configuracao.indiceDoCaminhoBaixo
    );
    desenharBarreiraDeRaizes(
        235,
        520,
        Math.PI / 2,
        waveAbreAtalhoDoTirano(),
        true
    );
}

function desenharTracadoDoCaminho(caminhos = obterCaminhosAtuais()) {
    ctx.beginPath();

    for (const caminhoAtual of caminhos) {
        ctx.moveTo(caminhoAtual[0].x, caminhoAtual[0].y);

        for (let i = 1; i < caminhoAtual.length; i++) {
            ctx.lineTo(caminhoAtual[i].x, caminhoAtual[i].y);
        }
    }
}

function desenharInterface() {
    const configuracaoDaConstrucao = obterConfiguracaoDaTorre();

    desenharPainelDoHud(16, 16, 440, 104);
    const rotuloDaWave = faseAtualEhSecreta()
        ? localizar("FASE SECRETA · WAVE")
        : modoWavesInfinitas
            ? localizar("FASE {fase} · INFINITO", { fase: faseSelecionada })
            : localizar("FASE {fase} · WAVE", { fase: faseSelecionada });
    desenharMetricaDoHud(34, 36, rotuloDaWave, wave.toString(), "#f2c76e");
    desenharMetricaDoHud(158, 36, localizar("CRÉDITOS"), dinheiro.toString(), "#7ce59c");
    desenharMetricaDoHud(300, 36, localizar("TORRES"), `${torres.length}/${obterLimiteDeTorres()}`, "#8fc9ff");
    desenharIndicadorDoCaminhoVivo();

    ctx.fillStyle = "rgba(196, 214, 203, 0.64)";
    ctx.font = "600 11px system-ui, sans-serif";
    const detalheDaConstrucao = configuracaoDaConstrucao.tipoDeItem === "mina"
        ? localizar("Dano {dano} · área {raio} px · encoste para explodir", {
            dano: configuracaoDaConstrucao.dano,
            raio: configuracaoDaConstrucao.raioExplosao
        })
        : configuracaoDaConstrucao.tipoDeItem === "bomba"
            ? localizar("Dano {dano} · área {raio} px · clique para acender", {
                dano: configuracaoDaConstrucao.dano,
                raio: configuracaoDaConstrucao.raioExplosao
            })
        : configuracaoDaConstrucao.percentualBonusCadencia
            ? localizar("+{percentual}% de cadência próxima", {
                percentual: obterPercentualInteiro(configuracaoDaConstrucao.percentualBonusCadencia)
            })
            : configuracaoDaConstrucao.efeitoSismico
                ? localizar("Carga com {cargas} inimigos · Empurra {distancia} px", {
                    cargas: configuracaoDaConstrucao.efeitoSismico.cargasNecessarias,
                    distancia: configuracaoDaConstrucao.efeitoSismico.distanciaDoEmpurrao
                })
            : configuracaoDaConstrucao.creditosPorWave
                ? localizar("Produz {creditos} por wave completa", {
                    creditos: configuracaoDaConstrucao.creditosPorWave
                })
            : configuracaoDaConstrucao.naoAtira
                ? localizar("Atrai inimigos atiradores")
                : configuracaoDaConstrucao.efeitoDeQueimadura
                    ? localizar("Queima {dano}/s por {segundos}s", {
                        dano: configuracaoDaConstrucao.efeitoDeQueimadura.danoPorIntervalo,
                        segundos: obterDuracaoDaQueimaduraEmSegundos(
                            configuracaoDaConstrucao.efeitoDeQueimadura
                        )
                    })
                : localizar("Cada tiro  +{creditos}", {
                    creditos: obterRecompensaPorTiro()
                });
    ctx.fillText(
        `${obterNomeLocalizado(configuracaoDaConstrucao)}  ${configuracaoDaConstrucao.custo}   •   ${detalheDaConstrucao}`,
        34,
        101
    );

    if (torreSelecionada) {
        const configuracaoSelecionada = obterConfiguracaoDaTorre(torreSelecionada.tipo);
        const largura = 250;
        const x = canvas.width - largura - 16;
        desenharPainelDoHud(x, 16, largura, 104);
        ctx.fillStyle = "#9bb0a4";
        ctx.font = "800 10px system-ui, sans-serif";
        ctx.fillText(localizar("TORRE SELECIONADA"), x + 18, 40);
        ctx.fillStyle = "#ffffff";
        ctx.font = "800 22px system-ui, sans-serif";
        ctx.fillText(
            configuracaoSelecionada.efeitoSismico
                ? localizar("CARGA SÍSMICA")
                : configuracaoSelecionada.creditosPorWave
                    ? localizar("GERADOR ATIVO")
                    : configuracaoSelecionada.percentualBonusCadencia
                        ? localizar("SUPORTE ATIVO")
                        : configuracaoSelecionada.naoAtira
                            ? localizar("ISCA DEFENSIVA")
                    : configuracaoPossuiMelhorias(configuracaoSelecionada)
                        ? localizar("Nível {nivel}/3", { nivel: torreSelecionada.nivel })
                        : obterNomeLocalizado(configuracaoSelecionada),
            x + 18,
            68
        );
        ctx.fillStyle = "#b8c9be";
        ctx.font = "600 11px system-ui, sans-serif";
        const configuracaoAtualSelecionada = obterConfiguracaoAtualDaTorre(torreSelecionada);
        const detalheSelecionado = configuracaoSelecionada.efeitoSismico
            ? localizar("Carga {atual}/{total}  •  Empurra {distancia} px", {
                atual: torreSelecionada.cargaSismica || 0,
                total: configuracaoAtualSelecionada.efeitoSismico.cargasNecessarias,
                distancia: configuracaoAtualSelecionada.efeitoSismico.distanciaDoEmpurrao
            })
            : configuracaoSelecionada.creditosPorWave
                ? localizar("Produção +{creditos} por wave completa", {
                    creditos: configuracaoAtualSelecionada.creditosPorWave
                })
                : configuracaoSelecionada.percentualBonusCadencia
                    ? localizar("Cadência próxima +{percentual}%  •  Alcance {alcance}", {
                        percentual: obterPercentualInteiro(configuracaoSelecionada.percentualBonusCadencia),
                        alcance: torreSelecionada.alcance
                    })
            : configuracaoSelecionada.naoAtira
                ? localizar("Resistência {atual}/{total} tiros", {
                    atual: obterResistenciaDaTorre(torreSelecionada) - (torreSelecionada.tirosRecebidos || 0),
                    total: obterResistenciaDaTorre(torreSelecionada)
                })
                : configuracaoSelecionada.efeitoDeQueimadura
                    ? localizar("Dano {dano}  •  Queima {danoQueimadura}/s por {segundos}s", {
                        dano: torreSelecionada.dano,
                        danoQueimadura: configuracaoSelecionada.efeitoDeQueimadura.danoPorIntervalo,
                        segundos: obterDuracaoDaQueimaduraEmSegundos(
                            configuracaoSelecionada.efeitoDeQueimadura
                        )
                    })
                : localizar("Dano {dano}  •  Alcance {alcance}", {
                    dano: torreSelecionada.dano,
                    alcance: torreSelecionada.alcance
                });
        ctx.fillText(detalheSelecionado, x + 18, 94);
    }

    if (Date.now() < avisoExpiraEm) {
        ctx.font = "700 15px system-ui, sans-serif";
        const largura = ctx.measureText(aviso).width + 42;
        const x = (canvas.width - largura) / 2;

        ctx.fillStyle = "rgba(91, 25, 28, 0.96)";
        desenharRetanguloArredondado(x, 132, largura, 42, 12);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 122, 120, 0.4)";
        ctx.stroke();
        ctx.fillStyle = "#fff2f1";
        ctx.fillText(aviso, x + 21, 159);
    }
}

function desenharIndicadorDoCaminhoVivo() {
    if (!faseAtualUsaCaminhoVivo()) {
        return;
    }

    const atalhoAberto = waveAbreAtalhoDoTirano();
    const x = 480;
    const y = 16;
    const largura = 292;
    const altura = atalhoAberto ? 88 : 66;
    desenharPainelDoHud(x, y, largura, altura);

    ctx.fillStyle = "#a8bdac";
    ctx.font = "800 10px system-ui, sans-serif";
    ctx.fillText(localizar("CAMINHO VIVO"), x + 18, y + 22);
    ctx.fillStyle = "#f5d986";
    ctx.font = "800 17px system-ui, sans-serif";
    ctx.fillText(
        `${localizar("ROTA")}: ${obterNomeDoCaminhoVivo(obterIndiceDoCaminhoVivoNaWave())}`,
        x + 18,
        y + 47
    );

    if (atalhoAberto) {
        ctx.fillStyle = "#ff9a4e";
        ctx.font = "900 12px system-ui, sans-serif";
        ctx.fillText(localizar("ATALHO ABERTO"), x + 18, y + 70);
    }
}

function desenharPainelDoHud(x, y, largura, altura) {
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(7, 21, 14, 0.9)";
    desenharRetanguloArredondado(x, y, largura, altura, 15);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(200, 235, 211, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
}

function desenharMetricaDoHud(x, y, rotulo, valor, cor) {
    ctx.fillStyle = "#8da397";
    ctx.font = "800 10px system-ui, sans-serif";
    ctx.fillText(rotulo, x, y);
    ctx.fillStyle = cor;
    ctx.font = "800 27px system-ui, sans-serif";
    ctx.fillText(valor, x, y + 30);
}

function obterEscalaVisualDoInimigo(tipo, tamanhoPadrao) {
    const escalaConfigurada = CONFIG.inimigo[tipo]?.escalaVisual;
    return Number.isFinite(escalaConfigurada) ? escalaConfigurada : tamanhoPadrao;
}

function desenharInimigos() {
    for (const inimigo of inimigos) {
        const escalaVisual = obterEscalaVisualDoInimigo(inimigo.tipo, inimigo.tamanho);
        const tamanho = escalaVisual * 2;
        const x = Math.round(inimigo.x - escalaVisual);
        const y = Math.round(inimigo.y - escalaVisual);

        desenharCorpoDoInimigo(inimigo, x, y, tamanho);
        desenharEfeitoGlacialNoInimigo(inimigo, x, y, tamanho);
        desenharEfeitoDeQueimaduraNoInimigo(inimigo, x, y, tamanho);
        desenharEfeitoSismicoNoInimigo(inimigo, x, y, tamanho);
        desenharEfeitosFuturistasNoInimigo(inimigo, x, y, tamanho);

        const larguraBarra = Math.max(42, inimigo.tamanho * 1.8);
        const xBarra = inimigo.x - larguraBarra / 2;
        const yBarra = inimigo.y - inimigo.tamanho - 15;
        const percentualVida = Math.max(0, inimigo.vida / inimigo.vidaMaxima);

        ctx.fillStyle = "#07120c";
        ctx.fillRect(xBarra, yBarra, larguraBarra, 8);
        ctx.fillStyle = percentualVida > 0.35 ? "#68df89" : "#ff6b6b";
        ctx.fillRect(xBarra + 2, yBarra + 2, (larguraBarra - 4) * percentualVida, 4);
    }
}

function desenharEfeitoSismicoNoInimigo(inimigo, x, y, tamanho) {
    const agora = Date.now();
    const atordoado = agora < (inimigo.atordoadoPelaTorreSismicaAte || 0);
    const vulneravel = agora < (inimigo.vulnerabilidadeSismicaExpiraEm || 0);

    if (!atordoado && !vulneravel) {
        return;
    }

    const unidade = Math.max(3, Math.round(tamanho / 12));
    ctx.save();
    ctx.strokeStyle = atordoado ? "#ffe08f" : "#ff9145";
    ctx.lineWidth = atordoado ? 4 : 2;
    ctx.strokeRect(x - 4, y - 4, tamanho + 8, tamanho + 8);
    ctx.fillStyle = "#ff9145";
    ctx.fillRect(x - unidade, y + unidade, unidade * 2, unidade);
    ctx.fillRect(x + tamanho - unidade, y + tamanho - unidade * 2, unidade * 2, unidade);
    ctx.fillRect(x + tamanho / 2 - unidade / 2, y - unidade, unidade, unidade * 2);
    ctx.restore();
}

function desenharEfeitosFuturistasNoInimigo(inimigo, x, y, tamanho) {
    const agora = Date.now();
    ctx.save();

    if (inimigoEstaEmTrilhoDeImpulso(inimigo)) {
        ctx.strokeStyle = "rgba(69, 241, 237, 0.9)";
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 4, y - 4, tamanho + 8, tamanho + 8);
        ctx.fillStyle = "#ec57df";
        ctx.fillRect(x - 11, y + tamanho / 2 - 3, 9, 6);
    }

    if (inimigo.tipo === "sentinelaDeEscudo") {
        ctx.strokeStyle = "rgba(83, 245, 255, 0.5)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(inimigo.x, inimigo.y, inimigo.tamanho + 11, 0, Math.PI * 2);
        ctx.stroke();
    }

    if (agora < (inimigo.reparoExpiraEm || 0) && inimigo.alvoDoReparo?.vida > 0) {
        ctx.strokeStyle = "#64fff2";
        ctx.lineWidth = 4;
        ctx.setLineDash([8, 5]);
        ctx.beginPath();
        ctx.moveTo(inimigo.x, inimigo.y);
        ctx.lineTo(inimigo.alvoDoReparo.x, inimigo.alvoDoReparo.y);
        ctx.stroke();
    }

    if (agora < (inimigo.reparadoExpiraEm || 0)) {
        ctx.fillStyle = "#6dffd2";
        ctx.fillRect(inimigo.x - 3, y - 12, 6, 20);
        ctx.fillRect(inimigo.x - 10, y - 5, 20, 6);
    }

    if (agora < (inimigo.reversaoTemporalExpiraEm || 0)) {
        const margem = 8 + (Math.floor(agora / 90) % 3) * 5;
        ctx.strokeStyle = "#ec57df";
        ctx.lineWidth = 4;
        ctx.strokeRect(x - margem, y - margem, tamanho + margem * 2, tamanho + margem * 2);
        ctx.strokeStyle = "#53f5ff";
        ctx.lineWidth = 2;
        ctx.strokeRect(x - margem - 7, y - margem - 7, tamanho + (margem + 7) * 2, tamanho + (margem + 7) * 2);
    }

    ctx.restore();
}

function desenharEfeitoDeQueimaduraNoInimigo(inimigo, x, y, tamanho) {
    const agora = Date.now();

    if (agora >= (inimigo.queimaduraExpiraEm || 0)) {
        return;
    }

    const unidade = Math.max(3, Math.round(tamanho / 12));
    const oscilacao = Math.floor(agora / 120) % 2;
    const centroX = Math.round(x + tamanho / 2);
    const baseY = Math.round(y + tamanho - unidade);

    ctx.save();
    ctx.fillStyle = "rgba(255, 79, 25, 0.42)";
    ctx.fillRect(x - unidade, y + unidade * 2, unidade * 2, tamanho - unidade * 3);
    ctx.fillRect(x + tamanho - unidade, y + unidade * 3, unidade * 2, tamanho - unidade * 4);
    ctx.fillStyle = "#ff5a24";
    ctx.fillRect(centroX - unidade * 2, baseY - unidade * (4 + oscilacao), unidade * 2, unidade * 4);
    ctx.fillRect(centroX, baseY - unidade * (3 + (1 - oscilacao)), unidade * 2, unidade * 3);
    ctx.fillStyle = "#ffb52e";
    ctx.fillRect(centroX - unidade, baseY - unidade * (3 + oscilacao), unidade, unidade * 3);
    ctx.fillRect(centroX + unidade, baseY - unidade * 2, unidade, unidade * 2);
    ctx.fillStyle = "#fff078";
    ctx.fillRect(centroX - unidade, baseY - unidade * 2, unidade, unidade * 2);
    ctx.restore();
}

function desenharInformacoesDoInimigoSobCursor() {
    if (!posicaoCursorNoMapa) {
        return;
    }

    const inimigo = encontrarInimigoNaPosicao(
        posicaoCursorNoMapa.x,
        posicaoCursorNoMapa.y
    );
    canvas.classList.toggle("inimigo-sob-cursor", Boolean(inimigo));

    if (!inimigo) {
        return;
    }

    const configuracao = CONFIG.inimigo[inimigo.tipo];
    const nome = configuracao ? obterNomeLocalizado(configuracao) : localizar("Inimigo");
    const vidaAtual = Math.max(0, Math.ceil(inimigo.vida));
    const vidaMaxima = Math.ceil(inimigo.vidaMaxima);
    const textoVida = localizar("Vida {atual} / {maxima}", {
        atual: vidaAtual,
        maxima: vidaMaxima
    });

    ctx.save();
    ctx.font = "900 14px 'Courier New', monospace";
    const largura = Math.max(
        134,
        Math.ceil(ctx.measureText(nome).width) + 22,
        Math.ceil(ctx.measureText(textoVida).width) + 22
    );
    const altura = 54;
    let x = posicaoCursorNoMapa.x + 18;
    let y = posicaoCursorNoMapa.y - altura - 16;

    if (x + largura > canvas.width - 8) {
        x = posicaoCursorNoMapa.x - largura - 18;
    }

    if (y < 8) {
        y = posicaoCursorNoMapa.y + 18;
    }

    x = Math.max(8, Math.min(x, canvas.width - largura - 8));
    y = Math.max(8, Math.min(y, canvas.height - altura - 8));
    x = Math.round(x);
    y = Math.round(y);

    ctx.fillStyle = "#07120c";
    ctx.fillRect(x + 4, y + 4, largura, altura);
    ctx.fillStyle = "#102218";
    ctx.fillRect(x, y, largura, altura);
    ctx.strokeStyle = configuracao?.cor || "#f4f1d0";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, largura, altura);
    ctx.fillStyle = "#fff36a";
    ctx.fillText(nome, x + 11, y + 21);
    ctx.fillStyle = "#b8d6c0";
    ctx.font = "800 12px 'Courier New', monospace";
    ctx.fillText(textoVida, x + 11, y + 42);
    ctx.restore();
}

function desenharEfeitoGlacialNoInimigo(inimigo, x, y, tamanho) {
    const agora = Date.now();
    const congelado = agora < (inimigo.congeladoAte || 0);
    const desacelerado = agora < (inimigo.lentidaoExpiraEm || 0);

    if (!congelado && !desacelerado) {
        return;
    }

    ctx.strokeStyle = congelado ? "#e9fcff" : "#75d9ee";
    ctx.lineWidth = congelado ? 4 : 2;
    ctx.strokeRect(x - 3, y - 3, tamanho + 6, tamanho + 6);
    ctx.fillStyle = congelado ? "#ffffff" : "#a9f1ff";
    ctx.fillRect(x - 7, y - 7, 7, 7);
    ctx.fillRect(x + tamanho, y + tamanho, 7, 7);
}

function desenharCorpoDoInimigo(inimigo, x, y, tamanho) {
    if (inimigo.tipo === "protocoloZero") {
        desenharProtocoloZero(inimigo, x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "sentinelaDeEscudo") {
        desenharSentinelaDeEscudo(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "roboReparador") {
        desenharRoboReparador(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "droneCacador") {
        desenharDroneCacador(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "bossPrimordial") {
        desenharTiranoPrimordial(inimigo, x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "triceratopo") {
        desenharTriceratopo(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "besouroDeAmbar") {
        desenharBesouroDeAmbar(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "raptorAncestral") {
        desenharRaptorAncestral(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "bossPantano") {
        desenharHidraDoPantano(inimigo, x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "guardiaoDeLodo") {
        desenharGuardiaoDeLodo(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "sapoVenenoso") {
        desenharSapoVenenoso(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "mosquitoDoBrejo") {
        desenharMosquitoDoBrejo(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "bossGlitch") {
        desenharNucleoGlitch(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "blocoInstavel") {
        desenharBlocoInstavel(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "erroVeloz") {
        desenharErroVeloz(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "pixelCorrompido") {
        desenharPixelCorrompido(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "bossVulcanico") {
        desenharTitaDeObsidiana(inimigo, x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "fragmentoDeMagma") {
        desenharFragmentoDeMagma(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "golemDeMagma") {
        desenharGolemDeMagma(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "lagartoVulcanico") {
        desenharLagartoVulcanico(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "morcegoDeFogo") {
        desenharMorcegoDeFogo(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "bossTemperado") {
        desenharUrsoAncestral(inimigo, x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "raposaLadina") {
        desenharRaposaLadina(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "javaliFurioso") {
        desenharJavaliFurioso(inimigo, x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "corujaSombria") {
        desenharCorujaSombria(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "bossSelva") {
        desenharColossoDaSelva(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "macacoSaqueador") {
        desenharMacacoSaqueador(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "oncaDaSelva") {
        desenharOncaDaSelva(inimigo, x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "gorilaDaSelva") {
        desenharGorilaDaSelva(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "bossDeserto") {
        desenharFaraoDeAreia(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "escorpiao") {
        desenharEscorpiao(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "mumia") {
        desenharMumia(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "bossArtico") {
        desenharTitaGlacial(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "loboDeGelo") {
        desenharLoboDeGelo(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "yeti") {
        desenharYeti(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "boss") {
        desenharBossComum(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "sabotador") {
        desenharSabotador(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "normal") {
        desenharInimigoVermelho(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "elite") {
        desenharInimigoRoxo(x, y, tamanho);
        return;
    }

    if (inimigo.tipo === "rapido") {
        desenharInimigoCianoRapido(x, y, tamanho);
        return;
    }

    desenharInimigoBasico(inimigo, x, y, tamanho);
}

function desenharDroneCacador(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 10));
    ctx.fillStyle = "#07101d";
    ctx.fillRect(x, y + u * 3, tamanho, u * 5);
    ctx.fillRect(x + u * 3, y, tamanho - u * 6, tamanho);
    ctx.fillStyle = CONFIG.inimigo.droneCacador.cor;
    ctx.fillRect(x + u, y + u * 4, tamanho - u * 2, u * 3);
    ctx.fillRect(x + u * 4, y + u, tamanho - u * 8, tamanho - u * 2);
    ctx.fillStyle = "#ec57df";
    ctx.fillRect(x + u * 4, y + u * 4, tamanho - u * 8, u * 2);
    ctx.fillStyle = "#efffff";
    ctx.fillRect(x + u * 2, y + u * 5, u * 2, u);
    ctx.fillRect(x + tamanho - u * 4, y + u * 5, u * 2, u);
}

function desenharRoboReparador(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 11));
    ctx.fillStyle = "#0a1120";
    ctx.fillRect(x + u, y + u * 2, tamanho - u * 2, tamanho - u * 3);
    ctx.fillRect(x - u, y + u * 5, u * 4, u * 2);
    ctx.fillRect(x + tamanho - u * 3, y + u * 5, u * 4, u * 2);
    ctx.fillStyle = CONFIG.inimigo.roboReparador.cor;
    ctx.fillRect(x + u * 2, y + u * 3, tamanho - u * 4, tamanho - u * 6);
    ctx.fillStyle = "#4ff4ec";
    ctx.fillRect(x + u * 3, y + u * 4, tamanho - u * 6, u * 2);
    ctx.fillRect(x + tamanho / 2 - u, y + u * 2, u * 2, u * 6);
    ctx.fillStyle = "#c9d6ea";
    ctx.fillRect(x - u, y + u * 2, u * 4, u);
    ctx.fillRect(x - u, y + u, u, u * 4);
}

function desenharSentinelaDeEscudo(x, y, tamanho) {
    const u = Math.max(3, Math.floor(tamanho / 12));
    ctx.fillStyle = "#07101d";
    ctx.fillRect(x + u, y + u, tamanho - u * 2, tamanho - u * 2);
    ctx.fillStyle = CONFIG.inimigo.sentinelaDeEscudo.cor;
    ctx.fillRect(x + u * 2, y, tamanho - u * 4, tamanho - u * 2);
    ctx.fillRect(x, y + u * 2, tamanho, tamanho - u * 6);
    ctx.fillStyle = "#53f5ff";
    ctx.fillRect(x + u * 3, y + u * 2, tamanho - u * 6, u * 2);
    ctx.fillRect(x + u * 2, y + u * 5, u * 2, tamanho - u * 8);
    ctx.fillRect(x + tamanho - u * 4, y + u * 5, u * 2, tamanho - u * 8);
    ctx.fillStyle = "#ec57df";
    ctx.fillRect(x + tamanho / 2 - u, y + u * 5, u * 2, u * 2);
}

function desenharProtocoloZero(inimigo, x, y, tamanho) {
    const u = Math.max(4, Math.floor(tamanho / 15));
    ctx.fillStyle = "#060b16";
    ctx.fillRect(x + u, y + u * 3, tamanho - u * 2, tamanho - u * 5);
    ctx.fillRect(x + u * 3, y + u, tamanho - u * 6, tamanho - u * 2);
    ctx.fillStyle = CONFIG.inimigo.protocoloZero.cor;
    ctx.fillRect(x + u * 2, y + u * 4, tamanho - u * 4, tamanho - u * 7);
    ctx.fillRect(x + u * 4, y + u * 2, tamanho - u * 8, tamanho - u * 4);
    ctx.fillStyle = "#53f5ff";
    ctx.fillRect(x + u * 3, y + u * 4, tamanho - u * 6, u);
    ctx.fillRect(x + u * 4, y + tamanho - u * 5, tamanho - u * 8, u);
    ctx.fillStyle = "#ec57df";
    ctx.fillRect(x + tamanho / 2 - u * 3, y + u * 6, u * 6, u * 6);
    ctx.fillStyle = "#07101d";
    ctx.fillRect(x + tamanho / 2 - u, y + u * 7, u * 2, u * 4);
    ctx.fillStyle = "#f7ffff";
    ctx.fillRect(x + tamanho / 2 - u, y + u * 8, u * 2, u * 2);
}

function desenharRaptorAncestral(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 11));
    ctx.fillStyle = "#263321";
    ctx.fillRect(x + u * 2, y + u * 4, tamanho - u * 3, u * 5);
    ctx.fillRect(x + tamanho - u * 4, y + u * 2, u * 4, u * 4);
    ctx.fillRect(x, y + u * 6, u * 4, u * 2);
    ctx.fillStyle = CONFIG.inimigo.raptorAncestral.cor;
    ctx.fillRect(x + u * 3, y + u * 4, tamanho - u * 6, u * 4);
    ctx.fillRect(x + tamanho - u * 4, y + u * 2, u * 3, u * 3);
    ctx.fillRect(x + u, y + u * 6, u * 5, u);
    ctx.fillStyle = "#f0c65a";
    ctx.fillRect(x + u * 4, y + u * 4, u * 3, u);
    ctx.fillRect(x + u * 6, y + u * 6, u * 2, u);
    ctx.fillStyle = "#101812";
    ctx.fillRect(x + tamanho - u * 3, y + u * 3, u, u);
    ctx.fillRect(x + u * 4, y + u * 8, u * 2, u * 3);
    ctx.fillRect(x + u * 7, y + u * 8, u * 2, u * 3);
}

function desenharBesouroDeAmbar(x, y, tamanho) {
    const u = Math.max(3, Math.floor(tamanho / 12));
    ctx.fillStyle = "#3d2a1b";
    ctx.fillRect(x + u, y + u * 3, tamanho - u * 2, tamanho - u * 5);
    ctx.fillRect(x + u * 3, y + u, tamanho - u * 6, tamanho - u * 2);
    ctx.fillRect(x - u, y + u * 4, u * 3, u);
    ctx.fillRect(x + tamanho - u * 2, y + u * 4, u * 3, u);
    ctx.fillRect(x - u, y + u * 8, u * 3, u);
    ctx.fillRect(x + tamanho - u * 2, y + u * 8, u * 3, u);
    ctx.fillStyle = CONFIG.inimigo.besouroDeAmbar.cor;
    ctx.fillRect(x + u * 2, y + u * 3, tamanho - u * 4, tamanho - u * 6);
    ctx.fillRect(x + u * 4, y + u, tamanho - u * 8, u * 3);
    ctx.fillStyle = "#f0ad3c";
    ctx.fillRect(x + u * 3, y + u * 4, tamanho - u * 6, u * 2);
    ctx.fillRect(x + u * 5, y + u * 7, u * 2, tamanho - u * 9);
    ctx.fillStyle = "#ffe06b";
    ctx.fillRect(x + u * 4, y + u * 2, u, u);
    ctx.fillRect(x + tamanho - u * 5, y + u * 2, u, u);
}

function desenharTriceratopo(x, y, tamanho) {
    const u = Math.max(3, Math.floor(tamanho / 13));
    ctx.fillStyle = "#293622";
    ctx.fillRect(x + u, y + u * 5, tamanho - u * 2, tamanho - u * 7);
    ctx.fillRect(x + tamanho - u * 5, y + u * 2, u * 5, u * 7);
    ctx.fillStyle = CONFIG.inimigo.triceratopo.cor;
    ctx.fillRect(x + u * 2, y + u * 5, tamanho - u * 7, tamanho - u * 8);
    ctx.fillRect(x + tamanho - u * 6, y + u * 3, u * 5, u * 5);
    ctx.fillStyle = "#829453";
    ctx.fillRect(x + tamanho - u * 7, y + u, u * 6, u * 3);
    ctx.fillRect(x + tamanho - u * 8, y + u * 2, u * 2, u * 6);
    ctx.fillStyle = "#e0cf91";
    ctx.fillRect(x + tamanho - u * 3, y, u, u * 4);
    ctx.fillRect(x + tamanho - u, y + u * 4, u * 3, u);
    ctx.fillStyle = "#172017";
    ctx.fillRect(x + tamanho - u * 3, y + u * 4, u, u);
    ctx.fillRect(x + u * 3, y + tamanho - u * 4, u * 3, u * 4);
    ctx.fillRect(x + tamanho - u * 7, y + tamanho - u * 4, u * 3, u * 4);
}

function desenharTiranoPrimordial(inimigo, x, y, tamanho) {
    const u = Math.max(4, Math.floor(tamanho / 15));
    ctx.fillStyle = "#192319";
    ctx.fillRect(x + u * 2, y + u * 5, tamanho - u * 3, tamanho - u * 7);
    ctx.fillRect(x + tamanho - u * 7, y + u, u * 7, u * 8);
    ctx.fillRect(x - u * 3, y + u * 8, u * 7, u * 3);
    ctx.fillStyle = CONFIG.inimigo.bossPrimordial.cor;
    ctx.fillRect(x + u * 3, y + u * 5, tamanho - u * 7, tamanho - u * 9);
    ctx.fillRect(x + tamanho - u * 7, y + u * 2, u * 6, u * 6);
    ctx.fillRect(x, y + u * 8, u * 7, u * 2);
    ctx.fillStyle = "#78914a";
    ctx.fillRect(x + u * 5, y + u * 5, u * 3, u);
    ctx.fillRect(x + u * 4, y + u * 8, u * 2, u * 2);
    ctx.fillStyle = "#f4d46a";
    ctx.fillRect(x + tamanho - u * 5, y + u * 3, u, u);
    ctx.fillRect(x + tamanho - u, y + u * 6, u * 3, u);
    ctx.fillStyle = "#101710";
    ctx.fillRect(x + u * 4, y + tamanho - u * 5, u * 3, u * 5);
    ctx.fillRect(x + tamanho - u * 8, y + tamanho - u * 5, u * 3, u * 5);

    if (Date.now() < (inimigo.chamadoPrimordialExpiraEm || 0)) {
        const margem = 8 + (Math.floor(Date.now() / 100) % 2) * 6;
        ctx.save();
        ctx.strokeStyle = "#ffd66b";
        ctx.lineWidth = 4;
        ctx.strokeRect(x - margem, y - margem, tamanho + margem * 2, tamanho + margem * 2);
        ctx.fillStyle = "#e5a23b";
        ctx.fillRect(x - margem - 5, y + tamanho / 2, 10, 10);
        ctx.fillRect(x + tamanho + margem - 5, y + tamanho / 2, 10, 10);
        ctx.restore();
    }
}

function desenharMosquitoDoBrejo(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 10));
    const centroX = x + Math.floor(tamanho / 2);

    ctx.fillStyle = "rgba(191, 240, 171, .68)";
    ctx.fillRect(x, y + u, u * 4, u * 3);
    ctx.fillRect(x + tamanho - u * 4, y + u, u * 4, u * 3);
    ctx.fillStyle = "#31412d";
    ctx.fillRect(centroX - u * 2, y + u * 2, u * 4, u * 6);
    ctx.fillRect(centroX - u, y, u * 2, u * 2);
    ctx.fillStyle = CONFIG.inimigo.mosquitoDoBrejo.cor;
    ctx.fillRect(centroX - u, y + u * 2, u * 2, u * 5);
    ctx.fillStyle = "#d9f36a";
    ctx.fillRect(centroX - u, y + u, u, u);
    ctx.fillRect(centroX + u * 2, y + u, u, u);
    ctx.fillStyle = "#1c281d";
    ctx.fillRect(centroX - u * 4, y + u * 7, u * 3, u);
    ctx.fillRect(centroX + u, y + u * 7, u * 3, u);
    ctx.fillRect(centroX - Math.floor(u / 2), y + u * 7, u, u * 3);
}

function desenharSapoVenenoso(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 11));

    ctx.fillStyle = "#243524";
    ctx.fillRect(x, y + u * 5, tamanho, tamanho - u * 5);
    ctx.fillRect(x + u, y + u * 2, tamanho - u * 2, u * 6);
    ctx.fillStyle = CONFIG.inimigo.sapoVenenoso.cor;
    ctx.fillRect(x + u, y + u * 5, tamanho - u * 2, tamanho - u * 6);
    ctx.fillRect(x + u * 2, y + u * 2, tamanho - u * 4, u * 5);
    ctx.fillRect(x, y + tamanho - u * 3, u * 4, u * 2);
    ctx.fillRect(x + tamanho - u * 4, y + tamanho - u * 3, u * 4, u * 2);
    ctx.fillStyle = "#b7ef59";
    ctx.fillRect(x + u * 2, y + u, u * 3, u * 3);
    ctx.fillRect(x + tamanho - u * 5, y + u, u * 3, u * 3);
    ctx.fillStyle = "#152019";
    ctx.fillRect(x + u * 3, y + u * 2, u, u);
    ctx.fillRect(x + tamanho - u * 4, y + u * 2, u, u);
    ctx.fillRect(x + u * 4, y + u * 6, tamanho - u * 8, u);
    ctx.fillStyle = "#d7e74f";
    ctx.fillRect(x + u * 2, y + u * 6, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 4, y + u * 7, u * 2, u * 2);
}

function desenharGuardiaoDeLodo(x, y, tamanho) {
    const u = Math.max(3, Math.floor(tamanho / 12));

    ctx.fillStyle = "#17251d";
    ctx.fillRect(x - u, y + u * 3, tamanho + u * 2, tamanho - u * 3);
    ctx.fillRect(x + u * 2, y, tamanho - u * 4, tamanho);
    ctx.fillStyle = CONFIG.inimigo.guardiaoDeLodo.cor;
    ctx.fillRect(x, y + u * 3, tamanho, tamanho - u * 4);
    ctx.fillRect(x + u * 2, y + u, tamanho - u * 4, u * 5);
    ctx.fillStyle = "#68894b";
    ctx.fillRect(x + u, y + u * 5, u * 3, tamanho - u * 7);
    ctx.fillRect(x + tamanho - u * 4, y + u * 4, u * 3, tamanho - u * 6);
    ctx.fillStyle = "#c5ef63";
    ctx.fillRect(x + u * 3, y + u * 3, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 5, y + u * 3, u * 2, u * 2);
    ctx.fillStyle = "#263426";
    ctx.fillRect(x + u * 4, y + u * 7, tamanho - u * 8, u * 2);
    ctx.fillStyle = "#92ba50";
    ctx.fillRect(x - u, y + u, u, u * 5);
    ctx.fillRect(x + tamanho, y + u * 2, u, u * 4);
}

function desenharHidraDoPantano(inimigo, x, y, tamanho) {
    const u = Math.max(4, Math.floor(tamanho / 14));
    const centrosDasCabecas = [x + u * 3, x + Math.floor(tamanho / 2), x + tamanho - u * 3];

    ctx.fillStyle = "#14231a";
    ctx.fillRect(x - u, y + u * 7, tamanho + u * 2, tamanho - u * 6);
    ctx.fillStyle = CONFIG.inimigo.bossPantano.cor;
    ctx.fillRect(x + u, y + u * 7, tamanho - u * 2, tamanho - u * 7);
    ctx.fillRect(x - u * 2, y + u * 9, u * 5, u * 4);
    ctx.fillRect(x + tamanho - u * 3, y + u * 9, u * 5, u * 4);

    for (let indice = 0; indice < centrosDasCabecas.length; indice++) {
        const centro = centrosDasCabecas[indice];
        const topo = y + (indice === 1 ? 0 : u * 2);
        ctx.fillStyle = "#203627";
        ctx.fillRect(centro - u * 2, topo + u * 4, u * 4, u * 6);
        ctx.fillStyle = indice === 1 ? "#4f7b43" : "#416b3d";
        ctx.fillRect(centro - u * 3, topo, u * 6, u * 5);
        ctx.fillRect(centro - u * 2, topo + u * 4, u * 4, u * 4);
        ctx.fillStyle = "#d4ef68";
        ctx.fillRect(centro - u * 2, topo + u, u, u);
        ctx.fillRect(centro + u, topo + u, u, u);
        ctx.fillStyle = "#172219";
        ctx.fillRect(centro - u, topo + u * 3, u * 2, u);
    }

    ctx.fillStyle = "#83aa4e";
    ctx.fillRect(x + u * 3, y + tamanho - u * 4, tamanho - u * 6, u * 2);
    desenharEfeitoDeRegeneracaoDaHidra(inimigo, x, y, tamanho);
}

function desenharEfeitoDeRegeneracaoDaHidra(inimigo, x, y, tamanho) {
    if (!inimigo.regeneracaoAtiva) {
        return;
    }

    const configuracao = CONFIG.inimigo.bossPantano;
    const tempoDesdeAtivacao = Date.now() - (inimigo.regeneracaoAtivadaEm || 0);
    const pulso = Math.floor(Date.now() / 180) % 2;
    const margem = 7 + pulso * 5;

    ctx.save();
    ctx.globalAlpha = tempoDesdeAtivacao < configuracao.duracaoVisualDaAtivacao ? 0.9 : 0.5;
    ctx.strokeStyle = "#b7f05f";
    ctx.lineWidth = 4;
    ctx.strokeRect(x - margem, y - margem, tamanho + margem * 2, tamanho + margem * 2);
    ctx.fillStyle = "#dff78a";
    ctx.fillRect(x - margem - 4, y + tamanho / 2, 8, 8);
    ctx.fillRect(x + tamanho + margem - 4, y + tamanho / 2, 8, 8);
    ctx.restore();
}

function desenharPixelCorrompido(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 6));

    // O padrão em quatro blocos foi inspirado no primeiro desenho do criador.
    ctx.fillStyle = "#030306";
    ctx.fillRect(x + u * 3, y + u, u * 3, u * 2);
    ctx.fillRect(x + u * 4, y, u * 2, u);
    ctx.fillRect(x, y + u * 3, u * 3, u * 3);
    ctx.fillRect(x + u, y + u * 5, u * 2, u);

    ctx.fillStyle = CONFIG.inimigo.pixelCorrompido.cor;
    ctx.fillRect(x, y, u * 3, u * 2);
    ctx.fillRect(x, y + u * 2, u * 2, u);
    ctx.fillRect(x + u * 3, y + u * 3, u * 3, u * 3);
    ctx.fillRect(x + u * 5, y + u * 2, u, u);

    ctx.fillStyle = "#54f2dd";
    ctx.fillRect(x + u, y + u, u, u);
    ctx.fillRect(x + u * 4, y + u * 4, u, u);
}

function desenharErroVeloz(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 7));
    ctx.fillStyle = "#05050a";
    ctx.fillRect(x + u * 2, y, u * 4, u * 2);
    ctx.fillRect(x + u, y + u * 2, u * 4, u * 3);
    ctx.fillRect(x + u * 3, y + u * 5, u * 3, u * 2);
    ctx.fillStyle = CONFIG.inimigo.erroVeloz.cor;
    ctx.fillRect(x + u * 3, y, u * 3, u);
    ctx.fillRect(x, y + u * 3, u * 4, u * 2);
    ctx.fillRect(x + u * 4, y + u * 5, u * 3, u);
    ctx.fillStyle = "#43ead1";
    ctx.fillRect(x - u * 2, y + u, u * 2, u);
    ctx.fillRect(x - u, y + u * 5, u * 3, u);
    ctx.fillStyle = "#fff36a";
    ctx.fillRect(x + u * 2, y + u * 3, u, u);
}

function desenharBlocoInstavel(x, y, tamanho) {
    const u = Math.max(3, Math.floor(tamanho / 8));
    ctx.fillStyle = "#050408";
    ctx.fillRect(x, y + u, tamanho, tamanho - u * 2);
    ctx.fillRect(x + u, y, tamanho - u * 2, tamanho);
    ctx.fillStyle = CONFIG.inimigo.blocoInstavel.cor;
    ctx.fillRect(x + u, y + u, tamanho - u * 2, tamanho - u * 2);
    ctx.fillStyle = "#ae00ff";
    ctx.fillRect(x + u * 2, y + u, u * 2, tamanho - u * 2);
    ctx.fillRect(x + u * 5, y + u * 3, tamanho - u * 5, u * 2);
    ctx.fillStyle = "#0a0710";
    ctx.fillRect(x + u, y + u * 4, tamanho - u * 4, u);
    ctx.fillRect(x + u * 5, y + u, u * 2, u * 2);
    ctx.fillStyle = "#4cebd5";
    ctx.fillRect(x - u, y + u * 2, u * 2, u);
    ctx.fillRect(x + tamanho - u, y + u * 6, u * 2, u);
}

function desenharNucleoGlitch(x, y, tamanho) {
    const u = Math.max(4, Math.floor(tamanho / 10));
    ctx.fillStyle = "#030306";
    ctx.fillRect(x - u, y + u * 2, tamanho + u * 2, tamanho - u * 4);
    ctx.fillRect(x + u * 2, y - u, tamanho - u * 4, tamanho + u * 2);
    ctx.fillStyle = CONFIG.inimigo.bossGlitch.cor;
    ctx.fillRect(x, y, tamanho, tamanho);
    ctx.fillStyle = "#b800ff";
    ctx.fillRect(x + u, y + u, u * 3, u * 3);
    ctx.fillRect(x + u * 6, y + u * 6, u * 3, u * 3);
    ctx.fillStyle = "#07050b";
    ctx.fillRect(x + u * 6, y + u, u * 3, u * 3);
    ctx.fillRect(x + u, y + u * 6, u * 3, u * 3);
    ctx.fillStyle = "#45f1d6";
    ctx.fillRect(x + u * 4, y + u * 3, u * 2, u * 4);
    ctx.fillRect(x + u * 3, y + u * 4, u * 4, u * 2);
    ctx.fillStyle = "#fff36a";
    ctx.fillRect(x + u * 4, y + u * 4, u * 2, u * 2);
    ctx.fillStyle = "#e84cff";
    ctx.fillRect(x - u * 3, y + u, u * 3, u);
    ctx.fillRect(x + tamanho, y + u * 7, u * 3, u);
}

function desenharMorcegoDeFogo(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 10));
    ctx.fillStyle = "#492127";
    ctx.fillRect(x, y + u * 2, u * 4, u * 4);
    ctx.fillRect(x + tamanho - u * 4, y + u * 2, u * 4, u * 4);
    ctx.fillStyle = CONFIG.inimigo.morcegoDeFogo.cor;
    ctx.fillRect(x + u * 2, y + u, u * 3, u * 3);
    ctx.fillRect(x + tamanho - u * 5, y + u, u * 3, u * 3);
    ctx.fillRect(x + u * 4, y + u * 2, tamanho - u * 8, tamanho - u * 4);
    ctx.fillStyle = "#ffbd45";
    ctx.fillRect(x + u * 4, y + u * 3, u, u);
    ctx.fillRect(x + tamanho - u * 5, y + u * 3, u, u);
    ctx.fillRect(x + tamanho / 2 - u, y + tamanho - u * 2, u * 2, u * 2);
}

function desenharLagartoVulcanico(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 11));
    ctx.fillStyle = "#2a1b20";
    ctx.fillRect(x, y + u * 4, tamanho - u * 2, u * 4);
    ctx.fillRect(x + tamanho - u * 5, y + u * 2, u * 5, u * 6);
    ctx.fillRect(x - u * 3, y + u * 5, u * 5, u * 2);
    ctx.fillStyle = CONFIG.inimigo.lagartoVulcanico.cor;
    ctx.fillRect(x + u, y + u * 4, tamanho - u * 6, u * 3);
    ctx.fillRect(x + tamanho - u * 5, y + u * 3, u * 4, u * 4);
    ctx.fillRect(x + u * 2, y + u * 7, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 7, y + u * 7, u * 2, u * 2);
    ctx.fillStyle = "#ff713f";
    ctx.fillRect(x + u * 3, y + u * 5, tamanho - u * 9, u);
    ctx.fillStyle = "#ffd35c";
    ctx.fillRect(x + tamanho - u * 3, y + u * 4, u, u);
}

function desenharGolemDeMagma(x, y, tamanho) {
    const u = Math.max(3, Math.floor(tamanho / 11));
    ctx.fillStyle = "#171218";
    ctx.fillRect(x - u, y + u * 2, tamanho + u * 2, tamanho - u);
    ctx.fillStyle = CONFIG.inimigo.golemDeMagma.cor;
    ctx.fillRect(x, y, tamanho, tamanho);
    ctx.fillRect(x - u * 2, y + u * 4, u * 4, u * 5);
    ctx.fillRect(x + tamanho - u * 2, y + u * 4, u * 4, u * 5);
    ctx.fillStyle = "#7b3934";
    ctx.fillRect(x + u * 2, y + u * 2, tamanho - u * 4, tamanho - u * 4);
    ctx.fillStyle = "#ff5a2d";
    ctx.fillRect(x + u * 3, y + u * 4, u, u);
    ctx.fillRect(x + tamanho - u * 4, y + u * 4, u, u);
    ctx.fillRect(x + u * 4, y + u * 7, tamanho - u * 8, u * 2);
    ctx.fillStyle = "#ffbd45";
    ctx.fillRect(x + tamanho / 2 - u, y + u, u * 2, u * 6);
}

function desenharFragmentoDeMagma(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 7));
    ctx.fillStyle = "#2a1820";
    ctx.fillRect(x + u, y, tamanho - u * 2, tamanho);
    ctx.fillRect(x, y + u, tamanho, tamanho - u * 2);
    ctx.fillStyle = CONFIG.inimigo.fragmentoDeMagma.cor;
    ctx.fillRect(x + u * 2, y + u, tamanho - u * 4, tamanho - u * 2);
    ctx.fillStyle = "#ffd35c";
    ctx.fillRect(x + tamanho / 2 - u, y + u * 2, u * 2, tamanho - u * 4);
}

function desenharTitaDeObsidiana(inimigo, x, y, tamanho) {
    const u = Math.max(4, Math.floor(tamanho / 12));
    const emErupcao = Boolean(inimigo.formaDeErupcao);
    ctx.fillStyle = "#110e14";
    ctx.fillRect(x - u, y + u * 2, tamanho + u * 2, tamanho - u);
    ctx.fillStyle = emErupcao ? "#54262d" : CONFIG.inimigo.bossVulcanico.cor;
    ctx.fillRect(x, y, tamanho, tamanho);
    ctx.fillRect(x - u * 2, y + u * 4, u * 4, tamanho - u * 5);
    ctx.fillRect(x + tamanho - u * 2, y + u * 4, u * 4, tamanho - u * 5);
    ctx.fillStyle = emErupcao ? "#a63b31" : "#493343";
    ctx.fillRect(x + u * 2, y + u * 2, tamanho - u * 4, tamanho - u * 4);
    ctx.fillStyle = "#ff5a2d";
    ctx.fillRect(x + u * 3, y + u * 4, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 5, y + u * 4, u * 2, u * 2);
    ctx.fillRect(x + tamanho / 2 - u, y + u, u * 2, tamanho - u * 2);
    ctx.fillStyle = "#ffbd45";
    ctx.fillRect(x + tamanho / 2 - 2, y + u * 2, 4, tamanho - u * 4);

    if (!emErupcao) {
        ctx.strokeStyle = "#8b6685";
        ctx.lineWidth = 5;
        ctx.strokeRect(x - 3, y - 3, tamanho + 6, tamanho + 6);
    }

    desenharEfeitoDaErupcaoDoTita(inimigo, x, y, tamanho);
}

function desenharEfeitoDaErupcaoDoTita(inimigo, x, y, tamanho) {
    const tempoRestante = (inimigo.erupcaoExpiraEm || 0) - Date.now();
    if (tempoRestante <= 0) {
        return;
    }

    const configuracao = CONFIG.inimigo.bossVulcanico;
    const progresso = 1 - tempoRestante / configuracao.duracaoVisualDaErupcao;
    const margem = Math.round(10 + progresso * 45);
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - progresso);
    ctx.strokeStyle = "#ff713f";
    ctx.lineWidth = 6;
    ctx.strokeRect(x - margem, y - margem, tamanho + margem * 2, tamanho + margem * 2);
    ctx.fillStyle = "#ffbd45";
    ctx.fillRect(x - margem - 7, y + tamanho / 2 - 4, 10, 8);
    ctx.fillRect(x + tamanho + margem - 3, y + tamanho / 2 - 4, 10, 8);
    ctx.fillRect(x + tamanho / 2 - 4, y - margem - 7, 8, 10);
    ctx.restore();
}

function desenharMacacoSaqueador(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 7));
    ctx.fillStyle = "#382416";
    ctx.fillRect(x + u, y + u, tamanho - u * 2, tamanho - u);
    ctx.fillRect(x - u, y + u * 3, u * 2, u * 3);
    ctx.fillRect(x + tamanho - u, y + u * 3, u * 2, u * 3);
    ctx.fillStyle = CONFIG.inimigo.macacoSaqueador.cor;
    ctx.fillRect(x + u * 2, y, tamanho - u * 4, u * 3);
    ctx.fillRect(x, y + u * 3, tamanho, u * 3);
    ctx.fillStyle = "#d6a36c";
    ctx.fillRect(x + u * 2, y + u * 2, tamanho - u * 4, u * 3);
    ctx.fillStyle = "#17140f";
    ctx.fillRect(x + u * 2, y + u * 2, u, u);
    ctx.fillRect(x + tamanho - u * 3, y + u * 2, u, u);
    ctx.fillStyle = "#f2c84b";
    ctx.fillRect(x + tamanho - u, y - u, u * 3, u);
    ctx.fillRect(x + tamanho + u, y - u, u, u * 3);
}

function desenharOncaDaSelva(inimigo, x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 10));

    if (oncaEstaEmDisparada(inimigo)) {
        ctx.fillStyle = "#ffe66d";
        ctx.fillRect(x - u * 4, y + u * 3, u * 3, u);
        ctx.fillRect(x - u * 3, y + u * 5, u * 2, u);
        ctx.fillStyle = "#ef7f2d";
        ctx.fillRect(x - u * 5, y + u * 4, u * 2, u);
    }

    ctx.fillStyle = "#3b2817";
    ctx.fillRect(x, y + u * 3, tamanho - u * 2, u * 4);
    ctx.fillRect(x + tamanho - u * 5, y + u, u * 5, u * 6);
    ctx.fillRect(x - u, y + u * 2, u * 3, u);
    ctx.fillRect(x - u, y + u, u, u * 2);

    ctx.fillStyle = CONFIG.inimigo.oncaDaSelva.cor;
    ctx.fillRect(x + u, y + u * 3, tamanho - u * 5, u * 3);
    ctx.fillRect(x + tamanho - u * 5, y + u * 2, u * 4, u * 4);
    ctx.fillRect(x + tamanho - u * 5, y + u, u, u * 2);
    ctx.fillRect(x + tamanho - u * 2, y + u, u, u * 2);
    ctx.fillRect(x + u * 2, y + u * 6, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 7, y + u * 6, u * 2, u * 2);

    ctx.fillStyle = "#382718";
    ctx.fillRect(x + u * 3, y + u * 3, u, u);
    ctx.fillRect(x + u * 6, y + u * 4, u, u);
    ctx.fillRect(x + tamanho - u * 4, y + u * 4, u, u);
    ctx.fillRect(x + tamanho - u * 2, y + u * 4, u, u);

    ctx.fillStyle = "#f7f0c4";
    ctx.fillRect(x + tamanho - u * 4, y + u * 3, u, u);
    ctx.fillStyle = "#15130e";
    ctx.fillRect(x + tamanho - u * 2, y + u * 5, u, u);
}

function desenharGorilaDaSelva(x, y, tamanho) {
    const u = Math.max(3, Math.floor(tamanho / 9));
    ctx.fillStyle = "#20281e";
    ctx.fillRect(x - u, y + u * 3, u * 3, tamanho - u * 2);
    ctx.fillRect(x + tamanho - u * 2, y + u * 3, u * 3, tamanho - u * 2);
    ctx.fillStyle = CONFIG.inimigo.gorilaDaSelva.cor;
    ctx.fillRect(x + u, y, tamanho - u * 2, tamanho - u);
    ctx.fillRect(x, y + u * 3, tamanho, tamanho - u * 4);
    ctx.fillStyle = "#718064";
    ctx.fillRect(x + u * 2, y + u * 2, tamanho - u * 4, u * 4);
    ctx.fillRect(x + u * 2, y + tamanho - u * 3, tamanho - u * 4, u * 2);
    ctx.fillStyle = "#11160f";
    ctx.fillRect(x + u * 3, y + u * 3, u, u);
    ctx.fillRect(x + tamanho - u * 4, y + u * 3, u, u);
}

function desenharColossoDaSelva(x, y, tamanho) {
    const u = Math.max(4, Math.floor(tamanho / 10));
    ctx.fillStyle = "#24301d";
    ctx.fillRect(x - u, y + u * 2, tamanho + u * 2, tamanho - u);
    ctx.fillStyle = CONFIG.inimigo.bossSelva.cor;
    ctx.fillRect(x, y, tamanho, tamanho);
    ctx.fillStyle = "#73814f";
    ctx.fillRect(x + u * 2, y + u, tamanho - u * 4, tamanho - u * 3);
    ctx.fillStyle = "#334d2a";
    ctx.fillRect(x - u, y - u, tamanho + u * 2, u * 3);
    ctx.fillRect(x, y - u * 3, u * 3, u * 3);
    ctx.fillRect(x + tamanho - u * 3, y - u * 3, u * 3, u * 3);
    ctx.fillStyle = "#9bc05d";
    ctx.fillRect(x + u, y - u * 2, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 3, y - u * 2, u * 2, u * 2);
    ctx.fillStyle = "#f4d35e";
    ctx.fillRect(x + u * 3, y + u * 3, u, u);
    ctx.fillRect(x + tamanho - u * 4, y + u * 3, u, u);
    ctx.fillStyle = "#3d2b1d";
    ctx.fillRect(x + u * 3, y + tamanho - u * 3, tamanho - u * 6, u * 2);
}

function desenharRaposaLadina(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 10));
    ctx.fillStyle = "#3a2419";
    ctx.fillRect(x, y + u * 3, tamanho - u * 2, u * 4);
    ctx.fillRect(x + tamanho - u * 5, y + u, u * 5, u * 6);
    ctx.fillRect(x - u * 3, y + u * 2, u * 5, u * 2);
    ctx.fillStyle = CONFIG.inimigo.raposaLadina.cor;
    ctx.fillRect(x + u, y + u * 3, tamanho - u * 6, u * 3);
    ctx.fillRect(x + tamanho - u * 5, y + u * 2, u * 4, u * 4);
    ctx.fillRect(x + tamanho - u * 5, y, u, u * 3);
    ctx.fillRect(x + tamanho - u * 2, y, u, u * 3);
    ctx.fillRect(x - u * 3, y + u * 2, u * 4, u * 2);
    ctx.fillRect(x + u * 2, y + u * 6, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 7, y + u * 6, u * 2, u * 2);
    ctx.fillStyle = "#f6e1bd";
    ctx.fillRect(x - u * 3, y + u * 2, u, u * 2);
    ctx.fillRect(x + tamanho - u * 3, y + u * 5, u * 2, u);
    ctx.fillStyle = "#17120f";
    ctx.fillRect(x + tamanho - u * 3, y + u * 3, u, u);
    ctx.fillRect(x + tamanho - u, y + u * 4, u, u);
}

function desenharJavaliFurioso(inimigo, x, y, tamanho) {
    const u = Math.max(3, Math.floor(tamanho / 10));

    if (javaliEstaEmArrancada(inimigo)) {
        ctx.fillStyle = "#d6a45d";
        ctx.fillRect(x - u * 4, y + tamanho - u * 3, u * 3, u);
        ctx.fillRect(x - u * 3, y + tamanho - u, u * 2, u);
    }

    ctx.fillStyle = "#34271f";
    ctx.fillRect(x, y + u * 2, tamanho - u * 2, u * 6);
    ctx.fillRect(x + tamanho - u * 5, y + u * 3, u * 5, u * 5);
    ctx.fillStyle = CONFIG.inimigo.javaliFurioso.cor;
    ctx.fillRect(x + u, y + u * 2, tamanho - u * 5, u * 5);
    ctx.fillRect(x + tamanho - u * 5, y + u * 3, u * 4, u * 4);
    ctx.fillRect(x + u * 2, y + u * 7, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 7, y + u * 7, u * 2, u * 2);
    ctx.fillStyle = "#2a211b";
    ctx.fillRect(x + u * 2, y + u, u, u * 3);
    ctx.fillRect(x + u * 4, y, u, u * 4);
    ctx.fillRect(x + u * 6, y + u, u, u * 3);
    ctx.fillStyle = "#f1dfb7";
    ctx.fillRect(x + tamanho - u * 2, y + u * 6, u * 2, u);
    ctx.fillRect(x + tamanho - u, y + u * 5, u, u * 2);
    ctx.fillStyle = "#f0c45c";
    ctx.fillRect(x + tamanho - u * 3, y + u * 4, u, u);
}

function desenharCorujaSombria(x, y, tamanho) {
    const u = Math.max(2, Math.floor(tamanho / 9));
    ctx.fillStyle = "#30283a";
    ctx.fillRect(x, y + u * 2, tamanho, tamanho - u * 3);
    ctx.fillRect(x + u, y, tamanho - u * 2, tamanho - u);
    ctx.fillStyle = CONFIG.inimigo.corujaSombria.cor;
    ctx.fillRect(x + u, y + u * 2, tamanho - u * 2, tamanho - u * 4);
    ctx.fillRect(x - u, y + u * 3, u * 3, tamanho - u * 5);
    ctx.fillRect(x + tamanho - u * 2, y + u * 3, u * 3, tamanho - u * 5);
    ctx.fillStyle = "#c3a7d8";
    ctx.fillRect(x + u * 2, y + u * 2, u * 2, u * 2);
    ctx.fillRect(x + tamanho - u * 4, y + u * 2, u * 2, u * 2);
    ctx.fillStyle = "#fff17a";
    ctx.fillRect(x + u * 2, y + u * 2, u, u);
    ctx.fillRect(x + tamanho - u * 3, y + u * 2, u, u);
    ctx.fillStyle = "#d58a3d";
    ctx.fillRect(x + tamanho / 2 - u, y + u * 4, u * 2, u);
    ctx.fillRect(x + tamanho / 2, y + u * 5, u, u);
}

function desenharUrsoAncestral(inimigo, x, y, tamanho) {
    const u = Math.max(4, Math.floor(tamanho / 11));
    ctx.fillStyle = "#30261f";
    ctx.fillRect(x - u, y + u * 3, tamanho + u * 2, tamanho - u * 2);
    ctx.fillRect(x + u, y, u * 4, u * 4);
    ctx.fillRect(x + tamanho - u * 5, y, u * 4, u * 4);
    ctx.fillStyle = CONFIG.inimigo.bossTemperado.cor;
    ctx.fillRect(x, y + u * 2, tamanho, tamanho - u * 2);
    ctx.fillRect(x + u, y + u, tamanho - u * 2, u * 5);
    ctx.fillStyle = "#8b6a4d";
    ctx.fillRect(x + u * 2, y + u * 4, tamanho - u * 4, u * 4);
    ctx.fillRect(x + u * 3, y + tamanho - u * 3, tamanho - u * 6, u * 2);
    ctx.fillStyle = "#211a16";
    ctx.fillRect(x + u * 3, y + u * 3, u, u);
    ctx.fillRect(x + tamanho - u * 4, y + u * 3, u, u);
    ctx.fillRect(x + tamanho / 2 - u, y + u * 6, u * 2, u);
    ctx.fillStyle = "#d7bb83";
    ctx.fillRect(x - u, y + tamanho - u * 2, u * 3, u);
    ctx.fillRect(x + tamanho - u * 2, y + tamanho - u * 2, u * 3, u);
    desenharEfeitoDoRugidoAncestral(inimigo, x, y, tamanho);
}

function desenharEfeitoDoRugidoAncestral(inimigo, x, y, tamanho) {
    const configuracao = CONFIG.inimigo.bossTemperado;
    const tempoRestante = (inimigo.rugidoExpiraEm || 0) - Date.now();

    if (tempoRestante <= 0) {
        return;
    }

    const progresso = 1 - tempoRestante / configuracao.duracaoVisualDoRugido;
    const margem = Math.round(10 + progresso * 34);
    const centroX = x + tamanho / 2;
    const centroY = y + tamanho / 2;

    ctx.save();
    ctx.strokeStyle = "rgba(255, 191, 73, 0.82)";
    ctx.lineWidth = 4;
    ctx.strokeRect(
        x - margem,
        y - margem,
        tamanho + margem * 2,
        tamanho + margem * 2
    );
    ctx.fillStyle = "#ffd36d";
    ctx.fillRect(centroX - 4, y - margem - 8, 8, 8);
    ctx.fillRect(centroX - 4, y + tamanho + margem, 8, 8);
    ctx.fillRect(x - margem - 8, centroY - 4, 8, 8);
    ctx.fillRect(x + tamanho + margem, centroY - 4, 8, 8);
    ctx.restore();
}

function desenharInimigoVermelho(x, y, tamanho) {
    const unidade = Math.max(2, Math.floor(tamanho / 10));

    ctx.fillStyle = "#261319";
    ctx.fillRect(x - unidade, y + unidade * 3, unidade * 3, unidade * 5);
    ctx.fillRect(x + tamanho - unidade * 2, y + unidade * 3, unidade * 3, unidade * 5);
    ctx.fillRect(x + unidade * 2, y + tamanho - unidade * 3, unidade * 3, unidade * 3);
    ctx.fillRect(x + tamanho - unidade * 5, y + tamanho - unidade * 3, unidade * 3, unidade * 3);

    ctx.fillStyle = "#741d29";
    ctx.fillRect(x, y + unidade * 4, unidade * 3, unidade * 4);
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade * 4, unidade * 3, unidade * 4);
    ctx.fillRect(x + unidade * 2, y + unidade * 3, tamanho - unidade * 4, unidade * 5);

    ctx.fillStyle = CONFIG.inimigo.normal.cor;
    ctx.fillRect(x + unidade * 3, y, tamanho - unidade * 6, unidade);
    ctx.fillRect(x + unidade * 2, y + unidade, tamanho - unidade * 4, unidade * 3);
    ctx.fillRect(x + unidade * 3, y + unidade * 4, tamanho - unidade * 6, unidade * 3);

    ctx.fillStyle = "#35171e";
    ctx.fillRect(x + unidade * 3, y + unidade * 2, tamanho - unidade * 6, unidade * 2);
    ctx.fillRect(x + unidade * 4, y + unidade * 7, tamanho - unidade * 8, unidade * 2);

    ctx.fillStyle = "#ffc94a";
    ctx.fillRect(x + unidade * 4, y + unidade * 2, tamanho - unidade * 8, unidade);
    ctx.fillStyle = "#fff0a0";
    ctx.fillRect(x + unidade * 4, y + unidade * 2, unidade, unidade);

    ctx.fillStyle = "#ff7178";
    ctx.fillRect(x + unidade * 3, y + unidade * 4, unidade, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 4, unidade, unidade * 2);
    ctx.fillRect(x + tamanho / 2 - unidade, y + unidade * 5, unidade * 2, unidade);
}

function desenharInimigoRoxo(x, y, tamanho) {
    const unidade = Math.max(3, Math.floor(tamanho / 12));

    ctx.fillStyle = "#211329";
    ctx.fillRect(x + unidade, y + unidade * 4, tamanho - unidade * 2, unidade * 7);
    ctx.fillRect(x, y + unidade * 4, unidade * 4, unidade * 5);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 4, unidade * 4, unidade * 5);
    ctx.fillRect(x + unidade * 2, y + tamanho - unidade * 3, unidade * 3, unidade * 3);
    ctx.fillRect(x + tamanho - unidade * 5, y + tamanho - unidade * 3, unidade * 3, unidade * 3);

    ctx.fillStyle = "#51206f";
    ctx.fillRect(x + unidade, y + unidade * 3, unidade * 4, unidade * 4);
    ctx.fillRect(x + tamanho - unidade * 5, y + unidade * 3, unidade * 4, unidade * 4);
    ctx.fillRect(x + unidade * 2, y + unidade * 4, tamanho - unidade * 4, unidade * 6);

    ctx.fillStyle = CONFIG.inimigo.elite.cor;
    ctx.fillRect(x + unidade * 3, y + unidade, tamanho - unidade * 6, unidade * 4);
    ctx.fillRect(x + unidade * 3, y + unidade * 5, tamanho - unidade * 6, unidade * 3);
    ctx.fillRect(x + unidade * 4, y, unidade * 2, unidade);
    ctx.fillRect(x + tamanho - unidade * 6, y, unidade * 2, unidade);

    ctx.fillStyle = "#180e20";
    ctx.fillRect(x + unidade * 4, y + unidade * 2, tamanho - unidade * 8, unidade * 2);
    ctx.fillStyle = "#e5a8ff";
    ctx.fillRect(x + unidade * 5, y + unidade * 2, tamanho - unidade * 10, unidade);

    ctx.fillStyle = "#b95be0";
    ctx.fillRect(x + tamanho / 2 - unidade, y + unidade * 5, unidade * 2, unidade * 3);
    ctx.fillRect(x + tamanho / 2 - unidade * 2, y + unidade * 6, unidade * 4, unidade);
}

function desenharInimigoCianoRapido(x, y, tamanho) {
    const unidade = Math.max(2, Math.floor(tamanho / 10));

    ctx.fillStyle = "#12313a";
    ctx.fillRect(x + unidade * 2, y + unidade * 2, tamanho - unidade * 4, unidade * 6);
    ctx.fillRect(x + unidade, y + unidade * 4, unidade * 3, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 4, unidade * 3, unidade * 2);
    ctx.fillRect(x + unidade * 2, y + unidade * 8, unidade * 2, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 8, unidade * 2, unidade * 2);

    ctx.fillStyle = "#087f91";
    ctx.fillRect(x, y + unidade * 3, unidade * 4, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 3, unidade * 4, unidade * 2);
    ctx.fillRect(x + unidade * 3, y + unidade, tamanho - unidade * 6, unidade * 7);

    ctx.fillStyle = CONFIG.inimigo.rapido.cor;
    ctx.fillRect(x + unidade * 4, y, tamanho - unidade * 8, unidade * 3);
    ctx.fillRect(x + unidade * 4, y + unidade * 4, tamanho - unidade * 8, unidade * 3);

    ctx.fillStyle = "#d9ffff";
    ctx.fillRect(x + unidade * 4, y + unidade, tamanho - unidade * 8, unidade);
    ctx.fillRect(x + unidade * 2, y + unidade * 8, unidade * 2, unidade);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 8, unidade * 2, unidade);

    ctx.fillStyle = "#76f4ff";
    ctx.fillRect(x + unidade, y + tamanho, unidade * 2, unidade);
    ctx.fillRect(x + tamanho - unidade * 3, y + tamanho, unidade * 2, unidade);
}

function desenharBossComum(x, y, tamanho) {
    const unidade = Math.max(4, Math.floor(tamanho / 12));

    ctx.fillStyle = "#1f1018";
    ctx.fillRect(x + unidade, y + unidade * 3, tamanho - unidade * 2, unidade * 8);
    ctx.fillRect(x - unidade, y + unidade * 4, unidade * 5, unidade * 6);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 4, unidade * 5, unidade * 6);
    ctx.fillRect(x + unidade * 2, y + tamanho - unidade * 3, unidade * 4, unidade * 3);
    ctx.fillRect(x + tamanho - unidade * 6, y + tamanho - unidade * 3, unidade * 4, unidade * 3);

    ctx.fillStyle = "#76123b";
    ctx.fillRect(x, y + unidade * 3, unidade * 4, unidade * 5);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 3, unidade * 4, unidade * 5);
    ctx.fillRect(x + unidade * 2, y + unidade * 4, tamanho - unidade * 4, unidade * 6);

    ctx.fillStyle = CONFIG.inimigo.boss.cor;
    ctx.fillRect(x + unidade * 3, y + unidade, tamanho - unidade * 6, unidade * 4);
    ctx.fillRect(x + unidade * 3, y + unidade * 5, tamanho - unidade * 6, unidade * 4);
    ctx.fillRect(x + unidade * 2, y, unidade * 3, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 5, y, unidade * 3, unidade * 2);

    ctx.fillStyle = "#24101a";
    ctx.fillRect(x + unidade * 4, y + unidade * 2, tamanho - unidade * 8, unidade * 2);
    ctx.fillStyle = "#ff6f7f";
    ctx.fillRect(x + unidade * 5, y + unidade * 2, unidade, unidade);
    ctx.fillRect(x + tamanho - unidade * 6, y + unidade * 2, unidade, unidade);

    ctx.fillStyle = "#ffd166";
    ctx.fillRect(x + tamanho / 2 - unidade, y + unidade * 5, unidade * 2, unidade * 4);
    ctx.fillRect(x + tamanho / 2 - unidade * 2, y + unidade * 6, unidade * 4, unidade * 2);
    ctx.fillStyle = "#fff1ad";
    ctx.fillRect(x + tamanho / 2 - unidade / 2, y + unidade * 6, unidade, unidade);
}

function desenharInimigoBasico(inimigo, x, y, tamanho) {
    ctx.fillStyle = "#142019";
    ctx.fillRect(x + 5, y + 5, tamanho, tamanho);
    ctx.fillStyle = inimigo.cor;
    ctx.fillRect(x, y, tamanho, tamanho);
    ctx.strokeStyle = "#f4f1d0";
    ctx.lineWidth = inimigo.tamanho >= CONFIG.inimigo.boss.tamanho ? 4 : 3;
    ctx.strokeRect(x, y, tamanho, tamanho);

    const tamanhoBrilho = Math.max(4, Math.round(inimigo.tamanho * 0.3));
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(x + 6, y + 6, tamanhoBrilho, tamanhoBrilho);
}

function desenharEscorpiao(x, y, tamanho) {
    const unidade = Math.max(3, Math.floor(tamanho / 8));

    ctx.fillStyle = "#59311d";
    ctx.fillRect(x + unidade, y + unidade * 3, tamanho - unidade * 2, tamanho - unidade * 3);
    ctx.fillRect(x, y + unidade * 2, unidade * 3, unidade);
    ctx.fillRect(x, y + unidade * 5, unidade * 3, unidade);
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade * 2, unidade * 3, unidade);
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade * 5, unidade * 3, unidade);

    ctx.fillStyle = CONFIG.inimigo.escorpiao.cor;
    ctx.fillRect(x + unidade * 2, y + unidade * 2, tamanho - unidade * 4, tamanho - unidade * 3);
    ctx.fillRect(x, y + unidade, unidade * 3, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade, unidade * 3, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 2, y, unidade, unidade * 3);
    ctx.fillRect(x + tamanho - unidade * 3, y, unidade * 2, unidade);

    ctx.fillStyle = "#f5b04f";
    ctx.fillRect(x + unidade * 3, y + unidade * 3, tamanho - unidade * 6, unidade);
    ctx.fillStyle = "#24150f";
    ctx.fillRect(x + unidade * 2, y + unidade * 2, unidade, unidade);
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade * 2, unidade, unidade);
}

function desenharMumia(x, y, tamanho) {
    const unidade = Math.max(4, Math.floor(tamanho / 9));

    ctx.fillStyle = "#4d4030";
    ctx.fillRect(x + unidade, y + unidade, tamanho - unidade, tamanho - unidade);
    ctx.fillStyle = CONFIG.inimigo.mumia.cor;
    ctx.fillRect(x, y, tamanho - unidade, tamanho - unidade);
    ctx.fillStyle = "#8f7a55";

    for (let faixa = unidade; faixa < tamanho - unidade; faixa += unidade * 2) {
        ctx.fillRect(x, y + faixa, tamanho - unidade, unidade);
    }

    ctx.fillRect(x + unidade * 2, y, unidade, tamanho - unidade);
    ctx.fillStyle = "#34291e";
    ctx.fillRect(x + unidade, y + unidade * 2, tamanho - unidade * 3, unidade * 2);
    ctx.fillStyle = "#ffbd45";
    ctx.fillRect(x + unidade * 2, y + unidade * 2, unidade, unidade);
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade * 2, unidade, unidade);
}

function desenharLoboDeGelo(x, y, tamanho) {
    const unidade = Math.max(3, Math.floor(tamanho / 9));

    ctx.fillStyle = "#173347";
    ctx.fillRect(x + unidade, y + unidade * 3, tamanho - unidade, unidade * 4);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 2, unidade * 4, unidade * 4);

    ctx.fillStyle = CONFIG.inimigo.loboDeGelo.cor;
    ctx.fillRect(x + unidade * 2, y + unidade * 3, tamanho - unidade * 5, unidade * 3);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 2, unidade * 3, unidade * 4);
    ctx.fillRect(x, y + unidade * 3, unidade * 3, unidade * 2);
    ctx.fillRect(x + unidade * 2, y + unidade * 6, unidade * 2, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 5, y + unidade * 6, unidade * 2, unidade * 2);

    ctx.fillStyle = "#c9f5ff";
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade, unidade, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 2, y + unidade, unidade, unidade * 2);
    ctx.fillRect(x + unidade * 3, y + unidade * 3, unidade * 2, unidade);

    ctx.fillStyle = "#08202e";
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade * 3, unidade, unidade);
    ctx.fillRect(x + tamanho - unidade, y + unidade * 4, unidade, unidade);
}

function desenharYeti(x, y, tamanho) {
    const unidade = Math.max(4, Math.floor(tamanho / 10));

    ctx.fillStyle = "#25465b";
    ctx.fillRect(x + unidade, y + unidade, tamanho - unidade, tamanho - unidade);

    ctx.fillStyle = CONFIG.inimigo.yeti.cor;
    ctx.fillRect(x + unidade * 2, y + unidade, tamanho - unidade * 4, tamanho - unidade * 2);
    ctx.fillRect(x, y + unidade * 3, unidade * 3, unidade * 4);
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade * 3, unidade * 3, unidade * 4);
    ctx.fillRect(x + unidade * 2, y + tamanho - unidade * 2, unidade * 3, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 5, y + tamanho - unidade * 2, unidade * 3, unidade * 2);

    ctx.fillStyle = "#8bd5e8";
    ctx.fillRect(x + unidade * 3, y + unidade * 2, tamanho - unidade * 6, unidade * 3);
    ctx.fillRect(x + unidade, y + unidade * 5, unidade * 2, unidade);
    ctx.fillRect(x + tamanho - unidade * 3, y + unidade * 5, unidade * 2, unidade);

    ctx.fillStyle = "#183243";
    ctx.fillRect(x + unidade * 3, y + unidade * 3, unidade, unidade);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 3, unidade, unidade);
    ctx.fillRect(x + unidade * 4, y + unidade * 5, tamanho - unidade * 8, unidade);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + unidade * 2, y, unidade * 2, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 4, y, unidade * 2, unidade * 2);
}

function desenharTitaGlacial(x, y, tamanho) {
    const unidade = Math.max(5, Math.floor(tamanho / 12));

    ctx.fillStyle = "#163447";
    ctx.fillRect(x + unidade, y + unidade, tamanho - unidade, tamanho - unidade);

    ctx.fillStyle = CONFIG.inimigo.bossArtico.cor;
    ctx.fillRect(x + unidade * 2, y + unidade * 2, tamanho - unidade * 4, tamanho - unidade * 3);
    ctx.fillRect(x, y + unidade * 4, unidade * 4, tamanho - unidade * 6);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 4, unidade * 4, tamanho - unidade * 6);
    ctx.fillRect(x + unidade * 2, y + tamanho - unidade * 3, unidade * 4, unidade * 3);
    ctx.fillRect(x + tamanho - unidade * 6, y + tamanho - unidade * 3, unidade * 4, unidade * 3);

    ctx.fillStyle = "#dff9ff";
    ctx.fillRect(x + unidade * 3, y + unidade, tamanho - unidade * 6, unidade * 3);
    ctx.fillRect(x + unidade, y + unidade * 4, unidade * 3, unidade * 2);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 4, unidade * 3, unidade * 2);

    ctx.fillStyle = "#326c8c";
    ctx.fillRect(x + unidade * 3, y + unidade * 4, tamanho - unidade * 6, unidade * 3);
    ctx.fillRect(x + unidade * 2, y + unidade * 8, tamanho - unidade * 4, unidade * 2);

    ctx.fillStyle = "#0b2433";
    ctx.fillRect(x + unidade * 4, y + unidade * 5, unidade, unidade);
    ctx.fillRect(x + tamanho - unidade * 5, y + unidade * 5, unidade, unidade);

    ctx.fillStyle = "#fff36a";
    ctx.fillRect(x + unidade * 5, y + unidade * 8, tamanho - unidade * 10, unidade * 2);

    ctx.fillStyle = "#b9f4ff";
    ctx.fillRect(x + unidade * 2, y - unidade, unidade * 2, unidade * 3);
    ctx.fillRect(x + unidade * 5, y - unidade * 2, unidade * 2, unidade * 4);
    ctx.fillRect(x + tamanho - unidade * 4, y - unidade, unidade * 2, unidade * 3);
}

function desenharSabotador(x, y, tamanho) {
    const unidade = Math.max(2, Math.floor(tamanho / 11));

    ctx.fillStyle = "#13272a";
    ctx.fillRect(x + unidade, y + unidade * 3, tamanho - unidade * 2, unidade * 7);
    ctx.fillRect(x - unidade, y + unidade * 4, unidade * 4, unidade * 5);
    ctx.fillRect(x + unidade * 2, y + tamanho - unidade * 3, unidade * 3, unidade * 3);
    ctx.fillRect(x + tamanho - unidade * 5, y + tamanho - unidade * 3, unidade * 3, unidade * 3);

    ctx.fillStyle = "#234c50";
    ctx.fillRect(x + unidade * 2, y + unidade, tamanho - unidade * 4, unidade * 5);
    ctx.fillRect(x + unidade, y + unidade * 4, tamanho - unidade * 2, unidade * 5);
    ctx.fillRect(x, y + unidade * 5, unidade * 3, unidade * 3);

    ctx.fillStyle = CONFIG.inimigo.sabotador.cor;
    ctx.fillRect(x + unidade * 3, y, tamanho - unidade * 6, unidade);
    ctx.fillRect(x + unidade * 2, y + unidade, tamanho - unidade * 4, unidade * 2);
    ctx.fillRect(x + unidade * 3, y + unidade * 5, tamanho - unidade * 6, unidade * 3);

    ctx.fillStyle = "#102023";
    ctx.fillRect(x + unidade * 3, y + unidade * 2, tamanho - unidade * 6, unidade * 2);
    ctx.fillStyle = "#ff5f55";
    ctx.fillRect(x + unidade * 4, y + unidade * 2, unidade, unidade);
    ctx.fillRect(x + tamanho - unidade * 5, y + unidade * 2, unidade, unidade);

    ctx.fillStyle = "#d9e5d5";
    ctx.fillRect(x + tamanho - unidade * 2, y + unidade * 5, unidade * 4, unidade * 2);
    ctx.fillRect(x + tamanho, y + unidade * 4, unidade, unidade);
    ctx.fillStyle = "#26383a";
    ctx.fillRect(x + tamanho + unidade, y + unidade * 5, unidade * 2, unidade);
    ctx.fillRect(x - unidade, y + unidade * 2, unidade, unidade * 3);
    ctx.fillStyle = "#75eff2";
    ctx.fillRect(x - unidade, y + unidade, unidade, unidade);
}

function desenharFaraoDeAreia(x, y, tamanho) {
    const unidade = Math.max(4, Math.floor(tamanho / 10));

    ctx.fillStyle = "#3b291c";
    ctx.fillRect(x + unidade, y + unidade, tamanho, tamanho);

    ctx.fillStyle = "#176b75";
    ctx.fillRect(x, y, tamanho, tamanho - unidade);
    ctx.fillStyle = CONFIG.inimigo.bossDeserto.cor;
    ctx.fillRect(x + unidade, y + unidade, tamanho - unidade * 2, tamanho - unidade * 2);

    ctx.fillStyle = "#f2c45f";
    ctx.fillRect(x, y, tamanho, unidade * 2);
    ctx.fillRect(x, y + unidade * 4, unidade * 2, tamanho - unidade * 5);
    ctx.fillRect(x + tamanho - unidade * 2, y + unidade * 4, unidade * 2, tamanho - unidade * 5);

    ctx.fillStyle = "#164952";
    for (let faixa = unidade * 2; faixa < tamanho - unidade; faixa += unidade * 2) {
        ctx.fillRect(x + faixa, y, unidade, unidade * 2);
    }

    ctx.fillStyle = "#3a2419";
    ctx.fillRect(x + unidade * 2, y + unidade * 4, tamanho - unidade * 4, unidade * 2);
    ctx.fillStyle = "#fff06a";
    ctx.fillRect(x + unidade * 3, y + unidade * 4, unidade, unidade);
    ctx.fillRect(x + tamanho - unidade * 4, y + unidade * 4, unidade, unidade);

    ctx.fillStyle = "#8d4c24";
    ctx.fillRect(x + unidade * 4, y + unidade * 6, unidade * 2, unidade);
    ctx.fillStyle = "#f5d36f";
    ctx.fillRect(x + unidade * 4, y - unidade, unidade * 2, unidade);
}

function desenharTanqueDeCombustivelDoLancaChamas(estilo) {
    ctx.fillStyle = "#20242a";
    ctx.fillRect(-estilo.raioBase - 9, -17, 18, 34);
    ctx.fillStyle = estilo.corCombustivel;
    ctx.fillRect(-estilo.raioBase - 6, -14, 12, 28);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-estilo.raioBase - 7, -3, 14, 7);
    ctx.fillStyle = "#7a8790";
    ctx.fillRect(-estilo.raioBase - 3, -21, 7, 7);
}

function desenharArmamentoDoLancaChamas(estilo) {
    ctx.fillStyle = "#1d2227";
    ctx.fillRect(-13, -28, 26, 18);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-10, -31, 20, 7);
    ctx.fillStyle = estilo.corCanhao;
    ctx.fillRect(-8, -52, 16, 29);
    ctx.fillRect(-11, -58, 22, 9);
    ctx.fillStyle = "#798087";
    ctx.fillRect(-5, -49, 10, 21);
    ctx.fillStyle = "#ffb23e";
    ctx.fillRect(-6, -61, 12, 5);
}

function desenharArmamentoGlacial(estilo) {
    const metadeDaLargura = estilo.larguraCristal / 2;
    const topoDoCristal = -estilo.alturaCristal;

    ctx.fillStyle = "#173747";
    ctx.fillRect(-10, -18, 20, 20);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-15, -20, 30, 8);
    ctx.fillRect(-11, -28, 22, 8);

    ctx.fillStyle = estilo.corCanhao;
    ctx.beginPath();
    ctx.moveTo(0, topoDoCristal);
    ctx.lineTo(metadeDaLargura, topoDoCristal + 18);
    ctx.lineTo(metadeDaLargura - 4, -24);
    ctx.lineTo(0, -15);
    ctx.lineTo(-metadeDaLargura + 4, -24);
    ctx.lineTo(-metadeDaLargura, topoDoCristal + 18);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = estilo.corDetalhe;
    ctx.beginPath();
    ctx.moveTo(0, topoDoCristal + 6);
    ctx.lineTo(metadeDaLargura - 5, topoDoCristal + 20);
    ctx.lineTo(0, -20);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-3, topoDoCristal + 9, 5, 11);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-metadeDaLargura - 8, -37, 7, 12);
    ctx.fillRect(metadeDaLargura + 2, -31, 6, 10);
}

function desenharArmamentoDaBesta(estilo) {
    const metadeDaLargura = estilo.larguraBesta / 2;
    const topo = -estilo.comprimentoBesta;
    ctx.fillStyle = "#3a2618";
    ctx.fillRect(-5, topo, 10, estilo.comprimentoBesta + 5);
    ctx.fillStyle = estilo.corCanhao;
    ctx.fillRect(-metadeDaLargura, topo + 8, estilo.larguraBesta, 7);
    ctx.fillRect(-metadeDaLargura, topo + 8, 7, 17);
    ctx.fillRect(metadeDaLargura - 7, topo + 8, 7, 17);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-metadeDaLargura + 6, topo + 19, estilo.larguraBesta - 12, 3);
    ctx.fillRect(-2, topo - 7, 4, 29);
    ctx.fillStyle = "#f0dfaa";
    ctx.fillRect(-1, topo - 10, 2, 22);
}

function desenharArmamentoDaIscaBlindada(estilo) {
    ctx.fillStyle = "#283038";
    ctx.fillRect(-5, -43, 10, 31);
    ctx.fillStyle = estilo.corBase;
    ctx.fillRect(-18, -48, 36, 10);
    ctx.fillRect(-22, -38, 44, 22);
    ctx.fillRect(-17, -16, 34, 8);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-15, -35, 30, 16);
    ctx.fillStyle = estilo.corCanhao;
    ctx.fillRect(-4, -35, 8, 16);
    ctx.fillRect(-12, -31, 24, 8);
    ctx.fillStyle = "#20262c";
    ctx.fillRect(-16, -43, 5, 5);
    ctx.fillRect(11, -43, 5, 5);
    ctx.fillRect(-16, -20, 5, 5);
    ctx.fillRect(11, -20, 5, 5);
}

function desenharArmamentoDoAmplificador(estilo) {
    ctx.fillStyle = "#172631";
    ctx.fillRect(-5, -44, 10, 34);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-19, -45, 38, 7);
    ctx.fillRect(-14, -52, 28, 7);
    ctx.fillRect(-8, -59, 16, 7);
    ctx.fillStyle = estilo.corCanhao;
    ctx.fillRect(-5, -57, 10, 10);
    ctx.fillRect(-10, -37, 20, 8);
    ctx.fillStyle = "#d9fff8";
    ctx.fillRect(-3, -55, 6, 6);
}

function desenharArmamentoDeEsporos(estilo) {
    const largura = estilo.larguraCogumelo;
    const altura = estilo.alturaCogumelo;
    const topo = -altura;

    ctx.fillStyle = "#34251f";
    ctx.fillRect(-7, topo + 14, 14, altura - 20);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-4, topo + 12, 8, altura - 18);
    ctx.fillStyle = estilo.corCanhao;
    ctx.fillRect(-largura / 2 + 5, topo, largura - 10, 10);
    ctx.fillRect(-largura / 2, topo + 8, largura, 12);
    ctx.fillRect(-largura / 2 + 7, topo + 20, largura - 14, 7);
    ctx.fillStyle = estilo.corEsporos;
    ctx.fillRect(-largura / 2 + 8, topo + 5, 7, 7);
    ctx.fillRect(largura / 2 - 15, topo + 11, 6, 6);
    ctx.fillStyle = "#fff0b0";
    ctx.fillRect(-3, topo + 4, 6, 6);
}

function desenharArmamentoDeRaios(estilo) {
    ctx.fillStyle = "#17243d";
    ctx.fillRect(-7, -43, 14, 32);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-18, -47, 10, 10);
    ctx.fillRect(8, -47, 10, 10);
    ctx.fillRect(-5, -58, 10, 14);
    ctx.fillStyle = estilo.corCanhao;
    ctx.fillRect(-15, -44, 7, 7);
    ctx.fillRect(8, -44, 7, 7);
    ctx.fillRect(-3, -57, 6, 8);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-2, -54, 4, 4);
}

function desenharArmamentoDoObliterador(estilo) {
    const comprimento = estilo.comprimentoCanhao || 48;

    ctx.fillStyle = "#1a1419";
    ctx.fillRect(-23, -27, 46, 18);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-19, -31, 38, 7);

    for (const deslocamentoX of [-13, 0, 13]) {
        ctx.fillStyle = "#24191d";
        ctx.fillRect(deslocamentoX - 6, -comprimento, 12, comprimento - 14);
        ctx.fillStyle = estilo.corCanhao;
        ctx.fillRect(deslocamentoX - 3, -comprimento - 5, 6, comprimento - 17);
        ctx.fillStyle = estilo.corDetalhe;
        ctx.fillRect(deslocamentoX - 5, -comprimento - 8, 10, 7);
    }

    ctx.fillStyle = "#ffded2";
    ctx.fillRect(-3, -23, 6, 8);
}

function desenharAuraDoAmplificador(torre) {
    const configuracao = obterConfiguracaoDaTorre(torre.tipo);

    if (!configuracao.percentualBonusCadencia) {
        return;
    }

    ctx.save();
    ctx.fillStyle = "rgba(74, 232, 205, 0.055)";
    ctx.beginPath();
    ctx.arc(torre.x, torre.y, torre.alcance, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(94, 240, 208, 0.42)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.stroke();
    ctx.setLineDash([]);

    for (let indice = 0; indice < 4; indice++) {
        const angulo = indice * Math.PI / 2;
        const x = Math.round(torre.x + Math.cos(angulo) * torre.alcance);
        const y = Math.round(torre.y + Math.sin(angulo) * torre.alcance);
        ctx.fillStyle = "#5ef0d0";
        ctx.fillRect(x - 4, y - 4, 8, 8);
    }

    ctx.restore();
}

function desenharMinaTerrestre(x, y, estilo) {
    const raio = estilo.raioBase;

    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.fillStyle = "rgba(8, 12, 15, 0.42)";
    ctx.fillRect(-raio - 3, 5, raio * 2 + 6, 8);
    ctx.fillStyle = "#20262d";
    ctx.fillRect(-raio, -5, raio * 2, 10);
    ctx.fillRect(-raio + 5, -11, raio * 2 - 10, 22);
    ctx.fillStyle = estilo.corBase;
    ctx.fillRect(-raio + 4, -5, raio * 2 - 8, 10);
    ctx.fillRect(-raio + 9, -10, raio * 2 - 18, 20);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-raio + 3, -3, 7, 6);
    ctx.fillRect(raio - 10, -3, 7, 6);
    ctx.fillRect(-3, -raio + 3, 6, 7);
    ctx.fillRect(-3, raio - 10, 6, 7);
    ctx.fillStyle = "#181d22";
    ctx.fillRect(-8, -8, 16, 16);
    ctx.fillStyle = estilo.corCanhao;
    ctx.fillRect(-5, -5, 10, 10);
    ctx.fillStyle = estilo.corBrilho || "#ff9c58";
    ctx.fillRect(-2, -2, 4, 4);
    ctx.restore();
}

function desenharMinasTerrestres() {
    for (const mina of minasTerrestres) {
        const estilo = obterConfiguracaoDaTorre(mina.tipo).visualBase;
        desenharMinaTerrestre(mina.x, mina.y, estilo);
    }
}

function desenharBombaPesada(x, y, estilo, ativada = false, explodeEm = 0, agora = Date.now()) {
    const raio = estilo.raioBase;
    const pavioPiscando = ativada
        && Math.floor(Math.max(0, explodeEm - agora) / 120) % 2 === 0;

    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.fillStyle = "rgba(8, 12, 15, 0.48)";
    ctx.fillRect(-raio - 5, raio - 4, raio * 2 + 10, 8);
    ctx.fillStyle = "#151a20";
    ctx.fillRect(-raio, -raio + 7, raio * 2, raio * 2 - 7);
    ctx.fillRect(-raio + 6, -raio, raio * 2 - 12, raio * 2);
    ctx.fillStyle = estilo.corBase;
    ctx.fillRect(-raio + 4, -raio + 10, raio * 2 - 8, raio * 2 - 14);
    ctx.fillRect(-raio + 9, -raio + 3, raio * 2 - 18, raio * 2 - 4);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-13, -4, 26, 7);
    ctx.fillStyle = "#080b0f";
    ctx.fillRect(3, -raio - 7, 7, 12);
    ctx.fillStyle = ativada ? (pavioPiscando ? "#fff36a" : estilo.corCanhao) : "#6a727a";
    ctx.fillRect(8, -raio - 12, 7, 7);

    if (ativada && pavioPiscando) {
        ctx.fillStyle = "#ff713f";
        ctx.fillRect(15, -raio - 16, 5, 5);
        ctx.fillRect(10, -raio - 20, 4, 4);
    }

    ctx.restore();
}

function desenharBombasPesadas() {
    const agora = Date.now();

    for (const bomba of bombasPesadas) {
        const estilo = obterConfiguracaoDaTorre(bomba.tipo).visualBase;
        desenharBombaPesada(
            bomba.x,
            bomba.y,
            estilo,
            bomba.ativada,
            bomba.explodeEm,
            agora
        );
    }
}

function desenharExplosoesDosExplosivos() {
    for (const explosao of explosoesDosExplosivos) {
        const progresso = 1 - explosao.quadrosRestantes / explosao.totalDeQuadros;
        const raioAtual = Math.max(10, Math.round(explosao.raio * progresso));
        const tamanhoDoNucleo = Math.max(8, Math.round(30 * (1 - progresso)));

        if (explosao.tipoVisual === "esporos") {
            desenharNuvemDeEsporos(explosao, progresso, raioAtual);
            continue;
        }

        if (explosao.tipoVisual === "raios") {
            desenharRaiosEncadeados(explosao, progresso);
            continue;
        }

        if (explosao.tipoVisual === "gelo") {
            desenharExplosaoCongelante(explosao, progresso, raioAtual);
            continue;
        }

        if (explosao.tipoVisual === "sismico") {
            desenharImpactoSismico(explosao, progresso, raioAtual);
            continue;
        }

        ctx.save();
        ctx.translate(Math.round(explosao.x), Math.round(explosao.y));
        ctx.globalAlpha = Math.max(0, explosao.quadrosRestantes / explosao.totalDeQuadros);
        ctx.strokeStyle = "#ff623e";
        ctx.lineWidth = 6;
        ctx.strokeRect(-raioAtual, -raioAtual, raioAtual * 2, raioAtual * 2);
        ctx.fillStyle = "#ff9f43";
        ctx.fillRect(-tamanhoDoNucleo, -4, tamanhoDoNucleo * 2, 8);
        ctx.fillRect(-4, -tamanhoDoNucleo, 8, tamanhoDoNucleo * 2);
        ctx.fillStyle = "#fff36a";
        ctx.fillRect(
            -tamanhoDoNucleo / 2,
            -tamanhoDoNucleo / 2,
            tamanhoDoNucleo,
            tamanhoDoNucleo
        );
        ctx.restore();
    }
}

function desenharRaiosEncadeados(explosao, progresso) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - progresso);
    ctx.fillStyle = "#8ff7ff";

    for (const segmento of explosao.segmentos) {
        const dx = segmento.fimX - segmento.inicioX;
        const dy = segmento.fimY - segmento.inicioY;
        const comprimento = Math.max(1, Math.hypot(dx, dy));
        const passos = Math.max(2, Math.ceil(comprimento / 9));
        const perpendicularX = -dy / comprimento;
        const perpendicularY = dx / comprimento;

        for (let passo = 0; passo <= passos; passo++) {
            const fracao = passo / passos;
            const desvio = passo % 2 === 0 ? -4 : 4;
            const x = segmento.inicioX + dx * fracao + perpendicularX * desvio;
            const y = segmento.inicioY + dy * fracao + perpendicularY * desvio;
            ctx.fillRect(Math.round(x) - 3, Math.round(y) - 3, 6, 6);
        }
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(Math.round(explosao.x) - 5, Math.round(explosao.y) - 5, 10, 10);
    ctx.restore();
}

function desenharExplosaoCongelante(explosao, progresso, raioAtual) {
    ctx.save();
    ctx.translate(Math.round(explosao.x), Math.round(explosao.y));
    ctx.globalAlpha = Math.max(0, 1 - progresso);
    ctx.strokeStyle = explosao.cor || "#9ef4ff";
    ctx.lineWidth = 5;
    ctx.strokeRect(-raioAtual, -raioAtual, raioAtual * 2, raioAtual * 2);
    ctx.fillStyle = "rgba(158, 244, 255, 0.35)";
    ctx.fillRect(-raioAtual, -5, raioAtual * 2, 10);
    ctx.fillRect(-5, -raioAtual, 10, raioAtual * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-8, -8, 16, 16);
    ctx.restore();
}

function desenharImpactoSismico(explosao, progresso, raioAtual) {
    const opacidade = Math.max(0, 1 - progresso);
    const intensidade = explosao.intensidade || 1;

    ctx.save();
    ctx.translate(Math.round(explosao.x), Math.round(explosao.y));
    ctx.globalAlpha = opacidade;
    ctx.strokeStyle = explosao.cor || "#ff9145";
    ctx.lineWidth = Math.max(3, 7 * intensidade);
    ctx.beginPath();
    ctx.arc(0, 0, raioAtual, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = explosao.cor || "#ff9145";

    for (let indice = 0; indice < 8; indice++) {
        const angulo = indice * Math.PI / 4;
        const inicio = 18 * intensidade;
        const comprimento = raioAtual * (0.48 + (indice % 3) * 0.08);
        const xInicial = Math.cos(angulo) * inicio;
        const yInicial = Math.sin(angulo) * inicio;
        const xFinal = Math.cos(angulo) * comprimento;
        const yFinal = Math.sin(angulo) * comprimento;
        const passos = 4;

        for (let passo = 0; passo < passos; passo++) {
            const fracao = passo / passos;
            const x = xInicial + (xFinal - xInicial) * fracao;
            const y = yInicial + (yFinal - yInicial) * fracao;
            const tamanho = Math.max(3, Math.round(7 * intensidade));
            ctx.fillRect(Math.round(x) - tamanho / 2, Math.round(y) - tamanho / 2, tamanho, tamanho);
        }
    }

    ctx.restore();
}

function desenharNuvemDeEsporos(explosao, progresso, raioAtual) {
    const cor = explosao.cor || "#d98aba";
    const opacidade = Math.max(0, 1 - progresso);

    ctx.save();
    ctx.translate(Math.round(explosao.x), Math.round(explosao.y));
    ctx.globalAlpha = opacidade;
    ctx.fillStyle = "rgba(65, 35, 72, 0.45)";
    ctx.fillRect(-raioAtual, -raioAtual, raioAtual * 2, raioAtual * 2);
    ctx.strokeStyle = cor;
    ctx.lineWidth = 4;
    ctx.strokeRect(-raioAtual, -raioAtual, raioAtual * 2, raioAtual * 2);

    for (let indice = 0; indice < 8; indice++) {
        const angulo = indice * Math.PI / 4;
        const distancia = raioAtual * (0.35 + (indice % 3) * 0.2);
        const x = Math.round(Math.cos(angulo) * distancia);
        const y = Math.round(Math.sin(angulo) * distancia);
        const tamanho = 5 + (indice % 2) * 3;
        ctx.fillStyle = indice % 2 === 0 ? cor : "#fff0b0";
        ctx.fillRect(x - tamanho / 2, y - tamanho / 2, tamanho, tamanho);
    }

    ctx.restore();
}

function desenharDetalhesDaSkinAurora(estilo) {
    const nivel = estilo.nivelVisualAurora || 0;
    const raio = estilo.raioBase;
    const corAurora = estilo.corAurora || "#ffb7ed";

    ctx.save();
    ctx.fillStyle = corAurora;

    if (nivel === 0) {
        ctx.fillRect(-4, raio - 11, 8, 6);
    }

    if (nivel >= 1) {
        ctx.fillRect(-raio - 5, -9, 8, 18);
        ctx.fillRect(raio - 3, -9, 8, 18);
        ctx.fillRect(-raio + 5, -raio + 5, 8, 8);
        ctx.fillRect(raio - 13, -raio + 5, 8, 8);
    }

    if (nivel >= 2) {
        ctx.fillRect(-raio + 4, raio - 7, 12, 8);
        ctx.fillRect(raio - 16, raio - 7, 12, 8);
        ctx.fillStyle = estilo.corCanhao;
        ctx.fillRect(-6, -raio - 4, 12, 9);
    }

    if (nivel >= 3) {
        ctx.strokeStyle = corAurora;
        ctx.lineWidth = 4;
        ctx.strokeRect(-13, -13, 26, 26);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-4, -4, 8, 8);
    }

    ctx.restore();
}

function desenharGeradorDeCreditos(x, y, estilo) {
    const raio = estilo.raioBase;
    const nivel = estilo.nivelVisual || 0;
    const larguraDoCorpo = raio * 1.55;
    const alturaDoCorpo = raio * 1.7;

    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.shadowColor = "rgba(0, 0, 0, 0.46)";
    ctx.shadowBlur = 11;
    ctx.shadowOffsetY = 7;
    ctx.fillStyle = "#14231a";
    ctx.fillRect(-larguraDoCorpo / 2 - 5, -alturaDoCorpo / 2, larguraDoCorpo + 10, alturaDoCorpo + 8);

    ctx.shadowColor = "transparent";
    ctx.fillStyle = estilo.corBase;
    ctx.fillRect(-larguraDoCorpo / 2, -alturaDoCorpo / 2 - 3, larguraDoCorpo, alturaDoCorpo);
    ctx.fillStyle = "#26372b";
    ctx.fillRect(-larguraDoCorpo / 2 - 6, alturaDoCorpo / 2 - 8, larguraDoCorpo + 12, 10);

    ctx.fillStyle = estilo.corPainel;
    ctx.fillRect(-raio + 8, -raio + 6, raio * 2 - 16, raio + 7);
    ctx.strokeStyle = estilo.corDetalhe;
    ctx.lineWidth = 2;
    ctx.strokeRect(-raio + 8, -raio + 6, raio * 2 - 16, raio + 7);

    ctx.fillStyle = estilo.corCanhao;
    ctx.beginPath();
    ctx.moveTo(0, -raio + 11);
    ctx.lineTo(10, -raio + 22);
    ctx.lineTo(0, -raio + 33);
    ctx.lineTo(-10, -raio + 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = estilo.corPainel;
    ctx.fillRect(-3, -raio + 19, 6, 7);

    const quantidadeDeBarras = nivel + 1;
    const larguraDaBarra = 7;
    const espacamento = 3;
    const larguraDasBarras = quantidadeDeBarras * larguraDaBarra
        + (quantidadeDeBarras - 1) * espacamento;
    ctx.fillStyle = estilo.corDetalhe;
    for (let indice = 0; indice < quantidadeDeBarras; indice++) {
        const altura = 6 + indice * 3;
        const barraX = -larguraDasBarras / 2 + indice * (larguraDaBarra + espacamento);
        ctx.fillRect(barraX, raio - 10 - altura, larguraDaBarra, altura);
    }

    if (nivel >= 2) {
        ctx.fillStyle = estilo.corCanhao;
        ctx.fillRect(-raio - 5, -8, 7, 18);
        ctx.fillRect(raio - 2, -8, 7, 18);
    }

    if (nivel >= 3) {
        ctx.fillStyle = "#fff9c8";
        ctx.fillRect(-4, -raio - 8, 8, 8);
        ctx.fillRect(-raio - 8, -3, 6, 6);
        ctx.fillRect(raio + 2, -3, 6, 6);
    }

    ctx.restore();
}

function desenharTorreSismica(x, y, estilo) {
    const raio = estilo.raioBase;
    const nivel = estilo.nivelVisual || 0;

    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 7;
    ctx.fillStyle = "#1d1715";
    ctx.fillRect(-raio - 4, -raio + 7, raio * 2 + 8, raio * 2 - 2);

    ctx.shadowColor = "transparent";
    ctx.fillStyle = estilo.corBase;
    ctx.fillRect(-raio, -raio + 4, raio * 2, raio * 2 - 8);
    ctx.fillStyle = "#2b211e";
    ctx.fillRect(-raio - 5, raio - 10, raio * 2 + 10, 10);
    ctx.fillRect(-raio + 5, -raio, raio * 2 - 10, 8);

    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-raio + 5, -6, 8, 12);
    ctx.fillRect(raio - 13, -6, 8, 12);

    ctx.fillStyle = "#151313";
    ctx.fillRect(-11, -raio - 8, 22, raio + 18);
    ctx.fillStyle = estilo.corCanhao;
    ctx.fillRect(-7, -raio - 12, 14, raio + 14);
    ctx.fillStyle = estilo.corDetalhe;
    ctx.fillRect(-10, -raio - 15, 20, 8);
    ctx.fillRect(-13, -1, 26, 9);

    ctx.fillStyle = estilo.corFissura;
    ctx.fillRect(-3, 11, 6, 10);
    ctx.fillRect(-10, 18, 7, 5);
    ctx.fillRect(3, 21, 10, 5);

    if (nivel >= 1) {
        ctx.fillRect(-raio - 4, -raio + 4, 7, 15);
        ctx.fillRect(raio - 3, -raio + 4, 7, 15);
    }

    if (nivel >= 2) {
        ctx.fillStyle = estilo.corDetalhe;
        ctx.fillRect(-raio + 5, raio - 17, 12, 7);
        ctx.fillRect(raio - 17, raio - 17, 12, 7);
    }

    if (nivel >= 3) {
        ctx.fillStyle = "#fff0a0";
        ctx.fillRect(-5, -raio - 20, 10, 6);
        ctx.fillRect(-raio - 7, -4, 6, 8);
        ctx.fillRect(raio + 1, -4, 6, 8);
    }

    ctx.restore();
}

function desenharCorpoDaTorre(x, y, estilo, anguloDaMira = -Math.PI / 2) {
    if (estilo.tipoVisual === "mina") {
        desenharMinaTerrestre(x, y, estilo);
        return;
    }

    if (estilo.tipoVisual === "bomba") {
        desenharBombaPesada(x, y, estilo);
        return;
    }

    if (estilo.tipoVisual === "geradorDeCreditos") {
        desenharGeradorDeCreditos(x, y, estilo);
        return;
    }

    if (estilo.tipoVisual === "sismica") {
        desenharTorreSismica(x, y, estilo);
        return;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = "#12231b";
    ctx.beginPath();
    ctx.arc(0, 0, estilo.raioBase + 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = "transparent";
    ctx.fillStyle = estilo.corBase;
    ctx.beginPath();
    ctx.arc(0, 0, estilo.raioBase, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.48)";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (estilo.corDetalhe) {
        ctx.fillStyle = estilo.corDetalhe;
        ctx.fillRect(-estilo.raioBase + 7, -5, estilo.raioBase * 2 - 14, 10);
    }

    if (estilo.tipoVisual === "aurora") {
        desenharDetalhesDaSkinAurora(estilo);
    }

    if (estilo.tipoVisual === "lancaChamas") {
        desenharTanqueDeCombustivelDoLancaChamas(estilo);
    }

    ctx.save();
    ctx.rotate(anguloDaMira + Math.PI / 2);

    if (estilo.tipoVisual === "glacial") {
        desenharArmamentoGlacial(estilo);
    } else if (estilo.tipoVisual === "besta") {
        desenharArmamentoDaBesta(estilo);
    } else if (estilo.tipoVisual === "esporos") {
        desenharArmamentoDeEsporos(estilo);
    } else if (estilo.tipoVisual === "raios") {
        desenharArmamentoDeRaios(estilo);
    } else if (estilo.tipoVisual === "obliterador") {
        desenharArmamentoDoObliterador(estilo);
    } else if (estilo.tipoVisual === "isca") {
        desenharArmamentoDaIscaBlindada(estilo);
    } else if (estilo.tipoVisual === "amplificador") {
        desenharArmamentoDoAmplificador(estilo);
    } else if (estilo.tipoVisual === "lancaChamas") {
        desenharArmamentoDoLancaChamas(estilo);
    } else {
        const larguraCanhao = estilo.larguraCanhao || 12;
        const comprimentoCanhao = estilo.comprimentoCanhao || 34;
        ctx.fillStyle = estilo.corCanhao;
        desenharRetanguloArredondado(
            -larguraCanhao / 2,
            -comprimentoCanhao + 2,
            larguraCanhao,
            comprimentoCanhao,
            Math.min(5, larguraCanhao / 3)
        );
        ctx.fill();
    }

    ctx.restore();

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.arc(-7, -8, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function desenharTorres() {
    for (const torre of torres) {
        const estilo = obterEstiloDaTorre(torre);
        const alcanceAtual = obterAlcanceAtualDaTorre(torre);
        desenharAuraDoAmplificador(torre);

        if (torre === torreSelecionada) {
            ctx.fillStyle = "rgba(130, 205, 255, 0.065)";
            ctx.beginPath();
            ctx.arc(torre.x, torre.y, alcanceAtual, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = torre === torreSelecionada
            ? "rgba(255, 139, 135, 0.52)"
            : "rgba(255, 139, 135, 0.2)";
        ctx.lineWidth = torre === torreSelecionada ? 2 : 1;
        ctx.setLineDash([5, 7]);
        ctx.beginPath();
        ctx.arc(torre.x, torre.y, CONFIG.torre.distanciaMinima, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = torre === torreSelecionada
            ? "rgba(143, 207, 255, 0.72)"
            : "rgba(143, 207, 255, 0.16)";
        ctx.beginPath();
        ctx.arc(torre.x, torre.y, alcanceAtual, 0, Math.PI * 2);
        ctx.stroke();

        desenharCorpoDaTorre(
            torre.x,
            torre.y,
            estilo,
            torre.anguloDaMira ?? -Math.PI / 2
        );
        desenharCargaDaTorreSismica(torre, estilo);

        if (torre === torreSelecionada) {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(torre.x, torre.y, estilo.raioBase + 10, 0, Math.PI * 2);
            ctx.stroke();
        }

        desenharResistenciaDaTorre(torre, estilo);
        desenharEfeitoDeLentidaoDoMacaco(torre, estilo);
        desenharEfeitoDeReducaoDaCoruja(torre, estilo);
        desenharEfeitoDeAtordoamentoDoUrso(torre, estilo);
    }
}

function desenharCargaDaTorreSismica(torre, estilo) {
    const configuracaoAtual = obterConfiguracaoAtualDaTorre(torre);

    if (!configuracaoAtual.efeitoSismico) {
        return;
    }

    const total = configuracaoAtual.efeitoSismico.cargasNecessarias;
    const atual = Math.min(total, torre.cargaSismica || 0);
    const largura = Math.max(48, estilo.raioBase * 2);
    const x = torre.x - largura / 2;
    const y = torre.y - estilo.raioBase - 18;

    ctx.fillStyle = "rgba(18, 14, 12, 0.9)";
    ctx.fillRect(x, y, largura, 9);
    ctx.fillStyle = estilo.corFissura || "#ff9145";
    ctx.fillRect(x + 2, y + 2, (largura - 4) * atual / total, 5);
    ctx.strokeStyle = "rgba(255, 224, 143, 0.8)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, largura, 9);
}

function desenharAvisosDeCreditosGerados() {
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "900 15px system-ui, sans-serif";

    for (const avisoDeCreditos of avisosDeCreditosGerados) {
        const progresso = 1
            - avisoDeCreditos.quadrosRestantes / avisoDeCreditos.totalDeQuadros;
        const y = avisoDeCreditos.y - progresso * 24;
        const texto = localizar("+{creditos} créditos", {
            creditos: avisoDeCreditos.creditos
        });
        const largura = ctx.measureText(texto).width + 18;

        ctx.globalAlpha = Math.max(0, 1 - progresso);
        ctx.fillStyle = "rgba(13, 48, 29, 0.9)";
        desenharRetanguloArredondado(
            avisoDeCreditos.x - largura / 2,
            y - 18,
            largura,
            25,
            8
        );
        ctx.fill();
        ctx.strokeStyle = "rgba(243, 202, 85, 0.9)";
        ctx.stroke();
        ctx.fillStyle = "#fff0a6";
        ctx.fillText(texto, avisoDeCreditos.x, y);
    }

    ctx.restore();
}

function desenharEfeitoDeLentidaoDoMacaco(torre, estilo) {
    if (Date.now() >= (torre.lentidaoMacacoExpiraEm || 0)) {
        return;
    }

    const raio = estilo.raioBase + 13;
    ctx.fillStyle = "#f4c542";
    ctx.fillRect(torre.x - raio, torre.y - 4, 7, 7);
    ctx.fillRect(torre.x + raio - 7, torre.y - 4, 7, 7);
    ctx.fillRect(torre.x - 4, torre.y - raio, 7, 7);
    ctx.strokeStyle = "rgba(244, 197, 66, 0.65)";
    ctx.lineWidth = 2;
    ctx.strokeRect(torre.x - raio, torre.y - raio, raio * 2, raio * 2);
}

function desenharEfeitoDeReducaoDaCoruja(torre, estilo) {
    if (Date.now() >= (torre.reducaoAlcanceCorujaExpiraEm || 0)) {
        return;
    }

    const raio = estilo.raioBase + 17;
    ctx.fillStyle = "#b894d6";
    ctx.fillRect(torre.x - raio, torre.y - raio, 8, 8);
    ctx.fillRect(torre.x + raio - 8, torre.y - raio, 8, 8);
    ctx.fillRect(torre.x - 4, torre.y + raio - 8, 8, 8);
    ctx.strokeStyle = "rgba(184, 148, 214, 0.7)";
    ctx.lineWidth = 2;
    ctx.strokeRect(torre.x - raio, torre.y - raio, raio * 2, raio * 2);
}

function desenharEfeitoDeAtordoamentoDoUrso(torre, estilo) {
    if (!torreEstaAtordoadaPeloUrso(torre)) {
        return;
    }

    const raio = estilo.raioBase + 20;
    ctx.fillStyle = "#ffd36d";
    ctx.fillRect(torre.x - raio, torre.y - raio, 9, 9);
    ctx.fillRect(torre.x + raio - 9, torre.y - raio, 9, 9);
    ctx.fillRect(torre.x - raio, torre.y + raio - 9, 9, 9);
    ctx.fillRect(torre.x + raio - 9, torre.y + raio - 9, 9, 9);
    ctx.strokeStyle = "rgba(255, 191, 73, 0.85)";
    ctx.lineWidth = 3;
    ctx.strokeRect(torre.x - raio, torre.y - raio, raio * 2, raio * 2);
}

function desenharResistenciaDaTorre(torre, estilo) {
    const tirosRecebidos = torre.tirosRecebidos || 0;

    if (tirosRecebidos === 0) {
        return;
    }

    const total = obterResistenciaDaTorre(torre);
    const larguraBloco = 6;
    const espaco = 2;
    const larguraTotal = total * larguraBloco + (total - 1) * espaco;
    const xInicial = torre.x - larguraTotal / 2;
    const y = torre.y - estilo.raioBase - 18;

    for (let indice = 0; indice < total; indice++) {
        ctx.fillStyle = indice < total - tirosRecebidos ? "#68df89" : "#542b2b";
        ctx.fillRect(xInicial + indice * (larguraBloco + espaco), y, larguraBloco, 6);
    }
}

function desenharEstilhacoGlacial(tiro) {
    ctx.save();
    ctx.translate(Math.round(tiro.x), Math.round(tiro.y));
    ctx.shadowColor = "#8fefff";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#dffbff";
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(7, 0);
    ctx.lineTo(0, 9);
    ctx.lineTo(-7, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#5dbbd2";
    ctx.fillRect(-3, -5, 4, 10);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-2, -5, 3, 4);
    ctx.restore();
}

function desenharViroteDaBesta(tiro) {
    ctx.save();
    ctx.translate(Math.round(tiro.x), Math.round(tiro.y));
    ctx.fillStyle = "#e7d9ad";
    ctx.fillRect(-8, -2, 16, 4);
    ctx.fillStyle = "#69442a";
    ctx.fillRect(-10, -4, 4, 8);
    ctx.fillStyle = "#b7c7aa";
    ctx.fillRect(6, -3, 5, 6);
    ctx.restore();
}

function desenharOrbeDeEsporos(tiro) {
    const x = Math.round(tiro.x);
    const y = Math.round(tiro.y);

    ctx.fillStyle = "#38243f";
    ctx.fillRect(x - 6, y - 6, 12, 12);
    ctx.fillStyle = tiro.corEsporos || "#d98aba";
    ctx.fillRect(x - 4, y - 7, 8, 14);
    ctx.fillRect(x - 7, y - 4, 14, 8);
    ctx.fillStyle = "#fff0b0";
    ctx.fillRect(x - 2, y - 2, 4, 4);
}

function desenharCargaDeRaios(tiro) {
    const x = Math.round(tiro.x);
    const y = Math.round(tiro.y);
    ctx.fillStyle = "#204f75";
    ctx.fillRect(x - 6, y - 6, 12, 12);
    ctx.fillStyle = "#70e7ff";
    ctx.fillRect(x - 3, y - 8, 6, 16);
    ctx.fillRect(x - 8, y - 3, 16, 6);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x - 2, y - 2, 4, 4);
}

function desenharLaserDoObliterador(tiro) {
    const x = Math.round(tiro.x);
    const y = Math.round(tiro.y);
    ctx.save();
    ctx.shadowColor = "#ff3f36";
    ctx.shadowBlur = 11;
    ctx.fillStyle = "#ff3f36";
    ctx.fillRect(x - 8, y - 3, 16, 6);
    ctx.fillStyle = "#ffe5b8";
    ctx.fillRect(x - 5, y - 1, 10, 2);
    ctx.restore();
}

function desenharBolaDeCanhao(tiro) {
    const visual = CONFIG.torre.tipos.canhaoPesado.visualDoProjetil;
    const x = Math.round(tiro.x);
    const y = Math.round(tiro.y);
    const unidade = Math.max(2, Math.round(visual.tamanho / 6));
    const metade = Math.round(visual.tamanho / 2);

    ctx.fillStyle = visual.corPrincipal;
    ctx.fillRect(x - metade + unidade, y - metade, visual.tamanho - unidade * 2, visual.tamanho);
    ctx.fillRect(x - metade, y - metade + unidade, visual.tamanho, visual.tamanho - unidade * 2);

    ctx.fillStyle = visual.corSombra;
    ctx.fillRect(x + metade - unidade, y - metade + unidade * 2, unidade, visual.tamanho - unidade * 4);
    ctx.fillRect(x - metade + unidade * 2, y + metade - unidade, visual.tamanho - unidade * 4, unidade);

    ctx.fillStyle = visual.corBrilho;
    ctx.fillRect(x - metade + unidade * 2, y - metade + unidade, unidade, unidade * 3);
    ctx.fillRect(x - metade + unidade, y - metade + unidade * 2, unidade * 3, unidade);
}

function desenharBolaDeFogo(tiro) {
    const x = Math.round(tiro.x);
    const y = Math.round(tiro.y);
    const oscilacao = Math.floor(Date.now() / 90) % 2;

    ctx.save();
    ctx.shadowColor = "#ff5a24";
    ctx.shadowBlur = 13;
    ctx.fillStyle = "#e83b1f";
    ctx.fillRect(x - 7, y - 5, 14, 10);
    ctx.fillRect(x - 4, y - 8, 8, 16);
    ctx.fillStyle = "#ff8a27";
    ctx.fillRect(x - 4 + oscilacao, y - 5, 9, 10);
    ctx.fillStyle = "#fff078";
    ctx.fillRect(x - 1, y - 3, 5, 6);
    ctx.restore();
}

function desenharTiros() {
    for (const tiro of tiros) {
        if (tiro.tipoDaTorre === "canhaoPesado") {
            desenharBolaDeCanhao(tiro);
            continue;
        }

        if (tiro.tipoDaTorre === "torreGlacial") {
            desenharEstilhacoGlacial(tiro);
            continue;
        }

        if (tiro.tipoDaTorre === "torreBesta") {
            desenharViroteDaBesta(tiro);
            continue;
        }

        if (tiro.tipoDaTorre === "torreEsporos") {
            desenharOrbeDeEsporos(tiro);
            continue;
        }

        if (tiro.tipoDaTorre === "torreDeRaios") {
            desenharCargaDeRaios(tiro);
            continue;
        }

        if (tiro.tipoDaTorre === "lancaChamas") {
            desenharBolaDeFogo(tiro);
            continue;
        }

        if (tiro.tipoDaTorre === "obliterador") {
            desenharLaserDoObliterador(tiro);
            continue;
        }

        ctx.save();
        ctx.shadowColor = "#ffe66d";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#fff4a3";
        ctx.beginPath();
        ctx.arc(tiro.x, tiro.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    for (const tiro of tirosDosInimigos) {
        const x = Math.round(tiro.x);
        const y = Math.round(tiro.y);
        if (tiro.tipoDoInimigo === "macacoSaqueador") {
            ctx.fillStyle = "#f4c542";
            ctx.fillRect(x - 5, y - 4, 9, 5);
            ctx.fillRect(x, y, 6, 4);
            ctx.fillStyle = "#6a4522";
            ctx.fillRect(x + 4, y - 4, 3, 3);
        } else if (tiro.tipoDoInimigo === "corujaSombria") {
            ctx.fillStyle = "#b894d6";
            ctx.fillRect(x - 6, y - 2, 12, 5);
            ctx.fillRect(x - 2, y - 6, 5, 12);
            ctx.fillStyle = "#fff17a";
            ctx.fillRect(x - 1, y - 1, 3, 3);
        } else {
            ctx.fillStyle = "#ff5f55";
            ctx.fillRect(x - 4, y - 4, 8, 8);
            ctx.fillStyle = "#ffd36d";
            ctx.fillRect(x - 2, y - 2, 4, 4);
        }
    }
}

function desenharIluminacaoDoMapa() {
    if (!modoNoturno) {
        return;
    }

    ctx.fillStyle = "rgba(8, 18, 45, 0.48)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function desenharEfeitoDoPulsoTemporal(agora = Date.now()) {
    if (!pulsoTemporalEstaAtivo(agora)) {
        return;
    }

    const deslocamento = Math.floor(agora / 90) % 36;
    ctx.save();
    ctx.fillStyle = "rgba(62, 32, 92, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(213, 138, 255, 0.28)";
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
    ctx.fillStyle = "rgba(105, 230, 236, 0.12)";
    for (let y = -deslocamento; y < canvas.height; y += 36) {
        ctx.fillRect(0, y, canvas.width, 3);
    }
    ctx.textAlign = "center";
    ctx.font = "900 26px 'Courier New', monospace";
    ctx.fillStyle = "rgba(255, 231, 153, 0.82)";
    ctx.fillText("⌛", canvas.width / 2, 38);
    ctx.restore();
}

function desenharAvisoBoss() {
    if (Date.now() >= avisoBossExpiraEm) {
        return;
    }

    ctx.save();
    ctx.textAlign = "center";
    const tipoDoBoss = obterTipoDeBossDaFase();
    const aparenciaDoAviso = tipoDoBoss === "bossGlitch"
        ? {
            fundo: "rgba(18, 8, 31, 0.96)",
            borda: "rgba(69, 241, 214, 0.84)",
            destaque: "#eb4dff",
            titulo: localizar("ERRO")
        }
        : tipoDoBoss === "protocoloZero"
        ? {
            fundo: "rgba(7, 16, 29, 0.96)",
            borda: "rgba(83, 245, 255, 0.88)",
            destaque: "#ec57df",
            titulo: localizar("PROTOCOLO ZERO")
        }
        : tipoDoBoss === "bossPrimordial"
        ? {
            fundo: "rgba(31, 48, 29, 0.96)",
            borda: "rgba(226, 184, 95, 0.86)",
            destaque: "#ffd66b",
            titulo: localizar("TIRANO")
        }
        : tipoDoBoss === "bossPantano"
        ? {
            fundo: "rgba(20, 42, 29, 0.96)",
            borda: "rgba(183, 240, 95, 0.82)",
            destaque: "#d7ef72",
            titulo: localizar("HIDRA")
        }
        : tipoDoBoss === "bossVulcanico"
        ? {
            fundo: "rgba(37, 18, 23, 0.96)",
            borda: "rgba(255, 113, 63, 0.82)",
            destaque: "#ff9c55",
            titulo: localizar("OBSIDIANO")
        }
        : tipoDoBoss === "bossTemperado"
        ? {
            fundo: "rgba(57, 38, 27, 0.95)",
            borda: "rgba(224, 164, 79, 0.78)",
            destaque: "#f0bd55",
            titulo: localizar("URSO")
        }
        : tipoDoBoss === "bossSelva"
        ? {
            fundo: "rgba(22, 53, 28, 0.95)",
            borda: "rgba(155, 192, 93, 0.75)",
            destaque: "#b9dc78",
            titulo: localizar("COLOSSO")
        }
        : tipoDoBoss === "bossDeserto"
        ? {
            fundo: "rgba(73, 45, 15, 0.94)",
            borda: "rgba(255, 211, 109, 0.7)",
            destaque: "#ffd36d",
            titulo: localizar("FARAÓ")
        }
        : tipoDoBoss === "bossArtico"
            ? {
                fundo: "rgba(13, 43, 62, 0.94)",
                borda: "rgba(173, 240, 255, 0.75)",
                destaque: "#a9efff",
                titulo: localizar("TITÃ")
            }
            : {
                fundo: "rgba(39, 7, 19, 0.9)",
                borda: "rgba(255, 87, 112, 0.55)",
                destaque: "#ff9cab",
                titulo: localizar("BOSS")
            };
    ctx.fillStyle = aparenciaDoAviso.fundo;
    desenharRetanguloArredondado(canvas.width / 2 - 190, canvas.height / 2 - 72, 380, 144, 22);
    ctx.fill();
    ctx.strokeStyle = aparenciaDoAviso.borda;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = aparenciaDoAviso.destaque;
    ctx.font = "800 12px system-ui, sans-serif";
    ctx.fillText(localizar("ALGO ESTÁ VINDO..."), canvas.width / 2, canvas.height / 2 - 32);
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 58px system-ui, sans-serif";
    ctx.fillText(aparenciaDoAviso.titulo, canvas.width / 2, canvas.height / 2 + 34);
    ctx.restore();
}

// Loop principal
function atualizar(instanteDoQuadro) {
    if (!jogoIniciado) {
        return;
    }

    if (jogoPausado) {
        requestAnimationFrame(atualizar);
        return;
    }

    if (partidaEncerrada) {
        desenharMapa();
        desenharMinasTerrestres();
        desenharBombasPesadas();
        desenharTorres();
        desenharAvisosDeCreditosGerados();
        desenharInimigos();
        desenharExplosoesDosExplosivos();
        desenharEfeitoDoPulsoTemporal();
        desenharIluminacaoDoMapa();
        atualizarPulsoTemporalNoPosto();

        requestAnimationFrame(atualizar);
        return;
    }

    const multiplicadorDeMovimento = calcularMultiplicadorDeMovimento(instanteDoQuadro);
    atualizarFliperamaNoMapa();
    atualizarEstadoDoBoostFliperama();
    atualizarWaves();
    atualizarMinasTerrestres();
    atualizarBombasPesadas();
    atualizarExplosoesDosExplosivos(multiplicadorDeMovimento);
    atualizarAvisosDeCreditosGerados(multiplicadorDeMovimento);
    moverInimigos(multiplicadorDeMovimento);
    atualizarTorresSismicas();
    atacarComTorres();
    atacarTorresComInimigos();
    moverTiros(multiplicadorDeMovimento);
    moverTirosDosInimigos(multiplicadorDeMovimento);
    desenharMapa();
    desenharFliperamaNoMapa();
    desenharMinasTerrestres();
    desenharBombasPesadas();
    desenharTorres();
    desenharAvisosDeCreditosGerados();
    desenharInimigos();
    desenharTiros();
    desenharExplosoesDosExplosivos();
    desenharEfeitoDoPulsoTemporal();
    desenharIluminacaoDoMapa();
    desenharInterface();
    atualizarBoostFliperamaNoPosto();
    atualizarPulsoTemporalNoPosto();
    desenharInformacoesDoInimigoSobCursor();
    desenharAvisoBoss();
    requestAnimationFrame(atualizar);
}
