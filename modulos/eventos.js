// Eventos de teste: todos ficam acessíveis ao mesmo tempo até a revisão do jogador.
const EVENTOS_DISPONIVEIS = Object.freeze([
    { id: 'caixaSurpresa', nome: 'Caixa Surpresa', descricao: 'Abra presentes, enfrente emboscadas e derrote o Rei dos Presentes na wave 16.', skin: 'sentinelaDourada' },
    { id: 'roleta', nome: 'Sorte na Roleta', descricao: 'Gire a roleta, enfrente cobradores e derrote o Dono da Banca na wave 16.', skin: 'guardiaoSolar' },
    { id: 'idadeDaPedra', nome: 'Idade da Pedra', descricao: 'Defenda a aldeia com torres simples contra caçadores, mamutes e o Líder da Tribo.', skin: null, torre: 'catapulta' },
    { id: 'superBosses', nome: 'Superboss: Soberano Infernal', descricao: 'Vença os subordinados. O Soberano Infernal queima suas torres.', skin: 'sentinelaCosmica' },
    { id: 'superBossesMecanicos', nome: 'Superboss: Titã da Forja', descricao: 'O Titã da Forja paralisa suas torres com um pulso.', skin: null, torre: 'torreMagnetica' },
    { id: 'superBossesAbissais', nome: 'Superboss: Leviatã Abissal', descricao: 'A maré do Leviatã Abissal reduz o alcance das torres.', skin: 'coralAbissal' },
    { id: 'superBossesAcidos', nome: 'Superboss: Víbora Ácida', descricao: 'O cuspe ácido corrói torres; destrua a carcaça deixada no caminho.', skin: 'corrosaoViva' },
    { id: 'superBossesMetamorfos', nome: 'Superboss: Metamorfo', descricao: 'Ele copia habilidades dos inimigos e pode surgir blindado a cada transformação.', skin: null, torre: 'torreMetamorfa' },
    { id: 'meteoros', nome: 'Chuva de Meteoros', descricao: 'Sobreviva por três minutos a chuvas direcionadas e ao Arauto do Cometa.', skin: null }
]);
const TEXTOS_DOS_EVENTOS = Object.freeze({
    en: {
        'Eventos': 'Events', 'Nove desafios para testar': 'Nine challenges to test',
        'Idade da Pedra': 'Stone Age',
        'Defenda a aldeia com torres simples contra caçadores, mamutes e o Líder da Tribo.': 'Defend the village with simple towers against hunters, mammoths, and the Tribal Leader.',
        'Torres disponíveis: Padrão, Besta e Canhão pesado.': 'Available towers: Standard, Crossbow, and Heavy Cannon.',
        'Torres disponíveis: Padrão, Besta, Canhão pesado e Catapulta.': 'Available towers: Standard, Crossbow, Heavy Cannon, and Catapult.',
        'Catapulta': 'Catapult',
        'Torre Magnética': 'Magnet Tower', 'Torre Metamorfa': 'Shapeshifter Tower',
        'Coral Abissal': 'Abyssal Coral', 'Corrosão Viva': 'Living Corrosion',
        'Dano da torre: Fácil +5%, Médio +10%, Difícil +15% (maior vitória).': 'Tower damage: Easy +5%, Medium +10%, Hard +15% (highest win).',
        'Visual da skin evolui com a maior dificuldade vencida.': 'The skin changes with your highest cleared difficulty.',
        ' Bônus de dano da torre: +{percentual}%.': ' Tower damage bonus: +{percentual}%.',
        'Caçador da Tribo': 'Tribal Hunter', 'Mamute Lanoso': 'Woolly Mammoth', 'Líder da Tribo': 'Tribal Leader',
        'Dificuldade': 'Difficulty', 'Fácil': 'Easy', 'Médio': 'Medium', 'Difícil': 'Hard',
        'No Médio e no Difícil, o chefe ganha um segundo ataque.': 'On Medium and Hard, the boss gains a second attack.',
        'No Médio e no Difícil, o Metamorfo se adapta às suas defesas.': 'On Medium and Hard, the Shapeshifter adapts to your defenses.',
        'Economia: renda de combate limitada por wave.': 'Economy: combat income is capped each wave.',
        'Renda por tiros: {limite} créditos na wave 1; +{aumento} por wave.': 'Shot income: {limite} credits in wave 1; +{aumento} per wave.',
        'Renda {atual}/{limite}': 'Income {atual}/{limite}',
        'Eventos normais': 'Regular events', 'Superbosses': 'Superbosses',
        'Super-Bosses': 'Super Bosses',
        'Os chefes finais dos eventos aparecem após serem derrotados.': 'Event final bosses appear after you defeat them.',
        'Derrote um Super-Boss na wave 20 para revelar sua figurinha.': 'Defeat a Super Boss in wave 20 to reveal its sticker.',
        'Enfrente subordinados e sobreviva até a wave 20.': 'Face the lieutenants and survive until wave 20.',
        'Daqui a {rodadas} rodadas, {nome} está vindo!': '{nome} arrives in {rodadas} waves!',
        'Daqui a 1 rodada, {nome} está vindo!': '{nome} arrives in 1 wave!',
        '{nome} chegou!': '{nome} has arrived!',
        'O fogo de {nome} está queimando suas torres!': '{nome} is burning your towers!',
        'O Soberano despertou a Fúria das Cinzas!': 'The Sovereign unleashed Ash Fury!',
        'O Titã construiu uma torreta!': 'The Titan built a turret!',
        'Torreta da Forja': 'Forge Turret',
        'O Leviatã chamou enguias abissais!': 'The Leviathan summoned abyssal eels!',
        'A Víbora cuspiu ácido!': 'The Viper spat acid!',
        'A Víbora deixou uma carcaça no caminho!': 'The Viper left a shed skin on the path!',
        'O ácido derreteu uma torre!': 'The acid melted a tower!',
        'O Metamorfo assumiu a forma {forma}!': 'The Shapeshifter took the {forma} form!',
        'O Metamorfo ganhou uma carapaça blindada!': 'The Shapeshifter gained armored plating!',
        'Resiste a {torre}': 'Resists {torre}',
        'Troca de forma a cada {segundos} s: Ciano, Sabotador, Titã Glacial ou Curador. Pode receber armadura.': 'Changes form every {segundos} s: Cyan, Saboteur, Frost Titan or Curator. May gain armor.',
        'Adaptação: resiste à defesa que mais o feriu na forma anterior.': 'Adaptation: resists the defense that hurt it most in its previous form.',
        'O pulso de {nome} paralisou suas torres!': '{nome} disabled your towers with an EMP!',
        'A maré de {nome} reduziu o alcance das torres!': '{nome} reduced your towers’ range with a tidal wave!',
        'Todos disponíveis durante os testes. A frequência futura ainda será escolhida.': 'All available during testing. The future schedule is still undecided.',
        'Caixa Surpresa': 'Surprise Boxes', 'Sorte na Roleta': 'Wheel of Luck',
        'Superboss: Soberano Infernal': 'Superboss: Infernal Sovereign', 'Superboss: Titã da Forja': 'Superboss: Forge Titan', 'Superboss: Leviatã Abissal': 'Superboss: Abyssal Leviathan', 'Superboss: Víbora Ácida': 'Superboss: Acid Viper', 'Chuva de Meteoros': 'Meteor Shower',
        'Superboss: Metamorfo': 'Superboss: Shapeshifter',
        'Ele copia habilidades dos inimigos e pode surgir blindado a cada transformação.': 'It copies enemy abilities and may gain armor with each transformation.',
        'Metamorfo': 'Shapeshifter', 'Titã Glacial': 'Frost Titan', 'Curador do Vazio': 'Void Curator',
        'Ciano rápido': 'Fast Cyan', 'Sabotador': 'Saboteur',
        'Clique nas caixas que caem e escolha onde colocar cada torre. Não é possível comprar defesas.': 'Click fallen boxes and choose where to place each tower. You cannot buy defenses.',
        'Gaste créditos para girar e escolha onde colocar as defesas recebidas.': 'Spend credits to spin and choose where to place the defenses you receive.',
        'Abra presentes, enfrente emboscadas e derrote o Rei dos Presentes na wave 16.': 'Open gifts, survive ambushes, and defeat the Gift King on wave 16.',
        'Gire a roleta, enfrente cobradores e derrote o Dono da Banca na wave 16.': 'Spin the wheel, face collectors, and defeat the House Boss on wave 16.',
        'Sobreviva por três minutos a chuvas direcionadas e ao Arauto do Cometa.': 'Survive targeted showers and the Comet Herald for three minutes.',
        'Vença os subordinados. O Soberano Infernal queima suas torres.': 'Defeat the lieutenants. The Infernal Sovereign burns your towers.',
        'O Titã da Forja paralisa suas torres com um pulso.': 'The Forge Titan disables your towers with an EMP.',
        'A maré do Leviatã Abissal reduz o alcance das torres.': 'The Abyssal Leviathan’s tide reduces tower range.',
        'O cuspe ácido corrói torres; destrua a carcaça deixada no caminho.': 'Acid spit corrodes towers; destroy the shed skin left on the path.',
        'Imp de Brasa': 'Ember Imp', 'Cavaleiro Infernal': 'Infernal Knight',
        'Duque das Brasas': 'Duke of Embers', 'Cérbero de Lava': 'Lava Cerberus',
        'Rainha das Cinzas': 'Ash Queen', 'Soberano Infernal': 'Infernal Sovereign',
        'Drone de Sucata': 'Scrap Drone', 'Autômato Blindado': 'Armored Automaton',
        'Perfurador de Aço': 'Steel Driller', 'Fornalha Andante': 'Walking Furnace',
        'Aranha Mecânica': 'Mechanical Spider', 'Titã da Forja': 'Forge Titan',
        'Enguia Abissal': 'Abyssal Eel', 'Guardião de Coral Negro': 'Black Coral Guardian',
        'Sirena Sombria': 'Dark Siren', 'Caranguejo Colossal': 'Colossal Crab',
        'Polvo do Abismo': 'Abyssal Octopus', 'Leviatã Abissal': 'Abyssal Leviathan',
        'Gota Corrosiva': 'Corrosive Droplet', 'Ofídio Tóxico': 'Toxic Serpent',
        'Fragmento Instável': 'Unstable Fragment', 'Sentinela Mutante': 'Mutant Sentinel',
        'Eco Prismático': 'Prismatic Echo', 'Guardião do Casulo': 'Cocoon Guardian',
        'Quimera da Ruptura': 'Rift Chimera',
        'Serpente do Esgoto': 'Sewer Serpent', 'Basilisco Cáustico': 'Caustic Basilisk',
        'Hidra Ácida': 'Acid Hydra', 'Víbora Ácida': 'Acid Viper',
        'Carcaça da Víbora': 'Viper Shed Skin',
        'Sobreviva ao cronômetro. Meteoros deixam crateras que bloqueiam construções por alguns segundos.': 'Survive until the timer ends. Meteors leave craters that briefly block construction.',
        'Sobreviva: {tempo}': 'Survive: {tempo}',
        'A cratera ainda impede construções.': 'The crater still blocks construction.',
        'Dois meteoros a caminho!': 'Two meteors incoming!',
        'Meteoro mirando uma torre!': 'Meteor targeting a tower!',
        'A caixa escondia um Mímico!': 'The box hid a Mimic!',
        'A banca enviou um Cobrador!': 'The house sent a Collector!',
        'O Rei dos Presentes chamou um Mímico!': 'The Gift King summoned a Mimic!',
        'O Dono da Banca recuperou seus aliados!': 'The House Boss healed his allies!',
        'O Arauto do Cometa marcou uma torre!': 'The Comet Herald targeted a tower!',
        'Evacuar torre selecionada': 'Evacuate selected tower',
        'Evacuar torre ({segundos}s)': 'Evacuate tower ({segundos}s)',
        'Sem posição segura para evacuar a torre.': 'No safe place to evacuate the tower.',
        'Torre evacuada!': 'Tower evacuated!',
        'Trocar por {nome}': 'Swap for {nome}',
        'Defesa trocada. Escolha onde colocá-la.': 'Defense swapped. Choose where to place it.',
        'Trocar prêmio por {creditos} créditos': 'Trade prize for {creditos} credits',
        'Prêmio trocado por {creditos} créditos.': 'Prize traded for {creditos} credits.',
        'Jogar evento': 'Play event', 'Primeira vitória': 'First victory',
        'Ah, não! Você destruiu todos os nossos ancestrais... O que vai acontecer com a gente?': 'Oh no! You destroyed all our ancestors... What will happen to us?',
        'Vitórias: {quantidade}': 'Victories: {quantidade}',
        'Vitórias posteriores': 'Later victories', 'Skin já obtida': 'Skin already owned',
        'Girar roleta': 'Spin wheel', 'Girar por {custo} créditos': 'Spin for {custo} credits',
        'Voltar à partida': 'Return to battle', 'Tente novamente': 'Try again',
        'Fragmentos de Pixel': 'Pixel Fragments', 'Guardião Solar': 'Solar Guardian',
        'Sentinela Cósmica': 'Cosmic Sentinel', 'Sentinela Dourada': 'Golden Sentinel',
        'Torre padrão': 'Basic Tower', 'Torre Besta': 'Crossbow Tower',
        'Canhão Pesado': 'Heavy Cannon', 'Mina': 'Mine', 'Nada': 'Nothing',
        'Roleta': 'Wheel', 'Nada desta vez': 'Nothing this time',
        'Créditos +{quantidade}': 'Credits +{quantidade}',
        'Torre recebida: {nome}': 'Tower received: {nome}',
        'Mina recebida': 'Mine received', 'Sem espaço para a defesa': 'No room for the defense',
        'Créditos insuficientes para girar.': 'Not enough credits to spin.',
        'Neste evento, as defesas chegam pela sorte.': 'In this event, defenses arrive by chance.',
        'Uma caixa trouxe {nome}!': 'A box brought {nome}!',
        'Uma caixa trouxe {nome}! Clique para posicionar.': 'A box brought {nome}! Click to place it.',
        'Escolha um lugar livre para a defesa.': 'Choose a free spot for the defense.',
        'Defesa posicionada.': 'Defense placed.',
        'Posicione a defesa recebida antes de girar novamente.': 'Place the defense you received before spinning again.',
        'Mina recebida. Feche a roleta e escolha onde colocar.': 'Mine received. Close the wheel and choose where to place it.',
        'Torre recebida: {nome}. Feche a roleta e escolha onde colocar.': 'Tower received: {nome}. Close the wheel and choose where to place it.',
        'Um super-boss atacou suas torres!': 'A super boss attacked your towers!',
        'Meteoro a caminho!': 'Meteor incoming!',
        'Evento concluído! +{fragmentos} Fragmentos de Pixel.': 'Event cleared! +{fragmentos} Pixel Fragments.',
        ' Skin desbloqueada: {nome}.': ' Skin unlocked: {nome}.',
        ' Torre desbloqueada: {nome}.': ' Tower unlocked: {nome}.',
        ' Não foi possível salvar o prêmio; tente vencer novamente.': ' The reward could not be saved; please win again.'
    },
    es: {
        'Eventos': 'Eventos', 'Nove desafios para testar': 'Nueve desafíos para probar',
        'Idade da Pedra': 'Edad de Piedra',
        'Defenda a aldeia com torres simples contra caçadores, mamutes e o Líder da Tribo.': 'Defiende la aldea con torres sencillas contra cazadores, mamuts y el Líder de la Tribu.',
        'Torres disponíveis: Padrão, Besta e Canhão pesado.': 'Torres disponibles: Estándar, Ballesta y Cañón pesado.',
        'Torres disponíveis: Padrão, Besta, Canhão pesado e Catapulta.': 'Torres disponibles: Estándar, Ballesta, Cañón pesado y Catapulta.',
        'Catapulta': 'Catapulta',
        'Torre Magnética': 'Torre Magnética', 'Torre Metamorfa': 'Torre Metamorfa',
        'Coral Abissal': 'Coral Abisal', 'Corrosão Viva': 'Corrosión Viva',
        'Dano da torre: Fácil +5%, Médio +10%, Difícil +15% (maior vitória).': 'Daño de la torre: Fácil +5%, Medio +10%, Difícil +15% (mayor victoria).',
        'Visual da skin evolui com a maior dificuldade vencida.': 'La apariencia de la skin mejora con la mayor dificultad superada.',
        ' Bônus de dano da torre: +{percentual}%.': ' Bono de daño de la torre: +{percentual}%.',
        'Caçador da Tribo': 'Cazador de la Tribu', 'Mamute Lanoso': 'Mamut Lanudo', 'Líder da Tribo': 'Líder de la Tribu',
        'Dificuldade': 'Dificultad', 'Fácil': 'Fácil', 'Médio': 'Medio', 'Difícil': 'Difícil',
        'No Médio e no Difícil, o chefe ganha um segundo ataque.': 'En Medio y Difícil, el jefe obtiene un segundo ataque.',
        'No Médio e no Difícil, o Metamorfo se adapta às suas defesas.': 'En Medio y Difícil, el Metamorfo se adapta a tus defensas.',
        'Economia: renda de combate limitada por wave.': 'Economía: ingresos de combate limitados por oleada.',
        'Renda por tiros: {limite} créditos na wave 1; +{aumento} por wave.': 'Ingresos por disparos: {limite} créditos en la oleada 1; +{aumento} por oleada.',
        'Renda {atual}/{limite}': 'Ingresos {atual}/{limite}',
        'Eventos normais': 'Eventos normales', 'Superbosses': 'Superjefes',
        'Super-Bosses': 'Superjefes',
        'Os chefes finais dos eventos aparecem após serem derrotados.': 'Los jefes finales de los eventos aparecen después de derrotarlos.',
        'Derrote um Super-Boss na wave 20 para revelar sua figurinha.': 'Derrota a un Superjefe en la oleada 20 para revelar su figurita.',
        'Enfrente subordinados e sobreviva até a wave 20.': 'Enfrenta a los subordinados y sobrevive hasta la oleada 20.',
        'Daqui a {rodadas} rodadas, {nome} está vindo!': '¡{nome} llegará en {rodadas} oleadas!',
        'Daqui a 1 rodada, {nome} está vindo!': '¡{nome} llegará en 1 oleada!',
        '{nome} chegou!': '¡Ha llegado {nome}!',
        'O fogo de {nome} está queimando suas torres!': '¡El fuego de {nome} está quemando tus torres!',
        'O Soberano despertou a Fúria das Cinzas!': '¡El Soberano desató la Furia de Cenizas!',
        'O Titã construiu uma torreta!': '¡El Titán construyó una torreta!',
        'Torreta da Forja': 'Torreta de la Forja',
        'O Leviatã chamou enguias abissais!': '¡El Leviatán invocó anguilas abisales!',
        'A Víbora cuspiu ácido!': '¡La Víbora escupió ácido!',
        'A Víbora deixou uma carcaça no caminho!': '¡La Víbora dejó su piel mudada en el camino!',
        'O ácido derreteu uma torre!': '¡El ácido derritió una torre!',
        'O Metamorfo assumiu a forma {forma}!': '¡El Metamorfo tomó la forma {forma}!',
        'O Metamorfo ganhou uma carapaça blindada!': '¡El Metamorfo obtuvo una coraza blindada!',
        'Resiste a {torre}': 'Resiste a {torre}',
        'Troca de forma a cada {segundos} s: Ciano, Sabotador, Titã Glacial ou Curador. Pode receber armadura.': 'Cambia de forma cada {segundos} s: Cian, Saboteador, Titán Glacial o Curador. Puede ganar armadura.',
        'Adaptação: resiste à defesa que mais o feriu na forma anterior.': 'Adaptación: resiste la defensa que más lo dañó en su forma anterior.',
        'O pulso de {nome} paralisou suas torres!': '¡El pulso de {nome} paralizó tus torres!',
        'A maré de {nome} reduziu o alcance das torres!': '¡La marea de {nome} redujo el alcance de tus torres!',
        'Todos disponíveis durante os testes. A frequência futura ainda será escolhida.': 'Todos disponibles durante las pruebas. La frecuencia futura aún está por decidir.',
        'Caixa Surpresa': 'Cajas Sorpresa', 'Sorte na Roleta': 'Suerte en la Ruleta',
        'Superboss: Soberano Infernal': 'Superjefe: Soberano Infernal', 'Superboss: Titã da Forja': 'Superjefe: Titán de la Forja', 'Superboss: Leviatã Abissal': 'Superjefe: Leviatán Abisal', 'Superboss: Víbora Ácida': 'Superjefe: Víbora Ácida', 'Chuva de Meteoros': 'Lluvia de Meteoritos',
        'Superboss: Metamorfo': 'Superjefe: Metamorfo',
        'Ele copia habilidades dos inimigos e pode surgir blindado a cada transformação.': 'Copia habilidades de los enemigos y puede obtener armadura en cada transformación.',
        'Metamorfo': 'Metamorfo', 'Titã Glacial': 'Titán Glacial', 'Curador do Vazio': 'Curador del Vacío',
        'Ciano rápido': 'Cian rápido', 'Sabotador': 'Saboteador',
        'Clique nas caixas que caem e escolha onde colocar cada torre. Não é possível comprar defesas.': 'Haz clic en las cajas caídas y elige dónde colocar cada torre. No puedes comprar defensas.',
        'Gaste créditos para girar e escolha onde colocar as defesas recebidas.': 'Gasta créditos para girar y elige dónde colocar las defensas recibidas.',
        'Abra presentes, enfrente emboscadas e derrote o Rei dos Presentes na wave 16.': 'Abre regalos, resiste emboscadas y derrota al Rey de los Regalos en la oleada 16.',
        'Gire a roleta, enfrente cobradores e derrote o Dono da Banca na wave 16.': 'Gira la ruleta, enfrenta cobradores y derrota al Dueño de la Banca en la oleada 16.',
        'Sobreviva por três minutos a chuvas direcionadas e ao Arauto do Cometa.': 'Sobrevive tres minutos a lluvias dirigidas y al Heraldo del Cometa.',
        'Vença os subordinados. O Soberano Infernal queima suas torres.': 'Derrota a los subordinados. El Soberano Infernal quema tus torres.',
        'O Titã da Forja paralisa suas torres com um pulso.': 'El Titán de la Forja paraliza tus torres con un pulso.',
        'A maré do Leviatã Abissal reduz o alcance das torres.': 'La marea del Leviatán Abisal reduce el alcance de las torres.',
        'O cuspe ácido corrói torres; destrua a carcaça deixada no caminho.': 'El escupitajo ácido corroe las torres; destruye la piel mudada que queda en el camino.',
        'Imp de Brasa': 'Diablillo de Brasa', 'Cavaleiro Infernal': 'Caballero Infernal',
        'Duque das Brasas': 'Duque de las Brasas', 'Cérbero de Lava': 'Cancerbero de Lava',
        'Rainha das Cinzas': 'Reina de las Cenizas', 'Soberano Infernal': 'Soberano Infernal',
        'Drone de Sucata': 'Dron de Chatarra', 'Autômato Blindado': 'Autómata Blindado',
        'Perfurador de Aço': 'Perforador de Acero', 'Fornalha Andante': 'Horno Andante',
        'Aranha Mecânica': 'Araña Mecánica', 'Titã da Forja': 'Titán de la Forja',
        'Enguia Abissal': 'Anguila Abisal', 'Guardião de Coral Negro': 'Guardián de Coral Negro',
        'Sirena Sombria': 'Sirena Sombría', 'Caranguejo Colossal': 'Cangrejo Colosal',
        'Polvo do Abismo': 'Pulpo del Abismo', 'Leviatã Abissal': 'Leviatán Abisal',
        'Gota Corrosiva': 'Gota Corrosiva', 'Ofídio Tóxico': 'Ofidio Tóxico',
        'Fragmento Instável': 'Fragmento Inestable', 'Sentinela Mutante': 'Centinela Mutante',
        'Eco Prismático': 'Eco Prismático', 'Guardião do Casulo': 'Guardián del Capullo',
        'Quimera da Ruptura': 'Quimera de la Ruptura',
        'Serpente do Esgoto': 'Serpiente del Alcantarillado', 'Basilisco Cáustico': 'Basilisco Cáustico',
        'Hidra Ácida': 'Hidra Ácida', 'Víbora Ácida': 'Víbora Ácida',
        'Carcaça da Víbora': 'Piel Mudada de la Víbora',
        'Sobreviva ao cronômetro. Meteoros deixam crateras que bloqueiam construções por alguns segundos.': 'Sobrevive hasta que termine el tiempo. Los meteoritos dejan cráteres que impiden construir durante unos segundos.',
        'Sobreviva: {tempo}': 'Sobrevive: {tempo}',
        'A cratera ainda impede construções.': 'El cráter todavía impide construir.',
        'Dois meteoros a caminho!': '¡Se acercan dos meteoritos!',
        'Meteoro mirando uma torre!': '¡Un meteorito apunta a una torre!',
        'A caixa escondia um Mímico!': '¡La caja escondía un Mímico!',
        'A banca enviou um Cobrador!': '¡La banca envió un Cobrador!',
        'O Rei dos Presentes chamou um Mímico!': '¡El Rey de los Regalos invocó un Mímico!',
        'O Dono da Banca recuperou seus aliados!': '¡El Dueño de la Banca curó a sus aliados!',
        'O Arauto do Cometa marcou uma torre!': '¡El Heraldo del Cometa marcó una torre!',
        'Evacuar torre selecionada': 'Evacuar la torre seleccionada',
        'Evacuar torre ({segundos}s)': 'Evacuar torre ({segundos}s)',
        'Sem posição segura para evacuar a torre.': 'No hay un lugar seguro para evacuar la torre.',
        'Torre evacuada!': '¡Torre evacuada!',
        'Trocar por {nome}': 'Cambiar por {nome}',
        'Defesa trocada. Escolha onde colocá-la.': 'Defensa cambiada. Elige dónde colocarla.',
        'Trocar prêmio por {creditos} créditos': 'Cambiar premio por {creditos} créditos',
        'Prêmio trocado por {creditos} créditos.': 'Premio cambiado por {creditos} créditos.',
        'Jogar evento': 'Jugar evento', 'Primeira vitória': 'Primera victoria',
        'Ah, não! Você destruiu todos os nossos ancestrais... O que vai acontecer com a gente?': '¡Ay, no! Destruiste a todos nuestros antepasados... ¿Qué va a pasar con nosotros?',
        'Vitórias: {quantidade}': 'Victorias: {quantidade}',
        'Vitórias posteriores': 'Victorias posteriores', 'Skin já obtida': 'Skin ya obtenida',
        'Girar roleta': 'Girar ruleta', 'Girar por {custo} créditos': 'Girar por {custo} créditos',
        'Voltar à partida': 'Volver a la partida', 'Tente novamente': 'Inténtalo de nuevo',
        'Fragmentos de Pixel': 'Fragmentos de Píxel', 'Guardião Solar': 'Guardián Solar',
        'Sentinela Cósmica': 'Centinela Cósmica', 'Sentinela Dourada': 'Centinela Dorada',
        'Torre padrão': 'Torre básica', 'Torre Besta': 'Torre Ballesta',
        'Canhão Pesado': 'Cañón Pesado', 'Mina': 'Mina', 'Nada': 'Nada',
        'Roleta': 'Ruleta', 'Nada desta vez': 'Nada esta vez',
        'Créditos +{quantidade}': 'Créditos +{quantidade}',
        'Torre recebida: {nome}': 'Torre recibida: {nome}',
        'Mina recebida': 'Mina recibida', 'Sem espaço para a defesa': 'No hay espacio para la defensa',
        'Créditos insuficientes para girar.': 'Créditos insuficientes para girar.',
        'Neste evento, as defesas chegam pela sorte.': 'En este evento, las defensas llegan por suerte.',
        'Uma caixa trouxe {nome}!': '¡Una caja trajo {nome}!',
        'Uma caixa trouxe {nome}! Clique para posicionar.': '¡Una caja trajo {nome}! Haz clic para colocarla.',
        'Escolha um lugar livre para a defesa.': 'Elige un lugar libre para la defensa.',
        'Defesa posicionada.': 'Defensa colocada.',
        'Posicione a defesa recebida antes de girar novamente.': 'Coloca la defensa recibida antes de girar otra vez.',
        'Mina recebida. Feche a roleta e escolha onde colocar.': 'Mina recibida. Cierra la ruleta y elige dónde colocarla.',
        'Torre recebida: {nome}. Feche a roleta e escolha onde colocar.': 'Torre recibida: {nome}. Cierra la ruleta y elige dónde colocarla.',
        'Um super-boss atacou suas torres!': '¡Un superjefe atacó tus torres!',
        'Meteoro a caminho!': '¡Meteorito en camino!',
        'Evento concluído! +{fragmentos} Fragmentos de Pixel.': '¡Evento completado! +{fragmentos} Fragmentos de Píxel.',
        ' Skin desbloqueada: {nome}.': ' Skin desbloqueada: {nome}.',
        ' Torre desbloqueada: {nome}.': ' Torre desbloqueada: {nome}.',
        ' Não foi possível salvar o prêmio; tente vencer novamente.': ' No se pudo guardar el premio; intenta ganar de nuevo.'
    }
});

