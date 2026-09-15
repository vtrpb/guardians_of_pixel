# Especificação do jogo

## Identidade

### Remakes visuais de inimigos e Bosses

- Gorila da Selva: ombros largos, braços compridos, punhos apoiados e rosto destacado.
- Escorpião do Deserto: carapaça segmentada, patas laterais, duas pinças e cauda curvada com ferrão; sem características de roedor.
- Colosso da Selva: corpo rochoso simples, olhos claros e blocos de vegetação na cabeça e nos braços.
- Hidra do Pântano: três cabeças separadas, pescoços compridos e ventre claro, sem escamas individuais.
- Tirano Primordial: silhueta reptiliana de perfil, mandíbula com dentes, cauda e pernas robustas.
- Executor Cronal: armadura metálica, visor luminoso e núcleo em forma de ampulheta.
- Curador do Vazio: figura encapuzada, máscara clara, manto fragmentado e detalhes luminosos.
- Os sete usam uma grade pixelada compartilhada, desenhada com retângulos inteiros no canvas, inclusive no Álbum. Não são necessárias novas imagens externas.
- A versão simplificada usa grades de 12 × 12 e no máximo quatro cores por sprite, com blocos maiores, sem texturas ou sombreamento fino. Preserva as novas silhuetas e combina com a simplicidade dos demais inimigos; não aumenta o detalhamento do restante do jogo.
- Preservar atributos, colisões, movimentação, ataques, recompensas e condições das habilidades. Manter o efeito de regeneração da Hidra e o chamado do Tirano; Executor e Curador mudam a cor de seus detalhes durante suas habilidades existentes.

- O nome oficial do jogo é **Guardians of Pixel**.
- A sigla visual usada nos emblemas do lobby e da partida é **GP**.
- **Pixel tower defense** permanece como descrição do gênero, sem fazer parte do nome oficial.

## Objetivo

Defender a torre-base no fim do caminho usando torres enquanto os inimigos avançam pelas waves.

## História: entidade coroada do Limbo

### Apresentação compartilhada das conversas

- Revisão visual: caixas e botões usam fundo roxo escuro `#241b38`, bordas douradas `#cba66b` e texto creme `#f6edda`, mantendo o formato pixelado. Nas falas do jogador, ocultar o retrato e remover a coluna reservada à imagem; mostrar somente **Você** (localizado) e a fala, preservando os controles. Demais personagens continuam com seus retratos coloridos e aparências existentes.
- Transmissões de áudio, rádio, registros escritos e gravações sem vídeo não mostram pessoas, mesmo quando o nome do autor é conhecido. Inclui os registros de Lina, a gravação do antigo defensor, transmissões interceptadas e a voz do portal bloqueado. Usar toda a largura para texto, sem coluna vazia. Retratos de outros personagens aparecem em conversa presencial ou vídeo; falas do jogador continuam sem imagem. `meioComunicacao` permite indicar `audio`, `video` ou `presencial` explicitamente; fontes antigas são classificadas pelos metadados originais, antes da tradução.

- Conversas da campanha, do portal e do castelo usam caixa roxa com borda dourada, texto claro e retrato à esquerda quando a fala admite imagem. A referência `references/Captura de tela 2026-09-13 133112.png` orienta somente a disposição visual; retratos e código são originais, sem personagens ou imagens de Undertale.
- `dialogos.js` centraliza retratos de 12 × 12 e identificação dos falantes; `dialogos.css` centraliza o formato. Retratos: jogador, Lina Varela, Senhor do Tempo com cabeça de relógio, entidade coroada do Limbo e guardas. Falantes cuja identidade ainda é desconhecida usam silhueta com interrogação; o antigo defensor não recebe o rosto do jogador. A forma humana futura do Senhor do Tempo continua desativada.
- A apresentação é atualizada a cada fala: respostas do jogador e transmissões de áudio removem a imagem. A escolha usa o nome original ou o autor da fala, preservando português, inglês e espanhol. Registros de Lina e narração não exibem retratos; somente vídeo ou presença do personagem permitem sua imagem.
- A referência orienta o formato da caixa, não uma conversão para preto e branco. Retratos mantêm cores: pele e roupas do jogador, jaleco de Lina, coroa dourada e manto roxo da entidade, armadura dos guardas. O Senhor do Tempo reutiliza o desenho anterior em `criarRetratoDoSenhorDoTempo`, com cores, cabeça de relógio e detalhes ciano/magenta. Na Dimensão Glitch permanece a forma geométrica original; a armadilha do Intervalo mantém a forma que já usava nessa cena. Não substituir esses desenhos pelo novo busto genérico.
- Preservar textos completos, ordem, botões, escolhas, pausa, progresso, recompensas e bloqueio de Escape/clique no fundo. Não adicionar digitação gradual ou exigir um clique extra para revelar texto. Retratos são decorativos; nome e fala mantêm seus elementos acessíveis.
- Caixa da campanha fica na parte inferior da tela, com altura ajustada ao texto e rolagem para conteúdo excepcionalmente longo. Em celular, reduzir o retrato para 64 px e manter botões acessíveis. Portal e castelo usam o mesmo formato; a imagem examinada do casal permanece uma ilustração separada do retrato de quem fala.
- A carta encontrada após a Fase 6 permanece como documento, com apresentação própria. Cenas de aproximação da entidade e revelação de capítulo preservam seus cenários e controles.

### Abertura da Fase 1: memória perdida

- Ao iniciar a Fase 1 pela campanha, antes dos inimigos avançarem e antes do tutorial, mostrar três pensamentos com o título **VOCÊ**: “Como eu vim parar aqui? Não consigo lembrar…”, “Essas criaturas… Por que elas querem me atacar?” e “Preciso defender este lugar… Depois tento entender.”.
- **Continuar** avança os pensamentos; **Começar defesa** encerra a abertura e inicia o tutorial quando necessário, ou retoma o combate. Escape e clique no fundo não pulam a cena.
- A abertura pode ser relida ao iniciar novamente pelo lobby; reiniciar a batalha diretamente não a repete. Não aparece no modo infinito nem no editor. Textos em português, inglês e espanhol.
- A falta de memória diz respeito à chegada ao mundo do jogo. A Fase 18 revela que o Senhor do Tempo trouxe o jogador e apagou suas lembranças; as distorções das passagens atraem as criaturas.

- O atalho temporário **Encontrar entidade (teste)** foi removido. O acesso normal pelo relógio permanece inalterado.
- Após vencer as dez waves do Intervalo Perdido (Limbo), uma entidade vem de longe e pergunta quem trouxe o jogador. Seu nome permanece **???**; não é o Senhor do Tempo.
- O visual segue `references/Captura de tela 2026-09-09 202522.png`: rosto negro sem feições, coroa dourada com rubi e manto roxo com faixa clara, detalhes vermelhos e bordas douradas. Poucos detalhes extras, mantendo pixel art; aproximação em passos e opção de movimento reduzido.
- A pergunta oferece **Permanecer calado** e **Foi o Senhor do Tempo**. Não é possível pular a escolha pelo botão de continuar, Escape ou clique no fundo.
- No silêncio, a entidade diz: “Enfim… Ninguém entra sem minha permissão. E ninguém sai sem que eu permita. Siga-me.” O jogador chega diante do castelo e escolhe **Entrar no castelo**, iniciando exploração livre.
- O silêncio, por si só, não libera o Capítulo 3 nem marca o desfecho principal como visto: é preciso concluir a arena e a conversa. Não remove capítulos já liberados; as recompensas da vitória são mantidas. É possível repetir o Limbo e escolher novamente.
- Ao falar sobre o Senhor do Tempo, a entidade revela que ele trouxe outras pessoas, desobedeceu seus avisos e já perdeu poderes que nunca recuperará. O jogador pergunta “Que consequências?”. A entidade afirma que nenhuma entidade da dimensão do jogador tem autoridade ali.
- A entidade explica que o Senhor do Tempo acessa o Limbo distorcendo o tempo. A barreira é ativada **durante esta cena**, impedindo novas entradas dele por esse meio; não impede o jogador de repetir a fase pelo relógio existente.
- A entidade devolve o jogador à sua dimensão. Esse caminho mantém a liberação do Capítulo 3 e a tela de vitória existentes, sem conceder recompensas uma segunda vez.
- A cena substitui o antigo registro final e aparece a cada vitória no Limbo, inclusive em saves antigos, permitindo rever a escolha. Não aparece em derrota, modo infinito ou mapas do editor.

### Castelo, arena e promessa de ajuda

- Continuidade e diálogos: `docs/HISTORIA_LIMBO_E_FINAIS.md`. A Fase 18 implementa o confronto e os dois finais; roteiro executável em `fase18.js`.
- Entrar no castelo suspende a interface de tower defense da campanha. Andar com WASD/setas ou direcional de toque; interagir com E ou botão. Diálogos interrompem o movimento; soltar tecla/toque, perder foco ou ocultar a página não mantém o personagem andando.
- Térreo: mesa comprida com colisão, escada e arsenal bloqueado por dois guardas. Segundo andar: entidade, varanda para o vazio, quarto real e quarto de hóspedes com cama. É necessário ouvir o desafio antes de dormir.
- Depois de dormir, a entidade entra no quarto; o jogador volta ao térreo e sai para a arena. A arena é um desafio PvE de tower defense separado, não uma fase numerada da campanha.
- Arena: cinco waves, 12 pontos de base, 300 créditos iniciais, seis torres no máximo, flechas (60), canhão (100), gelo (80), melhoria única de 60 créditos por torre (+55% de dano). Ganhar 12 créditos por inimigo e 70 entre waves; créditos exclusivos da arena.
- A última wave inclui **???**, com 1.400 de vida. A cada nove segundos enquanto está em campo, sela uma torre por 2,5 segundos e convoca um gladiador. Se alcançar a base, causa 12 de dano. Concluir todas as waves com a base viva é vitória.
- Valores de combate centralizados em `CONFIG.casteloDoLimbo.arena`. A arena não altera balanceamento, inventário, XP, fragmentos ou missões da campanha.
- Derrota permite tentar novamente. Sair durante a arena guarda o checkpoint anterior à luta; retomá-la reinicia créditos, base e waves. Diálogos pós-vitória podem ser retomados sem repetir a batalha.
- **Salvar e voltar ao lobby** e **Continuar no Limbo** permitem retomar. O save `guardians-of-pixel-jornada-limbo-v1` participa do sistema de três slots existente. Guarda sala, posição, desafio, manhã, arena e promessa; não salva um combate pela metade.
- **Continuar no Limbo** aparece acima do relógio quebrado, fora da linha principal do lobby, com coroa, fundo roxo e moldura dourada pixelada. Mantém o checkpoint e as condições de visibilidade existentes; fica oculto enquanto uma página do menu está aberta.
- **Continuar no Limbo** fica oculto e desativado quando não existe jornada salva ou ela já foi concluída. Seu atributo `hidden` deve prevalecer sobre o estilo dos botões do lobby. A primeira entrada permanece pelo caminho do silêncio após vencer o Limbo; o botão não libera acesso antecipado.
- Ao vencer e terminar o pedido de ajuda, salvar `promessaDeAjuda: true` e liberar o Capítulo 3. Repetir o Limbo ou escolher a saída direta não revoga uma promessa conquistada. Não duplicar a recompensa da vitória original no Limbo.

#### Revisão visual e novos cômodos do castelo

- A ampliação do retrato respeita `hidden` mesmo com o estilo global de canvas. Nas demais conversas, inclusive mesa e sacada antes ou depois de examinar o retrato, não exibe imagem nem reserva espaço vazio no balão.
- O retrato do casal fica pequeno sobre o criado junto à cabeceira da cama real. Examinar abre no diálogo uma ampliação pixelada com foto, moldura e suporte traseiro/pé; Continuar fecha a imagem. Preservar a dúvida sobre a identidade da mulher. Portas laterais ganham visão oblíqua de cima e espessura; portas frontais ganham profundidade no topo do batente. Destinos, alcance e colisões das portas permanecem iguais.
- Sofá e poltronas usam encosto alto, assentos separados, braços elevados e pés visíveis para distinguir sua silhueta de molduras. A lareira tem chaminé estreita, cornija, abertura escura escalonada, pilares de pedra, toras e três chamas pixeladas. Preservar posições, dimensões de colisão e circulação; o desenho compartilhado atualiza também as poltronas dos demais cômodos.
- Remover palavras desenhadas no canvas sobre a mesa, portas, varanda e arena. Manter somente o cabeçalho da interface e o botão contextual de interação para orientação.
- Acrescentar sala de estar (sofá, poltrona, lareira e mesa baixa), biblioteca (estantes, escrivaninha, livros e globo) e galeria (retratos, armaduras e banco). Sala de estar e biblioteca acessadas pelo lado esquerdo do salão; galeria pelo segundo andar. Todas permitem retornar.
- Quartos ganham cabeceiras, criados-mudos, quadros, tapetes e móveis; salão e corredor recebem aparadores, vasos e estandartes. Desenho e colisão dos móveis compartilham os mesmos dados em `limbo-visual.js`.
- O quarto real possui um retrato interativo da entidade com uma mulher coroada. O jogador se pergunta se é sua esposa, mas não revela nomes nem confirma uma história para ela.
- As passagens usam portas de madeira com moldura, ferragens e maçaneta. Os dois acessos da escada mostram degraus e corrimãos. Paredes recebem alvenaria, pilares e tochas. A varanda continua mostrando apenas o vazio, sem paisagem ou rótulo.
- Jogador recebe cabelo, rosto, roupa, cinto e botas, com quatro quadros de caminhada e direção. A animação só avança com deslocamento real; colisão, diálogo e pausa não deixam os pés andando no lugar. Guardas e gladiadores recebem elmo, visor, armadura e lança; gladiadores animam os passos durante seu deslocamento.
- Torres da arena ganham bases de pedra e silhuetas distintas de arco, canhão e cristal. Plateia e arquibancadas ficam no fundo, fora do caminho. Não alterar custos, dano, waves, construção, recompensas ou habilidades.
- Os novos cômodos participam do checkpoint. Ao retomar um save com posição ocupada por decoração nova, reposicionar no espaço livre mais próximo, sem apagar o progresso.

## Menu inicial

### Mudança: fichas clicáveis do Álbum

- Clicar em uma figurinha abre sua ficha vertical com atributos, **Melhor contra** e fraquezas elementais; quando não há fraqueza, mostra **Nenhuma fraqueza elemental**.
- Fechar a ficha ou pressionar Escape retorna à coleção. As fichas são consultas e não alteram os atributos dos itens.

### Correções: progresso, portal e preparação

- Carregar um save sem a marca da antiga correção de progresso preserva a maior fase válida já salva; não rebaixa automaticamente o jogador à Fase 12. Valores continuam limitados às fases existentes. Não se concede progresso adicional nem se recupera por suposição progresso já perdido.
- A conversa do portal bloqueado não fecha ao clicar no fundo. Encerrar a conversa limpa seu estado; fechamentos programáticos também limpam esse estado, evitando que Escape permaneça bloqueado no lobby.
- A Torre de Varredura é incluída obrigatoriamente nas equipes das Fases 14 e 15, tanto na campanha quanto no modo infinito, respeitando o limite de seis defesas.
- A prévia do editor escala suas coordenadas pelas dimensões reais do canvas da partida (1.200 × 700).
- Os testes do portal verificam o clique antes da Fase 6, a resposta e o encerramento, em vez de exigir um botão desativado.

- A partida inicia somente ao clicar em **Começar partida**.
- O menu oferece dez ações: **Começar partida**, **Capítulos**, **Álbum**, **Como jogar**, **Loja**, **Pacote Apoiador**, **Missões**, **Conquistas**, **Waves infinitas** e **Configurações**.
- **Começar partida** abre a escolha de defesas para a fase selecionada e informa seu número abaixo do botão; a partida começa depois da confirmação da equipe.
- **Capítulos** abre os três capítulos da campanha; escolher um capítulo disponível abre somente suas fases.
- O Álbum de Figurinhas organiza torres, inimigos, Bosses, minas e skins já obtidos; cada item coletado reutiliza seu sprite pixelado real.
- **Como jogar** apresenta seis passos antes da partida: começa orientando a escolher uma torre desbloqueada com dinheiro suficiente e termina explicando que é preciso proteger a torre-base até a wave 20.
- **Configurações** abre o painel compartilhado de música, efeitos sonoros, iluminação e idioma sem iniciar uma partida.
- **Loja** abre o catálogo de defesas especiais e mostra o saldo de Fragmentos de Pixel.
- **Pacote Apoiador** abre uma oferta cosmética opcional que não altera atributos ou progressão.
- **Missões** abre o painel de 100 objetivos permanentes, progresso e recompensas disponíveis.
- **Conquistas** abre a coleção permanente de desafios concluídos e ainda bloqueados.
- **Waves infinitas** abre a escolha de defesas para a fase selecionada e, depois da confirmação, inicia um modo sem vitória na wave 20; a partida termina somente quando a base é invadida.
- O lobby não possui um botão separado de música; tocar, pausar e ajustar o volume ficam centralizados em **Configurações**.
- O rodapé do lobby mostra o saldo atual de Fragmentos de Pixel.

### Mudança: páginas de conteúdo em tela inteira no lobby

**Objetivo:** abrir as áreas de consulta imediatamente, sem obrigar o jogador a rolar o cartão principal do lobby até encontrar o conteúdo.
**Alterar:** apresentar **Capítulos**, **Álbum**, **Como jogar**, **Loja**, **Pacote Apoiador**, **Missões** e **Conquistas** como páginas que ocupam toda a área visível do lobby.
**Não alterar:** painel de **Configurações**, botões que iniciam partidas, transição e conversa do portal secreto, conteúdo, compras, recompensas, categorias, progressão, temas ou balanceamento.
**Aceitação:**
- Clicar em qualquer uma das sete áreas de consulta substitui visualmente o lobby por sua página desde o topo da tela, sem acrescentar o conteúdo abaixo dos botões principais.
- A página cobre toda a largura e a altura visível, preserva as cores do tema da fase selecionada e permanece acima do portal e das decorações do lobby.
- O cabeçalho com título, descrição e **Fechar ×** aparece no início da página; ao abrir, o foco vai para o botão de fechar.
- Quando a quantidade de cartões ultrapassa a altura disponível, somente a própria página recebe rolagem vertical; o cartão principal do lobby permanece parado atrás dela.
- **Fechar ×** ou `Esc` encerra a página, limpa seu conteúdo e devolve o foco ao botão do lobby que a abriu.
- Trocar categorias da Loja ou do Álbum e selecionar uma fase atualiza a página aberta sem retornar ao lobby.
- **Configurações** continua usando sua caixa central atual, sem ser transformada em página de tela inteira.
- O portal secreto mantém a transição fixa e o balão do Senhor do Tempo, sem receber o modo de página de tela inteira.

### Mudança: seletor de idioma

**Objetivo:** permitir que o jogador escolha o idioma da interface pelo próprio jogo.
**Alterar:** adicionar ao painel **Configurações** um grupo **Idioma** com as opções **Português**, **English** e **Español**.
**Não alterar:** mecânicas, balanceamento, progresso, recompensas, compras, áudio ou iluminação.
**Aceitação:**
- Sem uma preferência salva, o jogo inicia em português do Brasil.
- A opção ativa recebe destaque e expõe `aria-pressed="true"`; as outras permanecem inativas.
- A escolha muda imediatamente toda a interface localizada, inclusive quando uma tela interna já está aberta.
- Lobby, Capítulos, Fases, Loja, Álbum, Como jogar, tutorial guiado, Missões, Conquistas, Pacote Apoiador, menus da partida, resultados, minigames, HUD e avisos acompanham o idioma ativo.
- Nomes e descrições vindos de `CONFIG`, incluindo torres, explosivos, inimigos, melhorias, skins, emblemas, missões, conquistas, fases e bônus, são localizados no momento da exibição sem alterar seus valores de balanceamento.
- O atributo `lang` do documento acompanha `pt-BR`, `en` ou `es` para auxiliar leitores de tela.
- A escolha fica salva localmente na chave `guardians-of-pixel-idioma-v1` e é restaurada ao recarregar a página.
- Valores de idioma desconhecidos são ignorados e o jogo usa português do Brasil como alternativa segura.

### Mudança: preferências de áudio e iluminação persistentes

**Objetivo:** manter a configuração escolhida pelo jogador depois que a página for fechada ou atualizada.
**Alterar:** salvar volume da música, estado silenciado da música, volume dos efeitos, estado ativado dos efeitos e modo dia/noite.
**Não alterar:** faixas, efeitos, volume padrão de primeiro acesso, iluminação de cada modo, mecânicas ou balanceamento.
**Aceitação:**
- O jogo salva as preferências na chave `guardians-of-pixel-preferencias-v1` sempre que um controle correspondente é alterado.
- Ao recarregar, os dois seletores de volume, os botões de áudio, o modo noturno e seus estados acessíveis refletem os valores salvos.
- Valores de volume são limitados ao intervalo de 0 a 1; dados ausentes, inválidos ou inacessíveis usam 35% para música, 80% para efeitos, efeitos ativos e modo dia.
- O último volume audível de cada grupo também é preservado para que reativar um áudio não use volume zero.

### Mudança: confirmação das compras da Loja

**Objetivo:** impedir gastos acidentais de Fragmentos de Pixel.
**Alterar:** abrir uma confirmação antes de concluir qualquer compra permanente da Loja.
**Não alterar:** catálogo, preços, saldo inicial, desbloqueios, categorias, recompensas ou efeitos dos itens comprados.
**Aceitação:**
- Clicar em **Comprar** na Loja abre uma caixa com nome do item, preço e saldo restante, sem descontar Fragmentos.
- **Cancelar**, clicar fora da caixa ou pressionar `Esc` fecha a confirmação sem alterar saldo ou compras e devolve o foco ao botão de origem.
- O botão final **Comprar** verifica novamente item, saldo e compra anterior antes de descontar qualquer Fragmento.
- Uma confirmação aceita realiza uma única compra, salva o novo saldo e preserva todos os desbloqueios já existentes.

### Mudança: avisos de missão e conquista concluídas

**Objetivo:** informar imediatamente um novo marco sem interromper a partida.
**Alterar:** exibir avisos temporários enfileirados quando uma missão cruza seu objetivo ou uma conquista é desbloqueada.
**Não alterar:** critérios, objetivos, recompensas, resgate de missões, salvamento ou pausa da partida.
**Aceitação:**
- O aviso de missão informa o nome da missão e orienta a abrir **Missões** para resgatar o prêmio.
- O aviso de conquista informa nome e descrição do marco desbloqueado.
- Avisos usam uma região `aria-live="polite"`, aparecem sobre o jogo sem bloquear cliques e são exibidos um por vez.
- Uma missão já concluída e uma conquista já salva não geram o mesmo aviso novamente.
- Títulos, nomes e descrições acompanham português, inglês e espanhol.

### Mudança: tutorial guiado da primeira partida

**Objetivo:** ensinar novos jogadores a iniciar sua primeira defesa praticando as ações essenciais antes que os inimigos avancem.
**Alterar:** abrir automaticamente o guia para quem ainda não o concluiu e conduzir a primeira partida normal por cinco passos: entender o objetivo, escolher a Torre padrão, construí-la fora do caminho, selecioná-la e liberar a primeira wave.
**Não alterar:** dinheiro inicial, custos, atributos, quantidade ou composição das waves, desbloqueios, recompensas, modo infinito ou regras de construção, melhoria e venda.
**Aceitação:**
- Um jogador sem registro do tutorial vê o painel **Como jogar** aberto no primeiro acesso ao lobby.
- Ao iniciar a primeira partida normal sem ter concluído o tutorial, a wave 1 fica pausada antes da criação do primeiro inimigo.
- O passo 1 explica que os inimigos percorrem o caminho até a torre-base e oferece continuar ou pular o tutorial.
- O passo 2 destaca a **Torre padrão** e avança somente quando ela é escolhida.
- O passo 3 destaca o mapa e avança somente depois que uma Torre padrão é construída em uma posição válida fora do caminho.
- O passo 4 pede que o jogador clique na torre construída e avança somente depois que ela é selecionada.
- O passo 5 explica prioridade de alvo, melhoria e venda; clicar em **Começar defesa** encerra o tutorial e libera a wave 1.
- Em todos os passos, o painel do treinamento permanece acima do mapa e dos elementos destacados, com título, descrição e botões totalmente legíveis.
- Enquanto o tutorial guiado está ativo, inimigos, waves e cronômetros permanecem pausados, e as ações de melhorar, vender e mudar prioridade não alteram a torre.
- **Pular tutorial** encerra o guia, libera a partida imediatamente e registra o tutorial como concluído.
- A conclusão fica salva localmente; partidas normais futuras começam sem o guia automático.
- O painel **Como jogar** mantém um resumo em seis passos e oferece **Jogar tutorial** para repetir o treinamento a qualquer momento.
- Iniciar **Waves infinitas** nunca abre automaticamente o tutorial guiado.

### Mudança: equipe de até seis defesas e teto de construção

**Objetivo:** reduzir o excesso de opções durante a batalha e manter os mapas mais legíveis, exigindo que o jogador prepare sua equipe antes de começar.
**Alterar:** limitar a seleção pré-partida a 6 defesas e reduzir para 15 o limite-base de torres das Fases 5, 6 e 7.
**Não alterar:** limites-base das Fases 1 a 4 e da Dimensão Glitch, bônus de 1 vaga da Licença de Construção, limites próprios de cada defesa, custos, atributos, desbloqueios, progressão, waves ou regras de posicionamento.
**Aceitação:**
- Os limites-base permanecem em 10 torres na Fase 1, 12 nas Fases 2 e 3, 14 na Fase 4 e 12 na Dimensão Glitch; as Fases 5, 6 e 7 passam a permitir no máximo 15 torres.
- Com a **Licença de Construção**, os limites das Fases 1 a 7 passam a 11, 13, 13, 15, 16, 16 e 16; a Dimensão Glitch passa de 12 para 13.
- Clicar em **Começar partida** ou **Waves infinitas** abre uma página de preparação antes de iniciar a batalha.
- A preparação mostra torres de combate, suportes, minas e bombas; defesas bloqueadas permanecem visíveis, mais escuras e sem permitir seleção.
- O jogador escolhe no mínimo 1 e no máximo 6 defesas desbloqueadas. Ao atingir 6, precisa retirar uma antes de escolher outra.
- A equipe mostra seis vagas numeradas e a ordem em que as defesas foram escolhidas.
- Confirmar salva a equipe na chave `guardians-of-pixel-selecao-defesas-v1`; fechar a página sem confirmar preserva a equipe salva anteriormente.
- Durante a partida, somente as defesas confirmadas aparecem no seletor lateral, na mesma ordem geral já usada pela interface.
- Na primeira partida guiada e ao repetir o tutorial, a Torre padrão é incluída obrigatoriamente para permitir concluir os passos do treinamento.
- Reiniciar, repetir ou avançar diretamente para outra fase reutiliza a equipe da partida atual; a Dimensão Glitch reutiliza a última equipe salva para preservar a entrada direta pelo portal.
- Seleção de equipe e limite de construção também valem no modo Waves infinitas, sem alterar sua progressão ou recompensa.

### Mudança: 100 missões permanentes

- Ao concluir as 100 missões, liberar **Resgatar prêmio final**: duas skins exclusivas da Torre padrão (**Guardião Solar**, laranja/ciano, e **Sentinela Cósmica**, roxo/prata), **1.250 XP** e a conquista especial **Lenda das 100 Missões**. Não concede Fragmentos diretamente. XP segue a progressão normal de níveis.
- Basta cumprir os 100 objetivos, sem exigir os 100 resgates individuais. O prêmio final é separado dos cartões e pode ser resgatado uma única vez por slot; persistir `premioFinalResgatado`. Mostrar o prêmio no painel de Missões, incluir nos prêmios prontos e no **!** de Todas. Salvos antigos com os objetivos concluídos também podem resgatar.
- As duas skins possuem paletas para os quatro níveis, aparecem no Álbum após o desbloqueio e podem ser equipadas no painel de Missões. São cosméticas, preservam o formato da Torre padrão e não alteram atributos. Resgatar não troca automaticamente a skin equipada. Textos em português, inglês e espanhol.

- Prêmios definidos individualmente pela dificuldade: missões fáceis concedem 3–5 Fragmentos, médias 10–20 e difíceis 20–25. A primeira vitória concede 5, construir a primeira torre concede 3 e derrotar o primeiro Boss concede 5. Nenhum prêmio em Fragmentos passa de 25. Preservar a skin da missão 61 e a conquista da 83, com alternativas de 15 e 25 Fragmentos. O catálogo completo registra cada valor. Prêmios pendentes usam o novo valor; saldos e rótulos de prêmios já resgatados permanecem intactos. Não adicionar novos boosts ou alterar os atuais nesta revisão de valores.

- Os botões das categorias exibem **!** ao lado do nome quando há pelo menos uma missão concluída com prêmio não resgatado naquela categoria. **Todas** mostra o mesmo indicador quando qualquer prêmio está disponível. Ao resgatar, atualizar os indicadores: só remover quando não restarem prêmios pendentes. O aviso acessível acompanha o idioma; missões incompletas e já resgatadas não ativam o indicador.

**Objetivo:** substituir as três missões semanais por 100 objetivos fixos, sem renovação ou prazo.
**Alterar:** catálogo em CONFIG.missoes.permanentes, progresso em guardians-of-pixel-missoes-permanentes-v1 e interface com dez categorias, filtro Todas, total concluído e cartões secretos. Catálogo completo e recompensas: docs/MISSOES_PERMANENTES.md.
**Não alterar:** combate, Loja e suas ofertas semanais, trilhas, finais da Fase 18, recompensas normais de partida ou cosméticos já conquistados.
**Aceitação:**
- Metas acumuladas somam entre partidas e não expiram. Metas que compartilham um contador são concluídas juntas ao atingir cada limite; nenhum reset ao resgatar.
- Cada prêmio é resgatado uma vez por slot. A missão 61 (três vitórias) concede Sentinela Dourada e a 83 (wave 40 completa no infinito) concede Além do Limite. Se já obtidos, conceder respectivamente 15 ou 25 Fragmentos. As demais recompensas exatas constam no catálogo.
- Migrar os contadores antigos disponíveis, mesmo de semana anterior, e mapear os resgates das três missões para 11, 61 e 83. Manter cosméticos, conquistas e saldo. Recorde antigo não resgatado perde uma unidade ao migrar, pois contava wave iniciada. Dados novos nunca dependem do calendário.
- Salvar contadores, coleções de tipos/fases, vitórias por fase e resgates por slot. Dados ausentes ou inválidos usam valores seguros. Sem armazenamento disponível, manter o progresso da sessão.
- Aproveitar marcos confirmados pelo save (capítulos, carta, portal, máquina, transmissão, nível e maior fase efetivamente salva). Não inferir quantidades de eliminações por defesa, construções ou vitórias de fases intermediárias sem registros. Cenas finais 15/16 precisam ser concluídas após a atualização quando não houver registro próprio.
- Waves contam ao terminar todos os inimigos, uma única vez por wave. Reiniciar ou desistir não concede a wave incompleta. Eliminações restauradas pelo Curador não contam novamente.
- Campanha e infinito contam, conforme o objetivo. Editor, castelo e arena opcional do Limbo não geram progresso. Contadores da tentativa zeram em toda nova partida.
- Registrar torres construídas durante toda a tentativa: vender não burla o limite de construção, tipos usados, ausência de vendas, melhorias ou explosivos. Torre máxima deve possuir melhorias. Eliminações por defesa usam o golpe final; revelações contam uma vez por inimigo. Feixe exige atingir o limite real de pulsos.
- Segredos 91–100 exibem ??? e texto neutro até a conclusão. Categoria, nomes, descrições e controles têm português, inglês e espanhol.
- Atualizar avisos e recompensas prontas ao completar metas; a coleção permite continuar equipando a skin anterior. Não criar nova moeda ou desbloqueios de combate como prêmio.

