# Memória da história — Limbo, castelo, arena e finais

Este arquivo registra as decisões combinadas com o autor. Leia-o ao retomar o projeto mesmo que a conversa do terminal tenha sido perdida.

## Identidade da entidade
 
### Mistério inicial do jogador

A abertura da Fase 1 mostra que o jogador não lembra como chegou ao mundo do jogo. Ele pensa: “Como eu vim parar aqui? Não consigo lembrar…”, “Essas criaturas… Por que elas querem me atacar?” e “Preciso defender este lugar… Depois tento entender.”. A Fase 18 revela a origem da amnésia e dos ataques, conforme registrado abaixo.

- O nome mostrado é sempre **???**. Não revelar um nome verdadeiro ainda.
- É uma entidade soberana do Limbo, superior ao Senhor do Tempo. Não é outro retrato do Senhor do Tempo.
- Visual: rosto negro sem feições, coroa dourada com rubi vermelho, manto roxo, faixa clara com ornamentos vermelhos e bordas douradas. Pixel art com poucos detalhes extras.
- A imagem original foi guardada pelo autor em backup; o desenho do jogo é feito pelo código e não depende de `references`.

## Encontro depois da vitória no Limbo

A entidade vem de longe e se aproxima do jogador:

**???:** “Por que está aqui? É impossível chegar a este lugar sozinho. Quem o trouxe?”

Escolhas: **Permanecer calado** ou **Foi o Senhor do Tempo**.

### Contar a verdade imediatamente

**VOCÊ:** “Foi o Senhor do Tempo.”

**???:** “Então ele voltou a me desobedecer… Você não foi o primeiro. Eu o avisei de que haveria consequências.”

**VOCÊ:** “Que consequências?”

**???:** “Ele já foi muito mais poderoso. Ainda assim, nunca esteve acima de mim. Fui eu quem retirou os poderes que ele jamais recuperará.”

**???:** “Nenhuma entidade da sua dimensão tem autoridade aqui.”

**???:** “Ele alcança este lugar distorcendo o tempo. Preparei uma barreira para fechar essa passagem. Hoje, ela será selada.”

A barreira é ativada naquele momento, fechando as fendas. Ela bloqueia a manipulação do Senhor do Tempo, não a possibilidade de repetir a fase pelo relógio do jogo.

**???:** “Venha. Vou devolvê-lo à sua dimensão.”

O Capítulo 3 é liberado e a campanha continua. Esta conversa, sozinha, **não concede a promessa de ajuda**.

### Permanecer calado

**???:** “Enfim… Ninguém entra sem minha permissão. E ninguém sai sem que eu permita. Siga-me.”

O jogador acompanha a entidade até o castelo.

**???:** “Entre. Não me faça esperar.”

## Castelo: exploração livre implementada

O jogo muda temporariamente de tower defense para exploração vista de cima. WASD/setas para andar, E para interagir, com botões de toque. A entidade atravessa o salão e sobe ao segundo andar.

- **Térreo:** salão de banquetes com uma mesa longa no centro; mesa e guardas têm colisão.
- **Arsenal:** dois guardas barram a entrada. “Você não tem permissão para entrar aqui.” Não é possível atravessá-los ou entrar no arsenal.
- **Segundo andar:** corredor onde a entidade espera, varanda, quarto real e quarto de hóspedes.
- **Varanda:** só a sacada e o vazio. “Aqui não tem nada… Afinal, aqui é o Limbo.” Não existe paisagem normal além da varanda.
- **Quarto real:** cama real e coroa, decorativo.
- **Quarto de hóspedes:** a cama permite dormir depois de ouvir o desafio.
- Revisão posterior aprovada: sala de estar com sofá, poltrona e lareira, biblioteca e galeria. São salas de exploração decoradas, sem novos eventos obrigatórios para o desafio.
- O quarto real recebeu um retrato interativo da entidade ao lado de uma mulher coroada. O jogador se pergunta se é sua esposa; nenhum nome, destino ou história desse casal foi definido.

## Desafio no segundo andar

**???:** “Aqui no Limbo, ninguém entra sem minha permissão.”

**???:** “Eu enviaria qualquer outro intruso à arena, para enfrentar meus gladiadores. Mas há algo diferente em você…”