function localizarEvento(texto, variaveis = {}) {
    return preencherVariaveisDoTexto(TEXTOS_DOS_EVENTOS[idiomaAtual]?.[texto] || texto, variaveis);
}

function carregarVitoriasDosEventos() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_VITORIAS_DOS_EVENTOS) || '{}');
        return Object.fromEntries(EVENTOS_DISPONIVEIS.map(evento => [
            evento.id,
            Number.isSafeInteger(dados[evento.id]) && dados[evento.id] > 0 ? dados[evento.id] : 0
        ]));
    } catch {
        return Object.fromEntries(EVENTOS_DISPONIVEIS.map(evento => [evento.id, 0]));
    }
}

function obterDificuldadesConcluidasDoSuperBoss(id) {
    if (!CONFIG.eventos.elencosSuperBosses[id]) return [];
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_VITORIAS_DOS_EVENTOS) || '{}');
        if (!Number.isSafeInteger(dados[id]) || dados[id] <= 0) return [];
        const dificuldades = dados.dificuldadesConcluidas?.[id];
        return Array.isArray(dificuldades)
            ? dificuldades.filter(dificuldade => Object.hasOwn(CONFIG.eventos.dificuldadesSuperBosses, dificuldade))
            : [];
    } catch { return []; }
}

function obterVitoriasAntigasSemDificuldadeDoSuperBoss(id) {
    if (!CONFIG.eventos.elencosSuperBosses[id]) return 0;
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_VITORIAS_DOS_EVENTOS) || '{}');
        if (dados.migracaoDificuldadesConfirmada?.[id]) return 0;
        const total = Number.isSafeInteger(dados[id]) ? dados[id] : 0;
        const identificadas = obterDificuldadesConcluidasDoSuperBoss(id).length;
        const registrado = dados.vitoriasAntigasPorEvento?.[id];
        return Number.isSafeInteger(registrado) && registrado >= 0
            ? registrado : Math.max(0, total - identificadas);
    } catch { return 0; }
}

function recuperarDificuldadesAntigasDoSuperBoss(id, dificuldades) {
    const quantidade = obterVitoriasAntigasSemDificuldadeDoSuperBoss(id);
    const validas = CONFIG.eventos.dificuldadesSuperBosses;
    if (!quantidade || !Array.isArray(dificuldades) || !dificuldades.length
        || dificuldades.length > quantidade || new Set(dificuldades).size !== dificuldades.length
        || dificuldades.some(dificuldade => !Object.hasOwn(validas, dificuldade))) return false;
    const anterior = localStorage.getItem(CHAVE_VITORIAS_DOS_EVENTOS);
    try {
        const dados = JSON.parse(anterior);
        const atuais = Array.isArray(dados.dificuldadesConcluidas?.[id])
            ? dados.dificuldadesConcluidas[id] : [];
        if (dificuldades.some(dificuldade => atuais.includes(dificuldade))) return false;
        dados.dificuldadesConcluidas = { ...(dados.dificuldadesConcluidas || {}),
            [id]: [...atuais, ...dificuldades] };
        dados.migracaoDificuldadesConfirmada = { ...(dados.migracaoDificuldadesConfirmada || {}), [id]: true };
        localStorage.setItem(CHAVE_VITORIAS_DOS_EVENTOS, JSON.stringify(dados));
        if (!atualizarSalvoAtivo()) throw Error('salvo');
        return true;
    } catch {
        try { if (anterior === null) localStorage.removeItem(CHAVE_VITORIAS_DOS_EVENTOS);
            else localStorage.setItem(CHAVE_VITORIAS_DOS_EVENTOS, anterior); } catch {}
        return false;
    }
}

let vitoriasDosEventos = carregarVitoriasDosEventos();

function recuperarFigurinhasDosEventosSuperBossesVencidos() {
    for (const [evento, elenco] of Object.entries(CONFIG.eventos.elencosSuperBosses)) {
        if (vitoriasDosEventos[evento] > 0) {
            for (const tipo of [...elenco.comuns, ...elenco.chefes]) {
                registrarInimigoDerrotadoNoAlbum(tipo);
            }
        }
    }
}

recuperarFigurinhasDosEventosSuperBossesVencidos();

let tempoDoEventoMs = 0;
let proximaCaixaEm = 0;
let proximoMeteoroEm = 0;
let numeroDaChuvaDeMeteoros = 0;
let caixasAbertasNoEvento = 0;
let girosDaRoletaNoEvento = 0;
let caixasDoEvento = [];
let defesasPendentesDoEvento = [];
let meteorosDoEvento = [];
let craterasDoEvento = [];
let proximaEvacuacaoDeTorreEm = 0;
let alternativaDaCaixaPendente = null;
let queimadurasDasTorresDoEvento = [];
let cuspesAcidosDoEvento = [];
let torresCorroidasDoEvento = [];
let torresDerretendoDoEvento = [];
let roletaDoEventoAberta = false;
let anguloDaRoleta = 0;
let roletaGirando = false;
let intervaloDaMusicaDoEvento = null;
let ganhoDaMusicaDoEvento = null;
let musicaDoEventoTocando = false;
let eventoDaMusicaAtivo = null;
let passoDaMusicaDoEvento = 0;

function obterEventoAtivoParaMusica() {
    return mapaPersonalizadoAtivo?.evento || null;
}

function atualizarVolumeDaMusicaDoEvento() {
    if (!ganhoDaMusicaDoEvento || !contextoAudio) return;
    const trilha = CONFIG.eventos.trilhas[eventoDaMusicaAtivo];
    const ganhoDoSuperBoss = CONFIG.eventos.volumeRelativoSuperBosses[eventoDaMusicaAtivo] || 1;
    ganhoDaMusicaDoEvento.gain.setTargetAtTime(
        volumeDaMusica * (trilha?.volumeRelativo || 1) * ganhoDoSuperBoss,
        contextoAudio.currentTime, 0.02);
}

function pararMusicaDoEvento() {
    if (intervaloDaMusicaDoEvento !== null) clearInterval(intervaloDaMusicaDoEvento);
    intervaloDaMusicaDoEvento = null;
    musicaDoEventoTocando = false;
    eventoDaMusicaAtivo = null;
    if (ganhoDaMusicaDoEvento && contextoAudio) {
        ganhoDaMusicaDoEvento.gain.setTargetAtTime(0, contextoAudio.currentTime, 0.015);
    }
}

function iniciarMusicaDoEvento() {
    const id = mapaPersonalizadoAtivo?.evento;
    const trilha = CONFIG.eventos.trilhas[id];
    if (!trilha || musicaPausadaPeloJogador || volumeDaMusica <= 0) return;
    const audio = obterContextoAudio();
    if (!audio) return;
    if (musicaDoEventoTocando && eventoDaMusicaAtivo === id) return;
    pararMusicaDoEvento();
    if (!ganhoDaMusicaDoEvento) {
        ganhoDaMusicaDoEvento = audio.createGain();
        ganhoDaMusicaDoEvento.connect(audio.destination);
    }
    eventoDaMusicaAtivo = id;
    passoDaMusicaDoEvento = 0;
    musicaDoEventoTocando = true;
    atualizarVolumeDaMusicaDoEvento();
    const tocarPasso = () => {
        if (!musicaDoEventoTocando || mapaPersonalizadoAtivo?.evento !== id) return;
        passoDaMusicaDoEvento = tocarPassoDaPartituraPixelada(audio, trilha, passoDaMusicaDoEvento, ganhoDaMusicaDoEvento);
    };
    tocarPasso();
    intervaloDaMusicaDoEvento = setInterval(tocarPasso, trilha.intervaloDoPasso);
    atualizarBotoesDaMusica();
}