### Mudança: painel de conquistas

- Cada uma das 36 conquistas possui uma imagem pixelada original em `assets/conquistas/<id>.svg`, desenhada em grade de 32 × 32 e exibida com escala nítida. O script `scripts/gerar-icones-conquistas.cjs` guarda as formas originais e permite regenerar os arquivos. A referência de explosões em `references/Captura de tela 2026-09-13 124632.png` foi consultada apenas como orientação; nenhum recorte ou pixel dela é incorporado ao jogo.
- Os cartões comuns exibem o ícone temático mesmo bloqueados, mantendo o estilo de bloqueio existente. Ocultas bloqueadas continuam com **?**, sem carregar a imagem específica. Ao desbloquear, o cartão e a notificação usam a mesma imagem. Imagens decorativas têm texto alternativo vazio; nome e descrição permanecem acessíveis no cartão e aviso. Não alterar critérios, recompensas, progresso nem persistência.
- Exemplos: Demolição em Massa recebe uma explosão original; Frequência 09, um rádio; Mestre do Fliperama, uma máquina; Pare o Relógio!, relógio e pausa. As demais possuem composições individuais relacionadas ao feito, incluindo castelo, retrato, promessa, caminhos, escudos, torres e coroa.

- A tela separa o catálogo existente em **Conquistas comuns** e **Conquistas ocultas**, cada aba com seu contador de desbloqueadas/total. O primeiro acesso abre Comuns; trocar abas ou idioma mantém a seleção durante a sessão.
- Comuns mostram nome, requisito e progresso desde o início. Ocultas usam `secreta: true` em CONFIG; antes do desbloqueio, mostrar somente **???**, ícone **?** e **Explore o jogo para descobrir.**, sem progresso ou dicas que revelem o objetivo. Depois, mostrar nome e descrição originais e progresso completo, mantendo a conquista na aba Ocultas.
- **Frequência 09**, a conquista da vitória na Dimensão Glitch e as dez novas conquistas de exploração pertencem às ocultas. O nome original **???** da conquista da Dimensão Glitch permanece também após o desbloqueio, conforme a identidade já definida; sua descrição é revelada.
- Preservar critérios, saves, desbloqueios e recompensas. Contadores e textos em português, inglês e espanhol; botões acessíveis por teclado e legíveis no celular.

#### Vinte conquistas adicionais

- O catálogo passa a 36 conquistas: 22 comuns e 14 ocultas. Nomes e requisitos das vinte anteriores estão em `docs/CONQUISTAS_NOVAS.md`; configuração incorporada em `CONFIG.conquistas`. Textos nas três línguas do jogo. Nenhuma das novas concede XP, Fragmentos, skins ou bônus de combate.
- Duas conquistas ocultas adicionais dos finais da Fase 18: **Esse é o fim?**, ao concluir a cena em que o Senhor do Tempo mata o jogador; **Finalmente em casa**, ao concluir a cena em que a entidade intercepta a lâmina e protege o jogador. Não são concedidas por derrota comum, promessa ou início do diálogo. Cada uma tem ícone pixelado original próprio; nome, descrição e imagem permanecem ocultos até o desbloqueio. Persistem por slot e rever o final não duplica desbloqueios.
- `CONFIG.desafiosDeConquistas` concentra os limites: 90% do caminho para fim, 50% para metade, três efeitos simultâneos, três partidas encerradas por sessão e oito cômodos acessíveis.
- As dez de combate contam na campanha e no infinito conforme houver vitória; editor e arena independente não contam. Desistências não contam como partidas terminadas. Reiniciar consome a oportunidade de revanche; somente a tentativa imediatamente seguinte na mesma fase e modo pode concedê-la. Recarregar preserva a última derrota, mas zera o contador de partidas da sessão.
- Considerar o caminho real do Boss. Para posição de torre, projetar no trecho mais próximo entre todos os caminhos e comparar com metade do comprimento daquele caminho. Todas as construções da tentativa contam mesmo se vendidas ou destruídas; usar explosivos invalida Última linha de defesa.
- Na última hora acompanha a torre de origem do golpe final, inclusive projéteis e Feixe. A torre precisa ter sido construída quando aquele inimigo já estava nos últimos 10%; o último golpe da batalha deve ser dela. Pausas não alteram esse critério.
- Controle absoluto considera congelamento, lentidão, queimadura, marca, corrosão, vulnerabilidade sísmica e estase: três tipos ainda ativos no golpe fatal. Retorno do Eco não conta como eliminação; inimigos restaurados pelo Curador não repetem esses feitos. Vender torre não equivale a perdê-la para um inimigo.
- Sem pressa usa a velocidade normal que a simulação atual oferece, com pausas permitidas; não acrescenta controle de velocidade.
- Salas visitadas, rotas concluídas e última derrota são salvas por slot em `guardians-of-pixel-historico-conquistas-v1`. Desbloqueios usam o armazenamento de conquistas existente. Históricos antigos não comprovados precisam ser jogados novamente; retomar uma vitória da arena ou uma promessa já salva permite reconhecer esses marcos.
- Na exploração, entrada, retrato e guardas contam na interação real; arena começa a contar ao iniciar a primeira wave, vitória antes da conversa e promessa só depois do último diálogo. Duas respostas exige terminar a conversa da verdade e entrar no castelo pela rota do silêncio no mesmo slot. Sem recompensas extras e sem mudanças nos finais planejados da Fase 18.

**Objetivo:** registrar marcos permanentes do jogador e mostrar claramente quais desafios ainda faltam completar.
**Alterar:** adicionar **Conquistas** ao lobby, salvar estatísticas permanentes e exibir oito conquistas com nome, descrição, progresso e estado de desbloqueio.
**Não alterar:** recompensas das missões, saldo de Fragmentos, compras, progressão das fases, balanceamento, composição das waves ou regras de vitória e derrota.
**Aceitação:**
- O botão **Conquistas** aparece entre **Missões** e **Waves infinitas** e informa quantas das oito conquistas foram desbloqueadas.
- O painel mostra as conquistas da aba selecionada; cartões bloqueados ficam mais escuros e totalmente em preto e branco, enquanto cartões desbloqueados recuperam as cores e exibem **Desbloqueada**. Conteúdo das ocultas segue as regras de sigilo acima.
- **Primeira Vigília** é desbloqueada ao concluir 1 partida da campanha normal.
- **Guardião dos Cinco Reinos** é desbloqueada ao concluir as cinco primeiras fases da campanha; a sexta fase não remove a conquista já obtida.
- **Guardião de Todos os Reinos** é desbloqueada ao concluir as oito fases disponíveis da campanha normal.
- **Mestre do Arsenal** é desbloqueada ao comprar todos os itens disponíveis atualmente na Loja; novos itens adicionados ao catálogo passam a fazer parte desse total.
- **Lenda do Infinito** é desbloqueada ao alcançar a wave 100 no modo infinito.
- **Caçador de Pixels Supremo** é desbloqueada ao eliminar 500 inimigos ao longo de qualquer quantidade de partidas e em qualquer modo; inimigos comuns, especiais e Bosses contam uma vez.
- **Além do Limite** é uma conquista especial desbloqueada ao resgatar a missão semanal de alcançar a wave 40 no modo infinito.
- **???**, com a descrição **Ainda está te esperando, sempre vai estar.**, é uma conquista especial desbloqueada ao vencer a Dimensão Glitch.
- Estatísticas de eliminações, conclusões de campanha e maior wave infinita são permanentes e não reiniciam com a renovação semanal.
- Conquistas são verificadas após cada eliminação, vitória normal, nova maior wave infinita e compra da Loja, além de serem recalculadas ao carregar o jogo para reconhecer progresso e compras existentes.
- Cada novo desbloqueio exibe um aviso não bloqueante com o nome e a descrição da conquista.
- O desbloqueio de uma conquista não concede Fragmentos nem modifica torres; ele registra somente o marco permanente na coleção.
- Nomes, ícones, descrições, critérios e objetivos ficam centralizados em `CONFIG.conquistas`.

### Mudança: Pacote Apoiador cosmético

**Objetivo:** permitir que jogadores apoiem o desenvolvimento recebendo reconhecimento visual sem comprar vantagem competitiva.
**Alterar:** adicionar o botão **Pacote Apoiador** ao lobby, uma tela própria e uma demonstração local persistente do **Pacote Coração de Pixel**.
**Não alterar:** dano, alcance, cadência, créditos, Fragmentos, limites, recompensas, Loja, missões, conquistas, composição das waves ou progressão das fases.
**Aceitação:**
- O botão aparece entre **Loja** e **Missões** e passa a mostrar **Pacote ativo** depois da ativação.
- O pacote contém a skin **Aurora Pixel** para os quatro níveis da Torre padrão, o **Emblema Coração** no perfil e o **Selo Apoiador**.
- Todos os itens são cosméticos; a tela informa explicitamente que o pacote não aumenta dano, créditos, Fragmentos ou limite de torres.
- Enquanto `CONFIG.pacoteApoiador.modoDemonstracao` for verdadeiro, o botão principal exibe **Ativar demonstração** e avisa que nenhuma cobrança será feita.
- A demonstração salva aquisição e skin equipada na chave local `guardians-of-pixel-pacote-apoiador-v1` e mantém o pacote depois de atualizar a página.
- Ativar o pacote equipa automaticamente **Aurora Pixel** e substitui cores e detalhes de formato da Torre padrão, sem alterar seus atributos.
- O nível 0 usa uma estrutura compacta; o nível 1 acrescenta faixa luminosa, canhão mais longo e aletas laterais, sendo visualmente diferente em vez de apenas maior.
- Os níveis 2 e 3 acrescentam novos estabilizadores, luzes e núcleo central, mantendo cada evolução reconhecível.
- Equipar **Aurora Pixel** desequipa a skin de missão; equipar **Sentinela Dourada** desequipa **Aurora Pixel**, garantindo uma única skin ativa.
- No modo real, `CONFIG.pacoteApoiador.checkout` exige dois endpoints da mesma origem, token CSRF, contexto seguro e uma lista explícita de origens HTTPS permitidas para o provedor.
- O navegador envia somente o identificador `coracaoDePixel`; preço, moeda, usuário e produto válido são determinados pelo servidor.
- A URL retornada só é aberta quando usa HTTPS e pertence à lista de origens permitidas.
- Aquisição salva em `localStorage`, parâmetro de retorno ou resposta do navegador nunca libera o pacote no modo real; somente `GET` autenticado no servidor confirma o direito depois de um webhook de pagamento validado.
- O contrato de integração, segurança e homologação fica documentado em `docs/CHECKOUT_APOIADOR.md`.

## Menu da partida

- Durante a partida, um botão com três traços horizontais fica no canto superior direito do mapa.
- O botão exibe o indicador **ESC** e pode ser aberto ou fechado tanto pelo mouse quanto pela tecla `Esc`.
- O botão abre três ações: **Desistir**, **Reiniciar fase** e **Configurações**.
- Abrir o menu pausa imediatamente inimigos, torres, tiros, waves, avisos e cronômetros; fechar o menu continua a partida do mesmo ponto.
- **Desistir** abre uma confirmação que mostra a wave alcançada e a quantidade exata de Fragmentos de Pixel da recompensa.
- Confirmar **Desistir** concede a recompensa pelas waves, não conclui nem desbloqueia fases e apresenta o lobby em uma vinheta de 1,4 s que desliza do topo da tela.
- Escolher **Nunca!** fecha somente a confirmação e retorna ao menu pausado da fase, sem alterar a partida.
- **Reiniciar fase** recomeça imediatamente a fase selecionada na wave 1, com 150 créditos, sem torres e sem desbloquear fases.
- **Configurações** abre o mesmo painel disponível no lobby, mantém a partida pausada e oferece controles separados de volume da música e dos efeitos, botões independentes para silenciar cada grupo, o modo dia/noite e o seletor de idioma.
- O modo noite altera apenas a iluminação do lobby e do mapa; inimigos, balanceamento, progressão e trajetórias não são modificados.

### Mudança: partida sem cabeçalho redundante

**Objetivo:** ampliar o espaço vertical disponível para o mapa e manter somente informações úteis durante a defesa.
**Alterar:** remover da tela da partida o cabeçalho com **GP**, **Guardians of Pixel**, **Comando de defesa** e **Zona sob proteção**; reorganizar a aplicação em uma linha flexível para o mapa e outra para os controles inferiores.
**Não alterar:** título e identidade visual do lobby, mapa interno de 1.200 × 700 px, HUD, seletor de defesas, menu de pausa ou barra inferior.
**Aceitação:**
- Ao iniciar qualquer fase ou o modo infinito, não existe faixa de marca acima do mapa.
- Em telas acima de 760 px, a aplicação ocupa exatamente a altura visível do navegador e o mapa reserva somente 116 px para margens, espaçamento e controles inferiores, em vez dos 170 px anteriores.
- O canvas cresce até encontrar primeiro o limite de largura ou a altura visível menos esses 116 px, preservando a proporção interna de 1.200 × 700 px, sem distorção, corte ou sobreposição da barra inferior.
- O seletor vertical de defesas acompanha a altura disponível do palco e permanece acima dos controles.
- O lobby continua exibindo o título principal **Guardians of Pixel** normalmente.

### Mudança: atalhos de teclado da partida

**Objetivo:** permitir jogar com teclado e mouse sem depender exclusivamente de cliques nos controles.
**Alterar:** adicionar `E` para melhorar a torre selecionada, `X` para vendê-la e `Esc` para abrir ou fechar o menu de pausa.
**Não alterar:** cliques do mouse, custos, valores de venda, requisitos de seleção, pausa, progressão ou balanceamento.
**Aceitação:**
- Dada uma torre selecionada durante a partida ativa, pressionar `E` executa a mesma ação do botão **Melhorar torre**.
- Dada uma torre selecionada durante a partida ativa, pressionar `X` executa a mesma ação do botão **Vender torre**.
- Durante a partida, pressionar `Esc` abre o menu e pausa o jogo; pressionar novamente fecha o menu e continua.
- Com as configurações abertas, `Esc` fecha as configurações antes de voltar a controlar o menu da partida.
- Durante telas de resultado, pausa ou configurações, `E` e `X` não executam ações.
- Os botões de melhorar, vender e pausar exibem respectivamente os indicadores **E**, **X** e **ESC**, mantendo também o funcionamento pelo mouse.

## Telas de resultado

- As telas de derrota e vitória permanecem abertas até o jogador escolher uma ação; não existe mais retorno ou reinício automático.
- No **GAME OVER**, os botões disponíveis são **Recomeçar fase** e **Voltar ao menu**.
- Na **VITÓRIA**, os botões disponíveis são **Repetir fase**, **Voltar ao menu** e **Próxima fase**.
- **Recomeçar fase** e **Repetir fase** iniciam a mesma fase na wave 1, com 150 créditos e sem torres.
- **Voltar ao menu** apresenta o lobby usando a mesma vinheta vertical aplicada ao menu de pausa.
- **Próxima fase** inicia imediatamente a fase seguinte já desbloqueada, sem passar pelo lobby.
- Na última fase disponível, **Próxima fase** permanece visível e desativado.

### Mudança: escolhas após o resultado

**Objetivo:** permitir que o jogador decida o que fazer depois de vencer ou perder.
**Alterar:** remover as transições automáticas das telas de resultado e substituí-las por botões persistentes.
**Não alterar:** condições de vitória e derrota, desbloqueio sequencial, dinheiro inicial, waves, torres ou trajetórias.
**Aceitação:**
- Dada uma derrota, o painel oferece somente recomeçar a fase ou voltar ao menu.
- Dada uma vitória antes da última fase, o painel oferece repetir, voltar ao menu ou iniciar diretamente a próxima fase desbloqueada.
- Dada uma vitória na última fase disponível, o botão **Próxima fase** aparece desativado.
- Enquanto nenhuma ação for escolhida, mapa, inimigos, torres, projéteis e waves permanecem congelados.

### Mudança: pausa pelo menu da partida

**Objetivo:** permitir interromper e retomar a partida com segurança pelo botão de três traços.
**Alterar:** ao abrir o menu ou as configurações durante uma partida, congelar toda a simulação e compensar os cronômetros pelo tempo pausado.
**Não alterar:** música escolhida, volumes, economia, progressão, posições e atributos existentes antes da pausa.
**Aceitação:**
- Inimigos, torres e projéteis não se movem nem atacam enquanto o menu está aberto.
- Waves, avisos, ataques e telas de vitória ou derrota não avançam durante a pausa.
- Fechar o menu retoma a partida do mesmo ponto, sem disparos ou inimigos atrasados surgirem imediatamente.
- Abrir **Configurações** pelo menu mantém a pausa até o painel ser fechado.
- Confirmar **Desistir** não conclui a fase nem desbloqueia a próxima, mas concede os Fragmentos correspondentes às waves alcançadas.

### Mudança: confirmação ao desistir

**Objetivo:** permitir sair voluntariamente da partida sem perder os Fragmentos conquistados pelas waves.
**Alterar:** substituir **Voltar ao lobby** por **Desistir** no menu da partida e exigir confirmação antes de sair.
**Não alterar:** cálculo de recompensa dos modos normal e infinito, pausa, progressão sequencial, boosts ou vinheta de retorno ao lobby.
**Aceitação:**
- Clicar em **Desistir** mantém a partida pausada e abre uma mensagem com a wave atual e a recompensa calculada.
- Desistir ou perder na wave 1 informa 0 Fragmentos; a recompensa normal começa na wave 2 com 2 Fragmentos.
- Na campanha normal, desistir na wave 6 informa e concede 6 Fragmentos.
- No modo infinito, desistir na wave 6 informa e concede 3 Fragmentos.
- Confirmar **Desistir** concede a recompensa uma única vez, limpa a partida atual e volta ao lobby.
- Clicar em **Nunca!** ou pressionar `Esc` não concede Fragmentos, fecha a confirmação e retorna ao menu pausado da fase.

## Áudio

- Acompanhamento de **Festa na Praça Pixel**: bumbo nos tempos fortes, caixa nos tempos 2 e 4, chimbal em todas as colcheias e percussão complementar com virada no fim da frase. O sequenciador aceita instrumentos simultâneos por passo; padrões antigos continuam iguais. Volume-base da bateria do lobby: 0,266. Acordes curtos em contratempo, onda triangular, volume 0,063 por nota e duração de 0,45 passo. Bateria e acordes receberam 40% de ganho adicional para destacar o acompanhamento. Preservar melodia, baixo, andamento, ganho geral, controles e cópia da música calma anterior.

- Extensão das trilhas curtas: a camada procedural da Fase 1, Fases 2, 3, 5, 12/16, 13, 14, Dimensão Glitch, Intervalo Perdido e castelo do Limbo passam a ter forma A–B–A–C. A é o tema original; B e C são frases novas, não cópias transpostas. Preservar síntese, andamento, ganho, arquivo MP3 da Fase 1 e controles. Fase 6, lobby, conversa do portal e as sete partituras recentemente refeitas permanecem inalterados.
- Ciclos completos: Fase 1 23,04 s; Fase 2 17,28 s; Fase 3 25,60 s; Fase 5 21,12 s; Fases 12/16 16,32 s; Fase 13 17,92 s; Fase 14 23,04 s; Glitch 19,84 s; Limbo/arena 30,72 s; melodia do castelo 38,40 s. Acompanhamentos curtos podem repetir dentro das seções; a melodia completa só retorna ao início ao terminar o arranjo.
- Revisão das fases 4, 7, 8, 9, 10, 11 e 15: partituras originais próprias em `CONFIG.audio.partiturasPorFase`, com três frases distintas por música e arranjos de quatro ou seis seções. Notas em MIDI, silêncios, sustentações, baixos, contracantos e padrões de bateria independentes; não são transposições da mesma melodia. Reutilizar somente o sintetizador/sequenciador.
- Fase 4: **Chamados entre as Ruínas**, passos de 220 ms, ganho 165%, frases de 16 passos, chamadas pentatônicas e percussão sincopada. Fase 7: **Águas que Sussurram**, 390 ms, 320%, frases de 12 passos, notas sustentadas e pausas com gotas esparsas. Fase 8: **Passos do Primeiro Titã**, 285 ms, 190%, frases de 16 passos, bordões graves e tambores pesados.
- Fase 9: **Corrida no Circuito Neon**, 150 ms, 180%, frases de 16 passos em seis seções, baixo pulsante, contracanto rápido e bateria eletrônica. Fase 10: **Protocolo sem Resposta**, 260 ms, 190%, frases assimétricas de 14 passos e sinais agudos espaçados. Fase 11: **Amanhã em Fragmentos**, 315 ms, 185%, frases de 20 passos com sustentações e interrupções. Fase 15: **Páginas sob Suspeita**, 245 ms, 190%, frases de 12 passos com acompanhamento ternário de investigação, independente da fase 10.
- A Fase 6 mantém exatamente sua composição, ritmo, instrumentos e ganho anteriores. Não alterar lobby, castelo, fases secretas, Fases 1–3, 5, 12–14 e 16. Mapas do editor mantêm as trilhas anteriores por tema. Modo infinito das sete fases usa as novas partituras. Ao trocar de fase, reiniciar o sequenciador compartilhado para aplicar o andamento correto. Volume, silêncio, retomada e alternativa sem Web Audio continuam funcionando.
- Ao entrar ou retomar a exploração do castelo do Limbo, toca a composição procedural original **Salões do Vazio**: arpejos suaves semelhantes a alaúde, melodia de flauta e ecos lentos de **Ecos do Limbo** ao fundo. A atmosfera é medieval e vazia, sem reproduzir a melodia de Dialtone.
- A trilha do castelo usa passos de 400 ms, ganho relativo de 400% e os controles compartilhados de volume/silêncio. O ganho recebeu mais 25% sobre os 320% anteriores para melhorar a audibilidade, preservando instrumentos, notas e a proporção dos ecos ao fundo. Continua entre cômodos, diálogos e descanso, sem reiniciar; substitui a música anterior. Na arena toca **Ecos do Limbo** e, ao sair para o lobby, retorna a música do lobby. Não altera as trilhas das fases da campanha.
- O lobby volta a usar a música calma anterior, preservada em `CONFIG.audio.musicaAnteriorDoLobby`, com sua síntese original, passos de 430 ms e ganho de 125%. `CONFIG.audio.usarMusicaAnteriorDoLobby` passa a ser `true` por padrão. Preservar controles, autoplay, transições e todas as músicas das fases.
- **Festa na Praça Pixel** fica guardada em `CONFIG.audio.musicaDoLobby`: composição animada em chiptune, passos de 240 ms, ganho de 125%, quatro frases de 16 passos na ordem A–B–A–C–A–D e ciclo de 23,04 segundos, com seu acompanhamento completo. Para voltar a ela, mudar `CONFIG.audio.usarMusicaAnteriorDoLobby` para `false` e recarregar.
- A reprodução da música exclusiva é tentada automaticamente assim que o carregamento da página termina, sem exigir o clique em um botão do menu.
- Se a política de autoplay do navegador bloquear áudio audível, o jogo tenta liberá-lo na primeira interação em qualquer lugar da página e remove essa escuta assim que a música começa.
- A Fase 1 toca somente sua composição procedural pixelada existente, com melodia em tonalidade menor, baixo grave e percussão abafada. `background_music.mp3` permanece pausado nessa trilha, inclusive ao reativar a música; sem Web Audio, ela fica sem música em vez de reproduzir a parte normal.
- A música pixelada da Fase 1 mantém notas, instrumentos, arranjo, passos de 360 ms e ganho relativo de 125%. A remoção da parte normal vale também no modo infinito e onde essa mesma trilha é usada no editor.
- Volume e silenciar controlam a composição pixelada e indicam corretamente seu estado. Ao voltar ao lobby ou entrar em outra fase, ela é encerrada. Preservar todas as outras trilhas e seus usos de `background_music.mp3`.
- A Fase 2 substitui essa música por uma composição procedural retrô inspirada em sonoridade egípcia, baseada em escala frígia dominante, com melodia, bordão grave e percussão sintetizados pelo navegador.
- A Fase 3 substitui o arquivo de fundo por uma composição procedural exclusiva do Ártico, com melodia cristalina, sinos agudos, baixo suave e vento sintetizados pelo navegador.
- A Fase 4 substitui o arquivo de fundo por uma composição procedural exclusiva de selva, com melodia sombria pixelada, baixo grave, tambores sintetizados e pequenas chamadas agudas.
- A Fase 5 substitui o arquivo de fundo por uma composição procedural exclusiva do Bosque do Crepúsculo, com melodia misteriosa, harmonia pixelada, baixo suave e ruído de folhas sintetizados pelo navegador.
- A Fase 6 substitui o arquivo de fundo por uma composição procedural exclusiva da Forja Vulcânica, com melodia grave, ondas serrilhadas, baixo distorcido e percussão sintetizada.
- A Fase 7 substitui o arquivo de fundo por uma composição procedural exclusiva do Pântano Tóxico, com melodia úmida e misteriosa, baixo profundo, gotas e percussão abafada sintetizados.
- A Fase 8 usa **Passos do Primeiro Titã**, uma composição própria, grave e ancestral, não uma variação da melodia da Fase 4.
- A Dimensão Glitch substitui o arquivo de fundo por uma composição procedural misteriosa e corrompida, com melodia desafinada, baixo grave, cortes digitais e ruídos curtos sintetizados.
- A trilha atual da Fase 4 toca em passos de 220 ms e usa ganho relativo de 165%; a versão anterior de 260 ms/145% permanece como alternativa por tema no editor.
- A trilha da Fase 2 usa ganho relativo de 165%, além de melodia, baixo e percussão reforçados, para compensar a diferença de volume percebido em relação ao arquivo de música da Fase 1.
- Ao sair de qualquer fase, todas as trilhas da partida são encerradas antes de a música exclusiva do lobby começar; ao iniciar qualquer fase, a música do lobby é encerrada antes da trilha da partida.
- A música pode ser silenciada ou ativada no painel de configurações compartilhado entre lobby e partida.
- O volume da música pode ser ajustado de 0% a 100% nesse painel compartilhado.
- O volume e o botão de silenciar controlam a música exclusiva do lobby, `background_music.mp3`, a camada pixelada da Fase 1, todas as trilhas procedurais das Fases 2 a 7 e a trilha da Dimensão Glitch.
- A trilha da Fase 3 toca em passos de 400 ms com ganho relativo de 155% e usa `background_music.mp3` como alternativa quando Web Audio não está disponível.
- A trilha da Fase 5 toca em passos de 330 ms com ganho relativo de 165% e usa `background_music.mp3` como alternativa quando Web Audio não está disponível.
- A trilha da Fase 6 toca em passos de 240 ms com ganho relativo de 155% e usa `background_music.mp3` como alternativa quando Web Audio não está disponível.
- A trilha atual da Fase 7 toca em passos de 390 ms com ganho relativo de 320% e usa `background_music.mp3` como alternativa quando Web Audio não está disponível; a composição anterior de 300 ms permanece no editor.
- O jogo possui efeitos sintetizados distintos para torre destruída pelo Sabotador, Game Over e vitória.
- O Rugido Ancestral usa o arquivo gravado sons/rugido-urso-ancestral.ogg, toca somente quando a habilidade do Urso Ancestral acerta ao menos uma torre e obedece ao volume e ao botão dos efeitos sonoros.
- A gravação “Bear growl”, de Shizhao, é usada sem alterações sob CC BY 3.0, com crédito e fonte registrados em sons/CREDITOS.md.
- Os efeitos começam em 80% de volume, acima dos 35% iniciais da música.
- O volume dos efeitos pode ser ajustado independentemente de 0% a 100%.
- O botão **Desativar efeitos** silencia apenas os efeitos sonoros; a música continua tocando.
- O botão **Ativar efeitos** restaura o último volume audível escolhido para os efeitos.
- Os efeitos sonoros continuam ativos quando somente a música é silenciada, e a música continua ativa quando somente os efeitos são silenciados.

### Mudança: volume da música do Pântano Tóxico

**Objetivo:** tornar a música da Fase 7 claramente audível no mesmo ajuste de volume usado nas demais fases.
**Alterar:** aumentar o ganho relativo da composição procedural do Pântano Tóxico de 240% para 320%.
**Não alterar:** notas, ritmo de 300 ms, instrumentos, volume escolhido pelo jogador, controles de áudio, música das demais fases ou alternativa sem Web Audio.
**Aceitação:**
- Ao iniciar a Fase 7 com a música ativa, a composição do pântano usa ganho relativo de 320%.
- Silenciar, reativar e ajustar o volume continuam afetando a trilha imediatamente.
- Ao sair da Fase 7, a música do pântano é encerrada como antes.

### Mudança: música exclusiva da Fase 4

**Objetivo:** reforçar a identidade das Ruínas da Selva com uma trilha própria.
**Alterar:** substituir a música comum da Fase 4 por uma composição procedural tribal e pixelada que toca somente nessa fase.
**Não alterar:** música do lobby, trilhas das Fases 1 a 3, volume inicial, efeitos sonoros ou comportamento dos controles de áudio.
**Aceitação:**
- Ao iniciar a Fase 4, a música anterior para e a trilha da selva começa.
- A composição combina uma melodia em tonalidade menor, baixo, percussão tribal sintetizada e detalhes agudos, usando os valores centralizados no CONFIG.
- Silenciar, ativar ou ajustar o volume afeta a trilha da selva imediatamente.
- Ao voltar ao lobby ou iniciar outra fase, a trilha da selva é encerrada.
- Se o navegador não oferecer áudio procedural, a Fase 4 usa a música de fundo comum como alternativa.