**???:** “Descanse. Amanhã, eu mesmo o enfrentarei.”

**???:** “Faz muitos anos que não entro naquela arena. Não confunda minha ausência com fraqueza. Ainda tenho muitos poderes e habilidades. Você não vencerá facilmente.”

O jogador pode explorar e então dormir. No dia seguinte a entidade entra no quarto:

**???:** “Amanheceu. Siga-me até a arena. Quero ver do que você é capaz.”

Voltar ao corredor, descer as escadas e sair pelo portão do térreo.

**???:** “Siga-me. A arena nos espera.”

O coliseu aparece entre as ruínas do vazio.

## Arena implementada

- PvE em tower defense, não PvP nem combate de ação.
- Desafio separado da campanha, em cinco waves. Defesas emprestadas: flechas, canhão e gelo; nenhuma compra permanente é exigida.
- Créditos e base próprios; os parâmetros ficam em `CONFIG.casteloDoLimbo.arena` dentro de `game.js`.
- Os gladiadores atacam primeiro; a entidade participa da última wave, sela uma torre temporariamente e convoca reforços.
- Vencer exige completar todas as waves e deter a entidade antes que ela derrube a base.
- Derrota permite nova tentativa. Sair e continuar depois reinicia a arena com todos os recursos, não restaura uma luta pela metade.
- A arena não concede XP, fragmentos, itens, vitórias de fase ou missões extras; a recompensa narrativa é a promessa.

## Vitória e pedido de ajuda

**???:** “Então… você venceu. Conquistou meu respeito. Diga: o que deseja?”

**VOCÊ:** “O Senhor do Tempo quer me eliminar… Me ajude. Ele é muito mais poderoso do que eu. É praticamente um semideus.”

**???:** “…Ele está tentando fazer isso?”

**VOCÊ:** “Sim. Ele já acabou com a vida de várias pessoas. Agora que descobri tudo, quer fazer o mesmo comigo.”

**???:** “Espere aqui. Vou devolvê-lo à sua dimensão. Mas você não enfrentará isso sozinho: eu prometo ajudá-lo.”

Ao terminar essa conversa, gravar a promessa e liberar o Capítulo 3. Não apagar progresso existente nem conceder de novo a recompensa da vitória no Limbo.

## Persistência e retomada

- Chave local: `guardians-of-pixel-jornada-limbo-v1`, individual por slot do sistema de salvos existente.
- Campos: `fase` (castelo/manha/arena/vitoria/concluido), `sala`, `x`, `y`, `desafio`, `promessaDeAjuda`.
- O botão **Continuar no Limbo** no lobby retoma jornadas inacabadas. Conversas interrompidas antes de um checkpoint podem ser repetidas.
- `promessaDeAjuda: true` só é concedida após a vitória na arena e a conclusão da conversa. Depois de conquistada, não deve ser revogada por uma repetição do Limbo ou pela outra escolha.
- O save não deve ser apagado em nenhum final. O jogador pode revisitar o Limbo para descobrir a rota da ajuda.

## Elencos das Fases 15 e 16 (implementados)

- **Arquivo Proibido, Fase 15:** Rasurador, Censor Velado e Sentinela de Índice. O Boss Bibliotecário Mudo convoca censores camuflados para proteger o arquivo. A Varredura continua necessária; os registros de Lina e a conversa final permanecem iguais.
- **Câmara das Memórias, Fase 16:** Fragmento Mnésico, Lembrança Blindada e Eco da Memória. O Boss Devorador de Memórias restaura aliados próximos e convoca fragmentos. Os inimigos são manifestações da câmara, sem confirmar a identidade ou o destino de antigos defensores. Preservar a gravação interrompida, a pergunta ao Senhor do Tempo e o desbloqueio do Feixe Contínuo.
- Os elencos substituem os inimigos reutilizados nessas duas fases. Não acrescentam revelações nem antecipam finais.

## Fase 17 — Limiar do Tempo (implementada)

Continua a Câmara das Memórias: o jogador segue o rastro da transmissão até uma passagem cercada por engrenagens imóveis. O combate protege esse caminho; não concede uma nova defesa.