function desenharDecoracoesDoEvento(id) {
    const visual = CONFIG.eventos.visuais[id];
    if (!visual) return;
    ctx.save();
    for (let indice = 0; indice < 34; indice++) {
        const x = (indice * 173 + 67) % canvas.width;
        const y = (indice * 239 + 91) % canvas.height;
        ctx.fillStyle = indice % 3 === 0 ? visual.torreFinalNucleo : visual.caminhoMarcas;
        ctx.globalAlpha = 0.35;
        ctx.fillRect(x, y, indice % 4 === 0 ? 8 : 4, indice % 4 === 0 ? 8 : 4);
    }
    ctx.globalAlpha = 1;
    if (id === 'idadeDaPedra') {
        for (const [x, y] of [[325, 92], [600, 330], [925, 95], [1130, 625]]) {
            ctx.fillStyle = '#403c32'; ctx.fillRect(x - 28, y + 6, 56, 19);
            ctx.fillStyle = '#a89369'; ctx.fillRect(x - 22, y - 8, 44, 22);
            ctx.fillStyle = '#cfb583'; ctx.fillRect(x - 12, y - 15, 25, 8);
            ctx.fillStyle = '#675a45'; ctx.fillRect(x + 5, y + 4, 14, 5);
        }
    } else if (id === 'caixaSurpresa') {
        for (const [x, y, cor] of [[300, 320, '#ffdc78'], [635, 120, '#8de6e0'], [920, 620, '#ff8db3'], [1100, 110, '#b9a3ff']]) {
            ctx.fillStyle = '#28265b'; ctx.fillRect(x - 25, y - 21, 50, 46);
            ctx.fillStyle = cor; ctx.fillRect(x - 20, y - 16, 40, 36);
            ctx.fillStyle = '#fff2c1'; ctx.fillRect(x - 4, y - 16, 8, 36);
            ctx.fillRect(x - 20, y - 3, 40, 7);
            ctx.fillStyle = '#fff9dd'; ctx.fillRect(x - 11, y - 26, 9, 8); ctx.fillRect(x + 2, y - 26, 9, 8);
        }
    } else if (id === 'roleta') {
        for (const [x, y] of [[365, 330], [860, 355], [1100, 580]]) {
            ctx.fillStyle = '#0a3e3b'; ctx.beginPath(); ctx.arc(x, y, 52, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#e8bd60'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(x, y, 43, 0, Math.PI * 2); ctx.stroke();
            ctx.strokeStyle = '#8ce3bb'; ctx.lineWidth = 3;
            for (let setor = 0; setor < 8; setor++) {
                const angulo = setor * Math.PI / 4;
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(angulo) * 39, y + Math.sin(angulo) * 39); ctx.stroke();
            }
            ctx.fillStyle = '#ffe080'; ctx.fillRect(x - 7, y - 7, 14, 14);
        }
    } else if (id === 'superBosses') {
        for (const [x, y] of [[120, 150], [420, 580], [705, 100], [1030, 600]]) {
            ctx.fillStyle = '#261724'; ctx.fillRect(x - 27, y - 11, 54, 34);
            ctx.fillStyle = '#9b4350'; ctx.fillRect(x - 20, y - 43, 40, 53);
            ctx.fillStyle = '#f17b66'; ctx.fillRect(x - 5, y - 32, 10, 22);
            ctx.fillStyle = '#d75c60'; ctx.fillRect(x - 27, y - 48, 12, 18); ctx.fillRect(x + 15, y - 48, 12, 18);
        }
        ctx.strokeStyle = '#b6535b'; ctx.lineWidth = 5;
        for (const [x, y] of [[350, 400], [950, 110], [1020, 640]]) {
            ctx.beginPath(); ctx.moveTo(x - 35, y - 18); ctx.lineTo(x, y); ctx.lineTo(x - 8, y + 24); ctx.lineTo(x + 28, y + 43); ctx.stroke();
        }
    } else if (id === 'superBossesMecanicos') {
        for (const [x, y] of [[100, 360], [350, 105], [615, 650], [890, 100], [1100, 585]]) {
            ctx.fillStyle = '#26373c'; ctx.fillRect(x - 31, y - 31, 62, 62);
            ctx.fillStyle = '#a7ad9b'; ctx.fillRect(x - 23, y - 23, 46, 46);
            ctx.fillStyle = '#344950'; ctx.fillRect(x - 13, y - 13, 26, 26);
            ctx.fillStyle = '#f9c66b'; ctx.fillRect(x - 5, y - 5, 10, 10);
            for (const deslocamento of [-27, 19]) {
                ctx.fillStyle = '#879694'; ctx.fillRect(x + deslocamento, y - 8, 8, 16);
                ctx.fillRect(x - 8, y + deslocamento, 16, 8);
            }
        }
    } else if (id === 'superBossesAbissais') {
        for (const [x, y] of [[100, 135], [365, 400], [640, 95], [920, 620], [1105, 95]]) {
            ctx.fillStyle = '#164d65'; ctx.fillRect(x - 6, y - 5, 12, 48);
            ctx.fillStyle = '#59c4bd'; ctx.fillRect(x - 22, y - 20, 44, 18);
            ctx.fillStyle = '#a6eee0'; ctx.fillRect(x - 4, y - 37, 8, 18);
            ctx.fillRect(x - 29, y - 14, 9, 10); ctx.fillRect(x + 20, y - 14, 9, 10);
            ctx.strokeStyle = '#77c5c5'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(x + 45, y - 48, 12, 0, Math.PI * 2); ctx.stroke();
        }
    } else if (id === 'superBossesAcidos') {
        for (const [x, y] of [[95, 130], [330, 620], [670, 100], [970, 610], [1120, 95]]) {
            ctx.fillStyle = '#172b24'; ctx.fillRect(x - 23, y - 18, 46, 45);
            ctx.fillStyle = '#779d4a'; ctx.fillRect(x - 18, y - 15, 36, 30);
            ctx.fillStyle = '#bded68'; ctx.fillRect(x - 14, y - 9, 28, 20);
            ctx.fillStyle = '#e2ff9e'; ctx.fillRect(x - 3, y - 8, 6, 7);
            ctx.fillStyle = '#5c8141'; ctx.fillRect(x - 18, y + 14, 36, 6);
        }
    } else if (id === 'meteoros') {
        for (const [x, y, raio] of [[140, 225, 47], [610, 600, 63], [970, 90, 39], [1090, 580, 51]]) {
            ctx.fillStyle = '#151b31'; ctx.beginPath(); ctx.arc(x, y, raio + 7, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#8c7593'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(x, y, raio, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = '#39405f'; ctx.beginPath(); ctx.arc(x, y, raio - 8, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffac72'; ctx.fillRect(x - 4, y - 4, 8, 8);
        }
    }
    ctx.restore();
}

// Cada criatura possui uma silhueta própria; as cores vêm do tema e da configuração do inimigo.
const SPRITES_DOS_INIMIGOS_DOS_EVENTOS = Object.freeze({
    cacadorDaTribo: Object.freeze([
        '..cc....', '.cbbc...', '.abdda..', 'aabbbbaa', '.abccba.', '..abba..', '.aa..aa.', 'aa....aa'
    ]),
    mamuteLanoso: Object.freeze([
        '............', '..aaabbba...', '.abbbbbbbba.', 'abbbbbbbbbba',
        'abbbddbbbbba', 'abbbbbbbcbaa', '.abbbbbbcaa.', '..abbbbacaa.',
        '..aabbaacaa.', '..aa..aa.aa.', '..aa..aa....', '............'
    ]),
    liderDaTribo: Object.freeze([
        'c...cc...c..', '.c..cc..c...', '..aabbaa..c.', '.aabddbaa.cc',
        '.abbbbbba.cc', 'aabccccbba.c', 'abbbbbbbba.c', '.aabbbbaa..c',
        '..aabbaaa..c', '..aa..aa...c', '.aa....aa...', '............'
    ]),
    mimicoEmbrulhado: Object.freeze([
        '..cc....', '.abbaa..', 'aabbbaa.', 'abdddbba', 'abbbcbba', 'aabbbbaa', '.ab..ba.', '..a..a..'
    ]),
    saqueadorDePacotes: Object.freeze([
        '..aaaa..', '.abbbba.', 'aabccbaa', 'abbbbbba', 'aabbddaa', '.abbbba.', '.aa..aa.', 'aa....aa'
    ]),
    reiDosPresentes: Object.freeze([
        'c.cddc.c', '.acccca.', 'aabddbaa', 'abbbbbba', 'abcbbcba', 'abbbbbba', 'aabbbbaa', 'aa.aa.aa'
    ]),
    fichaViva: Object.freeze([
        '..cccc..', '.cabbac.', 'cabbbbac', 'cabcbbac', 'cabbbbac', '.cabbac.', '..aaaa..', '.aa..aa.'
    ]),
    cobradorDaBanca: Object.freeze([
        '..aaaa..', '.abbbba.', 'aabcdbaa', 'abbbbbba', 'aacbbdaa', '.abbbba.', '.aa..aa.', 'aa....aa'
    ]),
    donoDaBanca: Object.freeze([
        'c.cddc.c', '.acccca.', 'aabddbaa', 'abbbbbba', 'abccccba', 'abbbbbba', 'aabbbbaa', 'aa.aa.aa'
    ]),
    corredorDeCinzas: Object.freeze([
        '...cc...', '..cbbc..', '..abba..', '.abbbba.', '..abba..', '.abbbba.', '.aa..aa.', 'aa....aa'
    ]),
    guardiaoDeCratera: Object.freeze([
        '.aaaaaa.', 'aabbbbaa', 'abccccba', 'abbbbbba', 'abdbbdba', 'abbbbbba', 'aaabbaaa', 'aa.aa.aa'
    ]),
    arautoDoCometa: Object.freeze([
        'c..dd..c', 'acabbaca', 'aabddbaa', 'abbbbbba', 'abccccba', 'aabbbbaa', '.aa..aa.', 'aa....aa'
    ]),
    impDeBrasa: Object.freeze([
        '....cc......', '...cbbc.....', '..ccbbac....', '..abbbba....', '.abddbbba...',
        '.abbbbbbba..', '..abccbbba..', '..aabbbba...', '...abbbba...', '..aa..aa....',
        '.aa....aa...', 'a.........a.'
    ]),
    cavaleiroInfernal: Object.freeze([
        '....cbbc....', '...abbba....', '...abddba...', '...abbbba..c',
        '..aabbbbaa.c', '.aabbbbbbaac', 'aacabbbbaacc', 'aacabbbbaacc',
        'aacaabbbaacc', '.c..abba..c.', '....abba....', '...aa..aa...'
    ]),
    duqueDasBrasas: Object.freeze([
        '.c.c.cc.c.c.', '.cccccccccc.', '..abddddba..', '..abbbbbba.c',
        'c.aabbbbaacc', 'caabbbbbbbac', 'caabcbcbbaac', 'c.aabbbba..c',
        'c..abbbba..c', 'c.aabbbbaa.c', '..abbbbbba..', '..aa....aa..'
    ]),
    cerberoDeLava: Object.freeze([
        '..c...c...c.', '.aba.aba.aba', '.addaddaddda', '.abbbbbbbbba',
        'aabdbdbdbbaa', 'abbbbbbbbbba', '.abccccccba.', '.abbbbbbbba.',
        'aabbbbbbbbaa', 'aaabb..bbaaa', '..aa....aa..', '.aa......aa.'
    ]),
    rainhaDasCinzas: Object.freeze([
        'c.c..cc..c.c', 'cccccccccccc', 'aa.abddba.aa', 'abaabbbaabba',
        'abbaabbbaaba', '.abbbbbbba..', '..abdcdbba..', '..abbbbbba..',
        '.aabbbbbbaa.', '.abbbbbbbba.', 'aabbbbbbbbaa', 'aaabbbbbbaa.'
    ]),
    soberanoInfernal: Object.freeze([
        'c..........c', 'cc..cccc..cc', 'accabbbbaccc', 'aacabddbaaca',
        'aaabbbbbbaaa', 'aabbbbbbbbaa', 'abbbcccccbaa', 'abbbbbbbbbba',
        'aabbbbbbbbaa', '..abbbbbba..', '.aaabbbbaaa.', 'aa..aa..aa..'
    ]),
    droneDeSucata: Object.freeze([
        'cc........cc', '.aa......aa.', '..acc..cca..', '...abbbba...',
        '...abddba...', '..aabbbbaa..', '...abccba...', '....abba....',
        '..ccabba.cc.', '.aa..aa..aa.', '............', '............'
    ]),
    automatoBlindado: Object.freeze([
        '...aacaa....', '..aabbbbaa..', '.aabddddbbaa', 'aabbbbbbbbaa',
        'aabbbbbbbbaa', 'aaabccccbaaa', 'aaabbbbbbaaa', 'aabbbbbbbbaa',
        '.aabbbbbbaa.', '..aabbbbaa..', '..aa....aa..', '.aaa....aaa.'
    ]),
    perfuradorDeAco: Object.freeze([
        '.....cc.....', '.....cc.....', '....acca....', '....abba....',
        '...aabbaa...', '..aabbbbaa..', '.aabbbbbbaa.', 'aabddbbddbaa',
        'aabbbbbbbbaa', 'aaabccccbaaa', '..aabbbbaa..', '..aa....aa..'
    ]),
    fornalhaAndante: Object.freeze([
        '...cc..cc...', '...cbccbc...', '...abbbba...', '..aabbbbaa..',
        '.aabccccbbaa', '.aabbbbbbaa.', 'aabbbddbbbaa', 'aabbbddbbbaa',
        'aabbbbbbbbaa', '.aabccccbaa.', '..aabbbbaa..', '..aa....aa..'
    ]),
    aranhaMecanica: Object.freeze([
        'a..a....a..a', '.a.a.aa.a.a.', '..aabbbbaa..', 'aaabddddbaaa',
        '..abbbbbba..', 'aaabccccbaaa', '..abbbbbba..', '.aabbbbbbaa.',
        'a.aabbbbaa.a', 'a..aa..aa..a', '.aa......aa.', 'aa........aa'
    ]),
    titaDaForja: Object.freeze([
        'cc..aaaa..cc', 'cc.aabbaa.cc', 'a.aabddbaa.a', 'aaaabbbbaaaa',
        'aabbbbbbbbaa', 'aabccddccbaa', 'aabbbbbbbbaa', 'aabbbbbbbbaa',
        'a.aabbbbaa.a', 'a.aabbbbaa.a', '..aabbbbaa..', '..aaaa..aaaa'
    ]),
    enguiaAbissal: Object.freeze([
        '........cc..', '.......abba.', '.....aabdda.', '....abbbba..',
        '....abbaaa..', '.....abba...', '...aabba....', '..abbba.....',
        '.abbba......', 'aabbba......', 'aacca.......', '.aa.........'
    ]),
    guardiaoDeCoralNegro: Object.freeze([
        'c..c....c..c', 'ac.ca..ac.ca', 'abaca..acaba', '.abba..abba.',
        '..abbbbbba..', '..abddddba..', '.aabbbbbbaa.', 'aabbbbbbbbaa',
        'c.aabbbbaa.c', 'c..abbbba..c', '....abba....', '...aa..aa...'
    ]),
    sirenaSombria: Object.freeze([
        '..ccaaaacc..', '..cabbbbac..', '...abddba...', '.caabbbbaac.',
        'ccaabbbbaacc', 'ca.abbbba.ac', 'c..abbbba..c', '...abbbba...',
        '....abba....', '...aabba....', '..aabbba....', '.aaccccaa...'
    ]),
    caranguejoColossal: Object.freeze([
        'aa........aa', 'aca......aca', 'abba....abba', 'aaba.aa.aaba',
        '.aabbbbbbaa.', '..abddddba..', '..abbbbbba..', '.aabccccbbaa',
        'aabbbbbbbbaa', 'aaabb..bbaaa', 'a.a.a..a.a.a', 'a.a......a.a'
    ]),
    polvoDoAbismo: Object.freeze([
        '....aaaa....', '..aabbbbaa..', '.aabbbbbbaa.', '.abbd..dbba.',
        '.abbbbbbbba.', 'aabbbbbbbbaa', 'aabccccccbaa', 'aabbbbbbbbaa',
        'aa.abbbba.aa', 'a..abba..a.a', 'a.aabba.a..a', 'aaa.aa.aaaaa'
    ]),
    leviataAbissal: Object.freeze([
        'c.....cc....', 'cc..aabba...', 'acaabddba...', 'aabbbbbbaacc',
        '.aabbbbbbaac', '..aabbbbbbaa', 'c..aabbbbaa.', 'cc..abbbbbaa',
        'acaaabbbbbaa', 'aabbbbbbbbaa', '.aabbbaabbaa', '..aa..aa..aa'
    ]),
    gotaCorrosiva: Object.freeze([
        '.....cc.....', '....cbbc....', '...cbbbbc...', '..abbbbbba..',
        '.abbbddbbba.', '.abbbbbbbba.', '.abbbbbbbba.', '..abbbbbba..',
        '...aabbaa...', '....aaaa....', '............', '............'
    ]),
    ofidioToxico: Object.freeze([
        '....cccc....', '...cbbbbc...', '..aabddbaa..', '.aabbbbbbaa.',
        '.aabbbbbbaa.', '..aabbbbaa..', '...abbbba...', '..aabbbbaa..',
        '.aabbaabbaa.', 'aabb....bbaa', 'aa........aa', '............'
    ]),
    serpenteDoEsgoto: Object.freeze([
        '..cc....cc..', '.cbbccccbbc.', 'aabbdccdbbaa', 'aabbbbbbbbaa',
        '.aabbbbbbaa.', '..aabbbbaa..', '..aabbbbaa..', '.aabbbbbbaa.',
        'aabbb..bbbaa', 'aaab....baaa', '.aa......aa.', '............'
    ]),
    basiliscoCaustico: Object.freeze([
        'c.c......c.c', 'cccc....cccc', 'aabbccccbbaa', 'aabbdccdbbaa',
        'aabbbbbbbbaa', '.aabbbbbbaa.', '..abbbbbba..', '.aabbbbbbaa.',
        'aabbbaabbbaa', 'aaab....baaa', '.aa......aa.', '............'
    ]),
    hidraAcida: Object.freeze([
        'cc..cc..cc..', 'cbccbbccbbc.', 'abddbbddbbda', 'abbbbbbbbbb.',
        '.abbbbbbbba.', '..abbbbbba..', '.aabbbbbbaa.', 'aabbbbbbbbaa',
        'aabb....bbaa', 'aaab....baaa', '.aa......aa.', '............'
    ]),
    viboraAcida: Object.freeze([
        '......cccccc', '.....abddbbc', '....aabbbbac', '.....aabbbac',
        '......abbbaa', '....aabbbba.', '...aabbbba..', '..aabbbba...',
        '.aabbbbba...', '.aabbbbbaa..', '..aabbbbaa..', '....aaaa....'
    ]),
    fragmentoInstavel: Object.freeze([
        '....cccc....', '...cbbbbc...', '..cabbbbac..', '.cabbddbbac.',
        'caabbbbbbaac', '.cabbccbbac.', '..cabbbbac..',
        '...cbbbbc...', '....caac....', '...aa..aa...', '..aa....aa..', '............'
    ]),
    sentinelaMutante: Object.freeze([
        '...cc..cc...', '..caa..aac..', '.aabbbbbbaa.', 'aabbcddcbbaa',
        'aabbbbbbbbaa', 'aabbbbbbbbaa', '.aabccccbaa.', '..abbbbbba..',
        '.aabb..bbaa.', 'aaabb..bbaaa', 'aa........aa', '............'
    ]),
    ecoPrismatico: Object.freeze([
        'c...c..c...c', '.c.aacca.c..', '..cabbbbac..', '.aabddddbaa.',
        'aabbbbbbbbaa', '.aabbbbbbaa.', 'c.abccccba.c', '..abbbbbba..',
        '.aabbbbbbaa.', 'aabb....bbaa', 'aa........aa', '............'
    ]),
    guardiaoDoCasulo: Object.freeze([
        '....cccc....', '..ccaaaacc..', '.caabbbbaac.', 'caabddddbaac',
        'caabbbbbbaac', 'caabbbbbbaac', 'caabccccbaac', '.caabbbbaac.',
        '..aabbbbaa..', '.aabb..bbaa.', 'aaab....baaa', '............'
    ]),
    quimeraDaRuptura: Object.freeze([
        'cc........cc', 'caa.cccc.aac', '.aacabbbacaa', 'aabbdccdbbaa',
        'aabbbbbbbbaa', '.abbbbbbbba.', 'caabccccbaac', 'c.aabbbbaa.c',
        '..aabbbbaa..', '.aabb..bbaa.', 'aaab....baaa', 'aa........aa'
    ]),
    metamorfo: Object.freeze([
        '...cc..cc...', '..caa..aac..', 'aabbbbbbbbaa', 'aabbcddcbbaa',
        'aabbbbbbbbaa', 'aabbbbbbbbaa', '.abccbbccba.', '.abbbbbbbba.',
        'aabbb..bbbaa', 'aaabb..bbaaa', '..aa....aa..', '.aa......aa.'
    ]),
    carcacaDaVibora: Object.freeze([
        '..cc....cc..', '.caaaccaaac.', 'aa........aa', 'a..a....a..a',
        '..a.a..a.a..', '...aa..aa...', '..a.a..a.a..', '.aa......aa.',
        'aa........aa', '............', '............', '............'
    ])
});

function desenharSpriteDoInimigoDoEvento(inimigo, x, y, tamanho, semCasulo = false) {
    if (inimigo.tipo === 'metamorfo' && inimigo.formaMetamorfo) {
        const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos;
        const noCasulo = tempoDoEventoMs < (inimigo.casuloAte || 0);
        const progresso = noCasulo ? Math.max(0, Math.min(1,
            1 - (inimigo.casuloAte - tempoDoEventoMs) / regra.duracaoCasuloMs)) : 1;
        const fechando = noCasulo && progresso < regra.fimFechamentoCasulo;
        const escala = fechando
            ? 1 - (1 - regra.escalaFormaNoCasulo) * progresso / regra.fimFechamentoCasulo
            : noCasulo ? regra.escalaFormaNoCasulo : 1;
        const tamanhoDaForma = tamanho * escala;
        const margem = (tamanho - tamanhoDaForma) / 2;
        if (fechando && !inimigo.formaMetamorfoAnterior) {
            desenharSpriteDoInimigoDoEvento({ ...inimigo, formaMetamorfo: null,
                armaduraMetamorfo: false, cor: inimigo.corAnteriorMetamorfo },
            x + margem, y + margem, tamanhoDaForma, true);
        } else {
            const formaVisivel = fechando ? inimigo.formaMetamorfoAnterior : inimigo.formaMetamorfo;
            const tipoVisivel = { ciano: 'rapido', sabotador: 'sabotador',
                artico: 'bossArtico', curador: 'curadorDoVazio' }[formaVisivel];
            desenharCorpoDoInimigo({ ...inimigo, tipo: tipoVisivel,
                cor: fechando ? inimigo.corAnteriorMetamorfo : inimigo.cor },
            x + margem, y + margem, tamanhoDaForma);
        }
        ctx.save();
        if (!noCasulo) {
            ctx.fillStyle = '#da9ffc';
            ctx.fillRect(x + tamanho * .43, y + tamanho * .42, tamanho * .14, tamanho * .14);
        }
        desenharCasuloDoMetamorfo(inimigo, x, y, tamanho);
        if (inimigo.defesaAdaptada) {
            const configuracao = CONFIG.torre.tipos[inimigo.defesaAdaptada];
            const nome = configuracao ? obterNomeLocalizado(configuracao) : inimigo.defesaAdaptada;
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#f3d3ff';
            ctx.fillText(localizarEvento('Resiste a {torre}', { torre: nome }),
                x + tamanho / 2, y + tamanho + 15);
        }
        ctx.restore();
        return true;
    }
    const sprite = SPRITES_DOS_INIMIGOS_DOS_EVENTOS[inimigo.tipo];
    if (!sprite) return false;
    const tema = CONFIG.inimigo[inimigo.tipo].visualEvento;
    const destaques = {
        idadeDaPedra: ['#433b30', '#e7bf7e', '#f5dfaa'],
        caixaSurpresa: ['#552649', '#ffe1a0', '#fff1ce'],
        roleta: ['#164c3d', '#ffe083', '#fff6c2'],
        meteoros: ['#282d4b', '#ffa985', '#ffebca'],
        inferno: ['#3b1b2b', '#ffb351', '#ffe7a0'],
        forja: ['#26353b', '#efb956', '#d9f5e3'],
        abismo: ['#15384b', '#8be5d9', '#d8f9ef'],
        acido: ['#2f5839', '#c9f56f', '#e8ffae'],
        metamorfo: ['#302e52', '#a4f4e9', '#fff3cb']
    }[tema];
    const cores = { a: destaques[0], b: inimigo.cor, c: destaques[1], d: destaques[2] };
    const pixel = tamanho / sprite.length;
    ctx.save();
    for (let linha = 0; linha < sprite.length; linha++) {
        for (let coluna = 0; coluna < sprite[linha].length; coluna++) {
            const cor = cores[sprite[linha][coluna]];
            if (!cor) continue;
            ctx.fillStyle = cor;
            ctx.fillRect(x + coluna * pixel, y + linha * pixel, Math.ceil(pixel), Math.ceil(pixel));
        }
    }
    if (inimigo.tipo === 'viboraAcida') desenharBocaDaViboraAtacando(inimigo, x, y, tamanho);
    if (inimigo.tipo === 'metamorfo' && !semCasulo) desenharCasuloDoMetamorfo(inimigo, x, y, tamanho);
    ctx.restore();
    return true;
}

function desenharCasuloDoMetamorfo(inimigo, x, y, tamanho) {
    const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos;
    const restante = (inimigo.casuloAte || 0) - tempoDoEventoMs;
    if (restante <= 0) {
        if (inimigo.armaduraMetamorfo) {
            ctx.strokeStyle = '#dce6ef'; ctx.lineWidth = Math.max(2, tamanho / 20);
            ctx.strokeRect(x + tamanho * .08, y + tamanho * .06, tamanho * .84, tamanho * .88);
        }
        return;
    }
    const progresso = Math.max(0, Math.min(1, 1 - restante / regra.duracaoCasuloMs));
    const unidade = tamanho / 12;
    const linhas = [2, 4, 6, 8, 8, 10, 10, 10, 10, 8, 8, 6, 4, 2];
    const deslocamento = progresso < regra.fimFechamentoCasulo
        ? Math.round((1 - progresso / regra.fimFechamentoCasulo) * unidade * 2)
        : progresso > regra.inicioAberturaCasulo
            ? Math.round((progresso - regra.inicioAberturaCasulo)
                / (1 - regra.inicioAberturaCasulo) * unidade * 2) : 0;
    for (let linha = 0; linha < linhas.length; linha++) {
        const largura = linhas[linha];
        const esquerda = x + (12 - largura) / 2 * unidade;
        const topo = y + (linha - 1) * unidade;
        const metade = largura / 2;
        ctx.fillStyle = '#241e3d';
        ctx.fillRect(esquerda - deslocamento, topo, metade * unidade, unidade);
        ctx.fillRect(esquerda + metade * unidade + deslocamento, topo, metade * unidade, unidade);
        if (linha === 0 || linha === linhas.length - 1 || largura <= 2) continue;
        ctx.fillStyle = linha % 3 === 0 ? '#8063a7' : '#604a88';
        ctx.fillRect(esquerda + unidade - deslocamento, topo,
            (metade - 1) * unidade, unidade);
        ctx.fillRect(esquerda + metade * unidade + deslocamento, topo,
            (metade - 1) * unidade, unidade);
    }
    ctx.fillStyle = '#a4f4e9';
    for (const [coluna, linha] of [[5, 3], [6, 4], [5, 6], [6, 7], [5, 9]]) {
        const lado = coluna < 6 ? -1 : 1;
        ctx.fillRect(x + coluna * unidade + lado * deslocamento,
            y + (linha - 1) * unidade, unidade, unidade);
    }
    if (deslocamento) {
        ctx.fillStyle = '#f4d2ff';
        ctx.fillRect(x + 5 * unidade, y + 4 * unidade, 2 * unidade, 4 * unidade);
    }
}

function desenharBocaDaViboraAtacando(inimigo, x, y, tamanho) {
    const cuspe = cuspesAcidosDoEvento.find(ataque => ataque.chefe === inimigo);
    if (!cuspe) return;
    const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesAcidos;
    const tempo = Math.max(0, tempoDoEventoMs - cuspe.inicio);
    const abertura = Math.max(0, Math.min(1, tempo / regra.aberturaDaBocaMs,
        (regra.tempoDoCuspeMs - tempo) / (regra.aberturaDaBocaMs / 2)));
    if (!abertura) return;
    const pixel = tamanho / 12;
    const deslocamento = Math.round(abertura * pixel * 1.6);
    const bocaX = x + pixel * 9;
    const bocaY = y + pixel * 3;
    ctx.fillStyle = '#203923';
    ctx.fillRect(bocaX, bocaY, pixel * 3, pixel + deslocamento);
    ctx.fillStyle = '#e2ff91';
    ctx.fillRect(bocaX + pixel, bocaY + pixel, pixel * 2, pixel * 0.36);
    ctx.fillStyle = '#2f5839';
    ctx.fillRect(bocaX - pixel, bocaY + pixel + deslocamento, pixel * 4, pixel * 0.65);
    ctx.fillStyle = inimigo.cor;
    ctx.fillRect(bocaX, bocaY + pixel + deslocamento, pixel * 3, pixel * 0.55);
}

function desenharInimigoDoEvento(inimigo, x, y, tamanho) {
    if (desenharSpriteDoInimigoDoEvento(inimigo, x, y, tamanho)) return;
    const elenco = Object.values(CONFIG.eventos.elencosSuperBosses)
        .find(item => item.chefes.includes(inimigo.tipo));
    const visual = CONFIG.inimigo[inimigo.tipo].visualEvento;
    const indiceDoChefe = elenco?.chefes.indexOf(inimigo.tipo) ?? -1;
    const centroX = x + tamanho / 2;
    const centroY = y + tamanho / 2;
    ctx.save();
    if (visual === 'inferno') {
        ctx.fillStyle = '#43222c';
        ctx.fillRect(x + tamanho * .12, y + tamanho * .15, tamanho * .76, tamanho * .76);
        ctx.fillStyle = inimigo.cor;
        ctx.fillRect(x + tamanho * .21, y + tamanho * .25, tamanho * .58, tamanho * .55);
        const alturaDosChifres = indiceDoChefe < 0 ? .22 : .3 + indiceDoChefe * .07;
        ctx.fillStyle = '#ffd08b';
        ctx.beginPath(); ctx.moveTo(x + tamanho * .2, y + tamanho * .32);
        ctx.lineTo(x + tamanho * .12, y - tamanho * alturaDosChifres);
        ctx.lineTo(x + tamanho * .4, y + tamanho * .18);
        ctx.moveTo(x + tamanho * .8, y + tamanho * .32);
        ctx.lineTo(x + tamanho * .88, y - tamanho * alturaDosChifres);
        ctx.lineTo(x + tamanho * .6, y + tamanho * .18); ctx.fill();
        ctx.fillStyle = '#fff0a3'; ctx.fillRect(x + tamanho * .3, centroY, tamanho * .13, tamanho * .11);
        ctx.fillRect(x + tamanho * .57, centroY, tamanho * .13, tamanho * .11);
        if (indiceDoChefe >= 0) {
            ctx.fillStyle = '#ff9b48';
            for (let indice = 0; indice <= indiceDoChefe; indice++) {
                ctx.fillRect(x + tamanho * (.22 + indice * .14), y + tamanho * .82, tamanho * .1, tamanho * .2);
            }
            if (indiceDoChefe === 0) {
                ctx.fillStyle = '#ffd578';
                ctx.fillRect(centroX - tamanho * .2, y + tamanho * .1, tamanho * .4, tamanho * .08);
            } else if (indiceDoChefe === 1) {
                ctx.fillStyle = '#9e282d';
                ctx.fillRect(x - tamanho * .18, y + tamanho * .34, tamanho * .25, tamanho * .32);
                ctx.fillRect(x + tamanho * .93, y + tamanho * .34, tamanho * .25, tamanho * .32);
                ctx.fillStyle = '#ffe099';
                ctx.fillRect(x - tamanho * .12, centroY, tamanho * .08, tamanho * .08);
                ctx.fillRect(x + tamanho, centroY, tamanho * .08, tamanho * .08);
            } else if (indiceDoChefe === 2) {
                ctx.fillStyle = '#d689a8';
                ctx.beginPath(); ctx.moveTo(x + tamanho * .2, centroY);
                ctx.lineTo(x - tamanho * .32, y - tamanho * .15);
                ctx.lineTo(x - tamanho * .17, y + tamanho * .68);
                ctx.moveTo(x + tamanho * .8, centroY);
                ctx.lineTo(x + tamanho * 1.32, y - tamanho * .15);
                ctx.lineTo(x + tamanho * 1.17, y + tamanho * .68); ctx.fill();
            } else {
                ctx.fillStyle = '#f8613f';
                ctx.fillRect(x - tamanho * .26, y + tamanho * .25, tamanho * .34, tamanho * .42);
                ctx.fillRect(x + tamanho * .92, y + tamanho * .25, tamanho * .34, tamanho * .42);
                ctx.fillStyle = '#ffe191';
                ctx.fillRect(centroX - tamanho * .12, y - tamanho * .17, tamanho * .24, tamanho * .2);
            }
        }
    } else if (visual === 'forja') {
        ctx.fillStyle = '#25353b'; ctx.fillRect(x + tamanho * .08, y + tamanho * .08, tamanho * .84, tamanho * .84);
        ctx.fillStyle = inimigo.cor; ctx.fillRect(x + tamanho * .18, y + tamanho * .17, tamanho * .64, tamanho * .62);
        ctx.fillStyle = '#f9c66b'; ctx.fillRect(x + tamanho * .4, y + tamanho * .35, tamanho * .2, tamanho * .22);
        ctx.fillStyle = '#23333b';
        for (let indice = 0; indice < (indiceDoChefe < 0 ? 2 : indiceDoChefe + 3); indice++) {
            const posicao = indice / Math.max(1, indiceDoChefe + 2);
            ctx.fillRect(x + tamanho * posicao, y - tamanho * .07, tamanho * .12, tamanho * .2);
            ctx.fillRect(x + tamanho * posicao, y + tamanho * .85, tamanho * .12, tamanho * .2);
        }
        if (indiceDoChefe >= 0) {
            ctx.fillStyle = '#dce9d5';
            ctx.fillRect(centroX - tamanho * .27, y + tamanho * .24, tamanho * .14, tamanho * .1);
            ctx.fillRect(centroX + tamanho * .13, y + tamanho * .24, tamanho * .14, tamanho * .1);
            if (indiceDoChefe === 0) {
                ctx.fillStyle = '#d9d5ac';
                ctx.beginPath(); ctx.moveTo(centroX, y - tamanho * .35);
                ctx.lineTo(centroX - tamanho * .2, y + tamanho * .1);
                ctx.lineTo(centroX + tamanho * .2, y + tamanho * .1); ctx.fill();
            } else if (indiceDoChefe === 1) {
                ctx.fillStyle = '#ef914d';
                ctx.fillRect(centroX - tamanho * .14, y - tamanho * .25, tamanho * .28, tamanho * .42);
                ctx.fillStyle = '#ffdf77';
                ctx.fillRect(centroX - tamanho * .07, y - tamanho * .12, tamanho * .14, tamanho * .18);
            } else if (indiceDoChefe === 2) {
                ctx.fillStyle = '#84999b';
                for (const lado of [-1, 1]) for (const altura of [.25, .5, .75]) {
                    ctx.fillRect(centroX + lado * tamanho * .43, y + tamanho * altura, lado * tamanho * .32, tamanho * .08);
                }
            } else {
                ctx.fillStyle = '#b5c5ae';
                ctx.fillRect(x - tamanho * .23, y + tamanho * .15, tamanho * .3, tamanho * .4);
                ctx.fillRect(x + tamanho * .93, y + tamanho * .15, tamanho * .3, tamanho * .4);
                ctx.fillStyle = '#f9c66b';
                ctx.fillRect(centroX - tamanho * .15, y - tamanho * .18, tamanho * .3, tamanho * .24);
            }
        }
    } else {
        ctx.fillStyle = '#15384b';
        const tentaculos = indiceDoChefe < 0 ? 3 : indiceDoChefe + 4;
        for (let indice = 0; indice < tentaculos; indice++) {
            const deslocamento = (indice - (tentaculos - 1) / 2) * tamanho * .18;
            ctx.fillRect(centroX + deslocamento - tamanho * .04, centroY, tamanho * .09, tamanho * (.48 + indice % 2 * .15));
        }
        ctx.fillStyle = inimigo.cor;
        ctx.beginPath(); ctx.arc(centroX, centroY - tamanho * .08, tamanho * .39, Math.PI, 0);
        ctx.lineTo(centroX + tamanho * .39, centroY + tamanho * .22);
        ctx.lineTo(centroX - tamanho * .39, centroY + tamanho * .22); ctx.fill();
        ctx.fillStyle = '#c0fbeb';
        ctx.fillRect(centroX - tamanho * .2, centroY - tamanho * .14, tamanho * .12, tamanho * .1);
        ctx.fillRect(centroX + tamanho * .08, centroY - tamanho * .14, tamanho * .12, tamanho * .1);
        if (indiceDoChefe >= 0) {
            ctx.fillStyle = '#8ce7dd';
            for (let indice = 0; indice <= indiceDoChefe; indice++) {
                ctx.fillRect(x + tamanho * (.22 + indice * .15), y - tamanho * .09, tamanho * .08, tamanho * .16);
            }
            if (indiceDoChefe === 0) {
                ctx.fillStyle = '#b5a5db';
                ctx.fillRect(x + tamanho * .05, y - tamanho * .2, tamanho * .2, tamanho * .45);
                ctx.fillRect(x + tamanho * .75, y - tamanho * .2, tamanho * .2, tamanho * .45);
            } else if (indiceDoChefe === 1) {
                ctx.fillStyle = '#8bb8d5';
                ctx.fillRect(x - tamanho * .32, centroY, tamanho * .36, tamanho * .23);
                ctx.fillRect(x + tamanho * .96, centroY, tamanho * .36, tamanho * .23);
                ctx.fillRect(x - tamanho * .38, centroY - tamanho * .1, tamanho * .13, tamanho * .15);
                ctx.fillRect(x + tamanho * 1.25, centroY - tamanho * .1, tamanho * .13, tamanho * .15);
            } else if (indiceDoChefe === 2) {
                ctx.fillStyle = '#aa94d0';
                for (const lado of [-1, 1]) {
                    ctx.fillRect(centroX + lado * tamanho * .37, centroY, lado * tamanho * .2, tamanho * .48);
                }
            } else {
                ctx.fillStyle = '#8fe3d8';
                ctx.beginPath(); ctx.moveTo(x + tamanho * .14, y + tamanho * .35);
                ctx.lineTo(x - tamanho * .25, y - tamanho * .22);
                ctx.lineTo(x + tamanho * .28, y + tamanho * .07);
                ctx.moveTo(x + tamanho * .86, y + tamanho * .35);
                ctx.lineTo(x + tamanho * 1.25, y - tamanho * .22);
                ctx.lineTo(x + tamanho * .72, y + tamanho * .07); ctx.fill();
            }
        }
    }
    ctx.restore();
}

function atualizarIdiomaDosEventos() {
    const botao = document.getElementById('botao-eventos');
    if (botao) {
        botao.querySelector('strong').textContent = localizarEvento('Eventos');
        botao.querySelector('small').textContent = localizarEvento('Nove desafios para testar');
    }
    const botaoRoleta = document.getElementById('botao-roleta-evento');
    if (botaoRoleta) botaoRoleta.textContent = localizarEvento('Girar roleta');
    atualizarAcaoDoEvento();
    if (roletaDoEventoAberta) atualizarRoletaDoEvento();
}

function obterDificuldadeDoEvento() {
    const id = mapaPersonalizadoAtivo?.evento;
    const dificuldades = CONFIG.eventos.elencosSuperBosses[id]
        ? CONFIG.eventos.dificuldadesSuperBosses : CONFIG.eventos.dificuldadesNormais;
    return dificuldades[mapaPersonalizadoAtivo?.dificuldadeEvento] || dificuldades.facil;
}

function obterRegraDaDificuldadeDoEvento(chave, valorFacil) {
    return obterDificuldadeDoEvento()[chave] ?? valorFacil;
}

function obterIntervaloDaAcaoDoChefe(id) {
    const intervaloBase = id === 'caixaSurpresa' ? CONFIG.eventos.intervaloReforcoChefeCaixasMs
        : id === 'roleta' ? CONFIG.eventos.intervaloReparoChefeRoletaMs
            : CONFIG.eventos.intervaloMeteoroChefeMs;
    return Math.round(intervaloBase * obterRegraDaDificuldadeDoEvento('multiplicadorIntervaloChefe', 1));
}

function obterFragmentosDaDificuldadeDoEvento(id, dificuldade = 'facil') {
    const superBoss = Boolean(CONFIG.eventos.elencosSuperBosses[id]);
    const dificuldades = superBoss
        ? CONFIG.eventos.dificuldadesSuperBosses : CONFIG.eventos.dificuldadesNormais;
    return (superBoss ? CONFIG.eventos.fragmentosPorVitoriaSuperBosses
        : CONFIG.eventos.fragmentosPorVitoria)
        + (dificuldades[dificuldade]?.fragmentosExtras || 0);
}

function atualizarPremioNoCartaoDoEvento(id) {
    const cartao = conteudoMenu.querySelector(`.cartao-evento[data-evento="${id}"]`);
    const dificuldade = cartao?.querySelector('select')?.value || 'facil';
    const fragmentos = obterFragmentosDaDificuldadeDoEvento(id, dificuldade);
    cartao?.querySelectorAll('[data-fragmentos-evento]').forEach(elemento => {
        elemento.textContent = fragmentos;
    });
}

function mostrarEventos() {
    if (jogoIniciado) return;
    definirTelaDoMenuAberta('eventos');
    const criarCartaoDoEvento = evento => {
        const skin = evento.skin && CONFIG.missoes.skins[evento.skin];
        const temSkin = skin && recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes(evento.skin);
        const dificuldades = CONFIG.eventos.elencosSuperBosses[evento.id]
            ? CONFIG.eventos.dificuldadesSuperBosses : CONFIG.eventos.dificuldadesNormais;
        const seletor = `<label class="rotulo-dificuldade-evento" for="dificuldade-evento-${evento.id}">${localizarEvento('Dificuldade')}</label>
            <select id="dificuldade-evento-${evento.id}" class="seletor-dificuldade-evento" onchange="atualizarPremioNoCartaoDoEvento('${evento.id}')">
                ${Object.entries(dificuldades).map(([id, configuracao]) =>
                    `<option value="${id}">${localizarEvento(configuracao.nome)}</option>`).join('')}
            </select>`;
        const acao = `jogarEvento('${evento.id}', document.getElementById('dificuldade-evento-${evento.id}').value)`;
        const regraDeRenda = CONFIG.eventos.economiaSuperBosses;
        const textoEconomia = CONFIG.eventos.elencosSuperBosses[evento.id]
            ? localizarEvento('Renda por tiros: {limite} créditos na wave 1; +{aumento} por wave.', {
                limite: regraDeRenda.limiteInicialPorWave, aumento: regraDeRenda.aumentoPorWave
            }) : '';
        return `<article class="cartao-evento" data-evento="${evento.id}"><h3>${localizarEvento(evento.nome)}</h3><p>${localizarEvento(evento.descricao)}</p>
            <p>${localizarEvento('Vitórias: {quantidade}', { quantidade: vitoriasDosEventos[evento.id] })}</p>
            <p><strong>${localizarEvento('Primeira vitória')}:</strong> <span data-fragmentos-evento>${obterFragmentosDaDificuldadeDoEvento(evento.id)}</span> ${localizarEvento('Fragmentos de Pixel')}${skin ? ` · ${localizarEvento(skin.nome)}` : ''}${evento.torre ? ` · ${localizarEvento(CONFIG.torre.tipos[evento.torre].nome)}` : ''}</p>
            <p><strong>${localizarEvento('Vitórias posteriores')}:</strong> <span data-fragmentos-evento>${obterFragmentosDaDificuldadeDoEvento(evento.id)}</span> ${localizarEvento('Fragmentos de Pixel')}${temSkin ? ` · ${localizarEvento('Skin já obtida')}` : ''}</p>
            ${CONFIG.eventos.premioDasTorresSuperBosses[evento.torre]
                ? `<p>${localizarEvento('Dano da torre: Fácil +5%, Médio +10%, Difícil +15% (maior vitória).')}</p>` : ''}
            ${CONFIG.eventos.eventoDasSkinsSuperBosses[evento.skin]
                ? `<p>${localizarEvento('Visual da skin evolui com a maior dificuldade vencida.')}</p>` : ''}
            ${seletor}${CONFIG.eventos.elencosSuperBosses[evento.id]
                ? `<p>${localizarEvento(evento.id === 'superBossesMetamorfos'
                    ? 'No Médio e no Difícil, o Metamorfo se adapta às suas defesas.'
                    : 'No Médio e no Difícil, o chefe ganha um segundo ataque.')}</p>` : ''}
            ${evento.id === 'idadeDaPedra' ? `<p>${localizarEvento(torreEstaDesbloqueada('catapulta')
                ? 'Torres disponíveis: Padrão, Besta, Canhão pesado e Catapulta.'
                : 'Torres disponíveis: Padrão, Besta e Canhão pesado.')}</p>` : ''}
            ${textoEconomia ? `<p>${textoEconomia}</p>` : ''}
            <button class="botao botao-primario" type="button" onclick="${acao}">${localizarEvento('Jogar evento')}</button></article>`;
    };
    const normais = EVENTOS_DISPONIVEIS.filter(evento => !CONFIG.eventos.elencosSuperBosses[evento.id]);
    const superBosses = EVENTOS_DISPONIVEIS.filter(evento => CONFIG.eventos.elencosSuperBosses[evento.id]);
    conteudoMenu.innerHTML = `${criarCabecalhoConteudoMenu(localizarEvento('Eventos'), localizarEvento('Todos disponíveis durante os testes. A frequência futura ainda será escolhida.'))}
        <section class="grupo-eventos"><h3>${localizarEvento('Eventos normais')}</h3><div class="grade-eventos">${normais.map(criarCartaoDoEvento).join('')}</div></section>
        <section class="grupo-eventos grupo-eventos-superbosses"><h3>${localizarEvento('Superbosses')}</h3>
            <p>${localizarEvento('Enfrente subordinados e sobreviva até a wave 20.')}</p>
            <div class="grade-eventos">${superBosses.map(criarCartaoDoEvento).join('')}</div></section>`;
}

function jogarEvento(id, dificuldade = 'facil') {
    const evento = EVENTOS_DISPONIVEIS.find(item => item.id === id);
    if (!evento || jogoIniciado) return;
    const dificuldades = CONFIG.eventos.elencosSuperBosses[id]
        ? CONFIG.eventos.dificuldadesSuperBosses : CONFIG.eventos.dificuldadesNormais;
    if (!dificuldades[dificuldade]) return;
    if (mapaPersonalizadoAtivo) desativarMapaPersonalizado();
    faseSelecionadaAntesDoMapaPersonalizado = faseSelecionada;
    const caminho = CONFIG.editorDeFases.caminhos[0];
    const cenario = CONFIG.editorDeFases.cenarios[0];
    mapaPersonalizadoAtivo = {
        evento: id, nome: localizarEvento(evento.nome), descricao: localizarEvento(evento.descricao),
        dificuldadeEvento: dificuldade,
        criador: localizarEvento('Eventos'), tema: cenario.id, idDoCaminho: caminho.id,
        creditosIniciais: id === 'roleta' ? CONFIG.eventos.creditosIniciaisRoleta
            : id === 'meteoros' ? CONFIG.eventos.creditosIniciaisMeteoros
                : CONFIG.eventos.elencosSuperBosses[id] ? CONFIG.eventos.creditosIniciaisBosses : CONFIG.economia.dinheiroInicial,
        limiteDeTorres: dificuldades[dificuldade].limiteDeTorres || CONFIG.eventos.limiteDeTorres,
        nivelDeDecoracoes: 0,
        waves: Array.from({ length: CONFIG.eventos.elencosSuperBosses[id] ? CONFIG.eventos.wavesSuperBosses
            : id === 'meteoros' ? CONFIG.eventos.gruposMeteoros : CONFIG.eventos.waves }, (_, indice) => {
            const numero = indice + 1;
            const elencoSuperBoss = CONFIG.eventos.elencosSuperBosses[id];
            const elencoNormal = CONFIG.eventos.elencosNormais[id];
            const extras = dificuldades[dificuldade].inimigosExtrasPorFaixa * Math.floor((numero - 1) / 4);
            const grupos = [{ tipo: (elencoSuperBoss || elencoNormal).comuns[0], quantidade: 2 + numero + extras }];
            if (numero >= 3) grupos.push({ tipo: (elencoSuperBoss || elencoNormal).comuns[1],
                quantidade: Math.floor(numero / 3) * (elencoSuperBoss ? dificuldades[dificuldade].multiplicadorSegundoGrupo || 1 : 1) });
            if (elencoSuperBoss && numero % CONFIG.eventos.intervaloDosSubordinados === 0) {
                grupos.push({ tipo: elencoSuperBoss.chefes[numero / CONFIG.eventos.intervaloDosSubordinados - 1], quantidade: 1 });
            } else if (elencoNormal && numero === (id === 'meteoros'
                ? CONFIG.eventos.gruposMeteoros : CONFIG.eventos.waves)) {
                grupos.push({ tipo: elencoNormal.chefe, quantidade: 1 });
            }
            return { grupos };
        })
    };
    origemDoMapaPersonalizadoAtivo = 'eventos';
    faseSelecionada = CONFIG.editorDeFases.numeroInterno;
    iniciarPartida(false);
}

function avisarChegadaDoSuperBossDoEvento(numeroDaWave) {
    const elenco = CONFIG.eventos.elencosSuperBosses[mapaPersonalizadoAtivo?.evento];
    if (!elenco) return;
    const restantes = CONFIG.eventos.wavesSuperBosses - numeroDaWave;
    if (restantes > CONFIG.eventos.rodadasDeAvisoSuperBoss || restantes < 0) return;
    const nome = localizar(CONFIG.inimigo[elenco.chefes.at(-1)].nome);
    const texto = restantes === 0 ? '{nome} chegou!'
        : restantes === 1 ? 'Daqui a 1 rodada, {nome} está vindo!'
            : 'Daqui a {rodadas} rodadas, {nome} está vindo!';
    mostrarAviso(localizarEvento(texto, {
        nome, rodadas: restantes
    }));
}

function reiniciarMecanicaDoEvento() {
    tempoDoEventoMs = 0;
    proximaCaixaEm = CONFIG.eventos.intervaloCaixasMs / 2;
    proximoMeteoroEm = obterRegraDaDificuldadeDoEvento('intervaloMeteorosMs', CONFIG.eventos.intervaloMeteorosMs);
    numeroDaChuvaDeMeteoros = 0;
    caixasAbertasNoEvento = 0;
    girosDaRoletaNoEvento = 0;
    caixasDoEvento = [];
    defesasPendentesDoEvento = [];
    meteorosDoEvento = [];
    craterasDoEvento = [];
    proximaEvacuacaoDeTorreEm = 0;
    alternativaDaCaixaPendente = null;
    queimadurasDasTorresDoEvento = [];
    cuspesAcidosDoEvento = [];
    torresCorroidasDoEvento = [];
    torresDerretendoDoEvento = [];
    fecharRoletaDoEvento();
}

function iniciarMecanicaDoEvento() {
    const botao = document.getElementById('botao-roleta-evento');
    botao.hidden = mapaPersonalizadoAtivo?.evento !== 'roleta';
    atualizarAcaoDoEvento();
    atualizarIndicadorDeSobrevivencia();
    if (mapaPersonalizadoAtivo?.evento === 'caixaSurpresa') criarCaixaDoEvento();
}

function encerrarMecanicaDoEvento() {
    fecharRoletaDoEvento();
    document.getElementById('botao-roleta-evento').hidden = true;
    caixasDoEvento = [];
    defesasPendentesDoEvento = [];
    meteorosDoEvento = [];
    craterasDoEvento = [];
    alternativaDaCaixaPendente = null;
    document.getElementById('botao-acao-evento').hidden = true;
    document.getElementById('indicador-sobrevivencia-meteoros').hidden = true;
    queimadurasDasTorresDoEvento = [];
    cuspesAcidosDoEvento = [];
    torresCorroidasDoEvento = [];
    torresDerretendoDoEvento = [];
}

function escolherPosicaoLivreDoEvento(tipo = 'padrao') {
    for (let tentativa = 0; tentativa < 100; tentativa++) {
        const x = 65 + Math.random() * (canvas.width - 130);
        const y = 125 + Math.random() * (canvas.height - 190);
        if (!terrenoPermiteDefesa(tipo, x, y) || estaNoCaminho(x, y)
            || construcaoSobreDecoracao(x, y) || estaPertoDeOutraTorreOuBomba(x, y)
            || caixasDoEvento.some(caixa => Math.hypot(caixa.x - x, caixa.y - y) < 32)) continue;
        return { x, y };
    }
    return null;
}

function sortearTorreDoEvento(tipoExcluido = null) {
    const pesos = Object.entries(CONFIG.torre.tipos)
        .filter(([tipo, configuracao]) => tipo !== tipoExcluido && !configuracao.suprema && !configuracao.aquatica
            && !['mina', 'bomba'].includes(configuracao.tipoDeItem)
            && !atingiuLimiteDoTipoDeTorre(tipo)
            && (!configuracao.limitePorPartida || obterQuantidadeConstruidaDoTipo(tipo)
                + defesasPendentesDoEvento.filter(defesa => defesa === tipo).length
                + caixasDoEvento.filter(caixa => caixa.tipo === tipo).length < configuracao.limitePorPartida))
        .map(([tipo, configuracao]) => [tipo, Math.max(1, 600 / Math.max(100, configuracao.custo))]);
    if (!pesos.length) return null;
    let sorteio = Math.random() * pesos.reduce((total, [, peso]) => total + peso, 0);
    for (const [tipo, peso] of pesos) {
        sorteio -= peso;
        if (sorteio < 0) return tipo;
    }
    return pesos.at(-1)[0];
}

function concederDefesaDoEvento(tipo) {
    if (atingiuLimiteDoTipoDeTorre(tipo)) return false;
    if (tipo !== 'minaTerrestre' && torres.length + defesasPendentesDoEvento.filter(defesa => defesa !== 'minaTerrestre').length >= obterLimiteDeTorres()) return false;
    defesasPendentesDoEvento.push(tipo);
    if (mapaPersonalizadoAtivo?.evento === 'caixaSurpresa' && defesasPendentesDoEvento.length === 1) {
        alternativaDaCaixaPendente = sortearTorreDoEvento(tipo);
    }
    atualizarAcaoDoEvento();
    return true;
}

function criarCaixaDoEvento() {
    if (torres.length + defesasPendentesDoEvento.length + caixasDoEvento.length >= obterLimiteDeTorres()) return;
    const tipo = sortearTorreDoEvento();
    if (!tipo) return;
    const posicao = escolherPosicaoLivreDoEvento(tipo);
    if (posicao) caixasDoEvento.push({ ...posicao, tipo, progresso: 0, cor: ['#e65d6b', '#6caefa', '#ffd667', '#9ee78d'][Math.floor(Math.random() * 4)] });
}

function atualizarAcaoDoEvento() {
    const botao = document.getElementById('botao-acao-evento');
    const id = mapaPersonalizadoAtivo?.evento;
    if (!jogoIniciado || partidaEncerrada || !['meteoros', 'caixaSurpresa', 'roleta'].includes(id)) {
        botao.hidden = true;
        return;
    }
    if (id === 'meteoros') {
        botao.hidden = false;
        const segundos = Math.ceil(Math.max(0, proximaEvacuacaoDeTorreEm - tempoDoEventoMs) / 1000);
        botao.textContent = segundos > 0
            ? localizarEvento('Evacuar torre ({segundos}s)', { segundos })
            : localizarEvento('Evacuar torre selecionada');
        botao.disabled = jogoPausado || !torreSelecionada || segundos > 0;
    } else if (id === 'caixaSurpresa') {
        botao.hidden = !defesasPendentesDoEvento.length || !alternativaDaCaixaPendente;
        if (!botao.hidden) botao.textContent = localizarEvento('Trocar por {nome}', {
            nome: obterNomeLocalizado(obterConfiguracaoDaTorre(alternativaDaCaixaPendente))
        });
        botao.disabled = jogoPausado;
    } else {
        botao.hidden = !defesasPendentesDoEvento.length || roletaDoEventoAberta;
        if (!botao.hidden) botao.textContent = localizarEvento('Trocar prêmio por {creditos} créditos', {
            creditos: CONFIG.eventos.creditosDaTrocaNaRoleta
        });
        botao.disabled = jogoPausado;
    }
}

function executarAcaoDoEvento() {
    if (!jogoIniciado || partidaEncerrada || jogoPausado) return;
    const id = mapaPersonalizadoAtivo?.evento;
    if (id === 'meteoros') {
        if (!torreSelecionada || !torres.includes(torreSelecionada)
            || tempoDoEventoMs < proximaEvacuacaoDeTorreEm) return;
        let posicao = null;
        for (let tentativa = 0; tentativa < 20 && !posicao; tentativa++) {
            const candidata = escolherPosicaoLivreDoEvento(torreSelecionada.tipo);
            if (candidata && Math.hypot(candidata.x - torreSelecionada.x,
                candidata.y - torreSelecionada.y) >= CONFIG.eventos.raioMeteoro + CONFIG.eventos.raioCrateraMeteoros
                && !meteorosDoEvento.some(meteoro => meteoro.progresso < 1
                    && Math.hypot(candidata.x - meteoro.x, candidata.y - meteoro.y)
                        <= CONFIG.eventos.raioMeteoro)) posicao = candidata;
        }
        if (!posicao) {
            mostrarAviso(localizarEvento('Sem posição segura para evacuar a torre.'));
            return;
        }
        torreSelecionada.x = posicao.x;
        torreSelecionada.y = posicao.y;
        torreSelecionada.alvoAtual = null;
        proximaEvacuacaoDeTorreEm = tempoDoEventoMs + CONFIG.eventos.intervaloEvacuacaoMeteorosMs;
        mostrarAviso(localizarEvento('Torre evacuada!'));
    } else if (id === 'caixaSurpresa' && defesasPendentesDoEvento.length && alternativaDaCaixaPendente) {
        defesasPendentesDoEvento[0] = alternativaDaCaixaPendente;
        alternativaDaCaixaPendente = null;
        mostrarAviso(localizarEvento('Defesa trocada. Escolha onde colocá-la.'));
    } else if (id === 'roleta' && !roletaDoEventoAberta && defesasPendentesDoEvento.length) {
        defesasPendentesDoEvento.shift();
        const creditosRecebidos = concederCreditosNaPartida(CONFIG.eventos.creditosDaTrocaNaRoleta);
        mostrarAviso(localizarEvento('Prêmio trocado por {creditos} créditos.', {
            creditos: creditosRecebidos
        }));
    }
    atualizarAcaoDoEvento();
}

function atualizarIndicadorDeSobrevivencia() {
    const indicador = document.getElementById('indicador-sobrevivencia-meteoros');
    const ativo = mapaPersonalizadoAtivo?.evento === 'meteoros' && !partidaEncerrada;
    indicador.hidden = !ativo;
    if (!ativo) return;
    const segundos = Math.max(0, Math.ceil(
        (CONFIG.eventos.duracaoSobrevivenciaMeteorosMs - tempoDoEventoMs) / 1000
    ));
    const tempo = `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`;
    indicador.textContent = localizarEvento('Sobreviva: {tempo}', { tempo });
}

function estaEmCrateraDoEvento(x, y) {
    return mapaPersonalizadoAtivo?.evento === 'meteoros'
        && craterasDoEvento.some(cratera => cratera.expiraEm > tempoDoEventoMs
            && Math.hypot(cratera.x - x, cratera.y - y) < CONFIG.eventos.raioCrateraMeteoros);
}

function criarMeteoroDoEvento() {
    return {
        x: 45 + Math.random() * (canvas.width - 90),
        y: 120 + Math.random() * (canvas.height - 165),
        progresso: 0,
        explosao: 0
    };
}

function atualizarMecanicaDoEvento(multiplicador) {
    const id = mapaPersonalizadoAtivo?.evento;
    if (!id || partidaEncerrada) return;
    const passo = multiplicador * 1000 / CONFIG.simulacao.quadrosPorSegundoDeReferencia;
    tempoDoEventoMs += passo;
    if (id === 'caixaSurpresa') {
        if (tempoDoEventoMs >= proximaCaixaEm) {
            criarCaixaDoEvento();
            proximaCaixaEm += CONFIG.eventos.intervaloCaixasMs;
        }
        for (const caixa of caixasDoEvento) caixa.progresso = Math.min(1, caixa.progresso + passo / CONFIG.eventos.quedaMeteoroMs);
    }
    if (id === 'meteoros') {
        craterasDoEvento = craterasDoEvento.filter(cratera => cratera.expiraEm > tempoDoEventoMs);
        if (tempoDoEventoMs >= CONFIG.eventos.duracaoSobrevivenciaMeteorosMs
            && wave >= CONFIG.eventos.gruposMeteoros
            && inimigosParaCriar === 0
            && !inimigos.some(inimigo => inimigo.tipo === CONFIG.eventos.elencosNormais.meteoros.chefe)) {
            atualizarIndicadorDeSobrevivencia();
            finalizarPartidaComVitoria();
            return;
        }
        if (inimigosParaCriar === 0 && wave < CONFIG.eventos.gruposMeteoros
            && tempoDoEventoMs >= wave * CONFIG.eventos.intervaloGruposMeteorosMs) {
            iniciarProximaWave();
        }
        if (tempoDoEventoMs >= proximoMeteoroEm) {
            const primeiro = criarMeteoroDoEvento();
            meteorosDoEvento.push(primeiro);
            numeroDaChuvaDeMeteoros++;
            const chuvaDirecionada = numeroDaChuvaDeMeteoros
                % obterRegraDaDificuldadeDoEvento('intervaloChuvasDirecionadasMeteoros',
                    CONFIG.eventos.intervaloChuvasDirecionadasMeteoros) === 0 && torres.length > 0;
            if (chuvaDirecionada) {
                const alvo = torres[Math.floor(Math.random() * torres.length)];
                primeiro.x = alvo.x;
                primeiro.y = alvo.y;
            }
            const chuvaDupla = numeroDaChuvaDeMeteoros
                % obterRegraDaDificuldadeDoEvento('intervaloChuvasDuplasMeteoros',
                    CONFIG.eventos.intervaloChuvasDuplasMeteoros) === 0;
            if (chuvaDupla) {
                let segundo = criarMeteoroDoEvento();
                for (let tentativa = 0; tentativa < 12
                    && Math.hypot(segundo.x - primeiro.x, segundo.y - primeiro.y)
                        < CONFIG.eventos.distanciaMinimaEntreMeteorosDaChuva; tentativa++) {
                    segundo = criarMeteoroDoEvento();
                }
                if (Math.hypot(segundo.x - primeiro.x, segundo.y - primeiro.y)
                    < CONFIG.eventos.distanciaMinimaEntreMeteorosDaChuva) {
                    segundo.x = primeiro.x < canvas.width / 2 ? canvas.width - 45 : 45;
                    segundo.y = primeiro.y < canvas.height / 2 ? canvas.height - 45 : 120;
                }
                meteorosDoEvento.push(segundo);
            }
            proximoMeteoroEm += obterRegraDaDificuldadeDoEvento('intervaloMeteorosMs',
                CONFIG.eventos.intervaloMeteorosMs);
            mostrarAviso(localizarEvento(chuvaDirecionada ? 'Meteoro mirando uma torre!'
                : chuvaDupla ? 'Dois meteoros a caminho!' : 'Meteoro a caminho!'));
        }
        for (const meteoro of meteorosDoEvento) {
            if (meteoro.progresso < 1) {
                meteoro.progresso = Math.min(1, meteoro.progresso + passo / CONFIG.eventos.quedaMeteoroMs);
                if (meteoro.progresso === 1) aplicarImpactoDoMeteoro(meteoro);
            } else meteoro.explosao += passo;
        }
        meteorosDoEvento = meteorosDoEvento.filter(meteoro => meteoro.progresso < 1 || meteoro.explosao < 550);
        atualizarIndicadorDeSobrevivencia();
    }
    if (CONFIG.eventos.elencosSuperBosses[id]) atualizarAtaquesDosSuperBosses(passo);
    if (CONFIG.eventos.elencosNormais[id]) atualizarAcoesDosChefesNormais();
    atualizarAcaoDoEvento();
    atualizarQueimadurasDasTorresDoEvento();
}

function aplicarImpactoDoMeteoro(meteoro) {
    const atingido = objeto => Math.hypot(objeto.x - meteoro.x, objeto.y - meteoro.y) <= CONFIG.eventos.raioMeteoro;
    const torreAnterior = torreSelecionada;
    torres = torres.filter(torre => !atingido(torre));
    minasTerrestres = minasTerrestres.filter(mina => !atingido(mina));
    bombasPesadas = bombasPesadas.filter(bomba => !atingido(bomba));
    for (const inimigo of inimigos) {
        if (atingido(inimigo) && obterIdDoEventoDoInimigo(inimigo.tipo) === 'meteoros') {
            registrarInimigoDerrotadoNoAlbum(inimigo.tipo);
        }
    }
    inimigos = inimigos.filter(inimigo => !atingido(inimigo));
    craterasDoEvento.push({ x: meteoro.x, y: meteoro.y,
        expiraEm: tempoDoEventoMs + CONFIG.eventos.duracaoCrateraMeteorosMs });
    if (torreAnterior && !torres.includes(torreAnterior)) {
        torreSelecionada = null;
        atualizarBotoesDaTorre();
    }
}

function ajustarInimigoDoEvento(inimigo) {
    const id = mapaPersonalizadoAtivo?.evento;
    const elencoNormal = CONFIG.eventos.elencosNormais[id];
    if (elencoNormal && id !== 'idadeDaPedra' && inimigo.tipo === elencoNormal.chefe) {
        inimigo.proximaAcaoDeEventoEm = tempoDoEventoMs + obterIntervaloDaAcaoDoChefe(id);
    }
    if (elencoNormal
        && wave >= CONFIG.eventos.inimigosEventosNormais.primeiraWave) {
        inimigo.vida = Math.round(inimigo.vida * CONFIG.eventos.inimigosEventosNormais.multiplicadorVida
            * obterDificuldadeDoEvento().multiplicadorVida);
        inimigo.vidaMaxima = inimigo.vida;
        inimigo.velocidade *= CONFIG.eventos.inimigosEventosNormais.multiplicadorVelocidade
            * obterDificuldadeDoEvento().multiplicadorVelocidade;
        return;
    }
    if (!CONFIG.eventos.elencosSuperBosses[id]) return;
    const ehSuperBossFinal = CONFIG.inimigo[inimigo.tipo]?.superBossDeEvento;
    if (ehSuperBossFinal) {
        inimigo.vida *= CONFIG.eventos.multiplicadorVidaSuperBoss;
        inimigo.superBoss = true;
        inimigo.proximoAtaqueDeEventoEm = tempoDoEventoMs + obterIntervaloDeAtaqueDoSuperBoss();
        if (inimigo.tipo === 'metamorfo') {
            const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos;
            const dificuldade = mapaPersonalizadoAtivo.dificuldadeEvento;
            inimigo.proximaTransformacaoEm = tempoDoEventoMs + (dificuldade === 'dificil'
                ? regra.intervaloFormaDificilMs : dificuldade === 'medio'
                    ? regra.intervaloFormaMedioMs : regra.intervaloFormaFacilMs);
        }
        if (obterDificuldadeDoEvento().ataqueSecundario) {
            inimigo.proximoAtaqueSecundarioEm = tempoDoEventoMs + obterIntervaloDoAtaqueSecundario(id);
        }
    }
    const vidaFinalConfigurada = ehSuperBossFinal
        ? CONFIG.eventos.vidasFinaisDosSuperBosses[mapaPersonalizadoAtivo.dificuldadeEvento]?.[inimigo.tipo]
        : null;
    inimigo.vida = vidaFinalConfigurada
        ?? Math.round(inimigo.vida * obterDificuldadeDoEvento().multiplicadorVida);
    inimigo.vidaMaxima = inimigo.vida;
    inimigo.velocidade *= obterDificuldadeDoEvento().multiplicadorVelocidade;
}

function obterIntervaloDeAtaqueDoSuperBoss() {
    return Math.round(CONFIG.eventos.intervaloAtaqueSuperBossMs
        * obterDificuldadeDoEvento().multiplicadorIntervaloAtaque);
}

function obterIntervaloDoAtaqueSecundario(id) {
    const regra = CONFIG.eventos.ataquesSecundariosSuperBoss[id];
    return mapaPersonalizadoAtivo?.dificuldadeEvento === 'dificil'
        ? regra.intervaloDificilMs : regra.intervaloMedioMs;
}

function obterMultiplicadorDaFuriaDasCinzas(inimigo) {
    if (mapaPersonalizadoAtivo?.evento !== 'superBosses'
        || tempoDoEventoMs >= (inimigo.furiaDasCinzasExpiraEm || 0)) return 1;
    const regra = CONFIG.eventos.ataquesSecundariosSuperBoss.superBosses;
    return mapaPersonalizadoAtivo.dificuldadeEvento === 'dificil'
        ? regra.multiplicadorVelocidadeDificil : regra.multiplicadorVelocidadeMedio;
}

function obterMultiplicadorDaTrocaDePele(inimigo) {
    if (inimigo.tipo !== 'viboraAcida' || !inimigos.includes(inimigo.carcacaAtiva)
        || inimigo.carcacaAtiva.vida <= 0) return 1;
    return CONFIG.eventos.ataquesSecundariosSuperBoss.superBossesAcidos.multiplicadorVelocidade;
}

function obterMultiplicadorDaFormaDoMetamorfo(inimigo) {
    if (inimigo.tipo !== 'metamorfo') return 1;
    const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos;
    if (tempoDoEventoMs < (inimigo.casuloAte || 0)) return 0;
    return inimigo.formaMetamorfo === 'ciano' ? regra.multiplicadorVelocidadeCiano : 1;
}

function obterReducaoDoMetamorfo(inimigo, defesa) {
    if (inimigo.tipo !== 'metamorfo') return 0;
    const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos;
    const armadura = inimigo.armaduraMetamorfo ? regra.reducaoDaArmadura : 0;
    const adaptacao = defesa && defesa === inimigo.defesaAdaptada
        ? CONFIG.eventos.ataquesSecundariosSuperBoss.superBossesMetamorfos.reducaoAdaptacao : 0;
    return Math.min(regra.reducaoTotalMaxima, 1 - (1 - armadura) * (1 - adaptacao));
}

function atualizarMetamorfo(chefe, passo) {
    const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos;
    const dificuldade = mapaPersonalizadoAtivo.dificuldadeEvento;
    const intervalo = dificuldade === 'dificil' ? regra.intervaloFormaDificilMs
        : dificuldade === 'medio' ? regra.intervaloFormaMedioMs : regra.intervaloFormaFacilMs;
    if (!chefe.proximaTransformacaoEm) chefe.proximaTransformacaoEm = tempoDoEventoMs + intervalo;
    if (tempoDoEventoMs >= chefe.proximaTransformacaoEm) {
        const formas = ['ciano', 'sabotador', 'artico', 'curador'];
        chefe.formaMetamorfoAnterior = chefe.formaMetamorfo || null;
        chefe.corAnteriorMetamorfo = chefe.cor;
        chefe.indiceDaForma = ((chefe.indiceDaForma ?? -1) + 1) % formas.length;
        chefe.formaMetamorfo = formas[chefe.indiceDaForma];
        chefe.cor = { ciano: '#51dcf0', sabotador: '#5aa7a0',
            artico: '#a6d8f6', curador: '#b49ad9' }[chefe.formaMetamorfo];
        chefe.armaduraMetamorfo = Math.random() < regra.chanceDeArmadura;
        chefe.casuloAte = tempoDoEventoMs + regra.duracaoCasuloMs;
        chefe.proximaTransformacaoEm = tempoDoEventoMs + intervalo;
        if (dificuldade !== 'facil') {
            const danos = Object.entries(chefe.danosPorDefesa || {});
            chefe.defesaAdaptada = danos.sort((a, b) => b[1] - a[1])[0]?.[0] || null;
        }
        chefe.danosPorDefesa = {};
        mostrarAviso(localizarEvento('O Metamorfo assumiu a forma {forma}!', {
            forma: localizarEvento({ ciano: 'Ciano rápido', sabotador: 'Sabotador',
                artico: 'Titã Glacial', curador: 'Curador do Vazio' }[chefe.formaMetamorfo])
        }));
        if (chefe.armaduraMetamorfo) mostrarAviso(localizarEvento('O Metamorfo ganhou uma carapaça blindada!'));
    }
    if (tempoDoEventoMs < (chefe.casuloAte || 0)) return;
    if (chefe.formaMetamorfo === 'sabotador') {
        if (tempoDoEventoMs >= (chefe.proximoTiroMetamorfoEm || 0)) {
            const alvo = encontrarAlvoParaInimigoAtirador(chefe, regra.alcanceTiroSabotador);
            if (alvo) {
                tirosDosInimigos.push({ x: chefe.x, y: chefe.y, alvo,
                    velocidade: CONFIG.inimigo.sabotador.velocidadeTiro,
                    tipoDoInimigo: 'metamorfo' });
            }
            chefe.proximoTiroMetamorfoEm = tempoDoEventoMs + regra.intervaloTiroSabotadorMs;
        }
    } else if (chefe.formaMetamorfo === 'artico'
        && tempoDoEventoMs >= (chefe.proximoGeloMetamorfoEm || 0)) {
        const alvo = obterTorresAoAlcanceDoSuperBoss(chefe)[0];
        if (alvo) alvo.estaseTemporalExpiraEm = Math.max(alvo.estaseTemporalExpiraEm || 0,
            Date.now() + regra.duracaoGeloArticoMs);
        chefe.proximoGeloMetamorfoEm = tempoDoEventoMs + regra.intervaloGeloArticoMs;
    } else if (chefe.formaMetamorfo === 'curador' && chefe.vida < chefe.vidaMaxima) {
        const limite = chefe.vidaMaxima * regra.limiteTotalDeCura;
        const disponivel = Math.max(0, limite - (chefe.vidaCurada || 0));
        const cura = Math.min(disponivel, chefe.vidaMaxima * regra.curaFormaCuradorPorSegundo * passo / 1000);
        chefe.vida += cura;
        chefe.vidaCurada = (chefe.vidaCurada || 0) + cura;
    }
}

function criarCarcacaDaVibora(chefe) {
    const regra = CONFIG.eventos.ataquesSecundariosSuperBoss.superBossesAcidos;
    const configuracao = CONFIG.inimigo.carcacaDaVibora;
    const carcaca = { tipo: 'carcacaDaVibora', carcacaDaVibora: true, invocadoSemNucleo: true,
        indiceDoCaminho: chefe.indiceDoCaminho, x: chefe.x, y: chefe.y, alvo: chefe.alvo,
        velocidade: 0, tamanho: configuracao.tamanho, cor: configuracao.cor,
        vida: regra.vidaDaCarcaca, vidaMaxima: regra.vidaDaCarcaca,
        expiraEm: tempoDoEventoMs + regra.duracaoDaCarcacaMs, dono: chefe };
    chefe.carcacaAtiva = carcaca;
    inimigos.push(carcaca);
}

function criarTorretaDaForja(chefe) {
    const regra = CONFIG.eventos.ataquesSecundariosSuperBoss.superBossesMecanicos;
    const configuracao = CONFIG.inimigo.torretaDaForja;
    const x = Math.max(35, Math.min(canvas.width - 35, chefe.x + regra.deslocamentoX));
    const y = Math.max(35, Math.min(canvas.height - 35, chefe.y + regra.deslocamentoY));
    inimigos.push({ tipo: 'torretaDaForja', torretaDaForja: true, invocadoSemNucleo: true,
        indiceDoCaminho: chefe.indiceDoCaminho, x, y, alvo: chefe.alvo,
        velocidade: 0, tamanho: configuracao.tamanho, cor: configuracao.cor,
        vida: configuracao.vida, vidaMaxima: configuracao.vida,
        proximoTiroEm: tempoDoEventoMs + (mapaPersonalizadoAtivo.dificuldadeEvento === 'dificil'
            ? regra.intervaloTiroDificilMs : regra.intervaloTiroMedioMs) });
}

function atualizarAtaqueSecundarioDoSuperBoss(chefe) {
    const id = mapaPersonalizadoAtivo.evento;
    const regra = CONFIG.eventos.ataquesSecundariosSuperBoss[id];
    if (tempoDoEventoMs < chefe.proximoAtaqueSecundarioEm) return;
    chefe.proximoAtaqueSecundarioEm += obterIntervaloDoAtaqueSecundario(id);
    const dificil = mapaPersonalizadoAtivo.dificuldadeEvento === 'dificil';
    if (id === 'superBosses') {
        for (const inimigo of inimigos) {
            if (inimigo.vida > 0 && Math.hypot(inimigo.x - chefe.x, inimigo.y - chefe.y)
                <= regra.raioFuria) {
                inimigo.furiaDasCinzasExpiraEm = tempoDoEventoMs + regra.duracaoFuriaMs;
            }
        }
        mostrarAviso(localizarEvento('O Soberano despertou a Fúria das Cinzas!'));
    } else if (id === 'superBossesMecanicos') {
        if (!inimigos.some(inimigo => inimigo.torretaDaForja && inimigo.vida > 0)) {
            criarTorretaDaForja(chefe);
            mostrarAviso(localizarEvento('O Titã construiu uma torreta!'));
        }
    } else if (id === 'superBossesAcidos') {
        if (!inimigos.includes(chefe.carcacaAtiva) || chefe.carcacaAtiva.vida <= 0) {
            criarCarcacaDaVibora(chefe);
            mostrarAviso(localizarEvento('A Víbora deixou uma carcaça no caminho!'));
        }
    } else {
        const ativos = inimigos.filter(inimigo => inimigo.invocadoPeloLeviata && inimigo.vida > 0).length;
        const quantidade = Math.min(regra.maximoReforcos - ativos,
            dificil ? regra.reforcosDificil : regra.reforcosMedio);
        for (let indice = 0; indice < quantidade; indice++) {
            criarInimigoInvocado(CONFIG.eventos.elencosSuperBosses[id].comuns[0], chefe,
                (indice - (quantidade - 1) / 2) * 20);
            const reforco = inimigos.at(-1);
            reforco.invocadoPeloLeviata = true;
            ajustarInimigoDoEvento(reforco);
        }
        if (quantidade > 0) mostrarAviso(localizarEvento('O Leviatã chamou enguias abissais!'));
    }
}

function atualizarTorretaDaForja() {
    const regra = CONFIG.eventos.ataquesSecundariosSuperBoss.superBossesMecanicos;
    const intervalo = mapaPersonalizadoAtivo.dificuldadeEvento === 'dificil'
        ? regra.intervaloTiroDificilMs : regra.intervaloTiroMedioMs;
    for (const torreta of inimigos.filter(inimigo => inimigo.torretaDaForja && inimigo.vida > 0)) {
        if (tempoDoEventoMs < torreta.proximoTiroEm) continue;
        torreta.proximoTiroEm += intervalo;
        const alvo = encontrarAlvoParaInimigoAtirador(torreta, regra.alcanceTorreta);
        if (alvo) tirosDosInimigos.push({ x: torreta.x, y: torreta.y, alvo,
            velocidade: regra.velocidadeTiro, tipoDoInimigo: torreta.tipo });
    }
}

function atualizarAcoesDosChefesNormais() {
    const elenco = CONFIG.eventos.elencosNormais[mapaPersonalizadoAtivo?.evento];
    if (mapaPersonalizadoAtivo?.evento === 'idadeDaPedra') return;
    for (const chefe of inimigos.filter(inimigo => inimigo.tipo === elenco.chefe && inimigo.vida > 0)) {
        if (tempoDoEventoMs < chefe.proximaAcaoDeEventoEm) continue;
        if (mapaPersonalizadoAtivo.evento === 'caixaSurpresa') {
            criarInimigoInvocado(elenco.comuns[0], chefe);
            ajustarInimigoDoEvento(inimigos.at(-1));
            chefe.proximaAcaoDeEventoEm += obterIntervaloDaAcaoDoChefe('caixaSurpresa');
            mostrarAviso(localizarEvento('O Rei dos Presentes chamou um Mímico!'));
        } else if (mapaPersonalizadoAtivo.evento === 'roleta') {
            for (const aliado of inimigos) {
                if (aliado !== chefe && Math.hypot(aliado.x - chefe.x, aliado.y - chefe.y)
                    <= CONFIG.eventos.raioReparoChefeRoleta) {
                    aliado.vida = Math.min(aliado.vidaMaxima, aliado.vida
                        + aliado.vidaMaxima * CONFIG.eventos.percentualReparoChefeRoleta);
                }
            }
            chefe.proximaAcaoDeEventoEm += obterIntervaloDaAcaoDoChefe('roleta');
            mostrarAviso(localizarEvento('O Dono da Banca recuperou seus aliados!'));
        } else {
            const alvo = torres[Math.floor(Math.random() * torres.length)];
            if (alvo) meteorosDoEvento.push({ x: alvo.x, y: alvo.y, progresso: 0, explosao: 0 });
            chefe.proximaAcaoDeEventoEm += obterIntervaloDaAcaoDoChefe('meteoros');
            if (alvo) mostrarAviso(localizarEvento('O Arauto do Cometa marcou uma torre!'));
        }
    }
}

function obterTorresAoAlcanceDoSuperBoss(inimigo) {
    return torres.map(torre => ({
        torre,
        distancia: Math.hypot(torre.x - inimigo.x, torre.y - inimigo.y)
    })).filter(alvo => alvo.distancia <= CONFIG.eventos.raioAtaqueSuperBoss)
        .sort((a, b) => a.distancia - b.distancia)
        .map(alvo => alvo.torre);
}

function atualizarAtaquesDosSuperBosses(passo = 0) {
    if (mapaPersonalizadoAtivo.evento === 'superBossesAcidos') {
        inimigos = inimigos.filter(inimigo => !inimigo.carcacaDaVibora
            || (inimigo.vida > 0 && tempoDoEventoMs < inimigo.expiraEm && inimigo.dono?.vida > 0));
    }
    for (const inimigo of inimigos) {
        if (!inimigo.superBoss || inimigo.vida <= 0) continue;
        if (inimigo.tipo === 'metamorfo') {
            atualizarMetamorfo(inimigo, passo);
            continue;
        }
        if (obterDificuldadeDoEvento().ataqueSecundario) atualizarAtaqueSecundarioDoSuperBoss(inimigo);
        if (tempoDoEventoMs < inimigo.proximoAtaqueDeEventoEm) continue;
        inimigo.proximoAtaqueDeEventoEm += obterIntervaloDeAtaqueDoSuperBoss();
        const alvos = obterTorresAoAlcanceDoSuperBoss(inimigo);
        if (!alvos.length) continue;
        for (const torre of alvos) {
            for (let golpe = 0; golpe < CONFIG.eventos.danoAtaqueSuperBoss; golpe++) {
                atingirTorreComTiroInimigo(torre, inimigo.tipo);
            }
        }
        mostrarAviso(localizarEvento('Um super-boss atacou suas torres!'));
        aplicarAtaqueEspecialDoSuperBoss(inimigo, alvos);
    }
    if (mapaPersonalizadoAtivo.evento === 'superBossesMecanicos') {
        const chefeVivo = inimigos.some(inimigo => inimigo.superBoss && inimigo.vida > 0);
        if (chefeVivo) atualizarTorretaDaForja();
        else inimigos = inimigos.filter(inimigo => !inimigo.torretaDaForja);
    }
    atualizarCuspesAcidosDoEvento();
}

function atualizarCuspesAcidosDoEvento() {
    const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesAcidos;
    for (const cuspe of cuspesAcidosDoEvento) {
        if (cuspe.atingeEm > tempoDoEventoMs) continue;
        cuspe.impactou = true;
        if (!torres.includes(cuspe.alvo)) continue;
        torresCorroidasDoEvento.push({ torre: cuspe.alvo, inicio: tempoDoEventoMs });
        for (let tiro = 0; tiro < regra.tirosPorImpacto && torres.includes(cuspe.alvo); tiro++) {
            atingirTorreComTiroInimigo(cuspe.alvo, 'viboraAcida');
        }
    }
    cuspesAcidosDoEvento = cuspesAcidosDoEvento.filter(cuspe => !cuspe.impactou);
    torresCorroidasDoEvento = torresCorroidasDoEvento.filter(efeito => torres.includes(efeito.torre)
        && tempoDoEventoMs - efeito.inicio < regra.duracaoDerretimentoMs);
    torresDerretendoDoEvento = torresDerretendoDoEvento.filter(animacao =>
        tempoDoEventoMs - animacao.inicio < regra.duracaoDerretimentoMs);
}

function registrarTorreDerretendoDoEvento(torre) {
    if (mapaPersonalizadoAtivo?.evento !== 'superBossesAcidos') return;
    torresDerretendoDoEvento.push({ x: torre.x, y: torre.y,
        estilo: obterEstiloDaTorre(torre), angulo: torre.anguloDaMira ?? -Math.PI / 2,
        inicio: tempoDoEventoMs });
}

function aplicarAtaqueEspecialDoSuperBoss(inimigo, torresAoAlcance = obterTorresAoAlcanceDoSuperBoss(inimigo)) {
    const id = mapaPersonalizadoAtivo?.evento;
    const configuracao = CONFIG.eventos.ataquesEspeciaisSuperBoss[id];
    if (!configuracao) return;
    const alvos = torresAoAlcance.filter(torre => torres.includes(torre)).slice(0, configuracao.alvos);
    if (!alvos.length) return;
    const nome = localizar(CONFIG.inimigo[inimigo.tipo].nome);
    if (id === 'superBosses') {
        for (const torre of alvos) {
            queimadurasDasTorresDoEvento.push({
                torre, tipoDoInimigo: inimigo.tipo,
                expiraEm: tempoDoEventoMs + configuracao.duracaoMs,
                proximoDanoEm: tempoDoEventoMs + configuracao.intervaloDanoMs
            });
        }
        mostrarAviso(localizarEvento('O fogo de {nome} está queimando suas torres!', { nome }));
    } else if (id === 'superBossesMecanicos') {
        for (const torre of alvos) {
            torre.estaseTemporalExpiraEm = Math.max(torre.estaseTemporalExpiraEm || 0, Date.now() + configuracao.duracaoMs);
        }
        mostrarAviso(localizarEvento('O pulso de {nome} paralisou suas torres!', { nome }));
    } else if (id === 'superBossesAbissais') {
        for (const torre of alvos) {
            torre.percentualReducaoAlcanceCoruja = configuracao.reducaoAlcance;
            torre.reducaoAlcanceCorujaExpiraEm = Math.max(torre.reducaoAlcanceCorujaExpiraEm || 0, Date.now() + configuracao.duracaoMs);
        }
        mostrarAviso(localizarEvento('A maré de {nome} reduziu o alcance das torres!', { nome }));
    } else if (id === 'superBossesAcidos') {
        for (const torre of alvos) {
            const escala = obterEscalaVisualDoInimigo(inimigo.tipo, inimigo.tamanho);
            cuspesAcidosDoEvento.push({ chefe: inimigo,
                origemX: inimigo.x + escala * 0.82, origemY: inimigo.y - escala * 0.34,
                alvo: torre, x: torre.x, y: torre.y,
                inicio: tempoDoEventoMs,
                atingeEm: tempoDoEventoMs + configuracao.tempoDoCuspeMs });
        }
        mostrarAviso(localizarEvento('A Víbora cuspiu ácido!'));
    }
}

function atualizarQueimadurasDasTorresDoEvento() {
    const configuracao = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBosses;
    for (const queimadura of queimadurasDasTorresDoEvento) {
        while (torres.includes(queimadura.torre) && queimadura.proximoDanoEm <= tempoDoEventoMs
            && queimadura.proximoDanoEm <= queimadura.expiraEm) {
            atingirTorreComTiroInimigo(queimadura.torre, queimadura.tipoDoInimigo);
            queimadura.proximoDanoEm += configuracao.intervaloDanoMs;
        }
    }
    queimadurasDasTorresDoEvento = queimadurasDasTorresDoEvento.filter(queimadura =>
        torres.includes(queimadura.torre) && queimadura.proximoDanoEm <= queimadura.expiraEm);
}

function desenharDerretimentoDaTorreDoEvento(animacao) {
    const duracao = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesAcidos.duracaoDerretimentoMs;
    const progresso = Math.min(1, (tempoDoEventoMs - animacao.inicio) / duracao);
    const inicioDaQueda = Math.max(0, (progresso - 0.22) / 0.78);
    const queda = inicioDaQueda * inicioDaQueda * (3 - 2 * inicioDaQueda);
    ctx.save();
    ctx.globalAlpha = 1 - queda;
    ctx.translate(animacao.x + Math.round(queda * 7), animacao.y + Math.round(queda * 16));
    ctx.transform(1, 0, -queda * 0.17, 1, 0, 0);
    ctx.scale(1 + queda * 0.32, Math.max(0.08, 1 - queda * 0.86));
    desenharCorpoDaTorre(0, 0, animacao.estilo, animacao.angulo);
    ctx.restore();

    const topoDoAcido = animacao.y - 26 + Math.round(queda * 44);
    const larguraDoAcido = 22 + Math.round(queda * 8);
    ctx.fillStyle = '#437b2b';
    ctx.fillRect(animacao.x - larguraDoAcido - 2, topoDoAcido - 2, larguraDoAcido * 2 + 4, 11);
    ctx.fillStyle = '#a9f34d';
    ctx.fillRect(animacao.x - larguraDoAcido, topoDoAcido, larguraDoAcido * 2, 7);
    for (const [deslocamento, altura] of [[-18, 5], [-7, 9], [7, 6], [17, 3]]) {
        ctx.fillRect(animacao.x + deslocamento, topoDoAcido - altura, 8, altura);
    }
    const comprimentoDasGotas = 1 - queda;
    for (let gota = 0; gota < 5; gota++) {
        const altura = Math.round((10 + progresso * (20 + gota % 2 * 8)) * comprimentoDasGotas);
        const x = animacao.x - 20 + gota * 10;
        if (altura > 2) {
            ctx.fillRect(x, topoDoAcido + 6, 6, altura);
            ctx.fillRect(x + 1, topoDoAcido + 6 + altura, 4, 5);
        }
    }
    ctx.fillStyle = '#dcff82';
    ctx.fillRect(animacao.x - larguraDoAcido + 4, topoDoAcido + 1, 12, 3);
    ctx.fillRect(animacao.x + 3, topoDoAcido + 2, 7, 3);
    if (progresso < 0.62) {
        ctx.fillRect(animacao.x - 11, animacao.y - 38 + Math.round(progresso * 12), 5, 6);
        ctx.fillRect(animacao.x + 12, animacao.y - 42 + Math.round(progresso * 17), 6, 7);
    }
    if (progresso > 0.22) {
        const larguraDaPoca = Math.round(6 + (progresso - 0.22) / 0.78 * 28);
        ctx.fillStyle = '#305b29';
        ctx.fillRect(animacao.x - larguraDaPoca, animacao.y + 21,
            larguraDaPoca * 2, 8);
        ctx.fillStyle = '#8edc49';
        ctx.fillRect(animacao.x - larguraDaPoca + 3, animacao.y + 21,
            larguraDaPoca * 2 - 6, 4);
        ctx.fillStyle = '#dcff82';
        ctx.fillRect(animacao.x - larguraDaPoca + 8, animacao.y + 22, 8, 2);
    }
}

function desenharMecanicaDoEvento() {
    if (!mapaPersonalizadoAtivo?.evento) return;
    ctx.save();
    if (mapaPersonalizadoAtivo.evento === 'superBosses') {
        for (const inimigo of inimigos) {
            if (inimigo.vida <= 0 || obterMultiplicadorDaFuriaDasCinzas(inimigo) === 1) continue;
            ctx.strokeStyle = '#ff9b3d';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(inimigo.x, inimigo.y, inimigo.tamanho + 7, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    for (const queimadura of queimadurasDasTorresDoEvento) {
        ctx.fillStyle = '#ff9e39';
        ctx.fillRect(queimadura.torre.x - 7, queimadura.torre.y - 31, 14, 18);
        ctx.fillStyle = '#ffe69a';
        ctx.fillRect(queimadura.torre.x - 2, queimadura.torre.y - 37, 5, 13);
    }
    for (const cuspe of cuspesAcidosDoEvento) {
        const regra = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesAcidos;
        const tempo = Math.max(0, tempoDoEventoMs - cuspe.inicio);
        const progresso = Math.min(1, Math.max(0, (tempo - regra.aberturaDaBocaMs)
            / (regra.tempoDoCuspeMs - regra.aberturaDaBocaMs)));
        ctx.strokeStyle = '#c9ff6c';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cuspe.x, cuspe.y, 24, 0, Math.PI * 2); ctx.stroke();
        if (progresso <= 0) continue;
        const pontoDoJato = fracao => ({
            x: cuspe.origemX + (cuspe.x - cuspe.origemX) * fracao,
            y: cuspe.origemY + (cuspe.y - cuspe.origemY) * fracao - Math.sin(fracao * Math.PI) * 34
        });
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (const [largura, cor] of [[15, '#315c2e'], [10, '#8cdb45'], [4, '#e0ff87']]) {
            ctx.strokeStyle = cor;
            ctx.lineWidth = largura;
            ctx.beginPath();
            const inicio = pontoDoJato(0);
            ctx.moveTo(inicio.x, inicio.y);
            for (let passo = 1; passo <= 12; passo++) {
                const fracao = progresso * passo / 12;
                const ponto = pontoDoJato(fracao);
                ctx.lineTo(ponto.x, ponto.y);
            }
            ctx.stroke();
        }
        for (let gota = 0; gota < 4; gota++) {
            const fracao = progresso * (0.24 + gota * 0.19);
            const ponto = pontoDoJato(fracao);
            ctx.fillStyle = gota % 2 ? '#c9ff6c' : '#a7f052';
            ctx.fillRect(Math.round(ponto.x + gota * 5 - 8), Math.round(ponto.y + 10), 5, 6);
        }
    }
    for (const efeito of torresCorroidasDoEvento) {
        const progresso = Math.min(1, (tempoDoEventoMs - efeito.inicio)
            / CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesAcidos.duracaoDerretimentoMs);
        ctx.fillStyle = `rgba(180, 246, 96, ${0.85 - progresso * 0.6})`;
        for (let gota = 0; gota < 4; gota++) {
            ctx.fillRect(efeito.torre.x - 15 + gota * 10,
                efeito.torre.y - 19 + progresso * (21 + gota % 2 * 9), 5, 9);
        }
    }
    for (const animacao of torresDerretendoDoEvento) {
        desenharDerretimentoDaTorreDoEvento(animacao);
    }
    for (const caixa of caixasDoEvento) {
        const y = -28 + (caixa.y + 28) * caixa.progresso;
        ctx.fillStyle = caixa.cor;
        ctx.fillRect(caixa.x - 14, y - 14, 28, 28);
        ctx.fillStyle = '#fff6cd';
        ctx.fillRect(caixa.x - 3, y - 14, 6, 28);
        ctx.fillRect(caixa.x - 14, y - 3, 28, 6);
        if (caixa.progresso === 1) {
            ctx.strokeStyle = '#fff6cd';
            ctx.lineWidth = 2;
            ctx.strokeRect(caixa.x - 17, y - 17, 34, 34);
        }
    }
    if (defesasPendentesDoEvento.length && posicaoCursorNoMapa && (mapaPersonalizadoAtivo.evento === 'caixaSurpresa' || mapaPersonalizadoAtivo.evento === 'roleta')) {
        const { x, y } = posicaoCursorNoMapa;
        desenharPreviaDeDefesaNoCursor(defesasPendentesDoEvento[0], x, y,
            Boolean(posicaoValidaParaDefesaDoEvento(defesasPendentesDoEvento[0], x, y)));
    }
    for (const cratera of craterasDoEvento) {
        ctx.fillStyle = 'rgba(35, 24, 35, 0.62)';
        ctx.strokeStyle = '#d47756';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cratera.x, cratera.y, CONFIG.eventos.raioCrateraMeteoros, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    for (const meteoro of meteorosDoEvento) {
        ctx.strokeStyle = '#ffb15b';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(meteoro.x, meteoro.y, CONFIG.eventos.raioMeteoro, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = meteoro.progresso < 1 ? '#ffcb66' : '#ff713c';
        const raio = meteoro.progresso < 1 ? 10 + meteoro.progresso * 15 : 35 * (1 - meteoro.explosao / 550);
        ctx.beginPath(); ctx.arc(meteoro.x, meteoro.y - (1 - meteoro.progresso) * 180, Math.max(0, raio), 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
}

function posicaoValidaParaDefesaDoEvento(tipo, x, y) {
    const configuracao = obterConfiguracaoDaTorre(tipo);
    const mina = configuracao.tipoDeItem === 'mina';
    const ponto = mina ? obterPosicaoMaisProximaNoCaminho(x, y) : { x, y };
    if (!ponto || x < 20 || y < 20 || x > canvas.width - 20 || y > canvas.height - 20
        || !terrenoPermiteDefesa(tipo, ponto.x, ponto.y)
        || construcaoSobreDecoracao(ponto.x, ponto.y)
        || (typeof estaPertoDaCarroca === 'function' && estaPertoDaCarroca(ponto.x, ponto.y))
        || caixasDoEvento.some(caixa => caixa.progresso === 1 && Math.hypot(caixa.x - ponto.x, caixa.y - ponto.y) < 28)
        || (configuracao.exigeCaminho ? !estaNoCaminho(x, y) : estaNoCaminho(x, y))
        || atingiuLimiteDoTipoDeTorre(tipo)) return null;
    if (mina) {
        if (estaPertoDeOutraMina(ponto.x, ponto.y, configuracao.distanciaMinimaEntreMinas)) return null;
    } else if (torres.length >= obterLimiteDeTorres() || estaPertoDeOutraTorreOuBomba(x, y)) return null;
    return ponto;
}

function cliqueNoMapaDoEvento(evento) {
    const id = mapaPersonalizadoAtivo?.evento;
    if (id !== 'caixaSurpresa' && id !== 'roleta') return false;
    const { x, y } = obterPosicaoNoMapaPeloEvento(evento);
    if (id === 'caixaSurpresa') {
        const indice = caixasDoEvento.findIndex(caixa => caixa.progresso === 1 && Math.hypot(caixa.x - x, caixa.y - y) <= 24);
        if (indice >= 0) {
            const [caixa] = caixasDoEvento.splice(indice, 1);
            if (concederDefesaDoEvento(caixa.tipo)) {
                caixasAbertasNoEvento++;
                if (caixasAbertasNoEvento % obterRegraDaDificuldadeDoEvento('intervaloEmboscadaCaixas',
                    CONFIG.eventos.intervaloEmboscadaCaixas) === 0) {
                    criarInimigo(CONFIG.eventos.elencosNormais.caixaSurpresa.comuns[0]);
                    mostrarAviso(localizarEvento('A caixa escondia um Mímico!'));
                } else mostrarAviso(localizarEvento('Uma caixa trouxe {nome}! Clique para posicionar.', {
                    nome: obterNomeLocalizado(obterConfiguracaoDaTorre(caixa.tipo))
                }));
            } else mostrarAviso(localizarEvento('Sem espaço para a defesa'));
            return true;
        }
    }
    if (!defesasPendentesDoEvento.length) return false;
    const tipo = defesasPendentesDoEvento[0];
    const ponto = posicaoValidaParaDefesaDoEvento(tipo, x, y);
    if (!ponto) {
        mostrarAviso(localizarEvento('Escolha um lugar livre para a defesa.'));
        return true;
    }
    if (tipo === 'minaTerrestre') minasTerrestres.push({ x: ponto.x, y: ponto.y, tipo });
    else criarTorreNaPartida(tipo, ponto.x, ponto.y);
    defesasPendentesDoEvento.shift();
    if (id === 'caixaSurpresa') {
        alternativaDaCaixaPendente = defesasPendentesDoEvento.length
            ? sortearTorreDoEvento(defesasPendentesDoEvento[0]) : null;
    }
    atualizarAcaoDoEvento();
    mostrarAviso(localizarEvento('Defesa posicionada.'));
    return true;
}

function obterCamadaDaRoleta() {
    let camada = document.getElementById('camada-roleta-evento');
    if (camada) return camada;
    camada = document.createElement('section');
    camada.id = 'camada-roleta-evento';
    camada.className = 'camada-roleta-evento';
    camada.setAttribute('role', 'dialog');
    camada.setAttribute('aria-modal', 'true');
    camada.hidden = true;
    camada.innerHTML = '<div class="painel-roleta-evento"><h2></h2><div class="roleta-evento-area"><div class="roleta-evento-disco" aria-hidden="true"></div></div><p role="status"></p><div class="roleta-evento-acoes"><button class="botao botao-primario" type="button" id="girar-roleta-evento"></button><button class="botao" type="button" id="fechar-roleta-evento"></button></div></div>';
    document.body.appendChild(camada);
    camada.querySelector('#girar-roleta-evento').addEventListener('click', girarRoletaDoEvento);
    camada.querySelector('#fechar-roleta-evento').addEventListener('click', fecharRoletaDoEvento);
    return camada;
}

function atualizarRoletaDoEvento() {
    const camada = obterCamadaDaRoleta();
    camada.querySelector('h2').textContent = localizarEvento('Roleta');
    const rotulos = ['+100', '+200', '+300', 'Torre padrão', 'Torre Besta', 'Canhão Pesado', 'Mina', 'Nada'];
    camada.querySelector('.roleta-evento-disco').innerHTML = rotulos.map((rotulo, indice) =>
        `<span style="--angulo:${indice * 45 + 22.5}deg;--angulo-inverso:${-indice * 45 - 22.5}deg">${localizarEvento(rotulo)}</span>`).join('');
    camada.querySelector('#girar-roleta-evento').textContent = localizarEvento('Girar por {custo} créditos', { custo: CONFIG.eventos.custoRoleta });
    camada.querySelector('#fechar-roleta-evento').textContent = localizarEvento('Voltar à partida');
}

function abrirRoletaDoEvento() {
    if (!jogoIniciado || partidaEncerrada || jogoPausado || mapaPersonalizadoAtivo?.evento !== 'roleta' || roletaDoEventoAberta) return;
    roletaDoEventoAberta = true;
    definirJogoPausado(true);
    const camada = obterCamadaDaRoleta();
    anguloDaRoleta = 0;
    roletaGirando = false;
    camada.querySelector('.roleta-evento-disco').style.transform = 'rotate(0deg)';
    camada.querySelector('#girar-roleta-evento').disabled = false;
    atualizarRoletaDoEvento();
    camada.hidden = false;
    camada.querySelector('p').textContent = '';
    camada.querySelector('#girar-roleta-evento').focus();
}

function girarRoletaDoEvento() {
    if (roletaGirando) return;
    if (defesasPendentesDoEvento.length) {
        obterCamadaDaRoleta().querySelector('p').textContent = localizarEvento('Posicione a defesa recebida antes de girar novamente.');
        return;
    }
    if (!roletaDoEventoAberta || dinheiro < CONFIG.eventos.custoRoleta) {
        obterCamadaDaRoleta().querySelector('p').textContent = localizarEvento('Créditos insuficientes para girar.');
        return;
    }
    dinheiro -= CONFIG.eventos.custoRoleta;
    girosDaRoletaNoEvento++;
    roletaGirando = true;
    const premios = [100, 200, 300, 'padrao', 'torreBesta', 'canhaoPesado', 'minaTerrestre', null];
    const indice = Math.floor(Math.random() * premios.length);
    const premio = premios[indice];
    let mensagem;
    if (typeof premio === 'number') {
        const creditosRecebidos = concederCreditosNaPartida(premio);
        mensagem = localizarEvento('Créditos +{quantidade}', { quantidade: creditosRecebidos });
    } else if (premio) {
        const recebido = concederDefesaDoEvento(premio);
        mensagem = recebido ? premio === 'minaTerrestre'
            ? localizarEvento('Mina recebida. Feche a roleta e escolha onde colocar.')
            : localizarEvento('Torre recebida: {nome}. Feche a roleta e escolha onde colocar.', { nome: obterNomeLocalizado(obterConfiguracaoDaTorre(premio)) })
            : localizarEvento('Sem espaço para a defesa');
    } else mensagem = localizarEvento('Nada desta vez');
    if (girosDaRoletaNoEvento % obterRegraDaDificuldadeDoEvento('intervaloCobrancaRoleta',
        CONFIG.eventos.intervaloCobrancaRoleta) === 0) {
        criarInimigo(CONFIG.eventos.elencosNormais.roleta.comuns[1]);
        mensagem += ` ${localizarEvento('A banca enviou um Cobrador!')}`;
    }
    const camada = obterCamadaDaRoleta();
    const alvo = (360 - indice * 45 - 22.5) % 360;
    anguloDaRoleta += 720 + (alvo - (anguloDaRoleta % 360) + 360) % 360;
    camada.querySelector('.roleta-evento-disco').style.transform = `rotate(${anguloDaRoleta}deg)`;
    camada.querySelector('p').textContent = mensagem;
    camada.querySelector('#girar-roleta-evento').disabled = true;
    setTimeout(() => {
        roletaGirando = false;
        if (roletaDoEventoAberta) camada.querySelector('#girar-roleta-evento').disabled = false;
    }, 1200);
}

function fecharRoletaDoEvento() {
    const camada = document.getElementById('camada-roleta-evento');
    if (camada) camada.hidden = true;
    if (!roletaDoEventoAberta) return;
    roletaDoEventoAberta = false;
    if (jogoIniciado && !partidaEncerrada) definirJogoPausado(false);
}

function concederPremioDoEvento(id) {
    const evento = EVENTOS_DISPONIVEIS.find(item => item.id === id);
    if (!evento) return null;
    const fragmentos = obterFragmentosDaDificuldadeDoEvento(id,
        mapaPersonalizadoAtivo?.evento === id ? mapaPersonalizadoAtivo.dificuldadeEvento : 'facil');
    const skinNova = evento.skin && !recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes(evento.skin) ? evento.skin : null;
    const torreNova = evento.torre && !torreEstaDesbloqueada(evento.torre) ? evento.torre : null;
    let valoresAnteriores;
    try {
        valoresAnteriores = [CHAVE_VITORIAS_DOS_EVENTOS, CHAVE_FRAGMENTOS_PIXEL, CHAVE_RECOMPENSAS_MISSOES]
            .map(chave => [chave, localStorage.getItem(chave)]);
    } catch { return null; }
    const vitoriasAnteriores = { ...vitoriasDosEventos };
    const fragmentosAnteriores = fragmentosPixel;
    const skinsAnteriores = [...recompensasPermanentesDasMissoes.skinsDesbloqueadas];
    vitoriasDosEventos[id]++;
    fragmentosPixel += fragmentos;
    if (skinNova) recompensasPermanentesDasMissoes.skinsDesbloqueadas.push(skinNova);
    try {
        const dadosAnteriores = JSON.parse(valoresAnteriores[0][1] || '{}');
        const dificuldadesConcluidas = { ...(dadosAnteriores.dificuldadesConcluidas || {}) };
        const vitoriasAntigasPorEvento = { ...(dadosAnteriores.vitoriasAntigasPorEvento || {}) };
        if (CONFIG.eventos.elencosSuperBosses[id]) {
            if (!Object.hasOwn(vitoriasAntigasPorEvento, id)) {
                vitoriasAntigasPorEvento[id] = Math.max(0, (vitoriasAnteriores[id] || 0)
                    - (dificuldadesConcluidas[id]?.length || 0));
            }
            const dificuldade = mapaPersonalizadoAtivo?.evento === id
                ? mapaPersonalizadoAtivo.dificuldadeEvento : 'facil';
            const anteriores = Array.isArray(dificuldadesConcluidas[id]) ? dificuldadesConcluidas[id] : [];
            dificuldadesConcluidas[id] = [...new Set([...anteriores, dificuldade])];
        }
        localStorage.setItem(CHAVE_VITORIAS_DOS_EVENTOS,
            JSON.stringify({ ...vitoriasDosEventos, dificuldadesConcluidas, vitoriasAntigasPorEvento,
                migracaoDificuldadesConfirmada: dadosAnteriores.migracaoDificuldadesConfirmada || {} }));
        localStorage.setItem(CHAVE_FRAGMENTOS_PIXEL, String(fragmentosPixel));
        localStorage.setItem(CHAVE_RECOMPENSAS_MISSOES, JSON.stringify(recompensasPermanentesDasMissoes));
        if (!atualizarSalvoAtivo()) throw Error('salvo');
    } catch {
        vitoriasDosEventos = vitoriasAnteriores;
        fragmentosPixel = fragmentosAnteriores;
        recompensasPermanentesDasMissoes.skinsDesbloqueadas = skinsAnteriores;
        for (const [chave, valor] of valoresAnteriores) {
            try { if (valor === null) localStorage.removeItem(chave); else localStorage.setItem(chave, valor); } catch {}
        }
        return null;
    }
    atualizarSaldoDeFragmentos();
    return { skinNova, torreNova, fragmentos };
}

function concluirPartidaDeEvento() {
    if (partidaEncerrada) return;
    const id = mapaPersonalizadoAtivo.evento;
    partidaEncerrada = true;
    partidaVencida = true;
    terminarTentativaParaConquistas(true);
    const premio = concederPremioDoEvento(id);
    fragmentosRecebidosNoResultado = premio?.fragmentos || 0;
    if (id === 'idadeDaPedra' && premio && desbloquearConquista('eAgora')) atualizarSalvoAtivo();
    tiros = [];
    tirosDosInimigos = [];
    tocarEfeitoVitoria();
    mostrarPainelDeResultado(true);
    seloResultado.textContent = localizarEvento(EVENTOS_DISPONIVEIS.find(evento => evento.id === id).nome)
        + ` · ${localizarEvento(obterDificuldadeDoEvento().nome)}`;
    descricaoResultado.textContent = fragmentosRecebidosNoResultado
        ? localizarEvento('Evento concluído! +{fragmentos} Fragmentos de Pixel.', { fragmentos: fragmentosRecebidosNoResultado })
            + (premio.skinNova ? localizarEvento(' Skin desbloqueada: {nome}.', { nome: localizarEvento(CONFIG.missoes.skins[premio.skinNova].nome) }) : '')
            + (premio.torreNova ? localizarEvento(' Torre desbloqueada: {nome}.', { nome: localizarEvento(CONFIG.torre.tipos[premio.torreNova].nome) }) : '')
            + (CONFIG.eventos.premioDasTorresSuperBosses[EVENTOS_DISPONIVEIS.find(evento => evento.id === id)?.torre]
                ? localizarEvento(' Bônus de dano da torre: +{percentual}%.', {
                    percentual: Math.round(obterBonusDeDanoDaTorrePremio(EVENTOS_DISPONIVEIS.find(evento => evento.id === id).torre) * 100)
                }) : '')
        : localizarEvento(' Não foi possível salvar o prêmio; tente vencer novamente.');
    if (id === 'idadeDaPedra' && premio) {
        falaIdadeDaPedra.textContent = localizarEvento(
            'Ah, não! Você destruiu todos os nossos ancestrais... O que vai acontecer com a gente?');
        falaIdadeDaPedra.hidden = false;
    }
}

TELAS_DO_LOBBY_EM_TELA_CHEIA.add('eventos');
atualizarIdiomaDosEventos();