## Interface visual

- A direção de arte pixelada e retrô aparece no lobby, no cenário do mapa e nos inimigos.
- Terreno, caminho, portões, barras de vida e decorações usam formas blocadas, contornos rígidos e cores chapadas.
- Torres, tiros e HUD mantêm acabamento suave para preservar a leitura das ações da partida.
- Marca GP, título da partida, status da zona, central da torre e botões externos ao mapa usam tipografia, bordas e sombras pixeladas.
- A Fase 1 possui árvores, pedras, arbustos, flores e lago pixelados como decorações não interativas.
- A Fase 2 usa tema de deserto, com areia quadriculada, caminho em tons de pedra, cactos, matos secos, rochas e pirâmides pixeladas.
- A Fase 3 usa tema ártico, com neve quadriculada, caminho de gelo, iglus, pinguins, pinheiros nevados, blocos de gelo e lago congelado pixelados.
- A Fase 4 usa tema de selva, com vegetação quadriculada, caminho de terra, árvores densas, cipós, flores tropicais, lagos e ruínas pixeladas.
- A Fase 5 usa floresta temperada de outono, com terreno em verde-oliva, árvores alaranjadas, cogumelos, folhas, troncos caídos e pequenos lagos pixelados.
- A Fase 6 usa uma forja vulcânica, com basalto quadriculado, lava, vulcões, rochas e cristais de obsidiana pixelados.
- A Fase 7 usa um pântano tóxico, com lodo quadriculado, água venenosa, árvores retorcidas, juncos, bolhas e cogumelos luminosos pixelados.
- A Fase 8 se passa no Passado e usa a Selva Primordial, com mata verde-escura, caminho de terra e âmbar, árvores antigas, samambaias gigantes, cristais de âmbar e ossos pixelados.
- O fim da trajetória possui uma torre-base pixelada, com cores próprias para os sete temas da campanha.
- Os pinguins são decorações não interativas; não recebem dano nem alteram a trajetória.
- Os cinco inimigos do elenco da Fase 1 possuem desenhos pixelados próprios: Vermelho, Roxo, Ciano rápido, Sabotador e Boss comum.
- O Sabotador mantém seus projéteis pixelados próprios e aparece nas oito fases.
- Escorpiões, Múmias e o Faraó de Areia possuem desenhos pixelados próprios e aparecem somente no mapa de deserto.
- Lobos de Gelo, Yetis e o Titã Glacial possuem desenhos pixelados próprios e aparecem somente no mapa ártico.
- Macacos Saqueadores, Onças da Selva, Gorilas da Selva e o Colosso da Selva possuem desenhos pixelados próprios e aparecem somente no mapa de selva.
- Raposas Ladinas, Javalis Furiosos, Corujas Sombrias e o Urso Ancestral possuem desenhos pixelados próprios e aparecem somente no Bosque do Crepúsculo.
- Morcegos de Fogo, Lagartos Vulcânicos, Golems de Magma, Fragmentos de Magma e o Titã de Obsidiana possuem desenhos pixelados próprios e aparecem somente na Forja Vulcânica.
- Mosquitos do Brejo, Sapos Venenosos, Guardiões de Lodo e a Hidra do Pântano possuem desenhos pixelados próprios e aparecem somente no Pântano Tóxico.
- As decorações das oito fases não bloqueiam torres nem alteram regras.
- O lobby acompanha imediatamente o tema da fase selecionada.
- Com a Fase 1 selecionada, o lobby usa gramado verde, lago, árvores, pedras e flores.
- Com a Fase 2 selecionada, o lobby usa areia quadriculada, painel em tons terrosos, cactos, matos secos e pirâmides.
- Com a Fase 3 selecionada, o lobby usa neve quadriculada, painel azul-gelo, iglus, pinguins, pinheiros nevados e blocos de gelo.
- Com a Fase 4 selecionada, o lobby usa vegetação quadriculada, painel verde-musgo, ruínas, árvores densas, cipós e flores tropicais.
- Com a Fase 5 selecionada, o lobby usa terreno verde-oliva, painel marrom, árvores outonais, cogumelos, folhas e troncos pixelados.
- Com a Fase 6 selecionada, o lobby usa basalto escuro, painel vermelho-obsidiana, vulcões, lava e cristais pixelados.
- Com a Fase 7 selecionada, o lobby usa lodo verde-escuro, painel musgo, árvores retorcidas, poças tóxicas, juncos e cogumelos luminosos.
- O caminho percorrido pelos inimigos aparece somente durante a partida.
- **Começar partida** permanece como o botão verde de maior destaque, acompanhado por **Álbum**, **Capítulos** e **Como jogar** na fileira principal.
- O atalho de **Configurações** fica no topo direito do lobby e concentra os controles de música, efeitos, iluminação e idioma.
- O rodapé do lobby resume créditos iniciais, limite de torres e as 20 waves de cada fase.
- O canto inferior direito do lobby exibe o crédito **Criado por Lequ48** com estilo pixelado e cores adaptadas ao tema selecionado.
- A chamada abaixo do título principal do lobby exibe **Sobreviva até o fim!**.
- Capítulos, Fases, Álbum e Como jogar são exibidos em uma página de conteúdo e podem ser fechados sem iniciar a partida.
- Os cartões coletados do Álbum reutilizam os mesmos desenhos exibidos no mapa. Cada torre obtida mostra os visuais dos níveis 0 a 3; inimigos comuns, especiais e Bosses aparecem somente depois da primeira derrota daquele tipo.
- Durante a partida, o mapa é apresentado dentro de uma moldura com cabeçalho, seletor vertical de torres à direita e barra de ações inferior responsivos.
- O painel lateral direito permite escolher entre as sete torres da campanha, incluindo o **Obliterador** e a **Torre Sísmica**, além das defesas especiais compradas na Loja. As torres da campanha são liberadas permanentemente pelo progresso; itens especiais são comprados na Loja.
- O tipo de torre selecionado recebe destaque visual e aparece no HUD com seu custo.
- O HUD exibe wave, dinheiro, quantidade de torres, custo de uma nova torre e recompensa por tiro.
- Quando uma torre está selecionada, o HUD e a barra inferior mostram seus atributos e as opções de melhorar e vender.
- Enquanto houver um inimigo dentro do alcance, o armamento da torre gira continuamente para mirar na posição desse alvo; a base permanece parada.
- A barra inferior possui um botão de prioridade para a torre selecionada, alternando entre **Primeiro**, **Último** e **Aleatório**.
- Avisos, Boss e Game Over possuem destaque visual próprio, sem alterar duração ou comportamento.
- Ao passar o mouse sobre um inimigo durante a partida, um tooltip pixelado exibe seu nome e sua vida atual/máxima.
- A apresentação visual não altera regras, valores de balanceamento nem condições de vitória ou derrota.

### Mudança: categorias do Álbum

**Objetivo:** transformar a consulta em um Álbum de Figurinhas que cresce conforme o jogador obtém defesas e derrota novos inimigos.
**Alterar:** manter as abas **Torres**, **Inimigos**, **Bosses**, **Minas** e **Skins**, mas ocultar itens ainda não obtidos e registrar a primeira derrota de cada tipo de inimigo.
**Não alterar:** atributos, regras de desbloqueio, recompensas, equipamentos, balanceamento, sprites, progresso das fases, Fragmentos, compras, conquistas, missões, pacote apoiador, preferências ou funcionamento das partidas.
**Aceitação:**
- **Torres** abre por padrão; a Torre padrão aparece desde o início e as demais torres, suportes e estruturas aparecem somente quando forem desbloqueados pela campanha ou comprados na Loja.
- Uma torre obtida mostra suas figurinhas dos níveis 0 a 3; torres não obtidas não revelam nome, desenho ou atributos.
- **Inimigos** mostra somente os tipos comuns e especiais que o jogador já derrotou, sem misturar Bosses.
- **Bosses** mostra somente os chefes já derrotados, em ordem de campanha.
- **Minas** mostra somente Mina Terrestre, Mina Congelante e Bomba Pesada que já tenham sido compradas na Loja.
- **Skins** mostra somente o Visual original e as skins já obtidas; visuais ainda bloqueados não aparecem.
- A primeira eliminação de cada tipo registra sua figurinha na chave local `guardians-of-pixel-album-figurinhas-v1`; eliminações seguintes do mesmo tipo não duplicam a figurinha.
- O histórico de figurinhas de inimigos começa vazio nesta versão para permitir testar a descoberta desde o começo.
- Esse início vazio não apaga nem altera estatísticas permanentes de eliminações, conquistas, progresso semanal, progresso das fases, Fragmentos, compras, skins, pacote apoiador, idioma ou preferências da conta.
- Categorias sem itens obtidos mostram apenas um espaço genérico com `?` e uma orientação de como conquistar a primeira figurinha, sem revelar unidades bloqueadas.
- Cada aba e o cabeçalho da página mostram a quantidade obtida e o total possível da categoria.
- A página usa aparência de caderno de figurinhas, com papel quadriculado, espiral, cartões claros e bordas recortadas, sem substituir os sprites existentes.
- Inimigos da Dimensão Glitch continuam ausentes até o portal ser descoberto e só ganham figurinha depois de derrotados.
- Trocar de categoria atualiza somente o painel do Álbum e reutiliza os mesmos desenhos do mapa.
- As cinco categorias, descrições, quantidades e estados acompanham português, inglês e espanhol.
- Em telas estreitas, as abas podem ser percorridas horizontalmente sem comprimir os cartões.

### Mudança: remake dos inimigos da Fase 1

**Objetivo:** substituir as formas simples do elenco inicial por unidades pixeladas mais reconhecíveis entre si.
**Alterar:** somente os desenhos de Vermelho, Roxo, Ciano rápido, Sabotador e Boss comum.
**Não alterar:** nomes, tipos internos, vida, velocidade, tamanho lógico, hitboxes, comportamentos, ataques, recompensas, ordem ou quantidade nas waves.
**Aceitação:**
- O Vermelho usa capacete, visor dourado, ombreiras, peitoral e botas.
- O Roxo parece um guarda pesado, com armadura larga, capacete reforçado e núcleo violeta.
- O Ciano rápido parece um corredor tecnológico leve, com aletas laterais e rastros de energia.
- O Sabotador parece um agente equipado, com capuz, visor vermelho, mochila, antena e arma lateral.
- O Boss comum parece um comandante blindado, com ombreiras grandes, elmo, olhos luminosos e núcleo dourado.
- O mapa e o Álbum reutilizam os mesmos cinco desenhos.
- Vida, velocidade, tamanho lógico e comportamento de todos os cinco inimigos permanecem iguais aos valores anteriores.
- Os inimigos exclusivos das Fases 2 a 7 não têm seus desenhos alterados nesta mudança.

### Mudança: escala visual do Ciano rápido e do Sabotador

**Objetivo:** aproximar o tamanho aparente dos dois inimigos ao tamanho do Vermelho sem alterar o balanceamento.
**Alterar:** usar escala visual 20 para o Ciano rápido e 22 para o Sabotador; o Vermelho usa 20 como referência.
**Não alterar:** tamanhos lógicos de 18 e 21, hitboxes, vida, velocidade, ataque, alcance ou composição das waves.
**Aceitação:**
- O Ciano rápido aparece com aproximadamente o mesmo tamanho do Vermelho no mapa e no Álbum.
- O Sabotador aparece levemente maior que o Vermelho por causa de seu equipamento.
- Detecção de acertos, colisões e posicionamento continuam usando os tamanhos lógicos originais.

### Mudança: cogumelos autorais no lobby da Fase 5

**Objetivo:** substituir os cogumelos genéricos do lobby por versões maiores baseadas nos dois desenhos pixelados criados para o Bosque do Crepúsculo.
**Alterar:** redesenhar somente os dois cogumelos decorativos do tema temperado com grade ampliada, contornos em degraus, manchas, luz e sombra.
**Não alterar:** cogumelos do mapa, Torre de Esporos, decorações das outras fases, mecânicas, balanceamento ou posição do painel central.
**Aceitação:**
- Com a Fase 5 selecionada, o lobby mostra um cogumelo vermelho com manchas claras e um cogumelo salmão com manchas escuras.
- Os dois desenhos preservam as silhuetas da referência autoral, usam pixels maiores e permanecem nítidos ao redimensionar a tela.
- Os cogumelos usam escala visual de 30% do desenho-base, resultando em aproximadamente 36 a 54 px, próximos ao tamanho dos cogumelos antigos e menores que as árvores outonais.
- Nas Fases 1 a 4, os dois cogumelos continuam ocultos junto das demais decorações temperadas.

### Mudança: decorações centrais nos temas do lobby

**Objetivo:** preencher a área central do cenário sem prejudicar a leitura ou a interação com o menu.
**Alterar:** reutilizar três desenhos pixelados de cada tema na faixa central do lobby, com opacidade de 72% em telas largas e 46% em telas de até 760 px.
**Não alterar:** seleção e desbloqueio das fases, funcionamento dos botões, desenhos existentes nas bordas ou temas das partidas.
**Aceitação:**
- Campo, deserto, Ártico, selva e floresta temperada exibem exatamente três decorações adicionais distribuídas entre 29% e 70% da largura do cenário.
- As novas decorações ficam na camada de cenário, atrás do cartão do menu e sem capturar cliques.
- Em telas de até 760 px, as decorações centrais permanecem presentes com opacidade reduzida para não competir com o conteúdo.
- Os cogumelos autorais da Fase 5 usam escala de 30% e continuam visíveis somente no tema temperado.

### Mudança: árvore autoral no lobby da Fase 1

**Objetivo:** substituir o desenho genérico das árvores do campo pela pixel art criada pelo autor.
**Alterar:** usar o sprite transparente **assets/arvore-campo-lobby.png**, com 423 × 572 px, nas quatro árvores já posicionadas no lobby da Fase 1; o tamanho-base exibido é 74 × 100 px.
**Não alterar:** posições e escalas individuais das árvores, demais decorações, temas das Fases 2 a 5, mapa da partida ou funcionamento do menu.
**Aceitação:**
- A imagem aparece sem o fundo pêssego, sem halo pêssego nas bordas e sem a faixa escura do aplicativo de desenho.
- As três árvores das bordas e a árvore central reutilizam o mesmo sprite com renderização pixelada.
- Ao selecionar as Fases 2 a 5, as árvores do campo continuam ocultas pelas regras existentes de cada tema.
- Nenhum elemento novo captura cliques ou altera a seleção das fases.

### Mudança: cenário vivo do lobby da Fase 1

**Objetivo:** harmonizar o campo com a árvore autoral e tornar o cenário mais vivo sem reduzir a legibilidade do menu.
**Alterar:** usar gramado quadriculado em **#3F7F3D** e **#326B35**, detalhes baseados na paleta da árvore e acrescentar dois arbustos e três tufos de grama pixelados.
**Não alterar:** painel e botões do lobby, posições das árvores, temas das Fases 2 a 5, mapa da partida, progressão ou balanceamento.
**Aceitação:**
- O lago usa água ciano clara, brilho suave e borda verde **#3CA370**.
- Pedras têm contorno mais fino e tons quentes; flores usam **#CFFF70**, **#BA6156** e **#3CA370**.
- As sombras das árvores e decorações ficam mais leves que as antigas.
- Durante o dia, árvores, lago, pedras, flores, arbustos e tufos de grama usam 68% do brilho, 82% da saturação e um leve reforço de contraste, deixando o escurecimento claramente perceptível sem afetar a interface.
- Os dois arbustos e três tufos aparecem somente quando a Fase 1 está selecionada e permanecem atrás da interface.
- Em telas de até 760 px, arbustos e tufos usam 62% de opacidade para não competir com os controles.
- O filtro mais escuro do modo noturno continua prevalecendo sobre o ajuste diurno, sem trocar as cores-base do tema.
- Os cogumelos permanecem atrás da interface e não recebem cliques nem alteram a partida.

### Mudança: seletor vertical de torres

**Objetivo:** impedir que novas armas ocupem o espaço dos controles de melhorar e vender.
**Alterar:** mover somente os botões de construção para um painel vertical e rolável encostado à direita do mapa, sem espaço entre o mapa e o painel.
**Não alterar:** posição inferior dos botões **Melhorar torre** e **Vender torre**, atalhos E e X, custos, desbloqueios ou regras de construção.
**Aceitação:**
- Cada tipo de torre ocupa uma linha própria no painel direito.
- A borda direita do mapa toca diretamente o painel de torres, formando uma única área de jogo.
- Quando a proporção da tela deixa uma faixa livre à esquerda do mapa, ela exibe um posto de comando pixelado atrás do canvas sem reduzir sua área.
- Se novos tipos ultrapassarem a altura disponível, apenas a lista de torres recebe rolagem vertical.
- Os botões de melhorar e vender permanecem na barra inferior.
- O painel lateral aparece somente durante a partida e mantém um formato compacto em telas menores.

### Mudança: mira dinâmica das torres

**Objetivo:** fazer os disparos parecerem conectados ao alvo acompanhado pela torre.
**Alterar:** girar somente o armamento de cada torre para apontar para o alvo escolhido dentro do alcance.
**Não alterar:** alcance, cadência, dano, velocidade dos projéteis ou comportamento das melhorias.
**Aceitação:**
- Com um inimigo no alcance, o canhão, o cristal ou a Besta aponta para a posição atual dele mesmo durante o intervalo entre tiros.
- A base circular da torre não gira.
- Sem inimigos no alcance, a torre mantém a última direção observada.
- As miniaturas do Álbum continuam usando a direção frontal padrão.

### Mudança: prioridade de alvo por torre

**Objetivo:** permitir que o jogador escolha como cada torre distribui seus disparos.
**Alterar:** adicionar um botão único na barra inferior que alterna a prioridade da torre selecionada na ordem **Primeiro**, **Último** e **Aleatório**.
**Não alterar:** alcance, dano, cadência, velocidade do projétil, escolha de alvo dos inimigos ou controles de melhorar e vender.
**Aceitação:**
- Cada torre nova começa no modo **Primeiro**.
- **Primeiro** escolhe, entre os inimigos no alcance, o que percorreu a maior distância em direção à base.
- **Último** escolhe, entre os inimigos no alcance, o que percorreu a menor distância desde a entrada.
- **Aleatório** escolhe um inimigo no alcance a cada novo disparo e mantém a mira nele durante a recarga.
- Cada torre guarda sua própria prioridade; alterar uma torre não modifica as demais.
- Sem uma torre selecionada, o botão permanece desabilitado.

### Mudança: informações do inimigo ao passar o mouse

**Objetivo:** permitir que o jogador identifique cada inimigo sem precisar abrir o Álbum.
**Alterar:** detectar o inimigo sob o ponteiro no canvas e desenhar um tooltip pixelado próximo ao cursor.
**Não alterar:** movimento, vida, dano, seleção e construção de torres ou comportamento das waves.
**Aceitação:**
- O tooltip mostra o nome configurado do inimigo e sua vida atual/máxima.
- A posição do ponteiro é convertida corretamente mesmo quando o canvas está redimensionado.
- O tooltip acompanha inimigos em movimento e permanece dentro dos limites do mapa.
- Ao retirar o ponteiro do mapa ou do inimigo, o tooltip desaparece.

## Regras atuais

| Área | Regra |
| --- | --- |
| Dinheiro inicial | 150 |
| Custo da Torre padrão | 150 |
| Custo do Canhão pesado | 250 |
| Desbloqueio do Canhão pesado | Concluir a Fase 1; depois fica disponível em todas as fases |
| Custo da Torre Glacial | 350 |
| Desbloqueio da Torre Glacial | Concluir a Fase 2; depois fica disponível em todas as fases atuais e futuras |
| Custo da Torre Besta | 400 |
| Desbloqueio da Torre Besta | Concluir a Fase 3; depois fica disponível em todas as fases atuais e futuras |
| Custo da Torre de Esporos | 475 |
| Desbloqueio da Torre de Esporos | Concluir a Fase 4; depois fica disponível em todas as fases |
| Custo do Obliterador | 550 |
| Desbloqueio do Obliterador | Concluir a Fase 5; depois fica disponível em todas as fases |
| Fragmentos de Pixel iniciais | 0 |
| Recompensa ao encerrar uma partida normal | Wave 1 concede 0; da wave 2 em diante, a recompensa é igual à wave alcançada |
| Recompensa no modo Waves infinitas | 1 Fragmento de Pixel a cada 2 waves alcançadas, arredondado para baixo |
| Preço da Isca Blindada na Loja | 30 Fragmentos de Pixel |
| Custo da Isca Blindada na partida | 200 |
| Resistência da Isca Blindada | 10 impactos de inimigos atiradores |
| Limite de Iscas Blindadas | 2 por partida, dentro do limite total de torres da fase |
| Preço do Amplificador Pixel na Loja | 45 Fragmentos de Pixel |
| Custo do Amplificador Pixel na partida | 300 |
| Alcance do Amplificador Pixel | 135 px |
| Bônus do Amplificador Pixel | Reduz em 15% o intervalo de ataque das torres de combate próximas |
| Limite de Amplificadores Pixel | 1 por partida, dentro do limite total de torres da fase |
| Gerador de Créditos | 70 Fragmentos; 300 créditos; produz 100, 150, 225 ou 325 créditos por wave nos níveis 0 a 3 |
| Limite de Geradores de Créditos | 1 por partida, dentro do limite total de torres da fase |
| Preço da Mina Terrestre na Loja | 25 Fragmentos de Pixel |
| Custo da Mina Terrestre na partida | 100 |
| Dano da Mina Terrestre | 100 em uma área de 75 px |
| Contato da Mina Terrestre | Explode somente quando um inimigo encosta no raio físico de 18 px |
| Limite de Minas Terrestres | 5 armadas ao mesmo tempo, fora do limite total de torres |
| Preço da Bomba Pesada na Loja | 40 Fragmentos de Pixel |
| Custo da Bomba Pesada na partida | 200 |
| Dano da Bomba Pesada | 200 em uma área de 100 px |
| Detonação da Bomba Pesada | Manual; clique acende um pavio irrevogável de 1,5 segundo |
| Limite de Bombas Pesadas | 3 posicionadas ao mesmo tempo, fora do limite total de torres |
| Torre de Raios | 60 Fragmentos; 425 créditos; 30 de dano; salta por até 3 alvos a 110 px |
| Lança-Chamas | 100 Fragmentos; 650 créditos; 10 de dano; ataque a cada 333 ms; queimadura de 5 por segundo durante 10 s |
| Mina Congelante | 35 Fragmentos; 125 créditos; 55 de dano em 85 px; 50% de lentidão por 2.500 ms |
| Reserva de Créditos | 30 Fragmentos; aumenta os créditos iniciais de 150 para 200 |
| Licença de Construção | 45 Fragmentos; acrescenta 1 vaga ao limite de todas as fases |
| Recompensa Otimizada | 55 Fragmentos; aumenta a recompensa por tiro de 20 para 22 |
| Recompensa por tiro | 20; 22 após comprar Recompensa Otimizada |
| Limite de torres na Fase 1 | 10 |
| Limite de torres na Fase 2 | 12 |
| Limite de torres na Fase 3 | 12 |
| Limite de torres na Fase 4 | 14 |
| Limite de torres na Fase 5 | 15 |
| Limite de torres na Fase 6 | 15 |
| Limite de torres na Fase 7 | 15 |
| Limite de torres na Fase 8 | 15 |
| Dano da Torre padrão nível 0 | 10 |
| Alcance da Torre padrão nível 0 | 150 px |
| Ataque da Torre padrão nível 0 | 500 ms |
| Dano do Canhão pesado nível 0 | 20 |
| Alcance do Canhão pesado nível 0 | 110 px |
| Ataque do Canhão pesado nível 0 | 700 ms |
| Dano da Torre Glacial nível 0 | 18 |
| Alcance da Torre Glacial nível 0 | 170 px |
| Ataque da Torre Glacial nível 0 | 800 ms |
| Velocidade do estilhaço da Torre Glacial | 8 px por frame |
| Lentidão da Torre Glacial nível 0 | 25% por 1.400 ms |
| Congelamento da Torre Glacial nível 0 | 500 ms após 4 acertos; Bosses não congelam |
| Dano da Torre Besta nível 0 | 55 |
| Alcance da Torre Besta nível 0 | 210 px |
| Ataque da Torre Besta nível 0 | 1.100 ms |
| Velocidade do virote da Torre Besta | 10 px por frame |
| Dano da Torre de Esporos nível 0 | 42 em uma área de 60 px |
| Alcance da Torre de Esporos nível 0 | 185 px |
| Ataque da Torre de Esporos nível 0 | 1.050 ms |
| Velocidade do orbe da Torre de Esporos | 7,5 px por frame |
| Ataque do Obliterador nível 0 | 3 lasers de 38 de dano a cada 1.600 ms |
| Alcance do Obliterador nível 0 | 230 px |
| Velocidade dos lasers do Obliterador | 13 px por frame |
| Torre Sísmica nível 0 | 600 créditos; alcance de 170 px; impacto após 3 entradas; empurrão de 120 px |
| Limite de Torres Sísmicas | 2 por partida, dentro do limite total de torres da fase |
| Espaçamento mínimo entre torres | 70 px |
| Derrota pela torre-base | O primeiro inimigo que tocar a estrutura encerra imediatamente a partida |
| Vida do inimigo vermelho | 100 |
| Vida do inimigo roxo | 300 |
| Vida do inimigo rápido | 200 |
| Velocidade do inimigo rápido | 2,2 px por frame |
| Vida do Sabotador | 75 (75% da vida do vermelho) |
| Velocidade do Sabotador | 1,1 px por frame (igual ao roxo) |
| Alcance de ataque do Sabotador | 180 px |
| Intervalo de ataque do Sabotador | 1,2 s |
| Tiros para destruir uma torre | 6 |
| Vida do Escorpião do deserto | 160 |
| Velocidade do Escorpião do deserto | 1,9 px por frame |
| Vida da Múmia | 500 |
| Velocidade da Múmia | 0,85 px por frame |
| Vida do Lobo de Gelo | 240 |
| Velocidade do Lobo de Gelo | 1,8 px por frame |
| Vida do Yeti | 650 |
| Velocidade do Yeti | 0,75 px por frame |
| Vida do Macaco Saqueador | 220 |
| Velocidade do Macaco Saqueador | 2 px por frame |
| Ataque do Macaco Saqueador | Alcance de 165 px; 1 disparo a cada 1,8 s |
| Lentidão causada pelo Macaco | Aumenta o intervalo de ataque da torre em 25% por 2.500 ms |
| Vida da Onça da Selva | 360 |
| Velocidade da Onça da Selva | 1,7 px por frame |
| Disparada da Onça da Selva | +45% de velocidade ao ficar com 50% da vida ou menos |
| Vida do Gorila da Selva | 850 |
| Velocidade do Gorila da Selva | 0,6 px por frame |
| Vida da Raposa Ladina | 260 |
| Velocidade da Raposa Ladina | 2,55 px por frame |
| Vida do Javali Furioso | 950 |
| Velocidade do Javali Furioso | 0,72 px por frame |
| Arrancada do Javali Furioso | A cada 4 s, +80% de velocidade durante 1.100 ms |
| Vida da Coruja Sombria | 420 |
| Velocidade da Coruja Sombria | 1,4 px por frame |
| Ataque da Coruja Sombria | Alcance de 190 px; 1 disparo a cada 2,1 s |
| Enfraquecimento da Coruja | Reduz o alcance da torre em 25% por 3.000 ms |
| Vida base do Boss | 1.000 |
| Aumento de vida do Boss | +500 a cada aparição |
| Velocidade do Boss | 1,1 px por frame (igual ao roxo) |
| Vida base do Faraó de Areia | 2.000 |
| Aumento de vida do Faraó de Areia | +500 a cada aparição |
| Velocidade do Faraó de Areia | 1,3 px por frame (entre o roxo e o vermelho) |
| Vida base do Titã Glacial | 3.000 |
| Aumento de vida do Titã Glacial | +500 a cada aparição |
| Velocidade do Titã Glacial | 0,65 px por frame |
| Vida base do Colosso da Selva | 4.000 |
| Aumento de vida do Colosso da Selva | +500 a cada aparição |
| Velocidade do Colosso da Selva | 0,55 px por frame |
| Vida base do Urso Ancestral | 3.500 |
| Aumento de vida do Urso Ancestral | +500 a cada aparição |
| Velocidade do Urso Ancestral | 0,45 px por frame |
| Primeiro Rugido Ancestral | 3.500 ms depois do surgimento |
| Intervalo entre Rugidos Ancestrais | 6.000 ms |
| Raio do Rugido Ancestral | 230 px |
| Atordoamento do Rugido Ancestral | 1.400 ms |
| Vida do Morcego de Fogo | 280 |
| Velocidade do Morcego de Fogo | 2,8 px por frame |
| Vida do Lagarto Vulcânico | 480 |
| Velocidade do Lagarto Vulcânico | 1,65 px por frame |
| Vida do Golem de Magma | 1.100 |
| Velocidade do Golem de Magma | 0,68 px por frame |
| Vida do Fragmento de Magma | 180 |
| Velocidade do Fragmento de Magma | 2,5 px por frame |
| Vida do Titã de Obsidiana | 3.200 em todas as aparições |
| Velocidade do Titã de Obsidiana | 1,05 px por frame; 1,7325 após a erupção |
| Carapaça do Titã de Obsidiana | Reduz dano em 15% e impede a vida de atravessar 50% antes da transformação |
| Vida do Mosquito do Brejo | 340 |
| Velocidade do Mosquito do Brejo | 3 px por frame |
| Vida do Sapo Venenoso | 650 |
| Velocidade do Sapo Venenoso | 1,35 px por frame |
| Vida do Guardião de Lodo | 1.400 |
| Velocidade do Guardião de Lodo | 0,62 px por frame |
| Vida base da Hidra do Pântano | 3.800 |
| Aumento de vida da Hidra do Pântano | +500 a cada aparição |
| Velocidade da Hidra do Pântano | 0,7 px por frame |
| Regeneração da Hidra do Pântano | Ativa permanentemente ao alcançar 50% da vida e restaura 40 de vida por segundo, sem ultrapassar a vida máxima |
| Primeira wave com roxos | 5 |
| Última wave da campanha | 20 |
| Melhorias por torre de combate | 3 |

## Waves