O elenco da passagem agora é exclusivo: Batedor de Instantes, Couraçado de Ampulheta e Tecelão de Segundos. O Boss é o Arconte do Limiar, guardião da passagem, que sela torres e convoca couraçados. Ele não é o Senhor do Tempo nem a entidade do Limbo. Sua derrota preserva os diálogos abaixo e prepara a Fase 18.

Entrada:
- **DEFENSOR:** “Eu ainda não lembro como cheguei aqui. Ele manda que eu defenda as torres, mas nunca explica por que essas criaturas me atacam.”
- **SENHOR DO TEMPO:** “As perguntas não vão proteger você. Afaste-se dessa passagem.”
- **DEFENSOR:** “Não vou abandonar os registros. Vou proteger esta passagem e ouvir suas respostas pessoalmente.”

Após a vitória, as engrenagens voltam a girar, revelando uma porta. O jogador mantém os registros consigo.
- **DEFENSOR:** “Lina deixou um aviso. Outro defensor recebeu uma promessa. E eu nem consigo lembrar de onde vim. O que você está escondendo?”
- **SENHOR DO TEMPO:** “Eu lhe dei um caminho para continuar. Você escolheu seguir vozes que nem conhece.”
- **DEFENSOR:** “Então olhe para mim e responda. Desta vez, sem encerrar a transmissão.”
- **SENHOR DO TEMPO:** “Atravesse a porta. Vamos terminar esta conversa frente a frente.”

A Fase 17 termina com o Senhor do Tempo esperando além da porta. A causa da amnésia só é revelada na Fase 18; o destino do antigo defensor continua em aberto. Não conceder nem revogar a promessa do Limbo nessa passagem.

## Fase 18 — implementada

A Fase 18 encerra a campanha com dois finais. O roteiro completo está em `fase18.js` e as regras em `docs/ESPECIFICACAO.md`.

O Senhor do Tempo trouxe o jogador e apagou suas memórias para controlá-lo. As torres protegem as passagens que sustentam seu poder; as distorções atraem as criaturas. Os destinos de Lina e do antigo defensor continuam desconhecidos.

O jogador vence uma batalha real de 20 waves. Depois, quando o relógio se rompe e ele avança para sair, o Senhor do Tempo paralisa o mundo, derruba o jogador e aponta uma lâmina de luz. Isso é uma cena posterior à vitória, não uma derrota normal de combate.

Com `promessaDeAjuda === true`, a entidade intervém: veio cumprir uma promessa. Ela enfrenta o Senhor do Tempo e manda: **Corra! Eu cuido dele!** O jogador sai a pé pelo corredor atrás da sala do relógio, cruza as ruínas e se perde na floresta. Não atravessa portal nesse momento.

Sem promessa, o Senhor do Tempo mata o jogador e a tela fica preta, sem gore. Ambos os finais oferecem voltar ao menu ou revisitar o Limbo. Saves, compras e promessa nunca são apagados.

## Capítulo secreto — Floresta dos Ecos (implementado)

Depois da fuga a pé, começa a exploração livre, como no castelo. O jogador segue pedras claras, encontra caminhos bloqueados e percebe uma sombra se movendo entre as árvores. Na segunda área, encontra a criatura: é o Senhor do Tempo.

**SENHOR DO TEMPO:** “Ele viu o que precisava ver. Uma versão de mim caindo. Deixei uma cópia temporal para trás e vim atrás de você.”

**VOCÊ:** “Como você me encontrou?”

**SENHOR DO TEMPO:** “Fui eu quem trouxe você. Achou que não saberia seguir o seu rastro?”

A perseguição começa. O jogador procura a saída e pode se esconder entre folhas; ser alcançado permite tentar novamente a área. Na última clareira encontra um arco apagado. Uma marca de coroa surge e o arco se ilumina.

**??? (voz, sem retrato):** “Encontrei você. Atravesse. Eu não consigo mantê-la aberta por muito tempo.”

**VOCÊ:** “A marca da coroa! Ele ainda está me ajudando. Do outro lado… é minha casa!”

Só agora ele atravessa uma passagem para seu mundo, reconhece a casa e recupera uma primeira lembrança. A entidade percebeu a fuga e continuou cumprindo sua promessa. Não definir ainda o destino final do Senhor do Tempo, de Lina ou do antigo defensor.