- Na Fase 1, as waves 1 a 4 possuem apenas inimigos vermelhos; a wave contém `wave + 1` inimigos.
- A Fase 2 mantém toda a composição de inimigos da Fase 1 e acrescenta seus inimigos exclusivos.
- A Fase 3 usa a composição comum da Fase 1, incluindo Sabotadores, e acrescenta Lobos de Gelo, Yetis e o Titã Glacial sem incluir Escorpiões, Múmias, Faraó de Areia ou Boss vinho.
- A Fase 4 usa a composição comum da Fase 1, incluindo Sabotadores, e acrescenta Macacos Saqueadores, Onças da Selva, Gorilas da Selva e o Colosso da Selva sem incluir inimigos exclusivos das fases anteriores.
- A Fase 5 usa a composição comum da Fase 1, incluindo Sabotadores, e acrescenta Raposas Ladinas, Javalis Furiosos, Corujas Sombrias e o Urso Ancestral sem incluir inimigos exclusivos das fases anteriores.
- A Fase 6 usa a composição comum da Fase 1, incluindo Sabotadores, e acrescenta Morcegos de Fogo, Lagartos Vulcânicos, Golems de Magma e o Titã de Obsidiana sem incluir inimigos exclusivos das fases anteriores.
- A Fase 7 usa a composição comum da Fase 1, incluindo Sabotadores, e acrescenta Mosquitos do Brejo, Sapos Venenosos, Guardiões de Lodo e a Hidra do Pântano sem incluir inimigos exclusivos das fases anteriores.
- A Fase 8 usa a composição comum da Fase 1, incluindo Sabotadores, e acrescenta Raptors Ancestrais, Besouros de Âmbar, Tricerátopos e o Tirano Primordial sem incluir inimigos exclusivos das fases anteriores.
- Wave 5: 2 inimigos roxos.
- A partir da wave 6, os inimigos vermelhos crescem de 0 até 3 enquanto os roxos permanecem iguais.
- Depois de uma wave com 3 vermelhos, a próxima zera os vermelhos e adiciona 1 inimigo roxo.
- Exemplos: wave 8 = 2 roxos + 3 vermelhos; wave 9 = 3 roxos; wave 12 = 3 roxos + 3 vermelhos; wave 13 = 4 roxos.
- Todas as waves a partir da 5 recebem inimigos rápidos cianos: 1 rápido com 2 roxos, 2 rápidos com 3 roxos, 3 rápidos com 4 roxos, e assim por diante. A presença de vermelhos não altera essa quantidade.
- O Sabotador aparece nas oito fases a partir da wave 6: 1 unidade nas waves 6 a 10, 2 nas waves 11 a 15 e 3 nas waves 16 a 20.
- Na Fase 1, toda wave múltipla de 5 até a wave 20 inclui 1 Boss vinho. Sua vida começa em 1.000 na wave 5 e aumenta 500 a cada nova aparição.

| Wave | Vida do Boss |
| --- | --- |
| 5 | 1.000 |
| 10 | 1.500 |
| 15 | 2.000 |
| 20 | 2.500 |

- Na Fase 2, o Faraó de Areia substitui o Boss vinho nas waves 5, 10, 15 e 20. Sua vida começa em 2.000 e aumenta 500 a cada aparição.

| Wave | Vida do Faraó de Areia |
| --- | --- |
| 5 | 2.000 |
| 10 | 2.500 |
| 15 | 3.000 |
| 20 | 3.500 |

- Na Fase 3, o Titã Glacial substitui o Boss vinho nas waves 5, 10, 15 e 20. Sua vida começa em 3.000 e aumenta 500 a cada aparição.

| Wave | Vida do Titã Glacial |
| --- | --- |
| 5 | 3.000 |
| 10 | 3.500 |
| 15 | 4.000 |
| 20 | 4.500 |

- Na Fase 4, o Colosso da Selva substitui o Boss vinho nas waves 5, 10, 15 e 20. Sua vida começa em 4.000 e aumenta 500 a cada aparição.

| Wave | Vida do Colosso da Selva |
| --- | --- |
| 5 | 4.000 |
| 10 | 4.500 |
| 15 | 5.000 |
| 20 | 5.500 |

- Na Fase 5, o Urso Ancestral substitui o Boss vinho nas waves 5, 10, 15 e 20. Sua vida começa em 3.500 e aumenta 500 a cada aparição.
- Na Fase 6, o Titã de Obsidiana substitui os demais Bosses nas waves 5, 10, 15 e 20. Sua vida permanece em 3.200; a quantidade de Fragmentos de Magma liberados na transformação cresce de 2 até 5.
- Na Fase 7, a Hidra do Pântano substitui os demais Bosses nas waves 5, 10, 15 e 20. Sua vida começa em 3.800, aumenta 500 por aparição e sua regeneração permanente é ativada ao alcançar 50% da vida.
- Na Fase 8, o Tirano Primordial substitui os demais Bosses nas waves 5, 10, 15 e 20. Sua vida começa em 4.800, aumenta 600 por aparição e, ao cruzar 60% e 30% da vida, usa **Chamado da Matilha** para invocar dois Raptors Ancestrais na posição atual.

| Wave | Vida do Urso Ancestral |
| --- | --- |
| 5 | 3.500 |
| 10 | 4.000 |
| 15 | 4.500 |
| 20 | 5.000 |

- Ao iniciar uma wave com chefe, o aviso mostra **ALGO ESTÁ VINDO...** e destaca **BOSS**, **FARAÓ**, **TITÃ**, **COLOSSO**, **URSO**, **OBSIDIANO** ou **HIDRA** conforme a fase, por 2,5 segundos.
- Há 700 ms entre o surgimento de inimigos e 2 s entre waves concluídas.

### Modo Waves infinitas

- O botão **Waves infinitas** usa a fase selecionada no lobby e respeita seu desbloqueio, tema, trajetória, inimigos exclusivos e limite de torres.
- As waves continuam depois da wave 20 usando as mesmas fórmulas de crescimento de inimigos e de vida dos Bosses.
- Bosses continuam surgindo a cada 5 waves e recebem mais 500 de vida a cada aparição.
- O modo não mostra vitória, não conclui fases nem desbloqueia a fase seguinte; quando a base é invadida, concede 1 Fragmento de Pixel a cada 2 waves alcançadas.
- Waves ímpares não completam o próximo par: terminar na wave 21 concede 10 Fragmentos, enquanto terminar na wave 22 concede 11.
- A partida termina somente quando um inimigo invade a torre-base.
- **Reiniciar fase** e **Recomeçar fase** preservam o modo infinito; voltar ao lobby encerra o modo.
- Os bônus pós-Boss continuam restritos às waves configuradas da campanha e o fliperama mantém suas waves atuais.

### Bônus pós-Boss

- Depois que todos os inimigos das waves 5, 10 e 15 forem derrotados, a partida pausa e apresenta 3 opções aleatórias entre 4 bônus.
- O jogador deve escolher 1 bônus para continuar; a opção escolhida permanece ativa até o fim da partida.
- Bônus de atributos afetam todas as torres construídas e também as torres que forem construídas ou melhoradas depois da escolha.
- Bônus iguais podem aparecer e acumular em escolhas futuras da mesma partida.
- **Cadência rápida:** reduz em 10% o intervalo entre ataques de todas as torres.
- **Suprimentos:** entrega 300 créditos imediatamente.
- **Munição reforçada:** aumenta em 10% o dano de todas as torres.
- **Mira ampliada:** aumenta em 8% o alcance de todas as torres.
- O posto do lado esquerdo do mapa lista todos os bônus escolhidos na partida, agrupa escolhas repetidas e mostra o efeito acumulado de cada tipo.
- **Suprimentos** permanece registrado no posto como histórico da recompensa recebida.
- A wave 20 encerra a partida com vitória depois que todos os inimigos forem derrotados e não oferece bônus.

#### Mudança: escolha de recompensa após Boss

**Objetivo:** criar decisões diferentes durante a partida e reduzir a repetição entre waves.
**Alterar:** interromper o intervalo normal após as waves de Boss 5, 10 e 15 para oferecer 3 bônus aleatórios.
**Não alterar:** composição das waves, vida e velocidade dos inimigos, aparição dos Bosses, custos das torres ou condição de vitória.
**Aceitação:**
- Enquanto a escolha estiver aberta, inimigos, torres, tiros e cronômetros permanecem pausados.
- Somente uma das três opções pode ser escolhida em cada aparição.
- Depois da escolha, o painel fecha, o bônus é aplicado e a contagem para a próxima wave continua.
- Reiniciar ou abandonar a fase remove todos os bônus daquela partida.

### Evento do Fliperama

- Um fliperama pixelado aparece em uma posição livre do mapa no início das waves 7 e 14 de todas as fases.
- O fliperama usa o sprite transparente **assets/fliperama-pixel.png**, renderizado sem suavização em 53 × 100 px; se o arquivo não puder ser carregado, o desenho pixelado anterior é usado como fallback.
- A posição não pode estar no caminho, sobre uma torre ou Bomba Pesada, próxima da torre-base ou fora da margem segura do mapa.
- O fliperama permanece disponível por 10 segundos. Se não for clicado, desaparece sem penalidade.
- Ao clicar no fliperama, a batalha e seus cronômetros pausam e um dos minigames **Tiro ao alvo** ou **Labirinto Pixel** é sorteado.
- Ambos os minigames duram 15 segundos.
- O **Tiro ao alvo** exige 10 acertos no mesmo alvo móvel.
- O alvo se desloca continuamente a 185 px por segundo, rebate nas quatro bordas e nunca troca de posição por teletransporte.
- Depois de cada acerto, o alvo muda sua direção sem alterar a posição e aguarda 140 ms antes de aceitar o próximo clique.
- Falhar ou deixar o tempo acabar apenas fecha o minigame e continua a partida.
- Concluir o **Tiro ao alvo** reduz em 20% o intervalo de ataque de todas as torres por 30 segundos.
- No **Labirinto Pixel**, um dos três mapas — **Zigue-zague**, **Corredores** ou **Espelho** — é sorteado a cada abertura.
- Nos três mapas, o robô é movido continuamente por **WASD** ou pelas setas; encostar em qualquer parede devolve o robô à posição inicial daquele mapa.
- Alcançar a saída do **Labirinto Pixel** aumenta em 15% o dano de todas as torres por 30 segundos.
- Os boosts afetam torres atuais, futuras e melhoradas, combinam de forma multiplicativa com os bônus pós-Boss correspondentes e não perdem duração enquanto a partida estiver pausada.
- Os boosts do fliperama continuam ativos sem exigir um painel permanente ou barras de duração sobre o mapa.
- Concluir novamente o mesmo minigame enquanto seu boost ainda está ativo acrescenta mais 30 segundos à duração correspondente.

#### Mudança: novo sprite do fliperama

**Objetivo:** substituir a máquina desenhada por blocos por uma pixel art dedicada sem introduzir fundo xadrez ou falhas de carregamento.
**Alterar:** carregar o sprite transparente de 530 × 1000 px e desenhá-lo no mapa em 53 × 100 px, sem suavização.
**Não alterar:** waves 7 e 14, raio de clique de 46 px, posição livre, duração de 10 segundos, sorteio dos minigames, recompensas ou pausa da batalha.
**Aceitação:**
- O PNG carregado mostra somente a máquina, sem marca d'água, fundo verde ou padrão xadrez.
- O sprite mantém a proporção original, fica centralizado na posição do evento e desativa a suavização do canvas.
- Enquanto a imagem ainda carrega ou se ocorrer erro, o arcade anterior é desenhado e o evento continua clicável.
- A contagem **CLIQUE · Ns** permanece acima da máquina com o mesmo tempo disponível.

#### Mudança: minigame de tiro ao alvo

**Objetivo:** interromper a repetição das waves com um evento opcional de habilidade.
**Alterar:** criar um fliperama clicável nas waves 7 e 14 e recompensar a conclusão do minigame com cadência temporária.
**Não alterar:** composição das waves, custos, desbloqueios, limites de torres ou condições de vitória e derrota.
**Aceitação:**
- O fliperama nunca bloqueia o caminho e não permite construir uma torre sobre sua área.
- Enquanto o minigame estiver aberto, inimigos, torres, projéteis, waves e efeitos temporários permanecem pausados.
- Cada clique correto soma um ponto; cliques fora do alvo não causam penalidade.
- Durante todo o minigame, a posição do alvo é atualizada continuamente e permanece dentro da área visível.
- Ao alcançar 10 pontos antes de 15 segundos, o painel fecha, a batalha continua e o boost é aplicado.
- Ao reiniciar ou abandonar a fase, o minigame, o fliperama e o boost são removidos.

#### Mudança: Labirinto Pixel

**Objetivo:** adicionar uma segunda prova de habilidade ao fliperama para variar o ritmo das partidas.
**Alterar:** sortear entre o minigame de alvo existente e um labirinto controlado por teclado, que também sorteia um entre três mapas e mantém sua recompensa própria.
**Não alterar:** waves de aparição do fliperama, duração de 15 segundos, pausa da batalha, composição das waves ou o boost de cadência do Tiro ao alvo.
**Aceitação:**
- Cada clique válido no fliperama sorteia com a mesma lista de opções o **Tiro ao alvo** ou o **Labirinto Pixel**.
- Ao sortear o Labirinto Pixel, o jogo escolhe um mapa entre **Zigue-zague**, **Corredores** e **Espelho** e mostra seu nome no painel.
- Cada modelo possui início, saída e paredes próprios; todos oferecem uma rota possível até a saída dentro da mesma área de 720 × 420 px.
- O robô do Labirinto aceita **WASD** e setas, move-se continuamente enquanto a tecla estiver pressionada e permanece dentro do canvas.
- Encostar em uma das paredes reinicia somente a posição do robô; o cronômetro continua.
- Chegar à saída antes do fim dos 15 segundos fecha o painel, retoma a batalha e aplica +15% de dano durante 30 segundos.
- Falhar retoma a batalha sem bônus e sem penalidade adicional.
- A duração do boost de dano congela durante pausas; o efeito é removido ao reiniciar ou abandonar a fase.

### Avisos de boosts

- O quadro lateral de boosts foi removido para liberar a área do mapa.
- Nenhum quadro de bônus permanentes ou temporários fica sobre o canvas.
- O painel de escolha pós-Boss continua oferecendo as três opções normalmente.
- Escolher um bônus aplica seu efeito, fecha o painel de escolha e mostra um aviso temporário com o nome e a descrição: **Bônus escolhido: {nome}. {descricao}**.
- Não há lista permanente de efeitos, contadores de escolhas ou barras de duração dos boosts.
- O botão **Pulso Temporal** permanece na barra inferior de ações.
- Valores, duração, acumulação, pausa dos temporizadores e momento de oferta dos bônus permanecem inalterados.
- Reiniciar ou abandonar a fase continua removendo os bônus daquela partida.

#### Mudança: remoção do quadro lateral de efeitos

**Objetivo:** manter o mapa livre do quadro de boosts sem remover suas recompensas.
**Alterar:** substituir a confirmação no quadro por um aviso temporário após a escolha pós-Boss.
**Não alterar:** mecânicas dos bônus ou do fliperama.
**Aceitação:**
- Não existe quadro lateral de bônus no HTML, nos estilos ou na atualização da interface.
- Escolher um bônus pós-Boss aplica o efeito e confirma seu nome e descrição em um aviso temporário.
- O Pulso Temporal continua acessível na barra inferior de ações.

### Inimigos exclusivos da Fase 2

- Escorpiões do deserto começam na wave 3 com 1 unidade e recebem mais 1 unidade a cada 4 waves.
- Quantidade de Escorpiões: waves 3 a 6 = 1; 7 a 10 = 2; 11 a 14 = 3; 15 a 18 = 4; 19 e 20 = 5.
- Múmias começam na wave 7 com 1 unidade e recebem mais 1 unidade a cada 5 waves.
- Quantidade de Múmias: waves 7 a 11 = 1; 12 a 16 = 2; 17 a 20 = 3.
- A wave 20 da Fase 2 contém 5 Escorpiões e 3 Múmias adicionais.
- Escorpiões e Múmias são somados aos inimigos vermelhos, roxos e rápidos existentes.
- O Faraó de Areia substitui o Boss comum nas waves em que aparece; os dois Bosses nunca aparecem juntos.
- Escorpiões, Múmias e o Faraó de Areia nunca são criados nas Fases 1, 3, 4 ou 5.

### Inimigos exclusivos da Fase 3

- Lobos de Gelo possuem 240 de vida e velocidade de 1,8 px por frame.
- Lobos de Gelo começam na wave 3 com 1 unidade e recebem mais 1 unidade a cada 4 waves.
- Quantidade de Lobos de Gelo: waves 3 a 6 = 1; 7 a 10 = 2; 11 a 14 = 3; 15 a 18 = 4; 19 e 20 = 5.
- Yetis possuem 650 de vida e velocidade de 0,75 px por frame.
- Yetis começam na wave 7 com 1 unidade e recebem mais 1 unidade a cada 5 waves.
- Quantidade de Yetis: waves 7 a 11 = 1; 12 a 16 = 2; 17 a 20 = 3.
- A wave 20 da Fase 3 contém 5 Lobos de Gelo e 3 Yetis adicionais.
- Lobos de Gelo e Yetis são somados aos inimigos comuns, Sabotadores e ao Titã Glacial.
- Lobos de Gelo e Yetis nunca são criados nas Fases 1, 2, 4 ou 5.
- O Titã Glacial possui 3.000 de vida inicial, velocidade de 0,65 px por frame e recebe mais 500 de vida nas waves 10, 15 e 20.
- O Titã Glacial substitui o Boss vinho na Fase 3; os dois nunca aparecem juntos.

### Inimigos exclusivos da Fase 4

- Macacos Saqueadores possuem 220 de vida e velocidade de 2 px por frame.
- Macacos Saqueadores começam na wave 3 com 1 unidade e recebem mais 1 unidade a cada 4 waves.
- Quantidade de Macacos Saqueadores: waves 3 a 6 = 1; 7 a 10 = 2; 11 a 14 = 3; 15 a 18 = 4; 19 e 20 = 5.
- Enquanto avançam, os Macacos procuram a torre mais próxima dentro de 165 px e arremessam um projétil a cada 1,8 segundo; se uma Isca Blindada estiver nesse alcance, ela recebe prioridade.
- O impacto do Macaco em torres de combate não causa dano: aumenta o intervalo de ataque em 25% durante 2.500 ms e novos impactos renovam a duração. Contra a Isca Blindada, o impacto consome 1 ponto de resistência.
- Onças da Selva possuem 360 de vida e velocidade inicial de 1,7 px por frame.
- Ao ficarem com 50% da vida ou menos, as Onças entram em disparada e passam a se mover 45% mais rápido, atingindo 2,465 px por frame antes de efeitos de lentidão ou congelamento.
- Onças começam na wave 5 com 1 unidade e recebem mais 1 unidade a cada 4 waves.
- Quantidade de Onças: waves 5 a 8 = 1; 9 a 12 = 2; 13 a 16 = 3; 17 a 20 = 4.
- Gorilas da Selva possuem 850 de vida e velocidade de 0,6 px por frame.
- Gorilas começam na wave 7 com 1 unidade e recebem mais 1 unidade a cada 5 waves.
- Quantidade de Gorilas: waves 7 a 11 = 1; 12 a 16 = 2; 17 a 20 = 3.
- A wave 20 da Fase 4 contém 5 Macacos Saqueadores, 4 Onças da Selva e 3 Gorilas adicionais.
- Macacos, Onças e Gorilas são somados aos inimigos comuns, Sabotadores e ao Colosso da Selva.
- Macacos, Onças, Gorilas e o Colosso nunca são criados nas Fases 1, 2, 3 ou 5.
- O Colosso da Selva possui 4.000 de vida inicial, velocidade de 0,55 px por frame e recebe mais 500 de vida nas waves 10, 15 e 20.
- O Colosso da Selva substitui o Boss vinho na Fase 4; os dois nunca aparecem juntos.

### Inimigos exclusivos da Fase 5

- Raposas Ladinas possuem 260 de vida e velocidade de 2,55 px por frame.
- Raposas começam na wave 3 com 1 unidade e recebem mais 1 unidade a cada 4 waves.
- Quantidade de Raposas: waves 3 a 6 = 1; 7 a 10 = 2; 11 a 14 = 3; 15 a 18 = 4; 19 e 20 = 5.
- Javalis Furiosos possuem 950 de vida e velocidade normal de 0,72 px por frame.
- Javalis começam na wave 7 com 1 unidade e recebem mais 1 unidade a cada 5 waves.
- Quantidade de Javalis: waves 7 a 11 = 1; 12 a 16 = 2; 17 a 20 = 3.
- Cada Javali realiza uma arrancada a cada 4.000 ms; a arrancada dura 1.100 ms e multiplica sua velocidade por 1,8, chegando a 1,296 px por frame antes de efeitos glaciais.
- Corujas Sombrias possuem 420 de vida e velocidade de 1,4 px por frame.
- Corujas começam na wave 9 com 1 unidade e recebem mais 1 unidade a cada 5 waves.
- Quantidade de Corujas: waves 9 a 13 = 1; 14 a 18 = 2; 19 e 20 = 3.
- Enquanto avançam, as Corujas procuram a torre mais próxima dentro de 190 px e disparam a cada 2,1 segundos; se uma Isca Blindada estiver nesse alcance, ela recebe prioridade.
- O impacto da Coruja em torres de combate reduz o alcance em 25% durante 3.000 ms e novos impactos renovam a duração. Contra a Isca Blindada, o impacto consome 1 ponto de resistência.
- A wave 20 da Fase 5 contém 5 Raposas Ladinas, 3 Javalis Furiosos e 3 Corujas Sombrias adicionais.
- Raposas, Javalis e Corujas são somados aos inimigos comuns, Sabotadores e ao Urso Ancestral.
- Raposas, Javalis, Corujas e o Urso nunca são criados nas Fases 1, 2, 3 ou 4.
- O Urso Ancestral possui 3.500 de vida inicial, velocidade de 0,45 px por frame e recebe mais 500 de vida nas waves 10, 15 e 20.
- O primeiro Rugido Ancestral fica disponível 3.500 ms depois do surgimento do Urso. Depois de usado, a habilidade entra em recarga por 6.000 ms.
- Quando a habilidade está disponível e existe ao menos uma torre de combate a até 230 px, o Urso ruge e atordoa simultaneamente todas as torres de combate dentro do raio por 1.400 ms.
- Uma torre atordoada não procura alvo, não dispara e não gera dinheiro. Ao fim do efeito, ela volta a operar normalmente sem perder nível, resistência ou modo de alvo.
- Isca Blindada e Amplificador Pixel não são afetados pelo rugido porque não são torres de combate.
- Se nenhuma torre de combate estiver no alcance, o Urso guarda o rugido disponível até encontrar um alvo válido.
- Pausar a partida congela a recarga do rugido, sua animação e o tempo restante de atordoamento.
- O Urso Ancestral substitui o Boss vinho na Fase 5; os dois nunca aparecem juntos.

### Inimigos exclusivos da Fase 7

- Mosquitos do Brejo possuem 340 de vida e velocidade de 3 px por frame.
- Mosquitos começam na wave 3 com 1 unidade e recebem mais 1 unidade a cada 4 waves; a wave 20 contém 5.
- Sapos Venenosos possuem 650 de vida e velocidade de 1,35 px por frame.
- Sapos começam na wave 5 com 1 unidade e recebem mais 1 unidade a cada 4 waves; a wave 20 contém 4.
- Guardiões de Lodo possuem 1.400 de vida e velocidade de 0,62 px por frame.
- Guardiões começam na wave 7 com 1 unidade e recebem mais 1 unidade a cada 5 waves; a wave 20 contém 3.
- Mosquitos, Sapos e Guardiões são somados aos inimigos comuns, Sabotadores e à Hidra do Pântano.
- Inimigos exclusivos das Fases 2 a 6 não aparecem na Fase 7.
- A Hidra do Pântano possui 3.800 de vida inicial, velocidade de 0,7 px por frame e recebe mais 500 de vida nas waves 10, 15 e 20.
- Ao alcançar 50% da vida pela primeira vez, a Hidra ativa permanentemente sua regeneração, restaura 40 de vida por segundo e nunca ultrapassa a própria vida máxima.
- Pausar a partida congela a regeneração da Hidra; derrotá-la encerra o efeito imediatamente.
- A Hidra do Pântano substitui todos os outros Bosses na Fase 7.

### Inimigos exclusivos da Fase 8

- Raptors Ancestrais possuem 420 de vida e velocidade de 2,9 px por frame. Começam na wave 3 e a wave 20 contém 5.
- Besouros de Âmbar possuem 850 de vida, velocidade de 1,15 px por frame e reduzem em 20% todo dano recebido. Começam na wave 5 e a wave 20 contém 4.
- Tricerátopos possuem 1.700 de vida e velocidade de 0,58 px por frame. Começam na wave 7 e a wave 20 contém 3.
- As três unidades são somadas aos inimigos comuns, Sabotadores e ao Tirano Primordial; inimigos exclusivos das Fases 2 a 7 não aparecem na Fase 8.
- O Tirano Primordial possui 4.800 de vida inicial, velocidade de 0,68 px por frame e recebe mais 600 de vida nas waves 10, 15 e 20.
- Ao cruzar 60% e 30% da vida, o Tirano usa Chamado da Matilha e invoca dois Raptors Ancestrais em sua posição atual para cada limite atravessado.
- O Tirano Primordial substitui todos os outros Bosses na Fase 8.

### Inimigos exclusivos da Fase 9

- Drones Caçadores possuem 360 de vida, velocidade de 3 px por frame e tamanho 20. Começam na wave 3 com 1 unidade e recebem mais 1 a cada 4 waves; a wave 20 contém 5.
- Robôs Reparadores possuem 700 de vida, velocidade de 1,2 px por frame e tamanho 28. Começam na wave 5 com 1 unidade e recebem mais 1 a cada 4 waves; a wave 20 contém 4.
- A cada 1,8 segundo, cada Robô Reparador restaura até 45 de vida do aliado ferido com menor proporção de vida em um raio de 140 px. O Robô não pode reparar a si mesmo, o efeito não ultrapassa a vida máxima e seus cronômetros param com a partida pausada.
- Sentinelas de Escudo possuem 1.200 de vida, velocidade de 0,7 px por frame e tamanho 36. Começam na wave 7 com 1 unidade e recebem mais 1 a cada 5 waves; a wave 20 contém 3.
- Cada Sentinela reduz em 25% o dano recebido por outros inimigos em um raio de 150 px. O escudo não protege a própria Sentinela e não acumula quando mais de uma aura cobre o mesmo aliado.
- As três unidades são somadas aos inimigos comuns, Sabotadores e ao Protocolo Zero; inimigos exclusivos das Fases 2 a 8 não aparecem na Fase 9.
- O Protocolo Zero possui 5.400 de vida inicial, velocidade de 0,75 px por frame, tamanho 60 e recebe mais 650 de vida nas waves 10, 15 e 20.
- Ao cruzar 65% e 30% da vida, o Protocolo Zero usa **Reversão de Emergência**: recua 240 px no próprio caminho e recupera 8% da vida máxima. Cada limite ativa uma única vez, e um golpe que atravesse os dois limites ativa as duas reversões.
- O Protocolo Zero substitui todos os outros Bosses na Fase 9.

### Sabotador

- O Sabotador aparece nas nove fases, possui 75 de vida e velocidade de 1,1 px por frame.
- Enquanto avança pelo caminho, procura a torre mais próxima dentro de 180 px e dispara a cada 1,2 segundo; se uma Isca Blindada estiver nesse alcance, ela recebe prioridade mesmo que outra torre esteja mais perto.
- Os projéteis perseguem a torre escolhida; se ela for vendida ou destruída antes do impacto, o projétil desaparece.
- Cada impacto permanece registrado mesmo depois de melhorar a torre. Ao receber o sexto tiro, a torre é destruída sem devolver créditos.
- Torres danificadas exibem seis blocos de resistência, apagados conforme recebem tiros.
- A Isca Blindada exibe dez blocos e é destruída somente no décimo impacto.

## Vitória

- Na campanha normal, a wave 20 é a última da partida; a wave 21 não é iniciada.
- A partida é vencida depois que todos os inimigos da wave 20 forem derrotados.
- O painel **VITÓRIA** aparece e permanece até a escolha entre repetir a fase, voltar ao menu ou iniciar a próxima fase.
- A conclusão e o desbloqueio da próxima fase são salvos antes de o painel aparecer.
- Ao concluir a wave 20, a vitória concede 20 Fragmentos de Pixel pela quantidade de waves alcançadas.
- O modo Waves infinitas nunca aciona esta condição de vitória e, quando a base é invadida, concede metade da wave alcançada arredondada para baixo.

## Progressão das fases

- A campanha possui atualmente 9 fases com as mesmas regras centrais e duração de 20 waves; as Fases 2 a 9 aumentam a dificuldade com inimigos exclusivos próprios.
- A Fase 1 mantém o mapa de campo verde.
- A Fase 2 usa um trajeto próprio pelo mapa de deserto, com comprimento aproximado ao caminho da Fase 1.
- A Fase 3 usa um trajeto próprio em zigue-zague pelo mapa ártico, também com comprimento aproximado aos caminhos anteriores.
- A Fase 4 usa um trajeto próprio longo e anguloso pelas ruínas da selva, com comprimento de 3.030 px.
- A Fase 5 possui duas entradas com trajetos de 2.960 px cada. Os ramos norte e sul têm o mesmo comprimento, convergem no centro do mapa e compartilham a única torre-base.
- A Fase 6 possui um trajeto vulcânico de 3.050 px e limite de 15 torres.
- A Fase 7 possui um trajeto pantanoso de 3.170 px e limite de 15 torres.
- A Fase 8 possui dois trajetos comuns, de 3.200 px e 3.180 px, além do Atalho do Tirano com 2.320 px; seu limite continua sendo 15 torres.
- A Fase 9 possui um trajeto futurista de 3.010 px, três Trilhos de Impulso e limite de 15 torres.
- A Fase 1 começa desbloqueada e é sempre a fase selecionada ao carregar a página.
- A Fase 2 começa bloqueada e só é desbloqueada depois da vitória na Fase 1.
- A Fase 3 começa bloqueada e só é desbloqueada depois da vitória na Fase 2.
- A Fase 4 começa bloqueada e só é desbloqueada depois da vitória na Fase 3.
- A Fase 5 começa bloqueada e só é desbloqueada depois da vitória na Fase 4.
- A Fase 6 começa bloqueada e só é desbloqueada depois da vitória na Fase 5.
- A Fase 7 começa bloqueada e só é desbloqueada depois da vitória na Fase 6.
- A Fase 8 começa bloqueada, só é desbloqueada depois da vitória na Fase 7 e só aparece no destino Passado da Máquina do Tempo.
- A Fase 9 começa bloqueada, só é desbloqueada depois da vitória na Fase 8 e só aparece no destino Futuro da Máquina do Tempo.
- Concluir uma fase significa derrotar todos os inimigos de sua wave 20.
- Derrotas e partidas abandonadas não desbloqueiam fases.
- Fases concluídas continuam disponíveis para serem jogadas novamente.
- O maior número de fase concluída é salvo no armazenamento local do navegador e preservado após recarregar a página.
- O progresso usa a versão atual da chave de armazenamento; dados anteriores que liberavam a Fase 2 indevidamente são ignorados.
- O seletor impede a escolha de uma fase bloqueada.
- A estrutura de desbloqueio é sequencial: cada nova fase adicionada deverá exigir a conclusão da anterior.

### Mudança: campanha organizada em capítulos

**Objetivo:** preparar uma campanha mais longa sem mostrar todas as fases em uma única tela.
**Alterar:** substituir o botão **Fases** do lobby por **Capítulos** e organizar a campanha em três capítulos de seis fases cada.
**Não alterar:** maior fase já salva, ordem das sete fases atuais, condição de conclusão, recompensas, balanceamento ou possibilidade de repetir fases concluídas.
**Aceitação:**
- O lobby mostra **Capítulos** no lugar de **Fases**; clicar abre exatamente três cartões.
- O **Capítulo 1** reúne as Fases 1 a 6, começa disponível e só é concluído depois da vitória na Fase 6.
- O **Capítulo 2** reserva as Fases 7 a 12, permanece bloqueado até a conclusão da Fase 6 **e** a primeira vitória na Dimensão Glitch, e mostra a Fase 7 normalmente até a Máquina do Tempo ser concedida depois dessa fase.
- O **Capítulo 3** reserva as Fases 13 a 18 e permanece bloqueado até a conclusão da Fase 12.
- Cada cartão informa intervalo de fases, progresso de zero a seis, estado e um botão **Ver fases**; cartões bloqueados não podem ser abertos.
- Escolher um capítulo disponível abre somente as fases implementadas que pertencem ao seu intervalo.
- A tela de fases possui **Voltar aos capítulos** sem fechar a página inteira do lobby.
- Dentro de um capítulo disponível, a próxima fase continua sendo liberada somente depois da vitória na fase anterior; a passagem do Capítulo 1 para o Capítulo 2 possui também o desafio narrativo da Dimensão Glitch.
- Progresso salvo até a Fase 5 mantém o portal e o Capítulo 2 bloqueados; concluir a Fase 6 desperta o portal, mas somente vencer a fase secreta libera o Capítulo 2; o Capítulo 3 não pode ser liberado antes da Fase 12.
- Na primeira conclusão da Fase 6, quem ainda não descobriu o portal recebe uma carta misteriosa indicando onde procurar o desafio secreto, sem revelar a identidade do remetente.
- O desbloqueio do Capítulo 2 é salvo separadamente no navegador e não altera nem apaga o número da maior fase concluída.
- A Dimensão Glitch não pertence a nenhum capítulo e continua acessível somente pelo portal.

## Trajetórias das fases

- O caminho usado para desenhar o mapa, mover inimigos e impedir torres é determinado pela fase selecionada.
- Fase 1: (0,525) → (160,525) → (160,150) → (350,150) → (350,600) → (570,600) → (570,100) → (800,100) → (800,500) → (1030,500) → (1030,220) → (1200,220).
- Fase 2: (0,120) → (220,120) → (220,620) → (460,620) → (460,180) → (700,180) → (700,520) → (930,520) → (930,80) → (1150,80) → (1150,380) → (1200,380).
- Fase 3: (0,360) → (210,360) → (210,80) → (470,80) → (470,620) → (720,620) → (720,180) → (970,180) → (970,560) → (1160,560) → (1160,320) → (1200,320).
- Fase 4: (0,650) → (150,650) → (150,370) → (360,370) → (360,90) → (600,90) → (600,610) → (840,610) → (840,180) → (1080,180) → (1080,500) → (1200,500).
- Fase 5, ramo norte: (0,130) → (180,130) → (180,300) → (400,300) → (400,170) → (650,170) → (650,350) → trecho compartilhado.
- Fase 5, ramo sul: (0,570) → (180,570) → (180,400) → (400,400) → (400,530) → (650,530) → (650,350) → trecho compartilhado.
- Fase 5, trecho compartilhado: (650,350) → (820,350) → (820,100) → (1040,100) → (1040,600) → (900,600) → (900,470) → (1150,470) → (1150,350) → (1200,350).
- Fase 6: (0,350) → (140,350) → (140,90) → (360,90) → (360,540) → (580,540) → (580,170) → (800,170) → (800,620) → (1010,620) → (1010,300) → (1200,300).
- Fase 7: (0,100) → (180,100) → (180,560) → (390,560) → (390,220) → (610,220) → (610,620) → (830,620) → (830,140) → (1050,140) → (1050,430) → (1200,430).
- Fase 8, Caminho Alto: (0,610) → (140,610) → (140,180) → (330,180) → (330,510) → (520,510) → (520,80) → (740,80) → (740,570) → (940,570) → (940,250) → (1200,250), com 3.200 px de extensão.
- Fase 8, Caminho Baixo: (0,610) → (140,610) → (140,420) → (330,420) → (330,80) → (520,80) → (520,570) → (740,570) → (740,180) → (940,180) → (940,500) → (1080,500) → (1080,250) → (1200,250), com 3.180 px de extensão.
- Fase 8, Atalho do Tirano: (0,610) → (140,610) → (140,520) → (430,520) → (430,120) → (700,120) → (700,500) → (940,500) → (940,250) → (1200,250), com 2.320 px de extensão.
- Fase 9: (0,350) → (150,350) → (150,100) → (360,100) → (360,590) → (590,590) → (590,180) → (820,180) → (820,560) → (1040,560) → (1040,280) → (1200,280), com 3.010 px de extensão.
- Cada entrada é desenhada no início de seu trajeto, e a torre-base protegida fica encaixada na borda do ponto final compartilhado.
- Na Fase 5, inimigos sucessivos alternam entre a entrada norte e a entrada sul; a alternância é reiniciada ao começar ou reiniciar a partida.
- Quantidade de waves, economia e regras de vitória permanecem iguais nas nove fases; as Fases 7, 8 e 9 acrescentam suas unidades exclusivas sem misturar os inimigos especiais de outros biomas.

### Mudança: Fase 3 Ártica

**Objetivo:** adicionar uma terceira fase visualmente distinta, desbloqueada pela progressão normal da campanha.
**Alterar:** incluir a Fase 3 com tema ártico, limite de 12 torres e trajetória exclusiva de 3.080 px.
**Não alterar:** dinheiro inicial, waves, inimigos comuns, recompensa por tiro e condições de vitória ou derrota.
**Aceitação:**
- Dado que a Fase 2 ainda não foi concluída, a Fase 3 aparece bloqueada e não pode ser selecionada.
- Dado que a Fase 2 foi concluída, a Fase 3 fica disponível e seu tema substitui imediatamente o fundo do lobby.
- Ao iniciar a Fase 3, inimigos percorrem a trajetória ártica e o mapa exibe neve, caminho de gelo, iglus, pinguins, pinheiros nevados, blocos de gelo e lago congelado.
- Escorpiões, Múmias e o Faraó de Areia permanecem exclusivos da Fase 2.

### Mudança: inimigos exclusivos da Fase 3

**Objetivo:** aumentar a identidade e a dificuldade do mapa ártico com unidades próprias.
**Alterar:** adicionar Lobos de Gelo desde a wave 3 e Yetis desde a wave 7, usando a progressão de quantidades definida na seção de waves.
**Não alterar:** inimigos comuns, Sabotadores, economia, trajetória, limite de torres ou condição de vitória da Fase 3.
**Aceitação:**
- Dada a Fase 3, quando a wave 3 começar, então 1 Lobo de Gelo é acrescentado à composição comum.
- Dada a Fase 3, quando a wave 7 começar, então 2 Lobos de Gelo e 1 Yeti são acrescentados.
- Dada a Fase 3, quando a wave 20 começar, então 5 Lobos de Gelo e 3 Yetis são acrescentados junto ao Titã Glacial.
- Dadas as Fases 1, 2, 4 ou 5, Lobos de Gelo e Yetis nunca são criados.

### Mudança: Fase 4 Ruínas da Selva

**Objetivo:** adicionar uma quarta fase visualmente distinta, desbloqueada pela progressão normal da campanha.
**Alterar:** incluir a Fase 4 com tema de selva, limite de 14 torres, trajetória exclusiva de 3.030 px, inimigos próprios e Colosso da Selva.
**Não alterar:** dinheiro inicial, duração de 20 waves, inimigos comuns, Sabotadores, recompensa por tiro e condições de vitória ou derrota.
**Aceitação:**
- Dado que a Fase 3 ainda não foi concluída, a Fase 4 aparece bloqueada e não pode ser selecionada.
- Dado que a Fase 3 foi concluída, a Fase 4 fica disponível, a Torre Besta é liberada e o tema de selva substitui imediatamente o fundo do lobby.
- Ao iniciar a Fase 4, inimigos percorrem a trajetória própria e o mapa exibe vegetação, caminho de terra, árvores, cipós, flores, lagos e ruínas pixeladas.
- Na wave 3, 1 Macaco Saqueador é acrescentado à composição comum.
- Na wave 5, 1 Onça da Selva é acrescentada e ativa a disparada ao ficar com 50% da vida ou menos.
- Na wave 7, 2 Macacos Saqueadores, 1 Onça da Selva e 1 Gorila da Selva são acrescentados.
- Na wave 20, 5 Macacos, 4 Onças e 3 Gorilas são acrescentados junto ao Colosso da Selva.
- Inimigos exclusivos das Fases 2 e 3 não aparecem na Fase 4.

### Mudança: Fase 5 Bosque do Crepúsculo

**Objetivo:** adicionar uma quinta fase de floresta temperada que exige defender duas entradas convergentes.
**Alterar:** incluir a Fase 5 com tema de outono, limite de 15 torres, dois trajetos equivalentes de 2.960 px, inimigos próprios e Urso Ancestral.
**Não alterar:** dinheiro inicial, duração de 20 waves, inimigos comuns, Sabotadores, recompensa por tiro, fases anteriores e condições de vitória ou derrota.
**Aceitação:**
- Dado que a Fase 4 ainda não foi concluída, a Fase 5 aparece bloqueada e não pode ser selecionada.
- Dado que a Fase 4 foi concluída, a Fase 5 e a Torre de Esporos ficam disponíveis, e o tema da nova fase substitui imediatamente o fundo do lobby.
- Ao iniciar a Fase 5, o mapa exibe duas entradas, alterna inimigos entre elas e conduz os dois caminhos até a mesma torre-base.
- Os dois caminhos possuem exatamente 2.960 px, impedem construção e aceitam Minas Terrestres em toda a própria extensão.
- Na wave 3, 1 Raposa Ladina é acrescentada à composição comum.
- Na wave 7, 2 Raposas e 1 Javali Furioso são acrescentados.
- Na wave 9, 2 Raposas, 1 Javali e 1 Coruja Sombria são acrescentados.
- Na wave 20, 5 Raposas, 3 Javalis e 3 Corujas são acrescentados junto ao Urso Ancestral.
- Inimigos exclusivos das Fases 2, 3 e 4 não aparecem na Fase 5.

### Mudança: Fase 6 Forja Vulcânica

**Objetivo:** adicionar uma sexta fase com identidade vulcânica, novos inimigos, uma torre de rajada tripla e um Boss cuja dificuldade vem de uma transformação, não de aumentos sucessivos de vida.
**Alterar:** incluir a Fase 6 com limite de 15 torres, trajeto exclusivo de 3.050 px, Obliterador, inimigos vulcânicos e Titã de Obsidiana.
**Não alterar:** dinheiro inicial, duração de 20 waves, inimigos comuns, Sabotadores, recompensa por tiro, fases anteriores e condições de vitória ou derrota.
**Aceitação:**
- Antes de concluir a Fase 5, a Fase 6 e o Obliterador permanecem bloqueados.
- Depois de concluir a Fase 5, a Fase 6 e o Obliterador são liberados permanentemente, inclusive ao repetir fases anteriores.
- Ao selecionar a Fase 6, o lobby e o mapa adotam o tema vulcânico com basalto, lava, vulcões e cristais de obsidiana.
- Ao iniciar a Fase 6, a trilha procedural da Forja começa e todas as outras trilhas da campanha são encerradas.
- Na wave 3, 1 Morcego de Fogo é acrescentado; uma nova unidade surge a cada 4 waves, totalizando 5 na wave 20.
- Na wave 5, 1 Lagarto Vulcânico é acrescentado; uma nova unidade surge a cada 4 waves, totalizando 4 na wave 20.
- Na wave 7, 1 Golem de Magma é acrescentado; uma nova unidade surge a cada 5 waves, totalizando 3 na wave 20.
- Inimigos exclusivos das Fases 2 a 5 não aparecem na Fase 6.
- O Titã de Obsidiana substitui os demais Bosses nas waves 5, 10, 15 e 20 e mantém 3.200 de vida em todas as quatro aparições.
- Antes da transformação, a carapaça reduz todo dano recebido em 15% e funciona como um limite de fase: um ataque não pode reduzir a vida para menos de 50%.
- Ao alcançar 50% da vida pela primeira vez, a carapaça rompe, o Titã acelera em 65% e libera respectivamente 2, 3, 4 ou 5 Fragmentos de Magma conforme a aparição.
- A transformação ocorre uma única vez por Titã; os Fragmentos começam no ponto atual do Boss, seguem o mesmo caminho e precisam ser derrotados para concluir a wave.
- O aviso de Boss da fase destaca **OBSIDIANO**.

### Mudança: Fase 7 Pântano Tóxico

**Objetivo:** iniciar o segundo capítulo da campanha com um novo bioma, elenco exclusivo e um Boss que exige dano contínuo.
**Alterar:** incluir a Fase 7 com limite de 15 torres, trajeto exclusivo de 3.170 px, cenário pantanoso, música procedural própria, três inimigos exclusivos e a Hidra do Pântano.
**Não alterar:** dinheiro inicial, duração de 20 waves, inimigos comuns, Sabotadores, recompensa por tiro, fases anteriores, acesso pelo portal ou condição de vitória e derrota.
**Aceitação:**
- Antes de concluir a Fase 6, a Fase 7 permanece bloqueada e não pode ser selecionada nem iniciada.
- Depois de concluir a Fase 6, a Fase 7 é liberada permanentemente e o botão **Próxima fase** pode iniciá-la diretamente.
- Ao selecionar a Fase 7, lobby e mapa adotam o Pântano Tóxico, com lodo verde-escuro, poças venenosas, árvores retorcidas, juncos, bolhas e cogumelos luminosos.
- Ao iniciar a Fase 7, a trilha procedural do pântano começa e todas as outras trilhas da campanha são encerradas.
- Na wave 3, 1 Mosquito do Brejo é acrescentado; uma nova unidade surge a cada 4 waves, totalizando 5 na wave 20.
- Na wave 5, 1 Sapo Venenoso é acrescentado; uma nova unidade surge a cada 4 waves, totalizando 4 na wave 20.
- Na wave 7, 1 Guardião de Lodo é acrescentado; uma nova unidade surge a cada 5 waves, totalizando 3 na wave 20.
- Inimigos exclusivos das Fases 2 a 6 não aparecem na Fase 7.
- A Hidra do Pântano substitui os demais Bosses nas waves 5, 10, 15 e 20, com respectivamente 3.800, 4.300, 4.800 e 5.300 de vida.
- Ao alcançar 50% da vida, a Hidra ativa permanentemente a regeneração de 40 de vida por segundo; o efeito pausa com a partida e não ultrapassa a vida máxima.
- O aviso de Boss da fase destaca **HIDRA**.
- A Dimensão Glitch passa a usar somente o número interno 99, permanece ausente da lista de fases e continua acessível exclusivamente pelo portal da Fase 1.

### Mudança: carta da Fase 7 e Máquina do Tempo

**Objetivo:** transformar a procura pelas fases do Capítulo 2 em uma exploração entre épocas guiada pelo Senhor do Tempo.
**Alterar:** o primeiro encerramento vitorioso da Fase 7, o cartão do Capítulo 2 e a forma de consultar suas fases depois de receber a Máquina do Tempo.
**Não alterar:** conteúdo da Fase 7, ordem de desbloqueio, condição de vitória, maior fase concluída, acesso à Dimensão Glitch, balanceamento ou possibilidade de repetir fases concluídas.
**Aceitação:**
- Na primeira vitória da Fase 7, antes do resultado comum, surge a mesma apresentação de carta encontrada no chão usada anteriormente.
- A carta diz **Você venceu o desafio. Como recompensa, deixei uma Máquina do Tempo para você no Capítulo 2. Sua próxima passagem está em uma época anterior ao pântano.** e é assinada por **Senhor do Tempo**, cuja identidade já foi revelada na Dimensão Glitch.
- A ação final da carta exibe **Receber Máquina do Tempo**; a carta não pode ser fechada com Escape e não se repete depois de recebida.
- Carta vista e Máquina do Tempo desbloqueada são salvas em chaves próprias, sem apagar ou substituir progresso, Fragmentos, compras, missões, conquistas, preferências ou outros dados da conta.
- Ao voltar ao lobby depois dessa primeira vitória, a página de Capítulos é aberta e uma Máquina do Tempo pixelada com o selo **NOVO** aparece no canto do cartão do Capítulo 2.
- Clicar na máquina abre as fases do Capítulo 2 junto de três destinos: **Passado**, **Presente** e **Futuro**; a época selecionada é salva e restaurada depois de atualizar a página.
- Cada época muda as fases mostradas. O planejamento inicial distribui as Fases 8 e 10 no Passado, 7 e 11 no Presente, e 9 e 12 no Futuro.
- O Presente mostra a Fase 7, o Passado mostra a Fase 8 e o Futuro mostra a Fase 9; cada passagem só fica jogável depois da vitória na fase anterior.
- A Fase 8 só pode ser selecionada no Passado depois da vitória na Fase 7 e do recebimento da Máquina do Tempo; a máquina não cria atalhos para ignorar a progressão sequencial.
- Antes de vencer a Fase 7, a máquina permanece ausente e a página do Capítulo 2 continua apresentando a Fase 7 e o aviso das futuras Fases 8 a 12.

### Mudança: Fase 8 Selva Primordial e Pulso Temporal

**Objetivo:** transformar a primeira passagem no Passado em uma fase completa e recompensar sua conclusão com uma habilidade que muda o ritmo da batalha.
**Alterar:** conteúdo jogável da Fase 8, destino Passado da Máquina do Tempo, álbum, trilha, resultado da vitória e barra inferior de ações da partida.
**Não alterar:** conteúdo ou balanceamento das Fases 1 a 7, acesso à Dimensão Glitch, condição de obtenção da Máquina do Tempo, seleção de seis defesas ou limite geral de torres.

- A Fase 8 recebe o nome **Selva Primordial**, pertence ao **Passado**, tem 20 waves, Boss nas waves 5, 10, 15 e 20 e limite base de 15 torres, ampliável para 16 pela Licença de Construção.
- A passagem só fica selecionável depois da conclusão da Fase 7 e do recebimento da Máquina do Tempo; para encontrá-la, o jogador abre o Capítulo 2 e viaja para o Passado.
- O mapa usa o **Caminho Vivo**, formado pelos três trajetos descritos nesta especificação, e uma identidade visual própria de mata pré-histórica, âmbar e ossos, aplicada também ao lobby quando a fase está selecionada.
- Nas waves 1 a 5, inimigos comuns usam o Caminho Alto; nas waves 6 a 10, usam o Caminho Baixo; da wave 11 em diante, os dois caminhos se alternam a cada wave, começando pelo Caminho Alto na wave 11.
- Durante a pausa anterior a uma mudança, o jogo avisa qual caminho será usado na próxima wave. A rota ativa permanece destacada no mapa e as inativas ficam escuras, bloqueadas por raízes e sem receber inimigos.
- Nas waves de Boss, o Tirano Primordial rompe as raízes do Atalho do Tirano e entra por essa rota de 2.320 px. Os Raptors chamados por ele permanecem no mesmo atalho; os demais inimigos da wave continuam no caminho comum indicado.
- O HUD da Fase 8 identifica permanentemente o caminho comum atual e informa quando o Atalho do Tirano está aberto, inclusive antes de inimigos aparecerem.
- A composição comum da wave continua existindo. O Raptor Ancestral surge a partir da wave 3 e recebe mais uma unidade a cada 4 waves; o Besouro de Âmbar surge a partir da wave 5 e recebe mais uma unidade a cada 4 waves; o Tricerátopo surge a partir da wave 7 e recebe mais uma unidade a cada 5 waves.
- O **Raptor Ancestral** possui 420 de vida, velocidade 2,9 e tamanho 22. O **Besouro de Âmbar** possui 850 de vida, velocidade 1,15, tamanho 30 e reduz em 20% todo dano recebido. O **Tricerátopo** possui 1.700 de vida, velocidade 0,58 e tamanho 42.
- O **Tirano Primordial** possui 4.800 de vida na primeira aparição, recebe mais 600 de vida por aparição, move-se à velocidade 0,68 e possui tamanho 62.
- Cada Tirano usa **Chamado da Matilha** uma vez ao cruzar 60% da vida e outra vez ao cruzar 30%, invocando dois Raptors Ancestrais no ponto atual do caminho em cada chamado. Se um golpe atravessar os dois limites, os dois chamados acontecem.
- A trilha da Selva Primordial reutiliza o motor procedural da selva, mas seleciona melodia grave, baixo, percussão, intervalo de 230 ms e ganho relativo de 170% próprios da Fase 8.
- Na primeira vitória da Fase 8, o resultado informa que o **Pulso Temporal** foi desbloqueado. O desbloqueio deriva do progresso salvo da campanha e não cria uma chave de conta separada.
- Em partidas iniciadas depois desse desbloqueio, a barra inferior de ações mostra o botão **Pulso Temporal**. Ele fica disponível a partir da wave 1, para todos os modos e fases.
- Ao ativar o Pulso Temporal, inimigos comuns ficam completamente parados por 4 segundos e Bosses ficam 50% mais lentos por 3 segundos. Novos inimigos criados enquanto o pulso está ativo recebem o mesmo efeito global restante.
- O Pulso Temporal recarrega por waves: depois de usado, só pode ser ativado novamente quando o contador alcançar 5 waves além da wave da ativação. Reiniciar ou começar outra partida deixa o primeiro uso pronto novamente na wave 1.
- Pausar a partida também pausa a duração restante do Pulso Temporal. O botão informa quando está pronto, quanto tempo resta ou em qual wave recarrega, e não pode ser ativado com a partida pausada ou encerrada.
- O álbum passa a reservar e revelar as figurinhas dos três inimigos e do Boss da Fase 8 pelas mesmas regras usadas nas demais fases.
- Carta, máquina, épocas, pistas, estados vazios e rótulos acompanham português, inglês e espanhol e permanecem utilizáveis em telas pequenas.

### Mudança: Fase 9 Metrópole Neon e Projeto Relógio

**Objetivo:** levar a campanha ao Futuro com uma cidade aparentemente perfeita, mas vazia, introduzir suporte entre inimigos e deixar a primeira pista sobre a origem da tecnologia temporal.
**Alterar:** conteúdo jogável da Fase 9, destino Futuro da Máquina do Tempo, mapa, álbum, trilha, Boss e transmissão narrativa emitida por um rádio.
**Não alterar:** conteúdo ou balanceamento das Fases 1 a 8, recompensa da Fase 8, Máquina do Tempo, seleção de seis defesas, limite geral de torres ou revelações futuras do Senhor do Tempo.
**Aceitação:**
- A Fase 9 recebe o nome **Metrópole Neon**, pertence ao **Futuro**, possui 20 waves, Boss nas waves 5, 10, 15 e 20 e limite base de 15 torres, ampliável para 16 pela Licença de Construção.
- Ela só pode ser selecionada depois da vitória na Fase 8 e aparece no destino Futuro da Máquina do Tempo; a progressão continua sequencial e não cria atalhos.
- Lobby e mapa usam uma cidade futurista intacta, iluminada e sem habitantes, com prédios, árvores holográficas, placas e detalhes ciano e magenta. O cenário não mostra a destruição reservada para uma fase posterior.
- O trajeto de 3.010 px usa três **Trilhos de Impulso** nas áreas `(190,70,130,60)`, `(560,300,60,150)` e `(850,530,130,60)`. Todo inimigo dentro de um trilho se move 45% mais rápido; a faixa e sua direção ficam visíveis no mapa.
- A composição comum da wave continua existindo. Drones Caçadores surgem na wave 3 e crescem a cada 4 waves; Robôs Reparadores surgem na wave 5 e crescem a cada 4 waves; Sentinelas de Escudo surgem na wave 7 e crescem a cada 5 waves.
- O **Protocolo Zero** aparece nas quatro waves de Boss com os valores e as duas Reversões de Emergência definidos na seção de inimigos exclusivos da Fase 9. O aviso de Boss destaca **PROTOCOLO ZERO**.
- Depois de concluir a wave 10, surge no mapa um rádio clicável do Projeto Relógio. A área ao redor do rádio permanece reservada para que nenhuma torre cubra sua interação.
- O rádio reproduz o desenho pixelado criado pelo jogador: corpo verde, grade amarela com faixas escuras, dois alto-falantes grandes, dois botões menores e uma antena inclinada com ponta vermelha.
- A identificação sob o objeto mostra **OUVIR · PROJETO RELÓGIO** e o aviso de descoberta informa **Rádio do Projeto Relógio encontrado!**.
- Clicar no rádio pausa a partida e exibe **TRANSMISSÃO 09 — REMETENTE DESCONHECIDO**, com o texto: **Se alguém ainda recebe este sinal, procure o Projeto Relógio. Objetivo registrado: criar um guardião capaz de existir em todas as eras. Consciência temporal detectada. Preparando corpo para transferência... RESULTADO: ARQUIVO CORROMPIDO.** A identificação exibida é **FREQUÊNCIA: PROJETO RELÓGIO**.
- A transmissão deixa de usar a aparência de papel ou arquivo aberto e mostra o mesmo rádio em destaque, com a luz vermelha piscando e a mensagem recebida abaixo dele.
- **Desligar rádio** fecha a transmissão e retoma a mesma partida. A audição é salva na chave existente sem modificar progresso, compras ou outros dados; em repetições, o rádio continua consultável.
- Caso o jogador vença a Fase 9 sem clicar no rádio, a mesma transmissão aparece automaticamente antes do painel de vitória e só então permite concluir o resultado.
- A pista não identifica o Senhor do Tempo, não revela a futura cidade destruída e não exibe a frase narrativa reservada para a Fase 11.
- O álbum reserva as figurinhas do Drone Caçador, Robô Reparador, Sentinela de Escudo e Protocolo Zero, reveladas pelas mesmas regras dos demais inimigos.
- A trilha reutiliza o motor procedural da selva com composição futurista própria, intervalo de 210 ms e ganho relativo de 180%.
- Nomes, descrições, avisos, rádio e transmissão acompanham português, inglês e espanhol; a apresentação permanece legível em desktop e celular.

### Mudança: Obliterador

**Objetivo:** recompensar a conclusão da Fase 5 com uma torre de alto dano em rajadas espaçadas.
**Alterar:** adicionar o Obliterador com três canos e três projéteis laser por ataque.
**Não alterar:** recompensa de 20 créditos por ataque, espaçamento mínimo, regras de alvo, melhoria e venda das demais torres.
**Aceitação:**
- Cada ataque cria exatamente 3 lasers contra o mesmo alvo e concede a recompensa por tiro apenas uma vez.
- O dano mostrado é o dano de cada laser, não a soma da rajada.
- Para reduzir a força excessiva da rajada sem remover sua identidade, o dano de cada laser foi reduzido em aproximadamente 20% em todos os níveis; alcance, cadência, custo e quantidade de canos permanecem iguais.
- O seletor, o mapa e o Álbum reutilizam o mesmo desenho pixelado com detalhes vermelhos e três canos em todos os níveis.

| Nível | Custo | Dano por laser | Alcance | Ataque | Visual |
| --- | --- | --- | --- | --- | --- |
| 0 | 550 | 38 | 230 px | 1.600 ms | Obsidiana e vermelho |
| 1 | 650 | 52 | 245 px | 1.500 ms | Vermelho reforçado |
| 2 | 850 | 70 | 260 px | 1.400 ms | Rubro e dourado |
| 3 | 1.100 | 96 | 280 px | 1.250 ms | Rubro intenso e amarelo |

### Mudança: Torre Sísmica

**Objetivo:** recompensar a conclusão da Fase 6 com uma torre de controle que tenha uma regra própria, sem depender de dano, projétil ou cadência comum.
**Alterar:** adicionar a **Torre Sísmica**, desbloqueada ao concluir a Fase 6, com carga por entrada de inimigos, impacto em área, empurrão, atordoamento de Bosses e três melhorias mecânicas.
**Não alterar:** progressão anterior, recompensa por disparo, composição das waves, caminhos, limites-base das fases, atributos das outras defesas ou comportamento normal dos Bosses fora do impacto.
**Aceitação:**
- Antes de concluir a Fase 6, a Torre Sísmica aparece bloqueada e não pode ser construída; depois da vitória, permanece liberada em todas as fases atuais e futuras.
- A construção custa 600 créditos, alcança 170 px, ocupa uma vaga de torre e permite no máximo 2 Torres Sísmicas por partida.
- A torre não dispara nem causa dano direto. Cada inimigo que entra em seu alcance fornece 1 carga; ao chegar a 3 cargas, o pistão ativa automaticamente um impacto em área e consome 3 cargas.
- Cada inimigo é contado somente ao entrar. Permanecer dentro do alcance não gera cargas adicionais; sair e entrar novamente pode fornecer uma nova carga.
- O impacto empurra todos os inimigos comuns dentro do alcance exatamente 120 px para trás ao longo do próprio caminho, sem tirá-los da trajetória ou trocar sua entrada.
- Bosses não são empurrados: eles ficam completamente parados durante 1.000 ms e depois retomam o movimento normal.
- A melhoria de nível 1 custa 400 créditos e reduz de 3 para 2 as cargas necessárias.
- A melhoria de nível 2 custa 550 créditos e faz os inimigos atingidos receberem 20% de dano adicional durante 3.000 ms.
- A melhoria de nível 3 custa 750 créditos e cria um segundo impacto automático 600 ms depois do primeiro, com 65% da distância de empurrão e do tempo de atordoamento.
- Todas as Torres Sísmicas registram os inimigos que estão em alcance antes de qualquer impacto da atualização. Assim, duas torres sobrepostas carregam juntas e seus empurrões se somam; contra Bosses, cada impacto prolonga o tempo de atordoamento.
- Pausar a partida também pausa o segundo impacto, o atordoamento e a vulnerabilidade.
- A Torre Sísmica não recebe bônus de cadência, não concede créditos por impacto e não possui prioridade de alvo.
- Mapa e miniaturas reutilizam o mesmo desenho pixelado de basalto com pistão mecânico, fissuras laranja e evolução visual em quatro níveis.
- Uma barra sobre a torre mostra a carga atual; o impacto, o atordoamento e a vulnerabilidade possuem sinais visuais próprios.
- Seletor, Álbum, HUD, avisos e atributos acompanham português, inglês e espanhol.