### Continuação — A casa e o tempo parado

A chegada não encerra a história. Após reconhecer a casa, o jogador estranha o silêncio. O relógio da parede está parado, com o pêndulo suspenso de lado. Pela janela, ele vê um carro no meio de uma curva, uma pessoa com o pé no ar e gotas de chuva que não caem. Só ele consegue se mover. A passagem desapareceu; a cena termina com a percepção de que a fuga ainda não terminou.

Após a cutscene de sete falas, começa a exploração jogável da casa. O jogador examina o relógio, a janela e desenhos das torres feitos por ele antes do desaparecimento. O telefone chama: uma voz avisa para não ligar o relógio e procurar a oficina no fim da rua.

Na rua, uma pessoa dentro de uma faixa de luz o reconhece e pergunta se conseguiu consertar, antes de ficar imóvel novamente. Na oficina há uma foto dele com alguém de terno cuja cabeça foi arrancada da fotografia, e um projeto ligando torres ao relógio com a anotação “A memória é a chave”. A identidade na foto e o que precisava ser consertado continuam em aberto. Esta etapa termina com as pistas reunidas, permitindo continuar explorando ou voltar ao lobby.

A floresta anterior agora é um único mapa contínuo com obstáculos, desvios e checkpoints. A sombra é o próprio Senhor do Tempo: segue e patrulha os caminhos antes de se revelar, preservando a posição na conversa e na perseguição.

### Continuação — O arquivo sem horas

Após reunir as pistas da oficina e da pessoa na luz, o jogador reexamina o projeto e encontra uma trava escondida. A passagem leva a um arquivo com a inscrição “Primeiro, acenda a LUZ. Depois, erga a PONTE. Só então abra a PORTA”. O enigma libera um caderno protegido.

Ao tocar o caderno, ele lembra da oficina antes do desaparecimento: estudava desenhos das torres para manter uma passagem de volta aberta. Não construiu as torres. Deixou uma anotação para si mesmo caso suas memórias fossem apagadas. A lembrança termina antes de revelar quem entra pela porta; no caderno há o endereço do observatório.

De volta à rua, a pessoa na luz diz que foi no observatório que a primeira hora desapareceu. Este trecho termina aqui, com exploração e save preservados. O observatório fica para a próxima parte; a identidade na fotografia e a causa do tempo parado continuam sem resposta.

O capítulo fica disponível após a Fase 18 na rota da promessa, com botão no lobby e save próprio por slot. Quem terminou sem ajuda pode revisitar o Limbo e conquistar a promessa. Não há recompensas econômicas extras.

### Desfecho definitivo — O tempo é seu

O observatório agora é jogável. O Senhor do Tempo roubou a primeira hora da cidade para alimentar as passagens. A destruição do grande relógio deixou o vínculo local congelando a cidade; o jogador consegue se mover pela proteção da entidade durante a volta. Uma fotografia intacta confirma que o homem de terno era o Senhor do Tempo, que prometera ensinar viagens entre mundos. O jogador descobriu que as passagens serviam como prisões, preparou pistas de retorno e foi levado antes de terminar. Sua memória foi apagada para que defendesse o poder do Senhor do Tempo.

Lina está viva, presa entre passagens. Ela explica pelo rádio que a pessoa grisalha é o antigo defensor, que voltou antes e ajudou na ligação. O jogador abre a saída, resgatando Lina e os demais com ajuda da entidade. Depois corta o vínculo: o Senhor do Tempo perde as horas roubadas e o acesso entre mundos, ficando isolado no próprio domínio, inclusive suas cópias. Por último, o jogador devolve as horas à cidade.

A chuva cai, o carro termina a curva e o relógio volta a funcionar. Lina guarda os registros; o antigo defensor segue sua vida; a entidade retorna ao Limbo com a promessa cumprida. Em casa, o jogador lembra de onde veio e escolhe como viver o tempo que recuperou. A cena termina com **FIM**, encerrando a história principal. Os mistérios que estavam reservados nos trechos anteriores são resolvidos aqui; não há novo capítulo obrigatório após este desfecho.