### Mudança: Rugido Ancestral do Urso

**Objetivo:** diferenciar o chefe do Bosque do Crepúsculo com uma habilidade própria e reduzir sua vida para manter a fase equilibrada.
**Alterar:** reduzir a vida inicial do Urso Ancestral de 5.000 para 3.500 e adicionar um rugido periódico que atordoa torres de combate próximas.
**Não alterar:** velocidade de 0,45 px por frame, aumento de 500 de vida por aparição, composição das waves, inimigos anteriores ou comportamento de Isca Blindada e Amplificador Pixel.
**Aceitação:**
- Na wave 5, o Urso possui 3.500 de vida; nas waves 10, 15 e 20 possui respectivamente 4.000, 4.500 e 5.000.
- Durante os primeiros 3.500 ms após surgir, o Urso não pode rugir.
- Com uma torre de combate a até 230 px, o rugido atordoa essa torre durante 1.400 ms, exibe o efeito pixelado no Urso e na torre e reproduz o som gravado.
- Torres de combate fora do raio, Isca Blindada e Amplificador Pixel continuam funcionando normalmente.
- Um novo rugido só pode acontecer 6.000 ms depois do uso anterior.
- Desativar ou zerar o volume dos efeitos impede o áudio do rugido sem desativar a habilidade.
- Abrir o menu da partida congela tanto a recarga quanto o atordoamento e os retoma com o mesmo tempo restante.

## Derrota e reinício

- Se qualquer inimigo tocar a torre-base no final do caminho, a partida termina imediatamente.
- O contato usa um núcleo de 18 px ao redor da torre-base somado ao tamanho do inimigo, fazendo a derrota acontecer quando o sprite encosta na estrutura.
- O painel grande **GAME OVER** aparece no centro da tela e permanece aberto até a escolha do jogador.
- A tela de derrota informa **SUA BASE FOI INVADIDA**.
- O texto complementar usa apenas **base**, sem chamar a estrutura de torre-base.
- O painel permanece aberto até o jogador escolher **Recomeçar fase** ou **Voltar ao menu**.

### Mudança: torre-base no fim do caminho

**Objetivo:** representar claramente o ponto que o jogador precisa defender.
**Alterar:** substituir o portão de saída por uma torre-base pixelada temática e encerrar a partida no primeiro contato de qualquer inimigo com ela.
**Não alterar:** trajetórias, velocidades, waves, economia e progressão.
**Aceitação:**
- Dada qualquer uma das nove fases, a torre-base aparece no fim da trajetória com as cores do tema atual.
- Dado um inimigo vivo, quando seu sprite tocar a torre-base, então a derrota é acionada imediatamente.
- Dado um inimigo derrotado antes do contato, ele é removido normalmente e não causa Game Over.
- Após a derrota, o painel **GAME OVER** permanece aberto e oferece recomeçar a fase ou voltar ao menu.

## Melhorias de torre

- Clique em uma torre para selecioná-la e use o botão **Melhorar torre**.
- Torres que disparam usam cinco melhorias distribuídas entre dano, velocidade de ataque e alcance, conforme a revisão abaixo. Torre Sísmica e Gerador conservam suas três melhorias próprias; Isca e Amplificador permanecem sem melhorias.
- O Canhão pesado possui dano base 20, superior ao dano 15 da Torre padrão nível 1.
- Mesmo no nível 3, o alcance 140 do Canhão pesado permanece abaixo do alcance 150 da Torre padrão nível 0.

### Mudança: nomes de defesas sem melhorias

**Objetivo:** não apresentar um nível inexistente nas defesas da Loja que não podem ser melhoradas.
**Alterar:** a identificação exibida no Álbum e ao selecionar uma defesa durante a partida.
**Não alterar:** atributos, custos, limites, venda, comportamento em combate, desenhos ou disponibilidade do botão de melhoria.
**Aceitação:**
- Toda defesa cuja lista de melhorias esteja vazia mostra somente seu nome na figurinha base do Álbum, sem **nível 0**.
- Ao selecionar uma dessas defesas na partida, o aviso, a barra inferior e o painel sobre o mapa não exibem **nível 0**; o nome e os atributos úteis permanecem visíveis.
- Torres que realmente podem ser melhoradas continuam mostrando seus níveis no Álbum e durante a partida.
- A regra acompanha português, inglês e espanhol.

### Torre padrão

As tabelas antigas de níveis das torres de tiro abaixo ficam como referência do balanceamento anterior e dos visuais. A compra de pacotes que aumentavam vários atributos foi substituída pela seção **Melhorias por atributo**; tabelas de suporte, como Gerador e Sísmica, continuam vigentes.

| Nível | Custo | Dano | Alcance | Ataque | Visual |
| --- | --- | --- | --- | --- | --- |
| 0 | — | 10 | 150 px | 500 ms | Azul |
| 1 | 200 | 15 | 165 px | 450 ms | Azul-claro |
| 2 | 300 | 22 | 180 px | 400 ms | Dourado |
| 3 | 450 | 30 | 200 px | 350 ms | Roxo |

### Canhão pesado

| Nível | Custo | Dano | Alcance | Ataque | Visual |
| --- | --- | --- | --- | --- | --- |
| 0 | 250 | 20 | 110 px | 700 ms | Vermelho-terra |
| 1 | 300 | 28 | 118 px | 650 ms | Laranja |
| 2 | 420 | 38 | 128 px | 600 ms | Dourado-escuro |
| 3 | 560 | 50 | 140 px | 550 ms | Vermelho-escuro |

#### Mudança: bola de canhão própria

**Objetivo:** diferenciar claramente o disparo do Canhão pesado do projétil luminoso da Torre padrão.
**Alterar:** desenhar uma bola de canhão pixelada de 18 px inspirada na imagem autoral `references/Captura de tela 2026-08-26 140653.png`, com corpo de carvão, bordas em degraus, sombra inferior e brilho em cruz.
**Não alterar:** dano, velocidade, trajetória, perseguição do alvo, recompensa por tiro ou cadência do Canhão pesado.
**Aceitação:**
- Somente o Canhão pesado dispara a bola de canhão escura; a Torre padrão mantém seu projétil luminoso.
- A bola não possui fogo, rastro luminoso nem cauda atrás dela.
- O desenho permanece pixelado e centralizado durante todo o movimento.

### Torre Glacial

| Nível | Custo | Dano | Alcance | Ataque | Lentidão | Congela | Visual |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 350 | 18 | 170 px | 800 ms | 25% por 1.400 ms | 4 acertos por 500 ms | Cristal azul-gelo |
| 1 | 420 | 25 | 180 px | 740 ms | 30% por 1.600 ms | 4 acertos por 600 ms | Cristal ciano |
| 2 | 560 | 34 | 195 px | 680 ms | 35% por 1.800 ms | 3 acertos por 700 ms | Cristal branco |
| 3 | 720 | 46 | 210 px | 600 ms | 40% por 2.200 ms | 3 acertos por 800 ms | Cristal azul e dourado |

- A lentidão é renovada por novos acertos e afeta inimigos comuns e Bosses.
- O congelamento interrompe somente inimigos comuns; Bosses continuam em movimento sob o efeito da lentidão.

### Torre Besta

| Nível | Custo | Dano | Alcance | Ataque | Visual |
| --- | --- | --- | --- | --- | --- |
| 0 | 400 | 55 | 210 px | 1.100 ms | Madeira e bronze |
| 1 | 480 | 75 | 225 px | 1.000 ms | Madeira clara |
| 2 | 650 | 100 | 240 px | 900 ms | Madeira reforçada |
| 3 | 850 | 135 | 260 px | 800 ms | Madeira escura e dourada |

- A Torre Besta dispara virotes próprios a 10 px por frame.
- Sua função é causar alto dano por disparo e cobrir longo alcance, compensados pelo custo e pelo intervalo de ataque maiores.

### Torre de Esporos

| Nível | Custo | Dano em área | Raio da área | Alcance | Ataque | Visual |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 475 | 42 | 60 px | 185 px | 1.050 ms | Cogumelo rosa e madeira |
| 1 | 550 | 58 | 65 px | 195 px | 950 ms | Cogumelo rosa-claro |
| 2 | 725 | 78 | 72 px | 207 px | 850 ms | Cogumelo violeta e dourado |
| 3 | 950 | 105 | 80 px | 220 px | 750 ms | Cogumelo ancestral roxo |

- A Torre de Esporos dispara orbes próprios a 7,5 px por frame.
- Cada impacto aplica o dano integral a todo inimigo vivo cujo centro esteja dentro do raio da nuvem, incluindo o alvo original uma única vez.
- Cada disparo concede somente a recompensa normal de 20 créditos, independentemente da quantidade de inimigos atingidos.

## Construção de torres

- A Torre padrão é o tipo selecionado no início de cada partida.
- A Torre padrão fica disponível em todas as fases.
- O Canhão pesado começa bloqueado e é desbloqueado permanentemente ao concluir a Fase 1.
- Depois do desbloqueio, o Canhão pesado fica disponível em todas as fases, inclusive ao repetir a Fase 1.
- Enquanto estiver bloqueado, o botão do Canhão pesado fica desabilitado, exibe **Conclua Fase 1** e nenhuma tentativa de construção desconta créditos.
- A Torre Glacial começa bloqueada e é desbloqueada permanentemente ao concluir a Fase 2.
- Depois do desbloqueio, a Torre Glacial fica disponível em todas as fases atuais e futuras, inclusive ao repetir fases anteriores.
- Enquanto estiver bloqueada, seu botão fica desabilitado, exibe **Conclua Fase 2** e nenhuma tentativa de construção desconta créditos.
- A Torre Besta começa bloqueada e é desbloqueada permanentemente ao concluir a Fase 3.
- Depois do desbloqueio, a Torre Besta fica disponível em todas as fases atuais e futuras, inclusive ao repetir fases anteriores.
- Enquanto estiver bloqueada, seu botão fica desabilitado, exibe **Conclua Fase 3** e nenhuma tentativa de construção desconta créditos.
- A Torre de Esporos começa bloqueada e é desbloqueada permanentemente ao concluir a Fase 4.
- Depois do desbloqueio, a Torre de Esporos fica disponível em todas as fases, inclusive ao repetir as Fases 1 a 4.
- Enquanto estiver bloqueada, seu botão fica desabilitado, exibe **Conclua Fase 4** e nenhuma tentativa de construção desconta créditos.
- O Obliterador começa bloqueado e é desbloqueado permanentemente ao concluir a Fase 5.
- Depois do desbloqueio, o Obliterador fica disponível em todas as fases, inclusive ao repetir as Fases 1 a 5.
- Enquanto estiver bloqueado, seu botão fica desabilitado, exibe **Conclua Fase 5** e nenhuma tentativa de construção desconta créditos.
- A Torre Sísmica começa bloqueada e é desbloqueada permanentemente ao concluir a Fase 6.
- Depois do desbloqueio, a Torre Sísmica fica disponível em todas as fases, inclusive ao repetir as Fases 1 a 6.
- Enquanto estiver bloqueada, seu botão fica desabilitado, exibe **Conclua Fase 6** e nenhuma tentativa de construção desconta créditos.
- A Isca Blindada começa bloqueada e seu botão exibe **Compre na Loja**.
- Depois de comprada, a Isca Blindada fica permanentemente disponível em todas as fases e custa 200 créditos em cada construção.
- O Amplificador Pixel também começa bloqueado, custa 45 Fragmentos na Loja e, depois da compra permanente, custa 300 créditos para ser construído.
- O Gerador de Créditos começa bloqueado, custa 70 Fragmentos na Loja e, depois da compra permanente, custa 300 créditos para ser construído.
- A Mina Terrestre começa bloqueada, custa 25 Fragmentos na Loja e, depois da compra permanente, custa 100 créditos para ser armada em qualquer fase.
- A Bomba Pesada começa bloqueada, custa 40 Fragmentos na Loja e, depois da compra permanente, custa 200 créditos para ser posicionada em qualquer fase.
- A Torre de Raios começa bloqueada, custa 60 Fragmentos na Loja e, depois da compra permanente, custa 425 créditos para ser construída em qualquer fase.
- O Lança-Chamas começa bloqueado, custa 100 Fragmentos na Loja e, depois da compra permanente, custa 650 créditos para ser construído em qualquer fase.
- A Mina Congelante começa bloqueada, custa 35 Fragmentos na Loja e, depois da compra permanente, custa 125 créditos para ser armada em qualquer fase.
- O jogador escolhe o tipo de torre no painel vertical à direita do mapa e depois clica em uma área válida.
- O custo, dano, alcance, velocidade e aparência são definidos pelo tipo selecionado.
- Os doze tipos de torre compartilham o limite da fase atual: 10 torres na Fase 1, 12 nas Fases 2 e 3, 14 na Fase 4 e 15 nas Fases 5 a 9.
- Além do limite geral, podem existir no máximo 2 Iscas Blindadas por partida.
- Além do limite geral, pode existir no máximo 1 Amplificador Pixel por partida.
- Além do limite geral, pode existir no máximo 1 Gerador de Créditos por partida.
- Além do limite geral, podem existir no máximo 2 Torres Sísmicas por partida.
- Além do limite geral, podem existir no máximo 2 Lança-Chamas por partida.
- A Mina Terrestre não conta como torre, não ocupa o limite da fase e possui um limite próprio de 5 unidades armadas.
- A Mina Congelante não conta como torre, não ocupa o limite da fase e possui um limite próprio de 4 unidades armadas.
- A Bomba Pesada não conta como torre, não ocupa o limite da fase e possui um limite próprio de 3 unidades posicionadas.
- O rodapé do lobby e o HUD da partida exibem o limite correspondente à fase selecionada.
- O espaçamento mínimo de 70 px e a recompensa de 20 por ataque permanecem iguais nas nove fases; a rajada tripla do Obliterador concede a recompensa uma única vez.
- Selecionar um tipo sem dinheiro suficiente não desconta créditos nem constrói a torre.

### Mudança: desbloqueio permanente do Canhão pesado

**Objetivo:** permitir que a recompensa por concluir a Fase 1 também seja usada ao repetir fases anteriores.
**Alterar:** substituir o desbloqueio condicionado ao número da fase por um desbloqueio global condicionado à conclusão da Fase 1.
**Não alterar:** custo de 250 créditos, dano, alcance, velocidade de ataque, melhorias ou limites de torres.
**Aceitação:**
- Antes de concluir a Fase 1, o botão permanece desabilitado e mostra **Conclua Fase 1**.
- Ao concluir a Fase 1, o Canhão pesado é liberado imediatamente e o progresso é salvo.
- Depois do desbloqueio, recarregar a página ou repetir a Fase 1 mantém o Canhão pesado disponível.
- Abandonar ou perder a Fase 1 não desbloqueia o Canhão pesado.

### Mudança: Torre Glacial e Titã Glacial

**Objetivo:** dar à Fase 3 uma torre de controle de inimigos e um Boss exclusivo.
**Alterar:** adicionar a Torre Glacial desbloqueada pela conclusão da Fase 2 e substituir o Boss vinho da Fase 3 pelo Titã Glacial. A Besta estreia na Fase 4.
**Não alterar:** limite de torres, recompensa por tiro, trajetória, quantidade de waves, inimigos comuns ou progressão sequencial.
**Aceitação:**
- Antes de concluir a Fase 2, a Torre Glacial aparece bloqueada e não pode ser construída.
- Depois de concluir a Fase 2, a Torre Glacial permanece disponível nas fases atuais e futuras.
- A Torre Glacial nível 0 custa 350, causa 18 de dano, alcança 170 px, ataca a cada 800 ms e dispara estilhaços a 8 px por frame.
- Seus acertos causam 25% de lentidão por 1.400 ms e congelam inimigos comuns por 500 ms a cada 4 acertos.
- Bosses recebem a lentidão, mas nunca ficam completamente congelados.
- A Torre Glacial possui três melhorias e usa visual de cristal e projétil próprios no mapa e no Álbum.
- Nas waves 5, 10, 15 e 20 da Fase 3, surge somente o Titã Glacial como Boss.
- O Titã Glacial começa com 3.000 de vida, recebe mais 500 por aparição e se move a 0,65 px por frame.

### Mudança: Torre Besta

**Objetivo:** recompensar a conclusão da Fase 3 com uma arma de alto dano para a Fase 4.
**Alterar:** adicionar a Torre Besta com visual e projétil próprios, desbloqueio global pela conclusão da Fase 3 e três melhorias.
**Não alterar:** progressão sequencial, recompensa por tiro, espaçamento mínimo ou regras de construção, melhoria e venda.
**Aceitação:**
- Antes de concluir a Fase 3, a Torre Besta aparece bloqueada e não pode ser construída.
- Depois de concluir a Fase 3, a Torre Besta permanece disponível em todas as fases atuais e futuras.
- No nível 0, custa 400, causa 55 de dano, alcança 210 px, ataca a cada 1.100 ms e dispara virotes a 10 px por frame.
- As melhorias usam exatamente os valores da tabela e mantêm no máximo o nível 3.
- O mapa e o Álbum usam o mesmo desenho pixelado da Besta em cada nível.

### Mudança: Torre de Esporos

**Objetivo:** recompensar a conclusão da Fase 4 com uma defesa de área que estreia no Bosque do Crepúsculo e permanece útil ao repetir a campanha.
**Alterar:** adicionar a Torre de Esporos com desbloqueio permanente pela conclusão da Fase 4, projétil e nuvem de dano em área próprios e três melhorias.
**Não alterar:** desbloqueio sequencial das fases, inimigos, trajetórias, limite de torres da Fase 5, recompensa de 20 créditos por disparo, espaçamento, melhoria ou venda.
**Aceitação:**
- Antes de concluir a Fase 4, a Torre de Esporos aparece desabilitada com o texto **Conclua Fase 4** e não pode ser construída.
- Ao concluir a Fase 4, a Torre de Esporos é liberada imediatamente junto da Fase 5 e o progresso é salvo.
- Depois do desbloqueio, recarregar a página ou repetir qualquer Fase de 1 a 5 mantém a Torre de Esporos disponível.
- Abandonar ou perder a Fase 4 não desbloqueia a Torre de Esporos.
- No nível 0, custa 475, causa 42 de dano em uma área de 60 px, alcança 185 px, ataca a cada 1.050 ms e dispara orbes a 7,5 px por frame.
- No impacto, todos os inimigos vivos dentro da área recebem o dano uma vez; inimigos fora dela não recebem dano.
- Acertar vários inimigos com o mesmo orbe concede somente os 20 créditos do disparo.
- As três melhorias usam exatamente os valores da tabela, mantêm o nível máximo 3 e atualizam dano, área, alcance, cadência e visual.
- O seletor, o mapa e o Álbum usam o mesmo desenho pixelado de cogumelo em cada nível.

### Mudança: Loja, Fragmentos de Pixel e Isca Blindada

**Objetivo:** permitir comprar uma defesa especial que atraia os ataques de Sabotadores, Macacos e Corujas.
**Alterar:** adicionar uma Loja persistente no lobby, uma moeda de Fragmentos de Pixel e a Isca Blindada como primeiro item, incluindo novos inimigos atiradores futuros em sua prioridade.
**Não alterar:** desbloqueio sequencial das fases e torres existentes, limites gerais por fase, trajetórias, economia de tiros ou atributos dos inimigos.
**Aceitação:**
- Um jogador sem dados salvos começa com 0 Fragmentos de Pixel.
- A Loja mostra todas as defesas e melhorias permanentes atuais com desenhos pixelados, preços e o saldo disponível.
- A Loja é dividida nas abas **Torres**, **Minas** e **Melhorias**; estruturas que ocupam vaga de torre aparecem somente em **Torres**.
- A aba **Minas** contém Mina Terrestre, Mina Congelante e Bomba Pesada; a aba **Melhorias** contém os três aprimoramentos permanentes atuais.
- Trocar de aba não altera o saldo, as compras salvas nem a categoria dos itens.
- Comprar a Isca desconta 30 Fragmentos uma única vez, salva a compra localmente e libera seu botão em todas as fases, inclusive após recarregar a página.
- Com saldo entre 0 e 29, o botão de compra permanece desabilitado e a validação da função também impede liberar a Isca ou produzir saldo negativo.
- Os registros da Loja usam a versão 2 da chave local; registros da primeira versão, criada antes da validação reforçada, são ignorados sem alterar o saldo de Fragmentos.
- O saldo de Fragmentos usa a versão 2 da chave local e começa em 0; o saldo da versão anterior é ignorado.
- Sem a compra, o botão permanece desabilitado com o texto **Compre na Loja** e nenhuma tentativa desconta créditos.
- Na partida, a Isca custa 200 créditos, não atira, não gera créditos por tiro, não possui alcance, modo de alvo ou melhorias e pode ser vendida pelas regras normais.
- Podem existir no máximo 2 Iscas por partida, e ambas contam no limite geral da fase.
- Sabotadores dentro de 180 px, Macacos dentro de 165 px e Corujas dentro de 190 px priorizam qualquer Isca no próprio alcance mesmo quando outra torre está mais próxima.
- Sabotadores, Macacos e Corujas consomem 1 dos 10 pontos de resistência a cada impacto; o décimo destrói a Isca sem devolver créditos.
- Na ausência de Isca dentro do alcance, Sabotadores, Macacos e Corujas mantêm seu comportamento anterior.
- Na campanha normal, a wave 1 não concede Fragmentos. Da wave 2 em diante, a recompensa é igual à wave alcançada: wave 2 concede 2, wave 3 concede 3, wave 14 concede 14 e vencer a wave 20 concede 20.
- Reiniciar não concede Fragmentos. Confirmar **Desistir** ou sofrer derrota concede a recompensa calculada; fechar a página sem confirmar não concede.
- No modo infinito, desistência ou derrota concede 1 Fragmento a cada 2 waves, ignorando a wave ímpar sem par completo.

### Mudança: Amplificador Pixel

**Objetivo:** adicionar uma torre de suporte que fortaleça posições planejadas sem substituir as torres de combate.
**Alterar:** adicionar o Amplificador Pixel como compra permanente da Loja por 45 Fragmentos e construção de 300 créditos.
**Não alterar:** dano, alcance e cadência base das torres existentes, limites gerais por fase, economia por disparo ou desbloqueios da campanha.
**Aceitação:**
- Sem a compra, o botão do Amplificador permanece desabilitado e mostra **Compre na Loja**.
- Depois da compra, o Amplificador fica disponível em todas as fases e continua liberado após atualizar a página.
- Cada Amplificador custa 300 créditos, não atira, não gera créditos, não possui melhorias nem modo de alvo e conta no limite geral da fase.
- Pode existir no máximo 1 Amplificador por partida.
- Torres de combate a até 135 px do Amplificador têm seu intervalo de ataque reduzido em 15%.
- A Isca Blindada, o próprio Amplificador e outras estruturas sem ataque não recebem o bônus.
- Sobreposição de auras nunca acumula o bônus; somente o maior bônus de suporte aplicável é usado.
- Lentidão do Macaco, bônus pós-Boss e boost do fliperama combinam multiplicativamente com o Amplificador.
- Vender ou perder o Amplificador remove imediatamente o bônus das torres que estavam em sua aura.
- O mapa, o seletor, a Loja e o Álbum usam o mesmo desenho pixelado de antena e exibem o alcance de suporte.

### Mudança: Gerador de Créditos

**Objetivo:** oferecer uma defesa econômica de risco e retorno que ocupe espaço no exército sem atacar.
**Alterar:** adicionar o **Gerador de Créditos** à aba **Torres** da Loja, ao seletor da partida e ao Álbum depois da compra permanente.
**Não alterar:** recompensa por disparo, créditos iniciais, preços ou atributos das outras defesas, limites-base das fases, progressão, composição das waves ou recompensas de Fragmentos.
**Aceitação:**
- O Gerador custa 70 Fragmentos na Loja e 300 créditos durante a partida, ocupa uma vaga de torre e permite no máximo 1 unidade por partida.
- O Gerador não atira, não possui modo de alvo, não recebe bônus de cadência e não produz a recompensa normal reservada aos disparos.
- O nível 0 produz 100 créditos por wave concluída; as melhorias custam respectivamente 350, 500 e 700 créditos e elevam a produção para 150, 225 e 325 créditos.
- Um Gerador construído durante a wave atual só fica elegível depois de sobreviver à wave seguinte inteira. Construir na wave 4, por exemplo, permite o primeiro pagamento ao concluir a wave 5.
- Cada wave elegível paga exatamente uma vez. Vender ou perder o Gerador antes da conclusão remove o pagamento daquela wave.
- A produção funciona nas fases normais, na Dimensão Glitch e em Waves infinitas, antes do início da wave seguinte.
- Ao pagar, o mapa mostra `+N créditos` acima do Gerador e o HUD atualiza o saldo imediatamente.
- Loja, seleção de equipe, seletor da partida e Álbum explicam produção, custo, limite e melhorias sem apresentar dano ou alcance inexistentes.
- Loja, seletor, mapa e Álbum reutilizam o mesmo desenho pixelado de máquina/cofre verde e dourada, com evolução visual nos quatro níveis.
- O nome, atributos, avisos e descrições ficam disponíveis em português, inglês e espanhol.

### Mudança: categorias da Loja

**Objetivo:** organizar o catálogo para receber novos tipos de item sem misturar torres, explosivos e aprimoramentos.
**Alterar:** dividir a Loja nas abas **Torres**, **Minas** e **Melhorias**, mantendo o catálogo atual na primeira aba.
**Não alterar:** preços, saldo, persistência das compras, desbloqueios, atributos das torres e recompensas de Fragmentos.
**Aceitação:**
- Ao abrir a Loja, a aba **Torres** começa selecionada e mostra Isca Blindada, Amplificador Pixel, Gerador de Créditos, Torre de Raios e Lança-Chamas.
- Cada aba informa quantos itens possui; uma categoria vazia mostra **Em breve**.
- A aba **Torres** usa uma torre com canhão em pixel art, e a aba **Minas** usa uma bomba com pavio aceso em pixel art; os mesmos desenhos aparecem nos painéis vazios dessas categorias.
- **Minas** mostra a Mina Terrestre e a Bomba Pesada disponíveis para compra, enquanto **Melhorias** antecipa aprimoramentos permanentes sem permitir compras ainda.
- Ao selecionar outra aba, apenas o conteúdo do catálogo é trocado; o saldo permanece visível e inalterado.
- Em telas estreitas, as três abas continuam acessíveis na mesma linha com rótulos legíveis.

### Mudança: melhorias permanentes da Loja

**Objetivo:** preencher a categoria **Melhorias** com progressão permanente que complemente as defesas compráveis.
**Alterar:** adicionar **Reserva de Créditos**, **Licença de Construção** e **Recompensa Otimizada** ao catálogo persistente.
**Não alterar:** preços ou atributos das quatro defesas existentes, recompensas de Fragmentos, composição das waves, desbloqueio das fases ou valores-base sem as compras.
**Aceitação:**
- A aba **Melhorias** mostra exatamente três itens, com miniaturas pixeladas, descrição, preço e estado de compra.
- **Reserva de Créditos** custa 30 Fragmentos e faz toda nova partida começar com 200 créditos em vez de 150.
- **Licença de Construção** custa 45 Fragmentos e eleva os limites das Fases 1 a 7 para 11, 13, 13, 15, 16, 16 e 16 torres.
- **Recompensa Otimizada** custa 55 Fragmentos e aumenta de 20 para 22 os créditos concedidos por disparo das torres de combate.
- As três compras são permanentes, não podem ser compradas novamente e continuam ativas depois de atualizar a página.
- O saldo, os créditos iniciais e o limite exibidos no lobby são atualizados imediatamente após a compra correspondente.

### Mudança: Torre de Raios e Mina Congelante

**Objetivo:** ampliar as opções compráveis da Loja com uma torre de múltiplos alvos e uma mina de controle de grupo.
**Alterar:** adicionar a **Torre de Raios** à aba **Torres** e a **Mina Congelante** à aba **Minas**, ambas com compra permanente.
**Não alterar:** preços e atributos dos itens anteriores, limite-base das fases, progressão da campanha, trajetórias ou composição das waves.
**Aceitação:**
- A Torre de Raios custa 60 Fragmentos na Loja e 425 créditos na partida, ocupa uma vaga de torre e permite no máximo 2 unidades por partida.
- Cada disparo da Torre de Raios causa 30 de dano no primeiro alvo e pode saltar para mais 2 inimigos a até 110 px, mantendo 70% do dano a cada salto.
- Um disparo encadeado concede a recompensa de créditos somente uma vez, independentemente da quantidade de inimigos atingidos.
- A Mina Congelante custa 35 Fragmentos na Loja e 125 créditos na partida, deve ser armada sobre o caminho e permite no máximo 4 unidades no mapa.
- A explosão congelante causa 55 de dano em 85 px, aplica 50% de lentidão durante 2.500 ms e congela inimigos comuns durante 800 ms; chefes recebem apenas a lentidão.
- As duas defesas permanecem compradas após atualizar a página, aparecem no seletor e no Álbum e possuem desenhos pixelados próprios.

### Mudança: Lança-Chamas

**Objetivo:** adicionar uma torre comprável de ataque rápido que continue causando dano depois do impacto.
**Alterar:** adicionar o **Lança-Chamas** à aba **Torres** da Loja, ao seletor da partida e ao Álbum depois da compra permanente.
**Não alterar:** preços e atributos das defesas anteriores, limite-base das fases, progressão da campanha, trajetórias, composição das waves ou recompensa por disparo.
**Aceitação:**
- O Lança-Chamas custa 100 Fragmentos na Loja, 650 créditos na partida, ocupa uma vaga de torre e permite no máximo 2 unidades por partida.
- Seu ataque base causa 10 de dano direto, possui 145 px de alcance, dispara bolas de fogo a cada 333 ms e viaja a 9 px por quadro.
- A cadência de 333 ms é aproximadamente 1,5 vez a cadência da Torre padrão de nível 0, cujo intervalo é de 500 ms.
- Cada impacto em um inimigo vivo aplica uma queimadura de 5 de dano a cada 1.000 ms durante 10.000 ms, totalizando até 50 de dano adicional.
- A queimadura não acumula. Um novo impacto antes do término mantém o dano em 5 por intervalo e renova a duração para mais 10.000 ms sem adiar o próximo pulso já programado.
- A queimadura pode eliminar inimigos e respeita as regras especiais de dano dos Bosses.
- Pausar a partida também pausa a duração e os pulsos da queimadura.
- Cada bola de fogo disparada concede a recompensa normal de créditos uma única vez; os pulsos de queimadura não concedem créditos adicionais.
- Loja, seletor, mapa e Álbum usam o mesmo visual pixelado com detalhes laranja, tanque de combustível acoplado e projétil de fogo próprio.
- O nome e as descrições do Lança-Chamas ficam disponíveis em português, inglês e espanhol.

### Mudança: Mina Terrestre

**Objetivo:** adicionar uma defesa consumível de área que recompense o posicionamento no caminho.
**Alterar:** adicionar a Mina Terrestre como compra permanente da Loja por 25 Fragmentos e armamento de 100 créditos durante a partida.
**Não alterar:** limite de torres de cada fase, dano e cadência das torres, recompensas por tiro, trajetórias, composição das waves ou progressão da campanha.
**Aceitação:**
- Sem a compra, o botão da Mina permanece desabilitado e mostra **Compre na Loja**.
- Depois da compra, a Mina fica disponível em todas as fases e continua liberada após atualizar a página.
- A Mina só pode ser armada sobre o caminho dos inimigos; ao clicar na largura do caminho, ela se encaixa no centro do trecho mais próximo. Tentar colocá-la fora dele não desconta créditos.
- Cada Mina custa 100 créditos, causa exatamente 100 de dano aos inimigos cujos centros estejam a até 75 px da explosão e desaparece depois de explodir.
- A explosão só é disparada quando o corpo de um inimigo toca o corpo da Mina, usando o raio físico de 18 px da Mina somado ao tamanho do inimigo; apenas entrar na área de 75 px não dispara a armadilha.
- Podem existir no máximo 5 Minas armadas ao mesmo tempo. Minas precisam manter 40 px de distância entre si, e uma explosão libera imediatamente uma vaga.
- Minas não contam no limite de torres da fase, não bloqueiam a construção de torres próximas e não podem ser selecionadas, melhoradas, vendidas, atacadas ou fortalecidas por bônus.
- Dano de Mina não concede os 20 créditos reservados aos disparos das torres.
- Loja, seletor de defesas, mapa e Álbum usam a mesma aparência pixelada da Mina; a explosão também é desenhada com blocos.

### Mudança: Bomba Pesada

**Objetivo:** oferecer um explosivo manual de maior impacto, diferente da Mina ativada por contato.
**Alterar:** adicionar a Bomba Pesada como compra permanente da Loja por 40 Fragmentos e posicionamento de 200 créditos durante a partida.
**Não alterar:** contato automático da Mina Terrestre, limite de torres de cada fase, recompensas por tiro, trajetórias, composição das waves ou progressão da campanha.
**Aceitação:**
- Sem a compra, o botão da Bomba permanece desabilitado e mostra **Compre na Loja**; depois da compra, ela fica disponível permanentemente em todas as fases.
- A Bomba só pode ser posicionada fora do caminho, custa 200 créditos e não ocupa vaga no limite de torres.
- Podem existir no máximo 3 Bombas Pesadas no mapa. Elas mantêm 50 px de distância entre si e respeitam o espaçamento das torres para continuar clicáveis.
- A Bomba nunca explode por contato. O primeiro clique nela acende um pavio de 1,5 segundo, que não pode ser cancelado; cliques seguintes apenas informam o tempo restante.
- Ao terminar o pavio, a Bomba desaparece e causa exatamente 200 de dano aos inimigos cujos centros estejam a até 100 px da explosão.
- Pausar a partida congela o pavio. Reiniciar ou abandonar a fase remove todas as Bombas e explosões pendentes.
- Bombas não podem ser melhoradas, vendidas, atacadas ou fortalecidas por bônus, e seu dano não concede créditos.
- Loja, seletor, mapa e Álbum usam o mesmo desenho pixelado da Bomba, com pavio piscante durante a contagem.

## Venda de torre

- Clique em uma torre para selecioná-la e use o botão **Vender torre**.
- A venda devolve 60% do valor total investido na torre, incluindo o custo específico do tipo e suas melhorias, equivalente a 40% de desconto.

### Mudança: simulação independente da taxa de atualização

**Objetivo:** manter a mesma dificuldade em monitores de 60 Hz, 120 Hz, 144 Hz ou outras taxas de atualização.
**Alterar:** calcular movimento e duração de efeitos visuais pelo tempo decorrido entre quadros, usando 60 quadros por segundo como referência e limitando cada avanço a no máximo 50 ms.
**Não alterar:** velocidades configuradas, trajetórias, vida, dano, alcance, cadência, composição das waves, economia ou condições de vitória e derrota.
**Aceitação:**
- Os valores existentes em pixels por frame continuam representando a velocidade observada a 60 quadros por segundo.
- Inimigos e projéteis percorrem aproximadamente a mesma distância por segundo em telas de 60 Hz, 120 Hz e 144 Hz.
- Explosões permanecem visíveis pela mesma duração aproximada independentemente da taxa do monitor.
- Um travamento ou atraso maior que 50 ms não provoca um salto descontrolado da simulação.
- Iniciar, reiniciar ou retomar uma partida reinicia a referência de tempo sem mover unidades instantaneamente.

### Mudança: pausa automática ao ocultar a página

**Objetivo:** impedir que o jogador perca tempo de reação, pavios ou boosts ao trocar de aba ou minimizar o navegador.
**Alterar:** pausar automaticamente uma partida ativa quando a página ficar oculta e abrir o menu de pausa para que o jogador escolha quando continuar.
**Não alterar:** pausa manual, música, progresso, recompensas, posições, atributos ou comportamento do lobby e das telas de resultado.
**Aceitação:**
- Ao ocultar a página durante uma batalha ativa, inimigos, projéteis, waves, pavios, avisos e efeitos temporários ficam congelados.
- Ao retornar, o menu **Jogo pausado** permanece aberto e a partida só continua quando o jogador o fechar.
- Se a página for ocultada durante um minigame do fliperama, o tempo oculto não é descontado dos 15 segundos disponíveis.
- Tutoriais, configurações, escolhas pós-Boss e confirmações que já estavam pausadas permanecem no próprio estado sem abrir uma segunda camada.
- Ocultar a página no lobby ou em uma tela de resultado não inicia nem modifica uma partida.

### Mudança: controles de toque do Labirinto Pixel

**Objetivo:** permitir concluir o Labirinto Pixel em celulares e tablets sem teclado físico.
**Alterar:** exibir um direcional de quatro botões durante o Labirinto Pixel em telas de até 760 px ou dispositivos com ponteiro de toque.
**Não alterar:** controles WASD e setas, velocidade do robô, mapas, paredes, duração, colisões ou recompensa do minigame.
**Aceitação:**
- Os botões **cima**, **esquerda**, **baixo** e **direita** aparecem somente quando o Labirinto Pixel está ativo em uma tela estreita ou dispositivo de toque.
- Manter um botão pressionado move o robô continuamente na direção correspondente; soltar ou cancelar o toque interrompe essa direção.
- Dois botões podem ser pressionados ao mesmo tempo para movimento diagonal, com a mesma normalização usada pelo teclado.
- Os botões possuem nomes acessíveis e acompanham o idioma selecionado.
- No Tiro ao alvo, o direcional permanece oculto.

### Mudança: partida compacta em celulares pequenos

- Revisão de toque: lobby quebra a linha de botões extras; seleção de defesas usa equipe antes do catálogo, cabeçalho não fixo e altura dinâmica do navegador, permitindo alcançar Começar partida também na horizontal. Em celulares horizontais, reduzir margens e manter seletor lateral e ações compactas com alvos de 44 px.
- **Ampliar mapa** amplia somente o canvas para pelo menos 720 px em dispositivos de toque/telas estreitas. O jogador arrasta para percorrer o tabuleiro e usa **Ver mapa inteiro** para restaurar a visão; não modifica coordenadas internas, custos, alcance ou tamanho real das torres. Zoom de acessibilidade do navegador permanece permitido.
**Objetivo:** preservar uma área útil do mapa e manter os controles legíveis em telas de até 480 px.
**Alterar:** empilhar mapa e seletor de defesas; transformar o seletor em uma lista horizontal rolável e aumentar os menores rótulos da partida.
**Não alterar:** tamanho interno de 1.200 × 700 px do mapa, posições do caminho, áreas de clique, quantidade de defesas, ordem dos botões ou layout do lobby.
**Aceitação:**
- Em telas de até 480 px, o seletor de defesas deixa de consumir uma coluna ao lado do mapa e aparece abaixo dele.
- O mapa usa toda a largura disponível antes do seletor horizontal.
- O quadro de boosts permanece removido também em telas pequenas.
- Todos os tipos de defesa continuam acessíveis por rolagem horizontal e mantêm alvos de toque com pelo menos 54 px de altura.
- Textos essenciais do seletor e das ações permanecem legíveis sem modificar o layout de telas maiores.

### Mudança: carta misteriosa após a Fase 6

**Objetivo:** impedir que o jogador termine o Capítulo 1 sem perceber que o portal escondido é o próximo passo da campanha.
**Alterar:** antes do resultado da primeira vitória na Fase 6, mostrar uma cutscene em que o jogador encontra uma carta no chão.
**Não alterar:** recompensa da Fase 6, maior fase concluída, posição do portal, identidade secreta do remetente, acesso à Dimensão Glitch ou desbloqueio do Capítulo 2.
**Aceitação:**
- A cutscene aparece somente se a Fase 6 foi concluída, a carta ainda não foi vista e o portal ainda não foi descoberto.
- A apresentação mostra um chão escuro, uma carta pixelada sendo erguida, um selo com **?** e o título **VOCÊ ENCONTROU UMA CARTA**.
- O texto da carta é **Você está pronto. Algo estará lhe esperando no lobby da Fase 1, entre as árvores. Venha ver meu desafio.**
- A assinatura exibe somente **???**, sem nome, retrato ou referência direta ao Senhor do Tempo.
- A cutscene não pode ser fechada com Escape e permanece aberta até o jogador escolher **Guardar carta**.
- A visualização é salva separadamente no navegador para não repetir a carta em novas vitórias na Fase 6; nenhum outro dado de progresso é apagado ou substituído.
- Depois de guardar a carta, a tela normal de vitória aparece. A Fase 7 e o Capítulo 2 continuam bloqueados até a vitória na Dimensão Glitch e o resultado não afirma que a Fase 7 foi liberada.
- Texto, botão e título são traduzidos para português, inglês e espanhol, e a carta permanece inteira em telas pequenas.

### Mudança: fase secreta Dimensão Glitch

**Objetivo:** transformar a fase escondida no desafio narrativo que encerra o Capítulo 1 e abre o Capítulo 2.
**Alterar:** manter um portal corrompido aceso e parcialmente coberto pela primeira árvore do lobby da Fase 1; depois da Fase 6, clicar nele corrompe toda a tela e normalmente teleporta o jogador para a **Dimensão Glitch**, mas possui 10% de chance de desviá-lo antes para os **Corredores Amarelos**. A chegada à fase revela o **Senhor do Tempo**. A primeira vitória inicia uma conversa final e uma cutscene que libera o Capítulo 2.
**Não alterar:** maior fase concluída, atributos das torres, preços, recompensas por disparo, intervalo de Boss ou quantidade padrão de 20 waves.
**Aceitação:**
- O portal existe somente no cenário de lobby da Fase 1, fica visualmente atrás da primeira árvore e permanece aceso com brilho preto, roxo e ciano.
- Antes da conclusão da Fase 6, o portal permanece visível e aceso, mas selado. Ao clicar, abre uma conversa curta da entidade do portal com **Ainda não...** e 3 opções de resposta (**Como assim?**, **O quê?**, **Quem é você?**). Cada opção recebe uma resposta própria; a conversa não inicia teleporte e fecha somente pelo botão **Encerrar conversa**.
- O clique no portal bloqueado deve abrir essa conversa mesmo quando o conteúdo do lobby já foi fechado ou atualizado; a camada da conversa é limpa antes de ser preenchida novamente, sem lançar erro de função inexistente.
- A conversa bloqueada usa o retrato pixelado do portal, mantém **???** como nome da entidade e exibe acentos corretamente em **Ainda não...**, **O quê?** e **Quem é você?**; **Como assim?** recebe **Volte quando você estiver pronto.**, **O quê?** recebe **Ainda não...** e **Quem é você?** recebe **...**. Só o botão **Encerrar conversa** fecha a conversa, sem iniciar o teleporte.
- Depois da conclusão da Fase 6, clicar no portal registra imediatamente a descoberta em armazenamento local e impede cliques repetidos durante o teleporte.
- Com a fase concluída, o portal é a única entrada e inicia diretamente uma transição de 1.600 ms.
- Durante a transição, toda a interface sofre deslocamentos, inversões de cor, separação dos canais ciano e magenta, cortes horizontais e uma camada de ruído com as mensagens **SINAL CORROMPIDO** e **A realidade está falhando...**.
- A música do lobby para, começa a composição procedural assustadora e corrompida do portal e toca um efeito sintetizado exclusivo com quatro notas quebradas e ruído filtrado.
- A faixa usada na transição continua sendo a composição procedural assustadora e corrompida exclusiva desse diálogo de chegada, com passos de 540 ms e ganho relativo de 185%.
- A música da conversa usa oito notas graves entre 92,5 e 155,56 Hz, dois baixos em 58,27 e 65,41 Hz, intervalos dissonantes e ruído filtrado; essa faixa preserva o clima grave sem desaparecer nos alto-falantes de celulares e notebooks. Sua melodia, ritmo e síntese são diferentes da música da Dimensão Glitch.
- Ao terminar a transição, cada entrada no portal realiza um novo sorteio independente: resultados de `0` até menos de `0,1` abrem os Corredores Amarelos e os demais 90% seguem diretamente para a fase secreta.
- Os Corredores Amarelos são um labirinto pixelado amarelo em tela inteira, sem cronômetro, derrota, recompensa ou progresso salvo; o jogador começa no canto inferior esquerdo e procura a saída verde no canto superior direito.
- O labirinto possui cinco paredes verticais alternadas, velocidade de movimento de 190 pixels por segundo e controles por WASD, setas do teclado ou direcional de toque em telas pequenas.
- Colidir com uma parede apenas bloqueia aquele movimento, sem reiniciar o percurso. Escape não fecha o labirinto nem abre telas do lobby.
- Ao alcançar a saída, o labirinto desaparece e o fluxo continua obrigatoriamente para a Dimensão Glitch; o desvio não altera a equipe, os créditos, as waves, as recompensas, a descoberta do portal ou qualquer dado da conta.
- Quando o sorteio não abre o labirinto, ou depois que sua saída é alcançada, o jogo seleciona o número interno 99, abre o mapa da Dimensão Glitch e mantém a simulação pausada antes que qualquer inimigo avance.
- Título, instruções, acessibilidade e textos desenhados no labirinto acompanham português, inglês e espanhol; a interface e o direcional permanecem inteiros em telas estreitas.
- O tutorial comum da primeira partida não aparece quando a entrada ocorre pelo portal.
- Sobre o mapa surge o mesmo balão largo e baixo da conversa anterior, com o retrato pixelado misterioso do Senhor do Tempo: corpo geométrico escuro com falhas ciano e magenta, cuja cabeça é um relógio animado.
- A primeira fala do personagem é **Era eu quem falava com você através do portal.**; a segunda é **Meu nome é Senhor do Tempo.**, momento em que o nome substitui **???** no balão.
- As falas seguintes são, em ordem: **Você não tem escolha.**, **Se quiser sair, vai ter que sair vitorioso daqui.**, **Supere as 20 waves e eu abrirei o caminho de volta.**, **Serei generoso com você. Afinal, poucas pessoas chegam até aqui. Darei 300 créditos a mais para você começar. Mas depois disso você pensa que acabou? Ainda não.** e **Agora lute. O tempo já começou a correr.**
- A generosidade anunciada é real: toda tentativa na Dimensão Glitch começa com **300 créditos adicionais**, somados aos créditos iniciais normais e às melhorias permanentes da Loja, sem alterar o dinheiro inicial das demais fases.
- Um único botão **Continuar** avança as falas; na última, ele muda para **Enfrentar a Dimensão**. A conversa não pode ser fechada clicando fora nem usando Escape.
- Somente após a última fala a camada desaparece e a simulação é retomada.
- Na Dimensão Glitch, o comando **Desistir** vira **Saída bloqueada** e fica desabilitado. Depois de uma derrota, o botão de voltar ao menu não aparece; o jogador pode apenas recomeçar a fase.
- Ao vencer as 20 waves pela primeira vez, o painel comum de resultado aguarda a conversa final com o Senhor do Tempo e a cutscene de desbloqueio; em vitórias posteriores, o resultado aparece diretamente.
- A Dimensão Glitch nunca é adicionada a `CONFIG.fases` nem aos cartões da tela **Fases**. Ela usa o número interno 99 apenas para carregar seu mapa e seu limite, sem colidir com as Fases 1 a 18 reservadas pelos capítulos.
- A fase secreta possui 20 waves, limite-base de 12 torres e Boss nas waves 5, 10, 15 e 20.
- Cada wave possui `3 + wave` Pixels Corrompidos. O Erro Veloz aparece na wave 3 e ganha uma unidade a cada 2 waves; o Bloco Instável aparece na wave 5 e ganha uma unidade a cada 4 waves.
- O Pixel Corrompido possui 190 de vida, velocidade 1,55 e tamanho 22; seu desenho usa os quatro blocos preto/roxo e as partes ausentes da referência criada pelo jogador, com pequenos pixels ciano para contraste.
- O Erro Veloz possui 280 de vida, velocidade 2,45 e tamanho 20. O Bloco Instável possui 780 de vida, velocidade 0,78 e tamanho 33.
- O Núcleo Glitch possui 2.600 de vida na primeira aparição, ganha 450 de vida por aparição, tem velocidade 0,9 e tamanho 48.
- O mapa usa terreno escuro, falhas roxas e ciano e uma trajetória própria. Esses inimigos aparecem no Álbum somente depois que o portal é atravessado pela primeira vez.
- Concluir a fase concede os Fragmentos normais pelas waves e conta para missões e conquistas de partidas concluídas. A vitória não aumenta a maior fase da campanha, mas sua primeira conclusão salva permanentemente a liberação do Capítulo 2.
- A conversa final alterna falas do Senhor do Tempo e do jogador: **Parabéns. Você conseguiu.**, **Poucas pessoas passam por este desafio.**, **Então eu estou livre?**, **Livre para continuar. Mas sua jornada está longe de terminar.**, **O que você quer dizer?**, **Eu abri um novo caminho. O Capítulo 2 espera por você.** e **Considere isso uma recompensa... e um aviso. Ainda não acabou.**
- O último botão da conversa mostra **Revelar Capítulo 2** e abre uma cutscene em tela inteira com um cadeado se rompendo, o selo **II**, **CAPÍTULO 2**, **Fases 7 a 12** e **NOVO CAPÍTULO DESBLOQUEADO**.
- A cutscene permanece aberta até o jogador escolher **Continuar**; depois disso, a tela de vitória normal aparece com as opções de repetir a fase ou voltar ao menu.
- A primeira vitória na Dimensão Glitch desbloqueia a conquista especial **???**, com a descrição **Ainda está te esperando, sempre vai estar.**
- Ao voltar ao lobby depois de jogar a fase secreta, a seleção retorna à Fase 1 e o portal continua sendo a única entrada.
- Ao entrar na Dimensão Glitch, todas as outras trilhas são encerradas e começa sua música procedural exclusiva, em passos de 310 ms e com ganho relativo de 175%.
- A trilha usa 16 notas, quatro baixos graves, desafinação controlada, ruídos curtos e três repetições digitais nos passos 8 e 16 de cada ciclo.
- Silenciar, reativar ou ajustar o volume da música afeta a trilha secreta imediatamente; ao voltar ao lobby, ela é encerrada antes da música do lobby.
- Se Web Audio não estiver disponível, a fase secreta usa `background_music.mp3` como alternativa.

### Conceito futuro: forma humana do Senhor do Tempo

**Objetivo:** preservar para uma atualização futura o retrato humano aprovado, sem exibi-lo na versão atual.
**Alterar:** manter o conceito guardado em `CONFIG.faseSecreta.senhorDoTempo.formaHumanaFutura`, inicialmente com `ativa: false`.
**Não alterar:** conversa atual do portal, conteúdo atual do Álbum, inimigos, progressão, falas ou balanceamento da Dimensão Glitch.
**Aceitação:**
- Enquanto `ativa` for `false`, a forma humana não aparece no balão e não cria figurinha, nome, descrição ou espaço adicional na página **Inimigos** do Álbum.
- O balão atual volta a usar o corpo geométrico escuro com detalhes ciano e magenta e mantém a cabeça de relógio animada.
- O conceito futuro preserva corpo humano alto de meio-corpo, cabeça proporcionalmente menor, torso comprido, ombros largos, terno escuro, camisa clara, gravata vermelha, braços grossos proporcionais ao torso, um braço relaxado e o outro em um bolso baixo do paletó próximo à cintura.
- O desenho pixelado, as cores, o cartão futuro e os estilos ficam guardados no código; uma atualização posterior pode ativá-los alterando somente a opção `ativa` para `true`.

### Validação automatizada no navegador

- A suíte de ponta a ponta abre o jogo em um servidor local e usa um navegador real.
- Os cenários cobrem iniciar uma partida, construir e selecionar uma torre e abrir a pausa; salvar e restaurar áudio e iluminação; cancelar e confirmar uma compra da Loja; e mostrar avisos de missão e conquista.
- Cada cenário começa com armazenamento local controlado para não depender do progresso manual de outra execução.
- Os testes de estrutura existentes continuam sendo executados separadamente para detectar regressões rápidas em regras e conteúdo.

## Critérios de aceitação

### Mudança: Fase 15 — Arquivo Proibido

**Objetivo:** continuar a investigação da Fase 14 com uma pista de Lina Varela sobre os camuflados.
**Alterar:** adicionar a Fase 15 ao Capítulo 3, liberada após vencer a 14 e com o capítulo desbloqueado.
**Não alterar:** desenhos dos inimigos, atributos das defesas, recompensas e cenas das fases anteriores.
**Aceitação:**
- A fase usa 20 waves, 15 vagas de torre (16 com a Licença) e um trajeto próprio entre estantes pixeladas de arquivos. Usa a paleta do laboratório e a trilha própria **Páginas sob Suspeita**.
- O elenco é exclusivo: Rasuradores (`3 + wave`), Censores Velados (wave 2, +1 a cada 4) e Sentinelas de Índice (wave 5, +1 a cada 4), substituindo todos os inimigos reaproveitados. Intercalar os tipos na fila; o Boss chega por último. Vale também no modo infinito. Editor e fases anteriores preservam seus elencos.
- **Rasurador:** 280 de vida, velocidade 1,5, tamanho 23; carrega páginas rasuradas, sem habilidade adicional.
- **Censor Velado:** 480 de vida, velocidade 1,15, tamanho 27, camuflado. Usa as regras existentes de detecção da Torre de Varredura, inclusive contra ataques em área. Substitui o Infiltrador nesta fase; o Infiltrador original continua na 14.
- **Sentinela de Índice:** 900 de vida, velocidade 0,8, tamanho 33; capas blindadas reduzem o dano em 25%, respeitando ataques que ignoram reduções.
- **Bibliotecário Mudo:** Boss nas waves 5, 10, 15 e 20 com 6.200, 6.950, 7.700 e 8.450 de vida, velocidade 0,65 e tamanho 64. Aos 65% e 30% da vida, ainda vivo, convoca dois Censores Velados na própria posição e segmento do caminho, uma vez por limiar. O Boss não é camuflado. Golpe letal não convoca. Não há câmaras de contenção nem terminal interativo da Fase 10 nesta fase.
- Sprites próprios de 12 × 12 para os quatro: portador de páginas, censor encapuzado, sentinela entre capas e bibliotecário com livro aberto. Nomes, habilidades e avisos em português, inglês e espanhol; figurinhas e fichas no Álbum após derrotar cada tipo. Reforços também precisam ser derrotados para completar a wave e seguem as recompensas existentes.
- A seleção inclui a Torre de Varredura obrigatoriamente na campanha, respeitando as seis vagas, como na Fase 14.
- Antes do primeiro inimigo avançar, três telas apresentam a descoberta do registro, a frase **Os inimigos camuflados já existiam antes. Alguém está apagando os registros.**, assinada por **Dra. Lina Varela**, e a dúvida do defensor sobre a afirmação do Senhor do Tempo.
- Após vencer, o jogador preserva uma cópia e o Senhor do Tempo diz **Você veio defender sua torre. Não investigar o passado.** O botão **Ver resultado** abre o resultado já calculado, sem duplicar XP, recompensas ou conclusão.
- As cenas podem ser relidas em novas tentativas da campanha; não aparecem em mapas do editor ou no modo infinito. A entrada pausa a simulação e o último botão a retoma. Escape não pula as cenas.
- A vitória salva a Fase 15 normalmente e libera a Fase 16. Os textos têm versões em português, inglês e espanhol.

### Mudança: Fase 16 — Câmara das Memórias

- Após a transmissão final, exibir **TORRE DESBLOQUEADA**, apresentar a **Torre de Feixe Contínuo**, e o defensor dizer: “Acho que esta é a última defesa que vou encontrar nesta jornada.”. A torre é liberada permanentemente pela vitória da Fase 16, incluindo saves que já a venceram; repetir a cena não concede moedas extras.
- Feixe Contínuo: custo 400, alcance 230, pulsos a cada 500 ms, dano 5 × sequência de 1 a 10 (5, 10, 15… 50). Manter laser visível e o mesmo alvo enquanto vivo, detectável e no alcance; perda do alvo ou atordoamento/estase zera a sequência. Pausa não acumula pulsos. Não cria projéteis; aplica as reduções e bônus normais de dano e concede a recompensa normal por ataque apenas por pulso, nunca por quadro. Prioridade escolhe o próximo alvo sem interromper o foco atual. Não detecta camuflados por conta própria.
- Melhorias do Feixe (custo/dano inicial/alcance): 350/7/250, 550/9/270, 800/12/290. Intervalo de 500 ms e limite de 10 pulsos mantidos; bônus normais de dano/cadência continuam aplicáveis.
- **Torre de Longo Alcance** é recompensa exclusiva do nível de experiência 12 (7.700 XP acumulados), disponível também para jogadores já acima dele, não vendida na Loja. Custo de construção 250, dano 6, alcance 1.100, intervalo 1.200 ms e projétil com velocidade 24. Melhorias (custo/dano/alcance/intervalo): 250/9/1.150/1.150 ms, 400/12/1.200/1.100 ms, 600/16/1.250/1.000 ms. Não detecta camuflados sozinha.
- Ambas entram na seleção normal de até seis defesas, construção, melhorias, venda e Álbum de níveis 0–3. Usam desenhos pixelados próprios: emissor de duas hastes com núcleo luminoso e canhão longo com mira. Preservar demais torres e recompensas.
- Liberada após vencer a Fase 15 e desbloquear o Capítulo 3. Possui 20 waves, 15 vagas de torre (16 com Licença), caminho próprio, arquivos suspensos e relógios quebrados pixelados. Preserva a paleta e a música de Ponto Zero, sem seus registros interativos ou setores oscilantes; inimigos e Boss agora são exclusivos.
- Elenco: Fragmentos Mnésicos (`3 + wave`), Lembranças Blindadas (wave 3, +1 a cada 4) e Ecos da Memória (wave 5, +1 a cada 5). Intercalar os tipos e colocar o Boss no fim da fila, também no infinito. Editor e fases anteriores preservados.
- **Fragmento Mnésico:** 320 de vida, velocidade 1,6, tamanho 22; cristal de memória sem habilidade adicional.
- **Lembrança Blindada:** 1.050 de vida, velocidade 0,75, tamanho 34; redução de dano de 25%, integrada às regras normais de dano.
- **Eco da Memória:** 650 de vida, velocidade 1,25, tamanho 28. Na primeira eliminação, recompõe-se com 35% da vida máxima e recua 180 px (limitado ao início do caminho), uma única vez. O efeito visual dura 700 ms. A primeira queda não conta como morte; é preciso eliminá-lo novamente para registrar derrota, Álbum e missões. Reutilizar a regra de retorno dos Ecos sem alterar o Eco Temporal das fases anteriores.
- **Devorador de Memórias:** Boss nas waves 5, 10, 15 e 20 com 6.800, 7.600, 8.400 e 9.200 de vida, velocidade 0,6, tamanho 66. Aos 70% e 35% da vida, ainda vivo, restaura 25% da vida máxima dos aliados vivos não Bosses num raio de 220 px, limitado à vida máxima, e convoca dois Fragmentos Mnésicos na própria posição e segmento. Não ressuscita mortos, não cura Bosses nem a si mesmo. Cada limiar ocorre uma vez; um golpe não letal que cruza ambos ativa ambos. Golpe letal não ativa a habilidade.
- Os quatro possuem sprites próprios de 12 × 12, compartilhados com o Álbum: fragmento cristalino, guardião de cristal, silhueta espectral e criatura com grande boca. Nomes, habilidades e avisos em português, inglês e espanhol. Reforços seguem as recompensas existentes e impedem concluir a wave enquanto vivos. Conservar todos os diálogos, desbloqueios e a recompensa do Feixe Contínuo.
- A base representa narrativamente o núcleo das memórias: os inimigos percorrem o caminho para destruí-lo. Preservar vida, combate, recompensas e regras normais de defesa; não adicionar objetivos secundários destrutíveis.
- Entrada em três telas: passagem encontrada no arquivo; aviso gravado de Lina sobre os registros oficiais; descoberta de que outras pessoas também eram chamadas de defensores. O último botão inicia o combate.
- Vitória em cinco telas: gravação recuperada; antigo defensor conta que recebeu a promessa de voltar para casa; Senhor do Tempo ordena fechar o arquivo; jogador pergunta quantas pessoas vieram antes; resposta “Prepare suas defesas.”. Não revelar ainda o destino do antigo defensor ou antecipar a ajuda da entidade do Limbo.
- Cenas em português, inglês e espanhol, reutilizando o fluxo de histórias do arquivo. Entrada pausa a simulação; Escape não pula diálogos; vitória abre o resultado já calculado sem duplicar XP ou fragmentos. Replays mostram a história novamente; editor e modo infinito não exibem as cenas.
- Vitória persiste a Fase 16 e libera a Fase 17, com o Capítulo 3 desbloqueado. Não alterar Limbo, Fase 18, atributos de inimigos ou demais fases.

### Mudança: Fase 17 — Limiar do Tempo

**Objetivo:** seguir o rastro da transmissão da Câmara das Memórias até a passagem para o Senhor do Tempo, preparando o confronto da Fase 18.
**Alterar:** adicionar a Fase 17 ao Capítulo 3, disponível após concluir a 16. Saves existentes com a 16 concluída recebem acesso normalmente.
**Não alterar:** finais planejados, promessa do Limbo, origem da amnésia, destino do antigo defensor, atributos das defesas e recompensas existentes.
**Aceitação:**
- 20 waves, 15 vagas de torre (16 com Licença), caminho próprio entre engrenagens e pilares pixelados. Reutiliza a paleta e a música de Futuro Despedaçado.
- Elenco exclusivo, substituindo todos os inimigos reaproveitados nesta fase: Batedores de Instantes (`3 + wave`), Couraçados de Ampulheta (wave 3, +1 a cada 4) e Tecelões de Segundos (wave 6, +1 a cada 5). Intercalar os três tipos e colocar o Boss no fim da fila. A mesma composição vale no modo infinito; editor e fases anteriores preservam seus elencos.
- **Batedor de Instantes:** 340 de vida, velocidade 1,7, tamanho 23. Com 50% da vida ou menos, velocidade multiplicada por 1,6; gelo, lentidão e Pulso Temporal continuam aplicáveis.
- **Couraçado de Ampulheta:** 1.100 de vida, velocidade 0,75, tamanho 34; redução de dano de 30%, integrada às regras normais de dano e ataques que ignoram reduções.
- **Tecelão de Segundos:** 950 de vida, velocidade 1, tamanho 29. Ao atingir 50% da vida ainda vivo, convoca dois Batedores uma única vez, na mesma posição e segmento do caminho. Golpe letal não convoca.
- **Arconte do Limiar:** Boss exclusivo nas waves 5, 10, 15 e 20, com 7.200, 8.050, 8.900 e 9.750 de vida, velocidade 0,62, tamanho 66. Aos 70% e 35% da vida, ainda vivo, convoca um Couraçado na própria posição e sela as duas torres de combate mais próximas por 2.000 ms. Não seleciona geradores; com menos torres, sela as disponíveis. Interrompe foco e sequência do Feixe. O selo usa a estase existente, respeitando pausa e expiração. Cada limiar ocorre uma vez; atravessar ambos num golpe não letal convoca dois reforços sem somar a duração dos selos. Golpe letal não ativa habilidades.
- Os reforços precisam ser derrotados para terminar a wave e seguem as regras normais de recompensas e registro no Álbum. Não há transmissor interativo nem fendas da Fase 11.
- Os quatro possuem sprites pixelados próprios de 12 × 12, compartilhados pelo combate e Álbum: batedor leve com ponteiro, couraçado com núcleo de ampulheta, tecelão de manto e Arconte de armadura com hastes. Nomes e descrições das habilidades em português, inglês e espanhol. Figurinhas aparecem após derrotar cada tipo; o Arconte pertence à categoria Bosses.
- Entrada em quatro telas: rastro da transmissão, pensamento sobre a memória perdida e os ataques, ordem do Senhor do Tempo para se afastar, decisão de proteger a passagem e cobrar respostas pessoalmente.
- Vitória em seis telas: passagem preservada, questionamento sobre Lina e o antigo defensor, resposta evasiva do Senhor do Tempo, exigência de uma conversa presencial, convite para atravessar a porta e preparação do confronto.
- Cenas em português, inglês e espanhol. Entrada pausa a simulação até **Defender a passagem**; Escape não pula os diálogos. Vitória abre o resultado calculado sem duplicar recompensas. Replays da campanha permitem reler a história; editor e modo infinito não mostram as cenas.
- Vitória salva a Fase 17 e libera a Fase 18. Não iniciar finais nem conceder nova torre ou recompensa narrativa na Fase 17.

Uma alteração de mecânica deve declarar:

1. Qual regra atual será modificada.
2. O novo comportamento observável pelo jogador.
3. Valores exatos, limites e condições de início/fim.
4. O que deve permanecer igual.

### Modelo de requisito

```md
## Mudança: <nome>

**Objetivo:** <resultado para o jogador>.
**Alterar:** <regra e valor atual para novo valor>.
**Não alterar:** <comportamentos preservados>.
**Aceitação:**
- Dado <estado>, quando <ação>, então <resultado>.
```

### Melhorias por atributo e ritmo das waves finais

- Manter integralmente a renda por tiro (20 créditos mais bônus comprados), inclusive no Feixe Contínuo. Não converter para renda por eliminação nem alterar compras permanentes, fragmentos, XP ou produção dos geradores.
- Toda torre de tiro com dano e intervalo positivos recebe **5 melhorias totais por unidade**, distribuídas livremente entre dano, velocidade e alcance. Não são cinco por atributo. Inclui defesas de tiro da Loja que antes não tinham melhorias. Minas, bombas, iscas, amplificadores, Gerador e Sísmica preservam suas regras próprias.
- Cada ponto de dano acrescenta 50% do dano base; cada ponto de alcance acrescenta 15% do alcance base; cada ponto de velocidade acrescenta 20% à cadência base, calculando o intervalo como `intervaloBase / (1 + 0,2 × pontos)`. Valores arredondados; depois aplicar os bônus existentes. O piso de 100 ms permanece. Melhorar um atributo não melhora os outros nem modifica efeitos especiais, área de explosão, congelamento, quantidade de lasers ou duração de efeitos.
- Custo-base: máximo entre 200 e o preço da primeira melhoria antiga; sem melhoria antiga, usar 80% do custo de construção, respeitando o mínimo 200 para essa referência. Multiplicar sucessivamente por **0,5; 1; 2; 5; 8** e arredondar para cima a múltiplos de 10. A ordem dos atributos não muda o preço. Para a Torre padrão: **100, 200, 400, 1.000 e 1.600**, total 3.300, além dos 150 de construção. A revisão reduz as três primeiras compras em todas as torres de tiro e mantém as duas últimas, sem alterar renda ou atributos.
- O botão **Melhorias (N/5)** ou E abre as três opções, com contagem por atributo, valor anterior, próximo valor e custo. A prévia incorpora os bônus atuais aplicados à torre. Velocidade é apresentada como intervalo em ms (menor é mais rápido). Sem créditos ou após cinco compras, impedir a compra. Atualizar disponibilidade quando o saldo aumenta. Não gastar dinheiro só por abrir o painel. Distribuição definitiva naquela torre; vender mantém o percentual atual sobre o investimento efetivamente pago.
- O painel abre como uma sobreposição acima dos controles, fora do fluxo do layout, com botão **Fechar** e rolagem interna em telas baixas. Abrir, comprar ou fechar não altera posição, tamanho, proporção ou coordenadas de clique do mapa, nem a altura dos controles. A partida mantém seu estado de pausa atual.
- Atributos em `CONFIG.melhoriasEscolhidas`; distribuição em `torre.melhoriasEscolhidas`, nível como total aplicado. Usar visuais antigos até o terceiro estágio, mantendo o último nos níveis 4 e 5 e preservando skins. Não alterar a arena independente do Limbo. Missões de torres máximas exigem cinco escolhas nas torres de tiro; suportes mantêm seus limites.
- Álbum mostra a torre base e explica as cinco escolhas, sem oferecer figurinhas de pacotes antigos de dano/alcance/velocidade. As defesas de suporte continuam com seus níveis próprios.
- Nas fases **17 e 18**, acrescentar reforços às composições existentes, intercalados na fila: wave 8, +8 Batedores; wave 12, +4 Couraçados; wave 16, +4 Tecelões e +2 Couraçados; wave 19, +10 Batedores, +3 Couraçados e +3 Tecelões. Preservar vida e habilidades dos inimigos, os bosses e seus intervalos. Exibir aviso temático no intervalo anterior e na entrada da wave. Fases 1–16 e editor preservam suas composições; as waves correspondentes do infinito em 17/18 recebem os mesmos reforços.
- As mudanças substituem a antiga progressão de pacotes para prolongar investimentos e variar ameaças após a wave 7. Não impõem uma wave mínima para comprar; o ritmo depende das escolhas e do rendimento real do jogador.

### Fase 18 — O Último Relógio

- Revisão dos retratos: o Senhor do Tempo usa por padrão o corpo de terno já existente no retrato de referência, com braços, camisa clara, gravata e cabeça de relógio. Aplica-se às caixas de fala da campanha, portal e floresta. Na cena de ameaça, a lâmina tem cabo, guarda, ponta e brilho metálico, presa à mão; o jogador caído reutiliza o sprite completo do castelo, deitado de lado, com cabelo, roupas, braços e pernas reconhecíveis. Alteração somente visual.

- Após concluir a Fase 18, o lobby oferece **Rever diálogo após a Fase 18**. Abre diretamente a cena posterior ao combate, com a rota escolhida pela promessa do save ativo; não inicia waves, concede recompensas ou registra outra vitória. Com ajuda, continua a floresta salva em vez de apagar um checkpoint. Sem ajuda, mantém as opções do final trágico. Disponível em português, inglês e espanhol.

- Disponível no Capítulo 3 após concluir a Fase 17, inclusive em saves existentes. Caminho próprio na sala do relógio, paleta e música temporal existentes, 20 waves e 15 vagas de torre (16 com Licença). Sem nova defesa ou moeda.
- Elenco: Batedores (`4 + wave`), Couraçados a partir da wave 2 (+1 a cada 3) e Tecelões a partir da wave 5 (+1 a cada 4). Arconte nas waves 5, 10 e 15; Senhor do Tempo na wave 20. No infinito, o Senhor do Tempo segue nos múltiplos de 5 após a 20; sem cenas narrativas. Editor preserva suas regras.
- Senhor do Tempo: 15.000 de vida, velocidade 0,55, tamanho 72, sem incremento de vida por aparição. Aos 75%, 50% e 25%, ainda vivo, convoca um Couraçado na própria posição e sela as duas torres de combate mais próximas por 2.500 ms. Cada limiar ocorre uma vez, golpe letal não convoca, selos não somam duração e respeitam pausa. Usa as regras existentes de dano, lentidão, Pulso e recompensas. Boss com desenho pixelado de cabeça de relógio e terno escuro, camisa clara e gravata vermelha, compartilhado pelo combate, cenas finais e Álbum.
- Entrada: oito falas revelam que o Senhor do Tempo trouxe o jogador e apagou suas memórias. As torres protegem passagens que sustentam seu poder; as distorções atraem criaturas. Lina e o antigo defensor permanecem com destinos desconhecidos.
- Vitória real exige concluir as waves e eliminar os inimigos e reforços. Depois começa a derrota narrativa: o relógio se rompe, o jogador avança e o Senhor do Tempo o surpreende com uma lâmina de luz. Uma derrota normal abre somente o resultado normal, nunca um final narrativo.
- Com `jornadaDoLimbo.promessaDeAjuda === true`, a entidade enfrenta o Senhor do Tempo e manda o jogador correr. Ele foge **a pé**, pelo corredor atrás da sala do relógio e pelas ruínas, até a floresta. Não há portal nessa fuga inicial. A volta para casa só acontece depois do capítulo secreto abaixo. Sem promessa, a lâmina avança e a tela fica preta, sem gore.
- Ao terminar qualquer final, oferecer **Voltar ao menu** e **Revisitar o Limbo**. A segunda opção inicia novamente o Intervalo Perdido, permitindo buscar a rota da arena. Preservar compras, coleção, progresso, promessa e slots. Replays permitem rever o final; nenhuma recompensa extra por avançar diálogos. Recarregar durante a cena preserva a conclusão da fase e permite rejogá-la.
- Textos em português, inglês e espanhol. Cenas pausam a simulação; Escape não pula falas. Jogador sem retrato, entidade com desenho original e Senhor do Tempo com seu retrato existente. Balanceamento acessível por `CONFIG.confrontoFinal` e `CONFIG.inimigo.senhorDoTempo`; roteiro e desenhos em `fase18.js`, estilos em `dialogos.css`.

### Capítulo secreto — Floresta dos Ecos

- Revisão de interface: remover os atalhos independentes **Capítulo secreto: Floresta dos Ecos** e **Continuar história: tempo parado** do lobby. Manter somente **Rever diálogo após a Fase 18** entre esses três botões. Após os diálogos, esse atalho retoma a floresta salva ou, se a fuga já terminou, a continuação na casa. Não recriar os dois botões ao salvar, trocar idioma ou voltar ao lobby.
- Área de exploração ampliada até 1100 px no computador. Na floresta em celulares de até 600 px de largura, a janela interna tem 320 px de largura e altura adaptada ao espaço da tela (260–460 px), ampliando personagens e obstáculos sem esticar o desenho. A câmera continua limitada ao mundo, com o jogador acompanhado nos dois eixos. Controles ficam abaixo do mapa; diálogo pode usar rolagem. Casa e oficina mantêm a janela original de 640 × 384. Redimensionar ou girar o aparelho não altera posições ou saves.

- O jogador usa exatamente o desenho do castelo, por meio de `desenharPessoaDoCastelo` com contexto de canvas explícito: mesmas roupas, cabelo, proporções, braços e pernas. Caminhada em quatro passos `[0, 2, 0, -2]` a cada 0,12 s e direção preservada; parar quando imóvel, bloqueado, em conversa ou em pausa.
- Referência do Senhor do Tempo: `references/Captura de tela 2026-09-13 174434.png`. Corpo humano com terno escuro, camisa clara, gravata vermelha e cabeça de relógio redonda com aro magenta/ciano. O desenho compartilhado aparece na floresta, no combate da Fase 18, nas cenas finais e no Álbum; o retrato de conversa existente permanece.

- Liberado com a Fase 18 concluída e a promessa de ajuda conquistada. Começa automaticamente após **Corra! Eu cuido dele!**. O atalho dos diálogos da Fase 18 permite retomar o capítulo, inclusive em saves antigos com esses requisitos. O final trágico permanece igual.
- Uma única floresta contínua de 2560 × 1344 px (80 × 42 células), com janela de 640 × 384 px. Substitui as três áreas repetidas. Câmera acompanha nos dois eixos, limitada às bordas, e controles permanecem fixos. Há percurso principal irregular, oito desvios com laços e becos, 14 pedras, sete árvores no caminho, 12 armadilhas e cinco abrigos. As mesmas colisões valem para jogador e perseguidor; todos os trechos e o arco são alcançáveis. WASD/setas/toque para andar, E para interagir.
- A sombra é o próprio perseguidor, com posição física e busca de caminhos, não um desenho oscilando. Antes da revelação, anda a 138 px/s, segue quando distante e patrulha passagens próximas num raio de 260 px do jogador. A partir de x=760 passa a se aproximar; a conversa ocorre a menos de 120 px. Ao revelar a identidade, conserva exatamente sua posição, recebe 3 s de folga para o jogador e continua a perseguição dali. Ele deixou uma cópia temporal sendo derrotada para escapar da entidade e seguir o jogador.
- Se o jogador alcançar o arco antes do encontro, exibir aviso dos passos se aproximando e aguardar a chegada física da sombra. Não revelar sua identidade à distância nem teleportá-la para forçar a conversa.
- Parâmetros em `CONFIG.florestaSecreta`: jogador 140 px/s, perseguidor 146 px/s (cerca de 4% mais rápido), raio de colisão do jogador 9 px, captura a menos de 18 px, interação a menos de 55 px. Movimento diagonal normalizado e perseguidor busca caminhos livres, sem atravessar árvores ou pedras. Espera inicial de 2 s, ou 3 s perto do checkpoint; ao sair do abrigo, 1 s de folga. Abrigos de folhas ocultam o jogador enquanto ele permanece parado; E permite sair.
- Armadilhas de urso visíveis no chão disparam a menos de 15 px, uma vez cada: prendem o jogador por 0,65 s ou o perseguidor por 2 s. Não causam dano nem perda de recursos. É possível contorná-las e deixá-las abertas para atrasar o perseguidor. Armadilhas fechadas ficam salvas; pausa e conversas também suspendem o tempo de imobilização.
- Quatro checkpoints ao longo do mesmo mapa salvam a passagem automaticamente; não trocam nem recarregam a floresta. Captura devolve ao último checkpoint, conservando identidade e recursos. **Salvar e voltar ao lobby** preserva a posição de ambos. Pausa, diálogos, janela sem foco e aba oculta interrompem movimento e perseguição. Limpar teclas ao pausar e ao soltar/cancelar o toque.
- O arco na última clareira começa apagado. Ao interagir, aparece a marca da coroa e a passagem se acende; a entidade fala por áudio, sem retrato: **Encontrei você. Atravesse. Eu não consigo mantê-la aberta por muito tempo.** A conversa pausa a perseguição, sem cronômetro oculto. O jogador atravessa para casa e recupera a primeira lembrança. A chegada continua com sete falas: reconhecimento da casa, silêncio estranho, relógio e pêndulo imóveis, rua com carro e pedestre congelados e chuva suspensa. O jogador percebe que só ele se move e que a fuga ainda não terminou. Cenas pixeladas da sala e da vista pela janela reutilizam seu sprite; avanço manual, sem temporizador. Ao terminar, iniciar a exploração jogável da casa descrita abaixo. Textos em português, inglês e espanhol.
- Persistência em `guardians-of-pixel-floresta-v1`, versão interna 3: sala única, checkpoint, posição do jogador e perseguidor, revelação, conclusão e armadilhas fechadas. Saves das antigas áreas 0/1/2 migram para os checkpoints 0/1/2, preservando história e conclusão. Posições inválidas voltam ao checkpoint. Ao retomar saves novos, conservar a posição válida do perseguidor; ao morrer, recriá-lo no checkpoint com folga. Sem recompensas extras ou alterações na jornada do Limbo.
- Implementação em `floresta.js`, estilos em `floresta.css`, markup em `index.htm`. Português, inglês e espanhol. Retratos e regras de áudio/jogador reutilizam `dialogos.js`; visual pixelado original desenhado em canvas. Trilha existente do castelo acompanha a exploração.

### Continuação jogável — O tempo parado

- Continuação no **Arquivo sem horas**: depois das pistas externas, o objetivo pede examinar novamente o projeto da oficina. A interação revela uma passagem na parede, disponível também para saves antigos que já terminaram a primeira parte. Sem novo botão no lobby.
- A passagem leva a uma sala explorável de 640 × 384, com inscrição, três pedestais e caderno protegido. A inscrição indica **LUZ → PONTE → PORTA**. Ativar fora da ordem apaga os símbolos e permite tentar novamente, sem dano, custo ou limite de tempo. Ativações corretas iluminam os símbolos; após os três, o caderno fica acessível. Selecionar sempre o objeto interativo mais próximo.
- O caderno dispara quatro falas com cena pixelada de lembrança: o jogador reconhece a oficina antes do desaparecimento, lembra que estudava desenhos das torres para manter uma passagem de volta aberta e que deixou pistas caso suas memórias fossem apagadas. Não criou as torres nem recupera toda a memória. A lembrança termina antes de mostrar quem entra pela porta; o caderno aponta para o observatório.
- Voltar à pessoa na luz conclui o trecho do arquivo e libera o observatório na rua. Os mistérios se resolvem no desfecho abaixo.
- `memoria.js` compartilha os controles, a arte e os diálogos da casa. Save da casa ganha `passagemAberta`, `selosAtivos` (0–3), `memoriaRecuperada` e `memoriaConcluida`, validados ao carregar. Saves antigos preservam pistas; progresso do enigma é salvo a cada interação. A memória só é marcada ao terminar as falas, podendo ser revista se interrompida. Sem XP, fragmentos ou itens extras. Textos em português, inglês e espanhol.

- Revisão visual: não escrever nomes permanentemente sobre objetos da casa, rua e oficina; mostrar apenas E perto de uma interação. Portas com moldura, painéis, soleira e maçaneta; janela com cortinas; telefone com disco, fone e fio; mesas com pés, papéis e lápis; fotografia rasgada preservada. Casa decorada com tapete, quadro, plantas e prateleira; oficina com tapete de montagem, livros, ferramentas e parafusos; rua com postes e floreiras. Elementos decorativos ficam nas paredes ou no piso, preservando as colisões e o acesso às pistas.
- Revisão das referências de 14/09: portas externas apoiadas na calçada (base y=156), sem vão de porta duplicado atrás das entradas da casa e oficina. Floreiras sob as janelas, fora dos acessos. Oficina recebe bancada com gavetas e ferramentas, armário de peças, caixa de madeira, bobinas e desenhos na parede. Bancada, armário e caixa têm colisão coerente com a base; conservar acesso às pistas, portas e passagem secreta. Saves em posições agora ocupadas usam a entrada segura já existente.
- Pessoa na luz tem sprite próprio: cabelo grisalho, óculos, casaco marrom e cachecol azul acinzentado, em um passo congelado. Não reutilizar o sprite do jogador. Preservar diálogos, localização, interação e identidade ainda desconhecida.
- Diálogos da camada `camada-cutscene-carta.conversa-pixelada` usam fundo opaco `#241b38`, da mesma cor da caixa. O lobby não aparece atrás. O final trágico conserva o fundo preto já existente.

- Depois das sete falas de chegada em casa, iniciar exploração livre. Quem já concluiu a floresta pode retomá-la pelo atalho dos diálogos da Fase 18, que segue para a casa salva após a cena da ajuda. Não exige refazer a fuga nem acrescenta outro botão no lobby.
- Implementação em `casa.js`, reutilizando canvas, controles de teclado/toque, caminhada do castelo, colisões com raio, diálogos, pausa e saída da floresta. Casa e oficina medem 640 × 384; rua mede 1280 × 384 e a câmera acompanha o jogador. Mobília e carro impedem passagem; objetos próximos exibem E.
- Investigar relógio, desenhos de torres com data anterior ao desaparecimento e janela. Após as três pistas, o telefone sinaliza uma chamada. A voz anônima, por áudio e sem retrato, diz **Não ligue o relógio** e aponta para a oficina. Só então liberar a porta para a rua.
- Na rua congelada, investigar a pessoa dentro da luz: ela reconhece o jogador e pergunta se conseguiu consertar, antes de congelar novamente. Na oficina, examinar foto rasgada com o jogador ao lado de alguém de terno e o projeto que liga torres ao relógio, com a anotação **A memória é a chave**. Não confirmar a identidade da pessoa na foto nem revelar o motivo da amnésia. Após as três pistas externas, orientar a examinar novamente o projeto para abrir a passagem ao Arquivo sem horas, mantendo exploração e retorno ao lobby disponíveis.
- Save independente `guardians-of-pixel-casa-parada-v1`, incluído nos slots: local, posição, pistas e conclusão. Validar posições e locais; salvar nas interações, portas, pausa/saída. Repetir interações não duplica pistas nem concede recursos. Português, inglês e espanhol.

### Desfecho — O tempo é seu

- Após o pensamento na cama, oferecer **Reiniciar a história**, **Voltar à Fase 12** e **Voltar ao lobby**. Reiniciar define zero fases concluídas e bloqueia os Capítulos 2 e 3 para rejogar toda a campanha. Voltar à Fase 12 preserva as fases concluídas até a 12 e bloqueia o Capítulo 3; as Fases 13–18 precisam ser concluídas novamente. Ambos limpam a narrativa correspondente, jornada do Limbo/promessa e floresta/casa para permitir outras escolhas. Preservar torres e demais equipamentos liberados, seleção de defesas, Máquina do Tempo, Pulso Temporal, nível/XP, recursos, compras, skins, coleção, estatísticas, missões e resgates, conquistas, mapas criados e preferências. Registrar o maior progresso prévio para desbloqueios de equipamentos em guardians-of-pixel-progresso-equipamentos-v1, independente das fases atuais e persistente por slot. Essa marca não libera fases. Guardar os dados afetados em guardians-of-pixel-historia-antes-do-reinicio-v1 antes de alterar; somente o slot ativo muda. Voltar ao lobby conserva todos os dados. As mesmas regras valem nos botões do final trágico.

- A janela da casa fica mais alta, na parede (centro y=40). Cama com colchão, travesseiro e cobertor, com colisão, disponível na casa durante toda a exploração; dormir só após `historiaConcluida`. Antes disso, o jogador diz que precisa terminar o que começou. Após o final, interagir mostra o jogador deitado e uma fala de descanso. Avançar escurece toda a tela e mostra, sem retrato ou cenário: **Será que tudo teria sido diferente se eu tivesse contado à entidade sobre o Senhor do Tempo… naquele primeiro encontro?** O título FIM aparece nessa tela preta, somente depois de deitar; manter o pensamento e os três botões de destino. Sem desbloquear outro capítulo. Português, inglês e espanhol.

- `desfecho.js` encerra a rota da promessa. Após a conversa do arquivo, liberar uma porta sob uma cúpula na rua, entre a pessoa e a oficina, para um observatório explorável de 640 × 384. Saves anteriores retomam desta etapa pelo atalho existente, sem novo botão no lobby ou nova recompensa.
- Três registros revelam: o Senhor do Tempo roubou a primeira hora da cidade para alimentar suas passagens; destruir o grande relógio deixou um vínculo que congelou a cidade. A proteção da entidade na passagem de volta permite ao jogador se mover. A cópia inteira da fotografia mostra o Senhor do Tempo: prometeu viagens entre mundos, mas levou o jogador e apagou sua memória após ele descobrir as prisões e preparar um retorno.
- Lina fala pelo rádio, sem retrato: estava presa entre passagens. A pessoa grisalha é o antigo defensor, que voltou antes e ajudou Lina na ligação telefônica. A saída permite resgatar Lina e os demais; a entidade mantém a passagem segura pelo outro lado.
- Após ler os três registros, operar painéis na ordem **saída → corrente → sol**. Ordem incorreta só informa a pista, sem dano, reinício ou custo. A saída liberta os prisioneiros. A corrente dispara três falas: projeção em vídeo do Senhor do Tempo, resposta do jogador e corte definitivo do vínculo. Sem horas roubadas ou passagens, ele fica isolado em seu domínio; suas cópias também não podem atravessar. O sol devolve as horas e inicia o epílogo.
- Epílogo de seis falas: chuva e carro voltam a se mover, Lina preserva os registros, o antigo defensor pode seguir a vida e a entidade retorna ao Limbo com a promessa cumprida. O jogador volta para casa com a memória recuperada e liberdade para viver. O epílogo termina sem exibir FIM. O objetivo passa a **Você finalmente está em paz. Descanse em sua cama.** O título FIM fica reservado ao descanso na cama. Fundo da caixa opaco, jogador sem retrato e vozes de rádio sem imagem. Arte compartilhada da rua aceita tempo de animação apenas para o epílogo; cenas anteriores permanecem congeladas.
- Save da casa ganha `registrosFinais`, `circuitosFinais` (0–3) e `historiaConcluida`, validados com pré-requisitos. Salvar cada registro/circuito; marcar conclusão só ao terminar o epílogo. Se interrompido, o painel do sol retoma o final. Depois de concluir, o mesmo painel permite rever a cena, sem recursos extras. Retorno ao lobby e exploração continuam disponíveis. Final trágico da Fase 18 e demais progressos preservados. Português, inglês e espanhol.

### Revisão do Álbum e personagens do castelo

- O Álbum ordena os inimigos e bosses pela sequência das fases, incluindo 15, 16 e 17 depois da fase 14, independentemente da ordem em que foram derrotados. Preserva a coleção salva.
- A entidade usa o mesmo desenho no castelo e nos retratos: coroa dourada com rubi, rosto escuro e manto roxo com faixa clara e detalhes vermelhos.
- Guardas usam armadura medieval de placas, elmo fechado com viseira, ombreiras, escudo e lança. O desenho é compartilhado pelo mapa e pelo retrato, sem alterar combate ou colisões.

### Pensamento e escolhas do final trágico

- Antes da morte, mostrar: **Você se pergunta: O que teria acontecido se eu tivesse ficado calado no primeiro encontro com a entidade?** Avançar mostra **Pouco depois, você sente a lâmina afiada perfurar seu corpo. Tudo fica escuro.**, com fundo preto e sem gore. Textos em português, inglês e espanhol.
- Ao concluir essa cena, conceder a conquista do final trágico e mostrar **Reiniciar a história**, **Voltar à Fase 12** e **Voltar ao lobby**, usando as mesmas regras de progresso da cama. Reiniciar e voltar à Fase 12 conservam todos os equipamentos e bens; apenas a progressão da campanha e a narrativa correspondente voltam atrás. Lobby conserva o save. Substituem os dois botões antigos do final trágico.

### Remoção do atalho de teste da Fase 18

- Com os finais concluídos, remover do lobby o botão **Rever diálogo após a Fase 18**, inclusive em saves que já venceram a campanha. Esta regra substitui as menções anteriores de manter esse atalho. As cenas continuam pelo fluxo normal da Fase 18; os três botões dos finais e os dados salvos permanecem. Ao sair da floresta, devolver o foco ao botão de jogar do lobby.

### Partidas salvas no lobby

- Renomear Salvos para **Partidas salvas**, inclusive no título do painel; inglês Saved games e espanhol Partidas guardadas. O botão usa um ícone original pixelado de bloco de notas azul, folhas claras pautadas, espiral e pequena seta de atalho, inspirado no atalho do Bloco de Notas do Windows. Manter os três espaços e as regras de salvamento existentes.

- O atalho de Partidas salvas fica acima do perfil GP / DEFENSOR / PRONTO PARA JOGAR, fora da grade de botões extras. Formato quadrado de 60 px, somente ícone visível; nome acessível traduzido e foco de teclado. O título Partidas salvas aparece ao abrir o painel.

### Modo clássico: botão e apresentação

- Nesta etapa, adicionar somente o botão **Modo clássico** no lobby e uma apresentação com selo **Em breve**. Não alterar modo de partida, balanceamento, mapas, recompensas ou defesas.
- Na primeira abertura por slot, explicar: **No Modo clássico, você poderá escolher qualquer mapa e jogar nas dificuldades Fácil, Médio e Difícil. Ganhe recompensas, conquistas e novas defesas. Você sempre poderá voltar ao Modo história.**
- **Voltar ao Modo história** fecha a apresentação, devolve foco ao atalho e salva a leitura em guardians-of-pixel-apresentacao-classico-v1. Próximas aberturas mostram um resumo. Fechar sem confirmar permite reler a apresentação. Textos em português, inglês e espanhol.
